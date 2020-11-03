let today;
let owner;
let name;
let email;
let repo;
let title;
let body;
let file;
let message;
let branch = 'tool_develop';
let token;
let content;

let refs = '';
let tree = '';
let blob = '';
let newtree = '';
let newcommit = '';

function date(date, format) {

    if (!format) {
        format = 'YYYY-MM-DDThh:mm:ssZ'
    }

    format = format.replace(/YYYY/g, date.getFullYear());
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
    format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
    format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
    format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));

    return format;
}

function sleep(waitMsec) {
    var startMsec = new Date();

    while (new Date() - startMsec < waitMsec);
}
const post_Pull = () =>{
    console.log("ここまでできてるか確認_範囲外(post_pull)",name,email,message,title,body,owner,token,repo,file,content);
}

const pull_Ready = () => {
     name = htmlspecialchars(document.getElementById('name').value);
     email = htmlspecialchars(document.getElementById('email').value);
     message = htmlspecialchars(document.getElementById('commit').value);
     title = htmlspecialchars(document.getElementById('PRtitle').value);
     body = htmlspecialchars(document.getElementById('PRcomment').value);
     chrome.storage.local.get(['user','token','repo','file','base64'], function(result) {
        owner = result.user;
        token = result.token;
        repo = result.repo;
        file = result.file;
        content = result.base64;
        post_Pull();
    });
}

document.getElementById('PR').addEventListener('click', pull_Ready);