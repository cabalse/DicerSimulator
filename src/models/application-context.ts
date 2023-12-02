import DataGroups from "./data-groups";

type ApplicationContext = {
  dataGroups: Array<DataGroups>;
  setDataGroups: (dataGroups: Array<DataGroups>) => void;
};

export default ApplicationContext;
