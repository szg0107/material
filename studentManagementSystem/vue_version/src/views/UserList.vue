<template>
  <div class="right-content">
    <el-table
      :data="userList"
      border
      highlight-current-row
      stripe
      style="width: 100%;">
      <el-table-column
        align="center"
        header-align="center"
        height="10px"
        label="id"
        prop="id"
        width="50"/>

      <el-table-column
        align="center"
        header-align="center"
        label="用户名"
        prop="user_name"/>

      <el-table-column
        header-align="center"
        label="邮箱"
        prop="email"
        show-overflow-tooltip/>


      <el-table-column
        header-align="center"
        label="权重"
        prop="weight"
        align="center"/>

      <el-table-column
      align="center"
      header-align="center"
      label="创建时间"
      prop="ctime"
      show-overflow-tooltip
      :formatter="formatCtime"/>

      <el-table-column
        align="center"
        header-align="center"
        label="修改时间"
        prop="utime"
        show-overflow-tooltip
        :formatter="formatUtime"/>

<!--      <el-table-column align="center"-->
<!--                       header-align="center"-->
<!--                       label="操作">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button-->
<!--            @click="handleEdit(scope.row,scope.$index)"-->
<!--            size="mini">编辑-->
<!--          </el-button>-->
<!--          <el-button-->
<!--            @click="handleDelete(scope.row,scope.$index)"-->
<!--            size="mini"-->
<!--            type="danger">删除-->
<!--          </el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>
  </div>
</template>

<script>
    export default {
        name: "UserList",
        data() {
            return {
                userList: [],
                id: 0,
            }
        },
        methods: {
            // 得到学生列表
            getUserList() {
                api.queryAllUser().then(res => {
                    // console.log(res);
                    this.userList = res.data.data;
                });
            },
            // 格式化创建时间
            formatCtime(row, column, cellValue, index) {
                const date = new Date(row.ctime * 1000);
                return `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`;
            },
            // 格式化修改时间
            formatUtime(row, column, cellValue, index) {
                const date = new Date(row.utime * 1000);
                return `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`;
            },
        },
        mounted() {
            this.getUserList();
        }
    }
</script>

<style scoped>
  .right-content {
    min-width: 500px;
    width: 100%;
    height: 100%;
    background-color: #eee;
  }
</style>
