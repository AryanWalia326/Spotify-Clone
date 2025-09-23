const https = require('https');

console.log('🔍 MongoDB Atlas IP Whitelist Helper');
console.log('====================================\n');

console.log('❌ Error Detected: IP Address Not Whitelisted');
console.log('Your current IP needs to be added to MongoDB Atlas.\n');

console.log('🌐 Getting your current IP address...');

// Get current IP
https.get('https://api.ipify.org?format=json', (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        try {
            const ip = JSON.parse(data).ip;
            console.log(`✅ Your current IP address: ${ip}\n`);
            
            console.log('🛠️  How to Fix:');
            console.log('1. Go to https://cloud.mongodb.com/');
            console.log('2. Sign in to your MongoDB Atlas account');
            console.log('3. Click "Network Access" in the left sidebar');
            console.log('4. Click "Add IP Address" button');
            console.log('5. Choose one of these options:\n');
            
            console.log('   Option A: Add Current IP (Recommended)');
            console.log('   - Click "Add Current IP Address"');
            console.log(`   - Manually add: ${ip}/32`);
            console.log('   - This is more secure\n');
            
            console.log('   Option B: Allow All IPs (Development Only)');
            console.log('   - Click "Allow Access from Anywhere"');
            console.log('   - Adds: 0.0.0.0/0');
            console.log('   - ⚠️  Less secure, use only for development\n');
            
            console.log('6. Click "Confirm" and wait 1-2 minutes for changes to take effect');
            console.log('7. Run this test again: node test-connection.js\n');
            
            console.log('📱 Alternative: If IP keeps changing (dynamic IP)');
            console.log('   - Use 0.0.0.0/0 for development');
            console.log('   - Set up VPN with static IP for production');
            console.log('   - Use MongoDB Atlas with VPC peering for enterprise\n');
            
            console.log('🔗 Direct Link: https://cloud.mongodb.com/v2/YOUR_PROJECT_ID#/security/network/whitelist');
            
        } catch (error) {
            console.log('❌ Could not get IP address automatically');
            console.log('💡 You can find your IP by visiting: https://whatismyipaddress.com/');
        }
        
        console.log('\n✅ After whitelisting, test with: node test-connection.js');
    });
}).on('error', (error) => {
    console.log('❌ Could not get IP address automatically');
    console.log('💡 You can find your IP by visiting: https://whatismyipaddress.com/');
    console.log('\n📋 Manual Steps:');
    console.log('1. Visit https://whatismyipaddress.com/ to get your IP');
    console.log('2. Go to MongoDB Atlas → Network Access');
    console.log('3. Add your IP address to the whitelist');
    console.log('4. Wait 1-2 minutes and test again');
});

console.log('\n⏳ Please wait while we detect your IP...');