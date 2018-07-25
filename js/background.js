function sendEntity(type, apiSignature, body) {
    console.log("sending entity to server");

    var xhr = new XMLHttpRequest();    
    xhr.onreadystatechange = function () { 
        console.log("response received " + xhr.readyState);
		if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log("entity pushed to the server");
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
            sendEntity(request.type, request.apiSignature, request.body);
        }
    });
