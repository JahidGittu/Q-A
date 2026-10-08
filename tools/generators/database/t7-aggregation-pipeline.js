// Topic 7: Aggregation Queries & Data Analytics (25 Questions: 5 lvl1, 5 lvl2, 5 lvl3, 5 situation, 5 realworld)
module.exports = {
  id: "aggregation-analytics",
  name: "Aggregation Queries & Data Analytics",
  desc: "MongoDB Aggregation Pipeline ($match, $group, $lookup, $unwind, $facet), SQL Window Functions, CTEs, Reporting Optimization",
  items: [
    // --- LEVEL 1 (5 Questions) ---
    {
      lvl: "lvl1",
      q: "MongoDB Aggregation Pipeline কী এবং এটি সাধারণ `find()` কুয়েরির চেয়ে কীভাবে শক্তিশালী?",
      m: "Aggregation Pipeline হলো ডেটা প্রসেসিংয়ের একটি বহু-ধাপ বিশিষ্ট আর্কিটেকচার (Unix পাইপের মতো `cmd1 | cmd2 | cmd3`)। সাধারণ `find()` শুধু ডকুমেন্ট ফিল্টার ও প্রোজেকশন করতে পারে, কিন্তু অ্যাগ্রিগেশন পাইপলাইনে ডেটা এক স্টেজ থেকে অন্য স্টেজে ফিল্টার (`$match`), গ্রুপ ও যোগফল (`$group`), অন্য কালেকশনের সাথে জয়েন (`$lookup`), অ্যারে ফ্ল্যাট করা (`$unwind`), এবং জটিল অ্যানালিটিক্যাল হিসেব সম্পাদন করতে পারে। এটি ডেটাবেজ লেভেলেই শতভাগ অ্যানালিটিক্যাল হিসাব শেষ করে রেডিমেড রিপোর্ট রিটার্ন করে।",
      b: "অ্যাগ্রিগেশন পাইপলাইন হলো ডেটা রূপান্তর ও বিশ্লেষণের ধারাবাহিক ধাপের সমষ্টি। এটি শুধু ফিল্টার নয়, বরং গ্রুপিং, যোগফল, অন্য টেবিলের সাথে জয়েন এবং অ্যারে ভেঙে জটিল রিপোর্ট তৈরি করার ক্ষমতা রাখে।",
      e: "The MongoDB Aggregation Pipeline is a multi-stage data processing framework modeling sequential transformations. While find() simply queries and projects documents, the pipeline transforms, groups ($group), joins ($lookup), reshapes, and analyzes multi-dimensional datasets within the database engine.",
      tip: "বলো: 'Aggregation Pipeline processes documents through sequential stages, computing analytics natively in the engine.'"
    },
    {
      lvl: "lvl1",
      q: "MongoDB-তে `$match`, `$group`, এবং `$project` স্টেজগুলোর ভূমিকা কী?",
      m: "(১) `$match`: নির্দিষ্ট শর্তের ভিত্তিতে ডকুমেন্ট ফিল্টার করে (SQL-এর `WHERE` ক্লজের সমতুল্য)। পাইপলাইনের পারফরম্যান্স বাড়াতে সবার শুরুতে `$match` দেওয়া আবশ্যক যাতে ইনডেক্স ব্যবহার করা যায়। (২) `$group`: নির্দিষ্ট ফিল্ডের ভিত্তিতে ডকুমেন্টগুলোকে গ্রুপ করে এবং অ্যাগ্রিগেট মান (যেমন `$sum`, `$avg`, `$min`, `$max`) ক্যালকুলেট করে (SQL-এর `GROUP BY`-এর সমতুল্য)। (৩) `$project`: রেজাল্টের শেপ বা স্ট্রাকচার পরিবর্তন করে—কোন ফিল্ডগুলো আউটপুটে থাকবে, কোনটি বাদ যাবে বা নতুন গণনাকৃত ফিল্ড তৈরি করবে (SQL-এর `SELECT` ক্লজের সমতুল্য)।",
      b: "$match ডকুমেন্ট ফিল্টার করে, $group নির্দিষ্ট ক্যাটাগরিতে ডেটা গ্রুপ করে যোগফল বা গড় নির্ণয় করে, এবং $project ফলাফলে কোন ফিল্ডগুলো প্রদর্শিত হবে তা নির্ধারণ করে।",
      e: "$match filters documents (analogous to SQL WHERE). $group aggregates documents by a specified identifier, applying accumulators like $sum or $avg (SQL GROUP BY). $project reshapes document fields and injects calculated expressions (SQL SELECT).",
      code: "db.orders.aggregate([\n  { $match: { status: 'COMPLETED' } },\n  { $group: { _id: '$storeId', totalSales: { $sum: '$grandTotal' } } },\n  { $project: { storeId: '$_id', totalSales: 1, _id: 0 } }\n]);"
    },
    {
      lvl: "lvl1",
      q: "MongoDB-তে `$lookup` কী এবং এটি SQL `LEFT OUTER JOIN`-এর সাথে কীভাবে তুলনীয়?",
      m: "`$lookup` স্টেজটি মঙ্গোডিবির একই ডেটাবেজের অন্য একটি কালেকশন থেকে সংশ্লিষ্ট ডেটা এনে বর্তমান ডকুমেন্টে একটি নতুন অ্যারে হিসেবে যোগ করে। এটি ঠিক রিলেশনাল ডেটাবেজের `LEFT OUTER JOIN`-এর মতো কাজ করে। এতে চারটি প্যারামিটার থাকে: `from` (টার্গেট কালেকশন), `localField` (বর্তমান ডকুমেন্টের কি), `foreignField` (টার্গেট ডকুমেন্টের কি), এবং `as` (যে নামে আউটপুট অ্যারেটি তৈরি হবে)। ম্যাচিং কোনো ডকুমেন্ট না পাওয়া গেলে আউটপুট অ্যারেটি খালি `[]` থাকে।",
      b: "$lookup হলো নো-এসকিউএল ডেটাবেজের লেফট জয়েন। এটি অন্য কালেকশন থেকে অবজেক্ট আইডি বা কি ম্যাচ করে রিলেটেড সব রেকর্ড এনে বর্তমান ডকুমেন্টের ভেতর একটি নতুন অ্যারে হিসেবে বসিয়ে দেয়।",
      e: "$lookup performs an equality match join against another collection, returning matched foreign documents as an array field (identical to SQL LEFT OUTER JOIN). If no matches are found, the target array field is initialized empty [].",
      code: "{\n  $lookup: {\n    from: 'users',\n    localField: 'userId',\n    foreignField: '_id',\n    as: 'customerDetails'\n  }\n}"
    },
    {
      lvl: "lvl1",
      q: "MongoDB-তে `$unwind` অপারেটর কী এবং কেন এটি ব্যবহার করা হয়?",
      m: "`$unwind` কোনো ডকুমেন্টের ভেতরের একটি অ্যারেকে ভেঙে প্রতিটি আইটেমের জন্য আলাদা আলাদা পৃথক ডকুমেন্ট তৈরি করে (Array Deconstruction)। যেমন: একটি অর্ডারে যদি ৩টি প্রোডাক্টের একটি অ্যারে থাকে, তবে `$unwind: '$items'` চালালে ওই একটি অর্ডার ৩টি পৃথক ডকুমেন্টে পরিণত হবে—যেখানে বাকি সব ফিল্ড একই থাকবে কিন্তু `items` ফিল্ডে একেকটি অবজেক্ট থাকবে। এর মূল ব্যবহার: অর্ডারের ভেতরের নির্দিষ্ট প্রোডাক্টের মোট বিক্রি বা আইটেম-লেভেল অ্যানালিটিক্স গ্রুপিং করার জন্য।",
      b: "$unwind একটি অ্যারের প্রতিটি উপাদানকে আলাদা করে প্রতিটি উপাদানের জন্য পৃথক পূর্ণাঙ্গ ডকুমেন্ট তৈরি করে। অ্যারের ভেতরের আইটেমগুলোর ওপর গ্রুপিং ও যোগফল হিসেব করতে এটি ব্যবহৃত হয়।",
      e: "$unwind deconstructs an array field from the input documents to output a document for each element in the array. It is predominantly used prior to $group to calculate granular item-level metrics from nested arrays.",
      code: "db.orders.aggregate([\n  { $unwind: '$items' },\n  { $group: { _id: '$items.productId', totalQty: { $sum: '$items.qty' } } }\n]);"
    },
    {
      lvl: "lvl1",
      q: "SQL-এ Common Table Expression (CTE / `WITH` ক্লজ) কী এবং সাব-কুয়েরির চেয়ে এটি কেন ভালো?",
      m: "CTE হলো একটি সাময়িক ও নামযুক্ত রেজাল্ট সেট যা একটি একক SQL স্টেটমেন্টের এক্সিকিউশনের সময় ডিফাইন করা হয় (`WITH cte_name AS (...)`)। সাব-কুয়েরির চেয়ে CTE বহুগুণ সেরা কারণ: (১) কোডের রিডেবিলিটি ও মেইনটেইনেবিলিটি নাটকীয়ভাবে বাড়ে (নেস্টেড সাব-কুয়েরির জটিল স্প্যাগেটি কোড দূর হয়), (২) একই CTE-কে মূল কুয়েরিতে একাধিকবার রি-ইউজ করা যায়, এবং (৩) এটি রিকার্সিভ কুয়েরি (Recursive CTEs) সাপোর্ট করে যা দিয়ে হায়ারার্কিকাল বা ট্রি ডেটা (যেমন ক্যাটাগরি প্যারেন্ট-চাইল্ড) এক কুয়েরিতে ট্রাভার্স করা যায়।",
      b: "সিটিই (WITH ক্লজ) হলো সাময়িক নামযুক্ত ভার্চুয়াল টেবিল যা জটিল সাব-কুয়েরিকে সহজবোধ্য ও পাঠযোগ্য করে তোলে। একই কোড বারবার ব্যবহার করতে এবং হায়ারার্কিকাল ডেটা ফেচ করতে এটি আদর্শ।",
      e: "A Common Table Expression (CTE) creates a temporary, named result set within an execution scope using the WITH clause. CTEs vastly improve readability over deep nested subqueries, permit modular reuse across joins, and unlock recursive tree traversals.",
      code: "WITH MonthlySales AS (\n  SELECT tenant_id, SUM(total) AS revenue\n  FROM invoices\n  WHERE created_at >= NOW() - INTERVAL '30 days'\n  GROUP BY tenant_id\n)\nSELECT * FROM MonthlySales WHERE revenue > 100000;"
    },

    // --- LEVEL 2 (5 Questions) ---
    {
      lvl: "lvl2",
      q: "SQL Window Functions (`OVER (PARTITION BY ... ORDER BY ...)`) কী এবং সাধারণ `GROUP BY`-এর সাথে এর পার্থক্য কী?",
      m: "সাধারণ `GROUP BY` একাধিক রোকে সংকুচিত (Collapse) করে একটি একক সামারি রোতে পরিণত করে, ফলে স্বতন্ত্র রোর অস্তিত্ব হারিয়ে যায়। কিন্তু `Window Function` টেবিলের প্রতিটি রোর স্বতন্ত্র পরিচয় অক্ষুণ্ণ রেখেই একটি নির্দিষ্ট উইন্ডো বা সেগমেন্টের ওপর ক্যালকুলেশন চালায়! অর্থাৎ টেবিলে যদি ১০০০টি রো থাকে, উইন্ডো ফাংশন চালালেও আউটপুটে ১০০০টি রো-ই থাকবে, তবে প্রতি রো-তে তার বিভাগের র‍্যাংক বা রানিং টোটাল যোগ হবে। সিনট্যাক্স: `FUNCTION() OVER (PARTITION BY category ORDER BY sales DESC)`।",
      b: "GROUP BY একাধিক রোকে মুছে একটি রোতে নামিয়ে আনে, কিন্তু উইন্ডো ফাংশন প্রতিটি রোর অস্তিত্ব বজায় রেখেই নির্দিষ্ট গ্রুপের ওপর রানিং টোটাল, এভারেজ বা র‍্যাঙ্কিং বের করে দেয়।",
      e: "Unlike GROUP BY which collapses multiple rows into a single summary record, SQL Window Functions perform calculations across a partition of rows while preserving individual row identities. Every original row remains present with the newly computed analytical attribute.",
      code: "SELECT employee_id, department, salary,\n       AVG(salary) OVER (PARTITION BY department) AS dept_avg_salary\nFROM employees;"
    },
    {
      lvl: "lvl2",
      q: "SQL-এ `ROW_NUMBER()`, `RANK()`, এবং `DENSE_RANK()`-এর মধ্যে সূক্ষ্ম পার্থক্য কী?",
      m: "ধরি তিনজনের স্কোর সমান (১০০, ১০০, ৯০): (১) `ROW_NUMBER()`: টাই বা সমতাকে পরোয়া করে না; প্রতিটি রো-কে একটি কঠোর ইউনিক সিকুয়েনশিয়াল নম্বর দেয় (১, ২, ৩)। (২) `RANK()`: টাই হলে সমান র‍্যাংক দেয়, কিন্তু পরবর্তী র‍্যাংক স্কিপ করে গ্যাপ তৈরি করে (১, ১, ৩—এখানে ২ স্কিপ হয়েছে)। (৩) `DENSE_RANK()`: টাই হলে সমান র‍্যাংক দেয়, কিন্তু কোনো নম্বর স্কিপ না করে ঘনভাবে এগিয়ে যায় (১, ১, ২—এখানে কোনো গ্যাপ নেই)।",
      b: "ROW_NUMBER প্রতি রো-কে ভিন্ন নম্বর দেয়। RANK টাই হলে একই নম্বর দেয় তবে পরের নম্বর স্কিপ করে। DENSE_RANK টাই হলে একই নম্বর দেয় এবং কোনো নম্বর স্কিপ না করে ক্রমানুসারে র‍্যাংক নির্ধারণ করে।",
      e: "ROW_NUMBER() assigns strictly unique sequential integers regardless of ties (1, 2, 3). RANK() assigns identical values to ties and skips subsequent positions creating gaps (1, 1, 3). DENSE_RANK() assigns identical values to ties without skipping subsequent ranks (1, 1, 2).",
      tip: "ইন্টারভিউতে '1, 1, 3 (Rank) vs 1, 1, 2 (Dense Rank)' সংখ্যাগুলো উল্লেখ করলে স্পষ্ট ধারণা প্রমাণ হয়।"
    },
    {
      lvl: "lvl2",
      q: "MongoDB-তে `$facet` স্টেজ কী এবং একক ডেটাবেজ কলে ড্যাশবোর্ড ও পেজিনেশন মেটাডেটা কীভাবে আনা যায়?",
      m: "`$facet` স্টেজ একই ইনপুট ডকুমেন্টের ওপর সমান্তরালে (In parallel) একাধিক স্বাধীন সাব-পাইপলাইন চালানোর সুযোগ দেয়! ক্লাসিক ব্যবহার: পেজিনেটেড প্রোডাক্ট লিস্ট এবং একই সাথে মোট কাউন্ট ও ফিল্টারের হিসেব আনা। পূর্বে দুটি আলাদা কুয়েরি লাগত (`count()` এবং `find().skip().limit()`)। `$facet`-এর মাধ্যমে একটি সাব-পাইপলাইনে `{ $skip: 0 }, { $limit: 10 }` এবং অন্য সাব-পাইপলাইনে `{ $count: 'total' }` দিয়ে একক ডেটাবেজ রাউন্ড-ট্রিপে ডেটা ও পেজিনেশন মেটাডেটা আনা সম্ভব হয়।",
      b: "$facet একই সাথে সমান্তরালে একাধিক পাইপলাইন চালায়। এর মাধ্যমে এক কুয়েরিতেই পেজিনেশন রেজাল্ট, মোট কাউন্ট এবং ফিল্টার পরিসংখ্যান একবারে আনা যায়।",
      e: "The $facet stage processes multiple aggregation pipelines concurrently within a single stage on the same input documents. It is standard for e-commerce dashboards to fetch paginated items and total dataset count simultaneously in one round trip.",
      code: "db.products.aggregate([\n  { $match: { isAvailable: true } },\n  {\n    $facet: {\n      data: [{ $skip: 20 }, { $limit: 10 }],\n      totalCount: [{ $count: 'total' }]\n    }\n  }\n]);"
    },
    {
      lvl: "lvl2",
      q: "SQL-এ Recursive CTE কীভাবে কাজ করে এবং ক্যাটাগরি ট্রি বা অর্গানোগ্রাম ফেচ করতে কীভাবে ব্যবহৃত হয়?",
      m: "Recursive CTE হলো এমন একটি কুয়েরি যা নিজের ফলাফলকে বারবার রেফারেন্স করে যতক্ষণ না কোনো শর্ত মিথ্যা হয়। এর দুটি অংশ থাকে: (১) `Anchor Member`: মূল রুট নোডটি খুঁজে বের করে (যেমন `WHERE parent_id IS NULL`), (২) `Recursive Member`: `UNION ALL` দিয়ে পূর্ববর্তী রেজাল্ট সেটের সাথে চাইল্ড রেকর্ডগুলোকে বারবার জয়েন করে যতক্ষণ না লিফ নোডে পৌঁছায়। এটি যেকোনো গভীরতার আনবাউন্ডেড ক্যাটাগরি ট্রি বা ম্যানেজমেন্ট হায়ারার্কি এক কুয়েরিতে বের করে এনে দেয়।",
      b: "রিকার্সিভ সিটিই নিজেকেই বারবার কল করে যতক্ষণ না লিফ নোডে পৌঁছায়। এটি দিয়ে প্যারেন্ট-চাইল্ড ক্যাটাগরি ট্রি বা কোম্পানির পদক্রম খুব সহজে এক কুয়েরিতে তুলে আনা যায়।",
      e: "A Recursive CTE references itself iteratively. It consists of an Anchor member (base case, e.g. parent_id IS NULL) joined via UNION ALL with a Recursive member that traverses subsequent child levels until reaching terminal leaves.",
      code: "WITH RECURSIVE CategoryTree AS (\n  SELECT id, name, parent_id, 1 AS depth FROM categories WHERE parent_id IS NULL\n  UNION ALL\n  SELECT c.id, c.name, c.parent_id, ct.depth + 1\n  FROM categories c JOIN CategoryTree ct ON c.parent_id = ct.id\n)\nSELECT * FROM CategoryTree;"
    },
    {
      lvl: "lvl2",
      q: "MongoDB Aggregation-এ Memory Limit (100MB RAM cap) কী এবং `$allowDiskUse` অপশন কখন ব্যবহার করবে?",
      m: "MongoDB প্রতিটি অ্যাগ্রিগেশন পাইপলাইন স্টেজের জন্য সর্বোচ্চ ১০০ মেগাবাইট (100MB) RAM বরাদ্দ করে। যদি কোনো `$group` বা `$sort` স্টেজ ইন-মেমোরিতে ১০০MB সীমা অতিক্রম করে, তবে কুয়েরি `exceeded memory limit of 100MB` এরর দিয়ে ক্র্যাশ করে। সমাধান: (১) কুয়েরি অপশনে `{ allowDiskUse: true }` পাস করতে হবে—যাতে ডেটাবেজ মেমোরি শেষ হলে অস্থায়ী ডিস্ক স্পেস ব্যবহার করে সর্ট বা গ্রুপিং সম্পন্ন করতে পারে। (২) তবে ডিস্ক আই/ও স্লো হওয়ায় প্রোডাকশনে ফিল্টারে ইনডেক্স দেওয়া এবং আর্লি `$match` করে ডেটা সাইজ কমানো অগ্রাধিকার পাওয়া উচিত।",
      b: "মঙ্গোডিবি অ্যাগ্রিগেশনের প্রতি স্টেজে ১০০MB র‍্যামের সীমা রয়েছে। allowDiskUse: true দিলে এটি মেমোরি ছাড়িয়ে গেলে হার্ডডিস্কের টেম্পোরারি ফাইলে ডেটা প্রসেস করে এরর এড়ায়।",
      e: "MongoDB caps memory for any pipeline stage at 100MB. If an unindexed $sort or large $group exceeds this threshold, pass { allowDiskUse: true } to spill temporary data to disk, preventing query termination at the cost of disk I/O latency.",
      code: "db.logs.aggregate([...], { allowDiskUse: true });"
    },

    // --- LEVEL 3 (5 Questions) ---
    {
      lvl: "lvl3",
      q: "SQL Window Functions দিয়ে 'Running Total' (চলতি মোট হিসেব) এবং Moving Average কীভাবে ক্যালকুলেট করবে?",
      m: "রানিং টোটাল হলো পূর্ববর্তী সব রো-র যোগফলের সাথে বর্তমান রোর যোগফল। সিনট্যাক্স: `SUM(amount) OVER (ORDER BY created_at ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)`। এটি প্রতিদিনের ব্যালেন্স বা ক্রমবর্ধমান আয় দেখায়। আর ৭ দিনের মুভিং এভারেজ বের করতে ফ্রেম ক্লজ ব্যবহার করা হয়: `AVG(sales) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)`। এটি প্রতিদিনের সেলসের ওঠানামা স্মুথ করে ট্রেন্ড লাইন বুঝতে ড্যাশবোর্ডে ব্যবহৃত হয়।",
      b: "রানিং টোটাল বের করতে SUM(amount) OVER (ORDER BY date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) ব্যবহৃত হয়। আর ৭ দিনের মুভিং এভারেজের জন্য 6 PRECEDING AND CURRENT ROW ফ্রেম ক্লজ ব্যবহার করা হয়।",
      e: "Running totals are computed via SUM(amount) OVER (ORDER BY date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW). Moving averages specify a window frame like ROWS BETWEEN 6 PRECEDING AND CURRENT ROW to calculate rolling 7-day averages natively.",
      code: "SELECT date, amount,\n       SUM(amount) OVER (ORDER BY date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total,\n       AVG(amount) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS seven_day_moving_avg\nFROM daily_sales;"
    },
    {
      lvl: "lvl3",
      q: "MongoDB Aggregation Pipeline অপটিমাইজেশন ইন্টারনালস: কেন পাইপলাইনে স্টেজ অর্ডার জীবন-মরণ সমান গুরুত্বপূর্ণ?",
      m: "মঙ্গোডিবি কুয়েরি অপটিমাইজার কিছু স্টেজ পুশ-ডাউন অপটিমাইজ করতে পারে, কিন্তু ডেভেলপারের সাজানো স্টেজ সিকুয়েন্স পারফরম্যান্স নিয়ন্ত্রণ করে: (১) `$match` এবং `$sort` অবশ্যই পাইপলাইনের সবার শুরুতে রাখতে হবে যাতে কালেকশনের B-Tree ইনডেক্স ব্যবহার করা যায়। একবার `$project` বা `$group` হয়ে গেলে ইনডেক্স সম্পূর্ণ অকেজো হয়ে যায়! (২) `$unwind`-এর আগে অবশ্যই ফিল্টারিং শেষ করতে হবে—কারণ ১০ লক্ষ ডকুমেন্টে আনওয়াইন্ড চালালে মুহূর্তের মধ্যে কোটি ডকুমেন্ট মেমোরিতে স্পিল করে সার্ভার ক্র্যাশ করবে। (৩) `$project` দিয়ে অপ্রয়োজনীয় বড় ফিল্ড বাদ দিয়ে পাইপলাইনের ডকুমেন্ট পে-লোড ছোট রাখতে হবে।",
      b: "ইনডেক্স ব্যবহারের জন্য $match এবং $sort অবশ্যই পাইপলাইনের শুরুতে রাখতে হবে। $unwind চালানোর আগে ডেটা ফিল্টার করা বাধ্যতামূলক যাতে কোটি কোটি রো মেমোরি ব্লোট না ঘটায়।",
      e: "$match and $sort must precede all other stages to leverage collection indexes; once a pipeline executes $project or $group, index accessibility is permanently lost. Unwinding before filtering creates massive in-memory document expansions that stall the cluster.",
      tip: "বলো: 'Placing $match and $sort at the top ensures index usage before pipeline memory materialization.'"
    },
    {
      lvl: "lvl3",
      q: "OLTP ডেটাবেজে সরাসরি জটিল অ্যানালিটিক্যাল কুয়েরি চালানোর ঝুঁকি কী এবং Read Replica ও Materialized View দিয়ে কীভাবে ব্যালেন্স করবে?",
      m: "OLTP ডেটাবেজ ডিজাইন করা হয়েছে দ্রুত এবং ক্ষুদ্র লেনদেনের জন্য (যেমন সেলস ইনভয়েস তৈরি বা স্টক কাটা)। এতে যদি কোনো ম্যানেজার ৫ বছরের সেলস অ্যানালিটিক্স বা লাখ লাখ রোর অ্যাগ্রিগেশন কুয়েরি চালায়, তবে তা ডেটাবেজের সব CPU কোর এবং বাফার ক্যাশ গ্রাস করে ফেলে—ফলে ক্যাশিয়ারদের পিওএস চেকআউট ল্যাগ করা শুরু করে! সমাধান: (১) `Read Replica`: ডেটাবেজের একটি রিড-রেপ্লিকা তৈরি করে সমস্ত ভারী ড্যাশবোর্ড ও রিপোর্টিং কুয়েরি সেখানে রুট করা। (২) `Materialized View`: দৈনিক বা ঘণ্টায় একবার ডেটা প্রাক-গণনা (Pre-compute) করে মেটেরিয়ালাইজড ভিউতে রাখা (`REFRESH MATERIALIZED VIEW CONCURRENTLY`) যাতে ড্যাশবোর্ড মুহূর্তেই তৈরি ডেটা দেখতে পারে।",
      b: "ভারী অ্যানালিটিক্যাল কুয়েরি মূল ডেটাবেজের সিপিইউ গ্রাস করে লাইভ ট্রানজ্যাকশন স্লো করে দেয়। রিড-রেপ্লিকা ব্যবহার করে রিপোর্টিং ট্রাফিক আলাদা করা এবং মেটেরিয়ালাইজড ভিউ দিয়ে ডেটা প্রি-কম্পিউট করে রাখা আর্কিটেকচারাল সমাধান।",
      e: "Running heavy multi-stage analytical queries on an OLTP instance starves CPU and evicts cache pages, spiking latency on customer-facing write transactions. Route analytical reads to an asynchronous Read Replica and use Materialized Views with periodic background refreshes.",
      code: "CREATE MATERIALIZED VIEW mv_daily_store_revenue AS\nSELECT store_id, DATE(created_at) AS day, SUM(total) AS revenue\nFROM invoices GROUP BY store_id, DATE(created_at);\n-- Refresh non-blocking:\nREFRESH MATERIALIZED VIEW CONCURRENTLY mv_daily_store_revenue;"
    },
    {
      lvl: "lvl3",
      q: "PostgreSQL-এ JSONB Aggregation Functions (`jsonb_agg`, `jsonb_object_agg`) দিয়ে হাই-পারফরম্যান্স নেস্টেড JSON কীভাবে সিঙ্গেল কুয়েরিতে তৈরি করবে?",
      m: "Node.js অ্যাপ্লিকেশনে N+1 কুয়েরি চালিয়ে ডেটা নেস্ট করার বদলে PostgreSQL-এর `jsonb_agg()` এবং `json_build_object()` ব্যবহার করে ডেটাবেজ লেভেলেই শতভাগ নেস্টেড JSON অবজেক্ট জেনারেট করে রিটার্ন করা যায়। যেমন: একটি ইউজারের সব অর্ডার ও অর্ডারের সব আইটেম ডেটাবেজ নিজেই একটি সম্পূর্ণ হায়ারার্কিকাল JSON রেসপন্স হিসেবে বানিয়ে দেয়। নোড সার্ভারে কোনো জাভাস্ক্রিপ্ট লুপ চালানো লাগে না এবং নেটওয়ার্ক ওভারহেড এক-দশমাংশে নেমে আসে।",
      b: "jsonb_agg এবং json_build_object দিয়ে ডাটাবেজ নিজেই চাইল্ড ডেটাগুলোকে নেস্টেড JSON অ্যারে বানিয়ে দেয়। এতে নোড সার্ভারে একাধিক কুয়েরি চালানো বা লুপ ঘোরানোর প্রয়োজন হয় না।",
      e: "jsonb_agg() aggregates row sets into JSON arrays, and jsonb_build_object() constructs JSON key-value structures directly inside PostgreSQL. This eliminates ORM hydration and N+1 queries, outputting fully hydrated hierarchical JSON payloads from a single SQL statement.",
      code: "SELECT u.id, u.name,\n       jsonb_agg(jsonb_build_object('id', o.id, 'total', o.total)) AS orders\nFROM users u\nLEFT JOIN orders o ON o.user_id = u.id\nGROUP BY u.id, u.name;"
    },
    {
      lvl: "lvl3",
      q: "Time-Series Data Aggregation: লাখ লাখ IoT বা সেলস টাইম-সিরিজ ডেটা ঘণ্টাওয়ারি ও দৈনিক গ্রুপিংয়ে কীভাবে অপটিমাইজ করবে?",
      m: "টাইম-সিরিজ ডেটায় PostgreSQL-এর `date_trunc('hour', created_at)` বা `date_trunc('day', created_at)` ব্যবহার করা হয়। তবে কোটি কোটি রোর ক্ষেত্রে প্রতিবার কুয়েরিতে `date_trunc` চালানো খুব স্লো। হাই-স্কেল সমাধান: (১) কলামের ওপর একটি এক্সপ্রেশন ইনডেক্স তৈরি করা: `CREATE INDEX idx_logs_hourly ON logs (date_trunc('hour', created_at));`। (২) অথবা টাইমসিরিজ এক্সটেনশন যেমন `TimescaleDB` ব্যবহার করা—যা হাইপারটেবিল (Hypertables) এবং স্বয়ংক্রিয় ব্যাকগ্রাউন্ড 'Continuous Aggregates' তৈরি করে রাখে, ফলে রিয়েলটাইমে শত কোটি পয়েন্টের ডেটা মাত্র ৩ মিলিসেকেন্ডে গ্রাফে রেন্ডার হয়।",
      b: "টাইম-সিরিজ ডেটার দ্রুত হিসেবের জন্য date_trunc এক্সপ্রেশন ইনডেক্স তৈরি করা হয়। বিশাল ডেটাসেটের ক্ষেত্রে TimescaleDB-এর কন্টিনিউয়াস অ্যাগ্রিগেশন ব্যবহার করে স্বয়ংক্রিয়ভাবে ঘণ্টাওয়ারি ও দৈনিক প্রি-কম্পিউটেড ডেটা প্রস্তুত রাখা হয়।",
      e: "For time-series rollups, index date_trunc('hour', created_at) directly via an Expression Index. At enterprise scale, implement TimescaleDB hypertables with Continuous Aggregates to maintain automated pre-computed downsampled rollups.",
      code: "SELECT date_trunc('hour', created_at) AS hour_bucket,\n       COUNT(*) AS request_count, AVG(response_time) AS avg_lat\nFROM api_logs\nGROUP BY hour_bucket ORDER BY hour_bucket DESC;"
    },

    // --- SITUATION BASED (5 Questions) ---
    {
      lvl: "situation",
      q: "পরিস্থিতি: ড্যাশবোর্ডে গত ৩০ দিনের মোট রেভিনিউ এবং টপ ৫ বেস্ট-সেলিং প্রোডাক্ট আনতে গিয়ে মঙ্গোডিবি অ্যাগ্রিগেশন কুয়েরি ১২ সেকেন্ড সময় নিচ্ছে। তুমি কীভাবে এটি দ্রুত করবে?",
      m: "সমাধানের ধাপ: (১) সবার আগে পাইপলাইনের শীর্ষে ইনডেক্সড `$match` স্টেজ বসাতে হবে: `{ created_at: { $gte: thirtyDaysAgo } }`—যাতে পুরো কালেকশন স্ক্যান না হয়ে শুধু ৩০ দিনের ডেটা ফিল্টার হয়। (২) ইনভয়েস আইটেমে `$unwind: '$items'` করার আগে আইটেম ছাড়া অপ্রয়োজনীয় বড় ফিল্ড বাদ দিয়ে দেব। (৩) একই সাথে দুটি রেজাল্ট আনতে দুটি আলাদা দানবীয় কুয়েরি না চালিয়ে `$facet` স্টেজ ব্যবহার করব যাতে একবার ডেটা রিড করেই রেভিনিউ সামারি এবং টপ ৫ প্রোডাক্ট আলাদা ব্রাঞ্চে হিসেব হয়ে যায়। (৪) কালেকশনে `{ created_at: 1 }` ইনডেক্স নিশ্চিত করব। রেজাল্ট ১২ সেকেন্ড থেকে নেমে ১৫০ মিলিসেকেন্ডে চলে আসবে।",
      b: "শুরুতে ৩০ দিনের ডেটার ওপর ইনডেক্সড $match বসাব, অপ্রয়োজনীয় ফিল্ড বাদ দিয়ে $unwind করব এবং $facet ব্যবহার করে এক পাসেই রেভিনিউ ও টপ ৫ প্রোডাক্ট বের করে আনব।",
      e: "Prepend an indexed $match on created_at to prune scans to the last 30 days. Strip heavy metadata prior to $unwind, and leverage $facet to fork the stream into revenue metrics and top-product rankings concurrently in a single scan.",
      code: "db.invoices.aggregate([\n  { $match: { createdAt: { $gte: last30Days } } },\n  {\n    $facet: {\n      revenueSummary: [{ $group: { _id: null, totalRev: { $sum: '$grandTotal' } } }],\n      topProducts: [\n        { $unwind: '$items' },\n        { $group: { _id: '$items.productId', soldQty: { $sum: '$items.qty' } } },\n        { $sort: { soldQty: -1 } },\n        { $limit: 5 }\n      ]\n    }\n  }\n]);"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: প্রতিটি ডিপার্টমেন্টের সর্বোচ্চ বেতনপ্রাপ্ত ৩ জন কর্মচারীর তালিকা বের করতে বলা হয়েছে। তুমি সাব-কুয়েরিতে বারবার ম্যাক্স স্যালারি কুয়েরি না করে কীভাবে পরিষ্কারভাবে এটি সমাধান করবে?",
      m: "সমাধান: SQL Window Function `DENSE_RANK()` এবং একটি CTE ব্যবহার করতে হবে। CTE-র ভেতরে প্রতিটি ডিপার্টমেন্টের কর্মচারীদের বেতনের ভিত্তিতে র‍্যাংক অ্যাসাইন করব: `DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rank`। এরপর মূল কুয়েরিতে শুধু ফিল্টার করব `WHERE rank <= 3`। এটি সিঙ্গেল পাসে সম্পূর্ণ টেবিল প্রসেস করে এবং কোনো স্লো ও জটিল সাব-কুয়েরি ছাড়া পরিষ্কারভাবে সঠিক রেজাল্ট প্রদান করে।",
      b: "সিটিই ব্লকে DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) দিয়ে র‍্যাংক তৈরি করে বাইরে WHERE rank <= 3 ফিল্টার করলেই এক কুয়েরিতে টপ ৩ জন পাওয়া যায়।",
      e: "Solve this cleanly via a CTE using DENSE_RANK() partitioned by department_id and ordered by salary DESC, then filtering WHERE rank <= 3 in the outer query without repetitive correlated subqueries.",
      code: "WITH RankedEmployees AS (\n  SELECT id, name, department_id, salary,\n         DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) as rank\n  FROM employees\n)\nSELECT * FROM RankedEmployees WHERE rank <= 3;"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: MongoDB `$lookup` ব্যবহার করে ১ লক্ষ অর্ডারের সাথে কাস্টমার ডেটা জয়েন করায় সার্ভারের RAM ক্র্যাশ করেছে। কীভাবে এটি ফিক্স করবে?",
      m: "সমস্যা: ১ লক্ষ অর্ডারের প্রতিটির জন্য અન-ইনডেক্সড কালেকশনে লুকআপ চালানোয় লাখ লাখ মেমোরি অবজেক্ট হাইড্রেট হয়েছে। ফিক্স: (১) `foreignField`-এর ওপর (টার্গেট কালেকশনের `_id` বা `userId`) অবশ্যই B-Tree ইনডেক্স থাকতে হবে, যাতে লুকআপ প্রতিবার ফুল কালেকশন স্ক্যান না করে। (২) ১ লক্ষ অর্ডার একবারে লুকআপ না করে অবশ্যই শুরুতে পেজিনেশন (`$skip` ও `$limit`) করতে হবে—যাতে মাত্র ২০ বা ৫০টি অর্ডারের জন্য লুকআপ চলে। (৩) যদি শুধু কাস্টমারের নাম দরকার হয়, তবে `$lookup`-এর ভেতরে `pipeline` ব্যবহার করে শুধু `name` প্রোজেক্ট করতে হবে, পুরো কাস্টমার অবজেক্ট নয়।",
      b: "লুকআপ ফিল্ডে ইনডেক্স নিশ্চিত করতে হবে, একবারে লক্ষ ডেটা না এনে শুরুতে পেজিনেশন ($limit 20) দিতে হবে এবং কাস্টমার কালেকশন থেকে শুধু নাম প্রোজেক্ট করে মেমোরি রক্ষা করতে হবে।",
      e: "Guarantee an index exists on the foreignField. Never join 100,000 documents at once—apply $limit and $skip before $lookup to restrict joins to the current page (e.g. 20 rows), and use pipeline sub-stages inside $lookup to project only essential fields.",
      code: "db.orders.aggregate([\n  { $match: { tenantId } },\n  { $sort: { createdAt: -1 } },\n  { $limit: 20 }, // Pagination FIRST!\n  {\n    $lookup: {\n      from: 'users',\n      localField: 'userId',\n      foreignField: '_id',\n      pipeline: [{ $project: { name: 1, phone: 1 } }],\n      as: 'customer'\n    }\n  }\n]);"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: একটি ইকমার্স সাইটে ইউজার কোন কোন দিনে কেনাকাটা করেছে তার 'Streak' বা একটানা দিনের সংখ্যা বের করতে বলা হয়েছে। তুমি কীভাবে SQL দিয়ে এটি হিসেব করবে?",
      m: "এটি ক্লাসিক 'Gaps and Islands' সমস্যা। সমাধান: (১) প্রথমে প্রতিটি অর্ডারের তারিখকে ডিস্টিংকট করি। (২) উইন্ডো ফাংশন `ROW_NUMBER() OVER (ORDER BY date)` দিয়ে প্রতিটি দিনকে একটি নম্বর দিই। (৩) তারিখ থেকে এই রো নম্বর বিয়োগ করি (`date - ROW_NUMBER() * INTERVAL '1 day'`)। মজার ব্যাপার হলো: যদি দিনগুলো একটানা থাকে, তবে বিয়োগফল সবসময় একটি ধ্রুবক তারিখ (Island Group) দেবে! (৪) এবার এই বিয়োগফল দিয়ে `GROUP BY` করে `COUNT(*)` বের করলেই টানা দিনের সংখ্যা (Streak) পাওয়া যায়।",
      b: "গ্যাপস অ্যান্ড আইল্যান্ড পদ্ধতিতে তারিখ থেকে ROW_NUMBER() বিয়োগ করলে একটানা দিনগুলোর জন্য একই গ্রুপ মান পাওয়া যায়। এরপর ওই গ্রুপ অনুযায়ী COUNT(*) করলেই ইউজারের স্ট্রিক সংখ্যা বের হয়ে আসে।",
      e: "Solve this Gaps and Islands pattern by subtracting ROW_NUMBER() days from the event date. Consecutive contiguous dates produce an identical anchor date group key, which can then be grouped and counted to determine the streak length.",
      code: "WITH RankedDates AS (\n  SELECT DISTINCT date,\n         date - (ROW_NUMBER() OVER (ORDER BY date))::int AS grp\n  FROM user_logins\n)\nSELECT COUNT(*) as streak_days, MIN(date) as start_date, MAX(date) as end_date\nFROM RankedDates GROUP BY grp ORDER BY streak_days DESC;"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: ড্যাশবোর্ডে মান্থ-অন-মান্থ (MoM) রেভিনিউ গ্রোথ পার্সেন্টেজ বের করার কুয়েরি লিখতে হবে। কীভাবে উইন্ডো ফাংশন `LAG()` দিয়ে এটি বের করবে?",
      m: "সমাধান: `LAG()` ফাংশন পূর্ববর্তী রো-র মান রিড করতে পারে। প্রথমে প্রতি মাসের মোট রেভিনিউ হিসেব করি। এরপর উইন্ডো ফাংশন ব্যবহার করি: `LAG(monthly_revenue, 1) OVER (ORDER BY month) AS prev_month_revenue`। এবার গ্রোথ ফর্মুলা প্রয়োগ করি: `((monthly_revenue - prev_month_revenue) / prev_month_revenue) * 100`। কোনো অতিরিক্ত সেলফ-জয়েন ছাড়াই এটি সিঙ্গেল কুয়েরিতে প্রতি মাসের তুলনামূলক প্রবৃদ্ধি বা পতন বের করে দেয়।",
      b: "LAG() উইন্ডো ফাংশন দিয়ে আগের মাসের রেভিনিউ আনা যায়। এরপর (বর্তমান মাস - আগের মাস) / আগের মাস * ১০০ ফর্মুলা দিয়ে মুহূর্তে মান্থ-অন-মান্থ গ্রোথ বের করা সম্ভব।",
      e: "Compute Month-over-Month (MoM) growth using the LAG() window function to fetch the preceding month's revenue without self-joins, then applying standard percentage change arithmetic.",
      code: "WITH MonthlyRevenue AS (\n  SELECT date_trunc('month', created_at) AS month, SUM(total) AS rev\n  FROM invoices GROUP BY 1\n)\nSELECT month, rev,\n       LAG(rev) OVER (ORDER BY month) as prev_rev,\n       ROUND(((rev - LAG(rev) OVER (ORDER BY month)) / LAG(rev) OVER (ORDER BY month) * 100), 2) AS mom_growth_pct\nFROM MonthlyRevenue;"
    },

    // --- REAL WORLD (5 Questions) ---
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা (Dokani SaaS): Dokani POS-এর অ্যানালিটিক্স ড্যাশবোর্ডে প্রতিদিনের মোট সেলস, মোট লাভ (Profit Margin), বাকি এবং ক্যাশ কালেকশন কীভাবে রিয়েলটাইমে জেনারেট করা হয়?",
      m: "দোকানিতে সেলস অ্যানালিটিক্স জেনারেশনের জন্য অপটিমাইজড SQL অ্যাগ্রিগেশন কুয়েরি ব্যবহার করা হয়েছে। ইনভয়েস টেবিলে `tenant_id` এবং `created_at`-এর ওপর কম্পাউন্ড ইনডেক্স থাকে। কুয়েরিতে ফিল্টারিংয়ের পর `SUM(grand_total)` দিয়ে মোট সেলস, `SUM(paid_amount)` দিয়ে ক্যাশ ও ডিজিটাল কালেকশন, `SUM(due_amount)` দিয়ে বকেয়া এবং আইটেম টেবিলের সাথে জয়েন করে `SUM((selling_price - cost_price) * quantity)` দিয়ে নিট মুনাফা (Profit Margin) বের করা হয়। পুরো হিসাবটি মাত্র ৫ মিলিসেকেন্ডে সম্পন্ন হয়ে ড্যাশবোর্ডে লাইভ চার্ট প্রদর্শন করে।",
      b: "দোকানি ড্যাশবোর্ডে কম্পাউন্ড ইনডেক্সযুক্ত ইনভয়েস ও আইটেম টেবিল থেকে SUM(grand_total), SUM(paid_amount), SUM(due_amount) এবং কস্ট প্রাইস বিয়োগ করে নিট প্রফিট এক কুয়েরিতে মাত্র ৫ মিলি-সেকেন্ডে ক্যালকুলেট করা হয়।",
      e: "In Dokani POS, the merchant analytics dashboard executes a single composite-indexed aggregation query computing gross sales, paid cash, outstanding customer receivables, and net profit margins ((selling_price - cost_price) * qty) in sub-5ms latency.",
      code: "SELECT \n  COUNT(*) AS total_invoices,\n  SUM(grand_total) AS gross_sales,\n  SUM(paid_amount) AS cash_collected,\n  SUM(due_amount) AS outstanding_dues\nFROM invoices \nWHERE tenant_id = $1 AND created_at >= CURRENT_DATE;"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: ই-কমার্স সিস্টেমে কাস্টমারদের 'RFM Analysis' (Recency, Frequency, Monetary) বের করতে কীভাবে SQL Aggregation ব্যবহার করবে?",
      m: "RFM অ্যানালিসিস কাস্টমারদের লয়্যালটি সেগমেন্টেশন করতে ব্যবহৃত হয়: (১) `Recency`: কাস্টমারের শেষ অর্ডারের পর কয় দিন অতিবাহিত হয়েছে (`CURRENT_DATE - MAX(created_at)`), (২) `Frequency`: কাস্টমার মোট কতগুলো সফল অর্ডার করেছে (`COUNT(id)`), (৩) `Monetary`: কাস্টমার মোট কত টাকার পণ্য কিনেছে (`SUM(grand_total)`। এই ৩টি মান দিয়ে `NTILE(5) OVER (...)` ব্যবহার করে কাস্টমারদের ১ থেকে ৫ স্কোরে ভাগ করা হয় এবং 'Champions', 'At Risk', ও 'Lost Customers' ক্যাটাগরিতে স্বয়ংক্রিয়ভাবে আলাদা করে মার্কেটিং অটোমেশন চালানো হয়।",
      b: "RFM অ্যানালিসিসে MAX(তারিখ), COUNT(অর্ডার) এবং SUM(টাকা) বের করে NTILE(5) দিয়ে কাস্টমারদের ১ থেকে ৫ স্কোরে ভাগ করা হয়। এটি হাই-ভ্যালু ও ইনঅ্যাক্টিভ কাস্টমার শনাক্ত করতে ব্যবহৃত হয়।",
      e: "Execute RFM (Recency, Frequency, Monetary) segmentation using SQL aggregations: Recency (days since MAX(created_at)), Frequency (COUNT(id)), and Monetary (SUM(total)). Apply NTILE(5) window functions to assign quintile scores (1-5) for algorithmic customer targeting.",
      code: "SELECT user_id,\n       DATE_PART('day', NOW() - MAX(created_at)) AS recency_days,\n       COUNT(id) AS frequency,\n       SUM(grand_total) AS monetary,\n       NTILE(5) OVER (ORDER BY SUM(grand_total) DESC) as monetary_score\nFROM orders GROUP BY user_id;"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: Dokani-তে হাজার হাজার দোকানের ইনভেন্টরি স্টক হিস্ট্রি থেকে 'Fast-Moving vs Dead Stock' প্রোডাক্ট কীভাবে আইডেন্টিফাই করা হয়?",
      m: "দোকানিতে ইনভেন্টরি অপটিমাইজেশনের জন্য একটি অ্যানালিটিক্স পাইপলাইন চলে: গত ৯০ দিনের সব সেলস আইটেম অ্যাগ্রিগেট করে প্রতি প্রোডাক্টের টার্নওভার রেট বের করা হয়। যেসব প্রোডাক্টের স্টক ৫০-এর বেশি কিন্তু গত ৬০ দিনে ১টিও বিক্রি হয়নি, সেগুলোকে `DEAD_STOCK` হিসেবে চিহ্নিত করে মার্চেন্টকে নোটিফিকেশন দেওয়া হয় ডিসকাউন্টে ক্লিয়ার করার জন্য। আর যেসব প্রোডাক্টের স্টক শেষ হতে মাত্র ৩ দিনের সেলস রেট বাকি, সেগুলোকে `FAST_MOVING_REORDER` ফ্ল্যাগ দেওয়া হয়।",
      b: "গত ৯০ দিনের বিক্রি হিসেব করে যে পণ্যের স্টক থাকা সত্ত্বেও কোনো বিক্রি নেই তাকে ডেড স্টক এবং যেগুলোর বিক্রি দ্রুত হচ্ছে তাকে ফাস্ট মুভিং হিসেবে শনাক্ত করে মার্চেন্টকে রিস্টক করার অ্যালার্ট দেওয়া হয়।",
      e: "In Dokani, inventory turnover analysis computes daily burn rates across a 90-day rolling window. Products retaining high stock with zero sales in 60 days are flagged as Dead Stock, while high-velocity items with less than 3 days of stock trigger automated supplier reorder alerts.",
      tip: "বলো: 'Fast-moving vs Dead-stock analysis optimizes working capital by comparing sales velocity with holding inventory.'"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: বিলিয়ন স্কেল ডেটায় রিয়েল-টাইম ড্যাশবোর্ডের জন্য 'Pre-aggregation Rollups' আর্কিটেকচার কীভাবে ডিজাইন করবে?",
      m: "যখন মূল কালেকশনে প্রতিদিন কোটি কোটি ইভেন্ট আসে, তখন রিয়েলটাইমে `SUM` বা `GROUP BY` চালানো অসম্ভব। আর্কিটেকচারাল সলিউশন: আমরা একটি `DailyAggregates` বা `HourlyRollups` টেবিল তৈরি করি। Redis বা Kafka দিয়ে প্রতি ঘণ্টার ইভেন্টগুলো মাইক্রো-ব্যাচে অ্যাগ্রিগেট করে ওই রোলআপ টেবিলে ইনসার্ট/আপসর্ট (`ON CONFLICT DO UPDATE SET total = total + EXCLUDED.total`) করা হয়। ড্যাশবোর্ড যখন ৩ মাসের সেলস হিসেব করে, সে ১০০ কোটি মূল রেকর্ড স্ক্যান না করে মাত্র ৯০টি প্রাক-গণনাকৃত রোলআপ রো রিড করে—ফলে রেসপন্স টাইম হয় মাত্র ২ মিলিসেকেন্ড!",
      b: "কোটি কোটি রো-র ক্ষেত্রে রিয়েলটাইমে গ্রুপিং না করে প্রতি ঘণ্টার ডেটা প্রি-অ্যাগ্রিগেট করে রোলআপ টেবিলে আপসর্ট করে রাখা হয়। ড্যাশবোর্ড তখন মূল টেবিল না ঘেঁটে সরাসরি রোলআপ টেবিল থেকে মিলি-সেকেন্ডে রিপোর্ট দেখায়।",
      e: "Under massive event ingestion, replace on-the-fly aggregations with pre-aggregated rollups maintained via background stream processors (Kafka/BullMQ). Storing hourly rollups with idempotent upserts allows 90-day dashboard reporting to query 90 rows instead of billions.",
      code: "INSERT INTO hourly_metrics (store_id, hour_bucket, total_sales, order_count)\nVALUES ($1, $2, $3, $4)\nON CONFLICT (store_id, hour_bucket)\nDO UPDATE SET \n  total_sales = hourly_metrics.total_sales + EXCLUDED.total_sales,\n  order_count = hourly_metrics.order_count + EXCLUDED.order_count;"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: PostgreSQL-এ `CUBE` এবং `ROLLUP` ক্লজ ব্যবহার করে মাল্টি-লেভেল সাব-টোটাল ও গ্র্যান্ড টোটাল রিপোর্ট কীভাবে তৈরি করবে?",
      m: "মার্চেন্টদের রিপোর্টিংয়ে প্রায়ই প্রয়োজন হয়: ডিপার্টমেন্টভিত্তিক মোট খরচ, সাব-ডিপার্টমেন্টের সাব-টোটাল এবং সবার শেষে পুরো কোম্পানির গ্র্যান্ড টোটাল। সাধারণ গ্রুপ বাই দিয়ে এটি করতে ৩টি আলাদা কুয়েরি এবং ইউনিয়ন লাগত। PostgreSQL-এর `GROUP BY ROLLUP (region, branch, department)` ক্লজ ব্যবহার করলে ডেটাবেজ এক কুয়েরিতেই ক্রমানুসারে প্রতিটি লেভেলের সাব-টোটাল এবং সবার শেষে সম্পূর্ণ ডেটাসেটের গ্র্যান্ড টোটাল ক্যালকুলেট করে চমৎকার হায়ারার্কিকাল রিপোর্ট প্রদান করে।",
      b: "GROUP BY ROLLUP এক কুয়েরিতেই বিভাগওয়ারি সাব-টোটাল এবং পুরো কোম্পানির গ্র্যান্ড টোটাল তৈরি করে দেয়। এটি ফিনান্সিয়াল অডিট ও এক্সিকিউটিভ রিপোর্টের জন্য অত্যন্ত উপযোগী।",
      e: "The ROLLUP operator generates hierarchical grouping sets with multi-level sub-totals and an overarching grand total in a single SQL query pass, eliminating cumbersome UNION ALL queries for financial auditing dashboards.",
      code: "SELECT region, branch, SUM(sales) AS total_sales\nFROM retail_sales\nGROUP BY ROLLUP (region, branch);"
    }
  ]
};
