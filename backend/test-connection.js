require('dotenv').config();
const mongoose = require('mongoose');

async function testConnection() {
    try {
        console.log('🔄 Testing MongoDB connection...');
        console.log('Connection string:', process.env.MONGODB_URI ? 'Found' : 'Not found');
        
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log('✅ MongoDB connection successful!');
        console.log('📊 Connected to database:', mongoose.connection.name);
        console.log('🌐 Host:', mongoose.connection.host);
        
        await mongoose.connection.close();
        console.log('🔒 Connection closed');
        
    } catch (error) {
        console.error('❌ MongoDB connection failed:');
        console.error('Error:', error.message);
        
        if (error.message.includes('authentication failed')) {
            console.log('\n💡 Tips:');
            console.log('- Check your username and password in the connection string');
            console.log('- Make sure your MongoDB Atlas user has the correct permissions');
        }
        
        if (error.message.includes('no reachable servers')) {
            console.log('\n💡 Tips:');
            console.log('- Check your network connection');
            console.log('- Verify your IP is whitelisted in MongoDB Atlas');
            console.log('- Make sure the cluster is running');
        }
    }
}

testConnection();