// Queen Sized
function ai(){
	const t = 1000; // ms; need time for the game to process clicks
	let eatenToday = false;
	let needNewChair = false;
	let needNewDoor = false;
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
		let elem;
		// main gameplay
		if (elem = onlyOption()){
			let newChairElem = document.getElementById('passage-enter-the-dining-hall');
			if (newChairElem && newChairElem.innerHTML.includes('new chair'))
				needNewChair = true;
			elem.click();
		}
		// misc
		else if (elem = linkExists('Back')) // exit whatever menu you're in
			elem.click();
		else if (elem = linkExists('Sleep')){
			elem.click();
			eatenToday = false;
		}
		// Upgrade Menu
		else if ((needNewChair || needNewDoor) && (elem = linkExists('Upgrades')))
			elem.click();
		else if (needNewChair && (elem = linkExists('Get larger Chairs'))){
			elem.click();
			needNewChair = false;
		}
		else if (needNewDoor && (elem = linkExists('XXX'))){
			elem.click();
			needNewDoor = false;
		}
		// Library Menu
		else if (elem = linkExists('Library'))
			elem.click();
		else if (elem = linkExists('Learn how to read'))
			elem.click();
		else if (elem = linkExists('about Sorcery'))
			elem.click();
		else if (elem = linkExists('Read the incantation aloud'))
			elem.click();
		else if (elem = linkExists('Learn how to conjure gold'))
			elem.click();
		// Dining Menu
		else if (!needNewChair && !eatenToday && (elem = linkExists('Dining')))
			elem.click();
		else if (elem = linkExists('Have a meal')){
			elem.click();
			eatenToday = true;
		}
		else if (elem = linkExists('Large Meal'))
			elem.click();
		// Throneroom Menu
		else if (elem = linkExists('Go to the Throne Room'))
			elem.click();
		else if (elem = linkExists('Hold Court'))
			elem.click();
		// misc
		// if can't do anything else, leave...
		else if (elem = linkExists('Leave')){
			elem.click();
			eatenToday = true;
		}
		// unknown event
		else {
			const needDoorElem = document.getElementById('passage-dashboard1');
			if (needDoorElem && needDoorElem.innerHTML.includes(''))
				needNewDoor = true;
			else {
				clearInterval(interval);
				console.error('unknown event; handing control back to player');
			}
		}
	}
	const interval = setInterval(mainLoop, t);
}