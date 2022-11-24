const datePickerMonthString: { [id: number]: string } = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec",
};

const getDifferenceInMinutes = (date1: any, date2: any) => {
    const dt1 = new Date(date1);
    const dt2 = new Date(date2);
    const diff = Math.floor((dt2.getTime() - dt1.getTime()) / (1000 * 60));

    if (diff < 60) {
        return `${diff} minute(s)`
    } else if (diff === 60) {
        return "1 hour"
    }

    const hours = Math.floor(diff / 60)
    const minutes = diff - (hours * 60)
    return `${hours} hour(s) ${minutes} minute(s)`;
}

const formatDateTimeToString = (date: Date) =>
    `${date.getDate().toString().padStart(2, "0")}-${
        datePickerMonthString[date.getMonth()]
    }-${date.getFullYear()} ${date.getHours().toString().padStart(2, "0")}:${date
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;

const formatTimeToString = (date: Date) =>
    `${date.getHours().toString().padStart(2, "0")}:${date
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;

const formatDateToString = (date: Date) =>
    `${date.getDate().toString().padStart(2, "0")}-${
        datePickerMonthString[date.getMonth()]
    }-${date.getFullYear()}`;

export default {
    getDifferenceInMinutes,
    formatDateTimeToString,
    formatDateToString,
    formatTimeToString
}

