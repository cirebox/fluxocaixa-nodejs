import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDefined, IsNotEmpty } from 'class-validator';

export class CreateCreditDto implements Partial<CashFlow.Transaction> {
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    default: '878947ef-6b83-4cc2-83ae-43412e4e2a5f',
  })
  userId: string;

  @IsDefined()
  @IsNotEmpty()
  @ApiProperty({ required: true, default: '2022-06-26' })
  date: string;

  @IsDefined()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    default: '30.0',
  })
  value: number;
}
