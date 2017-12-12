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
    var classes = {};
    var matches = [];
	patterns.forEach(pat => {
        var match = out.match(pat.pattern);
        match = match == null ? '' : match;
        for(var i = 0; i < match.length; i++){
            matches.push(match[i]);
            classes[match[i]] = pat.name;
        }
        if(match.length < 0){
            matches.push(match);
            classes[match] = pat.name;
        }
    });
    if(matches.length > 0){
        matches = matches.join('|');
        out = out.replace(new RegExp(matches, 'g'), (match) => {
            return `<span class='${classes[match]}'>${match}</span>`;
        });
    }
    //sendCrtCont();
	return out;
}
function getText(node){
    if(node.innerHTML || node.innerHTML == ""){
        return node.innerHTML.replace(/<div><br><\/div>/, '\n')
        .replace(/<div>/, '\n')
        .replace(/\<[^\<\>]+\>/g, '')
        .replace(/\&lt\;/, '<')
        .replace(/\&gt\;/, '>');
    }else{
        return node;
    }
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
    var crtN;
	for(var i = 0; i < node.childNodes.length; i++){
		for(var j = 0; j < node.childNodes[i].textContent.length; j++){
            crtN = node.childNodes[i];
			if(index == caretIn){
				var selec = window.getSelection();
				selec.removeAllRanges();
                var ran = new Range();
                console.log('Set',crtN, j);
				ran.setStart(crtN, j);
                selec.addRange(ran);
			}
			index++;
		}
    }
    if(index <= caretIn){
        var selec = window.getSelection();
        selec.removeAllRanges();
        var ran = new Range();
        if(crtN){
            ran.setStart(crtN, crtN.length);
        }else{
            ran.setStart(node, 0);
        }
        selec.addRange(ran);
    }
}