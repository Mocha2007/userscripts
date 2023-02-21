// Queen Sized
function ai(){
	const t = 1000; // ms; need time for the game to process clicks
	let eatenToday = needNewChair = needNewDoor = learnedAll = conjured = adjourned = false;
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
			conjured = false;
			adjourned = false;
		}
		else if (elem = linkExists('Have some biscuits')) // Madeleine randomly does this when you leave a room...
			elem.click();
		// Upgrade Menu
		else if ((needNewChair || needNewDoor) && (elem = linkExists('Upgrades')))
			elem.click();
		else if (needNewChair && (elem = linkExists('Get larger Chairs'))){
			elem.click();
			needNewChair = false;
		}
		else if (needNewDoor && (elem = linkExists('Widen your Doors'))){
			elem.click();
			needNewDoor = false;
		}
		// Library Menu
		else if ((!learnedAll || !conjured) && (elem = linkExists('Library')))
			elem.click();
		else if (elem = linkExists('Learn how to read'))
			elem.click();
		else if (!conjured && (elem = linkExists('about Sorcery')))
			elem.click();
		else if (elem = linkExists('Read the incantation aloud'))
			elem.click();
		else if (elem = linkExists('Learn how to conjure gold'))
			elem.click();
		else if (elem = linkExists('Conjure gold')){
			elem.click();
			conjured = true;
		}
		else if (elem = linkExists('Learn how to decrease weight'))
			elem.click();
		else if (elem = linkExists('Learn how to increase weight'))
			elem.click();
		else if (elem = linkExists('Finish Reading')){
			elem.click();
			learnedAll = true;
		}
		// Throneroom Menu
		else if (!adjourned && (elem = linkExists('Go to the Throne Room')))
			elem.click();
		else if (elem = linkExists('Hold Court'))
			elem.click();
		else if (elem = linkExists('Continue Holding Court'))
			elem.click();
		else if (elem = linkExists('Conscript a large Army to invade'))
			elem.click();
		else if (elem = linkExists('Fund Annette\'s Laboratory'))
			elem.click();
		else if (elem = linkExists('Give the Commander the money'))
			elem.click();
		else if (elem = linkExists('Help fix the Cathedral'))
			elem.click();
		else if (elem = linkExists('Hire Madeleine'))
			elem.click();
		else if (elem = linkExists('Send aid to the village'))
			elem.click();
		else if (elem = linkExists('Test the Potion')) // I may need to test data-passage to see if this is safe or not...
			elem.click();
		else if (elem = linkExists('Yes, please'))
			elem.click();
		else if (elem = linkExists('Organize your Royal Court')){
			adjourned = true;
			linkExists('Leave').click();
		}
		// Dining Menu
		else if (!needNewChair && !eatenToday && (elem = linkExists('Dining')))
			elem.click();
		else if (elem = linkExists('Have a meal')){
			elem.click();
			eatenToday = true;
		}
		else if (elem = linkExists('Large Meal'))
			elem.click();
		// misc
		// if can't do anything else, leave...
		else if (elem = linkExists('Leave')){
			elem.click();
			if (linkExists('Host a Feast')) // we must be dining
				eatenToday = true;
		}
		// unknown event
		else {
			const needDoorElem = document.getElementById('passage-dashboard1');
			if (needDoorElem && needDoorElem.innerHTML.includes('new door'))
				needNewDoor = true;
			else {
				clearInterval(interval);
				console.error('unknown event; handing control back to player');
				debugger;
			}
		}
	}
	const interval = setInterval(mainLoop, t);
}