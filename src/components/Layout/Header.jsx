import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaChartBar, FaPlus, FaWallet } from 'react-icons/fa';
import './Header.css';

const Header = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">
                    <FaWallet className="logo-icon" />
                    <h1>Expense Tracker</h1>
                </div>

                <nav className="nav">
                    <Link
                        to="/"
                        className={`nav-link ${isActive('/') ? 'active' : ''}`}
                    >
                        <FaHome className="nav-icon" />
                        <span>Home</span>
                    </Link>

                    <Link
                        to="/expenses"
                        className={`nav-link ${isActive('/expenses') ? 'active' : ''}`}
                    >
                        <FaChartBar className="nav-icon" />
                        <span>Expenses</span>
                    </Link>

                    <Link
                        to="/add-expense"
                        className={`nav-link add-expense ${isActive('/add-expense') ? 'active' : ''}`}
                    >
                        <FaPlus className="nav-icon" />
                        <span>Add Expense</span>
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
