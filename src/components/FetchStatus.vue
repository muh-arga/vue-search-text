<template>
  <h3 :class="$style.message">{{ message }}</h3>
</template>

<script>
export default {
  name: "FetchInfo",
  props: {
    message: {
      type: String,
    },
  },
};
</script>

<style module>
.message {
  margin: 1.5rem 0;
  text-align: center;
}
</style>