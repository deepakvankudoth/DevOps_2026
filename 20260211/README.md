# Personal Finance Tracker - CI/CD Lab Assignment

[![CI Pipeline](https://github.com/<YOUR_USERNAME>/personal-finance-tracker/actions/workflows/ci.yml/badge.svg)](https://github.com/<YOUR_USERNAME>/personal-finance-tracker/actions/workflows/ci.yml)

A Personal Finance Tracker SPA built with React and Node.js, featuring a complete CI/CD pipeline using GitHub Actions.

## 📋 Project Overview

This project is a Single Page Application (SPA) that tracks personal finances with the following modules:
- **Dashboard**: Displays financial summary (income, expenses, balance)
- **Expense Tracker**: Manage and categorize expenses
- **Income Tracker**: Track income sources and amounts

## ✨ Features

- ✅ Automated testing on every push and pull request
- ✅ Continuous integration with GitHub Actions
- ✅ Unit tests for all modules (Dashboard, Expenses, Income)
- ✅ Build fails if any tests fail
- ✅ Automated code coverage reporting
- ✅ Multi-version Node.js testing (16.x, 18.x)

## 🛠️ Tech Stack

- **Frontend**: React 18.2.0
- **Testing**: Jest 29.5.0, React Testing Library
- **Build Tool**: React Scripts 5.0.1
- **CI/CD**: GitHub Actions
- **Code Coverage**: Codecov

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/<YOUR_USERNAME>/personal-finance-tracker.git
cd personal-finance-tracker
```

2. Install dependencies:
```bash
npm install
```

## 🚀 Usage

### Development Server
```bash
npm start
```

### Run Tests
```bash
npm test
```

### Run Tests with Coverage
```bash
npm test -- --coverage
```

### Build for Production
```bash
npm run build
```

### Watch Mode Tests
```bash
npm run test:watch
```

## 📁 Project Structure

```
personal-finance-tracker/
├── .github/
│   └── workflows/
│       └── ci.yml                    # CI Pipeline configuration
├── src/
│   ├── modules/
│   │   ├── Dashboard.js              # Dashboard module
│   │   ├── Dashboard.test.js         # Dashboard tests
│   │   ├── ExpenseTracker.js         # Expense tracking module
│   │   ├── ExpenseTracker.test.js    # Expense tests
│   │   ├── IncomeTracker.js          # Income tracking module
│   │   ├── IncomeTracker.test.js     # Income tests
│   ├── App.js                         # Main React component
│   ├── index.js                       # Application entry point
│   └── setupTests.js                  # Jest setup
├── public/
│   └── index.html                     # HTML template
├── jest.config.js                     # Jest configuration
├── .babelrc                           # Babel configuration
├── package.json                       # Project dependencies
└── README.md                          # This file
```

## 🧪 Testing

The project includes comprehensive unit tests for all modules:

### Dashboard Module Tests
- Initialize with zero balance
- Calculate balance correctly
- Handle negative values with proper error handling
- Update income and expenses
- Generate financial summary

### Expense Tracker Tests
- Add and remove expenses
- Validate expense descriptions and amounts
- Calculate total expenses
- Filter by category
- Maintain expense IDs

### Income Tracker Tests
- Add and remove income sources
- Validate income sources and amounts
- Calculate total income
- Filter by source
- Maintain income IDs and timestamps

## 🔄 CI/CD Pipeline Flow

```
Code Push/Pull Request
        ↓
    Checkout Code
        ↓
   Setup Node.js (16.x, 18.x)
        ↓
  Install Dependencies
        ↓
    Run Tests ← (FAILS: Pipeline stops)
        ↓
   Build Project ← (FAILS: Pipeline stops)
        ↓
  Upload Coverage
        ↓
   Pipeline Success ✓
```

### Pipeline Features

✅ **Triggers**: Push to `main`/`develop` or any Pull Request  
✅ **Node Version Matrix**: Tests on 16.x and 18.x  
✅ **Fail Fast**: Pipeline fails immediately if tests fail  
✅ **Code Coverage**: Automatic coverage report upload  
✅ **Build Verification**: Ensures production build is successful  

## 📊 CI Status Badge

Add the following badge to your README to display CI status:

```markdown
[![CI Pipeline](https://github.com/<YOUR_USERNAME>/personal-finance-tracker/actions/workflows/ci.yml/badge.svg)](https://github.com/<YOUR_USERNAME>/personal-finance-tracker/actions/workflows/ci.yml)
```

## 📝 Development Workflow

1. Create a feature branch
2. Make changes and run tests locally: `npm test`
3. Commit and push to GitHub
4. GitHub Actions automatically runs CI pipeline
5. Review action logs in Actions tab
6. Create Pull Request for code review
7. CI runs again on PR
8. Merge when all checks pass

## 🔧 Configuration

### GitHub Actions Setup

The CI pipeline is configured in [`.github/workflows/ci.yml`](.github/workflows/ci.yml)

Key features:
- Automatic trigger on push and pull_request
- Matrix strategy for multiple Node versions
- Test coverage collection
- Build artifact generation
- Fail on test failures (no manual override)

### Jest Configuration

Jest is configured to:
- Use jsdom test environment (browser-like)
- Collect coverage statistics
- Transform JSX with Babel
- Include React Testing Library setup

## 📈 Code Coverage

Coverage reports are automatically generated and can be viewed:
1. In GitHub Actions logs
2. On Codecov.io (if integrated)
3. Locally with: `npm test -- --coverage`

## 🐛 Troubleshooting

### Tests failing locally but passing in CI?
- Ensure Node.js version matches CI (16.x or 18.x)
- Run `npm install` to get latest dependencies
- Clear cache: `npm test -- --clearCache`

### Build fails but tests pass?
- Check for console errors: `npm run build`
- Ensure all dependencies are properly imported
- Verify React components are exported correctly

### CI pipeline not triggering?
- Ensure `.github/workflows/ci.yml` is in main branch
- Check GitHub Actions are enabled in repository settings
- Verify branch names in workflow match your repository

## 📚 Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Jest Testing Guide](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/react)
- [React Documentation](https://react.dev)

## 📄 License

This is a DevOps lab assignment project. Use freely for educational purposes.

## 👤 Author

DevOps Lab Assignment - February 2026

---

**Status**: ✅ CI Pipeline Active  
**Last Updated**: February 11, 2026  
**Node.js Versions Tested**: 16.x, 18.x
