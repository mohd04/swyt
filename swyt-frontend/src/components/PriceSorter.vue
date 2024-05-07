<!-- PriceSorter.vue -->
<template>
  <select @change="onSortChange" class="form-select block w-full mt-1">
    <option value="">Default</option>
    <option value="asc">Price: Low to High</option>
    <option value="desc">Price: High to Low</option>
  </select>
</template>

<script>
export default {
  methods: {
    onSortChange(event) {
      this.$emit('sort-selected', event.target.value);
    }
  }
}
</script>
