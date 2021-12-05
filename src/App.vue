<template>
  <BaseContainer>
    <Logo />
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
import Logo from "./components/Logo";

import textList from "./api/textList";
import secondToHMS from "./utils/secondToHMS";


export default {
  name: "App",
  components: {
    BaseContainer,
    Form,
    TextList,
    FetchStatus,
    Pagination,
    Logo,
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
        return "Loading data";
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
        const response = await textList(url, text, this.page);

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
        console.log(error);
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
        const response = await textList(this.url, this.text, newPage);

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
@import url("https://fonts.googleapis.com/css2?family=Josefin+Sans&family=Roboto&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --primary-color: #fff;
  --secondary-color: #2ab87d;
  --shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}


body {
  font-family: "Roboto", sans-serif;
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
