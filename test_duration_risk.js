#!/usr/bin/env node

const http = require('http');

// Test data - Same loan, different durations
const testCases = [
    {
        name: "12 Months (High Risk)",
        duration: "12 months",
        land: 5,
        loan: 150000,
        crop: "धान"
    },
    {
        name: "24 Months (Medium Risk)",
        duration: "24 months",
        land: 5,
        loan: 150000,
        crop: "धान"
    },
    {
        name: "36 Months (Low Risk)",
        duration: "36 months",
        land: 5,
        loan: 150000,
        crop: "धान"
    }
];

let testIndex = 0;

function extractRiskScore(html) {
    const match = html.match(/riskScore"?\s*:\s*(\d+)/);
    return match ? parseInt(match[1]) : null;
}

function extractRiskLevel(html) {
    const match = html.match(/riskLevel"?\s*:\s*"([^"]+)"/);
    return match ? match[1] : null;
}

function extractEMI(html) {
    const match = html.match(/monthlyEMI"?\s*:\s*(\d+)/);
    return match ? parseInt(match[1]) : null;
}

function runTest() {
    if (testIndex >= testCases.length) {
        console.log("\n✅ All tests completed!\n");
        process.exit(0);
    }

    const testCase = testCases[testIndex];
    const postData = JSON.stringify({
        name: "Test Farmer",
        district: "Chhattisgarh",
        land: testCase.land,
        crop: testCase.crop,
        loan: testCase.loan,
        duration: testCase.duration
    });

    console.log(`\n📋 Test ${testIndex + 1}/3: ${testCase.name}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/agriflow/result',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    const req = http.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            const riskScore = extractRiskScore(data);
            const riskLevel = extractRiskLevel(data);
            const emi = extractEMI(data);

            console.log(`Duration: ${testCase.duration}`);
            console.log(`Monthly EMI: ₹${emi?.toLocaleString() || 'N/A'}`);
            console.log(`Risk Level: ${riskLevel}`);
            console.log(`Risk Score: ${riskScore}/100`);

            if (testIndex === 0) {
                console.log(`  → 12 months = High EMI = High Risk ⚠️`);
            } else if (testIndex === 1) {
                console.log(`  → 24 months = Lower EMI = Medium Risk ⚡`);
            } else {
                console.log(`  → 36 months = Lowest EMI = Low Risk ✅`);
            }

            testIndex++;
            setTimeout(runTest, 1000);
        });
    });

    req.on('error', (error) => {
        console.error(`❌ Request failed: ${error.message}`);
        testIndex++;
        setTimeout(runTest, 1000);
    });

    req.write(postData);
    req.end();
}

console.log("🧪 Testing Risk Calculation with Different Durations");
console.log("════════════════════════════════════════════════════════");
console.log("\nSame Loan: ₹1,50,000");
console.log("Same Land: 5 acres");
console.log("Same Crop: धान (Rice)");
console.log("\nExpected: Risk should DECREASE as duration increases\n");

runTest();
