function Input({ name, label, value, error, onChange, type }) {
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">{label}</label>
            {/* <input  ref={username} id={name} type="text" className="form-control" /> using Ref */}
            <input autoFocus value={value} onChange={onChange} id={name} name={name} type={type} className="form-control" />
            {error && <div className="alert alert-danger">{error}</div>}
        </div >
    );
}

export default Input;