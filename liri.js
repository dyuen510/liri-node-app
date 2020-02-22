require('dotenv').config();

// vars
const fs = require('fs');
const request = require('request');
const keys = require('./keys.js');
const spot = require('node-spotify-api');
const spotify = new spot(keys.spotify);
// argv
const userChoice = process.argv[2];
const input = process.argv[3];

//concert-this
 const displayBands = (input) => {
    let queryURL = 'https://rest.bandsintown.com/artists/' + input + '/events?app_id=codingbootcamp';
    request(queryURL, function (err, response, b) {
        if (!err) {
            let bands = JSON.parse(b);
            for (let i = 0; i < 5; i++) {
                console.log('*****************************************************')
                console.log('Name of band: ' + input);
                console.log('Name of the venue: ' + bands[i].venue.name);
                console.log('Venue location: ' + bands[i].venue.city);
                console.log('Date of the Event:' + bands[i].datetime);
                console.log('*****************************************************')
            }
        } else {
            console.log(err)
        }
    })
}
//spotify-this-song
function displaySong(input) {
    if (input == undefined) {
        input = 'The Sign'; //when no song is provided. The Sign would be the default.
    }
    spotify.search(
        {
            type: 'track',
            query: input
        },
        function (err, data) {
            if (err) {
                console.log('Error: ' + err);
                return;
            }
            var songs = data.tracks.items;
            for (var i = 0; i < 1; i++) {
                console.log('*****************************************************')
                console.log('Artist(s): ' + songs[i].artists[0].name);
                console.log('Song name: ' + songs[i].name);
                console.log('Preview Song: ' + songs[i].preview_url);
                console.log('Album name: ' + songs[i].album.name);
                console.log('*****************************************************')
            }
        }
    )
}

// movie-this

function displayMovie(input) {
    if (input === undefined) {
        // * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
        // * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
        // * It's on Netflix!
        input = "Mr. Nobody";
        console.log('*****************************************************')
        console.log('If you haven\'t watched "Mr. Nobody," then you should:http://www.imdb.com/title/tt0485947/.');
        console.log('It\'s on Netflix!');
        console.log('*****************************************************')
    }
    
    var axios = require("axios");

    // Then run a request with axios to the OMDB API with the movie specified
    axios.get("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            var movies = response.data
            // console.log("The movie's rating is: " + response.data.imdbRating);
            console.log('*****************************************************')
            console.log('Title: ' + movies.Title);
            console.log('Release Year: ' + movies.Year);
            console.log('IMDB Rating: ' + movies.imdbRating);
            console.log('Rotten Tomatoes Rating: ' + movies.Ratings[1].Value);
            console.log('Country of Production: ' + movies.Country);
            console.log('Language of Movie: ' + movies.Language);
            console.log('Movie Plot: ' + movies.Plot);
            console.log('Actor(s): ' + movies.Actors);
            console.log('*****************************************************')

        }
    )};



function displaySomething(input) {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        var array = data.split(',');
        userInput(array[0], array[1]);
    })
}

const userInput = (userChoice, input) => {
    switch (userChoice) {
        // * `concert-this`
        case 'concert-this':
            displayBands(input);
            break;
        // * `spotify-this-song`
        case 'spotify-this-song':
            displaySong(input);
            break;
        // * `movie-this`
        case 'movie-this':
            displayMovie(input);
            break;
        // * `do-what-it-says`
        case 'do-what-it-says':
            displaySomething(input);
            break;
        default:
            console.log('Not a valid option. Liri Choices are concert-this, spotify-this-song, movie-this or do-what-it-says')
    }
}

userInput(userChoice, input);
