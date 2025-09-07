import React, { useState } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { FaCalendarAlt, FaReceipt, FaChartLine, FaChartPie, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { EXPENSE_CATEGORIES, getCategoryIcon, getCategoryColor } from '../constants/categories';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import './Home.css';

const Home = () => {
    const { loading, expenses, currentMonth, currentYear, changeMonthYear } = useExpense();
    const [chartType, setChartType] = useState('line');

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const handlePreviousMonth = () => {
        let newMonth = currentMonth - 1;
        let newYear = currentYear;

        if (newMonth < 1) {
            newMonth = 12;
            newYear = currentYear - 1;
        }

        changeMonthYear(newMonth, newYear);
    };

    const handleNextMonth = () => {
        let newMonth = currentMonth + 1;
        let newYear = currentYear;

        if (newMonth > 12) {
            newMonth = 1;
            newYear = currentYear + 1;
        }

        changeMonthYear(newMonth, newYear);
    };

    const handleCurrentMonth = () => {
        const now = new Date();
        changeMonthYear(now.getMonth() + 1, now.getFullYear());
    };

    const isCurrentMonth = () => {
        const now = new Date();
        return currentMonth === now.getMonth() + 1 && currentYear === now.getFullYear();
    };

    if (loading) {
        return (
            <div className="home-container">
                <div className="loading">
                    <div className="spinner"></div>
                    <p>Loading your expenses...</p>
                </div>
            </div>
        );
    }

    // Calculate dashboard metrics
    const currentMonthExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() + 1 === currentMonth && expenseDate.getFullYear() === currentYear;
    });

    const today = new Date();
    const todayExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.toDateString() === today.toDateString();
    });

    const totalThisMonth = currentMonthExpenses.reduce((sum, expense) => {
        const amount = typeof expense.amount === 'number' ? expense.amount : parseFloat(expense.amount) || 0;
        return sum + amount;
    }, 0);

    const spentToday = todayExpenses.reduce((sum, expense) => {
        const amount = typeof expense.amount === 'number' ? expense.amount : parseFloat(expense.amount) || 0;
        return sum + amount;
    }, 0);

    const formatCurrency = (amount) => {
        const numAmount = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(numAmount);
    };

    // Prepare data for charts
    const categoryTotals = EXPENSE_CATEGORIES.map(category => {
        const total = currentMonthExpenses
            .filter(expense => expense.category === category.id)
            .reduce((sum, expense) => {
                const amount = typeof expense.amount === 'number' ? expense.amount : parseFloat(expense.amount) || 0;
                return sum + amount;
            }, 0);

        return {
            ...category,
            total,
            percentage: totalThisMonth > 0 ? (total / totalThisMonth) * 100 : 0
        };
    }).sort((a, b) => b.total - a.total);

    const chartData = categoryTotals.map(category => ({
        name: category.name,
        value: category.total,
        color: category.color
    }));

    // Prepare line chart data (daily spending for the month)
    const lineChartData = [];
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
        const dayExpenses = currentMonthExpenses.filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate.getDate() === day;
        });

        const dayTotal = dayExpenses.reduce((sum, expense) => {
            const amount = typeof expense.amount === 'number' ? expense.amount : parseFloat(expense.amount) || 0;
            return sum + amount;
        }, 0);

        lineChartData.push({
            day: day,
            amount: dayTotal
        });
    }

    return (
        <div className="home-container">
            <div className="home-header">
                <h1>Expense Dashboard</h1>
                <p>Quick overview of your spending</p>
            </div>

            <div className="month-selector">
                <button
                    onClick={handlePreviousMonth}
                    className="nav-btn"
                    title="Previous month"
                >
                    <FaChevronLeft />
                </button>

                <div className="month-display">
                    <h3>{monthNames[currentMonth - 1]} {currentYear}</h3>
                    {!isCurrentMonth() && (
                        <button
                            onClick={handleCurrentMonth}
                            className="current-month-btn"
                            title="Go to current month"
                        >
                            Today
                        </button>
                    )}
                </div>

                <button
                    onClick={handleNextMonth}
                    className="nav-btn"
                    title="Next month"
                >
                    <FaChevronRight />
                </button>
            </div>

            <div className="dashboard-cards">
                <div className="dashboard-card total-card">
                    <div className="card-icon">
                        <FaReceipt />
                    </div>
                    <div className="card-content">
                        <h3>This Month</h3>
                        <div className="card-value">{formatCurrency(totalThisMonth)}</div>
                        <div className="card-subtitle">{currentMonthExpenses.length} expenses</div>
                    </div>
                </div>

                <div className="dashboard-card today-card">
                    <div className="card-icon">
                        <FaCalendarAlt />
                    </div>
                    <div className="card-content">
                        <h3>Today</h3>
                        <div className="card-value">{formatCurrency(spentToday)}</div>
                        <div className="card-subtitle">{todayExpenses.length} expenses</div>
                    </div>
                </div>

            </div>

            <div className="charts-section">
                <div className="charts-header">
                    <h2>Monthly Analytics</h2>
                    <div className="chart-toggle">
                        <button
                            className={`chart-btn ${chartType === 'line' ? 'active' : ''}`}
                            onClick={() => setChartType('line')}
                        >
                            <FaChartLine />
                            Line Chart
                        </button>
                        <button
                            className={`chart-btn ${chartType === 'pie' ? 'active' : ''}`}
                            onClick={() => setChartType('pie')}
                        >
                            <FaChartPie />
                            Pie Chart
                        </button>
                    </div>
                </div>

                <div className="chart-container">
                    {chartType === 'line' ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={lineChartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip
                                    formatter={(value) => [formatCurrency(value), 'Amount']}
                                    labelFormatter={(label) => `Day ${label}`}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="amount"
                                    stroke="#667eea"
                                    strokeWidth={2}
                                    dot={{ fill: '#667eea', strokeWidth: 2, r: 4 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={chartData.filter(item => item.value > 0)}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => percent > 0.05 ? `${name} ${(percent * 100).toFixed(1)}%` : ''}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {chartData.filter(item => item.value > 0).map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => [formatCurrency(value), 'Amount']} />
                            </PieChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>

            {/* Recent Expenses Section */}
            <div className="recent-expenses-section">
                <h3>Recent Expenses</h3>
                <div className="recent-list">
                    {expenses.slice(0, 5).map(expense => (
                        <div key={expense.id} className="recent-item">
                            <div className="recent-icon" style={{ backgroundColor: getCategoryColor(expense.category) }}>
                                {React.createElement(getCategoryIcon(expense.category))}
                            </div>
                            <div className="recent-details">
                                <div className="recent-description">{expense.description}</div>
                                <div className="recent-date">
                                    {new Date(expense.date).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </div>
                            </div>
                            <div className="recent-amount">₹{(typeof expense.amount === 'number' ? expense.amount : parseFloat(expense.amount) || 0).toFixed(2)}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
