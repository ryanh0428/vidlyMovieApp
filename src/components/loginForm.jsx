import { useRef, useEffect, useState } from "react";
import Joi from 'joi';
import Input from "./common/input"
function LoginForm() {
    const [account, setAccount] = useState({ username: '', password: '' });
    const [error, setError] = useState({});

    const schema = Joi.object({
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    })

    const validate = () => {
        const options = { abortEarly: false };
        const { error } = schema.validate(account, options);
        if (!error) return null;
        const JoiError = {};
        error.details.map(err => {
            JoiError[err.path] = err.message;
        })
        return JoiError;
        // const errors = {};
        // if (account.username.trim() === '')
        //     errors.username = "Username is required";
        // if (account.password.trim() === '')
        //     errors.password = "password is required";

        // return Object.keys(errors).length === 0 ? null : errors;
    }
    // var username = useRef(null);

    // useEffect(() => {
    //     console.log("loop?")
    //     username.current.focus();
    // })
    const handleSubmit = e => {
        e.preventDefault();

        const errors = validate();
        setError({ ...errors || {} });
        console.log(errors);
        if (errors) return console.log("I am always true");

        //Call the server
        console.log('Submitted')
        // console.log(username)
        // console.log(username.current.value)// a way to access the dom value
    }

    const validateProperty = ({ name, value }) => {
        const propSchema = schema.extract([name]);
        const propError = propSchema.validate(value);//validate the value of that objects
        if (propError.error) return propError.error.details.at(0).message;
        //error message stored in the array with key detail in error object

    }


    const handleChange = ({ currentTarget: input }) => {
        const currentError = error;
        const errorMessage = validateProperty(input);
        if (errorMessage) currentError[input.name] = errorMessage;
        else delete currentError[input.name];
        const newAccount = { ...account };
        newAccount[input.name] = input.value;
        setAccount(newAccount);
        setError(currentError);
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <Input name="username" label="Username" value={account.username} onChange={handleChange} error={error.username} />
                <Input name="password" label="Password" value={account.password} onChange={handleChange} error={error.password} />
                {/* <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    {/* <input  ref={username} id="username" type="text" className="form-control" /> using Ref */}
                {/* <input autofocus value={account.username} onChange={handleChange} id="username" name="username" type="text" className="form-control" />

                    <div className="form-text">Some guide/ additional info</div>
                </div>  */}
                {/* <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input value={account.password} onChange={handleChange} id="password" name="password" type="text" className="form-control" />
                    <div className="form-text"></div>
                </div>*/}
                <button className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}

export default LoginForm;