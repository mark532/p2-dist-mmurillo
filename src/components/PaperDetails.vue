<!-- BookDetails.vue -->
<template>
  <div class="row">
    <div class="eleven column" style="margin-top: 5%">
      <h2>{{ title }}</h2>
      <form>
        <div class="row">
          <div class="six columns">
            <label for="titleInput">Title</label>
            <input class="u-full-width" type="text" v-model="paper.title" />
          </div>
          <div class="six columns">
            <label for="authorInput">Author</label>
            <input class="u-full-width" type="text" v-model="paper.author" />
          </div>
        </div>
        <div class="row">
          <div class="six columns">
            <label for="editionInput">Pages</label>
            <input class="u-full-width" type="text" v-model="paper.pages" />
          </div>
          <div class="six columns">
            <label for="copyrightInput">Copyright</label>
            <input
              class="u-full-width"
              type="number"
              v-model="paper.copyright"
            />
          </div>
        </div>
        <div class="row">
          <div class="six columns">
            <label for="languageInput">Language</label>
            <input class="u-full-width" type="text" v-model="paper.language" />
          </div>
          <div class="six columns">
            <label for="languageInput">URL</label>
            <input class="u-full-width" type="text" v-model="paper.url" />
          </div>
        </div>
        <div class="row">
          <router-link class="button button-primary" to="/book"
            >Back</router-link
          >
          <a
            v-if="edit"
            class="button button-primary"
            style="float: right"
            v-on:click="updateBook(paper._id)"
            >Update</a
          >
          <a
            v-if="create"
            class="button button-primary"
            style="float: right"
            v-on:click="createBook()"
            >Create</a
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";

export default {
  name: "Detalle Acticulos cientificos",
  props: ["show", "edit", "create"],
  data() {
    return {
      title: "Datos del Articulo",
      paper: {},
    };
  },
  mounted() {
    const route = useRoute();
    console.log(route.params.id);
    if (route.params.id != null || route.params.id != undefined)
      this.findPaper(route.params.id);
    else {
      this.paper = {
        _id: Math.floor(Math.random() * 100000000),
        title: "",
        author: "",
        copyright: 0,
        language: "",
        pages: 0,
        author: "",
        url: "",
      };
    }
  },
  methods: {
    findPaper: function (id) {
      fetch(this.url + "/.netlify/functions/paperFind/" + id, {
        headers: { Accept: "application/json" },
      })
        .then((response) => response.json())
        .then((items) => {
          console.log("initial i" + items[0]);
          this.paper = items[0];
        });
    },
    updatePaper: function (id) {
      fetch(this.url + "/.netlify/functions/paperUpdate/" + id, {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify(this.paper),
      }).then((data) => {
        this.$router.push("/paper");
      });
    },
    createPaper: function () {
      fetch(this.url + "/.netlify/functions/paperInsert", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(this.paper),
      }).then((data) => {
        this.$router.push("/paper");
      });
    },
  },
};
</script>