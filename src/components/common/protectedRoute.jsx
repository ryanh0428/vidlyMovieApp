import auth from "../../services/authService";
import { Route, Redirect } from 'react-router-dom'
function ProtectedRoute({ path, component: Component, render, ...rest }) {
    return (
        <Route
            path={path}
            {...rest}
            render={
                (props) => {
                    if (!auth.getCurrentUser()) return <Redirect to="/login" />
                    return Component ? <Component {...props} /> : render(props)
                }
            }
        />
    );
}

export default ProtectedRoute;