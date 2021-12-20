<template>
	<view class="page-wrap">
		<view style="height: 100%">
			<my-search
				:inputDisable="false"
				:isFocus="true"
				@searchData="queryPr"
				:searchkey="oldInfo.goodsName || ''"
				placeholderText="药品名称或拼音首字母"
			/>
			<scroll-view scroll-y="true" class="container">
				<view class="list">
					<view
						class="list-item app-f app-f-aic"
						@tap="editInfo(item)"
						v-for="(item, index) in list"
						:key="index"
					>
						<view class="item-left app-f-f1">
							<view class="item.title">{{ item.name }}</view>
							<view class="item-content app-f app-f-aic">
								<view class="app-f-f1">{{
									item.brandName
								}}</view>
								<view class="app-f-f1"
									>当量：{{ item.effectRatio }}</view
								>
								<view class="app-f-f1">￥{{ item.price }}</view>
							</view>
						</view>
						<view class="item.right">
							<view
								:class="[
									'select-btn app-f app-f-aic app-f-jcc ',
									selectedId ===
									`${item.goodsId}-${item.brandId}-${item.effectRatio}`
										? 'selected-btn'
										: '',
								]"
							>
								{{
									selectedId ===
									`${item.goodsId}-${item.brandId}-${item.effectRatio}`
										? "已添加"
										: "添加"
								}}
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>

		<tip :title="tipText" v-if="showTip"></tip>
	</view>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
	data() {
		return {
			list: [],
			showTip: false,
			tipText: "",
			isAdd: false,
			oldInfo: {},
			index: null,
			brandId: null,
		};
	},
	computed: {
		...mapState({
			prInfo: (state) => state.prPrice.info,
			prTypeTxt: (state) => state.prPrice.prTypeTxt,
		}),

		selectedId() {
			const info = this.oldInfo;
			if (!info) return null;
			return `${info.goodsId}-${info.brandId}-${info.effectRatio}`;
		},
	},
	onLoad(options) {
		// console.log(options)
		// console.log(this.prTypeTxt)
		this.isAdd = options.type === "1";
		const list = this.prInfo.goodsList;
		this.index = +options.index;
		this.brandId = +options.brandId;
		// console.log(this.prInfo,options.index)
		this.oldInfo = list[+options.index] || {};
		if (this.oldInfo) {
			this.getList(this.oldInfo.goodsName);
		}
	},
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
			const param = {
				keyword: v,
			};
			const brandId = this.brandId;
			if (brandId === 25) {
				param.brandId = brandId;
			}
			const res = await this.$toolRequest({
				url: "/base/baseGoodsSku/getListByBrandId",
				data: param,
			});
			// console.log(res,'方剂搜索')
			if (!res || res.success !== 1) {
				this.list = [];
				return;
			}
			this.list = res.data.list.filter((item) => item.brandId !== null);
		},
		editInfo(item) {
			const list = this.prInfo.goodsList;

			const oldInfo = this.oldInfo;
			if (
				oldInfo &&
				`${oldInfo.goodsId}-${oldInfo.brandId}-${oldInfo.effectRatio}` ===
					`${item.goodsId}-${item.brandId}-${item.effectRatio}`
			) {
				uni.showToast({
					title: "方剂中已存在该药品",
					icon: "none",
				});
				return;
			}
			// console.log(list,item)
			let unit = list[0] ? list[0].unit : this.prTypeTxt;
			const obj = {
				brandId: item.brandId,
				brandName: item.brandName,
				drugType: item.drugType,
				effectRatio: item.effectRatio,
				goodsId: item.goodsId,
				goodsName: item.name,
				overNum: 0,
				price: item.price,
				costPrice: item.costPrice,
				quantity: 1,
				skuId: item.id,
				state: 1,
				unit,
				riskState: item.riskState,
			};

			if (this.isAdd) {
				list.splice(-1, 0, obj);
			} else {
				list.splice(this.index, 1, obj);
			}
			const info = this.prInfo;
			info.goodsList = list;
			this.setPrInfo(info);
			uni.navigateBack({});
		},
	},
};
</script>

<style lang="scss" scoped>
.container {
	height: calc(100% - 100rpx);

	.list {
		padding: 0 30rpx 30rpx;

		.list-item {
			border-bottom: 1rpx solid #f1f1f1;
			padding: 20rpx 8rpx 16rpx;
			color: #666;

			.item-content {
				font-size: 26rpx;
				margin-top: 20rpx;
			}
			.select-btn {
				background-color: #ff991e;
				color: #fff;
				border-radius: 30rpx;

				height: 60rpx;
				width: 130rpx;
				font-size: 26rpx;
			}
			.selected-btn {
				background-color: #ddd;
			}
		}
	}
}
</style>
