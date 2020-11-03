let username;
let token;

let commit_username;
let email;
let repo;
let commit_message;
let filename;
let pr_title;
let pr_comment
var datas
let file_code;

function sleep(waitMsec) {
    var startMsec = new Date();

    while (new Date() - startMsec < waitMsec);
}
const chrome_localset = (key,key2,key3,key4,key5,value,value2,value3,value4,value5) => {
    chrome.storage.local.set({ [key] : value, [key2] : value2,[key3] : value3,[key4] : value4,[key5]:value5}, function () {
    });
}

const pull_chrome_get = () => {
    chrome.storage.local.get(["user","token","name","email","repo","commit","file","PRtitle","PRcomment"], function (value) {
        username = value.user;
        token = value.token;
        commit_username = value.name;
        email = value.email;
        repo = value.repo;
        commit_message = value.commit;
        filename = value.file;
        pr_title = value.PRtitle;
        pr_comment = value.PRcomment;
    });
}

const post_pullrequest = () => {
    const name = htmlspecialchars(document.getElementById('name').value);
    const email = htmlspecialchars(document.getElementById('email').value);
    const commit = htmlspecialchars(document.getElementById('commit').value);
    const PRtitle = htmlspecialchars(document.getElementById('PRtitle').value);
    const PRcomment = htmlspecialchars(document.getElementById('PRcomment').value);
    console.log("プル前に情報が取れるか",name,email);
    chrome_localset('name','email','commit','PRtitle','PRcomment',name,email,commit,PRtitle,PRcomment);
    alert("PRを行いました");
    pull_chrome_get();
    sleep(0);
    console.log(email,repo,filename);
}

document.getElementById('PR').addEventListener('click', post_pullrequest);