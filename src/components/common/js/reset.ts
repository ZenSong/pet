// 重置html的font-size
function resetFontSize () {
  // 获取屏幕的宽度
  let windowW = document.documentElement.clientWidth
  // 是以iphone6作为参考
  let scale = windowW / 375
  let newSize = 16 * scale
  document.getElementsByTagName('html')[0].style.fontSize = newSize + 'px'
}
// 当浏览器大小变化更新
window.addEventListener('resize', function () {
  resetFontSize()
}, false)
resetFontSize()
