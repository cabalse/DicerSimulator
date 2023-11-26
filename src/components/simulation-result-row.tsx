import React from "react";

type props = {
  simulationPath: string;
  counter: number;
};

const SimulationResultRow = ({ simulationPath, counter }: props) => {
  return (
    <div className="flex flex-row mt-2">
      <div className="">{simulationPath}</div>
      <div className="ml-2">{counter}</div>
    </div>
  );
};

export default SimulationResultRow;
