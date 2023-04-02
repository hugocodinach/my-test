import actionNames from "./actionNames";

interface IAction {
    name: typeof actionNames[number];
    launchDate: string;
};

export default IAction;