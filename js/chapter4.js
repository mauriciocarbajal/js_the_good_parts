console.log('***** CHAPTER 4 - FUNCTIONS | Examples from book "JS -The Good Parts" *****');


console.log("");
console.log("--- Function objects");

// Object: collection of key/value pairs and a hidden link to a prototype object
// {} <--> Object.prototype

// function (){} <--> Function.prototype <--> Object.prototype
//				<--> context (CLOSURE)
//				<--> code (.prototype.constructor)

// Functions are objects, but they can be invoked


console.log("");
console.log("--- Function literals");

// Create a variable called add and store a function
// in it that adds two numbers.
var add = function (a, b) {
	return a + b;
};

// Function literal
	// the reserved word 'function'
	// an optional function name (else it would be an annonymous function)
	// a list of parameters between brackets
	// a set of statements

// Functions have access to the parameters and variables of the function in which they are contained
// The created function object has a link to that outer context. This is called CLOSURE:

function func(a,b){
	var c = 3;

	function subfunc(){
		return a+b+c;
	}
	
	return subfunc();
}

console.log(func(1,2));
	//6

// Scopes of subfunc:
	//0: Closure (func))
		//a: 1
		//b: 2
		//c: 3
	//1: Global
		//lots of stuff...

console.log("");
console.log("--- Invocation");

//When invoked, functions have two additional parameters: this and arguments

//There are no validations of type or number of arguments:
console.log(func("hola"));


console.log("");
console.log("--- The Method Invocation Pattern");

//This is when a function is stored as a property of an object
//In this case, 'this' points to the container object

var myObject = {
	value: 0,
	increment: function (inc) {
		console.log(this);
		this.value += typeof inc === 'number' ? inc : 1;
	}
};

myObject.increment();	//binding to the object happens here, on invocation
console.log(myObject.value);

myObject.increment(2);	//binding to the object happens here, on invocation
console.log(myObject.value);


console.log("");
console.log("--- The Function Invocation Pattern");

//When invoked as a function
var res = add(1,2);
console.log(res);
	// inside the function add, 'this' points to the global object, which is kinda-wrong
	// this means we can't access to this when using an inner function
	// there is (always) a workaround


// Augment myObject with a double method.
myObject.double = function () {
	var that = this; // Workaround.
	
	var helper = function () {
		that.value = add(that.value, that.value);
	};

	helper(); // Invoke helper as a function. 
};

// Invoke double as a method.
myObject.double();
console.log(myObject.value);
	// 6



console.log("");
console.log("--- The Constructor Invocation Pattern");

//JS is a prototypal inheritance language

//When invoked using 'new' prefix, a new object is created, with a hidden link to the value of the function's prototype member
//And 'this' is bound to that new object

// Create a constructor function called Quo. (convention: use capitalized name for constructors)
// It makes an object with a status property.
var Quo = function (string) {
	this.status = string;
};

// Give all instances of Quo a public method called get_status.
Quo.prototype.get_status = function () {
	return this.status;
};

// Make an instance of Quo.
var myQuo = new Quo("confused");
console.log(myQuo.get_status());



console.log("");
console.log("--- The Apply Invocation Pattern");

var array = [3, 4];
var this_value = null;
var sum = add.apply(this_value, array);
	// sum is 7
	
var statusObject = {
	status: 'A-OK'
};

// statusObject does not inherit from Quo.prototype
// but we can invoke the get_status method on statusObject
// EVEN THOUGH statusObject does not have a get_status method.
var status = Quo.prototype.get_status.apply(statusObject);
console.log(statusObject);
	// status is 'A-OK'



console.log("");
console.log("--- Arguments");

//it's an array-like object (with length method but not others...) where all the extra parameters are stored
//this allows to create a function with an undefined number of parameters

// Make a function that adds a lot of stuff.
// Note that defining the variable sum inside of the function does not interfere with the sum
// defined outside of the function. The function only sees the inner one.
var sum = function () {
	var i, sum = 0;
	
	for (i = 0; i < arguments.length; i += 1) {
		sum += arguments[i];
	}

	return sum;
};
console.log(sum(4, 8, 15, 16, 23, 42));
	//108


console.log("");
console.log("--- Return");

//A function ALWAYS returns a value, eventually 'undefined'

//If it was invoked with 'new' prefix, and return value is not an object
//	then it returns this (the new object) instead

console.log(new Quo("quotest"));


console.log("");
console.log("--- Exceptions");

var add = function (a, b) {
	if (typeof a !== 'number' || typeof b !== 'number') {
		throw {
			name: 'TypeError',
			message: 'add needs numbers'
		};
	}
	return a + b;
};

// Make a try_it function that calls the new add function incorrectly.
var try_it = function () {
	try{
		add("seven");
	} catch (e) {
		console.log(e.name + ': ' + e.message);
	}
}
try_it();



console.log("");
console.log("--- Augmenting types");

//We can augment the basic types:

Function.prototype.method = function (name, func) {
	this.prototype[name] = func;
	return this;
};

Number.method('findinteger', function () {
	return Math[this < 0 ? 'ceil' : 'floor'](this);
});

String.method('trim', function () {
	return this.replace(/^\s+|\s+$/g, '');
});

console.log(((-10)/3).findinteger());
console.log('"' + " neat ".trim() + '"');


//Since basic types' prototypes are shared with other libraries and apps...
Function.prototype.method = function (name, func) {
	if (!this.prototype[name]) {
		this.prototype[name] = func;
	}
};
	//only adds method if is not defined on the prototype



console.log("");
console.log("--- Recursion");

// I think it's a top down strategy, like:
	// "move all but the bigger one" to aux
	// then move bigger one to dst
	// then "move all but the bigger one" from aux to dst

// Recursion is in "move all but the bigger one" 

var hanoi = function (disc, src, aux, dst) {
    if (disc > 0) {
        hanoi(disc - 1, src, dst, aux);
        console.log('Move disc ' + disc +' from ' + src + ' to ' + dst);
        hanoi(disc - 1, aux, src, dst);
	}
};

hanoi(3, 'Src', 'Aux', 'Dst');

// Define a walk_the_DOM function that visits every
// node of the tree in HTML source order, starting
// from some given node. It invokes a function,
// passing it each node in turn. walk_the_DOM calls
// itself to process each of the child nodes.
var walk_the_DOM = function walk(node, func) {
	func(node);
	node = node.firstChild;
	while (node) {
		walk(node, func);
		node = node.nextSibling;
	}
};

// Define a getElementsByAttribute function. It
// takes an attribute name string and an optional
// matching value. It calls walk_the_DOM, passing it a
// function that looks for an attribute name in the
// node. The matching nodes are accumulated in a
// results array.
var getElementsByAttribute = function (att, value) {
	var results = [];
	walk_the_DOM(document.body, function (node) {
		var actual = node.nodeType === 1 && node.getAttribute(att);
		if (typeof actual === 'string' &&
		(actual === value || typeof value !== 'string')) {
			results.push(node);
		}
	});
	return results;
};

console.log("Output just to point out that javascript do not have tail recursion optimization.");



console.log("");
console.log("--- Scope");

var foo = function () {
	var a = 3, b = 5;
	console.log('sc1 a='+a+' b='+b+' .')
	var bar = function () {
		var b = 7, c = 11;
		console.log('sc2 a='+a+' b='+b+' c='+c+' .')
			// At this point, a is 3, b is 7, and c is 11

		a += b + c;
		console.log('sc3 a='+a+' b='+b+' c='+c+' .')
			// At this point, a is 21, b is 7, and c is 11
	};

	console.log('sc4 a='+a+' b='+b+' .')
		// At this point, a is 3, b is 5, and c is not defined

	bar();
		console.log('sc5 a='+a+' b='+b+' .')
		// At this point, a is 21, b is 5
		// b was changed by bar() function, because javascript do not have block scope
};

foo();



console.log("");
console.log("--- Closure");






































