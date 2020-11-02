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
        console.log('URLa',URLa);
        let URLb = URLa.split("github.io/");
        console.log('URLb',URLb);
        var URL = URLb[1].split("/");
        chrome_localset('repo',URL[0]);
        chrome_localset('file',URL[1]);

        console.log("押された");
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
    })
}
const diff_option = () => {



}
document.getElementById('PR').addEventListener('click', pr_option);
document.getElementById('DIFF').addEventListener('click', diff_option);