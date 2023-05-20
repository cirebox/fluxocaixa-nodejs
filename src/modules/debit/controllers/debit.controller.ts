import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ReturnData } from 'src/modules/shared/dto/return.dto';
import { CreateCreditDto } from '../dtos/create-credit-dto';
import { CreateService } from '../services/create.service';
import { FindAllService } from '../services/find-all.service';
import { FindByDateService } from '../services/find-by-date.service';
import { FindByIdService } from '../services/find-by-id.service';

@ApiTags('Débito')
@Controller('debit')
export class DebitController {
  private response;
  constructor(
    private readonly createService: CreateService,
    private readonly findAllService: FindAllService,
    private readonly findByIDService: FindByIdService,
    private readonly findByDateService: FindByDateService,
  ) {
    this.response = new ReturnData();
  }

  protected logger = new Logger(DebitController.name);

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
  @ApiBody({ type: CreateCreditDto, required: true })
  @Post()
  async createExecute(@Body() data: CreateCreditDto) {
    try {
      const result = await this.createService.execute(data);

      this.response.data = result;
      this.response.status = 201;
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
  @Get()
  async findExecute() {
    try {
      const result = await this.findAllService.execute();

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
  @ApiParam({ name: 'id', type: String, required: true })
  @Get('/id/:id')
  async findByIDExecute(@Param('id') id: string) {
    try {
      const result = await this.findByIDService.execute(id);

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
