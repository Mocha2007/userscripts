// Functions for Social Democracy: An Alternate History
// https://red-autumn.itch.io/social-democracy
// https://github.com/aucchen/social_democracy_alternate_history

function make_the_nazis_commies(p = 1.0){
	dendryUI.dendryEngine.state.qualities.classes.forEach(s => {
		let kpd = s + "_kpd";
		let nsdap = s + "_nsdap";
		dendryUI.dendryEngine.state.qualities[kpd] += p * dendryUI.dendryEngine.state.qualities[nsdap];
		dendryUI.dendryEngine.state.qualities[nsdap] *= 1.0 - p;
	});
}

function insta_left_coalition(){
	["spd", "kpd"].forEach(p => dendryUI.dendryEngine.state.qualities.classes.forEach(s => dendryUI.dendryEngine.state.qualities[s + "_" + p] *= 2.3));
	dendryUI.dendryEngine.state.qualities.kpd_relation = 100;
	dendryUI.dendryEngine.state.qualities.communist_coalition = 100; // unsure how high this needs to be...
	dendryUI.dendryEngine.state.qualities.kpd_cooperation_seen = 1;
}