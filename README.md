# LIRI
*Coding Bootcamp Homework #9*

Language Interpretation and Recognition Interface; a command-line tool to access several entertainment APIs.
- Use BandsInTown to see upcoming shows by an artist
- Search Spotify for song data by title
- View information about movies via OMDb

## Concerts

Enter `concert-this` followed by the name of an artist to see a list of their upcoming shows around the world.

![Concerts example](https://github.com/bigreader/bootcamp-liri/raw/master/readme/example-concerts.png)

## Songs

Enter `spotify-this-song` followed by the name of a song to see full title, album and artist information, as well as a link to an audio preview of the song.

![Songs example](https://github.com/bigreader/bootcamp-liri/raw/master/readme/example-songs.png)

## Movies

Enter `movie-this` followed by the name of a movie to see detailed info, a list of starring actors and a short plot summary.

![Movies example](https://github.com/bigreader/bootcamp-liri/raw/master/readme/example-movies.png)

## Defaults

If no search terms are specified, each command will use a default search.

- `concert-this` will search for Maroon 5
- `spotify-this-song` will search for The Sign by Ace of Base
- `movie-this` will search for Mr. Nobody

![Defaults example](https://github.com/bigreader/bootcamp-liri/raw/master/readme/example-defaults.png)

## Command From File

Enter `do-what-it-says` to run and display results of a command specified in random.txt.

![Random example](https://github.com/bigreader/bootcamp-liri/raw/master/readme/example-random.png)

## Logging

Results of each command will be logged into log.txt.

```
> movie-this coraline
- Coraline (2009)
  IMDb: 7.7 - RT: 90%
  USA - English, Russian
  With Dakota Fanning, Teri Hatcher, Jennifer Saunders, Dawn French
  An adventurous 11-year-old girl finds another world that is a strangely idealized version of her frustrating home, but it has sinister secrets.

> concert-this weird al
- 07/16/2019  Filene Center at Wolf Trap in Vienna, United States
- 08/14/2019  McMenamins Edgefield in Troutdale, United States

> spotify-this-song come on eileen save ferris
- Come on Eileen
  It Means Everything
  Save Ferris
  Preview: https://p.scdn.co/mp3-preview/604b55dc99dc55ca3415bff50ec0b26fd6eabfb6?cid=09700c32d89e42f6804c34ff42a91672
```




