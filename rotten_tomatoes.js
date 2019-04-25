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
for(var i = 0; i < 5; i++){
	
	myData = getURL(movieLinks[i]);
	
	lineResult = [
		$(myData).find("h1.mop-ratings-wrap__title--top").text().trim() + "*",
		$(myData).find("p.mop-ratings-wrap__text.mop-ratings-wrap__text--concensus").text().trim() + "*",
		"^"
	];
	arrResult.push(lineResult);
	
}
console.table(arrResult);




