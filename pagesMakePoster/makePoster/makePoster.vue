<template>
	<view class="page-wrap" style="position: relative;overflow: hidden;">
		<scroll-view scroll-y="true" class="container">
			<view class="content-wrap" >
				<view class="image-wrap">
					<image class="bg" mode="widthFix" :src="info.bgImg"></image>
					<view class="input-wrap app-f app-f-aic">
						<view class="input-avatar" @tap="uploadAvatar(0)">
							<image :src='info.avatar' v-if="info.avatar"></image>
							<view v-else class="app-f app-f-aic app-f-jcc">图</view>
							<make-poster-step-tip :show='!info.avatar' position="bottom">1</make-poster-step-tip>
						</view>
						<view class="input-title app-f-f1" @tap="isShowInputTitle=true">
							{{info.title||'这里可输入您想要的文字(不超过16个字)'}}
							<make-poster-step-tip :show='!info.title' position="bottom">2</make-poster-step-tip>
						</view>
					</view>
				</view>
				<view class="bottom-input-wrap app-f app-f-aic">
					<view class="text-area-wrap " @tap="showInputArea = true">
						<textarea @blur="showInputArea=false" :focus="showInputArea"
							v-if='showInputArea || info.content' v-model.trim="info.content" placeholder=" "
							maxlength="60" />
						<view v-else="!showInputArea && !info.content"
							class="text-area-wrap-tip app-f app-f-jcc app-f-aic app-f-fdc">
							<view>这里可输入您想要填写的文字内容</view>
							<view>(不超过52个字)</view>
						</view>
						<make-poster-step-tip :show='!showInputArea && !info.content'>3</make-poster-step-tip>
					</view>
					
					<view class="input-code app-f app-f-fdc  app-f-aic">
						<view @tap="uploadAvatar(1)">
							<image v-if="info.codeImg" :src='info.codeImg'></image>
							<view v-else class="app-f app-f-aic app-f-jcc">二维码区域</view>
							<make-poster-step-tip :show='!info.codeImg'>4</make-poster-step-tip>
						</view>
						<view class="app-f-f1 app-f app-f-aic app-f-jcc">扫二维码联系我吧！</view>
					</view>
				</view>
				<view @tap="goMakePic"
					:class="['bottom-btn app-f app-f-aic app-f-jcc',bottomBtnIsDisabled ? '':'bottom-btn-active']">
					{{ bottomBtnIsDisabled ? '请先填写内容':"填好了，生成海报并保存到手机"}}
				</view>
				<view style="height: 30rpx;"></view>
			</view>
		</scroll-view>
		<canvas canvas-id="myCanvas" class="my-canvas" v-show='!isHideCanvas'></canvas>
		<tip :title='tipText' v-if='showTip'></tip>
		<full-modal :showModal="isShowInputTitle" @closeModal='closeInputTitle'>
			<template v-slot:content>
				<view class="input-title-modal">
					<textarea :focus="isShowInputTitle" maxlength="16" placeholder="这里可输入您想要的文字(不超过16个字)"
						v-model.trim="info.title" />
					<view class="app-f app-f-aic app-f-jcc" @tap="closeInputTitle">填好了</view>
				</view>
			</template>
		</full-modal>
		<view class="preview-img" v-if="posterUrl" @tap.stop="posterUrl=''">
			<view class="preview">
				<image :src="posterUrl" mode="widthFix"></image>
				<view class="save-to-phone app-f app-f-aic app-f-jcc" @tap.stop="saveToPic">保存至相册</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {
					avatar: "",
					codeImg: "",
					title: "",
					content: '',
					bgImg: ''
				},
				tipText: '',
				showTip: false,
				showInputArea: false,
				isShowInputTitle: false,
				isHideCanvas: false,
				posterUrl: ''
			};
		},
		computed: {

			bottomBtnIsDisabled() {
				const {
					avatar,
					codeImg,
					title,
					content
				} = this.info
				if (avatar && codeImg && title && content) return false
				return true
			}
		},
		onLoad(options) {
			const data = JSON.parse(decodeURIComponent(options.params))
			// console.log(data)
			this.info.bgImg = data.url
		},
		methods: {
			uploadAvatar(type) {
				// console.log(this.$BASEURL)
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						// console.log(JSON.stringify(res.tempFilePaths));
						const paths = res.tempFilePaths
						if (type === 0) {
							this.info.avatar = paths[0]
							return
						}
						if (type === 1) {
							this.info.codeImg = paths[0]
							return
						}
					}
				});
			},
			closeInputTitle() {
				this.isShowInputTitle = false
			},

			async goMakePic() {
				const ctx = uni.createCanvasContext('myCanvas')

				if (this.bottomBtnIsDisabled) return
				uni.showLoading({
					title: '生成中..'
				});

				const info = this.info
				// console.log('nihao')
				// const ctx = uni.createCanvasContext('myCanvas')
				const cH = 1334,
					cW = 750;
				// console.log(info.bgImg)
				const bg = await this.getImgData(info.bgImg)
				// console.log(bg)
				ctx.drawImage(bg, 0, 0, cW, cH)
				// 绘制头像
				ctx.save(); // 先保存状态 已便于画完圆再用
				ctx.beginPath(); //开始绘制
				//先画个圆
				const avatarW = 70
				ctx.arc((avatarW / 2) + 33, (avatarW / 2) + 37, 35, 0, Math.PI * 2);
				ctx.setFillStyle('#fff')
				ctx.fill()
				ctx.clip();
				ctx.stroke()

				ctx.drawImage(info.avatar, 33, 37, avatarW, avatarW)
				ctx.restore()
				// 绘制标题
				ctx.setFontSize(30)
				ctx.setFillStyle('#fff')
				ctx.fillText(info.title, 120, 84)

				ctx.setFillStyle('#000')
				// ctx.fillText(info.content, 30, cH + 60)
				// anvas, text, x, y, maxWidth, lineHeight, maxRowNum
				this.canvasWraptitleText(ctx, info.content, 30, 1043 + 80)

				ctx.drawImage(info.codeImg, 552, 1043 + 53, 146, 153)
				ctx.setFontSize(26)
				ctx.setFillStyle('#333')
				ctx.fillText('扫二维码联系我吧!', 510, 1043 + 53 + 153 + 40)


				ctx.draw(false, () => {
					// this.isHideCanvas = true
					uni.canvasToTempFilePath({
						canvasId: 'myCanvas',
						success: (res) => {
							// console.log('加载中')
							uni.hideLoading()
							// console.log(res.tempFilePath)
							this.posterUrl = res.tempFilePath

						},
						fail: function(err) {
							// console.log(err)
						}
					})
				})


			},

			getImgData(src) {
				return new Promise(resolve => {
					uni.getImageInfo({
						src: src,
						success: res => {
							resolve(res.path)
						},
						fail: () => {

						}
					})
				})
			},
			saveToPic() {
				// console.log(path)
				const path = this.posterUrl
				uni.showLoading({
					title: '保存中'
				});
				uni.saveImageToPhotosAlbum({
					filePath: path,
					success: () => {
						uni.showToast({
							title: '保存成功!'
						});

					},
					fail: function(e) {
						//TODO
						uni.showToast({
							title: '保存失败!'
						});
					},
					complete: ()=> {
						this.posterUrl = ''
						uni.hideLoading()
					}
				});
			},
			canvasWraptitleText(canvas, text, x, y) {
				// console.log(text)

				// console.log(text)
				const reg = /\n/
				const arrText = text.split(reg);
				const res = []
				const num = 12
				// console.log(arrText)
				arrText.forEach((item, index) => {
					const arr = item.split("")
					// console.log('arr', arr)
					const limit = 30 * 14
					let w = 0,
						r = '',
						len = arr.length - 1
					// console.log(arr.length)
					// console.log('和',canvas.measureText('和'))
					arr.forEach((v, i) => {
						const measureObj = canvas.measureText(v)
						// console.log(measureObj,v)
						w += measureObj.width
						if (w <= limit && i<len) {
							r += v
						}else if(w<=limit && i===len){
							r += v
							res.push(r)
							w = 0
							r=''
						}else if(w>limit && i< len){
							res.push(r)
							r=v
							w=measureObj.width
						}else{
							res.push(r)
							res.push(v)
							w = 0
							r=''
						}
					})
				})
				// console.log(res)
				res.forEach((item, index) => {
					canvas.fillText(item, x, y + index * 40)
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		// padding-bottom: 120rpx;
		background-color: #fff;
		width: 750rpx;
		height: 100vh;
		.content-wrap {
			position: absolute;
			height: 100%;
			left: 0;
			top: 0;
			z-index: 20;
		}
	}

	.my-canvas {
		height: 1334px;
		width: 750px;
		z-index: -1;
		position: relative;
		left: 0;
		top: 9999px;
	}

	.image-wrap {
		position: relative;
		width: 750rpx;
		height: 1043rpx;
		overflow: hidden;
		.bg {
			width: 100%;
			position: absolute;
			left: 0;
			top: 0;

		}

		.input-wrap {
			position: absolute;
			width: 100%;
			top: 30rpx;
			left: 0;
			z-index: 99;

			// border: 1rpx solid #fff;
			.input-avatar {
				width: 70rpx;
				height: 70rpx;
				// opacity: 0.5;
				border: 3rpx dashed #ffffff;
				border-radius: 35rpx;
				margin-left: 30rpx;
				// overflow: hidden;
				color: #fff;
				position: relative;
				image {
					width: 100%;
					height: 100%;
					// border: 3rpx dashed #ffffff;
					border-radius: 50%;
				}

				view {
					height: 100%;
					width: 100%;
					border-radius: 50%;
					font-weight: bold;
				}
			}

			.input-title {
				border: 3rpx dashed #ffffff;
				height: 70rpx;
				margin-left: 30rpx;
				margin-right: 30rpx;

				font-size: 30rpx;

				padding: 0 12rpx;
				color: #fff;
				line-height: 70rpx;
position: relative;

			}
		}
	}

	.bottom-input-wrap {
		// background-color: #F1F1F1;
		padding: 30rpx;
		// position: absolute;
		z-index: 99;
		margin-top: 20rpx;

		.text-area-wrap {
			border: 3rpx dashed #666;
			position: relative;
			z-index: 99;
			margin-right: 20rpx;
			height: 250rpx;
			width: 450rpx;

			textarea {
				height: 100%;
				padding: 12rpx;
				width: 100%;
				box-sizing: border-box;
				color: #000;
			}

			.text-area-wrap-tip {
				text-align: center;
				height: 100%;
				width: 100%;

				view:last-child {
					color: #999;
				}
			}
		}

		.input-code {
			width: 220rpx;
			height: 256rpx;

			position: relative;
			z-index: 99;

			font-size: 24rpx;
			// overflow: hidden;

			image {
				height: 164rpx;
				width: 164rpx;
			}

			>view:first-child {
				border-radius: 0rpx;
				border: 2rpx dashed #666;
				height: 168rpx;
				width: 168rpx;
				position: relative;
				view {
					height: 100%;
					width: 100%;
				}
				
			}
		}
	}

	.bottom-btn {
		width: 710rpx;
		height: 90rpx;
		// z-index: 100;
		background: linear-gradient(-30deg, #9d9d9d 0%, #bfbfbf 100%);
		border-radius: 45rpx;
		box-shadow: 0px 25rpx 36rpx 2rpx rgba(84, 84, 84, 0.25);
		position: relative;
		// bottom: 25rpx;
		font-size: 34rpx;
		font-weight: 500;
		color: #ffffff;
		left: 50%;
		transform: translateX(-50%);
	}

	.bottom-btn-active {
		background: linear-gradient(-30deg, #ff981e 0%, #ffc029 100%);
	}

	.input-title-modal {
		padding: 30rpx;

		textarea {
			width: 100%;
			font-size: 32rpx;
			line-height: 40rpx;
			height: 200rpx;
			color: #666;
		}

		view {
			width: 414rpx;
			height: 88rpx;
			opacity: 1;
			background: linear-gradient(-30deg, #ff981e 0%, #ffc029 100%);
			border-radius: 44rpx;
			box-shadow: 0px 25rpx 36rpx 2rpx rgba(255, 151, 29, 0.19);
			margin: 20rpx auto;
			color: #fff;
			font-weight: 500;

		}
	}

	.preview-img {
		position: fixed;
		z-index: 9999;
		width: 750rpx;
		height: 100vh;
		left: 0;
		top: 0;
		background-color: rgba(0, 0, 0, .5);

		.preview {
			width: 500rpx;
			top: 30px;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			
			image {
				width: 100%;
				background-color: #fff;
			}
		}

		.save-to-phone {
			height: 90rpx;
			width: 336rpx;
			background: linear-gradient(-30deg, #ff981e 0%, #ffc029 100%);
			border-radius: 44rpx;
			box-shadow: 0px 25rpx 36rpx 2rpx rgba(255, 151, 29, 0.19);
			margin: 40rpx auto;
			color: #fff;

		}
	}
</style>
