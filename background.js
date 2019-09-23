'use strict';

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    console.log(details.url);
    return { redirectUrl: details.url.replace('play.spotify.com/search/results/', 'open.spotify.com/search/') }
  },
  {
    urls: [
      "*://play.spotify.com/*"
    ],
    types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
  },
  ["blocking"]
)