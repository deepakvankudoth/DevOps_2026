import { ExpenseTracker } from '../modules/ExpenseTracker';

describe('ExpenseTracker Module', () => {
  let expenseTracker;

  beforeEach(() => {
    expenseTracker = new ExpenseTracker();
  });

  test('should initialize with empty expenses array', () => {
    expect(expenseTracker.expenses.length).toBe(0);
  });

  test('should add expense successfully', () => {
    const expense = expenseTracker.addExpense('Groceries', 50);
    
    expect(expense.description).toBe('Groceries');
    expect(expense.amount).toBe(50);
    expect(expenseTracker.expenses.length).toBe(1);
  });

  test('should throw error when adding expense with empty description', () => {
    expect(() => expenseTracker.addExpense('', 50)).toThrow('Description is required');
  });

  test('should throw error when adding expense with negative amount', () => {
    expect(() => expenseTracker.addExpense('Groceries', -50)).toThrow('Expense amount must be greater than 0');
  });

  test('should throw error when adding expense with zero amount', () => {
    expect(() => expenseTracker.addExpense('Groceries', 0)).toThrow('Expense amount must be greater than 0');
  });

  test('should remove expense by id', () => {
    expenseTracker.addExpense('Groceries', 50);
    expenseTracker.addExpense('Gas', 40);
    
    expenseTracker.removeExpense(1);
    expect(expenseTracker.expenses.length).toBe(1);
    expect(expenseTracker.expenses[0].description).toBe('Gas');
  });

  test('should throw error when removing non-existent expense', () => {
    expect(() => expenseTracker.removeExpense(999)).toThrow('Expense not found');
  });

  test('should calculate total expenses', () => {
    expenseTracker.addExpense('Groceries', 50);
    expenseTracker.addExpense('Gas', 40);
    expenseTracker.addExpense('Utilities', 100);
    
    expect(expenseTracker.getTotalExpenses()).toBe(190);
  });

  test('should return copy of expenses array', () => {
    expenseTracker.addExpense('Groceries', 50);
    const expenses = expenseTracker.getExpenses();
    
    expenses[0].amount = 999;
    expect(expenseTracker.expenses[0].amount).toBe(50);
  });

  test('should filter expenses by category', () => {
    expenseTracker.addExpense('Groceries - Vegetables', 30);
    expenseTracker.addExpense('Groceries - Fruits', 20);
    expenseTracker.addExpense('Gas', 40);
    
    const groceries = expenseTracker.getExpensesByCategory('Groceries');
    expect(groceries.length).toBe(2);
  });

  test('should handle multiple expenses with correct ids', () => {
    expenseTracker.addExpense('Expense 1', 10);
    expenseTracker.addExpense('Expense 2', 20);
    expenseTracker.addExpense('Expense 3', 30);
    
    expect(expenseTracker.expenses[0].id).toBe(1);
    expect(expenseTracker.expenses[1].id).toBe(2);
    expect(expenseTracker.expenses[2].id).toBe(3);
  });
});
