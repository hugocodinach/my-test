import actionLifetime from "../data/actionLifeTime";
import IAction from "../interfaces/IAction";
import TActionName from "../types/TActionName";

const createNewActionFromName = (queue: IAction[], name: TActionName) => {
    const newDate = queue.length ? new Date(queue[queue.length - 1].launchDate) : new Date();
    newDate.setTime(newDate.getTime() + actionLifetime);

    const newAction: IAction = {
        name,
        launchDate: newDate.toISOString()
    }

    return newAction;
}

export {
    createNewActionFromName
};