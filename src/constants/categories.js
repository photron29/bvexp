import {
    FaUtensils,
    FaCar,
    FaGamepad,
    FaFileInvoiceDollar,
    FaShoppingBag,
    FaGraduationCap
} from 'react-icons/fa';

export const EXPENSE_CATEGORIES = [
    {
        id: 'food',
        name: 'Food',
        icon: FaUtensils,
        color: '#FF6B6B'
    },
    {
        id: 'transport',
        name: 'Transport',
        icon: FaCar,
        color: '#4ECDC4'
    },
    {
        id: 'entertainment',
        name: 'Entertainment',
        icon: FaGamepad,
        color: '#45B7D1'
    },
    {
        id: 'bills',
        name: 'Bills',
        icon: FaFileInvoiceDollar,
        color: '#96CEB4'
    },
    {
        id: 'shopping',
        name: 'Shopping',
        icon: FaShoppingBag,
        color: '#FFEAA7'
    },
    {
        id: 'academy',
        name: 'Academy',
        icon: FaGraduationCap,
        color: '#9B59B6'
    }
];

export const getCategoryById = (id) => {
    return EXPENSE_CATEGORIES.find(category => category.id === id);
};

export const getCategoryIcon = (id) => {
    const category = getCategoryById(id);
    return category ? category.icon : FaShoppingBag;
};

export const getCategoryColor = (id) => {
    const category = getCategoryById(id);
    return category ? category.color : '#95A5A6';
};
