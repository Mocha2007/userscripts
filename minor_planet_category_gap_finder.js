const qQ2ae = (q, Q) => [(q+Q)/2, (Q-q)/(Q+q)];
/// https://en.wikipedia.org/wiki/List_of_minor_planets#Category
class MPCat {
	static NEO = "NEO";
	static MARSCROSSER = "MARSCROSSER";
	static MBA_INNER = "MBA_INNER";
	static MBA_MIDDLE = "MBA_MIDDLE";
	static MBA_OUTER = "MBA_OUTER";
	static TROJAN = "TROJAN";
	static CENTAUR = "CENTAUR";
	static TNO = "TNO";
	static categorize(q, Q){
		if (q < 1.3) {
			return this.NEO;
		}
		const [a, e] = qQ2ae(q, Q);
		if (1.3 <= q && q < 5/3 && a < 3.2) {
			return this.MARSCROSSER;
		}
		if (5/3 <= q && a < 2.5) {
			return this.MBA_INNER;
		}
		if (5/3 <= q && 2.5 <= a && a < 2.82) {
			return this.MBA_MIDDLE;
		}
		if (5/3 <= q && 2.82 <= a && a < 4.6) {
			return this.MBA_OUTER;
		}
		if (4.6 <= a && a < 5.5 && e < 0.3) {
			return this.TROJAN;
		}
		if (5.5 <= a && a < 30.1) {
			return this.CENTAUR;
		}
		if (30.1 <= a) {
			return this.TNO;
		}
	}
}

const CONSTANTS = {
	q_min: 1.3,
	q_max: 30.1,
	get q_range(){
		return this.q_max-this.q_min;
	},
	Q_min: 1.3,
	Q_max: 58.9,
	get Q_range(){
		return this.Q_max-this.Q_min;
	},
};

for (let i = 0; i < 1e3; i++){
	const q = Math.random()*CONSTANTS.q_range + CONSTANTS.q_min;
	const Q = Math.random()*CONSTANTS.Q_range + CONSTANTS.Q_min;
	if (typeof MPCat.categorize(q, Q) !== "string") {
		console.warn(`q = ${q} au; Q = ${Q} au`);
	}
}
