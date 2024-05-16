import { connect } from 'mongoose';

const connectToDatabase = async () => {
	try {
		await connect(process.env.MONGO_URI as string);
		console.log('Successfully connected to the database');
	} catch (err) {
		console.error('Error connecting to the database:', err);
		process.exit(1);
	}
};

export default connectToDatabase
