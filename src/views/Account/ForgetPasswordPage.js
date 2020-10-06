import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Email } from "@material-ui/icons";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardFooter from "../../components/Card/CardFooter.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import styles from "../../assets/jss/material-kit-react/views/loginPage.js";
import image from "../../assets/img/profile-bg.jpg";
import { Service } from "../../utils/Service";
import Danger from "../../components/Typography/Danger.js";


const useStyles = makeStyles(styles);

export default function ForgetPasswordPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 70);
  const classes = useStyles();
  const [errorDetail, setErrorDetail] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    return email.length > 0 ;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    Service.DieHardApi.post(`ForgotPassword?emailAddress=${email}`)
    .then(response => {
      setLoading(false);
      //response.data;
  })
  .catch(error => {
    setLoading(false);
    console.log(error.response);
    setErrorDetail(error.response);        
  })
  }

  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}>
          
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form onSubmit = {handleSubmit} className={classes.form}>
                  <CardHeader color="info" className={classes.cardHeader}>
                    <h4><b>Recover Password</b></h4>
                    <div className={classes.socialLine}>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-twitter"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-facebook"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-google-plus-g"} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardBody>
                  <CustomInput labelText="Email Address" formControlProps={{ fullWidth: true }} inputProps={{ 
                    onChange: (event) => setEmail(event.target.value),
                    type: "email",
                    endAdornment: (
                        <InputAdornment position="end">
                        <Email className={classes.inputIconsColor} />
                        </InputAdornment>)
                    }} />
                    <Danger >
                      {errorDetail && <p>{errorDetail}</p> }
                    </Danger>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="info" size="lg" type="submit" disabled={!validateForm()}>
                      Get started
                    </Button>
                    {loading && <img src={require('../../assets/img/app/loading.gif')} alt="Loading" />}
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>

      </div>
    </div>
  );
}
