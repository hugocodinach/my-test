import actionTypes from "../data/actionTypes";
import IActionCredits from "../interfaces/IActionCredits";

type TActionsCreditsMap = {
    [key: typeof actionTypes[number]]: IActionCredits;
};

export default TActionsCreditsMap;