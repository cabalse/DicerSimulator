import DataSimulationResult from "./data-simulation-result";
import Operation from "./operation";
import Target from "./target";

class DataSimulation {
  path: string;
  operations: Array<Operation>;
  targets: Array<Target>;
  results: Array<DataSimulationResult>;
}

export default DataSimulation;
