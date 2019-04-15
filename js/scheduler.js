
/*
Scheduler for Hotchkiss Clock
Nicholas Lorentzen
Last updated 20190415
*/
var boiyardee = [];

function addCookie(cookname)
{
	boiyardee.push(cookname);
}

function bakeCookies(recipe)
{
	addCookie(recipe + "=" + escape(document.getElementById(recipe).value);
}

function putCookie()
{
	var classes = ["m1","m2","m3","m4","m5","m6","m7","m8","t1","t2","t3","t4","t5","t6","t7","t8","w1","w2","w3","w4","y1","y2","y3","y4","y5","y6","y7","y8","f1","f2","f3","f4","f5","f6","f7","f8","s1","s2","s3","s4"];

	classes.forEach(bakeCookies);
	document.cookie = boiyardee.join(";") + ";domain=thehotchkissrecord.github.io;max-age=31536000";
	return true;
}

function exitScheduler(){
	putCookie();
	alert("Cookies Set:" + document.cookie);
	window.location.replace("https://thehotchkissrecord.github.io/HotchkissClock/");
}

function cookiesAlert()
{
	window.alert("(STILL IN TESTING) Welcome to the scheduler! In order to use this service you will need cookies enabled. - Nicholas Lorentzen")
}

setInterval(putCookie, 500);