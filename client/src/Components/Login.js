import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Alert } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useAppState } from "../state";
import { Link } from "@material-ui/core";

export default function Login() {
  const { setTeacher } = useAppState();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errors, seterrors] = useState(null);
  const history = useHistory();
  const handleLogin = () => {
    axios
      .post(`https://collegespacebackend-production.up.railway.app/college/teacher/signin`, {
        emailID: email,
        password: password,
      })
      .then((res) => {
        setpassword("");
        setemail("");
        seterrors(null);
        setTeacher(res.data);
        history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err.response);
        if (Array.isArray(err.response.data.err)) {
          seterrors(err.response.data.err);
        } else {
          seterrors([{ msg: err.response.data.err }]);
        }
      });
  };
  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        {/* {new Date().getFullYear()} */}
        Gautam Arora
        {". "}
        Made with{" "}
        <span role="img" aria-label="sheep">
          ❤️
        </span>{" "}
        {"."}
      </Typography>
    );
  }
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            Log In
          </Button>
          <Copyright />
        </form>
      </div>
      {errors &&
        errors.map(({ msg }, index) => (
          <Alert key={index} variant="danger" className="mt-2">
            {msg}
          </Alert>
        ))}
    </Container>
  );
}
