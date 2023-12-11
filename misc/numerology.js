/* exported numerology */
'using strict';

// https://www.horoscope.com/us/horoscopes/numerology/index-horoscope-numerology.aspx

/**
 * @param {number} n
 * @returns {number} sum of the digits of integer n in base-10
 */
function numReduce(n){
	return n.toString().split('').map(x => +x).reduce((a, b) => a+b, 0);
}

/**
 * @param {number} n
 * @returns {number} 1-9 or 11 or 22
 */
function numReduceStrict(n){
	for (let _ = 0; _ < 10; _++)
		if (9 < n && ![11, 22].includes(n))
			n = numReduce(n);
		else
			break;
	return n;
}

function numerology(t = new Date(), name = ''){
	const masterNumber = numReduceStrict(t.getMonth()+1 + t.getDate() + t.getFullYear());
	return {
		destinyNumber: destinyNumber(name),
		masterNumber,
		soulNumber: soulNumber(name),
	};
}

function destinyNumber(name = ''){
	//						make lowercase, remove accents, remove other crap, turn into array
	return numReduceStrict(name.toLowerCase().normalize('NFD').replace(/[^a-z]/g, '').split('')
		.map(char => (char.charCodeAt(0) - 97)%9 + 1)
		.reduce((a, b) => a+b, 0));
}

function soulNumber(name = ''){
	return destinyNumber(name.split('').filter(char => 'aeiou'.includes(char)).join(''));
}