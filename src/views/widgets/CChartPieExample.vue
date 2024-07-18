<template>
  <CChartPie
    :datasets="chartData.datasets"
    :labels="chartData.labels"
  />
</template>

<script>
import { CChartPie } from '@coreui/vue-chartjs'

export default {
  name: 'CChartPieExample',
  components: { CChartPie },
  props: {
    transactions: {
      type: Array,
      required: true
    }
  },
  computed: {
    chartData() {
      const groupedTransactions = this.groupByResponseDesc(this.transactions)
      return {
        labels: Object.keys(groupedTransactions),
        datasets: [
          {
            backgroundColor: this.generateColors(Object.keys(groupedTransactions).length),
            data: Object.values(groupedTransactions)
          }
        ]
      }
    }
  },
  methods: {
    groupByResponseDesc(transactions) {
      return transactions.reduce((acc, transaction) => {
        const key = transaction.ResponseDesc ? transaction.ResponseDesc.trim() : 'Unknown'
        if (!acc[key]) {
          acc[key] = 0
        }
        acc[key] += 1
        return acc
      }, {})
    },
    generateColors(count) {
      const colors = [
        '#41B883', '#E46651', '#00D8FF', '#DD1B16', 
        '#FFC107', '#8E44AD', '#2ECC71', '#3498DB', 
        '#E74C3C', '#F39C12', '#1ABC9C', '#9B59B6'
      ]
      return colors.slice(0, count)
    }
  }
}
</script>
