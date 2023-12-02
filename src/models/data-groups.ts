import DataValue from "./data-value";

type DataGroups = {
  id: number;
  name: string;
  desc: string;
  ttype: string;
  dataValues: DataValue[];
};

export default DataGroups;
