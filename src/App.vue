<template>
  <BaseContainer>
    <Form @search="searchHandler" />
    <TextList v-if="!listEmpty" :list="results" :loading="isLoading" />
    <FetchStatus v-show="showFetchStatus" :message="statusMessage" />
    <Pagination
      v-if="pagination.first < pagination.last"
      :page="pagination.current"
      :firstPage="pagination.first"
      :lastPage="pagination.last"
      @changePage="changePageHandler"
    />
  </BaseContainer>
</template>

<script>
import BaseContainer from "./components/BaseContainer";
import Form from "./components/Form";
import TextList from "./components/TextList";
import FetchStatus from "./components/FetchStatus";
import Pagination from "./components/Pagination";

import getTexts from "./api/getTexts";
import secondToHMS from "./utils/secondToHMS";

export default {
  name: "App",
  components: {
    BaseContainer,
    Form,
    TextList,
    FetchStatus,
    Pagination,
  },
  data() {
    return {
      results: [],
      isLoading: false,
      notFound: false,
      noText: false,
      url: "",
      text: "",
      pagination: {
        current: 1,
        first: 1,
        last: 0,
      },
    };
  },
  computed: {
    listEmpty() {
      return this.results.length === 0;
    },
    statusMessage() {
      if (this.isLoading) {
        return "Fetching data";
      } else if (this.notFound) {
        return "Video not found";
      } else if (this.noText) {
        return "No text found";
      } else {
        return "";
      }
    },
    fetchSuccess() {
      return !this.notFound && !this.noText;
    },
    showFetchStatus() {
      return this.results.length === 0;
    },
  },
  methods: {
    async searchHandler(url, text) {
      this.isLoading = true;
      this.notFound = false;
      this.noText = false;
      this.pagination = {
        current: 1,
        first: 1,
        last: 0,
      };
      this.url = url;
      this.text = text;
      this.results = [];

      try {
        const response = await getTexts(url, text, this.page);

        if (response.status === 500) {
          throw new Error("Server error!");
        }

        if (response.data.data === null) {
          this.notFound = true;
        } else if (response.data.data.length === 0) {
          this.noText = true;
        } else {
          this.results = response.data.data.map((text) => ({
            text: text.text,
            start: secondToHMS(text.start),
            end: secondToHMS(text.end),
          }));

          const totalItem = response.data.total;
          const totalPage =
            totalItem % 10 === 0
              ? totalItem / 10
              : Math.round(totalItem / 10) + 1;

          this.pagination = {
            current: 1,
            first: 1,
            last: totalPage,
          };
        }
      } catch (error) {
        console.log(error.message);
      }
      this.isLoading = false;
    },
    async changePageHandler(newPage) {
      this.isLoading = true;
      this.pagination = {
        ...this.pagination,
        current: newPage,
      };

      try {
        const response = await getTexts(this.url, this.text, newPage);

        if (response.status === 500) {
          throw new Error("Server error!");
        }

        if (response.data.data === null) {
          this.notFound = true;
        } else if (response.data.data.length === 0) {
          this.noText = true;
        } else {
          this.results = response.data.data.map((text) => ({
            text: text.text,
            start: secondToHMS(text.start),
            end: secondToHMS(text.end),
          }));
        }
      } catch (error) {
        console.log(error.message);
      }
      this.isLoading = false;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Recursive:wght@300;400;500;600;700;800;900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --primary-color: #4069ff;
  --secondary-color: #ffc934;
  --shadow: 1px 2px 5px rgba(0, 0, 0, 0.5);
}

body {
  font-family: "Recursive", sans-serif;
  background-color: var(--primary-color);
}

.control {
  display: flex;
}

.control input {
  flex: 1;
  padding: 0.75rem;
  border: solid 2px transparent;
  outline: none;
}

.control input.error {
  border-color: red;
}

.control button {
  padding: 0 1.25rem;
  background-color: var(--secondary-color);
  border: none;
  color: black;
  cursor: pointer;
}
</style>
