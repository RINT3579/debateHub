let code
let content;
let filename;

const pr_mode = () => {
    chrome.tabs.query( {active:true, currentWindow:true}, function(tabs){
        console.log("押された");
        chrome.tabs.sendMessage(tab[0].id, {
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