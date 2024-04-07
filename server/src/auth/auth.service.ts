import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LoginPayloadDTO } from './dto/login_payload.dto';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDTO } from './dto/signup_payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginPayloadDTO) {
    const user = await this.prisma.users.findFirst({ where: { email } });

    if (!user) throw new Error();

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) throw new Error();

    return this.jwtService.sign({
      id: user.id,
    });
  }

  async signup({ name, lastname, surname, email, password }: SignUpDTO) {
    await this.prisma.users.create({
      data: {
        name: name,
        lastname: lastname,
        surname: surname,
        role: 'student',
        email: email,
        end_semester: 4,
        now_semester: 1,
        department: 'Test D.',
        password: await bcrypt.hash(password, 10),
        img_hash_name: 'no image',
        created_at: new Date(),
      },
    });

    return this.login({ email, password });
  }
}
