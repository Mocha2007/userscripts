// auto-1k-ascend
// https://cookieclicker.fandom.com/wiki/Endless_cycle#Strategy

// ready to ascend
if (Game.resets < 1000 && 1 <= Game.ascendMeterLevel){
	Game.Ascend(1);
	setTimeout(() => Game.Reincarnate(1), 6000); // needs about 6s to load
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