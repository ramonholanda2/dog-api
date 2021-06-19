import React, { useState } from "react";

import { useDogContextProvider } from "../../contexts/DogContext";
import styles from "./Main.module.scss";

const Main = () => {
  const {
    imageDog,
    getAllDogs,
    getRandomImage,
    breedList,
    allDogs,
    allBreeds,
    setBreed,
    breed,
  } = useDogContextProvider();
  const [transitionAllDogs, setTransitionAllDogs] = useState(false);
  const [transitionDog, setTransitionDog] = useState(true);

  function newDog() {
    setTransitionDog(false);
    setTimeout(() => setTransitionDog(true), 1000);
    breed ? breedList() : getRandomImage();
  }

  function updateDogs() {
    setTransitionAllDogs(true);
    setTimeout(() => {
      setTransitionAllDogs(false);
    }, 1000);
    getAllDogs();
  }

  return (
    <div className={styles.main}>
      <div className={styles.search}>
        <select
          onChange={(e) => setBreed(e.target.value)}
          name="select"
          defaultValue={"DEFAULT"}
        >
          <option value="">Escolha uma raça</option>
          {Object.keys(allBreeds).map((breed, index) => (
            <option key={index} value={breed}>
              {breed}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.dog}>
        <img
          className={transitionDog ? styles.newDog : styles.nextDog}
          src={imageDog}
          alt="dog"
        />
        <button onClick={() => newDog()}>
          {breed ? `Gere um dog da raça ${breed}` : "Gere um dog"}
        </button>
      </div>

      <div className={styles.allDogs}>
        <div className={styles.dogsImages}>
          {allDogs.map((dog, index) => (
            <div
              key={index}
              className={`${styles.img} ${
                transitionAllDogs &&
                (index + 1 <= 5 ? styles.upUpdate : styles.backUpdate)
              }`}
            >
              <img src={dog} alt={dog} />
            </div>
          ))}
        </div>
        <button onClick={() => updateDogs()}>Gere outros 10 dogs</button>
      </div>
    </div>
  );
};

export default Main;
