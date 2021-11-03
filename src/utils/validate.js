/**
 * 邮箱
 * @param {*} s
 */
export function isEmail(s) {
  return /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s);
}

/**
 * 数字和字母
 * @param {*} s
 */
export function numAndStr(s) {
  return /^[0-9a-zA-Z]*$/g.test(s);
}

export function numAndStr2(s) {
  return /^(\d+[A-Za-z]+[A-Za-z0-9]*)|([A-Za-z]+\d+[A-Za-z0-9]*)$/.test(s);
}
/**
 * BaseInput1.3
 * 整数、
 * @param {*} s
 */
export function baseInput12(s) {
  return /^[0-9、]*$/g.test(s);
}

/**
 * 手机号码
 * mobileNoInput
 * 校验输入不能为空
 * 只能输入数字。校验手机格式，第1位必须为1，总数是11位
 * @param {*} s
 * @return {boolean}
 */
export function isMobile(s) {
  return /^(1)\d{10}$/.test(s);
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone(s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s);
}

/**
 * URL地址
 * urlInput
 * 网址格式以http(s)://开头，网址内容中间必须包含.
 * 校验输入不能为空
 * @param {*} s
 * @return {boolean}
 */
export function isURL(s) {
  return /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/.test(s);
}
/**
 * 银行卡
 * @param {*} s
 * @return {boolean}
 */
export function isBankCard(s) {
  return /^([1-9]{1})(\d{14}|\d{15}|\d{16}|\d{17}|\d{18})$/.test(s);
}

/**
 * BaseInput1.1
 * 中文+字母+数字
 * @param {*} s
 */
export function baseInput1(s) {
  return /^[\u4E00-\u9FA5A-Za-z0-9_]+$/.test(s);
}

/**
 * BaseInput11
 * 不能输入表情
 * @param {*} s
 */
export function baseInput11(s) {
  var regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi;
  return !regStr.test(s);
}

/**
 * BaseInput1.2
 * 纯中文
 * @param {*} s
 */
export function baseInput2(s) {
  return /^[\u4e00-\u9fa5]+$/.test(s);
}

/**
 * BaseInput1.3
 * 纯正整数
 * @param {*} s
 */
export function baseInput3(s) {
  return /^[1-9]\d*$/.test(s);
}

/**
 * BaseInput1.3
 * 整数
 * @param {*} s
 */
export function baseInput9(s) {
  return /^[0-9]\d*$/.test(s);
}

/**
 * BaseInput1.4
 * 纯小数
 * @param {*} s
 */
export function baseInput4(s) {
  // return /^[0-9]{1}([0-9]|[.])*$/.test(s)
  return /^(\-)*(\d+)\.(\d\d).*$/.test(s);
}
/**
 * BaseInput1.8
 * 字母数字符号
 * @param {*} s
 */
export function baseInput8(s) {
  // return /^[0-9]{1}([0-9]|[.])*$/.test(s)
  return /[^\u4e00-\u9fa5]+/.test(s);
}

/**
 * 密码中必须包含大小写 字母、数字、特称字符，至少8个字符，最多30个字符；
 *
 * @param {*} s
 */

export function isPwdInput1(s) {
  let pwdRegex = new RegExp(`(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9])`);

  return pwdRegex.test(s);
}
/**
 * 密码中必须包含字母、数字；
 *
 * @param {*} s
 */

export function isPwdInput2(s) {
  // let pwdRegex = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{1,}$/
  let pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,30}$/;
  // let pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]+)[a-zA-Z0-9]{8,16}$/

  return pwdRegex.test(s);
}
/**
 * 密码中必须包含字母、符号；
 *
 * @param {*} s
 */

export function isPwdInput3(s) {
  let pwdRegex = new RegExp(
    /^(?=.*[a-zA-Z])(?=.*[:!@#$%^&*()<>,.?-_+=`~·！@#￥%……&*（）——\-+={}|《》？：“”"【】『』「」、；‘'，。、])[a-zA-Z!@#$%^&*()<>,.?-_+=`~·！@#￥%……&*（）——\-+={}|《》？:："“”【】「」、；‘'，。、]{6,}$/,
  );
  return pwdRegex.test(s);
}

/**
 * 密码中必须包含数字、符号；
 *
 * @param {*} s
 */

export function isPwdInput4(s) {
  let pwdRegex1 = s.match('[A-Z]+');
  if (pwdRegex1) {
    return;
  } else {
    let pwdRegex = new RegExp(
      /^(?=.*[0-9])(?=.*[:!@#$%^&*()<>,.?-_+=`~·！@#￥%……&*（）——\-+={}|《》？：“”"【】『』「」、；‘'，。、])[0-9!@#$%^&*()<>,.?-_+=`~·！@#￥%……&*（）——\-+={}|《》？:："“”【】「」、；‘'，。、]{6,}$/,
    );
    return pwdRegex.test(s);
  }
}

/**
 * 密码中必须纯数字；
 *
 * @param {*} s
 */

export function isPwdInput5(s) {
  let pwdRegex = new RegExp(/^[0-9]*$/);
  return pwdRegex.test(s);
}
/**
 * 密码中必须纯字母；
 *
 * @param {*} s
 */

export function isPwdInput6(s) {
  let pwdRegex = new RegExp(/^[a-zA-Z]{1,}$/);
  return pwdRegex.test(s);
}
/**
 * 密码中必须纯字符；
 *
 * @param {*} s
 */

export function isPwdInput7(s) {
  let pwdRegex = /^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]+$/;
  return pwdRegex.test(s);
}

/**
 * 校验当前字符串是否为一个纯字母
 * @date 2020-04-23
 * @param {string} value
 * @returns {boolean}
 */
export const isPureLetters = (value) =>
  value && typeof value === 'string' && /^[a-zA-Z]+$/.test(value);

/**
 * 校验当前字符串是否为一个 中文 字母 数字 符号 组成的
 * @date 2020-04-23
 * @param {string} value
 * @returns {boolean}
 */
export const isChineseAndNumberAndLettersAndSymbol = (value) =>
  value &&
  typeof value === 'string' &&
  /^[a-zA-Z0-9\u4e00-\u9fa5\,\.\?，。？!！、\~\\@#\$%^&\*\(\)-_\+={}\[\]"":<>|]+$/.test(value);

/**
 * 校验当前字符串是否为一个 中文 字母 空格 组成的
 * @date 2020-04-23
 * @param {string} value
 * @returns {boolean}
 */
export const isChineseAndLettersAndSpace = (value) =>
  value && typeof value === 'string' && /^[a-zA-Z\u4e00-\u9fa5 ]+$/.test(value);

export const baseInput7 = (s) => {
  var regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi;
  return !regStr.test(s);
};

/**
 * 校验多行输入框
 * @date 2020-04-23
 * @param {string} value
 * @returns {boolean}
 */

export const isTextFieldInput = (value, minLength) => {
  if (minLength) {
    if (value.length < minLength) {
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
};

/**
 * 校验身份证
 * 校验输入不能为空
 * 校验输入一定是18位，前17位为数字，最后一位是校验位，可能为数字或字符X。
 * @date 2020-04-23
 * @param {string} value
 * @returns {boolean}
 */
export const isIdentityInput = (value) => {
  const regExp = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  return regExp.test(value);
};

/**
 * 校验车牌号
 * 校验输入不能为空
 * 正常车牌校验输入只能是7位字符
 * 新能源车牌校验输入只能是8位字符
 * 新能源中的小型车，第一位：只能用字母D或字母F，第二位：字母或者数字，后四位：必须使用数字
 * 新能源中大型车，前五位：必须使用数字，第六位：只能用字母D或字母F
 * @date 2020-04-23
 * @param {string} value
 * @returns {boolean}
 */

export const isTicketNoInput = (value) => {
  const regExp = /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/;
  return regExp.test(value);
};

/**
 * 银行卡号
 * 校验输入不能为空
 * 银行卡号长度必须在15位-19位之间
 * 校验银行卡格式是否正确
 * @date 2020-04-23
 * @param {string} value
 * @returns {boolean}
 */

export const luhnCheck = (bankno) => {
  var lastNum = bankno.substr(bankno.length - 1, 1); //取出最后一位（与luhn进行比较）
  var first15Num = bankno.substr(0, bankno.length - 1); //前15或18位
  var newArr = new Array();
  for (var i = first15Num.length - 1; i > -1; i--) {
    //前15或18位倒序存进数组
    newArr.push(first15Num.substr(i, 1));
  }
  var arrJiShu = new Array(); //奇数位*2的积 <9
  var arrJiShu2 = new Array(); //奇数位*2的积 >9
  var arrOuShu = new Array(); //偶数位数组
  for (var j = 0; j < newArr.length; j++) {
    if ((j + 1) % 2 == 1) {
      //奇数位
      if (parseInt(newArr[j]) * 2 < 9) arrJiShu.push(parseInt(newArr[j]) * 2);
      else arrJiShu2.push(parseInt(newArr[j]) * 2);
    } //偶数位
    else arrOuShu.push(newArr[j]);
  }

  var jishu_child1 = new Array(); //奇数位*2 >9 的分割之后的数组个位数
  var jishu_child2 = new Array(); //奇数位*2 >9 的分割之后的数组十位数
  for (var h = 0; h < arrJiShu2.length; h++) {
    jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
    jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
  }

  var sumJiShu = 0; //奇数位*2 < 9 的数组之和
  var sumOuShu = 0; //偶数位数组之和
  var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
  var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
  var sumTotal = 0;
  for (var m = 0; m < arrJiShu.length; m++) {
    sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
  }

  for (var n = 0; n < arrOuShu.length; n++) {
    sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
  }

  for (var p = 0; p < jishu_child1.length; p++) {
    sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
    sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
  }
  //计算总和
  sumTotal =
    parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

  //计算luhn值
  var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
  var luhn = 10 - k;

  if (lastNum == luhn) {
    return true;
  } else {
    return false;
  }
};
