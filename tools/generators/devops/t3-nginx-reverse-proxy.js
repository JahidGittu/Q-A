// Topic 3: Nginx Reverse Proxy, Load Balancing & SSL (25 Questions: 5 lvl1, 5 lvl2, 5 lvl3, 5 situation, 5 realworld)
module.exports = {
  id: "nginx-reverse-proxy-ssl",
  name: "Nginx Reverse Proxy, Load Balancing & SSL",
  desc: "Reverse Proxy Architecture, upstream Load Balancing, Let's Encrypt Certbot SSL, Rate Limiting, Gzip Compression, WebSocket Proxying",
  items: [
    // --- LEVEL 1 (5 Questions) ---
    {
      lvl: "lvl1",
      q: "Reverse Proxy কী এবং Node.js অ্যাপ্লিকেশনকে সরাসরি পোর্টে না রেখে কেন সামনে Nginx বসানো আবশ্যক?",
      m: "Reverse Proxy হলো একটি ইন্টারমিডিয়েট সার্ভার যা ইন্টারনেটের ক্লায়েন্টদের থেকে রিকোয়েস্ট গ্রহণ করে ব্যাকএন্ড অ্যাপ্লিকেশন সার্ভারে ফরোয়ার্ড করে। Node.js সার্ভারকে সরাসরি পোর্ট ৮০ বা ৪৪৩-এ এক্সপোজ করা মারাত্মক ক্ষতিকর কারণ: (১) Node.js সিঙ্গেল-থ্রেডেড হওয়ায় SSL/TLS ক্রিপ্টোগ্রাফিক হ্যান্ডশেক প্রসেস করতে গিয়ে সিপিইউ ক্লান্ত হয়ে যায়। (২) Nginx সি (C) ল্যাঙ্গুয়েজে লেখা অত্যন্ত দ্রুত ও অপটিমাইজড ইভেন্ট-ড্রিভেন সার্ভার—যা স্ট্যাটিক ফাইল ক্যাশিং, Gzip কম্প্রেশন, SSL টার্মিনেশন, DDoS রেট লিমিটিং এবং লোড ব্যালেন্সিং একাই অনায়াসে হ্যান্ডেল করতে পারে এবং নোড সার্ভারকে নিরাপদ রাখে।",
      b: "রিভার্স প্রক্সি ক্লায়েন্ট ও ব্যাকএন্ড সার্ভারের মাঝে মধ্যস্থতাকারী হিসেবে কাজ করে। নোড.জেএস সরাসরি এক্সপোজ করলে SSL হ্যান্ডশেক ও ভারী স্ট্যাটিক ফাইলে স্লো হয়ে যায়। Nginx সামনে থাকলে তা SSL টার্মিনেশন, ক্যাশিং এবং নিরাপত্তা রক্ষা করে নোড ব্যাকএন্ডকে মুক্ত রাখে।",
      e: "A Reverse Proxy sits in front of backend web servers, intercepting client traffic and proxying requests. Exposing Node.js directly is dangerous: single-threaded Node.js is inefficient at SSL/TLS handshakes and static file serving. Nginx offloads SSL termination, static asset caching, Gzip compression, and DDoS protection at wire speed.",
      tip: "বলো: 'Nginx acts as a high-performance shield offloading SSL termination, static file serving, and rate limiting from Node.js.'"
    },
    {
      lvl: "lvl1",
      q: "Nginx কনফিগারেশনে `proxy_pass` এবং গুরুত্বপূর্ণ প্রক্সি হেডারগুলোর কাজ কী?",
      m: "`proxy_pass` নির্দেশ করে ইনকামিং রিকোয়েস্টটি কোন অভ্যন্তরীণ পোর্টে ফরোয়ার্ড হবে (যেমন `proxy_pass http://localhost:5000;`)। তবে প্রক্সি করার সাথে সাথে মূল ক্লায়েন্টের আইপি অ্যাড্রেস হারিয়ে যাওয়ার ঝুঁকি থাকে! তাই গুরুত্বপূর্ণ হেডারগুলো পাস করা বাধ্যতামূলক: (১) `proxy_set_header Host $host`: মূল ডোমেন নাম ব্যাকএন্ডে পাঠানো। (২) `proxy_set_header X-Real-IP $remote_addr`: ক্লায়েন্টের আসল আইপি অ্যাড্রেস পাঠানো। (৩) `proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for`: প্রক্সি চেইনের আইপি তালিকা। (৪) `proxy_set_header X-Forwarded-Proto $scheme`: রিকোয়েস্টটি HTTP নাকি HTTPS ছিল তা জানানো।",
      b: "proxy_pass ব্যাকএন্ড সার্ভারে রিকোয়েস্ট পাঠায়। আর proxy_set_header ক্লায়েন্টের আসল আইপি (X-Real-IP) এবং প্রোটোকল (X-Forwarded-Proto) ব্যাকএন্ডে পাঠাতে ব্যবহৃত হয় যাতে ব্যাকএন্ড ক্লায়েন্টের প্রকৃত পরিচয় জানতে পারে।",
      e: "proxy_pass forwards incoming client requests to upstream servers. Setting proxy headers (Host, X-Real-IP, X-Forwarded-For, X-Forwarded-Proto) ensures the backend application receives the authentic client IP address, hostname, and original connection protocol rather than Nginx's loopback address.",
      code: "location /api/ {\n  proxy_pass http://127.0.0.1:5000;\n  proxy_set_header Host $host;\n  proxy_set_header X-Real-IP $remote_addr;\n  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n  proxy_set_header X-Forwarded-Proto $scheme;\n}"
    },
    {
      lvl: "lvl1",
      q: "Ubuntu সার্ভারে Let's Encrypt এবং `Certbot` ব্যবহার করে কীভাবে সম্পূর্ণ ফ্রিতে SSL/TLS সার্টিফিকেট কনফিগার ও অটো-রিনিউ করবে?",
      m: "Certbot হলো ইলেকট্রনিক ফ্রন্টিয়ার ফাউন্ডেশন (EFF)-এর একটি অটোমেশন টুল। সেটআপের ধাপ: (১) Certbot এবং Nginx প্লাগইন ইনস্টল করা: `sudo apt install certbot python3-certbot-nginx`। (২) সার্টিফিকেট ইনস্টল ও Nginx কনফিগারেশন অটো-আপডেট: `sudo certbot --nginx -d dokani.bip.sg -d www.dokani.bip.sg`। Certbot স্বয়ংক্রিয়ভাবে ACME চ্যালেঞ্জ সম্পন্ন করে, SSL সার্টিফিকেট ডাউনলোড করে এবং Nginx কনফিগে HTTPS ও 443 পোর্ট ব্লক বসিয়ে দেয়। (৩) Certbot স্বয়ংক্রিয়ভাবে একটি সিস্টেম ক্রন বা systemd টাইমার বসায় (`certbot.timer`) যা সার্টিফিকেট ৯০ দিন পূর্ণ হওয়ার আগেই প্রতি ৬০ দিনে অটোমেটিক রিনিউ করে নেয়।",
      b: "Certbot ইনস্টল করে certbot --nginx -d domain.com চালালেই স্বয়ংক্রিয়ভাবে ফ্রি SSL সার্টিফিকেট যুক্ত হয় এবং HTTP ট্রাফিক HTTPS-এ রিডাইরেক্ট হয়। systemd টাইমারের মাধ্যমে এটি প্রতি ৬০ দিন পর স্বয়ংক্রিয়ভাবে রিনিউ হয়ে যায়।",
      e: "Certbot automates Let's Encrypt SSL/TLS provisioning. Running certbot --nginx -d example.com handles ACME domain validation, downloads x509 certificates, configures Nginx HTTPS blocks, and sets up 301 redirects. certbot.timer handles automated background renewal before 90-day expiry.",
      code: "sudo apt install -y certbot python3-certbot-nginx\nsudo certbot --nginx -d dokani.bip.sg\n# Verify auto-renewal:\nsudo certbot renew --dry-run"
    },
    {
      lvl: "lvl1",
      q: "Ubuntu-তে Nginx কনফিগারেশন হায়ারার্কি (`sites-available` বনাম `sites-enabled`) কীভাবে সাজানো থাকে?",
      m: "(১) `/etc/nginx/sites-available/`: এই ডিরেক্টরিতে আপনার সমস্ত ওয়েবসাইটের কনফিগারেশন ফাইল তৈরি ও ড্রাফট করা থাকে (যেমন `dokani.conf`)। এখানে ফাইল থাকা মানেই সাইটটি লাইভ নয়। (২) `/etc/nginx/sites-enabled/`: এই ডিরেক্টরিতে শুধুমাত্র সেই কনফিগারেশনগুলোর সিম্বলিক লিঙ্ক (Symlink) রাখা হয় যেগুলো বর্তমানে সার্ভারে সক্রিয় ও লাইভ! কোনো সাইট লাইভ করতে হলে লিঙ্ক করতে হয়: `sudo ln -s /etc/nginx/sites-available/dokani.conf /etc/nginx/sites-enabled/`। সাইট সাময়িক বন্ধ করতে চাইলে শুধুমাত্র সিম্বলিক লিঙ্কটি মুছে দিলেই হয়, মূল কনফিগ ফাইল অক্ষত থাকে।",
      b: "sites-available এ সমস্ত কনফিগারেশন ফাইল সংরক্ষিত থাকে। আর sites-enabled এ শুধুমাত্র সক্রিয় সাইটগুলোর সিম্বলিক লিঙ্ক থাকে। ln -s দিয়ে লিঙ্ক যুক্ত করে সাইট লাইভ করা হয়।",
      e: "sites-available stores configurations for all sites hosted on the server. sites-enabled contains symbolic links to files in sites-available that are actively served. Creating a symlink (ln -s) enables a site, while unlinking disables it without destroying configuration files.",
      code: "sudo ln -s /etc/nginx/sites-available/dokani.conf /etc/nginx/sites-enabled/\nsudo nginx -t\nsudo systemctl reload nginx"
    },
    {
      lvl: "lvl1",
      q: "Nginx কনফিগারেশন পরিবর্তনের পর কেন সরাসরি `restart` না দিয়ে প্রথমে `nginx -t` এবং তারপর `reload` দিতে হয়?",
      m: "মারাত্মক পার্থক্য: (১) `nginx -t`: কনফিগারেশন ফাইলগুলোতে কোনো সিনট্যাক্স এরর, মিসিং সেমিকোলন বা ভুল পাথ আছে কি না তা মেমোরিতে টেস্ট করে। যদি ভুল থাকে তবে সে পরিষ্কার এরর লাইন নম্বর বলে দেয়। আপনি যদি টেস্ট না করে সরাসরি রিস্টার্ট দেন এবং কনফিগে ভুল থাকে, তবে Nginx সার্ভিস ক্র্যাশ করে বন্ধ হয়ে যাবে এবং প্রোডাকশন সাইট সাথে সাথে ডাউন হয়ে যাবে! (২) `systemctl reload nginx`: কোনো অ্যাক্টিভ কানেকশন বা ট্রাফিক না কেটে (Zero-Downtime) ব্যাকগ্রাউন্ডে নতুন কনফিগারেশন লোড করে। তাই রুল: `nginx -t` পাস করলে তবেই `reload`! কখনোই ব্লাইন্ড রিস্টার্ট নয়।",
      b: "nginx -t কনফিগারেশনের সিনট্যাক্স যাচাই করে। ভুল কনফিগে সরাসরি রিস্টার্ট দিলে সাইট ক্র্যাশ করে ডাউন হয়ে যায়। টেস্ট পাস করার পর reload দিলে কোনো কানেকশন ড্রপ ছাড়া জিরো-ডাউনটাইমে নতুন কনফিগ কার্যকর হয়।",
      e: "nginx -t parses configuration syntax for errors without applying them. Issuing a blind restart on broken syntax immediately terminates Nginx, causing downtime. Once validated, systemctl reload nginx initiates a graceful zero-downtime worker re-spawn without dropping active client connections.",
      tip: "বলো: 'Always test syntax with nginx -t before issuing a graceful reload; never blind restart.'"
    },

    // --- LEVEL 2 (5 Questions) ---
    {
      lvl: "lvl2",
      q: "Nginx-এ `upstream` ব্লক ব্যবহার করে Load Balancing কীভাবে কনফিগার করা হয় এবং ৩টি অ্যালগরিদমের নাম কী?",
      m: "`upstream` ব্লক দিয়ে একাধিক ব্যাকএন্ড নোড সার্ভারের একটি পুল তৈরি করা হয়। Nginx ক্লায়েন্ট ট্রাফিক এই পুলের সার্ভারগুলোর মধ্যে সুষমভাবে ভাগ করে দেয়। ৩টি অ্যালগরিদম: (১) `Round Robin (ডিফল্ট)`: ক্রমানুসারে একটির পর একটি সার্ভারে রিকোয়েস্ট পাঠায়। (২) `least_conn`: যে সার্ভারে বর্তমানে সবচেয়ে কম অ্যাক্টিভ কানেকশন আছে সেখানে নতুন রিকোয়েস্ট পাঠায় (লম্বা রিকোয়েস্ট প্রসেসিংয়ের জন্য সেরা)। (৩) `ip_hash`: ক্লায়েন্টের আইপি হ্যাশ করে ট্রাফিক পাঠায়, ফলে নির্দিষ্ট ক্লায়েন্ট সবসময় একই নির্দিষ্ট ব্যাকএন্ড সার্ভারে হিট করে (Stateful Session Persistence-এর জন্য উপযোগী)।",
      b: "upstream ব্লক একাধিক নোড সার্ভারের মাঝে ট্রাফিক ভাগ করে দেয়। রাউন্ড রবিন ক্রমানুসারে রিকোয়েস্ট পাঠায়, least_conn সবচেয়ে ফাঁকা সার্ভারে পাঠায় এবং ip_hash নির্দিষ্ট ক্লায়েন্টকে নির্দিষ্ট সার্ভারে যুক্ত রাখে।",
      e: "The upstream directive groups backend server clusters. Algorithms: Round Robin distributes traffic sequentially; least_conn routes requests to the instance holding the fewest active connections; ip_hash deterministically binds clients to specific instances based on client IPv4/IPv6 hashes for sticky sessions.",
      code: "upstream backend_cluster {\n  least_conn;\n  server 127.0.0.1:5001;\n  server 127.0.0.1:5002;\n  server 127.0.0.1:5003;\n}\nserver {\n  location / {\n    proxy_pass http://backend_cluster;\n  }\n}"
    },
    {
      lvl: "lvl2",
      q: "Nginx Rate Limiting (`limit_req_zone` এবং `limit_req`) কীভাবে ব্রুট-ফোর্স ও DDoS আক্রমণ প্রতিহত করে?",
      m: "Nginx লিকি বাকেট (Leaky Bucket) অ্যালগরিদম ব্যবহার করে রিকোয়েস্টের গতি নিয়ন্ত্রণ করে। `http` ব্লকে একটি মেমোরি জোন ডিফাইন করি: `limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;` (প্রতিটি আইপির জন্য সেকেন্ডে সর্বোচ্চ ১০টি রিকোয়েস্ট)। এরপর সংবেদনশীল রাউটে (যেমন `/api/auth/login`) লিমিট বসাই: `limit_req zone=api_limit burst=5 nodelay;`। যদি কোনো আক্রমণকারী সেকেন্ডে শত শত রিকোয়েস্ট পাঠায়, তবে ৫টি বাফার ছাড়া বাকি সব রিকোয়েস্ট Nginx নিজেই `HTTP 429 Too Many Requests` দিয়ে ড্রপ করে দেয়—ব্যাকএন্ড নোড সার্ভারে ১টিও অপ্রয়োজনীয় লোড পৌঁছায় না।",
      b: "limit_req_zone ক্লায়েন্ট আইপির ওপর ভিত্তি করে রিকোয়েস্টের গতিসীমা বেঁধে দেয়। অনুমোদিত সীমার বেশি রিকোয়েস্ট এলে Nginx নিজেই 429 Too Many Requests ফিরিয়ে দেয় এবং ব্যাকএন্ড নোড সার্ভারকে ব্রুট-ফোর্স আক্রমণ থেকে রক্ষা করে।",
      e: "Nginx implements token/leaky bucket rate limiting via limit_req_zone. Bounding requests per IP (e.g. rate=10r/s) drops or queues bursting traffic. Excess abusive traffic is rejected immediately with HTTP 429 Too Many Requests at the reverse proxy layer, shielding backend CPU cycles.",
      code: "limit_req_zone $binary_remote_addr zone=login_limit:10m rate=5r/s;\n\nlocation /api/v1/auth/login {\n  limit_req zone=login_limit burst=3 nodelay;\n  proxy_pass http://api_backend;\n}"
    },
    {
      lvl: "lvl2",
      q: "Nginx-এ WebSocket সংযোগ প্রক্সি করার জন্য কেন স্পেশাল হেডার কনফিগারেশন আবশ্যক?",
      m: "WebSocket সংযোগ একটি স্ট্যান্ডার্ড HTTP রিকোয়েস্ট দিয়ে শুরু হয় কিন্তু পরে এটি দ্বিমুখী TCP সকেটে 'Upgrade' হয়। স্বাভাবিকভাবে Nginx প্রতিটি রিকোয়েস্টের `Connection` হেডার ড্রপ বা ক্লোজ করে দেয়, ফলে WebSocket হ্যান্ডশেক ব্যর্থ হয়। সমাধান: Nginx-এ স্পষ্টভাবে নির্দেশ দিতে হবে প্রোটোকল আপগ্রেড পাস করার জন্য: `proxy_http_version 1.1;`, `proxy_set_header Upgrade $http_upgrade;`, এবং `proxy_set_header Connection \"upgrade\";`। এই ৩টি হেডার থাকলে Nginx ক্লায়েন্ট ও ব্যাকএন্ডের মাঝের দীর্ঘস্থায়ী সকেট টানেলটি নির্বিঘ্নে বজায় রাখে।",
      b: "ওয়েবসকেট হ্যান্ডশেক সফল করতে Nginx-এ proxy_http_version 1.1, Upgrade এবং Connection \"upgrade\" হেডার যোগ করতে হয়। অন্যথায় Nginx সকেট কানেকশন ড্রপ করে দেয়।",
      e: "WebSockets initiate via HTTP 1.1 Upgrade handshakes. Nginx drops hop-by-hop HTTP headers by default, severing socket negotiations. Forwarding proxy_http_version 1.1 with explicit Upgrade and Connection 'upgrade' headers preserves bidirectional persistent TCP streams.",
      code: "location /socket.io/ {\n  proxy_pass http://api_backend;\n  proxy_http_version 1.1;\n  proxy_set_header Upgrade $http_upgrade;\n  proxy_set_header Connection \"upgrade\";\n  proxy_read_timeout 86400s; # Keep long connections alive\n}"
    },
    {
      lvl: "lvl2",
      q: "Nginx Gzip Compression এবং Static Asset Caching কীভাবে ওয়েবসাইটের লোডিং স্পিড ৫ গুণ বাড়িয়ে দেয়?",
      m: "Nginx টেক্সট-বেসড রেসপন্স (HTML, CSS, JS, JSON) অন-দ্য-ফ্লাই জিপ করে ক্লায়েন্টে পাঠাতে পারে (`gzip on; gzip_types text/plain application/javascript application/json;`)। এতে পে-লোড সাইজ ৭০-৮০% সংকুচিত হয়ে যায়। পাশাপাশি স্ট্যাটিক অ্যাসেটের জন্য (যেমন ইমেজ, ফন্ট, বান্ডেল ফাইল) ব্রাউজার ক্যাশিং হেডার সেট করা যায়: `expires 30d; add_header Cache-Control \"public, no-transform\";`। ব্রাউজার একবার ফাইল ডাউনলোড করলে পরবর্তী ৩০ দিন সার্ভারে কোনো রিকোয়েস্টই পাঠায় না—ফলে পেজ লোড হয় নিমেষে।",
      b: "gzip দিয়ে HTML, CSS ও JS ফাইলের সাইজ ৭০% কমিয়ে নেটওয়ার্কে পাঠানো হয়। আর Cache-Control হেডার দিয়ে ব্রাউজারে স্ট্যাটিক ফাইল ক্যাশ করে রাখলে পেজ লোডিং গতি বহুগুণ বৃদ্ধি পায়।",
      e: "Enabling gzip compression slashes text payload bandwidth consumption up to 80%. Supplementing with aggressive static asset Cache-Control headers (expires 30d; Cache-Control public) instructs client browsers to serve images and compiled JS directly from disk cache, dropping repeat-visit latency to zero.",
      code: "gzip on;\ngzip_comp_level 6;\ngzip_types text/plain text/css application/json application/javascript text/xml;\n\nlocation ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff2)$ {\n  expires 30d;\n  add_header Cache-Control \"public, max-age=2592000, immutable\";\n}"
    },
    {
      lvl: "lvl2",
      q: "Nginx-এ `client_max_body_size` কী এবং ফাইল আপলোডে `413 Request Entity Too Large` এরর কীভাবে ফিক্স করবে?",
      m: "Nginx বাই-ডিফল্ট সুরক্ষার স্বার্থে ইনকামিং রিকোয়েস্টের বডি সাইজ মাত্র ১ মেগাবাইটে (1MB) সীমাবদ্ধ রাখে (`client_max_body_size 1m;`)। যদি কোনো ইউজার ২MB সাইজের ছবি বা ইনভয়েস পিডিএফ আপলোড করে, তবে Nginx ব্যাকএন্ডে রিকোয়েস্ট না পাঠিয়েই ব্রাউজারে `413 Request Entity Too Large` এরর ফিরিয়ে দেয়। সমাধান: Nginx কনফিগের `http`, `server`, অথবা নির্দিষ্ট `/upload` লোকেশন ব্লকে লিমিট বাড়িয়ে দেওয়া: `client_max_body_size 25M;`। এরপর `nginx -s reload` দিলেই বড় ফাইল আপলোড সফল হয়।",
      b: "ডিফল্টভাবে Nginx ১MB-র বেশি ফাইল আপলোড করতে দেয় না এবং 413 এরর দেয়। Nginx কনফিগে client_max_body_size 25M সেট করে লিমিট বৃদ্ধি করলেই বড় ফাইল আপলোড করা সম্ভব হয়।",
      e: "Nginx defaults client_max_body_size to 1MB to protect buffers against memory saturation. When users upload images or documents exceeding 1MB, Nginx rejects the payload with HTTP 413. Elevate the limit inside the server or location block via client_max_body_size 25M.",
      code: "server {\n  client_max_body_size 25M;\n  location /api/upload {\n    proxy_pass http://api_backend;\n  }\n}"
    },

    // --- LEVEL 3 (5 Questions) ---
    {
      lvl: "lvl3",
      q: "SSL/TLS Hardening: Nginx-এ SSL Labs 'A+' রেটিং পাওয়ার জন্য আধুনিক TLS সাইফার স্যুট ও HSTS কীভাবে কনফিগার করবে?",
      m: "পুরনো ও অনিরাপদ প্রোটোকল (SSLv3, TLS 1.0, TLS 1.1) সম্পূর্ণ নিষিদ্ধ করতে হবে। কনফিগারেশন: (১) শুধুমাত্র আধুনিক প্রোটোকল চালু রাখা: `ssl_protocols TLSv1.2 TLSv1.3;`। (২) স্ট্রং সাইফার স্যুট স্পেসিফাই করা (`ECDHE-ECDSA-AES128-GCM-SHA256...`)। (৩) `HSTS (HTTP Strict Transport Security)` এনাবল করা: `add_header Strict-Transport-Security \"max-age=63072000; includeSubDomains; preload\" always;`—যা ব্রাউজারকে নির্দেশ করে পরবর্তী ২ বছর সাইটে শুধুমাত্র HTTPS দিয়ে ঢুকতে। (৪) `SSL Session Caching` ও `OCSP Stapling` চালু করা যাতে হ্যান্ডশেক গতি দ্রুত হয়।",
      b: "A+ SSL রেটিং পেতে TLS 1.2 ও 1.3 চালু রেখে পুরনো প্রোটোকল বন্ধ করতে হয়। HSTS হেডার যোগ করে ব্রাউজারকে আজীবন HTTPS ব্যবহারে বাধ্য করা হয় এবং OCSP স্ট্যাপলিং দিয়ে সার্টিফিকেট ভেরিফিকেশন ফাস্ট করা হয়।",
      e: "Achieving an SSL Labs A+ rating requires restricting protocols to ssl_protocols TLSv1.2 TLSv1.3, declaring strong forward-secrecy cipher suites, enabling OCSP Stapling, and enforcing HTTP Strict Transport Security (HSTS) with preload to prevent SSL-stripping man-in-the-middle attacks.",
      code: "ssl_protocols TLSv1.2 TLSv1.3;\nssl_prefer_server_ciphers on;\nssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384';\nadd_header Strict-Transport-Security \"max-age=63072000; includeSubDomains; preload\" always;\nssl_stapling on;\nssl_stapling_verify on;"
    },
    {
      lvl: "lvl3",
      q: "Nginx Worker Architecture: `worker_processes`, `worker_connections`, এবং `epoll` কীভাবে হাই-কনকারেন্সি ট্রাফিক হ্যান্ডেল করে?",
      m: "Nginx মাল্টি-প্রসেস ইভেন্ট-ড্রিভেন আর্কিটেকচার মেনে চলে: (১) `worker_processes auto;`: সার্ভারের উপলব্ধ সিপিইউ কোরের সমপরিমাণ ওয়ার্কার প্রসেস স্পন করে। (২) `worker_connections 1024;` বা `4096;`: প্রতিটি ওয়ার্কার প্রসেস একসাথে কতগুলো কনকারেন্ট সকেট হ্যান্ডেল করতে পারবে তা নির্দেশ করে। মোট কনকারেন্ট ক্লায়েন্ট ক্যাপাসিটি = `worker_processes * worker_connections`। (৩) লিনাক্সে Nginx ডিফল্টভাবে `epoll` ইভেন্ট মেকানিজম ব্যবহার করে—যা `O(1)` সময়ে লাখ লাখ সকেটের মধ্যে কোনটিতে ডেটা এসেছে তা ডিটেক্ট করে। কোনো ব্লকিং ছাড়াই একটি মাত্র সার্ভার ১০,০০০+ সমান্তরাল কানেকশন (C10K Problem) অনায়াসে হ্যান্ডেল করতে পারে।",
      b: "Nginx সিপিইউ কোরের অনুপাতে worker_processes এবং প্রতি প্রসেসে worker_connections ব্যবহার করে। লিনাক্সের epoll মেকানিজম দিয়ে এটি কোনো সিপিইউ ওভারহেড ছাড়াই একসাথে হাজার হাজার সমান্তরাল ক্লায়েন্ট কানেকশন পরিচালনা করে।",
      e: "Nginx utilizes an asynchronous, non-blocking master-worker architecture. worker_processes auto creates one worker per physical CPU core; each worker processes up to worker_connections connections concurrently via Linux kernel epoll, efficiently conquering the C10K concurrent socket concurrency ceiling.",
      code: "worker_processes auto;\nevents {\n  worker_connections 4096;\n  use epoll;\n  multi_accept on;\n}"
    },
    {
      lvl: "lvl3",
      q: "Nginx মাইক্রো-ক্যাশিং (FastCGI / Proxy Cache) দিয়ে ডায়নামিক এপিআই রেসপন্সে ডাটাবেজ হিট ৯৯% কীভাবে কমাবে?",
      m: "যেসব এপিআই ডেটা প্রতি সেকেন্ডে বদলায় না কিন্তু হাজার হাজার মানুষ হিট করে (যেমন প্রোডাক্ট ক্যাটালগ বা পাবলিক হোমপেজ), সেগুলোতে 'Micro-caching' যুগান্তকারী সমাধান। আমরা Nginx-এ মেমোরি জোন বানাই: `proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=api_cache:10m max_size=1g inactive=60m;`। এরপর এপিআই লোকেশনে নির্দেশ দিই: `proxy_cache api_cache; proxy_cache_valid 200 5s;` (রেসপন্স মাত্র ৫ সেকেন্ড ক্যাশ থাকবে)। এর ফলে প্রতি ৫ সেকেন্ডে প্রথম রিকোয়েস্টটি শুধু ডাটাবেজে যায় এবং পরবর্তী ৫০০০টি রিকোয়েস্ট Nginx সরাসরি মেমোরি থেকে ১ মিলিসেকেন্ডে রিটার্ন করে—ডেটাবেজের ওপর প্রেশার শূন্যে নেমে আসে! `proxy_cache_use_stale updating` ব্যাকগ্রাউন্ড রিফ্রেশ নিশ্চিত করে।",
      b: "মাইক্রো-ক্যাশিং এপিআই রেসপন্স মাত্র ৫ সেকেন্ডের জন্য Nginx মেমোরিতে ক্যাশ করে রাখে। ফলে প্রতি ৫ সেকেন্ডে মাত্র ১টি রিকোয়েস্ট ডেটাবেজে যায় এবং বাকি হাজার হাজার ইউজার Nginx মেমোরি থেকে তাৎক্ষণিক ডেটা পায়।",
      e: "Micro-caching stores dynamic API responses in Nginx memory for short bursts (e.g. 5 seconds). During traffic spikes, the initial request hydrates the cache, and all subsequent concurrent hits are served directly from Nginx RAM buffers in sub-millisecond time via proxy_cache_valid 200 5s.",
      code: "proxy_cache_path /var/cache/nginx keys_zone=micro:10m levels=1:2 inactive=60s max_size=500m;\nlocation /api/products/public {\n  proxy_cache micro;\n  proxy_cache_valid 200 5s;\n  proxy_cache_use_stale error timeout updating http_500 http_502;\n  add_header X-Cache-Status $upstream_cache_status;\n  proxy_pass http://api_backend;\n}"
    },
    {
      lvl: "lvl3",
      q: "Nginx Security Headers: X-Frame-Options, CSP, X-Content-Type-Options, এবং Referrer-Policy কেন প্রোডাকশনে আবশ্যক?",
      m: "সিকিউরিটি হেডারগুলো ব্রাউজার স্তরে বিভিন্ন সাইবার অ্যাটাক ব্লক করে: (১) `X-Frame-Options DENY / SAMEORIGIN`: সাইটকে অন্য কারও iframe-এ লোড হওয়া ঠেকায় (Clickjacking প্রতিরোধ)। (২) `X-Content-Type-Options nosniff`: ব্রাউজারকে ফাইলের MIME টাইপ অনুমান করা থেকে বিরত রাখে (MIME confusion attack রোধ)। (৩) `Content-Security-Policy (CSP)`: শুধুমাত্র অনুমোদিত উৎস থেকে স্ক্রিপ্ট চলা নিশ্চিত করে (XSS আক্রমণ নস্যাৎ করে)। (৪) `Referrer-Policy strict-origin-when-cross-origin`: থার্ড পার্টি সাইটে গোপনীয় ইউআরএল টোকেন বা রেফারার ফাঁস হওয়া আটকায়।",
      b: "এই হেডারগুলো ব্রাউজারে ক্লিকজ্যাকিং, এক্সএসএস এবং ডেটা লিক হওয়া ঠেকায়। X-Frame-Options আইফ্রেম আক্রমণ বন্ধ করে, nosniff ফাইল টাইপ জালিয়াতি ঠেকায় এবং CSP ক্ষতিকর জাভাস্ক্রিপ্ট রান হওয়া প্রতিরোধ করে।",
      e: "Security headers instruct browsers to enforce strict client-side sandboxing: X-Frame-Options SAMEORIGIN thwarts clickjacking, X-Content-Type-Options nosniff eliminates MIME-sniffing exploits, and a robust Content-Security-Policy (CSP) mitigates Cross-Site Scripting (XSS).",
      code: "add_header X-Frame-Options \"SAMEORIGIN\" always;\nadd_header X-Content-Type-Options \"nosniff\" always;\nadd_header X-XSS-Protection \"1; mode=block\" always;\nadd_header Referrer-Policy \"strict-origin-when-cross-origin\" always;"
    },
    {
      lvl: "lvl3",
      q: "Zero-Downtime Deployment-এ Nginx Active Health Checks এবং `fail_timeout` / `max_fails` কীভাবে ব্যর্থ নোড বাদ দেয়?",
      m: "আপস্ট্রিম ক্লাস্টারে যদি ৩টি নোড থাকে এবং ১টি নোড ক্র্যাশ করে, তবে ক্লায়েন্টরা যেন কোনো `502 Bad Gateway` এরর না পায়, সেজন্য Nginx প্যাসিভ হেলথচেক প্যারামিটার কনফিগার করা হয়: `server 127.0.0.1:5001 max_fails=3 fail_timeout=10s;`। এর অর্থ: যদি ৫০০১ পোর্টে পরপর ৩টি রিকোয়েস্ট ফেইল করে বা টাইমআউট হয়, তবে Nginx আগামী ১০ সেকেন্ডের জন্য ওই সার্ভারকে 'অসুস্থ' হিসেবে চিহ্নিত করবে এবং কোনো ক্লায়েন্ট ট্রাফিক পাঠাবে না! পাশাপাশি `proxy_next_upstream error timeout http_502;` ডিরেক্টিভ ক্লায়েন্টকে এরর না দেখিয়ে সাথে সাথে পরবর্তী সুস্থ সার্ভারে রিকোয়েস্টটি পুনরায় পাঠিয়ে দেয়।",
      b: "max_fails ও fail_timeout দিয়ে কোনো সার্ভার নষ্ট হলে Nginx স্বয়ংক্রিয়ভাবে সেটিকে ট্রাফিক পাঠানো বন্ধ করে। proxy_next_upstream কমান্ড দিয়ে ফেইল্ড রিকোয়েস্টটি মুহূর্তে সুস্থ সার্ভারে ফরোয়ার্ড করে জিরো-এরর নিশ্চিত করা হয়।",
      e: "Configuring max_fails=3 fail_timeout=10s on upstream server directives instructs Nginx to temporarily evict an unhealthy node upon three consecutive request drops. proxy_next_upstream error timeout http_502 immediately retries failed requests against alternate healthy nodes seamlessly.",
      code: "upstream cluster {\n  server 127.0.0.1:5001 max_fails=3 fail_timeout=10s;\n  server 127.0.0.1:5002 max_fails=3 fail_timeout=10s;\n}\nserver {\n  location / {\n    proxy_pass http://cluster;\n    proxy_next_upstream error timeout http_502 http_503;\n  }\n}"
    },

    // --- SITUATION BASED (5 Questions) ---
    {
      lvl: "situation",
      q: "পরিস্থিতি: ব্রাউজারে ইউজাররা হঠাৎ `502 Bad Gateway` এরর দেখতে পাচ্ছে। Nginx এরর লগে লেখা: `connect() failed (111: Connection refused) while connecting to upstream`। সমস্যা কোথায় এবং কীভাবে ট্রাবলশুট করবে?",
      m: "সমস্যার অর্থ: Nginx সম্পূর্ণ সচল আছে, কিন্তু Nginx যে ব্যাকএন্ড পোর্টে রিকোয়েস্ট ফরোয়ার্ড করছে (যেমন `localhost:5000`), সেই পোর্টে কোনো ব্যাকএন্ড নোড অ্যাপ বা PM2 প্রসেস আদৌ চলছে না (বা ক্র্যাশ করেছে)! ট্রাবলশুটিং ধাপ: (১) চেক করব PM2 বা নোড সার্ভিস রানিং আছে কি না: `pm2 status` বা `systemctl status dokani`। (২) ব্যাকএন্ড এরর লগ চেক করব অ্যাপ কেন ক্র্যাশ করল: `pm2 logs`। (৩) `lsof -i :5000` দিয়ে পোর্ট চেক করব। ব্যাকএন্ড অ্যাপটি পুনরায় রান করালেই Nginx তৎক্ষণাৎ ট্রাফিক পাঠানো শুরু করবে এবং 502 এরর নির্মূল হবে।",
      b: "502 Bad Gateway মানে Nginx ঠিক আছে কিন্তু ব্যাকএন্ড নোড সার্ভার বন্ধ বা ক্র্যাশ করেছে। pm2 status ও pm2 logs দিয়ে নোড অ্যাপ ক্র্যাশের কারণ দেখে রিস্টার্ট করলেই সমস্যা ঠিক হয়ে যায়।",
      e: "HTTP 502 Bad Gateway with Connection Refused proves Nginx is healthy but unable to establish a TCP handshake with the upstream socket (port 5000). The Node.js application has crashed or terminated. Triage via pm2 status and inspect crash stack traces via pm2 logs.",
      tip: "মনে রাখবে: '502 Bad Gateway is a backend application crash, not an Nginx failure.'"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: ক্লায়েন্ট ব্রাউজারে `504 Gateway Timeout` এরর আসছে। Nginx এরর লগে লেখা: `upstream timed out (110: Connection timed out) while reading response header from upstream`। এটি কেন ঘটছে এবং কীভাবে সমাধান করবে?",
      m: "সমস্যার অর্থ: ব্যাকএন্ড নোড সার্ভার চালু আছে ঠিকই, কিন্তু ব্যাকএন্ডের কোনো একটি জটিল কুয়েরি বা ভারী প্রসেসিং শেষ হতে Nginx-এর ডিফল্ট টাইমআউটের (৬০ সেকেন্ড) চেয়ে বেশি সময় নিচ্ছে! সমাধান: (১) প্রাথমিক ফিক্স: Nginx লোকেশন ব্লকে প্রক্সি টাইমআউট বাড়ানো: `proxy_read_timeout 300s; proxy_connect_timeout 300s;`। (২) আসল রুট-কজ ফিক্স: ব্যাকএন্ডে দীর্ঘমেয়াদি কুয়েরি অপটিমাইজ করা অথবা ভারী কাজকে (যেমন বাল্ক পিডিএফ বা এক্সেল জেনারেশন) সিনক্রোনাস এপিআইতে না রেখে ব্যাকগ্রাউন্ড কিউতে (BullMQ) স্থানান্তর করা।",
      b: "504 Gateway Timeout মানে ব্যাকএন্ডের প্রসেসিং শেষ হতে Nginx এর ডিফল্ট ৬০ সেকেন্ড সময়সীমা পার হয়ে গেছে। proxy_read_timeout বাড়িয়ে সাময়িক ফিক্স এবং ব্যাকগ্রাউন্ড কিউ ব্যবহার করে স্থায়ী ফিক্স করা হয়।",
      e: "HTTP 504 Gateway Timeout means the upstream Node.js backend accepted the request but failed to return response headers within Nginx's proxy_read_timeout window (default 60s). Triage slow unindexed SQL queries, increase proxy_read_timeout 300s temporarily, and delegate heavy workloads to background job queues.",
      code: "location /api/reports/heavy {\n  proxy_read_timeout 300s;\n  proxy_connect_timeout 75s;\n  proxy_pass http://api_backend;\n}"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: ডোমেন নেম পরিবর্তন করার পর ইউজাররা যখন `http://old-domain.com`-এ হিট করছে, তখন তাদের নির্বিঘ্নে `https://new-domain.com`-এ পার্মানেন্ট রিডাইরেক্ট করতে হবে। Nginx-এ কীভাবে কনফিগার করবে?",
      m: "সমাধান: SEO র‍্যাঙ্কিং অক্ষুণ্ণ রেখে ট্রাফিক রি-রুট করার জন্য `301 Moved Permanently` রিডাইরেক্ট ব্যবহার করতে হবে। Nginx কনফিগে পুরনো ডোমেনের জন্য একটি সার্ভার ব্লক লিখব: `server_name old-domain.com www.old-domain.com; return 301 https://new-domain.com$request_uri;`। `$request_uri` যোগ করার কারণে ইউজারের নির্দিষ্ট পেজ পাথ (যেমন `/products/123`) অক্ষত অবস্থায় নতুন ডোমেনে রিডাইরেক্ট হয়ে যাবে।",
      b: "পুরনো ডোমেনের সার্ভার ব্লকে return 301 https://new-domain.com$request_uri; লিখে দিলে সমস্ত পেজ ও ট্রাফিক এসইও অক্ষুণ্ণ রেখে স্বয়ংক্রিয়ভাবে নতুন ডোমেনে স্থানান্তরিত হয়।",
      e: "Execute seamless SEO-preserving domain migration via an HTTP 301 permanent redirect block. Matching $request_uri captures the full path and query string parameters, transparently forwarding visitors to the destination domain.",
      code: "server {\n  listen 80;\n  listen 443 ssl;\n  server_name old-domain.com www.old-domain.com;\n  return 301 https://new-domain.com$request_uri;\n}"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: ব্যাকএন্ড নোড অ্যাপ্লিকেশনে ক্লায়েন্টের আইপি চেক করতে গিয়ে দেখা যাচ্ছে সবার আইপি সবসময় `127.0.0.1` দেখাচ্ছে! ফলে রেট লিমিটিং এবং জিও-ব্লকিং কাজ করছে না। কীভাবে Nginx ও Express-এ এটি ঠিক করবে?",
      m: "কারণ: Nginx থেকে ব্যাকএন্ডে রিকোয়েস্ট যাওয়ার সময় নোড অ্যাপ ভাবছে Nginx-ই আসল ক্লায়েন্ট। ফিক্স: (১) Nginx-এ অবশ্যই হেডার দিতে হবে: `proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;` এবং `proxy_set_header X-Real-IP $remote_addr;`। (২) সবচেয়ে গুরুত্বপূর্ণ: Express.js অ্যাপ্লিকেশনের শুরুতে `app.set('trust proxy', 1);` কনফিগার করতে হবে! এটি এক্সপ্রেসকে নির্দেশ করে Nginx-এর পাঠানো `X-Forwarded-For` হেডারটিকে বিশ্বাস করতে। এরপর `req.ip` কল করলে গ্রাহকের আসল পাবলিক আইপি পাওয়া যাবে।",
      b: "এক্সপ্রেস অ্যাপ Nginx-কে ক্লায়েন্ট ভাবার কারণে আইপি 127.0.0.1 দেখাচ্ছে। Nginx-এ X-Forwarded-For হেডার এবং এক্সপ্রেসে app.set('trust proxy', 1) যোগ করলেই req.ip দিয়ে ইউজারের আসল আইপি পাওয়া যায়।",
      e: "Express sees localhost (127.0.0.1) because Nginx acts as the direct TCP peer. Resolve by passing X-Forwarded-For in Nginx, and declaring app.set('trust proxy', 1) in Express. Express will then populate req.ip from the authentic client IP forwarded in the header.",
      code: "// Express configuration:\napp.set('trust proxy', 1);\napp.get('/api/whoami', (req, res) => res.json({ ip: req.ip }));"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: তোমার সাইটে হঠাৎ করে বটনেট অ্যাটাক হচ্ছে এবং মিনিটে ৫০,০০০ রিকোয়েস্ট আসছে নির্দিষ্ট কিছু কান্ট্রি বা ইউজার-এজেন্ট থেকে। Nginx দিয়ে কীভাবে মুহূর্তের মধ্যে এই ট্রাফিক ড্রপ করবে?",
      m: "তাৎক্ষণিক সমাধান: (১) ক্ষতিকর ইউজার-এজেন্ট ব্লক করা: Nginx কনফিগে শর্ত দেব `if ($http_user_agent ~* (SemrushBot|AhrefsBot|python-requests)) { return 403; }`। (২) নির্দিষ্ট ক্ষতিকর আইপি বা সাবনেট ব্লক করা: `deny 198.51.100.0/24;`। (৩) এমার্জেন্সি রেট লিমিটিং সক্রিয় করে সংযোগ ড্রপ করা। কনফিগ সেভ করে `nginx -s reload` দিলে এক সেকেন্ডের মধ্যে Nginx কোনো সিপিইউ অপচয় ছাড়াই কার্নেল লেভেলে ওই লাখ লাখ রিকোয়েস্ট ড্রপ করে দেবে।",
      b: "Nginx এ deny <ip> এবং if ($http_user_agent ~* bot) { return 403; } রুল লিখে এক সেকেন্ডে reload দিলেই ক্ষতিকর বট ও আক্রমণকারী আইপিগুলো তাত্ক্ষণিকভাবে ব্লক হয়ে যায়।",
      e: "Block malicious floods directly at Nginx before hitting the application tier: map abusive User-Agents to return 403, and block culprit CIDR subnets using deny directives. A zero-downtime nginx -s reload immediately stems the attack.",
      code: "location / {\n  if ($http_user_agent ~* (curl|wget|python-requests|scrapy)) {\n    return 403;\n  }\n  deny 203.0.113.50;\n  proxy_pass http://api_backend;\n}"
    },

    // --- REAL WORLD (5 Questions) ---
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা (Dokani SaaS): Dokani-তে হাজার হাজার দোকানের কাস্টম সাবডোমেন (`*.dokani.bip.sg`) এবং কাস্টম ডোমেন কীভাবে Nginx ওয়াইল্ডকার্ড রাউটিং দিয়ে পরিচালনা করা হয়?",
      m: "দোকানি পিওএসে প্রতিটি মার্চেন্টের নিজস্ব সাবডোমেন থাকে (যেমন `bata.dokani.bip.sg`)। আমরা প্রতি দোকানের জন্য আলাদা আলাদা কনফিগ ফাইল না লিখে একটি একক ওয়াইল্ডকার্ড Nginx ব্লক ব্যবহার করি: `server_name ~^(?<subdomain>.+)\\.dokani\\.bip\\.sg$;`। Nginx রেগুলার এক্সপ্রেশন দিয়ে সাবডোমেনটি ক্যাপচার করে এবং ব্যাকএন্ড নোড সার্ভারে একটি কাস্টম হেডার হিসেবে পাস করে: `proxy_set_header X-Tenant-Subdomain $subdomain;`। এর ফলে নতুন কোনো দোকান সাইন আপ করলে Nginx-এ কোনো ফাইল এডিট বা রিলোড করা লাগে না—সিস্টেম ইনস্ট্যান্টলি নতুন সাবডোমেন হ্যান্ডেল করে!",
      b: "দোকানিতে ওয়াইল্ডকার্ড রেজেক্স (server_name ~^(?<subdomain>.+)\\.dokani\\.bip\\.sg$;) ব্যবহার করা হয়েছে। Nginx সাবডোমেন ক্যাপচার করে ব্যাকএন্ডে পাঠায়, ফলে নতুন দোকান খুললে Nginx রিলোড ছাড়াই সাথে সাথে কাজ করে।",
      e: "In Dokani POS, multi-tenant subdomains (*.dokani.bip.sg) are routed dynamically via an Nginx named-regex capture: server_name ~^(?<subdomain>.+)\\.dokani\\.bip\\.sg$;. Nginx forwards the extracted subdomain in an X-Tenant-Subdomain proxy header, enabling zero-config instant merchant onboarding.",
      code: "server {\n  server_name ~^(?<tenant>.+)\\.dokani\\.bip\\.sg$;\n  location / {\n    proxy_pass http://api_cluster;\n    proxy_set_header X-Tenant-Slug $tenant;\n  }\n}"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: সিঙ্গেল সার্ভারে Next.js ফ্রন্টএন্ড এবং Node.js ব্যাকএন্ড এপিআইকে Nginx পাথ-বেসড রাউটিং দিয়ে কীভাবে সাজাবে?",
      m: "আমরা একটি একক Nginx কনফিগে পাথ-বেসড রাউটিং সাজাই: (১) সমস্ত এপিআই ট্রাফিক `/api/` দিয়ে শুরু হলে তা ব্যাকএন্ড নোড ক্লাস্টারে প্রক্সি করি: `location /api/ { proxy_pass http://127.0.0.1:5000; }`। (২) রিয়েলটাইম সকেট সংযোগের জন্য: `location /socket.io/ { proxy_pass http://127.0.0.1:5000; ... }`। (৩) বাকি সমস্ত পাবলিক ওয়েব ট্রাফিক Next.js অ্যাপ্লিকেশনে প্রক্সি করি: `location / { proxy_pass http://127.0.0.1:3000; }`। (৪) Next.js-এর স্ট্যাটিক বিল্ড ফাইলগুলো সরাসরি ডিস্ক থেকে ক্যাশড আকারে সার্ভ করতে: `location /_next/static/ { alias /var/www/frontend/.next/static/; expires 365d; }`। এটি ফ্রন্টএন্ড ও ব্যাকএন্ডের মাঝের CORS জটিলতা চিরতরে দূর করে।",
      b: "একই ডোমেনে /api/ পাথ ব্যাকএন্ডে এবং বাকি পাথ / নেক্সট.জেএস ফ্রন্টএন্ডে রুট করা হয়। আর _next/static/ সরাসরি ডিস্ক থেকে সার্ভ করায় কোনো CORS সমস্যা থাকে না এবং পারফরম্যান্স সর্বোচ্চ থাকে।",
      e: "Unify Next.js and Node API tiers behind a single origin via path-based routing: /api/ routes to port 5000, / routes to port 3000, and /_next/static/ is served directly from filesystem cache with immutable 365-day expiry headers, eliminating cross-origin CORS latency entirely.",
      code: "location /api/ {\n  proxy_pass http://127.0.0.1:5000;\n}\nlocation /_next/static/ {\n  alias /var/www/dokani-web/.next/static/;\n  expires 365d;\n  access_log off;\n}\nlocation / {\n  proxy_pass http://127.0.0.1:3000;\n}"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: জিরো-ডাউনটাইম ডিপ্লয়মেন্টে Nginx রিলোড মেকানিজম কীভাবে ব্যাকগ্রাউন্ডে ইন-ফ্লাইট কানেকশন ড্রপ না করে নতুন কোড লাইভ করে?",
      m: "যখন আপনি `sudo systemctl reload nginx` চালান: (১) Nginx মাস্টার প্রসেস নতুন কনফিগারেশন ফাইল সিনট্যাক্স চেক করে পড়ে। (২) মাস্টার প্রসেস নতুন কনফিগারেশন দিয়ে নতুন সেট 'Worker Processes' স্পন করে যারা নতুন ইনকামিং কানেকশন হ্যান্ডেল করা শুরু করে। (৩) একই সাথে মাস্টার প্রসেস পুরনো ওয়ার্কার প্রসেসগুলোকে একটি 'Graceful Shutdown' সিগন্যাল পাঠায়। পুরনো ওয়ার্কাররা নতুন কোনো রিকোয়েস্ট নেয় না, কিন্তু তাদের সাথে ইতিমধ্যে কানেক্টেড থাকা গ্রাহকদের রিকোয়েস্ট সফলভাবে শেষ হওয়া পর্যন্ত জীবিত থাকে। শেষ রিকোয়েস্ট সম্পন্ন হলে পুরনো ওয়ার্কাররা নীরবে বন্ধ হয়ে যায়। ফলে ১ জন গ্রাহকের কানেকশনও কোনো ড্রপ ছাড়াই সম্পূর্ণ নতুন রিলিজ লাইভ হয়ে যায়।",
      b: "Nginx reload মাস্টার প্রসেস দিয়ে নতুন কনফিগে নতুন ওয়ার্কার চালু করে এবং পুরনো ওয়ার্কারগুলোকে চলমান রিকোয়েস্ট শেষ করার সময় দেয়। ফলে কোনো ইউজারের কানেকশন না কেটে জিরো-ডাউনটাইমে রিলিজ সম্পন্ন হয়।",
      e: "systemctl reload nginx prompts the master process to re-parse configurations and spawn new worker processes. The master instructs aged workers to cease accepting new connections and gracefully drain active in-flight sockets before terminating, achieving true zero-downtime reconfiguration.",
      tip: "বলো: 'Nginx reload spawns new workers while letting legacy workers gracefully drain in-flight connections.'"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: Nginx Access Log বিশ্লেষণ ও Grafana/Prometheus দিয়ে লাইভ রিকোয়েস্ট অ্যানালিটিক্স কীভাবে মনিটর করবে?",
      m: "আমরা Nginx-এর ডিফল্ট লগ ফরম্যাট পরিবর্তন করে একটি স্ট্রাকচার্ড JSON লগ ফরম্যাট ডিফাইন করি যাতে `$remote_addr`, `$request_time` (ল্যাটেন্সি), `$status` (200, 404, 500), এবং `$upstream_response_time` থাকে। এরপর `Vector` বা `Promtail` এজেন্ট দিয়ে এই লগ স্ক্র্যাপ করে `Loki` এবং `Grafana`-তে পুশ করি। ড্যাশবোর্ডে আমরা লাইভ রিকোয়েস্ট পার সেকেন্ড (RPS), p99 রেসপন্স ল্যাটেন্সি এবং 5xx এরর রেট গ্রাফে মনিটর করি। কোনো এপিআই স্লো হলে বা 502 এরর স্পাইক করলেই সেকেন্ডের মধ্যে গ্রাফানা থেকে স্ল্যাক এলার্ট ফায়ার করে।",
      b: "Nginx লগকে JSON ফরম্যাটে রূপান্তর করে ভেক্টর বা প্রমতেল দিয়ে গ্রাফানায় লাইভ ড্যাশবোর্ড তৈরি করা হয়। এতে রিকোয়েস্ট পার সেকেন্ড, এরর রেট এবং ল্যাটেন্সি রিয়েলটাইমে পর্যবেক্ষণ করা যায়।",
      e: "Configure Nginx log_format to emit structured JSON containing request_time, upstream_response_time, and status codes. Ship logs via Promtail/Fluentbit into Grafana Loki to visualize live RPS, p99 latencies, and automated 5xx alerting thresholds.",
      code: "log_format json_analytics escape=json\n  '{\"time\": \"$time_iso8601\", \"client\": \"$remote_addr\", '\n  '\"status\": $status, \"duration\": $request_time, '\n  '\"upstream_time\": \"$upstream_response_time\", \"uri\": \"$uri\"}';\naccess_log /var/log/nginx/analytics.log json_analytics;"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: Nginx Maintenance Page (503 Service Temporarily Unavailable) ফ্ল্যাগ ফাইল দিয়ে মুহূর্তের মধ্যে কীভাবে অন/অফ করবে?",
      m: "পরিকল্পিত বড় ডাটাবেজ মাইগ্রেশনের সময় সাইটে পরিচ্ছন্ন মেইনটেন্যান্স পেজ দেখানো প্রয়োজন যাতে ইউজারের রিকোয়েস্ট ড্রপ না করে। প্রোডাকশন ট্রিক: Nginx কনফিগে একটি ফাইল এক্সিস্টেন্স চেক বসাই: `if (-f /var/www/dokani/maintenance.flag) { return 503; }`। এরপর এরর পেজ হ্যান্ডলারে সুন্দর একটি `maintenance.html` ম্যাপ করি। যখন মেইনটেন্যান্স শুরু করতে চাই, টার্মিনালে শুধু কমান্ড দিই: `touch /var/www/dokani/maintenance.flag`—মুহূর্তের মধ্যে সমস্ত ট্রাফিকে মেইনটেন্যান্স পেজ চলে আসে কোনো Nginx রিলোড ছাড়াই! কাজ শেষ হলে `rm /var/www/dokani/maintenance.flag` দিলেই সাইট সাথে সাথে আবার লাইভ হয়ে যায়।",
      b: "Nginx এ maintenance.flag ফাইলের অস্তিত্ব যাচাই করে 503 এরর পেজ দেখানোর নিয়ম করা হয়। touch maintenance.flag দিলেই সাইট মেইনটেন্যান্স মোডে চলে যায় এবং rm করলেই আবার লাইভ হয় কোনো রিলোড ছাড়াই।",
      e: "Implement instant zero-reload maintenance mode by evaluating file existence via if (-f /var/run/maintenance.flag) { return 503; }. Touching or unlinking the flag file toggles maintenance state across global traffic instantaneously without touching Nginx configs.",
      code: "error_page 503 /maintenance.html;\nlocation = /maintenance.html {\n  root /var/www/html;\n}\nlocation / {\n  if (-f /var/www/maintenance.flag) {\n    return 503;\n  }\n  proxy_pass http://api_backend;\n}"
    }
  ]
};
