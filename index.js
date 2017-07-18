let count = 0

function captureData(){
  getIp()
  .then(data => {
    let ipAddress = data.ip
  })
  debugger

  count = count + 1
  function inFrame() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
  }

  let tag = {title: document.title, hostname: window.location.hostname, frame: inFrame(), order: count, remoteip: ipAddress }

  createTag(tag)
}

const baseUrl = 'http://localhost:3000/api/v1/tags'

function createTag(tag){
  return fetch(`${baseUrl}`, {
    method: 'POST',
    headers: this.headers(),
    body: JSON.stringify({
      tag: {
        title: tag.title,
        hostname: tag.hostname,
        frame: tag.frame,
        order: tag.order,
        remoteip: tag.remoteip
      }
    })
  }).then(res => res.json() )
}

function getIp(){
  return fetch('//freegeoip.net/json/?callback=?')
    .then( res => res.json() )
}

function headers(){
  return {
    'content-type': 'application/json',
    'accept': 'application/json'
  }
}
