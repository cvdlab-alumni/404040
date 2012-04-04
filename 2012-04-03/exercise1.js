
//funzione che, dati 3 punti, restituisce una griglia delimitata dai 3 punti
var creaGriglia = function (array3punti) {
	punto0 = array3punti[0];
	puntoX = array3punti[1];
	puntoY = array3punti[2];
	var structVerticale = STRUCT([]);
	var structOrizzontale = STRUCT([]);
	for (var i=punto0[0]; i<=puntoX[0]; i++) {
		var rettaVerticale = POLYLINE([[i, punto0[1]], [i, puntoY[1]]]);
		structVerticale = STRUCT([structVerticale, rettaVerticale]);
	}
	for (var j=punto0[1]; j<=puntoY[1]; j++) {
		var rettaOrizzontale = POLYLINE([[punto0[0], j], [puntoX[0], j]]);
		structOrizzontale = STRUCT([structOrizzontale, rettaOrizzontale]);
	}
	return STRUCT([structOrizzontale, structVerticale]);
}


var pezzoGriglia1 = creaGriglia([[0,0], [1,0], [0,2]]);
var pezzoGriglia2 = creaGriglia([[1,0], [39,0], [0,1]]);
var pezzoGriglia3 = creaGriglia([[21,1], [36,1], [21,4]]);
var pezzoGriglia4 = creaGriglia([[21,4], [51,4], [21,5]]);
var pezzoGriglia5 = creaGriglia([[51,4], [52,4], [51,6]]);
var pezzoGriglia6 = creaGriglia([[21,5], [47,5], [21,7]]);
var pezzoGriglia7 = creaGriglia([[21,7], [31,7], [21,10]]);
var pezzoGriglia8 = creaGriglia([[32,7], [47,7], [32,16]]);
var pezzoGriglia9 = creaGriglia([[1,10], [31,10], [1,14]]);
var pezzoGriglia10 = creaGriglia([[1,14], [7,14], [1,22]]);
var pezzoGriglia11 = creaGriglia([[7,15], [9,15], [7,22]]);
var pezzoGriglia12 = creaGriglia([[22,14], [32,14], [22,15]]);
var pezzoGriglia13 = creaGriglia([[9,15], [32,15], [9,17]]);
var pezzoGriglia14 = creaGriglia([[32,16], [39,16], [32,17]]);

var griglia = STRUCT([pezzoGriglia1, pezzoGriglia2, pezzoGriglia3, pezzoGriglia4,
					 pezzoGriglia5, pezzoGriglia6, pezzoGriglia7, pezzoGriglia8,
					 pezzoGriglia9, pezzoGriglia10, pezzoGriglia11, pezzoGriglia12,
					 pezzoGriglia13, pezzoGriglia14]);


var perimetro1 = POLYLINE([[0,0], [39,0], [39,4]]);
var perimetro2 = POLYLINE([[39,4], [52,4], [52,6]]);
var perimetro3 = POLYLINE([[52,6], [51,6], [51,16]]);
var perimetro4 = POLYLINE([[51,16], [39,16], [39,17]]);
var perimetro5 = POLYLINE([[39,17], [9,17], [9,22]]);
var perimetro6 = POLYLINE([[9,22], [1,22], [1,2]]);
var perimetro7 = POLYLINE([[1,2], [0,2], [0,0]]);
var perimetro = STRUCT([perimetro1, perimetro2, perimetro3, perimetro4, perimetro5, perimetro6, perimetro7]);
COLOR([0,0,0])(perimetro);

var floor2D = STRUCT([griglia, perimetro]);


var piscina1 = POLYLINE([[1,1], [21,1], [21,10]]);
var piscina2 = POLYLINE([[21,10], [1,10], [1,1]]);
var piscinaGrande = STRUCT([piscina1, piscina2]);
COLOR([0,0,0])(piscinaGrande);

var piscina3 = POLYLINE([[47,5], [51,5], [51,16]]);
var piscina4 = POLYLINE([[51,16], [47,16], [47,5]]);
var piscinaPiccola = STRUCT([piscina3, piscina4]);
COLOR([0,0,0])(piscinaPiccola);

var floor2D = STRUCT([floor2D, piscinaGrande, piscinaPiccola]);


var muretto1 = POLYLINE([[31,7.5], [32,7.5], [32,13.5]]);
var muretto2 = POLYLINE([[32,13.5], [31,13.5], [31,7.5]]);
var muretto = STRUCT([muretto1, muretto2]);
COLOR([0,0,0])(muretto);

var panchina1 = POLYLINE([[7,14], [22,14], [22,14.7]]);
var panchina2 = POLYLINE([[22,14.7], [7,14.7], [7,14]]);
var panchina3 = POLYLINE([[10.75,14], [10.75,14.7]]);
var panchina4 = POLYLINE([[14.5,14], [14.5,14.7]]);
var panchina5 = POLYLINE([[18.25,14], [18.25,14.7]]);
var panchina = STRUCT([panchina1, panchina2, panchina3, panchina4, panchina5]);
COLOR([0,0,0])(panchina);

var scala1 = POLYLINE([[36,1], [39,1], [39,4]]);
var scala2 = POLYLINE([[39,4], [36,4], [36,1]]);
var scala3 = POLYLINE([[36.5,1], [36.5,4]]);
var scala4 = POLYLINE([[37,1], [37,4]]);
var scala5 = POLYLINE([[37.5,1], [37.5,4]]);
var scala6 = POLYLINE([[38,1], [38,4]]);
var scala7 = POLYLINE([[38.5,1], [38.5,4]]);
var scala = STRUCT([scala1, scala2, scala3, scala4, scala5, scala6, scala7]);
COLOR([0,0,0])(scala);

floor2D = STRUCT([floor2D, muretto, panchina, scala]);

DRAW(floor2D);