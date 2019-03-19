function check(event) {
	// Get Values
	var rName  = document.getElementById('rName').value;
	var resTime    = document.getElementById('resTime').value;
	var resNum = document.getElementById('resNum').value;
	
	// Simple Check
	if(rName.length == 0) {
		alert("Invalid restaurant name");
		event.preventDefault();
		event.stopPropagation();
		return false;
	}
	if(resTime.length == 0) {
		alert("Invalid reservation timing");
		event.preventDefault();
		event.stopPropagation();
		return false;
	}
	if(isNAN(resNum)) {
		alert("Invalid number of pax for restaurant");
		event.preventDefault();
		event.stopPropagation();
		return false;
	}
}