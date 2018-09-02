window.onload = nav;

var icons = [
    {'name':'女装内衣', 'select':'副本', 'color':'#ee3119'}, 
    {'name':'男装', 'select':'副本', 'color':'#19a3ed'}, 
    {'name':'鞋', 'select':'副本', 'color':'#203bdc'}, 
    {'name':'化妆品', 'select':'副本', 'color':'#ee3119'}, 
    {'name':'珠宝饰品', 'select':'副本', 'color':'#ed1ad2'}, 
    {'name':'数码手机', 'select':'副本', 'color':'#1296db'}, 
    {'name':'母婴玩具', 'select':'副本', 'color':'#ee3119'}, 
    {'name':'食品', 'select':'副本', 'color':'#f9b019'}, 
    {'name':'喵鲜生', 'select':'副本', 'color':'#f9b019'}, 
    {'name':'家用电器', 'select':'副本', 'color':'#19a3ed'}, 
    {'name':'家具建材', 'select':'副本', 'color':'#ee3119'}, 
    {'name':'汽车配件', 'select':'副本', 'color':'#19a3ed'}, 
    {'name':'家纺家饰', 'select':'副本', 'color':'#f9b019'}, 
    {'name':'医药保健', 'select':'副本', 'color':'#09f066'}, 
    {'name':'居家', 'select':'副本', 'color':'#ee3119'}, 
    {'name':'图书音像', 'select':'副本', 'color':'#09f066'}
],
    hotLinks = [];

function nav() {
    var title = document.querySelector('.title'),
        menu = document.querySelector('.menu'),
        lis = menu.querySelectorAll('li'),
        detail = document.querySelector('.details'),
        dl = detail.querySelector('dl'),
        links = dl.querySelectorAll('a');
    // 添加图标
    addIcon(title, '分类')
    for(var i = 0, l = lis.length; i < l; i++) {
        addIcon(lis[i], icons[i].name);
        lis[i].i = i;
        lis[i].onmouseover = function () {
            setMoveCSS(this, 'over');
            showDetails(this, 'over');
        }
        lis[i].onmouseout = function () {
            setMoveCSS(this, 'out');
            showDetails(this, 'out');
        }
    }
    // 设置热门类型商品
    for(var i = 0; i < 10; i++) {
        hotLinks.push(Math.floor(Math.random() * links.length));
    }
}

/**
 * @description 添加 icon 元素函数
 * @param {Element} ele - 添加 icon 的元素
 * @param {String} img - 图片名称
 */
function addIcon(ele, img) {
    var icon = document.createElement('i');
    icon.className = 'icon';
    icon.style.content = 'url(img/' + img + '.png)';
    if (ele.className === 'title') {
        icon.style.top = 0;
    }
    ele.insertAdjacentElement('afterbegin', icon);
}

function setMoveCSS(ele, state) {
    var i = ele.querySelector('i'),
        links = ele.querySelectorAll('a'),
        icon = icons[ele.i];
    i.style.content = 'url(img/' + (state === 'over' ? icon.name + '的' + icon.select : icon.name) + '.png)';
    ele.style.color = state === 'over' ? icon.color : '#FFFFFF';
    ele.style.opacity = state === 'over' ? 1 : 0.55;
    ele.style.backgroundColor = state === 'over' ? '#FFFFFF' : '#000000';
    ele.style.fontWeight = state === 'over' ? 350 : 300;
    links.forEach(function (a) {
        a.style.color = state === 'over' ? icon.color : '#FFFFFF';
        a.style.fontWeight = state === 'over' ? 350 : 300;
    });
}

function showDetails(ele, state) {
    var detail = document.querySelector('.details'),
        color = icons[ele.i].color,
        dl = detail.querySelector('dl'),
        links = dl.querySelectorAll('a');
    detail.style.visibility = state === 'over' ? 'visible' : 'hidden';
    detail.onmouseover = function () {
        setMoveCSS(ele, 'over');
        this.style.visibility = 'visible';
    }
    detail.onmouseout = function () {
        setMoveCSS(ele, 'out');
        this.style.visibility = 'hidden';
    }
    for(var i = 0, l = hotLinks.length; i < l; i++) {
        links[hotLinks[i]].style.color = color;
        links[hotLinks[i]].hotColor = color;
    }
    for(var i = 0, l = links.length; i < l; i++) {
        links[i].onmouseover = function () {
            this.style.color = color;
        }
        links[i].onmouseout = function () {
            this.style.color = this.hotColor ? this.hotColor : '#666666';
        }
    }
}