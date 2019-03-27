function show() {
	// Get Values
	var rName  = document.getElementById('rName' ).value;
	var resTime    = document.getElementById('resTime').value;
	var resNum = document.getElementById('resNum').value;
	
	// Alert
	alert("--- Your Input ---\nRestaurant Name: " + rName + "\nReservation Timing: " + resTime + "\nNumber of Pax: " + resNum);
}