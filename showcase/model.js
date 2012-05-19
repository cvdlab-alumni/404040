
var domain1 = INTERVALS(1)(30);
var domain2 = DOMAIN([[0,1],[0,1]])([20,40]);

var grigio = [47/255, 47/255, 47/255];		//grigio scuro
var azzurro = [0/255, 149/255, 182/255];	//azzurro fiordaliso
var blu = [0/255, 0/255, 255/255];			//blu
var bianco = [254/255, 254/255, 233/255];	//bianco di zinco
var marrone = [150/255, 75/255, 0/255];		//marrone




/*********************** posacenere ******************/
var c1 = CUBIC_HERMITE(S0)([[0.05,0,0.3],[-0.05,0,0.3],[0,0,-0.3],[0,0,0.3]]);  //esterno
var c2 = CUBIC_HERMITE(S0)([[0.04,0.05,0.3],[-0.04,0.05,0.3],[0,0,-0.3],[0,0,0.3]]);    //interno
var c1c2 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0], [0,0,0]]);
var surfacec1c2 = MAP(c1c2)(domain2);

var g1 = CUBIC_HERMITE(S0)([[0.05,0,0.05],[-0.05,0,0.05],[0,0,0],[0,0,0]]);  //esterno
var c1g1 = CUBIC_HERMITE(S1)([c1,g1,[0,0,0], [0,0,0]]);
var surfacec1g1 = MAP(c1g1)(domain2);

var g2 = CUBIC_HERMITE(S0)([[0.04,0.05,0.1],[-0.04,0.05,0.1],[0,0,0],[0,0,0]]);  //interno
var c2g2 = CUBIC_HERMITE(S1)([c2,g2,[0,0,0], [0,0,0]]);
var surfacec2g2 = MAP(c2g2)(domain2);



var c3 = CUBIC_HERMITE(S0)([[0.05,0,0.3],[0.5,0.45,0.3],[0.7,0,0],[0,0.7,0]]);
var c4 = CUBIC_HERMITE(S0)([[0.04,0.05,0.3],[0.44,0.46,0.3],[0.6,0,0],[0,0.6,0]]);
var c3c4 = CUBIC_HERMITE(S1)([c3,c4,[0,0,0], [0,0,0]]);
var surfacec3c4 = MAP(c3c4)(domain2);

var g3 = CUBIC_HERMITE(S0)([[0.05,0,0.05],[0.5,0.45,0.05],[0.7,0,0],[0,0.7,0]]);  //esterno
var c3g3 = CUBIC_HERMITE(S1)([c3,g3,[0,0,0], [0,0,0]]);
var surfacec3g3 = MAP(c3g3)(domain2);

var g4 = CUBIC_HERMITE(S0)([[0.04,0.05,0.1],[0.44,0.46,0.1],[0.6,0,0],[0,0.6,0]]);  //interno
var c4g4 = CUBIC_HERMITE(S1)([c4,g4,[0,0,0], [0,0,0]]);
var surfacec4g4 = MAP(c4g4)(domain2);




var c5 = CUBIC_HERMITE(S0)([[0.5,0.45,0.3],[0.5,0.5,0.22],[0,0,-0.1],[0,0.1,0]]);
var c6 = CUBIC_HERMITE(S0)([[0.44,0.46,0.3],[0.44,0.5,0.22],[0,0,-0.1],[0,0.1,0]]);
var c5c6 = CUBIC_HERMITE(S1)([c5,c6,[0,0,0], [0,0,0]]);
var surfacec5c6 = MAP(c5c6)(domain2);

var g5 = CUBIC_HERMITE(S0)([[0.5,0.45,0.05],[0.5,0.5,0.05],[0,0,0],[0,0,0]]);  //esterno
var c5g5 = CUBIC_HERMITE(S1)([c5,g5,[0,0,0], [0,0,0]]);
var surfacec5g5 = MAP(c5g5)(domain2);

var g6 = CUBIC_HERMITE(S0)([[0.44,0.46,0.1],[0.44,0.5,0.1],[0,0,0],[0,0,0]]);  //interno
var c6g6 = CUBIC_HERMITE(S1)([c6,g6,[0,0,0], [0,0,0]]);
var surfacec6g6 = MAP(c6g6)(domain2);





var c7 = CUBIC_HERMITE(S0)([[-0.05,0,0.3],[-0.5,0.45,0.3],[-0.7,0,0],[0,0.7,0]]);
var c8 = CUBIC_HERMITE(S0)([[-0.04,0.05,0.3],[-0.44,0.46,0.3],[-0.6,0,0],[0,0.6,0]]);
var c7c8 = CUBIC_HERMITE(S1)([c7,c8,[0,0,0], [0,0,0]]);
var surfacec7c8 = MAP(c7c8)(domain2);

var g7 = CUBIC_HERMITE(S0)([[-0.05,0,0.05],[-0.5,0.45,0.05],[-0.7,0,0],[0,0.7,0]]);  //esterno
var c7g7 = CUBIC_HERMITE(S1)([c7,g7,[0,0,0], [0,0,0]]);
var surfacec7g7 = MAP(c7g7)(domain2);

var g8 = CUBIC_HERMITE(S0)([[-0.04,0.05,0.1],[-0.44,0.46,0.1],[-0.6,0,0],[0,0.6,0]]);  //interno
var c8g8 = CUBIC_HERMITE(S1)([c8,g8,[0,0,0], [0,0,0]]);
var surfacec8g8 = MAP(c8g8)(domain2);




var c9 = CUBIC_HERMITE(S0)([[-0.5,0.45,0.3],[-0.5,0.5,0.22],[0,0,-0.1],[0,0.1,0]]);
var c10 = CUBIC_HERMITE(S0)([[-0.44,0.46,0.3],[-0.44,0.5,0.22],[0,0,-0.1],[0,0.1,0]]);
var c9c10 = CUBIC_HERMITE(S1)([c9,c10,[0,0,0], [0,0,0]]);
var surfacec9c10 = MAP(c9c10)(domain2);

var g9 = CUBIC_HERMITE(S0)([[-0.5,0.45,0.05],[-0.5,0.5,0.05],[0,0,0],[0,0,0]]);  //esterno
var c9g9 = CUBIC_HERMITE(S1)([c9,g9,[0,0,0], [0,0,0]]);
var surfacec9g9 = MAP(c9g9)(domain2);

var g10 = CUBIC_HERMITE(S0)([[-0.44,0.46,0.1],[-0.44,0.5,0.1],[0,0,0],[0,0,0]]);  //interno
var c10g10 = CUBIC_HERMITE(S1)([c10,g10,[0,0,0], [0,0,0]]);
var surfacec10g10 = MAP(c10g10)(domain2);




var bordoSopra1 = STRUCT([surfacec1c2,surfacec3c4,surfacec5c6,surfacec7c8,surfacec9c10]);
var bordoSopra2 = T([1])([1])(R([0,1])([PI])(bordoSopra1));
var bordoSopra = STRUCT([bordoSopra1,bordoSopra2]);


var latoEsterno1 = STRUCT([surfacec1g1,surfacec3g3,surfacec5g5,surfacec7g7,surfacec9g9]);
var latoEsterno2 = T([1])([1])(R([0,1])([PI])(latoEsterno1));
var latoEsterno = STRUCT([latoEsterno1,latoEsterno2]);


var latoInterno1 = STRUCT([surfacec2g2,surfacec4g4,surfacec6g6,surfacec8g8,surfacec10g10]);
var latoInterno2 = T([1])([1])(R([0,1])([PI])(latoInterno1));
var latoInterno = STRUCT([latoInterno1,latoInterno2]);





var m1 = CUBIC_HERMITE(S0)([[0.5,0.5,0.05],[-0.5,0.5,0.05],[0,-2,0],[0,2,0]]);  //bordo sotto esterno sopra
var m2 = CUBIC_HERMITE(S0)([[0.45,0.5,0],[-0.45,0.5,0],[0,-1.8,0],[0,1.8,0]]);  //bordo sotto esterno sotto
var m1m2 = CUBIC_HERMITE(S1)([m1,m2,[0,0,0], [0,0,0]]);
var bordoEsternoSotto1 = MAP(m1m2)(domain2);
var bordoEsternoSotto2 = T([1])([1])(R([0,1])([PI])(bordoEsternoSotto1));
var bordoEsternoSotto = STRUCT([bordoEsternoSotto1,bordoEsternoSotto2]);



var m3 = CUBIC_HERMITE(S0)([[0.45,0.5,0.1],[-0.45,0.5,0.1],[0,-1.8,0],[0,1.8,0]]);  //bordo sotto interno sopra
var m4 = CUBIC_HERMITE(S0)([[0.4,0.5,0.05],[-0.4,0.5,0.05],[0,-1.6,0],[0,1.6,0]]);  //bordo sotto interno sotto
var m3m4 = CUBIC_HERMITE(S1)([m3,m4,[0,0,0], [0,0,0]]);
var bordoInternoSotto1 = MAP(m3m4)(domain2);
var bordoInternoSotto2 = T([1])([1])(R([0,1])([PI])(bordoInternoSotto1));
var bordoInternoSotto = STRUCT([bordoInternoSotto1,bordoInternoSotto2]);



//base esterna
var b1 = CUBIC_HERMITE(S0)([[0.45,0.5,0],[-0.45,0.5,0],[0,-1.8,0],[0,1.8,0]]);
var b2 = CUBIC_HERMITE(S0)([[0.45,0.5,0],[-0.45,0.5,0],[0,1.8,0],[0,-1.8,0]]);
var b1b2 = CUBIC_HERMITE(S1)([b1,b2,[0,0,0], [0,0,0]]);
var baseEsterna = MAP(b1b2)(domain2);


//base interna
var b3 = CUBIC_HERMITE(S0)([[0.4,0.5,0.05],[-0.4,0.5,0.05],[0,-1.6,0],[0,1.6,0]]);
var b4 = CUBIC_HERMITE(S0)([[0.4,0.5,0.05],[-0.4,0.5,0.05],[0,1.6,0],[0,-1.6,0]]);
var b3b4 = CUBIC_HERMITE(S1)([b3,b4,[0,0,0], [0,0,0]]);
var baseInterna = MAP(b3b4)(domain2);



var scmodelPosacenere = STRUCT([
								COLOR(azzurro)(latoInterno),
								COLOR(azzurro)(bordoInternoSotto),
								COLOR(azzurro)(baseInterna),
								COLOR(blu)(latoEsterno),
								COLOR(blu)(bordoEsternoSotto),
								COLOR(blu)(baseEsterna),
								COLOR(grigio)(bordoSopra),
								]);






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

var scmodelSigaretta = T([0,1,2])([-0.14,0.45,0.1])(R([0,2])([-PI/10])(STRUCT([
												COLOR(bianco)(colonna),
												COLOR(marrone)(filtro),
												COLOR(marrone)(baseColonna),
												COLOR(bianco)(baseFiltro)
												])));


/************ scmodel: posacenere con sigaretta **************/
var scmodel = STRUCT([scmodelPosacenere, scmodelSigaretta]);
//DRAW(scmodel);