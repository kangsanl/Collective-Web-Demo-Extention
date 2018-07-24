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
                console.log(targetElement);
            }
        }, 3000); // wait for 3 sec till the page is fully loaded
    }

    function addCollectiveButtons(query)
    {
        function addCollectiveBtnToElement(element)
        {
            var button = document.createElement("Button");
            button.textContent = '+';
            button.classList.add('collectiveBtn');
            button.style.margin = '0px 0px 0px 0px';
            button.style.position = 'absolute';
            button.style.top = '-15px';
            button.style.right = '-15px';
            button.style.width = '30px';
            button.style.height = '30px';
            button.style.backgroundColor = 'greenYellow';
            button.style.zIndex = '9999';

            element.appendChild(button);
        }

        var elements = document.querySelectorAll(query);

        if(elements)
        {
            elements.forEach(element => {
                addCollectiveBtnToElement(element)
            });
        }
    }

    // Expedia Flight Search
    if (url.indexOf("//www.expedia.com/Flights-Search") >= 0) {
        extractDom('flight-listing-container');

        setTimeout(()=>{
            addCollectiveButtons('#flight-listing-container .offer-listing');
        }, 3000);
    }
})();
