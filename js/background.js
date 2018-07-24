// listen for message from content script
browser.runtime.onConnect.addListener(function (port) {
    console.assert(port.name === "entityExtraction");
    console.log("port handler");
    port.onMessage.addListener(function (request) {
        console.log("received message");
        console.log(request.msgType);
        if (request.msgType === "extractEntities") {
            //console.log(encodeURIComponent(request.regionOfInterest));
            postExtractEntitiesRequest(request.regionOfInterest);
        }
    });
    console.log("port handler after");
});

function postExtractEntitiesRequest(regionOfInterest) {
    console.log("asking service to extract entities");
	
    var formData = new FormData();
    formData.append("html", encodeURIComponent(regionOfInterest));  

    var xhr = new XMLHttpRequest();  
    xhr.onreadystatechange = function () { 
        console.log("response received " + xhr.readyState);
		//if (xhr.readyState == 4) {
			//if (xhr.status == 200) {
				//var response = xhr.responseText;
				var response = "[{\"Type\":\"Flight\",\"FlightTime\":\"10:15pm - 9:11am\",\"Airline\":\"Delta\",\"Stops\":\"Nonstop\",\"Duration\":\"10h 20m\",\"From\":\"Depature airport: SEA\",\"To\":\"Arrival airport: JFK\",\"Price\":\"$400\"}]";
				var parsedResponse = JSON.parse(response);
				// {"Type":"Flight","FlightTime":"10:15pm - 9:11am","Airline":"Delta","Stops":"Nonstop","Duration":"10h 20m","From":"Depature airport: SEA","To":"Arrival airport: JFK","Price":"$400"}
		//	}
		//}
    };
    xhr.open("POST", "http://10.127.195.142/", true);
    xhr.send(formData); 
}

browser.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        // POST API
        console.log(request.apiSignature);
        console.log(request.type);
        console.log(request.body);
    });
