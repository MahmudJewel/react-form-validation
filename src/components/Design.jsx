import React, { useState, useEffect } from "react";
import "../asset/design.css";

export default function Design() {
  const initial_values = { uname: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initial_values);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    // console.log(e.target);
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    // console.log(formValues);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log("Errors are : ", formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (v) => {
    const errors = {};
    const regex = /^[^\s@+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!v.uname) {
      errors.uname = "Username is required!";
    }

    if (!v.email) {
      errors.email = "Email is required!";
    }
    // else if(!regex.test(v.mail)){
    //   errors.mail='This is not a valid email!'
    // }

    if (!v.password) {
      errors.password = "Password is required!";
    } else if (v.password.length < 4) {
      errors.password = "Password must be more than 4 characters! ";
    } else if (v.password.length > 10) {
      errors.password = "Password must not be more than 10 characters! ";
    }
    return errors;
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="container d-flex justify-content-center form-bg py-5 mt-5">
        <div className="card mt-4 col-md-8 shadow card-style">
          {Object.keys(formErrors).length === 0 && isSubmit ? (
            <div className="text-center">
              <h1 className="text-center mt-3 text-primary">Sign in Successfull</h1>
            </div>
          ) : (
            <div></div>
          )}

          <div className="card-title mt-3 ">
            <h2 className="text-success text-center">Login Form </h2>
          </div>

          <div className="card-body col-md-8 m-auto">
            <div className="mb-4">
              <h5 className="text-start">Username: </h5>
              <input
                className="form-control text-center"
                type="text"
                placeholder="Username"
                name="uname"
                value={formValues.uname}
                onChange={handleChange}
              />
            </div>
            <p className="text-danger text-center"> {formErrors.uname} </p>
            <div className="mb-4">
              <h5 className="text-start">Email: </h5>
              <input
                className="form-control text-center"
                type="email"
                placeholder="Email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
              />
            </div>
            <p className="text-danger text-center"> {formErrors.email} </p>
            <div className="mb-4">
              <h5 className="text-start">Password: </h5>
              <input
                className="form-control text-center"
                type="password"
                placeholder="Password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
              />
            </div>
            <p className="text-danger text-center"> {formErrors.password} </p>
            <div className="text-center">
              <button className="btn btn-success">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
