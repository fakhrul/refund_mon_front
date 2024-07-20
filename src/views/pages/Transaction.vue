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
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <h5>Ref No: {{ obj.RefNo }}</h5>
            </CCardHeader>
            <CCardBody>
              <CRow
                ><CCol>
                  <table class="table table-striped table-hover">
                    <tbody>
                      <tr>
                        <td><strong>Org Code:</strong></td>
                        <td>
                          <CBadge color="info">{{ obj.OrgCode }}</CBadge>
                        </td>
                      </tr>
                      <tr>
                        <td><strong>Highway Code:</strong></td>
                        <td>
                          <CBadge color="info">{{ obj.HighwayCode }}</CBadge>
                        </td>
                      </tr>
                      <tr>
                        <td><strong>Plaza Code:</strong></td>
                        <td>
                          <CBadge color="info">{{ obj.PlazaCode }}</CBadge>
                        </td>
                      </tr>
                      <tr>
                        <td><strong>SPID:</strong></td>
                        <td>
                          <CBadge color="info">{{ obj.SPID }}</CBadge>
                        </td>
                      </tr>
                      <tr>
                        <td><strong>Ref No:</strong></td>
                        <td>{{ obj.RefNo }}</td>
                      </tr>
                      <tr>
                        <td><strong>Reason:</strong></td>
                        <td>{{ obj.Reason }}</td>
                      </tr>
                      <tr>
                        <td><strong>Vehicle No:</strong></td>
                        <td>{{ obj.VehicleNo }}</td>
                      </tr>
                      <tr>
                        <td><strong>RFID Tag No:</strong></td>
                        <td>{{ obj.RFIDTagNo }}</td>
                      </tr>
                      <tr>
                        <td><strong>Card Mfg No:</strong></td>
                        <td>{{ obj.CardMfgno }}</td>
                      </tr>
                      <tr>
                        <td><strong>Vehicle Colour:</strong></td>
                        <td>{{ obj.VehicleColour }}</td>
                      </tr>
                      <tr>
                        <td><strong>Car Model:</strong></td>
                        <td>{{ obj.CarModel }}</td>
                      </tr>
                      <tr>
                        <td><strong>Customer Name:</strong></td>
                        <td>{{ obj.CustomerName }}</td>
                      </tr>
                      <tr>
                        <td><strong>Customer SOF Name:</strong></td>
                        <td>{{ obj.CustomerSOFName }}</td>
                      </tr>
                      <tr>
                        <td><strong>Entry Location:</strong></td>
                        <td>{{ obj.EntryLocation }}</td>
                      </tr>
                      <tr>
                        <td><strong>Exit Location:</strong></td>
                        <td>{{ obj.ExitLocation }}</td>
                      </tr>
                      <tr>
                        <td><strong>Entry SP Name:</strong></td>
                        <td>{{ obj.EntrySPName }}</td>
                      </tr>
                      <tr>
                        <td><strong>Exit SP Name:</strong></td>
                        <td>{{ obj.ExitSPName }}</td>
                      </tr>
                      <tr>
                        <td><strong>Transaction ID:</strong></td>
                        <td>{{ obj.TransactionID }}</td>
                      </tr>
                      <tr>
                        <td><strong>Date Time:</strong></td>
                        <td>
                          {{ getDisplayDateTime(obj.TransactionDateTime) }}
                        </td>
                      </tr>
                      <tr>
                        <td><strong>Actual Fare:</strong></td>
                        <td>{{ obj.ActualFare }}</td>
                      </tr>
                      <tr>
                        <td><strong>Transaction Amount:</strong></td>
                        <td>
                          <CBadge color="success">{{
                            obj.TransactionAmount
                          }}</CBadge>
                        </td>
                      </tr>
                      <tr>
                        <td><strong>Refund Amount:</strong></td>
                        <td>{{ obj.RefundAmount }}</td>
                      </tr>
                      <tr>
                        <td><strong>Total Refund Amount:</strong></td>
                        <td>{{ obj.TotalRefundAmount }}</td>
                      </tr>
                      <tr>
                        <td><strong>Payment Date Time:</strong></td>
                        <td>{{ changeToNAForEmpty(obj.PaymentDateTime) }}</td>
                      </tr>
                      <tr>
                        <td><strong>Refund Status:</strong></td>
                        <td>{{ obj.RefundStatus }}</td>
                      </tr>
                      <tr>
                        <td><strong>Batch Ref No:</strong></td>
                        <td>{{ obj.BatchRefNo }}</td>
                      </tr>
                      <tr>
                        <td><strong>Verify:</strong></td>
                        <td>{{ changeToNAForEmpty(obj.Verify) }}</td>
                      </tr>
                      <tr>
                        <td><strong>Remark Date Time:</strong></td>
                        <td>{{ changeToNAForEmpty(obj.RemarkDateTime) }}</td>
                      </tr>
                      <tr>
                        <td><strong>SP Reason:</strong></td>
                        <td>
                          {{ changeToNAForEmpty(obj.SPReason) }}
                        </td>
                      </tr>
                      <tr>
                        <td><strong>SP Reason Code:</strong></td>
                        <td>{{ changeToNAForEmpty(obj.SPReasonCode) }}</td>
                      </tr>
                      <tr>
                        <td><strong>Additional Info:</strong></td>
                        <td>{{ changeToNAForEmpty(obj.AdditionalInfo) }}</td>
                      </tr>
                      <tr>
                        <td><strong>Actual Entry Plaza:</strong></td>
                        <td>{{ changeToNAForEmpty(obj.ActualEntryPlaza) }}</td>
                      </tr>
                      <tr>
                        <td><strong>Actual Entry Lane:</strong></td>
                        <td>{{ changeToNAForEmpty(obj.ActualEntryLane) }}</td>
                      </tr>
                      <tr>
                        <td><strong>Actual Entry Class Vehicle:</strong></td>
                        <td>
                          {{ changeToNAForEmpty(obj.ActualEntryClassVehicle) }}
                        </td>
                      </tr>
                      <tr>
                        <td><strong>Actual Exit Plaza:</strong></td>
                        <td>{{ changeToNAForEmpty(obj.ActualExitPlaza) }}</td>
                      </tr>
                      <tr>
                        <td><strong>Actual Exit Lane:</strong></td>
                        <td>{{ changeToNAForEmpty(obj.ActualExitLane) }}</td>
                      </tr>
                      <tr>
                        <td><strong>Actual Exit Class Vehicle:</strong></td>
                        <td>
                          {{ changeToNAForEmpty(obj.ActualExitClassVehicle) }}
                        </td>
                      </tr>
                      <tr>
                        <td><strong>Received Date Time:</strong></td>
                        <td>{{ changeToNAForEmpty(obj.ReceivedDateTime) }}</td>
                      </tr>
                      <tr>
                        <td><strong>Response Date Time:</strong></td>
                        <td>{{ changeToNAForEmpty(obj.ResponseDateTime) }}</td>
                      </tr>
                      <tr>
                        <td><strong>Invoice Date Time:</strong></td>
                        <td>{{ changeToNAForEmpty(obj.InvoiceDateTime) }}</td>
                      </tr>
                      <tr>
                        <td><strong>Tng Payment Date Time:</strong></td>
                        <td>
                          {{ changeToNAForEmpty(obj.TngPaymentDateTime) }}
                        </td>
                      </tr>
                      <tr>
                        <td><strong>Response Code:</strong></td>
                        <td>{{ obj.ResponseCode }}</td>
                      </tr>
                      <tr>
                        <td><strong>Response Description:</strong></td>
                        <td>{{ obj.ResponseDesc }}</td>
                      </tr>
                    </tbody>
                  </table>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <CCard>
                    <CCardHeader>History </CCardHeader>
                    <CCardBody>
                      <CDataTable
                        :striped="striped"
                        :border="true"
                        :items="computedItems"
                        :fields="fieldDetails"
                      >
                      </CDataTable>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <CCard>
                    <CForm>
                      <CCardHeader>Update Status</CCardHeader>
                      <CCardBody>
                        <CSelect
                          label="Response"
                          horizontal
                          :options="responseOptions"
                          :value.sync="newReposnce.codestatus"
                        >
                        </CSelect>
                        <CRow form class="form-group">
                          <CCol tag="label" sm="3" class="col-form-label">
                            Reason
                          </CCol>
                          <CCol sm="9">
                            <CTextarea
                              placeholder=""
                              rows="5"
                              v-model="newReposnce.reason"
                            />
                          </CCol>
                        </CRow>
                      </CCardBody>
                      <CCardFooter>
                        <CButton color="primary" @click="updateResponse(obj)">
                          Update
                        </CButton>
                      </CCardFooter>
                    </CForm>
                  </CCard>
                  <!-- <CSelect
                    label="Response"
                    horizontal
                    :options="responseOptions"
                    :value.sync="response"
                  >
                    <template #append>
                      <CButton color="primary" @click="updateResponse(obj)">
                        Update
                      </CButton>
                    </template>
                  </CSelect> -->
                </CCol>
              </CRow>
            </CCardBody>
            <CCardFooter> </CCardFooter>
            <!-- <CCardFooter>
            </CCardFooter> -->
          </CCard>
        </CCol>
      </CRow>
    </div>
  </div>
</template>

<script>
import TransactionApi from "../../lib/transactionApi";
import moment from "moment";

const itemDetails = [];
const fieldDetails = [
  { key: "dateTime" },
  { key: "ResponseDesc" },
  { key: "reason" },
];

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
      itemDetails: itemDetails.map((item, id) => {
        return { ...item, id };
      }),
      fieldDetails,
      loading: true,
      // response: "",
      responseOptions: [],
      newReposnce: {
        orgcode: "",
        highwaycode: "",
        plazacode: "",
        spid: "",
        refno: "",
        seqno: "",
        updateby: "",
        codestatus: "01",
        reason: "",
        responsedatetime: "",
      },
      obj: {},
      infoList: [],
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
    self.resetObj();
    this.fetchResponseCodes();
  },
  computed: {
    computedItems() {
      return this.itemDetails.map((item) => {
        return {
          ...item,
          dateTime: this.getDisplayDateTime(item.responsedatetime),
        };
      });
    },
  },
  methods: {
    changeToNAForEmpty(item) {
      if (item) return item;
      return "N/A";
    },
    resetObj() {
      var self = this;
      if (self.$route.params.id) {
        this.api.get(self.$route.params.id).then((response) => {
          self.obj = response.data;
          self.itemDetails = self.obj.Details;
          console.log(self.obj);
          self.newReposnce.orgcode = self.obj.OrgCode;
          self.newReposnce.highwaycode = self.obj.HighwayCode;
          self.newReposnce.plazacode = self.obj.PlazaCode;
          self.newReposnce.spid = self.obj.SPID;
          self.newReposnce.refno = self.obj.RefNo;
          self.newReposnce.seqno = self.obj.SeqNo;
        });
      }
    },
    fetchResponseCodes() {
      var self = this;
      self.api
        .getRespondCodeList()
        .then((response) => {
          var items = response.data;
          // console.log(items);
          this.responseOptions = items.map((code) => ({
            value: code.ResponseCode,
            label: code.ResponseDesc,
          }));
          // console.log(this.responseOptions);
        })
        .catch(({ data }) => {
          self.toast("Error", helper.getErrorMessage(data), "danger");
          self.loading = false;
        });
    },

    updateResponse() {
      // console.log(
      //   "Response updated for item:",
      //   item,
      //   "with response:",
      //   this.response
      // );

      var self = this;
      self.newReposnce.updateby = auth.getUserName();
      // self.newReposnce.CodeStatus = self.obj.OrgCode;
      // self.newReposnce.Reason = self.obj.OrgCode;
      // self.newReposnce.ResponseDateTime = self.obj.OrgCode;
      //item.ResponseCode = this.newReposnce.response;
      self.api
        .updateResponseCode(self.newReposnce)
        .then((response) => {
          self.toast("Success", "Database had been update", "success");
          this.resetObj();
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
    // updateActualIncidentType(item) {
    //   var self = this;
    //   if (item.exportflag == null) item.exportflag = false;
    //   if (item.actualincidentdetails == null) item.actualincidentdetails = "";

    //   self.api
    //     .updateActualIncident(item)
    //     .then((response) => {
    //       self.toast("Success", "Database had been update", "success");
    //       // self.$router.push({
    //       //   path: `/settings/parameter`,
    //       // });
    //     })
    //     .catch(({ data }) => {
    //       console.log(data);
    //       self.toast("Error", data.errorMsg, "danger");
    //       // console.log(data);
    //     });
    // },
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
    // onDeleteConfirmation(status, evt, accept) {
    //   var self = this;
    //   if (accept) {
    //     this.api
    //       .delete(self.itemToDelete.id)
    //       .then((response) => {
    //         self.refreshTable();
    //       })
    //       .catch(({ data }) => {
    //         self.toast("Error", helper.getErrorMessage(data), "danger");
    //       });
    //   }
    //   self.itemToDelete = {};
    // },
    // showDeleteConfirmation(item) {
    //   var self = this;
    //   self.itemToDelete = item;
    //   self.warningModal = true;
    // },
    // addNew() {
    //   this.$router.push({ path: "/extra/Incident" });
    // },
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
