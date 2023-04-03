import actionTypes from "./actionTypes";

type maxCreditMap = {
    [key: typeof actionTypes[number]]: number;
}

const actionsMaxCredit: maxCreditMap = {
    'rock': 30,
    'leaf': 20,
    'scissors': 25
};

export default actionsMaxCredit;