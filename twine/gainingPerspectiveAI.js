// gaining perspective
function ai(){
	const t = 100; // ms; need time for the game to process clicks
	const emergencyCreditAllocation = 15; // credits to take care of immediate health risks that may arise - 10 is apparently too low
	let neededCredits = 12 + emergencyCreditAllocation;
	let studyCooldown = 10;
	let neededCookies = 3; // https://forum.weightgaming.com/t/quick-start-guide/1444
	function enoughCredits(){
		try {
			const creditElement = Array.from(document.getElementsByTagName('b'))
				.find(e => e.innerHTML === 'Uncle Credits:').parentElement.children[2].children[0];
			return neededCredits < parseInt(creditElement.innerHTML);
		}
		catch (_){
			return false;
		}
	}
	function linkExists(s){
		return Array.from(document.getElementsByTagName('tw-link'))
			.find(e => e.innerHTML.includes(s));
	}
	// return element if it's the only option, otherwise false
	function onlyOption(){
		const badChoices = ['<b>?</b>', '(?)', 'Author Homepage', 'Call in Favor',
			'Cheat Menu', 'Save/Load Game', 'Seek Treatment', 'Twine 2.0'];
		const choices = Array.from(document.getElementsByTagName('tw-link'))
			.filter(e => !badChoices.includes(e.innerHTML));
		return choices.length === 1 ? choices[0] : false;
	}
	function weight(){
		return +Array.from(document.getElementsByTagName('tw-expression'))
			.filter(e => !isNaN(+e.innerHTML) && 200 < +e.innerHTML)[0].innerHTML;
	}
	function mainLoop(){
		studyCooldown--;
		let elem;
		// main gameplay
		if (elem = onlyOption()){
			if (elem.innerHTML === 'Damn.')
				studyCooldown = 10;
			elem.click();
		}
		// Paul credits
		else if (elem = linkExists('(NEW)'))
			elem.click();
		else if (elem = linkExists('Medical studies?'))
			elem.click();
		else if (elem = linkExists('Move in with Paul'))
			elem.click();
		else if (elem = linkExists('a week')){
			elem.click();
			neededCredits -= 5;
		}
		else if (elem = linkExists('Yes Please.'))
			elem.click();
		else if (elem = linkExists('Bariatric Bed')){ // happens twice
			elem.click();
			neededCredits -= 1;
		}
		else if (elem = linkExists('Bariatric Sling / Crane')){
			elem.click();
			neededCredits -= 1;
		}
		else if (elem = linkExists('Ventilator')){
			elem.click();
			neededCredits -= 1;
		}
		else if (elem = linkExists('Heart Defibrillator')){
			elem.click();
			neededCredits -= 1;
		}
		else if (elem = linkExists('Feeding Tube')){
			elem.click();
			neededCredits -= 1;
		}
		else if (elem = linkExists('Audio Communication Link')){
			elem.click();
			neededCredits -= 1;
		}
		// waste credits on stuff
		// Participate in medical study
		// Meal Replacement and Caloric Supplements (1 credit)
		else if (studyCooldown < 0 && enoughCredits() && neededCookies === 0 // if we still need cookies, hold off on this...
				&& (elem = linkExists('Call in Favor')
					|| (elem = linkExists('Participate in medical study'))
					|| (elem = linkExists('Meal Replacement and Caloric Supplements'))))
			elem.click();
		else if (elem = linkExists('Sorry. Nothing, actually.'))
			elem.click();
		// common decisions
		// girlscouts - other options are "How many can you sell me?" and "*sigh*"
		else if (elem = linkExists('No deal.'))
			elem.click();
		// girlscout begs - other option is "Fine, I'll take a couple boxes"
		else if (elem = linkExists('Eugh.'))
			elem.click();
		else if (elem = linkExists('let her go.')){ // alt: "bring the cookies down to you"
			if (0 < neededCookies)
				elem.click();
			else
				linkExists('bring the cookies down to you').click();
		}
		else if (elem = linkExists('Head over there'))
			elem.click();
		else if (elem = linkExists('No problem. Be there shortly.'))
			elem.click();
		else if (elem = linkExists('Leave it alone.'))
			elem.click();
		else if (elem = linkExists('You could probably head over there.'))
			elem.click();
		else if (elem = linkExists('You really want to head over there?'))
			elem.click();
		else if (elem = linkExists('You can probably still get up.')){ // select "decline" here - more trouble than it's worth
			if (!enoughCredits())
				elem.click();
			else
				linkExists('Decline').click();
		}
		else if (elem = linkExists('See you tomorrow!'))
			elem.click();
		else if (elem = linkExists('No problem. I\'ll hang around.'))
			elem.click();
		else if ((elem = linkExists('not today.')) || (elem = linkExists('Not happening.'))){ // the second is after Donna
			if (!enoughCredits() || neededCookies === 0 || 1500 <= weight())
				elem.click();
			else if (elem = linkExists('Yes. Yes. YES.')){
				elem.click();
				neededCookies--;
			}
			else {
				linkExists('Confirm another order.').click();
				neededCookies--;
			}
		}
		else if (elem = linkExists('still no.')){
			if (!enoughCredits())
				elem.click();
			else
				linkExists('confirm the order.').click();
		}
		else if (elem = linkExists('Make yourself useful.')){ // seems to be worthwhile, unlike previous option
			if (!enoughCredits())
				elem.click();
			else
				linkExists('Refuse').click();
		}
		else if (elem = linkExists('Not that thirsty.')){ // todo: only choose this if weight < 1500
			if (0 < neededCookies)
				elem.click();
			else
				linkExists('slurp').click();
		}
		else if (elem = linkExists('Sounds like a regrettable mistake in the making.'))
			elem.click();
		// on verge of death
		else if (elem = linkExists('seek medical assistance'))
			elem.click();
		else if (elem = linkExists('EMT'))
			elem.click();
		else if (elem = linkExists('One-time general health boost?'))
			elem.click();
		else if (elem = linkExists('Let Paul Handle It.')) // 1 credit
			elem.click();
		else if (elem = linkExists('Summon a Trained Medic')) // 2 credits - if the previous is not an option...
			elem.click();
		else if (elem = linkExists('continue')) // non-critical medical issue
			elem.click();
		// starting a new game
		else if (elem = linkExists('Load Game')) // main menu - can't directly test New Game because the end screen says that, too
			linkExists('New Game').click();
		else if (elem = linkExists('Woman')) // gender
			elem.click();
		else if (elem = linkExists('Have some toast and cereal')) // what to eat for breakfast
			elem.click();
		else if (elem = linkExists('Tomorrow')) // when to visit Paul
			elem.click();
		// milestones
		else if (elem = linkExists('Make it happen. Keep my secret.')) // when to visit Paul
			elem.click();
		else if (elem = linkExists('Make it happen. Please keep my secret.')) // a variant? or is the first one wrong?
			elem.click();
		else if (elem = linkExists('You agree')) // alt: "You ask to maintain your 'normal' food intake."
			elem.click();
		else if (elem = linkExists('hang around')) // Donna
			elem.click();
		else if (elem = linkExists('Let her send the application.')) // Donna good ending
			elem.click();
		else if (elem = linkExists('Assure her')) // Donna - idk if this one matters
			elem.click();
		else if (elem = linkExists('Take the cash')){
			if (!enoughCredits())
				elem.click();
			else
				linkExists('Take the snacks').click();
		}
		// unknown event
		else if (Array.from(document.getElementsByTagName('tw-link')).length) {
			clearInterval(interval);
			console.error('unknown event; handing control back to player');
		}
	}
	const interval = setInterval(mainLoop, t);
}