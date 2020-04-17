// 常规异步并发 -> 自己维护一个计数器
// var count = 0, 每个异步任务执行完, count++
// 直到count达到总任务数, 开始另一个函数继续操作

// 若不用eventproxy以及计数器
// 串行
$.get("http://data1_source", function (data1) {
    $.get("http://data2_source", function (data2) {
        $.get("http://data3_source", function (data3) {
            var html = fuck(data1, data2, data3);
            render(html);
        });
    });
});

// 程序计数器
// 数据之间不相互依赖
(function () {
    var count = 0;
    var result = {};

    $.get('http://data1_source', function (data) {
        result.data1 = data;
        count++;
        handle();
    });
    $.get('http://data2_source', function (data) {
        result.data2 = data;
        count++;
        handle();
    });
    $.get('http://data3_source', function (data) {
        result.data3 = data;
        count++;
        handle();
    });

    function handle() {
        if (count === 3) {
            var html = fuck(result.data1, result.data2, result.data3);
            render(html);
        }
    }
})();

// 利用 eventproxy
var ep = new eventproxy();
// 监听三个事件
ep.all('data1_event', 'data2_event', 'data3_event', function (data1, data2, data3) {
    var html = fuck(data1, data2, data3);
    render(html);
});
// 发布
$.get('http://data1_source', function (data) {
    ep.emit('data1_event', data);
});

$.get('http://data2_source', function (data) {
    ep.emit('data2_event', data);
});

$.get('http://data3_source', function (data) {
    ep.emit('data3_event', data);
});