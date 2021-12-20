export default {
  authStatus: {
    // 商品授权状态
    doing: 0, // 待审核
    pass: 1, // 通过
    reject: 2, // 未通过
    waitApply: 3, // 未申请
  },
  qualificationStatus: {
    // 资质状态
    doing: 0, // 待审核
    pass: 1, // 通过
    reject: 2, // 未通过
    willdue: 3, // 将过期
    overdue: 4, // 过期
  },
  showModel: {
    //
    class: 0, // 0-商品分类
    single: 1, // 1-商品图片
  },
};
