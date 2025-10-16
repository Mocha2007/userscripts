class Option {
	constructor(inside){
		this.inside = inside;
	}
	/** @param {Option} optb; @returns {Option} */
	and(optb){
		return this.is_none() ? this : optb;
	}
	and_then(f){
		return this.is_none() ? this : f(this.inside); // ?
	}
	/** @returns {Option} */
	filter(predicate){
		return this.is_none() ? this : predicate(this.inside) ? this : None;
	}
	get_or_insert(value){
		return this.is_some() ? this.inside : this.inside = value;
	}
	get_or_insert_with(f){
		return this.is_some() ? this.inside : this.inside = f();
	}
	insert(value){
		return this.inside = value;
	}
	/** @returns {Option} */
	inspect(f){
		if (this.is_some()){
			f(this.inside);
		}
		return this;
	}
	is_none(){
		return typeof this.inside === "undefined";
	}
	is_some(){
		return typeof this.inside !== "undefined";
	}
	/** @returns {Option} */
	map(f){
		return this.is_some() ? new Option(f(this.inside)) : this;
	}
	/** @returns {Option} */
	map_or(def, f){
		return this.is_some() ? this.map(f) : def;
	}
	/** @returns {Option} */
	map_or_else(def, f){
		return this.is_some() ? this.map(f) : def();
	}
	/** @param {Option} optb; @returns {Option} */
	or(optb){
		return this.is_some() ? this : optb;
	}
	/** @returns {Option} */
	or_else(f){
		return this.is_some() ? this : f();
	}
	/** @returns {Option} */
	replace(value){
		if (this.is_some()){
			const temp = this.inside;
			this.inside = value;
			return new Option(temp);
		}
		else {
			this.inside = value;
			return None;
		}
	}
	/** @returns {Option} */
	take(){
		const temp = this.inside;
		this.inside = undefined;
		return new Option(temp);
	}
	/** @returns {Option} */
	take_if(predicate){
		if (predicate()){
			return this.take();
		}
		else {
			return None;
		}
	}
	unwrap(){
		if (this.is_none()){
			throw 'unwrap on None';
		}
		return this.inside;
	}
	unwrap_or(def){
		return this.is_some() ? this.inside : def;
	}
	unwrap_or_else(f){
		return this.is_some() ? this.inside : f();
	}
	/** @returns {[Option, Option]} */
	unzip(){
		return this.is_some() && this.inside.length === 2 ? [new Option(this.inside[0]), new Option(this.inside[1])] : [None, None];
	}
	/** @param {Option} optb; @returns {Option} */
	xor(optb){
		return this.is_some() !== optb.is_some() ? this.or(optb) : None;
	}
	/** @param {Option} other; @returns {Option} */
	zip(other){
		return this.is_some() && other.is_some() ? new Option([this.inside, other.inside]) : None;
	}
	/** @param {Option} other; @returns {Option} */
	zip_with(other, f){
		return this.is_some() && other.is_some() ? new Option(f(this.inside, other.inside)) : None;
	}
}
const Some = inside => new Option(inside);
const None = new Option();