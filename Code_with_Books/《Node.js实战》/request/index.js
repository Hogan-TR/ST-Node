const request = require('request');

// request('http://www.baidu.com', (err, rep, body) => {
//     if (!err && rep.statusCode == 200) {
//         console.log(body);
//     }
// });

// 流
// const fs = require('fs');
// request('https://www.baidu.com/img/baidu_resultlogo@2.png').pipe(fs.createWriteStream('test.png'));
// 反向 put / post (文件)请求
// fs.createReadStream('file.json').pipe(request.put('http://mysite.com/obj.json'));
// 给 pipe 自己
// request.get('http://google.com/img.png').pipe(request.put('http://mysite.com/img.png'));

// 表单
// request.post('http://service.com/upload', { form: { key: 'value' } });
// request.post('http://service.com/upload').form({key:'value'});

// 文件上传
// var r = request.post('http://service.com/upload');
// var form = r.form();
// form.append('my_field', 'my_value');
// form.append('my_buffer', new Buffer([1, 2, 3]));
// form.append('my_file', fs.createReadStream(path.join(__dirname, 'doodle.png')));
// form.append('remote_file', request('http://google.com/doodle.png'));

// HTTP认证
// request.get('http://some.server.com/').auth('username', 'password', false);
// // 或
// request.get('http://some.server.com/', {
//     auth: {
//         user: 'username',
//         pass: 'password',
//         'sendImmediately': false // 收到 401 会重试
//     }
// });

// 定制 HTTP header
// var options = {
//     url: 'https://api.github.com/repositories/1283503',
//     headers: {
//         'User-Agent': 'Awesome-Octocat-App'
//     },
//     proxy: 'http://localhost:1081'
// }
// function callback(err, rep, body) {
//     if (!err && rep.statusCode == 200) {
//         var info = JSON.parse(body);
//         console.log(info.stargazers_count + " Stars");
//         console.log(info.forks_count + " Forks");
//     } else {
//         console.log(body);
//     }
// }
// request(options, callback);

// cookies
// var request = request.defaults({ jar: true }); // jar -> true
// request('http://www.google.com', () => {
//     request('http://images.google.com');
// });
// 通过创建request.jar()的新实例，可以使用定制的cookie，而不是request全局的cookie jar
// var j = request.jar();
// var request = request.defaults({ jar: j });
// request('http://www.google.com', () => {
//     request('http://imgaes.google.com');
// })
// 或
// var j = request.jar()
// var cookie = request.cookie('your_cookie_here')
// j.setCookie(cookie, uri, function (err, cookie) { })
// request({ url: 'http://www.google.com', jar: j }, function () {
//     request('http://images.google.com')
// })

// TODO
// OAuth 登陆
// Twitter OAuth
// var qs = require('querystring')
//     , oauth =
//     {
//         callback: 'http://mysite.com/callback/'
//         , consumer_key: CONSUMER_KEY
//         , consumer_secret: CONSUMER_SECRET
//     }
//     , url = 'https://api.twitter.com/oauth/request_token'
//     ;
// request.post({ url: url, oauth: oauth }, function (e, r, body) {
//     // Ideally, you would take the body in the response
//     // and construct a URL that a user clicks on (like a sign in button).
//     // The verifier is only available in the response after a user has
//     // verified with twitter that they are authorizing your app.
//     var access_token = qs.parse(body)
//         , oauth =
//         {
//             consumer_key: CONSUMER_KEY
//             , consumer_secret: CONSUMER_SECRET
//             , token: access_token.oauth_token
//             , verifier: access_token.oauth_verifier
//         }
//         , url = 'https://api.twitter.com/oauth/access_token'
//         ;
//     request.post({ url: url, oauth: oauth }, function (e, r, body) {
//         var perm_token = qs.parse(body)
//             , oauth =
//             {
//                 consumer_key: CONSUMER_KEY
//                 , consumer_secret: CONSUMER_SECRET
//                 , token: perm_token.oauth_token
//                 , token_secret: perm_token.oauth_token_secret
//             }
//             , url = 'https://api.twitter.com/1/users/show.json?'
//             , params =
//             {
//                 screen_name: perm_token.screen_name
//                 , user_id: perm_token.user_id
//             }
//             ;
//         url += qs.stringify(params)
//         request.get({ url: url, oauth: oauth, json: true }, function (e, r, user) {
//             console.log(user)
//         })
//     })
// })
