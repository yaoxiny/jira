import request from '@/utils/request';

const baseUrl = "/campus/campusweb"

export async function fakeAccountLogin(params) {
  return request(`${baseUrl}/login/account`, {
    method: 'POST',
    data: params,
  });
}
export async function accountLogin(params) {
  return request(`${baseUrl}/ipuser/login`, {
    method: 'POST',
    data: params,
  });
}
// export async function getFakeCaptcha(mobile) {
//   return request(`/api/login/captcha?mobile=${mobile}`);
// }
export async function getRoute() {
  return request(`${baseUrl}/menu/listFirstLevelMenuForUser`);
}
export async function getOtherRoute(params) {
  return request(`${baseUrl}/menu/listOthersMenuForUser`,{
    method:'POST',
    data:params
  });
}
