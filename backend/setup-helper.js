#!/usr/bin/env node

console.log('🔧 MongoDB Setup Helper');
console.log('=======================\n');

console.log('❌ Authentication Error Detected!');
console.log('The MongoDB connection string needs your actual credentials.\n');

console.log('📋 Steps to Fix:');
console.log('1. Go to MongoDB Atlas (https://cloud.mongodb.com/)');
console.log('2. Sign in to your account');
console.log('3. Go to your cluster → Connect → Drivers');
console.log('4. Copy the connection string\n');

console.log('🔑 Your current connection string has placeholders:');
console.log('mongodb+srv://<db_username>:<db_password>@musicplayerclone.xs1mbx5.mongodb.net/...\n');

console.log('✅ It should look like this (with your actual credentials):');

console.log('📝 To fix this:');
console.log('1. Open: backend\\.env');
console.log('2. Find the MONGODB_URI line');
console.log('3. Replace <db_username> with your MongoDB username');
console.log('4. Replace <db_password> with your MongoDB password\n');

console.log('🚨 Important Notes:');
console.log('• Make sure your MongoDB user has read/write permissions');
console.log('• Check that your IP address is whitelisted (0.0.0.0/0 for any IP)');
console.log('• The password should NOT contain special characters like @, :, /, etc.');
console.log('• If your password has special chars, use URL encoding\n');

console.log('🧪 After updating, test with:');
console.log('   node test-connection.js\n');

console.log('❓ Need help creating a MongoDB user?');
console.log('1. Go to Database Access in MongoDB Atlas');
console.log('2. Click "Add New Database User"');
console.log('3. Choose "Password" authentication');
console.log('4. Set username and password (no special characters)');
console.log('5. Grant "Read and write to any database" permission');
console.log('6. Click "Add User"\n');

// Check if we can read the current .env file
const fs = require('fs');
const path = require('path');

try {
    const envPath = path.join(__dirname, '.env');
    const envContent = fs.readFileSync(envPath, 'utf8');
    
    if (envContent.includes('<db_username>') || envContent.includes('<db_password>')) {
        console.log('🔍 Current .env file status: ❌ Contains placeholders');
        console.log('👆 Update the MONGODB_URI in .env file with your actual credentials');
    } else {
        console.log('🔍 Current .env file status: ✅ Appears to have credentials');
        console.log('💡 If you\'re still getting auth errors, double-check:');
        console.log('   • Username and password are correct');
        console.log('   • User has proper database permissions');
        console.log('   • IP address is whitelisted');
    }
} catch (error) {
    console.log('🔍 Could not read .env file');
}

console.log('\n📚 For detailed setup instructions, see: MONGODB_SETUP.md');