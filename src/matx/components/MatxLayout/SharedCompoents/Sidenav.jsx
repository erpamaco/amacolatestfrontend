import React, { Fragment, useEffect, useState } from "react";
import Scrollbar from "react-perfect-scrollbar";
import { navigations } from "app/navigations";
import { navigations1 } from "app/navigations1";
import { navigationsrent } from "app/navigationsrent";
import { navigationPrint } from "app/navigationPrint";
import { MatxVerticalNav } from "matx";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import useSettings from 'app/hooks/useSettings';
import useAuth from "app/hooks/useAuth";



const useStyles = makeStyles(({ palette, ...theme }) => ({

  scrollable: {
    // paddingLeft: 20,
    // paddingRight: 20,


    // width: "150px",
    "overflow-y": "auto !important",
    // "background-color": "#aaa",
    // "border-radius": "6px",
    // transition: "background-color .2s linear, width .2s ease-in-out",
    // "-webkit-transition": "background-color .2s linear, width .2s ease-in-out",
    // width: "6px",
    // right: "2px",
    // position: "absolute"


  },
  sidenavMobileOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: "100vw",
    background: "rgba(0, 0, 0, 0.54)",
    zIndex: -1,
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
}));

const Sidenav = ({ children }) => {
  const { user } = useAuth();

  const classes = useStyles();
  const { settings, updateSettings } = useSettings();
  const [x, setx] = useState('')
  const updateSidebarMode = (sidebarSettings) => {
    let activeLayoutSettingsName = settings.activeLayout + "Settings";
    let activeLayoutSettings = settings[activeLayoutSettingsName];
    updateSettings({
      ...settings,
      [activeLayoutSettingsName]: {
        ...activeLayoutSettings,
        leftSidebar: {
          ...activeLayoutSettings.leftSidebar,
          ...sidebarSettings,
        },
      },
    });
  };
  useEffect(() => {
    setx(localStorage.getItem("division"))
  })

  return (
    <Fragment>
      <Scrollbar

        options={{ suppressScrollX: true }}

        className={clsx("relative px-4", classes.scrollable)}
      >
        {children}
        <MatxVerticalNav

          // items={navigations}

          items={x === "8" ?  navigationsrent  :  navigations }
        />

      </Scrollbar>

      <div
        onClick={() => updateSidebarMode({ mode: "close" })}
        className={classes.sidenavMobileOverlay}
      />
    </Fragment>
  );
};

export default Sidenav;
