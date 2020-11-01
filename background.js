'use strict';


chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        id: "PR",
        title: "変更点をプルリクエスト",
        contexts: ["all"],
        type: "normal",
    }, function () {
    });
    chrome.contextMenus.create({
        id: "Diff",
        title: "差分機能を使用する",
        contexts: ["all"],
        type: "normal",
    }, function () {
        alert("設定画面からGitHubトークンの入力とユーザー名を入れてください");
        //ここに設定画面のダイレクトを設定する

    });
});

chrome.contextMenus.onClicked.addListener(function (info,tab) {
    const selectedMenu = info.menuItemId;

    switch (selectedMenu) {　

        case 'PR':
            getPRHandler(tab);
            break;

        case 'Diff':
            getDiffHandler()
            break;
    }
});





const getPRHandler =(tab) => {
    chrome.tabs.sendMessage(tab.id, {
            command: "CODEPICK"
        },
        function(msg) {
            console.log("result:", msg);
            chrome.tabs.create({
                selected: true,
                url: 'PullRequest.html'
            });
        });
}

const getDiffHandler = () => {

}

