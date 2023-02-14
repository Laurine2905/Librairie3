<script setup>
import { reactive, onMounted } from "vue";

// -- la classe Chose
import Chose from "../Chose";
// -- le sous composants utilisés
import LivreItem from "./LivreItem.vue";

// -- la liste des choses --> dans le state
// --> donnée réactive = l'affichage sera actualisée
//      automatiquement à chque cght dans la liste
const listeC = reactive([]);
//url de l'api pour récupérer les livres
const url = "https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/31/livres";

// Afficher le contenu de la librairie
// ======> la fonction qui récupère les livres et les affiche
function getListeLivre() {
  let fetchOptions = { method: "GET" }; // On utilise GET pour récupéré les infos ici le titre de chaque livre

  fetch(url, fetchOptions)
    .then((response) => {
      console.log("testget");
      // -- réponse au sens du protocole HTTP
      return response.json(); // -- extraire les données au format JSON
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      dataJSON.forEach((v) =>
        listeC.push(new Chose(v.id, v.titre, v.qtestock, v.prix))
      );
    })
    // gestion des erreurs
    .catch((error) => console.log(error));
}
onMounted(() => {
  getListeLivre();
});

function handlerDelete(id) {
  console.log(id);
  const fetchOptions = {
    method: "DELETE",
  };
  fetch(url + "/" + id, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      getListeLivre();
    })
    .catch((error) => console.log(error));
}
</script>

<template>
  <h1>Liste des livres</h1>
  <ul id="liste"></ul>
  <ul>
    <li v-for="chose of listeC" :key="chose.id">
      {{ chose.pourAfficher() }}
      <button @click="handlerDelete(chose.id)">Supprimer</button>
    </li>
  </ul>
</template>

<style>
</style>