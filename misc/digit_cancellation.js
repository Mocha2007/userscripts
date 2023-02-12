// check 3-digit solutions

function prime_factorization(n){
	const p = [];
	let i = 2;
	while (1 < n){
		if (n % i === 0){
			p.push(i);
			n /= i;
		}
		else if (n < i*i){ // remaining factor must be prime
			p.push(n);
			break;
		}
		else
			i++;
	}
	return p;
}

function non_one_factors(n){
	const o = [n];
	for (let i = 2; i*i <= n; i++)
		if (n % i === 0){
			o.push(i);
			if (i*i !== n)
				o.push(n/i);
		}
	return o;
}

function digit_cancellation(digits){
	function mon1f(n){
		const n1f = non_one_factors(n);
		const o = [];
		n1f.forEach(factor => {
			for (let i = 1; factor*i < n; i++){
				if (digit_lower <= factor*i && factor*i < digit_upper)
					o.push(factor*i);
			}
		});
		return o;
	}
	const digit_lower = Math.pow(10, digits-1);
	const digit_upper = Math.pow(10, digits);
	for (let denominator = digit_lower; denominator < digit_upper; denominator++){
		// in order for there to be a solution, gcd(a, b) must be > 1
		// THUS we must consider only the multiples of its non-1 factors between the bounds
		const possible_numerators = mon1f(denominator);
		const possible_cancellations = (denominator + "").split("");
		possible_numerators.forEach(numerator => {
			if (numerator === denominator)
				return; // trivial
			possible_cancellations.forEach(cancellation => {
				const cn = +(numerator+"").replace(cancellation,"");
				const cd = +(denominator+"").replace(cancellation,"");
				// trivial case of ab0/cd0
				if (+cancellation === 0 && cn*10 === numerator && cd*10 === denominator)
					return;
				// numerator/denominator === cn/cd
				if (numerator*cd === denominator*cn)
					console.log(`${numerator} / ${denominator} === ${cn} / ${cd}`);
			});
		});
	}
}