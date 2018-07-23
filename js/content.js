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

    // Expedia Flight Search
    if (url.indexOf("//www.expedia.com/Flights-Search") >= 0) {
        extractDom('flight-listing-container');
    }
})();
