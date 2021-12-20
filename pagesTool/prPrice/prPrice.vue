<template>
	<view class="page-wrap">
		<view style="position: relative">
			<my-search
				:inputDisable="true"
				placeholderText="方剂名称或拼音首字母"
				:searchkey="info.name"
				@searchData="clearPr"
			></my-search>
			<view
				style="
					position: absolute;
					height: 80rpx;
					top: 10rpx;
					background-color: #000;
					width: 600rpx;
					z-index: 2;
					opacity: 0;
				"
				@click.stop="goSearchPr"
			></view>
		</view>

		<scroll-view scroll-y="true" class="container">
			<view class="content">
				<view class="top-wrap">
					<view class="pr-brand app-f app-f-aic">
						<view>中药处方</view>
						<picker
							class="top-select"
							:value="brandIndex"
							@change="changeBrand"
							range-key="name"
							:range="brandList"
						>
							<view class="uni-input">
								{{
									brandList[brandIndex]
										? brandList[brandIndex].name
										: "云药房"
								}}
							</view>
						</picker>
						<picker
							class="top-select app-f-f1"
							:value="prType"
							@change="changeSetPrType"
							:range="setPrTypeArr"
						>
							<view class="uni-input">
								{{ setPrTypeArr[prType] }}
							</view>
						</picker>
					</view>
					<view class="singl-info">
						共<text space="emsp"> {{ totalDrug - 1 }} </text
						>味，单剂<text space="emsp"> ￥{{ singlePrice }} </text
						>元
					</view>
				</view>
				<view class="info-content app-f app-f-fww">
					<view
						class="info-item"
						v-for="(drug, drugIdx) in info.goodsList"
						:key="drugIdx"
					>
						<drug-item
							:index="drugIdx"
							:total="totalDrug"
							:info="drug || {}"
							:brandId="currentBrandId"
						>
						</drug-item>
					</view>
				</view>
				<view class="info-total-wrap">
					<view class="info-total app-f app-f-aic">
						<view class="info-total-item app-f app-f-aic">
							<picker
								:value="totalIndex"
								mode="selector"
								@change="changeTotal"
								:range="numberList"
							>
								<view class="total-input uni-input">{{
									numberList[totalIndex]
								}}</view>
							</picker>
							剂
						</view>
						<view class="info-total-item app-f app-f-aic">
							<picker
								:value="useIndex"
								range-key="name"
								@change="changeUseType"
								:range="useDrugList"
							>
								<view class="total-input total-input-second">
									{{
										useDrugList[useIndex]
											? useDrugList[useIndex].name
											: "沸水冲服"
									}}
								</view>
							</picker>
						</view>
						<view class="info-total-item app-f app-f-aic"
							>1日
							<picker
								:value="useCountIdx"
								@change="changeUseCount"
								:range="numberList"
							>
								<view class="total-input">
									{{ numberList[useCountIdx] }}
								</view>
							</picker>
							剂
						</view>
					</view>
					<view class="info-total app-f app-f-aic">
						<view class="info-total-item app-f app-f-aic">
							1剂分
							<picker
								:value="onePiceIdx"
								@change="changeOnePice"
								:range="numberList"
							>
								<view class="total-input">
									{{ numberList[onePiceIdx] }}
								</view>
							</picker>
							次服用
						</view>
						<view class="info-total-item app-f app-f-aic">
							<picker
								:value="markIdx"
								range-key="content"
								@change="changeMark"
								:range="markList"
							>
								<view class="total-input total-input-last">
									{{
										markList[markIdx]
											? markList[markIdx].content
											: "饭后服用"
									}}
								</view>
							</picker>
						</view>
					</view>
				</view>
				<view class="price-wrap app-f app-f-aic">
					<view
						class="final-price app-f-f1 app-f app-f-aic app-f-jcc"
					>
						<view
							>结算价 ￥<text>{{
								isShowPrice ? finalPrice : "***"
							}}</text>
						</view>
						<view
							@tap="changePriceShowOrHide"
							class="app-f app-f-aic"
						>
							<image
								class="hide-price"
								v-if="!isShowPrice"
								src="/static/images/prPrice/hide-price.png"
							>
							</image>
							<image
								class="show-price"
								v-if="isShowPrice"
								src="/static/images/prPrice/show-price.png"
							>
							</image>
						</view>
					</view>
					<view
						class="single-price app-f-f1 app-f app-f-aic app-f-jcc"
					>
						零售价 <text>￥{{ totalPrice }}</text>
					</view>
				</view>
				<view style="height: 88rpx; margin-top: 40rpx"> </view>
			</view>
		</scroll-view>

		<!-- <tip :title='tipText' v-if='showTip'></tip>
		<full-modal :showModal="showRegisterModal" @closeModal='showRegisterModal=false'>

			<template v-slot:content>
				<view class="register-modal">
				<view>注册采药么</view>
				<view>结算价<text>直降50%</text> </view>
				<view class="app-f app-jcc app-aic">
					<view class="register-btn" @tap="goCaiyaome">注册</view>
				</view>
			</view>
			</template>
		</full-modal> -->
	</view>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { getNum, grainToBag, bagToGrain } from "@/libs/tool.js";
export default {
	data() {
		return {
			brandList: [],
			numberList: [
				1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
			],
			totalIndex: 0,
			isShowPrice: true,
			showTip: false,
			tipText: "",
			brandIndex: 0,
			setPrTypeArr: ["按袋开方", "按饮片克数开方"],
			prType: 0,
			useDrugList: [],
			useIndex: 0,
			useCountIdx: 0,
			onePiceIdx: 0,
			markList: [],
			markIdx: 0,
			showRegisterModal: false,
			isVip: false,
			isOverLimitTime: true,
			goBackTimer: null,
		};
	},
	computed: {
		...mapState({
			info: (state) => state.prPrice.info,
			userInfo: (state) => state.user.userInfo,
			prTypeTxt: (state) => state.prPrice.prTypeTxt,
		}),

		totalDrug() {
			if (!this.info.goodsList) return 0;
			return this.info.goodsList.length;
		},
		totalPrice() {
			const list = this.info.goodsList;
			if (list.length === 0) return 0;
			let total = 0;
			const num = this.numberList[this.totalIndex];
			list.forEach((item) => {
				if (!item || item.brandId === 1) return;
				const { unit, quantity, effectRatio, brandId, price, state } =
					item;
				if (state === 0) return;
				if (unit === "袋") {
					let count = (quantity || 0) * (num || 1);
					if (count - Math.floor(count) > 0)
						count = Math.floor(count) + 1;
					total += price * count;
				}
				if (unit === "克" && brandId !== 25) {
					let count = num * getNum(quantity / (effectRatio || 1));
					if (count - Math.floor(count) > 0)
						count = Math.floor(count) + 1;
					total += price * count;
				}
				if (unit === "克" && brandId === 25) {
					let count = (num * quantity) / (effectRatio || 1);
					count = count > 0.1 ? Math.ceil(count * 10) / 10 : 0.1;
					total += price * count;
				}
			});
			total = Math.round(total * 1000) / 1000;
			// console.log(prNum);
			return total > 0 ? Math.round(total * 100) / 100 : 0.0;
		},

		finalPrice() {
			const list = this.info.goodsList;
			if (list.length === 0) return 0;
			let total = 0;
			const num = this.numberList[this.totalIndex];
			const isCloudPharmacy =
				this.brandList[this.brandIndex] &&
				this.brandList[this.brandIndex].id === 25;
			list.forEach((item) => {
				if (!item || item.brandId === 1) return;
				if (item.state === 0) return;
				const price = isCloudPharmacy
					? item.price || 0
					: item.costPrice || 0;
				const { quantity, effectRatio, unit, overNum, brandId } = item;
				if (unit === "袋") {
					let count = quantity * (effectRatio || 1) - (overNum || 0);

					count = (count * num) / (effectRatio || 1);

					count =
						count - Math.floor(count) > 0
							? Math.floor(count) + 1
							: count;
					total += price * count;
				}
				if (unit === "克" && brandId !== 25) {
					let count = (num * quantity) / (effectRatio || 1);
					count =
						count - Math.floor(count) > 0
							? Math.floor(count) + 1
							: count;
					total += price * count;
				}
				if (unit === "克" && brandId === 25) {
					let count = (num * quantity) / (effectRatio || 1);
					count = count > 0.1 ? Math.ceil(count * 10) / 10 : 0.1;
					total += price * count;
				}
			});
			if (isCloudPharmacy) {
				total = total * 0.55;
			}
			total = Math.round(total * 1000) / 1000;
			return total > 0 ? Math.round(total * 100) / 100 : 0.0;
		},
		singlePrice() {
			const total = this.totalPrice;
			const count = this.numberList[this.totalIndex];
			let res = total / count;
			res = Math.round(res * 1000) / 1000;
			return Math.round(res * 100) / 100;
		},
		currentBrandId() {
			const list = this.brandList;
			if (list.length === 0) return null;
			return list[this.brandIndex].id;
		},
	},
	onLoad(options) {
		this.clearPr();
		this.getBrandList();
		this.getUseDrugList();
		this.getMarkList();
	},
	onShow() {
		this.showRegisterModal = false;
	},

	watch: {
		info: {
			handler: function (v) {
				if (v.goodsList.length === 1) {
					this.prType = 0;
					this.setPrTypeArr["按饮片克数开方"];
					this.brandIndex = 0;
					this.totalIndex = 0;
				}
			},
			deep: true,
		},
		prType: {
			handler: function (v) {
				const str = this.setPrTypeArr[this.prType];
				const res = str.indexOf("克") > -1 ? "克" : "袋";
				// console.log(str)
				this.setPrTypeTxt(res);
				// console.log(this.prTypeTxt)
			},
			deep: true,
		},
	},

	methods: {
		...mapMutations({
			setPrInfo: "prPrice/setInfo",
			setPrTypeTxt: "prPrice/setPrTypeTxt",
		}),
		clearPr(v) {
			!v &&
				this.setPrInfo({
					name: "",
					id: null,
					goodsList: [null],
				});
		},
		async changeBrand(e) {
			const v = e.detail.value;
			const info = this.info;
			const newIsCloudPharmacy = this.brandList[v].id === 25;
			if (info.goodsList.length === 1) {
				this.setPrTypeArr = newIsCloudPharmacy
					? ["按饮片克数开方"]
					: ["按饮片克数开方", "按袋开方"];
				this.prType = 0;
				this.brandIndex = v;
				return;
			}
			const list = JSON.parse(JSON.stringify(info.goodsList));
			list.splice(-1, 1);
			const param = {
				brandId: this.brandList[v].id,
				goodsJson: JSON.stringify(list),
			};
			const userInfo = this.userInfo;
			userInfo.brandsId && (param.brandsId = userInfo.brandsId);
			const res = await this.$toolRequest({
				url: "/base/baseGoodsSku/appletsChangeBrand",
				method: "POST",
				data: param,
			});
			if (res.success !== 1) {
				uni.showToast({
					title: "品牌切换失败",
					icon: "none",
				});
				return;
			}

			const reslist = [...res.data.goodsList];
			reslist.forEach((item, index) => {
				const unit = list[index].unit;
				if (unit === "克") {
					(item.quantity = list[index].quantity), (item.overNum = 0);
				} else if (unit === "袋") {
					const count = Math.round(
						list[index].quantity * (list[index].effectRatio || 1) -
							(list[index].overNum || 0)
					);
					item.overNum = 0;
					item.quantity = count;
				}
				item.unit = "克";
			});
			(this.setPrTypeArr = newIsCloudPharmacy
				? ["按饮片克数开方"]
				: ["按饮片克数开方", "按袋开方"]),
				(this.prType = 0);
			this.brandIndex = v;


			info.goodsList = [...reslist, null];
			this.setPrInfo(info);
		},
		changeTotal(e) {
			this.totalIndex = e.detail.value;
		},
		async getBrandList() {
			const res = await this.$toolRequest({
				url: "/base/baseBrand/list",
				data: {
					dataType: 0,
				},
			});
			// console.log(res)
			if (!res || res.success !== 1) {
				uni.showToast({
					title: res.msg,
					icon: "none",
				});
				uni.hideLoading();
				return;
			}

			const list = res.data.filter((item) => item.id !== 1);
			const obj = list.find((item) => item.id === 25);
			const arr = list.filter((item) => item.id !== 25);
			this.brandList = [obj, ...arr];
			this.setPrTypeArr = ["按饮片克数开方"];
		},
		changeSetPrType(e) {
			const v = e.detail.value;
			if (this.prType == v) return;
			const info = this.info;
			const list = info.goodsList;

			if (list.length === 1) {
				this.prType = v;
				return;
			}

			const res = v == 0 ? bagToGrain(list) : grainToBag(list);
			info.goodsList = [...res];
			this.prType = v;
			this.setPrInfo(info);
		},
		async getUseDrugList() {
			const res = await this.$toolRequest({
				url: "/base/basePharmacyWay/list",
				data: {},
				method: "POST",
			});
			if (res.success !== 1) return;
			this.useDrugList = res.data.list;
		},
		async getMarkList() {
			const res = await this.$toolRequest({
				url: "/base/baseDefaultRemark/list",
				data: {},
				method: "POST",
			});
			if (res.success !== 1) return;
			this.markList = res.data.list;
		},
		changeUseType(e) {
			this.useIndex = e.detail.value;
		},
		changeUseCount(e) {
			this.useCountIdx = e.detail.value;
		},
		changeOnePice(e) {
			this.onePiceIdx = e.detail.value;
		},
		changeMark(e) {
			this.markIdx = e.detail.value;
		},
		goSearchPr() {
			this.brandIndex = 0;
			this.setPrTypeArr = ["按饮片克数开方"];
			this.prType = 0;
			this.totalIndex = 0;
			this.$goPage("/pagesTool/prSearch/prSearch");
		},
		async getUserInfo() {
			let userInfo = uni.getStorageSync("userInfo");
			this.$toolRequest({
				url: "/appletsUser/getById/" + userInfo.id,
			}).then((res) => {
				!!res &&
					res.success === 1 &&
					(userInfo = {
						...res.data,
					});
				if (!userInfo.phone) {
					uni.showModal({
						title: "温馨提示",
						content: "绑定手机号，方可访问",
						showCancel: false,
						confirmColor: "#FF981E",
						success: (opRes) => {
							if (opRes.confirm) {
								this.$goPage("/pagesA/phone/phone", {
									phone: "",
								});
							}
						},
					});
				} else {
					this.getUserAuthority(userInfo);
				}
			});
		},
		getUserAuthority(info) {
			const { phone, unionid } = info;
			if (!unionid) {
				uni.showModal({
					title: "温馨提示",
					content: "请授权登录，方可正常使用",
					success: (res) => {
						if (res.confirm) {
							uni.removeStorageSync("userInfo");
							uni.removeStorageSync("Token");
							uni.reLaunch({
								url: "/pages/login/login",
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					},
				});
			} else {
				this.$toolRequest({
					url: "/user/search",
					data: {
						uid: unionid,
						phone: phone,
					},
				}).then((res) => {
					// console.log(res, '请求采药么')
					const data =
						!res || res.success !== 1
							? info
							: {
									...res.data,
							  };
					const { isVip, dueDate, useCount } = data;

					this.isVip = isVip > 0;
					this.isOverLimitTime = this.isOverTime(dueDate);

					uni.setStorageSync("userInfo", data);

				});
			}
		},
		isOverTime(v) {
			if (!v) return true;
			const limitTime = new Date(v).getTime();
			const nowTime = new Date().getTime();
			return limitTime < nowTime;
		},
		changePriceShowOrHide() {
			// this.isVip = false
			const brandId = this.brandList[this.brandIndex].id;
			// if (this.isOverLimitTime && !this.isVip && brandId !== 25) {
			// 	this.showRegisterModal = true
			// 	return
			// }
			this.isShowPrice = !this.isShowPrice;
		},
		// 跳转到采药么
		goCaiyaome() {
			uni.navigateToMiniProgram({
				appId: "wx2935c25c6464719f",
				path: "pages/index/index",
				success: function (res) {
					// 打开成功
				},
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.container {
	height: calc(100% - 100rpx);
	.content {
		position: relative;
		min-height: 100%;

		.pr-brand {
			padding: 20rpx 30rpx;
			font-size: 29rpx;

			> view:first-child {
				color: #666;
			}
		}

		.top-select {
			width: 235rpx;
			height: 75rpx;
			color: #333;
			border: 1px solid #bbbbbb;
			border-radius: 11rpx;
			margin-left: 16rpx;
			padding: 16rpx;
			font-size: 29rpx;
		}

		.singl-info {
			text-align: right;
			padding-right: 30rpx;
			color: #777;
			font-size: 28rpx;
			padding-bottom: 16rpx;

			text {
				color: #666;
				font-weight: bold;
				font-size: 29rpx;
			}

			border-bottom: 1rpx solid #ddd;
		}

		.info-item:nth-child(odd) {
			border-right: 1rpx dashed #ddd;
		}

		.info-total {
			color: #666;
			padding: 30rpx 30rpx 0;

			.info-total-item {
				margin-right: 30rpx;
				font-size: 24rpx;

				.total-input {
					padding: 0 16rpx;
					height: 60rpx;
					line-height: 60rpx;
					text-align: center;
					color: #333;
					margin: 0 10rpx;
					width: 100rpx;
					font-size: 30rpx;
					border-bottom: 1rpx solid #ddd;
				}

				.total-input-second {
					width: 200rpx;
				}

				.total-input-third {
					text-align: center;
				}

				.total-input-last {
					width: 250rpx;
				}
			}
		}

		.info-total-wrap {
			border-top: 1rpx solid #ddd;
		}
	}

	.price-wrap {
		margin-top: 40rpx;
		background-color: #ff9e20;
		height: 88rpx;
		color: #fbf9f5;
		position: absolute;
		bottom: 0;
		width: 750rpx;

		.final-price {
			font-size: 26rpx;

			view:first-child {
				width: 230rpx;
			}

			view:last-child {
				width: 80rpx;
			}

			.show-price {
				height: 30rpx;
				width: 40rpx;
			}

			.hide-price {
				height: 17rpx;
				width: 36rpx;
			}
		}

		.single-price {
			font-size: 30rpx;

			text {
				font-weight: 600;
				margin-left: 16rpx;
			}
		}
	}
}

.register-modal {
	padding: 160rpx 30rpx 100rpx;

	view {
		font-size: 40rpx;

		text-align: center;
		color: #333333;

		letter-spacing: 1px;
	}

	> view:nth-child(2) {
		margin-top: 36rpx;

		text {
			color: #ff9e1f;
			font-weight: bold;
		}
	}

	.register-btn {
		margin-top: 150rpx;
		width: 390rpx;
		height: 88rpx;
		background: #ff9e1f;
		border-radius: 8px;
		color: #fff;
		line-height: 80rpx;
	}
}
</style>
