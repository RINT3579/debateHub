function save_options(){
    const user = htmlspecialchars(document.getElementById('user').value);
    const token = htmlspecialchars(document.getElementById('token').value);

    chrome.storage.local.set({'user': user,'token':token}, function () {
    });
    let status = document.getElementById('status');
    status.innerHTML = "<p>保存しました</p>";
}
function restore_options () {
    chrome.storage.local.get({
        user: "",
        token:""
    }, function(already) {
        document.getElementById('user').value = already.user;
        document.getElementById('token').value = already.token;
    });
}

const htmlspecialchars = (str) =>{
    return (str + '').replace(/&/g,'&amp;')
        .replace(/"/g,'&quot;')
        .replace(/'/g,'&#039;')
        .replace(/</g,'&lt;')
        .replace(/>/g,'&gt;');
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);