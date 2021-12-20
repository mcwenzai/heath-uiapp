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
				<u-dropdown :title-size="30">
					<u-dropdown-item v-model="value1" :title="largeAreaName" :options="largeAreaList"
						@change="changeLargeArea" :height="600">
					</u-dropdown-item>
					<u-dropdown-item v-model="value2" :title="provinceName" :options="provinceList"
						@change="changeProvince" :height="600"></u-dropdown-item>
					<u-dropdown-item v-model="value3" :title="cityName" :options="cityList" @change="changeCity" :height="600">
					</u-dropdown-item>
					<u-dropdown-item v-model="value4" :title="areaName" :options="areaList" @change="changeArea" :height="600">
					</u-dropdown-item>
				</u-dropdown>
			</view>

			<view class="content">
				<view class="title">
					<view class="left">
						<text>运营数据</text>
					</view>
					<wz-datepicker :beforeDateDisable="false" color="#F7703B" :show="showPicker" :format="'yyyy-mm-dd'"
						:monthNum="monthNum" :value="dateValue" :show-tips="true" :begin-text="'开始'" :end-text="'结束'"
						@confirm="confirmDate" @cancel="confirmDate"></wz-datepicker>
					<view class="right" @click="datePicker()">
						<text>{{dateData}}</text>
						<u-icon name="arrow-right" color="#999999"></u-icon>
					</view>
				</view>
				<view v-if="isData">
					<view class="line">
						<view class="grid">
							<view class="region">合伙人</view>
							<view class="purple">总客户</view>
							<view class="purple">新增客户</view>
							<view class="purple">销售业绩</view>
							<view class="purple">结算业绩</view>
						</view>
						<view class="line-li" v-for="(item,index) in salesmanList" :key="index">
							<view class="layout" v-if="item.salesmanName">{{item.salesmanName}}</view>
							<view class="layout" v-else>暂无姓名</view>
							<view class="layout" v-if="item.clientSum">{{item.clientSum}}</view>
							<view class="layout" v-else>0</view>
							<view class="layout" v-if="item.newClientSum">{{item.newClientSum}}</view>
							<view class="layout" v-else>0</view>
							<view class="layout" v-if="item.sellMoney">
								<text v-if="item.sellMoney > 99999">{{item.sellMoney}}</text>
								<text v-else>{{item.sellMoney | toFixed(2)}}</text>
							</view>
							<view class="layout" v-else>0.00</view>
							<view class="layout" v-if="item.clearingMoney">
								<text v-if="item.clearingMoney > 99999">{{item.clearingMoney}}</text>
								<text v-else>{{item.clearingMoney | toFixed(2)}}</text>
							</view>
							<view class="layout" v-else>0.00</view>
						</view>
					</view>
				</view>
				<view class="no-data column flex-center-center" v-else>
					<image src="/static/images/index/search.png"></image>
					<text>暂无运营数据</text>
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
				filterData: [],
				salesmanData: [],
				employeeId: '',
				divisionData: {},
				salesmanList: [],
				dateData: "请选择日期",
				showPicker: false,
				//开始时间
				beginDate: '',
				//结束时间
				endDate: '',
				dateValue: [],
				showPageLoading: true,
				monthNum: null,
				deptId: '',
				isData: false,
				countyId: ''
			}
		},

		onLoad() {
			this.getDepartmentList()
		},

		methods: {
			// 拼接当前年月日
			getCurentTime() {
				var now = new Date();
				var year = now.getFullYear(); //年
				var month = now.getMonth() + 1; //月
				var day = now.getDate(); //日
				var clock = year + "/";
				if (month < 10) clock += "0";
				clock += month + "/";
				if (day < 10) clock += "0";
				clock += day;
				return (clock);
			},
			// 计算月份
			countMonth(e) {
				var nowTime = new Date();
				var nowYear = Number(nowTime.getFullYear()); //年
				var nowMonth = nowTime.getMonth() + 1;
				var oldDate = e.split('-')
				if (oldDate[0] == nowYear) {
					var differMonth = nowMonth - oldDate[1]
					this.monthNum = differMonth + 1
				} else if (oldDate[0] < nowYear) {
					var differYear = (nowYear - oldDate[0]) * 12
					if (nowMonth - oldDate[1] >= 0) {
						var differMonth = nowMonth - oldDate[1]
						this.monthNum = differMonth + 1
					} else {
						var mm = nowMonth + 12 - oldDate[1]
						var differMonth = differYear - 12 + mm
						this.monthNum = differMonth + 1
					}
				}
			},
			// 事业部下拉数据
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
						var createDay = divisionData.createTime.slice(0, 10);
						this.dateValue = new Array(createDay)
						this.countMonth(createDay);
						this.getOaAreaTree(divisionData);
						this.getSalesmanList();
					} else {
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
			// 获取主要列表数据
			getSalesmanList() {
				var argu = {
					deptId: this.divisionData.deptId,
					employeeId: this.divisionData.id,
					roleId: this.divisionData.roleId,
					regionId: this.regionId,
					provinceId: this.provinceId,
					cityId: this.cityId,
					countyId: this.countyId,
					beginDate: this.beginDate,
					endDate: this.endDate
				}
				this.$myRequest({
					method: "POST",
					url: "/oa/oaEmployee/getSalesmanList?roleType=1",
					data: argu
				}).then((res) => {
					this.showPageLoading = false
					if (res.success == 1) {
						if (res.data.length > 0) {
							this.isData = true
							this.salesmanList = res.data
						} else {
							this.isData = false
							this.salesmanList = []
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
				this.largeAreaName = labelIndex
				this.provinceList = provinceData
				this.regionId = e
				this.provinceId = ''
				this.provinceName = all
				this.cityId = ''
				this.cityName = all
				this.cityList = []
				this.countyId = ''
				this.areaName = all
				this.areaList = []
				this.value2 = 2
				this.getSalesmanList()
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
				var all = '全部'
				cityData = cityList.map(item => {
					return {
						label: item.areaName,
						value: item.id,
						children: item.children
					}
				})
				this.provinceName = labelIndex
				this.provinceId = e
				this.cityList = cityData
				this.cityId = ''
				this.cityName = all
				this.countyId = ''
				this.areaName = all
				this.areaList = []
				this.value3 = 3
				this.getSalesmanList()
			},
			// 市选择
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
				var all = '全部'
				var areaData = []
				areaData = areaList.map(item => {
					return {
						label: item.areaName,
						value: item.id,
						children: item.children
					}
				})
				this.cityName = cityIndex
				this.cityId = e
				this.countyId = ''
				this.areaName = all
				this.areaList = areaData
				this.value4 = 4
				this.getSalesmanList()
			},
			// 区选择
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
				this.countyId = e
				this.getSalesmanList()
			},
			// 显示日期弹窗
			datePicker() {
				this.showPicker = true;
			},
			// 选择日期
			confirmDate(e) {
				this.showPicker = false;
				if (e) {
					let startDate = e.value.slice(0, 1).toString();
					let endDate = e.value.slice(1, 2).toString();
					let startDateMonth = startDate.substring(5)
					let endDateMonth = endDate.substring(5)
					this.dateData = startDateMonth + '至' + endDateMonth;
					this.beginDate = startDate
					this.endDate = endDate
					this.dateData = startDate.toString() + '至' + endDate.toString();
					this.getSalesmanList()
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	page {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.wrap {
		padding: 12px;
	}

	.jing {
		font-size: 26upx;
		color: #ff5757;
	}

	.layout {
		font-size: 13px;
		color: #666666;
		width: 18%;
		text-align: left;
		line-height: 24px;
		height: 24px;
		overflow: hidden;
		text-overflow: ellipsis;
		margin: 0 6upx;
	}

	.bg-purple {
		background: #ffeee8;
		height: 25px;
		padding: 2upx 6upx;
		border-radius: 4upx;
		color: #666666;
		font-size: 28upx;
	}

	page {
		background-color: #ffffff;

		.cus-list {
			background: #f2f2f2;

			.nav {
				.back {
					padding-top: 20upx;
					float: left;
				}
			}

			.container {
				margin-top: 152upx;

				.top {
					background-color: #f2f2f2;
					padding-top: 8upx;

					.salesman {
						padding: 28upx;

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
				}

				.content {
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

					.line {
						line-height: 48upx;

						.grid {
							background-color: #ffeee8;
							display: flex;

							.purple {
								line-height: 48upx;
								height: 48upx;
								font-size: 24upx;
								width: 19%;
								text-align: left;
								color: #666666;
								margin: 0 6upx;
							}

							.region {
								line-height: 48upx;
								height: 48upx;
								font-size: 24upx;
								width: 19%;
								margin-left: 20upx;
								text-align: left;
								color: #666666;
							}
						}

						&-li {
							display: flex;
							flex-wrap: wrap;
							justify-content: space-between;
							padding-left: 12upx;
						}

						.saleList {

							display: flex;
							flex-wrap: wrap;
							justify-content: space-between;
							border-bottom: 1upx solid #f2f2f2;

							.line {
								display: flex;
								flex-wrap: wrap;
								justify-content: space-between;
								border-bottom: 1upx solid #f2f2f2;

							}
						}

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

							text {
								font-size: 30rpx;
								color: #333;
							}
						}

						.channel {
							display: flex;
							justify-content: space-between;
							line-height: 56rpx;

							text {
								font-size: 30rpx;
								color: #333;
							}
						}
					}
				}
			}
		}
	}
</style>
