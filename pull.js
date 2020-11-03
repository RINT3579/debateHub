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

const getRef = (owner,repo,branch,token) => {
    let request = new XMLHttpRequest();
    request.open('GET', 'https://api.github.com/repos/'+owner+'/'+repo+'/git/refs/heads/'+branch+' ', true);
    request.setRequestHeader(
        'Authorization',
        "token" + token
    );
    request.responseType = 'json';
    request.send();
    return request;
}

const getCommit = (owner,repo,ref,token) => {
    let request = new XMLHttpRequest();
    request.open('GET', 'https://api.github.com/repos/' + owner + '/' + repo + '/git/commits/' + ref +' ', true);

    request.setRequestHeader(
        'Authorization',
        "token" + token
    );
    request.responseType = 'json';
    request.send();
    return request;
}
const makeBlob = (owner,repo,content,token) => {
    let request = new XMLHttpRequest();
    request.open('POST', 'https://api.github.com/repos/' + owner + '/' + repo + '/git/blobs', true);

    request.setRequestHeader(
        'Authorization',
        "token "+ token
    );
    request.responseType = 'json';
    const parameters = '{"content":"'+ token +'","encoding":"base64"}';
    request.send(parameters);
    return request;
}

const makeTree = (owner,repo,file,token,tree,blob) => {
    let request = new XMLHttpRequest();
    request.open('POST', 'https://api.github.com/repos/' + owner + '/' + repo + '/git/trees', true);

    request.setRequestHeader(
        'Authorization',
        "token "+ token
    );
    request.responseType = 'json';
    const parameters = '{"base_tree":"'+ tree +'","tree": [{"path": "'+file+'","mode":"100644","type": "blob","sha":"'+blob+'"}]}';
    request.send(parameters);
    return request;
}

const makeCommit = (owner,repo,token,name,email,message,refs,newtree,today) => {
    let request = new XMLHttpRequest();
    request.open('POST', 'https://api.github.com/repos/' + owner + '/' + repo + '/git/commits', true);

    request.setRequestHeader(
        'Authorization',
        "token "+ token
    );
    request.responseType = 'json';
    const parameters = '{"message":"'+message+'","author":{"name":"'+name+'","email":"'+email+'","date":"'+today+'"},"parents":["'+refs+'"],"tree":"'+newtree+'"}';
    request.send(parameters);
    return request;
}

const lodeRef = (owner,repo,token,newcommit,branch) => {
    let request = new XMLHttpRequest();
    request.open('PATCH', 'https://api.github.com/repos/' + owner + '/' + repo + '/git/refs/heads/'+branch, true);

    request.setRequestHeader(
        'Authorization',
        "token "+ token
    );
    request.responseType = 'json';
    const parameters = '{"sha":"'+newcommit+'","force":false}';
    request.send(parameters);
    return request;
}

const pullRequest = (owner,repo,token,title,body,branch) => {
    let request = new XMLHttpRequest();
    request.open('POST', 'https://api.github.com/repos/' + owner + '/' + repo + '/pulls', true);
    console.log("HP DEBUG",'POST', 'https://api.github.com/repos/' + owner + '/' + repo + '/pulls');

    request.setRequestHeader(
        'Authorization',
        "token "+ token
    );
    request.responseType = 'json';
    const parameters = '{"title":"'+title+'","body":"'+body+'","head":"'+owner+':'+branch+'","base":"main"}';
    console.log("HP DEBUG",parameters);
    request.send(parameters);
    return request;
}




function sleep(waitMsec) {
    var startMsec = new Date();

    while (new Date() - startMsec < waitMsec);
}
const post_Pull = () =>{
    //console.log("ここまでできてるか確認_範囲外(post_pull)",name,email,message,title,body,owner,token,repo,file,content);

    const refGet = getRef(owner,repo,branch,token);

    refGet.onload = function() {
        const refData = this.response;
        const object = refData.object;
        refs = object.sha;
        console.log("ref",refs);

        const commitGet = getCommit(owner,repo,refs,token);
        commitGet.onload = function () {
            const commitData = this.response;
            const treeData = commitData.tree;
            tree = treeData.sha;
            console.log(commitData);
            console.log(tree);

            const blobMake = makeBlob(owner,repo,content,token);
            blobMake.onload = function () {
                const blobData = this.response;
                blob = blobData.sha;
                console.log(blobData);
                console.log(blob);

                const treeMake = makeTree(owner,repo,file,token,tree,blob);
                treeMake.onload = function () {
                    const treeData = this.response;
                    newtree = treeData.sha;
                    console.log(treeData);
                    console.log(newtree);

                    const commitMake = makeCommit(owner,repo,token,name,email,message,refs,newtree,today);
                    commitMake.onload = function(){
                        const commitData = this.response;
                        newcommit = commitData.sha;
                        console.log(commitData);
                        console.log(newcommit);

                        const refLode = lodeRef(owner,repo,token,newcommit,branch);
                        refLode.onload = function(){
                            const refData = this.response;
                            console.log(refData);

                            const pullrequest = pullRequest(owner,repo,token,title,body,branch);
                            pullrequest.onload = function(){
                                const pullrequestData = this.response;
                                console.log(pullrequestData);
                            }
                        }
                    }
                }
            }
        }
    }






}

const pull_Ready = () => {
     today = date(new Date(), 'YYYY-MM-DDThh:mm:ssZ');
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