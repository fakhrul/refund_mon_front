<template>
  <CRow>
    <CCol col="12" xl="12">
      <CCard>
        <CCardHeader> <strong> User </strong> List </CCardHeader>
        <CCardBody>
          <CDataTable
            :items="computedItems"
            :fields="fields"
            column-filter
            items-per-page-select
            :items-per-page="50"
            hover
            sorter
            pagination
            table-filter
            cleaner
            :loading="loading"
          >
            <template #show_details="{ item, index }">
              <td class="py-2">
                <CButton
                  color="primary"
                  variant="outline"
                  square
                  size="sm"
                  @click="toggleDetails(item, index)"
                >
                  {{ Boolean(item._toggled) ? "Hide" : "Show" }}
                </CButton>
              </td>
            </template>
            <template #details="{ item }">
              <CCollapse
                :show="Boolean(item._toggled)"
                :duration="collapseDuration"
              >
                <CCardBody>
                  <p class="text-muted">Full Name: {{ item.name }}</p>
                  <p class="text-muted">Email: {{ item.email }}</p>
                </CCardBody>
                <CCardFooter v-if="isEditorRole">
                  <CButton
                    size="sm"
                    color="info"
                    class="ml-1"
                    @click="onEdit(item)"
                  >
                    Edit
                  </CButton>
                  <CButton
                    size="sm"
                    color="danger"
                    class="ml-1"
                    @click="showDeleteConfirmation(item)"
                  >
                    Delete
                  </CButton>
                </CCardFooter>
              </CCollapse>
            </template>
          </CDataTable>
        </CCardBody>
        <CCardFooter v-if="isEditorRole">
          <!-- <CButton type="submit" size="sm" color="primary" @click="addNew"
                ><CIcon name="cil-check-circle" /> Add New</CButton
              > -->
          <CButton type="submit" class="ml-1" color="primary" @click="addNew">
            Add New
          </CButton>
          <!-- <CButton class="ml-1" color="primary" @click="download">
            Download
          </CButton> -->
        </CCardFooter>
      </CCard>
      <CModal
        title="Confirm Delete"
        color="warning"
        :show.sync="warningModal"
        @update:show="onDeleteConfirmation"
      >
        Are you sure you want to delete this {{ itemToDelete.fullName }} ?
      </CModal>
    </CCol>
  </CRow>
</template>

<script>
import ProfileApi from "../../lib/profileApi";

const items = [];
const fields = [
  { key: "name", _style: "min-width:200px;" },
  { key: "email", _style: "min-width:200px;" },
  { key: "phoneno", _style: "min-width:200px;", label: "Phone"  },
  { key: "organization", _style: "min-width:200px;" },
  { key: "role", _style: "min-width:200px;" },
  {
    key: "show_details",
    label: "",
    _style: "width:1%",
    sorter: false,
    filter: false,
  },
];

export default {
  name: "Users",
  data() {
    return {
      loading: true,
      items: items.map((item, id) => {
        return { ...item, id };
      }),
      infoList: [],
      fields,
      details: [],
      collapseDuration: 0,
      api: new ProfileApi(),
      warningModal: false,
      itemToDelete: {},
    };
  },
  mounted() {
    var self = this;
    self.refreshTable();
  },
  computed: {
    isEditorRole() {
      var role = auth.getRole();
      if (role == "viewer") return false;
      if (role == "editor") return false;
      return true;
    },
    computedExportItem() {
      return this.computedItems.map((item) => {
        return {
          fullName: item.fullName,
          departmentName: item.departmentName,
          email: item.email,
          phone: item.phone,
          staffNo: item.staffNo,
          deviceCode: item.deviceCode,
          battery: item.battery,
          isEnable: item.isEnable,
        };
      });
    },
    csvContent() {
      return this.computedExportItem
        .map((item) => Object.values(item).join(","))
        .join("\n");
    },
    csvCode() {
      return (
        "data:text/csv;charset=utf-8,SEP=,%0A" +
        encodeURIComponent(this.csvContent)
      );
    },

    computedItems() {
      return this.items.map((item) => {
        return {
          ...item,
          role: this.getRole(item),
        };
      });
    },
  },
  methods: {
    getRole(item) {
      if (item.role == "super") return "admin";
      else return item.role;
    },
    toast(header, message, color) {
      var self = this;
      self.infoList.push({
        header: header,
        message: message,
        color: color,
      });
    },
    toggleDetails(item, index) {
      this.$set(item, "_toggled", !item._toggled);
      this.collapseDuration = 300;
      this.$nextTick(() => {
        this.collapseDuration = 0;
      });
    },
    refreshTable() {
      var self = this;
      self.loading = true;
      self.api
        .getList()
        .then((response) => {
          self.items = response.data;
          // console.log(self.items)
          self.loading = false;
        })
        .catch(({ data }) => {
          self.toast("Error", data.message, "danger");
          self.loading = false;
        });
    },
    onEdit(item) {
      var self = this;
      self.$router.push({
        path: `/pages/user/${item.id}`,
      });
    },
    onDeleteConfirmation(status, evt, accept) {
      var self = this;
      if (accept) {
        this.api
          .delete(self.itemToDelete.id)
          .then((response) => {
            self.refreshTable();
          })
          .catch(({ data }) => {
            self.toast("Error", data.message, "danger");
            // console.log(data);
          });
      }
      self.itemToDelete = {};
    },
    showDeleteConfirmation(item) {
      var self = this;
      self.itemToDelete = item;
      self.warningModal = true;
    },
    addNew() {
      this.$router.push({ path: "/pages/user" });
    },
    toast(header, message, color) {
      var self = this;
      self.infoList.push({
        header: header,
        message: message,
        color: color,
      });
    },
  },
};
</script>
