import React, { useState, useEffect } from "react";
import {
    Card,
    Grid,
    Button,
    CircularProgress, TextField
} from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import logo from "../../invoice/logowhite(1).png";
import Swal from "sweetalert2";

import { makeStyles } from "@material-ui/core/styles";
import url from "../../../views/invoice/InvoiceService"
import history from "history.js";
import clsx from "clsx";
import useAuth from 'app/hooks/useAuth';
import { getpaidDivision, version } from "app/views/invoice/InvoiceService";
import { useParams, useHistory } from "react-router-dom";



const useStyles = makeStyles(({ palette, ...theme }) => ({
    cardHolder: {
        background: "#1A2038",
    },
    card: {
        maxWidth: 800,
        borderRadius: 12,
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
}));

const JwtLogin = () => {
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({ email: "", password: '' });
    const [message, setmessage] = useState('');
    const [division, setdivision] = useState([]);
    const { login } = useAuth();
    const { email } = useParams();
    const history = useHistory();




    const [opassword, setopassword] = useState('')
    const [npassword, setnpassword] = useState('')
    const [cpassword, setcpassword] = useState('')

    const classes = useStyles();

    const handleChange = ({ target: { name, value } }) => {
        let temp = { ...userInfo };
        temp[name] = value;
        setUserInfo(temp);
    };
    const routerHistory = useHistory();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            routerHistory.push("/session/signin")
        }
        // {0:"a", 1:"b", 2:"c"}inputOptionsPromise)
    }, [])

    const handleFormSubmit = (event) => {
        const formdata = {
            email: email,
            password: opassword,
            newpassword: npassword
        }


        if (npassword == cpassword) {

            url.post("change-password", formdata).then(({ data }) => {
                if (data.msg == true) {
                    Swal.fire({
                        title: 'Success',
                        type: 'success',
                        icon: 'success',
                        text: 'Password changed successfully.',
                    });
                    resetform()
                    localStorage.clear();
                    routerHistory.push("/session/signin")

                } else {
                    setmessage('Old password is Incorrect')
                }
            })

        } else {
            setmessage('New password doesn\'t match')

        }

    };
    const resetform = () => {
        setnpassword('')
        setcpassword('')
        setopassword('')
        setmessage('')

    }
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
                        <div className={clsx({
                            "py-8 px-14 h-full": true,
                            [classes.cardLeft]: true,
                        })}>
                            {/* <img
                className="w-200"
                src={logo}
                alt=""
              /> */}
                            <img src={logo} style={{ marginTop: "60px", }}></img>
                            <h6 className="pl-20">{version}</h6>
                        </div>

                    </Grid>

                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        <h4 style={{ marginTop: "20px", textAlign: "center" }}>Amaco - ERP</h4>
                        <div className="p-8 h-full bg-light-gray relative">
                            <ValidatorForm onSubmit={handleFormSubmit}>


                                <TextValidator
                                    className="w-full mb-4"
                                    label="New Password"
                                    variant="outlined"
                                    onChange={e => setnpassword(e.target.value)
                                        // .log(isAlive)
                                    }
                                    type="textarea"
                                    name="cname"
                                    size="small"
                                    validators={["required"]}
                                    errorMessages={[
                                        "this field is required",
                                    ]}
                                    value={npassword}
                                />

                                <TextValidator
                                    className="w-full mb-4"
                                    label="Confirm Password"
                                    autoComplete="none"
                                    onChange={e => setcpassword(e.target.value)}
                                    name="mobno"
                                    type="text"
                                    validators={["required"]}
                                    errorMessages={[
                                        "this field is required",
                                    ]}
                                    size="small"
                                    variant="outlined"
                                    value={cpassword}
                                    fullWidth
                                />



                                {message && <p className="text-error">{message}</p>}

                                <div className="flex flex-wrap items-center mb-4">
                                    <div className="relative">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled={loading}
                                            type="submit"
                                        >
                                            CHANGE PASSWORD
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

                            </ValidatorForm>
                        </div>
                    </Grid>
                </Grid>
            </Card>
        </div>
    );
};

export default JwtLogin;
