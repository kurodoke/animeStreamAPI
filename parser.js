/**
 * This is the parser for the html file that gets from the target url
 * into data (a web scrape).
 *
 * It works the same as using JQuery;
 * if you don't understand JQuery, then don't change anything here.
 */
import * as cheerio from "cheerio";

//local import
import { baseURL } from "./settings.js";

/**
 *
 * @param {object} $ - the cherrio object after loading a HTML component.
 * @param {string} [page] - the page that currently requested.
 * @returns {object} return an object with data of episode that has been scraped
 */
function parseEpisode($, page = "1") {
    if ($.find("button").text().trim() == "Belum Tersedia") {
        //check if the page is invalid
        return { text: $.find("button").text().trim() };
    } else {
        //if the page is valid
        let maxEpisodePerPage = 14;
        let data = {
            episodePage: page,
            episodeLastPage: "1",
            episodeList: [],
        };

        //re-load cheerio with the data content with (html format value)
        $ = cheerio.load($.find("#episodeLists").data("content"));

        let selectorSkip = "";
        //check if the episode has more than 'maxEpisodePerPage'
        if ($("span > b").length) {
            //select element that contain the last page information
            let lastEpisodeNumber = $("a:eq(1)")
                .text()
                .split("Ep")[1]
                .split("(Terbaru)")[0]
                .trim();

            //calculate the maximum page for all episode
            data.episodeLastPage = Math.ceil(
                lastEpisodeNumber / maxEpisodePerPage
            ).toString();

            //add query to skip unecessary element
            if (data.episodePage == "1") {
                //if the page is the firstpage
                selectorSkip = `:gt(1):lt(${maxEpisodePerPage})`;
            } else {
                //if the page is the lastpage nor between them
                selectorSkip = `:gt(2):lt(${maxEpisodePerPage})`;
            }
        }

        data.episodeList.push(
            $(`a${selectorSkip}`)
                .map(function () {
                    return {
                        Episode: $(this).text().trim(),
                        EpisodeURL: $(this)
                            .attr("href")
                            .split(baseURL)[1]
                            .trim(),
                    };
                })
                .get()
        );
        return data;
    }
}

/**
 *
 * @param {object} $ - the cherrio object after loading a HTML component.
 * @returns {string} return a string that represent the last page of data
 */
function parsePage($) {
    if ($(".product__pagination").length) {
        return $(".product__pagination > a:eq(-2)").text();
    } else {
        return "1";
    }
}

/**
 *
 * @param {object} $ - the cherrio object after loading a HTML component.
 * @returns {object} return an object with list of anime that has been scraped
 */
function parseAnimeList($) {
    if ($("#emptyText").length) {
        return { text: "anime tidak ada" };
    } else {
        return $("#animeList > div:lt(18)")
            .map(function () {
                return {
                    animeName: $(this).find("div > div > h5 > a").text(),
                    animeURL: $(this)
                        .find("div > a")
                        .attr("href")
                        .split(baseURL)[1],
                    animeThumbnail: $(this).find("div > a > div").data("setbg"),
                    animeScore: $(this)
                        .find("div > a > div > div:eq(0) > span")
                        .text()
                        .trim(),
                };
            })
            .get();
    }
}

/**
 *
 * @param {object} $ - the cherrio object after loading a HTML component.
 * @param {string} [page] - the page that currently requested.
 * @returns {object} return an object with detail of selected anime that has been scraped
 */
function parseAnimeDetail($, page = "1") {
    if ($(".anime__details__content").length < 1) {
        return { text: "anime tidak ada" };
    } else {
        let details__widget = $(".anime__details__widget > div ");
        return {
            animeName: $(".anime__details__title > h3").text().trim(),
            animeFullName: $(".anime__details__title > span").text().trim(),
            animeSynopsis: $("#synopsisField").text(),
            animeType: details__widget
                .find("div:eq(0) > ul > li:eq(0) > a")
                .text()
                .trim(),
            animeTotalEps: details__widget
                .find("div:eq(0) > ul > li:eq(1) > a")
                .text()
                .trim(),
            animeStatus: details__widget
                .find("div:eq(0) > ul > li:eq(2) > a")
                .text()
                .trim(),
            animeAired: details__widget
                .find("div:eq(0) > ul > li:eq(3)")
                .text()
                .split("Tayang:")[1]
                .trim(),
            animePremiered: details__widget
                .find("div:eq(0) > ul > li:eq(4) > a")
                .text()
                .trim(),
            animeDuration: details__widget
                .find("div:eq(0) > ul > li:eq(5) > a")
                .text()
                .trim(),
            animeRegion: details__widget
                .find("div:eq(0) > ul > li:eq(7) > a")
                .text()
                .trim(),
            animeAdaptation: details__widget
                .find("div:eq(0) > ul > li:eq(8) > a")
                .text()
                .trim(),
            animeGenre: details__widget
                .find("div:eq(1) > ul > li:eq(0) > a")
                .map(function () {
                    return $(this).text().trim();
                })
                .get(),
            animeExplicit: details__widget
                .find("div:eq(1) > ul > li:eq(1)")
                .text()
                .split("Eksplisit:")[1]
                .trim(),
            animeDemographic: details__widget
                .find("div:eq(1) > ul > li:eq(2) > a")
                .text()
                .trim(),
            animeThemes: details__widget
                .find("div:eq(1) > ul > li:eq(3) > a")
                .map(function () {
                    return $(this).text().trim();
                })
                .get(),
            animeStudio: details__widget
                .find("div:eq(1) > ul > li:eq(4) > a")
                .text()
                .trim(),
            animeScore: details__widget
                .find("div:eq(1) > ul > li:eq(5) > a")
                .text()
                .trim(),
            animeRating: details__widget
                .find("div:eq(1) > ul > li:eq(7) > a")
                .text()
                .trim(),
            animeEpisode: parseEpisode($("#episodeListsSection"), page),
        };
    }
}

/**
 *
 * @param {object} $ - the cherrio object after loading a HTML component.
 * @returns {object} return an object with stream url of episode that has been scraped
 */
function parseAnimeStream($) {
    if (!$("#player").length) {
        return {
            text: "terjadi error saat men-load video, restart kembali atau check URL kembali mungkin saja salah",
        };
    } else {
        return $("#player > source")
            .map(function () {
                return {
                    animeStreamURL: $(this).attr("src"),
                    animeStreamType: $(this).attr("type"),
                    animeStreamQuality: $(this).attr("size"),
                };
            })
            .get();
    }
}

export { parseAnimeDetail, parseAnimeList, parseAnimeStream, parsePage };
