let code
let content;
let filename;

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.sendMessage(tab.id, {
            command: "CODESAVE"
        },
        function(msg) {
            code = msg;
            console.log("result:", code);

            chrome.tabs.create({
                url:"view.html",
                selected:true
            })
        });
});