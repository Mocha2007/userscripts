// Abducted
function ai(){
	const t = 200; // ms; need time for the game to process clicks
	let eatenToday = weighedToday = false;
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
		if (elem = onlyOption()){
			if (elem.innerHTML === 'Continue'){
				// name selector
				const nameElem = document.getElementById('textbox-name');
				if (nameElem)
					nameElem.value = 'Luna';
			}
			elem.click();
		}
		// Bathroom
		else if (!weighedToday && (elem = linkExists('Enter Bathroom'))
			elem.click();
		else if (!weighedToday && (elem = linkExists('Step onto scale')){
			elem.click();
			weighedToday = true;
		}
		else if (elem = linkExists('Leave Bathroom')
			elem.click();
		// Kitchen
		else if (!eatenToday && (elem = linkExists('Check Stasis Fridge'))
			elem.click();
		else if (elem = linkExists('Eat Pastry') // 15 cal/full
			elem.click();
		else if (elem = linkExists('Close Stasis Fridge'){
			elem.click();
			eatenToday = true;
		}
		// Bedroom if no other options available today
		else if (elem = linkExists('Go to bed'){
			elem.click();
			eatenToday = weighedToday = false;
		}
		// new game
		else if (elem = linkExists('Female'))
			elem.click();
		else if (elem = linkExists('Next you will choose a name'))
			elem.click();
		else if (elem = linkExists('Skip the Prologue'))
			elem.click();
		else if (elem = linkExists('Begin'))
			elem.click();
		else if (elem = linkExists('What do you want from me?'))
			elem.click();
		// unknown event
		else {
			clearInterval(interval);
			console.error('unknown event; handing control back to player');
			debugger;
		}
	}
	const interval = setInterval(mainLoop, t);
}