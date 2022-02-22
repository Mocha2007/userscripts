// ==UserScript==
// @name     Star Sign Tooltip
// @version  1
// @grant    none
// @author   mocha2007
// ==/UserScript==
const date_regex_euro = /\d{1,2} \w{3,9} \d{1,4}(?=\W)/g // approximately
const date_regex_amer = /\w{3,9} \d{1,2}, \d{1,4}(?=\W)/g // approximately

const signs = [
  ['♈︎', 'Aries'],
  ['♉︎', 'Taurus'],
  ['♊︎', 'Gemini'],
  ['♋︎', 'Cancer'],
  ['♌︎', 'Leo'],
  ['♍︎', 'Virgo'],
  ['♎︎', 'Libra'],
  ['♏︎', 'Scorpio'],
  ['♐︎', 'Sagittarius'],
  ['♑︎', 'Capricorn'],
  ['♒︎', 'Aquarius'],
  ['♓︎', 'Pisces'],
];

function starsign_from_date(str){
  const date = new Date(str);
  const day = date.getDate();
  switch (date.getMonth()){
    case 0: // January
    	if (day < 20)
        return 9;
      return 10;
    case 1: // February
    	if (day < 19)
        return 10;
      return 11;
    case 2: // March
    	if (day < 21)
        return 11;
      return 0;
    case 3: // April
    	if (day < 20)
        return 0;
      return 1;
    case 4: // May
    	if (day < 21)
        return 1;
      return 2;
    case 5: // June
    	if (day < 22)
        return 2;
      return 3;
    case 6: // July
    	if (day < 23)
        return 3;
      return 4;
    case 7: // August
    	if (day < 23)
        return 4;
      return 5;
    case 8: // September
    	if (day < 23)
        return 5;
      return 6;
    case 9: // October
    	if (day < 23)
        return 6;
      return 7;
    case 10: // November
    	if (day < 23)
        return 7;
      return 8;
    case 11: // December
    	if (day < 22)
        return 8;
      return 9;
  }
}

function starsign_element(str, date_str){
  const sign = starsign_from_date(date_str);
  const elem = document.createElement('span');
  [elem.innerHTML, elem.title] = signs[sign];
  return elem;
}

function match_handler(full_elem, date_string){
  function out(match){
    const str = match[0];
    const ss_elem = starsign_element(str, date_string);
    console.debug("MATCH", str, ss_elem);
    full_elem.insertBefore(ss_elem, full_elem.childNodes[3]);
  }
  return out;
}

Array.from(document.getElementsByClassName('bday')).forEach(elem => {
  const full_elem = elem.parentElement.parentElement;
  const date_string = elem.innerHTML;
  console.debug(full_elem);
  // euro-style datestring
  Array.from(full_elem.innerHTML.matchAll(date_regex_euro)).forEach(match_handler(full_elem, date_string));
  // american-style datestring
  Array.from(full_elem.innerHTML.matchAll(date_regex_amer)).forEach(match_handler(full_elem, date_string));
});