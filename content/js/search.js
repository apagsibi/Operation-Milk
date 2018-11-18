const request = require('request-promise');
const cheerio = require('cheerio'); //you can use jquery inside of node

//THIS SHOULD ALL BE CALLED WHEN THE BUTTON IS CLICKED
function search(){
    var url = window.location.pathname;
    index = url.search("=");
    item  = url.slice(index + 1);

    request("https://www.google.com/search?q=" + item, (error,response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html); //allows you to use this like jquery
        const title = $('.r');
            title_list = []
            url_list = []
        $('.r').each(function(i,elm){ //for title!
                if (i > 0){
                    //hall to handle after eafch function
                    //promises
                        //PUT THE DATA AND INJECT TO FRONT END HERE
                    title_list.push($(this).text());
                }
            });

        const links = $('.r a');
        invalid_indexes = []
        $(links).each(function(i, link){
            if (i > 0){
                    l = $(link).text() + ':\n  ' + $(link).attr('href');
                    index = l.search("=");
                    link_name = l.slice(index+1);
                    if (link_name.search("https:") != -1){
                        url_list.push(link_name);
                    }
                    else{
                        invalid_indexes.push(i);
                    }
            }
        });
            //var headerText = title.text();
            //console.log(headerText);
            console.log(invalid_indexes);
        new_title_list = []
        for(i = 0; i < title_list.length; i++){ //getting all the titles with valid urls
            if (invalid_indexes.indexOf(i) == -1){
                new_title_list.push(title_list[i]);
            }
        }
        console.log(new_title_list.length);
        console.log(url_list.length);
            
            dict = {};
        for(j = 0; j < new_title_list.length; j++){
            dict[new_title_list[j]] = url_list[j];
        }

        console.log(JSON.stringify(dict));

        }
    });
}