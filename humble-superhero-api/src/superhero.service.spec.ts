import { SuperheroService } from './superhero.service';

describe('SuperheroService', () => {
  let service: SuperheroService;

  beforeEach(() => {
    service = new SuperheroService();
  });

  it('should add a superhero', () => {
    const hero = service.addSuperhero('Spider-Man', 'Web-slinging', 9);
    expect(hero).toEqual({ id: 1, name: 'Spider-Man', superpower: 'Web-slinging', humilityScore: 9 });
  });

  it('should return superheroes sorted by humility score', () => {
    service.addSuperhero('Hero1', 'Power1', 5);
    service.addSuperhero('Hero2', 'Power2', 8);
    service.addSuperhero('Hero3', 'Power3', 6);

    const sortedHeroes = service.getSuperheroes();
    expect(sortedHeroes[0].humilityScore).toBe(8);
    expect(sortedHeroes[2].humilityScore).toBe(5);
  });
});
