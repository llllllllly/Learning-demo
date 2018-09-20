$(function() {
    // 监听 window 滚动事件
    $(window).scroll(function (e) {
        var top = $(document).scrollTop();
        var menu = $('#menu');
        var items = $('#content').find('.item');
        var currentId = '';

        items.each(function () {
            var item = $(this);
            var itemTop = item.offset().top;
            if (top > itemTop - 200) {
                currentId = '#' + item.attr('id');
            } else {
                return false
            }
        });
        
        var currentItem = menu.find('.current');
        if (currentId && currentItem.attr('href') !== currentId) {
            currentItem.removeClass('current');
            menu.find('[href=' + currentId + ']').addClass('current');
        }
    });
});