import IAction from "./IAction";

interface IRound {
    playerAction: IAction;
    computerAction: IAction;
    winner: 'player' | 'computer' | 'draw';
};

export default IRound;