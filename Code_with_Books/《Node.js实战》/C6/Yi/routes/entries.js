const Entry = require('../models/entry')

exports.form = (req, res) => {
    res.render('post', { title: 'Post' });
};

exports.submit = (req, res, next) => {
    const data = req.body.entry; // 来自表单中名为"entry[...]"的控件
    const user = res.locals.user; // 加载用户数据的中间件
    const username = user ? user.name : null;
    const entry = new Entry({
        username: username,
        title: data.title,
        body: data.body
    });
    entry.save((err) => {
        if (err) return next(err);
        res.redirect('/');
    })
}

exports.list = (req, res, next) => {
    Entry.getRange(0, -1, (err, entries) => {
        if (err) return next(err);
        res.render('entries', {
            title: 'Entries',
            entries: entries,
        })
    })
}