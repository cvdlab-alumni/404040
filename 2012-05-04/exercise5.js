//exercise 5

var domain2 = DOMAIN([[0,1],[0,1]])([15,30]);



/******************************* FUSELAGE *******************************/
var controls_cockpit_up = [[0.35,0,0],[0.55,0,0],[0,0.4,0],[0,-0.4,0]];
var controls_cockpit_down = [[0.35,0,0],[0.55,0,0],[0,-0.4,0],[0,0.4,0]];
var controls_top_up = [[0.1,0,0.3],[0.8,0,0.3],[0,1.4,0],[0,-1.4,0]];
var controls_top_down = [[0.1,0,0.3],[0.8,0,0.3],[0,-1.2,0],[0,1.2,0]];
var controls_A_up = [[0.05,0,0.5],[0.85,0,0.5],[0,1.6,0],[0,-1.6,0]];
var controls_A_down = [[0.05,0,0.5],[0.85,0,0.5],[0,-1.2,0],[0,1.2,0]];
var controls_B_up = [[0,0,1.5],[0.9,0,1.5],[0,1.8,0],[0,-1.8,0]];
var controls_B_down = [[0,0,1.5],[0.9,0,1.5],[0,-1.8,0],[0,1.8,0]];
var controls_C_up = [[0.2,0,3.8],[0.7,0,3.8],[0,1.2,0],[0,-1.2,0]];
var controls_C_down = [[0.2,0,3.8],[0.7,0,3.8],[0,-1.2,0],[0,1.2,0]];
var controls_Bottom_up = [[0.4,0,4.8],[0.5,0,4.8],[0,0.6,0],[0,-0.6,0]];
var controls_Bottom_down = [[0.4,0,4.8],[0.5,0,4.8],[0,-0.6,0],[0,0.6,0]];

var halfCurve_cockpit_up = CUBIC_HERMITE(S0)(controls_cockpit_up);
var halfCurve_cockpit_down = CUBIC_HERMITE(S0)(controls_cockpit_down);
var halfCurve_top_up = CUBIC_HERMITE(S0)(controls_top_up);
var halfCurve_top_down = CUBIC_HERMITE(S0)(controls_top_down);
var halfCurve_A_up = CUBIC_HERMITE(S0)(controls_A_up);
var halfCurve_A_down = CUBIC_HERMITE(S0)(controls_A_down);
var halfCurve_B_up = CUBIC_HERMITE(S0)(controls_B_up);
var halfCurve_B_down = CUBIC_HERMITE(S0)(controls_B_down);
var halfCurve_C_up = CUBIC_HERMITE(S0)(controls_C_up);
var halfCurve_C_down = CUBIC_HERMITE(S0)(controls_C_down);
var halfCurve_Bottom_up = CUBIC_HERMITE(S0)(controls_Bottom_up);
var halfCurve_Bottom_down = CUBIC_HERMITE(S0)(controls_Bottom_down);

var s_cockpittop_up = CUBIC_HERMITE(S1)([halfCurve_cockpit_up,halfCurve_top_up,[0,0,0],[0,0,0]]);
var surface_cockpittop_up = MAP(s_cockpittop_up)(domain2);
var s_cockpittop_down = CUBIC_HERMITE(S1)([halfCurve_cockpit_down,halfCurve_top_down,[0,0,0],[0,0,0]]);
var surface_cockpittop_down = MAP(s_cockpittop_down)(domain2);

var s_topA_up = CUBIC_HERMITE(S1)([halfCurve_top_up,halfCurve_A_up,[0,0,0],[0,0,0]]);
var surface_topA_up = MAP(s_topA_up)(domain2);
var s_topA_down = CUBIC_HERMITE(S1)([halfCurve_top_down,halfCurve_A_down,[0,0,0],[0,0,0]]);
var surface_topA_down = MAP(s_topA_down)(domain2);

var s_AB_up = CUBIC_HERMITE(S1)([halfCurve_A_up,halfCurve_B_up,[0,0,0],[0,0,0]]);
var surface_AB_up = MAP(s_AB_up)(domain2);
var s_AB_down = CUBIC_HERMITE(S1)([halfCurve_A_down,halfCurve_B_down,[0,0,0],[0,0,0]]);
var surface_AB_down = MAP(s_AB_down)(domain2);

var s_BC_up = CUBIC_HERMITE(S1)([halfCurve_B_up,halfCurve_C_up,[0,0,0],[0,0,0]]);
var surface_BC_up = MAP(s_BC_up)(domain2);
var s_BC_down = CUBIC_HERMITE(S1)([halfCurve_B_down,halfCurve_C_down,[0,0,0],[0,0,0]]);
var surface_BC_down = MAP(s_BC_down)(domain2);

var s_CBottom_up = CUBIC_HERMITE(S1)([halfCurve_C_up,halfCurve_Bottom_up,[0,0,0],[0,0,0]]);
var surface_CBottom_up = MAP(s_CBottom_up)(domain2);
var s_CBottom_down = CUBIC_HERMITE(S1)([halfCurve_C_down,halfCurve_Bottom_down,[0,0,0],[0,0,0]]);
var surface_CBottom_down = MAP(s_CBottom_down)(domain2);

var surf_fuselage = STRUCT([surface_cockpittop_up,
							surface_cockpittop_down,
							surface_topA_up,
							surface_topA_down,
							surface_AB_up,
							surface_AB_down,
							surface_BC_up,
							surface_BC_down,
							surface_CBottom_up,
							surface_CBottom_down
							]);

DRAW(COLOR([0.5,0,0])(surf_fuselage));




/******************************* WINGS *******************************/
var p0 = [[1.5,0,0], [-0.5,0.25,0], [-0.5,-0.1,0], [1.5,0,0]];
var p1 = p0.map(function(p) {return [p[0], p[1], p[2]+1.4]});
var p2 = [[1.5,0,0], [-0.35,0.25,0], [-0.35,-0.1,0], [1.5,0,0]].map(function(p) {return [p[0], p[1], p[2]+2.1]});
var p3 = [[1.5,0,0], [-0.1,0.25,0], [-0.1,-0.1,0], [1.5,0,0]].map(function(p) {return [p[0], p[1], p[2]+2.8]});
var p4 = [[1.5,0,0], [0.15,0.25,0], [0.15,-0.1,0], [1.5,0,0]].map(function(p) {return [p[0], p[1], p[2]+3.2]});
var p5 = [[1.4,0,0], [0.85,0.15,0], [0.85,-0.05,0], [1.4,0,0]].map(function(p) {return [p[0], p[1], p[2]+3.4]});
var p6 = [[1.3,0,0], [1.1,0.08,0], [1.1,-0.04,0], [1.3,0,0]].map(function(p) {return [p[0], p[1], p[2]+3.49]});
var p7 = [[1.25,0.01,0], [1.18,0.06,0], [1.18,-0.04,0], [1.25,0.01,0]].map(function(p) {return [p[0], p[1], p[2]+3.5]});

var c0 = BEZIER(S0)(p0);	// profilo dell'ala nel punto più vicino alla fusoliera
var c1 = BEZIER(S0)(p1);	//			.
var c2 = BEZIER(S0)(p2);	//			.
var c3 = BEZIER(S0)(p3);	//			.
var c4 = BEZIER(S0)(p4);	//			.
var c5 = BEZIER(S0)(p5);	// 			.
var c6 = BEZIER(S0)(p6);	//			.
var c7 = BEZIER(S0)(p7);	// profilo dell'ala nel punto più distante dalla fusoliera (la coda)

var wing = BEZIER(S1)([c0,c1,c2,c3,c4,c5,c6,c7]);
var surf_wing = MAP(wing)(domain2);

var surf_left_wing = R([0,2])(-PI/2)(T([0,1,2])([0.6,0.2,-0.15])(surf_wing));
var surf_right_wing = R([0,1])(PI)(T([0,1])([-0.9,-0.4])(surf_left_wing));

var surf_wings = STRUCT([surf_left_wing,surf_right_wing]);
DRAW(COLOR([0.5,0,0])(surf_wings));





/******************************* STABILIZERS *******************************/
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

var surf_stabilizers = R([0,2])(-PI/2)(T([0,2])([4.1,-0.45])(surf_stabilizers));
DRAW(COLOR([0,0,1])(surf_stabilizers));




/******************************* AIRCRAFT *******************************/
var aircraft = STRUCT([surf_fuselage, surf_wings, surf_stabilizers]);
DRAW(aircraft);




/******************************* AIRSTRIP *******************************/
var airstrip = POLYLINE([[-40,-5],[42,-5],[42,5.9],[-40,5.9],[-40,-5]]);
DRAW(COLOR([0,0,0])(airstrip));

var line0 = POLYLINE([[-38,-0.5],[-35,-0.5],[-35,0.5],[-38,0.5],[-38,-0.5]]);
var line1 = POLYLINE([[-33,-0.5],[-30,-0.5],[-30,0.5],[-33,0.5],[-33,-0.5]]);
var line2 = POLYLINE([[-28,-0.5],[-25,-0.5],[-25,0.5],[-28,0.5],[-28,-0.5]]);
var line3 = POLYLINE([[-23,-0.5],[-20,-0.5],[-20,0.5],[-23,0.5],[-23,-0.5]]);
var line4 = POLYLINE([[-18,-0.5],[-15,-0.5],[-15,0.5],[-18,0.5],[-18,-0.5]]);
var line5 = POLYLINE([[-13,-0.5],[-10,-0.5],[-10,0.5],[-13,0.5],[-13,-0.5]]);
var line6 = POLYLINE([[-8,-0.5],[-5,-0.5],[-5,0.5],[-8,0.5],[-8,-0.5]]);
var line7 = POLYLINE([[-3,-0.5],[0,-0.5],[0,0.5],[-3,0.5],[-3,-0.5]]);
var line8 = POLYLINE([[2,-0.5],[5,-0.5],[5,0.5],[2,0.5],[2,-0.5]]);
var line9 = POLYLINE([[7,-0.5],[10,-0.5],[10,0.5],[7,0.5],[7,-0.5]]);
var line10 = POLYLINE([[12,-0.5],[15,-0.5],[15,0.5],[12,0.5],[12,-0.5]]);
var line11 = POLYLINE([[17,-0.5],[20,-0.5],[20,0.5],[17,0.5],[17,-0.5]]);
var line12 = POLYLINE([[22,-0.5],[25,-0.5],[25,0.5],[22,0.5],[22,-0.5]]);
var line13 = POLYLINE([[27,-0.5],[30,-0.5],[30,0.5],[27,0.5],[27,-0.5]]);
var line14 = POLYLINE([[32,-0.5],[35,-0.5],[35,0.5],[32,0.5],[32,-0.5]]);
var line15 = POLYLINE([[37,-0.5],[40,-0.5],[40,0.5],[37,0.5],[37,-0.5]]);
var lines = STRUCT([line0,line1,line2,line3,line4,line5,line6,line7,line8,line9,line10,line11,line12,line13,line14,line15]);
DRAW(lines);
