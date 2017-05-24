var move_speed = 5;
var fast_time = 1000;

var first_line = "";
var second_line = "";
var third_line = "";
var test_line = "";
var isProc = 0;
first_line += "<img src='./imgs/0.png' class='number'>";
first_line += "<img src='./imgs/0.png' class='number'>";
first_line += "<img src='./imgs/0.png' class='number'>";

second_line += "<img src='./imgs/0.png' class='number'>";
second_line += "<img src='./imgs/0.png' class='number'>";
second_line += "<img src='./imgs/0.png' class='number'>";
	
third_line += "<img src='./imgs/0.png' class='number'>";
third_line += "<img src='./imgs/0.png' class='number'>";
third_line += "<img src='./imgs/0.png' class='number'>";

test_line += "<img src='./imgs/0.png' class='number'>";
test_line += "<img src='./imgs/0.png' class='number'>";
test_line += "<img src='./imgs/0.png' class='number'>";

function onloadBody(){
	num_frame_generator();
}

function clickHandle(){
	if(isProc == 0){
		isProc = 1;
		speed = 1;
		si = setInterval("move()", speed);
		setTimeout("slowdown()", fast_time);
		document.getElementById("rightArea").style.backgroundImage="url('./imgs/handdown.png')";
	}
}

function slowdown(){
	if(speed < 750){
		speed *= 2;
		clearInterval(si);
		si = setInterval("move()", speed);
		setTimeout("slowdown()", 750 - speed);
	} else {
		clearInterval(si);
		if(num_frame_margin > -62){
			num_frame_margin = 0;
		} else {
			num_frame_margin = -125;
		}

		document.getElementById("numberFrame").style.marginTop = num_frame_margin;
		document.getElementById("rightArea").style.backgroundImage="url('./imgs/handup.png')";
		isProc = 0;
	}
}

function num_frame_generator(){
	var result = "";
	result += "<div id='numberFrame'>";
	result += first_line;
	result += second_line;
	result += third_line;
	result += "</div>";

	document.getElementById("numberLayer").innerHTML = result;
}

num_frame_margin = 0;

function move(){
	num_frame_margin -= move_speed;
	if(num_frame_margin < -125 + move_speed){
		num_frame_margin = 0;
		num_generator();
		first_line = second_line;
		second_line = third_line;
		third_line = test_line;
		num_frame_generator();
	}
	document.getElementById("numberFrame").style.marginTop = num_frame_margin;
}

function num_generator(){
	maxvalue = parseInt(maxvalue);
/*	
	while(10){
		var tmpNum = Math.floor(Math.random() * maxvalue);
		if(num_arr[tmpNum] != 1)
			break;
	}
	num_arr[tmpNum] = 0;
*/
	var tmpNum = Math.floor(Math.random() * maxvalue);
	tmpNum++;
	first_num = Math.floor(tmpNum / 100);
	second_num = Math.floor((tmpNum - (first_num * 100)) / 10);
	third_num = tmpNum % 10;
	test_line = "<img src='./imgs/" + first_num + ".png' class='number'>";
	test_line += "<img src='./imgs/" + second_num + ".png' class='number'>";
	test_line += "<img src='./imgs/" + third_num + ".png' class='number'>";
}

function test(){
	clearInterval(si);
}

var maxvalue = 999;
var num_arr = new Array();

for(i = 0; i < maxvalue; i++){
	flag = 1;
	while(flag){
		num_arr[i] = Math.fllor(Math.random() * maxvalue);
		for(j = 0; j < i; j++){
			if(num_arr[j] == num_arr[i]){
				flag = 0;
				break;
			}
		}
	}
}

function clickCandy(){
	if(document.getElementById("maxNumberInputBox").value != ""){
//		alert("숫자를 입력하세요");
//	}else {
		maxvalue = document.getElementById("maxNumberInputBox").value;
		document.getElementById("candyDialog").style.display="none";
		maxvalue = parseInt(maxvalue);
		for(i = 0; i < maxvalue; i++){
			num_arr[i] = 1;
		}
	}	
}

function clickMouth(){
	document.getElementById("candyDialog").style.display = "block";
}
