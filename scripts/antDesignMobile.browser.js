function run() {
  const props = {}
  const events = []
  const methods = []
  const slots = []
  const link = location.href
  const tbody = document.querySelector('#props + div table')
    ? document.querySelector('#props + div table')
    : document.querySelector('#props + * table')
      ? document.querySelector('#props + *  table')
      : document.querySelector('#props + * + * table')
  if (tbody) {
    Array.from(tbody.querySelectorAll('tbody tr')).forEach((item) => {
      const name = item.children[0].textContent.split(' ')[0]
      const description = item.children[1].textContent
      const type = item.children[2].textContent
      const value = item.children[3].textContent
      if (name.startsWith('on')) {
        events.push({
          name,
          description,
          description_zh: description,
          params: type,
        })
      } else
        props[name] = {
          description,
          description_zh: description,
          default: value,
          value: '',
          type,
        }
    })
  }
  const eventBody = (document.querySelector('#Event + table')
    ? document.querySelector('#Event + table')
    : document.querySelector('#Event + * + table'))
    || (document.querySelector('#Events + table')
      ? document.querySelector('#Events + table')
      : document.querySelector('#Events + * + table'))

  if (eventBody) {
    Array.from(eventBody.querySelectorAll('tbody tr')).forEach((item) => {
      const name = item.children[0].textContent
      const description = item.children[1].textContent
      const params = item.children[2].textContent
      events.push({ name, description, description_zh: description, params })
    })
  }
  const slotBody = document.querySelectorAll('#Slots + table tbody tr')?.length ? document.querySelectorAll('#Slots + table tbody tr') : document.querySelectorAll('#Slots + * + table tbody tr')
  if (slotBody) {
    Array.from(slotBody).forEach((item) => {
      let name = item.children[0].textContent.split(' ')[0]
      const description = item.children[1].textContent
      if (name === '-' || !name)
        name = 'default'
      slots.push({
        name,
        description,
        description_zh: description,
      })
    })
  }
  const methodsBody = (document.querySelector('#ref + div table')
    ? document.querySelector('#ref + div table')
    : document.querySelector('#ref + *  table'))
    || (document.querySelector('#forminstance + div table')
      ? document.querySelector('#forminstance + div table')
      : document.querySelector('#forminstance + *  table'))

  if (methodsBody) {
    Array.from(methodsBody.querySelectorAll('tbody tr')).forEach((item) => {
      const name = item.children[0].textContent.split('(')[0]
      const description = item.children[1].textContent
      const params = item.children[2]
        ? item.children[2].textContent
        : item.children[0].textContent.split('(')[1]
          ? `(${item.children[0].textContent.split('(')[1]}`
          : ''
      methods.push({ name, description, description_zh: description, params })
    })
  }
  const name = `${link.split('/').filter(Boolean).slice(-1)[0].split('.')[0].split('-').map((i) => {
    return i[0].toUpperCase() + i.slice(1)
  }).join('')}`
  const result = { name, props, link, link_zh: link.replace('en-US', 'zh-CN'), typeDetail: {}, events, methods, slots, suggestions: [] }
  console.log(result)
}

function getProps() {
  const props = {}
  const events = []
  $0.closest('tbody').querySelectorAll('tr').forEach((item) => {
    const name = item.children[0].textContent.split(' ')[0]
    const description = item.children[1].textContent
    const type = item.children[2].textContent
    const value = item.children[3].textContent
    if (name.startsWith('on')) {
      events.push({
        name,
        description,
        description_zh: description,
        params: type,
      })
    } else
      props[name] = {
        description,
        description_zh: description,
        default: value,
        value: '',
        type,
      }
  })
  if (events.length) {
    return {
      props,
      events
    }
  }
  return props
}

function getSlots() {
  const slots = []
  const slotBody = $0.closest('tbody').querySelectorAll('tr')
  if (slotBody) {
    Array.from(slotBody).forEach((item) => {
      let name = item.children[0].textContent.split(' ')[0]
      const description = item.children[1].textContent
      if (name === '-' || !name)
        name = 'default'
      slots.push({
        name,
        description,
        description_zh: description,
      })
    })
  }
  return slots
}

function getMethods() {
  const methods = []
  const methodsBody = $0.closest('tbody').querySelectorAll('tr')
  if (methodsBody) {
    Array.from(methodsBody).forEach((item) => {
      const name = item.children[0].textContent.split('(')[0]
      const description = item.children[1].textContent
      const params = item.children[2]
        ? item.children[2].textContent
        : item.children[0].textContent.split('(')[1]
          ? `(${item.children[0].textContent.split('(')[1]}`
          : ''
      methods.push({ name, description, description_zh: description, params })
    })
  }
  return methods
}

function getEvents() {
  const events = []
  const eventBody = $0.closest('tbody').querySelectorAll('tr')
  if (eventBody) {
    Array.from(eventBody).forEach((item) => {
      const name = item.children[0].textContent
      const description = item.children[1].textContent
      const params = item.children[2].textContent
      events.push({ name, description, description_zh: description, params })
    })
  }
  return events
}
