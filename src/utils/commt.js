/*
 * @文档描述: 
 * @author: 宣灵杰
 * @Date: 2020-10-27 13:35:45
 * @LastEditTime: 2020-10-30 10:38:41
 * @LastEditors: 宣灵杰
 */
export const getQueryVariable= (variable)=> {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
          return decodeURIComponent(pair[1]);
      }
  }
  return (false);
}
