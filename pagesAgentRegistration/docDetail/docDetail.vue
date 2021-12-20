<template>
	<view class="page-wrap">
		<top-navigation-bar></top-navigation-bar>
		<scroll-view scroll-y="true" class="container" :style="containerStyle">
			<view class="image">
				<image :src="info.detailUrl" mode="widthFix"></image>
			</view>
			
		</scroll-view>
		<bottom-agent-registration-btn :doctorId='info.id' :doctorName='info.doctorName'></bottom-agent-registration-btn>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {}
			};
		},
		onLoad(options) {
			const data =  JSON.parse(decodeURIComponent(options.params))  
			this.getInfo(data.doctorId)
		},
		methods: {
			async getInfo(id) {
				const res = await this.$myRequest({
					url: '/special/specialDoctor/getById',
					data: {
						id
					},
				})
				// console.log('医生详情',res)
				if(!res || res.success !==1 )return
				this.info = res.data
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding-bottom: 140rpx;
		image {
			width: 750rpx;
		}

	}
</style>
