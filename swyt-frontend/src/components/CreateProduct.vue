<!-- CreateProduct.vue -->
<template>
  <div>
    <h1>Create New Product</h1>
    <form @submit.prevent="submitProduct">
      <div>
        <label for="productName">Product Name:</label>
        <input id="productName" v-model="product.name" required>
      </div>
      <div>
        <label for="productDescription">Description:</label>
        <input id="productDescription" v-model="product.description" required>
      </div>
      <div>
        <label for="productPrice">Price:</label>
        <input type="number" id="productPrice" v-model.number="product.price" required>
      </div>
      <div>
        <label for="productCategory">Category:</label>
        <select v-model="product.categoryId">
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
      <div>
        <label for="productImage">Product Image:</label>
        <input type="file" id="productImage" @change="handleFileUpload" required>
      </div>
      <button type="submit">Create Product</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      categories: [],
      product: {
        name: '',
        description: '',
        price: null,
        categoryId: '',
      },
      selectedFile: null,
    };
  },
  methods: {
    fetchCategories() {
      axios.get('http://localhost:3000/products/categories?page=1&take=10')
        .then(response => {
          this.categories = response.data.data;
        })
        .catch(error => console.error('Error fetching categories:', error));
    },
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },
    submitProduct() {
      const productData = {
        name: this.product.name,
        description: this.product.description,
        price: this.product.price,
        categories: [{ id: this.product.categoryId }]
      };
      axios.post('http://localhost:3000/products', productData)
        .then(response => {
          const productId = response.data.id;
          this.uploadProductImage(productId);
        })
        .catch(error => console.error('Error creating product:', error));
    },
    uploadProductImage(productId) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);

      axios.post(`http://localhost:3000/products/${productId}/picture`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(() => {
        alert('Product created successfully!');
      })
      .catch(error => console.error('Error uploading image:', error));
    }
  },
  mounted() {
    this.fetchCategories();
  }
}
</script>
