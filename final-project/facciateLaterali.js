var avorioMuro = [1,1,0.941];	//avorio: FFFFF0
var oroCornice = [0.855,0.647,0.125];	//oro vivo: DAA520
var azzurroTrasparente = [0,1,1,0.4];	//ciano: 00FFFF
var marroneCornicePortone = [0.753,0.251,0];	//mogano: C04000
var grigioPortone = [0.576,0.576,0.576];	//grigio 40%: 8F8F8F
var grigioPorta = [0.184,0.184,0.184];	//grigio 80%: 2F2F2F
var marroneCornicione = [0.804,0.521,0.247];	//marrone chiaro: CD853F
var bianco = [0.996,0.996,0.914];	//bianco di zinco: FEFEE9
var marronePietra = [0.596,0.463,0.329];	//marrone pastello: 987654
var rosaColonne = [1,0.6,0.4]	//rosa arancio: FF9966
var rossoTetti = [0.823,0.121,0.106]	//rosso pompeiano: D21F1B

var domain1 = INTERVALS(1)(30);
var domain2 = DOMAIN([[0,1],[0,1]])([10,25]);
var domain3 = DOMAIN([[0,1],[0,1],[0,1]])([1,1,1]);




/*************************************************************************************************************************
*	Ritorna il muro laterale inferiore, alto 3, largo 0.5, con lo spigolo in basso a destra di coordinate x=8.25, y=0, z=0
*************************************************************************************************************************/
var getMuroLaterale_Inferiore = function(){
	var muroAlfa = STRUCT([	SIMPLEX_GRID([[-7.75,0.5],[0.75,-0.9,3,-0.9,3,-0.9,0.75],[3]]),
							SIMPLEX_GRID([[-7.75,0.5],[-0.75,0.9],[-2.8,0.2]]),
							SIMPLEX_GRID([[-7.75,0.5],[-4.65,0.9,-3,0.9],[1.55,-1.25,0.2]])
							]);
	var muro = COLOR(bianco)(STRUCT([muroAlfa, S([0])([-1])(muroAlfa)]));

	//finestre
	var corniceAlfa = STRUCT([	SIMPLEX_GRID([[-7.75,0.4],[-4.65,0.9,-3,0.9],[-1.55,0.075,-1.1,0.075]]),	//corniceOrizzontale
								SIMPLEX_GRID([[-7.75,0.4],[-4.65,0.075,-0.3,0.15,-0.3,0.075,-3,0.075,-0.3,0.15,-0.3,0.075],[-1.625,1.1]])	//corniceVerticale
								]);
	var cornice = COLOR(oroCornice)(STRUCT([corniceAlfa, S([0])([-1])(corniceAlfa)]));
	var vetroAlfa = SIMPLEX_GRID([[-7.75,0.3],[-4.725,0.3,-0.15,0.3,-3.15,0.3,-0.15,0.3],[-1.625,1.1]]);
	var vetro = COLOR(azzurroTrasparente)(STRUCT([vetroAlfa, S([0])([-1])(vetroAlfa)]));
	var finestre = STRUCT([cornice,vetro]);

	//porta
	var portaAlfa = SIMPLEX_GRID([[-7.75,0.4],[-0.75,0.9],[2.8]]);
	var porta = COLOR(grigioPorta)(STRUCT([portaAlfa, S([0])([-1])(portaAlfa)]));
		
	var muroInferiore = STRUCT([muro,finestre,porta]);
	return muroInferiore;
};




/*******************************************************************************************
*	Ritorna il cornicione laterale che sta alla base, alto 0.35+0.5+0.4+0.1=1.35 da terra,
*	il cui spigolo in basso a destra (quello più grande) ha coordinate:  x=8.45, y=0, z=0.
*	Ritorna anche gli scalini della porta.
********************************************************************************************/
var getCornicioneLaterale_AllaBase = function(){
	var scaliniPortaAlfa = STRUCT([	SIMPLEX_GRID([[-8.15,0.1],[-0.75,0.9],[0.45]]),
									SIMPLEX_GRID([[-8.25,0.1],[-0.75,0.9],[0.3]]),
									SIMPLEX_GRID([[-8.35,0.1],[-0.75,0.9],[0.15]])
									]);
	var scaliniPorta = COLOR(bianco)(STRUCT([scaliniPortaAlfa, S([0])([-1])(scaliniPortaAlfa)]));


	var parteDritta = STRUCT([	SIMPLEX_GRID([[-8.25,0.2],[0.75,-0.9,8.55],[0.35]]),
								SIMPLEX_GRID([[-8.25,0.15],[0.75,-0.9,8.55],[-0.35,0.5]]),
								SIMPLEX_GRID([[-8.25,0.1],[0.75,-0.9,8.55],[-0.85,0.4]])
								]);
	//parte spigolosa
	var c1 = BEZIER(S0)([[8.35,0,1.25],[8.25,0,1.35]]);
	var c2 = BEZIER(S0)([[8.35,0.75,1.25],[8.25,0.75,1.35]]);
	var c1c2 = BEZIER(S1)([c1,c2]);
	var c3 = BEZIER(S0)([[8.35,0.75,1.25],[8.25,0.75,1.25]]);	//parte per chiusura vicino porta
	var c2c3 = BEZIER(S1)([c2,c3]);

	var c4 = BEZIER(S0)([[8.35,1.65,1.25],[8.25,1.65,1.35]]);
	var c5 = BEZIER(S0)([[8.35,10.2,1.25],[8.25,10.2,1.35]]);
	var c4c5 = BEZIER(S1)([c4,c5]);
	var c6 = BEZIER(S0)([[8.35,1.65,1.25],[8.25,1.65,1.25]]);	//parte per chiusura vicino porta
	var c4c6 = BEZIER(S1)([c4,c6]);
	
	var parteSpigolosa = STRUCT([	MAP(c1c2)(domain2),
									MAP(c2c3)(domain2),
									MAP(c4c5)(domain2),
									MAP(c4c6)(domain2)
								]);

	var cornicioneAlfa = STRUCT([parteDritta,parteSpigolosa]);
	var cornicioneBeta = COLOR(marronePietra)(STRUCT([cornicioneAlfa, S([0])([-1])(cornicioneAlfa)]));
	var cornicione = STRUCT([scaliniPorta,cornicioneBeta]);
	return cornicione;		
};




/**************************************************************************************************
*	Ritorna il cornicione laterale inferiore, alto 3 da terra, largo 0.4+0.15=0.55, il cui spigolo
*	in basso a destra (quello più grande) ha coordinate:  x=8.3, y=0, z=3
**************************************************************************************************/
var getCornicioneLaterale_Inferiore = function(){
	var parteDritta = STRUCT([	SIMPLEX_GRID([[-7.75,0.55],[10.2],[-3,0.25]]),
								SIMPLEX_GRID([[-7.75,0.5],[10.2],[-3.25,0.25]]),
								SIMPLEX_GRID([[-7.75,0.45],[10.2],[-3.5,0.25]])
								]);
	//parte spigolosa	
	var c1 = BEZIER(S0)([[8.2,0,3.75],[8.15,0,3.75],[8.15,0,3.85]]);
	var c2 = BEZIER(S0)([[8.2,10.2,3.75],[8.15,10.2,3.75],[8.15,10.2,3.85]]);
	var c1c2 = BEZIER(S1)([c1,c2]);
	var parteSpigolosa = MAP(c1c2)(domain2);

	var cornicioneInferioreAlfa = STRUCT([parteDritta,parteSpigolosa]);
	var cornicioneInferiore = COLOR(marronePietra)(STRUCT([cornicioneInferioreAlfa, S([0])([-1])(cornicioneInferioreAlfa)]));
	return cornicioneInferiore;
};




/*********************************************************************************************************
*	Ritorna il muro laterale centrale, con lo spigolo in basso a destra di coordinate x=8.15, y=0, z=3.85
**********************************************************************************************************/
var getMuroLaterale_Centrale = function(){
	var muroAlfa = STRUCT([	SIMPLEX_GRID([[-7.75,0.4],[0.75,-0.9,3,-0.9,3,-0.9,0.75],[-3.85,3.95]]),
							SIMPLEX_GRID([[-7.75,0.4],[-0.75,0.9,-3,0.9],[-3.85,0.1,-2.1,1.75]]),
							SIMPLEX_GRID([[-7.75,0.4],[-8.55,0.9],[-3.85,0.1,-2.1,1.05,-0.6,0.1]])
							]);
	var muro = COLOR(avorioMuro)(STRUCT([muroAlfa, S([0])([-1])(muroAlfa)]));

	//finestre grandi
	var corniceGrandeAlfa = STRUCT([SIMPLEX_GRID([[-7.75,0.3],[-0.75,0.9,-3,0.9,-3,0.9],[-3.95,0.075,-0.9,0.15,-0.9,0.075]]),	//corniceOrizzontale
									SIMPLEX_GRID([[-7.75,0.3],[-0.75,0.075,-0.3,0.15,-0.3,0.075,-3,0.075,-0.3,0.15,-0.3,0.075,-3,0.075,-0.3,0.15,-0.3,0.075],[-4.025,0.9,-0.15,0.9]])	//corniceVerticale
									]);
	var corniceGrande = COLOR(oroCornice)(STRUCT([corniceGrandeAlfa, S([0])([-1])(corniceGrandeAlfa)]));
	var vetroGrandeAlfa = SIMPLEX_GRID([[-7.75,0.2],[-0.825,0.3,-0.15,0.3,-3.15,0.3,-0.15,0.3,-3.15,0.3,-0.15,0.3],[-4.025,0.9,-0.15,0.9]]);
	var vetroGrande = COLOR(azzurroTrasparente)(STRUCT([vetroGrandeAlfa, S([0])([-1])(vetroGrandeAlfa)]));
	var finestreGrandi = STRUCT([corniceGrande,vetroGrande]);

	//finestra piccola
	var cornicePiccolaAlfa = STRUCT([	SIMPLEX_GRID([[-7.75,0.3],[-8.55,0.9],[-7.1,0.075,-0.45,0.075]]),	//corniceOrizzontale
										SIMPLEX_GRID([[-7.75,0.3],[-8.55,0.075,-0.3,0.15,-0.3,0.075],[-7.175,0.45]])	//corniceVerticale
										]);
	var cornicePiccola = COLOR(oroCornice)(STRUCT([cornicePiccolaAlfa, S([0])([-1])(cornicePiccolaAlfa)]));
	var vetroPiccoloAlfa = SIMPLEX_GRID([[-7.75,0.2],[-8.625,0.3,-0.15,0.3],[-7.175,0.45]]);
	var vetroPiccolo = COLOR(azzurroTrasparente)(STRUCT([vetroPiccoloAlfa, S([0])([-1])(vetroPiccoloAlfa)]));
	var finestraPiccola = STRUCT([cornicePiccola,vetroPiccolo]);

	var muroInferiore = STRUCT([muro,finestreGrandi,finestraPiccola]);
	return muroInferiore; 
};




/**********************************************************************************
*	Ritorna il cornicione laterale centrale, alto 7.8 da terra, il cui spigolo in
*	alto a destra (quello più grande) ha coordinate: x=8.45, y=0, z=8.7
***********************************************************************************/
var getCornicioneFrontale_Centrale = function(){
	var parteDritta1 = SIMPLEX_GRID([[-7.75,0.45],[10.2],[-7.8,0.25]]);
	var parteDritta2 = SIMPLEX_GRID([[-7.75,0.4],[10.2],[-8.15,0.2]]);
	var parteDritta3 = SIMPLEX_GRID([[-7.75,0.5],[10.2],[-8.35,0.25]]);
	
	var parteDritta11 = STRUCT([parteDritta1, S([0])([-1])(parteDritta1)]);
	var parteDritta22 = STRUCT([parteDritta2, S([0])([-1])(parteDritta2)]);
	var parteDritta33 = STRUCT([parteDritta3, S([0])([-1])(parteDritta3)]);
	
	var parteDritta = (STRUCT([	COLOR(marroneCornicione)(parteDritta11),
								COLOR(avorioMuro)(parteDritta22),
								COLOR(marroneCornicione)(parteDritta33)
							]));
	
	//parte spigolosa inferiore
	var c1 = BEZIER(S0)([[8.2,0,8.05],[8.25,0,8.05],[8.25,0,8.15]]);
	var c2 = BEZIER(S0)([[8.2,10.2,8.05],[8.25,10.2,8.05],[8.25,10.2,8.15]]);
	var c1c2 = BEZIER(S1)([c1,c2]);
	//parte spigolosa inferiore: striscia di chiusura sopra
	var d1 = BEZIER(S0)([[8.25,0,8.15],[8.25,10.2,8.15]]);
	var d2 = BEZIER(S0)([[8.15,0,8.15],[8.15,10.2,8.15]]);
	var d1d2 = BEZIER(S1)([d1,d2]);
	
	var parteSpigolosaInferiore = STRUCT([MAP(c1c2)(domain2),MAP(d1d2)(domain2)]);
		
	//parte spigolosa superiore
	var f1 = BEZIER(S0)([[8.25,0,8.6],[8.3,0,8.6],[8.3,0,8.7]]);
	var f2 = BEZIER(S0)([[8.25,10.2,8.6],[8.3,10.2,8.6],[8.3,10.2,8.7]]);
	var f1f2 = BEZIER(S1)([f1,f2]);
	//parte spigolosa superiore: striscia di chiusura sopra
	var g1 = BEZIER(S0)([[8.3,0,8.7],[8.3,10.2,8.7]]);
	var g2 = BEZIER(S0)([[8.15,0,8.7],[8.15,10.2,8.7]]);
	var g1g2 = BEZIER(S1)([g1,g2]);

	var parteSpigolosaSuperiore = STRUCT([MAP(f1f2)(domain2),MAP(g1g2)(domain2)]);

	var parteSpigolosaAlfa = STRUCT([parteSpigolosaInferiore,parteSpigolosaSuperiore]);
	var parteSpigolosa = COLOR(marroneCornicione)(STRUCT([parteSpigolosaAlfa, S([0])([-1])(parteSpigolosaAlfa)]));													
	
	var cornicione = STRUCT([parteDritta,parteSpigolosa]);
	return cornicione;
};




/*********************************************************************************************************
*	Ritorna il muro laterale superiore, con lo spigolo in basso a destra di coordinate x=8.15, y=0, z=8.7
**********************************************************************************************************/
var getMuroLaterale_Superiore = function(){
	var muroAlfa = STRUCT([	SIMPLEX_GRID([[-7.75,0.4],[0.75,-0.9,3,-0.9,3,-0.9,0.75],[-8.7,1.75]]),
							SIMPLEX_GRID([[-7.75,0.4],[-0.75,0.9,-3,0.9,-3,0.9],[-10.1,0.35]])							
							]);
	var muro = COLOR(avorioMuro)(STRUCT([muroAlfa, S([0])([-1])(muroAlfa)]));

	//finestre
	var corniceAlfa = STRUCT([	SIMPLEX_GRID([[-7.75,0.3],[-0.75,0.9,-3,0.9,-3,0.9],[-8.7,0.075,-1.25,0.075]]),	//corniceOrizzontale
								SIMPLEX_GRID([[-7.75,0.3],[-0.75,0.075,-0.3,0.15,-0.3,0.075,-3,0.075,-0.3,0.15,-0.3,0.075,-3,0.075,-0.3,0.15,-0.3,0.075],[-8.775,1.25]])	//corniceVerticale
								]);
	var cornice = COLOR(oroCornice)(STRUCT([corniceAlfa, S([0])([-1])(corniceAlfa)]));
	var vetroAlfa = SIMPLEX_GRID([[-7.75,0.2],[-0.825,0.3,-0.15,0.3,-3.15,0.3,-0.15,0.3,-3.15,0.3,-0.15,0.3],[-8.775,1.25]]);
	var vetro = COLOR(azzurroTrasparente)(STRUCT([vetroAlfa, S([0])([-1])(vetroAlfa)]));
	var finestre = STRUCT([cornice,vetro]);

	//ringhiere
	var domain = DOMAIN([[0,1],[0,2*PI]])([15,15]);
	var profiloColonnina = BEZIER(S0)([[-0.055,0,8.7],[0.045,0,8.7],[-0.215,0,8.75],[-0.005,0,8.87],[-0.015,0,8.9]]);
	var mapping = ROTATIONAL_SURFACE(profiloColonnina);
	var mezzaColonnina1 = MAP(mapping)(domain);
	var mezzaColonnina2 = T([2])([17.8])(R([0,2])([PI])(mezzaColonnina1));
	var colonnina = STRUCT([mezzaColonnina1,mezzaColonnina2]);
	var ringhieraAlfa = STRUCT([T([0,1])([8.15,0.885])(colonnina),
							T([0,1])([8.15,1.095])(colonnina),
							T([0,1])([8.15,1.305])(colonnina),
							T([0,1])([8.15,1.515])(colonnina),
							SIMPLEX_GRID([[-8.05,0.2],[-0.75,0.9],[-9.1,0.08]])
							]);
	var ringhieraBeta = STRUCT([	ringhieraAlfa,
									T([1])([3.9])(ringhieraAlfa),
									T([1])([7.8])(ringhieraAlfa)
									]);
	var ringhiere = COLOR(bianco)(STRUCT([ringhieraBeta, S([0])([-1])(ringhieraBeta)]));

	var muroSuperiore = STRUCT([muro,finestre,ringhiere]);
	return muroSuperiore;
};




/************************************************************************************
*	Ritorna il cornicione superiore laterale, alto 10.45 da terra, il cui spigolo in
*	alto a destra (quello più grande) ha coordinate: x=8.35, y=0, z=10.75
*************************************************************************************/
var getCornicioneLaterale_Superiore = function(){
	var parteDrittaAlfa = SIMPLEX_GRID([[-7.75,0.4],[10.2],[-10.45,0.1]]);
	var parteDritta = STRUCT([parteDrittaAlfa, S([0])([-1])(parteDrittaAlfa)]);

	//parte spigolosa inferiore
	var c1 = BEZIER(S0)([[8.15,0,10.55],[8.25,0,10.55],[8.25,0,10.65]]);			//curva (no diagonale) sinistra
	var c2 = BEZIER(S0)([[8.15,10.2,10.55],[8.25,10.2,10.55],[8.25,10.2,10.65]]);	//curva (no diagonale) destra
	var c1c2 = BEZIER(S1)([c1,c2]);	
	var parteSpigolosaInferioreAlfa = MAP(c1c2)(domain2);
	var parteSpigolosaInferiore = STRUCT([parteSpigolosaInferioreAlfa, S([0])([-1])(parteSpigolosaInferioreAlfa)]);

	//parte spigolosa superiore
	var f1 = BEZIER(S0)([[8.25,0,10.65],[8.35,0,10.65],[8.35,0,10.75]]);			//curva (no diagonale) sinistra
	var f2 = BEZIER(S0)([[8.25,10.2,10.65],[8.35,10.2,10.65],[8.35,10.2,10.75]]);	//curva (no diagonale) destra
	var f1f2 = BEZIER(S1)([f1,f2]);	
	//parte spigolosa superiore: striscia di chiusura sopra
	var g1 = BEZIER(S0)([[8.35,0,10.75],[8.35,10.2,10.75]]);
	var g2 = BEZIER(S0)([[7.75,0,10.75],[7.75,10.2,10.75]]);
	var g1g2 = BEZIER(S1)([g1,g2]);	
	var parteSpigolosaSuperioreAlfa = STRUCT([MAP(f1f2)(domain2),MAP(g1g2)(domain2)]);
	var parteSpigolosaSuperiore = STRUCT([parteSpigolosaSuperioreAlfa, S([0])([-1])(parteSpigolosaSuperioreAlfa)]);	
	
	var cornicione = COLOR(marroneCornicione)(STRUCT([parteDritta,parteSpigolosaInferiore,parteSpigolosaSuperiore]));
	return cornicione;
};




/****************************************************************************************************
*	Ritorna entrambe le facciate laterali;															*
*	Il muro centrale è largo 0.4 e lungo 10.2;		-->		la x positiva vale 8.15;				*
*	Il muro inferiore è largo 0.5 e lungo 10.2;  	-->		la x positiva vale 8.25;				*
*	Il muro superiore è largo 0.4 e lungo 10.2;		-->		la x positiva vale 8.15;				*
*	Il cornicione alla base è largo 0.7 e lungo 10.2;	-->	la x positiva vale 8.45;				*
*	Il cornicione inferiore è largo 0.55 e lungo 10.2;	-->	la x positiva vale 8.3;					*
*	Il cornicione centrale è largo 0.55 e lungo 10.2;	-->	la x positiva vale 8.3;					*
*	Il cornicione superiore è largo 0.6 e lungo 10.2;	-->	la x positiva vale 8.35					*
*****************************************************************************************************
*	Tutta la facciata quindi è lunga 10.2.															*
*	In realtà, combinata alla facciata frontale e posteriore, la facciata laterale è lunga in		*
*	tutto 11 (se si considera il muro centrale), oppure 11.2 (se si considera il muro inferiore), 	*
*	oppure 11.6 (se si considera il cornicione alla base).											*
*****************************************************************************************************/
var getFacciataLaterale = function(){
	var facciataLateraleAlfa = STRUCT([	getCornicioneLaterale_AllaBase(),
										getMuroLaterale_Inferiore(),
										getCornicioneLaterale_Inferiore(),
										getMuroLaterale_Centrale(),
										getCornicioneFrontale_Centrale(),
										getMuroLaterale_Superiore(),
										getCornicioneLaterale_Superiore()
										]);
	var facciataLaterale = T([1])([0.5])(facciataLateraleAlfa);
	return facciataLaterale;
};

var a = getFacciataLaterale();
DRAW(a); 