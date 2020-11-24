let code
let content;
let filename;


chrome.runtime.onInstalled.addListener(function (details) {
    console.log(details.reason);

    chrome.runtime.openOptionsPage(function () {
        alert("初期設定を行ってください");
    })

});