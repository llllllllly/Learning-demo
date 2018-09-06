$(function () {
    $.validator.setDefaults({
        debug: true
    });
    let validator = $('#loginform').validate({
        rules: {
            username: {
                required: true,
                rangelength: [2, 16]
            },
            password: {
                required: true,
                rangelength: [6, 16]
            },
            'confirm_password': {
                required: true,
                equalTo: '#password'
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
            },
            'confirm_password': {
                required: '请确认密码',
                equalTo: '密码不一致'
            }
        },
        submitHandler: function (form) {
            console.log($(form).serialize());
        },
        ignore: ':hidden',
        groups: {
            login: 'username password confirm_password'
        },
        errorPlacement: function (error, element) {
            $(error).insertBefore('#info');
        }
    });
    $('#loginform').on('invalid-form', function (event, validator) {
        console.error(`有${validator.numberOfInvalids()}条信息没填写`);
    });
    $('.submit').on('click', function () {
        console.log(validator.valid() ? '填写正确!' : '填写错误!');
    });
});