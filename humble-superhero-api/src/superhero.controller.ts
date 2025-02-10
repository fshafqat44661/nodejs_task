import { Controller, Get, Post, Body, BadRequestException } from '@nestjs/common';
import { SuperheroService } from './superhero.service';

@Controller('superheroes')
export class SuperheroController {
  constructor(private readonly superheroService: SuperheroService) {}

  @Post()
  addSuperhero(
    @Body('name') name: string,
    @Body('superpower') superpower: string,
    @Body('humilityScore') humilityScore: number
  ) {
    if (!name || !superpower || humilityScore === undefined) {
      throw new BadRequestException('All fields are required.');
    }
    if (humilityScore < 1 || humilityScore > 10) {
      throw new BadRequestException('Humility score must be between 1 and 10.');
    }
    return this.superheroService.addSuperhero(name, superpower, humilityScore);
  }

  @Get()
  getSuperheroes() {
    return this.superheroService.getSuperheroes();
  }
}
