<template>
  <div class="prompt">
    <span class="font-bold" v-if="show">{{ instructions }}</span>
    <div class="page-nav" v-if="show">
      <router-link
        aria-label="Continue your journey on the next page"
        :to="link || './'"
        >{{ action }}</router-link
      >
    </div>
  </div>
</template>
<script>
import {
  hasItem,
  getUID,
  setUID,
  hasUID,
  setSessionTicket,
} from "@theme/utils/helpers";
import axios from "axios";
import { EventBus } from "@theme/utils/event-bus";
import { i18n } from "@theme/utils/i18n";

export default {
  props: ["url", "action", "condition", "instructions"],

  //i18n: {},
  data() {
    return {
      show: false,
      link: this.url,
    };
  },
  methods: {
    getInventory(id) {
      if (this.condition == id || this.condition == "none") {
        this.show = true;
      } else {
        this.show = false;
      }
    },
    goToRoom(url) {
      this.$router.replace({ path: url });
    },
  },
  created() {
    EventBus.$on("item_added", (id) => {
      this.getInventory(id);
    });

    EventBus.$on("showResult", (id) => {
      this.getInventory(id);
    });

    EventBus.$on("lang_changed", (lang) => (this.$i18n.locale = lang));

    //initially, set home page to show followup
    this.getInventory(1);
    if (!hasUID()) {
      setUID();
    }
    axios
      .post("https://maya-mystery-api.azurewebsites.net/api/loginAnon", {
        id: getUID(),
        createAccount: hasUID(),
      })
      .then((response) => {
        console.log(response);
        if (response.data.errorMessage == null) {
          setSessionTicket(response.data.SessionTicket);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  beforeDestroy() {
    EventBus.$off("lang_changed");
  },
};
</script>
<style lang="stylus">
.prompt {
  padding-top: 10px;
  font-size: 28px;
}

.page-nav {
  font-weight: bold;
  padding-top: 10px;
  text-decoration: underline;
  display: block;
  cursor: pointer;
}
</style>
