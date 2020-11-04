const chrome_localset = (keys,values) => {
    chrome.storage.local.set({ [keys] : values}, function () {
    });
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
    chrome.tabs.query( {active:true, currentWindow:true}, function(tabs){
        const url = tabs[0].url;
        let URLa = decodeURIComponent(url);
        console.log('URLa',URLa);
        let URLb = URLa.split("https://");
        console.log('URLb',URLb);
        let URL = URLb[1].split("/");
        if (URL[3] === "pulls"){
            chrome.tabs.create({
                url:"diff.html",
                selected:true
            })
        }
        else {
            let status = document.getElementById('DIFF_status');
            status.innerHTML = "<p>プルリクエスト画面で使えます</p>";
        }
    })

}
document.getElementById('PR').addEventListener('click', pr_option);
document.getElementById('DIFF').addEventListener('click', diff_option);