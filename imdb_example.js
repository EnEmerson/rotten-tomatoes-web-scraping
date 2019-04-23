//doing web scraping on the imbd top 250 movies page

var urlLength = $("td.titleColumn").length;
var myLinks = [];
var myData;
var lineResult = [];
var arrResult = [];

for(var i = 0; i < urlLength; i++){

    var curLink = $("td.titleColumn")[i].firstElementChild.href;
    myLinks.push(curLink);
}

function getURL(url){

    return $.ajax({
        type: "GET",
        url: url,
        cache: false,
        async: false
    }).responseText;
}

for(var i = 0; i < 5; i++){

    myData = getURL(myLinks[i]);
    lineResult = [
        $(myData).find("div.title_wrapper h1").text().trim() + "*",
        $(myData).find("div.inline p span").text().trim() + "*",
        $(myData).find("div#titleDetails h2").text().trim() + "*",
        $(myData).find("div#titleDetails.article div.txt-block:nth-of-type(1)").text().trim() + "*",
        $(myData).find("div#titleDetails.article div.txt-block:nth-of-type(2)").text().trim() + "*",
        $(myData).find("div#titleDetails.article div.txt-block:nth-of-type(3)").text().trim() + "*",
        $(myData).find("div#titleDetails.article div.txt-block:nth-of-type(4)").text().trim() + "*",
        $(myData).find("div#titleDetails.article div.txt-block:nth-of-type(5)").text().trim() + "*",
        $(myData).find("div#titleDetails.article div.txt-block:nth-of-type(6)").text().trim() + "*",
        $(myData).find("h3.subheading:nth-of-type(3)").text().trim() + "*",
        $(myData).find("div.txt-block:nth-of-type(13)").text().trim() + "*",
        $(myData).find("div.txt-block:nth-of-type(14)").text().trim() + "*",
        $(myData).find("div.txt-block:nth-of-type(15)").text().trim() + "*",
        $(myData).find("div.txt-block:nth-of-type(16)").text().trim() + "*",
        $(myData).find("div#titleUserReviewsTeaser.article h2").text().trim() + "*",
        $(myData).find("span strong").text().trim() + "*",
        $(myData).find("div.comment-meta").text().trim() + "*",
        $(myData).find("div.user-comments p").text().trim() + "*",


        "^"

    ];
    arrResult.push(lineResult);
}

console.table(arrResult);