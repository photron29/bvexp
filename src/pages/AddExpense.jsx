import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSave, FaTimes } from 'react-icons/fa';
import { useExpense } from '../context/ExpenseContext';
import { EXPENSE_CATEGORIES } from '../constants/categories';
import './AddExpense.css';

const AddExpense = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { expenses, createExpense, editExpense } = useExpense();

    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        category: 'food'
    });

    const [loading, setLoading] = useState(false);

    const isEditing = Boolean(id);

    useEffect(() => {
        if (isEditing) {
            const expense = expenses.find(exp => exp.id === id);
            if (expense) {
                setFormData({
                    description: expense.description,
                    amount: expense.amount.toString(),
                    category: expense.category
                });
            }
        }
    }, [id, expenses, isEditing]);

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
            // Add current date and time to form data
            const expenseData = {
                ...formData,
                date: new Date().toISOString()
            };

            if (isEditing) {
                await editExpense(id, expenseData);
            } else {
                await createExpense(expenseData);
            }
            navigate('/expenses');
        } catch (error) {
            console.error('Error saving expense:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/expenses');
    };

    return (
        <div className="expense-form-container">
            <div className="expense-form-card">
                <div className="form-header">
                    <h2>{isEditing ? 'Edit Expense' : 'Add New Expense'}</h2>
                </div>

                <form onSubmit={handleSubmit} className="expense-form">
                    <div className="form-group">
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

                    <div className="form-group">
                        <label htmlFor="amount">Amount</label>
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

                    <div className="form-group">
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


                    <div className="form-actions">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="btn btn-secondary"
                            disabled={loading}
                        >
                            <FaTimes className="btn-icon" />
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            <FaSave className="btn-icon" />
                            {loading ? 'Saving...' : (isEditing ? 'Update' : 'Save')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddExpense;
