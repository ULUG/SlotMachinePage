var NUMBER_CHANGE_SPEED = 5
var SLOW_DOWN_INTERVAL = 1000

var numberGroup1 = ""
var numberGroup2 = ""
var numberGroup3 = ""
var numberGroupTemporary = ""

var maxRandomNumber = 999

var animationInterval = 0
var marginOfNumberFrame = 0
var isSpinning = false

var spinningIntervalTimer

var htmlRightArea
var htmlNumberLayer
var htmlMaxNumberInputBox
var htmlCandyDialog
var htmlNumberFrame



function onloadBody(){
	htmlRightArea = document.getElementById("rightArea")
	htmlNumberLayer = document.getElementById("numberLayer")
	htmlMaxNumberInputBox = document.getElementById("maxNumberInputBox")
	htmlCandyDialog = document.getElementById("candyDialog")

	numberGroupTemporary += "<img src='./imgs/0.png' class='number'>"
	numberGroupTemporary += "<img src='./imgs/0.png' class='number'>"
	numberGroupTemporary += "<img src='./imgs/0.png' class='number'>"

	numberGroup1 = numberGroup2 = numberGroup3 = numberGroupTemporary

	generateNumberFrame()
}



function onclickMouth(){
	htmlCandyDialog.style.display = "block"
}



function onclickCandy(){
	if(htmlMaxNumberInputBox.value){
		maxRandomNumber = parseInt(htmlMaxNumberInputBox.value)
		htmlCandyDialog.style.display="none"
	} else {
		alert("Please Input Number");
	}
}



function onclickHandle(){
	if(isSpinning == false){
		isSpinning = true

		animationInterval = 1
		spinningIntervalTimer = setInterval("spin()", animationInterval)
		setTimeout("slowdown()", SLOW_DOWN_INTERVAL)

		htmlRightArea.style.backgroundImage="url('./imgs/handdown.png')"
	}
}



function spin(){
	marginOfNumberFrame -= NUMBER_CHANGE_SPEED

	if(marginOfNumberFrame < -125 + NUMBER_CHANGE_SPEED){
		marginOfNumberFrame = 0

		generateNumber()

		numberGroup1 = numberGroup2
		numberGroup2 = numberGroup3
		numberGroup3 = numberGroupTemporary

		generateNumberFrame()
	}

	htmlNumberFrame.style.marginTop = marginOfNumberFrame
}



function generateNumber(){
	var tmpNum = Math.floor(Math.random() * maxRandomNumber)
	tmpNum++

	var number1 = Math.floor(tmpNum / 100)
	var number2 = Math.floor((tmpNum - (number1 * 100)) / 10)
	var number3 = tmpNum % 10

	numberGroupTemporary = "<img src='./imgs/" + number1 + ".png' class='number'>"
	numberGroupTemporary += "<img src='./imgs/" + number2 + ".png' class='number'>"
	numberGroupTemporary += "<img src='./imgs/" + number3 + ".png' class='number'>"
}



function generateNumberFrame(){
	var result = ""
	result += "<div id='numberFrame'>"
	result += numberGroup1
	result += numberGroup2
	result += numberGroup3
	result += "</div>"

	htmlNumberLayer.innerHTML = result
	htmlNumberFrame = document.getElementById("numberFrame")
}



function slowdown(){
	if(animationInterval < 750){
		animationInterval *= 2
		clearInterval(spinningIntervalTimer)
		spinningIntervalTimer = setInterval("spin()", animationInterval)
		setTimeout("slowdown()", 750 - animationInterval)
	} else {
		clearInterval(spinningIntervalTimer)

		if(marginOfNumberFrame > -62){
			marginOfNumberFrame = 0
		} else {
			marginOfNumberFrame = -125
		}

		htmlNumberFrame.style.marginTop = marginOfNumberFrame
		htmlRightArea.style.backgroundImage="url('./imgs/handup.png')"
		isSpinning = false
	}
}
