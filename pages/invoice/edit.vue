<template>
	<view class="content page-height">
		<view class="type-list flex-between-center">
			<text class="label">发票类型</text>
			<view
				class="type-item flex-start-center"
				v-for="(item, index) in typeList"
				:key="index"
				@click="handleChangeType(index)"
			>
				<image
					:src="
						typeIdx === index
							? '/static/images/cart/circle-active.png'
							: '/static/images/cart/circle.png'
					"
				></image>
				{{ item.label }}
			</view>
		</view>
		<view class="form">
			<view class="form-item flex-between-center">
				<text class="label flex-start-center"
					><text class="required">*</text>发票抬头</text
				>
				<input
					placeholder="请输入发票抬头"
					v-model="entity.invoiceHeader"
					placeholder-style="font-szie: 34rpx; color: #bbb; font-weight: normal;"
				/>
			</view>
			<view class="form-item flex-between-center">
				<text class="label"
					><text class="required" :class="{ none: typeIdx === 0 }"
						>*</text
					>税号</text
				>
				<input
					placeholder="请输入税号"
					maxlength="18"
					v-model="entity.invoiceNo"
					placeholder-style="font-szie: 34rpx; color: #bbb; font-weight: normal;"
				/>
			</view>
			<view class="form-item flex-between-center">
				<text class="label"
					><text class="required" :class="{ none: typeIdx === 0 }"
						>*</text
					>电话号码</text
				>
				<input
					type="number"
					maxlength="11"
					v-model="entity.phone"
					placeholder="请输入电话号码"
					placeholder-style="font-szie: 34rpx; color: #bbb; font-weight: normal;"
				/>
			</view>
			<view class="form-item flex-between-center">
				<text class="label"
					><text class="required" :class="{ none: typeIdx === 0 }"
						>*</text
					>银行账号</text
				>
				<input
					placeholder="请输入银行账号"
					v-model="entity.bankAccount"
					placeholder-style="font-szie: 34rpx; color: #bbb; font-weight: normal;"
				/>
			</view>
			<view class="form-item flex-between-center">
				<text class="label"
					><text class="required" :class="{ none: typeIdx === 0 }"
						>*</text
					>开户银行</text
				>
				<input
					placeholder="请输入开户银行"
					v-model="entity.bankName"
					placeholder-style="font-szie: 34rpx; color: #bbb; font-weight: normal;"
				/>
			</view>
			<!-- <view class="form-item flex-between-start">
				<text class="label"><text class="required" v-show="typeIdx === 1">*</text>营业执照</text>
				<view class="upload flex-start-center">
					<image src="/static/images/camera_icon.png" class="upload-icon"></image>上传图片
				</view>
				<view class="upload flex-start-center" v-if="">
					<image src="/static/images/index/banner.png" class="upload-img"></image>
					<image src="/static/images/delete_icon.png" class="del-icon"></image>
				</view>
			</view>
			<picker mode="date">
				<view class="form-item flex-between-center">
					<text class="label"><text class="required" v-show="typeIdx === 1">*</text>营业执照有效期</text>
					<input placeholder="请选择有效期" disabled placeholder-style="font-szie: 34rpx; color: #bbb; font-weight: normal;"/>
				</view>
			</picker> -->
		</view>
		<view class="submit-btn flex-center-center" @click="checkout"
			>保存</view
		>
	</view>
</template>

<script>
export default {
	data() {
		return {
			typeList: [
				{
					label: "普票",
					type: 1,
				},
				{
					label: "增值税专用发票",
					type: 2,
				},
			],
			typeIdx: 0,
			entity: {},
			title: "",
		};
	},
	onLoad(data) {
		// 页面标题判断：null为新增
		!data.invoiceHeader
			? (this.title = "新增发票")
			: (this.title = "修改发票");
		!data.invoiceHeader
			? (this.typeIdx = 0)
			: (this.typeIdx = parseInt(data.type));
		!data.invoiceHeader
			? (this.url = "/user/userInvoice/insert")
			: (this.url = "/user/userInvoice/update");
		uni.setNavigationBarTitle({
			title: this.title,
		});
		this.entity = data;
		// console.log(this.entity);
	},
	methods: {
		handleChangeType(index) {
			this.typeIdx = index;
		},
		checkout() {
			const customerId = uni.getStorageSync("customerId");
			this.entity.type = this.typeIdx;
			this.entity.customerId = customerId;
			if (this.entity.type == 0) {
				if (!this.entity.invoiceHeader) {
					uni.showToast({
						title: "请完善信息",
						icon: "none",
					});
				} else {
					this.submit();
				}
			}

			if (this.entity.type == 1) {
				if (
					!this.entity.invoiceHeader ||
					!this.entity.invoiceNo ||
					!this.entity.phone ||
					!this.entity.bankAccount ||
					!this.entity.bankName
				) {
					uni.showToast({
						title: "请完善信息",
						icon: "none",
					});
				} else {
					this.submit();
				}
			}
		},
		submit() {
			this.$myRequest({
				method: "POST",
				url: this.url,
				data: this.entity,
			}).then((res) => {
				// 资质更新成功
				if (res.success == 1) {
					uni.showToast({
						title: "已成功提交审核",
					});
					let timer = setTimeout(
						function () {
							uni.navigateBack();
						}.bind(this),
						600
					);
				}
				uni.showToast({
					title: res.msg,
					icon: "none",
				});
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.content {
	background: #f7f6f6;
}
.type-list {
	padding: 0 30rpx;
	height: 88rpx;
	margin-bottom: 30rpx;
	background: #fff;
	font-size: 32rpx;
	color: #333;
	.label {
		color: #666;
	}
	image {
		margin-right: 15rpx;
		width: 36rpx;
		height: 36rpx;
	}
	.type-item {
		margin-left: 60rpx;
	}
}
.form {
	margin: 0 30rpx;
	background: #fff;
	border-radius: 10rpx;
	.form-item {
		padding: 30rpx;
		font-size: 32rpx;
		color: #333;
		input {
			flex: 1;
			margin-left: 60rpx;
			text-align: right;
			font-size: 34rpx;
			font-weight: bold;
			color: #333;
		}
		.required {
			margin-right: 10rpx;
			color: #ff5f3a;
			font-size: 26rpx;
			&.none {
				opacity: 0;
			}
		}
		.upload {
			position: relative;
		}
		.upload-icon {
			margin-right: 10rpx;
			width: 52rpx;
			height: 42rpx;
		}
		.upload-img {
			width: 140rpx;
			height: 140rpx;
			border-radius: 10rpx;
		}
		.del-icon {
			position: absolute;
			right: -20rpx;
			top: -20rpx;
			width: 48rpx;
			height: 48rpx;
			opacity: 0.6;
		}
	}
}
.submit-btn {
	position: fixed;
	left: 30rpx;
	right: 30rpx;
	bottom: 50rpx;
	height: 100rpx;
	background: #ff7247;
	border-radius: 50rpx;
	box-shadow: -15rpx 0rpx 0rpx NaNpx rgba(255, 133, 97, 0.24);
	font-size: 34rpx;
	color: #fff;
}
</style>
