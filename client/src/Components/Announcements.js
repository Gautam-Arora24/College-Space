import React, { useState } from "react";
import { useAppState } from "../state";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

export default function Announcements({ data, name }) {
  const { getTeacher, getAnnouncementDetails, addAnnouncement } = useAppState();
  const [value, setvalue] = useState([]);

  console.log(getAnnouncementDetails());
  const useStyles = makeStyles((theme) => ({
    seeMore: {
      marginTop: theme.spacing(12),
    },
    font: {
      fontSize: "18px",
    },
    color: {
      color: "#DCDCDC",
    },
  }));
  const classes = useStyles();
  return (
    <React.Fragment>
      <Table size="small" className="table">
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
          {data &&
            data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className={classes.color}>21/02/2020</TableCell>
                <TableCell className={classes.color}>{name}</TableCell>
                <TableCell className={classes.color} align="center">
                  {item}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
