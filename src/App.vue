<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/HeaderNavbar.vue'
</script>


<template>
  <Navbar />
  <RouterView />
</template>

<style>
* {
    box-sizing: border-box;
    font-family: Arial;
  }

  #page-wrap {
    margin: auto;
    max-width: 800px;
    min-height: 100vh;
  }

  button {
    background-color: #41B883;
    border: none;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    outline: 0;
    padding: 16px;
  }

</style>

<!-- <template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template> -->
