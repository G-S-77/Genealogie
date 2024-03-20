function addEvent(a,b,c,d){(a.addEventListener)?a.addEventListener(b,c,d||!1):a.attachEvent("on"+b,c);}
function removeEvent(a,b,c,d){a.removeEventListener?a.removeEventListener(b,c,d||!1):a.detachEvent("on"+b, c);}

function endMove(){

	main.className = "canMove";
	
	removeEvent(document, "mousemove", doMove);
	removeEvent(document, "mouseup", endMove);

}

function doMove(e){
	
	var dX = initialClickX - e.clientX,
		dY = initialClickY - e.clientY;

	window.scrollTo(initialScrollX + dX, initialScrollY + dY);

}

function initMove(e){
	
	// if (!outilMain) return;

	e.preventDefault ? e.preventDefault() : (e.returnValue = false);

	main.className = "inMove";

	initialScrollX = window.pageXOffset || document.documentElement.scrollLeft;
	initialScrollY = window.pageYOffset || document.documentElement.scrollTop;

	initialClickX = e.clientX;
	initialClickY = e.clientY;

	addEvent(document, "mousemove", doMove);
	addEvent(document, "mouseup", endMove);

}

function modeMain(){
	
	outilMain = outilMain ? false : true;
	btnMain.className = outilMain ? "active" : "";
	main.className = outilMain ? "canMove" : "";

}

var transform;

if ("transform" in document.body.style) {

	transform = "transform";

}else {

	for (p in document.body.style) {

		if (/^((Moz|(?:w|W)ebkit|ms|o)Transform)/.exec(p)) {
			transform = RegExp.$1;
			break;
		}

	}

}

var main = document.getElementById("Main");

var	zoomIn = document.querySelector("#zoom span:first-child"),
	zoomOut = document.querySelector("#zoom span+span"),
	zoomInput = document.querySelector("#zoom input");

var btnMain = document.querySelector("#modes span:first-child"),
	btnZoom = document.querySelector("#modes span+span");

var actualZoom = 1,
	deltaZoom = .1;

var outilMain = true,
	zoomAuScroll = false;


zoomInput.value = "100";

if (transform) {
	main.style[transform+"Origin"] = "0 0"
}else {
	document.getElementById("zoom").style.display = btnZoom.style.display = "none";
}


addEvent(main, "mousedown", initMove);
