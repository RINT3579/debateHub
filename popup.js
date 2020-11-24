
let filename;

const chrome_localset = (keys,values) => {
    chrome.storage.local.set({ [keys] : values}, function () {
    });
}

function sleep(waitMsec) {
    var startMsec = new Date();

    while (new Date() - startMsec < waitMsec);
}

const htmlspecialchars = (str) =>{
    return (str + '').replace(/&/g,'&amp;')
        .replace(/"/g,'&quot;')
        .replace(/'/g,'&#039;')
        .replace(/</g,'&lt;')
        .replace(/>/g,'&gt;');
}

const pr_option = () => {
    console.log("正常動作");
    chrome.tabs.query( {active:true, currentWindow:true}, function(tabs){
        const url = tabs[0].url;
        let URLa = decodeURIComponent(url);
        if (URLa.match(/github.io/)){
            console.log('URLa',URLa);
            let URLb = URLa.split("github.io/");
            console.log('URLb',URLb);
            var URL = URLb[1].split("/");
            chrome_localset('repo',URL[0]);
            chrome_localset('file',URL[1]);

            chrome.tabs.sendMessage(tabs[0].id, {
                    command: "CODESAVE"
                },
                function(msg) {
                    code = msg;
                    console.log("result:", code);
                    sleep(1000);

                    chrome.tabs.create({
                        url:"view.html",
                        selected:true
                    })
                });
        }
        else {
            let status = document.getElementById('PR_status');
            status.innerHTML = "<p>GitHubPagesで利用できます</p>";
        }
    })
}
const diff_option = () => {
    console.log("差分機能が選択されました");
    chrome.tabs.query( {active:true, currentWindow:true}, function(req){
        const url_ = req[0].url;
        let URLa_ = decodeURIComponent(url_);
        console.log('URLa',URLa_);
        let URLb_ = URLa_.split("https://");
        console.log('URLb',URLb_);
        let URL_ = URLb_[1].split("/");
        chrome_localset('repo',URL_[2]);
        console.log('URL',URL_);

        if (URL_[5] === "files"){
            chrome.tabs.sendMessage(req[0].id, {
                    command: "FILENAME"
                },
                function(msg) {
                    filename = msg;
                    console.log("filename_result:", filename);
                    sleep(1000);

                    chrome.tabs.create({
                        url:"diff.html",
                       selected:true
                    })
                });
        }
        else {
            let status = document.getElementById('DIFF_status');
            status.innerHTML = "<p>プルリクエスト画面の</p>" +
                               "<p><b>Files Changed</b>タブで</p>" +
                               "<p>利用できます</p>";
        }
    })

}
document.getElementById('PR').addEventListener('click', pr_option);
document.getElementById('DIFF').addEventListener('click', diff_option);