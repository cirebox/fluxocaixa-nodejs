import { Test, TestingModule } from '@nestjs/testing';
import { FindAllService } from '../../services/find-all.service';
import { findTransacao } from './mocks/transacao';
import { TransactionRepositoryPrisma } from 'src/modules/shared/infra/prisma/repositories/transaction.repository';
describe('FindAllService', () => {
  let service: FindAllService;
  let transactionRepository: TransactionRepositoryPrisma;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllService,
        {
          provide: 'ITransactionRepository',
          useValue: { findAll: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<FindAllService>(FindAllService);
    transactionRepository = module.get<TransactionRepositoryPrisma>(
      'ITransactionRepository',
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(transactionRepository).toBeDefined();
  });

  test('retorna uma lista de transações com os campos corretos', async () => {
    const transacoes: CashFlow.Transaction[] = findTransacao();
    expect(Array.isArray(transacoes)).toBe(true);

    jest
      .spyOn(transactionRepository, 'findAll')
      .mockResolvedValueOnce(transacoes);

    const result = await service.execute();
    expect(result).toBeDefined();
    expect(typeof result).toBe('object');
    expect(typeof transactionRepository.findAll).toBe('function');
    expect(transactionRepository.findAll).toBeDefined();
    expect(transactionRepository.findAll).toHaveBeenCalledTimes(1);

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
