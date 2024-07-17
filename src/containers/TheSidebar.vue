<template>
  <CSidebar
    :minimize="minimize"
    unfoldable
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none" to="/">
      <img
        src="/img/side.png"
        :height="40"
        size="custom-size"
        class="c-sidebar-brand-full"
      />
      <!-- <img src="/img/logo.png" class="c-sidebar-brand-minimized" /> -->
      <!-- <CIcon
        class="c-sidebar-brand-full"
        name="logo"
        size="custom-size"
        :height="35"
        viewBox="0 0 642 134"
      />
      <CIcon
        class="c-sidebar-brand-minimized"
        name="logo"
        size="custom-size"
        :height="35"
        viewBox="0 0 110 134"
      /> -->
    </CSidebarBrand>
    <!-- <CRenderFunction flat :contentToRender="sidebarItems"/> -->
    <CRenderFunction flat :content-to-render="navigation" />
    <CSidebarMinimizer
      class="c-d-md-down-none"
      @click.native="$store.commit('toggle', 'sidebarMinimize')"
    />
  </CSidebar>
</template>

<script>
import adminNav from "./_adminNav";

export default {
  name: "TheSidebar",
  adminNav,

  computed: {
    show() {
      return this.$store.state.sidebarShow;
    },
    minimize() {
      return this.$store.state.sidebarMinimize;
    },
    navigation() {
      try {
        return adminNav;
      } catch (error) {
        console.log(error);
      }
      return adminNav;
    },
  },
};
</script>

