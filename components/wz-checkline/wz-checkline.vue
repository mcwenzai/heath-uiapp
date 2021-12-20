<template>
	<view class="content">
		<view class="collshop-box">
			<view class="collshop-cen">
				<checkbox-group class="block" @change="changeCheckbox">
					<block v-for="(item,index) in datalist" :key="index">
						<view class="collshop-cen-item">
							<view class="card">
								<view class="card-top">
									<view class="left">
										<text>{{item.userName}}</text>
									</view>
									<view class="right">
										<text>{{item.createTime}}</text>
									</view>
								</view>
								<view class="li">
									<text>{{item.organName}}</text>
								</view>
								<view class="desc">
									<text>{{item.goodsName}}</text>
								</view>
							</view>
						</view>
					</block>
				</checkbox-group>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		name: 'wz-checkbox',
		props: {
			list: {
				type: Array,
				default: () => []
			},
		},
		data() {
			return {
				datalist: []
			}
		},
		watch: {
			list(e) {
				this.datalist = e
			},

		}
	}
</script>
<style lang="less">
	checkbox .wx-checkbox-input {
		border-radius: 50% !important;
		color: #ffffff !important;
	}

	checkbox .wx-checkbox-input.wx-checkbox-input-checked {
		color: #fff;
		background: #550000;
		border: 4upx solid #010155;
	}

	.wx-checkbox-input.wx-checkbox-input-checked {
		border: none !important;
	}

	page {
		background-color: #eee;
	}

	.collshop-box {
		padding-bottom: 100upx;
		width: 100%;
		height: auto;
		box-sizing: border-box;
		overflow: hidden;
	}

	.collshop-top {
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		text-align: right;
		font-size: 24rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #E10800;
		padding: 0 22rpx;
		box-sizing: border-box;
	}

	.collshop-cen {
		margin-top: 188upx;
		width: 100%;
		height: auto;
		overflow: hidden;

	}

	.collshop-cen-item {
		width: 100%;
		padding: 28upx 22upx;
		box-sizing: border-box;
		display: flex;

		.card {
			width: 100%;
			background-color: #ffffff;
			padding: 20upx 40upx;
			border-radius: 16upx;

			&-top {
				display: flex;
				justify-content: space-between;

				.left {
					font-size: 34upx;
					color: #111111;
				}

				.right {
					font-size: 26upx;
					color: #666666;
				}
			}

			.li {
				font-size: 32upx;
				line-height: 56upx;
				color: #666666;
			}

			.desc {
				font-size: 34upx;
				color: #666666;
			}
		}
	}

	.collshop-cen-item checkbox {
		// float: left;
		width: 40upx;
		height: 40upx;
		margin: 80upx 28upx 0 0;
	}

	.collshop-bot {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 122rpx;
		line-height: 122rpx;
		overflow: hidden;
		padding: 20upx 20upx 20upx 20upx;
		box-sizing: border-box;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.right {
			// padding-top: 20upx;
			margin-top: 20upx;
			.refuse {
				width: 160upx;
				height: 60upx;
				border: #ff7247 solid 1upx;
				border-radius: 60upx;
				line-height: 54upx;
				color: #ff7247;
			}
			button {
				background-color: #ffffff;
				color: #333333;
			}

			.adopt {
				width: 160upx;
				height: 60upx;
				background-color: #ff7247;
				border-radius: 60upx;
				color: white;
				font-size: 30upx;
				line-height: 58upx;
				text-align: center;
				margin: 0 20upx;
			}
		}
	}

	.collshop-bot checkbox-group {
		float: left;
		// padding: 40upx;
		line-height: 28upx;
		height: 48upx;
	}


</style>
