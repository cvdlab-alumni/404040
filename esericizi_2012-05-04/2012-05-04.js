//se mescoliamo due superfici otteniamo un solido

//disegniamo una hermit cubica, e chiamiamola c1
var domain1 = INTERVALS(1)(30);	//intervallo unitario, diviso in 30 parti
var controlPoints1 = [[1,0], [0,1], [0,1], [-1,0]];		//p0, p1, t0, t1
var c1 = CUBIC_HERMITE(S0)(controlPoints1);	//c1 è la curva; c1 è la funzione vettoriale di un parametro
var curve1 = MAP(c1)(domain1);	//curve1 è l'immagine della curva
DRAW(curve1);

//ora aumentiamo il modulo della tangente per fare la curva più tonda
var controlPoints1 = [[1,0], [0,1], [0,2], [-2,0]];
var c1 = CUBIC_HERMITE(S0)(controlPoints1);
var curve1 = MAP(c1)(domain1);
DRAW(curve1);

//ora disegniamo un'altra curva uguale, ma più grande
var controlPoints2 = [[2,0], [0,2], [0,4], [-4,0]];
var c2 = CUBIC_HERMITE(S0)(controlPoints2);
var curve2 = MAP(c2)(domain1);
DRAW(curve2);

var struct = STRUCT([curve1, curve2]);
//DRAW(struct);

//adesso usiamo queste due curve (c1 e c2) come parametri per la funzione di BEZIER.
//usiamo BEZIER in modo transfinito: diamo come primo argomento S1 (e non S0),
//									 e come secondo argomento le due curve ([c1,c2]).
//Nota: con due punti generavamo un segmento; ora con due curve generiamo una superficie.
var domain2 = DOMAIN([[0,1],[0,1]])([15,30]);	//dividiamo la x in 15 intervalli e la y in 30
var s12b = BEZIER(S1)([c1, c2]);
var surface12b = MAP(s12b)(domain2);
DRAW(surface12b);
//DRAW(SKELETON(1)(surface12b));


//galleria
var controlPoints1h = [[1,0,0], [0,1,0], [0,2,0], [-2,0,0]];
var controlPoints2h = [[2,0,0], [0,2,0], [0,4,0], [-4,0,0]];
var c1h = CUBIC_HERMITE(S0)(controlPoints1h);
var c2h = CUBIC_HERMITE(S0)(controlPoints2h);
var s12h = CUBIC_HERMITE(S1)([c1h,c2h,[0,0,3], [0,0,-3]]);
var surface12h = MAP(s12h)(domain2);
DRAW(surface12h);

//proviamo a mettere il secondo vettore positivo: la superificie si ripiega
var s12h = CUBIC_HERMITE(S1)([c1h,c2h,[0,0,3], [0,0,3]]);
var surface12h = MAP(s12h)(domain2);
DRAW(surface12h);



/************************************************************************************/


var domain1 = INTERVALS(1)(30);

//adesso generiamo un semplice profilo alare (wing)
var puntiControllo = [[10,0,0], [0,5,0], [0,-3,0], [5,2,0], [10,0,0]];
var c1 = BEZIER(S0)(puntiControllo);
var curve1 = MAP(c1)(domain1);
DRAW(curve1);



//POLYPOINT: prende in ingresso un array di punti e restituisce un complesso simpliciale fatto solo di quei punti
var p0 = [[10,0,0], [0,5,0], [0,-3,0], [5,2,0], [10,0,0]];

function POLYPOINT(points) {
	return SIMPLICIAL_COMPLEX(points)([[0], [1], [2], [3], [4]]);
}

var p1 = COLOR([1,0,0])(POLYPOINT(p0));
DRAW(p1);	//sono piccoli ma ci sono


//adesso rendiamo la funzione generica
var POLYPOINT = function (points) {
	return SIMPLICIAL_COMPLEX(points)(points.map(function(p, i) {
		return [i];
	}));
}



//adesso trasliamo
var p0 = [[10,0,0], [0,5,0], [0,-3,0], [5,2,0], [10,0,0]];
var p1 = p0.map(function(p) {return [p[0], p[1], p[2]+10]});
var p2 = p0.map(function(p) {return [p[0], p[1], p[2]+20]});
var p3 = p0.map(function(p) {return [p[0], p[1], p[2]+30]});
var p4 = p0.map(function(p) {return [p[0], p[1], p[2]+40]});

var c0 = BEZIER(S0)(p0);
var c1 = BEZIER(S0)(p0);
var c2 = BEZIER(S0)(p1);
var c3 = BEZIER(S0)(p2);
var c4 = BEZIER(S0)(p3);

//var curvesPoints = STRUCT(CONS(AA(MAP)([c0,c1,c2,c3,c4]))(domain1));
var curvesPoints = STRUCT(AA(POLYPOINT)([p0,p1,p2,p3,p4]));
DRAW(curvesPoints);



var wing = BEZIER(S1)([c0,c1,c2,c3,c4]);	//generiamo la superificie
var surf = MAP(wing)(domain2); 	//generiamo l'mmagine della superificie
DRAW(surf);		//sembra l'ala di un aereo

/*adesso prova a farlo mettendo:
var p1 = p0.map(function(p) {return [p[0], p[1], p[2]+10]});
var p2 = p0.map(function(p) {return [p[0], p[1]-5, p[2]+20]});	<-- questo cambia
var p3 = p0.map(function(p) {return [p[0], p[1]+5, p[2]+30]});	<-- questo cambia
var p4 = p0.map(function(p) {return [p[0], p[1], p[2]+40]});
*/



/************************************************************************************/



var domain1 = INTERVALS(1)(15);
var domain2 = DOMAIN([[0,1],[0,1]])([15,30]);


//NUBS(S0)(2)		è una b-spline di 2° grado (cioè interpola i punti medi dei segmenti)
var controls1 = [[0,0], [2,5], [7,3], [9,7], [12,2]];
var knots1 = [0,0,0,1,2,3,3,3];
var c1 = NUBS(S0)(2)(knots1)(controls1);
var curve1 = MAP(c1)(domain1);
DRAW(curve1);
//rifalla cambiando controls1
var controls1 = [[0,0,0], [2,5,0], [7,3,0], [9,7,0], [12,2,0]];
var knots1 = [0,0,0,1,2,3,3,3];
var c1 = NUBS(S0)(2)(knots1)(controls1);
var curve1 = MAP(c1)(domain1);
DRAW(curve1);


var controls2 = [[0,0,0], [2,5,3], [7,3,6], [9,7,-2], [12,2,-3]];
var knots2 = [0,0,0,1,2,3,3,3];
var c2 = NUBS(S0)(2)(knots2)(controls2);
var curve2 = MAP(c2)(domain2);
DRAW(curve2);


var s12 = BEZIER(S1)([c1,c2]);
var surf = MAP(s12)(domain2);
DRAW(surf);