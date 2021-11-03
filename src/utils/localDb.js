/*
 * @文档描述:
 * @author: 宣灵杰
 * @Date: 2020-09-07 19:38:37
 * @LastEditTime: 2020-12-21 17:17:39
 * @LastEditors: 宣灵杰
 */

/**
 * 封装localStorage
 * 增加对JSON对象的转换
 * @author: Ziv
 * @return {[type]} [description]
 */

export const localDb = {
  /**
   * 按key存贮数据value到localStorage
   * @param {String} key   存贮数据的唯一标识
   * @param {String, Object} value 所要存贮的数据
   */
  set(key, value) {
    if (!value) delete window.localStorage[key];
    else {
      const val = typeof value === 'object' ? JSON.stringify(value) : value;
      window.localStorage[key] = val;
    }
  },

  /**
   * 通过key从localStorage获取数据
   * @param  {String} key  获取数据的可以标识
   * @return {String, Object}  返回空，字符串或者对象
   */
  get(key) {
    const str = window.localStorage[key] || '';
    return this.isJSONStr(str) ? JSON.parse(str) : str;
  },

  /**
   * 判断是否是JSON string
   * @param  {String}  str 所要验证的字符串
   * @return {Boolean}   是否是JSON字符串
   */
  isJSONStr(str) {
    return (
      (str.charAt(0) === '{' && str.charAt(str.length - 1) === '}') ||
      (str.charAt(0) === '[' && str.charAt(str.length - 1) === ']')
    );
  },

  // 设置用户信息
  setUserInfo(userInfoKey, data, persistent = false) {
    if (persistent) {
      this.set(userInfoKey, data);
    } else {
      sessionStorage.setItem(userInfoKey, JSON.stringify(data));
    }
  },
  // 获得用户信息
  getUserInfo(userInfoKey, persistent = false) {
    if (persistent) {
      return this.get(userInfoKey);
    } else {
      const str = window.sessionStorage[userInfoKey] || '';
      return this.isJSONStr(str) ? JSON.parse(str) : str;
    }
  },
  /**
   * 清空localStorage
   * @return 无返回NULL
   */
  clear(key) {
    if (key) {
      window.localStorage.removeItem('key');
    } else {
      window.localStorage.clear();
    }
  },
};
