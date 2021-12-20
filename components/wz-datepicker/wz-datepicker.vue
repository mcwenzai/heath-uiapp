<template>
	<view v-if="isShow" class="picker">
		<view @click="onCancel" style="position: fixed;width: 100%;height: 100%;left: 0;top: 0;background: rgba(60,60,60,0.5)"></view>
		<!-- 日期选择器 -->
		<view v-if="type!='time'" :class="isShow?'myfirst':''" class="picker-modal">
			<view class="picker-header">
				<view class="close" @click="onCancel" style="font-size: 22px;width: 50upx;"></view>
				<view style="flex: 1;font-size: 16px; text-align: center;color: rgb(102,101,91);">选择日期</view>
				<view style="width: 50upx;"></view>
			</view>
			<view class="picker-week-header">
				<view v-for="item in weekArr">{{item}}</view>
			</view>
			<scroll-view class="picker-modal-body" scroll-y="true" id="target">
				<!-- <view class="picker-modal-header-title" style="position: fixed;height: 93upx;line-height: 93upx;margin-top:-1px;right: 1px;background: #fff;z-index: 999;">{{dateTitleArr[scrollIndex]}}</view> -->

				<view class="picker-calendar-box" :id="'calendar_module'+calendar_Index" v-for="(calendar,calendar_Index) in calendars"
				 :key="calendar_Index">
					<view class="picker-modal-header-title" :class="" style="color:rgb(77,77,77); font-size: 16px; width: 100%;height: 90upx;line-height: 90upx;text-align: center;">{{dateTitleArr[calendar_Index]}}</view>
					<view class="picker-calendar">
						<view class="picker-calendar-view" v-for="(date,dateIndex) in calendar" :key="dateIndex">
							<view v-show="!date.isOtherMonth || calendar_Index == 0" @click="onSelectDate(date)">
								<!-- 背景样式 -->
								<view v-show="date.bgStyle.type" :class="'picker-calendar-view-'+date.bgStyle.type" :style="{background: date.bgStyle.background}"></view>
								<!-- 正常和选中样式 -->
								<view class="picker-calendar-view-item" :style="{opacity: date.statusStyle.opacity, color: date.statusStyle.color, background: date.statusStyle.background}">
									<text>{{date.title}}</text>
								</view>
								<!-- 小圆点样式 -->
								<view class="picker-calendar-view-dot" :style="{opacity: date.dotStyle.opacity, background: date.dotStyle.background}"></view>
								<!-- 信息样式 -->
								<view v-show="date.tips" class="picker-calendar-view-tips">{{date.tips}}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="picker-modal-footer" v-show="checkeds.length==2" style="position: fixed;bottom: 0;z-index: 1002;">
					<view style="position: absolute;width: 100%;height: 100%;background: #fff;z-index: -1;left:0;top:1px;"></view>
					<view class="picker-modal-footer-btnOK" :style="{'background':color}" @click="onConfirm">完成</view>
				</view>
				<view class="picker-modal-footer" v-show="checkeds.length==2"></view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	/**
	 * 工具函数库
	 */
	const DateTools = {
		/**
		 * 获取公历节日
		 * @param date Date对象
		 */
		getHoliday(date) {
			let holidays = {
				'0101': '元旦',
				'0214': '情人',
				'0308': '妇女',
				'0312': '植树',
				'0401': '愚人',
				'0501': '劳动',
				'0504': '青年',
				'0601': '儿童',
				'0701': '建党',
				'0801': '建军',
				'0903': '抗日',
				'0910': '教师',
				'1001': '国庆',
				'1031': '万圣',
				'1224': '平安',
				'1225': '圣诞'
			};
			let value = this.format(date, 'mmdd');
			if (holidays[value]) return holidays[value];
			return false;
		},
		/**
		 * 解析标准日期格式
		 * @param s 日期字符串
		 * @return 返回Date对象
		 */
		parse: s => new Date(s.replace(/(年|月|-)/g, '/').replace(/(日)/g, '')),
		/**
		 * 比较日期是否为同一天
		 * @param a Date对象
		 * @param b Date对象
		 * @return Boolean
		 */
		isSameDay: (a, b) => a.getMonth() == b.getMonth() && a.getFullYear() == b.getFullYear() && a.getDate() == b.getDate(),
		/**
		 * 格式化Date对象
		 * @param d 日期对象
		 * @param f 格式字符串
		 * @return 返回格式化后的字符串
		 */
		format(d, f) {
			var o = {
				"m+": d.getMonth() + 1,
				"d+": d.getDate(),
				"h+": d.getHours(),
				"i+": d.getMinutes(),
				"s+": d.getSeconds(),
				"q+": Math.floor((d.getMonth() + 3) / 3),
			};
			if (/(y+)/.test(f))
				f = f.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
			for (var k in o)
				if (new RegExp("(" + k + ")").test(f))
					f = f.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			return f;
		},
		/**
		 * 用于format格式化后的反解析
		 * @param s 日期字符串
		 * @param f 格式字符串
		 * @return 返回Date对象
		 */
		inverse(s, f) {
			var o = {
				"y": '',
				"m": '',
				"d": '',
				"h": '',
				"i": '',
				"s": '',
			};
			let d = new Date();
			if (s.length != f.length) return d;
			for (let i in f)
				if (o[f[i]] != undefined) o[f[i]] += s[i];
			if (o.y) d.setFullYear(o.y.length < 4 ? (d.getFullYear() + '').substr(0, 4 - o.y.length) + o.y : o.y);
			o.m && d.setMonth(o.m - 1, 1);
			o.d && d.setDate(o.d - 0);
			o.h && d.setHours(o.h - 0);
			o.i && d.setMinutes(o.i - 0);
			o.s && d.setSeconds(o.s - 0);
			return d;
		},
		/**
		 * 获取日历数组（42天）
		 * @param date 日期对象或日期字符串
		 * @param proc 处理日历(和forEach类似)，传递一个数组中的item
		 * @return Array
		 */
		getCalendar(date, proc,beforeDateDisable) {
			let it = new Date(date),
				calendars = [];
			let nowDate = new Date(new Date(new Date().toLocaleDateString()).getTime());
			it.setDate(1);
			if(it.getDay()>0){
				it.setDate(it.getDate() - (it.getDay() == 0 ? 7 : it.getDay())); //偏移量
			}
			for (let i = 0; i < 42; i++) {
				let tmp = {
					dateObj: new Date(it),
					title: it.getDate(),
					isOtherMonth: it.getMonth() < date.getMonth() || it.getMonth() > date.getMonth()
				};
				if(beforeDateDisable){
					tmp.isBeforeNowDay = it<nowDate;
				}
				if (tmp.title == 1 && calendars.length > 7) {
					break;
				}
				calendars.push(Object.assign(tmp, proc ? proc(tmp) : {}));

				it.setDate(it.getDate() + 1);
			}
			return calendars;
		},
		/**
		 * 获取日期到指定的月份1号(不改变原来的date对象)
		 * @param d Date对象
		 * @param v 指定的月份
		 * @return Date对象
		 */
		getDateToMonth(d, v) {
			let n = new Date(d);
			n.setMonth(v, 1);
			return n;
		},
		/**
		 * 把时间数组转为时间字符串
		 * @param t Array[时,分,秒]
		 * @param showSecinds 是否显示秒
		 * @return 字符串 时:分[:秒]
		 */
		formatTimeArray(t, s) {
			let r = [...t];
			if (!s) r.length = 2;
			r.forEach((v, k) => r[k] = ('0' + v).slice(-2));
			return r.join(':');
		}
	};

	export default {
		props: {
			//颜色
			color: {
				type: String,
				default: 'rgb(230,86,86)'
			},
			//显示未来几个月
			beforeDateDisable: {
				type: Boolean,
				default: false
			},
			//显示未来几个月
			monthNum: {
				type: Number,
				default: 6
			},
			//是否显示秒 针对type为datetime或time时生效
			showSeconds: {
				type: Boolean,
				default: false
			},
			//初始的值
			value: [String, Array],
			//类型date time datetime range rangetime
			type: {
				type: String,
				default: 'range'
			},
			//是否显示
			show: {
				type: Boolean,
				default: false
			},
			//初始格式
			format: {
				type: String,
				default: ''
			},
			//显示公历节日
			showHoliday: {
				type: Boolean,
				default: true
			},
			//显示提示
			showTips: {
				type: Boolean,
				default: false
			},
			//开始文案 针对type为范围选择时生效
			beginText: {
				type: String,
				default: '开始'
			},
			//结束文案 针对type为范围选择时生效
			endText: {
				type: String,
				default: '结束'
			}
		},
		data() {
			return {
				isShow: false, //是否显示
				isMultiSelect: false, //是否为多选
				isContainTime: false, //是否包含时间
				date: {}, //当前日期对象
				weekArr: ["日", "一", "二", "三", "四", "五", "六"],
				scrollTopArr: [],
				scrollIndex: 0,
				dateTitleArr: [],
				title: '初始化', //标题
				calendars: [], //日历数组
				calendarIndex: 1, //当前日历索引
				checkeds: [], //选中的日期对象集合
				showTimePicker: false, //是否显示时间选择器
				timeValue: [0, 0, 0], //时间选择器的值
				timeType: 'begin', //当前时间选择的类型
				beginTime: [0, 0, 0], //当前所选的开始时间值
				endTime: [0, 0, 0], //当前所选的结束时间值
			};
		},
		methods: {
			//监听滚动条
			// scrollPage(e) {
			// 	let scrollIndex = 0;
			// 	if (this.scrollTopArr.length >= 6) {
			// 		this.scrollTopArr.some(function(item, index) {
			// 			if (e.detail.scrollTop >= item) {
			// 				scrollIndex = index;
			// 			}
			// 		})
			// 	}
			// 	this.scrollIndex = scrollIndex;
			// },
			//设置值
			setValue(value) {
				this.date = new Date();
				this.checkeds = [];
				this.isMultiSelect = this.type.indexOf('range') >= 0;
				this.isContainTime = this.type.indexOf('time') >= 0;
				//将字符串解析为Date对象
				let parseDateStr = (str) => (this.format ? DateTools.inverse(str, this.format) : DateTools.parse(str));
				if (value) {
					if (this.isMultiSelect) {
						Array.isArray(value) && value.forEach((dateStr, index) => {
							let date = parseDateStr(dateStr);
							let time = [date.getHours(), date.getMinutes(), date.getSeconds()];
							if (index == 0) this.beginTime = time;
							else this.endTime = time;
							this.checkeds.push(date);
						});
					} else {
						if (this.type == 'time') {
							let date = parseDateStr('2019/1/1 ' + value);
							this.beginTime = [date.getHours(), date.getMinutes(), date.getSeconds()];
							this.onShowTimePicker('begin');
						} else {
							this.checkeds.push(parseDateStr(value));
							if (this.isContainTime) this.beginTime = [
								this.checkeds[0].getHours(),
								this.checkeds[0].getMinutes(),
								this.checkeds[0].getSeconds()
							];
						}
					}
					if (this.checkeds.length) this.date = new Date(this.checkeds[0]);
				} else {
					if (this.isContainTime) {
						this.beginTime = [this.date.getHours(), this.date.getMinutes(), this.date.getSeconds()];
						if (this.isMultiSelect) this.endTime = [...this.beginTime];
					}
					this.checkeds.push(new Date(this.date));
				}
				if (this.type != 'time') this.refreshCalendars(true);
				else this.onShowTimePicker('begin');
			},
			//设置时间选择器的显示状态
			onShowTimePicker(type) {
				this.showTimePicker = true;
				this.timeType = type;
				this.timeValue = type == 'begin' ? [...this.beginTime] : [...this.endTime];
			},
			//处理日历
			procCalendar(item) {
				//定义初始样式
				item.statusStyle = {
					opacity: 1,
					color: item.isOtherMonth ? '#ddd' : 'rgb(108,108,108)',
					background: 'transparent'
				};
				if(item.isBeforeNowDay || item.isOtherMonth){
					item.statusStyle.color = '#ddd';
					item.isGray = true;
				}
				item.bgStyle = {
					type: '',
					background: 'transparent'
				};
				item.dotStyle = {
					opacity: 1,
					background: 'transparent'
				};
				item.tips = "";
				//标记今天的日期
				if (DateTools.isSameDay(new Date(), item.dateObj)) {
					item.statusStyle.color = this.color;
					if (item.isOtherMonth) item.statusStyle.opacity = 0.3;
				}
				//标记选中项
				this.checkeds.forEach(date => {
					if (DateTools.isSameDay(date, item.dateObj)) {
						item.statusStyle.background = this.color;
						item.statusStyle.color = '#fff';
						item.statusStyle.opacity = 1;
						if (this.isMultiSelect && this.showTips) item.tips = this.beginText;
					}
				});
				//节假日或今日的日期标点
				if (item.statusStyle.background != this.color) {
					let holiday = this.showHoliday ? DateTools.getHoliday(item.dateObj) : false;
					if (holiday || DateTools.isSameDay(new Date(), item.dateObj)) {
						item.title = holiday || item.title;
						item.dotStyle.background = this.color;
						if (item.isOtherMonth) item.dotStyle.opacity = 0.2;
					}
				} else {
					item.title = item.dateObj.getDate();
				}
				//有两个日期
				if (this.checkeds.length == 2) {
					if (DateTools.isSameDay(this.checkeds[0], item.dateObj)) { //开始日期
						item.bgStyle.type = 'bgbegin';
					}
					if (DateTools.isSameDay(this.checkeds[1], item.dateObj)) { //结束日期
						if (this.isMultiSelect && this.showTips) item.tips = item.bgStyle.type ? this.beginText + ' / ' + this.endText :
							this.endText;
						if (!item.bgStyle.type) { //开始日期不等于结束日期
							item.bgStyle.type = 'bgend';
						} else {
							item.bgStyle.type = '';
						}
					}
					if (!item.bgStyle.type && (+item.dateObj > +this.checkeds[0] && +item.dateObj < +this.checkeds[1])) { //中间的日期
						item.bgStyle.type = 'bg';
						item.statusStyle.color = this.color;
					}
					if (item.bgStyle.type) {
						item.bgStyle.background = this.color;
						item.dotStyle.opacity = 1;
						item.statusStyle.opacity = 1;
					}
				}
			},
			//刷新日历
			refreshCalendars(refresh = false) {
				let date = new Date(this.date);
				let before = DateTools.getDateToMonth(date, date.getMonth() - 1);
				let after = DateTools.getDateToMonth(date, date.getMonth() + 1);

				let _this = this;
				let mArr = [];
				for (let m_num = 0; m_num < this.monthNum; m_num++) {
					let new_date = DateTools.getDateToMonth(date, date.getMonth() + m_num);
					_this.dateTitleArr.push(DateTools.format(new_date, 'yyyy年mm月'))
					mArr.push(new_date)
				}
				mArr.some(function(item, index) {
					_this.calendars.splice(index, 1, DateTools.getCalendar(item, _this.procCalendar,_this.beforeDateDisable));
				})
				this.title = DateTools.format(this.date, 'yyyy年mm月');


				this.$nextTick(() => {
					let domArr = [];
					let h = 0;
					const query = uni.createSelectorQuery().in(_this);
					for (let m_domNum = 0; m_domNum < _this.monthNum; m_domNum++) {
						let className = '#calendar_module' + m_domNum;
						let view = uni.createSelectorQuery().select(className);
						view.fields({
							size: true, // 是否返回节点尺寸
						}, data => { // data是方法的回调函数，参数是指定的相关节点信息。
							let model = {};
							model.top = h; // 顶部高度
							// h += data.height;
							model.bottom = h; // 底部高度
							// domArr.push(model.top);
						}).exec();
					}
					// _this.scrollTopArr = domArr;
				})
			},
			//选中日期
			onSelectDate(date) {
				if(date.isGray){
					return;
				}
				if (~this.type.indexOf('range') && this.checkeds.length == 2) this.checkeds = [];
				else if (!(~this.type.indexOf('range')) && this.checkeds.length) this.checkeds = [];
				this.checkeds.push(new Date(date.dateObj));
				this.checkeds.sort((a, b) => a - b); //从小到大排序
				this.calendars.forEach(calendar => {
					calendar.forEach(this.procCalendar); //重新处理
				});
			},
			//时间选择取消
			onCancelTime() {
				this.showTimePicker = false;
				this.type == 'time' && this.onCancel();
			},
			//时间选择确定
			onConfirmTime() {
				if (this.timeType == 'begin') this.beginTime = this.timeValue;
				else this.endTime = this.timeValue;
				this.showTimePicker = false;
				this.type == 'time' && this.onConfirm();
			},
			//取消
			onCancel() {
				this.$emit('cancel', false);
			},
			//确定
			onConfirm() {
				let result = {
					value: null,
					date: null
				};
				//定义默认格式
				let defaultFormat = {
					'date': 'yyyy/mm/dd',
					'time': 'hh:ii' + (this.showSeconds ? ':ss' : ''),
					'datetime': ''
				};
				defaultFormat['datetime'] = defaultFormat.date + ' ' + defaultFormat.time;
				let fillTime = (date, timeArr) => {
					date.setHours(timeArr[0], timeArr[1]);
					if (this.showSeconds) date.setSeconds(timeArr[2]);
				};
				if (this.type == 'time') {
					let date = new Date();
					fillTime(date, this.beginTime);
					result.value = DateTools.format(date, this.format ? this.format : defaultFormat.time);
					result.date = date;
				} else {
					if (this.isMultiSelect) {
						let values = [],
							dates = [];
						if (this.checkeds.length < 2) return uni.showToast({
							icon: 'none',
							title: '请选择两个日期'
						});
						this.checkeds.forEach((date, index) => {
							let newDate = new Date(date);
							if (this.isContainTime) {
								let time = [this.beginTime, this.endTime];
								fillTime(newDate, time[index]);
							}
							values.push(DateTools.format(newDate, this.format ? this.format : defaultFormat[this.isContainTime ?
								'datetime' : 'date']));
							dates.push(newDate);
						});
						result.value = values;
						result.date = dates;
					} else {
						let newDate = new Date(this.checkeds[0]);
						if (this.isContainTime) {
							newDate.setHours(this.beginTime[0], this.beginTime[1]);
							if (this.showSeconds) newDate.setSeconds(this.beginTime[2]);
						}
						result.value = DateTools.format(newDate, this.format ? this.format : defaultFormat[this.isContainTime ?
							'datetime' : 'date']);
						result.date = newDate;
					}
				}
				this.$emit('confirm', result);
			}
		},
		computed: {
			BeginTitle() {
				let value = '未选择';
				if (this.checkeds.length) value = DateTools.format(this.checkeds[0], 'yy/mm/dd');
				return value;
			},
			EndTitle() {
				let value = '未选择';
				if (this.checkeds.length == 2) value = DateTools.format(this.checkeds[1], 'yy/mm/dd');
				return value;
			}
		},
		watch: {
			show(newValue, oldValue) {
				newValue && this.setValue(this.value);
				this.isShow = newValue;
			},
			value(newValue, oldValue) {
				setTimeout(() => {
					this.setValue(newValue);
				}, 0);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.close {
		position: relative;
		width: 35upx;
		height: 35upx;
	}

	.close::before,
	.close::after {
		position: absolute;
		content: ' ';
		background-color: rgb(101, 100, 91);
		left: 20upx;
		width: 1px;
		height: 35upx;
	}

	.close::before {
		transform: rotate(45deg);
	}

	.close::after {
		transform: rotate(-45deg);
	}


	@keyframes myfirst
	{
		0% {top: 100vh;}
		100% {top: 30vh;}
	}

	@-moz-keyframes myfirst /* Firefox */
	{
		0% {top: 100vh;}
		100% {top: 30vh;}
	}

	@-webkit-keyframes myfirst /* Safari 和 Chrome */
	{
		0% {top: 100vh;}
		100% {top: 30vh;}
	}

	@-o-keyframes myfirst /* Opera */
	{
		0% {top: 100vh;}
		100% {top: 30vh;}
	}



	$z-index: 100;
	$cell-spacing: 20upx;
	$calendar-size: 630upx;
	$calendar-item-size: 100upx;

	.picker {
		position: fixed;
		z-index: $z-index;
		background: rgba(60, 60, 60, 0);
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		font-size: 28upx;

		&-header {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			padding: 40upx 30upx;
			box-sizing: border-box;
		}
		

		&-week-header {
			font-size: 16px;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			border-bottom: 2px solid rgb(244, 244, 244);
			padding: 10px 20px;
			color: rgb(136, 136, 136);
			font-size: 14px;
		}

		&-week-header>view:first-child {
			color: rgb(214, 142, 135);
		}

		&-week-header>view:last-child {
			color: rgb(214, 142, 135);
		}

		&-btn {
			padding: $cell-spacing*0.5 $cell-spacing;
			border-radius: 12upx;
			color: #666;

			&-active {
				background: rgba(0, 0, 0, .1);
			}
		}

		&-display {
			color: #666;

			&-text {
				color: #000;
				margin: 0 $cell-spacing*0.5;
			}

			&-link {
				display: inline-block;

				&-active {
					background: rgba(0, 0, 0, .1);
				}
			}
		}

		&-time {
			width: 100%; //$calendar-size - 80upx !important;
			left: ((750upx - $calendar-size) / 2 + 40upx) !important;
		}

		&-modal {
			background: #fff;
			box-sizing: border-box;
			position: fixed;
			bottom: 0;
			left: 0; //(750upx - $calendar-size) / 2;
			width: 100%; //$calendar-size;
			box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
			border-radius: 12upx;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			height: 70vh;
			animation: myfirst 0.5s;
			-moz-animation: myfirst 0.5s;	/* Firefox */
			-webkit-animation: myfirst 0.5s;	/* Safari 和 Chrome */
			-o-animation: myfirst 0.5s;	/* Opera */


			&-header {
				text-align: center;
				line-height: 80upx;
				font-size: 32upx;

				&-title {
					display: inline-block;
					width: 40%;
					color: rgb(77, 77, 77);
					font-size: 16px;
					width: 100%;
					height: 90upx;
					line-height: 90upx;
					text-align: center;
					border-bottom: 1px solid rgb(244, 244, 244);
				}

				.picker-icon {
					display: inline-block;
					line-height: 50upx;
					width: 50upx;
					height: 50upx;
					border-radius: 50upx;
					text-align: center;
					margin: 10upx;
					background: #fff;
					font-size: 36upx;

					&-active {
						background: rgba(0, 0, 0, .1);
					}
				}
			}

			&-body {
				width: 100%; //$calendar-size !important;
				position: relative;
				overflow: auto;
			}

			&-time {
				width: 100%;
				height: 180upx;
				text-align: center;
				line-height: 60upx;
			}

			&-footer {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: $cell-spacing;
				height: 130upx;
				width: 100%;
				box-sizing: border-box;
				border-top: 1px solid rgb(244, 244, 244);

				&-btnOK {
					width: calc(100% - 100upx);
					height: 100%;
					margin: 0 auto;
					border-radius: 6upx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 16px;
					color: #fff;
					border-radius: 64upx;
				}

				&-info {
					flex-grow: 1;
				}

				&-btn {
					flex-shrink: 0;
					display: flex;
				}
			}
		}

		&-calendar {
			width: 100%;
			height: calc(100% - 90upx);
			display: flex;
			align-items: center;
			justify-content: flex-start;
			flex-wrap: wrap;
			flex-direction: row;

			&-box {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-wrap: wrap;
			}
			&-view:nth-child(7n){
				width: 14.2%;
			}
			&-view {
				position: relative;
				width: 14.3%; //$calendar-item-size;
				height: $calendar-item-size;
				text-align: center;

				&-bgbegin,
				&-bg,
				&-bgend,
				&-item,
				&-dot,
				&-tips {
					position: absolute;
					transition: .2s;
				}

				&-bgbegin,
				&-bg,
				&-bgend {
					opacity: .15;
					height: 100%;
				}

				&-bg {
					left: 0;
					top: 0%;
					width: 100%;
				}

				&-bgbegin {
					border-radius: $calendar-item-size 0 0 $calendar-item-size;
					top: 0%;
					left: 0%;
					width: 100%;
				}

				&-bgend {
					border-radius: 0 $calendar-item-size $calendar-item-size 0;
					top: 0%;
					left: 0%;
					width: 100%;
				}

				&-item {
					left: 0%;
					top: 0%;
					width: 100%;
					height: 100%;
					border-radius: 5px;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				&-dot {
					right: 10%;
					top: 10%;
					width: 12upx;
					height: 12upx;
					border-radius: 12upx;
				}

				&-tips {
					bottom: 100%;
					left: 50%;
					transform: translateX(-50%);
					background: #4E4B46;
					color: #fff;
					border-radius: 12upx;
					padding: 10upx 20upx;
					font-size: 24upx;
					width: max-content;
					margin-bottom: 5px;
					pointer-events: none;
					z-index: 1000;

					&:after {
						content: "";
						position: absolute;
						top: 100%;
						left: 50%;
						transform: translateX(-50%);
						width: 0;
						height: 0;
						border-style: solid;
						border-width: 5px 5px 0 5px;
						border-color: #4E4B46 transparent transparent transparent;
					}
				}
			}
		}
	}
</style>
