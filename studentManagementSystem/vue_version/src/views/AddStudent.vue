<template>
  <div class="add-student content " id="add-student">
    <el-form :model="ruleForm" :rules="rules" class="demo-ruleForm" label-width="100px" ref="ruleForm" status-icon>
      <el-form-item label="姓名" prop="studentName">
        <el-input v-model="ruleForm.studentName"/>
      </el-form-item>

      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model.number="ruleForm.sex">
          <el-radio :label="0">男</el-radio>
          <el-radio :label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="学号" prop="sNo">
        <el-input v-model="ruleForm.sNo"/>
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
        <el-button @click="submitForm('ruleForm')" type="primary">立即添加</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <!--        <el-button @click="addStudent">重置</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
        name: 'AddStudent',
        data() {
            return {
                ruleForm: {
                    studentName: '',
                    sex: 0,
                    sNo: '',
                    email: '',
                    birth: '',
                    phone: '',
                    address: '',
                },
                rules: {
                    studentName: [
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
                }
            }
        },
        methods: {
            addStudent() {
                for (let i = 11; i <= 20; i++) {
                    api.addStudent(this.creatStudent(i));
                }
            },
            //创建学生
            creatStudent(sNo) {
                //单字 主要功能随机生成姓名
                let str = '赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳酆鲍史唐费廉岑薛雷贺倪汤滕殷罗毕郝邬安常乐于时傅皮卞齐康伍余元卜顾孟平黄和穆萧尹姚邵湛汪祁毛禹狄米贝明臧计伏成戴谈宋茅庞熊纪舒屈项祝董梁杜阮蓝闵席季麻强贾路娄危江童颜郭梅盛林刁钟徐邱骆高夏蔡田樊胡凌霍虞万支柯昝管卢莫经房裘缪干解应宗丁宣贲邓郁单杭洪包诸左石崔吉钮龚程嵇邢滑裴陆荣翁荀羊於惠甄曲家封芮羿储靳汲邴糜松井段富巫乌焦巴弓牧隗山谷车侯宓蓬全郗班仰秋仲伊宫宁仇栾暴甘钭厉戎祖武符刘景詹束龙叶幸司韶郜黎蓟薄印宿白怀蒲邰从鄂索咸籍赖卓蔺屠蒙池乔阴鬱胥能苍双闻莘党翟谭贡劳逄姬申扶堵冉宰郦雍卻璩桑桂濮牛寿通边扈燕冀郏浦尚农温别庄晏柴瞿阎充慕连茹习宦艾鱼容向古易慎戈廖庾终暨居衡步都耿满弘匡国文寇广禄阙东欧殳沃利蔚越夔隆师巩厍聂晁勾敖融冷訾辛阚那简饶空曾毋沙乜养鞠须丰巢关蒯相查后荆红游竺权逯盖益桓公仉督晋楚闫法汝鄢涂钦归海岳帅缑亢况郈有琴商牟佘佴伯赏墨哈谯笪年爱阳佟言福',
                    //双字
                    str2 = '万俟司马上官欧阳夏侯诸葛闻人东方赫连皇甫尉迟公羊澹台公冶宗政濮阳淳于单于太叔申屠公孙仲孙轩辕令狐钟离宇文长孙慕容鲜于闾丘司徒司空丌官司寇子车颛孙端木巫马公西漆雕乐正壤驷公良拓跋夹谷宰父谷梁段干百里东郭南门呼延羊舌微生梁丘左丘东门西门南宫第五',
                    //姓
                    surName = [],
                    //名
                    lastName = '',
                    sex = Math.ceil((Math.random() * 10)) % 2;
                surName = str.split('');
                for (let i = 0; i < str2.length; i++) {
                    if (i % 2 === 1) {
                        surName.push(str2[i - 1] + str2[i]);
                    }
                }
                for (let i = 0; i <= sex; i++) {
                    let str = '\\u' + (Math.round(Math.random() * 20901) + 19968).toString(16);
                    // console.log(unescape(str.replace(/\\u/g, "%u")));
                    lastName += unescape(str.replace(/\\u/g, "%u"));
                }
                return {
                    name: surName[Math.ceil(Math.random() * 504)] + lastName,
                    sNo: parseInt(sNo),
                    birth: 1970 + Math.round(50 * Math.random()),
                    sex: sex,
                    phone: '1' + Math.ceil(Math.random() * 10000000000),
                    email: Math.ceil(Math.random() * 1000000) + '@163.com',
                    address: '北京',
                    user_id: JSON.parse(sessionStorage.getItem('userMessage')).id
                }
            },
            // 提交
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        api.addStudent({
                            sNo: this.ruleForm.sNo,
                            name: this.ruleForm.studentName,
                            email: this.ruleForm.email,
                            sex: this.ruleForm.sex,
                            birth: this.ruleForm.birth,
                            phone: this.ruleForm.phone,
                            address: this.ruleForm.address,
                            user_id: JSON.parse(sessionStorage.getItem('userMessage')).id
                        }).then(res => {
                            this.$message.success('添加成功');
                            console.log(res);
                            this.$router.push({name: 'index'});
                        })
                    } else {
                        this.$message.error('请检查表单信息,确认无误再提交');
                        return false;
                    }
                });
            },
            // 重置
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
  .content.add-student {
    margin: 0 auto;
    min-width: 500px;
    width: 100%;
    height: 100%;
    background-color: #eee;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
