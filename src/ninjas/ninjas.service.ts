import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';

@Injectable()
export class NinjasService {
  private ninjas = [
    {
      id: 1,
      name: 'Ninja 1',
      weapon: 'sword',
    },
    {
      id: 2,
      name: 'Ninja 2',
      weapon: 'nunchucks',
    },
  ];

  getNinjas(weapon?: 'sword' | 'nunchucks') {
    if (weapon) {
      return this.ninjas.filter((ninja) => ninja.weapon === weapon);
    }

    return this.ninjas;
  }

  getNinja(id: number) {
    const ninja = this.ninjas.find((ninja) => ninja.id === id);
    if (!ninja) {
      throw new Error(`Ninja with id ${id} not found`);
    }

    return ninja;
  }

  createNinja(createNinjaDto: CreateNinjaDto) {
    const id = this.ninjas.length + 1;
    const ninja = {
      id,
      ...createNinjaDto,
    };
    this.ninjas.push(ninja);
    return ninja;
  }

  updateNinja(id: number, createNinjaDto: CreateNinjaDto) {
    const ninja = this.getNinja(id);
    const index = this.ninjas.indexOf(ninja);
    this.ninjas[index] = {
      ...ninja,
      ...createNinjaDto,
    };
    return this.ninjas[index];
  }

  deleteNinja(id: number) {
    const ninja = this.getNinja(id);
    const index = this.ninjas.indexOf(ninja);
    this.ninjas.splice(index, 1);
    return ninja;
  }
}
