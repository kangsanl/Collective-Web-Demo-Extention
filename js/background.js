function sendRequest(type, apiSignature, body, sendResponse) {
    console.log("sending request to server");

    var xhr = new XMLHttpRequest();    
    xhr.onreadystatechange = function () { 
        console.log("response received " + xhr.readyState);
		if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log("request successfully processed by the server");

                if (sendResponse) {
                    console.log("sending response");
                    sendResponse(xhr.response);
                }
			}
		}
    };
    xhr.open(type, apiSignature, true);

    if (body) {
        xhr.setRequestHeader("Content-type", "application/json");
        //xhr.send(encodeURIComponent(body));
        xhr.send(body);
    }
    else {
        xhr.send();
    }
}

browser.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        console.log("received message");
        console.log(request.msgType);
        if (request.msgType === "extractEntities") {
            sendRequest(request.type, request.apiSignature, request.body, null);
        }
        else if (request.msgType === "insights") {
            sendRequest(request.type, request.apiSignature, request.body, sendResponse);
            return true; // indicates the response will come asynchronoulsy
        }
    });
