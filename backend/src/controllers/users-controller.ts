import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import InterestModel from '@/models/interest';
import RecommendationModel from '@/models/recommendation';

export const getUserRecommendations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id } = req.params;
    const result = await RecommendationModel.findOne({
      user_id,
    });
    const interest = await InterestModel.findOne({ user_id });
    if (result && interest) {
      return res.status(200).json({
        user_id,
        recommendations: result.recommendations,
        interests: interest.interests,
      });
    } else {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: `No recommendations found for user_id ${user_id}.`,
        interests: interest?.interests || [],
      });
    }
  } catch (error) {
    next(error);
  }
};
