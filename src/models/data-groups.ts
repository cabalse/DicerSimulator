import DataGroup from "./data-group";

type DataGroups = {
  id: number;
  name: string;
  desc: string;
  type: string;
  dataGroup: DataGroup[];
};

export default DataGroups;
