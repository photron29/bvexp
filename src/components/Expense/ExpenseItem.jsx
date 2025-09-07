import { FaEdit, FaTrash } from 'react-icons/fa';
import { getCategoryIcon, getCategoryColor } from '../../constants/categories';
import './ExpenseItem.css';

const ExpenseItem = ({ expense, onDelete, onEdit }) => {
    const CategoryIcon = getCategoryIcon(expense.category);
    const categoryColor = getCategoryColor(expense.category);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatAmount = (amount) => {
        const numAmount = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(numAmount);
    };

    return (
        <div className="expense-item">
            <div className="expense-icon" style={{ backgroundColor: categoryColor }}>
                <CategoryIcon />
            </div>

            <div className="expense-details">
                <div className="expense-description">
                    {expense.description}
                </div>
                <div className="expense-meta">
                    <span className="expense-category">{expense.category}</span>
                    <span className="expense-date">{formatDate(expense.date)}</span>
                </div>
            </div>

            <div className="expense-amount">
                {formatAmount(expense.amount)}
            </div>

            <div className="expense-actions">
                <button
                    onClick={() => onEdit(expense.id)}
                    className="action-btn edit-btn"
                    title="Edit expense"
                >
                    <FaEdit />
                </button>

                <button
                    onClick={() => onDelete(expense.id)}
                    className="action-btn delete-btn"
                    title="Delete expense"
                >
                    <FaTrash />
                </button>
            </div>
        </div>
    );
};

export default ExpenseItem;
