import React, { useState, useEffect } from "react";
import Axios from "axios";
import Joi from "joi";
import { useNavigate } from "react-router-dom";

export default function Signin(props) {
  let Navigate = useNavigate();
  const [islodaing, setIslodaing] = useState(false);
  const [errorlist, seterrorlist] = useState([]);
  const [error, seterror] = useState("");

  const [user, setuser] = useState({
    email: "",
    password: "",
  });
  function getUserData(e) {
    let newUser = { ...user };
    newUser[e.target.name] = e.target.value;
    setuser(newUser);
  }

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      Navigate("/home");
    }
  }, []);

  async function submitLogin(e) {
    e.preventDefault();

    setIslodaing(true);
    let valdateResult = formValdate();

    if (valdateResult.error) {
      seterrorlist(valdateResult.error.details);

      setIslodaing(false);
    } else {
      let { data } = await Axios.post(
        "https://movies-api.routemisr.com/signin",
        user
      );

      if (data.message === "success") {
        setIslodaing(false);
        localStorage.setItem("userToken", data.token);
        props.saveUserData();
        Navigate("/home");
      } else {
        seterror(data.message);
        setIslodaing(false);
      }
    }
  }

  function formValdate() {
    let schema = Joi.object({
      email: Joi.string().email({ tlds: { allow: false } }),
      password: Joi.any().required(),
    });
    return schema.validate(user, { abortEarly: false });
  }

  return (
    <>
      <div className="w-75 mx-auto">
        <h3 className="my-5">Login Now</h3>

        <form onSubmit={submitLogin}>
          {errorlist.map((error, index) => (
            <div key={index}>
              <h6>{error.message}</h6>
            </div>
          ))}

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
            {islodaing ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
          </button>

          {error ? <div className=" brdr text-dark">{error}</div> : ""}
        </form>
      </div>
    </>
  );
}
