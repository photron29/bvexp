import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ExpenseProvider } from './context/ExpenseContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Expenses from './pages/Expenses';
import AddExpense from './pages/AddExpense';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <ExpenseProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="expenses" element={<Expenses />} />
              <Route path="add-expense" element={<AddExpense />} />
            </Route>
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </Router>
    </ExpenseProvider>
  );
}

export default App;
