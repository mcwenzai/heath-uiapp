<template>
	<view class="cus-list">
		<!-- 公共头部 -->
		<wz-navbar :filterData="filterData" :deptId="deptId" @onSelected="onSelected"></wz-navbar>
		<!-- 主体内容 -->
		<view class="container">
			<view class="salesman">
				<text class="bold">{{divisionData.name}}</text>
				<text>{{divisionData.roleName}}</text>
			</view>
			<view class="bottom">
				<view class="title">
					<view class="left">
						<text>待认证列表</text>
					</view>
					<view class="right">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<text v-if="dateData">{{dateData}}</text>
							<text v-else>请选择日期</text>
							<u-icon name="arrow-right" color="#999999"></u-icon>
						</picker>
					</view>
				</view>
				<view v-if="isData">
					<view class="back-color" v-for="(item,index) in qualificationList" :key="item.userId">
						<view class="left">
							<view class="line">
								<text>扫码时间：</text>
								<text>{{item.createTime}}</text>
							</view>
							<view class="line">
								<view class="number">
									<text>{{item.cityName}}</text>
								</view>
								<view class="time">
									<text>手机号：</text>
									<text>{{item.userPhone}}</text>
								</view>
							</view>
						</view>
						<view class="right">
							<view class="bot" @click="goAuth(item.userId)">
								<text>帮TA认证</text>
							</view>
						</view>
					</view>
				</view>
				<view class="no-data column flex-center-center" v-else>
					<image src="/static/images/index/search.png"></image>
					<text>暂无数据</text>
				</view>
			</view>

		</view>
		<u-toast ref="uToast" />
		<wz-loading v-if="showPageLoading" />
	</view>
</template>

<script>
	import {
		mapMutations
	} from "vuex";
	const app = getApp();
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				filterData: [],
				show: true,
				date: currentDate,
				dateData: '',
				divisionData: {},
				qualificationList: [],
				cityList: {},
				provincesName: '',
				cityName: '',
				areaName: '',
				deptId: '',
				showPageLoading: true,
				isData: false
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},

		onShow() {
			this.getDepartmentList()
			this.getAddress()
		},
		onBackPress(e) {
			uni.navigateTo({
				url: "/pages/salesman/index"
			})
			// 此处一定姚要return为true，否则页面不会返回到指定路径
			return true;
		},
		methods: {
			...mapMutations({
				setCertificationInfo: "certification/setInfo",
			}),
			// 返回首页
			goBack() {
				uni.navigateBack()
			},
			// 计算日期时间
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
			goAuth(e) {
				let userId = e
				uni.setStorageSync('customerId', userId)
				uni.setStorageSync("quaInfo", {});
				this.getCerifiInfo(userId)
			},
			// 获取认证信息
			getCerifiInfo(param) {
				const url = "/user/appQualification/getByUserId?customerId=" + param;
				this.$myRequest({
					method: "GET",
					url: url,
				}).then((res) => {
					let data = res.data
					if (res.success == 1) {
						let cityList = uni.getStorageSync('cityList')
						let qualification = res.data;
						this.setCertificationInfo(qualification);
						let provincesCode = res.data.provincesCode
						let cityCode = res.data.provincesCityCode
						let areaCode = res.data.cityCode
						var provincesName, cityName, areaName
						cityList.forEach((item, index) => {
							if (item.code == provincesCode) {
								provincesName = item.name
							}
							if (item.code == cityCode) {
								cityName = item.name
							}
							if (item.code == areaCode) {
								areaName = item.name
							}
						})
						var cityInfo = {}
						if (cityName == undefined) {
							cityName = '直辖市'
						}
						cityInfo.addressName = provincesName + cityName + areaName
						uni.setStorageSync("cityInfo", cityInfo);
						uni.navigateTo({
							url: '/userPages/certification/index?sourceType=1&phone=' + data.phone
						})
					} else {
						this.$refs.uToast.show({
							title: res.msg,
							type: 'error'
						})
					}
				});
			},
			// 查询省市区
			getAddress() {
				this.$myRequest({
						method: "GET",
						url: "/system/city/list",
					})
					.then((res) => {
						if (res.success == 1) {
							let cityList = res.data;
							uni.setStorageSync("cityList", cityList);
						}
					})
			},
			// 事业部下拉数据
			getDepartmentList() {
				this.$myRequest({
					method: "GET",
					url: "/oa/oaEmployee/getDepartmentList?roleType=0",
				}).then((res) => {
					if(res.success == 1) {
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
						this.getQualificationList()
					} else {
						this.$refs.uToast.show({
							title: res.msg,
							type: 'error'
						})
					}
				})
			},
			// 获取主要列表数据
			getQualificationList(e) {
				this.$myRequest({
					method: "POST",
					url: "/oa/oaEmployee/getQualificationList",
					data: {
						deptId: this.divisionData.deptId,
						employeeId: this.divisionData.id,
						dateTime: e
					},
				}).then((res) => {
					this.showPageLoading = false
					if (res.success == 1) {
						if (res.data.length > 0) {
							this.isData = true
							this.qualificationList = res.data
						} else {
							this.isData = false
							this.qualificationList = []
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
			// 时间选择事件
			bindDateChange(e) {
				var dateData = e.target.value
				this.dateData = dateData
				this.getQualificationList(dateData)
			},
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


				.salesman {
					padding: 28rpx;
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


				.bottom {
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

					.back-color {
						background-color: #ffffff;
						padding: 10 20upx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin-bottom: 20upx;
						border-bottom: 1upx solid #f2f2f2;

						.left {
							padding: 10upx 20upx;

							.line {
								line-height: 48upx;

								.number {
									display: flex;
									// justify-content: space-between;
									line-height: 56rpx;

									text {
										font-size: 30rpx;
										color: #333;
									}
								}

								.time {
									display: flex;

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

						.right {
							margin-right: 20upx;

							.bot {
								padding: 10upx 20upx;
								background-color: #F7703B;
								border-radius: 40upx;
								color: #ffffff;
							}
						}
					}
				}
			}
		}
	}

	.nav {
		.back {
			padding-top: 20upx;
			float: left;
		}
	}
</style>
