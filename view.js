let d_Frame = document.getElementById('if_1');
let url

let username;
let token;

let commit_username;
let email;
let repo;
let commit_message;
let filename;
let pr_title;

let file_code;

function sleep(waitMsec) {
    var startMsec = new Date();

    while (new Date() - startMsec < waitMsec);
}

const chrome_localset = (key,key2,key3,key4,value,value2,value3,value4) => {
    chrome.storage.local.set({ [key] : value, [key2] : value2,[key3] : value3,[key4] : value4}, function () {
    });
}

const pull_chrome_get = () => {
    chrome.storage.local.get(["user", "token", "name","email","repo","commit","file","PRtitle"], function (value) {
        username = value.user;
        token = value.token;

        commit_username = value.name;
        email = value.email;
        repo = value.repo;
        commit_message = value.commit;
        filename = value.file;
        pr_title = value.PRtitle;

        sleep(1000);
    });
}
const pull_process = () =>{
    pull_chrome_get;

}
const restore_option = () => {
    chrome.storage.local.get({
        name: "",
        email:""
    }, function(already) {
        document.getElementById('name').value = already.name;
        document.getElementById('email').value = already.email;
    });
}
const getPage =  () => {
    restore_option();
    chrome.storage.local.get(['code'], function(result) {
        console.log('viewCode ' + result.code);
        let code = result.code;
        let blob = new Blob([code], { type: 'text/html' });
        url = URL.createObjectURL(blob);
        d_Frame.src = url;
    });
}

const post_pullrequest = () => {
    const name = htmlspecialchars(document.getElementById('name').value);
    const email = htmlspecialchars(document.getElementById('email').value);
    const commit = htmlspecialchars(document.getElementById('commit').value);
    const PRtitle = htmlspecialchars(document.getElementById('PRtitle').value);
    chrome_localset('name','email','commit','PRtitle',name,email,commit,PRtitle);
    alert("PRを行いました");
    pull_process();
}

const htmlspecialchars = (str) =>{
    return (str + '').replace(/&/g,'&amp;')
        .replace(/"/g,'&quot;')
        .replace(/'/g,'&#039;')
        .replace(/</g,'&lt;')
        .replace(/>/g,'&gt;');
}

document.addEventListener('DOMContentLoaded', getPage);
document.getElementById('PR').addEventListener('click', post_pullrequest);

