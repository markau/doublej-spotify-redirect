
const errors = document.querySelector(".errors");
const loading = document.querySelector(".loading");

const songName = document.querySelector(".song-name");
const artistName = document.querySelector(".artist-name");
const artwork = document.querySelector(".artwork");
const spotifyLink = document.querySelector(".spotify-link");
const blockElement = document.querySelector(".block-element");

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

songName.classList.add('text-transition');
artistName.classList.add('text-transition');
artwork.classList.add('artwork-transition');
blockElement.classList.add('text-transition');

fetch(api)
  .then(response => response.json())
  .then(data => {
    const recentPlays = data?.items;
    // loading.style.display = "none";

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
      const songArtwork = song?.release?.artwork[0]?.url || "https://www.abc.net.au/assets/radio-2.53/images/icons/album.png";
      songName.textContent = songTitle;
      artistName.textContent = songArtist;
      spotifyLink.setAttribute('href', `https://play.spotify.com/search/results/artist:${songArtist} track:${songTitle}`);
      spotifyLink.textContent = "Spotify";
      // artwork.setAttribute('src', songArtwork).remove('artwork-transition');
      artwork.setAttribute('src', songArtwork);

      songName.classList.remove('text-transition');
      artistName.classList.remove('text-transition');
      blockElement.classList.remove('text-transition');
      artwork.classList.remove('artwork-transition');
      artwork.classList.remove('display-none');
    }

  })
  .catch(error => {
    errors.textContent = "There was an error loading recently played data. Try opening the extension again ...";
  });


