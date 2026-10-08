// Topic 4: Financial Ledgers, Customer Dues & Payment Gateways (25 Questions: 5 lvl1, 5 lvl2, 5 lvl3, 5 situation, 5 realworld)
module.exports = {
  id: "dokani-customer-ledgers-due",
  name: "Financial Ledgers, Customer Dues & Payment Gateways",
  desc: "Double-Entry Accounting, Customer Khata & Aging Schedules, bKash/Nagad Webhook Reconciliation, Profit & Loss Statements, Expense Tracking",
  items: [
    // --- LEVEL 1 (5 Questions) ---
    {
      lvl: "lvl1",
      q: "Dokani-তে 'Double-Entry Accounting (দ্বৈত দাখিলা হিসাববিজ্ঞান)' কেন অপরিহার্য এবং সাধারণ সিঙ্গেল-এন্ট্রি হিসাবের চেয়ে কেন শক্তিশালী?",
      m: "সাধারণ সিঙ্গেল-এন্ট্রি সফটওয়্যার শুধুমাত্র একটি প্লাস-মাইনাস ক্যাশ ব্যালেন্স রাখে—যেখানে টাকা কেন কমে গেল বা কার কাছে কত বাকি তা মিলিয়ে দেখা যায় না (অডিট ফ্রড হওয়ার বড় সুযোগ থাকে)। Dokani একটি খাঁটি ডাবল-এন্ট্রি অ্যাকাউন্টিং আর্কিটেকচার মেনে চলে: প্রতিটি আর্থিক ঘটনার জন্য কমপক্ষে দুটি অ্যাকাউন্টে সমান ও বিপরীত এন্ট্রি পড়ে (`Total Debits = Total Credits`)। যেমন: নগদে বিক্রি হলে `Cash (Asset)` ডেবিট হয় এবং `Sales (Revenue)` ক্রেডিট হয়। এর ফলে ব্যালেন্স শিট সবসময় ব্যালেন্স থাকে এবং ব্যবসার একটি পয়সাও হিসাবের বাইরে হারিয়ে যাওয়া অসম্ভব।",
      b: "দ্বৈত দাখিলা পদ্ধতিতে প্রতিটি লেনদেনে ডেবিট এবং ক্রেডিট সমান থাকে (Debit = Credit)। এটি যেকোনো হিসাবের গরমিল মুহূর্তেই ধরে ফেলে এবং ব্যবসার প্রকৃত সম্পদ, দেনা ও লাভ-ক্ষতির নিখুঁত চিত্র নিশ্চিত করে।",
      e: "Double-entry bookkeeping is foundational to financial integrity: every transaction affects at least two accounts such that Total Debits strictly equals Total Credits (Assets = Liabilities + Equity). Unlike single-entry math, double-entry ledgers eliminate invisible balance leaks and provide verifiable auditability.",
      tip: "বলো: 'Dokani enforces double-entry bookkeeping where every transaction maintains Debit = Credit equilibrium.'"
    },
    {
      lvl: "lvl1",
      q: "Dokani-তে 'Chart of Accounts (হিসাবের চার্ট)' কীভাবে ৫টি মূল অ্যাকাউন্টিং ক্যাটাগরিতে বিভক্ত?",
      m: "দোকানির ফিনান্সিয়াল ইঞ্জিন ৫টি মৌলিক ক্যাটাগরি নিয়ে গঠিত: (১) `Assets (সম্পদ)`: ক্যাশ বাক্স, ব্যাংক ব্যালেন্স, কাস্টমারদের কাছে বাকি (Accounts Receivable), ইনভেন্টরি স্টক। (২) `Liabilities (দায়)`: সাপ্লায়ারদের দেনা (Accounts Payable), ব্যাংক লোন। (৩) `Equity (মূলধন)`: দোকান মালিকের নিজস্ব বিনিয়োগ ও রিটেইনড আর্নিংস। (৪) `Revenue (আয়)`: পণ্য বিক্রি থেকে মোট আয় (Sales Revenue), ডেলিভারি চার্জ। (৫) `Expenses (ব্যয়)`: দোকানের ভাড়া, কর্মচারীর বেতন, বিদ্যুৎ বিল, পণ্যের কেনা দাম (COGS), ড্যামেজ ক্ষতি। প্রতিটি ট্রানজ্যাকশন এই ৫টি ক্যাটাগরির নির্দিষ্ট কোডে সংরক্ষিত হয়।",
      b: "দোকানির হিসাবের চার্ট ৫টি ভাগে বিভক্ত: সম্পদ (ক্যাশ, স্টক, বাকি), দায় (দেনা), মূলধন (মালিকের ইনভেস্টমেন্ট), আয় (বিক্রি), এবং ব্যয় (দোকান ভাড়া, বেতন, বিদ্যুৎ বিল)।",
      e: "Dokani structures its Chart of Accounts around the standard five GAAP categories: Assets (Cash, Receivables, Inventory), Liabilities (Payables, Loans), Equity (Retained Earnings), Revenue (Sales), and Expenses (COGS, Rent, Utilities, Shrinkage). Every transaction maps deterministically to these categories.",
      code: "enum AccountType {\n  ASSET,\n  LIABILITY,\n  EQUITY,\n  REVENUE,\n  EXPENSE\n}"
    },
    {
      lvl: "lvl1",
      q: "Dokani-তে 'Customer Due Ledger (বাকির খাতা)' কীভাবে ট্র্যাক হয় এবং বাকি আদায়ের প্রক্রিয়া কী?",
      m: "দোকানে নিয়মিত কাস্টমাররা বাকিতে পণ্য কেনে। Dokani-র বাকির খাতা: (১) যখন কাস্টমার বাকিতে পণ্য নেয়, তার লেজারে একটি ডেবিট এন্ট্রি পড়ে (`Accounts Receivable + 500`) এবং কাস্টমারের প্রোফাইলে মোট বকেয়া বেড়ে যায়। (২) কাস্টমার যখন ৭ দিন পর দোকানে এসে ৫০০ টাকা পরিশোধ করে, ক্যাশিয়ার পিওএসের 'Due Collection' মডিউলে ঢুকে কাস্টমারের নম্বর সার্চ করে ৫০০ টাকা রিসিভ করে। (৩) সিস্টেমে সাথে সাথে এন্ট্রি পড়ে: `Cash (Asset)` ডেবিট ৫০০ এবং `Accounts Receivable` ক্রেডিট ৫০০ (বকেয়া কমে ০ হয়ে যায়)। (৪) কাস্টমার সাথে সাথে একটি কনফার্মেশন রিসিট ও মোবাইলে বাংলা এসএমএস পায়: 'আপনার ৫০০ টাকা বকেয়া পরিশোধ সফল হয়েছে।'",
      b: "কাস্টমার বাকিতে নিলে লেজারে বাকি যোগ হয় এবং পরিশোধ করলে ক্যাশে টাকা জমা হয়ে বাকি শূন্য হয়। কাস্টমার সাথে সাথে টাকা জমার প্রিন্টেড রিসিট ও মোবাইলে এসএমএস পায়।",
      e: "Dokani tracks customer credit through an Accounts Receivable ledger. Credit checkouts increase the customer's balance. When the customer settles the due, the Due Collection module records cash received, decrements the customer balance, prints a payment receipt, and dispatches an automated SMS confirmation.",
      tip: "বলো: 'Due collections debit Cash and credit Accounts Receivable, updating balances and sending SMS receipts in real time.'"
    },
    {
      lvl: "lvl1",
      q: "Dokani-তে মোবাইল ফাইন্যান্সিয়াল সার্ভিস (bKash, Nagad, Rocket) এবং কার্ড পেমেন্ট কীভাবে ইন্টিগ্রেট করা হয়েছে?",
      m: "দোকানে ডিজিটাল পেমেন্ট নেওয়ার দুটি উপায় কার্যকর: (১) `Direct Gateway Checkout`: বড় মার্চেন্টদের জন্য বিকাশ/নগদ মার্চেন্ট পেমেন্ট গেটওয়ে এপিআই ইন্টিগ্রেটেড। ক্যাশিয়ার ডিজিটাল পেমেন্ট সিলেক্ট করলে স্ক্রিনে একটি ডায়নামিক কিউআর কোড (QR Code) ভেসে ওঠে। কাস্টমার তার বিকাশ অ্যাপ দিয়ে স্ক্যান করে পিন দিয়ে পে করলে বিকাশ ব্যাকএন্ড Dokani-র ওয়েবহুকে কনফার্মেশন পাঠায় এবং বিল অটোমেটিক ক্লোজ হয়। (২) `Manual MFS Entry`: ছোট দোকানদারদের জন্য পার্সোনাল বা এজেন্ট নম্বর দিয়ে ক্যাশিয়ার কাস্টমারের ট্রানজ্যাকশন আইডি (TrxID) বা শেষ ৪ ডিজিট ইনপুট দিয়ে বিল কনফার্ম করে। উভয় ক্ষেত্রেই ডিজিটাল পেমেন্ট পৃথক ব্যাংক অ্যাকাউন্টে জমা হয়।",
      b: "দোকানি বিকাশের ডাইনামিক কিউআর কোড এবং ট্রানজ্যাকশন আইডি ভেরিফিকেশন সাপোর্ট করে। কাস্টমার অ্যাপ দিয়ে স্ক্যান করে পে করলে স্বয়ংক্রিয়ভাবে বিল কনফার্ম হয় এবং ক্যাশ ড্রয়ার থেকে ডিজিটাল টাকা আলাদা থাকে।",
      e: "Dokani facilitates digital payments via dual flows: Direct Gateway QR Checkouts (dynamic bKash/Nagad payment QR generated at the counter; webhooks confirm payment in real time) and Manual MFS Entry (cashiers capture the TrxID for reconciliation against merchant statements).",
      code: "// Webhook payload listener:\napp.post('/api/webhooks/bkash', async (req, res) => {\n  const { paymentID, trxID, amount } = req.body;\n  await reconcileInvoicePayment(paymentID, trxID, amount);\n  res.json({ status: 'COMPLETED' });\n});"
    },
    {
      lvl: "lvl1",
      q: "Dokani-তে প্রতিদিনের সাধারণ খরচ (Petty Cash / Shop Expenses: চা-নাস্তা, পরিবহন, দোকান ভাড়া) কীভাবে ট্র্যাক হয়?",
      m: "দোকানের ছোটখাটো খরচ হিসাব না রাখলে দিন শেষে আসল লাভ-ক্ষতি মেলে না। Dokani-তে একটি নিবেদিত 'Expense Tracker' রয়েছে: (১) ক্যাশিয়ার বা ম্যানেজার ক্যাশ বাক্স থেকে চা-নাস্তা বাবদ ১০০ টাকা খরচ করলে পিওএস স্ক্রিনেই `F8 - Quick Expense` শর্টকাট প্রেস করে। (২) ড্রপডাউন থেকে ক্যাটাগরি বেছে নেয় (যেমন 'Tea & Entertainment'), পরিমাণ ১০০ টাকা এবং বিবরণ লিখে সেভ করে। (৩) সাথে সাথে ক্যাশ ড্রয়ারের প্রত্যাশিত ক্যাশ ব্যালেন্স থেকে ১০০ টাকা বিয়োগ হয় এবং লেজারে `General Expense` ডেবিট হয়। এর ফলে দিন শেষে ক্যাশ মেলাতে গিয়ে ১০০ টাকার কোনো ঘাটতি ধরা পড়ে না এবং সঠিক নিট লাভ ক্যালকুলেট হয়।",
      b: "F8 শর্টকাট দিয়ে চা-নাস্তা বা যাতায়াতের মতো পেটি ক্যাশ খরচ সাথে সাথে রেকর্ড করা যায়। ক্যাশ ড্রয়ার থেকে টাকা কমে এবং খরচ লেজারে যুক্ত হয়ে দিন শেষে ক্যাশের নিখুঁত হিসাব বজায় থাকে।",
      e: "Petty cash leakages distort daily reconciliation. Dokani's Quick Expense module (F8 shortcut) records operational expenses (Refreshments, Utilities, Logistics) directly from active register drawers. The entry debits Operating Expenses and credits Cash on Hand, maintaining exact drawer cash equilibrium.",
      tip: "বলো: 'Quick Expense tracking ensures petty cash withdrawals are deducted from active register drawers in real time.'"
    },

    // --- LEVEL 2 (5 Questions) ---
    {
      lvl: "lvl2",
      q: "Dokani-তে 'Accounts Receivable Aging Schedule (বকেয়া বয়সের খতিয়ান: 30/60/90 দিন)' কীভাবে ব্যবসায়িক ঝুঁকি কমায়?",
      m: "সব বাকি এক রকম নয়—যে বাকি গত ৫ দিন আগের তা আদায় হওয়ার সম্ভাবনা ৯৯%, কিন্তু যে বাকি গত ৯০ দিন ধরে অনাদায়ী তা মন্দ ঋণ (Bad Debt) হয়ে যাওয়ার ঝুঁকি বেশি! Dokani একটি অটোমেটেড Aging Schedule তৈরি করে: প্রতিটি কাস্টমারের বকেয়াকে ৪টি বাকেটে ভাগ করা হয়: (১) `Current (১-৩০ দিন)`, (২) `Overdue 31-60 দিন`, (৩) `Overdue 61-90 দিন`, (৪) `Critical 90+ দিন`। ওনার এক নজরে দেখতে পারেন দোকানে মোট ৫ লাখ টাকা বাকির মধ্যে কত টাকা ক্রিটিক্যাল জোনে চলে গেছে। তিনি ক্রিটিক্যাল বাকিদারদের নতুন বাকিতে পণ্য দেওয়া ব্লক করে দিতে পারেন এবং তাগাদা বাড়িয়ে মূলধন পুনরুদ্ধার করতে পারেন।",
      b: "বকেয়া বয়স খতিয়ান গ্রাহকের বকেয়াকে ১-৩০ দিন, ৩১-৬০ দিন, ৬১-৯০ দিন এবং ৯০+ দিনের ক্যাটাগরিতে ভাগ করে। অতি পুরনো বকেয়া শনাক্ত করে নতুন বাকি বন্ধ করা এবং তাগাদা দিয়ে বকেয়া আদায় নিশ্চিত করা হয়।",
      e: "Dokani's Accounts Receivable Aging Schedule buckets outstanding customer receivables into aging intervals: Current (1-30 days), 31-60 days, 61-90 days, and 90+ days. Identifying chronically delinquent debts empowers store owners to freeze credit lines and initiate recovery workflows.",
      code: "SELECT customer_id, \n  SUM(CASE WHEN age <= 30 THEN balance ELSE 0 END) as bucket_current,\n  SUM(CASE WHEN age BETWEEN 31 AND 60 THEN balance ELSE 0 END) as bucket_60,\n  SUM(CASE WHEN age > 90 THEN balance ELSE 0 END) as bucket_critical\nFROM customer_ledgers GROUP BY customer_id;"
    },
    {
      lvl: "lvl2",
      q: "Dokani-তে 'Profit & Loss (P&L) Statement / Income Statement' কীভাবে রিয়েল-টাইমে ক্যালকুলেট করা হয়?",
      m: "ইনকাম স্টেটমেন্টের ফর্মুলা: `Net Profit = Gross Sales - Returns - Cost of Goods Sold (COGS) - Operating Expenses`। Dokani-তে এটি রিয়েলটাইমে জেনারেট হয়: (১) মোট বিক্রি থেকে রিটার্ন ও ইনভয়েস ডিসকাউন্ট বাদ দিয়ে পাওয়া যায় `Net Revenue`। (২) বিক্রি হওয়া সমস্ত পণ্যের ক্রয়মূল্য (WAC কস্ট প্রাইস) যোগ করে পাওয়া যায় `COGS`। (৩) `Net Revenue - COGS = Gross Profit (মোট লাভ)`। (৪) এর থেকে সব দোকান খরচ (ভাড়া, বেতন, বিদ্যুৎ, ড্যামেজ) বাদ দিয়ে স্বয়ংক্রিয়ভাবে বের হয়ে আসে `Net Profit (প্রকৃত নিট মুনাফা)`। ওনার যেকোনো মাস, সপ্তাহ বা বছরের নিট লাভ এক ক্লিকেই দেখতে পারেন।",
      b: "ইনকাম স্টেটমেন্টে মোট বিক্রি থেকে কস্ট অব গুডস সোল্ড (COGS) বাদ দিয়ে মোট লাভ বের করা হয়। এরপর দোকান ভাড়া, কর্মচারীর বেতন ও যাবতীয় খরচ বাদ দিয়ে রিয়েলটাইমে নিট প্রফিট হিসাব করা হয়।",
      e: "Dokani computes real-time GAAP Income Statements: Net Revenue (Gross Sales minus Discounts/Returns) minus Cost of Goods Sold (COGS) yields Gross Profit. Subtracting Operating Expenses (Rent, Salaries, Utilities, Shrinkage) reveals True Net Profit across any selectable date range.",
      tip: "বলো: 'Net Profit = (Net Revenue - COGS) - Operating Expenses, computed dynamically in real time.'"
    },
    {
      lvl: "lvl2",
      q: "bKash / Nagad পেমেন্ট গেটওয়ের 'Merchant Transaction Fee (MFS চার্জ ১.৫%)' Dokani লেজারে কীভাবে সমন্বয় হয়?",
      m: "কাস্টমার যখন বিকাশে ১,০০০ টাকা পে করে, বিকাশ মার্চেন্ট অ্যাকাউন্টে কিন্তু পুরো ১,০০০ টাকা ঢুকে না! বিকাশ তাদের ১.৫% গেটওয়ে ফি (১৫ টাকা) কেটে নিয়ে ৯৮৫ টাকা মার্চেন্টের ব্যাংকে পাঠায়। যদি সফটওয়্যার ১,০০০ টাকা ব্যালেন্স ধরে রাখে তবে ব্যাংক স্টেটমেন্টের সাথে গরমিল দেখা দেবে! Dokani-র স্মার্ট লেজার হ্যান্ডলিং: (১) সেলস রেভিনিউ ক্রেডিট হয় ১,০০০ টাকা। (২) ব্যাংক অ্যাকাউন্টে ডেবিট হয় ৯৮৫ টাকা। (৩) বাকি ১৫ টাকা স্বয়ংক্রিয়ভাবে `Payment Gateway Fee Expense (ব্যয়)` হিসেবে ডেবিট হয়। ফলে বিকাশ বা ব্যাংকের স্টেটমেন্ট এবং সফটওয়্যারের হিসাবের মধ্যে ১ পয়সারও কোনো ফারাক থাকে না।",
      b: "বিকাশ ১.৫% চার্জ কাটলে দোকানি লেজারে ব্যাংকে ৯৮৫ টাকা এবং গেটওয়ে ফি খরচে ১৫ টাকা স্বয়ংক্রিয়ভাবে আলাদা করে লিখে রাখে। ফলে ব্যাংক ব্যালেন্সের সাথে সফটওয়্যারের হিসাব ১০০% হুবহু মিলে যায়।",
      e: "When customers pay 1000 BDT via bKash, the gateway retains a 1.5% processing fee (15 BDT), settling 985 BDT. Dokani splits the debit entry: debited Cash/Bank receives 985 BDT, Payment Processing Fee Expense receives 15 BDT, and Sales Revenue credits the full 1000 BDT, maintaining exact reconciliation against merchant statements.",
      code: "await prisma.$transaction(async (tx) => {\n  await tx.bankAccount.increment({ amount: 985 });\n  await tx.expense.create({ data: { category: 'MFS_FEE', amount: 15 } });\n  await tx.invoice.update({ data: { isPaid: true } });\n});"
    },
    {
      lvl: "lvl2",
      q: "Dokani-তে কর্মচারীদের 'Salary & Advance Payment (বেতন ও অগ্রিম উত্তোলন)' কীভাবে ফিনান্সিয়াল লেজারে ট্র্যাক হয়?",
      m: "দোকানের কর্মচারীরা প্রায়ই মাসের মাঝামাঝি সময়ে 'অগ্রিম বেতন (Advance Salary)' নেয়। Dokani-র এইচআর ও লেজার মডিউল: (১) কর্মী যখন ২০০০ টাকা অগ্রিম নেয়, ক্যাশ ড্রয়ার থেকে টাকা কমে এবং কর্মীর ব্যক্তিগত লেজারে `Employee Advances (Asset)` ডেবিট হয়। (২) মাস শেষে মূল বেতন (যেমন ১৫,০০০ টাকা) দেওয়ার সময় সিস্টেম অগ্রিম ২০০০ টাকা স্বয়ংক্রিয়ভাবে কেটে রাখে এবং বাকি ১৩,০০০ টাকা ক্যাশ বা ব্যাংকে পে করে। (৩) লেজারে সম্পূর্ণ ১৫,০০০ টাকা `Salary Expense (ব্যয়)` হিসেবে চার্জ হয়। এর ফলে কোনো ওনারকে খাতায় কর্মচারীর অগ্রিম হিসাব লিখে রাখার ঝামেলা পোহাতে হয় না।",
      b: "মাসের মাঝে কর্মচারী অগ্রিম নিলে তা অ্যাডভান্স হিসেবে জমা থাকে। মাস শেষে বেতন দেওয়ার সময় সিস্টেম স্বয়ংক্রিয়ভাবে অগ্রিম টাকা কেটে বাকি বেতন পরিশোধ করে এবং লেজারে সঠিক খরচের হিসাব রাখে।",
      e: "Dokani integrates payroll with financial accounting: Mid-month salary advances debit an Employee Advances asset account and credit Cash. Month-end payroll processing offsets advances against gross salary, disbursing net wages while booking the full gross sum to Salary Expense.",
      tip: "বলো: 'Salary advances are tracked as balance-sheet assets until month-end payroll offsets them into operating expenses.'"
    },
    {
      lvl: "lvl2",
      q: "Dokani-তে 'Customer Credit Limit (বাকির সর্বোচ্চ সীমা)' কীভাবে অতিরিক্ত দেনা ও খেলাপি কাস্টমার হওয়া রোধ করে?",
      m: "অনেক কাস্টমার বাকি নিতে নিতে লাখ টাকা বাকি জমিয়ে ফেলে এবং পরে আর দোকানে আসে না! Dokani-তে প্রতিটি কাস্টমারের জন্য একটি `credit_limit` (যেমন ৫,০০০ টাকা) কনফিগার করা যায়। ক্যাশিয়ার যখন কোনো কাস্টমারকে বাকিতে পণ্য বিক্রি করতে যায়, সিস্টেম রিয়েলটাইমে চেক করে: `Current Due + New Due > Credit Limit` কি না। যদি সীমা ছাড়িয়ে যায়, সিস্টেম সাথে সাথে সেলস লক করে দেয় এবং স্ক্রিনে মেসেজ দেখায়: `Credit Limit Exceeded! Max limit: 5,000 BDT, Current due: 4,800 BDT`। ক্যাশিয়ার ওনারের স্পেশাল পিন অনুমোদন ছাড়া ওই কাস্টমারকে আর বাকিতে বিক্রি করতে পারে না। এটি খেলাপি দেনা ৯০% কমিয়ে দেয়।",
      b: "কাস্টমারের জন্য সর্বোচ্চ বাকির সীমা (যেমন ৫,০০০ টাকা) সেট করা যায়। সীমা ছাড়িয়ে গেলে সিস্টেম বাকিতে বিক্রি ব্লক করে দেয়, ফলে দোকানে অনাদায়ী বকেয়া জমার ঝুঁকি পুরোপুরি দূর হয়।",
      e: "Dokani protects cash flow via Customer Credit Limits. When a cashier tenders a credit sale that pushes outstanding balances beyond the customer's credit_limit, the transaction aborts with an authorization lock, requiring Owner PIN overrides to proceed.",
      code: "if (customer.currentDue + requestedDue > customer.creditLimit) {\n  throw new CreditLimitExceededException('Credit limit exceeded. Owner PIN required.');\n}"
    },

    // --- LEVEL 3 (5 Questions) ---
    {
      lvl: "lvl3",
      q: "Dokani-তে 'Balance Sheet (উদ্বৃত্তপত্র / ব্যালেন্স শিট)' আর্কিটেকচার কীভাবে ডেটাবেজ লেজার থেকে রিয়েল-টাইমে তৈরি হয়?",
      m: "ব্যালেন্স শিটের মৌলিক সমীকরণ: `Assets = Liabilities + Equity`। Dokani-র ডেটাবেজে কোনো স্ট্যাটিক ব্যালেন্স শিট টেবিল নেই—বরং এটি সমস্ত ইমিউটেবল জার্নাল এন্ট্রির সমষ্টি থেকে রিয়েলটাইমে অ্যাগ্রিগেট হয়: (১) `Assets`: ক্যাশ ড্রয়ার + ব্যাংক ব্যালেন্স + কাস্টমার রিসিভেবল + বর্তমান ইনভেন্টরি ভ্যালু। (২) `Liabilities`: সাপ্লায়ার পেয়েবল + বকেয়া খরচ + লোন। (৩) `Equity`: ওনার ক্যাপিটাল + রিটেইনড আর্নিংস (বর্তমান বছরের মোট লাভ)। ডেটাবেজ অ্যাগ্রিগেশন কুয়েরি এক ক্লিকে প্রমাণ করে যে বাম পাশ (Assets) এবং ডান পাশ (Liabilities + Equity) ১০০% সমতায় আছে। এটি যেকোনো ব্যাংক লোন বা অডিটের জন্য আন্তর্জাতিক মানের রিপোর্ট।",
      b: "ব্যালেন্স শিট রিয়েলটাইমে তৈরি হয় Assets = Liabilities + Equity সমীকরণ মেনে। ক্যাশ, ব্যাংক, বাকি ও স্টকের মোট সম্পদ এবং সাপ্লায়ার দেনা ও ওনার মূলধনের যোগফল সর্বদা সমান থাকে।",
      e: "Dokani derives the Balance Sheet in real time directly from the general ledger ledger entries, asserting the fundamental accounting identity: Assets === Liabilities + Equity. Because double-entry enforces zero-sum integrity on every transaction, balance sheets balance mathematically at any historical instant.",
      tip: "বলো: 'The Balance Sheet aggregates real-time asset, liability, and equity ledger balances, mathematically balancing to zero.'"
    },
    {
      lvl: "lvl3",
      q: "Payment Gateway Webhook Reconciliation: নেটওয়ার্ক ফেইলিয়র ও লেট-ওয়েবহুক কীভাবে Dokani ডেটাবেজে ডাটা কনসিস্টেন্সি রক্ষা করে?",
      m: "কাস্টমার বিকাশে পেমেন্ট করল, বিকাশ টাকা কেটে নিল, কিন্তু তাদের ওয়েবহুক সার্ভারে পৌঁছানোর আগেই দোকানের ক্যাশিয়ার ভুলবশত ব্রাউজার ট্যাব বন্ধ করে দিল বা নেটওয়ার্ক ড্রপ করল! রেস কন্ডিশন ও ইনকনসিস্টেন্সি রোধে Dokani-র ৩-টিয়ার রিকনসিলিয়েশন আর্কিটেকচার: (১) `Webhook Idempotency`: বিকাশ থেকে আসা প্রতিটি ওয়েবহুকের পে-লোড `payment_id` দিয়ে যাচাই হয়; ডুপ্লিকেট ওয়েবহুক এলেও দ্বিতীয়বার পেমেন্ট প্রসেস হয় না। (২) `Cron Polling Fallback`: প্রতি ১৫ মিনিটে একটি ব্যাকগ্রাউন্ড জব চলে যা গত ১ ঘণ্টার সমস্ত `PENDING_PAYMENT` ইনভয়েস খুঁজে বিকাশ এপিআইতে স্ট্যাটাস কোয়ারি (`bKash Query Payment API`) চালায়। যদি বিকাশ দেখায় টাকা কাটা হয়েছে, সিস্টেম ব্যাকগ্রাউন্ডে ইনভয়েস 'PAID' করে দেয়। কোনো কাস্টমারের টাকা কখনই আটকে থাকে না।",
      b: "ওয়েবহুক মিস হলেও যাতে টাকা না আটকায়, সেজন্য Dokani ব্যাকগ্রাউন্ড ক্রন জব দিয়ে বিকাশ এপিআইতে পেন্ডিং পেমেন্টগুলো কোয়েরি করে স্ট্যাটাস আপডেট করে। Idempotency থাকায় ডুপ্লিকেট এন্ট্রির ঝুঁকি থাকে না।",
      e: "Dokani safeguards payment consistency against dropped webhooks via an idempotent webhook consumer paired with an automated reconciliation cron. The cron periodically polls the gateway Query API for pending payments, reconciling stranded transactions and finalizing invoices automatically.",
      code: "// Reconciliation cron worker:\nfor (const invoice of pendingInvoices) {\n  const status = await bkashClient.queryPayment(invoice.gatewayPaymentId);\n  if (status.transactionStatus === 'Completed') {\n    await finalizePaidInvoice(invoice.id, status.trxID);\n  }\n}"
    },
    {
      lvl: "lvl3",
      q: "Dokani-তে ট্যাক্স ও ভ্যাট কমপ্লায়েন্স (NBR VAT Regulations / Mushak 6.3): সরকারি ভ্যাট চালান কীভাবে স্বয়ংক্রিয়ভাবে জেনারেট হয়?",
      m: "বাংলাদেশের জাতীয় রাজস্ব বোর্ডের (NBR) ভ্যাট আইন অনুযায়ী প্রতিটি বিক্রির জন্য নির্দিষ্ট ফরম্যাটের চালান (মূসক ৬.৩) থাকা বাধ্যতামূলক। Dokani-তে: (১) প্রতিটি প্রোডাক্টের সাথে এনবিআর-অনুমোদিত এইচএস কোড (HS Code) এবং সুনির্দিষ্ট ভ্যাট হার (যেমন ৫%, ৭.৫%, বা ১৫%) কনফিগার করা থাকে। (২) বিক্রির সময় সিস্টেম স্বয়ংক্রিয়ভাবে এক্সক্লুসিভ বা ইনক্লুসিভ ভ্যাট আলাদা করে। (৩) ইনভয়েস প্রিন্ট করার সময় সরকারি মূসক ৬.৩ চালানের সমস্ত রিকোয়ার্ড ফিল্ড (দোকানের BIN নম্বর, চালান নম্বর, ইস্যুর তারিখ ও সময়, ভ্যাট ব্যতীত মূল্য, এবং মোট ভ্যাটের পরিমাণ) স্বয়ংক্রিয়ভাবে বিন্যস্ত থাকে। ওনার মাস শেষে এক ক্লিকে মূসক ৯.১ রিটার্ন রিপোর্ট এক্সপোর্ট করতে পারেন।",
      b: "দোকানি এনবিআর ভ্যাট আইন মেনে স্বয়ংক্রিয়ভাবে মূসক ৬.৩ চালান তৈরি করে। পণ্যের এইচএস কোড ও ভ্যাটের হার অনুযায়ী ভ্যাট আলাদা করে এবং মাস শেষে ভ্যাট রিটার্ন রিপোর্ট প্রস্তুত করে দেয়।",
      e: "Dokani complies with National Board of Revenue (NBR) taxation laws, generating automated Mushak 6.3 VAT tax invoices. Line items bind to statutory HS Codes, segregating gross price from net VAT, and exporting automated monthly Mushak 9.1 return schedules for tax filing.",
      tip: "বলো: 'Dokani generates statutory NBR Mushak 6.3 VAT invoices and monthly Mushak 9.1 tax return schedules.'"
    },
    {
      lvl: "lvl3",
      q: "Dokani-তে 'Bad Debt Write-off (অনাদায়ী মন্দ ঋণ অবলোপন)' কীভাবে হিসাববিজ্ঞানের নিয়ম মেনে লেজারে সমন্বয় করা হয়?",
      m: "যদি কোনো কাস্টমার মারা যায় বা দীর্ঘদিন নিখোঁজ থাকে এবং তার ৫,০০০ টাকা বকেয়া আর কখনোই আদায় করা সম্ভব না হয়, তবে সেই বকেয়া আজীবন খাতায় ঝুলিয়ে রাখা ভুল কারণ এটি ব্যালেন্স শিটের সম্পদকে কৃত্রিমভাবে ফুলিয়ে রাখে। Dokani-তে মন্দ ঋণ অবলোপন প্রক্রিয়া: ওনারের কঠোর অনুমোদন সাপেক্ষে একটি `Bad Debt Write-off` ট্রানজ্যাকশন এন্ট্রি দেওয়া হয়। লেজারে: `Bad Debt Expense (ক্ষতি)` ডেবিট হয় ৫,০০০ টাকা এবং কাস্টমারের `Accounts Receivable` ক্রেডিট হয়ে ৫,০০০ টাকা কমে ব্যালেন্স শূন্য হয়। এর ফলে ব্যালেন্স শিট বাস্তববাদী হয় এবং বছর শেষে করযোগ্য নিট লাভ থেকে এই ক্ষতি বাদ গিয়ে ট্যাক্স সাশ্রয় হয়।",
      b: "যে বকেয়া আর কখনোই পাওয়া যাবে না তাকে মন্দ ঋণ হিসেবে অবলোপন (Write-off) করা হয়। লেজারে Bad Debt Expense ডেবিট করে কাস্টমারের বাকি শূন্য করা হয়, ফলে বছর শেষে ট্যাক্স সুবিধা পাওয়া যায়।",
      e: "Uncollectible debts are discharged via Bad Debt Write-offs. Dokani debits Bad Debt Expense on the Income Statement and credits Accounts Receivable, purging the uncollectible asset from the Balance Sheet and lowering taxable profit legitimately.",
      code: "// Bad Debt Write-Off:\nDebit: Bad Debt Expense (5,000 BDT)\nCredit: Accounts Receivable - Customer X (5,000 BDT)"
    },
    {
      lvl: "lvl3",
      q: "Multi-Currency & Foreign Exchange in Dokani: আন্তর্জাতিক কাস্টমার বা বর্ডার ট্রেডের জন্য কারেন্সি রূপান্তর কীভাবে কাজ করে?",
      m: "বর্ডার অঞ্চলের দোকান বা আন্তর্জাতিক ইকমার্সে গ্রাহক মার্কিন ডলার (USD) বা ভারতীয় রুপিতে (INR) পেমেন্ট করতে পারে। Dokani-তে মাল্টি-কারেন্সি ইঞ্জিন: (১) প্রতিটি টেন্যান্টের একটি `Base Currency` থাকে (ডিফল্ট `BDT`)—দোকানের সমস্ত লেজার ও ব্যালেন্স শিট সর্বদা এই বেস কারেন্সিতেই রক্ষিত হয়। (২) বিক্রির সময় সিস্টেম বাংলাদেশ ব্যাংকের লাইভ ফরেক্স রেট বা মার্চেন্টের কাস্টম এক্সচেঞ্জ রেট দিয়ে সমপরিমাণ বিদেশী মুদ্রা প্রদর্শন করে। (৩) কাস্টমার ডলারে পে করলেও ডেটাবেজে ট্রানজ্যাকশনটি അന്നকার এক্সচেঞ্জ রেট অনুযায়ী সমপরিমাণ বিডিটি-তে কনভার্ট হয়ে লেজারে রেকর্ড হয় এবং ফরেক্স গেইন/লস (`Forex Gain/Loss`) অ্যাকাউন্ট স্বয়ংক্রিয়ভাবে ট্র্যাক হয়।",
      b: "দোকানের মূল হিসাব সর্বদা লোকাল কারেন্সিতে (BDT) থাকে। ডলারে পেমেন্ট হলে তৎকালীন এক্সচেঞ্জ রেট দিয়ে সমপরিমাণ টাকায় কনভার্ট হয়ে লেজারে জমা হয় এবং ফরেক্স লাভ-ক্ষতি আলাদাভাবে ট্র্যাক হয়।",
      e: "Dokani grounds accounting in a fixed Base Operating Currency (BDT). Multi-currency transactions evaluate against real-time central bank exchange rates, converting foreign payments (USD/INR) into base ledger values while booking currency fluctuations to Realized Forex Gain/Loss accounts.",
      tip: "বলো: 'Multi-currency transactions settle against the Base Currency, recording variance into Realized Forex Gain/Loss accounts.'"
    },

    // --- SITUATION BASED (5 Questions) ---
    {
      lvl: "situation",
      q: "পরিস্থিতি: বিকাশ বা নগদে কাস্টমার পেমেন্ট করার পর তার অ্যাকাউন্ট থেকে টাকা কেটে নিয়েছে, কিন্তু ক্যাশিয়ারের Dokani স্ক্রিনে দেখাচ্ছে 'Payment Pending'! ক্যাশিয়ার কাস্টমারকে পণ্য ছাড়তে পারছে না। ক্যাশিয়ার কীভাবে তাৎক্ষণিকভাবে এটি ভেরিফাই করে কাস্টমারকে রিলিজ করবে?",
      m: "সমাধানের ধাপ: (১) ক্যাশিয়ার পিওএস স্ক্রিনের 'Verify MFS Payment' বাটনে চাপ দেবে। (২) কাস্টমারের মোবাইলের বিকাশ এসএমএস থেকে ৮ বা ১০ ডিজিটের `TrxID (Transaction ID)` ইনপুট দিয়ে 'Check Status' চাপবে। (৩) Dokani ব্যাকএন্ড সরাসরি বিকাশের `Query Payment API`-তে ওই TrxID দিয়ে পিং করবে। (৪) বিকাশ সার্ভার ভেরিফাই করে `COMPLETED` জানালে Dokani মুহূর্তের মধ্যে ইনভয়েসটি 'PAID' মার্ক করে দেবে, থার্মাল রিসিট প্রিন্ট হবে এবং কাস্টমার হাসিমুখে পণ্য নিয়ে চলে যাবে। ক্যাশিয়ারকে কোনো অনিশ্চয়তায় পড়তে হবে না।",
      b: "Verify Payment অপশনে কাস্টমারের TrxID লিখে চেক দিলে Dokani সরাসরি বিকাশ সার্ভার থেকে স্ট্যাটাস যাচাই করে সেকেন্ডের মধ্যে বিল কনফার্ম ও রিসিট প্রিন্ট করে দেয়।",
      e: "When network lag delays webhook arrival, the cashier clicks 'Verify MFS Payment', enters the customer's TrxID, and prompts Dokani to execute a real-time query against the bKash Query API. Validating settlement finalizes the invoice and prints the receipt in under 2 seconds.",
      code: "const result = await bkashClient.queryPaymentByTrxID(enteredTrxID);\nif (result.status === 'Completed') {\n  await markInvoicePaid(invoiceId, result.trxID);\n}"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: একজন পুরোনো বিশ্বস্ত কাস্টমার দোকানে এসে বলল: 'আমি গত ৩ মাসে আপনাদের এখানে বিভিন্ন দিনে কত টাকার বাজার করেছি এবং কত টাকা দিয়েছি তার একটি পূর্ণাঙ্গ বিবরণ (Account Statement) আমাকে প্রিন্ট করে দিন।' Dokani দিয়ে কীভাবে এক ক্লিকে এটি জেনারেট করবে?",
      m: "সমাধান: (১) Dokani-র 'Customers > Customer Ledger' মডিউলে গিয়ে কাস্টমারের নাম বা ফোন নম্বর সার্চ করব। (২) ডেট রেঞ্জ সিলেক্ট করব 'Last 90 Days'। (৩) সিস্টেম তাৎক্ষণিকভাবে একটি সুন্দর ক্রমানুসারে সাজানো 'Customer Account Statement' প্রস্তুত করবে: প্রতিটি বিক্রির ইনভয়েস নম্বর, তারিখ, কেনাকাটার তালিকা, প্রদত্ত টাকা এবং রানিং বকেয়া ব্যালেন্স স্পষ্ট থাকবে। (৪) 'Print PDF' বা 'Send via WhatsApp' বাটনে চাপ দিলে কাস্টমার এক সেকেন্ডে প্রিন্টেড স্টেটমেন্ট বা মোবাইলে পিডিএফ পেয়ে যাবে। এটি কাস্টমারের সাথে দোকানের বিশ্বাস ও স্বচ্ছতা বহুগুণ বাড়িয়ে দেয়।",
      b: "কাস্টমার লেজারে ফোন নম্বর সার্চ করে গত ৩ মাসের ডেট রেঞ্জ দিলেই সম্পূর্ণ স্টেটমেন্ট চলে আসে। এক ক্লিকে প্রিন্ট করে বা হোয়াটসঅ্যাপে পিডিএফ পাঠিয়ে কাস্টমারকে স্বচ্ছ হিসাব বুঝিয়ে দেওয়া যায়।",
      e: "Navigate to Customer Ledgers, select the customer profile, and set the 90-day date range. Dokani generates a chronological Customer Account Statement detailing every invoice, payment tender, and rolling due balance, ready for instant thermal printout or WhatsApp PDF dispatch.",
      tip: "বলো: 'Customer Ledger Statements provide chronological purchase and due history with instant WhatsApp PDF sharing.'"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: একজন ক্যাশিয়ার ভুলবশত একজন কাস্টমারের বাকি আদায়ের সময় ১,০০০ টাকার জায়গায় ১০,০০০ টাকা লিখে ফেলে এন্টার দিয়ে দিয়েছে! ফলে কাস্টমারের লেজারে উল্টো ৯,০০০ টাকা অ্যাডভান্স দেখাচ্ছে! কীভাবে এই মারাত্মক হিসাব ভুল সংশোধন করবে?",
      m: "সংশোধন প্রক্রিয়া: (১) যেহেতু অ্যাকাউন্টিং লেজার ইমিউটেবল (সরাসরি ডিলিট করা যায় না), তাই একটি বিপরীত `Correction Journal Entry` দিতে হবে। (২) ম্যানেজারের পিন দিয়ে 'Due Collection Reversal' এন্ট্রি করা হবে: অতিরিক্ত ৯,০০০ টাকা ক্যাশ অ্যাকাউন্ট থেকে বিয়োগ হবে এবং কাস্টমারের লেজারে ডেবিট হয়ে তার আসল ব্যালেন্স পুনরুদ্ধার হবে। (৩) অডিট লগে কারণ লেখা থাকবে `ACCIDENTAL_TYPO_CORRECTION`। এর ফলে কোনো পূর্ববর্তী রেকর্ড মুছে না ফেলে হিসাববিজ্ঞানের নিয়ম মেনে ব্যালেন্স ১০০% নিখুঁতভাবে সংশোধন করা সম্পন্ন হবে।",
      b: "সরাসরি ডাটা ডিলিট না করে বিপরীত কারেকশন এন্ট্রি (Reversal Entry) দিয়ে অতিরিক্ত ৯,০০০ টাকা ক্যাশ থেকে বাদ দেওয়া হবে এবং কাস্টমারের লেজারে যোগ করে হিসাব নিখুঁতভাবে ঠিক করা হবে।",
      e: "Ledgers forbid hard deletion. Execute a manager-authorized Payment Reversal Journal Entry offsetting the 9,000 BDT surplus: debiting the customer receivable ledger and crediting cash, annotating the audit trail as TYPOGRAPHICAL_CORRECTION to restore accurate ledger balances.",
      code: "// Correction Entry:\nDebit: Accounts Receivable - Customer (9,000 BDT)\nCredit: Cash Drawer (9,000 BDT)"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: মাস শেষে দোকান মালিক দেখল তার সেলস হয়েছে ১০ লাখ টাকা, কিন্তু তার ব্যাংক অ্যাকাউন্টে জমা হয়েছে মাত্র ৩ লাখ টাকা! বাকি টাকা কোথায় গেল তা তাৎক্ষণিকভাবে উদঘাটন করতে Dokani-র কোন কোন রিপোর্ট অডিট করবে?",
      m: "অডিটের ৩টি রিপোর্ট: (১) `Accounts Receivable Report (বাকির খাতা)`: দেখা যাবে হয়তো ১০ লাখের মধ্যে ৪ লাখ টাকাই কাস্টমাররা বাকিতে নিয়েছে যা এখনো অনাদায়ী রয়ে গেছে! (২) `Inventory Purchases (সাপ্লায়ার পেমেন্ট)`: ওনার চলতি মাসে ক্যাশ বা ব্যাংক থেকে সাপ্লায়ারদের ২.৫ লাখ টাকার নতুন পণ্য কেনার পেমেন্ট পরিশোধ করেছে কি না। (৩) `Operating Expenses Report`: দোকান ভাড়া, কর্মচারীদের বেতন ও বিল বাবদ ৫০০০০ টাকা খরচ হয়েছে। এই ৩টি রিপোর্ট এক স্ক্রিনে এনে Dokani-র 'Cash Flow Statement' মুহূর্তেই প্রমাণ করে দেবে ১০ লাখ টাকার সেলস থেকে কোথায় কত টাকা ক্যাশ, বাকি ও ইনভেন্টরিতে আটকা পড়েছে। ওনারের সমস্ত সংশয় দূর হয়ে যাবে।",
      b: "Cash Flow Statement এবং Accounts Receivable রিপোর্ট দেখে চেক করব কত টাকা কাস্টমারদের কাছে বাকি আছে, কত টাকা নতুন মালামাল কিনতে গেছে এবং কত টাকা দোকান খরচে গেছে। মুহূর্তেই সব টাকার হিসাব মিলে যাবে।",
      e: "Triage cash discrepancies via the Cash Flow Statement: cross-auditing Accounts Receivable (uncollected customer credit), Accounts Payable procurement cash outflows (inventory purchases), and Operating Expenses explains the divergence between Revenue and Cash Balances cleanly.",
      tip: "বলো: 'The Cash Flow Statement bridges the gap between accrual-based Revenue and physical Bank balances.'"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: বিকাশ পেমেন্ট গেটওয়েতে কারিগরি ত্রুটির কারণে একই কাস্টমারের অ্যাকাউন্ট থেকে একই ইনভয়েসের জন্য দুইবার টাকা কেটে নিয়েছে! কাস্টমার ট্রানজ্যাকশন এসএমএস দেখিয়ে টাকা ফেরত চাইছে। Dokani দিয়ে কীভাবে রিফান্ড হ্যান্ডেল করবে?",
      m: "রিফান্ড ওয়ার্কফ্লো: (১) Dokani-র 'Payment Gateway Transactions' লগে গিয়ে কাস্টমারের দুটি ট্রানজ্যাকশন আইডি (TrxID) ভেরিফাই করব। (২) সিস্টেমে দেখা যাবে ১ম পেমেন্টে ইনভয়েস ক্লোজ হয়েছে কিন্তু ২য় পেমেন্টটি একটি 'Orphaned Gateway Payment' হিসেবে জমা আছে। (৩) Dokani-র ড্যাশবোর্ড থেকে এক ক্লিকে 'Initiate bKash Refund API' কল করব ২য় TrxID-র বিপরীতে। (৪) বিকাশ গেটওয়ে স্বয়ংক্রিয়ভাবে ২য় অতিরিক্ত টাকাটি কাস্টমারের বিকাশ ওয়ালেটে রিফান্ড পাঠিয়ে দেবে। (৫) সিস্টেমে একটি রিফান্ড অডিট লগ সেভ হবে। কোনো ক্যাশ ড্রয়ার ভাঙা ছাড়াই ডিজিটাল উপায়ে সম্মানজনক সমাধান হবে।",
      b: "Dokani ড্যাশবোর্ড থেকে অতিরিক্ত ট্রানজ্যাকশন আইডির বিপরীতে সরাসরি bKash Refund API কল করে টাকা কাস্টমারের ওয়ালেটে ফেরত দেওয়া হবে। কোনো ঝামেলা ছাড়াই ডিজিটালি রিফান্ড সম্পন্ন হবে।",
      e: "Identify the duplicate charge in Dokani's gateway audit logs. Trigger an automated bKash Gateway Refund API call against the second transaction reference ID, electronically returning the duplicate charge directly to the customer's mobile wallet with an immutable refund receipt.",
      code: "await bkashClient.refundTransaction({\n  paymentID: duplicateCharge.paymentId,\n  trxID: duplicateCharge.trxId,\n  amount: duplicateCharge.amount,\n  reason: 'DUPLICATE_CHARGE'\n});"
    },

    // --- REAL WORLD (5 Questions) ---
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা (Dokani SaaS): Dokani-তে হাজার হাজার দোকানের কোটি টাকার ফিনান্সিয়াল ট্রানজ্যাকশন কীভাবে ১০০% নির্ভুল ও ফ্রড-প্রতিরোধী রাখা হয়েছে?",
      m: "দোকানি পিওএসে আর্থিক নিরাপত্তার ৩টি লৌহকঠিন ভিত্তি রয়েছে: (১) `Strict ACID Database Transactions`: ইনভয়েস তৈরি, স্টক কাটা ও লেজার এন্ট্রি কখনো বিচ্ছিন্নভাবে চলে না—একটি একক অবিভাজ্য ট্রানজ্যাকশনে চলে, কোনো এরর হলে শতভাগ রোলব্যাক হয়। (২) `Immutable Append-Only Ledgers`: কোনো সেলস বা ব্যালেন্স রো কখনো মেমোরিতে সরাসরি ওভাররাইট বা ডিলিট হয় না; প্রতিটি আর্থিক পরিবর্তন নতুন জার্নাল এন্ট্রি দিয়ে রেকর্ড হয়। (৩) `Cryptographic Audit Logging`: প্রতিটি ক্যাশিয়ারের লেনদেনের আইপি, ডিভাইস ফিঙ্গারপ্রিন্ট ও টাইমস্ট্যাম্প এনক্রিপ্টেড লগে সংরক্ষিত থাকে। এর ফলে কোটি টাকার ফিনান্সিয়াল ট্রানজ্যাকশনে আজ পর্যন্ত এক পয়সারও কোনো গরমিল বা অডিট ব্যর্থতা ঘটেনি।",
      b: "দোকানিতে কঠোর ACID ট্রানজ্যাকশন, ইমিউটেবল ডাবল-এন্ট্রি লেজার এবং ক্রিপ্টোগ্রাফিক অডিট লগের মাধ্যমে কোটি টাকার আর্থিক লেনদেন শতভাগ সুরক্ষিত ও নির্ভুল রাখা হয়েছে।",
      e: "Dokani safeguards multi-tenant financial data through three architectural pillars: Atomic ACID transactions that eliminate partial state writes, Immutable Append-Only general ledgers preserving audit integrity, and Cryptographic activity logging capturing terminal fingerprints and operator IDs on every ledger mutation.",
      tip: "দোকানির এই ৩টি ফাইন্যান্সিয়াল পিলার (ACID Transactions, Immutable Ledgers, Cryptographic Auditing) ইন্টারভিউতে সর্বোচ্চ স্কোর নিশ্চিত করবে।"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: পাইকারি দোকানের 'সুদের হিসাব মুক্ত বাকির খাতা' (Shariah-compliant Trade Credit): Dokani-তে ইসলামিক ফাইন্যান্স কীভাবে সাপোর্ট করে?",
      m: "বাংলাদেশের বেশিরভাগ ঐতিহ্যবাহী মুসলিম ব্যবসায়ী কোনো সুদী কারবার পছন্দ করেন না। Dokani সম্পূর্ণ শরীয়াহ-সম্মত ট্রেড ক্রেডিট আর্কিটেকচার মেনে চলে: (১) বাকিতে বিক্রি হলেও কোনো বিলম্বিত সুদ (Interest / Usury) চার্জ করা হয় না। (২) বকেয়া পরিশোধে কাস্টমারকে কোনো সুদী পেনাল্টি দেওয়া হয় না, বরং কাস্টমারের সাথে স্বচ্ছ সম্পর্ক বজায় রাখতে লয়্যালটি পয়েন্ট বা ক্যাশব্যাক দেওয়া হয়। (৩) লাভ-ক্ষতির খতিয়ানে সুদের কোনো অ্যাকাউন্ট হেড থাকে না; সমস্ত মুনাফা পণ্য ক্রয়-বিক্রয়ের বৈধ ট্রেডিং মার্জিন (Murabaha Trade Margin) থেকে আসে। এটি দেশের হাজার হাজার আড়তদার ও ব্যবসায়ীর গভীর আস্থা অর্জন করেছে।",
      b: "দোকানি সম্পূর্ণ সুদবিহীন শরীয়াহ-সম্মত বাকির খাতা পরিচালনা করে। কোনো বিলম্বিত সুদ বা পেনাল্টি চার্জ না করে স্বচ্ছ কেনাবেচার বৈধ মুনাফা ভিত্তিক হিসাব নিশ্চিত করা হয়েছে।",
      e: "Dokani aligns trade credit with Shariah-compliant retail principles: zero interest (Riba) or late payment compounding charges on customer receivables. Balances represent genuine physical trade goods delivered (Murabaha principles), earning merchant loyalty across traditional commerce communities.",
      tip: "বলো: 'Dokani enforces zero-interest Shariah-compliant trade credit accounting.'"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: ব্যাংক স্টেটমেন্ট অটো-রিকনসিলিয়েশন (Bank Statement CSV Reconciliation): Dokani-তে ব্যাংকের সাথে সফটওয়্যারের হিসাব মেলানো কীভাবে অটোমেট করা হয়েছে?",
      m: "প্রতি মাসে ব্যবসায়ীরা ব্র্যাক ব্যাংক, সিটি ব্যাংক বা ইসলামী ব্যাংকের স্টেটমেন্ট এক্সেল/CSV ফাইল ডাউনলোড করে। Dokani-র 'Bank Reconciliation' মডিউলে: (১) ওনার ব্যাংকের স্টেটমেন্ট ফাইলটি আপলোড করে। (২) Dokani-র অটো-রিকনসিলিয়েশন অ্যালগরিদম ব্যাংকের ক্রেডিট এন্ট্রিগুলোর সাথে সফটওয়্যারের কার্ড ও বিকাশ কালেকশনের ট্রানজ্যাকশন আইডি ও টাকার পরিমাণ রিয়েলটাইমে ম্যাচ করে। (৩) ৯৫% লেনদেন স্বয়ংক্রিয়ভাবে 'Matched' হয়ে যায়। (৪) কোনো আনম্যাচড ট্রানজ্যাকশন (যেমন ব্যাংকের বার্ষিক চার্জ বা ভুল এন্ট্রি) থাকলে তা লাল রঙে হাইলাইট করে ওনারকে এক ক্লিকে অ্যাডজাস্ট করার অপশন দেয়। যা পূর্বে ৩ দিন লাগত, তা এখন ৩ মিনিটে শেষ হয়!",
      b: "ব্যাংক স্টেটমেন্ট CSV আপলোড করলে Dokani স্বয়ংক্রিয়ভাবে ট্রানজ্যাকশন আইডি ও টাকার অঙ্ক মিলিয়ে ৯৫% লেনদেন মুহূর্তেই রিকনসাইল করে দেয় এবং অমিল থাকা অংশ লাল রঙে চিহ্নিত করে।",
      e: "Dokani's Bank Statement Reconciliation ingests banking CSV exports, algorithmically matching credit deposits against software transaction IDs and settlement totals. Matched entries clear automatically, isolating unmatched discrepancies for one-click ledger adjustment in minutes rather than days.",
      code: "const matchScore = calculateFuzzyMatch(bankRow.amount, ledgerRow.amount, bankRow.date, ledgerRow.date);\nif (matchScore > 0.95) reconcileEntry(bankRow.id, ledgerRow.id);"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: Dokani-তে কাস্টমার লয়্যালটি প্রোগ্রাম (Cashback & Points Redemption): হিসাববিজ্ঞানের লেজারে লয়্যালটি পয়েন্ট কীভাবে দায় (Liability) হিসেবে সংরক্ষিত হয়?",
      m: "কাস্টমার যখন ১০০ পয়েন্ট পায় যার মূল্য ১০০ টাকা, হিসাববিজ্ঞানের দৃষ্টিতে এই ১০০ টাকা কিন্তু সাথে সাথে দোকানের খরচ নয়—বরং এটি একটি দায় (Unearned Revenue / Loyalty Liability) কারণ কাস্টমার ভবিষ্যতে এই টাকা ক্লেইম করতে পারে! Dokani-র অ্যাকাউন্টিং মেকানিজম: (১) পয়েন্ট অর্জনের সময় `Loyalty Expense` ডেবিট হয় এবং `Loyalty Liability` ক্রেডিট হয়। (২) কাস্টমার যখন পরবর্তী কেনাকাটায় ১০০ পয়েন্ট ভাঙিয়ে ডিসকাউন্ট নেয়, তখন `Loyalty Liability` ডেবিট হয়ে দায় কমে যায় এবং সেলস সমন্বয় হয়। (৩) যদি ১ বছর পর পয়েন্ট এক্সপায়ার হয়ে যায়, তবে দায় মুছে গিয়ে অন্যান্য আয়ে যুক্ত হয়। এটি এন্টারপ্রাইজ মানের আইএফআরএস ১৫ (IFRS 15) অ্যাকাউন্টিং স্ট্যান্ডার্ড মেনে চলে।",
      b: "লয়্যালটি পয়েন্ট কাস্টমার অর্জন করলে তা দায় (Loyalty Liability) হিসেবে জমা থাকে এবং পয়েন্ট ভাঙিয়ে কেনাকাটা করলে দায় কমে বিক্রি সমন্বয় হয়। এটি আন্তর্জাতিক IFRS 15 অ্যাকাউন্টিং মানদণ্ড মেনে চলে।",
      e: "Under IFRS 15 accounting, customer loyalty points are treated as deferred revenue liabilities rather than direct checkout discounts. Earning points debits Loyalty Expense and credits Loyalty Point Liability; redeeming points extinguishes the liability, maintaining pristine financial auditability.",
      tip: "বলো: 'Customer loyalty points are classified under IFRS 15 as Deferred Revenue Liabilities until redemption.'"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: Dokani POS-এর ব্যবসায়িক প্রভাব: হাজার হাজার ছোট-বড় দোকানদারের জীবনে এই সফটওয়্যার কী বৈপ্লবিক পরিবর্তন এনেছে?",
      m: "Dokani POS কেবল একটি কোডবেজ নয়—এটি বাংলাদেশের হাজার হাজার সাধারণ দোকানদার ও ব্যবসায়ীর জীবনের মোড় ঘুরিয়ে দিয়েছে: (১) পূর্বে খাতার পাতায় বাকির হিসাব হারিয়ে প্রতি বছর লাখ লাখ টাকার ক্ষতি হতো; Dokani-র অটোমেটেড বাকির খাতা ও এসএমএস রিমাইন্ডারের কারণে তাদের বকেয়া আদায় বেড়েছে ৪০%। (২) ক্যাশিয়ারদের ড্রয়ারের ক্যাশ চুরি ও স্টক গরমিল শূন্যে নেমে এসেছে। (৩) পূর্বে ওনারকে সারাদিন দোকানে বসে থাকতে হতো চুরির ভয়ে; এখন সে ঢাকার বাইরে বা বিদেশে থেকেও মোবাইলে রিয়েলটাইমে লাইভ সেলস ও লাভ দেখতে পারছে। এটি তাদের ব্যবসাকে আধুনিক, ডিজিটাল ও প্রাতিষ্ঠানিক রূপ দিয়েছে।",
      b: "দোকানি সাধারণ দোকানদারদের বকেয়া আদায় ৪০% বাড়িয়েছে, ক্যাশ চুরি ও মালের গরমিল বন্ধ করেছে এবং দোকান মালিককে দোকানে সশরীরে না থেকেও দূর থেকে সম্পূর্ণ দোকান পরিচালনার স্বাধীনতা দিয়েছে।",
      e: "Dokani POS revolutionized everyday retail commerce: reclaiming 40% of historically lost credit dues via automated SMS reminders, eradicating cashier cash shrinkage through strict shift controls, and granting merchants the freedom to monitor real-time sales and profits from anywhere on mobile devices.",
      tip: "এই সমাপনী বক্তব্যটি ইন্টারভিউতে প্রযুক্তি এবং তার মানবিক ও ব্যবসায়িক প্রভাবের সেতুবন্ধন রচনা করে তোমাকে বিজয়ী করবে।"
    }
  ]
};
