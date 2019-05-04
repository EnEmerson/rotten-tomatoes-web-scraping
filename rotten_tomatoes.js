//web scraping project for CIS 3360, rotten tomatoes opening week page.
//Baxter Irwin and En Emerson
(() => {
	
let numOfMovies = $('div.mb-movie')
let movieLinks = []
let myData
let arrResult = []

//shows how many movies are on the opening week page
//console.table(numOfMovies) 

//getting the urls from the movie panels
$.each(numOfMovies, function(movieNum){
	
	let curLink = $('div.mb-movie>div.movie_info')[movieNum].firstElementChild.href
    movieLinks.push(curLink)
	
})

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

//function to make finding and formatting data with jQuery slightly easier
function find(selector){
	
	let data = $(myData).find(selector).text().trim()
	data = data.replace(/(\r\n|\n|\r)/gm, '')
	return data
	
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
			Cast_Members : 'No cast members',
		//Critic Reviews Panel
			Reviews : 'No reviews'
	}

	//Main Panel
	
	movieData.Title = find('h1.mop-ratings-wrap__title--top')
	movieData.Concensus = find('p.mop-ratings-wrap__text.mop-ratings-wrap__text--concensus')
	movieData.Critic_Reviews = find('section.mop-ratings-wrap__row>div:nth-of-type(1)>div>small')
	movieData.Tomatometer = find('section.mop-ratings-wrap__row>div:nth-of-type(1)>h1>a>span.mop-ratings-wrap__percentage')
	movieData.User_Reviews = find('section.mop-ratings-wrap__row>div:nth-of-type(2)>div>small')
	movieData.Audience_Score = find('section.mop-ratings-wrap__row>div:nth-of-type(2)>h1>a>span.mop-ratings-wrap__percentage--audience')
	
	if(!movieData.Audience_Score){movieData.Audience_Score = 'No audience score'}
	
	//Movie Info Panel
	movieData.Synopsis = find('div#movieSynopsis')
		
	//Get number of movie details from movie info panel
	let numMovieDetails = $(myData).find('div.panel-body.content_body>ul.content-meta.info>li.meta-row.clearfix').length
	//console.log(numMovieDetails)
	
	//Loop through list elements in the ul of movie details and assign values
    for(let deet = 1; deet <= numMovieDetails; deet++){
		
		let movieDetail = find('ul.content-meta.info>li.meta-row.clearfix:nth-of-type('+deet+')>div.meta-label.subtle')
		let movieValue = find('ul.content-meta.info>li.meta-row.clearfix:nth-of-type('+deet+')>div.meta-value')
        
        //console.log(movieDetail, movieValue)
        
        switch(true){
            case movieDetail.includes('Rating'):
				movieData.Rating = movieValue
				break
			case movieDetail.includes('Genre'):
				movieData.Genre = movieValue
				break
			case movieDetail.includes('Direct'):
				movieData.Director = movieValue
				break
			case movieDetail.includes('Written'):
				movieData.Writer = movieValue
				break
			case movieDetail.includes('Theater'):
				movieData.Opening_Date = movieValue
				break
            case movieDetail.includes('Streaming'):
                movieData.Streaming_Date = movieValue
                break
            case movieDetail.includes('Runtime'):
                movieData.Runtime = movieValue
                break
            case movieDetail.includes('Studio'):
                movieData.Studio = movieValue
                break
        }
		
	}

	//Cast Panel
	let castMembers
	
	//get number of cast members to loop through
	let numOfCastMembers = $(myData).find('#movie-cast > div > div > div.cast-item.media.inlineBlock').length
	
	//showing that correct number of cast members are retrieved
	//console.log(numOfCastMembers)
	
	//begin cast member scraping
	for(mem = 1; mem <= numOfCastMembers; mem++){
		
		let curCastMember = find('div.cast-item.media.inlineBlock:nth-of-type('+mem+')>div.media-body>a>span')
		
		if(mem != numOfCastMembers){
			castMembers += curCastMember + ', '
		}
		else{
			castMembers += curCastMember
		}
		
	}
	if(castMembers.includes('undefined')){castMembers = castMembers.replace('undefined', '')}
	movieData.Cast_Members = castMembers
	
	//showing what cast members were added
	//console.table(castList)
	//console.log(castMembers)
	
	
	//adding everything to the display array which will be tabled at the end.
	arrResult.push(movieData)

}
console.table(arrResult)

	
})()




