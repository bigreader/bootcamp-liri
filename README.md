# LIRI
*Coding Bootcamp Homework #9*

Language Interpretation and Recognition Interface; a command-line tool to access several entertainment APIs.
- Use BandsInTown to see upcoming shows by an artist
- Search Spotify for song data by title
- View information about movies via OMDb

## Concerts

Enter `concert-this` followed by the name of an artist to see a list of their upcoming shows around the world.

![```
→ node liri concert-this wintergatan
https://rest.bandsintown.com/artists/wintergatan/events?app_id=codingbootcamp
Loading...
No upcoming events.
→ node liri concert-this weird al
https://rest.bandsintown.com/artists/weird al/events?app_id=codingbootcamp
Loading...
07/16/2019  Filene Center at Wolf Trap in Vienna, United States
08/14/2019  McMenamins Edgefield in Troutdale, United States
→ node liri concert-this kacey musgraves
https://rest.bandsintown.com/artists/kacey musgraves/events?app_id=codingbootcamp
Loading...
04/12/2019  Coachella in Indio, United States
04/19/2019  Coachella in Indio, United States
05/10/2019  Oh, What a World: Tour in Brisbane, Australia
05/12/2019  Oh, What a World: Tour in Sydney, Australia
05/14/2019  Oh, What a World: Tour in Melbourne, Australia
05/17/2019  Oh, What a World: Tour in Auckland, New Zealand
```](https://github.com/bigreader/bootcamp-liri/raw/master/readme/example-concerts.png)

## Songs

Enter `spotify-this-song` followed by the name of a song to see full title, album and artist information, as well as a link to an audio preview of the song.

![```
→ node liri spotify-this-song rainbow
(Spotify Search)
Loading...
Rainbow
Golden Hour
Kacey Musgraves
→ node liri spotify-this-song come on eileen save ferris
(Spotify Search)
Loading...
Come on Eileen
It Means Everything
Save Ferris
Preview: https://p.scdn.co/mp3-preview/604b55dc99dc55ca3415bff50ec0b26fd6eabfb6?cid=09700c32d89e42f6804c34ff42a91672
```](https://github.com/bigreader/bootcamp-liri/raw/master/readme/example-songs.png)

## Movies

Enter `movie-this` followed by the name of a movie to see detailed info, a list of starring actors and a short plot summary.

![```
→ node liri movie-this coraline
http://www.omdbapi.com/?apikey=trilogy&t=coraline
Loading...
Coraline (2009)
IMDb: 7.7 - RT: 90%
USA - English, Russian
With Dakota Fanning, Teri Hatcher, Jennifer Saunders, Dawn French
An adventurous 11-year-old girl finds another world that is a strangely idealized version of her frustrating home, but it has sinister secrets.
→ node liri movie-this kubo and the two strings
http://www.omdbapi.com/?apikey=trilogy&t=kubo and the two strings
Loading...
Kubo and the Two Strings (2016)
IMDb: 7.8 - RT: 97%
USA - English
With Art Parkinson, Charlize Theron, Brenda Vaccaro, Cary-Hiroyuki Tagawa
A young boy named Kubo must locate a magical suit of armour worn by his late father in order to defeat a vengeful spirit from the past.
```](https://github.com/bigreader/bootcamp-liri/raw/master/readme/example-movies.png)

## Defaults

If no search terms are specified, each command will use a default search.

- `concert-this` will search for Maroon 5
- `spotify-this-song` will search for The Sign by Ace of Base
- `movie-this` will search for Mr. Nobody

![```
→ node liri concert-this
https://rest.bandsintown.com/artists/maroon5/events?app_id=codingbootcamp
Loading...
06/01/2019  Mollenpark in Aalborg, Denmark
06/03/2019  Lanxess Arena in Cologne, Germany
06/05/2019  O2 ARENA in Prague, Czech Republic
06/06/2019  Tauron Arena in Kraków, Poland
06/10/2019  Ziggo Dome in Amsterdam, Netherlands
06/11/2019  AccorHotels Arena in Paris, France
08/31/2019  Curacao North Sea Jazz Festival in Curacao, Netherlands Antilles
→ node liri spotify-this-song
(Spotify Search)
Loading...
The Sign
The Sign (US Album) [Remastered]
Ace of Base
Preview: https://p.scdn.co/mp3-preview/4c463359f67dd3546db7294d236dd0ae991882ff?cid=09700c32d89e42f6804c34ff42a91672
→ node liri movie-this
http://www.omdbapi.com/?apikey=trilogy&t=mr nobody
Loading...
Mr. Nobody (2009)
IMDb: 7.8 - RT: 67%
Belgium, Germany, Canada, France, USA, UK - English, Mohawk
With Jared Leto, Sarah Polley, Diane Kruger, Linh Dan Pham
A boy stands on a station platform as a train is about to leave. Should he go with his mother or stay with his father? Infinite possibilities arise from this decision. As long as he doesn't choose, anything is possible.
```](https://github.com/bigreader/bootcamp-liri/raw/master/readme/example-defaults.png)

## Command From File

Enter `do-what-it-says` to run and display results of a command specified in random.txt.

![```
→ cat random.txt
spotify-this-song,"I Want it That Way"
→ node liri do-what-it-says
(Spotify Search)
Loading...
I Want It That Way
The Hits--Chapter One
Backstreet Boys
Preview: https://p.scdn.co/mp3-preview/e72a05dc3f69c891e3390c3ceaa77fad02f6b5f6?cid=09700c32d89e42f6804c34ff42a91672
```](https://github.com/bigreader/bootcamp-liri/raw/master/readme/example-random.png)

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




