<template>
    <div>
        <div id="page-wrap">
            <h1>Shopping Cart</h1>
            <CartItem 
            v-for="item in products"
            :key="item.code"
            :item="item"
            v-on:remove="removeItemCart($event)"
            />
            <h3 id="total-price">
                Total: Rp.{{ totalPrice }}
            </h3>
            <button id="checkout-button">
                Checkout
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import CartItem from '@/components/CartItem.vue';
import { onMounted, ref, watchEffect } from 'vue';
import type Product  from '@/models/Product';

const totalPrice= ref<Number>(0);
const products = ref<Product[]>([])

async function takeData() {
  const response = await axios.get(`http://localhost:3000/api/orders/user/1`);
  products.value = response.data[0].products;
  totalPrice.value = products.value.reduce((total, item) => total + Number(item.price), 0)
}

async function removeItemCart(code: string) {
  try {
    await axios.delete(`http://localhost:3000/api/orders/user/1/product/${code}`).then((e) => {
      console.log(e);
    });
    takeData()
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

onMounted(async () => {
  try {
    takeData()
  } catch (error) {
    console.error('Error fetching products:', error);
  }
});

</script>

<style scoped>
  h1 {
    border-bottom: 1px solid #41B883;
    margin: 0;
    margin-top: 16px;
    padding: 16px;
  }
  #total-price {
    padding: 16px;
    text-align: right;
  }
  #checkout-button {
    width: 100%;
  }
</style>