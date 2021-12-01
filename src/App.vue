<template>
<div id="app" class="container">
  <div class="row"  style="margin-top: 15px">
    <router-link class="three columns button button-primary" 
      to="/">Home</router-link>
  </div>
 <router-view />
  <div class="row">
    <button disabled="disabled" class="twelve columns button-primary">
      Copyright (c) 2021 - Esteban Espinoza Fallas & Marco Murillo Sanchez
    </button>
  </div>
</div>
</template>

<script>
export default {
  name: "App",
};
</script>
