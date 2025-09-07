import { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
    addExpense,
    updateExpense,
    deleteExpense,
    getExpenses,
    getAllExpenses
} from '../firebase/expenseService';

const ExpenseContext = createContext();

const initialState = {
    expenses: [],
    currentMonth: new Date().getMonth() + 1,
    currentYear: new Date().getFullYear(),
    loading: false,
    error: null
};

const expenseReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload, loading: false };
        case 'SET_EXPENSES':
            return { ...state, expenses: action.payload, loading: false, error: null };
        case 'ADD_EXPENSE':
            return { ...state, expenses: [action.payload, ...state.expenses] };
        case 'UPDATE_EXPENSE':
            return {
                ...state,
                expenses: state.expenses.map(expense =>
                    expense.id === action.payload.id ? action.payload : expense
                )
            };
        case 'DELETE_EXPENSE':
            return {
                ...state,
                expenses: state.expenses.filter(expense => expense.id !== action.payload)
            };
        case 'SET_MONTH_YEAR':
            return { ...state, currentMonth: action.payload.month, currentYear: action.payload.year };
        default:
            return state;
    }
};

export const ExpenseProvider = ({ children }) => {
    const [state, dispatch] = useReducer(expenseReducer, initialState);

    const loadExpenses = async (year = state.currentYear, month = state.currentMonth) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            // Load all expenses instead of filtering by month
            const expenses = await getAllExpenses();
            dispatch({ type: 'SET_EXPENSES', payload: expenses });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.message });
            toast.error('Failed to load expenses');
        }
    };

    const createExpense = async (expenseData) => {
        try {
            const expenseId = await addExpense(expenseData);
            const newExpense = {
                id: expenseId,
                ...expenseData,
                date: new Date(expenseData.date),
                createdAt: new Date()
            };
            dispatch({ type: 'ADD_EXPENSE', payload: newExpense });
            toast.success('Expense added successfully');
            return expenseId;
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.message });
            toast.error('Failed to add expense');
            throw error;
        }
    };

    const editExpense = async (expenseId, expenseData) => {
        try {
            await updateExpense(expenseId, expenseData);
            const updatedExpense = {
                id: expenseId,
                ...expenseData,
                date: new Date(expenseData.date),
                updatedAt: new Date()
            };
            dispatch({ type: 'UPDATE_EXPENSE', payload: updatedExpense });
            toast.success('Expense updated successfully');
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.message });
            toast.error('Failed to update expense');
            throw error;
        }
    };

    const removeExpense = async (expenseId) => {
        try {
            await deleteExpense(expenseId);
            dispatch({ type: 'DELETE_EXPENSE', payload: expenseId });
            toast.success('Expense deleted successfully');
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.message });
            toast.error('Failed to delete expense');
            throw error;
        }
    };

    const changeMonthYear = (month, year) => {
        dispatch({ type: 'SET_MONTH_YEAR', payload: { month, year } });
        loadExpenses(year, month);
    };

    // Load expenses when component mounts
    useEffect(() => {
        loadExpenses();
    }, []);

    const value = {
        ...state,
        loadExpenses,
        createExpense,
        editExpense,
        removeExpense,
        changeMonthYear
    };

    return (
        <ExpenseContext.Provider value={value}>
            {children}
        </ExpenseContext.Provider>
    );
};

export const useExpense = () => {
    const context = useContext(ExpenseContext);
    if (!context) {
        throw new Error('useExpense must be used within an ExpenseProvider');
    }
    return context;
};
