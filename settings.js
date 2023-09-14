const headerOPT = {
    headers: {
        "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
        "Accept-Language": "en-US,en;q=0.9",
    },
    validateStatus: (status) => true,
};

const port = 3001;
const localURL = "http://localhost";
const baseURL = "https://kuramanime.pro";

const whitelist_URL = "http://192.168.18.80:5173";
// const whitelist_URL = "http://192.168.106.75:5173";

export { headerOPT, port, localURL, baseURL, whitelist_URL };
