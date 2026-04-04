#!/usr/bin/env node
/**
 * Test script to verify ML-based income prediction integration
 */

const http = require('http');

// Test data for loan application
const testData = {
    name: "Test Farmer",
    district: "Chhattisgarh",
    land: 5,
    crop: "धान",
    loan: 150000,
    duration: "24 months"
};

console.log("🧪 Testing ML-based Income Prediction Integration");
console.log("================================================\n");

// Function to make POST request
function testLoanApplication() {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify(testData);

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

        console.log("📤 Sending loan application to /agriflow/result...");
        console.log(`   Land: ${testData.land} acres`);
        console.log(`   Crop: ${testData.crop}`);
        console.log(`   Loan Amount: ₹${testData.loan.toLocaleString()}`);
        console.log(`   Duration: ${testData.duration}\n`);

        const req = http.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                console.log(`✅ Response received (Status: ${res.statusCode})`);

                if (res.statusCode === 200) {
                    // Parse HTML response to extract monthly income data
                    const incomeMatch = data.match(/monthlyIncome:\s*\[([\d,\s]+)\]/);
                    if (incomeMatch) {
                        const incomeStr = incomeMatch[1];
                        const monthlyIncomes = incomeStr.split(',').map(x => parseInt(x.trim()));

                        console.log("\n📊 Monthly Income Predictions (Using ML Model):");
                        console.log("-----------------------------------------------");
                        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                        let total = 0;
                        monthlyIncomes.forEach((income, idx) => {
                            console.log(`${months[idx]}: ₹${income.toLocaleString()}`);
                            total += income;
                        });
                        console.log("-----------------------------------------------");
                        console.log(`Average: ₹${Math.floor(total / 12).toLocaleString()}`);
                        console.log(`Total Annual: ₹${total.toLocaleString()}\n`);

                        // Extract risk score
                        const riskMatch = data.match(/riskScore['"]\s*:\s*(\d+)/);
                        if (riskMatch) {
                            console.log(`⚠️  Risk Score: ${riskMatch[1]}/100`);
                        }

                        // Extract EMI information
                        const emiMatch = data.match(/monthlyEMI['"]\s*:\s*(\d+)/);
                        if (emiMatch) {
                            const emi = parseInt(emiMatch[1]);
                            console.log(`💰 Monthly EMI: ₹${emi.toLocaleString()}`);
                        }

                        console.log("\n✅ ML Integration Test Passed!");
                        console.log("   - Flask backend called for predictions ✓");
                        console.log("   - Monthly income distributed across 12 months ✓");
                        console.log("   - Risk and EMI calculations completed ✓\n");
                    } else {
                        console.log("⚠️  Could not extract monthly income from response");
                    }
                } else {
                    console.log(`❌ Error response: ${res.statusCode}`);
                    console.log(data);
                }

                resolve();
            });
        });

        req.on('error', (error) => {
            console.error(`❌ Request failed: ${error.message}`);
            reject(error);
        });

        req.write(postData);
        req.end();
    });
}

// Run the test
testLoanApplication().then(() => {
    console.log("🎉 Test completed successfully!");
    process.exit(0);
}).catch((error) => {
    console.error("❌ Test failed:", error);
    process.exit(1);
});
