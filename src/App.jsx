import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useState, useEffect } from 'react';
import { ExpenseProvider } from './context/ExpenseContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingScreen from './components/LoadingScreen';
import Login from './pages/Login';
import Home from './pages/Home';
import Expenses from './pages/Expenses';
import AddExpense from './pages/AddExpense';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time and ensure CSS is loaded
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds loading screen

    // Check if Font Awesome is loaded
    const checkFontAwesome = () => {
      const testElement = document.createElement('i');
      testElement.className = 'fas fa-check';
      testElement.style.visibility = 'hidden';
      document.body.appendChild(testElement);

      const isLoaded = window.getComputedStyle(testElement).fontFamily.includes('Font Awesome');
      document.body.removeChild(testElement);

      if (isLoaded) {
        clearTimeout(timer);
        setIsLoading(false);
      }
    };

    // Check Font Awesome loading
    const fontCheck = setInterval(checkFontAwesome, 100);

    // Fallback timeout
    setTimeout(() => {
      clearInterval(fontCheck);
      setIsLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(fontCheck);
    };
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AuthProvider>
      <ExpenseProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }>
                <Route index element={<Home />} />
                <Route path="expenses" element={<Expenses />} />
                <Route path="add-expense" element={<AddExpense />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
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
    </AuthProvider>
  );
}

export default App;
