<template>
  <CChartBar
    :datasets="chartData.datasets"
    :labels="chartData.labels"
  />
</template>

<script>
import { CChartBar } from '@coreui/vue-chartjs'
import moment from 'moment'

export default {
  name: 'CChartBarExample',
  components: { CChartBar },
  props: {
    transactions: {
      type: Array,
      required: true
    }
  },
  computed: {
    chartData() {
      const groupedTransactions = this.groupByMonth(this.transactions)
      return {
        labels: Object.keys(groupedTransactions).reverse(),
        datasets: [
          {
            label: 'Total Transactions',
            backgroundColor: '#f87979',
            data: Object.values(groupedTransactions).reverse()
          }
        ]
      }
    }
  },
  methods: {
    groupByMonth(transactions) {
      const result = {}
      const currentDate = moment()
      for (let i = 0; i < 12; i++) {
        const month = currentDate.clone().subtract(i, 'months').format('MMM YYYY')
        result[month] = 0
      }

      transactions.forEach(transaction => {
        const transactionMonth = moment(transaction.TransactionDateTime).format('MMM YYYY')
        if (result.hasOwnProperty(transactionMonth)) {
          result[transactionMonth] += 1
        }
      })

      return result
    }
  }
}
</script>
