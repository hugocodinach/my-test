const translations = {
    rock: 'Pierre',
    leaf: 'Feuille',
    scissors: 'Ciseaux'
}

const translateActionName = (actionName: string) => translations[actionName];

export default translateActionName;