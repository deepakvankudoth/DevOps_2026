// Income module - manages income tracking
export class IncomeTracker {
  constructor() {
    this.incomes = [];
  }

  addIncome(source, amount) {
    if (!source || source.trim() === '') {
      throw new Error('Income source is required');
    }
    if (amount <= 0) {
      throw new Error('Income amount must be greater than 0');
    }
    
    const income = {
      id: this.incomes.length + 1,
      source,
      amount,
      date: new Date(),
    };
    
    this.incomes.push(income);
    return income;
  }

  removeIncome(id) {
    const index = this.incomes.findIndex(inc => inc.id === id);
    if (index === -1) {
      throw new Error('Income not found');
    }
    this.incomes.splice(index, 1);
  }

  getTotalIncome() {
    return this.incomes.reduce((total, inc) => total + inc.amount, 0);
  }

  getIncomes() {
    return JSON.parse(JSON.stringify(this.incomes));
  }

  getIncomeBySource(source) {
    return this.incomes.filter(inc => inc.source.includes(source));
  }
}
