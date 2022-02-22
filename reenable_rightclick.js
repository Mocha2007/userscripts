// ==UserScript==
// @name     Re-Enable Right-Click
// @version  1
// @grant    none
// @author   mocha2007
// ==/UserScript==
Array.from(document.getElementsByTagName("*")).forEach(elem => {
	elem.removeAttribute('ondragstart');
	elem.removeAttribute('onselectstart');
	elem.removeAttribute('oncontextmenu');
});