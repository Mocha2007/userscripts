// Abducted
function ai(){
	const t = 200; // ms; need time for the game to process clicks
	// let eatenToday = needNewChair = needNewDoor = learnedAll = conjured = adjourned = false;
	function linkExists(s){
		return Array.from(document.getElementsByClassName('link-internal'))
			.find(e => e.innerHTML.includes(s));
	}
	// return element if it's the only option, otherwise false
	function onlyOption(){
		const badChoices = [];
		const choices = Array.from(document.getElementsByClassName('link-internal'))
			.filter(e => !badChoices.includes(e.innerHTML));
		return choices.length === 1 ? choices[0] : false;
	}
	function mainLoop(){
		let elem;
		// main gameplay
		if (elem = onlyOption())
			elem.click();
		// misc
		// unknown event
		else {
			clearInterval(interval);
			console.error('unknown event; handing control back to player');
			debugger;
		}
	}
	const interval = setInterval(mainLoop, t);
}