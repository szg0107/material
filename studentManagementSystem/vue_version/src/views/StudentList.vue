<template>
  <div class="right-content">
    <div style="width: 100%; display: flex;justify-content: center;align-items: center;margin: 24px auto;">
      <!--搜索-->
      <el-input
        autocomplete
        clearable
        debounce
        placeholder="关键字搜索"
        prefix-icon="el-icon-search"
        style="width: 50%;margin-right: 10px;"
        v-model="search"/>
      <el-button type="primary" @click="searchStudent">搜索</el-button>
    </div>

    <!--数据表-->
    <el-table
      :data="studentList"
      border
      height="300"
      highlight-current-row
      stripe
      style="width: 100%;">
      <el-table-column
        align="center"
        header-align="center"
        height="10px"
        label="学号"
        prop="sNo"
        width="50"/>

      <el-table-column
        align="center"
        header-align="center"
        label="姓名"
        prop="name"/>

      <el-table-column
        :formatter="formatSex"
        align="center"
        header-align="center"
        label="性别"
        prop="sex"
        width="50"/>

      <el-table-column
        header-align="center"
        label="邮箱"
        prop="email"
        show-overflow-tooltip/>

      <el-table-column
        :formatter="formatBirth"
        align="center"
        header-align="center"
        label="年龄"
        prop="birth"
        width="80"/>

      <el-table-column
        header-align="center"
        label="手机号"
        prop="phone"/>

      <el-table-column
        align="center"
        header-align="center"
        label="住址"
        prop="address"
        show-overflow-tooltip/>

      <el-table-column align="center"
                       header-align="center"
                       label="操作">
        <template slot-scope="scope">
          <el-button
            @click="handleEdit(scope.row,scope.$index)"
            size="mini">编辑
          </el-button>
          <el-button
            @click="handleDelete(scope.row)"
            size="mini"
            type="danger">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="[1, 2, 4, 6,]"
      :total="count"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      background
      hide-on-single-page
      layout="total, sizes, prev, pager, next, jumper"
      style="text-align: center;margin: 25px 0">
    </el-pagination>

    <!--修改数据弹窗-->
    <el-dialog
      :visible.sync="centerDialogVisible"
      title="编辑信息"
      top="10vh"
      width="40%">
      <el-form :model="ruleForm" :rules="rules" class="demo-ruleForm" label-width="100px" ref="ruleForm" size="mini"
               status-icon>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"/>
        </el-form-item>

        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model.number="ruleForm.sex">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="学号" prop="sNo">
          <el-input disabled v-model="ruleForm.sNo"/>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"/>
        </el-form-item>

        <el-form-item label="出生年" prop="birth">
          <el-input v-model="ruleForm.birth"/>
        </el-form-item>

        <el-form-item label="手机号" prop="phone">
          <el-input v-model="ruleForm.phone"/>
        </el-form-item>

        <el-form-item label="住址" prop="address">
          <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="submitForm('ruleForm')" type="primary">确认</el-button>
          <el-button @click="centerDialogVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: 'StudentList',
        data() {
            return {
                studentList: [],
                //显示编辑框
                centerDialogVisible: false,
                ruleForm: {
                    name: '',
                    sex: 0,
                    sNo: '',
                    email: '',
                    birth: '',
                    phone: '',
                    address: '',
                },
                rules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                        {min: 2, max: 6, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    sNo: [{required: true, message: '请输入学号', trigger: 'blur'}],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
                    ],
                    birth: [
                        {required: true, message: '请输入出生年', trigger: 'blur'},
                        {min: 4, max: 4, message: '请输入出生年例如：1995', trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                        {min: 11, max: 11, message: '请输入11位手机号', trigger: 'blur'}
                    ],
                    address: [{required: true, message: '请输入地址', trigger: 'blur'}]
                },
                //学生id
                id: 0,
                // 当前页
                currentPage: this.$store.state.page,
                // 总数量
                count: this.$store.getters.count,
                // 每页显示多少条
                pageSize: this.$store.state.pageSize,
                //搜索内容
                search: '',
                //用户Id
                user_id:JSON.parse(sessionStorage.getItem('userMessage')).id,
                //用户权重
                weight:JSON.parse(sessionStorage.getItem('userMessage')).weight,
            }
        },
        methods: {
            // 得到学生列表
            getStudentListAndCount(getCount = false) {
                if (this.weight===0){
                    api.queryStudentByPage({
                        page: this.$store.state.page - 1,
                        pageSize: this.$store.state.pageSize
                    }).then(res => {
                        // console.log(res);
                        this.studentList = res.data.data;
                    });
                    if (getCount) {
                        //获取学生总数
                        api.queryStudentCount().then(res => {
                            // console.log(res);
                            this.$store.commit('setCount', res.data.data[0].count);
                            this.count = res.data.data[0].count;
                        });
                    }
                }else {
                    api.queryStudentByUserId({
                        id:this.user_id,
                        page: this.$store.state.page - 1,
                        pageSize: this.$store.state.pageSize
                    }).then(res => {
                        // console.log(res);
                        this.studentList = res.data.data;
                    });
                    if (getCount) {
                        //获取学生总数
                        api.queryStudentCountByUserId({id:this.user_id,}).then(res => {
                            // console.log(res);
                            this.$store.commit('setCount', res.data.data[0].count);
                            this.count = res.data.data[0].count;
                        });
                    }
                }

            },
            // 格式化性别
            formatSex(row, column, cellValue, index) {
                return row.sex === 0 ? '男' : '女';
            },
            // 格式化生日
            formatBirth(row, column) {
                return new Date().getFullYear() - row.birth
            },
            // 编辑事件
            handleEdit(row, index) {
                // console.log(row);
                for (const key in this.ruleForm) {
                    if (this.ruleForm.hasOwnProperty(key)) {
                        this.ruleForm[key] = row[key];
                    }
                }
                this.id = row.id;
                this.centerDialogVisible = true;
            },
            // 确认修改
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        api.updateStudentById({
                            // sNo: this.ruleForm.sNo,
                            name: this.ruleForm.name,
                            email: this.ruleForm.email,
                            sex: this.ruleForm.sex,
                            birth: this.ruleForm.birth,
                            phone: this.ruleForm.phone,
                            address: this.ruleForm.address,
                            id: this.id
                        }).then(res => {
                            this.$message.success('修改成功');
                            this.centerDialogVisible = false;
                            this.getStudentListAndCount();
                            // console.log(res);
                        })
                    } else {
                        this.$message.error('请检查表单信息,确认无误再提交');
                        return false;
                    }
                });
            },
            //删除学生
            handleDelete(row) {
                this.$confirm('此操作将永久删除该学生, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    api.deleteStudentById({id: row.id}).then(res => {
                        this.$message.success({message: '删除成功!'});
                        this.getStudentListAndCount(true);
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //当前页改变时
            handleCurrentChange(val) {
                this.$store.commit('setPage', val);
                this.currentPage = val;
                this.getStudentListAndCount()
                // console.log(val);
            },
            //当pageSize改变时
            handleSizeChange(val) {
                // console.log(val);
                this.$store.commit('setPage', 1);
                this.currentPage = 1;
                this.$store.commit('setPageSize', val);
                this.pageSize = val;
                this.getStudentListAndCount();
            },
            //搜索学生
            searchStudent(){
                this.$store.commit('setPage', 1);
                this.currentPage = 1;
                if (this.search.length===0){
                    this.getStudentListAndCount(true);
                }else {
                    if (this.weight===0){
                        api.queryStudentByKeyWord({
                            keyWord:this.search,
                            page:this.currentPage-1,
                            pageSize:this.pageSize
                        }).then(res=>{
                            // console.log(res);
                            const data=res.data.data;
                            this.studentList=data;
                            this.count=data.length;
                            this.$store.commit('setCount',data.length);
                        });
                    }else {
                        api.queryStudentByKeyWordAndUserId({
                            id:this.user_id,
                            keyWord:this.search,
                            page:this.currentPage-1,
                            pageSize:this.pageSize
                        }).then(res=>{
                            // console.log(res);
                            const data=res.data.data;
                            this.studentList=data;
                            this.count=data.length;
                            this.$store.commit('setCount',data.length);
                        });
                    }
                }
            }
        },
        mounted() {
            this.getStudentListAndCount(true);
        }
    }
</script>

<style lang="less" scoped>
  .right-content {
    min-width: 500px;
    width: 100%;
    height: 100%;
    background-color: #eee;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: column;
  }
</style>
