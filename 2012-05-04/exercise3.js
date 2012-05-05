//exercise 3

var domain2 = DOMAIN([[0,1],[0,1]])([15,30]);

//Left Horizzontal Stabilizer
var left0 = [[0.55,0,-0.5], [2,0.05,0], [0.55,0.18,-0.5], [-0.9,0.05,-1], [0.55,0,-0.5]].map(function(p) {return [p[0], p[1], p[2]+0.5]});
var left1 = [[0.55,0.04,-0.5], [2,0.05,0], [0.55,0.06,-0.5], [-0.9,0.04,-1], [0.55,0.04,-0.5]].map(function(p) {return [p[0], p[1], p[2]+1.5]});

var leftHorStab0 = BEZIER(S0)(left0);
var leftHorStab1 = BEZIER(S0)(left1);

var leftHorStab = BEZIER(S1)([leftHorStab0,leftHorStab1]);
var surf_leftHorStab = MAP(leftHorStab)(domain2);



//Right Horizzontal Stabilizer
var right0 = [[0.55,0,0.5], [2,0.05,0], [0.55,0.18,0.5], [-0.9,0.05,1], [0.55,0,0.5]].map(function(p) {return [p[0], p[1], p[2]-0.5]});
var right1 = [[0.55,0.04,0.5], [2,0.05,0], [0.55,0.06,0.5], [-0.9,0.04,1], [0.55,0.04,0.5]].map(function(p) {return [p[0], p[1], p[2]-1.5]});

var rightHorStab0 = BEZIER(S0)(right0);
var rightHorStab1 = BEZIER(S0)(right1);

var rightHorStab = BEZIER(S1)([rightHorStab0,rightHorStab1]);
var surf_rightHorStab = MAP(rightHorStab)(domain2);



//Vertical Stabilizer
var controlsVertical0 = [[0.4,0,-0.005],[1.2,0,-0.005],[1.2,0.4,-0.005],[1.5,1,-0.05],[0.4,1.3,-0.02],[0.2,0.5,-0.03],[-0.55,0,0.05],[0.4,0,-0.005]];
var controlsVertical00 = [[0.4,0,-0.005]];

var controlsVertical1 = [[0.4,0,0.005],[1.2,0,0.005],[1.2,0.4,0.005],[1.5,1,0.05],[0.4,1.3,0.02],[0.2,0.5,0.03],[-0.55,0,-0.05],[0.4,0,0.005]];
var controlsVertical11 = [[0.4,0,0.005]];


var vertStab0 = BEZIER(S0)(controlsVertical0);
var vertStab00 = BEZIER(S0)(controlsVertical00);

var vertStab1 = BEZIER(S0)(controlsVertical1);
var vertStab11 = BEZIER(S0)(controlsVertical11);

var verticalStab0 = BEZIER(S1)([vertStab0,vertStab00]);
var surf_verticalStab0 = MAP(verticalStab0)(domain2);

var verticalStab1 = BEZIER(S1)([vertStab0,vertStab1]);
var surf_verticalStab1 = MAP(verticalStab1)(domain2);

var verticalStab2 = BEZIER(S1)([vertStab00,vertStab11]);
var surf_verticalStab2 = MAP(verticalStab2)(domain2);

var surf_verticalStabilizer = STRUCT([surf_verticalStab0,surf_verticalStab1,surf_verticalStab2]);


var surf_stabilizers = STRUCT([surf_leftHorStab,surf_rightHorStab,surf_verticalStabilizer]);
DRAW(surf_stabilizers);