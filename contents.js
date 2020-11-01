chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.command === "CODEPICK") {
        //head = document.doctype;
        body = document.getElementsByTagName("*")[0].outerHTML;

        //result = head + body;
        result = body;

        chrome.storage.local.set({'PICKCODE': result}, function () {});
    }
    else{
        result = 'ERROR';
    }
    sendResponse(result);
});