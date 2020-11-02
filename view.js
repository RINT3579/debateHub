let d_Frame = document.getElementById('if_1');
let url

function getPage () {
    chrome.storage.local.get(['code'], function(result) {
        console.log('Value currently is ' + result.code);
        let code = result.code;
        let blob = new Blob([code], { type: 'text/html' });
        url = URL.createObjectURL(blob);
        d_Frame.src = url;
    });
}



document.addEventListener('DOMContentLoaded', getPage);

