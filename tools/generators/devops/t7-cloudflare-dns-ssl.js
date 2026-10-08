// Topic 7: Cloudflare, DNS & SSL Configuration (25 Questions: 5 lvl1, 5 lvl2, 5 lvl3, 5 situation, 5 realworld)
module.exports = {
  id: "cloudflare-dns-ssl",
  name: "Cloudflare, DNS & SSL Architecture",
  desc: "DNS Records (A, CNAME, TXT), Proxy Mode (Orange Cloud), SSL/TLS (Full Strict vs Flexible Loop), WAF, DDoS Mitigation, CDN Caching",
  items: [
    // --- LEVEL 1 (5 Questions) ---
    {
      lvl: "lvl1",
      q: "DNS (Domain Name System) কী এবং প্রধান DNS রেকর্ডগুলো (A, CNAME, TXT, MX)-এর ভূমিকা কী?",
      m: "DNS হলো ইন্টারনেটের ফোনবুক যা মানুষের পাঠযোগ্য ডোমেন নেমকে (`dokani.bip.sg`) মেশিনের পাঠযোগ্য আইপি অ্যাড্রেসে (`159.65.130.40`) রূপান্তর করে। প্রধান রেকর্ডসমূহ: (১) `A Record (Address)`: একটি ডোমেন বা সাবডোমেনকে সরাসরি একটি IPv4 অ্যাড্রেসের সাথে ম্যাপ করে (যেমন `api.dokani.com -> 192.0.2.1`)। (২) `CNAME Record (Canonical Name)`: একটি ডোমেনকে অন্য একটি ডোমেন নামের সাথে এলিয়াস (Alias) করে (যেমন `www.dokani.com -> dokani.com`)। (৩) `TXT Record`: টেক্সট ডেটা সংরক্ষণ করে, যা প্রধানত ডোমেন ওনারশিপ ভেরিফিকেশন (Google/Facebook) এবং ইমেইল সিকিউরিটিতে (SPF, DKIM) ব্যবহৃত হয়। (৪) `MX Record (Mail Exchange)`: ডোমেনের ইমেইল কোন মেইল সার্ভারে যাবে তা নির্দেশ করে।",
      b: "DNS ডোমেন নেমকে আইপি অ্যাড্রেসে রূপান্তর করে। A রেকর্ড ডোমেনকে সরাসরি সার্ভার আইপিতে যুক্ত করে, CNAME রেকর্ড ডোমেনকে অন্য ডোমেনের সাথে এলিয়াস করে, TXT রেকর্ড ওনারশিপ ও ইমেইল সুরক্ষায় এবং MX রেকর্ড ইমেইল সার্ভার পরিচালনায় ব্যবহৃত হয়।",
      e: "DNS resolves human-friendly hostnames to binary IP addresses. An A Record maps a domain directly to an IPv4 address. A CNAME Record aliases a subdomain to another canonical hostname. A TXT Record holds arbitrary text for domain verification and SPF/DKIM authentication. An MX Record routes incoming email to mail servers.",
      tip: "বলো: 'A Record maps hostname to IPv4; CNAME aliases host to host; TXT verifies identity.'"
    },
    {
      lvl: "lvl1",
      q: "Cloudflare Proxy Mode ('Orange Cloud' বনাম 'Grey Cloud')-এর মধ্যে মূল পার্থক্য কী?",
      m: "(১) `Orange Cloud (Proxied)`: ট্রাফিক ক্লাউডফ্লেয়ারের গ্লোবাল রিভার্স প্রক্সি নেটওয়ার্কের ভেতর দিয়ে যায়। সুবিধা: আপনার মূল সার্ভারের আসল আইপি অ্যাড্রেস ইন্টারনেটে সম্পূর্ণ গোপন থাকে (Hidden Origin IP), ফ্রি DDoS প্রটেকশন, Web Application Firewall (WAF), এবং গ্লোবাল CDN ক্যাশিং স্বয়ংক্রিয়ভাবে সক্রিয় থাকে। (২) `Grey Cloud (DNS Only)`: ক্লাউডফ্লেয়ার শুধুমাত্র একটি সাধারণ DNS রেজলভার হিসেবে কাজ করে। ক্লায়েন্ট সরাসরি আপনার সার্ভারের আসল আইপিতে আঘাত হানে; কোনো ক্যাশিং, প্রক্সি বা ক্লাউডফ্লেয়ার সিকিউরিটি স্তর থাকে না। নন-এইচটিটিপি সার্ভিস (যেমন সরাসরি SSH বা মেইল) ছাড়া সাধারণ ওয়েব সার্ভিসে সবসময় `Orange Cloud` সক্রিয় রাখা উচিত।",
      b: "অরেঞ্জ ক্লাউড (Proxied) মূল সার্ভারের আইপি লুকিয়ে রেখে ক্লাউডফ্লেয়ারের সিকিউরিটি, সিডিএন ও ডিডিওএস প্রটেকশন দেয়। গ্রে ক্লাউড (DNS Only) শুধু আইপি রেজলভ করে কিন্তু কোনো প্রক্সি সুরক্ষা দেয় না।",
      e: "Orange Cloud (Proxied) routes incoming web traffic through Cloudflare's global edge Anycast reverse proxy network, masking the true origin server IP and activating CDN caching, WAF, and DDoS mitigation. Grey Cloud (DNS Only) bypasses Cloudflare proxying, resolving queries directly to the origin server IP.",
      tip: "মনে রাখবে: 'Orange Cloud hides origin IP behind Cloudflare's DDoS protection; Grey Cloud exposes origin IP.'"
    },
    {
      lvl: "lvl1",
      q: "Cloudflare-এর ৪টি SSL/TLS এনক্রিপশন মোড কী কী এবং 'Flexible SSL' কেন মারাত্মক অনিরাপদ?",
      m: "৪টি মোড: (১) `Off`: কোনো এনক্রিপশন নেই। (২) `Flexible SSL`: ব্রাউজার থেকে ক্লাউডফ্লেয়ার পর্যন্ত HTTPS কিন্তু ক্লাউডফ্লেয়ার থেকে আপনার অরিজিন সার্ভার পর্যন্ত সম্পূর্ণ আন-এনক্রিপ্টেড প্লেইন HTTP! এটি মারাত্মক অনিরাপদ কারণ নেটওয়ার্কের মাঝে হ্যাকাররা ডেটা স্নাইফ করতে পারে এবং অরিজিন সার্ভার HTTPS ফোর্স করলে ক্লাউডফ্লেয়ার 'Infinite Redirect Loop' (ERR_TOO_MANY_REDIRECTS) বাগে আটকে যায়। (৩) `Full SSL`: ক্লাউডফ্লেয়ার থেকে অরিজিন পর্যন্ত এনক্রিপ্টেড কিন্তু সেলফ-সাইনড সার্টিফিকেট এলাউ করে। (৪) `Full (Strict) SSL` (প্রোডাকশন স্ট্যান্ডার্ড): ব্রাউজার থেকে ক্লাউডফ্লেয়ার এবং ক্লাউডফ্লেয়ার থেকে অরিজিন সার্ভার—উভয় প্রান্তে ভ্যালিড বিশ্বস্ত SSL সার্টিফিকেট থাকা বাধ্যতামূলক। শতভাগ এন্ড-টু-এন্ড এনক্রিপশন নিশ্চিত করতে সবসময় `Full (Strict)` মোড ব্যবহার করতে হবে।",
      b: "Flexible SSL ব্রাউজার ও ক্লাউডফ্লেয়ারের মাঝে এনক্রিপ্ট করলেও সার্ভার পর্যন্ত আন-এনক্রিপ্টেড থাকে এবং রিডাইরেক্ট লুপ তৈরি করে। Full (Strict) মোড উভয় প্রান্তে সম্পূর্ণ ভ্যালিড এনক্রিপশন নিশ্চিত করে যা প্রোডাকশনের জন্য একমাত্র নিরাপদ মানদণ্ড।",
      e: "Cloudflare SSL modes: Off, Flexible, Full, and Full (Strict). Flexible SSL is insecure because traffic between Cloudflare edge and the origin server flows over unencrypted plaintext HTTP, causing 'ERR_TOO_MANY_REDIRECTS' loops when origins enforce HTTPS. Always enforce Full (Strict) mode for true end-to-end cryptographic encryption.",
      code: "# In Cloudflare Dashboard:\nSSL/TLS -> Overview -> Select: Full (strict)"
    },
    {
      lvl: "lvl1",
      q: "DNS Propagation কী এবং `TTL (Time to Live)` কীভাবে ডিএনএস আপডেটকে প্রভাবিত করে?",
      m: "DNS Propagation হলো বিশ্বব্যাপী সমস্ত ISP ও লোকাল DNS ক্যাশিং সার্ভারগুলোতে কোনো ডোমেনের নতুন আইপি রেকর্ড ছড়িয়ে পড়ার সময়কাল। `TTL (Time to Live)` হলো একটি সংখ্যা (সেকেন্ডে) যা নির্দেশ করে কোনো ডিএনএস রেজলভার সার্ভার কতক্ষণ ওই রেকর্ডটি ক্যাশে ধরে রাখবে। যদি কোনো রেকর্ডের TTL হয় `86400` (২৪ ঘণ্টা), তবে আপনি সার্ভার আইপি পরিবর্তন করলেও বিশ্বব্যাপী ইউজারদের কাছে নতুন আইপিতে ট্রাফিক যেতে পুরো ২৪ ঘণ্টা সময় লেগে যাবে! সার্ভার মাইগ্রেশনের আগের দিন TTL কমিয়ে `300` (৫ মিনিট) সেট করে রাখা বেস্ট প্র্যাকটিস, যাতে আইপি পরিবর্তনের সাথে সাথে ৫ মিনিটের মধ্যে বিশ্বব্যাপী ট্রাফিক নতুন সার্ভারে চলে আসে।",
      b: "ডিএনএস প্রোপাগেশন হলো নতুন আইপি বিশ্বজুড়ে ছড়িয়ে পড়ার সময়। TTL নির্ধারণ করে ডিএনএস সার্ভার কতক্ষণ রেকর্ডটি ক্যাশে রাখবে। মাইগ্রেশনের আগে TTL কমিয়ে ৫ মিনিট (৩০০ সেকেন্ড) রাখলে তাৎক্ষণিকভাবে নতুন সার্ভারে ট্রাফিক আপডেট হয়।",
      e: "DNS Propagation is the interval required for global recursive DNS resolvers to refresh cached records. TTL (Time to Live) dictates how long resolvers cache a record. Lowering TTL to 300 seconds prior to server migrations ensures global DNS updates propagate in under 5 minutes.",
      tip: "বলো: 'Lower TTL to 300s before migrations to ensure near-instantaneous global DNS cutover.'"
    },
    {
      lvl: "lvl1",
      q: "Cloudflare CDN (Content Delivery Network) ক্যাশিং কীভাবে ওয়েবসাইটের ব্যান্ডউইথ খরচ ৯০% কমিয়ে দেয়?",
      m: "যখন কোনো ইউজার আপনার সাইট ভিজিট করে, ক্লাউডফ্লেয়ারের গ্লোবাল এজ সার্ভারগুলো স্ট্যাটিক ফাইলগুলো (CSS, JS, ইমেজ, ওয়েব ফন্ট) নিজেদের মেমোরিতে ক্যাশ করে নেয়। পরবর্তী যে কোনো ইউজার যখন ওই ফাইলগুলো চায়, ক্লাউডফ্লেয়ার আপনার মূল সার্ভারে কোনো রিকোয়েস্টই পাঠায় না—বরং ইউজারের ভৌগোলিক নিকটবর্তী এজ ডেটাসেন্টার (যেমন ঢাকা এজ) থেকে আলো-গতির বেগে ফাইল ফিরিয়ে দেয়। এর ফলে মূল VPS সার্ভারের ব্যান্ডউইথ ব্যবহার ৮০-৯০% কমে যায়, সিপিইউ লোড শূন্যে নামে এবং পেজ লোড টাইম কয়েক সেকেন্ড থেকে নেমে কয়েক মিলিসেকেন্ডে চলে আসে।",
      b: "ক্লাউডফ্লেয়ার সিডিএন স্ট্যাটিক ফাইলগুলো এজ সার্ভারে ক্যাশ করে রাখে। ফলে পরবর্তী ভিজিটরদের ক্ষেত্রে মূল সার্ভারে কোনো রিকোয়েস্ট যায় না, লোকাল এজ থেকেই ফাইল চলে আসে। এতে সার্ভার ব্যান্ডউইথ খরচ ৯০% পর্যন্ত হ্রাস পায়।",
      e: "Cloudflare CDN caches static web assets across its global 300+ Edge points of presence. Subsequent visitors receive images, scripts, and fonts directly from their local edge data center, eliminating origin server traffic, dropping transit costs by 90%, and slashing latency.",
      tip: "বলো: 'Edge CDN caching serves assets from local edge PoPs, offloading 90% of origin network bandwidth.'"
    },

    // --- LEVEL 2 (5 Questions) ---
    {
      lvl: "lvl2",
      q: "Cloudflare 'Under Attack Mode' কী এবং লেয়ার ৭ (HTTP Flood) DDoS আক্রমণের সময় এটি কীভাবে সার্ভার বাঁচায়?",
      m: "'Under Attack Mode' হলো ক্লাউডফ্লেয়ারের একটি এমার্জেন্সি ডিফেন্স মেকানিজম। যখন সাইটে সেকেন্ডে লাখ লাখ বট ও ম্যালিশিয়াস ট্রাফিকের বন্যা আসে যা সার্ভার ক্র্যাশ করাতে পারে, তখন এক ক্লিকে এই মোড অন করা হয়। এটি সাথে সাথে মূল সাইট খোলার আগে সমস্ত ইনকামিং ভিজিটরের সামনে একটি লাইভ জাভাস্ক্রিপ্ট চ্যালেঞ্জ (Cloudflare Managed Challenge / Turnstile) উপস্থাপন করে। আক্রমণকারী সাধারণ বটনেট ও পাইথন স্ক্রিপ্টগুলো জাভাস্ক্রিপ্ট এক্সিকিউট করতে না পেরে দরজায় আটকে যায়; শুধুমাত্র আসল মানব ইউজারদের ৫ সেকেন্ডের মধ্যে কোনো ক্যাপচা টাইপ করা ছাড়াই স্বয়ংক্রিয়ভাবে মূল সাইটে প্রবেশ করতে দেওয়া হয়। সার্ভারের সিপিইউ瞬间 ০%-এ ফিরে আসে।",
      b: "Under Attack Mode এক ক্লিকে সক্রিয় করে সেকেন্ডে লাখ লাখ বটের আক্রমণ ঠেকানো যায়। এটি প্রতিটি রিকোয়েস্টে ব্যাকগ্রাউন্ড জাভাস্ক্রিপ্ট চ্যালেঞ্জ চালিয়ে সব হ্যাকার বট আটকে দেয় এবং শুধু আসল ব্যবহারকারীদের সাইটে প্রবেশ করায়।",
      e: "Under Attack Mode mitigates Layer-7 HTTP Flood volumetric DDoS attacks. It interposes an automated JavaScript execution challenge (Turnstile) before allowing access to origin infrastructure. Headless bots and attack scripts fail the cryptographic handshake, filtering abusive floods to zero.",
      code: "# Can be enabled via Cloudflare Dashboard or API instantly:\ncurl -X PATCH \"https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/security_level\" \\\n     -H \"Authorization: Bearer $CF_TOKEN\" \\\n     --data '{\"value\":\"under_attack\"}'"
    },
    {
      lvl: "lvl2",
      q: "Cloudflare Web Application Firewall (WAF) কাস্টম রুলস কীভাবে ক্ষতিকর ট্রাফিক ও আক্রমণ ব্লক করে?",
      m: "Cloudflare WAF ইনকামিং প্রতিটি HTTP রিকোয়েস্ট পরীক্ষা করে। আমরা কাস্টম রুলস ডিফাইন করতে পারি: (১) `Country Blocking`: নির্দিষ্ট দেশ থেকে সন্দেহজনক ট্রাফিক আসলে ব্লক করা (`ip.geoip.country eq \"RU\" or ip.geoip.country eq \"CN\"`)। (২) `Bad User-Agents`: স্ক্র্যাপার ও আক্রমণকারী স্ক্রিপ্ট ব্লক করা (`http.user_agent contains \"sqlmap\" or http.user_agent contains \"python\"`)। (৩) `Admin Area Protection`: সংবেদনশীল অ্যাডমিন রুটে (যেমন `/admin/*` বা `/wp-admin`) শুধুমাত্র আপনার অফিসের নির্দিষ্ট স্ট্যাটিক আইপি এলাউ করে বাকি সবার জন্য 403 Forbidden ফিরিয়ে দেওয়া। এটি সার্ভারে পৌঁছানোর আগেই এজ লেভেলেই ৯৯.৯% সাইবার থ্রেট নস্যাৎ করে।",
      b: "Cloudflare WAF এজ লেভেলে ক্ষতিকর দেশ, স্ক্র্যাপার বট এবং হ্যাকিং টুল ব্লক করে। এছাড়া অ্যাডমিন প্যানেলে নির্দিষ্ট আইপি ছাড়া বাকি সবার অ্যাক্সেস বন্ধ করে দিয়ে সর্বোচ্চ নিরাপত্তা প্রদান করে।",
      e: "Cloudflare WAF intercepts malicious Layer 7 traffic at the edge before hitting origin infrastructure. Custom firewall rules enforce geolocation IP blocks, block automated scraping tools (sqlmap, curl), and restrict administrative routes (/admin/*) strictly to whitelisted office CIDR blocks.",
      code: "# WAF Expression Rule:\n(http.request.uri.path contains \"/admin/\" and not ip.src in {103.205.180.0/24}) -> Action: Block"
    },
    {
      lvl: "lvl2",
      q: "Cloudflare Cache Rules এবং Page Rules দিয়ে ডায়নামিক এপিআই ও স্ট্যাটিক সাইটের ক্যাশিং আচরণ কীভাবে নিয়ন্ত্রণ করবে?",
      m: "বাই-ডিফল্ট ক্লাউডফ্লেয়ার কোনো HTML পেজ বা এপিআই রেসপন্স ক্যাশ করে না (শুধু ইমেজ, CSS, JS ক্যাশ করে)। ক্যাশ রুলস দিয়ে আমরা সূক্ষ্মভাবে নিয়ন্ত্রণ করি: (১) `Bypass Cache for APIs`: নিশ্চিত করি যেন কোনো এপিআই এন্ডপয়েন্ট ভুলবশত ক্যাশ না হয়ে যায়: `URI Path starts with /api/` -> `Cache Eligibility: Bypass Cache`। (২) `Edge Cache for Public Blogs`: যেসব পাবলিক পেজ বদলায় না সেগুলোতে `Cache Everything` এবং `Edge Cache TTL: 1 day` সেট করি। (৩) `Origin Cache-Control Respect`: অরিজিন সার্ভারের পাঠানো `Cache-Control: public, s-maxage=3600` হেডার মেনে চলার নির্দেশ দেওয়া।",
      b: "ক্যাশ রুল দিয়ে /api/ পাথকে ক্যাশ বাইপাস করা হয় যাতে এপিআই সর্বদা লাইভ থাকে। আর স্ট্যাটিক পেজে Cache Everything রুল দিয়ে এজ ক্যাশিং সক্রিয় করে পেজ লোডিংকে সুপারফাস্ট করা হয়।",
      e: "Configure Cloudflare Cache Rules: explicitly set 'Bypass Cache' for /api/* and authenticated paths to prevent serving stale user sessions. Set 'Cache Everything' on immutable public landing pages with explicit Edge TTLs, offloading 99% of web traffic from origin servers.",
      code: "# Rule 1: /api/* -> Bypass Cache\n# Rule 2: /assets/* -> Cache Everything, Edge TTL: 1 month"
    },
    {
      lvl: "lvl2",
      q: "Cloudflare Authenticated Origin Pulls (AOP) এবং Cloudflare Origin CA সার্টিফিকেট কেন ব্যবহার করা উচিত?",
      m: "যদি কোনো হ্যাকার কোনোভাবে আপনার VPS সার্ভারের আসল আইপি অ্যাড্রেস বের করে ফেলে (`159.65.130.40`), সে ক্লাউডফ্লেয়ারকে সম্পূর্ণ বাইপাস করে সরাসরি আপনার সার্ভারে আক্রমণ চালাতে পারে! সমাধান: (১) `Cloudflare Origin CA Certificate`: ক্লাউডফ্লেয়ার থেকে একটি ১৫ বছরের ফ্রি SSL সার্টিফিকেট জেনারেট করে Nginx-এ বসানো। (২) `Authenticated Origin Pulls (AOP)`: Nginx-এ ক্লাউডফ্লেয়ারের পাবলিক CA সার্টিফিকেট কনফিগার করা (`ssl_client_certificate /etc/nginx/certs/cloudflare.crt; ssl_verify_client on;`)। এর ফলে Nginx শুধুমাত্র সেই রিকোয়েস্টগুলোকেই গ্রহণ করবে যা ভ্যালিড ক্লাউডফ্লেয়ার এজ থেকে আসছে—সরাসরি আসল আইপিতে আঘাত হানা যেকোনো বহিরাগত রিকোয়েস্ট Nginx তাৎক্ষণিকভাবে ড্রপ করে দেবে।",
      b: "হ্যাকার যেন সরাসরি সার্ভার আইপিতে হিট করে ক্লাউডফ্লেয়ারকে বাইপাস করতে না পারে, সেজন্য Authenticated Origin Pulls ব্যবহার করা হয়। ফলে ক্লাউডফ্লেয়ার ছাড়া অন্য কোনো উৎস থেকে আসা রিকোয়েস্ট সার্ভার সরাসরি বাতিল করে দেয়।",
      e: "If an attacker discovers your raw origin IP, they can bypass Cloudflare WAF entirely. Authenticated Origin Pulls (AOP) enforces mutual TLS (mTLS) between Cloudflare and Nginx. Nginx validates Cloudflare's client certificate on every connection, dropping any connection originating from outside Cloudflare's proxy network.",
      code: "# In Nginx:\nssl_client_certificate /etc/nginx/certs/cloudflare.crt;\nssl_verify_client on;"
    },
    {
      lvl: "lvl2",
      q: "Cloudflare Turnstile কী এবং ট্র্যাডিশনাল Google reCAPTCHA-এর চেয়ে এটি কেন ডেভেলপার ও ইউজারদের কাছে সেরা?",
      m: "`Cloudflare Turnstile` হলো একটি আধুনিক, ইউজার-ফ্রেন্ডলি ক্যাপচা বিকল্প। ট্র্যাডিশনাল Google reCAPTCHA ইউজারদের ট্রাফিক লাইট বা ক্রসিং খুঁজতে বলে সময় নষ্ট করায় এবং ইউজারের প্রাইভেসি ট্র্যাকিং করে। Turnstile সম্পূর্ণ ইনভিজিবল বা মাত্র এক-ক্লিকের স্মার্ট চ্যালেঞ্জ চালায়। এটি ব্রাউজারের নন-ইনভেসিভ টেলিমেট্রি ও প্রাইভেট স্টেট টোকেন বিশ্লেষণ করে ৮৫% ক্ষেত্রে কোনো ক্যাপচা পাজল ছাড়াই ব্যাকগ্রাউন্ডে যাচাই সম্পন্ন করে দেয়। এটি সম্পূর্ণ ফ্রি, আনলিমিটেড ব্যবহার করা যায় এবং ফ্রন্টএন্ডে মাত্র ৩ লাইনের কোডে ইন্টিগ্রেট করা যায়।",
      b: "টার্নস্টাইল হলো গুগলের বিরক্তিকর ক্যাপচার বিকল্প। কোনো ট্রাফিক লাইট খোঁজা ছাড়া এটি ব্যাকগ্রাউন্ডে ইনভিজিবলভাবে হ্যাকার বট শনাক্ত করে এবং আসল ইউজারদের কোনো ঝামেলা ছাড়াই সাইটে প্রবেশের অনুমতি দেয়।",
      e: "Cloudflare Turnstile is an invisible, privacy-focused CAPTCHA alternative. Unlike frustrating Google reCAPTCHA image puzzles that crater conversion rates, Turnstile runs automated browser entropy checks silently, delivering frictionless authentication with zero user tracking.",
      code: "<script src=\"https://challenges.cloudflare.com/turnstile/v0/api.js\" async defer></script>\n<div class=\"cf-turnstile\" data-sitekey=\"your-turnstile-sitekey\"></div>"
    },

    // --- LEVEL 3 (5 Questions) ---
    {
      lvl: "lvl3",
      q: "Cloudflare Worker / Edge Functions দিয়ে রিয়েল-টাইম জিও-বেসড রেস্ট্রিকশন ও কারেন্সি সুইচিং কীভাবে ইমপ্লিমেন্ট করবে?",
      m: "Cloudflare Workers সরাসরি ক্লাউডফ্লেয়ারের ৩০০+ এজ লোকেশনে রান করে। প্রতিটি ইনকামিং রিকোয়েস্টে ক্লাউডফ্লেয়ার স্বয়ংক্রিয়ভাবে ক্লায়েন্টের ভৌগোলিক তথ্য যুক্ত করে: `request.cf.country`, `request.cf.city`, এবং `request.cf.latitude`। আমরা একটি অতিক্ষুদ্র এজ ফাংশন লিখতে পারি: যদি ভিজিটর বাংলাদেশ থেকে আসে (`country === 'BD'`), তবে রেসপন্সে কারেন্সি `BDT` সেট করে লোকাল ক্যাশ সার্ভ করব; যদি ভিজিটর ইউএসএ থেকে আসে তবে `USD` কারেন্সিতে রুট করব। কোনো ব্যাকএন্ড সার্ভারে না গিয়ে এজ লেভেলেই এটি সাব-৫ মিলিসেকেন্ডে সম্পন্ন হয়।",
      b: "ক্লাউডফ্লেয়ার ওয়ার্কার এজ লোকেশনে চলে এবং request.cf.country দিয়ে ইউজারের দেশ চেনে। বাংলাদেশ হলে BDT এবং ইউএসএ হলে USD কারেন্সিতে মিলি-সেকেন্ডে এজ থেকেই রেসপন্স পাঠানো যায় কোনো সার্ভার লোড ছাড়াই।",
      e: "Cloudflare Workers inspect incoming request metadata (request.cf.country, request.cf.city) natively at the edge. A Worker can intercept traffic and mutate response headers or rewrite upstream payloads to inject local currencies (BDT vs USD) and currencies in sub-5ms latency before hitting backend servers.",
      code: "export default {\n  async fetch(request) {\n    const country = request.cf?.country || 'US';\n    const currency = country === 'BD' ? 'BDT' : 'USD';\n    const response = await fetch(request);\n    const newHeaders = new Headers(response.headers);\n    newHeaders.set('X-Local-Currency', currency);\n    return new Response(response.body, { ...response, headers: newHeaders });\n  }\n};"
    },
    {
      lvl: "lvl3",
      q: "DNSSEC (DNS Security Extensions) কী এবং এটি DNS Spoofing ও Cache Poisoning আক্রমণ কীভাবে প্রতিরোধ করে?",
      m: "DNSSEC হলো ডেনএস রেজোলিউশনের জন্য একটি ক্রিপ্টোগ্রাফিক অথেনটিকেশন স্তর। সাধারণ DNS রেজোলিউশনে কোনো এনক্রিপশন থাকে না; ফলে হ্যাকাররা ম্যান-ইন-দ্য-মিডল বা ডিএনএস ক্যাশ পয়জনিংয়ের মাধ্যমে গ্রাহককে ব্যাংকের আসল আইপির বদলে নিজের তৈরি জাল ফিশিং সাইটের আইপিতে রিডাইরেক্ট করতে পারে। DNSSEC পাবলিক-কি ক্রিপ্টোগ্রাফি ব্যবহার করে প্রতিটি ডিএনএস রেকর্ডকে ডিজিটাল সাইন (RRSIG) করে। ডিএনএস রেজলভার রুট জোন থেকে শুরু করে চেইন অফ ট্রাস্ট (DS Record) যাচাই করে নিশ্চিত করে যে রেকর্ডটি সত্যই আসল ডোমেন ওনার তৈরি করেছে। কোনো টেম্পারিং ধরা পড়লে রেজলভার রিকোয়েস্টটি তৎক্ষণাৎ ড্রপ করে দেয়।",
      b: "DNSSEC পাবলিক-কি ক্রিপ্টোগ্রাফি দিয়ে প্রতিটি ডিএনএস রেকর্ডকে ডিজিটাল সাইন করে। এটি হ্যাকারদের ডিএনএস ক্যাশ পয়জনিং ও ফিশিং সাইটে ট্রাফিক চুরি করা শতভাগ প্রতিহত করে।",
      e: "DNSSEC introduces cryptographic signatures to DNS records using public-key cryptography. Resolvers trace a cryptographic Chain of Trust from root anchors via DS and DNSKEY records to verify that DNS responses were authentically published by the zone owner without intermediary tampering or cache poisoning.",
      tip: "বলো: 'DNSSEC enforces cryptographic Chain of Trust, preventing DNS spoofing and cache poisoning attacks.'"
    },
    {
      lvl: "lvl3",
      q: "Cloudflare Rate Limiting Rules (Advanced): পেমেন্ট এবং ওটিপি এপিআই এন্ডপয়েন্টে ব্রুট-ফোর্স রোধে কীভাবে মাল্টি-ডাইমেনশনাল রুলস লিখবে?",
      m: "পেমেন্ট গেটওয়ে বা এসএমএস ওটিপি এপিআইতে সাধারণ আইপি-বেসড লিমিট যথেষ্ট নয় কারণ আক্রমণকারীরা প্রক্সি দিয়ে আইপি বদলাতে পারে। আমরা Cloudflare Advanced Rate Limiting-এ একাধিক শর্তের কম্বিনেশন করি: (১) এক্সপ্রেশন: `http.request.uri.path eq \"/api/v1/auth/send-otp\"`। (২) ম্যাচিং ক্যারেক্টারিস্টিক: ক্লায়েন্ট আইপি এবং রিকোয়েস্ট হেডারে থাকা ফোন নম্বরের হ্যাশ যৌথভাবে ট্র্যাক করা। (৩) লিমিট: ৫টি রিকোয়েস্ট প্রতি ১০ মিনিটে। (৪) অ্যাকশন: যদি লিমিট পার হয়, তবে আক্রমণকারীকে সাধারণ ব্লক না করে সরাসরি ১০ মিনিটের জন্য 'Managed Challenge' বা 'Block 429' দেওয়া। এটি এসএমএস গেটওয়ে ড্রেনিং আক্রমণ পুরোপুরি বন্ধ করে।",
      b: "ওটিপি ও পেমেন্ট এপিআই সুরক্ষায় ক্লাউডফ্লেয়ার অ্যাডভান্সড রেট লিমিটিং দিয়ে নির্দিষ্ট পাথে ১০ মিনিটে সর্বোচ্চ ৫টি রিকোয়েস্টের নিয়ম করা হয়। সীমা ছাড়িয়ে গেলে ব্লক বা চ্যালেঞ্জ দিয়ে এসএমএস গেটওয়ে সুরক্ষিত রাখা হয়।",
      e: "Craft multidimensional rate limiting rules targeting sensitive paths (/api/auth/send-otp): count requests combining client IP and target payload characteristics. If requests breach 5 requests per 10 minutes, apply a 600-second block mitigation, thwarting SMS gateway toll-fraud attacks.",
      code: "# Cloudflare Expression:\n(http.request.uri.path eq \"/api/v1/otp/send\")\n# Action: Block for 10 minutes if count > 5 in 10m"
    },
    {
      lvl: "lvl3",
      q: "Cloudflare Anycast Routing কী এবং কীভাবে এটি ডিডিওএস আক্রমণকে বিশ্বব্যাপী শোষণ (Dissipate) করে?",
      m: "Unicast রাউটিংয়ে একটি আইপি অ্যাড্রেস নির্দিষ্ট একটি ফিজিক্যাল ডেটাসেন্টারের সার্ভারকে নির্দেশ করে—ফলে ১ টেরাবিটের দানবীয় আক্রমণ এলে পুরো ডেটাসেন্টার ডাউন হয়ে যায়। Cloudflare `Anycast BGP Routing` ব্যবহার করে: বিশ্বব্যাপী ৩০০টিরও বেশি শহরের ডেটাসেন্টারে একই সিঙ্গেল আইপি অ্যাড্রেস অ্যানাউন্স করা থাকে! যখন হ্যাকার বটনেট আক্রমণ চালায়, তখন গ্লোবাল BGP রাউটিং আক্রমণের ট্রাফিককে বিশ্বব্যাপী সমস্ত লোকাল ডেটাসেন্টারে (লন্ডন, ফ্রাঙ্কফুর্ট, সিঙ্গাপুর, টোকিও, ডালাস) টুকরো টুকরো করে ছড়িয়ে দেয়। কোনো একটি নির্দিষ্ট সার্ভারে লোড না পড়ে সম্পূর্ণ ট্রাফিক এজ নেটওয়ার্কের শত টেরাবিট ব্যাকবোনে মুহূর্তের মধ্যে শোষিত ও ড্রপ হয়ে যায়।",
      b: "অ্যানিকাস্ট রাউটিংয়ে বিশ্বজুড়ে ৩০০টি ডেটাসেন্টারে একই আইপি থাকে। ফলে বিশাল আক্রমণ এক জায়গায় না লেগে সারা বিশ্বের সমস্ত ডেটাসেন্টারে ছড়িয়ে পড়ে মুহূর্তেই বিলীন হয়ে যায়।",
      e: "Cloudflare announces identical Anycast IP prefixes across all 300+ global edge locations via BGP. Volumetric DDoS attacks are geographically fractured and absorbed concurrently by edge ingress nodes closest to the botnets, diluting multi-terabit attacks before reaching the origin.",
      tip: "বলো: 'Anycast routes traffic to the nearest topological node, geographically fracturing and dissolving volumetric DDoS attacks.'"
    },
    {
      lvl: "lvl3",
      q: "Zero-Downtime Origin IP Migration: যখন ক্লাউড সার্ভারের আইপি পরিবর্তন করতে হয়, তখন Cloudflare দিয়ে কীভাবে গ্রাহকদের নির্বিঘ্নে লাইভ রাখবে?",
      m: "পদক্ষেপসমূহ: (১) নতুন VPS সার্ভারে সম্পূর্ণ কোডবেজ, ডাটাবেজ রেপ্লিকেশন ও SSL কনফিগার করে প্রস্তুত রাখব। (২) Cloudflare ড্যাশবোর্ডে গিয়ে `A Record`-এর আইপি পুরনো সার্ভার থেকে নতুন সার্ভারের আইপিতে আপডেট করব। যেহেতু ক্লাউডফ্লেয়ারের 'Orange Cloud' প্রক্সি অন থাকে, তাই বিশ্বব্যাপী ইন্টারনেটের গ্রাহকদের কোনো ডিএনএস ক্যাশ আপডেট হওয়ার জন্য অপেক্ষা করতে হয় না! ক্লাউডফ্লেয়ারের এজ নোডগুলো মাত্র ১ সেকেন্ডের মধ্যে ইন্টারনালি ট্রাফিক নতুন অরিজিন আইপিতে ঘুরিয়ে দেয়। (৩) গ্রাহকরা এক মিলিসেকেন্ডের জন্যও সাইট ডাউন দেখে না। (৪) নতুন সার্ভারে ট্রাফিক স্থির হলে পুরনো সার্ভার ডিকমিশন করব।",
      b: "অরেঞ্জ ক্লাউড অন থাকায় Cloudflare ড্যাশবোর্ডে নতুন আইপি বসানো মাত্রই ১ সেকেন্ডে ট্রাফিক নতুন সার্ভারে চলে যায়। কোনো ডিএনএস প্রোপাগেশন বিলম্ব ছাড়াই সম্পূর্ণ নির্বিঘ্নে মাইগ্রেশন সম্পন্ন হয়।",
      e: "Because Cloudflare sits as a reverse proxy, public DNS points to Cloudflare Anycast IPs, not the origin. Updating the origin IP inside the Cloudflare DNS dashboard pivots global origin requests in under 1 second without waiting for third-party recursive ISP DNS propagation.",
      tip: "মনে রাখবে: 'With Cloudflare Proxy enabled, origin IP cutovers execute in 1 second with zero DNS propagation latency.'"
    },

    // --- SITUATION BASED (5 Questions) ---
    {
      lvl: "situation",
      q: "পরিস্থিতি: Cloudflare সক্রিয় করার পর ব্রাউজারে সাইট ওপেন করলে এরর আসছে: `ERR_TOO_MANY_REDIRECTS` (Redirect Loop)। কোনো পেজই খুলছে না! কারণ কী এবং তাৎক্ষণিক সমাধান কী?",
      m: "কারণ: ক্লাউডফ্লেয়ার ড্যাশবোর্ডে SSL মোড সেট করা আছে `Flexible`, কিন্তু আপনার অরিজিন সার্ভারে (Nginx বা Node.js) কনফিগার করা আছে যে কোনো HTTP রিকোয়েস্ট এলে তাকে 301 HTTPS-এ রিডাইরেক্ট করতে হবে! ক্লাউডফ্লেয়ার অরিজিনে HTTP দিয়ে রিকোয়েস্ট পাঠায় -> অরিজিন তাকে HTTPS-এ রিডাইরেক্ট করে -> ক্লাউডফ্লেয়ার আবার অরিজিনে HTTP পাঠায় -> অরিজিন আবার রিডাইরেক্ট করে—যার ফলে অনন্ত রিডাইরেক্ট লুপ তৈরি হয়! তাৎক্ষণিক সমাধান: Cloudflare ড্যাশবোর্ডে `SSL/TLS`-এ ঢুকে অবিলম্বে মোডটি `Flexible` থেকে বদলে `Full` অথবা `Full (Strict)` করে দিতে হবে। সাথে সাথে সাইট নিখুঁতভাবে ওপেন হবে।",
      b: "Flexible SSL থাকায় ক্লাউডফ্লেয়ার সার্ভারে HTTP পাঠায় আর সার্ভার তাকে HTTPS এ রিডাইরেক্ট করায় অনন্ত লুপ তৈরি হয়। ক্লাউডফ্লেয়ার SSL মোড Full (Strict) করে দিলেই রিডাইরেক্ট লুপ সাথে সাথে ঠিক হয়ে যায়।",
      e: "ERR_TOO_MANY_REDIRECTS occurs when Cloudflare is set to Flexible SSL while the origin server enforces HTTPS redirects. Cloudflare contacts the origin over HTTP, the origin responds with a 301 redirect to HTTPS, and Cloudflare re-issues HTTP indefinitely. Switch Cloudflare SSL to Full (Strict) to resolve.",
      code: "# Immediate fix in Cloudflare Dashboard:\nSSL/TLS -> Set mode to: Full (strict)"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: ব্রাউজারে ইউজাররা হঠাৎ ক্লাউডফ্লেয়ারের `Error 521: Web Server Is Down` দেখতে পাচ্ছে। সমস্যা কোথায় এবং কীভাবে ট্রাবলশুট করবে?",
      m: "সমস্যার অর্থ: ক্লাউডফ্লেয়ারের এজ নেটওয়ার্ক সম্পূর্ণ সুস্থ আছে, কিন্তু ক্লাউডফ্লেয়ার যখন আপনার মূল VPS সার্ভারের পোর্টে (80 বা 443) কানেক্ট করার চেষ্টা করেছে, তখন সার্ভার থেকে TCP Connection Refused এসেছে! ট্রাবলশুটিং ধাপ: (১) উবুন্টু VPS সার্ভারে SSH করে চেক করব Nginx সার্ভিস রানিং আছে কি না: `sudo systemctl status nginx` (সাধারণত Nginx ক্র্যাশ করলে বা বন্ধ থাকলে 521 আসে)। (২) সার্ভারের ফায়ারওয়াল UFW বা ক্লাউড সিকিউরিটি গ্রুপে পোর্ট ৮০ ও ৪৪৩ ব্লক আছে কি না। (৩) সার্ভার ক্র্যাশ করে থাকলে রিস্টার্ট করব: `sudo systemctl restart nginx`। Nginx সচল হওয়া মাত্রই 521 এরর দূর হয়ে যাবে।",
      b: "Error 521 মানে ক্লাউডফ্লেয়ার সার্ভারের সাথে কানেক্ট করতে পারেনি কারণ মূল সার্ভার বা Nginx বন্ধ হয়ে গেছে। সার্ভারে SSH ঢুকে Nginx রিস্টার্ট করলেই সাইট সচল হয়।",
      e: "Error 521 Web Server Is Down indicates that the origin VPS refused TCP handshake connections from Cloudflare proxy IPs. Triage by SSHing into the VPS, checking Nginx daemon health via systemctl status nginx, and verifying that UFW firewalls allow incoming traffic on ports 80 and 443.",
      code: "sudo systemctl status nginx\nsudo systemctl restart nginx\nsudo ufw allow 80/tcp && sudo ufw allow 443/tcp"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: ব্রাউজারে ইউজাররা `Error 522: Connection Timed Out` দেখতে পাচ্ছে। এটি 521-এর চেয়ে কীভাবে আলাদা এবং কীভাবে ফিক্স করবে?",
      m: "পার্থক্য: 521 মানে সার্ভার কানেকশন রিফিউজ করেছে (Nginx বন্ধ ছিল)। কিন্তু `522 Connection Timed Out` মানে হলো ক্লাউডফ্লেয়ার সার্ভারকে TCP সিন (SYN) প্যাকেট পাঠিয়েছে কিন্তু সার্ভার কোনো জবাবই দেয়নি (টাইমআউট হয়েছে)! কারণসমূহ: (১) সার্ভারের UFW ফায়ারওয়াল বা Fail2ban ভুলবশত ক্লাউডফ্লেয়ারের প্রক্সি আইপিগুলোকে ব্লক করে দিয়েছে! (২) সার্ভারের ইন্টারনেট সংযোগ বা রাউটিং ডাউন। (৩) সার্ভারের সিপিইউ ১০০% হয়ে নেটওয়ার্ক স্ট্যাক ফ্রিজ হয়ে আছে। ফিক্স: UFW ফায়ারওয়ালে ক্লাউডফ্লেয়ারের সমস্ত অফিশিয়াল আইপি রেঞ্জ (`cloudflare.com/ips`) হোয়াইটলিস্ট করে দেওয়া যাতে কোনো অবস্থাতেই ক্লাউডফ্লেয়ার ট্রাফিক ড্রপ না হয়।",
      b: "Error 522 মানে সার্ভার থেকে কোনো রেসপন্স না পেয়ে টাইমআউট হয়েছে। সাধারণত ফায়ারওয়াল বা Fail2ban ক্লাউডফ্লেয়ারের আইপি ব্লক করলে এটি ঘটে। ফায়ারওয়ালে ক্লাউডফ্লেয়ারের আইপি হোয়াইটলিস্ট করলে সমাধান হয়।",
      e: "Error 522 signifies that the TCP handshake timed out between Cloudflare and the origin. The primary cause is host firewalls (UFW/Fail2ban) mistakenly dropping packets from Cloudflare proxy IP ranges due to rate limiting. Whitelist official Cloudflare IP subnets explicitly in the firewall.",
      code: "# Whitelist Cloudflare IPs in UFW:\nfor ip in $(curl -s https://www.cloudflare.com/ips-v4); do\n  sudo ufw allow from $ip to any port 443 proto tcp\ndone"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: ফ্রন্টএন্ডে ইউজাররা লগইন করার পর অন্য ইউজারের প্রোফাইল বা ড্যাশবোর্ড ডেটা দেখতে পাচ্ছে! ক্লাউডফ্লেয়ার কনফিগারেশনে কোথায় মারাত্মক ভুল হয়েছিল?",
      m: "ভয়াবহ ক্যাশিং বাগ: কেউ একজন ক্লাউডফ্লেয়ারে একটি ওভার-অ্যাগ্রেসিভ পেজ রুল লিখেছিল: `*.dokani.com/*` -> `Cache Level: Cache Everything`! এর ফলে একজন ইউজার যখন লগইন করে প্রোফাইল এপিআইতে হিট করেছিল, ক্লাউডফ্লেয়ার সেই নির্দিষ্ট ইউজারের প্রাইভেট প্রোফাইল রেসপন্সটিকে নিজের পাবলিক এজ ক্যাশে স্টোর করে নিয়েছিল এবং পরবর্তী সব ইউজারকে ওই একই ক্যাশড রেসপন্স ফিরিয়ে দিয়েছে! সমাধান: (১) মুহূর্তের মধ্যে Cloudflare ড্যাশবোর্ডে গিয়ে `Purge Everything` দিয়ে সম্পূর্ণ গ্লোবাল ক্যাশ ক্লিয়ার করতে হবে। (২) ক্যাশ রুল ঠিক করতে হবে: অথেনটিকেটেড ও এপিআই পাথে (`/api/*`, `/dashboard/*`) কঠোরভাবে `Bypass Cache` রুল বসাতে হবে। (৩) ব্যাকএন্ডে সবসময় `Cache-Control: private, no-store` হেডার এনফোর্স করতে হবে।",
      b: "ভুলবশত Cache Everything দেওয়ায় ইউজারের গোপনীয় ডেটা ক্লাউডফ্লেয়ার ক্যাশ করে সবাইকে দেখাচ্ছিল। তৎক্ষণাৎ Purge Cache দিয়ে ক্যাশ খালি করতে হবে এবং এপিআই পাথে Bypass Cache রুল বসাতে হবে।",
      e: "An aggressive 'Cache Everything' rule erroneously cached personalized authenticated HTTP responses containing sensitive user session data at the public edge. Purge the entire Cloudflare cache immediately, and configure explicit Cache Rules setting 'Bypass Cache' on all authenticated routes alongside Cache-Control: private, no-store headers.",
      tip: "কখনোই অথেনটিকেটেড এপিআই বা ড্যাশবোর্ড পাথে 'Cache Everything' বসাবে না!"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: একটি ইকমার্স ওয়েবসাইটে হঠাৎ ট্রাফিক স্পাইকে সার্ভার ক্র্যাশ করেছে। তুমি কোনো কোড বা সার্ভার পরিবর্তন না করে ক্লাউডফ্লেয়ার দিয়ে কীভাবে ২ মিনিটে সাইটকে পুনরায় জীবিত করবে?",
      m: "তাৎক্ষণিক ক্লাউডফ্লেয়ার রেসকিউ স্টেপস: (১) Cloudflare ড্যাশবোর্ডে ঢুকে `Speed > Optimization > Caching`-এ গিয়ে স্ট্যাটিক অ্যাসেট এবং পাবলিক প্রোডাক্ট ক্যাটালগের জন্য `Cache Everything` সহ `Edge Cache TTL: 2 hours` কনফিগার করব। (২) `Always Online` ফিচার অন করব—যাতে অরিজিন ডাউন থাকলেও ক্লাউডফ্লেয়ার তার এজ ক্যাশ থেকে কাস্টমারদের স্ট্যাটিক পেজ দেখাতে পারে। (৩) `Security > Bot Fight Mode` অন করব যাতে অপ্রয়োজনীয় স্ক্র্যাপার বট ট্রাফিক ড্রপ হয়। মাত্র ২ মিনিটে মূল সার্ভারে ট্রাফিক ৯০% কমে যাবে এবং সার্ভার স্বাভাবিক অবস্থায় ফিরে আসবে।",
      b: "ক্লাউডফ্লেয়ারে পাবলিক পেজে Cache Everything চালু করে এবং Always Online সক্রিয় করে ২ মিনিটে সার্ভারের লোড ৯০% কমিয়ে সাইট সচল করা যায়।",
      e: "Rescue a saturated server immediately via Cloudflare edge caching: deploy a Cache Rule for public landing and catalog routes with Cache Everything and Edge Cache TTL: 2 hours, enable Always Online to serve stale cached pages during origin distress, and toggle Bot Fight Mode to purge scraping noise.",
      tip: "বলো: 'Immediate Edge Cache Everything and Bot Fight Mode reduces origin load by 90% in 2 minutes.'"
    },

    // --- REAL WORLD (5 Questions) ---
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা (Dokani SaaS): Dokani-তে হাজার হাজার দোকানের মাল্টি-টেন্যান্ট সাবডোমেন (`*.dokani.bip.sg`) কীভাবে Cloudflare Wildcard DNS ও SSL দিয়ে ম্যানেজ করা হয়?",
      m: "দোকানি পিওএসে মার্চেন্টরা সাইন আপ করলেই নিজস্ব সাবডোমেন পায় (যেমন `aarong.dokani.bip.sg`)। আমরা প্রতি দোকানের জন্য ম্যানুয়ালি ডিএনএস রেকর্ড তৈরি করি না! সেটআপ: (১) Cloudflare-এ একটি ওয়াইল্ডকার্ড A Record তৈরি করা আছে: `*.dokani.bip.sg -> VPS_IP` (Orange Cloud Proxied)। (২) ক্লাউডফ্লেয়ারের ইউনিভার্সাল SSL স্বয়ংক্রিয়ভাবে ওয়াইল্ডকার্ড সাবডোমেনের জন্য ফ্রি SSL/TLS এনক্রিপশন সরবরাহ করে। (৩) এর ফলে নতুন ১০,০০০ দোকান সাইন আপ করলেও কোনো ডিএনএস বা এসএসএল পরিবর্তন ছাড়া ক্লাউডফ্লেয়ার মুহূর্তেই তাদের ট্রাফিক সিকিউরডভাবে প্রক্সি করে উবুন্টু Nginx সার্ভারে পৌঁছে দেয়।",
      b: "দোকানিতে ক্লাউডফ্লেয়ারে ওয়াইল্ডকার্ড A Record (*.dokani.bip.sg) এবং ইউনিভার্সাল SSL ব্যবহার করা হয়েছে। ফলে প্রতিবার নতুন দোকান খুললে কোনো ডিএনএস কনফিগারেশন ছাড়াই স্বয়ংক্রিয়ভাবে সিকিউরড সাবডোমেন চালু হয়ে যায়।",
      e: "Dokani POS handles multi-tenant subdomains via a single Cloudflare Wildcard A Record (*.dokani.bip.sg) proxied through Cloudflare's Universal SSL certificate. This architecture delivers automated SSL encryption and zero-touch DNS provisioning for thousands of onboarding merchants.",
      tip: "দোকানির এই Wildcard DNS & SSL আর্কিটেকচার ইন্টারভিউতে তোমার প্রোডাকশন দক্ষতার উজ্জ্বল উদাহরণ।"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: ক্লাউডফ্লেয়ার অরিজিন প্রোটেকশন: হ্যাকারদের থেকে অরিজিন সার্ভারের আসল আইপি গোপন রাখার প্রোডাকশন রানবুক কী?",
      m: "অরিজিন আইপি লিক হওয়া ঠেকাতে রানবুক: (১) সার্ভার থেকে সরাসরি কোনো আউটগোয়িং ইমেইল (Sendmail) পাঠাব না (কারণ ইমেইল হেডারে সার্ভারের আসল আইপি লেখা থাকে); এর বদলে SendGrid বা Amazon SES এপিআই ব্যবহার করব। (২) ডিএনএস রেকর্ডে কোনো ডিরেক্ট সাবডোমেন (যেমন `direct.dokani.com` বা `ssh.dokani.com`) আনপ্রক্সাইড রাখব না। (৩) উবুন্টু UFW ফায়ারওয়ালে কঠোর রুল বসাব: পোর্ট ৮০ ও ৪৪৩-এ শুধুমাত্র ক্লাউডফ্লেয়ারের অফিশিয়াল আইপি ব্লক ছাড়া পৃথিবীর অন্য যেকোনো আইপি থেকে কানেকশন সম্পূর্ণ ড্রপ (`DENY`) করা হবে। এর ফলে কেউ আসল আইপি জেনে ফেললেও সরাসরি পোর্টে আঘাত করতে পারবে না।",
      b: "আসল আইপি গোপন রাখতে সার্ভার থেকে সরাসরি ইমেইল না পাঠিয়ে সেন্ডগ্রিড এপিআই ব্যবহার করা হয় এবং ফায়ারওয়ালে ক্লাউডফ্লেয়ার ছাড়া বাকি সব সরাসরি আইপি কানেকশন ব্লক করে রাখা হয়।",
      e: "Prevent origin IP leaks: Never send emails directly from the web host (SMTP headers leak origin IPs; route via SendGrid/SES), scrub development subdomains from public DNS, and lock down UFW ports 80/443 strictly to Cloudflare's published IP ranges, making the origin invisible to the public internet.",
      code: "# Lock down origin port 443 strictly to Cloudflare:\nsudo ufw default deny incoming\nfor ip in $(curl -s https://www.cloudflare.com/ips-v4); do\n  sudo ufw allow from $ip to any port 443 proto tcp\ndone"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: Cloudflare R2 Object Storage বনাম AWS S3: ই-কমার্স ও SaaS অ্যাপ্লিকেশনে ইমেজ স্টোরেজ খরচে কেন R2 সেরা?",
      m: "AWS S3-তে সবচেয়ে বড় খরচের ফাঁদ হলো 'Data Egress Fees' (প্রতি গিগাবাইট ডাউনলোডে প্রায় $০.০৯ ডলার চার্জ)। যদি একটি ই-কমার্স সাইটে প্রতিদিন লক্ষ লক্ষ মানুষ প্রোডাক্ট ইমেজ দেখে এবং ১০ টেরাবাইট ডেটা ডাউনলোড হয়, তবে AWS শুধুমাত্র ব্যান্ডউইথ বিল পাঠাবে $৯০০ ডলার! `Cloudflare R2` হলো একটি S3-কমপ্যাটিবল অবজেক্ট স্টোরেজ যার সবচেয়ে বড় বৈপ্লবিক সুবিধা: `Zero Egress Fees (ব্যান্ডউইথ সম্পূর্ণ ফ্রি!)`। আপনি শত টেরাবাইট ইমেজ বা ফাইল ডাউনলোড করলেও ব্যান্ডউইথের জন্য ১ সেন্টও চার্জ দিতে হয় না, শুধু সামান্য স্টোরেজ ফি ($০.০১৫/GB) দিতে হয়। এটি ইমেজ-হেভি অ্যাপ্লিকেশনে ক্লাউড খরচ ৯০% কমিয়ে দেয়।",
      b: "AWS S3 তে ব্যান্ডউইথ বা ডাউনলোডের জন্য প্রচুর চার্জ কাটে। Cloudflare R2 এর সবচেয়ে বড় সুবিধা হলো এতে ব্যান্ডউইথ সম্পূর্ণ ফ্রি (Zero Egress Fees)। ফলে লাখ লাখ প্রোডাক্ট ইমেজের স্টোরেজ খরচ প্রায় শূন্যে নেমে আসে।",
      e: "AWS S3 penalizes high-traffic applications with punitive data egress fees ($0.09/GB). Cloudflare R2 provides an S3-compatible API with zero egress fees, charging solely for storage volume ($0.015/GB-mo), reducing media asset hosting costs for image-heavy SaaS applications by over 90%.",
      tip: "বলো: 'Cloudflare R2 eliminates S3 egress tax with zero egress fees, slashing media storage costs by 90%.'"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: জিরো-ডাউনটাইম ফ্রন্টএন্ড ডেপ্লয়মেন্টে Cloudflare Cache Purging API কীভাবে অটোমেট করবে?",
      m: "নতুন ফ্রন্টএন্ড কোড ডেপ্লয় করার পর যদি ক্লাউডফ্লেয়ারের পুরানো JS/CSS ফাইল ক্যাশে থেকে যায়, তবে ক্লায়েন্টরা ব্রোকেন পেজ বা পুরনো ইন্টারফেস দেখতে পাবে। সমাধান: GitHub Actions CI/CD পাইপলাইনে ডেপ্লয়মেন্ট সফল হওয়ার ঠিক পরের স্টেপে আমরা একটি `curl` কমান্ড দিয়ে Cloudflare Cache Purge API কল করি। আমরা পুরো ক্যাশ ড্রপ না করে শুধুমাত্র পরিবর্তিত ফাইলগুলো (`purge_by_prefixes` বা `files`) টার্গেট করে পার্জ করি। মাত্র ৫০০ মিলিসেকেন্ডে বিশ্বব্যাপী ৩০০+ ডেটাসেন্টারের ক্যাশ ক্লিয়ার হয়ে যায় এবং সমস্ত ইউজার তৎক্ষণাৎ নতুন ফ্রেশ ইন্টারফেস দেখতে পায়।",
      b: "নতুন কোড ডেপ্লয় শেষে সিআই/সিডি স্ক্রিপ্ট স্বয়ংক্রিয়ভাবে ক্লাউডফ্লেয়ার পার্জ এপিআই কল করে। ফলে বিশ্বজুড়ে ক্লাউডফ্লেয়ারের এজ ক্যাশ খালি হয়ে যায় এবং ইউজাররা সাথে সাথে নতুন ভার্সন দেখতে পায়।",
      e: "Automate cache invalidation in CI/CD pipelines via Cloudflare's Purge Cache REST API. Triggered immediately after deployment, the API invalidates compiled HTML and entry JS chunks globally in sub-second time, ensuring users instantly receive the latest deployment.",
      code: "- name: Purge Cloudflare Cache\n  run: |\n    curl -X POST \"https://api.cloudflare.com/client/v4/zones/${{ secrets.CF_ZONE_ID }}/purge_cache\" \\\n      -H \"Authorization: Bearer ${{ secrets.CF_API_TOKEN }}\" \\\n      -H \"Content-Type: application/json\" \\\n      --data '{\"purge_everything\":true}'"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: Cloudflare Security Analytics ড্যাশবোর্ড বিশ্লেষণ করে কীভাবে সাইটের থ্রেট পোস্টার পর্যালোচনা করবে?",
      m: "আমরা প্রতি সপ্তাহে Cloudflare-এর Security ও Analytics ড্যাশবোর্ড অডিট করি: (১) `Threats Mitigated`: গত সপ্তাহে কতগুলো ক্ষতিকর বট, SQL ইনজেকশন বা XSS রিকোয়েস্ট WAF ব্লক করেছে। (২) `Top Traffic Countries`: স্বাভাবিক বিজনেসের বাইরের কোনো অঞ্চল থেকে অস্বাভাবিক ট্রাফিক স্পাইক আছে কি না। (৩) `Bandwidth Savings`: মোট ট্রাফিকের কত শতাংশ (যেমন ৮৫%) ক্লাউডফ্লেয়ার এজ ক্যাশ থেকে সার্ভ হয়েছে এবং কত শতাংশ অরিজিনে গেছে। (৪) `Rate Limit Hits`: কোন এপিআইতে সবচেয়ে বেশি রেট লিমিট ট্রিগার হয়েছে। এই মেট্রিক্সগুলো পর্যবেক্ষণ করে আমরা ফায়ারওয়াল রুলস টিউন করি এবং সিস্টেমের সার্বিক সাইবার নিরাপত্তা সুদৃঢ় রাখি।",
      b: "ক্লাউডফ্লেয়ার ড্যাশবোর্ডে প্রতি সপ্তাহে ব্লক হওয়া থ্রেট, সিডিএন ক্যাশ সেভিংস (৮৫%+) এবং অস্বাভাবিক ট্রাফিক স্পাইক পর্যবেক্ষণ করে ফায়ারওয়াল পলিসি টিউন করা হয় এবং সাইবার নিরাপত্তা নিশ্চিত রাখা হয়।",
      e: "Perform weekly operational reviews of Cloudflare Security Analytics: audit WAF mitigation event logs, track geographical traffic variance, evaluate edge cache hit ratios (>85%), and tune rate limiting thresholds based on real-world traffic profiles to maintain defensive posture.",
      tip: "বলো: 'We track edge cache hit ratios and WAF mitigation telemetry weekly to continuously tune security postures.'"
    }
  ]
};
