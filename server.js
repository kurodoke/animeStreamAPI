import express from "express";

//local import
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

//routes
app.all("/", function (req, res) {
    res.send(
        "<h1>welcome to anime REST API</h1> <h3>add the /api/ to the url to access the api</h3> <p>read the documentation of the api for the detail</p>"
    );
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
app.get("/api/anime/:page?/:orderBy?", routeAnimeList);

//route anime episode(stream)
app.get("/api/anime/:animeId/:animeSlug/episode/:episodeNum", routeAnimeStream);

//start server
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
