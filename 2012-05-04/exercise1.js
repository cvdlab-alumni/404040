//exercise 1

var domain2 = DOMAIN([[0,1],[0,1]])([15,30]);

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
DRAW(surf_wing);