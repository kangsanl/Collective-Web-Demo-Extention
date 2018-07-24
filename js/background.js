// listen for sendMessage() from content script
browser.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log("received message");
		console.log(request.msgType);
		if (request.msgType === "extractEntities") {
            console.log(encodeURIComponent(request.regionOfInterest));
			postExtractEntitiesRequest(request.regionOfInterest);
		}
    }
);

function postExtractEntitiesRequest(regionOfInterest) {
    console.log("asking service to extract entities");
	
    var formData = new FormData();
    formData.append("html", encodeURIComponent(regionOfInterest));  

    var xhr = new XMLHttpRequest();  
    xhr.onreadystatechange = function () { 
        console.log("response received" + xhr.readyState);
		//if (xhr.readyState == 4) {
			//if (xhr.status == 200) {
				//var response = xhr.responseText;
				var response = "[{\"Type\":\"Flight\",\"FlightTime\":\"10:15pm - 9:11am\",\"Airline\":\"Delta\",\"Stops\":\"Nonstop\",\"Duration\":\"10h 20m\",\"From\":\"Depature airport: SEA\",\"To\":\"Arrival airport: JFK\",\"Price\":\"$400\"}]";
				var parsedResponse = JSON.parse(response);
				// {"Type":"Flight","FlightTime":"10:15pm - 9:11am","Airline":"Delta","Stops":"Nonstop","Duration":"10h 20m","From":"Depature airport: SEA","To":"Arrival airport: JFK","Price":"$400"}
		//	}
		//}
    };
    xhr.open("POST", "http://microsoft.com", true);
    xhr.send(formData); 
}