import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaFilter, FaReceipt } from 'react-icons/fa';
import { useExpense } from '../context/ExpenseContext';
import { EXPENSE_CATEGORIES } from '../constants/categories';
import ExpenseItem from '../components/Expense/ExpenseItem';
import ConfirmationModal from '../components/Modal/ConfirmationModal';
import EditExpenseModal from '../components/Modal/EditExpenseModal';
import './Expenses.css';

const Expenses = () => {
    const { expenses, removeExpense, loading } = useExpense();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [expenseToDelete, setExpenseToDelete] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [expenseToEdit, setExpenseToEdit] = useState(null);

    const handleDeleteClick = (expenseId) => {
        const expense = expenses.find(exp => exp.id === expenseId);
        setExpenseToDelete({ id: expenseId, description: expense?.description || 'this expense' });
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        if (expenseToDelete) {
            await removeExpense(expenseToDelete.id);
        }
    };

    const handleDeleteCancel = () => {
        setShowDeleteModal(false);
        setExpenseToDelete(null);
    };

    const handleEditClick = (expenseId) => {
        const expense = expenses.find(exp => exp.id === expenseId);
        setExpenseToEdit(expense);
        setShowEditModal(true);
    };

    const handleEditClose = () => {
        setShowEditModal(false);
        setExpenseToEdit(null);
    };

    const filteredExpenses = expenses.filter(expense => {
        const matchesCategory = selectedCategory === 'all' || expense.category === selectedCategory;
        const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const totalAmount = filteredExpenses.reduce((sum, expense) => {
        const amount = typeof expense.amount === 'number' ? expense.amount : parseFloat(expense.amount) || 0;
        return sum + amount;
    }, 0);

    if (loading) {
        return (
            <div className="expense-list-container">
                <div className="loading">
                    <div className="spinner"></div>
                    <p>Loading expenses...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="expense-list-container">
            <div className="expense-list-header">
                <div className="header-top">
                    <h2>Expense Management</h2>
                    <Link to="/add-expense" className="add-expense-btn">
                        <FaPlus className="btn-icon" />
                        Add New Expense
                    </Link>
                </div>


                <div className="filters">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Search expenses..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    <div className="category-filter">
                        <FaFilter className="filter-icon" />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="category-select"
                        >
                            <option value="all">All Categories</option>
                            {EXPENSE_CATEGORIES.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="total-summary">
                    <div className="total-amount">
                        <span className="total-label">Total:</span>
                        <span className="total-value">₹{(totalAmount || 0).toFixed(2)}</span>
                    </div>
                    <div className="expense-count">
                        {filteredExpenses.length} expense{filteredExpenses.length !== 1 ? 's' : ''}
                    </div>
                </div>
            </div>

            <div className="expense-list">
                {filteredExpenses.length === 0 ? (
                    <div className="empty-state">
                        <FaReceipt className="empty-icon" />
                        <h3>No expenses found</h3>
                        <p>
                            {searchTerm || selectedCategory !== 'all'
                                ? 'Try adjusting your search or filter criteria.'
                                : 'Start by adding your first expense!'
                            }
                        </p>
                        {!searchTerm && selectedCategory === 'all' && (
                            <Link to="/add-expense" className="btn btn-primary">
                                <FaPlus className="btn-icon" />
                                Add Your First Expense
                            </Link>
                        )}
                    </div>
                ) : (
                    filteredExpenses.map(expense => (
                        <ExpenseItem
                            key={expense.id}
                            expense={expense}
                            onDelete={handleDeleteClick}
                            onEdit={handleEditClick}
                        />
                    ))
                )}
            </div>

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
                title="Delete Expense"
                message={`Are you sure you want to delete "${expenseToDelete?.description}"? This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
                type="danger"
            />

            {/* Edit Expense Modal */}
            <EditExpenseModal
                isOpen={showEditModal}
                onClose={handleEditClose}
                expense={expenseToEdit}
            />
        </div>
    );
};

export default Expenses;
