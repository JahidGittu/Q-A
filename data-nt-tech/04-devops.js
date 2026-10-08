// NT Tech Innovation — 04. DevOps & Cloud Engineering Mastery (200 Questions - 25 per Topic across 5 Levels)
window.NT_DATA = window.NT_DATA || {};
window.NT_DATA.devops = {
  "id": "devops",
  "title": "DevOps & Cloud Engineering",
  "badge": "Linux · Docker · Nginx · PM2 · CI/CD · VPS vs PaaS · Cloudflare · Monitoring",
  "icon": "🚀",
  "topics": [
    {
      "id": "linux-ubuntu-admin",
      "name": "Linux & Ubuntu Server Administration",
      "desc": "SSH Key Auth, File Permissions (chmod/chown), systemd Services, UFW Firewall, Resource Monitoring (htop, df, free, netstat), Shell Automation",
      "items": [
        {
          "lvl": "lvl1",
          "q": "Linux সার্ভারে পাসওয়ার্ড অথেনটিকেশনের চেয়ে SSH Key Pair অথেনটিকেশন কেন বহুগুণ নিরাপদ?",
          "m": "পাসওয়ার্ড অথেনটিকেশনে ব্রুট-ফোর্স (Brute-Force) অ্যাটাকের মাধ্যমে হ্যাকাররা বট দিয়ে ডিকশনারি পাসওয়ার্ড ট্রাই করে সার্ভারে ঢুকে পড়তে পারে। কিন্তু SSH Key Pair (RSA 4096 বা Ed25519) পাবলিক-প্রাইভেট ক্রিপ্টোগ্রাফি ব্যবহার করে। পাবলিক কি সার্ভারের `~/.ssh/authorized_keys`-এ থাকে এবং প্রাইভেট কি ডেভেলপারের লোকাল কম্পিউটারে থাকে। প্রাইভেট কি ছাড়া কারও পক্ষে লগইন করা গাণিতিকভাবে অসম্ভব। প্রোডাকশনে `PasswordAuthentication no` কনফিগার করে পাসওয়ার্ড লগইন পুরোপুরি বন্ধ রাখা ইন্ডাস্ট্রি স্ট্যান্ডার্ড।",
          "b": "পাসওয়ার্ডের চেয়ে এসএসএইচ কি অনেক বেশি সুরক্ষিত কারণ এটি ব্রুট-ফোর্স আক্রমণ প্রতিরোধ করে। এড২৫৫১৯ বা আরএসএ ক্রিপ্টোগ্রাফির মাধ্যমে ক্লায়েন্টের প্রাইভেট কি সার্ভারের পাবলিক কি যাচাই করে লগইন নিশ্চিত করে।",
          "e": "SSH key pairs (Ed25519 or RSA 4096) replace guessable passwords with asymmetric cryptography. The public key resides on the server in ~/.ssh/authorized_keys while the private key remains secure locally. Disabling PasswordAuthentication in sshd_config neutralizes automated brute-force attacks.",
          "tip": "বলো: 'Ed25519 SSH keys with PasswordAuthentication disabled is the gold standard for server access.'"
        },
        {
          "lvl": "lvl1",
          "q": "Linux ফাইল পারমিশন (chmod) এবং ওনারশিপ (chown) কীভাবে কাজ করে এবং `chmod 755` বনাম `644`-এর অর্থ কী?",
          "m": "লিনাক্সে প্রতিটি ফাইলের ৩ ধরনের পারমিশন থাকে: Read (4), Write (2), Execute (1); এবং ৩টি সত্তা থাকে: Owner, Group, Others। (১) `chmod 644`: ওনার পাবে Read + Write (4+2=6), গ্রুপ ও অন্যরা পাবে শুধুমাত্র Read (4) (সাধারণ কনফিগ ফাইল বা এইচটিএমএল ফাইলের জন্য আদর্শ)। (২) `chmod 755`: ওনার পাবে সব (Read+Write+Execute = 7), গ্রুপ ও অন্যরা পাবে Read + Execute (4+1=5) (ডিরেক্টরি ও এক্সিকিউটেবল স্ক্রিপ্টের জন্য আদর্শ)। `chown user:group filename` ফাইলের মালিকানা পরিবর্তন করে।",
          "b": "chmod ফাইলের পারমিশন (পড়া, লেখা, চালানো) নির্ধারণ করে এবং chown ওনারশিপ পরিবর্তন করে। 644 ফাইলে ওনারকে রিড-রাইট এবং অন্যদের রিড দেয়। 755 ফোল্ডার বা স্ক্রিপ্টে ওনারকে পূর্ণ অধিকার এবং অন্যদের রিড ও এক্সিকিউট পারমিশন দেয়।",
          "e": "Linux permissions represent octal bitmasks for Owner, Group, and Others: Read (4), Write (2), Execute (1). chmod 644 grants read/write to the owner and read-only to others (standard for files). chmod 755 grants execution to owner and traversal to others (standard for web directories). chown reassigns user/group ownership.",
          "code": "chmod 755 /var/www/dokani\nchmod 644 /var/www/dokani/.env\nchown -R www-data:www-data /var/www/dokani"
        },
        {
          "lvl": "lvl1",
          "q": "Ubuntu সার্ভারে `systemd` কী এবং `systemctl` কমান্ড দিয়ে সার্ভিস কীভাবে ম্যানেজ করা হয়?",
          "m": "`systemd` হলো আধুনিক লিনাক্সের সেন্ট্রাল সিস্টেম ও সার্ভিস ম্যানেজার (Init System / PID 1)। এটি ব্যাকগ্রাউন্ড প্রসেস বা ডেমনগুলোকে নিয়ন্ত্রণ করে, সার্ভার রিবুট হলে স্বয়ংক্রিয়ভাবে অ্যাপ চালু করে এবং ক্র্যাশ করলে অটো-রিস্টার্ট করে। প্রধান কমান্ডসমূহ: (১) `systemctl start nginx`: সার্ভিস চালু করা, (২) `systemctl restart nginx`: সার্ভিস রিস্টার্ট করা, (৩) `systemctl status nginx`: সার্ভিসের লাইভ হেলথ ও এরর লগ দেখা, (৪) `systemctl enable nginx`: সার্ভার রিবুট হওয়ার সাথে সাথে স্বয়ংক্রিয়ভাবে চালুর নির্দেশ দেওয়া।",
          "b": "systemd হলো লিনাক্সের প্রধান সার্ভিস ম্যানেজার যা ব্যাকগ্রাউন্ড সার্ভিস পরিচালনা করে। systemctl দিয়ে সার্ভিস শুরু, বন্ধ, রিস্টার্ট এবং সার্ভার বুট হওয়ার সময় অটো-স্টার্ট কনফিগার করা হয়।",
          "e": "systemd is the standard Linux initialization system and service supervisor running as PID 1. systemctl manages service lifecycles (start, stop, restart, reload, status) and registers auto-start upon OS boots via systemctl enable.",
          "code": "sudo systemctl restart nginx\nsudo systemctl enable nginx\nsudo systemctl status nginx"
        },
        {
          "lvl": "lvl1",
          "q": "UFW (Uncomplicated Firewall) কী এবং নতুন উবুন্টু সার্ভারে কীভাবে বেসিক ফায়ারওয়াল রুলস কনফিগার করবে?",
          "m": "UFW হলো লিনাক্স `iptables`-এর ওপর একটি সহজবোধ্য ইন্টারফেস যা সার্ভারের নেটওয়ার্ক পোর্টগুলোকে সুরক্ষিত রাখে এবং অননুমোদিত পোর্ট ট্রাফিকের অ্যাক্সেস ব্লক করে। নতুন সার্ভারে সেটআপের ধাপ: (১) ডিফল্ট ইনকামিং ব্লক ও আউটগোয়িং এলাউ করা: `ufw default deny incoming`, (২) SSH পোর্ট ওপেন রাখা (যাতে নিজের কানেকশন কেটে না যায়!): `ufw allow 22/tcp` বা কাস্টম SSH পোর্ট, (৩) ওয়েব ট্রাফিকের জন্য HTTP ও HTTPS পোর্ট ওপেন করা: `ufw allow 80/tcp`, `ufw allow 443/tcp`, (৪) ফায়ারওয়াল এনাবল করা: `ufw enable`। ডাটাবেজ পোর্ট (5432 বা 27017) সবসময় বাইরের জন্য বন্ধ রাখা উচিত।",
          "b": "UFW হলো উবুন্টুর ফায়ারওয়াল যা অননুমোদিত পোর্ট বন্ধ করে সার্ভার রক্ষা করে। প্রথমে SSH পোর্ট (22) এবং ওয়েব পোর্ট (80, 443) এলাউ করে ফায়ারওয়াল চালু করতে হয়। ডাটাবেজ পোর্ট বাইরের জন্য সবসময় ব্লক রাখতে হয়।",
          "e": "UFW (Uncomplicated Firewall) manages host-level packet filtering. Set up a pristine server by denying incoming by default, whitelisting SSH (port 22) to prevent accidental lockouts, whitelisting web traffic (ports 80 and 443), and enabling via ufw enable while leaving internal DB ports closed.",
          "code": "sudo ufw default deny incoming\nsudo ufw default allow outgoing\nsudo ufw allow 22/tcp\nsudo ufw allow 80/tcp\nsudo ufw allow 443/tcp\nsudo ufw enable"
        },
        {
          "lvl": "lvl1",
          "q": "Linux সার্ভারের স্বাস্থ্য ও রিসোর্স মনিটরিংয়ে `htop`, `df -h`, এবং `free -m` কমান্ডগুলোর কাজ কী?",
          "m": "(১) `htop`: সার্ভারের প্রতিটি সিপিইউ কোরের রিয়েল-টাইম লোড, মেমোরি ব্যবহার এবং কোন প্রসেসটি সবচেয়ে বেশি সিপিইউ খাচ্ছে তা কালারফুল ইন্টারফেস সহ লাইভ পর্যবেক্ষণ ও কিল করার জন্য ব্যবহৃত হয়। (২) `df -h`: ডিস্ক ড্রাইভ বা হার্ডডিস্ক পার্টিশনগুলোর মোট সাইজ, ব্যবহৃত জায়গা ও অবশিষ্ট ফাঁকা স্থান মানুষের পাঠযোগ্য (GB/MB) আকারে প্রদর্শন করে। (৩) `free -m`: সার্ভারের ফিজিক্যাল RAM এবং Swap স্পেসের মোট পরিমাণ, ব্যবহৃত মেমোরি এবং বাফার/ক্যাশের পরিমাণ মেগাবাইটে তুলে ধরে।",
          "b": "htop লাইভ সিপিইউ ও মেমোরি প্রসেস দেখতে ব্যবহৃত হয়। df -h হার্ডডিস্কের ফাঁকা জায়গা দেখায় এবং free -m সার্ভারের র‍্যাম ও সোয়াপ মেমোরির ব্যবহার প্রদর্শন করে।",
          "e": "htop is an interactive process viewer displaying real-time per-core CPU and memory utilization. df -h reports disk partition space in human-readable gigabytes. free -m displays allocated, free, and cached physical RAM and swap space in megabytes.",
          "tip": "সার্ভারে লগইন করেই প্রথমে `htop`, `df -h`, এবং `free -m` রান করে সার্ভারের প্রাথমিক স্বাস্থ্য চেক করা প্রো-ইঞ্জিনিয়ারদের স্বভাব।"
        },
        {
          "lvl": "lvl2",
          "q": "Ubuntu সার্ভারে নন-রুট সুডো ইউজার (Sudo User) তৈরি করা এবং রুট লগইন ব্লক করা কেন বাধ্যতামূলক?",
          "m": "সরাসরি `root` ইউজার হিসেবে দৈনন্দিন কাজ চালানো মারাত্মক বিপজ্জনক; কোনো একটি ভুল কমান্ড (`rm -rf`) সার্ভারকে সম্পূর্ণ ধ্বংস করে দিতে পারে। এছাড়া ইন্টারনেটের সব হ্যাকার বট 'root' ইউজারনেইম টার্গেট করে আক্রমণ চালায়। বেস্ট প্র্যাকটিস: নিজের নামে একটি নতুন ইউজার বানিয়ে তাকে `sudo` গ্রুপে যুক্ত করা (`usermod -aG sudo deployer`), ওই ইউজারের জন্য SSH কি সেটআপ করা এবং `/etc/ssh/sshd_config`-এ `PermitRootLogin no` সেট করে SSH ডেমন রিস্টার্ট করা। এর ফলে রুট দিয়ে সরাসরি লগইন চিরতরে বন্ধ হয়ে যায়।",
          "b": "সরাসরি রুট ইউজার দিয়ে কাজ করা ঝুঁকিপূর্ণ। একটি নন-রুট সুডো ইউজার তৈরি করে রুট লগইন বন্ধ (PermitRootLogin no) করে দিলে ব্রুট-ফোর্স আক্রমণ পুরোপুরি প্রতিহত হয়।",
          "e": "Direct root logins expose systems to brute force and catastrophic command typos. Create a dedicated sudo user, provision SSH keys, and set PermitRootLogin no in /etc/ssh/sshd_config to permanently lock out remote root access.",
          "code": "adduser deployer\nusermod -aG sudo deployer\n# In /etc/ssh/sshd_config:\nPermitRootLogin no\nPasswordAuthentication no"
        },
        {
          "lvl": "lvl2",
          "q": "Linux Swap Memory কী এবং ২GB RAM-এর একটি ছোট VPS-এ কেন Swap Space কনফিগার করা জীবন রক্ষাকারী?",
          "m": "Swap Memory হলো সার্ভারের হার্ডডিস্কের (SSD) একটি নির্ধারিত অংশ যা ফিজিক্যাল RAM পূর্ণ হয়ে গেলে সেকেন্ডারি মেমোরি হিসেবে কাজ করে। ২GB RAM-এর সার্ভারে যখন ভারী বিল্ড প্রসেস (যেমন `npm run build` বা `next build`) চলে, তখন মেমোরি স্পাইক করে ২GB ছাড়িয়ে যায়। যদি Swap না থাকে, লিনাক্স কার্নেলের OOM Killer (Out Of Memory Killer) সাথে সাথে নোড প্রসেস বা ডাটাবেজ প্রসেসকে ক্র্যাশ করায়! ৪GB-র একটি Swap ফাইল থাকলে অতিরিক্ত মেমোরি ডিস্কে অফলোড হয়; বিল্ড সাময়িক ধীরগতির হলেও সার্ভার ক্র্যাশ হওয়া থেকে শতভাগ বেঁচে যায়।",
          "b": "সোয়াপ হলো হার্ডডিস্কের একটি অংশ যা র‍্যাম শেষ হয়ে গেলে ব্যাকআপ মেমোরি হিসেবে কাজ করে। ২GB র‍্যামের সার্ভারে নেক্সটজেএস বিল্ড বা ডাটাবেজ চলাকালীন OOM কিলার প্রসেস ক্র্যাশ হওয়া ঠেকাতে সোয়াপ মেমোরি অপরিহার্য।",
          "e": "Swap space uses storage drive space as overflow virtual memory when physical RAM saturates. On a budget 2GB VPS, running memory-intensive Next.js production builds triggers the Linux Out-Of-Memory (OOM) Killer, dropping services. A 4GB swapfile absorbs memory spikes, keeping processes alive.",
          "code": "sudo fallocate -l 4G /swapfile\nsudo chmod 600 /swapfile\nsudo mkswap /swapfile\nsudo swapon /swapfile\necho '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab"
        },
        {
          "lvl": "lvl2",
          "q": "লিনাক্সে `systemd` সার্ভিস ইউনিট ফাইল (`/etc/systemd/system/myapp.service`) কীভাবে লিখে নোড অ্যাপ রান করাবে?",
          "m": "একটি কাস্টম `.service` ফাইলে ৩টি মূল সেকশন থাকে: `[Unit]` (ডেসক্রিপশন ও ডিপেনডেন্সি যেমন নেটওয়ার্ক আপ হওয়া), `[Service]` (অ্যাপ চলার নিয়মাবলি), এবং `[Install]` (মাল্টি-ইউজার টার্গেট)। সার্ভিস ব্লকে ডিফাইন করি: `ExecStart` (অ্যাপ শুরুর কমান্ড), `WorkingDirectory` (প্রজেক্ট পাথ), `User` (নিরাপদ নন-রুট ইউজার যেমন deployer), `Restart=always` (ক্র্যাশ করলে স্বয়ংক্রিয় রিস্টার্ট), এবং `Environment` ভ্যারিয়েবল। ফাইলটি সেভ করে `systemctl daemon-reload` এবং `systemctl enable --now myapp` চালালেই অ্যাপ সার্বক্ষণিক ডেমন হিসেবে রান করে।",
          "b": "systemd সার্ভিস ফাইলে ExecStart, WorkingDirectory, নন-রুট User এবং Restart=always কনফিগার করা হয়। daemon-reload করে সার্ভিস স্টার্ট করলে অ্যাপ ক্র্যাশ করলেও স্বয়ংক্রিয়ভাবে রিস্টার্ট হয়।",
          "e": "A systemd service unit declares execution instructions under [Service]: ExecStart, WorkingDirectory, non-root User, Restart=always, and Environment files. Registering with systemctl enable --now ensures continuous auto-healing supervision.",
          "code": "[Unit]\nDescription=Dokani Backend API\nAfter=network.target\n\n[Service]\nType=simple\nUser=deployer\nWorkingDirectory=/var/www/dokani/backend\nExecStart=/usr/bin/node dist/server.js\nRestart=always\nRestartSec=5\nEnvironment=NODE_ENV=production\n\n[Install]\nWantedBy=multi-user.target"
        },
        {
          "lvl": "lvl2",
          "q": "লিনাক্সে নেটওয়ার্ক পোর্ট ট্রাবলশুটিংয়ে `netstat -tulpn` বা `ss -tulpn` এবং `lsof -i :port` কমান্ডগুলোর ব্যবহার কী?",
          "m": "যখন কোনো অ্যাপ চালু করতে গিয়ে `Error: listen EADDRINUSE :::5000` দেখায়, তখন এই কমান্ডগুলো জীবন বাঁচায়। (১) `ss -tulpn`: সার্ভারের সমস্ত ওপেন ও লিসেনিং TCP/UDP পোর্ট এবং সংশ্লিষ্ট প্রসেসের নাম ও PID দেখায়। (২) `lsof -i :5000`: সরাসরি প্রকাশ করে পোর্ট ৫০০০-এ কোন নির্দিষ্ট প্রসেসটি (PID) আটকে আছে। এরপর `kill -9 <PID>` কমান্ড চালিয়ে অবাধ্য প্রসেসটিকে বন্ধ করে পোর্ট মুক্ত করা যায়।",
          "b": "ss -tulpn বা netstat পোর্ট লিসেনিং দেখতে ব্যবহৃত হয়। lsof -i :port দিয়ে নির্দিষ্ট পোর্ট কোন প্রসেস আটকে রেখেছে তা জানা যায় এবং kill কমান্ড দিয়ে পোর্ট খালি করা যায়।",
          "e": "ss -tulpn and netstat display all active listening TCP/UDP sockets with process PIDs. When resolving EADDRINUSE errors, lsof -i :PORT reveals the exact process PID binding the port, allowing targeted termination via kill -9 <PID>.",
          "code": "sudo ss -tulpn | grep 5000\nsudo lsof -i :5000\nsudo kill -9 12345"
        },
        {
          "lvl": "lvl2",
          "q": "Ubuntu সার্ভারে অটোমেটেড লগ রোটেশন (`logrotate`) কেন আবশ্যক এবং কীভাবে কনফিগার করা হয়?",
          "m": "যদি কোনো অ্যাপ্লিকেশন বা Nginx লগ ফাইলে অবিরাম লগ লিখতে থাকে, তবে কয়েক মাসের মধ্যে সেই লগ ফাইল ২০-৩০ গিগাবাইট হয়ে পুরো সার্ভারের হার্ডডিস্ক পূর্ণ করে সার্ভার ডাউন করে দেবে! `logrotate` হলো একটি লিনাক্স ইউটিলিটি যা স্বয়ংক্রিয়ভাবে লগ ফাইলগুলোকে দৈনিক বা সাপ্তাহিক ভিত্তিতে ভাগ করে, কম্প্রেস (`gzip`) করে এবং নির্দিষ্ট দিন (যেমন ১৪ দিন) পর পুরনো লগ মুছে ফেলে। এটি `/etc/logrotate.d/myapp` কনফিগে ডিফাইন করা হয়।",
          "b": "লগ ফাইল যাতে বড় হয়ে ডিস্ক ভর্তি করে সার্ভার ক্র্যাশ না করায় সেজন্য logrotate ব্যবহৃত হয়। এটি নির্দিষ্ট সময় পর পর লগ ফাইল জিপ করে সংরক্ষণ করে এবং অতি পুরনো ফাইল স্বয়ংক্রিয়ভাবে মুছে ডিস্ক ফাঁকা রাখে।",
          "e": "Unchecked log files expand indefinitely until exhausting disk storage. logrotate runs daily via cron to rotate, compress (.gz), truncate, and purge aged logs according to policy directives in /etc/logrotate.d/.",
          "code": "/var/log/dokani/*.log {\n  daily\n  rotate 14\n  compress\n  delaycompress\n  missingok\n  notifempty\n  create 0640 deployer deployer\n}"
        },
        {
          "lvl": "lvl3",
          "q": "Linux ও কার্নেল টিউনিং: হাই-কনকারেন্সি ওয়েব সার্ভারের জন্য `ulimit` (File Descriptors) এবং `sysctl` নেটওয়ার্ক অপটিমাইজেশন কীভাবে সাজাবে?",
          "m": "ডিফল্ট লিনাক্সে একটি প্রসেসের জন্য ওপেন ফাইল লিমিট থাকে মাত্র ১০২৪টি (`ulimit -n`)। প্রতিটি নেটওয়ার্ক সকেট কানেকশন হলো একটি ফাইল ডেসক্রিপ্টর; ফলে ১০২৪ জনের বেশি ইউজার কানেক্ট করলেই `Too many open files` এরর দিয়ে সার্ভার আটকে যায়। অপটিমাইজেশন: (১) `/etc/security/limits.conf`-এ `nofile` লিমিট বাড়িয়ে ৬৫৫৩৫ করা। (২) `/etc/sysctl.conf`-এ কার্নেল নেটওয়ার্ক প্যারামিটার টিউন করা: `net.core.somaxconn = 65535` (কানেকশন ব্যাকলগ বাড়ানো), `net.ipv4.tcp_tw_reuse = 1` (টাইম-ওয়েট সকেট রিসাইকেল করা), এবং `fs.file-max = 2097152`।",
          "b": "ডিফল্ট ফাইল ডেসক্রিপ্টর লিমিট ১০২৪ হওয়ায় বেশি ইউজার এলে সকেট এরর ঘটে। limits.conf এ nofile লিমিট ৬৫৫৩৫ এ বাড়ানো এবং sysctl দিয়ে somaxconn ও tcp_tw_reuse টিউন করে হাজার হাজার কনকারেন্ট কানেকশন হ্যান্ডেল করা যায়।",
          "e": "Linux defaults cap open file descriptors to 1024 (ulimit -n), causing 'Too many open files' socket exhaustion under load. Elevate limits to 65535 in limits.conf, and optimize kernel networking in /etc/sysctl.conf via net.core.somaxconn=65535 and net.ipv4.tcp_tw_reuse=1.",
          "code": "# /etc/security/limits.conf\n* soft nofile 65535\n* hard nofile 65535\n# Apply sysctl:\nsudo sysctl -p"
        },
        {
          "lvl": "lvl3",
          "q": "Ubuntu সার্ভারে Fail2ban কীভাবে স্বয়ংক্রিয় ব্রুট-ফোর্স আইপি ব্লকিং ও জেইল (Jail) কনফিগার করে?",
          "m": "`Fail2ban` হলো একটি ইন্ট্রুশন প্রিভেনশন ফ্রেমওয়ার্ক যা লিনাক্স লগ ফাইলগুলো (যেমন `/var/log/auth.log`) প্রতিনিয়ত স্ক্যান করে। যদি কোনো আইপি অ্যাড্রেস থেকে নির্দিষ্ট সময়ের মধ্যে (যেমন ১০ মিনিটে) ৫ বার ভুল পাসওয়ার্ড বা ম্যালিশিয়াস রিকোয়েস্ট আসে, Fail2ban তাৎক্ষণিকভাবে লিনাক্স ফায়ারওয়াল (UFW/iptables)-এ একটি রুল যোগ করে ওই আইপি-কে ২৪ ঘণ্টার জন্য সম্পূর্ণ ড্রপ বা ব্যান করে দেয় (`banAction = ufw`)। এটি SSH ও Nginx উভয় সার্ভারকে বটনেট আক্রমণ থেকে সুরক্ষিত রাখে।",
          "b": "Fail2ban সার্ভার লগ পর্যবেক্ষণ করে ৫ বার ভুল পাসওয়ার্ড দেওয়া আক্রমণকারী আইপিগুলোকে স্বয়ংক্রিয়ভাবে ফায়ারওয়ালে ব্যান করে দেয়। এটি বট ও ব্রুট-ফোর্স আক্রমণ পুরোপুরি নস্যাৎ করে।",
          "e": "Fail2ban monitors authentication logs for malicious patterns. When an IP exceeds maxretry thresholds within findtime, Fail2ban injects kernel-level firewall rules dropping all packets from that IP for a configurable bantime duration.",
          "code": "# /etc/fail2ban/jail.local:\n[sshd]\nenabled = true\nport = 22\nmaxretry = 5\nfindtime = 600\nbantime = 86400"
        },
        {
          "lvl": "lvl3",
          "q": "Linux Cron Jobs (`crontab -e`) কীভাবে কাজ করে এবং ডেটাবেজ ব্যাকআপ ও ক্লিনিংয়ের জন্য নির্ভরযোগ্য ক্রন এক্সপ্রেশন কীভাবে লিখবে?",
          "m": "Cron হলো লিনাক্সের টাইম-বেসড টাস্ক শিডিউলার। এর ফরম্যাটে ৫টি ফিল্ড থাকে: `মিনিট ঘন্টা দিন মাস বার` (`* * * * *`)। নির্ভরযোগ্য স্ক্রিপ্ট লেখার নিয়ম: (১) ক্রন জবে সবসময় পরম পাথ (Absolute Paths) ব্যবহার করতে হবে (যেমন `/usr/bin/node` বা `/bin/bash`), কারণ ক্রন ডিফল্ট ইউজারের শেল এনভায়রনমেন্ট পায় না। (২) আউটপুট ও এরর লগ ফাইলে রিডাইরেক্ট করতে হবে (`>> /var/log/backup.log 2>&1`)। উদাহরণ: প্রতিদিন রাত ৩:৩০ মিনিটে ব্যাকআপ স্ক্রিপ্ট রান করার কমান্ড: `30 3 * * * /var/scripts/db_backup.sh >> /var/log/db_backup.log 2>&1`।",
          "b": "ক্রন হলো লিনাক্সের সময়ভিত্তিক টাস্ক শিডিউলার। ৫টি ফিল্ডের মাধ্যমে সময় নির্ধারণ করা হয়। ক্রন জবে সর্বদা অ্যাবসোলিউট পাথ ব্যবহার করতে হয় এবং এরর ট্র্যাক করার জন্য আউটপুট লগ ফাইলে রিডাইরেক্ট করতে হয়।",
          "e": "Linux cron automates scheduled jobs via 5 temporal fields: minute, hour, day-of-month, month, day-of-week. Robust cron scripts must use explicit absolute binary paths (/usr/bin/pg_dump) and pipe combined stdout/stderr to a log file for traceability.",
          "code": "# Daily at 03:30 AM:\n30 3 * * * /usr/local/bin/backup-dokani.sh >> /var/log/dokani-backup.log 2>&1"
        },
        {
          "lvl": "lvl3",
          "q": "Ubuntu সার্ভারে автоматизирован সিকিউরিটি প্যাচিং (`unattended-upgrades`) কীভাবে জিরো-ডাউনটাইমে কনফিগার করবে?",
          "m": "লিনাক্স কার্নেল ও প্যাকেজগুলোতে নিয়মিত সিকিউরিটি ভালনারেবিলিটি বের হয়। ম্যানুয়ালি প্রতিদিন সার্ভার আপডেট করা অসম্ভব। আমরা `unattended-upgrades` প্যাকেজ কনফিগার করি যা প্রতিদিন মধ্যরাতে স্বয়ংক্রিয়ভাবে ক্রিটিক্যাল সিকিউরিটি প্যাচগুলো ডাউনলোড ও ইনস্টল করে। এটি সাধারণ অ্যাপ্লিকেশন প্যাকেজ হাত দেয় না, শুধুমাত্র সিকিউরিটি আপডেটগুলো অ্যাপ্লাই করে। প্রয়োজনে কার্নেল আপডেটের জন্য অটো-রিবুট শিডিউল রাত ৪টায় সেট করা যায় (`Automatic-Reboot-Time \"04:00\"`) যাতে ব্যবসায়িক ট্রাফিকে কোনো বিঘ্ন না ঘটে।",
          "b": "unattended-upgrades প্রতিদিন মধ্যরাতে স্বয়ংক্রিয়ভাবে ক্রিটিক্যাল সিকিউরিটি প্যাচ ইনস্টল করে সার্ভারকে সুরক্ষিত রাখে। এটি সার্ভিস ব্যাহত না করে শুধুমাত্র নিরাপত্তার ঝুঁকিগুলো দূর করে।",
          "e": "unattended-upgrades automates the unattended installation of critical security patches from official Ubuntu repositories. Restricting upgrades strictly to security releases mitigates instability while eliminating zero-day OS vulnerabilities.",
          "code": "sudo apt install unattended-upgrades\nsudo dpkg-reconfigure --priority=low unattended-upgrades"
        },
        {
          "lvl": "lvl3",
          "q": "লিনাক্স পারফরম্যান্স বোতলনেক ডিটেকশনে 'USE Method' (Utilization, Saturation, Errors) কীভাবে প্রয়োগ করবে?",
          "m": "ব্রেন্ডন গ্রেগ-এর 'USE Method' হলো সিস্টেম অ্যানালাইসিসের প্রো-স্ট্যান্ডার্ড: (১) `Utilization`: রিসোর্স কতটা ব্যস্ত (যেমন `top`, `vmstat`, `iostat -xz 1` দিয়ে ডিস্ক ব্যবহার দেখা)। (২) `Saturation`: অতিরিক্ত কাজের চাপে রিসোর্স কিউতে জট পেকেছে কি না (যেমন `uptime`-এর লোড এভারেজ দেখা—সিপিইউ কোরের চেয়ে লোড বেশি কি না, এবং মেমোরির ক্ষেত্রে সোয়াপিং হচ্ছে কি না)। (৩) `Errors`: হার্ডওয়্যার বা নেটওয়ার্ক ডিভাইসে কোনো ড্রপ বা এরর পড়ছে কি না (`dmesg -T`, `netstat -s`, `/var/log/syslog`)। এই মেথড ফলো করলে ৫ মিনিটের মধ্যে যেকোনো সিস্টেম স্লোডাউনের মূল কারণ নিশ্চিত হওয়া যায়।",
          "b": "ইউজ মেথডে তিনটি জিনিস পরীক্ষা করা হয়: ইউটিলাইজেশন (রিসোর্স কতটা ব্যবহৃত), স্যাচুরেশন (কাজের কিউ জমে জ্যাম হয়েছে কিনা), এবং এররস (সিস্টেমে কোনো ফল্ট লগ আছে কিনা)। এটি দ্রুততম সময়ে সার্ভার সমস্যা চিহ্নিত করে।",
          "e": "Brendan Gregg's USE Method audits system hardware bottlenecks: Utilization (percentage of time resource was busy via iostat, top), Saturation (queue depth of pending work via load averages, vmstat), and Errors (hardware/packet fault logs via dmesg, netstat).",
          "tip": "বলো: 'We follow Brendan Gregg's USE Method to methodically isolate Utilization, Saturation, and Errors.'"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: প্রোডাকশন উবুন্টু সার্ভারের ডিস্ক স্পেস ১০০% ফুল হয়ে গেছে! কোনো এডিটর (`nano`) বা ফাইল ওপেন হচ্ছে না, ডেটাবেজ ক্র্যাশ করেছে। তাৎক্ষণিকভাবে সার্ভার রিকভার করার ধাপগুলো কী?",
          "m": "ইমার্জেন্সি রেসকিউ স্টেপস: (১) কোনো নতুন ফাইল তৈরি করার চেষ্টা করা যাবে না কারণ ডিস্ক ০ বাইট। (২) বড় সাইজের লগ ফাইল খুঁজে বের করতে হবে: `sudo find /var/log -type f -size +500M`। (৩) ফাইল সরাসরি `rm` দিয়ে ডিলিট করা যাবে না যদি কোনো প্রসেস ফাইলটি ওপেন রাখে (কারণ লিনাক্সে ওপেন ফাইল ডিলিট করলেও ডিস্ক স্পেস রিলিজ হয় না)! এর বদলে ফাইল ট্রাঙ্কেট (শূন্য) করতে হবে: `sudo truncate -s 0 /var/log/nginx/access.log` বা `> /var/log/syslog`। (৪) সাথে সাথে গিগাবাইট ফাঁকা হবে; তখন ক্র্যাশ করা সার্ভিসগুলো রিস্টার্ট করে পার্মানেন্ট লগরোটেট কনফিগার করব।",
          "b": "ডিস্ক ১০০% ফুল হলে ফাইল ডিলিট না করে truncate -s 0 কমান্ড দিয়ে বড় লগ ফাইলের সাইজ শূন্য করে তাৎক্ষণিক ডিস্ক ফাঁকা করতে হবে। এরপর সার্ভিস রিস্টার্ট দিয়ে স্থায়ীভাবে লগরোটেট ঠিক করতে হবে।",
          "e": "Do not simply rm large files held open by running processes, as Linux retains disk blocks until the file descriptor closes. Identify runaway logs using find /var/log -size +500M and zero them instantly using truncate -s 0 /path/to/log. Reclaim disk space and restart failed services.",
          "code": "sudo find /var/log -type f -size +100M\nsudo truncate -s 0 /var/log/syslog\nsudo systemctl restart postgresql"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: একজন জুনিয়র ডেভেলপার সার্ভারে কাজ করতে গিয়ে ভুলবশত `chmod -R 777 /var/www` চালিয়ে দিয়েছে! কেন এটি মারাত্মক সিকিউরিটি ঝুঁকি এবং কীভাবে সঠিক পারমিশনে ফিরিয়ে আনবে?",
          "m": "মারাত্মক ঝুঁকি: ৭77 পারমিশন দেওয়ার মানে হলো ইন্টারনেটের যেকোনো সাধারণ ইউজার বা আপলোড করা ম্যালিশিয়াস পিএইচপি/জেএস স্ক্রিপ্ট আপনার `.env` ফাইলের ডাটাবেজ পাসওয়ার্ড পড়ে ফেলতে পারবে এবং এক্সিকিউট করতে পারবে! পুনরুদ্ধার: (১) সমস্ত ডিরেক্টরিকে 755 পারমিশন দিতে হবে: `find /var/www -type d -exec chmod 755 {} +`, (২) সমস্ত ফাইলকে 644 পারমিশন দিতে হবে: `find /var/www -type f -exec chmod 644 {} +`, (৩) অতি সংবেদনশীল `.env` ফাইলকে কঠোর 600 পারমিশন দিতে হবে: `chmod 600 /var/www/dokani/.env` (যাতে শুধু ফাইলের মালিক ছাড়া কেউ পড়তে না পারে)।",
          "b": "৭৭৭ দিলে যেকোনো হ্যাকার .env ফাইলের সিক্রেট পড়ে ফেলতে পারে। find কমান্ড দিয়ে ডিরেক্টরিগুলোকে ৭৫৫, সাধারণ ফাইলগুলোকে ৬৪৪ এবং .env ফাইলকে কঠোর ৬০০ পারমিশন দিয়ে নিরাপদ অবস্থায় ফিরিয়ে আনতে হবে।",
          "e": "chmod 777 exposes environmental secrets to world-readable execution. Remediate immediately by recursively batch-resetting directories to 755, standard files to 644, and locking the sensitive .env strictly to 600.",
          "code": "sudo find /var/www/dokani -type d -exec chmod 755 {} +\nsudo find /var/www/dokani -type f -exec chmod 644 {} +\nsudo chmod 600 /var/www/dokani/.env"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: কোনো অ্যাপ্লিকেশন আপডেট করার পর নোড সার্ভার ক্র্যাশ করেছে এবং পোর্ট ৩০শেকেন্ড ধরে বন্ধ। `systemctl status myapp` দেখাচ্ছে `code=exited, status=1/FAILURE`। আসল এরর স্ট্যাক ট্রেস কোথায় এবং কীভাবে দেখবে?",
          "m": "লিনাক্স `systemd` সার্ভিসের সমস্ত আউটপুট ও এরর `journald` লগে সংরক্ষিত হয়। দেখার কমান্ড: `journalctl -u myapp.service -n 100 --no-pager` (সর্বশেষ ১০০ লাইনের লগ পেজার ছাড়া প্রদর্শন করবে)। লাইভ এরর ফলো করার জন্য: `journalctl -u myapp.service -f`। এই লগ থেকে সরাসরি দেখতে পাব সিনট্যাক্স এরর, মিসিং মডিউল বা কোনো এনভায়রনমেন্ট ভ্যারিয়েবলের কারণে অ্যাপ ক্র্যাশ করেছে কি না।",
          "b": "systemd সার্ভিসের এরর দেখতে journalctl -u myapp.service -n 100 কমান্ড চালাতে হয়। -f ফ্ল্যাগ দিয়ে লাইভ লগ পর্যবেক্ষণ করে ক্র্যাশের মূল কারণ তাৎক্ষণিকভাবে শনাক্ত করা যায়।",
          "e": "Inspect systemd service failure stack traces via journalctl -u myapp.service -n 100 --no-pager. Adding -f streams real-time console stdout/stderr logs, revealing missing environment secrets or uncaught Node.js exceptions.",
          "code": "sudo journalctl -u dokani-backend.service -n 100 --no-pager\nsudo journalctl -u dokani-backend.service -f"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: কোনো একটি আননোন প্রসেস সার্ভারের ১০০% সিপিইউ খেয়ে বসে আছে এবং SSH টার্মিনাল চরম ল্যাগ করছে। কীভাবে প্রসেসটি খুঁজে বের করবে এবং সেফলি টার্মিনেট করবে?",
          "m": "পদক্ষেপ: (১) টার্মিনালে `top` বা `htop` চালিয়ে `P` (সর্ট বাই সিপিইউ) চাপব অথবা রুট থেকে কমান্ড দেব: `ps aux --sort=-%cpu | head -n 5`—যা টপ সিপিইউ ব্যবহারকারী প্রসেসের নাম, ইউজার ও PID দেখিয়ে দেবে। (২) প্রথমে প্রসেসটিকে ভদ্রভাবে বন্ধ করার জন্য SIGTERM পাঠাব: `kill -15 <PID>` (যাতে প্রসেসটি নিজের ফাইল ও সকেট ক্লিন করতে পারে)। (৩) যদি ৫ সেকেন্ডেও প্রসেসটি রেসপন্স না করে, তবে ফোর্সফুল কিল করব: `kill -9 <PID>`। এরপর প্রসেসের বাইনারি পাথ পরীক্ষা করব এটি কোনো ম্যালওয়্যার বা ক্রিপ্টো-মাইনার কি না।",
          "b": "ps aux --sort=-%cpu চালিয়ে শীর্ষ প্রসেসের PID বের করব। kill -15 দিয়ে প্রসেসটি ভদ্রভাবে রিলিজ করার চেষ্টা করব এবং ব্যর্থ হলে kill -9 দিয়ে তাৎক্ষণিক বন্ধ করব।",
          "e": "Identify the runaway process using ps aux --sort=-%cpu | head -n 5. Issue a graceful SIGTERM (kill -15 <PID>) allowing file handle cleanup. If unresponsive, issue SIGKILL (kill -9 <PID>) and inspect the executable path via ls -l /proc/<PID>/exe to audit for cryptomining malware.",
          "code": "ps aux --sort=-%cpu | head -n 6\nsudo kill -15 <PID>\n# If still stuck:\nsudo kill -9 <PID>"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: তুমি নতুন একটি ক্লাউড VPS সেটআপ করছ এবং ভুলে SSH পোর্ট পরিবর্তন করার পর ফায়ারওয়াল অন করায় নিজের SSH সেশন ডিসকানেক্ট হয়ে গেছে এবং নতুন করে লগইন করা যাচ্ছে না! কীভাবে রিকভার করবে?",
          "m": "সমস্যা: নতুন SSH পোর্ট UFW ফায়ারওয়ালে এলাউ না করেই ফায়ারওয়াল অন করা হয়েছে। রিকভারি: (১) ক্লাউড প্রোভাইডারের ড্যাশবোর্ডে (DigitalOcean / Hetzner / AWS) লগইন করব। (২) ড্যাশবোর্ডের ওয়েব-বেসড 'VNC Console' বা 'Recovery Web Terminal'-এ ঢুকব (কারণ VNC কনসোল নেটওয়ার্ক ফায়ারওয়াল বাইপাস করে সরাসরি হার্ডওয়্যার সকেটে এক্সেস দেয়)। (৩) কনসোলে রুট ইউজার ও পাসওয়ার্ড দিয়ে লগইন করে ফায়ারওয়ালে পোর্ট ওপেন করব: `ufw allow <NEW_PORT>/tcp` অথবা `ufw reload` চালাব। সাথে সাথে লোকাল টার্মিনাল থেকে SSH পুনরায় কানেক্ট করা যাবে।",
          "b": "ক্লাউড ড্যাশবোর্ডের VNC Web Console-এ ঢুকে সরাসরি হার্ডওয়্যার সকেট থেকে লগইন করব। এরপর ufw allow <port> কমান্ড দিয়ে ফায়ারওয়ালে পোর্ট এলাউ করলেই SSH আবার চালু হবে।",
          "e": "Bypassing a firewall lockout requires accessing the cloud hosting provider's browser-based VNC Emergency Console (DigitalOcean Console / AWS serial console). Authenticate directly at the kernel console and execute sudo ufw allow <NEW_PORT>/tcp.",
          "tip": "ইন্টারভিউতে 'Access the out-of-band VNC Web Console from the Cloud Provider dashboard' উল্লেখ করবে।"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা (Dokani SaaS): Dokani-র প্রোডাকশন উবুন্টু VPS সার্ভারের ইনিশিয়াল হার্ডেনিং ও প্রোডাকশন প্রিপারেশন কীভাবে সম্পন্ন করা হয়েছিল?",
          "m": "দোকানির ক্লাউড ড্রপলেটে একটি কঠোর প্রোডাকশন হার্ডেনিং রানবুক অনুসরণ করা হয়েছে: (১) `deployer` নামে ডেডিকেটেড নন-রুট সুডো ইউজার তৈরি ও এড২৫৫১৯ SSH কি ইনজেক্ট করা, (২) SSH কনফিগে `PermitRootLogin no` এবং `PasswordAuthentication no` বাধ্য করা, (৩) UFW দিয়ে শুধু ২২, ৮০ ও ৪৪৩ পোর্ট বাদে অভ্যন্তরীণ সব ডাটাবেজ পোর্ট বন্ধ করা, (৪) ৪GB Swap ফাইল তৈরি করে OOM ক্র্যাশ প্রতিরোধ করা, (৫) Fail2ban দিয়ে SSH ও ওয়েব লেয়ারে ব্রুট-ফোর্স প্রটেকশন দেওয়া, এবং (৬) logrotate দিয়ে লগ ড্রাইভ ক্লিন রাখা। এর ফলে সার্ভারটি সম্পূর্ণ স্থিতিশীল ও হ্যাকার-প্রতিরোধী হয়েছে।",
          "b": "দোকানি সার্ভার হার্ডেনিংয়ে নন-রুট সুডো ইউজার, এসএসএইচ কি অথেনটিকেশন, রুট লগইন ব্লক, UFW ফায়ারওয়াল, ৪GB সোয়াপ ফাইল, Fail2ban এবং লগরোটেট কনফিগার করে এন্টারপ্রাইজ নিরাপত্তা নিশ্চিত করা হয়েছিল।",
          "e": "Dokani production Ubuntu droplets undergo systematic hardening: provisioning dedicated non-root sudo accounts, enforcing Ed25519 SSH keys while disabling password/root logins, locking UFW down to 22/80/443, activating 4GB swap files, standing up Fail2ban jails, and scheduling automated logrotate rules.",
          "tip": "দোকানির এই প্রোডাকশন সার্ভার হার্ডেনিং চেকলিস্ট ইন্টারভিউয়ারকে তোমার বাস্তব ডেভঅপস সক্ষমতা প্রমাণ করে দেবে।"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: জিরো-ডাউনটাইম ডিপ্লয়মেন্টের জন্য ব্যাশ অটোমেশন স্ক্রিপ্ট (`deploy.sh`) কীভাবে তৈরি করবে?",
          "m": "একটি প্রোডাকশন ব্যাশ ডিপ্লয় স্ক্রিপ্টে `set -e` (কোনো কমান্ড ফেইল করলে তৎক্ষণাৎ স্ক্রিপ্ট বন্ধ করা) ব্যবহার করা হয়। ধাপসমূহ: (১) গিটহাব থেকে লেটেস্ট কোড পুল করা (`git pull origin main`), (২) নতুন প্যাকেজ ইনস্টল করা (`npm ci`), (৩) ডেটাবেজ মাইগ্রেশন চালানো (`npx prisma migrate deploy`), (৪) প্রোডাকশন বিল্ড তৈরি করা (`npm run build`), (৫) PM2 বা systemd দিয়ে জিরো-ডাউনটাইম রিলোড দেওয়া (`pm2 reload all`), (৬) সফল ডিপ্লয়মেন্টের পর স্ল্যাক বা টেলিগ্রামে নোটিফিকেশন পাঠানো।",
          "b": "deploy.sh স্ক্রিপ্টে git pull, npm ci, prisma migrate deploy, npm run build এবং pm2 reload all ক্রমানুসারে স্বয়ংক্রিয়ভাবে এক্সিকিউট করা হয়। set -e ফ্ল্যাগ দিয়ে যেকোনো ত্রুটিতে ডিপ্লয়মেন্ট নিরাপদভাবে থামানো হয়।",
          "e": "A zero-downtime deploy.sh script runs with set -e to halt on first error: pulling Git main, installing dependencies with npm ci, deploying database migrations, executing production builds, and invoking zero-downtime process reloads via pm2 reload all.",
          "code": "#!/usr/bin/env bash\nset -euo pipefail\ncd /var/www/dokani\ngit pull origin main\nnpm ci\nnpx prisma migrate deploy\nnpm run build\npm2 reload ecosystem.config.js --update-env\necho 'Deploy successful!'"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: Linux Bash Shell স্ক্রিপ্টিং দিয়ে অটোমেটেড ডেটাবেজ ব্যাকআপ ও S3 আপলোড পাইপলাইন কীভাবে তৈরি করবে?",
          "m": "আমরা একটি ক্রন-এক্সিকিউটেড ব্যাশ স্ক্রিপ্ট তৈরি করি: (১) টাইমস্ট্যাম্পযুক্ত ফাইলের নাম তৈরি করি (`BACKUP_NAME=\"dokani_$(date +%Y%m%d_%H%M%S).dump\"`), (২) `pg_dump -Fc` দিয়ে কম্প্রেসড বাইনারি ডাম্প তৈরি করি, (৩) AWS CLI দিয়ে ফাইলটি এস৩ বাকেটে আপলোড করি (`aws s3 cp ...`), (৪) আপলোড সফল হলে লোকাল সার্ভার থেকে সাময়িক ডাম্প ফাইল মুছে দিই, (৫) এস৩ লাইফসাইকেল রুলসে ৩০ দিনের পুরনো ব্যাকআপ স্বয়ংক্রিয়ভাবে মুছে দেওয়ার পলিসি রাখি। কোনো কারণে স্ক্রিপ্ট ফেইল করলে স্ল্যাক ওয়েবহুকে এলার্ট যায়।",
          "b": "ব্যাশ স্ক্রিপ্ট দিয়ে টাইমস্ট্যাম্পযুক্ত pg_dump তৈরি করে AWS S3-তে পুশ করা হয় এবং লোকাল ফাইল ডিলিট করে ডিস্ক ফাঁকা রাখা হয়। স্ক্রিপ্ট ব্যর্থ হলে স্ল্যাকে তাৎক্ষণিক নোটিফিকেশন পাঠানো হয়।",
          "e": "Automated backup scripts generate timestamped pg_dump binaries, stream payloads to AWS S3 via aws-cli, purge transient local artifacts, and ping an uptime heartbeat monitor to verify daily completion.",
          "code": "#!/bin/bash\nTIMESTAMP=$(date +%Y%m%d_%H%M%S)\nFILE=\"/tmp/db_${TIMESTAMP}.dump\"\npg_dump -Fc -U postgres dokani_prod > \"$FILE\"\naws s3 cp \"$FILE\" s3://dokani-vault/backups/\nrm -f \"$FILE\""
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: প্রোডাকশন ডেটাবেজ বা সার্ভার স্টোরেজে 'Inodes Exhaustion' কী এবং কীভাবে সমাধান করবে?",
          "m": "লিনাক্সে প্রতিটি ফাইল বা ডিরেক্টরির জন্য একটি 'Inode' (মেটাডেটা পয়েন্টার) থাকে। আপনি `df -h` দিয়ে দেখলেন ডিস্কে ২০GB ফাঁকা আছে, কিন্তু অ্যাপ নতুন কোনো ফাইল বা সেশন লিখতে পারছে না এবং `No space left on device` এরর দিচ্ছে! কারণ: ইনোড শেষ হয়ে গেছে (`df -i` দেখাচ্ছে Inodes 100%)! এটি ঘটে যখন লাখ লাখ ক্ষুদ্র ফাইল (যেমন ফ্রেমওয়ার্কের আন-ক্লিনড সেশন ফাইল বা ক্যাশ ডিরেক্টরি) তৈরি হয়। সমাধান: `sudo find /tmp -type f -name 'sess_*' -delete` কমান্ড চালিয়ে অপ্রয়োজনীয় লাখ লাখ ক্ষুদ্র ফাইল ব্যাচ আকারে মুছে ইনোড রিলিজ করা।",
          "b": "ডিস্কে জায়গা থাকা সত্ত্বেও লক্ষ লক্ষ ক্ষুদ্র ক্যাশ বা সেশন ফাইল জমার কারণে ইনোড পূর্ণ (df -i 100%) হয়ে সিস্টেম আটকে যায়। অপ্রয়োজনীয় টেম্পোরারি ফাইলগুলো মুছে ইনোড ফাঁকা করে সিস্টেম উদ্ধার করা হয়।",
          "e": "Inode exhaustion occurs when millions of micro-files (e.g. uncollected PHP/Node session files) consume all filesystem metadata index nodes even though gigabytes of storage remain. Diagnose with df -i and purge orphaned temp files via find /tmp -type f -delete.",
          "code": "df -i # Check inode usage\n# Find directories hoarding millions of files:\nfind / -xdev -printf '%h\\n' | sort | uniq -c | sort -k 1 -n | tail -10"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: লিনাক্স সার্ভার মাইগ্রেশন: সম্পূর্ণ ডেটা ও কনফিগারেশন এক VPS থেকে অন্য VPS-এ স্থানান্তর করতে `rsync` কীভাবে ব্যবহার করবে?",
          "m": "`rsync` হলো লিনাক্সে ডেটা স্থানান্তরের সবচেয়ে নির্ভরযোগ্য ও দ্রুততম টুল। সুবিধা: এটি শুধুমাত্র ফাইল কপি করে না, বরং পারমিশন, ওনারশিপ, টাইমস্ট্যাম্প ও সিম্বলিক লিঙ্ক হুবহু বজায় রাখে এবং মাঝে কানেকশন কাটলে বাকি অংশ থেকে পুনরায় শুরু করতে পারে। কমান্ড: `rsync -avzP --exclude 'node_modules' /var/www/dokani deployer@new-server-ip:/var/www/dokani` (`-a`: আর্কাইভ মোড পারমিশন সহ, `-v`: বিস্তারিত লগ, `-z`: নেটওয়ার্ক কম্প্রেশন, `-P`: প্রোগ্রেস বার ও রেজুমেবিলিটি)। মাত্র কয়েক মিনিটে গিগাবাইট ডেটা নিখুঁতভাবে নতুন সার্ভারে কপি হয়ে যায়।",
          "b": "rsync দিয়ে এক সার্ভার থেকে অন্য সার্ভারে হুবহু পারমিশন ও সিম্বলিক লিঙ্ক বজায় রেখে অতি দ্রুত ডেটা কপি করা যায়। নেটওয়ার্ক কম্প্রেশন ও অটো-রেজ্যুম সুবিধার কারণে এটি সার্ভার মাইগ্রেশনের সেরা টুল।",
          "e": "rsync migrates file trees between servers while preserving permissions, symlinks, and timestamps. Use rsync -avzP --exclude 'node_modules' /src/ user@new-host:/dest/ for delta transfers with on-the-fly network compression and interrupted transfer resume.",
          "code": "rsync -avzP --exclude 'node_modules' --exclude '.git' \\\n  /var/www/dokani/ deployer@192.168.1.50:/var/www/dokani/"
        }
      ]
    },
    {
      "id": "docker-containerization",
      "name": "Docker & Container Architecture",
      "desc": "Dockerfiles, Multi-Stage Builds, Docker Compose, Volumes, Bridge Networks, Container Security (Non-root), Healthchecks",
      "items": [
        {
          "lvl": "lvl1",
          "q": "Docker কী এবং Container বনাম Virtual Machine (VM)-এর মধ্যে মূল পার্থক্য কী?",
          "m": "Docker হলো একটি ওপেন-সোর্স কন্টেইনারাইজেশন প্ল্যাটফর্ম যা অ্যাপ্লিকেশন এবং তার সমস্ত ডিপেনডেন্সি ও কনফিগারেশনকে একটি লাইটওয়েট পোর্টেবল কন্টেইনারে প্যাকেজ করে। (১) `Virtual Machine (VM)`: একটি সম্পূর্ণ গেস্ট অপারেটিং সিস্টেম (Guest OS) এবং হাইপারভাইজর রান করে, ফলে বুট হতে কয়েক মিনিট সময় নেয় এবং গিগাবাইট র‍্যাম ও ডিস্ক খরচ করে। (২) `Docker Container`: হোস্ট লিনাক্স কার্নেল শেয়ার করে এবং লিনাক্স `Namespaces` ও `cgroups` দিয়ে আইসোলেটেড প্রসেস হিসেবে চলে। এটি মাত্র কয়েক মেগাবাইট র‍্যাম নেয় এবং মিলিসেকেন্ডে চালু হয়। 'আমার মেশিনে চলে কিন্তু সার্ভারে চলে না' সমস্যা ডকার চিরতরে সমাধান করেছে।",
          "b": "ডকার অ্যাপ্লিকেশনকে সমস্ত ডিপেনডেন্সি সহ কন্টেইনারে প্যাকেজ করে। ভার্চুয়াল মেশিন সম্পূর্ণ আলাদা অপারেটিং সিস্টেম চালায় যা ভারী, আর ডকার কন্টেইনার হোস্ট কার্নেল শেয়ার করে মাত্র কয়েক মেগাবাইটে অতি দ্রুত রান করে।",
          "e": "Docker containerizes applications with their dependencies. Unlike Virtual Machines that run redundant Guest OS instances over a hypervisor consuming gigabytes of memory, Docker containers share the host Linux kernel via namespaces and cgroups, booting in milliseconds with minimal overhead.",
          "tip": "বলো: 'Containers share the host kernel via cgroups and namespaces, unlike VMs which run full guest OS stacks.'"
        },
        {
          "lvl": "lvl1",
          "q": "Dockerfile-এ `CMD` এবং `ENTRYPOINT`-এর মধ্যে পার্থক্য কী?",
          "m": "(১) `ENTRYPOINT`: কন্টেইনারটি বুট হলে কোন মূল এক্সিকিউটেবল কমান্ডটি চলবে তা নির্দিষ্ট করে (এটি পরিবর্তন করা কঠিন)। যেমন: `ENTRYPOINT [\"node\", \"dist/server.js\"]`। (২) `CMD`: এন্ট্রি-পয়েন্টের জন্য ডিফল্ট আর্গুমেন্ট সরবরাহ করে অথবা কোনো এন্ট্রি-পয়েন্ট না থাকলে ডিফল্ট কমান্ড চালায়। সবচেয়ে বড় পার্থক্য: `docker run myimage arg1` কমান্ডে অতিরিক্ত আর্গুমেন্ট পাস করলে `CMD` ওভাররাইট হয়ে যায়, কিন্তু `ENTRYPOINT` ওভাররাইট হয় না—বরং অতিরিক্ত আর্গুমেন্টগুলো এন্ট্রি-পয়েন্টের সাথে যুক্ত হয়ে যায়।",
          "b": "ENTRYPOINT কন্টেইনারের অপরিবর্তনযোগ্য প্রধান কমান্ড নির্দেশ করে। CMD ডিফল্ট প্যারামিটার দেয় যা docker run কমান্ডের সময় ক্লায়েন্ট প্যারামিটার দিয়ে ওভাররাইট করা সম্ভব।",
          "e": "ENTRYPOINT defines the base executable that always runs when the container starts. CMD defines default arguments for the entrypoint (or default command). Passing arguments to docker run overrides CMD, but appends to ENTRYPOINT.",
          "code": "# Typical Node.js Dockerfile:\nENTRYPOINT [\"node\"]\nCMD [\"dist/server.js\"] # Can be overridden: docker run myapp dist/worker.js"
        },
        {
          "lvl": "lvl1",
          "q": "Docker Compose কী এবং মাল্টি-কন্টেইনার অ্যাপ্লিকেশনে এটি কেন ব্যবহার করা হয়?",
          "m": "Docker Compose হলো একটি টুল যা একটি একক YAML ফাইলের (`docker-compose.yml`) মাধ্যমে একাধিক সংযুক্ত কন্টেইনার (যেমন Node.js API, PostgreSQL DB, Redis Cache, Nginx Reverse Proxy) সংজ্ঞায়িত ও পরিচালনা করতে সাহায্য করে। আলাদা আলাদা ৫-৬টি লম্বা `docker run` কমান্ড মুখস্থ না করে শুধুমাত্র `docker-compose up -d` চালালেই সমস্ত সার্ভিস, তাদের অভ্যন্তরীণ নেটওয়ার্ক এবং ভলিউম স্বয়ংক্রিয়ভাবে তৈরি হয়ে একে অপরের সাথে কানেক্ট হয়ে যায়।",
          "b": "ডকার কম্পোজ একটি YAML ফাইলের মাধ্যমে নোড ব্যাকএন্ড, ডেটাবেজ ও রেডিসের মতো একাধিক কন্টেইনারকে একসাথে এক কমান্ডে (docker-compose up) চালু ও পরিচালনা করতে সাহায্য করে।",
          "e": "Docker Compose declaratively manages multi-container applications defined in a docker-compose.yml file. Running docker-compose up -d provisions services (API, DB, Redis), internal bridge networks, and volumes simultaneously with a single command.",
          "code": "version: '3.8'\nservices:\n  api:\n    build: .\n    ports: ['5000:5000']\n    environment: [DATABASE_URL=postgres://db:5432/dokani]\n  db:\n    image: postgres:15-alpine\n    volumes: [pgdata:/var/lib/postgresql/data]\nvolumes:\n  pgdata:"
        },
        {
          "lvl": "lvl1",
          "q": "Docker Volume এবং Bind Mount-এর মধ্যে পার্থক্য কী এবং ডেটাবেজ ডেটা টিকিয়ে রাখতে কোনটি ব্যবহার করবে?",
          "m": "(১) `Bind Mount`: হোস্ট মেশিনের একটি নির্দিষ্ট পরম পাথকে (যেমন `./src`) কন্টেইনারের ভেতরের ফোল্ডারে মাউন্ট করে (লোকাল ডেভেলপমেন্টে লাইভ কোড রিলোডের জন্য আদর্শ)। (২) `Docker Volume`: ডকার ইঞ্জিন দ্বারা সম্পূর্ণ পরিচালিত একটি ডেডিকেটেড স্টোরেজ স্পেস (`/var/lib/docker/volumes/`)। এটি হোস্টের ওএস বা ফাইল সিস্টেমের ওপর নির্ভরশীল নয় এবং পারফরম্যান্স অত্যন্ত দ্রুত। ডেটাবেজ (PostgreSQL/MongoDB)-এর ডেটা কন্টেইনার ডিলিট হলেও চিরতরে টিকিয়ে রাখতে সবসময় `Docker Volume` ব্যবহার করতে হবে।",
          "b": "বাইন্ড মাউন্ট হোস্টের নির্দিষ্ট ফোল্ডার কন্টেইনারে ম্যাপ করে (লোকাল কোডিংয়ের জন্য সেরা)। ডকার ভলিউম ডকার ইঞ্জিন দিয়ে পরিচালিত নিরাপদ স্টোরেজ যা ডেটাবেজের ডেটা স্থায়ীভাবে সংরক্ষণের জন্য ব্যবহৃত হয়।",
          "e": "Bind Mounts bind a specific host folder path directly into the container (ideal for hot-reloading code during local dev). Named Docker Volumes are isolated and managed entirely by the Docker storage engine, providing high performance and persistence for production databases.",
          "code": "# Named volume persistence for PostgreSQL:\nvolumes:\n  - postgres_data:/var/lib/postgresql/data"
        },
        {
          "lvl": "lvl1",
          "q": "Docker Layer Caching কী এবং Dockerfile-এ কেন `package.json` আগে কপি করা হয়?",
          "m": "Dockerfile-এর প্রতিটি কমান্ড (`RUN`, `COPY`) একটি রিড-অনলি লেয়ার তৈরি করে। ডকার বিল্ড করার সময় যদি দেখে কোনো ফাইলের পরিবর্তন হয়নি, তবে সে পূর্বের ক্যাশ করা লেয়ার ব্যবহার করে। আমরা যদি সোর্স কোডের সাথে একবারে `COPY . .` করে `npm install` চালাই, তবে কোডে এক লাইন বদলালেও ডকার প্রতিবার ক্যাশ ভেঙে ৫ মিনিট ধরে সব প্যাকেজ নতুন করে ডাউনলোড করবে! বেস্ট প্র্যাকটিস: প্রথমে শুধুমাত্র `COPY package*.json ./` করে `RUN npm install` চালানো, তারপর সোর্স কোড কপি করা। এর ফলে কোড পরিবর্তন হলেও ডিপেনডেন্সি লেয়ার ক্যাশ থেকে মাত্র ২ সেকেন্ডে বিল্ড সম্পন্ন হয়।",
          "b": "ডকার লেয়ার ক্যাশিং বিল্ডের সময় বাঁচায়। package.json আগে কপি করে npm install করলে কোড পরিবর্তনের সময় ডিপেনডেন্সি পুনরায় ডাউনলোড না হয়ে ক্যাশ থেকে সাথে সাথে কাজ শেষ হয়।",
          "e": "Docker caches intermediate build layers. Copying package.json independently before source files ensures npm install executes only when dependencies change. When developers modify source code, Docker reuses the cached node_modules layer, accelerating builds from minutes to seconds.",
          "code": "COPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build"
        },
        {
          "lvl": "lvl2",
          "q": "Node.js ও Next.js অ্যাপ্লিকেশনের জন্য Multi-Stage Docker Build কীভাবে ইমেজ সাইজ ১GB থেকে ৮০MB-তে নামিয়ে আনে?",
          "m": "সাধারণ সিঙ্গেল-স্টেজ ডকার ইমেজে পুরো সোর্স কোড, TypeScript কম্পাইলার, এবং সব `devDependencies` থেকে যায়—যার ফলে ইমেজ সাইজ ১.২ গিগাবাইট ছাড়িয়ে যায় এবং সিকিউরিটি রিস্ক বাড়ে। Multi-Stage Build-এ আমরা একাধিক `FROM` ব্লক ব্যবহার করি: (১) `Builder Stage`: ফুল নোড ইমেজ নিয়ে কোড বিল্ড ও কম্পাইল করি। (২) `Production Runner Stage`: একটি অত্যন্ত ক্ষুদ্র `node:alpine` বা `distroless` ইমেজ নিই এবং বিল্ডার স্টেজ থেকে শুধুমাত্র কম্পাইল করা `dist/` ফোল্ডার এবং প্রোডাকশন প্যাকেজগুলো (`node_modules`) কপি করি। ডেভেলপমেন্টের কোনো টুলস বা কম্পাইলার প্রোডাকশন ইমেজে যায় না। ফলে ইমেজ সাইজ ১.২GB থেকে ৮০MB-তে নেমে আসে এবং এক্সপ্লয়েট সারফেস শূন্য হয়ে যায়।",
          "b": "মাল্টি-স্টেজ বিল্ডে বিল্ডার স্টেজে সোর্স কোড কম্পাইল করা হয় এবং রানার স্টেজে ক্ষুদ্র আলপাইন ইমেজে শুধু বিল্ড ফাইল ও প্রোডাকশন মডিউল কপি করা হয়। ফলে ইমেজের আকার ১GB থেকে ৮০MB তে নেমে আসে।",
          "e": "Multi-stage builds utilize multiple FROM stages. The 'builder' stage installs devDependencies and compiles TypeScript; the final 'runner' stage uses a stripped node:alpine base, copying strictly the compiled dist artifacts and production dependencies. This shrinks image footprints by 90% while hardening security.",
          "code": "# Multi-stage Dockerfile:\nFROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM node:20-alpine AS runner\nWORKDIR /app\nENV NODE_ENV=production\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY --from=builder /app/dist ./dist\nUSER node\nCMD [\"node\", \"dist/main.js\"]"
        },
        {
          "lvl": "lvl2",
          "q": "ডকার কন্টেইনারে `root` ইউজার হিসেবে অ্যাপ চালানো কেন ঝুঁকিপূর্ণ এবং নন-রুট ইউজার কীভাবে এনফোর্স করবে?",
          "m": "বাই-ডিফল্ট ডকার কন্টেইনারের ভেতরের প্রসেস `root` ইউজার হিসেবে রান করে। যদি কোনো হ্যাকার আপনার অ্যাপের ভালনারেবিলিটি বা রিমোট কোড এক্সিকিউশন (RCE) দিয়ে কন্টেইনার ব্রেকআউট (Container Escape) করতে পারে, তবে সে হোস্ট সার্ভারেরও পূর্ণ রুট অ্যাক্সেস পেয়ে পুরো সার্ভার হ্যাক করে ফেলবে! বেস্ট প্র্যাকটিস: Dockerfile-এর শেষে ডেডিকেটেড নন-রুট ইউজারে সুইচ করা। নোড আলপাইন ইমেজে বিল্ট-ইন `node` ইউজার থাকে। ফাইল পারমিশন ঠিক করে `USER node` নির্দেশ দেওয়া উচিত।",
          "b": "কন্টেইনারে রুট ইউজার হিসেবে অ্যাপ চালালে হ্যাকার কন্টেইনার ভেঙে মূল সার্ভারের নিয়ন্ত্রণ পেয়ে যেতে পারে। Dockerfile-এ USER node দিয়ে নন-রুট প্রিভিলেজে অ্যাপ রান করানো বাধ্যতামূলক।",
          "e": "Running containers as root poses container-escape privileges hazards where attackers gain root access to the host server. Mitigate by dropping root privileges via USER node (or creating dedicated unprivileged system users) before executing CMD instructions.",
          "code": "RUN chown -R node:node /app\nUSER node\nCMD [\"node\", \"dist/server.js\"]"
        },
        {
          "lvl": "lvl2",
          "q": "Docker Network Architecture: Bridge Network কীভাবে দুটি কন্টেইনারের মধ্যে সার্ভিস ডিসকভারি ও ডিএনএস রেজোলিউশন নিশ্চিত করে?",
          "m": "যখন কন্টেইনারগুলো একটি কাস্টম User-defined Bridge Network-এ যুক্ত থাকে (যেমন Docker Compose-এ স্বয়ংক্রিয়ভাবে তৈরি হয়), তখন ডকার একটি এমবেডেড DNS সার্ভার চালু করে (`127.0.0.11`)। ফলে কন্টেইনারগুলোকে কোনো অস্থির আইপি দিয়ে খুঁজতে হয় না—তারা সরাসরি সার্ভিসের নাম (Service Name) দিয়ে যোগাযোগ করতে পারে! যেমন: Node.js ব্যাকএন্ড ডাটাবেজ কানেক্ট করার জন্য সরাসরি হোস্ট হিসেবে `postgres://user:pass@db:5432/dokani` ব্যবহার করতে পারে, যেখানে `db` হলো ডাটাবেজ কন্টেইনারের নাম। ডকার ইন্টারনালি এই নামটিকে কন্টেইনারের প্রাইভেট আইপিতে রিজলভ করে দেয়।",
          "b": "ডকার ব্রিজ নেটওয়ার্কে এমবেডেড DNS সার্ভার থাকে। ফলে কন্টেইনারগুলো কোনো আইপি অ্যাড্রেস ছাড়াই সরাসরি একে অপরের সার্ভিসের নাম (যেমন db, redis) দিয়ে যোগাযোগ করতে পারে।",
          "e": "User-defined Docker Bridge Networks run an embedded DNS daemon (127.0.0.11) enabling automated service discovery. Containers resolve sister services by container or service name (e.g. connecting to db:5432) rather than ephemeral internal IP addresses.",
          "code": "networks:\n  dokani-net:\n    driver: bridge"
        },
        {
          "lvl": "lvl2",
          "q": "Dockerfile-এ `.dockerignore` ফাইলের গুরুত্ব কী এবং এটি না রাখলে কী ধরনের বিপর্যয় ঘটতে পারে?",
          "m": "`.dockerignore` ডকার বিল্ড কনটেক্সট থেকে নির্দিষ্ট ফাইল ও ফোল্ডার বাদ দেয়। যদি এটি না থাকে: (১) আপনার লোকাল মেশিনের বিশাল `node_modules` ডকার ডেমন-এ কপি হবে যা বিল্ড টাইম ১০ গুণ ধীর করে দেবে এবং হোস্ট ওএস-এর বাইনারি (যেমন Mac/Windows-এ তৈরি হওয়া বাইনারি) লিনাক্স কন্টেইনারে ঢুকে ক্র্যাশ করবে! (২) আপনার গোপন `.env` ফাইল ডকার ইমেজের লেয়ারে পার্মানেন্টলি ঢুকে যাবে—যার ফলে ইমেজটি ডকারহাবে পুশ করলে যে কেউ আপনার ডাটাবেজ পাসওয়ার্ড পেয়ে যাবে! তাই `.dockerignore`-এ `node_modules`, `.git`, এবং `.env` থাকা বাধ্যতামূলক।",
          "b": ".dockerignore ফাইল লোকাল node_modules এবং সংবেদনশীল .env ফাইলকে ডকার ইমেজে কপি হওয়া থেকে আটকায়। এটি না রাখলে বিল্ড মারাত্মক স্লো হয় এবং গোপনীয় পাসওয়ার্ড ফাঁস হয়ে যায়।",
          "e": ".dockerignore strips files from the Docker build context. Omitting it uploads bulky local node_modules (causing architecture binary mismatches on Alpine) and bakes sensitive .env secrets into public image layers. Always ignore node_modules, .git, and .env.",
          "code": "# .dockerignore:\nnode_modules\n.git\n.env\n*.md\ndist"
        },
        {
          "lvl": "lvl2",
          "q": "Docker Container `HEALTHCHECK` নির্দেশনা কী এবং এটি অরফেস্ট্রেটর ও ডকার কম্পোজকে কীভাবে সুরক্ষিত রাখে?",
          "m": "শুধু কন্টেইনার প্রসেস রানিং থাকা মানেই অ্যাপ সুস্থ থাকা নয় (অ্যাপ ভেতর থেকে মেমোরি লিকে ডেডলক হয়ে ইন্টারনালি হ্যাং করতে পারে)। `HEALTHCHECK` নির্দেশনা ডকার ইঞ্জিনকে নির্দিষ্ট সময় পর পর (যেমন প্রতি ৩০ সেকেন্ডে) কন্টেইনারের ভেতরের একটি এন্ডপয়েন্ট পিং করার নির্দেশ দেয় (যেমন `curl -f http://localhost:5000/api/health || exit 1`)। যদি ৩ বার চেক ফেইল করে, ডকার কন্টেইনারটির স্ট্যাটাস `(healthy)` থেকে বদলে `(unhealthy)` করে দেয়। ফলে Nginx রিভার্স প্রক্সি বা অর্কেস্ট্রেটর ট্রাফিক পাঠানো বন্ধ করে এবং কন্টেইনারটি অটো-রিস্টার্ট করতে পারে।",
          "b": "HEALTHCHECK ডকারকে নির্দিষ্ট সময় পর পর অ্যাপের হেলথ এপিআই পরীক্ষা করার নির্দেশ দেয়। অ্যাপ ভেতর থেকে হ্যাং করলে এটি স্ট্যাটাস আন-হেলদি করে দেয় যাতে অর্কেস্ট্রেটর অ্যাপটিকে স্বয়ংক্রিয়ভাবে রিস্টার্ট করতে পারে।",
          "e": "HEALTHCHECK periodically verifies container operational viability rather than simple process existence (e.g. curling /health). If health probes fail repeatedly, Docker marks the container unhealthy, signaling upstream orchestrators to stop routing traffic and trigger replacement.",
          "code": "HEALTHCHECK --interval=30s --timeout=5s --retries=3 \\\n  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/health || exit 1"
        },
        {
          "lvl": "lvl3",
          "q": "Docker Container Logging Best Practices: কন্টেইনার লগ যাতে পুরো সার্ভার ডিস্ক না ভরায় সেজন্য `json-file` লগ ড্রাইভার কীভাবে টিউন করবে?",
          "m": "কন্টেইনারের সমস্ত কনসোল আউটপুট (`console.log`) ডকার ডিফল্টভাবে সার্ভার ডিস্কে JSON ফাইল হিসেবে জমায়। যদি কোনো লিমিট না দেওয়া থাকে, তবে হাই-ট্রাফিক এপিআই কয়েক সপ্তাহের মধ্যে ৫০GB লগ জমিয়ে পুরো হোস্ট ওএস ডাউন করে দেবে। প্রোডাকশন সলিউশন: `/etc/docker/daemon.json` বা Docker Compose-এ `logging` অপশনে সাইজ ও ফাইল সংখ্যা কঠোরভাবে বেঁধে দেওয়া: `max-size: \"50m\"` এবং `max-file: \"3\"`। এর ফলে একটি লগ ফাইল ৫০MB হলেই স্বয়ংক্রিয়ভাবে রোটেট হবে এবং সর্বোচ্চ ৩টি ফাইল থাকবে, ডিস্ক স্পেস সবসময় নিরাপদ থাকবে।",
          "b": "ডকার লগ ডিস্ক ভর্তি করে সার্ভার যাতে ক্র্যাশ না করায় সেজন্য max-size: 50m এবং max-file: 3 কনফিগার করা হয়। এতে লগ ফাইল নির্দিষ্ট সাইজের পর অটো-রোটেট হয়।",
          "e": "Unchecked container stdout json-file logging saturates host storage. Enforce log rotation globally in /etc/docker/daemon.json or per-service in Compose using max-size: '50m' and max-file: '3', bounding maximum disk usage deterministically.",
          "code": "services:\n  api:\n    logging:\n      driver: \"json-file\"\n      options:\n        max-size: \"50m\"\n        max-file: \"3\""
        },
        {
          "lvl": "lvl3",
          "q": "Docker Container Zombie Processes এবং PID 1 Init Problem: কেন ডকার কন্টেইনারে `tini` বা `dumb-init` ব্যবহার করা হয়?",
          "m": "লিনাক্সে PID 1 প্রসেসের বিশেষ দায়িত্ব থাকে: চাইল্ড প্রসেস টার্মিনেট হলে তাদের রিক্লেইম করা (Reaping zombie processes) এবং `SIGTERM` সিগন্যাল সব চাইল্ড প্রসেসে পৌঁছে দেওয়া। Node.js নিজে PID 1 হিসেবে রান করার জন্য ডিজাইন করা হয়নি; ফলে Node.js `SIGTERM` পেলেও অনেক সময় চাইল্ড প্রসেসগুলোকে বন্ধ না করে জম্বি প্রসেস হিসেবে ঝুলিয়ে রাখে। সমাধান: একটি অতিক্ষুদ্র Init সিস্টেম যেমন `tini` বা `dumb-init` ব্যবহার করা (`ENTRYPOINT [\"/sbin/tini\", \"--\", \"node\", \"dist/main.js\"]`) অথবা Dockerfile-এ `--init` ফ্ল্যাগ দিয়ে রান করা। এটি নিখুঁতভাবে সিগন্যাল প্রপাগেশন ও গ্রেসফুল শাটডাউন নিশ্চিত করে।",
          "b": "নোড.জেএস লিনাক্সের PID 1 এর মতো জম্বি প্রসেস ক্লিন করতে পারে না। tini বা dumb-init ব্যবহার করলে কন্টেইনার গ্রেসফুল শাটডাউন সিগন্যাল সঠিকভাবে পায় এবং ব্যাকগ্রাউন্ডে মেমোরি লিকিং জম্বি প্রসেস তৈরি হওয়া রোধ হয়।",
          "e": "Node.js was not engineered to act as Linux init PID 1; it neglects zombie child reaping and mismanages kernel SIGTERM signal forwarding. Wrapping the entrypoint in an ultra-light init wrapper like tini or dumb-init guarantees flawless process reaping and graceful shutdown.",
          "code": "RUN apk add --no-cache tini\nENTRYPOINT [\"/sbin/tini\", \"--\"]\nCMD [\"node\", \"dist/server.js\"]"
        },
        {
          "lvl": "lvl3",
          "q": "Docker Security Hardening: `read_only` রুট ফাইলসিস্টেম, `cap_drop: ALL` এবং `no-new-privileges` কীভাবে কন্টেইনারকে বুলেপ্রুফ করে?",
          "m": "এন্টারপ্রাইজ কন্টেইনার সিকিউরিটির ৩টি মূল স্তম্ভ: (১) `cap_drop: [ALL]`: লিনাক্স কার্নেলের সমস্ত অপ্রয়োজনীয় প্রিভিলেজ (যেমন নেটওয়ার্ক ইন্টারফেস বদলানো, র-সকেট এক্সেস) ড্রপ করে দেওয়া। (২) `security_opt: [\"no-new-privileges:true\"]`: কন্টেইনারের ভেতরের কোনো প্রসেস যেন `setuid` দিয়ে অতিরিক্ত অধিকার না পায় তা নিশ্চিত করা। (৩) `read_only: true`: কন্টেইনারের রুট ফাইলসিস্টেমকে রিড-অনলি লক করে দেওয়া—যাতে কোনো আক্রমণকারী ভেতরে কোনো ম্যালওয়্যার ফাইল ডাউনলোড বা এক্সিকিউট করতে না পারে (প্রয়োজনীয় টেম্পোরারি রাইটের জন্য শুধু মেমোরি মাউন্ট `tmpfs: /tmp` দেওয়া হয়)।",
          "b": "কন্টেইনার সুরক্ষিত করতে cap_drop: ALL দিয়ে সমস্ত অপ্রয়োজনীয় কার্নেল পারমিশন বাতিল করা হয়, no-new-privileges দিয়ে ক্ষমতা বৃদ্ধি ঠেকানো হয় এবং read_only ফাইলসিস্টেম করে ম্যালওয়্যার ডাউনলোড পুরোপুরি বন্ধ করা হয়।",
          "e": "Harden production containers against zero-day exploits by dropping all Linux capabilities (cap_drop: ALL), prohibiting privilege escalation (no-new-privileges: true), and enforcing an immutable read_only root filesystem with ephemeral memory tmpfs mounts for /tmp.",
          "code": "services:\n  secure-api:\n    image: dokani-api:latest\n    read_only: true\n    tmpfs: ['/tmp']\n    security_opt:\n      - no-new-privileges:true\n    cap_drop:\n      - ALL"
        },
        {
          "lvl": "lvl3",
          "q": "Docker Swarm বনাম Kubernetes: আর্কিটেকচারাল জটিলতা এবং কখন ডকার সোয়ার্ম যথেষ্ট?",
          "m": "Kubernetes হলো একটি অত্যন্ত শক্তিশালী কিন্তু বিশাল ও জটিল কন্টেইনার অর্কেস্ট্রেশন সিস্টেম (এতে Control Plane, Etcd, Kubelet, CNI প্লাগইন, জটিল YAML ও হাই ক্লাউড ওভারহেড থাকে—যা ছোট টিমের জন্য ওভারকিল)। `Docker Swarm` হলো ডকারেরই বিল্ট-ইন নেটিভ অর্কেস্ট্রেটর। সুবিধা: কোনো অতিরিক্ত কনফিগারেশন ছাড়াই সিঙ্গেল কমান্ডে (`docker swarm init`) একাধিক নোডের ক্লাস্টার তৈরি হয়, স্বয়ংক্রিয় লোড ব্যালেন্সিং, রোলিং আপডেট এবং ডকার কম্পোজ ফাইলের সাথে ১০০% কম্প্যাটিবল। ২০-৩০টি মাইক্রোসার্ভিস বা মধ্যম আকারের SaaS-এর জন্য ডকার সোয়ার্ম বা সাধারণ Docker Compose পরিচালনা করা শত গুণ সহজ ও সাশ্রয়ী।",
          "b": "কুবারনেটিস বিশাল ও জটিল। ডকার সোয়ার্ম ডকারের বিল্ট-ইন ক্লাস্টার অর্কেস্ট্রেটর যা কোনো বাড়তি জটিলতা ছাড়াই লোড ব্যালেন্সিং ও রোলিং আপডেট দেয়। মাঝারি আকারের প্রজেক্টের জন্য সোয়ার্ম অনেক বেশি সহজ ও কার্যকর।",
          "e": "Kubernetes is an industrial-grade container orchestrator with severe configuration and cognitive overhead. Docker Swarm provides native multi-node clustering, declarative rolling updates, and mesh routing baked directly into the Docker CLI, offering 90% of orchestration needs at 10% of operational complexity.",
          "tip": "বলো: 'We evaluate team operational maturity: Docker Swarm or Compose excels for mid-scale SaaS before escalating to Kubernetes.'"
        },
        {
          "lvl": "lvl3",
          "q": "Docker Image Scanning ও Vulnerability Auditing (Trivy / Docker Scout) কীভাবে CI/CD পাইপলাইনে গেটকিপার হিসেবে বসাবে?",
          "m": "ইন্টারনেটের বেস ইমেজগুলোতে (যেমন `node:18`) প্রায়ই কার্নেল ও লাইব্রেরির পুরনো সিকিউরিটি বাগ বা CVE থাকে। আমরা GitHub Actions পাইপলাইনে `Trivy` বা `Docker Scout` বসাই। ইমেজ বিল্ড হওয়ার পর ট্রাইভি পুরো কন্টেইনার ও তার ওএস প্যাকেজ স্ক্যান করে। যদি কোনো `CRITICAL` বা `HIGH` ভালনারেবিলিটি পায়, তবে সে `exit code 1` দিয়ে বিল্ড ফেইল করায় এবং ডিপ্লয়মেন্ট আটকে দেয়। এটি নিশ্চিত করে যে কোনো পরিচিত সিকিউরিটি হোল সহ কোনো কন্টেইনার কখনোই প্রোডাকশনে পৌঁছাতে পারবে না।",
          "b": "Trivy বা Docker Scout দিয়ে CI/CD তে ডকার ইমেজ স্ক্যান করা হয়। কোনো ক্রিটিক্যাল সিকিউরিটি বাগ ধরা পড়লে এটি স্বয়ংক্রিয়ভাবে বিল্ড ফেইল করে ক্ষতিকর ইমেজ প্রোডাকশনে যাওয়া প্রতিরোধ করে।",
          "e": "Integrate Trivy or Docker Scout into CI/CD pipelines to scan container layers against the National Vulnerability Database. The scanner evaluates CVE severity; any HIGH or CRITICAL vulnerability aborts the pipeline, preventing vulnerable containers from reaching production registries.",
          "code": "- name: Scan image with Trivy\n  uses: aquasecurity/trivy-action@master\n  with:\n    image-ref: 'dokani-api:${{ github.sha }}'\n    severity: 'CRITICAL,HIGH'\n    exit-code: '1'"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: Next.js বা Node.js অ্যাপ্লিকেশনের Docker ইমেজ সাইজ বিল্ড করার পর ১.৫GB হয়ে গেছে। ক্লাউড সার্ভারে ইমেজ পুল ও ডিপ্লয় হতে ১০ মিনিট সময় লাগছে! কীভাবে ইমেজ সাইজ ১০০MB-র নিচে নামাবে?",
          "m": "সমাধানের ধাপ: (১) সবার আগে Multi-Stage Build প্রয়োগ করব। (২) বেস ইমেজ হিসেবে ভারী `node:20` বাদ দিয়ে লাইটওয়েট `node:20-alpine` ব্যবহার করব। (৩) বিল্ড স্টেজে `npm ci` দিয়ে সব প্যাকেজ ইন্সটল করে `next build` চালাব। (৪) `next.config.js`-এ `output: 'standalone'` কনফিগার করব—যা নেক্সট.জেএস-কে নির্দেশ করে শুধুমাত্র প্রয়োজনীয় রানটাইম ফাইলগুলো একটি স্বয়ংসম্পূর্ণ মিনিমাল ফোল্ডারে বানাতে। (৫) রানার স্টেজে শুধুমাত্র standalone আর্টিক্ট কপি করব। ইমেজ সাইজ ১.৫GB থেকে কমে মাত্র ৬৫MB-তে চলে আসবে এবং ডিপ্লয়মেন্ট হবে নিমেষে!",
          "b": "node:alpine বেস ইমেজ, Multi-stage build এবং নেক্সট.জেএসে output: 'standalone' ব্যবহার করে অপ্রয়োজনীয় কোড বাদ দেব। এতে ইমেজ সাইজ ১.৫GB থেকে ৬৫MB তে নেমে আসবে।",
          "e": "Enable output: 'standalone' in next.config.js to isolate execution dependencies. In the Dockerfile, switch to node:alpine, adopt a multi-stage architecture, and copy strictly the generated standalone server payload to reduce image weight from 1.5GB to under 70MB.",
          "code": "// next.config.js:\nmodule.exports = { output: 'standalone' };\n// Runner stage in Dockerfile:\nCOPY --from=builder /app/.next/standalone ./\nCOPY --from=builder /app/.next/static ./.next/static"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: লোকাল মেশিনে `docker-compose up` দেওয়ার পর নোড এপিআই কন্টেইনার ক্র্যাশ করছে এবং লগ দেখাচ্ছে: `PrismaClientInitializationError: Can't reach database server at db:5432`। ডেটাবেজ কন্টেইনার রানিং থাকা সত্ত্বেও কেন এটি ঘটছে এবং কীভাবে ফিক্স করবে?",
          "m": "সমস্যার কারণ: `depends_on: [db]` শুধু নির্দেশ করে যে ডেটাবেজ কন্টেইনার প্রসেস শুরু হয়েছে, কিন্তু PostgreSQL ডেটাবেজ রেডি হয়ে পোর্ট ওপেন করতে ৩-৪ সেকেন্ড সময় নেয়! নোড এপিআই ডেটাবেজ বুট হওয়ার আগেই কানেক্ট করতে গিয়ে ফেইল করেছে। ফিক্স: (১) ডেটাবেজ সার্ভিসে একটি `healthcheck` যোগ করতে হবে (`test: [\"CMD-SHELL\", \"pg_isready -U postgres\"]`)। (২) এপিআই সার্ভিসের `depends_on`-এ কন্ডিশন দিতে হবে: `condition: service_healthy`। এর ফলে ডেটাবেজ শতভাগ রেডি হওয়ার পরই কেবল নোড এপিআই স্টার্ট হবে।",
          "b": "ডেটাবেজ কন্টেইনার চালু হলেও পোস্টগ্রেস পোর্ট রেডি হতে সময় নেয়। pg_isready দিয়ে হেলথচেক বসিয়ে depends_on: condition: service_healthy দিলে ডাটাবেজ পুরোপুরি প্রস্তুত হওয়ার পরই কেবল এপিআই চালু হবে।",
          "e": "depends_on only waits for container creation, not database engine readiness. Configure a pg_isready healthcheck on the database service and declare depends_on: db: condition: service_healthy on the API service to guarantee socket readiness before starting.",
          "code": "services:\n  db:\n    image: postgres:15-alpine\n    healthcheck:\n      test: [\"CMD-SHELL\", \"pg_isready -U postgres\"]\n      interval: 5s\n      retries: 5\n  api:\n    depends_on:\n      db:\n        condition: service_healthy"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: তুমি ডকার কন্টেইনার রিস্টার্ট দেওয়ার পর দেখলে ডেটাবেজের সমস্ত ইউজারের ডেটা ও টেবিল মুছে গেছে এবং ডেটাবেজ সম্পূর্ণ ফাঁকা হয়ে গেছে! কেন এটি ঘটল এবং কীভাবে স্থায়ী সমাধান করবে?",
          "m": "ভয়াবহ ভুল: ডেটাবেজ কন্টেইনারে কোনো Persistent Docker Volume মাউন্ট করা হয়নি! ডকার কন্টেইনারের অভ্যন্তরীণ ফাইলসিস্টেম হলো সম্পূর্ণ ক্ষণস্থায়ী (Ephemeral); ফলে কন্টেইনার ডিলিট বা রিস্টার্ট হলে তার ভেতরের সমস্ত আন-মাউন্টেড ডেটা চিরতরে মুছে যায়। স্থায়ী সমাধান: Docker Compose-এ একটি Named Volume ডিফাইন করে ডেটাবেজের ডেটা ডিরেক্টরিতে মাউন্ট করতে হবে (`postgres_data:/var/lib/postgresql/data`)। এর ফলে কন্টেইনার ধ্বংস হলেও ডিস্কের মূল ভলিউমে ডেটা আজীবন অক্ষত ও নিরাপদ থাকবে।",
          "b": "কন্টেইনারের ভেতরের ফাইল অস্থায়ী। ভলিউম মাউন্ট না করায় কন্টেইনার বন্ধের সাথে সাথে ডেটা মুছে গেছে। ডকার কম্পোজে Named Volume (postgres_data:/var/lib/postgresql/data) মাউন্ট করলে ডেটা চিরতরে সংরক্ষিত থাকে।",
          "e": "Container root filesystems are ephemeral by design. Running database images without persistent volumes wipes storage upon recreation. Attach a persistent Docker Named Volume to /var/lib/postgresql/data to preserve state across container lifecycles.",
          "code": "services:\n  db:\n    image: postgres:15-alpine\n    volumes:\n      - pgdata:/var/lib/postgresql/data\nvolumes:\n  pgdata: # Persistent on host disk"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: Docker কন্টেইনারের ভেতরে চলা নোড অ্যাপে ফাইল আপলোড বা ক্যাশ লেখার সময় এরর আসছে: `EACCES: permission denied, open '/app/uploads/avatar.png'`। কোডে কোথাও বাগ নেই। সমস্যাটি কোথায়?",
          "m": "সমস্যার কারণ: আপনি Dockerfile-এ সিকিউরিটির জন্য `USER node` (নন-রুট ইউজার) ব্যবহার করেছেন, কিন্তু `/app/uploads` ডিরেক্টরিটি যখন তৈরি করা হয়েছিল তখন তার মালিকানা ছিল `root` ইউজারের কাছে! ফলে `node` ইউজার সেখানে কোনো ফাইল লেখার পারমিশন পাচ্ছে না। সমাধান: `USER node`-এ সুইচ করার ঠিক আগে ডিরেক্টরিটি তৈরি করে তার ওনারশিপ `node:node`-কে দিতে হবে: `RUN mkdir -p /app/uploads && chown -R node:node /app/uploads`। এরপর অ্যাপ নির্বিঘ্নে ফাইল লিখতে পারবে।",
          "b": "ডিরেক্টরির মালিক ছিল root ইউজার, কিন্তু অ্যাপ চলছিল node ইউজার দিয়ে। USER node এ যাওয়ার আগে chown -R node:node চালিয়ে ফোল্ডারের মালিকানা পরিবর্তন করলেই পারমিশন এরর দূর হয়।",
          "e": "The uploads directory was provisioned by root during image build, denying write permissions to the non-root USER node. Remediate by explicitly creating the target directory and assigning recursive ownership via chown -R node:node before switching execution users.",
          "code": "RUN mkdir -p /app/uploads && chown -R node:node /app/uploads\nUSER node\nCMD [\"node\", \"dist/server.js\"]"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: একটি ডকারাইজড অ্যাপ্লিকেশন হোস্ট মেশিনে রান করার পর ব্রাউজারে `http://localhost:5000` দিয়ে কোনোভাবেই অ্যাক্সেস পাওয়া যাচ্ছে না (`Connection Refused`), যদিও কন্টেইনার লগ বলছে `Server running on port 5000`! কী কী চেক করবে?",
          "m": "চেকলিস্ট: (১) `Port Mapping`: `docker run` বা compose-এ পোর্ট এক্সপোজ ও ম্যাপ করা হয়েছে কি না (`-p 5000:5000`)। (২) সবচেয়ে কমন ভুল: Node.js সার্ভারটি `localhost` বা `127.0.0.1`-এ লিসেন করছে! কন্টেইনারের ভেতরে `localhost` মানে শুধু কন্টেইনারের ভেতরের লোকাল লুপব্যাক ইন্টারফেস; বাইরের কোনো ট্রাফিক সেখানে ঢুকতে পারে না। নোড অ্যাপের সার্ভার লিসেন ইন্টারফেস অবশ্যই `0.0.0.0` (All network interfaces) করতে হবে: `app.listen(5000, '0.0.0.0')`। (৩) হোস্ট ফায়ারওয়াল UFW-তে পোর্ট ব্লক আছে কি না।",
          "b": "কন্টেইনারের ভেতর অ্যাপকে 127.0.0.1 এর বদলে 0.0.0.0 আইপিতে লিসেন করাতে হবে এবং ডকারে -p 5000:5000 পোর্ট ম্যাপিং নিশ্চিত করতে হবে। অন্যথায় বাইরের রিকোয়েস্ট কন্টেইনারে ঢুকতে পারে না।",
          "e": "Verify port mapping (-p 5000:5000). Crucially, ensure the Node.js HTTP server binds to 0.0.0.0 rather than 127.0.0.1. Binding to localhost limits listening strictly to the container loopback interface, dropping all incoming packets forwarded from the host.",
          "code": "// Express server configuration:\nconst PORT = process.env.PORT || 5000;\napp.listen(PORT, '0.0.0.0', () => console.log(`Listening on 0.0.0.0:${PORT}`));"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা (Dokani SaaS): Dokani-র সম্পূর্ণ স্ট্যাক (Next.js Frontend, Node Backend, PostgreSQL, Redis, Nginx) কীভাবে প্রোডাকশন Docker Compose দিয়ে অর্কেস্ট্রেট করা হয়েছে?",
          "m": "দোকানিতে একটি প্রোডাকশন-গ্রেড `docker-compose.prod.yml` কার্যকর: (১) সমস্ত সার্ভিস একটি প্রাইভেট আইসোলেটেড ব্রিজ নেটওয়ার্কে (`dokani-internal`) সংযুক্ত থাকে। (২) শুধুমাত্র `Nginx` কন্টেইনারের ৮০ ও ৪৪৩ পোর্ট হোস্টে এক্সপোজ থাকে; ব্যাকএন্ড এপিআই, ডাটাবেজ বা রেডিসের কোনো পোর্ট ইন্টারনেটে সরাসরি উন্মুক্ত থাকে না। (৩) Nginx অভ্যন্তরীণ ডকার DNS দিয়ে `api:5000` এবং `frontend:3000`-এ ট্রাফিক রিভার্স প্রক্সি করে। (৪) ডেটাবেজ ও রেডিসের জন্য এনক্রিপ্টেড নেমড ভলিউম থাকে। (৫) প্রতিটি সার্ভিসে `restart: always` এবং হেলথচেক নিশ্চিত করা থাকে। ফলে একক সার্ভারে একটি এন্টারপ্রাইজ মাইক্রো-ক্লাস্টার নিখুঁতভাবে পরিচালিত হয়।",
          "b": "দোকানিতে Nginx ছাড়া কোনো সার্ভিসের পোর্ট ইন্টারনেটে খোলা থাকে না। সমস্ত সার্ভিস অভ্যন্তরীণ ব্রিজ নেটওয়ার্কে সংযুক্ত থাকে এবং Nginx অভ্যন্তরীণ ডকার ডিএনএস দিয়ে ট্রাফিক রাউট করে। ভলিউম ও অটো-রিস্টার্ট দিয়ে সর্বোচ্চ স্ট্যাবিলিটি নিশ্চিত করা হয়েছে।",
          "e": "Dokani POS orchestrates its multi-tier stack via production Compose: an isolated bridge network protects the internal tiers while strictly exposing Nginx (ports 80/443). Nginx routes traffic internally to api:5000 and frontend:3000 over Docker DNS, safeguarding persistent databases behind named volumes.",
          "tip": "দোকানির এই আর্কিটেকচারাল ডিজাইন (Nginx as sole public gateway, DB/API isolated on internal network) ইন্টারভিউতে খুব প্রশংসিত হয়।"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: জিরো-ডাউনটাইম ডিপ্লয়মেন্টে Docker Compose Rolling Restart বা Blue-Green ডিপ্লয় কীভাবে সম্পন্ন করবে?",
          "m": "সরাসরি `docker-compose down && docker-compose up` চালালে ৫-১০ সেকেন্ডের জন্য সাইট ডাউন হয়ে যায়। সমাধান: (১) `Blue-Green Deployment`: Nginx-এর সামনে দুটি এপিআই কন্টেইনার সার্ভিস থাকে (`api_blue` এবং `api_green`)। (২) নতুন কোড আসলে আমরা গ্রিন কন্টেইনারে নতুন ইমেজ বিল্ড ও স্টার্ট করি। (৩) গ্রিন কন্টেইনারের হেলথচেক পাস করলে Nginx কনফিগে আপস্ট্রিম পয়েন্টার এক সেকেন্ডে ব্লু থেকে গ্রিনে সুইচ করে `nginx -s reload` দিই। (৪) এরপর পুরনো ব্লু কন্টেইনার বন্ধ করি। ইউজাররা কোনো ড্রপ বা ডাউনটাইম ছাড়াই নতুন ভার্সন পেয়ে যায়।",
          "b": "ব্লু-গ্রিন ডিপ্লয়মেন্টে Nginx এর সামনে দুটি কন্টেইনার থাকে। নতুন কোড গ্রিন কন্টেইনারে চালু করে হেলথচেক সফল হলে Nginx দিয়ে ট্রাফিক গ্রিনে ঘুরিয়ে দেওয়া হয় কোনো ডাউনটাইম ছাড়াই।",
          "e": "Execute Blue-Green container deployments using Nginx upstreams: spin up the newly built green container on an alternate internal port, verify healthy readiness probes, execute an instantaneous nginx -s reload to pivot proxy traffic, and gracefully decommission the legacy blue container.",
          "code": "# Nginx upstream pivot:\nupstream api_backend {\n  server api_green:5000; # Switch from blue to green\n}"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: ডকার কন্টেইনার সিঙ্ক ও ক্যাশ ক্লিনিং: প্রোডাকশন VPS-এ 'Dangling Images' ও ক্যাশ জমে ডিস্ক ভর্তি হওয়া রোধে অটোমেটেড পাইপলাইন কীভাবে সেটআপ করবে?",
          "m": "প্রতিবার নতুন ইমেজ বিল্ড বা পুল করার পর পুরনো ইমেজগুলো 'Dangling' (`<none>:<none>`) অবস্থায় হার্ডডিস্কে জমে থাকে। কয়েক মাস পর এটি ২০-৩০GB জায়গা খেয়ে ফেলে। সলিউশন: আমরা সার্ভারের ক্রন জবে একটি সাপ্তাহিক ক্লিনিং স্ক্রিপ্ট চালাই: `docker system prune -af --volumes=false` (সতর্কতা: `--volumes=false` রাখতে হবে যাতে ডাটাবেজের ভলিউম ডিলিট না হয়!)। এটি সমস্ত অব্যবহৃত পুরনো কন্টেইনার, বিল্ড ক্যাশ ও ড্যাঙ্গলিং ইমেজ নিরাপদে পার্জ করে ডিস্ক খালি রাখে।",
          "b": "নতুন বিল্ডের পর পুরনো ইমেজ জমে ডিস্ক ভরে যাওয়া ঠেকাতে ক্রন জবে docker system prune -af --volumes=false চালানো হয়। ভলিউম অক্ষত রেখে এটি অপ্রয়োজনীয় ক্যাশ ও পুরনো ইমেজ পরিষ্কার করে।",
          "e": "Continuous CI/CD deployments generate dangling container images and build caches. Schedule a weekly root cron job running docker system prune -af --volumes=false to purge unreferenced images and dangling layers while strictly preserving persistent named database volumes.",
          "code": "# Weekly prune cron (Sunday 4 AM):\n0 4 * * 0 /usr/bin/docker system prune -af --volumes=false >> /var/log/docker-prune.log 2>&1"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: সিকিউর ডকার এনভায়রনমেন্ট ভ্যারিয়েবল ম্যানেজমেন্ট: কেন Dockerfile-এ `ENV` দিয়ে ডাটাবেজ পাসওয়ার্ড বেক করা সম্পূর্ণ নিষিদ্ধ?",
          "m": "মারাত্মক ভুল: Dockerfile-এর ভেতরে যদি লেখা হয় `ENV DB_PASSWORD=\"secret123\"`, তবে যে কেউ `docker history <image>` বা `docker inspect` চালিয়ে সেই পাসওয়ার্ড সরাসরি প্লেইন-টেক্সটে দেখে ফেলতে পারে—এমনকি এটি গিটহাবেও লিক হয়ে যায়! সঠিক প্রোডাকশন প্যাটার্ন: (১) Dockerfile-এ কখনোই কোনো সিক্রেট রাখা যাবে না। (২) রানটাইমে সিক্রেট ইনজেক্ট করতে হবে: Docker Compose-এর `env_file: [.env.production]` দিয়ে অথবা ডকার সোয়ার্ম/কুবারনেটিসের `Docker Secrets` মেকানিজম ব্যবহার করে যা মেমোরিতে এনক্রিপ্ট হয়ে কন্টেইনারে মাউন্ট হয়।",
          "b": "Dockerfile এ ENV দিয়ে পাসওয়ার্ড দিলে docker history চালিয়ে যে কেউ তা দেখে ফেলতে পারে। সিক্রেট সবসময় রানটাইমে env_file বা ডকার সিক্রেট দিয়ে মেমোরি মাউন্টে পাস করতে হয়।",
          "e": "Hardcoding ENV DB_PASS in Dockerfiles exposes credentials in plaintext via docker history and container image registries. Inject runtime secrets strictly via external untracked env_file directives, cloud secret managers (AWS SSM), or encrypted Docker Secrets mounted in-memory.",
          "tip": "কখনোই Dockerfile-এ `ENV SECRET=xxx` লিখবে না; সবসময় রানটাইম ইনজেকশন ব্যবহার করবে।"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: ডকারাইজড নোড অ্যাপ্লিকেশনে Graceful Shutdown হ্যান্ডেল করে কীভাবে ইন-ফ্লাইট রিকোয়েস্ট বাঁচাবে?",
          "m": "ডকার যখন কোনো কন্টেইনার বন্ধ করে (`docker stop`), সে প্রথমে `SIGTERM` সিগন্যাল পাঠায় এবং ১০ সেকেন্ড অপেক্ষা করে। যদি অ্যাপ সাড়া না দেয়, তবে সে `SIGKILL` দিয়ে প্রসেসটি হত্যা করে—ফলে মাঝপথে থাকা লেনদেন করাপ্ট হয়ে যায়। নোড সার্ভারে গ্রেসফুল শাটডাউন লজিক লিখি: `process.on('SIGTERM', () => { ... })`। এতে সার্ভার নতুন রিকোয়েস্ট নেওয়া বন্ধ করে, চলমান এপিআই রিকোয়েস্টগুলো শেষ হওয়ার সুযোগ দেয়, ডেটাবেজ কানেকশন পুল সুন্দরভাবে ক্লোজ করে এবং নিরাপদে প্রসেস বন্ধ করে। ফলে ডিপ্লয়মেন্ট চলাকালীন কোনো কাস্টমারের পেমেন্ট বা ইনভয়েস ড্রপ করে না।",
          "b": "docker stop সিগন্যাল পাঠালে যাতে চলমান পেমেন্ট বা ইনভয়েস নষ্ট না হয়, সেজন্য Node.js সার্ভারে SIGTERM ইভেন্ট হ্যান্ডেল করে ইন-ফ্লাইট রিকোয়েস্ট শেষ করার পর ডাটাবেজ কানেকশন ক্লোজ করা হয়।",
          "e": "Docker stop dispatches a SIGTERM signal with a 10-second grace window before issuing SIGKILL. Intercept SIGTERM in Node.js to stop accepting incoming traffic, drain active in-flight HTTP connections, terminate database connection pools gracefully, and exit cleanly.",
          "code": "process.on('SIGTERM', async () => {\n  console.log('SIGTERM received: draining HTTP connections...');\n  server.close(async () => {\n    await prisma.$disconnect();\n    console.log('Database pools closed. Clean exit.');\n    process.exit(0);\n  });\n});"
        }
      ]
    },
    {
      "id": "nginx-reverse-proxy-ssl",
      "name": "Nginx Reverse Proxy, Load Balancing & SSL",
      "desc": "Reverse Proxy Architecture, upstream Load Balancing, Let's Encrypt Certbot SSL, Rate Limiting, Gzip Compression, WebSocket Proxying",
      "items": [
        {
          "lvl": "lvl1",
          "q": "Reverse Proxy কী এবং Node.js অ্যাপ্লিকেশনকে সরাসরি পোর্টে না রেখে কেন সামনে Nginx বসানো আবশ্যক?",
          "m": "Reverse Proxy হলো একটি ইন্টারমিডিয়েট সার্ভার যা ইন্টারনেটের ক্লায়েন্টদের থেকে রিকোয়েস্ট গ্রহণ করে ব্যাকএন্ড অ্যাপ্লিকেশন সার্ভারে ফরোয়ার্ড করে। Node.js সার্ভারকে সরাসরি পোর্ট ৮০ বা ৪৪৩-এ এক্সপোজ করা মারাত্মক ক্ষতিকর কারণ: (১) Node.js সিঙ্গেল-থ্রেডেড হওয়ায় SSL/TLS ক্রিপ্টোগ্রাফিক হ্যান্ডশেক প্রসেস করতে গিয়ে সিপিইউ ক্লান্ত হয়ে যায়। (২) Nginx সি (C) ল্যাঙ্গুয়েজে লেখা অত্যন্ত দ্রুত ও অপটিমাইজড ইভেন্ট-ড্রিভেন সার্ভার—যা স্ট্যাটিক ফাইল ক্যাশিং, Gzip কম্প্রেশন, SSL টার্মিনেশন, DDoS রেট লিমিটিং এবং লোড ব্যালেন্সিং একাই অনায়াসে হ্যান্ডেল করতে পারে এবং নোড সার্ভারকে নিরাপদ রাখে।",
          "b": "রিভার্স প্রক্সি ক্লায়েন্ট ও ব্যাকএন্ড সার্ভারের মাঝে মধ্যস্থতাকারী হিসেবে কাজ করে। নোড.জেএস সরাসরি এক্সপোজ করলে SSL হ্যান্ডশেক ও ভারী স্ট্যাটিক ফাইলে স্লো হয়ে যায়। Nginx সামনে থাকলে তা SSL টার্মিনেশন, ক্যাশিং এবং নিরাপত্তা রক্ষা করে নোড ব্যাকএন্ডকে মুক্ত রাখে।",
          "e": "A Reverse Proxy sits in front of backend web servers, intercepting client traffic and proxying requests. Exposing Node.js directly is dangerous: single-threaded Node.js is inefficient at SSL/TLS handshakes and static file serving. Nginx offloads SSL termination, static asset caching, Gzip compression, and DDoS protection at wire speed.",
          "tip": "বলো: 'Nginx acts as a high-performance shield offloading SSL termination, static file serving, and rate limiting from Node.js.'"
        },
        {
          "lvl": "lvl1",
          "q": "Nginx কনফিগারেশনে `proxy_pass` এবং গুরুত্বপূর্ণ প্রক্সি হেডারগুলোর কাজ কী?",
          "m": "`proxy_pass` নির্দেশ করে ইনকামিং রিকোয়েস্টটি কোন অভ্যন্তরীণ পোর্টে ফরোয়ার্ড হবে (যেমন `proxy_pass http://localhost:5000;`)। তবে প্রক্সি করার সাথে সাথে মূল ক্লায়েন্টের আইপি অ্যাড্রেস হারিয়ে যাওয়ার ঝুঁকি থাকে! তাই গুরুত্বপূর্ণ হেডারগুলো পাস করা বাধ্যতামূলক: (১) `proxy_set_header Host $host`: মূল ডোমেন নাম ব্যাকএন্ডে পাঠানো। (২) `proxy_set_header X-Real-IP $remote_addr`: ক্লায়েন্টের আসল আইপি অ্যাড্রেস পাঠানো। (৩) `proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for`: প্রক্সি চেইনের আইপি তালিকা। (৪) `proxy_set_header X-Forwarded-Proto $scheme`: রিকোয়েস্টটি HTTP নাকি HTTPS ছিল তা জানানো।",
          "b": "proxy_pass ব্যাকএন্ড সার্ভারে রিকোয়েস্ট পাঠায়। আর proxy_set_header ক্লায়েন্টের আসল আইপি (X-Real-IP) এবং প্রোটোকল (X-Forwarded-Proto) ব্যাকএন্ডে পাঠাতে ব্যবহৃত হয় যাতে ব্যাকএন্ড ক্লায়েন্টের প্রকৃত পরিচয় জানতে পারে।",
          "e": "proxy_pass forwards incoming client requests to upstream servers. Setting proxy headers (Host, X-Real-IP, X-Forwarded-For, X-Forwarded-Proto) ensures the backend application receives the authentic client IP address, hostname, and original connection protocol rather than Nginx's loopback address.",
          "code": "location /api/ {\n  proxy_pass http://127.0.0.1:5000;\n  proxy_set_header Host $host;\n  proxy_set_header X-Real-IP $remote_addr;\n  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n  proxy_set_header X-Forwarded-Proto $scheme;\n}"
        },
        {
          "lvl": "lvl1",
          "q": "Ubuntu সার্ভারে Let's Encrypt এবং `Certbot` ব্যবহার করে কীভাবে সম্পূর্ণ ফ্রিতে SSL/TLS সার্টিফিকেট কনফিগার ও অটো-রিনিউ করবে?",
          "m": "Certbot হলো ইলেকট্রনিক ফ্রন্টিয়ার ফাউন্ডেশন (EFF)-এর একটি অটোমেশন টুল। সেটআপের ধাপ: (১) Certbot এবং Nginx প্লাগইন ইনস্টল করা: `sudo apt install certbot python3-certbot-nginx`। (২) সার্টিফিকেট ইনস্টল ও Nginx কনফিগারেশন অটো-আপডেট: `sudo certbot --nginx -d dokani.bip.sg -d www.dokani.bip.sg`। Certbot স্বয়ংক্রিয়ভাবে ACME চ্যালেঞ্জ সম্পন্ন করে, SSL সার্টিফিকেট ডাউনলোড করে এবং Nginx কনফিগে HTTPS ও 443 পোর্ট ব্লক বসিয়ে দেয়। (৩) Certbot স্বয়ংক্রিয়ভাবে একটি সিস্টেম ক্রন বা systemd টাইমার বসায় (`certbot.timer`) যা সার্টিফিকেট ৯০ দিন পূর্ণ হওয়ার আগেই প্রতি ৬০ দিনে অটোমেটিক রিনিউ করে নেয়।",
          "b": "Certbot ইনস্টল করে certbot --nginx -d domain.com চালালেই স্বয়ংক্রিয়ভাবে ফ্রি SSL সার্টিফিকেট যুক্ত হয় এবং HTTP ট্রাফিক HTTPS-এ রিডাইরেক্ট হয়। systemd টাইমারের মাধ্যমে এটি প্রতি ৬০ দিন পর স্বয়ংক্রিয়ভাবে রিনিউ হয়ে যায়।",
          "e": "Certbot automates Let's Encrypt SSL/TLS provisioning. Running certbot --nginx -d example.com handles ACME domain validation, downloads x509 certificates, configures Nginx HTTPS blocks, and sets up 301 redirects. certbot.timer handles automated background renewal before 90-day expiry.",
          "code": "sudo apt install -y certbot python3-certbot-nginx\nsudo certbot --nginx -d dokani.bip.sg\n# Verify auto-renewal:\nsudo certbot renew --dry-run"
        },
        {
          "lvl": "lvl1",
          "q": "Ubuntu-তে Nginx কনফিগারেশন হায়ারার্কি (`sites-available` বনাম `sites-enabled`) কীভাবে সাজানো থাকে?",
          "m": "(১) `/etc/nginx/sites-available/`: এই ডিরেক্টরিতে আপনার সমস্ত ওয়েবসাইটের কনফিগারেশন ফাইল তৈরি ও ড্রাফট করা থাকে (যেমন `dokani.conf`)। এখানে ফাইল থাকা মানেই সাইটটি লাইভ নয়। (২) `/etc/nginx/sites-enabled/`: এই ডিরেক্টরিতে শুধুমাত্র সেই কনফিগারেশনগুলোর সিম্বলিক লিঙ্ক (Symlink) রাখা হয় যেগুলো বর্তমানে সার্ভারে সক্রিয় ও লাইভ! কোনো সাইট লাইভ করতে হলে লিঙ্ক করতে হয়: `sudo ln -s /etc/nginx/sites-available/dokani.conf /etc/nginx/sites-enabled/`। সাইট সাময়িক বন্ধ করতে চাইলে শুধুমাত্র সিম্বলিক লিঙ্কটি মুছে দিলেই হয়, মূল কনফিগ ফাইল অক্ষত থাকে।",
          "b": "sites-available এ সমস্ত কনফিগারেশন ফাইল সংরক্ষিত থাকে। আর sites-enabled এ শুধুমাত্র সক্রিয় সাইটগুলোর সিম্বলিক লিঙ্ক থাকে। ln -s দিয়ে লিঙ্ক যুক্ত করে সাইট লাইভ করা হয়।",
          "e": "sites-available stores configurations for all sites hosted on the server. sites-enabled contains symbolic links to files in sites-available that are actively served. Creating a symlink (ln -s) enables a site, while unlinking disables it without destroying configuration files.",
          "code": "sudo ln -s /etc/nginx/sites-available/dokani.conf /etc/nginx/sites-enabled/\nsudo nginx -t\nsudo systemctl reload nginx"
        },
        {
          "lvl": "lvl1",
          "q": "Nginx কনফিগারেশন পরিবর্তনের পর কেন সরাসরি `restart` না দিয়ে প্রথমে `nginx -t` এবং তারপর `reload` দিতে হয়?",
          "m": "মারাত্মক পার্থক্য: (১) `nginx -t`: কনফিগারেশন ফাইলগুলোতে কোনো সিনট্যাক্স এরর, মিসিং সেমিকোলন বা ভুল পাথ আছে কি না তা মেমোরিতে টেস্ট করে। যদি ভুল থাকে তবে সে পরিষ্কার এরর লাইন নম্বর বলে দেয়। আপনি যদি টেস্ট না করে সরাসরি রিস্টার্ট দেন এবং কনফিগে ভুল থাকে, তবে Nginx সার্ভিস ক্র্যাশ করে বন্ধ হয়ে যাবে এবং প্রোডাকশন সাইট সাথে সাথে ডাউন হয়ে যাবে! (২) `systemctl reload nginx`: কোনো অ্যাক্টিভ কানেকশন বা ট্রাফিক না কেটে (Zero-Downtime) ব্যাকগ্রাউন্ডে নতুন কনফিগারেশন লোড করে। তাই রুল: `nginx -t` পাস করলে তবেই `reload`! কখনোই ব্লাইন্ড রিস্টার্ট নয়।",
          "b": "nginx -t কনফিগারেশনের সিনট্যাক্স যাচাই করে। ভুল কনফিগে সরাসরি রিস্টার্ট দিলে সাইট ক্র্যাশ করে ডাউন হয়ে যায়। টেস্ট পাস করার পর reload দিলে কোনো কানেকশন ড্রপ ছাড়া জিরো-ডাউনটাইমে নতুন কনফিগ কার্যকর হয়।",
          "e": "nginx -t parses configuration syntax for errors without applying them. Issuing a blind restart on broken syntax immediately terminates Nginx, causing downtime. Once validated, systemctl reload nginx initiates a graceful zero-downtime worker re-spawn without dropping active client connections.",
          "tip": "বলো: 'Always test syntax with nginx -t before issuing a graceful reload; never blind restart.'"
        },
        {
          "lvl": "lvl2",
          "q": "Nginx-এ `upstream` ব্লক ব্যবহার করে Load Balancing কীভাবে কনফিগার করা হয় এবং ৩টি অ্যালগরিদমের নাম কী?",
          "m": "`upstream` ব্লক দিয়ে একাধিক ব্যাকএন্ড নোড সার্ভারের একটি পুল তৈরি করা হয়। Nginx ক্লায়েন্ট ট্রাফিক এই পুলের সার্ভারগুলোর মধ্যে সুষমভাবে ভাগ করে দেয়। ৩টি অ্যালগরিদম: (১) `Round Robin (ডিফল্ট)`: ক্রমানুসারে একটির পর একটি সার্ভারে রিকোয়েস্ট পাঠায়। (২) `least_conn`: যে সার্ভারে বর্তমানে সবচেয়ে কম অ্যাক্টিভ কানেকশন আছে সেখানে নতুন রিকোয়েস্ট পাঠায় (লম্বা রিকোয়েস্ট প্রসেসিংয়ের জন্য সেরা)। (৩) `ip_hash`: ক্লায়েন্টের আইপি হ্যাশ করে ট্রাফিক পাঠায়, ফলে নির্দিষ্ট ক্লায়েন্ট সবসময় একই নির্দিষ্ট ব্যাকএন্ড সার্ভারে হিট করে (Stateful Session Persistence-এর জন্য উপযোগী)।",
          "b": "upstream ব্লক একাধিক নোড সার্ভারের মাঝে ট্রাফিক ভাগ করে দেয়। রাউন্ড রবিন ক্রমানুসারে রিকোয়েস্ট পাঠায়, least_conn সবচেয়ে ফাঁকা সার্ভারে পাঠায় এবং ip_hash নির্দিষ্ট ক্লায়েন্টকে নির্দিষ্ট সার্ভারে যুক্ত রাখে।",
          "e": "The upstream directive groups backend server clusters. Algorithms: Round Robin distributes traffic sequentially; least_conn routes requests to the instance holding the fewest active connections; ip_hash deterministically binds clients to specific instances based on client IPv4/IPv6 hashes for sticky sessions.",
          "code": "upstream backend_cluster {\n  least_conn;\n  server 127.0.0.1:5001;\n  server 127.0.0.1:5002;\n  server 127.0.0.1:5003;\n}\nserver {\n  location / {\n    proxy_pass http://backend_cluster;\n  }\n}"
        },
        {
          "lvl": "lvl2",
          "q": "Nginx Rate Limiting (`limit_req_zone` এবং `limit_req`) কীভাবে ব্রুট-ফোর্স ও DDoS আক্রমণ প্রতিহত করে?",
          "m": "Nginx লিকি বাকেট (Leaky Bucket) অ্যালগরিদম ব্যবহার করে রিকোয়েস্টের গতি নিয়ন্ত্রণ করে। `http` ব্লকে একটি মেমোরি জোন ডিফাইন করি: `limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;` (প্রতিটি আইপির জন্য সেকেন্ডে সর্বোচ্চ ১০টি রিকোয়েস্ট)। এরপর সংবেদনশীল রাউটে (যেমন `/api/auth/login`) লিমিট বসাই: `limit_req zone=api_limit burst=5 nodelay;`। যদি কোনো আক্রমণকারী সেকেন্ডে শত শত রিকোয়েস্ট পাঠায়, তবে ৫টি বাফার ছাড়া বাকি সব রিকোয়েস্ট Nginx নিজেই `HTTP 429 Too Many Requests` দিয়ে ড্রপ করে দেয়—ব্যাকএন্ড নোড সার্ভারে ১টিও অপ্রয়োজনীয় লোড পৌঁছায় না।",
          "b": "limit_req_zone ক্লায়েন্ট আইপির ওপর ভিত্তি করে রিকোয়েস্টের গতিসীমা বেঁধে দেয়। অনুমোদিত সীমার বেশি রিকোয়েস্ট এলে Nginx নিজেই 429 Too Many Requests ফিরিয়ে দেয় এবং ব্যাকএন্ড নোড সার্ভারকে ব্রুট-ফোর্স আক্রমণ থেকে রক্ষা করে।",
          "e": "Nginx implements token/leaky bucket rate limiting via limit_req_zone. Bounding requests per IP (e.g. rate=10r/s) drops or queues bursting traffic. Excess abusive traffic is rejected immediately with HTTP 429 Too Many Requests at the reverse proxy layer, shielding backend CPU cycles.",
          "code": "limit_req_zone $binary_remote_addr zone=login_limit:10m rate=5r/s;\n\nlocation /api/v1/auth/login {\n  limit_req zone=login_limit burst=3 nodelay;\n  proxy_pass http://api_backend;\n}"
        },
        {
          "lvl": "lvl2",
          "q": "Nginx-এ WebSocket সংযোগ প্রক্সি করার জন্য কেন স্পেশাল হেডার কনফিগারেশন আবশ্যক?",
          "m": "WebSocket সংযোগ একটি স্ট্যান্ডার্ড HTTP রিকোয়েস্ট দিয়ে শুরু হয় কিন্তু পরে এটি দ্বিমুখী TCP সকেটে 'Upgrade' হয়। স্বাভাবিকভাবে Nginx প্রতিটি রিকোয়েস্টের `Connection` হেডার ড্রপ বা ক্লোজ করে দেয়, ফলে WebSocket হ্যান্ডশেক ব্যর্থ হয়। সমাধান: Nginx-এ স্পষ্টভাবে নির্দেশ দিতে হবে প্রোটোকল আপগ্রেড পাস করার জন্য: `proxy_http_version 1.1;`, `proxy_set_header Upgrade $http_upgrade;`, এবং `proxy_set_header Connection \"upgrade\";`। এই ৩টি হেডার থাকলে Nginx ক্লায়েন্ট ও ব্যাকএন্ডের মাঝের দীর্ঘস্থায়ী সকেট টানেলটি নির্বিঘ্নে বজায় রাখে।",
          "b": "ওয়েবসকেট হ্যান্ডশেক সফল করতে Nginx-এ proxy_http_version 1.1, Upgrade এবং Connection \"upgrade\" হেডার যোগ করতে হয়। অন্যথায় Nginx সকেট কানেকশন ড্রপ করে দেয়।",
          "e": "WebSockets initiate via HTTP 1.1 Upgrade handshakes. Nginx drops hop-by-hop HTTP headers by default, severing socket negotiations. Forwarding proxy_http_version 1.1 with explicit Upgrade and Connection 'upgrade' headers preserves bidirectional persistent TCP streams.",
          "code": "location /socket.io/ {\n  proxy_pass http://api_backend;\n  proxy_http_version 1.1;\n  proxy_set_header Upgrade $http_upgrade;\n  proxy_set_header Connection \"upgrade\";\n  proxy_read_timeout 86400s; # Keep long connections alive\n}"
        },
        {
          "lvl": "lvl2",
          "q": "Nginx Gzip Compression এবং Static Asset Caching কীভাবে ওয়েবসাইটের লোডিং স্পিড ৫ গুণ বাড়িয়ে দেয়?",
          "m": "Nginx টেক্সট-বেসড রেসপন্স (HTML, CSS, JS, JSON) অন-দ্য-ফ্লাই জিপ করে ক্লায়েন্টে পাঠাতে পারে (`gzip on; gzip_types text/plain application/javascript application/json;`)। এতে পে-লোড সাইজ ৭০-৮০% সংকুচিত হয়ে যায়। পাশাপাশি স্ট্যাটিক অ্যাসেটের জন্য (যেমন ইমেজ, ফন্ট, বান্ডেল ফাইল) ব্রাউজার ক্যাশিং হেডার সেট করা যায়: `expires 30d; add_header Cache-Control \"public, no-transform\";`। ব্রাউজার একবার ফাইল ডাউনলোড করলে পরবর্তী ৩০ দিন সার্ভারে কোনো রিকোয়েস্টই পাঠায় না—ফলে পেজ লোড হয় নিমেষে।",
          "b": "gzip দিয়ে HTML, CSS ও JS ফাইলের সাইজ ৭০% কমিয়ে নেটওয়ার্কে পাঠানো হয়। আর Cache-Control হেডার দিয়ে ব্রাউজারে স্ট্যাটিক ফাইল ক্যাশ করে রাখলে পেজ লোডিং গতি বহুগুণ বৃদ্ধি পায়।",
          "e": "Enabling gzip compression slashes text payload bandwidth consumption up to 80%. Supplementing with aggressive static asset Cache-Control headers (expires 30d; Cache-Control public) instructs client browsers to serve images and compiled JS directly from disk cache, dropping repeat-visit latency to zero.",
          "code": "gzip on;\ngzip_comp_level 6;\ngzip_types text/plain text/css application/json application/javascript text/xml;\n\nlocation ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff2)$ {\n  expires 30d;\n  add_header Cache-Control \"public, max-age=2592000, immutable\";\n}"
        },
        {
          "lvl": "lvl2",
          "q": "Nginx-এ `client_max_body_size` কী এবং ফাইল আপলোডে `413 Request Entity Too Large` এরর কীভাবে ফিক্স করবে?",
          "m": "Nginx বাই-ডিফল্ট সুরক্ষার স্বার্থে ইনকামিং রিকোয়েস্টের বডি সাইজ মাত্র ১ মেগাবাইটে (1MB) সীমাবদ্ধ রাখে (`client_max_body_size 1m;`)। যদি কোনো ইউজার ২MB সাইজের ছবি বা ইনভয়েস পিডিএফ আপলোড করে, তবে Nginx ব্যাকএন্ডে রিকোয়েস্ট না পাঠিয়েই ব্রাউজারে `413 Request Entity Too Large` এরর ফিরিয়ে দেয়। সমাধান: Nginx কনফিগের `http`, `server`, অথবা নির্দিষ্ট `/upload` লোকেশন ব্লকে লিমিট বাড়িয়ে দেওয়া: `client_max_body_size 25M;`। এরপর `nginx -s reload` দিলেই বড় ফাইল আপলোড সফল হয়।",
          "b": "ডিফল্টভাবে Nginx ১MB-র বেশি ফাইল আপলোড করতে দেয় না এবং 413 এরর দেয়। Nginx কনফিগে client_max_body_size 25M সেট করে লিমিট বৃদ্ধি করলেই বড় ফাইল আপলোড করা সম্ভব হয়।",
          "e": "Nginx defaults client_max_body_size to 1MB to protect buffers against memory saturation. When users upload images or documents exceeding 1MB, Nginx rejects the payload with HTTP 413. Elevate the limit inside the server or location block via client_max_body_size 25M.",
          "code": "server {\n  client_max_body_size 25M;\n  location /api/upload {\n    proxy_pass http://api_backend;\n  }\n}"
        },
        {
          "lvl": "lvl3",
          "q": "SSL/TLS Hardening: Nginx-এ SSL Labs 'A+' রেটিং পাওয়ার জন্য আধুনিক TLS সাইফার স্যুট ও HSTS কীভাবে কনফিগার করবে?",
          "m": "পুরনো ও অনিরাপদ প্রোটোকল (SSLv3, TLS 1.0, TLS 1.1) সম্পূর্ণ নিষিদ্ধ করতে হবে। কনফিগারেশন: (১) শুধুমাত্র আধুনিক প্রোটোকল চালু রাখা: `ssl_protocols TLSv1.2 TLSv1.3;`। (২) স্ট্রং সাইফার স্যুট স্পেসিফাই করা (`ECDHE-ECDSA-AES128-GCM-SHA256...`)। (৩) `HSTS (HTTP Strict Transport Security)` এনাবল করা: `add_header Strict-Transport-Security \"max-age=63072000; includeSubDomains; preload\" always;`—যা ব্রাউজারকে নির্দেশ করে পরবর্তী ২ বছর সাইটে শুধুমাত্র HTTPS দিয়ে ঢুকতে। (৪) `SSL Session Caching` ও `OCSP Stapling` চালু করা যাতে হ্যান্ডশেক গতি দ্রুত হয়।",
          "b": "A+ SSL রেটিং পেতে TLS 1.2 ও 1.3 চালু রেখে পুরনো প্রোটোকল বন্ধ করতে হয়। HSTS হেডার যোগ করে ব্রাউজারকে আজীবন HTTPS ব্যবহারে বাধ্য করা হয় এবং OCSP স্ট্যাপলিং দিয়ে সার্টিফিকেট ভেরিফিকেশন ফাস্ট করা হয়।",
          "e": "Achieving an SSL Labs A+ rating requires restricting protocols to ssl_protocols TLSv1.2 TLSv1.3, declaring strong forward-secrecy cipher suites, enabling OCSP Stapling, and enforcing HTTP Strict Transport Security (HSTS) with preload to prevent SSL-stripping man-in-the-middle attacks.",
          "code": "ssl_protocols TLSv1.2 TLSv1.3;\nssl_prefer_server_ciphers on;\nssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384';\nadd_header Strict-Transport-Security \"max-age=63072000; includeSubDomains; preload\" always;\nssl_stapling on;\nssl_stapling_verify on;"
        },
        {
          "lvl": "lvl3",
          "q": "Nginx Worker Architecture: `worker_processes`, `worker_connections`, এবং `epoll` কীভাবে হাই-কনকারেন্সি ট্রাফিক হ্যান্ডেল করে?",
          "m": "Nginx মাল্টি-প্রসেস ইভেন্ট-ড্রিভেন আর্কিটেকচার মেনে চলে: (১) `worker_processes auto;`: সার্ভারের উপলব্ধ সিপিইউ কোরের সমপরিমাণ ওয়ার্কার প্রসেস স্পন করে। (২) `worker_connections 1024;` বা `4096;`: প্রতিটি ওয়ার্কার প্রসেস একসাথে কতগুলো কনকারেন্ট সকেট হ্যান্ডেল করতে পারবে তা নির্দেশ করে। মোট কনকারেন্ট ক্লায়েন্ট ক্যাপাসিটি = `worker_processes * worker_connections`। (৩) লিনাক্সে Nginx ডিফল্টভাবে `epoll` ইভেন্ট মেকানিজম ব্যবহার করে—যা `O(1)` সময়ে লাখ লাখ সকেটের মধ্যে কোনটিতে ডেটা এসেছে তা ডিটেক্ট করে। কোনো ব্লকিং ছাড়াই একটি মাত্র সার্ভার ১০,০০০+ সমান্তরাল কানেকশন (C10K Problem) অনায়াসে হ্যান্ডেল করতে পারে।",
          "b": "Nginx সিপিইউ কোরের অনুপাতে worker_processes এবং প্রতি প্রসেসে worker_connections ব্যবহার করে। লিনাক্সের epoll মেকানিজম দিয়ে এটি কোনো সিপিইউ ওভারহেড ছাড়াই একসাথে হাজার হাজার সমান্তরাল ক্লায়েন্ট কানেকশন পরিচালনা করে।",
          "e": "Nginx utilizes an asynchronous, non-blocking master-worker architecture. worker_processes auto creates one worker per physical CPU core; each worker processes up to worker_connections connections concurrently via Linux kernel epoll, efficiently conquering the C10K concurrent socket concurrency ceiling.",
          "code": "worker_processes auto;\nevents {\n  worker_connections 4096;\n  use epoll;\n  multi_accept on;\n}"
        },
        {
          "lvl": "lvl3",
          "q": "Nginx মাইক্রো-ক্যাশিং (FastCGI / Proxy Cache) দিয়ে ডায়নামিক এপিআই রেসপন্সে ডাটাবেজ হিট ৯৯% কীভাবে কমাবে?",
          "m": "যেসব এপিআই ডেটা প্রতি সেকেন্ডে বদলায় না কিন্তু হাজার হাজার মানুষ হিট করে (যেমন প্রোডাক্ট ক্যাটালগ বা পাবলিক হোমপেজ), সেগুলোতে 'Micro-caching' যুগান্তকারী সমাধান। আমরা Nginx-এ মেমোরি জোন বানাই: `proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=api_cache:10m max_size=1g inactive=60m;`। এরপর এপিআই লোকেশনে নির্দেশ দিই: `proxy_cache api_cache; proxy_cache_valid 200 5s;` (রেসপন্স মাত্র ৫ সেকেন্ড ক্যাশ থাকবে)। এর ফলে প্রতি ৫ সেকেন্ডে প্রথম রিকোয়েস্টটি শুধু ডাটাবেজে যায় এবং পরবর্তী ৫০০০টি রিকোয়েস্ট Nginx সরাসরি মেমোরি থেকে ১ মিলিসেকেন্ডে রিটার্ন করে—ডেটাবেজের ওপর প্রেশার শূন্যে নেমে আসে! `proxy_cache_use_stale updating` ব্যাকগ্রাউন্ড রিফ্রেশ নিশ্চিত করে।",
          "b": "মাইক্রো-ক্যাশিং এপিআই রেসপন্স মাত্র ৫ সেকেন্ডের জন্য Nginx মেমোরিতে ক্যাশ করে রাখে। ফলে প্রতি ৫ সেকেন্ডে মাত্র ১টি রিকোয়েস্ট ডেটাবেজে যায় এবং বাকি হাজার হাজার ইউজার Nginx মেমোরি থেকে তাৎক্ষণিক ডেটা পায়।",
          "e": "Micro-caching stores dynamic API responses in Nginx memory for short bursts (e.g. 5 seconds). During traffic spikes, the initial request hydrates the cache, and all subsequent concurrent hits are served directly from Nginx RAM buffers in sub-millisecond time via proxy_cache_valid 200 5s.",
          "code": "proxy_cache_path /var/cache/nginx keys_zone=micro:10m levels=1:2 inactive=60s max_size=500m;\nlocation /api/products/public {\n  proxy_cache micro;\n  proxy_cache_valid 200 5s;\n  proxy_cache_use_stale error timeout updating http_500 http_502;\n  add_header X-Cache-Status $upstream_cache_status;\n  proxy_pass http://api_backend;\n}"
        },
        {
          "lvl": "lvl3",
          "q": "Nginx Security Headers: X-Frame-Options, CSP, X-Content-Type-Options, এবং Referrer-Policy কেন প্রোডাকশনে আবশ্যক?",
          "m": "সিকিউরিটি হেডারগুলো ব্রাউজার স্তরে বিভিন্ন সাইবার অ্যাটাক ব্লক করে: (১) `X-Frame-Options DENY / SAMEORIGIN`: সাইটকে অন্য কারও iframe-এ লোড হওয়া ঠেকায় (Clickjacking প্রতিরোধ)। (২) `X-Content-Type-Options nosniff`: ব্রাউজারকে ফাইলের MIME টাইপ অনুমান করা থেকে বিরত রাখে (MIME confusion attack রোধ)। (৩) `Content-Security-Policy (CSP)`: শুধুমাত্র অনুমোদিত উৎস থেকে স্ক্রিপ্ট চলা নিশ্চিত করে (XSS আক্রমণ নস্যাৎ করে)। (৪) `Referrer-Policy strict-origin-when-cross-origin`: থার্ড পার্টি সাইটে গোপনীয় ইউআরএল টোকেন বা রেফারার ফাঁস হওয়া আটকায়।",
          "b": "এই হেডারগুলো ব্রাউজারে ক্লিকজ্যাকিং, এক্সএসএস এবং ডেটা লিক হওয়া ঠেকায়। X-Frame-Options আইফ্রেম আক্রমণ বন্ধ করে, nosniff ফাইল টাইপ জালিয়াতি ঠেকায় এবং CSP ক্ষতিকর জাভাস্ক্রিপ্ট রান হওয়া প্রতিরোধ করে।",
          "e": "Security headers instruct browsers to enforce strict client-side sandboxing: X-Frame-Options SAMEORIGIN thwarts clickjacking, X-Content-Type-Options nosniff eliminates MIME-sniffing exploits, and a robust Content-Security-Policy (CSP) mitigates Cross-Site Scripting (XSS).",
          "code": "add_header X-Frame-Options \"SAMEORIGIN\" always;\nadd_header X-Content-Type-Options \"nosniff\" always;\nadd_header X-XSS-Protection \"1; mode=block\" always;\nadd_header Referrer-Policy \"strict-origin-when-cross-origin\" always;"
        },
        {
          "lvl": "lvl3",
          "q": "Zero-Downtime Deployment-এ Nginx Active Health Checks এবং `fail_timeout` / `max_fails` কীভাবে ব্যর্থ নোড বাদ দেয়?",
          "m": "আপস্ট্রিম ক্লাস্টারে যদি ৩টি নোড থাকে এবং ১টি নোড ক্র্যাশ করে, তবে ক্লায়েন্টরা যেন কোনো `502 Bad Gateway` এরর না পায়, সেজন্য Nginx প্যাসিভ হেলথচেক প্যারামিটার কনফিগার করা হয়: `server 127.0.0.1:5001 max_fails=3 fail_timeout=10s;`। এর অর্থ: যদি ৫০০১ পোর্টে পরপর ৩টি রিকোয়েস্ট ফেইল করে বা টাইমআউট হয়, তবে Nginx আগামী ১০ সেকেন্ডের জন্য ওই সার্ভারকে 'অসুস্থ' হিসেবে চিহ্নিত করবে এবং কোনো ক্লায়েন্ট ট্রাফিক পাঠাবে না! পাশাপাশি `proxy_next_upstream error timeout http_502;` ডিরেক্টিভ ক্লায়েন্টকে এরর না দেখিয়ে সাথে সাথে পরবর্তী সুস্থ সার্ভারে রিকোয়েস্টটি পুনরায় পাঠিয়ে দেয়।",
          "b": "max_fails ও fail_timeout দিয়ে কোনো সার্ভার নষ্ট হলে Nginx স্বয়ংক্রিয়ভাবে সেটিকে ট্রাফিক পাঠানো বন্ধ করে। proxy_next_upstream কমান্ড দিয়ে ফেইল্ড রিকোয়েস্টটি মুহূর্তে সুস্থ সার্ভারে ফরোয়ার্ড করে জিরো-এরর নিশ্চিত করা হয়।",
          "e": "Configuring max_fails=3 fail_timeout=10s on upstream server directives instructs Nginx to temporarily evict an unhealthy node upon three consecutive request drops. proxy_next_upstream error timeout http_502 immediately retries failed requests against alternate healthy nodes seamlessly.",
          "code": "upstream cluster {\n  server 127.0.0.1:5001 max_fails=3 fail_timeout=10s;\n  server 127.0.0.1:5002 max_fails=3 fail_timeout=10s;\n}\nserver {\n  location / {\n    proxy_pass http://cluster;\n    proxy_next_upstream error timeout http_502 http_503;\n  }\n}"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: ব্রাউজারে ইউজাররা হঠাৎ `502 Bad Gateway` এরর দেখতে পাচ্ছে। Nginx এরর লগে লেখা: `connect() failed (111: Connection refused) while connecting to upstream`। সমস্যা কোথায় এবং কীভাবে ট্রাবলশুট করবে?",
          "m": "সমস্যার অর্থ: Nginx সম্পূর্ণ সচল আছে, কিন্তু Nginx যে ব্যাকএন্ড পোর্টে রিকোয়েস্ট ফরোয়ার্ড করছে (যেমন `localhost:5000`), সেই পোর্টে কোনো ব্যাকএন্ড নোড অ্যাপ বা PM2 প্রসেস আদৌ চলছে না (বা ক্র্যাশ করেছে)! ট্রাবলশুটিং ধাপ: (১) চেক করব PM2 বা নোড সার্ভিস রানিং আছে কি না: `pm2 status` বা `systemctl status dokani`। (২) ব্যাকএন্ড এরর লগ চেক করব অ্যাপ কেন ক্র্যাশ করল: `pm2 logs`। (৩) `lsof -i :5000` দিয়ে পোর্ট চেক করব। ব্যাকএন্ড অ্যাপটি পুনরায় রান করালেই Nginx তৎক্ষণাৎ ট্রাফিক পাঠানো শুরু করবে এবং 502 এরর নির্মূল হবে।",
          "b": "502 Bad Gateway মানে Nginx ঠিক আছে কিন্তু ব্যাকএন্ড নোড সার্ভার বন্ধ বা ক্র্যাশ করেছে। pm2 status ও pm2 logs দিয়ে নোড অ্যাপ ক্র্যাশের কারণ দেখে রিস্টার্ট করলেই সমস্যা ঠিক হয়ে যায়।",
          "e": "HTTP 502 Bad Gateway with Connection Refused proves Nginx is healthy but unable to establish a TCP handshake with the upstream socket (port 5000). The Node.js application has crashed or terminated. Triage via pm2 status and inspect crash stack traces via pm2 logs.",
          "tip": "মনে রাখবে: '502 Bad Gateway is a backend application crash, not an Nginx failure.'"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: ক্লায়েন্ট ব্রাউজারে `504 Gateway Timeout` এরর আসছে। Nginx এরর লগে লেখা: `upstream timed out (110: Connection timed out) while reading response header from upstream`। এটি কেন ঘটছে এবং কীভাবে সমাধান করবে?",
          "m": "সমস্যার অর্থ: ব্যাকএন্ড নোড সার্ভার চালু আছে ঠিকই, কিন্তু ব্যাকএন্ডের কোনো একটি জটিল কুয়েরি বা ভারী প্রসেসিং শেষ হতে Nginx-এর ডিফল্ট টাইমআউটের (৬০ সেকেন্ড) চেয়ে বেশি সময় নিচ্ছে! সমাধান: (১) প্রাথমিক ফিক্স: Nginx লোকেশন ব্লকে প্রক্সি টাইমআউট বাড়ানো: `proxy_read_timeout 300s; proxy_connect_timeout 300s;`। (২) আসল রুট-কজ ফিক্স: ব্যাকএন্ডে দীর্ঘমেয়াদি কুয়েরি অপটিমাইজ করা অথবা ভারী কাজকে (যেমন বাল্ক পিডিএফ বা এক্সেল জেনারেশন) সিনক্রোনাস এপিআইতে না রেখে ব্যাকগ্রাউন্ড কিউতে (BullMQ) স্থানান্তর করা।",
          "b": "504 Gateway Timeout মানে ব্যাকএন্ডের প্রসেসিং শেষ হতে Nginx এর ডিফল্ট ৬০ সেকেন্ড সময়সীমা পার হয়ে গেছে। proxy_read_timeout বাড়িয়ে সাময়িক ফিক্স এবং ব্যাকগ্রাউন্ড কিউ ব্যবহার করে স্থায়ী ফিক্স করা হয়।",
          "e": "HTTP 504 Gateway Timeout means the upstream Node.js backend accepted the request but failed to return response headers within Nginx's proxy_read_timeout window (default 60s). Triage slow unindexed SQL queries, increase proxy_read_timeout 300s temporarily, and delegate heavy workloads to background job queues.",
          "code": "location /api/reports/heavy {\n  proxy_read_timeout 300s;\n  proxy_connect_timeout 75s;\n  proxy_pass http://api_backend;\n}"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: ডোমেন নেম পরিবর্তন করার পর ইউজাররা যখন `http://old-domain.com`-এ হিট করছে, তখন তাদের নির্বিঘ্নে `https://new-domain.com`-এ পার্মানেন্ট রিডাইরেক্ট করতে হবে। Nginx-এ কীভাবে কনফিগার করবে?",
          "m": "সমাধান: SEO র‍্যাঙ্কিং অক্ষুণ্ণ রেখে ট্রাফিক রি-রুট করার জন্য `301 Moved Permanently` রিডাইরেক্ট ব্যবহার করতে হবে। Nginx কনফিগে পুরনো ডোমেনের জন্য একটি সার্ভার ব্লক লিখব: `server_name old-domain.com www.old-domain.com; return 301 https://new-domain.com$request_uri;`। `$request_uri` যোগ করার কারণে ইউজারের নির্দিষ্ট পেজ পাথ (যেমন `/products/123`) অক্ষত অবস্থায় নতুন ডোমেনে রিডাইরেক্ট হয়ে যাবে।",
          "b": "পুরনো ডোমেনের সার্ভার ব্লকে return 301 https://new-domain.com$request_uri; লিখে দিলে সমস্ত পেজ ও ট্রাফিক এসইও অক্ষুণ্ণ রেখে স্বয়ংক্রিয়ভাবে নতুন ডোমেনে স্থানান্তরিত হয়।",
          "e": "Execute seamless SEO-preserving domain migration via an HTTP 301 permanent redirect block. Matching $request_uri captures the full path and query string parameters, transparently forwarding visitors to the destination domain.",
          "code": "server {\n  listen 80;\n  listen 443 ssl;\n  server_name old-domain.com www.old-domain.com;\n  return 301 https://new-domain.com$request_uri;\n}"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: ব্যাকএন্ড নোড অ্যাপ্লিকেশনে ক্লায়েন্টের আইপি চেক করতে গিয়ে দেখা যাচ্ছে সবার আইপি সবসময় `127.0.0.1` দেখাচ্ছে! ফলে রেট লিমিটিং এবং জিও-ব্লকিং কাজ করছে না। কীভাবে Nginx ও Express-এ এটি ঠিক করবে?",
          "m": "কারণ: Nginx থেকে ব্যাকএন্ডে রিকোয়েস্ট যাওয়ার সময় নোড অ্যাপ ভাবছে Nginx-ই আসল ক্লায়েন্ট। ফিক্স: (১) Nginx-এ অবশ্যই হেডার দিতে হবে: `proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;` এবং `proxy_set_header X-Real-IP $remote_addr;`। (২) সবচেয়ে গুরুত্বপূর্ণ: Express.js অ্যাপ্লিকেশনের শুরুতে `app.set('trust proxy', 1);` কনফিগার করতে হবে! এটি এক্সপ্রেসকে নির্দেশ করে Nginx-এর পাঠানো `X-Forwarded-For` হেডারটিকে বিশ্বাস করতে। এরপর `req.ip` কল করলে গ্রাহকের আসল পাবলিক আইপি পাওয়া যাবে।",
          "b": "এক্সপ্রেস অ্যাপ Nginx-কে ক্লায়েন্ট ভাবার কারণে আইপি 127.0.0.1 দেখাচ্ছে। Nginx-এ X-Forwarded-For হেডার এবং এক্সপ্রেসে app.set('trust proxy', 1) যোগ করলেই req.ip দিয়ে ইউজারের আসল আইপি পাওয়া যায়।",
          "e": "Express sees localhost (127.0.0.1) because Nginx acts as the direct TCP peer. Resolve by passing X-Forwarded-For in Nginx, and declaring app.set('trust proxy', 1) in Express. Express will then populate req.ip from the authentic client IP forwarded in the header.",
          "code": "// Express configuration:\napp.set('trust proxy', 1);\napp.get('/api/whoami', (req, res) => res.json({ ip: req.ip }));"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: তোমার সাইটে হঠাৎ করে বটনেট অ্যাটাক হচ্ছে এবং মিনিটে ৫০,০০০ রিকোয়েস্ট আসছে নির্দিষ্ট কিছু কান্ট্রি বা ইউজার-এজেন্ট থেকে। Nginx দিয়ে কীভাবে মুহূর্তের মধ্যে এই ট্রাফিক ড্রপ করবে?",
          "m": "তাৎক্ষণিক সমাধান: (১) ক্ষতিকর ইউজার-এজেন্ট ব্লক করা: Nginx কনফিগে শর্ত দেব `if ($http_user_agent ~* (SemrushBot|AhrefsBot|python-requests)) { return 403; }`। (২) নির্দিষ্ট ক্ষতিকর আইপি বা সাবনেট ব্লক করা: `deny 198.51.100.0/24;`। (৩) এমার্জেন্সি রেট লিমিটিং সক্রিয় করে সংযোগ ড্রপ করা। কনফিগ সেভ করে `nginx -s reload` দিলে এক সেকেন্ডের মধ্যে Nginx কোনো সিপিইউ অপচয় ছাড়াই কার্নেল লেভেলে ওই লাখ লাখ রিকোয়েস্ট ড্রপ করে দেবে।",
          "b": "Nginx এ deny <ip> এবং if ($http_user_agent ~* bot) { return 403; } রুল লিখে এক সেকেন্ডে reload দিলেই ক্ষতিকর বট ও আক্রমণকারী আইপিগুলো তাত্ক্ষণিকভাবে ব্লক হয়ে যায়।",
          "e": "Block malicious floods directly at Nginx before hitting the application tier: map abusive User-Agents to return 403, and block culprit CIDR subnets using deny directives. A zero-downtime nginx -s reload immediately stems the attack.",
          "code": "location / {\n  if ($http_user_agent ~* (curl|wget|python-requests|scrapy)) {\n    return 403;\n  }\n  deny 203.0.113.50;\n  proxy_pass http://api_backend;\n}"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা (Dokani SaaS): Dokani-তে হাজার হাজার দোকানের কাস্টম সাবডোমেন (`*.dokani.bip.sg`) এবং কাস্টম ডোমেন কীভাবে Nginx ওয়াইল্ডকার্ড রাউটিং দিয়ে পরিচালনা করা হয়?",
          "m": "দোকানি পিওএসে প্রতিটি মার্চেন্টের নিজস্ব সাবডোমেন থাকে (যেমন `bata.dokani.bip.sg`)। আমরা প্রতি দোকানের জন্য আলাদা আলাদা কনফিগ ফাইল না লিখে একটি একক ওয়াইল্ডকার্ড Nginx ব্লক ব্যবহার করি: `server_name ~^(?<subdomain>.+)\\.dokani\\.bip\\.sg$;`। Nginx রেগুলার এক্সপ্রেশন দিয়ে সাবডোমেনটি ক্যাপচার করে এবং ব্যাকএন্ড নোড সার্ভারে একটি কাস্টম হেডার হিসেবে পাস করে: `proxy_set_header X-Tenant-Subdomain $subdomain;`। এর ফলে নতুন কোনো দোকান সাইন আপ করলে Nginx-এ কোনো ফাইল এডিট বা রিলোড করা লাগে না—সিস্টেম ইনস্ট্যান্টলি নতুন সাবডোমেন হ্যান্ডেল করে!",
          "b": "দোকানিতে ওয়াইল্ডকার্ড রেজেক্স (server_name ~^(?<subdomain>.+)\\.dokani\\.bip\\.sg$;) ব্যবহার করা হয়েছে। Nginx সাবডোমেন ক্যাপচার করে ব্যাকএন্ডে পাঠায়, ফলে নতুন দোকান খুললে Nginx রিলোড ছাড়াই সাথে সাথে কাজ করে।",
          "e": "In Dokani POS, multi-tenant subdomains (*.dokani.bip.sg) are routed dynamically via an Nginx named-regex capture: server_name ~^(?<subdomain>.+)\\.dokani\\.bip\\.sg$;. Nginx forwards the extracted subdomain in an X-Tenant-Subdomain proxy header, enabling zero-config instant merchant onboarding.",
          "code": "server {\n  server_name ~^(?<tenant>.+)\\.dokani\\.bip\\.sg$;\n  location / {\n    proxy_pass http://api_cluster;\n    proxy_set_header X-Tenant-Slug $tenant;\n  }\n}"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: সিঙ্গেল সার্ভারে Next.js ফ্রন্টএন্ড এবং Node.js ব্যাকএন্ড এপিআইকে Nginx পাথ-বেসড রাউটিং দিয়ে কীভাবে সাজাবে?",
          "m": "আমরা একটি একক Nginx কনফিগে পাথ-বেসড রাউটিং সাজাই: (১) সমস্ত এপিআই ট্রাফিক `/api/` দিয়ে শুরু হলে তা ব্যাকএন্ড নোড ক্লাস্টারে প্রক্সি করি: `location /api/ { proxy_pass http://127.0.0.1:5000; }`। (২) রিয়েলটাইম সকেট সংযোগের জন্য: `location /socket.io/ { proxy_pass http://127.0.0.1:5000; ... }`। (৩) বাকি সমস্ত পাবলিক ওয়েব ট্রাফিক Next.js অ্যাপ্লিকেশনে প্রক্সি করি: `location / { proxy_pass http://127.0.0.1:3000; }`। (৪) Next.js-এর স্ট্যাটিক বিল্ড ফাইলগুলো সরাসরি ডিস্ক থেকে ক্যাশড আকারে সার্ভ করতে: `location /_next/static/ { alias /var/www/frontend/.next/static/; expires 365d; }`। এটি ফ্রন্টএন্ড ও ব্যাকএন্ডের মাঝের CORS জটিলতা চিরতরে দূর করে।",
          "b": "একই ডোমেনে /api/ পাথ ব্যাকএন্ডে এবং বাকি পাথ / নেক্সট.জেএস ফ্রন্টএন্ডে রুট করা হয়। আর _next/static/ সরাসরি ডিস্ক থেকে সার্ভ করায় কোনো CORS সমস্যা থাকে না এবং পারফরম্যান্স সর্বোচ্চ থাকে।",
          "e": "Unify Next.js and Node API tiers behind a single origin via path-based routing: /api/ routes to port 5000, / routes to port 3000, and /_next/static/ is served directly from filesystem cache with immutable 365-day expiry headers, eliminating cross-origin CORS latency entirely.",
          "code": "location /api/ {\n  proxy_pass http://127.0.0.1:5000;\n}\nlocation /_next/static/ {\n  alias /var/www/dokani-web/.next/static/;\n  expires 365d;\n  access_log off;\n}\nlocation / {\n  proxy_pass http://127.0.0.1:3000;\n}"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: জিরো-ডাউনটাইম ডিপ্লয়মেন্টে Nginx রিলোড মেকানিজম কীভাবে ব্যাকগ্রাউন্ডে ইন-ফ্লাইট কানেকশন ড্রপ না করে নতুন কোড লাইভ করে?",
          "m": "যখন আপনি `sudo systemctl reload nginx` চালান: (১) Nginx মাস্টার প্রসেস নতুন কনফিগারেশন ফাইল সিনট্যাক্স চেক করে পড়ে। (২) মাস্টার প্রসেস নতুন কনফিগারেশন দিয়ে নতুন সেট 'Worker Processes' স্পন করে যারা নতুন ইনকামিং কানেকশন হ্যান্ডেল করা শুরু করে। (৩) একই সাথে মাস্টার প্রসেস পুরনো ওয়ার্কার প্রসেসগুলোকে একটি 'Graceful Shutdown' সিগন্যাল পাঠায়। পুরনো ওয়ার্কাররা নতুন কোনো রিকোয়েস্ট নেয় না, কিন্তু তাদের সাথে ইতিমধ্যে কানেক্টেড থাকা গ্রাহকদের রিকোয়েস্ট সফলভাবে শেষ হওয়া পর্যন্ত জীবিত থাকে। শেষ রিকোয়েস্ট সম্পন্ন হলে পুরনো ওয়ার্কাররা নীরবে বন্ধ হয়ে যায়। ফলে ১ জন গ্রাহকের কানেকশনও কোনো ড্রপ ছাড়াই সম্পূর্ণ নতুন রিলিজ লাইভ হয়ে যায়।",
          "b": "Nginx reload মাস্টার প্রসেস দিয়ে নতুন কনফিগে নতুন ওয়ার্কার চালু করে এবং পুরনো ওয়ার্কারগুলোকে চলমান রিকোয়েস্ট শেষ করার সময় দেয়। ফলে কোনো ইউজারের কানেকশন না কেটে জিরো-ডাউনটাইমে রিলিজ সম্পন্ন হয়।",
          "e": "systemctl reload nginx prompts the master process to re-parse configurations and spawn new worker processes. The master instructs aged workers to cease accepting new connections and gracefully drain active in-flight sockets before terminating, achieving true zero-downtime reconfiguration.",
          "tip": "বলো: 'Nginx reload spawns new workers while letting legacy workers gracefully drain in-flight connections.'"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: Nginx Access Log বিশ্লেষণ ও Grafana/Prometheus দিয়ে লাইভ রিকোয়েস্ট অ্যানালিটিক্স কীভাবে মনিটর করবে?",
          "m": "আমরা Nginx-এর ডিফল্ট লগ ফরম্যাট পরিবর্তন করে একটি স্ট্রাকচার্ড JSON লগ ফরম্যাট ডিফাইন করি যাতে `$remote_addr`, `$request_time` (ল্যাটেন্সি), `$status` (200, 404, 500), এবং `$upstream_response_time` থাকে। এরপর `Vector` বা `Promtail` এজেন্ট দিয়ে এই লগ স্ক্র্যাপ করে `Loki` এবং `Grafana`-তে পুশ করি। ড্যাশবোর্ডে আমরা লাইভ রিকোয়েস্ট পার সেকেন্ড (RPS), p99 রেসপন্স ল্যাটেন্সি এবং 5xx এরর রেট গ্রাফে মনিটর করি। কোনো এপিআই স্লো হলে বা 502 এরর স্পাইক করলেই সেকেন্ডের মধ্যে গ্রাফানা থেকে স্ল্যাক এলার্ট ফায়ার করে।",
          "b": "Nginx লগকে JSON ফরম্যাটে রূপান্তর করে ভেক্টর বা প্রমতেল দিয়ে গ্রাফানায় লাইভ ড্যাশবোর্ড তৈরি করা হয়। এতে রিকোয়েস্ট পার সেকেন্ড, এরর রেট এবং ল্যাটেন্সি রিয়েলটাইমে পর্যবেক্ষণ করা যায়।",
          "e": "Configure Nginx log_format to emit structured JSON containing request_time, upstream_response_time, and status codes. Ship logs via Promtail/Fluentbit into Grafana Loki to visualize live RPS, p99 latencies, and automated 5xx alerting thresholds.",
          "code": "log_format json_analytics escape=json\n  '{\"time\": \"$time_iso8601\", \"client\": \"$remote_addr\", '\n  '\"status\": $status, \"duration\": $request_time, '\n  '\"upstream_time\": \"$upstream_response_time\", \"uri\": \"$uri\"}';\naccess_log /var/log/nginx/analytics.log json_analytics;"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: Nginx Maintenance Page (503 Service Temporarily Unavailable) ফ্ল্যাগ ফাইল দিয়ে মুহূর্তের মধ্যে কীভাবে অন/অফ করবে?",
          "m": "পরিকল্পিত বড় ডাটাবেজ মাইগ্রেশনের সময় সাইটে পরিচ্ছন্ন মেইনটেন্যান্স পেজ দেখানো প্রয়োজন যাতে ইউজারের রিকোয়েস্ট ড্রপ না করে। প্রোডাকশন ট্রিক: Nginx কনফিগে একটি ফাইল এক্সিস্টেন্স চেক বসাই: `if (-f /var/www/dokani/maintenance.flag) { return 503; }`। এরপর এরর পেজ হ্যান্ডলারে সুন্দর একটি `maintenance.html` ম্যাপ করি। যখন মেইনটেন্যান্স শুরু করতে চাই, টার্মিনালে শুধু কমান্ড দিই: `touch /var/www/dokani/maintenance.flag`—মুহূর্তের মধ্যে সমস্ত ট্রাফিকে মেইনটেন্যান্স পেজ চলে আসে কোনো Nginx রিলোড ছাড়াই! কাজ শেষ হলে `rm /var/www/dokani/maintenance.flag` দিলেই সাইট সাথে সাথে আবার লাইভ হয়ে যায়।",
          "b": "Nginx এ maintenance.flag ফাইলের অস্তিত্ব যাচাই করে 503 এরর পেজ দেখানোর নিয়ম করা হয়। touch maintenance.flag দিলেই সাইট মেইনটেন্যান্স মোডে চলে যায় এবং rm করলেই আবার লাইভ হয় কোনো রিলোড ছাড়াই।",
          "e": "Implement instant zero-reload maintenance mode by evaluating file existence via if (-f /var/run/maintenance.flag) { return 503; }. Touching or unlinking the flag file toggles maintenance state across global traffic instantaneously without touching Nginx configs.",
          "code": "error_page 503 /maintenance.html;\nlocation = /maintenance.html {\n  root /var/www/html;\n}\nlocation / {\n  if (-f /var/www/maintenance.flag) {\n    return 503;\n  }\n  proxy_pass http://api_backend;\n}"
        }
      ]
    },
    {
      "id": "pm2-process-management",
      "name": "PM2 Process Management & Cluster Architecture",
      "desc": "ecosystem.config.js, Cluster Mode vs Fork Mode, Zero-Downtime Reload, Memory Limits, PM2 Startup, Log Rotation, Graceful IPC",
      "items": [
        {
          "lvl": "lvl1",
          "q": "PM2 কী এবং প্রোডাকশনে সরাসরি `node server.js` বা `npm start` চালানো কেন মারাত্মক ক্ষতিকর?",
          "m": "সরাসরি `node server.js` কমান্ড চালালে নোড প্রসেসটি ইউজারের বর্তমান SSH টার্মিনাল সেশনের সাথে সংযুক্ত থাকে। টার্মিনাল ক্লোজ করার সাথে সাথে সার্ভার বন্ধ হয়ে যাবে! এছাড়া অ্যাপ্লিকেশনে কোনো একটি আনক্যাচড এরর (`Unhandled Rejection` বা `uncaughtException`) ঘটলে পুরো নোড সার্ভার ক্র্যাশ করে অফলাইন হয়ে বসে থাকবে—নিজে থেকে কখনো রিস্টার্ট হবে না। PM2 (Process Manager 2) হলো একটি প্রোডাকশন প্রসেস ম্যানেজার যা ব্যাকগ্রাউন্ডে সার্বক্ষণিক ডেমন হিসেবে অ্যাপ চালায়, অ্যাপ ক্র্যাশ করলে ১ মিলিসেকেন্ডে অটো-রিস্টার্ট করে, সার্ভার রিবুট হলে অটো-বুট করায় এবং মাল্টি-কোর সিপিইউ ইউটিলাইজেশনের জন্য ক্লাস্টার মোড সরবরাহ করে।",
          "b": "টার্মিনাল বন্ধ করলে node server.js বন্ধ হয়ে যায় এবং কোনো এরর হলে অ্যাপ ক্র্যাশ করে স্থায়ীভাবে ডাউন থাকে। PM2 ব্যাকগ্রাউন্ডে ডেমন হিসেবে অ্যাপ সচল রাখে, কোনো ক্র্যাশে সাথে সাথে অটো-রিস্টার্ট করে এবং সিপিইউ-এর পূর্ণ ব্যবহার নিশ্চিত করে।",
          "e": "Running raw node server.js binds execution to the active SSH session; closing the terminal or hitting an unhandled exception terminates the application permanently. PM2 acts as an enterprise process supervisor daemon that automatically restarts crashed instances in milliseconds, enables multi-core clustering, and persists across OS reboots.",
          "tip": "বলো: 'PM2 ensures continuous daemon supervision, sub-millisecond crash recovery, and multi-core cluster scaling.'"
        },
        {
          "lvl": "lvl1",
          "q": "PM2-তে `pm2 restart` এবং `pm2 reload`-এর মধ্যে পার্থক্য কী এবং ডিপ্লয়মেন্টে কোনটি ব্যবহার করা উচিত?",
          "m": "মারাত্মক আর্কিটেকচারাল পার্থক্য: (১) `pm2 restart`: সব রানিং প্রসেসকে এক সেকেন্ডে কিল করে তারপর নতুন প্রসেস চালু করে। এই মাঝখানের ২-৫ সেকেন্ড পুরো অ্যাপ ডাউন থাকে এবং চলমান ক্লায়েন্টদের কানেকশন ড্রপ করে। (২) `pm2 reload` (Zero-Downtime Reload): এটি একটি একটি করে প্রসেস রিলোড করে! ক্লাস্টার মোডে সে প্রথমে প্রসেস ১-কে রিলোড করে অপেক্ষা করে; প্রসেস ১ রেডি হলে ট্রাফিক সেখানে পাঠায় এবং তারপর প্রসেস ২-কে রিলোড করে। ফলে কোনো গ্রাহক ১ মিলিসেকেন্ডের জন্যও কোনো ড্রপ বা ডাউনটাইম পায় না। প্রোডাকশন ডিপ্লয়মেন্টে সবসময় `pm2 reload` ব্যবহার করতে হবে।",
          "b": "pm2 restart সব প্রসেস একসাথে বন্ধ করে চালু করায় কিছু সময় সাইট ডাউন থাকে। pm2 reload একটি একটি করে প্রসেস রিলোড করে, ফলে কোনো কানেকশন ড্রপ ছাড়া জিরো-ডাউনটাইমে নতুন কোড কার্যকর হয়।",
          "e": "pm2 restart terminates all running worker processes concurrently, creating a brief downtime window where in-flight connections fail. pm2 reload achieves true Zero-Downtime: it restarts cluster workers sequentially (rolling reload), maintaining service availability continuously throughout the release.",
          "code": "# Always reload in production CI/CD:\npm2 reload ecosystem.config.js --update-env"
        },
        {
          "lvl": "lvl1",
          "q": "PM2 Cluster Mode কী এবং Node.js-এর সিঙ্গেল-থ্রেডেড সীমাবদ্ধতা এটি কীভাবে সমাধান করে?",
          "m": "Node.js ডিফল্টভাবে সিঙ্গেল-থ্রেডেড—অর্থাৎ আপনার ক্লাউড VPS-এ ৪টি বা ৮টি সিপিইউ কোর থাকলেও একটি নোড প্রসেস মাত্র ১টি কোর ব্যবহার করতে পারে, বাকি ৩-৭টি কোর অলস বসে থাকে! PM2 Cluster Mode নোডের নেটিভ `cluster` মডিউল ব্যবহার করে সার্ভারের প্রতিটি সিপিইউ কোরের জন্য একটি করে স্বাধীন নোড চাইল্ড প্রসেস স্পন করে এবং একই পোর্টে ইনকামিং ট্রাফিক ইন্টারনালি রাউন্ড-রবিন ব্যালেন্সে ভাগ করে দেয়। ফলে সার্ভারের থ্রুপুট ৪ গুণ থেকে ৮ গুণ বৃদ্ধি পায় কোনো কোড পরিবর্তন ছাড়াই।",
          "b": "নোড সিঙ্গেল থ্রেডেড হওয়ায় সাধারণ অবস্থায় মাত্র একটি সিপিইউ কোর ব্যবহার করে। PM2 ক্লাস্টার মোড প্রতিটি কোরের জন্য আলাদা প্রসেস তৈরি করে একই পোর্টে ট্রাফিক ভাগ করে দেয়, ফলে সার্ভারের কর্মক্ষমতা বহুগুণ বাড়ে।",
          "e": "Because Node.js runs on a single thread, a default process leaves multi-core hardware largely idle. PM2 Cluster Mode spawns child worker instances matching available CPU cores, sharing the target HTTP port and distributing traffic seamlessly to scale throughput linear to physical cores.",
          "code": "pm2 start dist/server.js -i max --name dokani-api"
        },
        {
          "lvl": "lvl1",
          "q": "সার্ভার রিবুট বা পাওয়ার রিস্টার্টের পর PM2 অ্যাপগুলো যেন স্বয়ংক্রিয়ভাবে চালু হয় তার জন্য কী কী কমান্ড চালাতে হয়?",
          "m": "দুটি গোল্ডেন কমান্ড: (১) `pm2 startup`: এই কমান্ডটি রান করলে PM2 সিস্টেমের ওএস সনাক্ত করে (systemd / upstart) এবং টার্মিনালে একটি স্পেসিফিক `sudo env PATH=...` কমান্ড প্রিন্ট করে। সেই কমান্ডটি কপি করে টার্মিনালে এন্টার মারলে systemd-তে একটি স্থায়ী PM2 বুট সার্ভিস রেজিস্টার হয়। (২) `pm2 save`: বর্তমান রানিং সব প্রসেসের স্টেট, নাম ও এনভায়রনমেন্ট মেমোরি থেকে একটি ফাইলে (`~/.pm2/dump.pm2`) সেভ করে রাখে। এরপর সার্ভার রিবুট হওয়া মাত্রই systemd পিএম২-কে কল করে এবং পিএম২ সেভ করা সব অ্যাপ স্বয়ংক্রিয়ভাবে বুট করে দেয়।",
          "b": "pm2 startup চালিয়ে আউটপুটের সুডো কমান্ডটি এক্সিকিউট করতে হয় এবং pm2 save দিয়ে বর্তমান প্রসেস তালিকা সেভ করতে হয়। এর ফলে সার্ভার রিস্টার্ট হলেও সব অ্যাপ নিজে নিজে চালু হয়ে যায়।",
          "e": "Generate and register system boot scripts via pm2 startup. Execute the generated sudo command to hook PM2 into the systemd initialization lifecycle. Then run pm2 save to freeze the active process snapshot to ~/.pm2/dump.pm2 for automatic post-reboot recovery.",
          "code": "pm2 startup\n# Copy-paste the generated sudo command, then:\npm2 save"
        },
        {
          "lvl": "lvl1",
          "q": "PM2 দিয়ে লাইভ লগ পর্যবেক্ষণ ও ট্রাবলশুটিং করার কমান্ডগুলো কী?",
          "m": "(১) `pm2 logs`: সমস্ত অ্যাপ্লিকেশনের লাইভ কনসোল আউটপুট (`console.log`) ও এরর স্ট্রিম রিয়েলটাইমে টার্মিনালে দেখায়। (২) `pm2 logs dokani-api --lines 100`: নির্দিষ্ট অ্যাপের সর্বশেষ ১০০ লাইনের লগ দেখায়। (৩) `pm2 monit`: একটি সুন্দর টার্মিনাল ড্যাশবোর্ড খোলে যেখানে প্রতি প্রসেসের লাইভ CPU ব্যবহার, মেমোরি এবং ইভেন্ট লুপ পর্যবেক্ষণ করা যায়। (৪) `pm2 flush`: পুরনো জমে থাকা সব লগ ফাইল মুহূর্তে খালি করে ডিস্ক স্পেস রিলিজ করে।",
          "b": "pm2 logs দিয়ে লাইভ এরর ও কনসোল লগ দেখা যায়, pm2 monit দিয়ে সিপিইউ ও র‍্যাম মনিটর করা যায় এবং pm2 flush দিয়ে পুরনো লগ মুছে ডিস্ক খালি করা যায়।",
          "e": "Inspect unified real-time application stdout and stderr logs via pm2 logs. Target specific applications using pm2 logs <app-name> --lines 100. Open the interactive terminal CPU/RAM dashboard via pm2 monit, and purge accumulated disk log files via pm2 flush.",
          "code": "pm2 logs dokani-api --err --lines 50\npm2 monit\npm2 flush"
        },
        {
          "lvl": "lvl2",
          "q": "PM2 `ecosystem.config.js` ফাইলের মূল স্ট্রাকচার কী এবং এতে কী কী প্রোপার্টি ডিফাইন করা হয়?",
          "m": "`ecosystem.config.js` হলো PM2-এর প্রোডাকশন কনফিগারেশন ব্লুপ্রিন্ট। এতে `apps` অ্যারের ভেতরে প্রতিটি সার্ভিসের নিয়ম লেখা হয়: `name` (অ্যাপের নাম), `script` (শুরুর ফাইল যেমন `dist/server.js`), `instances: 'max'` (সব কোরে ক্লাস্টার চালানো), `exec_mode: 'cluster'`, `autorestart: true` (ক্র্যাশে অটো রিস্টার্ট), `max_memory_restart: '1G'` (মেমোরি লিকে রিস্টার্ট), `env` (ডিফল্ট এনভায়রনমেন্ট), `env_production` (প্রোডাকশন এনভায়রনমেন্ট ভ্যারিয়েবল), এবং লগ ফাইলের পাথ (`error_file`, `out_file`)। এটি ভার্সন কন্ট্রোলে সেভ রেখে ডিপ্লয়মেন্ট ১০০% প্রেডিক্টেবল করা হয়।",
          "b": "ecosystem.config.js ফাইলে অ্যাপের নাম, স্ক্রিপ্ট পাথ, ক্লাস্টার মোড, মেমোরি লিমিট এবং এনভায়রনমেন্ট ভ্যারিয়েবল সুন্দরভাবে সাজিয়ে রাখা হয় যা ডিপ্লয়মেন্ট সহজ ও নির্ভুল করে।",
          "e": "An ecosystem.config.js declaratively dictates deployment architectures: name, entry script, exec_mode: 'cluster', instances: 'max', auto-restart policies, max_memory_restart thresholds, dedicated log file routes, and isolated environment configurations (env_production).",
          "code": "module.exports = {\n  apps: [{\n    name: 'dokani-api',\n    script: './dist/server.js',\n    instances: 'max',\n    exec_mode: 'cluster',\n    autorestart: true,\n    max_memory_restart: '800M',\n    env_production: {\n      NODE_ENV: 'production',\n      PORT: 5000\n    }\n  }]\n};"
        },
        {
          "lvl": "lvl2",
          "q": "PM2-তে `max_memory_restart` প্রোপার্টির গুরুত্ব কী এবং মেমোরি লিক থেকে সার্ভার বাঁচাতে এটি কীভাবে সাহায্য করে?",
          "m": "Node.js অ্যাপ্লিকেশনে কোনো লাইব্রেরি বা কোডের ভুলের কারণে মেমোরি লিক (Memory Leak) থাকলে র‍্যামের ব্যবহার ধীরে ধীরে বাড়তে থাকে (যেমন ২০০MB থেকে বাড়তে বাড়তে ১.৮GB)। যদি এটি নিয়ন্ত্রণ না করা হয়, তবে পুরো সার্ভারের ফিজিক্যাল র‍্যাম শেষ হয়ে ডাটাবেজ সহ সম্পূর্ণ সার্ভার ক্র্যাশ করবে! `max_memory_restart: '800M'` কনফিগার করলে PM2 সার্বক্ষণিক প্রসেসটির র‍্যাম পর্যবেক্ষণ করে। যখনই র‍্যাম ৮০০MB ছাড়িয়ে যাবে, PM2 অতি সাবলীলভাবে ওই নির্দিষ্ট প্রসেসটিকে রিলোড করে মেমোরি ফ্রেশ করে দেবে—অন্যান্য প্রসেসগুলো ট্রাফিক হ্যান্ডেল করতে থাকবে এবং সার্ভার ক্র্যাশ হওয়া থেকে শতভাগ বেঁচে যাবে।",
          "b": "মেমোরি লিকের কারণে অ্যাপের র‍্যাম অস্বাভাবিক বেড়ে পুরো সার্ভার ডাউন হতে পারে। max_memory_restart নির্দিষ্ট সীমা (যেমন 800M) পার হলেই প্রসেসটিকে রিলোড করে মেমোরি পরিষ্কার করে দেয়।",
          "e": "Memory leaks progressively consume system RAM until triggering kernel OOM terminations. Setting max_memory_restart: '800M' instructs PM2 to monitor heap footprints; once an instance breaches this ceiling, PM2 gracefully cycles that specific worker without destabilizing sibling cluster instances.",
          "code": "max_memory_restart: '800M'"
        },
        {
          "lvl": "lvl2",
          "q": "PM2-তে `exp_backoff_restart_delay` কী এবং রিস্টার্ট লুপ (Flapping / Restart Storm) কীভাবে প্রতিরোধ করে?",
          "m": "যদি কোনো মারাত্মক বাগ (যেমন ডাটাবেজ পাসওয়ার্ড ভুল হওয়া) থাকে যার কারণে নোড অ্যাপ বুট হওয়ার ১ সেকেন্ডের মধ্যে ক্র্যাশ করে, তবে PM2 সেকেন্ডে শত শত বার অ্যাপ রিস্টার্ট করার চেষ্টা করবে (Restart Storm)। এতে সিপিইউ ১০০% হয়ে পুরো সার্ভার হ্যাং করবে। সমাধান: `exp_backoff_restart_delay: 100` কনফিগার করা। এর ফলে যদি অ্যাপ বারবার ক্র্যাশ করতে থাকে, তবে PM2 প্রতিটি রিস্টার্টের মাঝে এক্সপোনেনশিয়াল বিরতি দেয় (১০০ms, ২০০ms, ৪০০ms, ৮০০ms... সর্বোচ্চ ১৫ সেকেন্ড)। এতে সিপিইউ স্পাইক করা বন্ধ হয় এবং সার্ভার সুস্থ থাকে।",
          "b": "ডাটাবেজ ডাউন থাকলে বা মারাত্মক বাগে অ্যাপ বারবার ক্র্যাশ করলে PM2 অবিরাম রিস্টার্ট দিয়ে সিপিইউ হ্যাং করাতে পারে। exp_backoff_restart_delay ক্র্যাশের পর পর রিস্টার্টের মাঝে বিরতি বাড়িয়ে সিপিইউ রক্ষা করে।",
          "e": "When fatal bootstrap bugs cause instant process crashes, PM2 enters a tight restart loop ('restart storm') driving 100% CPU spikes. exp_backoff_restart_delay introduces progressive exponential backoff delays between restarts, stabilizing server hardware until developers push fixes.",
          "code": "exp_backoff_restart_delay: 100"
        },
        {
          "lvl": "lvl2",
          "q": "PM2-তে `pm2-logrotate` মডিউল কীভাবে ইনস্টল ও কনফিগার করবে যাতে লগ ড্রাইভ পূর্ণ না হয়?",
          "m": "PM2 নিজে থেকে লগ রোটেট করে না, ফলে `.pm2/logs/` ডিরেক্টরি কয়েক মাসে ২০GB হয়ে ডিস্ক ফুল করে দেয়। সমাধান: PM2-এর অফিশিয়াল মডিউল ইনস্টল করা: `pm2 install pm2-logrotate`। কনফিগারেশন: (১) ফাইল সাইজ লিমিট: `pm2 set pm2-logrotate:max_size 50M` (৫০MB হলেই রোটেট হবে), (২) রিটেনশন লিমিট: `pm2 set pm2-logrotate:retain 10` (সর্বোচ্চ ১০টি পুরনো কম্প্রেসড ফাইল রাখবে), (৩) কম্প্রেশন: `pm2 set pm2-logrotate:compress true`। এটি ব্যাকগ্রাউন্ডে স্বয়ংক্রিয়ভাবে চলে এবং ডিস্ক স্পেস আজীবন পরিচ্ছন্ন রাখে।",
          "b": "pm2 install pm2-logrotate দিয়ে মডিউলটি ইনস্টল করে max_size 50M এবং compress true কনফিগার করলে লগ ফাইল ৫০MB হলেই স্বয়ংক্রিয়ভাবে জিপ হয়ে রোটেট হয় এবং ডিস্ক ফুল হওয়া রোধ হয়।",
          "e": "PM2 logs expand unbounded without supervision. Install the official pm2-logrotate plugin: pm2 install pm2-logrotate. Configure max_size to 50M, retain to 10 historical archives, and compress to true to ensure automatic gzip compression and retention pruning.",
          "code": "pm2 install pm2-logrotate\npm2 set pm2-logrotate:max_size 50M\npm2 set pm2-logrotate:retain 10\npm2 set pm2-logrotate:compress true"
        },
        {
          "lvl": "lvl2",
          "q": "PM2-তে Fork Mode বনাম Cluster Mode-এর মধ্যে কখন কোনটি ব্যবহার করা উচিত?",
          "m": "(১) `Cluster Mode`: শুধুমাত্র সেইসব সার্ভিসের জন্য যারা স্টেটলেস HTTP/WebSocket ট্রাফিক হ্যান্ডেল করে (যেমন Express API বা Next.js SSR)। কারণ এখানে মাল্টি-কোর সিপিইউ ইউটিলাইজেশনের জন্য একাধিক প্যারালাল প্রসেস প্রয়োজন। (২) `Fork Mode`: যেকোনো ব্যাকগ্রাউন্ড ক্রন জব, মেসেজ কিউ কনজিউমার (BullMQ / RabbitMQ Worker), বা সিডিউলড টাস্ক সার্ভিসের জন্য `exec_mode: 'fork'` এবং `instances: 1` ব্যবহার করতে হবে! কারণ যদি কিউ কনজিউমার বা ক্রন জবকে ক্লাস্টার মোডে চালানো হয়, তবে প্রতিটি কোরে ক্রন জব ডুপ্লিকেট হয়ে কাস্টমারদের কাছে একই ইমেইল বা চার্জ ৪ বার চলে যাবে!",
          "b": "ওয়েব এপিআইতে সিপিইউর পূর্ণ ব্যবহারে Cluster Mode ব্যবহার করতে হয়। আর ব্যাকগ্রাউন্ড ওয়ার্কার বা ক্রন জবে Fork Mode (instances: 1) ব্যবহার করতে হয় যাতে একই কাজ একাধিকবার ডুপ্লিকেট হয়ে না যায়।",
          "e": "Employ Cluster Mode for stateless HTTP APIs (Express/Next.js) to saturate multi-core CPUs. Crucially, enforce Fork Mode (instances: 1) for stateful background workers, schedulers, and queue consumers (BullMQ) to prevent redundant duplicate job executions.",
          "tip": "বলো: 'Cluster mode for HTTP APIs; Fork mode with 1 instance for queue workers and cron schedulers.'"
        },
        {
          "lvl": "lvl3",
          "q": "PM2 Zero-Downtime Reload-এ 'Ready Signal' (`wait_ready: true`) এবং `process.send('ready')` কীভাবে কাজ করে?",
          "m": "স্বাভাবিক `pm2 reload`-এ PM2 ধরে নেয় যে নতুন প্রসেস স্পন হওয়ার সাথে সাথেই সে ট্রাফিক নেওয়ার জন্য রেডি। কিন্তু বাস্তব অ্যাপ্লিকেশনে ডেটাবেজ কানেক্ট হতে এবং ক্যাশ ওয়ার্ম-আপ হতে ২-৩ সেকেন্ড সময় লাগে! ফলে পুরনো প্রসেস বন্ধ করে নতুনটিতে ট্রাফিক পাঠালে শুরুর ২ সেকেন্ড ক্লায়েন্টরা এরর খায়। সলিউশন: `wait_ready: true` এবং `listen_timeout: 10000` কনফিগার করা। এবং Node.js কোডে ডেটাবেজ কানেকশন সফলভাবে রেডি হওয়ার পর কল করা: `if (process.send) process.send('ready');`। এর ফলে PM2 ততক্ষণ পর্যন্ত পুরনো প্রসেস বন্ধ করবে না যতক্ষণ না নতুন প্রসেস থেকে স্পষ্ট 'ready' সিগন্যাল আসে। এটি ১০০% ট্রু জিরো-ডাউনটাইম নিশ্চিত করে।",
          "b": "অ্যাপ পুরোপুরি ডেটাবেজে কানেক্ট হওয়ার আগে ট্রাফিক আসলে এরর হতে পারে। wait_ready: true দিয়ে নোড কোডে process.send('ready') পাঠালে PM2 নিশ্চিত হয়ে তবেই পুরনো প্রসেস বন্ধ করে এবং নতুনটিতে ট্রাফিক পাঠায়।",
          "e": "Without coordination, PM2 routes traffic to newly spawned workers before database connections initialize, dropping early requests. Setting wait_ready: true instructs PM2 to wait until the application boots, connects to dependencies, and explicitly dispatches process.send('ready') via IPC before retiring legacy workers.",
          "code": "// server.ts:\napp.listen(PORT, async () => {\n  await prisma.$connect();\n  console.log(`Server listening on ${PORT}`);\n  if (process.send) {\n    process.send('ready'); // Notify PM2 that worker is ready\n  }\n});"
        },
        {
          "lvl": "lvl3",
          "q": "PM2 Graceful Shutdown-এ `kill_timeout` এবং `SIGINT` হ্যান্ডলিং কীভাবে ইন-ফ্লাইট পেমেন্ট ট্রানজ্যাকশন ড্রপ হওয়া রোধ করে?",
          "m": "ডিপ্লয়মেন্টে রিলোড দেওয়ার সময় PM2 পুরনো প্রসেসকে একটি `SIGINT` সিগন্যাল পাঠায়। যদি কোনো হ্যান্ডলার না থাকে, প্রসেসটি সাথে সাথে মারা যায়। আমরা কোডে `process.on('SIGINT', ...)` হ্যান্ডলার বসাই এবং `server.close()` কল করি যাতে সার্ভার নতুন রিকোয়েস্ট নেওয়া বন্ধ করে কিন্তু চলমান ট্রানজ্যাকশনগুলো সম্পন্ন করার সুযোগ পায়। PM2 কনফিগে `kill_timeout: 5000` (৫ সেকেন্ড) সেট করি। এর ফলে PM2 সর্বোচ্চ ৫ সেকেন্ড অপেক্ষা করে প্রসেসটিকে শান্তভাবে শেষ হতে দেয়। কোনো পেমেন্ট বা ইনভয়েস মাঝপথে ড্রপ করে না।",
          "b": "SIGINT হ্যান্ডল করে চলমান রিকোয়েস্টগুলো সম্পন্ন হওয়ার জন্য kill_timeout: 5000 কনফিগার করা হয়। ফলে প্রসেস বন্ধ হওয়ার আগে ৫ সেকেন্ড সময় পায় এবং কোনো ক্লায়েন্টের পেমেন্ট মাঝপথে নষ্ট হয় না।",
          "e": "During reload, PM2 dispatches SIGINT to legacy workers. Configure kill_timeout: 5000 inside ecosystem.config.js and intercept SIGINT in Node.js to invoke server.close(), allowing in-flight payment queries up to 5 seconds to commit safely before process termination.",
          "code": "process.on('SIGINT', async () => {\n  server.close(async () => {\n    await db.$disconnect();\n    process.exit(0);\n  });\n});"
        },
        {
          "lvl": "lvl3",
          "q": "PM2 Cluster Mode-এ Node.js ইন-মেমোরি স্টেট (Sessions, Socket.io) কেন কাজ করে না এবং Redis Adapter কীভাবে সমাধান করে?",
          "m": "যেহেতু ক্লাস্টার মোডে প্রতিটি সিপিইউ কোরে আলাদা স্বাধীন নোড প্রসেস চলে, তাদের মেমোরি স্পেস সম্পূর্ণ আলাদা! আপনি যদি লোকাল মেমোরি ভ্যারিয়েবলে সেশন বা ইউজার ডেটা রাখেন, তবে রিকোয়েস্ট ১ পড়বে প্রসেস A-তে কিন্তু রিকোয়েস্ট ২ চলে যাবে প্রসেস B-তে—ফলে ইউজার হঠাৎ লগআউট হয়ে যাবে! একইভাবে WebSocket (Socket.io)-এ প্রসেস A-র ক্লায়েন্ট প্রসেস B-র মেসেজ শুনতে পাবে না। সমাধান: (১) আর্কিটেকচার ১০০% স্টেটলেস করা (JWT টোকেন ব্যবহার করা)। (২) Socket.io-তে `Redis Adapter` (@socket.io/redis-adapter) ব্যবহার করা—যা রেডিস পাব/সাব দিয়ে সব PM2 প্রসেসের মধ্যে রিয়েলটাইমে সকেট ইভেন্ট সিনক্রোনাইজ করে।",
          "b": "ক্লাস্টার মোডে প্রতিটি প্রসেসের মেমোরি আলাদা থাকে। তাই লোকাল ভ্যারিয়েবলের বদলে স্টেটলেস JWT এবং Socket.io-তে Redis Adapter ব্যবহার করে সমস্ত প্রসেসের মাঝে ডাটা ও সকেট ইভেন্ট সিঙ্ক রাখা হয়।",
          "e": "Cluster workers do not share process memory; storing in-memory sessions or WebSocket rooms in variables leads to broken states across worker round-robin routing. Architecture must remain strictly stateless via JWT tokens, while Socket.io requires the Redis Streams/PubSub Adapter to synchronize broadcast events across cluster workers.",
          "code": "import { createAdapter } from '@socket.io/redis-adapter';\nio.adapter(createAdapter(pubClient, subClient));"
        },
        {
          "lvl": "lvl3",
          "q": "PM2-তে `watch` মোড কেন প্রোডাকশনে কঠোরভাবে নিষিদ্ধ এবং কেন এটি শুধু লোকাল মেশিনের জন্য?",
          "m": "মারাত্মক ভুল: `watch: true` অপশন দিলে PM2 ফাইল সিস্টেমে কোনো ফাইল পরিবর্তন বা রাইট হলেই স্বয়ংক্রিয়ভাবে পুরো অ্যাপ রিস্টার্ট করে। প্রোডাকশন সার্ভারে যখন কোনো ইউজার ফাইল আপলোড করে, লগ ফাইলে লগ লেখা হয়, বা ক্যাশ ফোল্ডারে ফাইল রাইট হয়, PM2 প্রতিবার মনে করবে কোড চেঞ্জ হয়েছে এবং সাথে সাথে লাইভ অ্যাপ রিস্টার্ট করে দেবে! এর ফলে হাজার হাজার কাস্টমারের চলমান কানেকশন ড্রপ করবে এবং সাইট অস্থিতিশীল হয়ে পড়বে। প্রোডাকশনে `watch: false` রাখা বাধ্যতামূলক; কোড আপডেট শুধুমাত্র সিআই/সিডি স্ক্রিপ্টের মাধ্যমে ম্যানুয়াল বা অটোমেটেড রিলোড হবে।",
          "b": "প্রোডাকশনে watch: true রাখলে যেকোনো লগ বা ইমেজ আপলোডের সাথে সাথে পুরো অ্যাপ রিস্টার্ট হয়ে সাইট ক্র্যাশ করে। প্রোডাকশনে সর্বদা watch: false রাখতে হবে।",
          "e": "watch: true causes PM2 to reboot the entire application whenever any filesystem mutation occurs. In production, runtime file uploads, log writing, or cache creation will trigger catastrophic unprovoked reload loops. Production configs must strictly specify watch: false.",
          "tip": "কখনোই প্রোডাকশনে `watch: true` রাখবে না; এটি নিশ্চিত সাইট অস্থিতিশীল করে।"
        },
        {
          "lvl": "lvl3",
          "q": "CI/CD ডিপ্লয়মেন্টে PM2 এবং Environment Variables: কেন `pm2 reload` চালানোর সময় `--update-env` ফ্ল্যাগ দেওয়া আবশ্যক?",
          "m": "ডিফল্টভাবে যখন আপনি `pm2 reload app` চালান, PM2 পুরনো প্রসেসের মেমোরিতে থাকা পুরনো এনভায়রনমেন্ট ভ্যারিয়েবলগুলোকেই ধরে রাখে—এমনকি আপনি যদি সার্ভারের `.env` ফাইলে নতুন সিক্রেট বা পোর্ট পরিবর্তনও করে থাকেন! ফলে নতুন কোড ডিপ্লয় হলেও অ্যাপ পুরনো ভ্যারিয়েবল দিয়ে চলে অদ্ভুত অদ্ভুত বাগে আটকে থাকে। সমাধান: ডিপ্লয়মেন্ট স্ক্রিপ্টে সবসময় `--update-env` ফ্ল্যাগ যোগ করতে হবে: `pm2 reload ecosystem.config.js --env production --update-env`। এটি PM2-কে নির্দেশ করে মেমোরি ক্যাশ ফেলে দিয়ে ডিস্কের নতুন `.env` বা কনফিগ ফাইল থেকে ফ্রেশ ভ্যারিয়েবল রিড করে প্রসেস রিলোড করতে।",
          "b": "pm2 reload ডিফল্টভাবে পুরনো এনভায়রনমেন্ট ভ্যারিয়েবল ক্যাশ করে রাখে। --update-env ফ্ল্যাগ দিলে এটি নতুন .env ফাইল থেকে ফ্রেশ ভ্যারিয়েবল রিড করে অ্যাপ রিলোড করে।",
          "e": "By default, PM2 reuses existing process environment variables cached in memory during reloads, ignoring mutations made to the server .env file. Passing the --update-env flag explicitly forces PM2 to invalidate environment caches and inject updated runtime values.",
          "code": "pm2 reload ecosystem.config.js --env production --update-env"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: নতুন কোড ডিপ্লয় করার পর `pm2 status` দেখাচ্ছে অ্যাপটির রিস্টার্ট কাউন্ট প্রতি সেকেন্ডে বাড়ছে (`restarts: 45`) এবং স্ট্যাটাস বারবার `errored` ও `launching`-এর মাঝে ঝুলছে! কীভাবে তাৎক্ষণিকভাবে ডিবাগ করবে?",
          "m": "সমস্যার অর্থ: অ্যাপটি রিস্টার্ট লুপে পড়েছে (বুট ক্র্যাশ)। তাৎক্ষণিক পদক্ষেপ: (১) রিস্টার্ট লুপ সাময়িক থামাতে অ্যাপ স্টপ করব: `pm2 stop dokani-api`। (২) এরর লগ খুলে আসল কারণ দেখব: `pm2 logs dokani-api --err --lines 50`। (৩) ৯৫% ক্ষেত্রে এটি ঘটে দুটি কারণে: নতুন কোনো মিসিং `.env` ভ্যারিয়েবল অথবা ডেটাবেজ মাইগ্রেশন না চালিয়ে নতুন মডেল এক্সেস করার কারণে কোড আনহ্যান্ডেল্ড এক্সেপশনে ক্র্যাশ করছে। (৪) এরর ঠিক করে ম্যানুয়ালি একবার চালিয়ে টেস্ট করব: `node dist/server.js`। সফল হলে পুনরায় PM2 দিয়ে রিস্টার্ট দেব।",
          "b": "রিস্টার্ট কাউন্ট বাড়লে pm2 stop দিয়ে থামিয়ে pm2 logs --err দেখে ক্র্যাশের কারণ বের করতে হবে। সাধারণত মিসিং .env ভ্যারিয়েবল বা ডেটাবেজ এররের কারণে এটি ঘটে।",
          "e": "A looping restart counter indicates boot crashes. Halt the flapping loop via pm2 stop <app>, then extract the uncaught exception trace using pm2 logs <app> --err --lines 50. Common root causes include unpopulated production environment secrets or failing database handshakes.",
          "code": "pm2 stop dokani-api\npm2 logs dokani-api --err --lines 50"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: একটি ৪-কোর VPS সার্ভারে PM2 ক্লাস্টার মোডে এক্সপ্রেস অ্যাপ চলছে। কিন্তু তুমি দেখলে একটি কোরের সিপিইউ ১০০% হয়ে আছে আর বাকি ৩টি কোর ০% হয়ে অলস বসে আছে! কারণ কী এবং কীভাবে ফিক্স করবে?",
          "m": "কারণসমূহ: (১) কোনো একটি রিকোয়েস্টে নোডের সিঙ্গেল থ্রেডকে ব্লক করার মতো সিঙ্ক্রোনাস ভারী কাজ চলছে (যেমন দানবীয় `JSON.parse`, আন-ইনডেক্সড লুপ, বা সিঙ্ক্রোনাস ক্রিপ্টো অপারেশন), যার কারণে ওই নির্দিষ্ট কোরটি ব্লকড হয়ে আছে। (২) অথবা ক্লাস্টার মোড ঠিকমতো কনফিগার করা হয়নি—হয়তো `instances: 1` হয়ে আছে! ফিক্স: (১) `ecosystem.config.js`-এ নিশ্চিত করব `instances: 'max'` এবং `exec_mode: 'cluster'`। (২) নোড কোডে ব্লকিং সিপিইউ অপারেশন প্রোফাইল করে সেগুলোকে `worker_threads` বা ব্যাকগ্রাউন্ড কিউতে (BullMQ) স্থানান্তর করব।",
          "b": "একটি কোর ১০০% হওয়ার কারণ কোডে সিঙ্ক্রোনাস ভারী কোনো লুপ বা অপারেশন মেইন থ্রেডকে ব্লক করেছে। instances: 'max' নিশ্চিত করতে হবে এবং ভারী কাজগুলো ব্যাকগ্রাউন্ড ওয়ার্কারে সরাতে হবে।",
          "e": "One worker pinning a single core at 100% while siblings idle signifies synchronous event-loop blockage (such as a massive blocking JSON traversal or regex backtracking) on that worker. Profile via node --prof or Clinic.js, and delegate heavy computation to Worker Threads or BullMQ.",
          "code": "// In ecosystem.config.js:\ninstances: 'max',\nexec_mode: 'cluster'"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: গভীর রাতে সার্ভারে মেমোরি লিক হয়ে পিএম২-এর প্রসেসগুলো ক্র্যাশ করেছে। কিন্তু ডেভেলপার সকালে এসে দেখল কোনো লগ ফাইল নেই কারণ ডিস্ক ভরে সব ফাইল ক্র্যাশ করেছে! কীভাবে এই বিপর্যয় রোধ করবে?",
          "m": "সমাধানের ধাপ: (১) অবিলম্বে `pm2 install pm2-logrotate` মডিউল ইনস্টল করব এবং ম্যাক্স সাইজ ৫০MB বেঁধে দেব যাতে লগ কখনো ডিস্ক না ভরায়। (২) `ecosystem.config.js`-এ `max_memory_restart: '800M'` বসাব—যাতে মেমোরি লিক হলেও পুরো সার্ভারের র‍্যাম শেষ হওয়ার আগেই PM2 প্রসেসটিকে ফ্রেশভাবে রিলোড করে দেয়। (৩) Sentry বা Datadog ইন্টিগ্রেট করব যাতে যেকোনো মেমোরি স্পাইক বা ক্র্যাশের সাথে সাথে অন-কল ইঞ্জিনিয়ারের ফোনে তাৎক্ষণিক পুশ নোটিফিকেশন যায়।",
          "b": "লগ যাতে ডিস্ক না ভরায় সেজন্য pm2-logrotate দিয়ে সাইজ ৫০MB সীমাবদ্ধ করব এবং max_memory_restart: 800M দিয়ে মেমোরি লিক নিয়ন্ত্রণ করব যাতে সার্ভার ক্র্যাশ পুরোপুরি প্রতিহত হয়।",
          "e": "Prevent log-saturation crashes by standing up pm2-logrotate with strict file caps (max_size: 50M). Enforce max_memory_restart: '800M' so leaking worker memory is proactively recycled without consuming host physical RAM, and wire Sentry error reporting for instant alerting.",
          "code": "max_memory_restart: '800M'"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: সার্ভারে `pm2 start` দিয়ে অ্যাপ চালানোর পর সার্ভার রিবুট দিলে PM2-এর কোনো অ্যাপই আর চালু হচ্ছে না এবং সব অফলাইন দেখাচ্ছে! কেন এবং কীভাবে ফিক্স করবে?",
          "m": "সমস্যার কারণ: ডেভেলপার অ্যাপ চালু করার পর `pm2 save` কমান্ড দিতে ভুলে গিয়েছিল! PM2 মেমোরির প্রসেস স্টেট স্বয়ংক্রিয়ভাবে ডিস্কে রাইট করে না; যদি `pm2 save` না চালানো হয় তবে সার্ভার রিস্টার্টের সময় PM2 খালি কনফিগ দিয়ে বুট হয়। ফিক্স: অ্যাপগুলোকে পুনরায় স্টার্ট করে অবিলম্বে টার্মিনালে চালাব: `pm2 save`। এরপর নিশ্চিত হওয়ার জন্য `pm2 startup` চেক করব। এখন সার্ভার রিবুট হলেও সব অ্যাপ নিখুঁতভাবে অটো-স্টার্ট হবে।",
          "b": "pm2 start দেওয়ার পর pm2 save না চালানোর কারণে সার্ভার রিস্টার্টের পর অ্যাপগুলো চালু হয়নি। pm2 save দিয়ে কনফিগ ফাইল ডিস্কে সংরক্ষণ করলেই সার্ভার রিবুটের পর সব অ্যাপ স্বয়ংক্রিয়ভাবে চালু হবে।",
          "e": "PM2 stores active processes in ephemeral daemon memory until explicitly frozen to disk via pm2 save. If rebooted without running pm2 save, PM2 boots an empty process table. Launch applications, execute pm2 save, and verify via systemctl status pm2-<user>.",
          "tip": "মনে রাখবে: 'Always run pm2 save after starting or modifying PM2 processes.'"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: একটি হাই-ট্রাফিক এপিআইতে ডিপ্লয়মেন্ট স্ক্রিপ্ট `pm2 reload` চালানোর মুহূর্তে ইউজারের পেমেন্ট প্রসেসিং ব্যর্থ হচ্ছে এবং `Socket hang up` এরর আসছে। কীভাবে ট্রু জিরো-ডাউনটাইম নিশ্চিত করবে?",
          "m": "সমস্যা: PM2 রিলোড করার সময় পুরনো প্রসেসকে ভাবছে সে বন্ধ হতে প্রস্তুত, কিন্তু ব্যাকএন্ড নোড অ্যাপের ইন-ফ্লাইট পেমেন্ট রিকোয়েস্ট তখনো ডেটাবেজের সাথে কথা বলছিল। সমাধান: (১) নোড অ্যাপ্লিকেশনে `wait_ready: true` এবং `listen_timeout: 10000` কনফিগার করব। (২) `process.on('SIGINT')` হ্যান্ডলারে ৫ সেকেন্ডের গ্রেসফুল ড্রেনিং লজিক লিখব (`server.close()`)। (৩) অ্যাপ রেডি হলে `process.send('ready')` পাঠাব। এর ফলে PM2 শতভাগ নিশ্চিত হয়ে নতুন প্রসেস প্রস্তুত হওয়ার পরই ট্রাফিক পাঠাবে এবং কোনো পেমেন্ট কানেকশন সকেট হ্যাং আপ হবে না।",
          "b": "ইন-ফ্লাইট রিকোয়েস্ট ড্রপ হওয়া ঠেকাতে wait_ready: true ও kill_timeout: 5000 ব্যবহার করব এবং কোডে SIGINT দিয়ে গ্রেসফুল শাটডাউন ও process.send('ready') বাস্তবায়ন করব।",
          "e": "Socket hang-ups during reloads indicate aggressive termination of in-flight connections. Enforce wait_ready: true, bump kill_timeout to 5000ms, implement a SIGINT listener that drains HTTP connections via server.close(), and dispatch process.send('ready') only upon full initialization.",
          "code": "# In ecosystem.config.js:\nwait_ready: true,\nlisten_timeout: 10000,\nkill_timeout: 5000"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা (Dokani SaaS): Dokani POS-এর ব্যাকএন্ড এপিআই ক্লাস্টার ও ব্যাকগ্রাউন্ড ওয়ার্কার কীভাবে PM2 Ecosystem ফাইল দিয়ে প্রোডাকশনে পরিচালিত হয়?",
          "m": "দোকানি পিওএসে একটি মাল্টি-অ্যাপ `ecosystem.config.js` পরিচালিত হয়: (১) `dokani-api`: এটি `instances: 'max'` এবং `exec_mode: 'cluster'`-এ চলে যাতে সব সিপিইউ কোর ব্যবহার করে পিওএস ক্যাশিয়ারদের সাব-১০ms রেসপন্স দিতে পারে। এতে `wait_ready: true`, `max_memory_restart: '800M'`, এবং `kill_timeout: 5000` কনফিগার করা। (২) `dokani-worker`: এটি `instances: 1` এবং `exec_mode: 'fork'`-এ চলে যা BullMQ দিয়ে ব্যাকগ্রাউন্ডে ইনভয়েস পিডিএফ জেনারেশন, এসএমএস অ্যালার্ট ও দৈনিক সেলস রোলআপ হিসাব করে। এই স্পষ্ট বিভাজনের কারণে সেলস এপিআই এবং ব্যাকগ্রাউন্ড প্রসেসিং একে অপরকে বিন্দুমাত্র প্রভাবিত না করে সর্বোচ্চ নির্ভরযোগ্যতায় রান করে।",
          "b": "দোকানিতে এপিআই চালানো হয় ক্লাস্টার মোডে সব সিপিইউ কোর ব্যবহার করে, আর ব্যাকগ্রাউন্ড ওয়ার্কার চালানো হয় ফর্ক মোডে ১টি ইনস্ট্যান্সে যাতে কোনো কাজ ডুপ্লিকেট না হয়। এই আর্কিটেকচার সর্বোচ্চ গতি ও স্থায়িত্ব নিশ্চিত করে।",
          "e": "Dokani POS coordinates its runtime via a multi-app ecosystem.config.js: dokani-api runs in Cluster Mode across all CPU cores with IPC readiness signals for sub-10ms checkout latencies; dokani-worker executes in Fork Mode with instances: 1 to consume BullMQ asynchronous PDF generation and SMS dispatch without job duplication.",
          "tip": "দোকানির এই এপিআই (Cluster: max) বনাম ওয়ার্কার (Fork: 1) সেপারেশন ইন্টারভিউতে তোমার বাস্তব অভিজ্ঞতার গভীরতা প্রকাশ করে।"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: জিরো-ডাউনটাইম CI/CD ডিপ্লয়মেন্ট পাইপলাইনে PM2 রিলোড কীভাবে স্ক্রিপ্ট করা হয়?",
          "m": "GitHub Actions বা ডিপ্লয় স্ক্রিপ্টে আমরা একটি নিরাপদ চেইন রান করি: (১) `git pull origin main`, (২) `npm ci` (ক্লিন প্যাকেজ ইনস্টল), (৩) `npx prisma migrate deploy` (ডেটাবেজ মাইগ্রেশন), (৪) `npm run build` (কম্পাইলেশন), (৫) `pm2 reload ecosystem.config.js --env production --update-env`। (৬) `pm2 status` আউটপুট ভ্যালিডেট করে চেক করা যে কোনো প্রসেস 'errored' স্টেটে আছে কি না। পুরো ডিপ্লয়মেন্টের সময় Nginx রিভার্স প্রক্সি এবং PM2 রোলিং রিলোডের যৌথ সক্ষমতায় লাইভ ইউজারদের কোনো ট্রাফিক ড্রপ হয় না।",
          "b": "সিআই/সিডি ডিপ্লয়মেন্টে git pull, npm ci, prisma migrate deploy এবং বিল্ড শেষে pm2 reload --update-env চালানো হয়। ফলে সাইট লাইভ রেখেই সেকেন্ডের মধ্যে নতুন ভার্সন প্রোডাকশনে চলে আসে।",
          "e": "The production CI/CD continuous deployment script pulls latest Git commits, executes npm ci, runs Prisma database migrations, compiles TypeScript, and invokes pm2 reload ecosystem.config.js --env production --update-env, auditing exit codes to assert zero errors.",
          "code": "# Automated deploy step:\nnpx prisma migrate deploy\nnpm run build\npm2 reload ecosystem.config.js --env production --update-env\npm2 status"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: প্রোডাকশনে একাধিক মাইক্রোসার্ভিস থাকলে PM2 দিয়ে কীভাবে সার্ভিস ডিপেনডেন্সি ও ক্র্যাশ আইসোলেশন রক্ষা করবে?",
          "m": "যদি একটি সার্ভারে ৫টি সার্ভিস থাকে (Auth, Billing, Inventory, Notifications, Gateway), তবে সবগুলোর জন্য আলাদা আলাদা অ্যাপ কনফিগ থাকে। সুবিধা: যদি নোটিফিকেশন সার্ভিসে কোনো থার্ড পার্টি এসএমএস এপিআই টাইমআউটের কারণে ক্র্যাশও করে, PM2 শুধুমাত্র ওই নির্দিষ্ট নোটিফিকেশন প্রসেসটিকে আইসোলেটেড রাখবে এবং রিস্টার্ট করবে। মূল বিলিং বা ইনভেন্টরি এপিআইতে এর কোনো আঁচও লাগবে না। প্রতিটি সার্ভিসের জন্য আলাদা এরর লগ ও মেমোরি লিমিট বরাদ্দ থাকে।",
          "b": "একাধিক সার্ভিসের ক্ষেত্রে প্রতিটি সার্ভিস আলাদা প্রসেসে চলায় একটি সার্ভিস ক্র্যাশ করলেও অন্য সার্ভিসগুলো সম্পূর্ণ অক্ষত ও সচল থাকে। PM2 স্বয়ংক্রিয়ভাবে শুধুমাত্র ক্ষতিগ্রস্ত সার্ভিসটিকে রিস্টার্ট করে।",
          "e": "Microservices managed via PM2 execute in isolated Linux process sandboxes. If an auxiliary service (e.g. notifications) crashes due to third-party timeout exceptions, PM2 isolates and heals strictly that child process without contaminating critical payment and transaction gateways.",
          "tip": "বলো: 'PM2 process sandboxing provides fault isolation across co-located microservice workloads.'"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: প্রোডাকশন ডেটাবেজ কানেকশন পুল এবং PM2 ক্লাস্টার সাইজিংয়ের সম্পর্ক কী?",
          "m": "খুব সূক্ষ্ম কিন্তু মারাত্মক পয়েন্ট: যদি আপনার সার্ভারে ৮টি সিপিইউ কোর থাকে এবং আপনি `instances: 8` দিয়ে PM2 চালান, এবং আপনার Prisma/Postgres কনফিগে `connection_limit = 10` দেওয়া থাকে, তবে মোট ডেটাবেজ কানেকশন কত হবে? `৮ * ১০ = ৮০টি কানেকশন`! যদি ক্লাস্টার সাইজ না ভেবে পুল সাইজ বড় দেওয়া হয়, তবে ডেটাবেজের ম্যাক্স কানেকশন নিমেষেই পূর্ণ হয়ে ডেটাবেজ ক্র্যাশ করবে। আর্কিটেকচারাল রুল: `Total DB Connections = PM2 Instances * Pool Size per Instance`। ডেটাবেজের ধারণক্ষমতা ১০০ হলে প্রতিটি পিএম২ প্রসেসে পুল সাইজ সর্বোচ্চ ১০-১২টি সীমাবদ্ধ রাখতে হবে।",
          "b": "মোট ডাটাবেজ কানেকশন হলো PM2 প্রসেস সংখ্যা গুণ প্রতি প্রসেসের পুল সাইজ। ৮টি প্রসেস থাকলে প্রতিটি প্রসেসে পুল সাইজ ১০ দিলে মোট ৮০টি কানেকশন তৈরি হবে। এটি হিসাব না রাখলে ডাটাবেজ কানেকশন ক্র্যাশ করে।",
          "e": "Database connection pools multiply across PM2 cluster instances (Total DB Connections = PM2 Instances * Per-Process Pool Size). Running 8 cluster workers with a Prisma connection pool limit of 15 opens 120 concurrent connections, potentially exhausting PostgreSQL max_connections.",
          "tip": "ইন্টারভিউতে 'Total DB connections = PM2 cluster instances multiplied by per-worker pool size' সমীকরণটি উল্লেখ করবে।"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: PM2 প্লাস / PM2 Enterprise মনিটরিং বনাম ওপেন-সোর্স Grafana/Prometheus এক্সপোর্টার: তুমি কোনটি বেছে নেবে?",
          "m": "PM2 Plus পেইড ক্লাউড মনিটরিং সরবরাহ করে, কিন্তু এন্টারপ্রাইজ সিকিউরিটিতে বাইরের ক্লাউডে অভ্যন্তরীণ প্রসেস মেটাডেটা পাঠানো নিষিদ্ধ থাকে। ওপেন-সোর্স প্রোডাকশন সমাধান: আমরা `pm2-prometheus-exporter` ব্যবহার করি। এটি একটি লাইটওয়েট লোকাল পোর্ট (যেমন 9209) খোলে এবং সমস্ত PM2 প্রসেসের রিয়েলটাইম সিপিইউ, মেমোরি, রিস্টার্ট কাউন্ট ও ইভেন্ট লুপ ল্যাটেন্সি প্রমিথিউস মেট্রিক্স ফরম্যাটে এক্সপোজ করে। এরপর সেন্ট্রাল Grafana ড্যাশবোর্ডে আমরা পুরো সার্ভার ফ্লিটের পারফরম্যান্স ভিজ্যুয়ালাইজ করি এবং ফ্রি স্ল্যাক অ্যালার্টিং সেটআপ করি।",
          "b": "পেইড PM2 Plus এর বদলে আমরা ওপেন-সোর্স pm2-prometheus-exporter ব্যবহার করে গ্রাফানায় লাইভ ড্যাশবোর্ড তৈরি করি। এটি সম্পূর্ণ ফ্রি, নিজস্ব সার্ভারে নিরাপদ এবং স্ল্যাকে অটোমেটেড এলার্ট পাঠায়।",
          "e": "Instead of commercial PM2 Plus, enterprise architectures employ pm2-prometheus-exporter. It scrapes PM2 cluster telemetry over a local endpoint (/metrics), shipping real-time heap usage, CPU, and restart rates to Prometheus and Grafana for centralized alerting without third-party data egress.",
          "code": "pm2 install pm2-prometheus-exporter\n# Metrics exposed locally on port 9209 for Prometheus scraping"
        }
      ]
    },
    {
      "id": "git-actions-cicd",
      "name": "Git, GitHub & GitHub Actions CI/CD Automation",
      "desc": "Trunk-based vs GitFlow, GitHub Actions Workflows, Automated CI Testing, Automated VPS Deploy via SSH, Secrets, Branch Protection",
      "items": [
        {
          "lvl": "lvl1",
          "q": "CI/CD কী এবং আধুনিক সফটওয়্যার ডেভেলপমেন্টে Continuous Integration ও Continuous Deployment কেন অপরিহার্য?",
          "m": "CI/CD হলো কোড ইন্টিগ্রেশন ও রিলিজ প্রক্রিয়া স্বয়ংক্রিয় করার আধুনিক মেথডোলজি। (১) `Continuous Integration (CI)`: ডেভেলপাররা প্রতিদিন গিটহাবে কোড পুশ করার সাথে সাথে স্বয়ংক্রিয়ভাবে বিল্ড, লিন্টিং এবং টেস্ট রান করে যাচাই করা যে নতুন কোড বিদ্যমান সিস্টেমে কোনো বাগ বা ব্রেকিং চেঞ্জ তৈরি করেছে কি না। (২) `Continuous Deployment (CD)`: সিআই টেস্ট সফলভাবে পাস হলে কোনো মানুষের ম্যানুয়াল হস্তক্ষেপ ছাড়াই স্বয়ংক্রিয়ভাবে প্রোডাকশন সার্ভারে (VPS / Vercel) নতুন কোড ডিপ্লয় করে দেওয়া। এটি রিলিজ সাইকেলকে কয়েক সপ্তাহ থেকে নামিয়ে কয়েক মিনিটে নিয়ে আসে এবং বাগ দ্রুত ধরা পড়ে।",
          "b": "সিআই হলো কোড পুশ করার সাথে সাথে স্বয়ংক্রিয়ভাবে টেস্ট ও বিল্ড যাচাই করা। আর সিডি হলো টেস্ট সফল হলে কোড সরাসরি লাইভ সার্ভারে ডিপ্লয় করা। এটি ডেভেলপমেন্টের গতি বাড়ায় এবং ম্যানুয়াল ভুলের ঝুঁকি পুরোপুরি দূর করে।",
          "e": "Continuous Integration (CI) automatically builds, lints, and executes automated test suites on every Git push to catch regressions early. Continuous Deployment (CD) automates the delivery of validated code directly to production environments (VPS/cloud), reducing release cycles from weeks to minutes.",
          "tip": "বলো: 'CI guarantees code quality via automated tests; CD eliminates human error by automating production delivery.'"
        },
        {
          "lvl": "lvl1",
          "q": "GitHub Actions কী এবং এর মূল উপাদানগুলো (Workflow, Event, Job, Step, Action) কীভাবে সম্পর্কিত?",
          "m": "GitHub Actions হলো গিটহাবের নিজস্ব বিল্ট-ইন CI/CD প্ল্যাটফর্ম। এর হায়ারার্কি: (১) `Workflow`: একটি সম্পূর্ণ স্বয়ংক্রিয় প্রসেস যা `.github/workflows/` ফোল্ডারে একটি YAML ফাইল দিয়ে ডিফাইন করা হয়। (২) `Event`: যে ট্রিগার ওয়ার্কফ্লো শুরু করে (যেমন `on: [push, pull_request]`)। (৩) `Job`: ওয়ার্কফ্লোর ভেতরে একাধিক জব থাকতে পারে (যেমন `lint`, `test`, `deploy`) যা ডিফল্টভাবে সমান্তরালে (Parallel) অথবা ডিপেনডেন্সি ক্রমে চলে। (৪) `Step`: একটি জবের ভেতরের ক্রমানুসারে চলা এক একটি টাস্ক বা শেল কমান্ড। (৫) `Action`: কমিউনিটি বা নিজের তৈরি করা পুনর্ব্যবহারযোগ্য প্লাগইন (যেমন `actions/checkout@v4`)।",
          "b": "গিটহাব অ্যাকশনস হলো গিটহাবের অটোমেশন প্ল্যাটফর্ম। ইভেন্ট (যেমন পুশ বা পিআর) ওয়ার্কফ্লো ট্রিগার করে; ওয়ার্কফ্লোর ভেতরে এক বা একাধিক জব থাকে; জবের ভেতরে স্টেপ এবং অ্যাকশনগুলো ক্রমানুসারে কমান্ড এক্সিকিউট করে।",
          "e": "GitHub Actions architecture: An Event (push/pull_request) triggers a declarative Workflow (.github/workflows/*.yml). The workflow coordinates Jobs (which run on isolated virtual runners in parallel or sequentially). Jobs contain sequential Steps that invoke reusable Actions or raw shell scripts.",
          "code": "name: CI Pipeline\non: [push, pull_request]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm test"
        },
        {
          "lvl": "lvl1",
          "q": "Trunk-Based Development বনাম GitFlow-এর মধ্যে পার্থক্য কী এবং স্টার্টআপ বা ফাস্ট-মুভিং টিমে কোনটি বেশি জনপ্রিয়?",
          "m": "(১) `GitFlow`: এতে জটিল ও দীর্ঘজীবী ব্রাঞ্চ থাকে (`main`, `develop`, `release/*`, `feature/*`, `hotfix/*`)। ফিচার শেষ হতে সপ্তাহ কেটে যায় এবং যখন সব ব্রাঞ্চ মার্জ করা হয়, তখন দানবীয় 'Merge Hell' ও কনফ্লিক্ট তৈরি হয় (বড় এন্টারপ্রাইজ রিলিজ ট্রেনের জন্য ব্যবহৃত)। (২) `Trunk-Based Development` (স্টার্টআপ ও আধুনিক ফাস্ট-মুভিং টিমের স্ট্যান্ডার্ড): সবাই একটি একক মূল ব্রাঞ্চে (`main` বা trunk) কাজ করে। ডেভেলপাররা অতি ক্ষুদ্র ব্রাঞ্চ বানিয়ে দিনে ১-২ বার পিআর দিয়ে মেইনে মার্জ করে এবং বড় ফিচারের ক্ষেত্রে Feature Flags ব্যবহার করে। ফলে কোনো মার্জ কনফ্লিক্ট থাকে না এবং প্রতিদিন প্রোডাকশনে মাল্টিপল রিলিজ সম্ভব হয়।",
          "b": "গিটফ্লোতে একাধিক জটিল ব্রাঞ্চ থাকে যা মার্জ কনফ্লিক্ট বাড়ায়। ট্রাঙ্ক-বেসড পদ্ধতিতে সবাই সরাসরি মেইন ব্রাঞ্চে ছোট ছোট কমিট দিয়ে দিনে একাধিকবার কোড মার্জ করে। আধুনিক টিমে দ্রুত কোড ডেলিভারির জন্য ট্রাঙ্ক-বেসড মেথড সবচেয়ে জনপ্রিয়।",
          "e": "GitFlow relies on long-lived branches (develop, release, hotfix), frequently resulting in painful merge conflicts. Trunk-Based Development standardizes on a single shared trunk (main), where developers merge small, short-lived feature branches multiple times daily using Feature Flags, optimizing velocity and eliminating merge hell.",
          "tip": "বলো: 'Trunk-based development with short-lived branches and feature flags is the modern elite engineering standard.'"
        },
        {
          "lvl": "lvl1",
          "q": "GitHub Actions-এ Repository Secrets কী এবং কেন কখনোই কোডের ভেতরে API Key বা SSH Key হার্ডকোড করা যাবে না?",
          "m": "গিটহাবে কোড পাবলিক বা প্রাইভেট রিপোজিটরিতে থাকলে কোনো এপিআই কি বা ডাটাবেজ পাসওয়ার্ড কোডে রাখা মানেই তা যেকোনো সময় লিক হয়ে যাওয়া। `GitHub Secrets` হলো গিটহাবের এনক্রিপ্টেড সিক্রেট ভল্ট (`Settings > Secrets and variables > Actions`)। এটি NaCL পাবলিক-কি ক্রিপ্টোগ্রাফি দিয়ে সম্পূর্ণ এনক্রিপ্ট হয়ে থাকে। ওয়ার্কফ্লো ফাইলে এটি `${{ secrets.PROD_SSH_KEY }}` হিসেবে রেফারেন্স করা যায়। গিটহাব স্বয়ংক্রিয়ভাবে সিআই কনসোল লগে সিক্রেটগুলোকে মাস্ক (`***`) করে রাখে যাতে ভুলেও লগ স্ক্রিনে পাসওয়ার্ড দেখা না যায়।",
          "b": "গিটহাব সিক্রেটসে পাসওয়ার্ড ও এপিআই কি এনক্রিপ্টেড অবস্থায় সুরক্ষিত থাকে। কোডে পাসওয়ার্ড রাখা সম্পূর্ণ নিষিদ্ধ। ওয়ার্কফ্লোতে ${{ secrets.SECRET_NAME }} দিয়ে নিরাপদে সিক্রেট ব্যবহার করা হয় যা কনসোল লগে মাস্ক থাকে।",
          "e": "Repository Secrets store sensitive credentials (SSH keys, API tokens) encrypted via libsodium sealed boxes. Workflows inject them at runtime as environment variables (${{ secrets.AWS_SECRET_KEY }}). GitHub automatically masks secret strings with asterisks (***) in console execution logs to prevent leakage.",
          "code": "- name: Deploy to VPS\n  env:\n    SSH_KEY: ${{ secrets.SERVER_SSH_PRIVATE_KEY }}\n  run: echo \"$SSH_KEY\" > key.pem"
        },
        {
          "lvl": "lvl1",
          "q": "GitHub Branch Protection Rules কী এবং কেন প্রোডাকশন `main` ব্রাঞ্চে সরাসরি পুশ ব্লক করা আবশ্যক?",
          "m": "Branch Protection Rules হলো এমন সিকিউরিটি পলিসি যা মূল ব্রাঞ্চে কোডের অখণ্ডতা রক্ষা করে। যদি কোনো ডেভেলপার ভুলবশত বা অসাবধানতায় লোকাল মেশিন থেকে `git push origin main` চালায় (বা কোনো ব্রোকেন কোড পুশ করে), পুরো প্রোডাকশন সাইট সাথে সাথে ক্র্যাশ করবে! রুলসে আমরা সেট করি: (১) `Require a pull request before merging` (সরাসরি পুশ সম্পূর্ণ নিষিদ্ধ), (২) `Require approvals` (কমপক্ষে ১ জন সিনিয়র ইঞ্জিনিয়ারের কোড রিভিউ অনুমোদন আবশ্যক), (৩) `Require status checks to pass before merging` (সিআই টেস্ট ও লিন্ট পাস না করলে মার্জ বাটন ডিজেবল থাকবে)।",
          "b": "ব্রাঞ্চ প্রটেকশন রুল দিয়ে মেইন ব্রাঞ্চে সরাসরি পুশ ব্লক করা হয়। এর ফলে যেকোনো কোড মেইনে আসতে হলে অবশ্যই পুল রিকোয়েস্ট (PR), সিনিয়রের রিভিউ অ্যাপ্রুভাল এবং সিআই টেস্ট পাস করা বাধ্যতামূলক থাকে।",
          "e": "Branch Protection Rules protect the integrity of the main trunk. Disallowing direct pushes mandates that changes arrive exclusively via Pull Requests, requiring at least one peer approval and enforcing green CI status checks before enabling the merge button.",
          "tip": "মনে রাখবে: 'Enforcing branch protection rules with required CI status checks prevents untested code from reaching production.'"
        },
        {
          "lvl": "lvl2",
          "q": "GitHub Actions ব্যবহার করে উবুন্টু VPS সার্ভারে অটোমেটেড SSH ডেপ্লয়মেন্ট ওয়ার্কফ্লো কীভাবে তৈরি করবে?",
          "m": "আমরা `appleboy/ssh-action` বা নেটিভ SSH স্ক্রিপ্ট ব্যবহার করি। সেটআপ: (১) সার্ভারের জন্য একটি ডেডিকেটেড SSH কি তৈরি করে প্রাইভেট কি-টি গিটহাব সিক্রেটসে (`VPS_SSH_KEY`) রাখি। (২) ওয়ার্কফ্লো YAML-এ `deploy` জবে ডিফাইন করি: সার্ভারের হোস্ট আইপি, ইউজার এবং কি। (৩) `script` সেকশনে লিনাক্স কমান্ডগুলো ক্রমানুসারে দিই: `cd /var/www/dokani`, `git pull origin main`, `npm ci`, `npx prisma migrate deploy`, `npm run build`, এবং `pm2 reload ecosystem.config.js --update-env`। ডেভেলপার যখনই কোনো পিআর মেইনে মার্জ করবে, গিটহাব স্বয়ংক্রিয়ভাবে সার্ভারে SSH করে সম্পূর্ণ ডিপ্লয়মেন্ট সম্পন্ন করবে কোনো ম্যানুয়াল হস্তক্ষেপ ছাড়াই!",
          "b": "appleboy/ssh-action ব্যবহার করে গিটহাব সিক্রেটসের SSH কি দিয়ে সার্ভারে কানেক্ট করা হয়। এরপর git pull, npm ci, prisma migrate এবং pm2 reload স্ক্রিপ্ট চালিয়ে সেকেন্ডের মধ্যে অটো-ডিপ্লয় সম্পন্ন হয়।",
          "e": "Automate VPS deployment using appleboy/ssh-action. The workflow connects securely using an SSH private key stored in GitHub Secrets, executing commands sequentially: git pull origin main, npm ci, prisma migrate deploy, build, and pm2 reload --update-env.",
          "code": "- name: Execute Remote SSH Deploy\n  uses: appleboy/ssh-action@v1.0.3\n  with:\n    host: ${{ secrets.SERVER_HOST }}\n    username: ${{ secrets.SERVER_USER }}\n    key: ${{ secrets.SERVER_SSH_KEY }}\n    script: |\n      cd /var/www/dokani\n      git pull origin main\n      npm ci\n      npx prisma migrate deploy\n      npm run build\n      pm2 reload ecosystem.config.js --update-env"
        },
        {
          "lvl": "lvl2",
          "q": "GitHub Actions-এ ডিপেনডেন্সি ও বিল্ড ক্যাশিং (`actions/cache` ও `actions/setup-node`) কীভাবে সিআই রান টাইম ৫ মিনিট থেকে ৩০ সেকেন্ডে নামিয়ে আনে?",
          "m": "প্রতিটি সিআই জবে প্রতিবার `npm install` চালালে ইন্টারনেটের এনপিএম রেজিস্ট্রি থেকে শত শত মেগাবাইট প্যাকেজ ফ্রেশ ডাউনলোড হয় যা প্রচুর সময় নষ্ট করে। সমাধান: `actions/setup-node@v4`-এ `cache: 'npm'` এনাবল করা অথবা `actions/cache` প্লাগইন ব্যবহার করা। এটি `package-lock.json`-এর হ্যাশ কি দিয়ে সম্পূর্ণ `~/.npm` গ্লোবাল ক্যাশ সংরক্ষণ করে। পরবর্তী যে কোনো কমিটে যদি প্যাকেজ লকে পরিবর্তন না হয়, তবে গিটহাব ক্লাউড ক্যাশ থেকে মাত্র ২ সেকেন্ডে ডিপেনডেন্সি রিস্টোর করে নেয়—ফলে সিআই পাইপলাইন অবিশ্বাস্য দ্রুতগতিতে শেষ হয়।",
          "b": "actions/setup-node এ cache: 'npm' ব্যবহার করলে প্রতিবার নতুন করে প্যাকেজ ডাউনলোড না হয়ে ক্লাউড ক্যাশ থেকে নিমেষে ডিপেনডেন্সি লোড হয়। এতে সিআই রান টাইম ৫ মিনিট থেকে ৩০ সেকেন্ডে নেমে আসে।",
          "e": "Downloading node_modules on every ephemeral runner wastes precious CI runner minutes. Enabling cache: 'npm' inside actions/setup-node hashes package-lock.json and caches npm tarballs between runs, slashing workflow execution times from 5 minutes to 30 seconds.",
          "code": "- uses: actions/setup-node@v4\n  with:\n    node-version: 20\n    cache: 'npm'\n- run: npm ci"
        },
        {
          "lvl": "lvl2",
          "q": "GitHub Actions CI পাইপলাইনে Pull Request-এ স্বয়ংক্রিয়ভাবে Jest এবং Playwright টেস্ট কীভাবে রান করবে?",
          "m": "আমরা একটি ডেডিকেটেড `ci.yml` ওয়ার্কফ্লো তৈরি করি যা `on: pull_request` ইভেন্টে ট্রিগার হয়। এতে ৩টি গুরুত্বপূর্ণ স্টেপ থাকে: (১) `npm run lint` (ESLint দিয়ে কোড স্টাইল ভ্যালিডেশন), (২) `npm run test` (Jest দিয়ে ইউনিট ও ইন্টিগ্রেশন টেস্ট রান করা), (৩) `npx playwright test` (ব্রাউজার এন্ড-টু-এন্ড টেস্ট চালানো)। কোনো একটি টেস্ট ফেইল করলে গিটহাব পুরো জবটিকে রেড মার্ক করে দেবে এবং ব্রাঞ্চ প্রটেকশনের কারণে পিআর মার্জ বাটন স্বয়ংক্রিয়ভাবে লক হয়ে থাকবে—কোনো ডেভেলপার ব্রোকেন কোড প্রোডাকশনে পাঠাতে পারবে না।",
          "b": "পিআর ওপেন হলে সিআই ওয়ার্কফ্লো স্বয়ংক্রিয়ভাবে লিন্ট, জেস্ট টেস্ট এবং প্লে-রাইট ই২ই টেস্ট রান করে। কোনো টেস্ট ব্যর্থ হলে মার্জ বাটন লক হয়ে যায়, ফলে বাগযুক্ত কোড সার্ভারে যাওয়া শতভাগ বন্ধ থাকে।",
          "e": "A pull-request CI workflow triggers on: pull_request to execute static lint checks, Jest unit suites, and Playwright end-to-end tests against ephemeral runners. Passing all checks is required by branch protection rules to unlock the PR merge capability.",
          "code": "name: Quality Gate\non: pull_request\njobs:\n  audit:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with: { node-version: 20, cache: 'npm' }\n      - run: npm ci\n      - run: npm run lint\n      - run: npm test\n      - run: npx playwright test"
        },
        {
          "lvl": "lvl2",
          "q": "GitHub Actions Matrix Builds কী এবং কেন এটি ক্রস-প্ল্যাটফর্ম ও মাল্টি-ভার্সন টেস্টিংয়ে ব্যবহৃত হয়?",
          "m": "Matrix Build হলো একটি শক্তিশালী ফিচার যা একক জব ডেফিনিশন থেকে একাধিক ভ্যারিয়েন্টের সমান্তরাল জব তৈরি করে। যেমন: আপনি নিশ্চিত করতে চান যে আপনার ব্যাকএন্ড নোড.জেএস-এর ১৮, ২০ এবং ২২ ভার্সনে নির্বিঘ্নে চলবে। ম্যাট্রিক্স কনফিগে ডিফাইন করব: `strategy: { matrix: { node: [18, 20, 22] } }`। গিটহাব সাথে সাথে সমান্তরালে ৩টি আলাদা ভার্চুয়াল মেশিন স্পন করবে এবং প্রতিটিতে ভিন্ন ভিন্ন নোড ভার্সন দিয়ে একই সাথে টেস্ট রান করবে। ওপেন-সোর্স লাইব্রেরি বা ক্রস-ওএস (Ubuntu, MacOS, Windows) টেস্টিংয়ে এটি অপরিহার্য।",
          "b": "ম্যাট্রিক্স বিল্ড একই সাথে একাধিক নোড ভার্সন (১৮, ২০, ২২) বা অপারেটিং সিস্টেমে সমান্তরালে টেস্ট রান করার সুবিধা দেয়। এটি নিশ্চিত করে যে কোড সব পরিবেশে সমানভাবে কার্যকরী।",
          "e": "Matrix builds spawn parallel matrix jobs combining configured parameters (e.g. testing across Node.js 18, 20, and 22 or Ubuntu/macOS runners simultaneously). This guarantees cross-runtime compatibility without writing redundant individual workflows.",
          "code": "strategy:\n  matrix:\n    node-version: [18.x, 20.x, 22.x]\nsteps:\n  - uses: actions/setup-node@v4\n    with:\n      node-version: ${{ matrix.node-version }}"
        },
        {
          "lvl": "lvl2",
          "q": "GitHub Environments এবং Environment Protection Rules কী এবং প্রোডাকশন ডিপ্লয়মেন্ট অনুমোদনে কীভাবে ব্যবহৃত হয়?",
          "m": "GitHub Environments দিয়ে আমরা কোড ডিপ্লয়মেন্ট টার্গেটগুলোকে ভাগ করি (যেমন `staging` এবং `production`)। প্রতিটি এনভায়রনমেন্টের জন্য আলাদা আলাদা সিক্রেট থাকে (স্টেজিং ডিবি পাসওয়ার্ড বনাম প্রডাকশন ডিবি পাসওয়ার্ড)। সবচেয়ে চমৎকার ফিচার হলো `Environment Protection Rules`: প্রোডাকশন এনভায়রনমেন্টে `Required Reviewers` কনফিগার করা যায়। ফলে সিআই টেস্ট পাস করার পর ডিপ্লয়মেন্ট শুরু হওয়ার আগে গিটহাব টেক লিড বা প্রজেক্ট ম্যানেজারের কাছে ম্যানুয়াল অ্যাপ্রুভাল চেয়ে অপেক্ষা করবে। ম্যানেজার নোটিফিকেশনে 'Approve' চাপলে তবেই প্রোডাকশন সার্ভারে ডিপ্লয় স্ক্রিপ্ট এক্সিকিউট হবে।",
          "b": "গিটহাব এনভায়রনমেন্ট দিয়ে স্টেজিং ও প্রোডাকশনের সিক্রেট আলাদা রাখা হয়। প্রোডাকশনে ম্যানুয়াল অ্যাপ্রুভাল রুল সেট করলে টিম লিড অনুমোদন না দেওয়া পর্যন্ত স্বয়ংক্রিয় ডিপ্লয়মেন্ট আটকে থাকে।",
          "e": "GitHub Environments isolate environment-specific secrets (Staging vs Production) and enforce Environment Protection Rules. Requiring designated engineering leads to approve production deployments inserts a secure manual gate before pipeline execution on live systems.",
          "code": "jobs:\n  deploy-prod:\n    runs-on: ubuntu-latest\n    environment: production # Mandates approval rule"
        },
        {
          "lvl": "lvl3",
          "q": "Docker Container CI/CD: গিটহাব অ্যাকশনস দিয়ে Docker Image বিল্ড, Docker Hub / GHCR-এ পুশ এবং VPS-এ পুল করে জিরো-ডাউনটাইম ডিপ্লয় কীভাবে করবে?",
          "m": "আমরা আধুনিক কন্টেইনারাইজড সিআই/সিডি ফ্লো তৈরি করি: (১) কোড পুশ হলে গিটহাব রানার `docker/build-push-action` দিয়ে ডকার ইমেজ বিল্ড করে। (২) গিটহাবের সিক্রেট ব্যবহার করে ইমেজটিকে GitHub Container Registry (ghcr.io) বা Docker Hub-এ পুশ করে এবং গিটের ইউনিক SHA হ্যাশ দিয়ে ট্যাগ করে (`ghcr.io/org/dokani:${{ github.sha }}`)। (৩) এরপর রানার SSH দিয়ে VPS সার্ভারে কানেক্ট করে। (৪) VPS সার্ভারে `docker-compose.prod.yml` ফাইলে নতুন ইমেজ ট্যাগ আপডেট করে `docker compose pull && docker compose up -d --remove-orphans` চালায়। কন্টেইনার রোলিং আপডেটের মাধ্যমে সাইটে কোনো ডাউনটাইম ছাড়াই নতুন রিলিজ লাইভ হয়ে যায়।",
          "b": "গিটহাব রানারে ডকার ইমেজ বিল্ড করে ghcr.io তে পুশ করা হয়। এরপর SSH দিয়ে সার্ভারে ঢুকে docker compose pull ও up -d কমান্ড চালিয়ে সেকেন্ডের মধ্যে নতুন কন্টেইনার আপডেট করা হয়।",
          "e": "Build and push production container images to GitHub Container Registry (ghcr.io) tagged with immutable commit SHAs. Over SSH, trigger the VPS to pull the newly published image tag and execute docker compose up -d, achieving predictable immutable container rollouts.",
          "code": "- name: Build & Push Docker image\n  uses: docker/build-push-action@v5\n  with:\n    context: .\n    push: true\n    tags: ghcr.io/dokani/api:${{ github.sha }}"
        },
        {
          "lvl": "lvl3",
          "q": "GitHub Actions Security: 'Pwn Request' এবং Untrusted Pull Request থেকে সিক্রেট চুরির ঝুঁকি কীভাবে প্রতিহত করবে?",
          "m": "যদি কোনো পাবলিক ওপেন-সোর্স প্রজেক্টে `on: pull_request_target` ভুলভাবে ব্যবহার করা হয় এবং কোনো ফোকার তার পিআর-এ ক্ষতিকর স্ক্রিপ্ট যোগ করে (যেমন `echo $PROD_SECRET`), তবে সে আপনার প্রোডাকশন সিক্রেট চুরি করতে পারে! ডিফেন্স রুলস: (১) বাইরের বা অপরিচিত পিআরের জন্য সবসময় স্ট্যান্ডার্ড `on: pull_request` ব্যবহার করতে হবে—গিটহাব স্বয়ংক্রিয়ভাবে কোনো সিক্রেটকে ফোর্কড পিআরে অ্যাক্সেস দেয় না। (২) কোনো পিআরের কোড রান করার আগে সিক্রেট ইনজেক্ট করা সম্পূর্ণ নিষিদ্ধ। (৩) `permissions` ব্লকে ওয়ার্কফ্লোর পারমিশন কঠোরভাবে মিনিমাল (যেমন `contents: read`) সীমাবদ্ধ রাখতে হবে (Principle of Least Privilege)।",
          "b": "বাইরের পিআর যাতে সিক্রেট চুরি করতে না পারে সেজন্য pull_request_target এর বদলে pull_request ব্যবহার করতে হয় এবং ফোর্কড রিপোজিটরিতে সিক্রেট এক্সেস বন্ধ রাখতে হয়। পারমিশন সবসময় contents: read এ সীমাবদ্ধ রাখতে হয়।",
          "e": "Defend against 'Pwn Request' vulnerabilities by avoiding pull_request_target on untrusted forks, which exposes repository secrets to untrusted code. Enforce least-privilege workflow permissions: contents: read and ensure fork PRs never inherit production deployment secrets.",
          "code": "permissions:\n  contents: read\n  pull-requests: write"
        },
        {
          "lvl": "lvl3",
          "q": "CI/CD-তে Database Migration Automation: স্কিমা মাইগ্রেশন কি সিআই বিল্ড স্টেপে চালাবে নাকি সার্ভার ডেপ্লয় স্টেপে?",
          "m": "মারাত্মক আর্কিটেকচারাল সিদ্ধান্ত: ডেটাবেজ মাইগ্রেশন কখনোই সিআই বিল্ড বা টেস্ট স্টেজে প্রোডাকশন ডেটাবেজের ওপর চালানো যাবে না! কারণ সিআই রানার শুধুমাত্র টেস্ট করার জন্য। সঠিক প্যাটার্ন: (১) সিআই স্টেজে একটি সাময়িক লোকাল ডকার ডেটাবেজের ওপর মাইগ্রেশন চালিয়ে যাচাই করা যে মাইগ্রেশনে কোনো সিনট্যাক্স এরর বা কনফ্লিক্ট নেই। (২) টেস্ট পাস হওয়ার পর সিডি (Deployment) স্টেজে যখন সার্ভারে নতুন কোড পৌঁছাবে, অ্যাপ রিস্টার্ট বা রিলোড হওয়ার ঠিক আগের ধাপে প্রোডাকশন মাইগ্রেশন চালাতে হবে: `npx prisma migrate deploy`। এটি নিশ্চিত করে যে কোড ও ডাটাবেজ স্কিমা শতভাগ সিঙ্ক্রোনাইজড থাকে।",
          "b": "সিআই টেস্টের সময় শুধু টেস্ট ডাটাবেজে মাইগ্রেশন পরীক্ষা করতে হয়। প্রোডাকশন ডাটাবেজে মাইগ্রেশন চালাতে হয় ডেপ্লয়মেন্টের সময় অ্যাপ রিলোড হওয়ার ঠিক আগের মুহূর্তে (prisma migrate deploy)।",
          "e": "Never run production migrations during general CI testing. Test migration validity against an ephemeral Docker PostgreSQL service during CI; execute production migrations (npx prisma migrate deploy) strictly during the CD phase immediately preceding application reloads.",
          "tip": "বলো: 'Test migrations on ephemeral test containers in CI; deploy them to production in CD immediately prior to app reload.'"
        },
        {
          "lvl": "lvl3",
          "q": "GitHub Actions Concurrency Control (`concurrency` group): ডুপ্লিকেট ডেপ্লয়মেন্ট ও রেস কন্ডিশন কীভাবে বন্ধ করবে?",
          "m": "যদি একজন ডেভেলপার মেইনে পুশ করার ৩০ সেকেন্ড পর অন্য একজন ডেভেলপার আবার পুশ করে, তবে দুটি ডেপ্লয়মেন্ট জব একই সময়ে সমান্তরালে সার্ভারে চলবে এবং একে অপরের ফাইল ওভাররাইট করে সার্ভার ক্র্যাশ করাবে! সমাধান: ওয়ার্কফ্লো ফাইলে `concurrency` গ্রুপ কনফিগার করা: `concurrency: { group: 'production_deploy', cancel-in-progress: false }`। এর ফলে গিটহাব নিশ্চিত করে যে প্রোডাকশনে সবসময় একটি মাত্র ডেপ্লয়মেন্ট স্ক্রিপ্ট এক্সিকিউট হবে; দ্বিতীয় পুশটি কিউতে অপেক্ষা করবে যতক্ষণ না প্রথম ডেপ্লয়মেন্ট নিরাপদে শেষ হয়। আর পিআর টেস্টের ক্ষেত্রে `cancel-in-progress: true` দিয়ে পুরনো টেস্ট স্বয়ংক্রিয়ভাবে বাতিল করে সিআই বিল্ড টাইম বাঁচানো যায়।",
          "b": "একসাথে একাধিক ডেপ্লয়মেন্ট যাতে সার্ভারে কনফ্লিক্ট তৈরি না করে সেজন্য concurrency: group কনফিগার করা হয়। এটি নিশ্চিত করে একটি ডেপ্লয়মেন্ট শেষ হওয়ার পরই কেবল পরবর্তীটি শুরু হবে।",
          "e": "Multiple rapid commits can launch concurrent deployment jobs that race and corrupt server files. Setting concurrency: group: production_deploy with cancel-in-progress: false enforces serialized execution on production, while cancel-in-progress: true saves runner minutes on PR checks.",
          "code": "concurrency:\n  group: prod-deployment\n  cancel-in-progress: false"
        },
        {
          "lvl": "lvl3",
          "q": "Automated Rollback Strategy: GitHub Actions ডেপ্লয়মেন্ট ফেইল করলে কীভাবে স্বয়ংক্রিয়ভাবে পূর্ববর্তী স্টেবল রিলিজে রোলব্যাক করবে?",
          "m": "যদি সার্ভারে নতুন কোড পুল করার পর `npm run build` বা `pm2 reload` কোনো কারণে এরর কোড ফিরিয়ে ফেইল করে, তবে আমরা ব্যাশ ট্র্যাপ বা GitHub Actions-এর `if: failure()` ব্লক দিয়ে অটোমেটিক রোলব্যাক ট্রিগার করি। রোলব্যাক স্ক্রিপ্টটি স্বয়ংক্রিয়ভাবে: (১) গিট কোডকে পূর্ববর্তী কমিটে ফিরিয়ে নেয় (`git reset --hard HEAD~1`), (২) ডিপেনডেন্সি ও বিল্ড পুনরায় রি-রান করে, (৩) PM2 দিয়ে পূর্ববর্তী সুস্থ ভার্সন রিলোড করে দেয়, এবং (৪) স্ল্যাকে একটি হাই-প্রায়োরিটি ইমার্জেন্সি অ্যালার্ট পাঠায় যে 'Deployment Failed: Automatically Rolled Back to Previous Stable Release'। সাইট ১ সেকেন্ডের জন্যও অফলাইনে থাকে না।",
          "b": "ডেপ্লয়মেন্ট ব্যর্থ হলে if: failure() ব্লক দিয়ে স্বয়ংক্রিয়ভাবে git reset --hard HEAD~1 চালিয়ে পূর্ববর্তী সুস্থ ভার্সন রিলোড করা হয় এবং স্ল্যাকে অ্যালার্ট পাঠিয়ে সাইট সচল রাখা হয়।",
          "e": "Incorporate an automated rollback step triggered by if: failure(). The rollback script rolls back Git commits (git reset --hard HEAD~1), rebuilds artifacts, executes pm2 reload to restore the prior stable state, and notifies engineering teams on Slack.",
          "code": "- name: Auto-Rollback on Failure\n  if: failure()\n  run: |\n    echo 'Deployment failed! Rolling back...'\n    git reset --hard HEAD~1\n    npm run build\n    pm2 reload ecosystem.config.js --update-env\n    curl -X POST -H 'Content-type: application/json' --data '{\"text\":\"🚨 Prod Deploy Failed & Rolled Back!\"}' ${{ secrets.SLACK_WEBHOOK }}"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: একজন ডেভেলপার শুক্রবার বিকেলে কোড পুশ করেছে, সিআই টেস্ট পাস করেনি কিন্তু সে জোর করে গিটহাবে 'Force Push' করে মেইন ব্রাঞ্চ ওভাররাইট করে উইকএন্ডে চলে গেছে এবং প্রোডাকশন সাইট ডাউন! কীভাবে তাৎক্ষণিকভাবে রিকভার করবে এবং ভবিষ্যতে এটি ১০০% অসম্ভব করবে?",
          "m": "রিকভারি: (১) সার্ভারে ঢুকে গিটহাবের রেফারেন্স লগ বা `git reflog` দেখে ধ্বংসের পূর্ববর্তী স্টেবল কমিট হ্যাশটি বের করব এবং অবিলম্বে সার্ভারে সেই কমিট চেকআউট করে PM2 রিলোড দেব (`git checkout <stable_sha> && pm2 reload all`)। (২) গিটহাবে `git push -f origin <stable_sha>:main` দিয়ে মেইন ব্রাঞ্চ পুনরুদ্ধার করব। স্থায়ী প্রতিরোধ: রিপোজিটরি সেটিংসে গিয়ে `Branch Protection Rules`-এ অবিলম্বে `Include administrators` এবং `Block force pushes` ও `Block deletions` টিক মার্ক করে দেব! এর ফলে স্বয়ং কোম্পানির সিইও বা অ্যাডমিনও মেইন ব্রাঞ্চে কোনো ফোর্স পুশ করতে পারবে না।",
          "b": "git reflog দেখে পূর্ববর্তী কমিট হ্যাশে ফিরে গিয়ে অ্যাপ রিলোড করে সাইট চালু করব। এরপর ব্রাঞ্চ প্রটেকশনে 'Block force pushes' এবং 'Include administrators' সক্রিয় করে ফোর্স পুশ চিরতরে অসম্ভব করব।",
          "e": "Triage via git reflog to identify the last known good commit SHA, check it out on the server, and reload PM2. Permanently prevent recurrence by enabling Branch Protection rules with 'Include administrators', 'Block force pushes', and 'Require status checks to pass before merging'.",
          "tip": "মনে রাখবে: 'Enable \"Include administrators\" in branch protection so even admins cannot bypass safeguards.'"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: GitHub Actions-এ SSH দিয়ে VPS-এ ডেপ্লয় করার সময় এরর আসছে: `Host key verification failed. Lost connection`। কারণ কী এবং কীভাবে সমাধান করবে?",
          "m": "কারণ: লিনাক্স SSH সিকিউরিটির অংশ হিসেবে অপরিচিত সার্ভারে প্রথমবার কানেক্ট করার সময় ম্যান-ইন-দ্য-মিডল (MITM) আক্রমণ প্রতিরোধের জন্য হোস্টের পাবলিক ফিঙ্গারপ্রিন্ট (`known_hosts`) যাচাই করে। গিটহাব রানার একটি সম্পূর্ণ নতুন ভার্চুয়াল মেশিন হওয়ায় তার কাছে আপনার সার্ভারের ফিঙ্গারপ্রিন্ট আগে থেকে থাকে না। সমাধান: (১) গিটহাব ওয়ার্কফ্লোতে SSH কানেক্ট করার আগে সার্ভারের পাবলিক কি স্ক্যান করে `~/.ssh/known_hosts`-এ যোগ করা: `ssh-keyscan -H ${{ secrets.SERVER_HOST }} >> ~/.ssh/known_hosts`। (২) অথবা `appleboy/ssh-action` ব্যবহার করলে বাফার অপশন ঠিক রাখা। এরপর যাচাইকরণ সফল হয়ে ডেপ্লয়মেন্ট নির্বিঘ্নে চলবে।",
          "b": "নতুন গিটহাব রানারের কাছে সার্ভারের হোস্ট ফিঙ্গারপ্রিন্ট না থাকায় এই এরর আসে। ssh-keyscan -H server_ip >> ~/.ssh/known_hosts চালিয়ে ফিঙ্গারপ্রিন্ট যুক্ত করলেই SSH ভেরিফিকেশন সফল হয়।",
          "e": "Host key verification fails because the ephemeral runner has not cached the remote server's public key fingerprint in ~/.ssh/known_hosts. Populate it prior to connecting via ssh-keyscan -H ${{ secrets.HOST }} >> ~/.ssh/known_hosts.",
          "code": "steps:\n  - name: Add Host Key to Known Hosts\n    run: |\n      mkdir -p ~/.ssh\n      ssh-keyscan -H ${{ secrets.SERVER_HOST }} >> ~/.ssh/known_hosts"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: গিটহাব অ্যাকশনস ওয়ার্কফ্লোতে `npm run build` চলার সময় এরর এলো: `JavaScript heap out of memory` এবং সিআই জব ক্র্যাশ করল। কীভাবে এটি ফিক্স করবে?",
          "m": "সমস্যার কারণ: Next.js বা বড় TypeScript প্রজেক্ট বিল্ড করার সময় ডিফল্ট Node.js হিপ মেমোরি লিমিট (২GB বা ৪GB) ছাড়িয়ে যায়। সমাধান: (১) গিটহাব রানারের পরিবেশ ভ্যারিয়েবলে Node.js মেমোরি লিমিট বাড়িয়ে ৮GB বরাদ্দ করা: `NODE_OPTIONS: \"--max-old-space-size=8192\"`। (২) `next.config.js`-এ অপ্রয়োজনীয় ভারী সোর্স ম্যাপ জেনারেশন প্রোডাকশন বিল্ডে ডিসেবল করা। এরপর রানার পর্যাপ্ত মেমোরি পেয়ে অনায়াসে বিল্ড সম্পন্ন করবে।",
          "b": "বিল্ড চলাকালীন মেমোরি শেষ হয়ে ক্র্যাশ করলে NODE_OPTIONS=\"--max-old-space-size=8192\" দিয়ে নোড মেমোরি ৮GB তে বাড়িয়ে দিতে হয়। এতে বিল্ড সফলভাবে সম্পন্ন হয়।",
          "e": "Compiling massive Next.js or TypeScript codebases exhausts Node's default heap memory allocation. Resolve by injecting NODE_OPTIONS: '--max-old-space-size=8192' into the workflow step environment, granting Node up to 8GB of memory space.",
          "code": "- name: Build Project\n  run: npm run build\n  env:\n    NODE_OPTIONS: \"--max-old-space-size=8192\""
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: ডেভেলপাররা প্রতিদিন গিটহাব অ্যাকশনস রান করায় ফ্রি ২০০০ মিনিট সিআই কোটা মাসের ১৫ তারিখেই শেষ হয়ে গেছে এবং সব বিল্ড আটকে গেছে! কোড ও পাইপলাইন কীভাবে অপটিমাইজ করে সিআই খরচ ৭৫% কমাবে?",
          "m": "অপটিমাইজেশনের ধাপ: (১) `Path Filtering` যুক্ত করা: যদি কেউ শুধুমাত্র `README.md`, ডকুমেন্টেশন বা ইমেজ পরিবর্তন করে পুশ করে, তবে সিআই রান করার দরকার নেই (`paths-ignore: ['**.md', 'docs/**']`)। (২) `Concurrency Cancel`: নতুন কমিট আসলে পূর্ববর্তী চলমান ইন-প্রোগ্রেস টেস্ট স্বয়ংক্রিয়ভাবে বাতিল করা (`cancel-in-progress: true`)। (৩) `Dependency Caching`: `npm ci`-এর জন্য `actions/setup-node` ক্যাশিং এনাবল করা। (৪) শুধুমাত্র নির্দিষ্ট গুরুত্বপূর্ণ ব্রাঞ্চে টেস্ট রান করা। এই ৪টি পদক্ষেপে সিআই সময় ৫ মিনিট থেকে ১ মিনিটে নেমে আসবে এবং কোটা কখনোই শেষ হবে না।",
          "b": "paths-ignore দিয়ে ডক ফাইল পুশে টেস্ট বন্ধ রাখা, cancel-in-progress: true দিয়ে পুরনো বিল্ড ক্যানসেল করা এবং actions/cache ব্যবহার করে ডিপেনডেন্সি ক্যাশ করলে সিআই সময় ও খরচ ৭৫% কমে যায়।",
          "e": "Reduce CI consumption by 75%: (1) Add path filters (paths-ignore: ['*.md', 'docs/**']) to skip builds on documentation edits, (2) Activate concurrency with cancel-in-progress: true to kill superseded builds, and (3) Leverage aggressive npm package caching.",
          "code": "on:\n  push:\n    branches: [main]\n    paths-ignore:\n      - '**.md'\n      - 'docs/**'\nconcurrency:\n  group: ${{ github.workflow }}-${{ github.ref }}\n  cancel-in-progress: true"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: একজন জুনিয়র ডেভেলপার ভুলবশত তার পার্সোনাল AWS Access Key কোডে রেখে গিটহাবে পুশ করে দিয়েছে। ৫ মিনিটের মধ্যে গিটহাব সিকিউরিটি অ্যালার্ট পাঠাল। তাৎক্ষণিক কী কী পদক্ষেপ নেবে?",
          "m": "জরুরি পদক্ষেপসমূহ: (১) কোনো সময় নষ্ট না করে সাথে সাথে AWS IAM কনসোলে লগইন করে ওই Access Key-টি 'Deactivate' এবং তারপর 'Delete' করে দিতে হবে—যাতে কোনো বট ওই কি ব্যবহার করে বিলিয়ন ডলারের ক্রিপ্টো মাইনিং ক্লাউড ইনস্ট্যান্স না খুলতে পারে। (২) নতুন ফ্রেশ কি জেনারেট করে শুধুমাত্র গিটহাব সিক্রেটসে রাখতে হবে। (৩) Git হিস্ট্রি থেকে সিক্রেট পুরোপুরি পার্জ করতে হবে: `git filter-repo` বা BFG Repo-Cleaner দিয়ে সম্পূর্ণ গিট কমিট হিস্ট্রি থেকে কি-টি মুছে ফোর্স পুশ করতে হবে। (৪) লোকাল মেশিনে `pre-commit` হুক বা `gitleaks` ইনস্টল করতে হবে যাতে ভবিষ্যতে কোনো সিক্রেট কোডে থাকলে গিট কমিট হওয়াই আটকে যায়।",
          "b": "তাৎক্ষণিকভাবে AWS কনসোলে ঢুকে অ্যাক্সেস কি ডিঅ্যাক্টিভেট ও ডিলিট করতে হবে। BFG Repo-Cleaner দিয়ে গিট হিস্ট্রি পরিষ্কার করতে হবে এবং ভবিষ্যতে প্রতিরোধ করতে gitleaks প্রি-কমিট হুক বসাতে হবে।",
          "e": "Immediately revoke and delete the compromised IAM Access Key in the AWS console to halt unauthorized exploitation. Scrub Git commit history permanently using BFG Repo-Cleaner or git filter-repo, and install gitleaks in local pre-commit hooks to block secrets prior to commits.",
          "tip": "বলো: 'First revoke the key immediately at the cloud provider; then scrub history with BFG and enforce gitleaks hooks.'"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা (Dokani SaaS): Dokani POS-এর প্রোডাকশন CI/CD অটোমেশন পাইপলাইন কীভাবে গিটহাব অ্যাকশনস দিয়ে আর্কিটেক্ট করা হয়েছে?",
          "m": "দোকানি পিওএসে একটি সম্পূর্ণ অটোনোমাস ২-স্টেজ CI/CD পাইপলাইন কার্যকর: (১) `Stage 1 - Quality Gate (CI)`: যেকোনো PR তৈরি হলে সমান্তরালে ESLint লিন্ট, TypeScript কম্পাইল চেক, Jest ইউনিট টেস্ট এবং Playwright ই২ই চেকআউট ফ্লো টেস্ট রান হয়। (২) `Stage 2 - Zero-Downtime CD`: PR মেইনে মার্জ হওয়া মাত্রই CD পাইপলাইন সক্রিয় হয়। এটি গিটহাব সিক্রেটস থেকে এড২৫৫১৯ SSH কি দিয়ে প্রোডাকশন উবুন্টু VPS-এ লগইন করে, কোড পুল করে, `prisma migrate deploy` দিয়ে ডেটাবেজ স্কিমা সিঙ্ক করে, নেক্সট.জেএস ও নোড বিল্ড সম্পন্ন করে এবং `pm2 reload ecosystem.config.js --update-env` দিয়ে কোনো ডাউনটাইম ছাড়া লাইভ করে। পুরো রিলিজটি কোনো মানুষের ম্যানুয়াল স্পর্শ ছাড়াই মাত্র ২ মিনিটে শেষ হয়!",
          "b": "দোকানিতে PR ওপেন হলে স্বয়ংক্রিয়ভাবে লিন্ট ও টেস্ট চলে এবং মেইনে মার্জ হলে SSH দিয়ে প্রোডাকশন VPS-এ ঢুকে মাইগ্রেশন, বিল্ড ও PM2 জিরো-ডাউনটাইম রিলোড সম্পন্ন হয় মাত্র ২ মিনিটে।",
          "e": "Dokani POS operates a dual-stage CI/CD workflow: PRs trigger automated ESLint, TypeScript typecheck, Jest suites, and Playwright POS checkout tests. Merges to main trigger an automated SSH deployment to Ubuntu VPS running Prisma migrations and PM2 zero-downtime rolling reloads in under 2 minutes.",
          "tip": "দোকানির এই এন্ড-টু-এন্ড অটোমেটেড পাইপলাইন (PR Quality Gate -> VPS Zero-Downtime CD) ইন্টারভিউতে নিখুঁত প্রো-লেভেল উত্তর।"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: স্ল্যাক / ডিসকর্ড বা টেলিগ্রাম ওয়েবহুক দিয়ে লাইভ ডেপ্লয়মেন্ট নোটিফিকেশন পাইপলাইন কীভাবে বানাবে?",
          "m": "ডিপ্লয়মেন্ট সফল বা ব্যর্থ হলে ইঞ্জিনিয়ারিং টিমকে লাইভ জানানোর জন্য আমরা GitHub Actions-এর শেষে একটি নোটিফিকেশন স্টেপ রাখি (`curl` বা কমিউনিটি অ্যাকশন দিয়ে)। নোটিফিকেশনে থাকে: কে পুশ করেছে (`${{ github.actor }}`), কোন কমিট মেসেজ, ব্রাঞ্চের নাম এবং ডিপ্লয়মেন্টের স্ট্যাটাস। সফল হলে গ্রিন টিক এবং ব্যর্থ হলে লাল এলার্ট মেসেজ সহ সার্ভার এরর লগ স্ল্যাক চ্যানেলে পৌঁছে যায়। এর ফলে টিম কোনো টার্মিনাল না খুলেই মোবাইল বা স্ল্যাক থেকেই জেনে যায় নতুন ভার্সন সফলভাবে লাইভ হয়েছে কি না।",
          "b": "ডিপ্লয়মেন্ট শেষে স্ল্যাক ওয়েবহুকে curl রিকোয়েস্ট পাঠিয়ে কমিট মেসেজ, অথর ও ডিপ্লয় স্ট্যাটাস নোটিফিকেশন পাঠানো হয়। ফলে টিম তাৎক্ষণিকভাবে রিলিজের অবস্থা জানতে পারে।",
          "e": "Integrate Slack/Discord incoming webhooks at the tail of CI/CD workflows using curl or dedicated actions. Broadcast release payloads containing the committer identity, commit SHA, branch name, and deployment status (Success/Failure) to ensure real-time team observability.",
          "code": "- name: Notify Slack\n  if: always()\n  run: |\n    curl -X POST -H 'Content-type: application/json' \\\n      --data '{\"text\": \"🚀 Dokani Deploy: ${{ job.status }} by ${{ github.actor }}\"}' \\\n      ${{ secrets.SLACK_WEBHOOK_URL }}"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: Semantic Versioning ও স্বয়ংক্রিয় Release Changelog তৈরি করতে `release-please` বা `semantic-release` কীভাবে কনফিগার করবে?",
          "m": "আমরা Conventional Commits স্ট্যান্ডার্ড মানি (যেমন `feat: add discount coupons`, `fix: resolve barcode scanner bug`)। GitHub Actions-এ Google-এর `release-please-action` কনফিগার করা থাকে। এটি প্রতিটি কমিট মেসেজ বিশ্লেষণ করে স্বয়ংক্রিয়ভাবে সেমান্টিক ভার্সন বাড়ায় (`v1.2.0` থেকে `v1.3.0` বা `v1.2.1`), স্বয়ংক্রিয়ভাবে একটি রিলিজ PR তৈরি করে, `CHANGELOG.md` ফাইলে সুন্দর ক্যাটাগরি অনুযায়ী পরিবর্তনগুলো লিপিবদ্ধ করে এবং গিটহাবে অফিসিয়াল গিট ট্যাগ ও রিলিজ পাবলিশ করে। কোনো ইঞ্জিনিয়ারকে ম্যানুয়ালি ভার্সন নাম্বার বা চেঞ্জলগ লিখতে হয় না।",
          "b": "কনভেনশনাল কমিটস (feat/fix) মেনে release-please ব্যবহার করা হয়। এটি স্বয়ংক্রিয়ভাবে সেমান্টিক ভার্সন (v1.2.0) বৃদ্ধি করে, CHANGELOG.md তৈরি করে এবং গিটহাবে রিলিজ পাবলিশ করে।",
          "e": "Adopt Conventional Commits (feat, fix, chore) paired with Google's release-please-action. It parses commit prefixes, algorithmically bumps Semantic Versions (semver), maintains an automated CHANGELOG.md, and publishes official GitHub Release tags upon merging.",
          "code": "- uses: google-github-actions/release-please-action@v3\n  with:\n    release-type: node\n    package-name: dokani-core"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: সেলফ-হোস্টেড গিটহাব অ্যাকশনস রানার (Self-Hosted Runner) কখন এবং কেন ব্যবহার করা হয়?",
          "m": "GitHub-এর পাবলিক রানারে (GitHub-hosted runners) প্রতিটি কাজের জন্য বিল্ড মিনিট খরচ হয় এবং তাদের হার্ডওয়্যার লিমিটেশন (২ কোর সিপিইউ, ৭GB র‍্যাম) থাকে। যখন কোনো কোম্পানির বড় মনোরিপো থাকে যার টেস্ট চলতে ২০ মিনিট সময় লাগে, অথবা ডেপ্লয়মেন্ট সার্ভারটি একটি প্রাইভেট ভিপিসির (Private VPC / Corporate Intranet) ভেতরে থাকে যা ইন্টারনেটে উন্মুক্ত নয়—তখন আমরা নিজস্ব পাওয়ারফুল সার্ভারে `Self-Hosted Runner` ইনস্টল করি। সুবিধা: আনলিমিটেড ফ্রি এক্সিকিউশন টাইম, সার্ভারের ৩২ কোর সিপিইউ ও ৬৪GB র‍্যামের দানবীয় গতি, এবং প্রাইভেট নেটওয়ার্কে নিরাপদ ডেপ্লয়মেন্ট।",
          "b": "প্রাইভেট ক্লাউড বা ইন্টারনাল নেটওয়ার্কে সার্ভার থাকলে এবং বড় প্রজেক্টে আনলিমিটেড সিআই স্পিড পেতে সেলফ-হোস্টেড রানার ব্যবহার করা হয়। এতে কোনো অতিরিক্ত ক্লাউড খরচ ছাড়াই নিজস্ব সার্ভারের শক্তিতে টেস্ট চলে।",
          "e": "Deploy Self-Hosted Runners when deploying into isolated private VPCs inaccessible via public internet, or to accelerate massive monorepo builds using enterprise-grade multi-core hardware without incurring GitHub-hosted runner per-minute billing.",
          "tip": "বলো: 'Self-hosted runners provide zero-cost execution and private VPC network access for enterprise deployments.'"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: প্রি-কমিট হুকস (Husky + lint-staged): ব্রোকেন বা আন-ফরম্যাটেড কোড গিটহাবে পুশ হওয়াই লোকাল মেশিনে কীভাবে আটকে দেবে?",
          "m": "সবচেয়ে ভালো সিআই হলো যেটি সার্ভারে যাওয়ার আগেই লোকাল মেশিনে ভুল আটকে দেয়! আমরা `husky` এবং `lint-staged` কনফিগার করি। ডেভেলপার যখনই টার্মিনালে `git commit` রান করে, হাস্কি স্বয়ংক্রিয়ভাবে শুধুমাত্র স্টেজড ফাইলগুলোর ওপর Pre-commit হুক চালায়: (১) Prettier দিয়ে কোড ফরম্যাট করে, (২) ESLint দিয়ে কোনো সিনট্যাক্স এরর বা মিসিং টাইপ আছে কি না চেক করে, (৩) কোডে কোনো `console.log` বা পাসওয়ার্ড থাকলে সতর্ক করে। যদি লিন্টিং ফেইল করে, তবে গিট কমিট হতেই দেয় না! এর ফলে গিটহাব রিপোজিটরির হিস্ট্রি সবসময় ১০০% পরিচ্ছন্ন ও বাগ-মুক্ত থাকে।",
          "b": "Husky এবং lint-staged দিয়ে লোকাল মেশিনে প্রি-কমিট হুক বসানো হয়। কোডে কোনো লিন্ট এরর বা ভুল থাকলে গিট কমিট হতে দেয় না, ফলে গিটহাবে যাওয়ার আগেই লোকাল মেশিনে ভুল ঠিক হয়ে যায়।",
          "e": "Prevent broken code from reaching remote remotes by enforcing local pre-commit hooks via Husky and lint-staged. Staged files are automatically formatted via Prettier and audited via ESLint prior to commit creation, ensuring only pristine commits enter Git history.",
          "code": "// package.json:\n\"lint-staged\": {\n  \"*.{ts,tsx}\": [\"prettier --write\", \"eslint --fix\"]\n}"
        }
      ]
    },
    {
      "id": "vps-paas-deployment",
      "name": "VPS Deployment vs Cloud Platforms (Vercel, Render, Railway)",
      "desc": "VPS vs Managed PaaS, Cost Economics, Serverless Cold Starts, Dockerized Hosting, Hybrid Architecture (Vercel + VPS)",
      "items": [
        {
          "lvl": "lvl1",
          "q": "Virtual Private Server (VPS) বনাম Platform as a Service (PaaS / Vercel / Render)-এর মধ্যে মৌলিক পার্থক্য কী?",
          "m": "(১) `VPS (যেমন DigitalOcean, Hetzner, AWS EC2)`: আপনি একটি সম্পূর্ণ ভার্চুয়াল লিনাক্স ওএস পান। আপনাকে নিজে SSH করে Nginx, Node, PM2, ফায়ারওয়াল ও ডাটাবেজ ইনস্টল ও কনফিগার করতে হয় (পূর্ণ নিয়ন্ত্রণ, অবিশ্বাস্য কম খরচ)। (২) `PaaS (যেমন Vercel, Render, Railway)`: কোনো সার্ভার ম্যানেজমেন্টের ঝামেলা নেই। গিটহাব রিপোজিটরি কানেক্ট করলেই তারা অটোমেটিক বিল্ড, ডিপ্লয়, SSL এবং গ্লোবাল CDN পরিচালনা করে (উচ্চ ডেভেলপার ভেলোসিটি, কিন্তু বেশি খরচ এবং ভেন্ডর-লকইন)।",
          "b": "ভিপিএস এ সম্পূর্ণ সার্ভারের ওপর পূর্ণ নিয়ন্ত্রণ থাকে এবং খরচ অনেক কম। আর PaaS (ভার্সেল/রেন্ডার) কোনো সার্ভার কনফিগারেশন ছাড়া গিট কানেক্ট করলেই স্বয়ংক্রিয়ভাবে অ্যাপ চালিয়ে দেয় কিন্তু খরচ বেশি।",
          "e": "A VPS (DigitalOcean, Hetzner) provides raw virtualized Linux OS access where developers manage OS, firewalls, reverse proxies, and system daemons directly with full control at minimal cost. A PaaS (Vercel, Render, Railway) abstracts infrastructure away, deploying code straight from Git with automated SSL and builds at a premium cost.",
          "tip": "বলো: 'VPS grants root hardware control and predictable micro-pricing; PaaS trades cost for developer velocity.'"
        },
        {
          "lvl": "lvl1",
          "q": "Serverless Cold Start কী এবং PaaS প্ল্যাটফর্মে ব্যাকএন্ড এপিআই হোস্ট করার সময় এটি কেন সমস্যা তৈরি করে?",
          "m": "Serverless ফাংশনগুলো সার্বক্ষণিক মেমোরিতে রান করে না। যখন কোনো ট্রাফিক থাকে না, প্ল্যাটফর্ম কন্টেইনারটি টার্মিনেট বা স্লিপ করে রাখে। অনেকক্ষণ পর প্রথম রিকোয়েস্টটি এলে প্ল্যাটফর্মকে নতুন কন্টেইনার স্পন করতে হয়, নোড রানটাইম লোড করতে হয় এবং ডেটাবেজ কানেকশন তৈরি করতে হয়—যার ফলে প্রথম রিকোয়েস্টে ৩ থেকে ৮ সেকেন্ড পর্যন্ত ল্যাটেন্সি বা বিলম্ব ঘটে (Cold Start)! ক্যাশিয়ারের পিওএস চেকআউট বা পেমেন্ট এপিআইতে এই ৫ সেকেন্ডের ল্যাগ ইউজারদের চরম বিরক্ত করে। সার্বক্ষণিক রানিং VPS সার্ভারে কোনো কোল্ড স্টার্ট থাকে না—প্রতিটি রিকোয়েস্ট ইনস্ট্যান্ট সাব-১০ মিলিসেকেন্ডে রেসপন্স দেয়।",
          "b": "সার্ভারলেস সিস্টেমে অলস অবস্থায় কন্টেইনার স্লিপে চলে যায়। নতুন রিকোয়েস্ট এলে চালু হতে ৩-৮ সেকেন্ড সময় নেয় যাকে কোল্ড স্টার্ট বলে। পিওএস বা পেমেন্টের মতো সিস্টেমে কোল্ড স্টার্ট মারাত্মক ক্ষতিকর। সার্বক্ষণিক চালু VPS-এ কোনো কোল্ড স্টার্ট থাকে না।",
          "e": "Cold Starts occur on serverless platforms when spinning up dormant containers, initializing the Node runtime, and handshaking database pools, causing initial request latencies of 3-8 seconds. A persistent VPS eliminates cold starts entirely, providing deterministic sub-10ms response times.",
          "tip": "ইন্টারভিউতে 'Persistent VPS eliminates serverless cold starts for checkout transactions' পয়েন্টটি বলবে।"
        },
        {
          "lvl": "lvl1",
          "q": "Vercel এবং Netlify মূলত কোন ধরনের অ্যাপ্লিকেশনের জন্য ডিজাইন করা হয়েছে এবং ব্যাকএন্ড ডাটাবেজের জন্য কেন অনুপযুক্ত?",
          "m": "Vercel এবং Netlify ডিজাইন করা হয়েছে আধুনিক Jamstack এবং ফ্রন্টএন্ড ফ্রেমওয়ার্কের জন্য (Next.js, React, Astro, Vue)—যেখানে গ্লোবাল Edge CDN, অটোমেটিক প্রিভিউ ডিপ্লয়মেন্ট এবং স্ট্যাটিক অ্যাসেট ডিস্ট্রিবিউশন দরকার। এরা স্টেটলেস (Stateless)। এগুলোতে কোনো দীর্ঘস্থায়ী ফাইল সিস্টেম বা স্টেটফুল প্রসেস চালানো যায় না; ফলে PostgreSQL, MongoDB বা Redis-এর মতো ডেটাবেজ সরাসরি Vercel/Netlify-তে হোস্ট করা অসম্ভব। তাদের ব্যাকএন্ড ফাংশনগুলোর এক্সিকিউশন টাইম লিমিট (১০-১৫ সেকেন্ড) থাকে, ফলে দীর্ঘমেয়াদি কাজ চালানো যায় না।",
          "b": "ভার্সেল ও নেটলিফাই ফ্রন্টএন্ড এবং নেক্সট.জেএস-এর জন্য সেরা। এরা স্টেটলেস হওয়ায় কোনো ডেটাবেজ (Postgres/Mongo) এদের ভেতরে হোস্ট করা যায় না এবং এদের ব্যাকএন্ড ফাংশনে ১০ সেকেন্ডের টাইমআউট থাকে।",
          "e": "Vercel and Netlify are optimized for frontend UI frameworks (Next.js, Astro) and Edge asset distribution. Because serverless runtime environments are completely ephemeral and stateless, persistent stateful workloads (PostgreSQL, Redis, RabbitMQ) cannot be hosted natively on them.",
          "code": "// Vercel Serverless Function Limit:\nexport const maxDuration = 10; // Max 10-15 seconds on hobby/pro"
        },
        {
          "lvl": "lvl1",
          "q": "Railway এবং Render-এর মতো আধুনিক PaaS প্ল্যাটফর্মের সুবিধা কী?",
          "m": "Railway এবং Render হলো Heroku-এর আধুনিক বিকল্প। সুবিধা: (১) এরা ফুল-স্ট্যাক অ্যাপ্লিকেশন সাপোর্ট করে—অর্থাৎ আপনি শুধু ফ্রন্টএন্ড নয়, বরং দীর্ঘমেয়াদি ব্যাকএন্ড নোড সার্ভার, ব্যাকগ্রাউন্ড ওয়ার্কার এবং ডেটাবেজ (PostgreSQL, Redis) এক ক্লিকে প্রভিশন করতে পারেন। (২) ডকার ফাইল সাপোর্ট করে—যেকোনো কাস্টম `Dockerfile` পুশ করলেই তা অটোমেটিক বিল্ড ও ডিপ্লয় হয়ে যায়। (৩) অটোমেটিক SSL সার্টিফিকেট, প্রাইভেট নেটওয়ার্কিং এবং এনভায়রনমেন্ট ভ্যারিয়েবল সিনক্রোনাইজেশন থাকে। ছোট টিমের জন্য সার্ভার কনফিগারেশন ছাড়া ফুল স্ট্যাক লাইভ করার এটি দ্রুততম মাধ্যম।",
          "b": "রেন্ডার এবং রেলওয়ে হলো আধুনিক Heroku। এক ক্লিকে নোড ব্যাকএন্ড, ডকার কন্টেইনার এবং ডেটাবেজ ক্লাস্টার তৈরি করে কোনো সার্ভার কনফিগারেশন ছাড়াই পূর্ণাঙ্গ ফুলস্ট্যাক প্রজেক্ট চালানো যায়।",
          "e": "Render and Railway provide managed PaaS runtimes capable of persistent web services, Docker container deployments, background queue workers, and managed PostgreSQL/Redis instances. They offer Heroku-like developer ergonomics with automated SSL, health checking, and private networking.",
          "tip": "বলো: 'Railway and Render bridge the gap by supporting persistent stateful web services and Docker containers without manual Linux sysadmin overhead.'"
        },
        {
          "lvl": "lvl1",
          "q": "একটি $৬/মাস উবুন্টু VPS সার্ভারে কী কী সার্ভিস একসাথে চালানো সম্ভব?",
          "m": "একটি $৬/মাসের আধুনিক ক্লাউড VPS-এ (১ vCPU, ২GB RAM, ৫০GB NVMe SSD—যেমন Hetzner বা DigitalOcean) উপযুক্ত অপটিমাইজেশন (Docker/PM2 + Nginx + ৪GB Swap) ব্যবহার করে একসাথে চালানো সম্ভব: (১) Next.js ফ্রন্টএন্ড (standalone মোডে ~৮০MB RAM), (২) Node.js/Express ব্যাকএন্ড এপিআই (~১২০MB RAM), (৩) PostgreSQL প্রোডাকশন ডেটাবেজ (~২৫০MB RAM), (৪) Redis ক্যাশ ও মেসেজ কিউ (~৫০MB RAM), (৫) Nginx রিভার্স প্রক্সি SSL টার্মিনেশন সহ (~৩০MB RAM)। মোট RAM খরচ হবে মাত্র ৬০০-৭০০MB! বাকি ১.৩GB র‍্যাম ফ্রি থাকবে। অথচ PaaS-এ এই সেটআপ চালাতে প্রতি মাসে $৫০ থেকে $১০০ ডলার খরচ হয়ে যাবে!",
          "b": "একটি মাত্র $৬ ডলারের ভিপিএস এ Nginx, Next.js ফ্রন্টএন্ড, নোড ব্যাকএন্ড, Postgres ডাটাবেজ এবং Redis—সবকিছু একসাথে অনায়াসে চালানো যায়। অথচ PaaS এ এটি চালাতে মাসে ৫০-১০০ ডলার চলে যায়।",
          "e": "On a $6/mo Linux VPS (1 vCPU, 2GB RAM, NVMe), proper architecture (Nginx, PM2/Docker, 4GB swap) comfortably co-hosts: Next.js frontend, Node.js API, PostgreSQL database, Redis cache, and Let's Encrypt SSL. Total idle RAM footprint is ~700MB, delivering massive cost savings over multi-tier PaaS plans.",
          "tip": "দোকানি এবং রিয়েল-ওয়ার্ল্ড স্টার্টআপের এই আর্থিক সাশ্রয় ইন্টারভিউতে তুলে ধরলে বিজনেস ও আর্কিটেকচার উভয় সেন্স প্রমাণিত হয়।"
        },
        {
          "lvl": "lvl2",
          "q": "PaaS Pricing Explosion: ট্রাফিক বাড়ার সাথে সাথে কেন PaaS-এর ক্লাউড বিল ২০ গুণ লাফ দেয় এবং VPS কেন প্রেডিক্টেবল?",
          "m": "PaaS প্ল্যাটফর্মগুলো মিটারড প্রাইসিং (Metered Billing) মডেলে চলে: তারা ব্যান্ডউইথ (egress bandwidth), সার্ভারলেস ফাংশন এক্সিকিউশন টাইম (GB-seconds), ডাটাবেজ স্টোরেজ এবং বিল্ড মিনিটের ওপর প্রতি ইউনিটে চড়া দাম ধরে। অ্যাপ্লিকেশনে ট্রাফিক বাড়লে বা কোনো বট ক্রল করলে মাসের শেষে বিল হঠাৎ $২০ থেকে $৮০০ ডলারে পৌঁছে যায় (Cloud Shock Bill)! কিন্তু VPS-এর ক্ষেত্রে প্রাইসিং সম্পূর্ণ প্রেডিক্টেবল (Fixed Monthly Cost): আপনি প্রতি মাসে ফ্ল্যাট $১০ বা $২০ ডলার পে করবেন—সেখানে টেরাবাইট ব্যান্ডউইথ ও আনলিমিটেড সিপিইউ এক্সিকিউশন অন্তর্ভুক্ত থাকে। ফলে বাজেটের বাইরে কোনো অপ্রত্যাশিত বিলের ভয় থাকে না।",
          "b": "PaaS প্ল্যাটফর্মে রিকোয়েস্ট ও ব্যান্ডউইথের ওপর প্রতি ইউনিটে বিল করায় ট্রাফিক বাড়লে অপ্রত্যাশিতভাবে বিল কয়েক গুণ বেড়ে যায়। VPS এ নির্দিষ্ট মাসিক ফি থাকায় ক্লাউড বিল সবসময় সম্পূর্ণ প্রেডিক্টেবল ও নিয়ন্ত্রণে থাকে।",
          "e": "PaaS platforms monetize through metered compute, charging per GB-second, invocation count, and egress bandwidth. Traffic spikes or DDoS scrapes cause astronomical unexpected bills. A VPS provides fixed, predictable monthly billing with generous bundled multi-terabyte egress allowances.",
          "tip": "বলো: 'VPS offers predictable flat-rate unit economics, immune to PaaS egress and invocation billing shocks.'"
        },
        {
          "lvl": "lvl2",
          "q": "Next.js অ্যাপ্লিকেশনের 'Vercel Lock-in' বলতে কী বোঝায় এবং কীভাবে Next.js-কে নিজস্ব VPS-এ সেলফ-হোস্ট করবে?",
          "m": "Next.js-এর কিছু অ্যাডভান্সড ফিচার (যেমন Incremental Static Regeneration - ISR, Image Optimization, Edge Middleware) বাই-ডিফল্ট Vercel-এর নিজস্ব সার্ভারলেস ক্লাউড আর্কিটেকচারের সাথে অপটিমাইজ করা। অনেকেই মনে করে Vercel ছাড়া Next.js চালানো অসম্ভব! কিন্তু আমরা নিজস্ব VPS-এ ১০০% সেলফ-হোস্ট করতে পারি: (১) `next.config.js`-এ `output: 'standalone'` কনফিগার করি। (২) Docker কন্টেইনার বা PM2 দিয়ে `server.js` রান করি। (৩) ইমেজ অপটিমাইজেশনের জন্য লাইব্রেরি (Sharp) যুক্ত করি। (৪) Nginx রিভার্স প্রক্সি দিয়ে SSL ও ক্যাশিং হ্যান্ডেল করি। এর ফলে সম্পূর্ণ Next.js কোনো ভেন্ডর-লকইন ছাড়াই নিজস্ব সার্ভারে নিখুঁতভাবে চলে।",
          "b": "ভার্সেল ছাড়া নেক্সট.জেএস চালানো যাবে না—এই ধারণাকে ভেন্ডর লক-ইন বলে। next.config.js এ output: 'standalone' দিয়ে ডকার বা PM2 এবং Nginx ব্যবহার করে যেকোনো উবুন্টু VPS এ নেক্সট.জেএস সম্পূর্ণ ফ্রিতে সেলফ-হোস্ট করা যায়।",
          "e": "Next.js features (ISR, Image Optimization) are tailor-made for Vercel's serverless primitives. To liberate Next.js onto a self-hosted VPS, set output: 'standalone' in next.config.js, build with Sharp for native image compression, and supervise via PM2 or Docker behind Nginx.",
          "code": "// next.config.js:\nmodule.exports = {\n  output: 'standalone',\n  images: {\n    unoptimized: false,\n  }\n};"
        },
        {
          "lvl": "lvl2",
          "q": "Hybrid Architecture: Vercel-এ Next.js ফ্রন্টএন্ড এবং Ubuntu VPS-এ Node.js Backend ও Database রাখার সুবিধা কী?",
          "m": "এটি আধুনিক হাইব্রিড প্রোডাকশন স্ট্যান্ডার্ড: (১) `Frontend on Vercel`: ফ্রন্টএন্ড UI থাকে ভার্সেলের গ্লোবাল Edge CDN-এ। ফলে পৃথিবীর যেকোনো প্রান্ত থেকে ভিজিটররা মিলিসেকেন্ডে পেজ লোড পায়, স্বয়ংক্রিয় প্রিভিউ ডিপ্লয়মেন্ট এবং জিরো-কনফিগ এসএসএল পাওয়া যায়। (২) `Backend & Database on VPS`: সমস্ত ভারী ডাটাবেজ (PostgreSQL, Redis), ট্রানজ্যাকশন ও ব্যাকগ্রাউন্ড ওয়ার্কার থাকে একটি শক্তিশালী কম খরচের উবুন্টু VPS-এ। ফলে কোনো সার্ভারলেস কোল্ড স্টার্ট থাকে না, আনলিমিটেড ডেটাবেজ কানেকশন পাওয়া যায় এবং ক্লাউড খরচ সর্বনিম্ন থাকে। দুই প্রান্তের যোগাযোগ সুরক্ষিত করতে HTTPS এবং CORS পলিসি কার্যকর করা হয়।",
          "b": "হাইব্রিড মডেলে ফ্রন্টএন্ড থাকে ভার্সেলে যাতে গ্লোবাল সিডিএন দিয়ে পেজ দ্রুত খোলে, আর ব্যাকএন্ড ও ডাটাবেজ থাকে VPS এ যাতে কোনো কোল্ড স্টার্ট না থাকে এবং সার্ভার খরচ সর্বনিম্ন থাকে।",
          "e": "A Hybrid Architecture hosts Next.js on Vercel for global Edge CDN delivery, instant preview URLs, and frontend speed, while pairing it with an Ubuntu VPS for persistent backend APIs, PostgreSQL, and Redis. This combines peak developer velocity with zero cold starts and low hosting overhead.",
          "tip": "বলো: 'Hybrid Architecture couples Vercel's global edge frontend with a dedicated VPS for persistent, low-latency database execution.'"
        },
        {
          "lvl": "lvl2",
          "q": "PaaS থেকে VPS-এ মাইগ্রেশন করার সময় কী কী অপারেশনাল দায়িত্ব (DevOps Overhead) টিমের ওপর আসে?",
          "m": "PaaS স্বয়ংক্রিয়ভাবে যেসব কাজ পর্দার আড়ালে করত, VPS-এ সেগুলো ডেভেলপারদের নিজেদের হাতে নিতে হয়: (১) `OS Security Patching`: উবুন্টু সিকিউরিটি আপডেট ও কার্নেল প্যাচিং নিয়মিত করা। (২) `SSL Certificate Renewal`: Let's Encrypt Certbot কনফিগার ও অটো-রিনিউ নিশ্চিত করা। (৩) `Database Backup & Disaster Recovery`: ক্রন স্ক্রিপ্ট দিয়ে স্বয়ংক্রিয়ভাবে ডাটাবেজ ডাম্প নিয়ে ক্লাউড স্টোরেজে পাঠানো। (৪) `Process Supervision`: সার্ভার রিবুট বা ক্র্যাশে অ্যাপ অটো-রিস্টার্টের জন্য PM2 বা systemd ঠিক রাখা। (৫) `Firewall & DDoS Protection`: UFW, Fail2ban এবং Cloudflare দিয়ে সার্ভার সুরক্ষিত রাখা।",
          "b": "ভিপিএসে গেলে ওএস সিকিউরিটি আপডেট, এসএসএল রিনিউয়াল, ডাটাবেজ ব্যাকআপ, অটো-রিস্টার্ট এবং ফায়ারওয়াল পরিচালনার দায়িত্ব টিমের নিজের ওপর আসে। সঠিক স্ক্রিপ্ট ও অটোমেশন দিয়ে এটি সহজে নিয়ন্ত্রণ করা যায়।",
          "e": "Migrating from PaaS to a self-managed VPS assumes responsibility for: OS security patching, Certbot SSL automation, cron-based offsite database backups, PM2/systemd process supervision, and perimeter firewall security via UFW and Fail2ban.",
          "tip": "ইন্টারভিউতে এই ৫টি অপারেশনাল দায়িত্ব স্পষ্টভাবে তুলে ধরলে তোমার পরিপক্বতা প্রকাশ পাবে।"
        },
        {
          "lvl": "lvl2",
          "q": "Dokku এবং Coolify কী এবং কীভাবে তারা নিজস্ব VPS-কে একটি প্রাইভেট Heroku / Vercel-এ রূপান্তর করে?",
          "m": "`Dokku` এবং `Coolify` হলো সেলফ-হোস্টেড ওপেন-সোর্স PaaS ইঞ্জিন। আপনি একটি সাধারণ উবুন্টু VPS-এ Coolify বা Dokku ইনস্টল করলেই আপনার সার্ভারে একটি আকর্ষণীয় ওয়েব ড্যাশবোর্ড চলে আসে! এরপর Heroku বা Vercel-এর মতোই: গিটহাব রিপোজিটরি কানেক্ট করলেই কোড পুশ হলে অটো-বিল্ড ও অটো-ডিপ্লয় হয়, এক ক্লিকে PostgreSQL/Redis ডেটাবেজ প্রভিশন করা যায়, স্বয়ংক্রিয় SSL সার্টিফিকেট জেনারেট হয় এবং রিভার্স প্রক্সি কনফিগার হয়ে যায়। এর ফলে PaaS-এর সমস্ত চমৎকার সুবিধা পাওয়া যায় একটি মাত্র $৫-$১০ ডলারের সস্তা VPS-এর ওপর—কোনো অতিরিক্ত সাবস্ক্রিপশন ফি ছাড়াই!",
          "b": "Dokku ও Coolify হলো ওপেন-সোর্স PaaS যা নিজস্ব সস্তা VPS-কে একটি প্রাইভেট Heroku বা Vercel বানিয়ে দেয়। গিট পুশ অটো-ডিপ্লয়, অটো-এসএসএল এবং এক ক্লিকে ডাটাবেজ তৈরির সুবিধা পাওয়া যায় সম্পূর্ণ ফ্রিতে।",
          "e": "Dokku and Coolify are open-source, self-hosted PaaS solutions. Installed on a raw VPS, they provide a private Heroku/Vercel dashboard: automated Git-push deployments, one-click managed PostgreSQL/Redis databases, and automated Traefik/Nginx SSL routing with zero ongoing PaaS subscription overhead.",
          "tip": "বলো: 'Coolify turns a raw $5 VPS into a private self-hosted PaaS with Git-push deployments and one-click databases.'"
        },
        {
          "lvl": "lvl3",
          "q": "Serverless Database Connection Exhaustion: Vercel Serverless Function থেকে সরাসরি PostgreSQL-এ কানেক্ট করলে কেন ডেটাবেজ ক্র্যাশ করে এবং Neon/Supabase Pooler কীভাবে সমাধান করে?",
          "m": "সার্ভারলেস ফাংশনগুলো ট্রাফিক স্পাইক হলে নিমেষেই শত শত কনকারেন্ট ইনস্ট্যান্স স্পন করে। প্রতিটি ইনস্ট্যান্স নিজস্ব ডাটাবেজ কানেকশন পুল খোলার চেষ্টা করে (`new PrismaClient()`)। ফলে মাত্র ৫০০ জন ভিজিটর আসলে ৫০০টি সরাসরি কানেকশন ডেটাবেজে আঘাত হানে—যা পোস্টগ্রেসের `max_connections` (ডিফল্ট ১০০) মুহূর্তে শেষ করে ডেটাবেজ ক্র্যাশ করায়! সমাধান: সার্ভারলেস এপিআইতে সরাসরি ডেটাবেজ পোর্টে কানেক্ট করা সম্পূর্ণ নিষিদ্ধ। মাঝখানে একটি কানেকশন পুলার ব্যবহার করতে হবে (যেমন PgBouncer, Supabase Connection Pooler পোর্ট ৬৫৪৩, অথবা Neon Serverless Driver HTTP/WebSockets)। এটি শত শত সার্ভারলেস সংযোগকে ট্রানজ্যাকশন মোডে শেয়ার করে ডেটাবেজে মাত্র ২০-৩০টি কানেকশনে সীমাবদ্ধ রাখে।",
          "b": "সার্ভারলেস ফাংশন প্রতি রিকোয়েস্টে নতুন কানেকশন খুলে ডাটাবেজের লিমিট শেষ করে ফেলে। PgBouncer বা Supabase Pooler ব্যবহার করে শত শত কানেকশনকে অল্প কয়েকটি স্থায়ী কানেকশনে শেয়ার করে ডেটাবেজ সুরক্ষিত রাখা হয়।",
          "e": "Serverless functions burst to hundreds of concurrent container instances, each attempting to establish direct database connection pools, instantly overwhelming PostgreSQL's max_connections limit. Mitigate by routing traffic through PgBouncer, AWS RDS Proxy, or serverless HTTP database drivers (Neon/Supabase pooler).",
          "code": "// Database connection using pooled port 6543 with pgbouncer flag:\nDATABASE_URL=\"postgres://user:pass@db.dokani.com:6543/prod?pgbouncer=true\""
        },
        {
          "lvl": "lvl3",
          "q": "Global Edge Network Architecture: Cloudflare Workers / Vercel Edge Middleware কীভাবে ল্যাটেন্সি ০ মিলিসেকেন্ডে নামিয়ে আনে?",
          "m": "প্রথাগত ক্লাউড সার্ভার একটি নির্দিষ্ট ডেটাসেন্টারে থাকে (যেমন ফ্রাঙ্কফুর্ট বা ওহাইও); বাংলাদেশ থেকে সেখানে রিকোয়েস্ট যেতে ২০০ মিলিসেকেন্ড ল্যাটেন্সি লাগে। Edge Network হলো বিশ্বব্যাপী ৩০০+ শহরে ছড়িয়ে থাকা CDN নোডের নেটওয়ার্ক (যেমন ঢাকা ও চট্টগ্রামে ক্লাউডফ্লেয়ার এজ পয়েন্ট)। Edge Middleware একটি অতি-দ্রুত V8 আইসোলেট (Isolate) আর্কিটেকচারে সরাসরি ইউজারের সবচেয়ে কাছের শহরে চলে। ইউজার রিকোয়েস্ট পাঠানো মাত্রই ঢাকার এজ নোড অথেনটিকেশন যাচাই, জিও-রাউটিং, রিডাইরেক্ট বা বট ব্লকিং সম্পন্ন করে দেয় মাত্র ২ মিলিসেকেন্ডে—মূল সার্ভারে রিকোয়েস্ট পৌঁছানোরও প্রয়োজন হয় না।",
          "b": "এজ নেটওয়ার্ক ইউজারের সবচেয়ে কাছের শহরে (যেমন ঢাকা এজ নোড) V8 আইসোলেটে কোড এক্সিকিউট করে। ফলে মূল সার্ভারে না গিয়েও ২ মিলিসেকেন্ডে অথেনটিকেশন, রাউটিং ও বট চেকিং শেষ হয়ে যায়।",
          "e": "Edge Networks execute code within lightweight V8 isolates running directly inside global Point of Presence (PoP) edge data centers closest to the user. Edge Middleware handles authentication verification, geolocation redirects, and A/B test routing in sub-5ms latency without backhauling to origin servers.",
          "tip": "বলো: 'Edge middleware runs on V8 isolates in local edge PoPs, evaluating requests before hitting origin servers.'"
        },
        {
          "lvl": "lvl3",
          "q": "VPS স্কেলিং কৌশল: Vertical Scaling (রিসোর্স বৃদ্ধি) বনাম Horizontal Scaling (সার্ভার বৃদ্ধি) কখন কোনটি বেছে নেবে?",
          "m": "(১) `Vertical Scaling (Scale Up)`: একই সার্ভারের সিপিইউ ও র‍্যাম বাড়ানো (যেমন ৪GB র‍্যাম থেকে ১৬GB বা ৩২GB করা)। সুবিধা: কোনো আর্কিটেকচার পরিবর্তন লাগে না, কোড একই থাকে, ডেটাবেজ ট্রানজ্যাকশন ও কনসিস্টেন্সি জটিলতা থাকে না। একটি অপটিমাইজড নোড + পোস্টগ্রেস সার্ভার ভার্টিক্যালি স্কেল করে দৈনিক লাখ লাখ রিকোয়েস্ট অনায়াসে হ্যান্ডেল করতে পারে (৯০% অ্যাপের জন্য এটিই সেরা ও সাশ্রয়ী)। (২) `Horizontal Scaling (Scale Out)`: একাধিক সমান্তরাল সার্ভার বসিয়ে লোড ব্যালেন্সার দিয়ে ট্রাফিক ভাগ করা। কখন দরকার: যখন একটি সার্ভারের হার্ডওয়্যার লিমিট শেষ হয়ে যায়, বা হাই-অ্যাভেইলেবিলিটি (High Availability / Failover) বাধ্যতামূলক হয়। এর জন্য অ্যাপ্লিকেশনকে শতভাগ স্টেটলেস হতে হয় এবং সেন্ট্রালাইজড ডেটাবেজ ও রেডিস ক্লাস্টার প্রয়োজন হয়।",
          "b": "ভার্টিক্যাল স্কেলিং হলো সার্ভারের র‍্যাম-সিপিইউ বাড়ানো যা সহজ ও জটিলতাহীন। হরাইজন্টাল স্কেলিং হলো একাধিক সার্ভার বাড়ানো যা হাই-অ্যাভেইলেবিলিটি নিশ্চিত করে কিন্তু স্টেটলেস আর্কিটেকচার ও লোড ব্যালেন্সার দাবি করে।",
          "e": "Vertical Scaling (Scale Up) upgrades single-node CPU/RAM, requiring zero architectural refactoring while comfortably powering millions of requests on optimized stacks. Horizontal Scaling (Scale Out) introduces multiple stateless nodes behind load balancers for fault tolerance and high availability once single-box physical limits are reached.",
          "tip": "বলো: 'Always scale vertically first to maximize single-box efficiency before introducing distributed horizontal complexity.'"
        },
        {
          "lvl": "lvl3",
          "q": "Production Disaster Recovery on VPS: সম্পূর্ণ VPS ধ্বংস হয়ে গেলে অন্য একটি ফ্রেশ VPS-এ ১০ মিনিটে পুরো সিস্টেম কীভাবে রিস্টোর করবে?",
          "m": "আমরা 'Infrastructure as Code' এবং সম্পূর্ণ অটোমেটেড রিকভারি পাইপলাইন রাখি: (১) গিটহাবে একটি `provision.sh` স্ক্রিপ্ট থাকে যা ফ্রেশ উবুন্টু ওএস-এ Node, Docker, Nginx, UFW এক ক্লিকে ইনস্টল করে। (২) সমস্ত কনফিগারেশন (`docker-compose.yml`, `nginx.conf`, `ecosystem.config.js`) গিট রিপোজিটরিতে ভার্সন কন্ট্রোল্ড থাকে। (৩) AWS S3 Glacier থেকে ক্রন-ব্যাকআপ করা সর্বশেষ ডেটাবেজ ডাম্প ফাইল ডাউনলোড করে `pg_restore` চালাই। (৪) Cloudflare DNS-এ সার্ভারের এ-রেকর্ড (A Record) পরিবর্তন করে নতুন VPS-এর আইপি বসিয়ে দিই। মাত্র ১০ মিনিটের মধ্যে সম্পূর্ণ বিজনেস পুনরায় সচল হয়ে যায় (RTO < ১৫ মিনিট)।",
          "b": "provision.sh স্ক্রিপ্ট দিয়ে নতুন সার্ভারে সফটওয়্যার সেটআপ, গিট থেকে কনফিগ ক্লোন, S3 থেকে লেটেস্ট ব্যাকআপ রিস্টোর এবং Cloudflare এ নতুন আইপি আপডেট করে ১০ মিনিটে সম্পূর্ণ সিস্টেম রিকভার করা যায়।",
          "e": "Achieve a sub-15-minute RTO by maintaining Infrastructure-as-Code: run an automated provisioning script to stands up base runtimes, clone declarative Docker Compose repositories, restore the latest encrypted PostgreSQL dump from S3, and point Cloudflare DNS A-records to the replacement VPS IP.",
          "tip": "বলো: 'Infrastructure-as-Code scripts combined with automated offsite S3 restores reduce our RTO to under 15 minutes.'"
        },
        {
          "lvl": "lvl3",
          "q": "PaaS-এ ওয়েবসকেট (Socket.io) সংযোগের সীমাবদ্ধতা কী এবং VPS-এ কেন রিয়েল-টাইম সকেট সংযোগ শত গুণ বেশি স্টেবল?",
          "m": "PaaS বা সার্ভারলেস প্ল্যাটফর্মে (Vercel) সরাসরি দ্বিমুখী স্থায়ী TCP ওয়েবসকেট সাপোর্ট করে না (কারণ সার্ভারলেস ফাংশন কিছু সেকেন্ড পরেই বন্ধ হয়ে যায়)। ফলে তাদের জন্য থার্ড পার্টি পেইড সার্ভিস (যেমন Pusher বা Ably) নিতে হয় যা প্রচুর ব্যয়বহুল। Render বা Railway-তে সকেট চললেও ডিপ্লয়মেন্ট বা স্লিপিংয়ের সময় সব কানেকশন ড্রপ করে। অপরদিকে উবুন্টু VPS-এ Nginx এবং Node.js-এর স্থায়ী লং-লিভড TCP সকেট সংযোগ থাকে—যা কোনো ড্রপ বা এক্সট্রা বিল ছাড়াই হাজার হাজার ক্যাশিয়ারের লাইভ পিওএস বারকোড স্ক্যানার ও রিয়েল-টাইম নোটিফিকেশন নিরবচ্ছিন্নভাবে মাসের পর মাস সচল রাখে।",
          "b": "ভার্সেল সার্ভারলেস হওয়ায় স্থায়ী ওয়েব-সকেট চলে না এবং পুশার জাতীয় থার্ড পার্টি সার্ভিস কিনতে হয়। VPS এ Nginx দিয়ে স্থায়ী সকেট চলায় কোনো অতিরিক্ত খরচ ও ডিসকানেকশন ছাড়াই লাইভ সকেট নিরবচ্ছিন্নভাবে কাজ করে।",
          "e": "Serverless PaaS platforms cannot maintain persistent stateful WebSockets due to execution timeouts, forcing expensive third-party brokers (Pusher/Ably). A self-managed VPS supports native, persistent TCP WebSocket connections via Nginx and Node, sustaining thousands of persistent cashier sockets at zero marginal cost.",
          "tip": "মনে রাখবে: 'Native WebSockets thrive on persistent VPS architectures; serverless PaaS requires paid external pub/sub brokers.'"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: একটি স্টার্টআপ Vercel Pro এবং Supabase Pro দিয়ে যাত্রা শুরু করেছিল। ৬ মাস পর ইউজার ট্রাফিক বাড়ায় তাদের ক্লাউড বিল হঠাৎ প্রতি মাসে $১,২০০ ডলার আসছে যা তাদের বাজেটের বাইরে! কীভাবে পুরো স্ট্যাককে একটি $৪০/মাস VPS-এ মাইগ্রেট করে ক্লাউড বিল ৯৫% কমাবে?",
          "m": "মাইগ্রেশন আর্কিটেকচার প্ল্যান: (১) একটি শক্তিশালী $৪০/মাসের VPS (৪ Core, ৮GB RAM, Hetzner বা DigitalOcean) প্রভিশন করব। (২) Supabase থেকে `pg_dump` দিয়ে ডেটাবেজ এক্সপোর্ট করে VPS-এর সেলফ-হোস্টেড PostgreSQL-এ রিস্টোর করব। (৩) Next.js ফ্রন্টএন্ডে `output: 'standalone'` দিয়ে ডকার বা PM2 দিয়ে লোকালি রান করব। (৪) Nginx রিভার্স প্রক্সি কনফিগার করে SSL টার্মিনেশন ও স্ট্যাটিক ক্যাশিং সক্রিয় করব। (৫) সামনে ফ্রি Cloudflare CDN বসাব। ফলাফল: $১,২০০ ডলারের বিল নেমে আসবে মাত্র $৪০ ডলারে, এবং অ্যাপ্লিকেশন পারফরম্যান্স উল্টো দ্বিগুণ দ্রুত হবে কারণ ফ্রন্টএন্ড, ব্যাকএন্ড ও ডেটাবেজ একই লোকাল নেটওয়ার্কে অবস্থান করবে! স্টার্টআপের বার্ষিক প্রায় $১৪,০০০ ডলার সেভ হবে।",
          "b": "Hetzner ভিপিএসে সেলফ-হোস্টেড Postgres ও Next.js standalone মোডে Nginx দিয়ে সেটআপ করব। ডাটাবেজ ও ব্যাকএন্ড একই মেশিনে থাকায় লেটেন্সি কমবে এবং মাসিক ১২০০ ডলারের খরচ নেমে আসবে মাত্র ৪০ ডলারে।",
          "e": "Execute a PaaS-to-VPS repatriation: Provision an 8GB RAM VPS ($40/mo), restore the Supabase dump to self-hosted PostgreSQL, containerize Next.js in standalone mode behind Nginx, and proxy through Cloudflare. Co-locating frontend and database eliminates network round-trips while saving $14,000 annually.",
          "tip": "এই 'Cloud Repatriation' এবং ৯৫% কস্ট কাটিং কেস স্টাডি ইন্টারভিউতে তোমাকে একজন আর্কিটেক্ট হিসেবে প্রতিষ্ঠিত করবে।"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: Render ফ্রি টিয়ারে হোস্ট করা একটি ব্যাকএন্ড এপিআইতে ফ্রন্টএন্ড থেকে রিকোয়েস্ট পাঠালে প্রথমবার লোড হতে প্রায় ১ মিনিট সময় নিচ্ছে! ক্লায়েন্টরা ভাবছে অ্যাপ নষ্ট হয়ে গেছে। কারণ কী এবং তাৎক্ষণিক সমাধান কী?",
          "m": "কারণ: Render-এর ফ্রি টিয়ারে কোনো সার্ভিস ১৫ মিনিট অলস থাকলে স্বয়ংক্রিয়ভাবে স্লিপ বা স্পিন-ডাউন হয়ে যায়। নতুন রিকোয়েস্ট এলে কন্টেইনার বুট হতে এবং নোড রানটাইম চালু হতে ৫০-৬০ সেকেন্ড কোল্ড স্টার্ট ল্যাগ নেয়! তাৎক্ষণিক ওয়ার্কঅ্যারাউন্ড: (১) একটি ফ্রি আপটাইম মনিটর (যেমন UptimeRobot বা Cron-job.org) দিয়ে প্রতি ১০ মিনিট পর পর এপিআই-এর `/health` এন্ডপয়েন্টে পিং পাঠানো—যাতে কন্টেইনার কখনোই স্লিপে না যায় (Keep-alive ping)। (২) স্থায়ী প্রোডাকশন সমাধান: সার্ভিসটিকে $৭/মাসের রেন্ডার পেইড টিয়ারে আপগ্রেড করা অথবা নিজস্ব $৬ VPS-এ সরিয়ে নেওয়া যেখানে প্রসেস সার্বক্ষণিক ১০০% জীবন্ত থাকে।",
          "b": "রেন্ডার ফ্রি টিয়ার ১৫ মিনিট পর স্লিপে চলে যায়। UptimeRobot দিয়ে প্রতি ১০ মিনিটে /health এপিআই পিং করে সার্ভিসটিকে সার্বক্ষণিক জাগিয়ে রাখা যায়। আর স্থায়ী সমাধান হলো নিজস্ব VPS-এ স্থানান্তর করা।",
          "e": "Render's free tier spins down services after 15 minutes of inactivity, causing 50-second cold boot stalls. Immediate workaround: configure UptimeRobot to ping a /health endpoint every 10 minutes to prevent container dormancy. Long-term fix: migrate to a persistent VPS.",
          "code": "// Ping keep-alive health check:\napp.get('/health', (req, res) => res.status(200).send('OK'));"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: তোমার টিমের একজন ডেভেলপার Vercel-এ ডিপ্লয় করা Next.js অ্যাপের ভেতরে `fs.writeFileSync('/tmp/invoice.pdf')` দিয়ে ইনভয়েস সেভ করার কোড লিখেছে। কিন্তু ইউজার যখন কিছুক্ষণ পর ডাউনলোড করতে যাচ্ছে তখন ফাইল আর খুঁজে পাওয়া যাচ্ছে না (`ENOENT`)! কেন এটি ঘটছে এবং সঠিক আর্কিটেকচার কী?",
          "m": "সমস্যার কারণ: Vercel-এর সার্ভারলেস ফাংশনগুলো সম্পূর্ণ স্টেটলেস এবং ক্ষণস্থায়ী (Ephemeral)। যে ল্যাম্বডা ফাংশনটি ফাইল তৈরি করেছে, রিকোয়েস্ট শেষ হওয়ার সাথে সাথে তা ধ্বংস হয়ে গেছে; পরবর্তী ডাউনলোড রিকোয়েস্টটি পড়েছে সম্পূর্ণ অন্য একটি নতুন সার্ভারলেস ইনস্ট্যান্সে—যার ফলে লোকাল ডিস্কে ফাইল পাওয়া অসম্ভব। সঠিক আর্কিটেকচার: সার্ভারলেস পরিবেশে কখনোই কোনো ফাইল লোকাল ফাইলসিস্টেমে সেভ করা যাবে না! ফাইল তৈরি করে সরাসরি ক্লাউড অবজেক্ট স্টোরেজে (AWS S3 / Supabase Storage / Cloudflare R2) স্ট্রিম করতে হবে এবং কাস্টমারকে একটি সময়সীমিত S3 Presigned URL প্রদান করতে হবে।",
          "b": "ভার্সেল সার্ভারলেস ফাংশন ক্ষণস্থায়ী হওয়ায় কাজ শেষে ফাইল মুছে যায়। ফাইল লোকাল ডিস্কে না রেখে সরাসরি AWS S3 বা ক্লাউড স্টোরেজে আপলোড করতে হবে এবং ডাউনলোড করতে Presigned URL ব্যবহার করতে হবে।",
          "e": "Serverless containers are ephemeral; files written to /tmp vanish when the container is recycled, making them unreachable by subsequent requests. The correct architecture streams generated PDF buffers directly to object storage (AWS S3 / Cloudflare R2) and serves expiring Presigned URLs to clients.",
          "code": "const upload = await s3.send(new PutObjectCommand({ Bucket, Key, Body: pdfBuffer }));\nreturn presignedDownloadUrl;"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: একটি উবুন্টু VPS সার্ভারে নোড অ্যাপ চলছে। ট্রাফিক বাড়ার সাথে সাথে সার্ভার হঠাৎ রেসপন্স করা বন্ধ করে দিয়েছে এবং SSH দিয়েও লগইন করা যাচ্ছে না। ক্লাউড কনসোলে দেখাচ্ছে CPU 100% এবং RAM 99%। তুমি কীভাবে এটি রিকভার এবং ক্যাপাসিটি অপটিমাইজ করবে?",
          "m": "রিকভারি ও অপটিমাইজেশন: (১) ক্লাউড প্রোভাইডারের ড্যাশবোর্ড থেকে হার্ড রিবুট (Power Cycle) দেব যাতে সিস্টেম পুনরায় এক্সেসযোগ্য হয়। (২) টার্মিনালে ঢুকে অবিলম্বে ৪GB Swap মেমোরি কনফিগার করব—যাতে ভবিষ্যতে র‍্যাম পূর্ণ হলেও কার্নেল ক্র্যাশ না করে। (৩) PM2 কনফিগে `max_memory_restart: '800M'` এনফোর্স করব। (৪) Nginx-এ Rate Limiting এবং Cloudflare প্রক্সি চালু করব যাতে কোনো বট অপ্রয়োজনীয় ট্রাফিক দিয়ে সার্ভার স্যাচুরেট না করতে পারে। (৫) যদি ট্রাফিক সত্যিই লেজিটিমেট বিজনেস গ্রোথ হয়, তবে ক্লাউড ড্যাশবোর্ড থেকে মাত্র ২ ক্লিকে VPS-কে ২GB থেকে ৪GB বা ৮GB র‍্যামে ভার্টিক্যালি স্কেল (Resize Instance) করব।",
          "b": "হার্ড রিস্টার্ট দিয়ে সার্ভারে ঢুকে ৪GB সোয়াপ তৈরি করব এবং PM2 মেমোরি লিমিট বসাব। সামনে Cloudflare রেট লিমিটিং দেব এবং প্রয়োজনীয় ক্ষেত্রে ক্লাউড ড্যাশবোর্ড থেকে সার্ভারের র‍্যাম-সিপিইউ রিসাইজ করে স্কেল করব।",
          "e": "Issue a cloud dashboard power-cycle to recover terminal access. Immediately provision a 4GB swapfile to absorb RAM spikes, enforce PM2 max_memory_restart caps, and enable Cloudflare DDoS rate limiting. Resize the VPS droplet to higher compute tiers if traffic represents legitimate business scaling.",
          "tip": "বলো: 'Immediate power-cycle recovery, provision 4GB swap space, enforce PM2 memory ceilings, and resize instance.'"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: Vercel-এ ডিপ্লয় করা ফ্রন্টএন্ড এবং VPS-এ চলা ব্যাকএন্ড এপিআইয়ের মধ্যে যোগাযোগ করার সময় ব্রাউজারে এরর আসছে: `Access to fetch at 'https://api.dokani.com' has been blocked by CORS policy`। কীভাবে এটি ক্লিনভাবে সমাধান করবে?",
          "m": "সমাধানের দুটি বিকল্প: (১) `CORS Headers in Backend`: ব্যাকএন্ড নোড অ্যাপ্লিকেশনে (Express) `cors` মিডলওয়্যারে শুধুমাত্র অনুমোদিত ফ্রন্টএন্ড ডোমেনগুলো নির্দিষ্ট করে দেব: `origin: ['https://dokani.vercel.app', 'https://dokani.bip.sg']` এবং `credentials: true` এলাউ করব। (২) `Best Architecture (Custom Domain Rewrite)`: Next.js ফ্রন্টএন্ডে `next.config.js`-এ একটি রিরাইট রুল বসাব: `async rewrites() { return [{ source: '/api/:path*', destination: 'https://api.dokani.com/api/:path*' }] }`। এর ফলে ব্রাউজার মনে করবে রিকোয়েস্টটি একই অরিজিনে যাচ্ছে, ফলে কোনো CORS পলিসিই ট্রিগার হবে না এবং সম্পূর্ণ মসৃণ যোগাযোগ নিশ্চিত হবে।",
          "b": "ব্যাকএন্ডে cors মিডলওয়্যারে ফ্রন্টএন্ড ডোমেন এলাউ করতে হবে। অথবা নেক্সট.জেএস-এর next.config.js ফাইলে rewrites() ব্যবহার করে এপিআই কল রিরাইট করলে ব্রাউজারে কোনো CORS ঝামেলাই থাকে না।",
          "e": "Resolve CORS either by configuring Express cors middleware with whitelisted origins, or preferably by declaring Next.js rewrites in next.config.js to proxy /api/* requests to the VPS backend origin under the same hostname, eliminating CORS handshakes entirely.",
          "code": "// next.config.js rewrites:\nasync rewrites() {\n  return [\n    { source: '/api/:path*', destination: 'https://api.dokani.com/api/:path*' }\n  ];\n}"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা (Dokani SaaS): Dokani POS-এর প্রোডাকশন হোস্টিং আর্কিটেকচার কেন PaaS বাদ দিয়ে সম্পূর্ণ উবুন্টু VPS-এ পরিচালিত হয়?",
          "m": "দোকানি পিওএসে শত শত দোকানের ক্যাশিয়াররা প্রতি সেকেন্ডে লাইভ বারকোড স্ক্যান ও দ্রুত চেকআউট সম্পন্ন করে। PaaS বাদ দিয়ে VPS বেছে নেওয়ার ৩টি মূল আর্কিটেকচারাল কারণ: (১) `Zero Cold Starts`: ক্যাশিয়ারের সামনে কোনো ৩ সেকেন্ডের সার্ভারলেস ল্যাগ থাকতে পারে না; সার্বক্ষণিক রানিং VPS-এ রেসপন্স টাইম থাকে মাত্র ২-৩ মিলিসেকেন্ড। (২) `Persistent WebSockets`: লাইভ ইনভেন্টরি ও সিঙ্ক নোটিফিকেশনের জন্য দীর্ঘস্থায়ী দ্বিমুখী TCP সকেট কানেকশন প্রয়োজন যা PaaS-এ অত্যন্ত ব্যয়বহুল ও ভঙ্গুর। (৩) `Cost Efficiency`: হাজার হাজার দোকানের সেলস ও লেজার ডেটাবেজ PaaS-এ চালালে মাসিক বিল কয়েক হাজার ডলার হতো; অপটিমাইজড উবুন্টু VPS ক্লাস্টারে মাত্র $২০-$৪০ ডলারে সম্পূর্ণ স্ট্যাক অত্যন্ত শক্তিশালীভাবে রান করছে।",
          "b": "দোকানিতে কোল্ড স্টার্টহীন ২ মিলিসেকেন্ড চেকআউট স্পিড, দীর্ঘস্থায়ী রিয়েলটাইম ওয়েব-সকেট সংযোগ এবং হাজার হাজার দোকানের ডেটাবেজ পরিচালনায় ক্লাউড খরচ সর্বনিম্ন রাখতে সম্পূর্ণ সিস্টেম উবুন্টু VPS এ পরিচালনা করা হয়েছে।",
          "e": "Dokani POS standardizes on Ubuntu VPS over serverless PaaS for three core imperatives: sub-3ms deterministic checkout responses without serverless cold starts, native persistent TCP WebSockets for real-time cashier sync, and massive operational cost efficiencies across multi-tenant database clusters.",
          "tip": "দোকানির এই ৩টি কারণ (Zero Cold Starts, Persistent Sockets, Cost Efficiency) ইন্টারভিউতে তোমার বাস্তব অভিজ্ঞতার সবচেয়ে বড় প্রমাণ।"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: Hetzner Cloud বনাম AWS EC2: সাধারণ SaaS ও স্টার্টআপের জন্য হেটৎসনার কেন বর্তমানে বিশ্বব্যাপী জনপ্রিয়?",
          "m": "Hetzner Cloud ইউরোপের একটি শীর্ষস্থানীয় ক্লাউড প্রোভাইডার। তুলনা: AWS EC2-তে একটি ৪ Core, ১৬GB RAM সার্ভার ও ডেটা ট্রান্সফার চালাতে মাসে প্রায় $১০০-$১২০ ডলার খরচ হয়, সাথে জটিল ভিপিসি ও ব্যান্ডউইথ বিলিং থাকে। একই কনফিগারেশনের একটি AMD EPYC ক্লাউড ভিএম Hetzner-এ মাত্র €১০-€১৫ ইউরো ($১২-$১৬ ডলার)—অর্থাৎ AWS-এর চেয়ে ৭-৮ গুণ বেশি সাশ্রয়ী! সাথে ২০TB ফ্রি ব্যান্ডউইথ এবং সুপারফাস্ট NVMe SSD স্টোরেজ থাকে। স্টার্টআপ ও গ্রোয়িং SaaS-এর জন্য অপ্রয়োজনীয় জটিল ক্লাউড বিলিং ছাড়াই বিশাল কম্পিউট পাওয়ার পাওয়ার জন্য হেটৎসনার বর্তমানে ডেভেলপারদের প্রথম পছন্দ।",
          "b": "AWS EC2 এর সমপরিমাণ ক্ষমতা Hetzner মাত্র এক-সপ্তমাংশ খরচে (১২-১৫ ডলারে) প্রদান করে সাথে ২০TB ফ্রি ব্যান্ডউইথ দেয়। ফলে স্টার্টআপগুলোর জন্য হেটৎসনার অত্যন্ত জনপ্রিয় ও সাশ্রয়ী।",
          "e": "Hetzner Cloud delivers AMD EPYC compute and dedicated NVMe storage at roughly 15% of AWS EC2 pricing, bundling 20TB of free egress traffic per instance. For cost-conscious SaaS startups, Hetzner eliminates AWS egress billing complexity while delivering raw high-performance hardware.",
          "tip": "ইন্টারভিউতে 'Hetzner offers high-frequency NVMe compute at a fraction of AWS pricing' উল্লেখ করবে।"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: জিরো-ডাউনটাইম ডেপ্লয়মেন্টে VPS-এ Blue-Green Deployment বনাম Rolling Restart: কোনটি কখন ব্যবহার করবে?",
          "m": "(১) `Rolling Restart (PM2 Cluster)`: সিঙ্গেল সার্ভারে সবচেয়ে সহজ ও সেরা সমাধান। PM2 একটি একটি করে প্রসেস রিলোড করে, ফলে কোনো অতিরিক্ত সার্ভার বা হার্ডওয়্যার খরচ ছাড়াই লাইভ কানেকশন বজায় থাকে (দোকানিতে ব্যবহৃত)। (২) `Blue-Green Deployment`: যখন বড় ডেটাবেজ বা আর্কিটেকচারাল পরিবর্তন থাকে যেখানে পুরনো এবং নতুন কোড একই সাথে চলতে পারে না। দুটি সম্পূর্ণ অভিন্ন প্রোডাকশন পরিবেশ থাকে (Blue = লাইভ, Green = স্টেজিং)। নতুন কোড গ্রিনে ডিপ্লয় ও টেস্ট করার পর লোড ব্যালেন্সার বা Nginx এক সেকেন্ডে ট্রাফিক গ্রিনে ঘুরিয়ে দেয়। কোনো সমস্যা হলে সাথে সাথে ব্লু-তে ট্রাফিক ফিরিয়ে এনে ইনস্ট্যান্ট রোলব্যাক করা যায়।",
          "b": "সিঙ্গেল সার্ভারে PM2 রোলিং রিস্টার্ট দিয়ে অতিরিক্ত খরচ ছাড়া জিরো-ডাউনটাইম পাওয়া যায়। আর বড় আর্কিটেকচারাল পরিবর্তনে ব্লু-গ্রিন ডেপ্লয়মেন্ট দিয়ে ট্রাফিক মুহূর্তেই নতুন বা পুরনো পরিবেশে সুইচ করা যায়।",
          "e": "Rolling Restart via PM2 cluster mode achieves zero-downtime on single-instance servers with zero infrastructure overhead. Blue-Green Deployment deploys to an identical standby environment and switches load balancer traffic instantaneously, offering immediate one-second rollbacks during high-risk major releases.",
          "tip": "বলো: 'We leverage PM2 rolling reloads for continuous releases and Blue-Green pivots for high-risk breaking migrations.'"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: ক্লাউড স্টোরেজে ব্যাকআপ অর্কেস্ট্রেশন: AWS S3 Lifecycle Rules দিয়ে ব্যাকআপ খরচ কীভাবে অপটিমাইজ করবে?",
          "m": "প্রতিদিন ডেটাবেজ ব্যাকআপ এস৩ বাকেটে পাঠালে কয়েক মাস পর স্টোরেজ বিল বাড়তে থাকে। আমরা AWS S3-তে 'Lifecycle Management Rules' কনফিগার করি: (১) প্রথম ৭ দিন ব্যাকআপ ফাইল থাকে `S3 Standard`-এ (তাত্ক্ষণিক রিস্টোরের জন্য)। (২) ৩০ দিন পর ফাইলগুলো স্বয়ংক্রিয়ভাবে স্থানান্তরিত হয় `S3 Glacier Flexible Retrieval`-এ (যার খরচ স্ট্যান্ডার্ডের চেয়ে ৮০% কম)। (৩) ৯০ দিন পর ফাইলগুলো চলে যায় `S3 Glacier Deep Archive`-এ (যার খরচ প্রতি গিগাবাইট মাত্র $০.০০০৯৯)। (৪) ৩৬৫ দিন (১ বছর) পর অতি পুরনো ব্যাকআপ স্বয়ংক্রিয়ভাবে পার্জ বা ডিলিট হয়ে যায়। ফলে টেরাবাইট ব্যাকআপের মাসিক বিল মাত্র কয়েক ডলারে সীমাবদ্ধ থাকে।",
          "b": "S3 Lifecycle রুল ব্যবহার করে ৭ দিন পর Glacier এবং ৯০ দিন পর Deep Archive এ ব্যাকআপ ফাইল স্থানান্তর করা হয়। ফলে ক্লাউড স্টোরেজ খরচ ৮০-৯০% কমে যায় এবং পুরনো ফাইল অটো-ডিলিট হয়।",
          "e": "Optimize disaster recovery storage costs via AWS S3 Lifecycle Rules: retain daily snapshots in S3 Standard for 7 days, transition to S3 Glacier Flexible Retrieval after 30 days (80% cost reduction), archive into Glacier Deep Archive after 90 days, and auto-expire after 365 days.",
          "code": "# S3 Lifecycle transitions:\nStandard (Days 1-7) -> Glacier (Day 30) -> Deep Archive (Day 90) -> Expire (Day 365)"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: নতুন ক্লাউড প্রজেক্ট শুরু করার সময় VPS বনাম PaaS নির্বাচনের জন্য তোমার ডিসিশন ফ্রেমওয়ার্ক কী?",
          "m": "ডিসিশন ফ্রেমওয়ার্ক: (১) `PaaS (Vercel/Render)` বেছে নেব যদি: প্রজেক্টটি একদম প্রাথমিক আইডিয়া ভ্যালিডেশন বা হ্যাকাথন প্রজেক্ট হয়, টিমে কোনো ডেভঅপস ইঞ্জিনিয়ার না থাকে, ট্রাফিক খুবই কম হয় এবং দ্রুততম সময়ে ২-৩ দিনে লাইভ ডেমো দেখাতে হয়। (২) `VPS (Ubuntu/Docker)` বেছে নেব যদি: এটি একটি রিয়েল প্রোডাকশন বিজনেস (যেমন Dokani POS বা ই-কমার্স), যেখানে স্টেটফুল ডেটাবেজ ও রিয়েলটাইম সকেট দরকার, কোল্ড স্টার্ট গ্রহণযোগ্য নয়, দীর্ঘমেয়াদে ক্লাউড বিল প্রেডিক্টেবল ও সাশ্রয়ী রাখতে হবে এবং সম্পূর্ণ অবকাঠামোর ওপর নিজস্ব নিয়ন্ত্রণ প্রয়োজন।",
          "b": "আইডিয়া ভ্যালিডেশন ও দ্রুত ডেমোর জন্য PaaS নির্বাচন করব। কিন্তু রিয়েল প্রোডাকশন বিজনেস, পিওএস, ডেটাবেজ পারফরম্যান্স এবং দীর্ঘমেয়াদি খরচ সাশ্রয়ের জন্য নির্ভরযোগ্য VPS নির্বাচন করব।",
          "e": "Engineering Decision Framework: Choose PaaS for rapid MVPs and hackathons where team DevOps bandwidth is zero and traffic is nascent. Pivot to self-managed VPS when launching stateful commercial applications (Dokani POS), requiring zero cold starts, persistent WebSockets, full security sovereignty, and predictable unit economics.",
          "tip": "ইন্টারভিউতে এই ফ্রেমওয়ার্কটি তুলে ধরা একজন প্রাজ্ঞ টেক লিডের পরিচায়ক।"
        }
      ]
    },
    {
      "id": "cloudflare-dns-ssl",
      "name": "Cloudflare, DNS & SSL Architecture",
      "desc": "DNS Records (A, CNAME, TXT), Proxy Mode (Orange Cloud), SSL/TLS (Full Strict vs Flexible Loop), WAF, DDoS Mitigation, CDN Caching",
      "items": [
        {
          "lvl": "lvl1",
          "q": "DNS (Domain Name System) কী এবং প্রধান DNS রেকর্ডগুলো (A, CNAME, TXT, MX)-এর ভূমিকা কী?",
          "m": "DNS হলো ইন্টারনেটের ফোনবুক যা মানুষের পাঠযোগ্য ডোমেন নেমকে (`dokani.bip.sg`) মেশিনের পাঠযোগ্য আইপি অ্যাড্রেসে (`159.65.130.40`) রূপান্তর করে। প্রধান রেকর্ডসমূহ: (১) `A Record (Address)`: একটি ডোমেন বা সাবডোমেনকে সরাসরি একটি IPv4 অ্যাড্রেসের সাথে ম্যাপ করে (যেমন `api.dokani.com -> 192.0.2.1`)। (২) `CNAME Record (Canonical Name)`: একটি ডোমেনকে অন্য একটি ডোমেন নামের সাথে এলিয়াস (Alias) করে (যেমন `www.dokani.com -> dokani.com`)। (৩) `TXT Record`: টেক্সট ডেটা সংরক্ষণ করে, যা প্রধানত ডোমেন ওনারশিপ ভেরিফিকেশন (Google/Facebook) এবং ইমেইল সিকিউরিটিতে (SPF, DKIM) ব্যবহৃত হয়। (৪) `MX Record (Mail Exchange)`: ডোমেনের ইমেইল কোন মেইল সার্ভারে যাবে তা নির্দেশ করে।",
          "b": "DNS ডোমেন নেমকে আইপি অ্যাড্রেসে রূপান্তর করে। A রেকর্ড ডোমেনকে সরাসরি সার্ভার আইপিতে যুক্ত করে, CNAME রেকর্ড ডোমেনকে অন্য ডোমেনের সাথে এলিয়াস করে, TXT রেকর্ড ওনারশিপ ও ইমেইল সুরক্ষায় এবং MX রেকর্ড ইমেইল সার্ভার পরিচালনায় ব্যবহৃত হয়।",
          "e": "DNS resolves human-friendly hostnames to binary IP addresses. An A Record maps a domain directly to an IPv4 address. A CNAME Record aliases a subdomain to another canonical hostname. A TXT Record holds arbitrary text for domain verification and SPF/DKIM authentication. An MX Record routes incoming email to mail servers.",
          "tip": "বলো: 'A Record maps hostname to IPv4; CNAME aliases host to host; TXT verifies identity.'"
        },
        {
          "lvl": "lvl1",
          "q": "Cloudflare Proxy Mode ('Orange Cloud' বনাম 'Grey Cloud')-এর মধ্যে মূল পার্থক্য কী?",
          "m": "(১) `Orange Cloud (Proxied)`: ট্রাফিক ক্লাউডফ্লেয়ারের গ্লোবাল রিভার্স প্রক্সি নেটওয়ার্কের ভেতর দিয়ে যায়। সুবিধা: আপনার মূল সার্ভারের আসল আইপি অ্যাড্রেস ইন্টারনেটে সম্পূর্ণ গোপন থাকে (Hidden Origin IP), ফ্রি DDoS প্রটেকশন, Web Application Firewall (WAF), এবং গ্লোবাল CDN ক্যাশিং স্বয়ংক্রিয়ভাবে সক্রিয় থাকে। (২) `Grey Cloud (DNS Only)`: ক্লাউডফ্লেয়ার শুধুমাত্র একটি সাধারণ DNS রেজলভার হিসেবে কাজ করে। ক্লায়েন্ট সরাসরি আপনার সার্ভারের আসল আইপিতে আঘাত হানে; কোনো ক্যাশিং, প্রক্সি বা ক্লাউডফ্লেয়ার সিকিউরিটি স্তর থাকে না। নন-এইচটিটিপি সার্ভিস (যেমন সরাসরি SSH বা মেইল) ছাড়া সাধারণ ওয়েব সার্ভিসে সবসময় `Orange Cloud` সক্রিয় রাখা উচিত।",
          "b": "অরেঞ্জ ক্লাউড (Proxied) মূল সার্ভারের আইপি লুকিয়ে রেখে ক্লাউডফ্লেয়ারের সিকিউরিটি, সিডিএন ও ডিডিওএস প্রটেকশন দেয়। গ্রে ক্লাউড (DNS Only) শুধু আইপি রেজলভ করে কিন্তু কোনো প্রক্সি সুরক্ষা দেয় না।",
          "e": "Orange Cloud (Proxied) routes incoming web traffic through Cloudflare's global edge Anycast reverse proxy network, masking the true origin server IP and activating CDN caching, WAF, and DDoS mitigation. Grey Cloud (DNS Only) bypasses Cloudflare proxying, resolving queries directly to the origin server IP.",
          "tip": "মনে রাখবে: 'Orange Cloud hides origin IP behind Cloudflare's DDoS protection; Grey Cloud exposes origin IP.'"
        },
        {
          "lvl": "lvl1",
          "q": "Cloudflare-এর ৪টি SSL/TLS এনক্রিপশন মোড কী কী এবং 'Flexible SSL' কেন মারাত্মক অনিরাপদ?",
          "m": "৪টি মোড: (১) `Off`: কোনো এনক্রিপশন নেই। (২) `Flexible SSL`: ব্রাউজার থেকে ক্লাউডফ্লেয়ার পর্যন্ত HTTPS কিন্তু ক্লাউডফ্লেয়ার থেকে আপনার অরিজিন সার্ভার পর্যন্ত সম্পূর্ণ আন-এনক্রিপ্টেড প্লেইন HTTP! এটি মারাত্মক অনিরাপদ কারণ নেটওয়ার্কের মাঝে হ্যাকাররা ডেটা স্নাইফ করতে পারে এবং অরিজিন সার্ভার HTTPS ফোর্স করলে ক্লাউডফ্লেয়ার 'Infinite Redirect Loop' (ERR_TOO_MANY_REDIRECTS) বাগে আটকে যায়। (৩) `Full SSL`: ক্লাউডফ্লেয়ার থেকে অরিজিন পর্যন্ত এনক্রিপ্টেড কিন্তু সেলফ-সাইনড সার্টিফিকেট এলাউ করে। (৪) `Full (Strict) SSL` (প্রোডাকশন স্ট্যান্ডার্ড): ব্রাউজার থেকে ক্লাউডফ্লেয়ার এবং ক্লাউডফ্লেয়ার থেকে অরিজিন সার্ভার—উভয় প্রান্তে ভ্যালিড বিশ্বস্ত SSL সার্টিফিকেট থাকা বাধ্যতামূলক। শতভাগ এন্ড-টু-এন্ড এনক্রিপশন নিশ্চিত করতে সবসময় `Full (Strict)` মোড ব্যবহার করতে হবে।",
          "b": "Flexible SSL ব্রাউজার ও ক্লাউডফ্লেয়ারের মাঝে এনক্রিপ্ট করলেও সার্ভার পর্যন্ত আন-এনক্রিপ্টেড থাকে এবং রিডাইরেক্ট লুপ তৈরি করে। Full (Strict) মোড উভয় প্রান্তে সম্পূর্ণ ভ্যালিড এনক্রিপশন নিশ্চিত করে যা প্রোডাকশনের জন্য একমাত্র নিরাপদ মানদণ্ড।",
          "e": "Cloudflare SSL modes: Off, Flexible, Full, and Full (Strict). Flexible SSL is insecure because traffic between Cloudflare edge and the origin server flows over unencrypted plaintext HTTP, causing 'ERR_TOO_MANY_REDIRECTS' loops when origins enforce HTTPS. Always enforce Full (Strict) mode for true end-to-end cryptographic encryption.",
          "code": "# In Cloudflare Dashboard:\nSSL/TLS -> Overview -> Select: Full (strict)"
        },
        {
          "lvl": "lvl1",
          "q": "DNS Propagation কী এবং `TTL (Time to Live)` কীভাবে ডিএনএস আপডেটকে প্রভাবিত করে?",
          "m": "DNS Propagation হলো বিশ্বব্যাপী সমস্ত ISP ও লোকাল DNS ক্যাশিং সার্ভারগুলোতে কোনো ডোমেনের নতুন আইপি রেকর্ড ছড়িয়ে পড়ার সময়কাল। `TTL (Time to Live)` হলো একটি সংখ্যা (সেকেন্ডে) যা নির্দেশ করে কোনো ডিএনএস রেজলভার সার্ভার কতক্ষণ ওই রেকর্ডটি ক্যাশে ধরে রাখবে। যদি কোনো রেকর্ডের TTL হয় `86400` (২৪ ঘণ্টা), তবে আপনি সার্ভার আইপি পরিবর্তন করলেও বিশ্বব্যাপী ইউজারদের কাছে নতুন আইপিতে ট্রাফিক যেতে পুরো ২৪ ঘণ্টা সময় লেগে যাবে! সার্ভার মাইগ্রেশনের আগের দিন TTL কমিয়ে `300` (৫ মিনিট) সেট করে রাখা বেস্ট প্র্যাকটিস, যাতে আইপি পরিবর্তনের সাথে সাথে ৫ মিনিটের মধ্যে বিশ্বব্যাপী ট্রাফিক নতুন সার্ভারে চলে আসে।",
          "b": "ডিএনএস প্রোপাগেশন হলো নতুন আইপি বিশ্বজুড়ে ছড়িয়ে পড়ার সময়। TTL নির্ধারণ করে ডিএনএস সার্ভার কতক্ষণ রেকর্ডটি ক্যাশে রাখবে। মাইগ্রেশনের আগে TTL কমিয়ে ৫ মিনিট (৩০০ সেকেন্ড) রাখলে তাৎক্ষণিকভাবে নতুন সার্ভারে ট্রাফিক আপডেট হয়।",
          "e": "DNS Propagation is the interval required for global recursive DNS resolvers to refresh cached records. TTL (Time to Live) dictates how long resolvers cache a record. Lowering TTL to 300 seconds prior to server migrations ensures global DNS updates propagate in under 5 minutes.",
          "tip": "বলো: 'Lower TTL to 300s before migrations to ensure near-instantaneous global DNS cutover.'"
        },
        {
          "lvl": "lvl1",
          "q": "Cloudflare CDN (Content Delivery Network) ক্যাশিং কীভাবে ওয়েবসাইটের ব্যান্ডউইথ খরচ ৯০% কমিয়ে দেয়?",
          "m": "যখন কোনো ইউজার আপনার সাইট ভিজিট করে, ক্লাউডফ্লেয়ারের গ্লোবাল এজ সার্ভারগুলো স্ট্যাটিক ফাইলগুলো (CSS, JS, ইমেজ, ওয়েব ফন্ট) নিজেদের মেমোরিতে ক্যাশ করে নেয়। পরবর্তী যে কোনো ইউজার যখন ওই ফাইলগুলো চায়, ক্লাউডফ্লেয়ার আপনার মূল সার্ভারে কোনো রিকোয়েস্টই পাঠায় না—বরং ইউজারের ভৌগোলিক নিকটবর্তী এজ ডেটাসেন্টার (যেমন ঢাকা এজ) থেকে আলো-গতির বেগে ফাইল ফিরিয়ে দেয়। এর ফলে মূল VPS সার্ভারের ব্যান্ডউইথ ব্যবহার ৮০-৯০% কমে যায়, সিপিইউ লোড শূন্যে নামে এবং পেজ লোড টাইম কয়েক সেকেন্ড থেকে নেমে কয়েক মিলিসেকেন্ডে চলে আসে।",
          "b": "ক্লাউডফ্লেয়ার সিডিএন স্ট্যাটিক ফাইলগুলো এজ সার্ভারে ক্যাশ করে রাখে। ফলে পরবর্তী ভিজিটরদের ক্ষেত্রে মূল সার্ভারে কোনো রিকোয়েস্ট যায় না, লোকাল এজ থেকেই ফাইল চলে আসে। এতে সার্ভার ব্যান্ডউইথ খরচ ৯০% পর্যন্ত হ্রাস পায়।",
          "e": "Cloudflare CDN caches static web assets across its global 300+ Edge points of presence. Subsequent visitors receive images, scripts, and fonts directly from their local edge data center, eliminating origin server traffic, dropping transit costs by 90%, and slashing latency.",
          "tip": "বলো: 'Edge CDN caching serves assets from local edge PoPs, offloading 90% of origin network bandwidth.'"
        },
        {
          "lvl": "lvl2",
          "q": "Cloudflare 'Under Attack Mode' কী এবং লেয়ার ৭ (HTTP Flood) DDoS আক্রমণের সময় এটি কীভাবে সার্ভার বাঁচায়?",
          "m": "'Under Attack Mode' হলো ক্লাউডফ্লেয়ারের একটি এমার্জেন্সি ডিফেন্স মেকানিজম। যখন সাইটে সেকেন্ডে লাখ লাখ বট ও ম্যালিশিয়াস ট্রাফিকের বন্যা আসে যা সার্ভার ক্র্যাশ করাতে পারে, তখন এক ক্লিকে এই মোড অন করা হয়। এটি সাথে সাথে মূল সাইট খোলার আগে সমস্ত ইনকামিং ভিজিটরের সামনে একটি লাইভ জাভাস্ক্রিপ্ট চ্যালেঞ্জ (Cloudflare Managed Challenge / Turnstile) উপস্থাপন করে। আক্রমণকারী সাধারণ বটনেট ও পাইথন স্ক্রিপ্টগুলো জাভাস্ক্রিপ্ট এক্সিকিউট করতে না পেরে দরজায় আটকে যায়; শুধুমাত্র আসল মানব ইউজারদের ৫ সেকেন্ডের মধ্যে কোনো ক্যাপচা টাইপ করা ছাড়াই স্বয়ংক্রিয়ভাবে মূল সাইটে প্রবেশ করতে দেওয়া হয়। সার্ভারের সিপিইউ瞬间 ০%-এ ফিরে আসে।",
          "b": "Under Attack Mode এক ক্লিকে সক্রিয় করে সেকেন্ডে লাখ লাখ বটের আক্রমণ ঠেকানো যায়। এটি প্রতিটি রিকোয়েস্টে ব্যাকগ্রাউন্ড জাভাস্ক্রিপ্ট চ্যালেঞ্জ চালিয়ে সব হ্যাকার বট আটকে দেয় এবং শুধু আসল ব্যবহারকারীদের সাইটে প্রবেশ করায়।",
          "e": "Under Attack Mode mitigates Layer-7 HTTP Flood volumetric DDoS attacks. It interposes an automated JavaScript execution challenge (Turnstile) before allowing access to origin infrastructure. Headless bots and attack scripts fail the cryptographic handshake, filtering abusive floods to zero.",
          "code": "# Can be enabled via Cloudflare Dashboard or API instantly:\ncurl -X PATCH \"https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/security_level\" \\\n     -H \"Authorization: Bearer $CF_TOKEN\" \\\n     --data '{\"value\":\"under_attack\"}'"
        },
        {
          "lvl": "lvl2",
          "q": "Cloudflare Web Application Firewall (WAF) কাস্টম রুলস কীভাবে ক্ষতিকর ট্রাফিক ও আক্রমণ ব্লক করে?",
          "m": "Cloudflare WAF ইনকামিং প্রতিটি HTTP রিকোয়েস্ট পরীক্ষা করে। আমরা কাস্টম রুলস ডিফাইন করতে পারি: (১) `Country Blocking`: নির্দিষ্ট দেশ থেকে সন্দেহজনক ট্রাফিক আসলে ব্লক করা (`ip.geoip.country eq \"RU\" or ip.geoip.country eq \"CN\"`)। (২) `Bad User-Agents`: স্ক্র্যাপার ও আক্রমণকারী স্ক্রিপ্ট ব্লক করা (`http.user_agent contains \"sqlmap\" or http.user_agent contains \"python\"`)। (৩) `Admin Area Protection`: সংবেদনশীল অ্যাডমিন রুটে (যেমন `/admin/*` বা `/wp-admin`) শুধুমাত্র আপনার অফিসের নির্দিষ্ট স্ট্যাটিক আইপি এলাউ করে বাকি সবার জন্য 403 Forbidden ফিরিয়ে দেওয়া। এটি সার্ভারে পৌঁছানোর আগেই এজ লেভেলেই ৯৯.৯% সাইবার থ্রেট নস্যাৎ করে।",
          "b": "Cloudflare WAF এজ লেভেলে ক্ষতিকর দেশ, স্ক্র্যাপার বট এবং হ্যাকিং টুল ব্লক করে। এছাড়া অ্যাডমিন প্যানেলে নির্দিষ্ট আইপি ছাড়া বাকি সবার অ্যাক্সেস বন্ধ করে দিয়ে সর্বোচ্চ নিরাপত্তা প্রদান করে।",
          "e": "Cloudflare WAF intercepts malicious Layer 7 traffic at the edge before hitting origin infrastructure. Custom firewall rules enforce geolocation IP blocks, block automated scraping tools (sqlmap, curl), and restrict administrative routes (/admin/*) strictly to whitelisted office CIDR blocks.",
          "code": "# WAF Expression Rule:\n(http.request.uri.path contains \"/admin/\" and not ip.src in {103.205.180.0/24}) -> Action: Block"
        },
        {
          "lvl": "lvl2",
          "q": "Cloudflare Cache Rules এবং Page Rules দিয়ে ডায়নামিক এপিআই ও স্ট্যাটিক সাইটের ক্যাশিং আচরণ কীভাবে নিয়ন্ত্রণ করবে?",
          "m": "বাই-ডিফল্ট ক্লাউডফ্লেয়ার কোনো HTML পেজ বা এপিআই রেসপন্স ক্যাশ করে না (শুধু ইমেজ, CSS, JS ক্যাশ করে)। ক্যাশ রুলস দিয়ে আমরা সূক্ষ্মভাবে নিয়ন্ত্রণ করি: (১) `Bypass Cache for APIs`: নিশ্চিত করি যেন কোনো এপিআই এন্ডপয়েন্ট ভুলবশত ক্যাশ না হয়ে যায়: `URI Path starts with /api/` -> `Cache Eligibility: Bypass Cache`। (২) `Edge Cache for Public Blogs`: যেসব পাবলিক পেজ বদলায় না সেগুলোতে `Cache Everything` এবং `Edge Cache TTL: 1 day` সেট করি। (৩) `Origin Cache-Control Respect`: অরিজিন সার্ভারের পাঠানো `Cache-Control: public, s-maxage=3600` হেডার মেনে চলার নির্দেশ দেওয়া।",
          "b": "ক্যাশ রুল দিয়ে /api/ পাথকে ক্যাশ বাইপাস করা হয় যাতে এপিআই সর্বদা লাইভ থাকে। আর স্ট্যাটিক পেজে Cache Everything রুল দিয়ে এজ ক্যাশিং সক্রিয় করে পেজ লোডিংকে সুপারফাস্ট করা হয়।",
          "e": "Configure Cloudflare Cache Rules: explicitly set 'Bypass Cache' for /api/* and authenticated paths to prevent serving stale user sessions. Set 'Cache Everything' on immutable public landing pages with explicit Edge TTLs, offloading 99% of web traffic from origin servers.",
          "code": "# Rule 1: /api/* -> Bypass Cache\n# Rule 2: /assets/* -> Cache Everything, Edge TTL: 1 month"
        },
        {
          "lvl": "lvl2",
          "q": "Cloudflare Authenticated Origin Pulls (AOP) এবং Cloudflare Origin CA সার্টিফিকেট কেন ব্যবহার করা উচিত?",
          "m": "যদি কোনো হ্যাকার কোনোভাবে আপনার VPS সার্ভারের আসল আইপি অ্যাড্রেস বের করে ফেলে (`159.65.130.40`), সে ক্লাউডফ্লেয়ারকে সম্পূর্ণ বাইপাস করে সরাসরি আপনার সার্ভারে আক্রমণ চালাতে পারে! সমাধান: (১) `Cloudflare Origin CA Certificate`: ক্লাউডফ্লেয়ার থেকে একটি ১৫ বছরের ফ্রি SSL সার্টিফিকেট জেনারেট করে Nginx-এ বসানো। (২) `Authenticated Origin Pulls (AOP)`: Nginx-এ ক্লাউডফ্লেয়ারের পাবলিক CA সার্টিফিকেট কনফিগার করা (`ssl_client_certificate /etc/nginx/certs/cloudflare.crt; ssl_verify_client on;`)। এর ফলে Nginx শুধুমাত্র সেই রিকোয়েস্টগুলোকেই গ্রহণ করবে যা ভ্যালিড ক্লাউডফ্লেয়ার এজ থেকে আসছে—সরাসরি আসল আইপিতে আঘাত হানা যেকোনো বহিরাগত রিকোয়েস্ট Nginx তাৎক্ষণিকভাবে ড্রপ করে দেবে।",
          "b": "হ্যাকার যেন সরাসরি সার্ভার আইপিতে হিট করে ক্লাউডফ্লেয়ারকে বাইপাস করতে না পারে, সেজন্য Authenticated Origin Pulls ব্যবহার করা হয়। ফলে ক্লাউডফ্লেয়ার ছাড়া অন্য কোনো উৎস থেকে আসা রিকোয়েস্ট সার্ভার সরাসরি বাতিল করে দেয়।",
          "e": "If an attacker discovers your raw origin IP, they can bypass Cloudflare WAF entirely. Authenticated Origin Pulls (AOP) enforces mutual TLS (mTLS) between Cloudflare and Nginx. Nginx validates Cloudflare's client certificate on every connection, dropping any connection originating from outside Cloudflare's proxy network.",
          "code": "# In Nginx:\nssl_client_certificate /etc/nginx/certs/cloudflare.crt;\nssl_verify_client on;"
        },
        {
          "lvl": "lvl2",
          "q": "Cloudflare Turnstile কী এবং ট্র্যাডিশনাল Google reCAPTCHA-এর চেয়ে এটি কেন ডেভেলপার ও ইউজারদের কাছে সেরা?",
          "m": "`Cloudflare Turnstile` হলো একটি আধুনিক, ইউজার-ফ্রেন্ডলি ক্যাপচা বিকল্প। ট্র্যাডিশনাল Google reCAPTCHA ইউজারদের ট্রাফিক লাইট বা ক্রসিং খুঁজতে বলে সময় নষ্ট করায় এবং ইউজারের প্রাইভেসি ট্র্যাকিং করে। Turnstile সম্পূর্ণ ইনভিজিবল বা মাত্র এক-ক্লিকের স্মার্ট চ্যালেঞ্জ চালায়। এটি ব্রাউজারের নন-ইনভেসিভ টেলিমেট্রি ও প্রাইভেট স্টেট টোকেন বিশ্লেষণ করে ৮৫% ক্ষেত্রে কোনো ক্যাপচা পাজল ছাড়াই ব্যাকগ্রাউন্ডে যাচাই সম্পন্ন করে দেয়। এটি সম্পূর্ণ ফ্রি, আনলিমিটেড ব্যবহার করা যায় এবং ফ্রন্টএন্ডে মাত্র ৩ লাইনের কোডে ইন্টিগ্রেট করা যায়।",
          "b": "টার্নস্টাইল হলো গুগলের বিরক্তিকর ক্যাপচার বিকল্প। কোনো ট্রাফিক লাইট খোঁজা ছাড়া এটি ব্যাকগ্রাউন্ডে ইনভিজিবলভাবে হ্যাকার বট শনাক্ত করে এবং আসল ইউজারদের কোনো ঝামেলা ছাড়াই সাইটে প্রবেশের অনুমতি দেয়।",
          "e": "Cloudflare Turnstile is an invisible, privacy-focused CAPTCHA alternative. Unlike frustrating Google reCAPTCHA image puzzles that crater conversion rates, Turnstile runs automated browser entropy checks silently, delivering frictionless authentication with zero user tracking.",
          "code": "<script src=\"https://challenges.cloudflare.com/turnstile/v0/api.js\" async defer></script>\n<div class=\"cf-turnstile\" data-sitekey=\"your-turnstile-sitekey\"></div>"
        },
        {
          "lvl": "lvl3",
          "q": "Cloudflare Worker / Edge Functions দিয়ে রিয়েল-টাইম জিও-বেসড রেস্ট্রিকশন ও কারেন্সি সুইচিং কীভাবে ইমপ্লিমেন্ট করবে?",
          "m": "Cloudflare Workers সরাসরি ক্লাউডফ্লেয়ারের ৩০০+ এজ লোকেশনে রান করে। প্রতিটি ইনকামিং রিকোয়েস্টে ক্লাউডফ্লেয়ার স্বয়ংক্রিয়ভাবে ক্লায়েন্টের ভৌগোলিক তথ্য যুক্ত করে: `request.cf.country`, `request.cf.city`, এবং `request.cf.latitude`। আমরা একটি অতিক্ষুদ্র এজ ফাংশন লিখতে পারি: যদি ভিজিটর বাংলাদেশ থেকে আসে (`country === 'BD'`), তবে রেসপন্সে কারেন্সি `BDT` সেট করে লোকাল ক্যাশ সার্ভ করব; যদি ভিজিটর ইউএসএ থেকে আসে তবে `USD` কারেন্সিতে রুট করব। কোনো ব্যাকএন্ড সার্ভারে না গিয়ে এজ লেভেলেই এটি সাব-৫ মিলিসেকেন্ডে সম্পন্ন হয়।",
          "b": "ক্লাউডফ্লেয়ার ওয়ার্কার এজ লোকেশনে চলে এবং request.cf.country দিয়ে ইউজারের দেশ চেনে। বাংলাদেশ হলে BDT এবং ইউএসএ হলে USD কারেন্সিতে মিলি-সেকেন্ডে এজ থেকেই রেসপন্স পাঠানো যায় কোনো সার্ভার লোড ছাড়াই।",
          "e": "Cloudflare Workers inspect incoming request metadata (request.cf.country, request.cf.city) natively at the edge. A Worker can intercept traffic and mutate response headers or rewrite upstream payloads to inject local currencies (BDT vs USD) and currencies in sub-5ms latency before hitting backend servers.",
          "code": "export default {\n  async fetch(request) {\n    const country = request.cf?.country || 'US';\n    const currency = country === 'BD' ? 'BDT' : 'USD';\n    const response = await fetch(request);\n    const newHeaders = new Headers(response.headers);\n    newHeaders.set('X-Local-Currency', currency);\n    return new Response(response.body, { ...response, headers: newHeaders });\n  }\n};"
        },
        {
          "lvl": "lvl3",
          "q": "DNSSEC (DNS Security Extensions) কী এবং এটি DNS Spoofing ও Cache Poisoning আক্রমণ কীভাবে প্রতিরোধ করে?",
          "m": "DNSSEC হলো ডেনএস রেজোলিউশনের জন্য একটি ক্রিপ্টোগ্রাফিক অথেনটিকেশন স্তর। সাধারণ DNS রেজোলিউশনে কোনো এনক্রিপশন থাকে না; ফলে হ্যাকাররা ম্যান-ইন-দ্য-মিডল বা ডিএনএস ক্যাশ পয়জনিংয়ের মাধ্যমে গ্রাহককে ব্যাংকের আসল আইপির বদলে নিজের তৈরি জাল ফিশিং সাইটের আইপিতে রিডাইরেক্ট করতে পারে। DNSSEC পাবলিক-কি ক্রিপ্টোগ্রাফি ব্যবহার করে প্রতিটি ডিএনএস রেকর্ডকে ডিজিটাল সাইন (RRSIG) করে। ডিএনএস রেজলভার রুট জোন থেকে শুরু করে চেইন অফ ট্রাস্ট (DS Record) যাচাই করে নিশ্চিত করে যে রেকর্ডটি সত্যই আসল ডোমেন ওনার তৈরি করেছে। কোনো টেম্পারিং ধরা পড়লে রেজলভার রিকোয়েস্টটি তৎক্ষণাৎ ড্রপ করে দেয়।",
          "b": "DNSSEC পাবলিক-কি ক্রিপ্টোগ্রাফি দিয়ে প্রতিটি ডিএনএস রেকর্ডকে ডিজিটাল সাইন করে। এটি হ্যাকারদের ডিএনএস ক্যাশ পয়জনিং ও ফিশিং সাইটে ট্রাফিক চুরি করা শতভাগ প্রতিহত করে।",
          "e": "DNSSEC introduces cryptographic signatures to DNS records using public-key cryptography. Resolvers trace a cryptographic Chain of Trust from root anchors via DS and DNSKEY records to verify that DNS responses were authentically published by the zone owner without intermediary tampering or cache poisoning.",
          "tip": "বলো: 'DNSSEC enforces cryptographic Chain of Trust, preventing DNS spoofing and cache poisoning attacks.'"
        },
        {
          "lvl": "lvl3",
          "q": "Cloudflare Rate Limiting Rules (Advanced): পেমেন্ট এবং ওটিপি এপিআই এন্ডপয়েন্টে ব্রুট-ফোর্স রোধে কীভাবে মাল্টি-ডাইমেনশনাল রুলস লিখবে?",
          "m": "পেমেন্ট গেটওয়ে বা এসএমএস ওটিপি এপিআইতে সাধারণ আইপি-বেসড লিমিট যথেষ্ট নয় কারণ আক্রমণকারীরা প্রক্সি দিয়ে আইপি বদলাতে পারে। আমরা Cloudflare Advanced Rate Limiting-এ একাধিক শর্তের কম্বিনেশন করি: (১) এক্সপ্রেশন: `http.request.uri.path eq \"/api/v1/auth/send-otp\"`। (২) ম্যাচিং ক্যারেক্টারিস্টিক: ক্লায়েন্ট আইপি এবং রিকোয়েস্ট হেডারে থাকা ফোন নম্বরের হ্যাশ যৌথভাবে ট্র্যাক করা। (৩) লিমিট: ৫টি রিকোয়েস্ট প্রতি ১০ মিনিটে। (৪) অ্যাকশন: যদি লিমিট পার হয়, তবে আক্রমণকারীকে সাধারণ ব্লক না করে সরাসরি ১০ মিনিটের জন্য 'Managed Challenge' বা 'Block 429' দেওয়া। এটি এসএমএস গেটওয়ে ড্রেনিং আক্রমণ পুরোপুরি বন্ধ করে।",
          "b": "ওটিপি ও পেমেন্ট এপিআই সুরক্ষায় ক্লাউডফ্লেয়ার অ্যাডভান্সড রেট লিমিটিং দিয়ে নির্দিষ্ট পাথে ১০ মিনিটে সর্বোচ্চ ৫টি রিকোয়েস্টের নিয়ম করা হয়। সীমা ছাড়িয়ে গেলে ব্লক বা চ্যালেঞ্জ দিয়ে এসএমএস গেটওয়ে সুরক্ষিত রাখা হয়।",
          "e": "Craft multidimensional rate limiting rules targeting sensitive paths (/api/auth/send-otp): count requests combining client IP and target payload characteristics. If requests breach 5 requests per 10 minutes, apply a 600-second block mitigation, thwarting SMS gateway toll-fraud attacks.",
          "code": "# Cloudflare Expression:\n(http.request.uri.path eq \"/api/v1/otp/send\")\n# Action: Block for 10 minutes if count > 5 in 10m"
        },
        {
          "lvl": "lvl3",
          "q": "Cloudflare Anycast Routing কী এবং কীভাবে এটি ডিডিওএস আক্রমণকে বিশ্বব্যাপী শোষণ (Dissipate) করে?",
          "m": "Unicast রাউটিংয়ে একটি আইপি অ্যাড্রেস নির্দিষ্ট একটি ফিজিক্যাল ডেটাসেন্টারের সার্ভারকে নির্দেশ করে—ফলে ১ টেরাবিটের দানবীয় আক্রমণ এলে পুরো ডেটাসেন্টার ডাউন হয়ে যায়। Cloudflare `Anycast BGP Routing` ব্যবহার করে: বিশ্বব্যাপী ৩০০টিরও বেশি শহরের ডেটাসেন্টারে একই সিঙ্গেল আইপি অ্যাড্রেস অ্যানাউন্স করা থাকে! যখন হ্যাকার বটনেট আক্রমণ চালায়, তখন গ্লোবাল BGP রাউটিং আক্রমণের ট্রাফিককে বিশ্বব্যাপী সমস্ত লোকাল ডেটাসেন্টারে (লন্ডন, ফ্রাঙ্কফুর্ট, সিঙ্গাপুর, টোকিও, ডালাস) টুকরো টুকরো করে ছড়িয়ে দেয়। কোনো একটি নির্দিষ্ট সার্ভারে লোড না পড়ে সম্পূর্ণ ট্রাফিক এজ নেটওয়ার্কের শত টেরাবিট ব্যাকবোনে মুহূর্তের মধ্যে শোষিত ও ড্রপ হয়ে যায়।",
          "b": "অ্যানিকাস্ট রাউটিংয়ে বিশ্বজুড়ে ৩০০টি ডেটাসেন্টারে একই আইপি থাকে। ফলে বিশাল আক্রমণ এক জায়গায় না লেগে সারা বিশ্বের সমস্ত ডেটাসেন্টারে ছড়িয়ে পড়ে মুহূর্তেই বিলীন হয়ে যায়।",
          "e": "Cloudflare announces identical Anycast IP prefixes across all 300+ global edge locations via BGP. Volumetric DDoS attacks are geographically fractured and absorbed concurrently by edge ingress nodes closest to the botnets, diluting multi-terabit attacks before reaching the origin.",
          "tip": "বলো: 'Anycast routes traffic to the nearest topological node, geographically fracturing and dissolving volumetric DDoS attacks.'"
        },
        {
          "lvl": "lvl3",
          "q": "Zero-Downtime Origin IP Migration: যখন ক্লাউড সার্ভারের আইপি পরিবর্তন করতে হয়, তখন Cloudflare দিয়ে কীভাবে গ্রাহকদের নির্বিঘ্নে লাইভ রাখবে?",
          "m": "পদক্ষেপসমূহ: (১) নতুন VPS সার্ভারে সম্পূর্ণ কোডবেজ, ডাটাবেজ রেপ্লিকেশন ও SSL কনফিগার করে প্রস্তুত রাখব। (২) Cloudflare ড্যাশবোর্ডে গিয়ে `A Record`-এর আইপি পুরনো সার্ভার থেকে নতুন সার্ভারের আইপিতে আপডেট করব। যেহেতু ক্লাউডফ্লেয়ারের 'Orange Cloud' প্রক্সি অন থাকে, তাই বিশ্বব্যাপী ইন্টারনেটের গ্রাহকদের কোনো ডিএনএস ক্যাশ আপডেট হওয়ার জন্য অপেক্ষা করতে হয় না! ক্লাউডফ্লেয়ারের এজ নোডগুলো মাত্র ১ সেকেন্ডের মধ্যে ইন্টারনালি ট্রাফিক নতুন অরিজিন আইপিতে ঘুরিয়ে দেয়। (৩) গ্রাহকরা এক মিলিসেকেন্ডের জন্যও সাইট ডাউন দেখে না। (৪) নতুন সার্ভারে ট্রাফিক স্থির হলে পুরনো সার্ভার ডিকমিশন করব।",
          "b": "অরেঞ্জ ক্লাউড অন থাকায় Cloudflare ড্যাশবোর্ডে নতুন আইপি বসানো মাত্রই ১ সেকেন্ডে ট্রাফিক নতুন সার্ভারে চলে যায়। কোনো ডিএনএস প্রোপাগেশন বিলম্ব ছাড়াই সম্পূর্ণ নির্বিঘ্নে মাইগ্রেশন সম্পন্ন হয়।",
          "e": "Because Cloudflare sits as a reverse proxy, public DNS points to Cloudflare Anycast IPs, not the origin. Updating the origin IP inside the Cloudflare DNS dashboard pivots global origin requests in under 1 second without waiting for third-party recursive ISP DNS propagation.",
          "tip": "মনে রাখবে: 'With Cloudflare Proxy enabled, origin IP cutovers execute in 1 second with zero DNS propagation latency.'"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: Cloudflare সক্রিয় করার পর ব্রাউজারে সাইট ওপেন করলে এরর আসছে: `ERR_TOO_MANY_REDIRECTS` (Redirect Loop)। কোনো পেজই খুলছে না! কারণ কী এবং তাৎক্ষণিক সমাধান কী?",
          "m": "কারণ: ক্লাউডফ্লেয়ার ড্যাশবোর্ডে SSL মোড সেট করা আছে `Flexible`, কিন্তু আপনার অরিজিন সার্ভারে (Nginx বা Node.js) কনফিগার করা আছে যে কোনো HTTP রিকোয়েস্ট এলে তাকে 301 HTTPS-এ রিডাইরেক্ট করতে হবে! ক্লাউডফ্লেয়ার অরিজিনে HTTP দিয়ে রিকোয়েস্ট পাঠায় -> অরিজিন তাকে HTTPS-এ রিডাইরেক্ট করে -> ক্লাউডফ্লেয়ার আবার অরিজিনে HTTP পাঠায় -> অরিজিন আবার রিডাইরেক্ট করে—যার ফলে অনন্ত রিডাইরেক্ট লুপ তৈরি হয়! তাৎক্ষণিক সমাধান: Cloudflare ড্যাশবোর্ডে `SSL/TLS`-এ ঢুকে অবিলম্বে মোডটি `Flexible` থেকে বদলে `Full` অথবা `Full (Strict)` করে দিতে হবে। সাথে সাথে সাইট নিখুঁতভাবে ওপেন হবে।",
          "b": "Flexible SSL থাকায় ক্লাউডফ্লেয়ার সার্ভারে HTTP পাঠায় আর সার্ভার তাকে HTTPS এ রিডাইরেক্ট করায় অনন্ত লুপ তৈরি হয়। ক্লাউডফ্লেয়ার SSL মোড Full (Strict) করে দিলেই রিডাইরেক্ট লুপ সাথে সাথে ঠিক হয়ে যায়।",
          "e": "ERR_TOO_MANY_REDIRECTS occurs when Cloudflare is set to Flexible SSL while the origin server enforces HTTPS redirects. Cloudflare contacts the origin over HTTP, the origin responds with a 301 redirect to HTTPS, and Cloudflare re-issues HTTP indefinitely. Switch Cloudflare SSL to Full (Strict) to resolve.",
          "code": "# Immediate fix in Cloudflare Dashboard:\nSSL/TLS -> Set mode to: Full (strict)"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: ব্রাউজারে ইউজাররা হঠাৎ ক্লাউডফ্লেয়ারের `Error 521: Web Server Is Down` দেখতে পাচ্ছে। সমস্যা কোথায় এবং কীভাবে ট্রাবলশুট করবে?",
          "m": "সমস্যার অর্থ: ক্লাউডফ্লেয়ারের এজ নেটওয়ার্ক সম্পূর্ণ সুস্থ আছে, কিন্তু ক্লাউডফ্লেয়ার যখন আপনার মূল VPS সার্ভারের পোর্টে (80 বা 443) কানেক্ট করার চেষ্টা করেছে, তখন সার্ভার থেকে TCP Connection Refused এসেছে! ট্রাবলশুটিং ধাপ: (১) উবুন্টু VPS সার্ভারে SSH করে চেক করব Nginx সার্ভিস রানিং আছে কি না: `sudo systemctl status nginx` (সাধারণত Nginx ক্র্যাশ করলে বা বন্ধ থাকলে 521 আসে)। (২) সার্ভারের ফায়ারওয়াল UFW বা ক্লাউড সিকিউরিটি গ্রুপে পোর্ট ৮০ ও ৪৪৩ ব্লক আছে কি না। (৩) সার্ভার ক্র্যাশ করে থাকলে রিস্টার্ট করব: `sudo systemctl restart nginx`। Nginx সচল হওয়া মাত্রই 521 এরর দূর হয়ে যাবে।",
          "b": "Error 521 মানে ক্লাউডফ্লেয়ার সার্ভারের সাথে কানেক্ট করতে পারেনি কারণ মূল সার্ভার বা Nginx বন্ধ হয়ে গেছে। সার্ভারে SSH ঢুকে Nginx রিস্টার্ট করলেই সাইট সচল হয়।",
          "e": "Error 521 Web Server Is Down indicates that the origin VPS refused TCP handshake connections from Cloudflare proxy IPs. Triage by SSHing into the VPS, checking Nginx daemon health via systemctl status nginx, and verifying that UFW firewalls allow incoming traffic on ports 80 and 443.",
          "code": "sudo systemctl status nginx\nsudo systemctl restart nginx\nsudo ufw allow 80/tcp && sudo ufw allow 443/tcp"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: ব্রাউজারে ইউজাররা `Error 522: Connection Timed Out` দেখতে পাচ্ছে। এটি 521-এর চেয়ে কীভাবে আলাদা এবং কীভাবে ফিক্স করবে?",
          "m": "পার্থক্য: 521 মানে সার্ভার কানেকশন রিফিউজ করেছে (Nginx বন্ধ ছিল)। কিন্তু `522 Connection Timed Out` মানে হলো ক্লাউডফ্লেয়ার সার্ভারকে TCP সিন (SYN) প্যাকেট পাঠিয়েছে কিন্তু সার্ভার কোনো জবাবই দেয়নি (টাইমআউট হয়েছে)! কারণসমূহ: (১) সার্ভারের UFW ফায়ারওয়াল বা Fail2ban ভুলবশত ক্লাউডফ্লেয়ারের প্রক্সি আইপিগুলোকে ব্লক করে দিয়েছে! (২) সার্ভারের ইন্টারনেট সংযোগ বা রাউটিং ডাউন। (৩) সার্ভারের সিপিইউ ১০০% হয়ে নেটওয়ার্ক স্ট্যাক ফ্রিজ হয়ে আছে। ফিক্স: UFW ফায়ারওয়ালে ক্লাউডফ্লেয়ারের সমস্ত অফিশিয়াল আইপি রেঞ্জ (`cloudflare.com/ips`) হোয়াইটলিস্ট করে দেওয়া যাতে কোনো অবস্থাতেই ক্লাউডফ্লেয়ার ট্রাফিক ড্রপ না হয়।",
          "b": "Error 522 মানে সার্ভার থেকে কোনো রেসপন্স না পেয়ে টাইমআউট হয়েছে। সাধারণত ফায়ারওয়াল বা Fail2ban ক্লাউডফ্লেয়ারের আইপি ব্লক করলে এটি ঘটে। ফায়ারওয়ালে ক্লাউডফ্লেয়ারের আইপি হোয়াইটলিস্ট করলে সমাধান হয়।",
          "e": "Error 522 signifies that the TCP handshake timed out between Cloudflare and the origin. The primary cause is host firewalls (UFW/Fail2ban) mistakenly dropping packets from Cloudflare proxy IP ranges due to rate limiting. Whitelist official Cloudflare IP subnets explicitly in the firewall.",
          "code": "# Whitelist Cloudflare IPs in UFW:\nfor ip in $(curl -s https://www.cloudflare.com/ips-v4); do\n  sudo ufw allow from $ip to any port 443 proto tcp\ndone"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: ফ্রন্টএন্ডে ইউজাররা লগইন করার পর অন্য ইউজারের প্রোফাইল বা ড্যাশবোর্ড ডেটা দেখতে পাচ্ছে! ক্লাউডফ্লেয়ার কনফিগারেশনে কোথায় মারাত্মক ভুল হয়েছিল?",
          "m": "ভয়াবহ ক্যাশিং বাগ: কেউ একজন ক্লাউডফ্লেয়ারে একটি ওভার-অ্যাগ্রেসিভ পেজ রুল লিখেছিল: `*.dokani.com/*` -> `Cache Level: Cache Everything`! এর ফলে একজন ইউজার যখন লগইন করে প্রোফাইল এপিআইতে হিট করেছিল, ক্লাউডফ্লেয়ার সেই নির্দিষ্ট ইউজারের প্রাইভেট প্রোফাইল রেসপন্সটিকে নিজের পাবলিক এজ ক্যাশে স্টোর করে নিয়েছিল এবং পরবর্তী সব ইউজারকে ওই একই ক্যাশড রেসপন্স ফিরিয়ে দিয়েছে! সমাধান: (১) মুহূর্তের মধ্যে Cloudflare ড্যাশবোর্ডে গিয়ে `Purge Everything` দিয়ে সম্পূর্ণ গ্লোবাল ক্যাশ ক্লিয়ার করতে হবে। (২) ক্যাশ রুল ঠিক করতে হবে: অথেনটিকেটেড ও এপিআই পাথে (`/api/*`, `/dashboard/*`) কঠোরভাবে `Bypass Cache` রুল বসাতে হবে। (৩) ব্যাকএন্ডে সবসময় `Cache-Control: private, no-store` হেডার এনফোর্স করতে হবে।",
          "b": "ভুলবশত Cache Everything দেওয়ায় ইউজারের গোপনীয় ডেটা ক্লাউডফ্লেয়ার ক্যাশ করে সবাইকে দেখাচ্ছিল। তৎক্ষণাৎ Purge Cache দিয়ে ক্যাশ খালি করতে হবে এবং এপিআই পাথে Bypass Cache রুল বসাতে হবে।",
          "e": "An aggressive 'Cache Everything' rule erroneously cached personalized authenticated HTTP responses containing sensitive user session data at the public edge. Purge the entire Cloudflare cache immediately, and configure explicit Cache Rules setting 'Bypass Cache' on all authenticated routes alongside Cache-Control: private, no-store headers.",
          "tip": "কখনোই অথেনটিকেটেড এপিআই বা ড্যাশবোর্ড পাথে 'Cache Everything' বসাবে না!"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: একটি ইকমার্স ওয়েবসাইটে হঠাৎ ট্রাফিক স্পাইকে সার্ভার ক্র্যাশ করেছে। তুমি কোনো কোড বা সার্ভার পরিবর্তন না করে ক্লাউডফ্লেয়ার দিয়ে কীভাবে ২ মিনিটে সাইটকে পুনরায় জীবিত করবে?",
          "m": "তাৎক্ষণিক ক্লাউডফ্লেয়ার রেসকিউ স্টেপস: (১) Cloudflare ড্যাশবোর্ডে ঢুকে `Speed > Optimization > Caching`-এ গিয়ে স্ট্যাটিক অ্যাসেট এবং পাবলিক প্রোডাক্ট ক্যাটালগের জন্য `Cache Everything` সহ `Edge Cache TTL: 2 hours` কনফিগার করব। (২) `Always Online` ফিচার অন করব—যাতে অরিজিন ডাউন থাকলেও ক্লাউডফ্লেয়ার তার এজ ক্যাশ থেকে কাস্টমারদের স্ট্যাটিক পেজ দেখাতে পারে। (৩) `Security > Bot Fight Mode` অন করব যাতে অপ্রয়োজনীয় স্ক্র্যাপার বট ট্রাফিক ড্রপ হয়। মাত্র ২ মিনিটে মূল সার্ভারে ট্রাফিক ৯০% কমে যাবে এবং সার্ভার স্বাভাবিক অবস্থায় ফিরে আসবে।",
          "b": "ক্লাউডফ্লেয়ারে পাবলিক পেজে Cache Everything চালু করে এবং Always Online সক্রিয় করে ২ মিনিটে সার্ভারের লোড ৯০% কমিয়ে সাইট সচল করা যায়।",
          "e": "Rescue a saturated server immediately via Cloudflare edge caching: deploy a Cache Rule for public landing and catalog routes with Cache Everything and Edge Cache TTL: 2 hours, enable Always Online to serve stale cached pages during origin distress, and toggle Bot Fight Mode to purge scraping noise.",
          "tip": "বলো: 'Immediate Edge Cache Everything and Bot Fight Mode reduces origin load by 90% in 2 minutes.'"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা (Dokani SaaS): Dokani-তে হাজার হাজার দোকানের মাল্টি-টেন্যান্ট সাবডোমেন (`*.dokani.bip.sg`) কীভাবে Cloudflare Wildcard DNS ও SSL দিয়ে ম্যানেজ করা হয়?",
          "m": "দোকানি পিওএসে মার্চেন্টরা সাইন আপ করলেই নিজস্ব সাবডোমেন পায় (যেমন `aarong.dokani.bip.sg`)। আমরা প্রতি দোকানের জন্য ম্যানুয়ালি ডিএনএস রেকর্ড তৈরি করি না! সেটআপ: (১) Cloudflare-এ একটি ওয়াইল্ডকার্ড A Record তৈরি করা আছে: `*.dokani.bip.sg -> VPS_IP` (Orange Cloud Proxied)। (২) ক্লাউডফ্লেয়ারের ইউনিভার্সাল SSL স্বয়ংক্রিয়ভাবে ওয়াইল্ডকার্ড সাবডোমেনের জন্য ফ্রি SSL/TLS এনক্রিপশন সরবরাহ করে। (৩) এর ফলে নতুন ১০,০০০ দোকান সাইন আপ করলেও কোনো ডিএনএস বা এসএসএল পরিবর্তন ছাড়া ক্লাউডফ্লেয়ার মুহূর্তেই তাদের ট্রাফিক সিকিউরডভাবে প্রক্সি করে উবুন্টু Nginx সার্ভারে পৌঁছে দেয়।",
          "b": "দোকানিতে ক্লাউডফ্লেয়ারে ওয়াইল্ডকার্ড A Record (*.dokani.bip.sg) এবং ইউনিভার্সাল SSL ব্যবহার করা হয়েছে। ফলে প্রতিবার নতুন দোকান খুললে কোনো ডিএনএস কনফিগারেশন ছাড়াই স্বয়ংক্রিয়ভাবে সিকিউরড সাবডোমেন চালু হয়ে যায়।",
          "e": "Dokani POS handles multi-tenant subdomains via a single Cloudflare Wildcard A Record (*.dokani.bip.sg) proxied through Cloudflare's Universal SSL certificate. This architecture delivers automated SSL encryption and zero-touch DNS provisioning for thousands of onboarding merchants.",
          "tip": "দোকানির এই Wildcard DNS & SSL আর্কিটেকচার ইন্টারভিউতে তোমার প্রোডাকশন দক্ষতার উজ্জ্বল উদাহরণ।"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: ক্লাউডফ্লেয়ার অরিজিন প্রোটেকশন: হ্যাকারদের থেকে অরিজিন সার্ভারের আসল আইপি গোপন রাখার প্রোডাকশন রানবুক কী?",
          "m": "অরিজিন আইপি লিক হওয়া ঠেকাতে রানবুক: (১) সার্ভার থেকে সরাসরি কোনো আউটগোয়িং ইমেইল (Sendmail) পাঠাব না (কারণ ইমেইল হেডারে সার্ভারের আসল আইপি লেখা থাকে); এর বদলে SendGrid বা Amazon SES এপিআই ব্যবহার করব। (২) ডিএনএস রেকর্ডে কোনো ডিরেক্ট সাবডোমেন (যেমন `direct.dokani.com` বা `ssh.dokani.com`) আনপ্রক্সাইড রাখব না। (৩) উবুন্টু UFW ফায়ারওয়ালে কঠোর রুল বসাব: পোর্ট ৮০ ও ৪৪৩-এ শুধুমাত্র ক্লাউডফ্লেয়ারের অফিশিয়াল আইপি ব্লক ছাড়া পৃথিবীর অন্য যেকোনো আইপি থেকে কানেকশন সম্পূর্ণ ড্রপ (`DENY`) করা হবে। এর ফলে কেউ আসল আইপি জেনে ফেললেও সরাসরি পোর্টে আঘাত করতে পারবে না।",
          "b": "আসল আইপি গোপন রাখতে সার্ভার থেকে সরাসরি ইমেইল না পাঠিয়ে সেন্ডগ্রিড এপিআই ব্যবহার করা হয় এবং ফায়ারওয়ালে ক্লাউডফ্লেয়ার ছাড়া বাকি সব সরাসরি আইপি কানেকশন ব্লক করে রাখা হয়।",
          "e": "Prevent origin IP leaks: Never send emails directly from the web host (SMTP headers leak origin IPs; route via SendGrid/SES), scrub development subdomains from public DNS, and lock down UFW ports 80/443 strictly to Cloudflare's published IP ranges, making the origin invisible to the public internet.",
          "code": "# Lock down origin port 443 strictly to Cloudflare:\nsudo ufw default deny incoming\nfor ip in $(curl -s https://www.cloudflare.com/ips-v4); do\n  sudo ufw allow from $ip to any port 443 proto tcp\ndone"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: Cloudflare R2 Object Storage বনাম AWS S3: ই-কমার্স ও SaaS অ্যাপ্লিকেশনে ইমেজ স্টোরেজ খরচে কেন R2 সেরা?",
          "m": "AWS S3-তে সবচেয়ে বড় খরচের ফাঁদ হলো 'Data Egress Fees' (প্রতি গিগাবাইট ডাউনলোডে প্রায় $০.০৯ ডলার চার্জ)। যদি একটি ই-কমার্স সাইটে প্রতিদিন লক্ষ লক্ষ মানুষ প্রোডাক্ট ইমেজ দেখে এবং ১০ টেরাবাইট ডেটা ডাউনলোড হয়, তবে AWS শুধুমাত্র ব্যান্ডউইথ বিল পাঠাবে $৯০০ ডলার! `Cloudflare R2` হলো একটি S3-কমপ্যাটিবল অবজেক্ট স্টোরেজ যার সবচেয়ে বড় বৈপ্লবিক সুবিধা: `Zero Egress Fees (ব্যান্ডউইথ সম্পূর্ণ ফ্রি!)`। আপনি শত টেরাবাইট ইমেজ বা ফাইল ডাউনলোড করলেও ব্যান্ডউইথের জন্য ১ সেন্টও চার্জ দিতে হয় না, শুধু সামান্য স্টোরেজ ফি ($০.০১৫/GB) দিতে হয়। এটি ইমেজ-হেভি অ্যাপ্লিকেশনে ক্লাউড খরচ ৯০% কমিয়ে দেয়।",
          "b": "AWS S3 তে ব্যান্ডউইথ বা ডাউনলোডের জন্য প্রচুর চার্জ কাটে। Cloudflare R2 এর সবচেয়ে বড় সুবিধা হলো এতে ব্যান্ডউইথ সম্পূর্ণ ফ্রি (Zero Egress Fees)। ফলে লাখ লাখ প্রোডাক্ট ইমেজের স্টোরেজ খরচ প্রায় শূন্যে নেমে আসে।",
          "e": "AWS S3 penalizes high-traffic applications with punitive data egress fees ($0.09/GB). Cloudflare R2 provides an S3-compatible API with zero egress fees, charging solely for storage volume ($0.015/GB-mo), reducing media asset hosting costs for image-heavy SaaS applications by over 90%.",
          "tip": "বলো: 'Cloudflare R2 eliminates S3 egress tax with zero egress fees, slashing media storage costs by 90%.'"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: জিরো-ডাউনটাইম ফ্রন্টএন্ড ডেপ্লয়মেন্টে Cloudflare Cache Purging API কীভাবে অটোমেট করবে?",
          "m": "নতুন ফ্রন্টএন্ড কোড ডেপ্লয় করার পর যদি ক্লাউডফ্লেয়ারের পুরানো JS/CSS ফাইল ক্যাশে থেকে যায়, তবে ক্লায়েন্টরা ব্রোকেন পেজ বা পুরনো ইন্টারফেস দেখতে পাবে। সমাধান: GitHub Actions CI/CD পাইপলাইনে ডেপ্লয়মেন্ট সফল হওয়ার ঠিক পরের স্টেপে আমরা একটি `curl` কমান্ড দিয়ে Cloudflare Cache Purge API কল করি। আমরা পুরো ক্যাশ ড্রপ না করে শুধুমাত্র পরিবর্তিত ফাইলগুলো (`purge_by_prefixes` বা `files`) টার্গেট করে পার্জ করি। মাত্র ৫০০ মিলিসেকেন্ডে বিশ্বব্যাপী ৩০০+ ডেটাসেন্টারের ক্যাশ ক্লিয়ার হয়ে যায় এবং সমস্ত ইউজার তৎক্ষণাৎ নতুন ফ্রেশ ইন্টারফেস দেখতে পায়।",
          "b": "নতুন কোড ডেপ্লয় শেষে সিআই/সিডি স্ক্রিপ্ট স্বয়ংক্রিয়ভাবে ক্লাউডফ্লেয়ার পার্জ এপিআই কল করে। ফলে বিশ্বজুড়ে ক্লাউডফ্লেয়ারের এজ ক্যাশ খালি হয়ে যায় এবং ইউজাররা সাথে সাথে নতুন ভার্সন দেখতে পায়।",
          "e": "Automate cache invalidation in CI/CD pipelines via Cloudflare's Purge Cache REST API. Triggered immediately after deployment, the API invalidates compiled HTML and entry JS chunks globally in sub-second time, ensuring users instantly receive the latest deployment.",
          "code": "- name: Purge Cloudflare Cache\n  run: |\n    curl -X POST \"https://api.cloudflare.com/client/v4/zones/${{ secrets.CF_ZONE_ID }}/purge_cache\" \\\n      -H \"Authorization: Bearer ${{ secrets.CF_API_TOKEN }}\" \\\n      -H \"Content-Type: application/json\" \\\n      --data '{\"purge_everything\":true}'"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: Cloudflare Security Analytics ড্যাশবোর্ড বিশ্লেষণ করে কীভাবে সাইটের থ্রেট পোস্টার পর্যালোচনা করবে?",
          "m": "আমরা প্রতি সপ্তাহে Cloudflare-এর Security ও Analytics ড্যাশবোর্ড অডিট করি: (১) `Threats Mitigated`: গত সপ্তাহে কতগুলো ক্ষতিকর বট, SQL ইনজেকশন বা XSS রিকোয়েস্ট WAF ব্লক করেছে। (২) `Top Traffic Countries`: স্বাভাবিক বিজনেসের বাইরের কোনো অঞ্চল থেকে অস্বাভাবিক ট্রাফিক স্পাইক আছে কি না। (৩) `Bandwidth Savings`: মোট ট্রাফিকের কত শতাংশ (যেমন ৮৫%) ক্লাউডফ্লেয়ার এজ ক্যাশ থেকে সার্ভ হয়েছে এবং কত শতাংশ অরিজিনে গেছে। (৪) `Rate Limit Hits`: কোন এপিআইতে সবচেয়ে বেশি রেট লিমিট ট্রিগার হয়েছে। এই মেট্রিক্সগুলো পর্যবেক্ষণ করে আমরা ফায়ারওয়াল রুলস টিউন করি এবং সিস্টেমের সার্বিক সাইবার নিরাপত্তা সুদৃঢ় রাখি।",
          "b": "ক্লাউডফ্লেয়ার ড্যাশবোর্ডে প্রতি সপ্তাহে ব্লক হওয়া থ্রেট, সিডিএন ক্যাশ সেভিংস (৮৫%+) এবং অস্বাভাবিক ট্রাফিক স্পাইক পর্যবেক্ষণ করে ফায়ারওয়াল পলিসি টিউন করা হয় এবং সাইবার নিরাপত্তা নিশ্চিত রাখা হয়।",
          "e": "Perform weekly operational reviews of Cloudflare Security Analytics: audit WAF mitigation event logs, track geographical traffic variance, evaluate edge cache hit ratios (>85%), and tune rate limiting thresholds based on real-world traffic profiles to maintain defensive posture.",
          "tip": "বলো: 'We track edge cache hit ratios and WAF mitigation telemetry weekly to continuously tune security postures.'"
        }
      ]
    },
    {
      "id": "prod-monitoring-backup",
      "name": "Production Monitoring, Secrets & Disaster Recovery",
      "desc": "Sentry Error Tracking, Prometheus & Grafana, Winston/Pino Logging, .env Security & Secret Vaults, Automated S3 Backups, Incident Runbooks",
      "items": [
        {
          "lvl": "lvl1",
          "q": "Production Monitoring কী এবং শুধু 'সাইট চলছে কি না' দেখার চেয়ে ডিপ অ্যাপ্লিকেশন অবজারভেবিলিটি (Observability) কেন জরুরি?",
          "m": "শুধু পিং করে সাইট আপ দেখা যথেষ্ট নয়—কারণ সাইট লাইভ থাকতে পারে কিন্তু ভেতরে ডাটাবেজ স্লো হয়ে পেমেন্ট প্রসেসিং আটকে থাকতে পারে বা ইউজাররা ভেতরের পাতায় 500 এরর পেতে পারে! Observability ৩টি প্রধান স্তম্ভের সমন্বয়ে কাজ করে (M.E.L): (১) `Metrics`: রিকোয়েস্ট রেট, সিপিইউ, র‍্যাম এবং p99 ল্যাটেন্সি ট্র্যাক করা। (২) `Events/Errors`: কোন এপিআইতে ঠিক কোন লাইনে এক্সেপশন থ্রো করেছে তা ট্রেস করা (Sentry)। (৩) `Logs`: প্রতিটি রিকোয়েস্টের টাইমস্ট্যাম্পযুক্ত বিস্তারিত হিস্ট্রি (Structured JSON Logs)। এটি কোনো গ্রাহক অভিযোগ করার আগেই যেকোনো সূক্ষ্ম সমস্যা তাৎক্ষণিকভাবে শনাক্ত করতে সাহায্য করে।",
          "b": "পর্যবেক্ষণযোগ্যতা (Observability) ৩টি বিষয়ের ওপর দাঁড়িয়ে: মেট্রিক্স (সিপিইউ, র‍্যাম, গতি), এররস (কোথায় কী ত্রুটি হলো), এবং লগস (বিস্তারিত রেকর্ড)। গ্রাহক জানানোর আগেই ভেতরের ত্রুটি শনাক্ত করতে এটি অপরিহার্য।",
          "e": "Observability transcends basic uptime pings, encompassing the Three Pillars: Metrics (CPU, memory, throughput, p99 latency), Errors (real-time stack traces via Sentry), and Logs (structured contextual JSON telemetry). This enables proactive triage of silent degradation before end users are impacted.",
          "tip": "বলো: 'The 3 pillars of observability are Metrics, Events/Errors, and Logs (M.E.L).'"
        },
        {
          "lvl": "lvl1",
          "q": "Sentry কী এবং প্রোডাকশন নোড ও রিয়্যাক্ট অ্যাপ্লিকেশনে এরর ট্র্যাকিংয়ে এটি কীভাবে সাহায্য করে?",
          "m": "Sentry হলো আধুনিক প্রোডাকশন অ্যাপ্লিকেশনের শীর্ষস্থানীয় রিয়েল-টাইম এরর ট্র্যাকিং ও পারফরম্যান্স মনিটরিং প্ল্যাটফর্ম। সুবিধা: (১) অ্যাপ্লিকেশনে কোনো আনহ্যান্ডেল্ড এক্সেপশন ঘটা মাত্রই Sentry স্বয়ংক্রিয়ভাবে পুরো কল স্ট্যাক (Stack Trace), ইউজারের ব্রাউজার/ডিভাইস তথ্য এবং এরর ঘটার আগের ৫টি পদক্ষেপ (Breadcrumbs) ক্যাপচার করে। (২) সোর্স ম্যাপ (Source Maps) আপলোড করলে মিনারেলাইজড কোডের বদলে মূল TypeScript কোডের সঠিক লাইন নম্বর প্রদর্শন করে। (৩) স্ল্যাক বা ইমেইলে অ্যালার্ট পাঠায় এবং একই ধরনের এররকে গ্রুপ করে ডুপ্লিকেশন কমায়।",
          "b": "সেন্ট্রি হলো এরর ট্র্যাকিং প্ল্যাটফর্ম যা প্রোডাকশনে কোনো বাগ ঘটার সাথে সাথে ঠিক কোন লাইনে কী ভুল হয়েছে এবং আগের কী কী পদক্ষেপ ছিল তা বিস্তারিত রেকর্ড করে স্ল্যাকে নোটিফিকেশন পাঠায়।",
          "e": "Sentry provides real-time error tracking and performance profiling across Node.js and React. Upon an unhandled exception, Sentry captures the complete execution stack trace, system context, user breadcrumbs, and de-obfuscates minified bundles using source maps for instant bug resolution.",
          "code": "import * as Sentry from '@sentry/node';\nSentry.init({\n  dsn: process.env.SENTRY_DSN,\n  tracesSampleRate: 1.0,\n  environment: process.env.NODE_ENV\n});"
        },
        {
          "lvl": "lvl1",
          "q": "Node.js অ্যাপ্লিকেশনে প্লেইন `console.log`-এর বদলে Winston বা Pino দিয়ে Structured JSON Logging কেন ব্যবহার করা উচিত?",
          "m": "প্লেইন `console.log` সাধারণ স্ট্রিং প্রিন্ট করে যা সিঙ্ক্রোনাস এবং উচ্চ ট্রাফিকে ইভেন্ট লুপকে মারাত্মক স্লো করে দেয়। এছাড়া স্ট্রিং লগ দিয়ে কোনো ড্যাশবোর্ডে সার্চ বা ফিল্টার করা যায় না। `Pino` বা `Winston` হলো অত্যন্ত দ্রুতগতির অ্যাসিনক্রোনাস লগার যা স্ট্রাকচার্ড JSON ফরম্যাটে লগ লেখে: `{\"level\":\"error\",\"time\":\"2026-10-08T10:00:00Z\",\"userId\":\"u1\",\"message\":\"Payment failed\",\"duration\":120}`। JSON লগ হওয়ায় Datadog, Grafana Loki বা CloudWatch অনায়াসে এই লগ পার্স করে মুহূর্তের মধ্যে ফিল্টার, গ্রাফ এবং অটোমেটেড অ্যালার্ট তৈরি করতে পারে।",
          "b": "console.log সিঙ্ক্রোনাস হওয়ায় অ্যাপ স্লো করে। Pino বা Winston অ্যাসিনক্রোনাসভাবে স্ট্রাকচার্ড JSON ফরম্যাটে লগ লিখে, যা গ্রাফানা বা সেন্ট্রালাইজড মনিটরিং সিস্টেমে সহজে সার্চ ও ফিল্টার করা যায়।",
          "e": "console.log is synchronous, blocks the Node.js event loop under high load, and outputs unstructured text strings that cannot be parsed by log aggregators. Pino outputs asynchronous, high-performance structured JSON payloads that ingestion engines (Grafana Loki, Datadog) can query, index, and alert on.",
          "code": "import pino from 'pino';\nexport const logger = pino({\n  level: process.env.LOG_LEVEL || 'info',\n  timestamp: pino.stdTimeFunctions.isoTime\n});"
        },
        {
          "lvl": "lvl1",
          "q": "প্রোডাকশন এনভায়রনমেন্ট ভ্যারিয়েবল (.env) সংরক্ষণে কী কী নিরাপত্তা সতর্কতা অবলম্বন করতে হয়?",
          "m": "সিকিউরিটি রুলস: (১) `.env` ফাইল কখনোই, কোনো অবস্থাতেই Git রিপোজিটরিতে কমিট বা পুশ করা যাবে না (`.gitignore`-এ `.env` থাকা বাধ্যতামূলক)। (২) প্রোডাকশন সার্ভারে `.env` ফাইলের লিনাক্স পারমিশন কঠোরভাবে `chmod 600 .env` রাখতে হবে (যাতে শুধুমাত্র ফাইলের মালিক ইউজার ছাড়া অন্য কেউ পড়তে না পারে)। (৩) ডেভেলপারদের পার্সোনাল কম্পিউটারে কোনো প্রোডাকশন সিক্রেট দেওয়া যাবে না। (৪) এনভায়রনমেন্ট ভ্যারিয়েবল লোড করার সময় Zod বা Envalid দিয়ে টাইপ-ভ্যালিডেশন করা যাতে কোনো সিক্রেট মিসিং থাকলে অ্যাপ সাথে সাথে সতর্ক করে বন্ধ হয়।",
          "b": ".env ফাইল গিটহাবে পুশ করা সম্পূর্ণ নিষিদ্ধ। সার্ভারে chmod 600 দিয়ে পারমিশন লক রাখতে হয় এবং কোনো ভ্যারিয়েবল মিসিং যেন না থাকে সেজন্য Zod দিয়ে অ্যাপ শুরুর সময় ভ্যালিডেট করতে হয়।",
          "e": "Production .env files must remain untracked in Git (.gitignore), locked on Linux filesystems with strict chmod 600 permissions restricted to the execution user, and validated at application bootstrap using Zod or Envalid to halt execution if required secrets are unpopulated.",
          "code": "import { z } from 'zod';\nconst envSchema = z.object({\n  DATABASE_URL: z.string().url(),\n  JWT_SECRET: z.string().min(32),\n  PORT: z.coerce.number().default(5000)\n});\nexport const ENV = envSchema.parse(process.env);"
        },
        {
          "lvl": "lvl1",
          "q": "Uptime Monitoring (যেমন UptimeRobot, BetterStack) কীভাবে কাজ করে এবং Heartbeat Check কী?",
          "m": "Uptime Monitor হলো একটি বাইরের ক্লাউড সার্ভিস যা প্রতি ১ বা ৫ মিনিট পর পর আপনার সার্ভারের পাবলিক হেলথ এন্ডপয়েন্টে (`GET /api/health`) HTTP রিকোয়েস্ট পাঠায়। যদি সার্ভিসটি পরপর ২ বার 200 OK না পেয়ে টাইমআউট বা 500 এরর পায়, তবে মনিটর তৎক্ষণাৎ অন-কল ইঞ্জিনিয়ারদের ফোনে SMS, ফোন কল বা স্ল্যাক অ্যালার্ট পাঠায়। `Heartbeat Check (Dead Man's Snitch)` হলো এর বিপরীত: কোনো ব্যাকগ্রাউন্ড ক্রন জব সফলভাবে শেষ হলে সে নিজে ওই মনিটরিং এপিআইতে একটি পিং পাঠায়। যদি নির্দিষ্ট সময় (যেমন ২৪ ঘণ্টা) পার হওয়ার পরও কোনো পিং না আসে, মনিটর বুঝে নেয় ক্রন জবটি ফেইল করেছে এবং সাথে সাথে অ্যালার্ট ফায়ার করে।",
          "b": "আপটাইম মনিটর প্রতি মিনিটে সার্ভারের হেলথ চেক করে এবং সাইট ডাউন হলে তাৎক্ষণিক এসএমএস বা স্ল্যাকে অ্যালার্ট পাঠায়। আর হার্টবিট চেক ব্যাকগ্রাউন্ড ক্রন জব সফলভাবে সম্পন্ন হয়েছে কি না তা নিশ্চিত করে।",
          "e": "An external Uptime Monitor periodically pings an endpoint (GET /health) from distributed locations, firing SMS or Slack alerts upon consecutive non-200 responses. A Heartbeat Check monitors scheduled background jobs: the cron script curls an endpoint upon completion; missing a expected heartbeat triggers a failure alert.",
          "tip": "বলো: 'Uptime checks monitor inbound service availability; heartbeats monitor outbound cron job completion.'"
        },
        {
          "lvl": "lvl2",
          "q": "Prometheus এবং Grafana কীভাবে কাজ করে এবং নোড অ্যাপ্লিকেশনের মেট্রিক্স কীভাবে স্ক্র্যাপ করে?",
          "m": "(১) `Prometheus`: একটি টাইম-সিরিজ ডেটাবেজ যা পুল-মডেল (Pull/Scraping) অনুসরণ করে। নোড অ্যাপ্লিকেশনে `prom-client` লাইব্রেরি দিয়ে একটি লোকাল এন্ডপয়েন্ট তৈরি করি (`/metrics`) যা রিয়েলটাইমে মেমোরি, ইভেন্ট লুপ ল্যাগ ও রিকোয়েস্ট রেট এক্সপোজ করে। Prometheus প্রতি ১৫ সেকেন্ড পর পর এই এন্ডপয়েন্ট স্ক্র্যাপ করে ডেটা নিজের টাইম-সিরিজ ডিবিতে জমা করে। (২) `Grafana`: প্রমিথিউসের সাথে কানেক্ট হয়ে আকর্ষণীয় ভিজ্যুয়াল ড্যাশবোর্ড তৈরি করে—যেখানে p95 ল্যাটেন্সি, রিকোয়েস্ট পার সেকেন্ড (RPS), এবং এরর পার্সেন্টেজ লাইভ গ্রাফে প্রদর্শিত হয় এবং থ্রেশহোল্ড অতিক্রম করলে অটো-অ্যালার্ট পাঠায়।",
          "b": "প্রমিথিউস প্রতি ১৫ সেকেন্ড পর পর অ্যাপ্লিকেশনের /metrics এন্ডপয়েন্ট থেকে ডেটা স্ক্র্যাপ করে সংরক্ষণ করে। আর গ্রাফানা সেই ডেটা দিয়ে লাইভ ড্যাশবোর্ড ও গ্রাফ তৈরি করে সিস্টেমের স্বাস্থ্য প্রদর্শন করে।",
          "e": "Prometheus implements a pull-based architecture, periodically scraping metrics exposed by prom-client over a protected /metrics route. Grafana visualizes these time-series queries via PromQL, displaying real-time gauges for CPU, memory, RPS throughput, and p99 latency distributions.",
          "code": "import client from 'prom-client';\nconst collectDefaultMetrics = client.collectDefaultMetrics;\ncollectDefaultMetrics({ register: client.register });\napp.get('/metrics', async (req, res) => {\n  res.set('Content-Type', client.register.contentType);\n  res.end(await client.register.metrics());\n});"
        },
        {
          "lvl": "lvl2",
          "q": "লগিংয়ে সংবেদনশীল ডেটা মাস্কিং (PII Masking / Sanitization): কেন পাসওয়ার্ড, ক্রেডিট কার্ড বা টোকেন লগে প্রিন্ট হওয়া নিষিদ্ধ এবং কীভাবে মাস্ক করবে?",
          "m": "লগ ফাইল সাধারণত একাধিক ইঞ্জিনিয়ার পড়তে পারে বা ক্লাউড লগ ম্যানেজমেন্ট সিস্টেমে সংরক্ষিত থাকে। যদি লগে ইউজারের পাসওয়ার্ড, ক্রেডিট কার্ড নম্বর বা JWT টোকেন প্লেইন-টেক্সটে প্রিন্ট হয়, তবে এটি PCI-DSS এবং GDPR আইনের মারাত্মক লঙ্ঘন এবং সিস্টেম হ্যাক হলে সব তথ্য ফাঁস হয়ে যাবে! সমাধান: Pino বা Winston-এ 'Redaction' বা ফিল্টারিং প্লাগইন কনফিগার করা। আমরা নির্দিষ্ট ফিল্ড পাথ বেঁধে দিই: `redact: ['req.headers.authorization', 'password', 'creditCard', 'refreshToken']`। লগার স্বয়ংক্রিয়ভাবে এই ফিল্ডগুলোর আসল মান প্রতিস্থাপন করে `[REDACTED]` লিখে দেয়।",
          "b": "পাসওয়ার্ড বা ক্রেডিট কার্ডের তথ্য লগে লেখা আইনত দণ্ডনীয় ও মারাত্মক ঝুঁকিপূর্ণ। Pino বা Winston-এর redact কনফিগারেশন দিয়ে সংবেদনশীল ফিল্ডগুলো স্বয়ংক্রিয়ভাবে [REDACTED] দিয়ে মাস্ক করে নিরাপদে লগ করতে হয়।",
          "e": "Logging Personally Identifiable Information (PII), raw passwords, or authorization tokens violates PCI-DSS and GDPR regulations. Configure automated log redaction in Pino/Winston (redact: ['password', 'req.headers.authorization']), sanitizing sensitive attributes into '[REDACTED]' before persistence.",
          "code": "const logger = pino({\n  redact: {\n    paths: ['password', 'pin', 'token', 'req.headers.authorization'],\n    censor: '[REDACTED]'\n  }\n});"
        },
        {
          "lvl": "lvl2",
          "q": "Secret Management Services: Doppler, HashiCorp Vault বা AWS Secrets Manager কীভাবে লোকাল `.env` ফাইলের বিশৃঙ্খলা দূর করে?",
          "m": "ম্যানুয়ালি প্রতিটি সার্ভারে ঢুকে `.env` ফাইল কপি-পেস্ট করা অত্যন্ত অনিরাপদ ও বিশৃঙ্খল (কোন সার্ভারে কোন ভার্সনের সিক্রেট আছে তা ট্র্যাক করা যায় না)। Secret Manager প্ল্যাটফর্মগুলো (যেমন Doppler বা Vault) একটি সেন্ট্রালাইজড এনক্রিপ্টেড ভল্ট সরবরাহ করে: (১) সমস্ত প্রোডাকশন ও স্টেজিং সিক্রেট একটি সুরক্ষিত ড্যাশবোর্ডে সংরক্ষিত থাকে এবং কে কখন কি পরিবর্তন করেছে তার সম্পূর্ণ অডিট ট্রেইল থাকে। (২) সার্ভারে কোনো ফিজিক্যাল `.env` ফাইল রাখার দরকার হয় না; অ্যাপ বুট হওয়ার সময় CLI দিয়ে মেমোরিতে সিক্রেট ফেচ করে রান করে: `doppler run -- pm2 start ...`। (৩) এক ক্লিকে সিক্রেট রোটেট করা যায় এবং সমস্ত সার্ভারে নিমেষে সিনক্রোনাইজ হয়ে যায়।",
          "b": "Doppler বা Vault দিয়ে এক জায়গা থেকে সমস্ত সার্ভারের সিক্রেট নিরাপদে পরিচালিত হয়। সার্ভারে কোনো .env ফাইল না রেখেই মেমোরিতে সিক্রেট লোড করা যায় এবং অডিট লগ সহ সহজেই পাসওয়ার্ড রোটেট করা সম্ভব হয়।",
          "e": "Copy-pasting local .env files manually introduces configuration drift and security leaks. Secrets Managers (Doppler, HashiCorp Vault, AWS Secrets Manager) centralize encrypted configurations with granular RBAC and audit logging, injecting secrets directly into process memory via CLI wrappers (doppler run) without writing files to disk.",
          "tip": "বলো: 'Doppler or Vault injects secrets directly into process memory without writing persistent plaintext .env files to disk.'"
        },
        {
          "lvl": "lvl2",
          "q": "Sentry Performance Monitoring এবং Tracing: কীভাবে একটি নির্দিষ্ট স্লো এপিআই রিকোয়েস্টের ডেটাবেজ কোয়েরি বোতলনেক শনাক্ত করবে?",
          "m": "Sentry Performance Tracing প্রতিটি ইনকামিং HTTP রিকোয়েস্টের জন্য একটি 'Transaction' তৈরি করে এবং তার ভেতরের প্রতিটি সাব-অপারেশনকে (যেমন Express Middleware, Prisma Query, Redis Call, External HTTP Call) ছোট ছোট 'Spans'-এ ভাগ করে। ড্যাশবোর্ডে আমরা একটি ওয়াটারফল চার্ট দেখতে পাই: রিকোয়েস্টটি মোট ৮০০ মিলিসেকেন্ড সময় নিয়েছে, যার মধ্যে মিডলওয়্যার নিয়েছে ১০ms, নোড কোড নিয়েছে ২০ms, কিন্তু একটি নির্দিষ্ট আন-ইনডেক্সড Prisma ডেটাবেজ কুয়েরি একা নিয়েছে ৭৭০ মিলিসেকেন্ড! সেকেন্ডের মধ্যে নিশ্চিত হওয়া যায় পারফরম্যান্স সমস্যার মূল কারণ কোথায়।",
          "b": "সেন্ট্রি পারফরম্যান্স ট্রেসিং ওয়াটারফল গ্রাফ দিয়ে প্রতিটি এপিআই রিকোয়েস্টের কোন অংশ (মিডলওয়্যার, নোড কোড নাকি ডাটাবেজ কুয়েরি) কত সময় নিয়েছে তা নিখুঁতভাবে প্রদর্শন করে বোতলনেক ধরিয়ে দেয়।",
          "e": "Sentry Performance Tracing segments transactions into granular hierarchical Spans (Express middleware, database queries, Redis calls). Viewing the transaction waterfall trace immediately exposes whether latency stems from application compute or unindexed SQL execution.",
          "code": "import * as Sentry from '@sentry/node';\n// Automatically instruments Express and Prisma queries to capture distributed traces"
        },
        {
          "lvl": "lvl2",
          "q": "Production Crash Alerting: স্ল্যাক এবং পেজারডিউটিতে ফলস-পজিটিভ অ্যালার্ট (Alert Fatigue) কীভাবে রোধ করবে?",
          "m": "যদি প্রতিবার একটি সাধারণ 404 Not Found বা ছোটখাটো ইউজার ভ্যালিডেশন এররের জন্য স্ল্যাকে নোটিফিকেশন বাজে, তবে ডেভেলপাররা নোটিফিকেশন মিউট করে দেবে (Alert Fatigue)—যার ফলে বড় কোনো ডাউনটাইমের আসল অ্যালার্টও চোখ এড়িয়ে যাবে! প্রিভেনশন রুলস: (১) শুধুমাত্র `5xx Server Errors` এবং `Unhandled Exceptions`-এ অ্যালার্ট পাঠানো। (২) থ্রেশহোল্ড ডিফাইন করা: বিচ্ছিন্ন ১টি এররে অ্যালার্ট না পাঠিয়ে 'যদি ৫ মিনিটে ১০টির বেশি 500 এরর আসে' তবেই স্ল্যাকে পিং করা। (৩) প্রায়োরিটি লেভেল নির্ধারণ: সাধারণ এরর সাধারণ চ্যানেলে যাবে, আর ক্রিটিক্যাল ডেটাবেজ ক্র্যাশে পেজারডিউটি দিয়ে অন-কল ইঞ্জিনিয়ারের ফোনে সরাসরি কল বা সাইরেন বাজবে।",
          "b": "প্রতিটি ছোটখাটো এররে নোটিফিকেশন দিলে অ্যালার্ট ফ্যাটিগ তৈরি হয়। শুধুমাত্র ৫xx সার্ভার এরর এবং নির্দিষ্ট থ্রেশহোল্ড (৫ মিনিটে ১০টি এরর) অতিক্রম করলেই জরুরি অ্যালার্ট পাঠানোর নিয়ম করতে হবে।",
          "e": "Alert Fatigue occurs when chat channels are flooded with low-priority telemetry, causing teams to ignore genuine outages. Prevent this by filtering out expected 4xx client errors, setting rate-spike trigger thresholds (e.g. >10 errors in 5 minutes), and reserving high-urgency PagerDuty pages exclusively for P1 service outages.",
          "tip": "বলো: 'Filter 4xx errors and configure rate-spike thresholds to prevent Alert Fatigue.'"
        },
        {
          "lvl": "lvl3",
          "q": "Automated Off-site Database Backup Pipeline: এনক্রিপশন, কম্প্রেশন ও মাল্টি-ক্লাউড রেপ্লিকেশন সহ প্রোডাকশন ব্যাশ আর্কিটেকচার কীভাবে ডিজাইন করবে?",
          "m": "একটি প্রোডাকশন ব্যাকআপ স্ক্রিপ্টের এন্টারপ্রাইজ ধাপসমূহ: (১) `Dump & Stream`: `pg_dump -Fc` দিয়ে কাস্টম ফরম্যাটে বাইনারি ডাম্প নেওয়া। (২) `Compression`: `pigz` (প্যারালাল জিপ) দিয়ে দ্রুত কম্প্রেস করা। (৩) `At-Rest Encryption`: `gpg --symmetric --cipher-algo AES256` দিয়ে শক্তিশালী পাসফ্রেজ দিয়ে ফাইলটি এনক্রিপ্ট করা যাতে ক্লাউড স্টোরেজে ফাইল চুরি হলেও কেউ ডেটা পড়তে না পারে। (৪) `Multi-Cloud Upload`: ফাইলটি প্রাইমারি স্টোরেজ (AWS S3) এবং সেকেন্ডারি প্রোভাইডার (Cloudflare R2 বা Backblaze B2)-এ আপলোড করা। (৫) `Integrity Verification`: ডাম্প ফাইলের সাইজ ও SHA256 চেকসাম যাচাই করা। (৬) স্ল্যাক ওয়েবহুকে সাকসেস রিপোর্ট এবং ড্যাশবোর্ডে হার্টবিট পিং পাঠানো।",
          "b": "এন্টারপ্রাইজ ব্যাকআপ পাইপলাইনে pg_dump নিয়ে AES256 দিয়ে এনক্রিপ্ট করা হয় এবং AWS S3 ও Cloudflare R2 উভয়ে ব্যাকআপ পাঠানো হয়। ফাইল সাইজ ও চেকসাম ভ্যালিডেট করে স্ল্যাকে রিপোর্ট পাঠানো হয়।",
          "e": "An enterprise off-site backup pipeline captures pg_dump streams, parallel-compresses via pigz, symmetrically encrypts via AES-256 (GPG), replicates to dual independent cloud targets (AWS S3 + Cloudflare R2), asserts SHA256 checksums, and pings a dead-man's heartbeat monitor.",
          "code": "#!/usr/bin/env bash\nset -euo pipefail\nFILE=\"/tmp/db_$(date +%Y%m%d_%H%M%S).dump.enc\"\npg_dump -Fc -U postgres dokani_db | gpg --batch --symmetric --passphrase \"$BACKUP_KEY\" -o \"$FILE\"\naws s3 cp \"$FILE\" s3://dokani-vault-primary/\nrclone copy \"$FILE\" b2:dokani-vault-replica/\nrm -f \"$FILE\"\ncurl -fsS --retry 3 https://hc-ping.com/YOUR-UUID"
        },
        {
          "lvl": "lvl3",
          "q": "Production Incident Management & Post-Mortem: প্রোডাকশন ডাউনটাইম রিকভারির পর ব্লেইমলেস পোস্ট-মর্টেম (Blameless Post-Mortem) কীভাবে পরিচালনা করবে?",
          "m": "ব্লেইমলেস পোস্ট-মর্টেমের মূল দর্শন হলো: কোনো নির্দিষ্ট ব্যক্তির ওপর দোষ চাপানো যাবে না, কারণ সিস্টেম ডিজাইন এমন হওয়া উচিত ছিল যাতে একজন মানুষের সাধারণ ভুলের কারণে পুরো প্রোডাকশন ডাউন না হয়! পোস্ট-মর্টেম ডকুমেন্টের মূল সেকশনসমূহ: (১) `Summary`: কী ঘটেছিল, কখন শুরু হয়েছিল এবং মোট ডাউনটাইম কত মিনিট ছিল। (২) `Impact`: কতজন কাস্টমার বা ট্রানজ্যাকশন ক্ষতিগ্রস্ত হয়েছিল। (৩) `Timeline`: ঘটনার শুরু থেকে রিকভারি পর্যন্ত প্রতি মিনিটের ক্রমানুসারে ঘটনা প্রবাহ। (৪) `Root Cause Analysis (5 Whys)`: কেন ঘটল তার গভীর কারণ খুঁজে বের করা। (৫) `Action Items`: ভবিষ্যতে যেন একই ঘটনা আর কখনো না ঘটে তার জন্য সুনির্দিষ্ট দায়িত্ব সহ প্রিভেনশন টাস্ক লিস্ট তৈরি করা।",
          "b": "ব্লেইমলেস পোস্ট-মর্টেমে কাউকে দোষারোপ না করে সিস্টেমের দুর্বলতা খোঁজা হয়। ঘটনার টাইমলাইন, ইমপ্যাক্ট, 5 Whys রুট কজ অ্যানালাইসিস এবং ভবিষ্যতে পুনরাবৃত্তি ঠেকাতে অ্যাকশন আইটেম নির্ধারণ করা হয়।",
          "e": "A Blameless Post-Mortem investigates outages without finger-pointing, focusing on systemic engineering resilience. The report documents: Outage Summary, Business Impact, chronological Incident Timeline, Root Cause Analysis using the 5 Whys, and actionable preventative JIRA tickets with assigned owners.",
          "tip": "ইন্টারভিউতে 'Blameless culture and 5-Whys Root Cause Analysis' উল্লেখ করা হাই-লেভেল ইঞ্জিনিয়ারিং পরিপক্বতা প্রকাশ করে।"
        },
        {
          "lvl": "lvl3",
          "q": "Golden Signals of Monitoring (Google SRE): গুগল এসআরই বইয়ের ৪টি গোল্ডেন সিগন্যাল কী কী এবং কীভাবে ট্র্যাক করবে?",
          "m": "গুগল এসআরই (Site Reliability Engineering)-এর ৪টি গোল্ডেন সিগন্যাল: (১) `Latency`: রিকোয়েস্ট প্রসেস করতে কত সময় লাগছে (বিশেষ করে সফল বনাম ব্যর্থ রিকোয়েস্টের ল্যাটেন্সি পার্থক্য)। (২) `Traffic`: সিস্টেমে কতটা ডিমান্ড বা লোড আসছে (যেমন ওয়েব এপিআইতে HTTP Requests Per Second)। (৩) `Errors`: ইনকামিং রিকোয়েস্টের মধ্যে কত শতাংশ রিকোয়েস্ট ফেইল করছে (যেমন HTTP 500 রেট বা ডেটাবেজ এক্সেপশন রেট)। (৪) `Saturation`: সিস্টেমের হার্ডওয়্যার রিসোর্সগুলোর ধারণক্ষমতা কতটা পূর্ণ হয়েছে (যেমন সিপিইউ কোর স্যাচুরেশন, মেমোরি এবং ডেটাবেজ কানেকশন পুল ফুল হয়ে কিউতে জট পাকা)। যেকোনো ড্যাশবোর্ডে সবার প্রথমে এই ৪টি মেট্রিক্স থাকা বাধ্যতামূলক।",
          "b": "গুগল এসআরই-র ৪টি গোল্ডেন সিগন্যাল: ল্যাটেন্সি (সময়কাল), ট্রাফিক (কাজের চাপ), এররস (ব্যর্থতার হার), এবং স্যাচুরেশন (রিসোর্স কতটা পূর্ণ)। এই ৪টি মেট্রিক্স সার্ভারের সামগ্রিক অবস্থা নিখুঁতভাবে প্রকাশ করে।",
          "e": "Google SRE's Four Golden Signals: Latency (time taken to service requests), Traffic (demand placed on the system, e.g. RPS), Errors (rate of failed requests, e.g. HTTP 5xx), and Saturation (fraction of constrained resources utilized, e.g. memory/connection pool queue depth).",
          "tip": "বলো: 'Google SRE's 4 Golden Signals are Latency, Traffic, Errors, and Saturation (L.T.E.S).'"
        },
        {
          "lvl": "lvl3",
          "q": "Production Secret Rotation: জিরো-ডাউনটাইমে ডাটাবেজ পাসওয়ার্ড বা JWT সিক্রেট কীভাবে পরিবর্তন (Rotate) করবে?",
          "m": "পাসওয়ার্ড সরাসরি একবারে বদলে দিলে মুহূর্তের মধ্যে সমস্ত রানিং সার্ভার ডেটাবেজ এরর খাওয়া শুরু করবে। জিরো-ডাউনটাইম সিক্রেট রোটেশন স্টেপস: (১) `Database Password Rotation`: ডেটাবেজে প্রথমে একটি সেকেন্ডারি ইউজার বা ডুয়াল পাসওয়ার্ড সাপোর্ট তৈরি করা। অ্যাপ্লিকেশনে নতুন পাসওয়ার্ড এনভায়রনমেন্ট ভ্যারিয়েবলে আপডেট করে রোলিং রিলোড দেওয়া। যখন নিশ্চিত হওয়া যায় সব সার্ভার নতুন পাসওয়ার্ডে শিফট করেছে, তখন ডেটাবেজ থেকে পুরনো পাসওয়ার্ড ড্রপ করা। (২) `JWT Secret Rotation`: JWT ভেরিফিকেশন কোডে একটি অ্যারে সাপোর্ট দেওয়া (`[NEW_SECRET, OLD_SECRET]`)। নতুন টোকেন সাইন হবে নতুন সিক্রেট দিয়ে, কিন্তু পুরনো ভ্যালিড টোকেনগুলো পুরনো সিক্রেট দিয়ে ভেরিফাই হতে পারবে। ৭ দিন পর যখন সব পুরনো টোকেন এক্সপায়ার হবে, তখন পুরনো সিক্রেট কোড থেকে মুছে দেওয়া। কোনো ইউজার লগআউট হয় না।",
          "b": "জিরো-ডাউনটাইমে পাসওয়ার্ড বদলাতে ডেটাবেজে দুটি ক্রেডেনশিয়াল একসাথে সচল রাখা হয় এবং সার্ভার আপডেটের পর পুরনোটি বাতিল করা হয়। JWT রোটেশনে দুটি কি দিয়ে ভেরিফাই করে পুরনো টোকেন এক্সপায়ারের পর পুরনো কি মুছে দেওয়া হয়।",
          "e": "Zero-Downtime Secret Rotation mandates phased dual-credential phasing: For databases, configure dual concurrent user passwords, deploy applications with the secondary secret, and decommission the primary password. For JWT, support key arrays ([newKey, oldKey]) where signing uses the new key while verification accepts both until legacy tokens expire.",
          "code": "// Dual-key JWT Verification:\nfunction verifyToken(token: string) {\n  try { return jwt.verify(token, process.env.JWT_SECRET_NEW!); }\n  catch { return jwt.verify(token, process.env.JWT_SECRET_OLD!); }\n}"
        },
        {
          "lvl": "lvl3",
          "q": "Log Aggregation Architecture: প্রোডাকশন ক্লাস্টার থেকে Loki এবং Grafana-তে সেন্ট্রালাইজড লগ স্ট্রিমিং কীভাবে সাজাবে?",
          "m": "আমরা ক্লাউড-নেটিভ লগিং স্ট্যাক ব্যবহার করি: (১) অ্যাপ্লিকেশনগুলো কনসোলে স্ট্রাকচার্ড JSON লগ নির্গমন করে। (২) সার্ভারের ব্যাকগ্রাউন্ডে `Promtail` বা `Vector` ডেমন চলে যা লোকাল ফাইল বা ডকার সকেট থেকে লগ ফাইলগুলো সংগ্রহ করে। (৩) সংগৃহীত লগগুলো নেটওয়ার্ক দিয়ে সেন্ট্রাল `Grafana Loki` ক্লাস্টারে পুশ করা হয়। লোকির সুবিধা: এটি Elasticsearch-এর মতো ভারী ফুল-টেক্সট ইনডেক্সিং করে না, বরং শুধুমাত্র লেবেল ইনডেক্স করে—ফলে RAM ও স্টোরেজ খরচ ৯৫% কম হয়। (৪) ইঞ্জিনিয়াররা Grafana Explore ড্যাশবোর্ডে গিয়ে `LogQL` কুয়েরি চালিয়ে সেকেন্ডের মধ্যে যেকোনো নির্দিষ্ট টেন্যান্ট বা এররের লগ ফিল্টার করে ডিবাগ করতে পারে।",
          "b": "অ্যাপ্লিকেশন JSON লগ তৈরি করে, Promtail এজেন্ট তা সংগ্রহ করে Grafana Loki ক্লাস্টারে পুশ করে। এটি ইলাস্টিকসার্চের চেয়ে অনেক হালকা ও সাশ্রয়ী এবং গ্রাফানা থেকে মুহূর্তেই লগ অনুসন্ধান করা যায়।",
          "e": "Architect centralized log aggregation using Grafana Loki fed by lightweight Vector or Promtail log collectors. Loki indexes strictly metadata labels rather than full-text payloads, lowering memory and disk footprints by 95% compared to Elasticsearch while enabling fast LogQL log queries in Grafana.",
          "code": "// LogQL Query in Grafana:\n{app=\"dokani-api\", env=\"production\"} |= \"PaymentFailed\" | json"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: প্রোডাকশনে কিছু কাস্টমার অভিযোগ করছে তারা চেকআউট করতে পারছে না, কিন্তু সার্ভার সিপিইউ ও মেমোরি সম্পূর্ণ নরমাল এবং কোনো ক্র্যাশ লগ নেই! Sentry খুলে তুমি কীভাবে আসল সমস্যাটি উদঘাটন করবে?",
          "m": "তদন্তের ধাপ: (১) Sentry ড্যাশবোর্ডে গিয়ে 'Issues'-এ লাস্ট ১ ঘণ্টার এরর ফিল্টার করব এবং 'Affected Users' কাউন্ট দেখব। (২) সমস্যাটি ক্র্যাশ না হয়ে একটি সাইলেন্ট ট্রানজ্যাকশন এরর হতে পারে (যেমন পেমেন্ট গেটওয়ের 400 Bad Request যা কোডে `catch` ব্লকে সাইলেন্টলি খেয়ে ফেলা হয়েছে!)। (৩) Sentry-র 'Breadcrumbs' দেখব: কাস্টমার কোন বাটনে ক্লিক করেছিল, কোন এপিআই কল হয়েছিল এবং ঠিক কোন স্টেপে এসে রেসপন্স ফেইল করেছে। (৪) এরর ডিটেইলে পেমেন্ট গেটওয়ের নির্দিষ্ট এরর কোড (যেমন `INVALID_MERCHANT_PIN` বা `INSUFFICIENT_BALANCE`) শনাক্ত করে অবিলম্বে কোড বা কনফিগারেশন ফিক্স রিলিজ করব।",
          "b": "সেন্ট্রির ইস্যু ট্র্যাকার ও ব্রেডক্রাম্বস দেখে বুঝব কাস্টমার চেকআউটের কোন ধাপে আটকেছে। সাইলেন্ট এরর ও পেমেন্ট এপিআই রেসপন্স ট্রেস দেখে সমস্যার মূল কারণ তাৎক্ষণিকভাবে বের করব।",
          "e": "Triage silent failures in Sentry by auditing Issues grouped by 'Affected Users' and inspecting the exact User Breadcrumbs leading up to checkout abandonment. Unhandled promise rejections or caught API exceptions will reveal the root external gateway rejection payload.",
          "tip": "বলো: 'Audit Sentry User Breadcrumbs to reconstruct the exact user interaction trail leading up to the silent failure.'"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: একটি হাই-ট্রাফিক এপিআই সার্ভারে লগ ফাইল একদিনেই ৪০GB হয়ে ডিস্ক স্পেস ৯৯% পূর্ণ করে দিয়েছে! তুমি সার্ভারে লগইন করে দেখলে কোডে `logger.info(JSON.stringify(req))` লেখা ছিল যা প্রতিটি রিকোয়েস্টের পুরো পে-লোড লগ করছিল। কীভাবে এটি ইমার্জেন্সি ফিক্স এবং রিফ্যাক্টর করবে?",
          "m": "ইমার্জেন্সি ফিক্স: (১) অবিলম্বে বড় লগ ফাইলটি ট্রাঙ্কেট করে ডিস্ক স্পেস ফাঁকা করব: `sudo truncate -s 0 /var/log/app.log`। (২) PM2 বা systemd দিয়ে নোড অ্যাপে এনভায়রনমেন্ট ভ্যারিয়েবল `LOG_LEVEL=warn` সেট করে রিলোড দেব—যাতে সমস্ত `info` লগ সাথে সাথে বন্ধ হয়ে যায় এবং শুধু ওয়ার্নিং ও এরর লগ হয়। (৩) স্থায়ী রিফ্যাক্টরিং: কোড থেকে ফুল রিকোয়েস্ট বডি লগিং সম্পূর্ণ মুছে দেব; এর বদলে শুধুমাত্র এপিআই রুট, মেথড, স্ট্যাটাস কোড ও সময়কাল লগ করব (`{ method, url, status, duration }`)।",
          "b": "truncate -s 0 দিয়ে বড় ফাইল খালি করে তাৎক্ষণিক ডিস্ক ফাঁকা করব। LOG_LEVEL=warn দিয়ে অপ্রয়োজনীয় info লগ বন্ধ করব এবং কোড রিফ্যাক্টর করে শুধু রিকোয়েস্টের মেটাডেটা লগ করার নিয়ম করব।",
          "e": "Execute truncate -s 0 /var/log/app.log to immediately free host disk storage. Dynamically throttle log verbosity to LOG_LEVEL=warn to suppress info dumps. Refactor logging middleware to strip raw request payloads, logging solely metadata (method, route, statusCode, duration).",
          "code": "sudo truncate -s 0 /var/log/dokani/app.log\n# In ecosystem.config.js:\nenv: { LOG_LEVEL: 'warn' }"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: মধ্যরাতে একটি ডেটাবেজ ক্র্যাশ হয়েছে এবং সকালের রিকভারির পর দেখা গেল স্বয়ংক্রিয় ব্যাকআপ স্ক্রিপ্টটি গত ৩ সপ্তাহ ধরে চুপিচুপি ফেইল করছিল কারণ AWS S3-এর স্টোরেজ কি এক্সপায়ার হয়ে গিয়েছিল! কীভাবে ভবিষ্যতে এমন নীরব ব্যর্থতা ১০০% প্রতিরোধ করবে?",
          "m": "মারাত্মক ভুল: ব্যাকআপ স্ক্রিপ্টে কোনো 'Dead Man's Snitch' বা ব্যর্থতা পর্যবেক্ষক ছিল না! স্থায়ী প্রতিরোধ ব্যবস্থা: (১) `Heartbeat Monitoring`: হেলথচেক সার্ভিস (যেমন Healthchecks.io বা BetterStack)-এ একটি মনিটর বানাব। ব্যাকআপ স্ক্রিপ্টের সফল এক্সিকিউশনের শেষে `curl https://hc-ping.com/xxx` পাঠানো হবে। যদি ২৪ ঘণ্টায় ১ বারও পিং না আসে, তবে মনিটর স্বয়ংক্রিয়ভাবে অন-কল ইঞ্জিনিয়ারদের ফোনে অ্যালার্ট পাঠাবে। (২) ব্যাকআপ স্ক্রিপ্টের শুরুতে `set -euo pipefail` রাখা যাতে যেকোনো কমান্ড ফেইল করলেই স্ক্রিপ্ট ক্যাচ ব্লকে স্ল্যাকে ফেইলিয়র নোটিফিকেশন পাঠায়।",
          "b": "নীরব ব্যর্থতা রোধে Healthchecks.io হার্টবিট মনিটরিং যুক্ত করব। ২৪ ঘণ্টার মধ্যে ব্যাকআপ সফলতার পিং না পেলে সিস্টেম স্বয়ংক্রিয়ভাবে অ্যালার্ট পাঠাবে। এছাড়া স্ক্রিপ্ট ফেইল করলে স্ল্যাকে সরাসরি এরর মেসেজ পাঠানোর ব্যবস্থা করব।",
          "e": "Prevent silent cron failures via Dead Man's Snitch / Healthchecks.io. The backup script curls an inbound ping endpoint strictly upon successful completion; if 24 hours elapse without a ping, the monitoring service triggers urgent phone/Slack escalations.",
          "code": "# At the end of backup.sh:\ncurl -fsS --retry 3 https://hc-ping.com/YOUR-UUID"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: প্রোডাকশন ডেটাবেজের ব্যাকআপ রিস্টোর ড্রিল করার সময় তুমি দেখলে রিস্টোর স্ক্রিপ্ট এরর দিচ্ছে: `ERROR: role 'dokani_user' does not exist` এবং সম্পূর্ণ রিস্টোর আটকে গেছে। কারণ কী এবং কীভাবে সমাধান করবে?",
          "m": "সমস্যার কারণ: `pg_dump` কমান্ডটি শুধুমাত্র নির্দিষ্ট ডেটাবেজের স্কিমা ও টেবিল ব্যাকআপ নেয়, কিন্তু গ্লোবাল ক্লাস্টার অবজেক্ট—যেমন ডেটাবেজ ইউজার, রোল ও পারমিশন—ব্যাকআপ নেয় না! ফলে নতুন ফ্রেশ সার্ভারে ওই ইউজার না থাকায় রিস্টোর ফেইল করেছে। সমাধান: (১) গ্লোবাল ক্লাস্টার রোল ব্যাকআপ নেওয়ার জন্য ক্রন জবে `pg_dumpall --globals-only > globals.sql` কমান্ড যুক্ত করা। (২) অথবা রিস্টোর স্ক্রিপ্টের শুরুতে স্বয়ংক্রিয়ভাবে প্রয়োজনীয় ইউজার ও রোল তৈরি করার প্রি-চেক স্ক্রিপ্ট যোগ করা (`CREATE ROLE dokani_user WITH LOGIN PASSWORD '...';`)। এর ফলে যেকোনো নতুন সার্ভারে নিখুঁতভাবে রিস্টোর সম্পন্ন হবে।",
          "b": "pg_dump ইউজার ও রোল ব্যাকআপ নেয় না। pg_dumpall --globals-only দিয়ে গ্লোবাল রোল ব্যাকআপ রাখতে হবে অথবা রিস্টোর করার আগে প্রয়োজনীয় ইউজার ও পারমিশন তৈরি করে নিতে হবে।",
          "e": "pg_dump backs up individual databases but omits global cluster metadata (database users, roles, tablespaces). Capture cluster roles via pg_dumpall --globals-only into a companion globals.sql artifact, or ensure provisioning scripts create required application roles prior to pg_restore.",
          "code": "pg_dumpall --globals-only -U postgres > /tmp/globals.sql"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: একটি সিকিউরিটি অডিটে দেখা গেল ডেভেলপাররা স্টেজিং এবং প্রোডাকশন উভয় পরিবেশে একই ডেটাবেজ পাসওয়ার্ড এবং একই JWT Secret ব্যবহার করছে! কেন এটি মারাত্মক অপরাধ এবং কীভাবে আলাদা করবে?",
          "m": "মারাত্মক অপরাধ: স্টেজিং পরিবেশ সাধারণত ডেভেলপারদের জন্য অনেক বেশি উন্মুক্ত থাকে এবং টেস্ট ডেটা থাকে। স্টেজিংয়ের কোনো কনফিগ বা লগ লিক হলে আক্রমণকারী সরাসরি সেই একই সিক্রেট ব্যবহার করে আসল প্রোডাকশন ডেটাবেজ হ্যাক করে কোটি টাকার রিয়েল ডেটা চুরি করে ফেলবে! সমাধান: (১) স্টেজিং ও প্রোডাকশনের সিক্রেট সম্পূর্ণ আলাদা ও স্বাধীন কি দিয়ে এনক্রিপ্ট করতে হবে। (২) Doppler বা GitHub Environments ব্যবহার করে স্টেজিং ও প্রোডাকশনের জন্য পৃথক সিক্রেট ভল্ট এনফোর্স করতে হবে। (৩) প্রোডাকশন ডাটাবেজের আইপি শুধুমাত্র প্রোডাকশন VPS-এর সাথে প্রাইভেট নেটওয়ার্কে লক রাখতে হবে যাতে স্টেজিং থেকে প্রোডাকশনে কোনো নেটওয়ার্ক রুটই না থাকে।",
          "b": "স্টেজিংয়ের সিক্রেট লিক হলে প্রোডাকশন হ্যাক হওয়ার মারাত্মক ঝুঁকি থাকে। Doppler বা গিটহাব এনভায়রনমেন্ট দিয়ে স্টেজিং ও প্রোডাকশনের জন্য সম্পূর্ণ আলাদা পাসওয়ার্ড ও সিক্রেট এনফোর্স করতে হবে।",
          "e": "Sharing credentials between staging and production invalidates environment isolation; compromising lower-security staging immediately exposes critical production systems. Segment environments strictly via isolated secrets vaults in Doppler, enforcing completely distinct cryptographic keys and private network boundaries.",
          "tip": "কখনোই স্টেজিং ও প্রোডাকশনে একই সিক্রেট বা পাসওয়ার্ড ব্যবহার করবে না।"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা (Dokani SaaS): Dokani POS-এর প্রোডাকশন হেলথ, এরর ট্র্যাকিং ও সার্বিক মনিটরিং আর্কিটেকচার কীভাবে আর্কিটেক্ট করা হয়েছে?",
          "m": "দোকানি পিওএসে একটি সম্পূর্ণ ত্রিমাত্রিক প্রোডাকশন মনিটরিং আর্কিটেকচার কার্যকর: (১) `Sentry`: সমস্ত ফ্রন্টএন্ড Next.js ও ব্যাকএন্ড Node.js এরর এবং স্লো ট্রেস রিয়েলটাইমে ট্র্যাক করে; কোনো ক্যাশিয়ারের চেকআউট ফেইল হলে ৩ সেকেন্ডের মধ্যে স্ল্যাকে বিস্তারিত ট্রেস সহ অ্যালার্ট আসে। (২) `Pino Structured JSON Logging`: প্রতিদিনের সমস্ত সেলস অডিট ও সিস্টেম লগ Pino দিয়ে ফরম্যাটেড আকারে সার্ভার ড্রাইভে জমা হয় এবং `pm2-logrotate` দিয়ে স্বয়ংক্রিয়ভাবে কম্প্রেস ও রোটেট হয়। (৩) `UptimeRobot + Dead Man's Snitch`: প্রতি ৬০ সেকেন্ডে এপিআই হেলথ এন্ডপয়েন্ট চেক করে সাইট ডাউন অ্যালার্ট দেয় এবং প্রতিদিনের ভোর ৪টার এনক্রিপ্টেড S3 ডেটাবেজ ব্যাকআপ সম্পন্ন হলে হার্টবিট পিং গ্রহণ করে। এর ফলে সিস্টেমটি ২৪/৭ সম্পূর্ণ অভিভাবকত্বে পরিচালিত হয়।",
          "b": "দোকানিতে সেন্ট্রি দিয়ে লাইভ এরর ট্র্যাকিং, পিনো দিয়ে স্ট্রাকচার্ড JSON লগিং এবং আপটাইমরোবট ও হার্টবিট পিং দিয়ে ২৪/৭ সিস্টেম হেলথ ও ডেটাবেজ ব্যাকআপ পর্যবেক্ষণ করা হয়।",
          "e": "Dokani POS operates a 360-degree observability stack: Sentry catches distributed client/server exceptions within 3 seconds, Pino produces structured JSON logs rotated via pm2-logrotate, and UptimeRobot pairs with Dead Man's Snitch heartbeats to audit API health and offsite S3 database backup completion 24/7.",
          "tip": "দোকানির এই ৩-টিয়ার অবজারভেবিলিটি ফ্রেমওয়ার্ক (Sentry + Pino + Uptime Heartbeats) বাস্তব প্রোডাকশন দক্ষতার অতুলনীয় প্রমাণ।"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: প্রোডাকশন ডেটাবেজ ব্যাকআপ অটোমেশন: উবুন্টু VPS থেকে AWS S3-তে ক্রন ব্যাকআপ স্ক্রিপ্ট কীভাবে লিখে টেস্ট করবে?",
          "m": "আমরা একটি সম্পূর্ণ স্বয়ংসম্পূর্ণ প্রোডাকশন ব্যাকআপ ব্যাশ স্ক্রিপ্ট ব্যবহার করি: (১) ইউনিক্স টাইমস্ট্যাম্প দিয়ে ব্যাকআপ ফাইলের নাম বানাই (`dokani_backup_$(date +%Y%m%d_%H%M%S).dump`)। (২) `pg_dump -Fc` দিয়ে কম্প্রেসড ডাম্প তৈরি করি। (৩) AWS CLI দিয়ে ফাইলটি সরাসরি এস৩ প্রাইভেট বাকেটে পুশ করি (`aws s3 cp ...`)। (৪) লোকাল ফাইল মুছে ডিস্ক ফাঁকা করি। (৫) এস৩ লাইফসাইকেল রুলসে ৩০ দিনের পুরনো ব্যাকআপ স্বয়ংক্রিয়ভাবে মুছে যাওয়ার পলিসি রাখি। টেস্ট করার নিয়ম: স্ক্রিপ্টটি ম্যানুয়ালি রান করে এস৩ বাকেটে ফাইল সাইজ পরীক্ষা করি এবং একটি টেস্ট স্যান্ডবক্সে `pg_restore` চালিয়ে যাচাই করি সম্পূর্ণ ডেটাবেজ নিখুঁতভাবে রিকভার হয়েছে কি না।",
          "b": "pg_dump দিয়ে টাইমস্ট্যাম্পযুক্ত ফাইল বানিয়ে AWS CLI দিয়ে S3 তে পাঠানো হয় এবং লোকাল ফাইল ডিলিট করা হয়। টেস্ট স্যান্ডবক্সে pg_restore চালিয়ে ব্যাকআপের কার্যকারিতা শতভাগ নিশ্চিত করা হয়।",
          "e": "Deploy an automated nightly cron backup script streaming compressed pg_dump archives to AWS S3 buckets. Assert disaster readiness by executing regular sandbox restore verifications (pg_restore) against temporary staging instances to prove archive integrity.",
          "code": "# Crontab entry (Runs daily at 03:00 AM):\n0 3 * * * /var/scripts/backup-to-s3.sh >> /var/log/backup.log 2>&1"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: প্রোডাকশন ডেটাবেজ ডিজাস্টার রিকভারি এক্সারসাইজ (Game Day Drill) কীভাবে পরিচালনা করবে?",
          "m": "গেম ডে ড্রিল হলো একটি পরিকল্পিত মহড়া যেখানে টিমের ইঞ্জিনিয়াররা ইচ্ছাকৃতভাবে একটি ডামি ডিজাস্টার তৈরি করে রিকভারি গতি পরীক্ষা করে। ধাপসমূহ: (১) একটি টেস্ট ক্লাউড পরিবেশে লাইভ প্রোডাকশনের একটি ক্লোন তৈরি করি। (২) লিড ইঞ্জিনিয়ার না জানিয়ে ডেটাবেজ ড্রপ করে দেয় বা সার্ভার টার্মিনেট করে। (৩) অন-কল ইঞ্জিনিয়ারদের রিকভারি রানবুক খুলে এস৩ থেকে সর্বশেষ ব্যাকআপ ডাউনলোড করে নতুন সার্ভারে রিস্টোর করতে বলা হয়। (৪) ঘড়ি ধরে মাপা হয় আমাদের RTO (কত মিনিটে সাইট ফিরল) এবং RPO (কত মিনিটের ডেটা লস হলো)। এই নিয়মিত ড্রিলের কারণে বাস্তব বিপর্যয়ে টিম কোনো আতঙ্ক ছাড়াই শান্ত মাথায় ১০ মিনিটে সিস্টেম রিকভার করতে পারে।",
          "b": "গেম ডে ড্রিলে টেস্ট পরিবেশে কৃত্রিমভাবে ডাটাবেজ ক্র্যাশ ঘটিয়ে ব্যাকআপ থেকে রিস্টোর করার মহড়া দেওয়া হয়। এটি অন-কল ইঞ্জিনিয়ারদের বাস্তব বিপর্যয়ের দিনে নির্ভুলভাবে ১০ মিনিটে সিস্টেম ফিরিয়ে আনার আত্মবিশ্বাস দেয়।",
          "e": "Execute scheduled Game Day Disaster Drills in sandbox environments: deliberately drop target database clusters and time the engineering team's execution of offsite S3 restore runbooks. This audits true RTO/RPO metrics and hardens team muscle memory for real-world incidents.",
          "tip": "বলো: 'Game Day disaster recovery drills validate team runbooks and prove real-world RTO targets under pressure.'"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: স্ল্যাক নোটিফিকেশনে প্রোডাকশন অ্যালার্ট ইন্টিগ্রেশন: ইমার্জেন্সি P1 ইনসিডেন্টের সময় অটোমেটেড এস্কেলেশন কীভাবে কাজ করে?",
          "m": "আমরা স্ল্যাক ওয়েবহুক এবং PagerDuty সমন্বয় করি: (১) `P3 (Minor Warning)`: সাধারণ ওয়ার্নিং বা বিচ্ছিন্ন হ্যান্ডেল্ড এরর শুধুমাত্র `#dev-logs` চ্যানেলে যায় কোনো সাউন্ড ছাড়া। (২) `P2 (Degraded Performance)`: এপিআই ল্যাটেন্সি ৫০০ms পার হলে `#alerts-backend` চ্যানেলে ইয়েলো অ্যালার্ট যায়। (৩) `P1 (Critical Outage)`: ডেটাবেজ কানেকশন লস, সাইট ডাউন বা 5xx এরর ৫% অতিক্রম করলে মুহূর্তের মধ্যে `#incidents-critical` চ্যানেলে রেড অ্যালার্ট যায় এবং পেজারডিউটি অন-কল লিড ইঞ্জিনিয়ারের ফোনে অটোমেটিক কল ও সাইরেন বাজায়। যদি ৫ মিনিটে কেউ একনলেজ (Acknowledge) না করে, তবে অ্যালার্টটি অটোমেটিক সিটিও (CTO)-র ফোনে এস্কেলেট করে।",
          "b": "অ্যালার্ট তিন ভাগে বিভক্ত: সাধারণ ওয়ার্নিং নিঃশব্দে স্ল্যাকে যায়, পারফরম্যান্স ড্রপে ব্যাকএন্ড টিমে সতর্কবার্তা যায় এবং সাইট ডাউন হলে সরাসরি ইঞ্জিনিয়ারের ফোনে পেজারডিউটি সাইরেন ও কল দিয়ে জরুরি এস্কেলেশন করা হয়।",
          "e": "Implement multi-tiered incident routing: P3 warnings route silently to #dev-logs, P2 performance degradations notify team channels, and P1 critical outages (database dropouts, 5xx spikes) trigger PagerDuty phone escalations to on-call leads with automatic failover escalation to engineering management.",
          "tip": "বলো: 'We implement multi-tiered incident escalation from passive Slack telemetry up to automated PagerDuty on-call sirens.'"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: ক্লাউড সিকিউরিটি অডিট ও কমপ্লায়েন্স চেকলিস্ট: প্রোডাকশন রিলিজের পূর্বে তোমার ফাইনাল ডেভঅপস চেকলিস্ট কী?",
          "m": "ফাইনাল প্রোডাকশন সাইন-অফ চেকলিস্ট: (১) `Network Perimeter`: UFW ফায়ারওয়ালে ২২, ৮০, ৪৪৩ ছাড়া সমস্ত অভ্যন্তরীণ পোর্ট (5432, 27017, 6379) সম্পূর্ণ ব্লক। (২) `SSH Security`: PasswordAuthentication no এবং PermitRootLogin no এনফোর্সড। (৩) `Application`: PM2 ক্লাস্টার মোড সচল, ৪GB Swap সক্রিয় এবং Nginx রিভার্স প্রক্সিতে SSL A+ রেটিং কনফিগারড। (৪) `Secrets`: `.env` পারমিশন ৬০০ এবং কোনো সিক্রেট গিটে কমিট নেই। (৫) `Disaster Recovery`: অটোমেটেড নাইটলি S3 ব্যাকআপ ক্রন স্ক্রিপ্ট ও হার্টবিট সক্রিয় এবং টেস্ট রিস্টোর সফল। (৬) `Monitoring`: Sentry এবং আপটাইম অ্যালার্ট সক্রিয়। এই ৬টি টিক মার্ক ছাড়া কোনো সফটওয়্যার প্রোডাকশনে সাইন-অফ পায় না।",
          "b": "প্রোডাকশন চেকলিস্ট: ফায়ারওয়াল পোর্ট ব্লকিং, রুট লগইন নিষিদ্ধ, PM2 ক্লাস্টার ও সোয়াপ মেমোরি, .env পারমিশন ৬০০, এনক্রিপ্টেড S3 ব্যাকআপ পাইপলাইন এবং সেন্ট্রি এরর ট্র্যাকিং সক্রিয় থাকা বাধ্যতামূলক।",
          "e": "Pre-production DevOps sign-off checklist: (1) Perimeter firewalls locked down, (2) SSH root/password logins disabled, (3) PM2 cluster with swap active behind Nginx SSL, (4) Strict .env file permissions (600), (5) Verified automated S3 offsite backups with heartbeat monitoring, and (6) Sentry/Uptime observability live.",
          "tip": "ইন্টারভিউ শেষ করার জন্য এই ৬-দফা ডেভঅপস প্রোডাকশন চেকলিস্ট একটি মাস্টারস্ট্রোক।"
        }
      ]
    }
  ]
};
