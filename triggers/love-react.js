const type = "CLASSIC" //  CLASSIC / THROTTLE / QUEUE / QUEUE_LOCK / THROTTLE_LOCK

const locker = null // Only required for QUEUE_LOCK & THROTTLE_LOCK types

const conditions = {
  "love-react": true
};

async function reaction() {
  console.log('Do you love React JS ?')
  console.log(REACT_START_I_DO)
}