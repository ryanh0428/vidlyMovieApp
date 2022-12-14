import { NavLink, Link } from 'react-router-dom'
function NavBar({ user }) {
    console.log(user)
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">Vidly</Link>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <NavLink className="nav-item nav-link" to="/movies">Movies</NavLink>
                    <NavLink className="nav-item nav-link" to="/customers">Customers</NavLink>
                    <NavLink className="nav-item nav-link" to="/rentals">Rentals</NavLink>
                    {!user &&
                        <>
                            <NavLink className="nav-item nav-link" to="/login">Login</NavLink>
                            <NavLink className="nav-item nav-link" to="/register">Register</NavLink>
                        </>
                    }
                    {user &&
                        <>
                            <NavLink className="nav-item nav-link" to="/profile">{user.name}</NavLink>
                            <NavLink className="nav-item nav-link" to="/logout">Logout</NavLink>
                        </>
                    }
                </div>
            </div>
        </nav>
    );
}

export default NavBar;