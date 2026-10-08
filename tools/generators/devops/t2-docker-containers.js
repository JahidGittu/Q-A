// Topic 2: Docker & Containerization (25 Questions: 5 lvl1, 5 lvl2, 5 lvl3, 5 situation, 5 realworld)
module.exports = {
  id: "docker-containerization",
  name: "Docker & Container Architecture",
  desc: "Dockerfiles, Multi-Stage Builds, Docker Compose, Volumes, Bridge Networks, Container Security (Non-root), Healthchecks",
  items: [
    // --- LEVEL 1 (5 Questions) ---
    {
      lvl: "lvl1",
      q: "Docker কী এবং Container বনাম Virtual Machine (VM)-এর মধ্যে মূল পার্থক্য কী?",
      m: "Docker হলো একটি ওপেন-সোর্স কন্টেইনারাইজেশন প্ল্যাটফর্ম যা অ্যাপ্লিকেশন এবং তার সমস্ত ডিপেনডেন্সি ও কনফিগারেশনকে একটি লাইটওয়েট পোর্টেবল কন্টেইনারে প্যাকেজ করে। (১) `Virtual Machine (VM)`: একটি সম্পূর্ণ গেস্ট অপারেটিং সিস্টেম (Guest OS) এবং হাইপারভাইজর রান করে, ফলে বুট হতে কয়েক মিনিট সময় নেয় এবং গিগাবাইট র‍্যাম ও ডিস্ক খরচ করে। (২) `Docker Container`: হোস্ট লিনাক্স কার্নেল শেয়ার করে এবং লিনাক্স `Namespaces` ও `cgroups` দিয়ে আইসোলেটেড প্রসেস হিসেবে চলে। এটি মাত্র কয়েক মেগাবাইট র‍্যাম নেয় এবং মিলিসেকেন্ডে চালু হয়। 'আমার মেশিনে চলে কিন্তু সার্ভারে চলে না' সমস্যা ডকার চিরতরে সমাধান করেছে।",
      b: "ডকার অ্যাপ্লিকেশনকে সমস্ত ডিপেনডেন্সি সহ কন্টেইনারে প্যাকেজ করে। ভার্চুয়াল মেশিন সম্পূর্ণ আলাদা অপারেটিং সিস্টেম চালায় যা ভারী, আর ডকার কন্টেইনার হোস্ট কার্নেল শেয়ার করে মাত্র কয়েক মেগাবাইটে অতি দ্রুত রান করে।",
      e: "Docker containerizes applications with their dependencies. Unlike Virtual Machines that run redundant Guest OS instances over a hypervisor consuming gigabytes of memory, Docker containers share the host Linux kernel via namespaces and cgroups, booting in milliseconds with minimal overhead.",
      tip: "বলো: 'Containers share the host kernel via cgroups and namespaces, unlike VMs which run full guest OS stacks.'"
    },
    {
      lvl: "lvl1",
      q: "Dockerfile-এ `CMD` এবং `ENTRYPOINT`-এর মধ্যে পার্থক্য কী?",
      m: "(১) `ENTRYPOINT`: কন্টেইনারটি বুট হলে কোন মূল এক্সিকিউটেবল কমান্ডটি চলবে তা নির্দিষ্ট করে (এটি পরিবর্তন করা কঠিন)। যেমন: `ENTRYPOINT [\"node\", \"dist/server.js\"]`। (২) `CMD`: এন্ট্রি-পয়েন্টের জন্য ডিফল্ট আর্গুমেন্ট সরবরাহ করে অথবা কোনো এন্ট্রি-পয়েন্ট না থাকলে ডিফল্ট কমান্ড চালায়। সবচেয়ে বড় পার্থক্য: `docker run myimage arg1` কমান্ডে অতিরিক্ত আর্গুমেন্ট পাস করলে `CMD` ওভাররাইট হয়ে যায়, কিন্তু `ENTRYPOINT` ওভাররাইট হয় না—বরং অতিরিক্ত আর্গুমেন্টগুলো এন্ট্রি-পয়েন্টের সাথে যুক্ত হয়ে যায়।",
      b: "ENTRYPOINT কন্টেইনারের অপরিবর্তনযোগ্য প্রধান কমান্ড নির্দেশ করে। CMD ডিফল্ট প্যারামিটার দেয় যা docker run কমান্ডের সময় ক্লায়েন্ট প্যারামিটার দিয়ে ওভাররাইট করা সম্ভব।",
      e: "ENTRYPOINT defines the base executable that always runs when the container starts. CMD defines default arguments for the entrypoint (or default command). Passing arguments to docker run overrides CMD, but appends to ENTRYPOINT.",
      code: "# Typical Node.js Dockerfile:\nENTRYPOINT [\"node\"]\nCMD [\"dist/server.js\"] # Can be overridden: docker run myapp dist/worker.js"
    },
    {
      lvl: "lvl1",
      q: "Docker Compose কী এবং মাল্টি-কন্টেইনার অ্যাপ্লিকেশনে এটি কেন ব্যবহার করা হয়?",
      m: "Docker Compose হলো একটি টুল যা একটি একক YAML ফাইলের (`docker-compose.yml`) মাধ্যমে একাধিক সংযুক্ত কন্টেইনার (যেমন Node.js API, PostgreSQL DB, Redis Cache, Nginx Reverse Proxy) সংজ্ঞায়িত ও পরিচালনা করতে সাহায্য করে। আলাদা আলাদা ৫-৬টি লম্বা `docker run` কমান্ড মুখস্থ না করে শুধুমাত্র `docker-compose up -d` চালালেই সমস্ত সার্ভিস, তাদের অভ্যন্তরীণ নেটওয়ার্ক এবং ভলিউম স্বয়ংক্রিয়ভাবে তৈরি হয়ে একে অপরের সাথে কানেক্ট হয়ে যায়।",
      b: "ডকার কম্পোজ একটি YAML ফাইলের মাধ্যমে নোড ব্যাকএন্ড, ডেটাবেজ ও রেডিসের মতো একাধিক কন্টেইনারকে একসাথে এক কমান্ডে (docker-compose up) চালু ও পরিচালনা করতে সাহায্য করে।",
      e: "Docker Compose declaratively manages multi-container applications defined in a docker-compose.yml file. Running docker-compose up -d provisions services (API, DB, Redis), internal bridge networks, and volumes simultaneously with a single command.",
      code: "version: '3.8'\nservices:\n  api:\n    build: .\n    ports: ['5000:5000']\n    environment: [DATABASE_URL=postgres://db:5432/dokani]\n  db:\n    image: postgres:15-alpine\n    volumes: [pgdata:/var/lib/postgresql/data]\nvolumes:\n  pgdata:"
    },
    {
      lvl: "lvl1",
      q: "Docker Volume এবং Bind Mount-এর মধ্যে পার্থক্য কী এবং ডেটাবেজ ডেটা টিকিয়ে রাখতে কোনটি ব্যবহার করবে?",
      m: "(১) `Bind Mount`: হোস্ট মেশিনের একটি নির্দিষ্ট পরম পাথকে (যেমন `./src`) কন্টেইনারের ভেতরের ফোল্ডারে মাউন্ট করে (লোকাল ডেভেলপমেন্টে লাইভ কোড রিলোডের জন্য আদর্শ)। (২) `Docker Volume`: ডকার ইঞ্জিন দ্বারা সম্পূর্ণ পরিচালিত একটি ডেডিকেটেড স্টোরেজ স্পেস (`/var/lib/docker/volumes/`)। এটি হোস্টের ওএস বা ফাইল সিস্টেমের ওপর নির্ভরশীল নয় এবং পারফরম্যান্স অত্যন্ত দ্রুত। ডেটাবেজ (PostgreSQL/MongoDB)-এর ডেটা কন্টেইনার ডিলিট হলেও চিরতরে টিকিয়ে রাখতে সবসময় `Docker Volume` ব্যবহার করতে হবে।",
      b: "বাইন্ড মাউন্ট হোস্টের নির্দিষ্ট ফোল্ডার কন্টেইনারে ম্যাপ করে (লোকাল কোডিংয়ের জন্য সেরা)। ডকার ভলিউম ডকার ইঞ্জিন দিয়ে পরিচালিত নিরাপদ স্টোরেজ যা ডেটাবেজের ডেটা স্থায়ীভাবে সংরক্ষণের জন্য ব্যবহৃত হয়।",
      e: "Bind Mounts bind a specific host folder path directly into the container (ideal for hot-reloading code during local dev). Named Docker Volumes are isolated and managed entirely by the Docker storage engine, providing high performance and persistence for production databases.",
      code: "# Named volume persistence for PostgreSQL:\nvolumes:\n  - postgres_data:/var/lib/postgresql/data"
    },
    {
      lvl: "lvl1",
      q: "Docker Layer Caching কী এবং Dockerfile-এ কেন `package.json` আগে কপি করা হয়?",
      m: "Dockerfile-এর প্রতিটি কমান্ড (`RUN`, `COPY`) একটি রিড-অনলি লেয়ার তৈরি করে। ডকার বিল্ড করার সময় যদি দেখে কোনো ফাইলের পরিবর্তন হয়নি, তবে সে পূর্বের ক্যাশ করা লেয়ার ব্যবহার করে। আমরা যদি সোর্স কোডের সাথে একবারে `COPY . .` করে `npm install` চালাই, তবে কোডে এক লাইন বদলালেও ডকার প্রতিবার ক্যাশ ভেঙে ৫ মিনিট ধরে সব প্যাকেজ নতুন করে ডাউনলোড করবে! বেস্ট প্র্যাকটিস: প্রথমে শুধুমাত্র `COPY package*.json ./` করে `RUN npm install` চালানো, তারপর সোর্স কোড কপি করা। এর ফলে কোড পরিবর্তন হলেও ডিপেনডেন্সি লেয়ার ক্যাশ থেকে মাত্র ২ সেকেন্ডে বিল্ড সম্পন্ন হয়।",
      b: "ডকার লেয়ার ক্যাশিং বিল্ডের সময় বাঁচায়। package.json আগে কপি করে npm install করলে কোড পরিবর্তনের সময় ডিপেনডেন্সি পুনরায় ডাউনলোড না হয়ে ক্যাশ থেকে সাথে সাথে কাজ শেষ হয়।",
      e: "Docker caches intermediate build layers. Copying package.json independently before source files ensures npm install executes only when dependencies change. When developers modify source code, Docker reuses the cached node_modules layer, accelerating builds from minutes to seconds.",
      code: "COPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build"
    },

    // --- LEVEL 2 (5 Questions) ---
    {
      lvl: "lvl2",
      q: "Node.js ও Next.js অ্যাপ্লিকেশনের জন্য Multi-Stage Docker Build কীভাবে ইমেজ সাইজ ১GB থেকে ৮০MB-তে নামিয়ে আনে?",
      m: "সাধারণ সিঙ্গেল-স্টেজ ডকার ইমেজে পুরো সোর্স কোড, TypeScript কম্পাইলার, এবং সব `devDependencies` থেকে যায়—যার ফলে ইমেজ সাইজ ১.২ গিগাবাইট ছাড়িয়ে যায় এবং সিকিউরিটি রিস্ক বাড়ে। Multi-Stage Build-এ আমরা একাধিক `FROM` ব্লক ব্যবহার করি: (১) `Builder Stage`: ফুল নোড ইমেজ নিয়ে কোড বিল্ড ও কম্পাইল করি। (২) `Production Runner Stage`: একটি অত্যন্ত ক্ষুদ্র `node:alpine` বা `distroless` ইমেজ নিই এবং বিল্ডার স্টেজ থেকে শুধুমাত্র কম্পাইল করা `dist/` ফোল্ডার এবং প্রোডাকশন প্যাকেজগুলো (`node_modules`) কপি করি। ডেভেলপমেন্টের কোনো টুলস বা কম্পাইলার প্রোডাকশন ইমেজে যায় না। ফলে ইমেজ সাইজ ১.২GB থেকে ৮০MB-তে নেমে আসে এবং এক্সপ্লয়েট সারফেস শূন্য হয়ে যায়।",
      b: "মাল্টি-স্টেজ বিল্ডে বিল্ডার স্টেজে সোর্স কোড কম্পাইল করা হয় এবং রানার স্টেজে ক্ষুদ্র আলপাইন ইমেজে শুধু বিল্ড ফাইল ও প্রোডাকশন মডিউল কপি করা হয়। ফলে ইমেজের আকার ১GB থেকে ৮০MB তে নেমে আসে।",
      e: "Multi-stage builds utilize multiple FROM stages. The 'builder' stage installs devDependencies and compiles TypeScript; the final 'runner' stage uses a stripped node:alpine base, copying strictly the compiled dist artifacts and production dependencies. This shrinks image footprints by 90% while hardening security.",
      code: "# Multi-stage Dockerfile:\nFROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM node:20-alpine AS runner\nWORKDIR /app\nENV NODE_ENV=production\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY --from=builder /app/dist ./dist\nUSER node\nCMD [\"node\", \"dist/main.js\"]"
    },
    {
      lvl: "lvl2",
      q: "ডকার কন্টেইনারে `root` ইউজার হিসেবে অ্যাপ চালানো কেন ঝুঁকিপূর্ণ এবং নন-রুট ইউজার কীভাবে এনফোর্স করবে?",
      m: "বাই-ডিফল্ট ডকার কন্টেইনারের ভেতরের প্রসেস `root` ইউজার হিসেবে রান করে। যদি কোনো হ্যাকার আপনার অ্যাপের ভালনারেবিলিটি বা রিমোট কোড এক্সিকিউশন (RCE) দিয়ে কন্টেইনার ব্রেকআউট (Container Escape) করতে পারে, তবে সে হোস্ট সার্ভারেরও পূর্ণ রুট অ্যাক্সেস পেয়ে পুরো সার্ভার হ্যাক করে ফেলবে! বেস্ট প্র্যাকটিস: Dockerfile-এর শেষে ডেডিকেটেড নন-রুট ইউজারে সুইচ করা। নোড আলপাইন ইমেজে বিল্ট-ইন `node` ইউজার থাকে। ফাইল পারমিশন ঠিক করে `USER node` নির্দেশ দেওয়া উচিত।",
      b: "কন্টেইনারে রুট ইউজার হিসেবে অ্যাপ চালালে হ্যাকার কন্টেইনার ভেঙে মূল সার্ভারের নিয়ন্ত্রণ পেয়ে যেতে পারে। Dockerfile-এ USER node দিয়ে নন-রুট প্রিভিলেজে অ্যাপ রান করানো বাধ্যতামূলক।",
      e: "Running containers as root poses container-escape privileges hazards where attackers gain root access to the host server. Mitigate by dropping root privileges via USER node (or creating dedicated unprivileged system users) before executing CMD instructions.",
      code: "RUN chown -R node:node /app\nUSER node\nCMD [\"node\", \"dist/server.js\"]"
    },
    {
      lvl: "lvl2",
      q: "Docker Network Architecture: Bridge Network কীভাবে দুটি কন্টেইনারের মধ্যে সার্ভিস ডিসকভারি ও ডিএনএস রেজোলিউশন নিশ্চিত করে?",
      m: "যখন কন্টেইনারগুলো একটি কাস্টম User-defined Bridge Network-এ যুক্ত থাকে (যেমন Docker Compose-এ স্বয়ংক্রিয়ভাবে তৈরি হয়), তখন ডকার একটি এমবেডেড DNS সার্ভার চালু করে (`127.0.0.11`)। ফলে কন্টেইনারগুলোকে কোনো অস্থির আইপি দিয়ে খুঁজতে হয় না—তারা সরাসরি সার্ভিসের নাম (Service Name) দিয়ে যোগাযোগ করতে পারে! যেমন: Node.js ব্যাকএন্ড ডাটাবেজ কানেক্ট করার জন্য সরাসরি হোস্ট হিসেবে `postgres://user:pass@db:5432/dokani` ব্যবহার করতে পারে, যেখানে `db` হলো ডাটাবেজ কন্টেইনারের নাম। ডকার ইন্টারনালি এই নামটিকে কন্টেইনারের প্রাইভেট আইপিতে রিজলভ করে দেয়।",
      b: "ডকার ব্রিজ নেটওয়ার্কে এমবেডেড DNS সার্ভার থাকে। ফলে কন্টেইনারগুলো কোনো আইপি অ্যাড্রেস ছাড়াই সরাসরি একে অপরের সার্ভিসের নাম (যেমন db, redis) দিয়ে যোগাযোগ করতে পারে।",
      e: "User-defined Docker Bridge Networks run an embedded DNS daemon (127.0.0.11) enabling automated service discovery. Containers resolve sister services by container or service name (e.g. connecting to db:5432) rather than ephemeral internal IP addresses.",
      code: "networks:\n  dokani-net:\n    driver: bridge"
    },
    {
      lvl: "lvl2",
      q: "Dockerfile-এ `.dockerignore` ফাইলের গুরুত্ব কী এবং এটি না রাখলে কী ধরনের বিপর্যয় ঘটতে পারে?",
      m: "`.dockerignore` ডকার বিল্ড কনটেক্সট থেকে নির্দিষ্ট ফাইল ও ফোল্ডার বাদ দেয়। যদি এটি না থাকে: (১) আপনার লোকাল মেশিনের বিশাল `node_modules` ডকার ডেমন-এ কপি হবে যা বিল্ড টাইম ১০ গুণ ধীর করে দেবে এবং হোস্ট ওএস-এর বাইনারি (যেমন Mac/Windows-এ তৈরি হওয়া বাইনারি) লিনাক্স কন্টেইনারে ঢুকে ক্র্যাশ করবে! (২) আপনার গোপন `.env` ফাইল ডকার ইমেজের লেয়ারে পার্মানেন্টলি ঢুকে যাবে—যার ফলে ইমেজটি ডকারহাবে পুশ করলে যে কেউ আপনার ডাটাবেজ পাসওয়ার্ড পেয়ে যাবে! তাই `.dockerignore`-এ `node_modules`, `.git`, এবং `.env` থাকা বাধ্যতামূলক।",
      b: ".dockerignore ফাইল লোকাল node_modules এবং সংবেদনশীল .env ফাইলকে ডকার ইমেজে কপি হওয়া থেকে আটকায়। এটি না রাখলে বিল্ড মারাত্মক স্লো হয় এবং গোপনীয় পাসওয়ার্ড ফাঁস হয়ে যায়।",
      e: ".dockerignore strips files from the Docker build context. Omitting it uploads bulky local node_modules (causing architecture binary mismatches on Alpine) and bakes sensitive .env secrets into public image layers. Always ignore node_modules, .git, and .env.",
      code: "# .dockerignore:\nnode_modules\n.git\n.env\n*.md\ndist"
    },
    {
      lvl: "lvl2",
      q: "Docker Container `HEALTHCHECK` নির্দেশনা কী এবং এটি অরফেস্ট্রেটর ও ডকার কম্পোজকে কীভাবে সুরক্ষিত রাখে?",
      m: "শুধু কন্টেইনার প্রসেস রানিং থাকা মানেই অ্যাপ সুস্থ থাকা নয় (অ্যাপ ভেতর থেকে মেমোরি লিকে ডেডলক হয়ে ইন্টারনালি হ্যাং করতে পারে)। `HEALTHCHECK` নির্দেশনা ডকার ইঞ্জিনকে নির্দিষ্ট সময় পর পর (যেমন প্রতি ৩০ সেকেন্ডে) কন্টেইনারের ভেতরের একটি এন্ডপয়েন্ট পিং করার নির্দেশ দেয় (যেমন `curl -f http://localhost:5000/api/health || exit 1`)। যদি ৩ বার চেক ফেইল করে, ডকার কন্টেইনারটির স্ট্যাটাস `(healthy)` থেকে বদলে `(unhealthy)` করে দেয়। ফলে Nginx রিভার্স প্রক্সি বা অর্কেস্ট্রেটর ট্রাফিক পাঠানো বন্ধ করে এবং কন্টেইনারটি অটো-রিস্টার্ট করতে পারে।",
      b: "HEALTHCHECK ডকারকে নির্দিষ্ট সময় পর পর অ্যাপের হেলথ এপিআই পরীক্ষা করার নির্দেশ দেয়। অ্যাপ ভেতর থেকে হ্যাং করলে এটি স্ট্যাটাস আন-হেলদি করে দেয় যাতে অর্কেস্ট্রেটর অ্যাপটিকে স্বয়ংক্রিয়ভাবে রিস্টার্ট করতে পারে।",
      e: "HEALTHCHECK periodically verifies container operational viability rather than simple process existence (e.g. curling /health). If health probes fail repeatedly, Docker marks the container unhealthy, signaling upstream orchestrators to stop routing traffic and trigger replacement.",
      code: "HEALTHCHECK --interval=30s --timeout=5s --retries=3 \\\n  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/health || exit 1"
    },

    // --- LEVEL 3 (5 Questions) ---
    {
      lvl: "lvl3",
      q: "Docker Container Logging Best Practices: কন্টেইনার লগ যাতে পুরো সার্ভার ডিস্ক না ভরায় সেজন্য `json-file` লগ ড্রাইভার কীভাবে টিউন করবে?",
      m: "কন্টেইনারের সমস্ত কনসোল আউটপুট (`console.log`) ডকার ডিফল্টভাবে সার্ভার ডিস্কে JSON ফাইল হিসেবে জমায়। যদি কোনো লিমিট না দেওয়া থাকে, তবে হাই-ট্রাফিক এপিআই কয়েক সপ্তাহের মধ্যে ৫০GB লগ জমিয়ে পুরো হোস্ট ওএস ডাউন করে দেবে। প্রোডাকশন সলিউশন: `/etc/docker/daemon.json` বা Docker Compose-এ `logging` অপশনে সাইজ ও ফাইল সংখ্যা কঠোরভাবে বেঁধে দেওয়া: `max-size: \"50m\"` এবং `max-file: \"3\"`। এর ফলে একটি লগ ফাইল ৫০MB হলেই স্বয়ংক্রিয়ভাবে রোটেট হবে এবং সর্বোচ্চ ৩টি ফাইল থাকবে, ডিস্ক স্পেস সবসময় নিরাপদ থাকবে।",
      b: "ডকার লগ ডিস্ক ভর্তি করে সার্ভার যাতে ক্র্যাশ না করায় সেজন্য max-size: 50m এবং max-file: 3 কনফিগার করা হয়। এতে লগ ফাইল নির্দিষ্ট সাইজের পর অটো-রোটেট হয়।",
      e: "Unchecked container stdout json-file logging saturates host storage. Enforce log rotation globally in /etc/docker/daemon.json or per-service in Compose using max-size: '50m' and max-file: '3', bounding maximum disk usage deterministically.",
      code: "services:\n  api:\n    logging:\n      driver: \"json-file\"\n      options:\n        max-size: \"50m\"\n        max-file: \"3\""
    },
    {
      lvl: "lvl3",
      q: "Docker Container Zombie Processes এবং PID 1 Init Problem: কেন ডকার কন্টেইনারে `tini` বা `dumb-init` ব্যবহার করা হয়?",
      m: "লিনাক্সে PID 1 প্রসেসের বিশেষ দায়িত্ব থাকে: চাইল্ড প্রসেস টার্মিনেট হলে তাদের রিক্লেইম করা (Reaping zombie processes) এবং `SIGTERM` সিগন্যাল সব চাইল্ড প্রসেসে পৌঁছে দেওয়া। Node.js নিজে PID 1 হিসেবে রান করার জন্য ডিজাইন করা হয়নি; ফলে Node.js `SIGTERM` পেলেও অনেক সময় চাইল্ড প্রসেসগুলোকে বন্ধ না করে জম্বি প্রসেস হিসেবে ঝুলিয়ে রাখে। সমাধান: একটি অতিক্ষুদ্র Init সিস্টেম যেমন `tini` বা `dumb-init` ব্যবহার করা (`ENTRYPOINT [\"/sbin/tini\", \"--\", \"node\", \"dist/main.js\"]`) অথবা Dockerfile-এ `--init` ফ্ল্যাগ দিয়ে রান করা। এটি নিখুঁতভাবে সিগন্যাল প্রপাগেশন ও গ্রেসফুল শাটডাউন নিশ্চিত করে।",
      b: "নোড.জেএস লিনাক্সের PID 1 এর মতো জম্বি প্রসেস ক্লিন করতে পারে না। tini বা dumb-init ব্যবহার করলে কন্টেইনার গ্রেসফুল শাটডাউন সিগন্যাল সঠিকভাবে পায় এবং ব্যাকগ্রাউন্ডে মেমোরি লিকিং জম্বি প্রসেস তৈরি হওয়া রোধ হয়।",
      e: "Node.js was not engineered to act as Linux init PID 1; it neglects zombie child reaping and mismanages kernel SIGTERM signal forwarding. Wrapping the entrypoint in an ultra-light init wrapper like tini or dumb-init guarantees flawless process reaping and graceful shutdown.",
      code: "RUN apk add --no-cache tini\nENTRYPOINT [\"/sbin/tini\", \"--\"]\nCMD [\"node\", \"dist/server.js\"]"
    },
    {
      lvl: "lvl3",
      q: "Docker Security Hardening: `read_only` রুট ফাইলসিস্টেম, `cap_drop: ALL` এবং `no-new-privileges` কীভাবে কন্টেইনারকে বুলেপ্রুফ করে?",
      m: "এন্টারপ্রাইজ কন্টেইনার সিকিউরিটির ৩টি মূল স্তম্ভ: (১) `cap_drop: [ALL]`: লিনাক্স কার্নেলের সমস্ত অপ্রয়োজনীয় প্রিভিলেজ (যেমন নেটওয়ার্ক ইন্টারফেস বদলানো, র-সকেট এক্সেস) ড্রপ করে দেওয়া। (২) `security_opt: [\"no-new-privileges:true\"]`: কন্টেইনারের ভেতরের কোনো প্রসেস যেন `setuid` দিয়ে অতিরিক্ত অধিকার না পায় তা নিশ্চিত করা। (৩) `read_only: true`: কন্টেইনারের রুট ফাইলসিস্টেমকে রিড-অনলি লক করে দেওয়া—যাতে কোনো আক্রমণকারী ভেতরে কোনো ম্যালওয়্যার ফাইল ডাউনলোড বা এক্সিকিউট করতে না পারে (প্রয়োজনীয় টেম্পোরারি রাইটের জন্য শুধু মেমোরি মাউন্ট `tmpfs: /tmp` দেওয়া হয়)।",
      b: "কন্টেইনার সুরক্ষিত করতে cap_drop: ALL দিয়ে সমস্ত অপ্রয়োজনীয় কার্নেল পারমিশন বাতিল করা হয়, no-new-privileges দিয়ে ক্ষমতা বৃদ্ধি ঠেকানো হয় এবং read_only ফাইলসিস্টেম করে ম্যালওয়্যার ডাউনলোড পুরোপুরি বন্ধ করা হয়।",
      e: "Harden production containers against zero-day exploits by dropping all Linux capabilities (cap_drop: ALL), prohibiting privilege escalation (no-new-privileges: true), and enforcing an immutable read_only root filesystem with ephemeral memory tmpfs mounts for /tmp.",
      code: "services:\n  secure-api:\n    image: dokani-api:latest\n    read_only: true\n    tmpfs: ['/tmp']\n    security_opt:\n      - no-new-privileges:true\n    cap_drop:\n      - ALL"
    },
    {
      lvl: "lvl3",
      q: "Docker Swarm বনাম Kubernetes: আর্কিটেকচারাল জটিলতা এবং কখন ডকার সোয়ার্ম যথেষ্ট?",
      m: "Kubernetes হলো একটি অত্যন্ত শক্তিশালী কিন্তু বিশাল ও জটিল কন্টেইনার অর্কেস্ট্রেশন সিস্টেম (এতে Control Plane, Etcd, Kubelet, CNI প্লাগইন, জটিল YAML ও হাই ক্লাউড ওভারহেড থাকে—যা ছোট টিমের জন্য ওভারকিল)। `Docker Swarm` হলো ডকারেরই বিল্ট-ইন নেটিভ অর্কেস্ট্রেটর। সুবিধা: কোনো অতিরিক্ত কনফিগারেশন ছাড়াই সিঙ্গেল কমান্ডে (`docker swarm init`) একাধিক নোডের ক্লাস্টার তৈরি হয়, স্বয়ংক্রিয় লোড ব্যালেন্সিং, রোলিং আপডেট এবং ডকার কম্পোজ ফাইলের সাথে ১০০% কম্প্যাটিবল। ২০-৩০টি মাইক্রোসার্ভিস বা মধ্যম আকারের SaaS-এর জন্য ডকার সোয়ার্ম বা সাধারণ Docker Compose পরিচালনা করা শত গুণ সহজ ও সাশ্রয়ী।",
      b: "কুবারনেটিস বিশাল ও জটিল। ডকার সোয়ার্ম ডকারের বিল্ট-ইন ক্লাস্টার অর্কেস্ট্রেটর যা কোনো বাড়তি জটিলতা ছাড়াই লোড ব্যালেন্সিং ও রোলিং আপডেট দেয়। মাঝারি আকারের প্রজেক্টের জন্য সোয়ার্ম অনেক বেশি সহজ ও কার্যকর।",
      e: "Kubernetes is an industrial-grade container orchestrator with severe configuration and cognitive overhead. Docker Swarm provides native multi-node clustering, declarative rolling updates, and mesh routing baked directly into the Docker CLI, offering 90% of orchestration needs at 10% of operational complexity.",
      tip: "বলো: 'We evaluate team operational maturity: Docker Swarm or Compose excels for mid-scale SaaS before escalating to Kubernetes.'"
    },
    {
      lvl: "lvl3",
      q: "Docker Image Scanning ও Vulnerability Auditing (Trivy / Docker Scout) কীভাবে CI/CD পাইপলাইনে গেটকিপার হিসেবে বসাবে?",
      m: "ইন্টারনেটের বেস ইমেজগুলোতে (যেমন `node:18`) প্রায়ই কার্নেল ও লাইব্রেরির পুরনো সিকিউরিটি বাগ বা CVE থাকে। আমরা GitHub Actions পাইপলাইনে `Trivy` বা `Docker Scout` বসাই। ইমেজ বিল্ড হওয়ার পর ট্রাইভি পুরো কন্টেইনার ও তার ওএস প্যাকেজ স্ক্যান করে। যদি কোনো `CRITICAL` বা `HIGH` ভালনারেবিলিটি পায়, তবে সে `exit code 1` দিয়ে বিল্ড ফেইল করায় এবং ডিপ্লয়মেন্ট আটকে দেয়। এটি নিশ্চিত করে যে কোনো পরিচিত সিকিউরিটি হোল সহ কোনো কন্টেইনার কখনোই প্রোডাকশনে পৌঁছাতে পারবে না।",
      b: "Trivy বা Docker Scout দিয়ে CI/CD তে ডকার ইমেজ স্ক্যান করা হয়। কোনো ক্রিটিক্যাল সিকিউরিটি বাগ ধরা পড়লে এটি স্বয়ংক্রিয়ভাবে বিল্ড ফেইল করে ক্ষতিকর ইমেজ প্রোডাকশনে যাওয়া প্রতিরোধ করে।",
      e: "Integrate Trivy or Docker Scout into CI/CD pipelines to scan container layers against the National Vulnerability Database. The scanner evaluates CVE severity; any HIGH or CRITICAL vulnerability aborts the pipeline, preventing vulnerable containers from reaching production registries.",
      code: "- name: Scan image with Trivy\n  uses: aquasecurity/trivy-action@master\n  with:\n    image-ref: 'dokani-api:${{ github.sha }}'\n    severity: 'CRITICAL,HIGH'\n    exit-code: '1'"
    },

    // --- SITUATION BASED (5 Questions) ---
    {
      lvl: "situation",
      q: "পরিস্থিতি: Next.js বা Node.js অ্যাপ্লিকেশনের Docker ইমেজ সাইজ বিল্ড করার পর ১.৫GB হয়ে গেছে। ক্লাউড সার্ভারে ইমেজ পুল ও ডিপ্লয় হতে ১০ মিনিট সময় লাগছে! কীভাবে ইমেজ সাইজ ১০০MB-র নিচে নামাবে?",
      m: "সমাধানের ধাপ: (১) সবার আগে Multi-Stage Build প্রয়োগ করব। (২) বেস ইমেজ হিসেবে ভারী `node:20` বাদ দিয়ে লাইটওয়েট `node:20-alpine` ব্যবহার করব। (৩) বিল্ড স্টেজে `npm ci` দিয়ে সব প্যাকেজ ইন্সটল করে `next build` চালাব। (৪) `next.config.js`-এ `output: 'standalone'` কনফিগার করব—যা নেক্সট.জেএস-কে নির্দেশ করে শুধুমাত্র প্রয়োজনীয় রানটাইম ফাইলগুলো একটি স্বয়ংসম্পূর্ণ মিনিমাল ফোল্ডারে বানাতে। (৫) রানার স্টেজে শুধুমাত্র standalone আর্টিক্ট কপি করব। ইমেজ সাইজ ১.৫GB থেকে কমে মাত্র ৬৫MB-তে চলে আসবে এবং ডিপ্লয়মেন্ট হবে নিমেষে!",
      b: "node:alpine বেস ইমেজ, Multi-stage build এবং নেক্সট.জেএসে output: 'standalone' ব্যবহার করে অপ্রয়োজনীয় কোড বাদ দেব। এতে ইমেজ সাইজ ১.৫GB থেকে ৬৫MB তে নেমে আসবে।",
      e: "Enable output: 'standalone' in next.config.js to isolate execution dependencies. In the Dockerfile, switch to node:alpine, adopt a multi-stage architecture, and copy strictly the generated standalone server payload to reduce image weight from 1.5GB to under 70MB.",
      code: "// next.config.js:\nmodule.exports = { output: 'standalone' };\n// Runner stage in Dockerfile:\nCOPY --from=builder /app/.next/standalone ./\nCOPY --from=builder /app/.next/static ./.next/static"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: লোকাল মেশিনে `docker-compose up` দেওয়ার পর নোড এপিআই কন্টেইনার ক্র্যাশ করছে এবং লগ দেখাচ্ছে: `PrismaClientInitializationError: Can't reach database server at db:5432`। ডেটাবেজ কন্টেইনার রানিং থাকা সত্ত্বেও কেন এটি ঘটছে এবং কীভাবে ফিক্স করবে?",
      m: "সমস্যার কারণ: `depends_on: [db]` শুধু নির্দেশ করে যে ডেটাবেজ কন্টেইনার প্রসেস শুরু হয়েছে, কিন্তু PostgreSQL ডেটাবেজ রেডি হয়ে পোর্ট ওপেন করতে ৩-৪ সেকেন্ড সময় নেয়! নোড এপিআই ডেটাবেজ বুট হওয়ার আগেই কানেক্ট করতে গিয়ে ফেইল করেছে। ফিক্স: (১) ডেটাবেজ সার্ভিসে একটি `healthcheck` যোগ করতে হবে (`test: [\"CMD-SHELL\", \"pg_isready -U postgres\"]`)। (২) এপিআই সার্ভিসের `depends_on`-এ কন্ডিশন দিতে হবে: `condition: service_healthy`। এর ফলে ডেটাবেজ শতভাগ রেডি হওয়ার পরই কেবল নোড এপিআই স্টার্ট হবে।",
      b: "ডেটাবেজ কন্টেইনার চালু হলেও পোস্টগ্রেস পোর্ট রেডি হতে সময় নেয়। pg_isready দিয়ে হেলথচেক বসিয়ে depends_on: condition: service_healthy দিলে ডাটাবেজ পুরোপুরি প্রস্তুত হওয়ার পরই কেবল এপিআই চালু হবে।",
      e: "depends_on only waits for container creation, not database engine readiness. Configure a pg_isready healthcheck on the database service and declare depends_on: db: condition: service_healthy on the API service to guarantee socket readiness before starting.",
      code: "services:\n  db:\n    image: postgres:15-alpine\n    healthcheck:\n      test: [\"CMD-SHELL\", \"pg_isready -U postgres\"]\n      interval: 5s\n      retries: 5\n  api:\n    depends_on:\n      db:\n        condition: service_healthy"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: তুমি ডকার কন্টেইনার রিস্টার্ট দেওয়ার পর দেখলে ডেটাবেজের সমস্ত ইউজারের ডেটা ও টেবিল মুছে গেছে এবং ডেটাবেজ সম্পূর্ণ ফাঁকা হয়ে গেছে! কেন এটি ঘটল এবং কীভাবে স্থায়ী সমাধান করবে?",
      m: "ভয়াবহ ভুল: ডেটাবেজ কন্টেইনারে কোনো Persistent Docker Volume মাউন্ট করা হয়নি! ডকার কন্টেইনারের অভ্যন্তরীণ ফাইলসিস্টেম হলো সম্পূর্ণ ক্ষণস্থায়ী (Ephemeral); ফলে কন্টেইনার ডিলিট বা রিস্টার্ট হলে তার ভেতরের সমস্ত আন-মাউন্টেড ডেটা চিরতরে মুছে যায়। স্থায়ী সমাধান: Docker Compose-এ একটি Named Volume ডিফাইন করে ডেটাবেজের ডেটা ডিরেক্টরিতে মাউন্ট করতে হবে (`postgres_data:/var/lib/postgresql/data`)। এর ফলে কন্টেইনার ধ্বংস হলেও ডিস্কের মূল ভলিউমে ডেটা আজীবন অক্ষত ও নিরাপদ থাকবে।",
      b: "কন্টেইনারের ভেতরের ফাইল অস্থায়ী। ভলিউম মাউন্ট না করায় কন্টেইনার বন্ধের সাথে সাথে ডেটা মুছে গেছে। ডকার কম্পোজে Named Volume (postgres_data:/var/lib/postgresql/data) মাউন্ট করলে ডেটা চিরতরে সংরক্ষিত থাকে।",
      e: "Container root filesystems are ephemeral by design. Running database images without persistent volumes wipes storage upon recreation. Attach a persistent Docker Named Volume to /var/lib/postgresql/data to preserve state across container lifecycles.",
      code: "services:\n  db:\n    image: postgres:15-alpine\n    volumes:\n      - pgdata:/var/lib/postgresql/data\nvolumes:\n  pgdata: # Persistent on host disk"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: Docker কন্টেইনারের ভেতরে চলা নোড অ্যাপে ফাইল আপলোড বা ক্যাশ লেখার সময় এরর আসছে: `EACCES: permission denied, open '/app/uploads/avatar.png'`। কোডে কোথাও বাগ নেই। সমস্যাটি কোথায়?",
      m: "সমস্যার কারণ: আপনি Dockerfile-এ সিকিউরিটির জন্য `USER node` (নন-রুট ইউজার) ব্যবহার করেছেন, কিন্তু `/app/uploads` ডিরেক্টরিটি যখন তৈরি করা হয়েছিল তখন তার মালিকানা ছিল `root` ইউজারের কাছে! ফলে `node` ইউজার সেখানে কোনো ফাইল লেখার পারমিশন পাচ্ছে না। সমাধান: `USER node`-এ সুইচ করার ঠিক আগে ডিরেক্টরিটি তৈরি করে তার ওনারশিপ `node:node`-কে দিতে হবে: `RUN mkdir -p /app/uploads && chown -R node:node /app/uploads`। এরপর অ্যাপ নির্বিঘ্নে ফাইল লিখতে পারবে।",
      b: "ডিরেক্টরির মালিক ছিল root ইউজার, কিন্তু অ্যাপ চলছিল node ইউজার দিয়ে। USER node এ যাওয়ার আগে chown -R node:node চালিয়ে ফোল্ডারের মালিকানা পরিবর্তন করলেই পারমিশন এরর দূর হয়।",
      e: "The uploads directory was provisioned by root during image build, denying write permissions to the non-root USER node. Remediate by explicitly creating the target directory and assigning recursive ownership via chown -R node:node before switching execution users.",
      code: "RUN mkdir -p /app/uploads && chown -R node:node /app/uploads\nUSER node\nCMD [\"node\", \"dist/server.js\"]"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: একটি ডকারাইজড অ্যাপ্লিকেশন হোস্ট মেশিনে রান করার পর ব্রাউজারে `http://localhost:5000` দিয়ে কোনোভাবেই অ্যাক্সেস পাওয়া যাচ্ছে না (`Connection Refused`), যদিও কন্টেইনার লগ বলছে `Server running on port 5000`! কী কী চেক করবে?",
      m: "চেকলিস্ট: (১) `Port Mapping`: `docker run` বা compose-এ পোর্ট এক্সপোজ ও ম্যাপ করা হয়েছে কি না (`-p 5000:5000`)। (২) সবচেয়ে কমন ভুল: Node.js সার্ভারটি `localhost` বা `127.0.0.1`-এ লিসেন করছে! কন্টেইনারের ভেতরে `localhost` মানে শুধু কন্টেইনারের ভেতরের লোকাল লুপব্যাক ইন্টারফেস; বাইরের কোনো ট্রাফিক সেখানে ঢুকতে পারে না। নোড অ্যাপের সার্ভার লিসেন ইন্টারফেস অবশ্যই `0.0.0.0` (All network interfaces) করতে হবে: `app.listen(5000, '0.0.0.0')`। (৩) হোস্ট ফায়ারওয়াল UFW-তে পোর্ট ব্লক আছে কি না।",
      b: "কন্টেইনারের ভেতর অ্যাপকে 127.0.0.1 এর বদলে 0.0.0.0 আইপিতে লিসেন করাতে হবে এবং ডকারে -p 5000:5000 পোর্ট ম্যাপিং নিশ্চিত করতে হবে। অন্যথায় বাইরের রিকোয়েস্ট কন্টেইনারে ঢুকতে পারে না।",
      e: "Verify port mapping (-p 5000:5000). Crucially, ensure the Node.js HTTP server binds to 0.0.0.0 rather than 127.0.0.1. Binding to localhost limits listening strictly to the container loopback interface, dropping all incoming packets forwarded from the host.",
      code: "// Express server configuration:\nconst PORT = process.env.PORT || 5000;\napp.listen(PORT, '0.0.0.0', () => console.log(`Listening on 0.0.0.0:${PORT}`));"
    },

    // --- REAL WORLD (5 Questions) ---
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা (Dokani SaaS): Dokani-র সম্পূর্ণ স্ট্যাক (Next.js Frontend, Node Backend, PostgreSQL, Redis, Nginx) কীভাবে প্রোডাকশন Docker Compose দিয়ে অর্কেস্ট্রেট করা হয়েছে?",
      m: "দোকানিতে একটি প্রোডাকশন-গ্রেড `docker-compose.prod.yml` কার্যকর: (১) সমস্ত সার্ভিস একটি প্রাইভেট আইসোলেটেড ব্রিজ নেটওয়ার্কে (`dokani-internal`) সংযুক্ত থাকে। (২) শুধুমাত্র `Nginx` কন্টেইনারের ৮০ ও ৪৪৩ পোর্ট হোস্টে এক্সপোজ থাকে; ব্যাকএন্ড এপিআই, ডাটাবেজ বা রেডিসের কোনো পোর্ট ইন্টারনেটে সরাসরি উন্মুক্ত থাকে না। (৩) Nginx অভ্যন্তরীণ ডকার DNS দিয়ে `api:5000` এবং `frontend:3000`-এ ট্রাফিক রিভার্স প্রক্সি করে। (৪) ডেটাবেজ ও রেডিসের জন্য এনক্রিপ্টেড নেমড ভলিউম থাকে। (৫) প্রতিটি সার্ভিসে `restart: always` এবং হেলথচেক নিশ্চিত করা থাকে। ফলে একক সার্ভারে একটি এন্টারপ্রাইজ মাইক্রো-ক্লাস্টার নিখুঁতভাবে পরিচালিত হয়।",
      b: "দোকানিতে Nginx ছাড়া কোনো সার্ভিসের পোর্ট ইন্টারনেটে খোলা থাকে না। সমস্ত সার্ভিস অভ্যন্তরীণ ব্রিজ নেটওয়ার্কে সংযুক্ত থাকে এবং Nginx অভ্যন্তরীণ ডকার ডিএনএস দিয়ে ট্রাফিক রাউট করে। ভলিউম ও অটো-রিস্টার্ট দিয়ে সর্বোচ্চ স্ট্যাবিলিটি নিশ্চিত করা হয়েছে।",
      e: "Dokani POS orchestrates its multi-tier stack via production Compose: an isolated bridge network protects the internal tiers while strictly exposing Nginx (ports 80/443). Nginx routes traffic internally to api:5000 and frontend:3000 over Docker DNS, safeguarding persistent databases behind named volumes.",
      tip: "দোকানির এই আর্কিটেকচারাল ডিজাইন (Nginx as sole public gateway, DB/API isolated on internal network) ইন্টারভিউতে খুব প্রশংসিত হয়।"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: জিরো-ডাউনটাইম ডিপ্লয়মেন্টে Docker Compose Rolling Restart বা Blue-Green ডিপ্লয় কীভাবে সম্পন্ন করবে?",
      m: "সরাসরি `docker-compose down && docker-compose up` চালালে ৫-১০ সেকেন্ডের জন্য সাইট ডাউন হয়ে যায়। সমাধান: (১) `Blue-Green Deployment`: Nginx-এর সামনে দুটি এপিআই কন্টেইনার সার্ভিস থাকে (`api_blue` এবং `api_green`)। (২) নতুন কোড আসলে আমরা গ্রিন কন্টেইনারে নতুন ইমেজ বিল্ড ও স্টার্ট করি। (৩) গ্রিন কন্টেইনারের হেলথচেক পাস করলে Nginx কনফিগে আপস্ট্রিম পয়েন্টার এক সেকেন্ডে ব্লু থেকে গ্রিনে সুইচ করে `nginx -s reload` দিই। (৪) এরপর পুরনো ব্লু কন্টেইনার বন্ধ করি। ইউজাররা কোনো ড্রপ বা ডাউনটাইম ছাড়াই নতুন ভার্সন পেয়ে যায়।",
      b: "ব্লু-গ্রিন ডিপ্লয়মেন্টে Nginx এর সামনে দুটি কন্টেইনার থাকে। নতুন কোড গ্রিন কন্টেইনারে চালু করে হেলথচেক সফল হলে Nginx দিয়ে ট্রাফিক গ্রিনে ঘুরিয়ে দেওয়া হয় কোনো ডাউনটাইম ছাড়াই।",
      e: "Execute Blue-Green container deployments using Nginx upstreams: spin up the newly built green container on an alternate internal port, verify healthy readiness probes, execute an instantaneous nginx -s reload to pivot proxy traffic, and gracefully decommission the legacy blue container.",
      code: "# Nginx upstream pivot:\nupstream api_backend {\n  server api_green:5000; # Switch from blue to green\n}"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: ডকার কন্টেইনার সিঙ্ক ও ক্যাশ ক্লিনিং: প্রোডাকশন VPS-এ 'Dangling Images' ও ক্যাশ জমে ডিস্ক ভর্তি হওয়া রোধে অটোমেটেড পাইপলাইন কীভাবে সেটআপ করবে?",
      m: "প্রতিবার নতুন ইমেজ বিল্ড বা পুল করার পর পুরনো ইমেজগুলো 'Dangling' (`<none>:<none>`) অবস্থায় হার্ডডিস্কে জমে থাকে। কয়েক মাস পর এটি ২০-৩০GB জায়গা খেয়ে ফেলে। সলিউশন: আমরা সার্ভারের ক্রন জবে একটি সাপ্তাহিক ক্লিনিং স্ক্রিপ্ট চালাই: `docker system prune -af --volumes=false` (সতর্কতা: `--volumes=false` রাখতে হবে যাতে ডাটাবেজের ভলিউম ডিলিট না হয়!)। এটি সমস্ত অব্যবহৃত পুরনো কন্টেইনার, বিল্ড ক্যাশ ও ড্যাঙ্গলিং ইমেজ নিরাপদে পার্জ করে ডিস্ক খালি রাখে।",
      b: "নতুন বিল্ডের পর পুরনো ইমেজ জমে ডিস্ক ভরে যাওয়া ঠেকাতে ক্রন জবে docker system prune -af --volumes=false চালানো হয়। ভলিউম অক্ষত রেখে এটি অপ্রয়োজনীয় ক্যাশ ও পুরনো ইমেজ পরিষ্কার করে।",
      e: "Continuous CI/CD deployments generate dangling container images and build caches. Schedule a weekly root cron job running docker system prune -af --volumes=false to purge unreferenced images and dangling layers while strictly preserving persistent named database volumes.",
      code: "# Weekly prune cron (Sunday 4 AM):\n0 4 * * 0 /usr/bin/docker system prune -af --volumes=false >> /var/log/docker-prune.log 2>&1"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: সিকিউর ডকার এনভায়রনমেন্ট ভ্যারিয়েবল ম্যানেজমেন্ট: কেন Dockerfile-এ `ENV` দিয়ে ডাটাবেজ পাসওয়ার্ড বেক করা সম্পূর্ণ নিষিদ্ধ?",
      m: "মারাত্মক ভুল: Dockerfile-এর ভেতরে যদি লেখা হয় `ENV DB_PASSWORD=\"secret123\"`, তবে যে কেউ `docker history <image>` বা `docker inspect` চালিয়ে সেই পাসওয়ার্ড সরাসরি প্লেইন-টেক্সটে দেখে ফেলতে পারে—এমনকি এটি গিটহাবেও লিক হয়ে যায়! সঠিক প্রোডাকশন প্যাটার্ন: (১) Dockerfile-এ কখনোই কোনো সিক্রেট রাখা যাবে না। (২) রানটাইমে সিক্রেট ইনজেক্ট করতে হবে: Docker Compose-এর `env_file: [.env.production]` দিয়ে অথবা ডকার সোয়ার্ম/কুবারনেটিসের `Docker Secrets` মেকানিজম ব্যবহার করে যা মেমোরিতে এনক্রিপ্ট হয়ে কন্টেইনারে মাউন্ট হয়।",
      b: "Dockerfile এ ENV দিয়ে পাসওয়ার্ড দিলে docker history চালিয়ে যে কেউ তা দেখে ফেলতে পারে। সিক্রেট সবসময় রানটাইমে env_file বা ডকার সিক্রেট দিয়ে মেমোরি মাউন্টে পাস করতে হয়।",
      e: "Hardcoding ENV DB_PASS in Dockerfiles exposes credentials in plaintext via docker history and container image registries. Inject runtime secrets strictly via external untracked env_file directives, cloud secret managers (AWS SSM), or encrypted Docker Secrets mounted in-memory.",
      tip: "কখনোই Dockerfile-এ `ENV SECRET=xxx` লিখবে না; সবসময় রানটাইম ইনজেকশন ব্যবহার করবে।"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: ডকারাইজড নোড অ্যাপ্লিকেশনে Graceful Shutdown হ্যান্ডেল করে কীভাবে ইন-ফ্লাইট রিকোয়েস্ট বাঁচাবে?",
      m: "ডকার যখন কোনো কন্টেইনার বন্ধ করে (`docker stop`), সে প্রথমে `SIGTERM` সিগন্যাল পাঠায় এবং ১০ সেকেন্ড অপেক্ষা করে। যদি অ্যাপ সাড়া না দেয়, তবে সে `SIGKILL` দিয়ে প্রসেসটি হত্যা করে—ফলে মাঝপথে থাকা লেনদেন করাপ্ট হয়ে যায়। নোড সার্ভারে গ্রেসফুল শাটডাউন লজিক লিখি: `process.on('SIGTERM', () => { ... })`। এতে সার্ভার নতুন রিকোয়েস্ট নেওয়া বন্ধ করে, চলমান এপিআই রিকোয়েস্টগুলো শেষ হওয়ার সুযোগ দেয়, ডেটাবেজ কানেকশন পুল সুন্দরভাবে ক্লোজ করে এবং নিরাপদে প্রসেস বন্ধ করে। ফলে ডিপ্লয়মেন্ট চলাকালীন কোনো কাস্টমারের পেমেন্ট বা ইনভয়েস ড্রপ করে না।",
      b: "docker stop সিগন্যাল পাঠালে যাতে চলমান পেমেন্ট বা ইনভয়েস নষ্ট না হয়, সেজন্য Node.js সার্ভারে SIGTERM ইভেন্ট হ্যান্ডেল করে ইন-ফ্লাইট রিকোয়েস্ট শেষ করার পর ডাটাবেজ কানেকশন ক্লোজ করা হয়।",
      e: "Docker stop dispatches a SIGTERM signal with a 10-second grace window before issuing SIGKILL. Intercept SIGTERM in Node.js to stop accepting incoming traffic, drain active in-flight HTTP connections, terminate database connection pools gracefully, and exit cleanly.",
      code: "process.on('SIGTERM', async () => {\n  console.log('SIGTERM received: draining HTTP connections...');\n  server.close(async () => {\n    await prisma.$disconnect();\n    console.log('Database pools closed. Clean exit.');\n    process.exit(0);\n  });\n});"
    }
  ]
};
