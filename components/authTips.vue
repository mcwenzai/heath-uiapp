<template>
	<view class="container">
		<view
			class="wrap flex-between-center"
			@click="handleDetail"
			v-if="isCustomer && quaInfo.buyerQualificationStatus !== 0"
		>
			<text v-if="quaInfo.qualificationStatus === null"
				>您还未资质认证</text
			>
			<text
				v-else-if="
					quaInfo.qualificationStatus ===
					keyMap.qualificationStatus.overdue
				"
				>您的部分证件已过期</text
			>
			<text
				v-else-if="
					quaInfo.qualificationStatus ===
					keyMap.qualificationStatus.reject
				"
				>您的资质认证审核未通过</text
			>
			<text
				v-if="quaInfo.qualificationStatus === 0"
				style="text-align: center; display: inline-block; width: 100%"
				>您的资质正在审核中</text
			>
			<view
				class="btn flex-center-center"
				v-if="quaInfo.qualificationStatus === null"
				>去认证</view
			>
			<view
				class="btn active flex-center-center"
				v-if="
					quaInfo.qualificationStatus !== null &&
					quaInfo.qualificationStatus > 0
				"
			>
				查看详情<image src="/static/images/index/arrow.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from "vuex";
import { isLogin } from "@/libs/isLogin";
export default {
	name: "authTips",
	data() {
		return {
			isCustomer: true,
		};
	},
	computed: {
		...mapState({
			quaInfo: (store) => store.certification.info,
		}),
	},
	created() {
		const id = uni.getStorageSync("customerId");
		this.isCustomer = !id;
	},
	methods: {
		handleDetail() {
			isLogin().then((v) => {
				if (v) {
					uni.navigateTo({
						url: "/userPages/certification/index",
					});
				}
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.container {
	position: fixed;
	left: var(--window-left);
	right: var(--window-right);
	bottom: 0;
	bottom: constant(safe-area-inset-bottom);
	bottom: env(safe-area-inset-bottom);
	padding: 0 30rpx 30rpx;
	z-index: 20;
}
.wrap {
	padding: 0 30rpx;
	width: 100%;
	height: 120rpx;
	background: rgba($color: #fff, $alpha: 0.9);
	border: 1rpx solid #fff6f2;
	border-radius: 60rpx;
	box-shadow: 0rpx 9rpx 8rpx 0rpx rgba(200, 115, 75, 0.2);
	color: #333333;
	font-size: 30rpx;
	.btn {
		min-width: 200rpx;
		height: 74rpx;
		background: #ff7247;
		border-radius: 37rpx;
		font-size: 30rpx;
		color: #fff;
		image {
			margin-left: 10rpx;
			width: 11rpx;
			height: 19rpx;
		}
		&.active {
			background: none;
			color: #ff7247;
		}
	}
}
</style>
