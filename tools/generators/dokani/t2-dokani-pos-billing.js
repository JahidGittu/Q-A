// Topic 2: High-Speed POS Billing, Barcode & Thermal Printing (25 Questions: 5 lvl1, 5 lvl2, 5 lvl3, 5 situation, 5 realworld)
module.exports = {
  id: "dokani-pos-fast-billing",
  name: "High-Speed POS Billing, Barcode & Thermal Printing",
  desc: "Keyboard-First UI, Sub-3ms Barcode Scanners, Multi-Tender Split Payments, Hold Cart / Park Sale, ESC/POS Silent Printing, Cash Drawer Kicks",
  items: [
    // --- LEVEL 1 (5 Questions) ---
    {
      lvl: "lvl1",
      q: "Dokani POS-এ 'Keyboard-First Navigation' কেন ক্যাশিয়ারদের বিলিং গতি ৩ গুণ বাড়িয়ে দেয়?",
      m: "খুচরা দোকানে পিক আওয়ারে ক্যাশিয়ারের এক সেকেন্ড সময় অপচয় মানেই পেছনে কাস্টমারদের বিশাল লাইন! মাউস ধরে বাটনে ক্লিক করা অত্যন্ত ধীরগতির। Dokani POS সম্পূর্ণ কীবোর্ড-ফার্স্ট আর্কিটেকচারে তৈরি: (১) `F2`: সরাসরি প্রোডাক্ট সার্চ বা বারকোড স্ক্যানার মোড, (২) `F4`: কাস্টমার সিলেক্ট বা মোবাইল নম্বর সার্চ, (৩) `F7`: ডিসকাউন্ট ডায়ালগ, (৪) `F9`: পেমেন্ট মোডাল ওপেন, (৫) `Enter`: বিল কনফার্ম ও ইনস্ট্যান্ট প্রিন্ট। ক্যাশিয়ারকে একবারও মাউস স্পর্শ করতে হয় না; উভয় হাত কীবোর্ড ও বারকোড স্ক্যানারে রেখে মাত্র ৩ সেকেন্ডে একটি সম্পূর্ণ কাস্টমার চেকআউট শেষ করা যায়।",
      b: "মাউস ব্যবহারের বদলে সম্পূর্ণ কীবোর্ড শর্টকাট (F2, F4, F9, Enter) দিয়ে কাজ করায় ক্যাশিয়ারের বিলিং গতি ৩ গুণ বাড়ে। ক্যাশিয়ার মাউস ছাড়াই ৩ সেকেন্ডে সম্পূর্ণ বিক্রি ও রিসিট প্রিন্ট সম্পন্ন করতে পারে।",
      e: "In high-volume retail rush hours, mouse manipulation creates physical bottlenecks. Dokani POS enforces a keyboard-first navigation paradigm: dedicated hotkeys (F2 Search, F4 Customer, F9 Tender, Enter Finalize) allow cashiers to complete checkouts in under 3 seconds without lifting hands from physical input hardware.",
      tip: "বলো: 'Dokani enforces keyboard-first POS shortcuts so cashiers never need a mouse during peak trading.'"
    },
    {
      lvl: "lvl1",
      q: "বারকোড স্ক্যানার হার্ডওয়্যার কীভাবে ব্রাউজারের সাথে যোগাযোগ করে এবং Dokani কীভাবে এটি রিড করে?",
      m: "ফিজিক্যাল ইউএসবি বা ব্লুটুথ বারকোড স্ক্যানারগুলো অপারেটিং সিস্টেমে 'Human Interface Device (HID) Keyboard' হিসেবে রেজিস্টার হয়। স্ক্যানার দিয়ে বারকোড স্ক্যান করলে সে কম্পিউটারে অতি দ্রুত কি-স্ট্রোক আকারে ডিজিটগুলো টাইপ করে এবং শেষে একটি `Enter (ASCII 13)` কী পাঠায়। Dokani-তে একটি গ্লোবাল কী-লিসেনার থাকে যা অক্ষরের ইনপুট রেট পর্যবেক্ষণ করে (দুটি অক্ষরের মাঝে <30ms সময়) স্ক্যানার শনাক্ত করে। স্ক্যান হওয়ার সাথে সাথে এটি স্বয়ংক্রিয়ভাবে কার্টে প্রোডাক্ট যোগ করে কোয়ান্টিটি ১ বাড়িয়ে দেয়—ইনপুট বক্সে কার্সার থাকুক বা না থাকুক।",
      b: "বারকোড স্ক্যানার ভার্চুয়াল কীবোর্ড হিসেবে কাজ করে দ্রুত ডিজিট পাঠিয়ে শেষে Enter পাঠায়। Dokani গ্লোবাল লিসেনার দিয়ে টাইপিং স্পিড মেপে স্ক্যানার শনাক্ত করে এবং সরাসরি কার্টে প্রোডাক্ট যুক্ত করে।",
      e: "Barcode scanners emulate HID virtual keyboards, firing numeric characters with rapid inter-keystroke timing (<30ms) terminated by a Carriage Return (Enter). Dokani captures window-level events, identifies scanner bursts, and increments cart items without requiring focused input fields.",
      code: "const isScanner = (timeDelta < 30); // Differentiates human typing from laser scanner"
    },
    {
      lvl: "lvl1",
      q: "Dokani POS কার্ট ক্যালকুলেশনে Subtotal, Item Discount, Invoice Discount, VAT/Tax এবং Round-off কীভাবে ক্রমানুসারে হিসেব হয়?",
      m: "হিসাববিজ্ঞানের ধারাবাহিক নিয়ম: (১) প্রতিটি আইটেমের মোট মূল্য = `quantity * sellingPrice`। (২) আইটেম ডিসকাউন্ট বিয়োগ = `itemTotal - itemDiscount`। (৩) সব আইটেম যোগ করে পাওয়া যায় `Subtotal`। (৪) ইনভয়েস ডিসকাউন্ট বিয়োগ: শতাংশ বা ফ্ল্যাট ছাড় বাদ দেওয়া হয়। (৫) ট্যাক্স/ভ্যাট যোগ: নেট অ্যামাউন্টের ওপর প্রযোজ্য ভ্যাট যোগ করা হয় (`netAmount * (taxRate / 100)`)। (৬) `Round-off`: খুচরা পয়সার ঝামেলা এড়াতে দশমিক মানকে নিকটবর্তী পূর্ণসংখ্যায় রাউন্ড করা হয় (যেমন `৫২৭.৪০` টাকা হয়ে যায় `৫২৭.০০` টাকা)। ফাইনাল অ্যামাউন্ট হয় `Grand Total`।",
      b: "প্রথমে আইটেম টোটাল থেকে আইটেম ডিসকাউন্ট বাদ দিয়ে সাব-টোটাল হয়, এরপর ইনভয়েস ডিসকাউন্ট বাদ দিয়ে ভ্যাট যোগ করা হয়। সবশেষে পয়সা বাদ দিতে রাউন্ড-অফ করে গ্র্যান্ড টোটাল নির্ধারণ করা হয়।",
      e: "POS cart math follows strict financial sequencing: Line totals deduct item discounts yielding Subtotal. Invoice-level discounts are subtracted to produce the Net Taxable Amount. Standard VAT/Tax is compounded onto the taxable base. Finally, algorithmic Round-Off eliminates fractional currency fractions to produce the Grand Total.",
      code: "const taxable = subtotal - invoiceDiscount;\nconst vat = taxable * (vatRate / 100);\nconst rawTotal = taxable + vat;\nconst grandTotal = Math.round(rawTotal);\nconst roundOff = grandTotal - rawTotal;"
    },
    {
      lvl: "lvl1",
      q: "Dokani-তে 'Split Payment (মাল্টি-টেন্ডার পেমেন্ট)' কীভাবে কাজ করে?",
      m: "বাস্তব দোকানে কাস্টমার প্রায়ই বলে: 'ভাই আমার কাছে ১,০০০ টাকা ক্যাশ আছে, বাকি ৫০০ টাকা আমি বিকাশে দেব আর ২০০ টাকা আমার খাতায় বাকি লিখে রাখেন!' Dokani POS মাল্টি-টেন্ডার পেমেন্ট সাপোর্ট করে: একটি ইনভয়েসের বিপরীতে একাধিক পেমেন্ট মেথড রেকর্ড করা যায়: `{ cash: 1000, bkash: 500, due: 200 }`। ব্যাকএন্ড ট্রানজ্যাকশনে ক্যাশ অ্যাকাউন্টে ১,০০০ টাকা ক্রেডিট হয়, বিকাশ ব্যাংক অ্যাকাউন্টে ৫০০ টাকা ক্রেডিট হয় এবং কাস্টমারের ডিউ লেজারে ২০০ টাকা ডেবিট হয়। কাস্টমারের সম্পূর্ণ বিল এক ক্লিকেই সুষমভাবে পরিশোধিত হয়ে যায়।",
      b: "স্প্লিট পেমেন্টের মাধ্যমে একজন কাস্টমার একই সাথে ক্যাশ, বিকাশ এবং বকেয়া—একাধিক মাধ্যমে একটি বিল পরিশোধ করতে পারে। সিস্টেম স্বয়ংক্রিয়ভাবে প্রতিটি অ্যাকাউন্টে সঠিক টাকা জমা ও বাকি হিসেবে ভাগ করে দেয়।",
      e: "Split Payment allows customers to settle a single invoice using multiple tender types (e.g. 1000 BDT Cash + 500 BDT bKash + 200 BDT Customer Credit Due). Dokani persists atomic payment allocations across respective financial accounts in a single database transaction.",
      tip: "বলো: 'Split tender payments allocate a single bill across Cash, Mobile Wallets, and Customer Credit ledgers simultaneously.'"
    },
    {
      lvl: "lvl1",
      q: "থার্মাল প্রিন্টারে 58mm বনাম 80mm পেপার সাইজের জন্য CSS Print Styling কীভাবে অপটিমাইজ করা হয়?",
      m: "থার্মাল রিসিটের জন্য স্ট্যান্ডার্ড A4 পেপারের CSS কাজ করে না। আমরা বিশেষ প্রিন্ট মিডিয়া কোয়েরি লিখি: `@media print { @page { size: 58mm auto; margin: 0; } }` (বা 80mm)। ফন্ট হিসেবে মোনোস্পেস ফন্ট (`Courier New` বা `monospace`) ব্যবহার করা হয় যাতে প্রতিটি অক্ষরের প্রস্থ সমান থাকে এবং বাম ও ডানের কলামগুলো নিখুঁতভাবে সোজাসুজি এলাইন থাকে। ব্যাকগ্রাউন্ড কালার বাদ দেওয়া হয়, কালো-সাদা হাই-কন্ট্রাস্ট টেক্সট রাখা হয় এবং বারকোড ইমেজকে ক্রিস্প রেন্ডার করার জন্য `image-rendering: pixelated` ব্যবহার করা হয়।",
      b: "থার্মাল প্রিন্টিংয়ে @media print এবং @page { size: 58mm auto; margin: 0; } ব্যবহার করা হয়। মোনোস্পেস ফন্ট দিয়ে কলামগুলোর অ্যালাইনমেন্ট সোজা রাখা হয় এবং মার্জিন শূন্য করে ক্রিস্প স্লিপ প্রিন্ট নিশ্চিত করা হয়।",
      e: "Thermal receipt printing targets continuous paper rolls via dedicated print CSS: @page { size: 80mm auto; margin: 0; }. Monospace typography guarantees tabular column alignment across item, qty, and price cells, pairing with pixelated image-rendering for sharp 1D barcode scanning.",
      code: "@media print {\n  @page { size: 80mm auto; margin: 0mm; }\n  body { width: 80mm; font-family: monospace; font-size: 12px; margin: 0; }\n  .no-print { display: none !important; }\n}"
    },

    // --- LEVEL 2 (5 Questions) ---
    {
      lvl: "lvl2",
      q: "Dokani-তে 'Hold Cart / Park Sale' ফিচার কীভাবে কাজ করে এবং পিক আওয়ারে কাস্টমার ট্রাফিক জ্যাম কীভাবে দূর করে?",
      m: "পরিস্থিতি: একজন কাস্টমারের ১০টি আইটেম স্ক্যান করার পর সে বলল 'ভাই আমি আরও ২টা বিস্কুট নিয়ে আসছি একটু দাঁড়ান'। পেছনে অন্য কাস্টমারদের লাইন আটকে যায়! Dokani-তে ক্যাশিয়ার একটি শর্টকাট (`F6 - Hold Cart`) প্রেস করে ওই কাস্টমারের অসম্পূর্ণ কার্টটিকে মেমোরিতে হোল্ড বা পার্ক করে রাখে। সাথে সাথে স্ক্রিন ফাঁকা হয়ে যায় এবং ক্যাশিয়ার পেছনের কাস্টমারের বিল করা শুরু করে। আগের কাস্টমার ফিরে এলে `F6` প্রেস করে এক ক্লিকে পার্ক করা কার্টটি আগের সব আইটেম সহ রিস্টোর করে বিল সম্পন্ন করে। এটি দোকানে কোনো বিলম্ব ছাড়া নিরবচ্ছিন্ন লাইন মুভমেন্ট নিশ্চিত করে।",
      b: "হোল্ড কার্ট ফিচার কোনো কাস্টমারের বিল সাময়িক স্থগিত করে মেমোরিতে রেখে পরবর্তী কাস্টমারের বিল করার সুযোগ দেয়। আগের কাস্টমার ফিরে এলে এক ক্লিকে তার কার্ট রিস্টোর করে বিল শেষ করা যায়।",
      e: "Hold Cart / Park Sale resolves checkout counter stalls when shoppers step away. Pressing F6 serializes the in-progress cart into memory/IndexedDB, clearing the register for trailing shoppers. Once the customer returns, pressing F6 restores the exact state for immediate checkout.",
      code: "// Zustand Park Sale action:\nholdCurrentCart: () => set((state) => ({\n  parkedCarts: [...state.parkedCarts, { id: uuid(), items: state.cartItems, time: new Date() }],\n  cartItems: []\n}))"
    },
    {
      lvl: "lvl2",
      q: "বারকোড স্ক্যানিংয়ে 'Duplicate Scan Prevention' (Debouncing) কেন জরুরি এবং ডাবল-স্ক্যান কীভাবে রোধ করবে?",
      m: "ক্যাশিয়ার যখন লেজার স্ক্যানার দিয়ে পণ্যের গায়ে দ্রুত মুভ করে, স্ক্যানারের লেজার একই বারকোড এক সেকেন্ডে ২-৩ বার স্ক্যান করে ফেলতে পারে! যদি সফটওয়্যারে কোনো গার্ড না থাকে, তবে ১টি সাবান স্ক্যান করতে গিয়ে কার্টে ভুলবশত ৩টি সাবান যোগ হয়ে কাস্টমারের অতিরিক্ত বিল হয়ে যাবে! সমাধান: Dokani-তে একটি ২৫০ms থ্রেশহোল্ড ডেবাউন্স লক থাকে: যদি হুবহু একই বারকোড আগের স্ক্যানের ২৫০ মিলিসেকেন্ডের মধ্যে পুনরায় রিসিভ হয়, তবে সিস্টেম পরবর্তী স্ক্যানটি সাইলেন্টলি ইগনোর করে। শুধুমাত্র ভিন্ন বারকোড এলে অথবা ২৫০ms পার হলে তবেই নতুন ইনপুট গ্রহণ করে।",
      b: "স্ক্যানারের লেজার একই পণ্যের গায়ে দুইবার আলো ফেললে ডাবল স্ক্যান হতে পারে। ২৫০ মিলি-সেকেন্ডের ডেবাউন্স লক ব্যবহার করে একই বারকোডের তাৎক্ষণিক দ্বিতীয় স্ক্যান বাতিল করে সঠিক কোয়ান্টিটি নিশ্চিত করা হয়।",
      e: "Laser scanners reading reflective packaging frequently fire the same barcode multiple times within milliseconds. Dokani enforces a 250ms per-barcode debounce guard: identical barcode events occurring within 250ms of each other are suppressed, preventing unintended item duplications.",
      code: "if (lastScannedBarcode === barcode && (Date.now() - lastScanTimestamp < 250)) {\n  return; // Suppress duplicate laser bounce\n}"
    },
    {
      lvl: "lvl2",
      q: "WebUSB এবং WebSerial API ব্যবহার করে ব্রাউজার থেকে সরাসরি থার্মাল প্রিন্টারে কীভাবে র-বাইনারি ESC/POS প্রিন্ট কমান্ড পাঠানো হয়?",
      m: "আধুনিক ব্রাউজারে `navigator.usb` বা `navigator.serial` এপিআই দিয়ে কোনো অপারেটিং সিস্টেম প্রিন্ট ড্রাইভার ছাড়াই সরাসরি ইউএসবি থার্মাল প্রিন্টারের সাথে এন্ডপয়েন্ট কানেকশন খোলা যায়। সেটআপ: (১) প্রিন্টারের সাথে পেয়ার করা (`navigator.usb.requestDevice({ filters: [{ vendorId }] })`)। (২) ক্লেইম ইন্টারফেস করে আউটপুট এন্ডপয়েন্ট ওপেন করা। (৩) টেক্সট এনকোডার দিয়ে রিসিট টেক্সট এবং ESC/POS হেক্স কমান্ডের একটি `Uint8Array` বাইনারি বাফার তৈরি করা। (৪) `device.transferOut(endpointNumber, buffer)` কল করা। মাত্র ২ মিলিসেকেন্ডে কোনো ডায়ালগ ছাড়া সরাসরি পেপারে প্রিন্ট হয়ে যায়! ব্রাউজারের প্রিন্ট ডায়ালগ চিরতরে বাইপাস হয়।",
      b: "WebUSB বা WebSerial এপিআই দিয়ে ব্রাউজার সরাসরি থার্মাল প্রিন্টারে বাইনারি ESC/POS কমান্ড পাঠাতে পারে। ফলে কোনো উইন্ডোজ প্রিন্ট ডায়ালগ ছাড়াই বিদ্যুৎ গতিতে রিসিট প্রিন্ট বের হয়ে আসে।",
      e: "WebUSB and WebSerial APIs permit client-side web applications to communicate directly with thermal printer USB endpoints via navigator.usb. Sending Uint8Array buffers containing raw ESC/POS byte sequences executes silent, sub-5ms receipt printing bypassing the operating system print spooler.",
      code: "const data = new Uint8Array([...ESC_INIT, ...textBytes, ...PAPER_CUT]);\nawait usbDevice.transferOut(endpointNumber, data);"
    },
    {
      lvl: "lvl2",
      q: "Dokani POS-এ 'Customer Search & Loyalty Points' ইন্টিগ্রেশন কীভাবে চেকআউটের গতি না কমিয়ে নির্বিঘ্নে সম্পন্ন হয়?",
      m: "ক্যাশিয়ার যখন `F4` চেপে কাস্টমারের মোবাইল নম্বরের প্রথম ৩-৪টি ডিজিট টাইপ করে (যেমন `0171`), ফ্রন্টএন্ড লোকাল ক্যাশ ও ডেবউন্সড এপিআই দিয়ে কাস্টমার শনাক্ত করে। কাস্টমার সিলেক্ট হওয়া মাত্রই তার বর্তমান বাকি ব্যালেন্স এবং লয়্যালটি পয়েন্ট স্ক্রিনে ভেসে ওঠে। পয়েন্ট ভাঙিয়ে ডিসকাউন্ট দিতে চাইলে এক ক্লিকে পয়েন্ট ডিডাক্ট হয়। পুরো প্রক্রিয়াটি অপটিমাইজড মেমোরি সার্চের মাধ্যমে করা হয় যাতে ক্যাশিয়ারের বিলিং গতিতে বিন্দুমাত্র ল্যাগ না পড়ে।",
      b: "মোবাইল নম্বরের ৩ ডিজিট টাইপ করলেই কাস্টমারের নাম, বাকি টাকা এবং লয়্যালটি পয়েন্ট চলে আসে। এক ক্লিকে পয়েন্ট ভাঙিয়ে ডিসকাউন্ট দেওয়া যায় কোনো বিলিং বিলম্ব ছাড়াই।",
      e: "Customer resolution integrates debounced search on mobile digits (F4 shortcut). Selecting a customer surfaces real-time ledger dues and accumulated loyalty point balances, permitting instant point-to-discount redemptions without interrupting checkout velocity.",
      tip: "বলো: 'F4 customer search surfaces credit dues and loyalty balances instantly via debounced phone lookups.'"
    },
    {
      lvl: "lvl2",
      q: "Dokani-তে প্রোডাক্টের ওজনের ওপর ভিত্তি করে বারকোড রিডিং (Weighing Scale Barcode / Price-Embedded Barcodes) কীভাবে কাজ করে?",
      m: "সুপারশপ ও গ্রোসারি দোকানে ফলমূল বা মাংস ডিজিটাল স্কেলে মেপে স্টিকার বারকোড মারা হয়। এই বারকোডগুলো প্রমিত EAN-13 ফরম্যাট অনুসরণ করে (যেমন `21 PPPP WWWWW C`): (১) প্রথম ২ ডিজিট `21` নির্দেশ করে এটি একটি ওয়েট-স্কেল বারকোড। (২) পরবর্তী ৪ ডিজিট `PPPP` হলো প্রোডাক্টের নির্দিষ্ট আইডি বা পিএলইউ (PLU) কোড। (৩) পরবর্তী ৫ ডিজিট `WWWWW` হলো পণ্যের সুনির্দিষ্ট ওজন গ্রামে (যেমন `01500` মানে ১.৫ কেজি) অথবা মোট দাম। Dokani-র বারকোড পার্সার এই স্ট্রিং ভেঙে সরাসরি নির্দিষ্ট আপেল প্রোডাক্টটি শনাক্ত করে এবং কোয়ান্টিটি স্বয়ংক্রিয়ভাবে `১.৫ কেজি` বসিয়ে নিখুঁত প্রাইস ক্যালকুলেট করে।",
      b: "ডিজিটাল স্কেলের বারকোডে প্রোডাক্ট কোডের সাথে ওজন (যেমন ১.৫ কেজি) যুক্ত থাকে। Dokani বারকোড পার্সার স্ট্রিং ডিকোড করে স্বয়ংক্রিয়ভাবে সঠিক ওজন ও দাম কার্টে বসিয়ে দেয়।",
      e: "Price/Weight-embedded barcodes follow EAN-13 standards (prefix 20-29). Dokani's barcode engine parses the 13 digits, extracting the product PLU identifier and decoding the weight in grams (e.g. 01500 = 1.500 kg), automatically scaling the cart item quantity and line price.",
      code: "// EAN-13 Weight Parser:\nconst plu = barcode.substring(2, 6);\nconst weightGrams = parseInt(barcode.substring(6, 11), 10);\nconst quantityKg = weightGrams / 1000;"
    },

    // --- LEVEL 3 (5 Questions) ---
    {
      lvl: "lvl3",
      q: "POS Checkout State Management: Zustand দিয়ে Dokani-র কার্ট আর্কিটেকচার কীভাবে ডিজাইন করা হয়েছে যাতে হাই-স্পিড টাইপিংয়েও কোনো রি-রেন্ডার ড্রপ না হয়?",
      m: "React-এর সাধারণ `useState` দিয়ে বড় কার্ট বানালে প্রতিটি স্ক্যানে প্যারেন্ট ও সমস্ত কার্ট আইটেম অপ্রয়োজনীয়ভাবে রি-রেন্ডার হয়ে ফ্রেম রেট ৬০ FPS থেকে কমে ল্যাগ করে। Dokani-তে `Zustand` দিয়ে একটি পারফরম্যান্ট গ্লোবাল স্টোর তৈরি করা হয়েছে: (১) প্রতিটি কার্ট আইটেম একটি মেমোইজড কম্পোনেন্ট (`React.memo`) যা শুধুমাত্র নিজের কোয়ান্টিটি বদলালে রি-রেন্ডার হয়। (২) সাব-টোটাল ও ট্যাক্স ক্যালকুলেশন মেমোইজড সিলেক্টর (`useCartStore(selectCartTotals)`) দিয়ে বের করা হয়, ফলে শুধু টোটাল সেকশন রি-রেন্ডার হয়। (৩) স্ক্যানারের ইনপুট সরাসরি গ্লোবাল স্টোরের মিউটেশন ফাংশনে হিট করে। ফলে ১০০টি আইটেমের কার্টেও ইন্টারফেস মাখনের মতো মসৃণ ও তাত্ক্ষণিক থাকে।",
      b: "Zustand এবং React.memo ব্যবহার করে কার্ট কম্পোনেন্টগুলো অপটিমাইজ করা হয়েছে। প্রতিটি স্ক্যানে পুরো পেজ রি-রেন্ডার না হয়ে শুধু নির্দিষ্ট আইটেম আপডেট হয়, ফলে ১০০ আইটেমের কার্টেও কোনো ল্যাগ থাকে না।",
      e: "Standard useState triggers catastrophic component tree re-renders during high-speed barcode scanning. Dokani implements Zustand with atomic selectors and React.memo line items. Only mutated quantities and grand total displays re-render, preserving a solid 60 FPS under intensive checkout bursts.",
      code: "export const useCartStore = create<CartState>((set, get) => ({\n  items: [],\n  addItem: (product) => set((state) => { /* Atomic mutation */ }),\n  totals: () => computeTotals(get().items)\n}));"
    },
    {
      lvl: "lvl3",
      q: "ESC/POS Thermal Printing আর্কিটেকচার: বাংলা টেক্সট (Unicode Bangla) থার্মাল প্রিন্টারে প্রিন্ট করার জটিলতা এবং ক্যানভাস বিটম্যাপ দিয়ে Dokani কীভাবে এটি সমাধান করেছে?",
      m: "থার্মাল প্রিন্টারগুলোর অভ্যন্তরীণ ফার্মওয়্যার কেবল ASCII এবং চীনা/ইংরেজি ক্যারেক্টার সেট চেনে—তাদের ফার্মওয়্যারে কোনো ইউনিকোড বাংলা ফন্ট থাকে না! আপনি যদি সরাসরি বাংলা টেক্সট প্রিন্টারে পাঠান, তবে প্রিন্টার অর্থহীন হিজিবিজি অক্ষর (`??????`) প্রিন্ট করবে। Dokani-র বৈপ্লবিক সমাধান: (১) আমরা রিসিটের বাংলা অংশটি (দোকানের নাম, আইটেম ও ঠিকানা) ব্রাউজারের মেমোরিতে একটি অদৃশ্য HTML5 `<canvas>`-এ রেন্ডার করি। (২) ক্যানভাস থেকে পিক্সেলেটেড ব্ল্যাক-অ্যান্ড-হোয়াইট মোনোক্রোম বিটম্যাপ (Monochrome 1-bit Bitmap) জেনারেট করি। (৩) বিটম্যাপটিকে ESC/POS রাস্টার ইমেজ কমান্ডে (`GS v 0` বা `ESC *`) রূপান্তর করে প্রিন্টারে পাঠাই। এর ফলে প্রিন্টার কোনো ফন্ট ছাড়াই যেকোনো বাংলা টেক্সট নিখুঁত ক্রিস্প গ্রাফিক্স আকারে প্রিন্ট করে দেয়!",
      b: "থার্মাল প্রিন্টারে বাংলা ফন্ট না থাকায় ইউনিকোড বাংলা সাপোর্ট করে না। Dokani ক্যানভাসে বাংলা টেক্সট রেন্ডার করে সেটিকে ব্ল্যাক-অ্যান্ড-হোয়াইট বিটম্যাপ ইমেজে রূপান্তর করে প্রিন্টারে পাঠায়, ফলে স্পষ্ট ও নিখুঁত বাংলা প্রিন্ট পাওয়া যায়।",
      e: "Thermal printers lack native Unicode Bengali font tables in hardware firmware, corrupting direct Bengali strings. Dokani renders the receipt layout onto an off-screen HTML5 Canvas, rasterizes the pixels into a 1-bit monochrome bitmap, and dispatches it via the ESC/POS GS v 0 raster bit-image command, delivering crisp Bengali typography.",
      tip: "বাংলা থার্মাল প্রিন্টিংয়ের এই Canvas-to-ESC/POS বিটম্যাপ টেকনিক ইন্টারভিউয়ারের কাছে অত্যন্ত ইউনিক ও আকর্ষণীয় লাগবে।"
    },
    {
      lvl: "lvl3",
      q: "Dokani POS-এ ইনভেন্টরি স্টক হিস্ট্রি ও মুভমেন্ট লেজার: প্রতিটি বিক্রির সাথে সাথে কীভাবে রিয়েল-টাইম স্টক লেজার মেইনটেইন হয়?",
      m: "দোকানিতে কোনো প্রোডাক্টের স্টক পরিবর্তনকে কেবল একটি সংখ্যা হিসেবে আপডেট করা হয় না, বরং একটি সম্পূর্ণ ইমিউটেবল `inventory_movements` লেজার টেবিলে প্রতিটি মুভমেন্ট রেকর্ড করা হয়। যখন একটি বিক্রি সম্পন্ন হয়: `INVOICE_SALE` টাইপে একটি রেকর্ড তৈরি হয় যাতে থাকে: `product_id`, `branch_id`, `quantity_delta: -2`, `reference_id: invoiceId`, এবং `current_balance`। এর ফলে ওনার যেকোনো সময় দেখতে পারেন ঠিক কোন সেকেন্ডে কোন ইনভয়েস, রিটার্ন বা ড্যামেজের কারণে প্রোডাক্টের স্টক কমেছে—কোনো অদৃশ্য স্টক হারানোর সুযোগ থাকে না।",
      b: "স্টক শুধু কমানো হয় না, বরং inventory_movements লেজার টেবিলে প্রতিটি পরিবর্তনের ইতিহাস সংরক্ষণ করা হয়। ফলে কোন বিক্রিতে বা ড্যামেজে কত স্টক কমেছিল তা চিরতরে অডিট ট্রেইলে সংরক্ষিত থাকে।",
      e: "Dokani maintains an immutable inventory_movements ledger recording every stock mutation with direction, timestamp, operator ID, and reference entity (SALE, PURCHASE, DAMAGE, RETURN). Storing previous and resulting balances provides a 100% auditable inventory ledger.",
      code: "await tx.inventoryMovement.create({\n  data: {\n    productId: item.productId,\n    type: 'SALE',\n    quantity: -item.quantity,\n    referenceId: invoice.id,\n    balanceAfter: newStock\n  }\n});"
    },
    {
      lvl: "lvl3",
      q: "POS টার্মিনাল ক্লায়েন্ট ও সার্ভারের মধ্যে নেটওয়ার্ক ডিসকানেকশন রিকভারি: ডুপ্লিকেট ইনভয়েস সাবমিশন রোধে Idempotency Key কীভাবে কাজ করে?",
      m: "ক্যাশিয়ার 'Complete Sale' বাটনে চাপ দিল। ব্যাকএন্ডে ইনভয়েস সেভ হলো কিন্তু ফিরতি রেসপন্স আসার ঠিক আগের মুহূর্তে দোকানের ওয়াইফাই ড্রপ করল! ক্যাশিয়ার ভাবল বিল হয়নি, তাই সে ইন্টারনেট আসার পর আবার সাবমিট করল। কোনো গার্ড না থাকলে একই বিল ২ বার সেভ হবে এবং কাস্টমারের ব্যালেন্স ও ইনভেন্টরি ২ বার কাটা যাবে! সমাধান: ফ্রন্টএন্ড প্রতিটি চেকআউট শুরু করার সাথে সাথে একটি ক্রিপ্টোগ্রাফিক UUID `idempotency_key` তৈরি করে। ব্যাকএন্ড এপিআই এই কি-টি ডেটাবেজে ইউনিক কনস্ট্রেইন্টে সেভ করে। যদি একই কি নিয়ে দ্বিতীয়বার রিকোয়েস্ট আসে, ডেটাবেজ ডুপ্লিকেট বিক্রি তৈরি না করে সাইলেন্টলি পূর্বের তৈরি হওয়া ইনভয়েসটিই ফেরত দেয়।",
      b: "ওয়াইফাই ড্রপের কারণে ক্যাশিয়ার দুইবার সাবমিট চাপলে যাতে দুইবার বিল না হয়, সেজন্য ফ্রন্টএন্ড থেকে Idempotency Key পাঠানো হয়। ব্যাকএন্ড ডুপ্লিকেট কি দেখে দ্বিতীয়বার বিল না করে পূর্বের তৈরি হওয়া বিলটিই সেফলি রিটার্ন করে।",
      e: "If network packets drop after server persistence, cashiers re-submit checkouts. Dokani prevents duplicate billing by attaching client-generated UUID Idempotency Keys to checkout payloads. The backend asserts uniqueness; duplicate keys safely return the cached committed invoice without deducting duplicate stock.",
      code: "// Client generates idempotency key:\nconst idempotencyKey = crypto.randomUUID();\nawait api.post('/invoices', { ...payload, idempotencyKey });"
    },
    {
      lvl: "lvl3",
      q: "Dokani-তে প্রোডাক্ট রিটার্ন ও রিফান্ড (Return / Refund Workflow) কীভাবে মূল ইনভয়েস ও অ্যাকাউন্টের সাথে সিঙ্ক হয়?",
      m: "পণ্য ফেরতের নিয়ম: (১) কাস্টমার মূল ইনভয়েস নিয়ে আসলে ক্যাশিয়ার বারকোড স্ক্যান করে মূল ইনভয়েস খুঁজে বের করে। (২) যে নির্দিষ্ট আইটেমটি ফেরত এসেছে তার কোয়ান্টিটি সিলেক্ট করা হয়। (৩) সিস্টেমে একটি নেগেটিভ ক্রেডিট এন্ট্রি তৈরি হয়: ইনভেন্টরিতে ফেরত আসা প্রোডাক্টের স্টক অ্যাটমিকালি পুনরায় যোগ হয় (`+1`)। (৪) কাস্টমার যদি ক্যাশ রিফান্ড চায়, ক্যাশ ড্রয়ার থেকে টাকা কমে; আর যদি কাস্টমার অন্য পণ্য নিতে চায় তবে রিফান্ড অ্যামাউন্ট নতুন ইনভয়েসের সাথে ক্রেডিট অ্যাডজাস্টমেন্ট হিসেবে সেট হয়ে যায়। মূল ইনভয়েসের স্ট্যাটাস আপডেট হয়ে `PARTIALLY_REFUNDED` বা `REFUNDED` মার্ক হয়।",
      b: "পণ্য ফেরতের ক্ষেত্রে মূল ইনভয়েস থেকে আইটেম রিটার্ন করা হয়, স্বয়ংক্রিয়ভাবে ইনভেন্টরিতে স্টক পুনরায় যোগ হয় এবং ক্যাশ ফেরত বা নতুন পণ্যের সাথে ব্যালেন্স অ্যাডজাস্ট করে নিখুঁত হিসাব রক্ষা করা হয়।",
      e: "Returns link directly to historical invoices. Returning items atomically restores physical inventory stock in branch_stocks, dispatches a negative inventory movement record, decrements the active shift's cash drawer, and flags the parent invoice as PARTIALLY_REFUNDED with audit logs.",
      tip: "বলো: 'Returns atomically restock inventory while updating the parent invoice state and ledger adjustments.'"
    },

    // --- SITUATION BASED (5 Questions) ---
    {
      lvl: "situation",
      q: "পরিস্থিতি: একটি গ্রোসারি দোকানে ক্যাশিয়ার ভুলবশত একটি ১০ টাকার চকলেটের কোয়ান্টিটি ১-এর জায়গায় ১০০ লিখে ইনভয়েস কনফার্ম করে ফেলেছে! প্রিন্টার থেকে স্লিপ বের হওয়ার পর কাস্টমার ভুল দেখে চিৎকার করছে। তুমি কীভাবে এই ভুল সংশোধন করবে?",
      m: "সংশোধন প্রক্রিয়া: (১) ক্যাশিয়ার নিজে কোনো ইনভয়েস সরাসরি এডিট বা ডিলিট করতে পারবে না (সিকিউরিটি পলিসি)। (২) ক্যাশিয়ার 'Sales Return / Adjustment' অপশনে গিয়ে ম্যানেজার বা ওনারের পিন কোড ইনপুট করবে। (৩) সিস্টেমে ৯৯টি অতিরিক্ত চকলেটের একটি `RETURN_ADJUSTMENT` ট্রানজ্যাকশন এন্ট্রি হবে। (৪) ৯৯টি চকলেটের স্টক ডেটাবেজে স্বয়ংক্রিয়ভাবে ফেরত যুক্ত হবে (`+99`)। (৫) ৯৯০ টাকা ক্যাশ ড্রয়ার থেকে কাস্টমারকে রিফান্ড করা হবে। (৬) সিস্টেম একটি সংশোধিত কারেকশন স্লিপ প্রিন্ট করবে। পুরো অডিট ট্রেইলে স্পষ্ট থাকবে ভুলটি কে করেছিল এবং কে অ্যাপ্রুভ করেছে—কোনো অডিট গরমিল ছাড়াই হিসাব শতভাগ মিলে যাবে।",
      b: "ম্যানেজার পিন ভেরিফিকেশন দিয়ে ৯৯টি অতিরিক্ত আইটেমের রিটার্ন অ্যাডজাস্টমেন্ট সম্পন্ন করব। ৯৯টি চকলেটের স্টক স্বয়ংক্রিয়ভাবে পুলে ফেরত যাবে এবং কাস্টমারকে টাকা রিফান্ড করে সংশোধিত স্লিপ দেওয়া হবে।",
      e: "Because direct invoice deletion is prohibited, resolve via an authorized Return Adjustment. The manager authenticates via PIN, the POS issues a 99-unit return, restoring 99 chocolates to inventory stock, refunding 990 BDT from the cash drawer, and printing an auditable credit slip.",
      tip: "বলো: 'Resolve cashier input errors through authorized Manager PIN Return Adjustments, never raw database deletion.'"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: থার্মাল প্রিন্টারে হঠাৎ পেপার জ্যাম হয়ে প্রিন্ট আটকে গেল এবং পেপার ছিঁড়ে গেল। কিন্তু সফটওয়্যারে বিল অলরেডি কনফার্ম হয়ে গেছে। ক্যাশিয়ার কীভাবে কাস্টমারকে ডুপ্লিকেট স্টক না কেটে পুনরায় রিসিট প্রিন্ট করে দেবে?",
      m: "সমাধান: Dokani-তে প্রতিটি সম্পন্ন হওয়া ইনভয়েসের জন্য একটি 'Reprint Receipt' বাটন থাকে। ক্যাশিয়ার পিওএস স্ক্রিনের 'Recent Invoices' ট্যাব থেকে অথবা শর্টকাট চেপে সর্বশেষ ইনভয়েসটি ওপেন করবে এবং 'Reprint' চাপবে। প্রিন্টার ড্রাইভার ডেটাবেজে কোনো নতুন ট্রানজ্যাকশন বা স্টক ডিডাকশন না করে শুধুমাত্র পূর্বের রিসিটের মেমোরি ডেটা পুনরায় থার্মাল প্রিন্টারে পাঠাবে এবং রিসিটের ওপরে স্পষ্ট করে `[DUPLICATE REPRINT]` সিল প্রিন্ট করে দেবে যাতে কোনো কাস্টমার একই রিসিট দুইবার দেখিয়ে প্রতারণা করতে না পারে।",
      b: "রিসেন্ট ইনভয়েস থেকে কোনো নতুন স্টক না কেটে শুধুমাত্র পূর্ববর্তী ইনভয়েসের রিসিট পুনরায় প্রিন্ট করা হয় এবং রিসিটের মাথায় [DUPLICATE REPRINT] লিখে দেওয়া হয়।",
      e: "Execute a idempotent Reprint from the Recent Sales tab. The reprint action dispatches cached invoice layout data to the printer spool without triggering database mutations or stock deductions, watermarking the printed receipt with [DUPLICATE REPRINT] to prevent fraud.",
      code: "// Reprint dispatches cached invoice payload with duplicate flag:\nawait printReceipt(lastInvoice, { isDuplicate: true });"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: একটি পোশাকের দোকানে একজন কাস্টমার বারকোড স্টিকারটি হাত দিয়ে নষ্ট করে ফেলেছে, ফলে স্ক্যানার দিয়ে স্ক্যান করা যাচ্ছে না। ক্যাশিয়ার কীভাবে দ্রুত বিল সম্পন্ন করবে?",
      m: "সমাধান: স্ক্যানার কাজ না করলেও ক্যাশিয়ারের বিলিং আটকে থাকবে না! Dokani-তে অল্টারনেটিভ সার্চ অপশন রয়েছে: (১) ক্যাশিয়ার `F2` প্রেস করে ইনস্ট্যান্ট সার্চ বারে প্রোডাক্টের নাম (যেমন 'Polo Shirt Black L') বা SKU কোডের ২-৩টি অক্ষর টাইপ করবে। (২) ফ্রন্টএন্ডের ইন-মেমোরি ফাজি সার্চ (Fuzzy Search) মুহূর্তের মধ্যে ম্যাচিং প্রোডাক্টের তালিকা নিয়ে আসবে। (৩) ক্যাশিয়ার কীবোর্ডের `Down Arrow` দিয়ে সিলেক্ট করে `Enter` চাপলেই প্রোডাক্ট কার্টে যোগ হয়ে যাবে। কোনো বারকোড ছাড়াই মাত্র ২ সেকেন্ডে বিলিং সম্পন্ন হবে।",
      b: "F2 চেপে প্রোডাক্টের নাম বা SKU লিখে সার্চ করলেই ফাজি সার্চ দিয়ে পণ্যটি চলে আসে। কীবোর্ডের অ্যারো কি দিয়ে সিলেক্ট করে এন্টার চাপলেই প্রোডাক্টটি কার্টে যোগ হয়ে যায়।",
      e: "When physical barcodes are defaced, the cashier hits F2 to toggle Keyboard Fuzzy Search. Typing partial product names or SKU codes queries the local in-memory catalog, allowing instant selection via Arrow Keys and Enter in seconds.",
      tip: "বলো: 'F2 in-memory fuzzy search provides instant fallback when physical barcodes are damaged.'"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: একটি ব্যস্ত রেস্তোরাঁ বা ক্যাফেতে ক্যাশিয়ার যখন বিক্রি করছে, তখন একই সাথে কিচেনে রাঁধুনিদের কাছে 'Kitchen Order Ticket (KOT)' প্রিন্ট হতে হবে এবং ক্যাশিয়ারের ডেস্কে মূল কাস্টমার স্লিপ প্রিন্ট হতে হবে। Dokani-তে কীভাবে মাল্টি-প্রিন্টার রাউটিং করবে?",
      m: "মাল্টি-প্রিন্টার রাউটিং সলিউশন: Dokani-তে ক্যাটাগরি-বেসড প্রিন্টার রাউটিং কনফিগারেশন থাকে। (১) ক্যাশিয়ারের লোকাল প্রিন্টার (USB) ডিফল্ট 'Cashier Receipt Printer' হিসেবে রেজিস্টার থাকে। (২) কিচেনের থার্মাল প্রিন্টারটি লোকাল ওয়াইফাই/ল্যান আইপিতে (`192.168.1.200:9100`) যুক্ত থাকে। (৩) ক্যাশিয়ার যখন বিল কনফার্ম করে, Dokani কার্টটিকে দুটি ভাগে ভাগ করে: পানীয় ও খাবারের আইটেমগুলো নিয়ে একটি KOT টিকেট তৈরি করে সরাসরি ল্যান সকেটে কিচেন প্রিন্টারে পাঠায় এবং ক্যাশিয়ারের প্রিন্টারে সম্পূর্ণ ইনভয়েস প্রিন্ট করে ক্যাশ ড্রয়ার খুলে দেয়।",
      b: "Dokani-তে মাল্টি-প্রিন্টার রাউটিং কনফিগার করা যায়। বিল কনফার্মের সাথে সাথে ক্যাশিয়ারের ইউএসবি প্রিন্টারে মূল রিসিট এবং কিচেনের ল্যান প্রিন্টারে কিচেন অর্ডার টিকিট (KOT) সমান্তরালে প্রিন্ট হয়।",
      e: "Configure multi-printer routing based on product categories. Upon checkout, Dokani forks the print payload: sending raw ESC/POS KOT tickets to the kitchen printer over network TCP sockets (port 9100) while driving the customer receipt and cash drawer kick through the local counter USB printer.",
      code: "// Dual-print dispatch:\nawait Promise.all([\n  printCustomerReceipt(invoice, usbPrinter),\n  printKitchenKOT(kitchenItems, '192.168.1.200:9100')\n]);"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: ফ্রন্টএন্ডে পিওএস ইন্টারফেসে কার্টে ৫০টি আইটেম যোগ করার পর ব্রাউজারের ট্যাবটি ভুলবশত ক্রস লেগে বন্ধ হয়ে গেল! ক্যাশিয়ার হাহাকার করছে। কীভাবে ট্যাব পুনরায় ওপেন করলে কার্টের সমস্ত আইটেম অক্ষত ফিরিয়ে আনবে?",
      m: "সমাধান: Dokani-র কার্ট স্টেট স্বয়ংক্রিয়ভাবে ব্রাউজারের `localStorage` বা `IndexedDB`-তে রিয়েলটাইমে পারসিস্ট করা থাকে (Zustand `persist` মিডলওয়্যার)। ক্যাশিয়ার যখনই ব্রাউজার বা ট্যাব পুনরায় ওপেন করবে, Zustand স্টোর স্বয়ংক্রিয়ভাবে লোকাল স্টোরেজ থেকে পূর্বে সিলেক্ট করা ৫০টি আইটেম, তাদের কোয়ান্টিটি, কাস্টমার সিলেকশন এবং ডিসকাউন্ট মেমোরিতে রিহাইড্রেট করে ঠিক আগের অবস্থায় স্ক্রিন ফিরিয়ে আনবে। ক্যাশিয়ারের কোনো ডেটা হারাবে না এবং সে সাথে সাথে 'Print' দিয়ে বিল সম্পন্ন করতে পারবে।",
      b: "Zustand persist মিডলওয়্যারের মাধ্যমে কার্ট স্বয়ংক্রিয়ভাবে লোকাল স্টোরেজে সেভ থাকে। ব্রাউজার বন্ধ হয়ে গেলেও পুনরায় ওপেন করলে ৫০টি আইটেম ঠিক আগের অবস্থায় কার্টে ফেরত চলে আসে।",
      e: "Dokani integrates Zustand persist middleware backed by localStorage/IndexedDB. Unintended browser tab crashes or closures preserve cart state; reopening the browser rehydrates the full 50 items, customer selections, and discounts instantaneously.",
      code: "export const useCartStore = create(\n  persist((set) => ({ ...cartState }), { name: 'dokani-active-cart' })\n);"
    },

    // --- REAL WORLD (5 Questions) ---
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা (Dokani SaaS): Dokani-তে পিওএস চেকআউট ল্যাটেন্সি সাব-৩ মিলিসেকেন্ডে নামিয়ে আনতে কী কী ফ্রন্টএন্ড ও ডেটাবেজ অপটিমাইজেশন করা হয়েছে?",
      m: "দোকানি পিওএসে সাব-৩ms ল্যাটেন্সি অর্জনের পূর্ণাঙ্গ কৌশল: (১) `Frontend In-Memory Cache`: লগইনের সাথে সাথে দোকানের সম্পূর্ণ প্রোডাক্ট ক্যাটালগ ক্লায়েন্ট ব্রাউজারের মেমোরিতে `Map<Barcode, Product>` হ্যাশ ম্যাপে লোড থাকে, ফলে বারকোড স্ক্যান সম্পূর্ণ শূন্য মিলিসেকেন্ডে কার্টে যোগ হয়। (২) `Database Compound Indexes`: ইনভয়েস ও প্রোডাক্ট টেবিলে `(tenant_id, barcode)` এবং `(tenant_id, branch_id)` B-Tree ইনডেক্স নিশ্চিত করা। (৩) `Atomic Interactive Transaction`: ডেটাবেজ ট্রানজ্যাকশন ব্যাচ আকারে এক রাউন্ড-ট্রিপে সম্পন্ন হয়। (৪) `Decoupled BullMQ`: প্রিন্ট রেন্ডারিং ও এসএমএস ব্যাকগ্রাউন্ডে অফলোড করা। ফলে ক্যাশিয়ারের সামনে কোনো দৃশ্যমান ল্যাগই থাকে না।",
      b: "দোকানিতে ব্রাউজার মেমোরিতে ক্যাটালগ ক্যাশিং, কম্পাউন্ড ইনডেক্সযুক্ত পোস্টগ্রেস কুয়েরি এবং ব্যাকগ্রাউন্ডে এসএমএস অফলোড করে সাব-৩ মিলি-সেকেন্ড চেকআউট গতি নিশ্চিত করা হয়েছে।",
      e: "Achieving sub-3ms POS latencies in Dokani involves: in-memory JavaScript Map lookups for client-side barcode matching, compound database B-Tree indexes on (tenant_id, barcode), single-roundtrip batch SQL updates, and offloading receipt rendering to background BullMQ workers.",
      tip: "দোকানির এই সাব-৩ms আর্কিটেকচার ইন্টারভিউয়ারকে নিশ্চিত করবে যে তুমি পারফরম্যান্স টিউনিংয়ের একজন বিশেষজ্ঞ।"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: পাইকারি দোকানে 'বাকির খাতা' (Customer Khata): Dokani-তে এসএমএস নোটিফিকেশন সহ বাকি ট্র্যাকিং কীভাবে অটোমেট করা হয়েছে?",
      m: "বাংলাদেশের খুচরা ও পাইকারি দোকানের প্রাণ হলো বাকির খাতা। Dokani-তে কাস্টমার বাকি রাখলে: (১) কাস্টমার সিলেক্ট করে পেমেন্টে 'Due' অ্যামাউন্ট এন্ট্রি করা হয়। (২) ডেটাবেজে কাস্টমারের লেজারে বাকি যুক্ত হয় এবং আগের বকেয়ার সাথে যোগ হয়ে মোট বাকি হিসেব হয়। (৩) ট্রানজ্যাকশন শেষ হওয়া মাত্রই ব্যাকগ্রাউন্ড সার্ভিস কাস্টমারের মোবাইলে বাংলা এসএমএস পাঠায়: 'জনাব রহিম, আপনার আজকের বাকি ৫০০ টাকা। মোট বকেয়া ৩,২০০ টাকা। ধন্যবাদ, অ্যারোমা স্টোর।' (৪) ড্যাশবোর্ডে ওনার এক ক্লিকে 'Send Due Reminder' চাপলে সব বাকিদারদের কাছে বকেয়া পরিশোধের তাগাদা এসএমএস চলে যায়। এটি মার্চেন্টদের বকেয়া আদায় ৪০% বাড়িয়ে দিয়েছে!",
      b: "দোকানিতে কাস্টমার বাকি রাখলে স্বয়ংক্রিয়ভাবে তার লেজার আপডেট হয় এবং কাস্টমারের মোবাইলে মোট বকেয়া উল্লেখ করে স্বয়ংক্রিয় বাংলা এসএমএস চলে যায়। এক ক্লিকে বকেয়া পরিশোধের রিমাইন্ডার পাঠানো যায়।",
      e: "Dokani digitizes traditional customer credit ledgers ('Khata'). When sales conclude on credit, customer receivable ledgers update atomically, triggering an automated branded Bengali SMS via BullMQ notifying the customer of today's credit and total outstanding dues. Merchants can dispatch bulk SMS due reminders in one click.",
      tip: "বলো: 'Automated Bengali SMS reminders upon credit checkout increased merchant due recovery rates by over 40%.'"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: Dokani-তে ক্যাশ ড্রয়ার শিফট ম্যানেজমেন্ট (Shift Management / X-Report & Z-Report) কীভাবে হিসাববিজ্ঞান রক্ষা করে?",
      m: "দোকানি পিওএসে ক্যাশিয়ারদের শিফট সিস্টেমে কাজ করে: (১) `Shift Start`: ক্যাশিয়ার সকালে বসার সময় বাক্সে কত প্রারম্ভিক খুচরা টাকা (`Opening Cash`, যেমন ২,০০০ টাকা) ছিল তা ইনপুট দিয়ে শিফট শুরু করে। (২) `Shift Running (X-Report)`: শিফট চলাকালীন ক্যাশিয়ার যেকোনো সময় একটি 'X-Report' প্রিন্ট করতে পারে যা চলমান সেলস, ক্যাশ ও ডিজিটাল পেমেন্টের সামারি দেখায় কিন্তু শিফট ক্লোজ করে না। (৩) `Shift Close (Z-Report)`: শিফট শেষে ক্যাশিয়ার বাক্সের আসল ক্যাশ গুনে ইনপুট দেয়। সিস্টেম চূড়ান্ত 'Z-Report' প্রিন্ট করে—যেখানে মোট বিক্রি, এক্সপেক্টেড ক্যাশ, অ্যাকচুয়াল ক্যাশ এবং কোনো শর্টেজ/সারপ্লাস থাকলে তা রেকর্ড করে শিফট লক করে দেয়। এটি ক্যাশিয়ারদের চুরি বা গরমিল পুরোপুরি বন্ধ করে।",
      b: "শিফট সিস্টেমে সকালে ওপেনিং ক্যাশ দিয়ে শিফট শুরু হয় এবং দিন শেষে Z-Report প্রিন্ট করে বাক্সের আসল ক্যাশের সাথে সফটওয়্যারের হিসাব মিলিয়ে কোনো শর্টেজ থাকলে তা রিপোর্ট করে শিফট লক করা হয়।",
      e: "Dokani enforces shift accounting controls: Shift Opening records floating change; the interim X-Report audits active sales mid-shift without closing drawers; the terminal Z-Report finalizes the shift, reconciling expected cash against counted physical bills, recording variance shortages, and locking the ledger session.",
      tip: "হিসাববিজ্ঞানের 'X-Report (Interim) vs Z-Report (Final Shift Close)' টার্ম দুটি উল্লেখ করা আন্তর্জাতিক পিওএস মানের পরিচয়।"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: বারকোড লেবেল জেনারেশন ও প্রিন্টিং (Code-128 / EAN-13): Dokani-তে নিজস্ব পণ্যের বারকোড স্টিকার কীভাবে তৈরি হয়?",
      m: "যেসব পণ্যের গায়ে ফ্যাক্টরি বারকোড থাকে না (যেমন নিজস্ব জামাকাপড় বা খোলা চাল-ডাল), সেগুলোর জন্য Dokani একটি বিল্ট-ইন বারকোড স্টিকার জেনারেটর সরবরাহ করে: (১) সিস্টেম প্রোডাক্ট তৈরির সময় একটি অনন্য ১২-ডিজিটের কোড তৈরি করে। (২) ব্রাউজারে `jsbarcode` বা SVG ইঞ্জিন দিয়ে ক্রিস্প `Code-128` বারকোড তৈরি হয় যাতে দোকানের নাম, প্রোডাক্টের নাম এবং বিক্রয়মূল্য সুন্দরভাবে বিন্যস্ত থাকে। (৩) স্টিকার রোল প্রিন্টারে (যেমন Xprinter বা Zebra) পাঠাতে কাস্টম স্টিকার সাইজ (যেমন `38mm x 25mm` বা `50mm x 30mm`) অনুযায়ী গ্রিড পেপার ফরম্যাটে মাল্টি-কপি প্রিন্ট কমান্ড দেওয়া হয়। মার্চেন্টরা স্টিকার ছিঁড়ে পণ্যের গায়ে লাগিয়ে সাথে সাথে স্ক্যান করে বিক্রি করতে পারে।",
      b: "ফ্যাক্টরি বারকোড না থাকা পণ্যের জন্য Dokani স্বয়ংক্রিয়ভাবে Code-128 বারকোড স্টিকার জেনারেট করে। স্টিকার প্রিন্টারে দোকানের নাম ও দাম সহ স্টিকার প্রিন্ট করে পণ্যের গায়ে লাগানো যায়।",
      e: "Dokani incorporates a native barcode label generator for private-label goods. Using JsBarcode, it renders vector Code-128 / EAN-13 barcodes formatted for specialized label printers (Zebra/Xprinter) across standard label dimensions (38x25mm), outputting shop branding, SKU, and retail prices.",
      code: "JsBarcode(barcodeSvgRef.current, product.barcode, {\n  format: 'CODE128',\n  displayValue: true,\n  fontSize: 14,\n  height: 40\n});"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: পিওএস হার্ডওয়্যার কম্প্যাটিবিলিটি টেস্টিং: বিভিন্ন ব্র্যান্ডের থার্মাল প্রিন্টার ও স্ক্যানারে Dokani কীভাবে নির্বিঘ্নে কাজ করে?",
      m: "বাজারে Xprinter, Epson, Posiflex, Rongta, Sunmi সহ শত শত ব্র্যান্ডের প্রিন্টার রয়েছে। কম্প্যাটিবিলিটি নিশ্চিতের কৌশল: (১) আমরা প্রিন্টারের কোনো প্রোপাইটরি সফটওয়্যারের ওপর নির্ভর করি না; স্ট্যান্ডার্ড ইন্ডাস্ট্রি `ESC/POS` কমান্ড সেট মেনে চলি যা বিশ্বের ৯৯% থার্মাল প্রিন্টার সাপোর্ট করে। (২) Android POS ডিভাইসগুলোর জন্য (যেমন Sunmi POS) সানমির বিল্ট-ইন জাভা প্রিন্টিং সার্ভিস হ্যান্ডেল করতে একটি লাইটওয়েট হাইব্রিড সার্ভিস ব্যবহার করি। (৩) যে প্রিন্টার বাইনারি কমান্ড পায় না, সেটির জন্য ইউনিভার্সাল CSS প্রিন্ট ফলব্যাক সক্রিয় থাকে। এর ফলে যেকোনো সস্তা বা দামি প্রিন্টার প্লাগ করলেই Dokani সাথে সাথে প্লাগ-অ্যান্ড-প্লে কাজ করে।",
      b: "বিশ্বমানের স্ট্যান্ডার্ড ESC/POS কমান্ড ব্যবহার করায় Xprinter, Epson বা Sunmi—বাজারের যেকোনো থার্মাল প্রিন্টারে কোনো স্পেশাল ড্রাইভার ছাড়াই Dokani প্লাগ-অ্যান্ড-প্লে সাপোর্ট দেয়।",
      e: "Hardware interoperability across Epson, Xprinter, and Sunmi POS terminals relies on standard ESC/POS protocol specifications combined with responsive CSS print media queries. Avoiding proprietary vendor drivers ensures true plug-and-play compatibility across 99% of retail thermal hardware.",
      tip: "বলো: 'Adhering to strict industry ESC/POS specifications ensures plug-and-play interoperability across Epson, Xprinter, and Android POS terminals.'"
    }
  ]
};
