import {
  Controller,
  Post,
  Get,
  Body,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ListenerService } from './listener.service';
import { Listener } from './listener.types';
import { UrlInput } from './listener.input';
import { AuthGuard } from './listener.guard';

@Controller('listeners')
export class ListenerController {
  constructor(private readonly listenerService: ListenerService) {}

  @Post()
  @UseGuards(AuthGuard)
  addListener(@Body() body: { urls: UrlInput[] }): void {
    const { urls } = body;
    if (urls && urls.length > 0) {
      const urlsArray = urls.map((item) => item.url);
      this.listenerService.add(urlsArray);
    } else {
      throw new HttpException('Provide a URL', HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  async getListener(): Promise<Listener[]> {
    return await this.listenerService.getAll();
  }

  @Delete()
  @UseGuards(AuthGuard)
  deleteListener(@Body() body: { url: string }): void {
    if (body.url) {
      this.listenerService.delete(body.url);
    } else {
      throw new HttpException('URL not provided', HttpStatus.BAD_REQUEST);
    }
  }
}
