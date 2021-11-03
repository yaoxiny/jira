/*
 * @文档描述:
 * @author: 宣灵杰
 * @Date: 2020-12-21 17:19:19
 * @LastEditTime: 2020-12-21 17:19:51
 * @LastEditors: 宣灵杰
 */
import { extend } from 'umi-request';
import { notification } from 'antd';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/**
 * 异常处理程序
 */

const errorHandler = (error) => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }

  return response;
};
/**
 * 配置request请求时的默认参数
 */

const request = extend({
  errorHandler,
  // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});
//添加请求头
// request.interceptors.request.use(async (url, options) => {
//     let c_token = localDb.get('jwtTokenClient');
//     if (c_token) {
//         const headers = {
//             Authorization: c_token,
//             urlPathname:window.location.pathname,
//             groupId:localDb.get('groupId')
//         };
//         return {
//             url: url,
//             options: {
//                 ...options,
//                 headers: headers,
//             },
//         };
//     }
// });
//返回结果
// request.interceptors.response.use(async (response, options) => {
//   if (options.responseType === 'blob') {
//       return response;
//   }
//   const res = await response.clone().json();
//   if (res.code == 401) {
//       message.destroy();
//       message.error(res.message);
//       // window.location.href='/'
//       router.push('/');
//       // return
//   } else if (res.code === 10002) {
//       router.push('/');
//       message.destroy();
//       message.error(res.message);
//     } else if (res.code === 1155 || res.code === 403) {
//       message.destroy();
//       message.error(res.message);
//       // message.warning(res.data.message)
//       router.replace('/404');
//     }else if (res.code === 1189){  // 证书过期或缺失
//       router.push('/?invalidLicense=1');
//       message.destroy();
//       message.error(res.message);
//     }
//   if (response && res.code !== 200) {
//       const errorText = res.message || '系统异常';
//       message.destroy();
//       message.error(errorText);
//   }

//   return res;
// });

export default request;
