/* 4.3.1 <事件发布/订阅模式> */
// 订阅
emitter.on("event1", function (msg) {
  console.log(msg);
});
// 发布
emitter.emit("event1", "I am message!");
// 去除侦听器限制
// but 过多将可能导致 -> 内存泄露 / CPU过多占用
emitter.setMaxListeners(0);

// HTTP请求
const http = require("http");
var options = {
  host: "www.baidu.com",
  port: 80,
  path: "/",
  method: "GET",
};
var req = http.request(options, function (res) {
  console.log("STATUS: " + res.statusCode);
  console.log("HEADERS: " + JSON.stringify(res.headers));
  res.setEncoding("utf8");
  res.on("data", function (chunk) {
    console.log("BODY: " + chunk);
  });
  res.on("end", function () {
    // TODO
  });
});
req.on("error", function (e) {
  console.log("problem with request: " + e.message);
});
req.write("data\n");
req.write("data\n");
req.end();

// 继承 EventEmitter 类
var events = require("events");
function Stream() {
  events.EventEmitter.call(this);
}
util.inherits(Stream, events.EventEmitter); // 继承

// once() 解决 “雪崩” 节省重复开销
// 事件队列
var proxy = new events.EventEmitter();
var status = "ready";
var select = function (callback) {
  proxy.once("selected", callback);
  if (status === "ready") {
    status = "pending";
    db.select("SQL", function (results) {
      proxy.emit("selected", results);
      status = "ready";
    });
  }
};

/* 4.3.2 <Promise/Deferred模式> */
