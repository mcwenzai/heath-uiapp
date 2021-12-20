<template>
	<view class="cus-list">
		<wz-navbar :filterData="filterData" :deptId="deptId" @onSelected="onSelected"></wz-navbar>
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
						@change="changeProvince" :height="600">
					</u-dropdown-item>
					<u-dropdown-item v-model="value3" :title="cityName" :options="cityList" @change="changeCity"
						:height="600">
					</u-dropdown-item>
					<u-dropdown-item v-model="value4" :title="areaName" :options="areaList" @change="changeArea"
						:height="600">
					</u-dropdown-item>
				</u-dropdown>
			</view>
			<!-- <view class="content"> -->
				<view class="content">
					<view class="title">
						<view class="left">
							<text>运营数据</text>
						</view>
						<wz-datepicker :beforeDateDisable="false" color="#F7703B" :show="showPicker"
							:format="'yyyy-mm-dd'" :monthNum="monthNum" :value="dateValue" :show-tips="true"
							:begin-text="'开始'" :end-text="'结束'" @confirm="confirmDate" @cancel="confirmDate">
						</wz-datepicker>
						<view class="right" @click="datePicker()">
							<text>{{dateData}}</text>
							<u-icon name="arrow-right" color="#999999"></u-icon>
						</view>
					</view>
					<view class="line" v-if="isData">
						<view class="back-color">
							<view class="grid">
								<view class="region">客户</view>
								<view class="hk-purple">机构名称</view>
								<view class="purple">销售业绩</view>
								<view class="purple">结算业绩</view>
							</view>
						</view>
						<view class="table-column" v-for="(item,index) in salesmanPerformanceList" :key="item.id">
							<view class="k-big" v-if="item.userName">{{item.userName}}</view>
							<view class="k-big" v-else>无名</view>
							<view class="hk-big" v-if="item.organName">{{item.organName}}</view>
							<view class="hk-big" v-else>无机构</view>
							<view class="big" v-if="item.sellMoney">{{item.sellMoney | toFixed(2)}}</view>
							<view class="big" v-else>0.00</view>
							<view class="big" v-if="item.clearingMoney">{{item.clearingMoney | toFixed(2)}}</view>
							<view class="big" v-else>0.00</view>
						</view>
					</view>
					<view class="no-data column flex-center-center" v-else>
						<image src="/static/images/index/search.png"></image>
						<text>暂无运营数据</text>
					</view>
				</view>
			<!-- </view> -->
		</view>
		<u-toast ref="uToast" />
		<wz-loading v-if="showPageLoading" />
	</view>
</template>


<script>
	const app = getApp()
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
				divisionData: {},
				dateData: "请选择日期",
				showPicker: false,
				dateValue: [],
				salesmanPerformanceList: [],
				//开始时间
				beginDate: '',
				//结束时间
				endDate: '',
				regionId: '',
				provinceId: '',
				cityId: '',
				countyId: '',
				showPageLoading: true,
				monthNum: null,
				deptId: '',
				isData: false
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
					url: "/oa/oaEmployee/getDepartmentList?roleType=0",
				}).then((res) => {
					if (res.success == 1) {
						this.filterData = res.data
						var deptId = app.globalData.deptId
						var salesmanData = res.data
						var divisionData
						for (let i = 0; i < salesmanData.length; i++) {
							if (salesmanData[i].deptId == deptId) {
								divisionData = salesmanData[i]
							}
						}
						this.deptId = deptId
						var createDay = divisionData.createTime.slice(0, 10);
						this.divisionData = divisionData
						this.deptId = deptId
						this.dateValue = new Array(createDay)
						uni.setStorageSync('divisionData', divisionData)
						this.countMonth(createDay)
						this.getOaAreaTree(divisionData)
						this.getSalesmanPerformanceList()
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
					url: "/oa/oaEmployee/getOaAreaTree?roleType=0",
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
			// 显示日期区间弹窗
			datePicker() {
				this.showPicker = true;
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
				this.areaId = ''
				this.areaName = all
				this.areaList = []
				this.value2 = 2
				this.getSalesmanPerformanceList()
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
				this.getSalesmanPerformanceList()
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
				this.getSalesmanPerformanceList()
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
				this.areaId = e
				this.areaName = areaIndex
				this.getSalesmanPerformanceList()
			},
			//获取列表
			getSalesmanPerformanceList() {
				var argu = {
					deptId: this.divisionData.deptId,
					regionId: this.regionId,
					provinceId: this.provinceId,
					cityId: this.cityId,
					countyId: this.areaId,
					salesmanId: this.divisionData.id,
					beginDate: this.beginDate,
					endDate: this.endDate
				}
				this.$myRequest({
					method: "POST",
					url: "/oa/oaEmployee/getSalesmanPerformanceList?roleType=0",
					data: argu
				}).then((res) => {
					this.showPageLoading = false
					if (res.success == 1) {
						if (res.data.length > 0) {
							this.isData = true
							this.salesmanPerformanceList = res.data
						} else {
							this.isData = false
							this.salesmanPerformanceList = []
						}
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
				this.getDepartmentList()
				// uni.setStorageSync('divisionData', e)
			},
			//日期区间选择
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
					this.getSalesmanPerformanceList()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #ffffff;
		width: 100%;
		height: 100%;
		overflow: hidden;

		.screen-bar {
			width: 98%;
		}

		.wrap {
			padding: 12px;
		}

		.k-big {
			font-size: 24upx;
			line-height: 48upx;
			width: 24%;
			text-align: left;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-left: 12upx;
		}

		.hk-big {
			font-size: 24upx;
			width: 34%;
			text-align: left;
			line-height: 48upx;
			height: 48upx;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.big {
			font-size: 24upx;
			width: 22%;
			text-align: left;
			line-height: 48upx;
			height: 48upx;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-left: 20upx;
		}

		.k-medium {
			font-size: 24upx;
			color: #333333;
			line-height: 46upx;
			width: 20%;
			text-align: left;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.medium {
			font-size: 24upx;
			color: #333333;
			line-height: 46upx;
			width: 20%;
			text-align: left;
			overflow: hidden;
			text-overflow: ellipsis;
		}


		.k-small {
			font-size: 24upx;
			color: #666666;
			line-height: 44upx;
			width: 20%;
			text-align: left;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.small {
			font-size: 24upx;
			color: #666666;
			line-height: 44upx;
			width: 20%;
			text-align: left;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.k-mini {
			font-size: 22upx;
			color: #999999;
			line-height: 42upx;
			width: 20%;
			text-align: left;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.mini {
			font-size: 22upx;
			color: #999999;
			line-height: 42upx;
			width: 20%;
			text-align: left;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.layout {
			height: 25px;
			border-radius: 4px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		.bg-purple {
			background: #ffeee8;
		}

		.cus-list {
			background: #f2f2f2;

			.nav {
				.back {
					padding-top: 20upx;
					float: left;
				}
			}

			.container {
				margin-top: 142upx;


				.top {
					width: 100%;
					background-color: #f2f2f2;
					padding-top: 8upx;

					.salesman {
						padding: 32upx;
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
				}

					.content {
						background: #ffffff;
						border-top-left-radius: 12px;
						border-top-right-radius: 12px;
						padding: 8px 14px;


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

						}

						.line {
							line-height: 48upx;

							.back-color {

								background-color: #ffeee8;

								.grid {
									background-color: #ffeee8;
									display: flex;

									.purple {
										line-height: 48upx;
										height: 48upx;
										font-size: 24upx;
										width: 22%;
										text-align: left;
										color: #666666;
									}

									.hk-purple {
										line-height: 48upx;
										height: 48upx;
										font-size: 24upx;
										width: 34%;
										text-align: left;
										color: #666666;
									}

									.region {
										line-height: 48upx;
										height: 48upx;
										font-size: 24upx;
										width: 22%;
										margin-left: 20upx;
										text-align: left;
										color: #666666;
									}
								}
							}

							.table-column {
								padding: 8upx 12upx 12upx 8upx;
								display: flex;

								.province {
									display: flex;
									flex-wrap: wrap;
									justify-content: space-between;
									padding: 0 20upx;

									.city {
										display: flex;
										flex-wrap: wrap;
										justify-content: space-between;
										width: 100%;

										.area {
											display: flex;
											flex-wrap: wrap;
											justify-content: space-between;
											width: 100%;
										}
									}
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
					// }
				}
			}
		}
	}
</style>
