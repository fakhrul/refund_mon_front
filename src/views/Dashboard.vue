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
          <CCardGroup columns class="card-columns cols-2">
            <CCard>
              <CCardHeader>Transaction By Month</CCardHeader>
              <CCardBody><CChartBarExample :transactions="items" /></CCardBody>
            </CCard>
            <CCard>
              <CCardHeader>Transaction By Response</CCardHeader>
              <CCardBody><CChartPieExample :transactions="items" /></CCardBody>
            </CCard> </CCardGroup
        ></CCol>
      </CRow>
      <CRow>
        <CCol>
          <CCard>
            <CCardBody
              ><iframe
                title="KIK"
                width="100%"
                height="500"
                src="https://app.powerbi.com/view?r=eyJrIjoiZmVmOGM3MzMtYWZmOS00OTNkLTg2ZjMtYWM5YmYwMmY2YWI3IiwidCI6IjU2NTllZDAzLTg0M2QtNDRmNC1iNjg1LTI2YTI2ZGQ5Yjk4YyIsImMiOjEwfQ%3D%3D"
                frameborder="0"
                allowFullScreen="true"
              ></iframe>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import CChartBarExample from "./widgets/CChartBarExample.vue";
import CChartPieExample from "./widgets/CChartPieExample.vue";
import TransactionApi from "../lib/transactionApi";

const items = [];

export default {
  name: "Dashboard",
  components: {
    CChartBarExample,
    CChartPieExample,
  },
  data() {
    return {
      api: new TransactionApi(),

      items: items.map((item, id) => {
        return { ...item, id };
      }),
      infoList: [],
    };
  },
  mounted() {
    this.refreshTransactions();
  },
  created() {},
  beforeDestroy() {},
  computed: {},

  methods: {
    refreshTransactions() {
      var self = this;
      self.api
        .getList()
        .then((response) => {
          self.items = response.data;
        })
        .catch(({ data }) => {
          self.toast("Error", helper.getErrorMessage(data), "danger");
        });
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
