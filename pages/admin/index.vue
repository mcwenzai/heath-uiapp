<template>
	<view class="container">
		<!-- 自定义导航栏 -->
		<u-navbar :is-back="false" title="" :background="background">
			<view class="titleBar"> </view>
			<view class="setting" @click="goSet()"></view>
		</u-navbar>
		<!-- 主要内容 -->
		<view class="content">
			<view class="header">
				<view class="header_left">
					<image
						class="header_left"
						v-if="!userInfo.avatar"
						src="../../static/images/headImg.png"
						mode=""
					></image>
					<image
						class="header_left"
						v-if="userInfo.avatar"
						:src="userInfo.avatar"
						mode=""
					></image>
				</view>
				<view class="header_right">
					<view class="text">
						<!-- 登录/注册 -->
						{{ userInfo.name }}
					</view>
					<view
						v-if="!customerId"
						class="sub_text"
						@click="goUserInfo"
						style="display: flex; align-items: center"
					>
						点击查看个人信息
						<view
							class="arrow_icon"
							style="position: relative; margin-left: 12rpx"
						></view>
					</view>
				</view>
			</view>
			<!-- 优惠券，积分 -->
			<view class="sale">
				<view
					class="sale_item"
					style="
						background: url(../../static/images/integral_bg.png)
							no-repeat;
						background-size: 100% 100%;
					"
					@tap="goIntegralList"
				>
					<view class="left">
						<image
							src="../../static/images/integral.png"
							mode=""
						></image>
						<text>积分</text>
					</view>
					<view class="right">
						<text>{{ userInfo.integral | countFilter }}</text>
					</view>
				</view>
				<!-- <view
					class="sale_item"
					style="
						background: url(../../static/images/discount_bg.png)
							no-repeat;
						background-size: 100% 100%;
					"
				>
					<view class="left" @click="discount">
						<image
							src="../../static/images/discount.png"
							mode=""
						></image>
						<text>优惠券</text>
					</view>
					<view class="right">
						<text style="color: #ff7247">0</text>
					</view>
				</view> -->
			</view>
			<!-- 中间商品操作栏 -->
			<view class="center">
				<view
					class="center_item"
					v-for="(item, index) in menusList"
					@click="goPages(item.url)"
					:key="index"
				>
					<view class="item_icon">
						<image
							class="item_icon"
							:src="item.imgUrl"
							mode=""
						></image>
						<view class="total_icon" v-if="index==0 && unpaidTotal>0">
							{{unpaidTotal | dataSpill}}
						</view>
						<view class="total_icon" v-if="index==1 && unReceivingTotal>0">
							{{unReceivingTotal | dataSpill}}
						</view>
					</view>
					<view class="item_text">
						{{ item.title }}
					</view>
				</view>
			</view>
			<view class="footer">
				<!-- 我的授权商品 -->
				<view class="auth_goods" style="border-radius: 10rpx">
					<view
						class="list_main"
						@click="goPages('/pages/index/myGoods')"
					>
						<view class="title">
							<image
								class="icon"
								src="../../static/images/auth_icon.png"
								mode=""
							></image>
							我的授权商品
						</view>
						<view class="arrow_left">
							<view class="arrow_icon"></view>
						</view>
					</view>
				</view>
				<!-- 底部中间设置 -->
				<view class="footer_center">
					<view
						v-if="!customerId"
						class="list_main"
						@click="
							goPages(
								'/userPages/certification/index?sourceType=0'
							)
						"
					>
						<view class="title">
							<image
								class="icon"
								src="../../static/images/certif_icon.png"
								mode=""
							></image>
							资质认证
						</view>
						<view class="arrow_left">
							<view
								class="cert_state"
								:class="{
									successState:
										quaInfo.qualificationStatus == 1,
								}"
								v-show="quaInfo.qualificationStatus !== null"
							>
								{{
									quaInfo.qualificationStatus
										| qualificationType
								}}
							</view>
							<view
								class="cert_state"
								v-show="quaInfo.qualificationStatus === null"
							>
								未认证
							</view>
							<view class="arrow_icon" style="top: 14rpx"></view>
						</view>
					</view>
					<view
						v-if="!customerId"
						style="
							width: 590rpx;
							height: 1px;
							border-top: solid #ebebeb 1px;
							float: right;
							margin-right: 21rpx;
						"
					></view>
					<view
						class="list_main"
						@click="goPages('/pages/address/list')"
					>
						<view class="title">
							<image
								class="icon"
								src="../../static/images/address_icon.png"
								mode=""
							></image>
							收件人
						</view>
						<view class="arrow_left">
							<view class="arrow_icon"></view>
						</view>
					</view>
					<view
						style="
							width: 590rpx;
							height: 1px;
							border-top: solid #ebebeb 1px;
							float: right;
							margin-right: 21rpx;
						"
					></view>
					<view
						class="list_main"
						@click="goPages('/pages/invoice/list')"
					>
						<view class="title">
							<image
								class="icon"
								src="../../static/images/invoice_icon.png"
								mode=""
							></image>
							发票信息
						</view>
						<view class="arrow_left">
							<view class="arrow_icon"></view>
						</view>
					</view>
				</view>
				<!-- 底部资讯服务设置 -->
				<view class="service">
					<view class="list_main" @click="advisory">
						<view class="title">
							<image
								class="icon"
								src="../../static/images/service_icon.png"
								mode=""
							></image>
							咨询客服
						</view>
						<view class="arrow_left">
							<view class="arrow_icon"></view>
						</view>
					</view>

					<view
						class="service"
						style="margin-bottom: 140upx"
						v-if="!customerId"
					>
						<view class="list_main" @click="bindingYwy">
							<view class="title">
								<image
									class="icon"
									src="../../static/images/binding.png"
									mode=""
								></image>
								我的合伙人
							</view>
							<view class="arrow_left">
								<view class="arrow_icon"></view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<my-show-modal></my-show-modal>
	</view>
</template>

<script>
import { goPage } from "@/libs/tool";
import qualificationType from "@/mixins/formate";
import { mapMutations } from "vuex";
export default {
	data() {
		return {
			background: {
				backgroundColor: "#F7F6F6",
			},
			menusList: [
				{
					imgUrl: "/static/images/user_icon01.png",
					title: "待付款",
					url: "/pages/cart/orderList?index=1",
				},
				{
					imgUrl: "/static/images/user_icon02.png",
					title: "待收货",
					url: "/pages/cart/orderList?index=2",
				},
				{
					imgUrl: "/static/images/user_icon03.png",
					title: "已完成",
					url: "/pages/cart/orderList?index=3",
				},
				{
					imgUrl: "/static/images/user_icon04.png",
					title: "全部订单",
					url: "/pages/cart/orderList?index=0",
				},
			],
			userInfo: {},
			quaInfo: {},
			cityInfo: {},
			customerId: "",
			unpaidTotal:0,
			unReceivingTotal:0
		};
	},
	mixins: [qualificationType],
	onLoad() {
		this.cityInfo = uni.getStorageSync("cityInfo");
		uni.$on("cerifiInfoUpdate", (data) => {
			this.getCerifiInfo();
		});
		uni.$on("userInfoUpdate", (data) => {
			this.getUserInfo();
		});
		this.customerId = uni.getStorageSync("customerId");
	},
	onShow() {
		this.getUserInfo();
		this.getCerifiInfo();
		this.getUnpaidTotal()
		this.getUnReceivingTotal()
		uni.$emit("getAddressList", {});
	},
	filters: {
		dataSpill(val){
			return val>=99?'99+':val
		},
		countFilter(val) {
			if (val > 9999 && val < 19999) {
				return "1万+";
			} else if (val > 19999 && val < 29999) {
				return "2万+";
			} else if (val > 29999 && val < 39999) {
				return "3万+";
			} else if (val > 39999 && val < 49999) {
				return "4万+";
			} else if (val > 49999 && val < 59999) {
				return "5万+";
			} else if (val > 59999 && val < 6999) {
				return "6万+";
			} else if (val > 69999 && val < 79999) {
				return "7万+";
			} else if (val > 79999 && val < 89999) {
				return "8万+";
			} else if (val > 89999 && val < 99999) {
				return "9万+";
			} else if (val > 99999) {
				return "10万+";
			} else if (!val) {
				return 0;
			} else {
				return val;
			}
		},
	},
	methods: {
		...mapMutations({
			setCertificationInfo: "certification/setInfo",
		}),
		// 客服
		advisory() {
			uni.navigateTo({
				url: "/pages/admin/service",
			});
		},
		bindingYwy() {
			goPage("/pages/admin/myPartner");
		},
		goPages(url) {
			goPage(url);
		},
		// 跳转用户信息编辑
		goUserInfo() {
			goPage("/pages/admin/userInfo");
		},
		// 跳转系统设置页面
		goSet() {
			uni.navigateTo({
				url: "/userPages/setting/index",
			});
		},
		// 获取认证信息
		getCerifiInfo() {
			const url = "/user/appQualification/getByUserId";
			const id = uni.getStorageSync("customerId");
			const obj = {};
			if (id) {
				obj.customerId = id;
			}
			this.$myRequest({
				data: obj,
				url: url,
			}).then((res) => {
				let qualification = res.data || {};
				if(!qualification.address){
					qualification.checkStatus=null
				}
				this.quaInfo = qualification;
				this.setCertificationInfo(qualification);
				this.getAddress();
			});
		},
		// 获取用户信息
		getUserInfo() {
			const id = uni.getStorageSync("customerId");
			const obj = {};
			if (id) {
				obj.customerId = id;
			}
			this.$myRequest({
				url: "/user/appUser/getById",
				data: obj,
			}).then((res) => {
				if (res.success === 1) {
					// 地址查询拼接
					this.userInfo = res.data;
					uni.setStorageSync("userInfo", this.userInfo);
					// 判断是否存在合伙人数据
					let divisionData = uni.getStorageSync("divisionData");
					if (divisionData) {
						this.userInfo.name = divisionData.name;
						this.userInfo.integral = divisionData.integral;
						this.userInfo.avatar = divisionData.avatar;
					}

					if (!this.userInfo.name) {
						this.userInfo.name =
							this.userInfo.nickname ||
							"用户" + this.userInfo.phone.slice(-4);
					}

					if (!this.userInfo.cityCode) {
						uni.redirectTo({
							url: "/pages/address/index",
						});
					}
				}
			});
		},
		goIntegralList() {
			const v = this.userInfo.integral;
			let url = "/pages/admin/integral?intergralNum=" + v;
			goPage(url);
		},
		discount() {
			// 	uni.navigateTo({
			// 		url: "/pages/class/slicesClass",
			// 	});
		},
		// 查询省市区
		getAddress() {
			let cityList = uni.getStorageSync("cityList");
			let county = uni.getStorageSync("quaInfo").cityCode; //本地保存区域编码信息
			let city = county.slice(0, 4) + "00";
			let province = county.slice(0, 2) + "0000";
			cityList.forEach((item, index) => {
				if (item.code == province) {
					province = item.name;
				}
				if (item.code == city) {
					city = item.name;
				}
				if (item.code == county) {
					county = item.name;
				}
			});
			if (
				city == "110100" ||
				city == "500100" ||
				city == "120100" ||
				city == "310100"
			) {
				city = "直辖市";
			}
			let cityInfo = {};
			cityInfo.addressName = `${province}/${city}/${county}`;
			uni.setStorageSync("cityInfo", cityInfo); //本地保存当前区域信息
		},
		// 统计待支付订单数量
		getUnpaidTotal() {
			const customerId = uni.getStorageSync("customerId");
			this.$myRequest({
				method: "GET",
				url: "/order/orders/unpaidTotal?customerId=" + customerId,
			}).then((res) => {
				this.unpaidTotal = res.data.total
			})
		},
		// 统计待收货订单数量
		getUnReceivingTotal() {
			const customerId = uni.getStorageSync("customerId");
			this.$myRequest({
				method: "GET",
				url: "/order/orders/unReceivingTotal?customerId=" + customerId,
			}).then((res) => {
				this.unReceivingTotal = res.data.total
			})
		},
	},
};
</script>

<style lang="scss">
page {
	background-color: #f7f6f6;
}
.titleBar {
	font-size: 36rpx;
	font-weight: 700;
	color: #222222;
	margin: 0 auto;
	padding-left: 67rpx;
}
.setting {
	width: 40rpx;
	height: 40rpx;
	margin-right: 27rpx;
	background: url(../../static/images/setting.png) no-repeat;
	background-size: 100% 100%;
}
.content {
	width: 690rpx;
	margin: 0 auto;
	margin-top: 15rpx;
	.header {
		height: 155rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.header_left {
			width: 152rpx;
			height: 152rpx;
			border-radius: 50%;
		}
		.header_right {
			// height: 120rpx;
			width: 500rpx;
			.text {
				font-size: 40rpx;
				font-weight: 700;
				text-align: left;
				color: #222222;
			}
			.sub_text {
				margin-top: 22rpx;
				font-size: 30rpx;
				text-align: left;
				color: #7e7e7e;
			}
		}
	}
	.sale {
		height: 123rpx;
		margin: 30rpx 0;
		display: flex;
		justify-content: space-between;
		.sale_item {
			width: 690rpx;
			height: 123rpx;
			background-color: #366092;
			display: flex;
			justify-content: space-around;
			align-items: center;
			.left {
				height: 60rpx;
				font-size: 30rpx;
				color: #333333;
				display: flex;
				align-items: center;
				image {
					width: 58rpx;
					height: 58rpx;
					margin-right: 8rpx;
					position: relative;
					top: 6rpx;
				}
			}
			.right {
				font-size: 48rpx;
				font-weight: 700;
				color: #ff9415;
			}
		}
	}
	.center {
		height: 200rpx;
		background-color: #ffffff;
		display: flex;
		justify-content: space-around;
		align-items: center;
		border-radius: 10rpx;
		.center_item {
			height: 155rpx;
			.item_icon {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				background-color: #ffffff;
				margin: 0 auto;
				position: relative;
				.total_icon{
					min-width: 40rpx;
					height: 40rpx;
					background-color: #FF7345;
					font-size: 24rpx;
					border-radius: 40rpx;
					color: #ffffff;
					text-align: center;
					line-height: 40rpx;
					padding: 0 6rpx;
					position: absolute;
					left: 78rpx;
					top: -4rpx;
				}
			}
			.item_text {
				font-size: 28rpx;
				color: #333333;
				text-align: center;
				margin-top: 18rpx;
			}
		}
	}
	.footer {
		// height: 600rpx;
		.auth_goods,
		.service {
			height: 110rpx;
			background-color: #ffffff;
			margin-top: 20rpx;
			border-radius: 10rpx;
		}
		.footer_center {
			// height: 330rpx;
			margin-top: 20rpx;
			background-color: #ffffff;
			border-radius: 10rpx;
		}
	}
}
.list_main {
	width: 630rpx;
	height: 110rpx;
	display: flex;
	align-items: center;
	margin: 0 auto;
	justify-content: space-between;
	.title {
		font-size: 32rpx;
		color: #333333;
		display: flex;
		align-items: center;
		.icon {
			width: 44rpx;
			height: 44rpx;
			border-radius: 20rpx;
			margin-right: 17rpx;
			position: relative;
			// top: 0rpx;
		}
	}
}
.cert_state {
	color: #ff7247;
	height: 54rpx;
	background: rgba(255, 114, 71, 0.2);
	border-radius: 10rpx;
	text-align: center;
	line-height: 54rpx;
	padding: 0 20rpx;
}
.arrow_left {
	display: flex;
}
.arrow_icon {
	width: 27rpx;
	height: 27rpx;
	margin-left: 26rpx;
	position: relative;
	background: url(../../static/images/arrow_left.png) no-repeat;
	background-size: 100% 100%;
}
.successState {
	font-size: 30rpx;
	border-radius: 10rpx;
	color: #53ae41;
	background: rgba(83, 174, 65, 0.22);
	padding: 0 20rpx;
}
</style>
