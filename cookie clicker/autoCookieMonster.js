CookieMonsterData.mocha = [1, "Cursor", Infinity]; // purchase type, name, pp
// check Objects1
Object.keys(CookieMonsterData.Objects1).forEach(key => {
	const pp = CookieMonsterData.Objects1[key].pp;
	if (pp !== null && pp < CookieMonsterData.mocha[2])
		CookieMonsterData.mocha = [1, key, pp];
});
// check Objects10
Object.keys(CookieMonsterData.Objects10).forEach(key => {
	const pp = CookieMonsterData.Objects10[key].pp;
	if (pp !== null && pp < CookieMonsterData.mocha[2])
		CookieMonsterData.mocha = [10, key, pp];
});
// check Objects100
Object.keys(CookieMonsterData.Objects100).forEach(key => {
	const pp = CookieMonsterData.Objects100[key].pp;
	if (pp !== null && pp < CookieMonsterData.mocha[2])
		CookieMonsterData.mocha = [100, key, pp];
});
// check Upgrades
/*
Object.keys(CookieMonsterData.Upgrades).forEach(key => {
	const pp = CookieMonsterData.Upgrades[key].pp;
	if (pp !== null && pp < CookieMonsterData.mocha[2])
		CookieMonsterData.mocha = [0, key, pp];
});
*/
console.debug(CookieMonsterData.mocha); // for testing

Game.Notify(`Buy ${CookieMonsterData.mocha[0]} ${CookieMonsterData.mocha[1]}\n(pp = ${Math.round(CookieMonsterData.mocha[2])} s)`,
	'', [Game.ObjectsById.findIndex(o => o.name === CookieMonsterData.mocha[1]), 0]);

if (CookieMonsterData.mocha[0] === 0){
	// Game.Upgrades[CookieMonsterData.mocha[1]].earn();
}
else
	Game.Objects[CookieMonsterData.mocha[1]].buy(CookieMonsterData.mocha[0]);