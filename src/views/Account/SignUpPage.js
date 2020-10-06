import React, { useState, } from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import { Email, People, PhoneIphone, Face } from "@material-ui/icons";
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
import { Service } from '../../utils/Service.js';
import Danger from "../../components/Typography/Danger.js";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(styles);

const SignUpPage = () => {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 70);
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [errorDetail, setErrorDetail] = useState("");


  const [firstname, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  // const validateForm = () => {
  //   return true;
  // }



  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    let postData = {
      FirstName: firstname,
      Surname: surname,
      EmailAddress: email,
      PhoneNumber: mobileNumber,
      Password: password,
      ConfirmPassword: confirmPassword
    }

    try {
      let signup = await Service.BettingAPI.post("/Account/Register", postData);
      setLoading(false);
      console.log(signup.data);
    } catch (error) {
      console.log(error)
      setLoading(false);
      setErrorDetail(error.response);
    }
  }

  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <Card className={classes[cardAnimaton]}>
                <form onSubmit={handleSubmit} className={classes.form}>
                  <CardHeader color="info" className={classes.cardHeader}>
                    <h4><b>Sign Up</b></h4>
                    <div className={classes.socialLine}>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}>
                        <i className={"fab fa-twitter"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="/signup"
                        color="transparent"
                        onClick={e => e.preventDefault()} >
                        <i className={"fab fa-facebook"} />
                      </Button>
                      <Button
                        justIcon
                        href={"/signup"}
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}>
                        <i className={"fab fa-google-plus-g"} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6} lg={6}>
                        <CustomInput labelText="First Name" formControlProps={{ fullWidth: true }} inputProps={{
                          onChange: (event) => setFirstName(event.target.value),
                          type: "text",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Face className={classes.inputIconsColor} />
                            </InputAdornment>)
                        }} />
                      </GridItem>

                      <GridItem xs={12} sm={12} md={6} lg={6}>
                        <CustomInput labelText="Surname" formControlProps={{ fullWidth: true }} inputProps={{
                          onChange: (event) => setSurname(event.target.value),
                          type: "text",
                          endAdornment: (
                            <InputAdornment position="end">
                              <People className={classes.inputIconsColor} />
                            </InputAdornment>)
                        }} />
                      </GridItem>

                      <GridItem xs={12} sm={12} md={6} lg={6}>
                        <CustomInput labelText="Mobile Number" formControlProps={{ fullWidth: true }} inputProps={{
                          onChange: (event) => setMobileNumber(event.target.value),
                          type: "text",
                          endAdornment: (
                            <InputAdornment position="end">
                              <PhoneIphone className={classes.inputIconsColor} />
                            </InputAdornment>)
                        }} />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6} lg={6}>
                        <CustomInput labelText="Email Address" formControlProps={{ fullWidth: true }} inputProps={{
                          onChange: (event) => setEmail(event.target.value),
                          type: "email",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>)
                        }} />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6} lg={6}>
                        <CustomInput labelText="Password" formControlProps={{ fullWidth: true }} inputProps={{
                          onChange: (event) => setPassword(event.target.value),
                          type: "password",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputIconsColor}>
                                lock_outline
                              </Icon>
                            </InputAdornment>)
                        }} />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6} lg={6}>
                        <CustomInput labelText="Confirm Password" formControlProps={{ fullWidth: true }} inputProps={{
                          onChange: (event) => setConfirmPassword(event.target.value),
                          type: "password",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputIconsColor}>
                                lock_outline
                              </Icon>
                            </InputAdornment>)
                        }} />
                      </GridItem>
                      <Danger>
                        {errorDetail && <p>{errorDetail}</p>}
                      </Danger>
                    </GridContainer>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="info" size="lg" type="submit" disabled={loading}>
                      Get started
                        </Button>
                    {loading && <img src={require('../../assets/img/app/loading.gif')} alt="Loading" />}
                  </CardFooter>

                  <Grid container>
                    <Grid item xs>
                      <Link to={"/forgotPassword"} className={classes.navLink}>
                        <Button simple color="info" size="sm">
                          Forgot password?
                              </Button>
                      </Link>
                    </Grid>
                    <Grid item >
                      <Link to={"/login"} className={classes.navLink}>
                        <Button simple color="info" size="sm" disable="true">
                          Already have an account?
                                </Button>
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>

      </div>
    </div>
  );
}


export default SignUpPage
