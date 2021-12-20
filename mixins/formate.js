const errArr = [null, undefined, "null", "undefined", ""];
export default {
	filters: {
		formateNumber(v) {
			if (v == undefined || v == null) return "--";
			if (errArr.indexOf(v) > -1) return 0;
			const num = +v;
			if (num < 10000) return num;
			const intNum = num % 10000,
				multiple = num / 10000;
			if (intNum === 0 && multiple < 9999) return multiple + "万";
			const floatNum = +(num / 10000).toFixed(1);
			if (floatNum < 10000) return floatNum + "万";
			return "9999.9万+";
		},
		formateDate(v) {
			if (errArr.indexOf(v) > -1) return "";
			const now = new Date(),
				date = new Date(v);
			const dif = now.getTime() - date.getTime(),
				h = 1000 * 60 * 60,
				d = h * 24;
			if (dif < h) return Math.round(dif / (1000 * 60)) + "分钟前";
			if (dif < d) return Math.round(dif / h) + "小时前";
			if (dif <= d * 3) return Math.round(dif / d) + "天前";
			const nowY = now.getFullYear(),
				dateY = date.getFullYear(),
				dateM = date.getMonth() + 1,
				dateD = date.getDate();
			if (nowY === dateY) return `${dateM}月${dateD}日`;
			return `${dateY}年${dateM}月${dateD}日`;
		},
		formateNoData(val) {
			return !val ? "" : val;
		},
		issueDate(val) {
			if (val) {
				var nowDate = new Date();
				var targetDateStr = val;
				var regEx = new RegExp(/-/g);
				targetDateStr = targetDateStr.replace(regEx, "/");
				var targetDate = new Date(Date.parse(targetDateStr));
				//时间差的毫秒数
				var milliseconds = nowDate.getTime() - targetDate.getTime();
				var seconds = Math.floor(milliseconds / 1000);

				if (seconds >= 0 && seconds < 3600) {
					let time = Math.floor(milliseconds / (60 * 1000));
					return time == 0 ? "1分钟前" : time + "分钟前";
				} else if (seconds >= 3600 && seconds < 86400) {
					return (
						Math.floor(milliseconds / (60 * 60 * 1000)) + "小时前"
					);
				} else if (seconds >= 86400 && seconds < 86400 * 7) {
					return (
						Math.floor(milliseconds / (24 * 60 * 60 * 1000)) +
						"天前"
					);
				} else if (seconds >= 86400 * 7 && seconds < 86400 * 7 * 4) {
					return (
						Math.floor(milliseconds / (7 * 24 * 60 * 60 * 1000)) +
						"周前"
					);
				} else {
					//时间转换
					const dt = new Date(val);
					const y = dt.getFullYear();
					const m = (dt.getMonth() + 1 + "").padStart(2, "0");
					const d = (dt.getDate() + "").padStart(2, "0");
					const hh = (dt.getHours() + "").padStart(2, "0");
					const mm = (dt.getMinutes() + "").padStart(2, "0");
					const ss = (dt.getSeconds() + "").padStart(2, "0");
					return `${y}-${m}-${d}`;
				}
			} else if (!val) {
				return "暂无";
			}
		},
		// 服务到期时间计算--社群列表页面
		serviceDate(val) {
			if (val) {
				var nowDate = new Date();
				var targetDateStr = val;
				var regEx = new RegExp(/-/g);
				targetDateStr = targetDateStr.replace(regEx, "/");
				var targetDate = new Date(Date.parse(targetDateStr));
				//时间差的毫秒数
				var milliseconds = targetDate.getTime() - nowDate.getTime();
				//计算出相差天数
				var days = Math.floor(milliseconds / (24 * 3600 * 1000));
				return days <= 0 ? "服务已到期" : "剩余" + days + "天服务期";
			} else if (!val) {
				return "长期有效";
			}
		},
		stateType(value) {
			switch (value) {
				case 0:
					return "待审核";
					break;
				case 1:
					return "审核通过";
					break;
				case 2:
					return "审核未通过";
					break;
				case 3:
					return "即将过期";
					break;
				case 4:
					return "已过期";
					break;
				case 5:
					return "正常";
					break;
				case 6:
					return "未上传";
					break;
			}
		},
		qualificationType(value) {
			switch (value) {
				case 0:
					return "待审核";
					break;
				case 1:
					return "正常";
					break;
				case 2:
					return "审核未通过";
					break;
				case 3:
					return "即将过期";
					break;
				case 4:
					return "已过期";
					break;
			}
		},
	},
};
