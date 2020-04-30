/*---------------------------------------------------------------------------*/	  
//  iTrameur
//  Copyright (c) 2017 Serge Fleury - Université Paris 3 / CLESTHIA
//     This program is free software: you can redistribute it and/or modify
//     it under the terms of the GNU Affero General Public License as
//     published by the Free Software Foundation, either version 3 of the
//     License, or (at your option) any later version.
// 
//     This program is distributed in the hope that it will be useful,
//     but WITHOUT ANY WARRANTY; without even the implied warranty of
//     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//     GNU Affero General Public License for more details.
// 
//     You should have received a copy of the GNU Affero General Public License
//     along with this program.  If not, see <http://www.gnu.org/licenses/>.
//	
/*---------------------------------------------------------------------------*/	  
var variabledetest="";
var trameForme = new Object();	
var gestionnaireSelection = new Object();
var gestionnaireSelectionTMP = new Object();	
var CheckImportBase=0;
var annotationencours = 1;	
var annotationencoursOUT = 1;	
var nombredannotation=1;
var Dicodeslabelsdescolonnes=[];
var listeBaliseSurTrame = new Object();	
var lastOpenBaliseSurTrame = new Object();	
var cadre = new Object();	
var dictionnairedesparties=new Object();	
var positionsurlatrame=1;
var positionsurlatrameFinBitext=1; // variable à utiliser pour le calcul des coocs sur un bitexte...
var numeroapparitionsurlatrameForme=0;
var numeroapparitionsurlatrameLemme=0;
var numeroapparitionsurlatrameCategorie=0;
var numeroapparitionsurlatrameAnnotation=0;
var LISTESCONTEXTES= new Object();
var LISTESCONTEXTESCOOC= new Object();
var LISTESCONTEXTESSOURCE= new Object();
var LISTESCONTEXTESCIBLE= new Object();
var LISTESCONTEXTESSourceBitexte= new Object(); // or just {} 
var LISTESCONTEXTESCibleBitexte= new Object(); // or just {} 	*/
var DICOTFG = new Object();	
var DictionnaireSource = new Object();
var DictionnaireLemme = new Object();
var DictionnaireCategorie = new Object();
var DictionnaireAnnotation = new Object();
var DictionnaireBitextSource = new Object();
var DictionnaireBitextCible = new Object();
var dictionnairedesdelims = new Object();
var isTheCarteDesSectionsOK=0;
var FlagSectionCarteSource={};
var FlagSectionCarteCible={};
var dicForme2num = new Object();
var dicNum2forme = new Object();
var dicLemme2num = new Object();
var dicNum2lemme = new Object();
var dicCategorie2num = new Object();
var dicNum2categorie = new Object();
var dicAnnotation2num = new Object();
var dicNum2annotation = new Object();
var etatLancementSR=0;
var listeSR = new Object();
var listeSROK = new Object();
var dictionnaireventilationdesSR = new Object();
var DictionnaireSelectSection = [];
var ListSelectSection = new Object();	
var LISTEMOTSource=[];
var LISTEMOTSourceSR=[];
var LISTENOMRELATIONENCOURS=[];
var dictionnairedespositionsdesrelationsentrelemmes=new Object();
var dictionnairedesfrequencesdesrelationsentrelemmes=new Object();
var positionsMaximisantlesrelations=new Object;
var nbSectionInCarte=0;
var queryText = "";
var queryDelim = "";
var queryDelim2 = "";
var FILEINPUTTOREAD="";
var NAMEFILE="";
var GrapheArborL=900;
var GrapheArborH=900;
var NBMOTTOTALSource=0;
var NBMOTSource=0;
var nbMotBitextSource=0;
var nbMotBitextCible=0;
var NBDELIMSource=0;
var nbSectionGlobalForBitext=0;
var dicoCorrespondancePositionsSectionsInBitext=new Object();
var awesomplete;
var awesompleteC;
var awesompleteSR;
var awesomplete2dependance1;
var awesomplete2dependance2;
var LISTEDESNOEUDSINCANVAS=[];
var sysArbor;
/*---------------------------------------------------------------------------*/
// Variables pour paramètres dans l'URL
/*---------------------------------------------------------------------------*/
var URLBaseInput="";
var URLCorpusInput="";
var URLWordInACorpusInput="";
var URLparabitext=0;
var URLparadelimbitext="§";
var URLparadependance=0;
var URLparadependanceannotnb=0;
/*---------------------------------------------------------------------------*/
/* DIVERS */
/*---------------------------------------------------------------------------*/
var newWindow = null;

function processUser() {
//base: http://www.tal.univ-paris3.fr/trameur/iTrameur/index.html?corpus=naija.txt&query=un_mot
//nouvelle base: http://www.tal.univ-paris3.fr/trameur/iTrameur/index.html?newbase=naija.txt&query=un_mot
//le mot n'est pas obligatoire
    var parameters = location.search.substring(1).split("&");
    var temp = parameters[0].split("=");
	if (temp[0] == "corpus") {
		URLBaseInput = unescape(temp[1]);
	}
	if (temp[0] == "newbase") {
		URLCorpusInput = unescape(temp[1]);
	}
    if (parameters.length > 1) {
		for (var i=1; i<parameters.length;i++) {
			temp = parameters[i].split("=");
			if (temp[0] == "query") {
				URLWordInACorpusInput = unescape(temp[1]);
			}
			if (temp[0] == "bitext") {
				URLparabitext = 1;
			}
			if (temp[0] == "parambitext") {
				URLparadelimbitext = unescape(decodeURIComponent(temp[1]));
			}
			if (temp[0] == "dependance") {
				URLparadependance = 1;
				URLparadependanceannotnb = unescape(temp[1]);
			}
		}
    }
    console.log("corpus : ",URLCorpusInput," - pole : ",URLWordInACorpusInput);
}

function loadProgressBar() {
    var vide='<img src="./images/loader.gif"/>';
    $("#placeholder").html(vide);
}

function loadProgressBar1() {
    // var vide='<img id="progressBarImage1" src="./images/wheel.png"/>';
    var vide='<img id="progressBarImage1" src="./images/wheel.png" width="5%"/><img id="progressBarImage2" src="./images/wheel.png" width="5%"/><img id="progressBarImage3" src="./images/wheel.png" width="5%"/><img id="progressBarImage4" src="./images/wheel.png" width="5%"/><img id="progressBarImage5" src="./images/wheel.png" width="5%"/><img id="progressBarImage6" src="./images/wheel.png" width="5%"/><img id="progressBarImage7" src="./images/wheel.png" width="5%"/><img id="progressBarImage8" src="./images/wheel.png" width="5%"/><img id="progressBarImage9" src="./images/wheel.png" width="5%"/><img id="progressBarImage10" src="./images/wheel.png" width="5%"/><br/><span style=\"font-size:0.7em\">.....patience.....</span>';
    $("#placeholder").html(vide);
}

function writeConsoleOLD(content,titre) {
	top.consoleRef=window.open('','myconsole',
	'width=350,height=450'
	+',menubar=0'
	+',toolbar=1'
	+',status=0'
	+',scrollbars=1'
	+',resizable=1');
	top.consoleRef.document.writeln(
	'<html><head><meta charset="utf-8"><title>iTrameur : '+titre+'</title><link rel="stylesheet" href="./import/mystyle.css"><link rel="stylesheet" href="./import/chartist.min.css"><link rel="stylesheet" href="./import/awesomplete.css" /></head>'
	+'<body onLoad="self.focus()"><br/>'
	+content
	+'<br/><br/></body></html>'
	);
	top.consoleRef.document.close();
}
function writeConsole(content,titre) {
	if ((newWindow == null) || (newWindow.closed)  ) {
		newWindow = window.open("", "iTrameurconsole",'width=350,height=450,menubar=0,toolbar=1,status=0,scrollbars=1,resizable=1');
	}
	var htmlString='<html><head><meta charset="utf-8"><title>iTrameur : '+titre+'</title><link rel="stylesheet" href="./import/mystyle.css"><link rel="stylesheet" href="./import/chartist.min.css"><link rel="stylesheet" href="./import/awesomplete.css" /></head>'
	+'<body onLoad="self.focus()"><br/>'
	+content
	+'<br/><br/></body></html>';

    newWindow.document.write(htmlString);
    newWindow.document.close();
	newWindow.focus();
}

function refreshItrameur() {
    var vide="";
    $("#graph-analysis1").html(vide);
    $("#graph-analysis2").html(vide);
    $("#graph-analysis3").html(vide);
    $("#legend-graph-analysis1").html(vide);
    $("#legend-graph-analysis2").html(vide);
    $("#legend-graph-analysis3").html(vide);
    $("#contextehtml").html(vide);
    $("#page-analysis").html(vide);
    $("#placeholder").html(vide);
    $("#placeholder2").html(vide);
    $("#page-analysis").html(vide);
    $("#legendGraphe").html(vide);
    isTheCarteDesSectionsOK=0;
    document.getElementById('placeholder2').style.height = "0px";
    GrapheArborL=0;
    GrapheArborH=0;	
    reinit_canvas();	
}


//-----------------------------------------------------------------------------------
function exportBase () {
    // 1. sauvegarde Trame
    var texte = "";
    for (var index in trameForme) {
	var indexNb=Number(index);
	var itemForme = dicNum2forme[trameForme[index][0]];
	if (!(itemForme in dictionnairedesdelims))  {
	    var str="";
	    str=indexNb+"\t"+"forme"+"\t"+itemForme;
	    if (nombredannotation > 1 ) {
		if (nombredannotation > 3) {
		    str+="\t"+dicNum2categorie[trameForme[index][2]]+"\t"+dicNum2lemme[trameForme[index][1]];
		    for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
			var kk=tmpAnnot+1;
			str+="\t"+ dicNum2annotation[trameForme[index][tmpAnnot]];
		    }
		}
		else {
		    str+="\t"+dicNum2categorie[trameForme[index][2]]+"\t"+dicNum2lemme[trameForme[index][1]];
		}
	    }	
	    str=str+"\n";
	    texte+=str;
	}
	else {
	    if (itemForme == "\n") { itemForme="RETURN"};
	    if (itemForme == "\t") { itemForme="TABULATION"};
	    var str="";
	    str=indexNb+"\t"+"delim"+"\t"+itemForme;
	    if (nombredannotation > 1 ) {
		if (nombredannotation > 3) {
		    if (itemForme == "RETURN") {
			str+="\t"+"RETURN"+"\t"+"RETURN"
		    }
		    else if (itemForme == "TABULATION") {
			str+="\t"+"DELIM"+"\t"+"DELIM"
		    } 
		    else {
			str+="\t"+dicNum2categorie[trameForme[index][2]]+"\t"+dicNum2lemme[trameForme[index][1]];
		    }
		    for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
			var kk=tmpAnnot+1;
			if (itemForme == "RETURN") {
			    str+="\t"+ "RETURN";
			} 
			else if (itemForme == "TABULATION") {
			    str+="\t"+ "DELIM";
			}
			else {
			    str+="\t"+ dicNum2annotation[trameForme[index][tmpAnnot]];
			}
		    }
		}
		else {
		    if (itemForme == "RETURN") {
			str+="\t"+"RETURN"+"\t"+"RETURN"
		    }
		    else if (itemForme == "TABULATION") {
			str+="\t"+"DELIM"+"\t"+"DELIM"
		    } 
		    else {
			str+="\t"+dicNum2categorie[trameForme[index][2]]+"\t"+dicNum2lemme[trameForme[index][1]];
		    }
		}
	    }	
	    str=str+"\n";
	    texte+=str;
	}
    }
    // 2. sauvegarde Cadre
    for (var partie in dictionnairedesparties) {
	var TMPLIST=Object.keys(cadre[partie]);
	for (var j=0;j<TMPLIST.length;j++) {
	    var listepositions = cadre[partie][TMPLIST[j]];
	    for (var k=0;k<(listepositions.length);k=k+2) {
		var deb = listepositions[k];
		var tmpk=k+1;
		var fin = listepositions[tmpk];
		texte+="PARTITION:"+partie+"\tPARTIE:"+TMPLIST[j]+"\tDEBUT:"+deb+"\tFIN:"+fin+"\n";
	    }
	}
    }
    // 3. sauvegarde File
    SaveAsFile(texte,"iTrameur-export-base.txt","text/plain;charset=utf-8");
}
function SaveAsFile(t,f,m) {
    try {
      var b = new Blob([t],{type:m});
      saveAs(b, f,true);
    } catch (e) {
       window.open("data:"+m+"," + encodeURIComponent(t), '_blank','');
    }
}
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
function DisplayOrShowParameters() {
    var x = document.getElementById('myParameters');
    if (x.style.display === "none") {
        document.getElementById('bttParamaters').value = '-';
        $('#myParameters').show();
        
    } else {
        document.getElementById('bttParamaters').value = '+';
        x.style.display = "none";
    }
} 
//-----------------------------------------------------------------------------------
function setbg(color) {
	document.getElementById("paste").style.background=color
	document.getElementById("paste").style.fontSize = '0.7em';
} 
//-----------------------------------------------------------------------------------
function changeAnnotationRelationEncours() {
	var annotationRelationencours=document.getElementById('numAnnotRelationID').value;
	if (annotationRelationencours > 3) {
		var LISTEMOTS=Object.keys(DictionnaireAnnotation).sort(function(a,b){
		var x = DictionnaireAnnotation[a];
		var y = DictionnaireAnnotation[b];
		return x < y ? 1 : x > y ? -1 : 0;
		});
		var DicoDesNomsDesRelations={};
		for (var i=0; i<LISTEMOTS.length;i++) {
			var identAnnot=LISTEMOTS[i].split("//");
			var numAnnot=Number(identAnnot[0]);
			if (annotationRelationencours==numAnnot) {
				if (DicoDesNomsDesRelations[identAnnot[1]] === undefined) {
					DicoDesNomsDesRelations[identAnnot[1]] = 1;
				}
				else {
					DicoDesNomsDesRelations[identAnnot[1]] = DicoDesNomsDesRelations[identAnnot[1]]  + 1;
				}

				
			}		
		}
		LISTENOMRELATIONENCOURS=Object.keys(DicoDesNomsDesRelations).sort(function(a,b){
			return a < b ? 1 : a > b ? -1 : 0;
		});;
		//awesompleteNomRelation.list = LISTEMOTSource;
	}
}
//-----------------------------------------------------------------------------------
function changeAnnotationOutEncours() {
    annotationencoursOUT=document.getElementById('IDannotationsOUT').value;
}	
//-----------------------------------------------------------------------------------
function changeAnnotationEncours() {
    //-----------------------------------------------------------------
    refreshItrameur();
    //-----------------------------------------------------------------
    annotationencours=document.getElementById('IDannotations').value;
    document.getElementById('IDannotationsOUT').value=annotationencours;
    annotationencoursOUT=document.getElementById('IDannotationsOUT').value;
    var inputBitext = document.getElementById ("bitextID");
    var isCheckedBitext = inputBitext.checked;
    if (!(isCheckedBitext)) {
	if (annotationencours == 1 ) {
	    LISTEMOTSource=[];
	    LISTEMOTSource= Object.keys(DictionnaireSource).sort(function(a,b){
		return a < b ? 1 : a > b ? -1 : 0;
			});
	    awesomplete.list = LISTEMOTSource;
	    awesompleteC.list = LISTEMOTSource;
		}
	if (annotationencours == 2 ) {
	    LISTEMOTSource=[];
	    LISTEMOTSource= Object.keys(DictionnaireLemme).sort(function(a,b){
		return a < b ? 1 : a > b ? -1 : 0;
			});
	    awesomplete.list = LISTEMOTSource;
	    awesompleteC.list = LISTEMOTSource;
	}
	if (annotationencours == 3 ) {
	    LISTEMOTSource=[];
	    LISTEMOTSource= Object.keys(DictionnaireCategorie).sort(function(a,b){
		return a < b ? 1 : a > b ? -1 : 0;
	    });
	    awesomplete.list = LISTEMOTSource;
	    awesompleteC.list = LISTEMOTSource;
	}
	if (annotationencours > 3 ) { // A MODIFIER....
	    var DictionnaireAnnotationTmp = new Object();
	    for (item in DictionnaireAnnotation) {
		var verifAnnot=item.split("//");
		var val = DictionnaireAnnotation[item];
		if (verifAnnot[0] == annotationencours) {
		    DictionnaireAnnotationTmp[verifAnnot[1]]=val;
		}
	    }
	    LISTEMOTSource=[];
	    LISTEMOTSource= Object.keys(DictionnaireAnnotationTmp).sort(function(a,b){
		return a < b ? 1 : a > b ? -1 : 0;
	    });
	    awesomplete.list = LISTEMOTSource;
	    awesompleteC.list = LISTEMOTSource;
	}
	
    }
    else {
	LISTEMOTSource=[];
		LISTEMOTSource= Object.keys(DictionnaireBitextSource).sort(function(a,b){
		    return a < b ? 1 : a > b ? -1 : 0;
		});
	var LISTEMOTSourceC=[];
	LISTEMOTSourceC= Object.keys(DictionnaireBitextCible).sort(function(a,b){
	    return a < b ? 1 : a > b ? -1 : 0;
	});
	awesomplete.list = LISTEMOTSource;
		awesompleteC.list = LISTEMOTSourceC;		
    }
    listeSR = new Object();
    listeSROK = new Object();
    dictionnaireventilationdesSR = new Object();
    etatLancementSR=0;
}	
/*---------------------------------------------------------------------------*/
function yesnoCheck() {
    //loadProgressBar();
    if (document.getElementById('bitextID').checked) {
        document.getElementById('yesno').style.display  = 'block';
        document.getElementById('yesnoSR').style.display  = 'block';
        document.getElementById('bitextMenuID').style.display  = 'block';
        document.getElementById('bitextMenuID2').style.display  = 'block';
    } 
    else {
        document.getElementById('yesno').style.display  = 'none';
        document.getElementById('yesnoSR').style.display  = 'none';
        document.getElementById('bitextMenuID').style.display  = 'none';
        document.getElementById('bitextMenuID2').style.display  = 'none';
    }
    var vide="";
    $("#graph-analysis1").html(vide);
    $("#graph-analysis2").html(vide);
    $("#graph-analysis3").html(vide);
    $("#legend-graph-analysis1").html(vide);
    $("#legend-graph-analysis2").html(vide);
    $("#legend-graph-analysis3").html(vide);
    $("#contextehtml").html(vide);
    $("#page-analysis").html(vide);
    $("#placeholder").html(vide);
    $("#placeholder2").html(vide);
    $("#page-analysis").html(vide);
    $("#legendGraphe").html(vide);
    isTheCarteDesSectionsOK=0;
    if (FILEINPUTTOREAD != "") {
	refreshItrameur();
	changeAnnotationEncours();
	carteDesSections();
    }
}

function yesnoCheckDependancy () {
    if (document.getElementById('dependancerelationID').checked) {
        document.getElementById('dependanceMenuID').style.display  = 'block';
    } else {
        document.getElementById('dependanceMenuID').style.display  = 'none';
    }
	
}
/*---------------------------------------------------------------------------*/
String.prototype.replaceAll = function( token, newToken, ignoreCase ) {
    var _token;
    var str = this + "";
    var i = -1;
    if ( typeof token === "string" ) {
        if ( ignoreCase ) {
            _token = token.toLowerCase();
            while( (
                i = str.toLowerCase().indexOf(
                    token, i >= 0 ? i + newToken.length : 0
                ) ) !== -1
            ) {
                str = str.substring( 0, i ) +
                    newToken +
                    str.substring( i + token.length );
            }
        } else {
            return this.split( token ).join( newToken );
        }
    }
return str;
};
//-----------------------------------------------------------------------------------
function freqMots(texte) {
	var pasUneLettre = XRegExp("\\P{L}+");
	var mots = XRegExp.split(texte, pasUneLettre);
	var freqs = {};
	mots.forEach(function(m) {
		if (!freqs[m]) {
			freqs[m] = 0;
		}
		freqs[m] += 1;
		});
	return freqs;
}	
/*---------------------------------------------------------------------------*/
function sectionAsString (infoSection) {
	var listePara=infoSection.split(":");
	var nbSection=Number(listePara[0]);
	var deb=Number(listePara[1]);
	var fin=Number(listePara[2]);
	var str="";
	var DictionnaireNumDesItems = new Object();
	if (nombredannotation > 1 ) {
		if (annotationencours==1) {
			DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);	
		}
		if (annotationencours==2) {
			DictionnaireNumDesItems=jQuery.extend({}, dicNum2lemme);
		}
		if (annotationencours==3) {
			DictionnaireNumDesItems=jQuery.extend({}, dicNum2categorie);
		}
	}
	else {
			DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);	
	}
	var annotationIndex=annotationencours-1;
	for (var i=deb;i<=fin;i++) {
		str += DictionnaireNumDesItems[trameForme[i][annotationIndex]]; 
	}
	return str;
}
/*---------------------------------------------------------------------------*/
function clear_canvas() {
    /* PB */
    for (var nodeoredge=0;nodeoredge<LISTEDESNOEUDSINCANVAS.length;nodeoredge++) {
	sysArbor.pruneNode(LISTEDESNOEUDSINCANVAS[nodeoredge]);
    }
    /*------*/
    LISTEDESNOEUDSINCANVAS=[];
    var canvas = document.getElementById('grapheHolder');
    var gfx = arbor.Graphics(canvas)
    gfx.clear();
    while (canvas.hasChildNodes()) {
	canvas.removeChild(canvas.lastChild);
    } 
    delete sysArbor;
    $('#grapheHolder').remove();
    $('#contentgrapheholder').append('<canvas id="grapheHolder"><canvas>');
    //context.clearRect(0, 0, canvas.width, canvas.height);
    //canvas.width = GrapheArborL;
    //canvas.height = GrapheArborH;
    //document.getElementById('grapheHolder').innerHTML='';
    canvas = document.getElementById('grapheHolder');
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = 0;
    canvas.height=0;
    document.getElementById('grapheHolder').innerHTML = '';
}

function reinit_canvas() {
    /* PB */
    for (var nodeoredge=0;nodeoredge<LISTEDESNOEUDSINCANVAS.length;nodeoredge++) {
	sysArbor.pruneNode(LISTEDESNOEUDSINCANVAS[nodeoredge]);
    }
    /*------*/
    LISTEDESNOEUDSINCANVAS=[];
    delete sysArbor;
    var canvas = document.getElementById('grapheHolder');
    var gfx = arbor.Graphics(canvas)
    gfx.clear();
    while (canvas.hasChildNodes()) {
	canvas.removeChild(canvas.lastChild);
    } 
    delete sysArbor;
    $('#grapheHolder').remove();
    $('#contentgrapheholder').append('<canvas id="grapheHolder"><canvas>');
    canvas = document.getElementById('grapheHolder');
    var context = canvas.getContext('2d');
    var gfx = arbor.Graphics(canvas)
    gfx.clear();
    context.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = GrapheArborL;
    canvas.height = GrapheArborH;
    document.getElementById('grapheHolder').innerHTML='';
}

function reinit_canvas1() {
    for (var nodeoredge=0;nodeoredge<LISTEDESNOEUDSINCANVAS.length;nodeoredge++) {
	sysArbor.pruneNode(LISTEDESNOEUDSINCANVAS[nodeoredge]);
    }
    LISTEDESNOEUDSINCANVAS=[];
    //document.getElementById('grapheHolder').innerHTML='';
    var canvas = document.getElementById('grapheHolder');
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = GrapheArborL;
    canvas.height = GrapheArborH;
    document.getElementById('grapheHolder').innerHTML='';
}
/*---------------------------------------------------------------------------*/
/* LOAD FILE */
/*---------------------------------------------------------------------------*/
function openFile(){
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];
    NAMEFILE=file.name;
    var textType = /text.*/;
    if (file.type.match(textType)) {
	loadProgressBar();
        var reader = new FileReader();
        reader.onload = function(e) {
	    FILEINPUTTOREAD=reader.result;
	    var resusplit=splittext();
	    generateCadre();
	    changeAnnotationEncours();
	    carteDesSections();
	    initSelection()
	    $("#placeholder").html(resusplit);
        }
        reader.readAsText(file);    
    } 
    else {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut charger un fichier TXT brut...</span></small>';
        //document.getElementById('placeholder').innerHTML = vide; 
	$("#placeholder").html(vide);
    }
}

function openUrlFile(){
	// example : http://www.tal.univ-paris3.fr/trameur/iTrameur/iTrameur-base-naija.txt
	var file = URLCorpusInput;
	NAMEFILE = file.substring(file.lastIndexOf('/')+1)
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET",file,false);
    rawFile.onreadystatechange = function() {
		if(rawFile.readyState === 4) {
			if(rawFile.status === 200 || rawFile.status === 0) {
				FILEINPUTTOREAD = rawFile.responseText;
				var resusplit=splittext();
				generateCadre();
				changeAnnotationEncours();
				carteDesSections();
				initSelection();
				$("#placeholder").html(resusplit);
			}
		}
    }
    rawFile.send(null);
}

function importFile(){
    var fileInput = document.getElementById('fileInputImport');
	//alert(fileInput);
    var file = fileInput.files[0];
	//alert(file);
    NAMEFILE=file.name;
	//alert(NAMEFILE);
    var textType = /text.*/;
    if (file.type.match(textType)) {
		loadProgressBar();
        var reader = new FileReader();
        reader.onload = function(e) {
			FILEINPUTTOREAD=reader.result;
			//alert(FILEINPUTTOREAD);
			var resusplit=importBase();
			changeAnnotationEncours();
			carteDesSections();
			initSelection();
			$("#placeholder").html(resusplit);
        }
        reader.readAsText(file);    
    } 
    else {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut charger un fichier TXT brut...</span></small>';
        //document.getElementById('placeholder').innerHTML = vide; 
	$("#placeholder").html(vide);
    }
}

function importUrlFile(){
	// example : http://www.tal.univ-paris3.fr/trameur/iTrameur/iTrameur-base-naija.txt
	var file = URLBaseInput;
	NAMEFILE = file.substring(file.lastIndexOf('/')+1)
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET",file,false);
    rawFile.onreadystatechange = function() {
		if(rawFile.readyState === 4) {
			if(rawFile.status === 200 || rawFile.status === 0) {
				FILEINPUTTOREAD = rawFile.responseText;
				var resusplit=importBase();
				changeAnnotationEncours();
				carteDesSections();
				initSelection();
				$("#placeholder").html(resusplit);
			}
		}
    }
    rawFile.send(null);
}
/*---------------------------------------------------------------------------*/
function importBase() {
    DictionnaireSource = new Object();
    DictionnaireLemme = new Object();
    DictionnaireCategorie = new Object();
    DictionnaireAnnotation = new Object();
    dictionnairedesdelims = new Object();
    dicForme2num = new Object();
    dicNum2forme = new Object();
    dicLemme2num = new Object();
    dicNum2lemme = new Object();
    dicCategorie2num = new Object();
    dicNum2categorie = new Object();
    dicAnnotation2num = new Object();
    dicNum2annotation = new Object();
    NBMOTTOTALSource=0;	
    NBMOTSource=0;
    NBDELIMSource=0;
    numeroapparitionsurlatrameForme=0;
    numeroapparitionsurlatrameLemme=0;
    numeroapparitionsurlatrameCategorie=0;
    numeroapparitionsurlatrameAnnotation=0;
    positionsurlatrame=1;
    trameForme = new Object();	
    Dicodeslabelsdescolonnes=[];
    gestionnaireSelection = new Object();
    lastOpenBaliseSurTrame = new Object();
    listeBaliseSurTrame = new Object();	  
    cadre = new Object();	
    dictionnairedesparties=new Object();
    var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:#FDBBD2">Calcul en cours</span></small>';
    $("#placeholder").html(vide);
    /*----------------------------------------------------*/
    var allLines = FILEINPUTTOREAD; 
    var arrayOfLines = allLines.split("\n");
    for (var nblines=0;nblines<arrayOfLines.length;nblines++) {
	var contentxt=arrayOfLines[nblines];
	contentxt=contentxt.replaceAll("\r","");
	// recherche label colonnes
	if (contentxt.search(/^#[^\t]+\t#[^\t]+\t#[^\t]+\t#[^\t]+\t#[^\t]+/) != -1) {
	    var LISTELABEL=contentxt.split("\t");
	    Dicodeslabelsdescolonnes.push("Forme");
	    Dicodeslabelsdescolonnes.push("Lemme");
	    Dicodeslabelsdescolonnes.push("POS");
	    if (LISTELABEL.length > 4) {
		for (var nbAnnot=5;nbAnnot<LISTELABEL.length;nbAnnot++) {
		    var tmplabel=LISTELABEL[nbAnnot];
		    tmplabel=tmplabel.replaceAll("#","");
		    Dicodeslabelsdescolonnes.push(tmplabel);
		}
	    }
	}
	// recherche items
	if (contentxt.search(/^[^#\t]+\t[^\t]+\t[^\t]+\t[^\t]+\t[^\t]+/) != -1) {
	    var LISTEDEMOTS=contentxt.split("\t");
	    var pos=LISTEDEMOTS.shift();
	    var type=LISTEDEMOTS.shift();
	    var forme=LISTEDEMOTS.shift();
	    if (forme=="RETURN") {forme="\n"};
	    if (forme=="TABULATION") {forme="\t"};
	    var categorie=LISTEDEMOTS.shift();
	    if (categorie=="DELIM") {categorie=forme};
	    if (categorie=="RETURN") {categorie="\n"};
	    if (categorie=="BLANK") {categorie=" "};
	    if (categorie=="TABULATION") {categorie="\t"};
	    var lemme=LISTEDEMOTS.shift();
	    if (lemme=="DELIM") {lemme=forme};
	    if (lemme=="RETURN") {lemme="\n"};
	    if (lemme=="TABULATION") {lemme="\t"};
	    if (lemme=="BLANK") {lemme=" "};
	    // le reste sont les annotation complémentaires traitees infra....
	    nombredannotation=3+LISTEDEMOTS.length;
	    //---------------------------------------------------------------------------------
	    //alert("TYPE:"+type+"|POS:"+pos+"|FORME:"+forme+"|LEMME:"+lemme+"|CAT:"+categorie);
	    if (type=="delim")  {
		NBDELIMSource+=1;
		if (dictionnairedesdelims[forme] === undefined) {
		    dictionnairedesdelims[forme] = 1;
		}
		else {
		    dictionnairedesdelims[forme] = dictionnairedesdelims[forme]  + 1;
		}
		if (!(forme in dicForme2num)) {
		    numeroapparitionsurlatrameForme++;
		    dicForme2num[forme]=numeroapparitionsurlatrameForme;
		    dicNum2forme[numeroapparitionsurlatrameForme]=forme;
		}
		if (!(lemme in dicLemme2num)) {
		    numeroapparitionsurlatrameLemme++;
		    dicLemme2num[lemme]=numeroapparitionsurlatrameLemme;
		    dicNum2lemme[numeroapparitionsurlatrameLemme]=lemme;
		}
		if (!(categorie in dicCategorie2num)) {
		    numeroapparitionsurlatrameCategorie++;
		    dicCategorie2num[categorie]=numeroapparitionsurlatrameCategorie;
		    dicNum2categorie[numeroapparitionsurlatrameCategorie]=categorie;
		}
		for (var nbAnnot=0;nbAnnot<LISTEDEMOTS.length;nbAnnot++) {
		    var annot=LISTEDEMOTS[nbAnnot];
		    if (!(annot in dicAnnotation2num)) {
			numeroapparitionsurlatrameAnnotation++;
			dicAnnotation2num[annot]=numeroapparitionsurlatrameAnnotation;
			dicNum2annotation[numeroapparitionsurlatrameAnnotation]=annot;
		    }
		}
	    }
	    if (type=="forme")  {
		//if (forme == "length") {forme=forme+"\032"};
		//if (forme == "length") {forme=forme+"⠀"};  // attention caractère spécial invisible...
		//-------------------------------------------------------------------------------------
		// BUG CONSTRUCTOR
		forme=new String(forme);
		if (forme == "constructor") {forme=forme+"⠀"}; //{forme = "Constructor";}
		//-------------------------------------------------------------------------------------
		if (!(forme in dicForme2num)) {
		    numeroapparitionsurlatrameForme++;
		    dicForme2num[forme]=numeroapparitionsurlatrameForme;
		    dicNum2forme[numeroapparitionsurlatrameForme]=forme;
		}
		NBMOTTOTALSource++;
		if (DictionnaireSource[forme] === undefined) {
		    DictionnaireSource[forme] = 1;
		    NBMOTSource+=1;
		}
		else {
		    DictionnaireSource[forme] = DictionnaireSource[forme]  + 1;
		}
		//if (lemme == "length") {lemme=lemme+"\032"};
		//if (lemme == "length") {lemme=lemme+"⠀"};  // attention caractère spécial invisible...
		//-------------------------------------------------------------------------------------
		// BUG CONSTRUCTOR
		lemme=new String(lemme);
		if (lemme == "constructor") {lemme=lemme+"⠀"}; //{lemme = "Constructor";}
		//-------------------------------------------------------------------------------------
		if (!(lemme in dicLemme2num)) {
		    numeroapparitionsurlatrameLemme++;
		    dicLemme2num[lemme]=numeroapparitionsurlatrameLemme;
		    dicNum2lemme[numeroapparitionsurlatrameLemme]=lemme;
		}
		if (DictionnaireLemme[lemme] === undefined) {
		    DictionnaireLemme[lemme] = 1;
		}
		else {
		    DictionnaireLemme[lemme] = DictionnaireLemme[lemme]  + 1;
		}
		if (!(categorie in dicCategorie2num)) {
		    numeroapparitionsurlatrameCategorie++;
		    dicCategorie2num[categorie]=numeroapparitionsurlatrameCategorie;
		    dicNum2categorie[numeroapparitionsurlatrameCategorie]=categorie;
		}
		if (DictionnaireCategorie[categorie] === undefined) {
		    DictionnaireCategorie[categorie] = 1;
		}
		else {
		    DictionnaireCategorie[categorie] = DictionnaireCategorie[categorie]  + 1;
		}
		for (var nbAnnot=0;nbAnnot<LISTEDEMOTS.length;nbAnnot++) {
		    var annot=LISTEDEMOTS[nbAnnot];
		    if (!(annot in dicAnnotation2num)) {
			numeroapparitionsurlatrameAnnotation++;
			dicAnnotation2num[annot]=numeroapparitionsurlatrameAnnotation;
			dicNum2annotation[numeroapparitionsurlatrameAnnotation]=annot;
		    }
		}
		for (var nbAnnot=0;nbAnnot<LISTEDEMOTS.length;nbAnnot++) {
		    var nbAnnot2insert=3+nbAnnot+1;
		    var identAnnot=nbAnnot2insert+"//"+LISTEDEMOTS[nbAnnot];
		    if (DictionnaireAnnotation[identAnnot] === undefined) {
			DictionnaireAnnotation[identAnnot] = 1;
		    }
		    else {
			DictionnaireAnnotation[identAnnot] = DictionnaireAnnotation[identAnnot]  + 1;
		    }
		}
	    }
	    // A verifier...
	    if (forme=="\n") {
		dicForme2num["\n"]=-1;
		dicNum2forme[-1]="\n";
	    }
	    trameForme[positionsurlatrame]=[];
	    trameForme[positionsurlatrame].push(dicForme2num[forme],dicLemme2num[lemme],dicCategorie2num[categorie]);
	    for (var nbAnnot=0;nbAnnot<LISTEDEMOTS.length;nbAnnot++) {
		trameForme[positionsurlatrame].push(dicAnnotation2num[LISTEDEMOTS[nbAnnot]]);
	    }
	    //alert(trameForme[positionsurlatrame]);
	    positionsurlatrame++;
	    
	}
	if (contentxt.search(/^PARTITION:[^\t]+\tPARTIE:[^\t]+\tDEBUT:[^\t]+\tFIN:[^\t]+$/) != -1) {
	    var LISTEDEMOTS=contentxt.split("\t");
	    var tmpartition=LISTEDEMOTS[0];
	    tmpartition=tmpartition.replace("PARTITION:","");
	    var tmpartie=LISTEDEMOTS[1];
	    tmpartie=tmpartie.replace("PARTIE:","");
	    var tmpdeb=LISTEDEMOTS[2];
	    tmpdeb=tmpdeb.replace("DEBUT:","");
	    var tmpfin=LISTEDEMOTS[3];
	    tmpfin=tmpfin.replace("FIN:","");
	    tmpdeb=Number(tmpdeb);
	    tmpfin=Number(tmpfin);
	    if (dictionnairedesparties[tmpartition] === undefined) {dictionnairedesparties[tmpartition]=1};
	    if (cadre[tmpartition] === undefined) {
		cadre[tmpartition]=new Object();
		cadre[tmpartition][tmpartie]=[];
		cadre[tmpartition][tmpartie].push(tmpdeb,tmpfin);
	    }
	    else {
		if (!($.isArray(cadre[tmpartition][tmpartie]))) {
		    cadre[tmpartition][tmpartie]=[];
		    cadre[tmpartition][tmpartie].push(tmpdeb,tmpfin);
		}
		else {
		    cadre[tmpartition][tmpartie].push(tmpdeb,tmpfin);
		}
	    }
	    
	}
    }
    var listePartie2add=  Object.keys(dictionnairedesparties);
    $('#IDPartie option').remove();
    for (var i = 0; i < listePartie2add.length; i++) { 
	$('#IDPartie').append( '<option value="'+listePartie2add[i]+'">'+listePartie2add[i]+'</option>' );
    }
    var PARTITION =document.getElementById('IDPartie').value;
    if (PARTITION !="") {
	$('#IDParties option').remove();
	var LISTESDESPARTIES=Object.keys(cadre[PARTITION]);
	for (var i=0;i<LISTESDESPARTIES.length;i++) {
	    $('#IDParties').append( '<option value="'+LISTESDESPARTIES[i]+'">'+LISTESDESPARTIES[i]+'</option>' );
	}
    }	
    var LISTEDELIMSource= Object.keys(dictionnairedesdelims);
    document.getElementById("delimID").value="";
    for (var delim in LISTEDELIMSource) {
	document.getElementById("delimID").value+=LISTEDELIMSource[delim];
    }
    /*LISTEMOTSource= Object.keys(DictionnaireSource).sort(function(a,b){
      return a < b ? 1 : a > b ? -1 : 0;
      });*/
    
    $('#IDannotations option').remove();
    $('#IDannotationsOUT option').remove();
    for (var ii=1;ii<=nombredannotation;ii++){
	if (Dicodeslabelsdescolonnes.length == 0) {
	    $('#IDannotations').append( '<option value="'+ii+'">'+ii+'</option>' );
	    $('#IDannotationsOUT').append( '<option value="'+ii+'">'+ii+'</option>' );
	}
	else {
	    $('#IDannotations').append( '<option value="'+ii+'">'+ii+':'+Dicodeslabelsdescolonnes[ii-1]+'</option>' );
	    $('#IDannotationsOUT').append( '<option value="'+ii+'">'+ii+':'+Dicodeslabelsdescolonnes[ii-1]+'</option>' );
	}
    }
    
    var input = document.getElementById("poleID");
    var inputC = document.getElementById("poleCibleID");
    awesomplete = new Awesomplete(input);
    awesompleteC = new Awesomplete(inputC);
    
    /* pour les zones dependances... */
    var LISTELEMME2search=[];
    LISTELEMME2search= Object.keys(DictionnaireLemme).sort(function(a,b){
	return a < b ? 1 : a > b ? -1 : 0;
    });
    var inputDep1=document.getElementById('gouvlemmeID');
    var inputDep2=document.getElementById('deplemmeID');
    awesomplete2dependance1 = new Awesomplete(inputDep1);
    awesomplete2dependance1.list = LISTELEMME2search;
    awesomplete2dependance2 = new Awesomplete(inputDep2);
    awesomplete2dependance2.list = LISTELEMME2search;
    /*-----------------------------------------------------*/
    
    changeAnnotationEncours();
    /*var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:#FDBBD2">Segmentation termin&eacute;e ('+NAMEFILE+' :'+NBMOTTOTALSource+' occurrences / '+NBMOTSource+ ' formes) </span></small>';
      document.getElementById('placeholder').innerHTML = vide;*/
    var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:#FDBBD2">Base charg&eacute;e ('+NAMEFILE+' :'+NBMOTTOTALSource+' occurrences / '+NBMOTSource+ ' formes) </span></small>';
    return vide;
}
/*---------------------------------------------------------------------------*/
function splittext(){
  queryDelim=document.getElementById('delimID').value;
  /*document.getElementById('page-analysis').value = '';*/
  /*----------------------------------------------------*/
  if (queryDelim == ''){
      var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez les délimiteurs pour segmenter les mots...</span></small>';
      $("#placeholder").html(vide);
      return;
  }
  /*----------------------------------------------------*/
  /* on prepare la regexp finale */
  //queryDelim += "\n\s\t\"";
  queryDelim += "\n\t\"";
  queryDelim2 = queryDelim.replace(/(.)/gi, "\\$1");
  /*----------------------------------------------------*/
  DictionnaireSource = new Object();
  DictionnaireLemme = new Object();
  DictionnaireCategorie = new Object();
  dictionnairedesdelims = new Object();
  dicForme2num = new Object();
  dicNum2forme = new Object();
  dicLemme2num = new Object();
  dicNum2lemme = new Object();
  dicCategorie2num = new Object();
  dicNum2categorie = new Object();
  NBMOTTOTALSource=0;	
  NBMOTSource=0;
  NBDELIMSource=0;
  numeroapparitionsurlatrameForme=0;
  numeroapparitionsurlatrameLemme=0;
  numeroapparitionsurlatrameCategorie=0;
  positionsurlatrame=1;
  trameForme = new Object();	
  gestionnaireSelection = new Object();
  lastOpenBaliseSurTrame = new Object();
  listeBaliseSurTrame = new Object();	  
  cadre = new Object();	
  var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:#FDBBD2">Calcul en cours</span></small>';
    $("#placeholder").html(vide);
  /*----------------------------------------------------*/
  /* dico des delims                                    */
  var regexpdelim=new RegExp("(.|\n|\t)");
  var LISTEDELIM=queryDelim.split(regexpdelim);
  for (var nbdelim=0;nbdelim<LISTEDELIM.length;nbdelim++) {
		dictionnairedesdelims[LISTEDELIM[nbdelim]] = 0;
  }
  /*----------------------------------------------------*/
  /* on recupere tt le texte */
  var allLines = FILEINPUTTOREAD; 
  var arrayOfLines = allLines.split("\n");
  for (var nblines=0;nblines<arrayOfLines.length;nblines++) {
      var contentxt=arrayOfLines[nblines];
      /* Nettoyage et split ; preparation au reperage des balises */
      contentxt=contentxt.replaceAll("\r","");
      contentxt=contentxt.replace(/\r/gi, "");
      contentxt=contentxt.replace(/\u00a0/gi, " ");
      var regexpbalise=new RegExp("(<[^<>]*>)", "gi");
      contentxt=contentxt.replace(regexpbalise,"\377$1\377");
      /*...................................*/	
      var LISTEDEMOTS=contentxt.split("\377");
      for (var nbmot=0;nbmot<LISTEDEMOTS.length;nbmot++) {
	  /* 1. on est sur 1 balise */
	  if (LISTEDEMOTS[nbmot].search(/^<[^\>]*>$/) != -1) {
	      /*alert('BALISE : '+LISTEDEMOTS[nbmot]);*/
	      /* il faut tenir compte de la balise pour definir un debut/fin de partie */
	      /* et remplir le cadre */
	      buildCadre(LISTEDEMOTS[nbmot],positionsurlatrame);
	  }
	  /* 2. on est sur du texte : on remplit la trame*/
	  else {
	      var contentxt2 = LISTEDEMOTS[nbmot];
	      /*var regex0 = new RegExp("^([" + queryDelim2 + "])", "gi");
		contentxt2 = contentxt2.replace(regex0, "");
		var regex1 = new RegExp("([" + queryDelim2 + "])", "gi");
		contentxt2 = contentxt2.replace(regex1, "");*/
	      var regex = new RegExp("([" + queryDelim2 + "])", "gi");
	      contentxt2 = contentxt2.replace(regex, "\377$1\377");	
	      var LISTEDEMOTS2=contentxt2.split("\377");
	      //console.log(LISTEDEMOTS2);
	      for (var nbmot2=0;nbmot2<LISTEDEMOTS2.length;nbmot2++) {
		  //-------------------------------------------------------------------------------------
		  // BUG constructor
		  LISTEDEMOTS2[nbmot2]=new String(LISTEDEMOTS2[nbmot2]);
		  if (LISTEDEMOTS2[nbmot2] == "constructor") {LISTEDEMOTS2[nbmot2]=LISTEDEMOTS2[nbmot2]+"⠀"};
		  //{ LISTEDEMOTS2[nbmot2] = "Constructor"; }
		  //-------------------------------------------------------------------------------------
		  if ((LISTEDEMOTS2[nbmot2] != "")) {
		      if (LISTEDEMOTS2[nbmot2] in dictionnairedesdelims)  {
			  //console.log("d : "+nbmot2+" : "+LISTEDEMOTS2[nbmot2]);
			  NBDELIMSource+=1;
			  dictionnairedesdelims[LISTEDEMOTS2[nbmot2]]++;
			  if (!(LISTEDEMOTS2[nbmot2] in dicForme2num)) {
			      numeroapparitionsurlatrameForme++;
			      dicForme2num[LISTEDEMOTS2[nbmot2]]=numeroapparitionsurlatrameForme;
			      dicNum2forme[numeroapparitionsurlatrameForme]=LISTEDEMOTS2[nbmot2];
			  }
		      }
		      else {
			  //console.log("f : "+nbmot2+" : "+LISTEDEMOTS2[nbmot2]);
			  //if (LISTEDEMOTS2[nbmot2] == "length") {LISTEDEMOTS2[nbmot2]=LISTEDEMOTS2[nbmot2]+"\032"};
			  //if (LISTEDEMOTS2[nbmot2] == "length") {LISTEDEMOTS2[nbmot2]=LISTEDEMOTS2[nbmot2]+"⠀"}; // attention caractère spécial invisible...
			  //---------------------------------------------------------------------------------------
			  if (!(LISTEDEMOTS2[nbmot2] in dicForme2num)) {
			      numeroapparitionsurlatrameForme++;
			      dicForme2num[LISTEDEMOTS2[nbmot2]]=numeroapparitionsurlatrameForme;
			      dicNum2forme[numeroapparitionsurlatrameForme]=LISTEDEMOTS2[nbmot2];
			  }
			 
			  NBMOTTOTALSource++;
			  //console.log(NBMOTTOTALSource+":"+LISTEDEMOTS2[nbmot2]);
			  if (DictionnaireSource[LISTEDEMOTS2[nbmot2]] === undefined) {
			      DictionnaireSource[LISTEDEMOTS2[nbmot2]] = 1;
			      NBMOTSource+=1;
			  }
			  else {
			      DictionnaireSource[LISTEDEMOTS2[nbmot2]] = DictionnaireSource[LISTEDEMOTS2[nbmot2]]  + 1;
			  }
		      }
		      trameForme[positionsurlatrame]=[];
		      trameForme[positionsurlatrame].push(dicForme2num[LISTEDEMOTS2[nbmot2]]);
		      positionsurlatrame++;
		      /*alert("W : <"+positionsurlatrame+"><"+LISTEDEMOTS[nbmot]+"><"+trameForme[positionsurlatrame]+"><"+dicNum2forme[trameForme[positionsurlatrame]]+">");*/
		  }
	      }
	  }
      }
      dicForme2num["\n"]=-1;
      dicNum2forme[-1]="\n";
      trameForme[positionsurlatrame]=[];
      trameForme[positionsurlatrame].push(-1);
      positionsurlatrame++;
  }
    nombredannotation=1;
    Dicodeslabelsdescolonnes=[];
    Dicodeslabelsdescolonnes.push("Forme");
    $('#IDannotations option').remove();
    $('#IDannotationsOUT option').remove();
    $('#IDannotations').append( '<option value="1">1:'+Dicodeslabelsdescolonnes[0]+'</option>' );
    $('#IDannotationsOUT').append( '<option value="1">1:'+Dicodeslabelsdescolonnes[0]+'</option>' );
    /*LISTEMOTSource= Object.keys(DictionnaireSource).sort(function(a,b){
      return a < b ? 1 : a > b ? -1 : 0;
      });*/
    var input = document.getElementById("poleID");
    var inputC = document.getElementById("poleCibleID");
    awesomplete = new Awesomplete(input);
    /*awesomplete.list = LISTEMOTSource;*/
    awesompleteC = new Awesomplete(inputC);
    /*awesompleteC.list = LISTEMOTSource;*/
    //changeAnnotationEncours();
    var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:#FDBBD2">Segmentation termin&eacute;e ('+NAMEFILE+' :'+NBMOTTOTALSource+' occurrences / '+NBMOTSource+ ' formes) </span></small>';
    return vide;
}
//-----------------------------------------------------------------------------------
function buildCadre(balise,position) {
	var nombal="";
	var valuebal="";
	var typebalise="";
	/* entete xml : rien */
	if (balise.search(/<\? ?xml>/) != -1) {
	}
	/* balise du type : <p> */
	if (balise.search(/<([^\/][^=>\"]*)>/) != -1) {
		balise=balise.replaceAll("<","");
		balise=balise.replaceAll(">","");
		nombal = balise;
		valuebal=balise;
		typebalise="B";
		var idBalise=position+'//'+typebalise+'//'+nombal+'//'+valuebal;
		listeBaliseSurTrame[idBalise]=position;
	}
	/* balise du type : <nom attribut="valeur"> */
	if (balise.search(/<([^\/][^=>\" ]*)[ ]+([^ ]+)[ ]*=[ ]*[\"]?([^>\"]+)[\"]?[ ]*>/) != -1) {
		/*alert(balise);*/
		balise=balise.replaceAll("<","");
		balise=balise.replaceAll(">","");
		balise=balise.replaceAll("\"","");
		var regexpbalise=new RegExp(" *= *", "gi");
		balise=balise.replace(regexpbalise,"=");
		regexpbalise=new RegExp("< +", "gi");
		balise=balise.replace(regexpbalise,"<");
		regexpbalise=new RegExp(" +>", "gi");
		balise=balise.replace(regexpbalise,">");
		regexpbalise=new RegExp(" +", "gi");
		balise=balise.replace(regexpbalise," ");
		var composantsBalise=balise.split(" ");
		nombal = composantsBalise.shift();
		var lereste=composantsBalise.shift();
		var composantsBalise2=lereste.split("=");
		var tmp1=composantsBalise2.shift();
		var tmp2=composantsBalise2.shift();
		valuebal=tmp1+"_"+tmp2;
		typebalise="B";
		var idBalise=position+'//'+typebalise+'//'+nombal+'//'+valuebal;
		listeBaliseSurTrame[idBalise]=position;
	}
	/* balise du type : <nom="valeur"> */
	if (balise.search(/<([^\/][^= ]*)[ ]*=[ ]*[\"]?([^>\"]+)[\"]?>/) != -1) {
		balise=balise.replaceAll("<","");
		balise=balise.replaceAll(">","");
		balise=balise.replaceAll("\"","");
		balise=balise.replaceAll(" ","");
		var composantsBalise=balise.split("=");
		nombal=composantsBalise.shift();
		valuebal=composantsBalise.shift();
		typebalise="B";
		var idBalise=position+'//'+typebalise+'//'+nombal+'//'+valuebal;
		listeBaliseSurTrame[idBalise]=position;
	}
	/* balise du type : </nom> */
 	if (balise.search(/<\/([^=>\"]+)>/) != -1) {
		balise=balise.replaceAll("</","");
		balise=balise.replaceAll(">","");
		nombal = balise;
		valuebal=balise;
		typebalise="L";
		var idBalise=position+'//'+typebalise+'//'+nombal+'//'+valuebal;
		listeBaliseSurTrame[idBalise]=position;
	}
	/*alert('BALISE : <'+typebalise+'><'+nombal+'><'+valuebal+'>');*/	
}
//-----------------------------------------------------------------------------------
function generateCadre () {
	lastOpenBaliseSurTrame = new Object();	
	dictionnairedesparties=new Object();	
	for (var index in listeBaliseSurTrame) {
		/*alert(index);*/
		var listeComposantsIndex=index.split("\/\/");
		var position=listeComposantsIndex.shift();
		var type=listeComposantsIndex.shift();
		var nom=listeComposantsIndex.shift();
		var val=listeComposantsIndex.shift();	
		/*alert(type+":"+nom+":"+val);*/
		if (type == "B") {
			if (dictionnairedesparties[nom] === undefined) {dictionnairedesparties[nom]=1};
			var idBaliseOuvrante='B//'+nom;
			var idBalise=position+'//B//'+nom+'//'+val;
			lastOpenBaliseSurTrame[idBaliseOuvrante]=listeBaliseSurTrame[idBalise]+"//"+val;
			/*alert("B:"+idBaliseOuvrante+"|"+idBalise);*/
		}
		else {
			var idBaliseOuvrante='B//'+nom;
			var contenantBaliseOuvrante=lastOpenBaliseSurTrame[idBaliseOuvrante];
			var composantsBaliseOuvrante=contenantBaliseOuvrante.split("\/\/");
			var valueBaliseOuvrante=composantsBaliseOuvrante.pop()
			var positionBaliseOuvrante=composantsBaliseOuvrante.pop()
			/*alert("F:"+valueBaliseOuvrante+"|"+positionBaliseOuvrante);*/
			/* on remplit la cadre...............................*/
			if (cadre[nom] === undefined) {
				cadre[nom]=new Object();
				cadre[nom][valueBaliseOuvrante]=[];
				cadre[nom][valueBaliseOuvrante].push(positionBaliseOuvrante,listeBaliseSurTrame[index]);
			}
			else {
				if (!($.isArray(cadre[nom][valueBaliseOuvrante]))) {
					cadre[nom][valueBaliseOuvrante]=[];
					cadre[nom][valueBaliseOuvrante].push(positionBaliseOuvrante,listeBaliseSurTrame[index]);
				}
				else {
					cadre[nom][valueBaliseOuvrante].push(positionBaliseOuvrante,listeBaliseSurTrame[index]);
				}
			}
			/* fin nouvelle partie dans cadre....................*/
		}
	}
	var listePartie2add=  Object.keys(dictionnairedesparties);
	$('#IDPartie option').remove();
	for (var i = 0; i < listePartie2add.length; i++) { 
		$('#IDPartie').append( '<option value="'+listePartie2add[i]+'">'+listePartie2add[i]+'</option>' );
	}
	var PARTITION =document.getElementById('IDPartie').value;
	if (PARTITION !="") {
		$('#IDParties option').remove();
		var LISTESDESPARTIES=Object.keys(cadre[PARTITION]);
		for (var i=0;i<LISTESDESPARTIES.length;i++) {
			$('#IDParties').append( '<option value="'+LISTESDESPARTIES[i]+'">'+LISTESDESPARTIES[i]+'</option>' );
		}
	}	
}
//-----------------------------------------------------------------------------------
function loadParties() {
	var PARTITION =document.getElementById('IDPartie').value;
	if (PARTITION !="") {
		$('#IDParties option').remove();
		var LISTESDESPARTIES=Object.keys(cadre[PARTITION]);
		for (var i=0;i<LISTESDESPARTIES.length;i++) {
			$('#IDParties').append( '<option value="'+LISTESDESPARTIES[i]+'">'+LISTESDESPARTIES[i]+'</option>' );
		}
	}	
}
//-----------------------------------------------------------------------------------
/* CADRE FONCTIONS */
/*---------------------------------------------------------------------------*/
function intersect(a, b) {
    return a.filter(Set.prototype.has, new Set(b));
}
function range(start, end) {
    var foo = [];
    for (var i = start; i <= end; i++) {
        foo.push(i);
    }
    return foo;
}
function makeNewPartition () {

    var partie1=document.getElementById('partie1ID').value;
    var partie2=document.getElementById('partie2ID').value;

    var newPartie=partie1+"_"+partie2;
    cadre[newPartie]=new Object();

    var TMPLIST1=Object.keys(cadre[partie1]);
    var TMPLIST2=Object.keys(cadre[partie2]);
   
    for (var j=0;j<TMPLIST1.length;j++) {
	var listepositions1 = cadre[partie1][TMPLIST1[j]];
	for (var k=0;k<(listepositions1.length);k=k+2) {
	    var deb1 = listepositions1[k];
	    var tmpk1=k+1;
	    var fin1 = listepositions1[tmpk1];
	    for (var p=0;p<TMPLIST2.length;p++) {
		var listepositions2 = cadre[partie2][TMPLIST2[p]];
		for (var q=0;q<(listepositions2.length);q=q+2) {
		    var deb2 = listepositions2[q];
		    var tmpk2=q+1;
		    var fin2 = listepositions2[tmpk2];
		    // inutile de faire la suite si pas nécessaire
		    if (((deb1 <= deb2) && (deb2 <= fin1)) || ((deb1 <= fin2) && (fin2 <= fin1)) || ((deb2 <= deb1) && (deb1 <= fin2))) { 
			//--------------------------------------------------------------------------
			var LISTE1=range(deb1,fin1);
			var LISTE2=range(deb2,fin2);
			var INTER=intersect(LISTE1,LISTE2);
			if (INTER.length > 0) {
			    var newPartieName=TMPLIST1[j]+"_"+TMPLIST2[p];
			    dictionnairedesparties[newPartie]=1;
			    if (!($.isArray(cadre[newPartie][newPartieName]))) {
				cadre[newPartie][newPartieName]=[];
				cadre[newPartie][newPartieName].push(INTER[0],INTER[INTER.length-1]);
			    }
			    else {
				cadre[newPartie][newPartieName].push(INTER[0],INTER[INTER.length-1]);
			    }
			}
		    }
		    //-----------------------------------------------------------------------------
		}
	    }
	}
    }
    var listePartie2add=  Object.keys(dictionnairedesparties);
    $('#IDPartie option').remove();
    for (var i = 0; i < listePartie2add.length; i++) { 
	$('#IDPartie').append( '<option value="'+listePartie2add[i]+'">'+listePartie2add[i]+'</option>' );
    }
    var PARTITION =document.getElementById('IDPartie').value;
    if (PARTITION !="") {
	$('#IDParties option').remove();
	var LISTESDESPARTIES=Object.keys(cadre[PARTITION]);
	for (var i=0;i<LISTESDESPARTIES.length;i++) {
	    $('#IDParties').append( '<option value="'+LISTESDESPARTIES[i]+'">'+LISTESDESPARTIES[i]+'</option>' );
	}
    }	
    
    /*
    var cptPartie=0;
    var TMPLIST3=Object.keys(cadre[newPartie]);
    for (var j=0;j<TMPLIST3.length;j++) {
	var listepositions = cadre[newPartie][TMPLIST3[j]];
	for (var k=0;k<(listepositions.length);k=k+2) {
	    var deb = listepositions[k];
	    var tmpk=k+1;
	    var fin = listepositions[tmpk];
	    cptPartie++;
	    console.log(cptPartie+"."+TMPLIST3[j]+" : "+deb+":"+fin)
	}
    }
    */
}


function drawCadre () {
    // WIP...
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }

    refreshItrameur()
    document.getElementById('placeholder2').style.height = "600px";

    var PARTITION =document.getElementById('IDPartie').value;
    var LISTESDESPARTIES=new Object(); 
    var DicoDesPositionsDesPartiesPourSections=new Array(); 
    var carte="";
    var nbPartie=0;
    for (var partie in dictionnairedesparties) {
	var TMPLIST=Object.keys(cadre[partie]);
	for (var j=0;j<TMPLIST.length;j++) {
	    var listepositions = cadre[partie][TMPLIST[j]];
	    for (var k=0;k<(listepositions.length);k=k+2) {
		var deb = listepositions[k];
		var tmpk=k+1;
		var fin = listepositions[tmpk];
		if (!($.isArray(DicoDesPositionsDesPartiesPourSections[deb]))) {
		    DicoDesPositionsDesPartiesPourSections[deb]=new Array();
		}
		if (!($.isArray(DicoDesPositionsDesPartiesPourSections[fin]))) {
		    DicoDesPositionsDesPartiesPourSections[fin]=new Array();
		}
		var tmpLabel=partie+"="+TMPLIST[j]+" <"+deb+":"+fin+">";
		DicoDesPositionsDesPartiesPourSections[deb].push(tmpLabel);
		tmpLabel=partie+"=ENDPARTIE";
		DicoDesPositionsDesPartiesPourSections[fin].push(tmpLabel);
	    }
	}
	
    }
    //carte+='<div class="boxPartie">';
    var lastNamePart="";
    var firstIndexTrame=Object.keys(trameForme)[0];
    var j=Number(firstIndexTrame);
    for (var k=1;k<firstIndexTrame;k++) {
	if (k in DicoDesPositionsDesPartiesPourSections) {
	    for (var i = 0; i < DicoDesPositionsDesPartiesPourSections[k].length; i++) {
		var searchPartName=DicoDesPositionsDesPartiesPourSections[k][i].split("=");
		if (searchPartName[1] == "ENDPARTIE") {
		    var PartName=searchPartName[0];
		    //if (PartName != lastNamePart) {
			carte+="</div>";
			//lastNamePart=PartName;
		    //}
		}
		else {
		    var PartName=searchPartName[0];
		    //if (PartName != lastNamePart) {
			carte+='<div class="boxPartie">';
			lastNamePart=PartName;
		    //}
		    carte+='<p>'+DicoDesPositionsDesPartiesPourSections[k][i]+"</p>";
		}
	    }
	}
    }

    for (var index in trameForme) {
	if (index in DicoDesPositionsDesPartiesPourSections) {
	    for (var i = 0; i < DicoDesPositionsDesPartiesPourSections[index].length; i++) {
		var searchPartName=DicoDesPositionsDesPartiesPourSections[index][i].split("=");
		if (searchPartName[1] == "ENDPARTIE") {
		    var PartName=searchPartName[0];
		    //if (PartName != lastNamePart) {
			carte+="</div>";
			lastNamePart=PartName;
		    //}
		}
		else {
		    var PartName=searchPartName[0];
		    //if (PartName != lastNamePart) {
			carte+='<div class="boxPartie">';
			lastNamePart=PartName;
		    //}
		    carte+='<p>'+DicoDesPositionsDesPartiesPourSections[index][i]+"</p>";
		}
	    }
	}
    }
    //carte+="</div>";
     $("#placeholder2").html(carte);
}

//-----------------------------------------------------------------------------------

function pclc () {
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    //-----------------------------------------------------------------
    refreshItrameur()
    //-----------------------------------------------------------------
    var PARTITION =document.getElementById('IDPartie').value;
    if (PARTITION == '') {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Aucune partition n\'est disponible...</span></small>';
	$("#placeholder").html(vide);	
	return;
    };
    var resultFinal=new Array();
    /* il faut récupérer les positions des parties */	
    var LISTESDESPARTIES=Object.keys(cadre[PARTITION]);
    //console.log("LISTEDESPARTIES : "+ LISTESDESPARTIES);
    for (var j=0;j<LISTESDESPARTIES.length;j++) {
	var nbPartie=LISTESDESPARTIES[j];
	var NBMOTTOTALPartie=0;
	var DictionnairePartie = new Object(); 
	var max=0;
	var formemax="";
	var listepositions = cadre[PARTITION][LISTESDESPARTIES[j]];
	for (var k=0;k<(listepositions.length);k=k+2) {
	    var deb = Number(listepositions[k]);
	    var tmpk=k+1;
	    var fin = Number(listepositions[tmpk]);
	    for (var pos=deb;pos<=fin;pos++) {
		//console.log(pos);
		var item=dicNum2forme[trameForme[pos][0]];	
		if (item in DictionnaireSource)  {
		    NBMOTTOTALPartie=NBMOTTOTALPartie+1;
		    if (DictionnairePartie[item] === undefined) {
			DictionnairePartie[item] = 1;
		    }
		    else {
			DictionnairePartie[item] = DictionnairePartie[item]  + 1;
		    }
		    if (DictionnairePartie[item] >= max) {
			max = DictionnairePartie[item];
			formemax=item;
		    }
		}
	    }
	}
	var nbFormePartie=Object.keys(DictionnairePartie).length;
	if (!($.isArray(resultFinal[j]))) {
	    resultFinal[j]=new Array();
	}
	resultFinal[j]=[];
	resultFinal[j].push(nbPartie,NBMOTTOTALPartie,nbFormePartie,formemax,max);
    }
    document.getElementById('placeholder').innerHTML = '<h4>P.C.L.C</h4><table id="PCLC" class="display" width="50%"></table>';
    $(document).ready(function() {
	$('#PCLC').DataTable ( {
	    order: [[ 0, "asc" ]],
	    data:resultFinal,
	    searchHighlight: true,
	    "destroy": true,
	    lengthMenu: [[10, 25, 50,100, -1], [10, 25, 50,100, "All"]],
	    dom: 'Bfrtip',
	    buttons: [
		'copy', 'csv', 'excel', 'pdf', 'print'
	    ],
	    columns: [
		{title: "Partie"},
		{title: "F occ"},
		{title: "f typ"},
		{title: "Forme max"},
		{title: "Max"}
	    ]
	})
    });
    
}
//-----------------------------------------------------------------------------------
function displayCadre() {
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    //-----------------------------------------------------------------
    refreshItrameur();
    //-----------------------------------------------------------------
    var resultFinal=new Array();
    var nbPartie=0;
    /*--------------------------*/
    for (var partie in dictionnairedesparties) {
	/*alert('LP : '+Object.keys(cadre[partie]));*/
	var TMPLIST=Object.keys(cadre[partie]);
	for (var j=0;j<TMPLIST.length;j++) {
	    var listepositions = cadre[partie][TMPLIST[j]];
	    /*alert('LPav<'+partie+':'+TMPLIST[j]+'> : '+listepositions);*/
	    /*while (listepositions.length > 0) {*/
	    for (var k=0;k<(listepositions.length);k=k+2) {
		var deb = Number(listepositions[k]);
		var tmpk=k+1;
		var fin = Number(listepositions[tmpk]);
		if (!($.isArray(resultFinal[nbPartie]))) {
		    resultFinal[nbPartie]=new Array();
		}
		resultFinal[nbPartie]=[];
		resultFinal[nbPartie].push(partie,TMPLIST[j],deb,fin);
		nbPartie=nbPartie+1; // pour prendre en compte les parties discontinues
	    }
	    //nbPartie=nbPartie+1;
	    /*alert('LPav<'+partie+':'+TMPLIST[j]+'> : '+listepositions);*/
	}
	
    }
    /*--------------------------*/
    document.getElementById('placeholder').innerHTML = '<h4>Le CADRE de la base textométrique</h4><table id="Cadre" class="display" width="50%"></table>';
    $(document).ready(function() {
	$('#Cadre').DataTable ( {
	    order: [[ 2, "asc" ]],
	    data:resultFinal,
	    searchHighlight: true,
	    "destroy": true,
	    lengthMenu: [[10, 25, 50,100, -1], [10, 25, 50,100, "All"]],
	    dom: 'Bfrtip',
	    buttons: [
		'copy', 'csv', 'excel', 'pdf', 'print'
	    ],
	    columns: [
		{title: "Partition"},
		{title: "Partie"},
		{title: "Début"},
		{title: "Fin"}
	    ]
	})
    });
}
//-----------------------------------------------------------------------------------
function viewSRBitexte(Volet) {
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);
	return;
    }
    var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Action indisponible  pour le moment...</span></small>';
    $("#placeholder").html(vide);
    return;

}
//-----------------------------------------------------------------------------------
function viewDicoBitexte(Volet) {
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    //-----------------------------------------------------------------
    refreshItrameur()
    //-----------------------------------------------------------------
    /* Affichage du dictionnaire */
    var DictionnaireDesItems = new Object();
    if (Volet == "S") {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireBitextSource);
    }
    if (Volet == "C") {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireBitextCible);
    }
    var resultFinal=new Array();
    var LISTEMOTS=Object.keys(DictionnaireDesItems);/*.sort(function(a,b){
	var x = DictionnaireDesItems[a];
	var y = DictionnaireDesItems[b];
	return x < y ? 1 : x > y ? -1 : 0;
    });;*/
    for (var i=0; i<LISTEMOTS.length;i++) {
	if (annotationencours>3) {
	    var identAnnot=LISTEMOTS[i].split("//");
	    var valAnnot=Number(identAnnot[0]);
	    if (annotationencours==valAnnot) {
		if (!($.isArray(resultFinal[i]))) {
		    resultFinal[i]=new Array();
		}
		resultFinal[i]=[];
		resultFinal[i].push(identAnnot[1],DictionnaireDesItems[LISTEMOTS[i]]);  
	    }
	}
	else {
	    if (!($.isArray(resultFinal[i]))) {
		resultFinal[i]=new Array();
	    }
	    resultFinal[i]=[];
	    resultFinal[i].push(LISTEMOTS[i],DictionnaireDesItems[LISTEMOTS[i]]);
	}
    }
    document.getElementById('placeholder2').style.height = "auto";
    if (Volet == "S") {
	document.getElementById('placeholder2').innerHTML = '<h4>Dictionnaire SOURCE</h4><table id="MyDicoFreq" class="display" width="50%"></table>';
    }
    if (Volet == "C") {
	document.getElementById('placeholder2').innerHTML = '<h4>Dictionnaire CIBLE</h4><table id="MyDicoFreq" class="display" width="50%"></table>';
    }
    $(document).ready(function() {
	var table = $('#MyDicoFreq').DataTable ( {
	    order: [[ 1, "desc" ]],
	    data:resultFinal,
	    searchHighlight: true,
	    "destroy": true,
	    dom: 'Bfrtip',
	    buttons: [
		'copy', 'csv', 'excel', 'pdf', 'print'
	    ],
	    columns: [
		{title: "Item"},
		{title: "Fq"},
		{title: "Concordance"},
		{title: "Ventilation"},
		{title: "Carte"},
		{title: "Sélection"}
	    ],
	    columnDefs: [ 
		{
		    "targets": 2,
		    "data": null,
		    /*"defaultContent": "<button value=\"C\"><i class=\"right\"></i></button>"*/
		    "defaultContent": "<button value=\"C\" class=\"btnC\"></button>"
		    } ,
		{
		    "targets": 3,
		    "data": null,
		    /*"defaultContent": "<button value=\"V\"><i class=\"up\"></i></button>"*/
		    "defaultContent": "<button value=\"V\" class=\"btnV\"></button>"
		},
		{
		    "targets": 4,
		    "data": null,
		    /*"defaultContent": "<button value=\"S\"><i class=\"rectD\"></i></button>"*/
		    "defaultContent": "<button value=\"S\" class=\"btnS\"></button>"
		},
		{
		    "targets": 5,
		    "data": null,
		    /*"defaultContent": "<button value=\"S\"><i class=\"rectD\"></i></button>"*/
			"defaultContent": "<button value=\"A\" class=\"btnA\"></button>"
		}
	    ]
	})
	$('#MyDicoFreq tbody').on( 'click', 'button', function () {
	    var data = table.row( $(this).parents('tr') ).data();
	    var a="";
	    var b="";
	    if (Volet == "S") {
		a=document.getElementById('poleID');
		a.value = data[0];
	    }
	    if (Volet == "C") {
		a=document.getElementById('poleCibleID');
		a.value = data[0];
		b=document.getElementById('poleCibleID');
		b.value = data[0];
	    }

	    var fired_button = $(this).val();
	    if (fired_button=="C") {
		concordance();
	    }
	    if (fired_button=="S") {
		carteDesSections();
	    }
	    if (fired_button=="V") {
		if (Volet == "C") {
		    var b=document.getElementById('poleID');
		    b.value = data[0];
		}
		ventilationPartie();
	    }
	    if (fired_button=="A") {
		selectItemInDico();
	    }
	} );
    });
}
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
function viewdico(){ // MODIF 2018
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    //-----------------------------------------------------------------
    refreshItrameur();
    //-----------------------------------------------------------------
    /* Affichage du dictionnaire */
    var DictionnaireDesItems = new Object();
    if (annotationencours==1) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
    }
    if (annotationencours==2) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireLemme);
    }
    if (annotationencours==3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireCategorie);
    }
    if (annotationencours>3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireAnnotation);
    }
    var resultFinal=new Array();
    var LISTEMOTS=Object.keys(DictionnaireDesItems);
    /*.sort(function(a,b){
	var x = DictionnaireDesItems[a];
	var y = DictionnaireDesItems[b];
	return x < y ? 1 : x > y ? -1 : 0;
    }); */
    var nbElementInDico=0;
    for (var i=0; i<LISTEMOTS.length;i++) {
	if (annotationencours>3) {
	    var identAnnot=LISTEMOTS[i].split("//");
	    var valAnnot=Number(identAnnot[0]);
	    if (annotationencours==valAnnot) {
		if (!($.isArray(resultFinal[nbElementInDico]))) {
		    resultFinal[nbElementInDico]=new Array();
		}
		resultFinal[nbElementInDico]=[];
		resultFinal[nbElementInDico].push(identAnnot[1],DictionnaireDesItems[LISTEMOTS[i]]);  
		nbElementInDico++;
	    }
	}
	else {
	    if (!($.isArray(resultFinal[nbElementInDico]))) {
		resultFinal[nbElementInDico]=new Array();
	    }
	    resultFinal[nbElementInDico]=[];
	    resultFinal[nbElementInDico].push(LISTEMOTS[i],DictionnaireDesItems[LISTEMOTS[i]]);
	    nbElementInDico++;
	}
    }
    /*--------------------------*/
    document.getElementById('placeholder2').style.height = "auto";
    document.getElementById('placeholder2').innerHTML = '<h4>Dictionnaire</h4><table id="MyDicoFreq" class="display" width="60%"></table>';
    $(document).ready(function() {
	var table = $('#MyDicoFreq').DataTable ( {
	    order: [[ 1, "desc" ]],
	    data:resultFinal,
	    "deferRender": true,
	    searchHighlight: true,
	    "destroy": true,
	    dom: 'Bfrtip',
	    buttons: [
		'copy', 'csv', 'excel', 'pdf', 'print'
	    ],
	    columns: [
		{title: "Item"},
		{title: "Fq"},
		{title: "Concordance"},
		{title: "Ventilation"},
		{title: "Carte"},
		{title: "Sélection"}
	    ],
	    columnDefs: [ 
		{
		    "targets": 2,
		    "data": null,
		    /*"defaultContent": "<button value=\"C\"><i class=\"right\"></i></button>"*/
			"defaultContent": "<button value=\"C\" class=\"btnC\"></button>"
		} ,
		{
		    "targets": 3,
		    "data": null,
		    /*"defaultContent": "<button value=\"V\"><i class=\"up\"></i></button>"*/
			"defaultContent": "<button value=\"V\" class=\"btnV\"></button>"
		},
		{
		    "targets": 4,
		    "data": null,
		    /*"defaultContent": "<button value=\"S\"><i class=\"rectD\"></i></button>"*/
			"defaultContent": "<button value=\"S\" class=\"btnS\"></button>"
		},
		{
		    "targets": 5,
		    "data": null,
		    /*"defaultContent": "<button value=\"S\"><i class=\"rectD\"></i></button>"*/
			"defaultContent": "<button value=\"A\" class=\"btnA\"></button>"
		}
	    ]
	});
	$('#MyDicoFreq tbody').on( 'click', 'button', function () {
	    var data = table.row( $(this).parents('tr') ).data();
	    var a=document.getElementById('poleID');
	    a.value = data[0];
	    var inputBitext = document.getElementById ("bitextID");
	    var isCheckedBitext = inputBitext.checked;
	    var b="";
	    if (isCheckedBitext) {
		b=document.getElementById('poleCibleID');
		b.value = data[0];
	    }
	    var fired_button = $(this).val();
	    if (fired_button=="C") {
		concordance();
	    }
	    if (fired_button=="S") {
		carteDesSections();
	    }
	    if (fired_button=="V") {
		ventilationPartie();
	    }
	    if (fired_button=="A") {
		selectItemInDico();
	    }
	} );
    });
}
//-----------------------------------------------------------------------------------
function ventilationSRPartie() {
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    var PARTITION =document.getElementById('IDPartie').value;
    if (PARTITION == '') {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Aucune partition n\'est disponible...</span></small>';
	$("#placeholder").html(vide);	
	return;
    };

    refreshItrameur()
    
    var seuil=document.getElementById('seuilID').value;
    if (seuil == ''){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur numérique pour le seuil...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    var DictionnaireDesItems = new Object();
    var DictionnaireNumDesItems = new Object();
    if (annotationencours==1) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
    }
    if (annotationencours==2) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireLemme);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2lemme);
    }
    if (annotationencours==3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireCategorie);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2categorie);
    }
    if (annotationencours>3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireAnnotation);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2annotation);
    }
    var annotationencoursIndex=annotationencours-1;
    var freqsegmentSR=document.getElementById('srfqID').value;
    var queryText=document.getElementById('SRpoleID').value;
    if (!(queryText in listeSROK))  {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Ce segment n\'est pas un SR...</span></small>';
	$("#placeholder").html(vide);
	return;
    }
    else { 
	if (listeSROK[queryText] < freqsegmentSR)  {
	    var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Ce segment n\'est pas un SR...</span></small>';
	    $("#placeholder").html(vide);
	    return;
	}
    }
    //var PARTITION =document.getElementById('IDPartie').value;
    var PARTIES = new Object();
    var PARTIESspecif = new Object();
    var etiquettes=[];
    /* il faut récupérer les positions des parties */	
    var LISTESDESPARTIES=Object.keys(cadre[PARTITION]);
    //alert("LISTE DES PARTIES : "+LISTESDESPARTIES);
    for (var j=0;j<LISTESDESPARTIES.length;j++) {
	var nbPartie=LISTESDESPARTIES[j];
	//alert("PARTIE : "+nbPartie);
	etiquettes.push(nbPartie);
	var NBMOTTOTALPartie=0;
	var DictionnairePartie = new Object(); 
	if (!($.isArray(PARTIES[nbPartie]))) {
	    PARTIES[nbPartie]=new Array();
	}
	if (!($.isArray(PARTIESspecif[nbPartie]))) {
	    PARTIESspecif[nbPartie]=new Array();
	}
	if (!PARTIES[nbPartie].hasOwnProperty(queryText)) {
	    PARTIES[nbPartie][queryText]=0;  
	}
	if (!PARTIESspecif[nbPartie].hasOwnProperty(queryText)) {
	    PARTIESspecif[nbPartie][queryText]=0;  
	}
	var listepositions = cadre[PARTITION][LISTESDESPARTIES[j]];
	//alert("LISTEPOSITIONS : "+listepositions);
	for (var k=0;k<(listepositions.length);k=k+2) {
	    var deb = Number(listepositions[k]);
	    var tmpk=k+1;
	    var fin = Number(listepositions[tmpk]);
	    //alert("DEB : "+deb+"|FIN : "+fin);
	    for (var pos=deb;pos<=fin;pos++) {
		var item=DictionnaireNumDesItems[trameForme[pos][annotationencoursIndex]];
		if (!(dicNum2forme[trameForme[pos][0]] in dictionnairedesdelims))  {
		    NBMOTTOTALPartie=NBMOTTOTALPartie+1;
		    if ((queryText != '') && (queryText != 'entrez le SR')) {
			var lesmotsduSR=queryText.split(" ");
			if (lesmotsduSR[0] == item) {
			    //var resuSR1 = verifSRatThisPos(pos,queryText);
			    var resuSR1="NO";	
			    if (dictionnaireventilationdesSR[pos] !== undefined) {
				var listeMotsduSR=queryText.split(" ");
				var longueurSR=listeMotsduSR.length;
				var lgsr=dictionnaireventilationdesSR[pos];
				if (longueurSR <= lgsr) {
				    var tmpsr=DictionnaireNumDesItems[trameForme[pos][annotationencoursIndex]];
				    var lgtmpsr=1;
				    var kk=1;
				    var tmpindex=pos;//Number(pos);
				    var matchW = "OK";
				    var m=1;
				    while ((lgtmpsr < longueurSR) && (matchW == "OK")) {
					if ((dicNum2forme[trameForme[tmpindex+kk][0]] in dictionnairedesdelims ) || (trameForme[tmpindex+kk][0] == -1 )) {
					    tmpsr=tmpsr + " ";
					} 
					else {
					    if (DictionnaireNumDesItems[trameForme[tmpindex+kk][annotationencoursIndex]] == listeMotsduSR[m]) {
						tmpsr=tmpsr + DictionnaireNumDesItems[trameForme[tmpindex+kk][annotationencoursIndex]];
						lgtmpsr++;
						m++;
					    }
					    else {
						matchW = "BAD";
					    }
					}
					kk++;	
				    }
				    if (matchW == "OK") { // pas necessaire ??
	    				var reg0=new RegExp(" +$", "g"); 
					tmpsr=tmpsr.replace(reg0,"");
					var reg1=new RegExp(" +", "g"); 
					tmpsr=tmpsr.replace(reg1," ");	
					if (queryText == tmpsr) {
					    resuSR1="OK";
					}
				    }
				}
			    }
			    //---------------------------
			    if (resuSR1 == "OK") {
				PARTIES[nbPartie][queryText]=PARTIES[nbPartie][queryText]+1;
				if (!DictionnairePartie.hasOwnProperty(queryText)) {
				    DictionnairePartie[queryText] = 1;
				}
				else {
				    DictionnairePartie[queryText] = DictionnairePartie[queryText]  + 1;
				}	
			    }
			}
		    }
		}
	    }
	}
	if (DictionnairePartie[queryText] === undefined) {
	    DictionnairePartie[queryText] = 0;
	}
	var Tsource = NBMOTTOTALSource;
	var tsource = NBMOTTOTALPartie; /* nb d'occ de la partie */
	/*alert(nbPartie+'<'+Tsource+':'+tsource+':'+DictionnaireSource[queryText]+':'+DictionnairePartie[queryText]+':'+seuil+'>');*/
	var result = CalcCoeffSpec(Tsource,tsource,listeSROK[queryText],DictionnairePartie[queryText],seuil); 
	result=precise_round(result,0);
        if (result==Infinity) {result=9e15}
        if (result==-Infinity) {result=-9e15}
	//if (result >= 50) { result = Infinity};
	//if (result <= -50) { result = -Infinity};
	//if (result >= 50) { result = 50};
	//if (result <= -50) { result = -50};
	PARTIESspecif[nbPartie][queryText]=result;
	
    }
    var LISTEKEYSPARTIES2= Object.keys(PARTIES);
    /*var etiquettes=[];*/
    var series=[];
    var series2=[];
    var LegendNames=[];
    LegendNames[0]=queryText;
    
    for (var i=0; i<LISTEKEYSPARTIES2.length;i++) {
	series.push(PARTIES[LISTEKEYSPARTIES2[i]][queryText]);
	series2.push(PARTIESspecif[LISTEKEYSPARTIES2[i]][queryText]);
    }
    
    document.getElementById('placeholder').innerHTML = '';
    GrapheArborL=document.getElementById('grLID').value;
    GrapheArborH=document.getElementById('grHID').value;	
    var data = {
	labels: etiquettes,
	series: [series]
    };
    var data2 = {
	labels: etiquettes,
	series: [series2]
    };
    var options = {
 	width: GrapheArborL,
	height: GrapheArborH,
	/*chartPadding: {
	    right: 40
	},*/
	plugins: [
	    Chartist.plugins.legend({
		legendNames: LegendNames,
		position: 'top'
	    })
	]
    };
    var options2 = {
	width: GrapheArborL,
	height: GrapheArborH,
	reverseData: false,
	horizontalBars: false,
	seriesBarDistance: 10,
	axisY: {
	    offset: 70
	},
	plugins: [
	    Chartist.plugins.legend({
		legendNames: LegendNames,
		position: 'top'
	    })
	]
    };
    
    var titreGraphe='<p align="center">Graphiques de ventilation <small>(annotation : '+annotationencours+')</small> sur la partition <span style="background-color:silver">'+ PARTITION +'</span> : Fréquence absolue <small>(haut)</small> / Spécificité <small>(bas)</small></p>';
    document.getElementById('legendGraphe').innerHTML = titreGraphe;
    
    new Chartist.Line('#graph-analysis1', data, options);
    var legend1='<p align="center"><br/><br/><br/><br/><br/></p>';
    document.getElementById('legend-graph-analysis1').innerHTML += legend1;
    
    new Chartist.Bar('#graph-analysis2', data2, options2);
    var legend2='<p align="center"><br/><br/><br/><br/><br/></p>';
    document.getElementById('legend-graph-analysis2').innerHTML += legend2;
    document.getElementById('placeholder').innerHTML = '';
}
//-----------------------------------------------------------------------------------
function ventilationPartie () {
	if (FILEINPUTTOREAD == "") {
	    var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
 $("#placeholder").html(vide);       return;
	}
	var PARTITION =document.getElementById('IDPartie').value;
    if (PARTITION == '') {
	    var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Aucune partition n\'est disponible...</span></small>';
 $("#placeholder").html(vide);		return;
	};

    refreshItrameur();
	
	var seuil=document.getElementById('seuilID').value;
    if (seuil == ''){
	    var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur numérique pour le seuil...</span></small>';
 $("#placeholder").html(vide);       return;
    }
	var DictionnaireDesItems = new Object();
	var DictionnaireNumDesItems = new Object();
	if (annotationencours==1) {
		DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
		DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
	}
	if (annotationencours==2) {
		DictionnaireDesItems = jQuery.extend({}, DictionnaireLemme);
		DictionnaireNumDesItems=jQuery.extend({}, dicNum2lemme);
	}
	if (annotationencours==3) {
		DictionnaireDesItems = jQuery.extend({}, DictionnaireCategorie);
		DictionnaireNumDesItems=jQuery.extend({}, dicNum2categorie);
	}
	if (annotationencours>3) {
		DictionnaireDesItems = jQuery.extend({}, DictionnaireAnnotation);
		DictionnaireNumDesItems=jQuery.extend({}, dicNum2annotation);
	}
	
	var annotationencoursIndex=annotationencours-1;
	var queryText=document.getElementById('poleID').value;
    if (queryText == ''){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez un pôle pour pouvoir lancer le calcul...</span></small>';
	$("#placeholder").html(vide);        
	return;
    }
	
	// on cherche si plusieurs pôles ont été fournis 
	var reg0=new RegExp(" +$", "g"); 
	queryText=queryText.replace(reg0,"");
	var reg1=new RegExp("^ +", "g"); 
	queryText=queryText.replace(reg1,"");
	var reg2=new RegExp(" +", "g"); 
	queryText=queryText.replace(reg2," ");
	var listQueryTextInput = queryText.split(" ");
	var nombreMotif=0;
	var listQueryTextOutput=[];
	for (var j=0;j<listQueryTextInput.length;j++) {
		if (annotationencours <=3 ) {
			if (listQueryTextInput[j] in DictionnaireDesItems)  {
				nombreMotif++;
				listQueryTextOutput.push(listQueryTextInput[j]);
			}
		}
		else {
			var tmpannot = annotationencours+"//"+listQueryTextInput[j];
			if (tmpannot in DictionnaireDesItems)  {
				nombreMotif++;
				listQueryTextOutput.push(listQueryTextInput[j]);
			}
				
		}
	}
	if (nombreMotif == 0) {
	    var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Le pôle choisi n\'est pas dans le dictionnaire...</span></small>';
	    $("#placeholder").html(vide);        
	    return;	
	}
	
	//var PARTITION =document.getElementById('IDPartie').value;
	var PARTIES = new Object();
	var PARTIESrelative = new Object();
    var PARTIESspecif = new Object();
	var etiquettes=[];
	/* il faut récupérer les positions des parties */	
	var LISTESDESPARTIES=Object.keys(cadre[PARTITION]);
	for (var j=0;j<LISTESDESPARTIES.length;j++) {
		var nbPartie=LISTESDESPARTIES[j];
		etiquettes.push(nbPartie);
		var NBMOTTOTALPartie=0;
		var DictionnairePartie = new Object(); 
		if (!($.isArray(PARTIES[nbPartie]))) {
			PARTIES[nbPartie]=new Array();
		}
		if (!($.isArray(PARTIESrelative[nbPartie]))) {
			PARTIESrelative[nbPartie]=new Array();
		}
		if (!($.isArray(PARTIESspecif[nbPartie]))) {
			PARTIESspecif[nbPartie]=new Array();
		}
		for (var k=0;k<listQueryTextOutput.length;k++) {
		    if (!PARTIES[nbPartie].hasOwnProperty(listQueryTextOutput[k])) {
				PARTIES[nbPartie][listQueryTextOutput[k]]=0;  
			}
		    if (!PARTIESspecif[nbPartie].hasOwnProperty(listQueryTextOutput[k])) {
				PARTIESspecif[nbPartie][listQueryTextOutput[k]]=0;  
			}
		    if (!PARTIESrelative[nbPartie].hasOwnProperty(listQueryTextOutput[k])) {
				PARTIESrelative[nbPartie][listQueryTextOutput[k]]=0;  
			}
		}
		var listepositions = cadre[PARTITION][LISTESDESPARTIES[j]];
		for (var k=0;k<(listepositions.length);k=k+2) {
			var deb = Number(listepositions[k]);
			var tmpk=k+1;
			var fin = Number(listepositions[tmpk]);
			for (var pos=deb;pos<=fin;pos++) {
				var item=DictionnaireNumDesItems[trameForme[pos][annotationencoursIndex]];
				if (!(dicNum2forme[trameForme[pos][0]] in dictionnairedesdelims))  {
					NBMOTTOTALPartie=NBMOTTOTALPartie+1;
					for (var z=0;z<listQueryTextOutput.length;z++) {
						if (item == listQueryTextOutput[z]) {
							PARTIES[nbPartie][listQueryTextOutput[z]]=PARTIES[nbPartie][listQueryTextOutput[z]]+1;
						}
					}
				    if (DictionnairePartie.hasOwnProperty(item)) {
					DictionnairePartie[item] = DictionnairePartie[item]  + 1;	
				    }
				    else {
					
					DictionnairePartie[item] = 1;
				    }
				}
			}
		}
		for (var x=0;x<listQueryTextOutput.length;x++) {
			if (DictionnairePartie[listQueryTextOutput[x]] === undefined) {
				DictionnairePartie[listQueryTextOutput[x]] = 0;
			}
			var Tsource = NBMOTTOTALSource;
			var tsource = NBMOTTOTALPartie; /* nb d'occ de la partie */
			/*alert(nbPartie+'<'+Tsource+':'+tsource+':'+DictionnaireSource[queryText]+':'+DictionnairePartie[queryText]+':'+seuil+'>');*/
			var result;
			if (annotationencours <= 3) {
				result = CalcCoeffSpec(Tsource,tsource,DictionnaireDesItems[listQueryTextOutput[x]],DictionnairePartie[listQueryTextOutput[x]],seuil); 
			}
			else {
				var tmp=annotationencours+"//"+listQueryTextOutput[x];
				result = CalcCoeffSpec(Tsource,tsource,DictionnaireDesItems[tmp],DictionnairePartie[listQueryTextOutput[x]],seuil); 
			}
			result=precise_round(result,0);
            if (result==Infinity) {result=9e15}
            if (result==-Infinity) {result=-9e15}

//			if (result >= 50) { result = Infinity};
//			if (result <= -50) { result = -Infinity};
//		    if (result >= 50) { result = 50};
//		    if (result <= -50) { result = -50};
			PARTIESspecif[nbPartie][listQueryTextOutput[x]]=result;
			if (NBMOTTOTALPartie > 0) {
				PARTIESrelative[nbPartie][listQueryTextOutput[x]] = ((DictionnairePartie[listQueryTextOutput[x]] / NBMOTTOTALPartie)*10000);
			}
			else {
				PARTIESrelative[nbPartie][listQueryTextOutput[x]] = 0;
			}
		}
	}
	var LISTEKEYSPARTIES2= Object.keys(PARTIES);
	/*var etiquettes=[];*/
	var series=[];
	var series1=[];
	var series2=[];
	var LegendNames=[];
	
	for (var k=0;k<listQueryTextOutput.length;k++) {
		series[k]=[];
		series1[k]=[];
		series2[k]=[];
		LegendNames[k]=listQueryTextOutput[k];
	}
	
	for (var k=0;k<listQueryTextOutput.length;k++) {
		for (var i=0; i<LISTEKEYSPARTIES2.length;i++) {
			series[k][i]=PARTIES[LISTEKEYSPARTIES2[i]][listQueryTextOutput[k]];
			series1[k][i]=PARTIESrelative[LISTEKEYSPARTIES2[i]][listQueryTextOutput[k]];
			series2[k][i]=PARTIESspecif[LISTEKEYSPARTIES2[i]][listQueryTextOutput[k]];
		}
    }
	document.getElementById('placeholder').innerHTML = '';
	GrapheArborL=document.getElementById('grLID').value;
    GrapheArborH=document.getElementById('grHID').value;	
	var data = {
			labels: etiquettes,
			series: series
		};
	var data1 = {
			labels: etiquettes,
			series: series1
		};
	var data2 = {
			labels: etiquettes,
			series: series2
		};
	var options = {
 			width: GrapheArborL,
			height: GrapheArborH,
			/*chartPadding: {
				right: 40
			},*/
			plugins: [
				Chartist.plugins.legend({
					legendNames: LegendNames,
					position: 'top'
				})
			]
	};
	var options2 = {
			width: GrapheArborL,
			height: GrapheArborH,
			reverseData: false,
			horizontalBars: false,
			seriesBarDistance: 10,
			axisY: {
				offset: 70
			},
			plugins: [
				Chartist.plugins.legend({
					legendNames: LegendNames,
					position: 'top'
				})
			]
		};

	var titreGraphe='<p align="center">Graphiques de ventilation <small>(annotation : '+annotationencours+')</small> sur la partition <span style="background-color:silver">'+ PARTITION +'</span> : Fréquence absolue <small>(haut)</small> / Fréquence relative <small>(centre)</small> / Spécificité <small>(bas)</small><br/><small>Clic sur item dans légende pour masquer/afficher courbe de l\'item visé</small></p>';
	document.getElementById('legendGraphe').innerHTML = titreGraphe;
		
	new Chartist.Line('#graph-analysis1', data, options);
	var legend1='<p align="center"><br/><br/><br/><br/><br/></p>';
	document.getElementById('legend-graph-analysis1').innerHTML += legend1;

	new Chartist.Line('#graph-analysis2', data1, options);
	var legend2='<p align="center"><br/><br/><br/><br/><br/></p>';
	document.getElementById('legend-graph-analysis2').innerHTML += legend2;
	
	new Chartist.Bar('#graph-analysis3', data2, options2);
	var legend3='<p align="center"><br/><br/><br/><br/><br/></p>';
	document.getElementById('legend-graph-analysis3').innerHTML += legend3;
	document.getElementById('placeholder').innerHTML = '';
}
//-----------------------------------------------------------------------------------
/* TRAME FONCTIONS */
/*---------------------------------------------------------------------------*/
function fusionAnnotation() {
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);       return;
    }
    if ((nombredannotation == 1) || (nombredannotation < 3)) {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Impossible de fusionner des annotations sur cette base : il faut au moins 3 annotations dans la base...</span></small>';
	$("#placeholder").html(vide);       return;
    }
    
    var Annots=document.getElementById('fusionAnnotID').value;
    var listeAnnot=Annots.split("&");
    
    for (var i=0;i<listeAnnot.length;i++) {
	if (listeAnnot[i] > nombredannotation) {
	    var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Annotation '+listeAnnot[i]+' indisponible...</span></small>';
		    $("#placeholder").html(vide);
	    return;
	}
    }
    // new label for new annotation
    if (Dicodeslabelsdescolonnes.length > 0) {
	var newlabel=[];
	for (var i=0;i<listeAnnot.length;i++) {
	    newlabel.push(Dicodeslabelsdescolonnes[listeAnnot[i]-1]);
	}
	Dicodeslabelsdescolonnes.push(newlabel.join("_"));
    }
    nombredannotation++;
    for (var index in trameForme) {
	var itemForme = dicNum2forme[trameForme[index][0]];
	if (!(itemForme in dictionnairedesdelims))  {
	    var annot1="";
	    if (listeAnnot[0]==1) {
		annot1=dicNum2forme[trameForme[index][0]];
	    }
	    if (listeAnnot[0]==2) {
		annot1=dicNum2lemme[trameForme[index][1]];
	    }
	    if (listeAnnot[0]==3) {
		annot1=dicNum2categorie[trameForme[index][2]];
	    }
	    if (listeAnnot[0]>3) {
		var annottmp=Number(listeAnnot[0]) - 1;
		annot1=dicNum2annotation[trameForme[index][annottmp]];
	    }
	    var annot2="";
	    if (listeAnnot[1]==1) {
		annot2=dicNum2forme[trameForme[index][0]];
	    }
	    if (listeAnnot[1]==2) {
		annot2=dicNum2lemme[trameForme[index][1]];
	    }
	    if (listeAnnot[1]==3) {
		annot2=dicNum2categorie[trameForme[index][2]];
	    }
	    if (listeAnnot[1]>3) {
		var annottmp=Number(listeAnnot[1]) - 1;
		annot2=dicNum2annotation[trameForme[index][annottmp]];
	    }			
	    var annot = annot1+"_"+annot2;
	    if (!(annot in dicAnnotation2num)) {
		numeroapparitionsurlatrameAnnotation++;
		dicAnnotation2num[annot]=numeroapparitionsurlatrameAnnotation;
		dicNum2annotation[numeroapparitionsurlatrameAnnotation]=annot;
	    }
	    var identAnnot=nombredannotation+"//"+annot;
	    if (DictionnaireAnnotation[identAnnot] === undefined) {
		DictionnaireAnnotation[identAnnot] = 1;
	    }
	    else {
		DictionnaireAnnotation[identAnnot] = DictionnaireAnnotation[identAnnot]  + 1;
	    }
	    trameForme[index].push(dicAnnotation2num[annot]);
	}
	else {
	    var annot = itemForme;
	    if (!(annot in dicAnnotation2num)) {
		numeroapparitionsurlatrameAnnotation++;
		dicAnnotation2num[annot]=numeroapparitionsurlatrameAnnotation;
		dicNum2annotation[numeroapparitionsurlatrameAnnotation]=annot;
	    }
	    trameForme[index].push(dicAnnotation2num[annot]);
	}
    }
    $('#IDannotations option').remove();
    $('#IDannotationsOUT option').remove();
    for (var ii=1;ii<=nombredannotation;ii++){
	if (Dicodeslabelsdescolonnes.length == 0) {
	    $('#IDannotations').append( '<option value="'+ii+'">'+ii+'</option>' );
	    $('#IDannotationsOUT').append( '<option value="'+ii+'">'+ii+'</option>' );
	}
	else {
	    $('#IDannotations').append( '<option value="'+ii+'">'+ii+':'+Dicodeslabelsdescolonnes[ii-1]+'</option>' );
	    $('#IDannotationsOUT').append( '<option value="'+ii+'">'+ii+':'+Dicodeslabelsdescolonnes[ii-1]+'</option>' );
	}
    }
    var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:#FDBBD2">Ajout annotation termin&eacute; : la base dispose de '+nombredannotation+' couches d\'annotations </span></small>';
    $("#placeholder").html(vide);
    return 0;
}
/*---------------------------------------------------------------------------*/
function concordancepatron() {
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    if ((nombredannotation == 1) || (nombredannotation < 3)) {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Impossible de lancer ce calcul sur cette base : il faut au moins 3 annotations dans la base...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    /*-------------------------------------*/
    gestionnaireSelectionTMP = new Object();
    for (var index in trameForme) {
	gestionnaireSelectionTMP[index]=0;
    }
    /*-------------------------------------*/
    var AnnotPatron=document.getElementById('annotpatronID').value;
    var Patron=document.getElementById('patronID').value;
    
    var reg0=new RegExp(" +$", "g"); 
    Patron=Patron.replace(reg0,"");
    var reg2=new RegExp("^ +", "g"); 
    Patron=Patron.replace(reg2,"");
    var reg1=new RegExp(" +", "g"); 
    Patron=Patron.replace(reg1," ");
    
    var listePOS=Patron.split(" ");
    
    var nbitempatron=0;
    var AnnotTerm=document.getElementById('annottermeID').value;
    if (AnnotPatron > 3) {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Impossible pour le moment de lancer ce calcul sur une annotation > 3...</span></small>';
	$("#placeholder").html(vide);	
	return;		
    }
    if (AnnotPatron > nombredannotation) {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Impossible  de lancer ce calcul sur une annotation supérieure au nom d\'annotation...</span></small>';
	$("#placeholder").html(vide);	
	return;		
    }
    if (AnnotTerm > 3) {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Impossible pour le moment de lancer ce calcul sur une annotation > 3...</span></small>';
	$("#placeholder").html(vide);	
	return;		
    }
    if (AnnotTerm > nombredannotation) {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Impossible  de lancer ce calcul sur une annotation supérieure au nom d\'annotation...</span></small>';
	$("#placeholder").html(vide);	
	return;		
    }
    
    refreshItrameur();

    //---- Verif des elements du patron -----//
    for (var k = 0; k < listePOS.length; k++) {
	nbitempatron++;
	if (AnnotPatron == 1) {
	    if ((!(listePOS[k] in DictionnaireSource)) & (listePOS[k]!="ANY"))  {
		var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Terme '+ listePOS[k] + ' inconnu dans le dictionnaire...</span></small>';
		$("#placeholder").html(vide);		
		return;
	    }
	}
	if (AnnotPatron == 2) {
	    if ((!(listePOS[k] in DictionnaireLemme)) & (listePOS[k]!="ANY")) {
		var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Terme '+ listePOS[k] + ' inconnu dans le dictionnaire...</span></small>';
		$("#placeholder").html(vide);		
		return;
	    }
	}
	if (AnnotPatron == 3) {
	    if ((!(listePOS[k] in DictionnaireCategorie)) & (listePOS[k]!="ANY"))  {
		var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Terme '+ listePOS[k] + ' inconnu dans le dictionnaire...</span></small>';
		$("#placeholder").html(vide);		
		return;
	    }
	}
	/*if (AnnotPatron >= 4) {
	  var tvaleur2=AnnotPatron;
	  var tvaleur1="tvaleur2"+"//"+"listePOS[k]";
	  if (!(tvaleur1 in DictionnaireAnnotation) ) {
	  var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Terme '+ listePOS[k] + ' inconnu dans le dictionnaire...</span></small>';
	  document.getElementById('placeholder').innerHTML = '';
	  document.getElementById('placeholder').innerHTML += vide;
	  return;
	  }
	  }*/
    }
    //---------------------------------------//
    var DictionnaireDesItems = new Object();
    var DictionnaireNumDesItems = new Object();
    if (AnnotPatron==1) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
    }
    if (AnnotPatron==2) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireLemme);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2lemme);
    }
    if (AnnotPatron==3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireCategorie);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2categorie);
    }
    /*if (AnnotPatron>3) {
      DictionnaireDesItems = jQuery.extend({}, DictionnaireAnnotation);
      DictionnaireNumDesItems=jQuery.extend({}, dicNum2annotation);
      }*/
    var listepatrons=new Object();
    var listepatrons2graph=new Object();
    var nbpatron=0;
    var patronencours="";
    var nbitemencours=0;
    var listeposition=[];
    var out;
    for (var j in trameForme) {
	if (!(dicNum2forme[trameForme[j][0]] in dictionnairedesdelims)) {
	    var ok=0;
	    var i;
	    var k=0;
	    while ((ok == 0)) {
		i=Number(j)+k;
		if (i <= positionsurlatrame) {
		    if (!(dicNum2forme[trameForme[i][0]] in dictionnairedesdelims)) {
			out=0;
		    }
		    else {
			if ((dicNum2forme[trameForme[i][0]] == " ") || (trameForme[i][0] == -1)) {
			}
			else  {
			    patronencours="";
			    listeposition=[];
			    nbitemencours=0;
			    ok=1;
			}
			out=1;
		    }
		}
		else {
		    out=1;
		    ok=1;
		}
		if (out == 0) {
		    var tmpnbitemencours=nbitemencours+1;
		    var tmpannotnumber=0;
		    if ((DictionnaireNumDesItems[trameForme[i][AnnotPatron-1]] == listePOS[tmpnbitemencours-1]) || (listePOS[tmpnbitemencours-1]=="ANY") ) {
			var tmppatron;
			if (AnnotTerm==1) {
			    patronencours+=dicNum2forme[trameForme[i][AnnotTerm-1]]+" ";
			}
			if (AnnotTerm==2) {
			    patronencours+=dicNum2lemme[trameForme[i][AnnotTerm-1]]+" ";
			}
			if (AnnotTerm==3) {
			    patronencours+=dicNum2categorie[trameForme[i][AnnotTerm-1]]+" ";
			}
			/*if (AnnotTerm>3) { // a reprendre
			  patronencours+=dicNum2forme[trameForme[i][AnnotTerm-1]]+" ";
			  }*/
			nbitemencours++;
			listeposition.push(i);
			if (nbitemencours == nbitempatron) {			
			    var reg0=new RegExp(" +$", "g"); 
			    patronencours=patronencours.replace(reg0,"");
			    var reg1=new RegExp(" +", "g"); 
			    patronencours=patronencours.replace(reg1," ");
			    if (listepatrons[patronencours] === undefined) {
				listepatrons[patronencours]=1;
			    }
			    else {
				listepatrons[patronencours]= listepatrons[patronencours]+1;
			    }
			    gestionnaireSelectionTMP[listeposition[0]]=1;
			    patronencours="";
			    listeposition=[];
			    nbitemencours=0;
			    ok=1;
			    k=0;
			}	
		    }
		    else {
			patronencours="";
			listeposition=[];
			nbitemencours=0;
			ok=1;
			k=0;
		    }	
		}
		if (ok != 1) {k++;};
	    }
	    patronencours="";
	    listeposition=[];
	    nbitemencours=0;
	    k=0;
	}
    }
    /*-------------------------------------*/
    concordancePosition(AnnotTerm);
}
/*---------------------------------------------------------------------------*/
function displaySelectionsurCarte(){
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    DictionnaireSelectSection = [];
    ListSelectSection = new Object();
    dicoCorrespondancePositionsSectionsInBitext=new Object();

    refreshItrameur();

    var contexteDelim=document.getElementById('contexteID').value;
    if (contexteDelim == ''){
	contexteDelim ="\n";
    }
    /*----------------------------------------------------------------------------*/
    var inputBitext = document.getElementById ("bitextID");
    var isCheckedBitext = inputBitext.checked;
    if (isCheckedBitext) {
	nbSectionGlobalForBitext=dictionnairedesdelims[contexteDelim];
    }			
    var positionFinVolet1=1;
    /*----------------------------------------------------------------------------*/
    DictionnaireBitextSource= new Object(); // or just {} 
    DictionnaireBitextCible= new Object(); // or just {} 
    LISTESCONTEXTES= new Object(); // or just {} 
    LISTESCONTEXTESSOURCE= new Object(); // or just {} 
    LISTESCONTEXTESCIBLE= new Object(); // or just {} 
    nbSectionInCarte=0;
    nbMotBitextCible=0;
    nbMotBitextSource=0;
    /*----------------------------------------------------------------------------*/
    var DictionnaireDesItems = new Object();
    var DictionnaireNumDesItems = new Object();
    if (annotationencours==1) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
    }
    if (annotationencours==2) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireLemme);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2lemme);
    }
    if (annotationencours==3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireCategorie);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2categorie);
    }
    if (annotationencours>3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireAnnotation);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2annotation);
    }
    var annotationencoursIndex=annotationencours-1;
    /*----------------------------------------------------------------------------*/
    var carte="<p><span style=\"font-size:0.7em\">Clic sur section : affichage contexte | Clic-droit sur section : sélection section</span></p><div  id=\"cartesection\"><p align=\"left\">";
    /* on commence par repérer les positions de la partition active... */
    var PARTITION =document.getElementById('IDPartie').value;
    var LISTESDESPARTIES=new Object(); 
    var DicoDesPositionsDesPartiesPourSections=new Object(); 
    if (PARTITION != '') {
	LISTESDESPARTIES=Object.keys(cadre[PARTITION]);
	for (var j=0;j<LISTESDESPARTIES.length;j++) {
	    var listepositions = cadre[PARTITION][LISTESDESPARTIES[j]];
	    for (var k=0;k<(listepositions.length);k=k+2) {
		var deb = listepositions[k];
		var tmpk=k+1;
		var fin = listepositions[tmpk];
		DicoDesPositionsDesPartiesPourSections[deb]=PARTITION+"="+LISTESDESPARTIES[j]+" <"+deb+":"+fin+">";
		DicoDesPositionsDesPartiesPourSections[fin]="ENDPARTIE";
		if (isCheckedBitext) {
		    if (j==0) {positionFinVolet1=fin};
		}
	    }
	}
	var firstIndexTrame=Object.keys(trameForme)[0];
	var j=Number(firstIndexTrame);
	for (var k=1;k<firstIndexTrame;k++) {
	    if (k in DicoDesPositionsDesPartiesPourSections) {
		if (DicoDesPositionsDesPartiesPourSections[k] != "ENDPARTIE") {
		    carte+= "<div class=\"sectionPartie\">"+DicoDesPositionsDesPartiesPourSections[k]+"<p align=\"left\">";
		}
		else {
		    carte+= "</p></div>"; 
		    
		}
	    }
	}
    }
    var posdebsection=1;
    var posfinsection=1;
    
    var isQueryTextInSection=0;
    
    if (!(isCheckedBitext)) {
	var contentxt="";	
	for (var index in trameForme) {
	    if (index in DicoDesPositionsDesPartiesPourSections) {
		if (DicoDesPositionsDesPartiesPourSections[index] != "ENDPARTIE") {
		    carte+= "<div class=\"sectionPartie\">"+DicoDesPositionsDesPartiesPourSections[index]+"<p align=\"left\">";
		}
	    }
	    var item = DictionnaireNumDesItems[trameForme[index][annotationencoursIndex]];
	    var itemForme = dicNum2forme[trameForme[index][0]];
	    if (!(dicNum2forme[trameForme[index][0]] in dictionnairedesdelims))  {
		contentxt+=item;/*+"("+trameForme[index]+")";*/
		if ((gestionnaireSelection[index]==1)  && (isQueryTextInSection ==0)) {
		    isQueryTextInSection++;
		}
	    }
	    else {
		contentxt+=item;
		if (itemForme == contexteDelim) {
		    contentxt = contentxt.replace(/\n/g, ' ');
		    contentxt = contentxt.replace(/\s+/g, ' ');
		    posfinsection=Number(index);
		    if ((contentxt!=' ')){
			LISTESCONTEXTES[nbSectionInCarte]=posdebsection+":"+posfinsection;
			if (isQueryTextInSection > 0 ) {
			    var secimg="S"+nbSectionInCarte;
			    DictionnaireSelectSection.push(LISTESCONTEXTES[nbSectionInCarte]);
			    ListSelectSection[nbSectionInCarte]=1;
			    carte+= "<a href=\"javascript:onclickSection(\'"+nbSectionInCarte+","+posdebsection+","+posfinsection+"\')\"><img id=\""+secimg+"\" class=\"actions_one actions_select\" src=\"./images/cr.png\" onContextMenu=\"selectSection(\'"+nbSectionInCarte+"\');\"/></a>";
			}
			else {
			    var secimg="S"+nbSectionInCarte;
			    carte+= "<a href=\"javascript:onclickSection(\'"+nbSectionInCarte+","+posdebsection+","+posfinsection+"\')\"><img id=\""+secimg+"\" class=\"actions_zero\" src=\"./images/cb.png\" onContextMenu=\"selectSection(\'"+nbSectionInCarte+"\');\"/></a>";			
			}
			nbSectionInCarte = nbSectionInCarte + 1;
			contentxt="";
		    }
		    else {
			contentxt="";
		    }
		    posdebsection=posfinsection+1;
		    posfinsection=posdebsection;
		    isQueryTextInSection=0;
		}
	    }
	    if (index in DicoDesPositionsDesPartiesPourSections) {
		if (DicoDesPositionsDesPartiesPourSections[index] == "ENDPARTIE") {
		    contentxt = contentxt.replace(/\n/g, ' ');
		    contentxt = contentxt.replace(/\s+/g, ' ');
		    posfinsection=Number(index);
		    if ((contentxt!=' ')){
			LISTESCONTEXTES[nbSectionInCarte]=posdebsection+":"+posfinsection;
			if (isQueryTextInSection > 0 ) {
			    var secimg="S"+nbSectionInCarte;
			    DictionnaireSelectSection.push(LISTESCONTEXTES[nbSectionInCarte]);
			    ListSelectSection[nbSectionInCarte]=1;
			    carte+= "<a href=\"javascript:onclickSection(\'"+nbSectionInCarte+","+posdebsection+","+posfinsection+"\')\"><img id=\""+secimg+"\" class=\"actions_one actions_select\" src=\"./images/cr.png\" onContextMenu=\"selectSection(\'"+nbSectionInCarte+"\');\"/></a>";
			}						
			else {
			    var secimg="S"+nbSectionInCarte;
			    carte+= "<a href=\"javascript:onclickSection(\'"+nbSectionInCarte+","+posdebsection+","+posfinsection+"\')\"><img id=\""+secimg+"\" class=\"actions_zero\" src=\"./images/cb.png\" onContextMenu=\"selectSection(\'"+nbSectionInCarte+"\');\"/></a>";			
			}
			nbSectionInCarte = nbSectionInCarte + 1;
			contentxt="";
			carte+= "</p></div>"; 
		    }
		    else {
			contentxt="";
			carte+= "</p></div>"; 
		    }
		    posdebsection=posfinsection+1;
		    posfinsection=posdebsection;
		    isQueryTextInSection=0;
		}
	    }
	}
	carte+="</p></div><p><span style=\"font-size:0.7em\">Clic sur section : affichage contexte | Clic-droit sur section : sélection section</span></p>";
	document.getElementById('placeholder2').style.height = "400px";
	document.getElementById('placeholder2').innerHTML = carte;
	isTheCarteDesSectionsOK=1;
	/*document.getElementById('placeholder').innerHTML = '';*/
    }
    if (isCheckedBitext) {
	FlagSectionCarteSource={};
	FlagSectionCarteCible={};
	var nbSectionSource = nbSectionGlobalForBitext/2;
	var contentxt="";	
	var nbAlignSource=0;
	var nbAlignCible=0;
	var carteSource="<div><p align=\"left\">";
	var carteCible="<div><p align=\"left\">";
	for (var pos=1;pos<=positionFinVolet1;pos++) {
	    if (pos in DicoDesPositionsDesPartiesPourSections) {
		if (DicoDesPositionsDesPartiesPourSections[pos] != "ENDPARTIE") {
		    carteSource+= "<div class=\"sectionPartie\">"+DicoDesPositionsDesPartiesPourSections[pos]+"<p align=\"left\">";
		}
	    }
	    if (pos in trameForme) {
		var item = DictionnaireNumDesItems[trameForme[pos][annotationencoursIndex]];
		var itemForme = dicNum2forme[trameForme[pos][0]];
		if (!(dicNum2forme[trameForme[pos][0]] in dictionnairedesdelims))  {
		    contentxt+=item;/*+"("+trameForme[index]+")";*/
		    nbMotBitextSource=nbMotBitextSource+1;
		    if (DictionnaireBitextSource[item] === undefined) {
			DictionnaireBitextSource[item]=1;
		    }
		    else {
			DictionnaireBitextSource[item]=DictionnaireBitextSource[item]+1
		    }			
		    if ((gestionnaireSelection[pos]==1) && (isQueryTextInSection ==0)) {
			isQueryTextInSection++;
		    }
		}
		else {
		    contentxt+=item;
		    if (itemForme == contexteDelim) {
			contentxt = contentxt.replace(/\n/g, ' ');
			contentxt = contentxt.replace(/\s+/g, ' ');
			posfinsection=pos;
			if ((contentxt!=' ')){
			    LISTESCONTEXTES[nbSectionInCarte]=posdebsection+":"+posfinsection;
			    LISTESCONTEXTESSOURCE[nbSectionInCarte]=posdebsection+":"+posfinsection;
			    dicoCorrespondancePositionsSectionsInBitext[nbSectionInCarte]=posdebsection+":"+posfinsection;
			    nbAlignSource++;
			    if (isQueryTextInSection > 0 ) {
				var secimg="S"+nbSectionInCarte;
				DictionnaireSelectSection.push(LISTESCONTEXTES[nbSectionInCarte]);
				ListSelectSection[nbSectionInCarte]=1;
				carteSource+= "<a href=\"javascript:onclickSection(\'"+nbSectionInCarte+","+posdebsection+","+posfinsection+"\')\"><img id=\""+secimg+"\" class=\"actions_one actions_select\" src=\"./images/cr.png\" onContextMenu=\"selectSection(\'"+nbSectionInCarte+"\');\"/></a>";
				FlagSectionCarteSource[nbAlignSource]=1;
			    }
			    else {
				FlagSectionCarteSource[nbAlignSource]=0;
				var secimg="S"+nbSectionInCarte;
				carteSource+= "<a href=\"javascript:onclickSection(\'"+nbSectionInCarte+","+posdebsection+","+posfinsection+"\')\"><img id=\""+secimg+"\" class=\"actions_zero\" src=\"./images/cb.png\" onContextMenu=\"selectSection(\'"+nbSectionInCarte+"\');\"/></a>";	
			    }
			    nbSectionInCarte = nbSectionInCarte + 1;
			    contentxt="";
			}
			else {
			    contentxt="";
			}
			posdebsection=posfinsection+1;
			posfinsection=posdebsection;
			isQueryTextInSection=0;
		    }
		}
		if (pos in DicoDesPositionsDesPartiesPourSections) {
		    if (DicoDesPositionsDesPartiesPourSections[pos] == "ENDPARTIE") {
			contentxt = contentxt.replace(/\n/g, ' ');
			contentxt = contentxt.replace(/\s+/g, ' ');
			posfinsection=pos;
			if ((contentxt!=' ')){
			    LISTESCONTEXTES[nbSectionInCarte]=posdebsection+":"+posfinsection;
			    LISTESCONTEXTESSOURCE[nbSectionInCarte]=posdebsection+":"+posfinsection;
			    dicoCorrespondancePositionsSectionsInBitext[nbSectionInCarte]=posdebsection+":"+posfinsection;
			    nbAlignSource++;
			    if (isQueryTextInSection > 0 ) {
				var secimg="S"+nbSectionInCarte;
				DictionnaireSelectSection.push(LISTESCONTEXTES[nbSectionInCarte]);
				ListSelectSection[nbSectionInCarte]=1;
				carteSource+= "<a href=\"javascript:onclickSection(\'"+nbSectionInCarte+","+posdebsection+","+posfinsection+"\')\"><img id=\""+secimg+"\" class=\"actions_one actions_select\" src=\"./images/cr.png\" onContextMenu=\"selectSection(\'"+nbSectionInCarte+"\');\"/></a>";
				FlagSectionCarteSource[nbAlignSource]=1;
			    }
			    else {
				FlagSectionCarteSource[nbAlignSource]=0;
				var secimg="S"+nbSectionInCarte;
				carteSource+= "<a href=\"javascript:onclickSection(\'"+nbSectionInCarte+","+posdebsection+","+posfinsection+"\')\"><img id=\""+secimg+"\" class=\"actions_zero\" src=\"./images/cb.png\" onContextMenu=\"selectSection(\'"+nbSectionInCarte+"\');\"/></a>";			
			    }
			    nbSectionInCarte = nbSectionInCarte + 1;
			    contentxt="";
			    carteSource+= "</p></div>"; 
			}
			else {
			    contentxt="";
			    carteSource+= "</p></div>"; 
			}
			posdebsection=posfinsection+1;
			posfinsection=posdebsection;
			isQueryTextInSection=0;
		    }
		}
	    }
	}
	contentxt="";
	isQueryTextInSection=0;		
	for (var pos=positionFinVolet1;pos<positionsurlatrame;pos++) {
	    if (pos in DicoDesPositionsDesPartiesPourSections) {
		if (DicoDesPositionsDesPartiesPourSections[pos] != "ENDPARTIE") {
		    carteCible+= "<div class=\"sectionPartie\">"+DicoDesPositionsDesPartiesPourSections[pos]+"<p align=\"left\">";
		}
	    }
	    var item = DictionnaireNumDesItems[trameForme[pos][annotationencoursIndex]];
	    var itemForme = dicNum2forme[trameForme[pos][0]];
	    if (!(dicNum2forme[trameForme[pos][0]] in dictionnairedesdelims))  {
		contentxt+=item;/*+"("+trameForme[index]+")";*/
		nbMotBitextCible=nbMotBitextCible+1;
		if (DictionnaireBitextCible[item] === undefined) {
		    DictionnaireBitextCible[item]=1;
		}
		else {
		    DictionnaireBitextCible[item]=DictionnaireBitextCible[item]+1
		}
		if ((gestionnaireSelection[pos]==1)  && (isQueryTextInSection ==0)) {
		    isQueryTextInSection++;
		}
	    }
	    else {
		contentxt+=item;
		if (itemForme == contexteDelim) {
		    contentxt = contentxt.replace(/\n/g, ' ');
		    contentxt = contentxt.replace(/\s+/g, ' ');
		    posfinsection=pos;
		    if ((contentxt!=' ')){
			LISTESCONTEXTES[nbSectionInCarte]=posdebsection+":"+posfinsection;
			LISTESCONTEXTESCIBLE[nbSectionInCarte]=posdebsection+":"+posfinsection;
			dicoCorrespondancePositionsSectionsInBitext[nbSectionInCarte]=posdebsection+":"+posfinsection;
			nbAlignCible++;
			if (isQueryTextInSection > 0 ) {
			    var secimg="S"+nbSectionInCarte;
			    DictionnaireSelectSection.push(LISTESCONTEXTES[nbSectionInCarte]);
			    ListSelectSection[nbSectionInCarte]=1;
			    carteCible+= "<a href=\"javascript:onclickSection(\'"+nbSectionInCarte+","+posdebsection+","+posfinsection+"\')\"><img id=\""+secimg+"\" class=\"actions_one actions_select\" src=\"./images/cr.png\" onContextMenu=\"selectSection(\'"+nbSectionInCarte+"\');\"/></a>";
			    FlagSectionCarteCible[nbAlignCible]=1;
			}
			else {
			    FlagSectionCarteCible[nbAlignCible]=0;
			    var secimg="S"+nbSectionInCarte;
			    carteCible+= "<a href=\"javascript:onclickSection(\'"+nbSectionInCarte+","+posdebsection+","+posfinsection+"\')\"><img id=\""+secimg+"\" class=\"actions_zero\" src=\"./images/cb.png\" onContextMenu=\"selectSection(\'"+nbSectionInCarte+"\');\"/></a>";			
			}
			nbSectionInCarte = nbSectionInCarte + 1;
			contentxt="";
		    }
		    else {
			contentxt="";
		    }
		    posdebsection=posfinsection+1;
		    posfinsection=posdebsection;
		    isQueryTextInSection=0;
		}
	    }
	    if (pos in DicoDesPositionsDesPartiesPourSections) {
		if (DicoDesPositionsDesPartiesPourSections[pos] == "ENDPARTIE") {
		    contentxt = contentxt.replace(/\n/g, ' ');
		    contentxt = contentxt.replace(/\s+/g, ' ');
		    posfinsection=pos;
		    if ((contentxt!=' ')){
			LISTESCONTEXTES[nbSectionInCarte]=posdebsection+":"+posfinsection;
			LISTESCONTEXTESCIBLE[nbSectionInCarte]=posdebsection+":"+posfinsection;
			dicoCorrespondancePositionsSectionsInBitext[nbSectionInCarte]=posdebsection+":"+posfinsection;
			nbAlignCible++;
			if (isQueryTextInSection > 0 ) {
			    var secimg="S"+nbSectionInCarte;
			    DictionnaireSelectSection.push(LISTESCONTEXTES[nbSectionInCarte]);
			    ListSelectSection[nbSectionInCarte]=1;
			    carteCible+= "<a href=\"javascript:onclickSection(\'"+nbSectionInCarte+","+posdebsection+","+posfinsection+"\')\"><img id=\""+secimg+"\" class=\"actions_one actions_select\" src=\"./images/cr.png\" onContextMenu=\"selectSection(\'"+nbSectionInCarte+"\');\"/></a>";
			    FlagSectionCarteCible[nbAlignCible]=1;
			}
			else {
			    FlagSectionCarteCible[nbAlignCible]=0;
			    var secimg="S"+nbSectionInCarte;
			    carteCible+= "<a href=\"javascript:onclickSection(\'"+nbSectionInCarte+","+posdebsection+","+posfinsection+"\')\"><img id=\""+secimg+"\" class=\"actions_zero\" src=\"./images/cb.png\" onContextMenu=\"selectSection(\'"+nbSectionInCarte+"\');\"/></a>";			
			}
			nbSectionInCarte = nbSectionInCarte + 1;
			contentxt="";
			carteCible+= "</p></div>"; 
		    }
		    else {
			contentxt="";
			carteCible+= "</p></div>"; 
		    }
		    posdebsection=posfinsection+1;
		    posfinsection=posdebsection;
		    isQueryTextInSection=0;
		}
	    }
	}
	
	if (nbAlignSource != nbAlignCible){
	    document.getElementById('bitextID').checked=false;
	    yesnoCheck();
	    var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Nombre de sections différent dans les 2 volets...</span></small>';
	     $("#placeholder").html(vide);
	    dicoCorrespondancePositionsSectionsInBitext= new Object();
	    DictionnaireSelectSection = [];
	    DictionnaireBitextSource= new Object(); // or just {} 
	    DictionnaireBitextCible= new Object(); // or just {} 
	    LISTESCONTEXTES= new Object(); // or just {} 
	    LISTESCONTEXTESSOURCE= new Object(); // or just {} 
	    LISTESCONTEXTESCIBLE= new Object(); // or just {} 
	    ListSelectSection = new Object();
	    nbSectionInCarte=0;
	    nbMotBitextCible=0;
	    nbMotBitextSource=0;
	    return;
	}
	else {
	    carteCible+= "</p></div>"; 
	    carteSource+= "</p></div>"; 

	    var carteglobal='<div id="placeholderSource">'+carteSource+'</div><div id="placeholderCible">'+carteCible+'</div>';
	    carteglobal+='<p><span style="font-family: Tahoma,sans-serif; font-size: 70%; padding: 1px; border-right: 1px solid rgb(204, 153, 0); border-bottom: 1px solid rgb(204, 153, 0);border-left: 1px solid rgb(204, 153, 0);border-top: 1px solid rgb(204, 153, 0);"><b>Légende Carte</b> : <img src="./images/cr.png" style="background-color:yellow;border:1px solid black"/> Présence dans Source et Cible | <img src="./images/cr.png" style="background-color:#33cc33;border:1px solid black"/>&nbsp;<img src="./images/cb.png" style="background-color:#33cc33;border:1px solid black"/> Présence dans un volet, absence dans l\'autre | <img src="./images/cb.png" style="border:1px solid black"/> Absence</span><br/>';
	    carteglobal+="<span style=\"font-size:0.7em\">Clic sur section : affichage contexte | Clic-droit sur section : sélection section</span></p>";
	    


	    document.getElementById('placeholder2').style.height = "300px";
	     $("#placeholder2").html(carteglobal); 
	    isTheCarteDesSectionsOK=1;
	    /*document.getElementById('placeholder').innerHTML = '';*/
	    for (var nbsect=1;nbsect<=nbAlignSource;nbsect++) {
		if ((FlagSectionCarteCible[nbsect]==1) && (FlagSectionCarteSource[nbsect]==1)) {
		    var nbsectmp=nbsect-1;
		    var secnb="S"+nbsectmp;
		    /*alert(secnb);*/
		    document.getElementById(secnb).classList.remove('actions_zero');
		    document.getElementById(secnb).classList.remove('actions_one');
		    document.getElementById(secnb).classList.add('actions_Inter');
		}
		if ((FlagSectionCarteCible[nbsect]==0) && (FlagSectionCarteSource[nbsect]==1)) {
		    var nbsectmp=nbsect-1;
		    var secnb="S"+nbsectmp;
		    document.getElementById(secnb).classList.remove('actions_zero');
		    document.getElementById(secnb).classList.remove('actions_one');
		    document.getElementById(secnb).classList.add('actions_pasinter');									
		}
		if ((FlagSectionCarteCible[nbsect]==1) && (FlagSectionCarteSource[nbsect]==0)) {
		    var nbsectmp=nbsect-1;
		    var secnb="S"+nbsectmp;
		    document.getElementById(secnb).classList.remove('actions_zero');
		    document.getElementById(secnb).classList.remove('actions_one');
		    document.getElementById(secnb).classList.add('actions_pasinter2');										
		}
		if ((FlagSectionCarteCible[nbsect]==0) && (FlagSectionCarteSource[nbsect]==0)) {
		    var nbsectmp=nbsect-1;
		    var secnb="S"+nbsectmp;
		    document.getElementById(secnb).classList.remove('actions_one');
		    document.getElementById(secnb).classList.add('actions_zero');										
		}
		
	    }
	    for (var nbsect=nbAlignSource+1;nbsect<=(nbAlignSource+nbAlignCible);nbsect++) {
		var flag=nbsect-nbAlignSource;
		if ((FlagSectionCarteCible[flag]==1) && (FlagSectionCarteSource[flag]==1)) {
		    var nbsectmp=nbsect-1;
		    var secnb="S"+nbsectmp;
		    document.getElementById(secnb).classList.remove('actions_zero');
		    document.getElementById(secnb).classList.remove('actions_one');
		    document.getElementById(secnb).classList.add('actions_Inter');
		}
		if ((FlagSectionCarteCible[flag]==0) && (FlagSectionCarteSource[flag]==1)) {
		    var nbsectmp=nbsect-1;
		    var secnb="S"+nbsectmp;
		    document.getElementById(secnb).classList.remove('actions_zero');
		    document.getElementById(secnb).classList.remove('actions_one');
		    document.getElementById(secnb).classList.add('actions_pasinter2');									
		}
		if ((FlagSectionCarteCible[flag]==1) && (FlagSectionCarteSource[flag]==0)) {
		    var nbsectmp=nbsect-1;
		    var secnb="S"+nbsectmp;
		    document.getElementById(secnb).classList.remove('actions_zero');
		    document.getElementById(secnb).classList.remove('actions_one');
		    document.getElementById(secnb).classList.add('actions_pasinter');										
		}
		if ((FlagSectionCarteCible[flag]==0) && (FlagSectionCarteSource[flag]==0)) {
		    var nbsectmp=nbsect-1;
		    var secnb="S"+nbsectmp;
		    document.getElementById(secnb).classList.remove('actions_one');
		    document.getElementById(secnb).classList.add('actions_zero');										
		}
		
	    }
	}
	
    }
}


/*---------------------------------------------------------------------------*/
function selectionpatron() {
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    if ((nombredannotation == 1) || (nombredannotation < 3)) {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Impossible de lancer ce calcul sur cette base : il faut au moins 3 annotations dans la base...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    var AnnotPatron=document.getElementById('annotpatronID').value;
    var Patron=document.getElementById('patronID').value;
    
    var reg0=new RegExp(" +$", "g"); 
    Patron=Patron.replace(reg0,"");
    var reg2=new RegExp("^ +", "g"); 
    Patron=Patron.replace(reg2,"");
    var reg1=new RegExp(" +", "g"); 
    Patron=Patron.replace(reg1," ");
    
    var listePOS=Patron.split(" ");
    
    var nbitempatron=0;
    var AnnotTerm=document.getElementById('annottermeID').value;
    if (AnnotPatron > 3) {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Impossible pour le moment de lancer ce calcul sur une annotation > 3...</span></small>';
	$("#placeholder").html(vide);	
	return;		
    }
    if (AnnotPatron > nombredannotation) {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Impossible  de lancer ce calcul sur une annotation supérieure au nom d\'annotation...</span></small>';
	$("#placeholder").html(vide);	
	return;		
    }
    if (AnnotTerm > 3) {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Impossible pour le moment de lancer ce calcul sur une annotation > 3...</span></small>';
	$("#placeholder").html(vide);	
	return;		
    }
    if (AnnotTerm > nombredannotation) {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Impossible  de lancer ce calcul sur une annotation supérieure au nom d\'annotation...</span></small>';
	$("#placeholder").html(vide);	
	return;		
    }

    refreshItrameur();

    //---- Verif des elements du patron -----//
    for (var k = 0; k < listePOS.length; k++) {
	nbitempatron++;
	if (AnnotPatron == 1) {
	    if ((!(listePOS[k] in DictionnaireSource)) & (listePOS[k]!="ANY"))  {
		var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Terme '+ listePOS[k] + ' inconnu dans le dictionnaire...</span></small>';
		$("#placeholder").html(vide);		
		return;
	    }
	}
	if (AnnotPatron == 2) {
	    if ((!(listePOS[k] in DictionnaireLemme)) & (listePOS[k]!="ANY")) {
		var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Terme '+ listePOS[k] + ' inconnu dans le dictionnaire...</span></small>';
		$("#placeholder").html(vide);		
		return;
	    }
	}
	if (AnnotPatron == 3) {
	    if ((!(listePOS[k] in DictionnaireCategorie)) & (listePOS[k]!="ANY"))  {
		var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Terme '+ listePOS[k] + ' inconnu dans le dictionnaire...</span></small>';
		$("#placeholder").html(vide);		
		return;
	    }
	}
	/*if (AnnotPatron >= 4) {
	  var tvaleur2=AnnotPatron;
	  var tvaleur1="tvaleur2"+"//"+"listePOS[k]";
	  if (!(tvaleur1 in DictionnaireAnnotation) ) {
	  var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Terme '+ listePOS[k] + ' inconnu dans le dictionnaire...</span></small>';
	  document.getElementById('placeholder').innerHTML = '';
	  document.getElementById('placeholder').innerHTML += vide;
	  return;
	  }
	  }*/
    }
    //---------------------------------------//
    var DictionnaireDesItems = new Object();
    var DictionnaireNumDesItems = new Object();
    if (AnnotPatron==1) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
    }
    if (AnnotPatron==2) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireLemme);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2lemme);
    }
    if (AnnotPatron==3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireCategorie);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2categorie);
    }
    /*if (AnnotPatron>3) {
      DictionnaireDesItems = jQuery.extend({}, DictionnaireAnnotation);
      DictionnaireNumDesItems=jQuery.extend({}, dicNum2annotation);
      }*/
    var listepatrons=new Object();
    var listepatrons2graph=new Object();
    var nbpatron=0;
    var patronencours="";
    var nbitemencours=0;
    var listeposition=[];
    var out;
    for (var j in trameForme) {
	if (!(dicNum2forme[trameForme[j][0]] in dictionnairedesdelims)) {
	    var ok=0;
	    var i;
	    var k=0;
	    while ((ok == 0)) {
		i=Number(j)+k;
		if (i <= positionsurlatrame) {
		    if (!(dicNum2forme[trameForme[i][0]] in dictionnairedesdelims)) {
			out=0;
		    }
		    else {
			if ((dicNum2forme[trameForme[i][0]] == " ") || (trameForme[i][0] == -1)) {
			}
			else  {
			    patronencours="";
			    listeposition=[];
			    nbitemencours=0;
			    ok=1;
			}
			out=1;
		    }
		}
		else {
		    out=1;
		    ok=1;
		}
		if (out == 0) {
		    var tmpnbitemencours=nbitemencours+1;
		    var tmpannotnumber=0;
		    if ((DictionnaireNumDesItems[trameForme[i][AnnotPatron-1]] == listePOS[tmpnbitemencours-1]) || (listePOS[tmpnbitemencours-1]=="ANY") ) {
			var tmppatron;
			if (AnnotTerm==1) {
			    patronencours+=dicNum2forme[trameForme[i][AnnotTerm-1]]+" ";
			}
			if (AnnotTerm==2) {
			    patronencours+=dicNum2lemme[trameForme[i][AnnotTerm-1]]+" ";
			}
			if (AnnotTerm==3) {
			    patronencours+=dicNum2categorie[trameForme[i][AnnotTerm-1]]+" ";
			}
			/*if (AnnotTerm>3) { // a reprendre
			  patronencours+=dicNum2forme[trameForme[i][AnnotTerm-1]]+" ";
			  }*/
			nbitemencours++;
			listeposition.push(i);
			if (nbitemencours == nbitempatron) {			
			    var reg0=new RegExp(" +$", "g"); 
			    patronencours=patronencours.replace(reg0,"");
			    var reg1=new RegExp(" +", "g"); 
			    patronencours=patronencours.replace(reg1," ");
			    if (listepatrons[patronencours] === undefined) {
				listepatrons[patronencours]=1;
			    }
			    else {
				listepatrons[patronencours]= listepatrons[patronencours]+1;
			    }
			    
			    for (var z = 0; z < listeposition.length; z++) {
				gestionnaireSelection[listeposition[z]]=1;
			    }
			    
			    patronencours="";
			    listeposition=[];
			    nbitemencours=0;
			    ok=1;
			    k=0;
			}	
		    }
		    else {
			patronencours="";
			listeposition=[];
			nbitemencours=0;
			ok=1;
			k=0;
		    }	
		}
		if (ok != 1) {k++;};
	    }
	    patronencours="";
	    listeposition=[];
	    nbitemencours=0;
	    k=0;
	}
    }
    //---------------------------------------------------
    var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:#FDBBD2">Sélection termin&eacute;e...</span></small>';
    $("#placeholder").html(vide);
}
/*---------------------------------------------------------------------------*/
function graphepatron() {
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    if ((nombredannotation == 1) || (nombredannotation < 3)) {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Impossible de lancer ce calcul sur cette base : il faut au moins 3 annotations dans la base...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    //-----------------------------------------------------------------
    var AnnotPatron=document.getElementById('annotpatronID').value;
    var Patron=document.getElementById('patronID').value;
    
    var reg0=new RegExp(" +$", "g"); 
    Patron=Patron.replace(reg0,"");
    var reg2=new RegExp("^ +", "g"); 
    Patron=Patron.replace(reg2,"");
    var reg1=new RegExp(" +", "g"); 
    Patron=Patron.replace(reg1," ");
    
    var listePOS=Patron.split(" ");
    
    var nbitempatron=0;
    var AnnotTerm=document.getElementById('annottermeID').value;
    if (AnnotPatron > 3) {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Impossible pour le moment de lancer ce calcul sur une annotation > 3...</span></small>';
	$("#placeholder").html(vide);	
	return;		
    }
    if (AnnotPatron > nombredannotation) {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Impossible  de lancer ce calcul sur une annotation supérieure au nom d\'annotation...</span></small>';
	$("#placeholder").html(vide);	
	return;		
    }
    if (AnnotTerm > 3) {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Impossible pour le moment de lancer ce calcul sur une annotation > 3...</span></small>';
	$("#placeholder").html(vide);	
	return;		
    }
    if (AnnotTerm > nombredannotation) {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Impossible  de lancer ce calcul sur une annotation supérieure au nom d\'annotation...</span></small>';
	$("#placeholder").html(vide);	
	return;		
    }
    //-----------------------------------------------------------------
    refreshItrameur();
    //---- Verif des elements du patron -----//
    for (var k = 0; k < listePOS.length; k++) {
	nbitempatron++;
	if (AnnotPatron == 1) {
	    if ((!(listePOS[k] in DictionnaireSource) ) & (listePOS[k]!="ANY")) {
		var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Terme '+ listePOS[k] + ' inconnu dans le dictionnaire...</span></small>';
		$("#placeholder").html(vide);		
		return;
	    }
	}
	if (AnnotPatron == 2) {
	    if ((!(listePOS[k] in DictionnaireLemme) ) & (listePOS[k]!="ANY")) {
		var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Terme '+ listePOS[k] + ' inconnu dans le dictionnaire...</span></small>';
		$("#placeholder").html(vide);		
		return;
	    }
	}
	if (AnnotPatron == 3) {
	    if ((!(listePOS[k] in DictionnaireCategorie) )& (listePOS[k]!="ANY")) {
		var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Terme '+ listePOS[k] + ' inconnu dans le dictionnaire...</span></small>';
		$("#placeholder").html(vide);		
		return;
	    }
	}
	/*if (AnnotPatron >= 4) {
	  var tvaleur2=AnnotPatron;
	  var tvaleur1="tvaleur2"+"//"+"listePOS[k]";
	  if (!(tvaleur1 in DictionnaireAnnotation) ) {
	  var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Terme '+ listePOS[k] + ' inconnu dans le dictionnaire...</span></small>';
	  document.getElementById('placeholder').innerHTML = '';
	  document.getElementById('placeholder').innerHTML += vide;
	  return;
	  }
	  }*/
    }
    //---------------------------------------//
    var DictionnaireDesItems = new Object();
    var DictionnaireNumDesItems = new Object();
    if (AnnotPatron==1) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
    }
    if (AnnotPatron==2) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireLemme);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2lemme);
    }
    if (AnnotPatron==3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireCategorie);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2categorie);
    }
    /*if (AnnotPatron>3) {
      DictionnaireDesItems = jQuery.extend({}, DictionnaireAnnotation);
      DictionnaireNumDesItems=jQuery.extend({}, dicNum2annotation);
      }*/
    var listepatrons=new Object();
    var listepatrons2graph=new Object();
    var nbpatron=0;
    var vecteurterme=[];
    var patronencours="";
    var nbitemencours=0;
    var out;
    for (var j in trameForme) {
	if (!(dicNum2forme[trameForme[j][0]] in dictionnairedesdelims)) {
	    var ok=0;
	    var i;
	    var k=0;
	    while ((ok == 0)) {
		i=Number(j)+k;
		if (i <= positionsurlatrame) {
		    if (!(dicNum2forme[trameForme[i][0]] in dictionnairedesdelims)) {
			out=0;
		    }
		    else {
			if ((dicNum2forme[trameForme[i][0]] == " ") || (trameForme[i][0] == -1)) {
			}
			else  {
			    patronencours="";
			    nbitemencours=0;
			    ok=1;
			}
			out=1;
		    }
		}
		else {
		    out=1;
		    ok=1;
		}
		if (out == 0) {
		    var tmpnbitemencours=nbitemencours+1;
		    var tmpannotnumber=0;
		    if ((DictionnaireNumDesItems[trameForme[i][AnnotPatron-1]] == listePOS[tmpnbitemencours-1]) || (listePOS[tmpnbitemencours-1]=="ANY")) {
			var tmppatron;
			if (AnnotTerm==1) {
				var tmpTermeInPatron=dicNum2forme[trameForme[i][AnnotTerm-1]];
				var reg1=new RegExp(" +", "g"); 
				tmpTermeInPatron=tmpTermeInPatron.replace(reg1,"\377");
			    patronencours+=tmpTermeInPatron+" ";
			    vecteurterme.push(tmpTermeInPatron);
			}
			if (AnnotTerm==2) {
				var tmpTermeInPatron=dicNum2lemme[trameForme[i][AnnotTerm-1]];
				var reg1=new RegExp(" +", "g"); 
				tmpTermeInPatron=tmpTermeInPatron.replace(reg1,"\377");
			    patronencours+=tmpTermeInPatron+" ";
			    vecteurterme.push(tmpTermeInPatron);
			}
			if (AnnotTerm==3) {
				var tmpTermeInPatron=dicNum2categorie[trameForme[i][AnnotTerm-1]];
				var reg1=new RegExp(" +", "g"); 
				tmpTermeInPatron=tmpTermeInPatron.replace(reg1,"\377");
			    patronencours+=tmpTermeInPatron+" ";
			    vecteurterme.push(tmpTermeInPatron);
			}
			if (vecteurterme.length > 1) {
			    tmppatron=vecteurterme[0]+" "+vecteurterme[1];
			    if (listepatrons2graph[tmppatron] === undefined) {
				listepatrons2graph[tmppatron]=1;
			    }
			    else {
				listepatrons2graph[tmppatron]= listepatrons2graph[tmppatron]+1;
			    }
			    vecteurterme.shift();
			}
			/*if (AnnotTerm>3) { // a reprendre
			  patronencours+=dicNum2forme[trameForme[i][AnnotTerm-1]]+" ";
			  }*/
			nbitemencours++;
			if (nbitemencours == nbitempatron) {			
			    var reg0=new RegExp(" +$", "g"); 
			    patronencours=patronencours.replace(reg0,"");
			    var reg1=new RegExp(" +", "g"); 
			    patronencours=patronencours.replace(reg1," ");
			    if (listepatrons[patronencours] === undefined) {
				listepatrons[patronencours]=1;
			    }
			    else {
				listepatrons[patronencours]= listepatrons[patronencours]+1;
			    }
			    patronencours="";
			    nbitemencours=0;
			    ok=1;
			    k=0;
			    vecteurterme=[];
			}	
		    }
		    else {
			patronencours="";
			nbitemencours=0;
			ok=1;
			k=0;
			vecteurterme=[];
		    }	
		}
		if (ok != 1) {k++;};
	    }
	    patronencours="";
	    nbitemencours=0;
	    k=0;
	    vecteurterme=[];
	}
    }
    /*--------------------------*/
    /*Le graphe*/
    var queryText=document.getElementById('poleID').value;
    var filtragepatron='';
    if ((queryText != '') && (queryText != 'entrez la forme pôle')) {
	filtragepatron=' (Filtrage<font color="red">&#8594;</font>'+queryText+')';
    }
    document.getElementById('legendGraphe').innerHTML = "";
    var legend ='<small><b>Graphe PATRON : '+Patron+'</b> '+filtragepatron+'</small><br/><span style="background:yellow"><img onclick="clear_canvas();" src="./images/trash.png" title="suppression graphique" alt="suppression graphique"/></span>';
    //<button onclick="clear_canvas();">clear</button>';
    document.getElementById('legendGraphe').innerHTML = legend;
    GrapheArborL=document.getElementById('grLID').value;
    GrapheArborH=document.getElementById('grHID').value;	
    reinit_canvas();
    var dicoDesNoeuds=[];
    sysArbor =  new arbor.ParticleSystem(20, 600, 0.8, false, 50, 0.015, 0.6);
    //var sys = new arbor.ParticleSystem(30, 800,1,true);
    /*sys.parameters({ stiffness: 800,
		     repulsion: 10000,
		     gravity: true,
		     dt:0.015,
		     friction: 0.8});*/
    var colornode="#fee7cd";
    var queryText=document.getElementById('poleID').value;
    for (var pat in listepatrons) {
	if ((queryText != '') && (queryText != 'entrez la forme pôle')) {
	    var regex = new RegExp(queryText, "gi");
	    if (regex.test(pat)) {
		var patvalues = pat.split(' ');
		for (var i=0; i<patvalues.length;i++)   {
		    var nodename=patvalues[i];
		    if (dicoDesNoeuds[nodename] === undefined) {
			dicoDesNoeuds[nodename]=1;
		    }
		    else {
			dicoDesNoeuds[nodename] = dicoDesNoeuds[nodename]+1;
		    }
		}
	    }
	}
	else {
	    var patvalues = pat.split(' ');
	    for (var i=0; i<patvalues.length;i++)   {
		var nodename=patvalues[i];
		if (dicoDesNoeuds[nodename] === undefined) {
		    dicoDesNoeuds[nodename]=1;
		}
		else {
		    dicoDesNoeuds[nodename] = dicoDesNoeuds[nodename]+1;
		}
	    }
	}
    }
    for (var nodename in dicoDesNoeuds) {
        if (sysArbor.getNode(nodename) == undefined) {
			var reg1=new RegExp("\377", "g"); 
			nodename=nodename.replace(reg1," ");
            var node2list = sysArbor.addNode(nodename,{'color':colornode,'shape':'rectangle','label':nodename});
			LISTEDESNOEUDSINCANVAS.push(node2list);
        }
    }    
    for (var lapaire in listepatrons2graph) {
	//alert(lapaire);
	var paire = lapaire.split(' ');
	var label = listepatrons2graph[lapaire];
	var reg1=new RegExp("\377", "g"); 
	paire[0]=paire[0].replace(reg1," ");
	paire[1]=paire[1].replace(reg1," ");
	if ((sysArbor.getNode(paire[0]) != undefined) && (sysArbor.getNode(paire[1]) != undefined)) {
	    var nodeS=sysArbor.getNode(paire[0]);
	    var nodeC=sysArbor.getNode(paire[1]);
	    sysArbor.addEdge(nodeS, nodeC,{'weight':5,'color':'#99CC99','directed':1,'length':.75, 'pointSize':10,data:{name:label}});
	    //alert(paire[0]+" "+paire[1]);
	}
    }
    sysArbor.renderer = Renderer("#grapheHolder"); 

    /*--------------------------*/
}

/*---------------------------------------------------------------------------*/
function extractpatron() {
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    if ((nombredannotation == 1) || (nombredannotation < 3)) {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Impossible de lancer ce calcul sur cette base : il faut au moins 3 annotations dans la base...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    //-----------------------------------------------------------------
    var AnnotPatron=document.getElementById('annotpatronID').value;
    var Patron=document.getElementById('patronID').value;
    
    var reg0=new RegExp(" +$", "g"); 
    Patron=Patron.replace(reg0,"");
    var reg2=new RegExp("^ +", "g"); 
    Patron=Patron.replace(reg2,"");
    var reg1=new RegExp(" +", "g"); 
    Patron=Patron.replace(reg1," ");
    
    var listePOS=Patron.split(" ");
    
    var nbitempatron=0;
    var AnnotTerm=document.getElementById('annottermeID').value;
    if (AnnotPatron > 3) {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Impossible pour le moment de lancer ce calcul sur une annotation > 3...</span></small>';
	$("#placeholder").html(vide);	
	return;		
    }
    if (AnnotPatron > nombredannotation) {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Impossible  de lancer ce calcul sur une annotation supérieure au nom d\'annotation...</span></small>';
	$("#placeholder").html(vide);	
	return;		
    }
    if (AnnotTerm > 3) {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Impossible pour le moment de lancer ce calcul sur une annotation > 3...</span></small>';
	$("#placeholder").html(vide);	
	return;		
    }
    if (AnnotTerm > nombredannotation) {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Impossible  de lancer ce calcul sur une annotation supérieure au nom d\'annotation...</span></small>';
	$("#placeholder").html(vide);	
	return;		
    }
    //-----------------------------------------------------------------
    refreshItrameur();
    //---- Verif des elements du patron -----//
    for (var k = 0; k < listePOS.length; k++) {
	nbitempatron++;
	if (AnnotPatron == 1) {
	    if ((!(listePOS[k] in DictionnaireSource) ) & (listePOS[k]!="ANY")) {
		var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Terme '+ listePOS[k] + ' inconnu dans le dictionnaire...</span></small>';
		$("#placeholder").html(vide);		
		return;
	    }
	}
	if (AnnotPatron == 2) {
	    if ((!(listePOS[k] in DictionnaireLemme) ) & (listePOS[k]!="ANY")) {
		var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Terme '+ listePOS[k] + ' inconnu dans le dictionnaire...</span></small>';
		$("#placeholder").html(vide);		
		return;
	    }
	}
	if (AnnotPatron == 3) {
	    if ((!(listePOS[k] in DictionnaireCategorie) )& (listePOS[k]!="ANY")) {
		var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Terme '+ listePOS[k] + ' inconnu dans le dictionnaire...</span></small>';
		$("#placeholder").html(vide);		
		return;
	    }
	}
	/*if (AnnotPatron >= 4) {
	  var tvaleur2=AnnotPatron;
	  var tvaleur1="tvaleur2"+"//"+"listePOS[k]";
	  if (!(tvaleur1 in DictionnaireAnnotation) ) {
	  var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Terme '+ listePOS[k] + ' inconnu dans le dictionnaire...</span></small>';
	  document.getElementById('placeholder').innerHTML = '';
	  document.getElementById('placeholder').innerHTML += vide;
	  return;
	  }
	  }*/
    }
    //---------------------------------------//
    var DictionnaireDesItems = new Object();
    var DictionnaireNumDesItems = new Object();
    if (AnnotPatron==1) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
    }
    if (AnnotPatron==2) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireLemme);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2lemme);
    }
    if (AnnotPatron==3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireCategorie);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2categorie);
    }
    /*if (AnnotPatron>3) {
      DictionnaireDesItems = jQuery.extend({}, DictionnaireAnnotation);
      DictionnaireNumDesItems=jQuery.extend({}, dicNum2annotation);
      }*/
    var listepatrons=new Object();
    var listepatrons2graph=new Object();
    var nbpatron=0;
    var patronencours="";
    var nbitemencours=0;
    var out;
    for (var j in trameForme) {
	if (!(dicNum2forme[trameForme[j][0]] in dictionnairedesdelims)) {
	    var ok=0;
	    var i;
	    var k=0;
	    while ((ok == 0)) {
		i=Number(j)+k;
		if (i <= positionsurlatrame) {
		    if (!(dicNum2forme[trameForme[i][0]] in dictionnairedesdelims)) {
			out=0;
		    }
		    else {
			if ((dicNum2forme[trameForme[i][0]] == " ") || (trameForme[i][0] == -1)) {
			}
			else  {
			    patronencours="";
			    nbitemencours=0;
			    ok=1;
			}
			out=1;
		    }
		}
		else {
		    out=1;
		    ok=1;
		}
		if (out == 0) {
		    var tmpnbitemencours=nbitemencours+1;
		    var tmpannotnumber=0;
		    if ((DictionnaireNumDesItems[trameForme[i][AnnotPatron-1]] == listePOS[tmpnbitemencours-1]) || (listePOS[tmpnbitemencours-1]=="ANY")) {
			var tmppatron;
			if (AnnotTerm==1) {
			    patronencours+=dicNum2forme[trameForme[i][AnnotTerm-1]]+" ";
			}
			if (AnnotTerm==2) {
			    patronencours+=dicNum2lemme[trameForme[i][AnnotTerm-1]]+" ";
			}
			if (AnnotTerm==3) {
			    patronencours+=dicNum2categorie[trameForme[i][AnnotTerm-1]]+" ";
			}
			/*if (AnnotTerm>3) { // a reprendre
			  patronencours+=dicNum2forme[trameForme[i][AnnotTerm-1]]+" ";
			  }*/
			nbitemencours++;
			if (nbitemencours == nbitempatron) {			
			    var reg0=new RegExp(" +$", "g"); 
			    patronencours=patronencours.replace(reg0,"");
			    var reg1=new RegExp(" +", "g"); 
			    patronencours=patronencours.replace(reg1," ");
			    if (listepatrons[patronencours] === undefined) {
				listepatrons[patronencours]=1;
			    }
			    else {
				listepatrons[patronencours]= listepatrons[patronencours]+1;
			    }
			    patronencours="";
			    nbitemencours=0;
			    ok=1;
			    k=0;
			}	
		    }
		    else {
			patronencours="";
			nbitemencours=0;
			ok=1;
			k=0;
		    }	
		}
		if (ok != 1) {k++;};
	    }
	    patronencours="";
	    nbitemencours=0;
	    k=0;
	}
    }
    var keysSR = Object.keys(listepatrons);/*[];
    for (var key in listepatrons) {
	keysSR.push(key);
    }
    keysSR.sort(function(k0, k1) {
	var a = listepatrons[k0];
	var b = listepatrons[k1];
	return a > b ? -1 : (a < b ? 1 : 0);
    });*/
    //---------------------------------------------------
    /* resultats */
    var resultFinal=new Array();
    for (k = 0; k < keysSR.length; k++) {
	if (!($.isArray(resultFinal[k]))) {
	    resultFinal[k]=new Array();
	}
	resultFinal[k]=[];
	resultFinal[k].push(keysSR[k],listepatrons[keysSR[k]]);      
    }
    /*--------------------------*/
    document.getElementById('placeholder').innerHTML = '<h4>Termes du Patron : '+Patron+'</h4><table id="Patrons" class="display" width="60%"></table>';
    $(document).ready(function() {
	$('#Patrons').DataTable ( {
	    order: [[ 1, "desc" ]],
	    data:resultFinal,
	    searchHighlight: true,
	    "destroy": true,
	    lengthMenu: [[10, 25, 50,100, -1], [10, 25, 50,100, "All"]],
	    dom: 'Bfrtip',
	    buttons: [
		'copy', 'csv', 'excel', 'pdf', 'print'
	    ],
	    columns: [
		{title: "Terme"},
		{title: "Fq"}
	    ]
	})
    });
}
/*---------------------------------------------------------------------------*/
function verifSRatThisPos(position,SR) {
    var result="NO";	
    if (dictionnaireventilationdesSR[position] !== undefined) {
	var listeMotsduSR=SR.split(" ");
	var longueurSR=listeMotsduSR.length;
	var lgsr=dictionnaireventilationdesSR[position];
	if (longueurSR <= lgsr) {
	    var DictionnaireNumDesItems = new Object();
	    if (annotationencours==1) {
		DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
	    }
	    if (annotationencours==2) {
		DictionnaireNumDesItems=jQuery.extend({}, dicNum2lemme);
	    }
	    if (annotationencours==3) {
		DictionnaireNumDesItems=jQuery.extend({}, dicNum2categorie);
	    }
	    if (annotationencours>3) {
		DictionnaireNumDesItems=jQuery.extend({}, dicNum2annotation);
	    }
	    var annotationencoursIndex=annotationencours-1;
	    var tmpsr=DictionnaireNumDesItems[trameForme[position][annotationencoursIndex]];
	    var lgtmpsr=1;
	    var k=1;
	    var tmpindex=Number(position);
	    var matchW = "OK";
	    var m=1;
	    while ((lgtmpsr < longueurSR) && (matchW == "OK")) {
		if ((dicNum2forme[trameForme[tmpindex+k][0]] in dictionnairedesdelims ) || (trameForme[tmpindex+k][0] == -1 )) {
		    tmpsr=tmpsr + " ";
		} 
		else {
		    if (DictionnaireNumDesItems[trameForme[tmpindex+k][annotationencoursIndex]] == listeMotsduSR[m]) {
			tmpsr=tmpsr + DictionnaireNumDesItems[trameForme[tmpindex+k][annotationencoursIndex]];
			lgtmpsr++;
			m++;
		    }
		    else {
			matchW = "BAD";
		    }
		}
		k++;	
	    }
	    if (matchW == "OK") { // pas necessaire ??
	    	var reg0=new RegExp(" +$", "g"); 
		tmpsr=tmpsr.replace(reg0,"");
		var reg1=new RegExp(" +", "g"); 
		tmpsr=tmpsr.replace(reg1," ");	
		if (SR == tmpsr) {
		    result="OK";
		}
	    }
	}
    }
    return result;
}
/*---------------------------------------------------------------------------*/
function segments() {
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);       
	return;
    }
    //-----------------------------------------------------------------
    refreshItrameur();
    //-----------------------------------------------------------------
    if (etatLancementSR==1) {
	loadSR();
	return;
    }
    //-----------------------------------------------------------------
    //loadProgressBar();
    listeSR = new Object();
    listeSROK = new Object();
    dictionnaireventilationdesSR = new Object();
    var segmentencours="";
    var Segmentencours=[];
    var longueursegmentSR=document.getElementById('srlgID').value;
    var freqsegmentSR=document.getElementById('srfqID').value;
    var DictionnaireDesItems = new Object();
    var DictionnaireNumDesItems = new Object();
    if (annotationencours==1) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
    }
    if (annotationencours==2) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireLemme);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2lemme);
    }
    if (annotationencours==3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireCategorie);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2categorie);
    }
    if (annotationencours>3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireAnnotation);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2annotation);
    }
    var annotationencoursIndex=annotationencours-1;
    for (var index in trameForme) {
	var tmpitem="";
	if (annotationencours<=3) {
	    tmpitem=DictionnaireNumDesItems[trameForme[index][annotationencoursIndex]];
	}
	else {
	    tmpitem=annotationencours+"//"+DictionnaireNumDesItems[trameForme[index][annotationencoursIndex]];
	}
	if ((DictionnaireDesItems[tmpitem] >= freqsegmentSR) && (!(dicNum2forme[trameForme[index][0]] in dictionnairedesdelims))) {
	    /*alert("Forme fqok et non delim : <"+dicNum2forme[trameForme[index]]+":"+DictionnaireSource[dicNum2forme[trameForme[index]]]+">");*/
	    Segmentencours.push(DictionnaireNumDesItems[trameForme[index][annotationencoursIndex]]);
	    segmentencours+=DictionnaireNumDesItems[trameForme[index][annotationencoursIndex]];
	    var lg = longueursegmentSR - Segmentencours.length ;
	    /*alert("SRenc : <"+index+":"+segmentencours+"> LG :<"+lg+">");*/
	    var curseur = 1;
	    var bk = 0;
	    var j=0;
	    while ((lg > 0) && (bk == 0)) {
		j=Number(index)+curseur;
		if ((j <= positionsurlatrame) && (j in trameForme)) {
		//if (j <= positionsurlatrame) { // correction juillet 2018
		    var tmpwww=dicNum2forme[trameForme[j][0]];
		    if ((tmpwww != " ") && (trameForme[j][0] != -1)) {
			/*alert("SRenc : <"+index+":"+segmentencours+"> tmpwww :<"+j+":"+tmpwww+":"+DictionnaireSource[tmpwww]+">");*/
			if ((!(tmpwww in dictionnairedesdelims)) && (trameForme[j][0] != -1)) {
			    if (DictionnaireNumDesItems[trameForme[j][annotationencoursIndex]] >= freqsegmentSR) {
				segmentencours += DictionnaireNumDesItems[trameForme[j][annotationencoursIndex]];
				lg--;
				Segmentencours.push(DictionnaireNumDesItems[trameForme[j][annotationencoursIndex]]);
			    }
			    else {
				bk=j;
			    }
			}
			else {
			    if ((tmpwww == " ") || (tmpwww == "\n") || (trameForme[j][0] == -1 )) {
				segmentencours += " ";
			    }
			    else  {
				bk=j;
			    }
			}
		    }
		    else  {
			/*alert("SRenc : <"+index+":"+segmentencours+"> tmpwww :<"+j+":"+tmpwww+">");*/
			segmentencours+=" ";
		    }
		    curseur++;
		}
		else {
		    bk=j;
		}
	    }
	    /*alert("SRenc : <"+index+":"+segmentencours+"> bk :<"+bk+"> lg : <"+lg+">");*/
	    var reg0=new RegExp(" +$", "g"); 
	    segmentencours=segmentencours.replace(reg0,"");
	    /*segmentencours = segmentencours.replace(/ +$/gi, "");*/
	    var reg1=new RegExp(" +", "g"); 
	    segmentencours=segmentencours.replace(reg1," ");
	    /*segmentencours = segmentencours.replace(/ +/gi, " ");*/
	    /*alert("SReditpost : <"+index+":"+segmentencours+"> bk :<"+bk+"> lg : <"+lg+">");*/
	    if (segmentencours != DictionnaireNumDesItems[trameForme[index][annotationencoursIndex]])  {
		editsegment(DictionnaireNumDesItems[trameForme[index][annotationencoursIndex]],index,segmentencours,1);
	    }
	    Segmentencours=[];
	    segmentencours="";
	}
    }
    /* normalisation trame sr */
    for (var index in trameForme) {
	var tmpitem="";
	if (annotationencours<=3) {
	    tmpitem=DictionnaireNumDesItems[trameForme[index][annotationencoursIndex]];
	}
	else {
	    tmpitem=annotationencours+"//"+DictionnaireNumDesItems[trameForme[index][annotationencoursIndex]];
	}
	if ((DictionnaireDesItems[tmpitem] >= freqsegmentSR) && (!(dicNum2forme[trameForme[index][0]] in dictionnairedesdelims))) {
            if (dictionnaireventilationdesSR[index] !== undefined) {
		var lgsr=dictionnaireventilationdesSR[index];
		var tmpsr=DictionnaireNumDesItems[trameForme[index][annotationencoursIndex]]
		var lgtmpsr=1;
		var k=1;
		var lastpositionsr=0;
		while (lgtmpsr < lgsr) {
                    var tmpindex=Number(index);
		    if ((dicNum2forme[trameForme[tmpindex+k][0]] in dictionnairedesdelims ) || (trameForme[tmpindex+k][0] == -1 )) {
			tmpsr=tmpsr + " ";
		    } 
		    else {
			tmpsr=tmpsr + DictionnaireNumDesItems[trameForme[tmpindex+k][annotationencoursIndex]]
			lgtmpsr++;
		    }
		    lastpositionsr=tmpindex+k;
		    k++;	
		}
		var reg0=new RegExp(" +$", "g"); 
		tmpsr=tmpsr.replace(reg0,"");
		var reg1=new RegExp(" +", "g"); 
		tmpsr=tmpsr.replace(reg1," ");
		if ((tmpsr in listeSR) && (listeSR[tmpsr] >= freqsegmentSR)) {
                }
                else {
                    var tmpsr = tmpsr.split(" ");
		    if (tmpsr.length > 2) { 
			var last= tmpsr.pop();
			var first = tmpsr.shift();
			var petitSR1=first;
                        var longueurpetit=1;
			for (k = 0; k < tmpsr.length; k++) {
                            longueurpetit++;
			    petitSR1 = petitSR1+" "+tmpsr[k];
			    if ((petitSR1 in listeSR) && (listeSR[petitSR1] >= freqsegmentSR)) {
				dictionnaireventilationdesSR[index]=longueurpetit;
			    }		
			}
                    }
                }
            }
        }
    }
    etatLancementSR=1;
    loadSR();
}
//-----------------------------------------------------------------------------------
function eraseSRencours() {
    //-----------------------------------------------------------------
    refreshItrameur();
    //-----------------------------------------------------------------
    listeSR = new Object();
    listeSROK = new Object();
    dictionnaireventilationdesSR = new Object();
    etatLancementSR=0;
}
//-----------------------------------------------------------------------------------
function loadSR() {
    //-----------------------------------------------------------------
    refreshItrameur();
    //-----------------------------------------------------------------
    var freqsegmentSR=document.getElementById('srfqID').value;
    for (var SR in listeSR) {
	if (listeSR[SR] >= freqsegmentSR) {
	    listeSROK[SR] = listeSR[SR];
	    //console.log("SR : "+SR+" | "+listeSROK[SR]);
	}
    }
    var keysSR = Object.keys(listeSROK);
    /*for (var key in listeSROK) {
	keysSR.push(key);
    }
    keysSR.sort(function(k0, k1) {
	var a = listeSROK[k0];
	var b = listeSROK[k1];
	return a > b ? -1 : (a < b ? 1 : 0);
    });*/
    //---------------------------------------------------
    /* resultats */
    var resultFinal=new Array();
    var nbSRtoAdd=0;
    for (k = 0; k < keysSR.length; k++) {
	if (!($.isArray(resultFinal[nbSRtoAdd]))) {
	    resultFinal[nbSRtoAdd]=new Array();
	}
	resultFinal[nbSRtoAdd]=[];
	var tmpsr = keysSR[k].split(" ");
	resultFinal[nbSRtoAdd].push(keysSR[k],listeSROK[keysSR[k]],tmpsr.length);      
	nbSRtoAdd=nbSRtoAdd+1;
    }
    /*--------------------------*/
    document.getElementById('placeholder').innerHTML = '<h4>Segments Répétés</h4><table id="SegmentsRepetes" class="display" width="80%"></table>';
    $(document).ready(function() {
	var table = $('#SegmentsRepetes').DataTable ( {
	    order: [[ 1, "desc" ]],
	    data:resultFinal,
	    searchHighlight: true,
	    "destroy": true,
	    lengthMenu: [[10, 25, 50,100, -1], [10, 25, 50,100, "All"]],
	    dom: 'Bfrtip',
	    buttons: [
		'copy', 'csv', 'excel', 'pdf', 'print'
	    ],
	    columns: [
		{title: "SR"},
		{title: "Fq"},
		{title: "Lg"},
		{title: "Concordance"},
		{title: "Ventilation"},
		{title: "Carte"}
	    ],
	    columnDefs: [ 
		{
		    "targets": 3,
		    "data": null,
		    /*"defaultContent": "<button value=\"C\"><i class=\"right\"></i></button>"*/
		    "defaultContent": "<button value=\"C\" class=\"btnC\"></button>"
		} ,
		{
		    "targets": 4,
		    "data": null,
		    /*"defaultContent": "<button value=\"V\"><i class=\"up\"></i></button>"*/
		    "defaultContent": "<button value=\"V\" class=\"btnV\"></button>"
		},
		{
		    "targets": 5,
		    "data": null,
		    /*"defaultContent": "<button value=\"S\"><i class=\"rectD\"></i></button>"*/
		    "defaultContent": "<button value=\"S\" class=\"btnS\"></button>"
		}
	    ]

	});
	$('#SegmentsRepetes tbody').on( 'click', 'button', function () {
	    var data = table.row( $(this).parents('tr') ).data();
	    var a=document.getElementById('SRpoleID');
	    a.value = data[0];
	    var inputBitext = document.getElementById ("bitextID");
	    var isCheckedBitext = inputBitext.checked;
	    var b="";
	    if (isCheckedBitext) {
		b=document.getElementById('SRpoleCibleID');
		b.value = data[0];
	    }
	    var fired_button = $(this).val();
	    if (fired_button=="C") {
		concordanceSR();
	    }
	    if (fired_button=="S") {
		displaySRsurCarte();
	    }
	    if (fired_button=="V") {
		ventilationSRPartie();
	    }
	} );
    });

}
//-----------------------------------------------------------------------------------
function editsegment (w,i,segmentencours,annot) {
	if (listeSR[segmentencours] === undefined) {
		listeSR[segmentencours]=1;
	}
	else {
		listeSR[segmentencours]= listeSR[segmentencours]+1;
	}
	var Segmentencours = segmentencours.split(" ");
	/*---------------------------------------------------*/
	if (dictionnaireventilationdesSR[i] !== undefined) {
		var tmpf = dictionnaireventilationdesSR[i];
		if ( Segmentencours.length  > tmpf) {
			dictionnaireventilationdesSR[i]= Segmentencours.length; 
		};
	}
	else {
		dictionnaireventilationdesSR[i]= Segmentencours.length ;
	}
	/*---------------------------------------------------*/
    if (Segmentencours.length > 2) { 
		var last= Segmentencours.pop();
		var first = Segmentencours.shift();
		var petitSR1=first;
		for (k = 0; k < Segmentencours.length; k++) {
			petitSR1 = petitSR1+" "+Segmentencours[k];
			if (listeSR[petitSR1] === undefined) {
				listeSR[petitSR1]=1;
			}
			else {
				listeSR[petitSR1]=listeSR[petitSR1]+1;
			}
		}
    }
}
//-----------------------------------------------------------------------------------
function concordancePosition(AnnotationOutput1) {
    var AnnotationOutput=Number(AnnotationOutput1);
    var lgcontexte=document.getElementById('lgcontexteID').value;
    var DictionnaireDesItems = new Object();
    var DictionnaireNumDesItems = new Object();
    if (nombredannotation > 1 ) {
	if (AnnotationOutput==1) {
	    DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
	    DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
	}
	if (AnnotationOutput==2) {
	    DictionnaireDesItems = jQuery.extend({}, DictionnaireLemme);
	    DictionnaireNumDesItems=jQuery.extend({}, dicNum2lemme);
	}
	if (AnnotationOutput==3) {
	    DictionnaireDesItems = jQuery.extend({}, DictionnaireCategorie);
	    DictionnaireNumDesItems=jQuery.extend({}, dicNum2categorie);
	}
	if (AnnotationOutput>3) {
	    DictionnaireDesItems = jQuery.extend({}, DictionnaireAnnotation);
	    DictionnaireNumDesItems=jQuery.extend({}, dicNum2annotation);
	}
    }
    else {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
    }
    // a changer...
    var annotationencoursIndex=AnnotationOutput-1;
    /*--------------------------*/
    var table='';
    table += '<table id="CONCORDANCE" class="display" width="100%">';
    /*--------------------------*/
    var PARTITION =document.getElementById('IDPartie').value;
    var LISTESDESPARTIES=new Object(); 
    var DicoDesPositionsDesPartiesPourSections=new Object(); 
    var positionMaxG=0;
    var positionMaxD=0;
    if (PARTITION != '') {
	LISTESDESPARTIES=Object.keys(cadre[PARTITION]);
	for (var j=0;j<LISTESDESPARTIES.length;j++) {
	    var listepositions = cadre[PARTITION][LISTESDESPARTIES[j]];
	    for (var k=0;k<(listepositions.length);k=k+2) {
		var deb = listepositions[k];
		var tmpk=k+1;
		var fin = listepositions[tmpk];
		DicoDesPositionsDesPartiesPourSections[deb]=PARTITION+"="+LISTESDESPARTIES[j]+"//"+deb+"//"+fin;
		/*DicoDesPositionsDesPartiesPourSections[fin]="ENDPARTIE";*/
	    }
	}
	//var firstIndexTrame=Object.keys(trameForme)[0];
	//var j=Number(firstIndexTrame);
	//for (var k=1;k<firstIndexTrame;k++) {
	//    if (k in DicoDesPositionsDesPartiesPourSections) {
	//	table+= '<tr><td colspan="4"><span style="font-size:11px;color:red;font-weight: bold;font-variant: small-caps;">'+DicoDesPositionsDesPartiesPourSections[k]+'</span></td></tr>';
	//    }
	//}
    }
    else {
	positionMaxG=0;
	positionMaxD=positionsurlatrame;
    }
    var nbContexte=0;
    var partieEnCours="";
    /*--------------------------*/
    for (var index in gestionnaireSelectionTMP) {
	
	if (index in DicoDesPositionsDesPartiesPourSections) {
	    if (DicoDesPositionsDesPartiesPourSections[index] != "ENDPARTIE") {
		
		var DDDD=DicoDesPositionsDesPartiesPourSections[index].split("//");
		var labelPartie=DDDD[0];
		positionMaxG=Number(DDDD[1]);
		positionMaxD=Number(DDDD[2]);
		//table+= '<tr><td colspan="4"><span style="font-size:11px;color:red;font-weight: bold;font-variant: small-caps;">'+labelPartie+'</span></td></tr>';
	    }
	}
	if (gestionnaireSelectionTMP[index]==1) {
	    //alert('MAXG : '+positionMaxG+' MAXD : '+positionMaxD );
	    var item = DictionnaireNumDesItems[trameForme[index][annotationencoursIndex]];
	    var contexteG="";
	    var contexteD="";
	    var nbItemGauche=0;
	    var nbItemDroite=0;
	    /* a droite */
	    var posIndex=Number(index)+1;
	    while (nbItemDroite <= lgcontexte) {
		if ((posIndex in trameForme) && (posIndex <= positionMaxD)) {
		    var item2 = DictionnaireNumDesItems[trameForme[posIndex][annotationencoursIndex]];
		    if (!(dicNum2forme[trameForme[posIndex][0]] in dictionnairedesdelims))  {
			nbItemDroite++;
			if (nombredannotation > 1) {
			    if (nombredannotation > 3) {
				contexteD+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+posIndex+"<br/>(1):"+ dicNum2forme[trameForme[posIndex][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[posIndex][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[posIndex][2]];
				for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
				    var kk=tmpAnnot+1;
				    contexteD+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[posIndex][tmpAnnot]];
				}
				if ((document.getElementById('numAnnotRelationID').value == "") | (document.getElementById('relationID').value == "")) {
				    contexteD+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
				}
				else {
				    var rel = document.getElementById('relationID').value;
				    var ident = document.getElementById('numAnnotRelationID').value;
				    ident=Number(ident);
				    var listerel2=dicNum2annotation[trameForme[posIndex][ident-1]];
				    var ListeDependanceAtThisPos=listerel2.split(",");
				    var test = "bad";
				    for (var nbDepAtThisPos=0;nbDepAtThisPos<ListeDependanceAtThisPos.length;nbDepAtThisPos++) {
					var rel2=ListeDependanceAtThisPos[nbDepAtThisPos];
					rel2=rel2.replaceAll("(","//");
					rel2=rel2.replaceAll(")","");
					var Lrel=rel2.split("//");
					if (((rel == Lrel[0]) || (rel == "ANY"))  && ( Lrel[1] == index )) {
					    test = "ok";
					}
				    }
				    if (test == "ok") {
					contexteD+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\"><span style=\"background-color:yellow\">"+item2+"</span></a>";
				    }
				    else {
					contexteD+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
				    }
				}
			    }
			    else {
				contexteD+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+posIndex+"<br/>(1):"+ dicNum2forme[trameForme[posIndex][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[posIndex][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[posIndex][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
			    }
			}
			else {
			    contexteD+=item2;
			}
		    }
		    else {
			//contexteD+=item2;
			contexteD+=item2;
		    }
		    posIndex++;
		}
		else {
		    nbItemDroite=lgcontexte+1;
		}
	    }
	    /* a gauche */
	    posIndex=Number(index)-1;
	    while (nbItemGauche <= lgcontexte) {
		if ((posIndex in trameForme) && (posIndex > positionMaxG)) {
		    var item2 = DictionnaireNumDesItems[trameForme[posIndex][annotationencoursIndex]];
		    if (!(dicNum2forme[trameForme[posIndex][0]] in dictionnairedesdelims))  {
			nbItemGauche++;
			if (nombredannotation > 1) {
			    if (nombredannotation > 3) {
				var tmpContext="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+posIndex+"<br/>(1):"+ dicNum2forme[trameForme[posIndex][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[posIndex][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[posIndex][2]];
				for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
				    var kk=tmpAnnot+1;
				    tmpContext+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[posIndex][tmpAnnot]];
				}
				if ((document.getElementById('numAnnotRelationID').value == "") | (document.getElementById('relationID').value == "")) {
				    tmpContext+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
				    contexteG=tmpContext+contexteG;
				}
				else {
				    var rel = document.getElementById('relationID').value;
				    var ident = document.getElementById('numAnnotRelationID').value;
				    ident=Number(ident);
				    var listerel2=dicNum2annotation[trameForme[posIndex][ident-1]];
				    var ListeDependanceAtThisPos=listerel2.split(",");
				    var test = "bad";
				    for (var nbDepAtThisPos=0;nbDepAtThisPos<ListeDependanceAtThisPos.length;nbDepAtThisPos++) {
					var rel2=ListeDependanceAtThisPos[nbDepAtThisPos];
					rel2=rel2.replaceAll("(","//");
					rel2=rel2.replaceAll(")","");
					var Lrel=rel2.split("//");
					if (((rel == Lrel[0]) || (rel == "ANY"))  && ( Lrel[1] == index )) {
					    test = "ok";
					}
				    }
				    if (test == "ok") {
					tmpContext+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\"><span style=\"background-color:yellow\">"+item2+"</span></a>";
					contexteG=tmpContext+contexteG;
				    }
				    else {
					tmpContext+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
					contexteG=tmpContext+contexteG;
				    }
				}			
			    }
			    else {
				contexteG="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+posIndex+"<br/>(1):"+ dicNum2forme[trameForme[posIndex][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[posIndex][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[posIndex][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>"+contexteG;
			    }
			}
			else {
			    contexteG=item2+contexteG;
			}
		    }
		    else {
			contexteG=item2+contexteG;
		    }
		    posIndex--;
		}
		else {
		    nbItemGauche=lgcontexte+1;
		}
	    }
	    nbContexte++;
	    /* MODIF 2018 ****************************************************/
	    var TMPPARTIENAME="";
	    if (PARTITION != '') {
		LISTESDESPARTIES=Object.keys(cadre[PARTITION]);
		for (var j=0;j<LISTESDESPARTIES.length;j++) {
		    var listepositions = cadre[PARTITION][LISTESDESPARTIES[j]];
		    for (var k=0;k<(listepositions.length);k=k+2) {
			var deb = Number(listepositions[k]);
			var tmpk=k+1;
			var fin = Number(listepositions[tmpk]);
			var tmpIndex=Number(index);
			if ((tmpIndex<=fin) && (tmpIndex>=deb)) {
			    TMPPARTIENAME=LISTESDESPARTIES[j];
			}
		    }
		}
	    }
	    /****************************************************************/
	    if (nombredannotation > 1 ) {
		if (nombredannotation > 3) {
		    table +='<tr><td width="2%">'+nbContexte+'</td><td>'+TMPPARTIENAME+'</td><td style="text-align:right;" width="45%">'+contexteG+'</td><td style="text-align:center;" width="8%"><a style="text-decoration:none" href="#" onmouseover="Tip(\'<p>Position : '+index+'<br/>(1):'+ dicNum2forme[trameForme[index][0]] + '<br/>(2):' + dicNum2lemme[trameForme[index][1]] + '<br/>(3):' + dicNum2categorie[trameForme[index][2]];
		    for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
			var kk=tmpAnnot+1;
			table +="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[index][tmpAnnot]];
		    }
		    table +="</p>')\" onmouseout=\"UnTip()\" rel=\""+item+"\">"+item+"</a></td><td style=\"text-align:left;\" width=\"45%\">"+contexteD+"</td></tr>";
		}
		else {
		    table +='<tr><td width="2%">'+nbContexte+'</td><td>'+TMPPARTIENAME+'</td><td style="text-align:right;" width="45%">'+contexteG+'</td><td style="text-align:center;" width="8%"><a style="text-decoration:none" href="#" onmouseover="Tip(\'<p>(1):'+ dicNum2forme[trameForme[index][0]] + '<br/>(2):' + dicNum2lemme[trameForme[index][1]] + '<br/>(3):' + dicNum2categorie[trameForme[index][2]] +'</p>\')" onmouseout="UnTip()" rel="'+item+'">'+item+'</a></td><td style="text-align:left;" width="45%">'+contexteD+'</td></tr>';
		}
	    }
	    else {
		table +='<tr><td width="2%">'+nbContexte+'</td><td>'+TMPPARTIENAME+'</td><td style="text-align:right;" width="45%">'+contexteG+'</td><td style="text-align:center;" width="8%">'+item+'</td><td style="text-align:left;" width="45%">'+contexteD+'</td></tr>';
	    }
	}
    }
    table +='</table>';
    $("#placeholder").html(table);
    $(document).ready(function() {
	$('#CONCORDANCE').DataTable ( {
	    //order: [[ 1, "desc" ]],
	    lengthMenu: [[10, 25, 50,100, -1], [10, 25, 50,100, "All"]],
	    searchHighlight: true,
	    "destroy": true,
	    columns: [
		{title: "N°"},
		{title: "Partie"},
		{title: "Contexte Gauche"},
		{title: "Pôle"},
		{title: "Contexte Droit"}
	    ]
	})
    });
}
//-----------------------------------------------------------------------------------
function concordancesurselection() {
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    /*----------------------------------------------------------------*/
    refreshItrameur();
    /*------------------------------------------------------------*/
    //var AnnotationOutput=annotationencours;
    var AnnotationOutput=annotationencoursOUT;
    var lgcontexte=document.getElementById('lgcontexteID').value;
    var DictionnaireDesItems = new Object();
    var DictionnaireNumDesItems = new Object();
    if (nombredannotation > 1 ) {
	if (AnnotationOutput==1) {
	    DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
	    DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
	}
	if (AnnotationOutput==2) {
	    DictionnaireDesItems = jQuery.extend({}, DictionnaireLemme);
	    DictionnaireNumDesItems=jQuery.extend({}, dicNum2lemme);
	}
	if (AnnotationOutput==3) {
	    DictionnaireDesItems = jQuery.extend({}, DictionnaireCategorie);
	    DictionnaireNumDesItems=jQuery.extend({}, dicNum2categorie);
	}
	if (AnnotationOutput>3) {
	    DictionnaireDesItems = jQuery.extend({}, DictionnaireAnnotation);
	    DictionnaireNumDesItems=jQuery.extend({}, dicNum2annotation);
	}
    }
    else {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
    }
    // a changer...
    var annotationencoursIndex=AnnotationOutput-1;
    /*--------------------------*/
    var table='';
    table += '<table id="CONCORDANCE" class="display" width="100%">';
    /*--------------------------*/
    var PARTITION =document.getElementById('IDPartie').value;
    var LISTESDESPARTIES=new Object(); 
    var DicoDesPositionsDesPartiesPourSections=new Object(); 
    var positionMaxG=0;
    var positionMaxD=0;
    if (PARTITION != '') {
	LISTESDESPARTIES=Object.keys(cadre[PARTITION]);
	for (var j=0;j<LISTESDESPARTIES.length;j++) {
	    var listepositions = cadre[PARTITION][LISTESDESPARTIES[j]];
	    for (var k=0;k<(listepositions.length);k=k+2) {
		var deb = listepositions[k];
		var tmpk=k+1;
		var fin = listepositions[tmpk];
		DicoDesPositionsDesPartiesPourSections[deb]=PARTITION+"="+LISTESDESPARTIES[j]+"//"+deb+"//"+fin;
		/*DicoDesPositionsDesPartiesPourSections[fin]="ENDPARTIE";*/
	    }
	}
	//var firstIndexTrame=Object.keys(trameForme)[0];
	//var j=Number(firstIndexTrame);
	//for (var k=1;k<firstIndexTrame;k++) {
	//    if (k in DicoDesPositionsDesPartiesPourSections) {
	//	table+= '<tr><td colspan="4"><span style="font-size:11px;color:red;font-weight: bold;font-variant: small-caps;">'+DicoDesPositionsDesPartiesPourSections[k]+'</span></td></tr>';
	//    }
	//}
    }
    else {
	positionMaxG=0;
	positionMaxD=positionsurlatrame;
    }
    var nbContexte=0;
    var partieEnCours="";
    /*--------------------------*/
    for (var index in trameForme) {
	if (index in DicoDesPositionsDesPartiesPourSections) {
	    if (DicoDesPositionsDesPartiesPourSections[index] != "ENDPARTIE") {
		var DDDD=DicoDesPositionsDesPartiesPourSections[index].split("//");
		var labelPartie=DDDD[0];
		positionMaxG=Number(DDDD[1]);
		positionMaxD=Number(DDDD[2]);
		//table+= '<tr><td colspan="4"><span style="font-size:11px;color:red;font-weight: bold;font-variant: small-caps;">'+labelPartie+'</span></td></tr>';
	    }
	}
	if (gestionnaireSelection[index]==1) {
	    //alert('MAXG : '+positionMaxG+' MAXD : '+positionMaxD );
	    var item = DictionnaireNumDesItems[trameForme[index][annotationencoursIndex]];
	    var contexteG="";
	    var contexteD="";
	    var nbItemGauche=0;
	    var nbItemDroite=0;
	    /* a droite */
	    var posIndex=Number(index)+1;
	    while (nbItemDroite <= lgcontexte) {
		if ((posIndex in trameForme) && (posIndex <= positionMaxD)) {
		    var item2 = DictionnaireNumDesItems[trameForme[posIndex][annotationencoursIndex]];
		    if (!(dicNum2forme[trameForme[posIndex][0]] in dictionnairedesdelims))  {
			nbItemDroite++;
			if (nombredannotation > 1) {
			    if (nombredannotation > 3) {
				contexteD+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+posIndex+"<br/>(1):"+ dicNum2forme[trameForme[posIndex][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[posIndex][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[posIndex][2]];
				for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
				    var kk=tmpAnnot+1;
				    contexteD+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[posIndex][tmpAnnot]];
				}
				if ((document.getElementById('numAnnotRelationID').value == "") | (document.getElementById('relationID').value == "")) {
				    contexteD+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
				}
				else {
				    var rel = document.getElementById('relationID').value;
				    var ident = document.getElementById('numAnnotRelationID').value;
				    ident=Number(ident);
				    var listerel2=dicNum2annotation[trameForme[posIndex][ident-1]];
				    var ListeDependanceAtThisPos=listerel2.split(",");
				    var test = "bad";
				    for (var nbDepAtThisPos=0;nbDepAtThisPos<ListeDependanceAtThisPos.length;nbDepAtThisPos++) {
					var rel2=ListeDependanceAtThisPos[nbDepAtThisPos];
					rel2=rel2.replaceAll("(","//");
					rel2=rel2.replaceAll(")","");
					var Lrel=rel2.split("//");
					if (((rel == Lrel[0]) || (rel == "ANY"))  && ( Lrel[1] == index )) {
					    test = "ok";
					}
				    }
				    if (test == "ok") {
					contexteD+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\"><span style=\"background-color:yellow\">"+item2+"</span></a>";
				    }
				    else {
					contexteD+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
				    }
				}
			    }
			    else {
				contexteD+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+posIndex+"<br/>(1):"+ dicNum2forme[trameForme[posIndex][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[posIndex][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[posIndex][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
			    }
			}
			else {
			    contexteD+=item2;
			}
		    }
		    else {
			//contexteD+=item2;
			contexteD+=item2;
		    }
		    posIndex++;
		}
		else {
		    nbItemDroite=lgcontexte+1;
		}
	    }
	    /* a gauche */
	    posIndex=Number(index)-1;
	    while (nbItemGauche <= lgcontexte) {
		if ((posIndex in trameForme) && (posIndex > positionMaxG)) {
		    var item2 = DictionnaireNumDesItems[trameForme[posIndex][annotationencoursIndex]];
		    if (!(dicNum2forme[trameForme[posIndex][0]] in dictionnairedesdelims))  {
			nbItemGauche++;
			if (nombredannotation > 1) {
			    if (nombredannotation > 3) {
				var tmpContext="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+posIndex+"<br/>(1):"+ dicNum2forme[trameForme[posIndex][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[posIndex][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[posIndex][2]];
				for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
				    var kk=tmpAnnot+1;
				    tmpContext+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[posIndex][tmpAnnot]];
				}
				if ((document.getElementById('numAnnotRelationID').value == "") | (document.getElementById('relationID').value == "")) {
				    tmpContext+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
				    contexteG=tmpContext+contexteG;
				}
				else {
				    var rel = document.getElementById('relationID').value;
				    var ident = document.getElementById('numAnnotRelationID').value;
				    ident=Number(ident);
				    var listerel2=dicNum2annotation[trameForme[posIndex][ident-1]];
				    var ListeDependanceAtThisPos=listerel2.split(",");
				    var test = "bad";
				    for (var nbDepAtThisPos=0;nbDepAtThisPos<ListeDependanceAtThisPos.length;nbDepAtThisPos++) {
					var rel2=ListeDependanceAtThisPos[nbDepAtThisPos];
					rel2=rel2.replaceAll("(","//");
					rel2=rel2.replaceAll(")","");
					var Lrel=rel2.split("//");
					if (((rel == Lrel[0]) || (rel == "ANY"))  && ( Lrel[1] == index )) {
					    test = "ok";
					}
				    }
				    if (test == "ok") {
					tmpContext+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\"><span style=\"background-color:yellow\">"+item2+"</span></a>";
					contexteG=tmpContext+contexteG;
				    }
				    else {
					tmpContext+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
					contexteG=tmpContext+contexteG;
				    }
				}			
			    }
			    else {
				contexteG="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+posIndex+"<br/>(1):"+ dicNum2forme[trameForme[posIndex][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[posIndex][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[posIndex][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>"+contexteG;
			    }
			}
			else {
			    contexteG=item2+contexteG;
			}
		    }
		    else {
			contexteG=item2+contexteG;
		    }
		    posIndex--;
		}
		else {
		    nbItemGauche=lgcontexte+1;
		}
	    }
	    nbContexte++;
	    /* MODIF 2018 ****************************************************/
	    var TMPPARTIENAME="";
	    if (PARTITION != '') {
		LISTESDESPARTIES=Object.keys(cadre[PARTITION]);
		for (var j=0;j<LISTESDESPARTIES.length;j++) {
		    var listepositions = cadre[PARTITION][LISTESDESPARTIES[j]];
		    for (var k=0;k<(listepositions.length);k=k+2) {
			var deb = Number(listepositions[k]);
			var tmpk=k+1;
			var fin = Number(listepositions[tmpk]);
			var tmpIndex=Number(index);
			if ((tmpIndex<=fin) && (tmpIndex>=deb)) {
			    TMPPARTIENAME=LISTESDESPARTIES[j];
			}
		    }
		}
	    }
	    /****************************************************************/
	    if (nombredannotation > 1 ) {
		if (nombredannotation > 3) {
		    table +='<tr><td width="2%">'+nbContexte+'</td><td>'+TMPPARTIENAME+'</td><td style="text-align:right;" width="45%">'+contexteG+'</td><td style="text-align:center;" width="8%"><a style="text-decoration:none" href="#" onmouseover="Tip(\'<p>Position : '+index+'<br/>(1):'+ dicNum2forme[trameForme[index][0]] + '<br/>(2):' + dicNum2lemme[trameForme[index][1]] + '<br/>(3):' + dicNum2categorie[trameForme[index][2]];
		    for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
			var kk=tmpAnnot+1;
			table +="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[index][tmpAnnot]];
		    }
		    table +="</p>')\" onmouseout=\"UnTip()\" rel=\""+item+"\">"+item+"</a></td><td style=\"text-align:left;\" width=\"45%\">"+contexteD+"</td></tr>";
		}
		else {
		    table +='<tr><td width="2%">'+nbContexte+'</td><td>'+TMPPARTIENAME+'</td><td style="text-align:right;" width="45%">'+contexteG+'</td><td style="text-align:center;" width="8%"><a style="text-decoration:none" href="#" onmouseover="Tip(\'<p>(1):'+ dicNum2forme[trameForme[index][0]] + '<br/>(2):' + dicNum2lemme[trameForme[index][1]] + '<br/>(3):' + dicNum2categorie[trameForme[index][2]] +'</p>\')" onmouseout="UnTip()" rel="'+item+'">'+item+'</a></td><td style="text-align:left;" width="45%">'+contexteD+'</td></tr>';
		}
	    }
	    else {
		table +='<tr><td width="2%">'+nbContexte+'</td><td>'+TMPPARTIENAME+'</td><td style="text-align:right;" width="45%">'+contexteG+'</td><td style="text-align:center;" width="8%">'+item+'</td><td style="text-align:left;" width="45%">'+contexteD+'</td></tr>';
	    }
	}
    }
    table +='</table>';
    $("#placeholder").html(table);
    $(document).ready(function() {
	$('#CONCORDANCE').DataTable ( {
	    //order: [[ 1, "desc" ]],
	    lengthMenu: [[10, 25, 50,100, -1], [10, 25, 50,100, "All"]],
	    searchHighlight: true,
	    "destroy": true,
	    columns: [
		{title: "N°"},
		{title: "Partie"},
		{title: "Contexte Gauche"},
		{title: "Pôle"},
		{title: "Contexte Droit"}
	    ]
	})
    });
}
//-----------------------------------------------------------------------------------
function concordanceSR() {
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    refreshItrameur();

    var lgcontexte=document.getElementById('lgcontexteID').value;
    var DictionnaireDesItems = new Object();
    var DictionnaireNumDesItems = new Object();
    var DictionnaireDesItemsOut = new Object();
    var DictionnaireNumDesItemsOut = new Object();
    if (nombredannotation > 1 ) {
		if (annotationencours==1) {
			DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
			DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
			if (annotationencours != annotationencoursOUT) {
				if (annotationencoursOUT==2) {
					DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireLemme);
					DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2lemme);
				}
				if (annotationencoursOUT==3) {
					DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireCategorie);
					DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2categorie);
				}
				if (annotationencoursOUT>3) {
					DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
					DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
				}
			}
		}
		if (annotationencours==2) {
			DictionnaireDesItems = jQuery.extend({}, DictionnaireLemme);
			DictionnaireNumDesItems=jQuery.extend({}, dicNum2lemme);
			if (annotationencours != annotationencoursOUT) {
				if (annotationencoursOUT==1) {
					DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireSource);
					DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2forme);
				}
				if (annotationencoursOUT==3) {
					DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireCategorie);
					DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2categorie);
				}
				if (annotationencoursOUT>3) {
					DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
					DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
				}
			}
		}
		if (annotationencours==3) {
			DictionnaireDesItems = jQuery.extend({}, DictionnaireCategorie);
			DictionnaireNumDesItems=jQuery.extend({}, dicNum2categorie);
			if (annotationencours != annotationencoursOUT) {
				if (annotationencoursOUT==1) {
					DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireSource);
					DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2forme);
				}
				if (annotationencoursOUT==2) {
					DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireLemme);
					DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2lemme);
				}
				if (annotationencoursOUT>3) {
					DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
					DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
				}
			}
		}
		if (annotationencours>3) {
			DictionnaireDesItems = jQuery.extend({}, DictionnaireAnnotation);
			DictionnaireNumDesItems=jQuery.extend({}, dicNum2annotation);
			if (annotationencours != annotationencoursOUT) {
				if (annotationencoursOUT==1) {
					DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireSource);
					DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2forme);
				}
				if (annotationencoursOUT==2) {
					DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireLemme);
					DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2lemme);
				}
				if (annotationencoursOUT==3) {
					DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireCategorie);
					DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2categorie);
				}
				if (annotationencoursOUT>3) {
					DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
					DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
				}
			}
		}
    }
    else {
		DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
		DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
    }
    var annotationencoursIndex=annotationencours-1;
    var annotationencoursIndexOUT=annotationencoursOUT-1;

    var freqsegmentSR=document.getElementById('srfqID').value;
    var queryText=document.getElementById('SRpoleID').value;
    if (!(queryText in listeSROK))  {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Ce segment n\'est pas un SR...</span></small>';
	$("#placeholder").html(vide);
	return;
    }
    else { 
	if (listeSROK[queryText] < freqsegmentSR)  {
	    var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Ce segment n\'est pas un SR...</span></small>';
	    $("#placeholder").html(vide);
	    return;
	}
    }
    var complementtitre="";
    if ((document.getElementById('numAnnotRelationID').value != "") && (document.getElementById('relationID').value != "REL") && (document.getElementById('relationID').value != "")) {
	
	complementtitre+="(+ les <span style=\"background-color:yellow\">"+document.getElementById('relationID').value+"</span> de "+queryText+')';
    }
    var resultFinal='<script type=\"text/javascript" src="./import/wz_tooltip.js"></script> ';
    var table='';
    table += '<table id="CONCORDANCE" class="display" width="100%">';
    /*--------------------------*/
    var PARTITION =document.getElementById('IDPartie').value;
    var LISTESDESPARTIES=new Object(); 
    var DicoDesPositionsDesPartiesPourSections=new Object(); 
    var positionMaxG=0;
    var positionMaxD=0;
    if (PARTITION != '') {
	LISTESDESPARTIES=Object.keys(cadre[PARTITION]);
	for (var j=0;j<LISTESDESPARTIES.length;j++) {
	    var listepositions = cadre[PARTITION][LISTESDESPARTIES[j]];
	    for (var k=0;k<(listepositions.length);k=k+2) {
		var deb = listepositions[k];
		var tmpk=k+1;
		var fin = listepositions[tmpk];
		DicoDesPositionsDesPartiesPourSections[deb]=PARTITION+"="+LISTESDESPARTIES[j]+"//"+deb+"//"+fin;
		/*DicoDesPositionsDesPartiesPourSections[fin]="ENDPARTIE";*/
	    }
	}
	//var firstIndexTrame=Object.keys(trameForme)[0];
	//var j=Number(firstIndexTrame);
	//for (var k=1;k<firstIndexTrame;k++) {
	//    if (k in DicoDesPositionsDesPartiesPourSections) {
	//	table+= '<tr><td colspan="4"><span style="font-size:11px;color:red;font-weight: bold;font-variant: small-caps;">'+DicoDesPositionsDesPartiesPourSections[k]+'</span></td></tr>';
	//    }
	//}
    }
    else {
	positionMaxG=0;
	positionMaxD=positionsurlatrame;
    }
    /*--------------------------*/
    var nbContexte=0;
    var partieEnCours="";
    for (var index in trameForme) {
	if (index in DicoDesPositionsDesPartiesPourSections) {
	    if (DicoDesPositionsDesPartiesPourSections[index] != "ENDPARTIE") {
		var DDDD=DicoDesPositionsDesPartiesPourSections[index].split("//");
		var labelPartie=DDDD[0];
		positionMaxG=Number(DDDD[1]);
		positionMaxD=Number(DDDD[2]);
		//table+= '<tr><td colspan="4"><span style="font-size:11px;color:red;font-weight: bold;font-variant: small-caps;">'+labelPartie+'</span></td></tr>';
	    }
	}
	var resuSR="BAD";
	var item = DictionnaireNumDesItems[trameForme[index][annotationencoursIndex]];
	if (!(dicNum2forme[trameForme[index][0]] in dictionnairedesdelims))  {
	    if ((queryText != '') && (queryText != 'entrez le SR')) {
		var lesmotsduSR=queryText.split(" ");
		if (lesmotsduSR[0] == item) {
		    //var resuSR1 = verifSRatThisPos(index,queryText);
		    var resuSR1="NO";	
		    if (dictionnaireventilationdesSR[index] !== undefined) {
			var listeMotsduSR=queryText.split(" ");
			var longueurSR=listeMotsduSR.length;
			var lgsr=dictionnaireventilationdesSR[index];
			if (longueurSR <= lgsr) {
			    var tmpsr=DictionnaireNumDesItems[trameForme[index][annotationencoursIndex]];
			    var lgtmpsr=1;
			    var k=1;
			    var tmpindex=Number(index);
			    var matchW = "OK";
			    var m=1;
			    while ((lgtmpsr < longueurSR) && (matchW == "OK")) {
				if ((dicNum2forme[trameForme[tmpindex+k][0]] in dictionnairedesdelims ) || (trameForme[tmpindex+k][0] == -1 )) {
				    tmpsr=tmpsr + " ";
				} 
				else {
				    if (DictionnaireNumDesItems[trameForme[tmpindex+k][annotationencoursIndex]] == listeMotsduSR[m]) {
					tmpsr=tmpsr + DictionnaireNumDesItems[trameForme[tmpindex+k][annotationencoursIndex]];
					lgtmpsr++;
					m++;
				    }
				    else {
					matchW = "BAD";
				    }
				}
				k++;	
			    }
			    if (matchW == "OK") { // pas necessaire ??
	    			var reg0=new RegExp(" +$", "g"); 
				tmpsr=tmpsr.replace(reg0,"");
				var reg1=new RegExp(" +", "g"); 
				tmpsr=tmpsr.replace(reg1," ");	
				if (queryText == tmpsr) {
				    resuSR1="OK";
				}
			    }
			}
		    }
		    //---------------------------
		    if (resuSR1 == "OK") {
			resuSR="OK";
		    }
		}
	    }
	}
	if (resuSR == "OK")  {
	    var contexteG="";
	    var contexteD="";
	    var nbItemGauche=0;
	    var nbItemDroite=0;
	    /* a droite */
	    var posIndex=Number(index)+1;
	    while (nbItemDroite <= lgcontexte) {
		if ((posIndex in trameForme) && (posIndex <= positionMaxD)) {
		    //var item2 = DictionnaireNumDesItems[trameForme[posIndex][annotationencoursIndex]];
		    var item2;
		    if (annotationencours != annotationencoursOUT) {
			item2 = DictionnaireNumDesItemsOut[trameForme[posIndex][annotationencoursIndexOUT]];
		    }
		    else {
			item2 = DictionnaireNumDesItems[trameForme[posIndex][annotationencoursIndex]];
		    }

		    if (!(dicNum2forme[trameForme[posIndex][0]] in dictionnairedesdelims))  {
			nbItemDroite++;
			if (nombredannotation > 1) {
			    if (nombredannotation > 3) {
				contexteD+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+posIndex+"<br/>(1):"+ dicNum2forme[trameForme[posIndex][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[posIndex][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[posIndex][2]];
				for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
				    var kk=tmpAnnot+1;
				    contexteD+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[posIndex][tmpAnnot]];
				}
				if ((document.getElementById('numAnnotRelationID').value == "") | (document.getElementById('relationID').value == "")) {
				    contexteD+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
				}
				else {
				    var rel = document.getElementById('relationID').value;
				    var ident = document.getElementById('numAnnotRelationID').value;
				    ident=Number(ident);
				    var listerel2=dicNum2annotation[trameForme[posIndex][ident-1]];
				    var ListeDependanceAtThisPos=listerel2.split(",");
				    var test = "bad";
				    for (var nbDepAtThisPos=0;nbDepAtThisPos<ListeDependanceAtThisPos.length;nbDepAtThisPos++) {
					var rel2=ListeDependanceAtThisPos[nbDepAtThisPos];
					rel2=rel2.replaceAll("(","//");
					rel2=rel2.replaceAll(")","");
					var Lrel=rel2.split("//");
					if (((rel == Lrel[0]) || (rel == "ANY"))  && ( Lrel[1] == index )) {
					    test = "ok";
					}
				    }
				    if (test == "ok") {
					contexteD+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\"><span style=\"background-color:yellow\">"+item2+"</span></a>";
				    }
				    else {
					contexteD+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
				    }
				}
			    }
			    else {
				contexteD+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+posIndex+"<br/>(1):"+ dicNum2forme[trameForme[posIndex][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[posIndex][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[posIndex][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
			    }
			}
			else {
			    contexteD+=item2;
			}
		    }
		    else {
			//contexteD+=item2;
			contexteD+=item2;
		    }
		    posIndex++;
		}
		else {
		    nbItemDroite=lgcontexte+1;
		}
	    }
	    /* a gauche */
	    posIndex=Number(index)-1;
	    while (nbItemGauche <= lgcontexte) {
		if ((posIndex in trameForme) && (posIndex > positionMaxG)) {
		    //var item2 = DictionnaireNumDesItems[trameForme[posIndex][annotationencoursIndex]];
		    var item2;
		    if (annotationencours != annotationencoursOUT) {
			item2 = DictionnaireNumDesItemsOut[trameForme[posIndex][annotationencoursIndexOUT]];
		    }
		    else {
			item2 = DictionnaireNumDesItems[trameForme[posIndex][annotationencoursIndex]];
		    }
		    if (!(dicNum2forme[trameForme[posIndex][0]] in dictionnairedesdelims))  {
			nbItemGauche++;
			if (nombredannotation > 1) {
			    if (nombredannotation > 3) {
				var tmpContext="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+posIndex+"<br/>(1):"+ dicNum2forme[trameForme[posIndex][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[posIndex][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[posIndex][2]];
				for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
				    var kk=tmpAnnot+1;
				    tmpContext+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[posIndex][tmpAnnot]];
				}
				if ((document.getElementById('numAnnotRelationID').value == "") | (document.getElementById('relationID').value == "")) {
				    tmpContext+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
				    contexteG=tmpContext+contexteG;
				}
				else {
				    var rel = document.getElementById('relationID').value;
				    var ident = document.getElementById('numAnnotRelationID').value;
				    ident=Number(ident);
				    var listerel2=dicNum2annotation[trameForme[posIndex][ident-1]];
				    var ListeDependanceAtThisPos=listerel2.split(",");
				    var test = "bad";
				    for (var nbDepAtThisPos=0;nbDepAtThisPos<ListeDependanceAtThisPos.length;nbDepAtThisPos++) {
					var rel2=ListeDependanceAtThisPos[nbDepAtThisPos];
					rel2=rel2.replaceAll("(","//");
					rel2=rel2.replaceAll(")","");
					var Lrel=rel2.split("//");
					if (((rel == Lrel[0]) || (rel == "ANY"))  && ( Lrel[1] == index )) {
					    test = "ok";
					}
				    }
				    if (test == "ok") {
					tmpContext+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\"><span style=\"background-color:yellow\">"+item2+"</span></a>";
					contexteG=tmpContext+contexteG;
				    }
				    else {
					tmpContext+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
					contexteG=tmpContext+contexteG;
				    }
				}
			    }
			    else {
				contexteG="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+posIndex+"<br/>(1):"+ dicNum2forme[trameForme[posIndex][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[posIndex][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[posIndex][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>"+contexteG;
			    }
			}
			else {
			    contexteG=item2+contexteG;
			}
		    }
		    else {
			contexteG=item2+contexteG;
		    }
		    posIndex--;
		}
		else {
		    nbItemGauche=lgcontexte+1;
		}
	    }
	    nbContexte++;
	    /* MODIF 2018 ****************************************************/
	    var TMPPARTIENAME="";
	    if (PARTITION != '') {
		LISTESDESPARTIES=Object.keys(cadre[PARTITION]);
		for (var j=0;j<LISTESDESPARTIES.length;j++) {
		    var listepositions = cadre[PARTITION][LISTESDESPARTIES[j]];
		    for (var k=0;k<(listepositions.length);k=k+2) {
			var deb = Number(listepositions[k]);
			var tmpk=k+1;
			var fin = Number(listepositions[tmpk]);
			var tmpIndex=Number(index);
			if ((tmpIndex<=fin) && (tmpIndex>=deb)) {
			    TMPPARTIENAME=LISTESDESPARTIES[j];
			}
		    }
		}
	    }
	    /****************************************************************/
	    if (nombredannotation > 1 ) {
		    var item;
		    if (annotationencours != annotationencoursOUT) {
			item = DictionnaireNumDesItemsOut[trameForme[index][annotationencoursIndexOUT]];
		    }
		    else {
			item = DictionnaireNumDesItems[trameForme[index][annotationencoursIndex]];
		    }

		if (nombredannotation > 3) {
		    table +='<tr><td width="2%">'+nbContexte+'</td><td>'+TMPPARTIENAME+'</td><td style="text-align:right;" width="45%">'+contexteG+'</td><td style="text-align:center;" width="8%"><a style="text-decoration:none" href="#" onmouseover="Tip(\'<p>Position : '+index
			+'<br/>(1):'+ dicNum2forme[trameForme[index][0]] + '<br/>(2):' + dicNum2lemme[trameForme[index][1]] + '<br/>(3):' + dicNum2categorie[trameForme[index][2]];
		    for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
			var kk=tmpAnnot+1;
			table +="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[index][tmpAnnot]];
		    }
		    table +="</p>')\" onmouseout=\"UnTip()\" rel=\""+item+"\">"+item+"</a></td><td style=\"text-align:left;\" width=\"45%\">"+contexteD+"</td></tr>";
		}
		else {
		    table +='<tr><td width="2%">'+nbContexte+'</td><td>'+TMPPARTIENAME+'</td><td style="text-align:right;" width="45%">'+contexteG+'</td><td style="text-align:center;" width="8%"><a style="text-decoration:none" href="#" onmouseover="Tip(\'<p>(1):'+ dicNum2forme[trameForme[index][0]] + '<br/>(2):' + dicNum2lemme[trameForme[index][1]] + '<br/>(3):' + dicNum2categorie[trameForme[index][2]] +'</p>\')" onmouseout="UnTip()" rel="'+item+'">'+item+'</a></td><td style="text-align:left;" width="45%">'+contexteD+'</td></tr>';
		}
	    }
	    else {
		table +='<tr><td width="2%">'+nbContexte+'</td><td>'+TMPPARTIENAME+'</td><td style="text-align:right;" width="45%">'+contexteG+'</td><td style="text-align:center;" width="8%">'+item+'</td><td style="text-align:left;" width="45%">'+contexteD+'</td></tr>';
	    }
	}
    }
    table +='</table>';
     $("#placeholder").html(table);
    $(document).ready(function() {
	$('#CONCORDANCE').DataTable ( {
	    //order: [[ 1, "desc" ]],
	    lengthMenu: [[10, 25, 50,100, -1], [10, 25, 50,100, "All"]],
	    searchHighlight: true,
	    "destroy": true,
	    columns: [
		{title: "N°"},
		{title: "Partie"},
		{title: "Contexte Gauche"},
		{title: "Pôle"},
		{title: "Contexte Droit"}
	    ]
	})
    });
}
//-----------------------------------------------------------------------------------
function concordance() {
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    refreshItrameur();

    var lgcontexte=document.getElementById('lgcontexteID').value;
    /*if (annotationencours>3) {
      var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Action disponible uniquement pour les annotations 1, 2 et 3...</span></small>';
      document.getElementById('placeholder').innerHTML = '';
      document.getElementById('placeholder').innerHTML += vide;
      return;
      }*/
    var DictionnaireDesItems = new Object();
    var DictionnaireNumDesItems = new Object();
    var DictionnaireDesItemsOut = new Object();
    var DictionnaireNumDesItemsOut = new Object();
    if (nombredannotation > 1 ) {
		if (annotationencours==1) {
			DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
			DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
			if (annotationencours != annotationencoursOUT) {
				if (annotationencoursOUT==2) {
					DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireLemme);
					DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2lemme);
				}
				if (annotationencoursOUT==3) {
					DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireCategorie);
					DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2categorie);
				}
				if (annotationencoursOUT>3) {
					DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
					DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
				}
			}
		}
		if (annotationencours==2) {
			DictionnaireDesItems = jQuery.extend({}, DictionnaireLemme);
			DictionnaireNumDesItems=jQuery.extend({}, dicNum2lemme);
			if (annotationencours != annotationencoursOUT) {
				if (annotationencoursOUT==1) {
					DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireSource);
					DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2forme);
				}
				if (annotationencoursOUT==3) {
					DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireCategorie);
					DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2categorie);
				}
				if (annotationencoursOUT>3) {
					DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
					DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
				}
			}
		}
		if (annotationencours==3) {
			DictionnaireDesItems = jQuery.extend({}, DictionnaireCategorie);
			DictionnaireNumDesItems=jQuery.extend({}, dicNum2categorie);
			if (annotationencours != annotationencoursOUT) {
				if (annotationencoursOUT==1) {
					DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireSource);
					DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2forme);
				}
				if (annotationencoursOUT==2) {
					DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireLemme);
					DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2lemme);
				}
				if (annotationencoursOUT>3) {
					DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
					DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
				}
			}
		}
		if (annotationencours>3) {
			DictionnaireDesItems = jQuery.extend({}, DictionnaireAnnotation);
			DictionnaireNumDesItems=jQuery.extend({}, dicNum2annotation);
			if (annotationencours != annotationencoursOUT) {
				if (annotationencoursOUT==1) {
					DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireSource);
					DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2forme);
				}
				if (annotationencoursOUT==2) {
					DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireLemme);
					DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2lemme);
				}
				if (annotationencoursOUT==3) {
					DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireCategorie);
					DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2categorie);
				}
				if (annotationencoursOUT>3) {
					DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
					DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
				}
			}
		}
    }
    else {
		DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
		DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
    }
    var annotationencoursIndex=annotationencours-1;
    var annotationencoursIndexOUT=annotationencoursOUT-1;
	
    var queryText=document.getElementById('poleID').value;
    if (queryText == ''){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez un pôle pour pouvoir lancer le calcul...</span></small>';
	$("#placeholder").html(vide);
        return;
    }
    // on cherche si plusieurs pôles ont été fournis 
    var reg0=new RegExp(" +$", "g"); 
    queryText=queryText.replace(reg0,"");
    var reg1=new RegExp("^ +", "g"); 
    queryText=queryText.replace(reg1,"");
    var reg2=new RegExp(" +", "g"); 
    queryText=queryText.replace(reg2," ");
    var listQueryTextInput = queryText.split(" ");
    var nombreMotif=0;
    var listQueryTextOutput=[];
    for (var j=0;j<listQueryTextInput.length;j++) {
	if (annotationencours <=3 ) {
	    if (listQueryTextInput[j] in DictionnaireDesItems)  {
		nombreMotif++;
		listQueryTextOutput.push(listQueryTextInput[j]);
	    }
	}
	else {
			var tmpannot = annotationencours+"//"+listQueryTextInput[j];
	    if (tmpannot in DictionnaireDesItems)  {
		nombreMotif++;
		listQueryTextOutput.push(listQueryTextInput[j]);
	    }
	    
	}
    }
    if (nombreMotif == 0) {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Le pôle choisi n\'est pas dans le dictionnaire...</span></small>';
	$("#placeholder").html(vide);
        return;	
    }
    var complementtitre="";
    if ((document.getElementById('numAnnotRelationID').value != "") && (document.getElementById('relationID').value != "REL") && (document.getElementById('relationID').value != "")) {
	
	complementtitre+="(+ les <span style=\"background-color:yellow\">"+document.getElementById('relationID').value+"</span> de "+queryText+')';
    }
    var table='';
    table += '<table id="CONCORDANCE" class="display" width="100%">';
    /*--------------------------*/
    var PARTITION =document.getElementById('IDPartie').value;
    var LISTESDESPARTIES=new Object(); 
    var DicoDesPositionsDesPartiesPourSections=new Object(); 
    var positionMaxG=0;
    var positionMaxD=0;
    if (PARTITION != '') {
	LISTESDESPARTIES=Object.keys(cadre[PARTITION]);
	for (var j=0;j<LISTESDESPARTIES.length;j++) {
	    var listepositions = cadre[PARTITION][LISTESDESPARTIES[j]];
	    for (var k=0;k<(listepositions.length);k=k+2) {
		var deb = listepositions[k];
		var tmpk=k+1;
		var fin = listepositions[tmpk];
		DicoDesPositionsDesPartiesPourSections[deb]=PARTITION+"="+LISTESDESPARTIES[j]+"//"+deb+"//"+fin;
		/*DicoDesPositionsDesPartiesPourSections[fin]="ENDPARTIE";*/
	    }
	}
	//var firstIndexTrame=Object.keys(trameForme)[0];
	//var j=Number(firstIndexTrame);
	//for (var k=1;k<firstIndexTrame;k++) {
	//    if (k in DicoDesPositionsDesPartiesPourSections) {
	//	table+= '<tr><td></td><td><span style="font-size:11px;color:red;font-weight: bold;font-variant: small-caps;">'+DicoDesPositionsDesPartiesPourSections[k]+'</span></td><td></td><td></td></tr>';
	//    }
	//}
    }
    else {
	positionMaxG=0;
	positionMaxD=positionsurlatrame;
    }
    /*--------------------------*/
    var nbContexte=0;
    var partieEnCours="";
    for (var index in trameForme) {
	if (index in DicoDesPositionsDesPartiesPourSections) {
	    if (DicoDesPositionsDesPartiesPourSections[index] != "ENDPARTIE") {
		var DDDD=DicoDesPositionsDesPartiesPourSections[index].split("//");
		var labelPartie=DDDD[0];
		positionMaxG=Number(DDDD[1]);
		positionMaxD=Number(DDDD[2]);
		//	table+= '<tr><td></td><td><span style="font-size:11px;color:red;font-weight: bold;font-variant: small-caps;">'+labelPartie+'</span></td><td></td><td></td></tr>';
	    }
	}
	var item = DictionnaireNumDesItems[trameForme[index][annotationencoursIndex]];
	if (!(dicNum2forme[trameForme[index][0]] in dictionnairedesdelims))  {
	    var VERIFitem="BAD";
	    for (var z=0;z<listQueryTextOutput.length;z++) {
		if (item == listQueryTextOutput[z]) {
		    VERIFitem="OK";
		}
	    }	
	    
	    if (VERIFitem=="OK") {
		var contexteG="";
		var contexteD="";
		var nbItemGauche=0;
		var nbItemDroite=0;
		/* a droite */
		var posIndex=Number(index)+1;
		while (nbItemDroite <= lgcontexte) {
		    if ((posIndex in trameForme) && (posIndex <= positionMaxD)) {
				
			var item2;
			if (annotationencours != annotationencoursOUT) {
				item2 = DictionnaireNumDesItemsOut[trameForme[posIndex][annotationencoursIndexOUT]];
			}
			else {
				item2 = DictionnaireNumDesItems[trameForme[posIndex][annotationencoursIndex]];
			}
			
			if (!(dicNum2forme[trameForme[posIndex][0]] in dictionnairedesdelims))  {
			    nbItemDroite++;
			    if (nombredannotation > 1) {
				if (nombredannotation > 3) {
				    contexteD+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+posIndex+"<br/>(1):"+ dicNum2forme[trameForme[posIndex][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[posIndex][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[posIndex][2]];
				    for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
					var kk=tmpAnnot+1;
					contexteD+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[posIndex][tmpAnnot]];
				    }
				    if ((document.getElementById('numAnnotRelationID').value == "") | (document.getElementById('relationID').value == "")) {
					contexteD+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
				    }
				    else {
					var rel = document.getElementById('relationID').value;
					var ident = document.getElementById('numAnnotRelationID').value;
					ident=Number(ident);
					var listerel2=dicNum2annotation[trameForme[posIndex][ident-1]];
					var ListeDependanceAtThisPos=listerel2.split(",");
					var test = "bad";
					for (var nbDepAtThisPos=0;nbDepAtThisPos<ListeDependanceAtThisPos.length;nbDepAtThisPos++) {
					    var rel2=ListeDependanceAtThisPos[nbDepAtThisPos];
					    rel2=rel2.replaceAll("(","//");
					    rel2=rel2.replaceAll(")","");
					    var Lrel=rel2.split("//");
					    if (((rel == Lrel[0]) || (rel == "ANY"))  && ( Lrel[1] == index )) {
						test = "ok";
					    }
					}
					if (test == "ok") {
					    contexteD+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\"><span style=\"background-color:yellow\">"+item2+"</span></a>";
					}
					else {
					    contexteD+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
					}
				    }
				}
				else {
				    contexteD+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+posIndex+"<br/>(1):"+ dicNum2forme[trameForme[posIndex][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[posIndex][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[posIndex][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
				}
			    }
			    else {
				contexteD+=item2;
			    }
			}
			else {
			    //contexteD+=item2;
			    contexteD+=item2;
			}
			posIndex++;
		    }
		    else {
			nbItemDroite=lgcontexte+1;
		    }
		}
		/* a gauche */
		posIndex=Number(index)-1;
		while (nbItemGauche <= lgcontexte) {
		    if ((posIndex in trameForme) && (posIndex > positionMaxG)) {
			var item2;
			if (annotationencours != annotationencoursOUT) {
				item2 = DictionnaireNumDesItemsOut[trameForme[posIndex][annotationencoursIndexOUT]];
			}
			else {
				item2 = DictionnaireNumDesItems[trameForme[posIndex][annotationencoursIndex]];
			}
			if (!(dicNum2forme[trameForme[posIndex][0]] in dictionnairedesdelims))  {
			    nbItemGauche++;
			    if (nombredannotation > 1) {
				if (nombredannotation > 3) {
				    var tmpContext="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+posIndex+"<br/>(1):"+ dicNum2forme[trameForme[posIndex][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[posIndex][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[posIndex][2]];
				    for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
					var kk=tmpAnnot+1;
					tmpContext+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[posIndex][tmpAnnot]];
				    }
				    if ((document.getElementById('numAnnotRelationID').value == "") | (document.getElementById('relationID').value == "")) {
					tmpContext+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
					contexteG=tmpContext+contexteG;
				    }
				    else {
					var rel = document.getElementById('relationID').value;
					var ident = document.getElementById('numAnnotRelationID').value;
					ident=Number(ident);
					var listerel2=dicNum2annotation[trameForme[posIndex][ident-1]];
					var ListeDependanceAtThisPos=listerel2.split(",");
					var test = "bad";
					for (var nbDepAtThisPos=0;nbDepAtThisPos<ListeDependanceAtThisPos.length;nbDepAtThisPos++) {
					    var rel2=ListeDependanceAtThisPos[nbDepAtThisPos];
					    rel2=rel2.replaceAll("(","//");
					    rel2=rel2.replaceAll(")","");
					    var Lrel=rel2.split("//");
					    if (((rel == Lrel[0]) || (rel == "ANY"))  && ( Lrel[1] == index )) {
						test = "ok";
					    }
					}
					if (test == "ok") {
					    tmpContext+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\"><span style=\"background-color:yellow\">"+item2+"</span></a>";
					    contexteG=tmpContext+contexteG;
					}
					else {
					    tmpContext+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
					    contexteG=tmpContext+contexteG;
					}
				    }
				    
				}
				else {
				    contexteG="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+posIndex+"<br/>(1):"+ dicNum2forme[trameForme[posIndex][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[posIndex][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[posIndex][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>"+contexteG;
				}
			    }
			    else {
				contexteG=item2+contexteG;
			    }
			}
			else {
			    contexteG=item2+contexteG;
			}
			posIndex--;
		    }
		    else {
			nbItemGauche=lgcontexte+1;
		    }
		}
		nbContexte++;
		/* MODIF 2018 ****************************************************/
		var TMPPARTIENAME="";
		if (PARTITION != '') {
		    LISTESDESPARTIES=Object.keys(cadre[PARTITION]);
		    for (var j=0;j<LISTESDESPARTIES.length;j++) {
			var listepositions = cadre[PARTITION][LISTESDESPARTIES[j]];
			for (var k=0;k<(listepositions.length);k=k+2) {
			    var deb = Number(listepositions[k]);
			    var tmpk=k+1;
			    var fin = Number(listepositions[tmpk]);
			    var tmpIndex=Number(index);
			    if ((tmpIndex<=fin) && (tmpIndex>=deb)) {
				TMPPARTIENAME=LISTESDESPARTIES[j];
			    }
			}
		    }
		}
		/****************************************************************/
		if (nombredannotation > 1 ) {
			
			var item;
			if (annotationencours != annotationencoursOUT) {
				item = DictionnaireNumDesItemsOut[trameForme[index][annotationencoursIndexOUT]];
			}
			else {
				item = DictionnaireNumDesItems[trameForme[index][annotationencoursIndex]];
			}

		    if (nombredannotation > 3) {
			table +='<tr><td width="2%">'+nbContexte+'</td><td>'+TMPPARTIENAME+'</td><td style="text-align:right;" width="45%">'+contexteG+'</td><td style="text-align:center;" width="8%"><a style="text-decoration:none" href="#" onmouseover="Tip(\'<p>Position : '+index
			    +'<br/>(1):'+ dicNum2forme[trameForme[index][0]] + '<br/>(2):' + dicNum2lemme[trameForme[index][1]] + '<br/>(3):' + dicNum2categorie[trameForme[index][2]];
			for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
			    var kk=tmpAnnot+1;
			    table +="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[index][tmpAnnot]];
			}
			table +="</p>')\" onmouseout=\"UnTip()\" rel=\""+item+"\">"+item+"</a></td><td style=\"text-align:left;\" width=\"45%\">"+contexteD+"</td></tr>";
		    }
		    else {
			table +='<tr><td width="2%">'+nbContexte+'</td><td>'+TMPPARTIENAME+'</td><td style="text-align:right;" width="45%">'+contexteG+'</td><td style="text-align:center;" width="8%"><a style="text-decoration:none" href="#" onmouseover="Tip(\'<p>(1):'+ dicNum2forme[trameForme[index][0]] + '<br/>(2):' + dicNum2lemme[trameForme[index][1]] + '<br/>(3):' + dicNum2categorie[trameForme[index][2]] +'</p>\')" onmouseout="UnTip()" rel="'+item+'">'+item+'</a></td><td style="text-align:left;" width="45%">'+contexteD+'</td></tr>';
		    }
		}
		else {
		    table +='<tr><td width="2%">'+nbContexte+'</td><td>'+TMPPARTIENAME+'</td><td style="text-align:right;" width="45%">'+contexteG+'</td><td style="text-align:center;" width="8%">'+item+'</td><td style="text-align:left;" width="45%">'+contexteD+'</td></tr>';
		}
	    }
	}
    }
    table +='</table>';
    $("#placeholder").html(table);
    $(document).ready(function() {
	$('#CONCORDANCE').DataTable ( {
	    //order: [[ 1, "desc" ]],
	    lengthMenu: [[10, 25, 50,100, -1], [10, 25, 50,100, "All"]],
	    searchHighlight: true,
	    "destroy": true,
	    columns: [
		{title: "N°"},
		{title: "Partie"},
		{title: "Contexte Gauche"},
		{title: "Pôle"},
		{title: "Contexte Droit"}
	    ]
	})
    });

}

//-----------------------------------------------------------------------------------
/* COOCS FONCTIONS */
/*---------------------------------------------------------------------------*/
function calculCoocNgramSelectedPartie() {
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }

    refreshItrameur();

    //alert(annotationencours);
    var DictionnaireDesItems = new Object();
    var DictionnaireNumDesItems = new Object();
    if (annotationencours==1) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
    }
    if (annotationencours==2) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireLemme);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2lemme);
    }
    if (annotationencours==3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireCategorie);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2categorie);
    }
    if (annotationencours>3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireAnnotation);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2annotation);
    }
    var annotationencoursIndex=annotationencours-1;
    var queryText=document.getElementById('poleID').value;
    if (queryText == ''){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez un pôle pour pouvoir lancer le calcul...</span></small>';
	 $("#placeholder").html(vide);
        return;
    }
    if (annotationencours<=3) {
	if (!(queryText in DictionnaireDesItems) ) {
	    var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Le pôle choisi n\'est pas dans le dictionnaire...</span></small>';
	    $("#placeholder").html(vide);
	    return;	
	}
    }
    else {
	var tmpannot=annotationencours+"//"+queryText;
	if (!(tmpannot in DictionnaireDesItems) ) {
	    var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Le pôle choisi n\'est pas dans le dictionnaire...</span></small>';
	    $("#placeholder").html(vide);
	    return;	
	}		
    }
    var PARTITION =document.getElementById('IDPartie').value;
    if (PARTITION == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Aucune partition n\'est disponible...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }		
    var PARTIE =document.getElementById('IDParties').value;
    if (PARTIE =="") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Aucune partie n\'est disponible sur cette partition...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }		
    var seuil=document.getElementById('seuilID').value;
    if (seuil == ''){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur numérique pour le seuil...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    var indspmin=document.getElementById('IndSPminID').value;
    if (indspmin == ''){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur numérique pour le indspmin...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    var cofreq=document.getElementById('coFqID').value;
    if (cofreq == ''){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur numérique pour la cofreq...</span></small>';
	$("#placeholder").html(vide);
        return;
    }
    var nbGramGauche=document.getElementById('coocNgramGID').value;
    var nbGramDroite=document.getElementById('coocNgramDID').value;
    GrapheArborL=document.getElementById('grLID').value;
    GrapheArborH=document.getElementById('grHID').value;	
    reinit_canvas();
    var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:#FDBBD2">Calcul en cours</span></small>';
    $("#placeholder").html(vide);
    var COFREQ = new Object(); 
    var resultsMatch=0;
    var CONTEXTES='';
    var nbContexte=0;
    LISTESCONTEXTESCOOC= new Object(); 
    var DICOPARPARTIE = new Object(); 
    var DICOGLOBALPARPARTIE = new Object(); 
    var FQpartie=0;
    /*--------------------------------------------*/
    /*Il faut chercher la partie et ses positions */
    var listepositions = cadre[PARTITION][PARTIE];
    var trameCoocContexte=new Object(); 
    var FQTOTALpartie=0;
    for (var k=0;k<(listepositions.length);k=k+2) {
	var deb = Number(listepositions[k]);
	var tmpk=k+1;
	var fin = Number(listepositions[tmpk]);
	for (var index=deb;index<=fin;index++) {
	    /*--------------------------------------------*/
	    /* parcours de la Trame et calcul des fqs de la partie */
	    if (!(dicNum2forme[trameForme[index][0]] in dictionnairedesdelims)) {
		FQTOTALpartie++;
		var item=DictionnaireNumDesItems[trameForme[index][annotationencoursIndex]];
		if (DICOGLOBALPARPARTIE[item] === undefined) {
		    DICOGLOBALPARPARTIE[item] = 1;
		}
		else {
		    DICOGLOBALPARPARTIE[item] = DICOGLOBALPARPARTIE[item]  + 1;
		}
		if (item == queryText) {
		    nbContexte++;
		    var contexte="";
		    var j=Number(index);
		    var tmpg=j;
		    var tmpd=j;
		    for (var i=1;i<=nbGramGauche;i++) {
			if ((j-i) > 0) {
			    tmpg=j-i;
			    var itemcooc=DictionnaireNumDesItems[trameForme[j-i][annotationencoursIndex]];
			    if ((itemcooc != " ") && (itemcooc != "")) {
				FQpartie=FQpartie+1;
			    }
			    /*----------------------*/
			    /*filtrage stop liste  */
			    var inputStopListe = document.getElementById ("stoplistecoocngramID");
			    var isCheckedStopListe = inputStopListe.checked;
			    var filtrestopliste=0;
			    if (isCheckedStopListe) {
				if (gestionnaireSelection[j-i]==1) {
				    filtrestopliste =1
				}
			    }
			    /*----------------------*/
			    if (filtrestopliste==0) {
				trameCoocContexte[j-i]=1;
				if (!(dicNum2forme[trameForme[j-i][0]] in dictionnairedesdelims))  {
				    contexte = itemcooc + contexte;
				    if (COFREQ[queryText] === undefined) {
					COFREQ[queryText]=new Object();
					COFREQ[queryText][itemcooc]=1;
				    }
				    else {
					if (!COFREQ[queryText].hasOwnProperty(itemcooc)) {
					    COFREQ[queryText][itemcooc]=1;
					}
					else {
					    COFREQ[queryText][itemcooc]=COFREQ[queryText][itemcooc]+1;
					}
				    }
				    if ((itemcooc != " ") && (itemcooc != "")) {
					if (DICOPARPARTIE[itemcooc] === undefined) {
					    DICOPARPARTIE[itemcooc] = 1;
					}
					else {
					    DICOPARPARTIE[itemcooc] = DICOPARPARTIE[itemcooc]  + 1;
					}
				    }
				}
				else {
				    contexte = dicNum2forme[trameForme[j-i][0]] + contexte;
				}
			    }
			}
		    }
		    contexte = contexte + item;
		    for (var i=1;i<=nbGramDroite;i++) {
			if ((j+i) < positionsurlatrame) {
			    tmpd=j+i;
			    var itemcooc=DictionnaireNumDesItems[trameForme[j+i][annotationencoursIndex]];
			    if ((itemcooc != " ") && (itemcooc != "")) {
				FQpartie=FQpartie+1;
			    }
			    /*----------------------*/
			    /*filtrage stop liste  */
			    var inputStopListe = document.getElementById ("stoplistecoocngramID");
			    var isCheckedStopListe = inputStopListe.checked;
			    var filtrestopliste=0;
			    if (isCheckedStopListe) {
				if (gestionnaireSelection[j+i]==1) {
				    filtrestopliste =1
				}
			    }
			    /*----------------------*/
			    if (filtrestopliste==0) {
				trameCoocContexte[j+i]=1;
				if (!(dicNum2forme[trameForme[j+i][0]] in dictionnairedesdelims))  {
				    contexte = contexte + itemcooc ;
				    if (COFREQ[queryText] === undefined) {
					COFREQ[queryText]=new Object();
					COFREQ[queryText][itemcooc]=1;
				    }
				    else {
					if (!COFREQ[queryText].hasOwnProperty(itemcooc)) {
					    COFREQ[queryText][itemcooc]=1;
					}
					else {
					    COFREQ[queryText][itemcooc]=COFREQ[queryText][itemcooc]+1;
					}
				    }
				    if ((itemcooc != " ") && (itemcooc != "")) {
					if (DICOPARPARTIE[itemcooc] === undefined) {
					    DICOPARPARTIE[itemcooc] = 1;
					}
					else {
					    DICOPARPARTIE[itemcooc] = DICOPARPARTIE[itemcooc]  + 1;
					}
				    }
				}
				else {
				    contexte = contexte + dicNum2forme[trameForme[j+i][0]] ;
				}
			    }
			}
		    }
		    LISTESCONTEXTESCOOC[nbContexte]=tmpg+":"+tmpd;
		}
	    }
	}
    }
    /*calcul cooc */
    DICOTFG = new Object();	
    var NBcooc=0;
    /*-------- calcul specif-----------------------------------------------*/
    for (var mot in DICOGLOBALPARPARTIE) {
	if (mot != queryText) {
	    if ((COFREQ[queryText][mot] >= cofreq)) {
		var Tsource = FQTOTALpartie;
		var tsource = FQpartie ;
		//alert(Tsource+"|"+tsource+"|"+DictionnaireDesItems[mot]+"|"+DICOPARPARTIE[mot]);
		var result;
		if (annotationencours>3) {
		    //var tmpannot=annotationencours+"//"+mot;
		    result = CalcCoeffSpec(Tsource,tsource,DICOGLOBALPARPARTIE[mot],DICOPARPARTIE[mot],seuil); 
		}
		else {
		    result = CalcCoeffSpec(Tsource,tsource,DICOGLOBALPARPARTIE[mot],DICOPARPARTIE[mot],seuil); 
		}
		result=precise_round(result,0);
		if (result==Infinity) {result=9e15}
		if (result==-Infinity) {result=-9e15}
		if ((result >= indspmin)) {
		    if (annotationencours>3) {
			//var tmpannot=annotationencours+"//"+mot;
			var TMP = [DICOGLOBALPARPARTIE[mot],COFREQ[queryText][mot] ,result];
			DICOTFG[mot]=TMP;
			NBcooc+=1;
		    }
		    else {
			var TMP = [DICOGLOBALPARPARTIE[mot],COFREQ[queryText][mot] ,result];
			DICOTFG[mot]=TMP;
			NBcooc+=1;
		    }
		}
	    }
	}
    }
    /*Affichage resultats */
    var LISTEMOTSTFG= Object.keys(DICOTFG).sort(function(a,b){
	var x = DICOTFG[a][2];
	var y = DICOTFG[b][2];
	return x < y ? 1 : x > y ? -1 : 0;
    });
    var LISTCOOC = [];
    var LISTVALUECOOC = [];
    for (var key in LISTEMOTSTFG) {
        LISTCOOC.push(LISTEMOTSTFG[key]);
	LISTVALUECOOC.push(DICOTFG[LISTEMOTSTFG[key]]);
    }
    var table='<p align="center"><b>Cooccurrents sur la partie &lt;'+PARTITION+':'+PARTIE+'&gt;</b><br/><span style=\"font-size:0.7em\">(clic sur mot : contextes)</span></p>';
    table += '<table align="center" class="myTable">';
    table += '<tr>';
    table +='    <th width="40%">Cooc</th>';
    table +='    <th width="20%">FqCooc</th>';
    table +='    <th width="20%">CoFreq</th>';
    table +='    <th width="20%">IndSP</th>';
    table += '</tr>';
    for (var i=0; i<LISTCOOC.length;i++)   {
	var tmp=DICOTFG[LISTCOOC[i]].toString();
	var values = tmp.split(',');
	var result=values[2];
	var colornode="#fee7cd";
	if (result >= 50) {colornode="#ff0000"; result="**" } 
	if ((result >= 30) && (result < 50  ) ) {colornode="#ff5555" } 
	if ((result >= 20) && (result < 30  ) ) {colornode="#ff8484" } 
	if ((result >= 10) && (result < 20  ) ) {colornode="#f3838b" } 
	if ((result >= 5) && (result < 10  ) ) {colornode="#ffb0b0" } 
	if ((result >= 0) && (result < 5  ) ) {colornode="#fee7cd" } 
//	if (values[2] >= 50) { result = Infinity};
        table +='<tr><td><span style="background-color:'+ colornode +'"><a href="javascript:onclickWord(\''+LISTCOOC[i]+'\')">'+LISTCOOC[i]+'</a></span></td><td>'+values[0]+'</td><td>'+values[1]+'</td><td><b><font color="red">'+result+'</font></b></td></tr>';
    }
    table +='</table>';
    table += '<p align="center"><span style=\"font-size:0.7em\">(clic sur mot : contextes)</span></p>';
    table += '<p>&nbsp;</p>';
    table += '<p>&nbsp;</p>';
    if (NBcooc > 0 ) {
	document.getElementById('placeholder2').style.height = "400px";
	$("#placeholder2").html(table);
    }
    /*-----------------------GRAPHE-----------------------------------------------------------------------*/
    if (NBcooc > 0 ) {	
	document.getElementById('legendGraphe').innerHTML = "";
	var legend ='<small><b>Couleur Noeud-Cooc</b> : <span style="background-color:#fee7cd;color:black">IndicSp</span>&lt;<b>10</b>&lt;<span style="background-color:#ffb0b0;color:black">IndicSp</span>&lt;<b>20</b>&lt;<span style="background-color:#ff8484;color:black">IndicSp</span>&lt;<b>30</b>&lt;<span style="background-color:#ff5555;color:black">IndicSp</span>&lt;<b>50</b>&lt;<span style="background-color:#ff0000;color:black">IndicSp</span><br/><b>Arc Label</b> : <b>POLE</b><font color="#99CC99">&#x2212;</font>IndiceSpécif(Co-Freq)<font color="#99CC99">&#8594;</font><b>COOC</b></small><br/><span style="background:yellow"><img onclick="clear_canvas();" src="./images/trash.png" title="suppression graphique" alt="suppression graphique"/></span>';
	document.getElementById('legendGraphe').innerHTML = legend;
	/*----*/
	sysArbor =  new arbor.ParticleSystem(20, 600, 0.8, false, 50, 0.015, 0.6);
	//var sys = new arbor.ParticleSystem(30, 800,1,true);
	/*sys.parameters({ stiffness: 800,
			 repulsion: 200,
			 gravity: true,
			 dt:0.015,
			 friction: 0.8});*/
	var pole = sysArbor.addNode('POLE',{'color':'red','shape':'dot','label':queryText});
	LISTEDESNOEUDSINCANVAS.push(pole);
	var nodeMot;
	var cpmot=1;
	for (var mot in DICOTFG) {
	    var nodename=mot;
	    cpmot++;			
	    var tmp=DICOTFG[mot].toString();
	    var values = tmp.split(',');
	    var result=values[2];
	    /* parametrage des noeuds */
	    var colornode="#fee7cd";
	    if (result >= 50) {colornode="#ff0000" } 
	    if ((result >= 30) && (result < 50  ) ) {colornode="#ff5555" } 
	    if ((result >= 20) && (result < 30  ) ) {colornode="#ff8484" } 
	    if ((result >= 10) && (result < 20  ) ) {colornode="#f3838b" } 
	    if ((result >= 5) && (result < 10  ) ) {colornode="#ffb0b0" } 
	    if ((result >= 0) && (result < 5  ) ) {colornode="#fee7cd" } 
	    nodeMot =sysArbor.addNode(nodename,{'color':colornode,'shape':'rectangle','label':mot});
		LISTEDESNOEUDSINCANVAS.push(nodeMot);		
	    /* parametrage de l'edge */
//	    if (values[2] >= 50) { result = Infinity};
	    if (result >= 50) {result="**" } ;
	    var label = result + ' ('+ values[1] +') ';
	    sysArbor.addEdge(pole, nodeMot,{'weight':5,'color':'#99CC99','directed':1,'length':.75, 'pointSize':10,data:{name:label}});
	}
	sysArbor.renderer = Renderer("#grapheHolder");
	/*sys.graft(theUI) ;*/
    }
    else {
	var canvas = document.getElementById('grapheHolder');
	var ctx = canvas.getContext('2d');
	GrapheArborL=800;
	GrapheArborH=100;	
	reinit_canvas();
	ctx.font="40px Georgia";
	ctx.fillText("Pas de cooccurrents, pas de graphe !! ",40,50);
	ctx.font="20px Georgia";
	ctx.fillText("Modifiez les paramètres de calcul ",60,90);
    }
    /*---------------------GRAPHE-------------------------------------------------------------------------*/
    document.getElementById('placeholder').innerHTML = '';	

}

/*---------------------------------------------------------------------------------------------------------------------------------------*/
function ReseauCalculCoocNgramSelectedPartie() {
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }

    refreshItrameur();

    //alert(annotationencours);
    var DictionnaireDesItems = new Object();
    var DictionnaireNumDesItems = new Object();
    if (annotationencours==1) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
    }
    if (annotationencours==2) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireLemme);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2lemme);
    }
    if (annotationencours==3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireCategorie);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2categorie);
    }
    if (annotationencours>3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireAnnotation);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2annotation);
    }
    var annotationencoursIndex=annotationencours-1;
    var FQMAX=document.getElementById('fqMaxID').value;
    if (FQMAX == ''){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur numérique pour la FQ MAX...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    var PARTITION =document.getElementById('IDPartie').value;
    if (PARTITION == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Aucune partition n\'est disponible...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }		
    var PARTIE =document.getElementById('IDParties').value;
    if (PARTIE =="") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Aucune partie n\'est disponible sur cette partition...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }		
    var seuil=document.getElementById('seuilID').value;
    if (seuil == ''){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur numérique pour le seuil...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    var indspmin=document.getElementById('IndSPminID').value;
    if (indspmin == ''){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur numérique pour le indspmin...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    var cofreq=document.getElementById('coFqID').value;
    if (cofreq == ''){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur numérique pour la cofreq...</span></small>';
	$("#placeholder").html(vide);
        return;
    }
    var nbGramGauche=document.getElementById('coocNgramGID').value;
    var nbGramDroite=document.getElementById('coocNgramDID').value;
    GrapheArborL=document.getElementById('grLID').value;
    GrapheArborH=document.getElementById('grHID').value;	
    reinit_canvas();
    var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:#FDBBD2">Calcul en cours</span></small>';
    $("#placeholder").html(vide);
    var COFREQ = new Object(); 
    var resultsMatch=0;
    var nbContexte=0;
    var DICOPARPARTIE = new Object(); 
    var DICOGLOBALPARPARTIE = new Object(); 
    var FQpartie= new Object(); 
    /*--------------------------------------------*/
    /*Il faut chercher la partie et ses positions */
    var listepositions = cadre[PARTITION][PARTIE];
    var trameCoocContexte=new Object(); 
    var FQTOTALpartie=0;
    for (var k=0;k<(listepositions.length);k=k+2) {
	var deb = Number(listepositions[k]);
	var tmpk=k+1;
	var fin = Number(listepositions[tmpk]);
	for (var index=deb;index<=fin;index++) {
	    if (!(dicNum2forme[trameForme[index][0]] in dictionnairedesdelims)) {
		var item=DictionnaireNumDesItems[trameForme[index][annotationencoursIndex]];
		FQTOTALpartie++;
		if (DICOGLOBALPARPARTIE[item] === undefined) {
		    DICOGLOBALPARPARTIE[item] = 1;
		}
		else {
		    DICOGLOBALPARPARTIE[item] = DICOGLOBALPARPARTIE[item]  + 1;
		}
	    }
	}
    }
    for (var k=0;k<(listepositions.length);k=k+2) {
	var deb = Number(listepositions[k]);
	var tmpk=k+1;
	var fin = Number(listepositions[tmpk]);
	for (var index=deb;index<=fin;index++) {
	    if (!(dicNum2forme[trameForme[index][0]] in dictionnairedesdelims)) {
		var item=DictionnaireNumDesItems[trameForme[index][annotationencoursIndex]];
		var filtrefq=item;
		//if (annotationencours>3) {
		  //  filtrefq=annotationencours+"//"+item;
		//}
		//console.log(filtrefq);
		/*----------------------*/
		/*filtrage stop liste  */
		var inputStopListe = document.getElementById ("stoplistecoocngramID");
		var isCheckedStopListe = inputStopListe.checked;
		var filtrestopliste=0;
		if (isCheckedStopListe) {
		    if (gestionnaireSelection[index]==1) {
			filtrestopliste =1
		    }
		}
		/*----------------------*/
		if ((DICOGLOBALPARPARTIE[filtrefq] >= FQMAX) && (filtrestopliste==0)) {
		    nbContexte++;
		    var contexte="";
		    var j=Number(index);
		    var tmpg=j;
		    var tmpd=j;
		    for (var i=1;i<=nbGramGauche;i++) {
			if ((j-i) > 0) {
			    tmpg=j-i;
			    var item1=DictionnaireNumDesItems[trameForme[j-i][annotationencoursIndex]];
			    /*----------------------*/
			    /*filtrage stop liste  */
			    var inputStopListe = document.getElementById ("stoplistecoocngramID");
			    var isCheckedStopListe = inputStopListe.checked;
			    var filtrestopliste=0;
			    if (isCheckedStopListe) {
				if (gestionnaireSelection[j-i]==1) {
				    filtrestopliste =1
				}
			    }
			    /*----------------------*/
			    if ((item != item1) && (filtrestopliste==0)) {
				trameCoocContexte[j-i]=1;
				if (!(dicNum2forme[trameForme[j-i][0]] in dictionnairedesdelims))  {
				    contexte = item + contexte;
				    if (COFREQ[item] === undefined) {
					COFREQ[item]=new Object();
					COFREQ[item][item1]=1;
				    }
				    else {
					if (!COFREQ[item].hasOwnProperty(item1)) {
					    COFREQ[item][item1]=1;
					}
					else {
					    COFREQ[item][item1]=COFREQ[item][item1]+1;
					}
				    }
				    if ((item != " ") && (item != "")) {
					if (FQpartie[item] === undefined) {
					    FQpartie[item]=1;
					}
					else {
					    FQpartie[item]=FQpartie[item]+1;
					}
					if (DICOPARPARTIE[item] === undefined) {
					    DICOPARPARTIE[item]=new Object();
					    DICOPARPARTIE[item][item1]=1;
					}
					else {
					    if (!DICOPARPARTIE[item].hasOwnProperty(item1)) {
						DICOPARPARTIE[item][item1]=1;
					    }
					    else {
						DICOPARPARTIE[item][item1]=DICOPARPARTIE[item][item1]+1;
					    }
					}						
				    }
				}
				else {
				    contexte = dicNum2forme[trameForme[j-i][0]] + contexte;
				}
			    }
			}
		    }
		    contexte = contexte + item;
		    for (var i=1;i<=nbGramDroite;i++) {
			if ((j+i) < positionsurlatrame) {
			    tmpd=j+i;
			    var item1=DictionnaireNumDesItems[trameForme[j+i][annotationencoursIndex]];
			    /*----------------------*/
			    /*filtrage stop liste  */
			    var inputStopListe = document.getElementById ("stoplistecoocngramID");
			    var isCheckedStopListe = inputStopListe.checked;
			    var filtrestopliste=0;
			    if (isCheckedStopListe) {
				if (gestionnaireSelection[j+i]==1) {
				    filtrestopliste =1
				}
			    }
			    /*----------------------*/
			    if ((item != item1) && (filtrestopliste==0)) {
				trameCoocContexte[j+i]=1;
				if (!(dicNum2forme[trameForme[j+i][0]] in dictionnairedesdelims))  {
				    contexte = contexte + item1 ;
				    if (COFREQ[item] === undefined) {
					COFREQ[item]=new Object();
					COFREQ[item][item1]=1;
				    }
				    else {
					if (!COFREQ[item].hasOwnProperty(item1)) {
					    COFREQ[item][item1]=1;
					}
					else {
					    COFREQ[item][item1]=COFREQ[item][item1]+1;
					}
				    }
				    if ((item != " ") && (item != "")) {
					if (FQpartie[item] === undefined) {
					    FQpartie[item]=1;
					}
					else {
					    FQpartie[item]=FQpartie[item]+1;
					}								
					if (DICOPARPARTIE[item] === undefined) {
					    DICOPARPARTIE[item]=new Object();
					    DICOPARPARTIE[item][item1]=1;
					}
					else {
					    if (!DICOPARPARTIE[item].hasOwnProperty(item1)) {
						DICOPARPARTIE[item][item1]=1;
					    }
					    else {
						DICOPARPARTIE[item][item1]=DICOPARPARTIE[item][item1]+1;
					    }
					}						
				    }
				}
				else {
				    contexte = contexte + dicNum2forme[trameForme[j+i][0]] ;
				}
			    }
			}
		    }
		}
	    }
	}
    }
    /*---------- CALCUL SPECIF -----------*/
    DICOTFG = new Object();	
    var NBcooc=0;
    for (var mot in DICOPARPARTIE) {
	for (var mot2 in DICOPARPARTIE[mot]) {
	    if ((COFREQ[mot][mot2] >= cofreq)) {
		var Tsource = FQTOTALpartie ;/*TAILLE DE LA PARTIE ;*/
		var tsource = FQpartie[mot] ;
		//alert(Tsource+"|"+tsource+"|"+DictionnaireDesItems[mot]+"|"+DICOPARPARTIE[mot]);
		var result;
		//if (annotationencours>3) {
		    //var tmpannot=annotationencours+"//"+mot2;
		    /* dictionnaire des items doit etre remplace par dictionnaireglobaldelapartie*/
		    //result = CalcCoeffSpec(Tsource,tsource,DICOGLOBALPARPARTIE[tmpannot],DICOPARPARTIE[mot][mot2],seuil); 
		//}
		//else {
		    /* dictionnaire des items doit etre remplace par dictionnaireglobaldelapartie*/
		    result = CalcCoeffSpec(Tsource,tsource,DICOGLOBALPARPARTIE[mot2],DICOPARPARTIE[mot][mot2],seuil); 
		//}
		result=precise_round(result,0);
		if (result==Infinity) {result=9e15}
		if (result==-Infinity) {result=-9e15}
		
		if ((result >= indspmin)) {
		    //if (annotationencours>3) {
			//var tmpannot=annotationencours+"//"+mot2;
			/* dictionnaire des items doit etre remplace par dictionnaireglobaldelapartie*/
			//var TMP = [DICOGLOBALPARPARTIE[tmpannot],COFREQ[mot][mot2] ,result];
			//var cle = mot+","+mot2;
			//DICOTFG[cle]=TMP;
			//NBcooc+=1;
		    //}
		    //else {
			/* dictionnaire des items doit etre remplace par dictionnaireglobaldelapartie*/
			var TMP = [DICOGLOBALPARPARTIE[mot2],COFREQ[mot][mot2] ,result];
			var cle = mot+","+mot2;
			DICOTFG[cle]=TMP;
			NBcooc+=1;
		    //}
		}
	    }
	}
    }
    /*-----------------------GRAPHE-----------------------------------------------------------------------*/
    if (NBcooc > 0 ) {	
	document.getElementById('legendGraphe').innerHTML = "";
	/*var legend ='<small><b>Couleur Noeud-Cooc</b> : <span style="background-color:#fee7cd;color:black">IndicSp</span>&lt;<b>5</b>&lt;<span style="background-color:#ffb0b0;color:black">IndicSp</span>&lt;<b>10</b>&lt;<span style="background-color:#ff3838b;color:black">IndicSp</span>&lt;<b>20</b>&lt;<span style="background-color:#ff8484;color:black">IndicSp</span>&lt;<b>30</b>&lt;<span style="background-color:#ff5555;color:black">IndicSp</span>&lt;<b>50</b>&lt;<span style="background-color:#ff0000;color:black">IndicSp</span><br/><b>Arc Label</b> : <b>POLE</b><font color="#99CC99">&#x2212;</font>IndiceSpécif(Co-Freq)<font color="#99CC99">&#8594;</font><b>COOC</b></small><br/><span style="background:yellow"><img onclick="clear_canvas();" src="./images/trash.png" title="suppression graphique" alt="suppression graphique"/></span>';
	  document.getElementById('legendGraphe').innerHTML = legend;*/
	var legend ='<small><b>Arc Label</b> : <b>POLE</b><font color="#99CC99">&#x2212;</font>IndiceSpécif(Co-Freq)<font color="#99CC99">&#8594;</font><b>COOC</b></small><br/><span style="background:yellow"><img onclick="clear_canvas();" src="./images/trash.png" title="suppression graphique" alt="suppression graphique"/></span>';
	document.getElementById('legendGraphe').innerHTML = legend;
	/*----*/
	sysArbor =  new arbor.ParticleSystem(20, 600, 0.8, false, 50, 0.015, 0.6);
	
	var nodeMot;
	var nodePole;
	var cpmot=1;
	for (var cle in DICOTFG) {
	    var POLECOOC = cle.split(','); 
	    var nodename=POLECOOC[1];
	    var nodepolename=POLECOOC[0];
	    
	    cpmot++;			
	    
	    var tmp=DICOTFG[cle].toString();
	    var values = tmp.split(',');
	    var result=values[2];
	    
	    var colornode="#fee7cd";
	    
	    /* parametrage du pole  */
	    if (sysArbor.getNode(nodepolename) == undefined) {
		nodePole=sysArbor.addNode(nodepolename,{'color':colornode,'shape':'rectangle','label':nodepolename});
	    }
	    else {
		nodePole=sysArbor.getNode(nodepolename);
	    }
	    /* parametrage des noeuds */
	    if (sysArbor.getNode(nodename) == undefined) {
		nodeMot =sysArbor.addNode(nodename,{'color':colornode,'shape':'rectangle','label':nodename});
	    }
	    else {
		nodeMot=sysArbor.getNode(nodename);
	    }		
	    
	    LISTEDESNOEUDSINCANVAS.push(nodePole);				
	    LISTEDESNOEUDSINCANVAS.push(nodeMot);		
	    /* parametrage de l'edge */
	    //	    if (values[2] >= 50) { result = Infinity};
	    if (result >= 50) {result="**" } ;
	    var label = result + ' ('+ values[1] +') ';
	    sysArbor.addEdge(nodePole, nodeMot,{'weight':5,'color':'#99CC99','directed':1,'length':.75, 'pointSize':10,data:{name:label}});
	}
	sysArbor.renderer = Renderer("#grapheHolder");
	/*sys.graft(theUI) ;*/
    }
    else {
	var canvas = document.getElementById('grapheHolder');
	var ctx = canvas.getContext('2d');
	GrapheArborL=800;
	GrapheArborH=100;	
	reinit_canvas();
	ctx.font="40px Georgia";
	ctx.fillText("Pas de cooccurrents, pas de graphe !! ",40,50);
	ctx.font="20px Georgia";
	ctx.fillText("Modifiez les paramètres de calcul ",60,90);
    }
    /*---------------------GRAPHE-------------------------------------------------------------------------*/
    document.getElementById('placeholder').innerHTML = '';	
}
/*---------------------------------------------------------------------------------------------------------------------------------------*/
function ReseauCalculCoocNgram() {
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }

    refreshItrameur();

    //alert(annotationencours);
    var DictionnaireDesItems = new Object();
    var DictionnaireNumDesItems = new Object();
    if (annotationencours==1) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
    }
    if (annotationencours==2) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireLemme);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2lemme);
    }
    if (annotationencours==3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireCategorie);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2categorie);
    }
    if (annotationencours>3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireAnnotation);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2annotation);
    }
    var FQMAX=document.getElementById('fqMaxID').value;
    if (FQMAX == ''){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur numérique pour la FQ MAX...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    var annotationencoursIndex=annotationencours-1;
    var seuil=document.getElementById('seuilID').value;
    if (seuil == ''){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur numérique pour le seuil...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    var indspmin=document.getElementById('IndSPminID').value;
    if (indspmin == ''){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur numérique pour le indspmin...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    var cofreq=document.getElementById('coFqID').value;
    if (cofreq == ''){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur numérique pour la cofreq...</span></small>';
	$("#placeholder").html(vide);
        return;
    }
    var nbGramGauche=document.getElementById('coocNgramGID').value;
    var nbGramDroite=document.getElementById('coocNgramDID').value;
    GrapheArborL=document.getElementById('grLID').value;
    GrapheArborH=document.getElementById('grHID').value;	
    reinit_canvas();
    var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:#FDBBD2">Calcul en cours</span></small>';
    $("#placeholder").html(vide);	

    var COFREQ = new Object(); 
    var resultsMatch=0;
    var CONTEXTES='';
    var nbContexte=0;
    var DICOPARPARTIE = new Object(); 
    var FQpartie = new Object(); 
    /* parcours de la Trame et calcul des fqs de la partie */
    var trameCoocContexte=new Object(); 
    for (var index in trameForme) {
	if (!(dicNum2forme[trameForme[index][0]] in dictionnairedesdelims)) {
	    var item=DictionnaireNumDesItems[trameForme[index][annotationencoursIndex]];
	    var filtrefq=item;
	    if (annotationencours>3) {
		filtrefq=annotationencours+"//"+item;
	    }
	    /*----------------------*/
	    /*filtrage stop liste  */
	    var inputStopListe = document.getElementById ("stoplistecoocngramID");
	    var isCheckedStopListe = inputStopListe.checked;
	    var filtrestopliste=0;
	    if (isCheckedStopListe) {
		if (gestionnaireSelection[index]==1) {
		    filtrestopliste =1
		}
	    }
	    /*----------------------*/
	    if ((DictionnaireDesItems[filtrefq] >= FQMAX) && (filtrestopliste==0)) {
		nbContexte++;
		var contexte="";
		var j=Number(index);
		var tmpg=j;
		var tmpd=j;
		for (var i=1;i<=nbGramGauche;i++) {
		    if ((j-i) > 0) {
			tmpg=j-i;
			var item1=DictionnaireNumDesItems[trameForme[j-i][annotationencoursIndex]];
			/*----------------------*/
			/*filtrage stop liste  */
			var inputStopListe = document.getElementById ("stoplistecoocngramID");
			var isCheckedStopListe = inputStopListe.checked;
			var filtrestopliste=0;
			if (isCheckedStopListe) {
			    if (gestionnaireSelection[j-i]==1) {
				filtrestopliste =1
			    }
			}
			/*----------------------*/
			if ((item != item1) && (filtrestopliste==0)) {
			    trameCoocContexte[j-i]=1;
			    if (!(dicNum2forme[trameForme[j-i][0]] in dictionnairedesdelims))  {
				contexte = item + contexte;
				if (COFREQ[item] === undefined) {
				    COFREQ[item]=new Object();
				    COFREQ[item][item1]=1;
				}
				else {
				    if (!COFREQ[item].hasOwnProperty(item1)) {
					COFREQ[item][item1]=1;
				    }
				    else {
					COFREQ[item][item1]=COFREQ[item][item1]+1;
				    }
				}
				if ((item != " ") && (item != "")) {
				    if (FQpartie[item] === undefined) {
					FQpartie[item]=1;
				    }
				    else {
					FQpartie[item]=FQpartie[item]+1;
				    }
				    if (DICOPARPARTIE[item] === undefined) {
					DICOPARPARTIE[item]=new Object();
					DICOPARPARTIE[item][item1]=1;
				    }
				    else {
					if (!DICOPARPARTIE[item].hasOwnProperty(item1)) {
					    DICOPARPARTIE[item][item1]=1;
					}
					else {
					    DICOPARPARTIE[item][item1]=DICOPARPARTIE[item][item1]+1;
					}
				    }						
				}
			    }
			    else {
				contexte = dicNum2forme[trameForme[j-i][0]] + contexte;
			    }
			}
		    }
		}
		contexte = contexte + item;
		for (var i=1;i<=nbGramDroite;i++) {
		    if ((j+i) < positionsurlatrame) {
			tmpd=j+i;
			var item1=DictionnaireNumDesItems[trameForme[j+i][annotationencoursIndex]];
			/*----------------------*/
			/*filtrage stop liste  */
			var inputStopListe = document.getElementById ("stoplistecoocngramID");
			var isCheckedStopListe = inputStopListe.checked;
			var filtrestopliste=0;
			if (isCheckedStopListe) {
			    if (gestionnaireSelection[j+i]==1) {
				filtrestopliste =1
			    }
			}
			/*----------------------*/
			if ((item != item1) && (filtrestopliste==0)) {
			    trameCoocContexte[j+i]=1;
			    if (!(dicNum2forme[trameForme[j+i][0]] in dictionnairedesdelims))  {
				contexte = contexte + item1 ;
				if (COFREQ[item] === undefined) {
				    COFREQ[item]=new Object();
				    COFREQ[item][item1]=1;
				}
				else {
				    if (!COFREQ[item].hasOwnProperty(item1)) {
					COFREQ[item][item1]=1;
				    }
				    else {
					COFREQ[item][item1]=COFREQ[item][item1]+1;
				    }
				}
				if ((item != " ") && (item != "")) {
				    if (FQpartie[item] === undefined) {
					FQpartie[item]=1;
				    }
				    else {
					FQpartie[item]=FQpartie[item]+1;
				    }								
				    if (DICOPARPARTIE[item] === undefined) {
					DICOPARPARTIE[item]=new Object();
					DICOPARPARTIE[item][item1]=1;
				    }
				    else {
					if (!DICOPARPARTIE[item].hasOwnProperty(item1)) {
					    DICOPARPARTIE[item][item1]=1;
					}
					else {
					    DICOPARPARTIE[item][item1]=DICOPARPARTIE[item][item1]+1;
					}
				    }						
				}
			    }
			    else {
				contexte = contexte + dicNum2forme[trameForme[j+i][0]] ;
			    }
			}
		    }
		}
	    }
	}
    }
    /* ATTENTION ON PREND TOUS LES ITEMS de FQ > FQMAX **/
    /*calcul cooc */
    DICOTFG = new Object();	
    var NBcooc=0;
    /*-------- calcul specif-----------------------------------------------*/
    for (var mot in DICOPARPARTIE) {
	for (var mot2 in DICOPARPARTIE[mot]) {
	    if ((COFREQ[mot][mot2] >= cofreq)) {
		var Tsource = NBMOTTOTALSource;
		var tsource = FQpartie[mot] ;
		//alert(Tsource+"|"+tsource+"|"+DictionnaireDesItems[mot]+"|"+DICOPARPARTIE[mot]);
		var result;
		if (annotationencours>3) {
		    var tmpannot=annotationencours+"//"+mot2;
		    result = CalcCoeffSpec(Tsource,tsource,DictionnaireDesItems[tmpannot],DICOPARPARTIE[mot][mot2],seuil); 
		}
		else {
		    result = CalcCoeffSpec(Tsource,tsource,DictionnaireDesItems[mot2],DICOPARPARTIE[mot][mot2],seuil); 
		}
		result=precise_round(result,0);
		if (result==Infinity) {result=9e15}
		if (result==-Infinity) {result=-9e15}
		
		if ((result >= indspmin)) {
		    if (annotationencours>3) {
			var tmpannot=annotationencours+"//"+mot2;
			var TMP = [DictionnaireDesItems[tmpannot],COFREQ[mot][mot2] ,result];
			var cle = mot+","+mot2;
			DICOTFG[cle]=TMP;
			NBcooc+=1;
		    }
		    else {
			var TMP = [DictionnaireDesItems[mot2],COFREQ[mot][mot2] ,result];
			var cle = mot+","+mot2;
			DICOTFG[cle]=TMP;
			NBcooc+=1;
		    }
		}
	    }
	}
    }
    /*-----------------------GRAPHE-----------------------------------------------------------------------*/
    if (NBcooc > 0 ) {	
	document.getElementById('legendGraphe').innerHTML = "";
	/*var legend ='<small><b>Couleur Noeud-Cooc</b> : <span style="background-color:#fee7cd;color:black">IndicSp</span>&lt;<b>5</b>&lt;<span style="background-color:#ffb0b0;color:black">IndicSp</span>&lt;<b>10</b>&lt;<span style="background-color:#ff3838b;color:black">IndicSp</span>&lt;<b>20</b>&lt;<span style="background-color:#ff8484;color:black">IndicSp</span>&lt;<b>30</b>&lt;<span style="background-color:#ff5555;color:black">IndicSp</span>&lt;<b>50</b>&lt;<span style="background-color:#ff0000;color:black">IndicSp</span><br/><b>Arc Label</b> : <b>POLE</b><font color="#99CC99">&#x2212;</font>IndiceSpécif(Co-Freq)<font color="#99CC99">&#8594;</font><b>COOC</b></small><br/><span style="background:yellow"><img onclick="clear_canvas();" src="./images/trash.png" title="suppression graphique" alt="suppression graphique"/></span>';
	  document.getElementById('legendGraphe').innerHTML = legend;*/
	var legend ='<small><b>Arc Label</b> : <b>POLE</b><font color="#99CC99">&#x2212;</font>IndiceSpécif(Co-Freq)<font color="#99CC99">&#8594;</font><b>COOC</b></small><br/><span style="background:yellow"><img onclick="clear_canvas();" src="./images/trash.png" title="suppression graphique" alt="suppression graphique"/></span>';
	document.getElementById('legendGraphe').innerHTML = legend;
	/*----*/
	sysArbor =  new arbor.ParticleSystem(20, 600, 0.8, false, 50, 0.015, 0.6);
	
	var nodeMot;
	var nodePole;
	var cpmot=1;
	for (var cle in DICOTFG) {
	    var POLECOOC = cle.split(','); 
	    var nodename=POLECOOC[1];
	    var nodepolename=POLECOOC[0];
	    
	    cpmot++;			
	    
	    var tmp=DICOTFG[cle].toString();
	    var values = tmp.split(',');
	    var result=values[2];
	    
	    var colornode="#fee7cd";
	    
	    /* parametrage du pole  */
	    if (sysArbor.getNode(nodepolename) == undefined) {
		nodePole=sysArbor.addNode(nodepolename,{'color':colornode,'shape':'rectangle','label':nodepolename});
	    }
	    else {
		nodePole=sysArbor.getNode(nodepolename);
	    }
	    /* parametrage des noeuds */
	    if (sysArbor.getNode(nodename) == undefined) {
		nodeMot =sysArbor.addNode(nodename,{'color':colornode,'shape':'rectangle','label':nodename});
	    }
	    else {
		nodeMot=sysArbor.getNode(nodename);
	    }		
	    
	    LISTEDESNOEUDSINCANVAS.push(nodePole);				
	    LISTEDESNOEUDSINCANVAS.push(nodeMot);		
	    /* parametrage de l'edge */
	    //	    if (values[2] >= 50) { result = Infinity};
	    if (result >= 50) {result="**" } ;
	    var label = result + ' ('+ values[1] +') ';
	    sysArbor.addEdge(nodePole, nodeMot,{'weight':5,'color':'#99CC99','directed':1,'length':.75, 'pointSize':10,data:{name:label}});
	}
	sysArbor.renderer = Renderer("#grapheHolder");
	/*sys.graft(theUI) ;*/
    }
    else {
	var canvas = document.getElementById('grapheHolder');
	var ctx = canvas.getContext('2d');
	GrapheArborL=800;
	GrapheArborH=100;	
	reinit_canvas();
	ctx.font="40px Georgia";
	ctx.fillText("Pas de cooccurrents, pas de graphe !! ",40,50);
	ctx.font="20px Georgia";
	ctx.fillText("Modifiez les paramètres de calcul ",60,90);
    }
    /*---------------------GRAPHE-------------------------------------------------------------------------*/
    document.getElementById('placeholder').innerHTML = '';	
	
}
/*---------------------------------------------------------------------------------------------------------------------------------------*/
function calculCoocNgram() {
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }

    refreshItrameur();

    //alert(annotationencours);

    var DictionnaireDesItems = new Object();
    var DictionnaireNumDesItems = new Object();
    if (annotationencours==1) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
    }
    if (annotationencours==2) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireLemme);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2lemme);
    }
    if (annotationencours==3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireCategorie);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2categorie);
    }
    if (annotationencours>3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireAnnotation);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2annotation);
    }
    var annotationencoursIndex=annotationencours-1;
    var queryText=document.getElementById('poleID').value;
    if (queryText == ''){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez un pôle pour pouvoir lancer le calcul...</span></small>';
	$("#placeholder").html(vide);
        return;
    }
    if (annotationencours<=3) {
	if (!(queryText in DictionnaireDesItems) ) {
	    var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Le pôle choisi n\'est pas dans le dictionnaire...</span></small>';
	    $("#placeholder").html(vide);
	    return;	
	}
    }
    else {
	var tmpannot=annotationencours+"//"+queryText;
	if (!(tmpannot in DictionnaireDesItems) ) {
	    var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Le pôle choisi n\'est pas dans le dictionnaire...</span></small>';
	    $("#placeholder").html(vide);
	    return;	
	}		
    }
    var seuil=document.getElementById('seuilID').value;
    if (seuil == ''){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur numérique pour le seuil...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    var indspmin=document.getElementById('IndSPminID').value;
    if (indspmin == ''){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur numérique pour le indspmin...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    var cofreq=document.getElementById('coFqID').value;
    if (cofreq == ''){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur numérique pour la cofreq...</span></small>';
	$("#placeholder").html(vide);
        return;
    }
    var nbGramGauche=document.getElementById('coocNgramGID').value;
    var nbGramDroite=document.getElementById('coocNgramDID').value;
    GrapheArborL=document.getElementById('grLID').value;
    GrapheArborH=document.getElementById('grHID').value;	
    reinit_canvas();
    var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:#FDBBD2">Calcul en cours</span></small>';
    $("#placeholder").html(vide);
    var COFREQ = new Object(); 
    var resultsMatch=0;
    var CONTEXTES='';
    var nbContexte=0;
    LISTESCONTEXTESCOOC= new Object(); 
    var DICOPARPARTIE = new Object(); 
    var FQpartie=0;
    /* parcours de la Trame et calcul des fqs de la partie */
    var trameCoocContexte=new Object(); 
    for (var index in trameForme) {
	if (!(dicNum2forme[trameForme[index][0]] in dictionnairedesdelims)) {
	    var item=DictionnaireNumDesItems[trameForme[index][annotationencoursIndex]];
	    if (item == queryText) {
		nbContexte++;
		var contexte="";
		var j=Number(index);
		var tmpg=j;
		var tmpd=j;		
		for (var i=1;i<=nbGramGauche;i++) {
		    if ((j-i) > 0) {
			tmpg=j-i;
			var itemcooc=DictionnaireNumDesItems[trameForme[j-i][annotationencoursIndex]];
			if ((itemcooc != " ") && (itemcooc != "")) {
			    FQpartie=FQpartie+1;
			}
			/*----------------------*/
			/*filtrage stop liste  */
			var inputStopListe = document.getElementById ("stoplistecoocngramID");
			var isCheckedStopListe = inputStopListe.checked;
			var filtrestopliste=0;
			if (isCheckedStopListe) {
			    if (gestionnaireSelection[j-i]==1) {
				filtrestopliste =1
			    }
			}
			/*----------------------*/
			if (filtrestopliste==0) {
			    trameCoocContexte[j-i]=1;
			    if (!(dicNum2forme[trameForme[j-i][0]] in dictionnairedesdelims))  {
				contexte = itemcooc + contexte;
				if (COFREQ[queryText] === undefined) {
				    COFREQ[queryText]=new Object();
				    COFREQ[queryText][itemcooc]=1;
				}
				else {
				    if (!COFREQ[queryText].hasOwnProperty(itemcooc)) {
					COFREQ[queryText][itemcooc]=1;
				    }
				    else {
					COFREQ[queryText][itemcooc]=COFREQ[queryText][itemcooc]+1;
				    }
				}
				if ((itemcooc != " ") && (itemcooc != "")) {
				    if (DICOPARPARTIE[itemcooc] === undefined) {
					DICOPARPARTIE[itemcooc] = 1;
				    }
				    else {
					DICOPARPARTIE[itemcooc] = DICOPARPARTIE[itemcooc]  + 1;
				    }
				}
			    }
			    else {
				contexte = dicNum2forme[trameForme[j-i][0]] + contexte;
			    }
			}
		    }
		}
		contexte = contexte + item;
		for (var i=1;i<=nbGramDroite;i++) {
		    if ((j+i) < positionsurlatrame) {
			tmpd=j+i;
			var itemcooc=DictionnaireNumDesItems[trameForme[j+i][annotationencoursIndex]];
			if ((itemcooc != " ") && (itemcooc != "")) {
			    FQpartie=FQpartie+1;
			}
			/*----------------------*/
			/*filtrage stop liste  */
			var inputStopListe = document.getElementById ("stoplistecoocngramID");
			var isCheckedStopListe = inputStopListe.checked;
			var filtrestopliste=0;
			if (isCheckedStopListe) {
			    if (gestionnaireSelection[j+i]==1) {
				filtrestopliste =1
			    }
			}
			/*----------------------*/
			if (filtrestopliste==0) {
			    trameCoocContexte[j+i]=1;
			    if (!(dicNum2forme[trameForme[j+i][0]] in dictionnairedesdelims))  {
				contexte = contexte + itemcooc ;
				if (COFREQ[queryText] === undefined) {
				    COFREQ[queryText]=new Object();
				    COFREQ[queryText][itemcooc]=1;
				}
				else {
				    if (!COFREQ[queryText].hasOwnProperty(itemcooc)) {
					COFREQ[queryText][itemcooc]=1;
				    }
				    else {
					COFREQ[queryText][itemcooc]=COFREQ[queryText][itemcooc]+1;
				    }
				}
				if ((itemcooc != " ") && (itemcooc != "")) {
				    if (DICOPARPARTIE[itemcooc] === undefined) {
					DICOPARPARTIE[itemcooc] = 1;
				    }
				    else {
					DICOPARPARTIE[itemcooc] = DICOPARPARTIE[itemcooc]  + 1;
				    }
				}
			    }
			    else {
				contexte = contexte + dicNum2forme[trameForme[j+i][0]] ;
			    }
			}
		    }
		}
		LISTESCONTEXTESCOOC[nbContexte]=tmpg+":"+tmpd;
	    }
	}
    }
    /*calcul cooc */
    DICOTFG = new Object();	
    var NBcooc=0;
    /*-------- calcul specif-----------------------------------------------*/
    for (var mot in DICOPARPARTIE) {
	if (mot != queryText) {
	    if ((COFREQ[queryText][mot] >= cofreq)) {
		var Tsource = NBMOTTOTALSource;
		var tsource = FQpartie ;
		//alert(Tsource+"|"+tsource+"|"+DictionnaireDesItems[mot]+"|"+DICOPARPARTIE[mot]);
		var result;
		if (annotationencours>3) {
		    var tmpannot=annotationencours+"//"+mot;
		    result = CalcCoeffSpec(Tsource,tsource,DictionnaireDesItems[tmpannot],DICOPARPARTIE[mot],seuil); 
		}
		else {
		    result = CalcCoeffSpec(Tsource,tsource,DictionnaireDesItems[mot],DICOPARPARTIE[mot],seuil); 
		}
		result=precise_round(result,0);
		if (result==Infinity) {result=9e15}
		if (result==-Infinity) {result=-9e15}

		if ((result >= indspmin)) {
		    if (annotationencours>3) {
			var tmpannot=annotationencours+"//"+mot;
			var TMP = [DictionnaireDesItems[tmpannot],COFREQ[queryText][mot] ,result];
			DICOTFG[mot]=TMP;
			NBcooc+=1;
		    }
		    else {
			var TMP = [DictionnaireDesItems[mot],COFREQ[queryText][mot] ,result];
			DICOTFG[mot]=TMP;
			NBcooc+=1;
		    }
		}
	    }
	}
    }
    /*Affichage resultats */
    var LISTEMOTSTFG= Object.keys(DICOTFG).sort(function(a,b){
	var x = DICOTFG[a][2];
	var y = DICOTFG[b][2];
	return x < y ? 1 : x > y ? -1 : 0;
    });
    var LISTCOOC = [];
    var LISTVALUECOOC = [];
    for (var key in LISTEMOTSTFG) {
        LISTCOOC.push(LISTEMOTSTFG[key]);
	LISTVALUECOOC.push(DICOTFG[LISTEMOTSTFG[key]]);
    }
    var table='<p align="center"><span style=\"font-size:0.7em\">(clic sur mot : contextes)</span></p>';
    table += '<table align="center" class="myTable">';
    table += '<tr>';
    table +='    <th width="40%">Cooc</th>';
    table +='    <th width="20%">FqCooc</th>';
    table +='    <th width="20%">CoFreq</th>';
    table +='    <th width="20%">IndSP</th>';
    table += '</tr>';
    for (var i=0; i<LISTCOOC.length;i++)   {
	var tmp=DICOTFG[LISTCOOC[i]].toString();
	var values = tmp.split(',');
	var result=values[2];
	var colornode="#fee7cd";
	if (result >= 50) {colornode="#ff0000";result="**" } 
	if ((result >= 30) && (result < 50  ) ) {colornode="#ff5555" } 
	if ((result >= 20) && (result < 30  ) ) {colornode="#ff8484" } 
	if ((result >= 10) && (result < 20  ) ) {colornode="#f3838b" } 
	if ((result >= 5) && (result < 10  ) ) {colornode="#ffb0b0" } 
	if ((result >= 0) && (result < 5  ) ) {colornode="#fee7cd" } 
//	if (values[2] >= 50) { result = Infinity};
        table +='<tr><td><span style="background-color:'+ colornode +'"><a href="javascript:onclickWord(\''+LISTCOOC[i]+'\')">'+LISTCOOC[i]+'</a></span></td><td>'+values[0]+'</td><td>'+values[1]+'</td><td><b><font color="red">'+result+'</font></b></td></tr>';
    }
    table +='</table>';
    table += '<p align="center"><span style=\"font-size:0.7em\">(clic sur mot : contextes)</span></p>';
    table += '<p>&nbsp;</p>';
    table += '<p>&nbsp;</p>';
    if (NBcooc > 0 ) {
	document.getElementById('placeholder2').style.height = "400px";
	$("#placeholder2").html(table);
    }
    /*-----------------------GRAPHE-----------------------------------------------------------------------*/
    if (NBcooc > 0 ) {	
	document.getElementById('legendGraphe').innerHTML = "";
	var legend ='<small><b>Couleur Noeud-Cooc</b> : <span style="background-color:#fee7cd;color:black">IndicSp</span>&lt;<b>5</b>&lt;<span style="background-color:#ffb0b0;color:black">IndicSp</span>&lt;<b>10</b>&lt;<span style="background-color:#ff3838b;color:black">IndicSp</span>&lt;<b>20</b>&lt;<span style="background-color:#ff8484;color:black">IndicSp</span>&lt;<b>30</b>&lt;<span style="background-color:#ff5555;color:black">IndicSp</span>&lt;<b>50</b>&lt;<span style="background-color:#ff0000;color:black">IndicSp</span><br/><b>Arc Label</b> : <b>POLE</b><font color="#99CC99">&#x2212;</font>IndiceSpécif(Co-Freq)<font color="#99CC99">&#8594;</font><b>COOC</b></small><br/><span style="background:yellow"><img onclick="clear_canvas();" src="./images/trash.png" title="suppression graphique" alt="suppression graphique"/></span>';
	document.getElementById('legendGraphe').innerHTML = legend;
	/*----*/
	sysArbor =  new arbor.ParticleSystem(20, 600, 0.8, false, 50, 0.015, 0.6);
	//var sys = new arbor.ParticleSystem(30, 800,1,true);
	/*sys.parameters({ stiffness: 800,
			 repulsion: 200,
			 gravity: true,
			 dt:0.015,
			 friction: 0.8});*/
	var pole = sysArbor.addNode('POLE',{'color':'red','shape':'dot','label':queryText});
	LISTEDESNOEUDSINCANVAS.push(pole);
	var nodeMot;
	var cpmot=1;
	for (var mot in DICOTFG) {
	    var nodename=mot;
	    cpmot++;			
	    var tmp=DICOTFG[mot].toString();
	    var values = tmp.split(',');
	    var result=values[2];
	    /* parametrage des noeuds */
	    var colornode="#fee7cd";
	    if (result >= 50) {colornode="#ff0000" } 
	    if ((result >= 30) && (result < 50  ) ) {colornode="#ff5555" } 
	    if ((result >= 20) && (result < 30  ) ) {colornode="#ff8484" } 
	    if ((result >= 10) && (result < 20  ) ) {colornode="#f3838b" } 
	    if ((result >= 5) && (result < 10  ) ) {colornode="#ffb0b0" } 
	    if ((result >= 0) && (result < 5  ) ) {colornode="#fee7cd" } 
	    nodeMot =sysArbor.addNode(nodename,{'color':colornode,'shape':'rectangle','label':mot});
		LISTEDESNOEUDSINCANVAS.push(nodeMot);		
	    /* parametrage de l'edge */
//	    if (values[2] >= 50) { result = Infinity};
	    if (result >= 50) {result="**" } ;
	    var label = result + ' ('+ values[1] +') ';
	    sysArbor.addEdge(pole, nodeMot,{'weight':5,'color':'#99CC99','directed':1,'length':.75, 'pointSize':10,data:{name:label}});
	}
	sysArbor.renderer = Renderer("#grapheHolder");
	/*sys.graft(theUI) ;*/
    }
    else {
	var canvas = document.getElementById('grapheHolder');
	var ctx = canvas.getContext('2d');
	GrapheArborL=800;
	GrapheArborH=100;	
	reinit_canvas();
	ctx.font="40px Georgia";
	ctx.fillText("Pas de cooccurrents, pas de graphe !! ",40,50);
	ctx.font="20px Georgia";
	ctx.fillText("Modifiez les paramètres de calcul ",60,90);
    }
    /*---------------------GRAPHE-------------------------------------------------------------------------*/
    document.getElementById('placeholder').innerHTML = '';	
}
//-----------------------------------------------------------------------------------
/* SECTIONS FONCTIONS */
/*---------------------------------------------------------------------------*/
// cooccurrents
function loadcooc() {	
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }

    refreshItrameur();

    //alert(annotationencours);
    var DictionnaireDesItems = new Object();
    var DictionnaireNumDesItems = new Object();
    if (annotationencours==1) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
    }
    if (annotationencours==2) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireLemme);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2lemme);
    }
    if (annotationencours==3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireCategorie);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2categorie);
    }
    if (annotationencours>3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireAnnotation);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2annotation);
    }
    var annotationencoursIndex=annotationencours-1;
    var queryText=document.getElementById('poleID').value;
    if (queryText == ''){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez un pôle pour pouvoir lancer le calcul...</span></small>';
	$("#placeholder").html(vide);
        return;
    }
    if (annotationencours<=3) {
	if (!(queryText in DictionnaireDesItems) ) {
	    var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Le pôle choisi n\'est pas dans le dictionnaire...</span></small>';
	    $("#placeholder").html(vide);
	    return;	
	}
    }
    else {
	var tmpannot=annotationencours+"//"+queryText;
	if (!(tmpannot in DictionnaireDesItems) ) {
	    var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Le pôle choisi n\'est pas dans le dictionnaire...</span></small>';
	    $("#placeholder").html(vide);
	    return;	
	}		
    }
    var seuil=document.getElementById('seuilID').value;
    if (seuil == ''){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur numérique pour le seuil...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    var indspmin=document.getElementById('IndSPminID').value;
    if (indspmin == ''){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur numérique pour le indspmin...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    var cofreq=document.getElementById('coFqID').value;
    if (cofreq == ''){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur numérique pour la cofreq...</span></small>';
	$("#placeholder").html(vide);
        return;
    }
    var contexteDelim=document.getElementById('contexteID').value;
    if (contexteDelim == ''){
	contexteDelim ="\n";
    }
    GrapheArborL=document.getElementById('grLID').value;
    GrapheArborH=document.getElementById('grHID').value;	
    reinit_canvas();
    var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:#FDBBD2">Calcul en cours</span></small>';
    $("#placeholder").html(vide);
    var COFREQ = new Object(); 
    var resultsMatch=0;
    var CONTEXTES='';
    var nbContexte=0;
    LISTESCONTEXTESCOOC= new Object(); 
    var DICOPARPARTIE = new Object(); 
    var FQpartie=0;
    for (var nblines in LISTESCONTEXTES) {
	var infoSource =  LISTESCONTEXTES[nblines].split(":");
	var posDebS=Number(infoSource[0]);
	var posFinS=Number(infoSource[1]);
	var verifQueryText=0;
	for (var i=posDebS;i<=posFinS;i++) {
	    var item=DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
	    if (item == queryText) {
		verifQueryText++;
	    }
	}
	if (verifQueryText >=1) {
	    nbContexte++;
	    LISTESCONTEXTESCOOC[nblines]=LISTESCONTEXTES[nblines];
	    for (var i=posDebS;i<=posFinS;i++) {
		var item=DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
		if (!(dicNum2forme[trameForme[i][0]] in dictionnairedesdelims))  {
		    if (COFREQ[queryText] === undefined) {
			COFREQ[queryText]=new Object();
			COFREQ[queryText][item]=1;
		    }
		    else {
			if (!COFREQ[queryText].hasOwnProperty(item)) {
			    COFREQ[queryText][item]=1;
			}
			else {
			    COFREQ[queryText][item]=COFREQ[queryText][item]+1;
			}
		    }
		    if ((item != " ") && (item != "")) {
			FQpartie=FQpartie+1;
			if (DICOPARPARTIE[item] === undefined) {
			    DICOPARPARTIE[item] = 1;
			}
			else {
			    DICOPARPARTIE[item] = DICOPARPARTIE[item]  + 1;
			}
		    }
		}
	    }
	}
    }
    /*calcul cooc */
    DICOTFG = new Object();	
    var NBcooc=0;
    /*-------- calcul specif-----------------------------------------------*/
    for (var mot in DICOPARPARTIE) {
	if (mot != queryText) {
	    if ((COFREQ[queryText][mot] >= cofreq)) {
		var Tsource = NBMOTTOTALSource;
		var tsource = FQpartie ;
		//alert(Tsource+"|"+tsource+"|"+DictionnaireDesItems[mot]+"|"+DICOPARPARTIE[mot]);
		var result;
		if (annotationencours>3) {
		    var tmpannot=annotationencours+"//"+mot;
		    result = CalcCoeffSpec(Tsource,tsource,DictionnaireDesItems[tmpannot],DICOPARPARTIE[mot],seuil); 
		}
		else {
		    result = CalcCoeffSpec(Tsource,tsource,DictionnaireDesItems[mot],DICOPARPARTIE[mot],seuil); 
		}
		result=precise_round(result,0);
                if (result==Infinity) {result=9e15}
                if (result==-Infinity) {result=-9e15}
		
		if ((result >= indspmin)) {
		    if (annotationencours>3) {
			var tmpannot=annotationencours+"//"+mot;
			var TMP = [DictionnaireDesItems[tmpannot],COFREQ[queryText][mot] ,result];
			DICOTFG[mot]=TMP;
			NBcooc+=1;
		    }
		    else {
			var TMP = [DictionnaireDesItems[mot],COFREQ[queryText][mot] ,result];
			DICOTFG[mot]=TMP;
			NBcooc+=1;
		    }
		}
	    }
	}
    }
    /*Affichage resultats */
    var LISTEMOTSTFG= Object.keys(DICOTFG).sort(function(a,b){
	var x = DICOTFG[a][2];
	var y = DICOTFG[b][2];
	return x < y ? 1 : x > y ? -1 : 0;
    });
    var LISTCOOC = [];
    var LISTVALUECOOC = [];
    for (var key in LISTEMOTSTFG) {
        LISTCOOC.push(LISTEMOTSTFG[key]);
	LISTVALUECOOC.push(DICOTFG[LISTEMOTSTFG[key]]);
    }
    var table='<p align="center"><span style=\"font-size:0.7em\">(clic sur mot : contextes)</span></small></p>';
    table += '<table align="center" class="myTable">';
    table += '<tr>';
    table +='    <th width="40%">Cooc</th>';
    table +='    <th width="20%">FqCooc</th>';
    table +='    <th width="20%">CoFreq</th>';
    table +='    <th width="20%">IndSP</th>';
    table += '</tr>';
    for (var i=0; i<LISTCOOC.length;i++)   {
	var tmp=DICOTFG[LISTCOOC[i]].toString();
	var values = tmp.split(',');
	var result=values[2];
	var colornode="#fee7cd";
	if (result >= 50) {colornode="#ff0000";result="**" } 
	if ((result >= 30) && (result < 50  ) ) {colornode="#ff5555" } 
	if ((result >= 20) && (result < 30  ) ) {colornode="#ff8484" } 
	if ((result >= 10) && (result < 20  ) ) {colornode="#f3838b" } 
	if ((result >= 5) && (result < 10  ) ) {colornode="#ffb0b0" } 
	if ((result >= 0) && (result < 5  ) ) {colornode="#fee7cd" } 
	//		if (values[2] >= 50) { result = Infinity};
        table +='<tr><td><span style="background-color:'+ colornode +'"><a href="javascript:onclickWord(\''+LISTCOOC[i]+'\')">'+LISTCOOC[i]+'</a></span></td><td>'+values[0]+'</td><td>'+values[1]+'</td><td><b><font color="red">'+result+'</font></b></td></tr>';
    }
    table +='</table>';
    table += '<p align="center"><span style=\"font-size:0.7em\">(clic sur mot : contextes)</span></small></p>';
    table += '<p>&nbsp;</p>';
    table += '<p>&nbsp;</p>';
    if (NBcooc > 0 ) {
	document.getElementById('placeholder2').style.height = "400px";
	$("#placeholder2").html(table);
    }
    /*-----------------------GRAPHE-----------------------------------------------------------------------*/
    if (NBcooc > 0 ) {	
	document.getElementById('legendGraphe').innerHTML = "";
	var legend ='<small><b>Couleur Noeud-Cooc</b> : <span style="background-color:#fee7cd;color:black">IndicSp</span>&lt;<b>5</b>&lt;<span style="background-color:#ffb0b0;color:black">IndicSp</span>&lt;<b>10</b>&lt;<span style="background-color:#ff3838b;color:black">IndicSp</span>&lt;<b>20</b>&lt;<span style="background-color:#ff8484;color:black">IndicSp</span>&lt;<b>30</b>&lt;<span style="background-color:#ff5555;color:black">IndicSp</span>&lt;<b>50</b>&lt;<span style="background-color:#ff0000;color:black">IndicSp</span><br/><b>Arc Label</b> : <b>POLE</b><font color="#99CC99">&#x2212;</font>IndiceSpécif(Co-Freq)<font color="#99CC99">&#8594;</font><b>COOC</b></small><br/><span style="background:yellow"><img onclick="clear_canvas();" src="./images/trash.png" title="suppression graphique" alt="suppression graphique"/></span>';
	document.getElementById('legendGraphe').innerHTML = legend;
	/*----*/
	sysArbor=  new arbor.ParticleSystem(20, 600, 0.8, false, 50, 0.015, 0.6);
	//var sys = new arbor.ParticleSystem(30, 800,1,true);
	/*sys.parameters({ stiffness: 800,
			 repulsion: 200,
			 gravity: true,
			 dt:0.015,
			 friction: 0.8});*/
	var pole = sysArbor.addNode('POLE',{'color':'red','shape':'dot','label':queryText});
	LISTEDESNOEUDSINCANVAS.push(pole);		

	var nodeMot;
	var cpmot=1;
	for (var mot in DICOTFG) {
	    var nodename=mot;
	    cpmot++;			
	    var tmp=DICOTFG[mot].toString();
	    var values = tmp.split(',');
	    var result=values[2];
	    /* parametrage des noeuds */
	    var colornode="#fee7cd";
	    if (result >= 50) {colornode="#ff0000" } 
	    if ((result >= 30) && (result < 50  ) ) {colornode="#ff5555" } 
	    if ((result >= 20) && (result < 30  ) ) {colornode="#ff8484" } 
	    if ((result >= 10) && (result < 20  ) ) {colornode="#f3838b" } 
	    if ((result >= 5) && (result < 10  ) ) {colornode="#ffb0b0" } 
	    if ((result >= 0) && (result < 5  ) ) {colornode="#fee7cd" } 
	    nodeMot =sysArbor.addNode(nodename,{'color':colornode,'shape':'rectangle','label':mot});
	    LISTEDESNOEUDSINCANVAS.push(nodeMot);		
	    /* parametrage de l'edge */
	    //			if (values[2] >= 50) { result = Infinity};
            if (result >= 50) {result="**" } ;
	    var label = result + ' ('+ values[1] +') ';
	    sysArbor.addEdge(pole, nodeMot,{'weight':5,'color':'#99CC99','directed':1,'length':.75, 'pointSize':10,data:{name:label}});
	}
	sysArbor.renderer = Renderer("#grapheHolder");
	/*sys.graft(theUI) ;*/
    }
    else {
	var canvas = document.getElementById('grapheHolder');
	var ctx = canvas.getContext('2d');
	GrapheArborL=800;
	GrapheArborH=100;	
	reinit_canvas();
	ctx.font="40px Georgia";
	ctx.fillText("Pas de cooccurrents, pas de graphe !! ",40,50);
	ctx.font="20px Georgia";
	ctx.fillText("Modifiez les paramètres de calcul ",60,90);
    }
    /*---------------------GRAPHE-------------------------------------------------------------------------*/
    document.getElementById('placeholder').innerHTML = '';
}
//-----------------------------------------------------------------------------------
function ventilation() {
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    refreshItrameur();

	
    var seuil=document.getElementById('seuilID').value;
    if (seuil == ''){
	    var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur numérique pour le seuil...</span></small>';
 $("#placeholder").html(vide);       return;
    }
	if (annotationencours>3) {
	    var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Action disponible uniquement pour les annotations 1, 2 et 3...</span></small>';
	    $("#placeholder").html(vide);		
	    return;
	}
	
	var DictionnaireDesItems = new Object();
	var DictionnaireNumDesItems = new Object();
	if (annotationencours==1) {
		DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
		DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
	}
	if (annotationencours==2) {
		DictionnaireDesItems = jQuery.extend({}, DictionnaireLemme);
		DictionnaireNumDesItems=jQuery.extend({}, dicNum2lemme);
	}
	if (annotationencours==3) {
		DictionnaireDesItems = jQuery.extend({}, DictionnaireCategorie);
		DictionnaireNumDesItems=jQuery.extend({}, dicNum2categorie);
	}
	var annotationencoursIndex=annotationencours-1;
	var queryText=document.getElementById('poleID').value;
    if (queryText == ''){
	    var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez un pôle pour pouvoir lancer le calcul...</span></small>';
$("#placeholder").html(vide);        return;
    }
	// on cherche si plusieurs pôles ont été fournis 
	var reg0=new RegExp(" +$", "g"); 
	queryText=queryText.replace(reg0,"");
	var reg1=new RegExp("^ +", "g"); 
	queryText=queryText.replace(reg1,"");
	var reg2=new RegExp(" +", "g"); 
	queryText=queryText.replace(reg2," ");
	var listQueryTextInput = queryText.split(" ");
	var nombreMotif=0;
	var listQueryTextOutput=[];
	for (var j=0;j<listQueryTextInput.length;j++) {
		if (listQueryTextInput[j] in DictionnaireDesItems)  {
			nombreMotif++;
			listQueryTextOutput.push(listQueryTextInput[j]);
		}
	}
	if (nombreMotif == 0) {
	    var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Le pôle choisi n\'est pas dans le dictionnaire...</span></small>';
$("#placeholder").html(vide);        return;	
	}
    var PARTIES = new Object();
    var PARTIESspecif = new Object();
	var nbPartie = 0;
	for (var nbcontxt in LISTESCONTEXTES) {
		nbPartie = nbPartie+1;
		if (!($.isArray(PARTIES[nbPartie]))) {
			PARTIES[nbPartie]=new Array();
		}
		if (!($.isArray(PARTIESspecif[nbPartie]))) {
			PARTIESspecif[nbPartie]=new Array();
		}		
		for (var k=0;k<listQueryTextOutput.length;k++) {
		    if (!PARTIES[nbPartie].hasOwnProperty(listQueryTextOutput[k])) {
				PARTIES[nbPartie][listQueryTextOutput[k]]=0;  
		    }
		    if (!PARTIESspecif[nbPartie].hasOwnProperty(listQueryTextOutput[k])) {
			PARTIESspecif[nbPartie][listQueryTextOutput[k]]=0;  
		    }
		}		
		
		var contentxt="";
		var infoSource =  LISTESCONTEXTES[nbcontxt].split(":");
		var posDebS=Number(infoSource[0]);
		var posFinS=Number(infoSource[1]);

		/* calcul specif ----------------------------------------------------------*/
		var DictionnairePartie = new Object(); 
		var NBMOTTOTALPartie=0;
		for (var i=posDebS;i<=posFinS;i++) {
			var item=DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
			if (item in DictionnaireDesItems) {
				NBMOTTOTALPartie=NBMOTTOTALPartie+1;
			    if (!DictionnairePartie.hasOwnProperty(item)) {
				DictionnairePartie[item] = 1;
			    }
			    else {
				DictionnairePartie[item] = DictionnairePartie[item]  + 1;
			    }
			}
			for (var z=0;z<listQueryTextOutput.length;z++) {
				if (item == listQueryTextOutput[z]) {
					PARTIES[nbPartie][listQueryTextOutput[z]]=PARTIES[nbPartie][listQueryTextOutput[z]]+1;
				}
			}
		}
		
		for (var z=0;z<listQueryTextOutput.length;z++) {
			if (DictionnairePartie[listQueryTextOutput[z]] === undefined) {
				DictionnairePartie[listQueryTextOutput[z]] = 0;
			}
			var Tsource = NBMOTTOTALSource;
			var tsource = NBMOTTOTALPartie; /* nb d'occ de la partie */
			var result = CalcCoeffSpec(Tsource,tsource,DictionnaireSource[listQueryTextOutput[z]],DictionnairePartie[listQueryTextOutput[z]],seuil); 
			result=precise_round(result,0);
            if (result==Infinity) {result=9e15}
            if (result==-Infinity) {result=-9e15}

//			if (result >= 50) { result = Infinity};
//			if (result <= -50) { result = -Infinity};
			PARTIESspecif[nbPartie][listQueryTextOutput[z]]=result;
		}
		
	}
	var LISTEKEYSPARTIES2= Object.keys(PARTIES);
	var etiquettes=[];	
	var series=[];
	var series2=[];
	var LegendNames=[];
	
	for (var k=0;k<listQueryTextOutput.length;k++) {
		series[k]=[];
		series2[k]=[];
		LegendNames[k]=listQueryTextOutput[k];
	}
	
	for (var k=0;k<listQueryTextOutput.length;k++) {
		for (var i=0; i<LISTEKEYSPARTIES2.length;i++) {
			series[k][i]=PARTIES[LISTEKEYSPARTIES2[i]][listQueryTextOutput[k]];
			series2[k][i]=PARTIESspecif[LISTEKEYSPARTIES2[i]][listQueryTextOutput[k]];
		}
    }

	for (var i=0; i<LISTEKEYSPARTIES2.length;i++) {
	  var labkey="s"+LISTEKEYSPARTIES2[i];
	  etiquettes.push(labkey);
    }
	
    document.getElementById('placeholder').innerHTML = '';
	GrapheArborL=document.getElementById('grLID').value;
    GrapheArborH=document.getElementById('grHID').value;	
	var data = {
			labels: etiquettes,
			series: series
		};
	var data2 = {
			labels: etiquettes,
			series: series2
		};
	var options = {
 			width: GrapheArborL,
			height: GrapheArborH,
			/*chartPadding: {
				right: 40
			},*/
			plugins: [
				Chartist.plugins.legend({
					legendNames: LegendNames,
					position: 'top'
				})
			]

	};
	var options2 = {
			width: GrapheArborL,
			height: GrapheArborH,
			reverseData: false,
			horizontalBars: false,
			seriesBarDistance: 10,
			axisY: {
				offset: 70
			},
			/*chartPadding: {
				right: 40
			},*/
			plugins: [
				Chartist.plugins.legend({
					legendNames: LegendNames,
					position: 'top'
				})
			]
		};

	var titreGraphe='<p align="center">Graphiques de ventilation <small>(annotation : '+annotationencours+')</small> sur la partition induite par la  <span style="font-style:italic">Carte des Sections</span> : Fréquence absolue <small>(haut)</small> / Spécificité <small>(bas)</small><br/><small>- modifier la largeur du graphique, <span class="paramlabel">Graphe L</span>, si le nombre de sections est élevé</small><br/><small>- Clic sur item dans légende pour masquer/afficher courbe de l\'item visé</small></p>';
	document.getElementById('legendGraphe').innerHTML = titreGraphe;
	
	new Chartist.Line('#graph-analysis1', data, options);
	var legend1='<p align="center"><br/><br/><br/><br/><br/></p>';
	document.getElementById('legend-graph-analysis1').innerHTML += legend1;

	new Chartist.Bar('#graph-analysis2', data2, options2);
	var legend2='<p align="center"><br/><br/><br/><br/><br/></p>';
	document.getElementById('legend-graph-analysis2').innerHTML += legend2;
	document.getElementById('placeholder').innerHTML = '';
}
//-----------------------------------------------------------------------------------
function deselectSection () {
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    DictionnaireSelectSection = [];
    ListSelectSection = new Object();
    if (isTheCarteDesSectionsOK ==0) {
	return;
    }
    for (var i=0; i<nbSectionInCarte;i++) {
	var secnbS="S"+i;
	document.getElementById(secnbS).classList.remove('actions_select');
	document.getElementById(secnbS).classList.remove('actions_one');
	document.getElementById(secnbS).classList.remove('actions_Inter');
	document.getElementById(secnbS).classList.remove('actions_pasinter');
	document.getElementById(secnbS).classList.remove('actions_pasinter2');
	document.getElementById(secnbS).classList.add('actions_zero');
    }
    document.getElementById('placeholder').innerHTML = '';
} 
//-----------------------------------------------------------------------------------
function selectSection(nbSection) {	
    var secimg="S"+nbSection;
    document.getElementById(secimg).classList.add('actions_select');
    if (ListSelectSection[nbSection]!=1) {
	DictionnaireSelectSection.push(LISTESCONTEXTES[nbSection]);
	ListSelectSection[nbSection]=1;
    }
    var nbSection2select=Number(document.getElementById('nbselectionsectionID').value);
    if (nbSection2select > 1) {
	for (var i=1;i<nbSection2select;i++) {
	    var nbS = Number(nbSection)+i;
	    secimg="S"+nbS;
	    document.getElementById(secimg).classList.add('actions_select');
	    if (ListSelectSection[nbS]!=1) {
		DictionnaireSelectSection.push(LISTESCONTEXTES[nbS]);
		ListSelectSection[nbS]=1;
	    }
	}
    }
    return false;
} 
//-----------------------------------------------------------------------------------
function displaySRsurCarte() {
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    DictionnaireSelectSection = [];
    ListSelectSection = new Object();
    dicoCorrespondancePositionsSectionsInBitext=new Object();

    refreshItrameur();

    var contexteDelim=document.getElementById('contexteID').value;
    if (contexteDelim == ''){
	contexteDelim ="\n";
    }
    /*----------------------------------------------------------------------------*/
    var inputBitext = document.getElementById ("bitextID");
    var isCheckedBitext = inputBitext.checked;
    if (isCheckedBitext) {
	nbSectionGlobalForBitext=dictionnairedesdelims[contexteDelim];
    }			
    var positionFinVolet1=1;
    /*----------------------------------------------------------------------------*/
    DictionnaireBitextSource= new Object(); // or just {} 
    DictionnaireBitextCible= new Object(); // or just {} 
    LISTESCONTEXTES= new Object(); // or just {} 
    LISTESCONTEXTESSOURCE= new Object(); // or just {} 
    LISTESCONTEXTESCIBLE= new Object(); // or just {} 
    nbSectionInCarte=0;
    nbMotBitextCible=0;
    nbMotBitextSource=0;
    /*----------------------------------------------------------------------------*/
    var DictionnaireDesItems = new Object();
    var DictionnaireNumDesItems = new Object();
    if (annotationencours==1) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
    }
    if (annotationencours==2) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireLemme);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2lemme);
    }
    if (annotationencours==3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireCategorie);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2categorie);
    }
    if (annotationencours>3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireAnnotation);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2annotation);
    }
    var annotationencoursIndex=annotationencours-1;
    var freqsegmentSR=document.getElementById('srfqID').value;
    /*----------------------------------------------------------------------------*/
    var queryText=document.getElementById('SRpoleID').value;
    var queryTextC=document.getElementById('SRpoleCibleID').value;
    var nbSR=0;
    var nbSRC=0;
    var nbSRfound=0;
    var nbSRCfound=0;
    if (!(isCheckedBitext)) {
	if (!(queryText in listeSROK))  {
	    var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Ce segment n\'est pas un SR...</span></small>';
	    $("#placeholder").html(vide);
	    return;
	}
	else { 
	    if (listeSROK[queryText] < freqsegmentSR)  {
		var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Ce segment n\'est pas un SR...</span></small>';
		$("#placeholder").html(vide);		
		return;
	    }
	}
	nbSR=listeSROK[queryText];
    }
    else {
	if ((!(queryTextC in listeSROK)) && (!(queryText in listeSROK)) ) {
	    var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Aucun des 2 segments n\'est un SR...</span></small>';
	    $("#placeholder").html(vide);
	    return;
	}
	else {
	    if ((listeSROK[queryText] < freqsegmentSR) && (listeSROK[queryTextC] < freqsegmentSR))  {
		var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Aucun des 2 segments n\'est un SR...</span></small>';
		$("#placeholder").html(vide);		
		return;
	    }
	}
	if (queryText in listeSROK)  {
	    nbSR=listeSROK[queryText];
	}
	if (queryTextC in listeSROK)  {
	    nbSRC=listeSROK[queryTextC];
	}
    }
    /*----------------------------------------------------------------------------*/
    var carte="<p><span style=\"font-size:0.7em\">Clic sur section : affichage contexte | Clic-droit sur section : sélection section</span></p><div  id=\"cartesection\"><p align=\"left\">";
    /* on commence par repérer les positions de la partition active... */
    var PARTITION =document.getElementById('IDPartie').value;
    var LISTESDESPARTIES=new Object(); 
    var DicoDesPositionsDesPartiesPourSections=new Object(); 
    if (PARTITION != '') {
	LISTESDESPARTIES=Object.keys(cadre[PARTITION]);
	for (var j=0;j<LISTESDESPARTIES.length;j++) {
	    var listepositions = cadre[PARTITION][LISTESDESPARTIES[j]];
	    for (var k=0;k<(listepositions.length);k=k+2) {
		var deb = listepositions[k];
		var tmpk=k+1;
		var fin = listepositions[tmpk];
		DicoDesPositionsDesPartiesPourSections[deb]=PARTITION+"="+LISTESDESPARTIES[j]+" <"+deb+":"+fin+">";
		DicoDesPositionsDesPartiesPourSections[fin]="ENDPARTIE";
		if (isCheckedBitext) {
		    if (j==0) {positionFinVolet1=fin};
		}
	    }
	}
	var firstIndexTrame=Object.keys(trameForme)[0];
	var j=Number(firstIndexTrame);
	for (var k=1;k<firstIndexTrame;k++) {
	    if (k in DicoDesPositionsDesPartiesPourSections) {
		if (DicoDesPositionsDesPartiesPourSections[k] != "ENDPARTIE") {
		    carte+= "<div class=\"sectionPartie\">"+DicoDesPositionsDesPartiesPourSections[k]+"<p align=\"left\">";
		}
		else {
		    carte+= "</p></div>"; 
		    
		}
	    }
	}
    }
    var posdebsection=1;
    var posfinsection=1;
    
    var isQueryTextInSection=0;
    
    if (!(isCheckedBitext)) {
	var contentxt="";	
	for (var index in trameForme) {
	    
	    if (index in DicoDesPositionsDesPartiesPourSections) {
		if (DicoDesPositionsDesPartiesPourSections[index] != "ENDPARTIE") {
		    carte+= "<div class=\"sectionPartie\">"+DicoDesPositionsDesPartiesPourSections[index]+"<p align=\"left\">";
		}
	    }
	    var item = DictionnaireNumDesItems[trameForme[index][annotationencoursIndex]];
	    var itemForme = dicNum2forme[trameForme[index][0]];
	    if (!(dicNum2forme[trameForme[index][0]] in dictionnairedesdelims))  {
		contentxt+=item;/*+"("+trameForme[index]+")";*/
		if ((queryText != '') && (queryText != 'entrez le SR') && (isQueryTextInSection ==0))  { // A MODIFIER...
		    var lesmotsduSR=queryText.split(" ");
		    if (lesmotsduSR[0] == item) {
			//alert("O : "+lesmotsduSR[0]+"|"+queryText);
			//var resuSR = verifSRatThisPos(index,queryText);
			var resuSR1="NO";	
			if (dictionnaireventilationdesSR[index] !== undefined) {
			    var listeMotsduSR=queryText.split(" ");
			    var longueurSR=listeMotsduSR.length;
			    var lgsr=dictionnaireventilationdesSR[index];
			    if (longueurSR <= lgsr) {
				var tmpsr=DictionnaireNumDesItems[trameForme[index][annotationencoursIndex]];
				var lgtmpsr=1;
				var k=1;
				var tmpindex=Number(index);
				var matchW = "OK";
				var m=1;
				while ((lgtmpsr < longueurSR) && (matchW == "OK")) {
				    if ((dicNum2forme[trameForme[tmpindex+k][0]] in dictionnairedesdelims ) || (trameForme[tmpindex+k][0] == -1 )) {
					tmpsr=tmpsr + " ";
				    } 
				    else {
					if (DictionnaireNumDesItems[trameForme[tmpindex+k][annotationencoursIndex]] == listeMotsduSR[m]) {
					    tmpsr=tmpsr + DictionnaireNumDesItems[trameForme[tmpindex+k][annotationencoursIndex]];
					    lgtmpsr++;
					    m++;
					}
					else {
					    matchW = "BAD";
					}
				    }
				    k++;	
				}
				if (matchW == "OK") { // pas necessaire ??
	    			    var reg0=new RegExp(" +$", "g"); 
				    tmpsr=tmpsr.replace(reg0,"");
				    var reg1=new RegExp(" +", "g"); 
				    tmpsr=tmpsr.replace(reg1," ");	
				    if (queryText == tmpsr) {
					resuSR1="OK";
				    }
				}
			    }
			}
			//---------------------------
			if (resuSR1 == "OK") {
			    isQueryTextInSection++;
			    nbSRfound++; // A MODIFIER...
			}
		    }
		}
	    }
	    else {
		contentxt+=item;
		if (itemForme == contexteDelim) {
		    contentxt = contentxt.replace(/\n/g, ' ');
		    contentxt = contentxt.replace(/\s+/g, ' ');
		    posfinsection=Number(index);
		    if ((contentxt!=' ')){
			LISTESCONTEXTES[nbSectionInCarte]=posdebsection+":"+posfinsection;
			if (isQueryTextInSection > 0 ) {
			    var secimg="S"+nbSectionInCarte;
			    DictionnaireSelectSection.push(LISTESCONTEXTES[nbSectionInCarte]);
			    ListSelectSection[nbSectionInCarte]=1;
			    carte+= "<a href=\"javascript:onclickSection(\'"+nbSectionInCarte+","+posdebsection+","+posfinsection+"\')\"><img id=\""+secimg+"\" class=\"actions_one actions_select\" src=\"./images/cr.png\" onContextMenu=\"selectSection(\'"+nbSectionInCarte+"\');\"/></a>";
			}
			else {
			    var secimg="S"+nbSectionInCarte;
			    carte+= "<a href=\"javascript:onclickSection(\'"+nbSectionInCarte+","+posdebsection+","+posfinsection+"\')\"><img id=\""+secimg+"\" class=\"actions_zero\" src=\"./images/cb.png\" onContextMenu=\"selectSection(\'"+nbSectionInCarte+"\');\"/></a>";			
			}
			nbSectionInCarte = nbSectionInCarte + 1;
			contentxt="";
		    }
		    else {
			contentxt="";
		    }
		    posdebsection=posfinsection+1;
		    posfinsection=posdebsection;
		    isQueryTextInSection=0;
		}
	    }
	    if (index in DicoDesPositionsDesPartiesPourSections) {
		if (DicoDesPositionsDesPartiesPourSections[index] == "ENDPARTIE") {
		    contentxt = contentxt.replace(/\n/g, ' ');
		    contentxt = contentxt.replace(/\s+/g, ' ');
		    posfinsection=Number(index);
		    if ((contentxt!=' ')){
			LISTESCONTEXTES[nbSectionInCarte]=posdebsection+":"+posfinsection;
			if (isQueryTextInSection > 0 ) {
			    var secimg="S"+nbSectionInCarte;
			    DictionnaireSelectSection.push(LISTESCONTEXTES[nbSectionInCarte]);
			    ListSelectSection[nbSectionInCarte]=1;
			    carte+= "<a href=\"javascript:onclickSection(\'"+nbSectionInCarte+","+posdebsection+","+posfinsection+"\')\"><img id=\""+secimg+"\" class=\"actions_one actions_select\" src=\"./images/cr.png\" onContextMenu=\"selectSection(\'"+nbSectionInCarte+"\');\"/></a>";
			}						
			else {
			    var secimg="S"+nbSectionInCarte;
			    carte+= "<a href=\"javascript:onclickSection(\'"+nbSectionInCarte+","+posdebsection+","+posfinsection+"\')\"><img id=\""+secimg+"\" class=\"actions_zero\" src=\"./images/cb.png\" onContextMenu=\"selectSection(\'"+nbSectionInCarte+"\');\"/></a>";			
			}
			nbSectionInCarte = nbSectionInCarte + 1;
			contentxt="";
			carte+= "</p></div>"; 
		    }
		    else {
			contentxt="";
			carte+= "</p></div>"; 
		    }
		    posdebsection=posfinsection+1;
		    posfinsection=posdebsection;
		    isQueryTextInSection=0;
		}
	    }
	}
	carte+="</p></div><p><span style=\"font-size:0.7em\">Clic sur section : affichage contexte | Clic-droit sur section : sélection section</span></p>";
	document.getElementById('placeholder2').style.height = "400px";		
	$("#placeholder2").html(carte);
	isTheCarteDesSectionsOK=1;
	/*document.getElementById('placeholder').innerHTML = '';*/
    }
    if (isCheckedBitext) {
	FlagSectionCarteSource={};
	FlagSectionCarteCible={};
	var nbSectionSource = nbSectionGlobalForBitext/2;
	var contentxt="";	
	var nbAlignSource=0;
	var nbAlignCible=0;
	var carteSource="<div><p align=\"left\">";
	var carteCible="<div><p align=\"left\">";
	for (var pos=1;pos<=positionFinVolet1;pos++) {
	    if (pos in DicoDesPositionsDesPartiesPourSections) {
		if (DicoDesPositionsDesPartiesPourSections[pos] != "ENDPARTIE") {
		    carteSource+= "<div class=\"sectionPartie\">"+DicoDesPositionsDesPartiesPourSections[pos]+"<p align=\"left\">";
		}
	    }
	    if (pos in trameForme) {
		var item = DictionnaireNumDesItems[trameForme[pos][annotationencoursIndex]];
		var itemForme = dicNum2forme[trameForme[pos][0]];
		if (!(dicNum2forme[trameForme[pos][0]] in dictionnairedesdelims))  {
		    contentxt+=item;/*+"("+trameForme[index]+")";*/
		    nbMotBitextSource=nbMotBitextSource+1;
		    if (DictionnaireBitextSource[item] === undefined) {
			DictionnaireBitextSource[item]=1;
		    }
		    else {
			DictionnaireBitextSource[item]=DictionnaireBitextSource[item]+1
		    }
		    if ((queryText != '') && (queryText != 'entrez le SR') && (isQueryTextInSection ==0)) {
			var lesmotsduSR=queryText.split(" ");
			if (lesmotsduSR[0] == item) {
			    //alert("O : "+lesmotsduSR[0]+"|"+queryText);
			    //var resuSR = verifSRatThisPos(pos,queryText);
			    var resuSR1="NO";	
			    if (dictionnaireventilationdesSR[pos] !== undefined) {
				var listeMotsduSR=queryText.split(" ");
				var longueurSR=listeMotsduSR.length;
				var lgsr=dictionnaireventilationdesSR[pos];
				if (longueurSR <= lgsr) {
				    var tmpsr=DictionnaireNumDesItems[trameForme[pos][annotationencoursIndex]];
				    var lgtmpsr=1;
				    var k=1;
				    var tmpindex=Number(pos);
				    var matchW = "OK";
				    var m=1;
				    while ((lgtmpsr < longueurSR) && (matchW == "OK")) {
					if ((dicNum2forme[trameForme[tmpindex+k][0]] in dictionnairedesdelims ) || (trameForme[tmpindex+k][0] == -1 )) {
					    tmpsr=tmpsr + " ";
					} 
					else {
					    if (DictionnaireNumDesItems[trameForme[tmpindex+k][annotationencoursIndex]] == listeMotsduSR[m]) {
						tmpsr=tmpsr + DictionnaireNumDesItems[trameForme[tmpindex+k][annotationencoursIndex]];
						lgtmpsr++;
						m++;
					    }
					    else {
						matchW = "BAD";
					    }
					}
					k++;	
				    }
				    if (matchW == "OK") { // pas necessaire ??
	    				var reg0=new RegExp(" +$", "g"); 
					tmpsr=tmpsr.replace(reg0,"");
					var reg1=new RegExp(" +", "g"); 
					tmpsr=tmpsr.replace(reg1," ");	
					if (queryText == tmpsr) {
					    resuSR1="OK";
					}
				    }
				}
			    }
			    //---------------------------
			    if (resuSR1 == "OK") {
				isQueryTextInSection++;
			    }
			}
			/*
			  for (var j=0;j<listQueryTextOutput.length;j++) {
			  if (item==listQueryTextOutput[j]) {
			  isQueryTextInSection++;
			  }
			  }*/
		    }
		}
		else {
		    contentxt+=item;
		    if (itemForme == contexteDelim) {
			contentxt = contentxt.replace(/\n/g, ' ');
			contentxt = contentxt.replace(/\s+/g, ' ');
			posfinsection=pos;
			if ((contentxt!=' ')){
			    LISTESCONTEXTES[nbSectionInCarte]=posdebsection+":"+posfinsection;
			    LISTESCONTEXTESSOURCE[nbSectionInCarte]=posdebsection+":"+posfinsection;
			    dicoCorrespondancePositionsSectionsInBitext[nbSectionInCarte]=posdebsection+":"+posfinsection;
			    nbAlignSource++;
			    if (isQueryTextInSection > 0 ) {
				var secimg="S"+nbSectionInCarte;
				DictionnaireSelectSection.push(LISTESCONTEXTES[nbSectionInCarte]);
				ListSelectSection[nbSectionInCarte]=1;
				carteSource+= "<a href=\"javascript:onclickSection(\'"+nbSectionInCarte+","+posdebsection+","+posfinsection+"\')\"><img id=\""+secimg+"\" class=\"actions_one actions_select\" src=\"./images/cr.png\" onContextMenu=\"selectSection(\'"+nbSectionInCarte+"\');\"/></a>";
				FlagSectionCarteSource[nbAlignSource]=1;
			    }
			    else {
				FlagSectionCarteSource[nbAlignSource]=0;
				var secimg="S"+nbSectionInCarte;
				carteSource+= "<a href=\"javascript:onclickSection(\'"+nbSectionInCarte+","+posdebsection+","+posfinsection+"\')\"><img id=\""+secimg+"\" class=\"actions_zero\" src=\"./images/cb.png\" onContextMenu=\"selectSection(\'"+nbSectionInCarte+"\');\"/></a>";	
			    }
			    nbSectionInCarte = nbSectionInCarte + 1;
			    contentxt="";
			}
			else {
			    contentxt="";
			}
			posdebsection=posfinsection+1;
			posfinsection=posdebsection;
			isQueryTextInSection=0;
		    }
		}
		if (pos in DicoDesPositionsDesPartiesPourSections) {
		    if (DicoDesPositionsDesPartiesPourSections[pos] == "ENDPARTIE") {
			contentxt = contentxt.replace(/\n/g, ' ');
			contentxt = contentxt.replace(/\s+/g, ' ');
			posfinsection=pos;
			if ((contentxt!=' ')){
			    LISTESCONTEXTES[nbSectionInCarte]=posdebsection+":"+posfinsection;
			    LISTESCONTEXTESSOURCE[nbSectionInCarte]=posdebsection+":"+posfinsection;
			    dicoCorrespondancePositionsSectionsInBitext[nbSectionInCarte]=posdebsection+":"+posfinsection;
			    nbAlignSource++;
			    if (isQueryTextInSection > 0 ) {
				var secimg="S"+nbSectionInCarte;
				DictionnaireSelectSection.push(LISTESCONTEXTES[nbSectionInCarte]);
				ListSelectSection[nbSectionInCarte]=1;
				carteSource+= "<a href=\"javascript:onclickSection(\'"+nbSectionInCarte+","+posdebsection+","+posfinsection+"\')\"><img id=\""+secimg+"\" class=\"actions_one actions_select\" src=\"./images/cr.png\" onContextMenu=\"selectSection(\'"+nbSectionInCarte+"\');\"/></a>";
				FlagSectionCarteSource[nbAlignSource]=1;
			    }
			    else {
				FlagSectionCarteSource[nbAlignSource]=0;
				var secimg="S"+nbSectionInCarte;
				carteSource+= "<a href=\"javascript:onclickSection(\'"+nbSectionInCarte+","+posdebsection+","+posfinsection+"\')\"><img id=\""+secimg+"\" class=\"actions_zero\" src=\"./images/cb.png\" onContextMenu=\"selectSection(\'"+nbSectionInCarte+"\');\"/></a>";			
			    }
			    nbSectionInCarte = nbSectionInCarte + 1;
			    contentxt="";
			    carteSource+= "</p></div>"; 
			}
			else {
			    contentxt="";
			    carteSource+= "</p></div>"; 
			}
			posdebsection=posfinsection+1;
			posfinsection=posdebsection;
			isQueryTextInSection=0;
		    }
		}
	    }
	}
	contentxt="";
	isQueryTextInSection=0;		
	for (var pos=positionFinVolet1;pos<positionsurlatrame;pos++) {
	    if (pos in DicoDesPositionsDesPartiesPourSections) {
		if (DicoDesPositionsDesPartiesPourSections[pos] != "ENDPARTIE") {
		    carteCible+= "<div class=\"sectionPartie\">"+DicoDesPositionsDesPartiesPourSections[pos]+"<p align=\"left\">";
		}
	    }
	    var item = DictionnaireNumDesItems[trameForme[pos][annotationencoursIndex]];
	    var itemForme = dicNum2forme[trameForme[pos][0]];
	    if (!(dicNum2forme[trameForme[pos][0]] in dictionnairedesdelims))  {
		contentxt+=item;/*+"("+trameForme[index]+")";*/
		nbMotBitextCible=nbMotBitextCible+1;
		if (DictionnaireBitextCible[item] === undefined) {
		    DictionnaireBitextCible[item]=1;
		}
		else {
		    DictionnaireBitextCible[item]=DictionnaireBitextCible[item]+1
		}
		if ((queryTextC != '') && (queryTextC != 'entrez le SR') && (isQueryTextInSection ==0)) {
		    var lesmotsduSR=queryTextC.split(" ");
		    if (lesmotsduSR[0] == item) {
			//alert("O : "+lesmotsduSR[0]+"|"+queryText);
			//var resuSR1 = verifSRatThisPos(pos,queryTextC);
			var resuSR1="NO";	
			if (dictionnaireventilationdesSR[pos] !== undefined) {
			    var listeMotsduSR=queryTextC.split(" ");
			    var longueurSR=listeMotsduSR.length;
			    var lgsr=dictionnaireventilationdesSR[pos];
			    if (longueurSR <= lgsr) {
				var tmpsr=DictionnaireNumDesItems[trameForme[pos][annotationencoursIndex]];
				var lgtmpsr=1;
				var k=1;
				var tmpindex=Number(pos);
				var matchW = "OK";
				var m=1;
				while ((lgtmpsr < longueurSR) && (matchW == "OK")) {
				    if ((dicNum2forme[trameForme[tmpindex+k][0]] in dictionnairedesdelims ) || (trameForme[tmpindex+k][0] == -1 )) {
					tmpsr=tmpsr + " ";
				    } 
				    else {
					if (DictionnaireNumDesItems[trameForme[tmpindex+k][annotationencoursIndex]] == listeMotsduSR[m]) {
					    tmpsr=tmpsr + DictionnaireNumDesItems[trameForme[tmpindex+k][annotationencoursIndex]];
					    lgtmpsr++;
					    m++;
					}
					else {
					    matchW = "BAD";
					}
				    }
				    k++;	
				}
				if (matchW == "OK") { // pas necessaire ??
	    			    var reg0=new RegExp(" +$", "g"); 
				    tmpsr=tmpsr.replace(reg0,"");
				    var reg1=new RegExp(" +", "g"); 
				    tmpsr=tmpsr.replace(reg1," ");	
				    if (queryTextC == tmpsr) {
					resuSR1="OK";
				    }
				}
			    }
			}
			//---------------------------
			if (resuSR1 == "OK") {
			    isQueryTextInSection++;
			}
		    }
		    /*for (var j=0;j<listQueryTextOutputC.length;j++) {
		      if (item==listQueryTextOutputC[j]) {
		      isQueryTextInSection++;
		      }
		      }*/
		}
	    }
	    else {
		contentxt+=item;
		if (itemForme == contexteDelim) {
		    contentxt = contentxt.replace(/\n/g, ' ');
		    contentxt = contentxt.replace(/\s+/g, ' ');
		    posfinsection=pos;
		    if ((contentxt!=' ')){
			LISTESCONTEXTES[nbSectionInCarte]=posdebsection+":"+posfinsection;
			LISTESCONTEXTESCIBLE[nbSectionInCarte]=posdebsection+":"+posfinsection;
			dicoCorrespondancePositionsSectionsInBitext[nbSectionInCarte]=posdebsection+":"+posfinsection;
			nbAlignCible++;
			if (isQueryTextInSection > 0 ) {
			    var secimg="S"+nbSectionInCarte;
			    DictionnaireSelectSection.push(LISTESCONTEXTES[nbSectionInCarte]);
			    ListSelectSection[nbSectionInCarte]=1;
			    carteCible+= "<a href=\"javascript:onclickSection(\'"+nbSectionInCarte+","+posdebsection+","+posfinsection+"\')\"><img id=\""+secimg+"\" class=\"actions_one actions_select\" src=\"./images/cr.png\" onContextMenu=\"selectSection(\'"+nbSectionInCarte+"\');\"/></a>";
			    FlagSectionCarteCible[nbAlignCible]=1;
			}
			else {
			    FlagSectionCarteCible[nbAlignCible]=0;
			    var secimg="S"+nbSectionInCarte;
			    carteCible+= "<a href=\"javascript:onclickSection(\'"+nbSectionInCarte+","+posdebsection+","+posfinsection+"\')\"><img id=\""+secimg+"\" class=\"actions_zero\" src=\"./images/cb.png\" onContextMenu=\"selectSection(\'"+nbSectionInCarte+"\');\"/></a>";			
			}
			nbSectionInCarte = nbSectionInCarte + 1;
			contentxt="";
		    }
		    else {
			contentxt="";
		    }
		    posdebsection=posfinsection+1;
		    posfinsection=posdebsection;
		    isQueryTextInSection=0;
		}
	    }
	    if (pos in DicoDesPositionsDesPartiesPourSections) {
		if (DicoDesPositionsDesPartiesPourSections[pos] == "ENDPARTIE") {
		    contentxt = contentxt.replace(/\n/g, ' ');
		    contentxt = contentxt.replace(/\s+/g, ' ');
		    posfinsection=pos;
		    if ((contentxt!=' ')){
			LISTESCONTEXTES[nbSectionInCarte]=posdebsection+":"+posfinsection;
			LISTESCONTEXTESCIBLE[nbSectionInCarte]=posdebsection+":"+posfinsection;
			dicoCorrespondancePositionsSectionsInBitext[nbSectionInCarte]=posdebsection+":"+posfinsection;
			nbAlignCible++;
			if (isQueryTextInSection > 0 ) {
			    var secimg="S"+nbSectionInCarte;
			    DictionnaireSelectSection.push(LISTESCONTEXTES[nbSectionInCarte]);
			    ListSelectSection[nbSectionInCarte]=1;
			    carteCible+= "<a href=\"javascript:onclickSection(\'"+nbSectionInCarte+","+posdebsection+","+posfinsection+"\')\"><img id=\""+secimg+"\" class=\"actions_one actions_select\" src=\"./images/cr.png\" onContextMenu=\"selectSection(\'"+nbSectionInCarte+"\');\"/></a>";
			    FlagSectionCarteCible[nbAlignCible]=1;
			}
			else {
			    FlagSectionCarteCible[nbAlignCible]=0;
			    var secimg="S"+nbSectionInCarte;
			    carteCible+= "<a href=\"javascript:onclickSection(\'"+nbSectionInCarte+","+posdebsection+","+posfinsection+"\')\"><img id=\""+secimg+"\" class=\"actions_zero\" src=\"./images/cb.png\" onContextMenu=\"selectSection(\'"+nbSectionInCarte+"\');\"/></a>";			
			}
			nbSectionInCarte = nbSectionInCarte + 1;
			contentxt="";
			carteCible+= "</p></div>"; 
		    }
		    else {
			contentxt="";
			carteCible+= "</p></div>"; 
		    }
		    posdebsection=posfinsection+1;
		    posfinsection=posdebsection;
		    isQueryTextInSection=0;
		}
	    }
	}
	
	if (nbAlignSource != nbAlignCible){
	    document.getElementById('bitextID').checked=false;
	    yesnoCheck();
	    var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Nombre de sections différent dans les 2 volets...</span></small>';
	    $("#placeholder").html(vide);
	    dicoCorrespondancePositionsSectionsInBitext= new Object();
	    DictionnaireSelectSection = [];
	    DictionnaireBitextSource= new Object(); // or just {} 
	    DictionnaireBitextCible= new Object(); // or just {} 
	    LISTESCONTEXTES= new Object(); // or just {} 
	    LISTESCONTEXTESSOURCE= new Object(); // or just {} 
	    LISTESCONTEXTESCIBLE= new Object(); // or just {} 
	    ListSelectSection = new Object();
	    nbSectionInCarte=0;
	    nbMotBitextCible=0;
	    nbMotBitextSource=0;
	    return;
	}
	else {
	    
	    carteCible+= "</p></div>"; 
	    carteSource+= "</p></div>"; 
	    
	    var carteglobal='<div id="placeholderSource">'+carteSource+'</div><div id="placeholderCible">'+carteCible+'</div>';
	    carteglobal+='<p><span style="font-family: Tahoma,sans-serif; font-size: 70%; padding: 1px; border-right: 1px solid rgb(204, 153, 0); border-bottom: 1px solid rgb(204, 153, 0);border-left: 1px solid rgb(204, 153, 0);border-top: 1px solid rgb(204, 153, 0);"><b>Légende Carte</b> : <img src="./images/cr.png" style="background-color:yellow;border:1px solid black"/> Présence dans Source et Cible | <img src="./images/cr.png" style="background-color:#33cc33;border:1px solid black"/>&nbsp;<img src="./images/cb.png" style="background-color:#33cc33;border:1px solid black"/> Présence dans un volet, absence dans l\'autre | <img src="./images/cb.png" style="border:1px solid black"/> Absence</span><br/>';
	    carteglobal+="<span style=\"font-size:0.7em\">Clic sur section : affichage contexte | Clic-droit sur section : sélection section</span></p>";
	    

	    document.getElementById('placeholder2').style.height = "300px";
	    $("#placeholder2").html(carteglobal);
	    isTheCarteDesSectionsOK=1;
	    /*document.getElementById('placeholder').innerHTML = '';*/
	    for (var nbsect=1;nbsect<=nbAlignSource;nbsect++) {
		if ((FlagSectionCarteCible[nbsect]==1) && (FlagSectionCarteSource[nbsect]==1)) {
		    var nbsectmp=nbsect-1;
		    var secnb="S"+nbsectmp;
		    /*alert(secnb);*/
		    document.getElementById(secnb).classList.remove('actions_zero');
		    document.getElementById(secnb).classList.remove('actions_one');
		    document.getElementById(secnb).classList.add('actions_Inter');
		}
		if ((FlagSectionCarteCible[nbsect]==0) && (FlagSectionCarteSource[nbsect]==1)) {
		    var nbsectmp=nbsect-1;
		    var secnb="S"+nbsectmp;
		    document.getElementById(secnb).classList.remove('actions_zero');
		    document.getElementById(secnb).classList.remove('actions_one');
		    document.getElementById(secnb).classList.add('actions_pasinter');									
		}
		if ((FlagSectionCarteCible[nbsect]==1) && (FlagSectionCarteSource[nbsect]==0)) {
		    var nbsectmp=nbsect-1;
		    var secnb="S"+nbsectmp;
		    document.getElementById(secnb).classList.remove('actions_zero');
		    document.getElementById(secnb).classList.remove('actions_one');
		    document.getElementById(secnb).classList.add('actions_pasinter2');										
		}
		if ((FlagSectionCarteCible[nbsect]==0) && (FlagSectionCarteSource[nbsect]==0)) {
		    var nbsectmp=nbsect-1;
		    var secnb="S"+nbsectmp;
		    document.getElementById(secnb).classList.remove('actions_one');
		    document.getElementById(secnb).classList.add('actions_zero');										
		}
		
	    }
	    for (var nbsect=nbAlignSource+1;nbsect<=(nbAlignSource+nbAlignCible);nbsect++) {
		var flag=nbsect-nbAlignSource;
		if ((FlagSectionCarteCible[flag]==1) && (FlagSectionCarteSource[flag]==1)) {
		    var nbsectmp=nbsect-1;
		    var secnb="S"+nbsectmp;
		    document.getElementById(secnb).classList.remove('actions_zero');
		    document.getElementById(secnb).classList.remove('actions_one');
		    document.getElementById(secnb).classList.add('actions_Inter');
		}
		if ((FlagSectionCarteCible[flag]==0) && (FlagSectionCarteSource[flag]==1)) {
		    var nbsectmp=nbsect-1;
		    var secnb="S"+nbsectmp;
		    document.getElementById(secnb).classList.remove('actions_zero');
		    document.getElementById(secnb).classList.remove('actions_one');
		    document.getElementById(secnb).classList.add('actions_pasinter2');									
		}
		if ((FlagSectionCarteCible[flag]==1) && (FlagSectionCarteSource[flag]==0)) {
		    var nbsectmp=nbsect-1;
		    var secnb="S"+nbsectmp;
		    document.getElementById(secnb).classList.remove('actions_zero');
		    document.getElementById(secnb).classList.remove('actions_one');
		    document.getElementById(secnb).classList.add('actions_pasinter');										
		}
		if ((FlagSectionCarteCible[flag]==0) && (FlagSectionCarteSource[flag]==0)) {
		    var nbsectmp=nbsect-1;
		    var secnb="S"+nbsectmp;
		    document.getElementById(secnb).classList.remove('actions_one');
		    document.getElementById(secnb).classList.add('actions_zero');										
		}
		
	    }
	}
	
    }	
}
//-----------------------------------------------------------------------------------
function carteDesSections() {
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    DictionnaireSelectSection = [];
    ListSelectSection = new Object();
    dicoCorrespondancePositionsSectionsInBitext=new Object();

    refreshItrameur();

    var contexteDelim=document.getElementById('contexteID').value;
    if (contexteDelim == ''){
	contexteDelim ="\n";
    }
    /*----------------------------------------------------------------------------*/
    var inputBitext = document.getElementById ("bitextID");
    var isCheckedBitext = inputBitext.checked;
    if (isCheckedBitext) {
	nbSectionGlobalForBitext=dictionnairedesdelims[contexteDelim];
    }			
    var positionFinVolet1=1;
    /*----------------------------------------------------------------------------*/
    DictionnaireBitextSource= new Object(); // or just {} 
    DictionnaireBitextCible= new Object(); // or just {} 
    LISTESCONTEXTES= new Object(); // or just {} 
    LISTESCONTEXTESSOURCE= new Object(); // or just {} 
    LISTESCONTEXTESCIBLE= new Object(); // or just {} 
    nbSectionInCarte=0;
    nbMotBitextCible=0;
    nbMotBitextSource=0;
    /*----------------------------------------------------------------------------*/
    var DictionnaireDesItems = new Object();
    var DictionnaireNumDesItems = new Object();
    if (annotationencours==1) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
    }
    if (annotationencours==2) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireLemme);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2lemme);
    }
    if (annotationencours==3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireCategorie);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2categorie);
    }
    if (annotationencours>3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireAnnotation);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2annotation);
    }
    var annotationencoursIndex=annotationencours-1;
    
    /*----------------------------------------------------------------------------*/
    var queryText=document.getElementById('poleID').value;
    var queryTextC=document.getElementById('poleCibleID').value;
    // on cherche si plusieurs pôles ont été fournis 
    var reg0=new RegExp(" +$", "g"); 
    queryText=queryText.replace(reg0,"");
    queryTextC=queryTextC.replace(reg0,"");
    var reg1=new RegExp("^ +", "g"); 
    queryText=queryText.replace(reg1,"");
    queryTextC=queryTextC.replace(reg1,"");
    var reg2=new RegExp(" +", "g"); 
    queryText=queryText.replace(reg2," ");
    queryTextC=queryTextC.replace(reg2," ");
    var listQueryTextInput = queryText.split(" ");
    var listQueryTextInputC = queryTextC.split(" ");
    var listQueryTextOutput=[];
    var listQueryTextOutputC=[];
    for (var j=0;j<listQueryTextInput.length;j++) {
	if (annotationencours <=3 ) {
	    if (listQueryTextInput[j] in DictionnaireDesItems)  {
		listQueryTextOutput.push(listQueryTextInput[j]);
	    }
	}
	else {
	    var tmpannot = annotationencours+"//"+listQueryTextInput[j];
	    if (tmpannot in DictionnaireDesItems)  {
		listQueryTextOutput.push(listQueryTextInput[j]);
	    }
	    
	}
    }
    for (var j=0;j<listQueryTextInputC.length;j++) {
	if (annotationencours <=3 ) {
	    if (listQueryTextInputC[j] in DictionnaireDesItems)  {
		listQueryTextOutputC.push(listQueryTextInputC[j]);
	    }
	}
	else {
	    var tmpannot = annotationencours+"//"+listQueryTextInputC[j];
	    if (tmpannot in DictionnaireDesItems)  {
		listQueryTextOutputC.push(listQueryTextInputC[j]);
	    }
	    
	}
    }
    /*----------------------------------------------------------------------------*/
    var carte="<p><span style=\"font-size:0.7em\">Clic sur section : affichage contexte | Clic-droit sur section : sélection section</span></p><div  id=\"cartesection\"><p align=\"left\">";
    /* on commence par repérer les positions de la partition active... */
    var PARTITION =document.getElementById('IDPartie').value;
    var LISTESDESPARTIES=new Object(); 
    var DicoDesPositionsDesPartiesPourSections=new Object(); 
    if (PARTITION != '') {
	LISTESDESPARTIES=Object.keys(cadre[PARTITION]);
	for (var j=0;j<LISTESDESPARTIES.length;j++) {
	    var listepositions = cadre[PARTITION][LISTESDESPARTIES[j]];
	    for (var k=0;k<(listepositions.length);k=k+2) {
		var deb = listepositions[k];
		var tmpk=k+1;
		var fin = listepositions[tmpk];
		DicoDesPositionsDesPartiesPourSections[deb]=PARTITION+"="+LISTESDESPARTIES[j]+" <"+deb+":"+fin+">";
		DicoDesPositionsDesPartiesPourSections[fin]="ENDPARTIE";
		if (isCheckedBitext) {
		    if (j==0) {positionFinVolet1=fin};
		}
	    }
	}
	var firstIndexTrame=Object.keys(trameForme)[0];
	var j=Number(firstIndexTrame);
	for (var k=1;k<firstIndexTrame;k++) {
	    if (k in DicoDesPositionsDesPartiesPourSections) {
		if (DicoDesPositionsDesPartiesPourSections[k] != "ENDPARTIE") {
		    carte+= "<div class=\"sectionPartie\">"+DicoDesPositionsDesPartiesPourSections[k]+"<p align=\"left\">";
		}
		else {
		    carte+= "</p></div>"; 
		    
		}
	    }
	}
    }
    else {
	carte+= "<div class=\"sectionPartie\"><p align=\"left\">";
    }

    var posdebsection=1;
    var posfinsection=1;
    
    var isQueryTextInSection=0;
    
    if (!(isCheckedBitext)) {
	var contentxt="";	
	for (var index in trameForme) {
	    if (index in DicoDesPositionsDesPartiesPourSections) {
		if (DicoDesPositionsDesPartiesPourSections[index] != "ENDPARTIE") {
		    carte+= "<div class=\"sectionPartie\">"+DicoDesPositionsDesPartiesPourSections[index]+"<p align=\"left\">";
		}
	    }
	    var item = DictionnaireNumDesItems[trameForme[index][annotationencoursIndex]];
	    var itemForme = dicNum2forme[trameForme[index][0]];
	    if (!(dicNum2forme[trameForme[index][0]] in dictionnairedesdelims))  {
		contentxt+=item;/*+"("+trameForme[index]+")";*/
		if ((queryText != '') && (queryText != 'entrez la forme pôle') && (isQueryTextInSection ==0) ) {
		    for (var j=0;j<listQueryTextOutput.length;j++) {
			if (item==listQueryTextOutput[j]) {
			    isQueryTextInSection++;
			}
		    }
		}
	    }
	    else {
		contentxt+=item;
		if (itemForme == contexteDelim) {
		    contentxt = contentxt.replace(/\n/g, ' ');
		    contentxt = contentxt.replace(/\s+/g, ' ');
		    posfinsection=Number(index);
		    if ((contentxt!=' ')){
			LISTESCONTEXTES[nbSectionInCarte]=posdebsection+":"+posfinsection;
			if (isQueryTextInSection > 0 ) {
			    var secimg="S"+nbSectionInCarte;
			    DictionnaireSelectSection.push(LISTESCONTEXTES[nbSectionInCarte]);
			    ListSelectSection[nbSectionInCarte]=1;
			    carte+= "<a href=\"javascript:onclickSection(\'"+nbSectionInCarte+","+posdebsection+","+posfinsection+"\')\"><img id=\""+secimg+"\" class=\"actions_one actions_select\" src=\"./images/cr.png\" onContextMenu=\"selectSection(\'"+nbSectionInCarte+"\');\"/></a>";
			}
			else {
			    var secimg="S"+nbSectionInCarte;
			    carte+= "<a href=\"javascript:onclickSection(\'"+nbSectionInCarte+","+posdebsection+","+posfinsection+"\')\"><img id=\""+secimg+"\" class=\"actions_zero\" src=\"./images/cb.png\" onContextMenu=\"selectSection(\'"+nbSectionInCarte+"\');\"/></a>";			
			}
			nbSectionInCarte = nbSectionInCarte + 1;
			contentxt="";
		    }
		    else {
			contentxt="";
		    }
		    posdebsection=posfinsection+1;
		    posfinsection=posdebsection;
		    isQueryTextInSection=0;
		}
	    }
	    if (index in DicoDesPositionsDesPartiesPourSections) {
		if (DicoDesPositionsDesPartiesPourSections[index] == "ENDPARTIE") {
		    contentxt = contentxt.replace(/\n/g, ' ');
		    contentxt = contentxt.replace(/\s+/g, ' ');
		    posfinsection=Number(index);
		    if ((contentxt!=' ')){
			LISTESCONTEXTES[nbSectionInCarte]=posdebsection+":"+posfinsection;
			if (isQueryTextInSection > 0 ) {
			    var secimg="S"+nbSectionInCarte;
			    DictionnaireSelectSection.push(LISTESCONTEXTES[nbSectionInCarte]);
			    ListSelectSection[nbSectionInCarte]=1;
			    carte+= "<a href=\"javascript:onclickSection(\'"+nbSectionInCarte+","+posdebsection+","+posfinsection+"\')\"><img id=\""+secimg+"\" class=\"actions_one actions_select\" src=\"./images/cr.png\" onContextMenu=\"selectSection(\'"+nbSectionInCarte+"\');\"/></a>";
			}						
			else {
			    var secimg="S"+nbSectionInCarte;
			    carte+= "<a href=\"javascript:onclickSection(\'"+nbSectionInCarte+","+posdebsection+","+posfinsection+"\')\"><img id=\""+secimg+"\" class=\"actions_zero\" src=\"./images/cb.png\" onContextMenu=\"selectSection(\'"+nbSectionInCarte+"\');\"/></a>";			
			}
			nbSectionInCarte = nbSectionInCarte + 1;
			contentxt="";
			carte+= "</p></div>"; 
		    }
		    else {
			contentxt="";
			carte+= "</p></div>"; 
		    }
		    posdebsection=posfinsection+1;
		    posfinsection=posdebsection;
		    isQueryTextInSection=0;
		}
	    }
	}
	carte+="</p></div><p><span style=\"font-size:0.7em\">Clic sur section : affichage contexte | Clic-droit sur section : sélection section</span></p>";
	document.getElementById('placeholder2').style.height = "400px";
	$("#placeholder2").html(carte);
	isTheCarteDesSectionsOK=1;
	/*document.getElementById('placeholder').innerHTML = '';*/
    }
    if (isCheckedBitext) {
	FlagSectionCarteSource={};
	FlagSectionCarteCible={};
	var nbSectionSource = nbSectionGlobalForBitext/2;
	var contentxt="";	
	var nbAlignSource=0;
	var nbAlignCible=0;
	var carteSource="<div><p align=\"left\">";
	var carteCible="<div><p align=\"left\">";
	positionsurlatrameFinBitext=positionFinVolet1; // pour calcul des coocs sur bitexte... pas fini !
	//alert("Fin Bitexte 1 : "+positionFinVolet1);
	for (var pos=1;pos<=positionFinVolet1;pos++) {
	    if (pos in DicoDesPositionsDesPartiesPourSections) {
		if (DicoDesPositionsDesPartiesPourSections[pos] != "ENDPARTIE") {
		    carteSource+= "<div class=\"sectionPartie\">"+DicoDesPositionsDesPartiesPourSections[pos]+"<p align=\"left\">";
		}
	    }
	    if (pos in trameForme) {
		var item = DictionnaireNumDesItems[trameForme[pos][annotationencoursIndex]];
		var itemForme = dicNum2forme[trameForme[pos][0]];
		if (!(dicNum2forme[trameForme[pos][0]] in dictionnairedesdelims))  {
		    contentxt+=item;/*+"("+trameForme[index]+")";*/
		    nbMotBitextSource=nbMotBitextSource+1;
		    if (DictionnaireBitextSource[item] === undefined) {
			DictionnaireBitextSource[item]=1;
		    }
		    else {
			DictionnaireBitextSource[item]=DictionnaireBitextSource[item]+1
		    }
		    if ((queryText != '') && (queryText != 'entrez la forme pôle') && (isQueryTextInSection ==0)) {
			for (var j=0;j<listQueryTextOutput.length;j++) {
			    if (item==listQueryTextOutput[j]) {
				isQueryTextInSection++;
			    }
			}
		    }
		}
		else {
		    contentxt+=item;
		    if (itemForme == contexteDelim) {
			contentxt = contentxt.replace(/\n/g, ' ');
			contentxt = contentxt.replace(/\s+/g, ' ');
			posfinsection=pos;
			if ((contentxt!=' ')){
			    LISTESCONTEXTES[nbSectionInCarte]=posdebsection+":"+posfinsection;
			    LISTESCONTEXTESSOURCE[nbSectionInCarte]=posdebsection+":"+posfinsection;
			    dicoCorrespondancePositionsSectionsInBitext[nbSectionInCarte]=posdebsection+":"+posfinsection;
			    nbAlignSource++;
			    if (isQueryTextInSection > 0 ) {
				var secimg="S"+nbSectionInCarte;
				DictionnaireSelectSection.push(LISTESCONTEXTES[nbSectionInCarte]);
				ListSelectSection[nbSectionInCarte]=1;
				carteSource+= "<a href=\"javascript:onclickSection(\'"+nbSectionInCarte+","+posdebsection+","+posfinsection+"\')\"><img id=\""+secimg+"\" class=\"actions_one actions_select\" src=\"./images/cr.png\" onContextMenu=\"selectSection(\'"+nbSectionInCarte+"\');\"/></a>";
				FlagSectionCarteSource[nbAlignSource]=1;
			    }
			    else {
				FlagSectionCarteSource[nbAlignSource]=0;
				var secimg="S"+nbSectionInCarte;
				carteSource+= "<a href=\"javascript:onclickSection(\'"+nbSectionInCarte+","+posdebsection+","+posfinsection+"\')\"><img id=\""+secimg+"\" class=\"actions_zero\" src=\"./images/cb.png\" onContextMenu=\"selectSection(\'"+nbSectionInCarte+"\');\"/></a>";	
			    }
			    nbSectionInCarte = nbSectionInCarte + 1;
			    contentxt="";
			}
			else {
			    contentxt="";
			}
			posdebsection=posfinsection+1;
			posfinsection=posdebsection;
			isQueryTextInSection=0;
		    }
		}
		if (pos in DicoDesPositionsDesPartiesPourSections) {
		    if (DicoDesPositionsDesPartiesPourSections[pos] == "ENDPARTIE") {
			contentxt = contentxt.replace(/\n/g, ' ');
			contentxt = contentxt.replace(/\s+/g, ' ');
			posfinsection=pos;
			if ((contentxt!=' ')){
			    LISTESCONTEXTES[nbSectionInCarte]=posdebsection+":"+posfinsection;
			    LISTESCONTEXTESSOURCE[nbSectionInCarte]=posdebsection+":"+posfinsection;
			    dicoCorrespondancePositionsSectionsInBitext[nbSectionInCarte]=posdebsection+":"+posfinsection;
			    nbAlignSource++;
			    if (isQueryTextInSection > 0 ) {
				var secimg="S"+nbSectionInCarte;
				DictionnaireSelectSection.push(LISTESCONTEXTES[nbSectionInCarte]);
				ListSelectSection[nbSectionInCarte]=1;
				carteSource+= "<a href=\"javascript:onclickSection(\'"+nbSectionInCarte+","+posdebsection+","+posfinsection+"\')\"><img id=\""+secimg+"\" class=\"actions_one actions_select\" src=\"./images/cr.png\" onContextMenu=\"selectSection(\'"+nbSectionInCarte+"\');\"/></a>";
				FlagSectionCarteSource[nbAlignSource]=1;
			    }
			    else {
				FlagSectionCarteSource[nbAlignSource]=0;
				var secimg="S"+nbSectionInCarte;
				carteSource+= "<a href=\"javascript:onclickSection(\'"+nbSectionInCarte+","+posdebsection+","+posfinsection+"\')\"><img id=\""+secimg+"\" class=\"actions_zero\" src=\"./images/cb.png\" onContextMenu=\"selectSection(\'"+nbSectionInCarte+"\');\"/></a>";			
			    }
			    nbSectionInCarte = nbSectionInCarte + 1;
			    contentxt="";
			    carteSource+= "</p></div>"; 
			}
			else {
			    contentxt="";
			    carteSource+= "</p></div>"; 
			}
			posdebsection=posfinsection+1;
			posfinsection=posdebsection;
			isQueryTextInSection=0;
		    }
		}
	    }
	}
	contentxt="";
	isQueryTextInSection=0;		
	for (var pos=positionFinVolet1;pos<positionsurlatrame;pos++) {
	    if (pos in DicoDesPositionsDesPartiesPourSections) {
		if (DicoDesPositionsDesPartiesPourSections[pos] != "ENDPARTIE") {
		    carteCible+= "<div class=\"sectionPartie\">"+DicoDesPositionsDesPartiesPourSections[pos]+"<p align=\"left\">";
		}
	    }
	    var item = DictionnaireNumDesItems[trameForme[pos][annotationencoursIndex]];
	    var itemForme = dicNum2forme[trameForme[pos][0]];
	    if (!(dicNum2forme[trameForme[pos][0]] in dictionnairedesdelims))  {
		contentxt+=item;/*+"("+trameForme[index]+")";*/
		nbMotBitextCible=nbMotBitextCible+1;
		if (DictionnaireBitextCible[item] === undefined) {
		    DictionnaireBitextCible[item]=1;
		}
		else {
		    DictionnaireBitextCible[item]=DictionnaireBitextCible[item]+1
		}
		if ((queryTextC != '') && (queryTextC != 'entrez la forme pôle') && (isQueryTextInSection ==0)) {
		    for (var j=0;j<listQueryTextOutputC.length;j++) {
			if (item==listQueryTextOutputC[j]) {
			    isQueryTextInSection++;
			}
		    }
		}
	    }
	    else {
		contentxt+=item;
		if (itemForme == contexteDelim) {
		    contentxt = contentxt.replace(/\n/g, ' ');
		    contentxt = contentxt.replace(/\s+/g, ' ');
		    posfinsection=pos;
		    if ((contentxt!=' ')){
			LISTESCONTEXTES[nbSectionInCarte]=posdebsection+":"+posfinsection;
			LISTESCONTEXTESCIBLE[nbSectionInCarte]=posdebsection+":"+posfinsection;
			dicoCorrespondancePositionsSectionsInBitext[nbSectionInCarte]=posdebsection+":"+posfinsection;
			nbAlignCible++;
			if (isQueryTextInSection > 0 ) {
			    var secimg="S"+nbSectionInCarte;
			    DictionnaireSelectSection.push(LISTESCONTEXTES[nbSectionInCarte]);
			    ListSelectSection[nbSectionInCarte]=1;
			    carteCible+= "<a href=\"javascript:onclickSection(\'"+nbSectionInCarte+","+posdebsection+","+posfinsection+"\')\"><img id=\""+secimg+"\" class=\"actions_one actions_select\" src=\"./images/cr.png\" onContextMenu=\"selectSection(\'"+nbSectionInCarte+"\');\"/></a>";
			    FlagSectionCarteCible[nbAlignCible]=1;
			}
			else {
			    FlagSectionCarteCible[nbAlignCible]=0;
			    var secimg="S"+nbSectionInCarte;
			    carteCible+= "<a href=\"javascript:onclickSection(\'"+nbSectionInCarte+","+posdebsection+","+posfinsection+"\')\"><img id=\""+secimg+"\" class=\"actions_zero\" src=\"./images/cb.png\" onContextMenu=\"selectSection(\'"+nbSectionInCarte+"\');\"/></a>";			
			}
			nbSectionInCarte = nbSectionInCarte + 1;
			contentxt="";
		    }
		    else {
			contentxt="";
		    }
		    posdebsection=posfinsection+1;
		    posfinsection=posdebsection;
		    isQueryTextInSection=0;
		}
	    }
	    if (pos in DicoDesPositionsDesPartiesPourSections) {
		if (DicoDesPositionsDesPartiesPourSections[pos] == "ENDPARTIE") {
		    contentxt = contentxt.replace(/\n/g, ' ');
		    contentxt = contentxt.replace(/\s+/g, ' ');
		    posfinsection=pos;
		    if ((contentxt!=' ')){
			LISTESCONTEXTES[nbSectionInCarte]=posdebsection+":"+posfinsection;
			LISTESCONTEXTESCIBLE[nbSectionInCarte]=posdebsection+":"+posfinsection;
			dicoCorrespondancePositionsSectionsInBitext[nbSectionInCarte]=posdebsection+":"+posfinsection;
			nbAlignCible++;
			if (isQueryTextInSection > 0 ) {
			    var secimg="S"+nbSectionInCarte;
			    DictionnaireSelectSection.push(LISTESCONTEXTES[nbSectionInCarte]);
			    ListSelectSection[nbSectionInCarte]=1;
			    carteCible+= "<a href=\"javascript:onclickSection(\'"+nbSectionInCarte+","+posdebsection+","+posfinsection+"\')\"><img id=\""+secimg+"\" class=\"actions_one actions_select\" src=\"./images/cr.png\" onContextMenu=\"selectSection(\'"+nbSectionInCarte+"\');\"/></a>";
			    FlagSectionCarteCible[nbAlignCible]=1;
			}
			else {
			    FlagSectionCarteCible[nbAlignCible]=0;
			    var secimg="S"+nbSectionInCarte;
			    carteCible+= "<a href=\"javascript:onclickSection(\'"+nbSectionInCarte+","+posdebsection+","+posfinsection+"\')\"><img id=\""+secimg+"\" class=\"actions_zero\" src=\"./images/cb.png\" onContextMenu=\"selectSection(\'"+nbSectionInCarte+"\');\"/></a>";			
			}
			nbSectionInCarte = nbSectionInCarte + 1;
			contentxt="";
			carteCible+= "</p></div>"; 
		    }
		    else {
			contentxt="";
			carteCible+= "</p></div>"; 
		    }
		    posdebsection=posfinsection+1;
		    posfinsection=posdebsection;
		    isQueryTextInSection=0;
		}
	    }
	}
	console.log("NbS : "+nbAlignSource+" | NbC : "+nbAlignCible+" | NBgb : "+nbSectionGlobalForBitext+" | NBsct: "+nbSectionInCarte);
	if ((nbAlignSource != nbAlignCible) || (nbSectionGlobalForBitext != nbSectionInCarte) ){
	    document.getElementById('bitextID').checked=false;
	    yesnoCheck();
	    var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Nombre de sections différent dans les 2 volets...</span></small>';
	    $("#placeholder").html(vide);
	    dicoCorrespondancePositionsSectionsInBitext= new Object();
	    DictionnaireSelectSection = [];
	    DictionnaireBitextSource= new Object(); // or just {} 
	    DictionnaireBitextCible= new Object(); // or just {} 
	    LISTESCONTEXTES= new Object(); // or just {} 
	    LISTESCONTEXTESSOURCE= new Object(); // or just {} 
	    LISTESCONTEXTESCIBLE= new Object(); // or just {} 
	    ListSelectSection = new Object();
	    nbSectionInCarte=0;
	    nbMotBitextCible=0;
	    nbMotBitextSource=0;
	    return;
	}
	else {
	    
	    carteCible+= "</p></div>"; 
	    carteSource+= "</p></div>"; 

	    var carteglobal='<div id="placeholderSource">'+carteSource+'</div><div id="placeholderCible">'+carteCible+'</div>';
	    carteglobal+='<p><span style="font-family: Tahoma,sans-serif; font-size: 70%; padding: 1px; border-right: 1px solid rgb(204, 153, 0); border-bottom: 1px solid rgb(204, 153, 0);border-left: 1px solid rgb(204, 153, 0);border-top: 1px solid rgb(204, 153, 0);"><b>Légende Carte</b> : <img src="./images/cr.png" style="background-color:yellow;border:1px solid black"/> Présence dans Source et Cible | <img src="./images/cr.png" style="background-color:#33cc33;border:1px solid black"/>&nbsp;<img src="./images/cb.png" style="background-color:#33cc33;border:1px solid black"/> Présence dans un volet, absence dans l\'autre | <img src="./images/cb.png" style="border:1px solid black"/> Absence</span><br/>';
	    carteglobal+="<span style=\"font-size:0.7em\">Clic sur section : affichage contexte | Clic-droit sur section : sélection section</span></p>";
	    

	    document.getElementById('placeholder2').style.height = "300px";
	    $("#placeholder2").html(carteglobal);

	    isTheCarteDesSectionsOK=1;
	    /*document.getElementById('placeholder').innerHTML = '';*/
	    for (var nbsect=1;nbsect<=nbAlignSource;nbsect++) {
		if ((FlagSectionCarteCible[nbsect]==1) && (FlagSectionCarteSource[nbsect]==1)) {
		    var nbsectmp=nbsect-1;
		    var secnb="S"+nbsectmp;
		    /*alert(secnb);*/
		    document.getElementById(secnb).classList.remove('actions_zero');
		    document.getElementById(secnb).classList.remove('actions_one');
		    document.getElementById(secnb).classList.add('actions_Inter');
		}
		if ((FlagSectionCarteCible[nbsect]==0) && (FlagSectionCarteSource[nbsect]==1)) {
		    var nbsectmp=nbsect-1;
		    var secnb="S"+nbsectmp;
		    document.getElementById(secnb).classList.remove('actions_zero');
		    document.getElementById(secnb).classList.remove('actions_one');
		    document.getElementById(secnb).classList.add('actions_pasinter');									
		}
		if ((FlagSectionCarteCible[nbsect]==1) && (FlagSectionCarteSource[nbsect]==0)) {
		    var nbsectmp=nbsect-1;
		    var secnb="S"+nbsectmp;
		    document.getElementById(secnb).classList.remove('actions_zero');
		    document.getElementById(secnb).classList.remove('actions_one');
		    document.getElementById(secnb).classList.add('actions_pasinter2');										
		}
		if ((FlagSectionCarteCible[nbsect]==0) && (FlagSectionCarteSource[nbsect]==0)) {
		    var nbsectmp=nbsect-1;
		    var secnb="S"+nbsectmp;
		    document.getElementById(secnb).classList.remove('actions_one');
		    document.getElementById(secnb).classList.add('actions_zero');										
		}
		
	    }
	    for (var nbsect=nbAlignSource+1;nbsect<=(nbAlignSource+nbAlignCible);nbsect++) {
		var flag=nbsect-nbAlignSource;
		if ((FlagSectionCarteCible[flag]==1) && (FlagSectionCarteSource[flag]==1)) {
		    var nbsectmp=nbsect-1;
		    var secnb="S"+nbsectmp;
		    document.getElementById(secnb).classList.remove('actions_zero');
		    document.getElementById(secnb).classList.remove('actions_one');
		    document.getElementById(secnb).classList.add('actions_Inter');
		}
		if ((FlagSectionCarteCible[flag]==0) && (FlagSectionCarteSource[flag]==1)) {
		    var nbsectmp=nbsect-1;
		    var secnb="S"+nbsectmp;
		    document.getElementById(secnb).classList.remove('actions_zero');
		    document.getElementById(secnb).classList.remove('actions_one');
		    document.getElementById(secnb).classList.add('actions_pasinter2');									
		}
		if ((FlagSectionCarteCible[flag]==1) && (FlagSectionCarteSource[flag]==0)) {
		    var nbsectmp=nbsect-1;
		    var secnb="S"+nbsectmp;
		    document.getElementById(secnb).classList.remove('actions_zero');
		    document.getElementById(secnb).classList.remove('actions_one');
		    document.getElementById(secnb).classList.add('actions_pasinter');										
		}
		if ((FlagSectionCarteCible[flag]==0) && (FlagSectionCarteSource[flag]==0)) {
		    var nbsectmp=nbsect-1;
		    var secnb="S"+nbsectmp;
		    document.getElementById(secnb).classList.remove('actions_one');
		    document.getElementById(secnb).classList.add('actions_zero');										
		}
		
	    }
	}
	
    }
}
//-----------------------------------------------------------------------------------
function selectionSectionsIntersection() {
    if (FILEINPUTTOREAD == "") {
		return;
    }
    if (isTheCarteDesSectionsOK ==0) {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger la carte des sections...</span></small>';
	$("#placeholder").html(vide);
	return;
    }
    deselectSection();
    var nbSectionSource = Number(nbSectionGlobalForBitext)/2;
    for (var nbsect in FlagSectionCarteSource) {
	nbsect=Number(nbsect);
	if ((FlagSectionCarteCible[nbsect]==1) && (FlagSectionCarteSource[nbsect]==1)) {
	    var nbsectmp1=nbsect-1;
	    var secnb1="S"+nbsectmp1;
	    /*alert(secnb);*/
	    document.getElementById(secnb1).classList.remove('actions_zero');
	    document.getElementById(secnb1).classList.remove('actions_one');
	    document.getElementById(secnb1).classList.add('actions_Inter');
	    var nbsectmp2=nbsect+nbSectionSource-1;
	    var secnb2="S"+nbsectmp2; // ERREUR ????
	    document.getElementById(secnb2).classList.remove('actions_zero');
	    document.getElementById(secnb2).classList.remove('actions_one');
	    document.getElementById(secnb2).classList.add('actions_Inter');
	    selectSection(nbsectmp1);
	    selectSection(nbsectmp2);
	}
    }
}
function selectionSectionsIntersectionS() {
    if (FILEINPUTTOREAD == "") {
		return;
    }
	if (isTheCarteDesSectionsOK ==0) {
	    var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger la carte des sections...</span></small>';
	    $("#placeholder").html(vide);		
	    return;
    }
	
	deselectSection();
	var nbSectionSource = Number(nbSectionGlobalForBitext)/2;
	for (var nbsect in FlagSectionCarteSource) {
		nbsect=Number(nbsect);
		if ((FlagSectionCarteCible[nbsect]==1) && (FlagSectionCarteSource[nbsect]==1)) {
		    var nbsectmp1=nbsect-1;
		    var secnb1="S"+nbsectmp1;
		    /*alert(secnb);*/
		    document.getElementById(secnb1).classList.remove('actions_zero');
		    document.getElementById(secnb1).classList.remove('actions_one');
		    document.getElementById(secnb1).classList.add('actions_Inter');
			selectSection(nbsectmp1);
		}
	}

}
function selectionSectionsIntersectionC() {
    if (FILEINPUTTOREAD == "") {
		return;
    }
    if (isTheCarteDesSectionsOK ==0) {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger la carte des sections...</span></small>';
	$("#placeholder").html(vide);		
	return;
    }
    
    deselectSection();
    var nbSectionSource = Number(nbSectionGlobalForBitext)/2;
    for (var nbsect in FlagSectionCarteSource) {
	nbsect=Number(nbsect);
	if ((FlagSectionCarteCible[nbsect]==1) && (FlagSectionCarteSource[nbsect]==1)) {
	    var nbsectmp2=nbsect+nbSectionSource-1;
	    var secnb2="S"+nbsectmp2;
	    document.getElementById(secnb2).classList.remove('actions_zero');
	    document.getElementById(secnb2).classList.remove('actions_one');
		    document.getElementById(secnb2).classList.add('actions_Inter');
	    selectSection(nbsectmp2);
	}
    }
    
}

function selectionSectionsPresence() {
    if (FILEINPUTTOREAD == "") {
	return;
    }
    if (isTheCarteDesSectionsOK ==0) {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger la carte des sections...</span></small>';
	$("#placeholder").html(vide);		
	return;
    }
    
    deselectSection();
    var nbSectionSource = Number(nbSectionGlobalForBitext)/2;
    for (var nbsect in FlagSectionCarteSource) {
	nbsect=Number(nbsect);
	if ((FlagSectionCarteCible[nbsect]==0) && (FlagSectionCarteSource[nbsect]==1)) {
	    var nbsectmp1=nbsect-1;
	    var secnb1="S"+nbsectmp1;
	    /*alert(secnb);*/
	    document.getElementById(secnb1).classList.remove('actions_zero');
	    document.getElementById(secnb1).classList.remove('actions_one');
	    document.getElementById(secnb1).classList.add('actions_pasinter');									
	    selectSection(nbsectmp1);
	}
	if ((FlagSectionCarteCible[nbsect]==1) && (FlagSectionCarteSource[nbsect]==0)) {
	    var nbsectmp2=nbsect+nbSectionSource-1;
	    var secnb2="S"+nbsectmp2;
	    document.getElementById(secnb2).classList.remove('actions_zero');
	    document.getElementById(secnb2).classList.remove('actions_one');
	    document.getElementById(secnb2).classList.add('actions_pasinter');									
	    selectSection(nbsectmp2);
	}
    }
    
}
function selectionSectionsPresenceS() {
    if (FILEINPUTTOREAD == "") {
	return;
    }
    if (isTheCarteDesSectionsOK ==0) {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger la carte des sections...</span></small>';
	$("#placeholder").html(vide);		return;
    }
    
    deselectSection();
    var nbSectionSource = Number(nbSectionGlobalForBitext)/2;
    for (var nbsect in FlagSectionCarteSource) {
	nbsect=Number(nbsect);
	if ((FlagSectionCarteCible[nbsect]==0) && (FlagSectionCarteSource[nbsect]==1)) {
	    var nbsectmp1=nbsect-1;
	    var secnb1="S"+nbsectmp1;
	    /*alert(secnb);*/
	    document.getElementById(secnb1).classList.remove('actions_zero');
	    document.getElementById(secnb1).classList.remove('actions_one');
	    document.getElementById(secnb1).classList.add('actions_pasinter');									
	    selectSection(nbsectmp1);
	}
    }
    
}
function selectionSectionsPresenceC() {
    if (FILEINPUTTOREAD == "") {
	return;
    }
    if (isTheCarteDesSectionsOK ==0) {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger la carte des sections...</span></small>';
	$("#placeholder").html(vide);		
	return;
    }
    
    deselectSection();
    var nbSectionSource = Number(nbSectionGlobalForBitext)/2;
    for (var nbsect in FlagSectionCarteSource) {
	nbsect=Number(nbsect);
	if ((FlagSectionCarteCible[nbsect]==1) && (FlagSectionCarteSource[nbsect]==0)) {
	    var nbsectmp2=nbsect+nbSectionSource-1;
	    var secnb2="S"+nbsectmp2;
	    document.getElementById(secnb2).classList.remove('actions_zero');
	    document.getElementById(secnb2).classList.remove('actions_one');
	    document.getElementById(secnb2).classList.add('actions_pasinter');									
	    selectSection(nbsectmp2);
	}
    }
    
}


//-----------------------------------------------------------------------------------
function onclickSection(info) {
    var ARG=info.split(",");
    var nbSection=ARG[0];
    var deb=Number(ARG[1]);
    var fin=Number(ARG[2]);
    var DictionnaireNumDesItems = new Object();	
    var DictionnaireDesItems = new Object();
    var DictionnaireDesItemsOut = new Object();
    var DictionnaireNumDesItemsOut = new Object();
    if (nombredannotation > 1 ) {
	if (annotationencours==1) {
	    DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
	    DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
	    if (annotationencours != annotationencoursOUT) {
		if (annotationencoursOUT==2) {
		    DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireLemme);
		    DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2lemme);
		}
		if (annotationencoursOUT==3) {
		    DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireCategorie);
		    DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2categorie);
		}
		if (annotationencoursOUT>3) {
		    DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
		    DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
		}
	    }
	    else {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireSource);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2forme);
	    }
	}
	if (annotationencours==2) {
	    DictionnaireDesItems = jQuery.extend({}, DictionnaireLemme);
	    DictionnaireNumDesItems=jQuery.extend({}, dicNum2lemme);
	    if (annotationencours != annotationencoursOUT) {
		if (annotationencoursOUT==1) {
		    DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireSource);
		    DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2forme);
		}
		if (annotationencoursOUT==3) {
		    DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireCategorie);
		    DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2categorie);
		}
		if (annotationencoursOUT>3) {
		    DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
		    DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
		}
	    }
	    else {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireLemme);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2lemme);
	    }
	}
	if (annotationencours==3) {
	    DictionnaireDesItems = jQuery.extend({}, DictionnaireCategorie);
	    DictionnaireNumDesItems=jQuery.extend({}, dicNum2categorie);
	    if (annotationencours != annotationencoursOUT) {
		if (annotationencoursOUT==1) {
		    DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireSource);
		    DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2forme);
		}
		if (annotationencoursOUT==2) {
		    DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireLemme);
		    DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2lemme);
		}
		if (annotationencoursOUT>3) {
		    DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
		    DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
		}
	    }
	    else {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireCategorie);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2categorie);
	    }
	}
	if (annotationencours>3) {
	    DictionnaireDesItems = jQuery.extend({}, DictionnaireAnnotation);
	    DictionnaireNumDesItems=jQuery.extend({}, dicNum2annotation);
	    if (annotationencours != annotationencoursOUT) {
		if (annotationencoursOUT==1) {
		    DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireSource);
		    DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2forme);
		}
		if (annotationencoursOUT==2) {
		    DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireLemme);
		    DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2lemme);
		}
		if (annotationencoursOUT==3) {
		    DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireCategorie);
		    DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2categorie);
		}
		if (annotationencoursOUT>3) {
		    DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
		    DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
		}
	    }
	    else {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
	    }
	}
    }
    else {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
	DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireSource);
	DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2forme);
    }
    var annotationencoursIndex=annotationencours-1;
    var annotationencoursIndexOUT=annotationencoursOUT-1;
    //alert(nbSection+":"+deb+":"+fin);
    document.getElementById('page-analysis').innerHTML = "";
    /*for (var i=0; i<nbSectionInCarte;i++) {
      var secnbS="S"+i;
      document.getElementById(secnbS).setAttribute("class","actions_zero");
      }*/
    var inputBitext = document.getElementById ("bitextID");
    var isCheckedBitext = inputBitext.checked;
    if (!(isCheckedBitext)) {		
	var secnbS="S"+nbSection;
	var queryText=document.getElementById('poleID').value;
	// on cherche si plusieurs pôles ont été fournis 
	var reg0=new RegExp(" +$", "g"); 
	queryText=queryText.replace(reg0,"");
	var reg1=new RegExp("^ +", "g"); 
	queryText=queryText.replace(reg1,"");
	var reg2=new RegExp(" +", "g"); 
	queryText=queryText.replace(reg2," ");
	var listQueryTextInput = queryText.split(" ");
	var listQueryTextOutput=[];
	
	for (var j=0;j<listQueryTextInput.length;j++) {
	    if (annotationencours <=3 ) {
		if (listQueryTextInput[j] in DictionnaireDesItems)  {
		    listQueryTextOutput.push(listQueryTextInput[j]);
		}
	    }
	    else {
		var tmpannot = annotationencours+"//"+listQueryTextInput[j];
		if (tmpannot in DictionnaireDesItems)  {
		    listQueryTextOutput.push(listQueryTextInput[j]);
		}	
	    }
	}
	
	//var contentxt = LISTESCONTEXTES[nbSection];
	var contentxt ="";
	for (var i=deb;i<=fin;i++){		
	    if ((queryText != '') && (queryText != 'entrez la forme pôle')) {	
		var VerifSiPole=0;
		
		for (var j=0;j<listQueryTextInput.length;j++) {
		    if (listQueryTextOutput[j] == DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]]) {
			VerifSiPole++;
		    }
		}
		
		if (VerifSiPole > 0) {
		    if (nombredannotation > 1 ) {
			if (nombredannotation > 3) {
			    contentxt+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]];
			    for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
				var kk=tmpAnnot+1;
				contentxt+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[i][tmpAnnot]];
			    }
			    contentxt+="</p>')\" onmouseout=\"UnTip()\" rel=\""+i+"\"><span id=\"w_"+i+"\" class=\"matchinsection\">"+DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]]+"</span></a>";
			}
			else {
			    contentxt+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+i+"\"><span id=\"w_"+i+"\" class=\"matchinsection\">"+DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]]+"</span></a>";
			}						
		    }	
		    else {
			contentxt+="<span id=\"w_"+i+"\" class=\"matchinsection\">"+DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]]+"</span>";
		    }
		}
		else {
		    if ((nombredannotation > 1 ) && (!(dicNum2forme[trameForme[i][0]] in dictionnairedesdelims ))) {
			if (nombredannotation > 3) {
			    contentxt+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]];
			    for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
				var kk=tmpAnnot+1;
				contentxt+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[i][tmpAnnot]];
			    }
			    contentxt+="</p>')\" onmouseout=\"UnTip()\" rel=\""+i+"\"><span id=\"w_"+i+"\">"+DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]]+"</span></a>";
			}
			else {
			    contentxt+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+i+"\"><span id=\"w_"+i+"\">"+DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]]+"</span></a>";
			}
		    }
		    else {
			contentxt+="<span id=\"w_"+i+"\">"+DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]]+"</span>";
			
		    }
		}
	    }
	    else {
		if ((nombredannotation > 1 ) && (!(dicNum2forme[trameForme[i][0]] in dictionnairedesdelims ))) {
		    if (nombredannotation > 3) {
			contentxt+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]];
			for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
			    var kk=tmpAnnot+1;
			    contentxt+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[i][tmpAnnot]];
			}
			contentxt+="</p>')\" onmouseout=\"UnTip()\" rel=\""+i+"\"><span id=\"w_"+i+"\">"+DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]]+"</span></a>";
		    }
		    else {
			contentxt+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+i+"\"><span id=\"w_"+i+"\">"+DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]]+"</span></a>";
		    }
		}
		else {
		    contentxt+="<span id=\"w_"+i+"\">"+DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]]+"</span>";
		}
	    }
	}
	var nbSection2print=Number(nbSection)+1;
	var texte2insert = '<div id="contextehtml"><small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:#FDBBD2">SECTION N°'+nbSection2print+'</span></small><br/>';
	texte2insert += "<div style=\"border:3px dotted #cccccc;border-radius:4px;background:#f4f4f4;\"><blockquote><p style=\"text-align: justify;text-indent: 50px\"><span style=\"font-size:1em;\">" + contentxt + "</span></p></blockquote></div>";
	texte2insert += "<p>&nbsp;</p></div>";
	document.getElementById('page-analysis').innerHTML += texte2insert;
	displaySRonSection(deb+","+fin);
	displaySelectiononSection(deb+","+fin);
    }
    else {
	var secnb="S"+nbSection;
	var queryTextS=document.getElementById('poleID').value;
	// on cherche si plusieurs pôles ont été fournis 
	var reg0=new RegExp(" +$", "g"); 
	queryTextS=queryTextS.replace(reg0,"");
	var reg1=new RegExp("^ +", "g"); 
	queryTextS=queryTextS.replace(reg1,"");
	var reg2=new RegExp(" +", "g"); 
	queryTextS=queryTextS.replace(reg2," ");
	var listQueryTextInput = queryTextS.split(" ");
	var listQueryTextOutput=[];
	for (var j=0;j<listQueryTextInput.length;j++) {
	    if (annotationencours <=3 ) {
		if (listQueryTextInput[j] in DictionnaireDesItems)  {
		    listQueryTextOutput.push(listQueryTextInput[j]);
		}
	    }
	    else {
		var tmpannot = annotationencours+"//"+listQueryTextInput[j];
		if (tmpannot in DictionnaireDesItems)  {
		    listQueryTextOutput.push(listQueryTextInput[j]);
		}	
	    }
	}
	var queryTextC=document.getElementById('poleCibleID').value;
	// on cherche si plusieurs pôles ont été fournis 
	var reg0=new RegExp(" +$", "g"); 
	queryTextC=queryTextC.replace(reg0,"");
	var reg1=new RegExp("^ +", "g"); 
	queryTextC=queryTextC.replace(reg1,"");
	var reg2=new RegExp(" +", "g"); 
	queryTextC=queryTextC.replace(reg2," ");
	var listQueryTextInputC = queryTextC.split(" ");
	var listQueryTextOutputC=[];
	for (var j=0;j<listQueryTextInputC.length;j++) {
	    if (annotationencours <=3 ) {
		if (listQueryTextInputC[j] in DictionnaireDesItems)  {
		    listQueryTextOutputC.push(listQueryTextInputC[j]);
		}
	    }
	    else {
		var tmpannot = annotationencours+"//"+listQueryTextInputC[j];
		if (tmpannot in DictionnaireDesItems)  {
		    listQueryTextOutputC.push(listQueryTextInputC[j]);
		}	
	    }
	}
	var nbSectionInput=Number(nbSection);
	var nbSectionS;
	var nbSectionC;
	if (nbSectionInput > ((nbSectionInCarte / 2)-1)) { 
	    nbSectionS=nbSectionInput - (nbSectionInCarte/2);
	    nbSectionC=nbSectionInput;
	}
	else {
	    nbSectionS = nbSectionInput;
	    nbSectionC= (nbSectionInCarte/2) + nbSectionInput;
	}	 
	var contentxtS = "";//LISTESCONTEXTES[nbSectionS];
	var contentxtC = "";//LISTESCONTEXTES[nbSectionC];
	var texte2insert = '<div id="contextehtml">';
	/*alert("S:"+nbSectionS);
	  alert("C:"+nbSectionC);*/
	var positionsS=dicoCorrespondancePositionsSectionsInBitext[nbSectionS].split(":");
	var posSdeb=Number(positionsS[0]);
	var posSfin=Number(positionsS[1]);
	var positionsC=dicoCorrespondancePositionsSectionsInBitext[nbSectionC].split(":");
	var posCdeb=Number(positionsC[0]);
	var posCfin=Number(positionsC[1]);
	for (var i=posSdeb;i<=posSfin;i++){		
	    if ((queryTextS != '') && (queryTextS != 'entrez la forme pôle')) {	
		var VerifSiPole=0;
		for (var j=0;j<listQueryTextOutput.length;j++) {
		    if (listQueryTextOutput[j] == DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]]) {
			VerifSiPole++;
		    }
		}
		if (VerifSiPole > 0) {
		    if ((nombredannotation > 1 ) && (!(dicNum2forme[trameForme[i][0]] in dictionnairedesdelims ))) {
			if (nombredannotation > 3) {
			    contentxtS+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]];
			    for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
				var kk=tmpAnnot+1;
				contentxtS+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[i][tmpAnnot]];
			    }
			    contentxtS+="</p>')\" onmouseout=\"UnTip()\" rel=\""+i+"\"><span id=\"w_"+i+"\" class=\"matchinsection\">"+DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]]+"</span></a>";
			}
			else {
			    contentxtS+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+i+"\"><span id=\"w_"+i+"\" class=\"matchinsection\">"+DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]]+"</span></a>";	
						}
		    }	
		    else {
			contentxtS+="<span id=\"w_"+i+"\" class=\"matchinsection\">"+DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]]+"</span>";
		    }
		}
		else {
		    if ((nombredannotation > 1 ) && (!(dicNum2forme[trameForme[i][0]] in dictionnairedesdelims ))) {
			if (nombredannotation > 3) {
			    contentxtS+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]];
			    for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
				var kk=tmpAnnot+1;
				contentxtS+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[i][tmpAnnot]];
			    }
			    contentxtS+="</p>')\" onmouseout=\"UnTip()\" rel=\""+i+"\"><span id=\"w_"+i+"\">"+DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]]+"</span></a>";
			}
			else {						
			    contentxtS+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+i+"\"><span id=\"w_"+i+"\">"+DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]]+"</span></a>";
			}
		    }
		    else {
			contentxtS+="<span id=\"w_"+i+"\">"+DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]]+"</span>";
		    }
		}
	    }
	    else {
		if ((nombredannotation > 1 ) && (!(dicNum2forme[trameForme[i][0]] in dictionnairedesdelims ))) {
		    if (nombredannotation > 3) {
			contentxtS+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]];
			for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
			    var kk=tmpAnnot+1;
			    contentxtS+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[i][tmpAnnot]];
			}
			contentxtS+="</p>')\" onmouseout=\"UnTip()\" rel=\""+i+"\"><span id=\"w_"+i+"\">"+DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]]+"</span></a>";
		    }
		    else {						
			contentxtS+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+i+"\"><span id=\"w_"+i+"\">"+DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]]+"</span></a>";
		    }
		}
		else {
		    contentxtS+="<span id=\"w_"+i+"\">"+DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]]+"</span>";
		}
	    }
	}
	for (var i=posCdeb;i<=posCfin;i++){		
	    if ((queryTextC != '') && (queryTextC != 'entrez la forme pôle')) {	
		var VerifSiPole=0;
		for (var j=0;j<listQueryTextOutputC.length;j++) {
		    if (listQueryTextOutputC[j] == DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]]) {
			VerifSiPole++;
		    }
		}	
		if (VerifSiPole > 0) {
		    if ((nombredannotation > 1 ) && (!(dicNum2forme[trameForme[i][0]] in dictionnairedesdelims ))) {
			if (nombredannotation > 3) {
			    contentxtC+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]];
			    for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
				var kk=tmpAnnot+1;
				contentxtC+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[i][tmpAnnot]];
			    }
			    contentxtC+="</p>')\" onmouseout=\"UnTip()\" rel=\""+i+"\"><span id=\"w_"+i+"\" class=\"matchinsection\">"+DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]]+"</span></a>";
			}
			else {
			    contentxtC+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+i+"\"><span id=\"w_"+i+"\" class=\"matchinsection\">"+DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]]+"</span></a>";	
						}
		    }	
		    else {
			contentxtC+="<span id=\"w_"+i+"\" class=\"matchinsection\">"+DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]]+"</span>";
		    }
		}
		else {
		    if ((nombredannotation > 1 ) && (!(dicNum2forme[trameForme[i][0]] in dictionnairedesdelims ))) {
			if (nombredannotation > 3) {
			    contentxtC+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]];
			    for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
				var kk=tmpAnnot+1;
				contentxtC+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[i][tmpAnnot]];
			    }
			    //contentxtC+="</p>')\" onmouseout=\"UnTip()\" rel=\""+i+"\"><span id=\"w_"+i+"\" class=\"matchinsection\">"+DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]]+"</span></a>";  PB ????//
			    contentxtC+="</p>')\" onmouseout=\"UnTip()\" rel=\""+i+"\"><span id=\"w_"+i+"\">"+DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]]+"</span></a>";
			}
			else {
			    contentxtC+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+i+"\"><span id=\"w_"+i+"\">"+DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]]+"</span></a>";
			}
		    }
		    else {
			contentxtC+="<span id=\"w_"+i+"\">"+DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]]+"</span>";
		    }
		}
	    }
	    else {
		if ((nombredannotation > 1 ) && (!(dicNum2forme[trameForme[i][0]] in dictionnairedesdelims ))) {
		    if (nombredannotation > 3) {
			contentxtC+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]];
			for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
			    var kk=tmpAnnot+1;
			    contentxtC+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[i][tmpAnnot]];
			}
			contentxtC+="</p>')\" onmouseout=\"UnTip()\" rel=\""+i+"\"><span id=\"w_"+i+"\">"+DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]]+"</span></a>";
		    }
		    else {						
			contentxtC+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+i+"\"><span id=\"w_"+i+"\">"+DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]]+"</span></a>";
		    }
		}
		else {
		    contentxtC+="<span id=\"w_"+i+"\">"+DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]]+"</span>";
		}
	    }
	}
	
	var nbSectionS2print=Number(nbSectionS)+1;
	var nbSectionC2print=Number(nbSectionC)+1;
	
	texte2insert += "<div id='placeholderSource1'><small><span style=\"text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:#FDBBD2\">SECTION SOURCE N°"+nbSectionS2print+"</span></small><br/><div style=\"border:3px dotted #cccccc;border-radius:4px;background:#f4f4f4;\"><blockquote><p style=\"text-align: justify;text-indent: 50px\"><span style=\"font-size:1em;\">" + contentxtS + "</span></p></blockquote></div></div><div id='placeholderCible1'><small><span style=\"text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:#FDBBD2\">SECTION CIBLE N°"+ nbSectionC2print +"</span></small><br/><div style=\"border:3px dotted #cccccc;border-radius:4px;background:#f4f4f4;\"><blockquote><p style=\"text-align: justify;text-indent: 50px\"><span style=\"font-size:1em;\">" + contentxtC + "</span></p></blockquote></div></div>";
	
	texte2insert += "<p>&nbsp;</p></div>";
	document.getElementById('page-analysis').innerHTML += texte2insert;
	displaySRonSection(posSdeb+","+posSfin+","+posCdeb+","+posCfin);
	displaySelectiononSection(posSdeb+","+posSfin+","+posCdeb+","+posCfin);
    }	
}
//-----------------------------------------------------------------------------------
function displaySelectiononSection(info) {
	var ARG=info.split(",");
	var debS;
	var finS;
	var debC;
	var finC;
	if (ARG.length == 2) {
		debS=Number(ARG[0]);
		finS=Number(ARG[1]);
		for (var i=debS; i<=finS;i++) {
			if (gestionnaireSelection[i] ==1) {
				var spanword="w_"+i;
				document.getElementById(spanword).classList.add('selectIP');	
			}
		}
		
	}
	if (ARG.length == 4) {
		debS=Number(ARG[0]);
		finS=Number(ARG[1]);
		debC=Number(ARG[2]);
		finC=Number(ARG[3]);
		for (var i=debS; i<=finS;i++) {
			if (gestionnaireSelection[i] ==1) {
				var spanword="w_"+i;
				document.getElementById(spanword).classList.add('selectIP');	
			}
		}
		for (var i=debC; i<=finC;i++) {
			if (gestionnaireSelection[i] ==1) {
				var spanword="w_"+i;
				document.getElementById(spanword).classList.add('selectIP');	
			}
		}
	}
}
//-----------------------------------------------------------------------------------
function displaySRonSection(info) {
    var ARG=info.split(",");
    var debS;
    var finS;
    var debC;
    var finC;
    var DictionnaireNumDesItems = new Object();
    var freqsegmentSR=document.getElementById('srfqID').value;
    if (nombredannotation > 1 ) {
	if (annotationencours==1) {
	    DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);	
	}
	if (annotationencours==2) {
	    DictionnaireNumDesItems=jQuery.extend({}, dicNum2lemme);
	}
	if (annotationencours==3) {
	    DictionnaireNumDesItems=jQuery.extend({}, dicNum2categorie);
	}
	if (annotationencours>3) {
	    DictionnaireNumDesItems=jQuery.extend({}, dicNum2annotation);
	    DictionnaireDesItems = jQuery.extend({}, DictionnaireAnnotation);
	}
    }
    else {
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);	
    }
    var annotationencoursIndex=annotationencours-1;
    if (ARG.length == 2) {
	var queryText=document.getElementById('SRpoleID').value;
	debS=Number(ARG[0]);
	finS=Number(ARG[1]);
	for (var i=debS; i<=finS;i++) {
	    if (dictionnaireventilationdesSR[i] !== undefined) {
		var lgsr=dictionnaireventilationdesSR[i];
		var tmpsr=DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]]
		var lgtmpsr=1;
		var k=1;
		var lastpositionsr=0;
		while (lgtmpsr < lgsr) {
		    if ((dicNum2forme[trameForme[i+k][0]] in dictionnairedesdelims ) || (trameForme[i+k][0] == -1 )) {
			tmpsr=tmpsr + " ";
		    } 
		    else {
			tmpsr=tmpsr + DictionnaireNumDesItems[trameForme[i+k][annotationencoursIndex]]
			lgtmpsr++;
		    }
		    lastpositionsr=i+k;
		    k++;	
		}
		var reg0=new RegExp(" +$", "g"); 
		tmpsr=tmpsr.replace(reg0,"");
		var reg1=new RegExp(" +", "g"); 
		tmpsr=tmpsr.replace(reg1," ");
		var reg2=new RegExp("^ ", "g"); 
		tmpsr=tmpsr.replace(reg2,"");
		
		if ((tmpsr in listeSROK) && (listeSROK[tmpsr] >= freqsegmentSR)) {
		    for (var kk=i;kk<=(lastpositionsr);kk++) {
			var spanword="w_"+kk;
			document.getElementById(spanword).classList.add('initSR');	
			if ((queryText != "") && (tmpsr == queryText)) {
			    document.getElementById(spanword).classList.add('initSRselect');	
			}
		    }
		}
		//-----
		if (queryText != "") {
		    var listeMotsduSR=queryText.split(" ");
		    var longueurSR=listeMotsduSR.length;
		    if (longueurSR < lgsr) {
			var tmpsr=DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
			var lgtmpsr=1;
			var k=1;
			var lastpositionsr=0;
			var tmpindex=Number(i);
			while (lgtmpsr < longueurSR) {
			    if ((dicNum2forme[trameForme[tmpindex+k][0]] in dictionnairedesdelims ) || (trameForme[tmpindex+k][0] == -1 )) {
				tmpsr=tmpsr + " ";
			    } 
			    else {
				tmpsr=tmpsr + DictionnaireNumDesItems[trameForme[tmpindex+k][annotationencoursIndex]]
				lgtmpsr++;
			    }
			    lastpositionsr=tmpindex+k;
			    k++;	
			}
			var reg0=new RegExp(" +$", "g"); 
			tmpsr=tmpsr.replace(reg0,"");
			var reg1=new RegExp(" +", "g"); 
			tmpsr=tmpsr.replace(reg1," ");	
			if ((tmpsr in listeSROK) && (listeSROK[tmpsr] >= freqsegmentSR)) {
			    for (var kk=i;kk<=(lastpositionsr);kk++) {
				var spanword="w_"+kk;
				document.getElementById(spanword).classList.add('initSR');	
				if ((queryText != "") && (tmpsr == queryText)) {
				    document.getElementById(spanword).classList.add('initSRselect');	
				}
			    }
			}
		    }
		}
		//-----
	    }
	}
    }
    if (ARG.length == 4) {
	var queryText=document.getElementById('SRpoleID').value;
	var queryTextC=document.getElementById('SRpoleCibleID').value;
	debS=Number(ARG[0]);
	finS=Number(ARG[1]);
	debC=Number(ARG[2]);
	finC=Number(ARG[3]);
	for (var i=debS; i<=finS;i++) {
	    if (dictionnaireventilationdesSR[i] !== undefined) {
		var lgsr=dictionnaireventilationdesSR[i];
		var tmpsr=DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]]
		var lgtmpsr=1;
		var k=1;
		var lastpositionsr=0;
		while (lgtmpsr < lgsr) {
		    if ((dicNum2forme[trameForme[i+k][0]] in dictionnairedesdelims ) || (trameForme[i+k][0] == -1 )) {
			tmpsr=tmpsr + " ";
		    } 
		    else {
			tmpsr=tmpsr + DictionnaireNumDesItems[trameForme[i+k][annotationencoursIndex]]
			lgtmpsr++;
		    }
		    lastpositionsr=i+k;
		    k++;	
		}
		var reg0=new RegExp(" +$", "g"); 
		tmpsr=tmpsr.replace(reg0,"");
		var reg1=new RegExp(" +", "g"); 
		tmpsr=tmpsr.replace(reg1," ");
		var reg2=new RegExp("^ ", "g"); 
		tmpsr=tmpsr.replace(reg2,"");
		if ((tmpsr in listeSROK) && (listeSROK[tmpsr] >= freqsegmentSR)) {
		    for (var kk=i;kk<=(lastpositionsr);kk++) {
			var spanword="w_"+kk;
			document.getElementById(spanword).classList.add('initSR');	
			if ((queryText != "") && (tmpsr == queryText)) {
			    document.getElementById(spanword).classList.add('initSRselect');	
			}
		    }
		}
		//-----
		if (queryText != "") {
		    var listeMotsduSR=queryText.split(" ");
		    var longueurSR=listeMotsduSR.length;
		    if (longueurSR < lgsr) {
			var tmpsr=DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
			var lgtmpsr=1;
			var k=1;
			var lastpositionsr=0;
			var tmpindex=Number(i);
			while (lgtmpsr < longueurSR) {
			    if ((dicNum2forme[trameForme[tmpindex+k][0]] in dictionnairedesdelims ) || (trameForme[tmpindex+k][0] == -1 )) {
				tmpsr=tmpsr + " ";
			    } 
			    else {
				tmpsr=tmpsr + DictionnaireNumDesItems[trameForme[tmpindex+k][annotationencoursIndex]]
				lgtmpsr++;
			    }
			    lastpositionsr=tmpindex+k;
			    k++;	
			}
			var reg0=new RegExp(" +$", "g"); 
			tmpsr=tmpsr.replace(reg0,"");
			var reg1=new RegExp(" +", "g"); 
			tmpsr=tmpsr.replace(reg1," ");	
			if ((tmpsr in listeSROK) && (listeSROK[tmpsr] >= freqsegmentSR)) {
			    for (var kk=i;kk<=(lastpositionsr);kk++) {
				var spanword="w_"+kk;
				document.getElementById(spanword).classList.add('initSR');	
				if ((queryText != "") && (tmpsr == queryText)) {
				    document.getElementById(spanword).classList.add('initSRselect');	
				}
			    }
			}
		    }
		}
		//-----
	    }
	}
	for (var i=debC; i<=finC;i++) {
	    if (dictionnaireventilationdesSR[i] !== undefined) {
		var lgsr=dictionnaireventilationdesSR[i];
		var tmpsr=DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]]
		var lgtmpsr=1;
		var k=1;
		var lastpositionsr=0;
		while (lgtmpsr < lgsr) {
		    if ((dicNum2forme[trameForme[i+k][0]] in dictionnairedesdelims ) || (trameForme[i+k][0] == -1 )) {
			tmpsr=tmpsr + " ";
		    } 
		    else {
			tmpsr=tmpsr + DictionnaireNumDesItems[trameForme[i+k][annotationencoursIndex]]
			lgtmpsr++;
		    }
		    lastpositionsr=i+k;
		    k++;	
		}
		var reg0=new RegExp(" +$", "g"); 
		tmpsr=tmpsr.replace(reg0,"");
		var reg1=new RegExp(" +", "g"); 
		tmpsr=tmpsr.replace(reg1," ");
		var reg2=new RegExp("^ ", "g"); 
		tmpsr=tmpsr.replace(reg2,"");
		if ((tmpsr in listeSROK) && (listeSROK[tmpsr] >= freqsegmentSR)) {
		    for (var kk=i;kk<=(lastpositionsr);kk++) {
			var spanword="w_"+kk;
			document.getElementById(spanword).classList.add('initSR');	
			if ((queryTextC != "") && (tmpsr == queryTextC)) {
			    document.getElementById(spanword).classList.add('initSRselect');	
			}
		    }
		}
		//-----
		if (queryTextC != "") {
		    var listeMotsduSR=queryTextC.split(" ");
		    var longueurSR=listeMotsduSR.length;
		    if (longueurSR < lgsr) {
			var tmpsr=DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
			var lgtmpsr=1;
			var k=1;
			var lastpositionsr=0;
			var tmpindex=Number(i);
			while (lgtmpsr < longueurSR) {
			    if ((dicNum2forme[trameForme[tmpindex+k][0]] in dictionnairedesdelims ) || (trameForme[tmpindex+k][0] == -1 )) {
				tmpsr=tmpsr + " ";
			    } 
			    else {
				tmpsr=tmpsr + DictionnaireNumDesItems[trameForme[tmpindex+k][annotationencoursIndex]]
				lgtmpsr++;
			    }
			    lastpositionsr=tmpindex+k;
			    k++;	
			}
			var reg0=new RegExp(" +$", "g"); 
			tmpsr=tmpsr.replace(reg0,"");
			var reg1=new RegExp(" +", "g"); 
			tmpsr=tmpsr.replace(reg1," ");	
			if ((tmpsr in listeSROK) && (listeSROK[tmpsr] >= freqsegmentSR)) {
			    for (var kk=i;kk<=(lastpositionsr);kk++) {
				var spanword="w_"+kk;
				document.getElementById(spanword).classList.add('initSR');	
				if ((queryTextC != "") && (tmpsr == queryTextC)) {
				    document.getElementById(spanword).classList.add('initSRselect');	
				}
			    }
			}
		    }
		}
		//-----
	    }
	}		
    }
}
//-----------------------------------------------------------------------------------
function onclickWordBitexte( Type ) {
    document.getElementById('contextehtml').innerHTML = "";
    queryTextSource=document.getElementById('poleID').value;
    queryTextCible=document.getElementById('poleCibleID').value;
    var LISTEMOTSTFGSource= Object.keys(DICOTFGSource);
    var LISTCOOCSource = [];
    for (var key in LISTEMOTSTFGSource) {
	LISTCOOCSource.push(LISTEMOTSTFGSource[key]);
    }
    var LISTEMOTSTFGCible= Object.keys(DICOTFGCible);
    var LISTCOOCCible = [];
    for (var key in LISTEMOTSTFGCible) {
	LISTCOOCCible.push(LISTEMOTSTFGCible[key]);
    }
    var DictionnaireDesItems = new Object();
    var DictionnaireNumDesItems = new Object();
    var DictionnaireDesItemsOut = new Object();
    var DictionnaireNumDesItemsOut = new Object();
    if (annotationencours==1) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
	if (annotationencours != annotationencoursOUT) {
	    if (annotationencoursOUT==2) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireLemme);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2lemme);
	    }
	    if (annotationencoursOUT==3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireCategorie);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2categorie);
	    }
	    if (annotationencoursOUT>3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
	    }
	}
	else {
	    DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireSource);
	    DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2forme);
	}
    }
    if (annotationencours==2) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireLemme);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2lemme);
	if (annotationencours != annotationencoursOUT) {
	    if (annotationencoursOUT==1) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireSource);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2forme);
	    }
	    if (annotationencoursOUT==3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireCategorie);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2categorie);
	    }
	    if (annotationencoursOUT>3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
	    }
	}
	else {
	    DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireLemme);
	    DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2lemme);
	}
    }
    if (annotationencours==3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireCategorie);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2categorie);
	if (annotationencours != annotationencoursOUT) {
	    if (annotationencoursOUT==1) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireSource);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2forme);
	    }
	    if (annotationencoursOUT==2) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireLemme);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2lemme);
	    }
	    if (annotationencoursOUT>3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
	    }
	}
	else {
	    DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireCategorie);
	    DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2categorie);
	}
    }
    if (annotationencours>3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireAnnotation);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2annotation);
	if (annotationencours != annotationencoursOUT) {
	    if (annotationencoursOUT==1) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireSource);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2forme);
	    }
	    if (annotationencoursOUT==2) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireLemme);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2lemme);
	    }
	    if (annotationencoursOUT==3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireCategorie);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2categorie);
	    }
	    if (annotationencoursOUT>3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
	    }
	}
	else {
	    DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
	    DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
	}
    }
    var annotationencoursIndex=annotationencours-1;
    var annotationencoursIndexOUT=annotationencoursOUT-1;
    var nbContexteWord = 0;
    var wordvalues = Type.split(',');
    var word = wordvalues[0];
    var wordType = wordvalues[1];
    var nbContexte=0;
    var resultFinal=new Array();
    if (wordType == 1) {
	for (var contexte in LISTESCONTEXTESSourceBitexte) {		
	    var infoSource =  LISTESCONTEXTESSourceBitexte[contexte].split(":");
	    var posDebS=Number(infoSource[0]);
	    var posFinS=Number(infoSource[1]);
	    var contexteC=Number(contexte);
	    var infoCible =  LISTESCONTEXTESCibleBitexte[contexteC].split(":");
	    var posDebC=Number(infoCible[0]);
	    var posFinC=Number(infoCible[1]);						
	    var DictionnaireLocal = new Object();
	    var DictionnaireLocalCible = new Object();
	    var contentxt="";
	    var contentxtCible="";
	    var verifWord=0;
	    for (var i=posDebS;i<=posFinS;i++) {
		var item=DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
		var item2=DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]];
		if (!(dicNum2forme[trameForme[i][0]] in dictionnairedesdelims)) {
		    //-----------------------------------------------------------
		    var colornode="#FFFFFF0";
		    if (DICOTFGSource.hasOwnProperty(item)) {
			var tmp=DICOTFGSource[item].toString();
			var values = tmp.split(',');
			var result=values[2];
			if (result >= 50) {colornode="#ff0000" } 
			if ((result >= 30) && (result < 50  ) ) {colornode="#ff5555" } 
			if ((result >= 20) && (result < 30  ) ) {colornode="#ff8484" } 
			if ((result >= 10) && (result < 20  ) ) {colornode="#f3838b" } 
			if ((result >= 5) && (result < 10  ) ) {colornode="#ffb0b0" } 
			if ((result >= 0) && (result < 5  ) ) {colornode="#fee7cd" } 
		    }
		    //------------------------------------------------------------
		    if ((item == word)) {
			verifWord++;
			if ((item != queryTextSource)) {
			    if (nombredannotation > 1) {
				if (nombredannotation > 3) {
				    contentxt+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]];
				    for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
					var kk=tmpAnnot+1;
					contentxt+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[i][tmpAnnot]];
				    }
				    contentxt+="</p>')\" onmouseout=\"UnTip()\" rel=\""+i+"\"><span style=\"background:"+colornode+"\">"+item2+"</span></a>";
				}
				else {
				    contentxt+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+i+"\"><span style=\"background:"+colornode+"\">"+item2+"</span></a>";
				}
			    }
			    else {
				contentxt+="<span style=\"background:"+colornode+"\">"+item2+"</span>";
			    }	
			}
		    }
		    if (item == queryTextSource) {
			if (nombredannotation > 1) {
			    if (nombredannotation > 3) {
				contentxt+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]];
				for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
				    var kk=tmpAnnot+1;
				    contentxt+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[i][tmpAnnot]];
				}
				contentxt+="</p>')\" onmouseout=\"UnTip()\" rel=\""+i+"\"><span style=\"background:"+colornode+"\">"+item2+"</span>"+"</a>";
			    }
			    else {
				contentxt+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+i+"\"><span style=\"background:"+colornode+"\">"+item2+"</span>"+"</a>";
			    }
			}
			else {
			    contentxt+="<span style=\"background:"+colornode+"\">"+item2+"</span>";
			}
		    }
		    if ((item != word) && (item != queryTextSource)) {
			if (nombredannotation > 1) {
			    if (nombredannotation > 3) {
				contentxt+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]];
				for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
				    var kk=tmpAnnot+1;
				    contentxt+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[i][tmpAnnot]];
				}
				contentxt+="</p>')\" onmouseout=\"UnTip()\" rel=\""+i+"\">"+"<span style=\"background:"+colornode+"\">"+item2+"</span>"+"</a>";
			    }
			    else {
				contentxt+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+i+"\">"+"<span style=\"background:"+colornode+"\">"+item2+"</span>"+"</a>";
			    }
			}
			else {
			    //contentxt+=item2;
			    contentxt+= "<span style=\"background:"+colornode+"\">"+item2+"</span>";
			}
		    }
		}
		else {
		    contentxt+=item2;
		}
	    }
	    for (var i=posDebC;i<=posFinC;i++) {
		var item=DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
		var item2=DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]];
		if (!(dicNum2forme[trameForme[i][0]] in dictionnairedesdelims)) {
		    //-----------------------------------------------------------
		    var colornode="#FFFFFF0";
		    if (DICOTFGCible.hasOwnProperty(item)) {
			var tmp=DICOTFGCible[item].toString();
			var values = tmp.split(',');
			var result=values[2];
			if (result >= 50) {colornode="#ff0000" } 
			if ((result >= 30) && (result < 50  ) ) {colornode="#ff5555" } 
			if ((result >= 20) && (result < 30  ) ) {colornode="#ff8484" } 
			if ((result >= 10) && (result < 20  ) ) {colornode="#f3838b" } 
			if ((result >= 5) && (result < 10  ) ) {colornode="#ffb0b0" } 
			if ((result >= 0) && (result < 5  ) ) {colornode="#fee7cd" } 
		    }
		    //------------------------------------------------------------
		    if (item == queryTextCible) {
			if (nombredannotation > 1) {
			    if (nombredannotation > 3) {
				contentxtCible+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]];
				for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
				    var kk=tmpAnnot+1;
				    contentxtCible+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[i][tmpAnnot]];
				}
				contentxtCible+="</p>')\" onmouseout=\"UnTip()\" rel=\""+i+"\"><span style=\"background:"+colornode+"\">"+item2+"</span>";
			    }
			    else {
				contentxtCible+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+i+"\"><span style=\"background:"+colornode+"\">"+item2+"</span></a>";
			    }
			}
			else {
			    contentxtCible+="<span style=\"background:"+colornode+"\">"+item2+"</span>";
			}
		    }
		    /*if ((item != word) && (item != queryTextCible)) {*/
		    if (item != queryTextCible) {
			if (nombredannotation > 1) {
			    if (nombredannotation > 3) {
				contentxtCible+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]];
				for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
				    var kk=tmpAnnot+1;
				    contentxtCible+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[i][tmpAnnot]];
				}
				contentxtCible+="</p>')\" onmouseout=\"UnTip()\" rel=\""+i+"\">"+"<span style=\"background:"+colornode+"\">"+item2+"</span>"+"</a>";
			    }
			    else {
				contentxtCible+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+i+"\">"+"<span style=\"background:"+colornode+"\">"+item2+"</span>"+"</a>";
			    }
			}
			else {
			    contentxtCible+="<span style=\"background:"+colornode+"\">"+item2+"</span>";
			}
		    }
		}
		else {
		    contentxtCible+=item2;
		}
	    }
	    if (verifWord >=1) {
		resultFinal[nbContexte]=[];
		var nbContexteTmp=nbContexte+1;;
		resultFinal[nbContexte].push(nbContexteTmp, contentxt,contentxtCible);
		nbContexte+=1;

	    }
	}			
    }
    if (wordType == 0) {
	for (var contexte in LISTESCONTEXTESCibleBitexte) {
	    var infoCible =  LISTESCONTEXTESCibleBitexte[contexte].split(":");
	    var posDebC=Number(infoCible[0]);
	    var posFinC=Number(infoCible[1]);
	    var contexteS=Number(contexte);
	    var infoSource =  LISTESCONTEXTESSourceBitexte[contexteS].split(":");
	    var posDebS=Number(infoSource[0]);
	    var posFinS=Number(infoSource[1]);
	    var DictionnaireLocal = new Object();
	    var DictionnaireLocalCible = new Object();
	    var contentxt="";
	    var contentxtCible="";
	    var verifWord=0;
	    for (var i=posDebS;i<=posFinS;i++) {
		var item=DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
		var item2=DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]];
		if (!(dicNum2forme[trameForme[i][0]] in dictionnairedesdelims)) {
		    //-----------------------------------------------------------
		    var colornode="#FFFFFF0";
		    if (DICOTFGSource.hasOwnProperty(item)) {
			var tmp=DICOTFGSource[item].toString();
			var values = tmp.split(',');
			var result=values[2];
			if (result >= 50) {colornode="#ff0000" } 
			if ((result >= 30) && (result < 50  ) ) {colornode="#ff5555" } 
			if ((result >= 20) && (result < 30  ) ) {colornode="#ff8484" } 
			if ((result >= 10) && (result < 20  ) ) {colornode="#f3838b" } 
			if ((result >= 5) && (result < 10  ) ) {colornode="#ffb0b0" } 
			if ((result >= 0) && (result < 5  ) ) {colornode="#fee7cd" } 
		    }
		    //------------------------------------------------------------
		    if (item == queryTextSource) {
			if (nombredannotation > 1) {
			    if (nombredannotation > 3) {
				contentxt+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]];
				for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
				    var kk=tmpAnnot+1;
				    contentxt+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[i][tmpAnnot]];
				}
				contentxt+="</p>')\" onmouseout=\"UnTip()\" rel=\""+i+"\"><span style=\"background:"+colornode+"\">"+item2+"</span></a>";
			    }
			    else {
				contentxt+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+i+"\"><span style=\"background:"+colornode+"\">"+item2+"</span></a>";
			    }
			}
			else {
			    contentxt+="<span style=\"background:"+colornode+"\">"+item2+"</span>";
			}
		    }
		    if (item != queryTextSource) {
			if (nombredannotation > 1) {
			    if (nombredannotation > 3) {
				contentxt+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]];
				for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
				    var kk=tmpAnnot+1;
				    contentxt+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[i][tmpAnnot]];
				}
				contentxt+="</p>')\" onmouseout=\"UnTip()\" rel=\""+i+"\">"+"<span style=\"background:"+colornode+"\">"+item2+"</span>"+"</a>";
			    }
			    else {
				contentxt+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+i+"\">"+"<span style=\"background:"+colornode+"\">"+item2+"</span>"+"</a>";
			    }
			}
			else {
			    contentxt+="<span style=\"background:"+colornode+"\">"+item2+"</span>";
			}
		    }
		}
		else {
		    contentxt+=item2;
		}
	    }
	    for (var i=posDebC;i<=posFinC;i++) {
		var item=DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
		var item2=DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]];
		if (!(dicNum2forme[trameForme[i][0]] in dictionnairedesdelims)) {
		    //-----------------------------------------------------------
		    var colornode="#FFFFFF0";
		    if (DICOTFGCible.hasOwnProperty(item)) {
			var tmp=DICOTFGCible[item].toString();
			var values = tmp.split(',');
			var result=values[2];
			if (result >= 50) {colornode="#ff0000" } 
			if ((result >= 30) && (result < 50  ) ) {colornode="#ff5555" } 
			if ((result >= 20) && (result < 30  ) ) {colornode="#ff8484" } 
			if ((result >= 10) && (result < 20  ) ) {colornode="#f3838b" } 
			if ((result >= 5) && (result < 10  ) ) {colornode="#ffb0b0" } 
			if ((result >= 0) && (result < 5  ) ) {colornode="#fee7cd" } 
		    }
		    //------------------------------------------------------------
		    if ((item == word)) {
			verifWord++;
			if ((item != queryTextCible) ) {
			    if (nombredannotation > 1) {
				if (nombredannotation > 3) {
				    contentxtCible+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]];
				    for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
					var kk=tmpAnnot+1;
					contentxtCible+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[i][tmpAnnot]];
				    }
				    contentxtCible+="</p>')\" onmouseout=\"UnTip()\" rel=\""+i+"\"><span style=\"background:"+colornode+"\">"+item2+"</span></a>";
				}
				else {
				    contentxtCible+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+i+"\"><span style=\"background:"+colornode+"\">"+item2+"</span></a>";
				}
			    }
			    else {
				contentxtCible+="<span style=\"background:"+colornode+"\">"+item2+"</span>";
			    }	
			}
		    }
		    if (item == queryTextCible) {
			if (nombredannotation > 1) {
			    if (nombredannotation > 3) {
				contentxtCible+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]];
				for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
				    var kk=tmpAnnot+1;
				    contentxtCible+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[i][tmpAnnot]];
				}
				contentxtCible+="</p>')\" onmouseout=\"UnTip()\" rel=\""+i+"\"><span style=\"background:"+colornode+"\">"+item2+"</span></a>";
			    }
			    else {
				contentxtCible+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+i+"\"><span style=\"background:"+colornode+"\">"+item2+"</span></a>";
			    }
			}
			else {
			    contentxtCible+="<span style=\"background:"+colornode+"\">"+item2+"</span>";
			}
		    }
		    if ((item != word) && (item != queryTextCible)) {
			if (nombredannotation > 1) {
			    if (nombredannotation > 3) {
				contentxtCible+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]];
				for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
				    var kk=tmpAnnot+1;
				    contentxtCible+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[i][tmpAnnot]];
				}
				contentxtCible+="</p>')\" onmouseout=\"UnTip()\" rel=\""+i+"\">"+"<span style=\"background:"+colornode+"\">"+item2+"</span>"+"</a>";
			    }
			    else {
				contentxtCible+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+i+"\">"+"<span style=\"background:"+colornode+"\">"+item2+"</span>"+"</a>";
			    }
			}
			else {
			    contentxtCible+="<span style=\"background:"+colornode+"\">"+item2+"</span>";
			}
		    }
		}
		else {
		    contentxtCible+=item2;
		}
	    }
	    if (verifWord >=1) {
		resultFinal[nbContexte]=[];
		var nbContexteTmp=nbContexte+1;;
		resultFinal[nbContexte].push(nbContexteTmp, contentxt,contentxtCible);
		nbContexte+=1;
	    }
	}
    }					
    document.getElementById('contextehtml').innerHTML = '<h4>Contextes</h4><table id="CONTEXTES" class="display" width="70%"></table>';
    $(document).ready(function() {
	$('#CONTEXTES').DataTable ( {
	    order: [[ 0, "asc" ]],
	    searchHighlight: true,
	    "destroy": true,
	    data:resultFinal,
	    lengthMenu: [[10, 25, 50,100, -1], [10, 25, 50,100, "All"]],
	    columns: [
		{title: "N°"},
		{title: "Contexte Source"},
		{title: "Contexte Cible"}
	    ]
	})
    });
}
//-----------------------------------------------------------------------------------
function onclickWord( word ) {
    document.getElementById('contextehtml').innerHTML = "";
    var queryText=document.getElementById('poleID').value;
    //var texte2insert = '<div id="contextehtml2" style="border: 2pt solid #00628B ; padding: 4pt; margin-left: 50px; margin-right: 50px;">';
    var DictionnaireDesItems = new Object();
    var DictionnaireNumDesItems = new Object();
    var DictionnaireDesItemsOut = new Object();
    var DictionnaireNumDesItemsOut = new Object();
    if (annotationencours==1) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
	if (annotationencours != annotationencoursOUT) {
	    if (annotationencoursOUT==2) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireLemme);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2lemme);
	    }
	    if (annotationencoursOUT==3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireCategorie);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2categorie);
	    }
	    if (annotationencoursOUT>3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
	    }
	}
	else {
	    DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireSource);
	    DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2forme);
	}
    }
    if (annotationencours==2) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireLemme);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2lemme);
	if (annotationencours != annotationencoursOUT) {
	    if (annotationencoursOUT==1) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireSource);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2forme);
	    }
	    if (annotationencoursOUT==3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireCategorie);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2categorie);
	    }
	    if (annotationencoursOUT>3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
	    }
	}
	else {
	    DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireLemme);
	    DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2lemme);
	}
    }
    if (annotationencours==3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireCategorie);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2categorie);
	if (annotationencours != annotationencoursOUT) {
	    if (annotationencoursOUT==1) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireSource);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2forme);
	    }
	    if (annotationencoursOUT==2) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireLemme);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2lemme);
	    }
	    if (annotationencoursOUT>3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
	    }
	}
	else {
	    DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireCategorie);
	    DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2categorie);
	}
    }
    if (annotationencours>3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireAnnotation);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2annotation);
	if (annotationencours != annotationencoursOUT) {
	    if (annotationencoursOUT==1) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireSource);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2forme);
	    }
	    if (annotationencoursOUT==2) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireLemme);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2lemme);
	    }
	    if (annotationencoursOUT==3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireCategorie);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2categorie);
	    }
	    if (annotationencoursOUT>3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
	    }
	}
	else {
	    DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
	    DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
	}
    }
    var annotationencoursIndex=annotationencours-1;
    var annotationencoursIndexOUT=annotationencoursOUT-1;
    var nbContexte=0;
    var resultFinal=new Array();
    for (var contexte in LISTESCONTEXTESCOOC) {
	var infoSource =  LISTESCONTEXTESCOOC[contexte].split(":");
	var posDebS=Number(infoSource[0]);
	var posFinS=Number(infoSource[1]);
	var contentxt =  "";
	var verifWord=0;
	for (var i=posDebS;i<=posFinS;i++) {
	    var item=DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
	    var item2=DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]];
	    if (!(dicNum2forme[trameForme[i][0]] in dictionnairedesdelims)) {
		//-----------------------------------------------------------
		var colornode="#FFFFFF0";
		if (DICOTFG.hasOwnProperty(item)) {
		    var tmp=DICOTFG[item].toString();
		    var values = tmp.split(',');
		    var result=values[2];
		    if (result >= 50) {colornode="#ff0000" } 
		    if ((result >= 30) && (result < 50  ) ) {colornode="#ff5555" } 
		    if ((result >= 20) && (result < 30  ) ) {colornode="#ff8484" } 
		    if ((result >= 10) && (result < 20  ) ) {colornode="#f3838b" } 
		    if ((result >= 5) && (result < 10  ) ) {colornode="#ffb0b0" } 
		    if ((result >= 0) && (result < 5  ) ) {colornode="#fee7cd" } 
		}
		if (item == queryText) {colornode="#ff0000"}
		//------------------------------------------------------------
		if (item == word) {
		    verifWord++;		    
		    if (nombredannotation > 1) {
			if (nombredannotation > 3) {
			    contentxt+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]];
			    for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
				var kk=tmpAnnot+1;
				contentxt+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[i][tmpAnnot]];
			    }
			    contentxt+="</p>')\" onmouseout=\"UnTip()\" rel=\""+i+"\"><span style=\"background:"+colornode+"\">"+item2+"</span></a>";
			}
			else {
			    contentxt+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+item+"\"><span style=\"background:"+colornode+"\">"+item2+"</span></a>";
			}
		    }
		    else {
			contentxt+="<span style=\"background:"+colornode+"\">"+item2+"</span>";
		    }	
		}
		if (item == queryText) {
		    if (nombredannotation > 1) {
			if (nombredannotation > 3) {
			    contentxt+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]];
			    for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
				var kk=tmpAnnot+1;
				contentxt+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[i][tmpAnnot]];
			    }
			    contentxt+="</p>')\" onmouseout=\"UnTip()\" rel=\""+i+"\"><span style=\"background:"+colornode+"\">"+item2+"</span></a>";
			}
			else {
			    contentxt+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\"><span style=\"background:"+colornode+"\">"+item2+"</span></a>";
			}
		    }
		    else {
			contentxt+="<span style=\"background:"+colornode+"\">"+item2+"</span></a>";
		    }
		}
		if ((item != word) && (item != queryText)) {
		    if (nombredannotation > 1) {
			if (nombredannotation > 3) {
			    contentxt+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]];
			    for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
				var kk=tmpAnnot+1;
				contentxt+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[i][tmpAnnot]];
			    }
			    contentxt+="</p>')\" onmouseout=\"UnTip()\" rel=\""+i+"\"><span style=\"background:"+colornode+"\">"+item2+"</span></a>";
			}
			else {
			    contentxt+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\"><span style=\"background:"+colornode+"\">"+item2+"</span></a>";
			}
		    }
		    else {
			contentxt+="<span style=\"background:"+colornode+"\">"+item2+"</span>";
		    }
		}
	    }
	    else {
		contentxt+=item2;
	    }
	}
	if (verifWord >=1) {
	    resultFinal[nbContexte]=[];
	    var nbContexteTmp=nbContexte+1;;
	    resultFinal[nbContexte].push(nbContexteTmp, contentxt);
	    nbContexte+=1;
	}
    }
    document.getElementById('contextehtml').innerHTML = '<h4>Contextes</h4><table id="CONTEXTES" class="display" width="70%"></table>';
    $(document).ready(function() {
	$('#CONTEXTES').DataTable ( {
	    order: [[ 0, "asc" ]],
	    searchHighlight: true,
	    "destroy": true,
	    data:resultFinal,
	    lengthMenu: [[10, 25, 50,100, -1], [10, 25, 50,100, "All"]],
	    columns: [
		{title: "N°"},
		{title: "Contexte"}
	    ]
	})
    });
}

//-----------------------------------------------------------------------------------
// FONCTIONS SPECIFS
//-----------------------------------------------------------------------------------
function precise_round(num,decimals){
	return Math.round(num*Math.pow(10,decimals))/Math.pow(10,decimals);
} 
//-----------------------------------------------------------------------------------
function LogFac (n) {
    if (n > 33 ) {
	return(n*Math.log(n)-n+(Math.log(2.e0*(3.141592653589793)*n))/2.e0+1.e0/(12.e0*n)) ;
    }
    var z=1.e0;
    for (var i= 2; i <= n; i++) {
	z=z*i;
    }
    return(Math.log(z));
}
function HyperG(T,t,F,f) {
    var z, z1, z2, z3, z4, z5, z6, z7;
    z1=LogFac(T);
    z2=LogFac(T-t);
    z3=LogFac(t);
    z4=LogFac(T-F);
    z5=LogFac(F);
    z6=z4-z1;
    z7=z6+z2;
    z=z7-LogFac(T-F-t+f);
    if (f == 0.) { 
	return(Math.exp(z));
    }
    z=z+z5+z3-LogFac(f)-LogFac(F-f)-LogFac(t-f);
    return(Math.exp(z));
}
function CalcCoeffSpec(T,t,F,f,seuilS,fffffff) {
    if ( (f>t) || (F>T)) {
		return 0;
    }
    var positif=1;
    var zn;
    var p;
    var pp=0;
    var coeff;
    pp=HyperG(T, t, F, f);
	seuilS=seuilS/100;
    if (pp > seuilS) {
		return 0;
    }
    p=pp;
    if ( f < (((F+1)*(t+1))/(T+2)))  { 
		positif=0;  
		for ( zn= f ; zn > 0 ; zn--) {
			p= (p * zn * (T-F-t+zn))/((F-zn+1) * (t-zn+1.));
			pp+=p;
			if (pp > seuilS) { return 0;}
			if ( p < 0.0000000001) { break}
		}
    }
    else    { 
		for (zn= f;zn < F; zn++) {
			p = (p * (F-zn) * (t-zn))/((zn+1) * (T-F-t+zn+1.));
			pp+=p;
			if (pp > seuilS) { return 0}
			if ( p < 0.0000000001) {  break}
		}
    }
	/* MODIF MARS 2017 
    if (pp > 0) { */
	coeff=(Math.log(pp)/Math.log(10))-1;
	if (positif == 1)  { coeff = coeff*(-1); }
	/*}*/
    return (coeff);
}
//-----------------------------------------------------------------------------------
function specifsPartie() {
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    //-----------------------------------------------------------------
    refreshItrameur();
    //-----------------------------------------------------------------
    var PARTITION =document.getElementById('IDPartie').value;
    if (PARTITION == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Aucune partition n\'est disponible...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }		
    var PARTIE =document.getElementById('IDParties').value;
    if (PARTIE =="") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Aucune partie n\'est disponible sur cette partition...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }		
    var seuil=document.getElementById('seuilID').value;
    if (seuil == ''){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur numérique pour le seuil...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    var FQMAX=document.getElementById('fqMaxID').value;
    if (FQMAX == ''){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur numérique pour la FQ MAX...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    var DictionnaireDesItems = new Object();
    var DictionnaireNumDesItems = new Object();
    if (annotationencours==1) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
    }
    if (annotationencours==2) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireLemme);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2lemme);
    }
    if (annotationencours==3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireCategorie);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2categorie);
    }
    if (annotationencours>3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireAnnotation);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2annotation);
    }
    var annotationencoursIndex=annotationencours-1;
    var DICOTFG = new Object();	
    var DictionnairePartie = new Object(); 
    var FQpartie=new Object(); 
    if (!($.isArray(DictionnairePartie[PARTIE]))) {
	DictionnairePartie[PARTIE]=new Array();
    }
    FQpartie[PARTIE]=0;
    var listepositions = cadre[PARTITION][PARTIE];
    for (var k=0;k<(listepositions.length);k=k+2) {
	var deb = listepositions[k];
	var tmpk=k+1;
	var fin = listepositions[tmpk];
	for (var pos=deb;pos<=fin;pos++) {
	    var item="";
	    if (annotationencours<=3) {
		item=DictionnaireNumDesItems[trameForme[pos][annotationencoursIndex]];
	    }
	    else {
		item=annotationencours+"//"+DictionnaireNumDesItems[trameForme[pos][annotationencoursIndex]];
	    }
	    if (item in DictionnaireDesItems)  {
		FQpartie[PARTIE]=FQpartie[PARTIE]+1;
		if (!DictionnairePartie[PARTIE].hasOwnProperty(item)) {
		    DictionnairePartie[PARTIE][item] = 1;
		}
		else {
		    DictionnairePartie[PARTIE][item] = DictionnairePartie[PARTIE][item]  + 1;
		}
	    }
	}
    }
    for (var mot in DictionnaireDesItems) {
	if (DictionnaireDesItems[mot] > FQMAX) {
	    if (DictionnairePartie[PARTIE].hasOwnProperty(mot)) {
		var Tsource = NBMOTTOTALSource;
		var tsource = FQpartie[PARTIE]; /* nb d'occ de la partie */
		//if (mot =="length") {console.log("F:"+DictionnaireDesItems[mot]+" f:"+DictionnairePartie[PARTIE][mot])};
		var result = CalcCoeffSpec(Tsource,tsource,DictionnaireDesItems[mot],DictionnairePartie[PARTIE][mot] ,seuil); 
		result=precise_round(result,0);
		if (result==Infinity) {result=9e15}
		if (result==-Infinity) {result=-9e15}
		//		if (result >= 50) { result = Infinity};
		//		if (result <= -50) { result = -Infinity};
		if (!($.isArray(DICOTFG[mot]))) {
		    if (!DictionnairePartie[PARTIE].hasOwnProperty(mot)) {
			DICOTFG[mot]=[];
			DICOTFG[mot].push(0)
			DICOTFG[mot].push(0);
                    }
		    else {
			DICOTFG[mot]=[];
			DICOTFG[mot].push(DictionnairePartie[PARTIE][mot]);
			DICOTFG[mot].push(result);
		    }
		}
		else {
		    if (!DictionnairePartie[PARTIE].hasOwnProperty(mot)) {
			DICOTFG[mot].push(0)
			DICOTFG[mot].push(0);
		    }
		    else {			
			DICOTFG[mot].push(DictionnairePartie[PARTIE][mot]);
			DICOTFG[mot].push(result);
		    }
		}
	    }
	}
    }	
    /*-------------------------------------------------------*/
    /*Affichage resultats */
    var resultFinal=new Array();
    /*var LISTEMOTSTFGSource= Object.keys(DICOTFG).sort(function(a,b){
	var x = DICOTFG[a][1];
	var y = DICOTFG[b][1];
	return x < y ? 1 : x > y ? -1 : 0;
    });*/
    var LISTMOTSSource =  Object.keys(DICOTFG);
    for (var i=0; i<LISTMOTSSource.length;i++) {
	var mot = LISTMOTSSource[i];
	var tmpmot = mot;
	var LISTEDEMOTS=DICOTFG[mot];
	if (annotationencours>3) {
	    tmpmot=mot.replace(/^[0-9]+\/\//, "");
	}
	if (!($.isArray(resultFinal[i]))) {
	    resultFinal[i]=new Array();
	}
	resultFinal[i]=[];
	var TmpList=new Array();
	TmpList.push(tmpmot,DictionnaireDesItems[mot]);
	for (var nbmot=0;nbmot<LISTEDEMOTS.length;nbmot++) {
	    TmpList.push(LISTEDEMOTS[nbmot]);
	}
	resultFinal[i]=TmpList;
    }
    document.getElementById('placeholder').innerHTML = '<h4>Spécificités Partie : '+PARTIE+' (Partition : '+PARTITION+')</h4><table id="SpecifPartie" class="display" width="50%"></table>';
    $(document).ready(function() {
	$('#SpecifPartie').DataTable ( {
	    order: [[ 3, "desc" ]],
	    searchHighlight: true,
	    "destroy": true,
	    lengthMenu: [[10, 25, 50,100, -1], [10, 25, 50,100, "All"]],
	    data:resultFinal,
		dom: 'Bfrtip',
		buttons: [
				'copy', 'csv', 'excel', 'pdf', 'print'
			],
	    columns: [
		{title: "Item"},
		{title: "FQ"},
		{title: "fq"},
		{title: "Sp"}
	    ]
	})
    });
}
//-----------------------------------------------------------------------------------
function motsSpecifsPartition() {
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    //-----------------------------------------------------------------
    refreshItrameur();
    //-----------------------------------------------------------------
    var PARTITION =document.getElementById('IDPartie').value;
    if (PARTITION == '') {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Aucune partition n\'est disponible...</span></small>';
	$("#placeholder").html(vide);	
	return;
    };
    
    var seuil=document.getElementById('seuilID').value;
    if (seuil == ''){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur numérique pour le seuil...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    var indspmin=document.getElementById('IndSPminID').value;
    if (indspmin == ''){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur numérique pour le indspmin...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    var FQMAX=document.getElementById('fqMaxID').value;
    if (FQMAX == ''){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur numérique pour la FQ MAX...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    var DictionnaireDesItems = new Object();
    var DictionnaireNumDesItems = new Object();
    if (annotationencours==1) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
    }
    if (annotationencours==2) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireLemme);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2lemme);
    }
    if (annotationencours==3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireCategorie);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2categorie);
    }
    if (annotationencours>3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireAnnotation);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2annotation);
    }
    var annotationencoursIndex=annotationencours-1;
    var nbPartie = 0;
    var DICOTFG = new Object();	
    var DictionnairePartie = new Object(); 
    var FQpartie=new Object(); 
    //var PARTITION =document.getElementById('IDPartie').value;
    
    var LISTESDESPARTIES=Object.keys(cadre[PARTITION]);
    for (var j=0;j<LISTESDESPARTIES.length;j++) {
	var nbPartie=LISTESDESPARTIES[j];
	if (!($.isArray(DictionnairePartie[nbPartie]))) {
	    DictionnairePartie[nbPartie]=new Array();
	}
	FQpartie[nbPartie]=0;
	var listepositions = cadre[PARTITION][LISTESDESPARTIES[j]];
	for (var k=0;k<(listepositions.length);k=k+2) {
	    var deb = listepositions[k];
	    var tmpk=k+1;
	    var fin = listepositions[tmpk];
	    for (var pos=deb;pos<=fin;pos++) {
		//var item=DictionnaireNumDesItems[trameForme[pos][annotationencoursIndex]];
		var item="";
		if (annotationencours<=3) {
		    item=DictionnaireNumDesItems[trameForme[pos][annotationencoursIndex]];
		}
		else {
		    item=annotationencours+"//"+DictionnaireNumDesItems[trameForme[pos][annotationencoursIndex]];
		}

		if (item in DictionnaireDesItems)  {
		    FQpartie[nbPartie]=FQpartie[nbPartie]+1;
		    if (!DictionnairePartie[nbPartie].hasOwnProperty(item)) {
			DictionnairePartie[nbPartie][item] = 1;
		    }
		    else {
			DictionnairePartie[nbPartie][item] = DictionnairePartie[nbPartie][item]  + 1;
		    }
		}
	    }
	}
    }
    for (var mot in DictionnaireDesItems) {
	if (DictionnaireDesItems[mot] > FQMAX) {
	    for (var j=0;j<LISTESDESPARTIES.length;j++) {
		var nbPartie=LISTESDESPARTIES[j];
		if (!DictionnairePartie[nbPartie].hasOwnProperty(mot)) {
		    DictionnairePartie[nbPartie][mot]=0;  
		}
		var Tsource = NBMOTTOTALSource;
		var tsource = FQpartie[nbPartie]; /* nb d'occ de la partie */
		var result = CalcCoeffSpec(Tsource,tsource,DictionnaireDesItems[mot],DictionnairePartie[nbPartie][mot] ,seuil); 
		result=precise_round(result,0);
		if (result==Infinity) {result=9e15}
		if (result==-Infinity) {result=-9e15}
		//		if (result >= 50) { result = Infinity};
		//		if (result <= -50) { result = -Infinity};
		if (!($.isArray(DICOTFG[mot]))) {
		    if (!DictionnairePartie[nbPartie].hasOwnProperty(mot)) {
                        DICOTFG[mot]=[];
			DICOTFG[mot].push(nbPartie);
			DICOTFG[mot].push(DictionnaireDesItems[mot]);
                        DICOTFG[mot].push(0);
                        DICOTFG[mot].push(0);
		    }
		    else {
                        DICOTFG[mot]=[];
			DICOTFG[mot].push(nbPartie);
			DICOTFG[mot].push(DictionnaireDesItems[mot]);
                        DICOTFG[mot].push(DictionnairePartie[nbPartie][mot]);
                        DICOTFG[mot].push(result);
		    }
                }
                else {
		    if (!DictionnairePartie[nbPartie].hasOwnProperty(mot)) {
			DICOTFG[mot].push(nbPartie);
			DICOTFG[mot].push(DictionnaireDesItems[mot]);
                        DICOTFG[mot].push(0)
                        DICOTFG[mot].push(0);
		    }
		    else {			
			DICOTFG[mot].push(nbPartie);
			DICOTFG[mot].push(DictionnaireDesItems[mot]);
                        DICOTFG[mot].push(DictionnairePartie[nbPartie][mot]);
                        DICOTFG[mot].push(result);
		    }
                }
	    }
	}
    }
    /*-------------------------------------------------------*/
    /*Affichage resultats */
    var resultFinal=new Array();
    var nbResultToPush=0;
    var LISTMOTSSource= Object.keys(DICOTFG);/*.sort(function(a,b){
	return a > b ? 1 : a < b ? -1 : 0;
    });*/
    
    //var LISTMOTSSource = [];
    //for (var key in LISTEMOTSTFGSource) {
      //  LISTMOTSSource.push(LISTEMOTSTFGSource[key]);
    //}
    for (var i=0; i<LISTMOTSSource.length;i++) {
	var mot = LISTMOTSSource[i];
	var tmpmot = mot;
	var LISTEDEMOTS=DICOTFG[mot];
	if (annotationencours>3) {
	    tmpmot=mot.replace(/^[0-9]+\/\//, "");
	}
	for (var nbmot=0;nbmot<LISTEDEMOTS.length;nbmot=nbmot+4) {
	    var part=LISTEDEMOTS[nbmot];
	    var FQ=LISTEDEMOTS[nbmot+1];
	    var fq=LISTEDEMOTS[nbmot+2];
	    var min=Number(LISTEDEMOTS[nbmot+3]);
	    //alert(mot+"|"+part+"|"+fq+"|"+min);
	    if (min >= indspmin) {
		if (!($.isArray(resultFinal[nbResultToPush]))) {
		    resultFinal[nbResultToPush]=new Array();
		}
		resultFinal[nbResultToPush]=[];
		resultFinal[nbResultToPush].push(tmpmot,part,FQ,fq,min);
		nbResultToPush=nbResultToPush+1;
	    }
	}
    }
    document.getElementById('placeholder').innerHTML = '<h4>Les mots spécifiques de la partition : '+PARTITION+'</h4><table id="LesMotsSpecifsParPartie" class="display" width="50%"></table>';
    $(document).ready(function() {
	$('#LesMotsSpecifsParPartie').DataTable ( {
	    order: [[ 1, "asc" ]],
	    searchHighlight: true,
	    "destroy": true,
	    data:resultFinal,
	    lengthMenu: [[10, 25, 50,100, -1], [10, 25, 50,100, "All"]],
		dom: 'Bfrtip',
		buttons: [
				'copy', 'csv', 'excel', 'pdf', 'print'
			],
	    columns: [
		{title: "Item"},
		{title: "Partie"},
		{title: "FQ"},
		{title: "fq"},
		{title: "Sp"}
	    ]
	})
    });    
    /*----------------------------------------------------*/
    /* Graphe */
	document.getElementById('legendGraphe').innerHTML = "";
	var legend ='<small><b>Les Mots spécifiques par partie</b> :<br/><b>Arc Label</b> : <b>Partie</b><font color="#99CC99">&#x2212;</font>IndiceSpécif|FQ|fq<font color="#99CC99">&#8594;</font><b>mot</b></small><br/><span style="background:yellow"><img onclick="clear_canvas();" src="./images/trash.png" title="suppression graphique" alt="suppression graphique"/></span>';
	document.getElementById('legendGraphe').innerHTML = legend;

    GrapheArborL=document.getElementById('grLID').value;
    GrapheArborH=document.getElementById('grHID').value;	
    reinit_canvas();
    sysArbor =  new arbor.ParticleSystem(20, 600, 0.8, false, 50, 0.015, 0.6);
    //var sys = new arbor.ParticleSystem(30, 800,1,true);
    /*sys.parameters({ stiffness: 800,
                     repulsion: 1200,
                     gravity: true,
                     dt:0.015,
                     friction: 0.8,
		     precision:0.4});*/
    var colornode="#fee7cd";
    for (var i=0; i<LISTMOTSSource.length;i++) {
	var mot = LISTMOTSSource[i];
	var tmpmot = mot;
	var LISTEDEMOTS=DICOTFG[mot];
	if (annotationencours>3) {
	    tmpmot=mot.replace(/^[0-9]+\/\//, "");
	}
	for (var nbmot=0;nbmot<LISTEDEMOTS.length;nbmot=nbmot+4) {
	    var part=LISTEDEMOTS[nbmot];
	    var FQ=LISTEDEMOTS[nbmot+1];
	    var fq=LISTEDEMOTS[nbmot+2];
	    var min=Number(LISTEDEMOTS[nbmot+3]);
	    //alert(mot+"|"+part+"|"+fq+"|"+min);
	    if (min >= indspmin) {
		var nodeS;
		var nodeC;
		if (sysArbor.getNode(part) == undefined) {
		    nodeS=sysArbor.addNode(part,{'color':'red','shape':'dot','label':part});	
			LISTEDESNOEUDSINCANVAS.push(nodeS);
		}
		else {
		    nodeS=sysArbor.getNode(part);
		}
		if (sysArbor.getNode(tmpmot) == undefined) {
		    nodeC=sysArbor.addNode(tmpmot,{'color':colornode,'shape':'rectangle','label':tmpmot});
			LISTEDESNOEUDSINCANVAS.push(nodeC);			
		}
		else {
		    nodeC=sysArbor.getNode(tmpmot);
		}
		var label = min+'|'+FQ+'|'+fq;
		sysArbor.addEdge(nodeS, nodeC,{'weight':5,'color':'#99CC99','directed':1,'length':.75, 'pointSize':10,data:{name:label}});
	    }
	}
    }    
    sysArbor.renderer = Renderer("#grapheHolder"); 
    /*----------------------------------------------------*/

}
//-----------------------------------------------------------------------------------
function TableauFQItemsParties () {
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    refreshItrameur();
    loadProgressBar();
    var PARTITION =document.getElementById('IDPartie').value;
    if (PARTITION == '') {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Aucune partition n\'est disponible...</span></small>';
	$("#placeholder").html(vide);	
	return;
    };
    var FQMAX=document.getElementById('fqMaxID').value;
    if (FQMAX == ''){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur numérique pour la FQ MAX...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    //loadProgressBar();
    var DictionnaireDesItems = new Object();
    var DictionnaireNumDesItems = new Object();
    if (annotationencours==1) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
    }
    if (annotationencours==2) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireLemme);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2lemme);
    }
    if (annotationencours==3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireCategorie);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2categorie);
    }
    if (annotationencours>3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireAnnotation);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2annotation);
    }
    var annotationencoursIndex=annotationencours-1;
    var nbPartie = 0;
    var DICOTFG = new Object();	
    var DictionnairePartie = new Object(); 
    var FQpartie=new Object(); 
    var LISTESDESPARTIES=Object.keys(cadre[PARTITION]);
    for (var j=0;j<LISTESDESPARTIES.length;j++) {
	var nbPartie=LISTESDESPARTIES[j];
	//alert("PARTIE : "+nbPartie);
	if (!($.isArray(DictionnairePartie[nbPartie]))) {
	    DictionnairePartie[nbPartie]=new Array();
	}
	FQpartie[nbPartie]=0;
	var listepositions = cadre[PARTITION][LISTESDESPARTIES[j]];
	for (var k=0;k<(listepositions.length);k=k+2) {
	    var deb = Number(listepositions[k]);
	    var tmpk=k+1;
	    var fin = Number(listepositions[tmpk]);
	    //alert("PARTIE : "+nbPartie+"|debut : "+deb+"|fin : "+fin);
	    for (var pos=deb;pos<=fin;pos++) {
		var item="";
		if (annotationencours<=3) {
		    item=DictionnaireNumDesItems[trameForme[pos][annotationencoursIndex]];
		}
		else {
		    item=annotationencours+"//"+DictionnaireNumDesItems[trameForme[pos][annotationencoursIndex]];
		    //alert("item : "+item);
		}
		if (!(dicNum2forme[trameForme[pos][0]] in dictionnairedesdelims))  {
		    if (item in DictionnaireDesItems)  {
			FQpartie[nbPartie]=FQpartie[nbPartie]+1;
			if (DictionnairePartie[nbPartie].hasOwnProperty(item)) {
			    DictionnairePartie[nbPartie][item] = DictionnairePartie[nbPartie][item]  + 1;
			    
			}
			else {
			    DictionnairePartie[nbPartie][item] = 1;
			}
		    }
		}
	    }
	}
    }
    for (var mot in DictionnaireDesItems) {
	if (annotationencours>3) {
	    var regex = new RegExp("^" + annotationencours + "\/\/", "gi");
	    if (regex.test(mot)) {
		/*************************************************************************/
		if (DictionnaireDesItems[mot] > FQMAX) {
		    for (var j=0;j<LISTESDESPARTIES.length;j++) {
			var nbPartie=LISTESDESPARTIES[j];
			if (!DictionnairePartie[nbPartie].hasOwnProperty(mot)) {
			    DictionnairePartie[nbPartie][mot]=0;  
			}
			if (!($.isArray(DICOTFG[mot]))) {
			    if (!DictionnairePartie[nbPartie].hasOwnProperty(mot)) {
				DICOTFG[mot]=[];
				DICOTFG[mot].push(0)
			    }
			    else {
				DICOTFG[mot]=[];
				DICOTFG[mot].push(DictionnairePartie[nbPartie][mot]);
			    }
			}
			else {
			    if (!DictionnairePartie[nbPartie].hasOwnProperty(mot)) {
				DICOTFG[mot].push(0)
			    }
			    else {		
				DICOTFG[mot].push(DictionnairePartie[nbPartie][mot]);
			    }
			}
		    }
		}
	    }
	    /*************************************************************************/
	}
	else {
	    /*************************************************************************/
	    if (DictionnaireDesItems[mot] > FQMAX) {
		for (var j=0;j<LISTESDESPARTIES.length;j++) {
		    var nbPartie=LISTESDESPARTIES[j];
		    if (!DictionnairePartie[nbPartie].hasOwnProperty(mot)) {
			DictionnairePartie[nbPartie][mot]=0;  
		    }
		    if (!($.isArray(DICOTFG[mot]))) {
			if (!DictionnairePartie[nbPartie].hasOwnProperty(mot)) {
                            DICOTFG[mot]=[];
                            DICOTFG[mot].push(0)
			}
			else {
                            DICOTFG[mot]=[];
                            DICOTFG[mot].push(DictionnairePartie[nbPartie][mot]);
			}
                    }
                    else {
			if (!DictionnairePartie[nbPartie].hasOwnProperty(mot)) {
                            DICOTFG[mot].push(0)
			}
			else {			
                            DICOTFG[mot].push(DictionnairePartie[nbPartie][mot]);
			}
                    }
		}
	    }
	    /*************************************************************************/
	}
    }
    /*-------------------------------------------------------*/
    /* Calcul sur les SR */
    if (etatLancementSR==1) {
	var freqsegmentSR=document.getElementById('srfqID').value;
	for (var j=0;j<LISTESDESPARTIES.length;j++) {
	    var nbPartie=LISTESDESPARTIES[j];
	    var listepositions = cadre[PARTITION][LISTESDESPARTIES[j]];
	    //console.log(nbPartie+":"+listepositions);
	    /**************************/
	    for (var k=0;k<(listepositions.length);k=k+2) {
		var deb = Number(listepositions[k]);
		var tmpk=k+1;
		var fin = Number(listepositions[tmpk]);
		//alert("DEB : "+deb+"|FIN : "+fin);
		for (var pos=deb;pos<=fin;pos++) {
		    if (dictionnaireventilationdesSR[pos] !== undefined) {
			if (!(dicNum2forme[trameForme[pos][0]] in dictionnairedesdelims))  {
			    var item=DictionnaireNumDesItems[trameForme[pos][annotationencoursIndex]];
			    //alert(freqsegmentSR+":"+FQMAX);
			    if ((DictionnaireNumDesItems[trameForme[pos][annotationencoursIndex]] >= freqsegmentSR) && (DictionnaireNumDesItems[trameForme[pos][annotationencoursIndex]] > FQMAX)) {
				for (var SR in listeSROK)  {
				    //console.log("SR:<"+SR+">:<"+listeSROK[SR]+">");
				    if ((listeSROK[SR] > FQMAX) && (listeSROK[SR] >= freqsegmentSR)) {
					var lesmotsduSR=SR.split(" ");
					var resuSR1="NO";
					if (lesmotsduSR[0] == item) {
					    //console.log(SR+":"+listeSR[SR]);
					    //var listeMotsduSR=SR.split(" ");
					    var longueurSR=lesmotsduSR.length;
					    var lgsr=dictionnaireventilationdesSR[pos];
					    if (longueurSR <= lgsr) {
						var tmpsr=DictionnaireNumDesItems[trameForme[pos][annotationencoursIndex]];
						var lgtmpsr=1;
						var kk=1;
						var tmpindex=Number(pos);
						var matchW = "OK";
						var m=1;
						while ((lgtmpsr < longueurSR) && (matchW == "OK")) {
						    if ((dicNum2forme[trameForme[tmpindex+kk][0]] in dictionnairedesdelims ) || (trameForme[tmpindex+kk][0] == -1 )) {
							tmpsr=tmpsr + " ";
						    } 
						    else {
							if ((DictionnaireNumDesItems[trameForme[tmpindex+kk][annotationencoursIndex]] == lesmotsduSR[m]) && (DictionnaireNumDesItems[trameForme[tmpindex+kk][annotationencoursIndex]] >= freqsegmentSR) && (DictionnaireNumDesItems[trameForme[tmpindex+kk][annotationencoursIndex]] > FQMAX)) {
							    tmpsr=tmpsr + DictionnaireNumDesItems[trameForme[tmpindex+kk][annotationencoursIndex]];
							    lgtmpsr++;
							    m++;
							}
							else {
							    matchW = "BAD";
							}
						    }
						    kk++;	
						}
						if (matchW == "OK") { // pas necessaire ??
	    					    var reg0=new RegExp(" +$", "g"); 
						    tmpsr=tmpsr.replace(reg0,"");
						    var reg1=new RegExp(" +", "g"); 
						    tmpsr=tmpsr.replace(reg1," ");	
						    if (SR == tmpsr) {
							resuSR1="OK";
						    }
						}
					    }
					}
					//---------------------------
					if (resuSR1 == "OK") {
					    //console.log("SR OK : "+SR+" Partie :"+nbPartie);
					    if (DictionnairePartie[nbPartie].hasOwnProperty(SR)) {
						DictionnairePartie[nbPartie][SR] = DictionnairePartie[nbPartie][SR]  + 1;
						
					    }
					    else {
						DictionnairePartie[nbPartie][SR] = 1;
					    }
					}
				    }
				}
			    }
			}
		    }
		    /*************************/
		}
	    }
	}
	/******************************/
	for (var SR in listeSROK)  {
	    if ((listeSROK[SR] > FQMAX) && (listeSROK[SR] > freqsegmentSR)) {
		for (var j=0;j<LISTESDESPARTIES.length;j++) {
		    var nbPartie=LISTESDESPARTIES[j];
		    if (!DictionnairePartie[nbPartie].hasOwnProperty(SR)) {
			DictionnairePartie[nbPartie][SR]=0;  
		    }
		    if (!($.isArray(DICOTFG[SR]))) {
			if (!DictionnairePartie[nbPartie].hasOwnProperty(SR)) {
                            DICOTFG[SR]=[];
                            DICOTFG[SR].push(0)
			}
			else {
                            DICOTFG[SR]=[];
                            DICOTFG[SR].push(DictionnairePartie[nbPartie][SR]);
			}
                    }
		    else {
			if (!DictionnairePartie[nbPartie].hasOwnProperty(SR)) {
			    DICOTFG[SR].push(0)
			}
			else {		
			    DICOTFG[SR].push(DictionnairePartie[nbPartie][SR]);
			}
		    }

		}
	    }
	}
    }
    /*-------------------------------------------------------*/
    /*Affichage resultats */
    var LISTMOTSSource= Object.keys(DICOTFG);
    /*
      .sort(function(a,b){
	return a > b ? 1 : a < b ? -1 : 0;
    });
    var LISTMOTSSource = [];
    for (var key in LISTEMOTSTFGSource) {
        LISTMOTSSource.push(LISTEMOTSTFGSource[key]);
    }
    */
    var resultFinal=new Array();
    var nbElementInDico=0;
    for (var i=0; i<LISTMOTSSource.length;i++) {
	var mot = LISTMOTSSource[i];
	var tmpmot = mot;
	var LISTEDEMOTS=DICOTFG[mot];
	if ((annotationencours>3) && (!(mot in listeSROK))) { // ATTENTION il faut aussi ne pas tenir compte des SR !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	    var identAnnot=LISTMOTSSource[i].split("//");
	    var valAnnot=Number(identAnnot[0]);
	    if (annotationencours==valAnnot)  {
		if (!($.isArray(resultFinal[nbElementInDico]))) {
		    resultFinal[nbElementInDico]=new Array();
		}
		resultFinal[nbElementInDico]=[];
		resultFinal[nbElementInDico].push(identAnnot[1],DictionnaireDesItems[mot]);  
		/*-----------*/
		/* calcul BT */
		/*-----------*/
		var sommeFnbmotJ=0;
		for (var nbmot=0;nbmot<LISTEDEMOTS.length;nbmot++) {
		    //resultFinal[nbElementInDico].push(LISTEDEMOTS[nbmot]);
		    sommeFnbmotJ = sommeFnbmotJ + (LISTEDEMOTS[nbmot]*(nbmot+1));
		}
		var BM = (1 / DictionnaireDesItems[mot]) * sommeFnbmotJ;
		BM=precise_round(BM,1);
		resultFinal[nbElementInDico].push(BM);
		/*-----------*/
		/* calcul VM */
		/*-----------*/
		/* calcul sigma2 */
		var sigma2 =0;
		for (var nbmot=0;nbmot<(LISTEDEMOTS.length - 1);nbmot++) {
		    sigma2 = sigma2 + Math.pow(LISTEDEMOTS[nbmot] - LISTEDEMOTS[nbmot+1], 2);  
		}
		sigma2 = ( 1 / (LISTEDEMOTS.length - 1)) * sigma2;
		/* calcul toutes les différences */
		var S2=0;
		for (var nbmot=0;nbmot<LISTEDEMOTS.length;nbmot++) {
		    for (var nbmot2=0;nbmot2<LISTEDEMOTS.length;nbmot2++) {
			if (nbmot != nbmot2) {
			    S2 = S2 + Math.pow(LISTEDEMOTS[nbmot] - LISTEDEMOTS[nbmot2], 2);  
			}
		    }
		}
		S2 = ( 1 / (LISTEDEMOTS.length * (LISTEDEMOTS.length - 1))) * S2; 
		var VM;
		if (S2 == 0) {
		    VM = 1;
		}
		else {
		    VM = sigma2 / S2 ;
		}
		VM=precise_round(VM,2);
		resultFinal[nbElementInDico].push(VM);
		/*-----------*/
		for (var nbmot=0;nbmot<LISTEDEMOTS.length;nbmot++) {
		    resultFinal[nbElementInDico].push(LISTEDEMOTS[nbmot]);
		}
		nbElementInDico++;
	    }
	}
	else {
	    if (!($.isArray(resultFinal[nbElementInDico]))) {
		resultFinal[nbElementInDico]=new Array();
	    }
	    resultFinal[nbElementInDico]=[];
	    if (mot in listeSROK) {
		resultFinal[nbElementInDico].push(mot,listeSROK[mot]); 
	    }
	    else {
		resultFinal[nbElementInDico].push(mot,DictionnaireDesItems[mot]);  
	    }
	    /*-----------*/
	    /* calcul BT */
	    /*-----------*/
	    var sommeFnbmotJ=0;
	    var verif="";
	    for (var nbmot=0;nbmot<LISTEDEMOTS.length;nbmot++) {
		//resultFinal[nbElementInDico].push(LISTEDEMOTS[nbmot]);
		sommeFnbmotJ = sommeFnbmotJ + (LISTEDEMOTS[nbmot]*(nbmot+1));
	    }
	    var BM ; //= (1 / DictionnaireDesItems[mot]) * sommeFnbmotJ;
	    if (mot in listeSROK) {
		BM =(1 / listeSROK[mot]) * sommeFnbmotJ;
	    }
	    else {
		BM =(1 / DictionnaireDesItems[mot]) * sommeFnbmotJ;
	    }

	    BM=precise_round(BM,1);
	    resultFinal[nbElementInDico].push(BM);
	    /*-----------*/
	    /* calcul VM */
	    /*-----------*/
	    /* calcul sigma2 */
	    var sigma2 =0;
	    for (var nbmot=0;nbmot<(LISTEDEMOTS.length - 1);nbmot++) {
		sigma2 = sigma2 + Math.pow(LISTEDEMOTS[nbmot] - LISTEDEMOTS[nbmot+1], 2);  
	    }
	    sigma2 = ( 1 / (LISTEDEMOTS.length - 1)) * sigma2;
	    /* calcul toutes les différences */
	    var S2=0;
	    for (var nbmot=0;nbmot<LISTEDEMOTS.length;nbmot++) {
		for (var nbmot2=0;nbmot2<LISTEDEMOTS.length;nbmot2++) {
		    if (nbmot != nbmot2) {
			S2 = S2 + Math.pow(LISTEDEMOTS[nbmot] - LISTEDEMOTS[nbmot2], 2);  
		    }
		}
	    }
	    S2 = ( 1 / (LISTEDEMOTS.length * (LISTEDEMOTS.length - 1))) * S2; 
	    var VM;
	    if (S2 == 0) {
		VM = 1;
	    }
	    else {
		VM = sigma2 / S2 ;
	    }
	    VM=precise_round(VM,2);
	    resultFinal[nbElementInDico].push(VM);
	    /*-----------*/
	    for (var nbmot=0;nbmot<LISTEDEMOTS.length;nbmot++) {
		resultFinal[nbElementInDico].push(LISTEDEMOTS[nbmot]);
	    }
	    nbElementInDico++;
	}
    }
    /*--------*/
    var my_columns=[];
    var my_item={};
    my_item.sTitle="Item";
    my_columns.push(my_item);
    my_item={};
    my_item.sTitle="FQ";
    my_columns.push(my_item);
    var labelColumnBM="BT";
    my_item={};
    my_item.sTitle=labelColumnBM;
    my_columns.push(my_item);
    var labelColumnVM="VN";
    my_item={};
    my_item.sTitle=labelColumnVM;
    my_columns.push(my_item);
    for (var j=0;j<LISTESDESPARTIES.length;j++) {
	var nbPartie=LISTESDESPARTIES[j];
	var labelColumnFq=nbPartie+" / fq";
	my_item={};
	my_item.sTitle=labelColumnFq;
	my_columns.push(my_item);
    }
    /*---------*/
    document.getElementById('placeholder2').style.height = "auto";
    document.getElementById('placeholder2').innerHTML = '<h4>Tableau Général des Items <small>(FQ &gt; '+FQMAX+' | annotation:'+annotationencours+')</small><br/>Partition : '+PARTITION+'</h4><table id="MyDicoFreq" class="display" width="100%"></table>';
    $(document).ready(function() {
	$('#MyDicoFreq').DataTable ( {
	    order: [[ 1, "desc" ]],
	    data:resultFinal,
	    lengthMenu: [[10,20,50,100, -1], [10,20, 50,100, "All"]],
	    columns: my_columns,
	    //"deferRender": true,
	    searchHighlight: true,
	    "destroy": true,
	    dom: 'Bfrtip',
	    buttons: [
		'copy', 'csv', 'excel', 'pdf', 'print'
	    ],
	});
    });
    document.getElementById('placeholder').innerHTML = "";
}
//-----------------------------------------------------------------------------------
function specifsTotalesParties() {
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    refreshItrameur();

    var PARTITION =document.getElementById('IDPartie').value;
    if (PARTITION == '') {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Aucune partition n\'est disponible...</span></small>';
	$("#placeholder").html(vide);	
	return;
    };
    
    var seuil=document.getElementById('seuilID').value;
    if (seuil == ''){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur numérique pour le seuil...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    var FQMAX=document.getElementById('fqMaxID').value;
    if (FQMAX == ''){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur numérique pour la FQ MAX...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    //loadProgressBar();
    var DictionnaireDesItems = new Object();
    var DictionnaireNumDesItems = new Object();
    if (annotationencours==1) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
    }
    if (annotationencours==2) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireLemme);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2lemme);
    }
    if (annotationencours==3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireCategorie);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2categorie);
    }
    if (annotationencours>3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireAnnotation);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2annotation);
    }
    var annotationencoursIndex=annotationencours-1;
    var nbPartie = 0;
    var DICOTFG = new Object();	
    var DictionnairePartie = new Object(); 
    var FQpartie=new Object(); 
    var LISTESDESPARTIES=Object.keys(cadre[PARTITION]);
    for (var j=0;j<LISTESDESPARTIES.length;j++) {
	var nbPartie=LISTESDESPARTIES[j];
	//alert("PARTIE : "+nbPartie);
	if (!($.isArray(DictionnairePartie[nbPartie]))) {
	    DictionnairePartie[nbPartie]=new Array();
	}
	FQpartie[nbPartie]=0;
	var listepositions = cadre[PARTITION][LISTESDESPARTIES[j]];
	for (var k=0;k<(listepositions.length);k=k+2) {
	    var deb = Number(listepositions[k]);
	    var tmpk=k+1;
	    var fin = Number(listepositions[tmpk]);
	    //alert("PARTIE : "+nbPartie+"|debut : "+deb+"|fin : "+fin);
	    for (var pos=deb;pos<=fin;pos++) {
		var item="";
		if (annotationencours<=3) {
		    item=DictionnaireNumDesItems[trameForme[pos][annotationencoursIndex]];
		}
		else {
		    item=annotationencours+"//"+DictionnaireNumDesItems[trameForme[pos][annotationencoursIndex]];
		    //alert("item : "+item);
		}
		if (!(dicNum2forme[trameForme[pos][0]] in dictionnairedesdelims))  {
		    if (item in DictionnaireDesItems)  {
			FQpartie[nbPartie]=FQpartie[nbPartie]+1;
			if (DictionnairePartie[nbPartie].hasOwnProperty(item)) {
			    DictionnairePartie[nbPartie][item] = DictionnairePartie[nbPartie][item]  + 1;
			    
			}
			else {
			    DictionnairePartie[nbPartie][item] = 1;
			}
		    }
		}
	    }
	}
    }
    //for (var j=0;j<LISTESDESPARTIES.length;j++) {
	//var nbPartie=LISTESDESPARTIES[j];
	//alert(nbPartie+"|"+NBMOTTOTALSource+"|"+FQpartie[nbPartie]);
	//for (var mot in DictionnaireDesItems) {
	    //var regex = new RegExp("^" + annotationencours + "\/\/", "gi");
	    //if (regex.test(mot)) {
	//	alert("PARTIE : "+nbPartie+"|"+mot+"|"+DictionnairePartie[nbPartie][mot]);
	    //}
	//}	
    //}
    for (var mot in DictionnaireDesItems) {
	if (annotationencours>3) {
	    var regex = new RegExp("^" + annotationencours + "\/\/", "gi");
	    if (regex.test(mot)) {
		/*************************************************************************/
		if (DictionnaireDesItems[mot] > FQMAX) {
		    for (var j=0;j<LISTESDESPARTIES.length;j++) {
			var nbPartie=LISTESDESPARTIES[j];
			if (!DictionnairePartie[nbPartie].hasOwnProperty(mot)) {
			    DictionnairePartie[nbPartie][mot]=0;  
			}
			var Tsource = NBMOTTOTALSource;
			var tsource = FQpartie[nbPartie]; /* nb d'occ de la partie */
			//alert(mot+"|"+Tsource+"|"+tsource+"|"+DictionnaireDesItems[mot]+"|"+DictionnairePartie[nbPartie][mot]);
			var result = CalcCoeffSpec(Tsource,tsource,DictionnaireDesItems[mot],DictionnairePartie[nbPartie][mot] ,seuil); 
			result=precise_round(result,0);
			if (result==Infinity) {result=9e15}
			if (result==-Infinity) {result=-9e15}
			//		if (result >= 50) { result = Infinity};
			//		if (result <= -50) { result = -Infinity};
			if (!($.isArray(DICOTFG[mot]))) {
			    if (!DictionnairePartie[nbPartie].hasOwnProperty(mot)) {
				DICOTFG[mot]=[];
				DICOTFG[mot].push(0)
				DICOTFG[mot].push(0);
			    }
			    else {
				DICOTFG[mot]=[];
				DICOTFG[mot].push(DictionnairePartie[nbPartie][mot]);
				DICOTFG[mot].push(result);
			    }
			}
			else {
			    if (!DictionnairePartie[nbPartie].hasOwnProperty(mot)) {
				DICOTFG[mot].push(0)
				DICOTFG[mot].push(0);
			    }
			    else {			
				DICOTFG[mot].push(DictionnairePartie[nbPartie][mot]);
				DICOTFG[mot].push(result);
			    }
			}
		    }
		}
	    }
	     /*************************************************************************/
	    }
	else {
	    /*************************************************************************/
	    if (DictionnaireDesItems[mot] > FQMAX) {
		for (var j=0;j<LISTESDESPARTIES.length;j++) {
		    var nbPartie=LISTESDESPARTIES[j];
		    if (!DictionnairePartie[nbPartie].hasOwnProperty(mot)) {
			DictionnairePartie[nbPartie][mot]=0;  
		    }
		    var Tsource = NBMOTTOTALSource;
		    var tsource = FQpartie[nbPartie]; /* nb d'occ de la partie */
		    var result = CalcCoeffSpec(Tsource,tsource,DictionnaireDesItems[mot],DictionnairePartie[nbPartie][mot] ,seuil); 
		    result=precise_round(result,0);
		    if (result==Infinity) {result=9e15}
		    if (result==-Infinity) {result=-9e15}
		    
		    //		if (result >= 50) { result = Infinity};
		    //		if (result <= -50) { result = -Infinity};
		if (!($.isArray(DICOTFG[mot]))) {
		    if (!DictionnairePartie[nbPartie].hasOwnProperty(mot)) {
                        DICOTFG[mot]=[];
                        DICOTFG[mot].push(0)
                        DICOTFG[mot].push(0);
		    }
		    else {
                        DICOTFG[mot]=[];
                        DICOTFG[mot].push(DictionnairePartie[nbPartie][mot]);
                        DICOTFG[mot].push(result);
		    }
                }
                    else {
			if (!DictionnairePartie[nbPartie].hasOwnProperty(mot)) {
                            DICOTFG[mot].push(0)
                            DICOTFG[mot].push(0);
			}
			else {			
                            DICOTFG[mot].push(DictionnairePartie[nbPartie][mot]);
                            DICOTFG[mot].push(result);
			}
                    }
		}
	    }
	     /*************************************************************************/
	}
    }
    /*-------------------------------------------------------*/
    /*Affichage resultats */
    var LISTMOTSSource= Object.keys(DICOTFG);/*.sort(function(a,b){
	return a > b ? 1 : a < b ? -1 : 0;
    });
    var LISTMOTSSource = [];
    for (var key in LISTEMOTSTFGSource) {
        LISTMOTSSource.push(LISTEMOTSTFGSource[key]);
    }*/
    var resultFinal=new Array();
    var nbElementInDico=0;
    for (var i=0; i<LISTMOTSSource.length;i++) {
	var mot = LISTMOTSSource[i];
	var tmpmot = mot;
	var LISTEDEMOTS=DICOTFG[mot];
	if (annotationencours>3) {
	    var identAnnot=LISTMOTSSource[i].split("//");
	    var valAnnot=Number(identAnnot[0]);
	    if (annotationencours==valAnnot) {
		if (!($.isArray(resultFinal[nbElementInDico]))) {
		    resultFinal[nbElementInDico]=new Array();
		}
		resultFinal[nbElementInDico]=[];
		resultFinal[nbElementInDico].push(identAnnot[1],DictionnaireDesItems[mot]);  
		for (var nbmot=0;nbmot<LISTEDEMOTS.length;nbmot++) {
		    resultFinal[nbElementInDico].push(LISTEDEMOTS[nbmot]);
		}
		nbElementInDico++;
	    }
	}
	else {
	    if (!($.isArray(resultFinal[nbElementInDico]))) {
		resultFinal[nbElementInDico]=new Array();
	    }
	    resultFinal[nbElementInDico]=[];
	    resultFinal[nbElementInDico].push(mot,DictionnaireDesItems[mot]);  
	    for (var nbmot=0;nbmot<LISTEDEMOTS.length;nbmot++) {
		resultFinal[nbElementInDico].push(LISTEDEMOTS[nbmot]);
	    }
	    nbElementInDico++;
	}
    }
    var my_columns=[];
    var my_item={};
    my_item.sTitle="Item";
    my_columns.push(my_item);
    my_item={};
    my_item.sTitle="FQ";
    my_columns.push(my_item);
    for (var j=0;j<LISTESDESPARTIES.length;j++) {
	var nbPartie=LISTESDESPARTIES[j];
	var labelColumnFq=nbPartie+" / fq";
	my_item={};
	my_item.sTitle=labelColumnFq;
	my_columns.push(my_item);
	var labelColumnSp=nbPartie+" / sp";
	my_item={};
	my_item.sTitle=labelColumnSp;
	my_columns.push(my_item);
    }
    document.getElementById('placeholder2').style.height = "auto";
    document.getElementById('placeholder2').innerHTML = '<h4>Tableau Général des Items <small>(FQ &gt; '+FQMAX+' | annotation:'+annotationencours+')</small><br/>Partition : '+PARTITION+'</h4><table id="MyDicoFreq" class="display" width="100%"></table>';
    // console.log(resultFinal);
// document.getElementById('placeholder2').innerHTML = "<p> 'resultFinal' </p>";
var a = document.body.appendChild(
    document.createElement("a")
);
a.download = "export.txt";
a.href = "data:text/plain;base64," + btoa(JSON.stringify(resultFinal));
a.innerHTML = "download example text";
    $(document).ready(function() {
	$('#MyDicoFreq').DataTable ( {
	    order: [[ 1, "desc" ]],
	    data:resultFinal,
	    lengthMenu: [[10,20,50,100, -1], [10,20, 50,100, "All"]],
	    columns: my_columns,
	    //"deferRender": true,
	    searchHighlight: true,
	    "destroy": true,
	    dom: 'Bfrtip',
	    buttons: [
		'copy', 'csv', 'excel', 'pdf', 'print'
	    ],
	});
    });
    document.getElementById('placeholder').innerHTML = "";
}
//-----------------------------------------------------------------------------------
function specifsTotales() {
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }

    refreshItrameur();

    var seuil=document.getElementById('seuilID').value;
    if (seuil == ''){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur numérique pour le seuil...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    var FQMAX=document.getElementById('fqMaxID').value;
    if (FQMAX == ''){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur numérique pour la FQ MAX...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    //loadProgressBar();
    var DictionnaireDesItems = new Object();
    var DictionnaireNumDesItems = new Object();
    if (annotationencours==1) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
    }
    if (annotationencours==2) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireLemme);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2lemme);
    }
    if (annotationencours==3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireCategorie);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2categorie);
    }
    if (annotationencours>3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireAnnotation);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2annotation);
    }
    var annotationencoursIndex=annotationencours-1;
    var PARTIES = new Object();
    var PARTIESspecif = new Object();
    var nbPartie = 0;
    var DICOTFG = new Object();	
    var DictionnairePartie = new Object(); 
    var FQpartie=new Object(); 
    for (var nbcontxt in LISTESCONTEXTES) {
	nbPartie = nbPartie+1;
	if (PARTIES[nbPartie] === undefined) {
	    PARTIES[nbPartie]=1;
	}
	if (!($.isArray(DictionnairePartie[nbPartie]))) {
	    DictionnairePartie[nbPartie]=new Array();
	}
	FQpartie[nbPartie]=0;
	var infoSource =  LISTESCONTEXTES[nbcontxt].split(":");
	var posDebS=Number(infoSource[0]);
	var posFinS=Number(infoSource[1]);
	for (var i=posDebS;i<=posFinS;i++) {
	    //var item=DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
	    var item="";
	    if (annotationencours<=3) {
		item=DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
	    }
	    else {
		item=annotationencours+"//"+DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
	    }
	    if (!(dicNum2forme[trameForme[i][0]] in dictionnairedesdelims))  {
		if (item in DictionnaireDesItems) {
		    FQpartie[nbPartie]=FQpartie[nbPartie]+1;
		    if (DictionnairePartie[nbPartie].hasOwnProperty(item)) {
			DictionnairePartie[nbPartie][item] = DictionnairePartie[nbPartie][item]  + 1;	
		    }
		    else {
			DictionnairePartie[nbPartie][item] = 1;
		    }
		}
	    }
	}
    }
    for (var mot in DictionnaireDesItems) {
	if (annotationencours>3) {
	    var regex = new RegExp("^" + annotationencours + "\/\/", "gi");
	    if (regex.test(mot)) {
		if (DictionnaireDesItems[mot] > FQMAX) {
		    for (var nbPartie in PARTIES) {
			if (!DictionnairePartie[nbPartie].hasOwnProperty(mot)) {
			    DictionnairePartie[nbPartie][mot]=0;  
			}
			var Tsource = NBMOTTOTALSource;
			var tsource = FQpartie[nbPartie]; /* nb d'occ de la partie */
			var result = CalcCoeffSpec(Tsource,tsource,DictionnaireDesItems[mot],DictionnairePartie[nbPartie][mot] ,seuil); 
			result=precise_round(result,0);
			if (result==Infinity) {result=9e15}
			if (result==-Infinity) {result=-9e15}
			//		if (result >= 50) { result = Infinity};
			//		if (result <= -50) { result = -Infinity};
			if (!($.isArray(DICOTFG[mot]))) {
			    if (!DictionnairePartie[nbPartie].hasOwnProperty(mot)) {
				DICOTFG[mot]=[];
				DICOTFG[mot].push(0)
				DICOTFG[mot].push(0);
			    }
			    else {
				DICOTFG[mot]=[];
				DICOTFG[mot].push(DictionnairePartie[nbPartie][mot]);
				DICOTFG[mot].push(result);
			    }
			}
			else {
			    if (!DictionnairePartie[nbPartie].hasOwnProperty(mot)) {
				DICOTFG[mot].push(0)
				DICOTFG[mot].push(0);
			    }
			    else {			
				DICOTFG[mot].push(DictionnairePartie[nbPartie][mot]);
				DICOTFG[mot].push(result);
			    }
			}
			
		    }
		}
	    }
	}
	else{
	    if (DictionnaireDesItems[mot] > FQMAX) {
		for (var nbPartie in PARTIES) {
		    if (!DictionnairePartie[nbPartie].hasOwnProperty(mot)) {
			DictionnairePartie[nbPartie][mot]=0;  
		    }
		    var Tsource = NBMOTTOTALSource;
		    var tsource = FQpartie[nbPartie]; /* nb d'occ de la partie */
		    var result = CalcCoeffSpec(Tsource,tsource,DictionnaireDesItems[mot],DictionnairePartie[nbPartie][mot] ,seuil); 
		    result=precise_round(result,0);
		    if (result==Infinity) {result=9e15}
		    if (result==-Infinity) {result=-9e15}
		    //		if (result >= 50) { result = Infinity};
		    //		if (result <= -50) { result = -Infinity};
		    if (!($.isArray(DICOTFG[mot]))) {
			if (!DictionnairePartie[nbPartie].hasOwnProperty(mot)) {
			    DICOTFG[mot]=[];
			    DICOTFG[mot].push(0)
			    DICOTFG[mot].push(0);
			}
			else {
			    DICOTFG[mot]=[];
			    DICOTFG[mot].push(DictionnairePartie[nbPartie][mot]);
			    DICOTFG[mot].push(result);
			}
		    }
		    else {
			if (!DictionnairePartie[nbPartie].hasOwnProperty(mot)) {
			    DICOTFG[mot].push(0)
			    DICOTFG[mot].push(0);
			}
			else {			
			    DICOTFG[mot].push(DictionnairePartie[nbPartie][mot]);
			    DICOTFG[mot].push(result);
			}
		    }
		    
		}
	    }
	}
    }
    /*-------------------------------------------------------*/
    /*Affichage resultats */
    var LISTMOTSSource= Object.keys(DICOTFG);/*.sort(function(a,b){
	return a > b ? 1 : a < b ? -1 : 0;
    });
    var LISTMOTSSource = [];
    for (var key in LISTEMOTSTFGSource) {
        LISTMOTSSource.push(LISTEMOTSTFGSource[key]);
    }*/
    var resultFinal=new Array();
    var nbElementInDico=0;
    for (var i=0; i<LISTMOTSSource.length;i++) {
	var mot = LISTMOTSSource[i];
	var tmpmot = mot;
	var LISTEDEMOTS=DICOTFG[mot];
	if (annotationencours>3) {
	    var identAnnot=LISTMOTSSource[i].split("//");
	    var valAnnot=Number(identAnnot[0]);
	    if (annotationencours==valAnnot) {
		if (!($.isArray(resultFinal[nbElementInDico]))) {
		    resultFinal[nbElementInDico]=new Array();
		}
		resultFinal[nbElementInDico]=[];
		resultFinal[nbElementInDico].push(identAnnot[1],DictionnaireDesItems[mot]);  
		for (var nbmot=0;nbmot<LISTEDEMOTS.length;nbmot++) {
		    resultFinal[nbElementInDico].push(LISTEDEMOTS[nbmot]);
		}
		nbElementInDico++;
	    }
	}
	else {
	    if (!($.isArray(resultFinal[nbElementInDico]))) {
		resultFinal[nbElementInDico]=new Array();
	    }
	    resultFinal[nbElementInDico]=[];
	    resultFinal[nbElementInDico].push(mot,DictionnaireDesItems[mot]);  
	    for (var nbmot=0;nbmot<LISTEDEMOTS.length;nbmot++) {
		resultFinal[nbElementInDico].push(LISTEDEMOTS[nbmot]);
	    }
	    //console.log(resultFinal[nbElementInDico]);
	    nbElementInDico++;
	}
    }
    var my_columns=[];
    var my_item={};
    my_item.sTitle="Item";
    my_columns.push(my_item);
    my_item={};
    my_item.sTitle="FQ";
    my_columns.push(my_item);
    for (var j in PARTIES) {
	//console.log("PARTIE"+j+":"+PARTIES[j]);
	var labelColumnFq="S-"+j+" / fq";
	my_item={};
	my_item.sTitle=labelColumnFq;
	my_columns.push(my_item);
	var labelColumnSp="S-"+j+" / sp";
	my_item={};
	my_item.sTitle=labelColumnSp;
	my_columns.push(my_item);
    }
    document.getElementById('placeholder2').style.height = "auto";
    document.getElementById('placeholder2').innerHTML = '<h4>Tableau Général des Items <small>(FQ &gt; '+FQMAX+' | annotation:'+annotationencours+')</small><br/>Partition : SECTIONS</h4><table id="MyDicoFreq" class="display" width="100%"></table>';
    $(document).ready(function() {
	$('#MyDicoFreq').DataTable ( {
	    order: [[ 1, "desc" ]],
	    data:resultFinal,
	    lengthMenu: [[10,20, 50,100, -1], [10,20, 50,100, "All"]],
	    columns: my_columns,
	    //"deferRender": true,
	    searchHighlight: true,
	    "destroy": true,
	    dom: 'Bfrtip',
	    buttons: [
		'copy', 'csv', 'excel', 'pdf', 'print'
	    ],
	});
    });
    document.getElementById('placeholder').innerHTML = "";
}
//-----------------------------------------------------------------------------------
function specifsSections() {
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    var seuil=document.getElementById('seuilID').value;
    if (seuil == ''){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur numérique pour le seuil...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    if (DictionnaireSelectSection.length == 0) {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut créer la carte puis sélectionner des sections pour lancer ce calcul...</span></small>';
	$("#placeholder").html(vide);
	return;
    }
    //-----------------------------------------------------------------
    refreshItrameur();
    //-----------------------------------------------------------------
    var DictionnaireDesItems = new Object();
    var DictionnaireNumDesItems = new Object();
    if (annotationencours==1) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
    }
    if (annotationencours==2) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireLemme);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2lemme);
    }
    if (annotationencours==3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireCategorie);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2categorie);
    }
    if (annotationencours>3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireAnnotation);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2annotation);
    }
    var annotationencoursIndex=annotationencours-1;
    var DictionnairePartie = new Object(); 
    var NBMOTTOTALPartie=0;
    /* il faut calculer la taille de la partie */
    for (var nbsection=0;nbsection<DictionnaireSelectSection.length;nbsection++) {		
	var infoSection=DictionnaireSelectSection[nbsection].split(":");;
	var posDebS=Number(infoSection[0]);
	var posFinS=Number(infoSection[1]);
	for (var i=posDebS;i<=posFinS;i++) {
	    var item="";
	    if (annotationencours<=3) {
		item=DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
	    }
	    else {
		item=annotationencours+"//"+DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
	    }
	    if (item in DictionnaireDesItems)  {
		NBMOTTOTALPartie++;
		if (DictionnairePartie[item] === undefined) {
		    DictionnairePartie[item] = 1;
		}
		else {
		    DictionnairePartie[item] = DictionnairePartie[item]  + 1;
		}
	    }
	}
    }		
    DICOSPECIFS = new Object();	
    DICOSPECIFSGLOBAL = new Object();	
    /*-------- calcul specif-----------------------------------------------*/
    for (var mot in DictionnaireDesItems) {
	if (DictionnairePartie[mot] !== undefined) {
	    //DictionnairePartie[mot] = 0;
	    //}
	    var Tsource = NBMOTTOTALSource;
	    var tsource = NBMOTTOTALPartie; /* nb d'occ de la partie */
	    //var queryText=document.getElementById('poleID').value;
	    //variabledetest=queryText;
	    var result = CalcCoeffSpec(Tsource,tsource,DictionnaireDesItems[mot],DictionnairePartie[mot],seuil); 
	    result=precise_round(result,0);
	    if ((result > 0) || (result < 0)) {
            if (result==Infinity) {result=9e15}
            if (result==-Infinity) {result=-9e15}

            var TMP = [DictionnaireDesItems[mot],DictionnairePartie[mot],result];
            DICOSPECIFS[mot]=TMP;
            DICOSPECIFSGLOBAL[mot]=TMP;
	    }
	    else {
            var TMP = [DictionnaireDesItems[mot],DictionnairePartie[mot],result];
            DICOSPECIFSGLOBAL[mot]=TMP;
	    }
	}
    }
    /*-------------------------------------------------------*/
    /*Affichage resultats */
    var LISTCOOCSource = Object.keys(DICOSPECIFSGLOBAL);
    var resultFinal=new Array();
    for (var i=0; i<LISTCOOCSource.length;i++) {
	var mot = LISTCOOCSource[i];
	var tmpmot = mot;
	if (annotationencours>3) {
	    tmpmot=mot.replace(/^[0-9]+\/\//, "");
	}
	var tmp=DICOSPECIFSGLOBAL[mot].toString();
	var values = tmp.split(',');
	var result=values[2];
//	if (values[2] >= 50) { result = Infinity};
//	if (values[2] <= -50) { result = -Infinity};
	if (!($.isArray(resultFinal[i]))) {
	    resultFinal[i]=new Array();
	}
	resultFinal[i]=[];
	resultFinal[i].push(tmpmot,values[0],values[1],result);      
    }
    document.getElementById('placeholder').innerHTML = '<h4>Spécificités des sections sélectionnées</h4><table id="SpecifSections" class="display" width="50%"></table>';
    $(document).ready(function() {
	$('#SpecifSections').DataTable ( {
	    order: [[ 3, "desc" ]],
	    searchHighlight: true,
	    "destroy": true,
	    data:resultFinal,
	    lengthMenu: [[10, 25, 50,100, -1], [10, 25, 50,100, "All"]],
		dom: 'Bfrtip',
		buttons: [
				'copy', 'csv', 'excel', 'pdf', 'print'
			],
	    columns: [
		{title: "Item"},
		{title: "FQ"},
		{title: "fq"},
		{title: "Sp"}
	    ]
	})
    });
}
//-----------------------------------------------------------------------------------
// FONCTIONS BITEXT
//-----------------------------------------------------------------------------------
function loadcoocbitexte(TYPE) {
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    refreshItrameur();

    GrapheArborL=document.getElementById('grLID').value;
    GrapheArborH=document.getElementById('grHID').value;	
    reinit_canvas();
    var DictionnaireDesItems = new Object();
    var DictionnaireNumDesItems = new Object();
    if (annotationencours==1) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
    }
    if (annotationencours==2) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireLemme);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2lemme);
    }
    if (annotationencours==3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireCategorie);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2categorie);
    }
    if (annotationencours>3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireAnnotation);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2annotation);
    }
    var annotationencoursIndex=annotationencours-1;
    
    var seuil=document.getElementById('seuilID').value;
    if (seuil == ''){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur numérique pour le seuil...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    var indspmin=document.getElementById('IndSPminID').value;
    if (indspmin == ''){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur numérique pour le indspmin...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    var contexteDelim=document.getElementById('contexteID').value;
    if (contexteDelim == ''){
	contexteDelim ="\n";
    }
    var TYPECOOC;
    var queryTextSource="";
    var queryTextCible="";
    if (TYPE == 1) {
	queryTextSource=document.getElementById('poleID').value;
	if ((queryTextSource == '')  | (queryTextSource == 'entrez la forme pôle')) {
	    var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez un pôle pour pouvoir lancer le calcul...</span></small>';
	    $("#placeholder").html(vide);
	    return;
	}
	if (annotationencours <= 3) {
	    if (!(queryTextSource in DictionnaireDesItems) ) {
		var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Le pôle choisi n\'est pas dans le dictionnaire...</span></small>';
		$("#placeholder").html(vide);		
		return;	
	    }
	}
	else {
	    var tmpannot=annotationencours+"//"+queryTextSource;
	    if (!(tmpannot in DictionnaireDesItems) ) {
		var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Le pôle choisi n\'est pas dans le dictionnaire...</span></small>';
		$("#placeholder").html(vide);		
		return;	
	    }	
	}	
	queryTextCible=document.getElementById('poleCibleID').value;
	TYPECOOC=1;
    }
    if (TYPE == 0) {
	queryTextCible=document.getElementById('poleCibleID').value;
	if ((queryTextCible == '') | (queryTextCible == 'entrez la forme pôle')){
	    var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez un pôle pour pouvoir lancer le calcul...</span></small>';
	    $("#placeholder").html(vide);
	    return;
	}
	if (annotationencours <= 3) {
	    if (!(queryTextCible in DictionnaireDesItems) ) {
		var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Le pôle choisi n\'est pas dans le dictionnaire...</span></small>';
		$("#placeholder").html(vide);		
		return;	
	    }
	}
	else {
	    var tmpannot=annotationencours+"//"+queryTextCible;
	    if (!(tmpannot in DictionnaireDesItems) ) {
		var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Le pôle choisi n\'est pas dans le dictionnaire...</span></small>';
		$("#placeholder").html(vide);		
		return;	
	    }		
	}		
	queryTextSource=document.getElementById('poleID').value;
	TYPECOOC=0;
    }
    var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:#FDBBD2">Calcul en cours</span></small>';
    $("#placeholder").html(vide);
    var COFREQ = new Object(); // or just {} 
    var resultsMatch=0;
    var nbContexte=0;
    LISTESCONTEXTESSourceBitexte= new Object(); // or just {} 
    LISTESCONTEXTESCibleBitexte= new Object(); // or just {} 	*/
    var DICOPARPARTIESource = new Object(); 
    var DICOPARPARTIECible = new Object(); 
    var FQpartieSource=0;
    var FQpartieCible=0;
    for (var nblines in LISTESCONTEXTESSOURCE) {
	var infoSource =  LISTESCONTEXTESSOURCE[nblines].split(":");
	var posDebS=Number(infoSource[0]);
	var posFinS=Number(infoSource[1]);		
	var nblinesC=Number(nblines)+(nbSectionInCarte/2);
	var infoCible =  LISTESCONTEXTESCIBLE[nblinesC].split(":");
	var posDebC=Number(infoCible[0]);
	var posFinC=Number(infoCible[1]);		
        if (TYPE == 1) {
	    var verifMatch=0;
	    for (var i=posDebS;i<=posFinS;i++) {
		var item=DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
		if (!(dicNum2forme[trameForme[i][0]] in dictionnairedesdelims))  {
		    if (item == queryTextSource) {
			verifMatch=1;
		    }
		}
	    }
	    if (verifMatch == 1) {
		nbContexte++;
		LISTESCONTEXTESSourceBitexte[nbContexte]=posDebS+":"+posFinS;//LISTESCONTEXTESSOURCE[nblines];
		LISTESCONTEXTESCibleBitexte[nbContexte]=posDebC+":"+posFinC;//LISTESCONTEXTESCIBLE[nblines];
		/* Calcul du dico dans CONTEXTES */
		for (var i=posDebS;i<=posFinS;i++) {
		    var item=DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
		    if (!(dicNum2forme[trameForme[i][0]] in dictionnairedesdelims))  {
			FQpartieSource=FQpartieSource+1;
			if (DICOPARPARTIESource[item] === undefined) {
			    DICOPARPARTIESource[item] = 1;
			}
			else {
			    DICOPARPARTIESource[item] = DICOPARPARTIESource[item]  + 1;
			}
		    }
		}
		for (var i=posDebC;i<=posFinC;i++) {
		    var item=DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
		    if (!(dicNum2forme[trameForme[i][0]] in dictionnairedesdelims))  {
			FQpartieCible=FQpartieCible+1;
			if (DICOPARPARTIECible[item] === undefined) {
			    DICOPARPARTIECible[item] = 1;
			}
			else {
			    DICOPARPARTIECible[item] = DICOPARPARTIECible[item]  + 1;
			}
		    }
		}
	    }
	}
        if (TYPE == 0) {
	    var verifMatch=0;
	    for (var i=posDebC;i<=posFinC;i++) {
		var item=DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
		if (!(dicNum2forme[trameForme[i][0]] in dictionnairedesdelims))  {
		    if (item == queryTextCible) {
			verifMatch=1;
		    }
		}
	    }
	    if (verifMatch == 1) {
		nbContexte++;
		LISTESCONTEXTESSourceBitexte[nbContexte]=posDebS+":"+posFinS;//LISTESCONTEXTESSOURCE[nblines];
		LISTESCONTEXTESCibleBitexte[nbContexte]=posDebC+":"+posFinC;//LISTESCONTEXTESCIBLE[nblines];
		/* Calcul du dico dans CONTEXTES */
		for (var i=posDebS;i<=posFinS;i++) {
		    var item=DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
		    if (!(dicNum2forme[trameForme[i][0]] in dictionnairedesdelims))  {
			FQpartieSource=FQpartieSource+1;
			if (DICOPARPARTIESource[item] === undefined) {
			    DICOPARPARTIESource[item] = 1;
			}
			else {
			    DICOPARPARTIESource[item] = DICOPARPARTIESource[item]  + 1;
			}
		    }
		}
		for (var i=posDebC;i<=posFinC;i++) {
		    var item=DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
		    if (!(dicNum2forme[trameForme[i][0]] in dictionnairedesdelims))  {
			FQpartieCible=FQpartieCible+1;
			if (DICOPARPARTIECible[item] === undefined) {
			    DICOPARPARTIECible[item] = 1;
			}
			else {
			    DICOPARPARTIECible[item] = DICOPARPARTIECible[item]  + 1;
			}
		    }
		}
	    }
	}
    }
    /*calcul cooc */
    DICOTFGSource = new Object();	
    var NBcoocSource=0;
    DICOTFGCible = new Object();	
    var NBcoocCible=0;
    /*-------- calcul specif-----------------------------------------------*/
    for (var motS in DICOPARPARTIESource) {
	var Tsource = nbMotBitextSource;
	var tsource = FQpartieSource; 
	var result = CalcCoeffSpec(Tsource,tsource,DictionnaireBitextSource[motS],DICOPARPARTIESource[motS],seuil); 
	result=precise_round(result,0);
    if (result==Infinity) {result=9e15}
    if (result==-Infinity) {result=-9e15}
	if ((result >= indspmin)) {
	    var TMP = [DictionnaireBitextSource[motS],DICOPARPARTIESource[motS],result];
	    DICOTFGSource[motS]=TMP;
	    NBcoocSource+=1;
	}	
    }
    for (var motC in DICOPARPARTIECible) {
	var Tsource = nbMotBitextCible;
	var tsource = FQpartieCible ; 
	var result = CalcCoeffSpec(Tsource,tsource,DictionnaireBitextCible[motC],DICOPARPARTIECible[motC],seuil); 
	//alert(Tsource+":"+tsource+":"+DictionnaireBitextCible[motC]+":"+DICOPARPARTIECible[motC])
	result=precise_round(result,0);
    if (result==Infinity) {result=9e15}
    if (result==-Infinity) {result=-9e15}
	if ((result >= indspmin)) {
	    var TMP = [DictionnaireBitextCible[motC],DICOPARPARTIECible[motC],result];
	    DICOTFGCible[motC]=TMP;
	    NBcoocCible+=1;
	}
    }
    
    /*-------------------------------------------------------*/
    /*Affichage resultats */
    /*vide ='<span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:yellow"><small>Contextes SOURCE : '+nbAlignSource+ '. Contextes CIBLE : '+nbAlignCible+'.</small></span>';
      document.getElementById('placeholder').innerHTML = vide;*/
    var LISTEMOTSTFGSource= Object.keys(DICOTFGSource).sort(function(a,b){
	var x = DICOTFGSource[a][2];
	var y = DICOTFGSource[b][2];
	return x < y ? 1 : x > y ? -1 : 0;
    });
    var LISTCOOCSource = [];
    var LISTVALUECOOCSource = [];
    for (var key in LISTEMOTSTFGSource) {
        LISTCOOCSource.push(LISTEMOTSTFGSource[key]);
	LISTVALUECOOCSource.push(DICOTFGSource[LISTEMOTSTFGSource[key]]);
    }
    var table='';
    table += '<table align="center" class="myTable">';
    table += '<tr><th colspan="4"><b>SOURCE</b></th></tr><tr>';
    table +='    <th width="40%">Cooc</th>';
    table +='    <th width="20%">FqCooc total</th>';
    table +='    <th width="20%">FqCooc contexte</th>';
    table +='    <th width="20%">IndSP</th>';
    table += '</tr>';
    for (var i=0; i<LISTCOOCSource.length;i++) {
	var tmp=DICOTFGSource[LISTCOOCSource[i]].toString();
	var values = tmp.split(',');
	var result=values[2];
	var colornode="#fee7cd";
	if (result >= 50) {colornode="#ff0000";result="**" } 
	if ((result >= 30) && (result < 50  ) ) {colornode="#ff5555" } 
	if ((result >= 20) && (result < 30  ) ) {colornode="#ff8484" } 
	if ((result >= 10) && (result < 20  ) ) {colornode="#f3838b" } 
	if ((result >= 5) && (result < 10  ) ) {colornode="#ffb0b0" } 
//	if (values[2] >= 50) { result = Infinity};
	table +='<tr><td><span style="background-color:'+ colornode +'"><a href="javascript:onclickWordBitexte(\''+LISTCOOCSource[i]+',1\')">'+LISTCOOCSource[i]+'</a></span></td><td>'+values[0]+'</td><td>'+values[1]+'</td><td><b><font color="red">'+result+'</font></b></td></tr>';
    }
    table +='</table>';
    var LISTEMOTSTFGCible= Object.keys(DICOTFGCible).sort(function(a,b){
	var x = DICOTFGCible[a][2];
	var y = DICOTFGCible[b][2];
		return x < y ? 1 : x > y ? -1 : 0;
    });
    var LISTCOOCCible = [];
    var LISTVALUECOOCCible = [];
    for (var key in LISTEMOTSTFGCible) {
        LISTCOOCCible.push(LISTEMOTSTFGCible[key]);
	LISTVALUECOOCCible.push(DICOTFGCible[LISTEMOTSTFGCible[key]]);
    }
    var table2='';
    table2 += '<table align="center" class="myTable">';
    table2 += '<tr><th colspan="4"><b>CIBLE</b></th></tr><tr>';
    table2 +='    <th width="40%">Cooc</th>';
    table2 +='    <th width="20%">FqCooc total</th>';
    table2 +='    <th width="20%">FqCooc contexte</th>';
    table2 +='    <th width="20%">IndSP</th>';
    table2 += '</tr>';
    for (var i=0; i<LISTCOOCCible.length;i++) {
	var tmp=DICOTFGCible[LISTCOOCCible[i]].toString();
	var values = tmp.split(',');
	var result=values[2];
	var colornode="#fee7cd";
	if (result >= 50) {colornode="#ff0000";result="**" } 
	if ((result >= 30) && (result < 50  ) ) {colornode="#ff5555" } 
	if ((result >= 20) && (result < 30  ) ) {colornode="#ff8484" } 
	if ((result >= 10) && (result < 20  ) ) {colornode="#f3838b" } 
	if ((result >= 5) && (result < 10  ) ) {colornode="#ffb0b0" } 
//	if (values[2] >= 50) { result = Infinity};
	table2 +='<tr><td><span style="background-color:'+ colornode +'"><a href="javascript:onclickWordBitexte(\''+LISTCOOCCible[i]+',0\')">'+LISTCOOCCible[i]+'</a></span></td><td>'+values[0]+'</td><td>'+values[1]+'</td><td><b><font color="red">'+result+'</font></b></td></tr>';        
    }
    table2 +='</table>';
    document.getElementById('placeholder2').style.height = "200px";
    document.getElementById('placeholder2').innerHTML = '';	
    document.getElementById('placeholder2').innerHTML = '<div id="placeholderSource">'+table+'</div><div id="placeholderCible">'+table2+'</div>';
    ;
    document.getElementById('placeholder').innerHTML = '<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:#FDBBD2">Clic sur mot : contexte</span></small>';
    /*-----------------------GRAPHE-----------------------------------------------------------------------*/
    if ((NBcoocSource > 1 ) | (NBcoocCible > 1)){	
	var verifpoles="NO";
	if (annotationencours <=3) {
	    if ((queryTextSource in DictionnaireDesItems) && (queryTextCible in DictionnaireDesItems)) {
		verifpoles="YES";
	    }
	}
	else {
	    var tmpannot1=annotationencours+"//"+queryTextSource;
	    var tmpAnnot2=annotationencours+"//"+queryTextCible;
	    if ((tmpannot1 in DictionnaireDesItems) && (tmpAnnot2 in DictionnaireDesItems)) {
		verifpoles="YES";
	    }
	}
	if (verifpoles=="YES") {
	    document.getElementById('legendGraphe').innerHTML = "";
	    var legend ='<small><b>Couleur Noeud-Cooc</b> : <span style="background-color:#fee7cd;color:black">IndicSp</span>&lt;<b>5</b>&lt;<span style="background-color:#ffb0b0;color:black">IndicSp</span>&lt;<b>10</b>&lt;<span style="background-color:#f3838b;color:black">IndicSp</span>&lt;<b>20</b>&lt;<span style="background-color:#ff8484;color:black">IndicSp</span>&lt;<b>30</b>&lt;<span style="background-color:#ff5555;color:black">IndicSp</span>&lt;<b>50</b>&lt;<span style="background-color:#ff0000;color:black">IndicSp</span><br/><b>Arc Label</b> : <b>POLE</b><font color="#99CC99">&#x2212;</font>IndiceSpécif(Co-Freq)<font color="#99CC99">&#8594;</font><b>COOC</b></small><br/><span style="background:yellow"><img onclick="clear_canvas();" src="./images/trash.png" title="suppression graphique" alt="suppression graphique"/></span>';
	    document.getElementById('legendGraphe').innerHTML = legend;
	    /*----*/
	    sysArbor =  new arbor.ParticleSystem(20, 600, 0.8, false, 50, 0.015, 0.6);
	    //var sys = new arbor.ParticleSystem(30, 800,1,true);
	    /*sys.parameters({ stiffness: 800,
			     repulsion: 200,
			     gravity: true,
			     dt:0.015,
			     friction: 0.8});*/
	    var poleSource = sysArbor.addNode('POLES',{'color':'red','shape':'dot','label':queryTextSource});
	    var poleCible = sysArbor.addNode('POLEC',{'color':'red','shape':'dot','label':queryTextCible});
	    LISTEDESNOEUDSINCANVAS.push(poleSource);
	    LISTEDESNOEUDSINCANVAS.push(poleCible);
	    var nodeMotSource;
	    var cpmotS=1;
	    for (var mot in DICOTFGSource) {
		var nodename=mot;
		if (mot != queryTextSource) {
		    cpmotS++;			
		    var tmp=DICOTFGSource[mot].toString();
		    var values = tmp.split(',');
		    var result=values[2];
		    /* parametrage des noeuds */
		    var colornode="#fee7cd";
		    if (result >= 50) {colornode="#ff0000" } 
		    if ((result >= 30) && (result < 50  ) ) {colornode="#ff5555" } 
		    if ((result >= 20) && (result < 30  ) ) {colornode="#ff8484" } 
		    if ((result >= 10) && (result < 20  ) ) {colornode="#f3838b" } 
		    if ((result >= 5) && (result < 10  ) ) {colornode="#ffb0b0" } 		
		    nodeMotSource =sysArbor.addNode(nodename,{'color':colornode,'shape':'rectangle','label':mot});
		    LISTEDESNOEUDSINCANVAS.push(nodeMotSource);			
		    /* parametrage de l'edge */
//		    if (values[2] >= 50) { result = Infinity};
		    if (result >= 50) {result="**" } ;
		    var label = result + ' ('+ values[1] +') ';
		    sysArbor.addEdge(poleSource, nodeMotSource,{'weight':5,'color':'#99CC99','directed':1,'length':.75, 'pointSize':10,data:{name:label}});
		}
	    }
	    var nodeMotCible;
	    var cpmotC=1;
	    for (var mot in DICOTFGCible) {
		var nodename=mot;
		if (mot != queryTextCible) {
		    cpmotC++;			
		    var tmp=DICOTFGCible[mot].toString();
		    var values = tmp.split(',');
		    var result=values[2];
		    /* parametrage des noeuds */
		    var colornode="#fee7cd";
		    if (result >= 50) {colornode="#ff0000" } 
		    if ((result >= 30) && (result < 50  ) ) {colornode="#ff5555" } 
		    if ((result >= 20) && (result < 30  ) ) {colornode="#ff8484" } 
		    if ((result >= 10) && (result < 20  ) ) {colornode="#f3838b" } 
		    if ((result >= 5) && (result < 10  ) ) {colornode="#ffb0b0" } 		
		    nodeMotCible =sysArbor.addNode(nodename,{'color':colornode,'shape':'rectangle','label':mot});
			LISTEDESNOEUDSINCANVAS.push(nodeMotCible);			
		    /* parametrage de l'edge */
//		    if (values[2] >= 50) { result = Infinity};
		    if (result >= 50) {result="**" } ;
		    var label = result + ' ('+ values[1] +') ';
		    sysArbor.addEdge(poleCible, nodeMotCible,{'weight':5,'color':'#99CC99','directed':1,'length':.75, 'pointSize':10,data:{name:label}});
		}
	    }
	    sysArbor.renderer = Renderer("#grapheHolder");
	    /*sys.graft(theUI) ;*/
	}
	else {
	    var canvas = document.getElementById('grapheHolder');
	    var ctx = canvas.getContext('2d');
	    GrapheArborL=800;
	    GrapheArborH=100;	
	    reinit_canvas();
	    ctx.font="20px Georgia";
	    ctx.fillText("1 pôle source et un pôle cible",40,50);
	    ctx.fillText("pour construire un graphe !! ",60,90);
	    ctx.font="20px Georgia";
	}
    }
    else {
	var canvas = document.getElementById('grapheHolder');
	var ctx = canvas.getContext('2d');
	GrapheArborL=800;
	GrapheArborH=100;	
	reinit_canvas();
	ctx.font="20px Georgia";
	ctx.fillText("Pas de cooccurrents, pas de graphe !! ",40,50);
	ctx.font="20px Georgia";
	ctx.fillText("Modifiez les paramètres de calcul ",60,90);
    }
    /*---------------------GRAPHE-------------------------------------------------------------------------*/
}
/***********************************************************************************************************/
function specifSectionsBITEXTE(TYPE) {
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    if (DictionnaireSelectSection.length == 0) {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut sélectionner des sections pour lancer ce calcul (projection sur la carte)...</span></small>';
	$("#placeholder").html(vide);
	return;
    }

    refreshItrameur();

    //GrapheArborL=document.getElementById('grLID').value;
    //GrapheArborH=document.getElementById('grHID').value;	
    //reinit_canvas();
    var DictionnaireDesItems = new Object();
    var DictionnaireNumDesItems = new Object();
    if (annotationencours==1) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
    }
    if (annotationencours==2) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireLemme);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2lemme);
    }
    if (annotationencours==3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireCategorie);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2categorie);
    }
    if (annotationencours>3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireAnnotation);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2annotation);
    }
    var annotationencoursIndex=annotationencours-1;
    
    var seuil=document.getElementById('seuilID').value;
    if (seuil == ''){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur numérique pour le seuil...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    var indspmin=document.getElementById('IndSPminID').value;
    if (indspmin == ''){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur numérique pour le indspmin...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    var contexteDelim=document.getElementById('contexteID').value;
    if (contexteDelim == ''){
	contexteDelim ="\n";
    }
    var TYPECOOC;
    if (TYPE == 1) {
	TYPECOOC=1;
    }
    if (TYPE == 0) {
	TYPECOOC=0;
    }
    var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:#FDBBD2">Calcul en cours</span></small>';
    $("#placeholder").html(vide);

    var COFREQ = new Object(); // or just {} 
    var resultsMatch=0;
    var nbContexte=0;
    LISTESCONTEXTESSourceBitexte= new Object(); // or just {} 
    LISTESCONTEXTESCibleBitexte= new Object(); // or just {} 	*/
    var DICOPARPARTIESource = new Object(); 
    var DICOPARPARTIECible = new Object(); 
    var FQpartieSource=0;
    var FQpartieCible=0;

    for (var nblines in LISTESCONTEXTESSOURCE) {
	var infoSource =  LISTESCONTEXTESSOURCE[nblines].split(":");
	var posDebS=Number(infoSource[0]);
	var posFinS=Number(infoSource[1]);		
	var nblinesC=Number(nblines)+(nbSectionInCarte/2);
	var infoCible =  LISTESCONTEXTESCIBLE[nblinesC].split(":");
	var posDebC=Number(infoCible[0]);
	var posFinC=Number(infoCible[1]);		
        if (TYPE == 1) {
	    if (ListSelectSection[nblines]==1) {
		nbContexte++;
		LISTESCONTEXTESSourceBitexte[nbContexte]=posDebS+":"+posFinS;//LISTESCONTEXTESSOURCE[nblines];
		LISTESCONTEXTESCibleBitexte[nbContexte]=posDebC+":"+posFinC;//LISTESCONTEXTESCIBLE[nblines];
		/* Calcul du dico dans CONTEXTES */
		for (var i=posDebS;i<=posFinS;i++) {
		    var item=DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
		    if (!(dicNum2forme[trameForme[i][0]] in dictionnairedesdelims))  {
			FQpartieSource=FQpartieSource+1;
			if (DICOPARPARTIESource[item] === undefined) {
			    DICOPARPARTIESource[item] = 1;
			}
			else {
			    DICOPARPARTIESource[item] = DICOPARPARTIESource[item]  + 1;
			}
		    }
		}
		for (var i=posDebC;i<=posFinC;i++) {
		    var item=DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
		    if (!(dicNum2forme[trameForme[i][0]] in dictionnairedesdelims))  {
			FQpartieCible=FQpartieCible+1;
			if (DICOPARPARTIECible[item] === undefined) {
			    DICOPARPARTIECible[item] = 1;
			}
			else {
			    DICOPARPARTIECible[item] = DICOPARPARTIECible[item]  + 1;
			}
		    }
		}
	    }
	}
        if (TYPE == 0) {
	    if (ListSelectSection[nblinesC]==1) {
		nbContexte++;
		LISTESCONTEXTESSourceBitexte[nbContexte]=posDebS+":"+posFinS;//LISTESCONTEXTESSOURCE[nblines];
		LISTESCONTEXTESCibleBitexte[nbContexte]=posDebC+":"+posFinC;//LISTESCONTEXTESCIBLE[nblines];
		/* Calcul du dico dans CONTEXTES */
		for (var i=posDebS;i<=posFinS;i++) {
		    var item=DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
		    if (!(dicNum2forme[trameForme[i][0]] in dictionnairedesdelims))  {
			FQpartieSource=FQpartieSource+1;
			if (DICOPARPARTIESource[item] === undefined) {
			    DICOPARPARTIESource[item] = 1;
			}
			else {
			    DICOPARPARTIESource[item] = DICOPARPARTIESource[item]  + 1;
			}
		    }
		}
		for (var i=posDebC;i<=posFinC;i++) {
		    var item=DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
		    if (!(dicNum2forme[trameForme[i][0]] in dictionnairedesdelims))  {
			FQpartieCible=FQpartieCible+1;
			if (DICOPARPARTIECible[item] === undefined) {
			    DICOPARPARTIECible[item] = 1;
			}
			else {
			    DICOPARPARTIECible[item] = DICOPARPARTIECible[item]  + 1;
			}
		    }
		}
	    }
	}
    }
    /*calcul cooc */
    DICOTFGSource = new Object();	
    var NBcoocSource=0;
    DICOTFGCible = new Object();	
    var NBcoocCible=0;
    /*-------- calcul specif-----------------------------------------------*/
    for (var motS in DICOPARPARTIESource) {
	var Tsource = nbMotBitextSource;
	var tsource = FQpartieSource; 
	var result = CalcCoeffSpec(Tsource,tsource,DictionnaireBitextSource[motS],DICOPARPARTIESource[motS],seuil); 
	result=precise_round(result,0);
    if (result==Infinity) {result=9e15}
    if (result==-Infinity) {result=-9e15}
	if ((result >= indspmin)) {
	    var TMP = [DictionnaireBitextSource[motS],DICOPARPARTIESource[motS],result];
	    DICOTFGSource[motS]=TMP;
	    NBcoocSource+=1;
	}	
    }
    for (var motC in DICOPARPARTIECible) {
	var Tsource = nbMotBitextCible;
	var tsource = FQpartieCible ; 
	var result = CalcCoeffSpec(Tsource,tsource,DictionnaireBitextCible[motC],DICOPARPARTIECible[motC],seuil); 
	//alert(Tsource+":"+tsource+":"+DictionnaireBitextCible[motC]+":"+DICOPARPARTIECible[motC])
	result=precise_round(result,0);
    if (result==Infinity) {result=9e15}
    if (result==-Infinity) {result=-9e15}
	if ((result >= indspmin)) {
	    var TMP = [DictionnaireBitextCible[motC],DICOPARPARTIECible[motC],result];
	    DICOTFGCible[motC]=TMP;
	    NBcoocCible+=1;
	}
    }
    
    /*-------------------------------------------------------*/
    /*Affichage resultats */
    /*vide ='<span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:yellow"><small>Contextes SOURCE : '+nbAlignSource+ '. Contextes CIBLE : '+nbAlignCible+'.</small></span>';
      document.getElementById('placeholder').innerHTML = vide;*/
    var LISTEMOTSTFGSource= Object.keys(DICOTFGSource).sort(function(a,b){
	var x = DICOTFGSource[a][2];
	var y = DICOTFGSource[b][2];
	return x < y ? 1 : x > y ? -1 : 0;
    });
    var LISTCOOCSource = [];
    var LISTVALUECOOCSource = [];
    for (var key in LISTEMOTSTFGSource) {
        LISTCOOCSource.push(LISTEMOTSTFGSource[key]);
	LISTVALUECOOCSource.push(DICOTFGSource[LISTEMOTSTFGSource[key]]);
    }
    var table='';
    table += '<table align="center" class="myTable">';
    table += '<tr><th colspan="4"><b>SOURCE</b></th></tr><tr>';
    table +='    <th width="40%">Cooc</th>';
    table +='    <th width="20%">FqCooc total</th>';
    table +='    <th width="20%">FqCooc contexte</th>';
    table +='    <th width="20%">IndSP</th>';
    table += '</tr>';
    for (var i=0; i<LISTCOOCSource.length;i++) {
	var tmp=DICOTFGSource[LISTCOOCSource[i]].toString();
	var values = tmp.split(',');
	var result=values[2];
	var colornode="#fee7cd";
	if (result >= 50) {colornode="#ff0000" } 
	if ((result >= 30) && (result < 50  ) ) {colornode="#ff5555" } 
	if ((result >= 20) && (result < 30  ) ) {colornode="#ff8484" } 
	if ((result >= 10) && (result < 20  ) ) {colornode="#f3838b" } 
	if ((result >= 5) && (result < 10  ) ) {colornode="#ffb0b0" } 
//	if (values[2] >= 50) { result = Infinity};
	table +='<tr><td><span style="background-color:'+ colornode +'"><a href="javascript:onclickWordBitexte(\''+LISTCOOCSource[i]+',1\')">'+LISTCOOCSource[i]+'</a></span></td><td>'+values[0]+'</td><td>'+values[1]+'</td><td><b><font color="red">'+result+'</font></b></td></tr>';
    }
    table +='</table>';
    var LISTEMOTSTFGCible= Object.keys(DICOTFGCible).sort(function(a,b){
	var x = DICOTFGCible[a][2];
	var y = DICOTFGCible[b][2];
		return x < y ? 1 : x > y ? -1 : 0;
    });
    var LISTCOOCCible = [];
    var LISTVALUECOOCCible = [];
    for (var key in LISTEMOTSTFGCible) {
        LISTCOOCCible.push(LISTEMOTSTFGCible[key]);
	LISTVALUECOOCCible.push(DICOTFGCible[LISTEMOTSTFGCible[key]]);
    }
    var table2='';
    table2 += '<table align="center" class="myTable">';
    table2 += '<tr><th colspan="4"><b>CIBLE</b></th></tr><tr>';
    table2 +='    <th width="40%">Cooc</th>';
    table2 +='    <th width="20%">FqCooc total</th>';
    table2 +='    <th width="20%">FqCooc contexte</th>';
    table2 +='    <th width="20%">IndSP</th>';
    table2 += '</tr>';
    for (var i=0; i<LISTCOOCCible.length;i++) {
	var tmp=DICOTFGCible[LISTCOOCCible[i]].toString();
	var values = tmp.split(',');
	var result=values[2];
	var colornode="#fee7cd";
	if (result >= 50) {colornode="#ff0000" } 
	if ((result >= 30) && (result < 50  ) ) {colornode="#ff5555" } 
	if ((result >= 20) && (result < 30  ) ) {colornode="#ff8484" } 
	if ((result >= 10) && (result < 20  ) ) {colornode="#f3838b" } 
	if ((result >= 5) && (result < 10  ) ) {colornode="#ffb0b0" } 
//	if (values[2] >= 50) { result = Infinity};
	table2 +='<tr><td><span style="background-color:'+ colornode +'"><a href="javascript:onclickWordBitexte(\''+LISTCOOCCible[i]+',0\')">'+LISTCOOCCible[i]+'</a></span></td><td>'+values[0]+'</td><td>'+values[1]+'</td><td><b><font color="red">'+result+'</font></b></td></tr>';        
    }
    table2 +='</table>';
    document.getElementById('placeholder2').style.height = "200px";
    document.getElementById('placeholder2').innerHTML = '';	
    document.getElementById('placeholder2').innerHTML = '<div id="placeholderSource">'+table+'</div><div id="placeholderCible">'+table2+'</div>';
    ;
    document.getElementById('placeholder').innerHTML = '<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:#FDBBD2">Clic sur mot : contexte</span></small>';
}

//-----------------------------------------------------------------------------------
function biconcordance() {
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }

    refreshItrameur();

    var DictionnaireDesItems = new Object();
    var DictionnaireNumDesItems = new Object();
    var DictionnaireDesItemsOut = new Object();
    var DictionnaireNumDesItemsOut = new Object();
    if (annotationencours==1) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
	if (annotationencours != annotationencoursOUT) {
	    if (annotationencoursOUT==2) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireLemme);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2lemme);
	    }
	    if (annotationencoursOUT==3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireCategorie);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2categorie);
	    }
	    if (annotationencoursOUT>3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
	    }
	}
    }
    if (annotationencours==2) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireLemme);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2lemme);
	if (annotationencours != annotationencoursOUT) {
	    if (annotationencoursOUT==1) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireSource);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2forme);
	    }
	    if (annotationencoursOUT==3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireCategorie);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2categorie);
	    }
	    if (annotationencoursOUT>3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
	    }
	}
    }
    if (annotationencours==3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireCategorie);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2categorie);
	if (annotationencours != annotationencoursOUT) {
	    if (annotationencoursOUT==1) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireSource);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2forme);
	    }
	    if (annotationencoursOUT==2) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireLemme);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2lemme);
	    }
	    if (annotationencoursOUT>3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
	    }
	}
    }
    if (annotationencours>3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireAnnotation);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2annotation);
	if (annotationencours != annotationencoursOUT) {
	    if (annotationencoursOUT==1) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireSource);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2forme);
	    }
	    if (annotationencoursOUT==2) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireLemme);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2lemme);
	    }
	    if (annotationencoursOUT==3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireCategorie);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2categorie);
	    }
	    if (annotationencoursOUT>3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
	    }
	}
    }
    var annotationencoursIndex=annotationencours-1;
    var annotationencoursIndexOUT=annotationencoursOUT-1;

    var lgcontexte=document.getElementById('lgcontexteID').value;
    
    var queryTextSource=document.getElementById('poleID').value;
    var queryTextCible=document.getElementById('poleCibleID').value;
    
    if ((queryTextSource == '') & (queryTextCible == '')) {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez au moins un pôle  pour pouvoir lancer le calcul...</span></small>';
	$("#placeholder").html(vide);
        return;
    }
    
    if ((queryTextSource == 'entrez la forme pôle') & (queryTextCible == 'entrez la forme pôle')) {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez au moins un pôle  pour pouvoir lancer le calcul...</span></small>';
	$("#placeholder").html(vide);
        return;
    }
    
    if ((queryTextSource != '') & (queryTextSource != 'entrez la forme pôle')){
	if (annotationencours <=3) {
	    if (!(queryTextSource in DictionnaireDesItems) ) {
		var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Le pôle source choisi n\'est pas dans le dictionnaire...</span></small>';
		$("#placeholder").html(vide);		
		return;	
	    }
	}
	else {
	    var tmpannot=annotationencours+"//"+queryTextSource;
	    if (!(tmpannot in DictionnaireDesItems) ) {
		var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Le pôle choisi n\'est pas dans le dictionnaire...</span></small>';
		$("#placeholder").html(vide);		
		return;	
	    }	
	}	
    }
    
    if ((queryTextCible != '') & (queryTextCible != 'entrez la forme pôle')){
	if (annotationencours <=3) {
	    if (!(queryTextCible in DictionnaireDesItems) ) {
		var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Le pôle choisi cible n\'est pas dans le dictionnaire...</span></small>';
		$("#placeholder").html(vide);
		return;	
	    }
	}
	else {
	    var tmpannot=annotationencours+"//"+queryTextCible;
	    if (!(tmpannot in DictionnaireDesItems) ) {
		var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Le pôle choisi n\'est pas dans le dictionnaire...</span></small>';
		$("#placeholder").html(vide);
		return;	
	    }	
	}
    }		
    
    var table='';
    table += '<table id="BICONCORDANCE" class="display" width="100%">';
    /*--------------------------*/
    var nbcontexteglobal=0;	
    for (var contexte in LISTESCONTEXTESSOURCE) {
	var infoSource =  LISTESCONTEXTESSOURCE[contexte].split(":");
	var posDebS=Number(infoSource[0]);
	var posFinS=Number(infoSource[1]);
	var contexteC=Number(contexte);
	contexteC=contexteC+(nbSectionInCarte/2);
	var infoCible =  LISTESCONTEXTESCIBLE[contexteC].split(":");
	var posDebC=Number(infoCible[0]);
	var posFinC=Number(infoCible[1]);			
	var contentxtSOURCE ="";
	var contentxtCIBLE="";
	var IScontexteShtml=0;
	var IScontexteChtml=0;
	for (var i=posDebS;i<=posFinS;i++) {
	    var item=DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
	    if (!(dicNum2forme[trameForme[i][0]] in dictionnairedesdelims))  {
		var item2;
		if (annotationencours != annotationencoursOUT) {
		    item2 = DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]];
		}
		else {
		    item2 = DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
		}
		if (item == queryTextSource) {
		    IScontexteShtml=1;	
		    if (nombredannotation > 1) {	
			if (nombredannotation > 3) {
			    var tmpContext="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]];
			    for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
				var kk=tmpAnnot+1;
				tmpContext+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[i][tmpAnnot]];
			    }
			    tmpContext+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\"><span class=\"matchinsection\">"+item2+"</span></a>";
			    contentxtSOURCE+=tmpContext;
			}
			else {
			    contentxtSOURCE+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\"><span class=\"matchinsection\">"+item2+"</span></a>";
			}
		    }
		    else {
			contentxtSOURCE+="<span class=\"matchinsection\">"+item2+"</span>";
		    }
		}
		else {
		    if (nombredannotation > 1) {	
			if (nombredannotation > 3) {
			    var tmpContext="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]];
			    for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
				var kk=tmpAnnot+1;
				tmpContext+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[i][tmpAnnot]];
			    }
			    tmpContext+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
			    contentxtSOURCE+=tmpContext;
			}
			else {
			    contentxtSOURCE+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
			}
		    }
		    else {
			contentxtSOURCE+=item2;
		    }
		}
	    }
	    else {
		contentxtSOURCE+=item;
	    }
	}
	for (var i=posDebC;i<=posFinC;i++) {
	    var item=DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
	    if (!(dicNum2forme[trameForme[i][0]] in dictionnairedesdelims))  {
		var item2;
		if (annotationencours != annotationencoursOUT) {
		    item2 = DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]];
		}
		else {
		    item2 = DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
		}
		if (item == queryTextCible) {
		    IScontexteChtml=1;		
		    if (nombredannotation > 1) {	
			if (nombredannotation > 3) {
			    var tmpContext="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]];
			    for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
				var kk=tmpAnnot+1;
				tmpContext+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[i][tmpAnnot]];
			    }
			    tmpContext+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\"><span class=\"matchinsection\">"+item2+"</span></a>";
			    contentxtCIBLE+=tmpContext;
			}
			else {					
			    contentxtCIBLE+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\"><span class=\"matchinsection\">"+item2+"</span></a>";
			}
		    }
		    else {
			contentxtCIBLE+="<span class=\"matchinsection\">"+item2+"</span>";
		    }
		}
		else {
		    
		    if (nombredannotation > 1) {
			if (nombredannotation > 3) {
			    var tmpContext="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]];
			    for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
				var kk=tmpAnnot+1;
				tmpContext+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[i][tmpAnnot]];
			    }
			    tmpContext+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
			    contentxtCIBLE+=tmpContext;
			}
			else {
			    contentxtCIBLE+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
			}
		    }
		    else {
			contentxtCIBLE+=item2;
		    }
		}
		
	    }
	    else {
		contentxtCIBLE+=item;
	    }
	}
	if ((IScontexteChtml>=1) | (IScontexteShtml>=1)) {
	    nbcontexteglobal=nbcontexteglobal+1;
	    table += '<tr><td>'+nbcontexteglobal+'</td><td>'+contentxtSOURCE+'</td><td>'+contentxtCIBLE+'</td></tr>';
	}	
    }
    table +='</table>';
    $("#placeholder").html(table);
    $(document).ready(function() {
	$('#BICONCORDANCE').DataTable ( {
	    //order: [[ 1, "desc" ]],
	    //data:table,
	    lengthMenu: [[10, 25, 50,100, -1], [10, 25, 50,100, "All"]],
	    searchHighlight: true,
	    "destroy": true,
	    columns: [
		{title: "N°"},
		{title: "Contexte Source"},
		{title: "Contexte Cible"}
			]
	})
    });

}
//-----------------------------------------------------
function biconcordanceIntersectionComplementaire(SourceValue,CibleValue) {
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    var Sok=Number(SourceValue);
    var Cok=Number(CibleValue);

    refreshItrameur();

    var DictionnaireDesItems = new Object();
    var DictionnaireNumDesItems = new Object();
    var DictionnaireDesItemsOut = new Object();
    var DictionnaireNumDesItemsOut = new Object();
    if (annotationencours==1) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
	if (annotationencours != annotationencoursOUT) {
	    if (annotationencoursOUT==2) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireLemme);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2lemme);
	    }
	    if (annotationencoursOUT==3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireCategorie);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2categorie);
	    }
	    if (annotationencoursOUT>3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
	    }
	}
    }
    if (annotationencours==2) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireLemme);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2lemme);
	if (annotationencours != annotationencoursOUT) {
	    if (annotationencoursOUT==1) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireSource);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2forme);
	    }
	    if (annotationencoursOUT==3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireCategorie);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2categorie);
	    }
	    if (annotationencoursOUT>3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
	    }
	}
    }
    if (annotationencours==3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireCategorie);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2categorie);
	if (annotationencours != annotationencoursOUT) {
	    if (annotationencoursOUT==1) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireSource);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2forme);
	    }
	    if (annotationencoursOUT==2) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireLemme);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2lemme);
	    }
	    if (annotationencoursOUT>3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
	    }
	}
    }
    if (annotationencours>3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireAnnotation);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2annotation);
	if (annotationencours != annotationencoursOUT) {
	    if (annotationencoursOUT==1) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireSource);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2forme);
	    }
	    if (annotationencoursOUT==2) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireLemme);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2lemme);
	    }
	    if (annotationencoursOUT==3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireCategorie);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2categorie);
	    }
	    if (annotationencoursOUT>3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
	    }
	}
    }
    var annotationencoursIndex=annotationencours-1;
    var annotationencoursIndexOUT=annotationencoursOUT-1;

    var lgcontexte=document.getElementById('lgcontexteID').value;
    
    var queryTextSource=document.getElementById('poleID').value;
    var queryTextCible=document.getElementById('poleCibleID').value;
    
    if ((queryTextSource == '') & (queryTextCible == '')) {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez au moins un pôle  pour pouvoir lancer le calcul...</span></small>';
	$("#placeholder").html(vide);
        return;
    }
    
    if ((queryTextSource == 'entrez la forme pôle') & (queryTextCible == 'entrez la forme pôle')) {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez au moins un pôle  pour pouvoir lancer le calcul...</span></small>';
	$("#placeholder").html(vide);
        return;
    }
    
    if ((queryTextSource != '') & (queryTextSource != 'entrez la forme pôle')){
	if (annotationencours <=3) {
	    if (!(queryTextSource in DictionnaireDesItems) ) {
		var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Le pôle source choisi n\'est pas dans le dictionnaire...</span></small>';
		$("#placeholder").html(vide);
		return;	
	    }
	}
	else {
	    var tmpannot=annotationencours+"//"+queryTextSource;
	    if (!(tmpannot in DictionnaireDesItems) ) {
		var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Le pôle choisi n\'est pas dans le dictionnaire...</span></small>';
		$("#placeholder").html(vide);		
		return;	
	    }	
	}	
    }
    
    if ((queryTextCible != '') & (queryTextCible != 'entrez la forme pôle')){
	if (annotationencours <=3) {
	    if (!(queryTextCible in DictionnaireDesItems) ) {
		var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Le pôle choisi cible n\'est pas dans le dictionnaire...</span></small>';
		$("#placeholder").html(vide);		
		return;	
	    }
	}
	else {
	    var tmpannot=annotationencours+"//"+queryTextCible;
	    if (!(tmpannot in DictionnaireDesItems) ) {
		var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Le pôle choisi n\'est pas dans le dictionnaire...</span></small>';
		$("#placeholder").html(vide);		
		return;	
	    }	
	}
    }		
    
    var table='';
    table += '<table id="BICONCORDANCE" class="display" width="100%">';
    /*--------------------------*/
    var nbcontexteglobal=0;	
    for (var contexte in LISTESCONTEXTESSOURCE) {
	var infoSource =  LISTESCONTEXTESSOURCE[contexte].split(":");
	var posDebS=Number(infoSource[0]);
	var posFinS=Number(infoSource[1]);
	var contexteC=Number(contexte);
	contexteC=contexteC+(nbSectionInCarte/2);
	var infoCible =  LISTESCONTEXTESCIBLE[contexteC].split(":");
	var posDebC=Number(infoCible[0]);
	var posFinC=Number(infoCible[1]);			
	var contentxtSOURCE ="";
	var contentxtCIBLE="";
	var IScontexteShtml=0;
	var IScontexteChtml=0;
	for (var i=posDebS;i<=posFinS;i++) {
	    var item=DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
	    if (!(dicNum2forme[trameForme[i][0]] in dictionnairedesdelims))  {
		var item2;
		if (annotationencours != annotationencoursOUT) {
		    item2 = DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]];
		}
		else {
		    item2 = DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
		}
		if (item == queryTextSource) {
		    IScontexteShtml=1;	
		    if (nombredannotation > 1) {	
			if (nombredannotation > 3) {
			    var tmpContext="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]];
			    for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
				var kk=tmpAnnot+1;
				tmpContext+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[i][tmpAnnot]];
			    }
			    tmpContext+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\"><span class=\"matchinsection\">"+item2+"</span></a>";
			    contentxtSOURCE+=tmpContext;
			}
			else {
			    contentxtSOURCE+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\"><span class=\"matchinsection\">"+item2+"</span></a>";
			}
		    }
		    else {
			contentxtSOURCE+="<span class=\"matchinsection\">"+item2+"</span>";
		    }
		}
		else {
		    if (nombredannotation > 1) {	
			if (nombredannotation > 3) {
			    var tmpContext="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]];
			    for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
				var kk=tmpAnnot+1;
				tmpContext+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[i][tmpAnnot]];
			    }
			    tmpContext+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
			    contentxtSOURCE+=tmpContext;
			}
			else {
			    contentxtSOURCE+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
			}
		    }
		    else {
			contentxtSOURCE+=item2;
		    }
		}
	    }
	    else {
		contentxtSOURCE+=item;
	    }
	}
	for (var i=posDebC;i<=posFinC;i++) {
	    var item=DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
	    if (!(dicNum2forme[trameForme[i][0]] in dictionnairedesdelims))  {
		var item2;
		if (annotationencours != annotationencoursOUT) {
		    item2 = DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]];
		}
		else {
		    item2 = DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
		}
		if (item == queryTextCible) {
		    IScontexteChtml=1;		
		    if (nombredannotation > 1) {	
			if (nombredannotation > 3) {
			    var tmpContext="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]];
			    for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
				var kk=tmpAnnot+1;
				tmpContext+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[i][tmpAnnot]];
			    }
			    tmpContext+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\"><span class=\"matchinsection\">"+item2+"</span></a>";
			    contentxtCIBLE+=tmpContext;
			}
			else {					
			    contentxtCIBLE+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\"><span class=\"matchinsection\">"+item2+"</span></a>";
			}
		    }
		    else {
			contentxtCIBLE+="<span class=\"matchinsection\">"+item2+"</span>";
		    }
		}
		else {
		    
		    if (nombredannotation > 1) {
			if (nombredannotation > 3) {
			    var tmpContext="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]];
			    for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
				var kk=tmpAnnot+1;
				tmpContext+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[i][tmpAnnot]];
			    }
			    tmpContext+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
			    contentxtCIBLE+=tmpContext;
			}
			else {
			    contentxtCIBLE+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
			}
		    }
		    else {
			contentxtCIBLE+=item2;
		    }
		}
		
	    }
	    else {
		contentxtCIBLE+=item;
	    }
	}
	if ((IScontexteChtml==Cok) && (IScontexteShtml==Sok)) {
	    nbcontexteglobal=nbcontexteglobal+1;
	    table += '<tr><td>'+nbcontexteglobal+'</td><td>'+contentxtSOURCE+'</td><td>'+contentxtCIBLE+'</td></tr>';
	}	
    }
    table +='</table>';
    $("#placeholder").html(table);
    $(document).ready(function() {
	$('#BICONCORDANCE').DataTable ( {
	    //order: [[ 1, "desc" ]],
	    //data:table,
	    lengthMenu: [[10, 25, 50,100, -1], [10, 25, 50,100, "All"]],
	    searchHighlight: true,
	    "destroy": true,
	    columns: [
		{title: "N°"},
		{title: "Contexte Source"},
		{title: "Contexte Cible"}
			]
	})
    });
}
//-------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
// FONCTIONS DEPENDANCE
//-----------------------------------------------------------------------------------
function searchRelationLemmePos() {
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    var relation_annot_For_grapherelation=document.getElementById('numAnnotRelationID').value;
    if (relation_annot_For_grapherelation==""){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur numérique pour le numéro d\'annotation visée...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    relation_annot_For_grapherelation=Number(relation_annot_For_grapherelation);
    var relation=document.getElementById('relationID').value;
    if (relation == ""){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur pour le nom de l\'annotation visée...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    //-----------------------------------------------------------------
    refreshItrameur();
    //-----------------------------------------------------------------
    var dicoRelationItems=new Object();
    dictionnairedespositionsdesrelationsentrelemmes=new Object();
    dictionnairedesfrequencesdesrelationsentrelemmes=new Object();
    var lemmeGouv2search=document.getElementById('gouvlemmeID').value;
    var lemmeDep2search=document.getElementById('deplemmeID').value;
    for (var index in trameForme) {
	var indexAsNumber=Number(index);
	var refdelakey=trameForme[index];

	/* il faut tester si le DEP en cours correspond au lemmeDep2search */

	var tmpIdentAndRelationAtThisPos=dicNum2annotation[refdelakey[relation_annot_For_grapherelation-1]]; // ATTENTION : il faut tester si on a une liste de dependance !!!!
	var ListeDependanceAtThisPos=tmpIdentAndRelationAtThisPos.split(",");

	for (var nbDepAtThisPos=0;nbDepAtThisPos<ListeDependanceAtThisPos.length;nbDepAtThisPos++) {
	    var IdentAndRelationAtThisPos=ListeDependanceAtThisPos[nbDepAtThisPos];
	    var LIdentAndRelationAtThisPos=[];
	    if ((lemmeDep2search == "") || (lemmeDep2search == "...")) {
		//IdentAndRelationAtThisPos=dicNum2annotation[refdelakey[relation_annot_For_grapherelation-1]]; 
		IdentAndRelationAtThisPos=IdentAndRelationAtThisPos.replaceAll("(","//");
		IdentAndRelationAtThisPos=IdentAndRelationAtThisPos.replaceAll(")","");
		LIdentAndRelationAtThisPos=IdentAndRelationAtThisPos.split("//"); // a refaire !!!
	    }
	    else {
		if ((lemmeDep2search in DictionnaireCategorie) && (lemmeDep2search == dicNum2categorie[trameForme[index][2]] )) {
		   // IdentAndRelationAtThisPos=dicNum2annotation[refdelakey[relation_annot_For_grapherelation-1]]; 
		    IdentAndRelationAtThisPos=IdentAndRelationAtThisPos.replaceAll("(","//");
		    IdentAndRelationAtThisPos=IdentAndRelationAtThisPos.replaceAll(")","");
		    LIdentAndRelationAtThisPos=IdentAndRelationAtThisPos.split("//"); // a refaire !!!
		}
	    }

	    /* on regarde maintenant si le lemme retenu contient la bonne relation */
	    if (LIdentAndRelationAtThisPos.length>1) {
		//alert(LIdentAndRelationAtThisPos);
		var IdentRelationAtThisPos=Number(LIdentAndRelationAtThisPos[1]);
		var RelationAtThisPos=LIdentAndRelationAtThisPos[0];
		if ((RelationAtThisPos==relation) || ((relation == "ANY") && (RelationAtThisPos!=""))) {
		    //if (RelationAtThisPos==relation) {
		    var refdelakey2=trameForme[IdentRelationAtThisPos];
		    var verif=0;
		    //alert(lemmeGouv2search+"|"+dicNum2lemme[trameForme[IdentRelationAtThisPos][1]]);
		    if ((lemmeGouv2search == "") || (lemmeGouv2search == "...")) {
			verif=1;
		    }
		    else {
			if (lemmeGouv2search in DictionnaireLemme) {
			    if (lemmeGouv2search == dicNum2lemme[trameForme[IdentRelationAtThisPos][1]]) {
				verif=1;
			    }
			}
		    }
		    if (verif ==1) {
			//alert("OK:"+lemmeGouv2search+"|"+dicNum2lemme[trameForme[IdentRelationAtThisPos][1]]);
			var LGrelation=0;
			var POSDEPENDANT="-";
			if (indexAsNumber >= IdentRelationAtThisPos) {
			    var tmplg=0;
			    for (var k=IdentRelationAtThisPos+1;k<indexAsNumber;k++) {
				if (!(dicNum2forme[trameForme[k][0]] in dictionnairedesdelims)) {
				    tmplg++;
				}
			    }
			    LGrelation=Number(tmplg);
			    POSDEPENDANT="POST";
			}
			else {
			    var tmplg=0;
			    for (var k=indexAsNumber+1;k<IdentRelationAtThisPos;k++) {
				if (!(dicNum2forme[trameForme[k][0]] in dictionnairedesdelims)) {
				    tmplg++;
				}
			    }
			    LGrelation=Number(tmplg);
			    POSDEPENDANT="ANTE";
			}
			//var patronencours=relation+"//"+dicNum2lemme[refdelakey[1]]+"//"+dicNum2lemme[refdelakey2[1]];
			//******************* Ajout des positions pour concordance
			// ajout de IdentRelationAtThisPos
			var cle=RelationAtThisPos+"//"+dicNum2lemme[refdelakey2[1]]+"//"+dicNum2categorie[refdelakey[2]];
			if (!($.isArray(dictionnairedespositionsdesrelationsentrelemmes[cle]))) {
			    dictionnairedespositionsdesrelationsentrelemmes[cle]=new Array();
			}
			dictionnairedespositionsdesrelationsentrelemmes[cle].push(IdentRelationAtThisPos);      
			if (dictionnairedesfrequencesdesrelationsentrelemmes[cle] === undefined) {
			    dictionnairedesfrequencesdesrelationsentrelemmes[cle]=1;
			}
			else {
			    dictionnairedesfrequencesdesrelationsentrelemmes[cle]=dictionnairedesfrequencesdesrelationsentrelemmes[cle]+1;
			}
			//*******************
			var patronencours=RelationAtThisPos+"//"+dicNum2categorie[refdelakey[2]]+"//"+dicNum2lemme[refdelakey2[1]];
			if (patronencours in dicoRelationItems) {
			    var TMPLIST=dicoRelationItems[patronencours];
			    var fqPat=Number(TMPLIST[0]);
			    fqPat++;
			    LGrelation=Number(TMPLIST[1])+Number(LGrelation);
			    var nbPOST=Number(TMPLIST[2]);
			    var nbANTE=Number(TMPLIST[3]);
			    if (POSDEPENDANT == "POST") {nbPOST++};
			    if (POSDEPENDANT == "ANTE") {nbANTE++};
			    dicoRelationItems[patronencours]=[];
			    dicoRelationItems[patronencours].push(fqPat,LGrelation,nbPOST,nbANTE);
			}
			else {
			    var nbPOST=0;
			    var nbANTE=0;
			    if (POSDEPENDANT == "POST") {nbPOST++};
			    if (POSDEPENDANT == "ANTE") {nbANTE++};
			    dicoRelationItems[patronencours]=[];
			    dicoRelationItems[patronencours].push(1,LGrelation,nbPOST,nbANTE);
			}
		    }
		}
	    }
	}
    }
    var resultFinal=new Array();
    var LISTEDESRELATIONSPOS= Object.keys(dicoRelationItems);/*.sort(function(a,b){
	var x = dicoRelationItems[a][0];
	var y = dicoRelationItems[b][0];
	return x < y ? 1 : x > y ? -1 : 0;
    });;*/

    for (var i=0; i<LISTEDESRELATIONSPOS.length;i++) {
	var listPOS=LISTEDESRELATIONSPOS[i].split("//");
	var TMPLIST=dicoRelationItems[LISTEDESRELATIONSPOS[i]];
	var fq=TMPLIST[0];
	var LGrelation=Number(TMPLIST[1])/Number(fq);
	LGrelation=LGrelation.toFixed(2);//precise_round(LGrelation,2);
	var nbPOST=TMPLIST[2];
	var nbANTE=TMPLIST[3];
	if (!($.isArray(resultFinal[i]))) {
	    resultFinal[i]=new Array();
	}
	resultFinal[i]=[];
	resultFinal[i].push(listPOS[2],listPOS[0],listPOS[1],fq,LGrelation,nbPOST,nbANTE); 
    }
    /*--------------------------*/

    if (relation == "ANY") {
	// on ajoute le bouton pour calcul des "phrases" prototypiques...
	document.getElementById('placeholder').innerHTML = '<h4>Liste des dépendances (lemme&#8594;pos)<br/>Relation : '+relation+'</h4><p><button class="submit" title="Les phrases prototypiques..." onclick="searchContextesCommunLemmesRelation();"><span>Contextes ++</span></button></p><table id="searchrelation" class="display" width="50%"></table>';
	document.getElementById('placeholder').innerHTML +='';
    }
    else {
	document.getElementById('placeholder').innerHTML = '<h4>Liste des dépendances (lemme&#8594;pos)<br/>Relation : '+relation+'</h4><table id="searchrelation" class="display" width="50%"></table>';
    }

    $(document).ready(function() {
	var table = $('#searchrelation').DataTable ( {
	    order: [[ 3, "desc" ]],
	    data:resultFinal,
	    searchHighlight: true,
	    "destroy": true,
	    lengthMenu: [[10, 25, 50,100, -1], [10, 25, 50,100, "All"]],
		dom: 'Bfrtip',
		buttons: [
				'copy', 'csv', 'excel', 'pdf', 'print'
			],
	    columns: [
		{title: "Gouverneur"},
		{title: "Relation"},
		{title: "Dépendant"},
		{title: "Fq Relation"},
		{title: "Longueur"},
		{title: "Fq Post"},
		{title: "Fq Ante"},
		{title: "Concordance"},
		/*{title: "Sections"}*/ 
	    ],
	    columnDefs: [ 
		{
		    "targets": 7,
		    "data": null,
		    /*"defaultContent": "<button value=\"C\"><i class=\"right\"></i></button>"*/
		    "defaultContent": "<button value=\"C\" class=\"btnC\"></button>"
		} ,
		/* A FAIRE !!!
		  {
		    "targets": 8,
		    "data": null,
		    "defaultContent": "<button value=\"S\"><i class=\"rectD\"></i></button>"
		} ,*/
	    ]
	});
	$('#searchrelation tbody').on( 'click', 'button', function () {
	    var data = table.row( $(this).parents('tr') ).data();
	    //var a=document.getElementById('poleID');
	    //a.value = data[0];
	    //alert("0:"+data[0]+",1:"+data[1]+",2:"+data[2]+",3:"+data[3]+",4:"+data[4]+",5:"+data[5]+",6:"+data[6]);
	    var label=data[1]+"//"+data[0]+"//"+data[2];
	    var fired_button = $(this).val();
	    if (fired_button=="C") {
		concordanceLemmesRelation(label);
	    }
	    /* A FAIRE !!!
	    if (fired_button=="S") {
		cartesectionLemmesRelation(label);
	    }
	    */
	} );
 	
    });
}

function searchRelationLemmes() {
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    var relation_annot_For_grapherelation=document.getElementById('numAnnotRelationID').value;
    if (relation_annot_For_grapherelation==""){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur numérique pour le numéro d\'annotation visée...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    relation_annot_For_grapherelation=Number(relation_annot_For_grapherelation);
    var relation=document.getElementById('relationID').value;
    if (relation == ""){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur pour le nom de l\'annotation visée...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    //-----------------------------------------------------------------
    refreshItrameur();
    //-----------------------------------------------------------------
    var dicoRelationItems=new Object();
    dictionnairedespositionsdesrelationsentrelemmes=new Object();
    dictionnairedesfrequencesdesrelationsentrelemmes=new Object();
    var lemmeGouv2search=document.getElementById('gouvlemmeID').value;
    var lemmeDep2search=document.getElementById('deplemmeID').value;
    for (var index in trameForme) {
	var indexAsNumber=Number(index);
	var refdelakey=trameForme[index];

	var tmpIdentAndRelationAtThisPos=dicNum2annotation[refdelakey[relation_annot_For_grapherelation-1]]; // ATTENTION : il faut tester si on a une liste de dependance !!!!
	var ListeDependanceAtThisPos=tmpIdentAndRelationAtThisPos.split(",");

	for (var nbDepAtThisPos=0;nbDepAtThisPos<ListeDependanceAtThisPos.length;nbDepAtThisPos++) {
	    var IdentAndRelationAtThisPos=ListeDependanceAtThisPos[nbDepAtThisPos];
	    var LIdentAndRelationAtThisPos=[];

	    /* il faut tester si le DEP en cours correspond au lemmeDep2search */
	    if ((lemmeDep2search == "") || (lemmeDep2search == "...")) {
		//IdentAndRelationAtThisPos=dicNum2annotation[refdelakey[relation_annot_For_grapherelation-1]]; 
		IdentAndRelationAtThisPos=IdentAndRelationAtThisPos.replaceAll("(","//");
		IdentAndRelationAtThisPos=IdentAndRelationAtThisPos.replaceAll(")","");
		LIdentAndRelationAtThisPos=IdentAndRelationAtThisPos.split("//"); // a refaire !!!
	    }
	    else {
		if ((lemmeDep2search in DictionnaireLemme) && (lemmeDep2search == dicNum2lemme[trameForme[index][1]] )) {
		    //IdentAndRelationAtThisPos=dicNum2annotation[refdelakey[relation_annot_For_grapherelation-1]]; 
		    IdentAndRelationAtThisPos=IdentAndRelationAtThisPos.replaceAll("(","//");
		    IdentAndRelationAtThisPos=IdentAndRelationAtThisPos.replaceAll(")","");
		    LIdentAndRelationAtThisPos=IdentAndRelationAtThisPos.split("//"); // a refaire !!!
		}
	    }
	    /* on regarde maintenant si le lemme retenu contient la bonne relation */
	    if (LIdentAndRelationAtThisPos.length>1) {
		var IdentRelationAtThisPos=Number(LIdentAndRelationAtThisPos[1]);
		var RelationAtThisPos=LIdentAndRelationAtThisPos[0];
		if ((RelationAtThisPos==relation) || ((relation == "ANY") && (RelationAtThisPos!=""))) {
		    //if (RelationAtThisPos==relation) {
		    console.log("PB1 : "+indexAsNumber+"//"+IdentRelationAtThisPos+"//"+RelationAtThisPos);
		    // VERIF BUG -------------------------------------------------------------------------
		    //if (dicNum2forme[trameForme[IdentRelationAtThisPos][0]] in dictionnairedesdelims)  { 
		    //console.log("PB2 : "+indexAsNumber+"//"+IdentRelationAtThisPos+"//"+RelationAtThisPos);
		    //}
		    //-------------------------------------------------------------------------------------
		    var refdelakey2=trameForme[IdentRelationAtThisPos];
		    var verif=0;
		    if ((lemmeGouv2search == "") || (lemmeGouv2search == "...")) {
			verif=1;
		    }
		    else {
			if (lemmeGouv2search in DictionnaireLemme) {
			    if (lemmeGouv2search == dicNum2lemme[trameForme[IdentRelationAtThisPos][1]]) {
				verif=1;
			    }
			}
		    }
		    if (verif ==1) {
			var LGrelation=0;
			var POSDEPENDANT="-";
			if (indexAsNumber >= IdentRelationAtThisPos) {
			    var tmplg=0;
			    for (var k=IdentRelationAtThisPos+1;k<indexAsNumber;k++) {
				if (!(dicNum2forme[trameForme[k][0]] in dictionnairedesdelims)) {
				    tmplg++;
				}
			    }
			    LGrelation=Number(tmplg);
			    POSDEPENDANT="POST";
			}
			else {
			    var tmplg=0;
			    for (var k=indexAsNumber+1;k<IdentRelationAtThisPos;k++) {
				if (!(dicNum2forme[trameForme[k][0]] in dictionnairedesdelims)) {
				    tmplg++;
				}
			    }
			    LGrelation=Number(tmplg);
			    POSDEPENDANT="ANTE";
			}
			//var patronencours=relation+"//"+dicNum2lemme[refdelakey[1]]+"//"+dicNum2lemme[refdelakey2[1]];
			//******************* Ajout des positions pour concordance
			// ajout de IdentRelationAtThisPos
			// VERIF BUG -------------------------------------------------------------------------
			//if (dicNum2forme[refdelakey2[0]] in dictionnairedesdelims)  { 
			//    alert("PB : "+indexAsNumber+"//"+RelationAtThisPos);
			//}
			//-------------------------------------------------------------------------------------
			var cle=RelationAtThisPos+"//"+dicNum2lemme[refdelakey2[1]]+"//"+dicNum2lemme[refdelakey[1]];
			if (!($.isArray(dictionnairedespositionsdesrelationsentrelemmes[cle]))) {
			    dictionnairedespositionsdesrelationsentrelemmes[cle]=new Array();
			}
			dictionnairedespositionsdesrelationsentrelemmes[cle].push(IdentRelationAtThisPos);      
			if (dictionnairedesfrequencesdesrelationsentrelemmes[cle] === undefined) {
			    dictionnairedesfrequencesdesrelationsentrelemmes[cle]=1;
			}
			else {
			    dictionnairedesfrequencesdesrelationsentrelemmes[cle]=dictionnairedesfrequencesdesrelationsentrelemmes[cle]+1;
			}
			//*******************
			var patronencours=RelationAtThisPos+"//"+dicNum2lemme[refdelakey[1]]+"//"+dicNum2lemme[refdelakey2[1]];
			if (patronencours in dicoRelationItems) {
			    var TMPLIST=dicoRelationItems[patronencours];
			    var fqPat=Number(TMPLIST[0]);
			    fqPat++;
			    LGrelation=Number(TMPLIST[1])+Number(LGrelation);
			    var nbPOST=Number(TMPLIST[2]);
			    var nbANTE=Number(TMPLIST[3]);
			    if (POSDEPENDANT == "POST") {nbPOST++};
			    if (POSDEPENDANT == "ANTE") {nbANTE++};
			    dicoRelationItems[patronencours]=[];
			    dicoRelationItems[patronencours].push(fqPat,LGrelation,nbPOST,nbANTE);
			}
			else {
			    var nbPOST=0;
			    var nbANTE=0;
			    if (POSDEPENDANT == "POST") {nbPOST++};
			    if (POSDEPENDANT == "ANTE") {nbANTE++};
			    dicoRelationItems[patronencours]=[];
			    dicoRelationItems[patronencours].push(1,LGrelation,nbPOST,nbANTE);
			}
		    }
		}
	    }
	}
    }
    var resultFinal=new Array();
    var LISTEDESRELATIONSPOS= Object.keys(dicoRelationItems);/*.sort(function(a,b){
	var x = dicoRelationItems[a][0];
	var y = dicoRelationItems[b][0];
	return x < y ? 1 : x > y ? -1 : 0;
    });;*/

    for (var i=0; i<LISTEDESRELATIONSPOS.length;i++) {
	var listPOS=LISTEDESRELATIONSPOS[i].split("//");
	var TMPLIST=dicoRelationItems[LISTEDESRELATIONSPOS[i]];
	var fq=TMPLIST[0];
	var LGrelation=Number(TMPLIST[1])/Number(fq);
	LGrelation=LGrelation.toFixed(2);//precise_round(LGrelation,2);
	var nbPOST=TMPLIST[2];
	var nbANTE=TMPLIST[3];
	if (!($.isArray(resultFinal[i]))) {
	    resultFinal[i]=new Array();
	}
	resultFinal[i]=[];
	resultFinal[i].push(listPOS[2],listPOS[0],listPOS[1],fq,LGrelation,nbPOST,nbANTE); 
    }
    /*--------------------------*/

    if (relation == "ANY") {
	// on ajoute le bouton pour calcul des "phrases" prototypiques...
	document.getElementById('placeholder').innerHTML = '<h4>Liste des dépendances (lemme&#8594;lemme)<br/>Relation : '+relation+'</h4><p><button class="submit" title="Les phrases prototypiques..." onclick="searchContextesCommunLemmesRelation();"><span>Contextes ++</span></button></p><table id="searchrelation" class="display" width="50%"></table>';
	document.getElementById('placeholder').innerHTML +='';
    }
    else {
	document.getElementById('placeholder').innerHTML = '<h4>Liste des dépendances (lemmes&#8594;lemme)<br/>Relation : '+relation+'</h4><table id="searchrelation" class="display" width="50%"></table>';
    }

    $(document).ready(function() {
	var table = $('#searchrelation').DataTable ( {
	    order: [[ 3, "desc" ]],
	    data:resultFinal,
	    searchHighlight: true,
	    "destroy": true,
	    lengthMenu: [[10, 25, 50,100, -1], [10, 25, 50,100, "All"]],
		dom: 'Bfrtip',
		buttons: [
				'copy', 'csv', 'excel', 'pdf', 'print'
			],
	    columns: [
		{title: "Gouverneur"},
		{title: "Relation"},
		{title: "Dépendant"},
		{title: "Fq Relation"},
		{title: "Longueur"},
		{title: "Fq Post"},
		{title: "Fq Ante"},
		{title: "Concordance"},
		/*{title: "Sections"}*/ 
	    ],
	    columnDefs: [ 
		{
		    "targets": 7,
		    "data": null,
		    /*"defaultContent": "<button value=\"C\"><i class=\"right\"></i></button>"*/
		    "defaultContent": "<button value=\"C\" class=\"btnC\"></button>"
		} ,
		/* A FAIRE !!!
		  {
		    "targets": 8,
		    "data": null,
		    "defaultContent": "<button value=\"S\"><i class=\"rectD\"></i></button>"
		} ,*/
	    ]
	});
	$('#searchrelation tbody').on( 'click', 'button', function () {
	    var data = table.row( $(this).parents('tr') ).data();
	    //var a=document.getElementById('poleID');
	    //a.value = data[0];
	    //console.log("0:"+data[0]+",1:"+data[1]+",2:"+data[2]+",3:"+data[3]+",4:"+data[4]+",5:"+data[5]+",6:"+data[6]);
	    var label=data[1]+"//"+data[0]+"//"+data[2];
	    var fired_button = $(this).val();
	    if (fired_button=="C") {
		concordanceLemmesRelation(label);
	    }
	    /* A FAIRE !!!
	    if (fired_button=="S") {
		cartesectionLemmesRelation(label);
	    }
	    */
	} );
 	
    });
}

function intersectB(array1, array2) {
   var result = [];
   // Don't destroy the original arrays
   var a = array1.slice(0);
   var b = array2.slice(0);
   var aLast = a.length - 1;
   var bLast = b.length - 1;
   while (aLast >= 0 && bLast >= 0) {
      if (a[aLast] > b[bLast] ) {
         a.pop();
         aLast--;
      } else if (a[aLast] < b[bLast] ){
         b.pop();
         bLast--;
      } else /* they're equal */ {
         result.push(a.pop());
         b.pop();
         aLast--;
         bLast--;
      }
   }
   return result;
}
//-----------------------------------------------------------------------------------
function intersection(A,B){
var result = new Array();
for (i=0; i<A.length; i++) {
    for (j=0; j<B.length; j++) {
        if (A[i] == B[j] && $.inArray(A[i],result) == -1) {
            result.push(A[i]);
        }
    }
}
return result;
}
//-----------------------------------------------------------------------------------
function removeDuplicates(arr){
    let unique_array = []
    for(let i = 0;i < arr.length; i++){
        if(unique_array.indexOf(arr[i]) == -1){
            unique_array.push(arr[i])
        }
    }
    return unique_array
}
//-----------------------------------------------------------------------------------
function searchContextesCommunLemmesRelation() {
    
    var LISTEDESCLESRELATIONSPARFREQ= Object.keys(dictionnairedesfrequencesdesrelationsentrelemmes).sort(function(a,b){
	var x = dictionnairedesfrequencesdesrelationsentrelemmes[a];/*toLowerCase();*/
	var y = dictionnairedesfrequencesdesrelationsentrelemmes[b];/*.toLowerCase();*/
	return x < y ? 1 : x > y ? -1 : 0;
    });
    //alert(LISTEDESCLESRELATIONSPARFREQ);
    positionsMaximisantlesrelations= new Array;
    var curseur=0;
    while (curseur < LISTEDESCLESRELATIONSPARFREQ.length-1) {
	var ListeDesPositionsDesContextesMax=dictionnairedespositionsdesrelationsentrelemmes[LISTEDESCLESRELATIONSPARFREQ[curseur]];   
	var k=curseur+1; 
	var insectVide;
	var tmpIntersect= ListeDesPositionsDesContextesMax;
	//while ((tmpIntersect.length >= 1) && (k <= LISTEDESCLESRELATIONSPARFREQ.length-1)) {
	while ((tmpIntersect.length >= 0) && (k <= LISTEDESCLESRELATIONSPARFREQ.length-1)) {
	    tmpIntersect=intersection(ListeDesPositionsDesContextesMax,dictionnairedespositionsdesrelationsentrelemmes[LISTEDESCLESRELATIONSPARFREQ[k]]);
	    //console.log("A1:"+ListeDesPositionsDesContextesMax);
	    //console.log("A2:"+dictionnairedespositionsdesrelationsentrelemmes[LISTEDESCLESRELATIONSPARFREQ[k]]);
	    //console.log("I:"+LISTEDESCLESRELATIONSPARFREQ[k]+":"+tmpIntersect);
	    if (tmpIntersect.length > 0) {
		ListeDesPositionsDesContextesMax=tmpIntersect;
		var element2keep=tmpIntersect[0];
		//console.log("ADD"+element2keep);
		positionsMaximisantlesrelations.push(element2keep);
		//console.log("MAX:"+positionsMaximisantlesrelations);
		//-----------------------------------------------------------------------------------
		// il faut vérifier parmi celles de A qui ne sont pas dans B si elles sont uniques... VERIF EN COURS
		//console.log("INTER : "+tmpIntersect);
		var tmpArray=dictionnairedespositionsdesrelationsentrelemmes[LISTEDESCLESRELATIONSPARFREQ[curseur]];
		//console.log("DEPART : "+tmpArray);
		var tmpArrayUnique=new Array;
		for (i=0; i<tmpArray.length; i++) {
		    //console.log(i+" : "+tmpArray[i]);
		    if ($.inArray(tmpArray[i],tmpIntersect) == -1) {
			var verifUnique=0;
			for (j=0; j<LISTEDESCLESRELATIONSPARFREQ.length; j++) {
			    if (j != curseur) {
				if ($.inArray(tmpArray[i],dictionnairedespositionsdesrelationsentrelemmes[LISTEDESCLESRELATIONSPARFREQ[j]]) != -1) {
				    verifUnique=i;
				    //console.log("RESTE : "+dictionnairedespositionsdesrelationsentrelemmes[LISTEDESCLESRELATIONSPARFREQ[j]]);
				}
			    }
			}
			//console.log("RESU : "+verifUnique);
			if (verifUnique == 0) {
			    tmpArrayUnique.push(tmpArray[i])
			    
			}
		    }
		}
		if (tmpArrayUnique.length > 0) {
		    //console.log("RESU LISTE : "+tmpArrayUnique);
		    positionsMaximisantlesrelations.push(tmpArrayUnique[0]);
		    //console.log("positionsMaximisantlesrelations : "+positionsMaximisantlesrelations);
		}
		//----------------------------------------------------------------------------------*/
	    }
	    else {
		//-----------------------------------------------------------------------------------
		// il faut vérifier parmi celles de A si elles sont uniques... VERIF EN COURS
		var tmpArray=dictionnairedespositionsdesrelationsentrelemmes[LISTEDESCLESRELATIONSPARFREQ[curseur]];
		//console.log("DEPART : "+tmpArray);
		var tmpArrayUnique=new Array;
		for (i=0; i<tmpArray.length; i++) {
		    //console.log(i+" : "+tmpArray[i]);
		    var verifUnique=0;
		    for (j=0; j<LISTEDESCLESRELATIONSPARFREQ.length; j++) {
			if (j != curseur) {
			    if ($.inArray(tmpArray[i],dictionnairedespositionsdesrelationsentrelemmes[LISTEDESCLESRELATIONSPARFREQ[j]]) != -1) {
				verifUnique=i;
				//console.log("RESTE : "+dictionnairedespositionsdesrelationsentrelemmes[LISTEDESCLESRELATIONSPARFREQ[j]]);
			    }
			}
		    }
		    //console.log("RESU : "+verifUnique);
		    if (verifUnique == 0) {
			tmpArrayUnique.push(tmpArray[i])
			
		    }
		}
		if (tmpArrayUnique.length > 0) {
		    //console.log("RESU LISTE : "+tmpArrayUnique);
		    positionsMaximisantlesrelations.push(tmpArrayUnique[0]);
		    //console.log("positionsMaximisantlesrelations : "+positionsMaximisantlesrelations);
		}
		//-----------------------------------------------------------------------------------
		insectVide=k;
		//console.log(insectVide);
		tmpIntersect=dictionnairedespositionsdesrelationsentrelemmes[LISTEDESCLESRELATIONSPARFREQ[curseur]];
		ListeDesPositionsDesContextesMax=dictionnairedespositionsdesrelationsentrelemmes[LISTEDESCLESRELATIONSPARFREQ[curseur]];
	    }
	    k=k+1;
	}
	curseur=curseur+1;
    }
    //--------------------------------------------------------------------------------
    // on verifie qu'il n'y a pas des elements uniques dans la derniere
    var tmpArray=dictionnairedespositionsdesrelationsentrelemmes[LISTEDESCLESRELATIONSPARFREQ[LISTEDESCLESRELATIONSPARFREQ.length-1]];
    //console.log("DEPART : "+tmpArray);
    var tmpArrayUnique=new Array;
    for (i=0; i<tmpArray.length; i++) {
	//console.log(i+" : "+tmpArray[i]);
	var verifUnique=0;
	for (j=0; j<LISTEDESCLESRELATIONSPARFREQ.length-1; j++) {
		if ($.inArray(tmpArray[i],dictionnairedespositionsdesrelationsentrelemmes[LISTEDESCLESRELATIONSPARFREQ[j]]) != -1) {
		    verifUnique=i;
		    //console.log("RESTE : "+dictionnairedespositionsdesrelationsentrelemmes[LISTEDESCLESRELATIONSPARFREQ[j]]);
	    }
	}
	//console.log("RESU : "+verifUnique);
	if (verifUnique == 0) {
	    tmpArrayUnique.push(tmpArray[i])
	    
	}
    }
    if (tmpArrayUnique.length > 0) {
	//console.log("RESU LISTE : "+tmpArrayUnique);
	positionsMaximisantlesrelations.push(tmpArrayUnique[0]);
	//console.log("positionsMaximisantlesrelations : "+positionsMaximisantlesrelations);
    }
    //-------------------------------------------------------------------------------
    // il reste à rendre uniques les éléments conservés...
    positionsMaximisantlesrelations=removeDuplicates(positionsMaximisantlesrelations);
    concordanceLemmesRelationMaxi();
}

//-----------------------------------------------------------------------------------
function cartesectionLemmesRelation(inputLemmesRelation) {

}
//-----------------------------------------------------------------------------------
function concordanceLemmesRelationMaxi() {
    var relation2scan="ANY";
    var AnnotationOutput=annotationencoursOUT;
    var lgcontexte=document.getElementById('lgcontexteID').value;
    var DictionnaireDesItems = new Object();
    var DictionnaireNumDesItems = new Object();
    if (nombredannotation > 1 ) {
	if (AnnotationOutput==1) {
	    DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
	    DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
	}
	if (AnnotationOutput==2) {
	    DictionnaireDesItems = jQuery.extend({}, DictionnaireLemme);
	    DictionnaireNumDesItems=jQuery.extend({}, dicNum2lemme);
	}
	if (AnnotationOutput==3) {
	    DictionnaireDesItems = jQuery.extend({}, DictionnaireCategorie);
	    DictionnaireNumDesItems=jQuery.extend({}, dicNum2categorie);
	}
	if (AnnotationOutput>3) {
	    DictionnaireDesItems = jQuery.extend({}, DictionnaireAnnotation);
	    DictionnaireNumDesItems=jQuery.extend({}, dicNum2annotation);
	}
    }
    else {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
    }
    // a changer...
    var annotationencoursIndex=AnnotationOutput-1;
    /*--------------------------*/
    var table='';
    table += '<table id="CONCORDANCE" class="display" width="100%">';
    /*--------------------------*/
    var PARTITION =document.getElementById('IDPartie').value;
    var LISTESDESPARTIES=new Object(); 
    var DicoDesPositionsDesPartiesPourSections=new Object(); 
    var positionMaxG=0;
    var positionMaxD=0;

    /* Inutile ??
    if (PARTITION != '') {
	LISTESDESPARTIES=Object.keys(cadre[PARTITION]);
	for (var j=0;j<LISTESDESPARTIES.length;j++) {
	    var listepositions = cadre[PARTITION][LISTESDESPARTIES[j]];
	    for (var k=0;k<(listepositions.length);k=k+2) {
		var deb = listepositions[k];
		var tmpk=k+1;
		var fin = listepositions[tmpk];
		DicoDesPositionsDesPartiesPourSections[deb]=PARTITION+"="+LISTESDESPARTIES[j]+"//"+deb+"//"+fin;

	    }
	}
	//var firstIndexTrame=Object.keys(trameForme)[0];
	//var j=Number(firstIndexTrame);
	//for (var k=1;k<firstIndexTrame;k++) {
	//    if (k in DicoDesPositionsDesPartiesPourSections) {
	//	table+= '<tr><td colspan="4"><span style="font-size:11px;color:red;font-weight: bold;font-variant: small-caps;">'+DicoDesPositionsDesPartiesPourSections[k]+'</span></td></tr>';
	//    }
	//}
    }
    else {
	positionMaxG=0;
	positionMaxD=positionsurlatrame;
    }
    */

    var nbContexte=0;
    var partieEnCours="";
    
    // pb sur contexte droit...
    positionMaxG=0;
    positionMaxD=positionsurlatrame;

    /*--------------------------*/
    for (var indexPos in positionsMaximisantlesrelations) {
	var index=positionsMaximisantlesrelations[indexPos];
	//alert("INDEX:"+index+"//"+inputLemmesRelation);

	/* Inutile ???
	if (index in DicoDesPositionsDesPartiesPourSections) {
	    if (DicoDesPositionsDesPartiesPourSections[index] != "ENDPARTIE") {
		
		var DDDD=DicoDesPositionsDesPartiesPourSections[index].split("//");
		var labelPartie=DDDD[0];
		positionMaxG=Number(DDDD[1]);
		positionMaxD=Number(DDDD[2]);
		alert(labelPartie+":"+positionMaxG+":"+positionMaxD);
		//table+= '<tr><td colspan="4"><span style="font-size:11px;color:red;font-weight: bold;font-variant: small-caps;">'+labelPartie+'</span></td></tr>';
	    }
	}
	fin de Inutile ??*/

	var item = DictionnaireNumDesItems[trameForme[index][annotationencoursIndex]];
	var itemDistribRelation = dicNum2lemme[trameForme[index][1]];
	var contexteG="";
	var contexteD="";
	var distribrelation= new Array;
	var nbItemGauche=0;
	var nbItemDroite=0;
	/* a droite */
	var posIndex=Number(index)+1;
	while (nbItemDroite <= lgcontexte) {
	    if ((posIndex in trameForme) && (posIndex <= positionMaxD)) {
		var item2 = DictionnaireNumDesItems[trameForme[posIndex][annotationencoursIndex]];
		if (!(dicNum2forme[trameForme[posIndex][0]] in dictionnairedesdelims))  {
		    nbItemDroite++;
		    if (nombredannotation > 1) {
			if (nombredannotation > 3) {
			    contexteD+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+posIndex+"<br/>(1):"+ dicNum2forme[trameForme[posIndex][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[posIndex][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[posIndex][2]];
			    for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
				var kk=tmpAnnot+1;
				contexteD+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[posIndex][tmpAnnot]];
			    }
			    //if ((document.getElementById('numAnnotRelationID').value == "") | (document.getElementById('relationID').value == "")) {
			    //contexteD+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
			    //}
			    //else {
			    //var rel = document.getElementById('relationID').value;
			    var rel = relation2scan;
			    var ident = document.getElementById('numAnnotRelationID').value;
			    ident=Number(ident);
			    var listerel2=dicNum2annotation[trameForme[posIndex][ident-1]];
			    var ListeDependanceAtThisPos=listerel2.split(",");
			    var test = "bad";
			    for (var nbDepAtThisPos=0;nbDepAtThisPos<ListeDependanceAtThisPos.length;nbDepAtThisPos++) {
				var rel2=ListeDependanceAtThisPos[nbDepAtThisPos];
				rel2=rel2.replaceAll("(","//");
				rel2=rel2.replaceAll(")","");
				var Lrel=rel2.split("//");
				if (((rel == Lrel[0]) || (rel == "ANY"))  && ( Lrel[1] == index )) {
				    test = "ok";
				}
			    }
			    if (test == "ok") {
				contexteD+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\"><span style=\"background-color:yellow\">"+item2+"</span></a>";
				distribrelation.push(Lrel[0]);
			    }
			    else {
				contexteD+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
			    }
			    //}
			}
			else {
			    contexteD+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+posIndex+"<br/>(1):"+ dicNum2forme[trameForme[posIndex][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[posIndex][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[posIndex][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
			}
		    }
		    else {
			contexteD+=item2;
		    }
		}
		else {
		    //contexteD+=item2;
		    contexteD+=item2;
		}
		posIndex++;
	    }
	    else {
		nbItemDroite=lgcontexte+1;
	    }
	}
	distribrelation.unshift(itemDistribRelation);
	/* a gauche */
	posIndex=Number(index)-1;
	while (nbItemGauche <= lgcontexte) {
	    if ((posIndex in trameForme) && (posIndex > positionMaxG)) {
		var item2 = DictionnaireNumDesItems[trameForme[posIndex][annotationencoursIndex]];
		if (!(dicNum2forme[trameForme[posIndex][0]] in dictionnairedesdelims))  {
		    nbItemGauche++;
		    if (nombredannotation > 1) {
			if (nombredannotation > 3) {
			    var tmpContext="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+posIndex+"<br/>(1):"+ dicNum2forme[trameForme[posIndex][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[posIndex][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[posIndex][2]];
			    for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
				var kk=tmpAnnot+1;
				tmpContext+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[posIndex][tmpAnnot]];
			    }
			    //if ((document.getElementById('numAnnotRelationID').value == "") | (document.getElementById('relationID').value == "")) {
				//tmpContext+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
				//contexteG=tmpContext+contexteG;
			    //}
			    //else {
			    var rel = relation2scan; //document.getElementById('relationID').value;
			    var ident = document.getElementById('numAnnotRelationID').value;
			    ident=Number(ident);
			    var listerel2=dicNum2annotation[trameForme[posIndex][ident-1]];
			    var ListeDependanceAtThisPos=listerel2.split(",");
			    var test = "bad";
			    for (var nbDepAtThisPos=0;nbDepAtThisPos<ListeDependanceAtThisPos.length;nbDepAtThisPos++) {
				var rel2=ListeDependanceAtThisPos[nbDepAtThisPos];
				rel2=rel2.replaceAll("(","//");
				rel2=rel2.replaceAll(")","");
				var Lrel=rel2.split("//");
				if (((rel == Lrel[0]) || (rel == "ANY"))  && ( Lrel[1] == index )) {
				    test = "ok";
				}
			    }
			    if (test == "ok") {
				tmpContext+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\"><span style=\"background-color:yellow\">"+item2+"</span></a>";
				contexteG=tmpContext+contexteG;
				distribrelation.unshift(Lrel[0]);
			    }
			    else {
				tmpContext+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
				contexteG=tmpContext+contexteG;
			    }
			    //}			
			}
			else {
			    contexteG="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+posIndex+"<br/>(1):"+ dicNum2forme[trameForme[posIndex][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[posIndex][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[posIndex][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>"+contexteG;
			}
		    }
		    else {
			contexteG=item2+contexteG;
		    }
		}
		else {
		    contexteG=item2+contexteG;
		}
		posIndex--;
	    }
	    else {
		nbItemGauche=lgcontexte+1;
	    }
	}
	nbContexte++;
	/* MODIF 2018 ****************************************************/
	var TMPPARTIENAME="";
	if (PARTITION != '') {
	    LISTESDESPARTIES=Object.keys(cadre[PARTITION]);
	    for (var j=0;j<LISTESDESPARTIES.length;j++) {
		var listepositions = cadre[PARTITION][LISTESDESPARTIES[j]];
		for (var k=0;k<(listepositions.length);k=k+2) {
		    var deb = Number(listepositions[k]);
		    var tmpk=k+1;
		    var fin = Number(listepositions[tmpk]);
		    var tmpIndex=Number(index);
		    if ((tmpIndex<=fin) && (tmpIndex>=deb)) {
			TMPPARTIENAME=LISTESDESPARTIES[j];
		    }
		}
	    }
	}
	/****************************************************************/
	if (nombredannotation > 1 ) {
	    if (nombredannotation > 3) {
		table +='<tr><td width="2%">'+nbContexte+'</td><td>'+TMPPARTIENAME+'</td><td style="text-align:right;" width="45%">'+contexteG+'</td><td style="text-align:center;" width="8%"><a style="text-decoration:none" href="#" onmouseover="Tip(\'<p>Position : '+index+'<br/>(1):'+ dicNum2forme[trameForme[index][0]] + '<br/>(2):' + dicNum2lemme[trameForme[index][1]] + '<br/>(3):' + dicNum2categorie[trameForme[index][2]];
		for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
		    var kk=tmpAnnot+1;
		    table +="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[index][tmpAnnot]];
		}
		table +="</p>')\" onmouseout=\"UnTip()\" rel=\""+item+"\">"+item+"</a></td><td style=\"text-align:left;\" width=\"45%\">"+contexteD+"</td><td>"+distribrelation.toString()+"</td></tr>";
	    }
	    else {
		table +='<tr><td width="2%">'+nbContexte+'</td><td>'+TMPPARTIENAME+'</td><td style="text-align:right;" width="45%">'+contexteG+'</td><td style="text-align:center;" width="8%"><a style="text-decoration:none" href="#" onmouseover="Tip(\'<p>(1):'+ dicNum2forme[trameForme[index][0]] + '<br/>(2):' + dicNum2lemme[trameForme[index][1]] + '<br/>(3):' + dicNum2categorie[trameForme[index][2]] +'</p>\')" onmouseout="UnTip()" rel="'+item+'">'+item+'</a></td><td style="text-align:left;" width="45%">'+contexteD+'</td><td></td></tr>';
	    }
	}
	else {
	    table +='<tr><td width="2%">'+nbContexte+'</td><td>'+TMPPARTIENAME+'</td><td style="text-align:right;" width="45%">'+contexteG+'</td><td style="text-align:center;" width="8%">'+item+'</td><td style="text-align:left;" width="45%">'+contexteD+'</td><td></td></tr>';
	}
    }
    table +='</table>';
    $("#placeholder").html(table);
    $(document).ready(function() {
	$('#CONCORDANCE').DataTable ( {
	    //order: [[ 1, "desc" ]],
	    lengthMenu: [[10, 25, 50,100, -1], [10, 25, 50,100, "All"]],
	    searchHighlight: true,
	    "destroy": true,
	    columns: [
		{title: "N°"},
		{title: "Partie"},
		{title: "Contexte Gauche"},
		{title: "Pôle"},
		{title: "Contexte Droit"},
		{title: "STRUCT. DEP."}
	    ]
	})
    });
}
function concordanceLemmesRelation(inputLemmesRelation) {
    var listePara=inputLemmesRelation.split("//");
    var relation2scan=listePara[0];
    var AnnotationOutput=annotationencoursOUT;
    var lgcontexte=document.getElementById('lgcontexteID').value;
    var DictionnaireDesItems = new Object();
    var DictionnaireNumDesItems = new Object();
    if (nombredannotation > 1 ) {
	if (AnnotationOutput==1) {
	    DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
	    DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
	}
	if (AnnotationOutput==2) {
	    DictionnaireDesItems = jQuery.extend({}, DictionnaireLemme);
	    DictionnaireNumDesItems=jQuery.extend({}, dicNum2lemme);
	}
	if (AnnotationOutput==3) {
	    DictionnaireDesItems = jQuery.extend({}, DictionnaireCategorie);
	    DictionnaireNumDesItems=jQuery.extend({}, dicNum2categorie);
	}
	if (AnnotationOutput>3) {
	    DictionnaireDesItems = jQuery.extend({}, DictionnaireAnnotation);
	    DictionnaireNumDesItems=jQuery.extend({}, dicNum2annotation);
	}
    }
    else {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
    }
    // a changer...
    var annotationencoursIndex=AnnotationOutput-1;
    /*--------------------------*/
    var table='';
    table += '<table id="CONCORDANCE" class="display" width="100%">';
    /*--------------------------*/
    var PARTITION =document.getElementById('IDPartie').value;
    var LISTESDESPARTIES=new Object(); 
    var DicoDesPositionsDesPartiesPourSections=new Object(); 
    var positionMaxG=0;
    var positionMaxD=0;

    /* Inutile ??
    if (PARTITION != '') {
	LISTESDESPARTIES=Object.keys(cadre[PARTITION]);
	for (var j=0;j<LISTESDESPARTIES.length;j++) {
	    var listepositions = cadre[PARTITION][LISTESDESPARTIES[j]];
	    for (var k=0;k<(listepositions.length);k=k+2) {
		var deb = listepositions[k];
		var tmpk=k+1;
		var fin = listepositions[tmpk];
		DicoDesPositionsDesPartiesPourSections[deb]=PARTITION+"="+LISTESDESPARTIES[j]+"//"+deb+"//"+fin;

	    }
	}
	//var firstIndexTrame=Object.keys(trameForme)[0];
	//var j=Number(firstIndexTrame);
	//for (var k=1;k<firstIndexTrame;k++) {
	//    if (k in DicoDesPositionsDesPartiesPourSections) {
	//	table+= '<tr><td colspan="4"><span style="font-size:11px;color:red;font-weight: bold;font-variant: small-caps;">'+DicoDesPositionsDesPartiesPourSections[k]+'</span></td></tr>';
	//    }
	//}
    }
    else {
	positionMaxG=0;
	positionMaxD=positionsurlatrame;
    }
    */

    var nbContexte=0;
    var partieEnCours="";
    
    // pb sur contexte droit...
    positionMaxG=0;
    positionMaxD=positionsurlatrame;

    /*--------------------------*/
    for (var indexPos in dictionnairedespositionsdesrelationsentrelemmes[inputLemmesRelation]) {
	var index=dictionnairedespositionsdesrelationsentrelemmes[inputLemmesRelation][indexPos];
	//alert("INDEX:"+index+"//"+inputLemmesRelation);

	/* Inutile ???
	if (index in DicoDesPositionsDesPartiesPourSections) {
	    if (DicoDesPositionsDesPartiesPourSections[index] != "ENDPARTIE") {
		
		var DDDD=DicoDesPositionsDesPartiesPourSections[index].split("//");
		var labelPartie=DDDD[0];
		positionMaxG=Number(DDDD[1]);
		positionMaxD=Number(DDDD[2]);
		alert(labelPartie+":"+positionMaxG+":"+positionMaxD);
		//table+= '<tr><td colspan="4"><span style="font-size:11px;color:red;font-weight: bold;font-variant: small-caps;">'+labelPartie+'</span></td></tr>';
	    }
	}
	fin de Inutile ??*/

	var item = DictionnaireNumDesItems[trameForme[index][annotationencoursIndex]];
	var contexteG="";
	var contexteD="";
	var nbItemGauche=0;
	var nbItemDroite=0;
	/* a droite */
	var posIndex=Number(index)+1;
	while (nbItemDroite <= lgcontexte) {
	    if ((posIndex in trameForme) && (posIndex <= positionMaxD)) {
		var item2 = DictionnaireNumDesItems[trameForme[posIndex][annotationencoursIndex]];
		if (!(dicNum2forme[trameForme[posIndex][0]] in dictionnairedesdelims))  {
		    nbItemDroite++;
		    if (nombredannotation > 1) {
			if (nombredannotation > 3) {
			    contexteD+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+posIndex+"<br/>(1):"+ dicNum2forme[trameForme[posIndex][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[posIndex][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[posIndex][2]];
			    for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
				var kk=tmpAnnot+1;
				contexteD+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[posIndex][tmpAnnot]];
			    }
			    //if ((document.getElementById('numAnnotRelationID').value == "") | (document.getElementById('relationID').value == "")) {
			    //contexteD+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
			    //}
			    //else {
			    //var rel = document.getElementById('relationID').value;
			    var rel = relation2scan;
			    var ident = document.getElementById('numAnnotRelationID').value;
			    ident=Number(ident);
			    var listerel2=dicNum2annotation[trameForme[posIndex][ident-1]];
			    var ListeDependanceAtThisPos=listerel2.split(",");
			    var test = "bad";
			    for (var nbDepAtThisPos=0;nbDepAtThisPos<ListeDependanceAtThisPos.length;nbDepAtThisPos++) {
				var rel2=ListeDependanceAtThisPos[nbDepAtThisPos];
				rel2=rel2.replaceAll("(","//");
				rel2=rel2.replaceAll(")","");
				var Lrel=rel2.split("//");
				if (((rel == Lrel[0]) || (rel == "ANY"))  && ( Lrel[1] == index )) {
				    test = "ok";
				}
			    }
			    if (test == "ok") {
				contexteD+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\"><span style=\"background-color:yellow\">"+item2+"</span></a>";
			    }
			    else {
				contexteD+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
			    }
			    //}
			}
			else {
			    contexteD+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+posIndex+"<br/>(1):"+ dicNum2forme[trameForme[posIndex][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[posIndex][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[posIndex][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
			}
		    }
		    else {
			contexteD+=item2;
		    }
		}
		else {
		    //contexteD+=item2;
		    contexteD+=item2;
		}
		posIndex++;
	    }
	    else {
		nbItemDroite=lgcontexte+1;
	    }
	}
	/* a gauche */
	posIndex=Number(index)-1;
	while (nbItemGauche <= lgcontexte) {
	    if ((posIndex in trameForme) && (posIndex > positionMaxG)) {
		var item2 = DictionnaireNumDesItems[trameForme[posIndex][annotationencoursIndex]];
		if (!(dicNum2forme[trameForme[posIndex][0]] in dictionnairedesdelims))  {
		    nbItemGauche++;
		    if (nombredannotation > 1) {
			if (nombredannotation > 3) {
			    var tmpContext="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+posIndex+"<br/>(1):"+ dicNum2forme[trameForme[posIndex][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[posIndex][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[posIndex][2]];
			    for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
				var kk=tmpAnnot+1;
				tmpContext+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[posIndex][tmpAnnot]];
			    }
			    //if ((document.getElementById('numAnnotRelationID').value == "") | (document.getElementById('relationID').value == "")) {
				//tmpContext+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
				//contexteG=tmpContext+contexteG;
			    //}
			    //else {
			    var rel = relation2scan; //document.getElementById('relationID').value;
			    var ident = document.getElementById('numAnnotRelationID').value;
			    ident=Number(ident);
			    var listerel2=dicNum2annotation[trameForme[posIndex][ident-1]];
			    var ListeDependanceAtThisPos=listerel2.split(",");
			    var test = "bad";
			    for (var nbDepAtThisPos=0;nbDepAtThisPos<ListeDependanceAtThisPos.length;nbDepAtThisPos++) {
				var rel2=ListeDependanceAtThisPos[nbDepAtThisPos];
				rel2=rel2.replaceAll("(","//");
				rel2=rel2.replaceAll(")","");
				var Lrel=rel2.split("//");
				if (((rel == Lrel[0]) || (rel == "ANY"))  && ( Lrel[1] == index )) {
				    test = "ok";
				}
			    }
			    if (test == "ok") {
				tmpContext+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\"><span style=\"background-color:yellow\">"+item2+"</span></a>";
				contexteG=tmpContext+contexteG;
			    }
			    else {
				tmpContext+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
				contexteG=tmpContext+contexteG;
			    }
			    //}			
			}
			else {
			    contexteG="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+posIndex+"<br/>(1):"+ dicNum2forme[trameForme[posIndex][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[posIndex][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[posIndex][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>"+contexteG;
			}
		    }
		    else {
			contexteG=item2+contexteG;
		    }
		}
		else {
		    contexteG=item2+contexteG;
		}
		posIndex--;
	    }
	    else {
		nbItemGauche=lgcontexte+1;
	    }
	}
	nbContexte++;
	/* MODIF 2018 ****************************************************/
	var TMPPARTIENAME="";
	if (PARTITION != '') {
	    LISTESDESPARTIES=Object.keys(cadre[PARTITION]);
	    for (var j=0;j<LISTESDESPARTIES.length;j++) {
		var listepositions = cadre[PARTITION][LISTESDESPARTIES[j]];
		for (var k=0;k<(listepositions.length);k=k+2) {
		    var deb = Number(listepositions[k]);
		    var tmpk=k+1;
		    var fin = Number(listepositions[tmpk]);
		    var tmpIndex=Number(index);
		    if ((tmpIndex<=fin) && (tmpIndex>=deb)) {
			TMPPARTIENAME=LISTESDESPARTIES[j];
		    }
		}
	    }
	}
	/****************************************************************/
	if (nombredannotation > 1 ) {
	    if (nombredannotation > 3) {
		table +='<tr><td width="2%">'+nbContexte+'</td><td>'+TMPPARTIENAME+'</td><td style="text-align:right;" width="45%">'+contexteG+'</td><td style="text-align:center;" width="8%"><a style="text-decoration:none" href="#" onmouseover="Tip(\'<p>Position : '+index+'<br/>(1):'+ dicNum2forme[trameForme[index][0]] + '<br/>(2):' + dicNum2lemme[trameForme[index][1]] + '<br/>(3):' + dicNum2categorie[trameForme[index][2]];
		for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
		    var kk=tmpAnnot+1;
		    table +="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[index][tmpAnnot]];
		}
		table +="</p>')\" onmouseout=\"UnTip()\" rel=\""+item+"\">"+item+"</a></td><td style=\"text-align:left;\" width=\"45%\">"+contexteD+"</td></tr>";
	    }
	    else {
		table +='<tr><td width="2%">'+nbContexte+'</td><td>'+TMPPARTIENAME+'</td><td style="text-align:right;" width="45%">'+contexteG+'</td><td style="text-align:center;" width="8%"><a style="text-decoration:none" href="#" onmouseover="Tip(\'<p>(1):'+ dicNum2forme[trameForme[index][0]] + '<br/>(2):' + dicNum2lemme[trameForme[index][1]] + '<br/>(3):' + dicNum2categorie[trameForme[index][2]] +'</p>\')" onmouseout="UnTip()" rel="'+item+'">'+item+'</a></td><td style="text-align:left;" width="45%">'+contexteD+'</td></tr>';
	    }
	}
	else {
	    table +='<tr><td width="2%">'+nbContexte+'</td><td>'+TMPPARTIENAME+'</td><td style="text-align:right;" width="45%">'+contexteG+'</td><td style="text-align:center;" width="8%">'+item+'</td><td style="text-align:left;" width="45%">'+contexteD+'</td></tr>';
	}
    }
    table +='</table>';
    $("#placeholder").html(table);
    $(document).ready(function() {
	$('#CONCORDANCE').DataTable ( {
	    //order: [[ 1, "desc" ]],
	    lengthMenu: [[10, 25, 50,100, -1], [10, 25, 50,100, "All"]],
	    searchHighlight: true,
	    "destroy": true,
	    columns: [
		{title: "N°"},
		{title: "Partie"},
		{title: "Contexte Gauche"},
		{title: "Pôle"},
		{title: "Contexte Droit"}
	    ]
	})
    });
}

/************************************************************************************************/
function grapheRelation() {
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    var relation_annot_For_grapherelation=document.getElementById('numAnnotRelationID').value;
    if (relation_annot_For_grapherelation==""){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur numérique pour le numéro d\'annotation visée...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    relation_annot_For_grapherelation=Number(relation_annot_For_grapherelation);
    var relation=document.getElementById('relationID').value;
    if (relation == ""){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur pour le nom de l\'annotation visée...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    //-----------------------------------------------------------------
    refreshItrameur();
    //-----------------------------------------------------------------
    var dicoRelationItems=new Object();
    var lemmeGouv2search=document.getElementById('gouvlemmeID').value;
    var lemmeDep2search=document.getElementById('deplemmeID').value;
    for (var index in trameForme) {
	var indexAsNumber=Number(index);
	var refdelakey=trameForme[index];

	var tmpIdentAndRelationAtThisPos=dicNum2annotation[refdelakey[relation_annot_For_grapherelation-1]]; // ATTENTION : il faut tester si on a une liste de dependance !!!!
	var ListeDependanceAtThisPos=tmpIdentAndRelationAtThisPos.split(",");

	for (var nbDepAtThisPos=0;nbDepAtThisPos<ListeDependanceAtThisPos.length;nbDepAtThisPos++) {
	    var IdentAndRelationAtThisPos=ListeDependanceAtThisPos[nbDepAtThisPos];
	    var LIdentAndRelationAtThisPos=[];
	    /* il faut tester si le DEP en cours correspond au lemmeDep2search */
	    if ((lemmeDep2search == "") || (lemmeDep2search == "...")) {
		//IdentAndRelationAtThisPos=dicNum2annotation[refdelakey[relation_annot_For_grapherelation-1]]; 
		IdentAndRelationAtThisPos=IdentAndRelationAtThisPos.replaceAll("(","//");
		IdentAndRelationAtThisPos=IdentAndRelationAtThisPos.replaceAll(")","");
		LIdentAndRelationAtThisPos=IdentAndRelationAtThisPos.split("//"); // a refaire !!!
	    }
	    else {
		if ((lemmeDep2search in DictionnaireLemme) && (lemmeDep2search == dicNum2lemme[trameForme[index][1]] )) {
		    //IdentAndRelationAtThisPos=dicNum2annotation[refdelakey[relation_annot_For_grapherelation-1]]; 
		    IdentAndRelationAtThisPos=IdentAndRelationAtThisPos.replaceAll("(","//");
		    IdentAndRelationAtThisPos=IdentAndRelationAtThisPos.replaceAll(")","");
		    LIdentAndRelationAtThisPos=IdentAndRelationAtThisPos.split("//"); // a refaire !!!
		}
	    }
	    /* on regarde maintenant si le lemme retenu contient la bonne relation */
	    if (LIdentAndRelationAtThisPos.length>1) {
		var IdentRelationAtThisPos=Number(LIdentAndRelationAtThisPos[1]);
		var RelationAtThisPos=LIdentAndRelationAtThisPos[0];
		if ((RelationAtThisPos==relation) || ((relation == "ANY") && (RelationAtThisPos!=""))) {
		    var refdelakey2=trameForme[IdentRelationAtThisPos];
		    var verif=0;
		    if ((lemmeGouv2search == "") || (lemmeGouv2search == "...")) {
			verif=1;
		    }
		    else {
			if (lemmeGouv2search in DictionnaireLemme) {
			    if (lemmeGouv2search == dicNum2lemme[trameForme[IdentRelationAtThisPos][1]]) {
				verif=1;
			    }
			}
		    }
		    if (verif ==1) {
			var LGrelation=0;
			var POSDEPENDANT="-";
			if (indexAsNumber >= IdentRelationAtThisPos) {
			    var tmplg=0;
			    for (var k=IdentRelationAtThisPos+1;k<indexAsNumber;k++) {
				if (!(dicNum2forme[trameForme[k][0]] in dictionnairedesdelims)) {
				    tmplg++;
				}
			    }
			    LGrelation=Number(tmplg);
			    POSDEPENDANT="POST";
			}
			else {
			    var tmplg=0;
			    for (var k=indexAsNumber+1;k<IdentRelationAtThisPos;k++) {
				if (!(dicNum2forme[trameForme[k][0]] in dictionnairedesdelims)) {
				    tmplg++;
				}
			    }
			    LGrelation=Number(tmplg);
			    POSDEPENDANT="ANTE";
			}
			var patronencours=RelationAtThisPos+"//"+dicNum2lemme[refdelakey[1]]+"//"+dicNum2lemme[refdelakey2[1]];
			if (patronencours in dicoRelationItems) {
			    var TMPLIST=dicoRelationItems[patronencours];
			    var fqPat=Number(TMPLIST[0]);
			    fqPat++;
			    LGrelation=Number(TMPLIST[1])+Number(LGrelation);
			    var nbPOST=Number(TMPLIST[2]);
			    var nbANTE=Number(TMPLIST[3]);
			    if (POSDEPENDANT == "POST") {nbPOST++};
			    if (POSDEPENDANT == "ANTE") {nbANTE++};
			    dicoRelationItems[patronencours]=[];
			    dicoRelationItems[patronencours].push(fqPat,LGrelation,nbPOST,nbANTE);
			}
			else {
			    var nbPOST=0;
			    var nbANTE=0;
			    if (POSDEPENDANT == "POST") {nbPOST++};
			    if (POSDEPENDANT == "ANTE") {nbANTE++};
			    dicoRelationItems[patronencours]=[];
			    dicoRelationItems[patronencours].push(1,LGrelation,nbPOST,nbANTE);
			}
		    }
		}
	    }
	}
    }
    var resultFinal=new Array();
    var LISTEDESRELATIONSPOS= Object.keys(dicoRelationItems);/*.sort(function(a,b){
	var x = dicoRelationItems[a][0];
	var y = dicoRelationItems[b][0];
	return x < y ? 1 : x > y ? -1 : 0;
    });;*/
     /*--------------------------*/
    /*Le graphe*/
    var legend ='<small><b>DEPENDANCE entre lemmes : relation '+relation+'</b><br/><span style="background:#fee7cd">Dépendant</span>&nbsp;<font color="#99CC99">&#x2212;</font>'+relation+':fq<font color="#99CC99">&#8594;</font>&nbsp;<span style="background:red">Gouverneur</span></small><br/><span style="background:yellow"><img onclick="clear_canvas();" src="./images/trash.png" title="suppression graphique" alt="suppression graphique"/></span>';
    document.getElementById('legendGraphe').innerHTML = legend;
    GrapheArborL=document.getElementById('grLID').value;
    GrapheArborH=document.getElementById('grHID').value;	
    reinit_canvas();
    sysArbor =  new arbor.ParticleSystem(20, 600, 0.8, false, 50, 0.015, 0.6);
    var colornode="#fee7cd";
    
    for (var i=0; i<LISTEDESRELATIONSPOS.length;i++) {
	var listPOS=LISTEDESRELATIONSPOS[i].split("//");
	var TMPLIST=dicoRelationItems[LISTEDESRELATIONSPOS[i]];
	var fq=TMPLIST[0];
	var LGrelation=Number(TMPLIST[1])/Number(fq);
	LGrelation=LGrelation.toFixed(2);//precise_round(LGrelation,2);
	var nbPOST=TMPLIST[2];
	var nbANTE=TMPLIST[3];
	if (!($.isArray(resultFinal[i]))) {
	    resultFinal[i]=new Array();
	}
	resultFinal[i]=[];
	resultFinal[i].push(listPOS[2],listPOS[0],listPOS[1],fq,LGrelation,nbPOST,nbANTE); 
	/* arcs et noeuds */
	var labelG=" "+listPOS[2]+ " ";
	var labelD=listPOS[1];
        if (sysArbor.getNode(labelD) == undefined) {
            var node2List=sysArbor.addNode(labelD,{'color':colornode,'shape':'rectangle','label':labelD});
			LISTEDESNOEUDSINCANVAS.push(node2List);			
        }
        if (sysArbor.getNode(labelG) == undefined) {
            var node2List=sysArbor.addNode(labelG,{'color':'red','shape':'dot','label':labelG});
			LISTEDESNOEUDSINCANVAS.push(node2List);			
        }
	var label=listPOS[0]+":"+fq;
	sysArbor.addEdge(labelD,labelG,{'weight':5,'color':'#99CC99','directed':1,'length':.75, 'pointSize':10,data:{name:label}});

	/*****************/
   }
    /*--------------------------*/
    document.getElementById('placeholder').innerHTML = '<h4>Liste des dépendances (lemme&#8594;lemme)<br/>Relation : '+relation+'</h4><table id="searchrelation" class="display" width="50%"></table>';
    $(document).ready(function() {
	$('#searchrelation').DataTable ( {
	    order: [[ 3, "desc" ]],
	    data:resultFinal,
	    searchHighlight: true,
	    "destroy": true,
	    lengthMenu: [[10, 25, 50,100, -1], [10, 25, 50,100, "All"]],
		dom: 'Bfrtip',
		buttons: [
				'copy', 'csv', 'excel', 'pdf', 'print'
			],
	    columns: [
		{title: "Gouverneur"},
		{title: "Relation"},
		{title: "Dépendant"},
		{title: "Fq Relation"},
		{title: "Longueur"},
		{title: "Fq Post"},
		{title: "Fq Ante"}
	    ]
	})
    });
    sysArbor.renderer = Renderer("#grapheHolder"); 
}

/*---------------------------------------------------------------------------*/
function selectItemInDico() {

    var vide='';
    $("#placeholder").html(vide);
    /*----------------------------------------------------------------------------*/
    var DictionnaireDesItems = new Object();
    var DictionnaireNumDesItems = new Object();
    if (annotationencours==1) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
    }
    if (annotationencours==2) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireLemme);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2lemme);
    }
    if (annotationencours==3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireCategorie);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2categorie);
    }
    if (annotationencours>3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireAnnotation);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2annotation);
    }
    var annotationencoursIndex=annotationencours-1;
    /*----------------------------------------------------------------------------*/
	var queryText=document.getElementById('poleID').value;
    for (var index in trameForme) {
	var indexAsNumber=Number(index);
	var refdelakey=trameForme[index];
	var tmpIndex=DictionnaireNumDesItems[refdelakey[annotationencoursIndex]];
	if (tmpIndex==queryText) {
	    gestionnaireSelection[index]=1;
	}
    }
    vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:#FDBBD2">Sélection \"'+queryText+'\" termin&eacute;e...</span></small>';
    $("#placeholder").html(vide);
}

//-----------------------------------------------------------------------------------
function selectionDependance() {
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    var relation_annot_For_grapherelation=document.getElementById('numAnnotRelationID').value;
    if (relation_annot_For_grapherelation==""){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur numérique pour le numéro d\'annotation visée...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    relation_annot_For_grapherelation=Number(relation_annot_For_grapherelation);
    var relation=document.getElementById('relationID').value;
    if (relation == ""){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur pour le nom de l\'annotation visée...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    //-----------------------------------------------------------------
    refreshItrameur();
    //-----------------------------------------------------------------
    for (var index in trameForme) {
	var indexAsNumber=Number(index);
	var refdelakey=trameForme[index];

	var tmpIdentAndRelationAtThisPos=dicNum2annotation[refdelakey[relation_annot_For_grapherelation-1]]; // ATTENTION : il faut tester si on a une liste de dependance !!!!
	var ListeDependanceAtThisPos=tmpIdentAndRelationAtThisPos.split(",");

	for (var nbDepAtThisPos=0;nbDepAtThisPos<ListeDependanceAtThisPos.length;nbDepAtThisPos++) {
	    var IdentAndRelationAtThisPos=ListeDependanceAtThisPos[nbDepAtThisPos];
	    var LIdentAndRelationAtThisPos=[];
	    /* il faut tester si le DEP en cours correspond au lemmeDep2search */
	    //IdentAndRelationAtThisPos=dicNum2annotation[refdelakey[relation_annot_For_grapherelation-1]]; 
	    IdentAndRelationAtThisPos=IdentAndRelationAtThisPos.replaceAll("(","//");
	    IdentAndRelationAtThisPos=IdentAndRelationAtThisPos.replaceAll(")","");
	    LIdentAndRelationAtThisPos=IdentAndRelationAtThisPos.split("//"); // a refaire !!!
	    /* on regarde maintenant si le lemme retenu contient la bonne relation */
	    if (LIdentAndRelationAtThisPos.length>1) {
		var IdentRelationAtThisPos=Number(LIdentAndRelationAtThisPos[1]);
		var RelationAtThisPos=LIdentAndRelationAtThisPos[0];
		if ((RelationAtThisPos==relation) || ((relation == "ANY") && (RelationAtThisPos!=""))) {
		    //if (RelationAtThisPos==relation) {
		    var refdelakey2=trameForme[IdentRelationAtThisPos];
		    gestionnaireSelection[index]=1;
		    gestionnaireSelection[IdentRelationAtThisPos]=1;
		}
	    }
	}
    }
    var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:#FDBBD2">Sélection termin&eacute;e...</span></small>';
    $("#placeholder").html(vide);
}
//-----------------------------------------------------------------------------------
function displayListeRelationGouv () {
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);       return;
    }
    if ((nombredannotation == 1) || (nombredannotation < 3)) {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Impossible de fusionner des annotations sur cette base : il faut au moins 3 annotations dans la base...</span></small>';
	$("#placeholder").html(vide);       return;
    }
    var listeAnnot=document.getElementById('numAnnotRelationID').value;
    if (listeAnnot > nombredannotation) {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Annotation '+listeAnnot+' indisponible...</span></small>';
	$("#placeholder").html(vide);
	return;
    }
    
    nombredannotation++;
    nombredannotation++;

    // new label for new annotation
    if (Dicodeslabelsdescolonnes.length > 0) {
	var newlabel1="lem(G)_Rel";
	var newlabel2="lem(G)_Rel_lem(D)";
	Dicodeslabelsdescolonnes.push(newlabel1);
	Dicodeslabelsdescolonnes.push(newlabel2);
    }

    for (var index in trameForme) {
	var itemForme = dicNum2forme[trameForme[index][0]];
	if (!(itemForme in dictionnairedesdelims))  {
	    /*var annot1="";
	    if (listeAnnot==1) {
		annot1=dicNum2forme[trameForme[index][0]];
	    }
	    if (listeAnnot==2) {
		annot1=dicNum2lemme[trameForme[index][1]];
	    }
	    if (listeAnnot==3) {
		annot1=dicNum2categorie[trameForme[index][2]];
	    }
	    if (listeAnnot>3) {
		var annottmp=Number(listeAnnot[0]) - 1;
		annot1=dicNum2annotation[trameForme[index][annottmp]];
	    }
	    */
	    //-------- recherche du gouverneur -----------------------
	    var annot1="";
	    var annot2="";
	    var annot3="";
	    var annot2addOne="";
	    var annot2addTwo="";
	    var indexAsNumber=Number(index);
	    var refdelakey=trameForme[index];
	    var IdentAndRelationAtThisPos=dicNum2annotation[refdelakey[listeAnnot-1]]; // ATTENTION : PB si on a une liste de dependance !!!!
	    // il faut commencer par verifier si on n'a pas plusieurs dependances
	    var ListeDependanceAtThisPos=IdentAndRelationAtThisPos.split(",");
	    for (var nbDepAtThisPos=0;nbDepAtThisPos<ListeDependanceAtThisPos.length;nbDepAtThisPos++) {
		// ATTENTION MODIF lié à ROOT par exemple
		annot1="";
		annot2="";
		annot3="";
		var tmpIdentAndRelationAtThisPos=ListeDependanceAtThisPos[nbDepAtThisPos];
		tmpIdentAndRelationAtThisPos=tmpIdentAndRelationAtThisPos.replaceAll("(","//");
		tmpIdentAndRelationAtThisPos=tmpIdentAndRelationAtThisPos.replaceAll(")","");
		var LIdentAndRelationAtThisPos=tmpIdentAndRelationAtThisPos.split("//");
		if (LIdentAndRelationAtThisPos.length>1) {
		    var IdentRelationAtThisPos=Number(LIdentAndRelationAtThisPos[1]);
		    var RelationAtThisPos=LIdentAndRelationAtThisPos[0];
		    var refdelakey2=trameForme[IdentRelationAtThisPos];
		    annot1=RelationAtThisPos;
		    annot2=dicNum2lemme[refdelakey2[1]];
		    annot3=dicNum2lemme[refdelakey[1]];
		}
		//--------------------------------------------------------
		if (annot1 == "") { annot1 = LIdentAndRelationAtThisPos[0] }; // ATTENTION MODIF lié à ROOT par exemple : il faut pê aussi ajouter annot3
		if (annot3 == "") { annot3 = dicNum2lemme[refdelakey[1]] };
		var annotOne = annot2+ "_" +annot1 ;
		var annotBis = annot2+"_"+annot1+"_"+annot3;
		var liant="";
		if (nbDepAtThisPos > 0) {liant=","};
		annot2addOne = annot2addOne + liant + annotOne
		annot2addTwo = annot2addTwo + liant + annotBis
	    }
	    var nbAnnotTmp=nombredannotation-2;
	    if (!(annot2addOne in dicAnnotation2num)) {
		numeroapparitionsurlatrameAnnotation++;
		dicAnnotation2num[annot2addOne]=numeroapparitionsurlatrameAnnotation;
		dicNum2annotation[numeroapparitionsurlatrameAnnotation]=annot2addOne;
	    }
	    nbAnnotTmp++;
	    var identAnnot=nbAnnotTmp+"//"+annot2addOne;
	    if (DictionnaireAnnotation[identAnnot] === undefined) {
		DictionnaireAnnotation[identAnnot] = 1;
	    }
	    else {
		DictionnaireAnnotation[identAnnot] = DictionnaireAnnotation[identAnnot]  + 1;
	    }
	    //-------------------------------------
	    if (!(annot2addTwo in dicAnnotation2num)) {
		numeroapparitionsurlatrameAnnotation++;
		dicAnnotation2num[annot2addTwo]=numeroapparitionsurlatrameAnnotation;
		dicNum2annotation[numeroapparitionsurlatrameAnnotation]=annot2addTwo;
	    }
	    nbAnnotTmp++
	    var identAnnotBis=nbAnnotTmp+"//"+annot2addTwo;
	    if (DictionnaireAnnotation[identAnnotBis] === undefined) {
		DictionnaireAnnotation[identAnnotBis] = 1;
	    }
	    else {
		DictionnaireAnnotation[identAnnotBis] = DictionnaireAnnotation[identAnnotBis]  + 1;
	    }
	    trameForme[index].push(dicAnnotation2num[annot2addOne]);
	    trameForme[index].push(dicAnnotation2num[annot2addTwo]);
	    
	}
	else {
	    var annot = itemForme;
	    if (!(annot in dicAnnotation2num)) {
		numeroapparitionsurlatrameAnnotation++;
		dicAnnotation2num[annot]=numeroapparitionsurlatrameAnnotation;
		dicNum2annotation[numeroapparitionsurlatrameAnnotation]=annot;
	    }
	    trameForme[index].push(dicAnnotation2num[annot]);
	    trameForme[index].push(dicAnnotation2num[annot]);
	}
    }
    $('#IDannotations option').remove();
    $('#IDannotationsOUT option').remove();

    for (var ii=1;ii<=nombredannotation;ii++){
	if (Dicodeslabelsdescolonnes.length == 0) {
	    $('#IDannotations').append( '<option value="'+ii+'">'+ii+'</option>' );
	    $('#IDannotationsOUT').append( '<option value="'+ii+'">'+ii+'</option>' );
	}
	else {
	    $('#IDannotations').append( '<option value="'+ii+'">'+ii+':'+Dicodeslabelsdescolonnes[ii-1]+'</option>' );
	    $('#IDannotationsOUT').append( '<option value="'+ii+'">'+ii+':'+Dicodeslabelsdescolonnes[ii-1]+'</option>' );
	}
    }

    var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:#FDBBD2">Ajout annotation termin&eacute; : la base dispose de '+nombredannotation+' couches d\'annotations </span></small>';
    $("#placeholder").html(vide);
    return 0;

}
//-----------------------------------------------------------------------------------
function displayListeRelationGouv2 () {
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);       return;
    }
    if ((nombredannotation == 1) || (nombredannotation < 3)) {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Impossible de fusionner des annotations sur cette base : il faut au moins 3 annotations dans la base...</span></small>';
	$("#placeholder").html(vide);       return;
    }
    var listeAnnot=document.getElementById('numAnnotRelationID').value;
    if (listeAnnot > nombredannotation) {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Annotation '+listeAnnot+' indisponible...</span></small>';
	$("#placeholder").html(vide);
	return;
    }
    
    nombredannotation++;
    nombredannotation++;

    // new label for new annotation
    if (Dicodeslabelsdescolonnes.length > 0) {
	var newlabel1="pos(G)_Rel";
	var newlabel2="pos(G)_Rel_pos(D)";
	Dicodeslabelsdescolonnes.push(newlabel1);
	Dicodeslabelsdescolonnes.push(newlabel2);
    }

    for (var index in trameForme) {
	var itemForme = dicNum2forme[trameForme[index][0]];
	if (!(itemForme in dictionnairedesdelims))  {
	    //-------- recherche du gouverneur -----------------------
	    var annot1="";
	    var annot2="";
	    var annot3="";
	    var annot2addOne="";
	    var annot2addTwo="";
	    var indexAsNumber=Number(index);
	    var refdelakey=trameForme[index];
	    var IdentAndRelationAtThisPos=dicNum2annotation[refdelakey[listeAnnot-1]]; // ATTENTION : PB si on a une liste de dependance !!!!
	    // il faut commencer par verifier si on n'a pas plusieurs dependances
	    var ListeDependanceAtThisPos=IdentAndRelationAtThisPos.split(",");
	    for (var nbDepAtThisPos=0;nbDepAtThisPos<ListeDependanceAtThisPos.length;nbDepAtThisPos++) {
		// ATTENTION MODIF 
		annot1="";
		annot2="";
		annot3="";
		var tmpIdentAndRelationAtThisPos=ListeDependanceAtThisPos[nbDepAtThisPos];
		tmpIdentAndRelationAtThisPos=tmpIdentAndRelationAtThisPos.replaceAll("(","//");
		tmpIdentAndRelationAtThisPos=tmpIdentAndRelationAtThisPos.replaceAll(")","");
		var LIdentAndRelationAtThisPos=tmpIdentAndRelationAtThisPos.split("//");
		if (LIdentAndRelationAtThisPos.length>1) {
		    var IdentRelationAtThisPos=Number(LIdentAndRelationAtThisPos[1]);
		    var RelationAtThisPos=LIdentAndRelationAtThisPos[0];
		    //if (RelationAtThisPos == "ROOT") {
		    //	console.log("ID : "+IdentRelationAtThisPos+" REL :"+RelationAtThisPos);
		    //}
		    var refdelakey2=trameForme[IdentRelationAtThisPos];
		    annot1=RelationAtThisPos;
		    annot2=dicNum2categorie[refdelakey2[2]];
		    annot3=dicNum2categorie[refdelakey[2]];
		}
		//--------------------------------------------------------
		if (annot1 == "") { annot1 = LIdentAndRelationAtThisPos[0] }; // ATTENTION MODIF lié à ROOT par exemple : il faut pê aussi ajouter annot3
		if (annot3 == "") { annot3 = dicNum2categorie[refdelakey[2]] };
		var annotOne = annot2+ "_" +annot1 ;
		var annotBis = annot2+"_"+annot1+"_"+annot3;
		var liant="";
		if (nbDepAtThisPos > 0) {liant=","};
		annot2addOne = annot2addOne + liant + annotOne
		annot2addTwo = annot2addTwo + liant + annotBis
	    }
	    var nbAnnotTmp=nombredannotation-2;
	    if (!(annot2addOne in dicAnnotation2num)) {
		numeroapparitionsurlatrameAnnotation++;
		dicAnnotation2num[annot2addOne]=numeroapparitionsurlatrameAnnotation;
		dicNum2annotation[numeroapparitionsurlatrameAnnotation]=annot2addOne;
	    }
	    nbAnnotTmp++;
	    var identAnnot=nbAnnotTmp+"//"+annot2addOne;
	    if (DictionnaireAnnotation[identAnnot] === undefined) {
		DictionnaireAnnotation[identAnnot] = 1;
	    }
	    else {
		DictionnaireAnnotation[identAnnot] = DictionnaireAnnotation[identAnnot]  + 1;
	    }
	    //-------------------------------------
	    if (!(annot2addTwo in dicAnnotation2num)) {
		numeroapparitionsurlatrameAnnotation++;
		dicAnnotation2num[annot2addTwo]=numeroapparitionsurlatrameAnnotation;
		dicNum2annotation[numeroapparitionsurlatrameAnnotation]=annot2addTwo;
	    }
	    nbAnnotTmp++
	    var identAnnotBis=nbAnnotTmp+"//"+annot2addTwo;
	    if (DictionnaireAnnotation[identAnnotBis] === undefined) {
		DictionnaireAnnotation[identAnnotBis] = 1;
	    }
	    else {
		DictionnaireAnnotation[identAnnotBis] = DictionnaireAnnotation[identAnnotBis]  + 1;
	    }
	    trameForme[index].push(dicAnnotation2num[annot2addOne]);
	    trameForme[index].push(dicAnnotation2num[annot2addTwo]);
	}
	else {
	    var annot = itemForme;
	    if (!(annot in dicAnnotation2num)) {
		numeroapparitionsurlatrameAnnotation++;
		dicAnnotation2num[annot]=numeroapparitionsurlatrameAnnotation;
		dicNum2annotation[numeroapparitionsurlatrameAnnotation]=annot;
	    }
	    trameForme[index].push(dicAnnotation2num[annot]);
	    trameForme[index].push(dicAnnotation2num[annot]);
	}
    }
    $('#IDannotations option').remove();
    $('#IDannotationsOUT option').remove();
    for (var ii=1;ii<=nombredannotation;ii++){
	if (Dicodeslabelsdescolonnes.length == 0) {
	    $('#IDannotations').append( '<option value="'+ii+'">'+ii+'</option>' );
	    $('#IDannotationsOUT').append( '<option value="'+ii+'">'+ii+'</option>' );
	}
	else {
	    $('#IDannotations').append( '<option value="'+ii+'">'+ii+':'+Dicodeslabelsdescolonnes[ii-1]+'</option>' );
	    $('#IDannotationsOUT').append( '<option value="'+ii+'">'+ii+':'+Dicodeslabelsdescolonnes[ii-1]+'</option>' );
	}
    }
    var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:#FDBBD2">Ajout annotation termin&eacute; : la base dispose de '+nombredannotation+' couches d\'annotations </span></small>';
    $("#placeholder").html(vide);
    return 0;

}
//-----------------------------------------------------------------------------------
function displayRelationBetweenPos () {
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);
	return;
    }
    var relation_annot_For_grapherelation=document.getElementById('numAnnotRelationID').value;
    if (relation_annot_For_grapherelation==""){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur numérique pour le numéro d\'annotation visée...</span></small>';
	$("#placeholder").html(vide);
       return;
    }
	relation_annot_For_grapherelation=Number(relation_annot_For_grapherelation);
	var relation=document.getElementById('relationID').value;
    if (relation == ""){
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur pour le nom de l\'annotation visée...</span></small>';
	$("#placeholder").html(vide);
       return;
    }
    //-----------------------------------------------------------------
    refreshItrameur();
    //-----------------------------------------------------------------
    var dicoRelationItems=new Object();
    //----------------------------------------------------------------
    for (var index in trameForme) {
	var indexAsNumber=Number(index);
	var refdelakey=trameForme[index];

	var tmpIdentAndRelationAtThisPos=dicNum2annotation[refdelakey[relation_annot_For_grapherelation-1]]; // ATTENTION : il faut tester si on a une liste de dependance !!!!
	var ListeDependanceAtThisPos=tmpIdentAndRelationAtThisPos.split(",");

	for (var nbDepAtThisPos=0;nbDepAtThisPos<ListeDependanceAtThisPos.length;nbDepAtThisPos++) {
	    var IdentAndRelationAtThisPos=ListeDependanceAtThisPos[nbDepAtThisPos];
	    var LIdentAndRelationAtThisPos=[];
	    //var IdentAndRelationAtThisPos=dicNum2annotation[refdelakey[relation_annot_For_grapherelation-1]]; 
	    IdentAndRelationAtThisPos=IdentAndRelationAtThisPos.replaceAll("(","//");
	    IdentAndRelationAtThisPos=IdentAndRelationAtThisPos.replaceAll(")","");
	    LIdentAndRelationAtThisPos=IdentAndRelationAtThisPos.split("//"); // a refaire !!!
	    if (LIdentAndRelationAtThisPos.length>1) {
		var IdentRelationAtThisPos=Number(LIdentAndRelationAtThisPos[1]);
		var RelationAtThisPos=LIdentAndRelationAtThisPos[0];
		if ((RelationAtThisPos==relation) || ((relation == "ANY") && (RelationAtThisPos!=""))) {
		    //if (RelationAtThisPos==relation) {
		    var refdelakey2=trameForme[IdentRelationAtThisPos];
		    var LGrelation=0;
		    var POSDEPENDANT="-";
		    if (indexAsNumber >= IdentRelationAtThisPos) {
			var tmplg=0;
			for (var k=IdentRelationAtThisPos+1;k<indexAsNumber;k++) {
			    //if (!dictionnairedesdelims.hasOwnProperty(dicNum2forme[trameForme[k][0]])) {
			    if (!(dicNum2forme[trameForme[k][0]] in dictionnairedesdelims)) {
				tmplg++;
			    }
			}
			LGrelation=Number(tmplg);
			POSDEPENDANT="POST";
		    }
		    else {
			var tmplg=0;
			for (var k=indexAsNumber+1;k<IdentRelationAtThisPos;k++) {
			    //if (!dictionnairedesdelims.hasOwnProperty(dicNum2forme[trameForme[k][0]])) {
			    if (!(dicNum2forme[trameForme[k][0]] in dictionnairedesdelims)) {
				tmplg++;
			    }
			}
			LGrelation=Number(tmplg);
			POSDEPENDANT="ANTE";
		    }
		    //console.log("I:"+indexAsNumber+"|IdentRelationAtThisPos:"+IdentRelationAtThisPos+"|LG:"+LGrelation);
		    var patronencours=RelationAtThisPos+"//"+dicNum2categorie[refdelakey[2]]+"//"+dicNum2categorie[refdelakey2[2]];
		    //var patronencours=relation+"//"+dicNum2categorie[refdelakey[2]]+"//"+dicNum2categorie[refdelakey2[2]];
		    if (patronencours in dicoRelationItems) {
			var TMPLIST=dicoRelationItems[patronencours];
			var fqPat=Number(TMPLIST[0]);
			fqPat++;
			LGrelation=Number(TMPLIST[1])+Number(LGrelation);
			var nbPOST=Number(TMPLIST[2]);
			var nbANTE=Number(TMPLIST[3]);
			if (POSDEPENDANT == "POST") {nbPOST++};
			if (POSDEPENDANT == "ANTE") {nbANTE++};
			dicoRelationItems[patronencours]=[];
			dicoRelationItems[patronencours].push(fqPat,LGrelation,nbPOST,nbANTE);
		    }
		    else {
			var nbPOST=0;
			var nbANTE=0;
			if (POSDEPENDANT == "POST") {nbPOST++};
			if (POSDEPENDANT == "ANTE") {nbANTE++};
			dicoRelationItems[patronencours]=[];
			dicoRelationItems[patronencours].push(1,LGrelation,nbPOST,nbANTE);
		    }
		}
	    }
	}
    }
    var resultFinal=new Array();
    var LISTEDESRELATIONSPOS= Object.keys(dicoRelationItems);/*.sort(function(a,b){
	var x = dicoRelationItems[a][0];
	var y = dicoRelationItems[b][0];
	return x < y ? 1 : x > y ? -1 : 0;
    });;*/
     /*--------------------------*/
    /*Le graphe*/
    var legend ='<small><b>Graphe DEPENDANCE entre POS : relation '+relation+'</b><br/><span style="background:#fee7cd">Dépendant</span>&nbsp;<font color="#99CC99">&#x2212;</font>'+relation+':fq<font color="#99CC99">&#8594;</font>&nbsp;<span style="background:red">Gouverneur</span></small><br/><span style="background:yellow"><img onclick="clear_canvas();" src="./images/trash.png" title="suppression graphique" alt="suppression graphique"/></span>';
    document.getElementById('legendGraphe').innerHTML = legend;
    GrapheArborL=document.getElementById('grLID').value;
    GrapheArborH=document.getElementById('grHID').value;	
    reinit_canvas();
    sysArbor =  new arbor.ParticleSystem(20, 600, 0.8, false, 50, 0.015, 0.6);
    var colornode="#fee7cd";
   
    for (var i=0; i<LISTEDESRELATIONSPOS.length;i++) {
	var listPOS=LISTEDESRELATIONSPOS[i].split("//");
	var TMPLIST=dicoRelationItems[LISTEDESRELATIONSPOS[i]];
	//console.log(listPOS[0],listPOS[1],listPOS[2],TMPLIST); 
	var fq=TMPLIST[0];
	var LGrelation=Number(TMPLIST[1])/Number(fq);
	LGrelation=LGrelation.toFixed(2);//precise_round(LGrelation,2);
	var nbPOST=TMPLIST[2];
	var nbANTE=TMPLIST[3];
	if (!($.isArray(resultFinal[i]))) {
	    resultFinal[i]=new Array();
	}
	resultFinal[i]=[];
	resultFinal[i].push(listPOS[2],listPOS[0],listPOS[1],fq,LGrelation,nbPOST,nbANTE); 
	/* arcs et noeuds */
	var labelG=" "+listPOS[2]+" ";
	var labelD=listPOS[1];
        if (sysArbor.getNode(labelD) == undefined) {
            var node2List=sysArbor.addNode(labelD,{'color':colornode,'shape':'rectangle','label':labelD});
			LISTEDESNOEUDSINCANVAS.push(node2List);
        }
        if (sysArbor.getNode(labelG) == undefined) {
            var node2List=sysArbor.addNode(labelG,{'color':'red','shape':'dot','label':labelG});
			LISTEDESNOEUDSINCANVAS.push(node2List);			
        }
	var label=listPOS[0]+":"+fq;
	sysArbor.addEdge(labelD,labelG,{'weight':5,'color':'#99CC99','directed':1,'length':.75, 'pointSize':10,data:{name:label}});

	/*****************/
    }
    /*--------------------------*/
    document.getElementById('placeholder').innerHTML = '<h4>Liste des dépendances pos&#8594;pos<br/>Relation : '+relation+'</h4><table id="searchrelation" class="display" width="50%"></table>';
    $(document).ready(function() {
	$('#searchrelation').DataTable ( {
	    order: [[ 3, "desc" ]],
	    data:resultFinal,
	    searchHighlight: true,
	    "destroy": true,
	    lengthMenu: [[10, 25, 50,100, -1], [10, 25, 50,100, "All"]],
		dom: 'Bfrtip',
		buttons: [
				'copy', 'csv', 'excel', 'pdf', 'print'
			],
	    columns: [
		{title: "Gouverneur"},
		{title: "Relation"},
		{title: "Dépendant"},
		{title: "Fq Relation"},
		{title: "Longueur"},
		{title: "Fq Post"},
		{title: "Fq Ante"}
	    ]
	})
    });
    sysArbor.renderer = Renderer("#grapheHolder"); 
}
//-----------------------------------------------------------------------------------
// FONCTIONS SELECTION
//-----------------------------------------------------------------------------------
function eraseSelection() {
    gestionnaireSelection = new Object();
    initSelection();
    var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:#FDBBD2">Gestionnaire de Sélection vide...</span></small>';
    $("#placeholder").html(vide);
}
function initSelection() {
	for (var index in trameForme) {
		var itemForme = dicNum2forme[trameForme[index][0]];
		if (!(itemForme in dictionnairedesdelims))  {
			gestionnaireSelection[index]=0;
		}
	}
}
/*--------------------------------------------------------------------------------------------------------*/
function biconcordanceselection () {
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    var inputBitext = document.getElementById ("bitextID");
    var isCheckedBitext = inputBitext.checked;
    if (!(isCheckedBitext)) { 
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger/activer un bitexte...</span></small>';
	$("#placeholder").html(vide);	
	return; 
    }
    if (isTheCarteDesSectionsOK ==0) {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger la carte des sections...</span></small>';
	$("#placeholder").html(vide);
	return;
    }

    refreshItrameur();

    var lgcontexte=document.getElementById('lgcontexteID').value;
    var DictionnaireDesItems = new Object();
    var DictionnaireNumDesItems = new Object();
    var DictionnaireDesItemsOut = new Object();
    var DictionnaireNumDesItemsOut = new Object();
    if (annotationencours==1) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
	if (annotationencours != annotationencoursOUT) {
	    if (annotationencoursOUT==2) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireLemme);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2lemme);
	    }
	    if (annotationencoursOUT==3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireCategorie);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2categorie);
	    }
	    if (annotationencoursOUT>3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
	    }
	}
    }
    if (annotationencours==2) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireLemme);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2lemme);
	if (annotationencours != annotationencoursOUT) {
	    if (annotationencoursOUT==1) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireSource);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2forme);
	    }
	    if (annotationencoursOUT==3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireCategorie);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2categorie);
	    }
	    if (annotationencoursOUT>3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
	    }
	}
    }
    if (annotationencours==3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireCategorie);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2categorie);
	if (annotationencours != annotationencoursOUT) {
	    if (annotationencoursOUT==1) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireSource);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2forme);
	    }
	    if (annotationencoursOUT==2) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireLemme);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2lemme);
	    }
	    if (annotationencoursOUT>3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
	    }
	}
    }
    if (annotationencours>3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireAnnotation);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2annotation);
	if (annotationencours != annotationencoursOUT) {
	    if (annotationencoursOUT==1) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireSource);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2forme);
	    }
	    if (annotationencoursOUT==2) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireLemme);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2lemme);
	    }
	    if (annotationencoursOUT==3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireCategorie);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2categorie);
	    }
	    if (annotationencoursOUT>3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
	    }
	}
    }
    var annotationencoursIndex=annotationencours-1;
    var annotationencoursIndexOUT=annotationencoursOUT-1;
    /*--------------------------*/
    var table='';
    table += '<table id="BICONCORDANCE" class="display" width="100%">';
    /*--------------------------*/
    var nbContexte=0;
    /*--------------------------*/
    var nbSectionSource = Number(nbSectionGlobalForBitext)/2;
    for (var nbsect in FlagSectionCarteSource) {
	nbsect=Number(nbsect);
	if ((FlagSectionCarteCible[nbsect]==1) || (FlagSectionCarteSource[nbsect]==1)) {
	    var contentxtSOURCE="";
	    var contentxtCIBLE="";
	    var nbsectmp1=nbsect-1;
	    var nbsectmp2=nbsect+nbSectionSource-1;
	    var infoSource =  LISTESCONTEXTESSOURCE[nbsectmp1].split(":");
	    var posDebS=Number(infoSource[0]);
	    var posFinS=Number(infoSource[1]);
	    var infoCible =  LISTESCONTEXTESCIBLE[nbsectmp2].split(":");
	    var posDebC=Number(infoCible[0]);
	    var posFinC=Number(infoCible[1]);
	    for (var i=posDebS;i<=posFinS;i++) {
		var item=DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
		
		if (!(dicNum2forme[trameForme[i][0]] in dictionnairedesdelims))  {
		    var item2;
		    if (annotationencours != annotationencoursOUT) {
			item2 = DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]];
		    }
		    else {
			item2 = DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
		    }
		    
		    if (nombredannotation > 1) {	
			if (nombredannotation > 3) {
			    var tmpContext="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]];
			    for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
				var kk=tmpAnnot+1;
				tmpContext+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[i][tmpAnnot]];
			    }
			    if (gestionnaireSelection[i] ==1) {
				tmpContext+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+'<span class="selectIP">'+item2+'</span>'+"</a>";
			    }
			    else {
				tmpContext+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
			    }
			    contentxtSOURCE+=tmpContext;
			}
			else {
			    if (gestionnaireSelection[i] ==1) {
				contentxtSOURCE+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+'<span class="selectIP">'+item2+'</span>'+"</a>";
			    }
			    else {
				contentxtSOURCE+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
			    }
			}
		    }
		    else {
			if (gestionnaireSelection[i] ==1) {
			    contentxtSOURCE+='<span class="selectIP">'+item2+'</span>';
			}
			else {
			    contentxtSOURCE+=item2;
			}
		    }
		}
		else {
		    if (gestionnaireSelection[i] ==1) {item='<span class="selectIP">'+item+'</span>'};
		    contentxtSOURCE+=item;
		}
	    }
	    for (var i=posDebC;i<=posFinC;i++) {
		var item=DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
		if (!(dicNum2forme[trameForme[i][0]] in dictionnairedesdelims))  {
		    var item2;
		    if (annotationencours != annotationencoursOUT) {
			item2 = DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]];
		    }
		    else {
			item2 = DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
		    }
		    if (nombredannotation > 1) {	
			if (nombredannotation > 3) {
			    var tmpContext="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]];
			    for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
				var kk=tmpAnnot+1;
				tmpContext+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[i][tmpAnnot]];
			    }
			    if (gestionnaireSelection[i] ==1) {
				tmpContext+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+'<span class="selectIP">'+item2+'</span>'+"</a>";
			    }
			    else {
				tmpContext+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
			    }
			    contentxtCIBLE+=tmpContext;
			}
			else {
			    if (gestionnaireSelection[i] ==1) {
				contentxtCIBLE+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+'<span class="selectIP">'+item2+'</span>'+"</a>";
			    }
			    else {
				contentxtCIBLE+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
			    }
			}
		    }
		    else {
			if (gestionnaireSelection[i] ==1) {
			    contentxtCIBLE+='<span class="selectIP">'+item2+'</span>';
			}
			else {
			    contentxtCIBLE+=item2;
			}
		    }
		}
		else {
		    if (gestionnaireSelection[i] ==1) {item='<span class="selectIP">'+item+'</span>'};
		    contentxtCIBLE+=item;
		}
	    }
	    nbContexte=nbContexte+1;
	    table += '<tr><td>'+nbContexte+'</td><td>'+contentxtSOURCE+'</td><td>'+contentxtCIBLE+'</td></tr>';

	}
    }
    table +='</table>';
    $("#placeholder").html(table);
    $(document).ready(function() {
	$('#BICONCORDANCE').DataTable ( {
	    //order: [[ 1, "desc" ]],
	    lengthMenu: [[10, 25, 50,100, -1], [10, 25, 50,100, "All"]],
	    searchHighlight: true,
	    "destroy": true,
	    columns: [
		{title: "N°"},
		{title: "Contexte Source"},
		{title: "Contexte Cible"}
			]
	})
    });

}
function biconcordanceselectionIntersection () {
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    var inputBitext = document.getElementById ("bitextID");
    var isCheckedBitext = inputBitext.checked;
    if (!(isCheckedBitext)) { 
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger/activer un bitexte...</span></small>';
	$("#placeholder").html(vide);	
	return; 
    }
    if (isTheCarteDesSectionsOK ==0) {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger la carte des sections...</span></small>';
	$("#placeholder").html(vide);
	return;
    }

    refreshItrameur();

    var lgcontexte=document.getElementById('lgcontexteID').value;
    var DictionnaireDesItems = new Object();
    var DictionnaireNumDesItems = new Object();
    var DictionnaireDesItemsOut = new Object();
    var DictionnaireNumDesItemsOut = new Object();
    if (annotationencours==1) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
	if (annotationencours != annotationencoursOUT) {
	    if (annotationencoursOUT==2) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireLemme);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2lemme);
	    }
	    if (annotationencoursOUT==3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireCategorie);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2categorie);
	    }
	    if (annotationencoursOUT>3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
	    }
	}
    }
    if (annotationencours==2) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireLemme);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2lemme);
	if (annotationencours != annotationencoursOUT) {
	    if (annotationencoursOUT==1) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireSource);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2forme);
	    }
	    if (annotationencoursOUT==3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireCategorie);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2categorie);
	    }
	    if (annotationencoursOUT>3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
	    }
	}
    }
    if (annotationencours==3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireCategorie);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2categorie);
	if (annotationencours != annotationencoursOUT) {
	    if (annotationencoursOUT==1) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireSource);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2forme);
	    }
	    if (annotationencoursOUT==2) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireLemme);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2lemme);
	    }
	    if (annotationencoursOUT>3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
	    }
	}
    }
    if (annotationencours>3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireAnnotation);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2annotation);
	if (annotationencours != annotationencoursOUT) {
	    if (annotationencoursOUT==1) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireSource);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2forme);
	    }
	    if (annotationencoursOUT==2) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireLemme);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2lemme);
	    }
	    if (annotationencoursOUT==3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireCategorie);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2categorie);
	    }
	    if (annotationencoursOUT>3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
	    }
	}
    }
    var annotationencoursIndex=annotationencours-1;
    var annotationencoursIndexOUT=annotationencoursOUT-1;
    /*--------------------------*/
    var table='';
    table += '<table id="BICONCORDANCE" class="display" width="100%">';
    /*--------------------------*/
    var nbContexte=0;
    /*--------------------------*/
    var nbSectionSource = Number(nbSectionGlobalForBitext)/2;
    for (var nbsect in FlagSectionCarteSource) {
	nbsect=Number(nbsect);
	if ((FlagSectionCarteCible[nbsect]==1) && (FlagSectionCarteSource[nbsect]==1)) {
	    var contentxtSOURCE="";
	    var contentxtCIBLE="";
	    var nbsectmp1=nbsect-1;
	    var nbsectmp2=nbsect+nbSectionSource-1;
	    var infoSource =  LISTESCONTEXTESSOURCE[nbsectmp1].split(":");
	    var posDebS=Number(infoSource[0]);
	    var posFinS=Number(infoSource[1]);
	    var infoCible =  LISTESCONTEXTESCIBLE[nbsectmp2].split(":");
	    var posDebC=Number(infoCible[0]);
	    var posFinC=Number(infoCible[1]);
	    for (var i=posDebS;i<=posFinS;i++) {
		var item=DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
		
		if (!(dicNum2forme[trameForme[i][0]] in dictionnairedesdelims))  {
		    var item2;
		    if (annotationencours != annotationencoursOUT) {
			item2 = DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]];
		    }
		    else {
			item2 = DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
		    }
		    
		    if (nombredannotation > 1) {	
			if (nombredannotation > 3) {
			    var tmpContext="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]];
			    for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
				var kk=tmpAnnot+1;
				tmpContext+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[i][tmpAnnot]];
			    }
			    if (gestionnaireSelection[i] ==1) {
				tmpContext+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+'<span class="selectIP">'+item2+'</span>'+"</a>";
			    }
			    else {
				tmpContext+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
			    }
			    contentxtSOURCE+=tmpContext;
			}
			else {
			    if (gestionnaireSelection[i] ==1) {
				contentxtSOURCE+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+'<span class="selectIP">'+item2+'</span>'+"</a>";
			    }
			    else {
				contentxtSOURCE+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
			    }
			}
		    }
		    else {
			if (gestionnaireSelection[i] ==1) {
			    contentxtSOURCE+='<span class="selectIP">'+item2+'</span>';
			}
			else {
			    contentxtSOURCE+=item2;
			}
		    }
		}
		else {
		    if (gestionnaireSelection[i] ==1) {item='<span class="selectIP">'+item+'</span>'};
		    contentxtSOURCE+=item;
		}
	    }
	    for (var i=posDebC;i<=posFinC;i++) {
		var item=DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
		if (!(dicNum2forme[trameForme[i][0]] in dictionnairedesdelims))  {
		    var item2;
		    if (annotationencours != annotationencoursOUT) {
			item2 = DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]];
		    }
		    else {
			item2 = DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
		    }
		    if (nombredannotation > 1) {	
			if (nombredannotation > 3) {
			    var tmpContext="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]];
			    for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
				var kk=tmpAnnot+1;
				tmpContext+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[i][tmpAnnot]];
			    }
			    if (gestionnaireSelection[i] ==1) {
				tmpContext+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+'<span class="selectIP">'+item2+'</span>'+"</a>";
			    }
			    else {
				tmpContext+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
			    }
			    contentxtCIBLE+=tmpContext;
			}
			else {
			    if (gestionnaireSelection[i] ==1) {
				contentxtCIBLE+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+'<span class="selectIP">'+item2+'</span>'+"</a>";
			    }
			    else {
				contentxtCIBLE+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
			    }
			}
		    }
		    else {
			if (gestionnaireSelection[i] ==1) {
			    contentxtCIBLE+='<span class="selectIP">'+item2+'</span>';
			}
			else {
			    contentxtCIBLE+=item2;
			}
		    }
		}
		else {
		    if (gestionnaireSelection[i] ==1) {item='<span class="selectIP">'+item+'</span>'};
		    contentxtCIBLE+=item;
		}
	    }
	    nbContexte=nbContexte+1;
	    table += '<tr><td>'+nbContexte+'</td><td>'+contentxtSOURCE+'</td><td>'+contentxtCIBLE+'</td></tr>';

	}
    }
    table +='</table>';
    $("#placeholder").html(table);
    $(document).ready(function() {
	$('#BICONCORDANCE').DataTable ( {
	    //order: [[ 1, "desc" ]],
	    lengthMenu: [[10, 25, 50,100, -1], [10, 25, 50,100, "All"]],
	    searchHighlight: true,
	    "destroy": true,
	    columns: [
		{title: "N°"},
		{title: "Contexte Source"},
		{title: "Contexte Cible"}
			]
	})
    });

}
function biconcordanceselectionPresenceSource () {
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    var inputBitext = document.getElementById ("bitextID");
    var isCheckedBitext = inputBitext.checked;
    if (!(isCheckedBitext)) { 
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger/activer un bitexte...</span></small>';
	$("#placeholder").html(vide);	
	return; 
    }
    if (isTheCarteDesSectionsOK ==0) {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger la carte des sections...</span></small>';
	$("#placeholder").html(vide);
	return;
    }

    refreshItrameur();

    var lgcontexte=document.getElementById('lgcontexteID').value;
    var DictionnaireDesItems = new Object();
    var DictionnaireNumDesItems = new Object();
    var DictionnaireDesItemsOut = new Object();
    var DictionnaireNumDesItemsOut = new Object();
    if (annotationencours==1) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
	if (annotationencours != annotationencoursOUT) {
	    if (annotationencoursOUT==2) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireLemme);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2lemme);
	    }
	    if (annotationencoursOUT==3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireCategorie);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2categorie);
	    }
	    if (annotationencoursOUT>3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
	    }
	}
    }
    if (annotationencours==2) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireLemme);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2lemme);
	if (annotationencours != annotationencoursOUT) {
	    if (annotationencoursOUT==1) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireSource);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2forme);
	    }
	    if (annotationencoursOUT==3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireCategorie);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2categorie);
	    }
	    if (annotationencoursOUT>3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
	    }
	}
    }
    if (annotationencours==3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireCategorie);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2categorie);
	if (annotationencours != annotationencoursOUT) {
	    if (annotationencoursOUT==1) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireSource);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2forme);
	    }
	    if (annotationencoursOUT==2) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireLemme);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2lemme);
	    }
	    if (annotationencoursOUT>3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
	    }
	}
    }
    if (annotationencours>3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireAnnotation);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2annotation);
	if (annotationencours != annotationencoursOUT) {
	    if (annotationencoursOUT==1) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireSource);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2forme);
	    }
	    if (annotationencoursOUT==2) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireLemme);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2lemme);
	    }
	    if (annotationencoursOUT==3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireCategorie);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2categorie);
	    }
	    if (annotationencoursOUT>3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
	    }
	}
    }
    var annotationencoursIndex=annotationencours-1;
    var annotationencoursIndexOUT=annotationencoursOUT-1;
    /*--------------------------*/
    var table='';
    table += '<table id="BICONCORDANCE" class="display" width="100%">';
    /*--------------------------*/
    var nbContexte=0;
    /*--------------------------*/
    var nbSectionSource = Number(nbSectionGlobalForBitext)/2;
    for (var nbsect in FlagSectionCarteSource) {
	nbsect=Number(nbsect);
	if ((FlagSectionCarteCible[nbsect]==0) && (FlagSectionCarteSource[nbsect]==1)) {
	    var contentxtSOURCE="";
	    var contentxtCIBLE="";
	    var nbsectmp1=nbsect-1;
	    var nbsectmp2=nbsect+nbSectionSource-1;
	    var infoSource =  LISTESCONTEXTESSOURCE[nbsectmp1].split(":");
	    var posDebS=Number(infoSource[0]);
	    var posFinS=Number(infoSource[1]);
	    var infoCible =  LISTESCONTEXTESCIBLE[nbsectmp2].split(":");
	    var posDebC=Number(infoCible[0]);
	    var posFinC=Number(infoCible[1]);
	    for (var i=posDebS;i<=posFinS;i++) {
		var item=DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
		
		if (!(dicNum2forme[trameForme[i][0]] in dictionnairedesdelims))  {
		    var item2;
		    if (annotationencours != annotationencoursOUT) {
			item2 = DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]];
		    }
		    else {
			item2 = DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
		    }
		    
		    if (nombredannotation > 1) {	
			if (nombredannotation > 3) {
			    var tmpContext="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]];
			    for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
				var kk=tmpAnnot+1;
				tmpContext+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[i][tmpAnnot]];
			    }
			    if (gestionnaireSelection[i] ==1) {
				tmpContext+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+'<span class="selectIP">'+item2+'</span>'+"</a>";
			    }
			    else {
				tmpContext+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
			    }
			    contentxtSOURCE+=tmpContext;
			}
			else {
			    if (gestionnaireSelection[i] ==1) {
				contentxtSOURCE+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+'<span class="selectIP">'+item2+'</span>'+"</a>";
			    }
			    else {
				contentxtSOURCE+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
			    }
			}
		    }
		    else {
			if (gestionnaireSelection[i] ==1) {
			    contentxtSOURCE+='<span class="selectIP">'+item2+'</span>';
			}
			else {
			    contentxtSOURCE+=item2;
			}
		    }
		}
		else {
		    if (gestionnaireSelection[i] ==1) {item='<span class="selectIP">'+item+'</span>'};
		    contentxtSOURCE+=item;
		}
	    }
	    for (var i=posDebC;i<=posFinC;i++) {
		var item=DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
		if (!(dicNum2forme[trameForme[i][0]] in dictionnairedesdelims))  {
		    var item2;
		    if (annotationencours != annotationencoursOUT) {
			item2 = DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]];
		    }
		    else {
			item2 = DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
		    }
		    if (nombredannotation > 1) {	
			if (nombredannotation > 3) {
			    var tmpContext="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]];
			    for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
				var kk=tmpAnnot+1;
				tmpContext+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[i][tmpAnnot]];
			    }
			    if (gestionnaireSelection[i] ==1) {
				tmpContext+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+'<span class="selectIP">'+item2+'</span>'+"</a>";
			    }
			    else {
				tmpContext+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
			    }
			    contentxtCIBLE+=tmpContext;
			}
			else {
			    if (gestionnaireSelection[i] ==1) {
				contentxtCIBLE+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+'<span class="selectIP">'+item2+'</span>'+"</a>";
			    }
			    else {
				contentxtCIBLE+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
			    }
			}
		    }
		    else {
			if (gestionnaireSelection[i] ==1) {
			    contentxtCIBLE+='<span class="selectIP">'+item2+'</span>';
			}
			else {
			    contentxtCIBLE+=item2;
			}
		    }
		}
		else {
		    if (gestionnaireSelection[i] ==1) {item='<span class="selectIP">'+item+'</span>'};
		    contentxtCIBLE+=item;
		}
	    }
	    nbContexte=nbContexte+1;
	    table += '<tr><td>'+nbContexte+'</td><td>'+contentxtSOURCE+'</td><td>'+contentxtCIBLE+'</td></tr>';

	}
    }
    table +='</table>';
    $("#placeholder").html(table);
    $(document).ready(function() {
	$('#BICONCORDANCE').DataTable ( {
	    //order: [[ 1, "desc" ]],
	    lengthMenu: [[10, 25, 50,100, -1], [10, 25, 50,100, "All"]],
	    searchHighlight: true,
	    "destroy": true,
	    columns: [
		{title: "N°"},
		{title: "Contexte Source"},
		{title: "Contexte Cible"}
			]
	})
    });

}
function biconcordanceselectionPresenceCible () {
    if (FILEINPUTTOREAD == "") {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger un fichier...</span></small>';
	$("#placeholder").html(vide);	
	return;
    }
    var inputBitext = document.getElementById ("bitextID");
    var isCheckedBitext = inputBitext.checked;
    if (!(isCheckedBitext)) { 
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger/activer un bitexte...</span></small>';
	$("#placeholder").html(vide);
	return; 
    }
    if (isTheCarteDesSectionsOK ==0) {
	var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut commencer par charger la carte des sections...</span></small>';
	$("#placeholder").html(vide);
	return;
    }

    refreshItrameur();

    var lgcontexte=document.getElementById('lgcontexteID').value;
    var DictionnaireDesItems = new Object();
    var DictionnaireNumDesItems = new Object();
    var DictionnaireDesItemsOut = new Object();
    var DictionnaireNumDesItemsOut = new Object();
    if (annotationencours==1) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2forme);
	if (annotationencours != annotationencoursOUT) {
	    if (annotationencoursOUT==2) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireLemme);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2lemme);
	    }
	    if (annotationencoursOUT==3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireCategorie);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2categorie);
	    }
	    if (annotationencoursOUT>3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
	    }
	}
    }
    if (annotationencours==2) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireLemme);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2lemme);
	if (annotationencours != annotationencoursOUT) {
	    if (annotationencoursOUT==1) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireSource);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2forme);
	    }
	    if (annotationencoursOUT==3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireCategorie);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2categorie);
	    }
	    if (annotationencoursOUT>3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
	    }
	}
    }
    if (annotationencours==3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireCategorie);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2categorie);
	if (annotationencours != annotationencoursOUT) {
	    if (annotationencoursOUT==1) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireSource);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2forme);
	    }
	    if (annotationencoursOUT==2) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireLemme);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2lemme);
	    }
	    if (annotationencoursOUT>3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
	    }
	}
    }
    if (annotationencours>3) {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireAnnotation);
	DictionnaireNumDesItems=jQuery.extend({}, dicNum2annotation);
	if (annotationencours != annotationencoursOUT) {
	    if (annotationencoursOUT==1) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireSource);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2forme);
	    }
	    if (annotationencoursOUT==2) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireLemme);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2lemme);
	    }
	    if (annotationencoursOUT==3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireCategorie);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2categorie);
	    }
	    if (annotationencoursOUT>3) {
		DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
		DictionnaireNumDesItemsOut=jQuery.extend({}, dicNum2annotation);
	    }
	}
    }
    var annotationencoursIndex=annotationencours-1;
    var annotationencoursIndexOUT=annotationencoursOUT-1;
    /*--------------------------*/
    var table='';
    table += '<table id="BICONCORDANCE" class="display" width="100%">';
    /*--------------------------*/
    var nbContexte=0;
    /*--------------------------*/
    var nbSectionSource = Number(nbSectionGlobalForBitext)/2;
    for (var nbsect in FlagSectionCarteSource) {
	nbsect=Number(nbsect);
	if ((FlagSectionCarteCible[nbsect]==1) && (FlagSectionCarteSource[nbsect]==0)) {
	    var contentxtSOURCE="";
	    var contentxtCIBLE="";
	    var nbsectmp1=nbsect-1;
	    var nbsectmp2=nbsect+nbSectionSource-1;
	    var infoSource =  LISTESCONTEXTESSOURCE[nbsectmp1].split(":");
	    var posDebS=Number(infoSource[0]);
	    var posFinS=Number(infoSource[1]);
	    var infoCible =  LISTESCONTEXTESCIBLE[nbsectmp2].split(":");
	    var posDebC=Number(infoCible[0]);
	    var posFinC=Number(infoCible[1]);
	    for (var i=posDebS;i<=posFinS;i++) {
		var item=DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
		
		if (!(dicNum2forme[trameForme[i][0]] in dictionnairedesdelims))  {
		    var item2;
		    if (annotationencours != annotationencoursOUT) {
			item2 = DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]];
		    }
		    else {
			item2 = DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
		    }
		    
		    if (nombredannotation > 1) {	
			if (nombredannotation > 3) {
			    var tmpContext="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]];
			    for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
				var kk=tmpAnnot+1;
				tmpContext+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[i][tmpAnnot]];
			    }
			    if (gestionnaireSelection[i] ==1) {
				tmpContext+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+'<span class="selectIP">'+item2+'</span>'+"</a>";
			    }
			    else {
				tmpContext+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
			    }
			    contentxtSOURCE+=tmpContext;
			}
			else {
			    if (gestionnaireSelection[i] ==1) {
				contentxtSOURCE+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+'<span class="selectIP">'+item2+'</span>'+"</a>";
			    }
			    else {
				contentxtSOURCE+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
			    }
			}
		    }
		    else {
			if (gestionnaireSelection[i] ==1) {
			    contentxtSOURCE+='<span class="selectIP">'+item2+'</span>';
			}
			else {
			    contentxtSOURCE+=item2;
			}
		    }
		}
		else {
		    if (gestionnaireSelection[i] ==1) {item='<span class="selectIP">'+item+'</span>'};
		    contentxtSOURCE+=item;
		}
	    }
	    for (var i=posDebC;i<=posFinC;i++) {
		var item=DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
		if (!(dicNum2forme[trameForme[i][0]] in dictionnairedesdelims))  {
		    var item2;
		    if (annotationencours != annotationencoursOUT) {
			item2 = DictionnaireNumDesItemsOut[trameForme[i][annotationencoursIndexOUT]];
		    }
		    else {
			item2 = DictionnaireNumDesItems[trameForme[i][annotationencoursIndex]];
		    }
		    if (nombredannotation > 1) {	
			if (nombredannotation > 3) {
			    var tmpContext="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+ dicNum2categorie[trameForme[i][2]];
			    for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
				var kk=tmpAnnot+1;
				tmpContext+="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[i][tmpAnnot]];
			    }
			    if (gestionnaireSelection[i] ==1) {
				tmpContext+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+'<span class="selectIP">'+item2+'</span>'+"</a>";
			    }
			    else {
				tmpContext+="</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
			    }
			    contentxtCIBLE+=tmpContext;
			}
			else {
			    if (gestionnaireSelection[i] ==1) {
				contentxtCIBLE+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+'<span class="selectIP">'+item2+'</span>'+"</a>";
			    }
			    else {
				contentxtCIBLE+="<a style=\"text-decoration:none\" href=\"#\" onmouseover=\"Tip('<p>Position : "+i+"<br/>(1):"+ dicNum2forme[trameForme[i][0]] + "<br/>(2):"+ dicNum2lemme[trameForme[i][1]] +"<br/>(3):"+dicNum2categorie[trameForme[i][2]]+"</p>')\" onmouseout=\"UnTip()\" rel=\""+item2+"\">"+item2+"</a>";
			    }
			}
		    }
		    else {
			if (gestionnaireSelection[i] ==1) {
			    contentxtCIBLE+='<span class="selectIP">'+item2+'</span>';
			}
			else {
			    contentxtCIBLE+=item2;
			}
		    }
		}
		else {
		    if (gestionnaireSelection[i] ==1) {item='<span class="selectIP">'+item+'</span>'};
		    contentxtCIBLE+=item;
		}
	    }
	    nbContexte=nbContexte+1;
	    table += '<tr><td>'+nbContexte+'</td><td>'+contentxtSOURCE+'</td><td>'+contentxtCIBLE+'</td></tr>';

	}
    }
    table +='</table>';
    $("#placeholder").html(table);
    $(document).ready(function() {
	$('#BICONCORDANCE').DataTable ( {
	    //order: [[ 1, "desc" ]],
	    lengthMenu: [[10, 25, 50,100, -1], [10, 25, 50,100, "All"]],
	    searchHighlight: true,
	    "destroy": true,
	    columns: [
		{title: "N°"},
		{title: "Contexte Source"},
		{title: "Contexte Cible"}
			]
	})
    });

}
