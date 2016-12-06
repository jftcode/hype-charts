"use strict";

const request = require("request");
const cheerio = require("cheerio");

request("http://hypem.com/popular/week:Oct-22-2007?count=50", (err, resp, body) => {

  if (err || resp.statusCode !== 200) {
    throw new Error("looks like hypemachine is down");
  }

  let $ = cheerio.load(body);

  let tracks = [];

  $("[data-itemid]").each(function(){
    let mediaid = $(this).data().itemid;
    let artist = $(this).find('.track_name a.artist').text();
    let title = $(this).find('.track_name a.track span.base-title').text();
    let dateposted = $(this).find('.post_info a.readpost').attr('title');
    let siteid = $(this).find('.post_info a.follow-pill').attr('class').split(' ')[1].slice(9);
    let sitename = $(this).find('.post_info a.blog-fav-off').text();
    let posturl = $(this).find('.post_info a.readpost').attr('href');
    // let loved_count = $(this).find('.haarp-fav-count').text().trim();
    let posted_count = $(this).find('a.toggle-reposts').text().replace(/[^0-9]+/g, '') || 1;
    // let thumb_url = $(this).find('.thumb').css("background-image").replace(/^url\((.*?)\)$/, '$1');

    // console.log(
    //   'mediaid: '+mediaid,
    //   'artist: '+artist,
    //   'title: '+title,
    //   'dateposted: '+dateposted,
    //   'siteid: '+siteid,
    //   'sitename: '+sitename,
    //   'posturl: '+posturl,
    //   // 'postid'
    //   // 'loved_count: '+loved_count
    //   'posted_count: '+posted_count
    //   // 'thumb_url: '+thumb_url
    //   // 'thumb_url_large: '
    //   // 'thumb_url_artist: '
    //   // 'time: '
    //   // 'description: '
    //   // 'itunes_link: '
    // );

    tracks.push({ mediaid, artist, title, dateposted, siteid, sitename, posturl, posted_count});
  });

  console.log(tracks);
});

module.exports = { tracks };
