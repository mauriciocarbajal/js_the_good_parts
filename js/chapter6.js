output('***** CHAPTER 6 - ARRAYS | Examples from the book "JS - The Good Parts" *****');


output("");
output("--- Array Literals");

//both inherits from Array.prototype
var empty = [];
var numbers = [
	'zero', 'one', 'two', 'three', 'four',
	'five', 'six', 'seven', 'eight', 'nine'
];

output(empty[1]);
output(numbers[1]);
output(empty.length);
output(numbers.length);


//inherits from Object.prototype
var numbers_object = {
	'0': 'zero',  '1': 'one',   '2': 'two',
	'3': 'three', '4': 'four',  '5': 'five',
	'6': 'six',   '7': 'seven', '8': 'eight',
	'9': 'nine'
};


var misc = [
	'string', 98.6, true, false, null, undefined,
	['nested', 'array'], {object: true}, NaN,
	Infinity
];

output(misc.length);


output("");
output("--- Length");

//The length property is the largest integer property name in the array plus one
var myArray = [];
output(myArray.length);
	// 0

myArray[1000000] = true;
output(myArray.length);
	// 1000001

numbers.length = 3;	//removes anything with a key > 3
output(numbers);
     // numbers is ['zero', 'one', 'two']

numbers.push('go');
output(numbers);


output("");
output("--- Delete");

//delete numbers[2];	//but leaves a hole
numbers.splice(2,1);	//fixes the hole where the rain gets in
output(numbers);



output("");
output("--- Enumeration");


var i;
for (i = 0; i < numbers.length; i += 1) {
	output(numbers[i]);
}


output("");
output("--- Confusion");

// Array or Object? JS doesn't know that either. Tests for arrayness:

var is_array = function (value) {
         return value &&
             typeof value === 'object' &&
             value.constructor === Array;
};

//foreign arrays
var is_array_better = function (value) {
         return value &&
             typeof value === 'object' &&
             typeof value.length === 'number' &&
             typeof value.splice === 'function' &&
             !(value.propertyIsEnumerable('length'));
};



output("");
output("--- Methods");


Array.method('reduce', function (f, value) {
	var i;
	for (i = 0; i < this.length; i += 1) {
		value = f(this[i], value);
	}
	return value;
});


var data = [4, 8, 15, 16, 23, 42];

var add = function (a, b) {
	return a + b;
};

var mult = function (a, b) {
	return a * b;
};


var sum = data.reduce(add, 0);
output(sum);
	// sum is 108

var product = data.reduce(mult, 1);
output(product);
	// product is 7418880


//adding a method to a particular array.
//note that 'total' is a string key, so it doesn't change the array length
data.total = function () {
	return this.reduce(add, 0);
};

total = data.total();
output(total);
	// total is 108


output("");
output("--- Dimensions");

//Arrays are not initialized

Array.dim = function (dimension, initial) {
	var a = [], i;
	for (i = 0; i < dimension; i += 1) {
		a[i] = initial;
	}
	return a; 
};

// Make an array containing 10 zeros.
var myArray = Array.dim(10, 0);
output(myArray);

var matrix = [
    [0, 1, 2],
    [3, 4, 5],
	[6, 7, 8]
];

output(matrix[2][1]);
	//7



// Note: Array.dim(n, []) will not work here.
// Each element would get a reference to the same
// array, which would be very bad.


Array.matrix = function (m, n, initial) {
	var a, i, j, mat = [];
	for (i = 0; i < m; i += 1) {
		a = [];
		for (j = 0; j < n; j += 1) {
			a[j] = initial;
		}
		mat[i] = a;
	}
	return mat;
};

// Make a 4 * 4 matrix filled with zeros.
var myMatrix = Array.matrix(4, 4, 0);

output(myMatrix[3][3]);   
	// 0


// Method to make an identity matrix.
Array.identity = function (n) {
	var i, mat = Array.matrix(n, n, 0);
	for (i = 0; i < n; i += 1) {
		mat[i][i] = 1;
	}
	return mat;
};
myMatrix = Array.identity(4);
output(myMatrix[3][3]);
	// 1



