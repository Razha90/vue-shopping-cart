<template>
    <div 
    class="product-container">
        <img :src="`https://server-vue-store.vercel.app${item.imageUrl}`" :alt="item.name" class="product-image">
        <div class="details-wrap">
            <h3>{{ item.name }}</h3>
            <p>Rp.{{ item.price }}</p>
        </div>
        <button class="remove-button" @click="$emit('remove', item.code)">Remove</button>
    </div>
</template>

<script setup lang="ts">
import type Product  from '../models/Product';
defineProps<{
  item: Product
}>()
</script>

<style scoped>
 .product-container {
    align-content: 'center';
    border-bottom: 1px solid #ddd;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    width: 100%;
  }
  .product-image {
    flex: 1;
    height: 100px;
    max-width: 100px;
  }

  .details-wrap {
    padding: 0 16px;
    flex: 3;
  }

  .remove-button {
    flex: 1;
    margin: auto;
  }
</style>