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
// Promise 简单实现
// than() -> 将回调函数存放起来
var Promise = function () {
  EventEmitter.call(this);
};
util.inherits(Promise, EventEmitter);

Promise.prototype.then = function (
  fulfilledHandler,
  errorHandler,
  progressHandler
) {
  if (typeof fulfilledHandler === "function") {
    // 利用 once() 方法，保证成功回调只执行一次
    this.once("success", fulfilledHandler);
  }
  if (typeof errorHandler === "function") {
    // 利用 once() 方法，保证异常回调只执行一次
    this.once("error", errorHandler);
  }
  if (typeof progressHandler === "function") {
    this.on("process", progressHandler);
  }
  return this;
};

// Deferred 触发执行回调函数
var Deferred = function () {
  this.state = "unfulfilled";
  this.promise = new Promise();
};

Deferred.prototype.resolve = function (obj) {
  this.state = "fulfilled";
  this.promise.emit("success", obj);
};
Deferred.prototype.reject = function (err) {
  this.state = "failed";
  this.promise.emit("error", err);
};
Deferred.prototype.progress = function (data) {
  this.promise.emit("progress", data);
};

// 调用示例
readFile("foo.txt", "utf-8").then(
  function (data) {
    // Success case
  },
  function (err) {
    // Failed case
  }
);

// Promise 解决序列执行（链式）

/* 流程控制库 */
// 尾触发与next（中间件）
// Step
// wind

// async
// a. 异步的串行执行
const async = require("async");
async.series(
  [
    function (callback) {
      // callback 无需指定，由回调函数saync通过高阶函数的方式注入
      fs.readFile("file.txt", "utf8", callback);
    },
    function (callback) {
      fs.readFile("file2.txt", "utf8", callback);
    },
  ],
  function (err, results) {
    // 数组的方式
    // results => [file1.txt, file2.txt]
  }
);
// 等价代码 - a
fs.readFile("file1.txt", "utf8", function (err, content) {
  if (err) {
    return callback(err);
  }
  fs.readFile("file2.txt", "utf8", function (err, data) {
    if (err) {
      return callback(err);
    }
    callback(null, [content, data]);
  });
});
// b. 异步的并行执行
async.parallel(
  [
    function (callback) {
      fs.readFile("file1.txt", "utf8", callback);
    },
    function (callback) {
      fs.readFile("file2.txt", "utf8", callback);
    },
  ],
  function (err, results) {
    // results => [file1.txt, file2.txt]
  }
);
// 等价代码 - b
var counter = 2;
var results = [];
var done = function (index, value) {
  results[index] = value;
  counter--;
  if (counter === 0) {
    callback(null, results);
  }
};
var hasErr = false;
var fail = function (err) {
  if (!hasErr) {
    hasErr = true;
    callback(er);
  }
};
fs.readFile("file1.txt", "utf8", function (err, content) {
  if (err) {
    return fail(err);
  }
  done(0, content);
});
fs.readFile("file2.txt", "utf8", function (err, data) {
  if (err) {
    return fail(err);
  }
  done(1, data);
});
// c. 异步调用的依赖处理
async.waterfall(
  [
    function (callback) {
      fs.readFile("file1.txt", "utf8", function (err, content) {
        callback(err, content);
      });
    },
    function (arg1, callback) {
      // arg1 => file2.txt
      fs.readFile(arg1, "utf8", function (err, content) {
        callback(err, callback);
      });
    },
    function (arg1, callback) {
      // arg1 => file3.txt
      fs.readFile(arg1, "utf8", function (err, content) {
        callback(err, content);
      });
    },
  ],
  function (err, result) {
    // result => file4.txt
  }
);
// 等价代码 - c
fs.readFile("file1.txt", "utf8", function (err, data1) {
  if (err) {
    return callback(err);
  }
  fs.readFile(data1, "utf8", function (err, data2) {
    if (err) {
      return callback(err);
    }
    fs.readFile(data2, "utf8", function (err, data3) {
      if (err) {
        return callback(err);
      }
      callback(null, data3);
    });
  });
});
// d. 自动依赖处理
var deps = {
  readConfig: function (callback) {
    // read config file
    callback();
  },
  connectMongoDB: [
    "readConfig",
    function (callback) {
      // connect to mongodb
      callback();
    },
  ],
  connectRedis: [
    "readConfig",
    function (callback) {
      // connect to redis
      callback();
    },
  ],
  compileAsserts: function (callback) {
    // compile asserts
    callback();
  },
  uploadAsserts: [
    "compileAsserts",
    function (callback) {
      // upload to assert
      callback();
    },
  ],
  startUp: [
    "connectMongoDB",
    "connectRedis",
    "uploadAsserts",
    function (callback) {
      //start up
    },
  ],
};
async.auto(deps);
