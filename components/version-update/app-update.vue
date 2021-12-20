<template>
	<view class="wrap" v-if="popup_show">
		<view class="popup-bg" :style="getHeight">
			<view class="popup-content" :class="{'popup-content-show' : popup_show}">
				<view class="update-wrap">
						<view class="close-wrap" @click.stop="closeUpdate()" >
							<image src="/static/images/cart/close.png" style="width: 20rpx;height: 20rpx;" class="close-icon" mode="aspectFit"></image>
						</view>
						<view class="progress">
							<cCircle :size="120" :percent="Math.round((downSize/fileSize)*100)" defaultColor="#e7e7e7"
								circleColor='#FF997A' :circleWidth="12">
								<text slot="content" style="color: #FD5858;">{{Math.round((downSize/fileSize)*100) | numberData}}%</text>
							</cCircle>
						</view>
						<view class="down-text">{{title}}...</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let vm;
	import cCircle from "@/components/cCircle/cCircle.vue";
	export default {
		name: "appUpdate",
		components:[cCircle],
		//@是否强制更新
		props: {
			force: {
				type: Boolean,
				default: true, //true强制更新  false非强制更新
			},
			tabbar: {
				type: Boolean,
				default: false, //是否有原生tabbar组件
			}
		},
		data() {
			return {
				popup_show: false, //弹窗是否显示
				platform: "", //ios or android
				version: "1.0.0", //当前软件版本
				need_update: false, // 是否更新
				downing: false, //是否下载中
				downstatus: 0, //0未下载  1已开始 2已连接到资源  3已接收到数据  4下载完成
				update_info: {
				},
				fileSize: 0, //文件大小
				downSize: 0, //已下载大小
				viewObj: null, //原生遮罩view，
				title:'下载中'
			};
		},
		filters:{
			numberData(val){
				return !val?'0':val
			}
		},
		created() {
			vm = this;
		},
		computed: {
			// 下载进度计算
			lengthWidth: function() {
				let w = this.downSize / this.fileSize * 100;
				if (!w) {
					w = 0
				} else {
					w = w.toFixed(2)
				}
				return {
					width: w + "%" //return 宽度半分比
				}
			},
			getHeight: function() {
				let bottom = 0;
				if (this.tabbar) {
					bottom = 50;
				}
				return {
					"bottom": bottom + 'px',
					"height": "auto"
				}
			}
		},
		methods: {
			// 检查更新
			update() {
				// #ifdef APP-PLUS
				// 获取手机系统信息
				uni.getSystemInfo({
					success: function(res) {
						vm.platform = res.platform //ios  or android
					}
				});
				// 获取版本号
				plus.runtime.getProperty(plus.runtime.appid, function(inf) {
					vm.version = inf.version
				});
				vm.getUpdateInfo(); //获取更新信息
				// #endif
			},
			// 获取线上版本信息
			getUpdateInfo() {
				//向后台发起请求，获取最新版本号
				let platformType = ''
				this.platform=='android'?platformType=0:platformType=1
				const url = "/user/appVersion/getVersion?type=" + platformType;
				this.$myRequest({
					method: "GET",
					url: url,
				}).then((res) => {
					// console.log('kk',res);
						// 循环获取当前设备对应的更新数据
						vm.update_info = res.data;
						if (!vm.update_info.type) {
							// 后台未配置当前系统的升级数据
						} else {
							vm.checkUpdate(); ///检查是否更新
						}
				});
			},
			// 检查是否更新
			checkUpdate() {
				vm.need_update = vm.compareVersion(vm.version, vm.update_info.versionCode); // 检查是否需要升级
				if (vm.need_update) {
					// vm.popup_show = true; //线上版本号大于当前安装的版本号  显示升级框
					if (vm.tabbar) {
						//页面是否有原生tabbar组件
						// 创建原生view用来遮罩tabbar的点击事件 (如果是没有用原生的tabbar这一步可以取消)
						vm.viewObj = new plus.nativeObj.View('viewObj', {
							bottom: '0px',
							left: '0px',
							height: '50px',
							width: '100%',
							backgroundColor: "rgba(0,0,0,.6)"
						});
						vm.viewObj.show() //显示原生遮罩
					}
				}
			},
			// 取消更新
			closeUpdate() {
				vm.popup_show = false; //关闭升级弹窗
			},
			// 立即更新
			nowUpdate() {
				vm.popup_show = true;
				if (vm.downing) return false; //如果正在下载就停止操作
				vm.downing = true; //状态改变 正在下载中
				if (/\.apk$/.test(vm.update_info.versionUrl)) {
					// 如果是apk地址
					vm.download_wgt() // 安装包/升级包更新
				} else if (/\.wgt$/.test(vm.update_info.versionUrl)) {
					// 如果是更新包
					vm.download_wgt() // 安装包/升级包更新
				} else {
					this.closeUpdate()
					plus.runtime.openURL(vm.update_info.versionUrl, function() { //调用外部浏览器打开更新地址
						plus.nativeUI.toast("安装包地址打开错误");
					});
				}
			},
			// 下载升级资源包
			download_wgt() {
				// plus.nativeUI.showWaiting("下载更新文件..."); //下载更新文件...
				let options = {
					method: "get"
				};
				let dtask = plus.downloader.createDownload(vm.update_info.versionUrl, options, function(d, status) {

				});

				dtask.addEventListener("statechanged", function(task, status) {
					if (status === null) {} else if (status == 200) {
						//在这里打印会不停的执行，请注意，正式上线切记不要在这里打印东西///////////////////////////////////////////////////
						vm.downstatus = task.state;
						switch (task.state) {
							case 3: // 已接收到数据
								vm.downSize = task.downloadedSize;
								if (task.totalSize) {
									vm.fileSize = task.totalSize; //服务器须返回正确的content-length才会有长度
								}
								break;
							case 4:
								vm.installWgt(task.filename); // 安装wgt包
								break;
						}
					} else {
						plus.nativeUI.closeWaiting();
						this.closeUpdate()
						this.title = "下载出错"
						plus.nativeUI.toast("下载出错");
						vm.downing = false;
						vm.downstatus = 0;
					}
				});
				dtask.start();
			},

			// 安装文件
			installWgt(path) {
				plus.nativeUI.showWaiting("安装更新文件..."); //安装更新文件...
				vm.popup_show = false;
				plus.runtime.install(path, {}, function() {
					plus.nativeUI.closeWaiting();
					// 应用资源下载完成！
					plus.nativeUI.alert("应用资源下载完成！", function() {
						plus.runtime.restart();
						this.title = "应用资源下载完成"
					});

				}, function(e) {
					plus.nativeUI.closeWaiting();
					// 安装更新文件失败
					this.title = "安装更新文件失败"
				});
			},
			// 对比版本号
			compareVersion(ov, nv) {
				if (!ov || !nv || ov == "" || nv == "") {
					return false;
				}
				let b = false,
					ova = ov.split(".", 4),
					nva = nv.split(".", 4);
				for (let i = 0; i < ova.length && i < nva.length; i++) {
					let so = ova[i],
						no = parseInt(so),
						sn = nva[i],
						nn = parseInt(sn);
					if (nn > no || sn.length > so.length) {
						return true;
					} else if (nn < no) {
						return false;
					}
				}
				if (nva.length > ova.length && 0 == nv.indexOf(ov)) {
					return true;
				} else {
					return false;
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.progress{
		width: 250rpx;
		height: 250rpx;
		margin: 0 auto;
		margin-top: -50rpx;
	}
	.popup-bg {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: fixed;
		top: 0;
		left: 0rpx;
		right: 0;
		bottom: 0;
		width: 750rpx;
		background-color: rgba(0, 0, 0, .6);
	}

	.popup-content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.popup-content-show {
		animation: mymove 500ms;
		transform: scale(1);
	}

	@keyframes mymove {
		0% {
			transform: scale(0);
			/*开始为原始大小*/
		}

		100% {
			transform: scale(1);
		}

	}



	.update-wrap {
		width: 600rpx;
		height: 610rpx;
		border-radius: 18rpx;
		position: relative;
		display: flex;
		flex-direction: column;
		background-color: #ffffff;
		padding: 170rpx 30rpx 0;
		.close-icon{
			position: relative;
			left:520rpx;
			top: -150rpx;
		}
		.top-img {
			position: absolute;
			left: 0;
			width: 100%;
			height: 256rpx;
			top: -128rpx;
		}

		.content {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-bottom: 40rpx;

			.title {
				font-size: 32rpx;
				font-weight: bold;
				color: #6526f3;
			}

			.title-sub {
				text-align: center;
				font-size: 24rpx;
				color: #666666;
				padding: 30rpx 0;
			}

			.btn {
				width: 460rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #ffffff;
				font-size: 30rpx;
				height: 80rpx;
				line-height: 80rpx;
				border-radius: 100px;
				background-color: #6526f3;
				margin-top: 20rpx;
			}
		}
	}


	.close-ioc {
		width: 70rpx;
		height: 70rpx;
		margin-top: 30rpx;
	}

	.sche-wrap {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
		padding: 10rpx 50rpx 0;

		.sche-wrap-text {
			font-size: 24rpx;
			color: #666;
			margin-bottom: 20rpx;
		}

		.sche-bg {
			position: relative;
			background-color: #cccccc;
			height: 30rpx;
			border-radius: 100px;
			width: 480rpx;
			display: flex;
			align-items: center;

			.sche-bg-jindu {
				position: absolute;
				left: 0;
				top: 0;
				height: 30rpx;
				min-width: 40rpx;
				border-radius: 100px;
				background: url(images/round.png) #5775e7 center right 4rpx no-repeat;
				background-size: 26rpx 26rpx;
			}
		}
	}
	.down-text {
		font-size: 34rpx;
		text-align: center;
		margin-top: 30rpx;
	}
</style>
