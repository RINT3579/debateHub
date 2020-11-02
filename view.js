let d_Frame = document.getElementById('if_1');
let url

const chrome_localset = (key,key2,key3,key4,value,value2,value3,value4) => {
    chrome.storage.local.set({ [key] : value, [key2] : value2,[key3] : value3,[key4] : value4}, function () {
    });
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
    alert("PRを行いました")
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

