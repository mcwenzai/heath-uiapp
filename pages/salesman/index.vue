<template>
	<view class="salesman" v-if="!isShowError">
		<!-- 顶部 -->
		<view class="filter-wrapper" :style="{
				height: height + 'upx',
				'padding-top': top,
				'background-color': '#f2f2f2',
			}" @touchmove.stop.prevent="discard">
			<view class="inner-wrapper">
				<view class="mask" :class="showMask ? 'show' : 'hide'" @tap="tapMask"></view>
				<view class="navs">
					<view class="c-flex-aligncenter" @click="navClick()">
						<view>{{ divisionData.deptName }}</view>
						<view v-if="showMask" class="icon icon-xiala"></view>
						<view v-else class="icon icon-xiala" :style="'transform:rotate(180deg);'"></view>
					</view>
				</view>
				<scroll-view scroll-y="true" class="popup" :class="popupShow ? 'popupShow' : ''">
					<view class="item-opt" :class="item.select ? 'themeColor' : ''" v-for="(item, index) in navData"
						:key="index" @click="handleOpt(item.deptId, index)">
						<text>{{ item.deptName }}</text>
						<text class="icon" :class="item.select ? 'icon-ok2' : ''"></text>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 主体 -->
		<view class="container">
			<view class="back-color">
				<image class="back-img" src="../../static/images/salesman/hedaifu.png"></image>
				<view class="desc">
					<view class="title-code">
						<view class="title">
							<text class="name">{{ divisionData.name }}</text>
							<text>{{ divisionData.roleName }}</text>
						</view>
					</view>
					<view class="exten" v-if="divisionData.oaEmployeeType == 1">
						<view class="yester">
							<text class="currency">￥</text>
							<text class="currency-num" v-if="divisionData.yesterDaySellMoney">{{
									divisionData.yesterDaySellMoney | toFixed(2)
								}}</text>
							<text class="currency-num" v-else>0.00</text>
							<view class="block">
								<text class="company">昨日销售业绩</text>
								<text class="iconfont icon-gengduo1"></text>
							</view>
						</view>
						<view class="yester">
							<text class="currency">￥</text>
							<text class="currency-num" v-if="divisionData.monthClearingMoney">{{
									divisionData.monthClearingMoney | toFixed(2)
								}}</text>
							<text class="currency-num" v-else>0.00</text>
							<view class="block">
								<text class="company">本月结算业绩</text>
								<text class="iconfont icon-gengduo1"></text>
							</view>
						</view>
					</view>
					<view class="exten" v-else>
						<view class="yester">
							<text class="currency">￥</text>
							<text class="currency-num" v-if="divisionData.monthSellMoney">{{
									divisionData.monthSellMoney | toFixed(2)
								}}</text>
							<text class="currency-num" v-if="divisionData.monthSellMoney == null">0.00</text>
							<view class="block">
								<text class="company">本月销售业绩</text>
								<text class="iconfont icon-gengduo1"></text>
							</view>
						</view>

						<view class="yester">
							<text class="currency"></text>
							<text class="currency-num"
								v-if="divisionData.appUserSum">{{ divisionData.appUserSum }}</text>
							<text class="currency-num" v-else>0</text>
							<view class="block">
								<text class="company">总客户</text>
								<text class="iconfont icon-gengduo1"></text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="main-content">
			<view class="con" v-if="divisionData.oaEmployeeType == 1">
				<view class="menus" v-for="(item, index) in controllerMenuList" :key="index"
					@click="navigate(item.url)">
					<image :src="item.img" />
					<text>{{ item.title }}</text>
				</view>
			</view>
			<view class="con" v-else>
				<view class="menus" v-for="(item, index) in salesmanMenuList" :key="index" @click="navigate(item.url)">
					<image :src="item.img" />
					<text>{{ item.title }}</text>
				</view>
			</view>
			<!-- 退出登录 -->
			<view class="login-out">
				<u-button type="warning" shape="circle" class="custom-style" ripple-bg-color="#ff5757"
					@click="loginOut()">退出登录</u-button>
			</view>
		</view>
		<u-toast ref="uToast" />
		<wz-loading v-if="showPageLoading" />
	</view>
	<view class="no-data column flex-center-center" v-else>
		<image src="/static/images/salesman/nosalesman.png"></image>
		<view>您暂未被添加到任何事业部下</view>
		<view>请联系您的上级处理</view>
		<view class="login-out">
			<u-button type="warning" shape="circle" class="custom-style" ripple-bg-color="#ff5757" @click="loginOut()">
				退出登录</u-button>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				id: "",
				isIndex: true,
				oaEmployeeType: 0,
				deptId: ",",
				name: "",
				roleId: "",
				roleName: "",
				//管理
				yesterDaySellMoney: "",
				monthClearingMoney: "",
				// 合伙人
				monthSellMoney: "",
				appUserSum: "",
				navData: [],
				height: 108,
				top: "34px",
				popupShow: false,
				showMask: false,
				selIndex: "",
				showPageLoading: true,
				salesmanMenuList: [{
						img: require("../../static/images/salesman/yjlb.png"),
						title: "业绩列表",
						url: "achieve",
					},
					{
						img: require("../../static/images/salesman/khlb.png"),
						title: "客户列表",
						url: "acustom",
					},
					{
						img: require("../../static/images/salesman/spsq.png"),
						title: "商品授权管理",
						url: "grant",
					},
					{
						img: require("../../static/images/salesman/dkrz.png"),
						title: "代客认证",
						url: "replace",
					},
				],
				controllerMenuList: [{
						img: require("../../static/images/salesman/yjlb.png"),
						title: "业绩列表",
						url: "performanceLlist",
					},
					{
						img: require("../../static/images/salesman/khlb.png"),
						title: "客户列表",
						url: "customer",
					},
					{
						img: require("../../static/images/salesman/wdtd.png"),
						title: "我的团队",
						url: "team",
					},
					{
						img: require("../../static/images/salesman/ywygl.png"),
						title: "合伙人管理",
						url: "salesManage",
					},
				],
				divisionData: {},
				isShowError: false,
			};
		},
		onShow() {
			this.getDepartmentList();
		},
		methods: {
			// 获取顶部下拉数据
			getDepartmentList(indexList) {
				this.$myRequest({
					method: "GET",
					url: "/oa/oaEmployee/getDepartmentList?roleType=",
				}).then((res) => {
					this.showPageLoading = false;
					var deptId = app.globalData.deptId;
					if (res.success == 1) {
						if (!res.data.length) {
							this.isShowError = true;
						} else {
							this.isShowError = false;
							var navData = res.data;
							navData.forEach((item) => {
								item.select = false;
								return item;
							});
							if (deptId == "") {
								this.navData = navData;
								this.navData[0].select = true;
								this.deptId = res.data[0].deptId;
								app.globalData.deptId = res.data[0].deptId;
								this.divisionData = res.data[0];
								uni.setStorageSync("divisionData", res.data[0]);
							} else {
								this.deptId = deptId;
								this.navData = navData;
								var divisionData, selIndex;
								for (let i = 0; i < res.data.length; i++) {
									if (res.data[i].deptId == deptId) {
										divisionData = res.data[i];
										selIndex = i;
									}
								}
								this.navData[selIndex].select = true;
								this.divisionData = divisionData;
								uni.setStorageSync("divisionData", divisionData);
							}
						}
					} else {
						this.$refs.uToast.show({
							title: res.msg,
							icon: "error",
						});
					}
				});
			},
			navClick() {
				this.popupShow = !this.popupShow;
				this.showMask = !this.showMask;
			},
			handleOpt(deptId, index) {
				this.selectItem(deptId);
				setTimeout(() => {
					this.tapMask();
				}, 100);
			},
			selectItem(deptId) {
				var navData = this.navData;
				navData.forEach((itemnavData) => {
					itemnavData.select = false;
					return itemnavData;
				});
				var selIndex;
				for (let i = 0; i < navData.length; i++) {
					if (navData[i].deptId == deptId) {
						selIndex = i;
					}
				}
				this.navData[selIndex].select = true;
				app.globalData.deptId = navData[selIndex].deptId;
				this.divisionData = this.navData[selIndex];
				uni.setStorageSync("divisionData", this.navData[selIndex]);
			},
			tapMask() {
				this.showMask = false;
				this.popupShow = false;
			},
			// 存储并跳转
			navigate(e) {
				var deptId = this.deptId;
				uni.navigateTo({
					url: `/pages/salesman/${e}`,
				});
			},
			loginOut() {
				let that = this;
				uni.showModal({
					title: "退出登录",
					content: "确认退出登录？",
					success: function(res) {
						if (res.confirm) {
							that.$myRequest({
								method: "GET",
								url: "/user/appUser/logout",
							}).then((res) => {
								if (res.success == 1) {
									app.globalData.customerData = null;
									app.globalData.customerId = "";
									app.globalData.deptId = "";
									app.globalData.employeeId = "";
									app.globalData.selectArray = [];
									uni.clearStorageSync();
									let appType = res.platform;
									// 退出登录避免重复协议弹框
									if (appType == "android") {
										// console.log('安卓');
									} else {
										uni.setStorageSync("argeeState", 1);
									}
									setTimeout(function() {
										uni.reLaunch({
											url: "../../pages/login/login",
										});
									}, 200);
								} else {
									this.$refs.uTips.show({
										title: res.msg,
										type: "error",
										duration: "1500",
									});
								}
							});
						}
					},
				});
			},
		},
	};
</script>

<style lang="less">
	page {
		background-color: #f2f2f2;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.column {
		height: 100%;
		width: 100%;
		overflow: hidden;
		padding-bottom: 200upx;

		image {
			padding-bottom: 20upx;
		}

		.login-out {
			position: fixed;
			bottom: 60upx;
			left: 0;
			padding: 0 60upx;
			width: 100%;

			.custom-style {
				color: #ffffff;
				background-color: #ff7247;
			}

		}
	}

	.c-flex-aligncenter {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32upx;

		.icon-xiala {
			font-size: 26upx;
			font-weight: 600;
			color: #333333;
			transition: transform 0.1s linear, color 0.1s linear;
			margin-left: 10upx;
		}
	}

	.c-flex-center {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.filter-wrapper {
		font-size: 28rpx;
		position: fixed;
		height: 92upx;
		width: 750rpx;
		z-index: 9999;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		background-color: #f2f2f2;
		transition: all 0.5s;
		z-index: 999;

		.inner-wrapper {
			.navs {
				position: relative;
				height: 94upx;
				background-color: #f2f2f2;
				z-index: 999;
				box-sizing: border-box;

				&>view {
					flex: 1;
					height: 100%;
					flex-direction: row;
					z-index: 999;
				}

				.backleft {
					display: flex;
					align-items: center;
					justify-content: flex-start;
					width: 80upx;
					float: left;

					.icon {
						width: 80upx;
						height: 60upx;
						line-height: 60upx;
						text-align: center;
						font-size: 38upx;
						color: #222222;
					}
				}

				.date {
					justify-content: flex-end;
				}
			}

			.mask {
				z-index: 666;
				position: fixed;
				top: calc(var(--status-bar-height) + 44px);
				left: 0;
				right: 0;
				bottom: 0;
				background-color: rgba(0, 0, 0, 0);
				transition: background-color 0.3s linear;
				transform: translate3d(80, -100%, 0);

				&.show {
					background-color: rgba(0, 0, 0, 0.4);
					transform: translate3d(0, calc(80upx + 1upx), 0);
					position: fixed;
				}

				&.hide {
					display: none;
				}
			}

			.popup {
				position: relative;
				max-height: 500rpx;
				background-color: #f2f2f2;
				border-bottom-left-radius: 22rpx;
				border-bottom-right-radius: 22rpx;
				overflow: scroll;
				z-index: 999;
				transition: all 0.2s linear;
				opacity: 1;
				display: none;

				.themeColor {
					color: #ff6a47;
				}

				.item-opt {
					height: 100rpx;
					padding: 0 40rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}

				.actOpt {
					font-weight: bold;
					position: relative;
				}
			}

			.popupShow {
				display: block;
				opacity: 1;
				transform: translate3d(80, -100%, 0);
				max-height: 345px;
				background-color: #f2f2f2;
				box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
				overflow: hidden;
				flex-direction: row;
				transition: transform 0.85s linear;
				border-top: 2upx solid #f4f4f4;
			}
		}

		.icon-triangle {
			width: 16rpx;
			height: 16rpx;
			margin-left: 10rpx;
		}
	}

	.container {
		.back-color {
			background-color: #f77138;

			.back-img {
				width: 100%;
				display: block;
				position: absolute;
				top: calc(var(--status-bar-height) + 36px);
				left: 0;
				background-color: #f7703b;
			}

			.desc {
				width: 100%;
				height: auto;
				position: absolute;
				left: 0upx;
				top: 200upx;

				.title-code {
					margin: 40upx;
					display: flex;
					justify-content: space-between;

					.title {
						display: flex;
						align-items: flex-end;

						.name {
							font-size: 36upx;
							margin-right: 20upx;
							font-weight: 600;
						}

						text {
							color: #ffffff;
							font-size: 34upx;
						}
					}

					.code {
						image {
							width: 40upx;
							height: 40upx;
						}
					}
				}

				.exten {
					padding: 0 40upx;
					display: flex;
					justify-content: space-around;
					color: #ffffff;

					.yester {
						text-align: left;

						.currency {
							color: #ffffff;
							font-size: 30upx;
							font-weight: 600;
							line-height: 60upx;
						}

						.currency-num {
							color: #ffffff;
							font-size: 42upx;
							font-weight: 600;
							line-height: 60upx;
						}

						.block {
							display: flex;
							align-items: center;
						}
					}

					.company {
						font-size: 28upx;
						color: #ffffff;
						line-height: 42upx;
					}
				}

				.center {
					border-right: 4upx solid#F3F4F8;
					width: 4upx;
					height: 88upx;
				}
			}
		}
	}

	.main-content {
		background-color: #ffffff;
		width: 100%;
		height: auto;
		position: absolute;
		left: 0upx;
		top: 500upx;
		border-radius: 20upx 20upx 0 0;

		.con {
			padding: 22upx 0upx 22upx 0upx;
			display: flex;
			flex-wrap: wrap;

			.menus {
				display: flex;
				flex-direction: column;
				align-items: center;
				color: #333;
				position: relative;
				line-height: 88upx;
				width: 33.3%;

				image {
					display: block;
					overflow: auto;
					width: 108upx;
					height: 108upx;
					line-height: 200upx;
					margin-top: 40upx;
				}

				text {
					font-size: 28upx;
					color: #333;
				}
			}
		}

		.login-out {
			position: fixed;
			bottom: 60upx;
			left: 0;
			padding: 0 60upx;
			width: 100%;

			.custom-style {
				color: #ffffff;
				background-color: #ff7247;
			}
		}
	}
</style>
