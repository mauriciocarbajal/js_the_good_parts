output('***** CHAPTER 7 - REGULAR EXPRESSIONS | Examples from the book "JS - The Good Parts" *****');


output("");
output("--- An Example");

var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
	//reg exp literal, one way to construct a RegExp

var parse_url_two =  new RegExp("[A-Za-z]+",'i');
	//reg exp literal, one way to construct a RegExp

var url = "http://www.ora.com:80/goodparts?q#fragment";

var result = parse_url.exec(url);
output(result);
	//array with matches


var result = parse_url_two.exec(url);
output(result);
	


