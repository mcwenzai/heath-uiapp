<template>
	<view class="page-wrap">
		<scroll-view scroll-y="true" class="container" >
			<view class="carousel-wrap">
				<view class="carousel" @touchstart.stop="carouselStart" @touchend.stop="carouselEnd">
					<view class="carousel-item current-item" :style="currentStyle">
						<image :src="firstImg" :style="currentImgStyle"></image>
					</view>
					<view class="carousel-item right-item" :style="rightStyle">
						<image :src="secondImg" :style="rightImgStyle"></image>
					</view>
					<view class="carousel-item left-item" :style="leftStyle">
						<image :src="thirdImg" :style="leftImgStyle"></image>
					</view>
					<view class="carousel-item third-item" :style="thirdStyle">
						<image :src="forthImg" :style="thirdImgStyle"></image>
					</view>
					<view class="carousel-item forth-item" :style="forthStyle">
						<image :src="fifthImg" :style="forthImgStyle"></image>
					</view>
					<view class="carousel-item fifth-item" :style="fifthStyle">
						<image :src="sixthImg" :style="fifthImgStyle"></image>
					</view>
				</view>
				<view class="carousel-tip app-f app-f-aic app-f-jcc">
					<view :class="{'carousel-tip-active':currentIndex % 6 === 0 }"></view>
					<view :class="{'carousel-tip-active':currentIndex % 6 === 1 }"></view>
					<view :class="{'carousel-tip-active':currentIndex % 6 === 2 }"></view>
					<view :class="{'carousel-tip-active':currentIndex % 6 === 3 }"></view>
					<view :class="{'carousel-tip-active':currentIndex % 6 === 4 }"></view>
					<view :class="{'carousel-tip-active':currentIndex % 6 === 5 }"></view>
				</view>
			</view>

			<view class="bottom-btn app-f app-f-aic app-f-jcc" @tap="goMoreList">
				更多主题
			</view>

		</scroll-view>
	</view>
</template>

<script>
	const ls = `width: 415rpx;
				height: 737rpx;
				opacity: 0.6;
				z-index:0;
				top:35rpx;
				left:0rpx;`

	const hs = `width: 415rpx;
				height: 737rpx;
				opacity: 0;
				z-index:0;
				top:0rpx;
				left:117.5rpx;`

	const rs = `width: 415rpx;
				height: 737rpx;
				opacity: 0.6;
				top:35rpx;
				z-index:0;
				left:275rpx;`



	const cs = `width: 573rpx;
				height: 780rpx;
				z-index: 20;
				left: 58rpx;
				opacity:1;
				top:0rpx;
				box-shadow: 0px 17rpx 20rpx 1rpx rgba(55,55,55,0.22); 
				`

	export default {
		data() {
			return {
				timer: null,
				currentIndex: 120,
				touchP: {
					x: 0,
					y: 0
				},
				imgList: []
			};
		},
		computed: {
			leftStyle() {
				const v = this.currentIndex % 6
				if (v === 0) return ls
				if (v < 4) return hs
				if (v === 4) return rs
				return cs

			},
			leftImgStyle() {
				const v = this.currentIndex % 6
				if (v <5 ) return 'width:415rpx;height:'+(415*1334/750) + 'rpx'
				
				return 'width:573rpx;height:'+(573*1334/750) + 'rpx'
			
			},
			rightStyle() {
				const v = this.currentIndex % 6

				if (v === 0) return rs
				if (v === 1) return cs
				if (v === 2) return ls

				return hs


			},
			
			rightImgStyle() {
				const v = this.currentIndex % 6
				if (v !==1 ) return 'width:415rpx;height:'+(415*1334/750) + 'rpx'
				
				return 'width:573rpx;height:'+(573*1334/750) + 'rpx'
			
			
			},
			
			
			currentStyle() {
				const v = this.currentIndex % 6
				if (v === 0) return cs
				if (v === 1) return ls
				if (v < 5) return hs
				return rs
			},
			currentImgStyle() {
				const v = this.currentIndex % 6
				if (v !==0 ) return 'width:415rpx;height:'+(415*1334/750) + 'rpx'
				
				return 'width:573rpx;height:'+(573*1334/750) + 'rpx'
			
			
			},
			thirdStyle() {
				const v = this.currentIndex % 6
				if (v === 0 || v === 4 || v === 5) return hs
				if (v === 1) return rs
				if (v === 2) return cs
				return ls
			},
			thirdImgStyle() {
				const v = this.currentIndex % 6
				if (v !==2 ) return 'width:415rpx;height:'+(415*1334/750) + 'rpx'
				
				return 'width:573rpx;height:'+(573*1334/750) + 'rpx'
			
			
			},
			forthStyle() {
				const v = this.currentIndex % 6
				if (v < 2 || v === 5) return hs
				if (v === 2) return rs
				if (v === 3) return cs
				return ls
			},
			forthImgStyle() {
				const v = this.currentIndex % 6
				if (v !==3 ) return 'width:415rpx;height:'+(415*1334/750) + 'rpx'
				
				return 'width:573rpx;height:'+(573*1334/750) + 'rpx'
			
			
			},
			fifthStyle() {
				const v = this.currentIndex % 6
				if (v < 3) return hs
				if (v === 3) return rs
				if (v === 4) return cs
				return ls
			},
			fifthImgStyle() {
				const v = this.currentIndex % 6
				if (v !==4 ) return 'width:415rpx;height:'+(415*1334/750) + 'rpx'
				
				return 'width:573rpx;height:'+(573*1334/750) + 'rpx'
			
			
			},
			firstImg(){
				const obj = this.imgList[0]
				if(!obj)return
				 return obj.detailUrl
			},
			secondImg(){
				const obj = this.imgList[1]
				if(!obj)return
				 return obj.detailUrl
			},
			thirdImg(){
				const obj = this.imgList[2]
				if(!obj)return
				 return obj.detailUrl
			},
			forthImg(){
				const obj = this.imgList[3]
				if(!obj)return
				 return obj.detailUrl
			},
			fifthImg(){
				const obj = this.imgList[4]
				if(!obj)return
				 return obj.detailUrl
			},
			sixthImg(){
				const obj = this.imgList[5]
				if(!obj)return
				 return obj.detailUrl
			}
		},
		onLoad() {
			this.getImgList()
			// console.log('nihao')
		},
		methods: {
			autoPlay() {
				// if (this.timer) return;
				// this.timer = setTimeout(() => {
				// 	this.currentIndex += 1
				// 	clearTimeout(this.timer)
				// 	this.timer = null
				// 	this.autoPlay()
				// }, 6000)
			},
			carouselStart(e) {
				// console.log('move',e)
				clearTimeout(this.timer)
				this.timer = null
				const {
					clientX: x,
					clientY: y
				} = e.changedTouches[0]
				this.touchP = {
					x,
					y
				}

			},
			carouselEnd(e) {
				// console.log('end',e)
				const {
					clientX,
					clientY
				} = e.changedTouches[0]
				const {
					x,
					y
				} = this.touchP
				// console.log(x,clientX)
				const dif = clientX - x
				clearTimeout(this.timer)
				this.timer = null
				if (dif < -20) {
					this.currentIndex += 1
					// console.log(this.currentIndex)
					setTimeout(() => {
						this.autoPlay()
					}, 6000)
					return
				}
				if (dif > 20) {
					this.currentIndex -= 1
					setTimeout(() => {
						this.autoPlay()
					}, 6000)
					return
				};
				this.goMake()

				// console.log(this.currentIndex)
			},
			goMoreList() {
				this.$goPage('/pagesMakePoster/postClass/postClass')
			},
			async getImgList() {
				const res = await this.$toolRequest({
					url: "/poster/posterTopicDetail/showList",
				})
				// console.log(res,'海报轮播')
				if (!res || res.success !== 1) return
				// this.autoPlay()
				this.imgList = res.data || []
			},

			goMake() {
				const curIdx = this.currentIndex % 6
				const url = this.imgList[curIdx].detailUrl
				this.$goPage('/pagesMakePoster/makePoster/makePoster', {
					url: url
				})

			}


		}
	}
</script>

<style lang="scss" scoped>
	scroll-view {
		padding: 50rpx 30rpx 30rpx;
		width: 750rpx;
	}

	.carousel-wrap {
		width: 100%;
		height: 800rpx;
		.carousel {
			position: relative;
			height: 798rpx;
			>view {
				transition: all 0.5s 0s ease;
				position: absolute;
				border-radius: 20rpx;
				// background-color: #fff;
				// border: 1rpx solid #000;
				width: 415rpx;
				height: 737rpx;
				overflow: hidden;

				image {
					width: 100%;

					border-radius: 20rpx;
				}
			}

			.left-item,
			.right-item {
				width: 415rpx;
				height: 737rpx;
				opacity: 0.6;
				top: 35rpx;
			}

			.left-item {
				left: 0rpx;
			}

			.right-item {
				left: 275rpx;
			}

			.current-item {
				width: 573rpx;
				height: 780rpx;
				z-index: 20;
				left: 58rpx;
				top: 0;
			}


		}

		.carousel-tip {
			margin-top: 80rpx;

			view {
				width: 18rpx;
				height: 18rpx;
				background-color: #bebebe;
				border-radius: 50%;
			}

			view:nth-child(2),
			view:nth-child(4) {
				margin: 0 20rpx;
			}

			view:nth-child(6) {
				margin-left: 20rpx;
			}

			.carousel-tip-active {
				background: #ff981e;
			}
		}

	}

	.bottom-btn {
		height: 100rpx;
		background: linear-gradient(-30deg, #ff981e 0%, #ffc029 100%);
		border-radius: 88rpx;
		box-shadow: 0px 25rpx 36rpx 2rpx rgba(255, 151, 29, 0.19);
		margin-top: 180rpx;
		color: #fff;
		font-size: 34rpx;
		font-weight: bold;
	}
</style>
