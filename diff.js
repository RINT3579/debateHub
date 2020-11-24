let owner = '';
let repo = '';
let file = '';
let M_branch = 'main';
let branch = 'tool_develop';
let request1;
let request2;


const openRequest = (owner,repo,file,branch,token) => {
    let request = new XMLHttpRequest();
    request.open('GET', 'https://api.github.com/repos/'+owner+'/'
        +repo+'/contents/'+file+'?ref='+branch+' ', true);

    request.setRequestHeader(
        'Authorization',
        "token "+ token
    );
    request.responseType = 'json';
    request.send();

    return request;
}

const base64Decode = ( str )  => {
    str = str.replace(/\s/g, '');
    return decodeURIComponent(escape(window.atob( str )));
}

const pageCreate = (decoded) => {
    let blob = new Blob([decoded], { type: 'text/html' });
    let url = URL.createObjectURL(blob);
    return url;
}

const get_diff = () => {
    chrome.storage.local.get(['user','token','repo','file','base64'], function(result) {
        owner = result.user;
        token = result.token;
        repo = result.repo;
        file = result.file;

        console.log("取れてるか確認",owner,token,repo,file,branch,M_branch);

        request1 = openRequest(owner, repo, file, branch,token);
        request2 = openRequest(owner, repo, file, M_branch,token);

        request1.onload = function() {
            const data = this.response;
            const decoded = base64Decode(data.content);
            let d_Frame = document.getElementById('if_1');
            d_Frame.src = pageCreate(decoded);
        };
        request2.onload = function() {
            const data = this.response;
            const decoded = base64Decode(data.content);
            let d_Frame = document.getElementById('if_2');
            d_Frame.src = pageCreate(decoded);
        };
    });
}

document.addEventListener('DOMContentLoaded', get_diff);