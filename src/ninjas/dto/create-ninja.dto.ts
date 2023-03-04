import { IsEnum, MinLength } from 'class-validator';

export class CreateNinjaDto {
  @MinLength(3)
  name: string;

  @IsEnum(['sword', 'nunchucks'], {
    message: 'Weapon must be sword or nunchucks',
  })
  weapon: 'sword' | 'nunchucks';
}
