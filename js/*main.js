function UR_Start() 
{
	var UR_Nu = new Date;
	var UR_Indhold = getHour(UR_Nu) + ":" + showFilled(UR_Nu.getMinutes())+ " " + getAMPM(UR_Nu);
	document.getElementById("ur").innerHTML = UR_Indhold;
	setTimeout("UR_Start()",1000);
}
function showFilled(Value) 
{
	return (Value > 9) ? "" + Value : "0" + Value;
}

function getHour(Value)
{
	if (Value.getHours() > 12)
	{
		return Value.getHours()-12;
	}
	else if (Value.getHours() == 0)
	{
		return 12;
	}
	else
	{
		return Value.getHours();
	}
}
function getAMPM(Value)
{
	if (Value.getHours() > 11)
	{

		return ("PM");
	}
	else
	{
		return ("AM");
	}
}

function currDate()
{
	var mmDD = new Date;
	var mmDD_text = findDay(mmDD) + ", " + findMonth(mmDD) + " " + mmDD.getDate() + ", " + mmDD.getFullYear();
	document.getElementById(("mmDD")).innerHTML = mmDD_text;
	setTimeout("currDate()",1000);
}

function findDay(Value)
{
	var days = new Array(7);
	days[0] = "Sunday";
	days[1] = "Monday";
	days[2] = "Tuesday";
	days[3] = "Wednesday";
	days[4] = "Thursday";
	days[5] = "Friday";
	days[6] = "Saturday";
	
	return days[Value.getDay()];
}

function findMonth(Value)
{
 var months = new Array(12);
   months[0]  = "January";
   months[1]  = "February";
   months[2]  = "March";
   months[3]  = "April";
   months[4]  = "May";
   months[5]  = "June";
   months[6]  = "July";
   months[7]  = "August";
   months[8]  = "September";
   months[9]  = "October";
   months[10] = "November";
   months[11] = "December";
	return (months[Value.getMonth()]);
}