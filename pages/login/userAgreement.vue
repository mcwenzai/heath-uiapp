<template>
	<view class="container">
		<view class="header">
			{{title}}
		</view>
		<view class="content" v-html="content">
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				title:'',
				content:''
			}
		},
		onLoad(data) {
			if(data.type==0){
				this.title='关于我们'
				this.content = `

湖南诊禾医院管理有限公司始建于2016年，总部位于湖南长沙。 公司秉承“健康美好，人人享有”的经营理念， 致力于打造最优质、最亲民、最便捷的优质医疗服务平台。 公司聚焦基层百姓健康需求，关注基层诊所经营痛点， 以互联网科技为载体，以名优中医资源为依托， 围绕中医药生产、研发、学术、供应各环节建立起一条完整的健康产业链， 形成中医专家、基层诊所、患者三方互通的大健康生态平台。

公司旗下拥有诊禾医院、和瑞医药、添寿堂药业三家子公司。 诊禾医院旨在提供诊所互联网信息化整体解决方案，让诊所更优秀， 让专家更高效，让患者平等共享优质医疗。和瑞医药定位于打造国内一流的中医药运营平台， 为各类医疗机构提供安全、环保、高效的中药产品供应服务。 添寿堂药业专注于民间验方和院内制剂研发与推广， 把挖掘、整理和发扬民间中医药的传承人才、技术和秘方作为重要使命， 全心全意助推民间验方走向产业化。

目前，公司已被吸纳为中国中药协会中医馆事联合专业委员会副主任单位、 湖南省中医药和中西医结合学会理事单位、湖南省老年保健协会理事单位、 湖湘文化交流协会中医药与养生分会副会长单位、 北京华健中西医药临床诊疗科技创新联盟副主任单位， 在中医药服务各专业领域崭露头角，大放异彩。

时代巨变，未来已来。诊禾人将坚持践行用心行医、 唯善唯德的核心价值观，整合国内优质中医药服务资源， 在中医药生产、流通、研发、应用及医疗服务领域深耕细作， 为传承国医经典，守护国人健康贡献出自己的力量，让更多人平等共享优质医疗。`
			}else if(data.type==1){
				this.title='用户协议'
				this.content = `<p style="text-align: center;"><span style="color: rgb(53, 53, 53); font-size: 13pt;">&nbsp;</span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;"><font>禾大夫移动应用软件（</font><font>App</font><font>）是湖南诊禾医院管理有限责任公司（以下简称</font><font>“</font><font>诊禾</font><font>”</font><font>）的一款移动应用软件，为使用禾大夫的服务，您应当遵循《禾大夫用户服务协议》</font><font>(</font><font>以下简称</font><font>“</font><font>本协议</font><font>”)</font><font>。本协议是用户与禾大夫之间的法律协议，是用户注册禾大夫账号并使用平台服务或非经注册程序直接使用禾大夫平台服务时的通用条款。请您务必审慎阅读、充分立即本协议各条款内容，特别是免除或限制责任的条款、管辖与法律适用条款。限制、免责条款可能以黑体加粗或加下划线的形式提示您注意重点。如果您不同意本协议的约定，您应当立即停止注册程序或停止使用大夫平台服务；如果您继续访问或使用大夫平台服务，即视为您已确知并完全同意本协议各项服务约定。</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">&nbsp;</span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">&nbsp;1. <font>用户注册</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">1.1 <font>用户在完成注册流程或以其他禾大夫允许的方式实际使用服务时，应当具备中华人民共和国法律规定的与用户行为相适应的民事行为能力，如用户代表一家公司或其他法律主体在禾大夫注册，则用户声明和保证已获得完整的授权、有权使该公司或该法律主体受本协议的约束。采购服务仅供具备相关经营资质的单位用户使用，任何无证单位或个人用户盗用他人名义、资质或伪造授权进行药品采购均属于违法行为，如您不具备前述主体资格或相应的授权，应承担因此导致的一切后果，且禾大夫有权终止向您提供服务并注销您的账户并公告处理结果，对于涉嫌违反法律法规、涉嫌违法犯罪的行为，禾大夫有权保存有关记录，并依法向有关主管行政部门报告、配合有关行政主管部门调查，并可能依法移送司法机关。</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">1.2 <font>用户在此保证所填写的用户信息是真实、准确、完整、及时的，并且没有任何引人误解或者虚假的陈述，且保证禾大夫可以通过用户所填写的联系方式与用户取得联系。</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">1.3 <font>用户使用手机号为账户注册禾大夫，该帐号由用户负责保管，用户登录平台后的指令将视为用户所为，禾大夫任何时候均不会主动要求用户提供账户验证码；除禾大夫平台存在过错外，用户应对账户项下的所有行为结果（包括但不限于在线签署各类协议、发布信息、询</font><font>/</font><font>报价、采购产品、订购服务及披露信息等）负责。账户因用户主动泄露或因用户遭受他人攻击、诈骗等行为导致的损失及后果，我们并不承担责任，用户应通过司法、行政等救济途径向侵权行为人追偿。</font><font>&nbsp;</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">1.4 <font>用户若发现任何非法使用用户账号或存在安全漏洞的情况，请立即通告禾大夫。</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">&nbsp;</span></p><p style="margin-left: 0pt;"><span style="color: rgb(53, 53, 53); font-size: 13pt;">2.&nbsp;</span><span style="color: rgb(53, 53, 53); font-size: 13pt;"><font>商品交易与平台服务</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">2.1 <font>用户自愿接受本协议和网站相关规定，并按禾大夫规定申请，经禾大夫审核成为禾大夫采购用户后，方可在审核范围内的使用商品采购服务。</font><font>&nbsp;&nbsp;&nbsp;&nbsp;</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">2.2 <font>用户订购商品必须在线交易，禾大夫对于用户任何线下交易与线下协议不承担任何责任。请您特别注意，如在禾大夫网站上以页面标明或其他方式表明相关服务系由第三方提供，您在使用该服务过程中如有疑问或发生纠纷，请您与第三方协商解决。</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">2.3 <font>当您在禾大夫平台询价、采购药品时，请您务必仔细确认采购产品的品名、价格、数量、型号、规格、当量、起批量或服务的时间、内容、限制性要求等重要事项，并在采购下单时核实您的联系地址、电话、收货人等信息，在提交订单前，您有权修改上述信息或更正输入错误。作为具备合法资质的单位，您应对自身的药品采购行为负责，应当对您名下的采购人员进行药品相关的法律、法规和专业知识培训，并按规定索取、查验、留存供货企业有关证件、资料、票据。</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">2.4 <font>在已确认用户订单后如发生意外的情况，包括但不限于由于供应商提价，税额变化引起的价格变化，或是由于平台的错误等造成价格变化等情况，平台在及时通知用户后有权取消该订单。在平台取消该订单之前，用户亦有权决定是否取消订单。</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">&nbsp;</span></p><p style="margin-left: 0pt;"><span style="color: rgb(53, 53, 53); font-size: 13pt;">3.&nbsp;</span><span style="color: rgb(53, 53, 53); font-size: 13pt;"><font>用户的权利与义务</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">3.1 <font>作为禾大夫的用户，享受禾大夫提供的一站式响应服务。</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">3.2 <font>用户应保证其应具备的合法资质以及必须的授权，并提供相应证明材料，用户资料应符合国家相关法律和规定，并对其真实性、准确性、合法性负全部责任，用户应及时更新相应资质的最新版本；</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">3.3 <font>遵守禾大夫相关规则，认真履行采购商义务，按规定的时间、流程与协议、规则要求开展采购活动，并承担因用户原因造成的迟延交易的责任。</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">3.4 <font>用户在系统确认收货三日内提供有效货运证明时，禾大夫应协助用户索赔货物运输的损失；</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">3.5 <font>不得盗用他人资质或为他人提供资质证明文件，或者票据等便利条件。</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;"><font>如用户违反上述承诺，禾大夫有权立即终止所有服务及所有相关协议，并按国家法律法规和平台相关规则追索用户责任。</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">&nbsp;</span></p><p style="margin-left: 0pt;"><span style="color: rgb(53, 53, 53); font-size: 13pt;">4.&nbsp;</span><span style="color: rgb(53, 53, 53); font-size: 13pt;"><font>平台的权利与义务</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">4.1 <font>禾大夫应根据用户选择的服务以及交纳款项的情况向用户提供合格的网络技术和信息服务。</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">4.2 <font>禾大夫承诺对用户资料采取对外保密措施，不向第三方披露用户资料，不授权第三方使用用户资料，除非：</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">4.2.1 <font>依据本协议条款或者用户与禾大夫之间其他服务协议、合同、在线条款等规定可以提供；</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">4.2.2 <font>依据法律、法规的规定应当提供；</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">4.2.3 <font>行政、司法等有权部门要求禾大夫提供；</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">4.2.4 <font>用户同意禾大夫向第三方提供；</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">4.2.5 <font>禾大夫解决举报事件、提起诉讼而提交的；</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">4.2.6 <font>禾大夫为防止严重违法行为或涉嫌犯罪行为发生而采取必要合理行动所必须提交的；</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">4.2.7 <font>禾大夫为向用户提供产品、服务、信息而向第三方提供的，包括禾大夫通过第三方的技术及服务向用户提供产品、服务、信息的情况。</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">4.3 <font>禾大夫有权使用用户资料。</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">4.4 <font>禾大夫有权利对用户进行审查并决定是否接受用户进行某一交易。</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">4.5 <font>禾大夫保留在用户违反国家、地方法律、法规规定或违反本在线注册条款的情况下终止为用户提供服务并终止用户账号的权利，并且在任何情况下，禾大夫对任何间接、偶然、特殊及继起的损害不负责任。</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">&nbsp;</span></p><p style="margin-left: 0pt;"><span style="color: rgb(53, 53, 53); font-size: 13pt;">5.&nbsp;</span><span style="color: rgb(53, 53, 53); font-size: 13pt;"><font>违约责任</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">5.1 <font>双方承诺严格遵守国家有关法律法规及履行本协议，维护双方权益。</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">5.2 <font>您理解并同意，禾大夫依照法律规定履行保障基础义务并尽一切努力保障交易安全，但因下列情况导致用户无法使用平台服务或造成损失时，禾大夫不承担除法律有明确规定外的责任：</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">5.2.1 <font>平台系统维护或升级；</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">5.2.2 <font>平台所依赖的电信设备出现故障或由于战争、骚乱、恐怖主义、自然灾害、国家法律法规或规章变动、网络安全、网络无法覆盖、停电、通信线路被人为破坏等不可抗力因素；</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">5.2.3 <font>用户操作不当或通过非法的或非平台认可的方式使用平台服务；</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">5.2.4 <font>用户自身的设备、系统、硬件和通信电路、供电线路出现故障；</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">5.2.5<font>因病毒、木马、恶意程序攻击、网络拥堵、系统不稳定、系统或设备故障、通讯故障、银行原因、第三方服务瑕疵或政府行为等原因；</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">5.2.6 <font>其他不可归因于我们的原因。</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">5.2.7 <font>由于用户自备设备故障或用户失误造成的问题，用户自行承担责任，并赔偿供应方由此遭受的损失。</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">5.3<font>如用户不履行义务时，禾大夫可独立判断并视情况对用户采取警示、限制参加营销活动、中止向用户提供部分或全部服务等处理措施，如用户的行为构成根本违约的，禾大夫可关闭账户，终止本合同。并依法向有关行政主管部门报告、配合有关行政主管部门调查，并可能依法移送司法机关。</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">5.4 <font>无论本合同其他条款是否有相反约定，禾大夫对用户因本合同项下行为而导致的可得利益损失、商业信誉损失以及数据丢失或损坏等其他损失不承担责任。</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">5.5 <font>如合同不能或者没有必要继续履行的，禾大夫可单方面解除本合同，但应提前</font><font>5</font><font>日告知用户。</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">&nbsp;</span></p><p style="margin-left: 0pt;"><span style="color: rgb(53, 53, 53); font-size: 13pt;">6.&nbsp;</span><span style="color: rgb(53, 53, 53); font-size: 13pt;"><font>法律适用和争议解决</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">6.1 <font>本合同适用中华人民共和国大陆地区法律。如无相关法律规定的，则应参照商业惯例和（或）行业惯例。</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">6.2 <font>本合同引起的任何争议将通过双方友好协商解决，协商不成时，向禾大夫所在地有管辖权的人民法院提起诉讼。</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">6.3 <font>双方因部分条款产生争议的，不影响其他条款的效力，双方将继续履行本合同未涉诉讼的其它部分。</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">&nbsp;</span></p><p style="margin-left: 0pt;"><span style="color: rgb(53, 53, 53); font-size: 13pt;">7.&nbsp;</span><span style="color: rgb(53, 53, 53); font-size: 13pt;"><font>协议终止</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">7.1 <font>用户有权利向禾大夫提出账号注销申请，您可以通过联系客服注销您的账号。但用户账号被注销后，禾大夫仍保留下列权利：</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">7.1.1 <font>用户注销后，禾大夫有权保留该用户的注册数据及以前的交易行为记录；</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">7.1.2 <font>用户注销后，如用户在注销前在禾大夫交易平台上存在违法行为或违反合同的行为，禾大夫仍可行使本服务协议所规定的权利。</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">7.2 <font>在下列情况下，禾大夫可以通过注销用户的方式终止服务：</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">7.2.1 <font>在用户违反本服务协议相关规定时，禾大夫有权终止向该用户提供服务。禾大夫将在中断服务时通知用户。但如该用户在禾大夫终止提供服务后，再一次直接或间接或以他人名义注册为禾大夫用户的，禾大夫有权再次单方面终止向该用户提供服务；</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">7.2.2 <font>一经禾大夫发现用户注册数据中主要内容是虚假的，禾大夫有权随时终止向该用户提供服务；</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">7.2.3 <font>本服务协议终止或更新时，用户明示不愿接受新的服务协议的；</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">7.2.4 <font>其它禾大夫认为需终止服务的情形。</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">&nbsp;</span></p><p style="margin-left: 0pt;"><span style="color: rgb(53, 53, 53); font-size: 13pt;">8.&nbsp;</span><span style="color: rgb(53, 53, 53); font-size: 13pt;"><font>知识产权</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">8.1 <font>禾大夫平台上的图表、标识、网页页眉、按钮图标、文字、服务品名等标示在平台上的信息都是湖南诊禾医院管理有限责任公司的财产，受中国和国际知识产权法的保护。未经禾大夫许可，用户不得以任何可能引起消费者混淆的方式或任何贬低或诽谤湖南诊禾医院管理有限责任公司的方式用于与非禾大夫的任何产品或服务上。在禾大夫平台上出现的不属于上述主体的所有其他商标是其商标权利人各自的财产，这些权利人可能是也可能不是与湖南诊禾医院管理有限责任公司相关联、相联系或由湖南诊禾医院管理有限责任公司的关联公司赞助的。未经湖南诊禾医院管理有限责任公司或相关商标所有人的书面许可，禾大夫平台上的任何东西都不应被解释为以默许或其他方式授予许可或使用平台上出现的商标的权利。</font></span></p><p><span style="color: rgb(53, 53, 53); font-size: 13pt;">&nbsp;</span></p><p><span style="font-size: 10.5pt;">&nbsp;</span></p><p><br></p>`
			}else if(data.type==2){
				this.title='隐私政策'
				this.content = `<div class="WordSection1" style="layout-grid:15.6pt">

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><b><span style="font-size:20.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFontBold">隐私政策<span lang="EN-US"><o:p></o:p></span></span></b></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><b><span lang="EN-US" style="font-size:20.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFontBold"><o:p>&nbsp;</o:p></span></b></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont">版本更新日期：<span lang="EN-US">2021</span>年<span lang="EN-US">9</span>月<span lang="EN-US">23</span>日<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont">版本生效日期：<span lang="EN-US">2021</span>年<span lang="EN-US">9</span>月<span lang="EN-US">25</span>日<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont"><o:p>&nbsp;</o:p></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">欢迎您使用禾大夫！我们非常重视用户的隐私和个人信息保护，本隐私政策适用于湖南诊禾医院管理有限责任公司。您在使用我们的产品与<span lang="EN-US">/</span>或服务时，我们可能会收集和使用您的相关信息。我们希望通过《禾大夫隐私政策》（<span lang="EN-US">“</span>本隐私政策<span lang="EN-US">”</span>）向您说明我们在您使用我们的产品与<span lang="EN-US">/</span>或服务时如何收集、使用、保存、共享和转让这些信息，以及我们为您提供的访问、更新、删除和保护这些信息的方式。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">本隐私政策将帮助您了解以下内容：<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="margin-left:0cm;text-indent:0cm;mso-list:l0 level1 lfo1;
mso-layout-grid-align:none;text-autospace:none"><!--[if !supportLists]--><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
微软雅黑;color:#353535"><span style="mso-list:Ignore">1.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]--><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;
mso-bidi-font-family:AppleSystemUIFont;color:#353535">我们如何收 集和使用您的个人信息<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="margin-left:0cm;text-indent:0cm;mso-list:l0 level1 lfo1;
mso-layout-grid-align:none;text-autospace:none"><!--[if !supportLists]--><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
微软雅黑;color:#353535"><span style="mso-list:Ignore">2.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]--><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;
mso-bidi-font-family:AppleSystemUIFont;color:#353535">我们如何使用<span lang="EN-US">
Cookies </span>和同类技术<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="margin-left:0cm;text-indent:0cm;mso-list:l0 level1 lfo1;
mso-layout-grid-align:none;text-autospace:none"><!--[if !supportLists]--><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
微软雅黑;color:#353535"><span style="mso-list:Ignore">3.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]--><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;
mso-bidi-font-family:AppleSystemUIFont;color:#353535">我们如何共享、转让、公开披露您的个人信息<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="margin-left:0cm;text-indent:0cm;mso-list:l0 level1 lfo1;
mso-layout-grid-align:none;text-autospace:none"><!--[if !supportLists]--><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
微软雅黑;color:#353535"><span style="mso-list:Ignore">4.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]--><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;
mso-bidi-font-family:AppleSystemUIFont;color:#353535">我们如何保护和保存您的个人信息<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="margin-left:0cm;text-indent:0cm;mso-list:l0 level1 lfo1;
mso-layout-grid-align:none;text-autospace:none"><!--[if !supportLists]--><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
微软雅黑;color:#353535"><span style="mso-list:Ignore">5.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]--><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;
mso-bidi-font-family:AppleSystemUIFont;color:#353535">您如何管理个人信息<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="margin-left:0cm;text-indent:0cm;mso-list:l0 level1 lfo1;
mso-layout-grid-align:none;text-autospace:none"><!--[if !supportLists]--><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
微软雅黑;color:#353535"><span style="mso-list:Ignore">6.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]--><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;
mso-bidi-font-family:AppleSystemUIFont;color:#353535">通知和修订<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="margin-left:0cm;text-indent:0cm;mso-list:l0 level1 lfo1;
mso-layout-grid-align:none;text-autospace:none"><!--[if !supportLists]--><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
微软雅黑;color:#353535"><span style="mso-list:Ignore">7.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]--><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;
mso-bidi-font-family:AppleSystemUIFont;color:#353535">如何联系我们<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535"><o:p>&nbsp;</o:p></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">本隐私政策与您所使用的禾大夫服务以及该服务所包括的各种业务功能（以下统称<span lang="EN-US">“</span>我们的产品与<span lang="EN-US">/</span>或服务<span lang="EN-US">”</span>）息息相关，希望您在使用我们的产品与<span lang="EN-US">/</span>或服务前仔细阅读并确认您已经充分理解本隐私政策所写明的内容，并让您可以按照本隐私政策的指引做出您认为适当的选择。本隐私政策中涉及的相关术语，我们尽量以简明扼要的表述，并提供进一步说明的链接，以便您更好地理解。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">请您特别注意：本隐私政策适用于禾大夫提供的产品或服务。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535"><o:p>&nbsp;</o:p></span></p>

<p class="MsoNormal" style="margin-left:0cm;text-indent:0cm;mso-list:l1 level1 lfo2;
mso-layout-grid-align:none;text-autospace:none"><!--[if !supportLists]--><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
微软雅黑;color:#353535"><span style="mso-list:Ignore">1.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]--><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;
mso-bidi-font-family:AppleSystemUIFont;color:#353535">我们如何收集和使用您的个人信息<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">个人信息是以电子或者其他方式记录的与已识别或者可识别的自然人有关的各种信息，不包括匿名化处理后的信息。敏感个人信息是一旦泄露或者非法使用，容易导致自然人的人格尊严受到侵害或者人身、财产安全受到危害的个人信息，包括生物识别、宗教信仰、特定身份、医疗健康、金融账户、行踪轨迹等信息，以及不满十四周岁未成年人的个人信息。（我们将在本政策中对涉及到的敏感个人信息以粗体进行显著标识）。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">我们会遵循正当、合法、必要的原则，出于本政策所述的以下目的，收集和使用您在使用产品与<span lang="EN-US">/</span>或服务过程中主动提供或因使用产品与<span lang="EN-US">/</span>或服务而产生的个人信息，以及从第三方获取您的相关个人信息。如果我们要将您的个人信息用于本政策未载明的其它用途，或将基于特定目的收集而来的信息用于其他目的，我们将以合理的方式向您告知，并在使用前再次征得您的同意。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">1.1 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">您须授权我们收集和使用您个人信息的情形<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">我们的产品与<span lang="EN-US">/</span>或服务包括一些核心功能，这些功能包含了实现网上购物所必须的功能及保障交易安全所必须的功能。我们可能会收集、保存和使用下列与您有关的信息才能实现上述这些功能。如果您不提供相关信息，您将无法享受我们提供的产品与<span lang="EN-US">/</span>或服务。这些功能包括：<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">1.2.1 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">实现网上购物所必须的功能<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">1.2.1.1<span style="mso-spacerun:yes">&nbsp;
</span></span><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;
mso-bidi-font-family:AppleSystemUIFont;color:#353535">账户注册、登录与验证<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">当您注册禾大夫账户时，您至少需要向我们提供您准备使用的手机号码，我们将通过发送短信验证码的方式来验证您的身份是否有效，通过<span lang="EN-US">SIM</span>卡信息识别并显示对应的运营商。您的账户名为您的默认昵称，您可以修改和补充您的昵称、手机号等信息，这些信息均属于您的<span lang="EN-US">“</span>账户信息<span lang="EN-US">”</span>。您补充的账户信息将有助于我们为您提供个性化的商品推荐和更优的购物体验，但如果您不提供这些补充信息，不会影响您使用网上购物的基本功能。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">当您成功注册禾大夫账号后，可以使用禾大夫账号登录<span lang="EN-US">“</span>禾大夫<span lang="EN-US">App”</span>，登录时您需要向我们提供您的禾大夫账号信息。若您不提供这类信息，您将无法登录在<span lang="EN-US">“</span>禾大夫<span lang="EN-US">App”</span>。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">1.2.1.2 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">商品<span lang="EN-US">/</span>服务信息展示和搜索<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">为向您展示更契合您需求的商品货服务信息，我们可能会收集您使用我们的产品与<span lang="EN-US">/</span>或服务的设备信息（包括设备名称、设备型号、<span lang="EN-US">MAC</span>地址及<span lang="EN-US">IMEI</span>、设备识别码、硬件序列号特征信息）、通过第三方<span lang="EN-US">SDK</span>收集的设备所在位置相关信息<sup><span lang="EN-US">1</span></sup>（包括您授权的<span lang="EN-US">GPS</span>位置信息以及<span lang="EN-US">WLAN</span>接入点）、浏览器类型来为您展示该地区下的商品、提取您的偏好特征，向您推送您可能感兴趣的信息。这些信息需要您授权之后才可以获取（设备信息除外），我们仅会在您使用<span lang="EN-US">App</span>时进行相关信息的收集。我们也会为了不断改进和优化上述的功能来使用您的上述个人信息。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535"><o:p>&nbsp;</o:p></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">您也可以通过搜索来精准地找到您所需要的商品或服务。我们会保留您的搜索内容以方便您重复输入或为您展示与您搜索内容相关联的商品或服务。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">请您注意，单独的设备信息、浏览器类型或仅搜索关键词信息无法单独识别您的身份，不属于您的个人信息，我们有权以任何的目的对其进行使用；只有当您的单独的设备信息、浏览器类型或搜索关键词信息与您的其他信息相互结合使用并可以识别您的身份时，则在结合使用期间，我们会将您的设备信息、浏览器类型或搜索关键词信息作为您的个人信息，按照本隐私政策对其进行处理与保护。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">为了将您感兴趣的商品或服务信息展示给您，或在您搜索时向您展示您可能希望找到的商品，我们可能会收集您的订单信息、浏览信息进行数据分析以形成用户画像。我们还可能为了提供服务及改进服务质量的合理需要而获得的您的其他信息，包括您与客服联系时您提供的相关信息，您参与问卷调查时向我们发送的问卷答复信息，以及您与我们的关联方、我们合作伙伴之间互动时我们获得的相关信息。对于从您的各种设备上收集到的信息，我们可能会将它们进行关联，以便我们能在这些设备上为您提供一致的服务。我们可能会将来自某项服务的信息与来自其他服务的信息结合起来，以便为您提供服务、个性化内容和建议。如果您不希望受个性化内容的影响，您可以在商品展示页选择按照分类进行浏览和查找商品和服务；我们还在搜索结果中向您提供了按照价格、销量排序等不针对个人特征的选项；未经您的明确同意，我们不会将您的相关个人信息提供给第三方。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">1.2.1.3 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">下单及订单管理<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">当您准备对您购物车内的商品进行结算时，禾大夫会生成您购买该商品的订单。您需要在订单中至少填写您的收货人姓名、收货地址以及手机号码，同时该订单中会载明订单号、您所购买的商品或服务信息、下单时间、您应支付的货款金额及支付方式；您可以另外填写收货人的联系电话、邮箱地址信息以增加更多的联系方式确保商品可以准确送达，但不填写这些信息不影响您订单的生成。若您需要开具发票，还需要提供发票抬头、纳税人识别号。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">上述所有信息构成您的<span lang="EN-US">“</span>订单信息<span lang="EN-US">”</span>，我们将使用您的订单信息来（包括与为您提供上述服务的第三方）进行您的身份核验、确定交易、支付结算、完成配送、为您查询订单以及提供客服咨询与售后服务。我们还会使用您的订单信息来判断您的交易是否存在异常以保护您的交易安全。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">1.2.1.4 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">支付功能<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">在您下单后，您可以选择禾大夫的关联方或与禾大夫合作的第三方支付机构（包括微信支付、支付宝支付等支付通道，以下称<span lang="EN-US">“</span>支付机构<span lang="EN-US">”</span>）所提供的支付服务。支付功能本身并不收集您的个人信息。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">1.2.2 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">交付产品与<span lang="EN-US">/</span>或服务功能<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">在当您下单并选择货到付款或在线完成支付，或选择获取试用品、奖品后，禾大夫、禾大夫的关联方、供应商、与禾大夫合作的商家或第三方配送公司（以下称<span lang="EN-US">“</span>配送公司<span lang="EN-US">”</span>）将为您完成订单的交付。您知晓并同意，禾大夫、禾大夫的关联方、供应商、与禾大夫合作的商家或配送公司会在上述环节内使用您的订单信息以保证您的订购的商品能够安全送达。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">我们的配送员在为您提供配送服务的同时，基于某些业务法律要求实名认证的需求，会协助您完成实名认证。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">1.2.2.1 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">保障交易安全所必须的功能<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">为保障您使用我们的产品与<span lang="EN-US">/</span>或服务时系统的稳定性和安全性，防止您的个人信息被非法获取，更准确地预防欺诈和保护账号安全，我们需要收集您的设备信息（设备型号、设备<span lang="EN-US">Mac</span>地址、应用进程列表、设备识别码、操作系统及软件版本、设备状态、网络状况）、历史上网记录、日志信息、<span lang="EN-US">IP</span>地址、位置信息、浏览信息、订单信息、<span class="SpellE"><span lang="EN-US">ssid</span></span>、<span class="SpellE"><span lang="EN-US">wifi</span></span>信息、<span lang="EN-US">IMSI</span>、<span lang="EN-US"> SIM</span>卡信息、电池使用情况来识别是否为真实自然人用户、是否为异常地点登录、判断您的账号风险，并可能会记录一些我们认为有风险的链接（<span lang="EN-US">“URL”</span>）；我们也会收集您的设备信息用于对禾大夫问题进行分析、统计流量并排查可能存在的风险，在您选择向我们发送异常信息时予以排查。如果您不提供上述信息，我们则无法在您使用禾大夫服务过程中对您的服务及账号安全进行保护。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535"><o:p>&nbsp;</o:p></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">1.3 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">您可自主选择提供的个人信息的情形<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">1.3.1 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">为使您购物更便捷、提升您在禾大夫的网上购物体验，我们的以下扩展功能中可能会收集和使用您的个人信息。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">1.3.1.1 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">基于位置信息的个性化推荐功能：我们会收集您的位置信息（我们仅收集您当时所处的地理位置，但不会将您各时段的位置信息进行结合以判断您的行踪轨迹）来判断您所处的地点，自动为您推荐您所在区域可以购买的产品与<span lang="EN-US">/</span>或服务，例如向您推荐离您最近的可选酒店，向您展示可选择的快速配送服务。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">1.3.1.2 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">基于摄像头（相机）的扩展功能：您可以使用这项扩展功能完成视频拍摄、拍照、扫码以及人脸识别登录的功能。当您使用人脸识别登录时我们会收集您的面部信息，且在您授权范围内限制使用。未来我们可能会将人脸识别技术应用于更多场景，届时我们会再次与您确认您是否愿意我们使用您的面部信息来实现这些扩展功能。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">1.3.1.3 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">基于图片<span lang="EN-US">/</span>视频上传的扩展功能：您可以在禾大夫上传您的照片<span lang="EN-US">/</span>视频来实现拍照购物功能和晒单、评价及问答功能，我们会使用您所上传的图片或视频来识别您需要购买的产品与<span lang="EN-US">/</span>或服务，或者使用包含您所上传图片或视频的晒单、评价及问答内容。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">1.3.1.4 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">基于剪切板的扩展功能：当您复制商品信息、标题、短信验证码，分享或接收被分享信息时，您的剪切板功能可能会被调用。剪切板信息仅会在您的设备上进行处理，我们不会存储您的剪切板信息用于任何其他途径。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">1.3.2</span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">上述扩展功能可能需要您在您的设备中向我们开启您的地理位置（位置信息）、相机（摄像头）、相册（图片库）、外部存储，以实现这些功能所涉及的信息的收集和使用。您可以在禾大夫<span lang="EN-US">APP</span>或设备系统中逐项查看您上述权限的开启状态，并可以决定将这些权限随时的开启或关闭（我们会指引您在您的设备系统中完成设置）。请您注意，您开启这些权限即代表您授权我们可以收集和使用这些个人信息来实现上述的功能，您关闭权限即代表您取消了这些授权，则我们将不再继续收集和使用您的这些个人信息，也无法为您提供上述与这些授权所对应的功能。您关闭权限的决定不会影响此前基于您的授权所进行的个人信息的处理。除此以外，我们在相关业务功能中可能还需要您开启设备的其他访问权限，详细权限和使用目的如下：<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">1.3.2.1 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">访问网络权限：实现应用程序联网<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">1.3.2.2 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">获取网络状态权限：监控网络变化，提示用户当前网络环境<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">1.3.2.3 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">支持后台访问位置权限：获取当前定位<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">1.3.2.4 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">读写系统设置权限：允许应用读写系统设置项<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">1.4 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">您充分知晓，以下情形中，我们收集、使用个人信息无需征得您的授权同意：<span lang="EN-US">&nbsp;<o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">1.4.1 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">与国家安全、国防安全有关的；<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">1.4.2 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">与公共安全、公共卫生、重大公共利益有关的；<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">1.4.3 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">与犯罪侦查、起诉、审判和判决执行等有关的；<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">1.4.4 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">出于维护个人信息主体或其他个人的生命、财产等重大合法权益但又很难得到本人同意的；<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">1.4.5 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">所收集的个人信息是个人信息主体或监护人自行向社会公众公开的；<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">1.4.6 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">从合法公开披露的信息中收集的您的个人信息的，如合法的新闻报道、政府信息公开等渠道；<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">1.4.7 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">根据您的要求签订合同所必需的；<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">1.4.8 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">用于维护所提供的产品与<span lang="EN-US">/</span>或服务的安全稳定运行所必需的，例如发现、处置产品与<span lang="EN-US">/</span>或服务的故障；<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">1.4.9 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">为合法的新闻报道所必需的；<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">1.4.10 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">学术研究机构基于公共利益开展统计或学术研究所必要，且对外提供学术研究或描述的结果时，对结果中所包含的个人信息进行去标识化处理的；<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">1.4.11 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">法律法规规定的其他情形。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">1.5 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">我们从第三方获得您个人信息的情形<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">我们可能从第三方获取您授权共享的账户信息（头像、昵称及授权页面提示的其他信息），并在您同意本隐私政策后将您的第三方账户与您的禾大夫账户绑定，使您可以通过第三方账户直接登录并使用我们的产品与<span lang="EN-US">/</span>或服务。我们会将依据与第三方的约定、对个人信息来源的合法性进行确认后，在符合相关法律和法规规定的前提下，使用您的这些个人信息。您也可以使用本机号码来快捷登录，我们会将您的网络信息提供给运营商完成注册或登录。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">1.5.1 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">您个人信息使用的规则<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">1.5.1.1 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">我们会根据本隐私政策的约定并为实现我们的产品与<span lang="EN-US">/</span>或服务功能对所收集的个人信息进行使用。</span><span style="font-size:13.0pt;font-family:&quot;MS Gothic&quot;;mso-bidi-font-family:&quot;MS Gothic&quot;;
color:#353535"> </span><span lang="EN-US" style="font-size:13.0pt;font-family:
&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:&quot;MS Gothic&quot;;color:#353535"><o:p></o:p></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">1.5.1.2 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">在收集您的个人信息后，我们将通过技术手段对数据进行去标识化处理，去标识化处理的信息将无法识别主体。请您了解并同意，在此情况下我们有权使用已经去标识化的信息；并在不透露您个人信息的前提下，我们有权对用户数据库进行分析并予以商业化的利用。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;MS Gothic&quot;;mso-bidi-font-family:&quot;MS Gothic&quot;;
color:#353535"> </span><span lang="EN-US" style="font-size:13.0pt;font-family:
&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;color:#353535">1.5.1.3
</span><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">请您了解并同意，您在使用我们的产品与<span lang="EN-US">/</span>或服务时所提供的所有个人信息，除非您删除或通过系统设置拒绝我们收集，否则将在您使用我们的产品与<span lang="EN-US">/</span>或服务期间持续授权我们使用。在您注销账号时，我们将停止使用并删除您的个人信息。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;MS Gothic&quot;;mso-bidi-font-family:&quot;MS Gothic&quot;;
color:#353535"> </span><span lang="EN-US" style="font-size:13.0pt;font-family:
&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;color:#353535">1.5.1.4
</span><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">我们会对我们的产品与<span lang="EN-US">/</span>或服务使用情况进行统计，并可能会与公众或第三方共享这些统计信息，以展示我们的产品与<span lang="EN-US">/</span>或服务的整体使用趋势。但这些统计信息不包含您的任何身份识别信息。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;MS Gothic&quot;;mso-bidi-font-family:&quot;MS Gothic&quot;;
color:#353535"> </span><span lang="EN-US" style="font-size:13.0pt;font-family:
&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;color:#353535">1.5.2 </span><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">当我们展示您的个人信息时，我们会采用包括内容替换、匿名处理方式对您的信息进行脱敏，以保护您的信息安全。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;MS Gothic&quot;;mso-bidi-font-family:&quot;MS Gothic&quot;;
color:#353535"> </span><span lang="EN-US" style="font-size:13.0pt;font-family:
&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;color:#353535">1.5.2.1
</span><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">当我们要将您的个人信息用于本隐私政策未载明的其它用途时，或基于特定目的收集而来的信息用于其他目的时，会实现征求您的明示同意。请您理解，我们向您提供的产品与<span lang="EN-US">/</span>或服务将不断更新变化。如果您选择使用本隐私政策中尚未列明的其他产品与<span lang="EN-US">/</span>或服务时，我们会在收集您的个人信息前通过协议、页面提示等方式向您详细说明信息收集的目的、方式、范围并征求您的同意。若您不同意提供前述信息，您可能无法使用该项产品与<span lang="EN-US">/</span>或服务，但不影响您使用现有产品与<span lang="EN-US">/</span>或服务。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535"><o:p>&nbsp;</o:p></span></p>

<p class="MsoNormal" style="margin-left:0cm;text-indent:0cm;mso-list:l2 level1 lfo3;
mso-layout-grid-align:none;text-autospace:none"><!--[if !supportLists]--><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
微软雅黑;color:#353535"><span style="mso-list:Ignore">2.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]--><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;
mso-bidi-font-family:AppleSystemUIFont;color:#353535">我们如何使用<span lang="EN-US">Cookies</span>和同类技术<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">2.1 Cookies</span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">的使用<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">2.1.1 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">为实现您联机体验的个性化需求，使您获得更轻松的访问体验。我们会在您的计算机或移动设备上发送一个或多个名为<span lang="EN-US">Cookies</span>的小数据文件，指定给您的<span lang="EN-US">Cookies </span>是唯一的，它只能被将<span lang="EN-US">Cookies</span>发布给您的域中的<span lang="EN-US">Web</span>服务器读取。我们向您发送<span lang="EN-US">Cookies</span>是为了简化您重复登录的步骤、存储您的购物偏好或您购物车中的商品等数据进而为您提供购物的偏好设置、帮助您优化对广告的选择与互动、帮助判断您的登录状态以及账户或数据安全。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">2.1.2 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">我们不会将<span lang="EN-US"> Cookies </span>用于本隐私政策所述目的之外的任何用途。您可根据自己的偏好管理或删除<span lang="EN-US">Cookies</span>。您可以清除计算机上保存的所有<span lang="EN-US"> Cookies</span>，大部分网络浏览器会自动接受<span lang="EN-US">Cookies</span>，但您通常可根据自己的需要来修改浏览器的设置以拒绝<span lang="EN-US"> Cookies</span>；另外，您也可以清除软件内保存的所有<span lang="EN-US">Cookies</span>。但如果您这么做，您可能需要在每一次访问禾大夫网站时亲自更改用户设置，而且您之前所记录的相应信息也均会被删除，并且可能会对您所使用服务的安全性有一定影响。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">2.2 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">网络<span lang="EN-US">Beacon</span>和同类技术的使用<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">除<span lang="EN-US">Cookies </span>外，我们还会在网站上使用网络<span lang="EN-US">Beacon</span>等其他同类技术。我们的网页上常会包含一些电子图像（称为<span lang="EN-US">"</span>单像素<span lang="EN-US">" GIF </span>文件或<span lang="EN-US"> "</span>网络<span lang="EN-US"> Beacon"</span>）。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">我们使用网络<span lang="EN-US">Beacon</span>的方式有：<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">2.2.1 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">通过在禾大夫网站上使用网络<span lang="EN-US">Beacon</span>，计算用户访问数量，并通过访问<span lang="EN-US"> Cookies </span>辨认注册的禾大夫用户。</span><span style="font-size:13.0pt;
font-family:&quot;MS Gothic&quot;;mso-bidi-font-family:&quot;MS Gothic&quot;;color:#353535"> </span><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
&quot;MS Gothic&quot;;color:#353535"><o:p></o:p></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">2.2.2 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">通过得到的<span lang="EN-US">Cookies</span>信息，为您提供个性化服务。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535"><o:p>&nbsp;</o:p></span></p>

<p class="MsoNormal" style="margin-left:0cm;text-indent:0cm;mso-list:l3 level1 lfo4;
mso-layout-grid-align:none;text-autospace:none"><!--[if !supportLists]--><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
微软雅黑;color:#353535"><span style="mso-list:Ignore">3.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]--><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;
mso-bidi-font-family:AppleSystemUIFont;color:#353535">我们如何共享、转让、公开披露您的个人信息<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">3.1 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">共享<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">3.1.1</span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">我们不会与禾大夫以外的任何公司、组织和个人共享您的个人信息，但以下情况除外：<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">3.1.1.1 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">事先获得您明确的同意或授权；</span><span style="font-size:13.0pt;font-family:
&quot;MS Gothic&quot;;mso-bidi-font-family:&quot;MS Gothic&quot;;color:#353535"> </span><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">根据适用的法律法规、法律程序的要求、强制性的行政或司法要求所必须的情况下进行提供；<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">3.1.1.2</span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">在法律法规允许的范围内，为维护禾大夫、禾大夫的关联方或合作伙伴、您或其他禾大夫用户或社会公众利益、财产或安全免遭损害而有必要提供；</span><span style="font-size:13.0pt;font-family:&quot;MS Gothic&quot;;mso-bidi-font-family:&quot;MS Gothic&quot;;
color:#353535"> </span><span lang="EN-US" style="font-size:13.0pt;font-family:
&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;color:#353535">3.1.1.3
</span><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">只有共享您的个人信息，才能实现我们的产品与<span lang="EN-US">/</span>或服务的核心功能或提供您需要的服务；</span><span style="font-size:13.0pt;font-family:&quot;MS Gothic&quot;;mso-bidi-font-family:&quot;MS Gothic&quot;;
color:#353535"> </span><span lang="EN-US" style="font-size:13.0pt;font-family:
&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;color:#353535">3.1.1.4</span><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">应您需求为您处理您与他人的纠纷或争议；</span><span style="font-size:13.0pt;font-family:&quot;MS Gothic&quot;;mso-bidi-font-family:&quot;MS Gothic&quot;;
color:#353535"> </span><span lang="EN-US" style="font-size:13.0pt;font-family:
&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;color:#353535">3.1.1.5
</span><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">符合与您签署的相关协议（包括在线签署的电子协议以及相应的平台规则）或其他的法律文件约定所提供；</span><span style="font-size:13.0pt;font-family:&quot;MS Gothic&quot;;mso-bidi-font-family:&quot;MS Gothic&quot;;
color:#353535"> </span><span lang="EN-US" style="font-size:13.0pt;font-family:
&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;color:#353535">3.1.1.6</span><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">基于学术研究而使用；</span><span style="font-size:13.0pt;
font-family:&quot;MS Gothic&quot;;mso-bidi-font-family:&quot;MS Gothic&quot;;color:#353535"> </span><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">3.1.1.7 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">基于符合法律法规的社会公共利益而使用。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">3.2 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">为实现基于禾大夫账户向您提供相关产品或服务，向您展示可能感兴趣的内容，保护您的账户与交易安全，我们可能会将您的个人信息与我们的关联方共享。我们将会根据本隐私政策的约定与我们的关联方共享您的个人信息，但我们只会共享必要的个人信息，且受本隐私政策中所声明目的的约束。我们的关联方如要改变个人信息的处理目的，将再次征求您的授权同意。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">3.3</span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">我们可能会向合作伙伴等第三方共享您的订单信息、账户信息、设备信息以及位置信息，以保障为您提供的服务顺利完成。但我们仅会出于合法、正当、必要、特定、明确的目的共享您的个人信息，并且只会共享提供服务所必要的个人信息。我们的合作伙伴无权将共享的个人信息用于任何其他用途。我们的合作伙伴包括以下类型：<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">3.3.1</span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">商品或专业技术服务的供应商。我们可能会将您的个人信息共享给支持我们功能的第三方。这些支持包括为我们的供货或提供基础设施技术服务、物流配送服务、支付服务、数据处理等。我们共享这些信息的目的是可以实现我们产品与<span lang="EN-US">/</span>或服务的核心购物功能，比如我们必须与物流服务提供商共享您的订单信息才能安排送货；当您下单的商品或服务由供应商直接发货或提供服务时，我们需要将您订单中的订购信息和收货信息共享给供应商，以指示其交付商品或提供服务。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">3.3.2 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">第三方商家。我们必须将您的订单信息与交易有关的必要信息与第三方商家共享来实现您向其购买商品或服务的需求，并促使其可以完成后续的售后服务。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">3.3.3 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">委托我们进行推广的合作伙伴。有时我们会代表其他企业向使用我们产品与<span lang="EN-US">/</span>或服务的用户群提供促销推广的服务。我们可能会使用您的个人信息以及您的非个人信息集合形成的间接用户画像与委托我们进行推广的合作伙伴（<span lang="EN-US">“</span>委托方<span lang="EN-US">”</span>）共享，但我们仅会向这些委托方提供推广的覆盖面和有效性的信息，而不会提供您的个人身份信息，或者我们将这些信息进行汇总，以便它不会识别您个人。比如我们可以告知该委托方有多少人看了他们的推广信息或在看到这些信息后购买了委托方的商品，或者向他们提供不能识别个人身份的统计信息，帮助他们了解其受众或顾客。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">3.3.4 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">对我们与之共享个人信息的公司、组织和个人，我们会与其签署严格的保密协定，要求他们按照我们的说明、本隐私政策以及其他任何相关的保密和安全措施来处理个人信息。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">3.3.5 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">为了遵守法律、执行或适用我们的使用条件和其他协议，或者为了保护禾大夫、您或其他禾大夫用户的权利及其财产或安全，比如为防止欺诈等违法活动和减少信用风险，而与其他公司和组织交换信息。不过<span lang="EN-US">,</span>这并不包括违反本隐私政策中所作的承诺而为获利目的出售、出租、共享或以其它方式披露的个人信息。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">3.4 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">转让<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">我们不会将您的个人信息转让给任何公司、组织和个人，但以下情况除外：</span><span style="font-size:13.0pt;font-family:&quot;MS Gothic&quot;;mso-bidi-font-family:&quot;MS Gothic&quot;;
color:#353535"> </span><span lang="EN-US" style="font-size:13.0pt;font-family:
&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:&quot;MS Gothic&quot;;color:#353535"><o:p></o:p></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">3.4.1 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">事先获得您明确的同意或授权；</span><span style="font-size:13.0pt;font-family:
&quot;MS Gothic&quot;;mso-bidi-font-family:&quot;MS Gothic&quot;;color:#353535"> </span><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
&quot;MS Gothic&quot;;color:#353535"><o:p></o:p></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">3.4.2 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">根据适用的法律法规、法律程序的要求、强制性的行政或司法要求所必须的情况进行提供；</span><span style="font-size:13.0pt;font-family:&quot;MS Gothic&quot;;mso-bidi-font-family:&quot;MS Gothic&quot;;
color:#353535"> </span><span lang="EN-US" style="font-size:13.0pt;font-family:
&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:&quot;MS Gothic&quot;;color:#353535"><o:p></o:p></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">3.4.3 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">符合与您签署的相关协议（包括在线签署的电子协议以及相应的平台规则）或其他的法律文件约定所提供；</span><span style="font-size:13.0pt;font-family:&quot;MS Gothic&quot;;mso-bidi-font-family:&quot;MS Gothic&quot;;
color:#353535"> </span><span lang="EN-US" style="font-size:13.0pt;font-family:
&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:&quot;MS Gothic&quot;;color:#353535"><o:p></o:p></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">3.4.4 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">在涉及合并、收购、资产转让或类似的交易时，如涉及到个人信息转让，我们会要求新的持有您个人信息的公司、组织继续受本隐私政策的约束，否则<span lang="EN-US">,</span>我们将要求该公司、组织重新向您征求授权同意。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535"><o:p>&nbsp;</o:p></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">3.5 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">公开披露<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">我们仅会在以下情况下，且采取符合业界标准的安全防护措施的前提下，才会公开披露您的个人信息：</span><span style="font-size:13.0pt;font-family:&quot;MS Gothic&quot;;mso-bidi-font-family:&quot;MS Gothic&quot;;
color:#353535"> </span><span lang="EN-US" style="font-size:13.0pt;font-family:
&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;color:#353535">3.5.1 </span><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">根据您的需求，在您明确同意的披露方式下披露您所指定的个人信息；</span><span style="font-size:13.0pt;font-family:&quot;MS Gothic&quot;;mso-bidi-font-family:&quot;MS Gothic&quot;;
color:#353535"> </span><span lang="EN-US" style="font-size:13.0pt;font-family:
&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;color:#353535">3.5.2 </span><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">根据法律、法规的要求、强制性的行政执法或司法要求所必须提供您个人信息的情况下，我们可能会依据所要求的个人信息类型和披露方式公开披露您的个人信息。在符合法律法规的前提下，当我们收到上述披露信息的请求时，我们会要求必须出具与之相应的法律文件，如传票或调查函。我们坚信，对于要求我们提供的信息，应该在法律允许的范围内尽可能保持透明。我们对所有的请求都进行了慎重的审查，以确保其具备合法依据，且仅限于执法部门因特定调查目的且有合法权利获取的数据。在法律法规许可的前提下，我们披露的文件均在加密密钥的保护之下。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535"><o:p>&nbsp;</o:p></span></p>

<p class="MsoNormal" style="margin-left:0cm;text-indent:0cm;mso-list:l4 level1 lfo5;
mso-layout-grid-align:none;text-autospace:none"><!--[if !supportLists]--><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
微软雅黑;color:#353535"><span style="mso-list:Ignore">4.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]--><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;
mso-bidi-font-family:AppleSystemUIFont;color:#353535">我们如何保护和保存您的个人信息<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">4.1</span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">我们保护您个人信息的技术与措施<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">我们非常重视个人信息安全，并采取一切合理可行的措施，保护您的个人信息：</span><span style="font-size:13.0pt;font-family:&quot;MS Gothic&quot;;mso-bidi-font-family:&quot;MS Gothic&quot;;
color:#353535"> </span><span lang="EN-US" style="font-size:13.0pt;font-family:
&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;color:#353535">4.1.1 </span><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">数据安全技术措施</span><span style="font-size:13.0pt;
font-family:&quot;MS Gothic&quot;;mso-bidi-font-family:&quot;MS Gothic&quot;;color:#353535"> </span><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">我们会采用符合业界标准的安全防护措施，包括建立合理的制度规范、安全技术来防止您的个人信息遭到未经授权的访问使用、修改<span lang="EN-US">,</span>避免数据的损坏或丢失。</span><span style="font-size:13.0pt;font-family:
&quot;MS Gothic&quot;;mso-bidi-font-family:&quot;MS Gothic&quot;;color:#353535"> </span><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">禾大夫的网络服务采取了传输层安全协议等加密技术，通过<span lang="EN-US">https</span>等方式提供浏览服务，确保用户数据在传输过程中的安全。</span><span style="font-size:13.0pt;font-family:&quot;MS Gothic&quot;;mso-bidi-font-family:&quot;MS Gothic&quot;;
color:#353535"> </span><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;
mso-bidi-font-family:AppleSystemUIFont;color:#353535">禾大夫采取加密技术对用户个人信息进行加密保存，并通过隔离技术进行隔离。</span><span style="font-size:13.0pt;font-family:&quot;MS Gothic&quot;;mso-bidi-font-family:&quot;MS Gothic&quot;;
color:#353535"> </span><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;
mso-bidi-font-family:AppleSystemUIFont;color:#353535">在个人信息使用时，例如个人信息展示、个人信息关联计算，我们会采用包括内容替换、<span lang="EN-US">SHA256</span>在内多种数据脱敏技术增强个人信息在使用中安全性。</span><span style="font-size:
13.0pt;font-family:&quot;MS Gothic&quot;;mso-bidi-font-family:&quot;MS Gothic&quot;;color:#353535"> </span><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">禾大夫采用严格的数据访问权限控制和多重身份认证技术保护个人信息，避免数据被违规使用。</span><span style="font-size:13.0pt;font-family:&quot;MS Gothic&quot;;mso-bidi-font-family:&quot;MS Gothic&quot;;
color:#353535"> </span><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;
mso-bidi-font-family:AppleSystemUIFont;color:#353535">禾大夫采用代码安全自动检查、数据访问日志分析技术进行个人信息安全审计。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">4.1.2</span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">禾大夫通过建立数据分类分级制度、数据安全管理规范、数据安全开发规范来管理规范个人信息的存储和使用。</span><span style="font-size:13.0pt;font-family:&quot;MS Gothic&quot;;mso-bidi-font-family:&quot;MS Gothic&quot;;
color:#353535"> </span><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;
mso-bidi-font-family:AppleSystemUIFont;color:#353535">禾大夫通过信息接触者保密协议、监控和审计机制来对数据进行全面安全控制。</span><span style="font-size:13.0pt;font-family:&quot;MS Gothic&quot;;mso-bidi-font-family:&quot;MS Gothic&quot;;
color:#353535"> </span><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;
mso-bidi-font-family:AppleSystemUIFont;color:#353535">禾大夫建立数据安全委员会并下设信息保护专职部门、数据安全应急响应组织来推进和保障个人信息安全。</span><span style="font-size:13.0pt;font-family:&quot;MS Gothic&quot;;mso-bidi-font-family:&quot;MS Gothic&quot;;
color:#353535"> </span><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;
mso-bidi-font-family:AppleSystemUIFont;color:#353535">安全认证和服务。</span><span style="font-size:13.0pt;font-family:&quot;MS Gothic&quot;;mso-bidi-font-family:&quot;MS Gothic&quot;;
color:#353535"> </span><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;
mso-bidi-font-family:AppleSystemUIFont;color:#353535">我们还会举办安全和隐私保护培训课程，加强员工对于保护个人信息重要性的认识。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">4.1.3</span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">我们仅允许有必要知晓这些信息的禾大夫及禾大夫关联方的员工、合作伙伴访问个人信息，并为此设置了严格的访问权限控制和监控机制。我们同时要求可能接触到您个人信息的所有人员履行相应的保密义务。如果未能履行这些义务，可能会被追究法律责任或被中止与禾大夫的合作关系。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">4.1.4</span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">我们会采取一切合理可行的措施，确保未收集无关的个人信息。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">4.1.5</span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">我们还在用户数据保护上做了一些创造性工作在配送体系，采用了独特的<span lang="EN-US">“</span>微笑面单<span lang="EN-US">”</span>，避免用户敏感信息在配送环节的暴露，同时<span lang="EN-US">,</span>大力强化对禾大夫物流员工的数据安全培训和要求，提高物流员工保护用户敏感信息的意识。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">4.1.6</span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">互联网并非绝对安全的环境，而且电子邮件、即时通讯、社交软件等与其他用户的交流方式无法确定是否完全加密，我们建议您使用此类工具时请使用复杂密码，并注意保护您的个人信息安全。在通过禾大夫与第三方进行网上产品与<span lang="EN-US">/</span>或服务的交易时，您不可避免的要向交易对方或潜在的交易对方披露自己的个人信息，如联络方式或者邮政地址等。请您妥善保护自己的个人信息，仅在必要的情形下向他人提供。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">4.1.7</span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">安全事件处置<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">为应对个人信息泄露、损毁和丢失等可能出现的风险，禾大夫制定了多项制度，明确安全事件、安全漏洞的分类分级标准及相应的处理流程。禾大夫也为安全事件建立了专门的应急响应团队，按照安全事件处置规范要求，针对不同安全事件启动安全预案，进行止损、分析、定位、制定补救措施、联合相关部门进行溯源和打击。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">一旦发生个人信息安全事件后，我们将按照法律法规的要求，及时向您告知：安全事件的基本情况和可能的影响、我们已采取或将要采取的处置措施、您可自主防范和降低风险的建议、对您的补救措施等。我们同时将及时将事件相关情况以邮件、信函、电话、推送通知等方式告知您，难以逐一告知个人信息主体时，我们会采取合理、有效的方式发布公告。同时，我们还将按照监管部门要求，主动上报个人信息安全事件的处置情况。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">4.1.8</span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">互联网环境并非百分之百安全，我们将尽力确保或担保您发送给我们的任何信息的安全性。如果我们的物理、技术、或管理防护设施遭到破坏，导致信息被非授权访问、公开披露、篡改、或毁坏，导致您的合法权益受损，我们将承担相应的法律责任。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">4.1.9</span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">如果您对我们的个人信息保护有任何疑问，可通过本隐私政策中约定的联系方式联系我们。如您发现自己的个人信息泄密，尤其是您的账户及密码发生泄露，请您立即通过本隐私政策【八、如何联系我们】中约定的联系方式联络我们，以便我们采取相应措施。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">4.2 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">您个人信息的保存<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">4.2.1</span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">您的个人信息将存储于中华人民共和国境内。如您使用跨境交易服务，且需要向境外传输您的个人信息完成交易的，我们会单独征得您的授权同意并要求接收方按照我们的说明、本隐私政策以及其他任何相关的保密和安全措施来处理这些个人信息。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">4.2.2</span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">在您使用我们的产品与<span lang="EN-US">/</span>或服务期间，您的个人信息将在为了实现本政策所述目的之期限内保存，同时将结合法律有强制的留存要求期限的规定确定，如《中华人民共和国电子商务法》要求商品和服务信息、交易信息保存时间自交易完成之日起不少于三年。在超出保存期间后，我们会根据适用法律的要求删除您的个人信息，或进行匿名化处理。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">4.1.3</span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">请您注意，当您成功注销禾大夫账户后，我们将对您的个人信息进行删除或匿名化处理。当您或我们协助您删除相关信息后，因为适用的法律和安全技术限制，我们可能无法立即从备份系统中删除相应的信息，我们将安全地存储您的个人信息并限制对其的任何进一步的处理，直到备份可以删除或实现匿名化。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">4.1.4</span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">如果我们终止服务或运营，我们会至少提前三十日向您通知，并在终止服务或运营后对您的个人信息进行删除或匿名化处理。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535"><o:p>&nbsp;</o:p></span></p>

<p class="MsoNormal" style="margin-left:0cm;text-indent:0cm;mso-list:l5 level1 lfo6;
mso-layout-grid-align:none;text-autospace:none"><!--[if !supportLists]--><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
微软雅黑;color:#353535"><span style="mso-list:Ignore">5.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><!--[endif]--><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;
mso-bidi-font-family:AppleSystemUIFont;color:#353535">您如何管理您的个人信息<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">禾大夫非常重视您对个人信息的关注，并尽全力保护您对于您个人信息访问、更正、删除以及撤回同意的权利，以使您拥有充分的能力保障您的隐私和安全。您的权利包括：<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">5.1 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">访问和更正您的个人信息<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">除法律法规规定外，您有权随时访问和更正您的个人信息，具体包括：</span><span style="font-size:13.0pt;font-family:&quot;MS Gothic&quot;;mso-bidi-font-family:&quot;MS Gothic&quot;;
color:#353535"> </span><span lang="EN-US" style="font-size:13.0pt;font-family:
&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;color:#353535">5.1.2 </span><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">您的账户信息：移动端具体路径为：账户名称、个人资料信息：我的<span lang="EN-US">—</span>点击头像进入个人信息设置头像、昵称、电话号码等。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">5.1.3</span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">您的收货信息：移动端具体路径为：我的<span lang="EN-US">—</span>收货地址。您也可以将最常用的收货地址设置为默认地址，如此，若您下次购买商品时未更改收货地址，您的商品会配送到该默认地址。</span><span style="font-size:13.0pt;font-family:&quot;MS Gothic&quot;;mso-bidi-font-family:&quot;MS Gothic&quot;;
color:#353535"> </span><span lang="EN-US" style="font-size:13.0pt;font-family:
&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:&quot;MS Gothic&quot;;color:#353535"><o:p></o:p></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">5.1.4 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">您的订单信息：移动端我的<span lang="EN-US">—</span>待收款<span lang="EN-US">/</span>待收货<span lang="EN-US">/</span>已完成<span lang="EN-US">/</span>全部订单。</span><span style="font-size:13.0pt;font-family:&quot;MS Gothic&quot;;mso-bidi-font-family:&quot;MS Gothic&quot;;
color:#353535"> </span><span lang="EN-US" style="font-size:13.0pt;font-family:
&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;color:#353535">5.1.5 </span><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">您的搜索信息：搜索历史记录：首页<span lang="EN-US">—</span>搜索<span lang="EN-US">—</span>历史记录，或首页<span lang="EN-US">—</span>店铺<span lang="EN-US">—</span>搜索<span lang="EN-US">—</span>历史记录</span><span style="font-size:13.0pt;font-family:&quot;MS Gothic&quot;;
mso-bidi-font-family:&quot;MS Gothic&quot;;color:#353535"> </span><span style="font-size:
13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:&quot;MS Gothic&quot;;
color:#353535">。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">5.1.6 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">您的发票信息：您可以访问或更新或清除您的发票信息，移动端路径为我的<span lang="EN-US">—</span>发票信息。</span><span style="font-size:13.0pt;font-family:&quot;MS Gothic&quot;;mso-bidi-font-family:&quot;MS Gothic&quot;;
color:#353535"> </span><span lang="EN-US" style="font-size:13.0pt;font-family:
&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:&quot;MS Gothic&quot;;color:#353535"><o:p></o:p></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">5.1.7 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">对于您在使用我们的产品与<span lang="EN-US">/</span>或服务过程中产生的其他个人信息需要访问或更正，请随时联系我们。我们会根据本隐私政策所列明的方式和期限响应您的请求。</span><span style="font-size:13.0pt;font-family:&quot;MS Gothic&quot;;mso-bidi-font-family:&quot;MS Gothic&quot;;
color:#353535"> </span><span lang="EN-US" style="font-size:13.0pt;font-family:
&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:&quot;MS Gothic&quot;;color:#353535"><o:p></o:p></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">5.1.8</span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">您无法访问和更正的个人信息：除上述列明的信息外，您的部分个人信息我们无法为您提供访问和更正的服务，这些信息主要是为了提升您的用户体验和保证交易安全所收集的您的设备信息、您使用扩展功能时产生的个人信息。上述信息我们会在您的授权范围内进行使用，您无法访问和更正，但您可联系我们进行删除或做匿名化处理。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">5.2 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">删除您的个人信息<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">您在我们的产品与<span lang="EN-US">/</span>或服务页面中可以直接清除或删除的信息，包括浏览信息、收货地址信息。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">在以下情形中，您可以向我们提出删除个人信息的请求：<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">5.2.1 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">如果我们处理个人信息的行为违反法律法规；<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">5.2.2 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">如果我们收集、使用您的个人信息，却未征得您的同意；<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">5.2.3 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">如果我们处理个人信息的行为违反了与您的约定；<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">5.2.4 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">如果您不再使用我们的产品或服务，或您注销了禾大夫账号；<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">5.2.5 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">如果我们终止服务及运营。若我们决定响应您的删除请求，我们还将同时通知从我们获得您的个人信息的实体，要求其及时删除，除非法律法规另有规定，或这些实体获得您的独立授权。若我们响应您的删除请求，我们不能保证立即从备份系统中删除相应的信息，但会在备份系统更新时删除这些信息。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">5.3 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">改变您授权同意的范围或撤回您的授权<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">您可以通过删除信息、关闭设备功能、在禾大夫网站或软件中进行隐私设置等方式改变您授权我们继续收集个人信息的范围或撤回您的授权。您也可以通过注销账户的方式，撤回我们继续收集您个人信息的全部授权。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">请您理解，每个业务功能需要一些基本的个人信息才能得以完成，当您撤回同意或授权后，我们无法继续为您提供撤回同意或授权所对应的服务，也不再处理您相应的个人信息。但您撤回同意或授权的决定，不会影响此前基于您的授权而开展的个人信息处理。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">5.4 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">注销账户<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">您可以在我们的产品中直接申请注销账户。您可以通过移动端<span lang="EN-US">APP</span>访问我的<span lang="EN-US">—</span>右上角设置<span lang="EN-US">—</span>隐私<span lang="EN-US">—</span>发送注销申请至邮箱，我们会在<span lang="EN-US">3</span>个工作日内处理完成。您注销账户后，我们将停止为您提供产品与<span lang="EN-US">/</span>或服务，并依据您的要求，除法律法规另有规定外，我们将删除您的个人信息。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">5.5 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">响应您的请求<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">如果您无法通过上述方式访问、更正或删除您的个人信息，或您需要访问、更正或删除您在使用我们产品与<span lang="EN-US">/</span>或服务时所产生的其他个人信息或者获取个人信息副本，或您认为禾大夫存在任何违反法律法规或与您关于个人信息的收集或使用的约定，您均可以发送电子邮件至<span lang="EN-US">kf@zhenheyiliao.com</span>或通过本隐私政策中的其他方式与我们联系。为了保障安全，我们可能需要您提供书面请求，或提供您的身份证明文件，我们将在收到您反馈并验证您的身份后的<span lang="EN-US">15</span>天内答复您的请求。对于您合理的请求，我们原则上不收取费用，但对多次重复、超出合理限度的请求，我们将视情收取一定成本费用。对于那些无端重复、需要过多技术手段（例如，需要开发新系统或从根本上改变现行惯例）、给他人合法权益带来风险或者非常不切实际（例如，涉及备份磁带上存放的信息）的请求，我们可能会予以拒绝。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">在以下情形中，按照法律法规要求，我们将无法响应您的请求：<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">5.5.1 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">与个人信息控制者履行法律法规规定的义务相关的；<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">5.5.2 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">与国家安全、国防安全有关的；<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">5.5.3 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">与公共安全、公共卫生、重大公共利益有关的；<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">5.5.4 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">与犯罪侦查、起诉和审判和执行判决等有关的；<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">5.5.5 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">有充分证据表明您存在主观恶意或滥用权利的；<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">5.5.6 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">出于维护个人信息主体或其他个人的生命、财产等重大合法权益但又很难得到本人同意的；<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">5.5.7 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">响应您的请求将导致您或其他个人、组织的合法权益受到严重损害的；<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">5.5.8</span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">涉及商业秘密的。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535"><o:p>&nbsp;</o:p></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">6.</span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">未成年人的个人信息保护<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">6.1 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">禾大夫非常重视对未成年人个人信息的保护。若您是<span lang="EN-US">18</span>周岁以下的未成年人，在使用我们的产品与<span lang="EN-US">/</span>或服务前，应事先取得您监护人的同意。禾大夫根据国家相关法律法规的规定保护未成年人的个人信息。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">6.2 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">我们不会主动直接向未成年人收集其个人信息。对于经监护人同意而收集未成年人个人信息的情况，我们只会在受到法律允许、监护人同意或者保护未成年人所必要的情况下使用、共享、转让或披露此信息。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoListParagraph" style="margin-left:18.0pt;text-indent:-18.0pt;
mso-char-indent-count:0;mso-list:l9 level2 lfo12;mso-layout-grid-align:none;
text-autospace:none"><!--[if !supportLists]--><span lang="EN-US" style="font-size:
13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:微软雅黑;color:#353535"><span style="mso-list:Ignore">6.3<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp; </span></span></span><!--[endif]--><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">如果有事实证明未成年人在未取得监护人同意的情况下注册使用了我们的产品与<span lang="EN-US">/</span>或服务，我们会与相关监护人协商，并设法尽快删除相关个人信息。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535"><o:p>&nbsp;</o:p></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">7.</span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">通知和修订<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">7.1 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">为给您提供更好的服务以及随着禾大夫业务的发展，本隐私政策也会随之更新。但未经您明确同意，我们不会削减您依据本隐私政策所应享有的权利。我们会通过在禾大夫移动端上发出更新版本并在生效前以其他适当方式提醒您相关内容的更新，也请您访问禾大夫以便及时了解最新的隐私政策。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">7.2 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">对于重大变更，我们还会提供更为显著的通知（我们会通过包括但不限于邮件、短信或在浏览页面做特别提示等方式，说明隐私政策的具体变更内容）。</span><span style="font-size:13.0pt;font-family:&quot;MS Gothic&quot;;mso-bidi-font-family:&quot;MS Gothic&quot;;
color:#353535"> </span><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;
mso-bidi-font-family:AppleSystemUIFont;color:#353535">本隐私政策所指的重大变更包括但不限于：</span><span style="font-size:13.0pt;font-family:&quot;MS Gothic&quot;;mso-bidi-font-family:&quot;MS Gothic&quot;;
color:#353535"> </span><span lang="EN-US" style="font-size:13.0pt;font-family:
&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;color:#353535">7.2.3 </span><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">我们的服务模式发生重大变化。如处理个人信息的目的、处理的个人信息类型、个人信息的使用方式等；</span><span style="font-size:13.0pt;font-family:&quot;MS Gothic&quot;;mso-bidi-font-family:&quot;MS Gothic&quot;;
color:#353535"> </span><span lang="EN-US" style="font-size:13.0pt;font-family:
&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;color:#353535">7.2.4 </span><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">我们在所有权结构、组织架构等方面发生重大变化。如业务调整、破产并购等引起的所有者变更等；</span><span style="font-size:13.0pt;font-family:&quot;MS Gothic&quot;;mso-bidi-font-family:&quot;MS Gothic&quot;;
color:#353535"> </span><span lang="EN-US" style="font-size:13.0pt;font-family:
&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;color:#353535">7.2.5 </span><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">个人信息共享、转让或公开披露的主要对象发生变化。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">7.2.6 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">您参与个人信息处理方面的权利及其行使方式发生重大变化。</span><span style="font-size:13.0pt;
font-family:&quot;MS Gothic&quot;;mso-bidi-font-family:&quot;MS Gothic&quot;;color:#353535"> </span><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">7.2.7 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">我们负责处理个人信息安全的责任部门、联络方式及投诉渠道发生变化时。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">7.2.8 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">个人信息安全影响评估报告表明存在高风险时。</span><span lang="EN-US" style="font-size:
13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:&quot;MS Gothic&quot;;
color:#353535"><o:p></o:p></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">7.3</span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">我们还会将本隐私政策的旧版本存档，供您查阅。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">7.4 </span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">为了您能及时接收到通知，建议您在联系方式更新时及时通知我们。如您在本政策更新生效后继续使用我们的服务，即代表您已充分阅读、理解并接受更新后的政策并愿意受更新后的政策约束。我们鼓励您在每次使用我们服务时都查阅本政策。您可以在禾大夫<span lang="EN-US">APP</span>通过<span lang="EN-US">“</span>我的<span lang="EN-US">-</span>账户设置<span lang="EN-US">-</span>关于禾大夫<span lang="EN-US">APP-</span>隐私政策<span lang="EN-US">”</span>中查看本政策。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535"><o:p>&nbsp;</o:p></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">8.</span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">如何联系我们<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">8.1</span><span style="font-size:13.0pt;
font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:AppleSystemUIFont;
color:#353535">如您对本隐私政策或您个人信息的相关事宜或者投诉、举报、有任何问题、意见或建议，请通过以下方式与我们联系。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">电话：<span lang="EN-US">400-968-9658<o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">邮箱：<span lang="EN-US"><a href="mailto:kf@zhenheyiliao.com">kf@zhenheyiliao.com</a><o:p></o:p></span></span></p>

<p class="MsoNormal" style="mso-layout-grid-align:none;text-autospace:none"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleSystemUIFont;color:#353535">联系地址：湖南省长沙市望城区黄金园街道金桥国际未来城<span lang="EN-US">3</span>栋<span lang="EN-US">13</span>楼<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;
mso-bidi-font-family:AppleSystemUIFont;color:#353535">8.2 </span><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleExternalUIFontSimplifiedCh;color:#353535">一般情况下，我们将在一周内回复。如果您对我们的回复不满意，特别是我们的个人信息处理行为损害了您的合法权益，您还可以向网信、电信、公安及工商等监管部门进行投诉或举报。<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoNormal"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;
mso-bidi-font-family:AppleExternalUIFontSimplifiedCh;color:#353535"><o:p>&nbsp;</o:p></span></p>

<p class="MsoNormal"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;
mso-bidi-font-family:AppleExternalUIFontSimplifiedCh;color:#353535">备注：<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoListParagraph" style="margin-left:18.0pt;text-indent:-18.0pt;
mso-char-indent-count:0;mso-list:l10 level1 lfo11"><!--[if !supportLists]--><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
微软雅黑;color:#353535;mso-font-kerning:0pt"><span style="mso-list:Ignore">1.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp; </span></span></span><!--[endif]--><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleExternalUIFontSimplifiedCh;color:#353535;mso-font-kerning:0pt">使用的第三方<span lang="EN-US">SDK<o:p></o:p></span></span></p>

<p class="MsoListParagraph" style="margin-left:42.0pt;text-indent:-21.0pt;
mso-char-indent-count:0;mso-list:l10 level2 lfo11"><!--[if !supportLists]--><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
微软雅黑;color:#353535;mso-font-kerning:0pt"><span style="mso-list:Ignore">a)<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><!--[endif]--><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleExternalUIFontSimplifiedCh;color:#353535;mso-font-kerning:0pt">高德<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoListParagraph" style="margin-left:18.0pt;text-indent:26.0pt"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleExternalUIFontSimplifiedCh;color:#353535;mso-font-kerning:0pt">SDK</span><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleExternalUIFontSimplifiedCh;color:#353535;mso-font-kerning:0pt">名称：高德<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoListParagraph" style="margin-left:18.0pt;text-indent:26.0pt"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleExternalUIFontSimplifiedCh;color:#353535;mso-font-kerning:0pt">SDK</span><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleExternalUIFontSimplifiedCh;color:#353535;mso-font-kerning:0pt">包名：<span class="SpellE"><span lang="EN-US">com.amap.api</span></span><span lang="EN-US">, <span class="SpellE">com.loc</span>, <span class="SpellE">com.autonavi</span><o:p></o:p></span></span></p>

<p class="MsoListParagraph" style="margin-left:18.0pt;text-indent:26.0pt"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleExternalUIFontSimplifiedCh;color:#353535;mso-font-kerning:0pt">用途：定位<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoListParagraph" style="margin-left:18.0pt;text-indent:26.0pt"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleExternalUIFontSimplifiedCh;color:#353535;mso-font-kerning:0pt">可能获取的个人信息类型：<span lang="EN-US">IMEI</span>、<span class="SpellE"><span lang="EN-US">openid</span></span>、位置信息<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoListParagraph" style="margin-left:18.0pt;text-indent:26.0pt"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleExternalUIFontSimplifiedCh;color:#353535;mso-font-kerning:0pt">调用的设备权限：获取网络状态、访问<span lang="EN-US">Wi-Fi</span>状态、位置信息、访问粗略位置、访问精准定位、读取手机状态和身份<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoListParagraph" style="margin-left:18.0pt;text-indent:26.0pt"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleExternalUIFontSimplifiedCh;color:#353535;mso-font-kerning:0pt">SDK</span><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleExternalUIFontSimplifiedCh;color:#353535;mso-font-kerning:0pt">隐私政策链接：<span lang="EN-US"><a href="https://lbs.amap.com/agreement/compliance">https://lbs.amap.com/agreement/compliance</a><o:p></o:p></span></span></p>

<p class="MsoListParagraph" style="margin-left:42.0pt;text-indent:-21.0pt;
mso-char-indent-count:0;mso-list:l10 level2 lfo11"><!--[if !supportLists]--><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
微软雅黑;color:#353535;mso-font-kerning:0pt"><span style="mso-list:Ignore">b)<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp; </span></span></span><!--[endif]--><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleExternalUIFontSimplifiedCh;color:#353535;mso-font-kerning:0pt"><o:p>&nbsp;</o:p></span></p>

<p class="MsoListParagraph" style="margin-left:18.0pt;text-indent:26.0pt"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleExternalUIFontSimplifiedCh;color:#353535;mso-font-kerning:0pt">SDK</span><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleExternalUIFontSimplifiedCh;color:#353535;mso-font-kerning:0pt">名称：个推<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoListParagraph" style="margin-left:18.0pt;text-indent:26.0pt"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleExternalUIFontSimplifiedCh;color:#353535;mso-font-kerning:0pt">SDK</span><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleExternalUIFontSimplifiedCh;color:#353535;mso-font-kerning:0pt">包名：<span class="SpellE"><span lang="EN-US">com.getui.gtc</span></span><span lang="EN-US"> </span>、<span class="SpellE"><span lang="EN-US">com.igexin.sdk</span></span><span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoListParagraph" style="margin-left:18.0pt;text-indent:26.0pt"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleExternalUIFontSimplifiedCh;color:#353535;mso-font-kerning:0pt">用途：<span class="SpellE"><span lang="EN-US">UniPush</span></span>推送<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoListParagraph" style="margin-left:18.0pt;text-indent:26.0pt"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleExternalUIFontSimplifiedCh;color:#353535;mso-font-kerning:0pt">可能获取的个人信息类型：<span lang="EN-US">IMEI</span>、<span class="SpellE"><span lang="EN-US">openid</span></span>、网络信息<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoListParagraph" style="margin-left:18.0pt;text-indent:26.0pt"><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleExternalUIFontSimplifiedCh;color:#353535;mso-font-kerning:0pt">调用的设备权限：获取网络状态、访问<span lang="EN-US">Wi-Fi</span>状态、读取手机状态和身份<span lang="EN-US"><o:p></o:p></span></span></p>

<p class="MsoListParagraph" style="margin-left:18.0pt;text-indent:26.0pt"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleExternalUIFontSimplifiedCh;color:#353535;mso-font-kerning:0pt">SDK</span><span style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;mso-bidi-font-family:
AppleExternalUIFontSimplifiedCh;color:#353535;mso-font-kerning:0pt">隐私政策链接：</span><span class="MsoHyperlink"><span lang="EN-US" style="font-size:13.0pt;font-family:&quot;微软雅黑&quot;,sans-serif;
mso-bidi-font-family:AppleExternalUIFontSimplifiedCh;mso-font-kerning:0pt">https://lbs.amap.com/agreement/compliance</span><span lang="EN-US"><o:p></o:p></span></span></p>

</div>`
			}
			uni.setNavigationBarTitle({
				title:this.title
			})
		},
		methods:{

		}
	}
</script>

<style lang="scss">
	.header{
		height: 150rpx;
		font-size: 48rpx;
		font-weight: 700;
		text-align: center;
		color: #222222;
		line-height: 150rpx;
	}
	.content{
		overflow-x: hidden;
		width: 690rpx;
		margin: 0 auto;
		font-size: 34rpx;
		text-indent: 68rpx;
		line-height: 60rpx;
	}
	.simditor-body{
		padding-top: 100rpx;
		background-color: #DD6161;
	}
</style>
