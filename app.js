import express from "express";
import cors from "cors";

///local import
import { port } from "./settings.js";

import {
    routeAnimeDetail,
    routeAnimeFinished,
    routeAnimeList,
    routeAnimeOngoing,
    routeAnimeSearch,
    routeAnimeStream,
} from "./route.js";

//initialize the express
const app = express();

//cors
app.use(cors());

app.use((req, res, next) => {
    const token = req.headers.authorization;

    // if (token && isValidToken(token)) {
    //     next();
    // } else {
    //     res.status(401).json({ message: "You are not Authorized" });
    // }
});

function isValidToken(token) {
    if (token == "Bearer Kurodoke") return true;
    return false;
}

//routes
app.all("/", function (req, res) {
    res.send(
        "<h1>welcome to anime REST API</h1> <h3>add the /api/ to the url to access the api</h3> <p>read the documentation of the api for the detail</p>"
    );
});

app.get("/api/headers", async function (req, res) {
    try {
        let html = await axios.get("http://httpbin.org/headers", headerOPT);
        res.send(html);
    } catch {}
});

//route search
app.get("/api/search/:searchName/:page?/:orderBy?", routeAnimeSearch);

//route anime detail
app.get("/api/anime/:animeId/:animeSlug/:page?", routeAnimeDetail);

//route anime finished
app.get("/api/finished/:page?/:orderBy?", routeAnimeFinished);

//route anime ongoing
app.get("/api/ongoing/:page?/:orderBy?", routeAnimeOngoing);

//route anime list
app.get("/api/animelist/:page?/:orderBy?", routeAnimeList);

//route anime episode(stream)
app.get("/api/anime/:animeId/:animeSlug/episode/:episodeNum", routeAnimeStream);

//start server
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
