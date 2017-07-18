let count = 0
let ipAddress = ""

function captureData(){
  getIp()
  .then(data => {
    return ipAddress = data.ip
  })

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
    headers: headers(),
    body: JSON.stringify({
      tag: {
        title: tag.title,
        hostname: tag.hostname,
        frame: tag.frame,
        order: tag.order,
        remoteip: tag.remoteip
      }
    })
  }).then(res => res.json())
}

function getIp(){
  return fetch('https://ipapi.co/json/')
    .then(res => res.json())
}

function headers(){
  return {
    'content-type': 'application/json',
    'accept': 'application/json'
  }
}
