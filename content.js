let head = '';
let body = '';
let result = '';

function sleep(waitMsec) {
    var startMsec = new Date();

    while (new Date() - startMsec < waitMsec);
}

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.command === "CODESAVE") {
        body = document.getElementsByTagName("*")[0].outerHTML;
        result = body;
    }
    else{
        result = 'ERROR';
    }

    chrome.storage.local.set({'code': result}, function () {
    });

    sleep(1000);

    sendResponse(result);

});