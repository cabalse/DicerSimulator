import React from "react";

import ApplicationContext from "../models/application-context";
import appConstextDefault from "./app-context-default";

const AppContext = React.createContext<ApplicationContext>(appConstextDefault);

export default AppContext;
