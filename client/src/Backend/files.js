//Los comentarios están en español, entonces ahora todos tienen que estar en español
var app = require('electron').remote;
var fs = require('fs');
var dialog = app.dialog;
var imgExtensions = ['png', 'jpg', 'gif'];
var fileExtensions = ['js', 'java', 'html'];
document.addEventListener('drop', function (e) {
    e.preventDefault();
    e.stopPropagation();

    var path = e.dataTransfer.files[0].path;
    var isDir = fs.statSync(path).isDirectory();
    //Esta variable va a ser la carpeta transformada de sólo el path a un array
    var dir = getObjFromPath(path);
    addFilesToProject(dir)
});
document.addEventListener('dragover', function (e) {
    e.preventDefault();
    e.stopPropagation();
});

// document.getElementById('down').addEventListener( 'click', function (e) {
// 	var textToSave = document.getElementById('pre').textContent;
// 	dialog.showSaveDialog( (selPath) => {
// 		fs.writeFile(selPath, textToSave, (err) => {
// 			if(err){
// 				console.log(err);
// 				alert("No funcionó");
// 			}
// 		});
// 	});
// });
function getObjFromPath(p){
    if(fs.statSync(p).isDirectory()){
        //Si es una carpeta
        //Crea el objeto de salida, que tiene de propiedades el nombre de la carpeta y un array con todos los archivos y subcarpetas que contiene
        var out = {name : p.split('/').pop(), files: []};
        var files= fs.readdirSync(p);
        //Mira cada archivo y agrégalo en forma de objeto
        files.forEach((f) => {
            var np = p + "/" + f;
            //Recursión (｡◕ ‿ ◕｡)
            var child = getObjFromPath(np);
            if(child != null){
                out.files.push(getObjFromPath(np));
            }
        });
        return out;
    }else{
        //Si no es una carpeta
        //Extención del archivo
        var nameEx = p.split('/').pop();
        //Crea el objeto de salida que tiene de propiedades el nombre del archivo, la información, su extensión y el nombre y la extensión juntos
        var out = {name : nameEx.split('.')[0], data : "", extension : nameEx.split('.').pop(), nameExtension: nameEx};
        //Si el archivo es de texto (ej. js, java), codificalo en utf-8, si es de imagen, en base64, si no es de ninguno de esos entonces no está soportado
        var encod = fileExtensions.indexOf(out.extension) >= 0 ? 'utf-8' : imgExtensions.indexOf(out.extension) >= 0 ? 'binary' : '';
        if(encod == ''){
            //alert('El archivo ' + out.nameExtension + ' no pudo ser agredado debido a que tiene una extesión aún no soportada. Contacta a los desarrolladores para obtener más información.');
            return null;
        }
        out.isText = encod == 'utf-8' ? true : false;
        data = fs.readFileSync(p, encod);
        out.data = data;
        out.id = '' + Math.floor(Math.random() * 99999999)
        return out;
    }
}
