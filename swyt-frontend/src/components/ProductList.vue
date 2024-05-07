<!-- ProductList.vue -->
<template>
  <div class="container mx-auto px-4">
    <div class="flex justify-between items-center mb-8">
      <div class="flex gap-4">
        <category-filter @category-selected="updateCategory" />
        <price-sorter @sort-selected="updateSort" />
      </div>
      <router-link to="/create" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Create New Product
      </router-link>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="product in filteredProducts" :key="product.id" class="border p-4 shadow rounded">
        <img :src="product.image" alt="Product Image" class="w-full h-48 object-cover mb-2">
        <h3 class="text-lg font-semibold">{{ product.name }}</h3>
        <p class="text-sm text-gray-600">{{ product.description }}</p>
        <p class="text-gray-500">${{ product.price.toFixed(2) }}</p>
        <div class="text-gray-500 text-sm">Size: {{ product.size }}</div>
        <div class="text-gray-500 text-sm">Brand: {{ product.brand }}</div>
        <div class="text-gray-500 text-xs">Category: {{ product.categories.map(c => c.name).join(', ') }}</div>
      </div>
    </div>
  </div>
</template>

<style>
.border {
  border: 1px solid #e2e8f0; /* Light gray border */
}
.shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.rounded {
  border-radius: 0.5rem; /* 8px */
}
</style>

<script>
import axios from 'axios';
import CategoryFilter from './CategoryFilter.vue';
import PriceSorter from './PriceSorter.vue';

export default {
  components: {
    CategoryFilter,
    PriceSorter
  },
  data() {
    return {
      products: [],
      filterCategory: '',
      sortPrice: ''
    };
  },
  computed: {
    filteredProducts() {
      let result = this.products;
      if (this.filterCategory) {
        result = result.filter(p => p.category === this.filterCategory);
      }
      if (this.sortPrice) {
        result.sort((a, b) => this.sortPrice === 'asc' ? a.price - b.price : b.price - a.price);
      }
      return result;
    }
  },
  methods: {
    fetchProducts() {
      axios.get('http://localhost:3000/products?page=1&take=10')
        .then(response => {
          console.log('Products:', response.data.data);
          this.products = response.data.data;
        })
        .catch(error => console.error('Error fetching products:', error));
    },
    updateCategory(category) {
      this.filterCategory = category;
      this.fetchProducts();
    },
    updateSort(sort) {
      this.sortPrice = sort;
      this.fetchProducts();
    }
  },
  mounted() {
    this.fetchProducts();
  }
}
</script>
