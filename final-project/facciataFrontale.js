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


/*************************************************************************************************************
*	Ritorna il muro frontale centrale, con lo spigolo in basso a destra di coordinate x=8.15, y=0, z=3.85;
*	Il portone (la cornice) ha lo spigolo in basso a destra di coordinate x=1, y=0, z=3.2 (cioè è più basso
*	di 0.65 rispetto al muro);
*	Il tetto del portone sporge sull'asse delle y negative di 0.3
*************************************************************************************************************/
var getMuroFrontale_Centrale = function(){
	var muroBeta = STRUCT([	SIMPLEX_GRID([[-1,1.8,-0.9,2.75,-0.9,0.8],[0.4],[-3.85,3.95]]),
							SIMPLEX_GRID([[-2.8,0.9,-2.75,0.9],[0.4],[-3.85,0.1,-2.1,1.75]]),
							SIMPLEX_GRID([[1],[0.4],[-6.7,1.1]])
							]);
	var muro = COLOR(avorioMuro)(STRUCT([muroBeta, S([0])([-1])(muroBeta)]));

	var corniceBeta = STRUCT([	SIMPLEX_GRID([[-2.8,0.9,-2.75,0.9],[-0.1,0.3],[-3.95,0.075,-0.9,0.15,-0.9,0.075]]),	//corniceOrizzontale
								SIMPLEX_GRID([[-2.8,0.075,-0.3,0.15,-0.3,0.075,-2.75,0.075,-0.3,0.15,-0.3,0.075],[-0.1,0.3],[-4.025,0.9,-0.15,0.9]])	//corniceVerticale
								]);
	var cornice = COLOR(oroCornice)(STRUCT([corniceBeta, S([0])([-1])(corniceBeta)]));

	var vetroBeta = SIMPLEX_GRID([[-2.875,0.3,-0.15,0.3,-2.9,0.3,-0.15,0.3],[-0.2,0.2],[-4.025,0.9,-0.15,0.9]]);
	var vetro = COLOR(azzurroTrasparente)(STRUCT([vetroBeta, S([0])([-1])(vetroBeta)]));
	
	var finestre = STRUCT([cornice,vetro]);

	var portaPortoneBeta = SIMPLEX_GRID([[0.8],[-0.1,0.3],[-3.2,3.3]]);
	var portaPortone = COLOR(grigioPortone)(STRUCT([portaPortoneBeta, S([0])([-1])(portaPortoneBeta)]));
	var cornicePortoneBeta = STRUCT([	SIMPLEX_GRID([[1],[0.4],[-6.5,0.2]]),		//corniceOrizzontale
										SIMPLEX_GRID([[-0.8,0.2],[0.4],[-3.2,3.3]])	//corniceVerticale
										]);
	var cornicePortone = COLOR(marroneCornicePortone)(STRUCT([cornicePortoneBeta, S([0])([-1])(cornicePortoneBeta)]));

	var c1 = BEZIER(S0)([[0,0,6.7],[0,-0.3,6.7],[0,-0.3,7.15]]);		//curva sull'asse y centrale
	var c2 = BEZIER(S0)([[1,0,6.7],[1.2,-0.3,6.7],[1.2,-0.3,7.15]]);	//curva diagonale a destra
	var c3 = BEZIER(S0)([[1,0,6.7],[1.4,0,6.7],[1.4,0,7.15]]);			//curva sull'asse x a destra
	
	var c1c2 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0], [0,0,0]]);
	var c2c3 = CUBIC_HERMITE(S1)([c2,c3,[0.5,0,0], [0,0,0]]);	

	var d1 = BEZIER(S0)([[0,-0.3,7.15],[1.2,-0.3,7.15]]);							//curva tra c1 e c2
	var d2 = CUBIC_HERMITE(S0)([[1.2,-0.3,7.15],[1.4,0,7.15],[0.5,0,0],[0,0,0]]);	//curva tra c2 e c3
	var ps = BEZIER(S0)([[0,0,7.15]]);		//punto speciale (al centro) per raccordare le curve
	var d1ps = CUBIC_HERMITE(S1)([d1,ps,[0,0,0],[0,0,0]]);
	var d2ps = CUBIC_HERMITE(S1)([d2,ps,[0,0,0],[0,0,0]]);	

	var tettoPortoneBeta = STRUCT([	MAP(c1c2)(domain2),
									MAP(c2c3)(domain2),
									MAP(d1ps)(domain2),
									MAP(d2ps)(domain2)
									]);
	var tettoPortone = COLOR(marroneCornicePortone)(STRUCT([tettoPortoneBeta, S([0])([-1])(tettoPortoneBeta)]));

	var portone = STRUCT([portaPortone,cornicePortone,tettoPortone]);

	var muroCentrale = STRUCT([muro,finestre,portone]);
	return muroCentrale;
};




/**********************************************************************************
*	Ritorna il cornicione frontale centrale, alto 7.8 da terra, il cui spigolo in
*	alto a destra (quello più grande) ha coordinate: x=8.3, y=0, z=8.7
***********************************************************************************/
var getCornicioneFrontale_Centrale = function(){
	var parteDritta1 = SIMPLEX_GRID([[-4.45,3.75],[-0.1,0.45],[-7.8,0.25]]);
	var parteDritta2 = SIMPLEX_GRID([[-4.45,3.7],[-0.15,0.4],[-8.15,0.2]]);
	var parteDritta3 = SIMPLEX_GRID([[-4.45,3.8],[-0.05,0.5],[-8.35,0.25]]);
	var parteDritta4 = SIMPLEX_GRID([[4.45],[-0.15,0.4],[-7.8,0.9]]);

	var parteDritta11 = STRUCT([parteDritta1, S([0])([-1])(parteDritta1)]);
	var parteDritta22 = STRUCT([parteDritta2, S([0])([-1])(parteDritta2)]);
	var parteDritta33 = STRUCT([parteDritta3, S([0])([-1])(parteDritta3)]);
	var parteDritta44 = STRUCT([parteDritta4, S([0])([-1])(parteDritta4)]);

	var parteDritta = (STRUCT([	COLOR(marroneCornicione)(parteDritta11),
								COLOR(avorioMuro)(parteDritta22),
								COLOR(marroneCornicione)(parteDritta33),
								COLOR(avorioMuro)(parteDritta44)
							]));

	
	//parte spigolosa inferiore
	var c1 = BEZIER(S0)([[8.2,0.1,8.05],[8.25,0.05,8.05],[8.25,0.05,8.15]]);	//curva diagonale a destra
	var c2 = BEZIER(S0)([[4.45,0.1,8.05],[4.5,0.05,8.05],[4.5,0.05,8.15]]);	//curva diagonale vicino colonne
	var c1c2 = BEZIER(S1)([c1,c2]);
	//parte spigolosa inferiore: striscia di chiusura sopra
	var d1 = BEZIER(S0)([[4.5,0.05,8.15],[8.25,0.05,8.15]]);
	var d2 = BEZIER(S0)([[4.35,0.15,8.15],[8.2,0.15,8.15]]);
	var d1d2 = BEZIER(S1)([d1,d2]);
	//parte spigolosa inferiore parte laterale destra
	var c3 = BEZIER(S0)([[8.2,0.55,8.05],[8.25,0.55,8.05],[8.25,0.55,8.15]]);	//curva laterale a destra
	var c1c3 = BEZIER(S1)([c1,c3]);
	//parte spigolosa inferiore parte laterale destra: striscia di chiusura sopra
	var d3 = BEZIER(S0)([[8.25,0.05,8.15],[8.25,0.55,8.15]]);
	var d4 = BEZIER(S0)([[8.15,0.1,8.15],[8.15,0.55,8.15]]);
	var d3d4 = BEZIER(S1)([d3,d4]);
	
	var parteSpigolosaInferioreBeta = STRUCT([	MAP(c1c2)(domain2),
												MAP(d1d2)(domain2),
												MAP(c1c3)(domain2),
												MAP(d3d4)(domain2)
											]);
	var parteSpigolosaInferiore = COLOR(marroneCornicione)(STRUCT([	parteSpigolosaInferioreBeta,
																	S([0])([-1])(parteSpigolosaInferioreBeta)
																]));

	
	//parte spigolosa superiore
	var f1 = BEZIER(S0)([[8.25,0.05,8.6],[8.3,0,8.6],[8.3,0,8.7]]);	//curva diagonale a destra
	var f2 = BEZIER(S0)([[4.65,0.05,8.6],[4.65,0,8.6],[4.65,0,8.7]]);	//curva (no diagonale) vicino colonne
	var f1f2 = BEZIER(S1)([f1,f2]);
	//parte spigolosa superiore: striscia di chiusura sopra
	var g1 = BEZIER(S0)([[4.65,0,8.7],[8.3,0,8.7]]);
	var g2 = BEZIER(S0)([[4.65,0.15,8.7],[8.25,0.15,8.7]]);
	var g1g2 = BEZIER(S1)([g1,g2]);
	//parte spigolosa superiore parte laterale destra
	var f3 = BEZIER(S0)([[8.25,0.55,8.6],[8.3,0.55,8.6],[8.3,0.55,8.7]]);	//curva laterale a destra
	var f1f3 = BEZIER(S1)([f1,f3]);
	//parte spigolosa superiore parte laterale destra: striscia di chiusura sopra
	var g3 = BEZIER(S0)([[8.3,0,8.7],[8.3,0.55,8.7]]);
	var g4 = BEZIER(S0)([[8.15,0.15,8.7],[8.15,0.55,8.7]]);
	var g3g4 = BEZIER(S1)([g3,g4]);

	var parteSpigolosaSuperioreBeta = STRUCT([	MAP(f1f2)(domain2),
												MAP(g1g2)(domain2),
												MAP(f1f3)(domain2),
												MAP(g3g4)(domain2)
											]);
	var parteSpigolosaSuperiore = COLOR(marroneCornicione)(STRUCT([	parteSpigolosaSuperioreBeta,
																	S([0])([-1])(parteSpigolosaSuperioreBeta)
																]));	
	
	var cornicione = STRUCT([parteDritta,parteSpigolosaInferiore,parteSpigolosaSuperiore]);
	return cornicione;
};




/**********************************************************************************
*	Ritorna il cornicione frontale inferiore, alto 3 da terra, il cui spigolo in
*	basso a destra (quello più grande) ha coordinate:  x=8.3, y=0, z=3
***********************************************************************************/
var getCornicioneFrontale_Inferiore = function(){
	var parteDrittaAlfa = STRUCT([	SIMPLEX_GRID([[-4.65,3.65],[0.55],[-3,0.25]]),
									SIMPLEX_GRID([[-1,7.25],[-0.05,0.5],[-3.25,0.25]]),
									SIMPLEX_GRID([[-1,7.2],[-0.1,0.45],[-3.5,0.25]])
									]);
	var parteDritta = COLOR(marronePietra)(STRUCT([parteDrittaAlfa, S([0])([-1])(parteDrittaAlfa)]));

	var pezzettoAlfa = SIMPLEX_GRID([[4.65],[-0.05,0.5],[-3,0.2]]);	//pezzetto sotto la porta
	var pezzetto = COLOR(avorioMuro)(STRUCT([pezzettoAlfa,S([0])([-1])(pezzettoAlfa)]));

	var partiDritte = STRUCT([parteDritta,pezzetto]);	

	//parte spigolosa
	var c1 = BEZIER(S0)([[8.2,0.1,3.75],[8.15,0.15,3.75],[8.15,0.15,3.85]]);	//curva diagonale a destra
	var c2 = BEZIER(S0)([[1,0.1,3.75],[1,0.15,3.75],[1,0.15,3.85]]);			//curva diagonale vicino colonne
	var c3 = BEZIER(S0)([[8.2,0.55,3.75],[8.15,0.55,3.75],[8.15,0.55,3.85]]);	//curva laterale a destra
	var c1c2 = BEZIER(S1)([c1,c2]);
	var c1c3 = BEZIER(S1)([c1,c3]);
	
	var parteSpigolosaBeta = STRUCT([MAP(c1c2)(domain2), MAP(c1c3)(domain2)]);
	var parteSpigolosa = COLOR(marronePietra)(STRUCT([parteSpigolosaBeta, S([0])([-1])(parteSpigolosaBeta)]));

	var cornicioneInferiore = STRUCT([partiDritte,parteSpigolosa]);
	return cornicioneInferiore;
	}




/*********************************************************************************************************
*	Ritorna il muro frontale superiore, con lo spigolo in basso a destra di coordinate x=8.15, y=0, z=8.7
**********************************************************************************************************/
var getMuroFrontale_Superiore = function(){
	var muroBeta = STRUCT([	SIMPLEX_GRID([[3.3,-0.9,2.25,-0.9,0.8],[0.4],[-8.7,1.75]]),
							SIMPLEX_GRID([[-3.3,0.9],[0.4],[-8.7,0.8,-0.6,0.35]]),
							SIMPLEX_GRID([[-6.45,0.9],[0.4],[-10.1,0.35]])
							]);
	var muro = COLOR(avorioMuro)(STRUCT([muroBeta, S([0])([-1])(muroBeta)]));

	//finestre piccole
	var cornicePiccolaBeta = STRUCT([	SIMPLEX_GRID([[-3.3,0.9],[-0.1,0.3],[-9.5,0.075,-0.45,0.075]]),	//corniceOrizzontale
										SIMPLEX_GRID([[-3.3,0.075,-0.3,0.15,-0.3,0.075],[-0.1,0.3],[-9.575,0.45]])	//corniceVerticale
										]);
	var cornicePiccola = COLOR(oroCornice)(STRUCT([cornicePiccolaBeta, S([0])([-1])(cornicePiccolaBeta)]));
	var vetroPiccoloBeta = SIMPLEX_GRID([[-3.375,0.3,-0.15,0.3],[-0.2,0.2],[-9.575,0.45]]);
	var vetroPiccolo = COLOR(azzurroTrasparente)(STRUCT([vetroPiccoloBeta, S([0])([-1])(vetroPiccoloBeta)]));
	var finestrePiccole = STRUCT([cornicePiccola,vetroPiccolo]);
	
	//finestre grandi
	var corniceGrandeBeta = STRUCT([SIMPLEX_GRID([[-6.45,0.9],[-0.1,0.3],[-8.7,0.075,-1.25,0.075]]),	//corniceOrizzontale
									SIMPLEX_GRID([[-6.45,0.075,-0.3,0.15,-0.3,0.075],[-0.1,0.3],[-8.775,1.25]])	//corniceVerticale
									]);
	var corniceGrande = COLOR(oroCornice)(STRUCT([corniceGrandeBeta, S([0])([-1])(corniceGrandeBeta)]));
	var vetroGrandeBeta = SIMPLEX_GRID([[-6.525,0.3,-0.15,0.3],[-0.2,0.2],[-8.775,1.25]]);
	var vetroGrande = COLOR(azzurroTrasparente)(STRUCT([vetroGrandeBeta, S([0])([-1])(vetroGrandeBeta)]));
	var finestreGrandi = STRUCT([corniceGrande,vetroGrande]);

	//ringhiere
	var domain = DOMAIN([[0,1],[0,2*PI]])([15,15]);
	var profiloColonnina = BEZIER(S0)([[-0.055,0,8.7],[0.045,0,8.7],[-0.215,0,8.75],[-0.005,0,8.87],[-0.015,0,8.9]]);
	var mapping = ROTATIONAL_SURFACE(profiloColonnina);
	var mezzaColonnina1 = MAP(mapping)(domain);
	var mezzaColonnina2 = T([2])([17.8])(R([0,2])([PI])(mezzaColonnina1));
	var colonnina = STRUCT([mezzaColonnina1,mezzaColonnina2]);
	var ringhiera = STRUCT([T([0])([6.585])(colonnina),
							T([0])([6.795])(colonnina),
							T([0])([7.005])(colonnina),
							T([0])([7.215])(colonnina),
							T([1])([-0.1])(SIMPLEX_GRID([[-6.45,0.9],[0.2],[-9.1,0.08]]))
							]);
	var ringhiere = COLOR(bianco)(STRUCT([ringhiera, S([0])([-1])(ringhiera)]));

	var muroSuperiore = STRUCT([muro,finestrePiccole,finestreGrandi,ringhiere]);
	return muroSuperiore;
};




/************************************************************************************
*	Ritorna il cornicione superiore frontale, alto 10.45 da terra, il cui spigolo in
*	alto a destra (quello più grande) ha coordinate: x=8.35, y=0, z=10.75
*************************************************************************************/
var getCornicioneFrontale_Superiore = function(){
	var parteDrittaAlfa = SIMPLEX_GRID([[8.15],[-0.2,0.4],[-10.45,0.1]]);
	var parteDritta = STRUCT([parteDrittaAlfa, S([0])([-1])(parteDrittaAlfa)]);

	//parte spigolosa inferiore
	var c1 = BEZIER(S0)([[0,0.2,10.55],[0,0.1,10.55],[0,0.1,10.65]]);			//curva (no diagonale) vicino colonne
	var c2 = BEZIER(S0)([[8.15,0.2,10.55],[8.25,0.1,10.55],[8.25,0.1,10.65]]);	//curva diagonale a destra
	var c1c2 = BEZIER(S1)([c1,c2]);
	//parte spigolosa inferiore parte laterale destra
	var c3 = BEZIER(S0)([[8.15,0.6,10.55],[8.25,0.6,10.55],[8.25,0.6,10.65]]);	//curva laterale a destra
	var c2c3 = BEZIER(S1)([c2,c3]);
	
	var parteSpigolosaInferioreAlfa = STRUCT([MAP(c1c2)(domain2),MAP(c2c3)(domain2)]);
	var parteSpigolosaInferiore = STRUCT([parteSpigolosaInferioreAlfa, S([0])([-1])(parteSpigolosaInferioreAlfa)]);

	
	//parte spigolosa superiore
	var f1 = BEZIER(S0)([[0,0.1,10.65],[0,0,10.65],[0,0,10.75]]);			//curva (no diagonale) vicino colonne
	var f2 = BEZIER(S0)([[8.25,0.1,10.65],[8.35,0,10.65],[8.35,0,10.75]]);	//curva diagonale a destra
	var f1f2 = BEZIER(S1)([f1,f2]);
	//parte spigolosa superiore parte laterale destra
	var f3 = BEZIER(S0)([[8.25,0.6,10.65],[8.35,0.6,10.65],[8.35,0.6,10.75]]);	//curva laterale a destra
	var f2f3 = BEZIER(S1)([f2,f3]);

	//parte spigolosa superiore: striscia di chiusura sopra (tramite il punto speciale)
	var d1 = BEZIER(S0)([[0,0,10.75],[8.35,0,10.75]]);
	//parte spigolosa superiore parte laterale destra: striscia di chiusura sopra (tramite il punto speciale)
	var d2 = BEZIER(S0)([[8.35,0,10.75],[8.35,0.6,10.75]]);
	var ps = BEZIER(S0)([[0,0.6,10.75]]);	//punto speciale
	var d1ps = BEZIER(S1)([d1,ps]);
	var d2ps = BEZIER(S1)([d2,ps]);
	
	var parteSpigolosaSuperioreAlfa = STRUCT([	MAP(f1f2)(domain2),
												MAP(f2f3)(domain2),
												MAP(d1ps)(domain2),
												MAP(d2ps)(domain2)
												]);
	var parteSpigolosaSuperiore = STRUCT([parteSpigolosaSuperioreAlfa, S([0])([-1])(parteSpigolosaSuperioreAlfa)]);	
	
	var cornicione = COLOR(marroneCornicione)(STRUCT([parteDritta,parteSpigolosaInferiore,parteSpigolosaSuperiore]));
	return cornicione;
};




/***********************************************************************************************
*	Ritorna la scalinata (comprese anche le piccole finestre), con lo spigolo in basso a destra
*	di coordinate x=7.95, y=0, z=0;
*	Ritorna anche il muro dietro la scalinata (comprese le finestre).
************************************************************************************************/
var getScalinata = function(){
	var scalinataBeta = STRUCT([SIMPLEX_GRID([[-6.45,1.5],[0.2],[0.125]]),
								SIMPLEX_GRID([[-6.45,1.5],[-0.2,0.2],[0.25]]),
								SIMPLEX_GRID([[-6.45,1.5],[-0.4,1.5],[0.375]]),
								SIMPLEX_GRID([[-6.45,1.5],[-1.9,0.2],[0.5]]),
								SIMPLEX_GRID([[-6.45,1.5],[-2.1,0.2],[0.625]]),
								SIMPLEX_GRID([[-6.45,1.5],[-2.3,0.2],[0.75]]),
								SIMPLEX_GRID([[-6.45,1.5],[-2.5,0.2],[0.875]]),
								SIMPLEX_GRID([[-6.45,1.5],[-2.7,0.2],[1]]),
								SIMPLEX_GRID([[-6.45,1.5],[-2.9,0.2],[1.125]]),
								SIMPLEX_GRID([[-6.45,1.5],[-3.1,0.2],[1.25]]),
								SIMPLEX_GRID([[-6.45,1.5],[-3.3,0.2],[1.375]]),
								SIMPLEX_GRID([[-6.45,1.5],[-3.5,0.2],[1.5]]),
								SIMPLEX_GRID([[-6.45,1.5],[-3.7,0.2],[1.625]]),
								SIMPLEX_GRID([[-6.45,1.5],[-3.9,0.2],[1.75]]),
								SIMPLEX_GRID([[-6.45,1.5],[-4.1,0.2],[1.875]]),
								SIMPLEX_GRID([[-6.45,1.5],[-4.3,1.5],[2]]),
								SIMPLEX_GRID([[-6.25,0.2],[-4.3,1.5],[2.125]]),
								SIMPLEX_GRID([[-6.05,0.2],[-4.3,1.5],[2.25]]),
								SIMPLEX_GRID([[-5.85,0.2],[-4.3,1.5],[2.375]]),
								SIMPLEX_GRID([[-5.65,0.2],[-4.3,1.5],[2.5]]),
								SIMPLEX_GRID([[-5.45,0.2],[-4.3,1.5],[2.625]]),						
								SIMPLEX_GRID([[-5.25,0.2],[-4.3,1.5],[1.6,-0.6,0.55]]),
								SIMPLEX_GRID([[-5.05,0.2],[-4.3,1.5],[1.6,-0.6,0.675]]),
								SIMPLEX_GRID([[-4.85,0.2],[-4.3,1.5],[1.6,-0.6,0.8]]),
								SIMPLEX_GRID([[-4.65,0.2],[-4.3,1.5],[3.125]]),
								SIMPLEX_GRID([[-4.45,0.2],[-4.3,1.55],[3.25]]),
								SIMPLEX_GRID([[4.45],[-4.3,1.55],[-3.125,0.125]]) //unione scalinate
								]);
	var scalinata = COLOR(bianco)(STRUCT([scalinataBeta, S([0])([-1])(scalinataBeta)]));

	//finestre dentro le scale
	var corniceABeta = STRUCT([	SIMPLEX_GRID([[-4.85,0.6],[-4.4,0.3],[-1.6,0.05,-0.5,0.05]]),	//corniceOrizzontale
								SIMPLEX_GRID([[-4.85,0.05,-0.2,0.1,-0.2,0.05],[-4.4,0.3],[-1.65,0.5]])	//corniceVerticale
								]);
	var corniceA = COLOR(oroCornice)(STRUCT([corniceABeta, S([0])([-1])(corniceABeta)]));
	var vetroABeta = SIMPLEX_GRID([[-4.9,0.2,-0.1,0.2],[-4.5,0.2],[-1.65,0.5]]);
	var vetroA = COLOR(azzurroTrasparente)(STRUCT([vetroABeta, S([0])([-1])(vetroABeta)]));
	var finestreA = STRUCT([corniceA,vetroA]);

	//muro
	var muroBeta = STRUCT([ SIMPLEX_GRID([[6.45,-0.9,0.9],[-5.8,0.5],[3]]),
							SIMPLEX_GRID([[-6.45,0.9],[-5.8,0.5],[2,-0.6,0.4]])
							]);
	var muro = COLOR(bianco)(STRUCT([muroBeta, S([0])([-1])(muroBeta)]));

	//finestre dietro le scale
	var corniceBBeta = STRUCT([	SIMPLEX_GRID([[-6.45,0.9],[-5.9,0.45],[-2,0.075,-0.45,0.075]]),	//corniceOrizzontale
								SIMPLEX_GRID([[-6.45,0.075,-0.3,0.15,-0.3,0.075],[-5.9,0.45],[-2.075,0.45]])	//corniceVerticale
								]);
	var corniceB = COLOR(oroCornice)(STRUCT([corniceBBeta, S([0])([-1])(corniceBBeta)]));
	var vetroBBeta = SIMPLEX_GRID([[-6.525,0.3,-0.15,0.3],[-6,0.35],[-2.075,0.45]]);
	var vetroB = COLOR(azzurroTrasparente)(STRUCT([vetroBBeta, S([0])([-1])(vetroBBeta)]));
	var finestreB = STRUCT([corniceB,vetroB]);

	var scalinateConFinestre = STRUCT([scalinata,finestreA,muro,finestreB]);
	return scalinateConFinestre;
};




/*****************************************************************************************
*	Ritorna il patio (patio + muro sotto + porta + finestre), con lo spigolo in alto a
*	destra del muro che ha coordinate x=4.45, y=0, z=0.
******************************************************************************************/
var getPatio = function(){
	var muroBeta = STRUCT([	SIMPLEX_GRID([[0.55],[0.6],[-2.5,1]]),
							SIMPLEX_GRID([[-0.55,0.8,-0.7,0.8,-0.7,0.9],[0.6],[3.5]]),
							SIMPLEX_GRID([[-1.35,0.7,-0.8,0.7],[0.6],[1.6,-0.9,1]]),
							SIMPLEX_GRID([[-3.85,0.6],[-0.6,0.15,-0.7,0.75],[3.5]]),
							SIMPLEX_GRID([[-3.85,0.6],[-0.75,0.7],[1.6,-0.9,1]]),
							SIMPLEX_GRID([[3.85],[-0.6,1.6],[-3.125,0.125]])	//pianerottolo
							]);
	var muro = COLOR(bianco)(STRUCT([muroBeta, S([0])([-1])(muroBeta)]));

	//porta
	var portaBeta = SIMPLEX_GRID([[0.55],[-0.1,0.5],[2.5]]);
	var porta = COLOR(grigioPortone)(STRUCT([portaBeta, S([0])([-1])(portaBeta)]));
	
	//finestre frontali
	var corniceFrontBeta = STRUCT([	SIMPLEX_GRID([[-1.35,0.7,-0.8,0.7],[-0.1,0.5],[-1.6,0.05,-0.8,0.05]]),	//corniceOrizzontale
									SIMPLEX_GRID([[-1.35,0.05,-0.25,0.1,-0.25,0.05,-0.8,0.05,-0.25,0.1,-0.25,0.05],[-0.1,0.5],[-1.65,0.8]])	//corniceVerticale
									]);
	var corniceFront = COLOR(oroCornice)(STRUCT([corniceFrontBeta, S([0])([-1])(corniceFrontBeta)]));
	var vetroFrontBeta = SIMPLEX_GRID([[-1.4,0.25,-0.1,0.25,-0.9,0.25,-0.1,0.25],[-0.2,0.4],[-1.65,0.8]]);
	var vetroFront = COLOR(azzurroTrasparente)(STRUCT([vetroFrontBeta, S([0])([-1])(vetroFrontBeta)]));
	var finestreFront = STRUCT([corniceFront,vetroFront]);

	//finestre laterali
	var corniceLatBeta = STRUCT([	SIMPLEX_GRID([[-3.85,0.5],[-0.75,0.7],[-1.6,0.05,-0.8,0.05]]),	//corniceOrizzontale
									SIMPLEX_GRID([[-3.85,0.5],[-0.75,0.05,-0.25,0.1,-0.25,0.05],[-1.65,0.8]])	//corniceVerticale
									]);
	var corniceLat = COLOR(oroCornice)(STRUCT([corniceLatBeta, S([0])([-1])(corniceLatBeta)]));
	var vetroLatBeta = SIMPLEX_GRID([[-3.85,0.4],[-0.8,0.25,-0.1,0.25],[-1.65,0.8]]);
	var vetroLat = COLOR(azzurroTrasparente)(STRUCT([vetroLatBeta, S([0])([-1])(vetroLatBeta)]));
	var finestreLat = STRUCT([corniceLat,vetroLat]);

	var patio = STRUCT([muro,porta,finestreFront,finestreLat]);
	return patio;
};




/******************************************************************************
*	Ritorna il colonnato, con lo spigolo della colonna in basso a destra di
*	coordinate x=4.45, y=0, z=3.5
*******************************************************************************/
var getColonnato = function(){
	//base della colonna
	var baseCiambella = SIMPLEX_GRID([[-3.85,0.6],[0.6],[0.1]]);

	var c1 = CUBIC_HERMITE(S0)([[0.3,0,0],[-0.3,0,0],[0,1.2,0],[0,-1.2,0]]);		//semi-curva diametro 0.6
	var c2 = CUBIC_HERMITE(S0)([[0.2,0,0.05],[-0.2,0,0.05],[0,0.8,0],[0,-0.8,0]]);	//semi-curva diametro 0.4
	var c1c2 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0.2], [0,0,0]]);
	var surfacec1c2 = MAP(c1c2)(domain2);
	var ciambellaEsternaAlfa = STRUCT([surfacec1c2, S([2])([-1])(surfacec1c2)]);
	var ciambellaEsternaBeta = STRUCT([ciambellaEsternaAlfa, S([1])([-1])(ciambellaEsternaAlfa)]);
	var ciambellaEsterna = T([0,1,2])([4.15,0.3,0.25])(ciambellaEsternaBeta);

	var c3 = CUBIC_HERMITE(S0)([[0.2,0,0.1],[-0.2,0,0.1],[0,0.8,0],[0,-0.8,0]]);	//semi-curva diametro 0.4
	var c1c3 = CUBIC_HERMITE(S1)([c1,c3,[0,-0.2,0], [0,0,0.1]]);
	var surfacec1c3 = MAP(c1c3)(domain2);
	var ciambellaInternaBeta = STRUCT([surfacec1c3, S([1])([-1])(surfacec1c3)]);
	var ciambellaInterna = T([0,1,2])([4.15,0.3,0.1])(ciambellaInternaBeta);

	var baseColonnaAlfa = STRUCT([baseCiambella,ciambellaEsterna,ciambellaInterna]);
	var baseColonnaBeta = T([2])([3.5])(baseColonnaAlfa);
	var baseColonnaGamma = STRUCT([	baseColonnaBeta,
									T([0])([-1.6])(baseColonnaBeta),
									T([0])([-3.2])(baseColonnaBeta),
									T([1])([1.6])(baseColonnaBeta),
									]);
	var basiColonne = COLOR(avorioMuro)(STRUCT([baseColonnaGamma, S([0])([-1])(baseColonnaGamma)]));

	//colonna
	var domain = DOMAIN([[0,1],[0,2*PI]])([15,15]);
	var profiloColonna = BEZIER(S0)([[0.25,0,3.8],[0.2,0,7.7]]);
	var mapping = ROTATIONAL_SURFACE(profiloColonna);
	var colonnaAlfa = MAP(mapping)(domain);
	colonnaBeta = T([0,1])([4.15,0.3])(colonnaAlfa);
	var colonnaGamma = STRUCT([	colonnaBeta,
								T([0])([-1.6])(colonnaBeta),
								T([0])([-3.2])(colonnaBeta),
								T([1])([1.6])(colonnaBeta),
								]);
	var colonne = COLOR(rosaColonne)(STRUCT([colonnaGamma, S([0])([-1])(colonnaGamma)]));

	//capitello della colonna
	var baseCapitello = SIMPLEX_GRID([[0.6],[0.6],[-0.1,0.1]]);

	var g1 = CUBIC_HERMITE(S0)([[0.1,0,0],[-0.1,0,0],[0,0,0.4],[0,0,-0.4]]);		//semi-curva diametro 0.2
	var g2 = CUBIC_HERMITE(S0)([[0.1,0.6,0],[-0.1,0.6,0],[0,0,0.4],[0,0,-0.4]]);	//semi-curva parallela diametro 0.2
	var g1g2 = BEZIER(S1)([g1,g2]);
	
	var ps1 = BEZIER(S0)([[0,0,0]]);		//punto speciale (al centro) per raccordare g1
	var ps2 = BEZIER(S0)([[0,0.6,0]]);	//punto speciale (al centro) per raccordare g2
	var g1ps1 = BEZIER(S1)([g1,ps1]);
	var g2ps2 = BEZIER(S1)([g2,ps2]);

	var mezzoCilindro = STRUCT([MAP(g1g2)(domain2),
								MAP(g1ps1)(domain2),
								MAP(g2ps2)(domain2)									
								]);
	var cilindro = STRUCT([mezzoCilindro, S([2])([-1])(mezzoCilindro)]);
	var capitelloAlfa = STRUCT([baseCapitello, cilindro, T([0])([0.6])(cilindro)]);
	var capitelloAlfaRuotato = R([0,1])([-PI/2])(capitelloAlfa);
	var capitelloBeta = T([0,2])([3.85,7.6])(capitelloAlfa);
	var capitelloAlfaRuotato = R([0,1])([-PI/2])(capitelloAlfa);
	var capitelloGamma = STRUCT([	capitelloBeta,
									T([0])([-1.6])(capitelloBeta),
									T([0])([-3.2])(capitelloBeta),
									T([0,1,2])([3.85,2.2,7.6])(capitelloAlfaRuotato)
									]);
	var capitelli = COLOR(avorioMuro)(STRUCT([capitelloGamma, S([0])([-1])(capitelloGamma)]));

	var colonnato = STRUCT([basiColonne,colonne,capitelli]);
	return colonnato;
};




/***********************************************************************************************
*	Ritorna il tetto sopra il colonnato, lungo 4, largo 10.2 (la sommità), alto 0.9+1.75=2.65
*	e il cui spigolo in basso a destra ha coordinate x=4.45, y=0.2, z=7.8.	
***********************************************************************************************/
var getTettoSopraColonnato = function(){
	var parteDritta1Alfa = STRUCT([	SIMPLEX_GRID([[4.45],[-0.2,0.6],[-7.8,0.25]]),
									SIMPLEX_GRID([[-3.85,0.6],[-0.8,3.2],[-7.8,0.25]])
									]);
	var parteDritta1 = COLOR(marroneCornicione)(STRUCT([parteDritta1Alfa, S([0])([-1])(parteDritta1Alfa)]));

	var parteDritta2Alfa = STRUCT([	SIMPLEX_GRID([[4.35],[-0.3,0.6],[-8.15,0.2]]),
									SIMPLEX_GRID([[-3.85,0.5],[-0.8,3.2],[-8.15,0.2]])
									]);
	var parteDritta2 = COLOR(avorioMuro)(STRUCT([parteDritta2Alfa, S([0])([-1])(parteDritta2Alfa)]));

	var parteDritta3Alfa = STRUCT([	SIMPLEX_GRID([[4.45],[-0.2,0.6],[-8.35,0.25]]),
									SIMPLEX_GRID([[-3.85,0.6],[-0.8,3.2],[-8.35,0.25]])
									]);
	var parteDritta3 = COLOR(marroneCornicione)(STRUCT([parteDritta3Alfa, S([0])([-1])(parteDritta3Alfa)]));
	
	var parteDritta = STRUCT([parteDritta1,parteDritta2,parteDritta3]);

	
	//parte spigolosa inferiore laterale
	var c1 = BEZIER(S0)([[4.45,3.95,8.05],[4.5,3.9,8.05],[4.5,3.9,8.15]]);	//curva diagonale a destra vicino muro
	var c2 = BEZIER(S0)([[4.45,0.2,8.05],[4.5,0.15,8.05],[4.5,0.15,8.15]]);//curva diagonale a destra
	var c1c2 = BEZIER(S1)([c1,c2]);
	//parte spigolosa inferiore laterale: striscia di chiusura sopra
	var d1 = BEZIER(S0)([[4.5,3.9,8.15],[4.5,0.15,8.15]]);
	var d2 = BEZIER(S0)([[4.35,4.1,8.15],[4.35,0.3,8.15]]);
	var d1d2 = BEZIER(S1)([d1,d2]);
	//parte spigolosa inferiore centrale
	var c3 = BEZIER(S0)([[0,0.2,8.05],[0,0.15,8.05],[0,0.15,8.15]]);	//curva (no diagonale) centrale
	var c2c3 = BEZIER(S1)([c2,c3]);
	//parte spigolosa inferiore centrale: striscia di chiusura sopra
	var d3 = BEZIER(S0)([[0,0.15,8.15],[4.5,0.15,8.15]]);
	var d4 = BEZIER(S0)([[0,0.3,8.15],[4.45,0.3,8.15]]);
	var d3d4 = BEZIER(S1)([d3,d4]);
	
	var parteSpigolosaInferioreBeta = STRUCT([	MAP(c1c2)(domain2),
												MAP(d1d2)(domain2),
												MAP(c2c3)(domain2),
												MAP(d3d4)(domain2)
											]);
	var parteSpigolosaInferiore = COLOR(marroneCornicione)(STRUCT([	parteSpigolosaInferioreBeta,
																	S([0])([-1])(parteSpigolosaInferioreBeta)
																	]));

	var baseTettoAlfa = SIMPLEX_GRID([[4.65],[4],[-8.6,0.1]]);
	var baseTetto = COLOR(marroneCornicione)(STRUCT([baseTettoAlfa, S([0])([-1])(baseTettoAlfa)]));


	//pezzo inclinato parte sotto
	var f1 = BEZIER(S0)([[0,0,10.05],[0,4,10.05]]);
	var f2 = BEZIER(S0)([[0,0,10.3],[0,4,10.3]]);
	var f1f2 = BEZIER(S1)([f1,f2]);

	var f3 = BEZIER(S0)([[4.75,0,8.675],[4.75,4,8.675]]);
	var f4 = BEZIER(S0)([[4.85,0,8.9],[4.85,4,8.9]]);
	var f3f4 = BEZIER(S1)([f3,f4]);

	var f1f2f3f4 = BEZIER(S2)([f1f2,f3f4]);
	var tettoParteSottoAlfa = MAP(f1f2f3f4)(domain3);
	var tettoParteSotto = COLOR(marroneCornicione)(STRUCT([tettoParteSottoAlfa, S([0])([-1])(tettoParteSottoAlfa)]));

	//pezzo inclinato parte sopra
	var g1 = BEZIER(S0)([[0,0,10.3],[0,4,10.3]]);
	var g2 = BEZIER(S0)([[0,0,10.45],[0,4,10.45]]);
	var g1g2 = BEZIER(S1)([g1,g2]);

	var g3 = BEZIER(S0)([[5,0,8.85],[5,4,8.85]]);
	var g4 = BEZIER(S0)([[5.1,0,9],[5.1,4,9]]);
	var g3g4 = BEZIER(S1)([g3,g4]);

	var g1g2g3g4 = BEZIER(S2)([g1g2,g3g4]);
	var tettoParteSopraAlfa = MAP(g1g2g3g4)(domain3);
	var tettoParteSopra = COLOR(rossoTetti)(STRUCT([tettoParteSopraAlfa, S([0])([-1])(tettoParteSopraAlfa)]));

	//triangolo interno
	var t1 = BEZIER(S0)([[0,0.6,10.3],[4.65,0.6,8.7]]);
	var ps = BEZIER(S0)([[0,0.6,8.7]]);
	var t1ps = BEZIER(S1)([t1,ps]);

	var triangoloAlfa = MAP(t1ps)(domain2);
	var triangolo = COLOR(bianco)(STRUCT([triangoloAlfa, S([0])([-1])(triangoloAlfa)]));
	
	var tetto = STRUCT([parteDritta,parteSpigolosaInferiore,baseTetto,tettoParteSotto,tettoParteSopra,triangolo]);
	return tetto;
};




/*******************************************************************************************
*	Ritorna il cornicione frontale che sta alla base, alto 0.35+0.5+0.4+0.1=1.35 da terra,
*	il cui spigolo in basso a destra (quello più grande) ha coordinate:  x=8.45, y=0, z=0.
*	Ritorna anche gli scalini della porta.
********************************************************************************************/
var getCornicioneFrontale_AllaBase = function(){
	var scaliniPortaAlfa = STRUCT([	SIMPLEX_GRID([[0.45],[0.1],[0.15]]),
									SIMPLEX_GRID([[0.45],[-0.1,0.1],[0.3]]),
									SIMPLEX_GRID([[0.45],[-0.2,0.1],[0.45]])
									]);
	var scaliniPorta = COLOR(bianco)(STRUCT([scaliniPortaAlfa, S([0])([-1])(scaliniPortaAlfa)]));


	var parteDritta = STRUCT([	SIMPLEX_GRID([[-0.45,4.2],[0.2],[0.35]]),
								SIMPLEX_GRID([[-0.45,4.15],[-0.05,0.15],[-0.35,0.5]]),
								SIMPLEX_GRID([[-0.45,4.1],[-0.1,0.1],[-0.85,0.4]]),

								SIMPLEX_GRID([[-4.45,0.2],[-0.2,2.2],[0.35]]),
								SIMPLEX_GRID([[-4.45,0.15],[-0.2,2.2],[-0.35,0.5]]),
								SIMPLEX_GRID([[-4.45,0.1],[-0.2,2.2],[-0.85,0.4]]),

								SIMPLEX_GRID([[-4.65,1.8],[-2.2,0.2],[0.35]]),
								SIMPLEX_GRID([[-4.6,1.85],[-2.25,0.15],[-0.35,0.5]]),
								SIMPLEX_GRID([[-4.55,1.9],[-2.3,0.1],[-0.85,0.4]]),

								SIMPLEX_GRID([[-7.95,0.5],[-3.7,0.2],[0.35]]),
								SIMPLEX_GRID([[-7.95,0.45],[-3.75,0.15],[-0.35,0.5]]),
								SIMPLEX_GRID([[-7.95,0.4],[-3.8,0.1],[-0.85,0.4]]),

								SIMPLEX_GRID([[-8.25,0.2],[-3.9,0.5],[0.35]]),
								SIMPLEX_GRID([[-8.25,0.15],[-3.9,0.5],[-0.35,0.5]]),
								SIMPLEX_GRID([[-8.25,0.1],[-3.9,0.5],[-0.85,0.4]])
								]);

	//parte spigolosa
	var c1 = BEZIER(S0)([[0.45,0.1,1.25],[0.45,0.2,1.35]]);
	var ps = BEZIER(S0)([[0.45,0.2,1.25]]);
	var c1ps = BEZIER(S1)([c1,ps]);
	
	var c2 = BEZIER(S0)([[4.55,0.1,1.25],[4.45,0.2,1.35]]);
	var c1c2 = BEZIER(S1)([c1,c2]);

	var c3 = BEZIER(S0)([[4.55,2.3,1.25],[4.45,2.4,1.35]]);
	var c2c3 = BEZIER(S1)([c2,c3]);

	var c4 = BEZIER(S0)([[6.45,2.3,1.25],[6.45,2.4,1.35]]);
	var c3c4 = BEZIER(S1)([c3,c4]);

	var c5 = BEZIER(S0)([[7.95,3.8,1.25],[7.95,3.9,1.35]]);
	var c6 = BEZIER(S0)([[8.35,3.8,1.25],[8.25,3.9,1.35]]);
	var c5c6 = BEZIER(S1)([c5,c6]);

	var c7 = BEZIER(S0)([[8.35,4.4,1.25],[8.25,4.4,1.35]]);
	var c6c7 = BEZIER(S1)([c6,c7]);
	
	var parteSpigolosa = STRUCT([	MAP(c1ps)(domain2),
									MAP(c1c2)(domain2),
									MAP(c2c3)(domain2),
									MAP(c3c4)(domain2),
									MAP(c5c6)(domain2),
									MAP(c6c7)(domain2)
									]);

	var cornicioneAlfa = STRUCT([parteDritta,parteSpigolosa]);
	var cornicioneBeta = COLOR(marronePietra)(STRUCT([cornicioneAlfa, S([0])([-1])(cornicioneAlfa)]));
	var cornicione = STRUCT([scaliniPorta,cornicioneBeta]);
	return cornicione;		
};




/****************************************************************************************************
*	Ritorna la facciata frontale;																	*
*	Il muro centrale è largo 8.15 e lungo 0.4, ed è traslato in avanti sulle y di 0.1;				*
*	Il muro inferiore è largo 8.25 e lungo 0.5, ed è  attaccato all'asse x, cioè è traslato di y=0;	*
*	Il muro superiore è largo 8.15 e lungo 0.4, ed è traslato in avanti sulle y di 0.1;				*
*	Il cornicione alla base è largo 8.45 e lungo 0.7;												*
*	Il cornicione inferiore è largo 8.3 e lungo 0.55;												*
*	Il cornicione centrale è largo 8.3 e lungo 0.55;												*
*	Il cornicione superiore è largo 8.35 e lungo 0.6;												*
*****************************************************************************************************
*	Tutta la facciata quindi è lunga 16.3 (se si considera il muro centrale), oppure 16.5 (se si	*
*	considera il muro inferiore), oppure 16.9 (se si considera il cornicione alla base).			*
*	La y postiva dell'intera facciata vale 0.5														*
*****************************************************************************************************/
var getFacciataFrontale = function(){
	var facciataFrontale = STRUCT([	T([1])([-3.9])(getCornicioneFrontale_AllaBase()),
									T([1])([-5.8])(getScalinata()),									
									T([1])([-3.7])(getPatio()),
									T([1])([-0.05])(getCornicioneFrontale_Inferiore()),
									T([1])([0.1])(getMuroFrontale_Centrale()),
									T([1])([-0.05])(getCornicioneFrontale_Centrale()),
									T([1])([0.1])(getMuroFrontale_Superiore()),
									T([1])([-0.1])(getCornicioneFrontale_Superiore()),
									T([1])([-3.7])(getColonnato()),
									T([1])([-3.9])(getTettoSopraColonnato())
									]);
	return facciataFrontale;
};

var a = getFacciataFrontale();
DRAW(a); 