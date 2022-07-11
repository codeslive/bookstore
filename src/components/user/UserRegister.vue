<template>
  <div class="regter">
    <div class="register">
      <aside>
        <p class="account">
          <label>用户名称：</label><input type="text" v-model="form.username" placeholder="请输入用户名" @blur="checkUname()" />
        </p>
        <p>
          <label>用户密码：</label><input type="password" v-model="form.password" placeholder="请输入密码" />
        </p>
        <p>
          <label>确认密码：</label><input type="password" v-model="form.newpassword" placeholder="请再次输入密码" @blur="checkInfo()" />
        </p>
        <p>
          <label>手机号码：</label><input type="phone" v-model="form.phone" placeholder="请输入手机号" @blur="checkPhone()" />
        </p>
        <p>
          <el-button type="primary" @click="Register()">立即注册</el-button>
        </p>
      </aside>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "UserRegister",
  data () {
    return {
      form: {
        username: "",
        password: "",
        newpassword: "",
        uname: false,
        phone: "",
        show: false,
        message: "",
        bool: "",
      },
    };
  },

  methods: {
    //导入vuex
    ...mapMutations("user", ["getUser"]),
    //判断账户是否已存在
    checkUname () {
      if (this.form.username != "") {
        this.axios
          .get(`/user/${this.form.username}`)
          .then((res) => {
            if (res.data.data) {
              this.form.bool = false;
              this.message = "账号已存在";
              this.openTip(0);
            } else {
              this.form.bool = true;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    //检查密码
    checkInfo () {
      if (this.form.password != "") {
        if (this.form.password.length >= 6) {
          if (this.form.newpassword == this.form.password) {
            return true;
          } else {
            this.message = "两次输入密码不一致~";
            this.openTip(0);
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    },

    //手机号校验
    checkPhone () {
      //手机号验证正则
      let reg =
        /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/;

      if (this.form.phone != "" && reg.test(this.form.phone)) {
        return true;
      } else {
        if (this.form.phone.length > 0) {
          this.message = "手机号格式错误~";
          console.log(this.message);

          this.openTip(0);
          return false;
        } else {
          return true;
        }
      }
    },

    //注册
    ...mapMutations("user", ["getUser"]),
    ...mapMutations("user", ["getName"]),
    ...mapMutations("user", ["Shows"]),
    Register () {
      if (this.form.bool && this.checkInfo() && this.checkPhone()) {
        //打包数据
        let obj = {
          username: this.form.username,
          password: this.form.password,
          mobile: this.form.phone,
        };

        //发起post请求
        this.axios
          .post(`user/register`, obj, {
            headers: { "Content-Type": "application/json" },
          })
          .then((res) => {
            if (res.data.code == 200) {
              //把数据存入vuex(user);
              this.getUser(res.data.data);
              this.getName(res.data.data.username);
              this.Shows(false);

              //注册成功登录提示
              this.message = "注册成功~";

              //清空输入框的数据
              this.form.username = '',
                this.form.password = '',
                this.form.newpassword = '',
                this.form.phone = ''

              //返回首页
              this.$router.push('/');

            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        //注册失败,让登录注册按钮继续存在
        this.Shows(true);
      }
    },

    //信息弹窗
    openTip (id) {
      if (id == 0) {
        this.$message.error({
          duration: 1500,
          message: this.message,
        });
      } else {
        this.$message.success({
          duration: 1500,
          message: this.message,
        });
      }
    },
  },
};
</script>

<style scoped>
.register {
  width: 40%;
  height: 360px;
  background-color: rgb(217, 222, 255);
  margin: 0 auto;
  text-align: center;
  margin-top: 20px;
}

.account {
  padding-top: 25px;
}

.register input {
  width: 60%;
  height: 33px;
  border-radius: 5px;
  text-indent: 1rem;
  outline: none;
  border: 1px solid gainsboro;
}

.register .el-button {
  width: 75%;
  height: 40px;
}
</style>>

