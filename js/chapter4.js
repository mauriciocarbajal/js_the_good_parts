output('***** CHAPTER 4 - FUNCTIONS | Examples from the book "JS - The Good Parts" *****');


output("");
output("--- Function objects");

// Object: collection of key/value pairs and a hidden link to a prototype object
// {} <--> Object.prototype

// function (){} <--> Function.prototype <--> Object.prototype
//				<--> context (CLOSURE)
//				<--> code (.prototype.constructor)

// Functions are objects, but they can be invoked


output("");
output("--- Function literals");

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

output(func(1,2));
	//6

// Scopes of subfunc:
	//0: Closure (func))
		//a: 1
		//b: 2
		//c: 3
	//1: Global
		//lots of stuff...

output("");
output("--- Invocation");

//When invoked, functions have two additional parameters: this and arguments

//There are no validations of type or number of arguments:
output(func("hola"));


output("");
output("--- The Method Invocation Pattern");

//This is when a function is stored as a property of an object
//In this case, 'this' points to the container object

var myObject = {
	value: 0,
	increment: function (inc) {
		output(this);
		this.value += typeof inc === 'number' ? inc : 1;
	}
};

myObject.increment();	//binding to the object happens here, on invocation
output(myObject.value);

myObject.increment(2);	//binding to the object happens here, on invocation
output(myObject.value);


output("");
output("--- The Function Invocation Pattern");

//When invoked as a function
var res = add(1,2);
output(res);
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
output(myObject.value);
	// 6



output("");
output("--- The Constructor Invocation Pattern");

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
output(myQuo.get_status());



output("");
output("--- The Apply Invocation Pattern");

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
output(statusObject);
	// status is 'A-OK'



output("");
output("--- Arguments");

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
output(sum(4, 8, 15, 16, 23, 42));
	//108


output("");
output("--- Return");

//A function ALWAYS returns a value, eventually 'undefined'

//If it was invoked with 'new' prefix, and return value is not an object
//	then it returns this (the new object) instead

output(new Quo("quotest"));


output("");
output("--- Exceptions");

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
		output(e.name + ': ' + e.message);
	}
}
try_it();



output("");
output("--- Augmenting types");

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

output(((-10)/3).findinteger());
output('"' + " neat ".trim() + '"');


//Since basic types' prototypes are shared with other libraries and apps...
Function.prototype.method = function (name, func) {
	if (!this.prototype[name]) {
		this.prototype[name] = func;
	}
};
	//only adds method if is not defined on the prototype



output("");
output("--- Recursion");

// I think it's a top down strategy, like:
	// "move all but the bigger one" to aux
	// then move bigger one to dst
	// then "move all but the bigger one" from aux to dst

// Recursion is in "move all but the bigger one" 

var hanoi = function (disc, src, aux, dst) {
    if (disc > 0) {
        hanoi(disc - 1, src, dst, aux);
        output('Move disc ' + disc +' from ' + src + ' to ' + dst);
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

output("Output just to point out that javascript do not have tail recursion optimization.");



output("");
output("--- Scope");

var foo = function () {
	var a = 3, b = 5;
	output('sc1 a='+a+' b='+b+' .')
	var bar = function () {
		var b = 7, c = 11;
		output('sc2 a='+a+' b='+b+' c='+c+' .')
			// At this point, a is 3, b is 7, and c is 11

		a += b + c;
		output('sc3 a='+a+' b='+b+' c='+c+' .')
			// At this point, a is 21, b is 7, and c is 11
	};

	output('sc4 a='+a+' b='+b+' .')
		// At this point, a is 3, b is 5, and c is not defined

	bar();
		output('sc5 a='+a+' b='+b+' .')
		// At this point, a is 21, b is 5
		// b was changed by bar() function, because javascript do not have block scope
};

foo();



output("");
output("--- Closure");


var myCounter = function () {
	var value = 0;
    return {
        increment: function (inc) {
                 value += typeof inc === 'number' ? inc : 1;
    		},
    	getValue: function () {
    		return value;
			}
	};
}();

myCounter.increment(2);
output(myCounter.getValue());
myCounter.increment(2);
output(myCounter.getValue());
myCounter.increment(2);
output(myCounter.getValue());

//the 'value' variable is on myCounter's closure



var quo = function (status) {
			return {
					get_status: function(){
						return status;
					}
				};
		};

var myQuo = quo("amazed");	//quo name is not capitalized since it's not meant to be used with new prefix
output(myQuo.get_status());


//Another example:
var fade = function (node) {
	var level = 1;
	var step = function () {
		var hex = level.toString(16);
		node.style.backgroundColor = '#FFFF' + hex + hex;	//11 22 ... 99 AA BB CC DD EE FF
		if (level < 15) {
			level += 1;
			setTimeout(step, 100);
		}
	};
	setTimeout(step, 100);
};


document.write("<p id='fadetest'>FADE TEST</p>")
fade(document.getElementById('fadetest'));



//BAD EXAMPLE
var add_the_handlers_fail = function (nodes) {
	var i;
	for (i = 0; i < nodes.length; i += 1) {
		nodes[i].onclick = function (e) {
			alert(i);	//will show the value of i in the closure of this anonnymous function, probably 15
		};
	}
};


var add_the_handlers_ok = function (nodes) {
	var i;
	for (i = 0; i < nodes.length; i += 1) {
		nodes[i].onclick = function (i) {
			return function (e){
				alert(e);
			};
		}(i);	//now e has the i value in its closure, which is the parameter received in this line 
	}
};



output("");
output("--- Callbacks");

// request = prepare_the_request();
// send_request_asynchronously(request, function (response) {
//     display(response);
// });

// callbacks avoid block while waiting for the response


output("");
output("--- Modules");

String.method('deentityify', function () {
	// The entity table. It maps entity names to characters.
	var entity = {
		quot: '"',
		lt: '<',
		gt: '>'
	};
	
	// Return the deentityify method.
	return function () {
		// This is the deentityify method. It calls the string
		// replace method, looking for substrings that start
		// with '&' and end with ';'. If the characters in
		// between are in the entity table, then replace the
		// entity with the character from the table. It uses
		// a regular expression (Chapter 7).
		return this.replace(/&([^&;]+);/g, function (a, b) {
					//a = matched expression
					//b = $1
					var r = entity[b];
					return typeof r === 'string' ? r : a;
				});
	};
}());

output('&lt;&quot;&gt;'.deentityify()); // <">

// ONLY the deentityify method has access to the entity data structure

//The general pattern of a module is a function that
//		defines private variables and functions
//		creates privileged functions which, through closure, will have access to the private variables and functions
//		returns the privileged functions or stores them in an accessible place.





var serial_maker = function () {
	var prefix = 'x';
	var seq = 0;

	return {
		set_prefix: function (p) {
			prefix = String(p);
		},
		set_seq: function (s) {
			seq = s;
		},
		gensym: function () {
			var result = prefix + seq;
			seq += 1;
			return result;
		}
	};
};

var seqer = serial_maker();
seqer.set_prefix('Q');
seqer.set_seq(1000);

var unique = seqer.gensym();
output(seqer);
output(unique);
// unique is "Q1000"

//The methods do not make use of this or that. As a result, there is no way to compromise the seqer.

//If we passed seqer.gensym to a third party’s function, that function would be able to generate unique strings
//but would be unable to change the prefix or seq.


output("");
output("--- Cascade");

//If method sets or changes state and don't have anything to return, if we return this, we can create cascades:
//	node.empty().append('txt').css('display','block').hide().show() etc



output("");
output("--- Curry");

//Main idea is to create 'f2: b -> c' from 'f1 : a,b -> c' for a given 'a'

Function.method('curry', function () {
	var slice = Array.prototype.slice,
		args = slice.apply(arguments),
		that = this;
		//workaround: arguments is not exactly an array, so it doesn't have a concat method

	return function () {
        return that.apply(null, args.concat(slice.apply(arguments)));
    };
});


var add5 = add.curry(5);
output(add5(6));



output("");
output("--- Memoization");

//Main idea is to use an object in the function's closure in order to save (for instance) recently computed values

var fibonacci_orig = function () {
	var memo = [0, 1];
	var fib = function (n) {
		var result = memo[n];
		if (typeof result !== 'number') {
			result = fib(n - 1) + fib(n - 2);
			memo[n] = result;
		}
		return result;
	};

	return fib;
}();


// using a memoizer function
var memoizer = function (memo, fundamental) {
    var shell = function (n) {
        var result = memo[n];
        if (typeof result !== 'number') {
            result = fundamental(shell, n);
            memo[n] = result;
        }
        return result;
    };
    return shell;
};



var fibonacci = memoizer([0, 1], function (shell, n) {
	return shell(n - 1) + shell(n - 2);
});

output(fibonacci(10));
console.log(fibonacci.prototype);


//another example
var factorial = memoizer([1, 1], function (shell, n) {
    return n * shell(n - 1);
});

output(factorial(5));
