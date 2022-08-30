import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("eevee");
  const [data, setData] = useState([]);
  const [err, setErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function getPokemon() {
    setIsLoading(true);
    try {
      let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      let pokemonData = await res.json();
      setData(pokemonData);
    } catch (err) {
      setData(false);
      setErr(true);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getPokemon();
    console.log(data);
  }, []);
  console.log(name);
  function handleSubmit(e) {
    e.preventDefault();
    getPokemon();
  }
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-500 to-indigo-800">
      <div className="bg-white text-center rounded-3xl border shadow-lg p-10 max-w-xs">
        <from onSubmit={handleSubmit}>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className="p-3 border-solid border-2 border-indigo-600 rounded-md "
            placeholder="Search by Name"
          />
          <button
            type="submit"
            className="bg-indigo-600 px-2 mt-5 test-lg rounded text-gray-100"
          >
            Search
          </button>
        </from>
        {err ? (
          <p className="my-5">No Data was found!</p>
        ) : (
          <>
            {isLoading ? (
              <p className="my-5">Loading...</p>
            ) : (
              <>
                <img
                  className="my-5 w-50 h-50 rounded-xl shadow-lg mx-auto"
                  alt={`${data.name}`}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`}
                />
                <h1 className="text-lg text-gray-700">{data.name}</h1>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;

//  p-3 border-solid border-2 border-indigo-600 rounded-md
//bg-white text-center rounded-3xl border shadow-lg p-10 max-w-xs
