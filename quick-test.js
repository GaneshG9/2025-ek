#!/usr/bin/env node

/**
 * QUICK LOCALHOST FUNCTIONALITY VERIFICATION
 */

const http = require('http');
const BASE_URL = 'http://localhost:9002';

function makeRequest(url) {
    return new Promise((resolve, reject) => {
        const req = http.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    headers: res.headers,
                    body: data
                });
            });
        });
        
        req.on('error', reject);
        req.setTimeout(5000, () => {
            req.destroy();
            reject(new Error('Timeout'));
        });
    });
}

async function quickTest() {
    console.log('🚀 QUICK LOCALHOST FUNCTIONALITY TEST');
    console.log('=====================================');
    
    const tests = [
        { path: '/', name: 'Homepage' },
        { path: '/admin/properties', name: 'Admin Properties' },
        { path: '/properties', name: 'Properties Page' },
        { path: '/real-estate', name: 'Real Estate' },
        { path: '/solar', name: 'Solar Services' }
    ];
    
    let passed = 0;
    let failed = 0;
    
    for (const test of tests) {
        try {
            console.log(`\n🧪 Testing: ${test.name}`);
            const response = await makeRequest(`${BASE_URL}${test.path}`);
            
            if (response.statusCode === 200) {
                console.log(`   ✅ PASS - Status: ${response.statusCode}`);
                passed++;
            } else {
                console.log(`   ❌ FAIL - Status: ${response.statusCode}`);
                failed++;
            }
        } catch (error) {
            console.log(`   ❌ FAIL - Error: ${error.message}`);
            failed++;
        }
    }
    
    console.log('\n📊 RESULTS:');
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    
    if (failed === 0) {
        console.log('\n🎉 ALL CORE TESTS PASSED!');
        console.log('🌐 Application is working correctly on localhost!');
        console.log('\n🔗 Access your application:');
        console.log(`   Main Site: ${BASE_URL}`);
        console.log(`   Admin Panel: ${BASE_URL}/admin/properties`);
    } else {
        console.log('\n⚠️ Some tests failed. Server may still be starting up.');
    }
}

quickTest();