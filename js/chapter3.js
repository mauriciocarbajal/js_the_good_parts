output('***** CHAPTER 3 - OBJECTS | Examples from the book "JS - The Good Parts" *****');


//Literal declaration of js object (using JSON)

var empty_object = {};

var stooge = {
	"first-name": "Jerome",
	"last-name": "Howard"
};

var flight = {
	airline: "Oceanic",
	number: 815,
	departure: {
		IATA: "SYD",
		time: "2004-09-22 14:55",
		city: "Sydney"
	},
	arrival: {
		IATA: "LAX",
		time: "2004-09-23 10:42",
		city: "Los Angeles"
	}
};


//Retrieval
output("");
output("--- Retrieval");
output(stooge["first-name"]);
	// "Joe"
output(flight.departure.IATA);
	// "SYD"
output(stooge["middle-name"]);
	//undefined
output(flight.status);
	//undefined
output(stooge["FIRST-NAME"]);
	//undefined

output(stooge["middle-name"] || "(none)");
	//none
output(flight.status || "unknown");
	//unknown

output(flight.equipment);
	//undefined
//output(flight.equipment.model);
	//would throw "TypeError"
output(flight.equipment && flight.equipment.model);
	//undefined


//Update
output("");
output("--- Update");
stooge['first-name'] = 'Jerome';
	//updated to Jerome
stooge['middle-name'] = 'Lester';
	//new key created

stooge.nickname = 'Curly';
flight.equipment = {
    model: 'Boeing 777'
};
flight.status = 'overdue';

output(stooge);


//Reference
output("");
output("--- Reference");
var x = stooge;
x.nickname = 'Curly';
output(stooge);
	//shows 'nickname' among the other keys

var a = {}, b = {}, c = {};
    // a, b, and c each refer to a
    // different empty object
a = b = c = {};
    // a, b, and c all refer to
    // the same empty object


//Prototype
output("");
output("--- Prototype");
output(Object.prototype);

if (typeof Object.create != 'function'){
	Object.create = function(o){
		var F = function () {};
		F.prototype = o;
		return new F();
	};
}


//Reference
output("");
output("--- Reference");
var another_stooge = Object.create(stooge);
output(another_stooge);
	//prototype chain: another_stooge <-- stooge <-- Object.prototype
output(another_stooge['first-name']);
	//Delegation: it moves up in the prototype chain until finds property (and if not, returns undefined)

//Changing an object don't change its prototype
another_stooge['first-name'] = 'Harry';
another_stooge['middle-name'] = 'Moses';
another_stooge.nickname = 'Moe';
output(stooge);
	//doesn't change

//Changing a prototype DO change their objects
stooge.profession = 'actor';
output(another_stooge.profession);
	//actor



//Reflection
output("");
output("--- Reflection");

//Some care must be taken because any property on the prototype chain can produce a value
output(typeof flight.number);
output(typeof flight.status);
output(typeof flight.arrival);
output(typeof flight.manifest);
output(typeof flight.toString);


output(flight.hasOwnProperty('number'));
output(flight.hasOwnProperty('constructor'));

//Enumeration
output("");
output("--- Enumeration");
var name;

output("looping with not-function filter:");
for (name in another_stooge) {
	if (typeof another_stooge[name] !== 'function') {
		output('->' + name + ': ' + another_stooge[name]);
	}
}

output("looping with OwnProperty filter:");
for (name in another_stooge) {
	if (another_stooge.hasOwnProperty(name)){
		output('->' + name + ': ' + another_stooge[name]);
	}
}

//for order:
var i;
var properties = [
	'first-name',
	'middle-name',
	'last-name',
	'profession'
];

output("looping from key list:");
for (i = 0; i < properties.length; i += 1) {
	output('->' + properties[i] + ': ' + another_stooge[properties[i]]);
}


//Delete
output("");
output("--- Delete");
output(another_stooge.nickname);
	//'Moe' (from object)
delete another_stooge.nickname;
output(another_stooge.nickname);
	//'Curly' (from prototype)


//Global Abatement
output("");
output("--- Global Abatement");

var MYAPP = {};

MYAPP.stooge = {
	"first-name": "Joe",
	"last-name": "Howard"
};

MYAPP.flight = {
	airline: "Oceanic",
	number: 815,
	departure: {
		IATA: "SYD",
		time: "2004-09-22 14:55",
		city: "Sydney"
	}, arrival: {
		IATA: "LAX",
		time: "2004-09-23 10:42",
		city: "Los Angeles"
	}
};

output(MYAPP);








