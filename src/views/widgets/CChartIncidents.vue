<template>
  <CChartBar
    :datasets="defaultDatasets"
    :options="defaultOptions"
    :labels="defaultLabels"
    :plugins="defaultPlugins"
  />
</template>

<script>
import { CChartBar } from "@coreui/vue-chartjs";

export default {
  name: "CChartIncidents",
  components: {
    CChartBar,
  },
  props: {
    data: {},
    meta: {},
  },
  computed: {
    defaultPlugins() {
      return [];
    },
    defaultLabels() {
      return this.data.date;
    },
    defaultDatasets() {
      return [
        {
          label: "Total Drone Detected",
          yAxisID: "total",
          borderColor: "red",
          data: this.data.total,
        },
      ];
    },
    defaultOptions() {
      return {
        maintainAspectRatio: true,
        legend: {
          display: true,
        },
        title: {
          display: true,
          text: this.meta.title,
        },
        scales: {
          xAxes: [
            {
              type: "time",
              gridLines: {
                drawOnChartArea: true,
              },
              time: {
                unit: "month",
              },
            },
          ],

          yAxes: [
            {
              id: "total",
              type: "linear",
              position: "left",
              ticks: {
                fontColor: "red",
              },
            },
          ],
        },
        elements: {
          line: {
            borderWidth: 1,
          },
          point: {
            radius: 1,
            hitRadius: 1,
            hoverRadius: 4,
          },
        },
      };
    },
  },
};
</script>
