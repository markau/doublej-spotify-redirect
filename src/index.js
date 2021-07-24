
const errors = document.querySelector(".errors");
const loading = document.querySelector(".loading");

const songName = document.querySelector(".song-name");
const artistName = document.querySelector(".artist-name");
const artwork = document.querySelector(".artwork");
const spotifyLink = document.querySelector(".spotify-link");

const timeBuffer = 5;
const timeZoneOffsetMinutes = 30;
const minutesMinus = timeZoneOffsetMinutes + timeBuffer;
const minutesPlus = timeZoneOffsetMinutes - timeBuffer;

const dateObj = new Date();
const utcMinus = new Date(dateObj.getTime() - minutesMinus * 60000).toISOString();
const utcPlus = new Date(dateObj.getTime() - minutesPlus * 60000).toISOString();
// const utcMinus = new Date(dateObj.getTime() - 35 * 60000).toISOString();
// const utcPlus = new Date(dateObj.getTime() - 25 * 60000).toISOString();
const api = `https://music.abcradio.net.au/api/v1/plays/search.json?station=doublej&from=${utcMinus}&to=${utcPlus}&limit=4&order=desc`;


fetch(api)
  .then(response => response.json())
  .then(data => {
    const recentPlays = data?.items;
    loading.style.display = "none";

    const utcExact = new Date(dateObj.getTime() - timeZoneOffsetMinutes * 60000).toISOString();
    const song = recentPlays.find((song) => song.played_time <= utcExact);

    // const debug = {
    //   utcMinus,
    //   utcPlus,
    //   api,
    //   title: song?.recording?.title,
    //   playTime: song.played_time
    // };

    // songName.textContent = JSON.stringify(debug);

    if (song) {
      const songTitle = song?.recording?.title;
      const songArtist = song?.recording?.artists[0]?.name;
      const songArtwork = song?.release?.artwork[0]?.url;
      songName.textContent = songTitle;
      artistName.textContent = songArtist;
      spotifyLink.setAttribute('href', `https://play.spotify.com/search/results/artist:${songArtist} track:${songTitle}`);
      artwork.setAttribute('src', songArtwork);
    }

  })
  .catch(error => {
    errors.textContent = "There was an error loading recently played data. Try opening the extension again ...";
  });


