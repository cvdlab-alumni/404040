//exercise 2

var domain2 = DOMAIN([[0,1],[0,1]])([15,30]);

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

DRAW(surf_fuselage);