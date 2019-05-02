//web scraping project for CIS 3360, rotten tomatoes opening week page.
//Baxter Irwin and En Emerson
(() => {
	let numOfMovies = $('div.mb-movie').length
let movieLinks = []
let myData
let lineResult = []
let arrResult = []

//shows how many movies are on the opening week page
//console.log(numOfMovies.toString()) 

//getting the urls from the movie panels
for(let i = 0; i < numOfMovies; i++){

    let curLink = $('div.mb-movie>div.movie_info')[i].firstElementChild.href
    movieLinks.push(curLink)
	
}

//showing what links were added.
//console.table(movieLinks)

//add the ajax function to get the url
function getURL(url){

    return $.ajax({
        type: 'GET',
        url: url,
        cache: false,
        async: false
    }).responseText
}

//function to make finding and fomratting data with jQuery slightly easier
function find(selector){
	
	return $(myData).find(selector).text().trim();
	
}

//selecting information to get from each individual movie page
//replace '5' with 'numOfMovies' when we finish the list of items to retrieve
for(let i = 0; i < 5; i++){
	
	myData = getURL(movieLinks[i])
	
	let movieData = {
		//Main Panel
			Title : 'No title',
			Concensus : 'No concensus',
			Tomatometer : 'No tomato score',
			Critic_Reviews : 'No critic reviews',
			Audience_Score : 'No audience score',
			User_Reviews : 'No user reviews',
		//Movie Info Panel
			Synopsis : 'No synopsis',
			Rating : 'No rating',
			Genre : 'No genre',
			Director : 'No director',
			Writer : 'No writer',
			Opening_Date : 'No opening date',
			Streaming_Date : 'No streaming date',
			Runtime : 'No runtime',
			Studio : 'No studio',
		//Cast Members Panel
			Cast_Members : [],
		//News Panel
			News_Articles : [],
		//Critic Reviews Panel
			Reviews : []
	}
	
	//Get number of movie details from movie info panel
	let numMovieDetails = $(myData).find('div.panel-body.content_body>ul.content-meta.info>li.meta-row.clearfix').length
	
	//testing if the correct number of details is retrieved
	//console.log(movieDetails)

	//Main Panel
	let title, concensus, numOfCritics, userRatings, tomatoScore, audienceScore
	
	title = find('h1.mop-ratings-wrap__title--top')
	concensus = $(myData).find('p.mop-ratings-wrap__text.mop-ratings-wrap__text--concensus').text().trim()
	numOfCritics = $(myData).find('section.mop-ratings-wrap__row>div:nth-of-type(1)>div>small').text().trim()
	userRatings = $(myData).find('section.mop-ratings-wrap__row>div:nth-of-type(2)>div>small').text().trim()
	
	tomatoScore = $(myData).find('section.mop-ratings-wrap__row>div:nth-of-type(1)>h1>a>span.mop-ratings-wrap__percentage').text().trim()
	if(tomatoScore === ''){
		tomatoScore = 'No tomato score yet.'
	}
	
	audienceScore = $(myData).find('section.mop-ratings-wrap__row>div:nth-of-type(2)>h1>a>span.mop-ratings-wrap__percentage').text().trim()
	audienceScore = audienceScore.replace(/(\r\n|\n|\r)/gm, '')
	audienceScore = audienceScore.replace('liked it', '').trim()
	if(audienceScore === ''){
		audienceScore = 'No audience score yet.'
	}
	
	//Movie Info Panel
	let synopsis = $(myData).find('div#movieSynopsis').text().trim()
	
    let rating = '', genre = '', director = '', writer = '', inTheaters = '', streamDate = '', runTime = '', studio = ''
    
	//Loop through list elements in the ul of movie details and assign values
    for(let j = 1; j <= numMovieDetails; j++){
		
        let movieDetail = $(myData).find('ul.content-meta.info>li.meta-row.clearfix:nth-of-type('+j+')>div.meta-label.subtle').text().trim()
		let movieValue = $(myData).find('ul.content-meta.info>li.meta-row.clearfix:nth-of-type('+j+')>div.meta-value').text().trim()
		movieDetail = movieDetail.replace(/(\r\n|\n|\r)/gm, '')
		movieValue = movieValue.replace(/(\r\n|\n|\r)/gm, '')
		movieDetail = movieDetail.trim()
		movieValue = movieValue.trim()
        
        //console.log(movieDetail, movieValue)
        
        switch(true){
            case movieDetail.includes('Rating'):
				rating = movieValue
				break
			case movieDetail.includes('Genre'):
				genre = movieValue
				break
			case movieDetail.includes('Direct'):
				director = movieValue
				break
			case movieDetail.includes('Written'):
				writer = movieValue
				break
			case movieDetail.includes('Theater'):
				inTheaters = movieValue
				break
            case movieDetail.includes('Streaming'):
                streamDate = movieValue
                break
            case movieDetail.includes('Runtime'):
                runTime = movieValue
                break
            case movieDetail.includes('Studio'):
                studio = movieValue
                break
        }
		
		if(!rating){rating = 'No rating yet.'}
		if(!genre){genre = 'No genre assigned.'}
		if(!director){director = 'No director found.'}
		if(!writer){writer = 'No writer found.'}
		if(!inTheaters){inTheaters = 'No release date found.'}
		if(!streamDate){streamDate = 'No streaming date found.'}
		if(!runTime){runTime = 'No runtime found.'}
		if(!studio){studio = 'No production studio found.'}
        
    
	}
	
	//Cast Panel
	let castMembers = ''
	let castList = []
	
	//get number of cast members to loop through
	let numOfCastMembers = $(myData).find('#movie-cast > div > div > div.cast-item.media.inlineBlock').length
	
	//showing that correct number of cast members are retrieved
	//console.log(numOfCastMembers)
	
	//begin cast member scraping
	for(let k = 1; k <= numOfCastMembers; k++){
		
		let curCastMember = $(myData).find('div.cast-item.media.inlineBlock:nth-of-type('+k+')>div.media-body>a>span').text().trim()
		
		if(k != numOfCastMembers){
			castMembers += curCastMember + ', '
		}
		else{
			castMembers += curCastMember
		}
		castList.push(curCastMember)
		
	}
	
	//showing what cast members were added
	//console.table(castList)
	//console.log(castMembers)
	
	
	//adding everything to the lineResult which will be tabled at the end.
	lineResult = [ /*
	//Main Panel
		title + '*', concensus+ '*', tomatoScore + '*', numOfCritics + '*', audienceScore + '*', userRatings + '*',
	//Movie Info Panel
		synopsis + '*', rating + '*', genre + '*', director + '*', writer + '*', inTheaters + '*', streamDate + '*', runTime + '*', studio + '*',
	*///Cast Panel
		castMembers + '*',
	
		'^'
	]
	arrResult.push(lineResult)

}
console.table(arrResult)

	
})()




