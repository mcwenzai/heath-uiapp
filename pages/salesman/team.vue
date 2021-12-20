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
						<text>我的团队</text>
					</view>
				</view>
				<view class="line" v-if="isData">
					<view class="grid">
						<view class="layout purple">区域</view>
						<view class="layout purple">姓名</view>
					</view>
					<view class="table-column" v-for="(items,index) in teamList" :key="items.id">
						<view class="province" v-for="item in items.children" :key="item.id">
							<view class="big">{{item.areaName}}</view>
							<view class="big" v-if="item.employeeName">{{item.employeeName}}</view>
							<view class="no-name big" v-else>空缺</view>
							<view class="city" v-for="ii in item.children" :key="ii.id">
								<view class="medium">{{ii.areaName}}</view>
								<view class="medium" v-if="ii.employeeName">{{ii.employeeName}}</view>
								<view class="no-name medium" v-else>空缺</view>
								<view class="area" v-for="i in ii.children" :key="i.id">
									<view class="small">{{i.areaName}}</view>
									<view class="small" v-if="i.employeeName">{{i.employeeName}}</view>
									<view class="no-name-small" v-else>空缺</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="no-data column flex-center-center" v-else>
					<image src="/static/images/index/search.png"></image>
					<text>暂无团队数据</text>
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
				filterData: [],
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
				teamList: [],
				createTime: '',
				salesmanData: [],
				areaId: '',
				showPageLoading: true,
				deptId: '',
				divisionData: {},
				isData: false
			}
		},

		onLoad() {
			this.getDepartmentList()
		},

		methods: {
			//事业部下拉数据
			getDepartmentList() {
				this.$myRequest({
					method: "GET",
					url: "/oa/oaEmployee/getDepartmentList?roleType=1",
				}).then((res) => {
					if (res.success == 1) {
						this.filterData = res.data
						var divisionData
						var deptId = app.globalData.deptId
						for (let i = 0; i < res.data.length; i++) {
							if (res.data[i].deptId == deptId) {
								divisionData = res.data[i]
							}
						}
						this.deptId = deptId
						this.divisionData = divisionData
						this.getOaAreaTree(divisionData);
						this.getTeamList();
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
			//大区选择
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
				this.getTeamList()
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
				this.getTeamList()
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
				this.getTeamList()
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
				this.getTeamList()
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
			// 获取团队列表
			getTeamList() {
				this.$myRequest({
					method: "POST",
					url: "/oa/oaEmployee/getTeamList",
					data: {
						deptId: this.divisionData.deptId,
						employeeId: this.divisionData.id,
						id: this.areaId
					},
				}).then((res) => {
					if (res.success == 1) {
						this.showPageLoading = false
						if (res.data.length > 0) {
							this.isData = true
							this.teamList = res.data
						} else {
							this.isData = false
							this.teamList = []
						}
					} else {
						this.isData = false
						this.$refs.uToast.show({
							title: res.msg,
							type: 'error'
						})
					}
				})
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
	.screen-bar {
		width: 98%;
	}


	.big {
		font-size: 30upx;
		color: #F77038;
		line-height: 48upx;
	}

	.no-name-big {
		font-size: 30upx;
		color: #FF1818;
		line-height: 48upx;
	}

	.medium {
		font-size: 30upx;
		color: #333333;
		line-height: 46upx;
	}

	.no-name-medium {
		font-size: 30upx;
		color: #FF1818;
		line-height: 46upx;
	}

	.small {
		font-size: 26upx;
		color: #666666;
		line-height: 44upx;
	}

	.no-name-small {
		font-size: 26upx;
		color: #FF1818;
		line-height: 44upx;
	}

	.mini {
		font-size: 24upx;
		color: #999999;
		line-height: 42upx;
	}

	.layout {
		border-radius: 4px;
	}

	page {
		background-color: #ffffff;

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

					.line {
						line-height: 48upx;

						.grid {
							background-color: #ffeee8;
							display: flex;
							justify-content: space-between;
							padding: 8upx 12upx;

							.purple {
								line-height: 48upx;
								height: 48upx;
								font-size: 28upx;
								color: #666666;
							}
						}

						.table-column {
							padding: 12upx 0upx 20upx 0upx;
							// display: flex;
							// flex-wrap: wrap;
							// justify-content: space-between;
							border-bottom: 1upx solid #f2f2f2;


							.province {
								display: flex;
								flex-wrap: wrap;
								justify-content: space-between;
								width: 100%;
								text-align: right;
								padding: 0 10upx;

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
							line-height: 56upx;

							text {
								font-size: 30upx;
								color: #333;
							}
						}

						.time {
							display: flex;
							justify-content: space-between;
							line-height: 56upx;

							text {
								font-size: 30upx;
								color: #333;
							}
						}

						.channel {
							display: flex;
							justify-content: space-between;
							line-height: 56upx;

							text {
								font-size: 30upx;
								color: #333;
							}
						}
					}
				}
			}
		}
	}
</style>
