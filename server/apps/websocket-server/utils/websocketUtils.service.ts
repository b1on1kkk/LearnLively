import { Injectable } from '@nestjs/common';
import { SharedService } from '@sharedService/shared';
import { ActiveUsersDTO } from '../dto/activeUsersDTO';
import { Server, Socket } from 'socket.io';
import { StudentDataDTO } from '../dto/studentDataDTO';

@Injectable()
export class WebsocketUtils {
  constructor(private readonly sharedService: SharedService) {}

  async studentData(
    ActiveUsers: Array<ActiveUsersDTO>,
    dto: StudentDataDTO,
    server: Server,
    client: Socket,
  ) {
    const recipientSocketId = this.binaryUserSearchByUserId(
      ActiveUsers,
      dto.recipient,
    );

    const senderStudents = await this.sharedService.getStudentsByPrisma(
      dto.sender_id,
    );

    server.to(client.id).emit('newStudents', senderStudents);

    if (recipientSocketId !== null) {
      const recipientStudents = await this.sharedService.getStudentsByPrisma(
        dto.recipient,
      );

      server
        .to(ActiveUsers[recipientSocketId].socket_id)
        .emit('newStudents', recipientStudents);
    }
  }

  binaryUserSearchByUserId(
    array: Array<ActiveUsersDTO>,
    user_id: number,
  ): number | null {
    if (array.length === 0) return null;

    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (array[mid].user_id === user_id) return mid;

      if (array[mid].user_id < user_id) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return null;
  }
}
