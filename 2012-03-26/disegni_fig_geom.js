var domain = DOMAIN([[0,1]])([10]);	//divide il segmento (0,1) in 10 intervalli

var mapping = function (p) {	//p è l'i-esimo punto del dominio
	var u = p[0];

	return [u, 1];
};

var mapped = MAP(mapping)(domain);	//MAP applica la funzione mapping su tutti i punti del dominio domain




//esercizio: disegnare la bisettrice del primo quadrante
var bisettrice = function (p) {
	var u = p[0];
	return [u, u];
};



//disegnare una sinudoide
var domain2 = DOMAIN([[0,2*PI]])([36]);

var mapping2 = function(p) {
	var u = p[0];
	return [u, SIN(u)];
}

var sinusoide = MAP(mapping2)(domain2);
DRAW(sinusoide);
COLOR([0,0,0])(sinusoide);



//esercizio: disegnare una circonferenza di raggio r
var mapping3 = function(p) {
	var u = p[0];
	return [r*COS(??), r*SIN(??)];
}

var drawCircle(r, n) = function {	//r=raggio	n=numero di intervalli
	var domain3 = DOMAIN([[0,2*PI]])([n]);
	var mapped3 = MAP(mapping3)(domain3);	
	DRAW(mapped3);
	COLOR([0,0,0])(mapped3);
};






//esercizio: disegnare un cilindro di raggio r, altezza h
var mapping4 = function(p) {
	var u = p[0];	// 0-2PI
	var v = p[1];	// 0-h
	return [r*COS(??), r*SIN(??), v];
}

var drawCylinder(r, h, m, n, color) = function {
	var domain4 = DOMAIN([[0,2*PI]])([n]);
	var mapped4 = MAP(mapping4)(domain4);	
	DRAW(mapped4);
	COLOR([0,0,0])(mapped4);
};





//esercizio: disegnare una sfera
var mapping5 = function(p) {
	var u = p[0];	// 0-2PI
	var v = p[1];	// 0-h
	return [r*COS(??), r*SIN(??), v];
}

var drawSfera(r, h, m, n, color) = function {
	var domain5 = DOMAIN([[0,2*PI]])([n]);
	var mapped5 = MAP(mapping5)(domain5);	
	DRAW(mapped5);
	COLOR([0,0,0])(mapped5);
};