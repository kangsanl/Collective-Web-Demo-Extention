// get the URL of the page
(function(){
    var url = document.location.href; 
    //var collectedHotels = [];

    function addCollectButtons(query, type)
    {
        function addCollectBtnToElement(element)
        {
            // This is for Expedia and Kayak
            function OnCollectBtnClickForList(element)
            {
                var button = this;
                var selectedList = button.parentElement;
                // remove button after clicking
                selectedList.removeChild(button);

                //console.log(selectedList.textContent);

                console.log("sending message");
                browser.runtime.sendMessage({
                    msgType: "extractEntities",
                    type: 'post',
                    apiSignature: "http://127.0.0.1:86/api/v1/picl_entities?url=" + encodeURIComponent(url),
                    body: selectedList.textContent
                });
                console.log("message sent");
            }

            // This is for Trip Advisor
            function OnCollectBtnClickForPage(element)
            {
                var button = this;
                var selectedList = button.parentElement;
                // remove button after clicking
                selectedList.removeChild(button);
                console.log(url);

                console.log("sending message");
                browser.runtime.sendMessage({
                    msgType: "extractEntities",
                    type: 'get',
                    apiSignature: 'http://127.0.0.1:86/api/v1/entities?url=' + encodeURIComponent(url),
                    body: null
                });
                console.log("message sent");
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

            if (type === 'list')
            {
                button.addEventListener("click", OnCollectBtnClickForList);
            }
            else if (type === 'page')
            {
                button.addEventListener("click", OnCollectBtnClickForPage);
            }
            else{
                throw new Error();
            }

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
        setInterval(()=>{
            console.log("timer fired");
            addCollectButtons('#flight-listing-container .offer-listing', 'list');
        }, 3000);
    }
    else if (url.indexOf("//www.expedia.com/") >= 0) {
        setTimeout(() => {
            getInsights();
        }, 3000);
    }
    else if(url.indexOf("//www.kayak.com/flights") >= 0)
    {
        setInterval(()=>{
            addCollectButtons('div.inner-grid.keel-grid, div.Flights-Results-FlightResultItem', 'list');
        }, 3000);
    }
    else if(url.indexOf("//www.tripadvisor.com/Hotel_Review"))
    {
        setTimeout(()=>{
            addCollectButtons('.hotelDescription', 'page');
        }, 3000);
    }
})();


function getInsights() {
    console.log("sending message");
    var url = document.location.href; 
    browser.runtime.sendMessage({
        msgType: "insights",
        type: 'get',
        apiSignature: 'http://127.0.0.1:86/api/v1/insights?url=' + encodeURIComponent(url),
        body: null
    }, function (response) {
        console.log("response");
        console.log(response);
        var parsedResponse = JSON.parse(response);

        console.log(parsedResponse.StartDate);
        console.log(parsedResponse.EndDate);
        console.log(parsedResponse.StartDestination);
        console.log(parsedResponse.EndDestination);

        var startDate = new Date(parsedResponse.StartDate);
        var startDateStr = (startDate.getMonth() + 1) + '/' + startDate.getDate() + '/' + (startDate.getFullYear());
        var endDate = new Date(parsedResponse.EndDate);
        var endDateStr = (endDate.getMonth() + 1) + '/' + endDate.getDate() + '/' + (endDate.getFullYear());

        console.log(startDateStr);
        console.log(endDateStr);

        // Set values based on Insight
        document.getElementById("flight-departing-hp-flight").value = startDateStr;
        document.getElementById("flight-returning-hp-flight").value = endDateStr;
        document.getElementById("flight-origin-hp-flight").value = parsedResponse.StartDestination;
        document.getElementById("flight-destination-hp-flight").value = parsedResponse.EndDestination;
        console.log("insights set");
    });
    console.log("message sent");
}