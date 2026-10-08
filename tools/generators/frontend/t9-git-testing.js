// Topic 9: Git & GitHub, Automated Testing (Jest, RTL, Playwright) (25 Questions: 5 lvl1, 5 lvl2, 5 lvl3, 5 situation, 5 realworld)
module.exports = {
  id: "git-frontend-testing",
  name: "Git, GitHub & Automated Testing (Jest, RTL, Playwright)",
  desc: "Git Branching, PRs, Merge Conflicts, Unit Testing with Jest, Integration Testing with RTL, E2E Testing with Playwright, CI Quality Gates",
  items: [
    // --- LEVEL 1 (5 Questions) ---
    {
      lvl: "lvl1",
      q: "Git-এ `git pull` এবং `git fetch`-এর মধ্যে মৌলিক পার্থক্য কী?",
      m: "`git fetch` রিমোট রিপোজিটরি (GitHub) থেকে লেটেস্ট কমিট, ব্রাঞ্চ ও মেটাডাটা লোকাল মেশিনে ডাউনলোড করে কিন্তু আপনার বর্তমান লোকাল ওয়ার্কিং কোডে কোনো পরিবর্তন বা মার্জ করে না। আর `git pull` মূলত দুটি কমান্ডের কম্বিনেশন: এটি প্রথমে `git fetch` চালায় এবং সাথে সাথে স্বয়ংক্রিয়ভাবে কারেন্ট লোকাল ব্রাঞ্চে রিমোট কোড `git merge` (বা rebase) করে দেয়। নিরাপদ কাজের জন্য প্রথমে fetch করে পার্থক্য দেখে নিয়ে তারপর pull করা শ্রেয়।",
      b: "git fetch শুধুমাত্র রিমোট সার্ভার থেকে নতুন তথ্য ডাউনলোড করে কিন্তু লোকাল কোডে কোনো পরিবর্তন ঘটায় না। অন্যদিকে git pull স্বয়ংক্রিয়ভাবে ফেচ করার পর বর্তমান ব্রাঞ্চে রিমোট কোড মার্জ করে দেয়।",
      e: "git fetch downloads recent remote commits and refs without touching your local working directory. git pull is shorthand for running git fetch immediately followed by git merge, updating your working branch directly.",
      tip: "কখনোই ব্লাইন্ডলি সরাসরি pull না করে আগে fetch ও diff চেক করা সিনিয়র ইঞ্জিনিয়ারের ভালো অভ্যাস।"
    },
    {
      lvl: "lvl1",
      q: "Unit Testing, Integration Testing, এবং End-to-End (E2E) Testing-এর মধ্যে পার্থক্য কী (Testing Pyramid)?",
      m: "Testing Pyramid অনুযায়ী: (১) Unit Testing (Jest / Vitest): ছোট ছোট একক ফাংশন বা আইসোলেটেড লজিক টেস্ট করে (খুব দ্রুত ও সস্তা)। (২) Integration Testing (React Testing Library): একাধিক কম্পোনেন্ট বা হুক ও এপিআই মক একসাথে কীভাবে ইন্টারেক্ট করে তা টেস্ট করে (মাঝারি স্পিড)। (৩) E2E Testing (Playwright / Cypress): বাস্তব ব্রাউজার ওপেন করে একজন সাধারণ ইউজারের মতো লগইন থেকে শুরু করে পেমেন্ট পর্যন্ত পুরো ফ্লো টেস্ট করে (সবচেয়ে বাস্তবসম্মত কিন্তু ধীরগতির ও রিসোর্স-হেভি)।",
      b: "ইউনিট টেস্ট ক্ষুদ্রতম স্বাধীন ফাংশন যাচাই করে। ইন্টিগ্রেশন টেস্ট একাধিক কম্পোনেন্টের যৌথ কার্যকারিতা পরীক্ষা করে। এবং এন্ড-টু-এন্ড (E2E) টেস্ট বাস্তব ব্রাউজারে প্রকৃত ব্যবহারকারীর পুরো যাত্রা ও অভিজ্ঞতা যাচাই করে।",
      e: "Unit testing tests isolated functions in memory. Integration testing (React Testing Library) verifies interactions between multiple cooperating components and mocked APIs. End-to-End testing (Playwright) drives real headless browsers through full user journeys.",
      code: "// Unit: test(sum(1, 2)).toBe(3)\n// Integration: render(<LoginForm />) -> fireEvent -> expect(msg)\n// E2E: page.goto('/login') -> page.fill('#email') -> page.click('button')"
    },
    {
      lvl: "lvl1",
      q: "React Testing Library (RTL)-এর মূল দর্শন কী এবং 'Test user behavior, not implementation details' বলতে কী বোঝায়?",
      m: "RTL-এর মূল নীতি হলো: ইউজার স্ক্রিনে যা দেখে এবং যেভাবে ব্যবহার করে, টেস্ট কেসও হুবহু সেভাবেই টেস্ট করবে। কম্পোনেন্টের অভ্যন্তরীণ স্টেট ভ্যারিয়েবলের নাম কী (`state.count`) বা মেথডের নাম কী—তা টেস্ট করার বদলে ইউজার বাটনে ক্লিক করতে পারছে কি না (`screen.getByRole('button', { name: /submit/i })`) এবং স্ক্রিনে প্রত্যাশিত টেক্সট ফুটে উঠেছে কি না, তা টেস্ট করা। এর ফলে কোড রিফ্যাক্টর করলেও টেস্ট কেস অহেতুক ফেইল করে না।",
      b: "রিঅ্যাক্ট টেস্টিং লাইব্রেরির দর্শন হলো বাস্তবায়ন পদ্ধতির বদলে ব্যবহারকারীর আচরণ পরীক্ষা করা। অভ্যন্তরীণ স্টেট না দেখে ব্যবহারকারী যেভাবে বাটন বা টেক্সট দেখে ইন্টারেক্ট করে, টেস্টেও হুবহু সেই আচরণ যাচাই করা হয়।",
      e: "RTL encourages testing how users interact with the interface rather than probing internal component implementation details (like state names or private methods). Querying by accessibility roles (`getByRole`) guarantees resilience across internal code refactors.",
      code: "test('renders greeting on click', async () => {\n  render(<Greeting />);\n  await userEvent.click(screen.getByRole('button', { name: /greet/i }));\n  expect(screen.getByText(/hello jahid/i)).toBeInTheDocument();\n});"
    },
    {
      lvl: "lvl1",
      q: "Git-এ `git merge` এবং `git rebase`-এর মধ্যে পার্থক্য কী এবং কখন কোনটি ব্যবহার করবে?",
      m: "`git merge` দুটি ব্রাঞ্চের ইতিহাস মিলিয়ে একটি নতুন 'Merge Commit' তৈরি করে। এতে মূল হিস্ট্রির কোনো পরিবর্তন হয় না কিন্তু হিস্ট্রি ব্রাঞ্চিং ট্রিতে এলোমেলো ও মেলা জটিল হতে পারে। আর `git rebase` আপনার ফিচার ব্রাঞ্চের সব কমিটকে টার্গেট ব্রাঞ্চের সর্বশেষ কমিটের ওপরে নিয়ে রি-প্লে করে একটি নিখুঁত সরলরৈখিক (Linear) হিস্ট্রি তৈরি করে। দলগত মেইন ব্রাঞ্চে রিবেস করা নিষিদ্ধ, কিন্তু নিজের ফিচার ব্রাঞ্চ আপডেট করার জন্য রিবেস বেস্ট প্র্যাকটিস।",
      b: "git merge একটি অতিরিক্ত মার্জ কমিটের মাধ্যমে শাখাগুলো যুক্ত করে। git rebase বর্তমান শাখার সব কমিটকে টার্গেট শাখার মাথার ওপর নতুন করে সাজিয়ে সম্পূর্ণ সোজা ও পরিপাটি লিনিয়ার হিস্ট্রি তৈরি করে।",
      e: "git merge creates an explicit merge commit preserving the exact chronological non-linear branch graph. git rebase rewrites project history by replaying your branch commits on top of the target base tip, yielding a clean linear log.",
      tip: "কখনোই পাবলিক বা শেয়ার্ড ব্রাঞ্চে (main/dev) rebase চালাবে না—এটি গোল্ডেন রুল।"
    },
    {
      lvl: "lvl1",
      q: "Playwright কী এবং এটি কেন Cypress বা Selenium-এর চেয়ে আধুনিক E2E টেস্টিংয়ে এগিয়ে?",
      m: "Playwright হলো মাইক্রোসফটের তৈরি একটি আধুনিক এন্ড-টু-এন্ড অটোমেশন টেস্ট ফ্রেমওয়ার্ক। সুবিধা: (১) এটি একই সাথে Chromium, Firefox, এবং WebKit (Safari) ইঞ্জিন সাপোর্ট করে। (২) অটো-ওয়েটিং (Auto-waiting): এলিমেন্ট দৃশ্যমান ও ক্লিকেবল না হওয়া পর্যন্ত নিজে থেকেই অপেক্ষা করে, কোনো ম্যানুয়াল `sleep()` লাগে না। (৩) মাল্টি-ট্যাব, মাল্টি-ইউজার সেশন প্যারালালে টেস্ট করতে পারে। (৪) সুপার ফাস্ট এক্সিকিউশন ও ট্রেস ভিউয়ার (Trace Viewer) সুবিধা।",
      b: "প্লেরাইট ক্রোম, ফায়ারফক্স ও সাফারি তিনটিতেই কাজ করে। কোনো অতিরিক্ত স্লিপ ছাড়াই এটি উপাদান প্রস্তুত হওয়া পর্যন্ত স্বয়ংক্রিয়ভাবে অপেক্ষা করে এবং একাধিক ট্যাব ও ডিভাইসে প্যারালাল টেস্টিং চালানোর সুবিধা দেয়।",
      e: "Playwright is a modern E2E testing framework supporting Chromium, Firefox, and WebKit out of the box. It features automatic waiting (eliminating flaky timeouts), parallel browser contexts, mobile device emulation, and rich trace recording.",
      code: "test('login flow', async ({ page }) => {\n  await page.goto('https://dokani.bip.sg/login');\n  await page.fill('input[name=\"phone\"]', '01712345678');\n  await page.click('button[type=\"submit\"]');\n  await expect(page).toHaveURL('/dashboard');\n});"
    },

    // --- LEVEL 2 (5 Questions) ---
    {
      lvl: "lvl2",
      q: "React Testing Library-তে এপিআই কল মক করার জন্য Mock Service Worker (MSW) কেন `jest.mock()` এর চেয়ে বহুগুণ শ্রেষ্ঠ?",
      m: "`jest.mock('axios')` বা ফেচ মক করলে শুধু জাভাস্ক্রিপ্ট মেথডটি প্যাচ হয়, যা বাস্তব নেটওয়ার্ক লেয়ারের বাস্তবসম্মত আচরণ টেস্ট করতে পারে না। MSW (Mock Service Worker) নেটওয়ার্ক লেয়ারে (Service Worker / Node interceptor) রিকোয়েস্ট ইন্টারসেপ্ট করে। ফলে আপনার অ্যাক্সিওস কনফিগারেশন, ইন্টারসেপ্টরস, হেডার এবং নেটওয়ার্ক সিরিয়ালাইজেশন হুবহু আসল সার্ভারের মতো কার্যকর থাকে। কোড রিফ্যাক্টর করে অ্যাক্সিওস বাদ দিয়ে fetch ব্যবহার করলেও MSW টেস্ট কেসগুলো একটুও ব্রেক করে না।",
      b: "এমএসডব্লিউ নেটওয়ার্ক স্তরে এপিআই কল ইন্টারসেপ্ট করে, ফলে কোনো কোড পরিবর্তন ছাড়াই বাস্তব সার্ভারের মতো রেসপন্স মক করা যায়। এটি লাইব্রেরি পরিবর্তনের পরেও টেস্ট কেসকে ১০০% কার্যকর রাখে।",
      e: "MSW intercepts HTTP traffic at the network transport layer via Service Workers rather than patching JavaScript modules with jest.mock(). This keeps real Axios interceptors and serialization active, allowing refactors without breaking tests.",
      code: "import { http, HttpResponse } from 'msw';\nimport { setupServer } from 'msw/node';\nexport const server = setupServer(\n  http.get('/api/user', () => HttpResponse.json({ name: 'Jahid' }))\n);"
    },
    {
      lvl: "lvl2",
      q: "Git Stash কী এবং অসম্পূর্ণ ফিচারে কাজ করার সময় জরুরি হটফিক্স এলে কীভাবে `stash pop` ও `stash apply` ব্যবহার করবে?",
      m: "Git Stash বর্তমান অসম্পূর্ণ পরিবর্তনগুলোকে (মডিফাইড ও স্টেজেড ফাইল) একটি অস্থায়ী শেলফে জমিয়ে রেখে আপনার ওয়ার্কিং ডিরেক্টরিকে একদম ক্লিন স্টেটে ফিরিয়ে নেয় (`git stash save 'wip'`। এরপর আপনি নিশ্চিন্তে `main` ব্রাঞ্চে গিয়ে জরুরি বাগ ফিক্স করে পুশ করতে পারেন। কাজ শেষে আবার আপনার ফিচারে ফিরে এসে `git stash pop` (স্ট্যাশ ফিরিয়ে এনে শেলফ থেকে ডিলিট করা) অথবা `git stash apply` (শেলফে কপি রেখে কোড ফেরত আনা) চালাতে পারেন।",
      b: "git stash অসম্পূর্ণ কোডকে সাময়িক বাক্সে সংরক্ষণ করে ওয়ার্কিং ব্রাঞ্চ পরিষ্কার করে দেয়। হটফিক্স শেষ করে পুনরায় ফিরে এসে git stash pop দিলে আগের অসম্পূর্ণ কোডটি ফিরিয়ে আনা যায়।",
      e: "git stash shelving saves your uncommitted local modifications and reverts the working directory to clean HEAD. After switching branches and completing an urgent hotfix, `git stash pop` restores the stashed work and deletes it from the stash list.",
      code: "git stash push -m 'WIP Cart Feature'\ngit checkout main && git checkout -b hotfix/bug\n# fix & commit...\ngit checkout feat/cart && git stash pop"
    },
    {
      lvl: "lvl2",
      q: "React Testing Library-তে Async উপাদান টেস্ট করতে `waitFor` এবং `findBy*` কুয়েরি কীভাবে কাজ করে?",
      m: "যে উপাদানগুলো অ্যাসিঙ্ক এপিআই রেসপন্সের পর রেন্ডার হয়, সেগুলোর জন্য `getBy*` দিলে সাথে সাথে ক্র্যাশ করবে কারণ উপাদানটি তৎক্ষণাৎ ডমে নেই। `findBy*` (যেমন `findByRole`, `findByText`) একটি প্রমিজ রিটার্ন করে এবং উপাদানটি ডমে মাউন্ট হওয়া পর্যন্ত নির্দিষ্ট সময় (ডিফল্ট ১০০০ms) অপেক্ষা করে। আর কাস্টম অ্যাসিনক্রোনাস অ্যাসার্শন টেস্টের জন্য `await waitFor(() => expect(...).toBe(...))` ব্যবহার করা হয়।",
      b: "অ্যাসিনক্রোনাস উপাদান টেস্ট করতে findBy কুয়েরি ব্যবহার করতে হয় কারণ এটি উপাদানটি ডমে না আসা পর্যন্ত অপেক্ষা করে। এছাড়া waitFor ব্লক দিয়ে যেকোনো স্টেট রূপান্তর সম্পন্ন হওয়া পর্যন্ত অপেক্ষা করা যায়।",
      e: "Asynchronous DOM updates cannot be caught by synchronous `getBy*` queries. `findBy*` queries return promises that poll the DOM until the matching node renders. Alternatively, `waitFor(() => expect(...))` polls an assertion until it passes or times out.",
      code: "test('displays invoice after api load', async () => {\n  render(<InvoiceView id='1' />);\n  const invoiceHeading = await screen.findByRole('heading', { name: /invoice #1/i });\n  expect(invoiceHeading).toBeInTheDocument();\n});"
    },
    {
      lvl: "lvl2",
      q: "Git Commit Convention (Conventional Commits: feat, fix, chore, refactor, docs) কেন জরুরি এবং সিআই অটোমেশনে এর ভূমিকা কী?",
      m: "Conventional Commits একটি স্ট্যান্ডার্ড মেসেজ ফরম্যাট বজায় রাখে (`feat: add pos barcode scanner`, `fix: token refresh loop`)। এর বড় সুবিধা হলো: (১) টিমের যে কেউ গিট হিস্ট্রি পড়েই তাৎক্ষণিক বুঝতে পারে কী পরিবর্তন হয়েছে। (২) Semantic Release টুলস স্বয়ংক্রিয়ভাবে কমিট হিস্ট্রি পড়ে সেমান্টিক ভার্সন (`v1.2.0` vs `v1.2.1`) বাম্প করতে পারে এবং স্বয়ংক্রিয়ভাবে প্রোডাকশন `CHANGELOG.md` জেনারেট করতে পারে।",
      b: "কনভেনশনাল কমিটস নিয়মের মাধ্যমে কমিট মেসেজ অর্থবহ রাখা হয়। সিআই/সিডি অটোমেশন এই মেসেজগুলো বিশ্লেষণ করে স্বয়ংক্রিয়ভাবে সফটওয়্যারের ভার্সন আপডেট এবং চেঞ্জলগ প্রস্তুত করে।",
      e: "Conventional Commits enforce structured commit logs (`type(scope): description`). Automated CI tools (e.g. Semantic Release) parse these prefixes to automate semantic version bumps (Major/Minor/Patch) and generate release changelogs without human intervention.",
      tip: "কখনোই 'fixed bug' বা 'update code' লিখবে না; সবসময় 'fix(auth): resolve silent refresh 401 loop' ফরম্যাট অনুসরণ করবে।"
    },
    {
      lvl: "lvl2",
      q: "Playwright-এ Authentication State ক্যাশ করে কীভাবে টেস্ট স্পিড ১০ গুণ বাড়ানো যায় (`storageState`)?",
      m: "যদি ১০০টি E2E টেস্ট থাকে এবং প্রতি টেস্টের শুরুতে ব্রাউজার ওপেন করে নতুন করে ইউজারনেম-পাসওয়ার্ড দিয়ে লগইন করতে হয়, তবে টেস্ট রান হতে আধ ঘণ্টা লাগবে। সমাধান: Playwright-এর 'Global Setup'-এ একবার মাত্র লগইন করে ব্রাউজারের কুকিজ ও লোকালস্টোরেজ একটি JSON ফাইলে সেভ করা হয় (`storageState: 'auth.json'`)। এরপর বাকি সব টেস্ট সেই সেভ করা অথেনটিকেটেড সেশন রিইউজ করে সরাসরি ড্যাশবোর্ড থেকে টেস্ট শুরু করে।",
      b: "প্রতি টেস্টে নতুন করে লগইন না করে একবার লগইন করে সেশন storageState ফাইলে সেভ রাখা হয়। পরবর্তী টেস্টগুলো সেই কুকি রিইউজ করে সরাসরি লগইন করা অবস্থায় দ্রুত শুরু হতে পারে।",
      e: "Avoid re-running slow UI login forms before every test. Playwright captures signed cookies and storage in a global setup script via `storageState: 'auth.json'`, letting subsequent parallel test workers boot directly into authenticated dashboard states.",
      code: "// playwright.config.ts\nuse: { storageState: 'playwright/.auth/user.json' }"
    },

    // --- LEVEL 3 (5 Questions) ---
    {
      lvl: "lvl3",
      q: "Flaky Tests (কখনো পাস কখনো ফেইল হওয়া টেস্ট) কেন তৈরি হয় এবং E2E ও ইন্টিগ্রেশন টেস্টে ফ্ল্যাকিনেস নির্মূলের কৌশল কী?",
      m: "ফ্ল্যাকিনেসের প্রধান কারণগুলো হলো: (১) হার্ডকোডেড `sleep(2000)` বা ভুল টাইমআউট, (২) নেটওয়ার্ক রেস কন্ডিশন বা রিকোয়েস্ট অর্ডার অমিল, (৩) টেস্টগুলোর মধ্যে শেয়ার্ড স্টেট (এক টেস্টের ডেটা অন্য টেস্টকে প্রভাবিত করা)। নির্মূল কৌশল: (১) কখনোই টাইমআউট না দিয়ে ইভেন্ট-ড্রিভেন অ্যাসার্শন ব্যবহার করা (যেমন Playwright auto-wait বা RTL findBy), (২) প্রতিটি টেস্টের আগে ডাটাবেজ বা মক স্টেট সম্পূর্ণ রিসেট করা (Test Isolation), (৩) নেটওয়ার্ক কলের জন্য MSW বা নেটওয়ার্ক রেসপন্স ইন্টারসেপ্টর নিশ্চিত করা।",
      b: "ফ্ল্যাকি টেস্ট এড়াতে হার্ডকোডেড স্লিপ পরিহার করে অটো-ওয়েট ও ইভেন্ট-ড্রিভেন অ্যাসার্শন ব্যবহার করতে হবে। প্রতি টেস্টকে সম্পূর্ণ স্বাধীন (আইসোলেটেড) রাখতে হবে যাতে পূর্ববর্তী টেস্টের ডাটা পরবর্তী টেস্টে কোনো প্রভাব না ফেলে।",
      e: "Flakiness arises from hardcoded sleep delays, race conditions, and shared global state across test runs. Eliminate flakiness by enforcing test isolation (ephemeral states per worker), leveraging auto-waiting locators, and intercepting network traffic deterministically.",
      tip: "ইন্টারভিউতে 'Never use sleep() in E2E tests, always await state conditions' নীতি জোর দিয়ে বলবে।"
    },
    {
      lvl: "lvl3",
      q: "Git Rebase Conflict রেজোলিউশন: জটিল রিবেস কনফ্লিক্ট কীভাবে সমাধান করে সেফলি পুশ করতে হয় (`--force-with-lease`)?",
      m: "রিবেস করার সময় কনফ্লিক্ট আসলে গিট পজ করে কনফ্লিক্ট ফাইলগুলো মার্ক করে। স্টেপস: (১) কনফ্লিক্টিং ফাইলগুলো ওপেন করে ম্যানুয়ালি মার্কার (`<<<<<<<`, `=======`, `>>>>>>>`) সরিয়ে সঠিক কোড ঠিক করি। (২) সমাধানকৃত ফাইলগুলো `git add .` করি। (৩) কখনোই `git commit` দেব না; শুধু `git rebase --continue` দেব। (৪) রিমোটে পুশ করার সময় কখনোই ক্ষতিকর `git push -f` দেব না; সবসময় `git push --force-with-lease` দেব, যা নিশ্চিত করে আপনার অগোচরে রিমোটে অন্য কারো পুশ করা কমিট থাকলে তা দুর্ঘটনাবশত মুছে যাবে না।",
      b: "রিবেস কনফ্লিক্ট মেটাতে ফাইল ঠিক করে git add করে git rebase --continue দিতে হবে। কোড রিমোটে পাঠানোর সময় git push --force-with-lease ব্যবহার করতে হবে যা অন্যের পুশ করা কোড মুছে যাওয়া থেকে রক্ষা করে।",
      e: "Resolve rebase conflicts by editing markers, staging via `git add`, and executing `git rebase --continue`. When pushing upstream, always use `--force-with-lease` instead of `-f` to prevent clobbering upstream commits pushed concurrently by teammates.",
      code: "git add .\ngit rebase --continue\ngit push origin feat/pos --force-with-lease"
    },
    {
      lvl: "lvl3",
      q: "Visual Regression Testing কী এবং Playwright-এর `toHaveScreenshot()` কীভাবে পিক্সেল-লেভেল ইউআই রিগ্রেশন ধরে ফেলে?",
      m: "Visual Regression Testing কোডের ফাংশনাল লজিকের পাশাপাশি স্ক্রিনের ডিজাইন পিক্সেল নিখুঁত আছে কি না তা টেস্ট করে। Playwright পেজের একটি গোল্ডেন বেসলাইন স্ক্রিনশট সেভ করে রাখে। পরবর্তীতে কোনো সিএসএস বা কোড পরিবর্তনের পর নতুন স্ক্রিনশট তুলে দুটির মধ্যে পিক্সেল-বাই-পিক্সেল তুলনা করে (`expect(page).toHaveScreenshot()`)। কোনো বাটন ২ পিক্সেল সরে গেলে বা কালার শেড বদলে গেলে টেস্ট সাথে সাথে ফেইল করে দুটি ছবির ভিজ্যুয়াল ডিফারেন্স (Diff) হাইলাইট করে দেখায়।",
      b: "ভিজ্যুয়াল রিগ্রেশন টেস্টিং পূর্বের রেফারেন্স স্ক্রিনশটের সাথে বর্তমান স্ক্রিনশট মিলিয়ে পিক্সেল পর্যায়ের অমিল পরীক্ষা করে। সিএসএসের কারণে কোনো উপাদান স্থানচ্যুত বা বিকৃত হলে প্লেরাইট তা মুহূর্তের মধ্যে শনাক্ত করে।",
      e: "Visual regression testing compares rendered UI screenshots against baseline snapshots pixel-by-pixel using Playwright's `expect(page).toHaveScreenshot()`. Any layout shift, color drift, or component distortion fails the test, emitting a highlighted visual diff artifact.",
      code: "test('dashboard visual comparison', async ({ page }) => {\n  await page.goto('/dashboard');\n  await expect(page).toHaveScreenshot('dashboard-baseline.png');\n});"
    },
    {
      lvl: "lvl3",
      q: "GitHub Actions CI পাইপলাইনে প্যারালাল টেস্ট এক্সেকিউশন ও ম্যাট্রিক্স স্ট্র্যাটেজি কীভাবে সেটআপ করবে?",
      m: "বড় টেস্ট স্যুট সিঙ্গেল মেশিনে রান করলে ৩০-৪০ মিনিট সময় নেয়। GitHub Actions-এ আমরা `matrix` এবং `shard` স্ট্র্যাটেজি ব্যবহার করি: টেস্ট স্যুটকে ৪টি প্যারালাল ভার্চুয়াল মেশিনে ভাগ করে দিই (`shard: [1/4, 2/4, 3/4, 4/4]`)। প্রতিটি মেশিন একই সাথে একটি অংশে টেস্ট চালায়। টেস্ট শেষ হলে সব রিপোর্টকে একটি সিঙ্গেল আর্টিকেলে মার্জ করে গিটহাবে আপলোড করে। এর ফলে সম্পূর্ণ টেস্ট রান টাইম ৪০ মিনিট থেকে কমে মাত্র ৭ মিনিটে নেমে আসে।",
      b: "গিটহাব অ্যাকশনসে ম্যাট্রিক্স ও শার্ডিং স্ট্র্যাটেজি ব্যবহার করে টেস্ট স্যুটকে একাধিক ভার্চুয়াল মেশিনে একযোগে প্যারালালে চালানো হয়। এর ফলে টেস্ট শেষ হওয়ার সময় ৭৫% পর্যন্ত কমে দ্রুত সিআই ফিডব্যাক পাওয়া যায়।",
      e: "Parallelize continuous integration workflows in GitHub Actions using test sharding (`--shard=1/4`). A build matrix spawns independent parallel VM runners executing disjoint test suites simultaneously, slashing CI execution time from 40m down to under 7m.",
      code: "# .github/workflows/ci.yml\nstrategy:\n  matrix:\n    shardIndex: [1, 2, 3, 4]\n    shardTotal: [4]\nrun: npx playwright test --shard=${{ matrix.shardIndex }}/${{ matrix.shardTotal }}"
    },
    {
      lvl: "lvl3",
      q: "Git Bisect কী এবং প্রোডাকশনে কয়েক সপ্তাহ আগে আসা কোনো রহস্যময় রিগ্রেশন বাগ বাইনারি সার্চ দিয়ে কীভাবে দ্রুত খুঁজে বের করবে?",
      m: "`git bisect` হলো গিট-এর একটি জাদুকরী বাইনারি সার্চ টুল। আপনি গিটকে একটি খারাপ কমিট (`git bisect bad` - যেখানে বাগ আছে) এবং একটি পুরানো ভালো কমিট (`git bisect good v1.0` - যেখানে বাগ ছিল না) চিহ্নিত করে দেবেন। গিট স্বয়ংক্রিয়ভাবে মাঝখানের কমিট চেকআউট করবে। আপনি সেখানে টেস্ট রান করবেন এবং `good` বা `bad` বলবেন। মাত্র ৮-১০টি বাইনারি পদক্ষেপে গিট শত শত কমিটের ভেতর থেকে ঠিক কোন কমিটটিতে এবং কে ওই বাগটি ঢুকিয়েছিল তা নির্ভুলভাবে চিহ্নিত করে দেবে।",
      b: "git bisect বাইনারি সার্চ অ্যালগরিদম ব্যবহার করে শত শত কমিটের মধ্য থেকে সুনির্দিষ্ট ত্রুটিযুক্ত কমিটটি চোখের পলকে শনাক্ত করে। এটি রহস্যময় পুরোনো বাগ দ্রুত ধরতে অসাধারণ কার্যকর।",
      e: "git bisect performs an automated binary search through commit history to isolate the precise commit introducing a regression. By tagging known 'good' and 'bad' points, it checks out midpoints iteratively, locating elusive defects across hundreds of commits in logarithmic time.",
      tip: "ইন্টারভিউতে 'git bisect' এর বাস্তব উদাহরণ দেওয়া সিনিয়র ইঞ্জিনিয়ারদের ডিবাগিং ম্যাচিউরিটির চূড়ান্ত নিদর্শন।"
    },

    // --- SITUATION (5 Questions) ---
    {
      lvl: "situation",
      q: "একজন জুনিয়র ডেভেলপার ভুল করে মেইন ব্রাঞ্চে পাসওয়ার্ড ও ডাটাবেজ সিক্রেট কি সহ কমিট পুশ করে ফেলেছে। তাৎক্ষণিকভাবে কীভাবে এই সিকিউরিটি ডিজাস্টার হ্যান্ডেল করবে?",
      m: "তাত্ক্ষণিক পদক্ষেপ: (১) সবার আগে ডাটাবেজ বা ক্লাউড কনসোলে গিয়ে ওই কম্প্রোমাইজড পাসওয়ার্ডটি সাথে সাথে রোটেট/রিভোক করব (কারণ গিট হিস্ট্রি মুছলেও ইতিমধ্যে কেউ স্ক্র্যাপ করে ফেলতে পারে)। (২) সাধারণ নতুন কমিট দিলে হিস্ট্রি থেকে সিক্রেট মুছে যায় না; তাই `git-filter-repo` অথবা BFG Repo-Cleaner ব্যবহার করে পুরো গিট হিস্ট্রি থেকে ওই ফাইল ও সিক্রেট সম্পূর্ণ স্ক্রাব করে মুছে ফেলব। (৩) ফিউচার প্রিভেনশনের জন্য `git-secrets` বা `trufflehog` প্রি-কমিট হুক বসাব।",
      b: "প্রথমেই অবিলম্বে ডাটাবেজের পাসওয়ার্ড বদলে ফেলতে হবে যাতে পুরানো কি অকার্যকর হয়। এরপর BFG Repo-Cleaner দিয়ে সম্পূর্ণ গিট হিস্ট্রি থেকে সিক্রেট ডিলিট করে দিতে হবে এবং প্রি-কমিট হুক দিয়ে ভবিষ্যতে সিক্রেট পুশ ঠেকানোর ব্যবস্থা করতে হবে।",
      e: "Immediate action: rotate and invalidate the exposed secret immediately at the provider level. Next, purge the secret completely from git history using `git-filter-repo` or BFG Repo-Cleaner. Install pre-commit secret scanners (e.g. GitGuardian or TruffleHog) to prevent recurrences.",
      tip: "সর্বপ্রথম পাসওয়ার্ড রোটেট করার কথা বলা সবচেয়ে গুরুত্বপূর্ণ—কারণ সিক্রেট একবার পুশ হলে তা ইতিমধ্যেই কম্প্রোমাইজড।"
    },
    {
      lvl: "situation",
      q: "একটি পুল রিকোয়েস্টে (PR) ১০টি কনফ্লিক্টিং ফাইল রয়েছে এবং মেইন ব্রাঞ্চের সাথে ফিচার ব্রাঞ্চের বিশাল ফারাক তৈরি হয়েছে। কীভাবে নিরাপদে এই মার্জ কনফ্লিক্ট মিটিয়ে টিম কোড সেভ করবে?",
      m: "সমাধান: (১) মূল ফিচার ব্রাঞ্চের একটি ব্যাকআপ ডুপ্লিকেট ব্রাঞ্চ বানিয়ে রাখব (`git checkout -b feat-backup`) যাতে কোনো কিছু ভুল হলে রিকভার করা যায়। (২) মূল ব্রাঞ্চের সর্বশেষ আপডেট ফেচ করব (`git fetch origin main`)। (৩) ফিচার ব্রাঞ্চে `git merge origin/main` (বা rebase) চালাব। (৪) VS Code-এর 3-way Merge Editor ব্যবহার করে প্রতিটি কনফ্লিক্টিং ফাইলের ইনকামিং বনাম কারেন্ট কোড পরীক্ষা করে প্রয়োজনীয় অংশ রাখব। (৫) সম্পূর্ণ টেস্ট স্যুট রান করে নিশ্চিত করব সব টেস্ট পাস করেছে।",
      b: "প্রথমে বর্তমান ব্রাঞ্চের একটি ব্যাকআপ ব্রাঞ্চ তৈরি করে নিতে হবে। এরপর ভিএস কোডের থ্রি-ওয়ে মার্জ এডিটর দিয়ে প্রতিটি ফাইলের পরিবর্তন মনোযোগ সহকারে মিলিয়ে কনফ্লিক্ট সমাধান করতে হবে এবং সবশেষে টেস্ট চালিয়ে নির্ভুলতা নিশ্চিত করতে হবে।",
      e: "Create a local safety branch copy first (`git checkout -b feature-backup`). Fetch the latest upstream main and initiate the merge. Use VS Code's 3-way Merge Editor to inspect incoming versus current code blocks, validating resolution integrity by executing full test suites.",
      code: "git branch backup-feat\ngit fetch origin\ngit merge origin/main\n# Resolve conflicts in VS Code, run npm test"
    },
    {
      lvl: "situation",
      q: "Playwright E2E টেস্ট লোকাল মেশিনে ১০০% পাস করে কিন্তু GitHub Actions CI সার্ভারে রেন্ডার টাইমিং বা রিসোর্স পার্থক্যের কারণে ফেইল করে। কীভাবে ফিক্স করবে?",
      m: "কারণ: সিআই সার্ভারের সিপিইউ দুর্বল থাকে এবং হেডলেস মোডে অ্যানিমেশন ও ফন্ট রেন্ডার সামান্য ধীরে হয়। সমাধান: (১) Playwright কনফিগারেশনে `actionTimeout` ও `expect` টাইমআউট সিআই এনভায়রনমেন্টের জন্য সামান্য বাড়িয়ে দেব (`isCI ? 10000 : 5000`)। (২) CSS ট্রানজিশন ও অ্যানিমেশন সিআই মোডে ডিসেবল করে দেব (`disableAnimations: true`)। (৩) ফেইলিং টেস্টের জন্য Playwright-এর ট্রেস ফাইল (`trace: 'retain-on-failure'`) ডাউনলোড করে লোকাল মেশিনে `npx playwright show-trace trace.zip` দিয়ে টাইমলাইন ও স্ক্রিনশট ফ্রেম-বাই-ফ্রেম দেখে মূল রুট কজ শনাক্ত করব।",
      b: "সিআই সার্ভারে পারফরম্যান্স পার্থক্যের কারণে টেস্ট ফেইল করলে সিআই মোডের জন্য টাইমআউট কিছুটা বাড়াতে হবে এবং অ্যানিমেশন নিষ্ক্রিয় করতে হবে। ফেইল হওয়া টেস্টের ট্রেস ফাইল ডাউনলোড করে লোকাল মেশিনে প্লেরাইট ট্রেস ভিউয়ারে ফ্রেম বাই ফ্রেম বিশ্লেষণ করে রুট কজ সমাধান করতে হবে।",
      e: "CI runners possess lower compute budgets inducing render micro-delays. Configure `actionTimeout` higher in CI, disable CSS animations globally, and enable `trace: 'retain-on-failure'`. Inspect failing CI traces locally via `npx playwright show-trace trace.zip` to pinpoint timing divergences.",
      code: "use: {\n  trace: 'retain-on-failure',\n  video: 'retain-on-failure'\n}"
    },
    {
      lvl: "situation",
      q: "কমিট করার পর মনে পড়ল কমিট মেসেজে ভুল হয়েছে অথবা স্টেজিংয়ে একটি ফাইল যোগ করতে ভুলে গিয়েছ। নতুন কমিট ছাড়া পূর্বের কমিট কীভাবে আপডেট করবে?",
      m: "আমরা `git commit --amend` ব্যবহার করব। যদি কোনো ফাইল বাদ পড়ে থাকে, তবে ফাইলটি `git add omitted-file.ts` করব এবং তারপর `git commit --amend --no-edit` দিলে আগের কমিটের ভেতরেই ফাইলটি সাইলেন্টলি ইনক্লুড হয়ে যাবে। আর শুধু মেসেজ পরিবর্তন করতে হলে `git commit --amend -m 'new message'` ব্যবহার করব। তবে কমিট যদি ইতিমধ্যেই রিমোটে পুশ হয়ে গিয়ে থাকে তবে সাবধানতার সাথে টিমকে অবগত করে `--force-with-lease` দিতে হবে।",
      b: "পূর্বের কমিটে ফাইল যোগ বা মেসেজ পরিবর্তন করতে git commit --amend ব্যবহার করা হয়। নতুন কমিট না বানিয়ে আগের কমিটেই পরিবর্তনগুলো একীভূত করা যায়।",
      e: "Stage the forgotten file via `git add` and run `git commit --amend --no-edit` to merge it directly into the preceding commit without adding a separate commit hash. For message alterations, invoke `git commit --amend -m 'corrected text'`.",
      code: "git add forgotten-file.ts\ngit commit --amend --no-edit"
    },
    {
      lvl: "situation",
      q: "টিমে দ্রুত ফিচার ডেলিভারি করতে গিয়ে টেস্ট কভারেজ কমে যাচ্ছে এবং বারবার রিগ্রেশন বাগ প্রোডাকশনে যাচ্ছে। কোড কোয়ালিটি রক্ষার জন্য কী গিটহাব রুলস এনফোর্স করবে?",
      m: "আমরা GitHub Repo-তে ৩টি কঠোর সুরক্ষা রুল এনফোর্স করব: (১) `Branch Protection Rules`: `main` ব্রাঞ্চে সরাসরি পুশ ব্লক থাকবে এবং যে কোনো পিআরে অন্তত একজন রিভিউয়ারের অ্যাপ্রুভাল বাধ্যতামূলক হবে। (২) `Status Checks Must Pass`: GitHub Actions CI-তে ESLint, TypeScript টাইপ-চেক এবং Jest/Playwright টেস্ট গ্রিন টিক ছাড়া মার্জ বাটন ডিসেবল থাকবে। (৩) `Codecov / Jest Coverage Gate`: নতুন কোডে টেস্ট কভারেজ ন্যূনতম ৮০%-এর নিচে নামলে স্বয়ংক্রিয়ভাবে পিআর ব্লক হবে।",
      b: "কোড মান সুরক্ষায় ব্রাঞ্চ প্রটেকশন রুলস অন করে সরাসরি পুশ বন্ধ করতে হবে। সিআই পাইপলাইনে লিন্ট ও টেস্ট পাস হওয়া এবং কোডকভ দিয়ে ন্যূনতম ৮০% টেস্ট কভারেজ পূরণ হওয়া বাধ্যতামূলক করতে হবে।",
      e: "Establish strict quality gates: require branch protection blocking direct commits to main, mandate positive PR approvals, enforce passing CI checks (linting, type-checks, E2E suites), and set Codecov minimum threshold gates (e.g., 80% coverage) before PR merges are unlocked.",
      tip: "সিআই স্ট্যাটাস চেক এবং পিআর প্রটেকশন রুলসের বাস্তব পলিসি বর্ণনা করা যেকোনো টিমের সিনিয়র লিড পদের জন্য আদর্শ।"
    },

    // --- REALWORLD (5 Questions) ---
    {
      lvl: "realworld",
      q: "Dokani POS-এর দ্রুতগতির চেকআউট ফ্লোতে Playwright E2E টেস্ট কীভাবে সম্পূর্ণ অটোমেটেড করেছিলে?",
      m: "আমরা একটি পূর্ণাঙ্গ E2E পাইপলাইন তৈরি করেছিলাম: (১) প্লেরাইট ব্রাউজার ওপেন করে ক্যাশিয়ার ক্রেডেনশিয়াল দিয়ে লগইন করে। (২) টেস্ট ক্যাটালগ থেকে বারকোড স্ক্যান এমুলেট করে ৩টি প্রোডাক্ট কার্টে যোগ করে। (৩) কুপন কোড ইনপুট দেয় এবং মোট টাকার হিসাব (ভ্যাট ও ডিসকাউন্ট) মিলিয়ে দেখে। (৪) ক্যাশ পেমেন্ট ডায়ালগে টাকার অঙ্ক দিয়ে 'Complete Sale' বাটনে ক্লিক করে। (৫) টেস্ট নিশ্চিত করে যে ব্যাকএন্ড ইনভয়েস সফল হয়েছে এবং থার্মাল প্রিন্ট ডায়ালগ ট্রিগার হয়েছে। সম্পূর্ণ ফ্লো মাত্র ৪ সেকেন্ডে রান হয়ে কোনো বাগ থাকলে তৎক্ষণাৎ রিপোর্ট দেয়।",
      b: "দোকানি চেকআউটে প্লেরাইট টেস্ট স্বয়ংক্রিয়ভাবে ক্যাশিয়ার লগইন, বারকোড স্ক্যানিং, কার্ট হিসাব এবং বিক্রয় চূড়ান্ত করার সম্পূর্ণ প্রক্রিয়া ৪ সেকেন্ডে পরীক্ষা করত। কোনো একটি গণনা ভুল হলে টেস্ট ফেইল হয়ে বাগ প্রতিরোধ নিশ্চিত করত।",
      e: "Automated Dokani POS checkout via Playwright: driving the browser through authentication, barcode entry simulations, invoice VAT/discount assertions, cash tendering, and thermal print trigger validations in sub-4-second automated runs.",
      tip: "বাস্তব পিওএস ফ্লোতে প্লেরাইট দিয়ে বারকোড থেকে পেমেন্ট পর্যন্ত অটোমেটেড টেস্টের কথা বললে টেকনিক্যাল ইন্টারভিউয়ার পুরো মুগ্ধ হয়ে যাবে।"
    },
    {
      lvl: "realworld",
      q: "Dokani POS-এর অফলাইন সেলস সিঙ্ক মডিউলে Network Disconnect ও Reconnect টেস্ট করতে Playwright কীভাবে ব্যবহার করেছিলে?",
      m: "Playwright-এর `page.context().setOffline(true)` এপিআই ব্যবহার করে আমরা কৃত্রিমভাবে ইন্টারনেট ড্রপ এমুলেট করি। অফলাইনে থাকা অবস্থায় ক্যাশিয়ার ২টি সেলস বিল সম্পন্ন করে এবং টেস্ট ভ্যালিডেট করে যে সেলস ডাটা ব্রাউজারের IndexedDB-তে পেন্ডিং ব্যাজ সহ সেভ হয়েছে। এরপর `setOffline(false)` করে ইন্টারনেট পুনরায় চালু করি এবং টেস্ট ভ্যালিডেট করে যে ব্যাকগ্রাউন্ড সিঙ্ক স্বয়ংক্রিয়ভাবে ট্রিগার হয়ে সার্ভারে ডাটা পৌঁছেছে এবং পেন্ডিং ব্যাজ 'Synced' এ রূপান্তরিত হয়েছে।",
      b: "প্লেরাইটের setOffline এপিআই ব্যবহার করে আমরা ইন্টারনেট বন্ধ করে অফলাইন বিক্রি পরীক্ষা করেছি। পুনরায় সংযোগ দিয়ে ব্যাকগ্রাউন্ড সিঙ্ক সঠিকভাবে ডাটাবেজ আপডেট করেছে কিনা তা স্বয়ংক্রিয়ভাবে যাচাই করা হয়েছিল।",
      e: "Tested Dokani's offline resilience by toggling `context.setOffline(true)`. The test completed offline sales, asserted IndexedDB storage, restored connectivity with `setOffline(false)`, and verified optimistic sync reconciliations against the server.",
      code: "await page.context().setOffline(true);\nawait page.click('#pay-btn');\nawait expect(page.locator('.offline-badge')).toBeVisible();\nawait page.context().setOffline(false);\nawait expect(page.locator('.synced-badge')).toBeVisible();"
    },
    {
      lvl: "realworld",
      q: "PTTABD প্ল্যাটফর্মে লাইভ এক্সাম মডিউলের টাইমার ও অটো-সাবমিট লজিক টেস্ট করতে Jest Fake Timers (`jest.useFakeTimers()`) কীভাবে ব্যবহার করেছিলে?",
      m: "লাইভ এক্সামের টাইমার ১ ঘণ্টার (৩৬০০ সেকেন্ড)। টেস্টে সত্যি সত্যি ১ ঘণ্টা বসে থাকা অসম্ভব। আমরা Jest-এর `jest.useFakeTimers()` ব্যবহার করেছি। কম্পোনেন্ট মাউন্ট করে আমরা `jest.advanceTimersByTime(1000 * 60 * 60)` কল করে ঘড়ির সময় মুহূর্তের মধ্যে ১ ঘণ্টা সামনে এগিয়ে নিয়ে যাই। এরপর টেস্ট অ্যাসার্ট করে যে এক্সাম ফর্মটি নিজে থেকেই ডিসেবল হয়েছে এবং সার্ভারে `autoSubmitExam()` কল ট্রিগার হয়েছে। সম্পূর্ণ ১ ঘণ্টার টেস্ট মাত্র ২০ মিলিসেকেন্ডে শেষ হয়!`,",
      b: "পিটিটিএবিডি পরীক্ষার ১ ঘণ্টার কাউন্টডাউন টেস্টে জেস্টের ফেইক টাইমার ব্যবহার করা হয়েছিল। advanceTimersByTime দিয়ে সময় মুহূর্তেই ১ ঘণ্টা বাড়িয়ে দিয়ে স্বয়ংক্রিয় পরীক্ষার খাতা জমা হওয়ার লজিক মাত্র কয়েক মিলিসেকেন্ডে নির্ভুলভাবে পরীক্ষা করা সম্ভব হয়েছিল।",
      e: "Tested PTTABD's 1-hour exam countdown with `jest.useFakeTimers()`. Advancing the virtual clock via `jest.advanceTimersByTime(3600000)` instantly triggered the automated submission handler, validating timeout defenses in sub-20ms executions.",
      code: "jest.useFakeTimers();\nrender(<ExamSession duration={3600} />);\nact(() => { jest.advanceTimersByTime(3600000); });\nexpect(screen.getByText(/exam auto-submitted/i)).toBeInTheDocument();"
    },
    {
      lvl: "realworld",
      q: "Husky এবং lint-staged দিয়ে লোকাল প্রি-কমিট (pre-commit) হুক কীভাবে কনফিগার করেছিলে যাতে ত্রুটিপূর্ণ কোড কোনোভাবেই গিটে পুশ না হয়?",
      m: "আমরা প্রজেক্টে Husky এবং `lint-staged` সেটআপ করেছি। ডেভেলপার যখনই `git commit` দেয়, হুকটি স্বয়ংক্রিয়ভাবে সক্রিয় হয়ে শুধুমাত্র স্টেজে থাকা পরিবর্তিত ফাইলগুলোর ওপর ESLint (`eslint --fix`), Prettier ফরম্যাটিং এবং TypeScript টাইপ চেকিং রান করায়। কোনো ফাইলে লিন্ট এরর বা টাইপস্ক্রিপ্ট টাইপো থাকলে কমিটটি সাথে সাথে ব্লক হয়ে যায় এবং ত্রুটি স্ক্রিনে ভেসে ওঠে। ফলে টিমের কেউই ভুল বা আন-ফরম্যাটেড কোড গিটহাবে পুশ করতে পারত না।",
      b: "আমরা হাস্কি এবং লিন্ট-স্টেজের মাধ্যমে প্রি-কমিট হুক তৈরি করেছি। কোড কমিট করার সাথে সাথে স্বয়ংক্রিয়ভাবে লিন্ট ও ফরম্যাটিং চেক হয়; কোনো ত্রুটি থাকলে কমিট বাতিল হয়ে যায়, ফলে গিটহাবে সবসময় পরিষ্কার ও মানসম্পন্ন কোড নিশ্চিত থাকে।",
      e: "Configured Husky with lint-staged to run pre-commit hooks executing ESLint auto-fixes, Prettier formatting, and TypeScript compilation (`tsc --noEmit`) strictly against staged files, aborting commits if lint or type violations occur.",
      code: "// package.json\n\"lint-staged\": {\n  \"*.{ts,tsx}\": [\"eslint --fix\", \"prettier --write\"]\n}"
    },
    {
      lvl: "realworld",
      q: "World Corp Digital বা আধুনিক রিমোট ফুল-স্ট্যাক টিমে Pull Request (PR) কোড রিভিউয়ের জন্য তোমার স্ট্যান্ডার্ড চেকলিস্ট কী?",
      m: "আমার পিআর রিভিউ স্ট্যান্ডার্ড চেকলিস্ট: (১) আর্কিটেকচার ও বিজনেস লজিক সঠিক কি না, (২) কোনো অপ্রয়োজনীয় রি-রেন্ডার বা মেমোরি লিক আছে কি না, (৩) ইনপুট ভ্যালিডেশন (Zod) এবং টাইপস্ক্রিপ্ট টাইপ সেফটি নিশ্চিত কি না (কোনো `any` নেই তো?), (৪) কোনো গোপন পাসওয়ার্ড বা API কি হার্ডকোড করা হয়েছে কি না, (৫) মোবাইল রেসপনসিভনেস ও অ্যাক্সেসিবিলিটি (A11y) ঠিক আছে কি না, (৬) নতুন ফিচারের জন্য যথাযথ Jest/Playwright টেস্ট যোগ করা হয়েছে কি না।",
      b: "আমার কোড রিভিউ চেকলিস্টে থাকে: আর্কিটেকচারাল নির্ভুলতা, পারফরম্যান্স ও মেমোরি লিক পরীক্ষা, কঠোর টাইপ সেফটি, কোনো হার্ডকোডেড সিক্রেট অনুপস্থিতি, মোবাইল রেসপনসিভনেস এবং পর্যাপ্ত টেস্ট কেসের উপস্থিতি।",
      e: "My comprehensive PR review checklist evaluates: (1) Architecture adherence & clean separation of concerns, (2) Re-render overheads & memory leaks, (3) Strict typing without `any` bypasses, (4) Absence of hardcoded credentials, (5) Responsive layouts & A11y, and (6) Adequate test coverage via unit and E2E specs.",
      tip: "একটি স্ট্রাকচার্ড পিআর রিভিউ চেকলিস্ট উপস্থাপন করা সিনিয়র ও লিড পদের জন্য অত্যন্ত আকর্ষণীয়।"
    }
  ]
};
