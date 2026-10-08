// Topic 4: JWT, RBAC & API Security (25 Questions: 5 lvl1, 5 lvl2, 5 lvl3, 5 situation, 5 realworld)
module.exports = {
  id: "jwt-auth-rbac-security",
  name: "JWT Authentication, RBAC & API Security",
  desc: "JSON Web Tokens, Refresh Token Rotation, RBAC Middleware, OWASP Top 10, Helmet, CORS, CSRF, Password Hashing",
  items: [
    // --- LEVEL 1 (5 Questions) ---
    {
      lvl: "lvl1",
      q: "JWT (JSON Web Token) কী এবং এর ৩টি অংশের (Header, Payload, Signature) ইন্টারনাল স্ট্রাকচার কী?",
      m: "JWT হলো একটি কমপ্যাক্ট, URL-নিরাপদ টোকেন স্ট্যান্ডার্ড (RFC 7519) যা দুই পক্ষের মধ্যে তথ্য নিরাপদে আদান-প্রদান করতে ব্যবহৃত হয়। এর ৩টি অংশ ডট (`.`) দিয়ে বিভক্ত থাকে: (১) `Header`: টোকেনের টাইপ (JWT) এবং সাইনিং অ্যালগরিদম (যেমন `HS256` বা `RS256`) ধারণ করে। (২) `Payload`: ইউজারের পাবলিক তথ্য যেমন ইউজার আইডি, রোল ও মেয়াদ (`exp`) থাকে (কখনোই গোপন পাসওয়ার্ড নয়!)। (৩) `Signature`: হেডার, পেলোড এবং সার্ভারের গোপন সিক্রেট কি মিলিয়ে তৈরি ক্রিপ্টোগ্রাফিক হ্যাশ—যা নিশ্চিত করে টোকেনে কেউ টেম্পারিং করতে পারেনি।",
      b: "জেডব্লিউটি ৩টি অংশে বিভক্ত: হেডার (অ্যালগরিদম তথ্য), পেলোড (ইউজারের তথ্য ও মেয়াদ), এবং সিগনেচার (ক্রিপ্টোগ্রাফিক ডিজিটাল স্বাক্ষর)। সার্ভারের গোপন কি ছাড়া সিগনেচার পরিবর্তন করা যায় না বলে এটি অত্যন্ত নিরাপদ।",
      e: "A JSON Web Token (JWT) comprises three Base64URL-encoded parts delimited by periods: Header (algorithm & token type), Payload (claims like userId, roles, expiration), and Signature (HMAC or RSA hash computed with server secret, guaranteeing tamper resistance).",
      code: "// Structure: Header.Payload.Signature\neyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjMifQ.4f3e..."
    },
    {
      lvl: "lvl1",
      q: "পাসওয়ার্ড হ্যাশিংয়ে `bcrypt` কেন প্লেইন টেক্সট বা সাধারণ SHA-256 এর চেয়ে বহুগুণ নিরাপদ?",
      m: "সাধারণ SHA-256 বা MD5 অত্যন্ত দ্রুত চলে (প্রতি সেকেন্ডে কোটি কোটি হ্যাশ বের করা যায়), যার ফলে হ্যাকাররা Rainbow Table বা GPU ব্রুট-ফোর্স দিয়ে মুহূর্তের মধ্যে পাসওয়ার্ড ক্র্যাক করতে পারে। আর `bcrypt` হলো একটি ধীরগতির হ্যাশিং অ্যালগরিদম (Key Derivation Function) যা 'Salt' এবং 'Work Factor / Cost' ব্যবহার করে। সল্ট প্রতিটি পাসওয়ার্ডের সাথে র্যান্ডম স্ট্রিং জুড়ে দিয়ে রেইনবো টেবিল অ্যাটাক অকার্যকর করে, আর কস্ট ফ্যাক্টর (যেমন ১০ বা ১২) ইচ্ছাকৃতভাবে হ্যাশিং স্পিড ধীর করে ব্রুট-ফোর্স আক্রমণ অসম্ভব করে তোলে।",
      b: "SHA-256 অত্যন্ত দ্রুত হওয়ায় ব্রুট ফোর্স দিয়ে ভাঙা সহজ। bcrypt স্বয়ংক্রিয়ভাবে সল্ট যুক্ত করে রেইনবো টেবিল আক্রমণ ব্যর্থ করে এবং কস্ট ফ্যাক্টরের সাহায্যে হ্যাশিং ধীরগতির করে পাসওয়ার্ডের সর্বোচ্চ নিরাপত্তা নিশ্চিত করে।",
      e: "Standard hashing (SHA-256) is designed for speed, allowing brute-force cracking via GPU clusters. bcrypt is intentionally slow and adaptive, incorporating random salts to thwart rainbow tables and tunable cost factors to exponentially delay brute-force attacks.",
      code: "const saltRounds = 12;\nconst hash = await bcrypt.hash(plainPassword, saltRounds);\nconst isMatch = await bcrypt.compare(candidatePassword, hash);"
    },
    {
      lvl: "lvl1",
      q: "Express-এ Role-Based Access Control (RBAC) গার্ড মিডলওয়্যার কীভাবে তৈরি করা হয়?",
      m: "আমরা একটি হায়ার-অর্ডার মিডলওয়্যার ফাংশন তৈরি করি যা অনুমোদিত রোলগুলোর তালিকা গ্রহণ করে (`authorizeRoles('ADMIN', 'MANAGER')`)। মিডলওয়্যারটি ইনকামিং রিকোয়েস্টের `req.user.role` চেক করে। যদি ইউজারের রোল তালিকায় থাকে, তবে `next()` দিয়ে পরবর্তী হ্যান্ডলারে যেতে দেয়। আর না থাকলে তৎক্ষণাৎ `403 Forbidden` এবং 'আপনার এই অ্যাকশনের অনুমতি নেই' মেসেজ পাঠায়।",
      b: "আরবিএসি মিডলওয়্যার অনুমোদিত রোলের তালিকা গ্রহণ করে রিকোয়েস্টে থাকা ইউজারের রোল যাচাই করে। অনুমোদিত হলে কাজ এগিয়ে নিতে দেয় এবং রোল অমিল হলে ৪০৩ ফরবিডেন এরর প্রদান করে।",
      e: "RBAC middleware inspects authenticated roles (`req.user.role`) against an allowed role whitelist passed via higher-order functions. If unauthorized, it terminates the request with HTTP 403 Forbidden.",
      code: "export const authorize = (...roles: string[]) => {\n  return (req: Request, res: Response, next: NextFunction) => {\n    if (!roles.includes(req.user?.role))\n      return res.status(403).json({ error: 'Forbidden' });\n    next();\n  };\n};"
    },
    {
      lvl: "lvl1",
      q: "Helmet.js মিডলওয়্যার কী এবং এটি কোন কোন HTTP সিকিউরিটি হেডার সেট করে?",
      m: "Helmet.js হলো একটি নোড সিকিউরিটি মিডলওয়্যার যা এক লাইনে (`app.use(helmet())`) ১৫টি অপরিহার্য HTTP সিকিউরিটি হেডার সেট করে অ্যাপকে সাধারণ ওয়েব অ্যাটাক থেকে রক্ষা করে। প্রধান হেডারগুলো: (১) `Content-Security-Policy (CSP)`: ক্ষতিকর স্ক্রিপ্ট ইনজেকশন ব্লক করে। (২) `X-Frame-Options: SAMEORIGIN`: ক্লিকজ্যাকিং (Clickjacking) আক্রমণ প্রতিরোধ করে। (৩) `Strict-Transport-Security (HSTS)`: ব্রাউজারকে শুধুমাত্র HTTPS প্রোটোকলে কানেক্ট করতে বাধ্য করে। (৪) `X-Content-Type-Options: nosniff`: MIME-টাইপ স্নাইফিং বন্ধ করে। (৫) `X-Powered-By`: এক্সপ্রেসের নাম লুকিয়ে রাখে যাতে হ্যাকার সার্ভার রানটাইম চিনতে না পারে।",
      b: "হেলমেট মিডলওয়্যার এক্সপ্রেসে ১৫টি সিকিউরিটি হেডার যুক্ত করে। এটি ক্লিকজ্যাকিং, ক্ষতিকর স্ক্রিপ্ট ইনজেকশন এবং এইচটিটিপিএস জোরপূর্বক সক্রিয় করে সার্ভারকে সুরক্ষিত রাখে।",
      e: "Helmet.js secures Express applications by automatically setting 15 HTTP headers, including Content-Security-Policy (CSP), Strict-Transport-Security (HSTS), X-Frame-Options (anti-clickjacking), and stripping the X-Powered-By disclosure header.",
      code: "import helmet from 'helmet';\napp.use(helmet());"
    },
    {
      lvl: "lvl1",
      q: "OWASP Top 10-এর মধ্যে 'Broken Object Level Authorization' (BOLA / IDOR) কী এবং এটি কীভাবে প্রতিরোধ করবে?",
      m: "BOLA (পূর্বে IDOR) হলো যখন একজন ইউজার অন্য ইউজারের রিসোর্সের আইডি ইউআরএলে দিয়ে সেই ডাটা রিড বা ডিলিট করে ফেলে (যেমন ইউজার ১ রিকোয়েস্ট পাঠাল `/api/invoices/999` যা ইউজার ২-এর ইনভয়েস)। এটি ঘটে যখন সার্ভার শুধুমাত্র আইডি দিয়ে কুয়েরি চালায় কিন্তু ওনারশিপ চেক করে না। সমাধান: প্রতিটি ডাটাবেজ কুয়েরিতে ওনার আইডি বা টেন্যান্ট আইডি বাধ্যতামূলক ফিল্টার করতে হবে: `prisma.invoice.findFirst({ where: { id: invoiceId, ownerId: req.user.id } })`। যদি না মেলে তবে `404 Not Found` বা `403 Forbidden` দিতে হবে।",
      b: "বোলা বা আইডিওআর হলো সরাসরি আইডি পরিবর্তনের মাধ্যমে অন্যের তথ্যে অনুপ্রবেশের ত্রুটি। সমাধান হলো ডাটাবেজ থেকে ডাটা খোঁজার সময় সর্বদা রিকোয়েস্টকারী ব্যবহারকারীর ওনারশিপ বা টেন্যান্ট আইডি দিয়ে ফিল্টার করা।",
      e: "Broken Object Level Authorization (BOLA/IDOR) occurs when an endpoint accesses resources via user-supplied IDs without verifying ownership. Prevent this by enforcing composite query predicates: `{ id: resourceId, tenantId: req.user.tenantId }`.",
      tip: "ইন্টারভিউতে BOLA/IDOR প্রতিরোধের জন্য 'Composite Query Predicates with Owner/Tenant ID' ব্যাখ্যা করা সিকিউরিটি ম্যাচিউরিটির প্রমাণ।"
    },

    // --- LEVEL 2 (5 Questions) ---
    {
      lvl: "lvl2",
      q: "Access Token এবং Refresh Token-এর লাইফসাইকেল ও রোটেশন (Token Rotation) ব্যাকএন্ডে কীভাবে কাজ করে?",
      m: "অ্যাক্সেস টোকেনের মেয়াদ সংক্ষিপ্ত থাকে (যেমন ১৫ মিনিট) যাতে চুরি হলেও বেশি ক্ষতি না হয়। আর রিফ্রেশ টোকেন দীর্ঘমেয়াদী হয় (যেমন ৭ দিন) যা ডাটাবেজ বা রেডিসে হ্যাশ আকারে সেভ থাকে এবং ক্লায়েন্টে `HttpOnly` কুকিতে পাঠানো হয়। যখন ক্লায়েন্ট রিফ্রেশ টোকেন পাঠিয়ে নতুন অ্যাক্সেস টোকেন চায়, ব্যাকএন্ড পুরানো রিফ্রেশ টোকেনটি সাথে সাথে ডাটাবেজ থেকে মুছে দিয়ে সম্পূর্ণ নতুন আরেকটি রিফ্রেশ টোকেন ইস্যু করে (Refresh Token Rotation)। এর ফলে একই রিফ্রেশ টোকেন কেউ দুইবার ব্যবহারের চেষ্টা করলে সার্ভার তাৎক্ষণিক সমস্ত অ্যাক্টিভ সেশন বন্ধ করে দেয় (Theft Detection)।",
      b: "স্বল্পমেয়াদী অ্যাক্সেস টোকেন এবং দীর্ঘমেয়াদী রিফ্রেশ টোকেনের সমন্বয়ে সেশন পরিচালিত হয়। প্রতি রিফ্রেশে পুরানো রিফ্রেশ টোকেন বাতিল করে নতুন টোকেন ইস্যু করা হয় (রোটেশন)। চুরি হওয়া টোকেন পুনরায় ব্যবহারের চেষ্টা করলে সিস্টেম সব সেশন বাতিল করে দেয়।",
      e: "Short-lived access tokens (15m) authenticate API requests. Long-lived refresh tokens (7d) are stored in HttpOnly cookies and tracked in Redis. Upon refresh, the server invalidates the used refresh token and issues a brand-new token pair (Refresh Token Rotation). Reusing an already-rotated token triggers family revocation, terminating all active user sessions.",
      code: "const newRefreshToken = generateRefreshToken();\nawait db.refreshToken.update({ where: { id: oldToken.id }, data: { revoked: true } });\nawait db.refreshToken.create({ data: { token: hash(newRefreshToken), userId } });"
    },
    {
      lvl: "lvl2",
      q: "Symmetric Encryption (HMAC HS256) এবং Asymmetric Encryption (RSA/ECDSA RS256)-এর মধ্যে JWT সাইনিংয়ে কোনটি কখন বেছে নেবে?",
      m: "HS256 একটিমাত্র গোপন 'Shared Secret Key' ব্যবহার করে সাইন ও ভেরিফাই উভয় কাজই করে। কিন্তু কোনো মাইক্রোসার্ভিস আর্কিটেকচারে অন্য সার্ভিসকে টোকেন ভেরিফাই করতে হলে তাকেও সেই একই গোপন সিক্রেট দিতে হয়, যা সিকিউরিটি ঝুঁকি তৈরি করে। RS256 একটি 'Public/Private Key Pair' ব্যবহার করে। সেন্ট্রাল Auth সার্ভিস গোপন Private Key দিয়ে টোকেন সাইন করে, আর বাকি সব মাইক্রোসার্ভিস শুধুমাত্র Public Key ব্যবহার করে টোকেন ভেরিফাই করে। ফলে কোনো সিক্রেট কি ফাঁস হওয়ার ঝুঁকি থাকে না।",
      b: "HS256 একক গোপন কি দিয়ে সাইন ও ভেরিফাই করে, যা সিঙ্গেল অ্যাপের জন্য ভালো। কিন্তু মাইক্রোসার্ভিসে RS256 ব্যবহার করা হয় যেখানে প্রাইভেট কি দিয়ে টোকেন তৈরি হয় এবং পাবলিক কি দিয়ে অন্যান্য সার্ভিসগুলো নিরাপদভাবে টোকেন যাচাই করে।",
      e: "HS256 uses a single shared secret for signing and verification. RS256 uses asymmetric Public/Private key pairs: the central Identity Provider signs tokens via the private key, while downstream microservices verify signatures independently via the public key without sharing secrets.",
      tip: "সিঙ্গেল অ্যাপে HS256 যথেষ্ট, কিন্তু ডিস্ট্রিবিউটেড মাইক্রোসার্ভিসে RS256 নেওয়া স্ট্যান্ডার্ড আর্কিটেকচার।"
    },
    {
      lvl: "lvl2",
      q: "JWT Blacklisting বা তাৎক্ষণিক সেশন ইনভ্যালিডেশন (Logout/Password Reset) স্টেটলেস ব্যাকএন্ডে কীভাবে হ্যান্ডেল করবে?",
      m: "যেহেতু JWT স্টেটলেস এবং মেয়াদের শেষ সেকেন্ড পর্যন্ত ভ্যালিড থাকে, তাই ইউজার লগআউট করলেও টোকেন নিজে থেকে অকার্যকর হয় না। সমাধান: আমরা Redis ব্যবহার করে একটি 'Token Blacklist / Revocation Store' রাখি। যখন ইউজার লগআউট করে, টোকেনের ইউনিক আইডি (`jti` - JWT ID) রেডিসে সেভ করি এবং তার TTL সেট করি টোকেনের অবশিষ্ট এক্সপায়ারি টাইম পর্যন্ত। প্রতিটি রিকোয়েস্টে মিডলওয়্যার রেডিস চেক করে; ব্ল্যাকলিস্টে থাকলে সাথে সাথে `401 Unauthorized` রিটার্ন করে।",
      b: "টোকেন স্টেটলেস হওয়ায় লগআউট করার পরও মেয়াদ না শেষ হওয়া পর্যন্ত চালু থাকে। রেডিসে টোকেনের jti আইডি ব্ল্যাকলিস্ট করে অবশিষ্ট সময়ের জন্য TTL দিয়ে সংরক্ষণ করা হয়। মিডলওয়্যারে রেডিস চেক করে তাৎক্ষণিক সেশন বাতিল নিশ্চিত করা হয়।",
      e: "Stateless JWTs cannot be natively recalled before expiration. Assign each JWT a unique `jti` (JWT ID) claim. Upon logout or password change, write the `jti` to Redis with a TTL equal to the token's remaining lifespan. The auth middleware rejects any requests bearing blacklisted JTIs.",
      code: "await redis.set(`blacklist:${decoded.jti}`, 'revoked', 'EX', remainingSeconds);"
    },
    {
      lvl: "lvl2",
      q: "Cross-Site Scripting (XSS) প্রতিরোধে ইনপুট স্যানিটাইজেশন এবং Output Encoding ব্যাকএন্ডে কীভাবে নিশ্চিত করবে?",
      m: "XSS আক্রমণ ঘটে যখন ব্যবহারকারীর দেওয়া ক্ষতিকর জাভাস্ক্রিপ্ট কোড (যেমন `<script>stealCookie()</script>`) ব্যাকএন্ড ডাটাবেজে সেভ হয়ে অন্য ইউজারের ব্রাউজারে এক্সিকিউট হয়। সমাধান: (১) Zod বা `dompurify` / `sanitize-html` লাইব্রেরি দিয়ে ইনকামিং এইচটিএমএল ইনপুট কঠোরভাবে স্যানিটাইজ করা। (২) রিকোয়েস্ট হেডারে Helmet দিয়ে `Content-Security-Policy (CSP)` এনফোর্স করা। (৩) অথেনটিকেশন টোকেন `HttpOnly` কুকিতে রাখা যাতে জাভাস্ক্রিপ্ট দিয়ে রিড করা অসম্ভব হয়।",
      b: "এক্সএসএস আক্রমণ ঠেকাতে ইনপুট ডাটা স্যানিটাইজেশন লাইব্রেরি দিয়ে ফিল্টার করতে হবে, হেলমেট দিয়ে কনটেন্ট সিকিউরিটি পলিসি সক্রিয় করতে হবে এবং টোকেন সর্বদা HttpOnly কুকিতে রাখতে হবে।",
      e: "Mitigate XSS by stripping executable scripts using `dompurify` or `sanitize-html` at input ingestion, enforcing strict Content-Security-Policy (CSP) headers via Helmet, and insulating authentication secrets inside HttpOnly cookies.",
      code: "import sanitizeHtml from 'sanitize-html';\nconst cleanBio = sanitizeHtml(req.body.bio, { allowedTags: ['b', 'i', 'em'] });"
    },
    {
      lvl: "lvl2",
      q: "SQL Injection (SQLi) আক্রমণ কীভাবে ঘটে এবং ORM বা Parameterized Queries কীভাবে এটি ১০০% প্রতিহত করে?",
      m: "SQL Injection ঘটে যখন ইউজার ইনপুটকে সরাসরি স্ট্রিং কনক্যাটেনেশন করে ডেটাবেজ কুয়েরিতে বসানো হয় (যেমন: `SELECT * FROM users WHERE email = '` + email + `'`—এখানে ইউজার `' OR '1'='1` দিলে পুরো ডাটাবেজ ওপেন হয়ে যায়)। Parameterized Queries ইনপুট ডেটাকে কোড হিসেবে এক্সিকিউট না করে শুধুমাত্র লিটারাল ডাটা হিসেবে ডেটাবেজ ড্রাইভারকে আলাদা চ্যানেলে পাঠায়। Prisma ORM ইন্টারনালি সমস্ত কুয়েরিকে প্রিপেয়ার্ড স্টেটমেন্টে রূপান্তর করে, ফলে কোনো ইনপুটই এসকিউএল কোড হিসেবে রান হতে পারে না।",
      b: "ইউজার ইনপুট সরাসরি এসকিউএল স্ট্রিংয়ে যোগ করলে হ্যাকার কুয়েরির গঠন বদলে দিতে পারে। প্যারামিটারাইজড কুয়েরি ইনপুটকে কোড হিসেবে না দেখে বিশুদ্ধ ডাটা হিসেবে গ্রহণ করে, ফলে প্রিজমা বা ওআরএম ব্যবহারে এসকিউএল ইনজেকশন পুরোপুরি অসম্ভব হয়ে যায়।",
      e: "SQL Injection exploits string concatenation into database queries. Parameterized queries and prepared statements separate SQL code from data literals at the database driver protocol level. Prisma executes all operations through parameterized statements, guaranteeing SQLi immunity.",
      tip: "কখনোই `prisma.$queryRawUnsafe()` ব্যবহার করবে না; সবসময় টাইপ-সেফ `$queryRaw` টেমপ্লেট ব্যবহার করবে।"
    },

    // --- LEVEL 3 (5 Questions) ---
    {
      lvl: "lvl3",
      q: "Timing Attacks (সাইড-চ্যানেল অ্যাটাক) কী এবং API কি বা পাসওয়ার্ড যাচাইয়ে `crypto.timingSafeEqual()` কেন আবশ্যক?",
      m: "জাভাস্ক্রিপ্টে সাধারণ স্ট্রিং তুলনা (`strA === strB`) প্রথম যে ক্যারেক্টার অমিল পায় সাথে সাথে তুলনা বন্ধ করে false দেয়। হ্যাকাররা মিলি-সেকেন্ডের ক্ষুদ্র ভগ্নাংশ মেপে (Timing Analysis) বুঝে ফেলে ঠিক কতগুলো ক্যারেক্টার সঠিক ছিল এবং এক এক করে পুরো সিক্রেট কি বের করে ফেলতে পারে। `crypto.timingSafeEqual()` একটি কনস্ট্যান্ট-টাইম (Constant-Time) অ্যালগরিদম চালায় যা স্ট্রিং মিলুক বা না মিলুক সবসময় হুবহু একই সময় নেয়। তাই ওয়েবহুক সিগনেচার বা ক্রিপ্টোগ্রাফিক কি ভেরিফিকেশনে এটি বাধ্যতামূলক।",
      b: "টাইমিং অ্যাটাকে হ্যাকার স্ট্রিং তুলনা করার সময় পরিমাপ করে পাসওয়ার্ড বা কি অনুমান করে ফেলে। crypto.timingSafeEqual সমপরিমাণ সময়ে তুলনা সম্পন্ন করে এই সূক্ষ্ম সাইড-চ্যানেল আক্রমণ প্রতিহত করে।",
      e: "Standard string equality (`a === b`) short-circuits on the first mismatched character, leaking duration differences that attackers exploit via statistical timing measurements. `crypto.timingSafeEqual()` evaluates buffers in strictly constant time, neutralizing timing attacks.",
      code: "import crypto from 'crypto';\nconst isValid = crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));"
    },
    {
      lvl: "lvl3",
      q: "Distributed Denial of Service (DDoS) প্রতিরোধে Layer 7 Rate Limiting আর্কিটেকচার (Token Bucket / Leaky Bucket) কীভাবে কাজ করে?",
      m: "Token Bucket অ্যালগরিদমে প্রতিটি ইউজারের জন্য একটি বালতি থাকে যাতে নির্দিষ্ট হারে টোকেন জমা হয় (যেমন প্রতি সেকেন্ডে ১০টি টোকেন, ক্যাপাসিটি ১০০)। প্রতি রিকোয়েস্টে ১টি টোকেন খরচ হয়। ট্রাফিক স্পাইক আসলে জমা টোকেন দিয়ে সামাল দেওয়া যায়, কিন্তু টোকেন শেষ হলে রিকোয়েস্ট ড্রপ হয়। Leaky Bucket একটি ফিক্সড হারে রিকোয়েস্ট প্রসেস করে (মসৃণ ট্রাফিক)। আমরা Redis এবং Cloudflare WAF দিয়ে সমন্বিতভাবে এই অ্যালগরিদম কার্যকর করে আক্রমণকারী বটনেটগুলোকে নোড সার্ভারে পৌঁছানোর আগেই ব্লক করি।",
      b: "টোকেন বাকেট অ্যালগরিদমে নির্দিষ্ট হারে টোকেন জমা হয় এবং প্রতি রিকোয়েস্টে টোকেন খরচ করে ট্রাফিক স্পাইক সামলানো হয়। রেডিস ও ক্লাউডফ্লেয়ারের সাহায্যে এই কৌশল প্রয়োগ করে ক্ষতিকর আক্রমণকারী বটগুলোকে আগেই আটকে দেওয়া হয়।",
      e: "The Token Bucket algorithm accumulates capacity tokens at a steady rate, allowing bursty traffic up to bucket capacity while throttling excessive bursts. Redis Lua scripts evaluate Token Bucket states atomically, offloading Layer 7 DDoS mitigation prior to reaching Node workers.",
      tip: "রেডিসে Lua স্ক্রিপ্ট দিয়ে অ্যাটমিকালি টোকেন বাকেট হ্যান্ডেল করার কথা বললে ইন্টারভিউয়াররা হাইলি ইমপ্রেসড হয়।"
    },
    {
      lvl: "lvl3",
      q: "Server-Side Request Forgery (SSRF) কী এবং ইউজারকে কোনো ইউআরএল থেকে ডাটা ফেচ করার অনুমতি দিলে সার্ভার কীভাবে সুরক্ষিত রাখবে?",
      m: "SSRF ঘটে যখন একজন আক্রমণকারী সার্ভারকে দিয়ে তার লোকাল নেটওয়ার্ক বা ক্লাউড মেটাডাটা সার্ভিসে রিকোয়েস্ট করায় (যেমন AWS-এর `http://169.254.169.254/latest/meta-data/` থেকে আইএএম রোল বা ডাটাবেজ পাসওয়ার্ড চুরি)। সুরক্ষা: (১) ইউজার প্রদত্ত ইউআরএলের ডিএনএস রিজলভ করে আইপি চেক করতে হবে—প্রাইভেট আইপি রেঞ্জ (`10.0.0.0/8`, `192.168.0.0/16`, `127.0.0.1`, `169.254.0.0/16`) কঠোরভাবে ব্লক করতে হবে। (২) আউটবাউন্ড প্রক্সি ব্যবহার করা যা শুধুমাত্র পোর্ট ৮০/৪৪৩ এবং পাবলিক আইপিতে কানেক্ট করতে দেয়।",
      b: "এসএসআরএফ হলো সার্ভারকে দিয়ে লোকাল প্রাইভেট নেটওয়ার্ক বা ক্লাউড মেটাডাটা চুরি করানোর আক্রমণ। ব্যবহারকারীর ইউআরএল যাচাই করে লোকালহোস্ট ও প্রাইভেট আইপি রেঞ্জ পুরোপুরি ব্লক করে এই আক্রমণ প্রতিরোধ করা হয়।",
      e: "SSRF occurs when attackers induce the server to make unauthorized outbound requests to internal resources (e.g. AWS metadata endpoint 169.254.169.254). Defend by resolving destination DNS and blacklisting private RFC 1918 / link-local IP ranges before dispatching HTTP calls.",
      code: "const isPrivateIp = (ip) => /^(127\\.|10\\.|192\\.168\\.|169\\.254\\.)/.test(ip);"
    },
    {
      lvl: "lvl3",
      q: "Secret Management: প্রোডাকশনে `.env` ফাইলে সিক্রেট রাখা কেন অনিরাপদ এবং Vault / AWS Secrets Manager কীভাবে কাজ করে?",
      m: "সার্ভারের ডিস্কে প্লেইন টেক্সট `.env` ফাইল রাখলে: সার্ভারে অননুমোদিত অ্যাক্সেস পেলে বা ভুল করে গিট রিপোজিটরিতে ঢুকলে সব সিক্রেট কম্প্রোমাইজড হয়ে যায় এবং কোনো সেন্ট্রালাইজড অডিট লগ থাকে না। আধুনিক এন্টারপ্রাইজে আমরা HashiCorp Vault বা AWS Secrets Manager ব্যবহার করি। নোড অ্যাপ স্টার্টআপের সময় মেমোরিতে সরাসরি সিক্রেট ফেচ করে এবং কোনো সিক্রেট রোটেট (Rotate) হলে অ্যাপ রিস্টার্ট ছাড়াই লাইভ ডাটাবেজ পাসওয়ার্ড আপডেট করে নেয়। সমস্ত অ্যাক্সেসের অডিট ট্রেইল ক্লাউডে সংরক্ষিত থাকে।",
      b: "ডিস্কে সাধারণ .env ফাইলে পাসওয়ার্ড রাখা অনিরাপদ। ভল্ট বা ক্লাউড সিক্রেটস ম্যানেজার ব্যবহার করে মেমরিতে এনক্রিপ্টেড কি আনা হয় যা স্বয়ংক্রিয়ভাবে পাসওয়ার্ড পরিবর্তন করতে পারে এবং কে কখন অ্যাক্সেস করেছে তার অডিট হিস্ট্রি রাখে।",
      e: "Plaintext `.env` files on persistent disks create exposure surfaces. Vault and AWS Secrets Manager provide encrypted secret stores with automated rotation, role-based IAM leasing, dynamic short-lived credentials, and comprehensive audit logs.",
      tip: "ইন্টারভিউতে 'Dynamic Credential Leasing & Automated Rotation' এর গুরুত্ব তুলে ধরবে।"
    },
    {
      lvl: "lvl3",
      q: "Content Security Policy (CSP) এবং Subresource Integrity (SRI) কীভাবে সাপ্লাই চেইন অ্যাটাক প্রতিরোধ করে?",
      m: "Supply Chain Attack-এ হ্যাকার কোনো থার্ড-পার্টি সিডিএন প্যাকেজ হ্যাক করে ক্ষতিকর কোড ইনজেক্ট করে। Subresource Integrity (SRI) স্ক্রিপ্ট ট্যাগে একটি ক্রিপ্টোগ্রাফিক হ্যাশ যোগ করে (`integrity='sha384-...'`)। ব্রাউজার স্ক্রিপ্ট ডাউনলোড করার পর হ্যাশ মিলিয়ে দেখে—যদি সিডিএনে সামান্য পরিবর্তনও হয়ে থাকে, ব্রাউজার কোড রান করতে সম্পূর্ণ অস্বীকৃতি জানায়। আর CSP নির্ধারণ করে কোন কোন সুনির্দিষ্ট ডোমেন থেকে ব্রাউজার স্ক্রিপ্ট ও কানেকশন লোড করতে পারবে।",
      b: "সাপ্লাই চেইন আক্রমণ ঠেকাতে এসআরআই (SRI) স্ক্রিপ্টের হ্যাশ মিলিয়ে দেখে কোনো বিকৃতি আছে কি না। সিএসপি (CSP) কঠোরভাবে নির্ধারণ করে কোন কোন অনুমোদিত ডোমেন ছাড়া অন্য কোনো স্ক্রিপ্ট ব্রাউজারে চলবে না।",
      e: "Subresource Integrity (SRI) binds external CDN scripts to a cryptographic hash (`integrity='sha384-...'`). Browsers abort script execution if the downloaded asset differs by even one byte. CSP complements this by whitelisting authorized origin boundaries.",
      code: "<script src='https://cdn.example.com/lib.js' integrity='sha384-oqVuAfXRKap7fdgcCY5uykM6...' crossorigin='anonymous'></script>"
    },

    // --- SITUATION (5 Questions) ---
    {
      lvl: "situation",
      q: "একজন কর্মচারীর আইডি হ্যাক হয়েছে এবং সে কোম্পানি ছেড়ে দিয়েছে। কিন্তু তার কাছে বৈধ JWT অ্যাক্সেস টোকেন রয়েছে যার মেয়াদ এখনো ১২ ঘণ্টা বাকি। ব্যাকএন্ডে কীভাবে অবিলম্বে তার অ্যাক্সেস কাটবে?",
      m: "যেহেতু JWT স্টেটলেস, শুধু ডাটাবেজে ইউজার ডিলিট করলে মেয়াদ শেষ না হওয়া পর্যন্ত অ্যাক্সেস টোকেনটি কাজ করতে থাকবে। সমাধান: (১) ইউজারের ডাটাবেজ রেকর্ডে একটি `tokenVersion: 1` ফিল্ড রাখব। JWT পেলোডের ভেতরেও এই ভার্সন থাকবে। (২) কর্মচারী টার্মিনেট হলে ডাটাবেজে `tokenVersion` বাড়িয়ে ২ করে দেব। (৩) মিডলওয়্যার ক্যাশড রেডিস থেকে ভ্যালিডেট করবে—যদি টোকেনের ভার্সন ডাটাবেজের চেয়ে পুরানো হয়, সাথে সাথে `401 Unauthorized` রিটার্ন করবে। এর ফলে ১ সেকেন্ডের মধ্যে তার সব সেশন বন্ধ হয়ে যাবে।",
      b: "তাত্ক্ষণিক অ্যাক্সেস বাতিল করতে ইউজার মডেলে tokenVersion রাখা হয়। কর্মচারী টার্মিনেট হলে ভার্সন সংখ্যা বাড়িয়ে দেওয়া হয়, ফলে মিডলওয়্যারে পুরানো ভার্সনযুক্ত টোকেন আর কার্যকর থাকে না এবং তৎক্ষণাৎ সেশন বাতিল হয়।",
      e: "Implement Token Versioning (or User Session Epoch). Embed a `tokenVersion` claim inside the JWT payload. Upon employee termination, increment `tokenVersion` in the user's DB record. The auth middleware rejects incoming tokens whose embedded version trails the active epoch.",
      code: "if (decoded.tokenVersion !== cachedUser.tokenVersion) return res.status(401).send('Session revoked');"
    },
    {
      lvl: "situation",
      q: "লগইন এপিআইতে প্রতি মিনিটে ১০ হাজার ব্রুট-ফোর্স রিকোয়েস্ট আসছে যা ডাটাবেজ ও সিপিইউকে ডাউন করে দিচ্ছে। কীভাবে তাৎক্ষণিক ট্রাফিকের আক্রমণ প্রতিহত করবে?",
      m: "জরুরি পদক্ষেপ: (১) সবার আগে Cloudflare বা Nginx রিভার্স প্রক্সির লেয়ারে WAF রুল ও Rate Limiting চালু করব যাতে ট্রাফিক নোড সার্ভার পর্যন্ত পৌঁছাতে না পারে। (২) এক্সপ্রেস অ্যাপে `express-rate-limit` দিয়ে আইপি প্রতি এবং একাউন্ট প্রতি ৫টি ফেইল্ড অ্যাটেম্পটের পর অ্যাকাউন্ট সাময়িক ১৫ মিনিটের জন্য লক করব। (৩) লগইন ফর্মে Cloudflare Turnstile বা Google reCAPTCHA v3 ইন্টিগ্রেট করব যা বটের আক্রমণকে ৯৯.৯% ফিল্টার করে দেবে।",
      b: "ব্রুট ফোর্স আক্রমণে ক্লাউডফ্লেয়ার ডব্লিউএএফ (WAF) লেভেলে রেট লিমিটিং সক্রিয় করতে হবে। অ্যাপ্লিকেশনে ৫ বার ভুল পাসওয়ার্ড দিলে অ্যাকাউন্ট সাময়িক লক করতে হবে এবং টার্নস্টাইল ক্যাপচা যুক্ত করে বট ট্রাফিক পুরোপুরি আটকে দিতে হবে।",
      e: "Defend against brute force surges: (1) Enforce edge-level WAF challenge rules on Cloudflare to drop abusive IPs before hitting Node, (2) Apply IP/Username compound rate limits backed by Redis, (3) Enforce Cloudflare Turnstile CAPTCHA on consecutive failures.",
      tip: "নোড লেয়ারের আগে এজ (Cloudflare/Nginx) লেয়ারে ট্রাফিক ড্রপ করার কথা বলা প্রোডাকশন আর্কিটেকচারের চূড়ান্ত পরিচয়।"
    },
    {
      lvl: "situation",
      q: "ব্যবহারকারী লগআউট করার পর ব্রাউজারের ব্যাক বাটন চাপলে সুরক্ষিত ড্যাশবোর্ড পেজ ক্যাশ থেকে স্ক্রিনে ভেসে উঠছে। কীভাবে প্রিভেন্ট করবে?",
      m: "এটি ঘটে ব্রাউজারের 'Back-Forward Cache (bfcache)'-এর কারণে। সমাধান: সুরক্ষিত ড্যাশবোর্ড এপিআই এবং পেজের রেসপন্স হেডারে আমরা নো-ক্যাশ হেডার পাঠাব: `Cache-Control: no-store, no-cache, must-revalidate, proxy-revalidate`, `Pragma: no-cache`, এবং `Expires: 0`। এর ফলে ব্রাউজার বুঝতে পারে এই সুরক্ষিত পেজটিকে কখনোই লোকাল ডিস্ক বা মেমোরিতে ক্যাশ করা যাবে না এবং ব্যাক বাটন চাপলে স্বয়ংক্রিয়ভাবে সার্ভার রি-ভ্যালিডেট করে লগইন পেজে পাঠিয়ে দেবে।",
      b: "ব্যাক বাটন চাপলে পুরানো ড্যাশবোর্ড দেখা বন্ধ করতে Cache-Control: no-store হেডার পাঠাতে হবে। এর ফলে ব্রাউজার পেজটি মেমরিতে ক্যাশ করে রাখে না এবং ব্যাক বাটনে চাপ দিলে রিফ্রেশ হয়ে লগইন পেজে চলে যায়।",
      e: "Set HTTP response caching headers on all protected endpoints: `Cache-Control: no-store, no-cache, must-revalidate`. This instructs browsers and intermediaries never to store snapshots in the bfcache, forcing immediate redirect to login upon back navigation.",
      code: "res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');"
    },
    {
      lvl: "situation",
      q: "একটি এপিআইতে মাল্টিপল রোল অনুমোদিত (যেমন `ADMIN`, `MANAGER`, `STORE_OWNER`), কিন্তু একজন ইউজার অন্য স্টোরের ম্যানেজার হয়েও অন্য স্টোরের ডাটা এডিট করে ফেলছে। আরবিএসি লজিকে কী মিসিং ছিল?",
      m: "এখানে মিসিং ছিল 'Multi-Tenant Context Scope'। আরবিএসি শুধু চেক করেছিল ইউজার ম্যানেজার কি না, কিন্তু সে 'কোন স্টোরের' ম্যানেজার তা চেক করেনি! সমাধান: রোলের পাশাপাশি টেন্যান্ট বা স্টোর ওনারশিপ গার্ড বসাতে হবে: `req.user.role === 'MANAGER' && req.user.storeId === requestedStoreId`। অর্থাৎ গ্লোবাল রোলের ওপর অন্ধ নির্ভর না করে টেন্যান্ট-লেভেল স্কোপড পারমিশন এনফোর্স করতে হবে।",
      b: "এখানে রোল ঠিক থাকলেও স্টোর ওনারশিপ যাচাই করা হয়নি। সমাধান হলো রোলের সাথে স্টোর আইডি মিলিয়ে দেখা যে ইউজার আসলেই সেই নির্দিষ্ট স্টোরের ম্যানেজার কি না, অন্যথায় রিকোয়েস্ট বাতিল করতে হবে।",
      e: "RBAC verified user roles globally without evaluating Tenant Scope. Rectify this by verifying role permissions strictly within the boundary of the tenant: `req.user.role === 'MANAGER' && req.user.tenantId === req.params.tenantId`.",
      code: "if (user.role === 'MANAGER' && user.storeId !== req.params.storeId) {\n  return res.status(403).json({ error: 'Unauthorized for this store' });\n}"
    },
    {
      lvl: "situation",
      q: "ক্লায়েন্ট সাইড থেকে পাঠানো JWT টোকেন কোনো কারণে এক্সপায়ার হয়ে গেছে, কিন্তু ব্যাকএন্ড ভুল করে 500 Internal Server Error পাঠাচ্ছে। কীভাবে সঠিক HTTP স্ট্যাটাস হ্যান্ডেল করবে?",
      m: "`jwt.verify()` টোকেন এক্সপায়ার হলে একটি `TokenExpiredError` থ্রো করে। ডেভেলপার যদি জেনেরিক ক্যাচ ব্লক রাখে তবে তা 500 হয়ে যায়, যা ফ্রন্টএন্ডের রিফ্রেশ টোকেন হ্যান্ডলারকে বিভ্রান্ত করে। সমাধান: অথ মিডলওয়্যারে আমরা এররের ধরন চেক করব: `if (err.name === 'TokenExpiredError') return res.status(401).json({ code: 'TOKEN_EXPIRED' })`। আর যদি সিগনেচার ভুল হয় তবে `JsonWebTokenError` ধরে 403 বা 401 দেব।",
      b: "টোকেন এক্সপায়ার হলে jwt.verify TokenExpiredError দেয়। এটিকে আলাদাভাবে ক্যাচ করে সুনির্দিষ্ট ৪০১ (401) স্ট্যাটাস কোড এবং স্পষ্ট এরর কোড পাঠাতে হবে যাতে ফ্রন্টএন্ড বুঝতে পেরে রিফ্রেশ টোকেন চালাতে পারে।",
      e: "Trap specific JWT error subtypes: when `err.name === 'TokenExpiredError'`, return HTTP 401 with a machine-readable code `{ code: 'TOKEN_EXPIRED' }`, enabling client Axios interceptors to initiate refresh flows instead of triggering generic 500 failures.",
      code: "try {\n  const user = jwt.verify(token, secret);\n} catch (err: any) {\n  if (err.name === 'TokenExpiredError') return res.status(401).json({ code: 'TOKEN_EXPIRED' });\n  return res.status(403).json({ code: 'INVALID_TOKEN' });\n}"
    },

    // --- REALWORLD (5 Questions) ---
    {
      lvl: "realworld",
      q: "Dokani POS SaaS প্ল্যাটফর্মে মাল্টি-টেন্যান্ট রোল ও পারমিশন সিস্টেম (Owner, Manager, Cashier) কীভাবে ডাটাবেজ ও মিডলওয়্যারে আর্কিটেক্ট করেছিলে?",
      m: "আমরা একটি হাইব্রিড RBAC + Tenant Scope আর্কিটেকচার তৈরি করেছিলাম। ডেটাবেজে প্রতিটি ইউজারের `tenantId`, `role`, এবং একটি কাস্টম `permissions` অ্যারে ছিল। যখন ক্যাশিয়ার লগইন করে, টোকেনে তার `tenantId` এবং পারমিশন তালিকা এনকোড হতো। ব্যাকএন্ডে আমরা একটি মিডলওয়্যার ব্যবহার করেছি: `requirePermission('pos:sales:create')`। এটি নিশ্চিত করত যে রিকোয়েস্টকারী ব্যক্তি ওই নির্দিষ্ট দোকানের ক্যাশিয়ার এবং তার কাছে বিক্রয় সম্পন্ন করার সুনির্দিষ্ট পারমিশন রয়েছে।",
      b: "দোকানি সিস্টেমে প্রতিটি ইউজারের সাথে টেন্যান্ট আইডি ও পারমিশন অ্যারে যুক্ত ছিল। requirePermission মিডলওয়্যারের মাধ্যমে আমরা নিশ্চিত করেছি যে ক্যাশিয়ার শুধুমাত্র নিজের দোকানের পণ্য বিক্রি করতে পারে এবং মালিকের রিপোর্ট বা ইনভেন্টরি এডিটের অনুমতি তার নেই।",
      e: "Architected a hybrid Tenant-Scoped RBAC in Dokani POS: JWTs contained tenant identifiers and normalized permission claims. Fine-grained guards (`requirePermission('sales:create')`) enforced strict tenant isolation and role policies.",
      tip: "মাল্টি-টেন্যান্ট SaaS-এ টেন্যান্ট আইডি এবং রোল পারমিশন একসাথে ভ্যালিডেট করার অভিজ্ঞতা যে কোনো সিনিয়র রোলের জন্য অপরিহার্য।"
    },
    {
      lvl: "realworld",
      q: "Dokani POS-এ ক্যাশিয়ারের ক্যাশ ড্রয়ার ও বিক্রয় ডেটা জালিয়াতি ঠেকাতে অডিট লগিং (Audit Trail) কীভাবে সুরক্ষিত করেছিলে?",
      m: "ক্যাশ কাউন্টারে বিল মুছে ফেলা বা ডিসকাউন্ট জালিয়াতি বন্ধ করতে আমরা একটি অপরিবর্তনশীল (Immutable) `AuditLog` টেবিল বানিয়েছি। প্রতিটি সংবেদনশীল অপারেশনে (যেমন বিল এডিট, ক্যাশ ড্রয়ার ওপেন, ডিসকাউন্ট ওভাররাইড) ব্যাকএন্ড স্বয়ংক্রিয়ভাবে অডিট লগ এন্ট্রি তৈরি করত: `{ tenantId, userId, action, ipAddress, userAgent, oldValues, newValues, timestamp }`। ডাটাবেজ লেয়ারে এই টেবিলে `UPDATE` বা `DELETE` সম্পূর্ণ নিষিদ্ধ ছিল (Append-only Table)। ফলে মালিক যেকোনো সময় দেখতে পারত ঠিক কখন কোন ক্যাশিয়ার কী করেছে।",
      b: "জালিয়াতি রুখতে আমরা একটি অ্যাপেন্ড-অনলি অডিট লগ সিস্টেম তৈরি করেছিলাম। বিল পরিবর্তন বা ড্রয়ার খোলার সাথে সাথে পূর্বের ও বর্তমান মান, আইপি এবং সময় অপরিবর্তনীয়ভাবে সংরক্ষিত হতো যা কেউ মুছতে পারত না।",
      e: "Protected Dokani against cashier fraud by implementing an append-only Immutable Audit Log table with database-level triggers revoking UPDATE and DELETE privileges. Captured operations recorded before-and-after states, actor IDs, and IP addresses.",
      code: "await prisma.auditLog.create({\n  data: { tenantId, userId, action: 'INVOICE_DISCOUNT_APPLIED', details: { oldPrice, newPrice, reason } }\n});"
    },
    {
      lvl: "realworld",
      q: "PTTABD প্ল্যাটফর্মে অনলাইন পরীক্ষার সময় একই স্টুডেন্ট অ্যাকাউন্টে একাধিক ডিভাইস থেকে একযোগে লগইন ঠেকাতে সেশন কন্ট্রোল কীভাবে নিশ্চিত করেছিলে?",
      m: "আমরা Redis-এ একটি 'Single Active Device Session' নীতি প্রয়োগ করেছি। স্টুডেন্ট লগইন করার সময় একটি ইউনিক `sessionId` তৈরি করে রেডিসে সেভ করা হতো: `SET student:session:{studentId} {sessionId}`। এরপর প্রতিটি এপিআই রিকোয়েস্টে মিডলওয়্যার চেক করত টোকেনের সেশন আইডি রেডিসের বর্তমান সেশন আইডির সাথে মিলছে কি না। স্টুডেন্ট অন্য কোনো ব্রাউজার বা ফোনে লগইন করা মাত্র পূর্বের সেশনটি ওভাররাইট হয়ে যেত এবং আগের ডিভাইসের পরীক্ষা তৎক্ষণাৎ পজ হয়ে 'অন্য ডিভাইসে লগইন হয়েছে' মেসেজ দেখাত।",
      b: "একযোগে একাধিক ডিভাইস থেকে লগইন বন্ধ করতে রেডিসে সিঙ্গেল অ্যাক্টিভ সেশন আইডি রাখা হতো। অন্য কোথাও থেকে লগইন করলে পূর্ববর্তী সেশনটি স্বয়ংক্রিয়ভাবে অকার্যকর হয়ে আগের ডিভাইসের পরীক্ষা আটকে যেত।",
      e: "Prevented concurrent exam cheating in PTTABD via Redis-backed Single Active Session tracking. Authentic logins overwrite the user's active session key in Redis; previous devices detect session mismatches on their next request and terminate instantly.",
      tip: "এড-টেক বা সিকিউর এক্সাম সিস্টেমে সিঙ্গেল সেশন এনফোর্সমেন্ট রিয়েল-লাইফ চ্যালেঞ্জের দারুণ সমাধান।"
    },
    {
      lvl: "realworld",
      q: "Dokani POS-এর এপিআইতে ক্রেডিট কার্ড বা গ্রাহকের ব্যক্তিগত তথ্য (PII) ডাটাবেজে স্টোর করার সময় ফিল্ড-লেভেল এনক্রিপশন (AES-256-GCM) কীভাবে বাস্তবায়ন করেছিলে?",
      m: "আমরা ডেটাবেজে গ্রাহকের সংবেদনশীল তথ্য (যেমন ফোন নম্বর বা জাতীয় পরিচয়পত্র) সরাসরি প্লেইন টেক্সটে রাখিনি। আমরা Node.js-এর বিল্ট-ইন `crypto` মডিউল ব্যবহার করে `AES-256-GCM` সিমেট্রিক এনক্রিপশন বাস্তবায়ন করেছি। প্রতিটি রেকর্ডের জন্য একটি ইউনিক Initialization Vector (IV) এবং Authentication Tag ব্যবহার করা হতো যা ডাটাবেজ চুরি হলেও হ্যাকারদের জন্য ডেটা ডিক্রিপ্ট করা অসম্ভব করে দিত।",
      b: "সংবেদনশীল গ্রাহক তথ্য সুরক্ষায় আমরা AES-256-GCM ফিল্ড লেভেল এনক্রিপশন ব্যবহার করেছি। প্রতিটি তথ্যের সাথে ইউনিক আইভি (IV) ও অথ ট্যাগ থাকায় ডাটাবেজ হ্যাক হলেও মূল তথ্য উদ্ধার করা অসম্ভব।",
      e: "Encrypted sensitive PII (customer NID and phone numbers) in Dokani POS via AES-256-GCM authenticated encryption. Each write generated a distinct 12-byte IV and 16-byte authentication tag, ensuring confidentiality and cryptographic integrity.",
      code: "const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);\nlet encrypted = cipher.update(plainText, 'utf8', 'hex') + cipher.final('hex');\nconst authTag = cipher.getAuthTag().toString('hex');"
    },
    {
      lvl: "realworld",
      q: "প্রোডাকশন Express অ্যাপ্লিকেশনে নিয়মিত সিকিউরিটি অডিট ও ডিপেনডেন্সি ভালনারেবিলিটি স্ক্যান কীভাবে CI পাইপলাইনে অটোমেট করেছিলে?",
      m: "আমরা GitHub Actions CI পাইপলাইনে ৩টি স্বয়ংক্রিয় সিকিউরিটি গেট যুক্ত করেছি: (১) `npm audit --audit-level=high`: ডিপেনডেন্সিতে কোনো গুরুতর ত্রুটি থাকলে বিল্ড সাথে সাথে ফেইল করে। (২) `Snyk` বা `Trivy`: থার্ড-পার্টি প্যাকেজ ও ডকার ইমেজের ভালনারেবিলিটি স্ক্যান করে। (৩) `SonarQube` / `CodeQL`: স্ট্যাটিক অ্যাপ্লিকেশন সিকিউরিটি টেস্টিং (SAST) চালিয়ে কোনো ইনজেকশন বা হার্ডকোডেড ক্রেডেনশিয়াল থাকলে পিআর ব্লক করে দেয়।",
      b: "আমরা সিআই পাইপলাইনে npm audit, Snyk এবং CodeQL ইন্টিগ্রেট করে নিয়মিত সিকিউরিটি স্ক্যান স্বয়ংক্রিয় করেছি। কোনো থার্ড পার্টি প্যাকেজে ত্রুটি থাকলে মার্জ বাটন লক হয়ে গিয়ে কোডবেজ সর্বদা সুরক্ষিত থাকত।",
      e: "Automated continuous security auditing in GitHub Actions via `npm audit --audit-level=high` gates, Snyk dependency vulnerability scans, and CodeQL SAST code analysis to intercept security regressions before merging.",
      tip: "সিআই পাইপলাইনে SAST ও ডিপেনডেন্সি স্ক্যানিং এনফোর্স করার অভিজ্ঞতা সিকিউরিটি-ফার্স্ট ইঞ্জিনিয়ারদের বৈশিষ্ট্য।"
    }
  ]
};
