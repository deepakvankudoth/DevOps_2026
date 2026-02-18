import { Dashboard } from '../modules/Dashboard';

describe('Dashboard Module', () => {
  let dashboard;

  beforeEach(() => {
    dashboard = new Dashboard();
  });

  test('should initialize with zero income and expenses', () => {
    expect(dashboard.totalIncome).toBe(0);
    expect(dashboard.totalExpenses).toBe(0);
  });

  test('should calculate balance correctly', () => {
    dashboard.updateIncome(1000);
    dashboard.updateExpenses(300);
    expect(dashboard.calculateBalance()).toBe(700);
  });

  test('should return correct balance', () => {
    dashboard.totalIncome = 5000;
    dashboard.totalExpenses = 2000;
    expect(dashboard.getBalance()).toBe(3000);
  });

  test('should throw error when adding negative income', () => {
    expect(() => dashboard.updateIncome(-500)).toThrow('Income cannot be negative');
  });

  test('should throw error when adding negative expenses', () => {
    expect(() => dashboard.updateExpenses(-200)).toThrow('Expenses cannot be negative');
  });

  test('should update income correctly', () => {
    dashboard.updateIncome(1500);
    expect(dashboard.totalIncome).toBe(1500);
  });

  test('should update expenses correctly', () => {
    dashboard.updateExpenses(400);
    expect(dashboard.totalExpenses).toBe(400);
  });

  test('should return correct summary', () => {
    dashboard.updateIncome(2000);
    dashboard.updateExpenses(600);
    
    const summary = dashboard.getSummary();
    
    expect(summary.income).toBe(2000);
    expect(summary.expenses).toBe(600);
    expect(summary.balance).toBe(1400);
  });

  test('should handle multiple income and expense updates', () => {
    dashboard.updateIncome(1000);
    dashboard.updateIncome(2000);
    dashboard.updateExpenses(500);
    dashboard.updateExpenses(300);
    
    expect(dashboard.totalIncome).toBe(3000);
    expect(dashboard.totalExpenses).toBe(800);
    expect(dashboard.getBalance()).toBe(2200);
  });
});
