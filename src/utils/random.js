import seedrandom from 'seedrandom'

export default function random(min, max, seed) {
  const rng = seedrandom(seed)
  return Math.floor(rng() * max) + min
};
