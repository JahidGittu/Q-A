// Topic 8: Backend Server, PM2, Docker & Deployment (25 Questions: 5 lvl1, 5 lvl2, 5 lvl3, 5 situation, 5 realworld)
module.exports = {
  id: "backend-devops-tools",
  name: "Backend Server, PM2, Docker & Nginx",
  desc: "Linux Server Administration, PM2 Clustering, Nginx Reverse Proxy, Docker Containerization, Production CI/CD for Backend",
  items: [
    // --- LEVEL 1 (5 Questions) ---
    {
      lvl: "lvl1",
      q: "Node.js অ্যাপ্লিকেশনকে সরাসরি ইন্টারনেটে এক্সপোজ না করে সামনে Nginx Reverse Proxy রাখা কেন বাধ্যতামূলক?",
      m: "Node.js সরাসরি পোর্ট ৮০ বা ৪৪৩-এ পাবলিকলি চালানো ঝুঁকিপূর্ণ। Nginx সামনে রাখার সুবিধা: (১) SSL/TLS Termination: SSL সার্টিফিকেট Nginx হ্যান্ডেল করে নোড সার্ভারের সিপিইউ বাঁচায়। (২) Security & DDoS Shield: ক্ষতিকর স্লো-লরিস বা মেলিসিয়াস প্যাকেট নোডে পৌঁছানোর আগেই Nginx ব্লক করে। (৩) Static Asset Caching: ছবি ও সিএসএস ফাইল Nginx সরাসরি ডিস্ক থেকে ১ms-এ সার্ভ করে। (৪) Load Balancing: একাধিক ব্যাকএন্ড নোড ইনস্ট্যান্সে ট্রাফিক সুন্দরভাবে ভাগ করে দেয়।",
      b: "নোড জেএস সরাসরি ইন্টারনেটে উন্মুক্ত না করে সামনে এনজিনিক্স (Nginx) রাখা হয়। এটি এসএসএল হ্যান্ডশেক সম্পন্ন করে, স্ট্যাটিক ফাইল দ্রুত ক্যাশ করে, ক্ষতিকর নেটওয়ার্ক আক্রমণ প্রতিহত করে এবং একাধিক ব্যাকএন্ড প্রসেসের মাঝে লোড ব্যালেন্স করে।",
      e: "Exposing raw Node.js ports publicly creates security and performance vulnerabilities. Nginx handles SSL/TLS termination, buffers slow client connections, serves static files from disk at native C speeds, and load-balances across clustered Node.js processes.",
      tip: "ইন্টারভিউতে 'SSL Termination, Static Caching, and DDoS protection' তিনটি প্রধান কারণ বলবে।"
    },
    {
      lvl: "lvl1",
      q: "PM2 Process Manager কী এবং সাধারণ `node server.js` চালানোর চেয়ে এটি কেন উৎপাদন পরিবেশে আবশ্যক?",
      m: "টার্মিনালে সাধারণ `node server.js` চালালে কোনো এররে কোড ক্র্যাশ করলে বা টার্মিনাল ক্লোজ করলে সার্ভার সাথে সাথে বন্ধ হয়ে যায়। PM2 হলো একটি প্রোডাকশন প্রসেস ম্যানেজার যা: (১) কোনো অপ্রত্যাশিত ক্র্যাশে মিলি-সেকেন্ডে প্রসেস অটো-রিস্টার্ট করে। (২) Cluster Mode-এ সব সিপিইউ কোর ব্যবহার করে রান করতে পারে। (৩) সার্ভার রিবুট হলে সিস্টেম বুটের সাথে সাথে অ্যাপ অটো-স্টার্ট করায় (`pm2 startup`)। (৪) জিরো-ডাউনটাইম রিলোড (`pm2 reload`) সাপোর্ট করে।",
      b: "পিএম২ একটি শক্তিশালী প্রসেস ম্যানেজার। এটি কোনো ক্র্যাশে সাথে সাথে অ্যাপ রিস্টার্ট করে, সার্ভার রিবুট হলে অটো-স্টার্ট করায়, সব সিপিইউ কোর ব্যবহার করে ক্লাস্টার তৈরি করে এবং কোনো ডাউনটাইম ছাড়াই কোড রিলোড করার সুবিধা দেয়।",
      e: "Running bare `node server.js` dies permanently upon unhandled exceptions or terminal disconnects. PM2 provides automatic self-healing restarts, multi-core clustering, server reboot persistence (`pm2 startup`), and zero-downtime hot reloads.",
      code: "pm2 start dist/server.js -i max --name dokani-api\npm2 save && pm2 startup"
    },
    {
      lvl: "lvl1",
      q: "Docker Containerization কী এবং 'It works on my machine' সমস্যা কীভাবে দূর করে?",
      m: "ডেভেলপারের লোকাল মেশিনে হয়তো Node v20 আছে কিন্তু প্রোডাকশন সার্ভারে Node v18 বা ভিন্ন লাইব্রেরি থাকায় কোড ফেইল করে। Docker পুরো অ্যাপ্লিকেশনকে তার নিজস্ব অপারেটিং সিস্টেম ফাইল, রানটাইম, ডিপেনডেন্সি এবং কনফিগারেশন সহ একটি হালকা, আইসোলেটেড 'Container'-এ প্যাক করে। এর ফলে একই ডকার ইমেজ লোকাল ল্যাপটপে যেভাবে রান করে, হুবহু অবিকল একই আচরণে প্রোডাকশন উবুন্টু বা এডব্লিউএস সার্ভারে রান করে।",
      b: "ডকার সম্পূর্ণ অ্যাপকে তার প্রয়োজনীয় সব ডিপেনডেন্সি ও ওএস লাইব্রেরি সহ একটি পোর্টেবল কন্টেইনারে আবদ্ধ করে। ফলে ডেভেলপার মেশিনের পরিবেশ ও লাইভ সার্ভারের পরিবেশ হুবহু এক থাকায় কোনো ভার্সন জটিলতা তৈরি হয় না।",
      e: "Docker packages the application alongside its runtime, dependencies, system libraries, and configs into an immutable container image. This eliminates environment drift, ensuring identical behavior across local Mac/Windows environments and production Linux VMs.",
      tip: "ডকারের 'Environment Immutability' শব্দবন্ধটি ব্যবহার করা খুব প্রফেশনাল।"
    },
    {
      lvl: "lvl1",
      q: "Linux সার্ভারে ফাইল পারমিশন (`chmod` ও `chown`) কীভাবে কাজ করে এবং `755` বনাম `644`-এর অর্থ কী?",
      m: "লিনাক্সে ৩টি স্তর থাকে: Owner (u), Group (g), Others (o)। এবং ৩টি পারমিশন মান: Read (4), Write (2), Execute (1)। (১) `chmod 755`: ওনার পায় Read+Write+Execute (4+2+1=7), গ্রুপ পায় Read+Execute (4+1=5), এবং অন্যরা পায় Read+Execute (5)—এটি ফোল্ডার ও এক্সিকিউটেবল স্ক্রিপ্টের স্ট্যান্ডার্ড। (২) `chmod 644`: ওনার পায় Read+Write (4+2=6), বাকিরা শুধু Read (4)—এটি সাধারণ কোড ও কনফিগ ফাইলের স্ট্যান্ডার্ড। `chown` মালিকানা পরিবর্তনের জন্য ব্যবহৃত হয় (যেমন `chown -R www-data:www-data /var/www`)।",
      b: "লিনাক্সে পারমিশন ৪ (পড়া), ২ (লেখা), ১ (এক্সিকিউট) যোগ করে নির্ধারিত হয়। ৭৫৫ ফোল্ডার ও স্ক্রিপ্টের জন্য উপযুক্ত এবং ৬৪৪ সাধারণ ফাইলের জন্য নিরাপদ মান যাতে অন্যরা কোড পরিবর্তন করতে না পারে।",
      e: "Linux permissions combine octal values: Read (4), Write (2), Execute (1) across Owner, Group, and Others. `755` grants rwx to owner and r-x to group/others (directories). `644` grants rw- to owner and r-- to group/others (source files).",
      code: "chmod 755 /var/www/dokani\nchmod 644 /var/www/dokani/.env\nchown -R deploy:deploy /var/www/dokani"
    },
    {
      lvl: "lvl1",
      q: "Docker-এ `Dockerfile` এবং `docker-compose.yml`-এর মধ্যে মৌলিক পার্থক্য কী?",
      m: "`Dockerfile` হলো একটি রেসিপি যা একটি একক ডকার ইমেজ তৈরির ব্লুপ্রিন্ট দেয় (যেমন শুধু আমাদের Node.js অ্যাপের ইমেজ)। আর `docker-compose.yml` হলো একটি মাল্টি-কনটেইনার অর্কেস্ট্রেশন টুল যা একাধিক সম্পর্কিত সার্ভিসকে (যেমন: Node API + PostgreSQL DB + Redis Cache) একই সাথে একই প্রাইভেট নেটওয়ার্কে রান করানো, ভলিউম মাউন্ট ও পোর্ট বাইন্ড করার জন্য ব্যবহার করা হয়।",
      b: "ডকারফাইল একটি নির্দিষ্ট ইমেজ তৈরির স্ক্রিপ্ট। ডকার কম্পোজ একাধিক কন্টেইনার (যেমন নোড এপিআই, পোস্টগ্রেস ও রেডিস) একসাথে নেটওয়ার্কে যুক্ত করে এক ক্লিকে সম্পূর্ণ সিস্টেম রান করার ফাইল।",
      e: "A Dockerfile contains instructions to build a single standalone container image. docker-compose coordinates and orchestrates multi-container ecosystems (e.g. Node API, PostgreSQL, Redis) defining shared networks, environment variables, and persistent storage volumes.",
      code: "# docker-compose up -d (Launches full stack together)"
    },

    // --- LEVEL 2 (5 Questions) ---
    {
      lvl: "lvl2",
      q: "Node.js-এর জন্য Multi-Stage Dockerfile কেন তৈরি করতে হয় এবং এটি কীভাবে ইমেজ সাইজ ১GB থেকে ৫০MB-তে নামিয়ে আনে?",
      m: "সাধারণ ডকার বিল্ডে টাইপস্ক্রিপ্ট কম্পাইলার, ডেভ-ডিপেনডেন্সি এবং সোর্স কোড সব ইমেজ ফাইনালে থেকে যায়, যার ফলে ইমেজ সাইজ ১GB ছাড়িয়ে যায়। Multi-Stage বিল্ডে দুটি স্তর থাকে: (১) `Builder Stage`: এখানে সব ডেভ-ডিপেনডেন্সি ইন্সটল করে `npm run build` দিয়ে টাইপস্ক্রিপ্ট কম্পাইল করা হয়। (২) `Runner Stage`: একটি ফ্রেশ হালকা আলপাইন ইমেজ (`node:alpine`) নেওয়া হয় এবং শুধুমাত্র কম্পাইল করা `dist/` ফোল্ডার ও প্রোডাকশন ডিপেনডেন্সি (`npm ci --omit=dev`) কপি করা হয়। ফলে অপ্রয়োজনীয় বিল্ড টুল ছাড়াই ফাইনাল ইমেজ মাত্র ৫০-৮০ মেগাবাইটে নেমে আসে।",
      b: "মাল্টি-স্টেজ ডকারফাইলে বিল্ডার স্টেজে কোড কম্পাইল করা হয় এবং রানার স্টেজে শুধুমাত্র প্রয়োজনীয় dist ফাইল ও প্রোডাকশন ডিপেনডেন্সি রাখা হয়। ফলে অপ্রয়োজনীয় ডেভ টুলস বাদ দিয়ে ইমেজ সাইজ ১ জিবি থেকে মাত্র ৫০ মেগাবাইটে নেমে আসে।",
      e: "Multi-stage Docker builds isolate the compilation tooling. Stage 1 (Builder) installs devDependencies to compile TypeScript. Stage 2 (Runner) copies strictly the emitted `dist/` artifacts and `node_modules` into a lean `node:alpine` base, shrinking image size from 1GB to under 70MB.",
      code: "FROM node:20-alpine AS builder\nWORKDIR /app\nCOPY . .\nRUN npm ci && npm run build\n\nFROM node:20-alpine AS runner\nWORKDIR /app\nCOPY --from=builder /app/dist ./dist\nCOPY --from=builder /app/node_modules ./node_modules\nCMD [\"node\", \"dist/server.js\"]"
    },
    {
      lvl: "lvl2",
      q: "PM2 Cluster Mode বনাম Fork Mode-এর মধ্যে পার্থক্য কী এবং Zero-Downtime Reload (`pm2 reload`) কীভাবে কাজ করে?",
      m: "Fork Mode অ্যাপের মাত্র ১টি সিঙ্গেল ইনস্ট্যান্স রান করে। আর Cluster Mode মেশিনের সমস্ত কোর ব্যবহার করে মাল্টিপল ইনস্ট্যান্স তৈরি করে (`instances: 'max'`)। `pm2 restart` দিলে সব প্রসেস একসাথে বন্ধ করে রিস্টার্ট করায় কিছুক্ষণের জন্য সাইট ডাউন হয়। কিন্তু `pm2 reload` হলো জিরো-ডাউনটাইম রিলোড: এটি এক এক করে ক্রমানুসারে একটি প্রসেস রিস্টার্ট করে, সেটি রেডি হওয়া পর্যন্ত বাকি প্রসেসগুলো ট্রাফিক হ্যান্ডেল করে, এরপর পরের প্রসেসটি রিস্টার্ট করে। ফলে কোনো ব্যবহারকারী কখনো ড্রপড কানেকশন দেখতে পায় না।",
      b: "ফর্ক মোড একটি একক প্রসেস চালায়, ক্লাস্টার মোড সব কোরে প্রসেস স্প্রেড করে। pm2 reload একটার পর একটা প্রসেস ক্রমানুসারে আপডেট করায় কোনো ডাউনটাইম ছাড়াই শূন্য সেকেন্ডে নতুন কোড কার্যকর হয়।",
      e: "Fork mode runs a single isolated process. Cluster mode utilizes Node's cluster module across all CPU cores. Unlike `pm2 restart` which kills processes simultaneously, `pm2 reload` achieves zero-downtime rolling updates by restarting worker instances sequentially.",
      code: "module.exports = {\n  apps: [{\n    name: 'dokani-api',\n    script: 'dist/server.js',\n    instances: 'max',\n    exec_mode: 'cluster'\n  }]\n};"
    },
    {
      lvl: "lvl2",
      q: "Nginx-এ Reverse Proxy ও WebSocket Proxying কনফিগারেশনে `proxy_set_header Upgrade` কেন দিতে হয়?",
      m: "HTTP/1.1 প্রোটোকল বাই-ডিফল্ট হপ-বাই-হপ (Hop-by-hop) কানেকশন হিসেবে 'Upgrade' হেডার স্ট্রিপ করে ফেলে। সকেট কানেকশন যখন ব্রাউজার থেকে আসে, ব্রাউজার HTTP থেকে WebSockets-এ আপগ্রেড হতে চায়। Nginx কনফিগারেশনে যদি `proxy_set_header Upgrade $http_upgrade;` এবং `proxy_set_header Connection 'upgrade';` না দেওয়া হয়, Nginx আপগ্রেড হেডারটি ব্যাকএন্ড নোড সার্ভারে পাঠায় না এবং সকেট হ্যান্ডশেক ফেইল করে সাধারণ HTTP লং-পোলিংয়ে ডাউনগ্রেড হয়ে যায়।",
      b: "ওয়েবসকেট প্রোটোকল আপগ্রেড করার জন্য Upgrade এবং Connection হেডার বাধ্যতামূলক। এনজিনিক্সে এটি সেট না করলে সকেট হ্যান্ডশেক ভেঙে যায় এবং রিয়েল-টাইম কানেকশন ব্যর্থ হয়।",
      e: "WebSockets initiate via an HTTP handshake containing `Upgrade: websocket`. Because reverse proxies drop hop-by-hop headers by default, Nginx must explicitly forward `proxy_set_header Upgrade $http_upgrade;` and `proxy_set_header Connection 'upgrade';` to preserve the persistent duplex socket.",
      code: "location /socket.io/ {\n  proxy_pass http://localhost:4000;\n  proxy_http_version 1.1;\n  proxy_set_header Upgrade $http_upgrade;\n  proxy_set_header Connection 'upgrade';\n}"
    },
    {
      lvl: "lvl2",
      q: "Docker Volumes কী এবং ডাটাবেজ কনটেইনার রিস্টার্ট হলেও ডেটা হারানো রোধে Named Volumes কীভাবে কাজ করে?",
      m: "ডকার কনটেইনারের অভ্যন্তরীণ ফাইল সিস্টেম স্বভাবগতভাবে ক্ষণস্থায়ী (Ephemeral)—কনটেইনার মুছে ফেললে বা রিস্টার্ট করলে তার ভেতরের সব ডেটা চিরতরে মুছে যায়। Docker Named Volume হলো হোস্ট ওএস মেশিনের একটি সুরক্ষিত ডিরেক্টরি যা ডকার ইঞ্জিন সরাসরি কনটেইনারের ভেতরের পাথের (`/var/lib/postgresql/data`) সাথে মাউন্ট করে রাখে। কনটেইনার ধ্বংস হলেও সমস্ত ডাটাবেজ রেকর্ড হোস্ট মেশিনের ভলিউমে ১০০% অক্ষত থাকে এবং নতুন কনটেইনার তৎক্ষণাৎ সেই ডেটা দিয়ে রিস্টার্ট হয়।",
      b: "কন্টেইনার ডিলিট হলে সাধারণ ডেটা মুছে যায়। ডকার ভলিউম হোস্ট মেশিনে স্থায়ী মেমোরি সংরক্ষণ করে, ফলে ডাটাবেজ কন্টেইনার যতবারই রিস্টার্ট বা আপডেট করা হোক না কেন, কোনো তথ্য নষ্ট হয় না।",
      e: "Docker containers have ephemeral filesystems; deleting a container destroys written data. Docker Named Volumes map designated paths (e.g. `/var/lib/postgresql/data`) directly to persistent host storage, surviving container lifecycles and rebuilds.",
      code: "services:\n  db:\n    image: postgres:16-alpine\n    volumes:\n      - pgdata:/var/lib/postgresql/data\nvolumes:\n  pgdata:"
    },
    {
      lvl: "lvl2",
      q: "Linux UFW (Uncomplicated Firewall) কীভাবে কনফিগার করে শুধুমাত্র প্রয়োজনীয় পোর্ট (22, 80, 443) ছাড়া বাকি সব পোর্ট সুরক্ষিতভাবে ব্লক করবে?",
      m: "সার্ভারে অননুমোদিত অ্যাক্সেস ও আক্রমণ বন্ধ করতে UFW অত্যন্ত কার্যকর। কনফিগারেশন স্টেপস: (১) ডিফল্ট ইনকামিং ব্লক ও আউটগোয়িং অ্যালাউ: `ufw default deny incoming`, `ufw default allow outgoing`। (২) SSH পোর্ট ওপেন রাখা যাতে নিজেকে লকআউট না করতে হয়: `ufw allow 22/tcp`। (৩) ওয়েব ট্রাফিকের জন্য HTTP ও HTTPS অ্যালাউ করা: `ufw allow 80/tcp`, `ufw allow 443/tcp`। (৪) ইন্টারনাল ডাটাবেজ বা নোড পোর্ট (যেমন 5432 বা 3000) কখনোই পাবলিকে খুলব না। (৫) `ufw enable` দিয়ে ফায়ারওয়াল সক্রিয় করা।",
      b: "ইউএফডব্লিউ ফায়ারওয়্যালের মাধ্যমে ২২ (SSH), ৮০ (HTTP) এবং ৪৪৩ (HTTPS) ছাড়া অন্য সব পোর্ট ব্লক রাখা হয়। ডাটাবেজ বা নোড পোর্ট বাইরে উন্মুক্ত না রেখে ইন্টারনাল নেটওয়ার্কে আবদ্ধ রাখাই নিরাপদ।",
      e: "Lock down public exposure with UFW: set default policy to deny incoming, permit outgoing, explicitly whitelist SSH (`ufw allow 22`), HTTP (`80`), and HTTPS (`443`), and enable (`ufw enable`). Keep internal database ports (5432, 27017, 6379) unexposed.",
      code: "sudo ufw default deny incoming\nsudo ufw allow 22/tcp\nsudo ufw allow 80/tcp\nsudo ufw allow 443/tcp\nsudo ufw enable"
    },

    // --- LEVEL 3 (5 Questions) ---
    {
      lvl: "lvl3",
      q: "GitHub Actions CI/CD পাইপলাইনে SSH Deploy Keys এবং Docker Compose দিয়ে VPS সার্ভারে অটোমেটেড জিরো-ডাউনটাইম ডেপ্লয়মেন্ট কীভাবে তৈরি করবে?",
      m: "স্টেপস: (১) ডেভেলপার যখন `main` ব্রাঞ্চে কোড মার্জ করে, GitHub Actions ট্রিগার হয়। (২) CI সার্ভারে টেস্ট, লিন্ট এবং ডকার ইমেজ বিল্ড হয়ে Docker Hub বা GitHub Container Registry-তে পুশ হয়। (৩) `appleboy/ssh-action` ব্যবহার করে গিটহাব সিক্রেটসে থাকা SSH প্রাইভেট কি দিয়ে আমাদের প্রোডাকশন VPS-এ লগইন করে। (৪) সার্ভারে `docker compose pull` দিয়ে নতুন ইমেজ নামায় এবং `docker compose up -d --no-deps --build app` এক্সিকিউট করে। (৫) হেলথ চেক পাস করার পর কনটেইনার স্বয়ংক্রিয়ভাবে ট্রাফিক নেওয়া শুরু করে। পুরো ডেপ্লয়মেন্ট সম্পূর্ণ অটোমেটেড ও মসৃণ।",
      b: "গিটহাব অ্যাকশনস সিআই পাইপলাইনে টেস্ট পাস হলে ডকার ইমেজ পুশ করা হয়। এরপর এসএসএইচ কি দিয়ে সার্ভারে কানেক্ট করে docker compose pull এবং up চালিয়ে স্বয়ংক্রিয়ভাবে জিরো ডাউনটাইমে নতুন কোড প্রোডাকশনে ডেপ্লয় করা হয়।",
      e: "The GitHub Actions workflow tests and compiles the build, pushes versioned container images to a registry, and connects to the production VPS via SSH Deploy Keys. Running `docker compose pull && docker compose up -d` executes rolling zero-downtime updates.",
      code: "- name: Deploy to VPS\n  uses: appleboy/ssh-action@master\n  with:\n    host: ${{ secrets.HOST }}\n    username: deploy\n    key: ${{ secrets.SSH_KEY }}\n    script: cd /var/www/dokani && git pull && docker compose up -d"
    },
    {
      lvl: "lvl3",
      q: "Docker Swarm বা Kubernetes ছাড়া সাধারণ Docker Compose সেটআপে কীভাবে Horizontal Scaling (`docker compose up --scale app=4`) এবং Nginx Load Balancing কনফিগার করবে?",
      m: "আমরা `docker-compose.yml`-এ অ্যাপ সার্ভিসের ফিক্সড হোস্ট পোর্ট বাইন্ডিং (`3000:3000`) বাদ দিয়ে শুধু অভ্যন্তরীণ পোর্ট এক্সপোজ করব (`expose: ['3000']`)। এরপর রান করব: `docker compose up -d --scale app=4`—ডকার ৪টি স্বাধীন অ্যাপ কনটেইনার স্পন করবে। সামনে থাকা Nginx কনটেইনারের কনফিগারেশনে `upstream backend { server app:3000; }` দেওয়া থাকবে। ডকারের বিল্ট-ইন ডিএনএস রাউন্ড-রবিন পদ্ধতিতে সমস্ত ট্রাফিক এই ৪টি অ্যাপ কনটেইনারের মধ্যে স্বয়ংক্রিয়ভাবে লোড ব্যালেন্স করে দেবে।",
      b: "ডকার কম্পোজে ফিক্সড পোর্ট বাদ দিয়ে expose ব্যবহার করে --scale app=4 দিলে ৪টি অ্যাপ কন্টেইনার চালু হয়। এনজিনিক্স আপস্ট্রিম ব্লকের মাধ্যমে এই ৪টি কন্টেইনারের মধ্যে ট্রাফিক রাউন্ড-রবিন পদ্ধতিতে লোড ব্যালেন্স করে।",
      e: "Scale container replicas without Kubernetes by removing static host port mappings and executing `docker compose up -d --scale app=4`. Configure Nginx with an `upstream backend { server app:3000; }` block, utilizing Docker's internal DNS round-robin engine to balance requests across workers.",
      code: "upstream backend {\n  server app:3000;\n}\nserver {\n  location / { proxy_pass http://backend; }\n}"
    },
    {
      lvl: "lvl3",
      q: "Linux cgroups এবং Docker Resource Limits (`cpus`, `memory`): কীভাবে একটি মেমোরি-হাংরি নোড প্রসেস পুরো সার্ভার ক্র্যাশ করা থেকে আটকাবে?",
      m: "যদি কোনো মেমোরি লিমিট না দেওয়া থাকে এবং নোড অ্যাপে মেমোরি লিক হয়, তবে এটি হোস্ট সার্ভারের সমস্ত ১৬GB RAM দখল করে ফেলবে এবং লিনাক্স OOM Killer স্বয়ংক্রিয়ভাবে ডাটাবেজ বা SSH ডেমন প্রসেসকে মেরে সার্ভার সম্পূর্ণ আনরিচেবল করে দেবে। সমাধান: `docker-compose.yml`-এ আমরা কঠোর রিসোর্স লিমিট দেব: `deploy.resources.limits: { cpus: '1.5', memory: '1024M' }`। যদি নোড অ্যাপ ১GB RAM ক্রস করে, তবে শুধুমাত্র ওই একটি নির্দিষ্ট কনটেইনার রিস্টার্ট হবে, কিন্তু পুরো ওএস ও ডেটাবেজ সার্ভার সম্পূর্ণ নিরাপদ থাকবে।",
      b: "ডকারে রিসোর্স লিমিট না দিলে নোড অ্যাপ পুরো সার্ভারের সব র্যাম দখল করে সার্ভার ক্র্যাশ করিয়ে দিতে পারে। deploy.resources.limits দিয়ে ১ জিবি মেমোরি ও ১.৫ সিপিইউ নির্ধারণ করে দিলে কোনো সমস্যা হলেও মূল হোস্ট সার্ভার অক্ষত থাকে।",
      e: "Unbounded containers consume entire host RAM under leaks, provoking the Linux OOM Killer to terminate mission-critical processes like Postgres or SSH. Enforce strict cgroups resource caps in docker-compose (`deploy.resources.limits.memory: 1G`) to isolate failures to container boundaries.",
      code: "deploy:\n  resources:\n    limits:\n      cpus: '2.0'\n      memory: 2048M"
    },
    {
      lvl: "lvl3",
      q: "Nginx Gzip এবং Brotli Compression কীভাবে কনফিগার করবে যাতে এপিআই JSON রেসপন্স সাইজ ৮০% কমে যায়?",
      m: "JSON রেসপন্সে প্রচুর রিপিটিটিভ ফিল্ডের নাম থাকে যা কম্প্রেশনের জন্য পারফেক্ট। Nginx-এ আমরা `gzip on;` এবং আরও আধুনিক `brotli on;` এনাবল করি। গুরুত্বপূর্ণ কনফিগ: (১) `gzip_types application/json text/plain text/css application/javascript;`। (২) `gzip_min_length 1024;` (১KB-এর ছোট ডেটাতে কম্প্রেশন ওভারহেড এড়ানো)। (৩) `gzip_comp_level 6;` (সিপিইউ ও কম্প্রেশন রেশিওর পারফেক্ট ব্যালেন্স)। এর ফলে ১MB-র বড় সেলস রিপোর্ট JSON ক্লায়েন্টে মাত্র ১৫০KB হয়ে নিমেষে ডাউনলোড হয়।",
      b: "এনজিনিক্সে জিজিপ (Gzip) এবং ব্রটলি (Brotli) সক্রিয় করে JSON ও টেক্সট রেসপন্স কমপ্রেস করা হয়। comp_level ৬ নির্ধারণ করলে সিপিইউর ওপর অতিরিক্ত চাপ না ফেলে ডাটার আকার ৮০% কমিয়ে চোখের পলকে নেটওয়ার্ক রেসপন্স দেওয়া সম্ভব হয়।",
      e: "Configure Nginx Gzip/Brotli compression: specify `gzip_types application/json application/javascript text/css;`, set threshold `gzip_min_length 1024;`, and balance compression efficiency via `gzip_comp_level 6;`. This slashes JSON payload transfer sizes by up to 80%.",
      code: "gzip on;\ngzip_comp_level 6;\ngzip_min_length 1024;\ngzip_types application/json text/plain text/css;"
    },
    {
      lvl: "lvl3",
      q: "Docker Security Best Practices: কেন কনটেইনারে কখনোই `root` ইউজার হিসেবে কোড রান করা যাবে না এবং `USER node` কীভাবে কার্যকর করবে?",
      m: "যদি কোনো কনটেইনার বাই-ডিফল্ট `root` ইউজার হিসেবে চলে এবং আক্রমণকারী কোডে রিমোট কোড এক্সিকিউশন (RCE) বা কন্টেইনার এসকেপ ভালনারেবিলিটি পায়, তবে সে সরাসরি হোস্ট মেশিনের রুট প্রিভিলেজ পেয়ে পুরো সার্ভারের নিয়ন্ত্রণ নিয়ে নেবে। সেরা প্র্যাকটিস: Dockerfile-এর শেষে `USER node` (বা নন-রুট ইউজার) ঘোষণা করা। সাথে ফাইল পারমিশনে `chown -R node:node /app` নিশ্চিত করা। এর ফলে হ্যাকার কনটেইনারে ঢুকলেও কোনো সিস্টেম ফাইল মডিফাই বা হোস্ট মেশিনে এস্কেপ করতে পারবে না।",
      b: "কন্টেইনারে রুট ইউজার হিসেবে চললে নিরাপত্তা ঝুঁকি থাকে কারণ কোনো আক্রমণকারী হোস্ট সার্ভারের রুট নিয়ন্ত্রণ পেয়ে যেতে পারে। ডকারফাইলে USER node নির্দেশ করে নন-রুট ব্যবহারকারী হিসেবে অ্যাপ চালানো বাধ্যতামূলক সিকিউরিটি স্ট্যান্ডার্ড।",
      e: "Running containers as root enables attackers exploiting RCE vulnerabilities to achieve root privileges on the underlying host kernel via container breakouts. Mitigate by dropping root privileges: declare a non-root user via `USER node` in the Dockerfile after adjusting file ownerships.",
      code: "RUN chown -R node:node /app\nUSER node\nCMD [\"node\", \"dist/server.js\"]"
    },

    // --- SITUATION (5 Questions) ---
    {
      lvl: "situation",
      q: "প্রোডাকশন ডেপ্লয়মেন্টের ঠিক পর Nginx `502 Bad Gateway` এরর দেখাচ্ছে এবং কোনো পেজ ওপেন হচ্ছে না। কীভাবে ধাপে ধাপে ট্রাবলশুট করবে?",
      m: "ট্রাবলশুটিং স্টেপস: `502 Bad Gateway` মানে হলো Nginx জীবিত আছে কিন্তু তার পেছনের ব্যাকএন্ড নোড সার্ভার বন্ধ বা সাড়া দিচ্ছে না। (১) প্রথমে চেক করব নোড প্রসেস চলছে কি না: `pm2 status` অথবা `docker ps`। (২) যদি নোড ক্র্যাশ করে থাকে, লগ চেক করব: `pm2 logs` বা `docker logs <container_id>` (সাধারণত এনভায়রনমেন্ট ভ্যারিয়েবল মিসিং বা ডাটাবেজ কানেকশন ফেইল্ড কারণে ক্র্যাশ করে)। (৩) Nginx কনফিগারেশনের `proxy_pass http://localhost:PORT` এবং নোড অ্যাপ যে পোর্টে শুনছে তা হুবহু এক কি না পরীক্ষা করব। (৪) Nginx এরর লগ দেখব: `tail -n 50 /var/log/nginx/error.log`।",
      b: "৫০২ ব্যাড গেটওয়ে মানে এনজিনিক্সের পেছনের নোড সার্ভার বন্ধ। pm2 status বা ডকার লগ পরীক্ষা করে ক্র্যাশের কারণ দেখতে হবে এবং proxy_pass এ উল্লেখিত পোর্টের সাথে নোড অ্যাপের পোর্ট মিলিয়ে সমাধান করতে হবে।",
      e: "HTTP 502 indicates Nginx cannot establish a socket connection with the upstream Node application. Verify the Node runtime via `pm2 status` or `docker ps`, inspect runtime exceptions via `pm2 logs`, confirm matching localhost ports in Nginx's `proxy_pass`, and check `/var/log/nginx/error.log`.",
      code: "sudo tail -f /var/log/nginx/error.log\npm2 logs --lines 100"
    },
    {
      lvl: "situation",
      q: "একটি ডকার কনটেইনার ব্যাকগ্রাউন্ডে অনবরত রিস্টার্ট লুপে আটকে গেছে (CrashLoopBackOff)। কীভাবে এর কারণ উদঘাটন করবে?",
      m: "যেহেতু কনটেইনার ক্র্যাশ হওয়া মাত্র বন্ধ হয়ে যাচ্ছে, তাই সরাসরি ভেতরে ঢোকা যায় না। সমাধান: (১) কনটেইনারের এক্সিট লগ দেখব: `docker logs --tail 100 <container_id>`। (২) যদি কোনো এরর লগ না থাকে, তবে কনটেইনারটিকে ওভাররাইড কমান্ড সহ ইন্টারেক্টিভ মোডে চালাব: `docker run -it --entrypoint sh <image_name>`। (৩) সাধারণত এর কারণ হয়: মিসিং `.env` ভ্যারিয়েবল, ডাটাবেজ হোস্ট অমিল, অথবা ফাইল পাথ ভুল থাকা। ত্রুটি সংশোধন করে নতুন ইমেজ বিল্ড করব।",
      b: "ক্র্যাশ লুপের কারণ জানতে docker logs দিয়ে সর্বশেষ লগ দেখতে হবে। কন্টেইনারের শেলের ভেতর ঢুকতে docker run -it --entrypoint sh চালিয়ে পরিবেশ ভেরিয়েবল ও ফাইলের পাথ পরীক্ষা করে সমাধান নিশ্চিত করতে হবে।",
      e: "Diagnose CrashLoopBackOff loops by checking logs via `docker logs --tail 100 <id>`. If it exits silently, override the entrypoint to launch an interactive debugging shell (`docker run -it --entrypoint sh <image>`), inspecting runtime env vars and file permissions.",
      code: "docker logs --tail 50 --timestamps dokani-api-container"
    },
    {
      lvl: "situation",
      q: "সার্ভারে মেমোরি লিকের কারণে PM2 প্রসেস মেমোরি ১.৫GB ছাড়িয়ে যাচ্ছে এবং সার্ভার স্লো হয়ে পড়ছে। PM2 দিয়ে অটো-হিলিং কীভাবে কনফিগার করবে?",
      m: "সমাধান: আমরা PM2 এর ইকোসিস্টেম ফাইলে `max_memory_restart` অপশন কনফিগার করব: `max_memory_restart: '1000M'`। এর ফলে যখনই কোনো নির্দিষ্ট নোড প্রসেসের মেমোরি ১GB অতিক্রম করবে, PM2 সম্পূর্ণ নিরবে ব্যাকগ্রাউন্ডে ওই প্রসেসটিকে রিস্টার্ট করে মেমোরি শূন্য করে ফ্রেশ করে দেবে—অন্যান্য প্রসেসগুলো চলমান থাকায় ক্লায়েন্ট কোনো ডাউনটাইম অনুভব করবে না। একই সাথে মেমোরি লিকের স্থায়ী কারণ খুঁজে বের করার জন্য হিপ স্ন্যাপশট ইনভেস্টিগেশন চালাব।",
      b: "পিএম২ ইকোসিস্টেমে max_memory_restart: '1000M' নির্ধারণ করে দিলে প্রসেসের মেমোরি ১ জিবি ছাড়িয়ে গেলেই পিএম২ নিজে থেকেই প্রসেসটি রিস্টার্ট করে মেমোরি ক্লিন করে দেয়, কোনো ডাউনটাইম ছাড়াই।",
      e: "Configure automatic self-healing in PM2 via `max_memory_restart: '1024M'`. Whenever a worker leaks beyond 1GB RAM, PM2 reloads that specific worker transparently while peer cluster workers absorb incoming connections seamlessly.",
      code: "module.exports = { apps: [{ name: 'api', script: 'dist/server.js', max_memory_restart: '1G' }] };"
    },
    {
      lvl: "situation",
      q: "উবুন্টু সার্ভারে এনজিনিক্স কনফিগারেশনে সিনট্যাক্স ভুল থাকায় `nginx -s reload` দিলে সার্ভার ডাউন হওয়ার ঝুঁকি রয়েছে। নিরাপদ রিলোড স্ট্র্যাটেজি কী?",
      m: "কখনোই টেস্ট না করে সরাসরি Nginx রিলোড বা রিস্টার্ট দেওয়া যাবে না! নিরাপদ পদ্ধতি: সবসময় আগে `sudo nginx -t` চালাব। এটি কনফিগারেশন ফাইলের প্রতিটি লাইন টেস্ট করে এবং সিনট্যাক্স সঠিক থাকলে `syntax is ok / test is successful` জানায়। শুধুমাত্র এবং শুধুমাত্র তখনই `sudo systemctl reload nginx` চালাব। এতে কোনো ভুল কনফিগারেশনের কারণে লাইভ সার্ভার বন্ধ হওয়ার কোনো সুযোগ থাকে না।",
      b: "এনজিনিক্স রিলোড করার আগে অবশ্যই sudo nginx -t চালিয়ে সিনট্যাক্স যাচাই করতে হবে। টেস্ট সফল হলেই কেবল systemctl reload nginx চালানো নিরাপদ।",
      e: "Never reload Nginx blindly. Always execute `sudo nginx -t` first to validate configuration syntax. Only reload the live service via `sudo systemctl reload nginx` after receiving positive syntax test affirmations, preventing production outages.",
      code: "sudo nginx -t && sudo systemctl reload nginx"
    },
    {
      lvl: "situation",
      q: "VPS সার্ভারে SSH পোর্ট ২২-এ প্রতি মিনিটে হাজার হাজার অবৈধ লগইন চেষ্টা (Brute-Force) হচ্ছে। কীভাবে সার্ভারকে সুরক্ষিত করবে?",
      m: "সুরক্ষা স্টেপস: (১) ডিফল্ট পোর্ট ২২ পরিবর্তন করে একটি কাস্টম হাই-পোর্ট (যেমন ৪২২২) দেব (`/etc/ssh/sshd_config`-এ `Port 4222`)। (২) পাসওয়ার্ড বেসড লগইন সম্পূর্ণ নিষিদ্ধ করব: `PasswordAuthentication no` (শুধুমাত্র SSH Key ভিত্তিক লগইন অ্যালাউ করব)। (৩) `Fail2ban` ইন্সটল ও কনফিগার করব—এটি ৩ বার ভুল লগইন চেষ্টা করা যে কোনো আইপিকে স্বয়ংক্রিয়ভাবে ২৪ ঘণ্টার জন্য ফায়ারওয়ালে ড্রপ করে ব্যান করে দেবে।",
      b: "এসএসএইচ ব্রুট ফোর্স ঠেকাতে পাসওয়ার্ড লগইন বন্ধ করে শুধুমাত্র এসএসএইচ কি অনুমোদন করতে হবে। ডিফল্ট পোর্ট ২২ পরিবর্তন করতে হবে এবং Fail2ban দিয়ে ভুল পাসওয়ার্ড দেওয়া আক্রমণকারী আইপি স্বয়ংক্রিয় ব্যান করতে হবে।",
      e: "Harden SSH by disabling password authentication (`PasswordAuthentication no`), enforcing cryptographic SSH keypairs exclusively, changing default port 22 to an arbitrary high port, and deploying `fail2ban` to automatically ban abusive IPs.",
      code: "# /etc/ssh/sshd_config\nPasswordAuthentication no\nPubkeyAuthentication yes\nPort 4222"
    },

    // --- REALWORLD (5 Questions) ---
    {
      lvl: "realworld",
      q: "Dokani POS-এর ব্যাকএন্ড এপিআই ক্লাস্টার উবুন্টু VPS-এ PM2, Nginx ও Let's Encrypt SSL সহ প্রোডাকশনে কীভাবে ডিপ্লয় করেছিলে?",
      m: "আমাদের আর্কিটেকচার ছিল: (১) DigitalOcean উবুন্টু VPS সার্ভারে Node.js, PM2 এবং Nginx সেটআপ। (২) PM2 Cluster Mode-এ নোড এপিআই রান করত (`pm2 start ecosystem.config.js -i max`), যা সার্ভারের সমস্ত সিপিইউ কোর ব্যবহার করত। (৩) Nginx রিভার্স প্রক্সি হিসেবে পোর্ট ৮০ ও ৪৪৩ হ্যান্ডেল করত এবং পোর্ট ৪০০০-এ নোড ক্লাস্টারে ট্রাফিক ফরওয়ার্ড করত। (৪) `certbot --nginx -d api.dokani.com` দিয়ে স্বয়ংক্রিয় Let's Encrypt SSL সার্টিফিকেট ইন্সটল এবং অটো-রিনিউ ক্রন কনফিগার করেছিলাম।",
      b: "দোকানি সার্ভারে আমরা উবুন্টু ভিপিএসে পিএম২ ক্লাস্টার মোডে নোড অ্যাপ চালিয়েছিলাম। সামনে এনজিনিক্স রিভার্স প্রক্সি হিসেবে ট্রাফিক রুট করত এবং সার্টবট (Certbot) দিয়ে লেটস এনক্রিপ্ট এসএসএল সার্টিফিকেট স্বয়ংক্রিয়ভাবে সক্রিয় ছিল।",
      e: "Deployed Dokani POS backend on Ubuntu VPS: PM2 managed clustered Node processes utilizing all CPU cores, fronted by Nginx as the edge reverse proxy, with SSL managed via automated Certbot Let's Encrypt certificate auto-renewals.",
      tip: "PM2 Cluster Mode + Nginx Reverse Proxy + Certbot SSL হলো নোড জেএস উৎপাদনের সবচেয়ে স্ট্যাবল ও প্রশংসিত স্ট্যাক।"
    },
    {
      lvl: "realworld",
      q: "Dokani POS-এর ডাটাবেজ ব্যাকআপ ও ডিজাস্টার রিকভারি: প্রতিদিন ভোর ৪টায় অটোমেটেড PostgreSQL ব্যাকআপ কীভাবে কনফিগার করেছিলে?",
      m: "আমরা একটি অটোমেটেড লিনাক্স ব্যাশ স্ক্রিপ্ট (`backup.sh`) লিখে ক্রন জবে (`crontab -e: 0 4 * * *`) শিডিউল করেছিলাম। স্ক্রিপ্টটি: (১) `pg_dump` দিয়ে ডাটাবেজ ডাম্প করত, (২) `gzip` দিয়ে কম্প্রেস করত, (৩) AWS CLI দিয়ে সরাসরি এনক্রিপ্টেড S3 বাকেটে আপলোড করত, (৪) টেলিগ্রাম বটে সাকসেস নোটিফিকেশন পাঠাত, (৫) লোকাল ডিস্ক থেকে ৭ দিনের পুরানো ব্যাকআপ ডিলিট করত। ফলে কোনো হার্ডওয়্যার ফেইলিওর হলেও ৩০ মিনিটের মধ্যে সম্পূর্ণ ডাটাবেজ রিস্টোর করা সম্ভব ছিল।",
      b: "দোকানি সিস্টেমে প্রতিদিন ভোর ৪টায় ক্রন জবের মাধ্যমে pg_dump দিয়ে ব্যাকআপ তৈরি করে জিপ কম্প্রেস করে অ্যামাজন এসথ্রিতে আপলোড করা হতো। সফল হলে টেলিগ্রামে মেসেজ আসত, যা সম্পূর্ণ স্বয়ংক্রিয় ব্যাকআপ সুরক্ষা নিশ্চিত করেছিল।",
      e: "Automated daily Dokani database backups via a cron script running at 4 AM: invoking `pg_dump`, compressing via `gzip`, shipping archives to encrypted AWS S3 buckets, and dispatching completion telemetry to team Slack channels.",
      code: "0 4 * * * /var/scripts/backup.sh >> /var/log/backup.log 2>&1"
    },
    {
      lvl: "realworld",
      q: "PTTABD প্ল্যাটফর্মে ভিডিও স্ট্রিমিং ও এপিআই ট্রাফিকের জন্য Nginx Caching এবং Rate Limiting কীভাবে অপটিমাইজ করেছিলে?",
      m: "আমরা Nginx-এ একটি মেমোরি জোন ভিত্তিক ক্যাশ কনফিগার করেছিলাম: `proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=api_cache:10m max_size=1g inactive=60m`। কোর্স সিলেবাস ও পাবলিক এপিআইতে `proxy_cache api_cache; proxy_cache_valid 200 10m;` দিয়ে ১০ মিনিটের জন্য ক্যাশ রাখতাম। সাথে বট অ্যাটাক ও ভিডিও স্ক্র্যাপিং ঠেকাতে `limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s` এনফোর্স করেছিলাম। এর ফলে ৯৫% ট্রাফিক Nginx মেমোরি থেকেই সার্ভ হতো এবং নোড ব্যাকএন্ড সম্পূর্ণ রিল্যাক্সড ছিল।",
      b: "পিটিটিএবিডিতে আমরা এনজিনিক্স প্রক্সি ক্যাশ ব্যবহার করে পাবলিক এপিআই রেসপন্স ১০ মিনিটের জন্য মেমরিতে ক্যাশ করেছিলাম এবং রেট লিমিটিং দিয়ে স্ক্র্যাপিং আটকেছিলাম। ফলে ৯৫% রিকোয়েস্ট সরাসরি এনজিনিক্স থেকেই ডেলিভারি হয়েছিল।",
      e: "Configured Nginx memory-backed proxy caching for read-heavy PTTABD endpoints (`proxy_cache_valid 200 10m`), complemented by IP-rate-limiting zones (`limit_req_zone rate=10r/s`) to deflect scraping bots while serving 95% of requests from Nginx cache.",
      code: "limit_req_zone $binary_remote_addr zone=api_limit:10m rate=20r/s;\nlocation /api/courses/ {\n  limit_req zone=api_limit burst=10 nodelay;\n  proxy_cache api_cache;\n}"
    },
    {
      lvl: "realworld",
      q: "Dokani POS-এর মাল্টি-টেন্যান্ট SaaS অ্যাপ্লিকেশনে Docker Compose দিয়ে ডেভেলপমেন্ট ও স্টেজিং পরিবেশ কীভাবে ১ ক্লিকে রেডি করেছিলে?",
      m: "নতুন ডেভেলপাররা যাতে ২ ঘণ্টায় সব সেটআপ করতে পারে, সেজন্য আমরা একটি সিঙ্গেল `docker-compose.yml` বানিয়েছি। এতে ৪টি সার্ভিস ছিল: (১) `api`: নোড এক্সপ্রেস ব্যাকএন্ড (হট-রিলোড ভলিউম মাউন্ট সহ), (২) `db`: PostgreSQL ১৬, (৩) `cache`: Redis ৭, (৪) `mailhog`: লোকাল ইমেইল টেস্টিং এসএমটিপি। একজন নতুন ডেভেলপার ক্লোন করে শুধু `docker compose up -d` দিলে সম্পূর্ণ মাল্টি-টেন্যান্ট SaaS সিস্টেম তার মেশিনে লাইভ হয়ে যেত—কোনো ম্যানুয়াল কনফিগারেশন ছাড়াই।",
      b: "টিম অনবোর্ডিং সহজ করতে আমরা ডকার কম্পোজ দিয়ে এক ক্লিকে সম্পূর্ণ ডেভেলপমেন্ট এনভায়রনমেন্ট তৈরি করেছিলাম। নোড এপিআই, পোস্টগ্রেস ও রেডিস স্বয়ংক্রিয়ভাবে প্রস্তুত হয়ে নতুন ডেভেলপারের সময় সাশ্রয় করেছিল।",
      e: "Engineered single-click developer onboarding via docker-compose encapsulating the Express API with hot-reload volume mounts, PostgreSQL, Redis, and MailHog. New hires run `docker compose up -d` to spin up the entire multi-tenant stack in 60 seconds.",
      tip: "এক ক্লিকে ডকার কম্পোজ দিয়ে পুরো সিস্টেম চালুর অভিজ্ঞতা সিনিয়র ডেভঅপ্স ম্যাচিউরিটির পরিচায়ক।"
    },
    {
      lvl: "realworld",
      q: "উচ্চগতির উৎপাদন পরিবেশে সার্ভার স্কেলিং ও হেলথ মনিটরিংয়ে তোমার আর্কিটেকচারাল চেকলিস্ট কী?",
      m: "আমার প্রোডাকশন চেকলিস্ট: (১) কোনো সিঙ্গেল পয়েন্ট অব ফেইলিওর না রাখা (Redundant nodes)। (২) Nginx রিভার্স প্রক্সি এবং UFW ফায়ারওয়াল এনফোর্স করা। (৩) PM2 বা ডকার দিয়ে অটো-হিলিং এবং রিসোর্স লিমিট নিশ্চিত করা। (৪) Prometheus এবং Grafana দিয়ে সিপিইউ, মেমোরি ও ইভেন্ট লুপ ল্যাগ মনিটর করা। (৫) প্রতিদিনের অফ-সাইট ডেটাবেজ ব্যাকআপ ও টেস্টেড রিস্টোরেশন স্ক্রিপ্ট নিশ্চিত করা।",
      b: "আমার উৎপাদন চেকলিস্টে রয়েছে: রিভার্স প্রক্সি ও ফায়ারওয়াল নিরাপত্তা, অটো-হিলিং প্রসেস ম্যানেজমেন্ট, প্রমিথিউস ও গ্রাফানা মনিটরিং এবং প্রতিদিনের স্বয়ংক্রিয় অফ-সাইট ডাটাবেজ ব্যাকআপ।",
      e: "My production scaling and resilience checklist: (1) Nginx reverse proxy with SSL termination & UFW firewalling, (2) Self-healing container processes bounded by cgroup limits, (3) Real-time Prometheus metrics & event loop latency alerting, (4) Zero-downtime rolling reload deployments, and (5) Automated off-site database backups with verified disaster recovery pipelines.",
      tip: "এই সংক্ষিপ্ত ও আত্মবিশ্বাসী চেকলিস্টটি ইন্টারভিউয়ারকে তোমার পূর্ণাঙ্গ ব্যাকএন্ড ও ডেভঅপ্স দক্ষতার ওপর শতভাগ আস্থা এনে দেবে।"
    }
  ]
};
