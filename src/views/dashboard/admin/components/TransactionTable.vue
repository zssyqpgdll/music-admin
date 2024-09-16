<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="服务名" min-width="200">
      <template slot-scope="scope">
        {{ scope.row.order_no | orderNoFilter }}
      </template>
    </el-table-column>
    <el-table-column label="时间" width="195" align="center">
      <template slot-scope="scope">
        {{ scope.row.timestamp | timestampFilter }}
      </template>
    </el-table-column>
    <el-table-column label="状态" width="100" align="center">
      <template slot-scope="{row}">
        <el-tag :type="row.status | statusFilter">
          {{ row.status }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { transactionList } from '@/api/remote-search'
const { parseTime } = require('@/utils')

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        error: 'danger',
        running: 'warning',
      }
      return statusMap[status]
    },
    timestampFilter(str) {
      return parseTime(str);
     }
  },
  data() {
    return {
      list: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      transactionList().then(response => {
        this.list = response.data.items.slice(0, 8)
      })
    }
  }
}
</script>
