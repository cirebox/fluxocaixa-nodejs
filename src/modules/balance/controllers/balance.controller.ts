import { Controller, Get, Logger, Param } from '@nestjs/common';
import { FindByDateService } from '../service/find-by-date.service';
import {
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ReturnData } from 'src/modules/shared/dto/return.dto';

@ApiTags('Saldo')
@Controller('balance')
export class BalanceController {
  private response;
  constructor(private readonly findByDateService: FindByDateService) {
    this.response = new ReturnData();
  }

  protected logger = new Logger(BalanceController.name);

  @ApiCreatedResponse({
    status: 201,
    description: 'Created. A new resource was successfully created.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request. The request was invalid.',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description:
      'Unauthorized. The request did not include an authentication token or the authentication token was expired.',
  })
  @ApiForbiddenResponse({
    status: 403,
    description:
      'Forbidden. The client did not have permission to access the requested resource.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not Found. The requested resource was not found.',
  })
  @ApiParam({ name: 'date', type: String, required: true })
  @Get('/date/:date')
  async findByDateExecute(@Param('date') date: string) {
    try {
      const result = await this.findByDateService.execute(date);

      this.response.data = result;
      this.response.status = 200;
      this.response.message = 'Sucess';
      this.response.return = '';
      return this.response;
    } catch (e) {
      return {
        data: [],
        status: e.response?.statusCode ? e.response.statusCode : 500,
        message: e.response?.message
          ? e.response.message
          : 'Ocorreu um erro não esperado no servidor.',
        return: `${e}`,
      } as ReturnData;
    }
  }
}
