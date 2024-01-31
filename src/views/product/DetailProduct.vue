<template>
    <div>
      <NotFound v-if="!product"/>
        <div id="page-wrap" v-else>
          <h4 v-show="notif.value" class="notif" :class="{ 'green': notif.msg === 'Item Added Sucessfully', 'reds': notif.msg === 'Item Already Added' }">{{ notif.msg }}</h4>
            <div id="img-wrap">
                <img :src="`http://localhost:3000${product.imageUrl}`" :alt="product.name">
            </div>
            <div id="product-details">
                <h1>{{ product.name }}</h1>
                <h3 id="price">Rp.{{ product.price }}</h3>
                <p>Average Rating: {{ product.averageRating }}</p>
                <button id="add-to-cart" @click="addToCart(product.code)">Add to Cart</button>
                <p>{{ product.description }}</p>
            </div>
        </div>

    </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import { useRoute } from 'vue-router';
  import NotFound from '../errors/NotFound.vue';
  import type Product from '../../models/Product';
  import axios from 'axios';

  const route = useRoute();
  const productId = ref<string | string[] | null>(null);
  const notif = ref<{ value: boolean; msg: string }>({
    value: false,
    msg: '',
  });


  const product = ref<Product | undefined>({
    code: '',
    name: '',
    price: '',
    description: '',
    imageUrl: '',
    averageRating: ''
  });

  const addToCart = async (code: string) => {
    await axios.post('http://localhost:3000/api/orders/user/1/add', {
      product: code
    }).then((datas) => {
      if (datas.data.modifiedCount > 0) {
        notif.value.msg = 'Item Added Sucessfully'
        notif.value.value = true
        setTimeout(() => {
          notif.value.value = false
        }, 3000)
      } else {
        notif.value.msg = 'Item Already Added'
        notif.value.value = true
        setTimeout(() => {
          notif.value.value = false
        }, 3000)
      }
    });
  };

  onMounted(async () => {
  try {
    productId.value = route.params.id;
    const response = await axios.get(`http://localhost:3000/api/products/${productId.value}`);
    product.value = response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
});

  // Opsional: bersihkan saat komponen di-unmount
  onBeforeUnmount(() => {
    productId.value = null;
  });
</script>


<style scoped>
  #page-wrap {
    margin-top: 16px;
    padding: 16px;
    max-width: 600px;
  }

  #img-wrap {
    text-align: center;
  }

  img {
    width: 400px;
  }

  #product-details {
    padding: 16px;
    position: relative;
  }

  #add-to-cart {
    width: 100%;
  }

  #price {
    position: absolute;
    top: 24px;
    right: 16px;
  }

  .notif {
    text-align: center;
    color: white;
    padding: 3%;
    border-radius: 8px;
  }

  .green {
    background-color: #41B883;
  }

  .reds {
    background-color: tomato;
  }

</style>