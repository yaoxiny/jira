
import request from '@/utils/request';
const baseUrl = "/campus/campusweb"
//活动列表
export async function getActiveList(params) {
  return request(`${baseUrl}/activity/pageConditionQueryByCreatorId`,{
      method:'POST',
      data: params
  });
}
//省市区
export async function getAddress(params) {
  return request(`${baseUrl}/address/queryAddressForFourLinkage`,{
      method:'POST',
      data: params
  });
}
//保存/修改草稿
export async function saveDrafts(params) {
  return request(`${baseUrl}/activity/saveDrafts`,{
      method:'POST',
      data: params
  });
}
//创建活动
export async function addActivity(params) {
  return request(`${baseUrl}/activity/addActivity`,{
      method:'POST',
      data: params
  });
}
//详情
export async function queryByUpdate(params) {
  return request(`${baseUrl}/activity/queryByUpdate`,{
      method:'POST',
      data: params
  });
}
