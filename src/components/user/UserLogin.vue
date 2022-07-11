<template>
  <div class="userlogin">
    <div class="login">
      <aside>
        <p class="account">
          <label>账号：</label
          ><input
            type="text"
            v-model="form.username"
            placeholder="请输入用户名"
          />
        </p>
        <p>
          <label>密码：</label
          ><input
            type="password"
            v-model="form.password"
            placeholder="请输入密码"
          />
        </p>
        <p>
          <el-button type="primary" @click="userLogin()">登录</el-button>
        </p>
      </aside>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "UserLogin",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      userAll: [],
      tip: false, //控制消息弹窗的内容
    };
  },

  methods: {
    ...mapMutations("user", ["getUser"]),
    ...mapMutations("user", ["getName"]),
    ...mapMutations("user", ["Shows"]),
    userLogin() {
      if (this.form.username != "" && this.form.password != "") {
        let obj = {
          username: this.form.username,
          password: this.form.password,
        };
        this.axios
          .post(`user/login`, obj, {
            headers: { "Content-Type": "application/json" },
          })
          .then((res) => {
            if (res.status === 200) {
              if (res.data.data != null) {
                this.getUser(res.data.data);
                this.getName(res.data.data.username);
                this.Shows(false);
                this.openTip(0);
                //获取存到本地仓库的路由地址
                let path = localStorage.getItem("path");
                //登录成功后返回原地址
                this.$router.push(`${path}`);
              } else {
                this.openTip(1);
                this.Shows(true);
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    //提示
    openTip(id) {
      if (id == 0) {
        this.$message.success({
          duration: 1500,
          message: "登录成功",
        });
      } else {
        this.$message.error({
          duration: 1500,
          message: "账号或密码错误~",
        });
      }
    },
  },

  computed: {},

  created() {
    
    
  },
};
</script>

<style scope>
.login {
  width: 40%;
  height: 200px;
  background-color: rgb(217, 222, 255);
  margin: 0 auto;
  text-align: center;
  margin-top: 20px;
}

.account {
  padding-top: 25px;
}

.login input {
  width: 60%;
  height: 33px;
  border-radius: 5px;
  text-indent: 1rem;
  outline: none;
  border: 1px solid gainsboro;
}

.login .el-button {
  width: 70%;
  height: 36px;
}
</style>
