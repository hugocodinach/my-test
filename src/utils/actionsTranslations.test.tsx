import actionTypes from "../data/actionTypes";
import getTranslatedActionName from "./actionsTranslations";

describe('getTranslatedActionName function', () => {
    test('Should return a result for all actionTypes', () => {
        actionTypes.forEach(type => {
            expect(getTranslatedActionName(type)).toBeDefined();
        });
    });
})