export function open (params) {
  const options = params
  let div = document.createElement('div')
  div.innerHTML = '<div><p>' + options.tit + '</p><p>' + options.content + '</p></div>'
  div.setAttribute('style', 'position:fixed;left:0;right:0;top:0;bottom:0;margin:auto;opacity:0;transition:all 1s;z-index:10;background:#ccc;width:500px;height:80px;text-align:center;')
  document.body.appendChild(div)
  setTimeout(() => {
    div.setAttribute('style', 'position:fixed;left:0;right:0;top:0;bottom:0;margin:auto;opacity:0.5;transition:all 1s;z-index:10;background:#ccc;width:500px;height:80px;text-align:center;')
  }, 2000)
  function remove () {
    div.setAttribute('style', 'position:fixed;left:0;right:0;top:0;bottom:0;margin:auto;opacity:0;transition:all 1s;z-index:10;background:#ccc;width:500px;height:80px;text-align:center;')
    document.body.removeChild(div)
  }
  setTimeout(() => {
    remove()
  }, 4000)
}
