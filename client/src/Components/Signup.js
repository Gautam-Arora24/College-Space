import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function Signup() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");
  const [branch, setbranch] = useState("");
  const [errors, seterrors] = useState(null);
  const history = useHistory();

  function HandleSignUp() {
    axios({
      method: "post",
      url: `http://localhost:8000/college/teacher/signup`,
      data: {
        emailID: email,
        name: name,
        password: password,
        branch: branch,
      },
    })
      .then((res) => {
        history.push("/login");
        setemail("");
        setname("");
        setpassword("");
        setbranch("");
      })
      .catch((err) => {
        console.log(err.response.data.errors.errors);
        if (Array.isArray(err.response.data.errors.errors)) {
          seterrors(err.response.data.errors.errors);
        } else {
          seterrors([{ msg: err.response.data.errors.errors }]);
        }
        console.log(errors);
      });
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
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(3),
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
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                value={name}
                onChange={(e) => {
                  setname(e.target.value);
                }}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Full Name"
                autoFocus
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={branch}
                onChange={(e) => {
                  setbranch(e.target.value);
                }}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="FirstName"
                label="Branch"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            onClick={(e) => {
              e.preventDefault();
              HandleSignUp();
            }}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
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
