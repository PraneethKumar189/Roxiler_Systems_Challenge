import { Injectable, NotFoundException } from "@nestjs/common";
import { Store } from "./entities/Store.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Like } from "typeorm";
import { CreateStoreDTO } from "./dto/createStore.dto";

@Injectable()
export class StoreService {

       constructor(@InjectRepository(Store) private storeRepository: Repository<Store>) { }


       async create(createStoreDto: CreateStoreDTO): Promise<Store> {
              const store = this.storeRepository.create(createStoreDto);
              return await this.storeRepository.save(store);
       }

       async findAll(): Promise<Store[]> {
              return await this.storeRepository.find({
                     relations: ['ratings', 'owner']
              });
       }

       async findOne(id: number): Promise<Store | null> {
              return await this.storeRepository.findOne({
                     where: { store_id: id },
                     relations: ['ratings', 'owner']
              });
       }

       async findAllWithFilters(filters: {
              name?: string;
              address?: string;
       }) {
              const where: any = {};

              if (filters.name) {
                     where.store_name = Like(`%${filters.name}%`);
              }
              if (filters.address) {
                     where.store_address = Like(`%${filters.address}%`);
              }

              return this.storeRepository.find({
                     where,
                     relations: ['ratings'],
                     select: ['store_id', 'store_name', 'store_address', 'store_email']
              });
       }

       async findOneWithRatings(id: number) {
              const store = await this.storeRepository.findOne({
                     where: { store_id: id },
                     relations: ['ratings', 'ratings.user']
              });

              if (!store) {
                     throw new NotFoundException('Store not found');
              }

              // Calculate average rating
              const avgRating = store.ratings.length > 0
                     ? store.ratings.reduce((sum, rating) => sum + rating.rating, 0) / store.ratings.length
                     : 0;

              return {
                     ...store,
                     averageRating: Math.round(avgRating * 10) / 10
              };
       }

       async findByOwnerId(ownerId: number) {
              return this.storeRepository.findOne({
                     where: { owner: { user_id: ownerId } },
                     relations: ['ratings', 'ratings.user']
              });
       }

       async getStoreRatings(storeId: number) {
              const store = await this.findOne(storeId);
              if (!store) {
                     throw new NotFoundException('Store not found');
              }

              return this.storeRepository.findOne({
                     where: { store_id: storeId },
                     relations: ['ratings', 'ratings.user'],
                     select: {
                            ratings: {
                                   rating_id: true,
                                   rating: true,
                                   created_at: true,
                                   user: {
                                          user_id: true,
                                          name: true,
                                          email: true
                                   }
                            }
                     }
              });
       }

       async getTotalCount(): Promise<number> {
              return this.storeRepository.count();
       }
}