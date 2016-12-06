"use strict";

const request = require("request");
const cheerio = require("cheerio");

request("http://hypem.com/popular/week:Nov-14-2016?count=50", (err, resp, body) => {

  if (err || resp.statusCode !== 200) {
    throw new Error("looks like hypemachine is down");
  }

  let $ = cheerio.load(body);

  $('.track_name a.artist').each(function(){
    let artistName = $(this).text();
    console.log(artistName);
  });

});
