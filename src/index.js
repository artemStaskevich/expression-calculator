function eval() {
    // Do not use eval!!!
    return;
}

const prior = {'-': 1, '+': 1, '*': 2, '/': 2, '(': 0, ')': 0};

function reverseNotation(arr) {
    var res = [], buf = [];
    
	for(var i = 0; i < arr.length; i++) {
		if (!prior.hasOwnProperty(arr[i])) {
			res.push(arr[i]);
		} else {
			switch (arr[i]) {
				case '+':
				case '-':
				case '*':
				case '/':
					if (buf.length == 0) {
						buf.push(arr[i]);
					} else {
						if (prior[arr[i]] > prior[buf[buf.length-1]]) {	
							buf.push(arr[i]);
						} else {
							while (prior[arr[i]] <= prior[buf[buf.length-1]] && buf.length != 0) {
								res.push(buf.pop());
							}
							buf.push(arr[i]);
						}
					}
					break;
				case '(':
					buf.push(arr[i]);
					break;
				case ')':
					while (buf.length != 0 && buf[buf.length-1] !== '(') {
						res.push(buf.pop());
                    }
                    buf.pop();			
					break;
			}
		}
	}

	while (buf.length != 0) {
		res.push(buf.pop());
	}
	
    return res;
}

function expressionCalculator(expr) {

    var arr = expr.replace(/(\*|\/|\+|\-)/g, ' $& ').split(' ').filter(e => e != ''),
        str = arr.join('');

    if ( str.includes('/0') ) {
        throw new Error('TypeError: Division by zero.');
    }
    if ( str.replace(/[^(]/g, "").length != str.replace(/[^)]/g, "").length ) {
        throw new Error('ExpressionError: Brackets must be paired');
    }

	var expression = reverseNotation(arr),
		n1,
		n2,
		res,
		buf = [];
	
	for(var i = 0; i < expression.length; i++) {
		if (!prior.hasOwnProperty(expression[i])) {
			buf.push(expression[i]);
		} else {
			n2 = Number(buf.pop()); 
			n1 = Number(buf.pop());
			switch(expression[i]) {
				case '+': res = n1 + n2; break;
				case '-': res = n1 - n2; break;
				case '*': res = n1 * n2; break;
				case '/': res = n1 / n2; break;
			}
			buf.push(res);
		}
    }
    
	return buf.pop();
}

module.exports = {
    expressionCalculator
}