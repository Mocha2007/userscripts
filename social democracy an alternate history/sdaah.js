// Functions for Social Democracy: An Alternate History
// https://red-autumn.itch.io/social-democracy

function make_the_nazis_commies(){
	["workers", "new_middle", "old_middle", "rural", "unemployed", "catholics"].forEach(s => {
		let kpd = s + "_kpd";
		let nsdap = s + "_nsdap";
		dendryUI.dendryEngine.state.qualities[kpd] += dendryUI.dendryEngine.state.qualities[nsdap];
		dendryUI.dendryEngine.state.qualities[nsdap] = 0;
	});
}