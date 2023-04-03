import actionTypes from "../data/actionTypes";

interface IAction {
    name: typeof actionTypes[number];
    launchDate: string;
};

export default IAction;