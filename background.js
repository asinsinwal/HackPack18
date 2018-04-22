// Saves the url of the current active tab
var activeTab = "";
var day;
var activeUser = "";

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
        timeOnWebsites = [0,0,0,0];
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
        console.log(JSON.parse(json_obj.timeOnWebsites));
    });
});

initiate();

// Start the extension
function initiate(){
    
    chrome.storage.local.get(null, function(json_obj){
        day = json_obj["dayTime"];
        websitesTracked = JSON.parse(json_obj.trackWebsites);
        timeOnWebsites = JSON.parse(json_obj.timeOnWebsites); 
    });

    // Get current active url
    getActiveUrl();

    // Handle Multiple events on regular interval
    handleEvents();
    /*
        chrome.tabs.onActivated.addListener(function() {
            getActiveUrl();
        });
        chrome.tabs.onUpdated.addListener(function(tab) {
            getActiveUrl();
        });
        chrome.windows.onFocusChanged.addListener(function(value) {
            // value of window ID
            if (value === chrome.windows.WINDOW_ID_NONE) {
                activeUser = false;
            } else {
                activeUser = true;
            }
            getActiveUrl();
        });
    */
    activeUser = true;

    // Update the storage values

}

// Set the interval duration
function setDurationListener(){
    if(activeTab != null && activeTab != ""){
        var domain = getDomain(activeTab);
        if(activeUser){
            if(checkDomainInList(domain)){
                var index = getIndexOfDomain(domain);
                timeOnWebsites[index] += 1;
                console.log("Time changed for domain: " + domain);
                console.log("Tracked Time Array: " + JSON.stringify(timeOnWebsites));
            }
        }
    }
}

// Get the active url
function getActiveUrl(){
    chrome.tabs.query({active: true, currentWindow: true}, function(values){
        if(values.length > 0){
            activeTab = values[0].url;
            console.log("Active URL: " + activeTab);
        } else {
            activeTab = null;
        }
    });
}

// Handling tab events
function handleEvents() {
    chrome.tabs.onActivated.addListener(function() {
        getActiveUrl();
 //Debug        console.log("NN: Some tab activated");
    });
    chrome.tabs.onUpdated.addListener(function(tab) {
        getActiveUrl();
 //Debug          console.log("NN: Some tab updated");
    });
    chrome.windows.onFocusChanged.addListener(function(value) {
        // value of window ID
 //Debug        console.log("NN: Some window focus changed");
        if (value === chrome.windows.WINDOW_ID_NONE) {
            activeUser = false;
        } else {
            activeUser = true;
        }
        getActiveUrl();
    });

    //set interval of 1s
    window.setInterval(setDurationListener, 1000);
}

// To get the domain from active url
function getDomain(value){
    var parts = value.split(":\/\/");
    if(parts.length <= 1){
        value = parts[0];
    } else {
        value = parts[1];
    }
    value = value.replace(/www\./g,'');

    var result = value.split('\/')[0];
 //Debug    console.log("Domain " + result);
    return result;
}


// Check if domain is in the tracked websites array
function checkDomainInList(value){
    //console.log("Check Domain Value: " + $.inArray(value, websitesTracked));
    //return ($.inArray(value, websitesTracked) > -1);
    for(var i = 0; i < websitesTracked.length; i++){
        if(websitesTracked[i] === value){
 //Debug            console.log("Domain found");
            return true;
        }
    }
    return false;
}

// Get index of the tracked website
function getIndexOfDomain(value){
    return websitesTracked.indexOf(value);
}