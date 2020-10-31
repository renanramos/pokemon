import { Component, OnInit } from '@angular/core';
import { AppService } from './app-service.service';
import { map, share, tap } from 'rxjs/operators/';
import { from } from 'rxjs/internal/observable/from';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pokedex';

  results = [];
  pokemons = [];
  newPokemons = [];
  offsetDefault: number = 0;
  offsetIncrease: number = 20;
  img: any;

  constructor(private service: AppService) { }

  async ngOnInit() {
    await this.loadPokemons();
    await this.loadInvidualInfo();
  }

  async loadInvidualInfo() {
    const receivedPokemon = {
      next: (pokemon: any) => {
        let isPokemonInArray = this.pokemons.find(p => p['id'] === pokemon['id']);
         if (!isPokemonInArray) {
           this.pokemons.push({
             id: pokemon['id'],
             name: pokemon['name'],
             sprite: pokemon['sprites']['front_default']
           });
         }
      }
    };

    from(this.results)
      .pipe(map(item => {
        this.service.getIem(item)
          .pipe(tap(receivedPokemon))
          .toPromise()
          .then(() => true)
          .catch(() => false)
      })).subscribe();
  }

  async loadPokemons(offset?: number) {
    const resultsReceived = {
      next: (items: []) => {
        let results = items['results'];
        results.map(result => this.results.push(result['url']));
      }
    };

    await this.service.getContent(this.offsetDefault + offset, null)
    .pipe(tap(resultsReceived))
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }

  async onScroll() {
    this.offsetDefault += this.offsetIncrease
    await this.loadPokemons(this.offsetDefault);
    await this.loadInvidualInfo();
  }
}
