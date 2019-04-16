
/*
Scheduler for Hotchkiss Clock
Nicholas Lorentzen
Last updated 20190415
*/
var boiyardee = [];

function addCookie(cookname)
{
	boiyardee.push(cookname);
	document.cookie = cookname + ";domain=thehotchkissrecord.github.io;max-age=31536000";
}

function bakeCookies(recipe)
{
	addCookie(recipe + "=" + escape(document.getElementById(recipe).value));
}

function putCookie()
{
	var classes = ["m1","m2","m3","m4","m5","m6","m7","m8","t1","t2","t3","t4","t5","t6","t7","t8","w1","w2","w3","w4","y1","y2","y3","y4","y5","y6","y7","y8","f1","f2","f3","f4","f5","f6","f7","f8","s1","s2","s3","s4"];

	classes.forEach(bakeCookies);
	console.log (boiyardee.join(";") + ";domain=thehotchkissrecord.github.io;max-age=31536000");
	document.cookie = boiyardee.join(";") + ";domain=thehotchkissrecord.github.io;max-age=31536000";
	return true;
}

function exitScheduler()
{
	putCookie();
	alert("Cookies Set:" + unescape(document.cookie));
	window.location.replace("https://thehotchkissrecord.github.io/HotchkissClock/");
}

function cookiesAlert()
{
	window.alert("(STILL IN TESTING) Welcome to the scheduler! In order to use this service you will need cookies enabled. - Nicholas Lorentzen")
	var classes = ["m1","m2","m3","m4","m5","m6","m7","m8","t1","t2","t3","t4","t5","t6","t7","t8","w1","w2","w3","w4","y1","y2","y3","y4","y5","y6","y7","y8","f1","f2","f3","f4","f5","f6","f7","f8","s1","s2","s3","s4"];
	
	classes.forEach(fillTable);
}

function fillTable(chef)
{
	document.getElementById(chef).value = getCookie(chef);
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return unescape(c.substring(name.length, c.length));
    }
  }
  return "";
}

function updateScheduler()
{
	document.cookie = escape(document.getElementById("pasteCode").value + ";domain=thehotchkissrecord.github.io;max-age=31536000");
	alert("Schedule Updated");
}