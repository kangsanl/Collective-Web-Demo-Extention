// get the URL of the page
(function(){
    var url = document.location.href; 

    function extractDom(targetDOM)
    {
        setTimeout(()=>{
            console.log("extractDom");
            var targetElement = document.getElementById(targetDOM);
            if (targetElement)
            {
                extractEntitiesInBackground(targetElement);
            }
        }, 7000); // wait for 7 sec till the page is fully loaded
    }

    // Expedia Flight Search
    if (url.indexOf("//www.expedia.com/Flights-Search") >= 0) {
        extractDom('flight-listing-container');
    }
})();

function extractEntitiesInBackground(targetElement) {
    var port = browser.runtime.connect({ name: "entityExtraction" });
    console.log("sending message");
    port.postMessage({
        "msgType": "extractEntities",
        "regionOfInterest": targetElement.innerHTML
    });
    console.log("sent message");
}