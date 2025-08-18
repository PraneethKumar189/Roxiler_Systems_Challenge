import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Roles } from '../auth/decoraters/roles.decorator';
import { UserRole } from '../users/entities/User.entity';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { CreateStoreDTO } from '../store/dto/createStore.dto';

@Controller('admin')
@UseGuards(RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard')
  getDashboardStats() {
    return this.adminService.getDashboardStatistics();
  }

  @Post('users')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.adminService.createUser(createUserDto);
  }

  @Post('stores')
  createStore(@Body() createStoreDto: CreateStoreDTO) {
    return this.adminService.createStore(createStoreDto);
  }

  @Post('store-owners')
  createStoreOwner(@Body() createStoreOwnerDto: { user: CreateUserDto; store: CreateStoreDTO }) {
    return this.adminService.createStoreOwner(createStoreOwnerDto.user, createStoreOwnerDto.store);
  }
}
