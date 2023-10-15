import React, { useState } from "react";
import Axios from "axios";
import Joi from "joi";
import { useNavigate } from "react-router-dom";

let inputs = document.getElementsByClassName("form-control");

export default function SignUp() {
  let Navigate = useNavigate();
  const [islodaing, setIslodaing] = useState(false);
  const [errorlist, seterrorlist] = useState([]);
  const [error, seterror] = useState("");
  const [user, setuser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  function getUserData(e) {
    let newUser = { ...user };
    newUser[e.target.name] = e.target.value;
    setuser(newUser);
  }

  async function submitRegester(e) {
    e.preventDefault();

    setIslodaing(true);
    let valdateResult = formValdate();
    if (valdateResult.error) {
      seterrorlist(valdateResult.error.details);
      setIslodaing(false);
    } else {
      let { data } = await Axios.post(
        "https://movies-api.routemisr.com/signup",
        user
      );

      if (data.message === "success") {
        Navigate("/Signin");
        setIslodaing(false);
      } else {
        seterror(data.message);
        setIslodaing(false);
      }
    }
  }

  function formValdate() {
    let schema = Joi.object({
      first_name: Joi.string().alphanum().min(3).max(10).required(),
      last_name: Joi.string().alphanum().min(3).max(10).required(),
      email: Joi.string().email({ tlds: { allow: false } }),
      password: Joi.string().pattern(new RegExp("")).required(),
    });
    return schema.validate(user, { abortEarly: false });
  }

  return (
    <>
      <div className="w-75 mx-auto">
        <h3 className="my-5">Regester Now</h3>

        <form onSubmit={submitRegester}>
          <label htmlFor="first_name">First Name : </label>
          <input
            onChange={getUserData}
            id="first_name"
            className="form-control my-2"
            type="text"
            name="first_name"
          />

          <label htmlFor="last_name">Last Name : </label>
          <input
            onChange={getUserData}
            id="last_name"
            className="form-control my-2"
            type="text"
            name="last_name"
          />

          <label htmlFor="email">Email : </label>
          <input
            onChange={getUserData}
            id="email"
            className="form-control my-2"
            type="email"
            name="email"
          />

          <label htmlFor="password">Passowrd : </label>
          <input
            onChange={getUserData}
            id="password"
            className="form-control my-2"
            type="password"
            name="password"
          />

          <button id="signIn" type="submit" className="btn btn-primary my-2">
            {islodaing ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Regester"
            )}
          </button>

          {error ? <div className=" text-dark">{error}</div> : ""}
          {errorlist.map((error, index) => (
            <div key={index}>
              <h6>{error.message}</h6>
            </div>
          ))}
        </form>
      </div>
    </>
  );
}
