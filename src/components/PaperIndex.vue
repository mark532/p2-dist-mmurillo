<!-- BookIndex.vue -->
<template>
  <div class="row">
    <div style="margin-top: 5%">
      <h2>{{ title }}</h2>
      <div class="row">
        <label for="">Categorias: </label>
        <select v-model="selection">
          <option v-for="cat in cats">{{ cat }}</option>
        </select>
        <button v-on:click="filterByCategory">Buscar</button>
        <router-link class="button button-primary" to="/paper/create"
          >New</router-link
        >
      </div>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Autor</th>
            <th>Paginas</th>
            <th>Categoria</th>
            <th>Copyright</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="paper in papers">
            <td>{{ paper.title }}</td>
            <td>{{ paper.author }}</td>
            <td>{{ paper.pages }}</td>
            <td>{{ paper.categoria }}</td>
            <td>{{ paper.copyright }}</td>
            <td>
              <router-link class="button" :to="'/paper/show/' + paper._id"
                >Ver</router-link
              >
              &nbsp;
              <router-link class="button" :to="'/paper/edit/' + paper._id"
                >Editar</router-link
              >
              &nbsp;
              <a class="button" v-on:click="deletePaper(paper._id)"
                >Eliminar
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Paper Index",
  data() {
    return {
      title: "Paper List",
      papers: [],
      cats: [],
      selection: "",
    };
  },
  mounted() {
    this.allPapers();
    fetch(this.url + "/.netlify/functions/paperDistinct", {
      headers: { Accept: "application/json" },
    })
      .then((response) => response.json())
      .then((items) => {
        this.cats = items;
        this.cats.push("Todas");
      });
  },
  methods: {
    allPapers() {
      fetch(this.url + "/.netlify/functions/paperFindAll", {
        headers: { Accept: "application/json" },
      })
        .then((response) => response.json())
        .then((items) => {
          this.papers = items;
        });
    },
    deletePaper(id) {
      fetch(this.url + "/.netlify/functions/paperDeleteBatch/" + id, {
        headers: { "Content-Type": "application/json" },
        method: "DELETE",
      }).then((items) => {
        this.allPapers();
      });
    },
    filterByCategory() {
      if (this.selection === "Todas") {
        this.allPapers();
      } else {
        fetch(this.url + "/.netlify/functions/paperByCat/" + this.selection, {
          headers: { Accept: "application/json" },
        })
          .then((response) => response.json())
          .then((items) => {
            this.papers = items;
          });
      }
    },
  },
};
</script>