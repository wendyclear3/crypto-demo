import {
  Body,
  Controller,
  Req,
  Post,
  UseGuards,
  Delete,
  Query,
} from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { WatchListDTO } from './dto';
import { JwtAuthGuard } from 'src/guards/jwt-guard';

@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createAsset(@Body() assetDto: WatchListDTO, @Req() request) {
    const user = request.user;
    return this.watchlistService.createAsset(user, assetDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteAsset(@Query('id') assetId: string, @Req() request): Promise<boolean> {
    const { id } = request.user;
    return this.watchlistService.deleteAsset(id, assetId);
  }
}
