/******************************************************************
Optional: php.js --> http://phpjs.org/functions/array_keys:324
******************************************************************/
function json2HtmlTable(arrParams) {
/******************************************************************
Input:
arrParams = {
	arrJsonData		: array,
	arrKeys			: array, 
	arrTableAttr	: array,
	bOnlyHead		: boolean [false],
	bOnlyBody		: boolean [false],
	bNoTableWrap	: boolean [false]
}
example:
arrParams = {
	arrJsonData		: {
						"COD_PRODUCTO":["00000000000000000002"],
						"C&oacute;digo":[""],
						"Descripci&oacute;n":["Sastre manga 3\/4"],
						"Categor&iacute;a":["Sastres"],
						"Colecci&oacute;n":["OTONIO 2010"],
						"Modelo":["DANIELLA"],
						"Talla":["L"],
						"Color":["AZUL MARINO"],
						"COLORHEX":["#0000ff"],
						"Tela":[""],
						"Vendido":["29"]
					},
	arrKeys			: ['C&oacute;digo','Descripci&oacute;n','Categor&iacute;a','Colecci&oacute;n','Modelo','Talla', 'Color','Tela','Vendido'], 
	arrTableAttr	: {
		'id'	: 'myTableId'
	}
}

********************************************************************/ 
    //Patterns for table thead & tbody
    var sTable = "",
	th = "<thead>{0}</thead>",
	tb = "<tbody>{0}</tbody>",
	tr = "<tr>{0}</tr>",
	thRow = "<th>{0}</th>",
	tdRow = "<td>{0}</td>",
	thCon = "",
	tbCon = "",
	trCon = "",
	sAttr = '', arrTableAttr, 
	bOnlyHead 		= (typeof arrParams['bOnlyHead'] !== 'undefined') ? arrParams['bOnlyHead'] : false,
	bOnlyBody 		= (typeof arrParams['bOnlyBody'] !== 'undefined') ? arrParams['bOnlyBody'] : false,
	bNoTableWrap 	= (typeof arrParams['bNoTableWrap'] !== 'undefined') ? arrParams['bNoTableWrap'] : false;
	
	
	String.prototype.format = function(sParam1,sParam2){
		var sS = this.replace(/\{0\}/, sParam1);
		return typeof sParam2 != 'undefined' ? sS.replace(/\{1\}/, sParam2) : sS;
	};
	
	if(arrParams['arrTableAttr']!='undefined'){
		arrTableAttr = arrParams['arrTableAttr'];
		for(sTableAttr in arrTableAttr){
			sAttr += sTableAttr+'="'+arrTableAttr[sTableAttr]+'"';
		}
	}
	if(bNoTableWrap===false){
		sTable += '<table {0} >';
		sTable = sTable.format(sAttr);
		sTable += '{0}{1}</table>';
	}
	console.warn('sTable:',sTable,' bNoTableWrap:',bNoTableWrap);
	
    if (typeof arrParams['arrJsonData'] !== 'undefined') {
        //Creating all table headers			
		var arrJsonData = arrParams['arrJsonData'],
		arrKeys = typeof arrParams['arrKeys'] !== 'undefined' 
					? arrParams['arrKeys'] 
					: (
						(typeof window.array_keys == 'function')
							? array_keys(arrJsonData) // http://phpjs.org/functions/array_keys:324
							: []
						),
		nMax = arrKeys.length,
		nI = nMax, nJ, sTempHead, nMax0, nK, nL;
		console.log(arrKeys);
		if(typeof arrJsonData[arrKeys[0]] !== 'undefined'){
			nMax0 = arrJsonData[arrKeys[0]].length;
			if(bOnlyBody===false){
				for (; nI--;) {
					nJ = nMax - nI - 1;			
					thCon += thRow.format(arrKeys[nJ]);
				}
			}
			if(bOnlyHead===false){
				nK = nMax0;
				for (; nK--;) {
					nL = nMax0 - nK - 1;
					nI = nMax;
					for (; nI--;) {
						if(nI<0){ break; }
						nJ = nMax - nI - 1;
						tbCon += tdRow.format(arrJsonData[arrKeys[nJ]][nL]);
					}
					trCon += tr.format(tbCon);
					tbCon = "";
				}
			}
			
			th = th.format(tr.format(thCon));
			tb = tb.format(trCon);

			sTable = sTable.format(th, tb);
			return sTable;
		}
		return null;
    }

    return null;
}; //FIN json2HtmlTable