import News from './src/news.js'
import Display from './src/display.js'
import Concerts from './src/concerts.js'
import Deezer from './src/deezer.js';
import Firebase from './src/firebase.js';

const news = new News, display = new Display, concerts = new Concerts, deezer = new Deezer, firebase = new Firebase;
let myChart, favs;

deezer.getTopArtists();

//search for news, concerts etc. and display in correct boxes
const setNews = (offset = 0, e = null) =>{
    let searchString = "";
    if(e !== null){
        e.preventDefault();
        searchString = document.querySelector('#artist-search').value;
        showArtistMusic(searchString);
        handleStateChange();
    }
    showNews(searchString, offset);
    showConcerts(searchString, offset);
}

//show default or artist playlist based on scenareo
const showArtistMusic = async (searchString) => {
    const artist = await deezer.searchArtist(searchString);
    if(firebase.favs && firebase.favs.indexOf(artist.name) < 0){
        document.querySelector('#current-artist').innerHTML = display.displayCurrent(artist);
    }
    document.querySelector('.music-player').innerHTML = display.displayDeezer(artist)
}

//helper function that actually gets and formats news
const showNews = async (searchString, offset) => {
    const generalNews = await news.getMusicNews(searchString === "" ? "music news":searchString, offset);
    showChart(searchString);
    document.querySelector('.music-news').innerHTML = display.displayNews(generalNews.value);
}

//helper function that actually gets and formats concerts
const showConcerts = async (searchString, offset) => {
    const concertList = await concerts.getConcerts(searchString, offset);
    document.querySelector('.music-events').innerHTML = display.displayConcerts(concertList.results)
}

//display artist popularity chart
const showChart = async(artist = "") => {
    const artistsToDisplay = [...deezer.topArtists], labels = [], followerCounts = [], colors = [];
    if(artist !== ""){
        const newArtist = await deezer.searchArtist(artist);
        artistsToDisplay.push(newArtist)
    }
    for (let index = 0; index < artistsToDisplay.length; index++) {
        if(artistsToDisplay[index] !== undefined){
            labels.push(artistsToDisplay[index].name)
            followerCounts.push(artistsToDisplay[index].nb_fan)
            colors.push(index !== artistsToDisplay.length-1 ? 'rgb(201, 203, 207)':'rgb(54, 162, 235)');
        }
    }
    const data = {
        labels: labels,
        datasets: [{
          label: 'Artist Follower Counts',
          data: followerCounts,
          backgroundColor: colors
        }]
      };

    const config = {
        type: 'polarArea',
        data: data,
        options: {
            events: ['mousemove'],
            plugins: {
                legend: {
                    display: false
                }
            }
        }
      };
      if(myChart){
        myChart.destroy();
      }
      myChart = new Chart(document.getElementById('myChart'), config);
}

//start up firebase
const initUser = async () => {
    await firebase.initializeFirebase()
    handleStateChange();
}

//checks if user is logged in or not and refreshes ui based on that
const handleStateChange = async (request) => {
    if(request === 'sign-out'){
        await firebase.signUserOut();
    }else if(request === 'sign-in'){
        const result = await firebase.signIn();
    }
    if(firebase.user !== null){
        document.querySelector('#firebaseui-auth-container').innerHTML = display.signOutButton;
        document.querySelector('#usr-data').innerHTML = display.displayUserData(firebase.user);
        //favs = await firebase.getUserData();
        if(firebase.favs){
            document.querySelector('#fav-artists').innerHTML = display.displayFavs(firebase.favs);
        }
    }else{
        document.querySelector('#firebaseui-auth-container').innerHTML = display.signInButton;
        document.querySelector('#fav-artists').innerHTML = "";
        document.querySelector('#usr-data').innerHTML = "";
    }
}

//event listeners
document.addEventListener('DOMContentLoaded', () => {

    //initial calls for page load
    setNews(0);
    initUser();

    document.querySelector('#search-form').addEventListener('submit', (e) => setNews(0, e));

    document.querySelector('body').addEventListener('click', (e) => {
        if(e.target.id === 'sign-out' || e.target.id === 'sign-in'){
            handleStateChange(e.target.id);
        }else if(e.target.className==='fav-artist-button'){
            showArtistMusic(e.target.value);
            showNews(e.target.value, 0);
            showConcerts(e.target.value, 0);
            showChart(e.target.value);    
        }else if(e.target.className==='delete-fav-button'){
            firebase.removeFave(e.target.value);
            handleStateChange()
        }else if(e.target.className==='add-fav-button'){
            firebase.addFave(e.target.value);
            document.querySelector('#current-artist').innerHTML = "";
            handleStateChange()
        }
    })
})