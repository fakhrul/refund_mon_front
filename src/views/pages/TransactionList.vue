<template>
  <div class="wrapper">
    <div>
      <CToaster :autohide="3000">
        <template v-for="info in infoList">
          <CToast
            :key="info.message"
            :show="true"
            :header="info.header"
            :color="info.color"
          >
            {{ info.message }}.
          </CToast>
        </template>
      </CToaster>
    </div>
    <div>
      <!-- <CRow>
        <CCol
          ><CCard>
            <CCardHeader>
              <strong> Search </strong> Filter
              <div class="card-header-actions">
                <CLink
                  class="card-header-action btn-minimize"
                  @click="isCollapsed = !isCollapsed"
                >
                  <CIcon
                    :name="`cil-chevron-${isCollapsed ? 'bottom' : 'top'}`"
                  />
                </CLink></div
            ></CCardHeader>
            <CCollapse :show="isCollapsed" :duration="400">
              <CCardBody>
                <CForm>
                  <CRow form class="form-group">
                    <CCol tag="label" sm="3" class="col-form-label">
                      Begin
                    </CCol>
                    <CCol sm="9">
                      <input
                        type="datetime-local"
                        :value="computeStartDate"
                        @change="setDateFilter"
                        class="mr-2"
                      />
                    </CCol>
                  </CRow>
                  <CRow form class="form-group">
                    <CCol tag="label" sm="3" class="col-form-label"> End </CCol>
                    <CCol sm="9">
                      <input
                        type="datetime-local"
                        :value="computeEndDate"
                        @change="(e) => setDateFilter(e, 'end')"
                      />
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>

              <CCardFooter>
                <CButton
                  type="submit"
                  size="sm"
                  color="primary"
                  @click="onSearchFilter"
                  ><CIcon name="cil-check-circle" /> Search</CButton
                >
              </CCardFooter>
            </CCollapse>
          </CCard></CCol
        >
      </CRow> -->
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader> <strong> Transactions </strong> List </CCardHeader>
            <CCardBody>
              <CDataTable
                :items="computedItems"
                :fields="fields"
                column-filter
                items-per-page-select
                :items-per-page="20"
                hover
                sorter
                pagination
                :loading="loading"
              >
                <template #show_index="{ index }">
                  <td class="py-2">
                    {{ index + 1 }}
                  </td>
                </template>
                <template #download_link="{ item }">
                  <td>
                    <CLink target="_blank" :href="item.url">{{
                      item.url
                    }}</CLink>
                  </td>
                </template>

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
                    <CCard>
                      <CCardHeader>
                        <h5>Ref No: {{ item.RefNo }}</h5>
                      </CCardHeader>

                      <CCardBody>
                        <table class="table table-striped table-hover">
                          <tbody>
                            <tr>
                              <td>
                                <strong>Org Code:</strong>
                              </td>
                              <td>
                                <CBadge color="info">{{ item.OrgCode }}</CBadge>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Highway Code:</strong>
                              </td>
                              <td>
                                <CBadge color="info">{{
                                  item.HighwayCode
                                }}</CBadge>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Plaza Code:</strong>
                              </td>
                              <td>
                                <CBadge color="info">{{
                                  item.PlazaCode
                                }}</CBadge>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>SPID:</strong>
                              </td>
                              <td>
                                <CBadge color="info">{{ item.SPID }}</CBadge>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Reason:</strong>
                              </td>
                              <td>{{ item.Reason }}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Date Time:</strong>
                              </td>
                              <td>{{ item.TransactionDateTime }}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Exit Location:</strong>
                              </td>
                              <td>{{ item.ExitLocation }}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Transaction Amount:</strong>
                              </td>
                              <td>
                                <CBadge color="success">{{
                                  item.TransactionAmount
                                }}</CBadge>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Response Code:</strong>
                              </td>
                              <td>{{ item.ResponseCode }}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Response Description:</strong>
                              </td>
                              <td>{{ item.ResponseDescription }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </CCardBody>
                      <CCardFooter>
                        <CSelect
                          label="Response"
                          horizontal
                          :options="responseOptions"
                          :value.sync="response"
                        >
                          <template #append>
                            <CButton
                              color="primary"
                              @click="updateResponse(item)"
                            >
                              Update
                            </CButton>
                          </template>
                        </CSelect>
                      </CCardFooter>
                    </CCard>
                  </CCollapse>
                </template>
              </CDataTable>
            </CCardBody>
            <!-- <CCardFooter>
            </CCardFooter> -->
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
    </div>
  </div>
</template>

<script>
import TransactionApi from "../../lib/transactionApi";
import moment from "moment";

const items = [];
const fields = [
  {
    key: "show_index",
    label: "#",
    _style: "width:1%",
    sorter: false,
    filter: false,
  },
  { key: "dateTime" },
  { key: "RefNo" },
  { key: "SPID" },
  { key: "OrgCode" },
  { key: "HighwayCode" },
  { key: "PlazaCode" },
  { key: "ExitLocation" },
  { key: "TransactionAmount" },
  { key: "Reason" },
  // { key: "ResponseCode" },
  { key: "ResponseDesc" },

  // {
  //   key: "show_image",
  //   label: "Image",
  // },
  // { key: "info", label: "Details" },
  {
    key: "show_details",
    label: "",
    _style: "width:1%",
    sorter: false,
    filter: false,
  },
];

export default {
  name: "TransactionList",
  data() {
    return {
      loading: true,
      response: "",
      responseOptions: [],

      items: items.map((item, id) => {
        return { ...item, id };
      }),
      infoList: [],
      fields,
      details: [],
      collapseDuration: 0,
      api: new TransactionApi(),
      warningModal: false,
      itemToDelete: {},

      isCollapsed: false,
    };
  },
  mounted() {
    var self = this;
    self.refreshTable();
    this.fetchResponseCodes();
  },
  computed: {
    computedItems() {
      return this.items.map((item) => {
        return {
          ...item,
          // createdOn: this.getDisplayDateTime(item.createdOn),
          dateTime: this.getDisplayDateTime(item.TransactionDateTime),
        };
      });
    },
    computeStartDate() {
      return moment(this.startDate).format("YYYY-MM-DDTHH:mm");
    },
    computeEndDate() {
      return moment(this.endDate).format("YYYY-MM-DDTHH:mm");
    },
  },
  methods: {
    fetchResponseCodes() {
      var self = this;
      self.api
        .getRespondCodeList()
        .then((response) => {
          var items = response.data;
          console.log(items);
          this.responseOptions = items.map((code) => ({
            value: code.ResponseCode,
            label: code.ResponseDesc,
          }));
          console.log(this.responseOptions);
        })
        .catch(({ data }) => {
          self.toast("Error", helper.getErrorMessage(data), "danger");
          self.loading = false;
        });

      // fetch('http://127.0.0.1:5000/transactions/response_codes')
      //   .then(response => response.json())
      //   .then(data => {
      //     if (data.status === 'success') {
      //       this.responseOptions = data.data.map(code => ({
      //         value: code.ResponseCode,
      //         label: code.ResponseDescription
      //       }));
      //     } else {
      //       console.error('Error fetching response codes:', data.errorMsg);
      //     }
      //   })
      //   .catch(error => {
      //     console.error('Error fetching response codes:', error);
      //   });
    },

    updateResponse(item) {
      console.log(
        "Response updated for item:",
        item,
        "with response:",
        this.response
      );
      var self = this;
      item.ResponseCode = this.response;
      self.api
        .updateResponseCode(item)
        .then((response) => {
          self.toast("Success", "Database had been update", "success");
          this.refreshTable();
          // self.$router.push({
          //   path: `/settings/parameter`,
          // });
        })
        .catch(({ data }) => {
          console.log(data);
          self.toast("Error", data.errorMsg, "danger");
          // console.log(data);
        });
    },
    // onSearchFilter() {
    //   this.refreshTable();
    // },
    isViewableBaseOnRole() {
      var role = auth.getRole();
      if (role == "admin") return true;
      return false;
    },

    setDateFilter(e, end) {
      if (end) {
        this.endDate = new Date(e.target.value).getTime();
      } else {
        this.startDate = new Date(e.target.value).getTime();
      }
    },
    getImageDisplay(item) {
      // return "data:image/jpeg;base64," + item.imageInBytes;
      var url = apiUrl + "transaction/image_display/" + item.imagepath;
      return url;
    },
    updateActualIncidentType(item) {
      var self = this;
      if (item.exportflag == null) item.exportflag = false;
      if (item.actualincidentdetails == null) item.actualincidentdetails = "";

      self.api
        .updateActualIncident(item)
        .then((response) => {
          self.toast("Success", "Database had been update", "success");
          // self.$router.push({
          //   path: `/settings/parameter`,
          // });
        })
        .catch(({ data }) => {
          console.log(data);
          self.toast("Error", data.errorMsg, "danger");
          // console.log(data);
        });
    },
    getImage(item) {
      // return "data:image/jpeg;base64," + item.imageInBytes;
      var url = apiUrl + "transaction/image/" + item.imagepath;
      return url;
    },

    getDisplayDateTime(dt) {
      return moment(dt).format("DD/MM/YYYY HH:mm:ss");
      // return moment(dt).format("YYYY/MM/DD HH:mm:ss");
    },
    download() {},
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
          console.log(self.items);

          self.loading = false;
        })
        .catch(({ data }) => {
          self.toast("Error", helper.getErrorMessage(data), "danger");
          self.loading = false;
        });
    },
    onEdit(item) {
      var self = this;
      self.$router.push({
        path: `/extra/Incident/${item.id}`,
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
            self.toast("Error", helper.getErrorMessage(data), "danger");
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
      this.$router.push({ path: "/extra/Incident" });
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
