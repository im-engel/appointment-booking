function randomHour() { // min and max included 
    return Math.floor(Math.random() * (180 - 30 + 1) + 30)
}

function addHours(date: Date, hours: number) {
    date.setMinutes(date.getMinutes() + hours);

    return date;
}

export default {randomHour, addHours}