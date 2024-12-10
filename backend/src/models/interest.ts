import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const interestSchema = new Schema({
  user_id: String,
  interests: [{ type: String }],
});

const InterestModel = model('interest', interestSchema);

export default InterestModel;
