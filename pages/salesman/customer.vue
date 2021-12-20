<template>
	<view class="cus-list">
		<!-- 公共头部 -->
		<wz-navbar :filterData="filterData" :deptId="deptId" @onSelected="onSelected"></wz-navbar>
		<!-- 主体内容 -->
		<view class="container">
			<view class="top">
				<view class="salesman">
					<text class="bold">{{divisionData.name}}</text>
					<text>{{divisionData.roleName}}</text>
				</view>
				<view class="search">
					<u-search placeholder="搜索客户" v-model="keyword" :clearabled="true" :show-action="false"
						action-text="搜索" :animation="false" @custom="custom" @change="search" @search="search">
					</u-search>
				</view>
				<u-dropdown :title-size="30">
					<u-dropdown-item v-model="value1" :title="largeAreaName" :options="largeAreaList"
						@change="changeLargeArea" :height="600">
					</u-dropdown-item>
					<u-dropdown-item v-model="value2" :title="provinceName" :options="provinceList"
						@change="changeProvince" :height="600">
						</u-dropdown-item>
					<u-dropdown-item v-model="value3" :title="cityName" :options="cityList" @change="changeCity" :height="600">
					</u-dropdown-item>
					<u-dropdown-item v-model="value4" :title="areaName" :options="areaList" @change="changeArea" :height="600">
					</u-dropdown-item>
				</u-dropdown>
			</view>
			<view class="content">
				<view class="title">
					<view class="left">
						<text>客户列表</text>
					</view>
				</view>
				<view v-if="isData">
					<view class="co" v-for="(item,index) in customerList" :key="index">
						<view class="name">
							<view class="left">
								<text>{{item.name}}</text>
							</view>

							<view class="state" :style="{background:stateList[0].color}"
								v-if="item.qualificationStatus==0">
								<text>{{stateList[0].title}}</text>
							</view>
							<view class="state" :style="{background:stateList[1].color}"
								v-if="item.qualificationStatus==1">
								<text>{{stateList[1].title}}</text>
							</view>
							<view class="state" :style="{background:stateList[2].color}"
								v-if="item.qualificationStatus==2">
								<text>{{stateList[2].title}}</text>
							</view>
							<view class="state" :style="{background:stateList[3].color}"
								v-if="item.qualificationStatus==3">
								<text>{{stateList[3].title}}</text>
							</view>
							<view class="state" :style="{background:stateList[4].color}"
								v-if="item.qualificationStatus==4">
								<text>{{stateList[4].title}}</text>
							</view>

						</view>
						<view class="line">
							<text>{{item.organName}}</text>
						</view>
						<view class="line">
							<view class="time">
								<text>最近采购时间：</text>
								<text v-if="item.buyerTime">{{item.buyerTime}}</text>
							</view>
							<view class="channel">
								<text>采购资质到期时间：</text>
								<text
									v-if="item.buyerQualificationTime">{{item.buyerQualificationTime.slice(0,10)}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="no-data column flex-center-center" v-else>
					<image src="/static/images/index/search.png"></image>
					<text>暂无客户列表</text>
				</view>
			</view>

		</view>
		<u-toast ref="uToast" />
		<wz-loading v-if="showPageLoading" />
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				params: {
					year: true,
					month: true,
					day: false,
					hour: false,
					minute: false,
					second: false
				},
				keyword: '',
				value1: 1,
				value2: 2,
				value3: 3,
				value4: 4,
				largeAreaName: "全部",
				provinceName: "全部",
				cityName: "全部",
				areaName: "全部",
				largeAreaList: [],
				provinceList: [],
				cityList: [],
				areaList: [],
				show: true,
				name: '',
				deptName: '',
				roleName: '',
				dateData: "请选择日期",
				filterData: [],
				deptId: '',
				employeeId: '',
				regionId: '',
				provinceId: '',
				cityId: '',
				areaId: '',
				customerList: [],
				date: '',
				dateValue: [],
				stateList: [{
						id: '0',
						color: '#F7703B',
						title: '待审核'
					},
					{
						id: '1',
						color: '#3D9D32',
						title: '正常'
					},
					{
						id: '2',
						color: '#ef4136',
						title: '审核未通过'
					},
					{
						id: '3',
						color: '#7CCC72',
						title: '即将过期'
					},
					{
						id: '4',
						color: '#D7D2CF',
						title: '已过期'
					}
				],
				divisionData: {},
				showPageLoading: true,
				isData: false
			}
		},
		onLoad() {
			this.getDepartmentList();
		},
		methods: {
			// 获取事业部数据
			getDepartmentList() {
				this.$myRequest({
					method: "GET",
					url: "/oa/oaEmployee/getDepartmentList?roleType=1",
				}).then((res) => {
					if (res.success == 1) {
						var divisionData
						var deptId = app.globalData.deptId
						for (let i = 0; i < res.data.length; i++) {
							if (res.data[i].deptId == deptId) {
								divisionData = res.data[i]
							}
						}
						this.deptId = deptId
						this.filterData = res.data
						this.salesmanData = res.data
						this.divisionData = divisionData
						this.getOaAreaTree(divisionData);
						this.getClientList();
					} else {
						this.$refs.uToast.show({
							title: res.msg,
							type: 'error'
						})
					}
				})
			},

			// 获取日期时间
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			// 大区选择
			changeLargeArea(e) {
				var largeAreaValue = this.value1
				var largeAreaData = this.largeAreaList
				var labelIndex
				var provinceList
				for (let i = 0; i < largeAreaData.length; i++) {
					if (largeAreaData[i].value == largeAreaValue) {
						labelIndex = largeAreaData[i].label
						provinceList = largeAreaData[i].children
					}
				}
				var provinceData = []
				provinceData = provinceList.map(item => {
					return {
						label: item.areaName,
						value: item.id,
						children: item.children
					}
				})
				var all = '全部'
				this.regionId = e
				this.largeAreaName = labelIndex
				this.provinceList = provinceData
				this.provinceId = ''
				this.provinceName = all
				this.cityId = ''
				this.cityName = all
				this.cityList = []
				this.areaId = ''
				this.areaName = all
				this.areaList = []
				this.value2 = 2
				this.getClientList()
			},
			// 省选择
			changeProvince(e) {
				var provinceValue = this.value2
				var provinceData = this.provinceList
				var labelIndex
				var cityList
				for (let i = 0; i < provinceData.length; i++) {
					if (provinceData[i].value == provinceValue) {
						labelIndex = provinceData[i].label
						cityList = provinceData[i].children
					}
				}
				var cityData = []
				cityData = cityList.map(item => {
					return {
						label: item.areaName,
						value: item.id,
						children: item.children
					}
				})
				var all = '全部'
				this.provinceName = labelIndex
				this.provinceId = e
				this.cityList = cityData
				this.cityId = ''
				this.cityName = all
				this.areaId = ''
				this.areaName = all
				this.areaList = []
				this.value3 = 3
				this.getClientList()
			},
			// 城市选择
			changeCity(e) {
				var cityValue = this.value3
				var cityData = this.cityList
				var cityIndex
				var areaList
				for (let i = 0; i < cityData.length; i++) {
					if (cityData[i].value == cityValue) {
						cityIndex = cityData[i].label
						areaList = cityData[i].children
					}
				}
				var areaData = []
				areaData = areaList.map(item => {
					return {
						label: item.areaName,
						value: item.id,
						children: item.children
					}
				})
				var all = '全部'
				this.cityName = cityIndex
				this.cityId = e
				this.areaList = areaData
				this.areaId = ''
				this.areaName = all
				this.value4 = 4
				this.getClientList()
			},
			// 地区选择
			changeArea(e) {
				var areaValue = this.value4
				var areaData = this.areaList
				var areaIndex
				for (let i = 0; i < areaData.length; i++) {
					if (areaData[i].value == areaValue) {
						areaIndex = areaData[i].label
					}
				}
				this.areaName = areaIndex
				this.areaId = e
				this.getClientList()
			},
			// 获取区域树
			getOaAreaTree(e) {
				this.$myRequest({
					method: "GET",
					url: "/oa/oaEmployee/getOaAreaTree",
					data: {
						deptId: e.deptId,
						employeeId: e.id,
						oaEmployeeType: e.oaEmployeeType
					},
				}).then((res) => {
					var largeArea = res.data
					let largeAreaList = []
					largeAreaList = largeArea.map(item => {
						return {
							label: item.areaName,
							value: item.id,
							children: item.children
						}
					})
					this.largeAreaList = largeAreaList
				})
			},

			// 获取列表数据
			getClientList() {
				let argu = {
					deptId: this.divisionData.deptId,
					employeeId: this.divisionData.id,
					roleId: this.divisionData.roleId,
					regionId: this.regionId,
					provinceId: this.provinceId,
					cityId: this.cityId,
					countyId: this.areaId,
					name: this.keyword
				}
				this.$myRequest({
					method: "POST",
					url: "/oa/oaEmployee/getClientList",
					data: argu
				}).then((res) => {
					this.showPageLoading = false
					if (res.success == 1) {
						if (res.data.length > 0) {
							this.isData = true
							this.customerList = res.data
						} else {
							this.isData = false
							this.customerList = []
						}
					} else {
						this.isData = false
						this.$refs.uToast.show({
							title: res.msg,
							type: 'error'
						})
					}
				})
			},
			onSelected(e) {
				Object.assign(this.$data, this.$options.data());
				this.getDepartmentList();
			},
			// 搜索回车事件
			custom(e) {
				this.keyword = e;
				this.getClientList()
			},
			// 点击搜索
			search(e) {
				this.keyword = e;
				this.getClientList()
			}
		}

	}
</script>
<style lang="less" scoped>
	page {
		background-color: #ffffff;
		width: 100%;
		height: 100%;
		overflow: hidden;

		.cus-list {
			background: #f2f2f2;

			.container {
				margin-top: 152upx;

				.top {
					background-color: #f2f2f2;
					padding-top: 8upx;

					.salesman {
						padding: 28upx;
						background-color: #f2f2f2;

						text {
							color: #666666;
							font-size: 34upx;
							font-weight: 400;
						}

						.bold {
							font-size: 36upx;
							color: #333333;
							margin-right: 10upx;
						}
					}

					.search {
						background-color: #f2f2f2;
						padding: 20upx;
						height: 100upx;
						width: 100%;
					}
				}

				.content {
					color: #333;
					background: #ffffff;
					border-top-left-radius: 24upx;
					border-top-right-radius: 24upx;
					padding: 16upx 28upx;

					.title {
						display: flex;
						justify-content: space-between;
						line-height: 80upx;

						.left {
							text {
								color: #333333;
								font-weight: 600;
								font-size: 34upx;
							}
						}

						.right {}
					}


					.co {
						border-bottom: 1upx solid #f1f1f1;
						margin-bottom: 20upx;
						color: #666666;

						.name {
							display: flex;
							justify-content: space-between;

							.left {
								text {
									color: #333333;
									font-size: 32upx;
								}
							}

							.state {
								padding: 6upx 20upx;

								border-radius: 40upx;
								line-height: 40upx;

								text {
									color: #ffffff;
									font-size: 20upx;
								}
							}
						}


						.line {
							line-height: 48upx;

							.number {
								display: flex;
								justify-content: space-between;
								line-height: 56rpx;

								text {
									font-size: 30rpx;
									color: #333;
								}
							}

							.time {
								display: flex;
								justify-content: space-between;
								line-height: 56rpx;
								color: #666666;

								text {
									color: #666666;
									font-size: 30rpx;
								}
							}

							.channel {
								display: flex;
								justify-content: space-between;
								line-height: 56rpx;
								padding-bottom: 20upx;

								text {
									color: #666666;
									font-size: 30rpx;
								}
							}
						}
					}
				}
			}
		}
	}

</style>
