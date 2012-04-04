var pezzo1 = SIMPLEX_GRID([[39],[1],[1]]);
var pezzo2 = T([1])([1])(SIMPLEX_GRID([[1],[1],[1]]));
var pezzo3 = T([0,1])([21,1])(SIMPLEX_GRID([[15],[3],[1]]));
var pezzo4 = T([0,1])([21,4])(SIMPLEX_GRID([[31],[1],[1]]));
var pezzo5 = T([0,1])([51,5])(SIMPLEX_GRID([[1],[1],[1]]));
var pezzo6 = T([0,1])([39,5])(SIMPLEX_GRID([[8],[11],[1]]));
var pezzo7 = T([0,1])([21,5])(SIMPLEX_GRID([[18],[12],[1]]));
var pezzo8 = T([0,1])([1,10])(SIMPLEX_GRID([[20],[7],[1]]));
var pezzo9 = T([0,1])([1,17])(SIMPLEX_GRID([[8],[5],[1]]));
var floor3D = STRUCT([pezzo1, pezzo2, pezzo3,
					pezzo4, pezzo5, pezzo6,
					pezzo7, pezzo8, pezzo9]);
//DRAW(floor3D);


var piscinaGrande = T([0,1])([1,1])(SIMPLEX_GRID([[20],[9],[0.6]]));
var piscinaPiccola = T([0,1])([47,5])(SIMPLEX_GRID([[4],[11],[0.6]]));
var piscine3D = STRUCT([piscinaGrande, piscinaPiccola]);
//DRAW(piscine3D);


var scalino1 = T([0,1])([36,1])(SIMPLEX_GRID([[0.5],[3],[1]]));
var scalino2 = T([0,1])([36+0.5,1])(SIMPLEX_GRID([[0.5],[3],[0.8]]));
var scalino3 = T([0,1])([37,1])(SIMPLEX_GRID([[0.5],[3],[0.6]]));
var scalino4 = T([0,1])([37+0.5,1])(SIMPLEX_GRID([[0.5],[3],[0.4]]));
var scalino5 = T([0,1])([38,1])(SIMPLEX_GRID([[0.5],[3],[0.2]]));
var scalino6 = T([0,1])([38+0.5,1])(SIMPLEX_GRID([[0.5],[3],[0]]));
var scala3D = STRUCT([scalino1, scalino2, scalino3, scalino4, scalino5, scalino6]);
//DRAW(scala3D);


var muroVicinoPanchina = T([0,1,2])([7.5,15,1])(SIMPLEX_GRID([[19],[0.25],[3]]));
var muro1 = T([0,1,2])([1,1-0.25,1])(SIMPLEX_GRID([[6.5],[0.25],[3]]));
var muro2 = T([0,1,2])([1-0.25,1-0.25,0])(SIMPLEX_GRID([[0.25],[21.5],[4]]));
var muro3 = T([0,1,2])([1-0.25,22,0])(SIMPLEX_GRID([[8.5],[0.25],[4]]));
var muro4 = T([0,1,2])([9,17,0])(SIMPLEX_GRID([[0.25],[5],[4]]));
var muro5 = T([0,1,2])([25,7.5-0.25,1])(SIMPLEX_GRID([[9],[0.25],[3]]));
var muro6 = T([0,1,2])([37.8,16,0])(SIMPLEX_GRID([[13.2],[0.25],[4]]));
var muro7 = T([0,1,2])([51,5-0.25,0])(SIMPLEX_GRID([[0.25],[11.5],[4]]));
var muro8 = T([0,1,2])([41.2,5-0.25,1])(SIMPLEX_GRID([[9.8],[0.25],[3]]));
var muro9 = T([0,1,2])([37.2,11.4,1])(SIMPLEX_GRID([[5],[0.25],[3]]));
var muri3D = STRUCT([muroVicinoPanchina, muro1, muro2, muro3, muro4, muro5, muro6, muro7, muro8, muro9]);
//DRAW(muri3D);


var tettoGrande = T([0,1,2])([24,4,4])(SIMPLEX_GRID([[23],[13],[0.4]]));
var tettoPiccolo = T([0,1,2])([0,13,4])(SIMPLEX_GRID([[10],[10],[0.4]]));
var tetti3D = STRUCT([tettoGrande, tettoPiccolo]);
//DRAW(tetti3D);


var colonne1 = T([0,1,2])([26,7,1])(SIMPLEX_GRID([REPLICA(4)([0.15, -6.2]), [0.15],	[3]]));
var colonne2 = T([0,1,2])([26,13,1])(SIMPLEX_GRID([REPLICA(4)([0.15, -6.2]), [0.15], [3]]));
var colonne3D = STRUCT([colonne1, colonne2]);
//DRAW(colonne3D);


var piediPanchina = T([0,1,2])([7,14.15,1])(SIMPLEX_GRID([REPLICA(8)([0.2, -2]), [0.2], [0.4]]));
var basePanchina = T([0,1,2])([7,14,1+0.4])(SIMPLEX_GRID([[15.6], [0.5], [0.15]]));
var panchina3D = STRUCT([piediPanchina, basePanchina]);
//DRAW(panchina3D);

var pavilionFinale = STRUCT([floor3D, piscine3D, scala3D, muri3D, tetti3D, colonne3D, panchina3D]);
DRAW(pavilionFinale);