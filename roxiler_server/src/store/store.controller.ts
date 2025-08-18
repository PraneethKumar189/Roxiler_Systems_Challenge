import { Controller, Get, Post, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDTO } from './dto/createStore.dto';
import { Roles } from '../auth/decoraters/roles.decorator';
import { UserRole } from '../users/entities/User.entity';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('stores')
@UseGuards(RolesGuard)
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() createStoreDto: CreateStoreDTO) {
    return this.storeService.create(createStoreDto);
  }

  @Get()
  findAll(
    @Query('name') name?: string,
    @Query('address') address?: string,
  ) {
    return this.storeService.findAllWithFilters({ name, address });
  }

  @Get('my-store')
  @Roles(UserRole.S_OWNER)
  getMyStore(@Request() req) {
    return this.storeService.findByOwnerId(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeService.findOneWithRatings(+id);
  }

  @Get(':id/ratings')
  getStoreRatings(@Param('id') id: string) {
    return this.storeService.getStoreRatings(+id);
  }
}