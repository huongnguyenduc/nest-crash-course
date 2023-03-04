import { BeltGuard } from './../belt/belt.guard';
import { NinjasService } from './ninjas.service';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

@Controller('ninjas')
export class NinjasController {
  constructor(private readonly ninjasService: NinjasService) {}
  // GET /ninjas--> []
  @Get()
  getNinjas(@Query('weapon') weapon: 'sword' | 'nunchucks') {
    return this.ninjasService.getNinjas(weapon);
  }

  // GET /ninjas/:id --> {...}
  @Get(':id')
  getNinja(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.ninjasService.getNinja(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  // POST /ninjas --> {...}
  @Post()
  @UseGuards(BeltGuard)
  createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
    return this.ninjasService.createNinja(createNinjaDto);
  }

  // PUT /ninjas/:id --> {...}
  @Put(':id')
  updateNinja(@Param('id') id: string, @Body() updateNinjaDto: CreateNinjaDto) {
    return this.ninjasService.updateNinja(+id, updateNinjaDto);
  }

  // DELETE /ninjas/:id --> {...}
  @Delete(':id')
  deleteNinja(@Param('id') id: string) {
    return this.ninjasService.deleteNinja(+id);
  }
}
