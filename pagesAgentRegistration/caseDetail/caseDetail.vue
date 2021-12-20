<template>
	<view class="page-wrap">
		<top-navigation-bar></top-navigation-bar>
		<scroll-view scroll-y="true" class="container" :style="containerStyle">

			<view class="content-wrap">
				<image :src="info.caseDetailsUrl" mode="widthFix"></image>
			</view>
			<view class="btn-wrap app-f app-aic app-jcsb">
				<view class="show-num app-f app-aic app-jcc">
					{{info.browse || 0}}阅读
					<text>|</text>
					{{info.thumbs || 0}}点赞
				</view>
				<view class="btn app-f app-aic app-jcc" @tap="handleLike">
					<image
						:src="info.isThumbs ? '/static/images/tongue/like-active.png':  '/static/images/tongue/like.png'">
					</image>
					<text style="color: #FF8854;" v-if="info.isThumbs">
						已赞
					</text>
					<text v-else style="color: #333;">点赞</text>
				</view>
			</view>
				
		</scroll-view>
		<bottom-agent-registration-btn :doctorName='info.doctorName' :doctorId='info.doctorId'>
		</bottom-agent-registration-btn>
		<tip :title="tipText" v-if="showTip"></tip>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {},
				tipText: '',
				showTip: ''
			};
		},
		onLoad(options) {
			const data = JSON.parse(decodeURIComponent(options.params))
			this.getInfo(data.id)
		},
		methods: {
			async getInfo(id) {
				const userId = uni.getStorageSync('userInfo').id
				const res = await this.$myRequest({
					url: '/special/specialDoctorCase/getDetail',
					data: {
						id,
						userId
					}
				})
				if (!res || res.success !== 1) return
				this.info = res.data
			},
			async handleLike() {
				const userId = uni.getStorageSync('userInfo').id
				const param = {
					userId,
					caseId: this.info.id
				}
				const res = await this.$myRequest({
					url: '/special/specialCaseThumb/thumb',
					data: param,
				})
				if (!res || res.success !== 1) return (res && this.$tip('点赞失败'))
				const isThumbs = this.info.isThumbs ? 0 : 1
				this.info.isThumbs = isThumbs
				this.$tip(isThumbs ? '成功点赞' : '成功取消')
			}

		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding-bottom: 140rpx;

		.content-wrap {
			image {
				width: 750rpx;
			}
		}

		.btn-wrap {
			width: 750rpx;
			padding: 30rpx;

			.show-num {
				background: #f1f1f1;
				border-radius: 30rpx;
				font-size: 24rpx;
				color: #666;
				padding: 10rpx 20rpx;

				text {
					margin: 0 12rpx;
				}
			}

			.btn {
				font-size: 28rpx;

				image {
					width: 74rpx;
					height: 74rpx;
					margin: 22rpx;
				}

			}
		}

	}
</style>
