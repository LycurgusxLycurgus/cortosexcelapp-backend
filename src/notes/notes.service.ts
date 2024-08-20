import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

// @Injectable()
// export class NotesService {
//   constructor(private prisma: PrismaService) {}
// 
//   async create(content: string, userId: number) {
//     return this.prisma.note.create({
//       data: {
//         content,
//         userId,
//       },
//     });
//   }
// 
//   async findAll(userId: number) {
//     return this.prisma.note.findMany({
//       where: { userId },
//       include: { user: true },
//     });
//   }
// }