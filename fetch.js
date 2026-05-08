async function run() {
  const t = await fetch('https://framerusercontent.com/modules/XzuKDzJS2m0WMXIoM32y/WdrSku7b7ya6iJqpOqBR/rAz5qs8Dr.js').then(r=>r.text());
  console.log(t);
}
run();
