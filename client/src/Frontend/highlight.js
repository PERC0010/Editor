//En construcción
var caretIn = 0;
var caretCont;
function getRain(){
	document.getElementById("pre").innerHTML = "";
	console.log(document.getElementById("pre").textContent)
}
function highLight(pre, e){
	console.log(e);
	if(e.keyCode==13){
		console.log("en");
		return "perro";
	}
	saveCaret(pre);
	console.log(pre.innerHTML);
	//pre.innerHTML=rainbow.colorSync(pre.textContent,'javascript')
	restoreCaret(pre);
	return true;
}
function saveCaret(node){
	caretIn = 0;
	var conNode;
	var caretOff = window.getSelection().getRangeAt(0).startOffset;
	var caretNode = window.getSelection().getRangeAt(0).startContainer.textContent;
	var count = true;
	for(var i = 0; i < node.childNodes.length; i++){
		for(var j = 0; j < node.childNodes[i].textContent.length; j++){
			if(node.childNodes[i].textContent == (caretNode + "") && j == caretOff){
				count = false;
			}
			caretIn = count ? caretIn+1 : caretIn;
		}
	}
}
function restoreCaret(node){
	var index = 0;
	for(var i = 0; i < node.childNodes.length; i++){
		for(var j = 0; j < node.childNodes[i].textContent.length; j++){
			if(index == caretIn){
				var selec = window.getSelection();
				selec.removeAllRanges();
				var ran = new Range();
				ran.setStart(node.childNodes[i].childNodes.length == 0 ? node.childNodes[i] : node.childNodes[i].childNodes[0],j);
				selec.addRange(ran);
			}
			index++;
		}
	}
}
module.exports = function test(){
	console.log("test worked");
}


























