<template>
	<view class="search-wrap app-f app-f-aic app-f-jcc">
		<view @click.stop="handleBack">
			<slot name="back"></slot>
		</view>
		<view class="input-wrap app-f-f1 app-f app-f-aic app-f-jcc">
			<image class="search-icon" src="/static/images/search.png"></image>
			<input
				:disabled="inputDisable"
				@input="query"
				type="text"
				:placeholder="placeholderText"
				v-model.trim="inputText"
				:focus="isFocus"
				class="app-f1"
				auto-blur
				maxlength="20"
			/>
			<image
				@tap="clearInput"
				src="/static/images/delete_icon.png"
				class="delete-img"
				v-show="inputText"
			></image>
		</view>
		<view @click.stop="handleDetail('/pages/message/index')">
			<slot name="message"></slot>
		</view>
	</view>
</template>

<script>
import { isLogin } from "@/libs/isLogin";
export default {
	props: {
		inputDisable: {
			type: Boolean,
			default: true,
		},
		placeholderText: {
			type: String,
			default: "搜索商品",
		},
		searchkey: {
			type: String,
			default: "",
		},
		isFocus: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			inputTimer: null,
			inputText: "",
		};
	},
	watch: {
		searchkey: {
			handler(v, oV) {
				this.inputText = v;
			},
			deep: true,
		},
	},
	methods: {
		query() {
			clearInterval(this.inputTimer);
			this.inputTimer = setTimeout(() => {
				this.$emit("searchData", this.inputText);
			}, 200);
		},
		clearInput() {
			this.inputText = "";
			setTimeout(() => {
				this.$emit("searchData", "");
			}, 200);
		},
		handleBack() {
			uni.navigateBack({
				delta: 1,
			});
		},
		/**
		 * 跳转子页面
		 * @param {Object} url 页面路径
		 */
		handleDetail(url) {
			isLogin().then(v => {
				if(v){
					uni.navigateTo({
						url,
					});
				}
			})
		}
	}
};
</script>

<style scoped lang="scss">
.search-wrap {
	padding: 16rpx 0;
	height: 100rpx !important;
	font-size: 32rpx;
	color: #ff9e20;

	.input-wrap {
		background: rgba($color: #fff, $alpha: 0.9);
		height: 68rpx !important;
		border-radius: 44rpx;
		padding: 0 25rpx;
		position: relative;
		margin: 0 20rpx;
		border: 1rpx solid #ffd6cc;

		.search-icon {
			margin-right: 20rpx;
			width: 31rpx !important;
			height: 31rpx !important;
		}

		input {
			flex: 1;
			margin-right: 30rpx;
			color: #333;
			font-size: 32rpx;
			height: 100%;
		}

		.delete-img {
			width: 44rpx;
			height: 44rpx;
			opacity: 0.6;
		}
	}
}
</style>
