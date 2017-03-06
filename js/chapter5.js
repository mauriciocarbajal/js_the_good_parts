output('***** CHAPTER 5 - INHERITANCE | Examples from the book "JS - The Good Parts" *****');


output("");
output("--- Pseudoclassical");

//this.prototype
//		is defined by the constructor
//		is where inherited traits are


var Mammal = function (name) {
	this.name = name;
};

Mammal.prototype.get_name = function () {
	return this.name;
};

Mammal.prototype.says = function () {
	return this.saying || '';
};


var myMammal = new Mammal('Herb the Mammal');
output(myMammal);

var name = myMammal.get_name();
	// 'Herb the Mammal'
output(name);


// var Cat = function (name) {
// 	this.name = name;
// 	this.saying = 'meow';
// };

// Cat.prototype = new Mammal();

// Cat.prototype.purr = function(n){
// 	var i, s = '';
// 	for (i = 0; i < n; i += 1) {
// 		if (s) {
// 			s += '-';
// 		}
// 		s += 'r';
// 	}
// 	return s;
// };

// Cat.prototype.get_name = function(){
// 	return this.says() + ' ' + this.name + ' ' + this.says();
// };

Function.prototype.method = function (name, func) {
	if (!this.prototype[name]) {
		this.prototype[name] = func;
	}
	return this;	//<- added this to allows cascade later
};

Function.method('inherits', function (Parent) {
	this.prototype = new Parent();
	return this;
});

var Cat = function (name) {
         this.name = name;
         this.saying = 'meow';
     }
     .inherits(Mammal)
     .method('purr', function(n){
        var i, s = '';
        for (i = 0; i < n; i += 1) {
            if (s) {
            	s += '-';
			}
			s += 'r';
		}
		return s; 
	})
	.method('get_name', function(){
		return this.says() + ' ' + this.name + ' ' + this.says();
	});


var myCat = new Cat('Henrietta');
var says = myCat.says();
output(says);
	// 'meow'

var purr = myCat.purr(5);
output(purr);
	// 'r-r-r-r-r' 

var name = myCat.get_name();		//inherited from mammal
output(name);
	// 'meow Henrietta meow'



output("");
output("--- Object Specifiers");

//pass an object with parameters instead of many parameters (maybe optional pars among them)


output("");
output("--- Prototypal Inheritance");

//Prototypal inheritance is conceptually simpler than classical inheritance: a new object can inherit the properties of an old object.

var myMammal = {
	name : 'Herb the Mammal',
	get_name : function () {
		return this.name;
	},
	says : function () {
		return this.saying || '';
	}
};


//Differential inheritance (transform an old object into a new different one by adding things)
var myCat = Object.create(myMammal);
myCat.name = 'Henrietta';
myCat.saying = 'meow';
myCat.purr = function (n) {
	var i, s = '';
	for (i = 0; i < n; i += 1) {
		if (s) {
			s += '-';
		}
		s += 'r';
	}
	return s;
};
myCat.get_name = function () {
	return this.says() + ' ' + this.name + ' ' + this.says();
};

output(myCat);

//Cons: no privacy




output("");
output("--- Functional");

//functional constructor: myobj = func(spec)

//  var constructor = function (spec, my) {
// 		var that, other private instance variables;
// 		my = my || {};
// 		Add shared variables and functions to my
//		that = a new object;
// 		Add privileged methods to that
// 		return that;
//  };


var mammal = function (spec) {
	var that = {};
	that.get_name = function () {
		return spec.name;
	};

	that.says = function () {
		return spec.saying || '';
	};
	
	return that;
};

var myMammal = mammal({name: 'Herb'});


var cat = function (spec) {
	spec.saying = spec.saying || 'meow';
	var that = mammal(spec);

	that.purr = function (n) {
		var i, s = '';
		for (i = 0; i < n; i += 1) {
			if (s) {
				s += '-';
			}
			s += 'r';
		}
		return s;
	};

	that.get_name = function () {
		return that.says() + ' ' + spec.name + ' ' + that.says();
	};	
	
	return that;
}
     
var myCat = cat({name: 'Henrietta'});

output(myCat.purr(4));
output(myCat.get_name());

Object.method('superior', function (name) {
	var that = this, method = that[name];
	return function () {
		return method.apply(that, arguments);
	};
});

var coolcat = function (spec) {
	var that = cat(spec), super_get_name = that.superior('get_name');
	that.get_name = function (n) {
		return 'like ' + super_get_name() + ' baby';
	};
	return that;
};
var myCoolCat = coolcat({name: 'Bix'});
var name = myCoolCat.get_name();
output(myCoolCat);
output(name);
	// 'like meow Bix meow baby'



output("");
output("--- Parts");

//We can compose objects out of sets of parts.
//For example, we can make a function that can add simple event processing features to any object.
//It adds an on method, a fire method, and a private event registry

var eventuality = function (that) {
	var registry = {};

	that.fire = function (event) {
		// Fire an event on an object. The event can be either
		// a string containing the name of the event or an
		// object containing a type property containing the
		// name of the event. Handlers registered by the 'on'
		// method that match the event name will be invoked.
		var array,
		func,
		handler,
		i,
		type = typeof event === 'string' ? event : event.type;

		// If an array of handlers exist for this event, then
		// loop through it and execute the handlers in order.
		if (registry.hasOwnProperty(type)) {
			array = registry[type];
			for (i = 0; i < array.length; i += 1) {
				handler = array[i];
				// A handler record contains a method and an optional
				// array of parameters. If the method is a name, look
				// up the function.
				func = handler.method;
				if (typeof func === 'string') {
					func = this[func];
				}
				// Invoke a handler. If the record contained
				// parameters, then pass them. Otherwise, pass the
				// event object.
				func.apply(this, handler.parameters || [event]);
			}
		}
		return this;
	};

	that.on = function (type, method, parameters) {
		// Register an event. Make a handler record. Put it
		// in a handler array, making one if it doesn't yet
		// exist for this type.
		var handler = {
			method: method,
			parameters: parameters
		};
		
		if (registry.hasOwnProperty(type)) {
			registry[type].push(handler);
		} else {
			registry[type] = [handler];
		}
		return this;
	};
	
	return that;
};


ev = eventuality(document);
var met = function(a){
	output('event fired: param='+a);
};
ev.on('test',met,[100]);
ev.fire('test');









