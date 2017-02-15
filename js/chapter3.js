console.log('***** CHAPTER 3 - OBJECTS | Examples from book "JS -The Good Parts" *****');

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
console.log("");
console.log("--- Retrieval");
console.log(stooge["first-name"]);    	// "Joe"
console.log(flight.departure.IATA);    	// "SYD"
console.log(stooge["middle-name"]);		//undefined
console.log(flight.status);				//undefined
console.log(stooge["FIRST-NAME"]);		//undefined

console.log(stooge["middle-name"] || "(none)");		//none
console.log(flight.status || "unknown");			//unknown

console.log(flight.equipment);									//undefined
//console.log(flight.equipment.model);							//would throw "TypeError"
console.log(flight.equipment && flight.equipment.model);		//undefined


//Update
console.log("");
console.log("--- Update");
stooge['first-name'] = 'Jerome';		//updated to Jerome
stooge['middle-name'] = 'Lester';		//Created
stooge.nickname = 'Curly';
flight.equipment = {
    model: 'Boeing 777'
};
flight.status = 'overdue';

console.log(stooge);


//Reference
console.log("");
console.log("--- Reference");
var x = stooge;
x.nickname = 'Curly';
console.log(stooge);			//shows 'nickname' among the other keys

var a = {}, b = {}, c = {};
    // a, b, and c each refer to a
    // different empty object
a = b = c = {};
    // a, b, and c all refer to
    // the same empty object


//Prototype
console.log("");
console.log("--- Prototype");
console.log(Object.prototype);

if (typeof Object.create != 'function'){
	Object.create = function(o){
		var F = function () {};
		F.prototype = o;
		return new F();
	};
}


//Reference
console.log("");
console.log("--- Reference");
var another_stooge = Object.create(stooge);
console.log(another_stooge);	//prototype chain: another_stooge <-- stooge <-- Object.prototype
console.log(another_stooge['first-name']);	//Delegation: It moves up in the prototype chain until finds property (and if not, returns undefined)

//Changing an object don't change its prototype
another_stooge['first-name'] = 'Harry';
another_stooge['middle-name'] = 'Moses';
another_stooge.nickname = 'Moe';
console.log(stooge);	//doesn't change

//Changing a prototype DO change their objects
stooge.profession = 'actor';
console.log(another_stooge.profession);		//actor



//Reflection
console.log("");
console.log("--- Reflection");

//Some care must be taken because any property on the prototype chain can produce a value
console.log(typeof flight.number);
console.log(typeof flight.status);
console.log(typeof flight.arrival);
console.log(typeof flight.manifest);
console.log(typeof flight.toString);


console.log(flight.hasOwnProperty('number'));
console.log(flight.hasOwnProperty('constructor'));

//Enumeration
console.log("");
console.log("--- Enumeration");
var name;

console.log("looping with not-function filter:");
for (name in another_stooge) {
	if (typeof another_stooge[name] !== 'function') {
		console.log('->' + name + ': ' + another_stooge[name]);
	}
}

console.log("looping with OwnProperty filter:");
for (name in another_stooge) {
	if (another_stooge.hasOwnProperty(name)){
		console.log('->' + name + ': ' + another_stooge[name]);
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

console.log("looping from key list:");
for (i = 0; i < properties.length; i += 1) {
	console.log('->' + properties[i] + ': ' + another_stooge[properties[i]]);
}


//Delete
console.log("");
console.log("--- Delete");
console.log(another_stooge.nickname);	//from object ('Moe')
delete another_stooge.nickname;
console.log(another_stooge.nickname);	//from prototype ('Curly')



//Global Abatement
console.log("");
console.log("--- Global Abatement");

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

console.log(MYAPP);








