<template>
    <div>
        <div id="page-wrap" v-if="products">
            <div class="grid-wrap">
              <ProductItem 
              v-for="product in products"
              :key="product.code"
              :product="product"/>
            </div>
        </div>

        <NotFound v-else/>
    </div>
</template>

<script setup lang="ts">
import ProductItem from '@/components/ProductItem.vue';
import NotFound from '../errors/NotFound.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import type Product from '@/models/Product';

const products = ref<Product[]>([]);

onMounted(async () => {
  try {
    const response = await axios.get('https://server-vue-store.vercel.app/api/products');
    products.value = response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
});
</script>

<style scoped>
  .grid-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 16px;
  }


</style>