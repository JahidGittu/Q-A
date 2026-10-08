// Topic 3: Inventory Tracking & Concurrency Control (25 Questions: 5 lvl1, 5 lvl2, 5 lvl3, 5 situation, 5 realworld)
module.exports = {
  id: "dokani-inventory-concurrency",
  name: "Inventory Tracking & Concurrency Control",
  desc: "Real-time Stock Management, FIFO Expiry Tracking, Multi-branch Transfers, Low-Stock Reorder Points, Concurrency Locking, Damage Write-offs",
  items: [
    // --- LEVEL 1 (5 Questions) ---
    {
      lvl: "lvl1",
      q: "Dokani-তে রিয়েল-টাইম ইনভেন্টরি ট্র্যাকিং কীভাবে কাজ করে এবং কেন প্রতিটি সেলস ও পারচেজে স্টক সিঙ্ক থাকা আবশ্যক?",
      m: "ইনভেন্টরি হলো যেকোনো ব্যবসা প্রতিষ্ঠানের প্রধান আর্থিক সম্পদ। Dokani-তে ইনভেন্টরি সম্পূর্ণ অটোমেটেড ও রিয়েলটাইমে সিঙ্ক থাকে: (১) যখন কোনো মার্চেন্ট সাপ্লায়ারের কাছ থেকে পণ্য কিনে গুদামে তোলে (`Purchase Order / GRN`), তখন ডেটাবেজে সংশ্লিষ্ট ব্রাঞ্চের স্টক সংখ্যা স্বয়ংক্রিয়ভাবে বৃদ্ধি পায় (`stock + 50`)। (২) যখনই কোনো ক্যাশিয়ার পিওএস টার্মিনালে পণ্য বিক্রি করে, ট্রানজ্যাকশনের মধ্যে সেই স্টক সাথে সাথে বিয়োগ হয় (`stock - 1`)। (৩) যদি পণ্য ফেরত আসে বা ড্যামেজ হয়, তাও নিখুঁতভাবে অ্যাডজাস্ট হয়। ফলে ওনার মোবাইলে ড্যাশবোর্ড দেখলেই মুহূর্তের মধ্যে জানতে পারেন কোন দোকানে ঠিক কোন প্রোডাক্টটি কত পিস অবশিষ্ট আছে।",
      b: "দোকানিতে পারচেজ করার সাথে সাথে স্টক বাড়ে এবং বিক্রির সাথে সাথে তাৎক্ষণিকভাবে স্টক কমে যায়। ফলে দোকান মালিক যেকোনো সময় মোবাইলে প্রতিটি আউটলেটের সঠিক স্টক রিয়েলটাইমে দেখতে পান।",
      e: "Dokani enforces real-time bidirectional inventory synchronization: Goods Receipt Notes (GRN) increment stock counts, checkout sales decrement stock atomically, and returns/damages trigger adjustments. Store owners monitor physical warehouse stock levels across all branches on mobile dashboards in real time.",
      tip: "বলো: 'Dokani synchronizes physical inventory atomically across sales, purchases, transfers, and returns.'"
    },
    {
      lvl: "lvl1",
      q: "Dokani-তে 'Low Stock Alert (স্বল্প স্টক সতর্কতা)' এবং 'Reorder Point' কীভাবে কাজ করে?",
      m: "যাতে দোকানে কোনো হট-সেলিং প্রোডাক্ট হঠাৎ শেষ হয়ে বিক্রি বন্ধ না হয়ে যায়, সেজন্য প্রতিটি প্রোডাক্টের একটি `min_stock_alert_level` (যেমন ১০ পিস) কনফিগার করা থাকে। যখন কোনো বিক্রির পর প্রোডাক্টের অবশিষ্ট স্টক এই লেভেলের নিচে নেমে যায়, সিস্টেম স্বয়ংক্রিয়ভাবে দুটি কাজ করে: (১) ওনার ও ম্যানেজারের ড্যাশবোর্ডে লাল ওয়ার্নিং ব্যাজ দেখায় এবং নোটিফিকেশন পাঠায় যে 'এই প্রোডাক্টের স্টক সংকটজনক অবস্থায় আছে'। (২) সাপ্লায়ারদের জন্য একটি খসড়া পারচেজ রিকুইজিশন (Reorder List) তৈরি করে রাখে যাতে ওনার এক ক্লিকেই সাপ্লায়ারকে নতুন অর্ডারের এসএমএস বা ইমেইল পাঠাতে পারেন।",
      b: "প্রোডাক্টের স্টক নির্দিষ্ট সীমার (min_stock_level) নিচে নামলে সিস্টেম ওনারের ড্যাশবোর্ডে লাল ওয়ার্নিং দেয় এবং সাপ্লায়ারকে পুনরায় অর্ডার দেওয়ার জন্য স্বয়ংক্রিয় পারচেজ লিস্ট তৈরি করে দেয়।",
      e: "To prevent stockouts, Dokani tracks a min_stock_alert threshold per product. When sales drop available inventory below this threshold, Dokani raises an amber dashboard badge and generates a pre-populated Supplier Purchase Reorder sheet for instant replenishment.",
      code: "if (currentStock <= product.minStockAlert) {\n  await triggerLowStockNotification(tenantId, product.id);\n}"
    },
    {
      lvl: "lvl1",
      q: "ফার্মেসি ও গ্রোসারি দোকানে 'Batch & Expiry Date Tracking (মেয়াদোত্তীর্ণ ডেট ট্র্যাকিং)' কেন গুরুত্বপূর্ণ এবং FIFO মেথড কীভাবে কাজ করে?",
      m: "ফার্মেসির ওষুধ বা গ্রোসারির দুধে সুনির্দিষ্ট ব্যাচ নম্বর ও মেয়াদোত্তীর্ণ তারিখ (Expiry Date) থাকে। মেয়াদোত্তীর্ণ পণ্য বিক্রি করা বেআইনি ও বিপজ্জনক! Dokani `FIFO (First In, First Out)` নীতি মেনে চলে: (১) প্রতিটি পারচেজে প্রোডাক্টের জন্য আলাদা ব্যাচ তৈরি হয় (`batch_no: 'B101', expire_date: '2026-12-31'`)। (২) ক্যাশিয়ার যখন বিল করে, সিস্টেম স্বয়ংক্রিয়ভাবে সেই ব্যাচের পণ্যটি আগে কার্টে দেয় যার মেয়াদ সবার আগে শেষ হবে (FEFO / FIFO)। (৩) যেসব পণ্যের মেয়াদ আগামী ৩০ দিনের মধ্যে শেষ হতে চলেছে, সেগুলোর তালিকা ম্যানেজারের কাছে আলাদাভাবে আসে যাতে সে ডিসকাউন্টে ক্লিয়ার করতে পারে বা সাপ্লায়ারকে ফেরত দিতে পারে।",
      b: "ফার্মেসির ওষুধ বা গ্রোসারিতে মেয়াদোত্তীর্ণ হওয়া রোধে FIFO (First In First Out) নীতিতে যে ব্যাচের মেয়াদ আগে শেষ হবে তা আগে বিক্রি করা হয়। মেয়াদ শেষ হওয়ার ৩০ দিন আগে সিস্টেম স্বয়ংক্রিয় অ্যালার্ট দেয়।",
      e: "Pharmaceutical and grocery inventories enforce FIFO (First In First Out) and FEFO (First Expired First Out) batch tracking. Each purchase allocates items to discrete batches with expiry dates. The POS engine prioritizes expirable batches first during billing, flagging batches nearing 30-day expiration thresholds.",
      tip: "ইন্টারভিউতে 'FIFO / FEFO batch tracking for perishables and pharma' স্পষ্টভাবে তুলে ধরবে।"
    },
    {
      lvl: "lvl1",
      q: "Dokani-তে 'Branch-to-Branch Stock Transfer (এক দোকান থেকে অন্য দোকানে পণ্য পাঠানো)' ওয়ার্কফ্লো কীভাবে পরিচালিত হয়?",
      m: "যখন মেইন ওয়্যারহাউস থেকে গুলশান ব্রাঞ্চে ৫০টি শার্ট পাঠানো হয়, তখন সরাসরি এক সেকেন্ডে স্টক গুলশানে চলে যায় না (কারণ পথে পণ্য হারিয়ে যেতে পারে বা ট্রাফিকে থাকতে পারে)। Dokani-র ৩-স্টেপ ট্রান্সফার ওয়ার্কফ্লো: (১) `Initiate Transfer`: প্রেরক ব্রাঞ্চ ট্রান্সফার শুরু করে; ওয়্যারহাউসের স্টক ৫০টি কমে যায় এবং স্ট্যাটাস হয় `IN_TRANSIT`। (২) `In-Transit Tracking`: ৫০টি শার্ট সাময়িক একটি ভার্চুয়াল ট্রানজিট পুলে থাকে। (৩) `Receive Transfer`: গুলশান ব্রাঞ্চের ম্যানেজার পণ্য ফিজিক্যালি গুনে দেখে 'Accept Transfer' চাপলে তবেই গুলশান ব্রাঞ্চের স্টকে ৫০টি যোগ হয়। যদি পথে ২টি শার্ট নষ্ট হয়, তবে ম্যানেজার ৪৮টি রিসিভ করে ২টি ড্যামেজ হিসেবে মার্ক করতে পারে।",
      b: "ব্রাঞ্চ ট্রান্সফারে সরাসরি স্টক না বাড়িয়ে ৩টি ধাপে কাজ হয়: ট্রান্সফার শুরু, ট্রানজিট পুল এবং প্রাপক ব্রাঞ্চ পণ্য গুনে রিসিভ করার পর স্টকে যোগ হওয়া। ফলে পথে পণ্য চুরির কোনো সুযোগ থাকে না।",
      e: "Dokani manages multi-branch stock movements via a three-phase transfer lifecycle: Dispatched stock decrements the origin warehouse and enters an IN_TRANSIT escrow state. The destination branch physically audits units before approving the transfer, incrementing local stock upon receipt while capturing in-transit discrepancies as Damages.",
      code: "// Transfer state transition:\nPENDING -> IN_TRANSIT -> RECEIVED (or REJECTED)"
    },
    {
      lvl: "lvl1",
      q: "Dokani-তে 'Damage & Waste Management (নষ্ট বা ক্ষতিগ্রস্থ পণ্যের হিসাব)' কীভাবে মূলধনের ক্ষতি হিসেবে রেকর্ড হয়?",
      m: "দোকানে পণ্য ভাঙতে পারে, ইঁদুরে কাটতে পারে বা তারিখ চলে যেতে পারে। Dokani-তে ড্যামেজ এন্ট্রি দিলে: (১) ইনভেন্টরি থেকে নষ্ট হওয়া পণ্যের স্টক তাৎক্ষণিকভাবে বিয়োগ হয় যাতে তা আর বিক্রির জন্য না দেখায়। (২) ফিনান্সিয়াল লেজারে ওই পণ্যের কেনা দাম (Cost Price) অনুযায়ী `Inventory Loss / Damage Expense (ক্ষতি)` হিসেবে অ্যাকাউন্ট ডেবিট হয় এবং মূল ইনভেন্টরি অ্যাসেট ক্রেডিট হয়। (৩) মাস শেষে ওনার দেখতে পারেন কোন কর্মীর অসাবধানতায় বা কোন পণ্যে কত টাকার ড্যামেজ হয়েছে এবং সাপ্লায়ার থেকে কোনো ক্ষতিপূরণ ক্লেইম করা যাবে কি না।",
      b: "ড্যামেজ পণ্য ইনভেন্টরি থেকে বাদ দেওয়ার সাথে সাথে ফিনান্সিয়াল লেজারে কস্ট প্রাইস অনুযায়ী ড্যামেজ খরচ ডেবিট হয়। ফলে লাভ-ক্ষতির চূড়ান্ত হিসাবে নষ্ট হওয়া মালের ক্ষতি সঠিকভাবে প্রদর্শিত হয়।",
      e: "Reporting damaged goods decrements physical stock while booking an Expense entry into the General Ledger (Debiting Inventory Shrinkage/Loss, Crediting Inventory Assets) evaluated at Cost Price. This prevents phantom inventory while reflecting genuine operating profit margins.",
      tip: "বলো: 'Damage write-offs evaluate at Cost Price, debiting Inventory Loss expense in the General Ledger.'"
    },

    // --- LEVEL 2 (5 Questions) ---
    {
      lvl: "lvl2",
      q: "Dokani-তে 'Physical Stock Audit / Stock Reconciliation' কীভাবে পরিচালিত হয় এবং সিস্টেম বনাম বাস্তব স্টকের অমিল কীভাবে সমাধান করা হয়?",
      m: "মাসে বা বছরে একবার দোকানদাররা বন্ধ রেখে ফিজিক্যাল স্টক গুনে (Physical Stock Count)। Dokani-র রিকনসিলিয়েশন মডিউলে: (১) স্টাফরা বারকোড স্ক্যানার দিয়ে তাকের প্রতিটি পণ্য গুনে সিস্টেমে বাস্তব সংখ্যা ইনপুট দেয়। (২) Dokani রিয়েল-টাইমে একটি তুলনামূলক অডিট শিট তৈরি করে: `System Stock = 50`, `Physical Count = 46` -> `Discrepancy = -4 (ঘাটতি)`। (৩) ওনার বা ম্যানেজারের অনুমোদন ছাড়া এই স্টক পরিবর্তন করা যায় না। (৪) ওনার পাসওয়ার্ড দিলে সিস্টেম স্বয়ংক্রিয়ভাবে স্টক ৪৬-এ অ্যাডজাস্ট করে এবং ঘাটতি হওয়া ৪টি পণ্যের মূল্যের জন্য একটি `Stock Variance Adjustment` লেজার এন্ট্রি রেকর্ড করে রাখে।",
      b: "ফিজিক্যাল অডিটে আসল মালের সংখ্যার সাথে সিস্টেমের সংখ্যার তুলনা করে ঘাটতি বা উদ্বৃত্তের রিপোর্ট বের করা হয়। ওনারের পিন অ্যাপ্রুভাল সাপেক্ষে সিস্টেম স্টক আপডেট করে এবং ভ্যারিয়েন্স লেজার তৈরি করে হিসাব মেলায়।",
      e: "Dokani's Stock Reconciliation module audits physical shelf counts against ledger records. The engine computes variance deltas (e.g. -4 units). Manager approval commits an atomic Stock Variance Adjustment transaction, resetting active stock counts and booking shrinkage into profit/loss journals.",
      code: "const variance = physicalCount - systemStock;\nawait tx.stockAdjustment.create({\n  data: { productId, branchId, variance, reason: 'ANNUAL_AUDIT' }\n});"
    },
    {
      lvl: "lvl2",
      q: "Dokani-তে 'Product Bundling / Combo Packs (কম্বো অফার)' ইনভেন্টরি থেকে কীভাবে স্টক ডিডাক্ট করে?",
      m: "দোকানে ঈদ বা উৎসবে কম্বো অফার থাকে (যেমন '১টি শার্ট + ১টি প্যান্ট + ১টি বেল্ট = ৩,৫০০ টাকা')। স্কিমা আর্কিটেকচার: কম্বো প্যাক একটি ভার্চুয়াল প্রোডাক্ট হিসেবে তৈরি হয় যার নিজস্ব কোনো ফিজিক্যাল স্টক সংখ্যা থাকে না! এর বদলে এটি একটি `bundle_items` টেবিলের সাথে যুক্ত থাকে যা চাইল্ড প্রোডাক্টগুলোর আইডি ও অনুপাত নির্দিষ্ট করে। ক্যাশিয়ার যখন কম্বো প্যাকটি বারকোড স্ক্যান করে বিক্রি করে, Dokani ব্যাকএন্ড অ্যাটমিকালি ৩টি পৃথক আসল প্রোডাক্টের স্টক থেকে ১টি করে বিয়োগ করে দেয়। ফলে কম্বো বিক্রির পরও কোনো ইনভেন্টরি অসঙ্গতি ঘটে না।",
      b: "কম্বো প্যাকের নিজস্ব কোনো আলাদা স্টক থাকে না। কম্বো বিক্রি হলে সিস্টেম স্বয়ংক্রিয়ভাবে কম্বোর ভেতরের প্রতিটি মূল প্রোডাক্টের স্টক থেকে উপাদান অনুযায়ী আলাদা আলাদা স্টক কেটে নেয়।",
      e: "Dokani models Combo Bundles as virtual composite entities linked to parent components via a bundle_items relation. Finalizing a combo sale cascades atomic stock deductions across all constituent child items (e.g. 1 shirt, 1 pant, 1 belt), maintaining real-time physical inventory accuracy.",
      code: "for (const component of bundle.components) {\n  await decrementStock(component.childProductId, component.quantity * soldComboQty);\n}"
    },
    {
      lvl: "lvl2",
      q: "Dokani-তে প্রোডাক্টের কস্ট প্রাইস ক্যালকুলেশনে 'Weighted Average Cost (WAC)' বনাম 'FIFO Costing' কীভাবে কাজ করে?",
      m: "দোকানদার যখন একই চাল গত সপ্তাহে কিনেছিল ৫০ টাকা কেজিতে এবং এই সপ্তাহে কিনেছে ৬০ টাকা কেজিতে, তখন তার আসল লাভ কীভাবে হিসেব হবে? Dokani `Weighted Average Cost (WAC)` মেথড সমর্থন করে: নতুন পারচেজের সাথে সাথে গড় কস্ট প্রাইস স্বয়ংক্রিয়ভাবে রি-ক্যালকুলেট হয়: `New Avg Cost = (Old Stock * Old Cost + New Stock * New Cost) / Total Stock`। ক্যাশিয়ার যখন বিক্রি করে, সিস্টেম এই ওয়েটেড কস্ট প্রাইস বিয়োগ করে নিট গ্রস প্রফিট হিসেব করে। এর ফলে চালের দাম ওঠানামা করলেও ব্যবসায়িক লাভ-ক্ষতির হিসাব সবসময় শতভাগ বাস্তবসম্মত ও নির্ভুল থাকে।",
      b: "বিভিন্ন সময়ে ভিন্ন দামে পণ্য কেনা হলে ওয়েটেড এভারেজ কস্ট (WAC) ফর্মুলা দিয়ে গড় কেনা দাম নির্ধারণ করা হয়। বিক্রির সময় এই গড় কেনা দাম বিয়োগ করে সঠিক নিট মুনাফা ক্যালকুলেট করা হয়।",
      e: "When purchase costs fluctuate over time, Dokani applies Weighted Average Costing (WAC): New WAC = ((Current Units * Existing Cost) + (New Units * New Cost)) / Total Combined Units. Checkout profit calculations derive margins from this updated WAC, ensuring realistic GAAP-compliant accounting.",
      code: "const newAvgCost = ((currentQty * currentCost) + (incomingQty * incomingCost)) / (currentQty + incomingQty);"
    },
    {
      lvl: "lvl2",
      q: "Dokani-তে 'Serial Number / IMEI Tracking (মোবাইল ও ইলেকট্রনিক্স)' ইনভেন্টরি কীভাবে পরিচালিত হয়?",
      m: "মোবাইল ফোন বা ল্যাপটপ সাধারণ সাবানের মতো বিক্রি করা যায় না—প্রতিটি নির্দিষ্ট ফোনের একটি অনন্য ১৫ ডিজিটের IMEI বা সিরিয়াল নম্বর থাকে যা ওয়ারেন্টির জন্য আবশ্যক। Dokani-তে প্রোডাক্টের `has_serial_tracking: true` ফ্ল্যাগ থাকে। পারচেজের সময় প্রতিটি আইটেমের ইউনিক IMEI স্ক্যান করে ডেটাবেজে `product_serials` টেবিলে `AVAILABLE` স্ট্যাটাসে রাখা হয়। বিক্রির সময় ক্যাশিয়ার যখন ওই নির্দিষ্ট ফোনের IMEI স্ক্যান করে, সিস্টেম ওই সিরিয়াল নম্বরটিকে `SOLD` মার্ক করে এবং ইনভয়েসে প্রিন্ট করে দেয়। কোনো কাস্টমার ওয়ারেন্টি নিয়ে আসলে সিরিয়াল নম্বর সার্চ করলেই ইনভয়েস ও ওয়ারেন্টির মেয়াদ মুহূর্তেই স্ক্রিনে চলে আসে।",
      b: "মোবাইল ও ইলেকট্রনিক্সের ক্ষেত্রে প্রতিটি অনন্য IMEI বা সিরিয়াল নম্বর ট্র্যাক করা হয়। বিক্রির সময় সিরিয়াল নম্বর ইনভয়েসে প্রিন্ট হয় যা পরবর্তীতে ওয়ারেন্টি যাচাই ও আফটার-সেলস সার্ভিসে ব্যবহৃত হয়।",
      e: "Electronics retail enforces item-level serialization via product_serials tables. Receiving inventory requires scanning individual IMEI/Serial barcodes stored as AVAILABLE. POS billing binds the scanned serial directly to the customer invoice line, transitioning status to SOLD for seamless warranty lookup.",
      tip: "বলো: 'Serial and IMEI tracking binds individual hardware units to customer invoices for automated warranty validation.'"
    },
    {
      lvl: "lvl2",
      q: "Dokani-তে সাপ্লায়ার পারচেজ অর্ডার (Purchase Order / Supplier GRN) এবং পেমেন্ট ডিউ কীভাবে ইনভেন্টরির সাথে সংযুক্ত?",
      m: "সাপ্লায়ার থেকে মালামাল কেনার সম্পূর্ণ সাইকেল: (১) ম্যানেজার একটি `Purchase Order (PO)` তৈরি করে সাপ্লায়ারকে পাঠায়। (২) পণ্য দোকানে পৌঁছালে গুদামে মালামাল গুনে `Goods Received Note (GRN)` কনফার্ম করা হয়; সাথে সাথে ইনভেন্টরি স্টকে নতুন মালামাল যোগ হয়। (৩) সাপ্লায়ারের বিল পরিশোধ: যদি ক্যাশ দেওয়া হয় তবে ক্যাশ ড্রয়ার কমে; আর যদি বাকি থাকে তবে সাপ্লায়ারের `Accounts Payable (দেনা)` লেজারে ক্রেডিট ব্যালেন্স তৈরি হয়। (৪) পরবর্তীতে সাপ্লায়ারকে ব্যাংক বা চেকে পেমেন্ট দিলে সাপ্লায়ারের লেজার স্বয়ংক্রিয়ভাবে আপডেট হয়ে দেনা কমে যায়। সম্পূর্ণ ক্রয় প্রক্রিয়া ইনভেন্টরি ও লেজারের সাথে ওতপ্রোতভাবে যুক্ত থাকে।",
      b: "সাপ্লায়ার থেকে মাল গ্রহণ করলে স্টকে যোগ হয় এবং সাপ্লায়ারের দেনা লেজার স্বয়ংক্রিয়ভাবে আপডেট হয়। পরবর্তীতে টাকা পরিশোধ করলে দেনা ব্যালেন্স কমে গিয়ে সঠিক হিসাব সংরক্ষিত থাকে।",
      e: "Supplier procurement moves from Purchase Order to Goods Received Note (GRN). Confirming a GRN increments physical branch stock atomically and generates an Accounts Payable ledger liability for unpaid balances, reconciling automatically upon cash or bank supplier settlements.",
      code: "await prisma.$transaction(async (tx) => {\n  await tx.branchStock.update({ ... });\n  await tx.supplierLedger.create({ data: { type: 'PURCHASE_PAYABLE', amount: totalBill } });\n});"
    },

    // --- LEVEL 3 (5 Questions) ---
    {
      lvl: "lvl3",
      q: "Dokani-তে রো-লেভেল লকিং বনাম অপটিমিস্টিক কনকারেন্সি: কোন পরিস্থিতিতে কোনটি ব্যবহার করা হয়েছে?",
      m: "দোকানি আর্কিটেকচারে পারফরম্যান্স ও কনসিস্টেন্সির নিখুঁত ব্যালেন্স রয়েছে: (১) `Pessimistic Locking (SELECT ... FOR UPDATE)`: ব্যবহার করা হয়েছে লাইভ পিওএস বিলিং ও স্টক ডিডাকশনের সময়—যেখানে কনকারেন্সি খুব বেশি এবং স্টক কোনোভাবেই নেগেটিভ হতে দেওয়া যাবে না। (২) `Optimistic Concurrency Control (Version Key)`: ব্যবহার করা হয়েছে প্রোডাক্ট ক্যাটালগ এডিট ও প্রাইজ পরিবর্তনের ক্ষেত্রে (`WHERE version = 5`)—যেখানে একাধিক ম্যানেজার একই সাথে প্রোডাক্টের নাম বা বিবরণ এডিট করতে পারে কিন্তু কনফ্লিক্টের সম্ভাবনা খুব কম। ফলে সাধারণ এডিটিংয়ে কোনো ডাটাবেজ লক ওভারহেড থাকে না, কিন্তু স্টক কাটার সময় শতভাগ রো-লেভেল সিকিউরিটি বজায় থাকে।",
      b: "লাইভ সেলস ও স্টক কাটার ক্ষেত্রে পেসিমিস্টিক লক (FOR UPDATE) ব্যবহার করা হয়েছে যাতে স্টক মাইনাস না হয়। আর প্রোডাক্টের নাম বা দাম এডিটের ক্ষেত্রে অপটিমিস্টিক লক ব্যবহার করে পারফরম্যান্স সর্বোচ্চ রাখা হয়েছে।",
      e: "Dokani balances concurrency models: High-contention checkout stock deductions enforce Pessimistic row-level locking (SELECT FOR UPDATE) to eliminate race-condition overselling. Low-contention administrative catalog modifications leverage Optimistic Concurrency via version integers to avoid unnecessary database lock holds.",
      tip: "বলো: 'Pessimistic locking protects live checkout stock decrements; Optimistic locking governs admin catalog updates.'"
    },
    {
      lvl: "lvl3",
      q: "Dokani-তে আনবাউন্ডেড ইনভেন্টরি গ্রোথ: ৫ বছর পর কোটি কোটি সেলস ও স্টক মুভমেন্ট রেকর্ডের মাঝে ডেটাবেজ পার্টিশনিং কীভাবে সাজাবে?",
      m: "৫ বছর পর `inventory_movements` এবং `invoices` টেবিলে কোটি কোটি রো জমে ডেটাবেজ স্লো হতে পারে। সমাধান: আমরা PostgreSQL-এর `Declarative Range Partitioning` প্রয়োগ করি: `PARTITION BY RANGE (created_at)`। প্রতি বছরের জন্য আলাদা পার্টিশন টেবিল তৈরি থাকে (যেমন `invoices_2026`, `invoices_2027`)। ক্যাশিয়ার যখন আজকের সেলস চালায়, কুয়েরি ইঞ্জিন মুহূর্তেই অতীতের ৪ বছরের কোটি রো বাদ দিয়ে শুধুমাত্র বর্তমান ২০২৬ সালের পার্টিশন টেবিলে হিট করে। পুরনো পার্টিশনগুলোকে আলাদা কমদামি স্টোরেজে আর্কাইভ করা যায় এবং ভ্যাকুয়ামিং স্পিড সুপারফাস্ট থাকে।",
      b: "কোটি কোটি রো জমলে PostgreSQL Range Partitioning দিয়ে প্রতি বছরের সেলস ও স্টক আলাদা সাব-টেবিলে ভাগ করা হয়। ফলে কুয়েরি শুধু বর্তমান বছরের টেবিলে হিট করে এবং ডেটাবেজ চিরকাল সুপারফাস্ট থাকে।",
      e: "Scale massive multi-year inventory ledgers via PostgreSQL Declarative Range Partitioning by created_at. Active POS queries prune historical partitions, isolating disk scans to the current year's table, maintaining sub-3ms lookups while isolating aged partitions for archive storage.",
      code: "CREATE TABLE inventory_movements (\n  id UUID NOT NULL,\n  tenant_id UUID NOT NULL,\n  created_at TIMESTAMPTZ NOT NULL,\n  quantity INT\n) PARTITION BY RANGE (created_at);\nCREATE TABLE inv_mov_2026 PARTITION OF inventory_movements \n  FOR VALUES FROM ('2026-01-01') TO ('2027-01-01');"
    },
    {
      lvl: "lvl3",
      q: "Dokani-তে সাপ্লায়ার ব্যাক-অর্ডার ও স্টক রিজার্ভেশন (Stock Reservation Architecture): অনলাইন অর্ডার ও অফলাইন দোকানের স্টক কীভাবে সিঙ্ক রাখবে?",
      m: "যেসব দোকানের একই সাথে অফলাইন শোরুম এবং অনলাইন ই-কমার্স স্টোর আছে, সেখানে অনলাইন কাস্টমার কোনো পণ্য কার্টে নিলে যদি অফলাইনের ক্যাশিয়ার তা বিক্রি করে দেয় তবে মারাত্মক কনফ্লিক্ট হবে! Dokani-র স্টক রিজার্ভেশন আর্কিটেকচার: (১) প্রতিটি প্রোডাক্টের ৩টি স্টক ফিল্ড থাকে: `Total Physical Stock`, `Reserved Stock` (অনলাইন কার্ট ও পেন্ডিং অর্ডার), এবং `Available for Sale = Total - Reserved`। (২) অনলাইন কাস্টমার অর্ডার প্লেস করলে ১০ মিনিটের জন্য স্টক রিজার্ভ হয়। (৩) অফলাইন ক্যাশিয়ার শুধু `Available for Sale` স্টক বিক্রি করতে পারে। (৪) পেমেন্ট সম্পন্ন হলে রিজার্ভ স্টক পার্মানেন্ট ডিডাক্ট হয়; পেমেন্ট ফেইল করলে ১০ মিনিট পর রেডিস এক্সপায়ারি দিয়ে রিজার্ভ স্টক স্বয়ংক্রিয়ভাবে মূল পুলে ফেরত চলে আসে।",
      b: "অনলাইন ও অফলাইনের যৌথ স্টকে 'Reserved Stock' মেকানিজম ব্যবহার করা হয়েছে। অনলাইনে অর্ডার হলে স্টক সাময়িক রিজার্ভ থাকে, ফলে অফলাইন ক্যাশিয়ার সেই পণ্য বিক্রি করতে পারে না এবং কোনো অর্ডার ক্যানসেল হয় না।",
      e: "Omnichannel inventory integrates a three-tier stock model: Physical Stock, Reserved Stock, and Available Stock (Available = Physical - Reserved). Online orders reserve stock in Redis with a 10-minute TTL. Brick-and-mortar cashiers are constrained strictly to Available Stock, preventing cross-channel stock collisions.",
      tip: "বলো: 'Omnichannel inventory prevents conflicts via Available = Physical - Reserved stock calculations with Redis TTL reservations.'"
    },
    {
      lvl: "lvl3",
      q: "Dokani-তে Dead Stock ও Slow-Moving Inventory অ্যালগরিদম কীভাবে মার্চেন্টের ক্যাশ ফ্লো বাঁচাতে সাহায্য করে?",
      m: "দোকানের সবচেয়ে বড় নীরব ঘাতক হলো অবিক্রীত স্টক যা তাকের ওপর মাসের পর মাস পড়ে থেকে লাখ লাখ টাকার ক্যাশ ফ্লো আটকে রাখে। Dokani-র অটোমেটেড ইনভেন্টরি অ্যানালিটিক্স পাইপলাইন: (১) সিস্টেম গত ৯০ দিনের সেলস হিস্ট্রি বিশ্লেষণ করে প্রতিটি পণ্যের 'Daily Burn Rate' বের করে। (২) যেসব পণ্যের স্টক ৩০টির বেশি কিন্তু গত ৪৫ দিনে ১টিও বিক্রি হয়নি, সেগুলোকে `DEAD_STOCK` ক্যাটাগরিতে ফেলে ওনারের ড্যাশবোর্ডে পুশ করে। (৩) সিস্টেম মার্চেন্টকে রিকমেন্ড করে: 'এই প্রোডাক্টগুলোতে ২০% ছাড় দিয়ে দ্রুত বিক্রি করে ক্যাশ টাকা বের করে আনুন অথবা সাপ্লায়ারকে রিটার্ন দিন।' এটি দোকানের ক্যাশ ফ্লো ও মুনাফা উল্লেখযোগ্য হারে বাড়িয়ে দেয়।",
      b: "গত ৪৫ দিনে যেসব পণ্য একটিও বিক্রি হয়নি কিন্তু স্টকে পড়ে আছে সেগুলোকে ডেড স্টক হিসেবে শনাক্ত করে ছাড় দিয়ে বা ফেরত দিয়ে মূলধন বের করার জন্য ওনারকে অটোমেটেড পরামর্শ দেওয়া হয়।",
      e: "Dokani's inventory analytics identifies capital trapped in stagnant goods. Computing 90-day velocity, items retaining stock with zero sales in 45 days are flagged as Dead Stock on owner portals, recommending automated clearance discounts to unlock working capital.",
      code: "SELECT product_id, stock_quantity, \n       MAX(created_at) as last_sale_date\nFROM sales_items \nGROUP BY product_id \nHAVING MAX(created_at) < NOW() - INTERVAL '45 days';"
    },
    {
      lvl: "lvl3",
      q: "Dokani-তে স্টক অ্যাডজাস্টমেন্ট ও ইনভেন্টরি ট্র্যাকিংয়ে ফ্রড ডিটেকশন রুলস কীভাবে তৈরি করা হয়েছে?",
      m: "অনেক অসাধু স্টাফ ইচ্ছাকৃতভাবে ভালো প্রোডাক্টকে 'ড্যামেজ' বা 'ঘাটতি' দেখিয়ে গোপনে চুরি করে বাইরে বিক্রি করে দেয়। Dokani-র ফ্রড ডিটেকশন সিস্টেম: (১) কোনো স্টাফ যদি স্বাভাবিক গড়ের চেয়ে বেশি ড্যামেজ এন্ট্রি দেয় (যেমন সাধারণ ড্যামেজ ০.৫% কিন্তু সে ৫% ড্যামেজ দেখাল), সিস্টেম সাথে সাথে একটি `High Damage Anomaly Alert` জেনারেট করে সরাসরি ওনারের ফোনে পাঠায়। (২) যে স্টাফ ড্যামেজ এন্ট্রি দিচ্ছে তাকে ড্যামেজ পণ্যের ছবি মোবাইল ক্যামেরা দিয়ে সরাসরি আপলোড করতে বাধ্য করা যায়। (৩) ম্যানেজার ও ওনারের ডুয়াল সাইন-অফ ছাড়া কোনো বড় ইনভেন্টরি রাইট-অফ লেজারে চূড়ান্ত হতে পারে না।",
      b: "স্টাফদের পণ্য চুরি রোধে অস্বাভাবিক ড্যামেজ এন্ট্রিতে ওনারের ফোনে এলার্ট পাঠানো হয়, ড্যামেজ মালের ছবি আপলোড বাধ্য করা হয় এবং ওনারের অনুমোদন ছাড়া কোনো বড় অ্যাডজাস্টমেন্ট অনুমোদন পায় না।",
      e: "Dokani enforces fraud mitigation on stock write-offs: Statistical anomaly algorithms flag inventory write-offs exceeding standard thresholds (>1.5% of shift volume). Write-offs mandate attaching photographic evidence captured via device cameras, requiring dual-factor manager PIN authorization.",
      tip: "বলো: 'Automated shrinkage anomaly alerts and mandatory photographic evidence mitigate internal inventory theft.'"
    },

    // --- SITUATION BASED (5 Questions) ---
    {
      lvl: "situation",
      q: "পরিস্থিতি: একটি কাপড়ের দোকানে একটি জনপ্রিয় শার্টের স্টক সফটওয়্যারে দেখাচ্ছে ০ পিস, কিন্তু দোকানের সেলফে ফিজিক্যালি ১টি শার্ট ঝুলছে! ক্যাশিয়ার বিক্রি করতে গেলে সিস্টেম 'Out of Stock' এরর দিয়ে বিল আটকে দিচ্ছে। ক্যাশিয়ার কীভাবে তাৎক্ষণিকভাবে কাস্টমারকে বিল করে বিদায় করবে এবং স্টক মেলাবে?",
      m: "সমাধান: (১) কাস্টমারকে ফিরিয়ে দেওয়া যাবে না! Dokani-তে ওনার কনফিগে একটি অপশন থাকে: `Allow Negative Billing (নেগেটিভ স্টক বিক্রি অনুমতি)`। যদি এটি অন থাকে, ক্যাশিয়ার একটি সতর্কবার্তা দেখে বিল সম্পন্ন করতে পারে এবং স্টক সাময়িক `-1` হবে। (২) যদি নেগেটিভ বিলিং কঠোরভাবে বন্ধ থাকে, ক্যাশিয়ার 'Emergency Stock Override' দিয়ে ম্যানেজারের ৪ ডিজিটের পিন নিয়ে ১ পিস স্টক তৎক্ষণাৎ অ্যাডজাস্ট করে ইনভয়েস কনফার্ম করবে। (৩) পরবর্তীতে দিনের শেষে ইনভেস্টিগেট করে দেখা যাবে হয়তো সাপ্লায়ারের পারচেজ চালান এন্ট্রি করতে কোনো স্টাফ ভুলে গিয়েছিল—চালানটি এন্ট্রি করা মাত্রই স্টক স্বয়ংক্রিয়ভাবে স্বাভাবিক ব্যালেন্সে সিঙ্ক হয়ে যাবে।",
      b: "কাস্টমার ফিরিয়ে না দিয়ে ম্যানেজারের পিন দিয়ে তাৎক্ষণিক ১টি স্টক অ্যাডজাস্ট করে বিক্রি সম্পন্ন করা হবে। পরবর্তীতে সাপ্লায়ারের পারচেজ চালান এন্ট্রি দিয়ে মূল ইনভেন্টরি ঠিক করা হবে।",
      e: "When physical inventory exists despite zero system balance, execute an authorized Manager PIN Stock Adjustment or invoke tenant-configurable Negative Billing to finalize the checkout without turning the customer away. Later, reconcile the missing supplier GRN purchase record to restore ledger balance.",
      tip: "বলো: 'Never lose a sale: authorize an instant Manager PIN Stock Override, then backfill the missing purchase GRN.'"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: দুজন ক্যাশিয়ার একই সেকেন্ডে শেষ ১টি ল্যাপটপ বিক্রি করার জন্য 'Enter' চাপল। সিস্টেম কী আচরণ করবে এবং দ্বিতীয় ক্যাশিয়ার কী মেসেজ দেখবে?",
      m: "সিস্টেমের আচরণ: (১) দুটি রিকোয়েস্ট ব্যাকএন্ডে পৌঁছানোর পর ডেটাবেজ লেভেলে `SELECT stock FROM branch_stocks WHERE id = $1 FOR UPDATE` পেসিমিস্টিক লক কার্যকর হবে। (২) প্রথম যে ক্যাশিয়ারের রিকোয়েস্টটি ১ মিলিসেকেন্ড আগে পৌঁছাবে, ডেটাবেজ তাকে রো লক দেবে। সিস্টেম স্টক ১ থেকে ০ করে তার ইনভয়েস সফলভাবে সেভ করবে এবং রিসিট প্রিন্ট হবে। (৩) প্রথম ক্যাশিয়ার কমিট করার পর দ্বিতীয় ক্যাশিয়ার লক পাবে। সে দেখবে বর্তমান স্টক `০` (রিকোয়েস্টেড ১ পিসের চেয়ে কম)। সিস্টেম তাৎক্ষণিকভাবে ট্রানজ্যাকশন বাতিল করবে এবং দ্বিতীয় ক্যাশিয়ারের স্ক্রিনে লাল ওয়ার্নিং দেখাবে: `Stock Exhausted: This item was just sold out by Terminal 1!`। কোনো ডাবল সেল ঘটবে না।",
      b: "পেসিমিস্টিক লকের কারণে প্রথম ক্যাশিয়ারের বিক্রি সফল হবে এবং স্টক ০ হবে। দ্বিতীয় ক্যাশিয়ারের স্ক্রিনে সাথে সাথে মেসেজ আসবে: 'স্টক শেষ! এইমাত্র অন্য টার্মিনাল থেকে পণ্যটি বিক্রি হয়ে গেছে।'",
      e: "PostgreSQL's SELECT FOR UPDATE serializes access: Terminal 1 acquires the lock, decrements stock from 1 to 0, and commits successfully. Terminal 2 then evaluates stock as 0, aborting with a clean error: 'Item sold out concurrently on Terminal 1', preventing physical overselling.",
      code: "// Returned to Terminal 2:\n{ status: 409, error: 'INSUFFICIENT_STOCK', message: 'Item was just sold out by Terminal 1' }"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: একটি ডিপার্টমেন্টাল স্টোরে সাপ্লায়ার ৫০ কার্টন কোমল পানীয় সরবরাহ করেছে। কিন্তু চালানে ভুলবশত দাম লেখা হয়েছে বেশি এবং স্টাফ তা ভেরিফাই না করেই ইনভেন্টরিতে রিসিভ করে ফেলেছে। এখন কীভাবে ইনভেন্টরি স্টক ও সাপ্লায়ার দেনা সংশোধন করবে?",
      m: "সংশোধন প্রক্রিয়া: (১) সরাসরি ডেটাবেজে গিয়ে ডিলিট করা নিষিদ্ধ কারণ এতে অডিট ট্রেইল ভেঙে যাবে। (২) Dokani-তে `Purchase Return / Debit Note` তৈরি করতে হবে। (৩) ভুল মূল্যের ৫০ কার্টনের বিপরীতে একটি ডেবিট নোট ইস্যু করে সাপ্লায়ারের দেনা লেজার থেকে অতিরিক্ত টাকা কমিয়ে সঠিক ব্যালেন্সে আনা হবে। (৪) প্রোডাক্টের কস্ট প্রাইস সংশোধিত মূল্যে স্বয়ংক্রিয়ভাবে রি-ক্যালকুলেট হয়ে যাবে। ফলে ইনভেন্টরি ও সাপ্লায়ারের হিসাব ১০০% স্বচ্ছভাবে ঠিক হয়ে যাবে।",
      b: "ভুল চালানের জন্য ডেবিট নোট (Debit Note) তৈরি করে সাপ্লায়ারের দেনা কমিয়ে সঠিক মূল্যে নিয়ে আসা হবে এবং কস্ট প্রাইস পুনরায় হিসাব করা হবে। কোনো ম্যানুয়াল ডিলিট ছাড়া হিসাববিজ্ঞান রক্ষা করা হবে।",
      e: "Issue a Purchase Return / Debit Note against the erroneous Purchase Order. The debit note adjusts Accounts Payable to the genuine figure, recalibrates the product's Weighted Average Cost, and preserves full GAAP compliance without deleting historical records.",
      tip: "বলো: 'Correct vendor pricing errors via formal Debit Notes rather than modifying historic purchase records.'"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: একটি চালের আড়তে বৃষ্টির পানিতে ভিজে ১০ বস্তা চাল নষ্ট হয়ে গেছে। ওনার সফটওয়্যারে কীভাবে এন্ট্রি দেবে যাতে স্টকও কমে এবং লাভ-ক্ষতির চূড়ান্ত হিসাবেও ক্ষতি হিসেবে প্রদর্শিত হয়?",
      m: "এন্ট্রি ধাপসমূহ: (১) Dokani-র 'Inventory > Stock Adjustment & Damage' ট্যাবে যাবে। (২) প্রোডাক্ট সিলেক্ট করবে 'মিনিকেট চাল', কোয়ান্টিটি দিবে '১০ বস্তা', এবং কারণ হিসেবে ড্রপডাউন থেকে সিলেক্ট করবে `WATER_DAMAGE (প্রাকৃতিক ক্ষতি)`। (৩) ওনারের কনফার্মেশনের সাথে সাথে ইনভেন্টরি থেকে ১০ বস্তা চাল বাদ যাবে। (৪) চালের কেনা দাম অনুযায়ী (যেমন প্রতি বস্তা ২,৫০০ টাকা হলে মোট ২৫,০০০ টাকা) স্বয়ংক্রিয়ভাবে ফিনান্সিয়াল লেজারে `Inventory Loss Expense` ডেবিট হবে এবং ইনভেন্টরি অ্যাসেট ক্রেডিট হবে। মাস শেষে প্রফিট-অ্যান্ড-লস রিপোর্টে এই ২৫,০০০ টাকা ক্ষতি হিসেবে প্রদর্শিত হয়ে ট্যাক্স ও নিট লাভ নিখুঁতভাবে সমন্বয় করবে।",
      b: "Stock Damage অপশনে গিয়ে WATER_DAMAGE সিলেক্ট করে ১০ বস্তা চাল বাদ দেওয়া হবে। কস্ট প্রাইস অনুযায়ী ২৫,০০০ টাকা ক্ষতি হিসেবে লেজারে ডেবিট হবে এবং প্রফিট-লস রিপোর্টে সঠিক ক্ষতি প্রদর্শিত হবে।",
      e: "Execute a Stock Damage write-off flagged as WATER_DAMAGE for 10 bags. Dokani decrements physical stock and posts an automated General Ledger journal entry debiting Inventory Shrinkage Expense (10 * Cost Price = 25,000 BDT) and crediting Inventory Assets, reflecting the net loss on the income statement.",
      code: "// Auto Journal Entry:\nDebit: Inventory Loss Expense (25,000 BDT)\nCredit: Inventory Asset (25,000 BDT)"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: একটি ওষুধের দোকানে একজন স্টাফ ওষুধ বিক্রি করার সময় মেয়াদোত্তীর্ণ হওয়ার কাছাকাছি থাকা ব্যাচের বদলে ভুলবশত নতুন ব্যাচের ওষুধ বিক্রি করে দিয়েছে, ফলে পুরনো ব্যাচটি নষ্ট হওয়ার ঝুঁকিতে পড়েছে। Dokani-তে কীভাবে এটি স্বয়ংক্রিয়ভাবে ব্লক করবে?",
      m: "প্রতিরোধ ব্যবস্থা: Dokani-তে 'Strict FEFO Enforcement (বাধ্যতামূলক মেয়াদ ট্র্যাকিং)' পলিসি চালু করা যায়। যখন এটি চালু থাকে, ক্যাশিয়ার স্ক্যান করলেও সিস্টেম স্বয়ংক্রিয়ভাবে তাকে সতর্ক করে: `Warning: Batch B101 expires in 15 days! You cannot dispense Batch B104 (expires in 2 years) before B101 is cleared!`। ক্যাশিয়ার যতক্ষণ না পুরনো ব্যাচের পণ্যটি সেলফ থেকে এনে স্ক্যান করবে, ততক্ষণ সিস্টেম পরবর্তী নতুন ব্যাচ বিক্রি করতেই দেবে না। এটি ফার্মেসির মেয়াদোত্তীর্ণ ওষুধের অপচয় সম্পূর্ণ শূন্যে নামিয়ে আনে।",
      b: "Strict FEFO পলিসি অন থাকলে সিস্টেম নতুন ব্যাচ স্ক্যান করতে দেয় না এবং সতর্কবার্তা দেয় যে আগের ব্যাচের মেয়াদ দ্রুত শেষ হবে। ফলে স্টাফ পুরনো ওষুধ আগে বিক্রি করতে বাধ্য থাকে এবং ক্ষতি এড়ানো যায়।",
      e: "Enforce Strict FEFO (First Expired, First Out) validation in POS settings. When cashiers scan newer batches, the system rejects the line item, prompting: 'Batch B101 expires earlier; clear B101 before dispensing newer inventory'. This eliminates shelf expiry waste in pharmacies.",
      tip: "বলো: 'Strict FEFO policy blocks dispensing newer batches until near-expiry shelf batches are exhausted.'"
    },

    // --- REAL WORLD (5 Questions) ---
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা (Dokani SaaS): Dokani-তে একাধিক আউটলেটের সমন্বিত ইনভেন্টরি ড্যাশবোর্ড ও ইন্টার-ব্রাঞ্চ স্টক ট্রান্সফার কীভাবে মার্চেন্টদের কোটি টাকার ইনভেন্টরি ম্যানেজ করতে সাহায্য করছে?",
      m: "দোকানি পিওএসে সেন্ট্রালাইজড মাল্টি-ব্রাঞ্চ ইনভেন্টরি আর্কিটেকচার কার্যকর: একজন বড় ফ্যাশন মার্চেন্টের ধানমন্ডি, উত্তরা ও মিরপুরে ৩টি আউটলেট রয়েছে। ওনার তার ড্যাশবোর্ডে এক নজরে দেখতে পারেন কোন শোরুমে কোন সাইজের শার্ট বেশি বিক্রি হচ্ছে এবং কোথায় স্টক কম। যদি উত্তরার দোকানে কোনো সাইজ শেষ হয়ে যায় কিন্তু ধানমন্ডিতে প্রচুর উদ্বৃত্ত থাকে, ম্যানেজার এক ক্লিকে 'Inter-Branch Stock Transfer' রিকোয়েস্ট পাঠায়। ধানমন্ডি থেকে মালামাল ট্রানজিটে গিয়ে উত্তরা রিসিভ করে। কোনো নতুন পারচেজ ছাড়াই মার্চেন্ট তার বিদ্যমান স্টক অপটিমাইজ করে বিক্রি দ্বিগুণ করে ফেলে।",
      b: "দোকানিতে একাধিক ব্রাঞ্চের স্টক এক স্ক্রিনে দেখা যায়। এক ব্রাঞ্চে মাল শেষ হলে অন্য ব্রাঞ্চ থেকে এক ক্লিকে স্টক ট্রান্সফার করে নেওয়া যায়, ফলে নতুন মাল কেনা ছাড়াই সেলস বাড়ানো সম্ভব হয়।",
      e: "Dokani's centralized multi-branch inventory empowers retail chains with unified stock visibility across disparate retail outlets. Instant inter-branch transfers rebalance stock from slow-moving stores to high-demand locations, maximizing inventory turns without tying up capital in redundant procurement.",
      tip: "দোকানির এই মাল্টি-ব্রাঞ্চ ইনভেন্টরি ব্যালেন্সিং বাস্তব ব্যবসায়িক সাফল্যের চমৎকার উদাহরণ।"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: পাইকারি চাল ও ডালের আড়তে 'Bags to KG' এবং ওজনের ভগ্নাংশ (Decimal Quantities) হ্যান্ডলিংয়ে Dokani কীভাবে নির্ভুল হিসাব রাখে?",
      m: "পাইকারি ব্যবসায় পণ্য পূর্ণসংখ্যায় বিক্রি হয় না—যেমন `৫০.৭৫ কেজি` বা `১ বস্তা ২৫০ গ্রাম`। জাভাস্ক্রিপ্টের সাধারণ ফ্লোটিং পয়েন্ট নম্বর সিস্টেমে দশমিক যোগ-বিয়োগে ফ্লোটিং পয়েন্ট বাগ ঘটে (`0.1 + 0.2 = 0.30000000000000004`)! Dokani-তে আর্থিক ও ওজনের কোনো হিসেবেই ফ্লোটিং পয়েন্ট ব্যবহার করা হয় না। আমরা ডেটাবেজে `NUMERIC(12, 3)` (৩ দশমিক স্থান পর্যন্ত গ্রাম প্রিসিশন) এবং কোডে `Big.js` বা `decimal.js` লাইব্রেরি ব্যবহার করি। ৫০ বস্তা চাল থেকে ৫০.২৫ কেজি বিক্রি হলেও ইনভেন্টরি থেকে ১ গ্রামও হেরফের ছাড়া নিখুঁত দশমিক স্টক বিয়োগ হয়।",
      b: "জাভাস্ক্রিপ্টের দশমিক ভুলের কারণে ভগ্নাংশ ওজনে গরমিল হতে পারে। Dokani ডেটাবেজে NUMERIC(12, 3) এবং কোডে decimal.js ব্যবহার করে গ্রাম লেভেলেও নিখুঁত দশমিক স্টক হিসাব রক্ষা করে।",
      e: "Wholesale grain trading operates in decimal quantities (50.750 kg). To avoid JavaScript floating-point arithmetic drift (0.1 + 0.2 !== 0.3), Dokani enforces PostgreSQL NUMERIC(12, 3) column types and computes transactions using Decimal.js, guaranteeing sub-gram exactitude.",
      code: "import Decimal from 'decimal.js';\nconst remainingStock = new Decimal(currentStock).minus(new Decimal(soldKg)).toNumber();"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: বারকোড স্ক্যানার দিয়ে ড্রাগ স্টোরে 'ড্রাগ ইন্টারঅ্যাকশন ও জেনেরিক অল্টারনেটিভ' সাজেশন: Dokani ফার্মা মডিউলে এটি কীভাবে ডিজাইন করা হয়েছে?",
      m: "দোকানির ফার্মেসি মডিউলে প্রতিটি ওষুধের একটি `generic_name` (যেমন 'Paracetamol') এবং গ্রুপ থাকে। যখন কোনো কাস্টমার এসে বলে 'ভাই নাপা এক্সটেন্ড দেন' কিন্তু নাপা স্টকে শেষ, ক্যাশিয়ার বারকোড স্ক্যান বা সার্চ করলেই সিস্টেম তাৎক্ষণিকভাবে একই জেনেরিকের অন্য সব ইন-স্টক অল্টারনেটিভ ওষুধ (যেমন 'Ace Plus', 'Fast') স্ক্রিনে সাজেশন হিসেবে পপআপ করে এবং তাদের বর্তমান স্টক দেখায়। ক্যাশিয়ার কাস্টমারকে না ফিরিয়ে সাথে সাথে বিকল্প ওষুধটি বিক্রি করতে পারে। এটি ফার্মেসির বিক্রি ২৫% বৃদ্ধি করেছে।",
      b: "কোনো ওষুধ স্টকে না থাকলে Dokani স্বয়ংক্রিয়ভাবে একই জেনেরিকের অন্যান্য বিকল্প ওষুধ ও তাদের স্টক প্রদর্শন করে। ফলে কাস্টমারকে না ফিরিয়ে ক্যাশিয়ার সাথে সাথে বিকল্প ওষুধ বিক্রি করতে পারে।",
      e: "Dokani Pharma indexes pharmaceutical drugs by generic compound molecules (e.g. Paracetamol). If a prescribed branded medicine is out of stock, the POS automatically surfaces available same-molecule alternatives (e.g. Ace Plus, Fast) with real-time stock counts, boosting pharmacy fulfillment rates by 25%.",
      tip: "বলো: 'The pharma generic lookup engine surfaces in-stock substitute molecules when requested brands are stocked out.'"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: সাপ্লায়ার পেমেন্ট শিডিউলিং ও অটোমেটেড অ্যালার্ট: Dokani-তে সাপ্লায়ারদের দেনা পরিশোধের তারিখ কীভাবে ট্র্যাক হয়?",
      m: "মার্চেন্টরা সাপ্লায়ারদের কাছ থেকে বাকিতে মালামাল নিয়ে ৩০ বা ৪৫ দিনের চেকে বা ক্যাশে পেমেন্টের শর্ত করে। Dokani-তে প্রতিটি সাপ্লায়ার চালানের সাথে একটি `payment_due_date` যুক্ত থাকে। ড্যাশবোর্ডে ওনার একটি 'Upcoming Supplier Payables' ক্যালেন্ডার দেখতে পান: আগামী ৭ দিনে কোন কোন সাপ্লায়ারকে কত টাকা পরিশোধ করতে হবে। নির্দিষ্ট তারিখের ২ দিন আগে ওনারের মোবাইলে পুশ নোটিফিকেশন যায়। এর ফলে মার্চেন্টের ব্যবসায়িক সুনাম ও ক্রেডিট স্কোর বজায় থাকে এবং সাপ্লায়ারদের সাথে বিশ্বাসযোগ্য সম্পর্ক অটুট থাকে।",
      b: "সাপ্লায়ারের চালানের সাথে পেমেন্টের শেষ তারিখ সংরক্ষিত থাকে। ড্যাশবোর্ড ক্যালেন্ডারে আগামী সপ্তাহের মোট দেনা প্রদর্শন করা হয় এবং ২ দিন আগে ওনারকে নোটিফিকেশন পাঠিয়ে পেমেন্ট শিডিউল রক্ষা করা হয়।",
      e: "Dokani tracks trade credit via structured supplier payment due dates. An interactive Payables Aging calendar visualizes upcoming liabilities across 7, 30, and 60-day tranches, dispatching automated reminder pushes to merchant owners before check presentation deadlines.",
      tip: "বলো: 'Trade credit payables aging schedules prevent merchant default and preserve supplier trust.'"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: Dokani-তে ইনভেন্টরি ট্র্যাকিং সিস্টেম তৈরিতে তোমার সবচেয়ে বড় ইঞ্জিনিয়ারিং চ্যালেঞ্জ কী ছিল এবং কীভাবে তা সমাধান করেছিলে?",
      m: "সবচেয়ে বড় ইঞ্জিনিয়ারিং চ্যালেঞ্জ ছিল: 'হাজার হাজার দোকানের মাল্টি-টেন্যান্ট ডেটাবেজে পিক আওয়ারে কনকারেন্ট সেলস চলার সময়ও ডেটাবেজ লক স্লো না করে সাব-৩ মিলিসেকেন্ডে স্টক কাটার নিশ্চয়তা দেওয়া।' সমাধান: আমি প্রথমে ক্লায়েন্ট-সাইডে একটি ইন-মেমোরি ক্যাটালগ ক্যাশ তৈরি করি যা বারকোড রিডকে নেটওয়ার্ক-মুক্ত করে। এরপর ব্যাকএন্ডে PostgreSQL-এর `SELECT FOR UPDATE` রো-লেভেল পেসিমিস্টিক লককে অপটিমাইজ করি কম্পাউন্ড ইনডেক্স `(tenant_id, product_id)` দিয়ে—যাতে ডেটাবেজ পুরো টেবিল স্ক্যান না করে সরাসরি ইনডেক্স ট্রি থেকে নির্দিষ্ট রো লক করে ১ মিলিসেকেন্ডে ট্রানজ্যাকশন শেষ করে। এই সমন্বিত ডিজাইনের ফলে সিস্টেমটি এখন কোটি টাকার লেনদেন কোনো কনকারেন্সি ডেডলক বা ওভার-সেলিং ছাড়া মসৃণভাবে পরিচালনা করছে।",
      b: "সবচেয়ে বড় চ্যালেঞ্জ ছিল পিক আওয়ারে হাজার হাজার বিক্রির মাঝে ডেটাবেজ স্লো না করে স্টক মাইনাস হওয়া শতভাগ রোধ করা। ক্লায়েন্ট-সাইড মেমোরি ক্যাশ এবং কম্পাউন্ড ইনডেক্সযুক্ত পেসিমিস্টিক লকের মাধ্যমে এটি সফলভাবে সমাধান করেছি।",
      e: "My greatest engineering challenge was maintaining sub-3ms inventory checkout velocity across multi-tenant databases during rush hours without deadlocking or overselling. I solved it by coupling client-side in-memory catalog lookups with surgical compound-indexed PostgreSQL SELECT FOR UPDATE locks, ensuring atomic 1ms ledger finalization under massive concurrency.",
      tip: "এই চ্যালেঞ্জ ও সমাধানের গল্প ইন্টারভিউয়ারকে তোমার টেকনিক্যাল গভীরতা ও সমস্যার গভীরে যাওয়ার ক্ষমতা প্রমাণ করে দেবে।"
    }
  ]
};
