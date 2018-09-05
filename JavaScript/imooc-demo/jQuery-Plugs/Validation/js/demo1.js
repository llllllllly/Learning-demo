$(function () {
    $('#loginform').validate({
        rules: {
            username: {
                required: true,
                rangelength: [2, 16]
            },
            password: {
                required: true,
                rangelength: [6, 16]
            }
        },
        messages: {
            username: {
                required: '必须输入用户名',
                rangelength: '用户名2-16位字符'
            },
            password: {
                required: '必须输入密码',
                rangelength: '密码长度为6-16位'
            }
        }
    });
});