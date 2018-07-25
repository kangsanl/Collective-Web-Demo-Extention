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
                    apiSignature: "http://127.0.0.1:86/api/v1/picl_entities?url=" + url,
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
                    apiSignature: 'http://127.0.0.1:86/api/v1/entities?url=' + url,
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


