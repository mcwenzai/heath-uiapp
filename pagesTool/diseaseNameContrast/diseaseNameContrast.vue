<template>
	<view class="page-wrap">
		<view style="height: 100%">
			<my-search
				:inputDisable="false"
				@searchData="searchName"
				:isFocus="true"
				placeholderText="病名或拼音首字母"
			/>
			<scroll-view scroll-y="true" class="container">
				<view class="content-wrap">
					<view class="title">【病名对照】</view>
					<block v-for="(item, index) in list" :key="index">
						<view class="item-wrap">
							<view class="disease-name app-f">
								<view>中医病名：</view>
								<view class="app-f-f1">{{
									item.zyDisease
								}}</view>
							</view>
							<view class="disease-name app-f">
								<view>西医病名：</view>
								<view class="app-f-f1">{{
									item.xyDisease
								}}</view>
							</view>
							<view class="explain" v-if="item.notes">
								说明：{{ item.notes }}
							</view>
						</view>
					</block>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [],
		};
	},

	methods: {
		async getXYDiseaseName(v) {
			const res = await this.$toolRequest({
				url: "/tool/toolDiseaseContrast/list",
				method: "POST",
				data: {
					keyword: v,
				},
			});
			// console.log(res)
			if (res.success !== 1) {
				uni.showToast({
					title: "未找到对应数据",
					icon: "none",
				});
				this.list = [];
				return;
			}

			const list = res.data.list;
			if (!list.length) {
				uni.showToast({
					title: "未找到对应数据",
					icon: "none",
				});
			}
			this.list = list;
		},

		searchName(v) {
			// console.log(v)
			if (v) {
				this.getXYDiseaseName(v);
			} else {
				this.list = [];
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.container {
	height: calc(100% - 100rpx);
	.content-wrap {
		height: 100%;
		padding: 30rpx;
		.title {
			text-align: center;
			font-size: 34rpx;
			color: #f18b1e;
			padding: 30rpx 30rpx;
		}
		.item-wrap {
			padding: 30rpx;
			margin-top: 10rpx;
			width: 690rpx;
			background-color: #f6f6f6;
			border-radius: 8rpx;
			.disease-name {
				> view:first-child {
					font-size: 30rpx;

					color: #666666;
				}
				> view:last-child {
					font-size: 32rpx;
					color: #333;
					font-weight: bold;
				}
			}
			.disease-name:nth-child(2) {
				margin-top: 20rpx;
			}
			.explain {
				font-size: 26rpx;
				color: #777777;
				line-height: 50rpx;
				padding: 10rpx 0 30rpx;
				margin-top: 30rpx;
				border-top: 1rpx solid #d7d7d7;
			}
		}

		.item-wrap:last-child {
			margin-bottom: 30rpx;
		}
	}
}
</style>
