import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Ratings } from "./entities/Ratings.entity";
import { Repository } from "typeorm";

@Injectable()
export class RatingsService{
  constructor(@InjectRepository(Ratings) private readonly ratingsRepository: Repository<Ratings>) {
  }

  async createRatingByStoreId(rating: Ratings) {
    return await this.ratingsRepository.save(rating);
  }

  async getRatings() {
    return await this.ratingsRepository.find();
  }

  async getRatingsByUserId(userId: number) {
    return await this.ratingsRepository.find({ where: { user: { user_id: userId } } });
  }

  async getRatingsByStoreId(storeId: number) {
    return await this.ratingsRepository.find({ where: { store: { store_id: storeId } } });
  }

  async updateRatingByStoreId(rating: Ratings) {
    return await this.ratingsRepository.update(rating.rating_id, rating);
  }

}