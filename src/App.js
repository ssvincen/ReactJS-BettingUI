import React, { useState, useMemo } from 'react';
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header.js";
import HeaderLinks from "./components/Header/HeaderLinks.js";
import Footer from "./components/Footer/Footer.js";
import LandingPage from './views/LandingPage/LandingPage.js';
import { UserProvider } from './utils/UserContext.js';
import PrivateRoute from './utils/PrivateRoute.js';
import PublicRoute from './utils/PublicRoute.js';
import LoginPage from './views/Account/LoginPage.js';
import SignUpPage from './views/Account/SignUpPage.js';
import ResetPassword from './views/Account/ResetPassword.js';
import ForgetPasswordPage from './views/Account/ForgetPasswordPage.js';
import { Service } from "./utils/Service";
import ChangePassword from './views/Account/ChangePassword.js';
import UserInfo from './views/Account/UserInfo.js';
import ConfirmEmailAddress from './views/Account/confirmEmail.js';
import TournamentPage from './views/Tournament/TournamentPage.js';

const dashboardRoutes = [];

function App() {
  const [ user, setUser ] = useState(Service.GetLoginUser())
  const [ session, setSession] = useState(sessionStorage.getItem('DieHardUser'))
  const providerUser = useMemo(() => ({ user, setUser, session, setSession }), [user , setUser, session, setSession]);

  return (
    <BrowserRouter>    
      <UserProvider value={providerUser}>
        <Header
          color="transparent"
          routes={dashboardRoutes}
          brand="Betting App"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 100,
            color: "white"
          }}/>
          <PublicRoute restricted={true} path="/login" component={LoginPage} />
          <PublicRoute restricted={true} path="/signup" component={SignUpPage} />
          <PublicRoute restricted={false} path="/" component={LandingPage} exact />
          <PublicRoute restricted={true}  path="/forgotPassword" component={ForgetPasswordPage} />
          <PublicRoute restricted={true} path="/resetPassword" component={ResetPassword} />
          <PrivateRoute restricted={true} path="/changePassword" component={ChangePassword}/>
          <PrivateRoute restricted={true} path="/updateProfile" component={UserInfo}/>
          <PublicRoute restricted={false} path="/confirmEmail" component={ConfirmEmailAddress} />
          <PrivateRoute restricted={true} path="/tournament" component={TournamentPage}/>
          
        <Footer />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
