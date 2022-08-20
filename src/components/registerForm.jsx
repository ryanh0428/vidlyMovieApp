import { createFactory, useState } from "react";
import Joi from 'joi';
import GenericForm from "./common/genericForm"
import * as userService from "../services/userService";
import auth from "../services/authService";

function RegisterForm({ history }) {
    const [data, setdata] = useState({ username: "", password: "", name: "" })
    const [error, setError] = useState(null);
    const schema = Joi.object({
        username: Joi.string().email({ tlds: { allow: false } }).required().label('Username'),
        password: Joi.string().min(5).required().label('Password'),
        name: Joi.string().required().label('Name')
    })
    const labels = ["Username", "Password", "Name"];
    const keys = ['username', 'password', 'name'];
    const buttonLabel = "Register";
    const inputTypes = ["text", "password", "text"];



    const doSubmit = async (data) => {
        try {
            const response = await userService.register(data);
            auth.loginWithJwt(response.headers['x-auth-token']);
            window.location = '/';
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                setError(ex.response.data);

            }
        }
    }

    const handleChangeData = (data) => {
        setdata(data);
    }

    return (
        <div>
            <h1>Register</h1>
            <GenericForm
                data={data}
                schema={schema}
                onSave={doSubmit}
                labels={labels}
                onChangeData={handleChangeData}
                buttonLabel={buttonLabel}
                inputTypes={inputTypes}
                keys={keys}
                history={history}
                usernameError={error} />
            <h1>{error}</h1>

        </div>
    );
}

export default RegisterForm;