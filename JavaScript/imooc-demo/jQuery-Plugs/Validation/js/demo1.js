$(function () {
    $.validator.setDefaults({
        debug: true
    });
    $.extend($.validator.messages, {
        email: '请输入有效的电子邮件地址'
    });
    let validator = $('#loginform').validate({
        rules: {
            username: {
                required: true,
                // rangelength: [2, 16]
                email: true
            },
            password: {
                required: true,
                rangelength: [6, 16]
            },
            'confirm_password': {
                required: true,
                equalTo: '#password'
            },
            postcode: {
                postcode: "中国"
            }
        },
        messages: {
            username: {
                required: '必须输入用户名',
                // rangelength: '用户名2-16位字符'
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
        ignore: ':hidden'
    });
    $.validator.addMethod('postcode', function (value, element, params) {
        let postcode = /^\d{6}$/;
        return this.optional(element) || (postcode.test(value));
    }, '请填写正确的{0}邮政编码');
    $('#loginform').on('invalid-form', function (event, validator) {
        console.error(`有${validator.numberOfInvalids()}条信息没填写`);
    });
    $('.submit').on('click', function () {
        console.log(validator.valid() ? '填写正确!' : '填写错误!');
    });
});