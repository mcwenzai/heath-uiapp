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
				<u-dropdown ref="uDropdown" :title-size="30">
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

			<view class="content" >
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
				<view class="line" v-if="isData">
					<view class="back-color">
						<view class="grid">
							<view class="region">区域</view>
							<view class="purple">总客户</view>
							<view class="purple">新增客户</view>
							<view class="purple">销售业绩</view>
							<view class="purple">结算业绩</view>
						</view>
					</view>
					<view class="table-column" v-for="(items,index) in performanceLlist" :key="items.id">
						<view class="province" v-for="item in items.children" :key="item.id">
							<view class="k-big">{{item.areaName}}</view>
							<view class="big" v-if="item.clientSum">{{item.clientSum}}</view>
							<view class="big" v-else>0</view>
							<view class="big" v-if="item.newClientSum">{{item.newClientSum}}</view>
							<view class="big" v-else>0</view>
							<view class="big" v-if="item.sellMoney">
								<text v-if="item.sellMoney > 9999999">{{item.sellMoney}}</text>
								<text v-else>{{item.sellMoney | toFixed(2)}}</text>
							</view>
							<view class="big" v-else>0.00</view>
							<view class="big" v-if="item.clearingMoney">
								<text v-if="item.clearingMoney > 9999999">{{item.clearingMoney}}</text>
								<text v-else>{{item.clearingMoney | toFixed(2)}}</text>
							</view>
							<view class="big" v-else>0.00</view>
							<view class="city" v-for="ii in item.children" :key="ii.id">
								<view class="k-medium">{{ii.areaName}}</view>
								<view class="medium" v-if="ii.clientSum">{{ii.clientSum}}</view>
								<view class="medium" v-else>0</view>
								<view class="medium" v-if="ii.newClientSum">{{ii.newClientSum}}</view>
								<view class="medium" v-else>0</view>
								<view class="medium" v-if="ii.sellMoney">
									<text v-if="ii.sellMoney > 9999999">{{ii.sellMoney}}</text>
									<text v-else>{{ii.sellMoney | toFixed(2)}}</text>
								</view>
								<view class="medium" v-else>0.00</view>
								<view class="medium" v-if="ii.clearingMoney">
									<text v-if="ii.clearingMoney > 9999999">{{ii.clearingMoney}}</text>
									<text v-else>{{ii.clearingMoney | toFixed(2)}}</text>
								</view>
								<view class="medium" v-else>0.00</view>
								<view class="area" v-for="i in ii.children" :key="i.id">
									<view class="k-small">{{i.areaName}}</view>
									<view class="small" v-if="i.clientSum">{{i.clientSum}}</view>
									<view class="small" v-else>0</view>
									<view class="small" v-if="i.newClientSum">{{i.newClientSum}}</view>
									<view class="small" v-else>0</view>
									<view class="small" v-if="i.sellMoney">
										<text v-if="i.sellMoney > 9999999">{{i.sellMoney}}</text>
										<text v-else>{{i.sellMoney | toFixed(2)}}</text>
									</view>
									<view class="small" v-else>0.00</view>
									<view class="small" v-if="i.clearingMoney">
										<text v-if="i.clearingMoney > 9999999">{{i.clearingMoney}}</text>
										<text v-else>{{i.clearingMoney | toFixed(2)}}</text>
									</view>
									<view class="small" v-else>0.00</view>
								</view>
							</view>
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
				performanceLlist: [],
				filterData: [],
				deptId: '',
				dateData: "请选择日期",
				showPicker: false,
				dateValue: [],
				beginDate: '',
				endDate: '',
				divisionData: {},
				areaId: '',
				showPageLoading: true,
				monthNum: 1,
				isIndex: false,
				isData: false
			}
		},

		onLoad() {
			this.getDepartmentList();
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
					this.filterData = res.data
					var divisionData
					var deptId = app.globalData.deptId
					for (let i = 0; i < res.data.length; i++ ) {
						if ( res.data[i].deptId == deptId ) {
							divisionData = res.data[i]
						}
					}
					var createDay = divisionData.createTime.slice(0, 10);
					this.divisionData = divisionData
					this.deptId = deptId
					this.dateValue = new Array(createDay)
					this.countMonth(createDay);
					this.getOaAreaTree(divisionData);
					this.getManagePerformanceList();
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
				var largeAreaVaulue = this.value1
				var largeAreaData = this.largeAreaList
				var labelIndex
				var provinceList
				for (let i = 0; i < largeAreaData.length; i++) {
					if (largeAreaData[i].value == largeAreaVaulue) {
						labelIndex = largeAreaData[i].label
						provinceList = largeAreaData[i].children
					}
				}
				this.largeAreaName = labelIndex
				var provinceData = []
				provinceData = provinceList.map(item => {
					return {
						label: item.areaName,
						value: item.id,
						children: item.children
					}
				})
				var all = '全部'
				this.provinceList = provinceData
				this.regionId = e
				this.areaId = e
				this.provinceName = all
				this.cityName = all
				this.cityList = []
				this.areaName = all
				this.areaList = []
				this.value2 = 2
				this.getManagePerformanceList()
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
				this.provinceName = labelIndex
				this.provinceId = e
				var cityData = []
				cityData = cityList.map(item => {
					return {
						label: item.areaName,
						value: item.id,
						children: item.children
					}
				})
				var all = '全部'
				this.areaId = e
				this.cityList = cityData
				this.cityName = all
				this.areaName = all
				this.areaList = []
				this.value3 = 3
				this.getManagePerformanceList()
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
				this.cityName = cityIndex
				this.cityId = e
				var areaData = []
				areaData = areaList.map(item => {
					return {
						label: item.areaName,
						value: item.id,
						children: item.children
					}
				})
				this.areaId = e
				this.areaList = areaData
				this.areaName = '全部'
				this.value4 = 4
				this.getManagePerformanceList()
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
				this.getManagePerformanceList()
			},

			// 获取业绩列表（管理者）
			getManagePerformanceList() {
				this.$myRequest({
					method: "POST",
					url: "/oa/oaEmployee/getManagePerformanceList",
					data: {
						deptId: this.divisionData.deptId,
						manageId: this.divisionData.id,
						id: this.areaId,
						beginDate: this.beginDate,
						endDate: this.endDate
					},
				}).then((res) => {
					this.showPageLoading = false
					if (res.success == 1) {
						if (res.data.length > 0) {
							this.isData = true
							this.performanceLlist = res.data
						} else {
							this.isData = false
							this.performanceLlist = []
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
			// 显示日期弹窗
			datePicker() {
				this.showPicker = true;
			},
			// 日期选择
			confirmDate(e) {
				this.showPicker = false;
				if (e) {
					let startDate = e.value.slice(0, 1).toString();
					let endDate = e.value.slice(1, 2).toString();
					let startDateMonth = startDate.substring(5)
					let endDateMonth = endDate.substring(5)
					// this.dateValue = e.value
					this.dateData = startDateMonth + '至' + endDateMonth;
					this.beginDate = startDate
					this.endDate = endDate
					this.getManagePerformanceList()
				}
			}

		}
	}
</script>

<style lang="scss" scoped>
	page{
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.screen-bar {
		width: 98%;
	}

	.no-name {
		color: #FF1818;
	}

	.k-big {
		font-size: 26upx;
		color: #F77038;
		line-height: 48upx;
		width: 20%;
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.big {
		font-size: 26upx;
		color: #F77038;
		width: 20%;
		text-align: left;
		line-height: 48upx;
		height: 48upx;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.k-medium {
		font-size: 26upx;
		color: #333333;
		line-height: 46upx;
		width: 20%;
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.medium {
		font-size: 26upx;
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
		font-size: 28upx;
		flex: 1;
	}


	.cus-list {
		background: #f2f2f2;

		.container {
			margin-top: 152upx;

			.top {
				background-color: #f2f2f2;
				padding-top: 16upx;

				.salesman {
					padding: 20rpx;

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
				color: #333;
				background: #ffffff;
				border-top-left-radius: 24upx;
				border-top-right-radius: 24upx;
				padding: 20upx;

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

					.right {
						color: #666666;
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
								width: 20%;
								text-align: left;
								// margin: 0 8upx;
								color: #666666;
							}

							.region {
								line-height: 48upx;
								height: 48upx;
								font-size: 24upx;
								width: 20%;
								margin-left: 20upx;
								text-align: left;
								color: #666666;
							}
						}
					}

					.table-column {
						padding: 12upx 0upx 20upx 0upx;

						.province {
							display: flex;
							flex-wrap: wrap;
							justify-content: space-between;
							padding: 0 0 0 20upx;

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
			}
		}
	}

</style>
