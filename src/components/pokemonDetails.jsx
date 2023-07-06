import React from "react";

function Pokemon({pokemon, loading, information}) {
  return (
    <>
      {loading ? (
        <h1 className="loading">loading...</h1>
      ) : (
        pokemon.map((item) => {
          return (
            <div className="pokemonDetails" key={item.id} onClick={()=>information(item)}>
              <p>Name: {item.name}</p>
              <img src={item.sprites.front_default} alt="" />
              <p>Weight: {item.weight}</p>
              <p>Height: {item.height}</p>
              <p class="card-type">type: {item.types[0].type.name}</p>
            </div>
          );
        })
      )}
    </>
  );
}

export default Pokemon;
