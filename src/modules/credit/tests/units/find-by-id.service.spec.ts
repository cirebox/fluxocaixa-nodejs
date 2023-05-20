import { Test, TestingModule } from '@nestjs/testing';
import { FindByIdService } from '../../services/find-by-id.service';
import { findTransacaoById } from './mocks/transacao';
import { TransactionRepositoryPrisma } from 'src/modules/shared/infra/prisma/repositories/transaction.repository';

describe('FindByIdService', () => {
  let service: FindByIdService;
  let transactionRepository: TransactionRepositoryPrisma;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindByIdService,
        {
          provide: 'ITransactionRepository',
          useValue: { findAll: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<FindByIdService>(FindByIdService);
    transactionRepository = module.get<TransactionRepositoryPrisma>(
      'ITransactionRepository',
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(transactionRepository).toBeDefined();
  });

  test('retorna uma lista de transações com os campos corretos', async () => {
    const param = '1';
    const transacao: CashFlow.Transaction = findTransacaoById(param);

    console.log(transacao);

    jest
      .spyOn(transactionRepository, 'findById')
      .mockResolvedValueOnce(transacao);

    const result = await service.execute(param);
    expect(result).toBeDefined();
    expect(typeof result).toBe('object');
    expect(typeof transactionRepository.findById).toBe('function');
    expect(transactionRepository.findById).toBeDefined();
    expect(transactionRepository.findById).toHaveBeenCalledTimes(1);
    expect(transactionRepository.findById).toHaveBeenCalledWith();

    expect(transacao).toHaveProperty('id');
    expect(transacao).toHaveProperty('date');
    expect(transacao).toHaveProperty('userId');
    expect(transacao).toHaveProperty('type');
    expect(transacao).toHaveProperty('value');
    expect(transacao).toHaveProperty('createAt');
    expect(transacao).toHaveProperty('updateAt');
  });

  test('retorna um valor nulo pois não encontrou registro', async () => {
    const param = '20';
    const transacao: CashFlow.Transaction = findTransacaoById(param);
    expect(Object(transacao)).toBe(null);

    jest
      .spyOn(transactionRepository, 'findById')
      .mockResolvedValueOnce(transacao);

    const result = await service.execute(param);
    expect(result).toBeDefined();
    expect(typeof result).toBe(null);

    expect(transactionRepository.findById).toBeDefined();
    expect(transactionRepository.findById).toHaveBeenCalledTimes(1);
    expect(transactionRepository.findById).toHaveBeenCalledWith();
  });
});
