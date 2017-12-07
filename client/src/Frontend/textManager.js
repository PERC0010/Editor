var ed = document.getElementById('pre');
var patterns = [
        //         {
        //             name: 'keyword.operator',
        //             pattern: /\=|\+/g
        //         },
        //         {
        //             name: 'keyword.dot',
        //             pattern: /\./g
        //         }
        //     ],
        //     2: {
        //         name: 'string',
        //         matches: {
        //             name: 'constant.character.escape',
        //             pattern: /\\('|"){1}/g
        //         }
        //     }
        // },
        // pattern: /(\(|\s|\[|\=|:|\+|\.|\{|,)(('|")([^\\\1]|\\.)*?(\3))/gm
    // },
    {
        name: 'comment',
        pattern: /\/\*[\s\S]*?\*\/|(\/\/|\#)(?!.*('|").*?[^:](\/\/|\#)).*?$/gm
    },
    {
        name: 'constant.numeric',
        pattern: /\b(\d+(\.\d+)?(e(\+|\-)?\d+)?(f|d)?|0x[\da-f]+)\b/gi
    },
    {
        name: 'keyword',
        pattern: /\b(and|array|as|b(ool(ean)?|reak)|c(ase|atch|har|lass|on(st|tinue))|d(ef|elete|o(uble)?)|e(cho|lse(if)?|xit|xtends|xcept)|f(inally|loat|or(each)?|unction)|global|if|import|int(eger)?|long|new|object|or|pr(int|ivate|otected)|public|return|self|st(ring|ruct|atic)|switch|th(en|is|row)|try|(un)?signed|var|void|while)(?=\b)/gi
    },
    {
        name: 'constant.language',
        pattern: /true|false|null/g
    },
    {
        name: 'keyword.operator',
        pattern: /\+|\!|\-|&(gt|lt|amp);|\||\*|\=/g
    },
    {
        name: 'function.call',
        pattern: /(\w+?)(?=\()/g
    },
    // {
    //     matches: {
    //         1: 'storage.function',
    //         2: 'entity.name.function'
    //     },
    //     pattern: /(function)\s(.*?)(?=\()/g
    // }
];
var caretIn = 0;
var caretCont;
function highlight(text){
    var out = text;
    console.log('Antes', out);
	patterns.forEach(pat => {
			out = out.replace(pat.pattern, (match) => {
                console.log('Replacing',`<span class='${pat.name}'> ${match} </span>`);
                return `<span class='${pat.name}'> ${match} </span>`;
            });
	});
    //sendCrtCont();
    console.log('Despues', out);
	return out;
}
function getText(node){
	//console.log(node);
    return (node && node.innerHTML) ? node.innerHTML.replace(/<div><br><\/div>/, '\n')
    .replace(/<div>/, '\n')
    .replace(/\<[^\<\>]+\>/g, '')
    .replace(/\&lt\;/, '<')
    .replace(/\&gt\;/, '>'): node;
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
function restoreCaret(){
	var node = document.getElementById('pre');
	var index = 0;
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