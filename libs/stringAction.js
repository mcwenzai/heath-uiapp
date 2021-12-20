

class StringAction {
	/**
	 * 验证手机号格式
	 */
	verifyMobile(text) {
		return /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(19[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(text)
	}

	/**
	 * 验证密码格式
	 */
	verifyPassword(text) {
		return /^[a-z|A-Z|0-9]{6,16}$/.test(text)
	}

	/**
	 * 处理富文本图片自适应
	 * @param {string} content 富文本
	 */
	parseRichImgStyle (content) {
		if (typeof content === "string" && content !== "") {
			let newContent = content.replace(/<img[^>]*>/gi,(match,capture) => {
				match = match.replace(/style="[^"]+"/gi, "").replace(/style='[^']+'/gi, "");
				match = match.replace(/width="[^"]+"/gi, "").replace(/width='[^']+'/gi, "");
				match = match.replace(/height="[^"]+"/gi, "").replace(/height='[^']+'/gi, "");
				return match;
			});
			newContent = newContent.replace(/style="[^"]+"/gi,(match,capture) => {
				match = match.replace(/width:[^;]+;/gi, "max-width:100%;").replace(/width:[^;]+;/gi, "max-width:100%;");
				return match;
			});
			newContent = newContent.replace(/<br[^>]*\/>/gi, "");
			newContent = newContent.replace(/\<img/gi, "<img style=\"max-width:100%;height:auto;display:block;margin-top:0;margin-bottom:0;\"");
			return newContent;
		} else {
			return "";
		}
	}
}

export default StringAction;
