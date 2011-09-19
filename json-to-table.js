/*
** Convert Json Data to HTML Table 
** @author Afshin Mehrabani <afshin dot meh at gmail dot com>
*/ 

//function ConvertJsonToTable(jsonData, keys, containerId, tableClassName) {

function json2HtmlTable(arrParams) {
/******************************************************************
Input:
arrParams = {
    arrJsonData		: array,
	arrKeys			: array, 
	arrTableAttr	: array
}
example:
arrParams = {
	arrJsonData		: {"COD_PRODUCTO":["00000000000000000002"],"C&oacute;digo":[""],"Descripci&oacute;n":["Sastre manga 3\/4"],"Categor&iacute;a":["Sastres"],"Colecci&oacute;n":["OTONIO 2010"],"Modelo":["DANIELLA"],"Talla":["L"],"Color":["AZUL MARINO"],"COLORHEX":["#0000ff"],"Tela":[""],"Vendido":["29"]},
	arrKeys			: ['C&oacute;digo','Descripci&oacute;n','Categor&iacute;a','Colecci&oacute;n','Modelo','Talla', 'Color','Tela','Vendido'], 
	arrTableAttr	: {
		'id'	: 'myTableId'
	}
}

********************************************************************/ 
    //Patterns for table thead & tbody
    var sTable = '<table {0} >',
	th = "<thead>{0}</thead>",
	tb = "<tbody>{0}</tbody>",
	tr = "<tr>{0}</tr>",
	thRow = "<th>{0}</th>",
	tdRow = "<td>{0}</td>",
	thCon = "",
	tbCon = "",
	trCon = "",
	sAttr = '',arrTableAttr;
	
	
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
	
	sTable = sTable.format(sAttr) + '{0}{1}</table>';
	
    if (typeof arrParams['arrJsonData']!='undefined' && typeof arrParams['arrKeys']!='undefined') {
        //Creating all table headers			
		var arrKeys = arrParams['arrKeys'],
		nMax = arrKeys.length,
		nI = nMax,
		nJ, sTempHead,
		arrJsonData = arrParams['arrJsonData'],
		nMax0, nK, nL;
		if(typeof arrJsonData[arrKeys[0]]!='undefined'){
			nMax0 = arrJsonData[arrKeys[0]].length;
			for (; nI--;) {
				nJ = nMax - nI - 1;			
				thCon += thRow.format(arrKeys[nJ]);
			}
			nK = nMax0;
			for (; nK--;) {
				nL = nMax0 - nK - 1;
				nI = nMax;
				for (; nI--;) {
					if(nI<0){
						break;
					}
					nJ = nMax - nI - 1;
					tbCon += tdRow.format(arrJsonData[arrKeys[nJ]][nL]);
				}
				trCon += tr.format(tbCon);
				tbCon = "";
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
