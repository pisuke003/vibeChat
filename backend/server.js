const dotenv = require('dotenv');
const dbConnect = require('./config/dbconnect');
const server = require('./app');

dotenv.config({ path: './config.env' });

// Connect to MongoDB
dbConnect();

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
