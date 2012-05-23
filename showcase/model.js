/****************************************
*										*
*	Modello: Posacenere con sigaretta	*
*	Autore: Dario D'agostino			*
*										*
*****************************************/

var domain2 = DOMAIN([[0,1],[0,1]])([15,30]);

var grigio = [47/255, 47/255, 47/255];		//grigio scuro
var azzurro = [0/255, 149/255, 182/255];	//azzurro fiordaliso
var blu = [0/255, 0/255, 255/255];			//blu
var bianco = [254/255, 254/255, 233/255];	//bianco di zinco
var marrone = [150/255, 75/255, 0/255];		//marrone




/*********************** posacenere ******************/
var c1 = CUBIC_HERMITE(S0)([[0.05,0,0.3],[0,0,0.22],[0,0,-0.1],[-0.1,0,0]]); 		//mezzo scavo esterno
var c2 = CUBIC_HERMITE(S0)([[0.04,0.05,0.3],[0,0.05,0.22],[0,0,-0.1],[-0.1,0,0]]);	//mezzo scavo interno
var c1c2 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0], [0,0,0]]);
var surfacec1c2 = MAP(c1c2)(domain2);

var c3 = CUBIC_HERMITE(S0)([[0.05,0,0.3],[0.5,0.45,0.3],[0.7,0,0],[0,0.7,0]]);		//linea sopra esterna
var c4 = CUBIC_HERMITE(S0)([[0.04,0.05,0.3],[0.45,0.46,0.3],[0.6,0,0],[0,0.6,0]]);	//linea sopra interna
var c3c4 = CUBIC_HERMITE(S1)([c3,c4,[0,0,0], [0,0,0]]);
var surfacec3c4 = MAP(c3c4)(domain2);

var c5 = CUBIC_HERMITE(S0)([[0.5,0.45,0.3],[0.5,0.5,0.22],[0,0,-0.1],[0,0.1,0]]);	//mezzo scavo esterno (destra)
var c6 = CUBIC_HERMITE(S0)([[0.45,0.46,0.3],[0.45,0.5,0.22],[0,0,-0.1],[0,0.1,0]]);	//mezzo scavo interno (destra)
var c5c6 = CUBIC_HERMITE(S1)([c5,c6,[0,0,0], [0,0,0]]);
var surfacec5c6 = MAP(c5c6)(domain2);

var bordoSopra = COLOR(grigio)(STRUCT([surfacec1c2,surfacec3c4,surfacec5c6]));




var g1 = CUBIC_HERMITE(S0)([[0.05,0.002,0.05],[0,0,0.05],[0,0,0],[0,0,0]]);	//linea sotto scavo esterno
var c1g1 = CUBIC_HERMITE(S1)([c1,g1,[0,0,0], [0,0,0]]);
var surfacec1g1 = MAP(c1g1)(domain2);

var g3 = CUBIC_HERMITE(S0)([[0.05,0.002,0.05],[0.498,0.45,0.05],[0.7,0,0],[0,0.7,0]]);	//linea sotto linea sopra esterna
var c3g3 = CUBIC_HERMITE(S1)([c3,g3,[0,0,0], [0,0,0]]);
var surfacec3g3 = MAP(c3g3)(domain2);

var g5 = CUBIC_HERMITE(S0)([[0.498,0.45,0.05],[0.5,0.5,0.05],[0,0,0],[0,0,0]]);	//linea sotto scavo esterno (destra)
var c5g5 = CUBIC_HERMITE(S1)([c5,g5,[0,0,0], [0,0,0]]);
var surfacec5g5 = MAP(c5g5)(domain2);

var latoEsterno = COLOR(blu)(STRUCT([surfacec1g1,surfacec3g3,surfacec5g5]));




var g2 = CUBIC_HERMITE(S0)([[0.04,0.052,0.1],[0,0.05,0.1],[0,0,0],[0,0,0]]);	//linea sotto scavo interno
var c2g2 = CUBIC_HERMITE(S1)([c2,g2,[0,0,0], [0,0,0]]);
var surfacec2g2 = MAP(c2g2)(domain2);

var g4 = CUBIC_HERMITE(S0)([[0.04,0.052,0.1],[0.448,0.46,0.1],[0.62,0,0],[0,0.62,0]]);	//linea sotto linea sopra interna
var c4g4 = CUBIC_HERMITE(S1)([c4,g4,[0,0,0], [0,0,0]]);
var surfacec4g4 = MAP(c4g4)(domain2);

var g6 = CUBIC_HERMITE(S0)([[0.448,0.46,0.1],[0.45,0.5,0.1],[0,0,0],[0,0,0]]);	//linea sotto scavo interno (destra)
var c6g6 = CUBIC_HERMITE(S1)([c6,g6,[0,0,0], [0,0,0]]);
var surfacec6g6 = MAP(c6g6)(domain2);

var latoInterno = COLOR(azzurro)(STRUCT([surfacec2g2,surfacec4g4,surfacec6g6]));




var m1 = CUBIC_HERMITE(S0)([[0.04,0.052,0],[0,0.05,0],[0,0,0],[0,0,0]]);			//base sotto scavo esterno
var g1m1 = CUBIC_HERMITE(S1)([g1,m1,[0,0,0], [0,0,0]]);
var surfaceg1m1 = MAP(g1m1)(domain2);

var m3 = CUBIC_HERMITE(S0)([[0.04,0.052,0],[0.448,0.46,0],[0.62,0,0],[0,0.62,0]]);	//base sotto linea sopra esterna
var g3m3 = CUBIC_HERMITE(S1)([g3,m3,[0,0,0], [0,0,0]]);
var surfaceg3m3 = MAP(g3m3)(domain2);

var m5 = CUBIC_HERMITE(S0)([[0.448,0.46,0],[0.45,0.5,0],[0,0,0],[0,0,0]]);			//base sotto scavo esterno (destra)
var g5m5 = CUBIC_HERMITE(S1)([g5,m5,[0,0,0], [0,0,0]]);
var surfaceg5m5 = MAP(g5m5)(domain2);

var bordoEsterno = COLOR(blu)(STRUCT([surfaceg1m1,surfaceg3m3,surfaceg5m5]));




var m2 = CUBIC_HERMITE(S0)([[0.04,0.102,0.05],[0,0.1,0.05],[0,0,0],[0,0,0]]);				//base sotto scavo interno
var g2m2 = CUBIC_HERMITE(S1)([g2,m2,[0,0,0], [0,0,0]]);
var surfaceg2m2 = MAP(g2m2)(domain2);

var m4 = CUBIC_HERMITE(S0)([[0.04,0.102,0.05],[0.398,0.46,0.05],[0.54,0,0],[0,0.54,0]]);	//base sotto linea sopra interna
var g4m4 = CUBIC_HERMITE(S1)([g4,m4,[0,0,0], [0,0,0]]);
var surfaceg4m4 = MAP(g4m4)(domain2);

var m6 = CUBIC_HERMITE(S0)([[0.398,0.46,0.05],[0.4,0.5,0.05],[0,0,0],[0,0,0]]);			//base sotto scavo interno (destra)
var g6m6 = CUBIC_HERMITE(S1)([g6,m6,[0,0,0], [0,0,0]]);
var surfaceg6m6 = MAP(g6m6)(domain2);

var bordoInterno = COLOR(azzurro)(STRUCT([surfaceg2m2,surfaceg4m4,surfaceg6m6]));




var specialPoint1 = CUBIC_HERMITE(S0)([[0,0.5,0],[0,0.5,0],[0,0,0],[0,0,0]]);	//punto per raccordare la base esterna

var b1 = CUBIC_HERMITE(S1)([m1,specialPoint1,[0,0,0], [0,0,0]]);
var surfacem1specialPoint1 = MAP(b1)(domain2);

var b3 = CUBIC_HERMITE(S1)([m3,specialPoint1,[0,0,0], [0,0,0]]);
var surfacem3specialPoint1 = MAP(b3)(domain2);

var b5 = CUBIC_HERMITE(S1)([m5,specialPoint1,[0,0,0], [0,0,0]]);
var surfacem5specialPoint1 = MAP(b5)(domain2);

var baseEsterna = COLOR(blu)(STRUCT([surfacem1specialPoint1,surfacem3specialPoint1,surfacem5specialPoint1]));




var specialPoint2 = CUBIC_HERMITE(S0)([[0,0.5,0.05],[0,0.5,0.05],[0,0,0],[0,0,0]]);	//punto per raccordare la base interna

var b2 = CUBIC_HERMITE(S1)([m2,specialPoint2,[0,0,0], [0,0,0]]);
var surfacem2specialPoint2 = MAP(b2)(domain2);

var b4 = CUBIC_HERMITE(S1)([m4,specialPoint2,[0,0,0], [0,0,0]]);
var surfacem4specialPoint2 = MAP(b4)(domain2);

var b6 = CUBIC_HERMITE(S1)([m6,specialPoint2,[0,0,0], [0,0,0]]);
var surfacem6specialPoint2 = MAP(b6)(domain2);

var baseInterna = COLOR(azzurro)(STRUCT([surfacem2specialPoint2,surfacem4specialPoint2,surfacem6specialPoint2]));




var primoQartoDiPosacenere = STRUCT([bordoSopra,latoEsterno,latoInterno,bordoEsterno,bordoInterno,baseEsterna,baseInterna]);
var secondoQuartoDiPosacenere = T([0,1])([-0.5,0.5])(R([0,1])([-PI/2])(primoQartoDiPosacenere));
var primaMetaPosacenere = STRUCT([primoQartoDiPosacenere,secondoQuartoDiPosacenere]);
var secondaMetaPosacenere = T([1])([1])(R([0,1])([PI])(primaMetaPosacenere));
var posacenere = STRUCT([primaMetaPosacenere,secondaMetaPosacenere]);




/*********************** sigaretta ********************/
var s1 = CUBIC_HERMITE(S0)([[0,0,0],[0,0.1,0],[0,0,0.2],[0,0,-0.2]]); 
var s2 = CUBIC_HERMITE(S0)([[0.72,0,0],[0.72,0.1,0],[0,0,0.2],[0,0,-0.2]]);
var s1s2 = CUBIC_HERMITE(S1)([s1,s2,[0,0,0], [0,0,0]]);
var colonna1 = MAP(s1s2)(domain2);
var colonna2 = T([0])([0.72])(R([0,2])([PI])(colonna1));
var colonna = STRUCT([colonna1,colonna2]);



var s3 = CUBIC_HERMITE(S0)([[1,0,0],[1,0.1,0],[0,0,0.2],[0,0,-0.2]]);
var s2s3 = CUBIC_HERMITE(S1)([s2,s3,[0,0,0], [0,0,0]]);
var filtro1 = MAP(s2s3)(domain2);
var filtro2 = T([0])([1.72])(R([0,2])([PI])(filtro1));
var filtro = STRUCT([filtro1,filtro2]);



var t1 = CUBIC_HERMITE(S0)([[0,0,0],[0,0.1,0],[0,0,0.2],[0,0,-0.2]]);
var t2 = CUBIC_HERMITE(S0)([[0,0,0],[0,0.1,0],[0,0,-0.2],[0,0,0.2]]);
var t1t2 = CUBIC_HERMITE(S1)([t1,t2,[0,0,0], [0,0,0]]);
var baseColonna = MAP(t1t2)(domain2);



var t3 = CUBIC_HERMITE(S0)([[1,0,0],[1,0.1,0],[0,0,0.2],[0,0,-0.2]]);
var t4 = CUBIC_HERMITE(S0)([[1,0,0],[1,0.1,0],[0,0,-0.2],[0,0,0.2]]);
var t3t4 = CUBIC_HERMITE(S1)([t3,t4,[0,0,0], [0,0,0]]);
var baseFiltro = MAP(t3t4)(domain2);



var sigaretta = T([0,1,2])([-0.14,0.45,0.09])(R([0,2])([-PI/10])(STRUCT([
												COLOR(bianco)(colonna),
												COLOR(marrone)(filtro),
												COLOR(marrone)(baseColonna),
												COLOR(bianco)(baseFiltro)
												])));



/************ scmodel: posacenere con sigaretta **************/
var modello = STRUCT([posacenere, sigaretta]);
var scmodel = S([0,1,2])([2,2,2])(modello);
//DRAW(scmodel);