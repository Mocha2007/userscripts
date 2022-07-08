// auto-1k-ascend
// https://cookieclicker.fandom.com/wiki/Endless_cycle#Strategy

// if game normal
if (!Game.mocha)
	// ready to ascend
	if (1 <= Game.ascendMeterLevel){
		Game.Ascend(1);
		Game.mocha = true;
	}
	// not ready yet
	else {
		// step 1
		if (Game.Objects.Cursor.amount < 100)
			Game.Objects.Cursor.buy(100);
		else if (Game.Objects.Grandma.amount < 100)
			Game.Objects.Grandma.buy(100);
		// step 3
		else {
			Game.Objects["Fractal engine"].buy(100);
			Game.Objects.Idleverse.buy(100);
		}
		// step 2/4
		Game.storeBuyAll();
	}
// if game in ascend mode
else {
	Game.Reincarnate(1);
	Game.mocha = false;
}