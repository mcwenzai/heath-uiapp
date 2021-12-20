<template>
	<view class="content page-height">
		<view v-if="isShowSuspension">
			<wz-suspension :isDock="true" :existTabBar="true"></wz-suspension>
		</view>
		<!-- 无列表数据 -->
		<view
			class="empty"
			v-if="normalList.length == 0 && invalidList.length == 0"
		>
			<image src="../../static/images/cart_empty.png" mode=""></image>
			<view class="title"> 暂无任何商品 </view>
		</view>
		<view class="cart-list">
			<view
				class="cart-item"
				v-for="(item, index) in normalList"
				:key="index"
			>
				<!-- 店铺列表 -->
				<view class="store flex-start-center">
					<image
						src="/static/images/cart/circle-active.png"
						class="circle-icon"
						v-if="item.checked == 2"
						@tap="storeCheck(index, item.checked)"
					></image>
					<image
						src="/static/images/cart/circle.png"
						class="circle-icon"
						v-else
						@tap="storeCheck(index, item.checked)"
					></image>
					<image :src="item.logoUrl" class="store-img"></image>
					<text>{{ item.storeName }}</text>
				</view>
				<option-list
					:itemHeight="itemHeight"
					:list="item.goodsList"
					:threshold="threshold"
					@optionClick="deleteItem"
					:options="options1"
				>
					<template slot-scope="{ item }">
						<view class="item">
							<view class="goods-item flex">
								<view
									@tap.stop="
										goodsCheck(index, item, item.checked)
									"
									style="width: 50rpx; height: 80rpx"
								>
									<image
										src="/static/images/cart/circle-active.png"
										v-if="item.checked == 2"
										class="circle-icon"
									></image>
									<image
										src="/static/images/cart/circle.png"
										v-else
										class="circle-icon"
									></image>
								</view>

								<view class="goods-info-wrap" style="flex: 1">
									<view class="info-up flex-start-center">
										<view class="image-wrap">
											<image
												:src="item.skuImgUrl"
												class="goods-img"
											></image>
										</view>
										<view class="goods-info">
											<view class="name"
												>{{ item.goodsName
												}}{{ item.index }}
												{{ item.skuName }}
											</view>
											<view class="store-name">{{
												item.brandName
											}}</view>
											<view class="price"
												>¥{{
													(item.price == 0
														? "****"
														: item.price)
														| formatePrice
												}}</view
											>
										</view>
									</view>
									<view class="info-down flex-between-center">
										<text></text>
										<view
											class="input-wrap flex-start-center"
										>
											<u-number-box
												:input-height="48"
												size="30rpx"
												:step="item.type==0?1:item.packageNum"
												:index="index"
												:min="item.packageNum"
												:max="
													item.stockAmount
														? item.stockAmount
														: 99999
												"
												v-model="item.amount"
												@blur="
													changeNum(
														index,
														item,
														item.amount
													)
												"
												@minus="
													sub(
														index,
														item,
														item.amount
													)
												"
												@plus="
													add(
														index,
														item,
														item.amount
													)
												"
											></u-number-box>
										</view>
									</view>
								</view>
							</view>
						</view>
					</template>
				</option-list>
			</view>
		</view>
		<!-- 失效列表 -->
		<view class="cart-list disabled-list" v-if="invalidList.length > 0">
			<view class="disabled-label flex-between-center">
				<text>失效商品2件</text>
			</view>
			<view
				class="cart-item"
				v-for="(item, index) in invalidList"
				:key="index"
			>
				<view class="store flex-start-center">
					<text>{{ item.storeName }}</text>
					<image
						src="/static/images/arrow_left.png"
						class="small-arrow-icon"
						mode="aspectFit"
					></image>
				</view>
				<view v-for="(items, indexs) in item.goodsList" :key="indexs">
					<delSlideLeft
						:item="items"
						:data_transit="{ index: indexs, item: items }"
						@close="close(index, items)"
						@delItem="deleteItem(index, items)"
					>
						<view class="goods-item flex-start-center">
							<view class="image-wrap">
								<image
									:src="items.skuImgUrl"
									class="goods-img"
								></image>
								<image
									src="/static/images/cart/down.png"
									class="status-img"
								></image>
							</view>
							<view class="goods-info">
								<view class="name"
									>{{ items.goodsName
									}}{{ items.skuName }}</view
								>
								<view class="store-name"></view>
								<view class="price flex-between-center">
									<text
										>¥{{
											(items.price == 0
												? "****"
												: items.price) | formatePrice
										}}</text
									>
									<text class="status">已售磬</text>
								</view>
							</view>
						</view>
					</delSlideLeft>
				</view>
			</view>
		</view>
		<view
			class="footer fixed-bottom flex-between-center"
			v-if="normalList.length !== 0 || invalidList.length !== 0"
		>
			<view class="footer-left flex-start-center">
				<image
					src="/static/images/cart/circle-active.png"
					v-if="allActive"
					@tap="allCheck"
					class="circle-icon"
				>
				</image>
				<image
					src="/static/images/cart/circle.png"
					v-else
					@tap="allCheck"
					class="circle-icon"
				></image>
				<text>全选</text>
			</view>
			<view class="footer-right flex-start-center">
				合计：<text class="total"
					>¥{{ totalPrices | formatePrice }}</text
				>
				<view
					class="submit-btn flex-center-center"
					@click="orderStatistics"
					>去结算</view
				>
			</view>
		</view>
	</view>
</template>

<script>
import optionList from "@/components/gzz-option-list/option-list.vue";
import formatePrice from "@/mixins/formatePrice";
import { isLogin } from "@/libs/isLogin";
export default {
	components: {
		optionList,
	},
	mixins: [formatePrice],
	data() {
		return {
			normalList: [],
			invalidList: [],
			value: 0,
			show: false,
			allActive: false,
			options1: [
				//左滑的操作列表
				{
					color: "#ffffff", //字体颜色，非必须，默认 #ffffff
					bgColor: "#ff7247", //背景颜色，非必须，默认 #409EFF
					text: "删除", //展示文字
					width: 120, //按钮宽度 默认120rpx 适合两个字的宽度 这个宽度按需调整
				},
			],
			options: [
				{
					text: "删除",
					style: {
						backgroundColor: "#ff7247",
					},
				},
			],
			totalPrices: 0, //商品总价,
			orderFormList: [], //订单列表
			isShowSuspension: false,
			itemHeight: 260,
			threshold: 50,
			cartTotal:null
		};
	},
	onShow() {
		this.comunicationOff();
		this.getCartTotal()
		isLogin().then((v) => {
			if (v) {
				this.getCarList();
				// 购物车列表更新
				uni.$on("cartUpdate", (data) => {
					this.getCarList();
					this.allActive = false;
					this.totalPrices = 0;
				});
			}
		});

		var divisionData = getApp().globalData.customerData;
		if (divisionData) {
			this.isShowSuspension = true;
		}
	},

	methods: {
		comunicationOff() {
			uni.$off("cartUpdate", this.cartUpdate);
		},
		// 结算
		handleSubmit() {
			uni.navigateTo({
				url: "/pages/cart/order?sourceType=1",
			});
		},
		// 获取购物车列表
		getCarList() {
			this.normalList = [];
			this.allActive = false;
			const customerId = uni.getStorageSync("customerId");
			this.$myRequest({
				method: "GET",
				url: "/goods/cart/cartList?customerId=" + customerId,
			})
				.then((res) => {
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
					this.normalList = dataList.normal;
					uni.setStorageSync("cartList", this.normalList);
					dataList.invalid.forEach((item, index) => {
						item.checked = 1;
						item.goodsList.forEach((items, indexs) => {
							items.checked = 1;
							items.show = false;
						});
						1;
					});
					this.invalidList = dataList.invalid;
				})
				.catch((err) => {
					uni.showToast({
						title: "网络连接失败，请稍后再试",
						icon: "none",
					});
				});
		},
		/**
		 *  @param {*} storeIndex 店铺索引
		 *  @param {*} goodsIndex 商品索引
		 *  @param {*} goodsnum 商品数量
		 * */
		saveInputCart(storeIndex, goodsItem, goodsnum) {
			// 接口为递增递减，输入数字需要用输入的值减去原来的值，然后直接传参
			let cartList = uni.getStorageSync("cartList");
			let goodData = {};
			// 获取本地存储的购物车数据，参与计算
			cartList[storeIndex].goodsList.forEach((item, index) => {
				if (item.cartId === goodsItem.cartId) {
					goodData = item;
				}
			});
			let amount = goodsnum - goodData.amount;
			const customerId = uni.getStorageSync("customerId");
			let goodsInfo = goodsItem;
			let data = {
				storeId: goodsInfo.storeId,
				goodsId: goodsInfo.id,
				skuId: goodsInfo.skuId,
				amount: amount,
				price: goodsInfo.price,
				skuPriceId: goodsInfo.skuPriceId,
				customerId: customerId,
			};
			this.$myRequest({
				method: "POST",
				url: "/goods/cart/saveCart",
				data: data,
			})
				.then((res) => {
					if (res.success !== 1) {
						uni.showToast({
							title: res.msg,
							icon: "none",
							duration: 2500,
						});
						let timer1 = setTimeout(
							function () {
								cartList[storeIndex].goodsList.forEach(
									(item, index) => {
										if (item.cartId === goodsItem.cartId) {
											if (goodsItem.stockAmount) {
												this.$set(
													this.normalList[storeIndex]
														.goodsList[index],
													"amount",
													item.stockAmount
												);
											} else {
												this.$set(
													this.normalList[storeIndex]
														.goodsList[index],
													"amount",
													item.amount
												);
											}
											uni.setStorageSync(
												"cartList",
												this.normalList
											);
										}
									}
								);
								this.statistics();
							}.bind(this),
							1000
						);
					} else {
						if (goodsItem.type == 1 || goodsItem.type == 2) {
							uni.showToast({
								title: "以按商品起批为您调整",
								icon: "none",
								duration: 2500,
							});
							let timer2 = setTimeout(
								function () {
									cartList[storeIndex].goodsList.forEach(
										(item, index) => {
											if (
												item.cartId === goodsItem.cartId
											) {
												this.$set(
													this.normalList[storeIndex]
														.goodsList[index],
													"amount",
													goodsnum
												);
												uni.setStorageSync(
													"cartList",
													this.normalList
												);
											}
										}
									);
									this.statistics();
								}.bind(this),
								1000
							);
						}
					}
					uni.setStorageSync("cartList", this.normalList);
				})
				.catch((err) => {
					uni.showToast({
						title: "网络连接失败，请稍后再试",
						icon: "none",
					});
				});
		},
		changeNum(storeIndex, goodsItem, goodsnum) {
			// 输入数值填充不参与计算
			this.normalList[storeIndex].goodsList.find((item, index) => {
				if (item.cartId === goodsItem.cartId) {
					item.amount = goodsItem.amount;
				}
			});
			if (goodsnum % goodsItem.packageNum !== 0) {
				if (
					goodsnum % goodsItem.packageNum >=
					goodsItem.packageNum / 2
				) {
					goodsnum =
						goodsnum -
						(goodsnum % goodsItem.packageNum) +
						goodsItem.packageNum;
				} else {
					goodsnum = goodsnum - (goodsnum % goodsItem.packageNum);
				}
				this.saveInputCart(storeIndex, goodsItem, goodsnum);
			} else {
				// 接口为递增递减，输入数字需要用输入的值减去原来的值，然后直接传参
				let cartList = uni.getStorageSync("cartList");
				let goodData = {};
				// 获取本地存储的购物车数据，参与计算
				cartList[storeIndex].goodsList.forEach((item, index) => {
					if (item.cartId === goodsItem.cartId) {
						goodData = item;
					}
				});
				let amount = goodsnum - goodData.amount;
				this.saveCart(storeIndex, goodsItem, amount);
			}
			// }
			// 实时更新本地数据，方便多次修改计算
			this.statistics();
		},
		// 减少
		sub(storeIndex, goodsItem, goodsnum) {
			uni.hideKeyboard();
			let goodData = goodsItem;
			this.normalList[storeIndex].goodsList.find((item, index) => {
				if (item.cartId === goodsItem.cartId) {
					item.amount = goodsItem.amount;
				}
			});
			let amount = -1;
			if (goodData.type == 1 || goodData.type == 2) {
				amount = -goodData.packageNum;
			}
			this.saveCart(storeIndex, goodsItem, amount);
			this.statistics();
		},

		//增加
		add(storeIndex, goodsItem, goodsnum) {
			uni.hideKeyboard();
			// 实时统计当前商品数量
			let goodData = goodsItem;
			this.normalList[storeIndex].goodsList.find((item, index) => {
				if (item.cartId === goodsItem.cartId) {
					item.amount = goodsItem.amount;
				}
			});
			let amount = 1;
			if (goodData.type == 1 || goodData.type == 2) {
				amount = goodData.packageNum;
			}
			this.saveCart(storeIndex, goodsItem, amount);
			this.statistics();
		},
		saveCart(storeIndex, goodsItem, goodsnum) {
			const customerId = uni.getStorageSync("customerId");
			let goodsInfo = goodsItem;
			let data = {
				storeId: goodsInfo.storeId,
				goodsId: goodsInfo.id,
				skuId: goodsInfo.skuId,
				amount: goodsnum,
				price: goodsInfo.price,
				skuPriceId: goodsInfo.skuPriceId,
				customerId: customerId,
			};
			this.$myRequest({
				method: "POST",
				url: "/goods/cart/saveCart",
				data: data,
			})
				.then((res) => {
					if (res.success !== 1) {
						uni.showToast({
							title: res.msg,
							icon: "none",
							duration: 2500,
						});
						let cartList = uni.getStorageSync("cartList");
						let timet = setTimeout(
							function () {
								cartList[storeIndex].goodsList.forEach(
									(item, index) => {
										if (item.cartId === goodsItem.cartId) {
											if (goodsItem.stockAmount) {
												this.$set(
													this.normalList[storeIndex]
														.goodsList[index],
													"amount",
													item.stockAmount
												);
											} else {
												this.$set(
													this.normalList[storeIndex]
														.goodsList[index],
													"amount",
													item.amount
												);
											}
											uni.setStorageSync(
												"cartList",
												this.normalList
											);
										}
									}
								);
								this.statistics();
							}.bind(this),
							1000
						);
					} else {
						uni.setStorageSync("cartList", this.normalList);
					}
				})
				.catch((err) => {
					uni.showToast({
						title: "网络连接失败，请稍后再试",
						icon: "none",
					});
				});
		},
		// 删除购物车
		deleteItem(params) {
			this.$myRequest({
				method: "POST",
				url: "/goods/cart/deleteCart",
				data: {
					id: params.cartId,
				},
			})
				.then((res) => {
					if (res.success === 1) {
						// 删除成功，列表移除
						this.normalList.forEach((item, index) => {
							if (item.storeId === params.storeId) {
								item.goodsList.forEach((items, indexs) => {
									if (items.cartId === params.cartId) {
										item.goodsList.splice(indexs, 1);
										this.statistics();
									}
								});
							}
							if (item.goodsList.length == 0) {
								this.normalList.splice(index, 1);
							}
						});
						// 删除列表的同时刷新购物车统计数
						this.getCartTotal()
					}
					uni.setStorageSync("cartList", this.normalList);
					uni.showToast({
						title: res.data,
						icon: "none",
					});
				})
				.catch((err) => {
					uni.showToast({
						title: "网络连接失败，请稍后再试",
						icon: "none",
					});
				});
		},
		// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
		close(param, param1) {
			this.normalList.forEach((item, index) => {
				item.goodsList.forEach((items, indexs) => {
					item.txtStyle = "left:0px";
				});
			});
			this.invalidList.forEach((item, index) => {
				item.goodsList.forEach((items, indexs) => {
					item.txtStyle = "left:0px";
				});
			});
		},
		// 商品选择
		goodsCheck(storeIndex, goodsItem, goodsChecked) {
			if (goodsChecked == 1) {
				this.normalList[storeIndex].goodsList.forEach((item, index) => {
					if (item.cartId === goodsItem.cartId) {
						item.checked = 2;
					}
				});
			} else {
				this.normalList[storeIndex].goodsList.forEach((item, index) => {
					if (item.cartId === goodsItem.cartId) {
						item.checked = 1;
					}
				});
			}
			//判断是否该店铺全选
			let storeChecked = true;
			this.normalList[storeIndex].goodsList.map((item, index) => {
				if (item.checked == 1) {
					storeChecked = false;
				}
			});
			if (storeChecked == false) {
				this.normalList[storeIndex].checked = 1;
			} else {
				this.normalList[storeIndex].checked = 2;
			}
			//判断是否全选
			let allActive = true;
			this.normalList.find((item, index) => {
				if (item.checked == 1) {
					allActive = false;
				}
			});
			if (allActive == false) {
				this.allActive = false;
			} else {
				this.allActive = true;
			}

			this.statistics();
		},
		//店铺选择
		storeCheck(storeIndex, storeCheck) {
			if (storeCheck == 1) {
				this.normalList[storeIndex].checked = 2;
				this.normalList[storeIndex].goodsList.find((item, index) => {
					item.checked = 2;
				});
			} else {
				this.normalList[storeIndex].checked = 1;
				this.normalList[storeIndex].goodsList.find((item, index) => {
					item.checked = 1;
				});
			}
			//判断是否全选
			let allActive = true;
			this.normalList.find((item, index) => {
				if (item.checked == 1) {
					allActive = false;
				}
			});
			if (allActive == false) {
				this.allActive = false;
			} else {
				this.allActive = true;
			}
			this.statistics();
		},
		//统计
		statistics() {
			let total = 0;
			this.normalList.find((item, index) => {
				item.goodsList.find((itemq, indexq) => {
					if (itemq.checked == 2) {
						total = total + itemq.price * itemq.amount;
					}
				});
			});
			this.totalPrices = total.toFixed(2);
		},
		// 订单信息统计
		orderStatistics() {
			let userInfo = uni.getStorageSync("userInfo");
			if (userInfo.buyerQualificationStatus !== 0)
				return uni.showToast({ title: "采购资质异常", icon: "none" });
			if (userInfo.status == 1)
				return uni.showToast({ title: "客户已被停用", icon: "none" });
			this.orderFormList = [];
			uni.setStorageSync("orderInfo", this.orderFormList);
			let goodsInfo = {};
			this.normalList.find((item, index) => {
				goodsInfo = {
					storeName: item.storeName,
					storeId: item.storeId,
					logoUrl: item.logoUrl,
					totalAmount: 0,
					totalPrices: 0,
					goodsList: [],
				};
				item.goodsList.find((itemq, indexq) => {
					if (itemq.checked == 2) {
						goodsInfo.goodsList.push(itemq);
						goodsInfo.totalPrices =
							goodsInfo.totalPrices + itemq.price * itemq.amount; //价格统计
						goodsInfo.totalAmount =
							goodsInfo.totalAmount + itemq.amount; //数量统计
						goodsInfo.skuPriceId = itemq.skuPriceId; //价格ID
					}
				});
				if (goodsInfo.goodsList.length !== 0)
					this.orderFormList.push(goodsInfo);
			});
			uni.setStorageSync("orderInfo", this.orderFormList);
			if (this.orderFormList.length == 0)
				return uni.showToast({
					title: "您没有选择商品",
					icon: "none",
				});
			this.handleSubmit();
		},
		//全选
		allCheck() {
			if (this.allActive) {
				this.normalList.find((item, index) => {
					item.checked = 1;
					item.goodsList.find((itemq, indexq) => {
						itemq.checked = 1;
					});
				});
				this.allActive = false;
			} else {
				this.normalList.find((item, index) => {
					item.checked = 2;
					item.goodsList.find((itemq, indexq) => {
						itemq.checked = 2;
					});
				});
				this.allActive = true;
			}
			this.statistics();
		},
		getCartTotal(){
			const customerId = uni.getStorageSync("customerId");
			this.$myRequest({
				method: "GET",
				url: "/goods/cart/cartTotal?customerId=" + customerId,
			}).then((res) => {
				this.cartTotal = res.data.total
				if(this.cartTotal>99){
					this.cartTotal=99
				}
				if(this.cartTotal>0){
					uni.setTabBarBadge({
					  index:3,
					  text: JSON.stringify(this.cartTotal)
					})
				}else{
					uni.removeTabBarBadge({
						index:3
					})
				}

				uni.setStorageSync('cartTotal',this.cartTotal)
			})
		}
	},
};
</script>

<style lang="scss" scoped>
.content {
	padding: 30rpx 30rpx 88rpx;
	background-color: #f7f6f6;
}

.empty {
	width: 188rpx;
	height: 174rpx;
	margin: 300rpx auto;

	image {
		width: 133rpx;
		height: 97rpx;
		margin-left: 20rpx;
	}

	.title {
		font-size: 32rpx;
		text-align: center;
		color: #666666;
		margin-top: 45rpx;
	}
}

.disabled-label {
	padding: 0 20rpx;
	font-size: 28rpx;
	color: #999;
	border-radius: 10rpx 10rpx 0 0;
	border-bottom: 1rpx solid #eaeaea;
	background: #fff;

	text {
		display: flex;
		padding: 30rpx 0;
	}

	.reset-btn {
		color: #ff7247;
	}
}

.cart-item {
	margin-bottom: 20rpx;
	background: #fff;
	border-radius: 10rpx;

	.circle-icon {
		margin-right: 20rpx;
		width: 36rpx;
		height: 36rpx;
	}

	.store-img {
		margin-right: 20rpx;
		width: 60rpx;
		height: 60rpx;
		border-radius: 10rpx;
	}

	.store {
		padding: 20rpx;
		color: #333333;
		font-size: 30rpx;
		border-bottom: 1rpx solid #eaeaea;
	}

	.goods-item {
		padding: 30rpx 20rpx 0;
		.goods-info-wrap {
			width: 590rpx;
			flex: 1;
			// border-bottom: 1rpx solid #f4f4f4;
		}

		.store {
			padding: 20rpx;
			color: #333333;
			font-size: 32rpx;
			border-bottom: 1rpx solid #eaeaea;
		}

		.circle-icon {
			margin-top: 50rpx;
		}

		.image-wrap {
			margin-right: 30rpx;
			position: relative;
		}

		.goods-img {
			width: 120rpx;
			height: 120rpx;
			border-radius: 10rpx;
		}

		.status-img {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			width: 80rpx;
			height: 80rpx;
			z-index: 10;
		}

		.name {
			width: 405rpx;
			margin-bottom: 5rpx;
			font-size: 32rpx;
			color: #333;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		.store-name {
			margin-bottom: 10rpx;
			font-size: 24rpx;
			color: #999;
		}

		.price {
			font-size: 32rpx;
			color: #ff5d2b;
			font-weight: bold;
			font-family: PingFang SC, PingFang SC-Bold;
		}

		.info-down {
			padding: 16rpx 0 30rpx;
			color: #666666;
			font-size: 24rpx;

			.input-wrap {
				border-radius: 4rpx;
			}

			.btn {
				width: 51rpx;
				height: 48rpx;
			}

			image {
				width: 19rpx;
				height: 19rpx;
			}

			input {
				width: 90rpx;
				height: 48rpx;
				text-align: center;
				background: #f3f3f3;
				border-radius: 4rpx;
				color: #333333;
				font-size: 30rpx;
			}
		}
	}
}

.disabled-list {
	margin-bottom: 30rpx;

	.cart-item {
		margin-bottom: 0;
		padding: 0 30rpx;
		border-radius: 0;
		border-bottom: 1rpx solid #eaeaea;

		&:last-child {
			border-bottom: 0;
			border-radius: 0 0 10rpx 10rpx;
		}
	}

	.store {
		padding: 30rpx 0 10rpx;
		border-bottom: 0;
	}

	.goods-item {
		padding: 30rpx 0;
		border-bottom: 1rpx solid #f7f7f7;

		&:last-child {
			border: 0;
		}
	}

	.goods-info {
		flex: 1;
	}

	.name {
		color: #999 !important;
	}

	.store-name {
		color: #999 !important;
	}

	.price {
		color: #999 !important;
	}

	.status {
		color: #333333;
		font-weight: normal;
		font-size: 30rpx;
	}
}

.footer {
	padding: 0 30rpx;
	height: 88rpx;
	font-size: 32rpx;
	color: #333333;
	background: #fff;

	.circle-icon {
		margin-right: 20rpx;
		width: 36rpx;
		height: 36rpx;
	}

	.total {
		color: #ff5d2b;
		font-size: 32rpx;
		font-weight: bold;
	}

	.submit-btn {
		margin-left: 30rpx;
		width: 160rpx;
		height: 60rpx;
		color: #ffffff;
		background: #ff7247;
		border-radius: 30rpx;
		font-size: 28rpx;
	}
}
</style>
