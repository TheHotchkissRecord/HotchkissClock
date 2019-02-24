function loadAnnouncements()
{
	tmp();
	setTimeout("loadAnnouncements()",600000);
}

function tmp()
{
	document.getElementById("announcements").innerHTML = "This is a temporary placeholder for announcements";
}