<template>
	<view class="tips">
		<view class="headers">绑定合伙人<text>{{failCauseList[0].employeeName}}</text>未能全部成功</view>
		<view class="contents">
			<view class="back-wite" v-for="(item,index) in failCauseList" :key="index">
				<view class="title">
					<view class="left">
						<text>{{item.deptName}}</text>
					</view>
					<view class="right" v-if="item.status == '成功'">
						<image src="../../static/images/binding/right.png"></image>
						<text>{{item.status}}</text>
					</view>
					<view class="right-color" v-if="item.status == '失败'">
						<image src="../../static/images/binding/error.png"></image>
						<text>{{item.status}}</text>
					</view>
				</view>
				<view v-if="item.status == '失败'">
					<view class="cause">
						<text>原因</text>
					</view>
					<view class="details" v-for="(i,index) in item.causeList" :key="index">
						<text>{{index + 1}}.{{i}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="back">
			<u-button plain="true" hover-class="none" shape="circle" :custom-style="customStyle" @click="goCenter()">返回个人中心</u-button>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default {
		data() {
			return {
				failCauseList: [],
				employeeName: '',
				customStyle: {
					marginTop: '20px',
					color: '#FF7247'
				}
			};
		},
		onLoad(e) {
			this.failCauseList = app.globalData.failCauseList
			this.employeeName = e.employeeName
		},
		methods: {
			goCenter() {
				uni.switchTab({
					url: "/pages/admin/index"
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	page {
		background-color: #F7F6F6;
	}

	.tips {
		display: block;
		padding: 30upx;

		.headers {
			font-size: 38upx;
			font-weight: 600;
			text-align: left;
			color: #333333;
			line-height: 72upx;

			text {
				margin: 0 14upx;
			}
		}

		.contents {
			display: block;

			.back-wite {
				background: #ffffff;
				padding: 12upx 24upx;
				margin: 20upx 0;
				border-radius: 12upx;

				.title {
					display: flex;
					justify-content: space-between;
					line-height: 72upx;

					.left {
						font-size: 38upx;
						font-weight: 600;
						text-align: left;
						color: #333333;
					}

					.right {
						font-size: 34upx;
						font-weight: 600;
						color: #58C641;

						image {
							width: 24upx;
							height: 24upx;
							margin-right: 10upx;
						}
					}

					.right-color {
						font-size: 34upx;
						font-weight: 600;
						color: #ff7247;

						image {
							width: 24upx;
							height: 24upx;
							margin-right: 10upx;
						}
					}


				}

				.cause {
					width: 100upx;
					height: 52upx;
					background: #e5e5e5;
					border-radius: 25upx;
					text-align: center;
					line-height: 52upx;
					margin: 10upx 0;
				}

				.details {
					font-size: 32upx;
					text-align: left;
					color: #666666;
					line-height: 60upx;
				}
			}
		}

		.back {
			position: fixed;
			bottom: 60upx;
			left: 55upx;
			width: 640upx;
			display: flex;
			justify-content: center;
			background-color: transparent;
			/deep/ .u-btn--default {
				background-color:transparent;
			}
		}
	}
</style>
