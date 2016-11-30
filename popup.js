// Testing event handlers
document.getElementById('real').addEventListener('click', showReal);
document.getElementById('fake').addEventListener('click', showFake);
document.getElementById('error').addEventListener('click', showError);

showReal = function(){
  body = document.body;
  displayDiv = document.getElementById("displayText");
  spinner = document.getElementById("spinner");
  header = document.getElementById("headerText");
var analyzed = "We analyzed this website to see if it was similar to known fake news sites using a machine learning model. The same technology is used to power other artificial intelligence applications, like Siri and self-driving cars!";

  spinner.style.display = "none";
  displayDiv.className += " fadeIn";
  header.className += " fadeIn";

  body.style.backgroundColor = "#D9FFD9";
  body.style.color = "#004000";

  header.innerText = "Not Fake!";
  displayDiv.innerHTML = "This site is probably a reliable source for news.<br /><br />";

  displayDiv.innerHTML += analyzed;


};

showFake = function(){
  body = document.body;
  displayDiv = document.getElementById("displayText");
  spinner = document.getElementById("spinner");
  header = document.getElementById("headerText");

  spinner.style.display = "none";
  displayDiv.className += " fadeIn";
  header.className += " fadeIn";

  body.style.backgroundColor = "#FFD9D9";
  body.style.color = "#730000";

  header.innerText = "Fake!";
  displayDiv.innerHTML = "This site is probably not a reliable source for news.<br /><br />";

  displayDiv.innerHTML += analyzed;
};

function showError(errorMessage){
  var body = document.body;
  var displayDiv = document.getElementById("displayText");
  var spinner = document.getElementById("spinner");
  var header = document.getElementById("headerText");

  spinner.style.display = "none";

  header.innerText = "Error!";
  if (!errorMessage){
    displayDiv.innerHTML = "This site does not appear to be a valid news site.";
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
