<template>
	<view class="page-wrap">
		<top-navigation-bar></top-navigation-bar>
		<scroll-view scroll-y="true" class="container" :style="containerStyle">
			<view class="class-item" v-for="(item,index) in list" :key='index'>
				<image :src="item.coverUrl" @tap='goDocDetail(item)' ></image>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[]
			};
		},
		onLoad() {
			this.getList()
		},
		methods: {
			goDocDetail(obj) {
				this.$goPage('/pagesSpecialComing/docDetail/docDetail',{doctorId:obj.id})
			},
			async getList(){
				const res = await this.$myRequest({
					method:'POST',
					url:'/special/specialDoctor/doctorStoreList',
					data:{}
				})
				if(!res || res.success !==1) return
				this.list = res.data.list
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 0 20rpx 30rpx;

		.class-item {
			margin-top: 40rpx;


			image {
				width: 700rpx;
				height: 423rpx;

				// border: 1rpx solid #FF991E;
			}

		}
	}
</style>
