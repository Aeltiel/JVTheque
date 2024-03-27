import { useGame } from "./GameContext/GameContext";
import FiltreBtn from "./FiltreBtn";
import FamilyFilterBtn from "../Component/FamilyFilterBtn";
import AllNintendoHardwares from "../Component/Nintendo/AllNintendoHardwares";

function Filtres() {
  const { resetFilter } = useGame();

  return (
    <div className="my-6">
      <p className="text-base">Tu veux trier tes jeux en fonction de : </p>
      <div className="w-full flex flex-wrap justify-between my-3.5">
        <FiltreBtn name={"Jeux obtenus"} obtentionType={"Jeu obtenu"} />
        <FiltreBtn name={"Whishlist"} obtentionType={"Wishlist"} />
        <div>
          <FamilyFilterBtn
            name={"Nintendo"}
            children={<AllNintendoHardwares />}
          />
        </div>
        <button
          onClick={() => {
            resetFilter();
          }}
        >
          <i className="fa-solid fa-circle-xmark"></i>
        </button>
      </div>
    </div>
  );
}

export default Filtres;
