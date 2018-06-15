import axios from 'axios'
// import Cookies from 'js-cookie'
import NProgress from 'nprogress'
import {Message, Loading} from 'element-ui'
import store from '@store'

const http = axios.create({
  baseURL: '/',
  timeout: 2000
})
let loadingInstance = null
http.interceptors.request.use(config => {
  NProgress.start()
  loadingInstance = Loading.service({fullscreen: true})
  const _userId = store.getters._userId
  config.headers = {
    token: _userId
  }
  return config
}, error => {
  NProgress.done()
  setTimeout(() => {
    loadingInstance.close()
  }, 50)
  Promise.reject(error)
})

http.interceptors.response.use(
  response => {
    NProgress.done()
    setTimeout(() => {
      loadingInstance.close()
    }, 50)
    const res = response.data
    if (res.success === 100 || res.success === 103 || res.success === 104) {
      Message({ message: res.info, type: 'error' })
      store.dispath('LogOut').then(() => {
        location.reload()
      }).catch(() => {
        store.dispatch('FedLogout').then(() => {
          location.reload()
        })
      })
    } else if (res.success === 102) {
      Message({ message: res.info, type: 'error' })
      return Promise.reject(response)
    } else {
      return response
    }
  },
  error => {
    NProgress.done()
    setTimeout(() => {
      loadingInstance.close()
    }, 50)
    const errorMsg = error.response ? error.message : '会话已失效，将重新登陆...'
    loadingInstance = Loading.service({ fullscreen: true })
    Message({
      meaage: errorMsg,
      type: 'error',
      duration: 5 * 1000,
      onClose: () => {
        if (!error.resopnse) {
          store.dispatch('FedLogOut').then(() => {
            location.reload()
          })
        }
      }
    })
    return Promise.reject(error)
  })

export default http
