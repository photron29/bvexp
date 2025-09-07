import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDocs,
    query,
    where,
    orderBy,
    Timestamp
} from 'firebase/firestore';
import { db } from './config';

const EXPENSES_COLLECTION = 'expenses';

export const addExpense = async (expenseData) => {
    try {
        const docRef = await addDoc(collection(db, EXPENSES_COLLECTION), {
            ...expenseData,
            amount: parseFloat(expenseData.amount),
            date: Timestamp.fromDate(new Date(expenseData.date)),
            createdAt: Timestamp.now()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error adding expense:', error);
        throw error;
    }
};

export const updateExpense = async (expenseId, expenseData) => {
    try {
        const expenseRef = doc(db, EXPENSES_COLLECTION, expenseId);
        await updateDoc(expenseRef, {
            ...expenseData,
            amount: parseFloat(expenseData.amount),
            date: Timestamp.fromDate(new Date(expenseData.date)),
            updatedAt: Timestamp.now()
        });
    } catch (error) {
        console.error('Error updating expense:', error);
        throw error;
    }
};

export const deleteExpense = async (expenseId) => {
    try {
        await deleteDoc(doc(db, EXPENSES_COLLECTION, expenseId));
    } catch (error) {
        console.error('Error deleting expense:', error);
        throw error;
    }
};

export const getExpenses = async (year, month) => {
    try {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59);

        const q = query(
            collection(db, EXPENSES_COLLECTION),
            where('date', '>=', Timestamp.fromDate(startDate)),
            where('date', '<=', Timestamp.fromDate(endDate)),
            orderBy('date', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const expenses = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            expenses.push({
                id: doc.id,
                ...data,
                date: data.date.toDate(),
                createdAt: data.createdAt?.toDate(),
                updatedAt: data.updatedAt?.toDate()
            });
        });

        return expenses;
    } catch (error) {
        console.error('Error getting expenses:', error);
        throw error;
    }
};

export const getAllExpenses = async () => {
    try {
        const q = query(
            collection(db, EXPENSES_COLLECTION),
            orderBy('date', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const expenses = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            expenses.push({
                id: doc.id,
                ...data,
                date: data.date.toDate(),
                createdAt: data.createdAt?.toDate(),
                updatedAt: data.updatedAt?.toDate()
            });
        });

        return expenses;
    } catch (error) {
        console.error('Error getting all expenses:', error);
        throw error;
    }
};
