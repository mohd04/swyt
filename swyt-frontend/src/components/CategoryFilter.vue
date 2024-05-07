<!-- CategoryFilter.vue -->
<template>
  <select @change="onCategoryChange" class="form-select block w-full mt-1">
    <option value="">All Categories</option>
    <option value="Brand">Brand</option>
    <!-- Add more categories as needed -->
  </select>
</template>

<script>
export default {
  methods: {
    onCategoryChange(event) {
      this.$emit('category-selected', event.target.value);
    }
  }
}
</script>
