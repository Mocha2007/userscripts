// Abducted
function ai(){
	// SugarCube.State.current
	const t = 200; // ms; need time for the game to process clicks
	let abbi = cafeRejectedToday = eatenToday = weighedToday = secCBU = false;
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
		// debugger;
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
				case 'passage-wander-around': // burns eu cals but adds 1 to help
					if (SugarCube.State.current.variables.helptot < 6) // we need 6 to unlock cafeteria
						elem.click();
					else
						no.click();
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
			const bedcal = 5 * cap - eu; // eg. 90.3284465848352
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
		/*
		else if (elem = linkExists('Use shower')) // abbi feeding event?
			elem.click();
		*/
		else if (elem = linkExists('Leave Bathroom'))
			elem.click();
		// OwO WHAT'S THIS???
		else if (elem = linkExists('Check on ABBI'))
			elem.click();
		else if (!abbi && (elem = linkExists('Repair ABBI')))
			elem.click();
		else if (elem = linkExists('abbi')) // puzzle
			Array.from(document.getElementById('passages').children[0].children)
				.find(e => e.dataset.passage && e.dataset.passage.includes('correct'))
				.click();
		else if (elem = linkExists('messages'))
			elem.click();
		else if (elem = linkExists('Next')){
			elem.click();
			abbi = true;
		}
		else if (elem = linkExists('Chat with ABBI'))
			elem.click();
		else if (elem = linkExists('Get a better look at the purple liquid'))
			elem.click();
		else if (elem = linkExists('Drink the purple liquid'))
			elem.click();
		else if (elem = linkExists('Try and open the door'))
			elem.click();
		else if (!secCBU && (elem = linkExists('Terminal')))
			elem.click();
		else if (elem = linkExists('Unlock Security Corridor B'))
			elem.click();
		else if (elem = linkExists('Step away from terminal')){
			elem.click();
			secCBU = true;
		}
		else if (elem = linkExists('Computer (One-Way)'))
			elem.click();
		// priority: N = W = E > S
		else if (!secCBU && (elem = linkExists('North:')))
			elem.click();
		else if (!secCBU && (elem = linkExists('West:')))
			elem.click();
		else if (secCBU && (elem = linkExists('East:')))
			elem.click();
		else if (secCBU && (elem = linkExists('South:')))
			elem.click();
		// Explore!
		else if (elem = linkExists('Leave Room'))
			elem.click();
		// Explore! (chapter 3)
		else if (elem = linkExists('Wander around the Facility\'s surrounding forest'))
			elem.click();
		else if (elem = linkExists('Approach the creature'))
			elem.click();
		else if (elem = linkExists('Stand your ground')) // treant feeding
			elem.click();
		else if (elem = linkExists('Meet with the treant')) // treant feeding
			elem.click();
		else if (elem = linkExists('Venture into the grove'))
			elem.click();
		else if (elem = linkExists('Keep moving'))
			elem.click();
		else if (elem = linkExists('Drink deeper of the Wellspring'))
			elem.click();
		// NOT WORTH IT: eating the fruit: 1/3 change of 6.6r food, 1/6 chance of 33.3r food, 1/3 chance of basically nothing, 1/6 chance of cap malus
		// Explore! (chapter 2)
		else if (elem = linkExists('Take a look inside'))
			elem.click();
		else if (elem = linkExists('Wander around in Residential and Recreation'))
			elem.click();
		// Explore! (chapter 1)
		else if (elem = linkExists('Wander around the Lab')) // burns eu*2 cals but unlocks options
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
			abbi = cafeRejectedToday = eatenToday = weighedToday = false;
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
		// phase 2
		else if (elem = linkExists('Move forward with the Treatment'))
			elem.click();
		else if (elem = linkExists('Your body has already'))
			elem.click();
		else if (elem = linkExists('Help out'))
			elem.click();
		// Chapter 0
		else if (elem = linkExists('Go to work'))
			elem.click();
		// Chapter 3
		else if (elem = linkExists('break down'))
			elem.click();
		// unknown event
		else
			halt();
	}
	const interval = setInterval(mainLoop, t);
}