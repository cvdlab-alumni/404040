// collegarsi al sito: http://www.dia.uniroma3.it/~cvdlab/plasm.js/


// dominio monodimensionale
var retta = DOMAIN([[1,5]])(4);

// dominio bidimensionale
var piano = DOMAIN([[1.5,5.5],[1,3]])([4,2]);

// dominio tridimensionale
var piano3D = DOMAIN([[1.5,5.5],[1,3],[0,1]])([4,2,1]);

// DRAW(retta); disegna l'oggetto retta
// HIDE(retta); nasconde l'oggetto retta
// SHOW(retta); rimostra l'oggetto retta
// COLOR(R,G,B)(retta); colora l'oggetto retta in base ai valori (esadecimali) R, G, B




var domain = DOMAIN([[0,1]])([10]);	// divide il segmento (0,1) in 10 intervalli

var mapping = function (p) {	// p è un array ad m dimensioni (m coordinate) rappresentante un punto del dominio
	var u = p[0];
	return [u, 1];
};

var mapped = MAP(mapping)(domain);	// MAP applica la funzione mapping su tutti i punti del
									// dominio domain, e ritorna un nuovo dominio