import React, { ReactNode, useContext, useEffect } from "react";

import AppContext from "../../context/app-context";
import DataSimulation from "../../models/data-simulation";
import createSimulations from "../../utilities/create-simulations";
import Button from "../atoms/button";

const Simulation = () => {
  const appContext = useContext(AppContext);

  const [simulations, setSimulations] = React.useState<Array<DataSimulation>>(
    []
  );
  const [simulators, setSimulators] = React.useState<Array<ReactNode>>([]);

  useEffect(() => {
    const ret = createSimulations(appContext.dataGroups);
    setSimulations(ret);
  }, [appContext.dataGroups]);

  const runSimulation = () => {};

  return (
    <div>
      <h1>Simulation</h1>
      <div>Number of simulation paths: {simulations.length}</div>
      <div>
        {simulations.map((sim) => (
          <div key={sim.path}>{sim.path}</div>
        ))}
      </div>
      <Button onClick={runSimulation} text="Run Simulation" />
      {simulators}
    </div>
  );
};

export default Simulation;
