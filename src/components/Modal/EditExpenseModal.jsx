import React, { useState, useEffect } from 'react';
import { FaSave, FaTimes, FaEdit } from 'react-icons/fa';
import { useExpense } from '../../context/ExpenseContext';
import { EXPENSE_CATEGORIES } from '../../constants/categories';
import './EditExpenseModal.css';

const EditExpenseModal = ({
    isOpen,
    onClose,
    expense
}) => {
    const { editExpense } = useExpense();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        category: 'food'
    });

    useEffect(() => {
        if (expense && isOpen) {
            setFormData({
                description: expense.description || '',
                amount: expense.amount?.toString() || '',
                category: expense.category || 'food'
            });
        }
    }, [expense, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.description.trim() || !formData.amount || !formData.category) {
            return;
        }

        setLoading(true);

        try {
            // Keep the original date when editing
            const expenseData = {
                ...formData,
                date: expense.date // Keep original date
            };

            await editExpense(expense.id, expenseData);
            onClose();
        } catch (error) {
            console.error('Error updating expense:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen || !expense) return null;

    return (
        <div className="edit-modal-backdrop" onClick={handleBackdropClick}>
            <div className="edit-modal-container">
                <div className="edit-modal-header">
                    <div className="edit-modal-title">
                        <FaEdit className="edit-icon" />
                        <h2>Edit Expense</h2>
                    </div>
                    <button className="edit-modal-close" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="edit-modal-form">
                    <div className="edit-form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter expense description"
                            required
                        />
                    </div>

                    <div className="edit-form-group">
                        <label htmlFor="amount">Amount (₹)</label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>

                    <div className="edit-form-group">
                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            {EXPENSE_CATEGORIES.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="edit-form-actions">
                        <button
                            type="button"
                            onClick={onClose}
                            className="edit-btn edit-btn-cancel"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="edit-btn edit-btn-save"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <div className="edit-spinner"></div>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <FaSave />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditExpenseModal;
