// Saves the url of the current active tab
var activeTab = "";
var day;

// Variables to store time spent on each website
var timeOnFacebook;
var timeOnWhatsApp;
var timeOnYouTube;
var timeOnNetflix;

// Websites to track
var websitesTracked;
var timeOnWebsites;

// Flag
var flag = false;

// Event Handled on install of extension
chrome.runtime.onInstalled.addListener(function(params){

    // If value of extension is equal to install
    if(params.reason == "install"){
        console.log("Start");

        // Create json object
        var data = {};
        flag = true;

        // Set the global values
        websitesTracked = ["facebook.com","netflix.com","web.whatsapp.com","youtube.com"];
        timeOnFacebook = timeOnNetflix = timeOnWhatsApp = timeOnYouTube = 0;
        timeOnWebsites = [timeOnFacebook,timeOnNetflix,timeOnWhatsApp,timeOnYouTube];
        day = new Date();

        // assign key-value to json object
        data["dayTime"] = day;
        console.log(data["dayTime"]);
        data["trackWebsites"] = JSON.stringify(websitesTracked);
        console.log(data["trackWebsites"]);
        data["timeOnWebsites"] = JSON.stringify(timeOnWebsites);
        console.log(data["timeOnWebsites"]);

        // Local storage of json object
        chrome.storage.local.set(data,function(){});
    }
});


// Retrieve websites from storage
chrome.storage.onChanged.addListener(function(){
    chrome.storage.local.get("trackWebsites", function(json_obj){
        websitesTracked = JSON.parse(json_obj.trackWebsites);
    });
});


// Start the extension
function initiate(){
    chrome.storage.local.get(null, function(json_obj){
        day = json_obj["dayTime"];
        websitesTracked = json_obj.trackWebsites;
        timeOnWebsites = json_obj.timeOnWebsites; 
    });

    /*
    BAAKI HAI
    */
   
}

// Reset the values
function reset(){
    /*
    BAAKI HAI
    */
}