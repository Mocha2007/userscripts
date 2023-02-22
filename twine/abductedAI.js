// Abducted
function ai(){
	// SugarCube.State.current
	const t = 200; // ms; need time for the game to process clicks
	let cafeRejectedToday = eatenToday = weighedToday = false;
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
	function halt(){
		clearInterval(interval);
		console.error('unknown event; handing control back to player');
		debugger;
	}
	function maxFridgeCal(){
		const cap = SugarCube.State.current.variables.cap;
		if (32 <= cap)
			return 400;
		// 8 pastries + some sandwiches
		if (cap <= 12.8)
			return 20 * Math.ceil((1.25*(x-12.8))/3) + 240;
		// some pastries
		return 30 * Math.ceil(1.25*cap/2);
	}
	function mainLoop(){
		let elem;
		// main gameplay
		if (elem = onlyOption()){
			switch(elem.innerHTML){
				case 'Continue':
					// name selector?
					const nameElem = document.getElementById('textbox-name');
					if (nameElem)
						nameElem.value = 'Luna';
					break;
				case 'Dang...':
					cafeRejectedToday = true;
					break;
			}
			elem.click();
		}
		else if (elem = linkExists('Yes')){
			const parent = Array.from(document.body.getElementsByTagName("*"))
				.find(e => Array.from(e.children).includes(elem));
			const no = linkExists('No');
			// hold on we need to figure out what we're agreeing to...
			switch (parent.id){
				case 'passage-wander-around':
					elem.click();
					break;
				default:
					halt();
			}
		}
		else if (elem = linkExists('Spend the rest of the day in bed')){
			// we need to determine if this is the best option
			//set $cal to 10*($cap/2) - $eu
			const cap = SugarCube.State.current.variables.cap; // eg. 18.565689316967042
			const eu = SugarCube.State.current.variables.eu; // eg. 2.5
			const bedcal = 10 * (cap/2) - eu; // eg. 90.3284465848352
			// fridge stuff option is 400 cal flat rate
			if (maxFridgeCal() <= bedcal)
				elem.click();
			else
				linkExists('Get out of bed').click();
			// set $lbs += ($cal-15-($eu*$eu))/35
		}
		// Bathroom
		else if (!weighedToday && (elem = linkExists('Enter Bathroom')))
			elem.click();
		else if (!weighedToday && (elem = linkExists('Step onto scale'))){
			elem.click();
			weighedToday = true;
		}
		else if (elem = linkExists('Leave Bathroom'))
			elem.click();
		// Explore!
		else if (elem = linkExists('Leave Room'))
			elem.click();
		else if (elem = linkExists('Wander around the Lab'))
			elem.click();
		else if (elem = linkExists('Tell her your name'))
			elem.click();
		else if (elem = linkExists('Visit Doctor Halessie\'s office')) // do this if available
			elem.click();
		else if (!cafeRejectedToday && (elem = linkExists('Knock on the door')))
			elem.click();
		else if (!cafeRejectedToday && (elem = linkExists('Attempt to order a meal')))
			elem.click();
		else if (elem = linkExists('Leave'))
			elem.click();
		else if (elem = linkExists('Return to your room')) // tired
			elem.click();
		// Kitchen
		else if (!eatenToday && (elem = linkExists('Check Stasis Fridge')))
			elem.click();
		else if (elem = linkExists('Stuff yourself')) // 10 cal/full, 400 cal flat rate
			elem.click();
		else if (elem = linkExists('Eat Pastry')) // 15 cal/full, 240 cal max
			elem.click();
		else if (elem = linkExists('Have a Sandwich')) // 6.6r cal/full, 160 cal max
			elem.click();
		else if (elem = linkExists('Close Stasis Fridge')){
			elem.click();
			eatenToday = true;
		}
		// Bedroom if no other options available today
		else if (elem = linkExists('Go to bed')){
			elem.click();
			cafeRejectedToday = eatenToday = weighedToday = false;
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
		else
			halt();
	}
	const interval = setInterval(mainLoop, t);
}