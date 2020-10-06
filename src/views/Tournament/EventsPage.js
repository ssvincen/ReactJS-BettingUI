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

const EventsPage = () => {
    const classes = useStyles();
  var columns = [
    { title: "EventID", field: "EventID", hidden: true },
    { title: "Tournament Id", field: "TournamentID", hidden: true },
    { title: "Name", field: "EventName" },
    { title: "Number", field: "EventNumber" },
    { title: "DateTime", field: "EventDateTime" },
    { title: "EndDateTime", field: "Event EndDateTime" },
    { title: "Tournament Name", field: "TournamentName" }
  ];

  const [data, setData] = useState([]);
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    Service.BettingAPI.get("Event/GetEvent", { headers: Service.AutHeader() })
      .then(res => {
        setData(res.data)
      })
      .catch(error => {
        console.log("Error", error)
      })
  }, [])

  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = []
    if (newData.TournamentName === "" && newData.TournamentID === "") {
      errorList.push("Please enter Tournament Name")
    }

    if (errorList.length < 1) {
      let postData = {
        TournamentID: newData.TournamentID,
        TournamentName: newData.TournamentName
      };

      Service.BettingAPI.patch("Event/UpdateEvent", postData, { headers: Service.AutHeader() })
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
    console.log(newData.TournamentName)
    if (newData.TournamentName === undefined) {
      errorList.push("Please enter first name")
    }
    var postData = {
      TournamentID: 0,
      TournamentName: newData.TournamentName
    };
    if (errorList.length < 1) { //no error      
      Service.BettingAPI.post("Event/AddEvent", postData, { headers: Service.AutHeader() })
        .then(res => {
          console.log(res.data);
        }).catch(res => {
          console.log(res.data);
        })
    } else {
      setErrorMessages(errorList)
      setIserror(true)
      resolve()
    }

  }

  const handleRowDelete = (oldData, resolve) => {
    console.log(oldData.TournamentID)
    let postData = {
      tournamentId: oldData.TournamentID
    };

    Service.BettingAPI.delete("Event/DeleteEvent", postData, { headers: Service.AutHeader() })
      .then(res => {
        console.log(res.data);
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve()
      })
      .catch(error => {
        console.log(error.data);
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
              title="Events"
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
    )
}

export default EventsPage
