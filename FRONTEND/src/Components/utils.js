export const getStartOfDay = (inputDate) => {

    // console.log(inputDate);
    

    const date = new Date(inputDate);
    return date.toISOString().split("T")[0];
};

export const loginImage = (name) => {
    if (!name) return "";

    const words = name.toUpperCase().split(" ");

    const initials = words.map((word) => word[0]).join("");

    return initials;
};

export const getExpenseEmoji = (cat) => {
    const map = {
        Food: "🍔",
        Travel: "✈️",
        Bills: "💡",
        Shopping: "🛒",
        Other: "💸",
    };

    return map[cat];
};

export const getIncomeEmoji = (cat) => {
    const map = {
        Salary: "💼",
        Youtube: "🎥",
        Stocks: "📈",
        Crypto: "🪙",
        Other: "💰",
    };

    return map[cat];
};
