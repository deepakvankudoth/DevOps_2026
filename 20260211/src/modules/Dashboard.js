// Dashboard module - displays financial summary
export class Dashboard {
  constructor() {
    this.totalIncome = 0;
    this.totalExpenses = 0;
  }

  calculateBalance() {
    return this.totalIncome - this.totalExpenses;
  }

  updateIncome(amount) {
    if (amount < 0) {
      throw new Error('Income cannot be negative');
    }
    this.totalIncome += amount;
  }

  updateExpenses(amount) {
    if (amount < 0) {
      throw new Error('Expenses cannot be negative');
    }
    this.totalExpenses += amount;
  }

  getBalance() {
    return this.calculateBalance();
  }

  getSummary() {
    return {
      income: this.totalIncome,
      expenses: this.totalExpenses,
      balance: this.getBalance(),
    };
  }
}
