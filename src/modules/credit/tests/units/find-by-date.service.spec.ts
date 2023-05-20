import { Test, TestingModule } from '@nestjs/testing';

import { findTransacaoByDate } from './mocks/transacao';
import { FindByDateService } from '../../services/find-by-date.service';
import { TransactionRepositoryPrisma } from 'src/modules/shared/infra/prisma/repositories/transaction.repository';

describe('FindByDateService', () => {
  let service: FindByDateService;
  let transactionRepository: TransactionRepositoryPrisma;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindByDateService,
        {
          provide: 'ITransactionRepository',
          useValue: { findAll: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<FindByDateService>(FindByDateService);
    transactionRepository = module.get<TransactionRepositoryPrisma>(
      'ITransactionRepository',
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(transactionRepository).toBeDefined();
  });

  test('retorna uma lista de transações com os campos corretos', async () => {
    const param = '2023-05-19';
    const transacoes: CashFlow.Transaction[] = findTransacaoByDate(param);
    expect(Array.isArray(transacoes)).toBe(true);

    jest
      .spyOn(transactionRepository, 'findAll')
      .mockResolvedValueOnce(transacoes);

    const result = await service.execute(param);
    expect(result).toBeDefined();
    expect(typeof result).toBe('object');
    expect(typeof transactionRepository.findByDate).toBe('function');
    expect(transactionRepository.findByDate).toBeDefined();
    expect(transactionRepository.findByDate).toHaveBeenCalledTimes(1);
    expect(transactionRepository.findByDate).toHaveBeenCalledWith();

    transacoes.forEach((transacao) => {
      expect(transacao).toHaveProperty('id');
      expect(transacao).toHaveProperty('date');
      expect(transacao).toHaveProperty('userId');
      expect(transacao).toHaveProperty('type');
      expect(transacao).toHaveProperty('value');
      expect(transacao).toHaveProperty('createAt');
      expect(transacao).toHaveProperty('updateAt');
    });
  });
});
