//web scraping project for CIS 3360, rotten tomatoes opening week page.
//Baxter Irwin and En Emerson

var numOfMovies = $("div.mb-movie").length;
var movieLinks = [];
var myData;
var lineResult = [];
var arrResult = [];

//shows how many movies are on the opening week page
console.log(numOfMovies.toString()); 

//getting the urls from the movie panels
for(var i = 0; i < numOfMovies; i++){

    var curLink = $("div.mb-movie>div.movie_info")[i].firstElementChild.href;
    movieLinks.push(curLink);
	
}

//showing what links were added.
console.table(movieLinks);

//add the ajax function to get the url
function getURL(url){

    return $.ajax({
        type: "GET",
        url: url,
        cache: false,
        async: false
    }).responseText;
}

//selecting information to get from each individual movie page
//replace "5" with "numOfMovies" when we finish the list of items to retrieve
for(var i = 0; i < 5; i++){
	
	myData = getURL(movieLinks[i]);
	
	var tomatoScore = $(myData).find("section.mop-ratings-wrap__row>div:nth-of-type(1)>h1>a>span.mop-ratings-wrap__percentage").text().trim() + "*";
	if(tomatoScore === "*"){
		tomatoScore = "No score yet.";
	}
	
	lineResult = [
		"Title: " + $(myData).find("h1.mop-ratings-wrap__title--top").text().trim() + "*",
		"Critic Consensus: " + $(myData).find("p.mop-ratings-wrap__text.mop-ratings-wrap__text--concensus").text().trim() + "*",
        "Tomatometer Score: " + tomatoScore + "*", //tomato score
		"Number of Reviews: " + $(myData).find("section.mop-ratings-wrap__row>div:nth-of-type(1)>div>small").text().trim() + "*",
		"^"
	];
	arrResult.push(lineResult);
	
}
console.table(arrResult);




