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
];

function nav() {
    var title = document.querySelector('.title'),
        menu = document.querySelector('.menu'),
        lis = menu.querySelectorAll('li');
    // 添加图标
    addIcon(title, '分类')
    for(var i = 0, l = lis.length; i < l; i++) {
        addIcon(lis[i], icons[i].name);
        lis[i].i = i;
        lis[i].onmouseover = function () {
            move(this, 'over');
        }
        lis[i].onmouseout = function () {
            move(this, 'out');
        }
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

/**
 *
 * @param {Element} ele
 * @param {String} state
 */
function move(ele, state) {
    var i = ele.querySelector('i'),
        links = ele.querySelectorAll('a'),
        icon = icons[ele.i];
    if (state === 'over') {
        i.style.content = 'url(img/' + icon.name + '的' + icon.select + '.png)';
        ele.style.color = icon.color;
        ele.style.opacity = 1;
        ele.style.backgroundColor = '#FFFFFF';
        ele.style.fontWeight = 350;
        links.forEach(function (a) {
            a.style.color = icon.color;
            a.style.fontWeight = 350;
        });
    } else {
        i.style.content = 'url(img/' + icon.name + '.png)';
        ele.style.color = '#FFFFFF';
        ele.style.opacity = 0.55;
        ele.style.backgroundColor = '#000000';
        ele.style.fontWeight = 300;
        links.forEach(function (a) {
            a.style.color = '#FFFFFF';
            a.style.fontWeight = 300;
        });
    }
}