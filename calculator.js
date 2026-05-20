let a = b = o = num = result = null;
let timespressed = 0;
let stringnumb = "";
let operation;
let singleclick = true;
let freshstart = false;
let newfirstoperand = false;
let secondoperand = false; 
let secondoperator = false;
let afterequals = false;
const calculator = {
	"+": (a,b) => a + b,
	"-": (a,b) => a - b,
	"/": (a,b) => a / b,
	"*": (a,b) => a * b,
}
function operate(oper,a,b){
	if(a != null && b != null && oper != null) {
		if(oper === "/" && b === 0) {
			alert("Division by Zero is Undefined.");
			let divbyzero = true;
			return divbyzero;
		}
		else {
			result = calculator[oper](a,b);
			return result;
		}
	}
	else return null;
}
update = (screencontent) => {
	if(screencontent === true) {
		displayscreen.textContent = "Division by Zero Forbidden!";
	}
	else displayscreen.textContent = ` ${Math.round(screencontent * 1e5)/1e5} `;
}
storea = (f) => a = f;
storeb = (s) => b = s;
storeo = (op) => o = op;
const calcasing = document.createElement("div");
const secondrow = document.createElement("div");
const digitholder = document.createElement("div");
digitholder.style.display = "flex";
digitholder.style.gap = "16px";
digitholder.style.justifyContent = "center";
for(let digit = 0; digit < 10; ++digit){
	let button = document.createElement("button");
	button.textContent = digit;
	button.style.padding = "20px 40px";
	button.style.flex = "1 1 basis";
	button.addEventListener("click", (e) => {
		if(afterequals) {
			afterequals = false;
			operation.style.backgroundColor = "white";
			operation.style.color = "black";
			timespressed = 0;
			storea(null);
			storeb(null);
			result = null;
		}
		if(newfirstoperand) {
			newfirstoperand = false;
			singleclick = true;
			stringnumb = "";
		}
		stringnumb += digit;
		displayscreen.textContent = stringnumb;
		if(a != null) num = Number(stringnumb);
	});
	digitholder.appendChild(button)
}
const panel = document.createElement("div");
panel.style.display = "flex";
panel.style.flex = "0 0 0";
panel.style.flexFlow = "column";
panel.style.gap = "15px";
for(const symbol of ["+","-","*","/"]){
	let button = document.createElement("button");
	button.textContent = `${symbol}`;
	button.style.padding = "25px 40px";
	button.style.flex = "1 1 basis";
	button.addEventListener("click", (e) => {
		if(singleclick) {
			if(afterequals) afterequals = false;
			if(typeof stringnumb === "number" && Number.isFinite(stringnumb)) num = stringnumb;
			else if(typeof stringnumb === "string" && stringnumb.trim() !== "") num = Number(stringnumb);
			if(a != null) {
				if(secondoperator) {
					storeb(num);
					result = operate(o,a,b);
					update(result);
				}
				if(result != null && result !== "") num = result;
			}
			storea(num);
			singleclick = false;
			secondoperator = true;
			newfirstoperand = true;
		}
		if(timespressed > 0) {
			operation.style.backgroundColor = "white";
			operation.style.color = "black";
		}
		operation = e.currentTarget;
		storeo(operation.textContent);
		operation.style.color = "yellow";
		operation.style.backgroundColor = "blue";
		timespressed += 1;
	})
	panel.appendChild(button);
}
const equals = document.createElement("button");
equals.textContent = "=";
equals.style.padding = "25px 45px";
equals.style.flex = "1 1 basis";
equals.addEventListener("click", () => {
	storeb(num);
	result = operate(o,a,b);
	storea(result);
	update(result);
	[ secondoperand, newfirstoperand, freshstart, secondoperator, singleclick, afterequals ] = [ false, true , false, false, true, true ];
});
panel.appendChild(equals);
const clear = document.createElement("button");
clear.textContent = "Clear";
clear.style.padding = "0 30px";
clear.style.flex = "0 1 0";
clear.addEventListener("click", () => {
	displayscreen.textContent = "";
	stringnumb = "";
	timespressed = 0;
	operation.style.backgroundColor = "white";
	a = b = num = result = o = operation = null;
	[ secondoperand, newfirstoperand, freshstart, secondoperator, singleclick, afterequals ] = [ false, false, false, false, true, false ];
});
const displayscreen = document.createElement("div");
displayscreen.style.border = "1px black solid";
displayscreen.style.backgroundColor = "silver";
displayscreen.style.paddingTop = "1%";
displayscreen.style.flex = "9 0 0";
displayscreen.textContent = "";
secondrow.style.display = "flex";
secondrow.style.alignItems = "stretch";
secondrow.style.marginTop = "15px";
secondrow.style.gap = "15px";
calcasing.appendChild(digitholder);
secondrow.append(panel,displayscreen,clear);
calcasing.appendChild(secondrow);
document.body.appendChild(calcasing);
