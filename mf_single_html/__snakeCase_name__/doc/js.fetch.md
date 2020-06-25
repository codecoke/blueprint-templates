```js


    // console.log(app_cof);
    // let res = Promise.resolve(_load_cof(url));      
    // res.then(r =>{
    //   r.json().then(r1=>{
    //     console.log(r1[0].app_info);
    //   })
    // })
    

function myAsyncFunction(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
};


var word = '123',
  url =
    'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' +
    word +
    '&json=1&p=3'

;(async () => {
  try {
    let res = await fetch(url, { mode: 'no-cors' }) 
    //等待fetch被resolve()后才能继续执行
    console.log(res)
  } catch (e) {
    console.log(e)
  }
})()

let wait = function (ts) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, ts, 'Copy that!')
  })
}

;(async function () {
  try {
    let res = await wait(1000) //① 等待1s后返回结果
    console.log(res)
    res = await wait(1000) //② 重复执行一次
    console.log(res)
  } catch (e) {
    console.log(e)
  }
})()
//"Copy that!"

var word = '123',
  url =
    'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' +
    word +
    '&json=1&p=3'
    
fetch(url)
  .then(function (response) {
    console.log('第一次进入then...')
    if (response.status >= 200 && response.status < 300) {
      console.log('Content-Type: ' + response.headers.get('Content-Type'))
      console.log('Date: ' + response.headers.get('Date'))
      console.log('status: ' + response.status)
      console.log('statusText: ' + response.statusText)
      console.log('type: ' + response.type)
      console.log('url: ' + response.url)
      return Promise.resolve(response)
    } else {
      return Promise.reject(new Error(response.statusText))
    }
  })
  .then(function (data) {
    console.log('第二次进入then...')
    console.log(data)
  })
  .catch(function (e) {
    console.log('抛出的错误如下:')
    console.log(e)
  })

/* 以下是 stackoverflow 上的一段代码, 用于模拟fetch的progress事件. 为了方便测试, 请求url已改为本地服务.(原文请戳 javascript - Progress indicators for fetch? - Stack Overflow) */

function consume(reader) {
  var total = 0
  return new Promise((resolve, reject) => {
    function pump() {
      reader
        .read()
        .then(({ done, value }) => {
          if (done) {
            resolve()
            return
          }
          total += value.byteLength
          console.log(
            `received ${value.byteLength} bytes (${total} bytes in total)`
          )
          pump()
        })
        .catch(reject)
    }
    pump()
  })
}

fetch('http://localhost:10101/notification/', { mode: 'no-cors' })
  .then((res) => consume(res.body.getReader()))
  .then(() =>
    console.log(
      'consumed the entire body without keeping the whole thing in memory!'
    )
  )
  .catch((e) => console.log('something went wrong: ' + e))

// timeout

var _fetch = (function (fetch) {
  return function (url, options) {
    var abort = null,
      timeout = 0
    var abort_promise = new Promise((resolve, reject) => {
      abort = () => {
        reject('timeout.')
        console.info('abort done.')
      }
    })
    var promise = Promise.race([fetch(url, options), abort_promise])
    promise.abort = abort
    Object.defineProperty(promise, 'timeout', {
      set: function (ts) {
        if ((ts = +ts)) {
          timeout = ts
          setTimeout(abort, ts)
        }
      },
      get: function () {
        return timeout
      },
    })
    return promise
  }
})(fetch)

//clone

addEventListener('fetch', function(evt) {
  var sheep = new Response("Dolly");
  console.log(sheep.bodyUsed); // false
  var clone = sheep.clone();
  console.log(clone.bodyUsed); // false

  clone.text();
  console.log(sheep.bodyUsed); // false
  console.log(clone.bodyUsed); // true

  evt.respondWith(cache.add(sheep.clone()).then(function(e) {
    return sheep;
  });
});

//flicker
var u = new URLSearchParams();
u.append('method', 'flickr.interestingness.getList');
u.append('api_key', '<insert api key here>');
u.append('format', 'json');
u.append('nojsoncallback', '1');

var apiCall = fetch('https://api.flickr.com/services/rest?' + u);

apiCall.then(function(response) {
  return response.json().then(function(json) {
    // photo is a list of photos.
    return json.photos.photo;
  });
}).then(function(photos) {
  photos.forEach(function(photo) {
    console.log(photo.title);
  });
});



const getJSON = function(url) {
  const promise = new Promise(function(resolve, reject){
    const handler = function() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };

    const client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();

  });

  return promise;
};

getJSON("/posts.json").then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});
```
