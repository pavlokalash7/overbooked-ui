import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const recommendationSchema = new Schema({
  user_id: String,
  recommendations: [{ type: String }],
});

const RecommendationModel = model('Recommendation', recommendationSchema);

export default RecommendationModel;
