import { Module } from '@nestjs/common';
import { BookServiceService } from './book-service.service';
import { BookServiceResolver } from './book-service.resolver';

@Module({
  providers: [BookServiceResolver, BookServiceService]
})
export class BookServiceModule {}
