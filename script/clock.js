
(function () {
    `use strict`;
    var canvas = document.querySelector(`#myClock`),
        canvasContext = canvas.getContext(`2d`),
        getbtnDefault = document.querySelector(`#btnDefault`),
        getbtnAnother = document.querySelector(`#btnAnother`),
        cX = canvas.width / 2,
        cY = canvas.width / 2,
        endX,
        endY,
        radius = 100,
        date,
        hours,
        minutes,
        seconds;
    initTime();

    if (canvasContext.getContext) {
        drawClock();
    } else {

    }
    setInterval(animateClock, 1000);
    
    //get your system time
    function initTime() {
        date = new Date();
        hours = date.getHours() % 12;
        minutes = date.getMinutes();
        seconds = date.getSeconds();
    }
    

    //animate the clock
    function animateClock() {
        clearCanvas();
        refreshTime();
        drawClock();
    }

    //clear the canvas
    function clearCanvas() {
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    }

    //refresh time after 1 second
    function refreshTime() {
        seconds += 1;
        if (Math.floor((seconds / 60)) != 0) { minutes += 1; seconds %= 60; }
        if (Math.floor((minutes / 60)) != 0) { hours += 1; minutes %= 60; }
    }

    //draw or redraw Clock after time refresh function is calle
    function drawClock() {
        drawClockBackground();
        drawSecHand();
        drawMinutesHand();
        drawHoursHand();
    }


    function drawHand(beginX, beginY, endX, endY) {
        canvasContext.beginPath();
        canvasContext.moveTo(beginX, beginY);
        canvasContext.lineTo(endX, endY);
        canvasContext.stroke();
        canvasContext.closePath();
    }

    //draw Hand for minutes
    function drawMinutesHand() {
        var rotationUnit = minutes + seconds / 60,
            rotationFactor = Math.PI / 30,
            rotation = rotationUnit * rotationFactor,
            handLength = 0.9 * radius;
        endX = cX + handLength * Math.sin(rotation);
        endY = cY - handLength * Math.cos(rotation);
        drawHand(cX, cY, endX, endY);
    }

    //draw Hand for hours
    function drawHoursHand() {
        var rotationUnit = 5 * hours + minutes / 12,
            rotationFactor = Math.PI / 30,
            rotation = rotationUnit * rotationFactor,
            handLength = 0.6 * radius;
        endX = cX + handLength * Math.sin(rotation);
        endY = cY - handLength * Math.cos(rotation);
        drawHand(cX, cY, endX, endY);
    }

   
    function drawArcAtPosition(cX, cY, radius, startAngle, endAngle, counterClockwise, lineWidth) {
        canvasContext.beginPath();
        canvasContext.arc(cX, cY, radius, startAngle, endAngle, counterClockwise);
        canvasContext.lineWidth = lineWidth;
        canvasContext.strokeStyle = "red";
        canvasContext.stroke();
        canvasContext.closePath();
    }

    function drawLittleCircle(cX, cY) {
        drawArcAtPosition(cX, cY, 4, 0 * Math.PI, 2 * Math.PI, false, 4);
    }
    //draw Hand for second
    function drawSecHand() {
        var rotationUnit = seconds
            rotationFactor = Math.PI / 30,
            rotation = rotationUnit * rotationFactor,
            handLength = 1 * radius;
        endX = cX + handLength * Math.sin(rotation);
        endY = cY - handLength * Math.cos(rotation);
        drawHand(cX, cY, endX, endY);
    }
    
    function drawDefault() {
        var correction = 1 / 300,
            shiftUnit = 1 / 170,
            shiftFactor = 1/ 30,
            angleInitialPosition = 2,
            angleCurrentPositionBegin = 0,
            angleCurrentPositionEnd = 0,
            repeat = 60,
            lineWidth = 10;
        for (var i=0; i < repeat; i+=1) {
            angleCurrentPositionBegin = angleInitialPosition - (i * shiftFactor) - correction;
            angleCurrentPositionEnd = angleCurrentPositionBegin + shiftUnit;
            if (i % 5 == 0) lineWidth = 20;
            else lineWidth = 10;
            drawArcAtPosition(cX, cY, radius, angleCurrentPositionBegin * Math.PI, angleCurrentPositionEnd * Math.PI, false, lineWidth);
        }
        drawLittleCircle(cX, cY);
    }

    function drawAnother() {
        canvasContext.beginPath();
        canvasContext.strokeStyle = "#21c2ea";  
        canvasContext.arc(200, 200, radius, 0 , 2*Math.PI);
        canvasContext.fillStyle = "black";
        canvasContext.fill();
        canvasContext.closePath();
        drawNumber();
    }
    
    //Another clock face
    function drawNumber() {
        var ang;
        var num;
        canvasContext.font = radius * 0.2 + "px arial"; 
        canvasContext.textBaseline = "middle";
        canvasContext.textAlign = "center";
        canvasContext.fillStyle = '#006c7c'; 
        for (num = 1; num <= 12; num++) {
           if (num ==1 ||num ==2 || num == 3 ||num ==4 || num ==5 ||num == 6 || num ==7 ||num ==8 ||num == 9 ||num ==10 || num ==11 ||num == 12) {
                ang = num * Math.PI / 6;
                canvasContext.rotate(ang);
                canvasContext.translate(0, -radius * 0.8);
                canvasContext.rotate(-ang);
                canvasContext.fillText(num.toString(), cX, cY);
                canvasContext.rotate(ang);
                canvasContext.translate(0, radius * 0.8);
                canvasContext.rotate(-ang);
           }
        }
    }

    function drawClockBackground() {
        drawDefault();
        getbtnDefault.addEventListener('click',btnSelectDefault,false);
        getbtnAnother.addEventListener('click',btnSelectAnother,false);
    }

    function btnSelectDefault() {
        drawClockBackground = drawDefault;
    }

    function btnSelectAnother() {
        drawClockBackground = drawAnother;
    }
})();