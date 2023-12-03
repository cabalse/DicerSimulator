import React, { useEffect } from "react";
import _ from "lodash";

import DataSimulation from "../../models/data-simulation";
import DataSimulationResult from "../../models/data-simulation-result";
import { DICE } from "../../constants/ttypes";
import DiceScore from "../../models/dice_score";
import Target from "../../models/target";
import Operation from "../../models/operation";

const nrOfSimulations = 10000;

const throwDie = (sides: number) => {
  return Math.floor(Math.random() * sides) + 1;
};

const addSimulationResult = (
  result: number,
  results: Array<DataSimulationResult>
) => {
  const newResult: Array<DataSimulationResult> = _.cloneDeep(results);
  let found = false;

  newResult.forEach((item) => {
    if (item.result === result) {
      item.value++;
      found = true;
    }
  });

  if (!found) {
    newResult.push({ result: result, value: 1 });
  }

  newResult.sort((a, b) => (a.result > b.result ? 1 : -1));

  return newResult;
};

const addDiceResult = (score: number, diceScores: Array<DiceScore>) => {
  let newDiceScores: Array<DiceScore> = _.cloneDeep(diceScores);
  let found = false;

  newDiceScores.forEach((item) => {
    if (item.value === score) {
      item.amount++;
      found = true;
    }
  });

  if (!found) {
    newDiceScores.push({ value: score, amount: 1 });
  }

  newDiceScores.sort((a, b) => (a.value > b.value ? 1 : -1));

  return newDiceScores;
};

const getTarget = (result: number, targets: Array<Target>) => {
  let ret = 0;
  targets.forEach((target) => {
    if (target.value === result) {
      ret = target.result;
    }
  });
  return ret;
};

const getPercentage = (value: number, all: Array<DataSimulationResult>) => {
  let total = 0;
  all.forEach((item) => {
    total += item.value;
  });
  const percentage = (value / total) * 100;
  return percentage.toFixed(0);
};

const getPercentageDiceScore = (value: number, all: Array<DiceScore>) => {
  let total = 0;
  all.forEach((item) => {
    total += item.amount;
  });
  const percentage = (value / total) * 100;
  return percentage.toFixed(0);
};

const getNumberOfDice = (operations: Array<Operation>): number => {
  let nrOfDice = 0;
  operations.forEach((operation) => {
    if (operation.type === DICE) {
      nrOfDice += operation.value;
    }
  });

  return nrOfDice;
};

const getRandomNumber = () => {
  return Math.floor(Math.random() * 10000) + 1;
};

type Props = {
  simulator: DataSimulation;
};

const Simulator = ({ simulator }: Props) => {
  const [simulationResults, setSimulationResults] = React.useState<
    Array<DataSimulationResult>
  >([]);
  const [diceScores, setDiceScores] = React.useState<Array<DiceScore>>([]);

  const simulate = () => {
    let simulationResults = Array<DataSimulationResult>();
    let diceResult = Array<DiceScore>();

    for (let i = 0; i < nrOfSimulations; i++) {
      let result = Array<number>();

      simulator.operations.forEach((operation) => {
        if (operation.type === DICE) {
          for (let i = 0; i < operation.value; i++) {
            const dieResult = throwDie(6);
            result.push(dieResult);
          }
        }
      });

      let hits = 0;
      result.forEach((item) => {
        hits += getTarget(item, simulator.targets);
      });
      simulationResults = addSimulationResult(hits, simulationResults);

      result.forEach((item) => {
        diceResult = addDiceResult(item, diceResult);
      });
    }

    setDiceScores(diceResult);
    setSimulationResults(simulationResults);
  };

  useEffect(() => {
    simulate();
  }, [simulator]);

  return (
    <div className="flex flex-row">
      <div className="w-[500px]">
        {simulator.path ?? ""} (Dice: {getNumberOfDice(simulator.operations)})
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="ml-2">Results: </div>
          {simulationResults.map((simRes) => (
            <div className="ml-1" key={getRandomNumber()}>
              [<span className="font-bold">{simRes.result}</span>:
              {getPercentage(simRes.value, simulationResults)}%]
            </div>
          ))}
        </div>
        {/* <div className="flex flex-row">
          <div className="ml-2">Dice scores: </div>
          {diceScores.map((diceScore) => (
            <div className="ml-1" key={getRandomNumber()}>
              [<span className="font-bold">{diceScore.value}</span>:
              {getPercentageDiceScore(diceScore.amount, diceScores)}%]
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default Simulator;
