import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import { Fingerprint, PersonAdd, ExitToAppSharp, ArrowDropDownCircleOutlined } from "@material-ui/icons";
import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle.js";
import UserContext from "../../utils/UserContext.js";
import { Service } from "../../utils/Service.js";
import { Button } from "@material-ui/core";
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  const { user, setUser } = useContext(UserContext);
  let history = useHistory();

  const SignOut = () => {
    Service.LogOut();
    setUser(null);
    history.push('/login');
  }

  return (
    <div>
      {user ? (
        <List className={classes.list}>
          <ListItem className={classes.listItem}>
            <CustomDropdown
              noLiPadding
              buttonText="Tournament & Events"
              buttonProps={{
                className: classes.navLink,
                color: "transparent"
              }}
              buttonIcon={ArrowDropDownCircleOutlined}
              dropdownList={[
                <Link to="/tournament" className={classes.dropdownLink}>
                  Tournament
                  </Link>,
                <Link to="/event" className={classes.dropdownLink}>
                  Events
                  </Link>
              ]}
            />
          </ListItem>


          <ListItem className={classes.listItem}>
            <CustomDropdown
              noLiPadding
              buttonText= {"Hi, " + user}
              buttonProps={{
                className: classes.navLink,
                color: "transparent"
              }}
              buttonIcon={ArrowDropDownCircleOutlined}
              dropdownList={[
                <Link to="/changePassword" className={classes.dropdownLink}>
                  Change Password
                  </Link>,
                <Link to="updateProfile" className={classes.dropdownLink}>
                  Update Profile
                </Link>
              ]}
            />
          </ListItem>
          <Tooltip
            id="Logff"
            title="SignOut"
            placement={window.innerWidth > 959 ? "top" : "left"}
            classes={{ tooltip: classes.tooltip }}>
            <ListItem className={classes.listItem}>
              <Button onClick={SignOut} className={classes.navLink}>
                <ExitToAppSharp className={classes.icons} />LogOff
              </Button>
            </ListItem>
          </Tooltip>
        </List>
      ) : (
          <List className={classes.list}>
            <Tooltip
              id="Login"
              title="Login"
              placement={window.innerWidth > 959 ? "top" : "left"}
              classes={{ tooltip: classes.tooltip }}>
              <ListItem className={classes.listItem}>
                <Link to={"/login"} className={classes.navLink}>
                  <Fingerprint className={classes.icons} />Login
                </Link>
              </ListItem>
            </Tooltip>

            <Tooltip
              id="Register user"
              title="Add new user"
              placement={window.innerWidth > 959 ? "top" : "left"}
              classes={{ tooltip: classes.tooltip }}>
              <ListItem className={classes.listItem}>
                <Link to={"/signup"} className={classes.navLink}>
                  <PersonAdd className={classes.icons} />SignUp
          </Link>
              </ListItem>
            </Tooltip>
          </List>
        )}
    </div>


  );
}
