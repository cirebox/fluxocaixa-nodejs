import { Test, TestingModule } from '@nestjs/testing';
import { CreateService } from '../../services/create.service';
import { lancarTransacao } from './mocks/transacao';
import { TransactionRepositoryPrisma } from 'src/modules/shared/infra/prisma/repositories/transaction.repository';

describe('CreateService', () => {
  let service: CreateService;
  let transactionRepository: TransactionRepositoryPrisma;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateService,
        {
          provide: 'ITransactionRepository',
          useValue: { findAll: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<CreateService>(CreateService);
    transactionRepository = module.get<TransactionRepositoryPrisma>(
      'ITransactionRepository',
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(transactionRepository).toBeDefined();
  });

  test('retorna a transação com o campo data atualizados', async () => {
    const body: CashFlow.Transaction = {
      date: '2023-05-19',
      userId: '123',
      type: 'D',
      value: 100.0,
    };

    const transacao: CashFlow.Transaction = lancarTransacao(body);

    jest
      .spyOn(transactionRepository, 'create')
      .mockResolvedValueOnce(transacao);

    expect(typeof body).toBe('object');
    const result = await service.execute(body);
    expect(result).toBeDefined();
    expect(typeof result).toBe('object');
    expect(typeof transactionRepository.create).toBe('function');
    expect(transactionRepository.create).toBeDefined();
    expect(transactionRepository.create).toHaveBeenCalledTimes(1);
    expect(transactionRepository.create).toHaveBeenCalledWith();
  });
});
