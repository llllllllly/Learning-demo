function getByClass(clsName, parentId) {
    var oParent = parentId ? document.getElementById(parentId) : document,
        eles = [],
        elements = oParent.getElementsByTagName('*');

    for(var i = 0, l = elements.length; i < l; i++) {
        if (elements[i].className == clsName) {
            eles.push(elements[i]);
        }
    }

    return eles;
}

window.onload = drag;

function drag() {
    // 面板相关
    var oPanel = getByClass('loginPanel')[0],
        oTitle = getByClass('login_logo_webqq', 'loginPanel')[0],
        oClose = getByClass('ui_boxyClose', 'loginPanel')[0];
    // 点击标题
    oTitle.onmousedown = fnDown;
    // 释放鼠标
    document.onmouseup = function () {
        document.onmousemove = null;
    }
    // 隐藏面板
    oClose.onclick = function () {
        oPanel.style.display = 'none';
    }
    // 状态相关
    var oState = document.getElementById('loginState'),
        oStateIcon = document.getElementById('loginStateShow'),
        oStateText = document.getElementById('login2qq_state_txt'),
        oStatePanel = document.getElementById('loginStatePanel'),
        lis = document.getElementsByTagName('li');
    // 显示状态栏
    oState.onclick = function (evt) {
        oStatePanel.style.display = 'block';
        evt.stopPropagation();
    }
    // 选择状态
    for(var i = 0, l = lis.length; i < l; i++) {
        lis[i].onmouseover = function () {
            this.style.backgroundColor = '#AAA';
        }
        lis[i].onmouseout = function () {
            this.style.backgroundColor = '#FFF';
        }
        lis[i].onclick = function (evt) {
            var liText = getByClass('stateSelect_text', this.id)[0].innerHTML;
            oStateText.innerHTML = liText === '我在线上' ? '在线' : liText;
            oStateIcon.className = 'login-state-show ' + this.id;
            oStatePanel.style.display = 'none';
            evt.stopPropagation();
        }
    }
    // 点击别处隐藏状态栏
    document.onclick = function () {
        oStatePanel.style.display = 'none';
    }
}

function fnDown(evt) {
    var oDrag = getByClass('loginPanel')[0],
        // 获取光标按下时与面板的距离
        disX = evt.clientX - oDrag.offsetLeft,
        disY = evt.clientY - oDrag.offsetTop;
    // 移动鼠标
    document.onmousemove = function (evt) {
        fnMove(evt, disX, disY);
    }
}

function fnMove(evt, posX, posY) {
    var oDrag = getByClass('loginPanel')[0],
        // 获取移动范围
        w = evt.clientX - posX,
        h = evt.clientY - posY,
        winW = document.documentElement.clientWidth,
        winH = document.documentElement.clientHeight,
        maxW = winW - oDrag.offsetWidth - 10,
        maxH = winH - oDrag.offsetHeight - 10;
    // 移动
    oDrag.style.left = (w < maxW ? w > 10 ? w : 10 : maxW) + 'px';
    oDrag.style.top = (h < maxH ? h > 10 ? h : 10 : maxH) + 'px';
}