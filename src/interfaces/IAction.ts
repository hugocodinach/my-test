import TActionName from "../types/TActionName";

interface IAction {
    name: TActionName;
    launchDate: string;
    _id?: string;
};

export default IAction;