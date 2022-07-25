const fetch = require('node-fetch');

const minutes = 1;
const timeOut = 1000 * 60 * minutes;

const serversArray = ['maria.ru', 'rose.ru', 'sina.ru'];
const apiPath = '/api/count';

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
  const timestamp = roundToNearestMinute();
  serversArray.forEach(server => getMetrics(server, timestamp));
}, timeOut);

process.stdin.on('keypress', (str, key) => {
  if (key.name === 'q') {
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

async function getMetrics(server: string, timestamp: string) {
  try {
    const url = `http://${server}/${apiPath}`;
    const response = await fetch(url);
    const json = await response.json();
    console.log(`${timestamp} ${server} ${json.count}`);
  } catch (error) {
    console.log(`${timestamp} ${server} error: ${error}`);
  }
}
