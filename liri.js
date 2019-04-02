require("dotenv").config();
var fs      = require('fs'); //builtin
var spotify = require('node-spotify-api');
var axios   = require('axios');
var moment  = require('moment');
var chalk   = require('chalk');
var keys    = require("./keys.js");

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
		if (events.length === 0) {
			log('empty', 'Band not found.');
			return;
		}

		events.forEach(event => {
			var venue = event.venue.name + ' in ' + event.venue.city + ', ' + event.venue.country;
			var date = moment(event.datetime, 'YYYY-MM-DD[T]hh:mm:ss');
			log('result', date.format('MM/DD/YYYY') + ' - ' + venue);
		})


	}).catch(err => log('error', err));
}

function showSong(query) {
	log('result', 'Song: ' + query);
}

function showMovie(query) {
	log('result', 'Movie: ' + query);
}



function readPreset() {
	fs.readFile('./random.txt', 'utf8', (err, data) => {
		// get arg string, split on comma, remove unneeded quotes
		var args = data.split(',').map(x => x.replace('"', ''));

		if (args[0] === 'do-what-it-says') {
			console.err('Infinite loop detected! Try a different command in random.txt.');
			return;
		}

		runCommand(args[0], args[1]);
	});
}



function log(type, text) {
	switch (type) {
		case 'start':
		writeLog('');
		break;

		case 'command':
		writeLog('> ' + text);
		break;

		case 'request':
		console.log(chalk.cyan.underline(text));
		console.log(chalk.gray('Loading...'));
		break;

		case 'empty':
		console.log(chalk.italic(text));
		writeLog(text);
		break;

		case 'result':
		console.log(chalk.bold(text));
		writeLog(text);
		break;

		case 'error':
		console.error(chalk.red(text));
		writeLog('Error!\n' + text);
		break;

		case 'data':
		console.log('DATA:');
		console.log(text);
		console.log('END');
		break;

		default:
		console.log(text || type);
		break;
	}
}

function writeLog(text) {
	fs.appendFile('./log.txt', text + '\n', err => { if (err) throw err });
}