import React from "react";

import AppContext from "./context/app-context";
import MainPage from "./components/pages/main-page";
import ApplicationContext from "./models/application-context";
import DataGroups from "./models/data-groups";

const title = "Dicer Simulator";

const App = () => {
  const [dataGroups, setDataGroups] = React.useState<Array<DataGroups>>([]);

  const contextValue: ApplicationContext = {
    dataGroups,
    setDataGroups,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <MainPage title={title} />
    </AppContext.Provider>
  );
};

export default App;
