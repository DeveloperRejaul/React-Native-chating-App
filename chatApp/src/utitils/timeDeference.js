export function timeSince() {
  const fistTime = '2023-04-11T17:26:09.525+00:00';
  const lastTime = '2023-04-11T17:26:09.525+00:00';

  const time = Date.now() - Date.parse('2023-04-11T17:26:09.525+00:00');

  const s = Math.floor(time / 1000);
  const m = Math.floor(s / 60);

  console.log(m);
}
