// create the show side nav menu

let sideNav = document.getElementById("side-nav");
let menu = document.getElementById("menu");

function showMenu() {
	sideNav.style.width = "90vw";
	document.body.style.overflow = "hidden";
	sideNav.style.overflowX = "auto";
	document.body.style.backgroundColor = "rgba(0,0,0,0.7)";
	document.body.style.transition = "background-color 0.5s linear";
}

function hideMenu() {
	sideNav.style.width = "0";
	document.body.style.overflow = "auto";
	document.body.style.backgroundColor = "#e6e6e6";
}



