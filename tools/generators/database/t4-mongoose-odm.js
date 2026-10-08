// Topic 4: Mongoose ODM & Schema Lifecycle (25 Questions: 5 lvl1, 5 lvl2, 5 lvl3, 5 situation, 5 realworld)
module.exports = {
  id: "mongoose-odm-lifecycle",
  name: "Mongoose ODM & Schema Lifecycle",
  desc: "Schemas, Models, Document Middleware (pre/post save), Virtuals, Population, Custom Validators, Discriminators",
  items: [
    // --- LEVEL 1 (5 Questions) ---
    {
      lvl: "lvl1",
      q: "Mongoose ODM কী এবং এটি প্লেইন MongoDB ড্রাইভারের চেয়ে কেন বেশি ব্যবহৃত হয়?",
      m: "Mongoose হলো Node.js এবং MongoDB-এর জন্য একটি Object Data Modeling (ODM) লাইব্রেরি। প্লেইন মঙ্গো ড্রাইভার স্কিমাহীন (Schema-less) হওয়ায় যেকোনো ডেটা অগোছালোভাবে ইনসার্ট করা যায়। Mongoose অ্যাপ্লিকেশান লেভেলে স্ট্রিক্ট Schema, ডেটা ভ্যালিডেশন, ডিফল্ট ভ্যালু, টাইপ কাস্টিং এবং বিজনেস লজিক এনফোর্স করে। এর ফলে প্রোডাকশন অ্যাপ্লিকেশনে ডেটা করাপশন রোধ হয় এবং কোড অনেক ক্লিন ও প্রেডিক্টেবল থাকে।",
      b: "মঙ্গুজ হলো নোড.জেএস এর জন্য একটি ওডিএম লাইব্রেরি যা মঙ্গোডিবির সাথে কাজ করার সময় ডেটা মডেলিং ও স্কিমা ভ্যালিডেশনের নিশ্চয়তা দেয়। সাধারণ ড্রাইভারের বিপরীতে মঙ্গুজ কঠোর ডেটা টাইপ, মিডলওয়্যার হুক এবং রিলেশনশিপ ব্যবস্থাপনার সুবিধা প্রদান করে।",
      e: "Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. Unlike the raw, schema-less MongoDB driver, Mongoose provides application-level strict schema validation, type casting, query building, business logic middleware, and lifecycle hooks.",
      tip: "বলো: 'Mongoose provides application-level schemas and validation over schema-less MongoDB documents.'"
    },
    {
      lvl: "lvl1",
      q: "Mongoose-এ Schema এবং Model-এর মধ্যে মূল পার্থক্য কী?",
      m: "Schema হলো ডকুমেন্টের একটি ব্লুপ্রিন্ট বা নকশা—যা সংজ্ঞায়িত করে ডকুমেন্টে কী কী ফিল্ড থাকবে, তাদের ডেটা টাইপ কী হবে (String, Number, Date), কোন ফিল্ড রিকোয়ার্ড এবং কী কী ভ্যালিডেশন রুলস থাকবে। আর Model হলো সেই স্কিমার ওপর ভিত্তি করে তৈরি হওয়া একটি জাভাস্ক্রিপ্ট ক্লাস কনস্ট্রাক্টর, যা সরাসরি মঙ্গোডিবি কালেকশনের সাথে যুক্ত হয়ে ডেটাবেজে কুয়েরি (CRUD যেমন `find`, `create`, `updateOne`) চালানোর মেথড সরবরাহ করে।",
      b: "স্কিমা হলো ডকুমেন্টের গঠন ও ডেটা টাইপের নকশা, আর মডেল হলো সেই স্কিমা থেকে তৈরি ক্লাস যা ডাটাবেজ কালেকশনের সাথে সরাসরি যোগাযোগ করে কুয়েরি পরিচালনা করে।",
      e: "A Schema defines the structure, shape, field types, and validation rules of documents within a collection. A Model is a compiled constructor derived from the schema that provides the direct interface for database queries and CRUD operations.",
      code: "const userSchema = new mongoose.Schema({ name: String });\nconst User = mongoose.model('User', userSchema);"
    },
    {
      lvl: "lvl1",
      q: "Mongoose-এ Custom Validator কীভাবে তৈরি করা যায়?",
      m: "Mongoose স্কিমার যেকোনো ফিল্ডে `validate` প্রোপার্টি দিয়ে কাস্টম ভ্যালিডেশন ডিফাইন করা যায়। এতে একটি `validator` ফাংশন থাকে যা ট্রু অথবা ফলস রিটার্ন করে, এবং একটি কাস্টম এরর `message` থাকে। সিনক্রোনাস বা অ্যাসিনক্রোনাস (যেমন ইউনিকনেস চেক করা) উভয় ধরনের ভ্যালিডেশনই হ্যান্ডেল করা সম্ভব।",
      b: "মঙ্গুজ স্কিমা ফিল্ডে validate অবজেক্ট যুক্ত করে কাস্টম ভ্যালিডেশন তৈরি করা হয়। ভ্যালিডেটর ফাংশন শর্ত পূরণ করলে ট্রু এবং ব্যর্থ হলে ফলস রিটার্ন করে এরর মেসেজ পাঠায়।",
      e: "Custom validators are defined on schema fields using the validate property containing a validator function (sync or async returning a boolean) and an informative error message string.",
      code: "const productSchema = new mongoose.Schema({\n  sku: {\n    type: String,\n    validate: {\n      validator: (v: string) => /^[A-Z]{3}-\\d{4}$/.test(v),\n      message: props => `${props.value} is not a valid SKU format!`\n    }\n  }\n});"
    },
    {
      lvl: "lvl1",
      q: "Mongoose-এ `populate()` মেথড কীভাবে কাজ করে এবং এর বিহাইন্ড দ্য সিন মেকানিজম কী?",
      m: "`populate()` হলো রেফারেন্স করা অন্যান্য কালেকশনের ডকুমেন্টের ডেটা স্বয়ংক্রিয়ভাবে এনে মূল ডকুমেন্টে ইনজেক্ট করার উপায়। স্কিমাতে `ref: 'ModelName'` দিয়ে অবজেক্ট আইডি রেফারেন্স করা থাকলে `populate('userId')` কল করলে মঙ্গুজ ইন্টারনালি মঙ্গোডিবির সেকেন্ডারি কুয়েরি চালায় (বা ইন্টারনাল `$lookup` চালায়) এবং সংশ্লিষ্ট আইডিগুলোর ডকুমেন্ট ফেচ করে রিয়েল অবজেক্ট দিয়ে আইডিগুলোকে রিপ্লেস করে দেয়।",
      b: "পপুলেট মেথড রেফারেন্সকৃত অন্য কালেকশন থেকে অবজেক্ট আইডি ধরে সংশ্লিষ্ট পুরো ডকুমেন্ট এনে মূল ডকুমেন্টের ভেতর সাজিয়ে দেয়। এটি ইন্টারনালি দ্বিতীয় কুয়েরি চালিয়ে ডেটা যুক্ত করে।",
      e: "Mongoose populate() automatically replaces specified document path ObjectIds with corresponding documents from foreign collections. Under the hood, it performs secondary batch queries (or $lookup operations) to resolve referenced documents.",
      code: "const order = await Order.findById(id).populate('customer', 'name email');"
    },
    {
      lvl: "lvl1",
      q: "Mongoose-এ `Virtuals` কী এবং এটি ডাটাবেজ পারফরম্যান্সে কীভাবে ভূমিকা রাখে?",
      m: "Virtuals হলো এমন কিছু ভার্চুয়াল প্রোপার্টি যা আপনি স্কিমাতে ডিফাইন করতে পারেন কিন্তু তা মঙ্গোডিবি ডেটাবেজে সেভ হয় না! অর্থাৎ এটি মেমোরিতে অন-দ্য-ফ্লাই ক্যালকুলেট হয়। উদাহরণস্বরূপ, যদি ডকুমেন্টে `firstName` এবং `lastName` সেভ থাকে, তবে `fullName` ভার্চুয়াল প্রোপার্টি দিয়ে অন-দ্য-ফ্লাই ফুলনেম রিটার্ন করা যায়। ডাটাবেজে স্টোরেজ নষ্ট হয় না এবং ডেটা রিডান্ড্যান্সি দূর হয়।",
      b: "ভার্চুয়াল হলো এমন ফিল্ড যা মেমোরিতে রানটাইমে হিসেব করা হয় কিন্তু ডাটাবেজ স্টোরেজে স্থায়ীভাবে সেভ হয় না। এটি অপ্রয়োজনীয় স্টোরেজ খরচ ও রিডান্ড্যান্সি কমায়।",
      e: "Virtuals are document properties that can get and set values but do not get persisted to MongoDB storage. They compute derived values in-memory (e.g., fullName from firstName and lastName), saving disk space and eliminating sync drift.",
      code: "userSchema.virtual('fullName').get(function() {\n  return `${this.firstName} ${this.lastName}`;\n});"
    },

    // --- LEVEL 2 (5 Questions) ---
    {
      lvl: "lvl2",
      q: "Mongoose Document Middleware (pre/post save hooks) কীভাবে কাজ করে এবং পাসওয়ার্ড হ্যাশিংয়ে কীভাবে ব্যবহৃত হয়?",
      m: "Mongoose-এ `pre` হুক কোনো অ্যাকশন (যেমন `save`, `validate`, `remove`) ঘটার ঠিক আগে এক্সিকিউট হয় এবং `post` হুক অ্যাকশন শেষ হওয়ার পর এক্সিকিউট হয়। পাসওয়ার্ড হ্যাশিংয়ে `pre('save')` হুকে চেক করা হয় `this.isModified('password')` ট্রু কি না। যদি ট্রু হয় তবে bcrypt দিয়ে পাসওয়ার্ড হ্যাশ করে `this.password`-এ বসানো হয়। পাসওয়ার্ড পরিবর্তিত না হলে অপ্রয়োজনীয় রি-হ্যাশিং এড়ানো হয়।",
      b: "প্রি এবং পোস্ট হুক হলো লাইফসাইকেল মিডলওয়্যার। ইউজার সেভ হওয়ার আগে pre('save') হুকে পাসওয়ার্ড পরিবর্তিত হয়েছে কিনা তা চেক করে bcrypt দিয়ে হ্যাশ করে নিরাপদে ডাটাবেজে পাঠানো হয়।",
      e: "Document middleware hooks (pre/post) execute before or after target lifecycle operations like save. In password hashing, pre('save') inspects this.isModified('password') and runs bcrypt.hash() prior to document persistence.",
      code: "userSchema.pre('save', async function(next) {\n  if (!this.isModified('password')) return next();\n  this.password = await bcrypt.hash(this.password, 12);\n  next();\n});"
    },
    {
      lvl: "lvl2",
      q: "Mongoose-এ `lean()` মেথড কী এবং রিড-অনলি কুয়েরিতে এটি পারফরম্যান্স কতটা বৃদ্ধি করে?",
      m: "স্বাভাবিকভাবে Mongoose কুয়েরি এক্সিকিউট করলে এটি প্রতিটি ডকুমেন্টের জন্য একটি ফুল-ব্লাডেড Mongoose Document Instance তৈরি করে (যার মধ্যে ইন্টারনাল স্টেট, সেভ মেথড, গেটার্স/সেটার্স, ট্র্যাকিং মেকানিজম থাকে)। এতে প্রচুর RAM ও CPU খরচ হয়। `.lean()` যুক্ত করলে Mongoose কোনো মেথড ছাড়া প্লেইন জাভাস্ক্রিপ্ট অবজেক্ট (POJO) রিটার্ন করে। এতে মেমোরি খরচ ৯০% পর্যন্ত কমে যায় এবং কুয়েরি ৫-১০ গুণ দ্রুত এক্সিকিউট হয়। রিড-অনলি এপিআই বা ড্যাশবোর্ড রিপোর্টিংয়ে `lean()` বাধ্যতামূলক।",
      b: "লিন মেথড মঙ্গুজ ডকুমেন্টের ভারী ইন্টারনাল ইনস্ট্যান্স বাদ দিয়ে সাধারণ প্লেইন জাভাস্ক্রিপ্ট অবজেক্ট রিটার্ন করে। ফলে মেমোরি কনজাম্পশন বিশাল পরিমাণে কমে এবং কুয়েরি অত্যন্ত দ্রুত সম্পন্ন হয়।",
      e: "By default, Mongoose wraps query results in heavy Mongoose Document instances with getters, setters, and internal tracking. Invoking .lean() bypasses hydration and returns plain JavaScript objects (POJOs), reducing memory footprints up to 90% and speeding queries 5x-10x for read-only flows.",
      code: "const products = await Product.find({ isActive: true }).lean();"
    },
    {
      lvl: "lvl2",
      q: "Mongoose-এ `findOneAndUpdate` বনাম `save()`-এর মধ্যে ভ্যালিডেশন এবং মিডলওয়্যার আচরণের পার্থক্য কী?",
      m: "(১) `doc.save()` একটি সম্পূর্ণ Mongoose ডকুমেন্ট ইনস্ট্যান্সের ওপর চলে, ফলে স্কিমার সব ডিফল্ট ভ্যালিডেশন এবং `pre('save')` হুক স্বয়ংক্রিয়ভাবে ফায়ার করে। (২) `Model.findOneAndUpdate()` সরাসরি ডেটাবেজে আপডেট কমান্ড পাঠায় এবং বাই-ডিফল্ট স্কিমা ভ্যালিডেশন চালায় না ও `pre('save')` হুক ফায়ার করে না! যদি ভ্যালিডেশন চালাতে চান তবে অপশনে `{ runValidators: true }` সেট করতে হবে। পাসওয়ার্ড হ্যাশিংয়ের মতো ক্রিটিকাল লজিকে তাই `save()` ব্যবহার করা নিরাপদ।",
      b: "save() মেথড সম্পূর্ণ স্কিমা ভ্যালিডেশন এবং pre-save হুক চালায়। কিন্তু findOneAndUpdate বাই-ডিফল্ট ভ্যালিডেশন স্কিপ করে এবং ডিরেক্ট ডাটাবেজে কমান্ড পাঠায় যদি না runValidators: true উল্লেখ করা হয়।",
      e: "doc.save() executes full schema validation and triggers pre('save') hooks. In contrast, findOneAndUpdate() bypasses save hooks and bypasses validation by default unless explicit { runValidators: true } options are passed.",
      tip: "ইন্টারভিউতে বলো: 'findOneAndUpdate skips pre-save hooks; use runValidators: true or doc.save() when mutating sensitive fields.'"
    },
    {
      lvl: "lvl2",
      q: "Mongoose-এ Discriminators কী এবং সিঙ্গেল টেবিল ইনহেরিটেন্স (STI) কীভাবে ইমপ্লিমেন্ট করে?",
      m: "Discriminators হলো একই মঙ্গোডিবি কালেকশনে বিভিন্ন ধরনের পলিমরফিক ডকুমেন্ট সংরক্ষণের একটি স্কিমা ইনহেরিটেন্স মেকানিজম। উদাহরণস্বরূপ, একটি `Event` কালেকশনে `ClickEvent`, `PurchaseEvent` এবং `PageviewEvent` থাকবে। এদের বেস ফিল্ডগুলো কমন থাকবে (যেমন timestamp, userId), কিন্তু প্রতিটি স্পেসিফিক ইভেন্টে অতিরিক্ত ফিল্ড থাকবে। Mongoose একটি ইন্টারনাল `__t` (discriminator key) ফিল্ড তৈরি করে ডকুমেন্ট টাইপ ট্র্যাক করে।",
      b: "ডিসক্রিমিনেটর হলো মঙ্গুজের পলিমরফিক স্কিমা ইনহেরিটেন্স ফিচার, যার মাধ্যমে একই কালেকশনে বেস স্কিমার ওপর ভিত্তি করে ভিন্ন ভিন্ন চাইল্ড মডেল ও কাস্টম ফিল্ড সংরক্ষণ করা যায়।",
      e: "Mongoose Discriminators enable schema inheritance within a single underlying MongoDB collection. They share common base schema fields while specializing child models, tracking the type discriminator automatically via an internal __t field.",
      code: "const options = { discriminatorKey: 'kind' };\nconst eventSchema = new mongoose.Schema({ time: Date }, options);\nconst Event = mongoose.model('Event', eventSchema);\nconst Click = Event.discriminator('Click', new mongoose.Schema({ elementId: String }));"
    },
    {
      lvl: "lvl2",
      q: "Mongoose-এ Static Methods এবং Instance Methods-এর মধ্যে পার্থক্য কী?",
      m: "(১) `Instance Methods`: এগুলো স্কিমার `methods` অবজেক্টে ডিফাইন করা হয় এবং কোনো নির্দিষ্ট ডকুমেন্ট ইনস্ট্যান্সের ওপর কাজ করে (যেখানে `this` রেফার করে ওই নির্দিষ্ট ডকুমেন্টকে)। যেমন: `user.comparePassword('1234')` বা `order.calculateTax()`। (২) `Static Methods`: এগুলো স্কিমার `statics` অবজেক্টে ডিফাইন করা হয় এবং পুরো Model ক্লাসের ওপর কাজ করে (যেখানে `this` রেফার করে পুরো মডেল ক্লাসকে)। যেমন: `User.findByEmail('test@dokani.com')` বা `Order.getMonthlyRevenue()`।",
      b: "ইনস্ট্যান্স মেথড নির্দিষ্ট একটি ডকুমেন্টের ওপর কাজ করে (this = ডকুমেন্ট), যেমন পাসওয়ার্ড তুলনা করা। স্ট্যাটিক মেথড পুরো মডেল ক্লাসের ওপর কাজ করে (this = মডেল), যেমন কাস্টম ফাইন্ডার কুয়েরি।",
      e: "Instance methods operate on individual document instances via schema.methods (where this is the document). Static methods operate on the Model class directly via schema.statics (where this is the Model constructor) for custom query aggregations.",
      code: "userSchema.methods.comparePassword = function(pwd) { return bcrypt.compare(pwd, this.password); };\nuserSchema.statics.findByEmail = function(email) { return this.findOne({ email }); };"
    },

    // --- LEVEL 3 (5 Questions) ---
    {
      lvl: "lvl3",
      q: "Mongoose-এ Deep Population (Nested Populate) কীভাবে ডেটাবেজ পারফরম্যান্স নষ্ট করে এবং এর বিকল্প সমাধান কী?",
      m: "যখন আপনি নেস্টেড পপুলেট করেন (যেমন `Order -> populate('customer') -> populate('addresses') -> populate('city')`), Mongoose ইন্টারনালি একের পর এক ৩-৪টি পৃথক ডেটাবেজ কুয়েরি চালায় (N+1 query waterfall problem)। উচ্চ ট্রাফিকে এটি নেটওয়ার্ক ওভারহেড ও ডেটাবেজ ল্যাটেন্সি বহুগুণ বাড়িয়ে সার্ভার ক্র্যাশ করায়। বিকল্প সমাধান: (১) মঙ্গোডিবির নেটিভ `$lookup` পাইপলাইন ব্যবহার করা যাতে সিঙ্গেল ডেটাবেজ রাউন্ড-ট্রিপে ডেটা আসে, অথবা (২) স্কিমা রি-ডিজাইন করে ফ্রিকোয়েন্টলি ব্যবহৃত রিলেটেড ডেটা এমবেড (Denormalize) করে রাখা।",
      b: "ডিপ পপুলেশন একাধিক ধারাবাহিক কুয়েরি চালিয়ে ডেটাবেজে অতিরিক্ত লেটেন্সি তৈরি করে এবং N+1 কুয়েরি সমস্যার জন্ম দেয়। এটি সমাধানের জন্য মঙ্গোডিবি অ্যাগ্রিগেশন পাইপলাইনের $lookup অথবা ডিনরমালাইজেশন ব্যবহার করা উচিত।",
      e: "Deep nested population causes sequential multi-hop query waterfalls (N+1 problem) on the database server, drastically increasing latency. The scalable alternatives are utilizing MongoDB native $lookup aggregation stages or denormalizing frequently accessed nested fields directly.",
      code: "// Bad waterfall:\nOrder.find().populate({ path: 'customer', populate: { path: 'tier' } });\n// High performance alternative: Native Aggregate $lookup"
    },
    {
      lvl: "lvl3",
      q: "Mongoose-এ `strictQuery` এবং `strict` মোড কী এবং ডাটাবেজ সিকিউরিটিতে এটি কীভাবে গুরুত্বপূর্ণ?",
      m: "`strict: true` (ডিফল্ট) নিশ্চিত করে যে স্কিমায় ডিফাইন করা নেই এমন কোনো ফিল্ড যদি কেউ ইনসার্ট করার চেষ্টা করে, Mongoose তা ফিল্টার আউট করে বাদ দিয়ে দেবে—ফলে ম্যালিশিয়াস ডেটাবেজ ফিল্ড ইনজেকশন ঠেকানো যায়। আর Mongoose v7+ এ `strictQuery: true` নিশ্চিত করে যে কুয়েরি ফিল্টারেও যদি কোনো আননোন ফিল্ড পাস করা হয়, তা কুয়েরিতে পাঠানো হবে না। এটি NoSQL ইনজেকশন প্রতিরোধে এবং ডেটাবেজ কনসিস্টেন্সি রক্ষায় গুরুত্বপূর্ণ।",
      b: "স্ট্রিক্ট মোড নিশ্চিত করে স্কিমায় অননুমোদিত কোনো বহিরাগত ফিল্ড যেন ডেটাবেজে প্রবেশ করতে না পারে। আর strictQuery কুয়েরি ফিল্টারের ক্ষেত্রেও একই নিরাপত্তা নিশ্চিত করে NoSQL ইনজেকশন প্রতিরোধ করে।",
      e: "strict: true strips any document fields that are not explicitly declared in the schema prior to saving. strictQuery: true ensures query filters strip undeclared fields, defending against accidental schema pollution and certain NoSQL injection variations.",
      code: "mongoose.set('strictQuery', true);\nconst schema = new mongoose.Schema({ name: String }, { strict: true });"
    },
    {
      lvl: "lvl3",
      q: "Mongoose-এ Optimistic Concurrency Control (OCC) এবং `__v` (versionKey) কীভাবে কনকারেন্ট ডেটা ওভাররাইট রোধ করে?",
      m: "Mongoose-এর প্রতিটি ডকুমেন্টে ডিফল্টভাবে `__v` নামে একটি ইন্টিজার ফিল্ড থাকে যা ভার্সন কি। যখন আপনি অপটিমিস্টিক কনকারেন্সি প্লাগইন বা `{ optimisticConcurrency: true }` চালু করেন, তখন কোনো ডকুমেন্ট সেভ করার সময় Mongoose একটি শর্ত দেয়: `UPDATE WHERE _id = doc._id AND __v = doc.__v`। যদি দুইজন ইউজার একই সাথে ডকুমেন্ট রিড করে এবং একজন আগে আপডেট করে ফেলে (যাতে `__v` ১ বেড়ে যায়), তবে দ্বিতীয় ইউজারের সেভ কল `VersionError` দিয়ে ফেইল করবে—ফলে কেউ অজান্তে অন্যের আপডেট করা ডেটা ওভাররাইট করে দিতে পারবে না।",
      b: "ভার্সন কি (__v) এর মাধ্যমে অপটিমিস্টিক কনকারেন্সি কন্ট্রোল কার্যকর করা হয়। দুইজন ইউজার একই সাথে ডাটা এডিট করলে যার রিকোয়েস্ট পরে আসে সে VersionError এরর পায়, যার ফলে ডেটা ওভাররাইট হওয়া রোধ হয়।",
      e: "Mongoose uses the __v versionKey for Optimistic Concurrency Control (OCC). With optimisticConcurrency: true, update queries include WHERE __v = currentVersion. If another process modified the document concurrently, the version mismatches and throws a VersionError, preventing dirty overwrites.",
      code: "const schema = new mongoose.Schema({ stock: Number }, { optimisticConcurrency: true });"
    },
    {
      lvl: "lvl3",
      q: "Mongoose Connection Events (`connected`, `error`, `disconnected`) এবং Reconnect স্ট্র্যাটেজি কীভাবে প্রডাকশনে হ্যান্ডেল করবে?",
      m: "প্রোডাকশন ডেটাবেজ কানেকশন যেন সাময়িক নেটওয়ার্ক গ্লিচ বা ক্লাউড ড্রপআউটে পুরো সার্ভার ক্র্যাশ না করায়, সেজন্য `mongoose.connection` ইভেন্ট লিসেনার সেট করতে হয়। Mongoose ডিফল্টভাবে অটো-রিকানেক্ট করে, কিন্তু `serverSelectionTimeoutMS` (যেমন 5000ms), `maxPoolSize` (যেমন 50), এবং `socketTimeoutMS` কনফিগার করতে হবে। যদি `disconnected` ইভেন্ট ফায়ার হয়, তবে ব্যাকঅফ অ্যালগরিদমে রিকানেকশন লগ করতে হবে এবং এরর ট্র্যাকিং প্ল্যাটফর্মে (Sentry) অ্যালার্ট পাঠাতে হবে।",
      b: "প্রোডাকশনে মঙ্গুজের কানেকশন ইভেন্টগুলো মনিটর করা জরুরি। connected, error এবং disconnected ইভেন্টে সেন্ট্রি অ্যালার্ট সেট করা উচিত এবং অটো-রিকানেকশনের জন্য টাইমআউট ও কানেকশন পুল প্রপার্টি ঠিক রাখা প্রয়োজন।",
      e: "Production applications must listen to mongoose.connection events: connected, error, and disconnected. Configure socketTimeoutMS, serverSelectionTimeoutMS, and maxPoolSize while integrating telemetry to monitor database dropouts and trigger healthcheck alerts.",
      code: "mongoose.connection.on('disconnected', () => console.warn('MongoDB disconnected! Retrying...'));\nmongoose.connection.on('error', (err) => logger.error('MongoDB error:', err));"
    },
    {
      lvl: "lvl3",
      q: "Mongoose Schema-তে Sharding Support ও Shard Key স্পেসিফিকেশন কীভাবে কনফিগার করা হয়?",
      m: "MongoDB ক্লাস্টার যখন শার্ডেড হয়, তখন Mongoose স্কিমায় `shardKey` অপশন উল্লেখ করতে হয় (যেমন `{ shardKey: { tenantId: 1, _id: 1 } }`)। এর উদ্দেশ্য হলো: Mongoose যখন কোনো ডকুমেন্টে `save()` বা `update()` চালাবে, তখন সে নিশ্চিত করবে যে শার্ড কি ফিল্ডটি কুয়েরি টার্গেটে উপস্থিত আছে। অন্যথায় মঙ্গোডিবি ক্লাস্টারকে সব শার্ডে ব্রডকাস্ট কুয়েরি পাঠাতে হবে যা ক্লাস্টারের পারফরম্যান্স ধ্বংস করে দেয়।",
      b: "শার্ডেড ক্লাস্টারে মঙ্গুজ স্কিমার অপশনে shardKey ডিফাইন করতে হয় যাতে আপডেট এবং সেভ অপারেশনে সঠিক শার্ড টার্গেট করা যায় এবং একাধিক সার্ভারে অপ্রয়োজনীয় ব্রডকাস্ট কুয়েরি এড়ানো যায়।",
      e: "In horizontally sharded MongoDB clusters, Mongoose schemas must define shardKey options (e.g. shardKey: { orgId: 1 }). This guarantees that update and delete queries route directly to the specific shard rather than broadcasting across the entire cluster.",
      code: "const tenantSchema = new mongoose.Schema({\n  orgId: String,\n  name: String\n}, { shardKey: { orgId: 1 } });"
    },

    // --- SITUATION BASED (5 Questions) ---
    {
      lvl: "situation",
      q: "পরিস্থিতি: ইউজারের কার্ট আপডেট করার সময় `Cart.findOneAndUpdate()` কল করায় স্কিমার `min: [1, 'Quantity must be at least 1']` কাজ করছে না এবং নেগেটিভ ভ্যালু সেভ হয়ে যাচ্ছে! কীভাবে সমাধান করবে?",
      m: "সমস্যাটি হয়েছে কারণ `findOneAndUpdate` বাই-ডিফল্ট স্কিমা ভ্যালিডেশন স্কিপ করে। সমাধান: আপডেটের ৩য় প্যারামিটারে `{ runValidators: true }` পাস করতে হবে। একই সাথে লজিক্যাল লেভেলে `$inc` দিয়ে অ্যাটমিক আপডেট করার সময় শর্ত দেওয়া উচিত যাতে কোয়ান্টিটি কখনোই জিরোর নিচে নামতে না পারে: `Cart.findOneAndUpdate({ _id, 'items.qty': { $gt: 0 } }, { ... }, { runValidators: true })`।",
      b: "findOneAndUpdate ডিফল্টভাবে ভ্যালিডেশন এড়িয়ে যায়। আপডেটের অপশনে runValidators: true পাস করতে হবে এবং কুয়েরি ফিল্টারে কোয়ান্টিটি পজিটিভ থাকার শর্ত এনফোর্স করতে হবে।",
      e: "findOneAndUpdate bypasses schema validators by default. The fix requires passing { runValidators: true, new: true } in the options argument, alongside checking positive bounds atomically in the query filter.",
      code: "await Cart.findOneAndUpdate(\n  { _id: cartId, 'items.productId': pId },\n  { $inc: { 'items.$.qty': delta } },\n  { runValidators: true, new: true }\n);"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: একটি হাই-ট্রাফিক এপিআইতে `Order.find().populate('items.product')` কল করায় রেসপন্স টাইম ২ সেকেন্ড ছাড়িয়ে যাচ্ছে। তুমি কীভাবে এটি অপটিমাইজ করবে?",
      m: "সমাধানের ধাপ: (১) সবার আগে কুয়েরির শেষে `.lean()` মেথড যোগ করতে হবে—এতে মেমোরি হাইড্রেটিং ওভারহেড দূর হবে। (২) পপুলেশনে ফিল্ড প্রোজেকশন ব্যবহার করে শুধুমাত্র প্রয়োজনীয় ফিল্ডগুলো আনব (যেমন `populate('items.product', 'name price image')`), পুরো প্রোডাক্ট অবজেক্ট আনব না। (৩) যদি অর্ডার লিস্ট খুব বড় হয়, তবে পপুলেটের বদলে মঙ্গোডিবি `$lookup` পাইপলাইন ব্যবহার করে সিঙ্গেল ব্যাচে ডেটা তুলে এনে পেজিনেশন এনফোর্স করব।",
      b: "প্রথমে .lean() যুক্ত করে লাইটওয়েট অবজেক্ট বানাব, পপুলেটে শুধুমাত্র প্রয়োজনীয় ফিল্ড সিলেক্ট করব এবং বিশাল ডেটাসেটের ক্ষেত্রে অ্যাগ্রিগেশনের $lookup ব্যবহার করব।",
      e: "Append .lean() to prevent document hydration overhead, limit populated fields via explicit projection ('name price'), and rewrite large batch fetches into optimized single-round-trip $lookup aggregation stages with pagination.",
      code: "const orders = await Order.find({ tenantId })\n  .populate('items.product', 'name price sku')\n  .lean()\n  .limit(20);"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: প্রোডাকশনে ইউজার প্রোফাইল আপডেটের সময় `user.password` ফিল্ড আবার রি-হ্যাশ হয়ে পাসওয়ার্ড নষ্ট হয়ে যাচ্ছে! কোডে কোথায় বাগ এবং কীভাবে সমাধান করবে?",
      m: "বাগটি ঘটেছে কারণ `pre('save')` হুকে চেক করা হয়নি যে পাসওয়ার্ড আসলেই মডিফাই হয়েছে কি না! ফলে অন্য কোনো ফিল্ড (যেমন নাম বা ফোন) আপডেট করার পরও সেভ কল হলে আগের হ্যাশ করা পাসওয়ার্ডটি আবার নতুন করে হ্যাশ হয়ে অকেজো হয়ে যাচ্ছে। সমাধান: হুকের শুরুতে চেক করতে হবে `if (!this.isModified('password')) return next();`। যদি পাসওয়ার্ড না বদলায়, তবে হ্যাশিং বাইপাস করতে হবে।",
      b: "প্রি-সেভ হুকে if (!this.isModified('password')) চেক না করায় নাম বা ফোন আপডেটের সময়ও ইতিমধ্যে হ্যাশ করা পাসওয়ার্ড পুনরায় হ্যাশ হয়ে নষ্ট হচ্ছে। এই চেকটি যুক্ত করলেই সমস্যা সমাধান হবে।",
      e: "The bug stems from omitting this.isModified('password') in the pre-save hook. When unrelated profile fields mutate, the already hashed string gets hashed a second time, locking the user out. Guarding with isModified fixes the flaw.",
      code: "userSchema.pre('save', async function(next) {\n  if (!this.isModified('password')) return next(); // Crucial guard\n  this.password = await bcrypt.hash(this.password, 12);\n  next();\n});"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: তোমার টিমের একজন ডেভেলপার `userSchema.index({ email: 1 }, { unique: true })` যোগ করেছে, কিন্তু প্রোডাকশনে এখনো ডুপ্লিকেট ইমেইল সেভ হয়ে যাচ্ছে! কারণ কী এবং কীভাবে ফিক্স করবে?",
      m: "কারণ: Mongoose অ্যাপ্লিকেশান বুট হওয়ার সময় ব্যাকগ্রাউন্ডে `createIndex` চালানোর চেষ্টা করে। যদি প্রোডাকশন সার্ভারে `autoIndex: false` কনফিগার করা থাকে (যা হাই-ট্রাফিক সার্ভারে পারফরম্যান্সের জন্য রিকমেন্ডেড), তবে নতুন ইনডেক্স স্বয়ংক্রিয়ভাবে তৈরি হবে না! অথবা ডেটাবেজে ইতিমধ্যে আগের কিছু ডুপ্লিকেট ইমেইল রেকর্ড রয়ে গেছে যার কারণে ইউনিক ইনডেক্স ফেইল করছে। সমাধান: প্রোডাকশন ডেটাবেজে স্ক্রিপ্ট চালিয়ে আগে বিদ্যমান ডুপ্লিকেটগুলো মুছে ফেলতে হবে, তারপর MongoDB Shell বা মাইগ্রেশন স্ক্রিপ্ট দিয়ে ম্যানুয়ালি `db.users.createIndex({ email: 1 }, { unique: true })` চালাতে হবে।",
      b: "প্রোডাকশন ডেটাবেজে ইতিমধ্যে ডুপ্লিকেট ডেটা থাকলে অথবা autoIndex বন্ধ থাকলে ইউনিক ইনডেক্স তৈরি হতে পারে না। প্রথমে ডুপ্লিকেট ক্লিন করে ম্যানুয়ালি createIndex কমান্ড রান করতে হবে।",
      e: "If autoIndex is disabled (standard in production for performance) or if existing duplicate records already violate the constraint, MongoDB silently fails index creation. Cleanse duplicate records first, then execute db.users.createIndex() directly via migration.",
      tip: "কখনোই প্রোডাকশনে `autoIndex: true`-এর ওপর নির্ভর করবে না; মাইগ্রেশন স্ক্রিপ্ট দিয়ে ইনডেক্স তৈরি করবে।"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: একটি ড্যাশবোর্ডে প্রতিদিনের সেলস রিপোর্ট জেনারেট করার সময় মেমোরি আউট অফ লিমিট হয়ে নোড প্রসেস ক্র্যাশ করছে। Mongoose দিয়ে কীভাবে মেমোরি সেফ উপায়ে লাখ লাখ রেকর্ড প্রসেস করবে?",
      m: "সমাধান: লাখ লাখ রেকর্ড একসাথে `find()` দিয়ে অ্যারে আকারে মেমোরিতে আনা যাবে না! এর বদলে Mongoose-এর `Cursor` অথবা `Stream` ব্যবহার করতে হবে। `Order.find().cursor()` কল করলে এটি একটি একটি করে ডকুমেন্ট মেমোরিতে স্ট্রিম করে, ফলে কোটি রেকর্ড প্রসেস করলেও RAM কনজাম্পশন মাত্র ৩০-৫০ মেগাবাইটের মধ্যে সীমাবদ্ধ থাকে।",
      b: "একসাথে সব ডেটা find() না করে Mongoose Cursor বা Stream ব্যবহার করতে হবে। cursor() একটি একটি করে রেকর্ড স্ট্রিম করে প্রসেস করে, ফলে র‍্যামের ওপর কোনো অতিরিক্ত চাপ পড়ে না।",
      e: "Do not load millions of documents into memory with find(). Use Mongoose Query Cursors via .cursor(). Cursors stream documents batch-by-batch from MongoDB, keeping the Node.js process heap flat and memory footprint minuscule.",
      code: "const cursor = Order.find({ status: 'COMPLETED' }).cursor();\nfor (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {\n  await processInvoice(doc);\n}"
    },

    // --- REAL WORLD (5 Questions) ---
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা (Dokani SaaS): Dokani-তে প্রোডাক্ট স্কিমায় dynamic variants (যেমন সাইজ, কালার, বারকোড, প্রাইস) কীভাবে Mongoose Subdocument দিয়ে ডিজাইন করা হয়েছে যাতে ইনভেন্টরি ফাস্ট রিড হয়?",
      m: "দোকানিতে প্রতিটি প্রোডাক্টের আন্ডারে ভ্যারিয়েন্টগুলোর জন্য একটি সাব-ডকুমেন্ট স্কিমা ব্যবহার করা হয়েছে (`variants: [variantSchema]`)। প্রতিটি ভ্যারিয়েন্টে নিজস্ব `sku`, `barcode`, `stock`, `costPrice`, `sellingPrice` থাকে। সুবিধা হলো: ক্যাশিয়ার যখন বারকোড স্ক্যানার দিয়ে বারকোড স্ক্যান করে, তখন `Product.findOne({ tenantId, 'variants.barcode': scannedBarcode }, { 'variants.$': 1, name: 1 })` দিয়ে একক কুয়েরিতে মাত্র ২ মিলিসেকেন্ডে প্রোডাক্টের নির্দিষ্ট ভ্যারিয়েন্টের সঠিক স্টক ও প্রাইস বের করে আনা সম্ভব হয়।",
      b: "দোকানি পিওএসে ভ্যারিয়েন্টের জন্য সাব-ডকুমেন্ট অ্যারে ব্যবহার করা হয়েছে। বারকোড স্ক্যান করার সময় পজিশনাল প্রজেকশন অপারেটর (variants.$) দিয়ে এক কুয়েরিতে সরাসরি নির্দিষ্ট ভ্যারিয়েন্টের স্টক ও দাম পাওয়া যায়।",
      e: "In Dokani POS, product variants are modeled as Mongoose subdocuments inside an array. When a cashier scans a barcode, a single indexed query using the positional projection operator ('variants.$': 1) retrieves the exact matched variant in sub-3ms latency.",
      code: "const variantSchema = new mongoose.Schema({\n  barcode: { type: String, required: true },\n  stock: { type: Number, default: 0 },\n  price: { type: Number, required: true }\n});\nconst productSchema = new mongoose.Schema({\n  tenantId: { type: String, required: true, index: true },\n  name: String,\n  variants: [variantSchema]\n});"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: Mongoose-এ সফট ডিলিট (Soft Delete) প্যাটার্ন কীভাবে গ্লোবাল কুয়েরি প্লাগইন দিয়ে ইমপ্লিমেন্ট করবে যাতে কোনো এপিআই ভুলবশত ডিলিট হওয়া ডেটা না দেখায়?",
      m: "একটি গ্লোবাল স্কিমা প্লাগইন তৈরি করে তাতে `isDeleted: { type: Boolean, default: false }` এবং `deletedAt: Date` ফিল্ড যোগ করি। এরপর `pre(/^find/)` হুক (অর্থাৎ `find`, `findOne`, `findOneAndUpdate`) রেজিস্টার করে কুয়েরিতে স্বয়ংক্রিয়ভাবে `{ isDeleted: { $ne: true } }` ফিল্টার ইনজেক্ট করি। এছাড়া একটি কাস্টম মেথড `doc.softDelete()` ডিফাইন করি যা `isDeleted: true` সেট করে। এর ফলে কোনো জুনিয়র ডেভেলপার সাধারণ `find()` কল করলেও ডিলিট হওয়া রেকর্ড কখনোই রেজাল্টে আসবে না।",
      b: "সফট ডিলিট প্লাগইনে pre-find হুক ব্যবহার করে স্বয়ংক্রিয়ভাবে isDeleted: false ফিল্টার যুক্ত করা হয়। ফলে সাধারণ ফাইন্ড কুয়েরিতে কখনো ডিলিট হওয়া রেকর্ড আসে না কিন্তু ডেটাবেজে ব্যাকআপ সংরক্ষিত থাকে।",
      e: "Implement a soft-delete plugin adding isDeleted and deletedAt flags. Use a regex pre(/^find/) query hook to automatically inject { isDeleted: { $ne: true } } into every find and findOne operation across the system.",
      code: "function softDeletePlugin(schema) {\n  schema.add({ isDeleted: { type: Boolean, default: false } });\n  schema.pre(/^find/, function() {\n    this.where({ isDeleted: { $ne: true } });\n  });\n}"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: Dokani-তে অডিট লগ বা অ্যাক্টিভিটি হিস্ট্রি ট্র্যাকিংয়ের জন্য Mongoose Post-Save Hook কীভাবে ব্যবহার করা হয়েছে?",
      m: "দোকানিতে যখন কোনো সংবেদনশীল ডেটা (যেমন ইনভয়েস ডিসকাউন্ট এডিট বা প্রোডাক্ট স্টক অ্যাডজাস্টমেন্ট) সেভ হয়, তখন স্কিমার `post('save')` হুক স্বয়ংক্রিয়ভাবে ট্রিগার হয়। এই হুকটি ব্যাকগ্রাউন্ডে একটি নন-ব্লকিং `AuditLog` কালেকশনে একটি নতুন রেকর্ড ইনসার্ট করে: কে পরিবর্তন করেছে (`userId`), কী পরিবর্তন করেছে (`delta/diff`), এবং আগের মান কী ছিল। এটি নিশ্চিত করে যে ক্যাশিয়ার বা ম্যানেজারের প্রতিটি আর্থিক অ্যাকশন ট্র্যাকড থাকে এবং অডিট সিস্টেমে কোনো গরমিল করা সম্ভব হয় না।",
      b: "পোস্ট-সেভ হুকের মাধ্যমে ইনভয়েস এডিট বা স্টক পরিবর্তনের তথ্য স্বয়ংক্রিয়ভাবে অডিট লগ কালেকশনে লিখে রাখা হয়। এতে কোনো ব্লকিং ছাড়া ব্যাকগ্রাউন্ডে সমস্ত হিস্ট্রি ট্র্যাক করা যায়।",
      e: "Post-save hooks asynchronously dispatch audit events to an AuditLog collection upon inventory adjustments or invoice mutations. Capturing previous/updated states and operator IDs enforces tamper-evident compliance.",
      code: "invoiceSchema.post('save', async function(doc) {\n  await AuditLog.create({\n    action: 'INVOICE_MODIFIED',\n    invoiceId: doc._id,\n    amount: doc.grandTotal,\n    timestamp: new Date()\n  });\n});"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: Mongoose এবং TypeScript দিয়ে টাইপ-সেফ স্কিমা ও DTO কীভাবে ডিফাইন করবে যাতে রানটাইম ও কম্পাইল-টাইম টাইপিং ১০০% সিঙ্ক থাকে?",
      m: "আমরা প্রথমে একটি খাঁটি TypeScript ইন্টারফেস বা টাইপ ডিফাইন করি (`interface IProduct`), যা অ্যাপ্লিকেশনের সব DTO ও কন্ট্রোলারে ব্যবহৃত হয়। এরপর Mongoose স্কিমা ডিফাইন করার সময় `new Schema<IProduct>({...})` জেনেরিক টাইপ পাস করি এবং মডেল তৈরির সময় `model<IProduct>('Product', productSchema)` ব্যবহার করি। এর ফলে যদি স্কিমায় কোনো ফিল্ড মিসিং থাকে বা টাইপ অমিল হয়, তবে TypeScript কম্পাইলার বিল্ড টাইমে এরর দেয় এবং রানটাইমে Mongoose স্কিমা ভ্যালিডেশন রক্ষা করে।",
      b: "টাইপস্ক্রিপ্ট ইন্টারফেস তৈরি করে তা Mongoose স্কিমা ও মডেলের জেনেরিক্সে পাস করলে রানটাইম ভ্যালিডেশন এবং কম্পাইল-টাইম টাইপ চেকিং সম্পূর্ণ সিঙ্কে থাকে।",
      e: "Define pure TypeScript interfaces (IProduct) and supply them as generic arguments to both Schema<IProduct>() and model<IProduct>(). This guarantees compile-time TypeScript type checking is strictly synchronized with Mongoose runtime schema validation.",
      code: "export interface IProduct {\n  name: string;\n  price: number;\n  isActive: boolean;\n}\nconst productSchema = new Schema<IProduct>({\n  name: { type: String, required: true },\n  price: { type: Number, required: true },\n  isActive: { type: Boolean, default: true }\n});\nexport const Product = model<IProduct>('Product', productSchema);"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: হাই-লোড নোড সার্ভারে Mongoose Connection Pool Saturation কীভাবে ডিটেক্ট ও প্রিভেন্ট করবে?",
      m: "যদি এপিআই রিকোয়েস্ট রেট কানেকশন পুল ক্যাপাসিটির চেয়ে বেশি হয়ে যায় এবং কুয়েরিগুলো স্লো হয়, তবে নতুন রিকোয়েস্টগুলো কানেকশন পুল থেকে কানেকশন পাওয়ার অপেক্ষায় কিউতে আটকে থাকে (Pool Exhaustion)। লক্ষণ: রেসপন্স টাইম হঠাৎ ৩০ সেকেন্ডে পৌঁছে যাওয়া এবং `MongoTimeoutError: Timed out waiting for connection` ঘটা। সমাধান: (১) কানেকশন অপশনে `maxPoolSize: 50` বা ট্রাফিকের অনুপাতে বাড়ানো, (২) রিড কুয়েরিতে `.lean()` ব্যবহার করা, (৩) প্রতিটি আন-ইনডেক্সড স্লো কুয়েরি ফিক্স করা, এবং (৪) ব্যাকগ্রাউন্ড প্রসেসিংয়ের জন্য BullMQ কিউ ব্যবহার করে ডেটাবেজ কনকারেন্সি ফ্ল্যাট রাখা।",
      b: "কানেকশন পুল খালি না থাকার কারণে নোড সার্ভারে টাইমআউট এরর ঘটে। maxPoolSize বৃদ্ধি করা, স্লো কুয়েরিগুলোতে ইনডেক্স দেওয়া, .lean() ব্যবহার এবং ব্যাকগ্রাউন্ড কিউ ব্যবহারের মাধ্যমে এই সংকট সমাধান করা হয়।",
      e: "Detect connection pool starvation via MongoTimeoutError when queries queue indefinitely. Mitigate by elevating maxPoolSize (e.g. 50-100), indexing slow bottleneck queries, applying .lean() aggressively, and smoothing burst traffic with BullMQ worker queues.",
      code: "mongoose.connect(process.env.MONGO_URI!, {\n  maxPoolSize: 50,\n  serverSelectionTimeoutMS: 5000\n});"
    }
  ]
};
