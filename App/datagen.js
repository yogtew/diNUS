var unames = ["Skye Stark",
		"Marques Moore",
		"Aydin Garrison",
		"Madison Davis",
		"King Mcmahon",
		"Hezekiah Scott",
		"Kathryn Cross",
		"Aidan Hernandez",
		"Justus Lowe",
		"Sanaa Serrano",
		"Arely Zuniga",
		"Elle Quinn",
		"Yaretzi Morse",
		"Dayami Preston",
		"Marcos Mckee",
		"Marvin Henry",
		"Adalyn Park",
		"Leila Frank",
		"Ainsley Vazquez",
		"Harley Villa"]
		
var rnames = [
		"Pudge Brothers Pizza",
		"Carriage Inn",
		"Forty-Nine Twelve Thai Cuisine",
		"Serranos Cafe & Cantina",
		"Kingfish Hall",
		"Bayside Skillet Crepe & Omelet",
		"Grendel's Den",
		"Range Cafe",
		"Market Place",
		"Maguire's Bar & Grill",
		"Roberto's Ristorante",
		"Portside Restaurant",
		"Gracie's Place",
		"Pasta Fina",
		"Topper's Pizza",
		"Redbirds Sports Cafe",
		"Eddington House",
		"Town House Diner",
		"Show-Me's Restaurant",
		"USA Steak Buffet",
		"Vindalho",
		"Green Manor Restaurant",
		"Pik N Run-Pizza City",
		"At 1800",
		"Houilan's Restaurant"]
		
function q(x) {
	return "'" + x + "'";
}
function generateCustomers() {
	var names = unames;
	var data = [];
	for (var i in names) {
		var phone = Math.random() > 0.5? '8':'9';
		for (var j = 0; j < 7; j++) phone += Math.floor(Math.random() * 10);
		var points = Math.floor(Math.random() * 200);
		var username = names[i].split(" ")[0].toLowerCase() + Math.floor(Math.random() * 100);
		var pw = Math.floor((Math.random() + Math.random()) * 100000)
		data.push(["default", q(names[i]), phone, points, q(username), q(pw)].join(", "));
	}
	return data.map(x => "(" + x + ")").join(",\n");
}

function generatePaymentModes() {
	var data = [];
	for (var i = 0; i < 20; i++) {
		var cardno = "";
		for (var j = 0; j < 16; j++) cardno += Math.floor(Math.random() * 10);
		data.push([i + 1, q(cardno)].join(", "));
	}
	return data.map(x => "(" + x + ")").join(",\n");
}

function generateRestaurants() {
	var names = rnames;
	var areas = ["North", "South", "East", "West", "Central"];
	for (var i in names) {
		var location = areas[Math.floor(Math.random() * areas.length)];
		var desc = names[i] + " is a restaurant located in the " + location;
		var rating = Math.floor(Math.random() * 10);
	}
}

function generateOpeningHours() {
	function format(time) {
		var strtime = time.toString() + "00";
		if(strtime.length < 4) strtime = "0" + strtime;
		return strtime;
	}
	for (var i = 0; i < rnames.length; i++) {
		var openTime = 6 + Math.floor(Math.random() * 10);
		var closeTime = (openTime + Math.floor(Math.random() * 12) + 6) % 24;
		console.log(i + 1, format(openTime), format(closeTime));
	}
}

function generateSeats() {
	for (var i = 0; i < rnames.length; i++) {
		var numTables = Math.floor(Math.random() * 4) + 1;
		for (var j = 0; j < numTables; j++) {
			var numSeats = Math.floor(Math.random() * 7) + 1;
			console.log(i + 1, j + 1, numSeats);
		}
	}
}

function Food(name, tags) {
	this.name = name;
	this.tags = tags;
}

function generateFood() {
	var foodItems = [
		
	]
}