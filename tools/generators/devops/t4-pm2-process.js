// Topic 4: PM2 Process Management & Cluster Mode (25 Questions: 5 lvl1, 5 lvl2, 5 lvl3, 5 situation, 5 realworld)
module.exports = {
  id: "pm2-process-management",
  name: "PM2 Process Management & Cluster Architecture",
  desc: "ecosystem.config.js, Cluster Mode vs Fork Mode, Zero-Downtime Reload, Memory Limits, PM2 Startup, Log Rotation, Graceful IPC",
  items: [
    // --- LEVEL 1 (5 Questions) ---
    {
      lvl: "lvl1",
      q: "PM2 কী এবং প্রোডাকশনে সরাসরি `node server.js` বা `npm start` চালানো কেন মারাত্মক ক্ষতিকর?",
      m: "সরাসরি `node server.js` কমান্ড চালালে নোড প্রসেসটি ইউজারের বর্তমান SSH টার্মিনাল সেশনের সাথে সংযুক্ত থাকে। টার্মিনাল ক্লোজ করার সাথে সাথে সার্ভার বন্ধ হয়ে যাবে! এছাড়া অ্যাপ্লিকেশনে কোনো একটি আনক্যাচড এরর (`Unhandled Rejection` বা `uncaughtException`) ঘটলে পুরো নোড সার্ভার ক্র্যাশ করে অফলাইন হয়ে বসে থাকবে—নিজে থেকে কখনো রিস্টার্ট হবে না। PM2 (Process Manager 2) হলো একটি প্রোডাকশন প্রসেস ম্যানেজার যা ব্যাকগ্রাউন্ডে সার্বক্ষণিক ডেমন হিসেবে অ্যাপ চালায়, অ্যাপ ক্র্যাশ করলে ১ মিলিসেকেন্ডে অটো-রিস্টার্ট করে, সার্ভার রিবুট হলে অটো-বুট করায় এবং মাল্টি-কোর সিপিইউ ইউটিলাইজেশনের জন্য ক্লাস্টার মোড সরবরাহ করে।",
      b: "টার্মিনাল বন্ধ করলে node server.js বন্ধ হয়ে যায় এবং কোনো এরর হলে অ্যাপ ক্র্যাশ করে স্থায়ীভাবে ডাউন থাকে। PM2 ব্যাকগ্রাউন্ডে ডেমন হিসেবে অ্যাপ সচল রাখে, কোনো ক্র্যাশে সাথে সাথে অটো-রিস্টার্ট করে এবং সিপিইউ-এর পূর্ণ ব্যবহার নিশ্চিত করে।",
      e: "Running raw node server.js binds execution to the active SSH session; closing the terminal or hitting an unhandled exception terminates the application permanently. PM2 acts as an enterprise process supervisor daemon that automatically restarts crashed instances in milliseconds, enables multi-core clustering, and persists across OS reboots.",
      tip: "বলো: 'PM2 ensures continuous daemon supervision, sub-millisecond crash recovery, and multi-core cluster scaling.'"
    },
    {
      lvl: "lvl1",
      q: "PM2-তে `pm2 restart` এবং `pm2 reload`-এর মধ্যে পার্থক্য কী এবং ডিপ্লয়মেন্টে কোনটি ব্যবহার করা উচিত?",
      m: "মারাত্মক আর্কিটেকচারাল পার্থক্য: (১) `pm2 restart`: সব রানিং প্রসেসকে এক সেকেন্ডে কিল করে তারপর নতুন প্রসেস চালু করে। এই মাঝখানের ২-৫ সেকেন্ড পুরো অ্যাপ ডাউন থাকে এবং চলমান ক্লায়েন্টদের কানেকশন ড্রপ করে। (২) `pm2 reload` (Zero-Downtime Reload): এটি একটি একটি করে প্রসেস রিলোড করে! ক্লাস্টার মোডে সে প্রথমে প্রসেস ১-কে রিলোড করে অপেক্ষা করে; প্রসেস ১ রেডি হলে ট্রাফিক সেখানে পাঠায় এবং তারপর প্রসেস ২-কে রিলোড করে। ফলে কোনো গ্রাহক ১ মিলিসেকেন্ডের জন্যও কোনো ড্রপ বা ডাউনটাইম পায় না। প্রোডাকশন ডিপ্লয়মেন্টে সবসময় `pm2 reload` ব্যবহার করতে হবে।",
      b: "pm2 restart সব প্রসেস একসাথে বন্ধ করে চালু করায় কিছু সময় সাইট ডাউন থাকে। pm2 reload একটি একটি করে প্রসেস রিলোড করে, ফলে কোনো কানেকশন ড্রপ ছাড়া জিরো-ডাউনটাইমে নতুন কোড কার্যকর হয়।",
      e: "pm2 restart terminates all running worker processes concurrently, creating a brief downtime window where in-flight connections fail. pm2 reload achieves true Zero-Downtime: it restarts cluster workers sequentially (rolling reload), maintaining service availability continuously throughout the release.",
      code: "# Always reload in production CI/CD:\npm2 reload ecosystem.config.js --update-env"
    },
    {
      lvl: "lvl1",
      q: "PM2 Cluster Mode কী এবং Node.js-এর সিঙ্গেল-থ্রেডেড সীমাবদ্ধতা এটি কীভাবে সমাধান করে?",
      m: "Node.js ডিফল্টভাবে সিঙ্গেল-থ্রেডেড—অর্থাৎ আপনার ক্লাউড VPS-এ ৪টি বা ৮টি সিপিইউ কোর থাকলেও একটি নোড প্রসেস মাত্র ১টি কোর ব্যবহার করতে পারে, বাকি ৩-৭টি কোর অলস বসে থাকে! PM2 Cluster Mode নোডের নেটিভ `cluster` মডিউল ব্যবহার করে সার্ভারের প্রতিটি সিপিইউ কোরের জন্য একটি করে স্বাধীন নোড চাইল্ড প্রসেস স্পন করে এবং একই পোর্টে ইনকামিং ট্রাফিক ইন্টারনালি রাউন্ড-রবিন ব্যালেন্সে ভাগ করে দেয়। ফলে সার্ভারের থ্রুপুট ৪ গুণ থেকে ৮ গুণ বৃদ্ধি পায় কোনো কোড পরিবর্তন ছাড়াই।",
      b: "নোড সিঙ্গেল থ্রেডেড হওয়ায় সাধারণ অবস্থায় মাত্র একটি সিপিইউ কোর ব্যবহার করে। PM2 ক্লাস্টার মোড প্রতিটি কোরের জন্য আলাদা প্রসেস তৈরি করে একই পোর্টে ট্রাফিক ভাগ করে দেয়, ফলে সার্ভারের কর্মক্ষমতা বহুগুণ বাড়ে।",
      e: "Because Node.js runs on a single thread, a default process leaves multi-core hardware largely idle. PM2 Cluster Mode spawns child worker instances matching available CPU cores, sharing the target HTTP port and distributing traffic seamlessly to scale throughput linear to physical cores.",
      code: "pm2 start dist/server.js -i max --name dokani-api"
    },
    {
      lvl: "lvl1",
      q: "সার্ভার রিবুট বা পাওয়ার রিস্টার্টের পর PM2 অ্যাপগুলো যেন স্বয়ংক্রিয়ভাবে চালু হয় তার জন্য কী কী কমান্ড চালাতে হয়?",
      m: "দুটি গোল্ডেন কমান্ড: (১) `pm2 startup`: এই কমান্ডটি রান করলে PM2 সিস্টেমের ওএস সনাক্ত করে (systemd / upstart) এবং টার্মিনালে একটি স্পেসিফিক `sudo env PATH=...` কমান্ড প্রিন্ট করে। সেই কমান্ডটি কপি করে টার্মিনালে এন্টার মারলে systemd-তে একটি স্থায়ী PM2 বুট সার্ভিস রেজিস্টার হয়। (২) `pm2 save`: বর্তমান রানিং সব প্রসেসের স্টেট, নাম ও এনভায়রনমেন্ট মেমোরি থেকে একটি ফাইলে (`~/.pm2/dump.pm2`) সেভ করে রাখে। এরপর সার্ভার রিবুট হওয়া মাত্রই systemd পিএম২-কে কল করে এবং পিএম২ সেভ করা সব অ্যাপ স্বয়ংক্রিয়ভাবে বুট করে দেয়।",
      b: "pm2 startup চালিয়ে আউটপুটের সুডো কমান্ডটি এক্সিকিউট করতে হয় এবং pm2 save দিয়ে বর্তমান প্রসেস তালিকা সেভ করতে হয়। এর ফলে সার্ভার রিস্টার্ট হলেও সব অ্যাপ নিজে নিজে চালু হয়ে যায়।",
      e: "Generate and register system boot scripts via pm2 startup. Execute the generated sudo command to hook PM2 into the systemd initialization lifecycle. Then run pm2 save to freeze the active process snapshot to ~/.pm2/dump.pm2 for automatic post-reboot recovery.",
      code: "pm2 startup\n# Copy-paste the generated sudo command, then:\npm2 save"
    },
    {
      lvl: "lvl1",
      q: "PM2 দিয়ে লাইভ লগ পর্যবেক্ষণ ও ট্রাবলশুটিং করার কমান্ডগুলো কী?",
      m: "(১) `pm2 logs`: সমস্ত অ্যাপ্লিকেশনের লাইভ কনসোল আউটপুট (`console.log`) ও এরর স্ট্রিম রিয়েলটাইমে টার্মিনালে দেখায়। (২) `pm2 logs dokani-api --lines 100`: নির্দিষ্ট অ্যাপের সর্বশেষ ১০০ লাইনের লগ দেখায়। (৩) `pm2 monit`: একটি সুন্দর টার্মিনাল ড্যাশবোর্ড খোলে যেখানে প্রতি প্রসেসের লাইভ CPU ব্যবহার, মেমোরি এবং ইভেন্ট লুপ পর্যবেক্ষণ করা যায়। (৪) `pm2 flush`: পুরনো জমে থাকা সব লগ ফাইল মুহূর্তে খালি করে ডিস্ক স্পেস রিলিজ করে।",
      b: "pm2 logs দিয়ে লাইভ এরর ও কনসোল লগ দেখা যায়, pm2 monit দিয়ে সিপিইউ ও র‍্যাম মনিটর করা যায় এবং pm2 flush দিয়ে পুরনো লগ মুছে ডিস্ক খালি করা যায়।",
      e: "Inspect unified real-time application stdout and stderr logs via pm2 logs. Target specific applications using pm2 logs <app-name> --lines 100. Open the interactive terminal CPU/RAM dashboard via pm2 monit, and purge accumulated disk log files via pm2 flush.",
      code: "pm2 logs dokani-api --err --lines 50\npm2 monit\npm2 flush"
    },

    // --- LEVEL 2 (5 Questions) ---
    {
      lvl: "lvl2",
      q: "PM2 `ecosystem.config.js` ফাইলের মূল স্ট্রাকচার কী এবং এতে কী কী প্রোপার্টি ডিফাইন করা হয়?",
      m: "`ecosystem.config.js` হলো PM2-এর প্রোডাকশন কনফিগারেশন ব্লুপ্রিন্ট। এতে `apps` অ্যারের ভেতরে প্রতিটি সার্ভিসের নিয়ম লেখা হয়: `name` (অ্যাপের নাম), `script` (শুরুর ফাইল যেমন `dist/server.js`), `instances: 'max'` (সব কোরে ক্লাস্টার চালানো), `exec_mode: 'cluster'`, `autorestart: true` (ক্র্যাশে অটো রিস্টার্ট), `max_memory_restart: '1G'` (মেমোরি লিকে রিস্টার্ট), `env` (ডিফল্ট এনভায়রনমেন্ট), `env_production` (প্রোডাকশন এনভায়রনমেন্ট ভ্যারিয়েবল), এবং লগ ফাইলের পাথ (`error_file`, `out_file`)। এটি ভার্সন কন্ট্রোলে সেভ রেখে ডিপ্লয়মেন্ট ১০০% প্রেডিক্টেবল করা হয়।",
      b: "ecosystem.config.js ফাইলে অ্যাপের নাম, স্ক্রিপ্ট পাথ, ক্লাস্টার মোড, মেমোরি লিমিট এবং এনভায়রনমেন্ট ভ্যারিয়েবল সুন্দরভাবে সাজিয়ে রাখা হয় যা ডিপ্লয়মেন্ট সহজ ও নির্ভুল করে।",
      e: "An ecosystem.config.js declaratively dictates deployment architectures: name, entry script, exec_mode: 'cluster', instances: 'max', auto-restart policies, max_memory_restart thresholds, dedicated log file routes, and isolated environment configurations (env_production).",
      code: "module.exports = {\n  apps: [{\n    name: 'dokani-api',\n    script: './dist/server.js',\n    instances: 'max',\n    exec_mode: 'cluster',\n    autorestart: true,\n    max_memory_restart: '800M',\n    env_production: {\n      NODE_ENV: 'production',\n      PORT: 5000\n    }\n  }]\n};"
    },
    {
      lvl: "lvl2",
      q: "PM2-তে `max_memory_restart` প্রোপার্টির গুরুত্ব কী এবং মেমোরি লিক থেকে সার্ভার বাঁচাতে এটি কীভাবে সাহায্য করে?",
      m: "Node.js অ্যাপ্লিকেশনে কোনো লাইব্রেরি বা কোডের ভুলের কারণে মেমোরি লিক (Memory Leak) থাকলে র‍্যামের ব্যবহার ধীরে ধীরে বাড়তে থাকে (যেমন ২০০MB থেকে বাড়তে বাড়তে ১.৮GB)। যদি এটি নিয়ন্ত্রণ না করা হয়, তবে পুরো সার্ভারের ফিজিক্যাল র‍্যাম শেষ হয়ে ডাটাবেজ সহ সম্পূর্ণ সার্ভার ক্র্যাশ করবে! `max_memory_restart: '800M'` কনফিগার করলে PM2 সার্বক্ষণিক প্রসেসটির র‍্যাম পর্যবেক্ষণ করে। যখনই র‍্যাম ৮০০MB ছাড়িয়ে যাবে, PM2 অতি সাবলীলভাবে ওই নির্দিষ্ট প্রসেসটিকে রিলোড করে মেমোরি ফ্রেশ করে দেবে—অন্যান্য প্রসেসগুলো ট্রাফিক হ্যান্ডেল করতে থাকবে এবং সার্ভার ক্র্যাশ হওয়া থেকে শতভাগ বেঁচে যাবে।",
      b: "মেমোরি লিকের কারণে অ্যাপের র‍্যাম অস্বাভাবিক বেড়ে পুরো সার্ভার ডাউন হতে পারে। max_memory_restart নির্দিষ্ট সীমা (যেমন 800M) পার হলেই প্রসেসটিকে রিলোড করে মেমোরি পরিষ্কার করে দেয়।",
      e: "Memory leaks progressively consume system RAM until triggering kernel OOM terminations. Setting max_memory_restart: '800M' instructs PM2 to monitor heap footprints; once an instance breaches this ceiling, PM2 gracefully cycles that specific worker without destabilizing sibling cluster instances.",
      code: "max_memory_restart: '800M'"
    },
    {
      lvl: "lvl2",
      q: "PM2-তে `exp_backoff_restart_delay` কী এবং রিস্টার্ট লুপ (Flapping / Restart Storm) কীভাবে প্রতিরোধ করে?",
      m: "যদি কোনো মারাত্মক বাগ (যেমন ডাটাবেজ পাসওয়ার্ড ভুল হওয়া) থাকে যার কারণে নোড অ্যাপ বুট হওয়ার ১ সেকেন্ডের মধ্যে ক্র্যাশ করে, তবে PM2 সেকেন্ডে শত শত বার অ্যাপ রিস্টার্ট করার চেষ্টা করবে (Restart Storm)। এতে সিপিইউ ১০০% হয়ে পুরো সার্ভার হ্যাং করবে। সমাধান: `exp_backoff_restart_delay: 100` কনফিগার করা। এর ফলে যদি অ্যাপ বারবার ক্র্যাশ করতে থাকে, তবে PM2 প্রতিটি রিস্টার্টের মাঝে এক্সপোনেনশিয়াল বিরতি দেয় (১০০ms, ২০০ms, ৪০০ms, ৮০০ms... সর্বোচ্চ ১৫ সেকেন্ড)। এতে সিপিইউ স্পাইক করা বন্ধ হয় এবং সার্ভার সুস্থ থাকে।",
      b: "ডাটাবেজ ডাউন থাকলে বা মারাত্মক বাগে অ্যাপ বারবার ক্র্যাশ করলে PM2 অবিরাম রিস্টার্ট দিয়ে সিপিইউ হ্যাং করাতে পারে। exp_backoff_restart_delay ক্র্যাশের পর পর রিস্টার্টের মাঝে বিরতি বাড়িয়ে সিপিইউ রক্ষা করে।",
      e: "When fatal bootstrap bugs cause instant process crashes, PM2 enters a tight restart loop ('restart storm') driving 100% CPU spikes. exp_backoff_restart_delay introduces progressive exponential backoff delays between restarts, stabilizing server hardware until developers push fixes.",
      code: "exp_backoff_restart_delay: 100"
    },
    {
      lvl: "lvl2",
      q: "PM2-তে `pm2-logrotate` মডিউল কীভাবে ইনস্টল ও কনফিগার করবে যাতে লগ ড্রাইভ পূর্ণ না হয়?",
      m: "PM2 নিজে থেকে লগ রোটেট করে না, ফলে `.pm2/logs/` ডিরেক্টরি কয়েক মাসে ২০GB হয়ে ডিস্ক ফুল করে দেয়। সমাধান: PM2-এর অফিশিয়াল মডিউল ইনস্টল করা: `pm2 install pm2-logrotate`। কনফিগারেশন: (১) ফাইল সাইজ লিমিট: `pm2 set pm2-logrotate:max_size 50M` (৫০MB হলেই রোটেট হবে), (২) রিটেনশন লিমিট: `pm2 set pm2-logrotate:retain 10` (সর্বোচ্চ ১০টি পুরনো কম্প্রেসড ফাইল রাখবে), (৩) কম্প্রেশন: `pm2 set pm2-logrotate:compress true`। এটি ব্যাকগ্রাউন্ডে স্বয়ংক্রিয়ভাবে চলে এবং ডিস্ক স্পেস আজীবন পরিচ্ছন্ন রাখে।",
      b: "pm2 install pm2-logrotate দিয়ে মডিউলটি ইনস্টল করে max_size 50M এবং compress true কনফিগার করলে লগ ফাইল ৫০MB হলেই স্বয়ংক্রিয়ভাবে জিপ হয়ে রোটেট হয় এবং ডিস্ক ফুল হওয়া রোধ হয়।",
      e: "PM2 logs expand unbounded without supervision. Install the official pm2-logrotate plugin: pm2 install pm2-logrotate. Configure max_size to 50M, retain to 10 historical archives, and compress to true to ensure automatic gzip compression and retention pruning.",
      code: "pm2 install pm2-logrotate\npm2 set pm2-logrotate:max_size 50M\npm2 set pm2-logrotate:retain 10\npm2 set pm2-logrotate:compress true"
    },
    {
      lvl: "lvl2",
      q: "PM2-তে Fork Mode বনাম Cluster Mode-এর মধ্যে কখন কোনটি ব্যবহার করা উচিত?",
      m: "(১) `Cluster Mode`: শুধুমাত্র সেইসব সার্ভিসের জন্য যারা স্টেটলেস HTTP/WebSocket ট্রাফিক হ্যান্ডেল করে (যেমন Express API বা Next.js SSR)। কারণ এখানে মাল্টি-কোর সিপিইউ ইউটিলাইজেশনের জন্য একাধিক প্যারালাল প্রসেস প্রয়োজন। (২) `Fork Mode`: যেকোনো ব্যাকগ্রাউন্ড ক্রন জব, মেসেজ কিউ কনজিউমার (BullMQ / RabbitMQ Worker), বা সিডিউলড টাস্ক সার্ভিসের জন্য `exec_mode: 'fork'` এবং `instances: 1` ব্যবহার করতে হবে! কারণ যদি কিউ কনজিউমার বা ক্রন জবকে ক্লাস্টার মোডে চালানো হয়, তবে প্রতিটি কোরে ক্রন জব ডুপ্লিকেট হয়ে কাস্টমারদের কাছে একই ইমেইল বা চার্জ ৪ বার চলে যাবে!",
      b: "ওয়েব এপিআইতে সিপিইউর পূর্ণ ব্যবহারে Cluster Mode ব্যবহার করতে হয়। আর ব্যাকগ্রাউন্ড ওয়ার্কার বা ক্রন জবে Fork Mode (instances: 1) ব্যবহার করতে হয় যাতে একই কাজ একাধিকবার ডুপ্লিকেট হয়ে না যায়।",
      e: "Employ Cluster Mode for stateless HTTP APIs (Express/Next.js) to saturate multi-core CPUs. Crucially, enforce Fork Mode (instances: 1) for stateful background workers, schedulers, and queue consumers (BullMQ) to prevent redundant duplicate job executions.",
      tip: "বলো: 'Cluster mode for HTTP APIs; Fork mode with 1 instance for queue workers and cron schedulers.'"
    },

    // --- LEVEL 3 (5 Questions) ---
    {
      lvl: "lvl3",
      q: "PM2 Zero-Downtime Reload-এ 'Ready Signal' (`wait_ready: true`) এবং `process.send('ready')` কীভাবে কাজ করে?",
      m: "স্বাভাবিক `pm2 reload`-এ PM2 ধরে নেয় যে নতুন প্রসেস স্পন হওয়ার সাথে সাথেই সে ট্রাফিক নেওয়ার জন্য রেডি। কিন্তু বাস্তব অ্যাপ্লিকেশনে ডেটাবেজ কানেক্ট হতে এবং ক্যাশ ওয়ার্ম-আপ হতে ২-৩ সেকেন্ড সময় লাগে! ফলে পুরনো প্রসেস বন্ধ করে নতুনটিতে ট্রাফিক পাঠালে শুরুর ২ সেকেন্ড ক্লায়েন্টরা এরর খায়। সলিউশন: `wait_ready: true` এবং `listen_timeout: 10000` কনফিগার করা। এবং Node.js কোডে ডেটাবেজ কানেকশন সফলভাবে রেডি হওয়ার পর কল করা: `if (process.send) process.send('ready');`। এর ফলে PM2 ততক্ষণ পর্যন্ত পুরনো প্রসেস বন্ধ করবে না যতক্ষণ না নতুন প্রসেস থেকে স্পষ্ট 'ready' সিগন্যাল আসে। এটি ১০০% ট্রু জিরো-ডাউনটাইম নিশ্চিত করে।",
      b: "অ্যাপ পুরোপুরি ডেটাবেজে কানেক্ট হওয়ার আগে ট্রাফিক আসলে এরর হতে পারে। wait_ready: true দিয়ে নোড কোডে process.send('ready') পাঠালে PM2 নিশ্চিত হয়ে তবেই পুরনো প্রসেস বন্ধ করে এবং নতুনটিতে ট্রাফিক পাঠায়।",
      e: "Without coordination, PM2 routes traffic to newly spawned workers before database connections initialize, dropping early requests. Setting wait_ready: true instructs PM2 to wait until the application boots, connects to dependencies, and explicitly dispatches process.send('ready') via IPC before retiring legacy workers.",
      code: "// server.ts:\napp.listen(PORT, async () => {\n  await prisma.$connect();\n  console.log(`Server listening on ${PORT}`);\n  if (process.send) {\n    process.send('ready'); // Notify PM2 that worker is ready\n  }\n});"
    },
    {
      lvl: "lvl3",
      q: "PM2 Graceful Shutdown-এ `kill_timeout` এবং `SIGINT` হ্যান্ডলিং কীভাবে ইন-ফ্লাইট পেমেন্ট ট্রানজ্যাকশন ড্রপ হওয়া রোধ করে?",
      m: "ডিপ্লয়মেন্টে রিলোড দেওয়ার সময় PM2 পুরনো প্রসেসকে একটি `SIGINT` সিগন্যাল পাঠায়। যদি কোনো হ্যান্ডলার না থাকে, প্রসেসটি সাথে সাথে মারা যায়। আমরা কোডে `process.on('SIGINT', ...)` হ্যান্ডলার বসাই এবং `server.close()` কল করি যাতে সার্ভার নতুন রিকোয়েস্ট নেওয়া বন্ধ করে কিন্তু চলমান ট্রানজ্যাকশনগুলো সম্পন্ন করার সুযোগ পায়। PM2 কনফিগে `kill_timeout: 5000` (৫ সেকেন্ড) সেট করি। এর ফলে PM2 সর্বোচ্চ ৫ সেকেন্ড অপেক্ষা করে প্রসেসটিকে শান্তভাবে শেষ হতে দেয়। কোনো পেমেন্ট বা ইনভয়েস মাঝপথে ড্রপ করে না।",
      b: "SIGINT হ্যান্ডল করে চলমান রিকোয়েস্টগুলো সম্পন্ন হওয়ার জন্য kill_timeout: 5000 কনফিগার করা হয়। ফলে প্রসেস বন্ধ হওয়ার আগে ৫ সেকেন্ড সময় পায় এবং কোনো ক্লায়েন্টের পেমেন্ট মাঝপথে নষ্ট হয় না।",
      e: "During reload, PM2 dispatches SIGINT to legacy workers. Configure kill_timeout: 5000 inside ecosystem.config.js and intercept SIGINT in Node.js to invoke server.close(), allowing in-flight payment queries up to 5 seconds to commit safely before process termination.",
      code: "process.on('SIGINT', async () => {\n  server.close(async () => {\n    await db.$disconnect();\n    process.exit(0);\n  });\n});"
    },
    {
      lvl: "lvl3",
      q: "PM2 Cluster Mode-এ Node.js ইন-মেমোরি স্টেট (Sessions, Socket.io) কেন কাজ করে না এবং Redis Adapter কীভাবে সমাধান করে?",
      m: "যেহেতু ক্লাস্টার মোডে প্রতিটি সিপিইউ কোরে আলাদা স্বাধীন নোড প্রসেস চলে, তাদের মেমোরি স্পেস সম্পূর্ণ আলাদা! আপনি যদি লোকাল মেমোরি ভ্যারিয়েবলে সেশন বা ইউজার ডেটা রাখেন, তবে রিকোয়েস্ট ১ পড়বে প্রসেস A-তে কিন্তু রিকোয়েস্ট ২ চলে যাবে প্রসেস B-তে—ফলে ইউজার হঠাৎ লগআউট হয়ে যাবে! একইভাবে WebSocket (Socket.io)-এ প্রসেস A-র ক্লায়েন্ট প্রসেস B-র মেসেজ শুনতে পাবে না। সমাধান: (১) আর্কিটেকচার ১০০% স্টেটলেস করা (JWT টোকেন ব্যবহার করা)। (২) Socket.io-তে `Redis Adapter` (@socket.io/redis-adapter) ব্যবহার করা—যা রেডিস পাব/সাব দিয়ে সব PM2 প্রসেসের মধ্যে রিয়েলটাইমে সকেট ইভেন্ট সিনক্রোনাইজ করে।",
      b: "ক্লাস্টার মোডে প্রতিটি প্রসেসের মেমোরি আলাদা থাকে। তাই লোকাল ভ্যারিয়েবলের বদলে স্টেটলেস JWT এবং Socket.io-তে Redis Adapter ব্যবহার করে সমস্ত প্রসেসের মাঝে ডাটা ও সকেট ইভেন্ট সিঙ্ক রাখা হয়।",
      e: "Cluster workers do not share process memory; storing in-memory sessions or WebSocket rooms in variables leads to broken states across worker round-robin routing. Architecture must remain strictly stateless via JWT tokens, while Socket.io requires the Redis Streams/PubSub Adapter to synchronize broadcast events across cluster workers.",
      code: "import { createAdapter } from '@socket.io/redis-adapter';\nio.adapter(createAdapter(pubClient, subClient));"
    },
    {
      lvl: "lvl3",
      q: "PM2-তে `watch` মোড কেন প্রোডাকশনে কঠোরভাবে নিষিদ্ধ এবং কেন এটি শুধু লোকাল মেশিনের জন্য?",
      m: "মারাত্মক ভুল: `watch: true` অপশন দিলে PM2 ফাইল সিস্টেমে কোনো ফাইল পরিবর্তন বা রাইট হলেই স্বয়ংক্রিয়ভাবে পুরো অ্যাপ রিস্টার্ট করে। প্রোডাকশন সার্ভারে যখন কোনো ইউজার ফাইল আপলোড করে, লগ ফাইলে লগ লেখা হয়, বা ক্যাশ ফোল্ডারে ফাইল রাইট হয়, PM2 প্রতিবার মনে করবে কোড চেঞ্জ হয়েছে এবং সাথে সাথে লাইভ অ্যাপ রিস্টার্ট করে দেবে! এর ফলে হাজার হাজার কাস্টমারের চলমান কানেকশন ড্রপ করবে এবং সাইট অস্থিতিশীল হয়ে পড়বে। প্রোডাকশনে `watch: false` রাখা বাধ্যতামূলক; কোড আপডেট শুধুমাত্র সিআই/সিডি স্ক্রিপ্টের মাধ্যমে ম্যানুয়াল বা অটোমেটেড রিলোড হবে।",
      b: "প্রোডাকশনে watch: true রাখলে যেকোনো লগ বা ইমেজ আপলোডের সাথে সাথে পুরো অ্যাপ রিস্টার্ট হয়ে সাইট ক্র্যাশ করে। প্রোডাকশনে সর্বদা watch: false রাখতে হবে।",
      e: "watch: true causes PM2 to reboot the entire application whenever any filesystem mutation occurs. In production, runtime file uploads, log writing, or cache creation will trigger catastrophic unprovoked reload loops. Production configs must strictly specify watch: false.",
      tip: "কখনোই প্রোডাকশনে `watch: true` রাখবে না; এটি নিশ্চিত সাইট অস্থিতিশীল করে।"
    },
    {
      lvl: "lvl3",
      q: "CI/CD ডিপ্লয়মেন্টে PM2 এবং Environment Variables: কেন `pm2 reload` চালানোর সময় `--update-env` ফ্ল্যাগ দেওয়া আবশ্যক?",
      m: "ডিফল্টভাবে যখন আপনি `pm2 reload app` চালান, PM2 পুরনো প্রসেসের মেমোরিতে থাকা পুরনো এনভায়রনমেন্ট ভ্যারিয়েবলগুলোকেই ধরে রাখে—এমনকি আপনি যদি সার্ভারের `.env` ফাইলে নতুন সিক্রেট বা পোর্ট পরিবর্তনও করে থাকেন! ফলে নতুন কোড ডিপ্লয় হলেও অ্যাপ পুরনো ভ্যারিয়েবল দিয়ে চলে অদ্ভুত অদ্ভুত বাগে আটকে থাকে। সমাধান: ডিপ্লয়মেন্ট স্ক্রিপ্টে সবসময় `--update-env` ফ্ল্যাগ যোগ করতে হবে: `pm2 reload ecosystem.config.js --env production --update-env`। এটি PM2-কে নির্দেশ করে মেমোরি ক্যাশ ফেলে দিয়ে ডিস্কের নতুন `.env` বা কনফিগ ফাইল থেকে ফ্রেশ ভ্যারিয়েবল রিড করে প্রসেস রিলোড করতে।",
      b: "pm2 reload ডিফল্টভাবে পুরনো এনভায়রনমেন্ট ভ্যারিয়েবল ক্যাশ করে রাখে। --update-env ফ্ল্যাগ দিলে এটি নতুন .env ফাইল থেকে ফ্রেশ ভ্যারিয়েবল রিড করে অ্যাপ রিলোড করে।",
      e: "By default, PM2 reuses existing process environment variables cached in memory during reloads, ignoring mutations made to the server .env file. Passing the --update-env flag explicitly forces PM2 to invalidate environment caches and inject updated runtime values.",
      code: "pm2 reload ecosystem.config.js --env production --update-env"
    },

    // --- SITUATION BASED (5 Questions) ---
    {
      lvl: "situation",
      q: "পরিস্থিতি: নতুন কোড ডিপ্লয় করার পর `pm2 status` দেখাচ্ছে অ্যাপটির রিস্টার্ট কাউন্ট প্রতি সেকেন্ডে বাড়ছে (`restarts: 45`) এবং স্ট্যাটাস বারবার `errored` ও `launching`-এর মাঝে ঝুলছে! কীভাবে তাৎক্ষণিকভাবে ডিবাগ করবে?",
      m: "সমস্যার অর্থ: অ্যাপটি রিস্টার্ট লুপে পড়েছে (বুট ক্র্যাশ)। তাৎক্ষণিক পদক্ষেপ: (১) রিস্টার্ট লুপ সাময়িক থামাতে অ্যাপ স্টপ করব: `pm2 stop dokani-api`। (২) এরর লগ খুলে আসল কারণ দেখব: `pm2 logs dokani-api --err --lines 50`। (৩) ৯৫% ক্ষেত্রে এটি ঘটে দুটি কারণে: নতুন কোনো মিসিং `.env` ভ্যারিয়েবল অথবা ডেটাবেজ মাইগ্রেশন না চালিয়ে নতুন মডেল এক্সেস করার কারণে কোড আনহ্যান্ডেল্ড এক্সেপশনে ক্র্যাশ করছে। (৪) এরর ঠিক করে ম্যানুয়ালি একবার চালিয়ে টেস্ট করব: `node dist/server.js`। সফল হলে পুনরায় PM2 দিয়ে রিস্টার্ট দেব।",
      b: "রিস্টার্ট কাউন্ট বাড়লে pm2 stop দিয়ে থামিয়ে pm2 logs --err দেখে ক্র্যাশের কারণ বের করতে হবে। সাধারণত মিসিং .env ভ্যারিয়েবল বা ডেটাবেজ এররের কারণে এটি ঘটে।",
      e: "A looping restart counter indicates boot crashes. Halt the flapping loop via pm2 stop <app>, then extract the uncaught exception trace using pm2 logs <app> --err --lines 50. Common root causes include unpopulated production environment secrets or failing database handshakes.",
      code: "pm2 stop dokani-api\npm2 logs dokani-api --err --lines 50"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: একটি ৪-কোর VPS সার্ভারে PM2 ক্লাস্টার মোডে এক্সপ্রেস অ্যাপ চলছে। কিন্তু তুমি দেখলে একটি কোরের সিপিইউ ১০০% হয়ে আছে আর বাকি ৩টি কোর ০% হয়ে অলস বসে আছে! কারণ কী এবং কীভাবে ফিক্স করবে?",
      m: "কারণসমূহ: (১) কোনো একটি রিকোয়েস্টে নোডের সিঙ্গেল থ্রেডকে ব্লক করার মতো সিঙ্ক্রোনাস ভারী কাজ চলছে (যেমন দানবীয় `JSON.parse`, আন-ইনডেক্সড লুপ, বা সিঙ্ক্রোনাস ক্রিপ্টো অপারেশন), যার কারণে ওই নির্দিষ্ট কোরটি ব্লকড হয়ে আছে। (২) অথবা ক্লাস্টার মোড ঠিকমতো কনফিগার করা হয়নি—হয়তো `instances: 1` হয়ে আছে! ফিক্স: (১) `ecosystem.config.js`-এ নিশ্চিত করব `instances: 'max'` এবং `exec_mode: 'cluster'`। (২) নোড কোডে ব্লকিং সিপিইউ অপারেশন প্রোফাইল করে সেগুলোকে `worker_threads` বা ব্যাকগ্রাউন্ড কিউতে (BullMQ) স্থানান্তর করব।",
      b: "একটি কোর ১০০% হওয়ার কারণ কোডে সিঙ্ক্রোনাস ভারী কোনো লুপ বা অপারেশন মেইন থ্রেডকে ব্লক করেছে। instances: 'max' নিশ্চিত করতে হবে এবং ভারী কাজগুলো ব্যাকগ্রাউন্ড ওয়ার্কারে সরাতে হবে।",
      e: "One worker pinning a single core at 100% while siblings idle signifies synchronous event-loop blockage (such as a massive blocking JSON traversal or regex backtracking) on that worker. Profile via node --prof or Clinic.js, and delegate heavy computation to Worker Threads or BullMQ.",
      code: "// In ecosystem.config.js:\ninstances: 'max',\nexec_mode: 'cluster'"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: গভীর রাতে সার্ভারে মেমোরি লিক হয়ে পিএম২-এর প্রসেসগুলো ক্র্যাশ করেছে। কিন্তু ডেভেলপার সকালে এসে দেখল কোনো লগ ফাইল নেই কারণ ডিস্ক ভরে সব ফাইল ক্র্যাশ করেছে! কীভাবে এই বিপর্যয় রোধ করবে?",
      m: "সমাধানের ধাপ: (১) অবিলম্বে `pm2 install pm2-logrotate` মডিউল ইনস্টল করব এবং ম্যাক্স সাইজ ৫০MB বেঁধে দেব যাতে লগ কখনো ডিস্ক না ভরায়। (২) `ecosystem.config.js`-এ `max_memory_restart: '800M'` বসাব—যাতে মেমোরি লিক হলেও পুরো সার্ভারের র‍্যাম শেষ হওয়ার আগেই PM2 প্রসেসটিকে ফ্রেশভাবে রিলোড করে দেয়। (৩) Sentry বা Datadog ইন্টিগ্রেট করব যাতে যেকোনো মেমোরি স্পাইক বা ক্র্যাশের সাথে সাথে অন-কল ইঞ্জিনিয়ারের ফোনে তাৎক্ষণিক পুশ নোটিফিকেশন যায়।",
      b: "লগ যাতে ডিস্ক না ভরায় সেজন্য pm2-logrotate দিয়ে সাইজ ৫০MB সীমাবদ্ধ করব এবং max_memory_restart: 800M দিয়ে মেমোরি লিক নিয়ন্ত্রণ করব যাতে সার্ভার ক্র্যাশ পুরোপুরি প্রতিহত হয়।",
      e: "Prevent log-saturation crashes by standing up pm2-logrotate with strict file caps (max_size: 50M). Enforce max_memory_restart: '800M' so leaking worker memory is proactively recycled without consuming host physical RAM, and wire Sentry error reporting for instant alerting.",
      code: "max_memory_restart: '800M'"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: সার্ভারে `pm2 start` দিয়ে অ্যাপ চালানোর পর সার্ভার রিবুট দিলে PM2-এর কোনো অ্যাপই আর চালু হচ্ছে না এবং সব অফলাইন দেখাচ্ছে! কেন এবং কীভাবে ফিক্স করবে?",
      m: "সমস্যার কারণ: ডেভেলপার অ্যাপ চালু করার পর `pm2 save` কমান্ড দিতে ভুলে গিয়েছিল! PM2 মেমোরির প্রসেস স্টেট স্বয়ংক্রিয়ভাবে ডিস্কে রাইট করে না; যদি `pm2 save` না চালানো হয় তবে সার্ভার রিস্টার্টের সময় PM2 খালি কনফিগ দিয়ে বুট হয়। ফিক্স: অ্যাপগুলোকে পুনরায় স্টার্ট করে অবিলম্বে টার্মিনালে চালাব: `pm2 save`। এরপর নিশ্চিত হওয়ার জন্য `pm2 startup` চেক করব। এখন সার্ভার রিবুট হলেও সব অ্যাপ নিখুঁতভাবে অটো-স্টার্ট হবে।",
      b: "pm2 start দেওয়ার পর pm2 save না চালানোর কারণে সার্ভার রিস্টার্টের পর অ্যাপগুলো চালু হয়নি। pm2 save দিয়ে কনফিগ ফাইল ডিস্কে সংরক্ষণ করলেই সার্ভার রিবুটের পর সব অ্যাপ স্বয়ংক্রিয়ভাবে চালু হবে।",
      e: "PM2 stores active processes in ephemeral daemon memory until explicitly frozen to disk via pm2 save. If rebooted without running pm2 save, PM2 boots an empty process table. Launch applications, execute pm2 save, and verify via systemctl status pm2-<user>.",
      tip: "মনে রাখবে: 'Always run pm2 save after starting or modifying PM2 processes.'"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: একটি হাই-ট্রাফিক এপিআইতে ডিপ্লয়মেন্ট স্ক্রিপ্ট `pm2 reload` চালানোর মুহূর্তে ইউজারের পেমেন্ট প্রসেসিং ব্যর্থ হচ্ছে এবং `Socket hang up` এরর আসছে। কীভাবে ট্রু জিরো-ডাউনটাইম নিশ্চিত করবে?",
      m: "সমস্যা: PM2 রিলোড করার সময় পুরনো প্রসেসকে ভাবছে সে বন্ধ হতে প্রস্তুত, কিন্তু ব্যাকএন্ড নোড অ্যাপের ইন-ফ্লাইট পেমেন্ট রিকোয়েস্ট তখনো ডেটাবেজের সাথে কথা বলছিল। সমাধান: (১) নোড অ্যাপ্লিকেশনে `wait_ready: true` এবং `listen_timeout: 10000` কনফিগার করব। (২) `process.on('SIGINT')` হ্যান্ডলারে ৫ সেকেন্ডের গ্রেসফুল ড্রেনিং লজিক লিখব (`server.close()`)। (৩) অ্যাপ রেডি হলে `process.send('ready')` পাঠাব। এর ফলে PM2 শতভাগ নিশ্চিত হয়ে নতুন প্রসেস প্রস্তুত হওয়ার পরই ট্রাফিক পাঠাবে এবং কোনো পেমেন্ট কানেকশন সকেট হ্যাং আপ হবে না।",
      b: "ইন-ফ্লাইট রিকোয়েস্ট ড্রপ হওয়া ঠেকাতে wait_ready: true ও kill_timeout: 5000 ব্যবহার করব এবং কোডে SIGINT দিয়ে গ্রেসফুল শাটডাউন ও process.send('ready') বাস্তবায়ন করব।",
      e: "Socket hang-ups during reloads indicate aggressive termination of in-flight connections. Enforce wait_ready: true, bump kill_timeout to 5000ms, implement a SIGINT listener that drains HTTP connections via server.close(), and dispatch process.send('ready') only upon full initialization.",
      code: "# In ecosystem.config.js:\nwait_ready: true,\nlisten_timeout: 10000,\nkill_timeout: 5000"
    },

    // --- REAL WORLD (5 Questions) ---
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা (Dokani SaaS): Dokani POS-এর ব্যাকএন্ড এপিআই ক্লাস্টার ও ব্যাকগ্রাউন্ড ওয়ার্কার কীভাবে PM2 Ecosystem ফাইল দিয়ে প্রোডাকশনে পরিচালিত হয়?",
      m: "দোকানি পিওএসে একটি মাল্টি-অ্যাপ `ecosystem.config.js` পরিচালিত হয়: (১) `dokani-api`: এটি `instances: 'max'` এবং `exec_mode: 'cluster'`-এ চলে যাতে সব সিপিইউ কোর ব্যবহার করে পিওএস ক্যাশিয়ারদের সাব-১০ms রেসপন্স দিতে পারে। এতে `wait_ready: true`, `max_memory_restart: '800M'`, এবং `kill_timeout: 5000` কনফিগার করা। (২) `dokani-worker`: এটি `instances: 1` এবং `exec_mode: 'fork'`-এ চলে যা BullMQ দিয়ে ব্যাকগ্রাউন্ডে ইনভয়েস পিডিএফ জেনারেশন, এসএমএস অ্যালার্ট ও দৈনিক সেলস রোলআপ হিসাব করে। এই স্পষ্ট বিভাজনের কারণে সেলস এপিআই এবং ব্যাকগ্রাউন্ড প্রসেসিং একে অপরকে বিন্দুমাত্র প্রভাবিত না করে সর্বোচ্চ নির্ভরযোগ্যতায় রান করে।",
      b: "দোকানিতে এপিআই চালানো হয় ক্লাস্টার মোডে সব সিপিইউ কোর ব্যবহার করে, আর ব্যাকগ্রাউন্ড ওয়ার্কার চালানো হয় ফর্ক মোডে ১টি ইনস্ট্যান্সে যাতে কোনো কাজ ডুপ্লিকেট না হয়। এই আর্কিটেকচার সর্বোচ্চ গতি ও স্থায়িত্ব নিশ্চিত করে।",
      e: "Dokani POS coordinates its runtime via a multi-app ecosystem.config.js: dokani-api runs in Cluster Mode across all CPU cores with IPC readiness signals for sub-10ms checkout latencies; dokani-worker executes in Fork Mode with instances: 1 to consume BullMQ asynchronous PDF generation and SMS dispatch without job duplication.",
      tip: "দোকানির এই এপিআই (Cluster: max) বনাম ওয়ার্কার (Fork: 1) সেপারেশন ইন্টারভিউতে তোমার বাস্তব অভিজ্ঞতার গভীরতা প্রকাশ করে।"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: জিরো-ডাউনটাইম CI/CD ডিপ্লয়মেন্ট পাইপলাইনে PM2 রিলোড কীভাবে স্ক্রিপ্ট করা হয়?",
      m: "GitHub Actions বা ডিপ্লয় স্ক্রিপ্টে আমরা একটি নিরাপদ চেইন রান করি: (১) `git pull origin main`, (২) `npm ci` (ক্লিন প্যাকেজ ইনস্টল), (৩) `npx prisma migrate deploy` (ডেটাবেজ মাইগ্রেশন), (৪) `npm run build` (কম্পাইলেশন), (৫) `pm2 reload ecosystem.config.js --env production --update-env`। (৬) `pm2 status` আউটপুট ভ্যালিডেট করে চেক করা যে কোনো প্রসেস 'errored' স্টেটে আছে কি না। পুরো ডিপ্লয়মেন্টের সময় Nginx রিভার্স প্রক্সি এবং PM2 রোলিং রিলোডের যৌথ সক্ষমতায় লাইভ ইউজারদের কোনো ট্রাফিক ড্রপ হয় না।",
      b: "সিআই/সিডি ডিপ্লয়মেন্টে git pull, npm ci, prisma migrate deploy এবং বিল্ড শেষে pm2 reload --update-env চালানো হয়। ফলে সাইট লাইভ রেখেই সেকেন্ডের মধ্যে নতুন ভার্সন প্রোডাকশনে চলে আসে।",
      e: "The production CI/CD continuous deployment script pulls latest Git commits, executes npm ci, runs Prisma database migrations, compiles TypeScript, and invokes pm2 reload ecosystem.config.js --env production --update-env, auditing exit codes to assert zero errors.",
      code: "# Automated deploy step:\nnpx prisma migrate deploy\nnpm run build\npm2 reload ecosystem.config.js --env production --update-env\npm2 status"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: প্রোডাকশনে একাধিক মাইক্রোসার্ভিস থাকলে PM2 দিয়ে কীভাবে সার্ভিস ডিপেনডেন্সি ও ক্র্যাশ আইসোলেশন রক্ষা করবে?",
      m: "যদি একটি সার্ভারে ৫টি সার্ভিস থাকে (Auth, Billing, Inventory, Notifications, Gateway), তবে সবগুলোর জন্য আলাদা আলাদা অ্যাপ কনফিগ থাকে। সুবিধা: যদি নোটিফিকেশন সার্ভিসে কোনো থার্ড পার্টি এসএমএস এপিআই টাইমআউটের কারণে ক্র্যাশও করে, PM2 শুধুমাত্র ওই নির্দিষ্ট নোটিফিকেশন প্রসেসটিকে আইসোলেটেড রাখবে এবং রিস্টার্ট করবে। মূল বিলিং বা ইনভেন্টরি এপিআইতে এর কোনো আঁচও লাগবে না। প্রতিটি সার্ভিসের জন্য আলাদা এরর লগ ও মেমোরি লিমিট বরাদ্দ থাকে।",
      b: "একাধিক সার্ভিসের ক্ষেত্রে প্রতিটি সার্ভিস আলাদা প্রসেসে চলায় একটি সার্ভিস ক্র্যাশ করলেও অন্য সার্ভিসগুলো সম্পূর্ণ অক্ষত ও সচল থাকে। PM2 স্বয়ংক্রিয়ভাবে শুধুমাত্র ক্ষতিগ্রস্ত সার্ভিসটিকে রিস্টার্ট করে।",
      e: "Microservices managed via PM2 execute in isolated Linux process sandboxes. If an auxiliary service (e.g. notifications) crashes due to third-party timeout exceptions, PM2 isolates and heals strictly that child process without contaminating critical payment and transaction gateways.",
      tip: "বলো: 'PM2 process sandboxing provides fault isolation across co-located microservice workloads.'"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: প্রোডাকশন ডেটাবেজ কানেকশন পুল এবং PM2 ক্লাস্টার সাইজিংয়ের সম্পর্ক কী?",
      m: "খুব সূক্ষ্ম কিন্তু মারাত্মক পয়েন্ট: যদি আপনার সার্ভারে ৮টি সিপিইউ কোর থাকে এবং আপনি `instances: 8` দিয়ে PM2 চালান, এবং আপনার Prisma/Postgres কনফিগে `connection_limit = 10` দেওয়া থাকে, তবে মোট ডেটাবেজ কানেকশন কত হবে? `৮ * ১০ = ৮০টি কানেকশন`! যদি ক্লাস্টার সাইজ না ভেবে পুল সাইজ বড় দেওয়া হয়, তবে ডেটাবেজের ম্যাক্স কানেকশন নিমেষেই পূর্ণ হয়ে ডেটাবেজ ক্র্যাশ করবে। আর্কিটেকচারাল রুল: `Total DB Connections = PM2 Instances * Pool Size per Instance`। ডেটাবেজের ধারণক্ষমতা ১০০ হলে প্রতিটি পিএম২ প্রসেসে পুল সাইজ সর্বোচ্চ ১০-১২টি সীমাবদ্ধ রাখতে হবে।",
      b: "মোট ডাটাবেজ কানেকশন হলো PM2 প্রসেস সংখ্যা গুণ প্রতি প্রসেসের পুল সাইজ। ৮টি প্রসেস থাকলে প্রতিটি প্রসেসে পুল সাইজ ১০ দিলে মোট ৮০টি কানেকশন তৈরি হবে। এটি হিসাব না রাখলে ডাটাবেজ কানেকশন ক্র্যাশ করে।",
      e: "Database connection pools multiply across PM2 cluster instances (Total DB Connections = PM2 Instances * Per-Process Pool Size). Running 8 cluster workers with a Prisma connection pool limit of 15 opens 120 concurrent connections, potentially exhausting PostgreSQL max_connections.",
      tip: "ইন্টারভিউতে 'Total DB connections = PM2 cluster instances multiplied by per-worker pool size' সমীকরণটি উল্লেখ করবে।"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: PM2 প্লাস / PM2 Enterprise মনিটরিং বনাম ওপেন-সোর্স Grafana/Prometheus এক্সপোর্টার: তুমি কোনটি বেছে নেবে?",
      m: "PM2 Plus পেইড ক্লাউড মনিটরিং সরবরাহ করে, কিন্তু এন্টারপ্রাইজ সিকিউরিটিতে বাইরের ক্লাউডে অভ্যন্তরীণ প্রসেস মেটাডেটা পাঠানো নিষিদ্ধ থাকে। ওপেন-সোর্স প্রোডাকশন সমাধান: আমরা `pm2-prometheus-exporter` ব্যবহার করি। এটি একটি লাইটওয়েট লোকাল পোর্ট (যেমন 9209) খোলে এবং সমস্ত PM2 প্রসেসের রিয়েলটাইম সিপিইউ, মেমোরি, রিস্টার্ট কাউন্ট ও ইভেন্ট লুপ ল্যাটেন্সি প্রমিথিউস মেট্রিক্স ফরম্যাটে এক্সপোজ করে। এরপর সেন্ট্রাল Grafana ড্যাশবোর্ডে আমরা পুরো সার্ভার ফ্লিটের পারফরম্যান্স ভিজ্যুয়ালাইজ করি এবং ফ্রি স্ল্যাক অ্যালার্টিং সেটআপ করি।",
      b: "পেইড PM2 Plus এর বদলে আমরা ওপেন-সোর্স pm2-prometheus-exporter ব্যবহার করে গ্রাফানায় লাইভ ড্যাশবোর্ড তৈরি করি। এটি সম্পূর্ণ ফ্রি, নিজস্ব সার্ভারে নিরাপদ এবং স্ল্যাকে অটোমেটেড এলার্ট পাঠায়।",
      e: "Instead of commercial PM2 Plus, enterprise architectures employ pm2-prometheus-exporter. It scrapes PM2 cluster telemetry over a local endpoint (/metrics), shipping real-time heap usage, CPU, and restart rates to Prometheus and Grafana for centralized alerting without third-party data egress.",
      code: "pm2 install pm2-prometheus-exporter\n# Metrics exposed locally on port 9209 for Prometheus scraping"
    }
  ]
};
