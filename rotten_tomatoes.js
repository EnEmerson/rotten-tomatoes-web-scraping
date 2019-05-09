//web scraping project for CIS 3360, rotten tomatoes opening week page.
//Baxter Irwin and En Emerson
(() => {
	
let numOfMovies = $('div.mb-movie')
let movieLinks = []
let myData
let arrResult = []
let baseLink = 'https://www.rottentomatoes.com'

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
function find(linkData, selector){
	
	let data = $(linkData).find(selector).text().trim()
	data = data.replace(/(\r\n|\n|\r)/gm, '')
	return data + '*'
	
}


let totalMovies = movieLinks.length
//selecting information to get from each individual movie page
//replace '5' with 'totalMovies' when we finish the list of items to retrieve
for(let i = 0; i < 1; i++){
	
	myData = getURL(movieLinks[i])
	
	let movieData = {
			Asterisk:'*',
		//Main Panel
			Title : 'No title*',
			Concensus : 'No concensus*',
			Tomatometer : 'No tomato score*',
			Critic_Reviews : 'No critic reviews*',
			Audience_Score : 'No audience score*',
			User_Reviews : 'No user reviews*',
		//Movie Info Panel
			Synopsis : 'No synopsis*',
			Rating : 'No rating*',
			Genre : 'No genre*',
			Director : 'No director*',
			Writer : 'No writer*',
			Opening_Date : 'No opening date*',
			Streaming_Date : 'No streaming date*',
			Runtime : 'No runtime*',
			Studio : 'No studio*',
		//Cast Members Panel
			Cast_Members : 'No cast members*',
		//Critic Reviews Panel
			Reviews : 'No reviews*',
			Delimiter: '^'
	}

	//Main Panel
	
	movieData.Title = find(myData, 'h1.mop-ratings-wrap__title--top')
	movieData.Concensus = find(myData, 'p.mop-ratings-wrap__text.mop-ratings-wrap__text--concensus')
	movieData.Critic_Reviews = find(myData, 'section.mop-ratings-wrap__row>div:nth-of-type(1)>div>small')
	movieData.Tomatometer = find(myData, 'section.mop-ratings-wrap__row>div:nth-of-type(1)>h1>a>span.mop-ratings-wrap__percentage')
	movieData.User_Reviews = find(myData, 'section.mop-ratings-wrap__row>div:nth-of-type(2)>div>small')
	movieData.Audience_Score = find(myData, 'section.mop-ratings-wrap__row>div:nth-of-type(2)>h1>a>span.mop-ratings-wrap__percentage--audience')
	
	if(movieData.Audience_Score == '*'){movieData.Audience_Score = 'No audience score*'}
	if(movieData.Tomatometer == '*'){movieData.Tomatometer = 'No tomato score*'}
	
	//Movie Info Panel
	movieData.Synopsis = find(myData, 'div#movieSynopsis')
		
	//Get number of movie details from movie info panel
	let numMovieDetails = $(myData).find('div.panel-body.content_body>ul.content-meta.info>li.meta-row.clearfix').length
	//console.log(numMovieDetails)
	
	//Loop through list elements in the ul of movie details and assign values
    for(let deet = 1; deet <= numMovieDetails; deet++){
		
		let movieDetail = find(myData, 'ul.content-meta.info>li.meta-row.clearfix:nth-of-type('+deet+')>div.meta-label.subtle')
		let movieValue = find(myData, 'ul.content-meta.info>li.meta-row.clearfix:nth-of-type('+deet+')>div.meta-value')
        
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
	if(numOfCastMembers >= 1){
		
		for(mem = 1; mem <= numOfCastMembers; mem++){
			
			let curCastMember = $(myData).find('section#movie-cast>div.panel-body.content_body>div.castSection>div.cast-item.media.inlineBlock:nth-of-type('+mem+')>div.media-body>a>span').text().trim()
			curCastMember = curCastMember.replace(/(\r\n|\n|\r)/gm, '')
			
			if(mem != numOfCastMembers){
				castMembers += curCastMember + ', '
			}
			else{
				castMembers += curCastMember + '*'
			}
			if(castMembers.includes('undefined')){castMembers = castMembers.replace('undefined', '')}
		}
		movieData.Cast_Members = castMembers
	}
	//showing what cast members were added
	//console.table(castList)
	//console.log(castMembers)
	
	//Critic Reviews Section
	let reviewData
    let reviews = []
	let review = {
		Asterisk: '*',
		Excerpt: 'No excerpt found*',
		Critic_Name: 'No critic name found*',
		Review_Date: 'No review date found*',
		Sponsor: 'No sponsor found*',
		Delimiter: '^'
	}
	
    let relativeLink = $(myData).find('div.view-all>a').attr('href')
	let absoluteLink = baseLink + relativeLink
    reviewData = getURL(absoluteLink)
	console.log(absoluteLink)
	
	let reviewsPerPage = $(reviewData).find('div.row.review_table_row').length
	console.log(reviewsPerPage)
	
	for(let curReview = 1; curReview <= reviewsPerPage; curReview++){
		
		review.Excerpt = find(reviewData, 'div.review_table>div:nth-child('+curReview+')>div>div>div.review_desc>div.the_review')
		review.Critic_Name = find(reviewData, 'div.review_table>div:nth-child('+curReview+')>div.col-xs-8>div.col-sm-13.col-xs-24.col-sm-pull-4.critic_name>a.unstyled.bold.articleLink')
		review.Review_Date = find(reviewData, 'div.review_table>div:nth-child('+curReview+')>div>div>div.review_date.subtle.small')
		review.Sponsor = find(reviewData, 'div.review_table>div:nth-child('+curReview+')>div>div.critic_name>a>em.subtle')
		reviews.push(review)
	}
	
	console.table(reviews)
        	
	//adding everything to the display array which will be tabled at the end.
	arrResult.push(movieData)

}
console.table(arrResult)

	
})()




