import { Injectable } from '@nestjs/common';
import { Superhero } from './superhero.interface';

@Injectable()
export class SuperheroService {
  private superheroes: Superhero[] = [];

  addSuperhero(name: string, superpower: string, humilityScore: number): Superhero {
    const newHero: Superhero = {
      id: this.superheroes.length + 1,
      name,
      superpower,
      humilityScore,
    };
    this.superheroes.push(newHero);
    return newHero;
  }

  getSuperheroes(): Superhero[] {
    return this.superheroes.sort((a, b) => b.humilityScore - a.humilityScore);
  }
}
