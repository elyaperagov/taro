export default {
  install(Vue, options) {
    Vue.prototype.$eventBus = new Vue()
    Vue.prototype.$cloneObj = function (object) {
      return JSON.parse(JSON.stringify(object))
    }
    Vue.prototype.$scrollTo = function (id = false, offset = 0, refs = false, ref = false) {
      try {
        let target = false
        if (id) {
          target = document.querySelector(id)
          if (!target) {
            return false
          }
        }
        if (refs && ref) {
          target = refs[ref]
          return false
        }
        let top = target.offsetTop
        if (!top && refs && ref) {
          top = refs[ref][0].offsetTop
        }
        if (!top) {
          return false
        }
        window.scrollTo({
          top: top + offset,
          behavior: 'smooth'
        })
        return true
      } catch (error) {
        return false
      }
    }
    Vue.prototype.$scrollToTop = function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
    Vue.prototype.$switchArray = function (i, arr, keyName) {
      for (const key in arr) {
        if (i !== key) {
          Vue.set(arr[key], keyName, false)
        }
      }
      Vue.set(arr[i], keyName, true)
    }
    Vue.prototype.$switchActive = function (i, arr) {
      for (const key in arr) {
        if (i !== key) {
          Vue.set(arr[key], 'active', false)
        }
      }
      Vue.set(arr[i], 'active', true)
    }
    Vue.prototype.$switchActiveReverse = function (i, arr) {
      for (const key in arr) {
        if (i !== key) {
          Vue.set(arr[key], 'active', true)
        }
      }
      Vue.set(arr[i], 'active', false)
    }
    Vue.prototype.$toggleArray = function (i, arr, keyName) {
      for (const key in arr) {
        if (i !== key) {
          Vue.set(arr[key], keyName, false)
        }
      }
      if (arr[i][keyName]) {
        Vue.set(arr[i], keyName, false)
      } else {
        Vue.set(arr[i], keyName, true)
      }
    }
    Vue.prototype.$setUrlParameter = function (name, value) {
      const url = new URL(document.location.href)
      const params = new URLSearchParams(url.search.slice(1))

      params.set(name, value)
      const paramsString = url.pathname + '?' + params.toString()

      history.pushState(null, null, paramsString)
      window.dispatchEvent(new Event('popstate'))
    }
    Vue.prototype.$appendUrlParameter = function (name, value) {
      const url = new URL(document.location.href)
      const params = new URLSearchParams(url.search.slice(1))

      params.append(name, value)
    }
    Vue.prototype.$getUrlParameter = function (name) {
      const params = new URLSearchParams(document.location.search.substring(1))
      const param = params.get(name)
      return param
    }
    Vue.prototype.$delUrlParameter = function (name) {
      const url = new URL(document.location.href)
      const params = new URLSearchParams(url.search.slice(1))

      params.delete(name)
      const paramsString = url.pathname + '?' + params.toString()

      history.pushState(null, null, paramsString)
      window.dispatchEvent(new Event('popstate'))
    }
    Vue.prototype.$getRandom = function (arr = []) {
      return arr[Math.floor(Math.random() * arr.length)]
    }
    Vue.prototype.$validate = function (form) {
      let valid = true

      for (const key in form) {
        if (typeof form[key].error === 'undefined') {
          continue
        }
        if (typeof form[key].value === 'string') {
          form[key].value = form[key].value.trim()
        } else if (form[key].value === null) {
          form[key].value = ''
        } else {
          continue
        }
        let error = ''
        switch (key) {
          case 'name':
            if (form[key].value.length < 1) {
              error = 'Вы не указали имя'
            }
            break
          case 'in':
          case 'out':
            if (form[key].value.length < 1) {
              error = 'Выберите дату'
            }
            break
          case 'phone':
            if (form[key].value.length < 18) {
              error = 'Неверный номер телефона'
            }
            break
          case 'contract':
            if (form[key].value.length < 6) {
              error = 'Договоры займа по данному номеру не найдены'
            }
            break
          case 'email':
            if (
              (!form[key].value.includes('@') || !form[key].value.includes('.')) &&
              form[key].value.length > 0
            ) {
              error = 'Вы указали неверный email'
            }
            break
          case 'message':
          case 'text':
            if (form[key].value.length < 10) {
              error = 'error'
            }
            break
          case 'accept':
            if (!form[key].value) {
              error = 'error'
            }
            break
        }
        if (error !== '') {
          valid = false
        }
        form[key].error = error
      }
      setTimeout(() => {
        for (const key in form) {
          if (typeof form[key].error !== 'undefined') {
            form[key].error = ''
          }
        }
      }, 3000)
      return valid
    }
  }
}
