let head = '';
let body = '';
let base64content = '';
let result = '';

function sleep(waitMsec) {
    var startMsec = new Date();

    while (new Date() - startMsec < waitMsec);
}

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.command === "CODESAVE") {
        result = document.getElementsByTagName("*")[0].outerHTML;
        base64content = window.btoa(unescape(encodeURIComponent(result)));
        chrome.storage.local.set({'code': result,'base64':base64content}, function () {
        });
    }
    else{
        result = 'SAVE_ERR';
    }
    sleep(1000);
    sendResponse(result);

});