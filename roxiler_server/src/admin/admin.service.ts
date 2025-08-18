import { Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { StoreService } from '../store/store.service';
import { RatingsService } from '../ratings/ratings.service';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { CreateStoreDTO } from '../store/dto/createStore.dto';
import { UserRole } from '../users/entities/User.entity';

@Injectable()
export class AdminService {
  constructor(
    private readonly userService: UserService,
    private readonly storeService: StoreService,
    private readonly ratingsService: RatingsService,
  ) {}

  async getDashboardStatistics() {
    const [totalUsers, totalStores, totalRatings] = await Promise.all([
      this.userService.getTotalCount(),
      this.storeService.getTotalCount(),
      this.ratingsService.getTotalCount(),
    ]);

    return {
      totalUsers,
      totalStores,
      totalRatings,
    };
  }

  async createUser(createUserDto: CreateUserDto) {
    return this.userService.CreateUser(createUserDto);
  }

  async createStore(createStoreDto: CreateStoreDTO) {
    return this.storeService.create(createStoreDto);
  }

  async createStoreOwner(userDto: CreateUserDto, storeDto: CreateStoreDTO) {
    // Create store owner user
    const storeOwnerData = {
      ...userDto,
      role: UserRole.S_OWNER,
    };
    
    const user = await this.userService.CreateUser(storeOwnerData);
    
    // Create store and associate with the user
    const store = await this.storeService.create(storeDto);
    
    // Update store to link with owner (this would need a method in store service)
    // For now, we'll return both objects
    return {
      user,
      store,
      message: 'Store owner and store created successfully'
    };
  }
}
