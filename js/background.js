// listen for sendMessage() from content script
browser.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        // POST API
        console.log(request.apiSignature);
        console.log(request.type);
        console.log(request.body);
    });