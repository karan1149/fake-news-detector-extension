// Testing event handlers
document.getElementById('real').addEventListener('click', showReal);
document.getElementById('fake').addEventListener('click', showFake);
document.getElementById('error').addEventListener('click', showError);

var apiURL = "http://fakenewsai.com/detect"

chrome.storage.sync.get('userid', function(items) {
    var userid = items.userid;
    if (userid) {
        useToken(userid);
    } else {
        userid = getRandomToken();
        chrome.storage.sync.set({userid: userid}, function() {
            useToken(userid);
        });
    }
});

// use token, load URL and then make request
function useToken(id) {
  chrome.tabs.query({active:true,currentWindow:true},function(tabArray){
    url = tabArray[0].url;
    pageLocation = getLocation(url);
    if (!pageLocation.protocol.startsWith("http")){
      showError();
      return;
    }
    shortenedURL = pageLocation.protocol + "//" + pageLocation.hostname;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4){
        if (this.status == 200) {
          data = JSON.parse(this.responseText);
          if (data.error){
            showError("Oops! There was an error while we were checking the site.");
          } else {
            if (data.fake){
              showFake();
            } else {
              showReal();
            }
          }
        } else {
          showError("Oops! There was a connection error while we were checking the site.");
        }
      }
    };
    xmlhttp.open("GET", apiURL + "?url=" + encodeURIComponent(shortenedURL), true);
    xmlhttp.send();
    });
}

// display code
var analyzed = "We analyzed this website to see if it was similar to known fake news sites using a machine learning model. The same technology is used to power other artificial intelligence applications, like Siri and self-driving cars!";
function showReal(){
  var body = document.body;
  var displayDiv = document.getElementById("displayText");
  var spinner = document.getElementById("spinner");
  var header = document.getElementById("headerText");

  spinner.style.display = "none";

  header.innerText = "Real!";
  displayDiv.innerHTML = "<span>This site is probably not a fake news site.</span><br /><br />";
  displayDiv.innerHTML += analyzed;

  displayDiv.className += " fadeIn";
  header.className += " fadeIn";

  body.style.backgroundColor = "#D9FFD9";
  body.style.color = "#004000";


};

function showFake(){
  var body = document.body;
  var displayDiv = document.getElementById("displayText");
  var spinner = document.getElementById("spinner");
  var header = document.getElementById("headerText");

  spinner.style.display = "none";

  header.innerText = "Fake!";
  displayDiv.innerHTML = "<span>This site is probably not a reliable source for news.</span><br /><br />";
  displayDiv.innerHTML += analyzed;

  displayDiv.className += " fadeIn";
  header.className += " fadeIn";

  body.style.backgroundColor = "#FFD9D9";
  body.style.color = "#730000";


};

function showError(errorMessage){
  var body = document.body;
  var displayDiv = document.getElementById("displayText");
  var spinner = document.getElementById("spinner");
  var header = document.getElementById("headerText");

  spinner.style.display = "none";

  header.innerText = "Error!";
  if (!errorMessage){
    displayDiv.innerHTML = "<span>This site does not appear to be a valid news site.</span>";
  } else {
    displayDiv.innerHTML = errorMessage;
  }

  displayDiv.className += " fadeIn";
  header.className += " fadeIn";
}

// util code
function getRandomToken() {
    // E.g. 8 * 32 = 256 bits token
    var randomPool = new Uint8Array(32);
    crypto.getRandomValues(randomPool);
    var hex = '';
    for (var i = 0; i < randomPool.length; ++i) {
        hex += randomPool[i].toString(16);
    }
    return hex;
}
// generate location object from link
var getLocation = function(href) {
    var l = document.createElement("a");
    l.href = href;
    return l;
};
