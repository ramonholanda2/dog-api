import React, { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

export const DogContext = createContext();

export const DogContextProvider = ({ children }) => {
  const [imageDog, setImageDog] = useState("");
  const [allDogs, setAllDogs] = useState([]);
  const [allBreeds, setAllBreeds] = useState([]);
  const [breed, setBreed] = useState("");

  async function getRandomImage() {
    await axios
      .get("https://dog.ceo/api/breeds/image/random")
      .then((data) => {
        setImageDog(data.data.message);
      })
      .catch((error) => {
        console.log("erro", error);
      });
  }

  async function getAllDogs() {
    const { data } = await axios.get(
      "https://dog.ceo/api/breed/hound/images/random/10"
    );
    setAllDogs(data.message);
  }

  async function searchDog() {
    const { data } = await axios.get("https://dog.ceo/api/breeds/list/all");
    setAllBreeds(data.message);
  }

  async function breedList() {
    console.log(breed);
    const { data } = await axios.get(
      `https://dog.ceo/api/breed/${breed}/images/random`
    );
    setImageDog(data.message);
  }

  useEffect(() => {
    getRandomImage();
    getAllDogs();
    searchDog();
  }, []);

  return (
    <DogContext.Provider
      value={{
        imageDog,
        allDogs,
        allBreeds,
        breed,
        breedList,
        setBreed,
        getRandomImage,
        getAllDogs,
      }}
    >
      {children}
    </DogContext.Provider>
  );
};

export const useDogContextProvider = () => {
  return useContext(DogContext);
};
