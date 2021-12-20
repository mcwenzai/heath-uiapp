<template>
	<view class="page-wrap">
		<view>
			<my-search
				:inputDisable="false"
				:isFocus="true"
				@searchData="queryPr"
				placeholderText="方剂名称或拼音首字母"
			/>
			<scroll-view scroll-y="true" class="container">
				<view class="list">
					<view
						class="list-item"
						@tap="goDetail(item)"
						v-for="(item, index) in list"
						:key="index"
					>
						{{ item.prescriptionName }}
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import { mapMutations } from "vuex";
import { grainToBag } from "@/libs/tool.js";
export default {
	data() {
		return {
			list: [],
		};
	},

	onLoad(options) {},
	methods: {
		...mapMutations({
			setPrInfo: "prPrice/setInfo",
		}),
		queryPr(v) {
			if (!v) {
				this.list = [];
				return;
			}
			this.getList(v);
		},
		async getList(v) {
			const res = await this.$toolRequest({
				url: "/system/corePrescription/searchPrescription",
				data: {
					keyword: v,
				},
			});

			// console.log(res,'方剂搜索')
			if (!res || res.success !== 1) {
				this.list = [];
				return;
			}
			this.list = res.data;
		},

		async goDetail(obj) {
			const { prescriptionName, prescriptionId } = obj;
			const res = await this.$toolRequest({
				url: "/base/baseGoodsSku/appletsDrugsByPrescriptionId",
				data: {
					prescriptionId,
				},
			});

			if (res.success !== 1) {
				uni.showToast({
					title: "获取数据失败，无法跳转",
					icon: "none",
				});
				return;
			}

			// const list =  grainToBag(res.data.goodsList)
			const list = res.data.goodsList;
			list.push(null);
			const item = {
				name: obj.prescriptionName,
				id: obj.prescriptionId,
				goodsList: list,
			};
			// console.log(res, '常用方引用方剂')
			this.setPrInfo(item);

			uni.navigateBack({});
		},
	},
};
</script>

<style lang="scss" scoped>
.container {
	height: calc(100% - 100rpx);

	.empty {
		padding: 30rpx;

		.his {
			image {
				height: 34rpx;
				width: 34rpx;
			}

			> view:first-child {
				> view:last-child {
					color: #777;
				}
			}

			> view:last-child {
				margin-top: 20rpx;

				text {
					border: 1rpx solid #999;
					padding: 10rpx 25rpx;
					margin-right: 20rpx;
					margin-top: 16rpx;
					font-size: 28rpx;
					border-radius: 10rpx;
				}
			}
		}
	}

	.list {
		padding: 0 30rpx 30rpx;

		.list-item {
			border-bottom: 1rpx solid #f1f1f1;
			padding: 20rpx 8rpx 16rpx;
			color: #666;
			margin-top: 20rpx;
		}
	}
}
</style>
