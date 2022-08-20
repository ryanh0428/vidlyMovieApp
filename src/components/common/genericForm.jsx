import { useState } from "react";
import Joi from 'joi';
import Input from "./input"
import Select from "./select"

function GenericForm({ data, schema, onSave, labels, onChangeData, buttonLabel, inputTypes, genres, keys, history }) {
    const [error, setError] = useState({});
    const validate = () => {
        const options = { abortEarly: false };
        const { error } = schema.validate(data, options);
        if (!error) return null;
        const JoiError = {};
        error.details.map(err => {
            JoiError[err.path] = err.message;
        })
        return JoiError;
    }



    const handleSubmit = e => {
        e.preventDefault();
        console.log("hello handle submit", e)
        const errors = validate();
        setError({ ...errors || {} });
        console.log(errors);
        if (errors) return console.log("I am always true");

        //Call the server
        onSave(data);

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
        const newdata = { ...data };
        newdata[input.name] = input.value;
        onChangeData(newdata);
        setError(currentError);
    }


    const types = ["text", "password"];

    return (
        <form onSubmit={handleSubmit}>
            {
                keys.map((objKey, index) => {
                    if (inputTypes.at(index) === 'selection') return (<Select key={objKey} name={objKey} value={data[objKey]} label={labels.at(index)} options={genres} onChange={handleChange} error={error[objKey]} />)
                    return (<Input key={objKey} name={objKey} label={labels.at(index)} value={data[objKey]} onChange={handleChange} error={error[objKey]} type={inputTypes.at(index)} />);
                }
                )
            }

            {/* <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            {/* <input  ref={username} id="username" type="text" className="form-control" /> using Ref */}
            {/* <input autofocus value={data.username} onChange={handleChange} id="username" name="username" type="text" className="form-control" />

            <div className="form-text">Some guide/ additional info</div>
        </div>  */}
            {/* <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input value={data.password} onChange={handleChange} id="password" name="password" type="text" className="form-control" />
            <div className="form-text"></div>
        </div>*/}
            <button disabled={validate()} className="btn btn-primary">{buttonLabel}</button>
        </form>
    );
}

export default GenericForm;