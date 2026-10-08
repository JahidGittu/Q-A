// Topic 1: Linux & Ubuntu Server Administration (25 Questions: 5 lvl1, 5 lvl2, 5 lvl3, 5 situation, 5 realworld)
module.exports = {
  id: "linux-ubuntu-admin",
  name: "Linux & Ubuntu Server Administration",
  desc: "SSH Key Auth, File Permissions (chmod/chown), systemd Services, UFW Firewall, Resource Monitoring (htop, df, free, netstat), Shell Automation",
  items: [
    // --- LEVEL 1 (5 Questions) ---
    {
      lvl: "lvl1",
      q: "Linux সার্ভারে পাসওয়ার্ড অথেনটিকেশনের চেয়ে SSH Key Pair অথেনটিকেশন কেন বহুগুণ নিরাপদ?",
      m: "পাসওয়ার্ড অথেনটিকেশনে ব্রুট-ফোর্স (Brute-Force) অ্যাটাকের মাধ্যমে হ্যাকাররা বট দিয়ে ডিকশনারি পাসওয়ার্ড ট্রাই করে সার্ভারে ঢুকে পড়তে পারে। কিন্তু SSH Key Pair (RSA 4096 বা Ed25519) পাবলিক-প্রাইভেট ক্রিপ্টোগ্রাফি ব্যবহার করে। পাবলিক কি সার্ভারের `~/.ssh/authorized_keys`-এ থাকে এবং প্রাইভেট কি ডেভেলপারের লোকাল কম্পিউটারে থাকে। প্রাইভেট কি ছাড়া কারও পক্ষে লগইন করা গাণিতিকভাবে অসম্ভব। প্রোডাকশনে `PasswordAuthentication no` কনফিগার করে পাসওয়ার্ড লগইন পুরোপুরি বন্ধ রাখা ইন্ডাস্ট্রি স্ট্যান্ডার্ড।",
      b: "পাসওয়ার্ডের চেয়ে এসএসএইচ কি অনেক বেশি সুরক্ষিত কারণ এটি ব্রুট-ফোর্স আক্রমণ প্রতিরোধ করে। এড২৫৫১৯ বা আরএসএ ক্রিপ্টোগ্রাফির মাধ্যমে ক্লায়েন্টের প্রাইভেট কি সার্ভারের পাবলিক কি যাচাই করে লগইন নিশ্চিত করে।",
      e: "SSH key pairs (Ed25519 or RSA 4096) replace guessable passwords with asymmetric cryptography. The public key resides on the server in ~/.ssh/authorized_keys while the private key remains secure locally. Disabling PasswordAuthentication in sshd_config neutralizes automated brute-force attacks.",
      tip: "বলো: 'Ed25519 SSH keys with PasswordAuthentication disabled is the gold standard for server access.'"
    },
    {
      lvl: "lvl1",
      q: "Linux ফাইল পারমিশন (chmod) এবং ওনারশিপ (chown) কীভাবে কাজ করে এবং `chmod 755` বনাম `644`-এর অর্থ কী?",
      m: "লিনাক্সে প্রতিটি ফাইলের ৩ ধরনের পারমিশন থাকে: Read (4), Write (2), Execute (1); এবং ৩টি সত্তা থাকে: Owner, Group, Others। (১) `chmod 644`: ওনার পাবে Read + Write (4+2=6), গ্রুপ ও অন্যরা পাবে শুধুমাত্র Read (4) (সাধারণ কনফিগ ফাইল বা এইচটিএমএল ফাইলের জন্য আদর্শ)। (২) `chmod 755`: ওনার পাবে সব (Read+Write+Execute = 7), গ্রুপ ও অন্যরা পাবে Read + Execute (4+1=5) (ডিরেক্টরি ও এক্সিকিউটেবল স্ক্রিপ্টের জন্য আদর্শ)। `chown user:group filename` ফাইলের মালিকানা পরিবর্তন করে।",
      b: "chmod ফাইলের পারমিশন (পড়া, লেখা, চালানো) নির্ধারণ করে এবং chown ওনারশিপ পরিবর্তন করে। 644 ফাইলে ওনারকে রিড-রাইট এবং অন্যদের রিড দেয়। 755 ফোল্ডার বা স্ক্রিপ্টে ওনারকে পূর্ণ অধিকার এবং অন্যদের রিড ও এক্সিকিউট পারমিশন দেয়।",
      e: "Linux permissions represent octal bitmasks for Owner, Group, and Others: Read (4), Write (2), Execute (1). chmod 644 grants read/write to the owner and read-only to others (standard for files). chmod 755 grants execution to owner and traversal to others (standard for web directories). chown reassigns user/group ownership.",
      code: "chmod 755 /var/www/dokani\nchmod 644 /var/www/dokani/.env\nchown -R www-data:www-data /var/www/dokani"
    },
    {
      lvl: "lvl1",
      q: "Ubuntu সার্ভারে `systemd` কী এবং `systemctl` কমান্ড দিয়ে সার্ভিস কীভাবে ম্যানেজ করা হয়?",
      m: "`systemd` হলো আধুনিক লিনাক্সের সেন্ট্রাল সিস্টেম ও সার্ভিস ম্যানেজার (Init System / PID 1)। এটি ব্যাকগ্রাউন্ড প্রসেস বা ডেমনগুলোকে নিয়ন্ত্রণ করে, সার্ভার রিবুট হলে স্বয়ংক্রিয়ভাবে অ্যাপ চালু করে এবং ক্র্যাশ করলে অটো-রিস্টার্ট করে। প্রধান কমান্ডসমূহ: (১) `systemctl start nginx`: সার্ভিস চালু করা, (২) `systemctl restart nginx`: সার্ভিস রিস্টার্ট করা, (৩) `systemctl status nginx`: সার্ভিসের লাইভ হেলথ ও এরর লগ দেখা, (৪) `systemctl enable nginx`: সার্ভার রিবুট হওয়ার সাথে সাথে স্বয়ংক্রিয়ভাবে চালুর নির্দেশ দেওয়া।",
      b: "systemd হলো লিনাক্সের প্রধান সার্ভিস ম্যানেজার যা ব্যাকগ্রাউন্ড সার্ভিস পরিচালনা করে। systemctl দিয়ে সার্ভিস শুরু, বন্ধ, রিস্টার্ট এবং সার্ভার বুট হওয়ার সময় অটো-স্টার্ট কনফিগার করা হয়।",
      e: "systemd is the standard Linux initialization system and service supervisor running as PID 1. systemctl manages service lifecycles (start, stop, restart, reload, status) and registers auto-start upon OS boots via systemctl enable.",
      code: "sudo systemctl restart nginx\nsudo systemctl enable nginx\nsudo systemctl status nginx"
    },
    {
      lvl: "lvl1",
      q: "UFW (Uncomplicated Firewall) কী এবং নতুন উবুন্টু সার্ভারে কীভাবে বেসিক ফায়ারওয়াল রুলস কনফিগার করবে?",
      m: "UFW হলো লিনাক্স `iptables`-এর ওপর একটি সহজবোধ্য ইন্টারফেস যা সার্ভারের নেটওয়ার্ক পোর্টগুলোকে সুরক্ষিত রাখে এবং অননুমোদিত পোর্ট ট্রাফিকের অ্যাক্সেস ব্লক করে। নতুন সার্ভারে সেটআপের ধাপ: (১) ডিফল্ট ইনকামিং ব্লক ও আউটগোয়িং এলাউ করা: `ufw default deny incoming`, (২) SSH পোর্ট ওপেন রাখা (যাতে নিজের কানেকশন কেটে না যায়!): `ufw allow 22/tcp` বা কাস্টম SSH পোর্ট, (৩) ওয়েব ট্রাফিকের জন্য HTTP ও HTTPS পোর্ট ওপেন করা: `ufw allow 80/tcp`, `ufw allow 443/tcp`, (৪) ফায়ারওয়াল এনাবল করা: `ufw enable`। ডাটাবেজ পোর্ট (5432 বা 27017) সবসময় বাইরের জন্য বন্ধ রাখা উচিত।",
      b: "UFW হলো উবুন্টুর ফায়ারওয়াল যা অননুমোদিত পোর্ট বন্ধ করে সার্ভার রক্ষা করে। প্রথমে SSH পোর্ট (22) এবং ওয়েব পোর্ট (80, 443) এলাউ করে ফায়ারওয়াল চালু করতে হয়। ডাটাবেজ পোর্ট বাইরের জন্য সবসময় ব্লক রাখতে হয়।",
      e: "UFW (Uncomplicated Firewall) manages host-level packet filtering. Set up a pristine server by denying incoming by default, whitelisting SSH (port 22) to prevent accidental lockouts, whitelisting web traffic (ports 80 and 443), and enabling via ufw enable while leaving internal DB ports closed.",
      code: "sudo ufw default deny incoming\nsudo ufw default allow outgoing\nsudo ufw allow 22/tcp\nsudo ufw allow 80/tcp\nsudo ufw allow 443/tcp\nsudo ufw enable"
    },
    {
      lvl: "lvl1",
      q: "Linux সার্ভারের স্বাস্থ্য ও রিসোর্স মনিটরিংয়ে `htop`, `df -h`, এবং `free -m` কমান্ডগুলোর কাজ কী?",
      m: "(১) `htop`: সার্ভারের প্রতিটি সিপিইউ কোরের রিয়েল-টাইম লোড, মেমোরি ব্যবহার এবং কোন প্রসেসটি সবচেয়ে বেশি সিপিইউ খাচ্ছে তা কালারফুল ইন্টারফেস সহ লাইভ পর্যবেক্ষণ ও কিল করার জন্য ব্যবহৃত হয়। (২) `df -h`: ডিস্ক ড্রাইভ বা হার্ডডিস্ক পার্টিশনগুলোর মোট সাইজ, ব্যবহৃত জায়গা ও অবশিষ্ট ফাঁকা স্থান মানুষের পাঠযোগ্য (GB/MB) আকারে প্রদর্শন করে। (৩) `free -m`: সার্ভারের ফিজিক্যাল RAM এবং Swap স্পেসের মোট পরিমাণ, ব্যবহৃত মেমোরি এবং বাফার/ক্যাশের পরিমাণ মেগাবাইটে তুলে ধরে।",
      b: "htop লাইভ সিপিইউ ও মেমোরি প্রসেস দেখতে ব্যবহৃত হয়। df -h হার্ডডিস্কের ফাঁকা জায়গা দেখায় এবং free -m সার্ভারের র‍্যাম ও সোয়াপ মেমোরির ব্যবহার প্রদর্শন করে।",
      e: "htop is an interactive process viewer displaying real-time per-core CPU and memory utilization. df -h reports disk partition space in human-readable gigabytes. free -m displays allocated, free, and cached physical RAM and swap space in megabytes.",
      tip: "সার্ভারে লগইন করেই প্রথমে `htop`, `df -h`, এবং `free -m` রান করে সার্ভারের প্রাথমিক স্বাস্থ্য চেক করা প্রো-ইঞ্জিনিয়ারদের স্বভাব।"
    },

    // --- LEVEL 2 (5 Questions) ---
    {
      lvl: "lvl2",
      q: "Ubuntu সার্ভারে নন-রুট সুডো ইউজার (Sudo User) তৈরি করা এবং রুট লগইন ব্লক করা কেন বাধ্যতামূলক?",
      m: "সরাসরি `root` ইউজার হিসেবে দৈনন্দিন কাজ চালানো মারাত্মক বিপজ্জনক; কোনো একটি ভুল কমান্ড (`rm -rf`) সার্ভারকে সম্পূর্ণ ধ্বংস করে দিতে পারে। এছাড়া ইন্টারনেটের সব হ্যাকার বট 'root' ইউজারনেইম টার্গেট করে আক্রমণ চালায়। বেস্ট প্র্যাকটিস: নিজের নামে একটি নতুন ইউজার বানিয়ে তাকে `sudo` গ্রুপে যুক্ত করা (`usermod -aG sudo deployer`), ওই ইউজারের জন্য SSH কি সেটআপ করা এবং `/etc/ssh/sshd_config`-এ `PermitRootLogin no` সেট করে SSH ডেমন রিস্টার্ট করা। এর ফলে রুট দিয়ে সরাসরি লগইন চিরতরে বন্ধ হয়ে যায়।",
      b: "সরাসরি রুট ইউজার দিয়ে কাজ করা ঝুঁকিপূর্ণ। একটি নন-রুট সুডো ইউজার তৈরি করে রুট লগইন বন্ধ (PermitRootLogin no) করে দিলে ব্রুট-ফোর্স আক্রমণ পুরোপুরি প্রতিহত হয়।",
      e: "Direct root logins expose systems to brute force and catastrophic command typos. Create a dedicated sudo user, provision SSH keys, and set PermitRootLogin no in /etc/ssh/sshd_config to permanently lock out remote root access.",
      code: "adduser deployer\nusermod -aG sudo deployer\n# In /etc/ssh/sshd_config:\nPermitRootLogin no\nPasswordAuthentication no"
    },
    {
      lvl: "lvl2",
      q: "Linux Swap Memory কী এবং ২GB RAM-এর একটি ছোট VPS-এ কেন Swap Space কনফিগার করা জীবন রক্ষাকারী?",
      m: "Swap Memory হলো সার্ভারের হার্ডডিস্কের (SSD) একটি নির্ধারিত অংশ যা ফিজিক্যাল RAM পূর্ণ হয়ে গেলে সেকেন্ডারি মেমোরি হিসেবে কাজ করে। ২GB RAM-এর সার্ভারে যখন ভারী বিল্ড প্রসেস (যেমন `npm run build` বা `next build`) চলে, তখন মেমোরি স্পাইক করে ২GB ছাড়িয়ে যায়। যদি Swap না থাকে, লিনাক্স কার্নেলের OOM Killer (Out Of Memory Killer) সাথে সাথে নোড প্রসেস বা ডাটাবেজ প্রসেসকে ক্র্যাশ করায়! ৪GB-র একটি Swap ফাইল থাকলে অতিরিক্ত মেমোরি ডিস্কে অফলোড হয়; বিল্ড সাময়িক ধীরগতির হলেও সার্ভার ক্র্যাশ হওয়া থেকে শতভাগ বেঁচে যায়।",
      b: "সোয়াপ হলো হার্ডডিস্কের একটি অংশ যা র‍্যাম শেষ হয়ে গেলে ব্যাকআপ মেমোরি হিসেবে কাজ করে। ২GB র‍্যামের সার্ভারে নেক্সটজেএস বিল্ড বা ডাটাবেজ চলাকালীন OOM কিলার প্রসেস ক্র্যাশ হওয়া ঠেকাতে সোয়াপ মেমোরি অপরিহার্য।",
      e: "Swap space uses storage drive space as overflow virtual memory when physical RAM saturates. On a budget 2GB VPS, running memory-intensive Next.js production builds triggers the Linux Out-Of-Memory (OOM) Killer, dropping services. A 4GB swapfile absorbs memory spikes, keeping processes alive.",
      code: "sudo fallocate -l 4G /swapfile\nsudo chmod 600 /swapfile\nsudo mkswap /swapfile\nsudo swapon /swapfile\necho '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab"
    },
    {
      lvl: "lvl2",
      q: "লিনাক্সে `systemd` সার্ভিস ইউনিট ফাইল (`/etc/systemd/system/myapp.service`) কীভাবে লিখে নোড অ্যাপ রান করাবে?",
      m: "একটি কাস্টম `.service` ফাইলে ৩টি মূল সেকশন থাকে: `[Unit]` (ডেসক্রিপশন ও ডিপেনডেন্সি যেমন নেটওয়ার্ক আপ হওয়া), `[Service]` (অ্যাপ চলার নিয়মাবলি), এবং `[Install]` (মাল্টি-ইউজার টার্গেট)। সার্ভিস ব্লকে ডিফাইন করি: `ExecStart` (অ্যাপ শুরুর কমান্ড), `WorkingDirectory` (প্রজেক্ট পাথ), `User` (নিরাপদ নন-রুট ইউজার যেমন deployer), `Restart=always` (ক্র্যাশ করলে স্বয়ংক্রিয় রিস্টার্ট), এবং `Environment` ভ্যারিয়েবল। ফাইলটি সেভ করে `systemctl daemon-reload` এবং `systemctl enable --now myapp` চালালেই অ্যাপ সার্বক্ষণিক ডেমন হিসেবে রান করে।",
      b: "systemd সার্ভিস ফাইলে ExecStart, WorkingDirectory, নন-রুট User এবং Restart=always কনফিগার করা হয়। daemon-reload করে সার্ভিস স্টার্ট করলে অ্যাপ ক্র্যাশ করলেও স্বয়ংক্রিয়ভাবে রিস্টার্ট হয়।",
      e: "A systemd service unit declares execution instructions under [Service]: ExecStart, WorkingDirectory, non-root User, Restart=always, and Environment files. Registering with systemctl enable --now ensures continuous auto-healing supervision.",
      code: "[Unit]\nDescription=Dokani Backend API\nAfter=network.target\n\n[Service]\nType=simple\nUser=deployer\nWorkingDirectory=/var/www/dokani/backend\nExecStart=/usr/bin/node dist/server.js\nRestart=always\nRestartSec=5\nEnvironment=NODE_ENV=production\n\n[Install]\nWantedBy=multi-user.target"
    },
    {
      lvl: "lvl2",
      q: "লিনাক্সে নেটওয়ার্ক পোর্ট ট্রাবলশুটিংয়ে `netstat -tulpn` বা `ss -tulpn` এবং `lsof -i :port` কমান্ডগুলোর ব্যবহার কী?",
      m: "যখন কোনো অ্যাপ চালু করতে গিয়ে `Error: listen EADDRINUSE :::5000` দেখায়, তখন এই কমান্ডগুলো জীবন বাঁচায়। (১) `ss -tulpn`: সার্ভারের সমস্ত ওপেন ও লিসেনিং TCP/UDP পোর্ট এবং সংশ্লিষ্ট প্রসেসের নাম ও PID দেখায়। (২) `lsof -i :5000`: সরাসরি প্রকাশ করে পোর্ট ৫০০০-এ কোন নির্দিষ্ট প্রসেসটি (PID) আটকে আছে। এরপর `kill -9 <PID>` কমান্ড চালিয়ে অবাধ্য প্রসেসটিকে বন্ধ করে পোর্ট মুক্ত করা যায়।",
      b: "ss -tulpn বা netstat পোর্ট লিসেনিং দেখতে ব্যবহৃত হয়। lsof -i :port দিয়ে নির্দিষ্ট পোর্ট কোন প্রসেস আটকে রেখেছে তা জানা যায় এবং kill কমান্ড দিয়ে পোর্ট খালি করা যায়।",
      e: "ss -tulpn and netstat display all active listening TCP/UDP sockets with process PIDs. When resolving EADDRINUSE errors, lsof -i :PORT reveals the exact process PID binding the port, allowing targeted termination via kill -9 <PID>.",
      code: "sudo ss -tulpn | grep 5000\nsudo lsof -i :5000\nsudo kill -9 12345"
    },
    {
      lvl: "lvl2",
      q: "Ubuntu সার্ভারে অটোমেটেড লগ রোটেশন (`logrotate`) কেন আবশ্যক এবং কীভাবে কনফিগার করা হয়?",
      m: "যদি কোনো অ্যাপ্লিকেশন বা Nginx লগ ফাইলে অবিরাম লগ লিখতে থাকে, তবে কয়েক মাসের মধ্যে সেই লগ ফাইল ২০-৩০ গিগাবাইট হয়ে পুরো সার্ভারের হার্ডডিস্ক পূর্ণ করে সার্ভার ডাউন করে দেবে! `logrotate` হলো একটি লিনাক্স ইউটিলিটি যা স্বয়ংক্রিয়ভাবে লগ ফাইলগুলোকে দৈনিক বা সাপ্তাহিক ভিত্তিতে ভাগ করে, কম্প্রেস (`gzip`) করে এবং নির্দিষ্ট দিন (যেমন ১৪ দিন) পর পুরনো লগ মুছে ফেলে। এটি `/etc/logrotate.d/myapp` কনফিগে ডিফাইন করা হয়।",
      b: "লগ ফাইল যাতে বড় হয়ে ডিস্ক ভর্তি করে সার্ভার ক্র্যাশ না করায় সেজন্য logrotate ব্যবহৃত হয়। এটি নির্দিষ্ট সময় পর পর লগ ফাইল জিপ করে সংরক্ষণ করে এবং অতি পুরনো ফাইল স্বয়ংক্রিয়ভাবে মুছে ডিস্ক ফাঁকা রাখে।",
      e: "Unchecked log files expand indefinitely until exhausting disk storage. logrotate runs daily via cron to rotate, compress (.gz), truncate, and purge aged logs according to policy directives in /etc/logrotate.d/.",
      code: "/var/log/dokani/*.log {\n  daily\n  rotate 14\n  compress\n  delaycompress\n  missingok\n  notifempty\n  create 0640 deployer deployer\n}"
    },

    // --- LEVEL 3 (5 Questions) ---
    {
      lvl: "lvl3",
      q: "Linux ও কার্নেল টিউনিং: হাই-কনকারেন্সি ওয়েব সার্ভারের জন্য `ulimit` (File Descriptors) এবং `sysctl` নেটওয়ার্ক অপটিমাইজেশন কীভাবে সাজাবে?",
      m: "ডিফল্ট লিনাক্সে একটি প্রসেসের জন্য ওপেন ফাইল লিমিট থাকে মাত্র ১০২৪টি (`ulimit -n`)। প্রতিটি নেটওয়ার্ক সকেট কানেকশন হলো একটি ফাইল ডেসক্রিপ্টর; ফলে ১০২৪ জনের বেশি ইউজার কানেক্ট করলেই `Too many open files` এরর দিয়ে সার্ভার আটকে যায়। অপটিমাইজেশন: (১) `/etc/security/limits.conf`-এ `nofile` লিমিট বাড়িয়ে ৬৫৫৩৫ করা। (২) `/etc/sysctl.conf`-এ কার্নেল নেটওয়ার্ক প্যারামিটার টিউন করা: `net.core.somaxconn = 65535` (কানেকশন ব্যাকলগ বাড়ানো), `net.ipv4.tcp_tw_reuse = 1` (টাইম-ওয়েট সকেট রিসাইকেল করা), এবং `fs.file-max = 2097152`।",
      b: "ডিফল্ট ফাইল ডেসক্রিপ্টর লিমিট ১০২৪ হওয়ায় বেশি ইউজার এলে সকেট এরর ঘটে। limits.conf এ nofile লিমিট ৬৫৫৩৫ এ বাড়ানো এবং sysctl দিয়ে somaxconn ও tcp_tw_reuse টিউন করে হাজার হাজার কনকারেন্ট কানেকশন হ্যান্ডেল করা যায়।",
      e: "Linux defaults cap open file descriptors to 1024 (ulimit -n), causing 'Too many open files' socket exhaustion under load. Elevate limits to 65535 in limits.conf, and optimize kernel networking in /etc/sysctl.conf via net.core.somaxconn=65535 and net.ipv4.tcp_tw_reuse=1.",
      code: "# /etc/security/limits.conf\n* soft nofile 65535\n* hard nofile 65535\n# Apply sysctl:\nsudo sysctl -p"
    },
    {
      lvl: "lvl3",
      q: "Ubuntu সার্ভারে Fail2ban কীভাবে স্বয়ংক্রিয় ব্রুট-ফোর্স আইপি ব্লকিং ও জেইল (Jail) কনফিগার করে?",
      m: "`Fail2ban` হলো একটি ইন্ট্রুশন প্রিভেনশন ফ্রেমওয়ার্ক যা লিনাক্স লগ ফাইলগুলো (যেমন `/var/log/auth.log`) প্রতিনিয়ত স্ক্যান করে। যদি কোনো আইপি অ্যাড্রেস থেকে নির্দিষ্ট সময়ের মধ্যে (যেমন ১০ মিনিটে) ৫ বার ভুল পাসওয়ার্ড বা ম্যালিশিয়াস রিকোয়েস্ট আসে, Fail2ban তাৎক্ষণিকভাবে লিনাক্স ফায়ারওয়াল (UFW/iptables)-এ একটি রুল যোগ করে ওই আইপি-কে ২৪ ঘণ্টার জন্য সম্পূর্ণ ড্রপ বা ব্যান করে দেয় (`banAction = ufw`)। এটি SSH ও Nginx উভয় সার্ভারকে বটনেট আক্রমণ থেকে সুরক্ষিত রাখে।",
      b: "Fail2ban সার্ভার লগ পর্যবেক্ষণ করে ৫ বার ভুল পাসওয়ার্ড দেওয়া আক্রমণকারী আইপিগুলোকে স্বয়ংক্রিয়ভাবে ফায়ারওয়ালে ব্যান করে দেয়। এটি বট ও ব্রুট-ফোর্স আক্রমণ পুরোপুরি নস্যাৎ করে।",
      e: "Fail2ban monitors authentication logs for malicious patterns. When an IP exceeds maxretry thresholds within findtime, Fail2ban injects kernel-level firewall rules dropping all packets from that IP for a configurable bantime duration.",
      code: "# /etc/fail2ban/jail.local:\n[sshd]\nenabled = true\nport = 22\nmaxretry = 5\nfindtime = 600\nbantime = 86400"
    },
    {
      lvl: "lvl3",
      q: "Linux Cron Jobs (`crontab -e`) কীভাবে কাজ করে এবং ডেটাবেজ ব্যাকআপ ও ক্লিনিংয়ের জন্য নির্ভরযোগ্য ক্রন এক্সপ্রেশন কীভাবে লিখবে?",
      m: "Cron হলো লিনাক্সের টাইম-বেসড টাস্ক শিডিউলার। এর ফরম্যাটে ৫টি ফিল্ড থাকে: `মিনিট ঘন্টা দিন মাস বার` (`* * * * *`)। নির্ভরযোগ্য স্ক্রিপ্ট লেখার নিয়ম: (১) ক্রন জবে সবসময় পরম পাথ (Absolute Paths) ব্যবহার করতে হবে (যেমন `/usr/bin/node` বা `/bin/bash`), কারণ ক্রন ডিফল্ট ইউজারের শেল এনভায়রনমেন্ট পায় না। (২) আউটপুট ও এরর লগ ফাইলে রিডাইরেক্ট করতে হবে (`>> /var/log/backup.log 2>&1`)। উদাহরণ: প্রতিদিন রাত ৩:৩০ মিনিটে ব্যাকআপ স্ক্রিপ্ট রান করার কমান্ড: `30 3 * * * /var/scripts/db_backup.sh >> /var/log/db_backup.log 2>&1`।",
      b: "ক্রন হলো লিনাক্সের সময়ভিত্তিক টাস্ক শিডিউলার। ৫টি ফিল্ডের মাধ্যমে সময় নির্ধারণ করা হয়। ক্রন জবে সর্বদা অ্যাবসোলিউট পাথ ব্যবহার করতে হয় এবং এরর ট্র্যাক করার জন্য আউটপুট লগ ফাইলে রিডাইরেক্ট করতে হয়।",
      e: "Linux cron automates scheduled jobs via 5 temporal fields: minute, hour, day-of-month, month, day-of-week. Robust cron scripts must use explicit absolute binary paths (/usr/bin/pg_dump) and pipe combined stdout/stderr to a log file for traceability.",
      code: "# Daily at 03:30 AM:\n30 3 * * * /usr/local/bin/backup-dokani.sh >> /var/log/dokani-backup.log 2>&1"
    },
    {
      lvl: "lvl3",
      q: "Ubuntu সার্ভারে автоматизирован সিকিউরিটি প্যাচিং (`unattended-upgrades`) কীভাবে জিরো-ডাউনটাইমে কনফিগার করবে?",
      m: "লিনাক্স কার্নেল ও প্যাকেজগুলোতে নিয়মিত সিকিউরিটি ভালনারেবিলিটি বের হয়। ম্যানুয়ালি প্রতিদিন সার্ভার আপডেট করা অসম্ভব। আমরা `unattended-upgrades` প্যাকেজ কনফিগার করি যা প্রতিদিন মধ্যরাতে স্বয়ংক্রিয়ভাবে ক্রিটিক্যাল সিকিউরিটি প্যাচগুলো ডাউনলোড ও ইনস্টল করে। এটি সাধারণ অ্যাপ্লিকেশন প্যাকেজ হাত দেয় না, শুধুমাত্র সিকিউরিটি আপডেটগুলো অ্যাপ্লাই করে। প্রয়োজনে কার্নেল আপডেটের জন্য অটো-রিবুট শিডিউল রাত ৪টায় সেট করা যায় (`Automatic-Reboot-Time \"04:00\"`) যাতে ব্যবসায়িক ট্রাফিকে কোনো বিঘ্ন না ঘটে।",
      b: "unattended-upgrades প্রতিদিন মধ্যরাতে স্বয়ংক্রিয়ভাবে ক্রিটিক্যাল সিকিউরিটি প্যাচ ইনস্টল করে সার্ভারকে সুরক্ষিত রাখে। এটি সার্ভিস ব্যাহত না করে শুধুমাত্র নিরাপত্তার ঝুঁকিগুলো দূর করে।",
      e: "unattended-upgrades automates the unattended installation of critical security patches from official Ubuntu repositories. Restricting upgrades strictly to security releases mitigates instability while eliminating zero-day OS vulnerabilities.",
      code: "sudo apt install unattended-upgrades\nsudo dpkg-reconfigure --priority=low unattended-upgrades"
    },
    {
      lvl: "lvl3",
      q: "লিনাক্স পারফরম্যান্স বোতলনেক ডিটেকশনে 'USE Method' (Utilization, Saturation, Errors) কীভাবে প্রয়োগ করবে?",
      m: "ব্রেন্ডন গ্রেগ-এর 'USE Method' হলো সিস্টেম অ্যানালাইসিসের প্রো-স্ট্যান্ডার্ড: (১) `Utilization`: রিসোর্স কতটা ব্যস্ত (যেমন `top`, `vmstat`, `iostat -xz 1` দিয়ে ডিস্ক ব্যবহার দেখা)। (২) `Saturation`: অতিরিক্ত কাজের চাপে রিসোর্স কিউতে জট পেকেছে কি না (যেমন `uptime`-এর লোড এভারেজ দেখা—সিপিইউ কোরের চেয়ে লোড বেশি কি না, এবং মেমোরির ক্ষেত্রে সোয়াপিং হচ্ছে কি না)। (৩) `Errors`: হার্ডওয়্যার বা নেটওয়ার্ক ডিভাইসে কোনো ড্রপ বা এরর পড়ছে কি না (`dmesg -T`, `netstat -s`, `/var/log/syslog`)। এই মেথড ফলো করলে ৫ মিনিটের মধ্যে যেকোনো সিস্টেম স্লোডাউনের মূল কারণ নিশ্চিত হওয়া যায়।",
      b: "ইউজ মেথডে তিনটি জিনিস পরীক্ষা করা হয়: ইউটিলাইজেশন (রিসোর্স কতটা ব্যবহৃত), স্যাচুরেশন (কাজের কিউ জমে জ্যাম হয়েছে কিনা), এবং এররস (সিস্টেমে কোনো ফল্ট লগ আছে কিনা)। এটি দ্রুততম সময়ে সার্ভার সমস্যা চিহ্নিত করে।",
      e: "Brendan Gregg's USE Method audits system hardware bottlenecks: Utilization (percentage of time resource was busy via iostat, top), Saturation (queue depth of pending work via load averages, vmstat), and Errors (hardware/packet fault logs via dmesg, netstat).",
      tip: "বলো: 'We follow Brendan Gregg's USE Method to methodically isolate Utilization, Saturation, and Errors.'"
    },

    // --- SITUATION BASED (5 Questions) ---
    {
      lvl: "situation",
      q: "পরিস্থিতি: প্রোডাকশন উবুন্টু সার্ভারের ডিস্ক স্পেস ১০০% ফুল হয়ে গেছে! কোনো এডিটর (`nano`) বা ফাইল ওপেন হচ্ছে না, ডেটাবেজ ক্র্যাশ করেছে। তাৎক্ষণিকভাবে সার্ভার রিকভার করার ধাপগুলো কী?",
      m: "ইমার্জেন্সি রেসকিউ স্টেপস: (১) কোনো নতুন ফাইল তৈরি করার চেষ্টা করা যাবে না কারণ ডিস্ক ০ বাইট। (২) বড় সাইজের লগ ফাইল খুঁজে বের করতে হবে: `sudo find /var/log -type f -size +500M`। (৩) ফাইল সরাসরি `rm` দিয়ে ডিলিট করা যাবে না যদি কোনো প্রসেস ফাইলটি ওপেন রাখে (কারণ লিনাক্সে ওপেন ফাইল ডিলিট করলেও ডিস্ক স্পেস রিলিজ হয় না)! এর বদলে ফাইল ট্রাঙ্কেট (শূন্য) করতে হবে: `sudo truncate -s 0 /var/log/nginx/access.log` বা `> /var/log/syslog`। (৪) সাথে সাথে গিগাবাইট ফাঁকা হবে; তখন ক্র্যাশ করা সার্ভিসগুলো রিস্টার্ট করে পার্মানেন্ট লগরোটেট কনফিগার করব।",
      b: "ডিস্ক ১০০% ফুল হলে ফাইল ডিলিট না করে truncate -s 0 কমান্ড দিয়ে বড় লগ ফাইলের সাইজ শূন্য করে তাৎক্ষণিক ডিস্ক ফাঁকা করতে হবে। এরপর সার্ভিস রিস্টার্ট দিয়ে স্থায়ীভাবে লগরোটেট ঠিক করতে হবে।",
      e: "Do not simply rm large files held open by running processes, as Linux retains disk blocks until the file descriptor closes. Identify runaway logs using find /var/log -size +500M and zero them instantly using truncate -s 0 /path/to/log. Reclaim disk space and restart failed services.",
      code: "sudo find /var/log -type f -size +100M\nsudo truncate -s 0 /var/log/syslog\nsudo systemctl restart postgresql"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: একজন জুনিয়র ডেভেলপার সার্ভারে কাজ করতে গিয়ে ভুলবশত `chmod -R 777 /var/www` চালিয়ে দিয়েছে! কেন এটি মারাত্মক সিকিউরিটি ঝুঁকি এবং কীভাবে সঠিক পারমিশনে ফিরিয়ে আনবে?",
      m: "মারাত্মক ঝুঁকি: ৭77 পারমিশন দেওয়ার মানে হলো ইন্টারনেটের যেকোনো সাধারণ ইউজার বা আপলোড করা ম্যালিশিয়াস পিএইচপি/জেএস স্ক্রিপ্ট আপনার `.env` ফাইলের ডাটাবেজ পাসওয়ার্ড পড়ে ফেলতে পারবে এবং এক্সিকিউট করতে পারবে! পুনরুদ্ধার: (১) সমস্ত ডিরেক্টরিকে 755 পারমিশন দিতে হবে: `find /var/www -type d -exec chmod 755 {} +`, (২) সমস্ত ফাইলকে 644 পারমিশন দিতে হবে: `find /var/www -type f -exec chmod 644 {} +`, (৩) অতি সংবেদনশীল `.env` ফাইলকে কঠোর 600 পারমিশন দিতে হবে: `chmod 600 /var/www/dokani/.env` (যাতে শুধু ফাইলের মালিক ছাড়া কেউ পড়তে না পারে)।",
      b: "৭৭৭ দিলে যেকোনো হ্যাকার .env ফাইলের সিক্রেট পড়ে ফেলতে পারে। find কমান্ড দিয়ে ডিরেক্টরিগুলোকে ৭৫৫, সাধারণ ফাইলগুলোকে ৬৪৪ এবং .env ফাইলকে কঠোর ৬০০ পারমিশন দিয়ে নিরাপদ অবস্থায় ফিরিয়ে আনতে হবে।",
      e: "chmod 777 exposes environmental secrets to world-readable execution. Remediate immediately by recursively batch-resetting directories to 755, standard files to 644, and locking the sensitive .env strictly to 600.",
      code: "sudo find /var/www/dokani -type d -exec chmod 755 {} +\nsudo find /var/www/dokani -type f -exec chmod 644 {} +\nsudo chmod 600 /var/www/dokani/.env"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: কোনো অ্যাপ্লিকেশন আপডেট করার পর নোড সার্ভার ক্র্যাশ করেছে এবং পোর্ট ৩০শেকেন্ড ধরে বন্ধ। `systemctl status myapp` দেখাচ্ছে `code=exited, status=1/FAILURE`। আসল এরর স্ট্যাক ট্রেস কোথায় এবং কীভাবে দেখবে?",
      m: "লিনাক্স `systemd` সার্ভিসের সমস্ত আউটপুট ও এরর `journald` লগে সংরক্ষিত হয়। দেখার কমান্ড: `journalctl -u myapp.service -n 100 --no-pager` (সর্বশেষ ১০০ লাইনের লগ পেজার ছাড়া প্রদর্শন করবে)। লাইভ এরর ফলো করার জন্য: `journalctl -u myapp.service -f`। এই লগ থেকে সরাসরি দেখতে পাব সিনট্যাক্স এরর, মিসিং মডিউল বা কোনো এনভায়রনমেন্ট ভ্যারিয়েবলের কারণে অ্যাপ ক্র্যাশ করেছে কি না।",
      b: "systemd সার্ভিসের এরর দেখতে journalctl -u myapp.service -n 100 কমান্ড চালাতে হয়। -f ফ্ল্যাগ দিয়ে লাইভ লগ পর্যবেক্ষণ করে ক্র্যাশের মূল কারণ তাৎক্ষণিকভাবে শনাক্ত করা যায়।",
      e: "Inspect systemd service failure stack traces via journalctl -u myapp.service -n 100 --no-pager. Adding -f streams real-time console stdout/stderr logs, revealing missing environment secrets or uncaught Node.js exceptions.",
      code: "sudo journalctl -u dokani-backend.service -n 100 --no-pager\nsudo journalctl -u dokani-backend.service -f"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: কোনো একটি আননোন প্রসেস সার্ভারের ১০০% সিপিইউ খেয়ে বসে আছে এবং SSH টার্মিনাল চরম ল্যাগ করছে। কীভাবে প্রসেসটি খুঁজে বের করবে এবং সেফলি টার্মিনেট করবে?",
      m: "পদক্ষেপ: (১) টার্মিনালে `top` বা `htop` চালিয়ে `P` (সর্ট বাই সিপিইউ) চাপব অথবা রুট থেকে কমান্ড দেব: `ps aux --sort=-%cpu | head -n 5`—যা টপ সিপিইউ ব্যবহারকারী প্রসেসের নাম, ইউজার ও PID দেখিয়ে দেবে। (২) প্রথমে প্রসেসটিকে ভদ্রভাবে বন্ধ করার জন্য SIGTERM পাঠাব: `kill -15 <PID>` (যাতে প্রসেসটি নিজের ফাইল ও সকেট ক্লিন করতে পারে)। (৩) যদি ৫ সেকেন্ডেও প্রসেসটি রেসপন্স না করে, তবে ফোর্সফুল কিল করব: `kill -9 <PID>`। এরপর প্রসেসের বাইনারি পাথ পরীক্ষা করব এটি কোনো ম্যালওয়্যার বা ক্রিপ্টো-মাইনার কি না।",
      b: "ps aux --sort=-%cpu চালিয়ে শীর্ষ প্রসেসের PID বের করব। kill -15 দিয়ে প্রসেসটি ভদ্রভাবে রিলিজ করার চেষ্টা করব এবং ব্যর্থ হলে kill -9 দিয়ে তাৎক্ষণিক বন্ধ করব।",
      e: "Identify the runaway process using ps aux --sort=-%cpu | head -n 5. Issue a graceful SIGTERM (kill -15 <PID>) allowing file handle cleanup. If unresponsive, issue SIGKILL (kill -9 <PID>) and inspect the executable path via ls -l /proc/<PID>/exe to audit for cryptomining malware.",
      code: "ps aux --sort=-%cpu | head -n 6\nsudo kill -15 <PID>\n# If still stuck:\nsudo kill -9 <PID>"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: তুমি নতুন একটি ক্লাউড VPS সেটআপ করছ এবং ভুলে SSH পোর্ট পরিবর্তন করার পর ফায়ারওয়াল অন করায় নিজের SSH সেশন ডিসকানেক্ট হয়ে গেছে এবং নতুন করে লগইন করা যাচ্ছে না! কীভাবে রিকভার করবে?",
      m: "সমস্যা: নতুন SSH পোর্ট UFW ফায়ারওয়ালে এলাউ না করেই ফায়ারওয়াল অন করা হয়েছে। রিকভারি: (১) ক্লাউড প্রোভাইডারের ড্যাশবোর্ডে (DigitalOcean / Hetzner / AWS) লগইন করব। (২) ড্যাশবোর্ডের ওয়েব-বেসড 'VNC Console' বা 'Recovery Web Terminal'-এ ঢুকব (কারণ VNC কনসোল নেটওয়ার্ক ফায়ারওয়াল বাইপাস করে সরাসরি হার্ডওয়্যার সকেটে এক্সেস দেয়)। (৩) কনসোলে রুট ইউজার ও পাসওয়ার্ড দিয়ে লগইন করে ফায়ারওয়ালে পোর্ট ওপেন করব: `ufw allow <NEW_PORT>/tcp` অথবা `ufw reload` চালাব। সাথে সাথে লোকাল টার্মিনাল থেকে SSH পুনরায় কানেক্ট করা যাবে।",
      b: "ক্লাউড ড্যাশবোর্ডের VNC Web Console-এ ঢুকে সরাসরি হার্ডওয়্যার সকেট থেকে লগইন করব। এরপর ufw allow <port> কমান্ড দিয়ে ফায়ারওয়ালে পোর্ট এলাউ করলেই SSH আবার চালু হবে।",
      e: "Bypassing a firewall lockout requires accessing the cloud hosting provider's browser-based VNC Emergency Console (DigitalOcean Console / AWS serial console). Authenticate directly at the kernel console and execute sudo ufw allow <NEW_PORT>/tcp.",
      tip: "ইন্টারভিউতে 'Access the out-of-band VNC Web Console from the Cloud Provider dashboard' উল্লেখ করবে।"
    },

    // --- REAL WORLD (5 Questions) ---
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা (Dokani SaaS): Dokani-র প্রোডাকশন উবুন্টু VPS সার্ভারের ইনিশিয়াল হার্ডেনিং ও প্রোডাকশন প্রিপারেশন কীভাবে সম্পন্ন করা হয়েছিল?",
      m: "দোকানির ক্লাউড ড্রপলেটে একটি কঠোর প্রোডাকশন হার্ডেনিং রানবুক অনুসরণ করা হয়েছে: (১) `deployer` নামে ডেডিকেটেড নন-রুট সুডো ইউজার তৈরি ও এড২৫৫১৯ SSH কি ইনজেক্ট করা, (২) SSH কনফিগে `PermitRootLogin no` এবং `PasswordAuthentication no` বাধ্য করা, (৩) UFW দিয়ে শুধু ২২, ৮০ ও ৪৪৩ পোর্ট বাদে অভ্যন্তরীণ সব ডাটাবেজ পোর্ট বন্ধ করা, (৪) ৪GB Swap ফাইল তৈরি করে OOM ক্র্যাশ প্রতিরোধ করা, (৫) Fail2ban দিয়ে SSH ও ওয়েব লেয়ারে ব্রুট-ফোর্স প্রটেকশন দেওয়া, এবং (৬) logrotate দিয়ে লগ ড্রাইভ ক্লিন রাখা। এর ফলে সার্ভারটি সম্পূর্ণ স্থিতিশীল ও হ্যাকার-প্রতিরোধী হয়েছে।",
      b: "দোকানি সার্ভার হার্ডেনিংয়ে নন-রুট সুডো ইউজার, এসএসএইচ কি অথেনটিকেশন, রুট লগইন ব্লক, UFW ফায়ারওয়াল, ৪GB সোয়াপ ফাইল, Fail2ban এবং লগরোটেট কনফিগার করে এন্টারপ্রাইজ নিরাপত্তা নিশ্চিত করা হয়েছিল।",
      e: "Dokani production Ubuntu droplets undergo systematic hardening: provisioning dedicated non-root sudo accounts, enforcing Ed25519 SSH keys while disabling password/root logins, locking UFW down to 22/80/443, activating 4GB swap files, standing up Fail2ban jails, and scheduling automated logrotate rules.",
      tip: "দোকানির এই প্রোডাকশন সার্ভার হার্ডেনিং চেকলিস্ট ইন্টারভিউয়ারকে তোমার বাস্তব ডেভঅপস সক্ষমতা প্রমাণ করে দেবে।"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: জিরো-ডাউনটাইম ডিপ্লয়মেন্টের জন্য ব্যাশ অটোমেশন স্ক্রিপ্ট (`deploy.sh`) কীভাবে তৈরি করবে?",
      m: "একটি প্রোডাকশন ব্যাশ ডিপ্লয় স্ক্রিপ্টে `set -e` (কোনো কমান্ড ফেইল করলে তৎক্ষণাৎ স্ক্রিপ্ট বন্ধ করা) ব্যবহার করা হয়। ধাপসমূহ: (১) গিটহাব থেকে লেটেস্ট কোড পুল করা (`git pull origin main`), (২) নতুন প্যাকেজ ইনস্টল করা (`npm ci`), (৩) ডেটাবেজ মাইগ্রেশন চালানো (`npx prisma migrate deploy`), (৪) প্রোডাকশন বিল্ড তৈরি করা (`npm run build`), (৫) PM2 বা systemd দিয়ে জিরো-ডাউনটাইম রিলোড দেওয়া (`pm2 reload all`), (৬) সফল ডিপ্লয়মেন্টের পর স্ল্যাক বা টেলিগ্রামে নোটিফিকেশন পাঠানো।",
      b: "deploy.sh স্ক্রিপ্টে git pull, npm ci, prisma migrate deploy, npm run build এবং pm2 reload all ক্রমানুসারে স্বয়ংক্রিয়ভাবে এক্সিকিউট করা হয়। set -e ফ্ল্যাগ দিয়ে যেকোনো ত্রুটিতে ডিপ্লয়মেন্ট নিরাপদভাবে থামানো হয়।",
      e: "A zero-downtime deploy.sh script runs with set -e to halt on first error: pulling Git main, installing dependencies with npm ci, deploying database migrations, executing production builds, and invoking zero-downtime process reloads via pm2 reload all.",
      code: "#!/usr/bin/env bash\nset -euo pipefail\ncd /var/www/dokani\ngit pull origin main\nnpm ci\nnpx prisma migrate deploy\nnpm run build\npm2 reload ecosystem.config.js --update-env\necho 'Deploy successful!'"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: Linux Bash Shell স্ক্রিপ্টিং দিয়ে অটোমেটেড ডেটাবেজ ব্যাকআপ ও S3 আপলোড পাইপলাইন কীভাবে তৈরি করবে?",
      m: "আমরা একটি ক্রন-এক্সিকিউটেড ব্যাশ স্ক্রিপ্ট তৈরি করি: (১) টাইমস্ট্যাম্পযুক্ত ফাইলের নাম তৈরি করি (`BACKUP_NAME=\"dokani_$(date +%Y%m%d_%H%M%S).dump\"`), (২) `pg_dump -Fc` দিয়ে কম্প্রেসড বাইনারি ডাম্প তৈরি করি, (৩) AWS CLI দিয়ে ফাইলটি এস৩ বাকেটে আপলোড করি (`aws s3 cp ...`), (৪) আপলোড সফল হলে লোকাল সার্ভার থেকে সাময়িক ডাম্প ফাইল মুছে দিই, (৫) এস৩ লাইফসাইকেল রুলসে ৩০ দিনের পুরনো ব্যাকআপ স্বয়ংক্রিয়ভাবে মুছে দেওয়ার পলিসি রাখি। কোনো কারণে স্ক্রিপ্ট ফেইল করলে স্ল্যাক ওয়েবহুকে এলার্ট যায়।",
      b: "ব্যাশ স্ক্রিপ্ট দিয়ে টাইমস্ট্যাম্পযুক্ত pg_dump তৈরি করে AWS S3-তে পুশ করা হয় এবং লোকাল ফাইল ডিলিট করে ডিস্ক ফাঁকা রাখা হয়। স্ক্রিপ্ট ব্যর্থ হলে স্ল্যাকে তাৎক্ষণিক নোটিফিকেশন পাঠানো হয়।",
      e: "Automated backup scripts generate timestamped pg_dump binaries, stream payloads to AWS S3 via aws-cli, purge transient local artifacts, and ping an uptime heartbeat monitor to verify daily completion.",
      code: "#!/bin/bash\nTIMESTAMP=$(date +%Y%m%d_%H%M%S)\nFILE=\"/tmp/db_${TIMESTAMP}.dump\"\npg_dump -Fc -U postgres dokani_prod > \"$FILE\"\naws s3 cp \"$FILE\" s3://dokani-vault/backups/\nrm -f \"$FILE\""
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: প্রোডাকশন ডেটাবেজ বা সার্ভার স্টোরেজে 'Inodes Exhaustion' কী এবং কীভাবে সমাধান করবে?",
      m: "লিনাক্সে প্রতিটি ফাইল বা ডিরেক্টরির জন্য একটি 'Inode' (মেটাডেটা পয়েন্টার) থাকে। আপনি `df -h` দিয়ে দেখলেন ডিস্কে ২০GB ফাঁকা আছে, কিন্তু অ্যাপ নতুন কোনো ফাইল বা সেশন লিখতে পারছে না এবং `No space left on device` এরর দিচ্ছে! কারণ: ইনোড শেষ হয়ে গেছে (`df -i` দেখাচ্ছে Inodes 100%)! এটি ঘটে যখন লাখ লাখ ক্ষুদ্র ফাইল (যেমন ফ্রেমওয়ার্কের আন-ক্লিনড সেশন ফাইল বা ক্যাশ ডিরেক্টরি) তৈরি হয়। সমাধান: `sudo find /tmp -type f -name 'sess_*' -delete` কমান্ড চালিয়ে অপ্রয়োজনীয় লাখ লাখ ক্ষুদ্র ফাইল ব্যাচ আকারে মুছে ইনোড রিলিজ করা।",
      b: "ডিস্কে জায়গা থাকা সত্ত্বেও লক্ষ লক্ষ ক্ষুদ্র ক্যাশ বা সেশন ফাইল জমার কারণে ইনোড পূর্ণ (df -i 100%) হয়ে সিস্টেম আটকে যায়। অপ্রয়োজনীয় টেম্পোরারি ফাইলগুলো মুছে ইনোড ফাঁকা করে সিস্টেম উদ্ধার করা হয়।",
      e: "Inode exhaustion occurs when millions of micro-files (e.g. uncollected PHP/Node session files) consume all filesystem metadata index nodes even though gigabytes of storage remain. Diagnose with df -i and purge orphaned temp files via find /tmp -type f -delete.",
      code: "df -i # Check inode usage\n# Find directories hoarding millions of files:\nfind / -xdev -printf '%h\\n' | sort | uniq -c | sort -k 1 -n | tail -10"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: লিনাক্স সার্ভার মাইগ্রেশন: সম্পূর্ণ ডেটা ও কনফিগারেশন এক VPS থেকে অন্য VPS-এ স্থানান্তর করতে `rsync` কীভাবে ব্যবহার করবে?",
      m: "`rsync` হলো লিনাক্সে ডেটা স্থানান্তরের সবচেয়ে নির্ভরযোগ্য ও দ্রুততম টুল। সুবিধা: এটি শুধুমাত্র ফাইল কপি করে না, বরং পারমিশন, ওনারশিপ, টাইমস্ট্যাম্প ও সিম্বলিক লিঙ্ক হুবহু বজায় রাখে এবং মাঝে কানেকশন কাটলে বাকি অংশ থেকে পুনরায় শুরু করতে পারে। কমান্ড: `rsync -avzP --exclude 'node_modules' /var/www/dokani deployer@new-server-ip:/var/www/dokani` (`-a`: আর্কাইভ মোড পারমিশন সহ, `-v`: বিস্তারিত লগ, `-z`: নেটওয়ার্ক কম্প্রেশন, `-P`: প্রোগ্রেস বার ও রেজুমেবিলিটি)। মাত্র কয়েক মিনিটে গিগাবাইট ডেটা নিখুঁতভাবে নতুন সার্ভারে কপি হয়ে যায়।",
      b: "rsync দিয়ে এক সার্ভার থেকে অন্য সার্ভারে হুবহু পারমিশন ও সিম্বলিক লিঙ্ক বজায় রেখে অতি দ্রুত ডেটা কপি করা যায়। নেটওয়ার্ক কম্প্রেশন ও অটো-রেজ্যুম সুবিধার কারণে এটি সার্ভার মাইগ্রেশনের সেরা টুল।",
      e: "rsync migrates file trees between servers while preserving permissions, symlinks, and timestamps. Use rsync -avzP --exclude 'node_modules' /src/ user@new-host:/dest/ for delta transfers with on-the-fly network compression and interrupted transfer resume.",
      code: "rsync -avzP --exclude 'node_modules' --exclude '.git' \\\n  /var/www/dokani/ deployer@192.168.1.50:/var/www/dokani/"
    }
  ]
};
