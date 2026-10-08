// Topic 6: Payment Gateway Integration & Webhooks (25 Questions: 5 lvl1, 5 lvl2, 5 lvl3, 5 situation, 5 realworld)
module.exports = {
  id: "payment-transactions",
  name: "Payment Gateways & Webhooks",
  desc: "Payment Integration (bKash, Nagad, Stripe, SSLCommerz), Webhook Architecture, Signature Verification, Idempotency Keys",
  items: [
    // --- LEVEL 1 (5 Questions) ---
    {
      lvl: "lvl1",
      q: "Webhook কী এবং ট্র্যাডিশনাল Polling-এর চেয়ে এটি কেন হাজার গুণ দক্ষ?",
      m: "Polling হলো ক্লায়েন্ট বারবার সার্ভারকে জিজ্ঞাসা করে: 'কোনো নতুন পেমেন্ট এসেছে? এসেছে?'—প্রতি সেকেন্ডে শত শত রিকোয়েস্ট পাঠিয়ে ব্যান্ডউইথ ও সার্ভার রিসোর্স নষ্ট করে। Webhook হলো এর ঠিক উল্টো (Reverse API / Event-driven): ক্লায়েন্টকে বারবার জিজ্ঞাসা করতে হয় না; যখনই কোনো ইভেন্ট ঘটে (যেমন: গ্রাহক bKash বা Stripe-এ সফল পেমেন্ট করল), পেমেন্ট গেটওয়ে সার্ভার নিজে থেকেই আমাদের নির্দিষ্ট ব্যাকএন্ড URL-এ একটি HTTP POST রিকোয়েস্টে ডেটা পাঠিয়ে দেয়। এটি ব্যান্ডউইথ সাশ্রয়ী ও তাৎক্ষণিক।",
      b: "পোলিংয়ে বারবার এপিআই কল করে খবরাখবর নিতে হয় যা সার্ভারের অপচয় ঘটায়। ওয়েবহুক হলো ইভেন্ট-ড্রিভেন ব্যবস্থা যেখানে কোনো লেনদেন সফল হওয়ামাত্র পেমেন্ট গেটওয়ে নিজে থেকেই আমাদের সার্ভারে ডেটা পুশ করে রিয়েল-টাইম আপডেট দেয়।",
      e: "Polling periodically asks the server for updates via repeated HTTP calls, wasting bandwidth and IOPS. A Webhook is an event-driven push architecture (Reverse API) where the provider dispatches an immediate HTTP POST payload to our server endpoint the exact moment an event transpires.",
      tip: "ইন্টারভিউতে 'Event-driven push vs Polling pull overhead' শব্দগুলো ব্যবহার করবে।"
    },
    {
      lvl: "lvl1",
      q: "Idempotency (আইডেমপোটেন্সি) কী এবং পেমেন্ট ট্রানজাকশনে Idempotency Key কেন জীবন-মরণ বিষয়?",
      m: "Idempotency মানে হলো একই অপারেশন একবার রান করা বা ১০ বার রান করার ফলাফল সবসময় একই হওয়া এবং কোনো ডুপ্লিকেট সাইড-ইফেক্ট না ঘটা। পেমেন্ট প্রসেসিংয়ে ইন্টারনেট ড্রপ বা ব্রাউজারের ডাবল-ক্লিকের কারণে একই চার্জ রিকোয়েস্ট দুইবার চলে যেতে পারে। Idempotency Key (একটি ইউনিক UUID) পাঠালে পেমেন্ট গেটওয়ে বা আমাদের ব্যাকএন্ড চেক করে দেখে এই কি-র বিপরীতে লেনদেন আগেই সফল হয়েছে কি না। যদি হয়ে থাকে, তবে দ্বিতীয়বার টাকা না কেটে পূর্বের সফল রেসপন্সটি ফিরিয়ে দেয়। ফলে গ্রাহকের অ্যাকাউন্ট থেকে কখনো ডাবল টাকা কাটে না।",
      b: "আইডেমপোটেন্সি নিশ্চিত করে যে একটি অ্যাকশন একাধিকবার চালালেও অতিরিক্ত কোনো পরিবর্তন ঘটবে না। পেমেন্ট সিস্টেমে আইডেমপোটেন্সি কি ব্যবহারের ফলে নেটওয়ার্ক সমস্যা বা ডাবল ক্লিকে গ্রাহকের অ্যাকাউন্ট থেকে দুবার টাকা কাটা শতভাগ প্রতিরোধ করা যায়।",
      e: "An operation is idempotent if executing it multiple times yields the exact same outcome without duplicate side effects. Supplying an `Idempotency-Key` header allows payment gateways to identify retried calls and replay the original response without double-charging the customer.",
      code: "headers: { 'Idempotency-Key': 'order_123_uuid' }"
    },
    {
      lvl: "lvl1",
      q: "Webhook Signature Verification কী এবং এটি কেন বাধ্যতামূলক?",
      m: "যেহেতু আমাদের ওয়েবহুক এন্ডপয়েন্টটি ইন্টারনেটে উন্মুক্ত থাকে, যেকোনো হ্যাকার নকল পোস্ট রিকোয়েস্ট পাঠিয়ে বলতে পারে: 'অর্ডারটি সফল হয়েছে, প্রোডাক্ট ডেলিভারি দাও'। Signature Verification-এ পেমেন্ট গেটওয়ে (Stripe বা bKash) সিক্রেট কি দিয়ে ইনকামিং পেলোডের একটি ক্রিপ্টোগ্রাফিক হ্যাশ সিগনেচার হেডারে পাঠায় (যেমন `stripe-signature` বা HMAC SHA-256)। আমাদের ব্যাকএন্ড র পেলোড দিয়ে একই হ্যাশ গণনা করে মিলিয়ে দেখে। সিগনেচার না মিললে সাথে সাথে `400 Bad Request` দিয়ে ড্রপ করে দেয়।",
      b: "যেহেতু ওয়েবহুক ইউআরএল পাবলিক থাকে, যে কেউ ভুয়া পেমেন্টের তথ্য পাঠাতে পারে। সিগনেচার ভেরিফিকেশনের মাধ্যমে ক্রিপ্টোগ্রাফিক হ্যাশ মিলিয়ে নিশ্চিত হওয়া যায় যে রিকোয়েস্টটি সত্যি সত্যিই আসল পেমেন্ট গেটওয়ে থেকেই এসেছে।",
      e: "Webhook Signature Verification validates that incoming payloads originate authentically from the payment provider and were not forged by attackers. Gateways sign the raw body via an HMAC SHA-256 secret; our server verifies the signature before processing transactions.",
      code: "const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);"
    },
    {
      lvl: "lvl1",
      q: "bKash Tokenized Checkout এপিআইতে পেমেন্ট সম্পন্ন করতে ৪টি মূল ধাপ কী কী?",
      m: "bKash Tokenized Checkout-এ ৪টি ধাপ থাকে: (১) `Grant Token`: bKash ক্রেডেনশিয়াল পাঠিয়ে অ্যাপ কী ও সিক্রেট দিয়ে Bearer টোকেন নেওয়া। (২) `Create Payment`: অর্ডারের মোট টাকার অঙ্ক ও ইনভয়েস নম্বর দিয়ে পেমেন্ট ইনিশিয়েট করা (bKash একটি `paymentID` এবং রিডাইরেক্ট ইউআরএল দেয়)। (৩) `User PIN & OTP`: গ্রাহক bKash গেটওয়েতে ওটিপি ও পিন দেয়। (৪) `Execute Payment`: গ্রাহক কনফার্ম করলে আমাদের ব্যাকএন্ড `executePayment` এপিআই কল করে লেনদেন চূড়ান্ত করে এবং ট্রানজাকশন আইডি (`trxID`) সংগ্রহ করে।",
      b: "বিকাশ পেমেন্টের ৪টি ধাপ হলো: গ্রান্ট টোকেন (অথেনটিকেশন), ক্রিয়েট পেমেন্ট (পেমেন্ট শুরু ও ইউআরএল তৈরি), কাস্টমার ওটিপি/পিন ইনপুট, এবং এক্সিকিউট পেমেন্ট (লেনদেন চূড়ান্ত করে trxID সংগ্রহ)।",
      e: "bKash Tokenized Checkout follows a 4-step sequence: (1) Grant Token (exchanging credentials for a bearer token), (2) Create Payment (generating paymentID and gateway URL), (3) Customer OTP/PIN authentication on bKash UI, and (4) Execute Payment (server calls execute endpoint to capture funds and receive trxID).",
      tip: "ইন্টারভিউতে 'Create Payment -> Execute Payment' এই দুই-ধাপের এক্সিকিউশন স্পষ্ট করে বলবে।"
    },
    {
      lvl: "lvl1",
      q: "Stripe-এ Payment Intents API এবং Legacy Charge API-এর মধ্যে পার্থক্য কী?",
      m: "পুরানো Charge API সরাসরি একবারে কার্ড চার্জ করত যা ইউরোপীয় রেগুলেশন Strong Customer Authentication (SCA) ও 3D Secure (OTP) হ্যান্ডেল করতে পারত না। Payment Intents API আধুনিক স্ট্যান্ডার্ড যা পুরো পেমেন্টের লাইফসাইকেল (রিসোর্স তৈরি -> গ্রাহকের ব্যাংকে 3D Secure অথেনটিকেশন -> ফান্ড ক্যাপচার) একটি স্টেট মেশিনের মাধ্যমে ট্র্যাক করে। কোনো কার্ডে অতিরিক্ত ব্যাংক ভেরিফিকেশন লাগলে Payment Intents স্বয়ংক্রিয়ভাবে ফ্রন্টএন্ডে ওটিপি চ্যালেঞ্জ ট্রিগার করতে পারে।",
      b: "লেগ্যাসি চার্জ এপিআই টু-ফ্যাক্টর বা ওটিপি চ্যালেঞ্জ সামলাতে পারত না। আধুনিক পেমেন্ট ইন্টেন্টস এপিআই স্টেট মেশিনের সাহায্যে ব্যাংক অথেনটিকেশন, থ্রি-ডি সিকিউর পিন এবং সফল পেমেন্ট লাইফসাইকেল নিখুঁতভাবে পরিচালনা করে।",
      e: "The legacy Charge API lacked native support for multi-step authentication flows required by 3D Secure (SCA). The Payment Intents API dynamically tracks payment states (`requires_action`, `succeeded`), handling 3DS bank challenges natively before charging.",
      code: "const intent = await stripe.paymentIntents.create({ amount: 1000, currency: 'usd' });"
    },

    // --- LEVEL 2 (5 Questions) ---
    {
      lvl: "lvl2",
      q: "Webhook হ্যান্ডলারে কেন সবসময় Express-এর `raw-body` (Raw Buffer) প্রয়োজন হয়?",
      m: "সিগনেচার ভেরিফিকেশনে ক্রিপ্টোগ্রাফিক হ্যাশ মেলানোর জন্য ইনকামিং রিকোয়েস্টের হুবহু প্রতিটি বাইট (Raw Bytes) প্রয়োজন হয়। যদি `express.json()` মিডলওয়্যার আগেই বডিটিকে পার্স করে ফেলে, তবে অতিরিক্ত হোয়াইটস্পেস বা কি-র ক্রম পরিবর্তন হয়ে যায়, যার ফলে সিগনেচার হ্যাশ মিসম্যাচ হয় এবং ভেরিফিকেশন ফেইল করে। তাই ওয়েবহুক রাউটের আগে `express.raw({ type: 'application/json' })` ব্যবহার করে মূল বাফার অক্ষত রাখতে হয়।",
      b: "ক্রিপ্টোগ্রাফিক সিগনেচার যাচাইয়ে ইনকামিং ডেটার হুবহু কাঁচা বাইট প্রয়োজন হয়। express.json দিয়ে পার্স করলে স্পেস বা ফরম্যাট বদলে গিয়ে সিগনেচার মেলানো ব্যর্থ হয়, তাই express.raw দিয়ে র বাফার ধরে রাখতে হয়।",
      e: "Cryptographic signature checks evaluate the raw incoming octet stream. If `express.json()` parses the payload first, whitespace normalization or key reordering alters the computed HMAC hash, breaking signature verification. Preserve pristine payloads via `express.raw()`.",
      code: "app.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);"
    },
    {
      lvl: "lvl2",
      q: "পেমেন্ট গেটওয়ে ইন্টিগ্রেশনে 'Two-Phase Commit' বা 'Authorization & Capture' প্যাটার্ন কীভাবে কাজ করে?",
      m: "সাধারণ পেমেন্টে সাথে সাথে টাকা কেটে নেওয়া হয় (Sale/Capture)। কিন্তু হোটেল বুকিং বা ই-কমার্স স্টক ভেরিফিকেশনে 'Auth-Capture' প্যাটার্ন ব্যবহার করা হয়। ফেজ ১ (`Authorize`): গেটওয়ে গ্রাহকের কার্ডে নির্দিষ্ট টাকা হোল্ড বা ব্লক করে রাখে (টাকা কাটে না) এবং নিশ্চয়তা দেয় টাকা পর্যাপ্ত আছে। ফেজ ২ (`Capture`): ব্যাকএন্ড যখন পণ্য প্যাক করে ডেলিভারি নিশ্চিত করে, তখন `capture` কল করে চূড়ান্ত টাকা চার্জ করে। কোনো সমস্যা হলে সহজেই `void` করে টাকা রিলিজ করে দেওয়া যায় রিফান্ড ফি ছাড়াই।",
      b: "অথ-ক্যাপচার প্যাটার্নে প্রথমে টাকা না কেটে গ্রাহকের কার্ডে নির্দিষ্ট পরিমাণ ব্যালেন্স হোল্ড করা হয়। পণ্য ডেলিভারির জন্য প্রস্তুত হলে চূড়ান্ত ক্যাপচার চালিয়ে টাকা কেটে নেওয়া হয়, ফলে অর্ডার ক্যান্সেল হলে কোনো রিফান্ড ঝামেলা থাকে না।",
      e: "The Authorize & Capture pattern splits settlement: Authorization reserves and freezes funds on the customer's card without charging, guaranteeing solvency. Capture finalizes the settlement once physical inventory or service fulfillment is verified.",
      code: "const intent = await stripe.paymentIntents.create({ amount: 5000, capture_method: 'manual' });\n// Later upon shipment:\nawait stripe.paymentIntents.capture(intent.id);"
    },
    {
      lvl: "lvl2",
      q: "Webhook হ্যান্ডলারে ব্যাকএন্ড থেকে দ্রুত `200 OK` রেসপন্স পাঠানো কেন বাধ্যতামূলক?",
      m: "পেমেন্ট গেটওয়েগুলো (Stripe, bKash) ওয়েবহুক পাঠানোর পর একটি কঠোর টাইমআউট (সাধারণত ৩ থেকে ৫ সেকেন্ড) অপেক্ষা করে। যদি আমাদের ব্যাকএন্ড ইনভয়েস বানানো, ডাটাবেজ আপডেট ও ইমেইল পাঠাতে ১০ সেকেন্ড সময় নেয়, তবে গেটওয়ে ধরে নেয় সার্ভার ডাউন এবং রিকোয়েস্ট টাইমআউট করে বারবার রিট্রাই পাঠাতে থাকে (ফ্লাডিং)। সমাধান: সিগনেচার ভেরিফাই করেই তৎক্ষণাৎ গেটওয়েকে `res.status(200).send()` পাঠিয়ে কানেকশন রিলিজ করে দেব এবং মূল প্রসেসিং BullMQ ব্যাকগ্রাউন্ড কিউতে পাঠিয়ে দেব।",
      b: "পেমেন্ট গেটওয়ে ৩ সেকেন্ডের বেশি অপেক্ষা করে না। দেরি হলে গেটওয়ে বারবার ডুপ্লিকেট ওয়েবহুক পাঠায়। তাই সিগনেচার যাচাই করে সাথে সাথে ২০০ ওকে পাঠাতে হয় এবং ভারী ডাটাবেজ কাজগুলো ব্যাকগ্রাউন্ড জব কিউতে সম্পন্ন করতে হয়।",
      e: "Payment providers enforce strict 3-to-5 second timeout windows. Delays cause the gateway to mark the webhook as failed, repeatedly firing redundant retries. Acknowledge with an immediate HTTP 200 after signature validation, offloading heavy processing to an asynchronous queue.",
      code: "res.status(200).json({ received: true });\nawait paymentQueue.add('process-payment', event);"
    },
    {
      lvl: "lvl2",
      q: "SSLCommerz পেমেন্ট গেটওয়েতে আইপিএন (IPN - Instant Payment Notification) কীভাবে কাজ করে?",
      m: "গ্রাহক যখন SSLCommerz পেমেন্ট পেজে পেমেন্ট শেষ করে, ব্রাউজার হয়তো রিডাইরেক্ট হয়ে আমাদের সাইটে ফেরে। কিন্তু যদি গ্রাহক ব্রাউজার কেটে দেয় তবে সাকসেস পেজ লোড হবে না। এজন্য SSLCommerz ব্যাকগ্রাউন্ডে আমাদের সার্ভারে একটি IPN (Webhook) পাঠায়। ব্যাকএন্ডে IPN পেলে আমরা SSLCommerz-এর `Order Validation API` কল করে ট্রানজাকশনের ভ্যালিডিটি, কারেন্সি ও টাকার অঙ্ক পুনরায় ভেরিফাই করি। ডেটা ম্যাচ করলেই কেবল ডাটাবেজে অর্ডার পেইড স্ট্যাটাস সেট করি।",
      b: "আইপিএন হলো ব্যাকগ্রাউন্ড পেমেন্ট নোটিফিকেশন। ব্যবহারকারী ব্রাউজার কেটে দিলেও এসএসএলকমার্স সরাসরি আমাদের সার্ভারে আইপিএন পাঠায়। আমরা অর্ডার ভ্যালিডেশন এপিআই দিয়ে টাকা যাচাই করে তবেই অর্ডার সফল নিশ্চিত করি।",
      e: "SSLCommerz Instant Payment Notification (IPN) acts as a background webhook. Because user browser redirects can be closed prematurely, the IPN ensures receipt. Upon IPN receipt, the backend calls the SSLCommerz Validation API to verify currency, amount, and transaction status before committing orders.",
      tip: "কখনোই ব্রাউজারের রিডাইরেক্টের ওপর ভরসা করে অর্ডার পেইড করবে না; সবসময় IPN / Webhook নিশ্চিত করবে।"
    },
    {
      lvl: "lvl2",
      q: "Nagad API-এর পাবলিক ও প্রাইভেট কি সিগনেচার ক্রিপ্টোগ্রাফি কীভাবে কাজ করে?",
      m: "নগদ পেমেন্ট গেটওয়েতে প্রতিটি রিকোয়েস্টে RSA পাবলিক/প্রাইভেট কি ক্রিপ্টোগ্রাফি দিয়ে ডেটা সাইন ও এনক্রিপ্ট করতে হয়। আমাদের সার্ভারের প্রাইভেট কি দিয়ে রিকোয়েস্ট পেলোড সাইন করা হয় এবং নগদের পাবলিক কি দিয়ে এনক্রিপ্ট করে পাঠানো হয়। নগদ যখন রেসপন্স দেয়, তারা তাদের প্রাইভেট কি দিয়ে সাইন করে। আমরা নগদের পাবলিক কি দিয়ে সিগনেচার ভেরিফাই করি। এটি নিশ্চিত করে যে মাঝখানে কেউ ডেটা অল্টার করতে পারেনি (Non-repudiation)।",
      b: "নগদ এপিআই আরএসএ ক্রিপ্টোগ্রাফি দিয়ে চলে। আমাদের প্রাইভেট কি দিয়ে ডাটা সাইন করে এবং নগদের পাবলিক কি দিয়ে এনক্রিপ্ট করে পাঠানো হয়, যা সর্বোচ্চ স্তরের আর্থিক নিরাপত্তা নিশ্চিত করে।",
      e: "Nagad uses asymmetric RSA cryptography. Outgoing payloads are signed with our private key and encrypted with Nagad's public key. Incoming callbacks are verified against Nagad's public key, guaranteeing confidentiality and tamper-proof non-repudiation.",
      code: "const sign = crypto.createSign('SHA256');\nsign.update(JSON.stringify(payload));\nconst signature = sign.sign(privateKey, 'base64');"
    },

    // --- LEVEL 3 (5 Questions) ---
    {
      lvl: "lvl3",
      q: "Idempotent Webhook Consumer: একই পেমেন্ট ওয়েবহুক ৩ বার এলে ডাটাবেজে ডুপ্লিকেট ব্যালেন্স বা অর্ডার স্টেট তৈরি হওয়া কীভাবে বন্ধ করবে?",
      m: "সমাধান: (১) ডাটাবেজে একটি `ProcessedWebhook` টেবিল রাখব যেখানে ইউনিক কনস্ট্রেইন্ট থাকবে `eventId` বা `trxId`। (২) যখন ওয়েবহুক আসবে, একটি ডাটাবেজ ট্রানজাকশনের শুরুতে চেক করব: `if (await isProcessed(eventId)) return res.sendStatus(200)`। (৩) অর্ডার টেবিলে স্টেট মেশিন প্যাটার্ন ব্যবহার করব: অর্ডার শুধুমাত্র `PENDING -> PAID` হতে পারবে; যদি অলরেডি `PAID` থাকে তবে কোনো ব্যালেন্স আপডেট হবে না। (৪) ট্রানজাকশনে `ProcessedWebhook` এন্ট্রি সেভ করব। এর ফলে শতবার একই ওয়েবহুক আসলেও কোনো ডুপ্লিকেট সাইড ইফেক্ট ঘটবে না।",
      b: "একই ওয়েবহুক বারবার আসলে ডুপ্লিকেট রোধ করতে ProcessedWebhook টেবিলে ইভেন্ট আইডি সেভ রাখতে হয়। ইতিমধ্যে প্রসেস করা থাকলে সরাসরি ২০০ ওকে দিয়ে ইগনোর করা হয় এবং অর্ডার অলরেডি পেইড থাকলে কোনো ডুপ্লিকেট টাকা যোগ করা হয় না।",
      e: "Guard webhook ingestion idempotently via unique constraints on `eventId` inside a `ProcessedWebhooks` table. Evaluate inside an atomic database transaction: if already recorded, exit with 200. Enforce state machines (`PENDING` -> `PAID`), rejecting illegal secondary transitions.",
      code: "await prisma.$transaction(async (tx) => {\n  const exists = await tx.webhookEvent.findUnique({ where: { eventId } });\n  if (exists) return;\n  await tx.webhookEvent.create({ data: { eventId } });\n  await tx.order.update({ where: { id: orderId }, data: { status: 'PAID' } });\n});"
    },
    {
      lvl: "lvl3",
      q: "Payment Reconciliation Engine: গেটওয়ের হিসাবের সাথে আমাদের ডাটাবেজের দৈনিক টাকার অমিল মেলাতে অটোমেটেড রিকনসিলিয়েশন পাইপলাইন কীভাবে বানাবে?",
      m: "প্রতিদিন মধ্যরাতে একটি ক্রন জব (Cron Job) চলে যা bKash/Stripe থেকে দিনের সমস্ত ট্রানজাকশনের সেটেলমেন্ট রিপোর্ট (CSV/API) ডাউনলোড করে। আমাদের পাইপলাইন প্রতিটি `trxID`, টাকার অঙ্ক এবং ফি মিলিয়ে আমাদের ডাটাবেজের অর্ডারের সাথে তুলনা করে: (১) আমাদের ডাটাবেজে পেইড কিন্তু গেটওয়েতে নেই (Ghost Orders), (২) গেটওয়েতে টাকা কেটেছে কিন্তু আমাদের ডাটাবেজে পেইড হয়নি (Unsettled Customers)। কোনো অমিল থাকলে স্বয়ংক্রিয়ভাবে অডিট ফ্ল্যাগ তৈরি করে ফাইন্যান্স টিমকে রিপোর্ট পাঠানো হয়।",
      b: "অটোমেটেড রিকনসিলিয়েশন পাইপলাইন প্রতিদিন মধ্যরাতে গেটওয়ের সেটেলমেন্ট স্টেটমেন্টের সাথে ডাটাবেজের প্রতিটি লেনদেন মিলিয়ে দেখে। কোনো টাকার অমিল থাকলে তাৎক্ষণিক অডিট রিপোর্ট তৈরি করে অর্থ সংক্রান্ত ঝুঁকি দূর করে।",
      e: "An automated reconciliation engine downloads daily settlement settlement ledgers via payment gateway APIs. It executes automated diffing against internal transaction tables, highlighting discrepancies (unsettled gateway captures vs local pending states) in automated finance reports.",
      tip: "পেমেন্ট গেটওয়েতে রিকনসিলিয়েশন পাইপলাইন থাকার কথা বলা এন্টারপ্রাইজ ফিনটেক দক্ষতার প্রমাণ দেয়।"
    },
    {
      lvl: "lvl3",
      q: "Outbox Pattern: পেমেন্ট সফল হওয়ার পর ডাটাবেজ আপডেট এবং ওয়েবহুক ডিসপ্যাচ কীভাবে পারফেক্ট অ্যাটোমিকালি করবে?",
      m: "যদি ডাটাবেজে পেমেন্ট সেভ হওয়ার ঠিক পর সার্ভার ক্র্যাশ করে এবং মেসেজ ব্রোকার (RabbitMQ) বা ওয়েবহুকে মেসেজ পাঠানো ব্যর্থ হয়, তবে ডেটা ইনকনসিস্টেন্ট হয়ে যায়। Transactional Outbox Pattern-এ মূল ডাটাবেজ ট্রানজাকশনের ভেতরেই অর্ডারের পাশাপাশি একটি `Outbox` টেবিলে ইভেন্ট রেকর্ড সেভ করা হয়। একটি আলাদা ব্যাকগ্রাউন্ড ওয়ার্কার `Outbox` টেবিল থেকে নিশ্চিতভাবে এক একটি ইভেন্ট তুলে মেসেজ ব্রোকারে পুশ করে এবং সফল হলে ডিলিট করে। ফলে ডাটাবেজ ও ইভেন্টের মধ্যে শতভাগ一致তা (Guaranteed Event Delivery) নিশ্চিত হয়।",
      b: "আউটবক্স প্যাটার্নে মূল ডাটাবেজ ট্রানজাকশনের ভেতরেই ইভেন্ট রেকর্ড সেভ করা হয়। ব্যাকগ্রাউন্ড প্রসেস সেই আউটবক্স টেবিল থেকে মেসেজ ব্রোকারে ইভেন্ট পাঠায়, ফলে সার্ভার ক্র্যাশ করলেও কোনো ইভেন্ট কখনো হারিয়ে যায় না।",
      e: "The Transactional Outbox pattern writes domain events to an `Outbox` table within the exact same atomic ACID database transaction as the business entity. A polling publisher or Debezium CDC worker consumes the outbox rows, guaranteeing At-Least-Once event delivery.",
      code: "await prisma.$transaction([\n  prisma.order.update({ where: { id }, data: { status: 'PAID' } }),\n  prisma.outbox.create({ data: { type: 'PAYMENT_CAPTURED', payload } })\n]);"
    },
    {
      lvl: "lvl3",
      q: "Payment Webhook Failure-এ Dead Letter Queue (DLQ) এবং Exponential Backoff রিট্রাই মেকানিজম কীভাবে কাজ করে?",
      m: "যদি কোনো ওয়েবহুক প্রসেসিংয়ের সময় আমাদের অভ্যন্তরীণ ডাটাবেজ সাময়িকভাবে ডাউন থাকে, প্রসেসটি ফেইল করবে। BullMQ কিউতে আমরা Exponential Backoff (১ম বার ৫ সেকেন্ড পর, ২য় বার ৩০ সেকেন্ড, ৩য় বার ৫ মিনিট) দিয়ে রিট্রাই করব। সর্বোচ্চ রিট্রাই সীমা (যেমন ৫ বার) অতিক্রম করার পরেও ফেইল করলে জবটি স্বয়ংক্রিয়ভাবে একটি 'Dead Letter Queue (DLQ)'-তে চলে যাবে। সেখানে সংরক্ষিত ত্রুটিপূর্ণ জবগুলো এলার্ট ট্রিগার করবে এবং ডাটাবেজ সুস্থ হলে ইঞ্জিনিয়াররা ম্যানুয়ালি বা স্ক্রিপ্ট দিয়ে DLQ রি-প্লে করতে পারবে—কোনো পেমেন্ট হারিয়ে যাবে না।",
      b: "ব্যর্থ ওয়েবহুক বারবার এক্সপোনেনশিয়াল ব্যাকঅফ দিয়ে রিট্রাই করা হয়। তবুও ব্যর্থ হলে জবটি ডেড লেটার কিউতে (DLQ) জমা হয়, যাতে সমস্যা সমাধানের পর পুনরায় কোনো তথ্য না হারিয়ে প্রসেস সম্পন্ন করা যায়।",
      e: "Failed webhook jobs retry via Exponential Backoff with jitter. Exhausting retry limits directs payloads to a Dead Letter Queue (DLQ). The DLQ isolates poison pills, preserving payloads for manual inspection and bulk replays without clogging primary queues.",
      code: "const paymentQueue = new Queue('payments', {\n  defaultJobOptions: { attempts: 5, backoff: { type: 'exponential', delay: 5000 } }\n});"
    },
    {
      lvl: "lvl3",
      q: "Multi-Currency Dynamic Conversion & Rounding: আন্তর্জাতিক পেমেন্টে (USD to BDT) মুদ্রার হার ওঠানামা ও রাউন্ডিং এরর কীভাবে ম্যানেজ করবে?",
      m: "সমস্যা: ডলার থেকে টাকায় রূপান্তর করার সময় দশমিকের ফ্র্যাকশনে ক্ষুদ্র ক্ষুদ্র ভগ্নাংশ হারিয়ে লাখ টাকার ট্রানজাকশনে বড় অমিল দেখা দেয়। সমাধান: (১) চেকআউট ইনিশিয়েট হওয়ার সময় একটি 'Locked Exchange Rate' টাইমস্ট্যাম্প সহ সেভ করব (১৫ মিনিটের জন্য লকড)। (২) সমস্ত ক্যালকুলেশনে বড় পূর্ণসংখ্যা (ইনটিজার সেন্ট ও পয়সা) ব্যবহার করব। (৩) রাউন্ডিংয়ের জন্য ব্যাংকার্স অ্যালগরিদম (Half to Even) অথবা `decimal.js` ব্যবহার করব। ফলে সেন্ট ও পয়সার নিখুঁত সমতা বজায় থাকে।",
      b: "মুদ্রা রূপান্তরের সময় ১৫ মিনিটের জন্য লকড এক্সচেঞ্জ রেট ব্যবহার করতে হবে। সব হিসাব পয়সায় পূর্ণসংখ্যায় সম্পন্ন করতে হবে এবং ব্যাংকার্স অ্যালগরিদম ব্যবহারের মাধ্যমে কোনো ভগ্নাংশ অপচয় ছাড়াই আন্তর্জাতিক পেমেন্ট সমন্বয় নিশ্চিত করতে হবে।",
      e: "Manage multi-currency volatility by locking real-time exchange rates for a guaranteed 15-minute checkout window. Perform rounding using Banker's Rounding (Round-Half-to-Even) via arbitrary-precision libraries (decimal.js) over smallest integer units to prevent fractional drifts.",
      tip: "ফিনটেকে 'Banker's Rounding' এবং 'Locked Exchange Rate Window' উল্লেখ করা উচ্চমানের ব্যাংকিং ডোমেন নলেজ প্রকাশ করে।"
    },

    // --- SITUATION (5 Questions) ---
    {
      lvl: "situation",
      q: "গ্রাহকের অ্যাকাউন্ট থেকে bKash-এ টাকা কেটে নিয়েছে কিন্তু আমাদের সার্ভারে কোনো ওয়েবহুক আসেনি বা নেটওয়ার্ক ফেইল করেছিল। গ্রাহক স্ক্রিনে 'পেমেন্ট পেন্ডিং' দেখে অভিযোগ করছে। কীভাবে স্বয়ংক্রিয়ভাবে এটি রিকভার করবে?",
      m: "সমাধান: (১) আমরা কখনোই শুধু ওয়েবহুকের ওপর ১০০% অন্ধ নির্ভর করব না। (২) ব্যাকএন্ডে একটি 'Payment Auto-Query Cron Job' প্রতি ২ মিনিট পর পর চলবে যা গত ৩০ মিনিটের সব `PENDING` অর্ডার খুঁজে বের করবে। (৩) bKash-এর `queryPayment(paymentID)` এপিআই কল করে গেটওয়েতে স্ট্যাটাস চেক করবে। যদি bKash বলে পেমেন্ট সফল, ব্যাকএন্ড স্বয়ংক্রিয়ভাবে ডাটাবেজে অর্ডারকে `PAID` করবে, স্টক কমাবে এবং গ্রাহককে কনফার্মেশন এসএমএস পাঠাবে। গ্রাহকের অভিযোগের আগেই সিস্টেম নিজে থেকে সমাধান করে ফেলবে।",
      b: "ওয়েবহুক মিস হলে আমাদের ব্যাকগ্রাউন্ড অটো-কুয়েরি ক্রন জব প্রতি ২ মিনিটে পেন্ডিং অর্ডারের জন্য bKash queryPayment এপিআই কল করে। পেমেন্ট সফল পেলে স্বয়ংক্রিয়ভাবে অর্ডার কনফার্ম করে সমাধান নিশ্চিত করে।",
      e: "Mitigate dropped webhooks via an automated polling fallback cron running every 2 minutes. The cron queries pending orders against the provider's `queryPayment` status endpoint, automatically capturing missed transactions and transitioning orders to `PAID`.",
      code: "const res = await bkashApi.queryPayment(order.bkashPaymentId);\nif (res.transactionStatus === 'Completed') await markOrderPaid(order.id, res.trxID);"
    },
    {
      lvl: "situation",
      q: "একজন ব্যবহারকারী পেমেন্ট গেটওয়েতে গিয়ে ১৫ মিনিট পর পিন দিল, কিন্তু ইতিমধ্যে আমাদের ইনভেন্টরির স্টক অন্য একজন কাস্টমার কিনে শেষ করে ফেলেছে (Stock Out)। কীভাবে ফিক্স করবে?",
      m: "সমাধান: (১) চেকআউট শুরু হওয়ার সময় আমরা ১৫ মিনিটের জন্য একটি 'Inventory Soft Lock' (Redis Reservation) তৈরি করব যা স্টক রিজার্ভ করে রাখবে। (২) ১৫ মিনিট পার হলে লক স্বয়ংক্রিয়ভাবে মুক্ত হয়ে যাবে। (৩) যদি স্টক শেষ হয়ে যায় এবং গ্রাহক তার পরে পেমেন্ট সফল করে, আমাদের ব্যাকএন্ড সাথে সাথে একটি 'Auto Refund' ট্রিগার করবে (`refundPayment(trxID)`) এবং গ্রাহককে নোটিফাই করবে যে স্টক শেষ হওয়ায় টাকা স্বয়ংক্রিয়ভাবে তার অ্যাকাউন্টে ফেরত পাঠানো হয়েছে।",
      b: "চেকআউটের সময় ১৫ মিনিটের জন্য রেডিসে স্টক রিজার্ভ রাখতে হবে। স্টক ফুরিয়ে যাওয়ার পর পেমেন্ট আসলে ব্যাকএন্ড সাথে সাথে অটো-রিফান্ড এপিআই কল করে গ্রাহকের টাকা ফেরত দিয়ে দেবে।",
      e: "Implement ephemeral Inventory Reservations in Redis expiring after 15 minutes. If a race condition circumvents the reservation, the backend catches the stock deficit upon capture and immediately dispatches an automated programmatic refund via gateway refund APIs.",
      code: "await bkashApi.refundTransaction({ paymentID, trxID, amount, reason: 'Stock Out' });"
    },
    {
      lvl: "situation",
      q: "প্রোডাকশন পেমেন্ট ওয়েবহুক এন্ডপয়েন্টে হঠাৎ একযোগে প্রতি মিনিটে ২০ হাজার ফেক রিকোয়েস্ট আসছে। কীভাবে সার্ভারকে সুরক্ষিত রাখবে?",
      m: "সমাধান: (১) ওয়েবহুক রিকোয়েস্টের সোর্স আইপি চেক করব: Stripe বা bKash-এর অফিসিয়াল আইপি রেঞ্জের বাইরে থেকে আসা সব রিকোয়েস্ট Cloudflare WAF লেভেলে সাথে সাথে ড্রপ করে দেব। (২) আমাদের নোড সার্ভার পর্যন্ত যে রিকোয়েস্টগুলো আসবে, সবার প্রথমে সিগনেচার হ্যাশ ভ্যালিডেট করব। সিগনেচার ইনভ্যালিড হওয়া মাত্র `401/400` দিয়ে সাথে সাথে কানেকশন ক্লোজ করব—কোনো ডাটাবেজ কোয়েরি চালাব না। (৩) ইনকামিং রিকোয়েস্ট প্রসেসিংকে BullMQ কিউতে দেব যাতে ডাটাবেজ ওভারলোড না হয়।",
      b: "ক্লাউডফ্লেয়ার ডব্লিউএএফ (WAF) লেভেলে পেমেন্ট গেটওয়ের নির্দিষ্ট আইপি ছাড়া বাকি সব আইপি ব্লক করতে হবে। সার্ভারে সিগনেচার না মিললে ডাটাবেজে হাত না দিয়ে সাথে সাথে রিকোয়েস্ট ড্রপ করতে হবে।",
      e: "Whitelist payment provider IP CIDR blocks at the Cloudflare edge WAF, terminating spoofed traffic immediately. At the application layer, reject unverified signatures before touching database pools, isolating valid webhooks into BullMQ.",
      tip: "ক্লাউডফ্লেয়ারে গেটওয়ের অফিশিয়াল আইপি হোয়াইটলিস্ট করার কথা বলা ইন্ডাস্ট্রিয়াল সিকিউরিটি প্র্যাকটিস।"
    },
    {
      lvl: "situation",
      q: "একজন গ্রাহক পেমেন্ট কমপ্লিট হওয়ার পর ব্যাক বাটন চেপে আবার চেকআউট পেজে গিয়ে পুনরায় সাবমিট বাটনে ক্লিক করল। পেমেন্ট গেটওয়েতে ডুপ্লিকেট চার্জ কীভাবে আটকাবে?",
      m: "সমাধান: (১) ফ্রন্টএন্ডে পেমেন্ট সফল হওয়ার পর সাথে সাথে কার্ট ক্লিয়ার এবং সফল ইনভয়েস পেজে রিডাইরেক্ট করে চেকআউট সেশন ধ্বংস করব। (২) ব্যাকএন্ডে চেকআউটের একটি ইউনিক `orderId` ভিত্তিক Idempotency Key পেমেন্ট গেটওয়েতে পাঠাব। (৩) যদি গেটওয়ে দেখে এই অর্ডারের জন্য ইতিমধ্যেই ট্রানজাকশন সম্পন্ন হয়েছে, তবে এটি নতুন চার্জ তৈরি না করে সরাসরি পূর্বের সফল চার্জ অবজেক্ট ফেরত দেবে।",
      b: "অর্ডার আইডি ভিত্তিক Idempotency Key পাঠানোর কারণে গেটওয়ে দ্বিতীয়বার চার্জ না করে আগের সফল রেজাল্ট ফিরিয়ে দেয়। ফ্রন্টএন্ডে সেশন রিসেট করে সফল পেজে রিডাইরেক্ট করা নিশ্চিত করতে হবে।",
      e: "Pass deterministic Idempotency Keys composed of the immutable `orderId` to the gateway. If retried, gateways return cached payment receipts without initiating redundant debits. Clear client cart sessions upon receipt of positive signals.",
      code: "const payment = await stripe.paymentIntents.create(params, { idempotencyKey: `order_${order.id}` });"
    },
    {
      lvl: "situation",
      q: "পেমেন্ট গেটওয়ের লাইভ প্রোডাকশন ডাউনটাইমের কারণে সমস্ত কাস্টমার পেমেন্ট ফেইল করছে। কীভাবে ব্যবসায়িক ক্ষতি কমাবে এবং অল্টারনেট গেটওয়েতে ট্রাফিক রাউট করবে?",
      m: "সমাধান: আমরা 'Smart Payment Routing & Failover' আর্কিটেকচার রাখব। আমাদের সিস্টেমে একাধিক গেটওয়ে (যেমন bKash, Nagad, SSLCommerz) ইন্টিগ্রেট থাকবে। যদি প্রাইমারি গেটওয়ে পরপর ৫ বার টাইমআউট বা 5xx দেয়, আমাদের সার্কিট ব্রেকার স্বয়ংক্রিয়ভাবে প্রাইমারি অপশনকে ব্যাকগ্রাউন্ডে সরিয়ে অল্টারনেট গেটওয়েকে (যেমন Nagad বা SSLCommerz) ডিফল্ট হিসেবে সাজেস্ট করবে এবং ব্যবহারকারীকে পরিষ্কার ব্যানার দেখাবে: 'বিকাশ গেটওয়েতে সাময়িক মেইনটেন্যান্স চলছে, অনুগ্রহ করে নগদ বা কার্ড দিয়ে পেমেন্ট সম্পন্ন করুন'।",
      b: "স্মার্ট পেমেন্ট রাউটিংয়ের মাধ্যমে একটি গেটওয়ে ডাউন হলে সার্কিট ব্রেকার স্বয়ংক্রিয়ভাবে বিকল্প গেটওয়ে (যেমন নগদ বা কার্ড) সামনে নিয়ে আসবে যাতে বিক্রি বন্ধ না হয়ে ব্যবসা সচল থাকে।",
      e: "Implement Smart Payment Fallback via Circuit Breakers. If the primary gateway breaches error rate thresholds, the system automatically surfaces alternative rails (e.g. falling back from bKash to Nagad/SSLCommerz), alerting users to ongoing provider outages.",
      tip: "স্মার্ট পেমেন্ট রাউটিং ও ফেইলওভার হলো বড় বড় ই-কমার্স ও ফিনটেকের মূল আর্কিটেকচার।"
    },

    // --- REALWORLD (5 Questions) ---
    {
      lvl: "realworld",
      q: "Dokani POS-এ খুচরা দোকানের ক্যাশ কাউন্টারে bKash Dynamic QR Code পেমেন্ট কীভাবে ইন্টিগ্রেট করেছিলে?",
      m: "দোকানি ক্যাশ কাউন্টারে আমরা bKash Dynamic QR কোড তৈরি করেছিলাম: ইনভয়েসের মোট টাকার অঙ্ক (`amount`) এবং ইনভয়েস আইডি দিয়ে ব্যাকএন্ড bKash Merchant API কল করে একটি ডায়নামিক কিউআর ডাটা পেত। ফ্রন্টএন্ড কাউন্টার স্ক্রিনে সেই কিউআর কোডটি রেন্ডার হতো। গ্রাহক তার bKash অ্যাপ দিয়ে কিউআর স্ক্যান করে পিন দেওয়া মাত্র ব্যাকগ্রাউন্ডে bKash Webhook আমাদের সার্ভারে হিট করত। সাথে সাথে ক্যাশ কাউন্টার স্ক্রিন গ্রিন টিক দেখাত এবং থার্মাল প্রিন্টার থেকে অটোমেটিক ক্যাশ মেমো বের হয়ে আসত।",
      b: "দোকানি পিওএসে আমরা ডায়নামিক বিকাশ কিউআর কোড তৈরি করেছিলাম। গ্রাহক নিজের বিকাশ অ্যাপ দিয়ে স্ক্যান করে টাকা দিলে ওয়েবহুকের মাধ্যমে সাথে সাথে ক্যাশ কাউন্টারে পেমেন্ট নিশ্চিত হয়ে স্বয়ংক্রিয় রসিদ প্রিন্ট হতো।",
      e: "Engineered bKash Dynamic QR payments for Dokani POS registers: the backend requested dynamic QR payloads embedding specific invoice amounts. When customers scanned and paid via mobile app, bKash webhooks triggered real-time socket confirmation and thermal receipt printing.",
      tip: "ডায়নামিক কিউআর কোড ভিত্তিক রিয়েল-টাইম রিটেইল পেমেন্ট অত্যন্ত আকর্ষণীয় ও বাস্তব প্রজেক্ট উদাহরণ।"
    },
    {
      lvl: "realworld",
      q: "Dokani POS-এ শত শত সাবস্ক্রিপশন প্ল্যান বিলিংয়ের জন্য Recurring Billing ও Auto-Debit কীভাবে আর্কিটেক্ট করেছিলে?",
      m: "দোকানি SaaS-এর মাসিক ফি কাটার জন্য আমরা bKash Agreement API এবং Stripe Subscriptions ব্যবহার করেছি। দোকান মালিক প্রথমবার সাইন-আপের সময় একবারের জন্য একটি 'Payment Agreement / Token' অথোরাইজ করত। প্রতি মাসের ১ তারিখে আমাদের ব্যাকগ্রাউন্ড ক্রন জব Stripe Billing বা bKash Tokenized recurring charge এপিআই কল করে স্বয়ংক্রিয়ভাবে সাবস্ক্রিপশন ফি কেটে নিত এবং ইনভয়েস পিডিএফ দোকানদারের ইমেইলে পাঠিয়ে দিত। কোনো পেমেন্ট ফেইল হলে ৩ দিনের গ্রেস পিরিয়ড সহ অটো-রিট্রাই হতো।",
      b: "দোকানি মাসিক ফির জন্য bKash Agreement এবং Stripe সাবস্ক্রিপশন ব্যবহার করা হয়েছিল। প্রতি মাসের শুরুতে ক্রন জবের মাধ্যমে স্বয়ংক্রিয়ভাবে ফি কেটে নেওয়া হতো এবং ফেইল করলে ৩ দিনের গ্রেস পিরিয়ড দেওয়া হতো।",
      e: "Implemented recurring SaaS billing in Dokani via bKash Agreement Tokenization and Stripe Subscriptions. Monthly cron workers invoked recurring charge tokens automatically, emailing invoices upon capture and managing dunning flows during payment failures.",
      code: "await bkashApi.createAgreementPayment({ agreementID, amount: 999, invoiceNo });"
    },
    {
      lvl: "realworld",
      q: "PTTABD প্ল্যাটফর্মে কোর্স কেনার সাথে সাথে পেমেন্ট গেটওয়ে ফি (Payment Gateway Commission) ও ভ্যাট কেটে নেট প্রফিট লেজার হিসাব কীভাবে করেছিলে?",
      m: "যখন একজন ছাত্র ৩০০০ টাকার কোর্স কিনত, গেটওয়ে (SSLCommerz বা bKash) ২.৫% ফি কেটে নিত। আমাদের ব্যাকগ্রাউন্ড ফিন্যান্সিয়াল সার্ভিসে আমরা ৩টি লেজার এন্ট্রি তৈরি করতাম একটি সিঙ্গেল ACID ট্রানজাকশনে: (১) মোট সেলস রেভিনিউ: +৩০০০ টাকা, (২) গেটওয়ে প্রসেসিং ফি এক্সপেন্স: -৭৫ টাকা, (৩) গভমেন্ট ভ্যাট লায়াবিলিটি: -১৫০ টাকা, (৪) নেট লার্নিং প্ল্যাটফর্ম আর্নিং: +২৭৭৫ টাকা। এর ফলে কোনো লুকায়িত অমিল ছাড়াই অ্যাকাউন্টস অডিট শতভাগ স্বচ্ছ ছিল।",
      b: "পিটিটিএবিডিতে পেমেন্ট সফল হওয়ার সাথে সাথে অ্যাসিড ট্রানজাকশনের মাধ্যমে মোট আয়, গেটওয়ে ফি এবং ভ্যাট কেটে পৃথক লেজার এন্ট্রি তৈরি করা হতো, যা কোম্পানির আর্থিক অডিটকে শতভাগ স্বচ্ছ রেখেছিল।",
      e: "Automated multi-entry bookkeeping for PTTABD course purchases inside an atomic ACID transaction: crediting Gross Revenue, debiting Gateway Surcharges (2.5%), debiting VAT, and crediting Net Platform Retained Earnings with zero float discrepancies.",
      tip: "পেমেন্ট গেটওয়ের ২.৫% ফি ও ট্যাক্স হিসাব করে নেট প্রফিট লেজার এন্ট্রি দেখানো সিনিয়র ইঞ্জিনিয়ারিং অ্যাকাউন্টিংয়ের চূড়ান্ত নমুনা।"
    },
    {
      lvl: "realworld",
      q: "Dokani POS-এ পেমেন্ট রিফান্ড (Full Refund & Partial Refund) প্রসেসিং কীভাবে ডাটাবেজ এবং পেমেন্ট গেটওয়েতে সমন্বয় করেছিলে?",
      m: "গ্রাহক কোনো পণ্য ফেরত দিলে আমরা গেটওয়ে এপিআইতে রিফান্ড কল করতাম (`refundPayment({ paymentID, trxID, amount, sku })`। গেটওয়ে সফল হলে আমরা আমাদের ডাটাবেজে: (১) ইনভয়েস টেবিলে `REFUNDED` বা `PARTIALLY_REFUNDED` স্ট্যাটাস দিতাম, (২) ইনভেন্টরিতে পণ্যের স্টক স্বয়ংক্রিয়ভাবে ১ বাড়িয়ে রিস্টোর করতাম, (৩) কাস্টমার লেজারে রিফান্ড ক্রেডিট এন্ট্রি দিতাম। পুরো অপারেশনটি একটি ট্রানজাকশনে হতো যাতে গেটওয়ে রিফান্ড ফেইল করলে ডাটাবেজে স্টক বৃদ্ধি না পায়।",
      b: "পণ্য ফেরত দেওয়ার সময় আমরা গেটওয়েতে রিফান্ড রিকোয়েস্ট পাঠিয়ে সফল হলে ডাটাবেজে স্টক ফিরিয়ে নিতাম এবং কাস্টমার লেজার আপডেট করতাম। ট্রানজাকশন ব্যবহারের ফলে গেটওয়ে রিফান্ড সফল না হলে লোকাল ডাটাবেজে কোনো পরিবর্তন হতো না।",
      e: "Synchronized refunds in Dokani POS by invoking gateway refund APIs before updating persistence states. Upon success, an atomic transaction updated invoice statuses, replenished inventory balances, and debited sales ledgers.",
      code: "const refundRes = await stripe.refunds.create({ payment_intent: intentId, amount: 500 });\nawait db.inventory.incrementStock(sku, 1);"
    },
    {
      lvl: "realworld",
      q: "পেমেন্ট ট্রানজাকশন সম্পর্কিত নিরাপত্তা ও কমপ্লায়েন্স বজায় রাখার জন্য তোমার শীর্ষ আর্কিটেকচারাল প্রিন্সিপালগুলো কী?",
      m: "আমার শীর্ষ ৫টি প্রিন্সিপাল: (১) PCI-DSS কমপ্লায়েন্স: কখনোই কাঁচা ক্রেডিট কার্ড নম্বর আমাদের সার্ভারে টাচ বা সেভ করব না; সবসময় টোকেনাইজেশন ব্যবহার করব। (২) প্রতিটি ট্রানজাকশনে Idempotency Key বাধ্যতামূলক। (৩) প্রতিটি ওয়েবহুকে ক্রিপ্টোগ্রাফিক সিগনেচার ভেরিফিকেশন ও র বাফার নিশ্চিত করা। (৪) ড্রপড ওয়েবহুক সামলাতে ব্যাকগ্রাউন্ড অটো-কুয়েরি ফলব্যাক রাখা। (৫) সমস্ত পেমেন্ট ডেটা ডাটাবেজে ACID ট্রানজাকশন ও অডিট লগ সহ সেভ করা।",
      b: "আমার শীর্ষ ৫টি নিয়ম: কার্ড নম্বর কখনো সার্ভারে স্পর্শ না করে টোকেন ব্যবহার, বাধ্যতামূলক আইডেমপোটেন্সি কি, ওয়েবহুক সিগনেচার ভেরিফিকেশন, ব্যাকগ্রাউন্ড অটো-কুয়েরি ফলব্যাক এবং প্রতিটি পেমেন্টের জন্য অপরিবর্তনীয় অডিট লগ সংরক্ষণ।",
      e: "My core payment architectural tenets: (1) Absolute PCI-DSS compliance via client-side tokenization (zero raw PANs on server), (2) Mandatory Idempotency Keys on all mutating endpoints, (3) Cryptographic raw-body HMAC webhook signature checks, (4) Scheduled reconciliation polling to heal dropped webhooks, and (5) Strict ACID transaction boundaries with immutable audit logs.",
      tip: "এই ৫টি প্রিন্সিপাল দিয়ে উত্তর শেষ করলে ইন্টারভিউয়ার নিশ্চিত হবে যে তোমার ফিনটেক ও পেমেন্ট সিকিউরিটি নলেজ প্রফেশনাল গ্রেডের।"
    }
  ]
};
