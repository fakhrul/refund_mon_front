<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar">
          <img src="img/avatars/6.jpg" class="c-avatar-img" />
        </div>
      </CHeaderNavLink>
    </template>

    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>Account</strong>
    </CDropdownHeader>
    <CDropdownItem @click="onProfile">
      <CIcon name="cil-user" /> {{ userName }}
    </CDropdownItem>

    <CDropdownItem @click="onLogout">
      <CIcon name="cil-lock-locked" /> Logout
    </CDropdownItem>
  </CDropdown>
</template>

<script>
export default {
  name: "TheHeaderDropdownAccnt",
  data() {
    return {
      itemsCount: 42,
    };
  },
  computed: {
    userName() {
      try {
        return auth.getUserName();
      } catch (error) {}
      return "Unknown";
    },
  },
  methods: {

    onProfile() {
      this.$router.push({ path: "/pages/MyProfile" });
    },
    onLogout() {
      let self = this;
      auth.logout();
      self.$router.push({ path: "/pages/login" });
    },
  },
};
</script>

<style scoped>
.c-icon {
  margin-right: 0.3rem;
}
</style>