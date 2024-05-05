import { Injectable } from '@nestjs/common';
import { SharedService } from '@sharedService/shared';
import { ActiveUsersDTO } from '../dto/activeUsersDTO';
import { Server, Socket } from 'socket.io';
import { StudentDataDTO } from '../dto/studentDataDTO';
import { SendMessageDTO } from '../dto/sendMessageDTO';

@Injectable()
export class WebsocketUtils {
  constructor(private readonly sharedService: SharedService) {}

  public async studentData(
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

  public binaryUserSearchByUserId(
    array: Array<ActiveUsersDTO>,
    user_id: number,
  ): number | null {
    if (array.length === 0) return null;

    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (array[mid].user_id === user_id) return mid;

      if (array[mid].user_id < user_id) left = mid + 1;
      else right = mid - 1;
    }

    return null;
  }

  public MessageSender(dto: SendMessageDTO, id: number, server: Server) {
    const message = {
      message: {
        id,
        user_id: dto.message.user_id,
        conversation_id: dto.message.conversation_id,
        content: dto.message.content,
        edited: dto.message.edited,
        sent_at: dto.message.sent_at,
        delivered_at: dto.message.delivered_at,
        replies_to: dto.message.replies_to,
        messages: dto.message.messages,
        users: {
          img_hash_name: dto.message.users.img_hash_name,
          name: dto.message.users.name,
          lastname: dto.message.users.lastname,
        },
        seen_messages: [],
        selected: dto.message.selected,
      },
    };

    server.in(dto.uuid).emit('getMessage', { ...message.message });
  }
}
