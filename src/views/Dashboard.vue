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
        <CCol sm="12" lg="6">
          <CCard>
            <CCardHeader
              ><strong>{{ configurationObj.LocationName }}</strong>
            </CCardHeader>
            <CCardBody
              ><img id="imgView" :src="imgData" width="100%"
            /></CCardBody>
            <CCardFooter>
              <CRow>
                <CCol col="12">
                  <CButton color="light" block @click="capture()">Snap</CButton>
                </CCol>
              </CRow>
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol sm="12" lg="6">
          <CCard>
            <CCardHeader><strong>Device Info</strong></CCardHeader>
            <CCardBody>
              <CRow>
                <CCol>
                  <CWidgetIcon
                    header="Your Date & Time"
                    :text="currentTime"
                    color="info"
                  >
                    <CIcon name="cilCalendar" width="24" />
                  </CWidgetIcon>
                </CCol>
                <CCol>
                  <CWidgetIcon
                    header="Device Date & Time"
                    :text="computedStatusDateTime"
                    color="info"
                  >
                    <CIcon name="cilCalendar" width="24" />
                  </CWidgetIcon>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <CWidgetIcon
                    header="Camera Status"
                    :text="computedStatusCamera"
                    color="info"
                  >
                    <CIcon name="cilLaptop" width="24" />
                  </CWidgetIcon>
                </CCol>
                <CCol>
                  <CWidgetIcon
                    header="CPU Temperature"
                    :text="computedStatusCpu"
                    color="info"
                  >
                    <CIcon name="cilSpeedometer" width="24" />
                  </CWidgetIcon>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <CWidgetIcon
                    header="RAM Usage"
                    :text="computedStatusRam"
                    color="info"
                  >
                    <CIcon name="cilChartPie" width="24" />
                  </CWidgetIcon>
                </CCol>
                <CCol>
                  <CWidgetIcon
                    header="Dropbox"
                    :text="computedStatusDropbox"
                    color="info"
                  >
                    <CIcon name="cilShare" width="24" />
                  </CWidgetIcon>
                </CCol>
              </CRow>
              <CRow>
                <CCol col="12">
                  <CWidgetProgress header="Storage">
                    <div>Used Percentage {{ computedStoragePercentage }} %</div>

                    <CProgress
                      color="gradient-default"
                      :value="computedStoragePercentage"
                      :max="100"
                      class="progress-xs my-3 mb-0"
                    />
                    <div>
                      Used: {{ computedStorageUsed }}, Total:
                      {{ computedStorageTotal }}, Free:
                      {{ computedStorageFree }}
                    </div>
                  </CWidgetProgress>
                </CCol>
                <CCol> </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="12">
          <CCard>
            <CCardHeader> <strong> Latest Snap </strong> List </CCardHeader>
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
                <template #show_image="{ item }">
                  <td class="py-2">
                    <p v-if="item.source == 'dds_fw_lidar'">N/A</p>
                    <CImg
                      v-else
                      thumbnail
                      :src="getImage(item)"
                      height="70"
                      width="70"
                    />
                  </td>
                </template>
                <template #video_link="{ item }">
                  <td>
                    <CLink target="_blank" :href="getvideolink(item)">{{
                      item.videopath
                    }}</CLink>
                  </td>
                </template>

                <template #video_display_link="{ item }">
                  <td>
                    <CLink target="_blank" :href="getvideoDisplaylink(item)">{{
                      item.videopath
                    }}</CLink>
                  </td>
                </template>

                <template #details="{ item }">
                  <CCollapse
                    :show="Boolean(item._toggled)"
                    :duration="collapseDuration"
                  >
                    <CCardBody>
                      <p class="text-muted">
                        <strong>Date Time:</strong> {{ item.dateTime }}
                      </p>
                      <p
                        class="text-muted"
                        v-if="item.source != 'dds_fw_lidar'"
                      >
                        <strong>Image:</strong>
                        <CLink target="_blank" :href="getImage(item)">
                          Download</CLink
                        >
                      </p>

                      <CImg
                        :src="getImage(item)"
                        class="mb-2"
                        width="100%"
                        v-if="item.source != 'dds_fw_lidar'"
                      />
                    </CCardBody>
                  </CCollapse>
                </template>
              </CDataTable>
            </CCardBody>
            <!-- <CCardFooter>
            </CCardFooter> -->
          </CCard>
        </CCol>
      </CRow>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import CChartIncidents from "./widgets/CChartIncidents.vue";
// import {Dropbox} from "dropbox";

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
  {
    key: "show_image",
    label: "Image",
  },
  { key: "info", label: "Details" },
  {
    key: "show_details",
    label: "",
    _style: "width:1%",
    sorter: false,
    filter: false,
  },
];

export default {
  name: "Dashboard",
  components: {
    CChartIncidents,
  },
  data() {
    return {
      loading: true,
      collapseDuration: 0,
      infoList: [],
      graphItems: [],
      meta: {
        title: "Drone Incident By Monthly",
      },
      fields,
      items: items.map((item, id) => {
        return { ...item, id };
      }),

      incidentApi: new IncidentApi(),
      configApi: new ConfigurationApi(),
      deviceStatusApi: new DeviceStatusApi(),
      configurationObj: {},
      currentTime: Date(),
      deviceStatusObj: {
        datetime: "",
      },
    };
  },
  mounted() {
   //this.refreshDashboardInfo();
    //this.refreshTable();
    // this.refreshDashboardGraph();
  },
  created() {
    this.updateTime();
    this.updateDeviceStatus();
    this.timer = setInterval(this.updateTime, 1000);
    this.timer2 = setInterval(this.updateDeviceStatus, 1000);
    // this.timer3 = setInterval(this.refreshTable, 5000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
    clearInterval(this.timer2);
    // clearInterval(this.timer3);
  },
  computed: {
    computedStorageTotal() {
      return this.deviceStatusObj.storage_total;
    },
    computedStorageFree() {
      return this.deviceStatusObj.storage_free;
    },
    computedStorageUsed() {
      return this.deviceStatusObj.storage_used;
    },

    computedStoragePercentage() {
      return this.deviceStatusObj.storage_percentage;
    },
    computedStatusCamera() {
      if (this.deviceStatusObj.camera) return "ONLINE";
      else return "OFFLINE";
    },
    computedStatusRam() {
      return this.deviceStatusObj.ram;
    },
    computedStatusDropbox() {
      const status = this.deviceStatusObj.dropbox_status;
      return status.length > 20 ? status.substring(0, 20) : status;
    },
    computedStatusCpu() {
      return this.deviceStatusObj.cpu;
    },
    computedStatusDateTime() {
      return moment(this.deviceStatusObj.datetime).format(
        "DD/MM/YYYY HH:mm:ss (dddd)"
      );
    },
    imgData() {
      console.log(apiUrl);
      return apiUrl + "/video";
    },
    csvContent() {
      //add header
      this.computedExportItem.unshift({
        dateTime: "Month",
        incidentType: "Incident",
        total: "Total",
      });

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
          dateTime: this.getDisplayDateTime(item.datetime),
        };
      });
    },
  },

  methods: {
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
    getImage(item) {
      // return "data:image/jpeg;base64," + item.imageInBytes;
      var url =
      apiUrl+ "incident/image/" + item.imagepath;
      return url;
    },

    getDisplayDateTime(dt) {
      // return moment(dt).format("DD/MM/YYYY HH:mm:ss");
      return moment(dt).format("YYYY/MM/DD HH:mm:ss");
    },
    refreshTable() {
      var self = this;
      self.loading = true;
      self.incidentApi
        .getListLatest10()
        .then((response) => {
          self.items = response.data;
          self.loading = false;
        })
        .catch(({ data }) => {
          self.toast("Error", helper.getErrorMessage(data), "danger");
          self.loading = false;
        });
    },
    capture() {
      this.deviceStatusApi
        .snap()
        .then((response) => {
          console.log(response.data);

          this.refreshTable();
          setTimeout(() => {
            this.refreshTable();
          }, 3000); // 3000 milliseconds = 3 seconds
        })
        .catch((data) => {});
    },
    updateTime() {
      this.currentTime = moment(new Date()).format(
        "DD/MM/YYYY HH:mm:ss (dddd)"
      );
    },
    updateDeviceStatus() {
      this.deviceStatusApi
        .get()
        .then((response) => {
          this.deviceStatusObj = response.data;
          console.log(self.deviceStatusObj);
        })
        .catch((data) => {});
    },
    getDisplayMonthYear(dt) {
      return moment(dt).format("MMM YYYY");
    },
    getThisYearTotal() {
      try {
        let today = new Date();
        let year = today.getFullYear();
        var total = 0;
        for (let i = 0; i < this.items.length; i++) {
          if (parseInt(this.items[i].yyyy) == year) {
            total = total + this.items[i].total;
          }
        }
      } catch (error) {
        return total;
      }
      return total;
    },
    getThisYearPercentage() {
      var total = this.getThisYearTotal();
      if (total > 100) {
        return 100;
      } else return total;
    },
    getPrevMonthPercentage(previousMonth) {
      var total = this.getPrevMonthTotal(previousMonth);
      if (total > 100) {
        return 100;
      } else return total;
    },
    getPrevMonthTotal(prevMonth) {
      try {
        let today = new Date();
        today.setMonth(today.getMonth() - prevMonth);
        let year = today.getFullYear();
        let month = today.getMonth() + 1;
        for (let i = 0; i < this.items.length; i++) {
          if (
            parseInt(this.items[i].yyyy) == year &&
            parseInt(this.items[i].mm) == month
          ) {
            return this.items[i].total;
          }
        }
      } catch (error) {
        return 0;
      }
      return 0;
    },
    getPrevMonthText(prevMonth) {
      let today = new Date();
      today.setMonth(today.getMonth() - prevMonth);
      let previousMonth = today.toLocaleString("en-US", {
        month: "long",
      });
      let year = today.getFullYear();

      return previousMonth + " " + year;
    },
    refreshDashboardInfo() {
      var self = this;
      self.configApi
        .getList()
        .then((response) => {
          self.configurationObj = response.data[0];
          console.log(self.configurationObj);
        })
        .catch((data) => {
          self.toast("Error", data, "danger");
        });

      // self.incidentApi
      //   .getDashboardData()
      //   .then((response) => {
      //     self.items = response.data;
      //   })
      //   .catch(({ data }) => {
      //     self.toast("Error", helper.getErrorMessage(data), "danger");
      //     // console.log(data);
      //   });
    },
    refreshDashboardGraph() {
      var self = this;
      self.incidentApi
        .getDashboardGraph()
        .then((response) => {
          self.graphItems = response.data;
        })
        .catch(({ data }) => {
          self.toast("Error", helper.getErrorMessage(data), "danger");
          // console.log(data);
        });
    },
  },
};
</script>
