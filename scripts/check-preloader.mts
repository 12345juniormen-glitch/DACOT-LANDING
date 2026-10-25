import assert from "node:assert/strict";
import { waitForImage, initialVisualImages } from "../lib/critical-images.ts";

class ImageFixture extends EventTarget {
  complete = false;
  naturalWidth = 0;
  loading = "lazy";
  fetchPriority = "auto";
  decode = () => Promise.resolve();
  listeners = new Set<string>();
  override addEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: AddEventListenerOptions | boolean) {
    this.listeners.add(type); super.addEventListener(type, callback, options);
  }
  override removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean) {
    this.listeners.delete(type); super.removeEventListener(type, callback, options);
  }
}
const asImage = (fixture: ImageFixture) => fixture as unknown as HTMLImageElement;
const cached = new ImageFixture(); cached.complete = true; cached.naturalWidth = 640;
await waitForImage(asImage(cached), new AbortController().signal);
assert.equal(cached.loading, "eager"); assert.equal(cached.fetchPriority, "high");
assert.equal(cached.listeners.size, 0);

const pending = new ImageFixture();
let decoded!: () => void;
pending.decode = () => new Promise<void>((resolve) => { decoded = resolve; });
const controller = new AbortController();
let finished = false;
const loading = waitForImage(asImage(pending), controller.signal).then(() => { finished = true; });
await Promise.resolve(); assert.equal(finished, false, "must not release before load");
pending.naturalWidth = 640; pending.dispatchEvent(new Event("load"));
await Promise.resolve(); assert.equal(finished, false, "must await decode after load");
decoded(); await loading; assert.equal(finished, true); assert.equal(pending.listeners.size, 0);

const broken = new ImageFixture();
const errorWait = waitForImage(asImage(broken), new AbortController().signal);
broken.dispatchEvent(new Event("error")); await errorWait; assert.equal(broken.listeners.size, 0);
const cachedError = new ImageFixture(); cachedError.complete = true;
await waitForImage(asImage(cachedError), new AbortController().signal);
const decodeError = new ImageFixture(); decodeError.complete = true; decodeError.naturalWidth = 100;
decodeError.decode = () => Promise.reject(new Error("decode failed"));
await waitForImage(asImage(decodeError), new AbortController().signal);
const stalled = new ImageFixture(); const abort = new AbortController();
const abortWait = waitForImage(asImage(stalled), abort.signal); abort.abort();
await abortWait; assert.equal(stalled.listeners.size, 0);
await waitForImage(asImage(new ImageFixture()), AbortSignal.abort());

Object.defineProperty(globalThis, "innerHeight", { value: 800, configurable: true });
Object.defineProperty(globalThis, "document", { value: { documentElement: { clientWidth: 390 } }, configurable: true });
const boxes = [
  { width: 250, height: 190, left: 10, right: 260, top: 20, bottom: 210 },
  { width: 250, height: 190, left: 500, right: 750, top: 20, bottom: 210 },
  { width: 250, height: 190, left: 10, right: 260, top: 900, bottom: 1090 },
  { width: 0, height: 0, left: 0, right: 0, top: 0, bottom: 0 },
];
const fixtures = boxes.map((box) => ({ getBoundingClientRect: () => box }));
const root = { querySelectorAll: () => fixtures } as unknown as HTMLElement;
assert.deepEqual(initialVisualImages(root), [fixtures[0]], "only first-viewport images block entry");
console.log("preloader: cache, load/decode, errors, abort cleanup and viewport selection passed");
