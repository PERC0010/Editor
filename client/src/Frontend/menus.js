function updateProjectDiv(){
    let div = document.getElementById('projectDiv')
    div.innerHTML = `
        ${div.project.name}
    `
    let nDiv = document.createElement('div')
    nDiv.innerHTML += div.project.files ? getDivFromFiles(div.project.files) : ``
    div.appendChild(nDiv) 
}
function getDivFromFiles(files){
    let out = ``;
    if(files.data){
        out = `
            <div class='collapsible' onclick='setCrtFile(${files.isText ? `event`: `null`})' id='${files.id}'>${files.nameExtension}</div>
        `;
    }else{
        out += `
            <div class='collapsible' id='${files.id}'><span onclick='showChilds(event)'>+</span>${files.name}
        `;
        files.files.forEach(f => {
            out += getDivFromFiles(f);
        });
        out += `</div>`
    }
    return out;
}
function showChilds(e){
    e.srcElement.innerHTML = e.srcElement.innerHTML == '+' ? '-' : '+';
    let node = e.srcElement.parentNode;
    node.childNodes.forEach(chl => {
        if(chl.classList && chl.classList.contains('collapsible')){
            chl.style.display = chl.style.display == 'block' ? 'none' : 'block';
        }
    });
}
function updateUserDiv(){
    let div = document.getElementById('userDiv')
    div.innerHTML = `
        <i>Guest${div.user.id}</i>
    `
}
function setCrtFile(e){
    console.log(e)
    document.getElementById('userDiv').user.crtFile = e == null ? '' : e.srcElement.id;
    updateCrtFile();
}
function updateCrtFile(){
    console.log(document.getElementById('userDiv').user.crtFile);
    if(document.getElementById('userDiv').user.crtFile != ''){
        saveCaret();
        let crtFileData = getFile(document.getElementById('userDiv').user.crtFile, document.getElementById('projectDiv').project.files)
        console.log(crtFileData)
        document.getElementById('pre').innerHTML = crtFileData;
        restoreCaret();
    }
}
function getFile(id, dir){
    console.log(0)
    let out = null;
    if(dir.data){
        if(dir.id == id){
            //console.log(dir.data)
            out = dir.data
        }
    }else{
        dir.files.forEach(f => {
            let d = getFile(id, f);
            console.log('D',d);
            if(d != null){
                //console.log('Pass');
                out = d;
                console.log('Out', out)
            }
        });
        console.log('Out', out)
    }
    console.log('Out',out)
    return out;
}