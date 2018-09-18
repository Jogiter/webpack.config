async function t() {
    let msg = await new Promise(resolve => {
        setTimeout(function() {
            resolve('hello');
        }, 1000);
    });
    alert(msg);
}

function main() {
    let [a, b, c] = [1, 2, 3];
    let msg = 'world';
    let total = a + b + c;
    document.write(`<h2>hello${msg}:${total}</h2>`);
    t();
}

main();
