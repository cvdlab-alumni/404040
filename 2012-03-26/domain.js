//dominio monodimensionale
var domain1 = DOMAIN([[1,5]])(4);

//dominio bidimensionale
var domain2 = DOMAIN([[1.5,5.5],[1,3]])([4,2]);

//dominio tridimensionale
var domain3 = DOMAIN([[1.5,5.5],[1,3],[0,1]])([4,2,1]);

//DRAW(domain); disegna l'oggetto domain
//HIDE(domain); nasconde l'oggetto domain
//SHOW(domain); rimostra l'oggetto domain