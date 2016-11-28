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

function useToken(id, url) {
    var popups = chrome.extension.getViews({type: "popup"});
    if (popups.length > 0){

      var popup = popups[0];
      popup.showReal();
    }


}

Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  console.log("he3llo");
  chrome.storage.sync.get('userid', function(items) {
      var userid = items.userid;
      if (userid) {
          useToken(userid, tab.url);
          console.log("hell4o");
      } else {
          userid = getRandomToken();
          chrome.storage.sync.set({userid: userid}, function() {
              useToken(userid, tab.url);
              console.log("hello");
          });
      }
  });
});


// // Called when the user clicks on the browser action.
// chrome.browserAction.onClicked.addListener(function(tab) {
//   // No tabs or host permissions needed!
//   console.log('Turning ' + tab.url + ' red!');
//   chrome.tabs.executeScript({
//     code: 'document.body.style.backgroundColor="red"'
//   });
// });
