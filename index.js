const _ = require('lodash')
const cheerio = require('cheerio')
const request = require('request')

var options = {
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSAH0E79xN3-c4RIDSfjYP85S6WNGHSr1evlttgY4523oEUwswag5WvX9qChwAn84q68Y6fF3xqILOE/pubhtml?gid=2001794615&single=true&alt=json'
}

// load column via google sheet
request(options, (err, res, body) => {
    if (err) return console.error(err)
    let $ = cheerio.load(body);
    $("td").each(function(i, item){
        const leverUrl = $("a", item).text()
        getInternUrl(leverUrl);
    })
})

function getInternUrl(_url) {
    request(_url , (err, res, body) => {
        if (err) return console.error(err)
        let $ = cheerio.load(body)
        $(".posting").each(function(i, item){
            const title = $("h5", item).text()
            if ((title.match(/intern/gi) || title.match(/summer/gi) || title.match(/campus/gi)) && (title.match(/software/gi) || title.match(/backend|back[\s\w\0-]end/gi) || title.match(/devops/gi || title.match(/engineering/gi)))) {
                console.log(title)
                console.log($(".posting-title", item).attr('href'), '\n')   
            }  
        })
    })
}
