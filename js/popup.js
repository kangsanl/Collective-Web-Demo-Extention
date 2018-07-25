// get the buttons by id
let showGraphInfo = document.getElementById('ShowGraphInfo');

(()=>{
    var newTab = document.getElementById('openPersonalKnowledgeGraphPage');
    newTab.addEventListener('click', () => {
        browser.tabs.create({
            url:"template/personalGraph.html"});
    });
})();