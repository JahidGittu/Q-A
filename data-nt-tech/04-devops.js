// NT Tech Innovation — 04. Linux, Server & DevOps Mastery
window.NT_DATA = window.NT_DATA || {};
window.NT_DATA.devops = {
  id: "devops",
  title: "Linux, Server & DevOps",
  badge: "Ubuntu · Docker · Nginx · PM2 · CI/CD · Cloudflare",
  icon: "🐧",
  topics: [
    {
      id: "linux-ubuntu-server",
      name: "Linux & Ubuntu Server Administration",
      desc: "Bash Shell, SSH Hardening, UFW Firewall, File Permissions (chmod/chown), Systemd, Diagnostics (htop, journalctl)",
      items: [
        {
          lvl: "lvl1",
          q: "একটি নতুন উবুন্টু VPS সার্ভার পাওয়ার পর সিকিউরিটির জন্য প্রথম কোন মৌলিক পদক্ষেপগুলো নেওয়া উচিত?",
          m: "একটি ফ্রেশ Ubuntu VPS পেয়েই রুট ইউজার দিয়ে কোড রান করা মারাত্মক ঝুঁকি। প্রাথমিক ৫টি সিকিউরিটি স্টেপ: (১) সিস্টেম প্যাকেজ আপডেট: `sudo apt update && sudo apt upgrade -y`। (২) রুট ছাড়া একটি নন-রুট সুডো ইউজার তৈরি করা (`adduser deployer && usermod -aG sudo deployer`)। (৩) SSH Hardening: পাসওয়ার্ড লগইন বন্ধ করে শুধুমাত্র SSH Key ভিত্তিক অথেন্টিকেশন চালু করা এবং ডিফল্ট পোর্ট ২২ পরিবর্তন করা। (৪) UFW Firewall অন করা: `sudo ufw allow 22`, `sudo ufw allow 80`, `sudo ufw allow 443` দিয়ে ফায়ারওয়াল এনেবল করা। (৫) ব্রুট-ফোর্স অ্যাটাক ঠেকাতে `fail2ban` ইনস্টল করা।",
          b: "নতুন উবুন্টু সার্ভার পেলে রুট ইউজার বাদ দিয়ে সুডো পারমিশনসহ নতুন নন-রুট ইউজার তৈরি করতে হবে। পাসওয়ার্ড লগইন বন্ধ করে এসএসএইচ কি (SSH Key) দিয়ে লগইন নিশ্চিত করতে হবে। ইউএফডব্লিউ ফায়ারওয়াল সক্রিয় করে শুধুমাত্র প্রয়োজনীয় পোর্ট (৮০, ৪৪৩) খোলা রাখতে হবে এবং আক্রমণ প্রতিরোধে ফেইলটু ব্যান ইনস্টল করা জরুরি।",
          e: "Immediately hardening a new Ubuntu VPS involves five critical steps: update package repositories (apt update && upgrade), create a non-root sudoer user, harden SSH by enforcing SSH key-pair authentication and disabling root/password access in sshd_config, configure UFW firewall to expose only ports 22, 80, and 443, and deploy Fail2ban to mitigate brute-force attacks.",
          code: "# Basic Server Hardening\nsudo ufw default deny incoming\nsudo ufw default allow outgoing\nsudo ufw allow ssh\nsudo ufw allow http\nsudo ufw allow https\nsudo ufw enable"
        },
        {
          lvl: "lvl2",
          q: "লিনাক্সে File Permissions (`chmod` ও `chown`) কীভাবে কাজ করে এবং `chmod 755` বনাম `chmod 600`-এর অর্থ কী?",
          m: "লিনাক্সে প্রতিটি ফাইল বা ফোল্ডারের ৩ শ্রেণির অনুমতি থাকে: Owner (User), Group, এবং Others (World)। আর পারমিশনের ৩টি মান: Read (4), Write (2), এবং Execute (1)। যেমন: `chmod 755` মানে ওনার পাবে $4+2+1=7$ (রিড, রাইট, এক্সিকিউট), আর গ্রুপ ও অন্যরা পাবে $4+1=5$ (শুধু রিড ও এক্সিকিউট)—এটি ওয়েব ডিরেক্টরি বা এক্সিকিউটেবল স্ক্রিপ্টের জন্য আদর্শ। কিন্তু `chmod 600` মানে ওনার পাবে $4+2=6$ (রিড ও রাইট), আর গ্রুপ বা অন্য কারো কোনো এক্সেসই থাকবে না—এটি প্রাইভেট SSH Key (`id_rsa`) বা সিক্রেট `.env` ফাইলের সুরক্ষায় অপরিহার্য। `chown` দিয়ে ফাইলের মালিকানা (User:Group) পরিবর্তন করা হয়।",
          b: "chmod দিয়ে ফাইলের পড়ার, লেখার ও চালানোর অনুমতি সংখ্যা দিয়ে নির্ধারণ করা হয় (Read=4, Write=2, Execute=1)। chmod 755 ফোল্ডার বা পাবলিক স্ক্রিপ্টে ব্যবহৃত হয় যাতে সবাই পড়তে ও চালাতে পারে। আর chmod 600 শুধুমাত্র ফাইলের ওনারকে রিড ও রাইট দেয় যা প্রাইভেট এসএসএইচ কি বা .env ফাইলের গোপনীয়তা রক্ষায় বাধ্যতামূলক।",
          e: "Linux file permissions enforce security across three scopes: User, Group, and Others, calculated via octal values: Read (4), Write (2), and Execute (1). 'chmod 755' grants read/write/execute (7) to the owner and read/execute (5) to groups and public—ideal for public web roots. 'chmod 600' grants read/write strictly to the owner and zero permissions to everyone else, essential for SSH keys and .env files.",
          code: "chmod 600 ~/.ssh/id_rsa\nchmod 600 .env.production\nchown -R www-data:www-data /var/www/html"
        },
        {
          lvl: "lvl3",
          q: "লিনাক্সে Systemd সার্ভিস কী এবং ব্যাকএন্ড প্রসেসের জন্য কাস্টম `.service` ফাইল কীভাবে লিখে অটো-রিস্টার্ট ও বুট-পারসিস্টেন্স নিশ্চিত করবে?",
          m: "Systemd হলো আধুনিক লিনাক্স ওএস-এর সেন্ট্রাল ইনিশিয়ালাইজেশন ও সার্ভিস সুপারভাইজার। এটি ব্যাকগ্রাউন্ড ডিমেন সার্ভিস চালু, বন্ধ এবং সার্ভার রিস্টার্ট হলে অটোমেটিক অ্যাপ্লিকেশান বুট করায়। নোডজেএস বা অন্য সার্ভিসের জন্য `/etc/systemd/system/myapp.service` তৈরি করি। এতে `[Service]` ব্লকে `ExecStart`, `Restart=always`, `RestartSec=10`, এবং `User=deployer` উল্লেখ করি। এরপর `sudo systemctl daemon-reload && sudo systemctl enable --now myapp` চালালেই ওএস লেভেলে সার্ভিসটি সার্বক্ষণিক সক্রিয় হয়ে যায় এবং ওএস রিবুট হলেও স্বয়ংক্রিয়ভাবে ব্যাকগ্রাউন্ডে চালু হয়ে যায়।",
          b: "সিস্টেমডি লিনাক্সের প্রধান ব্যাকগ্রাউন্ড সার্ভিস ম্যানেজার। কাস্টম .service ফাইলের মাধ্যমে যে কোনো অ্যাপ্লিকেশনকে সার্ভার রিবুট হলেও চালু রাখা যায় এবং ক্র্যাশ করলে স্বয়ংক্রিয়ভাবে রিস্টার্ট করার নির্দেশ দেওয়া যায়। systemctl enable কমান্ড দিয়ে সার্ভিসটি ওএস স্টার্টআপে রেজিস্টার করা হয়।",
          e: "Systemd is the primary init and service supervisor for Linux. Creating a custom unit file in /etc/systemd/system/myapp.service allows managing background daemons natively. Directives like 'Restart=always' and 'RestartSec=5' enforce automated recovery from unhandled crashes, while 'systemctl enable myapp' registers the daemon into system startup targets.",
          code: "[Unit]\nDescription=Dokani Backend API\nAfter=network.target\n\n[Service]\nType=simple\nUser=deployer\nWorkingDirectory=/var/www/dokani-backend\nExecStart=/usr/bin/node dist/server.js\nRestart=always\nRestartSec=5\nEnvironment=NODE_ENV=production\n\n[Install]\nWantedBy=multi-user.target"
        },
        {
          lvl: "situation",
          q: "তোমার প্রোডাকশন লিনাক্স সার্ভারে সিপিইউ ১০০% ফুল হয়ে গেছে এবং সার্ভার রেসপন্স করা বন্ধ করে দিয়েছে। টার্মিনাল দিয়ে কীভাবে স্টেপ-বাই-স্টেপ সমস্যা ডায়াগনসিস করবে?",
          m: "ধাপগুলো: (১) দ্রুত `htop` অথবা `top` চালিয়ে দেখব কোন নির্দিষ্ট প্রসেস (PID) এবং কোন ইউজার সিপিইউ কনজিউম করছে (প্রেস `P` দিয়ে সিপিইউ অনুযায়ী সর্ট করব)। (২) ডিস্ক স্পেস ফুল হয়েছে কিনা চেক করব `df -h` দিয়ে এবং র‍্যামের অবস্থা দেখব `free -m` দিয়ে। (৩) নির্দিষ্ট প্রসেসটির বিস্তারিত ও কমান্ড লাইন দেখতে `ps aux | grep <PID>` চালাব। (৪) যদি কোনো রোগ (rogue) প্রসেস বা ইনফিনিট লুপ আটকে থাকে, তবে `kill -15 <PID>` দিয়ে গ্রেসফুলি বা `kill -9 <PID>` দিয়ে টার্মিনেট করব। (৫) `journalctl -u myapp.service -n 100 -f` দিয়ে এরর লগ চেক করব।",
          b: "সার্ভার সিপিইউ ফুল হলে আমরা প্রথমে htop দিয়ে কোন প্রসেস সর্বোচ্চ সিপিইউ নিচ্ছে তা চিহ্নিত করি। df -h দিয়ে ডিস্ক ফুল কিনা এবং free -m দিয়ে র‍্যাম চেক করি। কোনো প্রসেস লুপে আটকে থাকলে kill কমান্ড দিয়ে তা বন্ধ করি এবং journalctl দিয়ে সার্ভিস লগ দেখে আসল কারণ সমাধান করি।",
          e: "To diagnose a pegged CPU: run 'htop' or 'top' and sort by CPU usage to isolate the offending PID and user. Concurrently check memory exhaustion ('free -m') and disk block saturation ('df -h'). Inspect the culprit process via 'ps aux | grep <PID>'. If non-responsive, terminate it using 'kill -15 <PID>' or 'kill -9'. Finally, inspect system journal entries using 'journalctl -u service_name -n 100 --no-pager' to identify root exceptions.",
          code: "# Diagnostic Checklist\nhtop\nfree -m\ndf -h\njournalctl -xe --no-pager | tail -n 50"
        },
        {
          lvl: "realworld",
          q: "Dokani POS-এর লিনাক্স সার্ভারে অটোনোমাস লক-ফ্রি ব্যাকআপ এবং ডিস্ক স্পেস ক্লিনিংয়ের জন্য তুমি কীভাবে Bash স্ক্রিপ্ট ও Cron Job সেট করেছিলে?",
          m: "Dokani সার্ভারে যাতে ডিস্ক কখনো ১০০% ফুল না হয়, আমি একটি ব্যাশ স্ক্রিপ্ট লিখেছিলাম: (১) প্রতিদিন ভোর ৪টায় ক্রন জব স্ক্রিপ্টটি রান করত। (২) এটি পোস্টগ্রেস ডাটাবেজ ডাম্প করে জিপ কম্প্রেস করত। (৩) এরপর স্ক্রিপ্টে `find /backups -type f -mtime +7 -delete` কমান্ড দিয়ে ৭ দিনের পুরোনো ব্যাকআপ স্বয়ংক্রিয়ভাবে ডিলিট করত যাতে হার্ডডিস্ক মেমোরি সবসময় ফ্রি থাকে। (৪) Nginx ও PM2 লগের জন্য `logrotate` কনফিগার করে রেখেছিলাম যাতে কোনোদিন বিশাল সাইজের লগ ফাইল সার্ভার ক্র্যাশ করাতে না পারে।",
          b: "দোকানি সার্ভারে ডিস্ক স্পেস খালি রাখতে আমরা একটি স্বয়ংক্রিয় ব্যাশ স্ক্রিপ্ট ক্রন জবে যুক্ত করেছিলাম। স্ক্রিপ্টটি প্রতিদিন ব্যাকআপ তৈরি করার পাশাপাশি ৭ দিনের বেশি পুরোনো ব্যাকআপ ফাইল নিজে থেকেই মুছে দিত। এছাড়া লগ রোটেটের মাধ্যমে সার্ভারের লগ ফাইল সবসময় নির্দিষ্ট সাইজে সীমাবদ্ধ রাখা হয়েছিল।",
          e: "In Dokani POS production, I engineered an automated maintenance bash script running via root crontab. It generated compressed database dumps and executed 'find /var/backups -type f -mtime +7 -delete' to purge archives older than seven days, preventing disk saturation. System logs were placed under logrotate with gzip compression and weekly retention limits.",
          tip: "লগ রোটেট এবং ৭ দিনের রিটেনশন পলিসি বলা একজন দায়িত্বশীল ডেভঅপ্স প্রফেশনালের লক্ষণ।"
        }
      ]
    },
    {
      id: "docker-containers",
      name: "Docker & Containerization Architecture",
      desc: "Docker vs VM, Multi-Stage Dockerfile, Docker Compose, Volume Persistence, Container Networking, Security Limits",
      items: [
        {
          lvl: "lvl1",
          q: "Docker Container এবং Traditional Virtual Machine (VM)-এর মধ্যে আর্কিটেকচারাল পার্থক্য কী?",
          m: "Virtual Machine (VM) একটি হাইপারভাইজারের ওপর চলে এবং প্রতিটি ভিএম-এর নিজস্ব সম্পূর্ণ আলাদা গেস্ট অপারেটিং সিস্টেম (Guest OS) থাকে—ফলে এটি গিগাবাইট আকারের হয় এবং বুট হতে কয়েক মিনিট সময় নেয়। অন্যদিকে Docker Container হোস্ট ওএস-এর লিনাক্স কার্নেল শেয়ার করে এবং শুধুমাত্র অ্যাপ্লিকেশনের লাইব্রেরি ও ডিপেনডেন্সিগুলোকে আইসোলেটেড প্রসেস (Namespaces ও Cgroups) হিসেবে চালায়। ফলে ডকার কন্টেইনার সাইজে মাত্র কয়েক মেগাবাইট হয়, কয়েক মিলিসেকেন্ডে চালু হয় এবং সার্ভারের র‍্যাম-সিপিইউ বহু গুণ সাশ্রয় করে।",
          b: "ভার্চুয়াল মেশিনে প্রতিটি ওএসের আলাদা ভারী গেস্ট কার্নেল থাকে যা প্রচুর র‍্যাম খরচ করে। কিন্তু ডকার কন্টেইনার হোস্ট কম্পিউটারের কার্নেল শেয়ার করে কেবল অ্যাপ্লিকেশন ফাইল নিয়ে আলাদা প্রক্রিয়ায় চলে। তাই ডকার কন্টেইনার অত্যন্ত হালকা, দ্রুত বুট হয় এবং এক সার্ভারে বহু কন্টেইনার চালানো যায়।",
          e: "A Virtual Machine bundles a full guest operating system on top of a hypervisor, consuming gigabytes of storage and taking minutes to boot. Docker containers share the host Linux kernel while isolating processes using kernel namespaces and cgroups. Containers are lightweight (megabytes in size), start instantly, and operate with near-native CPU and memory performance.",
          code: "docker run -d -p 5000:5000 --name api-service --restart unless-stopped my-app:latest"
        },
        {
          lvl: "lvl2",
          q: "Docker Compose কেন ব্যবহার করা হয় এবং একটি ফুল-স্ট্যাক অ্যাপের জন্য `docker-compose.yml` কীভাবে সাজাবে?",
          m: "একটি অ্যাপে যখন একাধিক কন্টেইনার একসাথে চলতে হয় (যেমন: Node.js API, PostgreSQL ডাটাবেজ, Redis ক্যাশ)—ম্যানুয়ালি প্রতিটি আলাদা `docker run` কমান্ড চালানো অসম্ভব। Docker Compose একটি একক YAML ফাইলের মাধ্যমে পুরো মাল্টি-কন্টেইনার আর্কিটেকচার, তাদের নেটওয়ার্কিং, ভলিউম এবং এনভায়রনমেন্ট ভেরিয়েবল ডিফাইন করে। শুধু `docker compose up -d` চালালেই ব্যাকগ্রাউন্ডে সমস্ত সার্ভিস সঠিক ক্রমানুসারে চালু হয়ে যায়।",
          b: "ডকার কম্পোজ একাধিক কন্টেইনারকে একসাথে পরিচালনা করার সহজ উপায়। একটি একক ফাইলে ডাটাবেজ, ব্যাকএন্ড ও রেডিসের মতো সার্ভিস ডিফাইন করে একটি মাত্র কমান্ড দিয়ে পুরো সিস্টেম এক ক্লিকে চালু বা বন্ধ করা যায়।",
          e: "Docker Compose defines and orchestrates multi-container applications declaratively via a single YAML file. It configures interconnected services (Node API, PostgreSQL, Redis), shared private bridge networks, environment configs, and persistent volumes, spinning up the entire infrastructure with a single 'docker compose up -d' command.",
          code: "version: '3.8'\nservices:\n  api:\n    build: .\n    ports: ['5000:5000']\n    environment: [DATABASE_URL=postgresql://user:pass@db:5432/dokani]\n    depends_on: [db]\n  db:\n    image: postgres:16-alpine\n    volumes: [pgdata:/var/lib/postgresql/data]\n    environment: [POSTGRES_PASSWORD=pass]\nvolumes:\n  pgdata:"
        },
        {
          lvl: "lvl3",
          q: "Docker Container-এ ডাটা পারসিস্টেন্সের জন্য 'Bind Mounts' এবং 'Named Volumes'-এর মধ্যে পার্থক্য কী এবং ডাটাবেজের জন্য কোনটি নিরাপদ?",
          m: "**Bind Mounts:** হোস্ট মেশিনের একটি নির্দিষ্ট পরম পাথ (যেমন `/home/user/app`) কন্টেইনারের ভেতরের পাথের সাথে সরাসরি ম্যাপ করে। এটি ডেভেলপমেন্টে লাইভ কোড রিলোডের জন্য দারুণ, কিন্তু হোস্ট ওএস পারমিশন কনফ্লিক্টের ঝুঁকি থাকে। **Named Volumes:** ডকার ইঞ্জিন নিজে হোস্টের একটি ম্যানেজড লোকেশনে (`/var/lib/docker/volumes/...`) ডাটা স্টোর করে। এটি হোস্ট ওএস ফাইলসিস্টেম থেকে সম্পূর্ণ আইসোলেটেড, ডকার সিএলআই দিয়ে ব্যাকআপ নেওয়া যায় এবং পারফরম্যান্স অনেক বেশি ফাস্ট। **ডাটাবেজের জন্য সর্বদা Named Volumes ব্যবহার করতে হবে** যাতে কন্টেইনার ডিলিট বা রি-বিল্ড হলেও ডাটা সম্পূর্ণ সুরক্ষিত থাকে।",
          b: "বাইন্ড মাউন্ট লোকাল কম্পিউটারের সরাসরি ফোল্ডার লিংক করে যা ডেভেলপমেন্টের জন্য ভালো। কিন্তু প্রোডাকশন ডাটাবেজের জন্য সবসময় নেমড ভলিউম (Named Volume) ব্যবহার করা আবশ্যক, কারণ এটি ডকার দ্বারা সুরক্ষিত থাকে এবং কন্টেইনার ডিলিট হলেও ডাটাবেজের তথ্য মুছে যায় না।",
          e: "Bind Mounts map an arbitrary absolute host directory into the container, ideal for local source-code synchronization but vulnerable to host permission variances. Named Volumes are completely managed by Docker in dedicated storage pools, offering superior I/O performance, automated Docker CLI lifecycle management, and driver extensibility. Production databases must always use Named Volumes to decouple data lifecycles from container destructions.",
          code: "# In Docker Compose for DB Persistence\nvolumes:\n  - pg_data:/var/lib/postgresql/data\nvolumes:\n  pg_data:"
        },
        {
          lvl: "situation",
          q: "তোমার ডকার কন্টেইনার লোকাল মেশিনে পারফেক্ট কাজ করছে, কিন্তু ক্লাউড সার্ভারে বিল্ড দেওয়ার পর দেখা গেল ইমেজ সাইজ ১.৮ জিবি এবং বিল্ড ক্যাশ কাজ করছে না। কীভাবে অপটিমাইজ করবে?",
          m: "সমাধানের ৩টি ধাপ: (১) **`.dockerignore` ফাইল তৈরি:** সবার আগে `node_modules`, `.git`, `dist`, `.env` ডকার কন্টেক্সটে পাঠানো ব্লক করব। (২) **Layer Caching অপটিমাইজেশন:** সোর্স কোড কপি করার আগেই `package.json` এবং `package-lock.json` কপি করে `RUN npm ci` চালাব, যাতে সোর্স কোডে ছোট চেঞ্জে ডিপেনডেন্সি বারবার ডাউনলোড না হয়। (৩) **Multi-Stage Build:** `node:20-alpine` ব্যবহার করে বিল্ডার স্টেজ থেকে শুধু `dist/` এবং প্রোডাকশন মডিউল কপি করব। এতে ১.৮ জিবির ইমেজ ১২০ মেগাবাইটে নেমে আসবে!",
          b: "ইমেজ সাইজ কমাতে প্রথমে .dockerignore ফাইলে নোড-মডিউলস ও গিট বাদ দিতে হবে। ডকারফাইলে কোড কপির আগে package.json দিয়ে ডিপেনডেন্সি ইনস্টল করতে হবে যাতে ক্যাশ কাজ করে এবং অ্যালপাইন বেস ইমেজ ও মাল্টি-স্টেজ বিল্ড দিয়ে সাইজ ৯০% কমানো যায়।",
          e: "To slash Docker image sizes and optimize build cache: add a thorough .dockerignore excluding node_modules and .git. Maximize Docker layer caching by copying package*.json and running 'npm ci' prior to copying source code. Finally, adopt multi-stage builds using node:alpine base images to discard build toolchains, plunging the output footprint from 1.8GB to ~120MB.",
          code: "# Cache-Optimized Layering\nCOPY package*.json ./\nRUN npm ci --omit=dev\nCOPY . .\nRUN npm run build"
        },
        {
          lvl: "realworld",
          q: "Dokani POS-এর মাইক্রোসার্ভিস বা এপিআই ডকারে রান করার সময় কন্টেইনার মেমোরি লিমিট ও রি-স্টার্ট পলিসি তুমি কীভাবে সুরক্ষিত করেছিলে?",
          m: "Dokani-তে কন্টেইনার যাতে সার্ভারের পুরো র‍্যাম দখল করে হোস্ট ওএস ফ্রিজ না করে, আমি Compose ফাইলে: (১) কন্টেইনার রিসোর্স লিমিট বসিয়েছিলাম `deploy: { resources: { limits: { cpus: '1.5', memory: '1G' } } }`। (২) রিস্টার্ট পলিসি `restart: unless-stopped` দিয়ে রেখেছিলাম যাতে সার্ভার রিস্টার্ট হলে কন্টেইনার একা একাই চালু হয়। (৩) কন্টেইনারের ভেতর কখনোই রুট ইউজার চালাইনি—`USER node` ডিক্লেয়ার করেছিলাম যাতে কন্টেইনার কম্প্রোমাইজ হলেও কেউ হোস্ট সিস্টেম হাইজ্যাক করতে না পারে।",
          b: "দোকানি প্রজেক্টে ডকার চালানোর সময় আমরা মেমোরি লিমিট (১ জিবি) নির্ধারণ করে দিয়েছিলাম যাতে সার্ভার ক্র্যাশ না করে। restart: unless-stopped দিয়ে স্বয়ংক্রিয় রিস্টার্ট নিশ্চিত করা এবং নিরাপত্তার জন্য নন-রুট ইউজার দিয়ে কন্টেইনার রান করা হয়েছিল।",
          e: "In Dokani POS container deployments, I enforced CPU and memory quotas (e.g., 1GB RAM ceiling) inside Docker Compose to prevent rogue processes from starving the host OS. Services were governed by 'restart: unless-stopped' policies for autonomous recovery upon host reboots, while processes executed under a hardened unprivileged 'USER node' context to eliminate container escape exploits.",
          tip: "নন-রুট কন্টেইনার চালানো এন্টারপ্রাইজ ডকার সিকিউরিটির গোল্ড স্ট্যান্ডার্ড।"
        }
      ]
    },
    {
      id: "nginx-reverse-proxy",
      name: "Nginx Reverse Proxy & SSL Configuration",
      desc: "Reverse Proxy Architecture, Let's Encrypt SSL / Certbot, Gzip/Brotli, WebSockets, HTTP/2, Rate Limiting",
      items: [
        {
          lvl: "lvl1",
          q: "Forward Proxy এবং Reverse Proxy-এর মধ্যে মৌলিক পার্থক্য কী এবং Nginx কোনটির কাজ করে?",
          m: "**Forward Proxy:** ক্লায়েন্ট ব্রাউজারের সামনে বসে এবং ক্লায়েন্টের পরিচয় গোপন রেখে ইন্টারনেটে রিকোয়েস্ট পাঠায় (যেমন ভিপিএন বা অফিসের কর্পোরেট প্রক্সি)। **Reverse Proxy:** সার্ভারের সামনে বসে এবং ক্লায়েন্টের রিকোয়েস্ট গ্রহণ করে ব্যাকগ্রাউন্ডের ইন্টারনাল প্রাইভেট সার্ভারে রিকোয়েস্ট ফরোয়ার্ড করে—ক্লায়েন্ট জানতেও পারে না পেছনে কয়টি সার্ভার চলছে। Nginx মূলত একটি বিশ্বমানের **Reverse Proxy** ও ওয়েব সার্ভার যা লোড ব্যালেন্সিং, এসএসএল টার্মিনেশন এবং সিকিউরিটি গেটওয়ে হিসেবে কাজ করে।",
          b: "ফরোয়ার্ড প্রক্সি ক্লায়েন্টের পক্ষ হয়ে ইন্টারনেটে যোগাযোগ করে (যেমন ভিপিএন)। আর রিভার্স প্রক্সি সার্ভারের সামনে বসে ক্লায়েন্টের রিকোয়েস্ট ব্যাকএন্ডে পৌঁছে দেয়। এনগিনক্স একটি রিভার্স প্রক্সি হিসেবে ব্যবহৃত হয় যা সার্ভারের আসল পোর্ট গোপন রেখে নিরাপত্তা ও গতি বাড়ায়।",
          e: "A Forward Proxy sits in front of clients to route outbound requests while masking client identities (e.g., VPNs or enterprise filtering). A Reverse Proxy sits in front of origin servers, intercepting inbound requests and forwarding them to internal services. Nginx acts as a high-performance Reverse Proxy, delivering load balancing, SSL termination, and API caching.",
          tip: "সার্ভারের সামনে বনাম ক্লায়েন্টের সামনে—এই একটি বাক্যেই পার্থক্য পরিষ্কার হয়।"
        },
        {
          lvl: "lvl2",
          q: "Nginx-এ Certbot দিয়ে কীভাবে অটোমেটিক Let's Encrypt SSL সার্টিফিকেট সেটআপ ও অটো-রিনিউ নিশ্চিত করবে?",
          m: "ধাপগুলো: (১) এনগিনক্স কনফিগ ফাইলে প্রথমে পোর্ট ৮০-তে ডোমেইন নাম উল্লেখ করি `server_name api.dokani.bip.sg;`। (২) সার্টবট এনগিনক্স প্লাগইন ইনস্টল করি: `sudo apt install certbot python3-certbot-nginx`। (৩) কমান্ড চালাই: `sudo certbot --nginx -d api.dokani.bip.sg`। সার্টবট নিজে থেকেই ডোমেইন ভ্যালিডেট করে, এসএসএল সার্টিফিকেট জেনারেট করে এবং এনগিনক্স ফাইলে HTTPS (৪৪৩) ও অটোমেটিক HTTP->HTTPS রিডাইরেক্ট রুল যোগ করে দেয়। (৪) সার্টবট ব্যাকগ্রাউন্ডে একটি systemd টাইমার (`certbot.timer`) বসায় যা সার্টিফিকেট মেয়াদ শেষ হওয়ার ৩০ দিন আগেই অটো-রিনিউ করে নেয়।",
          b: "এনগিনক্সে এসএসএল যুক্ত করতে আমরা সার্টবট ব্যবহার করি। certbot --nginx কমান্ড দিলে এটি ডোমেইন ভেরিফাই করে স্বয়ংক্রিয়ভাবে এসএসএল কনফিগার করে এবং এইচটিটিপি থেকে এইচটিটিপিএস রিডাইরেক্ট করে দেয়। ব্যাকগ্রাউন্ডে সিস্টেমডি টাইমার স্বয়ংক্রিয়ভাবে প্রতি ৩ মাসে সার্টিফিকেট রিনিউ করে।",
          e: "Configuring Let's Encrypt SSL via Certbot is seamless: verify DNS A-records point to the VPS, ensure the Nginx server block contains the target domain under server_name, and execute 'sudo certbot --nginx -d domain.com'. Certbot automates challenge verification, issues the certificate, and configures TLS cipher suites. Auto-renewal is managed out-of-the-box via systemd's certbot.timer.",
          code: "sudo certbot --nginx -d api.dokani.bip.sg\n# Verify auto-renew\nsudo certbot renew --dry-run"
        },
        {
          lvl: "lvl3",
          q: "Nginx-এ WebSocket কানেকশন (Socket.io) রিভার্স প্রক্সি করার সময় কেন `Upgrade` ও `Connection` হেডার কনফিগার করতে হয়?",
          m: "WebSocket একটি সাধারণ HTTP রিকোয়েস্ট হিসেবে শুরু হয় কিন্তু সাথে সাথে সেটি একটি পারসিস্টেন্ট ফুল-ডুপ্লেক্স TCP সকেটে 'Upgrade' করতে চায়। সাধারণ রিভার্স প্রক্সিতে Nginx প্রতিটি রিকোয়েস্টকে স্ট্যান্ডার্ড HTTP হিসেবে দেখে সকেট কানেকশন সাথে সাথে ক্লোজ করে দেয়। সকেট চালু রাখতে Nginx-এ অবশ্যই `proxy_set_header Upgrade $http_upgrade;` এবং `proxy_set_header Connection \"upgrade\";` কনফিগার করতে হয় এবং HTTP/1.1 প্রোটোকল ফোর্স করতে হয়। এটি না দিলে সকেট ড্রপ করে বারবার ডিসকানেক্ট হতে থাকে।",
          b: "ওয়েবসকেট সাধারণ এইচটিটিপি রিকোয়েস্টকে ফুল-ডুপ্লেক্স সকেটে রূপান্তর করে। এনগিনক্স রিভার্স প্রক্সিতে Upgrade এবং Connection হেডার সেট না করলে এনগিনক্স সকেট কানেকশন কেটে দেয়। তাই Socket.io ব্যবহারের জন্য এই দুটি হেডার কনফিগার করা বাধ্যতামূলক।",
          e: "WebSockets initiate via an HTTP handshake that requests a protocol upgrade to bidirectional TCP. Without explicit proxy headers, Nginx defaults to standard HTTP connection lifecycles, immediately severing the handshake. Configuring 'proxy_http_version 1.1', 'Upgrade $http_upgrade', and 'Connection \"upgrade\"' instructs Nginx to preserve the underlying TCP tunnel.",
          code: "location /socket.io/ {\n    proxy_pass http://localhost:5000;\n    proxy_http_version 1.1;\n    proxy_set_header Upgrade $http_upgrade;\n    proxy_set_header Connection \"upgrade\";\n    proxy_set_header Host $host;\n}"
        },
        {
          lvl: "situation",
          q: "তোমার এপিআই সার্ভারে অতিরিক্ত ট্রাফিকের কারণে Nginx `502 Bad Gateway` এরর রিটার্ন করছে। কীভাবে স্টেপ-বাই-স্টেপ ডিবাগ করবে?",
          m: "`502 Bad Gateway` মানে হলো Nginx জীবিত আছে, কিন্তু Nginx যে ব্যাকএন্ড নোড সার্ভারে (`localhost:5000`) রিকোয়েস্ট পাঠাচ্ছে—সেই ব্যাকএন্ড সার্ভার ডাউন হয়ে গেছে বা কোনো রেসপন্স দিচ্ছে না। ডিবাগিং ধাপ: (১) এনগিনক্স এরর লগ চেক করা: `sudo tail -f /var/log/nginx/error.log`। (২) নোডজেএস প্রসেস রানিং আছে কিনা চেক করা: `pm2 status` বা `systemctl status node-api`। (৩) যদি ক্র্যাশ হয়ে থাকে, `pm2 logs --lines 100` দিয়ে কোডের এরর বা OOM ক্র্যাশ দেখা। (৪) ব্যাকএন্ড পোর্ট ঠিক আছে কিনা পরীক্ষা করতে সার্ভারের ভেতর থেকে `curl http://localhost:5000/health` মেরে চেক করা।",
          b: "৫০২ ব্যাড গেটওয়ের অর্থ হলো এনগিনক্স চালু থাকলেও পেছনের নোডজেএস সার্ভার বন্ধ হয়ে গেছে। আমরা প্রথমে pm2 status ও pm2 logs দিয়ে ব্যাকএন্ড ক্র্যাশ হয়েছে কিনা দেখি এবং curl দিয়ে লোকালহোস্টে রিকোয়েস্ট মেরে ব্যাকএন্ডের সমস্যা চিহ্নিত করি।",
          e: "A 502 Bad Gateway denotes that Nginx received an invalid or null response from the upstream backend service. Diagnostic procedure: inspect /var/log/nginx/error.log to verify upstream connection refusals. Check PM2 daemon health via 'pm2 status' and inspect uncaught runtime crashes via 'pm2 logs'. Finally, execute 'curl -I http://127.0.0.1:5000' locally to verify whether the application port is actively listening.",
          code: "sudo tail -n 50 /var/log/nginx/error.log\npm2 status\npm2 logs dokani-api --err"
        },
        {
          lvl: "realworld",
          q: "Dokani POS-এর লাইভ সার্ভারে Nginx-এ Gzip কম্প্রেশন, রেট লিমিটিং ও সিকিউরিটি হেডার তুমি কীভাবে কনফিগার করেছিলে?",
          m: "Dokani সার্ভারে আমি সম্পূর্ণ প্রোডাকশন-গ্রেড Nginx কনফিগারেশন লিখেছিলাম: (১) **Gzip:** `gzip on; gzip_types text/plain application/json application/javascript text/css;` দিয়ে সমস্ত এপিআই রেসপন্স ও জাভাস্ক্রিপ্ট বান্ডেল ৬০% সাইজ কমিয়ে দিয়েছিলাম। (২) **Rate Limiting:** `limit_req_zone $binary_remote_addr zone=api_limit:10m rate=30r/s;` দিয়ে প্রতিটি আইপির জন্য প্রতি সেকেন্ডে ৩০টির বেশি রিকোয়েস্ট ব্লক করেছিলাম। (৩) **Security Headers:** `X-Frame-Options DENY`, `X-Content-Type-Options nosniff`, এবং `Strict-Transport-Security (HSTS)` হেডার যোগ করেছিলাম যাতে ক্লিকজ্যাকিং ও প্রোটোকল ডাউনগ্রেড বন্ধ থাকে।",
          b: "দোকানি সার্ভারে এনগিনক্সে জিপ কম্প্রেশন চালু করে ডেটার সাইজ ৬০% কমানো হয়েছিল যা মোবাইল ব্রাউজারে দ্রুত লোড হতো। রেট লিমিটিং যুক্ত করে ব্রুট ফোর্স আক্রমণ ঠেকানো হয়েছিল এবং কড়া সিকিউরিটি হেডার দিয়ে ব্রাউজার নিরাপত্তা নিশ্চিত করা হয়েছিল।",
          e: "In Dokani POS production, I tuned Nginx for maximum throughput and protection: enabled dynamic Gzip compression over JSON/JS payloads to slash bandwidth consumption by 60%, configured rate limiting zones (30 req/sec with burst buffers) to neutralize DDoS floods, and hardened HTTP headers with HSTS, X-Frame-Options: DENY, and X-Content-Type-Options: nosniff.",
          tip: "এই Nginx কনফিগ জানলে ইন্টারভিউয়ার বুঝবে যে তুমি পুরো ইনফ্রাস্ট্রাকচার নিজের হাতে তুলে নিয়েছ।"
        }
      ]
    },
    {
      id: "pm2-process-management",
      name: "PM2 Process Manager & High Availability",
      desc: "Cluster Mode, Zero-Downtime Reload, ecosystem.config.js, Memory Caps, Auto-Startup, Log Management",
      items: [
        {
          lvl: "lvl1",
          q: "PM2-তে `pm2 restart` এবং `pm2 reload`-এর মধ্যে পার্থক্য কী এবং প্রোডাকশনে কোনটি চালানো উচিত?",
          m: "`pm2 restart` কমান্ডটি চলমান সমস্ত নোড প্রসেস সাথে সাথে একবারে বন্ধ (Kill) করে দেয় এবং তারপর নতুন প্রসেস চালু করে—ফলে ওই কয়েক সেকেন্ডের জন্য কোনো ক্লায়েন্ট রিকোয়েস্ট পাঠালে সাইট ডাউন থাকে (Downtime)। অন্যদিকে **প্রোডাকশনে সর্বদা `pm2 reload` চালাতে হবে**! এটি হলো **Zero-Downtime Rolling Reload**। এটি একে একে একটি করে পুরোনো ওয়ার্কার প্রসেস রিলোড করে—নতুন ওয়ার্কার রেডি না হওয়া পর্যন্ত পুরোনো ওয়ার্কার ট্রাফিক হ্যান্ডেল করতে থাকে। ফলে ব্যবহারকারী ১ মিলিসেকেন্ডের জন্যও কোনো ডাউনটাইম অনুভব করে না।",
          b: "pm2 restart চলমান সব প্রসেস একসাথে বন্ধ করে নতুন করে চালু করে, ফলে সাইট সাময়িক বন্ধ থাকে। কিন্তু pm2 reload জিরো-ডাউনটাইমে একে একে প্রসেস আপডেট করে, ফলে সার্ভার ডাউন না হয়েই নতুন কোড লাইভ হয়ে যায়। তাই প্রোডাকশনে সবসময় reload ব্যবহার করতে হবে।",
          e: "pm2 restart abruptly terminates all active application instances simultaneously, inducing brief service outages. In contrast, 'pm2 reload' (or pm2 reload all) performs a rolling zero-downtime reload: it spawns and verifies a new worker before terminating an old one, ensuring live client requests are never dropped during deployments.",
          code: "# Zero-downtime reload in production\npm2 reload dokani-api --update-env"
        },
        {
          lvl: "lvl2",
          q: "PM2-তে `ecosystem.config.js` ফাইলের প্রয়োজনীয়তা কী এবং এতে কী কী কনফিগারেশন রাখা হয়?",
          m: "সিএলআই-তে লম্বা লম্বা ফ্ল্যাগ দিয়ে `pm2 start` না চালিয়ে একটি স্ট্যান্ডার্ড কনফিগারেশন ফাইল মেনটেইন করা হলো `ecosystem.config.js`। এতে থাকে: (১) অ্যাপের নাম ও এন্ট্রি পয়েন্ট (`script: 'dist/server.js'`)। (২) ইনস্ট্যান্স সংখ্যা (`instances: 'max'`, সব সিপিইউ কোর ব্যবহার)। (৩) এক্সিকিউশন মোড (`exec_mode: 'cluster'`)। (৪) এনভায়রনমেন্ট ভেরিয়েবল (`env_production: { NODE_ENV: 'production', PORT: 5000 }`)। (৫) মেমোরি সিলিং গার্ড (`max_memory_restart: '600M'`) যাতে মেমোরি লিক হলে অটো রিস্টার্ট হয়। (৬) লগ পাথ ও মার্চ লগের নির্দেশিকা।",
          b: "ecosystem.config.js ফাইলের মাধ্যমে পিএম২-এর সমস্ত সেটিংস এক জায়গায় গুছিয়ে রাখা যায়। এখানে অ্যাপের নাম, ক্লাস্টার মোড, সার্ভারের সর্বোচ্চ সিপিইউ ব্যবহার, এনভায়রনমেন্ট ভেরিয়েবল এবং মেমোরি লিমিট নির্ধারণ করা থাকে যা দিয়ে এক কমান্ডে পুরো সিস্টেম চালু করা যায়।",
          e: "The ecosystem.config.js file formalizes deployment architecture in version-controlled declarative code. It configures the cluster topology (instances: 'max', exec_mode: 'cluster'), environment variables per profile, maximum memory restarts (to contain rogue memory leaks), custom log destinations, and watch/ignore parameters.",
          code: "module.exports = {\n  apps: [{\n    name: 'dokani-api',\n    script: './dist/server.js',\n    instances: 'max',\n    exec_mode: 'cluster',\n    max_memory_restart: '600M',\n    env_production: {\n      NODE_ENV: 'production',\n      PORT: 5000\n    }\n  }]\n};"
        },
        {
          lvl: "lvl3",
          q: "PM2 লগ ফাইল প্রতিদিন বড় হতে হতে সার্ভার ডিস্ক ফুল করে ফেলা কীভাবে `pm2-logrotate` দিয়ে বন্ধ করবে?",
          m: "ডিফল্টভাবে PM2 সমস্ত কনসোল আউটপুট `~/.pm2/logs/` ডিরেক্টরিতে আনলিমিটেড সাইজে জমা করতে থাকে, যা কয়েক মাস পর ২০–৩০ জিবি হয়ে ডিস্ক ক্র্যাশ করায়। সমাধান: PM2-এর অফিশিয়াল মডিউল **`pm2-logrotate`** ইনস্টল করা। কমান্ড: `pm2 install pm2-logrotate`। এরপর আমরা কনফিগার করি: (১) সর্বোচ্চ ফাইল সাইজ: `pm2 set pm2-logrotate:max_size 50M` (৫০ মেগাবাইট হলেই ফাইল রোটেট হবে)। (২) রিটেনশন সংখ্যা: `pm2 set pm2-logrotate:retain 7` (সর্বোচ্চ ৭টি পুরোনো ফাইল রেখে বাকিগুলো ডিলিট করবে)। (৩) জিপ কম্প্রেশন: `pm2 set pm2-logrotate:compress true`। এটি ব্যাকগ্রাউন্ডে স্বয়ংক্রিয়ভাবে ডিস্ক সুরক্ষিত রাখে।",
          b: "পিএম২ লগ ফাইল অতিরিক্ত বড় হয়ে ডিস্ক ফুল হওয়া রোধে pm2-logrotate মডিউল ব্যবহার করা হয়। এটি নির্দিষ্ট সাইজ (যেমন ৫০ এমবি) পার হলে স্বয়ংক্রিয়ভাবে লগ ফাইল জিপ কম্প্রেস করে এবং পুরোনো ৭ দিনের ফাইল রেখে বাকিগুলো মুছে ডিস্ক খালি রাখে।",
          e: "Unchecked PM2 logs eventually saturate server disk storage. The production fix is installing pm2-logrotate via 'pm2 install pm2-logrotate'. We calibrate max_size to 50M, retain to 7 historical rotations, and enable gzip compression via 'pm2 set pm2-logrotate:compress true'. This guarantees deterministic log disk consumption without manual intervention.",
          code: "pm2 install pm2-logrotate\npm2 set pm2-logrotate:max_size 50M\npm2 set pm2-logrotate:retain 7\npm2 set pm2-logrotate:compress true"
        },
        {
          lvl: "situation",
          q: "সার্ভার কারেন্ট চলে গিয়ে রিস্টার্ট হলো, কিন্তু রিস্টার্ট হওয়ার পর দেখা গেল তোমার Node.js API ব্যাকগ্রাউন্ডে চালু হয়নি এবং ইউজাররা ৫০২ এরর পাচ্ছে। কীভাবে এটি পার্মানেন্টলি ফিক্স করবে?",
          m: "এই সমস্যার কারণ হলো PM2 প্রসেস লিস্টকে লিনাক্স ওএস বুট সিস্টেমে (Systemd) সেভ করা হয়নি। ফিক্স করার ধাপ: (১) প্রথমে প্রসেসগুলো চালু করে নিই: `pm2 start ecosystem.config.js --env production`। (২) বর্তমান রানিং স্টেট সেভ করি: `pm2 save` (এটি `~/.pm2/dump.pm2` ফাইলে স্ন্যাপশট রাখে)। (৩) ওএস বুট ইন্টিগ্রেশন কমান্ড রান করি: `pm2 startup systemd`। টার্মিনালে একটি `sudo env PATH=...` কমান্ড জেনারেট হবে, সেটি কপি করে টার্মিনালে চালালেই সিস্টেমডিতে PM2 বুট স্ক্রিপ্ট কনফিগার হয়ে যায়। এখন সার্ভার যতবার রিস্টার্ট হোক না কেন, ওএস অন হওয়ার সাথে সাথে PM2 স্বয়ংক্রিয়ভাবে অ্যাপ চালু করে দেবে!",
          b: "সার্ভার রিবুট হলে যাতে সাইট নিজে থেকেই চালু হয় সেজন্য pm2 startup এবং pm2 save কমান্ড ব্যবহার করা হয়। এটি লিনাক্স সিস্টেমডি বুট সিস্টেমে পিএম২ রেজিস্টার করে দেয়, ফলে সার্ভার রিস্টার্ট হলেও ১ সেকেন্ডের মধ্যে অ্যাপ্লিকেশন নিজে থেকে চালু হয়ে যায়।",
          e: "This occurs when PM2's process manifest has not been hooked into the OS init system. Resolution: launch instances, save the active process snapshot using 'pm2 save', and generate the init service via 'pm2 startup systemd'. Execute the generated sudo command to wire PM2 into systemd, guaranteeing instant autonomous relaunch whenever the VPS reboots.",
          code: "pm2 start ecosystem.config.js --env production\npm2 save\npm2 startup systemd\n# Execute the generated sudo command displayed in the console"
        },
        {
          lvl: "realworld",
          q: "Dokani POS-এর ব্যাকএন্ড ডিপ্লয়মেন্টে তুমি PM2 ক্লাস্টার ও মেমোরি গার্ড কীভাবে ব্যবহার করেছিলে?",
          m: "Dokani-তে আমরা ৪-কোর লিনাক্স সার্ভার ব্যবহার করেছিলাম। আমি: (১) `instances: 'max'` দিয়ে ৪টি নোড ওয়ার্কার চালু রেখেছিলাম যা ৪টি কোরে লোড ডিস্ট্রিবিউট করত। (২) প্রতিটি ওয়ার্কারের জন্য `max_memory_restart: '600M'` বসিয়েছিলাম—যদি কোনো একটি ওয়ার্কার সাময়িক মেমোরি স্পাইক করত, PM2 সাইলেন্টলি শুধু সেই নির্দিষ্ট ওয়ার্কারটিকে রিস্টার্ট করে নিত, অন্য ৩টি ওয়ার্কার নিরবচ্ছিন্নভাবে ইউজারদের সেলস অর্ডার প্রসেস করত। (৩) সিআই/সিডি স্ক্রিপ্ট থেকে ডিপ্লয় করার সময় `pm2 reload ecosystem.config.js --env production` চালাতাম যা ট্রাফিক ড্রপ ছাড়া কোড আপডেট করত।",
          b: "দোকানি সার্ভারে আমরা পিএম২ ক্লাস্টার মোডে ৪টি প্রসেস চালাতাম। মেমোরি গার্ডের কারণে কোনো একটি প্রসেসে অতিরিক্ত মেমোরি খরচ হলেও শুধু সেটি রিস্টার্ট হতো কিন্তু বাকি ৩টি প্রসেস চালু থাকায় গ্রাহকের বিক্রিতে কোনো ব্যাঘাত ঘটত না। এছাড়া রিলোড কমান্ড দিয়ে নিরবচ্ছিন্নভাবে কোড আপডেট নিশ্চিত করা হয়েছিল।",
          e: "In Dokani POS, we leveraged PM2's cluster mode across all 4 server CPU cores. Setting max_memory_restart to 600MB ensured that if one worker hit an unexpected memory spike, PM2 silently recycled only that specific worker while the remaining three workers continued servicing cashier transactions without disruption. Deployments executed zero-downtime rolling reloads.",
          tip: "মাল্টি-কোর ক্লাস্টার ও ইন্ডিপেনডেন্ট ওয়ার্কার রিস্টার্টের গভীর জ্ঞান প্রমাণ করে তোমার আর্কিটেকচারাল ম্যাচিউরিটি।"
        }
      ]
    },
    {
      id: "git-cicd-github-actions",
      name: "Git, GitHub & GitHub Actions CI/CD",
      desc: "Branching Strategies, Conventional Commits, GitHub Actions Workflows, Automated Tests, SSH Deployments, Secrets",
      items: [
        {
          lvl: "lvl1",
          q: "CI/CD (Continuous Integration / Continuous Deployment) কী এবং সফটওয়্যার ডেভেলপমেন্টে এটি কেন দরকার?",
          m: "**Continuous Integration (CI):** যখন ডেভেলপাররা কোড পুশ বা পিআর (Pull Request) ওপেন করে, একটি স্বয়ংক্রিয় সার্ভার (যেমন GitHub Actions) কোডটি পুল করে স্বয়ংক্রিয়ভাবে লিন্টিং, টাইপস্ক্রিপ্ট টাইপ চেক এবং ইউনিট টেস্ট চালায়। কোনো এরর থাকলে পিআর মার্জ হওয়া আটকে দেয়। **Continuous Deployment (CD):** টেস্ট পাস করে পিআর মেইন ব্রাঞ্চে মার্জ হওয়ামাত্র স্বয়ংক্রিয়ভাবে কোডটি বিল্ড হয়ে প্রোডাকশন সার্ভারে ডিপ্লয় হয়ে যায়। এর ফলে ম্যানুয়াল ভুলের সম্ভাবনা শূন্যে নেমে আসে এবং দিনে ১০ বার নিশ্চিন্তে ফিচার রিলিজ করা যায়।",
          b: "সিআই/সিডি হলো সফটওয়্যার স্বয়ংক্রিয়ভাবে টেস্ট ও সার্ভারে ডিপ্লয় করার পাইপলাইন। ডেভেলপার কোড পুশ করলেই স্বয়ংক্রিয়ভাবে টেস্ট রান হয় এবং সব ঠিক থাকলে কোনো মানুষের হস্তক্ষেপ ছাড়াই স্বয়ংক্রিয়ভাবে প্রোডাকশন সার্ভারে কোড আপডেট হয়ে যায়।",
          e: "Continuous Integration (CI) automates the validation of code changes via automated linting, type-checking, and test suites triggered on pull requests. Continuous Deployment (CD) automatically builds and ships verified code directly to production infrastructure upon merge. This eliminates manual human error and accelerates release velocity.",
          code: "# GitHub Actions Trigger\non:\n  push:\n    branches: [main]"
        },
        {
          lvl: "lvl2",
          q: "GitHub Actions-এ SSH ব্যবহার করে কীভাবে VPS সার্ভারে স্বয়ংক্রিয় ডিপ্লয়মেন্ট স্ক্রিপ্ট রান করবে?",
          m: "ধাপগুলো: (১) একটি ডেডিকেটেড SSH Key-পেয়ার তৈরি করি এবং প্রাইভেট কি-টি GitHub রিপোজিটরির **Settings > Secrets > Actions**-এ `SSH_PRIVATE_KEY` হিসেবে সংরক্ষণ করি। সার্ভারের আইপি ও ইউজারকেও সিক্রেটে রাখি। (২) `.github/workflows/deploy.yml` ফাইলে `appleboy/ssh-action` ব্যবহার করি। (৩) GitHub Actions রানার সার্ভারে কানেক্ট হয়ে কমান্ডগুলো এক্সিকিউট করে: `cd /var/www/myapp && git pull origin main && npm ci && npm run build && pm2 reload all`। এর ফলে `git push` করলেই ১ মিনিটের ভেতর লাইভ সার্ভারে কোড আপডেট হয়ে যায়! ডকার হলে `docker compose pull && docker compose up -d` চালাবে।",
          b: "গিটহাব অ্যাকশনস দিয়ে ভিপিএস সার্ভারে স্বয়ংক্রিয় ডিপ্লয় করতে এসএসএইচ সিক্রেট ব্যবহার করা হয়। মেইন ব্রাঞ্চে পুশ হলেই গিটহাব অ্যাকশন সার্ভারে ঢুকে গিট পুল করে, নতুন কোড বিল্ড করে এবং পিএম২ রিলোড দিয়ে নতুন ফিচার লাইভ করে দেয়।",
          e: "Automating VPS deployments via GitHub Actions utilizes secure SSH secrets. The workflow authenticates via an encrypted SSH private key using appleboy/ssh-action, connects to the target VPS, pulls latest commits from main, installs dependencies (npm ci), builds artifacts, and triggers 'pm2 reload all' or 'docker compose up -d --build'.",
          code: "- name: Deploy to VPS\n  uses: appleboy/ssh-action@master\n  with:\n    host: ${{ secrets.SERVER_HOST }}\n    username: ${{ secrets.SERVER_USER }}\n    key: ${{ secrets.SSH_PRIVATE_KEY }}\n    script: |\n      cd /var/www/dokani-backend\n      git pull origin main\n      npm ci\n      npm run build\n      pm2 reload dokani-api"
        },
        {
          lvl: "lvl3",
          q: "GitHub Actions-এ বিল্ড টাইম ও ব্যান্ডউইথ দ্রুত করতে 'Actions Cache (`actions/cache`)' কীভাবে কাজ করে?",
          m: "প্রতিবার CI রান হওয়ার সময় যদি পুরো `node_modules` বা Next.js ক্যাশ স্ক্র্যাচ থেকে ডাউনলোড করতে হয়, তবে প্রতি বিল্ডে ৫–১০ মিনিট সময় নষ্ট হয়। `actions/cache` স্টেপ ব্যবহার করে আমরা `package-lock.json`-এর হ্যাশের ওপর ভিত্তি করে `~/.npm` বা `node_modules` ক্যাশ করে রাখি। যদি লক ফাইলে কোনো পরিবর্তন না থাকে, তবে গিটহাব অ্যাকশন ইন্টারনেট থেকে ডাউনলোড না করে পূর্বের ক্যাশ থেকে ১ সেকেন্ডে ডিপেনডেন্সি রিস্টোর করে নেয়। এতে সিআই রান টাইম ৫ মিনিট থেকে ৩০ সেকেন্ডে নেমে আসে।",
          b: "গিটহাব অ্যাকশনস ক্যাশ ব্যবহার করে আমরা প্রতি বিল্ডে নোড মডিউলস নতুন করে ডাউনলোড হওয়া রোধ করি। package-lock.json পরিবর্তন না হলে আগের ক্যাশ থেকেই ফাইল সংগ্রহ করে নেয়, ফলে সিআই বিল্ড ৫ মিনিটের জায়গায় মাত্র ৩০ সেকেন্ডে শেষ হয়।",
          e: "GitHub Actions cache (actions/cache) preserves deterministic dependency trees across pipeline runs. By hashing package-lock.json into a cache key, the runner restores cached npm directories instead of performing redundant network downloads, compressing pipeline duration from minutes down to seconds.",
          code: "- name: Cache Node Modules\n  uses: actions/cache@v3\n  with:\n    path: ~/.npm\n    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}\n    restore-keys: | \n      ${{ runner.os }}-node-"
        },
        {
          lvl: "situation",
          q: "একজন জুনিয়র ডেভেলপার মেইন ব্রাঞ্চে ভুল কোড পুশ করায় প্রোডাকশন সাইট ডাউন হয়ে গেছে। তুমি কীভাবে ইনস্ট্যান্ট রোলব্যাক করবে এবং ভবিষ্যতে এটি পুরোপুরি রোধ করবে?",
          m: "তাৎক্ষণিক রোলব্যাক: (১) সার্ভারে ঢুকে গিট দিয়ে আগের স্টেবল কমিটে ফিরে যাব: `git reset --hard <STABLE_COMMIT_SHA> && pm2 reload all` (অথবা ডকার হলে আগের ট্যাগড ইমেজ চালাব)। এটি ৩০ সেকেন্ডে সাইট আপ করে দেবে। স্থায়ী সমাধান: (১) **GitHub Branch Protection Rules:** মেইন ব্রাঞ্চে সরাসরি পুশ সম্পূর্ণ ব্লক করব (`Require a pull request before merging`)। (২) মার্জ হওয়ার আগে অন্তত ১ জনের কোড রিভিউ অ্যাপ্রুভাল এবং GitHub Actions CI টেস্ট পাস বাধ্যতামূলক করব। (৩) কোনো ডেভেলপারকে সার্ভারের সরাসরি রুট এসএসএইচ পাসওয়ার্ড না দিয়ে শুধু সিআই বটকে এক্সেস দেব।",
          b: "সাইট ডাউন হলে প্রথমে git reset --hard দিয়ে আগের ভালো কমিটে ব্যাক করে পিএম২ রিলোড দিয়ে সাইট লাইভ করি। স্থায়ী সমাধানে মেইন ব্রাঞ্চ লক করে দিই যাতে কেউ সরাসরি পুশ করতে না পারে। কোড রিভিউ এবং সিআই টেস্ট পাস ছাড়া মেইন ব্রাঞ্চে কোড মার্জ হওয়া নিষিদ্ধ করি।",
          e: "Emergency recovery: SSH into the host and roll back to the prior stable commit via 'git reset --hard <COMMIT_SHA>' followed by 'pm2 reload all'. Permanent preventive measures: enforce GitHub branch protection rules prohibiting direct pushes to main, require status checks (CI tests) to pass before merging, mandate at least one peer code review approval, and restrict production SSH keys to automated deployment runners.",
          tip: "Branch Protection Rule এবং Least Privilege Access ইন্টারভিউ বোর্ডের প্রিয় পয়েন্ট।"
        },
        {
          lvl: "realworld",
          q: "Dokani ও PTTABD-তে তুমি কীভাবে ফুল CI/CD অটোমেশন পাইপলাইন আর্কিটেকচার করেছিলে?",
          m: "Dokani ও PTTABD-তে আমরা সম্পূর্ণ অটোমেটেড পাইপলাইন তৈরি করেছিলাম: (১) ডেভেলপার পিআর তৈরি করলেই GitHub Actions-এ TypeScript `tsc --noEmit`, ESLint, এবং Jest টেস্ট রান হতো। (২) পিআর রিভিউ হয়ে `main` ব্রাঞ্চে মার্জ হওয়ামাত্র সিডি ওয়ার্কফ্লো ট্রিগার হতো। (৩) এটি উবুন্টু VPS সার্ভারে SSH দিয়ে ঢুকে গিট পুল করত, Prisma মাইগ্রেশন চালাত (`npx prisma migrate deploy`), ফ্রন্টএন্ড/ব্যাকএন্ড বিল্ড করত এবং PM2 দিয়ে জিরো-ডাউনটাইমে রিলোড দিত। (৪) ডিপ্লয় শেষ হলে একটি টেলিগ্রাম বট ওয়েবhooks দিয়ে আমাদের ডেভেলপার গ্রুপে '✅ Deployment Success: Dokani v2.4 Live' মেসেজ পাঠাত।",
          b: "দোকানি ও পিটিটিএবিডিতে আমরা সম্পূর্ণ অটোমেটেড সিআই/সিডি পাইপলাইন তৈরি করেছি। কোড মার্জ হওয়ামাত্র স্বয়ংক্রিয়ভাবে টাইপ চেকিং শেষ হয়ে উবুন্টু সার্ভারে মাইগ্রেশন ও বিল্ড সম্পন্ন হতো এবং পিএম২ রিলোড দিত। কাজ শেষে টেলিগ্রাম গ্রুপে ডিপ্লয় সফলতার নোটিফিকেশন চলে আসত।",
          e: "For Dokani and PTTABD, I architected end-to-end GitHub Actions pipelines. Pull requests triggered automated linting, static TypeScript verification, and test execution. Merges to main dispatched an SSH runner into our Ubuntu VPS, executing idempotent Prisma migrations (prisma migrate deploy), building production bundles, and triggering PM2 rolling reloads, concluded by automated Telegram webhook deployment notifications.",
          tip: "Telegram/Slack ডিপ্লয়মেন্ট নোটিফিকেশন যোগ করার অভিজ্ঞতা একজন ফিনিশড প্রফেশনালকে নির্দেশ করে।"
        }
      ]
    },
    {
      id: "vps-paas-deployment",
      name: "VPS vs PaaS (Vercel, Render, Railway)",
      desc: "Bare-Metal / VPS vs Managed Cloud, Vercel for Next.js, Render / Railway for Node.js, Cost vs Control Trade-offs",
      items: [
        {
          lvl: "lvl1",
          q: "Self-Hosted VPS (DigitalOcean / Hetzner) বনাম PaaS (Vercel / Render / Railway): কোনটি কখন বেছে নেবে?",
          m: "**PaaS (Vercel, Render, Railway):** সেরা যখন দ্রুত প্রোটোটাইপিং বা ফ্রন্টএন্ড ফোকাসড দরকার। সার্ভার কনফিগারেশন, ওএস প্যাচিং বা এনগিনক্স নিয়ে ভাবতে হয় না—গিট পুশেই অটো ডিপ্লয় হয়। নেক্সটজেএস-এর জন্য Vercel বিশ্বমানের। কিন্তু সমস্যা হলো: ট্রাফিক বাড়লে PaaS-এর বিল অবিশ্বাস্য রকম বেশি আসে এবং সার্ভার কনফিগারেশনে সম্পূর্ণ নিয়ন্ত্রণ থাকে না। **Self-Hosted VPS (Hetzner, DigitalOcean):** সেরা যখন এন্টারপ্রাইজ ব্যাকএন্ড, বিশাল ডাটাবেজ এবং খরচ নিয়ন্ত্রণ দরকার। মাত্র ৫-১০ ডলারে একটি শক্তিশালী সার্ভার পাওয়া যায় যেখানে Nginx, PM2, Docker দিয়ে শতভাগ স্বাধীনতা বজায় থাকে।",
          b: "ভার্সেল বা রেন্ডারের মতো পাস (PaaS) প্ল্যাটফর্মে কোনো সার্ভার কনফিগার ছাড়াই সহজে কোড ডিপ্লয় করা যায়। তবে ট্রাফিক বাড়লে এদের খরচ অনেক বেশি হয়। অন্যদিকে ভিপিএস (VPS) সার্ভারে লিনাক্স, ডকার ও এনগিনক্সের মাধ্যমে পূর্ণ নিয়ন্ত্রণ পাওয়া যায় এবং অত্যন্ত সাশ্রয়ী খরচে বিশাল অ্যাপ্লিকেশন চালানো যায়।",
          e: "PaaS platforms (Vercel, Render, Railway) abstract infrastructure management, providing effortless git-triggered deployments, automated SSL, and global edge CDNs—ideal for rapid iteration and frontend Next.js apps. However, high-scale PaaS pricing grows exorbitant. Self-hosted VPS instances (Hetzner, DigitalOcean) provide root access, fixed low monthly costs, and total architectural freedom (custom Nginx, Docker, cron, sockets) at the expense of manual system administration.",
          tip: "ব্যবসায়িক খরচ (Cost Efficiency) এবং কন্ট্রোল (Architectural Control)-এর তুলনা ইন্টারভিউতে তুলে ধরো।"
        },
        {
          lvl: "lvl2",
          q: "Next.js অ্যাপ্লিকেশন Vercel-এ হোস্ট করার বিশেষ সুবিধাগুলো কী এবং কাস্টম VPS-এ হোস্ট করলে কোন চ্যালেঞ্জগুলো আসে?",
          m: "Vercel নেক্সটজেএস-এর নির্মাতা হওয়ায় এটি নেক্সটজেএস-এর সমস্ত ফিচার নেটিভলি অপটিমাইজ করে: (১) অটোমেটিক গ্লোবাল এজ সিডিএন ক্যাশিং। (২) Server Components ও Server Actions স্বয়ংক্রিয়ভাবে গ্লোবাল সার্ভারলেস ফাংশনে রূপান্তর। (৩) ইমেজ অপটিমাইজেশন ক্লাউডে বিল্ট-ইন। অন্যদিকে VPS-এ Next.js হোস্ট করলে চ্যালেঞ্জ হলো: ইমেজ অপটিমাইজেশনের জন্য সার্ভারের নিজস্ব CPU খরচ হয়, একাধিক ইনস্ট্যান্স থাকলে ইনক্রিমেন্টাল স্ট্যাটিক রিজেনারেশন (ISR) ক্যাশ সিঙ্ক করতে সেন্ট্রাল Redis/S3 ক্যাশ হ্যান্ডলার সেট করতে হয়, এবং নোড প্রসেস PM2 দিয়ে ম্যানেজ করতে হয়।",
          b: "ভার্সেলে নেক্সটজেএস নিজে থেকেই গ্লোবাল সার্ভারলেস ফাংশন ও এজে ক্যাশ হয়ে যায় যা চালানো খুব সহজ। কিন্তু নিজস্ব ভিপিএস সার্ভারে নেক্সটজেএস চালাতে গেলে ইমেজ অপটিমাইজেশনে সিপিইউ ব্যবহার ও আইএসআর (ISR) ক্যাশ ম্যানেজ করার চ্যালেঞ্জ থাকে, যা পিএম২ ও এনগিনক্স দিয়ে সমাধান করতে হয়।",
          e: "Vercel delivers native zero-config synergy with Next.js: automated edge caching, on-demand ISR invalidations, and seamless Serverless/Edge function mapping. Self-hosting Next.js on a Linux VPS requires running a long-lived Node process under PM2, managing image optimization CPU loads (using Sharp), configuring Nginx reverse proxying, and provisioning shared Redis/S3 adapters for multi-instance ISR cache synchronizations.",
          code: "// Standalone build for VPS in next.config.js\nmodule.exports = {\n  output: 'standalone'\n};"
        },
        {
          lvl: "lvl3",
          q: "Railway বা Render-এ দীর্ঘমেয়াদী ব্যাকগ্রাউন্ড প্রসেস বা Socket.io চালাতে গিয়ে 'Sleep' বা 'Cold Start' সমস্যা কীভাবে সমাধান করবে?",
          m: "Railway বা Render-এর ফ্রি বা সস্তা বেসিক টিয়ারে ইনকামিং রিকোয়েস্ট না থাকলে সার্ভার কন্টেইনার স্লিপে চলে যায় (Cold Start)। ফলে কাস্টমার এপিআই কল দিলে প্রথমবার ৩০–৫০ সেকেন্ড আটকে থাকে এবং চলমান WebSocket কানেকশন কেটে যায়। সমাধান: (১) প্রোডাকশনে অবশ্যই 'Always On' বা পেইড প্ল্যান নির্বাচন করা যেখানে স্লিপিং বন্ধ থাকে। (২) ব্যাকগ্রাউন্ড ওয়ার্কারের জন্য ওয়েব সার্ভিসের পরিবর্তে ডেডিকেটেড 'Background Worker Service' তৈরি করা যাতে কোনো HTTP পোর্ট বাইন্ড ছাড়াই প্রসেস অবিরাম চলতে পারে। (৩) অথবা নিজস্ব VPS সার্ভারে মাইগ্রেট করা যেখানে কোনো কোল্ড স্টার্টের ধারণাই নেই।",
          b: "রেন্ডার বা রেলওয়েতে রিকোয়েস্ট না থাকলে কন্টেইনার স্লিপে চলে যায় ফলে প্রথম রিকোয়েস্টে দেরি হয় এবং সকেট কেটে যায়। এটি সমাধানে অলওয়েজ-অন পেইড প্ল্যান নিতে হয় বা ব্যাকগ্রাউন্ড ওয়ার্কার সার্ভিস চালু করতে হয়, অথবা নিজস্ব ভিপিএস সার্ভার ব্যবহার করতে হয় যেখানে প্রসেস সবসময় সচল থাকে।",
          e: "Low-tier PaaS instances spin down to zero replicas upon idle periods, causing 30-second cold starts and dropping persistent WebSocket connections. Solutions include upgrading to paid 'Always On' instances, deploying decoupled Background Worker dynos without HTTP ingress requirements, or migrating stateful workloads to dedicated Linux VPS instances.",
          tip: "Stateful (Socket/Cron) বনাম Stateless (Serverless API) আর্কিটেকচারের তফাৎ বোঝাও।"
        },
        {
          lvl: "situation",
          q: "একটি স্টার্টআপের বাজেট প্রতি মাসে মাত্র ২০ ডলার, কিন্তু তাদের ফ্রন্টএন্ড, ব্যাকএন্ড এপিআই, পোস্টগ্রেস ডাটাবেজ ও রেডি ক্যাশ লাইভ করতে হবে। তুমি কোন হোস্টিং স্ট্র্যাটেজি সাজাবে?",
          m: "২০ ডলারের লিমিটেড বাজেটে PaaS নিলে ডাটাবেজ ও এপিআই ফি শেষ হয়ে যাবে। সেরা স্ট্র্যাটেজি: (১) **ফ্রন্টএন্ড (Next.js):** Vercel-এর ফ্রি টিয়ারে হোস্ট করব—এতে গ্লোবাল সিডিএন ও হাই-স্পিড পাব বিনামূল্যে। (২) **ব্যাকএন্ড ও ডাটাবেজ:** Hetzner বা DigitalOcean-এ একটি $৮-$১০ ডলারের Ubuntu VPS (2 vCPU, 4GB RAM) নেব। (৩) ওই সার্ভারে Docker Compose দিয়ে Node.js API, PostgreSQL এবং Redis চালাব। Nginx দিয়ে রিভার্স প্রক্সি ও Certbot দিয়ে ফ্রি SSL দেব। (৪) স্ট্যাটিক ইমেজের জন্য Cloudflare R2 ফ্রি টিয়ার ব্যবহার করব। এতে মাত্র ১০ ডলারে এন্টারপ্রাইজ কোয়ালিটি সেটআপ দাঁড়িয়ে যাবে এবং প্রতি মাসে ১০ ডলার সেভ হবে!",
          b: "সীমিত বাজেটে সেরা উপায় হলো ফ্রন্টএন্ড ভার্সেলে ফ্রিতে হোস্ট করা এবং একটি ১০ ডলারের হেটৎসনার বা ডিজিটালওশান ভিপিএস সার্ভারে ডকার কম্পোজ দিয়ে ব্যাকএন্ড, পোস্টগ্রেস ও রেডিস চালানো। ক্লাউডফ্লেয়ারের ফ্রি এসএসএল ও সিডিএন দিয়ে পুরো সিস্টেম মাত্র ১০ ডলারে সম্পূর্ণ প্রস্তুত করা সম্ভব।",
          e: "Within a $20/month budget, deploy the Next.js frontend to Vercel's free tier for worldwide edge delivery. Provision a single high-performance $10/month VPS (e.g., Hetzner Cloud 2 vCPU, 4GB RAM). Run the Node.js API, PostgreSQL, and Redis as containerized services orchestrated via Docker Compose behind an Nginx reverse proxy with automated Let's Encrypt SSL, staying well below budget while delivering enterprise stability.",
          tip: "এই বাস্তব ব্যবসায়িক জ্ঞান প্রমাণ করে তুমি ক্লায়েন্ট বা কোম্পানির খরচ বাঁচাতে দক্ষ।"
        },
        {
          lvl: "realworld",
          q: "Dokani POS-এর হোস্টিং আর্কিটেকচার তুমি কীভাবে সাজিয়েছিলে যাতে ক্লায়েন্টকে উচ্চমূল্যের ক্লাউড বিল না দিয়েও সর্বোচ্চ পারফরম্যান্স নিশ্চিত করা গেছে?",
          m: "Dokani-তে আমরা হাইব্রিড আর্কিটেকচার অনুসরণ করেছি: ফ্রন্টএন্ডের জন্য Vercel এবং ব্যাকএন্ড ও পোস্টগ্রেস ডাটাবেজের জন্য ডেডিকেটেড লিনাক্স VPS। এতে দোকানের ক্যাশিয়াররা Vercel-এর গ্লোবাল সিডিএন থেকে ইনস্ট্যান্ট পেজ লোড পেত, আর ব্যাকএন্ডের ডাটাবেজ কোনো সার্ভারলেস কানেকশন লিমিট ছাড়াই লোকালহোস্টে PgBouncer ও PM2 ক্লাস্টারে বিদ্যুৎ গতিতে রান করত। ফলে যেখানে AWS বা ক্লাউডে প্রতি মাসে শত শত ডলার বিল আসত, আমরা মাত্র ১৫–২০ ডলারে সুপার ফাস্ট লাইভ সার্ভিস চালিয়েছি।",
          b: "দোকানি সিস্টেমে আমরা হাইব্রিড পদ্ধতি নিয়েছিলাম: ফ্রন্টএন্ড দ্রুত লোডের জন্য ভার্সেলে এবং ব্যাকএন্ড ও ডাটাবেজ নিজস্ব ভিপিএস সার্ভারে। ফলে কোনো বিশাল ক্লাউড বিল ছাড়াই সুপারশপের ক্যাশিয়াররা নিরবচ্ছিন্নভাবে দ্রুত গতিতে সিস্টেম ব্যবহার করতে পেরেছে।",
          e: "In Dokani POS, I engineered a cost-effective hybrid hosting architecture. The Next.js frontend deployed to Vercel, capitalizing on edge asset distribution. The backend API, PostgreSQL database, and Redis cache ran on a dedicated Linux VPS managed via PM2 and PgBouncer. This eliminated serverless connection exhaustion and cloud pricing surprises, maintaining sub-80ms API latencies under a predictable $15/month budget.",
          tip: "হোস্টিং আর্কিটেকচারের এমন বাস্তব রূপরেখা টেক লিডদের মুগ্ধ করবে।"
        }
      ]
    },
    {
      id: "cloudflare-dns-ssl",
      name: "Cloudflare DNS, SSL & Edge Security",
      desc: "DNS A/CNAME Records, Flexible vs Full vs Strict SSL, CDN Edge Caching, DDoS Protection, WAF Rules",
      items: [
        {
          lvl: "lvl1",
          q: "Cloudflare DNS-এ প্রক্সি স্ট্যাটাস (Orange Cloud vs Grey Cloud)-এর পার্থক্য কী?",
          m: "**Orange Cloud (Proxied):** যখন ডোমেইনের পাশে অরেঞ্জ ক্লাউড অন থাকে, তখন ক্লায়েন্টের সমস্ত ট্রাফিক প্রথমে ক্লাউডফ্লেয়ারের গ্লোবাল সিডিএন এজ নেটওয়ার্ক দিয়ে যায়। এর ফলে: তোমার আসল সার্ভারের আইপি অ্যাড্রেস ইন্টারনেটে সম্পূর্ণ লুকানো থাকে, ফ্রি ডিডিওএস প্রটেকশন পাওয়া যায় এবং স্ট্যাটিক কন্টেন্ট ক্যাশ হয়। **Grey Cloud (DNS Only):** ট্রাফিক সরাসরি ক্লাউডফ্লেয়ার বাইপাস করে তোমার সার্ভারের আইপিতে চলে যায়। এতে কোনো সিডিএন ক্যাশ বা ডিডিওএস প্রটেকশন থাকে না—এটি সাধারণত সরাসরি মেইল সার্ভার (MX) বা নির্দিষ্ট এসএসএইচ পোর্টে ব্যবহৃত হয়।",
          b: "অরেঞ্জ ক্লাউড অন থাকলে ট্রাফিক ক্লাউডফ্লেয়ার হয়ে সার্ভারে যায়, ফলে আসল সার্ভার আইপি গোপন থাকে এবং সাইট ডিডিওএস আক্রমণ থেকে সুরক্ষিত থাকে। গ্রে ক্লাউড থাকলে ট্রাফিক সরাসরি সার্ভারের আইপিতে যায় এবং ক্লাউডফ্লেয়ারের কোনো প্রটেকশন বা ক্যাশিং কাজ করে না।",
          e: "Orange Cloud (Proxied) routes client traffic through Cloudflare's global edge network, masking your origin server's real IP address while delivering DDoS mitigation, WAF security, and edge caching. Grey Cloud (DNS Only) acts purely as an authoritative DNS resolver, resolving directly to your origin server without proxying, caching, or IP masking.",
          code: "# DNS Records\nA     api      192.0.2.1   Proxied (Orange Cloud)\nCNAME pos      vercel.app  Proxied (Orange Cloud)"
        },
        {
          lvl: "lvl2",
          q: "Cloudflare-এ SSL/TLS এনক্রিপশন মোডস: 'Flexible', 'Full', এবং 'Full (Strict)'-এর মধ্যে মারাত্মক পার্থক্য কী এবং কেন Flexible ব্যবহার করা অনিরাপদ?",
          m: "(১) **Flexible SSL (অত্যন্ত ঝুঁকিপূর্ণ):** ব্রাউজার থেকে ক্লাউডফ্লেয়ার পর্যন্ত HTTPS থাকে, কিন্তু ক্লাউডফ্লেয়ার থেকে তোমার আসল সার্ভারে আন-এনক্রিপ্টেড প্লেইন HTTP (৮০) দিয়ে ডাটা যায়। মাঝপথে যে কেউ ট্রাফিক ইন্টারসেপ্ট করতে পারে এবং এটি প্রায়শই 'Infinite Redirect Loop' তৈরি করে। (২) **Full SSL:** ব্রাউজার থেকে ক্লাউডফ্লেয়ার এবং ক্লাউডফ্লেয়ার থেকে সার্ভার উভয় প্রান্তেই HTTPS থাকে, তবে সার্ভারে সেলফ-সাইন্ড সার্টিফিকেট হলেও চলে। (৩) **Full (Strict) (প্রোডাকশন স্ট্যান্ডার্ড):** ক্লাউডফ্লেয়ার থেকে সার্ভার পর্যন্ত একটি ভ্যালিড অথরাইজড এসএসএল সার্টিফিকেট (যেমন Certbot বা Cloudflare Origin CA) থাকতে হয়। প্রোডাকশনে সর্বদা **Full (Strict)** ব্যবহার করতে হবে!",
          b: "ফ্লেক্সিবল মোডে ব্রাউজার থেকে ক্লাউডফ্লেয়ার সুরক্ষিত থাকলেও ক্লাউডফ্লেয়ার থেকে মূল সার্ভারে ডেটা সাধারণ আন-এনক্রিপ্টেড অবস্থায় যায় যা অনিরাপদ। ফুল স্ট্রিক্ট (Full Strict) মোডে ব্রাউজার থেকে মূল সার্ভার পর্যন্ত প্রতিটি ধাপে শতভাগ ভ্যালিড এসএসএল এনক্রিপশন নিশ্চিত করা হয় যা প্রোডাকশনের জন্য বাধ্যতামূলক।",
          e: "Flexible SSL terminates HTTPS at Cloudflare's edge, forwarding unencrypted plain HTTP to your origin—vulnerable to man-in-the-middle packet sniffing and infinite 301 redirect loops. Full SSL encrypts both hops but permits self-signed origin certificates. Full (Strict) mandates cryptographically valid TLS certificates (Let's Encrypt or Cloudflare Origin CA) on the origin server, representing the true production security standard.",
          tip: "Flexible SSL-এর রিডাইরেক্ট লুপ সমস্যার কারণ ব্যাখ্যা করতে পারলে দারুণ ইমপ্রেশন হবে।"
        },
        {
          lvl: "lvl3",
          q: "Cloudflare-এ 'Page Rules' ও 'Cache Rules' দিয়ে কীভাবে স্ট্যাটিক এসেট এজ-এ ক্যাশ করবে এবং ডায়নামিক API ক্যাশ হওয়া থেকে রক্ষা করবে?",
          m: "ডিফল্টভাবে ক্লাউডফ্লেয়ার শুধুমাত্র ইমেজ ও সিএসএস ক্যাশ করে, কোনো এইচটিএমএল বা এপিআই ক্যাশ করে না। তবে ভুল কনফিগারেশনে এপিআই রেসপন্স ক্যাশ হয়ে গেলে এক ইউজারের ডাটা অন্য ইউজার দেখতে পারে! সঠিক রুলস: (১) স্ট্যাটিক এসেটের জন্য: ইউআরএল প্যাটার্ন `*.dokani.bip.sg/assets/*` দিয়ে 'Cache Level: Cache Everything' এবং 'Edge Cache TTL: 7 days' সেট করব। (২) ডায়নামিক এপিআইয়ের জন্য: `*.dokani.bip.sg/api/*` দিয়ে কড়া রুল 'Cache Level: Bypass' সেট করব যাতে এপিআই কল সরাসরি আমাদের অরিজিন নোড সার্ভারে পৌঁছায়।",
          b: "ক্লাউডফ্লেয়ারে ক্যাশ রুলস দিয়ে ইমেজ ও ফ্রন্টএন্ড এসেটগুলোকে সিডিএন-এ ৭ দিনের জন্য ক্যাশ করে রাখা হয় যাতে পেজ চোখের পলকে লোড হয়। কিন্তু /api/ রুটের জন্য ক্যাশ বাইপাস (Bypass) রুল দেওয়া হয় যাতে কোনো অবস্থাতেই ডায়নামিক ডাটা ক্যাশ না হয়ে সরাসরি সার্ভার থেকে আসে।",
          e: "To optimize edge delivery without risking sensitive dynamic data leaks: define a Cache Rule matching static assets (/static/*, /_next/static/*) with 'Cache Level: Cache Everything' and an Edge TTL of 7 days. Concurrently, define an explicit bypass rule for API routes matching (/api/*) configured with 'Cache Level: Bypass' to force real-time evaluation at the origin server.",
          code: "# Cloudflare Cache Rule\n(http.request.uri.path matches \"^/api/\") => Cache: Bypass\n(http.request.uri.path matches \"^/static/\") => Cache: Everything (TTL: 7 days)"
        },
        {
          lvl: "situation",
          q: "তোমার লাইভ সাইটে হঠাৎ অস্বাভাবিক ট্রাফিক স্পাইক হয়ে সার্ভার স্লো হচ্ছে। তুমি কীভাবে ক্লাউডফ্লেয়ার ড্যাশবোর্ড থেকে তাৎক্ষণিক সাইট বাঁচাবে?",
          m: "তাৎক্ষণিক ইমার্জেন্সি ৩টি স্টেপ: (১) ক্লাউডফ্লেয়ার ড্যাশবোর্ডে গিয়ে সাথে সাথে **'Under Attack Mode'** চালু করব—এতে ইনকামিং প্রতিটি রিকোয়েস্টে জাভাস্ক্রিপ্ট চ্যালেঞ্জ ও ক্লাউডফ্লেয়ার টার্নস্টাইল ভেরিফিকেশন আসবে যা বট ও ডিডিওএস ট্রাফিক নিমেষে ব্লক করে দেবে। (২) **Security WAF Rules:** দেখব কোন দেশ থেকে বা কোন আইপি রেঞ্জ থেকে অস্বাভাবিক রিকোয়েস্ট আসছে, এবং নির্দিষ্ট কান্ট্রি ব্লক বা রেট লিমিট রুল অ্যাড করব। (৩) সার্ভারের অরিজিন আইপি যেন সরাসরি হিট না হতে পারে তা নিশ্চিত করতে UFW ফায়ারওয়ালে শুধুমাত্র ক্লাউডফ্লেয়ারের অফিশিয়াল আইপি রেঞ্জ এলাউ রাখব।",
          b: "ডিডিওএস আক্রমণ দেখা দিলে সাথে সাথে ক্লাউডফ্লেয়ারের Under Attack Mode অন করে দিই যা বট ট্রাফিক আটকে দেয়। ক্লাউডফ্লেয়ার ডব্লিউএএফ (WAF) দিয়ে আক্রমণকারী আইপি ব্লক করি এবং মূল সার্ভারের ফায়ারওয়ালে শুধুমাত্র ক্লাউডফ্লেয়ারের আইপি ছাড়া বাকি সব সরাসরি কানেকশন ব্লক করে দিই।",
          e: "During an active DDoS flood: toggle Cloudflare's 'Under Attack Mode' immediately to enforce invisible cryptographic challenges that filter automated bot traffic. Inspect analytics to identify malicious ASNs or geographic spikes, enforcing targeted WAF block rules. At the server level, configure UFW to accept port 80/443 traffic strictly from Cloudflare's published IP ranges, dropping direct origin bypass attacks.",
          code: "# Allow only Cloudflare IP ranges in UFW\nsudo ufw allow from 173.245.48.0/20 to any port 443"
        },
        {
          lvl: "realworld",
          q: "Dokani POS-এর সাবডোমেইন (`dokani.bip.sg` এবং `api.dokani.bip.sg`) ম্যানেজমেন্টে তুমি ক্লাউডফ্লেয়ার কীভাবে ব্যবহার করেছিলে?",
          m: "Dokani-তে আমি ক্লাউডফ্লেয়ারের মাধ্যমে চমৎকার এন্টারপ্রাইজ সেটআপ করেছিলাম: (১) রুট ডোমেইন ও ফ্রন্টএন্ড সাবডোমেইনকে CNAME দিয়ে Vercel-এর সাথে প্রক্সি করেছিলাম। (২) ব্যাকএন্ড এপিআই সাবডোমেইন `api.dokani.bip.sg`-কে A Record দিয়ে আমাদের উবুন্টু VPS সার্ভারের আইপিতে অরেঞ্জ ক্লাউড প্রক্সি দিয়েছিলাম—ফলে হ্যাকাররা কখনো আমাদের আসল সার্ভার আইপি জানতে পারেনি। (৩) SSL/TLS মোড 'Full (Strict)' রেখেছিলাম এবং সার্ভারে অরিজিন সার্টিফিকেট বসিয়েছিলাম। (৪) ক্লাউডফ্লেয়ারের গ্লোবাল সিডিএন-এর কারণে ঢাকার বাইরে থেকেও যে কোনো দোকানদার ১ সেকেন্ডে অ্যাপ ওপেন করতে পারত।",
          b: "দোকানি সিস্টেমে ক্লাউডফ্লেয়ারের মাধ্যমে ফ্রন্টএন্ড ভার্সেল এবং ব্যাকএন্ড ভিপিএস সার্ভারের সাথে সংযুক্ত ছিল। আসল সার্ভারের আইপি লুকিয়ে রাখার জন্য অরেঞ্জ ক্লাউড প্রক্সি ও ফুল স্ট্রিক্ট এসএসএল ব্যবহার করা হয়েছিল। ফলে সাইটটি অত্যন্ত দ্রুত এবং শতভাগ সুরক্ষিত ছিল।",
          e: "In Dokani POS, DNS architecture was routed through Cloudflare: the frontend subdomain pointed via CNAME to Vercel, while api.dokani.bip.sg routed via proxied A-record to our Ubuntu VPS. By enforcing Full (Strict) SSL with Origin CA certs, the VPS IP remained completely cloaked from public recon, while Cloudflare's Anycast CDN cut latency across local ISPs.",
          tip: "Cloudflare Origin CA সার্টিফিকেট ব্যবহার করার কথা বললে ইন্টারভিউয়ার বুঝবে তোমার সিকিউরিটি নলেজ টপ-নচ।"
        }
      ]
    },
    {
      id: "monitoring-backup-prod",
      name: "Production Monitoring, Environment & Recovery",
      desc: "Environment Variables Security, Uptime Monitoring, Prometheus/Grafana / PM2 Plus, Automated Backups, Incident Recovery",
      items: [
        {
          lvl: "lvl1",
          q: "Production Environment Variables (`.env`) ম্যানেজমেন্টে সবচেয়ে বড় সিকিউরিটি ভুলগুলো কী এবং কীভাবে নিরাপদ রাখবে?",
          m: "মারাত্মক ভুলগুলো হলো: (১) `.env` ফাইলকে গিটহাবে পুশ করে ফেলা (পাবলিক বা প্রাইভেট যাই হোক)। (২) ফ্রন্টএন্ড ক্লায়েন্ট বান্ডেলে ব্যাকএন্ডের ডাটাবেজ পাসওয়ার্ড বা পেমেন্ট গেটওয়ের সিক্রেট কি দিয়ে দেওয়া (`NEXT_PUBLIC_` প্রিফিক্স সাবধানে ব্যবহার করতে হবে)। (৩) প্রোডাকশন সার্ভারে প্লেইন টেক্সটে সব জায়গায় পাসওয়ার্ড ছড়িয়ে রাখা। নিরাপদ রাখার নিয়ম: `.gitignore`-এ সর্বদা `.env*` অ্যাড রাখা, সার্ভারে পারমিশন `chmod 600 .env` দিয়ে সীমাবদ্ধ রাখা, এবং সিআই/সিডিতে গিটহাব রিপোজিটরি সিক্রেটস (Encrypted Secrets) ব্যবহার করা।",
          b: ".env ফাইলে ডাটাবেজ পাসওয়ার্ড ও সিক্রেট কি থাকে। এটি কখনোই গিটহাবে পুশ করা যাবে না এবং ফ্রন্টএন্ড কোডে ব্যাকএন্ডের সিক্রেট দেওয়া মারাত্মক ভুল। সার্ভারে .env ফাইলের পারমিশন chmod 600 দিয়ে শুধু ওনারের জন্য সীমাবদ্ধ রাখতে হবে এবং গিটহাব অ্যাকশনস সিক্রেট ব্যবহার করতে হবে।",
          e: "Critical .env security antipatterns include committing secrets to Git repositories, inadvertently exposing server credentials in client bundles via public framework prefixes (NEXT_PUBLIC_), and permissive server permissions. Best practices mandate adding .env to .gitignore, restricting file access via 'chmod 600', and injecting production secrets via GitHub Actions Encrypted Secrets or dedicated vaults.",
          code: "# In .gitignore\n.env\n.env.production\n.env.local\n\n# Secure on server\nchmod 600 .env.production"
        },
        {
          lvl: "lvl2",
          q: "প্রোডাকশন অ্যাপ্লিকেশন হেলথ মনিটরিংয়ে `/health` বা `/live` এন্ডপয়েন্ট কেন প্রয়োজন এবং এতে কী কী চেক থাকা উচিত?",
          m: "একটি ভালো হেলথ চেক এন্ডপয়েন্ট শুধুমাত্র `res.send('OK')` রিটার্ন করলেই যথেষ্ট নয়। এটি হলো 'Deep Health Check'। এতে রিয়েল-টাইমে পরীক্ষা করতে হবে: (১) ডাটাবেজ কানেক্টিভিটি: `prisma.$queryRaw`SELECT 1`` রান করে ডাটাবেজ জীবিত আছে কিনা যাচাই। (২) Redis বা ক্যাশ রেসপন্স করছে কিনা। (৩) সার্ভারের মেমোরি ও ডিস্ক স্পেস ৯৫% পার করেছে কিনা। যদি ডাটাবেজ ডাউন থাকে, তবে এই এন্ডপয়েন্ট ৫০৩ সার্ভিস আনএভেইলেবল রিটার্ন করবে—যাতে Nginx বা লোড ব্যালেন্সার ট্রাফিক অন্য নোডে পাঠিয়ে দেয় এবং মনিটরিং টুলস সাথে সাথে অ্যালার্ট পাঠায়।",
          b: "হেলথ চেক এন্ডপয়েন্টে শুধু সার্ভার চালু থাকা নয়, ডাটাবেজ ও রেডিসের সাথে জীবন্ত সংযোগ আছে কিনা তা পরীক্ষা করতে হয়। ডাটাবেজ ডাউন থাকলে এটি ৫০৩ এরর দেয়, যার ফলে মনিটরিং সিস্টেম ও ক্লাউড লোড ব্যালেন্সার তাৎক্ষণিক সতর্কবার্তা পাঠাতে পারে।",
          e: "A robust /health endpoint performs deep subsystem diagnostics rather than returning shallow static 200 responses. It validates active database connectivity (e.g., executing SELECT 1), verifies Redis cache responsiveness, and checks free memory/disk ratios. If an internal subsystem is broken, it returns HTTP 503, signaling load balancers to reroute traffic.",
          code: "app.get('/health', async (req, res) => {\n  try {\n    await prisma.$queryRaw`SELECT 1`;\n    res.json({ status: 'healthy', uptime: process.uptime(), timestamp: new Date() });\n  } catch (err) {\n    res.status(503).json({ status: 'unhealthy', error: 'Database unreachable' });\n  }\n});"
        },
        {
          lvl: "lvl3",
          q: "Uptime Monitoring এবং Alerting সিস্টেম (যেমন Uptime Kuma / BetterStack) কীভাবে সেট করবে যাতে সাইট ডাউন হলে ২ মিনিটের মধ্যে এসএমএস বা টেলিগ্রাম নোটিফিকেশন আসে?",
          m: "আমরা ওপেন-সোর্স **Uptime Kuma** অথবা BetterStack ব্যবহার করি: (১) মনিটরিং টুলসটি প্রতি ৩০ বা ৬০ সেকেন্ড পর পর আমাদের সাইটের `/health` এন্ডপয়েন্টে HTTP GET রিকোয়েস্ট পাঠায় এবং রেসপন্স টাইম ট্র্যাক করে। (২) যদি টানা ২টি পিং ফেইল করে বা ৫০৩ কোড আসে, সাথে সাথে এর নোটিফিকেশন সিস্টেম ট্রিগার হয়। (৩) আমরা টেলিগ্রাম বট এপিআই বা ডিসকর্ড ওয়েবhooks কনফিগার করে রাখি—ফলে সাইট ডাউন হওয়ার ৬০ সেকেন্ডের মাথায় ডেভেলপারদের স্মার্টফোনে অ্যালার্ম নোটিফিকেশন চলে আসে '🚨 ALERT: Dokani API is DOWN! Status: 503'।",
          b: "আপটাইম কুমা বা বেটারস্ট্যাক প্রতি ৩০ সেকেন্ডে আমাদের সার্ভারের হেলথ চেক মনিটর করে। কোনো কারণে সাইট ডাউন হলে বা ডাটাবেজ ফেল করলে ১ মিনিটের মধ্যে ডেভেলপারদের টেলিগ্রাম গ্রুপে অ্যালার্ম মেসেজ চলে আসে, ফলে দ্রুততম সময়ে সার্ভার রিকভার করা সম্ভব হয়।",
          e: "We deploy heartbeat monitoring using Uptime Kuma or BetterStack targeting the /health route every 30 seconds. Upon encountering consecutive failures (e.g., timeout > 5000ms or non-200 status), automated webhooks fire immediately to our team Telegram bot and pager services, guaranteeing MTTA (Mean Time to Acknowledge) under two minutes.",
          tip: "Mean Time to Detect (MTTD) এবং Mean Time to Resolve (MTTR) টার্মগুলো ইন্টারভিউতে ব্যবহার করবে।"
        },
        {
          lvl: "situation",
          q: "রাত ২টায় তোমার প্রোডাকশন সার্ভার হঠাৎ ডাউন হয়ে গেছে এবং ক্লায়েন্ট থেকে কল আসছে। তুমি কীভাবে ঠান্ডা মাথায় ধাপে ধাপে ইনসিডেন্ট রেসপন্স (Incident Response) পরিচালনা করবে?",
          m: "প্রোডাকশন ইনসিডেন্ট রেসপন্সের ৫টি সুনির্দিষ্ট ধাপ: (১) **Acknowledge & Triage:** শান্ত থেকে আগে সার্ভার স্ট্যাটাস কনফার্ম করব এবং টিমের সাথে ইনসিডেন্ট চ্যানেল চালু করব। (২) **Identify Failure Point:** টার্মিনালে ঢুকে চেক করব: সার্ভার রিচেবল কিনা (SSH), Nginx ডাউন নাকি Node.js ক্র্যাশ করেছে (`pm2 status`), ডাটাবেজ রানিং আছে কিনা (`systemctl status postgresql`)। (৩) **Immediate Mitigation (Stop the Bleeding):** কোড ডিবাগ করার আগে সাইট আগে লাইভ করব—PM2 রিস্টার্ট বা আগের স্টেবল ভার্সনে রোলব্যাক করব। (৪) **Root Cause Analysis (RCA):** সাইট লাইভ হওয়ার পর শান্তভাবে Winston ও Systemd লগ ঘেঁটে দেখব ঠিক কী কারণে ক্র্যাশ করেছিল (যেমন মেমোরি লিক বা আনহ্যান্ডেল্ড ডাটাবেজ এরর)। (৫) **Post-Mortem & Prevent:** একটি পোস্ট-মর্টেম ডকুমেন্ট লিখে স্থায়ী সমাধান ও ফিক্স কোড পিআর করব।",
          b: "সার্ভার ডাউন হলে আতংকিত না হয়ে প্রথমে এসএসএইচ দিয়ে এনগিনক্স ও পিএম২ এর বর্তমান অবস্থা পরীক্ষা করি। কোড খোঁজার আগে রিস্টার্ট বা রোলব্যাক দিয়ে সাইট দ্রুত চালু করাই মূল লক্ষ্য। সাইট লাইভ হলে লগ ফাইল দেখে মূল কারণ (RCA) বের করে স্থায়ী সমাধান করি।",
          e: "Production incident management follows a disciplined triage playbook: First, acknowledge the outage and notify stakeholders. Second, triage the layer of failure—network/DNS, Nginx reverse proxy, Node runtime crash, or database exhaustion. Third, prioritize recovery over debugging: restart PM2 workers or execute an instant rollback to restore uptime. Fourth, perform Root Cause Analysis (RCA) against system logs. Fifth, write a post-mortem to patch the vulnerability permanently.",
          tip: "এই স্ট্রাকচার্ড উত্তর একজন অভিজ্ঞ টেক লিডের সাইকোলজি ফুটিয়ে তোলে।"
        },
        {
          lvl: "realworld",
          q: "Dokani POS-এর প্রোডাকশন রেডিনেস চেকলিস্ট (Production Readiness Checklist) কীভাবে বাস্তবায়িত করেছিলে?",
          m: "Dokani লাইভ করার আগে আমি এই পূর্ণাঙ্গ চেকলিস্ট ভেরিফাই করেছিলাম: (১) **Security:** সব পোর্ট বন্ধ, শুধুমাত্র ২২, ৮০, ৪৪৩ ওপেন; UFW ফায়ারওয়াল অন; SSL Full (Strict) ভ্যালিড; পাসওয়ার্ড সব bcrypt হ্যাশড। (২) **Reliability:** PM2 Cluster Mode অন; মেমোরি রিস্টার্ট গার্ড ৬০০MB; `pm2 startup` কনফিগার করা; ডাটাবেজে রো-লেভেল সিকিউরিটি ও ইনডেক্স চেকড। (৩) **Monitoring:** `/health` এন্ডপয়েন্ট রেডি; Uptime Kuma মনিটরিং অ্যাক্টিভ; Winston ডেইলি লগ রোটেশন সেট। (৪) **Disaster Recovery:** দৈনিক রাত ২টায় স্বয়ংক্রিয় ক্লাউড ব্যাকআপ ক্রন স্ক্রিপ্ট টেস্টেড এবং রিস্টোর ভেরিফায়েড। এই প্রস্তুতির ফলেই সিস্টেমটি কোনো ক্র্যাশ ছাড়া মাসের পর মাস চলেছে।",
          b: "দোকানি লাইভ করার পূর্বে আমরা পূর্ণাঙ্গ প্রোডাকশন চেকলিস্ট সম্পন্ন করেছি: ফায়ারওয়াল ও এসএসএল নিরাপত্তা, পিএম২ ক্লাস্টার ও স্বয়ংক্রিয় রিবুট ব্যবস্থা, সার্বক্ষণিক আপটাইম মনিটরিং এবং দৈনিক স্বয়ংক্রিয় ব্যাকআপ। এই শক্তিশালী কাঠামোর কারণে সিস্টেমটি সবসময় স্থিতিশীল থাকে।",
          e: "Before Dokani POS went live, I enforced a comprehensive production readiness checklist: ports locked down via UFW, Full (Strict) SSL via Cloudflare Origin CA, PM2 cluster scaling with automated memory caps, deep health checks wired to Uptime Kuma, structured Winston log rotation, and automated daily off-site database backups with verified restoration drills.",
          tip: "প্রোডাকশন চেকলিস্টের এই পয়েন্টগুলো যেকোনো সিনিয়র পদের ইন্টারভিউতে গোল্ড মেডেলের সমান।"
        }
      ]
    }
  ]
};
