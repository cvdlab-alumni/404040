// esercizio: disegnare la bisettrice del primo quadrante
var domain1 = DOMAIN([[0,1]])([10]);

var mapping1 = function (p) {
	var u = p[0];
	return [u, u];
};

var bisettrice = MAP(mapping1)(domain);
DRAW(bisettrice);
COLOR([0,0,0])(bisettrice);




// esercizio: disegnare una sinusoide
var domain2 = DOMAIN([[0,2*PI]])([36]);

var mapping2 = function(p) {
	var u = p[0];
	return [u, SIN(u)];
}

var sinusoide = MAP(mapping2)(domain2);
DRAW(sinusoide);
COLOR([0,0,0])(sinusoide);



// esercizio: disegnare una circonferenza di raggio 1
var domain3 = DOMAIN([[0,2*PI]])([36]);

var mapping3 = function(p) {
	var u = p[0];
	return [1*COS(u), 1*SIN(u)];
}

var circonferenza = MAP(mapping3)(domain3);
DRAW(circonferenza);
COLOR([0,0,0])(circonferenza);

// variante: disegnare una circonferenza di raggio r e con
// dominio diviso in n intervalli(cioè rendere il metodo parametrico)
var drawCircle = function(r, n) {	// r=raggio, n=numero di intervalli
	var domain3 = DOMAIN([[0,2*PI]])([n]);

	var mapping3 = function(p) {
		var u = p[0];
		return [r*COS(u), r*SIN(u)];
		//questo torna la circonferenza centrata nell'origine: se volevamo la stessa circonferenza, ma centrata
		//in un altro punto, ad esempio (2,3), dovevamo scrivere	return [2+r*COS(u), 3+r*SIN(u)]
	};

	var mapped3 = MAP(mapping3)(domain3);	
	DRAW(mapped3);
	COLOR([0,0,0])(mapped3);
};
/*	N.B:
	drawCircle(1, 4) ritorna un quadrato iscritto in una circonferenza di raggio 1
	drawCircle(1, 5) ritorna un pentagono iscritto in una circonferenza di raggio 1
	... e cosi via ...
	più aumento il numero di intervalli e più ci avviciniamo alla circonferenza */




//esercizio: disegnare un cilindro di raggio r, altezza h, e con dominio diviso in n e m intervalli
var drawCylinder = function(r, h, n, m) {
	var domain4 = DOMAIN([[0,2*PI],[0,h]])([n,m]);

	var mapping4 = function(p) {
		var u = p[0];	// da 0 a 2*PI
		var v = p[1];	// da 0 a h
		return [r*COS(u), r*SIN(u), v];
	};

	var mapped4 = MAP(mapping4)(domain4);	
	DRAW(mapped4);
	COLOR([0,0,0])(mapped4);
};
// drawCylinder(2,4,36,2)





//esercizio: disegnare una sfera
var drawSfera = function(r, n) {
	var domain5 = DOMAIN([[0,2*PI],[0,PI]])([n,2*n]);

	var mapping5 = function(p) {
		var u = p[0];	// da 0 a 2*PI
		var v = p[1];	// da 0 ad PI
		return [r*SIN(v)*SIN(u), r*SIN(v)*COS(u), r*COS(v)];
	};

	var mapped5 = MAP(mapping5)(domain5);	
	DRAW(mapped5);
	COLOR([1,1,0])(mapped5);
};
//drawSfera(3,72)