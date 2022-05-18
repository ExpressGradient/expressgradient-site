module.exports = {
    content: ["./pages/**/*.js", "./components/**/*.js"],
    theme: {
        extend: {
            fontFamily: {
                serif: ["Radio Canada", "sans-serif"],
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
