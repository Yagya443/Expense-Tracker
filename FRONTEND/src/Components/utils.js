export const getStartOfDay = (inputDate) => {
    const date = new Date(inputDate);
    return date.toISOString().split("T")[0];
};
