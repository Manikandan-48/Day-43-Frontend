import React from "react";
import classes from "./Signup.module.css";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useForm } from "react-hook-form";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";



const schema = yup.object().shape({

  firstName: yup.string().required("First Name is required❗"),
  lastName: yup.string().required("Last Name is required❗"),
  email: yup.string().email().required("Email id is required❗"),
  password: yup.string().min(8, "Password should have atleast be 7 Characters❗"),
  passwordConfirm: yup
    .string()

    .oneOf([yup.ref("password")], "Passwords does not match🚫"),
});


function Signup() {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } 
  = 
  useForm({ resolver: yupResolver(schema) });


  const submitHandler = (data, event) => {
    event.preventDefault();
    const firstName = data.firstName;
    const lastName = data.lastName;
    const email = data.email;
    const password = data.password;
    const confirmPassword = data.confirmPassword;


    fetch("https://day-43-backend.vercel.app/api/v1/users/signup", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },

      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      }),
    })

      .then((res) => {
        if (res.ok) {
          return res.json();
        } 
        else
         {
          return res.json().then((data) => {
            const errorMessage = `${data.message}`;
            throw new Error(errorMessage);
          });
        }
      })

      .then((data) => {
        alert(data.status);
      })

      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className={classes.container}>
      <div className={classes.title}>

        <h2>Signup👨🏻‍💻</h2>
      </div>
      <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>

        <div>
          <TextField
            id="outlined-basic"
            label="First Name🧩"
            variant="outlined"
            margin="normal"
            style={{ width: 299 }}
            type="text"
            name="firstName"
            {...register("firstName", {
              required: true,
            })}
          />
          <p className={classes.error}>{errors.firstName?.message}</p>
        </div>

        <div>
          <TextField
            id="outlined-basic"
            margin="normal"
            name="lastName"
            label="Last Name🪀"
            variant="outlined"
            style={{ width: 299 }}
            type="text"
            {...register("lastName", {
              required: true,
            })}
          />
          <p className={classes.error}>{errors.lastName?.message}</p>
        </div>

        <div>
          <TextField
            name="email"
            id="outlined-basic"
            margin="normal"
            label="Email id📨"
            variant="outlined"
            style={{ width: 299 }}
            type="email"
            {...register("email", {
              required: true,
            })}
          />
          <p className={classes.error}> {errors.email?.message}</p>
        </div>

        <div>
          <TextField
            id="outlined-basic"
            label="Password🔑"
            variant="outlined"
            margin="normal"
            style={{ width: 299 }}
            type="password"
            name="password"
            {...register("password", {
              required: true,
            })}
          />
          <p className={classes.error}> {errors.password?.message}</p>
        </div>

        <div>
          <TextField
            name="confirmPassword"
            id="outlined-basic"
            label="Confirm Password🔒"
            variant="outlined"
            margin="normal"
            style={{ width: 299 }}
            type="password"
            {...register("confirmPassword", {
              required: true,
            })}
          />
          <p className={classes.error}> {errors.passwordConfirm?.message}</p>
        </div>
        
        <div className={classes.btn}>
          <Button variant="contained" type="submit">
            Signup
          </Button>
        </div>

        <hr className={classes.line} />
        <div className={classes.options}>
          <p className={classes.optionsHeading}>Already have an Account❓</p>
          <p className={classes.optionsText}>

            <span onClick={() => history.push("/login")}>Click here</span> to
            Login into your account🛅
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
