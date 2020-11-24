let head = '';
let body = '';
let base64content = '';
let result = '';
let element = '';

function sleep(waitMsec) {
    var startMsec = new Date();

    while (new Date() - startMsec < waitMsec);
}

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.command === "CODESAVE") {
        console.log("コードセーブが選ばれた");
        result = document.getElementsByTagName("*")[0].outerHTML;
        base64content = window.btoa(unescape(encodeURIComponent(result)));
        chrome.storage.local.set({'code': result,'base64':base64content}, function () {
        });
    }
    else if (msg.command === "FILENAME") {
        console.log("FILENAMEが選ばれた");
        result = document.getElementsByClassName("link-gray-dark")[1].title;
        console.log(result);
        chrome.storage.local.set({'file': result}, function () {
        });
    }
    else{
        result = 'SAVE_ERR';
    }
    sendResponse(result);

});