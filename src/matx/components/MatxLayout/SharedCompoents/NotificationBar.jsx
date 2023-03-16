import React, { Fragment, useEffect, useState } from "react";
import Pusher from "pusher-js";
import Snackbar from '@mui/material/Snackbar';

import {
  Icon,
  Badge,
  Card,
  Button,
  IconButton,
  Drawer,
} from "@material-ui/core";
import url, {
  navigatePath,
} from "../../../../app/views/invoice/InvoiceService";

import { Link } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { getTimeDifference } from "utils.js";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import useSettings from "app/hooks/useSettings";
import useNotification from "app/hooks/useNotification";
import shortId from "shortid";
import useSound from 'use-sound';
import nSound from './Notification.mp3'
const useStyles = makeStyles(({ palette, ...theme }) => ({
  notification: {
    width: "var(--sidenav-width)",
    "& .notification__topbar": {
      height: "var(--topbar-height)",
    },
  },
  notificationCard: {
    "&:hover": {
      "& .delete-button": {
        cursor: "pointer",
        display: "unset",
        right: 0,
        marginTop: 6,
        top: 0,
        zIndex: 2,
      },
      "& .card__topbar__time": {
        display: "none",
      },
    },
    "& .delete-button": {
      display: "none",
      position: "absolute",
      right: 0,
      marginTop: 9,
    },
    "& .card__topbar__button": {
      borderRadius: 15,
      opacity: 0.9,
    },
  },
}));

const NotificationBar = ({ container }) => {
  const [panelOpen, setPanelOpen] = React.useState(false);

  const [isAlive, setIsAlive] = useState(true);

  const classes = useStyles();
  const { settings } = useSettings();
  const { deleteNotification, clearNotifications, notifications } =
    useNotification();

  const handleDrawerToggle = () => {
    if (!panelOpen) {
      setIsAlive(true);
    }

    setPanelOpen(!panelOpen);
    if (count > 0) {
      url.post("resetNotification").then(({ data }) => {
        setCount(0);
      });
    }
  };

  const [notificationss, setNotificationss] = useState([]);
  const [count, setCount] = useState(0);

  // setInterval(() => {
  //   if(count > 0){
  //     callFunction();
  //   }

  // }, 5000);
  

  const [pu, setPusher] = useState(false);
  // const [play] = useSound(
  //   nSound,
  //   { volume: 0.5 }
  // );
  const [play] = useSound(nSound);


  const [message,setMessage] = useState('')

  const playSound = async ()  => {
    play()
  }

  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  useEffect(() => {


    if (localStorage.getItem("role") == "SA") {
   

      var pusher = new Pusher("76b5d8513b2ab0b9930c", {
        cluster: "ap2",
      });
      Pusher.logToConsole = true;

      var channel = pusher.subscribe('notification');
        channel.bind('notification-event', function(data) {

          if(data){
            play()
            setMessage(data)
            setState({ ...state, open: true });

          
            setIsAlive(true);
          }
        }, channel.unbind());
    }

    return () => console.log("Pusher");
  }, []);

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
       <Icon>close</Icon>
      </IconButton>
    </React.Fragment>
  );

  const clearNotification = () => {
    if (localStorage.getItem("role") == "SA") {
      url.delete("clearNotification/sa").then(({ data }) => {
        setNotificationss([]);
      });
    } else {
      url
        .delete("clearNotification/" + localStorage.getItem("user_id"))
        .then(({ data }) => {
          setNotificationss([]);
        });
    }
  };

  const getTimeDifferenceNew = (date) => {
    var date1 = new Date(date);
var date2 = new Date();

var diff = date2.getTime() - date1.getTime();

if (date1 < date2) {
  var milisec_diff = date2 - date1;
}else{
  var milisec_diff = date1 - date2;
}

var days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));

var msec = diff;
var hh = Math.floor(msec / 1000 / 60 / 60);
msec -= hh * 1000 * 60 * 60;
var mm = Math.floor(msec / 1000 / 60);
msec -= mm * 1000 * 60;
var ss = Math.floor(msec / 1000);
msec -= ss * 1000;

if(days > 0){
  return days + ' days ago' 
}else if(hh > 0){
  return hh+ ' hour ago'
}else if(mm > 0){
  return  mm+ ' minute ago'
}else{
  return ss + ' seconds ago'
}

// return (hh + ":" + mm + ":" + ss);
  }

  useEffect(() => {
   
    url.get("getNotifications").then(({ data }) => {
      setCount(parseInt(data?.count));
      if (localStorage.getItem("role") == "SA") {
        setNotificationss(data?.noti);
      } else {
        let n = data?.noti?.map((item) => {
          return item.user_id;
        });
        if (n[0]?.includes(localStorage.getItem("user_id"))) {
          setNotificationss(
            data?.noti?.filter((obj) => {
              obj.n_for !== "SA" &&
                obj.user_id.includes(localStorage.getItem("user_id"));
            })
          );
        }
      }
    });
    setIsAlive(false);

    return () => console.log("one time");

  }, [isAlive]);

  return (
    <Fragment>
      <IconButton onClick={handleDrawerToggle}>
        <Badge color="secondary" badgeContent={count}>
          <Icon>notifications</Icon>
        </Badge>
      </IconButton>

      <ThemeProvider theme={settings.themes[settings.activeTheme]}>
        <Drawer
          width={"100px"}
          container={container}
          variant="temporary"
          anchor={"right"}
          open={panelOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <div className={classes.notification}>
            <div className="notification__topbar elevation-z6 flex items-center p-4 mb-4">
              <Icon color="primary">notifications</Icon>
              <h5 className="ml-2 my-0 font-medium">Notifications</h5>
            </div>

            {notificationss?.map((notification) => (
              <div
                key={notification.id}
                className={clsx("relative", classes.notificationCard)}
              >
                {/* <IconButton
                  size="small"
                  className="delete-button bg-light-gray mr-6"
                  onClick={() => deleteNotification(notification.id)}
                >
                  <Icon className="text-muted" fontSize="small">
                    clear
                  </Icon>
                </IconButton> */}
                <Link to={`${notification.path}`} onClick={handleDrawerToggle}>
                  <Card className="mx-4 mb-6" elevation={3}>
                    <div className="card__topbar flex items-center justify-between p-2 bg-light-gray">
                      <div className="flex items-center">
                        <div className="card__topbar__button flex items-center justify-between h-24 w-24 overflow-hidden">
                          <Icon
                            className="card__topbar__icon"
                            fontSize="small"
                            color={"error"}
                          >
                            {"notifications_active"}
                          </Icon>
                        </div>
                        <span className="ml-4 font-medium text-muted">
                          {notification.heading}
                        </span>
                      </div>
                      <small className="card__topbar__time text-muted">
                        {getTimeDifferenceNew(notification.created_at)}
                      
                      </small>
                    </div>
                    <div className="px-4 pt-2 pb-4">
                      <p className="m-0">{notification.title}</p>
                      <small className="text-muted">
                        {notification.notification}
                      </small>
                    </div>
                  </Card>
                </Link>
              </div>
            ))}
            {!!notificationss?.length && (
              <div className="text-center">
                <Button
                  onClick={() => {
                    clearNotification();
                  }}
                >
                  Clear Notifications
                </Button>
              </div>
            )}
          </div>
        </Drawer>
      </ThemeProvider>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={message}
        key={vertical + horizontal}
        action={action}
      />
    </Fragment>
  );
};

export default NotificationBar;
