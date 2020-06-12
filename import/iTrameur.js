//----------------------------------------------------------------------------------
var FILEINPUTTOREAD = "";

var DICOTFG = new Object();
var DictionnaireSource = new Object();
var DictionnaireLemme = new Object();
var DictionnaireCategorie = new Object();
var DictionnaireAnnotation = new Object();
var DictionnaireDesRelations = new Object();
var dicForme2num = new Object();
var dicNum2forme = new Object();
var dicLemme2num = new Object();
var dicNum2lemme = new Object();
var dicCategorie2num = new Object();
var dicNum2categorie = new Object();
var dicAnnotation2num = new Object();
var dicNum2annotation = new Object();
var dictionnairedesparties=new Object();	
var dictionnairedespositionsdesrelationsentrelemmes=new Object();
var dictionnairedesfrequencesdesrelationsentrelemmes=new Object();
var positionsMaximisantlesrelations= new Array;

var annotationencours = 2;
var annotationencoursOUT = 1;
var nombredannotation=1;
var relation_annot_For_grapherelation=6;

var trameForme = new Object();
var cadre = new Object();
var positionsurlatrame=1;
var numeroapparitionsurlatrameForme=0;
var numeroapparitionsurlatrameLemme=0;
var numeroapparitionsurlatrameCategorie=0;
var numeroapparitionsurlatrameAnnotation=0;

var NBMOTTOTALSource=0;
var NBMOTSource=0;
var NBDELIMSource=0;

var PARTITION_DEFAULT="BIRTH_PLACE";
var PARTIE_DEFAULT="";

var awesomplete;
var awesompleteC;
var awesompleteSR;
var awesomplete2dependance1;
var awesomplete2dependance2;

var LISTEMOTSource=[];
var listepartieTomerge=[]; // liste pour stocker les parties à fusionner
var listepartitionTomerge=[];	// liste pour stocker les partitions à fusionner

var sendIdNumber=0;
var sendIdSelectNumber=0;

var FQmax=0;
var seuil=5;

var GrapheArborL=900;
var GrapheArborH=900;

var LISTEDESNOEUDSINCANVAS=[];
var sysArbor;
//----------------------------------------------------------------------------------
function expertCheck() {
	if (document.getElementById('expertID').checked) {
		annotationencours=nombredannotation;
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
		var x = document.getElementById('expertSpecifTotales');
		if (x.style.display === "none") {
			$('#expertSpecifTotales').show();
        
		} else {
			x.style.display = "none";
		}
		x = document.getElementById('cooccurrent');
		if (x.style.display === "none") {
			$('#cooccurrent').show();
        
		} else {
			x.style.display = "none";
		}
		x = document.getElementById('dependancylist');
		if (x.style.display === "none") {
			$('#dependancylist').show();
        
		} else {
			x.style.display = "none";
		}
		x = document.getElementById('searchRelationLemmePos');
		if (x.style.display === "none") {
			$('#searchRelationLemmePos').show();
        
		} else {
			x.style.display = "none";
		}
		x = document.getElementById('IDrelationLabel');
		if (x.style.display === "none") {
			$('#IDrelationLabel').show();
        
		} else {
			x.style.display = "none";
		}		
		x = document.getElementById('IDRelation');
		if (x.style.display === "none") {
			$('#IDRelation').show();
        
		} else {
			x.style.display = "none";
		}		
		console.log("check1 : "+annotationencours)
	}
	else {
		annotationencours=2;
		LISTEMOTSource=[];
		LISTEMOTSource= Object.keys(DictionnaireLemme).sort(function(a,b){
			return a < b ? 1 : a > b ? -1 : 0;
		});
		awesomplete.list = LISTEMOTSource;
		var x = document.getElementById('expertSpecifTotales');
		if (x.style.display === "none") {
			$('#expertSpecifTotales').show();
        
		} else {
			x.style.display = "none";
		}
		x = document.getElementById('cooccurrent');
		if (x.style.display === "none") {
			$('#cooccurrent').show();
        
		} else {
			x.style.display = "none";
		}
		x = document.getElementById('dependancylist');
		if (x.style.display === "none") {
			$('#dependancylist').show();
        
		} else {
			x.style.display = "none";
		}
		x = document.getElementById('searchRelationLemmePos');
		if (x.style.display === "none") {
			$('#searchRelationLemmePos').show();
        
		} else {
			x.style.display = "none";
		}
		x = document.getElementById('IDrelationLabel');
		if (x.style.display === "none") {
			$('#IDrelationLabel').show();
        
		} else {
			x.style.display = "none";
		}		
		x = document.getElementById('IDRelation');
		if (x.style.display === "none") {
			$('#IDRelation').show();
        
		} else {
			x.style.display = "none";
		}		

		
		
		
		console.log("check0 : "+annotationencours)
	}
	refresh();
}
//----------------------------------------------------------------------------------
String.prototype.replaceAll = function(token, newToken, ignoreCase) {
    var _token;
    var str = this + "";
    var i = -1;
    if (typeof token === "string") {
	if (ignoreCase) {
	    _token = token.toLowerCase();
	    while (
		(i = str
		 .toLowerCase()
		 .indexOf(token, i >= 0 ? i + newToken.length : 0)) !== -1
	    ) {
		str = str.substring(0, i) + newToken + str.substring(i + token.length);
	    }
	} else {
	    return this.split(token).join(newToken);
	}
    }
    return str;
};
//----------------------------------------------------------------------------------
function importUrlFile() {
    fetch("naija2test_2805.txt")
	.then(response => response.text())
	.then(function(data) {
	    FILEINPUTTOREAD = data;
	    importBase();
	});
}
//----------------------------------------------------------------------------------
function refresh() {
	refreshItrameur();
    PARTITION_DEFAULT="BIRTH_PLACE";
    PARTIE_DEFAULT="";
    var inputs = document.querySelectorAll('.form-check-input'); 
    for (var i = 0; i < inputs.length; i++) { 
        inputs[i].checked = false; 
    } 
    $('#idCheckmenuLieuBirth .collapse').collapse('hide');
    $('#idCheckmenuLieu .collapse').collapse('hide');
    $('#idCheckmenuSexe .collapse').collapse('hide');
    $('#idCheckmenuAge .collapse').collapse('hide');
    $('#idCheckmenuGenre .collapse').collapse('hide');
    $('#idCheckmenuTypeTexte .collapse').collapse('hide');
    $('#idCheckmenuCompetence .collapse').collapse('hide');	
    $('#idCheckmenuEducation .collapse').collapse('hide');	
    $('#idCheckmenuMotherTongue .collapse').collapse('hide');	
	
    var vide ='<p align="center"><img src="./images/ilovenaija.jpg"/><br/><img src="./images/itrameur-naija-welcome.png"/><br/></p>';
    $("#placeholder").html(vide);
}
//----------------------------------------------------------------------------------
function generation() {	

    refreshItrameur();
 
   // LIEU naissance
    
    var cptCheckLIEUbirth=0;
    var iflieueast = document.getElementById("lieu-east");
    if (iflieueast.checked) {cptCheckLIEUbirth++};
    var iflieunorth = document.getElementById("lieu-north");
    if (iflieunorth.checked) {cptCheckLIEUbirth++};
    var iflieusouthsouth= document.getElementById("lieu-south-south");
    if (iflieusouthsouth.checked) {cptCheckLIEUbirth++};
    var iflieuwest = document.getElementById("lieu-west");
    if (iflieuwest.checked) {cptCheckLIEUbirth++};
	
	if (cptCheckLIEUbirth == 4 ) {
		$('#collapseBody0 input:checkbox').prop('checked', false);
    };

    // LIEU enregistrement
    
    var cptCheckLIEU=0;
    var ifLAG = document.getElementById("lieu-lag");
    if (ifLAG.checked) {cptCheckLIEU++};
    var ifONI = document.getElementById("lieu-oni");
    if (ifONI.checked) {cptCheckLIEU++};
    var ifIBA = document.getElementById("lieu-iba");
    if (ifIBA.checked) {cptCheckLIEU++};
    var ifBEN = document.getElementById("lieu-ben");
    if (ifBEN.checked) {cptCheckLIEU++};
    var ifABJ = document.getElementById("lieu-abj");
    if (ifABJ.checked) {cptCheckLIEU++};
    var ifENU = document.getElementById("lieu-enu");
    if (ifENU.checked) {cptCheckLIEU++};
    var ifJOS = document.getElementById("lieu-jos");
    if (ifJOS.checked) {cptCheckLIEU++};
    var ifKAD = document.getElementById("lieu-kad");
    if (ifKAD.checked) {cptCheckLIEU++};
    var ifPRT = document.getElementById("lieu-prt");
    if (ifPRT.checked) {cptCheckLIEU++};
    var ifWAZA = document.getElementById("lieu-waza");
    if (ifWAZA.checked) {cptCheckLIEU++};
    var ifWAZK = document.getElementById("lieu-wazk");
    if (ifWAZK.checked) {cptCheckLIEU++};
    var ifWAZL = document.getElementById("lieu-wazl");
    if (ifWAZL.checked) {cptCheckLIEU++};
    var ifWAZP = document.getElementById("lieu-wazp");
    if (ifWAZP.checked) {cptCheckLIEU++};
	
	if (cptCheckLIEU == 13 ) {
		$('#collapseBody1 input:checkbox').prop('checked', false);
    };
    
    // SEX
    var cptCheckSEX=0;
    var ifF = document.getElementById("checkF");
    if (ifF.checked) {cptCheckSEX++}; 
    var ifM = document.getElementById("checkM");
    if (ifM.checked) {cptCheckSEX++};
    if (cptCheckSEX == 2 ) {
		$('#collapseBody2 input:checkbox').prop('checked', false);
    };
    // AGE
    var cptCheckAGE=0;
    var if15 = document.getElementById("check15");
    if (if15.checked) {cptCheckAGE++}; 
    var if30 = document.getElementById("check30");
    if (if30.checked) {cptCheckAGE++}; 
    var if45 = document.getElementById("check45");
    if (if45.checked) {cptCheckAGE++}; 
    var if60 = document.getElementById("check60");
    if (if60.checked) {cptCheckAGE++}; 
    if (cptCheckAGE == 4 ) {
		$('#collapseBody3 input:checkbox').prop('checked', false);
    };
	// TYPE TEXTE
	var cptCheckTYPETEXTE=0;
	var ifdrama= document.getElementById("Drama");
	if (ifdrama.checked) {cptCheckTYPETEXTE++}; 
	var ifformalconversation= document.getElementById("Formalconversation");
	if (ifformalconversation.checked) {cptCheckTYPETEXTE++}; 
	var ifinformalconversation= document.getElementById("Informalconversation");
	if (ifinformalconversation.checked) {cptCheckTYPETEXTE++}; 
	var ifopinion= document.getElementById("Opinion");
	if (ifopinion.checked) {cptCheckTYPETEXTE++}; 
	var ifpersuasionandinstruction= document.getElementById("Persuasionandinstruction");
	if (ifpersuasionandinstruction.checked) {cptCheckTYPETEXTE++}; 
	var ifradioconversation= document.getElementById("Radioconversation");
	if (ifradioconversation.checked) {cptCheckTYPETEXTE++}; 
	var ifradiomonologues= document.getElementById("Radiomonologues");
	if (ifradiomonologues.checked) {cptCheckTYPETEXTE++}; 
	var ifradioreadingnews= document.getElementById("Radioreadingnews");
	if (ifradioreadingnews.checked) {cptCheckTYPETEXTE++}; 
	var ifreligion= document.getElementById("Religion");
	if (ifreligion.checked) {cptCheckTYPETEXTE++}; 
	var ifstorytelling= document.getElementById("Storytelling");
	if (ifstorytelling.checked) {cptCheckTYPETEXTE++}; 
	if (cptCheckTYPETEXTE == 10 ) {
		$('#collapseBody4 input:checkbox').prop('checked', false);
	};
	
    // GENRE
    var cptCheckGENRE=0;
    var ifDialogue = document.getElementById("genred");
    if (ifDialogue.checked) {cptCheckGENRE++}; 
    var ifMonologue= document.getElementById("genrem");
    if (ifMonologue.checked) {cptCheckGENRE++}; 
    var ifgenreT= document.getElementById("genret");
    if (ifgenreT.checked) {cptCheckGENRE++}; 
    if (cptCheckGENRE == 3 ) {
		$('#collapseBody5 input:checkbox').prop('checked', false);
    };
    // COMPETENCE
    var cptCheckCOMPTENCE=0;
    var ifCOMPM = document.getElementById("COMPETENCEm");
    if (ifCOMPM.checked) {cptCheckCOMPTENCE++}; 
    var ifCOMPS = document.getElementById("COMPETENCEs");
    if (ifCOMPS.checked) {cptCheckCOMPTENCE++}; 
    var ifCOMPW = document.getElementById("COMPETENCEw");
    if (ifCOMPW.checked) {cptCheckCOMPTENCE++}; 
    var ifCOMPWW = document.getElementById("COMPETENCEww");
    if (ifCOMPWW.checked) {cptCheckCOMPTENCE++}; 
    var ifCOMPX = document.getElementById("COMPETENCEx");
    if (ifCOMPX.checked) {cptCheckCOMPTENCE++}; 

    if (cptCheckCOMPTENCE == 5 ) {
		$('#collapseBody6 input:checkbox').prop('checked', false);
    };
	
   // EDUCATION
    var cptCheckEDUCATION=0;
    var ifEDUCATIONp = document.getElementById("EDUCATIONp");
    if (ifEDUCATIONp.checked) {cptCheckEDUCATION++}; 
    var ifEDUCATIONs = document.getElementById("EDUCATIONs");
    if (ifEDUCATIONs.checked) {cptCheckEDUCATION++}; 
    var ifEDUCATIONu = document.getElementById("EDUCATIONu");
    if (ifEDUCATIONu.checked) {cptCheckEDUCATION++}; 
 
    if (cptCheckEDUCATION == 3 ) {
		$('#collapseBody7 input:checkbox').prop('checked', false);
   };
   
   
    // LANGUE MATERNELLE
    var cptCheckLANGUEMATERNELLE=0;
    var ifLANGUEMATERNELLEe = document.getElementById("mothertongueEnglish");
    if (ifLANGUEMATERNELLEe.checked) {cptCheckLANGUEMATERNELLE++}; 
    var ifLANGUEMATERNELLEy = document.getElementById("mothertongueYoruba");
    if (ifLANGUEMATERNELLEy.checked) {cptCheckLANGUEMATERNELLE++}; 
    var ifLANGUEMATERNELLEi = document.getElementById("mothertongueIgbo");
    if (ifLANGUEMATERNELLEi.checked) {cptCheckLANGUEMATERNELLE++}; 
    var ifLANGUEMATERNELLEh = document.getElementById("mothertongueHausa");
    if (ifLANGUEMATERNELLEh.checked) {cptCheckLANGUEMATERNELLE++}; 
    var ifLANGUEMATERNELLEo = document.getElementById("mothertongueOther");
    if (ifLANGUEMATERNELLEo.checked) {cptCheckLANGUEMATERNELLE++}; 
 
    if (cptCheckLANGUEMATERNELLE == 5 ) {
		$('#collapseBody8 input:checkbox').prop('checked', false);
   };
  
   
   
	
    //-----------------------------------
	// on stocke les partitions et les parties induites par les checks
    listepartieTomerge=[];  
	listepartitionTomerge=[];	
    //-----------------------------------
	
    if (iflieueast.checked || iflieunorth.checked || iflieusouthsouth.checked|| iflieuwest.checked) {
		listepartitionTomerge.push("BIRTH_PLACE");
		listepartieTomerge["BIRTH_PLACE"]=[];
		if (iflieueast.checked) {listepartieTomerge["BIRTH_PLACE"].push("East")}; 
		if (iflieunorth.checked) {listepartieTomerge["BIRTH_PLACE"].push("North")}; 
		if (iflieusouthsouth.checked) {listepartieTomerge["BIRTH_PLACE"].push("South-South")}; 
		if (iflieuwest.checked) {listepartieTomerge["BIRTH_PLACE"].push("West")}; 
    };	
	
	
	if (ifLAG.checked || ifONI.checked || ifIBA.checked || ifBEN.checked || ifABJ.checked || ifENU.checked || ifJOS.checked || ifKAD.checked || ifPRT.checked || ifWAZA.checked || ifWAZK.checked || ifWAZL.checked || ifWAZP.checked) {
		listepartitionTomerge.push("LOC");
		listepartieTomerge["LOC"]=[];
		if (ifLAG.checked) {listepartieTomerge["LOC"].push("LAG")};
		if (ifONI.checked) {listepartieTomerge["LOC"].push("ONI")};
		if (ifIBA.checked) {listepartieTomerge["LOC"].push("IBA")};
		if (ifBEN.checked) {listepartieTomerge["LOC"].push("BEN")};
		if (ifABJ.checked) {listepartieTomerge["LOC"].push("ABJ")};
		if (ifENU.checked) {listepartieTomerge["LOC"].push("ENU")};
		if (ifJOS.checked) {listepartieTomerge["LOC"].push("JOS")};
		if (ifKAD.checked) {listepartieTomerge["LOC"].push("KAD")};
		if (ifPRT.checked) {listepartieTomerge["LOC"].push("PRT")};
		if (ifWAZA.checked) {listepartieTomerge["LOC"].push("WAZA")};
		if (ifWAZK.checked) {listepartieTomerge["LOC"].push("WAZK")};
		if (ifWAZL.checked) {listepartieTomerge["LOC"].push("WAZL")};
		if (ifWAZP.checked) {listepartieTomerge["LOC"].push("WAZP")};  
    };
    if (ifF.checked || ifM.checked ) {
		listepartitionTomerge.push("SEX");
		listepartieTomerge["SEX"]=[];
		if (ifF.checked) {listepartieTomerge["SEX"].push("F")}; 
		if (ifM.checked) {listepartieTomerge["SEX"].push("M")}; 
    };
    if (if15.checked || if30.checked || if45.checked || if60.checked ) {
		listepartitionTomerge.push("AGE");
		listepartieTomerge["AGE"]=[];
		if (if15.checked) {listepartieTomerge["AGE"].push("-15")}; 
		if (if30.checked) {listepartieTomerge["AGE"].push("16-30")}; 
		if (if45.checked) {listepartieTomerge["AGE"].push("31-45")}; 
		if (if60.checked) {listepartieTomerge["AGE"].push("46-60")}; 
    };
	
	
	if (ifdrama.checked || ifformalconversation.checked || ifinformalconversation.checked || ifopinion.checked || ifpersuasionandinstruction.checked || ifradioconversation.checked || ifradiomonologues.checked || ifradioreadingnews.checked || ifreligion.checked || ifstorytelling.checked ) {
		listepartitionTomerge.push("TYPETEXTE");
		listepartieTomerge["TYPETEXTE"]=[];
		if (ifdrama.checked) {listepartieTomerge["TYPETEXTE"].push("drama")}; 
		if (ifformalconversation.checked) {listepartieTomerge["TYPETEXTE"].push("formal_conversation")}; 
		if (ifinformalconversation.checked) {listepartieTomerge["TYPETEXTE"].push("informal_conversation")}; 
		if (ifopinion.checked) {listepartieTomerge["TYPETEXTE"].push("opinion")}; 
		if (ifpersuasionandinstruction.checked) {listepartieTomerge["TYPETEXTE"].push("persuasion_and_instruction")}; 
		if (ifradioconversation.checked) {listepartieTomerge["TYPETEXTE"].push("radio_-_conversation")}; 
		if (ifradiomonologues.checked) {listepartieTomerge["TYPETEXTE"].push("radio_-_monologues")}; 
		if (ifradioreadingnews.checked) {listepartieTomerge["TYPETEXTE"].push("radio_-_reading_news")}; 
		if (ifreligion.checked) {listepartieTomerge["TYPETEXTE"].push("religion")}; 
		if (ifstorytelling.checked) {listepartieTomerge["TYPETEXTE"].push("storytelling")}; 
	};
	
    if (ifDialogue.checked || ifMonologue.checked || ifgenreT.checked) {
		listepartitionTomerge.push("GENRE");
		listepartieTomerge["GENRE"]=[];
		if (ifDialogue.checked) {listepartieTomerge["GENRE"].push("Dialogue")}; 
		if (ifMonologue.checked) {listepartieTomerge["GENRE"].push("Monologue")}; 
		if (ifgenreT.checked) {listepartieTomerge["GENRE"].push("T")}; 
    };
	if (ifCOMPM.checked || ifCOMPS.checked || ifCOMPW.checked || ifCOMPWW.checked || ifCOMPX.checked ) {
		listepartitionTomerge.push("COMPETENCE");
		listepartieTomerge["COMPETENCE"]=[];
		if (ifCOMPM.checked) {listepartieTomerge["COMPETENCE"].push("M")}; 
		if (ifCOMPS.checked) {listepartieTomerge["COMPETENCE"].push("S")}; 
		if (ifCOMPW.checked) {listepartieTomerge["COMPETENCE"].push("W")}; 
		if (ifCOMPWW.checked) {listepartieTomerge["COMPETENCE"].push("WW")}; 
		if (ifCOMPX.checked) {listepartieTomerge["COMPETENCE"].push("X")}; 
    };
	
	if (ifEDUCATIONp.checked || ifEDUCATIONs.checked || ifEDUCATIONu.checked ) {
		listepartitionTomerge.push("EDUCATION");
		listepartieTomerge["EDUCATION"]=[];
		if (ifEDUCATIONp.checked) {listepartieTomerge["EDUCATION"].push("Primary")}; 
		if (ifEDUCATIONs.checked) {listepartieTomerge["EDUCATION"].push("Secondary")}; 
		if (ifEDUCATIONu.checked) {listepartieTomerge["EDUCATION"].push("University")}; 
    };
	
	
	
	if (ifLANGUEMATERNELLEe.checked || ifLANGUEMATERNELLEy.checked || ifLANGUEMATERNELLEi.checked || ifLANGUEMATERNELLEh.checked|| ifLANGUEMATERNELLEo.checked) {
		listepartitionTomerge.push("MOTHER_TONGUE");
		listepartieTomerge["MOTHER_TONGUE"]=[];
		if (ifLANGUEMATERNELLEe.checked) {listepartieTomerge["MOTHER_TONGUE"].push("English")}; 
		if (ifLANGUEMATERNELLEy.checked) {listepartieTomerge["MOTHER_TONGUE"].push("Yoruba")}; 
		if (ifLANGUEMATERNELLEi.checked) {listepartieTomerge["MOTHER_TONGUE"].push("Igbo")}; 
		if (ifLANGUEMATERNELLEh.checked) {listepartieTomerge["MOTHER_TONGUE"].push("Hausa")}; 
		if (ifLANGUEMATERNELLEo.checked) {listepartieTomerge["MOTHER_TONGUE"].push("Other")}; 
    };

	
	//------------------------------------------------------------
	// on va construire la partition à utiliser pour les spécifs
	//-------------------------------------------------------------
    console.log("listepartitionTomerge : "+listepartitionTomerge);
    var NEWPARTITION="";
	var partie="";
    if (listepartitionTomerge.length >= 2) {
		var firtPartition = listepartitionTomerge.shift(); 
		var secondPartition = listepartitionTomerge.shift(); 
		NEWPARTITION = firtPartition + "_" + secondPartition;
		var namespartiesDansPartie1 = listepartieTomerge[firtPartition].join("_");
		var namespartiesDansPartie2 = listepartieTomerge[secondPartition].join("_");
		partie=namespartiesDansPartie1+"_"+namespartiesDansPartie2;
		// il faut tester si on n'a pas dejà croisé ces 2 partitions ??
		//if (cadre[NEWPARTITION] === undefined) {
			makeNewPartition(firtPartition, secondPartition);
		//}
		console.log("NEWPARTITION : "+NEWPARTITION);
		while (listepartitionTomerge.length > 0) {
			var NextPartition = listepartitionTomerge.shift(); 
			var NEWPARTITION1 = NEWPARTITION + "_" + NextPartition;
            console.log("NEWPARTITION1 : "+NEWPARTITION1);
			partie=partie+"_"+listepartieTomerge[NextPartition].join("_");
            console.log("partie : "+partie);
			//if (cadre[NEWPARTITION1] === undefined) {
				makeNewPartition(NEWPARTITION, NextPartition);
			//}
			NEWPARTITION=NEWPARTITION1;
			console.log("NEWPARTITION : "+NEWPARTITION);
		}
    }
    else if (listepartitionTomerge.length == 1) {
		var firtPartition = listepartitionTomerge.shift();
		NEWPARTITION = firtPartition;
		// ATTENTION IL FAUT FAIRE QUELQUE CHOSE !!!!!!
        if (listepartieTomerge[firtPartition].length > 0) {
            var partiesDansPartie1=listepartieTomerge[firtPartition];
			//console.log("partiesDansPartie1 : "+partiesDansPartie1);
            var namespartiesDansPartie1 = partiesDansPartie1.join("_");
			//console.log("namespartiesDansPartie1 : "+namespartiesDansPartie1);
            var listedespositionsdanspartie1=[];
			//console.log("listedespositionsdanspartie1 : "+listedespositionsdanspartie1);
            for (var j=0;j<partiesDansPartie1.length;j++) {
                //listedespositionsdanspartie1.push(cadre[partie1][partiesDansPartie1[j]])
				if (!(cadre[firtPartition][partiesDansPartie1[j]] === undefined)) {
                listedespositionsdanspartie1=listedespositionsdanspartie1.concat(cadre[firtPartition][partiesDansPartie1[j]]);
				//console.log("listedespositionsdanspartie1 : "+listedespositionsdanspartie1);
				}
            }
			//console.log("FINAL listedespositionsdanspartie1 : "+listedespositionsdanspartie1);
            cadre[firtPartition][namespartiesDansPartie1]=listedespositionsdanspartie1;
            partie=listepartieTomerge[firtPartition].join("_");
        }
        else {
            partie=listepartieTomerge[firtPartition].join("_");
        }
         
    }
    else if (listepartitionTomerge.length == 0) {
		var vide="<span id='alert2'>... il faut sélectionner au moins une facette...</span>";
		$("#placeholder").html(vide);
		PARTITION_DEFAULT="BIRTH_PLACE";
		
    $('#idCheckmenuLieuBirth .collapse').collapse('hide');
    $('#idCheckmenuLieu .collapse').collapse('hide');
    $('#idCheckmenuSexe .collapse').collapse('hide');
    $('#idCheckmenuAge .collapse').collapse('hide');
    $('#idCheckmenuGenre .collapse').collapse('hide');
    $('#idCheckmenuTypeTexte .collapse').collapse('hide');
    $('#idCheckmenuCompetence .collapse').collapse('hide');	
    $('#idCheckmenuEducation .collapse').collapse('hide');	
    $('#idCheckmenuMotherTongue .collapse').collapse('hide');	

		return;
    }
    else {
		return
	}
	if (NEWPARTITION=="") {
		PARTITION_DEFAULT="BIRTH_PLACE";
		return;
	}
	else {
			PARTITION_DEFAULT=NEWPARTITION;
	}
    //specifsTotalesParties(NEWPARTITION);
    PARTIE_DEFAULT=partie; 
    console.log("NEWPARTITION Finale : "+NEWPARTITION);
    console.log("PARTIE Finale : "+partie);   
	
    $('#idCheckmenuLieuBirth .collapse').collapse('hide');
    $('#idCheckmenuLieu .collapse').collapse('hide');
    $('#idCheckmenuSexe .collapse').collapse('hide');
    $('#idCheckmenuAge .collapse').collapse('hide');
    $('#idCheckmenuGenre .collapse').collapse('hide');
    $('#idCheckmenuTypeTexte .collapse').collapse('hide');
    $('#idCheckmenuCompetence .collapse').collapse('hide');	
    $('#idCheckmenuEducation .collapse').collapse('hide');	
    $('#idCheckmenuMotherTongue .collapse').collapse('hide');	

    specifsPartie(NEWPARTITION, partie);
}
//------------------------------------------------------------------------------------------
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
function makeNewPartition(partie1, partie2) { 
    var newPartie=partie1+"_"+partie2;
    cadre[newPartie]=new Object();
	var partiesDansPartie1=listepartieTomerge[partie1];
	//console.log("partiesDansPartie1: "+ partiesDansPartie1);
	var namespartiesDansPartie1 = partiesDansPartie1.join("_");
	//console.log("Parties1 name : "+ namespartiesDansPartie1);
	var partiesDansPartie2=listepartieTomerge[partie2];
	//console.log("partiesDansPartie2: "+ partiesDansPartie2);
	var namespartiesDansPartie2 = partiesDansPartie2.join("_");
	//console.log("Parties2 name : "+ namespartiesDansPartie2);
	var listedespositionsdanspartie1=[];
	var listedespositionsdanspartie2=[];
	for (var j=0;j<partiesDansPartie1.length;j++) {
		//listedespositionsdanspartie1.push(cadre[partie1][partiesDansPartie1[j]])
		if (!(cadre[partie1][partiesDansPartie1[j]] === undefined)) { 
			listedespositionsdanspartie1=listedespositionsdanspartie1.concat(cadre[partie1][partiesDansPartie1[j]]);
		}
	}
	//console.log("listedespositionsdanspartie1 : "+ listedespositionsdanspartie1);
	for (var j=0;j<partiesDansPartie2.length;j++) {
		if (!(cadre[partie2][partiesDansPartie2[j]] === undefined)) { 
			listedespositionsdanspartie2=listedespositionsdanspartie2.concat(cadre[partie2][partiesDansPartie2[j]]);
		}
	}
	//console.log("listedespositionsdanspartie2 : "+ listedespositionsdanspartie2);
	for (var k=0;k<(listedespositionsdanspartie1.length);k=k+2) {
		var deb1 = listedespositionsdanspartie1[k];
		var tmpk1=k+1;
		var fin1 = listedespositionsdanspartie1[tmpk1];
		for (var q=0;q<(listedespositionsdanspartie2.length);q=q+2) {
			var deb2 = listedespositionsdanspartie2[q];
			var tmpk2=q+1;
			var fin2 = listedespositionsdanspartie2[tmpk2];
			// inutile de faire la suite si pas nécessaire
			//console.log("on compare deb1:"+deb1+" fin1:"+fin1+" et deb2:"+deb2+" fin2:"+fin2 );
			if (((deb1 <= deb2) && (deb2 <= fin1)) || ((deb1 <= fin2) && (fin2 <= fin1)) || ((deb2 <= deb1) && (deb1 <= fin2))) { 
				//--------------------------------------------------------------------------
				var LISTE1=range(deb1,fin1);
				var LISTE2=range(deb2,fin2);
				var INTER=intersect(LISTE1,LISTE2);
				if (INTER.length > 0) {
					var newPartieName=namespartiesDansPartie1+"_"+namespartiesDansPartie2;
                    listepartieTomerge[newPartie]=[];
                    listepartieTomerge[newPartie].push(newPartieName);
					dictionnairedesparties[newPartie]=1;
					if (!($.isArray(cadre[newPartie][newPartieName]))) {
						cadre[newPartie][newPartieName]=[];
						cadre[newPartie][newPartieName].push(INTER[0],INTER[INTER.length-1]);
					}
					else {
						cadre[newPartie][newPartieName].push(INTER[0],INTER[INTER.length-1]);
					}
					//console.log("==>Nouvelle partie : "+ newPartie+" : "+newPartieName);
				}
			}
			//-----------------------------------------------------------------------------
		}
    }
    return 0;
}
//----------------------------------------------------------------------------------
function precise_round(num, decimals) {
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
}
//----------------------------------------------------------------------------------
function LogFac(n) {
  if (n > 33) {
    return (
      n * Math.log(n) -
      n +
      Math.log(2 * 3.141592653589793 * n) / 2 +
      1 / (12 * n)
    );
  }
  var z = 1;
  for (var i = 2; i <= n; i++) {
    z = z * i;
  }
  return Math.log(z);
}
//----------------------------------------------------------------------------------
function HyperG(T, t, F, f) {
  var z, z1, z2, z3, z4, z5, z6, z7;
  z1 = LogFac(T);
  z2 = LogFac(T - t);
  z3 = LogFac(t);
  z4 = LogFac(T - F);
  z5 = LogFac(F);
  z6 = z4 - z1;
  z7 = z6 + z2;
  z = z7 - LogFac(T - F - t + f);
  if (f == 0) {
    return Math.exp(z);
  }
  z = z + z5 + z3 - LogFac(f) - LogFac(F - f) - LogFac(t - f);
  return Math.exp(z);
}
//----------------------------------------------------------------------------------
function CalcCoeffSpec(T, t, F, f, seuilS, fffffff) {
  if (f > t || F > T) {
    return 0;
  }
  var positif = 1;
  var zn;
  var p;
  var pp = 0;
  var coeff;
  pp = HyperG(T, t, F, f);
  seuilS = seuilS / 100;
  if (pp > seuilS) {
    return 0;
  }
  p = pp;
  if (f < ((F + 1) * (t + 1)) / (T + 2)) {
    positif = 0;
    for (zn = f; zn > 0; zn--) {
      p = (p * zn * (T - F - t + zn)) / ((F - zn + 1) * (t - zn + 1));
      pp += p;
      if (pp > seuilS) {
        return 0;
      }
      if (p < 0.0000000001) {
        break;
      }
    }
  } else {
    for (zn = f; zn < F; zn++) {
      p = (p * (F - zn) * (t - zn)) / ((zn + 1) * (T - F - t + zn + 1));
      pp += p;
      if (pp > seuilS) {
        return 0;
      }
      if (p < 0.0000000001) {
        break;
      }
    }
  }
  /* MODIF MARS 2017 
    if (pp > 0) { */
  coeff = Math.log(pp) / Math.log(10) - 1;
  if (positif == 1) {
    coeff = coeff * -1;
  }
  /*}*/
  return coeff;
}
//----------------------------------------------------------------------------------
function importBase() {
	
	refreshItrameur();
    sendIdNumber=0;
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
    NBMOTTOTALSource = 0;
    NBMOTSource = 0;
    NBDELIMSource = 0;
    numeroapparitionsurlatrameForme = 0;
    numeroapparitionsurlatrameLemme = 0;
    numeroapparitionsurlatrameCategorie = 0;
    numeroapparitionsurlatrameAnnotation = 0;
    positionsurlatrame = 1;
    trameForme = new Object();
    Dicodeslabelsdescolonnes = [];
    gestionnaireSelection = new Object();
    lastOpenBaliseSurTrame = new Object();
    listeBaliseSurTrame = new Object();
    cadre = new Object();
    dictionnairedesparties = new Object();
    var vide =
	'<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:#FDBBD2">Calcul en cours</span></small>';
    $("#placeholder").html(vide);
    /*----------------------------------------------------*/
    var allLines = FILEINPUTTOREAD;
    var arrayOfLines = allLines.split("\n");
    for (var nblines = 0; nblines < arrayOfLines.length; nblines++) {
	var contentxt = arrayOfLines[nblines];
	contentxt = contentxt.replaceAll("\r", "");
	// recherche label colonnes
	if (
	    contentxt.search(/^#[^\t]+\t#[^\t]+\t#[^\t]+\t#[^\t]+\t#[^\t]+/) != -1
	) {
	    var LISTELABEL = contentxt.split("\t");
	    Dicodeslabelsdescolonnes.push("Forme");
	    Dicodeslabelsdescolonnes.push("Lemme");
	    Dicodeslabelsdescolonnes.push("POS");
	    if (LISTELABEL.length > 4) {
		for (var nbAnnot = 5; nbAnnot < LISTELABEL.length; nbAnnot++) {
		    var tmplabel = LISTELABEL[nbAnnot];
		    tmplabel = tmplabel.replaceAll("#", "");
		    Dicodeslabelsdescolonnes.push(tmplabel);
		}
	    }
	}
	// recherche items
	if (contentxt.search(/^[^#\t]+\t[^\t]+\t[^\t]+\t[^\t]+\t[^\t]+/) != -1) {
	    var LISTEDEMOTS = contentxt.split("\t");
	    var pos = LISTEDEMOTS.shift();
	    var type = LISTEDEMOTS.shift();
	    var forme = LISTEDEMOTS.shift();
	    if (forme == "RETURN") {
			forme = "\n";
	    }
	    if (forme == "TABULATION") {
			forme = "\t";
	    }
	    var categorie = LISTEDEMOTS.shift();
	    if (categorie == "DELIM") {
			categorie = forme;
	    }
	    if (categorie == "RETURN") {
			categorie = "\n";
	    }
	    if (categorie == "BLANK") {
			categorie = " ";
	    }
	    if (categorie == "TABULATION") {
			categorie = "\t";
	    }
	    var lemme = LISTEDEMOTS.shift();
	    if (lemme == "DELIM") {
			lemme = forme;
	    }
	    if (lemme == "RETURN") {
			lemme = "\n";
	    }
	    if (lemme == "TABULATION") {
			lemme = "\t";
	    }
	    if (lemme == "BLANK") {
			lemme = " ";
	    }
		// pour le mode expert ---------------------------------------------
		var newannot=lemme+"_"+categorie;
		LISTEDEMOTS.push(newannot);		
	    // le reste sont les annotation complémentaires traitees infra....
	    nombredannotation = 3 + LISTEDEMOTS.length;
		DictionnaireDesRelations[LISTEDEMOTS[3]]=1;
	    //---------------------------------------------------------------------------------
	    //alert("TYPE:"+type+"|POS:"+pos+"|FORME:"+forme+"|LEMME:"+lemme+"|CAT:"+categorie);
	    if (type == "delim") {
			NBDELIMSource += 1;
			if (dictionnairedesdelims[forme] === undefined) {
				dictionnairedesdelims[forme] = 1;
			} else {
				dictionnairedesdelims[forme] = dictionnairedesdelims[forme] + 1;
			}
			if (!(forme in dicForme2num)) {
				numeroapparitionsurlatrameForme++;
				dicForme2num[forme] = numeroapparitionsurlatrameForme;
				dicNum2forme[numeroapparitionsurlatrameForme] = forme;
			}
			if (!(lemme in dicLemme2num)) {
				numeroapparitionsurlatrameLemme++;
				dicLemme2num[lemme] = numeroapparitionsurlatrameLemme;
				dicNum2lemme[numeroapparitionsurlatrameLemme] = lemme;
			}
			if (!(categorie in dicCategorie2num)) {
				numeroapparitionsurlatrameCategorie++;
				dicCategorie2num[categorie] = numeroapparitionsurlatrameCategorie;
				dicNum2categorie[numeroapparitionsurlatrameCategorie] = categorie;
			}
			for (var nbAnnot = 0; nbAnnot < LISTEDEMOTS.length; nbAnnot++) {
				var annot = LISTEDEMOTS[nbAnnot];
				if (!(annot in dicAnnotation2num)) {
				numeroapparitionsurlatrameAnnotation++;
				dicAnnotation2num[annot] = numeroapparitionsurlatrameAnnotation;
				dicNum2annotation[numeroapparitionsurlatrameAnnotation] = annot;
				}
			}
	    }
	    if (type == "forme") {
			//if (forme == "length") {forme=forme+"\032"};
			//if (forme == "length") {forme=forme+"⠀"};  // attention caractère spécial invisible...
			//-------------------------------------------------------------------------------------
			// BUG CONSTRUCTOR
			forme = new String(forme);
			if (forme == "constructor") {forme=forme+"⠀"}; //{forme = "Constructor";}
			if (forme == "length") {forme=forme+"⠀"}; //{forme = "Constructor";}
			//if (forme == "dat") {forme=forme+"⠀"}; //{forme = "Constructor";}
			//-------------------------------------------------------------------------------------
			if (!(forme in dicForme2num)) {
				numeroapparitionsurlatrameForme++;
				dicForme2num[forme] = numeroapparitionsurlatrameForme;
				dicNum2forme[numeroapparitionsurlatrameForme] = forme;
			}
			NBMOTTOTALSource++;
			if (DictionnaireSource[forme] === undefined) {
				DictionnaireSource[forme] = 1;
				NBMOTSource += 1;
			} 
			else {
				DictionnaireSource[forme] = DictionnaireSource[forme] + 1;
			}
			//if (lemme == "length") {lemme=lemme+"\032"};
			//if (lemme == "length") {lemme=lemme+"⠀"};  // attention caractère spécial invisible...
			//-------------------------------------------------------------------------------------
			// BUG CONSTRUCTOR
			lemme = new String(lemme);
			if (lemme == "constructor") {lemme=lemme+"⠀"}; //{lemme = "Constructor";}
			if (lemme == "length") {lemme=lemme+"⠀"}; //{lemme = "Constructor";}
			//if (lemme == "dat") {lemme=lemme+"⠀"}; //{lemme = "Constructor";}
			//-------------------------------------------------------------------------------------
			if (!(lemme in dicLemme2num)) {
				numeroapparitionsurlatrameLemme++;
				dicLemme2num[lemme] = numeroapparitionsurlatrameLemme;
				dicNum2lemme[numeroapparitionsurlatrameLemme] = lemme;
			}
			if (DictionnaireLemme[lemme] === undefined) {
				DictionnaireLemme[lemme] = 1;
			} else {
				DictionnaireLemme[lemme] = DictionnaireLemme[lemme] + 1;
			}
			if (!(categorie in dicCategorie2num)) {
				numeroapparitionsurlatrameCategorie++;
				dicCategorie2num[categorie] = numeroapparitionsurlatrameCategorie;
				dicNum2categorie[numeroapparitionsurlatrameCategorie] = categorie;
			}
			if (DictionnaireCategorie[categorie] === undefined) {
				DictionnaireCategorie[categorie] = 1;
			} else {
				DictionnaireCategorie[categorie] =
				DictionnaireCategorie[categorie] + 1;
			}
			for (var nbAnnot = 0; nbAnnot < LISTEDEMOTS.length; nbAnnot++) {
				var annot = LISTEDEMOTS[nbAnnot];
				if (!(annot in dicAnnotation2num)) {
					numeroapparitionsurlatrameAnnotation++;
					dicAnnotation2num[annot] = numeroapparitionsurlatrameAnnotation;
					dicNum2annotation[numeroapparitionsurlatrameAnnotation] = annot;
				}
			}
			//------------------------------------------------------------------
			for (var nbAnnot = 0; nbAnnot < LISTEDEMOTS.length; nbAnnot++) {
				var nbAnnot2insert = 3 + nbAnnot + 1;
				var identAnnot = nbAnnot2insert + "//" + LISTEDEMOTS[nbAnnot];
				if (DictionnaireAnnotation[identAnnot] === undefined) {
				DictionnaireAnnotation[identAnnot] = 1;
				} else {
					DictionnaireAnnotation[identAnnot] =
					DictionnaireAnnotation[identAnnot] + 1;
				}
			}
	    }
	    // A verifier...
	    if (forme == "\n") {
		dicForme2num["\n"] = -1;
		dicNum2forme[-1] = "\n";
	    }
	    trameForme[positionsurlatrame] = [];
	    trameForme[positionsurlatrame].push(
			dicForme2num[forme],
			dicLemme2num[lemme],
			dicCategorie2num[categorie]
	    );
	    for (var nbAnnot = 0; nbAnnot < LISTEDEMOTS.length; nbAnnot++) {
			trameForme[positionsurlatrame].push(
		    dicAnnotation2num[LISTEDEMOTS[nbAnnot]]
			);
	    }
	    //alert(trameForme[positionsurlatrame]);
	    positionsurlatrame++;
	}
	if (
	    contentxt.search(
		    /^PARTITION:[^\t]+\tPARTIE:[^\t]+\tDEBUT:[^\t]+\tFIN:[^\t]+$/
	    ) != -1
	) {
	    var LISTEDEMOTS = contentxt.split("\t");
	    var tmpartition = LISTEDEMOTS[0];
	    tmpartition = tmpartition.replace("PARTITION:", "");
	    //-------------------------------------------
	    if (tmpartition=="TEXTE") {sendIdNumber++};
	    //-------------------------------------------
	    var tmpartie = LISTEDEMOTS[1];
	    tmpartie = tmpartie.replace("PARTIE:", "");
	    var tmpdeb = LISTEDEMOTS[2];
	    tmpdeb = tmpdeb.replace("DEBUT:", "");
	    var tmpfin = LISTEDEMOTS[3];
	    tmpfin = tmpfin.replace("FIN:", "");
	    tmpdeb = Number(tmpdeb);
	    tmpfin = Number(tmpfin);
	    if (dictionnairedesparties[tmpartition] === undefined) {
		dictionnairedesparties[tmpartition] = 1;
	    }
	    if (cadre[tmpartition] === undefined) {
		cadre[tmpartition] = new Object();
		cadre[tmpartition][tmpartie] = [];
		cadre[tmpartition][tmpartie].push(tmpdeb, tmpfin);
	    } else {
		if (!$.isArray(cadre[tmpartition][tmpartie])) {
		    cadre[tmpartition][tmpartie] = [];
		    cadre[tmpartition][tmpartie].push(tmpdeb, tmpfin);
		} else {
		    cadre[tmpartition][tmpartie].push(tmpdeb, tmpfin);
		}
	    }
	}
    }
    
    var PARTITION = PARTITION_DEFAULT;
    // inutile ? --------------------------------------------
    var listePartie2add = Object.keys(dictionnairedesparties);
    var LISTESDESPARTIES = Object.keys(cadre[PARTITION]);
    var LISTEDELIMSource = Object.keys(dictionnairedesdelims);
    //--------------------------------------------
    // ajout du dico pour la suggestion automatique dans le pole
    var input = document.getElementById("poleID");
    awesomplete = new Awesomplete(input);
    LISTEMOTSource=[];
    LISTEMOTSource= Object.keys(DictionnaireLemme).sort(function(a,b){
	return a < b ? 1 : a > b ? -1 : 0;
    });
    awesomplete.list = LISTEMOTSource;
    //--------------------------------------------
	var LISTERELATIONS=Object.keys(DictionnaireDesRelations).sort(function(a,b){
			return a > b ? 1 : a < b ? -1 : 0;
		});
	//console.log("RELATION : "+LISTERELATIONS);
	// A DEBRIDER....
	//LISTERELATIONS.unshift("ANY");
	//..........

	$('#IDRelation option').remove();
	$('#IDRelation').append( '<option value="ANY">ANY</option>' );
	for (var i = 0; i < LISTERELATIONS.length; i++) { 
		if ((LISTERELATIONS[i] != "_") && (LISTERELATIONS[i].toUpperCase().search("ROOT") == -1) && (LISTERELATIONS[i].toUpperCase().search("PUNCT") == -1))  {
		$('#IDRelation').append( '<option value="'+LISTERELATIONS[i].toUpperCase()+'">'+LISTERELATIONS[i].toUpperCase()+'</option>' );
		}
	}
	//--------------------------------------------
    console.log("Nombre de send_id : "+ sendIdNumber);
    specifsTotalesParties(PARTITION);
    getLanguage();
}
//----------------------------------------------------------------------------------
function concordance() {
    refreshItrameur();
    var lgcontexte = document.getElementById("lgcontexteID").value;
    if (lgcontexte == "") {
	document.getElementById("lgcontexteID").value = 10;
	lgcontexte=10;
    }
    var DictionnaireDesItems = new Object();
    var DictionnaireNumDesItems = new Object();
    var DictionnaireDesItemsOut = new Object();
    var DictionnaireNumDesItemsOut = new Object();
    if (nombredannotation > 1) {
	if (annotationencours == 1) {
	    DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
	    DictionnaireNumDesItems = jQuery.extend({}, dicNum2forme);
	    if (annotationencours != annotationencoursOUT) {
		if (annotationencoursOUT == 2) {
		    DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireLemme);
		    DictionnaireNumDesItemsOut = jQuery.extend({}, dicNum2lemme);
		}
		if (annotationencoursOUT == 3) {
		    DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireCategorie);
		    DictionnaireNumDesItemsOut = jQuery.extend({}, dicNum2categorie);
		}
		if (annotationencoursOUT > 3) {
		    DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
		    DictionnaireNumDesItemsOut = jQuery.extend({}, dicNum2annotation);
		}
	    }
	}
	if (annotationencours == 2) {
	    DictionnaireDesItems = jQuery.extend({}, DictionnaireLemme);
	    DictionnaireNumDesItems = jQuery.extend({}, dicNum2lemme);
	    if (annotationencours != annotationencoursOUT) {
		if (annotationencoursOUT == 1) {
		    DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireSource);
		    DictionnaireNumDesItemsOut = jQuery.extend({}, dicNum2forme);
		}
		if (annotationencoursOUT == 3) {
		    DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireCategorie);
		    DictionnaireNumDesItemsOut = jQuery.extend({}, dicNum2categorie);
		}
		if (annotationencoursOUT > 3) {
		    DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
		    DictionnaireNumDesItemsOut = jQuery.extend({}, dicNum2annotation);
		}
	    }
	}
	if (annotationencours == 3) {
	    DictionnaireDesItems = jQuery.extend({}, DictionnaireCategorie);
	    DictionnaireNumDesItems = jQuery.extend({}, dicNum2categorie);
	    if (annotationencours != annotationencoursOUT) {
		if (annotationencoursOUT == 1) {
		    DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireSource);
		    DictionnaireNumDesItemsOut = jQuery.extend({}, dicNum2forme);
		}
		if (annotationencoursOUT == 2) {
		    DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireLemme);
		    DictionnaireNumDesItemsOut = jQuery.extend({}, dicNum2lemme);
		}
		if (annotationencoursOUT > 3) {
		    DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
		    DictionnaireNumDesItemsOut = jQuery.extend({}, dicNum2annotation);
		}
	    }
	}
	if (annotationencours > 3) {
	    DictionnaireDesItems = jQuery.extend({}, DictionnaireAnnotation);
	    DictionnaireNumDesItems = jQuery.extend({}, dicNum2annotation);
	    if (annotationencours != annotationencoursOUT) {
		if (annotationencoursOUT == 1) {
		    DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireSource);
		    DictionnaireNumDesItemsOut = jQuery.extend({}, dicNum2forme);
		}
		if (annotationencoursOUT == 2) {
		    DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireLemme);
		    DictionnaireNumDesItemsOut = jQuery.extend({}, dicNum2lemme);
		}
		if (annotationencoursOUT == 3) {
		    DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireCategorie);
		    DictionnaireNumDesItemsOut = jQuery.extend({}, dicNum2categorie);
		}
		if (annotationencoursOUT > 3) {
		    DictionnaireDesItemsOut = jQuery.extend({}, DictionnaireAnnotation);
		    DictionnaireNumDesItemsOut = jQuery.extend({}, dicNum2annotation);
		}
	    }
	}
    } else {
	DictionnaireDesItems = jQuery.extend({}, DictionnaireSource);
	DictionnaireNumDesItems = jQuery.extend({}, dicNum2forme);
    }
    var annotationencoursIndex = annotationencours - 1;
    var annotationencoursIndexOUT = annotationencoursOUT - 1;
    
    var queryText = document.getElementById("poleID").value;
    if (queryText == "") {
	var vide ='<small><span id="alert3" style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez un pôle pour pouvoir lancer le calcul...</span></small>';
	$("#placeholder").html(vide);
	return;
    }
    // on cherche si plusieurs pôles ont été fournis
    var reg0 = new RegExp(" +$", "g");
    queryText = queryText.replace(reg0, "");
    var reg1 = new RegExp("^ +", "g");
    queryText = queryText.replace(reg1, "");
    var reg2 = new RegExp(" +", "g");
    queryText = queryText.replace(reg2, " ");
    var listQueryTextInput = queryText.split(" ");
    var nombreMotif = 0;
    var listQueryTextOutput = [];
    for (var j = 0; j < listQueryTextInput.length; j++) {
	if (annotationencours <= 3) {
	    if (listQueryTextInput[j] in DictionnaireDesItems) {
		nombreMotif++;
		listQueryTextOutput.push(listQueryTextInput[j]);
	    }
	} 
	else {
	    var tmpannot = annotationencours + "//" + listQueryTextInput[j];
	    if (tmpannot in DictionnaireDesItems) {
		nombreMotif++;
		listQueryTextOutput.push(listQueryTextInput[j]);
	    }
	}
    }
    if (nombreMotif == 0) {
	var vide ='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red" id="alert1">Le pôle choisi n\'est pas dans le dictionnaire...</span></small>';
	$("#placeholder").html(vide);
	return;
    }
    var insertaudio="<audioFilePosition id=\"AudioNaija\" style=\"background-color: #2fcf2d;color:black\"><small id='tip_lecteur'>(clic sur un mot : lecture fichier audio)</small></audioFilePosition><p><hr/></p>";
    //$("#placeholder").html("");
    //$("#placeholder").html(insertaudio);
    document.getElementById("placeholder").innerHTML ="";
    document.getElementById("placeholder").innerHTML =insertaudio;
    var table = "";
    table += '<div id=\"passage-text\" class=\"passage\"><table id="CONCORDANCE" class="display" width="100%">';
    /*--------------------------*/
    // var PARTITION = document.getElementById("IDPartie").value;
    var PARTITION = PARTITION_DEFAULT;
    // la partition à afficher est soit : 
    // - LIEU par exemple si aucune facette n'a été sélectionnée
    // - soit la partition induite par les facettes (SEX-AGE)
    // - soit uniquement la partie induite par les facettes (F -15)
    //------------------------
    var LISTESDESPARTIES = new Object();
    var DicoDesPositionsDesPartiesPourSections = new Object();
    var positionMaxG = 0;
    var positionMaxD = 0;
    if (PARTITION != "") {
	LISTESDESPARTIES = Object.keys(cadre[PARTITION]);
	for (var j = 0; j < LISTESDESPARTIES.length; j++) {
	    var listepositions = cadre[PARTITION][LISTESDESPARTIES[j]];
	    for (var k = 0; k < listepositions.length; k = k + 2) {
		var deb = listepositions[k];
		var tmpk = k + 1;
		var fin = listepositions[tmpk];
		DicoDesPositionsDesPartiesPourSections[deb] = PARTITION + "=" + LISTESDESPARTIES[j] + "//" + deb + "//" + fin;
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
	positionMaxG = 0;
	positionMaxD = positionsurlatrame;
    }
    /*--------------------------*/
    var nbContexte = 0;
    var partieEnCours = "";
    for (var index in trameForme) {
	if (index in DicoDesPositionsDesPartiesPourSections) {
	    if (DicoDesPositionsDesPartiesPourSections[index] != "ENDPARTIE") {
		var DDDD = DicoDesPositionsDesPartiesPourSections[index].split("//");
		var labelPartie = DDDD[0];
		positionMaxG = Number(DDDD[1]);
		positionMaxD = Number(DDDD[2]);
		//	table+= '<tr><td></td><td><span style="font-size:11px;color:red;font-weight: bold;font-variant: small-caps;">'+labelPartie+'</span></td><td></td><td></td></tr>';
	    }
	}
	var item = DictionnaireNumDesItems[trameForme[index][annotationencoursIndex]];
	if (!(dicNum2forme[trameForme[index][0]] in dictionnairedesdelims)) {
	    var VERIFitem = "BAD";
	    for (var z = 0; z < listQueryTextOutput.length; z++) {
		if (item == listQueryTextOutput[z]) {
		    VERIFitem = "OK";
		}
	    }
	    if (VERIFitem == "OK") {
		var contexteG = "";
		var contexteD = "";
		var nbItemGauche = 0;
		var nbItemDroite = 0;
		/* a droite */
		var posIndex = Number(index) + 1;
		while (nbItemDroite <= lgcontexte) {
		    if ((posIndex in trameForme) && (posIndex <= positionMaxD)) {
			var item2;
			if (annotationencours != annotationencoursOUT) {
			    item2=DictionnaireNumDesItemsOut[trameForme[posIndex][annotationencoursIndexOUT]];
			} 
			else {
			    item2=DictionnaireNumDesItems[trameForme[posIndex][annotationencoursIndex]];
			}
			
			if (!(dicNum2forme[trameForme[posIndex][0]] in dictionnairedesdelims)) {
			    nbItemDroite++;
			    if (nombredannotation > 1) {
				if (nombredannotation > 3) {
				    contexteD +='<a style="text-decoration:none" href="#" onmouseover="Tip(\'<p>Position : ' +
					posIndex +
					"<br/>(1):" +
					dicNum2forme[trameForme[posIndex][0]] +
					"<br/>(2):" +
					dicNum2lemme[trameForme[posIndex][1]] +
					"<br/>(3):" +
					dicNum2categorie[trameForme[posIndex][2]];
				    var audioFile=dicNum2annotation[trameForme[posIndex][9]];
					var paraAudio=dicNum2annotation[trameForme[posIndex][8]];
					//console.log("D : "+paraAudio);
					var listParaAudio=paraAudio.split("|");
					//console.log("D : "+listParaAudio);
					var beginWord=listParaAudio[0];
					//var endWord=listParaAudio[1];
					var LvaluebeginWord=beginWord.split("=");
					//var LvalueendWord=endWord.split("=");
					var valuebeginWord=Number(LvaluebeginWord[1])/1000;
					valuebeginWord=Math.trunc(valuebeginWord);
					//var valueendWord=Number(LvalueendWord[1])/1000;
					//var valueDurationWord=valueendWord-valuebeginWord;
				    //console.log("G:"+audioFile);
				    for (var tmpAnnot = 3;tmpAnnot < nombredannotation;tmpAnnot++) {
					var kk = tmpAnnot + 1;
					contexteD +="<br/>(" +
					    kk +
					    "):" +
					    dicNum2annotation[trameForme[posIndex][tmpAnnot]];
				    }
				    // if (
				    //   (document.getElementById("numAnnotRelationID").value ==
				    //     "") |
				    //   (document.getElementById("relationID").value == "")
				    // ) {
				    //   contexteD +=
				    //     '</p>\')" onmouseout="UnTip()" rel="' +
				    //     item2 +
				    //     '">' +
				    //     item2 +
				    //     "</a>";
				    // } else {
				    var rel = document.getElementById('IDRelation').value;
					// var = "REL" ; Inutile pour ce type de concordance
				    var ident = relation_annot_For_grapherelation;
				    ident = Number(ident);
				    var listerel2 =dicNum2annotation[trameForme[posIndex][ident - 1]];
				    var ListeDependanceAtThisPos = listerel2.split(",");
				    var test = "bad";
				    for (var nbDepAtThisPos = 0;nbDepAtThisPos < ListeDependanceAtThisPos.length;nbDepAtThisPos++) {
						var rel2 = ListeDependanceAtThisPos[nbDepAtThisPos];
						rel2 = rel2.replaceAll("(", "//");
						rel2 = rel2.replaceAll(")", "");
						var Lrel = rel2.split("//");
						if ((rel == Lrel[0] || rel == "ANY") &&	(Lrel[1] == index)) {
							test = "ok";
						}
				    }
				    if (test == "ok") {
					contexteD +='</p>\')" onmouseout="UnTip()" onclick="getLanguage();playAudioNaija(\''+audioFile+'#t='+valuebeginWord+',10\');return false;" rel="' +
					    item2 +
					    '"><span style="background-color:yellow">' +
					    item2 +
					    "</span></a>";
				    } 
				    else {
					contexteD +='</p>\')" onmouseout="UnTip()" onclick="getLanguage();playAudioNaija(\''+audioFile+'#t='+valuebeginWord+',10\');return false;" rel="' +
					    item2 +
					    '" >' +
					    item2 +
					    "</a>";
				    }
				    // }
				} 
				else {
				    contexteD +='<a style="text-decoration:none" href="#" onmouseover="Tip(\'<p>Position : ' +
					posIndex +
					"<br/>(1):" +
					dicNum2forme[trameForme[posIndex][0]] +
					"<br/>(2):" +
					dicNum2lemme[trameForme[posIndex][1]] +
					"<br/>(3):" +
					dicNum2categorie[trameForme[posIndex][2]] +
					'</p>\')" onmouseout="UnTip()" rel="' +
					item2 +
					'">' +
					item2 +
					"</a>";
				}
			    } 
			    else {
				contexteD += item2;
			    }
			} 
			else {
			    //contexteD+=item2;
			    contexteD += item2;
			}
			posIndex++;
		    } 
		    else {
			nbItemDroite = lgcontexte + 1;
		    }
		}
		/* a gauche */
		posIndex = Number(index) - 1;
		while (nbItemGauche <= lgcontexte) {
		    if ((posIndex in trameForme) && (posIndex > positionMaxG)) {
			var item2;
			if (annotationencours != annotationencoursOUT) {
			    item2 =DictionnaireNumDesItemsOut[trameForme[posIndex][annotationencoursIndexOUT]];
			} 
			else {
			    item2 =DictionnaireNumDesItems[trameForme[posIndex][annotationencoursIndex]];
			}
			if (!(dicNum2forme[trameForme[posIndex][0]] in dictionnairedesdelims)) {
			    nbItemGauche++;
			    if (nombredannotation > 1) {
				if (nombredannotation > 3) {
				    var tmpContext =
					'<a style="text-decoration:none" href="#" onmouseover="Tip(\'<p>Position : ' +
					posIndex +
					"<br/>(1):" +
					dicNum2forme[trameForme[posIndex][0]] +
					"<br/>(2):" +
					dicNum2lemme[trameForme[posIndex][1]] +
					"<br/>(3):" +
					dicNum2categorie[trameForme[posIndex][2]];
				    var audioFile=dicNum2annotation[trameForme[posIndex][9]];
					var paraAudio=dicNum2annotation[trameForme[posIndex][8]];
					//console.log(posIndex+ "G :"+paraAudio);
					var listParaAudio=paraAudio.split("|");
					//console.log(posIndex+ " G :"+listParaAudio);
					var beginWord=listParaAudio[0];
					//var endWord=listParaAudio[1];
					var LvaluebeginWord=beginWord.split("=");
					//var LvalueendWord=endWord.split("=");
					var valuebeginWord=Number(LvaluebeginWord[1])/1000;
					valuebeginWord=Math.trunc(valuebeginWord);
					//var valueendWord=Number(LvalueendWord[1])/1000;
					//var valueDurationWord=valueendWord-valuebeginWord;
				    //console.log("G:"+audioFile);
				    for (var tmpAnnot = 3;tmpAnnot < nombredannotation;tmpAnnot++) {
						var kk = tmpAnnot + 1;
						tmpContext +="<br/>(" +
					    kk +
					    "):" +
					    dicNum2annotation[trameForme[posIndex][tmpAnnot]];
				    }
				    // if (
				    //   (document.getElementById("numAnnotRelationID").value ==
				    //     "") |
				    //   (document.getElementById("relationID").value == "")
				    // ) {
				    //   tmpContext +=
				    //     '</p>\')" onmouseout="UnTip()" rel="' +
				    //     item2 +
				    //     '">' +
				    //     item2 +
				    //     "</a>";
				    //   contexteG = tmpContext + contexteG;
				    // } else {
				    var rel = document.getElementById('IDRelation').value;
					// var = "REL" ; Inutile pour ce type de concordance
				    var ident = relation_annot_For_grapherelation;
				    ident = Number(ident);
				    var listerel2 = dicNum2annotation[trameForme[posIndex][ident - 1]];
				    var ListeDependanceAtThisPos = listerel2.split(",");
				    var test = "bad";
				    for (var nbDepAtThisPos = 0;nbDepAtThisPos < ListeDependanceAtThisPos.length;nbDepAtThisPos++) {
						var rel2 = ListeDependanceAtThisPos[nbDepAtThisPos];
						rel2 = rel2.replaceAll("(", "//");
						rel2 = rel2.replaceAll(")", "");
						var Lrel = rel2.split("//");
						if (((rel == Lrel[0]) || (rel == "ANY")) &&	(Lrel[1] == index)) {
							test = "ok";
						}
				    }
				    if (test == "ok") {
						tmpContext +='</p>\')" onmouseout="UnTip()" onclick="getLanguage();playAudioNaija(\''+audioFile+'#t='+valuebeginWord+',10\');return false;" rel="' +
					    item2 +
					    '"><span style="background-color:yellow">' +
					    item2 +
					    "</span></a>";
						contexteG = tmpContext + contexteG;
				    } 
				    else {
						tmpContext +='</p>\')" onmouseout="UnTip()" onclick="playAudioNaija(\''+audioFile+'#t='+valuebeginWord+',10\');return false;" rel="' +
					    item2 +
					    ' ">' +
					    item2 +
					    "</a>";
						contexteG = tmpContext + contexteG;
				    }
				    // }
				} 
				else {
				    contexteG =	'<a style="text-decoration:none" href="#" onmouseover="Tip(\'<p>Position : ' +
					posIndex +
					"<br/>(1):" +
					dicNum2forme[trameForme[posIndex][0]] +
					"<br/>(2):" +
					dicNum2lemme[trameForme[posIndex][1]] +
					"<br/>(3):" +
					dicNum2categorie[trameForme[posIndex][2]] +
					'</p>\')" onmouseout="UnTip()" rel="' +
					item2 +
					'">' +
					item2 +
					"</a>" +
					contexteG;
				}
			    } 
			    else {
				contexteG = item2 + contexteG;
			    }
			} 
			else {
			    contexteG = item2 + contexteG;
			}
			posIndex--;
		    } else {
			nbItemGauche = lgcontexte + 1;
		    }
		}
		nbContexte++;
		/* MODIF 2018 ****************************************************/
		var TMPPARTIENAME = "";
		if (PARTITION != "") {
		    LISTESDESPARTIES = Object.keys(cadre[PARTITION]);
		    for (var j = 0; j < LISTESDESPARTIES.length; j++) {
			var listepositions = cadre[PARTITION][LISTESDESPARTIES[j]];
			for (var k = 0; k < listepositions.length; k = k + 2) {
			    var deb = Number(listepositions[k]);
			    var tmpk = k + 1;
			    var fin = Number(listepositions[tmpk]);
			    var tmpIndex = Number(index);
			    if (tmpIndex <= fin && tmpIndex >= deb) {
				TMPPARTIENAME = LISTESDESPARTIES[j];
			    }
			}
		    }
		}
		/****************************************************************/
		if (nombredannotation > 1) {
		    var item;
		    if (annotationencours != annotationencoursOUT) {
			item = DictionnaireNumDesItemsOut[trameForme[index][annotationencoursIndexOUT]];
		    } 
		    else {
			item = DictionnaireNumDesItems[trameForme[index][annotationencoursIndex]];
		    }
		    
		    if (nombredannotation > 3) {
			table +=
			'<tr><td width="2%">' +
			    nbContexte +
			    "</td><td>" +
			    TMPPARTIENAME +
			    '</td><td style="text-align:right;" width="45%">' +
			    contexteG +
			    '</td><td style="text-align:center;" width="8%"><a style="text-decoration:none" href="#" onmouseover="Tip(\'<p>Position : ' +
			    index +
			    "<br/>(1):" +
			    dicNum2forme[trameForme[index][0]] +
			    "<br/>(2):" +
			    dicNum2lemme[trameForme[index][1]] +
			    "<br/>(3):" +
			    dicNum2categorie[trameForme[index][2]];
			var audioFile=dicNum2annotation[trameForme[index][9]];
			var paraAudio=dicNum2annotation[trameForme[index][8]];
			var listParaAudio=paraAudio.split("|");
			//console.log(listParaAudio);
			var beginWord=listParaAudio[0];
			//var endWord=listParaAudio[1];
			var LvaluebeginWord=beginWord.split("=");
			//var LvalueendWord=endWord.split("=");
			var valuebeginWord=Number(LvaluebeginWord[1])/1000;
			valuebeginWord=Math.trunc(valuebeginWord);
			//var valueendWord=Number(LvalueendWord[1])/1000;
			//var valueDurationWord=valueendWord-valuebeginWord;
				  //console.log("G:"+audioFile);
			for (var tmpAnnot = 3; tmpAnnot < nombredannotation; tmpAnnot++) {
			    var kk = tmpAnnot + 1;
			    table +=
			    "<br/>(" +
				kk +
				"):" +
				dicNum2annotation[trameForme[index][tmpAnnot]];
			}
			table +=
			'</p>\')" onmouseout="UnTip()" onclick="playAudioNaija(\''+audioFile+'#t='+valuebeginWord+',10\');return false;" rel="' +
			    item +
			    '" >' +
			    item +
			    '</a></td><td style="text-align:left;" width="45%">' +
			    contexteD +
			    "</td></tr>";
		    } 
		    else {
			table +=
			'<tr><td width="2%">' +
			    nbContexte +
			    "</td><td>" +
			    TMPPARTIENAME +
			    '</td><td style="text-align:right;" width="45%">' +
			    contexteG +
			    '</td><td style="text-align:center;" width="8%"><a style="text-decoration:none" href="#" onmouseover="Tip(\'<p>(1):' +
			    dicNum2forme[trameForme[index][0]] +
			    "<br/>(2):" +
			    dicNum2lemme[trameForme[index][1]] +
			    "<br/>(3):" +
			    dicNum2categorie[trameForme[index][2]] +
			    '</p>\')" onmouseout="UnTip()" rel="' +
			    item +
			    '">' +
			    item +
			    '</a></td><td style="text-align:left;" width="45%">' +
			    contexteD +
			    "</td></tr>";
		    }
		} 
		else {
		    table +=
		    '<tr><td width="2%">' +
			nbContexte +
			"</td><td>" +
			TMPPARTIENAME +
			'</td><td style="text-align:right;" width="45%">' +
			contexteG +
			'</td><td style="text-align:center;" width="8%">' +
			item +
			'</td><td style="text-align:left;" width="45%">' +
			contexteD +
			"</td></tr>";
		}
	    }
	}
    }
    table += "</table></div>";
    //$("#placeholder").html("");
    //$("#placeholder").html(table);
    //$("#placeholder").append(table);
    document.getElementById("placeholder").innerHTML +=table;
    var column_test;
    if (localStorage.getItem("language") == "fr"){
      column_test = [
		{ title: "N°" },
		{ title: "Partie" },
		{ title: "Contexte Gauche" },
		{ title: "Pôle" },
		{ title: "Contexte Droit" }
	    ]
    } 
    else {
      column_test = [
		{ title: "N°" },
		{ title: "Part" },
		{ title: "Left Context" },
		{ title: "Pole" },
		{ title: "Right Context" }
	    ]
    }
    $(document).ready(function() {
	var tableConc=$("#CONCORDANCE").DataTable({
	    order: [[ 1, "asc" ]],
	    lengthMenu: [
		[10, 25, 50, 100, -1],
		[10, 25, 50, 100, "All"]
	    ],
	    searchHighlight: true,
	    destroy: true,
	    //dom: "Bfrtip",
	    //buttons: ["copy", "csv", "excel", "pdf", "print"],
	    columns: column_test,
	    "search": { // ne fonctionne pas....
		"regex": true
            }
	});
	if (PARTIE_DEFAULT != "") {
	    tableConc.column(1).search(PARTIE_DEFAULT, true, false).draw();
	}
    });    
}

function playAudioNaija(audiofile) {
	
    //console.log("reading:"+audiofile);
	var para=audiofile.split("#t=");
	//console.log(para);
	var time=para[1];
	var startL=time.split(",");
	var start=Number(startL[0]);
    var audioFileOK="http://www.tal.univ-paris3.fr/trameur/iTrameur-naija/mp3/"+para[0]; 
	// variable à changer pour localiser les mp3
    console.log("reading:"+audioFileOK);
	document.getElementById("AudioNaija").innerHTML ='<audio id="passage-audio" preload="auto" class="passage" controls ><source src="'+audioFileOK+'" type="audio/mp3" id="passage-audio-src"/><em class="error"><strong>Error:</strong> Your browser doesn\'t appear to support HTML5 Audio.</em></audio><br/><div class="track-details">'+audiofile+'</div>';
	myAudio=document.getElementById('passage-audio');
	myAudio.addEventListener('canplaythrough', function() {
		var is_playing = this.paused;
		if (is_playing) {
			this.pause();
			this.currentTime = start;
			//console.log("debut :"+start);
			//this.play();
		}
		
	});
	
}

//-----------------------------------------------------------------------------------------
function specifsTotalesParties(partition) {
	
	refreshItrameur();
	var PARTITION = partition;
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

  var annotationencoursIndex = annotationencours - 1;
  var nbPartie = 0;
  var DICOTFG = new Object();
  var DictionnairePartie = new Object();
  var FQpartie = new Object();
  var LISTESDESPARTIES = Object.keys(cadre[PARTITION]);
  for (var j = 0; j < LISTESDESPARTIES.length; j++) {
    var nbPartie = LISTESDESPARTIES[j];
    //alert("PARTIE : "+nbPartie);
    if (!$.isArray(DictionnairePartie[nbPartie])) {
      DictionnairePartie[nbPartie] = new Array();
    }
    FQpartie[nbPartie] = 0;
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
		if (DictionnaireDesItems[mot] > FQmax) {
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
	    if (DictionnaireDesItems[mot] > FQmax) {
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
  var LISTMOTSSource = Object.keys(
    DICOTFG
  ); 
    /*.sort(function(a,b){
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
  var my_columns = [];
  var my_item = {};
  my_item.sTitle = "Item";
  my_columns.push(my_item);
  my_item = {};
  my_item.sTitle = "FQ";
  my_columns.push(my_item);
  for (var j = 0; j < LISTESDESPARTIES.length; j++) {
    var nbPartie = LISTESDESPARTIES[j];
    var labelColumnFq = nbPartie + " / fq";
    my_item = {};
    my_item.sTitle = labelColumnFq;
    my_columns.push(my_item);
    var labelColumnSp = nbPartie + " / sp";
    my_item = {};
    my_item.sTitle = labelColumnSp;
    my_columns.push(my_item);
  }

  document.getElementById("placeholder").style.height = "auto";
  document.getElementById("placeholder").innerHTML =
    "<h4><span id='tableau'>Tableau Général des Items (PARTITION : </span>"+PARTITION +
    ')</h4><br/><small><b><span id="tip_clic" style="background: #4de14b ">Clic sur un mot</span></b><span id="tip_clic_suivant"> : concordance du mot visé.</span></small><br/><br/><table id="specifsTotalesParties" class="display" width="100%"></table>';
  // <small>(FQ &gt; " +
  // 5 +
  // " | annotation:" +
  // annotationencours +
  // ")</small><br/>Partition : " +
  // PARTITION +
  // '</h4><table id="specifsTotalesParties" class="display" width="100%"></table>';
  $(document).ready(function() {
    $("#specifsTotalesParties").DataTable({
      order: [[1, "desc"]],
      data: resultFinal,
      lengthMenu: [
        [10, 20, 50, 100, -1],
        [10, 20, 50, 100, "All"]
      ],
      columns: my_columns,
      //"deferRender": true,
      searchHighlight: true,
      destroy: true,
      dom: "Bfrtip",
      buttons: ["copy", "csv", "excel", "pdf", "print"],
      "search": {
            "regex": true
        }
    });
  });
  
  $(document).on("click","#specifsTotalesParties td:nth-child(1)",function(){
        //alert($(this).text());
		document.getElementById("poleID").value=$(this).text();
		concordance();
  });
  
  // document.getElementById("placeholder").innerHTML = "";
}


//-----------------------------------------------------------------------------------
function specifsPartie(partition,partie) {
    var PARTITION=partition;
    var PARTIE=partie;
    sendIdSelectNumber=0;
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
	console.log("annotationencoursIndex : "+annotationencoursIndex);
    var DICOTFG = new Object();	
    var DictionnairePartie = new Object(); 
    var FQpartie=new Object(); 
    if (!($.isArray(DictionnairePartie[PARTIE]))) {
	DictionnairePartie[PARTIE]=new Array();
    }
    FQpartie[PARTIE]=0;
    var listepositions = cadre[PARTITION][PARTIE];
 

    if ((listepositions === undefined )) { //|| (sendIdSelectNumber ==0)) {
		
		var vide="<small><span id='alert41'>(send_id sélectionnés : </span>"+sendIdSelectNumber+"<span id='alert42'> sur </span>"+sendIdNumber+")</small><br/><span id='alert43'>... partie vide ....</span>";
		$("#placeholder").html(vide);
		return
    }

    sendIdSelectNumber=(listepositions.length)/2;
    console.log("send_id sélectionnées : "+sendIdSelectNumber+" sur "+sendIdNumber+" au total");


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
	if (DictionnaireDesItems[mot] > FQmax) { // ATTENTION pê nécessaire de mettre une FQ MAX = 5
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
    var LISTMOTSSource =  Object.keys(DICOTFG);/*.sort(function(a,b){
		var x = DICOTFG[a][1];
		var y = DICOTFG[b][1];
		return x < y ? 1 : x > y ? -1 : 0;
    });*/
	

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
	var tagcloud = [];
    for (var i=0; i<LISTMOTSSource.length;i++) {
		var mot = LISTMOTSSource[i];
		//console.log(mot);
		var LISTEDEMOTS=DICOTFG[mot];
		var tmpValue=Number(LISTEDEMOTS[1]);
		//console.log(LISTEDEMOTS);
		if (tmpValue > 2) {
			var sizeW=20;
			if (tmpValue > 30) {sizeW=70};
			if ((tmpValue > 20) & (tmpValue <= 30)) {sizeW=60};
			if ((tmpValue > 10) & (tmpValue <= 20)) {sizeW=50};
			if ((tmpValue > 5) & (tmpValue <= 10)) {sizeW=40};
			tagcloud.push({word:mot,weight:sizeW});	
			//console.log(tagcloud);
		}
	}	
	//console.log(tagcloud);
	if (document.getElementById('expertID').checked) {
		//<small>(send_id sélectionnés : "+sendIdSelectNumber+" sur "+sendIdNumber+")</small>";
		var tmpInfoSend="<small><span id='alert41'>(send_id sélectionnés : </span>"+sendIdSelectNumber+"<span id='alert42'> sur </span>"+sendIdNumber+")</small>";		
		document.getElementById('placeholder').innerHTML = '<h4><span id="specifPartie">Spécificités Partie : </span>'+PARTIE+' (Partition : '+PARTITION+')</h4>'+tmpInfoSend+'<br/><small><b><span id="tip_clic" style="background: #4de14b">Clic sur un mot</span></b><span id="tip_clic_suivant"> : concordance du mot visé.</span></small><br/><br/><table id="SpecifPartie" class="display" width="50%"></table>';
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
		    ],
		    "search": {
			"regex": true
		    }
		})
		});
	
		$(document).on("click","#SpecifPartie td:nth-child(1)",function(){
        //alert($(this).text());
		document.getElementById("poleID").value=$(this).text();
		concordance();
		});
	}
	else {
		
		var tmpInfoSend='<h4><span id="specifMot">Les mots spécifiques de la partie : </span>'+PARTIE+' (Partition : '+PARTITION+')</h4><small><b><span id="tip_clic" style="background: #4de14b">Clic sur un mot</span></b><span id="tip_clic_suivant"> : concordance du mot visé.</span></small><br/>';
		document.getElementById('placeholder').innerHTML = tmpInfoSend;
  		document.getElementById('placeholder').innerHTML += "<div id='wordCloud'></div>";
		document.getElementById('wordCloud').style.width = "600px";
		document.getElementById('wordCloud').style.height = "600px";
		
		$("#wordCloud").jQWCloud({
			words: tagcloud,
			minFont: 10,
			maxFont: 50,
			//fontOffset: 5,
			//cloud_font_family: 'Owned',
			//verticalEnabled: false,
			padding_left: 1,
			//showSpaceDIV: true,
			//spaceDIVColor: 'white',
			word_common_classes: 'WordClass',		
			word_mouseEnter :function(){
				$(this).css("text-decoration","underline");
			},
			word_mouseOut :function(){
				$(this).css("text-decoration","none");	
			},
			word_click: function(){ 			
				//alert("You have selected:" +$(this).text());
				document.getElementById("poleID").value=$(this).text();
				concordance();
				//getLanguage();
			},		              
			beforeCloudRender: function(){
		       date1=new Date();
			},
			afterCloudRender: function(){
				var date2=new Date();
				console.log("Cloud Completed in "+(date2.getTime()-date1.getTime()) +" milliseconds");
			}
		});
	}
}
//-----------------------------------------------------------------------------------
/*---------------------------------------------------------------------------------------------------------------------------------------*/
function calculCoocNgram() {

    
	refreshItrameur();

	var lgcontexte = document.getElementById("lgcontexteID").value;
    if (lgcontexte == "") {
		document.getElementById("lgcontexteID").value = 10;
		lgcontexte=10;
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
	//var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez un pôle pour pouvoir lancer le calcul...</span></small>';
	var vide ='<small><span id="alert3" style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez un pôle pour pouvoir lancer le calcul...</span></small>';
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

    var indspmin=5;
    var cofreq=2;
    var nbGramGauche=lgcontexte;
    var nbGramDroite=lgcontexte;
	document.getElementById('placeholder2').style.height = "0px";
    GrapheArborL=800;
    GrapheArborH=400;	

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
			//var inputStopListe = document.getElementById ("stoplistecoocngramID");
			//var isCheckedStopListe = inputStopListe.checked;
			var filtrestopliste=0;
			//if (isCheckedStopListe) {
			//    if (gestionnaireSelection[j-i]==1) {
			//	filtrestopliste =1
			//    }
			//}
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
			//var inputStopListe = document.getElementById ("stoplistecoocngramID");
			//var isCheckedStopListe = inputStopListe.checked;
			var filtrestopliste=0;
			//if (isCheckedStopListe) {
			//    if (gestionnaireSelection[j-i]==1) {
			//	filtrestopliste =1
			//    }
			//}
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
	var table='';
	if (localStorage.getItem("language") == "fr"){
		table='<p align="center"><span style=\"font-size:0.7em\" id=\"tip_clic2\">(clic sur mot : contextes)</span></p>';
	}
	else {
		table='<p align="center"><span style=\"font-size:0.7em\" id=\"tip_clic2\">(Click on a word : contexts)</span></p>';
	}
	
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
 	
	if (localStorage.getItem("language") == "fr"){
		table += '<p align="center"><span style=\"font-size:0.7em\" id=\"tip_clic3\">(clic sur mot : contextes)</span></p>';
	}
	else {
		table += '<p align="center"><span style=\"font-size:0.7em\" id=\"tip_clic3\">(Click on a word : contexts)</span></p>';
	}

	
    table += '<p>&nbsp;</p>';
    table += '<p>&nbsp;</p>';
    if (NBcooc > 0 ) {
	document.getElementById('placeholder2').style.height = "200px";
	$("#placeholder2").html(table);
    }
    /*-----------------------GRAPHE-----------------------------------------------------------------------*/
    if (NBcooc > 0 ) {	
		document.getElementById('legendGraphe').innerHTML = "";
		var legend ='';
		if (localStorage.getItem("language") == "fr"){
			legend ='<small><b><span id="tip_cooc1">Couleur Noeud-Cooc</span></b> : <span style="background-color:#fee7cd;color:black">IndicSp</span>&lt;<b>5</b>&lt;<span style="background-color:#ffb0b0;color:black">IndicSp</span>&lt;<b>10</b>&lt;<span style="background-color:#ff3838b;color:black">IndicSp</span>&lt;<b>20</b>&lt;<span style="background-color:#ff8484;color:black">IndicSp</span>&lt;<b>30</b>&lt;<span style="background-color:#ff5555;color:black">IndicSp</span>&lt;<b>50</b>&lt;<span style="background-color:#ff0000;color:black">IndicSp</span><br/><b><span id="tip_cooc2">Arc Label</span></b> : <b>POLE</b><font color="#99CC99">&#x2212;</font>IndSp(Co-Freq)<font color="#99CC99">&#8594;</font><b>COOC</b></small><br/><span style="background:yellow"><img onclick="clear_canvas();" src="./images/trash.png" title="suppression graphique" alt="suppression graphique"/></span>';
		}
		else {
			legend ='<small><b><span id="tip_cooc1">Node-Cooc Color</span></b> : <span style="background-color:#fee7cd;color:black">IndicSp</span>&lt;<b>5</b>&lt;<span style="background-color:#ffb0b0;color:black">IndicSp</span>&lt;<b>10</b>&lt;<span style="background-color:#ff3838b;color:black">IndicSp</span>&lt;<b>20</b>&lt;<span style="background-color:#ff8484;color:black">IndicSp</span>&lt;<b>30</b>&lt;<span style="background-color:#ff5555;color:black">IndicSp</span>&lt;<b>50</b>&lt;<span style="background-color:#ff0000;color:black">IndicSp</span><br/><b><span id="tip_cooc2">Arrow Label</span></b> : <b>POLE</b><font color="#99CC99">&#x2212;</font>IndSp(Co-Freq)<font color="#99CC99">&#8594;</font><b>COOC</b></small><br/><span style="background:yellow"><img onclick="clear_canvas();" src="./images/trash.png" title="delete" alt="delete"/></span>';

			
		}
	
	
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

//--------------------------------------------------------------------------------------
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
//--------------------------------------------------------------------------------------
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
    $('#contentgrapheholder').append('<canvas id="grapheHolder"></canvas>');
    canvas = document.getElementById('grapheHolder');
    var context = canvas.getContext('2d');
    var gfx = arbor.Graphics(canvas)
    gfx.clear();
    context.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = 800;
    canvas.height = 600;
    document.getElementById('grapheHolder').innerHTML='';
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
    $('#contentgrapheholder').append('<canvas id="grapheHolder"></canvas>');
    //context.clearRect(0, 0, canvas.width, canvas.height);
    //canvas.width = GrapheArborL;
    //canvas.height = GrapheArborH;
    //document.getElementById('grapheHolder').innerHTML='';
    canvas = document.getElementById('grapheHolder');
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = GrapheArborL;
    canvas.height=GrapheArborH;
    document.getElementById('grapheHolder').innerHTML = '';
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
	
	if (localStorage.getItem("language") == "fr"){
		document.getElementById('contextehtml').innerHTML = '<h4>Contextes</h4><table id="CONTEXTES" class="display" width="70%"></table>';
	}
	else {
		document.getElementById('contextehtml').innerHTML = '<h4>Contexts</h4><table id="CONTEXTES" class="display" width="70%"></table>';
	}
	var column_test;
	if (localStorage.getItem("language") == "fr"){
      column_test = [
		{ title: "N°" },
		{ title: "contexte" }
	    ]
    } 
	else {
      column_test = [
		{ title: "N°" },
		{ title: "context" }
	    ]
    }	
	
    $(document).ready(function() {
	$('#CONTEXTES').DataTable ( {
	    order: [[ 0, "asc" ]],
	    searchHighlight: true,
	    "destroy": true,
	    data:resultFinal,
	    lengthMenu: [[10, 25, 50,100, -1], [10, 25, 50,100, "All"]],
	    columns: column_test,
		"search": { // ne fonctionne pas....
			"regex": true
        }
	})
    });
	//getLanguage()
}
//-----------------------------------------------------------------------------------
// FONCTIONS DEPENDANCE
//-----------------------------------------------------------------------------------
function displayListDependency() {

    var lemmeGouv2searchA=document.getElementById("poleID").value;//"";
	var lemmeGouv2searchB=lemmeGouv2searchA.split("_");
	var lemmeGouv2search=lemmeGouv2searchB[0];
	var lemmeGouvPos2search=lemmeGouv2searchB[1];
	if (lemmeGouv2search == "") {
		if (localStorage.getItem("language") == "fr"){
			var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Il faut entrer une valeur pour le GOUVERNEUR visé dans la zone Pôle...</span></small>';
			$("#placeholder").html(vide);	
		}
		else {
			var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">A value for HEAD must be entered in the Pole field....</span></small>';
			$("#placeholder").html(vide);	
		}
		return;
	}
	else {
		document.getElementById("poleID").value="";
	}
    //-----------------------------------------------------------------
    refreshItrameur();
    //-----------------------------------------------------------------
	var relation="ANY";
    var dicoRelationItems=new Object();
    dictionnairedespositionsdesrelationsentrelemmes=new Object();
    dictionnairedesfrequencesdesrelationsentrelemmes=new Object();
    var lemmeDep2search="";
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
				if ((lemmeDep2search in DictionnaireLemme) && (lemmeDep2search == dicNum2lemme[trameForme[index][2]] )) {
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
							if ((lemmeGouv2search == dicNum2lemme[trameForme[IdentRelationAtThisPos][1]])
								&&
								(lemmeGouvPos2search == dicNum2categorie[trameForme[IdentRelationAtThisPos][2]])
								)
							
								{
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
	var label_result="";
	var label_context_plus="";
	if (localStorage.getItem("language") == "fr"){
		label_result="Liste des dépendances";
		//label_context_plus="Contextes ++";
	}
	else {
		label_result="Dependency List";
		//label_context_plus="Contexts ++";
	}

    if ((relation == "ANY") && (lemmeGouv2search != "")) {
		// on ajoute le bouton pour calcul des "phrases" prototypiques...
		document.getElementById('placeholder').innerHTML = '<h4><span id="labelDependanceDisplay">'+label_result+'</span> ('+lemmeGouv2searchA+'&#8594;lemme)<br/>Relation : '+relation+'</h4><table id="searchrelation" class="display" width="50%"></table>';
		document.getElementById('placeholder').innerHTML +='';
    }
    else {
		document.getElementById('placeholder').innerHTML = '<h4><span id="labelDependanceDisplay">'+label_result+'</span>  ('+lemmeGouv2searchA+'&#8594;pos)<br/>Relation : '+relation+'</h4><table id="searchrelation" class="display" width="50%"></table>';
    }

    var column_test;
    if (localStorage.getItem("language") == "fr"){
      column_test = [
		{title: "Gouverneur"},
		{title: "Relation"},
		{title: "Dépendant"},
		{title: "Fq Relation"},
		{title: "Longueur"},
		{title: "Fq Post"},
		{title: "Fq Ante"},
		{title: "Concordance"},
	    ]
    } 
    else {
      column_test = [
		{title: "Head"},
		{title: "Relation"},
		{title: "Dependent"},
		{title: "Relation Fq"},
		{title: "Length"},
		{title: "Post Fq"},
		{title: "Ante Fq"},
		{title: "Concordancer"},
	    ]
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
	    columns: column_test,
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
			concordanceLemmesRelation(label);getLanguage();
	    }
	    /* A FAIRE !!!
	    if (fired_button=="S") {
		cartesectionLemmesRelation(label);
	    }
	    */
	} );
 	
    });
 

}


function searchRelationLemmePos() {
 
    //var relation_annot_For_grapherelation=document.getElementById('IDRelation').value;
    /*if (relation_annot_For_grapherelation==""){
		var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Entrez une valeur numérique pour le numéro d\'annotation visée...</span></small>';
		$("#placeholder").html(vide);	
		return;
    }*/
    
    var relation=document.getElementById('IDRelation').value;
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
    var lemmeGouv2searchA=document.getElementById("poleID").value;//"";
	var lemmeGouv2searchB=lemmeGouv2searchA.split("_");
	var lemmeGouv2search=lemmeGouv2searchB[0];
	var lemmeGouvPos2search=lemmeGouv2searchB[1];
	
	if ((relation == "ANY") && (lemmeGouv2search == "")) {
		if (localStorage.getItem("language") == "fr"){
			var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">Avec la relation ANY, il faut entrer une valeur pour le GOUVERNEUR visé dans la zone Pôle...</span></small>';
			$("#placeholder").html(vide);	
		}
		else {
			var vide='<small><span style="text-align:center; border: 1pt dotted #939393 ; padding: 1pt; margin-left: 0px; margin-right: 0px; background:red">With the ANY relation, a value for HEAD must be entered in the Pole field....</span></small>';
			$("#placeholder").html(vide);	
		}
		return;
	}
	else {
		document.getElementById("poleID").value="";
	}
	
    var lemmeDep2search="";
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
							if ((lemmeGouv2search == dicNum2lemme[trameForme[IdentRelationAtThisPos][1]])
								&&
								(lemmeGouvPos2search == dicNum2categorie[trameForme[IdentRelationAtThisPos][2]]))
							
								{
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
	var label_result="";
	var label_context_plus="";
	if (localStorage.getItem("language") == "fr"){
		label_result="Liste des dépendances";
		label_context_plus="Contextes ++";
	}
	else {
		label_result="Dependency List";
		label_context_plus="Contexts ++";
	}

    if ((relation == "ANY") && (lemmeGouv2search != "")) {
		// on ajoute le bouton pour calcul des "phrases" prototypiques...
		document.getElementById('placeholder').innerHTML = '<h4><span id="labelDependanceDisplay">'+label_result+'</span> (lemme&#8594;pos)<br/>Relation : '+relation+'</h4><p><button class="submit" title="Les phrases prototypiques..." onclick="searchContextesCommunLemmesRelation();"><span>'+label_context_plus+'</span></button></p><table id="searchrelation" class="display" width="50%"></table>';
		document.getElementById('placeholder').innerHTML +='';
    }
    else {
		document.getElementById('placeholder').innerHTML = '<h4><span id="labelDependanceDisplay">'+label_result+'</span>  (lemme&#8594;pos)<br/>Relation : '+relation+'</h4><table id="searchrelation" class="display" width="50%"></table>';
    }

    var column_test;
    if (localStorage.getItem("language") == "fr"){
      column_test = [
		{title: "Gouverneur"},
		{title: "Relation"},
		{title: "Dépendant"},
		{title: "Fq Relation"},
		{title: "Longueur"},
		{title: "Fq Post"},
		{title: "Fq Ante"},
		{title: "Concordance"},
	    ]
    } 
    else {
      column_test = [
		{title: "Head"},
		{title: "Relation"},
		{title: "Dependent"},
		{title: "Relation Fq"},
		{title: "Length"},
		{title: "Post Fq"},
		{title: "Ante Fq"},
		{title: "Concordancer"},
	    ]
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
	    columns: column_test,
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
			concordanceLemmesRelation(label);getLanguage();
	    }
	    /* A FAIRE !!!
	    if (fired_button=="S") {
		cartesectionLemmesRelation(label);
	    }
	    */
	} );
 	
    });
}
/************************************************************************************************/
function concordanceLemmesRelation(inputLemmesRelation) {
    var listePara=inputLemmesRelation.split("//");
    var relation2scan=listePara[0];
    var AnnotationOutput=annotationencoursOUT;
	var lgcontexte = document.getElementById("lgcontexteID").value;
	if (lgcontexte == "") {
	document.getElementById("lgcontexteID").value = 10;
	lgcontexte=10;
    }
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
	var insertaudio="<audioFilePosition id=\"AudioNaija\" style=\"background-color: #2fcf2d;color:black\"><small id='tip_lecteur2'>(clic sur un mot : lecture fichier audio)</small></audioFilePosition><p><hr/></p>";
    //$("#placeholder").html("");
    //$("#placeholder").html(insertaudio);
    document.getElementById("placeholder").innerHTML ="";
    document.getElementById("placeholder").innerHTML =insertaudio;
    var table='';
    table += '<div id=\"passage-text\" class=\"passage\"><table id="CONCORDANCE" class="display" width="100%">';
    /*--------------------------*/
    var PARTITION =PARTITION_DEFAULT;
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
				// audio ----------------------------------------------------------------
				    var audioFile=dicNum2annotation[trameForme[posIndex][9]];
					var paraAudio=dicNum2annotation[trameForme[posIndex][8]];
					//console.log("D : "+paraAudio);
					var listParaAudio=paraAudio.split("|");
					//console.log("D : "+listParaAudio);
					var beginWord=listParaAudio[0];
					//var endWord=listParaAudio[1];
					var LvaluebeginWord=beginWord.split("=");
					//var LvalueendWord=endWord.split("=");
					var valuebeginWord=Number(LvaluebeginWord[1])/1000;
					valuebeginWord=Math.trunc(valuebeginWord);
					//var valueendWord=Number(LvalueendWord[1])/1000;
					//var valueDurationWord=valueendWord-valuebeginWord;
				    //console.log("G:"+audioFile);
				//-----------------------------------------------------------------------
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
				var ident = relation_annot_For_grapherelation;
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
				contexteD+="</p>')\" onmouseout=\"UnTip()\" onclick=\"getLanguage();playAudioNaija(\'"+audioFile+"#t="+valuebeginWord+",10\');return false;\" rel=\""+item2+"\"><span style=\"background-color:yellow\">"+item2+"</span></a>";
			    }
			    else {
				contexteD +='</p>\')" onmouseout="UnTip()" onclick="getLanguage();playAudioNaija(\''+audioFile+'#t='+valuebeginWord+',10\');return false;" rel="' +
					    item2 +
					    '" >' +
					    item2 +
					    "</a>";
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
				//-- audioc----------------------------------------------------
					var audioFile=dicNum2annotation[trameForme[posIndex][9]];
					var paraAudio=dicNum2annotation[trameForme[posIndex][8]];
					//console.log(posIndex+ "G :"+paraAudio);
					var listParaAudio=paraAudio.split("|");
					//console.log(posIndex+ " G :"+listParaAudio);
					var beginWord=listParaAudio[0];
					//var endWord=listParaAudio[1];
					var LvaluebeginWord=beginWord.split("=");
					//var LvalueendWord=endWord.split("=");
					var valuebeginWord=Number(LvaluebeginWord[1])/1000;
					valuebeginWord=Math.trunc(valuebeginWord);
					//var valueendWord=Number(LvalueendWord[1])/1000;
					//var valueDurationWord=valueendWord-valuebeginWord;
				    //console.log("G:"+audioFile);
				//-----------------------------------------------------------
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
				var ident = relation_annot_For_grapherelation;
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
				tmpContext+="</p>')\" onmouseout=\"UnTip()\" onclick=\"playAudioNaija(\'"+audioFile+"#t="+valuebeginWord+",10\');return false;\"  rel=\""+item2+"\"><span style=\"background-color:yellow\">"+item2+"</span></a>";
				contexteG=tmpContext+contexteG;
			    }
			    else {
				tmpContext +='</p>\')" onmouseout="UnTip()" onclick="playAudioNaija(\''+audioFile+'#t='+valuebeginWord+',10\');return false;" rel="' +
					    item2 +
					    ' ">' +
					    item2 +
					    "</a>";
					contexteG = tmpContext + contexteG;
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
		//-- audio -------------------------
			var audioFile=dicNum2annotation[trameForme[index][9]];
			var paraAudio=dicNum2annotation[trameForme[index][8]];
			var listParaAudio=paraAudio.split("|");
			//console.log(listParaAudio);
			var beginWord=listParaAudio[0];
			//var endWord=listParaAudio[1];
			var LvaluebeginWord=beginWord.split("=");
			//var LvalueendWord=endWord.split("=");
			var valuebeginWord=Number(LvaluebeginWord[1])/1000;
			valuebeginWord=Math.trunc(valuebeginWord);
		//----------------------------------
		for (var tmpAnnot=3;tmpAnnot<nombredannotation;tmpAnnot++) {
		    var kk=tmpAnnot+1;
		    table +="<br/>("+ kk +"):"+ dicNum2annotation[trameForme[index][tmpAnnot]];
		}
		table +=
			'</p>\')" onmouseout="UnTip()" onclick="playAudioNaija(\''+audioFile+'#t='+valuebeginWord+',10\');return false;" rel="' +
			    item +
			    '" >' +
			    item +
			    '</a></td><td style="text-align:left;" width="45%">' +
			    contexteD +
			    "</td></tr>";
	    }
	    else {
		table +='<tr><td width="2%">'+nbContexte+'</td><td>'+TMPPARTIENAME+'</td><td style="text-align:right;" width="45%">'+contexteG+'</td><td style="text-align:center;" width="8%"><a style="text-decoration:none" href="#" onmouseover="Tip(\'<p>(1):'+ dicNum2forme[trameForme[index][0]] + '<br/>(2):' + dicNum2lemme[trameForme[index][1]] + '<br/>(3):' + dicNum2categorie[trameForme[index][2]] +'</p>\')" onmouseout="UnTip()" rel="'+item+'">'+item+'</a></td><td style="text-align:left;" width="45%">'+contexteD+'</td></tr>';
	    }
	}
	else {
	    table +='<tr><td width="2%">'+nbContexte+'</td><td>'+TMPPARTIENAME+'</td><td style="text-align:right;" width="45%">'+contexteG+'</td><td style="text-align:center;" width="8%">'+item+'</td><td style="text-align:left;" width="45%">'+contexteD+'</td></tr>';
	}
    }
    table +='</table></div>';
    document.getElementById("placeholder").innerHTML +=table;
	var column_test;
    if (localStorage.getItem("language") == "fr"){
      column_test = [
		{ title: "N°" },
		{ title: "Partie" },
		{ title: "Contexte Gauche" },
		{ title: "Pôle" },
		{ title: "Contexte Droit" }
	    ]
    } else {
      column_test = [
		{ title: "N°" },
		{ title: "Part" },
		{ title: "Left Context" },
		{ title: "Pole" },
		{ title: "Right Context" }
	    ]
    }
    $(document).ready(function() {
	$('#CONCORDANCE').DataTable ( {
	    order: [[ 1, "asc" ]],
	    lengthMenu: [[10, 25, 50,100, -1], [10, 25, 50,100, "All"]],
	    searchHighlight: true,
	    "destroy": true,
	    columns: column_test,
		"search": { // ne fonctionne pas....
		"regex": true
            }
	})
    });
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
function concordanceLemmesRelationMaxi() {
    var relation2scan="ANY";
	var lgcontexte = document.getElementById("lgcontexteID").value;
    if (lgcontexte == "") {
		document.getElementById("lgcontexteID").value = 10;
		lgcontexte=10;
    }
    var AnnotationOutput=annotationencoursOUT;
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
    var PARTITION =PARTITION_DEFAULT;//document.getElementById('IDPartie').value;
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
							var ident = relation_annot_For_grapherelation; //document.getElementById('numAnnotRelationID').value;
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
							var ident = relation_annot_For_grapherelation; //document.getElementById('numAnnotRelationID').value;
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
				table +="</p>')\" onmouseout=\"UnTip()\" rel=\""+item+"\">"+item+"</a></td><td style=\"text-align:left;\" width=\"45%\">"+contexteD+"</td><td>"+distribrelation.join(' ')+"</td></tr>";
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
    var column_test;
    if (localStorage.getItem("language") == "fr"){
      column_test = [
		{ title: "N°" },
		{ title: "Partie" },
		{ title: "Contexte Gauche" },
		{ title: "Pôle" },
		{ title: "Contexte Droit" },
		{ title: "STRUCT. DEP."}
	    ]
    } 
    else {
      column_test = [
		{ title: "N°" },
		{ title: "Part" },
		{ title: "Left Context" },
		{ title: "Pole" },
		{ title: "Right Context" },
		{ title: "STRUCT. DEP."}
	    ]
    }
    $(document).ready(function() {
	$('#CONCORDANCE').DataTable ( {
	    //order: [[ 1, "desc" ]],
	    lengthMenu: [[10, 25, 50,100, -1], [10, 25, 50,100, "All"]],
	    searchHighlight: true,
	    "destroy": true,
	    columns:  column_test,
	    "search": { // ne fonctionne pas....
		"regex": true
            }
	})
    });
}