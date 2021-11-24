class News{
    
    constructor(){}

    getConcerts = async (artist, offset = 0) => {
        let url = ""
        if(artist !== ""){
            url = `https://api.predicthq.com/v1/events/?q=${artist}&limit=10&offset=${offset}&country=US&category=concerts`
        }else{
            url = `https://api.predicthq.com/v1/events/?limit=10&offset=${offset}&country=US&category=concerts`
        }
        
        const config = {
            method: 'get',
            url: url,
            headers: { 
              'Authorization': 'Bearer k7pby7KG5WY8eZMJ_lwAfanJ0-faK_QNJzr51-ZA'
            }
          };
          
        try{ 
            const response = await axios(config);
            return response.data;
        }catch{(error) => {
            console.log(error);
        }}

    }

}

export default News;
