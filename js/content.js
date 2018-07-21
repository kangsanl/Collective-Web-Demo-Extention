// get the URL of the page
(function(){
    var url = document.location.href;

    // example code to change color on www.airbnb.com
    setTimeout(()=>{
        console.log("timeout");
        var targetElement = document.getElementById('MagicCarpetSearchBar');
        targetElement.style.backgroundColor = 'blue';
    }, 5000);   

    // if not on a docs.microsoft.com domain
    /*if (url.indexOf("//docs.microsoft.com") <= -1) {
        // send inactive icons
        browser.runtime.sendMessage({
            "iconPath20": "images/inactive20.png",
            "iconPath40": "images/inactive40.png"
        });
    }*/
})();
