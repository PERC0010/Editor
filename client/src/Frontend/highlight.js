//En construcción
var caretIn = 0;
var caretCont;
function getRain(){
	document.getElementById("pre").innerHTML = "";
	//console.log(document.getElementById("pre").textContent)
}
function highLight(pre, e){
	//console.log(e);
	if(e.keyCode==13){
		console.log("en");
		return "perro";
	}
	saveCaret(pre);
	//console.log(pre.innerHTML);
	//pre.innerHTML=rainbow.colorSync(pre.textContent,'javascript')
	restoreCaret(pre);
	return true;
}
function getText(node){
	console.log(node);
	return node.innerHTML ? node.innerHTML.replace(/<div><br><\/div>/, '\n').replace(/<div>/, '\n').replace(/\<[^\<\>]+\>/g, ''): node;
}
function saveCaret(){
	var node = document.getElementById('pre');
	caretIn = 0;
	var conNode;
	var caretOff = window.getSelection().getRangeAt(0).startOffset;
	var caretNode = window.getSelection().getRangeAt(0).startContainer;
	var count = true;
	for(var i = 0; i < node.childNodes.length; i++){
		for(var j = 0; j < getText(node.childNodes[i]).length; j++){
			if(node.childNodes[i] == caretNode && j == caretOff){
				count = false;
			}
			caretIn = count ? caretIn + 1 : caretIn;
		}
	}
}
function restoreCaret(node){
	var index = 0;
	console.log(node.childNodes);
	for(var i = 0; i < node.childNodes.length; i++){
		for(var j = 0; j < getText(node.childNodes[i]).length; j++){
			if(index == caretIn){
				var selec = window.getSelection();
				selec.removeAllRanges();
				var ran = new Range();
				ran.setStart(node.childNodes[i], j);
				selec.addRange(ran);
			}
			index++;
		}
	}
}