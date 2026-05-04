export const getStartOfDay = (inputDate) => {
    const date = new Date(inputDate);
    return date.toISOString().split("T")[0];
};

export const loginImage = (name) => {
    if (!name) return "";

    const words = name.toUpperCase().split(" ");

    const initials = words.map((word) => word[0]).join("");

    return initials;
};


