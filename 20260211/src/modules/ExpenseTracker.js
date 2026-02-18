// Expenses module - manages expense tracking
export class ExpenseTracker {
  constructor() {
    this.expenses = [];
  }

  addExpense(description, amount) {
    if (!description || description.trim() === '') {
      throw new Error('Description is required');
    }
    if (amount <= 0) {
      throw new Error('Expense amount must be greater than 0');
    }
    
    const expense = {
      id: this.expenses.length + 1,
      description,
      amount,
      date: new Date(),
    };
    
    this.expenses.push(expense);
    return expense;
  }

  removeExpense(id) {
    const index = this.expenses.findIndex(exp => exp.id === id);
    if (index === -1) {
      throw new Error('Expense not found');
    }
    this.expenses.splice(index, 1);
  }

  getTotalExpenses() {
    return this.expenses.reduce((total, exp) => total + exp.amount, 0);
  }

  getExpenses() {
    return JSON.parse(JSON.stringify(this.expenses));
  }

  getExpensesByCategory(description) {
    return this.expenses.filter(exp => exp.description.includes(description));
  }
}
