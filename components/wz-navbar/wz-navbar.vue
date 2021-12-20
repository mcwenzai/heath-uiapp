<template>
	<!-- <view style="position: relative;"> -->
		<view class="filter-wrapper"
			:style="{ height: height + 'rpx', 'padding-top': top }"
			@touchmove.stop.prevent="discard">
			<view class="inner-wrapper">
				<view class="mask" :class="showMask ? 'show' : 'hide'" @tap="tapMask"></view>
				<view class="navs">
					<view class="backleft" @click="goBack()" v-if="!isReject">
						<text class="icon icon-fanhui" mode="aspectFill"></text>
					</view>
					<view class="backleft" @click="goToIndex()" v-else>
						<text class="icon icon-fanhui" mode="aspectFill"></text>
					</view>
					<view class="c-flex-aligncenter" @click="navClick()">
						<view>{{ deptName }}</view>
						<view v-if="showMask" class="icon icon-xiala"></view>
						<view v-else class="icon icon-xiala" :style="'transform:rotate(180deg);'"></view>
					</view>
				</view>
				<scroll-view scroll-y="true" class="popup" :class="popupShow ? 'popupShow' : ''">
					<view class="item-opt" :class="item.select ? 'themeColor': ''" v-for="(item, index) in navData"
						:key="index" @click="handleOpt(item.deptId,index)">
						<text>{{ item.deptName }}</text>
						<text class="icon" :class="item.select ? 'icon-ok2' : ''"></text>
					</view>
				</scroll-view>
			</view>
		</view>
	<!-- </view> -->
</template>

<script>
	const app = getApp();
	export default {
		props: {
			height: {
				type: Number,
				default: 108
			},
			top: {
				type: String,
				default: '34px',
			},

			filterData: {
				//必填
				type: Array,
				default: []
			},
			deptId: {
				type: String,
				default: '',
			},
			isReject: {
				type: Boolean,
				value: false
			}
		},
		data() {
			return {
				navData: [],
				popupShow: false,
				showMask: false,
				deptName: '',
				selIndex: '', //选中条件索引
			};
		},
		watch: {
			filterData: {
				handler(newVal, oldVal) {
					newVal.forEach(itemnavData => {
						itemnavData.select = false;
						return itemnavData;
					});
					this.navData = newVal;
					if (newVal) { //如果数据变化则重新创建数据用于渲染
						this.keepStatus(newVal); //处理数据
					}
				},
				immediate: true,
				deep: true
			}
		},

		methods: {
			keepStatus(newVal) {
				var deptId = this.deptId
				var navData = this.navData
				for (let i = 0; i < navData.length; i++) {
					if (navData[i].deptId == deptId) {
						this.selIndex = i;
						this.navData[i].select = true;
						this.deptName = navData[i].deptName;
						app.globalData.deptId = navData[i].deptId
					}
				}
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
				var navData = this.navData
				navData.forEach(itemnavData => {
					itemnavData.select = false;
					return itemnavData;
				});
				for (let i = 0; i < navData.length; i++) {
					if (navData[i].deptId == deptId) {
						this.selIndex = i
						this.navData[i].select = true
						this.deptName = navData[i].deptName
						app.globalData.deptId = navData[i].deptId
					}
				}
				let selindex = this.selIndex;
				this.$emit('onSelected', this.navData[selindex]);
			},

			tapMask() {
				this.showMask = false;
				this.popupShow = false;
			},
			// 返回上一页
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			goToIndex() {
				uni.navigateTo({
					url: '../../pages/salesman/index'
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.c-flex-aligncenter {
		display: flex;
		align-items: center;
		justify-content: center;
		padding-right: 80upx;
		font-size: 32upx;

		.icon-xiala {
			font-size: 26upx;
			font-weight: 600;
			color: #333333;
			transition: transform .1s linear, color .1s linear;
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
		// height: 202upx;
		width: 750rpx;
		z-index: 9999;
		top: 0;
		left: 0;
		right: 0;
		// left: var(--window-left);
		// right: var(--window-right);
		// top: 20px;
		// top: var(--status-bar-height);
		// width: 100%;
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
				transform: translate3d(80, - 100%, 0);

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
				transition: all .2s linear;
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
				transform: translate3d(80, - 100%, 0);
				max-height: 345px;
				background-color: #f2f2f2;
				// z-index: 10;
				box-shadow: 0 5px 5px rgba(0, 0, 0, .1);
				overflow: hidden;
				flex-direction: row;
				transition: transform .85s linear;
				border-top: 2upx solid #f4f4f4;
			}
		}

		.icon-triangle {
			width: 16rpx;
			height: 16rpx;
			margin-left: 10rpx;
		}


	}
</style>
