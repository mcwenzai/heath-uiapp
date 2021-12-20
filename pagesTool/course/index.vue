<template>
	<view class="container">
		<image class="bg-img" mode="widthFix" :src="bgImg"> </image>
		<view
			:class="[
				'bottom-btn app-f app-f-aic app-f-jcc',
				quaInfo && quaInfo.buyerQualificationStatus === 0
					? 'bottom-btn-active'
					: '',
			]"
			@tap="goNextPage"
		>
			{{
				quaInfo && quaInfo.buyerQualificationStatus === 0
					? "开启学习之旅"
					: "资质认证通过后免费开启"
			}}
		</view>
	</view>
</template>

<script>
import { mapState } from "vuex";
export default {
	data() {
		return {
			bgImg: "",
		};
	},
	computed: {
		...mapState({
			quaInfo: (store) => store.certification.info,
		}),
	},
	onLoad(options) {
		const dataStr = options.params;
		if (dataStr) {
			const obj = JSON.parse(dataStr);
			this.bgImg = obj.imgUrl;
		}
	},
	methods: {
		goNextPage() {
			if (this.quaInfo && this.quaInfo.buyerQualificationStatus === 0) {
				this.$goPage("/pagesTool/course/class");
			} else {
				this.$goPage("/userPages/certification/index");
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.container {
	padding-bottom: 200rpx;
}
.bg-img {
	width: 750rpx;
	margin: 0 auto;
}
.bottom-btn {
	position: fixed;
	bottom: 88rpx;
	width: 690rpx;
	height: 80rpx;
	background: linear-gradient(128deg, #38d39e 0%, #1cb7ff 100%);
	border-radius: 40rpx;
	left: 50%;
	transform: translateX(-50%);
	z-index: 99;
	color: #fff;
}
.bottom-btn-active {
	background: #ff7247;
}
</style>
