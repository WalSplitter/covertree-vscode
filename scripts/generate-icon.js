// Generates resources/icon.png (128x128) using only Node.js built-ins.
const zlib = require('zlib');
const fs = require('fs');
const path = require('path');

const W = 128;
const H = 128;
const buf = Buffer.alloc(W * H * 4, 0); // RGBA, default fully transparent

function px(x, y, r, g, b, a = 255) {
  if (x < 0 || x >= W || y < 0 || y >= H) return;
  const i = (y * W + x) * 4;
  buf[i] = r;
  buf[i + 1] = g;
  buf[i + 2] = b;
  buf[i + 3] = a;
}

function rect(x, y, w, h, r, g, b, a = 255) {
  for (let dy = 0; dy < h; dy++) for (let dx = 0; dx < w; dx++) px(x + dx, y + dy, r, g, b, a);
}

function circle(cx, cy, rad, r, g, b, a = 255) {
  for (let dy = -rad; dy <= rad; dy++)
    for (let dx = -rad; dx <= rad; dx++)
      if (dx * dx + dy * dy <= rad * rad) px(cx + dx, cy + dy, r, g, b, a);
}

function roundRect(x, y, w, h, rx, r, g, b, a = 255) {
  for (let dy = 0; dy < h; dy++) {
    for (let dx = 0; dx < w; dx++) {
      const qx = Math.max(0, Math.abs(x + dx - (x + w / 2)) - (w / 2 - rx));
      const qy = Math.max(0, Math.abs(y + dy - (y + h / 2)) - (h / 2 - rx));
      if (qx * qx + qy * qy <= rx * rx) px(x + dx, y + dy, r, g, b, a);
    }
  }
}

// ── Colors ────────────────────────────────────────────────────────────────
const BG = [13, 17, 23]; // #0d1117
const GR = [63, 185, 80]; // #3fb950  bright green
const GD = [35, 134, 54]; // #238636  darker green

// ── Background ────────────────────────────────────────────────────────────
roundRect(0, 0, 128, 128, 20, ...BG);

// ── Tree: trunk ───────────────────────────────────────────────────────────
rect(61, 74, 6, 42, ...GR);

// ── Tree: center vertical stem ────────────────────────────────────────────
rect(61, 18, 6, 58, ...GR);

// ── Tree: left branch ─────────────────────────────────────────────────────
rect(18, 55, 45, 6, ...GR); // horizontal
rect(18, 32, 6, 25, ...GR); // vertical up

// ── Tree: right branch ────────────────────────────────────────────────────
rect(65, 40, 40, 6, ...GR); // horizontal
rect(99, 18, 6, 24, ...GR); // vertical up

// ── Nodes at tips ─────────────────────────────────────────────────────────
circle(64, 16, 9, ...GR); // top center
circle(21, 30, 8, ...GR); // top left
circle(102, 16, 8, ...GR); // top right

// inner dot (hollow look)
circle(21, 30, 4, ...BG);
circle(102, 16, 4, ...BG);

// ── Root dots ─────────────────────────────────────────────────────────────
const rootY = 118;
for (const rx of [38, 64, 90]) circle(rx, rootY, 5, ...GD);
rect(36, 115, 56, 4, ...GD);
rect(61, 113, 6, 6, ...GD);

// ══════════════════════════════════════════════════════════════════════════
// PNG encode (pure Node.js)
// ══════════════════════════════════════════════════════════════════════════

const CRC_TABLE = (() => {
  const t = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(data) {
  let c = 0xffffffff;
  for (const b of data) c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const tb = Buffer.from(type, 'ascii');
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([tb, data])));
  return Buffer.concat([len, tb, data, crcBuf]);
}

// Raw scanlines: filter-byte 0 + RGBA rows
const raw = [];
for (let y = 0; y < H; y++) {
  raw.push(0);
  for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 4;
    raw.push(buf[i], buf[i + 1], buf[i + 2], buf[i + 3]);
  }
}

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8;
ihdr[9] = 6; // 8-bit RGBA

const out = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  chunk('IHDR', ihdr),
  chunk('IDAT', zlib.deflateSync(Buffer.from(raw))),
  chunk('IEND', Buffer.alloc(0)),
]);

const dest = path.join(__dirname, '..', 'resources', 'icon.png');
fs.writeFileSync(dest, out);
console.log('Created', dest);
