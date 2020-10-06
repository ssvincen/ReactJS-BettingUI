import React, { useState } from "react";
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
import Danger from "../../components/Typography/Danger.js";
import { Service } from "../../utils/Service";


const useStyles = makeStyles(styles);

const ChangePassword = () => {
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function () {
        setCardAnimation("");
    }, 70);

    const classes = useStyles();
    const [errorDetail, setErrorDetail] = useState("");
    const [loading, setLoading] = useState(false);


    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");

    var postData = {
        currentPasswor: currentPassword,
        password: password,
        confirmPassword: confirmpassword
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        await Service.DieHardApi.patch("ChangePassword", postData, { headers: Service.AutHeader() })
            .then(res => {
                setLoading(false);
                console.log(res.data);
            }).catch(res => {
                setLoading(false);
                setErrorDetail(res.data);
            })
        };

    const validateForm = () => {
        let isValid = true;
        if (password === "") {
            isValid = false;
        }
        if (password !== confirmpassword) {
            isValid = false;
        }
        return isValid;
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
                                <form onSubmit={handleSubmit} className={classes.form}>
                                    <CardHeader color="info" className={classes.cardHeader}>
                                        <h4><b>Change Password</b></h4>
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
                                        <CustomInput labelText="Current Password" formControlProps={{ fullWidth: true }} inputProps={{
                                            onChange: (event) => setCurrentPassword(event.target.value),
                                            type: "password",
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <Icon className={classes.inputIconsColor}>
                                                        lock_outline
                                                    </Icon>
                                                </InputAdornment>),
                                            autoComplete: "off"
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

                                        <CustomInput labelText="Confirm Password" formControlProps={{ fullWidth: true }} inputProps={{
                                            onChange: (event) => setConfirmPassword(event.target.value),
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
                                            Change Password
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
export default ChangePassword;