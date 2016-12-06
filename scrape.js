"use strict";

const request = require("request");
const cheerio = require("cheerio");

request("http://hypem.com/popular/week:Nov-14-2016?count=50", (err, resp, body) => {

  if (err || resp.statusCode !== 200) {
    throw new Error("looks like hypemachine is down");
  }

  let $ = cheerio.load(body);

  $("[data-itemid]").each(function(){
    let itemId = $(this).data().itemid;
    let artist = $(this).find('.track_name a.artist').text();
    let title = $(this).find('.track_name a.track span.base-title').text();
    let dateposted = $(this).find('.post_info a.readpost').attr('title');
    let siteid = $(this).find('.post_info a.follow-pill').attr('class').split(' ')[1].slice(9);

    console.log(
      'item: '+itemId,
      'artist: '+artist,
      'title: '+title,
      'dateposted: '+dateposted,
      'siteid: '+siteid
    );
  });

});
