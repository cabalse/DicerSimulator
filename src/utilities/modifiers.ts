import Target from "../models/target";

// Modifiers suported: +X, -X

const SPLIT_MODIFIERS = true; // Split Modifiers : splits a modifier, ex: +2 => +1 +1 or -3 => -1 -1 -1
const MODIFIERS_APPLIED_UNIQUELY = true; // Each modifier is each applied to a unique result, if true EXCESSIVE_MODIFIERS_REMOVED is always true
const EXCESSIVE_MODIFIERS_REMOVED = true; // If more modifiers than results, remove the excess modifiers
const APPLY_NEGATIVE_MODIFIERS_FIRST = true; // If true, negative modifiers are applied first, if false, positive modifiers are applied first
const APPLY_NEGATIVE_MODIFIERS_FOR_WORST_RESULT = true; // If true, negative modifiers are applied to get the worst result
const STACK_POSITIVE_MODIFERS_ON_NEGATIVE = true; // If true, positive modifiers are applied to negative modifiers, if false, positive modifiers are applied to positive modifiers
const CANCEL_MODIFIERS_AGAINST_EACH_OTHER = true; // If true, modifiers cancel each other out, if false, modifiers are applied as normal

const removeElementFromArray = (array: Array<number>, element: number) => {
  const arrayCopy = [...array];
  const index = arrayCopy.indexOf(element);
  if (index > -1) {
    arrayCopy.splice(index, 1);
  }
  return arrayCopy;
};

const sortArrat = (array: Array<number>, order?: "DESC" | "ASC") => {
  const arrayCopy = [...array];
  if (order === "DESC") return arrayCopy.sort((a, b) => b - a);
  else return arrayCopy.sort((a, b) => a - b);
};

const removeZeroesFromArray = (array: Array<number>) => {
  const arrayCopy = [...array];
  const ret = Array<number>();
  arrayCopy.forEach((element) => {
    if (element !== 0) ret.push(element);
  });
  return ret;
};

const splitNegativeAndPositiveModifiers = (mods: Array<number>) => {
  const negativeMods = Array<number>();
  const positiveMods = Array<number>();

  mods.forEach((mod) => {
    if (mod < 0) {
      negativeMods.push(mod);
    } else {
      positiveMods.push(mod);
    }
  });

  return [negativeMods, positiveMods];
};

const convertModifierArray = (mods: Array<string>) => {
  const ret = Array<number>();
  mods.forEach((mod) => {
    ret.push(parseInt(mod));
  });
  return ret;
};

const splitModifiers = (mods: Array<number>) => {
  const ret = Array<number>();
  mods.forEach((mod) => {
    if (mod < 0) {
      for (let i = 0; i < Math.abs(mod); i++) {
        ret.push(-1);
      }
    } else {
      for (let i = 0; i < mod; i++) {
        ret.push(1);
      }
    }
  });
  return ret;
};

const cancelOutModifiers = (mods: Array<number>) => {
  const ret = Array<number>();

  let [negativeMods, positiveMods] = splitNegativeAndPositiveModifiers(
    removeZeroesFromArray([...mods])
  );

  // console.log("negativeMods: ", negativeMods);
  // console.log("positiveMods: ", positiveMods);

  negativeMods.forEach((negativeMod) => {
    let removed = false;

    positiveMods.forEach((positiveMod) => {
      if (Math.abs(negativeMod) === positiveMod) {
        negativeMods = removeElementFromArray(negativeMods, negativeMod);
        positiveMods = removeElementFromArray(positiveMods, positiveMod);
        removed = true;
      }

      if (!removed) {
        positiveMods.forEach((positiveMod) => {
          if (Math.abs(negativeMod) <= positiveMod) {
            const newModifier = positiveMod + negativeMod;
            ret.push(newModifier);
            negativeMods = removeElementFromArray(negativeMods, negativeMod);
            positiveMods = removeElementFromArray(positiveMods, positiveMod);
            removed = true;
          }
        });
      }

      if (!removed) {
        negativeMods = removeElementFromArray(negativeMods, negativeMod);
        ret.push(negativeMod);
      }
    });
  });

  positiveMods.forEach((positiveMod) => {
    ret.push(positiveMod);
  });

  // console.log("ret: ", ret);

  return removeZeroesFromArray(ret);
};

const removeResultsThatMatchTargets = (
  result: Array<number>,
  targets: Array<Target>
) => {
  const ret = Array<number>();

  result.forEach((res) => {
    let hasTarget = false;
    targets.forEach((target) => {
      if (res.toString() === target.value) {
        hasTarget = true;
      }
    });
    if (hasTarget) ret.push(res);
  });

  return ret;
};

const applyModifiers = (
  mod: number,
  result: Array<number>,
  targets: Array<Target>
) => {
  const ret = Array<number>();
  let resultCopy = removeResultsThatMatchTargets(result, targets);
  resultCopy = sortArrat(resultCopy, "DESC");

  result.forEach((res) => {
    console.log("RES: ", res);
  });

  return ret;
};

const addModifiers = (
  result: Array<number>,
  mods: Array<string>,
  targets: Array<Target>
) => {
  let modsAsNumbers = convertModifierArray(mods);
  if (SPLIT_MODIFIERS) modsAsNumbers = splitModifiers(modsAsNumbers);

  modsAsNumbers = sortArrat(modsAsNumbers);

  if (CANCEL_MODIFIERS_AGAINST_EACH_OTHER)
    modsAsNumbers = cancelOutModifiers(modsAsNumbers);

  modsAsNumbers.forEach((mod) => {});

  return result;
};

export { addModifiers };
