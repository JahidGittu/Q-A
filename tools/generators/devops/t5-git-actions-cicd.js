// Topic 5: Git, GitHub & GitHub Actions CI/CD (25 Questions: 5 lvl1, 5 lvl2, 5 lvl3, 5 situation, 5 realworld)
module.exports = {
  id: "git-actions-cicd",
  name: "Git, GitHub & GitHub Actions CI/CD Automation",
  desc: "Trunk-based vs GitFlow, GitHub Actions Workflows, Automated CI Testing, Automated VPS Deploy via SSH, Secrets, Branch Protection",
  items: [
    // --- LEVEL 1 (5 Questions) ---
    {
      lvl: "lvl1",
      q: "CI/CD কী এবং আধুনিক সফটওয়্যার ডেভেলপমেন্টে Continuous Integration ও Continuous Deployment কেন অপরিহার্য?",
      m: "CI/CD হলো কোড ইন্টিগ্রেশন ও রিলিজ প্রক্রিয়া স্বয়ংক্রিয় করার আধুনিক মেথডোলজি। (১) `Continuous Integration (CI)`: ডেভেলপাররা প্রতিদিন গিটহাবে কোড পুশ করার সাথে সাথে স্বয়ংক্রিয়ভাবে বিল্ড, লিন্টিং এবং টেস্ট রান করে যাচাই করা যে নতুন কোড বিদ্যমান সিস্টেমে কোনো বাগ বা ব্রেকিং চেঞ্জ তৈরি করেছে কি না। (২) `Continuous Deployment (CD)`: সিআই টেস্ট সফলভাবে পাস হলে কোনো মানুষের ম্যানুয়াল হস্তক্ষেপ ছাড়াই স্বয়ংক্রিয়ভাবে প্রোডাকশন সার্ভারে (VPS / Vercel) নতুন কোড ডিপ্লয় করে দেওয়া। এটি রিলিজ সাইকেলকে কয়েক সপ্তাহ থেকে নামিয়ে কয়েক মিনিটে নিয়ে আসে এবং বাগ দ্রুত ধরা পড়ে।",
      b: "সিআই হলো কোড পুশ করার সাথে সাথে স্বয়ংক্রিয়ভাবে টেস্ট ও বিল্ড যাচাই করা। আর সিডি হলো টেস্ট সফল হলে কোড সরাসরি লাইভ সার্ভারে ডিপ্লয় করা। এটি ডেভেলপমেন্টের গতি বাড়ায় এবং ম্যানুয়াল ভুলের ঝুঁকি পুরোপুরি দূর করে।",
      e: "Continuous Integration (CI) automatically builds, lints, and executes automated test suites on every Git push to catch regressions early. Continuous Deployment (CD) automates the delivery of validated code directly to production environments (VPS/cloud), reducing release cycles from weeks to minutes.",
      tip: "বলো: 'CI guarantees code quality via automated tests; CD eliminates human error by automating production delivery.'"
    },
    {
      lvl: "lvl1",
      q: "GitHub Actions কী এবং এর মূল উপাদানগুলো (Workflow, Event, Job, Step, Action) কীভাবে সম্পর্কিত?",
      m: "GitHub Actions হলো গিটহাবের নিজস্ব বিল্ট-ইন CI/CD প্ল্যাটফর্ম। এর হায়ারার্কি: (১) `Workflow`: একটি সম্পূর্ণ স্বয়ংক্রিয় প্রসেস যা `.github/workflows/` ফোল্ডারে একটি YAML ফাইল দিয়ে ডিফাইন করা হয়। (২) `Event`: যে ট্রিগার ওয়ার্কফ্লো শুরু করে (যেমন `on: [push, pull_request]`)। (৩) `Job`: ওয়ার্কফ্লোর ভেতরে একাধিক জব থাকতে পারে (যেমন `lint`, `test`, `deploy`) যা ডিফল্টভাবে সমান্তরালে (Parallel) অথবা ডিপেনডেন্সি ক্রমে চলে। (৪) `Step`: একটি জবের ভেতরের ক্রমানুসারে চলা এক একটি টাস্ক বা শেল কমান্ড। (৫) `Action`: কমিউনিটি বা নিজের তৈরি করা পুনর্ব্যবহারযোগ্য প্লাগইন (যেমন `actions/checkout@v4`)।",
      b: "গিটহাব অ্যাকশনস হলো গিটহাবের অটোমেশন প্ল্যাটফর্ম। ইভেন্ট (যেমন পুশ বা পিআর) ওয়ার্কফ্লো ট্রিগার করে; ওয়ার্কফ্লোর ভেতরে এক বা একাধিক জব থাকে; জবের ভেতরে স্টেপ এবং অ্যাকশনগুলো ক্রমানুসারে কমান্ড এক্সিকিউট করে।",
      e: "GitHub Actions architecture: An Event (push/pull_request) triggers a declarative Workflow (.github/workflows/*.yml). The workflow coordinates Jobs (which run on isolated virtual runners in parallel or sequentially). Jobs contain sequential Steps that invoke reusable Actions or raw shell scripts.",
      code: "name: CI Pipeline\non: [push, pull_request]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm test"
    },
    {
      lvl: "lvl1",
      q: "Trunk-Based Development বনাম GitFlow-এর মধ্যে পার্থক্য কী এবং স্টার্টআপ বা ফাস্ট-মুভিং টিমে কোনটি বেশি জনপ্রিয়?",
      m: "(১) `GitFlow`: এতে জটিল ও দীর্ঘজীবী ব্রাঞ্চ থাকে (`main`, `develop`, `release/*`, `feature/*`, `hotfix/*`)। ফিচার শেষ হতে সপ্তাহ কেটে যায় এবং যখন সব ব্রাঞ্চ মার্জ করা হয়, তখন দানবীয় 'Merge Hell' ও কনফ্লিক্ট তৈরি হয় (বড় এন্টারপ্রাইজ রিলিজ ট্রেনের জন্য ব্যবহৃত)। (২) `Trunk-Based Development` (স্টার্টআপ ও আধুনিক ফাস্ট-মুভিং টিমের স্ট্যান্ডার্ড): সবাই একটি একক মূল ব্রাঞ্চে (`main` বা trunk) কাজ করে। ডেভেলপাররা অতি ক্ষুদ্র ব্রাঞ্চ বানিয়ে দিনে ১-২ বার পিআর দিয়ে মেইনে মার্জ করে এবং বড় ফিচারের ক্ষেত্রে Feature Flags ব্যবহার করে। ফলে কোনো মার্জ কনফ্লিক্ট থাকে না এবং প্রতিদিন প্রোডাকশনে মাল্টিপল রিলিজ সম্ভব হয়।",
      b: "গিটফ্লোতে একাধিক জটিল ব্রাঞ্চ থাকে যা মার্জ কনফ্লিক্ট বাড়ায়। ট্রাঙ্ক-বেসড পদ্ধতিতে সবাই সরাসরি মেইন ব্রাঞ্চে ছোট ছোট কমিট দিয়ে দিনে একাধিকবার কোড মার্জ করে। আধুনিক টিমে দ্রুত কোড ডেলিভারির জন্য ট্রাঙ্ক-বেসড মেথড সবচেয়ে জনপ্রিয়।",
      e: "GitFlow relies on long-lived branches (develop, release, hotfix), frequently resulting in painful merge conflicts. Trunk-Based Development standardizes on a single shared trunk (main), where developers merge small, short-lived feature branches multiple times daily using Feature Flags, optimizing velocity and eliminating merge hell.",
      tip: "বলো: 'Trunk-based development with short-lived branches and feature flags is the modern elite engineering standard.'"
    },
    {
      lvl: "lvl1",
      q: "GitHub Actions-এ Repository Secrets কী এবং কেন কখনোই কোডের ভেতরে API Key বা SSH Key হার্ডকোড করা যাবে না?",
      m: "গিটহাবে কোড পাবলিক বা প্রাইভেট রিপোজিটরিতে থাকলে কোনো এপিআই কি বা ডাটাবেজ পাসওয়ার্ড কোডে রাখা মানেই তা যেকোনো সময় লিক হয়ে যাওয়া। `GitHub Secrets` হলো গিটহাবের এনক্রিপ্টেড সিক্রেট ভল্ট (`Settings > Secrets and variables > Actions`)। এটি NaCL পাবলিক-কি ক্রিপ্টোগ্রাফি দিয়ে সম্পূর্ণ এনক্রিপ্ট হয়ে থাকে। ওয়ার্কফ্লো ফাইলে এটি `${{ secrets.PROD_SSH_KEY }}` হিসেবে রেফারেন্স করা যায়। গিটহাব স্বয়ংক্রিয়ভাবে সিআই কনসোল লগে সিক্রেটগুলোকে মাস্ক (`***`) করে রাখে যাতে ভুলেও লগ স্ক্রিনে পাসওয়ার্ড দেখা না যায়।",
      b: "গিটহাব সিক্রেটসে পাসওয়ার্ড ও এপিআই কি এনক্রিপ্টেড অবস্থায় সুরক্ষিত থাকে। কোডে পাসওয়ার্ড রাখা সম্পূর্ণ নিষিদ্ধ। ওয়ার্কফ্লোতে ${{ secrets.SECRET_NAME }} দিয়ে নিরাপদে সিক্রেট ব্যবহার করা হয় যা কনসোল লগে মাস্ক থাকে।",
      e: "Repository Secrets store sensitive credentials (SSH keys, API tokens) encrypted via libsodium sealed boxes. Workflows inject them at runtime as environment variables (${{ secrets.AWS_SECRET_KEY }}). GitHub automatically masks secret strings with asterisks (***) in console execution logs to prevent leakage.",
      code: "- name: Deploy to VPS\n  env:\n    SSH_KEY: ${{ secrets.SERVER_SSH_PRIVATE_KEY }}\n  run: echo \"$SSH_KEY\" > key.pem"
    },
    {
      lvl: "lvl1",
      q: "GitHub Branch Protection Rules কী এবং কেন প্রোডাকশন `main` ব্রাঞ্চে সরাসরি পুশ ব্লক করা আবশ্যক?",
      m: "Branch Protection Rules হলো এমন সিকিউরিটি পলিসি যা মূল ব্রাঞ্চে কোডের অখণ্ডতা রক্ষা করে। যদি কোনো ডেভেলপার ভুলবশত বা অসাবধানতায় লোকাল মেশিন থেকে `git push origin main` চালায় (বা কোনো ব্রোকেন কোড পুশ করে), পুরো প্রোডাকশন সাইট সাথে সাথে ক্র্যাশ করবে! রুলসে আমরা সেট করি: (১) `Require a pull request before merging` (সরাসরি পুশ সম্পূর্ণ নিষিদ্ধ), (২) `Require approvals` (কমপক্ষে ১ জন সিনিয়র ইঞ্জিনিয়ারের কোড রিভিউ অনুমোদন আবশ্যক), (৩) `Require status checks to pass before merging` (সিআই টেস্ট ও লিন্ট পাস না করলে মার্জ বাটন ডিজেবল থাকবে)।",
      b: "ব্রাঞ্চ প্রটেকশন রুল দিয়ে মেইন ব্রাঞ্চে সরাসরি পুশ ব্লক করা হয়। এর ফলে যেকোনো কোড মেইনে আসতে হলে অবশ্যই পুল রিকোয়েস্ট (PR), সিনিয়রের রিভিউ অ্যাপ্রুভাল এবং সিআই টেস্ট পাস করা বাধ্যতামূলক থাকে।",
      e: "Branch Protection Rules protect the integrity of the main trunk. Disallowing direct pushes mandates that changes arrive exclusively via Pull Requests, requiring at least one peer approval and enforcing green CI status checks before enabling the merge button.",
      tip: "মনে রাখবে: 'Enforcing branch protection rules with required CI status checks prevents untested code from reaching production.'"
    },

    // --- LEVEL 2 (5 Questions) ---
    {
      lvl: "lvl2",
      q: "GitHub Actions ব্যবহার করে উবুন্টু VPS সার্ভারে অটোমেটেড SSH ডেপ্লয়মেন্ট ওয়ার্কফ্লো কীভাবে তৈরি করবে?",
      m: "আমরা `appleboy/ssh-action` বা নেটিভ SSH স্ক্রিপ্ট ব্যবহার করি। সেটআপ: (১) সার্ভারের জন্য একটি ডেডিকেটেড SSH কি তৈরি করে প্রাইভেট কি-টি গিটহাব সিক্রেটসে (`VPS_SSH_KEY`) রাখি। (২) ওয়ার্কফ্লো YAML-এ `deploy` জবে ডিফাইন করি: সার্ভারের হোস্ট আইপি, ইউজার এবং কি। (৩) `script` সেকশনে লিনাক্স কমান্ডগুলো ক্রমানুসারে দিই: `cd /var/www/dokani`, `git pull origin main`, `npm ci`, `npx prisma migrate deploy`, `npm run build`, এবং `pm2 reload ecosystem.config.js --update-env`। ডেভেলপার যখনই কোনো পিআর মেইনে মার্জ করবে, গিটহাব স্বয়ংক্রিয়ভাবে সার্ভারে SSH করে সম্পূর্ণ ডিপ্লয়মেন্ট সম্পন্ন করবে কোনো ম্যানুয়াল হস্তক্ষেপ ছাড়াই!",
      b: "appleboy/ssh-action ব্যবহার করে গিটহাব সিক্রেটসের SSH কি দিয়ে সার্ভারে কানেক্ট করা হয়। এরপর git pull, npm ci, prisma migrate এবং pm2 reload স্ক্রিপ্ট চালিয়ে সেকেন্ডের মধ্যে অটো-ডিপ্লয় সম্পন্ন হয়।",
      e: "Automate VPS deployment using appleboy/ssh-action. The workflow connects securely using an SSH private key stored in GitHub Secrets, executing commands sequentially: git pull origin main, npm ci, prisma migrate deploy, build, and pm2 reload --update-env.",
      code: "- name: Execute Remote SSH Deploy\n  uses: appleboy/ssh-action@v1.0.3\n  with:\n    host: ${{ secrets.SERVER_HOST }}\n    username: ${{ secrets.SERVER_USER }}\n    key: ${{ secrets.SERVER_SSH_KEY }}\n    script: |\n      cd /var/www/dokani\n      git pull origin main\n      npm ci\n      npx prisma migrate deploy\n      npm run build\n      pm2 reload ecosystem.config.js --update-env"
    },
    {
      lvl: "lvl2",
      q: "GitHub Actions-এ ডিপেনডেন্সি ও বিল্ড ক্যাশিং (`actions/cache` ও `actions/setup-node`) কীভাবে সিআই রান টাইম ৫ মিনিট থেকে ৩০ সেকেন্ডে নামিয়ে আনে?",
      m: "প্রতিটি সিআই জবে প্রতিবার `npm install` চালালে ইন্টারনেটের এনপিএম রেজিস্ট্রি থেকে শত শত মেগাবাইট প্যাকেজ ফ্রেশ ডাউনলোড হয় যা প্রচুর সময় নষ্ট করে। সমাধান: `actions/setup-node@v4`-এ `cache: 'npm'` এনাবল করা অথবা `actions/cache` প্লাগইন ব্যবহার করা। এটি `package-lock.json`-এর হ্যাশ কি দিয়ে সম্পূর্ণ `~/.npm` গ্লোবাল ক্যাশ সংরক্ষণ করে। পরবর্তী যে কোনো কমিটে যদি প্যাকেজ লকে পরিবর্তন না হয়, তবে গিটহাব ক্লাউড ক্যাশ থেকে মাত্র ২ সেকেন্ডে ডিপেনডেন্সি রিস্টোর করে নেয়—ফলে সিআই পাইপলাইন অবিশ্বাস্য দ্রুতগতিতে শেষ হয়।",
      b: "actions/setup-node এ cache: 'npm' ব্যবহার করলে প্রতিবার নতুন করে প্যাকেজ ডাউনলোড না হয়ে ক্লাউড ক্যাশ থেকে নিমেষে ডিপেনডেন্সি লোড হয়। এতে সিআই রান টাইম ৫ মিনিট থেকে ৩০ সেকেন্ডে নেমে আসে।",
      e: "Downloading node_modules on every ephemeral runner wastes precious CI runner minutes. Enabling cache: 'npm' inside actions/setup-node hashes package-lock.json and caches npm tarballs between runs, slashing workflow execution times from 5 minutes to 30 seconds.",
      code: "- uses: actions/setup-node@v4\n  with:\n    node-version: 20\n    cache: 'npm'\n- run: npm ci"
    },
    {
      lvl: "lvl2",
      q: "GitHub Actions CI পাইপলাইনে Pull Request-এ স্বয়ংক্রিয়ভাবে Jest এবং Playwright টেস্ট কীভাবে রান করবে?",
      m: "আমরা একটি ডেডিকেটেড `ci.yml` ওয়ার্কফ্লো তৈরি করি যা `on: pull_request` ইভেন্টে ট্রিগার হয়। এতে ৩টি গুরুত্বপূর্ণ স্টেপ থাকে: (১) `npm run lint` (ESLint দিয়ে কোড স্টাইল ভ্যালিডেশন), (২) `npm run test` (Jest দিয়ে ইউনিট ও ইন্টিগ্রেশন টেস্ট রান করা), (৩) `npx playwright test` (ব্রাউজার এন্ড-টু-এন্ড টেস্ট চালানো)। কোনো একটি টেস্ট ফেইল করলে গিটহাব পুরো জবটিকে রেড মার্ক করে দেবে এবং ব্রাঞ্চ প্রটেকশনের কারণে পিআর মার্জ বাটন স্বয়ংক্রিয়ভাবে লক হয়ে থাকবে—কোনো ডেভেলপার ব্রোকেন কোড প্রোডাকশনে পাঠাতে পারবে না।",
      b: "পিআর ওপেন হলে সিআই ওয়ার্কফ্লো স্বয়ংক্রিয়ভাবে লিন্ট, জেস্ট টেস্ট এবং প্লে-রাইট ই২ই টেস্ট রান করে। কোনো টেস্ট ব্যর্থ হলে মার্জ বাটন লক হয়ে যায়, ফলে বাগযুক্ত কোড সার্ভারে যাওয়া শতভাগ বন্ধ থাকে।",
      e: "A pull-request CI workflow triggers on: pull_request to execute static lint checks, Jest unit suites, and Playwright end-to-end tests against ephemeral runners. Passing all checks is required by branch protection rules to unlock the PR merge capability.",
      code: "name: Quality Gate\non: pull_request\njobs:\n  audit:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with: { node-version: 20, cache: 'npm' }\n      - run: npm ci\n      - run: npm run lint\n      - run: npm test\n      - run: npx playwright test"
    },
    {
      lvl: "lvl2",
      q: "GitHub Actions Matrix Builds কী এবং কেন এটি ক্রস-প্ল্যাটফর্ম ও মাল্টি-ভার্সন টেস্টিংয়ে ব্যবহৃত হয়?",
      m: "Matrix Build হলো একটি শক্তিশালী ফিচার যা একক জব ডেফিনিশন থেকে একাধিক ভ্যারিয়েন্টের সমান্তরাল জব তৈরি করে। যেমন: আপনি নিশ্চিত করতে চান যে আপনার ব্যাকএন্ড নোড.জেএস-এর ১৮, ২০ এবং ২২ ভার্সনে নির্বিঘ্নে চলবে। ম্যাট্রিক্স কনফিগে ডিফাইন করব: `strategy: { matrix: { node: [18, 20, 22] } }`। গিটহাব সাথে সাথে সমান্তরালে ৩টি আলাদা ভার্চুয়াল মেশিন স্পন করবে এবং প্রতিটিতে ভিন্ন ভিন্ন নোড ভার্সন দিয়ে একই সাথে টেস্ট রান করবে। ওপেন-সোর্স লাইব্রেরি বা ক্রস-ওএস (Ubuntu, MacOS, Windows) টেস্টিংয়ে এটি অপরিহার্য।",
      b: "ম্যাট্রিক্স বিল্ড একই সাথে একাধিক নোড ভার্সন (১৮, ২০, ২২) বা অপারেটিং সিস্টেমে সমান্তরালে টেস্ট রান করার সুবিধা দেয়। এটি নিশ্চিত করে যে কোড সব পরিবেশে সমানভাবে কার্যকরী।",
      e: "Matrix builds spawn parallel matrix jobs combining configured parameters (e.g. testing across Node.js 18, 20, and 22 or Ubuntu/macOS runners simultaneously). This guarantees cross-runtime compatibility without writing redundant individual workflows.",
      code: "strategy:\n  matrix:\n    node-version: [18.x, 20.x, 22.x]\nsteps:\n  - uses: actions/setup-node@v4\n    with:\n      node-version: ${{ matrix.node-version }}"
    },
    {
      lvl: "lvl2",
      q: "GitHub Environments এবং Environment Protection Rules কী এবং প্রোডাকশন ডিপ্লয়মেন্ট অনুমোদনে কীভাবে ব্যবহৃত হয়?",
      m: "GitHub Environments দিয়ে আমরা কোড ডিপ্লয়মেন্ট টার্গেটগুলোকে ভাগ করি (যেমন `staging` এবং `production`)। প্রতিটি এনভায়রনমেন্টের জন্য আলাদা আলাদা সিক্রেট থাকে (স্টেজিং ডিবি পাসওয়ার্ড বনাম প্রডাকশন ডিবি পাসওয়ার্ড)। সবচেয়ে চমৎকার ফিচার হলো `Environment Protection Rules`: প্রোডাকশন এনভায়রনমেন্টে `Required Reviewers` কনফিগার করা যায়। ফলে সিআই টেস্ট পাস করার পর ডিপ্লয়মেন্ট শুরু হওয়ার আগে গিটহাব টেক লিড বা প্রজেক্ট ম্যানেজারের কাছে ম্যানুয়াল অ্যাপ্রুভাল চেয়ে অপেক্ষা করবে। ম্যানেজার নোটিফিকেশনে 'Approve' চাপলে তবেই প্রোডাকশন সার্ভারে ডিপ্লয় স্ক্রিপ্ট এক্সিকিউট হবে।",
      b: "গিটহাব এনভায়রনমেন্ট দিয়ে স্টেজিং ও প্রোডাকশনের সিক্রেট আলাদা রাখা হয়। প্রোডাকশনে ম্যানুয়াল অ্যাপ্রুভাল রুল সেট করলে টিম লিড অনুমোদন না দেওয়া পর্যন্ত স্বয়ংক্রিয় ডিপ্লয়মেন্ট আটকে থাকে।",
      e: "GitHub Environments isolate environment-specific secrets (Staging vs Production) and enforce Environment Protection Rules. Requiring designated engineering leads to approve production deployments inserts a secure manual gate before pipeline execution on live systems.",
      code: "jobs:\n  deploy-prod:\n    runs-on: ubuntu-latest\n    environment: production # Mandates approval rule"
    },

    // --- LEVEL 3 (5 Questions) ---
    {
      lvl: "lvl3",
      q: "Docker Container CI/CD: গিটহাব অ্যাকশনস দিয়ে Docker Image বিল্ড, Docker Hub / GHCR-এ পুশ এবং VPS-এ পুল করে জিরো-ডাউনটাইম ডিপ্লয় কীভাবে করবে?",
      m: "আমরা আধুনিক কন্টেইনারাইজড সিআই/সিডি ফ্লো তৈরি করি: (১) কোড পুশ হলে গিটহাব রানার `docker/build-push-action` দিয়ে ডকার ইমেজ বিল্ড করে। (২) গিটহাবের সিক্রেট ব্যবহার করে ইমেজটিকে GitHub Container Registry (ghcr.io) বা Docker Hub-এ পুশ করে এবং গিটের ইউনিক SHA হ্যাশ দিয়ে ট্যাগ করে (`ghcr.io/org/dokani:${{ github.sha }}`)। (৩) এরপর রানার SSH দিয়ে VPS সার্ভারে কানেক্ট করে। (৪) VPS সার্ভারে `docker-compose.prod.yml` ফাইলে নতুন ইমেজ ট্যাগ আপডেট করে `docker compose pull && docker compose up -d --remove-orphans` চালায়। কন্টেইনার রোলিং আপডেটের মাধ্যমে সাইটে কোনো ডাউনটাইম ছাড়াই নতুন রিলিজ লাইভ হয়ে যায়।",
      b: "গিটহাব রানারে ডকার ইমেজ বিল্ড করে ghcr.io তে পুশ করা হয়। এরপর SSH দিয়ে সার্ভারে ঢুকে docker compose pull ও up -d কমান্ড চালিয়ে সেকেন্ডের মধ্যে নতুন কন্টেইনার আপডেট করা হয়।",
      e: "Build and push production container images to GitHub Container Registry (ghcr.io) tagged with immutable commit SHAs. Over SSH, trigger the VPS to pull the newly published image tag and execute docker compose up -d, achieving predictable immutable container rollouts.",
      code: "- name: Build & Push Docker image\n  uses: docker/build-push-action@v5\n  with:\n    context: .\n    push: true\n    tags: ghcr.io/dokani/api:${{ github.sha }}"
    },
    {
      lvl: "lvl3",
      q: "GitHub Actions Security: 'Pwn Request' এবং Untrusted Pull Request থেকে সিক্রেট চুরির ঝুঁকি কীভাবে প্রতিহত করবে?",
      m: "যদি কোনো পাবলিক ওপেন-সোর্স প্রজেক্টে `on: pull_request_target` ভুলভাবে ব্যবহার করা হয় এবং কোনো ফোকার তার পিআর-এ ক্ষতিকর স্ক্রিপ্ট যোগ করে (যেমন `echo $PROD_SECRET`), তবে সে আপনার প্রোডাকশন সিক্রেট চুরি করতে পারে! ডিফেন্স রুলস: (১) বাইরের বা অপরিচিত পিআরের জন্য সবসময় স্ট্যান্ডার্ড `on: pull_request` ব্যবহার করতে হবে—গিটহাব স্বয়ংক্রিয়ভাবে কোনো সিক্রেটকে ফোর্কড পিআরে অ্যাক্সেস দেয় না। (২) কোনো পিআরের কোড রান করার আগে সিক্রেট ইনজেক্ট করা সম্পূর্ণ নিষিদ্ধ। (৩) `permissions` ব্লকে ওয়ার্কফ্লোর পারমিশন কঠোরভাবে মিনিমাল (যেমন `contents: read`) সীমাবদ্ধ রাখতে হবে (Principle of Least Privilege)।",
      b: "বাইরের পিআর যাতে সিক্রেট চুরি করতে না পারে সেজন্য pull_request_target এর বদলে pull_request ব্যবহার করতে হয় এবং ফোর্কড রিপোজিটরিতে সিক্রেট এক্সেস বন্ধ রাখতে হয়। পারমিশন সবসময় contents: read এ সীমাবদ্ধ রাখতে হয়।",
      e: "Defend against 'Pwn Request' vulnerabilities by avoiding pull_request_target on untrusted forks, which exposes repository secrets to untrusted code. Enforce least-privilege workflow permissions: contents: read and ensure fork PRs never inherit production deployment secrets.",
      code: "permissions:\n  contents: read\n  pull-requests: write"
    },
    {
      lvl: "lvl3",
      q: "CI/CD-তে Database Migration Automation: স্কিমা মাইগ্রেশন কি সিআই বিল্ড স্টেপে চালাবে নাকি সার্ভার ডেপ্লয় স্টেপে?",
      m: "মারাত্মক আর্কিটেকচারাল সিদ্ধান্ত: ডেটাবেজ মাইগ্রেশন কখনোই সিআই বিল্ড বা টেস্ট স্টেজে প্রোডাকশন ডেটাবেজের ওপর চালানো যাবে না! কারণ সিআই রানার শুধুমাত্র টেস্ট করার জন্য। সঠিক প্যাটার্ন: (১) সিআই স্টেজে একটি সাময়িক লোকাল ডকার ডেটাবেজের ওপর মাইগ্রেশন চালিয়ে যাচাই করা যে মাইগ্রেশনে কোনো সিনট্যাক্স এরর বা কনফ্লিক্ট নেই। (২) টেস্ট পাস হওয়ার পর সিডি (Deployment) স্টেজে যখন সার্ভারে নতুন কোড পৌঁছাবে, অ্যাপ রিস্টার্ট বা রিলোড হওয়ার ঠিক আগের ধাপে প্রোডাকশন মাইগ্রেশন চালাতে হবে: `npx prisma migrate deploy`। এটি নিশ্চিত করে যে কোড ও ডাটাবেজ স্কিমা শতভাগ সিঙ্ক্রোনাইজড থাকে।",
      b: "সিআই টেস্টের সময় শুধু টেস্ট ডাটাবেজে মাইগ্রেশন পরীক্ষা করতে হয়। প্রোডাকশন ডাটাবেজে মাইগ্রেশন চালাতে হয় ডেপ্লয়মেন্টের সময় অ্যাপ রিলোড হওয়ার ঠিক আগের মুহূর্তে (prisma migrate deploy)।",
      e: "Never run production migrations during general CI testing. Test migration validity against an ephemeral Docker PostgreSQL service during CI; execute production migrations (npx prisma migrate deploy) strictly during the CD phase immediately preceding application reloads.",
      tip: "বলো: 'Test migrations on ephemeral test containers in CI; deploy them to production in CD immediately prior to app reload.'"
    },
    {
      lvl: "lvl3",
      q: "GitHub Actions Concurrency Control (`concurrency` group): ডুপ্লিকেট ডেপ্লয়মেন্ট ও রেস কন্ডিশন কীভাবে বন্ধ করবে?",
      m: "যদি একজন ডেভেলপার মেইনে পুশ করার ৩০ সেকেন্ড পর অন্য একজন ডেভেলপার আবার পুশ করে, তবে দুটি ডেপ্লয়মেন্ট জব একই সময়ে সমান্তরালে সার্ভারে চলবে এবং একে অপরের ফাইল ওভাররাইট করে সার্ভার ক্র্যাশ করাবে! সমাধান: ওয়ার্কফ্লো ফাইলে `concurrency` গ্রুপ কনফিগার করা: `concurrency: { group: 'production_deploy', cancel-in-progress: false }`। এর ফলে গিটহাব নিশ্চিত করে যে প্রোডাকশনে সবসময় একটি মাত্র ডেপ্লয়মেন্ট স্ক্রিপ্ট এক্সিকিউট হবে; দ্বিতীয় পুশটি কিউতে অপেক্ষা করবে যতক্ষণ না প্রথম ডেপ্লয়মেন্ট নিরাপদে শেষ হয়। আর পিআর টেস্টের ক্ষেত্রে `cancel-in-progress: true` দিয়ে পুরনো টেস্ট স্বয়ংক্রিয়ভাবে বাতিল করে সিআই বিল্ড টাইম বাঁচানো যায়।",
      b: "একসাথে একাধিক ডেপ্লয়মেন্ট যাতে সার্ভারে কনফ্লিক্ট তৈরি না করে সেজন্য concurrency: group কনফিগার করা হয়। এটি নিশ্চিত করে একটি ডেপ্লয়মেন্ট শেষ হওয়ার পরই কেবল পরবর্তীটি শুরু হবে।",
      e: "Multiple rapid commits can launch concurrent deployment jobs that race and corrupt server files. Setting concurrency: group: production_deploy with cancel-in-progress: false enforces serialized execution on production, while cancel-in-progress: true saves runner minutes on PR checks.",
      code: "concurrency:\n  group: prod-deployment\n  cancel-in-progress: false"
    },
    {
      lvl: "lvl3",
      q: "Automated Rollback Strategy: GitHub Actions ডেপ্লয়মেন্ট ফেইল করলে কীভাবে স্বয়ংক্রিয়ভাবে পূর্ববর্তী স্টেবল রিলিজে রোলব্যাক করবে?",
      m: "যদি সার্ভারে নতুন কোড পুল করার পর `npm run build` বা `pm2 reload` কোনো কারণে এরর কোড ফিরিয়ে ফেইল করে, তবে আমরা ব্যাশ ট্র্যাপ বা GitHub Actions-এর `if: failure()` ব্লক দিয়ে অটোমেটিক রোলব্যাক ট্রিগার করি। রোলব্যাক স্ক্রিপ্টটি স্বয়ংক্রিয়ভাবে: (১) গিট কোডকে পূর্ববর্তী কমিটে ফিরিয়ে নেয় (`git reset --hard HEAD~1`), (২) ডিপেনডেন্সি ও বিল্ড পুনরায় রি-রান করে, (৩) PM2 দিয়ে পূর্ববর্তী সুস্থ ভার্সন রিলোড করে দেয়, এবং (৪) স্ল্যাকে একটি হাই-প্রায়োরিটি ইমার্জেন্সি অ্যালার্ট পাঠায় যে 'Deployment Failed: Automatically Rolled Back to Previous Stable Release'। সাইট ১ সেকেন্ডের জন্যও অফলাইনে থাকে না।",
      b: "ডেপ্লয়মেন্ট ব্যর্থ হলে if: failure() ব্লক দিয়ে স্বয়ংক্রিয়ভাবে git reset --hard HEAD~1 চালিয়ে পূর্ববর্তী সুস্থ ভার্সন রিলোড করা হয় এবং স্ল্যাকে অ্যালার্ট পাঠিয়ে সাইট সচল রাখা হয়।",
      e: "Incorporate an automated rollback step triggered by if: failure(). The rollback script rolls back Git commits (git reset --hard HEAD~1), rebuilds artifacts, executes pm2 reload to restore the prior stable state, and notifies engineering teams on Slack.",
      code: "- name: Auto-Rollback on Failure\n  if: failure()\n  run: |\n    echo 'Deployment failed! Rolling back...'\n    git reset --hard HEAD~1\n    npm run build\n    pm2 reload ecosystem.config.js --update-env\n    curl -X POST -H 'Content-type: application/json' --data '{\"text\":\"🚨 Prod Deploy Failed & Rolled Back!\"}' ${{ secrets.SLACK_WEBHOOK }}"
    },

    // --- SITUATION BASED (5 Questions) ---
    {
      lvl: "situation",
      q: "পরিস্থিতি: একজন ডেভেলপার শুক্রবার বিকেলে কোড পুশ করেছে, সিআই টেস্ট পাস করেনি কিন্তু সে জোর করে গিটহাবে 'Force Push' করে মেইন ব্রাঞ্চ ওভাররাইট করে উইকএন্ডে চলে গেছে এবং প্রোডাকশন সাইট ডাউন! কীভাবে তাৎক্ষণিকভাবে রিকভার করবে এবং ভবিষ্যতে এটি ১০০% অসম্ভব করবে?",
      m: "রিকভারি: (১) সার্ভারে ঢুকে গিটহাবের রেফারেন্স লগ বা `git reflog` দেখে ধ্বংসের পূর্ববর্তী স্টেবল কমিট হ্যাশটি বের করব এবং অবিলম্বে সার্ভারে সেই কমিট চেকআউট করে PM2 রিলোড দেব (`git checkout <stable_sha> && pm2 reload all`)। (২) গিটহাবে `git push -f origin <stable_sha>:main` দিয়ে মেইন ব্রাঞ্চ পুনরুদ্ধার করব। স্থায়ী প্রতিরোধ: রিপোজিটরি সেটিংসে গিয়ে `Branch Protection Rules`-এ অবিলম্বে `Include administrators` এবং `Block force pushes` ও `Block deletions` টিক মার্ক করে দেব! এর ফলে স্বয়ং কোম্পানির সিইও বা অ্যাডমিনও মেইন ব্রাঞ্চে কোনো ফোর্স পুশ করতে পারবে না।",
      b: "git reflog দেখে পূর্ববর্তী কমিট হ্যাশে ফিরে গিয়ে অ্যাপ রিলোড করে সাইট চালু করব। এরপর ব্রাঞ্চ প্রটেকশনে 'Block force pushes' এবং 'Include administrators' সক্রিয় করে ফোর্স পুশ চিরতরে অসম্ভব করব।",
      e: "Triage via git reflog to identify the last known good commit SHA, check it out on the server, and reload PM2. Permanently prevent recurrence by enabling Branch Protection rules with 'Include administrators', 'Block force pushes', and 'Require status checks to pass before merging'.",
      tip: "মনে রাখবে: 'Enable \"Include administrators\" in branch protection so even admins cannot bypass safeguards.'"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: GitHub Actions-এ SSH দিয়ে VPS-এ ডেপ্লয় করার সময় এরর আসছে: `Host key verification failed. Lost connection`। কারণ কী এবং কীভাবে সমাধান করবে?",
      m: "কারণ: লিনাক্স SSH সিকিউরিটির অংশ হিসেবে অপরিচিত সার্ভারে প্রথমবার কানেক্ট করার সময় ম্যান-ইন-দ্য-মিডল (MITM) আক্রমণ প্রতিরোধের জন্য হোস্টের পাবলিক ফিঙ্গারপ্রিন্ট (`known_hosts`) যাচাই করে। গিটহাব রানার একটি সম্পূর্ণ নতুন ভার্চুয়াল মেশিন হওয়ায় তার কাছে আপনার সার্ভারের ফিঙ্গারপ্রিন্ট আগে থেকে থাকে না। সমাধান: (১) গিটহাব ওয়ার্কফ্লোতে SSH কানেক্ট করার আগে সার্ভারের পাবলিক কি স্ক্যান করে `~/.ssh/known_hosts`-এ যোগ করা: `ssh-keyscan -H ${{ secrets.SERVER_HOST }} >> ~/.ssh/known_hosts`। (২) অথবা `appleboy/ssh-action` ব্যবহার করলে বাফার অপশন ঠিক রাখা। এরপর যাচাইকরণ সফল হয়ে ডেপ্লয়মেন্ট নির্বিঘ্নে চলবে।",
      b: "নতুন গিটহাব রানারের কাছে সার্ভারের হোস্ট ফিঙ্গারপ্রিন্ট না থাকায় এই এরর আসে। ssh-keyscan -H server_ip >> ~/.ssh/known_hosts চালিয়ে ফিঙ্গারপ্রিন্ট যুক্ত করলেই SSH ভেরিফিকেশন সফল হয়।",
      e: "Host key verification fails because the ephemeral runner has not cached the remote server's public key fingerprint in ~/.ssh/known_hosts. Populate it prior to connecting via ssh-keyscan -H ${{ secrets.HOST }} >> ~/.ssh/known_hosts.",
      code: "steps:\n  - name: Add Host Key to Known Hosts\n    run: |\n      mkdir -p ~/.ssh\n      ssh-keyscan -H ${{ secrets.SERVER_HOST }} >> ~/.ssh/known_hosts"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: গিটহাব অ্যাকশনস ওয়ার্কফ্লোতে `npm run build` চলার সময় এরর এলো: `JavaScript heap out of memory` এবং সিআই জব ক্র্যাশ করল। কীভাবে এটি ফিক্স করবে?",
      m: "সমস্যার কারণ: Next.js বা বড় TypeScript প্রজেক্ট বিল্ড করার সময় ডিফল্ট Node.js হিপ মেমোরি লিমিট (২GB বা ৪GB) ছাড়িয়ে যায়। সমাধান: (১) গিটহাব রানারের পরিবেশ ভ্যারিয়েবলে Node.js মেমোরি লিমিট বাড়িয়ে ৮GB বরাদ্দ করা: `NODE_OPTIONS: \"--max-old-space-size=8192\"`। (২) `next.config.js`-এ অপ্রয়োজনীয় ভারী সোর্স ম্যাপ জেনারেশন প্রোডাকশন বিল্ডে ডিসেবল করা। এরপর রানার পর্যাপ্ত মেমোরি পেয়ে অনায়াসে বিল্ড সম্পন্ন করবে।",
      b: "বিল্ড চলাকালীন মেমোরি শেষ হয়ে ক্র্যাশ করলে NODE_OPTIONS=\"--max-old-space-size=8192\" দিয়ে নোড মেমোরি ৮GB তে বাড়িয়ে দিতে হয়। এতে বিল্ড সফলভাবে সম্পন্ন হয়।",
      e: "Compiling massive Next.js or TypeScript codebases exhausts Node's default heap memory allocation. Resolve by injecting NODE_OPTIONS: '--max-old-space-size=8192' into the workflow step environment, granting Node up to 8GB of memory space.",
      code: "- name: Build Project\n  run: npm run build\n  env:\n    NODE_OPTIONS: \"--max-old-space-size=8192\""
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: ডেভেলপাররা প্রতিদিন গিটহাব অ্যাকশনস রান করায় ফ্রি ২০০০ মিনিট সিআই কোটা মাসের ১৫ তারিখেই শেষ হয়ে গেছে এবং সব বিল্ড আটকে গেছে! কোড ও পাইপলাইন কীভাবে অপটিমাইজ করে সিআই খরচ ৭৫% কমাবে?",
      m: "অপটিমাইজেশনের ধাপ: (১) `Path Filtering` যুক্ত করা: যদি কেউ শুধুমাত্র `README.md`, ডকুমেন্টেশন বা ইমেজ পরিবর্তন করে পুশ করে, তবে সিআই রান করার দরকার নেই (`paths-ignore: ['**.md', 'docs/**']`)। (২) `Concurrency Cancel`: নতুন কমিট আসলে পূর্ববর্তী চলমান ইন-প্রোগ্রেস টেস্ট স্বয়ংক্রিয়ভাবে বাতিল করা (`cancel-in-progress: true`)। (৩) `Dependency Caching`: `npm ci`-এর জন্য `actions/setup-node` ক্যাশিং এনাবল করা। (৪) শুধুমাত্র নির্দিষ্ট গুরুত্বপূর্ণ ব্রাঞ্চে টেস্ট রান করা। এই ৪টি পদক্ষেপে সিআই সময় ৫ মিনিট থেকে ১ মিনিটে নেমে আসবে এবং কোটা কখনোই শেষ হবে না।",
      b: "paths-ignore দিয়ে ডক ফাইল পুশে টেস্ট বন্ধ রাখা, cancel-in-progress: true দিয়ে পুরনো বিল্ড ক্যানসেল করা এবং actions/cache ব্যবহার করে ডিপেনডেন্সি ক্যাশ করলে সিআই সময় ও খরচ ৭৫% কমে যায়।",
      e: "Reduce CI consumption by 75%: (1) Add path filters (paths-ignore: ['*.md', 'docs/**']) to skip builds on documentation edits, (2) Activate concurrency with cancel-in-progress: true to kill superseded builds, and (3) Leverage aggressive npm package caching.",
      code: "on:\n  push:\n    branches: [main]\n    paths-ignore:\n      - '**.md'\n      - 'docs/**'\nconcurrency:\n  group: ${{ github.workflow }}-${{ github.ref }}\n  cancel-in-progress: true"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: একজন জুনিয়র ডেভেলপার ভুলবশত তার পার্সোনাল AWS Access Key কোডে রেখে গিটহাবে পুশ করে দিয়েছে। ৫ মিনিটের মধ্যে গিটহাব সিকিউরিটি অ্যালার্ট পাঠাল। তাৎক্ষণিক কী কী পদক্ষেপ নেবে?",
      m: "জরুরি পদক্ষেপসমূহ: (১) কোনো সময় নষ্ট না করে সাথে সাথে AWS IAM কনসোলে লগইন করে ওই Access Key-টি 'Deactivate' এবং তারপর 'Delete' করে দিতে হবে—যাতে কোনো বট ওই কি ব্যবহার করে বিলিয়ন ডলারের ক্রিপ্টো মাইনিং ক্লাউড ইনস্ট্যান্স না খুলতে পারে। (২) নতুন ফ্রেশ কি জেনারেট করে শুধুমাত্র গিটহাব সিক্রেটসে রাখতে হবে। (৩) Git হিস্ট্রি থেকে সিক্রেট পুরোপুরি পার্জ করতে হবে: `git filter-repo` বা BFG Repo-Cleaner দিয়ে সম্পূর্ণ গিট কমিট হিস্ট্রি থেকে কি-টি মুছে ফোর্স পুশ করতে হবে। (৪) লোকাল মেশিনে `pre-commit` হুক বা `gitleaks` ইনস্টল করতে হবে যাতে ভবিষ্যতে কোনো সিক্রেট কোডে থাকলে গিট কমিট হওয়াই আটকে যায়।",
      b: "তাৎক্ষণিকভাবে AWS কনসোলে ঢুকে অ্যাক্সেস কি ডিঅ্যাক্টিভেট ও ডিলিট করতে হবে। BFG Repo-Cleaner দিয়ে গিট হিস্ট্রি পরিষ্কার করতে হবে এবং ভবিষ্যতে প্রতিরোধ করতে gitleaks প্রি-কমিট হুক বসাতে হবে।",
      e: "Immediately revoke and delete the compromised IAM Access Key in the AWS console to halt unauthorized exploitation. Scrub Git commit history permanently using BFG Repo-Cleaner or git filter-repo, and install gitleaks in local pre-commit hooks to block secrets prior to commits.",
      tip: "বলো: 'First revoke the key immediately at the cloud provider; then scrub history with BFG and enforce gitleaks hooks.'"
    },

    // --- REAL WORLD (5 Questions) ---
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা (Dokani SaaS): Dokani POS-এর প্রোডাকশন CI/CD অটোমেশন পাইপলাইন কীভাবে গিটহাব অ্যাকশনস দিয়ে আর্কিটেক্ট করা হয়েছে?",
      m: "দোকানি পিওএসে একটি সম্পূর্ণ অটোনোমাস ২-স্টেজ CI/CD পাইপলাইন কার্যকর: (১) `Stage 1 - Quality Gate (CI)`: যেকোনো PR তৈরি হলে সমান্তরালে ESLint লিন্ট, TypeScript কম্পাইল চেক, Jest ইউনিট টেস্ট এবং Playwright ই২ই চেকআউট ফ্লো টেস্ট রান হয়। (২) `Stage 2 - Zero-Downtime CD`: PR মেইনে মার্জ হওয়া মাত্রই CD পাইপলাইন সক্রিয় হয়। এটি গিটহাব সিক্রেটস থেকে এড২৫৫১৯ SSH কি দিয়ে প্রোডাকশন উবুন্টু VPS-এ লগইন করে, কোড পুল করে, `prisma migrate deploy` দিয়ে ডেটাবেজ স্কিমা সিঙ্ক করে, নেক্সট.জেএস ও নোড বিল্ড সম্পন্ন করে এবং `pm2 reload ecosystem.config.js --update-env` দিয়ে কোনো ডাউনটাইম ছাড়া লাইভ করে। পুরো রিলিজটি কোনো মানুষের ম্যানুয়াল স্পর্শ ছাড়াই মাত্র ২ মিনিটে শেষ হয়!",
      b: "দোকানিতে PR ওপেন হলে স্বয়ংক্রিয়ভাবে লিন্ট ও টেস্ট চলে এবং মেইনে মার্জ হলে SSH দিয়ে প্রোডাকশন VPS-এ ঢুকে মাইগ্রেশন, বিল্ড ও PM2 জিরো-ডাউনটাইম রিলোড সম্পন্ন হয় মাত্র ২ মিনিটে।",
      e: "Dokani POS operates a dual-stage CI/CD workflow: PRs trigger automated ESLint, TypeScript typecheck, Jest suites, and Playwright POS checkout tests. Merges to main trigger an automated SSH deployment to Ubuntu VPS running Prisma migrations and PM2 zero-downtime rolling reloads in under 2 minutes.",
      tip: "দোকানির এই এন্ড-টু-এন্ড অটোমেটেড পাইপলাইন (PR Quality Gate -> VPS Zero-Downtime CD) ইন্টারভিউতে নিখুঁত প্রো-লেভেল উত্তর।"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: স্ল্যাক / ডিসকর্ড বা টেলিগ্রাম ওয়েবহুক দিয়ে লাইভ ডেপ্লয়মেন্ট নোটিফিকেশন পাইপলাইন কীভাবে বানাবে?",
      m: "ডিপ্লয়মেন্ট সফল বা ব্যর্থ হলে ইঞ্জিনিয়ারিং টিমকে লাইভ জানানোর জন্য আমরা GitHub Actions-এর শেষে একটি নোটিফিকেশন স্টেপ রাখি (`curl` বা কমিউনিটি অ্যাকশন দিয়ে)। নোটিফিকেশনে থাকে: কে পুশ করেছে (`${{ github.actor }}`), কোন কমিট মেসেজ, ব্রাঞ্চের নাম এবং ডিপ্লয়মেন্টের স্ট্যাটাস। সফল হলে গ্রিন টিক এবং ব্যর্থ হলে লাল এলার্ট মেসেজ সহ সার্ভার এরর লগ স্ল্যাক চ্যানেলে পৌঁছে যায়। এর ফলে টিম কোনো টার্মিনাল না খুলেই মোবাইল বা স্ল্যাক থেকেই জেনে যায় নতুন ভার্সন সফলভাবে লাইভ হয়েছে কি না।",
      b: "ডিপ্লয়মেন্ট শেষে স্ল্যাক ওয়েবহুকে curl রিকোয়েস্ট পাঠিয়ে কমিট মেসেজ, অথর ও ডিপ্লয় স্ট্যাটাস নোটিফিকেশন পাঠানো হয়। ফলে টিম তাৎক্ষণিকভাবে রিলিজের অবস্থা জানতে পারে।",
      e: "Integrate Slack/Discord incoming webhooks at the tail of CI/CD workflows using curl or dedicated actions. Broadcast release payloads containing the committer identity, commit SHA, branch name, and deployment status (Success/Failure) to ensure real-time team observability.",
      code: "- name: Notify Slack\n  if: always()\n  run: |\n    curl -X POST -H 'Content-type: application/json' \\\n      --data '{\"text\": \"🚀 Dokani Deploy: ${{ job.status }} by ${{ github.actor }}\"}' \\\n      ${{ secrets.SLACK_WEBHOOK_URL }}"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: Semantic Versioning ও স্বয়ংক্রিয় Release Changelog তৈরি করতে `release-please` বা `semantic-release` কীভাবে কনফিগার করবে?",
      m: "আমরা Conventional Commits স্ট্যান্ডার্ড মানি (যেমন `feat: add discount coupons`, `fix: resolve barcode scanner bug`)। GitHub Actions-এ Google-এর `release-please-action` কনফিগার করা থাকে। এটি প্রতিটি কমিট মেসেজ বিশ্লেষণ করে স্বয়ংক্রিয়ভাবে সেমান্টিক ভার্সন বাড়ায় (`v1.2.0` থেকে `v1.3.0` বা `v1.2.1`), স্বয়ংক্রিয়ভাবে একটি রিলিজ PR তৈরি করে, `CHANGELOG.md` ফাইলে সুন্দর ক্যাটাগরি অনুযায়ী পরিবর্তনগুলো লিপিবদ্ধ করে এবং গিটহাবে অফিসিয়াল গিট ট্যাগ ও রিলিজ পাবলিশ করে। কোনো ইঞ্জিনিয়ারকে ম্যানুয়ালি ভার্সন নাম্বার বা চেঞ্জলগ লিখতে হয় না।",
      b: "কনভেনশনাল কমিটস (feat/fix) মেনে release-please ব্যবহার করা হয়। এটি স্বয়ংক্রিয়ভাবে সেমান্টিক ভার্সন (v1.2.0) বৃদ্ধি করে, CHANGELOG.md তৈরি করে এবং গিটহাবে রিলিজ পাবলিশ করে।",
      e: "Adopt Conventional Commits (feat, fix, chore) paired with Google's release-please-action. It parses commit prefixes, algorithmically bumps Semantic Versions (semver), maintains an automated CHANGELOG.md, and publishes official GitHub Release tags upon merging.",
      code: "- uses: google-github-actions/release-please-action@v3\n  with:\n    release-type: node\n    package-name: dokani-core"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: সেলফ-হোস্টেড গিটহাব অ্যাকশনস রানার (Self-Hosted Runner) কখন এবং কেন ব্যবহার করা হয়?",
      m: "GitHub-এর পাবলিক রানারে (GitHub-hosted runners) প্রতিটি কাজের জন্য বিল্ড মিনিট খরচ হয় এবং তাদের হার্ডওয়্যার লিমিটেশন (২ কোর সিপিইউ, ৭GB র‍্যাম) থাকে। যখন কোনো কোম্পানির বড় মনোরিপো থাকে যার টেস্ট চলতে ২০ মিনিট সময় লাগে, অথবা ডেপ্লয়মেন্ট সার্ভারটি একটি প্রাইভেট ভিপিসির (Private VPC / Corporate Intranet) ভেতরে থাকে যা ইন্টারনেটে উন্মুক্ত নয়—তখন আমরা নিজস্ব পাওয়ারফুল সার্ভারে `Self-Hosted Runner` ইনস্টল করি। সুবিধা: আনলিমিটেড ফ্রি এক্সিকিউশন টাইম, সার্ভারের ৩২ কোর সিপিইউ ও ৬৪GB র‍্যামের দানবীয় গতি, এবং প্রাইভেট নেটওয়ার্কে নিরাপদ ডেপ্লয়মেন্ট।",
      b: "প্রাইভেট ক্লাউড বা ইন্টারনাল নেটওয়ার্কে সার্ভার থাকলে এবং বড় প্রজেক্টে আনলিমিটেড সিআই স্পিড পেতে সেলফ-হোস্টেড রানার ব্যবহার করা হয়। এতে কোনো অতিরিক্ত ক্লাউড খরচ ছাড়াই নিজস্ব সার্ভারের শক্তিতে টেস্ট চলে।",
      e: "Deploy Self-Hosted Runners when deploying into isolated private VPCs inaccessible via public internet, or to accelerate massive monorepo builds using enterprise-grade multi-core hardware without incurring GitHub-hosted runner per-minute billing.",
      tip: "বলো: 'Self-hosted runners provide zero-cost execution and private VPC network access for enterprise deployments.'"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: প্রি-কমিট হুকস (Husky + lint-staged): ব্রোকেন বা আন-ফরম্যাটেড কোড গিটহাবে পুশ হওয়াই লোকাল মেশিনে কীভাবে আটকে দেবে?",
      m: "সবচেয়ে ভালো সিআই হলো যেটি সার্ভারে যাওয়ার আগেই লোকাল মেশিনে ভুল আটকে দেয়! আমরা `husky` এবং `lint-staged` কনফিগার করি। ডেভেলপার যখনই টার্মিনালে `git commit` রান করে, হাস্কি স্বয়ংক্রিয়ভাবে শুধুমাত্র স্টেজড ফাইলগুলোর ওপর Pre-commit হুক চালায়: (১) Prettier দিয়ে কোড ফরম্যাট করে, (২) ESLint দিয়ে কোনো সিনট্যাক্স এরর বা মিসিং টাইপ আছে কি না চেক করে, (৩) কোডে কোনো `console.log` বা পাসওয়ার্ড থাকলে সতর্ক করে। যদি লিন্টিং ফেইল করে, তবে গিট কমিট হতেই দেয় না! এর ফলে গিটহাব রিপোজিটরির হিস্ট্রি সবসময় ১০০% পরিচ্ছন্ন ও বাগ-মুক্ত থাকে।",
      b: "Husky এবং lint-staged দিয়ে লোকাল মেশিনে প্রি-কমিট হুক বসানো হয়। কোডে কোনো লিন্ট এরর বা ভুল থাকলে গিট কমিট হতে দেয় না, ফলে গিটহাবে যাওয়ার আগেই লোকাল মেশিনে ভুল ঠিক হয়ে যায়।",
      e: "Prevent broken code from reaching remote remotes by enforcing local pre-commit hooks via Husky and lint-staged. Staged files are automatically formatted via Prettier and audited via ESLint prior to commit creation, ensuring only pristine commits enter Git history.",
      code: "// package.json:\n\"lint-staged\": {\n  \"*.{ts,tsx}\": [\"prettier --write\", \"eslint --fix\"]\n}"
    }
  ]
};
