var game = [ ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
             ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
             ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
             ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
             ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
             ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
             ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
             ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
             ['.', '.', '.', '.', '.', '.', '.', '.', '.']  
        ];
var board = document.createElement('pre');
document.body.appendChild(board);

var button = document.createElement('button');
button.onclick = fire;

var t = document.createTextNode('Fire!');
document.body.appendChild(button);
button.appendChild(t);

function drawBoard() {
    'use strict';
    var boardContents = '', i, j;
    for (i = 0; i < 9; i++) {
        for (j = 0; j < 9; j = j + 1) {
            boardContents = boardContents + game[i][j] + '    ';
        }
        boardContents = boardContents + '<br><br><br>';
    }
    return boardContents;
}

board.innerHTML = drawBoard();

    var x1 = 10;
    var y1 = 10;
    var m;  
    var n;
while (m != x1) {
    var x = prompt('ระบุตำแหน่งในแนวแกน X ที่คุณต้องการวางเรือ: (0-8)');
x = Number(x);
    if(x < 0 || x > 8){
    alert('ไม่ถูกต้อง กรุณากรอกตัวเลข 0-8 เท่านั้น');
    }   
        else {
            m = x1;
        }
}
while (n != y1){
    var y = prompt('ระบุตำแหน่งในแนวแกน Y ที่คุณต้องการวางเรือ: (0-8)');
y = Number(y);
    if(y < 0 || y > 8){
        alert('ไม่ถูกต้อง กรุณากรอกตัวเลข 0-8 เท่านั้น');
    }else {
        n = y1;
    }
}

var direction = prompt('คุณต้องการวางเรือในแนวนอน กด(h) หรือแนวตั้ว กด(v)');
if (direction[0] == 'h') {
    var m;
    for (m = x; m < (x + 4); m++) {
        game[y][m] = '#';
    }
}

if (direction[0] == 'v') {
    var m;
    for (m = y; m < (y + 4); m++) {
        game[m][x] = '#';
    }
}
board.innerHTML = drawBoard();
function fire() {
    'use strict';   
    var a;
    var A;
    var x2 = 10;
    var y2 = 10;

    while (a != x2) {
     var fireX = prompt('ระบุตำแหน่งในแนวแกน X ที่คุณต้องการยิง: (0-8)');
     fireX = Number(fireX);
     if(fireX < 0 || fireX > 8){
        alert('ไม่ถูกต้อง กรุณากรอกตัวเลข 0-8 เท่านั้น');
    }else{
        a = x2;
    }
}
    while (A != y2) {
    var fireY = prompt('ระบุตำแหน่งในแนวแกน Y ที่คุณต้องการยิง: (0-8)');
        fireY = Number(fireY);
        if(fireY < 0 || fireY > 8){
            alert('ไม่ถูกต้อง กรุณากรอกตัวเลข 0-8 เท่านั้น');
        }else{
            A = y2;
        }
    }
if (game[fireY][fireX] == '.') {
    alert('พลาดเป้า');
}
else if (game[fireY][fireX] == '*') {
    alert('เรือในตำแหน่งดังกล่าวถูกยิงไปแล้ว');
} else {
    alert('Boom!!! คุณยิงโดนเรือ');
    game[fireY][fireX] = '*';
    board.innerHTML = drawBoard();
}
var shipfound, i, j;
for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {
        if (game[i][j] != '.' && game[i][j] != '*') {
            shipfound = ture;
        }
    }
}
    if (!shipfound) {
    alert('เรื่อทุกลำถูกจมหมดแล้ว เก่งมากกัปตัน! จบเกม');
    document.body.removeChild(button);
    }
};