import { createFactory, useState } from "react";
import Joi from 'joi';
import GenericForm from "./common/genericForm"

function RegisterForm() {
    const [data, setdata] = useState({ username: "", password: "", name: "" })
    const schema = Joi.object({
        username: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().min(5).required(),
        name: Joi.string().required()
    })
    const labels = ["Username", "Password", "Name"];
    const buttonLabel = "Register";
    const inputTypes = ["text", "password", "text"];

    const doSubmit = () => {
        console.log('Submitted')
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
                onSubmit={doSubmit}
                labels={labels}
                onChangeData={handleChangeData}
                buttonLabel={buttonLabel}
                inputTypes={inputTypes} />

        </div>
    );
}

export default RegisterForm;