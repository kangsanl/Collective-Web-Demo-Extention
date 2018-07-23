// get the buttons by id
let showGraphInfo = document.getElementById('ShowGraphInfo');

(()=>{
  showGraphInfo.onclick = function() {
    browser.tabs.insertCSS({code: ".c-uhfh .brand-neutral { background: red !important; }"});
  };
  var uiURL = browser.extension.getURL("template/dialog.html");
})();