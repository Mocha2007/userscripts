// ==UserScript==
// @name     A Tale of Crowns Script
// @version  1
// @grant    none
// ==/UserScript==
console.info("Luna's AToC Script");


const GIRLCOLORS = [
  ['Ashti', '#444'],
  ['Delal', '#840'],
  ['Rozerîn', '#804'],
  ['Xelara', '#480'],
];

const LUNA_ON_TICK = () => {
  console.info("LunaButton");
  Array.from(document.getElementsByClassName('passage')).forEach(PASSAGE => {
  	console.info("PASSAGE", PASSAGE);
  	console.info("PASSAGE.childNodes", PASSAGE.childNodes);
    Array.from(PASSAGE.childNodes).filter(node => node.nodeType === Node.TEXT_NODE).forEach(textNode => {
      let PSTRING = textNode.wholeText
        .replace(/\bperi/g, 'peni');

      GIRLCOLORS.forEach(pair => {
        const [NAME, COLOR] = pair;
        PSTRING = PSTRING.replace(NAME, `<b style='color:${COLOR}>${NAME}</b>`);
      });

      textNode.wholeText = PSTRING;
    });
  });
};

const LUNA_BUTTON = document.createElement('div');
LUNA_BUTTON.onclick = () => LUNA_ON_TICK();
LUNA_BUTTON.innerHTML = 'LunaButton';
LUNA_BUTTON.style.position = 'Absolute';
LUNA_BUTTON.style.top = 0;
LUNA_BUTTON.style.zIndex = 9999;
LUNA_BUTTON.style.color = 'white';
LUNA_BUTTON.style.backgroundColor = 'black';
LUNA_BUTTON.style.cursor = 'pointer';
document.body.appendChild(LUNA_BUTTON);