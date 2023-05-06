
async function getTracks(accessToken, trackURI) {
  const response = await fetch("https://api.spotify.com/v1/audio-features?ids=" + trackURI , {
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  })
  return await response.json();
}


async function getAlbum(accessToken, albumId) {
    const response = await fetch("https://api.spotify.com/v1/albums/" + albumId , {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    })
    return await response.json();
}


async function getSearchTrack(accessToken, artistName, offset) {
  const response = await fetch('https://api.spotify.com/v1/search?q=' + artistName + '&type=track&limit=50&offset=' + offset, {
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  })
  return await response.json();
}

async function getSearch(accessToken, artistName) {
    const response = await fetch('https://api.spotify.com/v1/search?q=' + artistName +'&type=album', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    })
    return await response.json();
}


async function display_AlbumArtistImg(){
  if( document.getElementById("tmp-img") != null ){
      while (document.getElementById("tmp-img") != null){
          document.getElementById("tmp-img").remove();
      }
  }
  const artistName = document.getElementById("artistName").value;
  let accessToken = localStorage.getItem('access_token');
  let search = await getSearch(accessToken, artistName);
  const albums = search.albums.items;
  let href_list = []; 
  for (i=0; i< albums.length; i++){
      let href = albums[i].href;
      href = href.match(/\/([^\/]+)\/?$/)[1];
      href_list.push(href);

  }
  let number = Math.floor(Math.random() * albums.length - 1);
  if (number < 0) {
    number = number * -1;
  }

  for (i=0; i<albums.length; i++){
      let album = await getAlbum(accessToken, href_list[i]);

      if (i === number) {
        setRandomTrackI62(album)
      }

      let img = document.createElement('img');
      img.style.marginLeft = "5px";
      img.id = "tmp-img";
      img.src = album.images[1].url;
      document.body.appendChild(img);
  }
  let trackURI = localStorage.getItem("play-song");
  playSong(trackURI);
}


async function display_SongByArtist(){
  let artistName = document.getElementById("artistName").value;
  artistName = artistName.replace(/[ \t]+$/, "");
  let accessToken = localStorage.getItem('access_token');
  let tracks = await getSearchTrack(accessToken, artistName, 0);
  let offset = 0;
  let songName = document.getElementById("songName").value;
  songName = songName.replace(/[ \t]+$/, "");
  let details = tracks;
  let cond = false;
  while (!cond){
    details.tracks.items.forEach(element => {
      let songReplConf = element.name.toLowerCase().replace(/\([^)]*\)/, '');
      songReplConf = songReplConf.replace(/[ \t]+$/, "");
      
      if(songReplConf === songName.toLowerCase()){
        element.artists.forEach((element) => {
          if (element.name.toLowerCase() === artistName.toLowerCase()){
            cond = true;
          }
        });
        if (cond){
          playSong(element.id);
        }
      }
    });
    offset = offset + 50;
    details = await getSearchTrack(accessToken, artistName, offset);
  }
}

function setRandomTrackI62(album){
  ndRound = Math.floor(Math.random() * album.tracks.items.length - 1);
  if (ndRound < 0) {
    ndRound = ndRound * -1;
  }
  if (album.tracks.items.length === 1) {
    ndRound = 0;
  }
  let uri = album.tracks.items[ndRound].uri;
  uri = uri.match(/\:([^\:]+)\:?$/)[1];
  localStorage.setItem("play-song", uri);
}

function render_search(){
  window.location = "http://127.0.0.1:8888/search";
}


function playSong(trackURI62){
  let iframe = document.createElement("iframe");
  iframe.id="embed-iframe"; 
  iframe.style="border-radius:12px";
  iframe.src="https://open.spotify.com/embed/track/"+ trackURI62 +"?utm_source=generator";
  iframe.width="98%"; 
  iframe.height="352"; 
  iframe.frameBorder="0"; 
  iframe.allowfullscreen=""; 
  iframe.allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"; 
  iframe.style.margin = "auto";
  iframe.style.marginBottom = "20px";
  loading="lazy";
  if(document.getElementById("embed-iframe") === null){
    console.log("test");
    document.getElementById("profile").appendChild(iframe);
  }else{
    let first_after = document.getElementById("embed-iframe");
    first_after.parentNode.insertBefore(iframe, first_after);
  }
  
}