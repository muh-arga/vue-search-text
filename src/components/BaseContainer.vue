<template>
  <div :class="$style.container">
    <slot />
  </div>
</template>

<script>
export default {
  name: "BaseContainer",
};
</script>


<style module>
.container {
  margin: 3rem auto;
  width: 90%;
  max-width: 768px;
}
</style>