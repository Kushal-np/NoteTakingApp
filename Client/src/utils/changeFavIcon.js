// utils/changeFavicon.js
export function changeFavicon(src) {
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.getElementsByTagName('head')[0].appendChild(link);
  }
  link.href = src + '?v=' + new Date().getTime(); // cache-buster
}
