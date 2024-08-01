<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
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
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCard class="mx-4 mb-0">
            <CCardBody class="p-4">
              <CForm class="mb-2 text-center">
                <CImg :src="logoUrl" width="100" class="mb-2"></CImg>
                <h5>E-Refund Monitoring</h5>
                <p class="text-muted">Fill in the details and click search.</p>

                <CInput placeholder="ReferNo" v-model="obj.refNo">
                  <template #prepend-content
                    ><CIcon name="cil-user"
                  /></template>
                </CInput>

                <CInput placeholder="Vehicle No" v-model="obj.vehicleNo">
                  <template #prepend-content
                    ><CIcon name="cilCreditCard"
                  /></template>
                </CInput>
                <CInput placeholder="Email" prepend="@" v-model="obj.email" />
                <CRow>
                  <CCol>
                    <CButton color="info" class="ml-1" @click="search">
                      Search
                    </CButton>
                  </CCol>
                </CRow>

                <CRow>
                  <CCol>
                    <div v-if="item.RefNo == null">{{ item.RefNo }}</div>
                    <div v-else>
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
                                  <CBadge color="info">{{
                                    item.OrgCode
                                  }}</CBadge>
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
                              <!-- <tr>
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
                              </tr> -->
                            </tbody>
                          </table>
                        </CCardBody>
                        <CCardFooter>
                          <CButton color="info" class="ml-1" @click="email">
                            Email
                          </CButton>
                        </CCardFooter>
                      </CCard>
                    </div>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import TransactionApi from "../../lib/transactionApi";

export default {
  name: "SearchTransaction",
  data: () => {
    return {
      infoList: [],
      api: new TransactionApi(),
      logoUrl: "/img/logo.png",
      obj: {
        refNo: "20221223173847339RF00033",
        vehicleNo: "VAF5767",
        email: "azizulazrai@gmail.com",
      },
      item: {

      },
    };
  },
  mounted() {},

  methods: {
    email() {

      var self = this;
      if (self.item) {
        this.api
          .sendEmail(self.obj.email, self.item)
          .then((response) => {
            this.$router.push({ path: "/pages/emailSent" });
          })
          .catch(({ data }) => {
            self.toast("Error", helper.getErrorMessage(data), "danger");
            self.item = null;
          });
      } else {
        self.item = null;
      }


    },
    resetObj() {
      var self = this;
      if (self.obj.refNo) {
        this.api
          .getByRefNoAndVehicleNo(self.obj)
          .then((response) => {
            console.log(response);
            self.item = response.data[0];
            console.log(self.item);
          })
          .catch(({ data }) => {
            self.toast("Error", helper.getErrorMessage(data), "danger");
            // console.log(data);
            self.item = null;
          });
      } else {
        self.item = null;
      }
    },
    toast(header, message, color) {
      var self = this;
      self.infoList.push({
        header: header,
        message: message,
        color: color,
      });
    },
    search() {
      this.resetObj();
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-primary {
  color: #fff;
  background-color: rgb(0, 168, 156);
  border-color: rgb(0, 168, 156);
}
// .btn-facebook {
//   color: #fff;
//   background-color: rgb(72, 75, 77);
//   border-color: rgb(72, 75, 77);
// }
.bg-primary {
  background-color: rgb(0, 168, 156) !important;
}
</style>