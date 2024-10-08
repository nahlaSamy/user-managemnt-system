import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';

export default function NavBar() {
    // Ensure to handle the case where AuthContext might be undefined
    const context = useContext(AuthContext);

    if (!context) {
        // Handle the case where AuthContext is not available (optional)
        return null;
    }

    const { userData } = context;

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand text-warning" to="/">UMS</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/link">{userData?.email}</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
