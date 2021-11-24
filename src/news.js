class News{
    
    constructor(){}

    options = {
        method: 'GET',
        url: 'https://bing-news-search1.p.rapidapi.com/news/search',
        params: {
            count: '10',
            freshness: 'Day',
            textFormat: 'Raw',
            safeSearch: 'Moderate'
        },
        headers: {
          'accept-language': 'en',
          'x-bingapis-sdk': 'true',
          'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
          'x-rapidapi-key': 'iWZLmUjilamshMIZ2BzSutl9KfyTp1GodFRjsn6q6oXIlZRVHD'
        }
    };

    getMusicNews = async (artist, offset) => {
        this.options.params.q = artist;
        this.options.params.offset = offset;
        const response = await axios.request(this.options);
        return response.data;
    }

}

export default News;