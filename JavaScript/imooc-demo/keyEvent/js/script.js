var data = ['iPhone X', 'BitCoin', '电影券: 蚁人2', '谢谢参与', '100手机充值卡', '卷纸一条', '500元图书借阅卡', '50元地铁卡'],
    timer = null;

window.onload = function () {
    var oPlay = document.getElementById('play'),
        oStop = document.getElementById('stop');

    oPlay.onclick = clickPlay;
    oStop.onclick = clickStop;
    document.onkeyup = function (evt) {
        var e = new Event('click', {'bubbles': true, 'cancelable': false});
        if (evt.keyCode === 13 && timer !== null) {
            oStop.dispatchEvent(e);
        } else if (evt.keyCode === 13) {
            oPlay.dispatchEvent(e);
        }
    }
}

function clickPlay() {
    if (timer) { return; }
    var oTitle = document.getElementById('title');
    this.style.backgroundColor = 'gray';
    
    timer = setInterval(function () {
        var random = Math.floor(Math.random() * data.length);
        oTitle.innerHTML = data[random];
    }, 50);
}

function clickStop() {
    var oPlay = document.getElementById('play');
    oPlay.style.backgroundColor = this.style.backgroundColor;
    clearInterval(timer);
    timer = null;
}