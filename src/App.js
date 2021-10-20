import "./App.css";

import React, { useEffect, useState } from "react";

import { Card } from "antd";
import axios from "axios";

const App = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios
        .get("https://pokeapi.co/api/v2/pokemon/")
        .then((response) => response.data.results);
      const pokemonsData = await Promise.all(
        data.map(async (pokemon) => {
          const pokemonDetails = await axios.get(pokemon.url);
          const pokemonData = {
            name: pokemonDetails.data.name,
            img: pokemonDetails.data.sprites.other["official-artwork"]
              .front_default,
            stats: pokemonDetails.data.stats.map(({ stat }) => stat.name),
          };
          return pokemonData;
        })
      );

      setPokemons(pokemonsData);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="container">
        {pokemons.map((pokemon, index) => (
          <Card
            style={{ width: 300 }}
            cover={<img alt="example" src={pokemon.img} />}
          >
            <p>{pokemon.name}</p>
            <p>#{index + 1}</p>
            <ul>
              {pokemon.stats.map((stat) => (
                <li>{stat}</li>
              ))}{" "}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default App;
