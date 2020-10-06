import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Email, People, PhoneIphone } from "@material-ui/icons";
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
const UserInfo = () => {
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function () {
        setCardAnimation("");
    }, 70);

    const classes = useStyles();
    const [firstName, setFirstName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [errorDetail, setErrorDetail] = useState("");
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        let isValid = true;
        if (!email) {
            isValid = false;
        }
        return isValid;
    }

    useEffect(() => {
        try {
            Service.DieHardApi.get('Profile', { headers: Service.AutHeader() })
                .then(response => {
                    let data = response.data;
                    setFirstName(data.firstName)
                    setSurname(data.lastName)
                    setPhone(data.phoneNumber)
                    setEmail(data.userName)
                    console.log(data)
                }).catch(response => {
                    setErrorDetail(`Error: ${response.data}`)
                })

        } catch (error) {
            setErrorDetail(error.response.data.error_description);
        }
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        await Service.DieHardApi.post(`Profile`, { headers: Service.AutHeader() })
            .then(res => {
                let data = res.data;
                if(data !== null){
                    
                }
                setLoading(false);
            }).catch(res => {
                setLoading(false);
                setErrorDetail(res.response.data);
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
                        <GridItem xs={12} sm={12} md={8}>
                            <Card className={classes[cardAnimaton]}>
                                <form onSubmit={handleSubmit} className={classes.form}>
                                    <CardHeader color="info" className={classes.cardHeader}>
                                        <h4><b>Update Profile</b></h4>
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
                                            <GridItem xs={12} sm={6} md={6} lg={6}>
                                                <CustomInput labelText="First Name" formControlProps={{ fullWidth: true }} inputProps={{
                                                    onChange: (event) => setFirstName(event.target.value),
                                                    type: "text",
                                                    value: firstName,
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <People className={classes.inputIconsColor} />
                                                        </InputAdornment>)
                                                }} />
                                            </GridItem>
                                            <GridItem xs={12} sm={6} md={6} lg={6}>
                                                <CustomInput labelText="Surname" formControlProps={{ fullWidth: true }} inputProps={{
                                                    onChange: (event) => setSurname(event.target.value),
                                                    type: "text",
                                                    value: surname,
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <People className={classes.inputIconsColor} />
                                                        </InputAdornment>),
                                                    autoComplete: "off"
                                                }} />
                                            </GridItem>

                                            <GridItem xs={12} sm={12} md={12} lg={6}>
                                                <CustomInput labelText="Email Address" formControlProps={{ fullWidth: true }} inputProps={{
                                                    onChange: (event) => setEmail(event.target.value),
                                                    type: "email",
                                                    value: email,
                                                    readOnly: true,
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <Email className={classes.inputIconsColor} />
                                                        </InputAdornment>)
                                                }} />
                                            </GridItem>

                                            <GridItem xs={12} sm={6} md={6} lg={6}>
                                                <CustomInput labelText="Mobile Number" formControlProps={{ fullWidth: true }} inputProps={{
                                                    onChange: (event) => setPhone(event.target.value),
                                                    value: phone,
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <PhoneIphone className={classes.inputIconsColor} />
                                                        </InputAdornment>)
                                                }} />
                                            </GridItem>

                                        </GridContainer>
                                        <Danger >
                                            {errorDetail && <p>{errorDetail}</p>}
                                        </Danger>
                                    </CardBody>

                                    <CardFooter className={classes.cardFooter}>
                                        <Button simple color="info" size="lg" type="submit" disabled={!validateForm() || loading}>
                                            Update Profile
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
    )
}
export default UserInfo;
