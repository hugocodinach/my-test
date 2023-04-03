const getDateDelay = (dateISO: string) => {
    const currentDate = new Date();
    const nextDate = new Date(dateISO);

    const currentDateValue = currentDate.getTime();
    const nextDateValue = nextDate.getTime();

    return nextDateValue - currentDateValue;
}

export {
    getDateDelay
}