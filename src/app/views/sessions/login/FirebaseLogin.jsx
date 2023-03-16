import React, { useState, useEffect } from "react";
import {
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { MatxLogo, MatxDivider } from "matx";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from 'react-router';

import clsx from "clsx";
import useAuth from "app/hooks/useAuth";
import Swal from "sweetalert2";
import Axios from "axios";
import logo from "../../invoice/logowhite(1).png"
import url from "../../invoice/InvoiceService";
import axios from "axios";
const data = [
  { "email": "admin@amacoerp.com", "password": "admin123", "token": "ad123" },
  { "email": "danish@amacoerp.com", "password": "danish123", "token": "da123" },
  { "email": "asif@amacoerp.com", "password": "asif123", "token": "as123" },
  { "email": "shazli@amacoerp.com", "password": "shazli123", "token": "sh123" },
  { "email": "jamsheed@amacoerp.com", "password": "jamsheed123", "token": "ja123" },
  { "email": "anshif@amacoerp.com", "password": "anshif123", "token": "an123" },
];

const useStyles = makeStyles(({ palette, ...theme }) => ({
  cardHolder: {
    background: "#1A2038",
  },
  card: {
    maxWidth: 800,
    margin: "1rem",
  },
  cardLeft: {
    background: "#161c37 url(/assets/images/bg-3.png) no-repeat",
    backgroundSize: 'cover',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      minWidth: 200
    },
  },
  logo: {
    display: 'flex',
    alignItems: 'center',

    "& span": {
      fontSize: 26,
      lineHeight: 1.3,
      fontWeight: 800
    }
  },
  mainTitle: {
    fontSize: 18,
    lineHeight: 1.3,
    marginBottom: 24
  },
  features: {
    "& .item": {
      position: 'relative',
      marginBottom: 12,
      paddingLeft: 20,
      "&::after": {
        position: 'absolute',
        content: '""',
        width: 4,
        height: 4,
        borderRadius: 4,
        left: 4,
        top: 7,
        backgroundColor: palette.error.main
      }
    }
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  socialButton: {
    width: "100%",
    "& img": {
      margin: "0 8px",
    },
  },
}));

const FirebaseLogin = () => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [login, setlogin] = useState("");
  const { signInWithEmailAndPassword, signInWithGoogle } = useAuth();
  const routerHistory = useHistory();

  const classes = useStyles();
  useEffect(() => {
    if (localStorage.getItem('rememberMe')) {

      routerHistory.push(`/dashboard/default`);

    }

  }, [])

  const handleChange = ({ target: { name, value } }) => {
    let temp = { ...userInfo };
    temp[name] = value;
    setUserInfo(temp);
  };

  const handleFormSubmit = async (event) => {

    setLoading(true);
    // url.post('auth/login', userInfo)
    //   .then(function (response) {
    let response = data.find(check => check.email === userInfo.email && check.password === userInfo.password);

    if (response) {
      setLoading(false)

      // localStorage.setItem('rememberMe',response.data.accessToken);
      // localStorage.setItem('user', response.data.user.fname );
      localStorage.setItem('rememberMe', response.token)
      localStorage.setItem('user', response.email)
      // routerHistory.push("/dashboard/default");
      window.location.href = `../dashboard/default`

    }
    else {

      setMessage("Email or password Incorrect. ")
      setLoading(false)

    }

    // })
    // .catch(function (error) {

    // })
    // try {
    //   await signInWithEmailAndPassword(userInfo.email, userInfo.password);

    // } catch (e) {
    //   setMessage(e.message);
    //   setLoading(false);
    // }
  };
  const handleGoogleLogin = async (event) => {
    try {
      await signInWithGoogle();
      routerHistory.push("/");
    } catch (e) {
      setMessage(e.message);
      setLoading(false);


    }
  };
  return (
    <div
      className={clsx(
        "flex justify-center items-center  min-h-full-screen",
        classes.cardHolder
      )}
    >
      <Card className={classes.card}>
        <Grid container>
          <Grid item lg={6} md={6} sm={5} xs={12}>
            <div
              className={clsx({
                "py-8 px-14 h-full": true,
                [classes.cardLeft]: true,
              })}
            >
              {/* <div className={classes.logo}> */}
              <img src={logo} style={{ marginTop: "60px" }}></img>
              {/* <MatxLogo className="mr-2"/> <span>Amaco</span>  */}
              {/* </div> */}
              {/* <h1 className={classes.mainTitle}>
                Admin Dashboard
              </h1> */}
              {/* <div className={classes.features}>
                <div className="item">JWT, FireBase & Auth0 Authentication</div>
                <div className="item">Clean & Organised code</div>
                <div className="item">Limitless Pages & Components</div>
              </div> */}
              {/* <span className="flex-grow"></span>
              <div className="flex items-center">
                {/* <span className="">Design & Developed By</span> */}
              {/* <a href="https://ui-lib.com/" target="_blank" rel="noopener noreferrer"><img className="h-32 w-32" src="/assets/images/logos/ui-lib.png" alt="UI Lib Logo"/></a>
              </div> */}
            </div>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12} >
            {/* <div className="px-8 pt-8">
              <Button
                variant="contained"
                className={classes.socialButton}
              >
              
              </Button>
            </div> */}
            {/*  */}
            <h4 style={{ marginTop: "20px", textAlign: "center" }}>Amaco - ERP</h4>
            <MatxDivider className="mt-6 px-8" text="User Login" />

            <div className="p-8 h-full relative">
              <ValidatorForm onSubmit={handleFormSubmit}>
                <TextValidator
                  className="mb-6 w-full"
                  variant="outlined"
                  size="small"
                  label="Email"
                  onChange={handleChange}
                  type="email"
                  name="email"
                  value={userInfo.email}
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    "this field is required",
                    "email is not valid",
                  ]}
                />
                <TextValidator
                  className="mb-3 w-full"
                  label="Password"
                  variant="outlined"
                  size="small"
                  onChange={handleChange}
                  name="password"
                  type="password"
                  value={userInfo.password}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                {/* <FormControlLabel
                  className="mb-3 min-w-288"
                  name="remember"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      size="small"
                      onChange={({ target: { checked } }) =>
                        handleChange({
                          target: { name: "remember", value: checked },
                        })
                      }
                      checked={userInfo.remember}
                    />
                  }
                  label="Remeber me"
                /> */}

                {message && <p className="text-error">{message}</p>}

                <div className="flex flex-wrap items-center mb-4">
                  <div className="relative">
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={loading}
                      type="submit"
                    >
                      Sign in
                    </Button>
                    {loading && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
                  </div>
                  {/* <span className="mr-2 ml-5">or</span> */}
                  {/* <Button
                    className="capitalize"
                    onClick={() => routerHistory.push("/session/signup")}
                  >
                    Sign up
                  </Button> */}
                </div>
                {/* <Button
                  className="text-primary"
                  onClick={() => routerHistory.push("/session/forgot-password")}
                >
                  Forgot password?
                </Button> */}
              </ValidatorForm>
            </div>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default FirebaseLogin;
