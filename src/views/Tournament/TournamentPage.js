import React, { useState, useEffect } from "react";
import MaterialTable from 'material-table';
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "../../components/Grid/GridItem.js";
import styles from "../../assets/jss/material-kit-react/components/mainStyle.js";
import image from "../../assets/img/profile-bg.jpg";
import { Alert } from '@material-ui/lab';
import { Service } from "../../utils/Service.js";
import { Grid } from "@material-ui/core";


const useStyles = makeStyles(styles);

const TournamentPage = () => {
    const classes = useStyles();
  var columns = [
    { title: "TournamentID", field: "TournamentID", hidden: true },
    { title: "Tournament Name", field: "TournamentName" }
  ];

  const [data, setData] = useState([]);
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    Service.BettingAPI.get("/Tournament/GetTournament", {headers: Service.AutHeader()})
      .then(res => {
        setData(res.data)
        console.log(res.data)
      })
      .catch(error => {
        console.log("Error")
      })
  }, [])

  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = []
    //newDate.TournamentID = 0;
    if (newData.TournamentName === "") {
      errorList.push("Please enter Tournament Name")
    }

    if (errorList.length < 1) {
      Service.BettingAPI.patch("/Tournament/UpdateTournament/" + newData.TournamentID, newData)
        .then(res => {
          console.log(res)
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
          resolve();
          setIserror(false);
          setErrorMessages([]);
        })
        .catch(error => {
          setErrorMessages(["Update failed! Server error"])
          setIserror(true);
          resolve();
        })
    } else {
      setErrorMessages(errorList)
      setIserror(true);
      resolve();
    }
  }

  const handleRowAdd = (newData, resolve) => {
    //validation
    let errorList = []
    if (newData.TournamentName === undefined) {
      errorList.push("Please enter first name")
    }
    if (errorList.length < 1) { //no error
      Service.BettingAPI.post("Tournament/AddTournament", newData)
        .then(res => {
          let dataToAdd = [...data];
          dataToAdd.push(newData);
          setData(dataToAdd);
          resolve()
          setErrorMessages([])
          setIserror(false)
        })
        .catch(error => {
          setErrorMessages(["Cannot add data. Server error!"])
          setIserror(true)
          resolve()
        })
    } else {
      setErrorMessages(errorList)
      setIserror(true)
      resolve()
    }


  }

  const handleRowDelete = (oldData, resolve) => {
    Service.api.delete("/users/" + oldData.id)
      .then(res => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve()
      })
      .catch(error => {
        setErrorMessages(["Delete failed! Server error"])
        setIserror(true)
        resolve()
      })
  }

  return (
    <div
      className={classes.pageHeader}
      style={{
        backgroundImage: "url(" + image + ")",
        backgroundSize: "cover",
        backgroundPosition: "top center"
      }}>
      <Grid container spacing={1}>
      <div className={classes.container}>
        <GridItem >
          <div>
            {iserror &&
              <Alert severity="error">
                {errorMessages.map((msg, i) => {
                  return <div key={i}>{msg}</div>
                })}
              </Alert>
            }
          </div>
          <MaterialTable
            title="Clients"
            columns={columns}
            data={data}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  handleRowUpdate(newData, oldData, resolve);

                }),
              onRowAdd: (newData) =>
                new Promise((resolve) => {
                  handleRowAdd(newData, resolve)
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  handleRowDelete(oldData, resolve)
                }),
            }}
          />
        </GridItem>
      </div>
      </Grid>
    </div>
  );
}

export default TournamentPage
