import React, { useState } from "react";
import { TextField, Container, Button } from "@material-ui/core";
import Axios from "axios";
import { Alert } from "react-bootstrap";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { API } from "../";

export default function Notes() {
  const [subject, setsubject] = useState("");
  const [file, setfile] = useState([]);
  const [errors, seterrors] = useState([]);

  function arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }

  const handleSubmit = () => {
    if (!subject) {
      seterrors(["Kindly enter a valid subject"]);
      setfile([]);
    } else {
      Axios.post(
        "https://collegespacebackend-production.up.railway.app/college/teacher/getphoto",
        {
          subject: subject,
        }
      ).then((res) => {
        console.log(res);
        if (res.data == "") {
          return seterrors(["Kindly provide a valid subject"]);
        }
        setfile(res.data);
        seterrors([]);
      });
    }
  };

  return (
    <div>
      {" "}
      <Container component="main" maxWidth="xs" style={{ textAlign: "center" }}>
        <h4 style={{ marginTop: "40px" }}>
          Enter the subject you want notes for
        </h4>
        <TextField
          value={subject}
          onChange={(e) => setsubject(e.target.value)}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Subject"
          autoFocus
        />
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "30px" }}
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          Get Notes
        </Button>
        {errors &&
          errors.map((item, index) => (
            <Alert
              key={index}
              variant="danger"
              className="mt-2"
              style={{ textAlign: "center" }}
            >
              {item}
            </Alert>
          ))}
        {file &&
          file.map((item, index) => (
            // <img
            //   src={
            //     "data:image/jpeg;base64," +
            //     arrayBufferToBase64(item.photo.data.data)
            //   }
            //   key={index}
            // />
            <div>
              <Card style={{ marginTop: "30px" }}>
                <CardImg
                  top
                  width="100%"
                  src={
                    "data:image/jpeg;base64," +
                    arrayBufferToBase64(item.photo.data.data)
                  }
                  alt="Card image cap"
                />
                <CardBody>
                  <CardTitle>{item.name}</CardTitle>
                  <CardSubtitle>Subject - {item.subject}</CardSubtitle>
                  <CardText>Description - {item.description}</CardText>
                </CardBody>
              </Card>
            </div>
          ))}
      </Container>
    </div>
  );
}
