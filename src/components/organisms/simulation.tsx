import React, { ReactNode, useContext, useEffect } from "react";

import AppContext from "../../context/app-context";
import DataSimulation from "../../models/data-simulation";
import createSimulations from "../../utilities/create-simulations";
import Button from "../atoms/button";
import Simulator from "./simulator";

const Simulation = () => {
  const appContext = useContext(AppContext);

  const [simulations, setSimulations] = React.useState<Array<DataSimulation>>(
    []
  );
  const [simulators, setSimulators] = React.useState<Array<ReactNode>>([]);

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 10000) + 1;
  };

  useEffect(() => {
    const ret = createSimulations(appContext.dataGroups);
    setSimulations(ret);
  }, [appContext.dataGroups]);

  const runSimulation = () => {
    const newSimulators = Array<ReactNode>();
    simulations.forEach((sim) => {
      const simulator = React.createElement(Simulator, {
        simulator: sim,
        key: getRandomNumber(),
      });
      newSimulators.push(simulator);
    });
    setSimulators(newSimulators);
  };

  return (
    <div>
      <h1>Simulation</h1>
      <div>Number of simulation paths: {simulations.length}</div>
      <Button onClick={runSimulation} text="Run Simulation" />
      {simulators}
    </div>
  );
};

export default Simulation;
