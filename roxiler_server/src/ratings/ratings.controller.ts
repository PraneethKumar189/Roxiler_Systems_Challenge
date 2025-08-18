import { Controller, Get, Post, Body, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/createRating.dto';
import { UpdateRatingDto } from './dto/updateRating.dto';
import { Roles } from '../auth/decoraters/roles.decorator';
import { UserRole } from '../users/entities/User.entity';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('ratings')
@UseGuards(RolesGuard)
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post()
  @Roles(UserRole.USER)
  create(@Body() createRatingDto: CreateRatingDto, @Request() req) {
    return this.ratingsService.createRating({
      ...createRatingDto,
      user_id: req.user.userId
    });
  }

  @Get()
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.ratingsService.getRatings();
  }

  @Get('my-ratings')
  @Roles(UserRole.USER)
  getMyRatings(@Request() req) {
    return this.ratingsService.getRatingsByUserId(req.user.userId);
  }

  @Get('store/:storeId')
  getRatingsByStore(@Param('storeId') storeId: string) {
    return this.ratingsService.getRatingsByStoreId(+storeId);
  }

  @Patch(':id')
  @Roles(UserRole.USER)
  update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto, @Request() req) {
    return this.ratingsService.updateRating(+id, {
      ...updateRatingDto,
      user_id: req.user.userId
    });
  }
}