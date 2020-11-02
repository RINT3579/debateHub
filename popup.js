const pr_option = () => {
    console.log("正常動作");
    chrome.tabs.query( {active:true, currentWindow:true}, function(tabs){
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