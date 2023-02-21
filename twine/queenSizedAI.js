// gaining perspective
function ai(){
	const t = 100; // ms; need time for the game to process clicks
	let eatenToday = false;
	function linkExists(s){
		return Array.from(document.getElementsByClassName('link-internal'))
			.find(e => e.innerHTML.includes(s));
	}
	// return element if it's the only option, otherwise false
	function onlyOption(){
		const badChoices = ['Credits'];
		const choices = Array.from(document.getElementsByClassName('link-internal'))
			.filter(e => !badChoices.includes(e.innerHTML));
		return choices.length === 1 ? choices[0] : false;
	}
	function mainLoop(){
		studyCooldown--;
		let elem;
		// main gameplay
		if (elem = onlyOption())
			elem.click();
		// options
		else if (elem = linkExists('Sleep')){
			elem.click();
			eatenToday = false;
		}
		else if (!eatenToday && elem = linkExists('Dining'))
			elem.click();
		else if (elem = linkExists('Have a meal')){
			elem.click();
			eatenToday = true;
		}
		else if (elem = linkExists('Library'))
			elem.click();
		else if (elem = linkExists('Learn how to read'))
			elem.click();
		// if can't do anything else, leave...
		else if (elem = linkExists('Leave'))
			elem.click();
		// unknown event
		else {
			clearInterval(interval);
			console.error('unknown event; handing control back to player');
		}
	}
	const interval = setInterval(mainLoop, t);
}