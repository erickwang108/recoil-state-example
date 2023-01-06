import { atom, atomFamily, selector, selectorFamily } from "recoil";

const LIMIT = 5;


const getKey = id => `pokemon_list_${id}`;

async function getData(url) {
  const response = await fetch(url);
  return response.json();
}

export const pokemonListPageAtom = atomFamily({
  key: "pokemonListPageAtom",
  default: id => {
    const data = localStorage.getItem(getKey(id));
    if (data) {
      const serialData = JSON.parse(data);
      return serialData[id]?.page || 0;
    }
    return 0;
  },
  effects: id => [
    ({ onSet }) => {
      onSet(page => {
        if (typeof page !== 'undefined') {
          localStorage.setItem(getKey(id), JSON.stringify({ [id]: { page } }));
        }
      })
    },
  ],
});

export const fetchPokemonListSelector = selectorFamily({
  key: "fetchPokemonListSelector",
  get: id => async ({ get }) => {
    try {
      const offset = get(pokemonListPageAtom(id)) * LIMIT;
      const url = `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`;
      const { count, results } = await getData(url);
      const totalPage = Math.ceil(count / LIMIT);
      return { count, totalPage, results };
    } catch (error) {
      // do something
    }
    return null;
  },
  set: id => ({ get, set }, type) => {
    const pageState = pokemonListPageAtom(id);
    const page = get(pageState);
    const nextPage = type === 'prev' ? page - 1 : page + 1;
    set(pageState, nextPage > 0 ? nextPage : 0);
  }
});

export const pokemonDetailUrlAtom = atom({
  key: "pokemonDetailUrlAtom",
  default: '',
});

export const pokemonDetailUrlSelector = selector({
  key: 'pokemonDetailUrlSelector',
  get: ({ get }) => {
    return get(pokemonDetailUrlAtom);
  },
  set: ({ set }, newUrl = '') => {
    set(pokemonDetailUrlAtom, newUrl);
  }
});

export const pokemonDetailSelector = selector({
  key: 'pokemonDetailSelector',
  get: async ({ get }) => {
    try {
      const url = get(pokemonDetailUrlAtom);
      if (url) {
        const pokemon = await getData(url);
        return {
          id: pokemon.id,
          name: pokemon.name,
          height: pokemon.height,
          weight: pokemon.weight,
          baseExperience: pokemon.base_experience,
          images: [
            pokemon?.sprites.back_default,
            pokemon?.sprites.back_shiny,
            pokemon?.sprites.back_shiny,
            pokemon?.sprites.front_default
          ]
        };
      }
    } catch (error) {
      // do something
    }
    return null;
  },
});
