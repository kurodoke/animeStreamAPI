const headerOPT = {
    headers: {
        "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
        "Accept-Language": "en-US,en;q=0.9",
    },
    validateStatus: (status) => true,
};

const port = 5000;
const baseURL = "https://kuramanime.pro";

export { headerOPT, port, baseURL };
