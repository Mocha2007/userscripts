const M = Game.Objects["Wizard tower"].minigame;
const cbgCost = Math.floor(0.4 * M.magicM) + 2;
const cpsMod = Game.cookiesPs / Game.cookiesPsRaw;

if((M.magic === M.magicM && 1 <= cpsMod) || cbgCost <= M.magic && 1 < cpsMod)
	M.castSpell(M.spells["conjure baked goods"]);