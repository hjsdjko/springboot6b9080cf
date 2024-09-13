<template>
	<div class="main-content" :style='{"width":"100%","padding":"30px","margin":"0","overflow-y":"auto","background":"#fff","height":"auto"}'>
		<!-- 列表页 -->
		<template v-if="showFlag">
			<el-form class="center-form-pv" :style='{"margin":"0 0 20px"}' :inline="true" :model="searchForm">
				<el-row :style='{"display":"block"}' >
					<div :style='{"margin":"0 10px 0 0","display":"inline-block"}'>
						<label :style='{"margin":"0 10px 0 0","color":"#666","display":"none","lineHeight":"40px","fontSize":"14px","fontWeight":"500","height":"40px"}' class="item-label">用户名</label>
						<el-input v-model="searchForm.nickname" placeholder="用户名" @keydown.enter.native="search()" clearable></el-input>
					</div>
					<div :style='{"margin":"0 10px 0 0","display":"inline-block"}'>
						<label :style='{"margin":"0 10px 0 0","color":"#666","display":"none","lineHeight":"40px","fontSize":"14px","fontWeight":"500","height":"40px"}' class="item-label">评论内容</label>
						<el-input v-model="searchForm.content" placeholder="评论内容" @keydown.enter.native="search()" clearable></el-input>
					</div>
					<el-button class="search" type="success" @click="search()">
						<span class="icon iconfont icon-chakan12" :style='{"margin":"0 2px","fontSize":"16px","color":"#fff","height":"40px"}'></span>
						查询
					</el-button>
				</el-row>
				<el-row :style='{"display":"block"}'>
					<el-button :style='{"border":"2px solid #3388cb","cursor":"pointer","padding":"0 24px","outline":"none","color":"#fff","borderRadius":"4px","background":"#3388cb","width":"auto","fontSize":"16px","height":"40px"}' type="success" @click="backClick()">返回</el-button>
				</el-row>

				<el-row class="actions" :style='{"flexWrap":"wrap","margin":"20px 0","display":"flex"}'>
					<el-button class="add" v-if="isAuth('discusslingshixinxi','新增')" type="success" @click="addOrUpdateHandler()">
						<span class="icon iconfont icon-tianjia14" :style='{"margin":"0 2px","fontSize":"14px","color":"#8a99b2","height":"40px"}'></span>
						添加
					</el-button>
					<el-button class="del" v-if="isAuth('discusslingshixinxi','删除')" :disabled="dataListSelections.length?false:true" type="danger" @click="deleteHandler()">
						<span class="icon iconfont icon-shanchu8" :style='{"margin":"0 2px","fontSize":"14px","color":"#8e9db5","height":"40px"}'></span>
						删除
					</el-button>



				</el-row>
			</el-form>
			<div :style='{"width":"100%","padding":"0","fontSize":"12px"}'>
				<el-table class="tables"
					:stripe='false'
					:style='{"width":"100%","padding":"0","borderColor":"#eee","borderStyle":"solid","borderWidth":"1px 0 0 1px","background":"#fff"}' 
					:border='true'
					:data="dataList"
					v-loading="dataListLoading"
				@selection-change="selectionChangeHandler">
					<el-table-column :resizable='true' type="selection" align="center" width="50"></el-table-column>
					<el-table-column :resizable='true' :sortable='false' label="序号" type="index" width="50" />
					<el-table-column :resizable='true' :sortable='false'  
						prop="nickname"
						label="用户名">
						<template slot-scope="scope">
							{{scope.row.nickname}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false' prop="content" label="评论内容">
						<template slot-scope="scope">
                            <span v-html="scope.row.content"></span>
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false' prop="reply" label="回复内容">
						<template slot-scope="scope">
                            <span v-html="scope.row.reply"></span>
						</template>
					</el-table-column>
					<el-table-column width="300" label="操作">
						<template slot-scope="scope">
							<el-button class="edit" v-if=" isAuth('discusslingshixinxi','修改') " type="success" @click="addOrUpdateHandler(scope.row.id)">
								<span class="icon iconfont icon-xihuan" :style='{"margin":"0 2px","fontSize":"14px","color":"rgb(139, 154, 179)","display":"none","height":"40px"}'></span>
								修改
							</el-button>

							<el-button class="view" v-if="isAuth('discusslingshixinxi','查看评论')" type="success" @click="disscussListHandler(scope.row.id)">
								<span class="icon iconfont icon-xihuan" :style='{"margin":"0 2px","fontSize":"14px","color":"rgb(139, 154, 179)","display":"none","height":"40px"}'></span>
								查看评论
							</el-button>


							<el-button class="btn8" type="success" @click="addOrUpdateHandler(scope.row.id)">
								<span class="icon iconfont icon-xihuan" :style='{"margin":"0 2px","fontSize":"14px","color":"rgb(139, 154, 179)","display":"none","height":"32px"}'></span>
								回复
							</el-button>

							<el-button class="del" v-if="" type="primary" @click="deleteHandler(scope.row.id ,scope.row.refid )">
								<span class="icon iconfont icon-xihuan" :style='{"margin":"0 2px","fontSize":"14px","color":"rgb(139, 154, 179)","display":"none","height":"40px"}'></span>
								删除
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<el-pagination
				@size-change="sizeChangeHandle"
				@current-change="currentChangeHandle"
				:current-page="pageIndex"
				background
				:page-sizes="[10, 50, 100, 200]"
				:page-size="pageSize"
				:layout="layouts.join()"
				:total="totalPage"
				prev-text="< "
				next-text="> "
				:hide-on-single-page="true"
				:style='{"width":"100%","padding":"0","margin":"20px 0 0","whiteSpace":"nowrap","color":"#333","fontWeight":"500"}'
			></el-pagination>
		</template>
		
		<!-- 添加/修改页面  将父组件的search方法传递给子组件-->
		<add-or-update v-if="addOrUpdateFlag" :parent="this" ref="addOrUpdate"></add-or-update>





	</div>
</template>

<script>
import axios from 'axios'
import AddOrUpdate from "./add-or-update";
	export default {
		data() {
			return {
				searchForm: {
					key: ""
				},
				form:{},
				dataList: [],
				pageIndex: 1,
				pageSize: 10,
				totalPage: 0,
				dataListLoading: false,
				dataListSelections: [],
				showFlag: true,
				addOrUpdateFlag:false,
				layouts: ["total","prev","pager","next","sizes","jumper"],
			};
		},
		created() {
			this.init();
			this.getDataList();
			this.contentStyleChange()
		},
		mounted() {
		},
		filters: {
			htmlfilter: function (val) {
				return val.replace(/<[^>]*>/g).replace(/undefined/g,'');
			}
		},
		computed: {
			tablename(){
				return this.$storage.get('sessionTable')
			},
		},
		components: {
			AddOrUpdate,
		},
		methods: {
			contentStyleChange() {
				this.contentPageStyleChange()
			},
			// 分页
			contentPageStyleChange(){
				let arr = []

				// if(this.contents.pageTotal) arr.push('total')
				// if(this.contents.pageSizes) arr.push('sizes')
				// if(this.contents.pagePrevNext){
				//   arr.push('prev')
				//   if(this.contents.pagePager) arr.push('pager')
				//   arr.push('next')
				// }
				// if(this.contents.pageJumper) arr.push('jumper')
				// this.layouts = arr.join()
				// this.contents.pageEachNum = 10
			},






    init () {
    },
    search() {
      this.pageIndex = 1;
      this.getDataList();
    },

    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      let params = {
        page: this.pageIndex,
        limit: this.pageSize,
        sort: 'id',
        order: 'desc',
        refid : this.$route.query.refid,
      }
           if(this.searchForm.nickname!='' && this.searchForm.nickname!=undefined){
            params['nickname'] = '%' + this.searchForm.nickname + '%'
          }
           if(this.searchForm.content!='' && this.searchForm.content!=undefined){
            params['content'] = '%' + this.searchForm.content + '%'
          }
			let user = JSON.parse(this.$storage.getObj('userForm'))
			console.log(user)
			this.$http({
				url: "discusslingshixinxi/page",
				method: "get",
				params: params
			}).then(({ data }) => {
				if (data && data.code === 0) {
					this.dataList = data.data.list;
					this.totalPage = data.data.total;
				} else {
					this.dataList = [];
					this.totalPage = 0;
				}
				this.dataListLoading = false;
			});
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    },
    // 多选
    selectionChangeHandler(val) {
      this.dataListSelections = val;
    },
    // 添加/修改
    addOrUpdateHandler(id,type) {
      this.showFlag = false;
      this.addOrUpdateFlag = true;
      this.crossAddOrUpdateFlag = false;
      if(type!='info'){
        type = 'else';
      }
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id,type);
      });
    },
    // 查看评论
    disscussListHandler(id,type) {
	this.$router.push({path:'/discussdiscusslingshixinxi',query:{refid:id}});
    },
	backClick(){
		history.back()
	},
    // 下载
    download(file){
      let arr = file.replace(new RegExp('upload/', "g"), "")
      axios.get(this.$base.url + 'file/download?fileName=' + arr, {
      	headers: {
      		token: this.$storage.get('Token')
      	},
      	responseType: "blob"
      }).then(({
      	data
      }) => {
      	const binaryData = [];
      	binaryData.push(data);
      	const objectUrl = window.URL.createObjectURL(new Blob(binaryData, {
      		type: 'application/pdf;chartset=UTF-8'
      	}))
      	const a = document.createElement('a')
      	a.href = objectUrl
      	a.download = arr
      	// a.click()
      	// 下面这个写法兼容火狐
      	a.dispatchEvent(new MouseEvent('click', {
      		bubbles: true,
      		cancelable: true,
      		view: window
      	}))
      	window.URL.revokeObjectURL(data)
      },err=>{
		  axios.get((location.href.split(this.$base.name).length>1 ? location.href.split(this.$base.name)[0] :'') + this.$base.name + '/file/download?fileName=' + arr, {
		  	headers: {
		  		token: this.$storage.get('Token')
		  	},
		  	responseType: "blob"
		  }).then(({
		  	data
		  }) => {
		  	const binaryData = [];
		  	binaryData.push(data);
		  	const objectUrl = window.URL.createObjectURL(new Blob(binaryData, {
		  		type: 'application/pdf;chartset=UTF-8'
		  	}))
		  	const a = document.createElement('a')
		  	a.href = objectUrl
		  	a.download = arr
		  	// a.click()
		  	// 下面这个写法兼容火狐
		  	a.dispatchEvent(new MouseEvent('click', {
		  		bubbles: true,
		  		cancelable: true,
		  		view: window
		  	}))
		  	window.URL.revokeObjectURL(data)
		  })
	  })
    },
	// 预览
	preClick(file){
		if(!file){
			return false
		}
		window.open((location.href.split(this.$base.name).length>1 ? location.href.split(this.$base.name)[0] + this.$base.name + '/' + file :this.$base.url + file))
	},
	discusslingshixinxistatusChange(e,row){
		if(row.status==0){
			row.passwordwrongnum = 0
		}
		this.$http({
			url:'discusslingshixinxi/update',
			method:'post',
			data:row
		}).then(res=>{
			if(row.status==1){
				this.$message.error('该用户已锁定')
			}else{
				this.$message.success('该用户已解除锁定')
			}
		})
	},
    // 删除
    async deleteHandler(id ,refid ) {
		var ids = id? [Number(id)]: this.dataListSelections.map(item => {
			return Number(item.id);
		});
		await this.$confirm(`确定进行[${id ? "删除" : "批量删除"}]操作?`, "提示", {
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: "warning"
		}).then(async () => {
			await this.$http({
				url: "discusslingshixinxi/delete",
				method: "post",
				data: ids
			}).then(async ({ data }) => {
				if (data && data.code === 0) {
					this.$http({
						url: 'lingshixinxi/info/' + refid,
						method: "get",
					}).then(res=>{
						if(res.data&&res.data.code==0){
							res.data.data.discussnum = res.data.data.discussnum - Number(ids.length)
							this.$http({
								url: 'lingshixinxi/update',
								method: "post",
								data:res.data.data
							}).then(res1=>{
								if(res1.data&&res1.data.code==0){
									this.$message({
										message: "操作成功",
										type: "success",
										duration: 1500,
										onClose: () => {
											this.search();
										}
									});
								}
							})
						}
					})
            
				} else {
					this.$message.error(data.msg);
				}
			});
		});
    },


  }

};
</script>
<style lang="scss" scoped>
	
	.center-form-pv {
	  .el-date-editor.el-input {
	    width: auto;
	  }
	}
	
	.el-input {
	  width: auto;
	}
	
	// form
	.center-form-pv .el-input /deep/ .el-input__inner {
				border: 2px solid #c9d0dc;
				border-radius: 20px;
				padding: 0 12px;
				color: #8696b0;
				width: 170px;
				font-size: 14px;
				height: 40px;
			}
	
	.center-form-pv .el-select /deep/ .el-input__inner {
				border: 2px solid #c9d0dc;
				border-radius: 20px;
				padding: 0 10px;
				outline: none;
				color: #8696b0;
				width: 170px;
				font-size: 14px;
				height: 40px;
			}
	
	.center-form-pv .el-date-editor /deep/ .el-input__inner {
				border: 2px solid #c9d0dc;
				border-radius: 20px;
				padding: 0 10px 0 30px;
				outline: none;
				color: #8696b0;
				width: 170px;
				font-size: 14px;
				height: 40px;
			}
	
	.center-form-pv .search {
				border: 2px solid #3388cb;
				cursor: pointer;
				border-radius: 4px;
				padding: 0 24px;
				outline: none;
				color: #fff;
				background: #3388cb;
				width: auto;
				font-size: 16px;
				height: 40px;
			}
	
	.center-form-pv .search:hover {
				opacity: 0.8;
			}
	
	.center-form-pv .actions .add {
				border: 2px solid #d4d8df;
				cursor: pointer;
				border-radius: 4px;
				padding: 0 10px;
				margin: 4px;
				outline: none;
				color: #8e9db5;
				background: #fff;
				width: auto;
				font-size: 14px;
				height: 40px;
			}
	
	.center-form-pv .actions .add:hover {
				color: #3388cb;
				border-color: #3388cb;
			}
	
	.center-form-pv .actions .del {
				border: 1px solid #d4d8df;
				cursor: pointer;
				border-radius: 4px;
				padding: 0 10px;
				margin: 4px;
				outline: none;
				color: #8e9db5;
				background: #fff;
				width: auto;
				font-size: 14px;
				height: 40px;
			}
	
	.center-form-pv .actions .del:hover {
				border: 1px solid #3388cb;
				color: #3388cb;
			}
	
	.center-form-pv .actions .statis {
				border: 1px solid #d4d8df;
				cursor: pointer;
				border-radius: 4px;
				padding: 0 10px;
				margin: 4px;
				outline: none;
				color: #9ca9be;
				background: #fff;
				width: auto;
				font-size: 14px;
				height: 40px;
			}
	
	.center-form-pv .actions .statis:hover {
				border: 1px solid #3388cb;
				color: #3388cb;
			}
	
	.center-form-pv .actions .btn18 {
				border: 2px solid #d4d8df;
				cursor: pointer;
				border-radius: 4px;
				padding: 0 10px;
				margin: 4px;
				outline: none;
				color: #8b9ab3;
				background: #fff;
				width: auto;
				font-size: 14px;
				height: 40px;
			}
	
	.center-form-pv .actions .btn18:hover {
				border: 1px solid #3388cb;
				color: #3388cb;
			}
	
	// table
	.el-table /deep/ .el-table__header-wrapper thead {
				color: #999;
				background: red;
				font-weight: 500;
				width: 100%;
			}
	
	.el-table /deep/ .el-table__header-wrapper thead tr {
				background: #eef3f7;
			}
	
	.el-table /deep/ .el-table__header-wrapper thead tr th {
				padding: 6px 0;
				color: #808080;
				background: #eef3f7;
				font-weight: normal;
				border-color: #ddd;
				border-width: 1px 1px 0 0;
				border-style: solid;
				text-align: left;
			}

	.el-table /deep/ .el-table__header-wrapper thead tr th .cell {
				padding: 0 2px;
				word-wrap: normal;
				word-break: break-all;
				white-space: normal;
				font-weight: bold;
				display: inline-block;
				vertical-align: middle;
				width: 100%;
				font-size: 12px;
				line-height: 24px;
				position: relative;
				text-overflow: ellipsis;
			}

	
	.el-table /deep/ .el-table__body-wrapper tbody {
				width: 100%;
			}

	.el-table /deep/ .el-table__body-wrapper tbody tr {
				background: #fff;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td {
				padding: 4px 0;
				color: #666;
				background: #fff;
				border-color: #eee;
				border-width: 1px 1px 0 0;
				border-style: solid;
				text-align: left;
			}
	
		
	.el-table /deep/ .el-table__body-wrapper tbody tr:hover td {
				padding: 4px 0;
				color: #444;
				background: #f6f6f6;
				border-color: #eee;
				border-width: 1px 1px 0 0;
				border-style: solid;
				text-align: left;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td {
				padding: 4px 0;
				color: #666;
				background: #fff;
				border-color: #eee;
				border-width: 1px 1px 0 0;
				border-style: solid;
				text-align: left;
			}

	.el-table /deep/ .el-table__body-wrapper tbody tr td .cell {
				padding: 0 2px;
				overflow: hidden;
				word-break: break-all;
				white-space: normal;
				font-size: 12px;
				line-height: 24px;
				text-overflow: ellipsis;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .view {
				border: 2px solid rgb(212, 216, 223);
				cursor: pointer;
				border-radius: 4px;
				padding: 0 5px;
				margin: 0 5px 5px 0;
				color: rgb(139, 154, 179);
				background: rgb(255, 255, 255);
				width: auto;
				font-size: 13px;
				height: 32px;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .view:hover {
				border: 2px solid #409eff;
				color: #409eff;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .add {
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .add:hover {
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .edit {
				border: 2px solid rgb(212, 216, 223);
				cursor: pointer;
				border-radius: 4px;
				padding: 0 5px;
				margin: 0 5px 5px 0;
				outline: none;
				color: rgb(139, 154, 179);
				background: rgb(255, 255, 255);
				width: auto;
				font-size: 13px;
				height: 32px;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .edit:hover {
				border: 2px solid #409eff;
				color: #409eff;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .del {
				border: 2px solid rgb(212, 216, 223);
				cursor: pointer;
				border-radius: 4px;
				padding: 0 5px;
				margin: 0 5px 5px 0;
				outline: none;
				color: rgb(139, 154, 179);
				background: rgb(255, 255, 255);
				width: auto;
				font-size: 13px;
				height: 32px;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .del:hover {
				border: 2px solid #409eff;
				color:  #409eff;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .btn8 {
				border: 2px solid rgb(212, 216, 223);
				cursor: pointer;
				border-radius: 4px;
				padding: 0 5px;
				margin: 0 5px 5px 0;
				outline: none;
				color: rgb(139, 154, 179);
				background: rgb(255, 255, 255);
				width: auto;
				font-size: 13px;
				height: 32px;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .btn8:hover {
				border: 2px solid #409eff;
				color: #409eff;
			}
	
	// pagination
	.main-content .el-pagination /deep/ .el-pagination__total {
				margin: 0 10px 0 0;
				color: #666;
				font-weight: 400;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .btn-prev {
				border: none;
				border-radius: 2px;
				padding: 0;
				margin: 0 5px;
				color: #666;
				background: #f4f4f5;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				min-width: 35px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .btn-next {
				border: none;
				border-radius: 2px;
				padding: 0;
				margin: 0 5px;
				color: #666;
				background: #f4f4f5;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				min-width: 35px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .btn-prev:disabled {
				border: none;
				cursor: not-allowed;
				border-radius: 2px;
				padding: 0;
				margin: 0 5px;
				color: #C0C4CC;
				background: #f4f4f5;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .btn-next:disabled {
				border: none;
				cursor: not-allowed;
				border-radius: 2px;
				padding: 0;
				margin: 0 5px;
				color: #C0C4CC;
				background: #f4f4f5;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				height: 28px;
			}

	.main-content .el-pagination /deep/ .el-pager {
				padding: 0;
				margin: 0;
				display: inline-block;
				vertical-align: top;
			}

	.main-content .el-pagination /deep/ .el-pager .number {
				cursor: pointer;
				padding: 0 4px;
				margin: 0 5px;
				color: #666;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				border-radius: 2px;
				background: #f4f4f5;
				text-align: center;
				min-width: 30px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pager .number:hover {
				cursor: pointer;
				padding: 0 4px;
				margin: 0 5px;
				color: #409EFF;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				border-radius: 2px;
				background: #f4f4f5;
				text-align: center;
				min-width: 30px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pager .number.active {
				cursor: default;
				padding: 0 4px;
				margin: 0 5px;
				color: #FFF;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				border-radius: 2px;
				background: #2964af;
				text-align: center;
				min-width: 30px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes {
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input {
				margin: 0 5px;
				width: 100px;
				position: relative;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input .el-input__inner {
				border: 1px solid #DCDFE6;
				cursor: pointer;
				padding: 0 25px 0 8px;
				color: #606266;
				display: inline-block;
				font-size: 13px;
				line-height: 28px;
				border-radius: 3px;
				outline: 0;
				background: #FFF;
				width: 100%;
				text-align: center;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input span.el-input__suffix {
				top: 0;
				position: absolute;
				right: 0;
				height: 100%;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input .el-input__suffix .el-select__caret {
				cursor: pointer;
				color: #C0C4CC;
				width: 25px;
				font-size: 14px;
				line-height: 28px;
				text-align: center;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__jump {
				margin: 0 0 0 24px;
				color: #606266;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__jump .el-input {
				border-radius: 3px;
				padding: 0 2px;
				margin: 0 2px;
				display: inline-block;
				width: 50px;
				font-size: 14px;
				line-height: 18px;
				position: relative;
				text-align: center;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__jump .el-input .el-input__inner {
				border: 1px solid #DCDFE6;
				cursor: pointer;
				padding: 0 3px;
				color: #606266;
				display: inline-block;
				font-size: 14px;
				line-height: 28px;
				border-radius: 3px;
				outline: 0;
				background: #FFF;
				width: 100%;
				text-align: center;
				height: 28px;
			}
	
	// list one
	.one .list1-view {
				border:  2px solid rgb(212, 216, 223);
				cursor: pointer;
				border-radius: 4px;
				padding: 0 15px;
				margin: 0;
				outline: none;
				color: rgb(142, 157, 181);
				background: #fff;
				width: auto;
				font-size: 14px;
				height: 40px;
			}
	
	.one .list1-view:hover {
				border: 1px solid #2b68b5;
				color: #2b68b5;
			}
	
	.one .list1-edit {
				border: 1px solid rgb(212, 216, 223)  ;
				cursor: pointer;
				border-radius: 4px;
				padding: 0 15px;
				margin: 0;
				outline: none;
				color:  rgb(142, 157, 181);
				background: #fff;
				width: auto;
				font-size: 14px;
				height: 40px;
			}
	
	.one .list1-edit:hover {
				border: 1px solid #2b68b5;
				color: #2b68b5;
			}
	
	.one .list1-del {
				border: 1px solid rgb(212, 216, 223)  ;
				cursor: pointer;
				border-radius: 4px;
				padding: 0 15px;
				margin: 0;
				outline: none;
				color: rgb(142, 157, 181);
				background: #fff;
				width: auto;
				font-size: 14px;
				height: 40px;
			}
	
	.one .list1-del:hover {
				border: 1px solid #2b68b5;
				color:  #2b68b5;
			}
	
	.one .list1-btn8 {
				border: 1px solid rgb(212, 216, 223)  ;
				cursor: pointer;
				border-radius: 4px;
				padding: 0 24px;
				margin: 4px;
				outline: none;
				color: rgb(142, 157, 181);
				background: #fff;
				width: auto;
				font-size: 14px;
				height: 40px;
			}
	
	.one .list1-btn8:hover {
				border: 1px solid #2b68b5;
				color: #2b68b5;
			}
	
	.main-content .el-table .el-switch {
				display: inline-flex;
				vertical-align: middle;
				line-height: 30px;
				position: relative;
				align-items: center;
				height: 30px;
			}
	.main-content .el-table .el-switch /deep/ .el-switch__label--left {
				cursor: pointer;
				margin: 0 10px 0 0;
				color: #333;
				font-weight: 500;
				display: inline-block;
				vertical-align: middle;
				font-size: 16px;
				transition: .2s;
				height: 30px;
			}
	.main-content .el-table .el-switch /deep/ .el-switch__label--right {
				cursor: pointer;
				margin: 0 0 0 10px;
				color: #333;
				font-weight: 500;
				display: inline-block;
				vertical-align: middle;
				font-size: 16px;
				transition: .2s;
				height: 30px;
			}
	.main-content .el-table .el-switch /deep/ .el-switch__core {
				border: 1px solid #2964af;
				cursor: pointer;
				border-radius: 15px;
				margin: 0;
				outline: 0;
				background: #2964af;
				display: inline-block;
				width: 36px;
				box-sizing: border-box;
				transition: border-color .3s,background-color .3s;
				height: 18px;
			}
	.main-content .el-table .el-switch /deep/ .el-switch__core::after {
				border-radius: 100%;
				top: 1px;
				left: 1px;
				background: #FFF;
				width: 14px;
				position: absolute;
				transition: all .3s;
				height: 14px;
			}
	.main-content .el-table .el-switch.is-checked /deep/ .el-switch__core::after {
				margin: 0 0 0 -16px;
				left: 100%;
			}
	
	.main-content .el-table .el-rate /deep/ .el-rate__item {
				cursor: pointer;
				display: inline-block;
				vertical-align: middle;
				font-size: 0;
				position: relative;
			}
	.main-content .el-table .el-rate /deep/ .el-rate__item .el-rate__icon {
				margin: 0 3px;
				display: inline-block;
				font-size: 18px;
				position: relative;
				transition: .3s;
			}

</style>
