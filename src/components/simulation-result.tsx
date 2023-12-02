import React, { useEffect, useState, createElement } from "react";
import _ from "lodash";

import DataGroups from "../models/data-groups";
import InputField from "./atoms/input-field";
import Button from "./atoms/button";
import SimulationResultRow from "./simulation-result-row";
import Simulation from "../models/data-simulation";
import { TARGETS } from "../constants/ttypes";
import ResultTarget from "../models/result-target";
import SimulationGroup from "../models/simulation-group";

type Props = {
  dataGroups: Array<DataGroups>;
};

const SimulationResult = ({ dataGroups }) => {
  const [simulationPath, setSimulationPath] = useState("");
  const [numSimulations, setNumSimulations] = useState(100000);
  const [simulationResult, setSimulationResult] = useState<JSX.Element[]>([]);

  useEffect(() => {
    createSimulationPath(dataGroups);
  }, []);

  useEffect(() => {
    createSimulationPath(dataGroups);
  }, [dataGroups]);

  const createSimulationPath = (dataGroups: Array<DataGroups>) => {
    let result = "";
    let numberOfCombinations = 1;

    dataGroups.forEach(function (part, index, arr) {
      if (part.ttype !== TARGETS) {
        result += part.name != "" ? part.name : "NaN";
        result += " [" + part.dataValues.length + "]";
        if (index !== arr.length - 1) result += " -> ";
        numberOfCombinations *= part.dataValues.length;
      }
    });

    result += " => " + numberOfCombinations;

    setSimulationPath(result);
  };

  const SleepForASecond = () => {
    return new Promise((resolve) => setTimeout(resolve, 500));
  };

  const switchSimulationGroups = (simulationGroups: Array<SimulationGroup>) => {
    const copySimGroups = _.cloneDeep(simulationGroups);
    let keepSwitching;
    let currSimGroup = copySimGroups.length - 1;

    do {
      keepSwitching = false;
      copySimGroups[currSimGroup].current++;
      if (
        copySimGroups[currSimGroup].current === copySimGroups[currSimGroup].max
      ) {
        copySimGroups[currSimGroup].current = 0;
        currSimGroup--;
        keepSwitching = true;
      }
    } while (keepSwitching);

    return copySimGroups;
  };

  const keepRunningSimulation = (simulationGroups: Array<SimulationGroup>) => {
    let keepRunning = false;
    simulationGroups.forEach((simGroup) => {
      if (simGroup.current != simGroup.max - 1) {
        keepRunning = true;
      }
    });
    return keepRunning;
  };

  const runSimulation = () => {
    let runSimulation = true;

    setSimulationResult([]);

    SleepForASecond().then(() => {
      let simulationGroups = Array<SimulationGroup>();

      dataGroups.forEach((dataGroup) => {
        if (dataGroup.ttype !== TARGETS) {
          simulationGroups.push({
            current: 0,
            max: dataGroup.dataGroup.length,
          });
        }
      });

      while (runSimulation) {
        let currentSimulationPath = "";
        let simulationsToRun = Array<Simulation>();

        simulationGroups.forEach((sg, index) => {
          // Simulation path
          currentSimulationPath += dataGroups[index].dataGroup[sg.current].name;
          if (index != simulationGroups.length - 1)
            currentSimulationPath += " - ";

          // Simulation to run
          if (dataGroups[index].ttype !== TARGETS) {
            const newSimulation = new Simulation();
            // newSimulation. = dataGroups[index].dataGroup[sg.current].name;
            // newSimulation.ttype = dataGroups[index].ttype;
            // newSimulation.value = dataGroups[index].dataGroup[sg.current].value;
            simulationsToRun.push(newSimulation);
          }
        });

        let counter = 0;
        const currentResult = createElement(SimulationResultRow, {
          simulationPath: currentSimulationPath,
          simulations: simulationsToRun,
          targets: [],
        });

        setSimulationResult((currSimResult) => {
          const copy = [...currSimResult];
          copy.push(currentResult);
          return copy;
        });

        for (let i = 0; i < numSimulations; i++) {
          counter++;
        }

        runSimulation = keepRunningSimulation(simulationGroups);
        simulationGroups = switchSimulationGroups(simulationGroups);
      }
    });
  };

  return (
    <div>
      <div className="text-xl font-semibold">Simulation Result</div>
      <div>
        <span className="font-bold mr-2">Current simulation path:</span>
        {simulationPath}
      </div>
      <div className="flex flex-row mt-2">
        <InputField
          id="numSimulations"
          title="Number of simulations:"
          value={numSimulations.toString()}
          onChange={(value: string) => setNumSimulations(parseInt(value))}
          className="w-[100px]"
        />
        <Button text="Run Simulation" onClick={() => runSimulation()} />
      </div>
      <div className="flex flex-col border mt-4">{simulationResult}</div>
    </div>
  );
};

export default SimulationResult;
