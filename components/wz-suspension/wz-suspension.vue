<template>
	<view>
		<view
			id="_drag_button"
			class="drag"
			:style="'left: ' + left + 'px; top:' + top + 'px;'"
			@touchstart="touchstart"
			@touchmove.stop.prevent="touchmove"
			@touchend="touchend"
			:class="{transition: isDock && !isMove }"
			@click="backSalesman()"
		>
			<text>客户：</text>
			<text>{{ text }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'drag-button',
		props: {
			isDock:{
				type: Boolean,
				default: false
			},
			existTabBar:{
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				top:0,
				left:0,
				width: 0,
				height: 0,
				offsetWidth: 0,
				offsetHeight: 0,
				windowWidth: 0,
				windowHeight: 0,
				isMove: true,
				edge: 10,
				text: ''
			}
		},
		mounted() {
			const sys = uni.getSystemInfoSync();
			var customerData = getApp().globalData.customerData
			this.text = customerData.name
			this.windowWidth = sys.windowWidth;
			this.windowHeight = sys.windowHeight;

			// #ifdef APP-PLUS
				this.existTabBar && (this.windowHeight -= 50);
			// #endif
			if (sys.windowTop) {
				this.windowHeight += sys.windowTop;
			}

			const query = uni.createSelectorQuery().in(this);
			query.select('#_drag_button').boundingClientRect(data => {
				this.width = data.width;
				this.height = data.height;
				this.offsetWidth = data.width / 2;
				this.offsetHeight = data.height / 2;
				this.left = 0;
				this.top = 40;
			}).exec();

		},
		methods: {
			click() {
				this.$emit('btnClick');
			},
			touchstart(e) {
				this.$emit('btnTouchstart');
			},
			touchmove(e) {
				// 单指触摸
				if (e.touches.length !== 1) {
					return false;
				}
				this.isMove = true;
				this.left = e.touches[0].clientX - this.offsetWidth;
				let clientY = e.touches[0].clientY - this.offsetHeight;
				// #ifdef H5
					clientY += this.height;
				// #endif
				let edgeBottom = this.windowHeight - this.height - this.edge;

				// 上下触及边界
				if (clientY < this.edge) {
					this.top = this.edge;
				} else if (clientY > edgeBottom) {
					this.top = edgeBottom;
				} else {
					this.top = clientY
				}

			},
			touchend(e) {
				if (this.isDock) {
					let edgeRigth = this.windowWidth - this.width - this.edge;

					if (this.left < this.windowWidth / 2 - this.offsetWidth) {
						this.left = 0;
					} else {
						this.left = 0;
					}
				}

				this.isMove = false;
				this.$emit('btnTouchend');
			},
			backSalesman() {
				uni.reLaunch({
					url: '../../pages/salesman/index'
				})
			}
		}}
</script>

<style lang="scss">
	.drag {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.5);
		box-shadow: 0 0 6upx rgba(0, 0, 0, 0.4);
		color: $uni-text-color-inverse;
		height: 80upx;
		line-height: 80upx;
		padding: 0 20upx;
		border-radius: 0 80upx 80upx 0;
		font-size: $uni-font-size-sm;
		position: fixed;
		z-index: 999999;

		&.transition {
			transition: left .3s ease,top .3s ease;
		}
	}

</style>
