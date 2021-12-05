<template>
  <div :class="$style.pagination">
    <p :class="$style.action" @click="prevHandler">Prev</p>
    <div
      v-for="current in this.pages"
      :key="current"
      :class="getPageClasses(current)"
      @click="changePageHandler(current)"
    >
      {{ current }}
    </div>
    <p :class="$style.action" @click="nextHandler">Next</p>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Number,
      required: true,
    },
    firstPage: {
      type: Number,
      required: true,
    },
    lastPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    pages() {
      const generated = [];
      for (let i = this.$props.firstPage; i <= this.$props.lastPage; i++) {
        generated.push(i);
      }

      return generated;
    },
  },
  methods: {
    getPageClasses(current) {
      return [current === this.$props.page ? this.$style.active : ""];
    },
    changePageHandler(newPage) {
      if (this.$props.page !== newPage) {
        this.$emit("changePage", newPage);
      }
    },
    nextHandler() {
      if (this.$props.page !== this.$props.lastPage) {
        this.$emit("changePage", this.$props.page + 1);
      }
    },
    prevHandler() {
      if (this.$props.page !== this.$props.firstPage) {
        this.$emit("changePage", this.$props.page - 1);
      }
    },
  },
};
</script>

<style module>
.pagination {
  width: 100%;
  /* display: flex;
  flex-wrap: wrap; */
  margin: 1rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, 2.25rem);
}

.pagination > * {
  background-color: white;
  padding: 0.5rem 0;
  cursor: pointer;
  text-align: center;
  border: 1px solid #e7e7e7;
}

.pagination > *:hover {
  background-color: #ade9ff;
}

.pagination p:last-child {
  margin-right: 0;
}

.pagination .action {
  grid-column: span 2;
  text-align: center;
}

.pagination .active {
  color: var(--secondary-color);
  font-weight: bold;
}
</style>