window.onload = function () {
    var speed = document.querySelector('#speed'),
        opacity = document.querySelector('#opacity'),
        buffer = document.getElementById('buffer'),
        mutli = document.getElementById('mutli'),
        lis = mutli.getElementsByTagName('li'),
        chain = document.getElementById('chain')
        meanwhile = document.getElementById('meanwhile');
    // 速度动画
    speed.onmouseover = function () {
        animation(this, {'width': 500});
    }
    speed.onmouseout = function () {
        animation(this, {'width': 200});
    }
    // 透明动画
    opacity.onmouseover = function () {
        animation(this, {'opacity': 1});
    }
    opacity.onmouseout = function () {
        animation(this, {'opacity': 0.3});
    }
    // 缓冲动画
    buffer.onmouseover = function () {
        animation(this, {'width': 500, 'speed': 20, 'isBuffer': true});
    }
    buffer.onmouseout = function () {
        animation(this, {'width': 200, 'speed': 20, 'isBuffer': true});
    }
    // 多物动画
    for(var i = 0, l = lis.length; i < l; i++) {
        lis[i].onmouseover = function () {
            if (this.id === 'mutli-speed') {
                animation(this, {'borderRadius': 0});
            } else if (this.id === 'mutli-opacity') {
                animation(this, {'opacity': 0.3});
            } else {
                animation(this, {'borderRadius': 0, 'speed': 20, 'isBuffer': true});
            }
        }
        lis[i].onmouseout = function () {
            if (this.id === 'mutli-speed') {
                animation(this, {'borderRadius': 25});
            } else if (this.id === 'mutli-opacity') {
                animation(this, {'opacity': 1});
            } else {
                animation(this, {'borderRadius': 25, 'speed': 20, 'isBuffer': true});
            }
        }
    }
    // 链式动画
    chain.onmouseover = function() {
        var that = this;
        animation(that, {'borderRadius': 0}, function () {
            animation(that, {'opacity': 1}, function () {
                animation(that, {'width': 500, 'speed': 20, 'isBuffer': true});
            });
        });
    }
    chain.onmouseout = function() {
        var that = this;
        animation(that, {'width': 200, 'speed': 20, 'isBuffer': true}, function () {
            animation(that, {'opacity': 0.3}, function () {
                animation(that, {'borderRadius': 50});
            })
        });
    }
    // 同时动画
    meanwhile.onmouseover = function () {
        animation(this, {'width': 500, 'height': 200, 'speed': 20, 'isBuffer': true});
    }
    meanwhile.onmouseout = function () {
        animation(this, {'width': 200, 'height': 100, 'speed': 20, 'isBuffer': true});
    }
}

function animation(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;
        for (var attr in json) {
            var icur = 0,
                iTarget = json[attr],
                computedSpeed = json['speed'];
            flag = true;
            if (attr === 'opacity') {
                icur = Math.round(parseFloat(getComputedStyle(obj)[attr]) * 100);
                iTarget *= 100;
            } else {
                icur = parseInt(getComputedStyle(obj)[attr]);
            }
            if (json['isBuffer'] !== true) {
                computedSpeed = computedSpeed !== undefined ? computedSpeed : iTarget - icur > 0 ? 5 : -5;
            } else if (json['isBuffer'] === true) {
                computedSpeed = (iTarget - icur) / json['speed'];
                computedSpeed = computedSpeed > 0 ? Math.ceil(computedSpeed) : Math.floor(computedSpeed);
            }
            if (iTarget !== icur) {
                flag = false;
                if (attr === 'opacity') {
                    obj.style[attr] = (icur + computedSpeed) / 100;
                    obj.style.filter = 'alpha(' + attr + '=' + (icur + computedSpeed) + ')';
                } else {
                    obj.style[attr] = icur + computedSpeed + 'px';
                }
            } else {
                if (isFunction(fn)) {
                    fn();
                }
            }
        }
        if (flag && !isFunction(fn)) {
            console.log('1');
            clearInterval(obj.timer);
        }
    },15);
}

function isFunction(fn) {
    return Object.prototype.toString.call(fn).slice(8, -1) === 'Function';

}

/*
function moveAnimation(obj, attr, iTarget) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var a = parseInt(getComputedStyle(obj)[attr]),
            speed = iTarget - a > 0 ?  5 : -5;
        if (iTarget === a) {
            clearInterval(obj.timer);
        } else {
            obj.style[attr] = a + speed + 'px';
        }
    },30);
}

function opacityAnimation1(obj, attr, iTarget) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var a = parseFloat(getComputedStyle(obj)[attr]),
            speed = iTarget - a > 0 ?  0.1 : -0.1;
        if (iTarget === a) {
            clearInterval(obj.timer);
        } else {
            obj.style[attr] = a + speed;
        }
    },30);
}

function bufferAnimation2(obj, attr, iTarget) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var a = parseInt(getComputedStyle(obj)[attr]),
            speed = (iTarget - a)/20;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        if (iTarget !== a) {
            obj.style[attr] = a + speed + 'px';
        } else {
            obj.style[attr] = iTarget + 'px';
            clearInterval(obj.timer);
        }
    },30);
}

function animation(obj, attr, iTarget, fn, speed, isBuffer) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var icur = 0,
            computedSpeed = speed;
        if (attr === 'opacity') {
            icur = Math.round(parseFloat(getComputedStyle(obj)[attr]) * 100);
            iTarget *= 100;
        } else {
            icur = parseInt(getComputedStyle(obj)[attr]);
        }
        if (isBuffer !== true) {
            computedSpeed = computedSpeed !== undefined ? computedSpeed : iTarget - icur > 0 ? 5 : -5;
        } else if (isBuffer === true) {
            computedSpeed = (iTarget - icur) / speed;
            computedSpeed = computedSpeed > 0 ? Math.ceil(computedSpeed) : Math.floor(computedSpeed);
        }
        if (iTarget !== icur) {
            if (attr === 'opacity') {
                obj.style[attr] = (icur + computedSpeed) / 100;
                obj.style.filter = 'alpha(' + attr + '=' + (icur + computedSpeed) + ')';
                iTarget /= 100;
            } else {
                obj.style[attr] = icur + computedSpeed + 'px';
            }
        } else {
            clearInterval(obj.timer);
            if (isFunction(fn)) {
                fn();
            }
        }
    },15);
}
*/