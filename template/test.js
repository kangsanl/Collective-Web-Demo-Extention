console.log('test.js');
(() => {
    var button = document.getElementById('test');
    button.addEventListener('click', function(){
        // getCollections();
        console.log('button clicked');
    });

    getCollections();
})();

function getCollections() {
    console.log("sending message");
    var url = document.location.href; 
    browser.runtime.sendMessage({
        msgType: "insights",
        type: 'get',
        apiSignature: 'http://127.0.0.1:86/api/v1/collections',
        body: null
    }, function (response) {
        console.log("response");
        console.log(response);
        var parsedResponse = JSON.parse(response);
    });
    console.log("message sent");
}