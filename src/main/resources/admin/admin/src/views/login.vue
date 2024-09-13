<template>
  <div>
    <div class="container" :style='{"minHeight":"100vh","width":"100%","alignItems":"center","background":"url(http://codegen.caihongy.cn/20240131/34b914ba171d428788f8a9907f1763f7.png) no-repeat center center / cover","justifyContent":"center","display":"flex"}'>
      <el-form :style='{"padding":"0 20px 0px 210px","margin":"4.2% 0 0 0","borderRadius":"10px","background":"url(http://codegen.caihongy.cn/20240131/265fafe387a0422a9378e317f182ba61.png) no-repeat left top / 100% 100%","flexDirection":"column","display":"flex","height":"auto"}'>
        <div v-if="true" :style='{"padding":"20px","color":"#999=","textAlign":"center","background":"#fff","letterSpacing":"3px","fontSize":"18px","fontWeight":"400"}' class="title-container">基于web的积分制零食自选销售平台的设计与实现登录</div>
        <div v-if="loginType==1" class="list-item" :style='{"padding":"10px 0 10px 40px","flexWrap":"wrap","background":"#fff","display":"flex"}'>
          <div v-if="true" class="lable" :style='{"width":"100%","lineHeight":"44px","fontSize":"16px","color":"#999999","textAlign":"left","fontWeight":"400"}'>用户名：</div>
          <input :style='{"borderColor":"#999","color":"#8696b0","outlineOffset":"4px","borderWidth":"0 0 1px 0","width":"300px","fontSize":"14px","borderStyle":"solid","height":"44px"}' placeholder="请输入用户名" name="username" type="text" v-model="rulesForm.username">
        </div>
        <div v-if="loginType==1" class="list-item" :style='{"padding":"10px 0 10px 40px","flexWrap":"wrap","background":"#fff","display":"flex"}'>
          <div v-if="true" class="lable" :style='{"width":"100%","lineHeight":"44px","fontSize":"16px","color":"#999999","textAlign":"left","fontWeight":"400"}'>密码：</div>
          <input :style='{"borderColor":"#999","color":"#8696b0","outlineOffset":"4px","borderWidth":"0 0 1px 0","width":"300px","fontSize":"14px","borderStyle":"solid","height":"44px"}' placeholder="请输入密码" name="password" type="password" v-model="rulesForm.password">
        </div>

		<div class="list-item select" :style='{"padding":"10px 0 10px 40px","flexWrap":"wrap","background":"#fff","display":"flex"}' v-if="roles.length>1">
			<div v-if="true" class="lable" :style='{"width":"100%","lineHeight":"44px","fontSize":"16px","color":"#999999","textAlign":"left","fontWeight":"400"}'>角色：</div>
		  <el-select v-model="rulesForm.role" placeholder="请选择角色">
		    <el-option v-if="loginType==1||(loginType==2&&item.roleName!='管理员')" v-for="item in roles" :key="item.roleName" :label="item.roleName" :value="item.roleName" />
		  </el-select>
		</div>

		
        <div :style='{"padding":"0 40px","flex-direction":"column","flexWrap":"wrap","background":"#fff","flex":"1","display":"flex"}'>
          <el-button v-if="loginType==1" :style='{"border":"0","cursor":"pointer","padding":"0 24px","outline":"none","margin":"10px 0","color":"#fff","borderRadius":"4px","background":"#2e8ffc","width":"87%","fontSize":"14px","height":"44px"}' type="primary" @click="login()" class="loginInBt">登录</el-button>
        </div>
      </el-form>

    </div>
  </div>
</template>
<script>
import menu from "@/utils/menu";
export default {
  data() {
    return {
		verifyCheck2: false,
		flag: false,
      baseUrl:this.$base.url,
      loginType: 1,
      rulesForm: {
        username: "",
        password: "",
        role: "",
      },
      menus: [],
      roles: [],
      tableName: "",
    };
  },
  mounted() {
    let menus = menu.list();
    this.menus = menus;

    for (let i = 0; i < this.menus.length; i++) {
      if (this.menus[i].hasBackLogin=='是') {
        this.roles.push(this.menus[i])
      }
    }

  },
  created() {

  },
  destroyed() {
	    },
  components: {
  },
  methods: {

    //注册
    register(tableName){
		this.$storage.set("loginTable", tableName);
		this.$router.push({path:'/register',query:{pageFlag:'register'}})
    },
    // 登陆
    login() {

		if (!this.rulesForm.username) {
			this.$message.error("请输入用户名");
			return;
		}
		if (!this.rulesForm.password) {
			this.$message.error("请输入密码");
			return;
		}
		if(this.roles.length>1) {
			if (!this.rulesForm.role) {
				this.$message.error("请选择角色");
				return;
			}

			let menus = this.menus;
			for (let i = 0; i < menus.length; i++) {
				if (menus[i].roleName == this.rulesForm.role) {
					this.tableName = menus[i].tableName;
				}
			}
		} else {
			this.tableName = this.roles[0].tableName;
			this.rulesForm.role = this.roles[0].roleName;
		}
		
		this.loginPost()
    },
	loginPost() {
		this.$http({
			url: `${this.tableName}/login?username=${this.rulesForm.username}&password=${this.rulesForm.password}`,
			method: "post"
		}).then(({ data }) => {
			if (data && data.code === 0) {
				this.$storage.set("Token", data.token);
				this.$storage.set("role", this.rulesForm.role);
				this.$storage.set("sessionTable", this.tableName);
				this.$storage.set("adminName", this.rulesForm.username);
				this.$router.replace({ path: "/" });
			} else {
				this.$message.error(data.msg);
			}
		});
	},
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  position: relative;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
      background: url(http://codegen.caihongy.cn/20240131/34b914ba171d428788f8a9907f1763f7.png) no-repeat center center / cover;
        
  .list-item /deep/ .el-input .el-input__inner {
		color: #8696b0;
		width: 300px;
		font-size: 14px;
		border-color: #999;
		outline-offset: 4px;
		border-width: 0 0 1px 0;
		border-style: solid;
		height: 44px;
	  }
  
  .list-item.select /deep/ .el-select .el-input__inner {
		border: 1px solid #999;
		border-radius: 0;
		padding: 0 10px;
		color: #999;
		width: 288px;
		font-size: 14px;
		border-width: 0 0 1px;
		height: 44px;
	  }
  
  .list-code /deep/ .el-input .el-input__inner {
  	  	border: 1px solid #999;
  	  	padding: 0 10px;
  	  	outline: none;
  	  	margin: 0 0 0 20px;
  	  	color: #8696b0;
  	  	width: 220px;
  	  	font-size: 14px;
  	  	height: 44px;
  	  }

  .list-type /deep/ .el-radio__input .el-radio__inner {
		background: rgba(53, 53, 53, 0);
		border-color: #666666;
	  }
  .list-type /deep/ .el-radio__input.is-checked .el-radio__inner {
        background: #3388cb;
        border-color: #3388cb;
      }
  .list-type /deep/ .el-radio__label {
		color: #666666;
		font-size: 14px;
	  }
  .list-type /deep/ .el-radio__input.is-checked+.el-radio__label {
        color: #3388cb;
        font-size: 14px;
      }
}

</style>
