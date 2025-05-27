import { useEffect, useState } from "react";
import { getChampionnats } from "../services/api";
import ChampionnatCard from "../components/ChampionnatCard";


export default function HomePage() {
  const [list, setList] = useState([]);

  useEffect(() => {
    getChampionnats().then(setList);
  }, []);

  return (
    <div>
      <h2>Championnat(s)</h2>
      {list.map(c => (
        <ChampionnatCard key={c._id} championnat={c} onClick={() => alert("Voir détails du championnat")} />
      ))}
    </div>
  );
}
