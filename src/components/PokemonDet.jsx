import React from "react";

function PokeDet({ data, loading }) {
  return (
    <>
      {!data ? (
        <div className="pokeDet">
          <p>Type in the pokemon name above and hit search.</p>
        </div>
      ) : loading ? (
        <h1 className="loading">loading...</h1>
      ) : (
        <div className="pokeDet">
          {window.scrollTo(0, 0)}
          <h1>{data.name}</h1>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
          />
          <p>
            ABILITIES:
            {data.abilities.map((p) => {
              return (
                <>
                  <p>{p.ability.name}</p>
                </>
              );
            })}
          </p>
          <p>TYPE: {data.types[0].type.name}</p>
          <p>WEIGHT: {data.weight}</p>
          <p>HEIGHT: {data.height}</p>
          <p>SPECIAL MOVE: {data.moves[0].move.name}</p>
        </div>
      )}
    </>
  );
}

export default PokeDet;
