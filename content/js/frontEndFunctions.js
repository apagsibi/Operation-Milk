
$(document).ready(function(){
    
    
    
    var jSONResults = "";
    function addButtonClicks(){
        $.each($('.row'), function(index, value){
            console.log(value);
            $(value).on('click', value, function(){
                alert("testing");
            })
            
        })
        
        
    }

    function loopComponents(jsonObj){
        console.log(jsonObj);
        console.log(Object.keys(jsonObj));
        
       
        var container_var = $('.milkIdentifier');
        var urlLink = "https://www.google.com/search?q=cat+gallery&rlz=1C1CHBF_enUS754US754&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiQgaCd_NzeAhUFIDQIHbD2BUYQ_AUIDygC&biw=1536&bih=762";
        
        $.ajax({ url: urlLink, success: function(data) {
            
            var keys = Object.keys(jsonObj);
            for(var i = 0; i < Object.keys(jsonObj).length; i++){
                
                urlTitle = keys[i];
                urlValue = jsonObj[urlTitle];
                console.log(urlValue);
                var urlLink = urlValue;
                console.log(urlTitle);
                var photoUrl = $(data).find('img')[i].src;
                var html_to_add = '<div class="row"><div class="pic_container col-5"><img src="' + photoUrl + '"></div><div class="title_container col-7"><p class="text"><a href="' + urlValue + '">' + urlTitle + '</a>'+ '</p></div></div>';
                console.log(html_to_add);
                container_var.append(html_to_add);
            }
        } });
        
    }
    $("#theButton").click(function(){
            fetch("http://127.0.0.1:3000?urlKey=cats").then(function(res){
                res.json().then(function(data){
                    jSONResults = data;
                    loopComponents(jSONResults);
                });
            });
            
        });
    
    
    
    
    loopComponents();

 
});

            
       