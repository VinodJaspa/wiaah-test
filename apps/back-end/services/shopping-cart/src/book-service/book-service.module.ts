import { Module } from '@nestjs/common';
import { BookServiceService } from './book-service.service';
import { BookServiceResolver } from './book-service.resolver';
import { CqrsModule } from '@nestjs/cqrs';
import { BookServiceController } from './book-service.controller';
import { BookingRepository } from './repository';
import { BookingCommandHandlers } from './commands';
import { BookingQueryHandlers } from './queries';

@Module({
  imports: [CqrsModule],
  providers: [
    BookServiceResolver,
    BookServiceService,
    BookingRepository,
    ...BookingCommandHandlers,
    ...BookingQueryHandlers,
  ],
  controllers: [BookServiceController],
})
export class BookServiceModule {}
