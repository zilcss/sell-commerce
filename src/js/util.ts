/**
 * 解析url参数
 * @example ?id=12345&a=b
 * @return Object {id:12345,a:b}
 */
interface UrlParams {
  [key: string]: string;
}

export function urlParse(): UrlParams {
  const url = window.location.search;
  const obj: UrlParams = {};
  const reg = /[?&][^?&]+=[^?&]*/g;
  const arr = url.match(reg);
  if (arr) {
    arr.forEach((item) => {
      const tempArr = item.substring(1).split("=");
      const key = decodeURIComponent(tempArr[0]);
      const val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
    });
  }
  return obj;
}
