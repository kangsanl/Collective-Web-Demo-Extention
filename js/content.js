const EXPEDIA = "//www.expedia.com/Flights-Search";
const KAYAK = "//www.kayak.com";
const TRIP_ADVISOR = "//www.kayak.com";

// get the URL of the page
(function(){
    var url = document.location.href; 

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

                // user clicked the button - notify server
                notifyServer(selectedList);
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
    if (url.indexOf(EXPEDIA) >= 0) {
        setInterval(()=>{
            console.log("timer fired");
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

function notifyServer(targetElement) {
    console.log("sending message");
    browser.runtime.sendMessage({
        "msgType": "extractEntities",
        "regionOfInterest": targetElement.textContent
    });
    console.log("sent message");
    console.log(targetElement.textContent);
}
