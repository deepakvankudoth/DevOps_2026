import { IncomeTracker } from '../modules/IncomeTracker';

describe('IncomeTracker Module', () => {
  let incomeTracker;

  beforeEach(() => {
    incomeTracker = new IncomeTracker();
  });

  test('should initialize with empty incomes array', () => {
    expect(incomeTracker.incomes.length).toBe(0);
  });

  test('should add income successfully', () => {
    const income = incomeTracker.addIncome('Salary', 3000);
    
    expect(income.source).toBe('Salary');
    expect(income.amount).toBe(3000);
    expect(incomeTracker.incomes.length).toBe(1);
  });

  test('should throw error when adding income with empty source', () => {
    expect(() => incomeTracker.addIncome('', 3000)).toThrow('Income source is required');
  });

  test('should throw error when adding income with negative amount', () => {
    expect(() => incomeTracker.addIncome('Salary', -3000)).toThrow('Income amount must be greater than 0');
  });

  test('should throw error when adding income with zero amount', () => {
    expect(() => incomeTracker.addIncome('Salary', 0)).toThrow('Income amount must be greater than 0');
  });

  test('should remove income by id', () => {
    incomeTracker.addIncome('Salary', 3000);
    incomeTracker.addIncome('Freelance', 500);
    
    incomeTracker.removeIncome(1);
    expect(incomeTracker.incomes.length).toBe(1);
    expect(incomeTracker.incomes[0].source).toBe('Freelance');
  });

  test('should throw error when removing non-existent income', () => {
    expect(() => incomeTracker.removeIncome(999)).toThrow('Income not found');
  });

  test('should calculate total income', () => {
    incomeTracker.addIncome('Salary', 3000);
    incomeTracker.addIncome('Freelance', 500);
    incomeTracker.addIncome('Bonus', 1000);
    
    expect(incomeTracker.getTotalIncome()).toBe(4500);
  });

  test('should return copy of incomes array', () => {
    incomeTracker.addIncome('Salary', 3000);
    const incomes = incomeTracker.getIncomes();
    
    incomes[0].amount = 999;
    expect(incomeTracker.incomes[0].amount).toBe(3000);
  });

  test('should filter incomes by source', () => {
    incomeTracker.addIncome('Freelance - Project A', 500);
    incomeTracker.addIncome('Freelance - Project B', 600);
    incomeTracker.addIncome('Salary', 3000);
    
    const freelanceIncomes = incomeTracker.getIncomeBySource('Freelance');
    expect(freelanceIncomes.length).toBe(2);
  });

  test('should handle multiple incomes with correct ids', () => {
    incomeTracker.addIncome('Income 1', 1000);
    incomeTracker.addIncome('Income 2', 2000);
    incomeTracker.addIncome('Income 3', 3000);
    
    expect(incomeTracker.incomes[0].id).toBe(1);
    expect(incomeTracker.incomes[1].id).toBe(2);
    expect(incomeTracker.incomes[2].id).toBe(3);
  });

  test('should have correct timestamps for incomes', () => {
    const beforeTime = new Date();
    const income = incomeTracker.addIncome('Salary', 3000);
    const afterTime = new Date();
    
    expect(income.date.getTime()).toBeGreaterThanOrEqual(beforeTime.getTime());
    expect(income.date.getTime()).toBeLessThanOrEqual(afterTime.getTime());
  });
});
