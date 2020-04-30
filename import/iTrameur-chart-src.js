function motPlusLong(texte) {
  var mots=texte.split(" ");
//   console.log(mots); # if not working check in firefox console: ctrl-shift-K
  var motLong="";
  for (var i = 0; i < mots.length; i++) {
    if (mots[i].length > motLong.length) {motLong=mots[i]}
  }
  return motLong
}

// console.log(motPlusLong("La vie est une longue fleuve tranquille"))

function motLongTableauParag() {
	var tablanalyse="<table>";
	tablanalyse+="<tr> <th> Paragraphe </th> <th> mot long de ce paragraphe </th> </tr>"
	var paragraphs = document.getElementsByTagName("p");
	for(var i = 0; i < paragraphs.length; i++)
	{		
		tablanalyse += "<tr> <td> "+(i+1)+" </td> <td> "+motPlusLong(paragraphs[i].innerHTML)+" </td> </tr>";
		
	}
	tablanalyse+="</table>";
	document.getElementById('analyse').innerHTML=tablanalyse;
}

// motLongTableauParag();





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

// console.log(freqMots("La vie est une longue fleuve tranquille"))



function motFreqTableau() {
	var tablanalyse="<table>";
	tablanalyse+="<tr> <th> mot </th> <th> fréquence </th> </tr>"
	var toutTexte = document.getElementById("textAAnalyser").value;
	var freqs=freqMots(toutTexte.toLowerCase());
	Object.keys(freqs).sort(function(a,b){return freqs[b]-freqs[a]}).forEach(function(m) {
		if (m=="") return false; 
		tablanalyse += "<tr> <td> "+m+" </td> <td> "+freqs[m]+" </td> </tr>";
	});
	tablanalyse+="</table>";
	document.getElementById('analyse').innerHTML=tablanalyse;
	
}

function motFreqCamembert() {
	
	var maxi=30;
	var toutTexte = FILEINPUTTOREAD;
	var freqs=freqMots(toutTexte.toLowerCase());
	var etiquettes=[];
	var series=[]
// 	console.log(freqs);

	Object.keys(freqs).sort(function(a,b){return freqs[b]-freqs[a]}).forEach(function(m) {
		if (m=="") return false; 
		
// 		#1 simple
// 		etiquettes.push(m);
// 		series.push(freqs[m]);
		
// 		#2 les maxi premiers
// 		if (etiquettes.length < maxi) {
// 				etiquettes.push(m);
// 				series.push(freqs[m]);
// 			}
		
		
// 		#3 les maxi premiers + le reste
		if (etiquettes.length < maxi) {
				etiquettes.push(m);
				series.push(freqs[m]);
			}
		else {
				if (etiquettes.length == maxi) {
					etiquettes.push("reste");
					series.push(freqs[m]);
				}
				else {
					series[maxi]+=freqs[m];
				}
			}
		
	});
// 	console.log(etiquettes, series)
	var data = {
			labels: etiquettes,
			series: series
		};

	
	var options = {
			width: 600,
			height: 600,
		};
			
	document.getElementById('page-analysis').innerHTML = '';
	new Chartist.Pie('#page-analysis', data, options);
	
}

function motFreqLigne() {
	
	var maxi=100;
	var toutTexte = FILEINPUTTOREAD;
	var freqs=freqMots(toutTexte.toLowerCase());
	var etiquettes=[];
	var series=[]
// 	console.log(freqs);

	Object.keys(freqs).sort(function(a,b){return freqs[b]-freqs[a]}).forEach(function(m) {
		if (m=="") return false; 
		
// 		#1 simple
// 		etiquettes.push(m);
// 		series.push(freqs[m]);
		
// 		#2 les maxi premiers
		if (etiquettes.length < maxi) {
				etiquettes.push(m);
				series.push(freqs[m]);
			}
	
	});
// 	console.log(etiquettes, series)
	var data = {
			labels: etiquettes,
			series: [series]
		};

	
	var options = {
			width: 1200,
			height: 400,
		};
			
	document.getElementById('page-analysis').innerHTML = '';
	new Chartist.Line('#page-analysis', data, options);
	
}

function motFreqBar() {
	
	var maxi=100;
	var toutTexte = FILEINPUTTOREAD;
	var freqs=freqMots(toutTexte.toLowerCase());
	var etiquettes=[];
	var series=[]
// 	console.log(freqs);

	Object.keys(freqs).sort(function(a,b){return freqs[b]-freqs[a]}).forEach(function(m) {
		if (m=="") return false; 
		
// 		#1 simple
// 		etiquettes.push(m);
// 		series.push(freqs[m]);
		
// 		#2 les maxi premiers
		if (etiquettes.length < maxi) {
				etiquettes.push(m);
				series.push(freqs[m]);
			}
	
	});
// 	console.log(etiquettes, series)
	var data = {
			labels: etiquettes,
			series: [series]
		};

	
	var options = {
			width: 600,
			height: 1200,
			seriesBarDistance: 10,
			reverseData: true,
			horizontalBars: true,
			axisY: {
				offset: 70
			}
		};
			
	document.getElementById('page-analysis').innerHTML = '';
	new Chartist.Bar('#page-analysis', data, options);
	
}


