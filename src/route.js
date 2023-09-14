/**
 * These router focuses on fetching data from baseURL (targetURL)
 * to give to the parser function and then return the data with json format.
 */

import axios from "axios";
import * as cheerio from "cheerio";

//local import
import { headerOPT, baseURL } from "./settings.js";

import {
    parseAnimeDetail,
    parseAnimeList,
    parseAnimeStream,
    parsePage,
} from "./parser.js";

async function routeAnimeSearch(req, res) {
    let json = {
        status: "",
        searchName: req.params.searchName,
        orderBy: req.params.orderBy || "latest",
        page: req.params.page || "1",
        lastPage: "1",
        data: [],
    };

    let targetURL = `${baseURL}/anime?order_by=${json.orderBy}&search=${json.searchName}&page=${json.page}`;

    try {
        let html = await axios.get(targetURL, headerOPT);
        const $ = cheerio.load(html.data);

        json.lastPage = parsePage($);
        json.data = parseAnimeList($);
        json.status = html.status;
    } catch (err) {
        console.log(err);
        json.status = err.status;
    }
    res.status(json.status).json(json);
}

async function routeAnimeDetail(req, res) {
    let json = {
        status: "",
        animeId: req.params.animeId,
        animeSlug: req.params.animeSlug,
        data: {},
    };
    let targetURL = `${baseURL}/anime/${json.animeId}/${json.animeSlug}?page=${req.params.page}`;

    try {
        let html = await axios.get(targetURL, headerOPT);
        const $ = cheerio.load(html.data);
        json.data = parseAnimeDetail($, req.params.page);
        json.status = html.status;
    } catch (err) {
        console.log(err);
        json.status = err.status;
    }

    res.status(json.status).json(json);
}

async function routeAnimeFinished(req, res) {
    let json = {
        status: "",
        orderBy: req.params.orderBy || "updated",
        page: req.params.page || "1",
        lastPage: "1",
        data: [],
    };

    let targetURL = `${baseURL}/anime/finished?order_by=${json.orderBy}&page=${json.page}`;

    try {
        let html = await axios.get(targetURL, headerOPT);
        const $ = cheerio.load(html.data);

        json.lastPage = parsePage($);
        json.data = parseAnimeList($);
        json.status = html.status;
    } catch (err) {
        console.log(err);
        json.status = err.status;
    }
    res.status(json.status).json(json);
}

async function routeAnimeOngoing(req, res) {
    let json = {
        status: "",
        orderBy: req.params.orderBy || "latest",
        page: req.params.page || "1",
        lastPage: "1",
        data: [],
    };

    let targetURL = `${baseURL}/anime/ongoing?order_by=${json.orderBy}&page=${json.page}`;

    try {
        let html = await axios.get(targetURL, headerOPT);
        const $ = cheerio.load(html.data);

        json.lastPage = parsePage($);
        json.data = parseAnimeList($);
        json.status = html.status;
    } catch (err) {
        console.log(err);
        json.status = err.status;
    }
    res.status(json.status).json(json);
}

async function routeAnimeList(req, res) {
    let json = {
        status: "",
        orderBy: req.params.orderBy || "popular",
        page: req.params.page || "1",
        lastPage: "1",
        data: [],
    };

    let targetURL = `${baseURL}/anime?order_by=${json.orderBy}&page=${json.page}`;

    try {
        let html = await axios.get(targetURL, headerOPT);
        const $ = cheerio.load(html.data);

        json.lastPage = parsePage($);
        json.data = parseAnimeList($);
        json.status = html.status;
    } catch (err) {
        console.log(err);
        json.status = err.status;
    }
    res.status(json.status).json(json);
}

async function routeAnimeStream(req, res) {
    let json = {
        animeId: req.params.animeId,
        animeSlug: req.params.animeSlug,
        animeCurrentEpisode: req.params.episodeNum,
    };
    let targetURL = `${baseURL}/anime/${json.animeId}/${json.animeSlug}/episode/${json.animeCurrentEpisode}?activate_stream=1`;

    try {
        let html = await axios(targetURL, headerOPT);
        let $ = cheerio.load(html.data);

        json.data = parseAnimeStream($);
    } catch (err) {
        console.log(err);
    }
    res.status(json.status).json(json);
}

export {
    routeAnimeDetail,
    routeAnimeFinished,
    routeAnimeList,
    routeAnimeOngoing,
    routeAnimeSearch,
    routeAnimeStream,
};
