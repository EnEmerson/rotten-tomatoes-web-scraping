# rotten-tomatoes-web-scraping
3rd project for CIS 3360, doing web scraping on the rotten tomatoes website using jQuery.

---

We've been instructed to scrape some data from the "Opening This Week" page on the Rotten Tomatoes website for our 3rd and final project for CIS 3360.

Website: [Rotten Tomatoes "Opening This Week"](https://www.rottentomatoes.com/browse/opening/)

### How to run this script:

* Go to the website linked above.
* Open the console on the webpage, Ctrl + Shift + I.
* Copy the code from the "rotten_tomatoes.js" file and paste it into the Console of the rotten tomatoes page.
* Press enter and wait a bit for the AJAX calls to complete.
* The tabled data should appear on the console with all of the information scraped from the movies.


### How to format tabled data in Excel

* Copy the entire table
* Paste the data into a row in Excel
* Use the 'Text-to-Columns' function in the Data ribbon to separate the rows (use '^' as delimiter first)
* Copy the new, delimited row and paste it into a new row using 'Paste > Special > Transpose'
* Once again, use the 'Text-to-Columns' function on this new column to separate the rows (use '\*' as delimiter)

**The data should now be nicely separated and easy to read in Excel.**


Below are the requirements for the script.

---

## For each movie on the opening week page we need to get these things....

### From the Main Panel: - complete

* Title of the movie
* Critic's consensus
* Tomatometer score
* Number of reviews
* Audience score
* User rating

### From the MOVIE INFO section: - complete

* Background/synopsis
* Rating (G/PG/PG-13/R)
* Genre
* Director
* Writer
* Opening date
* Streaming date
* Runtime
* Studio

### From the CAST section: - complete

* List of cast members

### From the CRITIC REVIEWS section: - complete

* Go into "View All Critic Reviews" link and retrieve the info for each review
	* Small excerpt of the review 
	* Name of critic
	* When they reviewed the movie
	* Where the critic wrote the review (paper/magazine/etc)

---

## What needs to be turned in:

* README inluding:
	* names of group members
	* website
	* any special directions for running code
* Print out of script
* Print out of scraped data, formatted to excel (5-10 pages, maximum)
* Zip file to TRACS including all of the above information.

