function save_options(){
    const user = htmlspecialchars(document.getElementById('user').value);
    const token = htmlspecialchars(document.getElementById('token').value);
    chrome.storage.local.set({'user': user}, function () {
    });
    chrome.storage.local.set({'token': token}, function () {
    });
    let status = document.getElementById('status')
    status.innerHTML = '<p>内容を保存しました<p>'
}
function restore_options () {
    chrome.storage.local.get({
        user: ""
    }, function(already) {
        document.getElementById('user').value = already.user;
    });
    chrome.storage.local.get({
        token: ""
    }, function(already) {
        document.getElementById('token').value = already.token;
    });
}

function htmlspecialchars(str){
    return (str + '').replace(/&/g,'&amp;')
        .replace(/"/g,'&quot;')
        .replace(/'/g,'&#039;')
        .replace(/</g,'&lt;')
        .replace(/>/g,'&gt;');
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);