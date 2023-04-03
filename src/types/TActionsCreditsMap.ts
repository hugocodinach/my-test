import IActionCredits from "../interfaces/IActionCredits";
import TActionName from "./TActionName";

type TActionsCreditsMap = {
    [key in TActionName]: IActionCredits;
};

export default TActionsCreditsMap;