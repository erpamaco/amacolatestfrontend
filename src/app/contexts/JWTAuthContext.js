import React, { createContext, useEffect, useReducer } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios.js";
import { MatxLoading } from "matx";
import url from "../views/invoice/InvoiceService";
// import { browserName, browserVersion, osName } from "react-device-detect";z

const initialState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
  division: null,
};

const isValidToken = accessToken => {
  if (!accessToken) {
    return false;
  }

  const decodedToken = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decodedToken.exp > currentTime;
};

const setSession = accessToken => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    url.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    delete url.defaults.headers.common["Authorization"];
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      const { isAuthenticated, user } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user,
      };
    }
    case "LOGIN": {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    case "REGISTER": {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...initialState,
  method: "JWT",
  login: () => Promise.resolve(),
  logout: () => {},
  register: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (email, password) => {
    const response = await url.post("/auth/login", { email, password });

    const { accessToken, user, role, division, division_data } = response.data;
    localStorage.setItem("division", division);
    localStorage.setItem("role", role);
    localStorage.setItem("auth_user", user);
    localStorage.setItem("user_name", user.name);
    localStorage.setItem("user_id", user.id);
    localStorage.setItem("bottle", division_data[0]?.name);
    // console.log(`${browserName} ${browserVersion}` + osName);
    //   const uid = user.id
    // url.get(`userPermission/${uid}`).then(({ data }) => {
    // localStorage.setItem("permissiondata" ,JSON.stringify(data.permission));
    // })
    setSession(accessToken);

    dispatch({
      type: "LOGIN",
      payload: {
        user,
      },
    });
  };

  const register = async (email, username, password) => {
    const response = await axios.post("/api/auth/register", {
      email,
      username,
      password,
    });

    const { accessToken, user } = response.data;

    setSession(accessToken);

    dispatch({
      type: "REGISTER",
      payload: {
        user,
      },
    });
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    (async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await url.post("/auth/me");
          const { user } = response.data;

          dispatch({
            type: "INIT",
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: "INIT",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INIT",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    })();
  }, []);

  if (!state.isInitialised) {
    return <MatxLoading />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "JWT",
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
