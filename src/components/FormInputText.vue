<template>
  <div :class="['control', $style['text-search']]">
    <input
      type="text"
      name="text"
      id="text"
      :value="$props.text"
      placeholder="Text"
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
  margin-bottom: 1rem;
}
</style>