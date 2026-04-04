// Quick test for 12, 24, 36 months
const http = require('http');

const tests = [
    { dur: "12 months", label: "12M" },
    { dur: "24 months", label: "24M" },
    { dur: "36 months", label: "36M" }
];

let idx = 0;

function test() {
    if (idx >= tests.length) {
        console.log("✅ Done");
        process.exit(0);
    }

    const t = tests[idx];
    const body = JSON.stringify({
        name: "T", district: "CG", land: 5,
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
            const risk = html.match(/riskScore['"]\s*:\s*(\d+)/);
            const level = html.match(/riskLevel['"]\s*:\s*"([^"]+)"/);
            const emi = html.match(/monthlyEMI['"]\s*:\s*(\d+)/);

            console.log(`${t.label}: EMI ${emi ? emi[1] : '?'}, Risk ${risk ? risk[1] : '?'}/100, ${level ? level[1] : '?'}`);
            idx++;
            setTimeout(test, 800);
        });
    }).end(body);
}

test();
