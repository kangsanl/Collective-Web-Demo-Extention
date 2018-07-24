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

    function addCollectButtons(query)
    {
        function addCollectBtnToElement(element)
        {
            function OnCollectBtnClick(element)
            {
                var button = this;
                var selectedList = button.parentElement;
                // remove button after clicking
                selectedList.removeChild(button);

                console.log(selectedList.textContent);
                browser.runtime.sendMessage({
                    type: 'post',
                    apiSignature: 'http://localhost:8080/pushCollection',
                    body: selectedList
                  });
            }

            var button = document.createElement("Button");
            button.textContent = '+';
            button.classList.add('collecBtn');
            button.style.margin = '0px 0px 0px 0px';
            button.style.position = 'absolute';
            button.style.top = '-15px';
            button.style.right = '-15px';
            button.style.width = '30px';
            button.style.height = '30px';
            button.style.backgroundColor = 'greenYellow';
            button.style.zIndex = '9999';
            button.style.color = 'black';
            button.addEventListener("click", OnCollectBtnClick); 

            element.appendChild(button);

            element.dataset.collective = 'true'; // it will mark data-collective="true", so we don't add button here again
        }

        var elements = document.querySelectorAll(query);

        if(elements)
        {
            elements.forEach(element => {
                if (element.dataset.collective === undefined)
                {
                    addCollectBtnToElement(element);
                }
            });
        }
    }

    // Expedia Flight Search
    if (url.indexOf("//www.expedia.com/Flights-Search") >= 0) {
        //extractDom('flight-listing-container');

        setInterval(()=>{
            addCollectButtons('#flight-listing-container .offer-listing');
        }, 3000);
    }
    else if(url.indexOf("//www.kayak.com/flights") >= 0)
    {
        setInterval(()=>{
            addCollectButtons('div.inner-grid.keel-grid, div.Flights-Results-FlightResultItem');
        }, 3000);
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