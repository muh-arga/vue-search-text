<template>
  <form :class="$style.search" @submit.prevent="$emit('submitForm')">
    <div class="control">
      <input
        type="text"
        name="url"
        id="url"
        :value="$props.url"
        placeholder="Youtube URL"
        :class="inputClasses"
        @input="changeHandler"
      />
      <button type="submit"><i class="fa fa-search" /></button>
    </div>
  </form>
</template>

<script>
export default {
  name: "FormInputUrl",
  props: {
    url: {
      type: String,
      required: true,
    },
    error: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    inputClasses() {
      return [this.$props.error ? "error" : ""];
    },
  },
  methods: {
    changeHandler(event) {
      const value = event.target.value;
      this.$emit("urlChange", value);
    },
  },
};
</script>

<style module>
.search {
  width: 50%;
  box-shadow: var(--shadow);
}
</style>