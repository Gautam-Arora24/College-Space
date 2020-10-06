import React, { useState } from "react";
import { Jumbotron, Alert, Button } from "react-bootstrap";
import Announcements from "./Announcements";
import { useAppState } from "../state";
import { useHistory } from "react-router-dom";

export default function Info() {
  const [value, setvalue] = useState("");
  const {
    getTeacher,
    getAnnouncementDetails,
    getAnnouncementDetailsByInputName,
  } = useAppState();
  const [announcements, setannouncements] = useState("");
  const [errors, seterrors] = useState([]);
  const [teachername, setteachername] = useState("");
  const history = useHistory();

  const getDetails = async () => {
    if (value == "") {
      setannouncements("");
      seterrors(["Please provide valid name of teacher"]);
    } else {
      var array = await getAnnouncementDetailsByInputName(value);
      console.log(array.data.teacher);
      if (array.data.teacher.length == 0) {
        seterrors(["Please provide valid name of teacher"]);
      } else {
        setteachername(value);
        setannouncements(array.data.teacher[0].announcements);
        seterrors([]);
      }
    }
  };

  return (
    <Jumbotron className="jumbotron" style={{ textAlign: "center" }}>
      <h4 style={{ marginBottom: "20px" }}>Enter the name of the Teacher</h4>
      <input
        style={{ marginBottom: "20px" }}
        placeholder="Enter the name"
        value={value}
        onChange={(e) => setvalue(e.target.value)}
      />
      <br />
      <Button
        variant="primary"
        style={{ marginBottom: "20px" }}
        onClick={() => getDetails()}
      >
        Get Announcements
      </Button>{" "}
      {announcements && (
        <Announcements data={announcements} name={teachername} />
      )}
      {errors &&
        errors.map((item, index) => (
          <>
            <Alert className="mt-4" key={index} variant="danger">
              {item}
            </Alert>
          </>
        ))}
    </Jumbotron>
  );
}
