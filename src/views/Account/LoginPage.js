import React, { useState, useContext } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
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
import { Grid } from "@material-ui/core";
import { Service } from "../../utils/Service";
import UserContext from "../../utils/UserContext.js";
import Danger from "../../components/Typography/Danger.js";
import "../../App.css";

const useStyles = makeStyles(styles);

export default function LoginPage() {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 70);

  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorDetail, setErrorDetail] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);

  let history = useHistory();
  let location = useLocation();

  const validateForm = () => {
    let isValid = true;
    if (!email) {
      isValid = false;
    }
    if (!password) {
      isValid = false;
    }
    return isValid;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    let { from } = location.state || { from: { pathname: "/" } };
    try {
      let user = await Service.BettingAPI.post(`Login?username=${email}&password=${password}`);
      setUser(email);
      sessionStorage.setItem('DieHardToken', JSON.stringify(user.data));
      sessionStorage.setItem('DieHardUser', JSON.stringify(email));
      history.replace(from);
    } catch (error) {
      setLoading(false);
      console.log(error.response)
      if (error.response === undefined) {
        setErrorDetail("Unable to connect to the API")
      }
      else {
        setErrorDetail(error.response.data.error_description);
      }
    }
  }

  return (
    //className="App-header"
    <div >
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
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form onSubmit={handleSubmit} className={classes.form}>
                  <CardHeader color="info" className={classes.cardHeader}>
                    <h4><b>Login</b></h4>
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
                    <CustomInput labelText="Email Address" formControlProps={{ fullWidth: true }} inputProps={{
                      onChange: (event) => setEmail(event.target.value),
                      type: "email",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputIconsColor} />
                        </InputAdornment>)
                    }} />

                    <CustomInput labelText="Password" formControlProps={{ fullWidth: true }} inputProps={{
                      onChange: (event) => setPassword(event.target.value),
                      type: "password",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputIconsColor}>
                            lock_outline
                                </Icon>
                        </InputAdornment>),
                      autoComplete: "off"
                    }} />
                    <Danger >
                      {errorDetail && <p>{errorDetail}</p>}
                    </Danger>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="info" size="lg" type="submit" disabled={!validateForm() || loading}>
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
                      <Link to={"/signup"} className={classes.navLink}>
                        <Button simple color="info" size="sm" disable="true">
                          Don't have an account?
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
