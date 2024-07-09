import {
  type OnModuleInit,
  type OnModuleDestroy,
  Logger,
  Injectable,
  Inject,
} from '@nestjs/common';
import type { Repository } from 'typeorm';
import type { BookingType } from '../models/booking-type';
import { BOOKING_TYPE_REPOSITORY } from '../models/booking-type.provider';

@Injectable()
export class BookingTypeService implements OnModuleInit, OnModuleDestroy {
  // #region Properties (1)

  private readonly logger = new Logger(BookingTypeService.name);

  // #endregion Properties (1)

  // #region Constructors (1)

  constructor(
    @Inject(BOOKING_TYPE_REPOSITORY)
    private readonly bookingTypeRepository: Repository<BookingType>,
  ) {}

  // #endregion Constructors (1)

  // #region Public Methods (4)

  public async getAll() {
    const result = await this.bookingTypeRepository.find();
    return result;
  }

  public async getForId(id: number) {
    const result = this.bookingTypeRepository.findOne({ where: { id } });
    return result;
  }

  public onModuleDestroy() {
    this.logger.log('BookingTypeService destroyed');
  }

  public onModuleInit() {
    this.logger.log('BookingTypeService initialized');
  }

  // #endregion Public Methods (4)
}
