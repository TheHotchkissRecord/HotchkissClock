/*
TO DO
-INPUT ALL SPECIAL SCHEDULES, AND NO CLASSES
*/

var dayTypeInt;
var currentSchedule = new Array();
var currentDate = new Date();
var currentPeriod;
var nextPeriod;

function load()
{
	updateCalendar();
	setInterval("updateSchedule()",1000);
	setInterval("updateCalendar()",60000);
//	setTimeout("getTimeTillNextPeriod()",1000);
//	setTimeout("updateCalendar()",600000);
//	setTimeout("load()",1000);
//	setTimeout("updateSchedule()", 1000);

}


function updateCalendar()
{
	currentDate = new Date();
	var year = currentDate.getFullYear();
	var month = currentDate.getMonth()+1;
	var day = currentDate.getDate();
	 var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET","specialdays.php",true);
    xmlhttp.send();
   // alert("test");
    xmlhttp.onreadystatechange=function() {
        var response = xmlhttp.responseText;
        var dataObject = jQuery.parseJSON(response);

        dayTypeInt = parseInt(dataObject.type)+0;
        
        if (dayTypeInt == 1)
        {
        	specialSchedule();
        }
        else if (dayTypeInt == 2)
        {
        	noClasses();
        }
        else if (dayTypeInt == 3)
        {
        	holiday();
        }
        else
        {
        	getCurrSchedule(dayTypeInt);
        	updateSchedule();
        }

     }
/* Google Calendar Stuff. NO LONGER IN USE.
	var beginDate = year + "-" + showFilled(month) + "-" + showFilled(day) + "T00:00:00";
	var endDate = year + "-" + showFilled(month+1) + "-" + showFilled(day) + "T00:00:00";
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET","https://www.google.com/calendar/feeds/31snjp5ii66o27rdo73ghtdmk4%40group.calendar.google.com/public/basic?start-min=" + beginDate + "&start-max=" + endDate + "&orderby=starttime&alt=jsonc",true);
 	alert("https://www.google.com/calendar/feeds/31snjp5ii66o27rdo73ghtdmk4%40group.calendar.google.com/public/basic?start-min=" + beginDate + "&start-max=" + endDate +"&orderby=starttime&alt=jsonc");
    xmlhttp.send();
    
    xmlhttp.onreadystatechange=function() {
        var response = xmlhttp.responseText;
        var dataObject = jQuery.parseJSON(response);
        
        alert(dataObject.data.items[0].title);
        alert(dataObject.data.items[0].details);
        } 
*/

}

function updateSchedule()
{
	var currentHour = showFilled(new Date().getHours());
	var currentMinute = showFilled(new Date().getMinutes());
	var currentSeconds = showFilled(new Date().getSeconds());
	var currentTime = new Date(0,0,0,currentHour,currentMinute,currentSeconds,0);
	if (dayTypeInt == 0)
	{
		for (var i=0; i < currentSchedule.length; i++)
		{
			if (currentTime >= currentSchedule[i].startTime && currentTime <= currentSchedule[i].endTime)
			{

				currentPeriod = currentSchedule[i];
				if (currentPeriod.title == "Passing") //Passing
				{
					nextPeriod = currentSchedule[i+1];
					updateText("Passing",getTimeTillNextPeriod() + " until " + nextPeriod.title);
				}
				else if (currentSchedule[i+1] == undefined) //Last Period
				{
					nextPeriod = currentSchedule[i];
					
					currentDate = new Date();
					var tmpCurrentTime = currentDate.getHours()*3600 + currentDate.getMinutes()*60 + currentDate.getSeconds();
					var tmpStartTime = nextPeriod.endTime.getHours()*3600+nextPeriod.endTime.getMinutes()*60;
					var differenceDate = tmpStartTime-tmpCurrentTime;
					var hr = (differenceDate-(differenceDate%3600))/3600;
					
					var min = ((differenceDate-hr*3600)-((differenceDate-hr*3600)%60))/60;
					var sec = (differenceDate-hr*3600-min*60);
					if (hr == 0)
					{
						var output = showFilled(min) + ":" + showFilled(sec);
					}
					else
					{
					var output = hr + ":" + showFilled(min) + ":" + showFilled(sec);
					}
					
					updateText("Right Now: " + currentPeriod.title, output + " until end of " + nextPeriod.title);
				}
				else //Regular
				{
					if (currentSchedule[i+1].title == "Passing")
					{
						nextPeriod = currentSchedule[i+2];
					}
					else
					{
						nextPeriod = currentSchedule[i+1];
					}
					var timeTill = getTimeTillNextPeriod();
					updateText("Right Now: " + currentPeriod.title,timeTill + " until " + nextPeriod.title);
				}
				
			}
		}
	
		//Before classes
		if (currentTime <= currentSchedule[0].startTime)
		{
			nextPeriod = currentSchedule[0];
			var timeTill = getTimeTillNextPeriod();
			
			document.getElementById("currEvent").innerHTML = timeTill + " until " + nextPeriod.title;
			document.getElementById("nextEvent").innerHTML = "";
		}
		
		//After classes
		if (currentTime >= currentSchedule[currentSchedule.length-1].endTime)
		{
			document.getElementById("currEvent").innerHTML = "Athletics and Evening Activities";
			//document.getElementById("currEvent").innerHTML = "Hurricane Sandy";
			//document.getElementById("nextEvent").innerHTML = currentTime.getSeconds(); //Debug code for looping
			document.getElementById("nextEvent").innerHTML = "Enjoy the rest of your day!";
		}
		
		//Debug clock. Please comment out before deployment
		//document.getElementById("fullClock").innerHTML = showFilled(currentTime.getHours()) +":" + showFilled(currentTime.getMinutes()) + ":" + showFilled(currentTime.getSeconds());
	}
}


//THIS MIGHT WORK
function getTimeTillNextPeriod()
{
	currentDate = new Date();
	var tmpCurrentTime = currentDate.getHours()*3600 + currentDate.getMinutes()*60 + currentDate.getSeconds();
	var tmpStartTime = nextPeriod.startTime.getHours()*3600+nextPeriod.startTime.getMinutes()*60;
	var differenceDate = tmpStartTime-tmpCurrentTime;
	var hr = (differenceDate-(differenceDate%3600))/3600;

	var min = ((differenceDate-hr*3600)-((differenceDate-hr*3600)%60))/60;
	var sec = (differenceDate-hr*3600-min*60);
	if (hr == 0)
	{
		var output = showFilled(min) + ":" + showFilled(sec);
	}
	else
	{
	var output = hr + ":" + showFilled(min) + ":" + showFilled(sec);
	}
	return output;
}

function updateText(currP,nextP)
{
	document.getElementById("currEvent").innerHTML = currP;
	document.getElementById("nextEvent").innerHTML = nextP;
}

function getCurrSchedule(type)
{
	//Just double checking
	if (type == 0)
	{
		
		if (currentDate.getDay() == 1 || currentDate.getDay() == 4) //Mondays and Thursdays
		{
			currentSchedule = new Array();
			currentSchedule[0] = new period("Period 1", new Date(0,0,0,8,30,0,0),new Date(0,0,0,9,15,0,0));
			currentSchedule[1] = new period("Passing", new Date(0,0,0,9,15,0,0),new Date(0,0,0,9,20,0,0));
			currentSchedule[2] = new period("Period 2", new Date(0,0,0,9,20,0,0),new Date(0,0,0,10,05,0,0));
			currentSchedule[3] = new period("Passing", new Date(0,0,0,10,05,0,0),new Date(0,0,0,10,10,0,0));
			currentSchedule[4] = new period("Chapel/Class Meeting", new Date(0,0,0,10,10,0,0),new Date(0,0,0,10,35,0,0));
			currentSchedule[5] = new period("Passing", new Date(0,0,0,10,35,0,0),new Date(0,0,0,10,40,0,0));
			currentSchedule[6] = new period("Period 3", new Date(0,0,0,10,40,0,0),new Date(0,0,0,11,20,0,0));
			currentSchedule[7] = new period("Passing", new Date(0,0,0,11,20,0,0),new Date(0,0,0,11,25,0,0));
			currentSchedule[8] = new period("Period 4", new Date(0,0,0,11,25,0,0),new Date(0,0,0,12,05,0,0));
			currentSchedule[9] = new period("Passing", new Date(0,0,0,12,05,0,0),new Date(0,0,0,12,10,0,0));
			currentSchedule[10] = new period("Period 5A", new Date(0,0,0,12,10,0,0),new Date(0,0,0,12,55,0,0));
			currentSchedule[11] = new period("Period 5B", new Date(0,0,0,12,55,0,0),new Date(0,0,0,13,40,0,0));
			currentSchedule[12] = new period("Passing", new Date(0,0,0,13,40,0,0),new Date(0,0,0,13,45,0,0));
			currentSchedule[13] = new period("Period 6", new Date(0,0,0,13,45,0,0),new Date(0,0,0,14,30,0,0));
			currentSchedule[14] = new period("Passing", new Date(0,0,0,14,30,0,0),new Date(0,0,0,14,35,0,0));
			currentSchedule[15] = new period("Period 7", new Date(0,0,0,14,35,0,0),new Date(0,0,0,15,20,0,0));
		}
		else if (currentDate.getDay() == 2 || currentDate.getDay() == 5) //Tuesdays and Fridays
		{
			currentSchedule = new Array();
			currentSchedule[0] = new period("Period 1", new Date(0,0,0,8,30,0,0), new Date(0,0,0,9,10,0,0));
			currentSchedule[1] = new period("Passing", new Date(0,0,0,9,10,0,0),new Date(0,0,0,9,15,0,0));
			currentSchedule[2] = new period("Period 2",  new Date(0,0,0,9,15,0,0), new Date(0,0,0,9,55,0,0));
			currentSchedule[3] = new period("Passing", new Date(0,0,0,9,55,0,0),new Date(0,0,0,10,00,0,0));
			currentSchedule[4] = new period("Auditorium",  new Date(0,0,0,10,00,0,0), new Date(0,0,0,10,35,0,0));
			currentSchedule[5] = new period("Passing", new Date(0,0,0,10,35,0,0),new Date(0,0,0,10,40,0,0));
			currentSchedule[6] = new period("Period 3", new Date(0,0,0,10,40,0,0),new Date(0,0,0,11,20,0,0));
			currentSchedule[7] = new period("Passing", new Date(0,0,0,11,20,0,0),new Date(0,0,0,11,25,0,0));
			currentSchedule[8] = new period("Period 4", new Date(0,0,0,11,25,0,0),new Date(0,0,0,12,05,0,0));
			currentSchedule[9] = new period("Passing", new Date(0,0,0,12,05,0,0),new Date(0,0,0,12,10,0,0));
			currentSchedule[10] = new period("Period 5A", new Date(0,0,0,12,10,0,0),new Date(0,0,0,12,55,0,0));
			currentSchedule[11] = new period("Period 5B", new Date(0,0,0,12,55,0,0),new Date(0,0,0,13,40,0,0));
			currentSchedule[12] = new period("Passing", new Date(0,0,0,13,40,0,0),new Date(0,0,0,13,45,0,0));
			currentSchedule[13] = new period("Period 6", new Date(0,0,0,13,45,0,0),new Date(0,0,0,14,30,0,0));
			currentSchedule[14] = new period("Passing", new Date(0,0,0,14,30,0,0),new Date(0,0,0,14,35,0,0));
			currentSchedule[15] = new period("Period 7", new Date(0,0,0,14,35,0,0),new Date(0,0,0,15,20,0,0));
		}
		else if (currentDate.getDay() == 3) //Wednesday
		{
			currentSchedule = new Array();
			currentSchedule[0] = new period("Period 1", new Date(0,0,0,8,50,0,0),new Date(0,0,0,9,35,0,0));
			currentSchedule[1] = new period("Passing", new Date(0,0,0,9,35,0,0),new Date(0,0,0,9,40,0,0));
			currentSchedule[2] = new period("Period 2", new Date(0,0,0,9,40,0,0),new Date(0,0,0,10,25,0,0));
			currentSchedule[3] = new period("Passing", new Date(0,0,0,10,25,0,0),new Date(0,0,0,10,30,0,0));
			currentSchedule[4] = new period("Advisory", new Date(0,0,0,10,30,0,0),new Date(0,0,0,10,45,0,0));
			currentSchedule[5] = new period("Passing", new Date(0,0,0,10,45,0,0),new Date(0,0,0,10,50,0,0));
			currentSchedule[6] = new period("Period 3", new Date(0,0,0,10,50,0,0),new Date(0,0,0,11,30,0,0));
			currentSchedule[7] = new period("Passing", new Date(0,0,0,11,30,0,0),new Date(0,0,0,11,35,0,0));
			currentSchedule[8] = new period("Period 4", new Date(0,0,0,11,35,0,0),new Date(0,0,0,12,15,0,0));
		}
		else if (currentDate.getDay() == 6) //Saturday
		{
			currentSchedule = new Array();
			currentSchedule[0] = new period("Period 1", new Date(0,0,0,8,30,0,0),new Date(0,0,0,9,15,0,0));
			currentSchedule[1] = new period("Passing", new Date(0,0,0,9,15,0,0),new Date(0,0,0,9,20,0,0));
			currentSchedule[2] = new period("Period 2", new Date(0,0,0,9,20,0,0),new Date(0,0,0,10,05,0,0));
			currentSchedule[3] = new period("Break",  new Date(0,0,0,10,05,0,0), new Date(0,0,0,10,20,0,0));
			currentSchedule[4] = new period("Period 3",  new Date(0,0,0,10,20,0,0), new Date(0,0,0,11,05,0,0));
			currentSchedule[5] = new period("Passing", new Date(0,0,0,11,05,0,0),new Date(0,0,0,11,10,0,0));
			currentSchedule[6] = new period("Period 4",  new Date(0,0,0,11,10,0,0), new Date(0,0,0,11,55,0,0));		
		}
		else if (currentDate.getDay() == 0) //Sunday
		{
			noClasses();
		}
	}
	else
	{
	//Error
	document.getElementById("currEvent").innerHTML = "";
	}
}

function period(title,startTime,endTime)
{
this.title=title;
this.startTime=startTime;
this.endTime=endTime;
}

function specialSchedule()
{
		document.getElementById("currEvent").innerHTML = "There is a special schedule today.";
		document.getElementById("nextEvent").innerHTML = "Please consult your planner for details.";
}

function noClasses()
{
	document.getElementById("currEvent").innerHTML = "There are no classes today.";
	document.getElementById("nextEvent").innerHTML = " Enjoy the day off!";
}

function holiday()
{
	document.getElementById("currEvent").innerHTML = "Enjoy your holiday!";
	document.getElementById("nextEvent").innerHTML = "";
}
