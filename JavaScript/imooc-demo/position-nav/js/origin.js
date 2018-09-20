window.onload = positionNav;

function removeClass(ele, cls) {
    ele.className = ele.className.replace(cls, "");
}
function addClass(ele, cls) {
    ele.className += ` ${cls}`;
}

function positionNav() {
    window.onscroll = function () {
        var top = document.documentElement ? document.documentElement.scrollTop : document.body.scrollTop;
        var menus = document.querySelector("#menu").querySelectorAll("a");
        var items = document.querySelectorAll(".item");
        var currentId = "";

        items.forEach(element => {
            var itemTop = element.offsetTop;
            if (top > itemTop - 200) {
                currentId = `#${element.id}`;
            } else {
                return false;
            }
        });

        var currentItem = document.querySelector(".current");
        if (currentId && currentItem.getAttribute("href") !== currentId) {
            removeClass(currentItem, "current");
            menus.forEach(menu => {
                if (menu.getAttribute("href") === currentId) {
                    addClass(menu, "current");
                }
            });
        }
    }
}