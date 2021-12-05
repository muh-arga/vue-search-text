<template>
  <div :class="['control', $style['text-search']]">
    <input
      type="text"
      name="text"
      id="text"
      :value="$props.text"
      placeholder="Search text"
      :class="inputClasses"
      @input="textChangeHandler"
    />
  </div>
</template>

<script>
export default {
  name: "FormInputText",
  props: {
    error: {
      type: Boolean,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  computed: {
    inputClasses() {
      return [this.$props.error ? "error" : ""];
    },
  },
  methods: {
    textChangeHandler(event) {
      const value = event.target.value;
      this.$emit("textChange", value);
    },
  },
};
</script>

<style module>
.text-search {
  width: 50%;
  box-shadow: var(--shadow);
}
</style>