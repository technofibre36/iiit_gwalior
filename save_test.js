const http = require('http');
const fs = require('fs');

const tests = [
    { dur: "12 months", file: "12m.html" },
    { dur: "24 months", file: "24m.html" },
    { dur: "36 months", file: "36m.html" }
];

let idx = 0;

function test() {
    if (idx >= tests.length) {
        console.log("✅ Saved HTML files");
        process.exit(0);
    }

    const t = tests[idx];
    const body = JSON.stringify({
        name: "Test", district: "CG", land: 5,
        crop: "धान", loan: 150000, duration: t.dur
    });

    const opts = {
        hostname: 'localhost', port: 3000, path: '/agriflow/result',
        method: 'POST', headers: {
            'Content-Type': 'application/json',
            'Content-Length': body.length
        }
    };

    http.request(opts, (res) => {
        let html = '';
        res.on('data', c => html += c);
        res.on('end', () => {
            fs.writeFileSync(t.file, html);
            console.log(`✓ ${t.dur}: Risk extracted`);
            idx++;
            setTimeout(test, 800);
        });
    }).end(body);
}

test();
