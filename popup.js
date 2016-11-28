var analyzed = "We analyzed this website to see if it was similar to known fake news sites using a machine learning model. The same technology is used to power other artificial intelligence applications, like Siri and self-driving cars!";

showReal = function(){
  body = document.body;
  displayDiv = document.getElementById("displayText");
  spinner = document.getElementById("spinner");
  header = document.getElementById("headerText");

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

// // Testing event handlers
// document.getElementById('real').addEventListener('click', showReal);
// document.getElementById('fake').addEventListener('click', showFake);
// Testing event handlers
document.getElementById('real').addEventListener('click', showReal);
document.getElementById('fake').addEventListener('click', showFake);
document.getElementById('error').addEventListener('click', showError);
