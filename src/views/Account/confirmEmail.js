import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
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

export default function ConfirmEmailAddress(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 70);
  const classes = useStyles();
  const [errorDetail, setErrorDetail] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
 



  useEffect(() =>{
    let search = window.location.search;
    let params = new URLSearchParams(search);
    setUsername(params.get('username'));
    setCode(params.get('code'));

  }, [])



  const validateForm = () => {
    let isValid = true;
    return isValid;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    

    try {
      let user = await Service.DieHardApi.post(`ConfirmEmail?username=${username}&code=${code}`);
      console.log(user);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorDetail(error.response.data );
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
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form onSubmit = {handleSubmit} className={classes.form}>
                  <CardHeader color="info" className={classes.cardHeader}>
                    <h4><b>Confirm Email Address</b></h4>
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
                  <CustomInput labelText="Username" formControlProps={{ fullWidth: true }} inputProps={{ 
                    onChange: (event) => setUsername(event.target.value),
                    type: "text",
                    endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputIconsColor}>
                              lock_outline
                          </Icon>
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
