//class that provides artist id and artist info based on api call

class Deezer{
    
    constructor(){}

    options = {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
          'x-rapidapi-key': 'iWZLmUjilamshMIZ2BzSutl9KfyTp1GodFRjsn6q6oXIlZRVHD'
        }
    };

    topArtists = [];

    //user search string to get artist id, then get artist object and return it
    searchArtist = async (artist) => {
        this.options.params = {q: artist};
        this.options.url = 'https://deezerdevs-deezer.p.rapidapi.com/search';
        let response = await axios.request(this.options);

        this.options.params = {};
        this.options.url = `https://deezerdevs-deezer.p.rapidapi.com/artist/${response.data.data[0].artist.id}`;
        response = await axios.request(this.options);
        
        return response.data;
    }

    //middleware to handle async
    searchTopArtist = async (artist) => {
        const response = await this.searchArtist(artist);
        this.topArtists.push(response);
    }
    

    getTopArtists = async () => {
        // Removed Billboard API due to usage limitation and switched to static array of artists
        // var billboardOptions = {
        //     method: 'GET',
        //     url: 'https://billboard2.p.rapidapi.com/artist_100',
        //     params: {date: datestring},
        //     headers: {
        //       'x-rapidapi-host': 'billboard-api2.p.rapidapi.com',
        //       'x-rapidapi-key': 'iWZLmUjilamshMIZ2BzSutl9KfyTp1GodFRjsn6q6oXIlZRVHD'
        //     }
        //   };
        // const response = await axios.request(billboardOptions);
        //Object.values(response.data.content).forEach(artist => {
        //     this.searchTopArtist(artist);
        // })
        
        //   }).catch(function (error) {
        //       console.error(error);
        //   });
        // this.options.params = {};
        // this.options.url = 'https://deezerdevs-deezer.p.rapidapi.com/chart/0/artists';
        // const response = await axios.request(this.options);
        // console.log(response);

        ["Selena Gomez", "Doja Cat", "BTS", "Post Malone", "Queen"].forEach(artist => {
            this.searchTopArtist(artist);
        })
    }

    

}

export default Deezer;