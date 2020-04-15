new Promise((resolve, reject) => {
  resolve()
}).then((resolve) => {
  resolve()
}, (err) => {
  reject(err)
})

let PENDING = 'pending'
let RESOLVED = 'resolved'
let REJECTED = 'rejected'

function resolvePromise(promise2, x, resolve, reject) {
  if(promise2 === x) {
    return reject(new TypeError('Chainin cycle detected for promise #<Promise>'))
  }
  let called;
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    try {
      let then = x.then
      if (typeof then === 'function') {
        then.call(x, y => {
          resolvePromise(promise2, y, resolve, reject)
        }, r => {
          if(called) {
            return
          }
          called = true
          reject(r)
        })
      } else {
        resolve(x)
      }
    } catch(e) {
      if(called) {
        return
      }
      called = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}

class Promise {
  constructor(excutor) {
    this.status = PENDING
    this.value = null
    this.reason = null
    this.onResolvedCallback = []
    this.onRejectedCallback = []

    function resolve(value) {
      if (this.status === PENDING) {
        this.status = RESOLVED
        this.value = value
        this.onResolvedCallback.forEach(fn => fn())
      }
    }

    function reject(reason) {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        this.onRejectedCallback.forEach(fn => fn())
      }
    }

    try {
      excutor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : data => data
    onRejected = typeof onRejected === 'function' ? onRejected : err => {
      throw err
    }

    let Promise2 = new Promise((resolve, reject) => {
      if (this.status === RESOLVED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch(e) {
            reject(e)
          }
        }, 0)
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch(e) {
            reject(e)
          }
        }, 0)
      }

      if(this.status === PENDING) {
        this.onResolvedCallback.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch(e) {
              reject(e)
            }
          })
        })
        this.onRejectedCallback.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch(e) {
              reject(e)
            }
          })
        })
      }
    })
    return promise2
  }
}