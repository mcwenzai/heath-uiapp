<template>
	<view class="content">
		<view v-if="isShowSuspension">
			<wz-suspension :isDock="true" :existTabBar="true"></wz-suspension>
		</view>
		<view
			class="fixed-wrap"
			:class="{ 'white-bg': searchFlag }"
			@click.stop="handleDetail('/pages/index/search')"
		>
			<my-search>
				<template v-slot:message>
					<view class="message-btn-wrap">
						<image
							class="message-btn"
							:src="
								searchFlag
									? '/static/images/message-black.png'
									: '/static/images/message.png'
							"
						></image>
						<view
							class="message-num"
							v-if="messageObj.number"
						></view>
					</view>
				</template>
			</my-search>
		</view>
		<view class="top-swiper-wrap">
			<swiper
				:indicator-dots="true"
				class="top-swiper"
				:autoplay="true"
				circular
				:interval="3000"
				:duration="1000"
				indicator-color="rgba(0, 0, 0, 0.2)"
				indicator-active-color="#fff"
			>
				<swiper-item v-for="(item, index) in bannerList" :key="index">
					<view class="swiper-item">
						<image
							:src="item.imgUrl"
							@tap="goNextPage(item)"
						></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 商品分类 -->
		<view class="class-swiper-wrap">
			<swiper
				:indicator-dots="true"
				indicator-color="#dcdcdc"
				class="class-swiper"
				circular
				indicator-active-color="#FF7E59"
				:class="{ height: current === 1 && classList.length > 10 }"
				@change="handleChangeSwiper"
			>
				<swiper-item class="class-swiper-item flex-wrap">
					<view
						class="class-item column flex-center-center"
						v-for="(item, index) in classList.slice(0, 5)"
						:key="index"
						@tap="goNextPage(item)"
					>
						<image :src="item.imgUrl"></image>
						<text>{{ item.name }}</text>
					</view>
				</swiper-item>
				<!-- 我的商品 -->
				<swiper-item
					class="class-swiper-item flex-wrap"
					v-if="classList.length > 5"
				>
					<view
						class="class-item column flex-center-center"
						v-for="(item, index) in classList.slice(5, 15)"
						:key="index"
						@tap="goNextPage(item)"
					>
						<image :src="item.imgUrl"></image>
						<text>{{ item.name }}</text>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view
			class="title-wrap flex-between-center"
			v-if="goodsList.length !== 0"
		>
			<text class="label">我的商品</text>
			<view
				class="more flex-start-center"
				@click="handleDetail('/pages/index/myGoods')"
				v-if="goodsList.length > 4"
			>
				更多<image src="/static/images/index/arrow.png"></image>
			</view>
		</view>

		<view class="goods-list">
			<view
				class="goods-item"
				@click="goodsDetail(itemGoods)"
				v-for="(itemGoods, indexGoods) in goodsList"
				:key="indexGoods"
			>
				<image
					class="goodsTag"
					:style="
						itemGoods.tag === 1
							? 'width:47rpx;height:53rpx;border-radius: 0;top:-10rpx'
							: 'width:60rpx;height:40rpx;border-radius: 0'
					"
					:src="itemGoods.tagImg"
					mode="widthFix"
				></image>
				<image
					:src="
						itemGoods.thumbnailUrl ||
						'/static/images/no-img-small.png'
					"
				></image>
			</view>
		</view>
		<view class="title-wrap">
			<view class="flex-between-center">
				<text class="label">推荐商品</text>
				<view
					class="more flex-start-center"
					@click="handleDetail('/pages/index/recommend')"
				>
					更多商品<image src="/static/images/index/arrow.png"></image>
				</view>
			</view>
		</view>
		<view
			class="recommend-list flex-wrap flex-between-center"
			v-if="recommendList.length !== 0"
		>
			<view
				class="recommend-item column"
				@click="goodsDetail(itemRe)"
				v-for="(itemRe, indexRe) in recommendList"
				:key="indexRe"
			>
				<image
					class="recommendTag"
					:style="
						itemRe.tag === 1
							? 'width:64rpx;height:72rpx;top:-10rpx'
							: itemRe.tag === 0
							? 'width:83rpx;height:56rpx;'
							: 'width:80rpx;height:53rpx;'
					"
					:src="itemRe.tagImg"
				></image>
				<image
					:src="
						itemRe.thumbnailUrl || '/static/images/no-img-small.png'
					"
					class="cover-img"
				></image>
				<text class="name">{{ itemRe.goodsName }}</text>
				<view
					class="price flex-between-center"
					v-if="userInfo.buyerQualificationStatus === 0"
				>
					<text>¥ {{ itemRe.priceRange }}</text>

					<text class="auth-btn"> 授权 </text>
				</view>
				<view class="price flex-between-center" v-else>
					<text
						style="
							width: 194rpx;
							height: 40rpx;
							font-size: 24rpx;
							background: #fff3ef;
							text-align: center;
							border-radius: 20rpx;
							color: #ff5d2b;
						"
					>
						认证后查看价格
					</text>
				</view>
			</view>
		</view>

		<view class="footer" v-if="recommendList.length !== 0">
			点击分类查看更多商品
		</view>
		<auth-tips></auth-tips>
		<u-toast ref="uToast" />
		<my-show-modal
			:content="'您的资质异常，请先更新'"
			@cancel="isShowCertificationErrorTip = false"
			@confirm="handleDetail('/userPages/certification/index')"
			:show="isShowCertificationErrorTip"
			confirmTxt="去更新"
		></my-show-modal>
	</view>
</template>

<script>
import authTips from "@/components/authTips.vue";
import { mapMutations, mapState } from "vuex";
import { setGoodsTagImg } from "@/libs/tool";
import { isLogin } from "@/libs/isLogin";
import goWXAppletsMixin from "@/mixins/goWXApplets";
export default {
	mixins: [goWXAppletsMixin],
	data() {
		return {
			searchFlag: false,
			userInfo: "",
			address: "",
			swiperHeight: 0,
			searchHeight: 0,
			classList: [],
			bannerList: [],
			goodsList: [],
			recommendList: [],
			current: 0,
			isShowSuspension: false,
			messageObj: {},
			customerId: "",
			isShowCertificationErrorTip: false,
		};
	},
	components: {
		authTips,
	},
	mounted() {
		this.getHeight();
	},
	onShow() {
		var divisionData = getApp().globalData.customerData;
		if (divisionData) {
			this.isShowSuspension = true;
		}
		this.customerId = uni.getStorageSync("customerId");
		this.getCarList();
		this.getAddressList();
		this.getBannerList(); //轮播图列表
		this.getClassList(); //分类列表
		this.getRecommendList(); //推荐商品列表
		this.getAddress();
		this.getInvoiceList(); //发票；列表
		this.getGoodsList(); //我的商品列表
		this.getUserInfo();
		this.getUnreadMessage();
		this.getCartTotal();
	},
	beforeCreate() {
		let token = uni.getStorageSync("token");
		// 如果本地不存在token，跳转到登录页
		if (!token) {
			uni.redirectTo({
				url: "/pages/login/login",
			});
		}
	},

	onPageScroll(e) {
		this.pageScroll(e);
	},
	computed: {
		...mapState({
			quaInfo: (store) => store.certification.info,
		}),
	},
	onHide() {
		this.isShowCertificationErrorTip = false;
	},

	methods: {
		...mapMutations({
			setCertificationInfo: "certification/setInfo",
		}),
		/**
		 * 跳转子页面
		 * @param {Object} url 页面路径
		 */
		handleDetail(url) {
			isLogin().then((v) => {
				if (v) {
					// console.log(url);
					if (
						url.trim() === "/pages/index/recommend" ||
						url.trim() === "/pages/index/myGoods"
					) {
						// 采购资质异常无法进入我的商品和推荐商品列表，需要先进行资质认证
						if (
							!this.quaInfo ||
							this.quaInfo.buyerQualificationStatus !== 0
						) {
							this.isShowCertificationErrorTip = true;
						} else {
							uni.navigateTo({
								url,
							});
						}
					} else {
						uni.navigateTo({
							url,
						});
					}
				}
			});
		},
		toLogin() {
			uni.navigateTo({
				url: "/pages/login/login",
			});
		},
		/**
		 * 推荐商品列表
		 */
		getRecommendList() {
			const obj = {};
			if (this.customerId) {
				obj.customerId = this.customerId;
			}
			this.$myRequest({
				method: "GET",
				url: "/goods/goods/recommendGoodsList",
				data: obj,
			})
				.then((res) => {
					if (res.success === 1) {
						const list = res.data.list || [];
						list.forEach((item) => {
							item.tagImg = setGoodsTagImg(item.tag);
						});
						this.recommendList = list;
					} else {
						uni.showToast({
							title: res.msg,
							icon: "none",
						});
					}
				})
				.catch((err) => {});
		},
		handleChangeSwiper(e) {
			this.current = e.detail.current;
		},
		getHeight() {
			const topSwiper = uni.createSelectorQuery().select(".top-swiper");
			const fixedWrap = uni.createSelectorQuery().select(".fixed-wrap");
			topSwiper
				.boundingClientRect((data) => {
					this.swiperHeight = data ? data.height : 0;
				})
				.exec();
			fixedWrap
				.boundingClientRect((data) => {
					this.searchHeight = data ? data.height : 0;
				})
				.exec();
		},
		getBannerList() {
			this.$myRequest({
				method: "GET",
				url: "/index/indexConfig/getListByBanner",
			})
				.then((res) => {
					if (res.success == 1) {
						this.bannerList = res.data;
						// console.log(this.bannerList)
					}
				})
				.catch((err) => {});
		},
		getCerifiInfo() {
			var customerId = uni.getStorageSync("customerId");
			if (customerId) {
				const url = "/user/appQualification/getByUserId";
				this.$myRequest({
					method: "GET",
					url: url,
					data: {
						customerId: customerId,
					},
				}).then((res) => {
					let qualification = res.data;
					this.setCertificationInfo(qualification);
				});
			} else {
				const url = "/user/appQualification/getByUserId";
				this.$myRequest({
					method: "GET",
					url: url,
				}).then((res) => {
					let qualification = res.data;
					// console.log(qualification);
					this.setCertificationInfo(qualification);
				});
			}
		},
		// 获取用户信息
		getUserInfo() {
			var customerData = getApp().globalData.customerData;
			if (customerData) {
				this.$myRequest({
					url: "/user/appUser/getById",
					data: {
						customerId: customerData.id,
					},
				}).then((res) => {
					if (res.success === 1) {
						// 地址查询拼接
						this.userInfo = res.data;
						uni.setStorageSync("userInfo", this.userInfo);
						this.getCerifiInfo();
						const v = res.data.weixinOpenid && !res.data.phone;
						const that = this;
						if (v) {
							uni.reLaunch({
								url: "/pages/login/bindPhone",
							});
						} else if (
							!res.data.weixinOpenid &&
							!res.data.phone &&
							res.data.appleId
						) {
							uni.reLaunch({
								url: "/pages/login/bindPhone?type=isAppleLogin",
							});
						} else if (!that.userInfo.cityCode) {
							uni.redirectTo({
								url: "/pages/address/index",
							});
						}
					}
				});
			} else {
				this.$myRequest({
					url: "/user/appUser/getById",
				}).then((res) => {
					if (res.success === 1) {
						// 地址查询拼接
						this.userInfo = res.data;
						// uni.setStorageSync("userInfo", this.userInfo);
						this.getCerifiInfo();
						const v = res.data.weixinOpenid && !res.data.phone;
						const that = this;
						if (v) {
							uni.reLaunch({
								url: "/pages/login/bindPhone",
							});
						} else if (
							!res.data.weixinOpenid &&
							!res.data.phone &&
							res.data.appleId
						) {
							uni.reLaunch({
								url: "/pages/login/bindPhone?type=isAppleLogin",
							});
						} else if (!that.userInfo.cityCode) {
							uni.redirectTo({
								url: "/pages/address/index",
							});
						}
					}
				});
			}
		},
		goNextPage(obj) {
			isLogin().then((v) => {
				if (v) {
					const { jumpType, jumpUrl } = obj;
					if (jumpType === 0) {
						const dataUrl = jumpUrl.split("?")[1];
						const obj = {};
						if (dataUrl) {
							const arr = dataUrl.split("&");
							const parentArr = arr[0].split("=");
							obj.parentId = parentArr[1];
							const classArr = arr[1];
							if (classArr) {
								obj.classId = classArr.split("=")[1];
							}
							uni.setStorageSync("classObj", obj);
						}

						uni.switchTab({
							url: jumpUrl,
						});
						return;
					}
					if (jumpType === 1) {
						uni.navigateTo({
							url: jumpUrl,
						});
						return;
					}
					if (jumpType === 2) {
						this.$goPage("/pages/h5Html/h5Html", {
							pageUrl: jumpUrl,
						});
						return;
					}
					if (jumpType === 3) {
						this.goWXApplets(jumpUrl);
						return;
					}
				}
			});
		},
		pageScroll(e) {
			const v = e.scrollTop;
			this.searchFlag = v >= this.swiperHeight - this.searchHeight;
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
						let county = uni.getStorageSync("userInfo").cityCode; //本地保存区域编码信息
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
					}
				})
				.catch((err) => {});
		},
		async getUnreadMessage() {
			const res = await this.$myRequest({
				url: "/user/userMessage/unreadMessageNum",
			});
			if (res.success !== 1) return;
			this.messageObj = res.data;
		},
		// 获取收货地址列表
		getAddressList() {
			let customerId = uni.getStorageSync("customerId");
			this.$myRequest({
				method: "GET",
				url: "/user/userAddress/list?customerId=" + customerId,
			})
				.then((res) => {
					if (res.success === 1) {
						let datas = res.data;
						let defaultAddress = {};
						datas.forEach((items, indexs) => {
							items.show = false;
							items.isDefault == 1
								? (defaultAddress = items)
								: (defaultAddress = datas[0]);
						});
						uni.setStorageSync("addressList", datas);
						uni.setStorageSync("defaultAddress", defaultAddress);
					} else {
						uni.showToast({
							title: ress.msg,
							icon: "none",
						});
					}
				})
				.catch((err) => {});
		},
		getInvoiceList() {
			let customerId = uni.getStorageSync("customerId");
			this.$myRequest({
				method: "GET",
				url: "/user/userInvoice/list?customerId=" + customerId,
			})
				.then((res) => {
					if (res.success === 1) {
						let datas = res.data;
						datas.forEach((items, indexs) => {
							items.show = false;
						});
						uni.setStorageSync("defaultInvoice", datas[0]);
					} else {
						uni.showToast({
							title: res.msg,
							icon: "none",
						});
					}
				})
				.catch((err) => {});
		},
		/**
		 * 获取商品分类列表
		 */
		getClassList() {
			this.$myRequest({
				method: "GET",
				url: "/index/indexConfig/getListByClassify",
			}).then((res) => {
				if (res.success === 1) {
					this.classList = res.data;
				}
			});
		},
		/**
		 * 我的商品列表
		 */
		getGoodsList() {
			this.$myRequest({
				method: "GET",
				url:
					"/goods/goods/myGoodsList?state=1&pageNum=1&pageSize=10&customerId=" +
					this.customerId,
			})
				.then((res) => {
					if (res.success === 1) {
						const list = res.data.list || [];
						list.forEach((item) => {
							item.tagImg = setGoodsTagImg(item.tag);
						});
						this.goodsList = list;
					} else {
						uni.showToast({
							title: res.msg,
							icon: "none",
						});
					}
				})
				.catch((err) => {});
		},
		goodsDetail(params) {
			isLogin().then((v) => {
				if (v) {
					let url = `/pages/index/goodsDetail?goodsId=${params.id}&storeId=${params.storeId}`;
					uni.navigateTo({
						url: url,
					});
				}
			});
		},
		getCarList() {
			uni.$emit("cartUpdate", {});
			const customerId = uni.getStorageSync("customerId");
			this.$myRequest({
				method: "GET",
				url: "/goods/cart/cartList?customerId=" + customerId,
			}).then((res) => {
				let dataList = res.data;
				dataList.normal.forEach((item, index) => {
					item.checked = 1;
					item.goodsList.forEach((items, indexs) => {
						items.checked = 1;
						items.show = false;
						// 必须满足最小起批量
						if (items.amount <= 0) {
							items.amount = items.packageNum;
						}
					});
				});
				uni.setStorageSync("cartList", dataList.normal);
				dataList.invalid.forEach((item, index) => {
					item.checked = 1;
					item.goodsList.forEach((items, indexs) => {
						items.checked = 1;
						items.show = false;
					});
					1;
				});
			});
		},
		getCartTotal() {
			const customerId = uni.getStorageSync("customerId");
			this.$myRequest({
				method: "GET",
				url: "/goods/cart/cartTotal?customerId=" + customerId,
			}).then((res) => {
				let data = res.data.total;
				if (data > 99) {
					data = 99;
				}
				if (data > 0) {
					uni.setTabBarBadge({
						index: 3,
						text: JSON.stringify(data),
					});
				} else {
					uni.removeTabBarBadge({
						index: 3,
					});
				}
				uni.setStorageSync("cartTotal", data);
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.content {
	width: 100%;
	height: 100vh;
	background: #f7f6f6;

	.fixed-wrap {
		position: fixed;
		left: var(--window-left);
		right: var(--window-right);
		top: -6px;
		padding-top: var(--status-bar-height);
		width: 100%;
		background: none;
		transition: all 0.5s;
		z-index: 999;

		.message-btn-wrap {
			position: relative;
			margin-right: 20rpx;
			display: flex;
			align-items: center;
		}

		.message-btn {
			height: 52rpx;
			width: 56rpx;
		}

		.message-num {
			width: 16rpx;
			height: 16rpx;
			background: #ff5d2b;
			position: absolute;
			border-radius: 50%;
			top: -5rpx;
			right: -5rpx;
		}

		&.white-bg {
			background: rgba($color: #fff, $alpha: 0.9);
		}
	}

	.top-swiper-wrap {
		height: 440rpx;
		width: 100%;

		.top-swiper {
			height: 100%;
			width: 100%;

			.swiper-item {
				width: 100%;
				height: 100%;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}

	.class-swiper {
		height: 240rpx;
		background-color: #f7f6f6;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		position: relative;
		top: -15rpx;
		transition: all 0.5s;

		&.height {
			height: 440rpx;

			.class-swiper-item {
				height: 380rpx !important;
			}
		}

		.class-swiper-item {
			height: 220rpx !important;
			padding: 40rpx 0 0;
		}

		.class-item {
			margin: 0 0 40rpx;
			width: 20%;
			font-size: 24rpx;
			color: #666666;

			image {
				margin-bottom: 20rpx;
				width: 88rpx;
				height: 88rpx;
				border-radius: 20rpx;
			}

			text {
				display: inline-block;
				max-width: 100%;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}

	.title-wrap {
		padding: 30rpx;

		.label {
			font-size: 34rpx;
			font-weight: bold;
			color: #333;
		}

		.more {
			color: #ff7e59;
			font-size: 30rpx;

			image {
				margin-left: 10rpx;
				width: 11rpx;
				height: 19rpx;
			}
		}

		.tips {
			margin-top: 10rpx;
			font-size: 26rpx;
			color: #666;
		}
	}

	.goods-list {
		padding: 0 30rpx;
		white-space: nowrap;
		overflow-x: auto;

		.goods-item {
			display: inline-block;
			margin: 0 35rpx 30rpx 0;
			position: relative;

			image {
				width: 150rpx;
				height: 150rpx;
				border-radius: 10rpx;
				margin-top: 10rpx;
			}

			.goodsTag {
				position: absolute;
				left: 0rpx;
				top: 0rpx;
				z-index: 990;
			}
		}
	}

	.recommend-list {
		padding: 0 30rpx;

		.recommend-item {
			margin-bottom: 30rpx;
			width: 48%;
			background: #fff;
			border-radius: 10rpx;
			position: relative;

			.recommendTag {
				position: absolute;
				left: 0rpx;
				top: 0rpx;
				z-index: 10;
			}

			.cover-img {
				margin-bottom: 20rpx;
				width: 100%;
				height: 330rpx;
				border-radius: 10rpx 10rpx 0 0;
			}

			.name {
				margin-bottom: 5rpx;
				padding: 0 20rpx;
				font-size: 30rpx;
				color: #333;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.price {
				padding: 0 20rpx 20rpx;
				color: #ff5d2b;
				font-size: 28rpx;
				font-weight: bold;
			}

			.auth-btn {
				width: 90rpx;
				height: 50rpx;
				background: linear-gradient(128deg, #38d39e 0%, #1cb7ff 100%);
				border-radius: 25rpx;
				font-size: 24rpx;
				font-weight: 700;
				color: #ffffff;
				text-align: center;
				line-height: 50rpx;
			}
		}
	}
}

.bt-row {
	background: #fff;
	width: 100%;
	height: 151rpx;
	background-color: #fff;
	margin-bottom: 10rpx;
}

.bt-row-img {
	width: 95rpx;
	height: 81rpx;
}

.bt-row-text {
	text-align: center;
}

.footer {
	height: 120rpx;
	line-height: 120rpx;
	text-align: center;
	color: #606266;
	font-size: 30rpx;
}
</style>
