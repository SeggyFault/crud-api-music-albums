const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());

// function that is generating unique ids
const { v4: uuidv4 } = require('uuid');


let albumsData = [
  {
    "albumId": "10",
    "artistName": "Beyoncé",
    "collectionName": "Lemonade",
    "artworkUrl100": "http://is1.mzstatic.com/image/thumb/Music20/v4/23/c1/9e/23c19e53-783f-ae47-7212-03cc9998bd84/source/100x100bb.jpg",
    "releaseDate": "2016-04-25T07:00:00Z",
    "primaryGenreName": "Pop",
    "url": "https://www.youtube.com/embed/PeonBmeFR8o?rel=0&amp;controls=0&amp;showinfo=0"
  },
  {
    "albumId": "11",
    "artistName": "Beyoncé",
    "collectionName": "Dangerously In Love",
    "artworkUrl100": "http://is1.mzstatic.com/image/thumb/Music/v4/18/93/6d/18936d85-8f6b-7597-87ef-62c4c5211298/source/100x100bb.jpg",
    "releaseDate": "2003-06-24T07:00:00Z",
    "primaryGenreName": "Pop",
    "url": "https://www.youtube.com/embed/ViwtNLUqkMY?rel=0&amp;controls=0&amp;showinfo=0"
  }
]

// Homepage:
app.get('/', (req, res) => {
  res.send('Here you can find a list of Beyonce albums');
})

// GET all albums:
app.get('/albums', (req, res) => {
  res.status(200).send(albumsData);
})

// GET a specific album based on id (!!!!! .find, not .filter - it returns an array in any case  !!!!)
app.get('/albums/:albumId', (req, res) => {
  const albumId = req.params.albumId;
  const selectedAlbum = albumsData.find(album => album["albumId"] === albumId);
  if(!selectedAlbum) {
    res.status(404).send("Album not found");
  }
  res.send(selectedAlbum);
})

// POST a new album:
app.post('/albums', (req, res) => {
   const { artistName, collectionName, artworkUrl100, releaseDate, primaryGenreName, url } = req.body;
   
   if ( artistName && collectionName && artworkUrl100 && releaseDate && primaryGenreName && url) {
    let newAlbum = {albumId: uuidv4(), artistName, collectionName, artworkUrl100, releaseDate, primaryGenreName, url};
    albumsData.push(newAlbum);
    return res.status(201).send("Album successfully created!")
   } 
    return res.status(409).send("Album already exists!");
})

// DELETE an album:
app.delete('/albums/:albumId', (req, res) => {
  const albumId = req.params.albumId;
  const selectedAlbumIndex = albumsData.findIndex(album => album["albumId"] === albumId);
  if(selectedAlbumIndex !== -1) {
    albumsData.splice(selectedAlbumIndex, 1);
    return res.status(204).send
  }
    return res.status(404).send("Album not found");
})



// Listen to PORT:
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})