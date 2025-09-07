# Personal Expense Tracker

A modern, responsive expense tracking application built with React and Firebase Firestore.

## Features

- **Dashboard**: Quick overview with monthly analytics and charts
- **Expense Management**: Add, edit, delete, and search expenses
- **Analytics**: Interactive line and pie charts for spending patterns
- **Categories**: Food, Transport, Entertainment, Bills, Shopping
- **Responsive**: Works on desktop, tablet, and mobile
- **Real-time**: Firebase Firestore integration for data persistence
- **Currency**: INR (₹) support with proper formatting

## Tech Stack

- **Frontend**: React 19, Vite, React Router
- **Styling**: CSS3 with modern design patterns
- **Charts**: Recharts for data visualization
- **Icons**: React Icons (FontAwesome)
- **Backend**: Firebase Firestore
- **Notifications**: React Toastify
- **Package Manager**: Bun

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bvexp
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up Firebase**
   - Create a Firebase project
   - Enable Firestore Database
   - Copy `env.example` to `.env`
   - Add your Firebase configuration

4. **Run the development server**
   ```bash
   bun run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── Expense/
│   │   ├── ExpenseItem.jsx    # Individual expense display
│   │   └── ExpenseItem.css
│   └── Layout/
│       ├── Header.jsx         # Navigation header
│       ├── Header.css
│       ├── Layout.jsx         # Main layout wrapper
│       └── Layout.css
├── pages/
│   ├── Home.jsx              # Dashboard page
│   ├── Home.css
│   ├── Expenses.jsx          # Main expenses page with analytics
│   ├── Expenses.css
│   ├── AddExpense.jsx        # Add/Edit expense form
│   └── AddExpense.css
├── context/
│   └── ExpenseContext.jsx    # Global state management
├── firebase/
│   ├── config.js            # Firebase configuration
│   └── expenseService.js    # Firestore operations
├── constants/
│   └── categories.js        # Expense categories
└── App.jsx                  # Main app component
```

## Features Overview

### Dashboard
- Monthly expense summary
- Today's spending
- Interactive charts (Line & Pie)
- Month navigation

### Expense Management
- Add new expenses with auto-filled date
- Edit existing expenses
- Delete expenses with confirmation
- Search and filter by category
- Recent expenses list

### Analytics
- Daily spending patterns (Line chart)
- Category-wise breakdown (Pie chart)
- Monthly totals and averages
- Historical data access

## Firebase Setup

1. Create a new Firebase project
2. Enable Firestore Database
3. Set up security rules (see `firestore.rules`)
4. Get your configuration from Project Settings
5. Update `.env` file with your credentials

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for personal use. Feel free to modify and use as needed.