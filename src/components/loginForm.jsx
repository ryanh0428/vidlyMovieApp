import { useRef, useEffect } from "react";
function LoginForm() {
    var username = useRef(null);

    // useEffect(() => {
    //     console.log("loop?")
    //     username.current.focus();
    // })
    const handleSubmit = e => {
        e.preventDefault();

        //Call the server
        console.log('Submitted')
        // console.log(username)
        console.log(username.current.value)// a way to access the dom value
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input autoFocus ref={username} id="username" type="text" className="form-control" />
                    <div className="form-text">Some guide/ additional info</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input id="password" type="text" className="form-control" />
                    <div className="form-text"></div>
                </div>
                <button className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}

export default LoginForm;