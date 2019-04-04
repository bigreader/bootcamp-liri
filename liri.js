require("dotenv").config();
var fs      = require('fs'); //builtin
var axios   = require('axios');
var chalk   = require('chalk');
var moment  = require('moment');
var Spotify = require('node-spotify-api');
var keys    = require("./keys.js");

var spotify = new Spotify({
	id: keys.spotify.id,
	secret: keys.spotify.secret
});
var logQueue = [];

log('start');

// parse arguments
var userCommand = process.argv[2];
var userQuery = process.argv.splice(3).join(' ');
runCommand(userCommand, userQuery);

function runCommand(command, query) {
	log('command', command + ' ' + query);

	switch (command) {
		case 'concert-this':
		showBand(query);
		break;

		case 'spotify-this-song':
		showSong(query);
		break;

		case 'movie-this':
		showMovie(query);
		break;

		case 'do-what-it-says':
		readPreset();
		break;

		default:
		log('error', 'Unrecognized command!');
		break;
	}
}



function showBand(query) {
	var url = 'https://rest.bandsintown.com/artists/' + query + '/events?app_id=codingbootcamp'
	log('request', url);

	axios.get(url).then(resp => {
		var events = resp.data;

		// if the band isn't found, response data is a string with an unhelpful and hard to parse error
		// so let's just check if we get an array or a string
		if (!Array.isArray(events)) return log('empty', 'Band not found.');
		if (events.length === 0) return log('empty', 'No upcoming events.');

		events.forEach(event => {
			var venue = event.venue.name + ' in ' + event.venue.city + ', ' + event.venue.country;
			var date = moment(event.datetime, 'YYYY-MM-DD[T]hh:mm:ss');
			log('result', date.format('MM/DD/YYYY') + '  ' + venue);
		});

	}).catch(err => log('error', err));
}

function showSong(query) {
	log('request', '(Spotify Search)'); // url is handled for us by node-spotify-api

	spotify.search({ type: 'track', query: query }, function(err, resp) {
	  if (err) return log('error', err);

	  var results = resp.tracks.items; // array of search results
	  if (results.length === 0) return log('empty', 'Song not found.');
	  
	  var song = results[0];
	  log('result', song.name);
	  log('more', song.album.name);
	  log('more', song.artists.map(a => a.name).join(', ')); // .artists is an array of objects

		if (song.preview_url) {
		  log('more', 'Preview: ' + song.preview_url);
		}

	});
}

function showMovie(query) {
	var url = 'http://www.omdbapi.com/?apikey=' + keys.omdb + '&t=' + query
	log('request', url);

	axios.get(url).then(resp => {
		var movie = resp.data;

		if (movie.Response !== 'True') return log('empty', 'Movie not found.');

		log('result', movie.Title + ' (' + movie.Year + ')');

		var ratingRT = movie.Ratings.find(rating => {
			return (rating.Source === 'Rotten Tomatoes');
		});
		if (ratingRT) {
			log('more', 'IMDb: ' + movie.imdbRating + ' - RT: ' + ratingRT.Value);
		} else {
			log('more', 'IMDb: ' + movie.imdbRating);
		}

		log('more', movie.Country + ' - ' + movie.Language);
		log('more', 'With ' + movie.Actors);
		log('more', movie.Plot);

	}).catch(err => log('error', err));
}



function readPreset() {
	fs.readFile('./random.txt', 'utf8', (err, data) => {
		// get arg string, split on comma, remove unneeded quotes
		var args = data.split(',').map(x => x.replace(/"/g, ''));

		if (args[0] === 'do-what-it-says') {
			log('error', 'Infinite loop detected! Try a different command in random.txt.');
			return;
		}

		runCommand(args[0], args[1]);
	});
}



function log(type, text) {
	switch (type) {

		case 'start': // write a blank line for padding
		logQueue.push('');
		break;

		case 'command': // write the command we're running
		logQueue.push('> ' + text);
		break;

		case 'request': // print a request url while we wait
		console.log(chalk.cyan.underline(text));
		console.log(chalk.gray('Loading...'));
		break;

		case 'empty': // log no results or not found
		console.log(chalk.italic(text));
		logQueue.push('~ ' + text);
		break;

		case 'result': // log the first line of a result
		console.log(chalk.bold(text));
		logQueue.push('- ' + text);
		break;

		case 'more': // log more lines of a result
		console.log(text);
		logQueue.push('  ' + text);
		break;

		case 'error': // log an error and exit with failure
		console.error(chalk.red(text));
		logQueue.push('Error!\n' + text);
		process.exitCode = 1;
		break;

		case 'data': // print data for debugging
		console.log('DATA:');
		console.log(text);
		console.log('END');
		break;

		default: // just print it
		console.log(text || type);
		break;
	}
}

function commitLog() {
	// log a blank line for padding
	console.log();
	logQueue.push(''); 
	
	try {
		// no async allowed from process.on('exit')
		fs.appendFileSync('./log.txt', logQueue.join('\n'));
	} catch (err) {
		console.log(err); // don't custom log an error with the custom logger plz
	}

	logQueue = []; // just to be safe i guess
}

// before we leave, write our log messages to the file
process.on('exit', commitLog);
