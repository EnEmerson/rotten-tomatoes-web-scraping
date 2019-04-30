//web scraping project for CIS 3360, rotten tomatoes opening week page.
//Baxter Irwin and En Emerson

var numOfMovies = $("div.mb-movie").length;
var movieLinks = [];
var myData;
var lineResult = [];
var arrResult = [];

//shows how many movies are on the opening week page
//console.log(numOfMovies.toString()); 

//getting the urls from the movie panels
for(var i = 0; i < numOfMovies; i++){

    var curLink = $("div.mb-movie>div.movie_info")[i].firstElementChild.href;
    movieLinks.push(curLink);
	
}

//showing what links were added.
//console.table(movieLinks);

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
	
	//Main Panel
	var title = $(myData).find("h1.mop-ratings-wrap__title--top").text().trim();
	var concensus = $(myData).find("p.mop-ratings-wrap__text.mop-ratings-wrap__text--concensus").text().trim();
	var numOfCritics = $(myData).find("section.mop-ratings-wrap__row>div:nth-of-type(1)>div>small").text().trim();
	var userRating = $(myData).find("section.mop-ratings-wrap__row>div:nth-of-type(2)>div>small").text().trim();
	
	var tomatoScore = $(myData).find("section.mop-ratings-wrap__row>div:nth-of-type(1)>h1>a>span.mop-ratings-wrap__percentage").text().trim();
	if(tomatoScore === ""){
		tomatoScore = "No tomato score yet.";
	}
	
	var audienceScore = $(myData).find("section.mop-ratings-wrap__row>div:nth-of-type(2)>h1>a>span.mop-ratings-wrap__percentage").text().trim();
	audienceScore = audienceScore.replace(/(\r\n|\n|\r)/gm, "");
	audienceScore = audienceScore.replace('liked it', "").trim();
	if(audienceScore === ""){
		audienceScore = "No audience score yet.";
	}
	
	//Movie Info Panel
	var synopsis = $(myData).find("div#movieSynopsis").text().trim();

	var rating = $(myData).find("ul.content-meta.info>li.meta-row.clearfix:nth-of-type(1)>div.meta-label.subtle").text().trim() + " " +
	$(myData).find("ul.content-meta.info>li.meta-row.clearfix:nth-of-type(1)>div.meta-value").text().trim();
	rating = rating.replace(/(\r\n|\n|\r)/gm, "");

	var genre = $(myData).find("ul.content-meta.info>li.meta-row.clearfix:nth-of-type(2)>div.meta-label.subtle").text().trim() + " " +
	$(myData).find("ul.content-meta.info>li.meta-row.clearfix:nth-of-type(2)>div.meta-value").text().trim();
	genre = genre.replace(/(\r\n|\n|\r)/gm, "");
	
	var director = $(myData).find("ul.content-meta.info>li.meta-row.clearfix:nth-of-type(3)>div.meta-label.subtle").text().trim() + " " +
	$(myData).find("ul.content-meta.info>li.meta-row.clearfix:nth-of-type(3)>div.meta-value").text().trim();
	director = director.replace(/(\r\n|\n|\r)/gm, "");
	
	var writer = $(myData).find("ul.content-meta.info>li.meta-row.clearfix:nth-of-type(4)>div.meta-label.subtle").text().trim() + " " + 
	$(myData).find("ul.content-meta.info>li.meta-row.clearfix:nth-of-type(4)>div.meta-value").text().trim();
	writer = writer.replace(/(\r\n|\n|\r)/gm, "");
	
	var inTheater = $(myData).find("ul.content-meta.info>li.meta-row.clearfix:nth-of-type(5)>div.meta-label.subtle").text().trim() + " " + 
	$(myData).find("ul.content-meta.info>li.meta-row.clearfix:nth-of-type(5)>div.meta-value").text().trim();
	inTheater = inTheater.replace(/(\r\n|\n|\r)/gm, "");
	
	//Need to check the content of these because the order changes sometimes
	
	var runTime = $(myData).find("ul.content-meta.info>li.meta-row.clearfix:nth-of-type(6)>div.meta-label.subtle").text().trim()
	
	if(runTime.includes("Runtime")){
		runTime += " " + $(myData).find("ul.content-meta.info>li.meta-row.clearfix:nth-of-type(6)>div.meta-value").text().trim();
		runTime = runTime.replace(/(\r\n|\n|\r)/gm, "");
	}
	
	var studio = $(myData).find("ul.content-meta.info>li.meta-row.clearfix:nth-of-type(7)>div.meta-label.subtle").text().trim() + " " + 
	$(myData).find("ul.content-meta.info>li.meta-row.clearfix:nth-of-type(7)>div.meta-value").text().trim();
	studio = studio.replace(/(\r\n|\n|\r)/gm, "");

	//adding everything to the lineResult which will be tabled at the end.
	lineResult = [
	//Main Panel
	/*	title + "*", concensus+ "*", tomatoScore + "*", numOfCritics + "*", audienceScore + "*", userRating + "*",*/
	//Movie Info Panel
		synopsis + "*",rating + "*", genre + "*", director + "*", writer + "*", inTheater + "*", runTime + "*", studio + "*",
		
		"^"
	];
	arrResult.push(lineResult);
	
}
console.table(arrResult);




