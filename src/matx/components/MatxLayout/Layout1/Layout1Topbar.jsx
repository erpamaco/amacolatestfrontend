import React, { useState, useEffect } from "react";
import {
  Icon,
  IconButton,
  MenuItem,
  Avatar,
  useMediaQuery,
  Hidden,Tooltip,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router";
import { MatxMenu, MatxSearchBox, ConfirmationDialog } from "matx";
import NotificationBar from "../SharedCompoents/NotificationBar";
import { Link } from "react-router-dom";
import ShoppingCart from "../SharedCompoents/ShoppingCart";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import useAuth from "app/hooks/useAuth";
// import "./hover.css";
import useSettings from "app/hooks/useSettings";
import { NotificationProvider } from "app/contexts/NotificationContext";
import history from "history.js";
import FormDialog from "../../../../app/views/sessions/login/changepassword";
import MemberEditorDialog from "../../../../app/views/sessions/login/changepassword";
import url, { navigatePath } from "app/views/invoice/InvoiceService";
import Analytics from "app/views/dashboard/Analytics";

const useStyles = makeStyles(({ palette, ...theme }) => ({
  topbar: {
    top: 0,
    zIndex: 96,
    transition: "all 0.3s ease",
    background:
      "linear-gradient(180deg, rgba(255, 255, 255, 0.95) 44%, rgba(247, 247, 247, 0.4) 50%, rgba(255, 255, 255, 0))",

    "& .topbar-hold": {
      backgroundColor: palette.primary.main,
      height: 80,
      paddingLeft: 18,
      paddingRight: 20,
      [theme.breakpoints.down("sm")]: {
        paddingLeft: 16,
        paddingRight: 16,
      },
      [theme.breakpoints.down("xs")]: {
        paddingLeft: 14,
        paddingRight: 16,
      },
    },
    "& .fixed": {
      boxShadow: theme.shadows[8],
      height: 64,
    },
  },
  userMenu: {
    display: "flex",
    marginLeft:"20px",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: 24,
    padding: 4,
    "& span": {
      margin: "0 8px",
      // color: palette.text.secondary
    },
  },


  newcontained: {
    backgroundColor: "#4CAF50", /* Green */
    border: "none",
    color: "white",
    padding: "15px 32px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    margin: "4px 2px",
    cursor: "pointer",
    // -webkit-transition-duration: 0.4s, /* Safari */
    transitionDuration: "0.4s",
  },


  menuItem: {
    display: "flex",
    alignItems: "center",
    minWidth: 185,
  },
}));

const Layout1Topbar = () => {
  const myStyle1 = {
    width: "104",
    height: "64",
    position: "relative",
    left: "-17",
    // border:"1px solid #2b334d",
    // backgroundColor:"#c7c7c78a",
    borderRight:"1px solid #2b334d",
    borderLeft:"1px solid #2b334d",
    borderRadius:"0",
    // marginLeft:"8px"
  };
  const myStyle2 = {
    width: "104",
    height: "64",
    position: "relative",
    left: "-17",
    color:"#f8f9fa",
    backgroundColor:"#2b334d",
    borderRadius:"0",
    // marginLeft:"8px"
  };
  const theme = useTheme();
  const classes = useStyles();
  const { settings, updateSettings } = useSettings();
  const { user } = useAuth();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const fixed = settings?.layout1Settings?.topbar?.fixed;
  const userInfo = localStorage.getItem("user");
  const [dv, setDv] = useState("");
  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);
  const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] =
    useState(false);
  const handleDialogClose = () => {
    setShouldOpenEditorDialog(false);
  };
  const [divi, setDivi] = useState([]);

  const DIV = [
    {
      id: 1,
      name: "TRADING",
    },
    {
      id: 3,
      name: "PRINTING",
    },
  ];

  const handleDeleteUser = (user) => {
    setShouldOpenConfirmationDialog(true);
  };

  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({
      layout1Settings: {
        leftSidebar: {
          ...sidebarSettings,
        },
      },
    });
  };

  const [cIcon,setCIcon] = useState(false)

  const handleSidebarToggle = () => {
    let { layout1Settings } = settings;
    let mode;

    if (isMdScreen) {
     
      mode = layout1Settings.leftSidebar.mode === "close" ? "mobile" : "close";
    } else {
      
      mode = layout1Settings.leftSidebar.mode === "full" ? "close" : "full";
    }
    if(mode == 'full'){
      setCIcon(false)
    }else{
      setCIcon(true)
    }
   

    updateSidebarMode({ mode });
  };
  const logout = () => {
    url
      .post(`logoutLog/${user.id}`)
      .then(function (response) {
        localStorage.clear();
        window.location.reload();
        // routerHistory.push('/session/signin');
      })
      .catch(function (error) {});
  };

 
  const routerHistory = useHistory();
  const changeDivision = (div_id,div_name) => {
    setDv(div_id);
    localStorage.setItem("division", div_id);
    localStorage.setItem("bottle", div_name);

    if(localStorage.getItem("division") == 8){
     routerHistory.push("/rental/dashboard/alternative/");
     window.location.reload();


    }else{
      routerHistory.push("/dashboard/alternative/");
      window.location.reload();
      
    }

   
    // routerHistory.push('/dashboard/alternative');
  };

  useEffect(() => {
    const d = user?.divs?.map((item) => {
      console.log("item",item)
      return item.id;
    });
    setDivi(d);
    setDv(localStorage.getItem("division"));



  }, []);

  return (
    <div className={classes.topbar}>
      <div className={clsx({ "topbar-hold": true, fixed: fixed })}>
        <div className="flex justify-between items-center h-full">
          <div className="flex pr-4">
            <IconButton
              name="sideToggle"
              onClick={handleSidebarToggle}
              className="pr-4"
            >
              {cIcon ? <Tooltip title='Maximized'><Icon name="toggle">zoom_in_map</Icon></Tooltip>:  <Tooltip title='Minimized'><Icon name="toggle">zoom_out_map</Icon></Tooltip> }
             
            </IconButton>
            <p style={{marginTop:"17px",marginBottom:"1rem",fontSize:"large",fontFamily:"arial",fontWeight:"600"}}>{localStorage.getItem("bottle").toUpperCase() ? localStorage.getItem("bottle").toUpperCase() : "TRADING DIVISION"}</p>
         
          </div>
          <div className="flex items-center">
            {/* <MatxSearchBox /> */}
            <div
              className="hide-on-mobile"
              style={{ textAlign: "right" }}
            >
              {user?.division?.map((item) => {
         
                return (
                  <>
                    {item.name == "HQ " || item.name == "Manufacturing"  ? (
                      <></>
                    ) : (
                      <>
                        {divi?.includes(item.id) && (
                         
                         <Tooltip title={item.name}>
                            <Button
                            style={item.id == dv ? myStyle2 : myStyle1}
                            variant={item.id == dv && "contained"}
                            backgroundColor="#c7c7c7"
                            onClick={() => {
                              changeDivision(item.id,item.name);
                            }}
                            sx={{borderRadius:"-4px"}}
                          >
                            <div style={{ fontWeight: "bold" }}>
                              {/* {item.name.toUpperCase()} */}
                              {item.name == "Printing Division" ? (
                                <>
                                  <Icon style={{fontSize:"35px",marginTop:"5px"}}>print</Icon>
                                </>
                              ) : item.name == "Trading Division" ?   <Icon  style={{fontSize:"35px",marginTop:"5px"}}>trending_up</Icon> :item.name == "Power Division" ?   <Icon  style={{fontSize:"35px",marginTop:"5px"}}  className="hover-fx">bolt</Icon> : item.name == "Rental Division" ?   <Icon  style={{fontSize:"35px",marginTop:"5px"}}>precision_manufacturing</Icon> : ''}
                            </div>
                          </Button>
                         </Tooltip>
                        )}
                      </>
                    )}
                  </>
                );
              })}
            </div>
          
         
                     
                  
             
             
              {/* <MatxMenu
              menuButton={
                <div className={classes.userMenu}>
                  <Hidden xsDown>
                    <span>
                    <Icon> notification_important </Icon>
                    </span>
                  </Hidden>
                </div>
              }
            >
              {/* <MenuItem>
                <Link className={classes.menuItem} to="/">
                  <Icon> home </Icon>
                  <span className="pl-4"> Home </span>
                </Link>
              </MenuItem> */}
              {/* {noti.map((item,i)=>{
                return  <MenuItem key={i} style={{maxWidth:'325' ,width:325, overflowWrap: 'break-word',whiteSpace: 'pre-wrap'}}>
                {item.length > 40 ? item.substring(0,40)+'...' : item}
              </MenuItem>
              })}
              <MenuItem style={{justifyContent: "center"}}>View All Notifications</MenuItem>
              */}
            
            {/* </MatxMenu> */} 
            <MatxMenu
              menuButton={
                <div className={classes.userMenu}>
                  <Hidden xsDown>
                    <span>
                      <strong>{user?.name}</strong>
                    </span>
                  </Hidden>
                  <Avatar className="cursor-pointer" />
                </div>
              }
            >
              {/* <MenuItem>
                <Link className={classes.menuItem} to="/">
                  <Icon> home </Icon>
                  <span className="pl-4"> Home </span>
                </Link>
              </MenuItem> */}
              {localStorage.getItem("role") == "SA" && <><MenuItem>
                <Link
                  className={classes.menuItem}
                  to={navigatePath + "/profile"}
                >
                  <Icon> person </Icon>
                  <span className="pl-4"> Profile </span>
                </Link>
              </MenuItem></>}
              
              <MenuItem
                className={classes.menuItem}
                onClick={(e) =>
                  routerHistory.push(navigatePath + "/changepass")
                }
              >
                <Icon> settings </Icon>
                <span className="pl-4">Change Password</span>
                {shouldOpenEditorDialog && (
                  <MemberEditorDialog
                    handleClose={handleDialogClose}
                    open={shouldOpenEditorDialog}
                  />
                )}
                {shouldOpenConfirmationDialog && (
                  <ConfirmationDialog
                    open={shouldOpenConfirmationDialog}
                    onConfirmDialogClose={handleDialogClose}
                    text="Are you sure to delete?"
                  />
                )}
              </MenuItem>

              <MenuItem onClick={logout} className={classes.menuItem}>
                <Icon> power_settings_new </Icon>
                <span className="pl-4"> Logout </span>
              </MenuItem>
            </MatxMenu>
            <NotificationBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Layout1Topbar);
