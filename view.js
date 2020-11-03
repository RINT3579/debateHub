let d_Frame = document.getElementById('if_1');
let url

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



const htmlspecialchars = (str) =>{
    return (str + '').replace(/&/g,'&amp;')
        .replace(/"/g,'&quot;')
        .replace(/'/g,'&#039;')
        .replace(/</g,'&lt;')
        .replace(/>/g,'&gt;');
}

document.addEventListener('DOMContentLoaded', getPage);
