import auth from "../../services/authService";
import { Route, Redirect } from 'react-router-dom'
function ProtectedRoute({ path, component: Component, render, ...rest }) {
    return (
        <Route
            path={path}
            {...rest}
            render={
                (props) => {

                    if (!auth.getCurrentUser()) return <Redirect to={{
                        pathname: '/login',
                        state: { from: props.location }//put the target location before get directed to the login page
                    }} />
                    return Component ? <Component {...props} /> : render(props)
                }
            }
        />
    );
}

export default ProtectedRoute;