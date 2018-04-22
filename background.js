// Saves the url of the current active tab
var activeTab = "";

//variables to store time spent on each website
var timeOnFacebook;
var timeOnWhatsApp;
var timeOnYouTube;
var timeOnNetflix;

//Websites to track
var websitesTracked;
var timeOnWebsites;

//flag
var flag = false;


/*function getInstalledTime(){
    var currDate = currentDate();
} */


chrome.runtime.onInstalled.addListener(function(params){

    if(params.reason == "install"){

        console.log("Start");

        var data = {};
        flag = true;
        websitesTracked = ["facebook.com","netflix.com","web.whatsapp.com","youtube.com"];
        timeOnFacebook = timeOnNetflix = timeOnWhatsApp = timeOnYouTube = 0;
        timeOnWebsites = [timeOnFacebook,timeOnNetflix,timeOnWhatsApp,timeOnYouTube];
        data["dateToday"] = currentDate();
        console.log(data["dateToday"]);
        data["trackWebsites"] = JSON.stringify(websitesTracked);
        console.log(data["trackWebsites"]);
        data["timeOnWebsites"] = JSON.stringify(timeOnWebsites);
        console.log(data["dateToday"]);
        chrome.storage.local.set(data,function(){});



    }

    

});

