// https://apolloarchive.com/lander.html
resetgame();startsim();setInterval(()=>setthrust(altitude/velocity*5>velocity*0.6?10:0),100);