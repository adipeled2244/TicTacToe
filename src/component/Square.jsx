import "./Square.css";
import PanoramaFishEyeSharpIcon from "@mui/icons-material/PanoramaFishEyeSharp";
import ClearIcon from "@mui/icons-material/Clear";
import React, { useEffect, useState } from "react";

const Square = ({ player, boardSign, place, handleClick ,playAgain }) => {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if(playAgain){
        setClicked(false) // reset the clicked that did before
    }
    }, [playAgain])

  const handlePress = () => {
    if (!clicked) {
      handleClick(player, place);
      setClicked(true);
    }
  };

  return (
    <div className="square" onClick={handlePress}>
      {boardSign == 1 && (
        <PanoramaFishEyeSharpIcon style={{ fontSize: "70px" }} />
      )}
      {boardSign == 2 && <ClearIcon style={{ fontSize: "70px" }} />}
    </div>
  );
};

export default Square;
