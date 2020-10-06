import React, { useState } from "react";
import { useAppState } from "../state";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { TextField, Button } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Axios from "axios";
import { Alert } from "react-bootstrap";

export default function Dashboard() {
  const { getTeacher, getAnnouncementDetails, addAnnouncement } = useAppState();
  const [value, setvalue] = useState([]);
  const [announcements, setannouncements] = useState(getAnnouncementDetails());
  const [values, setValues] = useState({
    name: "",
    description: "",
    photo: "",
    subject: "",
    formData: "",
  });
  const [success, setsuccess] = useState([]);
  const { name, description, photo, subject, formData } = values;

  const handleSubmit = async () => {
    var res = await addAnnouncement(value);
    if (res) {
      var array = res.data.teacher.announcements.length;
      console.log(res.data.teacher.announcements[array - 1]);
      setannouncements(res.data.teacher.announcements);
      setvalue("");
    }
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    // formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const handlePhotoSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("subject", subject);
    formData.append("photo", photo);
    Axios.post(
      `https://collegespace123.herokuapp.com/college/teacher/addNotes`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${getTeacher().token}`,
        },
      }
    ).then((res) => {
      setValues({
        name: "",
        description: "",
        subject: "",
      });
      setsuccess([" Files uploaded to the server successfully"]);
    });
  };
  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
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
    seeMore: {
      marginTop: theme.spacing(12),
    },
    font: {
      fontSize: "18px",
    },
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
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell className={classes.font}>Date</TableCell>
            <TableCell className={classes.font}>Name</TableCell>
            <TableCell className={classes.font} align="center">
              Announcement
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {announcements &&
            announcements.map((item, index) => (
              <TableRow key={index}>
                <TableCell className={classes.font}>21/02/2020</TableCell>
                <TableCell className={classes.font}>
                  {getTeacher().teacher.name}
                </TableCell>
                <TableCell className={classes.font} align="center">
                  {item}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <div class="announcement">
        <h5> Add your announcement</h5>
        <TextField
          required
          value={value}
          onChange={(e) => setvalue(e.target.value)}
          label="Announcement"
          id="standard-size-normal"
          defaultValue=""
        />
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleSubmit()}
        >
          Primary
        </Button>
      </div>
      <hr />
      {/* NOTES SECTION */}
      <h3 style={{ textAlign: "center", marginTop: "40px" }}> Notes Section</h3>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <form className={classes.form} noValidate>
            <TextField
              value={name}
              onChange={handleChange("name")}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Name"
              autoFocus
            />
            <TextField
              value={subject}
              onChange={handleChange("subject")}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Subject"
              autoFocus
            />
            <TextField
              value={description}
              onChange={handleChange("description")}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Description"
              type="name"
              id="name"
              autoComplete="current-password"
            />
            <input
              type="file"
              margin="normal"
              onChange={handleChange("photo")}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => handlePhotoSubmit(e)}
            >
              Upload Notes
            </Button>
          </form>
        </div>

        {success &&
          success.map((item, index) => (
            <Alert
              key={index}
              variant="success"
              className="mt-2"
              style={{ textAlign: "center" }}
            >
              {item}
            </Alert>
          ))}
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </React.Fragment>
  );
}
