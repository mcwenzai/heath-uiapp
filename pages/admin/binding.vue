<template>
	<view class="binding">
		<u-top-tips ref="uTips"></u-top-tips>
		<u-toast ref="uToast" />
		<view class="title">
			<text>输入合伙人的手机号绑定</text>
		</view>
		<uni-forms :modelValue="formData">
			<uni-forms-item label="手机号:">
				<input type="number" :focus="true" :inputBorder="false" maxlength="11"
					v-model="formData.phoneNumber" placeholder="请输入合伙人的手机号" @input="bindingButton" />
			</uni-forms-item>
		</uni-forms>

		<view class="bangding">
			<button :style="{ opacity: satisfied ? '0.8' : '1' }" :disabled="satisfied" class="custom-style" ripple-bg-color="#ff7247"
				@click="binding()">绑定
			</button>
		</view>
		<u-toast ref="uToast" />
		<u-modal v-model="showModel" @confirm="modelConfirm" :content-style='contentStyle' :content="content" confirm-color='#ff7247'></u-modal>
	</view>
</template>

<script>
	import stringAction from "@/libs/stringAction.js";
	const SA = new stringAction();
	const app = getApp()
	export default {
		data() {
			return {
				formData: {
					phoneNumber: null,
				},
				contentStyle:{
					textAlign:'left',
					color:'#9a9a9a'
				},
				type: "number",
				border: true,
				satisfied: true,
				showModel: false,
				content: ''
			};
		},
		methods: {
			bindingButton() {
				if (SA.verifyMobile(this.formData.phoneNumber) && this.formData.phoneNumber != null ) {
					this.satisfied = false;
				}
				if(!SA.verifyMobile(this.formData.phoneNumber)){
					this.satisfied = true;
				}
			},
			binding() {
				if (this.formData.phoneNumber == null) {
					this.$refs.uTips.show({
						title: "请输入手机号",
						type: "error",
						duration: "1500",
					});
					return;
				}
				if (!SA.verifyMobile(this.formData.phoneNumber)) {
					this.$refs.uTips.show({
						title: "手机号码格式不正确",
						type: "error",
						duration: "1500",
					});
					return;
				}
				this.postDAtaBinding(this.formData.phoneNumber);
			},
			modelConfirm() {
				this.formData.phoneNumber = null
				this.satisfied = true
			},
			postDAtaBinding(value) {
				this.$myRequest({
					method: "GET",
					url: "/oa/oaEmployee/scanQrCode",
					data: {
						employeePhone: value,
					},
				}).then((res) => {
					if (res.success == 1) {
						this.$refs.uToast.show({
							title: res.msg,
							type: "success",
							isTab: true,
							url: "/pages/admin/index"
						});
					} else if (!res.success && res.data) {
						app.globalData.failCauseList = res.data
						uni.navigateTo({
							url: 'bindingTips?employeeName=' + res.data[0].employeeName
						})
					} else {
						this.content = res.msg
						this.showModel = true
					}
				});
			}
		}
	};
</script>

<style lang="less" scoped>
	page {
		background-color: #ffffff;

		.binding {
			width: 100%;
			padding: 40upx 48upx;

			.title {
				text-align: left;
				font-size: 44upx;
				line-height: 340upx;
				height: 340upx;
				font-weight: 600;
			}

			.phone {
				height: 280upx;
				display: flex;

				.number {
					font-size: 34upx;
					line-height: 86upx;
					height: 86upx;
				}

				.inputPhone {
					padding: 4upx 8upx;
					flex: 1;
					width: 100%;
					display: flex;
					box-sizing: border-box;
					min-height: 68upx;
					border: 2upx solid #cccccc;
					border-radius: 10upx;
					flex-direction: row;
					align-items: center;
				}
			}

			.bangding {
				position: fixed;
				bottom: 60upx;
				left: 55upx;
				width: 640upx;
				font-weight: 600;

				.u-btn--dis {
					color: #ffffff;
					border-color: #f6f7f8;
					background-color: #f6f7f8;
				}

				.custom-style {
					font-size: 34upx;
					color: #ffffff;
					background-color: #ff7247;
					height: 100upx;
					line-height: 100upx;
					border-radius: 100upx;
				}
			}
		}
	}


	/deep/ .uni-forms-item__inner {
		padding-bottom: 20upx;
		border-bottom: 2upx solid #ebebeb;
		.is-direction-left {
			padding-bottom: 10upx;
		}
	}

	/deep/ .uni-forms-item__label .label-text {
		font-size: 30upx;
	}

	/deep/ .uni-easyinput__placeholder-class {
		font-size: 28upx;
	}
</style>
