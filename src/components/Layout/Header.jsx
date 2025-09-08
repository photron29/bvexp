import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaChartBar, FaPlus, FaWallet, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
    const location = useLocation();
    const { user, logout } = useAuth();

    const isActive = (path) => {
        return location.pathname === path;
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">
                    <FaWallet className="logo-icon" />
                    <h1>Bvexp Logger</h1>
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

                    <div className="user-section">
                        <div className="user-info">
                            <FaUser className="user-icon" />
                            <span className="username">{user?.username}</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="logout-btn"
                            title="Logout"
                        >
                            <i class="fa-solid fa-right-from-bracket" />
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
