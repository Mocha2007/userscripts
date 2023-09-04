// THE SCRIPT FOR THE LIST

// tested on https://www.opensubtitles.org/en/ssearch/sublanguageid-eng/idmovie-31833
// search_results is the table; .change selects every row but the header, first td in row, any link (there's always just one)
Array.from(document.querySelectorAll('#search_results .change td:first-of-type a')).forEach((e, i, a) => {
	alert(`link ${i+1}/${a.length} = ${e.href}`); // open one window at a time in case site detects active connections
	// open in new tab
	Object.assign(document.createElement('a'), {
		target: '_blank',
		rel: 'noopener noreferrer',
		href: e.href,
	}).click();
});


// THE SCRIPT FOR THE SINGLE PAGE


// first link in results
// example URL https://www.opensubtitles.org/en/search/sublanguageid-eng/imdbid-761123
/*
window.open(
	Array.from(document.querySelectorAll('#search_results .change td:nth-of-type(5) a'))[0]
.href, '_blank').focus();
*/

Array.from(document.querySelectorAll('#search_results .change td:nth-of-type(5) a'))[0].click();

// UNNECESSARY


// remove script blocking
Array.from(document.querySelectorAll('*')).forEach(e => e.setAttribute('onclick', ''));