setTimeout(() => {
    console.log('I execute first.');
    setTimeout(() => {
        console.log('I execute next.');
        setTimeout(() => {
            console.log('I ececute last.');
        }, 100);
    }, 500);
}, 1000);

// 回调嵌套