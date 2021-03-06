//web scraping project for CIS 3360, rotten tomatoes opening week page.
//Baxter Irwin and En Emerson
(() => {
let numOfMovies = $('div.mb-movie')
let movieLinks = []
let myData
let arrResult = []
let baseLink = 'https://www.rottentomatoes.com'

$.each(numOfMovies, function(movieNum){
	
	let curLink = $('div.mb-movie>div.movie_info')[movieNum].firstElementChild.href
    movieLinks.push(curLink)
})

function getURL(url){
	
	return $.ajax({
		type: 'GET',
		url: url,
		cache: false,
		async: false
	}).responseText	
}

function find(linkData, selector){
	
	let data = $(linkData).find(selector).text().trim()
	data = data.replace(/(\r\n|\n|\r)/gm, '')
	return data + '*'
}

let totalMovies = movieLinks.length
for(let i = 0; i < totalMovies; i++){
	
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
	let numMovieDetails = $(myData).find('div.panel-body.content_body>ul.content-meta.info>li.meta-row.clearfix').length
    for(let deet = 1; deet <= numMovieDetails; deet++){
		
		let movieDetail = find(myData, 'ul.content-meta.info>li.clearfix:nth-of-type('+deet+')>div.meta-label.subtle')
		let movieValue = find(myData, 'ul.content-meta.info>li.clearfix:nth-of-type('+deet+')>div.meta-value')

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
	let numOfCastMembers = $(myData).find('#movie-cast>div>div>div.inlineBlock').length
	if(numOfCastMembers >= 1){
		
		for(mem = 1; mem <= numOfCastMembers; mem++){
			
			let curCastMember = $(myData).find('#movie-cast>div>div>div.inlineBlock:nth-of-type('+mem+')>div.media-body>a>span').text().trim()
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
	
	//Critic Reviews Section
	let reviewData
    let reviews = []
	let relativeLink = $(myData).find('div.view-all>a').attr('href')
	let absoluteLink = baseLink + relativeLink
	reviewData = getURL(absoluteLink)
	
	if(!reviewData){
		let review = {
				Asterisk: '*',
				Excerpt: 'No excerpt found*',
				Critic_Name: 'No critic name found*',
				Review_Date: 'No review date found*',
				Sponsor: 'No sponsor found*',
				Delimiter: '^'
			 }
			 reviews.push(review)
	}
	else{
		let numPagesText = $(reviewData).find('span.pageInfo').text().trim()
		let maxPagesArr = numPagesText.split(' ')
		let maxPages = maxPagesArr[maxPagesArr.length-1]
		
		for(let curPage = 1; curPage <= maxPages; curPage++ ){

			let nextPageData = getURL(absoluteLink + '?page=' + curPage)
			let reviewsPerPage = $(nextPageData).find('div.row.review_table_row').length
		
			for(let curReview = 1; curReview <= reviewsPerPage; curReview++){
			
				 let review = {
					Asterisk: '*',
					Excerpt: 'No excerpt found*',
					Critic_Name: 'No critic name found*',
					Review_Date: 'No review date found*',
					Sponsor: 'No sponsor found*',
					Delimiter: '^'
				 }
				review.Excerpt = find(nextPageData, 'div.content>div.review_table>div.row:nth-child('+curReview+')>div>div>div>div.the_review')
				review.Critic_Name = find(nextPageData, 'div.content>div.review_table>div.row:nth-child('+curReview+')>div>div>a.articleLink')
				review.Review_Date = find(nextPageData, 'div.content>div.review_table>div.row:nth-child('+curReview+')>div>div>div.review_date')
				review.Sponsor = find(nextPageData, 'div.content>div.review_table>div.row:nth-child('+curReview+')>div>div.critic_name>a>em.subtle')
				reviews.push(review)
			}
		}
	}
    console.table(reviews)
	arrResult.push(movieData)
}
console.table(arrResult)
})()




