const translations = {
    rock: 'Pierre',
    leaf: 'Feuille',
    scissors: 'Ciseaux'
}

const getTranslatedActionName = (actionName: string) => translations[actionName];

export default getTranslatedActionName;