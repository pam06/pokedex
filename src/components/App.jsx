import React, { useEffect, useState } from "react";
import Pokemon from "./pokemonDetails";
import Axios from "axios";
import PokemonDet from "./PokemonDet";

function App() {
  const [pokemonName, changeInputState] = useState("");
  const [pokemon, setPokemon] = useState([]);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0");
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState();

  const mainData = async () => {
    Axios.get(url).then((res) => {
      setLoading(true);
      setNextUrl(res.data.next);
      setPrevUrl(res.data.previous);
      mainPageData(res.data.results);
      setLoading(false);
    });
  };

  const mainPageData = async (res) => {
    res.map(async (item) => {
      const result = await Axios.get(item.url);
      setPokemon((state) => {
        state = [...state, result.data];
        return state;
      });
    });
  };

  useEffect(() => {
    mainData();
  }, [url]);

  const search = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
      (res) => {
        <PokemonDet data={res.data} />;
        setInfo(res.data);
      }
    ).catch((err) => {
      alert("Type in the correct name");
      console.log(err);
    })
  };

  return (
    <div className="App">
      <div className="Head">
        <h1>Pokedex</h1>
        <div className="inputDiv">
          <input
            type="text"
            onChange={(e) => {
              changeInputState(e.target.value);
            }}
            placeholder="Type your favorite pokemon..."
          />
          <button onClick={search}>Search</button>
        </div>
      </div>
      <div id="outputDiv" className="outputDiv">
        <div>
          <PokemonDet data={info} loading={loading} />
        </div>
        <div className="AppDetails">
          <Pokemon
            pokemon={pokemon}
            loading={loading}
            information={(pok) => {
              setInfo(pok);
            }}
          />
        </div>
        <div className="buttons">
          {prevUrl && (
            <button
              onClick={() => {
                setPokemon([]);
                setUrl(prevUrl);
              }}
            >
              Prev
            </button>
          )}
          {nextUrl && (
            <button
              onClick={() => {
                setPokemon([]);
                setUrl(nextUrl);
              }}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
