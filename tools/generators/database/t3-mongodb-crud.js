// Topic 3: MongoDB NoSQL Architecture & CRUD Operations (25 Questions: 5 lvl1, 5 lvl2, 5 lvl3, 5 situation, 5 realworld)
module.exports = {
  id: "mongodb-schema-crud",
  name: "MongoDB Architecture & CRUD Operations",
  desc: "Document Database, BSON, Embedded vs Reference Models, Atomic CRUD, Indexing in Mongo, Replica Sets & Sharding",
  items: [
    // --- LEVEL 1 (5 Questions) ---
    {
      lvl: "lvl1",
      q: "MongoDB কী এবং BSON (Binary JSON) ফরম্যাট সাধারণ JSON-এর চেয়ে কীভাবে শক্তিশালী?",
      m: "MongoDB হলো একটি ওপেন-সোর্স, ডকুমেন্ট-ভিত্তিক NoSQL ডেটাবেজ। এটি ডেটা টেবিল ও রো-এর বদলে ফ্লেক্সিবল 'Collections' এবং 'Documents'-এ সংরক্ষণ করে। সাধারণ JSON শুধুমাত্র স্ট্রিং, সংখ্যা ও বুলিয়ান চেনে—এতে Date, Binary Data বা ObjectId টাইপ নেই। MongoDB ইন্টারনালি `BSON` (Binary JSON) ফরম্যাট ব্যবহার করে। BSON অতিরিক্ত ডেটা টাইপ (Date, ObjectId, Decimal128, Binary/Buffer) সাপোর্ট করে এবং বাইনারি এনকোডিংয়ের কারণে ডেটা স্ক্যান ও ট্রাভার্সাল অতি দ্রুত গতিতে সম্পন্ন হয়।",
      b: "মঙ্গোডিবি একটি জনপ্রিয় ডকুমেন্ট-ভিত্তিক নো-এসকিউএল ডাটাবেজ। এটি সাধারণ JSON এর বদলে BSON (বাইনারি JSON) ব্যবহার করে যা তারিখ, অবজেক্ট আইডি ও ডেসিমাল সংখ্যা সংরক্ষণের সুবিধা দেয় এবং বাইনারি ফরম্যাটে অতি দ্রুত কুয়েরি এক্সিকিউট করে।",
      e: "MongoDB is a leading distributed document NoSQL database storing data as JSON-like documents within Collections. It stores data internally as BSON (Binary JSON), extending JSON with rich data types like Date, ObjectId, Decimal128, and raw binary, optimized for blazing-fast traversal.",
      tip: "ইন্টারভিউতে 'BSON provides rich data types like Date, ObjectId, and faster binary traversal' উল্লেখ করবে।"
    },
    {
      lvl: "lvl1",
      q: "MongoDB-তে Embedded Document (Denormalization) বনাম Referenced Document (Normalization)-এর মধ্যে কখন কোনটি বেছে নেবে?",
      m: "(১) `Embedded Document`: যখন ডেটা 'একসাথে পড়া হয়' (Contains-a relationship) এবং চাইল্ড ডেটার আকার নির্দিষ্ট বা ক্ষুদ্র (যেমন একটি ইউজারের ২-৩টি ঠিকানা বা ইনভয়েসের আইটেম লিস্ট)। এতে কোনো `$lookup` বা জয়েন ছাড়া সিঙ্গেল রিডে দ্রুত ডেটা আসে। (২) `Referenced Document`: যখন চাইল্ড ডেটা আনবাউন্ডেড বা বিশাল (যেমন একজন ব্লগারের ১০ লক্ষ কমেন্ট—কারণ মঙ্গোডিবির সিঙ্গেল ডকুমেন্টের সাইজ লিমিট ১৬MB!), অথবা ডেটা একাধিক কালেকশন থেকে শেয়ার্ড আকারে ব্যবহৃত হয় (যেমন প্রোডাক্ট ক্যাটালগ)।",
      b: "এমবেডেড ডকুমেন্ট ব্যবহার করা হয় যখন ডেটা সীমিত থাকে এবং একসাথে পড়ার প্রয়োজন হয় (যেমন ইনভয়েসের আইটেম)। রেফারেন্সড ডকুমেন্ট ব্যবহার করা হয় যখন ডেটার সংখ্যা অসীম হতে পারে বা একাধিক জায়গায় শেয়ার করা প্রয়োজন (যেমন কমেন্ট বা ইউজার রেফারেন্স)।",
      e: "Embed data (1:Few) when entities are tightly coupled, queried together, and have bounded growth to avoid joins. Reference data (1:Many or 1:Squillions) when related sub-documents grow unbounded (protecting against MongoDB's 16MB document ceiling) or require independent querying.",
      code: "// Embedded:\n{ _id: '1', name: 'Jahid', addresses: [{ city: 'Dhaka' }] }\n// Referenced:\n{ _id: '1', name: 'Jahid', companyId: ObjectId('abc') }"
    },
    {
      lvl: "lvl1",
      q: "MongoDB-তে `ObjectId` কী এবং এর ১২-বাইটের অভ্যন্তরীণ কাঠামো কীভাবে তৈরি হয়?",
      m: "মঙ্গোডিবির প্রতিটি ডকুমেন্টের ডিফল্ট প্রাইমারি কি হলো `_id` যা একটি ১২-বাইটের বাইনারি `ObjectId`। এর অভ্যন্তরীণ বিন্যাস: (১) প্রথম ৪ বাইট: ইউনিক্স টাইমস্ট্যাম্প (Timestamp - ফলে এটি নিজে থেকেই সময় অনুযায়ী সর্টেড থাকে)। (২) পরবর্তী ৫ বাইট: র্যান্ডম প্রসেস আইডেন্টিফায়ার (মেশিন ও প্রসেস ইউনিকনেস)। (৩) শেষ ৩ বাইট: ইনক্রিমেন্টিং কাউন্টার। এর বড় সুবিধা হলো: আমরা `_id.getTimestamp()` কল করে কোনো অতিরিক্ত কলাম ছাড়াই ডকুমেন্ট তৈরির সঠিক সময় বের করতে পারি।",
      b: "অবজেক্ট আইডি হলো মঙ্গোডিবির ১২ বাইটের অনন্য প্রাইমারি কি। প্রথম ৪ বাইটে টাইমস্ট্যাম্প, পরের ৫ বাইটে প্রসেস ইউনিকনেস এবং শেষ ৩ বাইটে ইনক্রিমেন্টাল কাউন্টার থাকে। কোনো createdAt কলাম ছাড়াই অবজেক্ট আইডি থেকে সঠিক সময় বের করা যায়।",
      e: "An ObjectId is a 12-byte BSON primary key composed of: a 4-byte Unix timestamp (ensuring natural temporal ordering), a 5-byte random machine/process value, and a 3-byte incrementing counter initialized randomly. This enables timestamp extraction directly from the ID.",
      code: "const id = new ObjectId();\nconsole.log(id.getTimestamp()); // Returns exact creation Date"
    },
    {
      lvl: "lvl1",
      q: "MongoDB-তে মৌলিক CRUD অপারেশনের প্রধান কমান্ডগুলো কী কী?",
      m: "(১) `Create`: `insertOne()`, `insertMany()`। (২) `Read`: `find()`, `findOne()`, সাথে প্রজেকশন ও সর্টিং (`.sort()`, `.limit()`, `.skip()`)। (৩) `Update`: `updateOne()`, `updateMany()`, `replaceOne()`—এগুলোতে অবশ্যই `$set`, `$inc`, `$push` অপারেটর ব্যবহার করতে হয়। (৪) `Delete`: `deleteOne()`, `deleteMany()`।",
      b: "মঙ্গোডিবির ক্রাড কমান্ডসমূহ: তৈরি করতে insertOne ও insertMany; পড়তে find ও findOne; আপডেট করতে updateOne ও updateMany ($set সহ); এবং মুছতে deleteOne ও deleteMany ব্যবহৃত হয়।",
      e: "MongoDB CRUD APIs: Create (`insertOne`, `insertMany`), Read (`find`, `findOne` with projections), Update (`updateOne`, `updateMany` using operators like `$set`, `$inc`, `$push`), and Delete (`deleteOne`, `deleteMany`).",
      code: "await db.collection('orders').updateOne(\n  { _id: orderId },\n  { $set: { status: 'PAID' }, $inc: { version: 1 } }\n);"
    },
    {
      lvl: "lvl1",
      q: "MongoDB-তে Update করার সময় `$set` অপারেটর না দিলে কী মারাত্মক বিপর্যয় ঘটে?",
      m: "যদি কোনো ডকুমেন্টে `{ name: 'Laptop', price: 1000, stock: 50 }` থাকে এবং আপনি আপডেট করার সময় `$set` না দিয়ে ভুল করে `updateOne({ _id: id }, { price: 1200 })` লিখে ফেলেন, তবে মঙ্গোডিবি পুরো পুরানো ডকুমেন্টটিকে প্রতিস্থাপন (Replace) করে ফেলবে! এর ফলে `name` এবং `stock` ফিল্ড সম্পূর্ণ গায়েব হয়ে গিয়ে শুধু `price` বেঁচে থাকবে! তাই ফিল্ড আপডেট করতে সর্বদা `$set: { price: 1200 }` ব্যবহার করতে হবে।",
      b: "$set অপারেটর না দিলে মঙ্গোডিবি সম্পূর্ণ ডকুমেন্টকে প্রতিস্থাপন করে ফেলে, যার ফলে অন্যান্য প্রয়োজনীয় সব কলাম মুছে যায়। তাই শুধুমাত্র নির্দিষ্ট কলাম আপডেটের জন্য সর্বদা $set ব্যবহার বাধ্যতামূলক।",
      e: "Omitting update operators (like `$set`) in legacy drivers or calling `replaceOne` overwrites the entire document, purging all unmentioned fields. Always wrap modifications inside atomic operators like `$set: { field: val }` or `$inc: { count: 1 }`.",
      tip: "ইন্টারভিউতে '$set অপারেটর ছাড়া সম্পূর্ণ ডকুমেন্ট রিপ্লেস হওয়ার ঝুঁকি' উল্লেখ করা খুব গুরুত্বপূর্ণ।"
    },

    // --- LEVEL 2 (5 Questions) ---
    {
      lvl: "lvl2",
      q: "MongoDB Array Update Operators: `$push`, `$addToSet`, `$pull`, এবং Positional Operator (`$`) কীভাবে কাজ করে?",
      m: "(১) `$push`: অ্যারেতে নতুন আইটেম যোগ করে (ডুপ্লিকেট হলেও)। (২) `$addToSet`: শুধুমাত্র তখনই আইটেম যোগ করে যদি আইটেমটি অ্যারেতে আগে থেকে না থাকে (Set-এর মতো ডুপ্লিকেট রোধ করে)। (৩) `$pull`: শর্ত পূরণকারী আইটেমকে অ্যারে থেকে ডিলিট করে দেয়। (৪) Positional Operator (`$`): নেস্টেড অ্যারের ঠিক যে আইটেমটি কোয়েরি ফিল্টারে ম্যাচ করেছে, হুবহু সেই নির্দিষ্ট আইটেমটির ফিল্ড আপডেট করে (`'items.$.price': 500`)।",
      b: "$push অ্যারেতে নতুন মান যোগ করে, $addToSet ডুপ্লিকেট ছাড়া অনন্য মান যোগ করে, $pull অ্যারে থেকে উপাদান মুছে ফেলে এবং পজিশনাল অপারেটর ($) নেস্টেড অ্যারের নির্দিষ্ট ম্যাচ করা উপাদানকে আপডেট করে।",
      e: "Array operators: `$push` appends elements to an array; `$addToSet` appends strictly if unique; `$pull` removes elements matching a filter; and the positional operator (`$`) targets the specific matched array element from the query criteria.",
      code: "await db.collection('orders').updateOne(\n  { _id: orderId, 'items.productId': pId },\n  { $set: { 'items.$.price': newPrice } }\n);"
    },
    {
      lvl: "lvl2",
      q: "MongoDB Index Types: Single Field, Compound Index, Multikey Index, এবং TTL Index-এর ব্যবহার কী?",
      m: "(১) `Single Field Index`: একটি মাত্র কলামে ইনডেক্স (`{ email: 1 }`)। (২) `Compound Index`: একাধিক কলামের ওপর ইনডেক্স (`{ tenantId: 1, createdAt: -1 }`)। (৩) `Multikey Index`: যখন কোনো অ্যারে ফিল্ডের ওপর ইনডেক্স তৈরি করা হয় (যেমন ট্যাগ্স অ্যারে), মঙ্গোডিবি স্বয়ংক্রিয়ভাবে প্রতিটি অ্যারে উপাদানের জন্য ইনডেক্স এন্ট্রি তৈরি করে। (৪) `TTL (Time-To-Live) Index`: তারিখ ফিল্ডের ওপর তৈরি ইনডেক্স যা নির্দিষ্ট সময় (যেমন ৩০ দিন বা ১ ঘণ্টা) পার হওয়ার পর ব্যাকগ্রাউন্ডে ডকুমেন্টটিকে স্বয়ংক্রিয়ভাবে ডাটাবেজ থেকে মুছে দেয় (ওটিপি বা সেশন ক্লিনআপের জন্য পারফেক্ট)।",
      b: "মঙ্গোডিবি ইনডেক্স: সিঙ্গেল ফিল্ড একক কলামে চলে, কম্পাউন্ড ইনডেক্স একাধিক ফিল্ডে চলে, মাল্টিকি ইনডেক্স অ্যারের উপাদান ইনডেক্স করে এবং টিটিএল (TTL) ইনডেক্স নির্দিষ্ট সময় পর স্বয়ংক্রিয়ভাবে পুরানো ডাটা মুছে দেয়।",
      e: "Index varieties: Single Field indexes one key; Compound indexes evaluate multi-attribute prefixes; Multikey indexes index array elements individually; TTL (Time-To-Live) indexes automatically purge documents after a predefined duration (ideal for OTP tokens or session logs).",
      code: "db.collection('sessions').createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 }); // TTL Index"
    },
    {
      lvl: "lvl2",
      q: "MongoDB Replica Sets কী এবং Primary, Secondary, ও Arbiter নোড কীভাবে High Availability নিশ্চিত করে?",
      m: "Replica Set হলো একাধিক মঙ্গোডিবি সার্ভারের একটি ক্লাস্টার যা একই ডেটা শেয়ার করে হাই-অ্যাভেইলেবিলিটি দেয়। ক্লাস্টারে ১টি `Primary` নোড থাকে যা সমস্ত রাইট অপারেশন গ্রহণ করে এবং অপলগ (Oplog) দিয়ে বাকি `Secondary` নোডগুলোতে ডেটা রেপ্লিকেট করে। কোনো কারণে প্রাইমারি নোড ক্র্যাশ করলে সেকেন্ডারি নোডগুলো একটি ইন্টারনাল ভোটিং বা ইলেকশন (Raft-like consensus) করে সেকেন্ডের মধ্যে নতুন প্রাইমারি নির্বাচিত করে। `Arbiter` নোডে কোনো ডেটা থাকে না, এটি শুধুমাত্র টাই-ব্রেকিং ভোটের জন্য ব্যবহৃত হয়।",
      b: "রেপ্লিকা সেট ক্লাস্টারে ১টি প্রাইমারি ও একাধিক সেকেন্ডারি নোড থাকে। প্রাইমারি ডাউন হলে সেকেন্ডারি নোডগুলো স্বয়ংক্রিয় ভোটের মাধ্যমে নতুন প্রাইমারি বেছে নিয়ে নিরবচ্ছিন্ন সেবা নিশ্চিত করে। আরবিটার শুধুমাত্র ভোটিংয়ে অংশ নেয়।",
      e: "A Replica Set provides automated redundancy: one Primary node handles writes and emits the replication Oplog, while Secondary nodes asynchronously replicate changes. If the Primary fails, secondaries hold an automated election electing a new Primary within seconds. Arbiters vote in elections without storing data.",
      tip: "প্রোডাকশন মঙ্গোডিবির জন্য ন্যূনতম ৩টি নোড সমৃদ্ধ রেপ্লিকা সেট আবশ্যক।"
    },
    {
      lvl: "lvl2",
      q: "MongoDB Write Concern (`w: 1` vs `w: 'majority'`) এবং Read Concern-এর গুরুত্ব কী?",
      m: "`Write Concern` নির্ধারণ করে ডাটাবেজ রাইট অপারেশনকে সফল ঘোষণা করার আগে কতগুলো নোডে ডেটা সেভ হওয়া পর্যন্ত অপেক্ষা করবে। `w: 1` মানে শুধু প্রাইমারি নোডের মেমরিতে ডেটা সেভ হলেই একনলেজমেন্ট দেয় (খুব দ্রুত কিন্তু প্রাইমারি ক্র্যাশ করলে ডেটা হারানোর ঝুঁকি থাকে)। আর `w: 'majority'` মানে রেপ্লিকা সেটের অর্ধেকের বেশি নোডে ডেটা নিশ্চিতভাবে কমিট হওয়ার পরই কেবল ক্লায়েন্টকে সফল রেসপন্স দেয়। আর্থিক ও গুরুত্বপূর্ণ ডাটায় সর্বদা `w: 'majority'` এবং `journal: true` ব্যবহার করা বাধ্যতামূলক।",
      b: "রাইট কনসার্ন নির্ধারণ করে কতগুলো সার্ভারে ডেটা নিশ্চিত হওয়ার পর রেসপন্স দেওয়া হবে। w: 1 শুধুমাত্র প্রাইমারি নোডে সেভ হলেই রেসপন্স দেয়, আর w: 'majority' ক্লাস্টারের অধিকাংশ নোডে নিশ্চিত হওয়ার পর রেসপন্স দিয়ে ডেটা সুরক্ষার সর্বোচ্চ নিশ্চয়তা দেয়।",
      e: "Write Concern controls the acknowledgment guarantee level: `w: 1` acknowledges once written to the Primary (fast, potential data loss upon failover). `w: 'majority'` guarantees persistence across a majority of replica set nodes with write-ahead journaling before responding.",
      code: "db.collection('orders').insertOne(doc, { writeConcern: { w: 'majority', j: true } });"
    },
    {
      lvl: "lvl2",
      q: "MongoDB Capped Collections কী এবং সাধারণ কালেকশনের চেয়ে এরা কেন ভিন্ন?",
      m: "Capped Collection হলো একটি ফিক্সড-সাইজ বৃত্তাকার (Circular Buffer) কালেকশন। আপনি যদি এর সাইজ ১০GB ফিক্সড করে দেন, কালেকশনটি ডিস্কে ঠিক ১০GB জায়গায় সীমাবদ্ধ থাকবে। যখন কালেকশন পূর্ণ হয়ে যায়, নতুন ডকুমেন্ট ইনসার্ট হলে এটি নিজে থেকেই সবচেয়ে পুরানো ডকুমেন্টটিকে ওভাররাইট করে ডিলিট করে দেয়। এর বড় সুবিধা হলো: এতে ইনসার্ট ও রিড স্পিড অবিশ্বাস্য দ্রুত এবং কোনো ম্যানুয়াল লগ ক্লিনআপ বা ডিলিট স্ক্রিপ্ট লিখতে হয় না (লগিং বা আইওটি ডেটার জন্য আদর্শ)।",
      b: "ক্যাপড কালেকশন ফিক্সড সাইজের বৃত্তাকার বাফার হিসেবে কাজ করে। সর্বোচ্চ ধারণক্ষমতা পূর্ণ হলে এটি স্বয়ংক্রিয়ভাবে সবচেয়ে পুরানো ডেটা মুছে নতুন ডেটার জায়গা করে দেয়, ফলে কোনো ম্যানুয়াল ডিলিট ছাড়াই মেমোরি নিয়ন্ত্রণে থাকে।",
      e: "Capped Collections are fixed-size circular collections preserving document insertion order. Once allocated size limits are reached, insertion of new documents automatically overwrites the oldest entries, providing high-throughput logging buffers with zero manual purging overhead.",
      code: "db.createCollection('app_logs', { capped: true, size: 52428800, max: 50000 });"
    },

    // --- LEVEL 3 (5 Questions) ---
    {
      lvl: "lvl3",
      q: "MongoDB Sharding আর্কিটেকচার (Mongos Router, Config Servers, Shards) এবং Shard Key সিলেকশন স্ট্র্যাটেজি কীভাবে কাজ করে?",
      m: "যখন ডেটার সাইজ বা কুয়েরি ভলিউম সিঙ্গেল সার্ভারের ধারণক্ষমতা ছাড়িয়ে যায়, Sharding পুরো ডেটাকে একাধিক সার্ভারে (Shards) হরিজোন্টালি ভাগ করে। আর্কিটেকচার: (১) `Mongos Router`: ক্লায়েন্টের সমস্ত কুয়েরি গ্রহণ করে উপযুক্ত শার্ডে পাঠায়। (২) `Config Server`: ক্লাস্টারের মেটাডাটা ও ডেটা ডিস্ট্রিবিউশন ম্যাপ ধরে রাখে। (৩) `Shards`: আসল ডেটা ধারণ করে। Shard Key নির্বাচন সবচেয়ে সংবেদনশীল: কখনোই মনোটোনিক অটো-ইনক্রিমেন্ট আইডি শার্ড কি হিসেবে নেওয়া যাবে না (Hotspotting তৈরি করে); সবসময় উচ্চ কার্ডিনালিটি বিশিষ্ট হ্যাশড কি বা কম্পোজিট কি (`{ tenantId: 1, _id: 'hashed' }`) নিতে হবে যাতে ডেটা সমস্ত শার্ডে সমানভাবে বিন্যস্ত থাকে।",
      b: "শার্ডিং বিশাল ডাটাবেজকে একাধিক সার্ভারে বিভক্ত করে হরিজোন্টাল স্কেলিং নিশ্চিত করে। মঙ্গোস রাউটার কুয়েরি পরিচালনা করে এবং শার্ড কি অনুসারে ডেটা শার্ডগুলোতে ভাগ হয়। হটস্পটিং এড়াতে উচ্চ বৈচিত্র্যের হ্যাশড শার্ড কি নির্বাচন করা অপরিহার্য।",
      e: "MongoDB Sharding distributes data horizontally across shards via Mongos Query Routers and Config Servers. Selecting a resilient Shard Key is paramount: avoid monotonic ascending keys that cause write hotspots; enforce high-cardinality compound or hashed shard keys (`{ tenantId: 1, _id: 'hashed' }`) for uniform chunk distribution.",
      tip: "শার্ড কি নির্বাচনে 'Hotspotting vs Uniform Distribution' আলোচনা করা সিনিয়র আর্কিটেক্টের পরিচয়।"
    },
    {
      lvl: "lvl3",
      q: "MongoDB WiredTiger Storage Engine: চেকপয়েন্টস (Checkpoints) এবং রাইট-অ্যাহেড জার্নালিং (Journaling) কীভাবে ক্র্যাশ রিকভারি নিশ্চিত করে?",
      m: "WiredTiger মেমোরি ক্যাশে ডেটা রাইট করে অতি দ্রুত রেসপন্স দেয়। ডিফল্টভাবে প্রতি ৬০ সেকেন্ড পর পর WiredTiger একটি ফিজিক্যাল 'Checkpoint' ডিস্কে লিখে স্ন্যাপশট পারসিস্ট করে। চেকপয়েন্টের মধ্যবর্তী সময়ে সার্ভার ক্র্যাশ করলে ডেটা যাতে না হারায়, সেজন্য প্রতি ১০০ মিলিসেকেন্ড বা প্রতি রাইটে একটি 'Journal' লগে ডিস্কে অপারেশন লেখা হয়। সার্ভার রিস্টার্টের সময় WiredTiger শেষ চেকপয়েন্ট লোড করে এবং জার্নাল লগটি রি-প্লে করে মাত্র কয়েক সেকেন্ডে সম্পূর্ণ ডেটাবেজ ১০০% নিখুঁত অবস্থায় রিকভার করে নেয়।",
      b: "ওয়্যার্ডটাইগার ইঞ্জিন মেমরিতে কাজ করে প্রতি ৬০ সেকেন্ডে ডিস্কে চেকপয়েন্ট তৈরি করে। মধ্যবর্তী সময়ে ক্র্যাশ হলেও জার্নাল লগ রি-প্লে করে সমস্ত আন-কমিটেড ডেটা মুহূর্তের মধ্যে শতভাগ অক্ষত অবস্থায় ফিরিয়ে আনা হয়।",
      e: "The WiredTiger storage engine combines dirty cache flushing with periodic 60-second Checkpoints. To guard the window between checkpoints, write-ahead Journaling persists binary operations to disk sequentially. Upon unexpected termination, WiredTiger replays journals from the last checkpoint to guarantee ACID durability.",
      code: "// WiredTiger writes to memory cache -> journals sequentially -> checkpoints to disk every 60s"
    },
    {
      lvl: "lvl3",
      q: "MongoDB-তে 'Schema Design Patterns' (Bucket Pattern, Polymorphic Pattern, Subset Pattern) কীভাবে বাস্তব সমস্যার সমাধান করে?",
      m: "(১) `Bucket Pattern`: টাইম-সিরিজ ডেটা বা আইওটি রিডিংয়ে প্রতি সেকেন্ডে কোটি রো ইনসার্ট না করে ১ ঘণ্টার সব রিডিংকে ১টি ডকুমেন্টে বাকেট করে রাখা। (২) `Subset Pattern`: একটি প্রোডাক্টের ১০০টি রিভিউয়ের মধ্যে শুধুমাত্র টপ ৫টি রিভিউ প্রোডাক্ট ডকুমেন্টে রাখা, বাকিগুলো আলাদা কালেকশনে রাখা (যাতে পেজ লোড ফাস্ট হয় ও মেমোরি বাঁচে)। (৩) `Polymorphic Pattern`: একই কালেকশনে ভিন্ন ভিন্ন ক্যাটাগরির পণ্য রাখা যাদের নিজস্ব স্পেসিফিক ফিল্ড ভিন্ন কিন্তু কমন ফিল্ড এক।",
      b: "মঙ্গোডিবি স্কিমা প্যাটার্ন: বাকেট প্যাটার্ন টাইম-সিরিজ ডেটাকে গ্রুপ করে রাখে, সাবসেট প্যাটার্ন শুধুমাত্র টপ রিভিউগুলোকে ডকুমেন্টে রেখে দ্রুত লোডিং দেয় এবং পলিমরফিক প্যাটার্ন ভিন্ন বৈশিষ্ট্যের ডেটাকে একটি কালেকশনে ধারণ করে।",
      e: "MongoDB design patterns: Bucket Pattern groups high-frequency time-series data into bounded hourly documents. Subset Pattern co-locates the top 5 most-accessed related entities (e.g. top reviews) within the root document to eliminate joins. Polymorphic Pattern stores variants of a family under a common collection.",
      tip: "ইন্টারভিউতে Subset Pattern এবং Bucket Pattern-এর নাম বলা দারুণ টেকনিক্যাল প্লাস পয়েন্ট।"
    },
    {
      lvl: "lvl3",
      q: "Change Streams (`watch()`) কী এবং কীভাবে এটি রিয়েল-টাইম ইভেন্ট-ড্রিভেন নোটিফিকেশন সিস্টেমে ব্যবহৃত হয়?",
      m: "Change Streams হলো MongoDB-র একটি বিল্ট-ইন ফিচার যা রেপ্লিকা সেটের অভ্যন্তরীণ Oplog রিড করে কালেকশনে যেকোনো ইনসার্ট, আপডেট বা ডিলিট হওয়া মাত্রই লাইভ ইভেন্ট স্ট্রিম করে (`collection.watch()`)। এটি ব্যবহার করে কোনো থার্ড-পার্টি মেসেজ ব্রোকার বা পোলিং ছাড়াই সরাসরি নোড জেএস ব্যাকএন্ডে সকেট দিয়ে লাইভ নোটিফিকেশন পুশ করা যায় বা Elasticsearch-এ রিয়েল-টাইমে সার্চ ইনডেক্স সিঙ্ক রাখা যায়।",
      b: "চেঞ্জ স্ট্রিমস মঙ্গোডিবির লাইভ ডেটা পরিবর্তনের ওপর ভিত্তি করে রিয়েল-টাইম ইভেন্ট সরবরাহ করে। এর মাধ্যমে ডাটাবেজে কোনো পরিবর্তন হওয়া মাত্রই স্বয়ংক্রিয়ভাবে ক্লায়েন্টে সকেট নোটিফিকেশন বা সার্চ সিঙ্ক পরিচালনা করা যায়।",
      e: "Change Streams allow applications to stream real-time data mutations without polling by tailing the replication Oplog. Developers subscribe via `collection.watch()`, feeding event payloads directly into WebSockets or search index pipelines.",
      code: "const changeStream = db.collection('orders').watch();\nchangeStream.on('change', (next) => {\n  io.emit('order_updated', next.fullDocument);\n});"
    },
    {
      lvl: "lvl3",
      q: "MongoDB-তে Memory Overhead ও Working Set কীভাবে ক্যালকুলেট করবে এবং RAM-এর বাইরে ডেটা গেলে কী ঘটে?",
      m: "`Working Set` হলো ডাটাবেজের মোট ডেটা এবং ইনডেক্সের সেই অংশ যা সবচেয়ে বেশি সক্রিয়ভাবে ব্যবহার হচ্ছে। আদর্শ অবস্থায় Working Set সর্বদা সার্ভারের ফিজিক্যাল RAM-এর ভেতরে থাকতে হবে। যদি Working Set র্যাম ছাড়িয়ে যায়, তবে মঙ্গোডিবিকে ডিস্ক পেজ সোয়াপিং (Disk Paging) করতে হয়, যার ফলে কুয়েরি স্পিড ১০০ গুণ স্লো হয়ে যায় এবং সার্ভার থ্রুপুট ভেঙে পড়ে। `db.stats()` এবং `wiredTiger.cache` মেট্রিক্স দিয়ে আমরা রিয়েল-টাইমে RAM ব্যবহার মনিটর করি।",
      b: "ওয়ার্কিং সেট হলো সক্রিয়ভাবে ব্যবহৃত ডেটা ও ইনডেক্সের মেমোরি সাইজ। এটি সার্ভারের র্যামের মধ্যে না থাকলে ডাটাবেজ ডিস্ক পেজিং শুরু করে মারাত্মক স্লো হয়ে যায়। তাই র্যামের সাইজ সবসময় ওয়ার্কিং সেটের চেয়ে বড় রাখা বাধ্যতামূলক।",
      e: "The Working Set comprises frequently accessed documents and indexes. When the Working Set exceeds available WiredTiger RAM caches, disk thrashing occurs via OS page faults, crashing query throughput. Ensure RAM exceeds total active index and frequently accessed data footprints.",
      tip: "ইন্টারভিউতে 'Ensure RAM exceeds Working Set to prevent disk paging' নীতি তুলে ধরবে।"
    },

    // --- SITUATION (5 Questions) ---
    {
      lvl: "situation",
      q: "MongoDB-তে একটি ডকুমেন্টের সাইজ ১৬MB লিমিট ক্রস করায় `BSONObjectTooLarge` এরর দিয়ে প্রোডাকশন এপিআই ক্র্যাশ করল। কীভাবে রি-আর্কিটেক্ট করবে?",
      m: "কারণ: কোনো ডকুমেন্টের ভেতর আনবাউন্ডেড অ্যারে (যেমন কোটি কোটি লগ বা অ্যাক্টিভিটি হিস্ট্রি) এমবেড করে রাখা হয়েছিল। সমাধান: (১) আনবাউন্ডেড অ্যারেকে এমবেড না করে 'Referenced Model' এ রূপান্তর করব: অ্যাক্টিভিটিগুলোকে একটি আলাদা `ActivityLogs` কালেকশনে রেখে সেখানে প্যারেন্ট `userId` দিয়ে রেফারেন্স করব। (২) বড় বাইনারি ফাইল বা ছবির জন্য মঙ্গোডিবির `GridFS` ব্যবহার করব যা ফাইলকে ২৫৫KB-এর ছোট ছোট চাঙ্কে ভাগ করে স্টোর করে। (৩) পুরানো ডেটার জন্য TTL ইন্ডেক্স ব্যবহার করে আর্কাইভ করব।",
      b: "মঙ্গোডিবির ১৬ মেগাবাইট সীমা অতিক্রম প্রতিরোধে আনবাউন্ডেড অ্যারেকে পৃথক কালেকশনে সরিয়ে রেফারেন্স মডেল তৈরি করতে হবে। বড় ফাইলের ক্ষেত্রে GridFS ব্যবহার করে ফাইলগুলোকে ২৫৫ কেবি চাঙ্কে ভাগ করে সংরক্ষণ করতে হবে।",
      e: "Resolve `BSONObjectTooLarge` by decomposing unbounded embedded arrays into normalized child collections referencing the parent ID. For massive binary assets, adopt MongoDB's `GridFS` chunking standard, storing media across 255KB bucket chunks.",
      code: "// Split unbounded activities into separate collection with parent reference:\n{ _id: ObjectId(), parentId: ObjectId('...'), log: 'Action' }"
    },
    {
      lvl: "situation",
      q: "একটি কুয়েরি রান করতে গিয়ে কোটি ডকুমেন্টের কালেকশনে পুরো সার্ভারের CPU ১০০% হয়ে গেছে। কীভাবে কুয়েরি এক্সিকিউশন প্ল্যান বিশ্লেষণ করবে?",
      m: "আমরা কুয়েরির শেষে `.explain('executionStats')` রান করব। এক্সিকিউশন স্ট্যাটে ৩টি জিনিস দেখব: (১) `stage`: এটি যদি `COLLSCAN` (Collection Scan) দেখায়, তার মানে কোনো ইনডেক্স ব্যবহার হচ্ছে না এবং পুরো কালেকশন স্ক্যান হচ্ছে! (২) `totalDocsExamined` বনাম `nReturned`: যদি ১০টি রেজাল্ট পেতে ১০ লক্ষ ডকুমেন্ট স্ক্যান করতে হয়, তবে নিশ্চিতভাবে ইনডেক্স মিসিং। (৩) সমাধান: কুয়েরির ফিল্টার ফিল্ডের ওপর একটি সুনির্দিষ্ট B-Tree বা কম্পোজিট ইনডেক্স তৈরি করব যাতে স্টেজটি `IXSCAN` (Index Scan) এ রূপান্তরিত হয়।",
      b: "কুয়েরি বিশ্লেষণ করতে .explain('executionStats') চালাতে হবে। COLLSCAN দেখালে বুঝতে হবে ইনডেক্স নেই। উপযুক্ত ইনডেক্স তৈরি করে স্টেজকে IXSCAN এ রূপান্তর করলে কুয়েরি মুহূর্তেই সম্পন্ন হবে।",
      e: "Profile slow queries via `.explain('executionStats')`. Look for `stage: 'COLLSCAN'` (full table scan) and a catastrophic disparity between `totalDocsExamined` and `nReturned`. Apply a compound index covering the query predicate to force rapid `IXSCAN` executions.",
      code: "db.orders.find({ tenantId: '123', status: 'PAID' }).explain('executionStats');"
    },
    {
      lvl: "situation",
      q: "একাধিক নোড থেকে একই সাথে ডেটা ইনসার্ট করার সময় ডুপ্লিকেট ইমেইল বা ফোন নম্বর সেভ হয়ে যাচ্ছে। মঙ্গোডিবিতে কীভাবে ডেটাবেজ স্তরে গ্যারান্টি দেবে?",
      m: "সমাধান: শুধু অ্যাপ্লিকেশন কোডে `findOne()` চেক করার ওপর নির্ভর করা যাবে না (কারণ কনকারেন্ট রিকোয়েস্টে রেস কন্ডিশন হয়)। আমরা কালেকশনে ডেটাবেজ স্তরে একটি Unique Index তৈরি করব: `db.users.createIndex({ email: 1 }, { unique: true })`। এর ফলে একাধিক রিকোয়েস্ট একই সময়ে আসলেও ডাটাবেজ ইঞ্জিন প্রথমটিকে ইনসার্ট করে বাকিগুলোকে সাথে সাথে `E11000 duplicate key error` দিয়ে রিজেক্ট করবে।",
      b: "রেস কন্ডিশন ঠেকাতে শুধুমাত্র কোডের ওপর নির্ভর না করে ডাটাবেজে ইউনিক ইনডেক্স তৈরি করতে হবে। মঙ্গোডিবি ইঞ্জিন নিজে থেকেই ডুপ্লিকেট ইনসার্ট আটকে E11000 এরর দিয়ে তথ্যের অভিন্নতা নিশ্চিত করবে।",
      e: "Application-level checks suffer from race conditions. Enforce database-level uniqueness via Unique Indexes: `createIndex({ email: 1 }, { unique: true })`. Concurrent duplicates are rejected immediately with atomic `E11000` duplicate key errors.",
      code: "db.collection('users').createIndex({ email: 1 }, { unique: true });"
    },
    {
      lvl: "situation",
      q: "প্রোডাকশন ডেটাবেজে একটি কালেকশনে ১০ কোটি রো রয়েছে। নতুন একটি ইনডেক্স তৈরি করতে গিয়ে পুরো প্রোডাকশন ডাটাবেজ রিড/রাইট লক হয়ে গেছে। নিরাপদ ইনডেক্সিং কীভাবে করবে?",
      m: "MongoDB v4.2-এর আগের ভার্সনে ইনডেক্স তৈরির সময় ডাটাবেজ এক্সক্লুসিভ লক নিত। MongoDB 4.2+ এ ব্যাকগ্রাউন্ড ইনডেক্সিং ডিফল্টভাবে নন-ব্লকিং অপ্টিমাইজেশনে চলে। তবে সেফ প্র্যাকটিস হলো: রেপ্লিকা সেটের ক্ষেত্রে 'Rolling Index Build' স্ট্র্যাটেজি নেওয়া: প্রথমে সেকেন্ডারি নোডগুলোকে একে একে ক্লাস্টার থেকে ড্রপ করে মেইনটেন্যান্স মোডে ইনডেক্স বিল্ড করা, এরপর প্রাইমারিকে স্টেপ-ডাউন করিয়ে নতুন ইনডেক্সড নোডকে প্রাইমারি বানানো। ফলে লাইভ ট্রাফিকের ০ সেকেন্ড ডাউনটাইম হয়।",
      b: "বিশাল টেবিলে ইনডেক্সিংয়ের সময় ডাউনটাইম এড়াতে আধুনিক মঙ্গোডিবির নন-ব্লকিং বিল্ড ব্যবহার করতে হয় অথবা রোলিং ইনডেক্স স্ট্র্যাটেজি অনুযায়ী সেকেন্ডারি নোডগুলোতে একে একে ইনডেক্স বানিয়ে লাইভ ট্রাফিক সুরক্ষিত রাখতে হয়।",
      e: "In high-traffic clusters, build indexes using Rolling Index Builds: isolate Secondary replica nodes sequentially, build the index locally in standalone maintenance mode, rejoin, and trigger a graceful primary stepdown once secondaries are caught up, achieving zero downtime.",
      tip: "রেপ্লিকা সেটে Rolling Index Build-এর কথা বলা সিনিয়র ডিবিএ ও ব্যাকএন্ড আর্কিটেকচারের গভীরতা প্রমাণ করে।"
    },
    {
      lvl: "situation",
      q: "মঙ্গোডিবিতে একটি ডেটাবেজ আপডেট করার সময় আংশিক ডেটা আপডেট হয়ে ক্র্যাশ করায় ডেটা ইনকনসিস্টেন্ট হয়ে গেছে। কীভাবে অ্যাটমিকালি রোলব্যাক নিশ্চিত করবে?",
      m: "সমাধান: আমরা MongoDB Multi-Document ACID Transactions ব্যবহার করব। সেশন ওপেন করে `session.startTransaction()` দিয়ে কাজ শুরু করব। যদি কোনো একটি আপডেট বা ইনসার্ট ফেইল করে, আমরা `await session.abortTransaction()` কল করব। এর ফলে পূর্বের সমস্ত পরিবর্তন স্বয়ংক্রিয়ভাবে রোলব্যাক হয়ে ডাটাবেজ পূর্বের নিখুঁত অবস্থায় ফিরে যাবে। কাজ সফল হলেই কেবল `commitTransaction()` কল করব।",
      b: "আংশিক আপডেটে ডেটা করাপ্ট হওয়া ঠেকাতে মঙ্গোডিবি ট্রানজাকশন ব্যবহার করতে হবে। কোনো ত্রুটি হলে abortTransaction দিয়ে সাথে সাথে সব পরিবর্তন রোলব্যাক করে ডাটাবেজ সুরক্ষিত রাখা যায়।",
      e: "Protect multi-document mutations by wrapping operations inside client sessions with `startTransaction()`. Trap errors inside a catch block to execute `session.abortTransaction()`, ensuring atomic rollback across all affected documents.",
      code: "const session = client.startSession();\nsession.startTransaction();\ntry {\n  // mutations...\n  await session.commitTransaction();\n} catch (e) {\n  await session.abortTransaction();\n} finally { session.endSession(); }"
    },

    // --- REALWORLD (5 Questions) ---
    {
      lvl: "realworld",
      q: "Dokani POS-এর মাল্টি-স্টোর প্রোডাক্ট ক্যাটালগে আন-স্ট্রাকচার্ড ও ডায়নামিক ভ্যারিয়েন্ট (সাইজ, রঙ, মডেল) হ্যান্ডেল করতে MongoDB কীভাবে ব্যবহার করা যায়?",
      m: "কাপড়ের দোকানে থাকে সাইজ ও রঙ, মোবাইলের দোকানে থাকে র‍্যাম, রম ও আইএমইআই নম্বর, আর ওষুধের দোকানে থাকে পাওয়ার ও জেনেরিক নাম। রিলেশনাল ডাটাবেজে এই ভিন্ন ভিন্ন ফিল্ডের জন্য শত শত ফাঁকা কলাম বা জটিল EAV (Entity-Attribute-Value) মডেল লাগত। MongoDB-র পলিমরফিক ডকুমেন্ট মডেলে আমরা একটি কমন `Product` ডকুমেন্টের ভেতর `attributes: { ram: '8GB', color: 'Black', imei: [...] }` অবজেক্ট রাখতে পারি। প্রতিটি দোকানদার তার নিজস্ব ইচ্ছামতো কাস্টম ফিল্ড যোগ করতে পেরেছে কোনো স্কিমা মাইগ্রেশন ছাড়াই।",
      b: "দোকানি ক্যাটালগে বিভিন্ন ধরনের পণ্যের কাস্টম ফিল্ড পরিচালনার জন্য মঙ্গোডিবির ফ্লেক্সিবল স্কিমা ব্যবহার করা হয়েছিল। কোনো স্কিমা মাইগ্রেশন ছাড়াই মোবাইলের র‍্যাম বা কাপড়ের সাইজ অনায়াসে ডায়নামিক অ্যাট্রিবিউট অবজেক্টে সেভ করা সম্ভব ছিল।",
      e: "In retail catalogs with heterogeneous attributes (apparel sizes vs smartphone IMEI/RAM), MongoDB eliminates brittle SQL EAV tables. Storing dynamic attributes inside polymorphic document dictionaries enables store owners to define custom properties without running DDL schema migrations.",
      tip: "ডায়নামিক ই-কমার্স ক্যাটালগে রিলেশনাল EAV বনাম NoSQL পলিমরফিক মডেলের তুলনা চমৎকার আর্কিটেকচারাল ডিসিশন।"
    },
    {
      lvl: "realworld",
      q: "Dokani POS-এ শত শত স্টোরের দৈনিক ইনভেন্টরি অডিট লগ এবং ক্যাশ ড্রয়ার ট্র্যাকিংয়ে Capped Collections কীভাবে অপটিমাইজ করেছিল?",
      m: "দোকানগুলোতে প্রতি সেকেন্ডে শত শত বারকোড স্ক্যান ও ক্যাশ ড্রয়ার ইভেন্ট ঘটত। সাধারণ কালেকশনে রাখলে প্রতি মাসে কোটি রো জমে ডিস্ক ফুল হয়ে যেত। আমরা প্রতিটি দোকানের জন্য একটি করে `Capped Collection` কনফিগার করেছিলাম যার ম্যাক্স সাইজ ছিল ৫০০MB। নতুন লগ আসলে স্বয়ংক্রিয়ভাবে সবচেয়ে পুরানো লগ ওভাররাইট হয়ে মুছে যেত। এর ফলে ডিস্ক কখনো ফুল হয়নি এবং কোনো ক্রন জব বা ব্যাকগ্রাউন্ড ডিলিট স্ক্রিপ্ট ছাড়াই লাইভ অডিট ট্রেইল সুপারফাস্ট পারফর্ম করেছিল।",
      b: "দোকানি অডিট লগে আমরা ক্যাপড কালেকশন ব্যবহার করেছি। ৫০০ মেগাবাইট সাইজ ফিক্সড থাকায় নতুন লগ আসলে স্বয়ংক্রিয়ভাবে পুরানো লগ মুছে যেত, ফলে কোনো ম্যানুয়াল ক্লিনআপ ছাড়াই ডিস্ক সবসময় সুরক্ষিত ছিল।",
      e: "Utilized MongoDB Capped Collections for Dokani's high-velocity register audit logs, bounding collections to 500MB per tenant. The FIFO circular buffer automatically recycled obsolete events at wire speed without triggering expensive database DELETE locks.",
      code: "db.createCollection('tenant_audit_logs', { capped: true, size: 524288000 });"
    },
    {
      lvl: "realworld",
      q: "PTTABD প্ল্যাটফর্মে ভিডিও লেকচার দেখার ওয়াচ-টাইম ও ইউজার সেশন ট্র্যাকিংয়ে TTL Indexes কীভাবে মেমোরি বাঁচিয়েছিল?",
      m: "লাইভ ভিডিও দেখার সময় প্রতি ১০ সেকেন্ডে একটি পোলিং পিং আসত যা লাখ লাখ সাময়িক সেশন তৈরি করত। এই ডেটা চিরতরে ডাটাবেজে রাখার কোনো প্রয়োজন ছিল না (শুধু কারেন্ট অ্যাক্টিভ ছাত্রদের তালিকা দেখার জন্য)। আমরা সেশনের ওপর একটি TTL Index তৈরি করেছিলাম: `expireAfterSeconds: 300` (৫ মিনিট)। ছাত্র ব্রাউজার বন্ধ করে দিলে মঙ্গোডিবি ব্যাকগ্রাউন্ড থ্রেড ৫ মিনিট পর নিজে থেকেই ডেটাবেজ থেকে সেই সেশন মুছে দিত। আমাদের ডাটাবেজ মেমোরি সর্বদা ঝকঝকে ও দ্রুত ছিল।",
      b: "পিটিটিএবিডিতে ছাত্রদের লাইভ ভিডিও দেখার সাময়িক সেশন স্বয়ংক্রিয়ভাবে মুছে ফেলতে টিটিএল ইনডেক্স ব্যবহার করা হয়েছিল। ৫ মিনিট পর অব্যবহৃত সেশন স্বয়ংক্রিয় ডিলিট হওয়ায় কোনো অতিরিক্ত স্ক্রিপ্ট ছাড়াই ডাটাবেজ মেমোরি মুক্ত থাকত।",
      e: "Engineered ephemeral session heartbeats in PTTABD using TTL Indexes expiring after 300 seconds. When students exited, idle sessions vanished automatically via MongoDB's background TTL thread without running manual sweeping crons.",
      code: "db.video_sessions.createIndex({ lastPing: 1 }, { expireAfterSeconds: 300 });"
    },
    {
      lvl: "realworld",
      q: "MongoDB ও PostgreSQL-এর হাইব্রিড আর্কিটেকচার (Polyglot Persistence): কখন দুটি ডাটাবেজ একই সিস্টেমে একসাথে ব্যবহার করবে?",
      m: "Dokani POS-এর মতো বড় প্ল্যাটফর্মে আমরা Polyglot Persistence ব্যবহার করেছি: (১) `PostgreSQL`: সমস্ত কোর ট্রানজাকশন, ইনভয়েস বিলিং, কাস্টমার বাকি লেজার এবং ডাবল-এন্ট্রি অ্যাকাউন্টিংয়ের জন্য (যেখানে ১০০% ACID এবং রিলেশনাল ইন্টিগ্রিটি আবশ্যক)। (২) `MongoDB`: ডায়নামিক প্রোডাক্ট ক্যাটালগ প্রপার্টিজ, আন-স্ট্রাকচার্ড অডিট লগ এবং রিয়েল-টাইম চেঞ্জ স্ট্রিমস নোটিফিকেশনের জন্য। প্রতিটি ডাটাবেজ তার নিজস্ব শক্তিমত্তার জায়গায় ব্যবহৃত হওয়ায় পুরো আর্কিটেকচার ছিল অপরাজেয়।",
      b: "পলিগ্লট পারসিস্টেন্সে আমরা পোস্টগ্রেসকিউএল ব্যবহার করেছি আর্থিক লেনদেন, বিলিং ও অ্যাকাউন্টিংয়ের জন্য; আর মঙ্গোডিবি ব্যবহার করেছি ডায়নামিক প্রোডাক্ট ক্যাটালগ ও অডিট লগের জন্য। এতে উভয় ডাটাবেজের সেরা সুবিধা পাওয়া গেছে।",
      e: "Polyglot Persistence leverages specialized database engines for appropriate domains: PostgreSQL handles ACID financial ledgers, double-entry bookkeeping, and relational schemas, while MongoDB serves dynamic polymorphic product catalogs and unstructured telemetry logs.",
      tip: "পোস্টগ্রেস ও মঙ্গোডিবি একসাথে ব্যবহারের এই পলিগ্লট পারসিস্টেন্স ব্যাখ্যা করা সিনিয়র সফটওয়্যার আর্কিটেক্টদের চূড়ান্ত নমুনা।"
    },
    {
      lvl: "realworld",
      q: "MongoDB ডেটাবেজ আর্কিটেকচার ও ডেপ্লয়মেন্টে টিম স্ট্যান্ডার্ড নিশ্চিত করতে তোমার মূল প্রিন্সিপালগুলো কী?",
      m: "আমার মূল নীতিসমূহ: (১) প্রোডাকশনে কখনোই স্ট্যান্ডঅ্যালন নোড নয়—সর্বদা ন্যূনতম ৩-নোড Replica Set ব্যবহার করা। (২) প্রতিটি ঘন ঘন কুয়েরি করা ফিল্ডের ওপর সুনির্দিষ্ট B-Tree বা কম্পোজিট ইনডেক্স নিশ্চিত করা (`COLLSCAN` নিষিদ্ধ)। (৩) আনবাউন্ডেড অ্যারে পরিহার করে সাবসেট বা রেফারেন্স প্যাটার্ন মেনে ১৬MB লিমিট রক্ষা করা। (৪) আর্থিক ডাটায় সর্বদা `w: 'majority'` রাইট কনসার্ন এনফোর্স করা। (৫) নিয়মিত ব্যাকআপ (`mongodump`) ও ডিজাস্টার রিকভারি নিশ্চিত করা।",
      b: "আমার প্রধান নীতিসমূহ: প্রোডাকশনে রেপ্লিকা সেট নিশ্চিত করা, কোনো COLLSCAN না রেখে উপযুক্ত ইনডেক্স দেওয়া, ১৬ মেগাবাইট সীমা রক্ষা, মেজোরিটি রাইট কনসার্ন বজায় রাখা এবং নিয়মিত স্বয়ংক্রিয় ব্যাকআপ পরিচালনা করা।",
      e: "My core MongoDB architecture rules: (1) Mandatory 3-node Replica Sets in production, (2) Zero tolerance for COLLSCANs via verified compound indexing, (3) Bounded document growth enforcing Subset patterns against 16MB ceilings, (4) `w: 'majority'` write concerns on critical mutations, and (5) Automated snapshot backups.",
      tip: "এই সংক্ষিপ্ত নীতিগুলো তোমার NoSQL দক্ষতার পূর্ণাঙ্গ বিশ্বাসযোগ্যতা প্রতিষ্ঠা করবে।"
    }
  ]
};
