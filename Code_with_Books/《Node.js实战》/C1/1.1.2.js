function User() {
    // 构造器
}

User.prototype.method = function () {
    // 方法
}

// ES6
class User {
    constructor() { }
    method() { }
}

class User {
    constructor(id) {
        this.id = id;
    }
    load() {
        const query = 'SELECT * FROM users WHERE id = ?';
        sql.query(query, this.id, (err, users) => {
            this.name = users[0].name;
        });
    }
}