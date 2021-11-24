class Display{
    constructor(){}

    signInButton = `
        <div id="sign-in">
            <svg aria-hidden="true" class="" width="18" height="18" viewBox="0 0 18 18"><path d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 002.38-5.88c0-.57-.05-.66-.15-1.18Z" fill="#4285F4"></path><path d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 01-7.18-2.54H1.83v2.07A8 8 0 008.98 17Z" fill="#34A853"></path><path d="M4.5 10.52a4.8 4.8 0 010-3.04V5.41H1.83a8 8 0 000 7.18l2.67-2.07Z" fill="#FBBC05"></path><path d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 001.83 5.4L4.5 7.49a4.77 4.77 0 014.48-3.3Z" fill="#EA4335"></path></svg> Sign In or Register
        </div>
        <p>Register today to add and follow your favorite artists.</p>
        `;
    signOutButton = `<div id="sign-out">Sign Out</div>`;

    displayNews(news){
        const articles =  news.map((article)=>{
            return (`<div class="article">
                <div class="article-image">
                    <img src="${article.image ? article.image.thumbnail.contentUrl:"/assets/img/vinyl.png"}" alt="${article.name}" />
                </div>
                <div class="article-text">
                    <h3><a class="article-url" target="_blank" href="${article.url}">${article.name}</a></h3>
                </div>
            </div>`)
            
        }).join('');
        return `<div class="news">${articles}</div>`
    }

    displayUserData(user){
        return `
            <div class="usr-photo">
                <img src="${user.photoURL}" alt="">
            </div>
            <h2>Hi ${user.displayName.split(" ")[0]}</h2>`
    }

    displayConcerts(concerts){
        const concertList =  concerts.map((concert)=>{
            const concertDate = new Date(Date.parse(concert.start));
            return (`<div class="concert">
                <div class="concert-date">
                    <span class="date">${concertDate.getDate()}</span>
                    <span class="year">${concertDate.toLocaleString('en-us', { month: 'short' })} ${concertDate.getFullYear()}</span>
                </div>
                <div class="concert-text">
                    <h3><a class="concert-url" target="_blank" href="https://events.predicthq.com/events/${concert.id}">${concert.title}</a></h3>
                    ${concert.timezone}
                </div>
            </div>`)
            
        }).join('');
        return `<div class="concert-header">Concerts</div><div class="concerts">${concertList}</div>`
    }

    displayFavs(artists){
        const faves =  artists.map((artist)=>{
            return (`<li class="fav-artist">
                <button class="fav-artist-button" value="${artist}">
                    ${artist}
                </button>    
                <button class="delete-fav-button" value="${artist}">
                    x
                </button>  
            </li>`)
        }).join('');
        return `<div class="concert-header">Your Favorites</div><ul class="faves">${faves}</ul>`
    }

    displayCurrent(artist){
        return`     
        <button class="add-fav-button" value="${artist.name}">
            Add ${artist.name} to favorites
        </button>`
    }

    displayDeezer(artist){
        return `<iframe title="deezer-widget" src="https://widget.deezer.com/widget/auto/artist/${artist.id}/top_tracks" allow="encrypted-media; clipboard-write"></iframe>`;
    }

}

export default Display;