'use strict';

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    console.log(details.url);
    return { redirectUrl: details.url.replace('/search/', '/search/results/') }
  },
  {
    urls: [
      "*://open.spotify.com/*"
    ],
    types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
  },
  ["blocking"]
)