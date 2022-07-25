const minutes = 1;
const timeOut = 1000 * 60 * minutes;

const serversArray = ['maria.ru', 'rose.ru', 'sina.ru'];

let isQuit = false;

const readline = require('readline');

readline.emitKeypressEvents(process.stdin);

if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}

console.log(
  `Getting servers ${serversArray.join(', ')} response process started.`
);
console.log(`Timeout: ${timeOut / 60000} minutes.`);
console.log('Press q to quit');

const handle = setInterval(() => {
  if (isQuit) {
    clearInterval(handle);
    // eslint-disable-next-line no-process-exit
    process.exit(0);
  } else {
    console.log(roundToNearestMinute());
  }
}, timeOut);

process.stdin.on('keypress', (str, key) => {
  if (key.name === 'q') {
    isQuit = true;
    clearInterval(handle);
    // eslint-disable-next-line no-process-exit
    process.exit(0);
  }
});

function roundToNearestMinute(date = new Date()) {
  const roundedToMinute = 1000 * 60 * 1;
  const offset = date.getTimezoneOffset() * 60 * 1000;
  const result = new Date(
    Math.floor((date.getTime() - offset) / roundedToMinute) * roundedToMinute
  );

  return result.toISOString().replace('T', ' ').replace('.000Z', '');
}
