import DataGroups from "../models/data-groups";
import DataSimulation from "../models/data-simulation";
import SimulationGroup from "../models/simulation-group";
import Operation from "../models/operation";
import Target from "../models/target";
import { TARGETS } from "../constants/ttypes";

const splitGroups = (dataGroups: Array<DataGroups>) => {
  let operationGroups = Array<DataGroups>();
  let targetGroups = Array<DataGroups>();

  dataGroups.forEach((dataGroup) => {
    if (dataGroup.ttype === TARGETS) {
      targetGroups.push(dataGroup);
    } else {
      operationGroups.push(dataGroup);
    }
  });

  return [operationGroups, targetGroups];
};

const setUpSimulationPath = (dataGroups: Array<DataGroups>) => {
  const ret = Array<SimulationGroup>();

  dataGroups.forEach((dataGroup) => {
    ret.push({
      current: 0,
      max: dataGroup.dataValues.length,
    });
  });

  return ret;
};

const switchSimulationPath = (simulationGroups: Array<SimulationGroup>) => {
  let keepSwitching = false;
  let currSimGroup = simulationGroups.length - 1;

  do {
    keepSwitching = false;
    simulationGroups[currSimGroup].current++;
    if (
      simulationGroups[currSimGroup].current ===
      simulationGroups[currSimGroup].max
    ) {
      simulationGroups[currSimGroup].current = 0;
      currSimGroup--;
      keepSwitching = true;
    }
  } while (keepSwitching);

  return simulationGroups;
};

const keepRunning = (simulationGroups: Array<SimulationGroup>) => {
  let keepRunning = false;

  simulationGroups.forEach((simGroup) => {
    if (simGroup.current !== simGroup.max - 1) {
      keepRunning = true;
    }
  });

  return keepRunning;
};

const createTargets = (targetGroups: Array<DataGroups>) => {
  const ret = Array<Target>();

  targetGroups.forEach((targetGroup) => {
    targetGroup.dataValues.forEach((dataValue) => {
      ret.push({
        value: dataValue.name,
        result: dataValue.value,
      });
    });
  });

  return ret;
};

const createSimulations = (
  dataGroups: Array<DataGroups>
): Array<DataSimulation> => {
  const ret: Array<DataSimulation> = [];

  if (dataGroups.length === 0) return ret;

  const [operationGroups, targetGroups] = splitGroups(dataGroups);

  let simulationGroups = setUpSimulationPath(operationGroups);

  const targets = createTargets(targetGroups);

  let run = true;
  while (run) {
    let simulationPath = "";
    const operations = Array<Operation>();

    simulationGroups.forEach((simulationGroup, index) => {
      simulationPath +=
        operationGroups[index].dataValues[simulationGroup.current].name + " - ";
      operations.push({
        type: operationGroups[index].ttype,
        value: operationGroups[index].dataValues[simulationGroup.current].value,
      });
    });

    ret.push({
      path: simulationPath,
      operations: operations,
      targets: targets,
      results: [],
    });

    run = keepRunning(simulationGroups);
    if (run) simulationGroups = switchSimulationPath(simulationGroups);
  }

  return ret;
};

export default createSimulations;
