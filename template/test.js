console.log('test.js');
(() => {
    var button = document.getElementById('test');
    button.addEventListener('click', function(){
        console.log('button clicked');
    });
})();