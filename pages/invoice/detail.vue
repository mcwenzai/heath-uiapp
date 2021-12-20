<template>
	<view class="form">
		<view class="form-item flex-between-center" style="margin-top: 10rpx">
			<text class="label">发票类型：</text>
			<text class="content">
				{{ info.type === 0 ? "普票" : "增值税专用发票" }}</text
			>
		</view>
		<view class="form-item flex-between-center" style="margin-top: 10rpx">
			<text class="label">发票抬头：</text>
			<text class="content">
				{{ info.invoiceHeader }}
			</text>
		</view>
		<view class="form-item flex-between-center" v-if="info.invoiceNo">
			<text class="label">税号：</text>
			<text class="content">
				{{ info.invoiceNo }}
			</text>
		</view>
		<view class="form-item flex-between-center" v-if="info.phone">
			<text class="label">电话号码：</text>
			<text class="content">
				{{ info.phone }}
			</text>
		</view>
		<view class="form-item flex-between-center" v-if="info.bankAccount">
			<text class="label">银行账号：</text>
			<text class="content">
				{{ info.bankAccount }}
			</text>
		</view>
		<view class="form-item flex-between-center" v-if="info.bankName">
			<text class="label">开户银行：</text>
			<text class="content">
				{{ info.bankName }}
			</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			info: {},
		};
	},
	onLoad(options) {
		const info = options.params;

		if (info) {
			let v = JSON.parse(decodeURIComponent(info));
			this.info = v.invoiceInfo;
		}
	},
	method: {},
};
</script>

<style lang="scss" scoped>
.form {
	margin: 30rpx 30rpx 0;
	background: #fff;
	border-radius: 10rpx;
	padding-bottom: 30rpx;
	.form-item {
		padding: 30rpx 30rpx 0;
		font-size: 32rpx;
		color: #999;

		.content {
			color: #333;
		}
	}
}
</style>
