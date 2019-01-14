import * as mongoose from 'mongoose';

export class MongooseConnector {
	constructor() {
		this.connect();
		this.setCallback();
	}

	connect() {
		if (process.env.NODE_ENV !== 'production') {
			mongoose.set('debug', true);
		}

		mongoose.connect(
			'mongodb://ciaolee87:Bitor!77@localhost:27017/admin',
			{dbName: 'nodejs'},
			err => {
				if (err) {
					console.log('Mongo DB Connection Error');
				} else {
					console.log('Mongo DB Connection Success');
				}
			});
	}

	setCallback() {

	}
}