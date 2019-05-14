# rotten-tomatoes-web-scraping
EN EMERSON & BAXTER IRWIN
3rd and final project for CIS 3360, doing web scraping on the rotten tomatoes website using jQuery.

---

Website: Rotten Tomatoes "Opening This Week" Page:
https://www.rottentomatoes.com/browse/opening/

### How to run this script:

* Go to the website linked above.
* Open the console on the webpage, Ctrl + Shift + I.
* Copy the code from the "rotten_tomatoes.js" file and paste it into the Console of the rotten tomatoes page.
* Press enter and wait a bit for the AJAX calls to complete.
* The tabled data should appear on the console with all of the information scraped from the movies.

---

## For each movie on the opening week page we need to get these things:

### From the Main Panel:

* Title of the movie
* Critic's consensus
* Tomatometer score
* Number of reviews
* Audience score
* User rating

### From the MOVIE INFO section:

* Background/synopsis
* Rating (G/PG/PG-13/R)
* Genre
* Director
* Writer
* Opening date
* Streaming date
* Runtime
* Studio

### From the CAST section:

* List of cast members

### From the CRITIC REVIEWS section:

* Go into "View All Critic Reviews" link and retrieve the info for each review
	* Small excerpt of the review 
	* Name of critic
	* When they reviewed the movie
	* Where the critic wrote the review (paper/magazine/etc)


