import React, { useEffect, useState } from "react";
import Simulation from "../models/data-simulation";
import Target from "../models/result-target";

type Props = {
  simulationPath: string;
  simulations: Array<Simulation>;
  targets: Array<Target>;
};

const SimulationResultRow = ({
  simulationPath,
  simulations,
  targets,
}: Props) => {
  const [_counter, setCounter] = useState(0);

  interface ICounter {
    counter: number;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((counter) => counter + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-row mt-2">
      <div className="">{simulationPath}</div>
      <div className="ml-2">{_counter}</div>
    </div>
  );
};

export default SimulationResultRow;
