import { Injectable, ConflictException, NotFoundException, ForbiddenException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Ratings } from "./entities/Ratings.entity";
import { Repository } from "typeorm";
import { CreateRatingDto } from "./dto/createRating.dto";
import { UpdateRatingDto } from "./dto/updateRating.dto";

@Injectable()
export class RatingsService{
  constructor(@InjectRepository(Ratings) private readonly ratingsRepository: Repository<Ratings>) {
  }

  async createRating(createRatingDto: CreateRatingDto) {
    // Check if user has already rated this store
    const existingRating = await this.ratingsRepository.findOne({
      where: {
        user: { user_id: createRatingDto.user_id },
        store: { store_id: createRatingDto.store_id }
      }
    });

    if (existingRating) {
      throw new ConflictException('You have already rated this store. Use update instead.');
    }

    // Validate rating value
    if (createRatingDto.rating < 1 || createRatingDto.rating > 5) {
      throw new ConflictException('Rating must be between 1 and 5');
    }

    const rating = this.ratingsRepository.create({
      rating: createRatingDto.rating,
      user: { user_id: createRatingDto.user_id },
      store: { store_id: createRatingDto.store_id }
    });

    return await this.ratingsRepository.save(rating);
  }

  async getRatings() {
    return await this.ratingsRepository.find({
      relations: ['user', 'store'],
      select: {
        user: { user_id: true, name: true, email: true },
        store: { store_id: true, store_name: true }
      }
    });
  }

  async getRatingsByUserId(userId: number) {
    return await this.ratingsRepository.find({
      where: { user: { user_id: userId } },
      relations: ['store'],
      select: {
        store: { store_id: true, store_name: true, store_address: true }
      }
    });
  }

  async getRatingsByStoreId(storeId: number) {
    return await this.ratingsRepository.find({
      where: { store: { store_id: storeId } },
      relations: ['user'],
      select: {
        user: { user_id: true, name: true, email: true }
      }
    });
  }

  async updateRating(ratingId: number, updateData: { rating: number; user_id: number }) {
    const existingRating = await this.ratingsRepository.findOne({
      where: { rating_id: ratingId },
      relations: ['user']
    });

    if (!existingRating) {
      throw new NotFoundException('Rating not found');
    }

    // Check if the user owns this rating
    if (existingRating.user.user_id !== updateData.user_id) {
      throw new ForbiddenException('You can only update your own ratings');
    }

    // Validate rating value
    if (updateData.rating < 1 || updateData.rating > 5) {
      throw new ConflictException('Rating must be between 1 and 5');
    }

    await this.ratingsRepository.update(ratingId, { rating: updateData.rating });
    return { message: 'Rating updated successfully' };
  }

  async getTotalCount(): Promise<number> {
    return this.ratingsRepository.count();
  }

  async getUserRatingForStore(userId: number, storeId: number) {
    return await this.ratingsRepository.findOne({
      where: {
        user: { user_id: userId },
        store: { store_id: storeId }
      }
    });
  }
}