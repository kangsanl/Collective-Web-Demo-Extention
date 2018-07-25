function postExtractEntitiesRequest(regionOfInterest) {
    console.log("asking service to extract entities");

    var xhr = new XMLHttpRequest();    
    xhr.onreadystatechange = function () { 
        console.log("response received " + xhr.readyState);
		if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log("entity pushed to the server");
			}
		}
    };
    xhr.open("POST", "http://127.0.0.1:86/api/v1/ws_entities?url=https://www.expedia.com/Flights-Search", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(encodeURIComponent(regionOfInterest));
}

browser.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log("received message");
        console.log(request.msgType);
        if (request.msgType === "extractEntities") {
            //console.log(request.regionOfInterest);
            postExtractEntitiesRequest(request.regionOfInterest);
        }
    });
