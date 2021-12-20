<template>
	<view class="page-wrap">
		<view style="height: 100vh">
			<view>
				<my-search
					:inputDisable="false"
					@searchData="queryImg"
					placeholderText="搜索舌象"
				/>
			</view>

			<scroll-view scroll-y="true" class="container" @scroll="pageScroll">
				<view class="img-list app-f app-f-fww">
					<block v-for="(img, index) in showList" :key="index">
						<view class="img-item" @tap="previewImg(img)">
							<image :src="img.imgUrl"></image>
							<view>{{ img.name }}</view>
						</view>
					</block>
				</view>
				<view
					v-if="!showList.length"
					class="empty-tip app-f app-f-aic app-f-jcc"
					>暂无图像</view
				>
			</scroll-view>
		</view>
		<full-modal
			:showModal="!!previewObj.name"
			@closeModal="closePreviewImg"
			:showCloseBtn="true"
		>
			<template v-slot:content>
				<view class="preview-img-wrap">
					<view class="preview-img">
						<image :src="previewObj.imgUrl"></image>
					</view>
					<view class="explain-title">
						<view>
							{{ previewObj.name }}
						</view>

						<!--<view class="like-num app-f app-f-aic app-f-jcfe" v-if="previewObj.usefulThumb"> 很有帮助
							 <view class="app-f app-f-aic app-f-jcsb">
								 <image src="/static/images/tongue/thum-up.png"></image> 
								 {{previewObj.usefulThumb > 999 ? '999+':previewObj.usefulThumb }}
							 </view> 
						</view>-->
					</view>

					<view class="explain-detail">{{
						previewObj.introduce
					}}</view>
					<!-- <view class="like-btn-wrap app-f app-f-aic" v-if="selectObj.isThumb === 0">
						<image @tap="handleLike(1)" :src='dislikeImg'></image>
						<view class="app-f-f1"> 帮助不大 <text>|</text> 很有帮助 </view>
						<image @tap="handleLike(0)" :src='likeImg'></image>
					</view> -->
				</view>
			</template>
		</full-modal>
	</view>
</template>

<script>
export default {
	data() {
		return {
			imgArr: [],
			previewObj: {},
			selectObj: {},
			showList: [],
			tipText: "",
			showTip: false,
			inputDisable: true,
		};
	},
	computed: {
		dislikeImg() {
			const v = this.previewObj.isThumb;

			if (v === 2) return "/static/images/tongue/dislike-active.png";
			return "/static/images/tongue/dislike.png";
		},
		likeImg() {
			const v = this.previewObj.isThumb;
			// console.log(v)

			if (v === 1) return "/static/images/tongue/like-active.png";
			return "/static/images/tongue/like.png";
		},
	},
	onLoad(options) {
		this.getList();
	},

	methods: {
		previewImg(v) {
			// console.log(v)

			this.previewObj = { ...v };
			this.selectObj = { ...v };
		},
		async getList() {
			uni.showLoading({
				title: "加载中",
				mask: true,
			});
			// const appletsUserId = uni.getStorageSync('userInfo').id
			const res = await this.$toolRequest({
				url: "/tool/toolTongue/list",
				method: "POST",
				data: {
					pageNum: null,
					pageSize: null,
					appletsUserId: "",
				},
			});
			uni.hideLoading();
			// console.log(res,'tupian-list')
			if (!res || res.success !== 1) {
				uni.showToast({
					title: "获取列表失败",
					icon: "none",
				});
				return;
			}
			const list = res.data.list;
			this.imgArr = list.slice();
			this.showList = list.slice();
		},
		queryImg(v) {
			// console.log(v)
			const list = this.imgArr.slice();
			const res = list.filter((item) => item.name.indexOf(v) > -1);
			this.showList = res;
		},
		async handleLike(type) {
			// console.log(type)
			const userId = uni.getStorageSync("userInfo").id;
			const tongueId = this.previewObj.id;
			const orType = this.previewObj.isThumb;
			const res = await this.$toolRequest({
				method: "POST",
				url: "/tool/toolTongueThumb/saveThumb",
				data: {
					userId,
					tongueId,
					type,
				},
			});
			// console.log('点赞',res)
			if (!res || res.success !== 1) return;
			let isThumb = orType === type + 1 ? 0 : type + 1;
			if (orType === 0 && isThumb === 1) {
				this.previewObj.usefulThumb += 1;
			}
			this.previewObj.isThumb = isThumb;
		},
		closePreviewImg() {
			const list = this.imgArr;
			const tongueId = this.previewObj.id;
			const idx = list.findIndex((item) => item.id === tongueId);
			const isThumb = this.previewObj.isThumb;
			const orType = this.selectObj.isThumb;
			list[idx].isThumb = isThumb;
			if (orType === 0 && isThumb === 1) {
				list[idx].usefulThumb += 1;
			}
			this.selectObj = {};
			this.previewObj = {};
		},
		// 滑动隐藏键盘
		pageScroll() {
			uni.hideKeyboard();
		},
	},
};
</script>

<style lang="scss" scoped>
.container {
	border-top: 1rpx solid #d7d7d7;
	height: calc(100% - 100rpx);
}

.empty-tip {
	height: 80%;
}

.img-list {
	padding: 0 30rpx 30rpx;

	.img-item {
		text-align: center;
		font-size: 28rpx;
		width: 33.33%;
		color: #333333;
		margin-top: 30rpx;
		height: 280rpx;

		image {
			width: 200rpx;
			height: 200rpx;
			border: 1rpx solid #f1f1f1;
			border-radius: 12rpx;
		}

		view {
			margin-top: 10rpx;
			height: 50rpx;
		}
	}
}

.preview-wrap {
	margin-top: -150rpx;

	width: 560rpx;

	background: #ffffff;
	border-radius: 20rpx;
	padding: 10rpx;

	.preview-img {
		image {
			width: 540rpx;
			height: 360rpx;
			// border: 1rpx solid #d7d7d7;
		}
	}

	.explain-title {
		padding: 30rpx;
		font-size: 30rpx;

		font-weight: 700;

		color: #333333;
		.like-num {
			color: #666;
			font-size: 26rpx;
			margin-top: 20rpx;
			font-weight: normal;
			view {
				margin-left: 14rpx;
				height: 44rpx;

				background: linear-gradient(0deg, #ff9e20 0%, #ff8657 100%);
				border-radius: 22rpx;
				color: #fff;
				padding: 0 16rpx;
				min-width: 85rpx;
				image {
					height: 40rpx;
					width: 41rpx;
					margin-top: 12rpx;
					margin-left: -10rpx;
				}
			}
		}
	}

	.explain-detail {
		padding: 0 30rpx 30rpx;
		font-size: 28rpx;
		line-height: 2;
		color: #666666;
	}

	.like-btn-wrap {
		height: 74rpx;

		image {
			height: 74rpx;
			width: 74rpx;
		}

		view {
			font-size: 30rpx;
			color: #666;
			text-align: center;

			text {
				padding: 0 30rpx;
			}
		}
	}
}
</style>
