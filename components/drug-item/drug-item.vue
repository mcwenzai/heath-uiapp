<template>
	<view class="content-wrap " :style="wrapStyle">
		<!-- <view class="info-name-tip" v-if="brandId !== info.brandId ">{{info.brandName}}</view> -->
		<view class="del-drug">
			<image src="/static/images/prPrice/close-drug.png" @tap.stop="delGood" v-if="info.goodsName">
			</image>
		</view>
		<view class="input-wrap app-f app-f-aic">
			<input placeholder="输入药名" :value='info.goodsName || ""' @tap="goSearch" type="text">

		</view>
		<view class="app-f app-f-aic count-wrap">
			<view class="input-wrap app-f app-f-aic">
				<input type="number" placeholder="1" :value="info.quantity || 0" @input="changeQuantity"
					@focus='isCountFocus=true' @blur='isCountFocus=false'> <text class="unit">{{info.unit }}</text>
			</view>
			<text class="price app-f-f1">{{drugPrice}} </text>

		</view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from 'vuex'
	import {
		getNum
	} from '@/libs/tool.js'
	export default {
		name: "drug-item",
		props: ['index', 'total', 'info', 'brandId'],
		data() {
			return {
				isNameFocus: false,
				isCountFocus: false
			};
		},
		computed: {

			...mapState({
				allInfo: state => state.prPrice.info,
				userInfo: state => state.user.userInfo
			}),

			wrapStyle() {
				const index = this.index,
					total = this.total
				const odd = total % 2

				if (index === total - 1) return 'border-bottom: none '

				if (odd === 0 && index === total - 2) {
					return 'border-bottom: none '
				}

				return 'border-bottom: 1rpx dashed #ddd '



			},
			drugPrice() {
				const info = this.info
				if (!info || info.brandId === 1 || info.state === 0) return '￥0.00'
				const {
					price,
					quantity,
					effectRatio,
					unit,
					brandId,

				} = info;
				let res = 0
				if (unit === "克" && brandId !== 25) {
					// console.log(v, quantity / effectRatio);
					let num = getNum((quantity || 0) / (effectRatio || 1));
					// console.log(num, price);
					// console.log(num)
					res = num * (price || 0) * 1000;
					// console.log(res);
					res = Math.round(res) / 1000
					return "￥ " + Math.round(res * 100) / 100;
				}
				if (unit === "袋") {
					res = price * (quantity || 0) * 100;
					res = Math.round(res) / 1000
					return "￥ " + Math.round(res * 100) / 100;
				}

				if (unit === "克" && brandId === 25) {
					let num = (quantity || 0) / (effectRatio || 1);
					num = num > 0.1 ? Math.ceil(num * 10) / 10 : 0.1;
					res = num * (price || 0) * 1000;
					res = Math.round(res) / 1000
					return "￥ " + Math.round(res * 100) / 100;
				}

			}
		},

		methods: {
			...mapMutations({
				delDrug: 'prPrice/delDrug',
				setPrInfo: 'prPrice/setInfo'
			}),
			delGood() {
				const info = this.info
				uni.showModal({
					content: `是否确认删除 ${info.goodsName} ?`,
					title: '温馨提示！',
					success: (res) => {
						if (res.confirm) {
							this.delDrug(this.index)
						}
					}

				})
			},
			goSearch() {
				const type = this.info.goodsName ? 0 : 1
				this.isNameFocus = false

				const url = `/pagesTool/searchDrug/searchDrug?type=${type}&index=${this.index}&brandId=${this.brandId}`
				uni.navigateTo({
					url: url
				})
			},
			changeQuantity(e) {
				const v = +e.detail.value
				const info = this.allInfo
				const list = info.goodsList

				list[this.index].quantity = v

				info.goodsList = list
				this.setPrInfo(info)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content-wrap {
		padding: 30rpx;
		height: 236rpx;
		width: 374rpx;
		position: relative;

		.info-name-tip {
			position: absolute;
			background-color: #FF991E;
			color: #fff;
			font-size: 26rpx;
			padding: 0 8rpx;
			z-index: 99;
			left: 0rpx;
			top: 0rpx;
			border-radius: 0 0 12rpx 0;
		}

		.input-wrap {
			background-color: #f1f1f1;
			height: 80rpx;
			border-radius: 8rpx;
			border: 1rpx solid #f1f1f1;
			position: relative;

			input {
				padding: 0 16rpx;
				color: #333;
				font-weight: bold;
			}


		}

		.del-drug {
			height: 46rpx;
			width: 46rpx;
			position: absolute;
			right: 0;
			top: 0;
			z-index: 999;

			image {
				height: 46rpx;
				width: 46rpx;
			}
		}






		.count-wrap {
			margin-top: 12rpx;

			.unit {
				margin-right: 12rpx;
				font-size: 26rpx;
				color: #666;
			}

			.input-wrap {
				width: 195rpx;
			}
		}

		.price {
			color: #777;
			font-size: 24rpx;
			text-align: center;
		}
	}
</style>
