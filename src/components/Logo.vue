<template>
  <div :class="$style.logo">
    <img src="../assets/logo.png" alt="Logo" />
  </div>
</template>

<script>
export default {
    name: "Logo"
}
</script>

<style module>
.logo {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}
.logo img {
  width: 100px;
  height: 100px;
}
</style>
