import { mkdir, writeFile } from "node:fs/promises";

const reports = [
  {
    slug: "admin-assistant",
    legacyFiles: ["administrative-assistant.html"],
    metaTitle: "Sample AI Work Plan: Administrative Assistant",
    metaDescription:
      "See a sample AI Work Plan for an Administrative Assistant, including a work map, first AI test, prompts, review cautions, and a 7-day plan.",
    pageHeadline: "Sample AI Work Plan: Administrative / Executive Assistant",
    intro:
      "This sample shows how a report can help someone who handles email, scheduling, meeting notes, reminders, office documents, and follow-ups.",
    role: "Administrative / Executive Assistant",
    openingRecommendation: "Turn safe daily notes into a clean follow-up list.",
    openingCopy:
      "This is a strong first test because it is useful, repeated, easy to check, and does not require AI to make decisions for you.",
    readFirst: {
      headline: "Your best first AI test is turning rough daily notes into a clean follow-up list.",
      based:
        "Based on this sample interview, your best first AI test is turning rough daily notes into a clean follow-up list.",
      reasons: [
        "Follow-ups are part of your daily work.",
        "The output is easy to review.",
        "Missing one request creates visible friction.",
        "The task can be tested with safe internal notes.",
        "AI can organize and draft without deciding for you.",
      ],
      use: "Organizing rough notes, drafting short internal reminders, and turning scattered requests into a clear task table.",
      keep:
        "Priority, tone, real deadlines, sensitive details, external messages, and any promise made on behalf of the company.",
      goal:
        "Use AI on one internal follow-up list, review every item, and decide whether the process belongs in your daily routine.",
    },
    workMap: {
      headline: "The main problem is the number of small requests that pile up.",
      paragraphs: [
        "You handle email, scheduling, meeting notes, office documents, reminders, and small follow-ups across the day. Requests come from email, meetings, chat, calendar changes, and quick conversations.",
        "The main problem is not one large task. It is the number of small requests that pile up and become easy to miss.",
      ],
      rows: [
        ["Daily follow-up list", "Notes, emails, meetings, chat, and quick asks", "Requests get scattered", "Strong", "Low if internal"],
        ["Meeting notes to task list", "Recurring meetings or project updates", "Action items are easy to miss", "Strong", "Low to medium"],
        ["Routine internal replies", "Coworker requests or reminders", "Drafting takes attention during busy periods", "Medium", "Medium"],
        ["Office document cleanup", "Rough announcements or internal docs", "Making messages clear takes time", "Medium", "Low to medium"],
        ["Scheduling changes", "Calendar conflicts or room changes", "Many details and people involved", "Light", "Medium"],
        ["Sensitive HR, customer, or financial details", "Private or policy-sensitive requests", "Needs care and approval", "Not first", "High"],
      ],
      quote: "Most of my day is small requests from different people.",
    },
    aiGap: {
      position: "Starting.",
      headline: "The gap shows up in follow-ups.",
      paragraphs: [
        "AI is not yet attached to a repeated part of the work. That does not mean your judgment is behind. It means the organizing and drafting around your judgment are still mostly manual.",
        "The gap shows up in follow-ups. This is where other people may start using AI to move faster: turning rough notes into tasks, drafting reminders, and cleaning up internal messages.",
        "Based on this sample interview: You are not behind in understanding the work. The opportunity is to stop organizing every small follow-up by hand.",
      ],
    },
    opportunities: [
      ["Daily follow-up list", "Turn rough notes into owners, requests, deadlines, next steps, and items to verify.", "Writing assistant plus your normal task system.", "Requests arrive from several places and can be easy to miss.", "AI may invent deadlines or turn unclear notes into false commitments.", "Start now."],
      ["Meeting notes to action items", "Turn meeting notes into tasks, owners, due dates, and follow-up questions.", "Writing assistant, meeting notes tool, or workspace assistant.", "Meeting notes often contain small commitments that need follow-up.", "AI may assign ownership incorrectly.", "Start after the follow-up test."],
      ["Routine internal reminder drafts", "Draft short reminders using your notes and preferred tone.", "Writing assistant or email assistant.", "You send repeated reminders and updates during busy days.", "AI may sound too cold, too casual, or too forceful.", "Later."],
      ["Office announcement cleanup", "Rewrite rough announcements so they are clear and easy to scan.", "Writing assistant or document editor.", "Your role includes documents and messages other people rely on.", "AI must not add new policy, dates, promises, or instructions.", "Later."],
      ["Scheduling message drafts", "Draft messages about calendar changes, room bookings, and reminders.", "Writing assistant plus calendar system.", "Scheduling communication is frequent and detail-heavy.", "AI should not decide timing, conflicts, or priority.", "Later."],
    ],
    boundaries: [
      ["Sensitive details", "AI can help organize safe notes. Do not use it for private employee information, customer data, passwords, financial details, or anything your company policy does not allow.", "Your work touches many people and requests."],
      ["External messages", "AI can draft a message. Do not let it decide what gets sent outside the team.", "A draft can accidentally create a promise or use the wrong tone."],
      ["Deadlines and commitments", "AI can list possible deadlines from your notes. Do not let it invent due dates or commitments.", "Your follow-ups depend on accuracy."],
      ["Scheduling decisions", "AI can draft a scheduling message. Do not let it decide timing, conflicts, or priority.", "Calendar changes affect real people, rooms, meetings, and expectations."],
    ],
    firstTest: {
      name: "Turn rough daily notes into a clean follow-up list.",
      goal: "Reduce mental tracking and make small requests easier to review before they get missed.",
      tools: "Use a writing assistant for organizing notes and drafting reminders. Use your normal task system for the final reviewed list.",
      steps: [
        "Collect rough notes from meetings, email, chat, and quick conversations.",
        "Remove private or sensitive details.",
        "Ask the writing assistant to turn the notes into a follow-up table.",
        "Review every deadline, owner, message, and “check first” item.",
        "Move the reviewed items into Planner, To Do, a spreadsheet, or your normal task system.",
      ],
      success: [
        "You catch more small follow-ups.",
        "The list is easier to review than your rough notes.",
        "The tool marks unclear items instead of guessing.",
        "You spend less time rebuilding the day from memory.",
      ],
    },
    toolNeeds: {
      assistantLabel: "For the writing assistant, prepare",
      assistant: ["Rough daily notes", "Known deadlines", "Person, team, or role labels", "Whether the message is internal or external", "Your preferred tone", "The table format you want"],
      systemLabel: "For your task system, prepare",
      system: ["Final reviewed task names", "Owners or roles", "Real due dates", "Priority", "Notes", "Items that need confirmation"],
      weak: "Make this organized: badges, lunch, deck, laptop, parking.",
      better:
        "Turn these safe internal notes into a follow-up table. Do not invent deadlines. If something is unclear, mark it as ‘check first.’\n\nNotes:\n- [Person or role] asked about [request], maybe by [date]\n- Send [count or item] to [vendor or team]\n- [Person or role] needs [document] after [condition]\n- Ask [team] whether [item] shipped\n- Remind [team] about [logistics detail]",
      leaveOut: ["Passwords", "Private employee issues", "Customer data", "Confidential financial information", "Legal or policy-sensitive details"],
    },
    ownership: [
      ["Priority", "AI can list follow-ups. You still own what is urgent, because you know the people, timing, and business context."],
      ["Tone", "AI can draft reminders. You still own the tone, because a reminder can sound too cold, too casual, or too pushy."],
      ["Deadlines", "AI can pull deadlines from your notes. You still own whether the deadline is real, guessed, or missing."],
      ["Sensitive details", "AI can organize safe notes. You still own what should stay private."],
      ["Final send", "AI can prepare a message. You still own what gets sent."],
    ],
    prompts: [
      {
        title: "Rough notes to follow-up list",
        body: `Role/context:
I handle administrative follow-ups across email, meetings, chat, scheduling, and office requests.

Task:
Turn my rough notes into a follow-up list I can review.

Input:
[Paste safe rough notes here.]

Constraints:
- Do not invent deadlines, names, owners, or commitments.
- If something is unclear, mark it as “check first.”
- Keep messages professional, clear, and friendly.
- Do not include sensitive details.
- Do not make decisions for me.

Output format:
Create a table with these columns:
person or role, request, deadline, next step, draft message, what I should verify.

Before you finish:
List any deadlines, commitments, or details I should check before using this.`,
      },
      {
        title: "Meeting notes to task list",
        body: `Role/context:
I take notes from meetings and need to turn them into clear follow-up tasks.

Task:
Turn these meeting notes into a task list.

Input:
Meeting type: [meeting type]
Participant roles: [roles]
Notes: [paste safe notes]
Task system: [Planner, To Do, spreadsheet, other]

Constraints:
- Do not invent owners or due dates.
- Mark unclear tasks as “needs clarification.”
- Keep task names short.
- Separate decisions from follow-ups.
- Do not include sensitive details.

Output format:
Create a table with task, owner or role, due date, priority, notes, and what to verify.

Before you finish:
List anything that needs clarification before I add it to my task system.`,
      },
    ],
    days: [
      "Use AI on one internal follow-up list.",
      "Try the same prompt with a different set of notes.",
      "Add deadlines, owners, and “check first” items.",
      "Move the reviewed list into your normal task system.",
      "Try one routine internal email draft.",
      "Compare what AI got right, what it missed, and what you had to fix.",
      "Decide whether this belongs in your daily routine.",
    ],
    ifWorks: "Your next best tests are meeting notes to task lists, routine internal email drafts, and office announcement cleanup.",
    ifFails: "The likely issue is the input. Try cleaner notes, clearer labels, and a stricter rule not to invent deadlines.",
    managerNote:
      "I’m testing AI on internal follow-up organization to help with drafting and organizing. I’m not using it for sensitive details or external messages, and I’m reviewing deadlines, tone, commitments, and final wording before anything is used.",
  },
  {
    slug: "office-manager",
    metaTitle: "Sample AI Work Plan: Office Manager",
    metaDescription:
      "See a sample AI Work Plan for an Office Manager, including office request tracking, vendor follow-ups, prompt templates, and a 7-day test plan.",
    pageHeadline: "Sample AI Work Plan: Office Manager",
    intro:
      "This sample shows how a report can help someone who coordinates office requests, vendors, supplies, facilities, events, and internal updates.",
    role: "Office Manager",
    openingRecommendation: "Turn scattered office requests and vendor notes into a weekly issue tracker.",
    openingCopy:
      "This is a strong first test because office requests arrive from many places, and missing one can create visible friction.",
    readFirst: {
      headline: "Your best first AI test is turning scattered office requests into a weekly issue tracker.",
      based:
        "Based on this sample interview, your best first AI test is turning scattered office requests into a weekly issue tracker.",
      reasons: [
        "Requests come from email, chat, hallway conversations, and vendor messages.",
        "Many items are small, but they become visible when missed.",
        "The output is easy to review.",
        "AI can organize requests without deciding urgency or spend.",
        "You can test it with safe internal notes.",
      ],
      use: "Grouping office requests, drafting vendor follow-ups, identifying missing details, and creating a simple status table.",
      keep:
        "Urgency, spending decisions, vendor commitments, employee-sensitive details, facilities decisions, and final messages.",
      goal: "Use AI to organize one week of office requests into a reviewed issue tracker.",
    },
    workMap: {
      headline: "Office requests live in too many places.",
      paragraphs: [
        "You coordinate office needs across supplies, vendors, facilities, events, and internal requests.",
        "The work is not one clean queue. It comes through email, chat, verbal requests, invoices, calendar needs, and vendor updates.",
        "The risk is that small issues stay informal until someone notices they were missed.",
      ],
      rows: [
        ["Office request tracker", "Employee requests and quick asks", "Requests live in too many places", "Strong", "Low if internal"],
        ["Vendor follow-ups", "Vendor emails, invoices, or service issues", "Details are easy to lose", "Strong", "Medium"],
        ["Facilities updates", "Repairs, access, deliveries, room issues", "Timing and ownership are unclear", "Medium", "Medium"],
        ["Internal office announcements", "Policy, logistics, or event updates", "Messages need clarity", "Medium", "Medium"],
        ["Event or meeting logistics", "Calendar needs and headcount", "Many moving parts", "Medium", "Medium"],
        ["Employee-sensitive requests", "Private concerns", "Needs discretion", "Not first", "High"],
      ],
      quote:
        "I get a lot of little office requests that are not official tickets, but people still expect them to happen.",
    },
    aiGap: {
      position: "Sporadic.",
      headline: "The gap shows up when memory becomes the office request tracker.",
      paragraphs: [
        "You may already use digital tools to track office work, but AI is not yet connected to the repeated request pattern.",
        "For this role, the risk is not just time. It is visibility. People notice when the office supply, room, repair, badge, lunch, or vendor issue was forgotten.",
        "Based on this sample interview: Your best opportunity is to stop using memory as the main office request tracker.",
      ],
    },
    opportunities: [
      ["Weekly office issue tracker", "Turn scattered notes into request, owner, status, next step, and missing detail.", "Writing assistant plus task system or spreadsheet.", "Office requests come from many places.", "AI may make a request sound approved before it is approved.", "Start now."],
      ["Vendor follow-up drafts", "Draft clear follow-up emails from service notes, invoice questions, or delivery issues.", "Writing assistant or email assistant.", "Vendor communication is repeated and detail-heavy.", "Do not let AI create commitments, prices, or deadlines.", "Start after issue tracker."],
      ["Office announcement cleanup", "Rewrite announcements so employees can scan them quickly.", "Writing assistant or document editor.", "Office managers often send policy, event, and logistics updates.", "AI must not invent policy or change meaning.", "Later."],
      ["Event logistics checklist", "Turn event notes into tasks, owners, headcount, supplies, and open questions.", "Writing assistant plus checklist tool.", "Events have repeated moving parts.", "AI should not decide budget or vendor commitments.", "Later."],
      ["Facilities repair summaries", "Summarize issue history and next steps for vendors or building management.", "Writing assistant.", "Repair issues often have scattered details.", "Remove employee-sensitive or access-sensitive information.", "Later."],
    ],
    boundaries: [
      ["Spending decisions", "AI can organize vendor notes. Do not let it approve costs, purchases, or commitments.", "Office managers may touch budgets, invoices, and vendor quotes."],
      ["Employee-sensitive details", "AI can help rewrite safe internal messages. Do not paste private employee concerns or HR-related details.", "Office requests sometimes include personal or sensitive context."],
      ["Vendor commitments", "AI can draft follow-ups. Do not let it promise delivery dates, payment, or approval.", "A vendor email can create expectations."],
      ["Facilities access", "AI can summarize a repair issue. Do not include access codes, badge details, or security-sensitive information.", "Office operations can involve physical access and security."],
    ],
    firstTest: {
      name: "Turn scattered office requests into a weekly issue tracker.",
      goal: "Stop relying on memory for small requests and make open office items easier to review.",
      tools: "Use a writing assistant to organize notes. Use a spreadsheet, task system, or ticket board for the final reviewed tracker.",
      steps: ["Collect office requests from one week.", "Remove employee-sensitive, access-sensitive, or financial details.", "Ask AI to group them into a tracker.", "Review urgency, owner, status, and missing details.", "Move the reviewed tracker into your normal system."],
      success: ["Open office issues are visible.", "Requests have next steps.", "Missing details are clearly marked.", "You spend less time searching through messages."],
    },
    toolNeeds: {
      assistantLabel: "For the writing assistant, prepare",
      assistant: ["Rough office request notes", "Vendor names or role labels", "Known dates", "Current status", "Whether the request is internal or vendor-facing", "Any approval needed"],
      systemLabel: "For your tracker, prepare",
      system: ["Request title", "Owner", "Status", "Due date", "Next step", "Missing detail"],
      weak: "Organize office stuff from this week.",
      better:
        "Turn these safe office request notes into a weekly issue tracker. Do not mark anything as approved unless I wrote approved. If a date, owner, or status is unclear, mark it as ‘check first.’\n\nNotes:\n- [Team] asked about [office request]\n- Vendor said [issue/update]\n- Need to check [supply/facility/event item]\n- [Person or role] asked whether [logistics question]",
      leaveOut: ["Access codes", "Badge details", "Private employee concerns", "Financial details not approved for AI", "Vendor contract terms", "Anything company policy restricts"],
    },
    ownership: [
      ["Urgency", "AI can sort requests. You still own what is urgent, because you know what affects the office day."],
      ["Spending", "AI can organize vendor information. You still own purchase or budget decisions."],
      ["Vendor promises", "AI can draft follow-ups. You still own what the company promises to vendors."],
      ["Employee privacy", "AI can rewrite safe messages. You still own what should stay private."],
      ["Final status", "AI can prepare a tracker. You still own whether each status is accurate."],
    ],
    prompts: [
      {
        title: "Office request tracker",
        body: `Role/context:
I manage office requests, vendors, supplies, facilities, and internal logistics.

Task:
Turn my rough notes into a weekly office issue tracker.

Input:
[Paste safe notes here.]

Constraints:
- Do not mark anything as approved unless I say it is approved.
- Do not invent deadlines, owners, costs, or vendor commitments.
- Mark unclear items as “check first.”
- Do not include sensitive employee or access information.

Output format:
Create a table with request, source, owner, status, next step, due date, and what I should verify.

Before you finish:
List any approvals, costs, vendor promises, or sensitive details I should check.`,
      },
      {
        title: "Vendor follow-up draft",
        body: `Role/context:
I coordinate office vendors and need clear follow-up messages.

Task:
Draft a vendor follow-up from my notes.

Input:
Vendor: [vendor]
Issue: [issue]
Known facts: [facts]
Desired outcome: [outcome]

Constraints:
- Do not promise payment, approval, or timing.
- Keep the tone professional and clear.
- Ask for confirmation where needed.
- Do not include private internal details.

Output format:
Give me one draft email and a “check before sending” list.

Before you finish:
Tell me what I should verify before sending.`,
      },
    ],
    days: [
      "Collect one week of office request notes.",
      "Remove sensitive details and run the tracker prompt.",
      "Review owners, urgency, missing details, and status.",
      "Move reviewed items into your normal tracker.",
      "Try one vendor follow-up draft.",
      "Compare the AI tracker with your usual notes.",
      "Decide whether this should become your weekly office request review.",
    ],
    ifWorks: "Next, test vendor follow-up drafts and event logistics checklists.",
    ifFails: "The likely issue is unclear inputs. Add status labels like new, waiting, approved, blocked, or check first.",
    managerNote:
      "I’m testing AI to organize safe office request notes into a tracker. I’m not using it for employee-sensitive information, access details, vendor commitments, or spending decisions.",
  },
  {
    slug: "customer-support",
    metaTitle: "Sample AI Work Plan: Customer Support Representative",
    metaDescription:
      "See a sample AI Work Plan for a Customer Support Representative, including ticket replies, escalation summaries, prompts, and review rules.",
    pageHeadline: "Sample AI Work Plan: Customer Support Representative",
    intro:
      "This sample shows how a report can help someone who answers tickets, summarizes issues, drafts replies, and escalates customer problems.",
    role: "Customer Support Representative",
    openingRecommendation: "Turn a messy customer ticket thread into a clear reply draft and escalation summary.",
    openingCopy:
      "This is a strong first test because support work depends on clarity, empathy, policy accuracy, and clean handoffs.",
    readFirst: {
      headline: "Your best first AI test is summarizing a messy ticket thread before drafting a customer reply.",
      based:
        "Based on this sample interview, your best first AI test is using AI to summarize a messy ticket thread before drafting a customer reply.",
      reasons: ["Tickets often contain scattered details.", "Customers need clear answers.", "Escalations need concise context.", "You can review the output before sending.", "AI can prepare the reply without making policy decisions."],
      use: "Summarizing the issue, drafting a reply, identifying missing information, and preparing an escalation note.",
      keep: "Empathy, policy calls, refunds, account-specific decisions, customer promises, and final send.",
      goal: "Use AI on three non-sensitive tickets and compare the drafts against your normal replies.",
    },
    workMap: {
      headline: "The hardest part is rebuilding the issue from a long thread.",
      paragraphs: [
        "You handle customer questions, ticket threads, internal notes, and escalations.",
        "Your work has two audiences: the customer who needs a helpful answer and the internal team that may need a clean summary.",
        "The biggest friction is rebuilding the issue from a long thread.",
      ],
      rows: [
        ["Ticket thread summary", "Customer messages and internal notes", "Issue context is scattered", "Strong", "Medium"],
        ["Reply draft", "Known facts and policy", "Tone and accuracy both matter", "Strong", "Medium"],
        ["Escalation summary", "Support cannot resolve alone", "Internal team needs clear context", "Strong", "Medium"],
        ["Macro cleanup", "Repeated answers", "Existing replies may sound stiff", "Medium", "Medium"],
        ["Customer sentiment notes", "Frustrated messages", "Tone needs care", "Medium", "Medium"],
        ["Refunds, credits, policy exceptions", "Customer requests", "Requires authority", "Not first", "High"],
      ],
      quote: "The hard part is not writing the reply. It is making sure I understood the whole thread.",
    },
    aiGap: {
      position: "Sporadic.",
      headline: "The gap appears before the reply is written.",
      paragraphs: [
        "AI may help with wording, but it is not yet attached to a repeatable ticket review process.",
        "The gap shows up before the reply is written: understanding the thread, missing facts, and escalation context.",
        "Based on this sample interview: The opportunity is not to let AI answer customers for you. It is to make every reply easier to check before you send it.",
      ],
    },
    opportunities: [
      ["Ticket thread summary", "Summarize the issue, customer goal, known facts, missing facts, and next best reply.", "Writing assistant or approved support AI.", "Threads contain scattered context.", "AI may miss policy details or overstate certainty.", "Start now."],
      ["Customer reply draft", "Draft a clear response using approved facts and tone.", "Writing assistant or ticketing system assistant.", "Replies are frequent and reviewable.", "AI must not promise refunds, timelines, or outcomes.", "Start now after summary test."],
      ["Escalation summary", "Create internal notes for product, billing, or technical teams.", "Writing assistant or ticketing system.", "Escalations need concise context.", "Remove customer-sensitive details when not needed.", "Start now."],
      ["Macro rewrite", "Make repeated replies clearer and warmer.", "Writing assistant.", "Macros often become stiff or outdated.", "Approved policy language must not change.", "Later."],
      ["Sentiment and tone check", "Flag where a reply may sound cold or unclear.", "Writing assistant.", "Tone matters in support.", "AI cannot judge policy or customer entitlement.", "Later."],
    ],
    boundaries: [
      ["Policy decisions", "AI can summarize the issue. Do not let it decide refunds, credits, exceptions, or eligibility.", "Support decisions can affect customers and company policy."],
      ["Customer promises", "AI can draft language. Do not let it promise timelines, fixes, or outcomes.", "Customers may rely on the wording."],
      ["Sensitive customer data", "AI can work from safe summaries. Do not paste private account data unless your company allows it.", "Ticket threads can contain personal or account-specific information."],
      ["Final send", "AI can prepare a reply. Do not send without checking tone, facts, and policy.", "The customer sees the final answer, not the draft."],
    ],
    firstTest: {
      name: "Turn a messy ticket thread into a clear reply draft and escalation summary.",
      goal: "Reduce time spent reconstructing the issue while improving clarity before sending.",
      tools: "Use your company-approved support AI or a writing assistant for safe summaries. Use your ticketing system for the final reply and internal note.",
      steps: ["Choose a non-sensitive ticket.", "Remove private customer data if needed.", "Ask AI for an issue summary, missing facts, reply draft, and escalation note.", "Check facts, tone, policy, and promises.", "Send only after manual review."],
      success: ["You understand the thread faster.", "The draft is easier to edit than starting from scratch.", "Missing facts are visible.", "Escalations are clearer."],
    },
    toolNeeds: {
      assistantLabel: "For the writing assistant, prepare",
      assistant: ["Customer issue summary", "Known facts", "Relevant approved policy", "What has already been tried", "Desired tone", "What not to promise"],
      systemLabel: "For the ticketing system, prepare",
      system: ["Final reviewed reply", "Internal note", "Escalation owner", "Tags or status", "Follow-up date"],
      weak: "Reply to this customer.",
      better:
        "Summarize this safe ticket thread and draft a reply. Do not promise refunds, fixes, or timelines. Mark missing facts as questions to check.\n\nCustomer issue:\n[summary]\n\nKnown facts:\n[facts]\n\nApproved policy:\n[policy or link/summary]\n\nTone:\n[empathetic, clear, concise]",
      leaveOut: ["Full account numbers", "Passwords", "Payment details", "Private customer information", "Internal-only policy that cannot be shared", "Anything company policy restricts"],
    },
    ownership: [
      ["Empathy", "AI can draft a reply. You still own whether the customer feels heard."],
      ["Policy", "AI can reference policy text. You still own whether the policy applies."],
      ["Promises", "AI can suggest wording. You still own timelines, refunds, fixes, and commitments."],
      ["Escalation", "AI can summarize the issue. You still own whether escalation is needed."],
      ["Final send", "AI can prepare the message. You still own the final customer-facing reply."],
    ],
    prompts: [
      {
        title: "Ticket thread to reply draft",
        body: `Role/context:
I work in customer support and need to answer tickets clearly and carefully.

Task:
Summarize this ticket and draft a customer reply I can review.

Input:
Customer issue: [paste safe summary]
Known facts: [facts]
Relevant policy: [policy]
What has already been tried: [steps]
Desired outcome: [outcome]

Constraints:
- Do not promise refunds, credits, fixes, or timelines.
- If a fact is missing, mark it as “check first.”
- Keep the tone empathetic, clear, and concise.
- Do not include sensitive customer data.

Output format:
1. Issue summary
2. Missing facts
3. Draft customer reply
4. Internal escalation note
5. What I should verify before sending

Before you finish:
List anything that could create a customer promise.`,
      },
      {
        title: "Escalation summary",
        body: `Role/context:
I need to escalate a customer issue to another team.

Task:
Create a concise internal escalation summary.

Input:
Issue: [issue]
Customer impact: [impact]
Steps tried: [steps]
Evidence: [safe details]
Question for internal team: [question]

Constraints:
- Do not add facts that are not included.
- Separate confirmed facts from assumptions.
- Keep it concise.
- Remove customer-sensitive details unless needed.

Output format:
Create sections for summary, customer impact, steps tried, open question, and urgency.

Before you finish:
List what I should confirm before escalating.`,
      },
    ],
    days: ["Use AI to summarize one non-sensitive ticket thread.", "Add approved policy text and ask for a draft reply.", "Try the same process on a different ticket type.", "Use AI to prepare one internal escalation summary.", "Compare AI drafts against your normal replies.", "Note where AI created risk or saved effort.", "Decide which ticket types are safe enough for this process."],
    ifWorks: "Next, test macro cleanup and escalation templates.",
    ifFails: "The likely issue is missing policy context. Add approved policy and stricter “do not promise” instructions.",
    managerNote:
      "I’m testing AI on safe ticket summaries and draft replies. I’m not using it to decide refunds, policy exceptions, or customer promises, and I review everything before sending.",
  },
  {
    slug: "finance-accounting",
    metaTitle: "Sample AI Work Plan: Finance / Accounting Associate",
    metaDescription:
      "See a sample AI Work Plan for a Finance or Accounting Associate, including invoice exceptions, spreadsheet support, prompts, and review cautions.",
    pageHeadline: "Sample AI Work Plan: Finance / Accounting Associate",
    intro:
      "This sample shows how a report can help someone who handles invoices, reconciliations, spreadsheets, month-end support, and finance questions.",
    role: "Finance / Accounting Associate",
    openingRecommendation: "Turn invoice and payment questions into an exception tracker with draft clarification emails.",
    openingCopy:
      "This is a strong first test because AI can organize finance questions, but you still control numbers, approvals, and accounting judgment.",
    readFirst: {
      headline: "Your best first AI test is turning invoice and payment questions into a clean exception tracker.",
      based:
        "Based on this sample interview, your best first AI test is turning invoice and payment questions into a clean exception tracker.",
      reasons: ["Exceptions repeat every week.", "The work is structured.", "The output is easy to verify.", "AI can draft clarification messages.", "You still own the numbers and approvals."],
      use: "Organizing exceptions, drafting clarification emails, summarizing what needs review, and preparing variance questions.",
      keep: "Amounts, account coding, approvals, accounting treatment, vendor-sensitive details, and final explanations.",
      goal: "Use AI on one safe set of invoice questions and review every number before using the output.",
    },
    workMap: {
      headline: "The friction is tracking exceptions and explaining differences clearly.",
      paragraphs: [
        "You support finance work through invoices, reconciliations, spreadsheets, month-end tasks, and questions from coworkers or vendors.",
        "The friction is not only the math. It is tracking exceptions, explaining differences, and writing follow-up questions clearly.",
      ],
      rows: [
        ["Invoice exception tracker", "Mismatched or unclear invoices", "Open questions get scattered", "Strong", "Medium"],
        ["Clarification email drafts", "Vendor or internal questions", "Messages need precision", "Strong", "Medium"],
        ["Spreadsheet formula help", "Repetitive spreadsheet work", "Formula logic takes time", "Medium", "Medium"],
        ["Variance explanation draft", "Month-end or report changes", "Wording takes time", "Medium", "High if numbers unchecked"],
        ["Month-end checklist", "Recurring close tasks", "Steps can be missed", "Medium", "Medium"],
        ["Accounting treatment or approval", "Judgment calls", "Requires policy and authority", "Not first", "High"],
      ],
      quote: "I spend a lot of time figuring out what needs to be checked before I can move an invoice forward.",
    },
    aiGap: {
      position: "Starting.",
      headline: "The gap shows up around the numbers, not instead of the numbers.",
      paragraphs: [
        "AI is not yet attached to the repeated exception process. That does not mean your finance judgment is behind.",
        "The organizing, drafting, and checklist parts are still mostly manual.",
        "Based on this sample interview: The opportunity is to use AI around the numbers, not instead of checking the numbers.",
      ],
    },
    opportunities: [
      ["Invoice exception tracker", "Turn notes into vendor, issue, amount to check, owner, next step, and status.", "Writing assistant plus spreadsheet.", "Exceptions are repeated and structured.", "AI must not invent numbers or approvals.", "Start now."],
      ["Clarification email drafts", "Draft clear questions to vendors or internal teams.", "Writing assistant or email assistant.", "Finance questions need clear wording.", "Do not promise payment, approval, or accounting treatment.", "Start now."],
      ["Spreadsheet formula explanation", "Explain or draft formulas using non-sensitive sample data.", "Spreadsheet assistant or writing assistant.", "Formula support can reduce trial and error.", "Test formulas manually before using.", "Later."],
      ["Variance explanation draft", "Draft a plain-English explanation after numbers are verified.", "Writing assistant.", "Month-end explanations often need careful wording.", "AI cannot validate the numbers.", "Later."],
      ["Month-end checklist cleanup", "Turn recurring steps into a checklist with owners and dates.", "Writing assistant plus task system.", "Close work has repeated steps.", "Confirm deadlines and approval owners.", "Later."],
    ],
    boundaries: [
      ["Numbers", "AI can organize rows and questions. Do not let it decide whether numbers are correct.", "Finance work depends on accuracy."],
      ["Approvals", "AI can draft an approval request. Do not let it approve payment or coding.", "Approval authority matters."],
      ["Sensitive financial data", "AI can work from safe examples. Do not paste confidential financial details unless approved.", "Invoices, vendors, and payment data may be sensitive."],
      ["Accounting treatment", "AI can list questions. Do not use it to decide policy, treatment, or compliance.", "Accounting judgment needs approved guidance."],
    ],
    firstTest: {
      name: "Turn invoice and payment questions into an exception tracker.",
      goal: "Make open finance questions visible before they slow down approvals or month-end work.",
      tools: "Use a writing assistant to organize notes and draft questions. Use a spreadsheet for the final reviewed tracker.",
      steps: ["Collect a safe set of invoice or payment questions.", "Remove confidential vendor, payment, or account details if needed.", "Ask AI to create an exception tracker.", "Review every amount, owner, and next step.", "Draft clarification emails only after review."],
      success: ["Each exception has a clear next step.", "Missing information is marked.", "Clarification emails are easier to send.", "No numbers are used without your review."],
    },
    toolNeeds: {
      assistantLabel: "For the writing assistant, prepare",
      assistant: ["Safe invoice issue notes", "Amount placeholders if needed", "Vendor or role labels", "Known approval owner", "Current status", "What needs clarification"],
      systemLabel: "For the spreadsheet, prepare",
      system: ["Vendor or role", "Invoice/date reference", "Issue", "Amount to verify", "Owner", "Status", "Next step"],
      weak: "Organize these invoices.",
      better:
        "Turn these safe invoice questions into an exception tracker. Do not invent amounts, approval status, coding, or payment timing. Mark unclear items as ‘check first.’\n\nNotes:\n- [Vendor or role] invoice has [issue]\n- Amount to verify: [amount or placeholder]\n- Approval owner: [person or role]\n- Current status: [status]\n- Question to ask: [question]",
      leaveOut: ["Bank details", "Full account numbers", "Confidential vendor terms", "Unapproved financial data", "Payroll or employee-sensitive information"],
    },
    ownership: [
      ["Numbers", "AI can organize finance questions. You still own whether each number is correct."],
      ["Approval", "AI can draft a request. You still own whether approval exists."],
      ["Accounting treatment", "AI can help list questions. You still own the final treatment or escalation."],
      ["Vendor communication", "AI can draft an email. You still own what is promised."],
      ["Sensitive data", "AI can work from placeholders. You still own what is safe to paste."],
    ],
    prompts: [
      {
        title: "Invoice exception tracker",
        body: `Role/context:
I support finance and accounting work involving invoices, payment questions, spreadsheets, and approvals.

Task:
Turn my invoice notes into an exception tracker.

Input:
[Paste safe notes here.]

Constraints:
- Do not invent amounts, approvals, account coding, or payment timing.
- Mark unclear items as “check first.”
- Keep vendor questions clear and professional.
- Do not include sensitive financial details.

Output format:
Create a table with vendor or role, issue, amount to verify, owner, status, next step, clarification question, and what I should check.

Before you finish:
List every number, approval, and commitment I should verify.`,
      },
      {
        title: "Clarification email draft",
        body: `Role/context:
I need to ask a clear finance clarification question.

Task:
Draft a short clarification email.

Input:
Recipient: [vendor or internal role]
Issue: [issue]
Known facts: [facts]
Question: [question]

Constraints:
- Do not promise payment or approval.
- Do not add numbers I did not provide.
- Keep the tone professional and concise.
- Mark missing information clearly.

Output format:
Give me one draft email and a checklist of what to verify.

Before you finish:
Tell me whether the draft creates any promise or assumption.`,
      },
    ],
    days: ["Choose one safe set of invoice questions.", "Run the exception tracker prompt.", "Review every number, owner, and status.", "Draft one clarification email.", "Add the reviewed tracker to your spreadsheet.", "Note where AI helped and where it guessed.", "Decide whether to use this for weekly exception review."],
    ifWorks: "Next, test month-end checklist cleanup and variance explanation drafts after numbers are verified.",
    ifFails: "The likely issue is not enough structure in the notes. Add fields for vendor, issue, amount to verify, owner, and status.",
    managerNote:
      "I’m testing AI to organize safe invoice questions and draft clarification emails. I’m not using it to validate numbers, approve payments, or decide accounting treatment.",
  },
  {
    slug: "hr-coordinator",
    metaTitle: "Sample AI Work Plan: HR Coordinator",
    metaDescription:
      "See a sample AI Work Plan for an HR Coordinator, including candidate coordination, privacy boundaries, prompts, and a 7-day plan.",
    pageHeadline: "Sample AI Work Plan: HR Coordinator",
    intro:
      "This sample shows how a report can help someone who coordinates interviews, employee paperwork, onboarding, HR messages, and internal requests.",
    role: "HR Coordinator",
    openingRecommendation: "Turn candidate and interview coordination notes into a next-step checklist.",
    openingCopy:
      "This is a strong first test because AI can organize coordination work, while you keep privacy, fairness, and decisions in human hands.",
    readFirst: {
      headline: "Your best first AI test is turning interview coordination notes into a next-step checklist.",
      based:
        "Based on this sample interview, your best first AI test is turning candidate and interview coordination notes into a next-step checklist.",
      reasons: ["Interview coordination has repeated steps.", "Missing a detail creates a visible candidate experience problem.", "The output is easy to review.", "AI can organize tasks without evaluating candidates.", "You can keep sensitive details out."],
      use: "Organizing interview logistics, drafting neutral scheduling messages, creating onboarding checklists, and marking missing details.",
      keep: "Candidate decisions, fairness, privacy, policy interpretation, employee-sensitive information, and final HR messages.",
      goal: "Use AI on one safe coordination workflow and review every message before sending.",
    },
    workMap: {
      headline: "The work is detail-heavy and privacy-sensitive.",
      paragraphs: [
        "You coordinate HR work across candidates, interviewers, employees, managers, and internal systems.",
        "The work is detail-heavy and privacy-sensitive. The main friction is keeping next steps clear without mixing coordination with decisions.",
      ],
      rows: [
        ["Interview coordination checklist", "Candidate stage and interviewer availability", "Next steps are easy to miss", "Strong", "Medium"],
        ["Scheduling message drafts", "Interview or onboarding logistics", "Tone and clarity matter", "Strong", "Medium"],
        ["Onboarding checklist", "New hire process", "Many repeated steps", "Medium", "Medium"],
        ["Employee request summary", "Internal HR questions", "Privacy-sensitive", "Light", "High"],
        ["Job post cleanup", "Draft job descriptions", "Needs careful language", "Medium", "Medium to high"],
        ["Candidate evaluation", "Interview feedback", "Decision-sensitive", "Not first", "High"],
      ],
      quote: "I need help keeping the process moving, but I do not want AI anywhere near hiring decisions.",
    },
    aiGap: {
      position: "Starting.",
      headline: "The right first step is logistics, not evaluation.",
      paragraphs: [
        "AI is not yet attached to repeated HR coordination. That is reasonable because HR work has privacy and fairness risks.",
        "The right first step is not candidate evaluation. It is logistics and checklist support.",
        "Based on this sample interview: The opportunity is to use AI for coordination while keeping decisions, privacy, and policy with you.",
      ],
    },
    opportunities: [
      ["Interview next-step checklist", "Turn stage notes into next steps, owners, dates, and missing details.", "Writing assistant plus HR system or task tool.", "Coordination has repeated steps.", "Do not include sensitive candidate evaluation details.", "Start now."],
      ["Scheduling message drafts", "Draft neutral, clear scheduling messages.", "Writing assistant or email assistant.", "Scheduling is repeated and reviewable.", "Do not imply decisions, preferences, or guarantees.", "Start now."],
      ["Onboarding checklist", "Turn onboarding notes into a checklist with owner, due date, and status.", "Writing assistant plus task system.", "Onboarding has repeated steps.", "Remove personal or sensitive employee details.", "Later."],
      ["HR announcement cleanup", "Make approved HR messages clearer and easier to scan.", "Writing assistant or document editor.", "HR messages need clarity.", "AI must not create or interpret policy.", "Later."],
      ["Job post clarity review", "Improve clarity after the job requirements are already approved.", "Writing assistant.", "Job posts are written documents.", "Do not use AI for legal, fairness, or compensation decisions.", "Later."],
    ],
    boundaries: [
      ["Candidate decisions", "AI can organize logistics. Do not use it to rank, reject, or recommend candidates.", "Hiring decisions require fairness, context, and company policy."],
      ["Private employee information", "AI can draft safe messages. Do not paste private employee details into external tools unless approved.", "HR work often contains sensitive personal information."],
      ["Policy interpretation", "AI can make approved text clearer. Do not use it to decide what policy means.", "HR policy needs trusted internal guidance."],
      ["Candidate promises", "AI can draft scheduling notes. Do not let it imply an offer, decision, or guarantee.", "Candidate communication must stay neutral and accurate."],
    ],
    firstTest: {
      name: "Turn candidate and interview coordination notes into a next-step checklist.",
      goal: "Keep the process moving without using AI to make hiring decisions.",
      tools: "Use a writing assistant for checklist organization and neutral message drafts. Use your HR system, calendar, or task tool for final reviewed steps.",
      steps: ["Choose one active but non-sensitive coordination workflow.", "Remove evaluation details and private candidate information.", "Ask AI to create a next-step checklist.", "Review owners, dates, and wording.", "Move reviewed steps into your HR system or calendar."],
      success: ["Next steps are clear.", "Scheduling messages are easier to draft.", "Missing information is visible.", "No candidate decision is made by AI."],
    },
    toolNeeds: {
      assistantLabel: "For the writing assistant, prepare",
      assistant: ["Candidate stage without evaluation notes", "Interview step", "Interviewer roles", "Known dates or windows", "Message purpose", "Missing details"],
      systemLabel: "For your HR system or task tool, prepare",
      system: ["Final reviewed tasks", "Owners", "Due dates", "Candidate stage", "Status", "Internal notes"],
      weak: "Help with this candidate.",
      better:
        "Turn these safe interview coordination notes into a next-step checklist. Do not evaluate the candidate. Do not imply a hiring decision. Mark missing dates or owners as ‘check first.’\n\nNotes:\n- Candidate stage: [stage]\n- Next interview type: [interview type]\n- Interviewer roles: [roles]\n- Date options: [dates]\n- Missing details: [details]",
      leaveOut: ["Candidate evaluation notes", "Private employee information", "Compensation details", "Protected-class information", "Medical or accommodation details", "Anything company policy restricts"],
    },
    ownership: [
      ["Fairness", "AI can organize steps. You still own fairness because hiring decisions need human review and company policy."],
      ["Privacy", "AI can work from safe notes. You still own what candidate or employee information should be protected."],
      ["Candidate communication", "AI can draft messages. You still own final wording and timing."],
      ["Policy", "AI can clarify approved language. You still own policy interpretation or escalation."],
      ["Final status", "AI can prepare a checklist. You still own whether the process status is accurate."],
    ],
    prompts: [
      {
        title: "Interview next-step checklist",
        body: `Role/context:
I coordinate interviews and HR process steps.

Task:
Turn these safe coordination notes into a next-step checklist.

Input:
Candidate stage: [stage]
Interview type: [type]
Interviewer roles: [roles]
Known dates: [dates]
Missing details: [details]

Constraints:
- Do not evaluate the candidate.
- Do not recommend a hiring decision.
- Do not imply an offer or rejection.
- Mark missing information as “check first.”
- Keep messages neutral and professional.

Output format:
Create a checklist with step, owner, due date, message needed, status, and what I should verify.

Before you finish:
List anything that could imply a decision or require HR approval.`,
      },
      {
        title: "Neutral scheduling message",
        body: `Role/context:
I send candidate scheduling messages.

Task:
Draft a neutral scheduling message.

Input:
Candidate name placeholder: [candidate]
Interview type: [type]
Date options: [dates]
Interviewer role: [role]
Logistics: [logistics]

Constraints:
- Do not imply a hiring decision.
- Do not add dates or details I did not provide.
- Keep the tone warm, clear, and professional.
- Do not include sensitive internal information.

Output format:
Give me one draft message and a check-before-sending list.

Before you finish:
Tell me what I should verify before sending.`,
      },
    ],
    days: ["Choose one safe interview coordination workflow.", "Run the checklist prompt.", "Review dates, owners, and missing details.", "Draft one neutral scheduling message.", "Move reviewed steps into your HR system or calendar.", "Compare against your normal coordination notes.", "Decide which HR coordination tasks are safe for this process."],
    ifWorks: "Next, test onboarding checklists and approved HR announcement cleanup.",
    ifFails: "The likely issue is too much sensitive or decision-related context. Strip the input down to logistics only.",
    managerNote:
      "I’m testing AI for HR coordination logistics only. I’m not using it for candidate evaluation, hiring decisions, employee-sensitive information, or policy interpretation.",
  },
  {
    slug: "sales-coordinator",
    metaTitle: "Sample AI Work Plan: Sales Coordinator / Account Coordinator",
    metaDescription:
      "See a sample AI Work Plan for a Sales Coordinator or Account Coordinator, including CRM updates, follow-up drafts, prompts, and review rules.",
    pageHeadline: "Sample AI Work Plan: Sales Coordinator / Account Coordinator",
    intro:
      "This sample shows how a report can help someone supporting sales teams with CRM notes, follow-ups, proposals, handoffs, and customer requests.",
    role: "Sales Coordinator / Account Coordinator",
    openingRecommendation: "Turn call notes and email threads into a CRM update and follow-up checklist.",
    openingCopy:
      "This is a strong first test because sales coordination depends on clean handoffs, accurate next steps, and careful customer-facing language.",
    readFirst: {
      headline: "Your best first AI test is turning sales notes into a CRM update and follow-up checklist.",
      based:
        "Based on this sample interview, your best first AI test is turning call notes and email threads into a CRM update and follow-up checklist.",
      reasons: ["Sales follow-ups are frequent.", "Details get scattered between calls, email, and CRM.", "The output is easy to review.", "AI can draft and organize without deciding pricing or strategy.", "Missed follow-ups are visible."],
      use: "Summarizing customer requests, drafting follow-up notes, preparing CRM updates, and marking missing information.",
      keep: "Pricing, promises, account strategy, contract details, customer-sensitive information, and final wording.",
      goal: "Use AI on one safe account follow-up and compare the output with your normal CRM update.",
    },
    workMap: {
      headline: "Customer context lives in several places.",
      paragraphs: [
        "You support sales or account work by keeping notes, follow-ups, CRM fields, proposal steps, and handoffs organized.",
        "The friction is that customer context lives in several places. The risk is that a small missing detail can affect a salesperson, customer, or internal team.",
      ],
      rows: [
        ["CRM update", "Call notes and email threads", "Details are scattered", "Strong", "Medium"],
        ["Follow-up checklist", "Customer asks and sales notes", "Next steps can be missed", "Strong", "Medium"],
        ["Customer email draft", "Approved facts", "Tone and promises matter", "Medium", "Medium to high"],
        ["Proposal checklist", "Deal requirements", "Many dependencies", "Medium", "Medium"],
        ["Internal handoff summary", "Deal or account transition", "Context must be concise", "Medium", "Medium"],
        ["Pricing or contract decisions", "Customer negotiation", "Requires authority", "Not first", "High"],
      ],
      quote: "I spend a lot of time turning messy sales notes into something the team can actually use.",
    },
    aiGap: {
      position: "Sporadic.",
      headline: "The gap appears between conversations and systems.",
      paragraphs: [
        "AI may help with writing, but it is not yet attached to the repeated sales coordination loop.",
        "The gap shows up between conversations and systems: notes, CRM fields, follow-ups, and internal handoffs.",
        "Based on this sample interview: The opportunity is to use AI to clean up the coordination layer, not to make sales decisions.",
      ],
    },
    opportunities: [
      ["CRM update from notes", "Turn safe call notes into summary, next steps, open questions, and CRM field suggestions.", "Writing assistant plus CRM.", "CRM updates often come from messy notes.", "AI may invent deal stage, pricing, or commitments.", "Start now."],
      ["Follow-up checklist", "Extract customer requests, internal owners, deadlines, and missing details.", "Writing assistant plus task system or CRM.", "Follow-ups are visible and repeated.", "Confirm dates and commitments.", "Start now."],
      ["Customer follow-up draft", "Draft a clear follow-up email from approved facts.", "Writing assistant or email assistant.", "Many follow-ups have similar structure.", "Do not promise pricing, timelines, or contract terms.", "Later."],
      ["Proposal checklist", "Turn proposal notes into documents needed, owners, due dates, and open questions.", "Writing assistant plus project/task tool.", "Proposals require coordination.", "Do not decide scope, pricing, or legal terms.", "Later."],
      ["Internal handoff summary", "Summarize customer context for account, success, or implementation teams.", "Writing assistant or CRM assistant.", "Handoffs need concise context.", "Remove sensitive or unapproved details.", "Later."],
    ],
    boundaries: [
      ["Pricing", "AI can organize notes. Do not let it decide or imply pricing.", "Pricing changes customer expectations."],
      ["Customer promises", "AI can draft follow-ups. Do not let it promise timelines, deliverables, or contract terms.", "Written language can become a commitment."],
      ["Account strategy", "AI can summarize context. Do not let it decide the strategy or next move.", "Sales context depends on human judgment."],
      ["Sensitive customer details", "AI can work from safe summaries. Do not paste sensitive account details unless approved.", "Customer data can be sensitive."],
    ],
    firstTest: {
      name: "Turn call notes and email threads into a CRM update and follow-up checklist.",
      goal: "Make account follow-ups clearer without relying on memory or scattered notes.",
      tools: "Use a writing assistant to organize notes. Use your CRM or normal task system for the reviewed update.",
      steps: ["Choose one safe account or opportunity.", "Collect call notes and relevant email notes.", "Remove sensitive pricing, contract, or customer details if needed.", "Ask AI for a CRM-ready summary and follow-up checklist.", "Review every commitment before updating the CRM."],
      success: ["CRM notes are easier to write.", "Open questions are visible.", "Follow-ups have owners and dates.", "No pricing or customer promise is invented."],
    },
    toolNeeds: {
      assistantLabel: "For the writing assistant, prepare",
      assistant: ["Safe call notes", "Customer request summary", "Known next steps", "Internal owners", "Deal stage if already confirmed", "What not to promise"],
      systemLabel: "For the CRM or task system, prepare",
      system: ["Final account summary", "Next step", "Owner", "Due date", "Open question", "Follow-up note"],
      weak: "Summarize this sales call.",
      better:
        "Turn these safe sales notes into a CRM update and follow-up checklist. Do not invent pricing, deal stage, timelines, or customer commitments.\n\nNotes:\n- Customer asked about [request]\n- Current confirmed stage: [stage]\n- Follow-up needed: [follow-up]\n- Internal owner: [role]\n- Open question: [question]",
      leaveOut: ["Contract terms", "Sensitive pricing", "Confidential customer details", "Internal strategy not approved for AI", "Personal contact data not needed for the task"],
    },
    ownership: [
      ["Pricing", "AI can organize notes. You still own anything related to price or discount."],
      ["Promises", "AI can draft follow-ups. You still own timelines, deliverables, and commitments."],
      ["CRM accuracy", "AI can suggest updates. You still own whether CRM fields are correct."],
      ["Account context", "AI can summarize facts. You still own the meaning of the account context."],
      ["Final wording", "AI can draft. You still own customer-facing language."],
    ],
    prompts: [
      {
        title: "Sales notes to CRM update",
        body: `Role/context:
I support sales coordination and need to turn call notes and email threads into clean CRM updates.

Task:
Create a CRM-ready summary and follow-up checklist.

Input:
Account or opportunity: [name or placeholder]
Confirmed stage: [stage]
Safe notes: [notes]
Known next steps: [steps]
Open questions: [questions]

Constraints:
- Do not invent pricing, deal stage, timelines, or commitments.
- Separate confirmed facts from questions.
- Keep the wording clear and concise.
- Do not include sensitive customer details.

Output format:
Create sections for CRM summary, next steps, owners, due dates, open questions, and what I should verify.

Before you finish:
List anything that could create a customer promise.`,
      },
      {
        title: "Customer follow-up draft",
        body: `Role/context:
I help prepare sales follow-up messages.

Task:
Draft a customer follow-up email using only approved facts.

Input:
Customer context: [safe summary]
Approved facts: [facts]
Next step: [step]
Tone: [professional, helpful, concise]

Constraints:
- Do not mention pricing unless provided.
- Do not promise timelines or deliverables.
- Do not add details not in the input.
- Keep it concise.

Output format:
Give me one draft email and a check-before-sending list.

Before you finish:
Tell me what I should confirm with the salesperson before sending.`,
      },
    ],
    days: ["Pick one safe account follow-up.", "Run the CRM update prompt.", "Review commitments, stage, owners, and dates.", "Move reviewed notes into the CRM.", "Try one customer follow-up draft with approved facts.", "Compare against your normal CRM notes.", "Decide whether to use this for weekly follow-up cleanup."],
    ifWorks: "Next, test proposal checklists and internal handoff summaries.",
    ifFails: "The likely issue is missing context. Add confirmed stage, owner, and next-step fields.",
    managerNote:
      "I’m testing AI to organize safe sales notes into CRM updates and follow-up checklists. I’m not using it for pricing, account strategy, customer promises, or contract terms.",
  },
  {
    slug: "operations-coordinator",
    legacyFiles: ["operations-manager.html"],
    metaTitle: "Sample AI Work Plan: Operations / Project Coordinator",
    metaDescription:
      "See a sample AI Work Plan for an Operations or Project Coordinator, including status updates, risks, owners, prompts, and a 7-day plan.",
    pageHeadline: "Sample AI Work Plan: Operations / Project Coordinator",
    intro:
      "This sample shows how a report can help someone who tracks tasks, owners, timelines, vendors, internal updates, SOPs, and project details.",
    role: "Operations / Project Coordinator",
    openingRecommendation: "Turn messy project updates into a risks, owners, and next-steps table.",
    openingCopy:
      "This is a strong first test because coordination work depends on making unclear updates visible before they become delays.",
    readFirst: {
      headline: "Your best first AI test is turning project updates into a risks, owners, and next-steps table.",
      based:
        "Based on this sample interview, your best first AI test is turning messy project updates into a clear risks, owners, and next-steps table.",
      reasons: ["Updates arrive from several people.", "Small blockers become larger delays.", "The output is easy to review.", "AI can structure information without deciding priorities.", "The result is useful for status updates."],
      use: "Organizing updates, extracting blockers, drafting status summaries, and identifying missing owners or dates.",
      keep: "Priority, escalation, dependencies, commitments, exceptions, and final status.",
      goal: "Use AI on one internal project update and decide whether the table is useful enough to repeat.",
    },
    workMap: {
      headline: "The hard part is turning scattered updates into a clear view.",
      paragraphs: [
        "You coordinate operations or project details across people, tools, timelines, and recurring updates.",
        "The hard part is not only tracking tasks. It is turning scattered updates into a clear view of what is done, blocked, late, or waiting on someone.",
      ],
      rows: [
        ["Status update table", "Team updates", "Updates are inconsistent", "Strong", "Medium"],
        ["Risks and blockers list", "Delays or unclear dependencies", "Blockers hide in notes", "Strong", "Medium"],
        ["Meeting notes to action items", "Project meetings", "Owners and dates get missed", "Strong", "Low to medium"],
        ["SOP cleanup", "Rough process notes", "Steps are unclear", "Medium", "Medium"],
        ["Vendor or cross-team follow-up", "Dependency or handoff", "Commitments matter", "Medium", "Medium"],
        ["Priority or escalation decision", "Tradeoffs", "Requires context", "Not first", "High"],
      ],
      quote:
        "I usually know what is happening, but it takes too long to turn updates into something clear for everyone else.",
    },
    aiGap: {
      position: "Sporadic.",
      headline: "The gap appears in the repeated coordination loop.",
      paragraphs: [
        "AI may help with writing, but it is not yet attached to the repeated coordination loop.",
        "The gap appears when project updates, risks, owners, and next steps must be cleaned up manually.",
        "Based on this sample interview: The opportunity is to use AI to structure updates before you make decisions about priority or escalation.",
      ],
    },
    opportunities: [
      ["Status update table", "Turn raw updates into done, blocked, waiting, owner, date, and next step.", "Writing assistant plus project or task tool.", "Updates are repeated and structured.", "AI may mark unclear items as done.", "Start now."],
      ["Risks and blockers summary", "Extract blockers, dependencies, possible risks, and questions to resolve.", "Writing assistant.", "Blockers often hide inside messy updates.", "AI should not decide escalation level.", "Start now."],
      ["Meeting notes to action items", "Turn notes into owners, due dates, and clarification questions.", "Writing assistant or meeting notes tool.", "Meetings create follow-up work.", "Confirm owners and dates.", "Later."],
      ["SOP cleanup", "Rewrite rough process notes into step-by-step instructions.", "Writing assistant or document editor.", "Operations work often needs repeatable process documents.", "AI must not invent steps or policy.", "Later."],
      ["Cross-team handoff summary", "Summarize context for another team.", "Writing assistant.", "Handoffs need clarity.", "Remove sensitive internal context where needed.", "Later."],
    ],
    boundaries: [
      ["Priority decisions", "AI can sort updates. Do not let it decide what matters most.", "Priorities depend on people, timelines, and business context."],
      ["Escalation", "AI can flag possible blockers. Do not let it decide when to escalate.", "Escalation affects relationships and expectations."],
      ["Commitments", "AI can draft updates. Do not let it promise dates or completion.", "Status updates can create expectations."],
      ["Process authority", "AI can clean up SOPs. Do not let it create process rules without approval.", "Process changes need ownership."],
    ],
    firstTest: {
      name: "Turn messy project updates into a risks, owners, and next-steps table.",
      goal: "Make updates easier to review before a status message or meeting.",
      tools: "Use a writing assistant to structure updates. Use your project tool, task system, or spreadsheet for the reviewed table.",
      steps: ["Choose one internal project update.", "Paste safe notes from meetings, chats, or task comments.", "Ask AI to create a table of status, owner, risk, next step, and check first.", "Review owners, dates, and blockers.", "Use the reviewed table for your next status update."],
      success: ["Blockers are easier to see.", "Owners and dates are clearer.", "Unclear items are marked.", "Status updates take less effort to prepare."],
    },
    toolNeeds: {
      assistantLabel: "For the writing assistant, prepare",
      assistant: ["Project name or placeholder", "Raw updates", "Known owners", "Known dates", "Current status", "Any known blockers", "Output format"],
      systemLabel: "For the task or project system, prepare",
      system: ["Reviewed task name", "Owner", "Status", "Due date", "Risk level", "Next step"],
      weak: "Summarize these project updates.",
      better:
        "Turn these safe project updates into a status table. Do not mark anything complete unless I say it is complete. If an owner, date, or next step is unclear, mark it as ‘check first.’\n\nUpdates:\n- [update]\n- [blocker]\n- [owner/date if known]\n- [open question]",
      leaveOut: ["Confidential project plans", "Sensitive customer data", "Financial details", "Personnel issues", "Anything not approved for AI tools"],
    },
    ownership: [
      ["Priority", "AI can organize updates. You still own what matters most."],
      ["Escalation", "AI can flag risks. You still own whether something needs escalation."],
      ["Dependencies", "AI can list dependencies. You still own whether they are accurate."],
      ["Commitments", "AI can draft status language. You still own what dates or outcomes are promised."],
      ["Final status", "AI can prepare a summary. You still own whether the status is true."],
    ],
    prompts: [
      {
        title: "Project updates to status table",
        body: `Role/context:
I coordinate operations or project work across tasks, owners, timelines, and updates.

Task:
Turn these raw updates into a status table I can review.

Input:
Project: [project or placeholder]
Raw updates: [paste safe updates]
Known owners: [owners]
Known dates: [dates]

Constraints:
- Do not invent owners, dates, completion, or commitments.
- Mark unclear items as “check first.”
- Separate confirmed blockers from possible risks.
- Keep the wording concise.

Output format:
Create a table with item, owner, status, risk or blocker, next step, due date, and what I should verify.

Before you finish:
List anything that needs clarification before I share this update.`,
      },
      {
        title: "Status update draft",
        body: `Role/context:
I prepare internal status updates.

Task:
Draft a short internal status update from the reviewed table.

Input:
Reviewed table: [paste table]
Audience: [audience]
Tone: [clear, factual, concise]

Constraints:
- Do not add new dates or commitments.
- Separate done, blocked, and waiting.
- Keep the message easy to scan.
- Do not include sensitive information.

Output format:
Give me one status update and a check-before-sending list.

Before you finish:
Tell me what could be misread as a commitment.`,
      },
    ],
    days: ["Choose one internal project update.", "Run the status table prompt.", "Review owners, dates, blockers, and unclear items.", "Use the reviewed table in your normal project tool.", "Draft one internal status update.", "Compare with your usual update process.", "Decide whether to repeat this weekly."],
    ifWorks: "Next, test meeting notes to action items and SOP cleanup.",
    ifFails: "The likely issue is mixed updates. Separate completed work, blockers, and questions before running the prompt.",
    managerNote:
      "I’m testing AI to structure safe internal project updates. I’m not using it to set priorities, escalate issues, or make commitments without review.",
  },
  {
    slug: "junior-analyst",
    metaTitle: "Sample AI Work Plan: Junior Analyst / Reporting Associate",
    metaDescription:
      "See a sample AI Work Plan for a Junior Analyst or Reporting Associate, including spreadsheet notes, report outlines, prompts, and review rules.",
    pageHeadline: "Sample AI Work Plan: Junior Analyst / Reporting Associate",
    intro:
      "This sample shows how a report can help someone who prepares reports, cleans spreadsheets, summarizes findings, and answers data questions.",
    role: "Junior Analyst / Reporting Associate",
    openingRecommendation: "Turn spreadsheet notes into a report outline, variance questions, and review checklist.",
    openingCopy:
      "This is a strong first test because AI can help structure analysis, but you still own the numbers, sources, and final conclusions.",
    readFirst: {
      headline: "Your best first AI test is turning spreadsheet notes into a report outline and review checklist.",
      based:
        "Based on this sample interview, your best first AI test is turning spreadsheet notes into a report outline and review checklist.",
      reasons: ["Reporting work repeats.", "The hardest part is often organizing what the numbers might mean.", "The output is reviewable.", "AI can help find questions, not make final conclusions.", "You can use placeholders or safe data summaries."],
      use: "Structuring report notes, drafting variance questions, explaining formulas, and preparing a first-pass summary.",
      keep: "Source checking, numbers, assumptions, analysis, recommendations, and final conclusions.",
      goal: "Use AI on one safe report draft and check whether it helps you ask better questions before finalizing.",
    },
    workMap: {
      headline: "The work is more than producing numbers.",
      paragraphs: [
        "You prepare reports and analysis using spreadsheets, source data, notes, and requests from managers or teams.",
        "The work involves more than producing numbers. You need to explain what changed, what might matter, and what still needs checking.",
      ],
      rows: [
        ["Report outline", "Spreadsheet notes or manager request", "Hard to organize findings", "Strong", "Medium"],
        ["Variance questions", "Changes in numbers", "Need to know what to investigate", "Strong", "Medium"],
        ["Formula explanation", "Spreadsheet formulas", "Formula logic can be unclear", "Medium", "Medium"],
        ["Summary draft", "Verified numbers", "Wording takes time", "Medium", "Medium"],
        ["Data cleanup checklist", "Messy spreadsheet", "Quality issues hide in rows", "Medium", "Medium"],
        ["Final recommendation", "Business decision", "Requires judgment", "Not first", "High"],
      ],
      quote: "I do not want AI to tell me the answer. I want help figuring out what to check.",
    },
    aiGap: {
      position: "Applied.",
      headline: "The gap shows up between spreadsheet work and final explanation.",
      paragraphs: [
        "You may already use AI for wording or formula help, but the bigger opportunity is attaching it to the reporting loop.",
        "The gap shows up between spreadsheet work and the final explanation.",
        "Based on this sample interview: The opportunity is to use AI as a review and structure assistant, not as the source of truth.",
      ],
    },
    opportunities: [
      ["Report outline from notes", "Turn spreadsheet notes into sections, questions, and required checks.", "Writing assistant plus spreadsheet.", "Reports need structure before final writing.", "AI cannot verify the numbers.", "Start now."],
      ["Variance question list", "Generate questions to investigate changes.", "Writing assistant or spreadsheet assistant.", "Variance work needs disciplined checking.", "AI may suggest irrelevant causes.", "Start now."],
      ["Formula explanation", "Explain formula logic using safe examples.", "Spreadsheet assistant.", "Formula support can reduce confusion.", "Test formulas manually.", "Later."],
      ["Summary draft", "Draft a plain-English summary after numbers are verified.", "Writing assistant.", "Reporting often requires clear explanation.", "AI must not invent causes or conclusions.", "Later."],
      ["Data cleanup checklist", "Create checks for blanks, duplicates, outliers, and mismatched categories.", "Spreadsheet assistant or writing assistant.", "Cleanup is repeated and structured.", "AI cannot replace source validation.", "Later."],
    ],
    boundaries: [
      ["Numbers", "AI can organize notes. Do not let it decide whether a number is correct.", "Reports depend on source accuracy."],
      ["Sources", "AI can list sources to check. Do not use it as the source of truth.", "Your report must trace back to real data."],
      ["Recommendations", "AI can draft options. Do not let it make the final recommendation.", "Recommendations depend on context and accountability."],
      ["Confidential data", "AI can work from summaries or placeholders. Do not paste sensitive data unless approved.", "Reporting may include sensitive business data."],
    ],
    firstTest: {
      name: "Turn spreadsheet notes into a report outline, variance questions, and review checklist.",
      goal: "Prepare a better report draft without letting AI decide what the numbers mean.",
      tools: "Use a writing assistant for structure, questions, and draft language. Use your spreadsheet tool for verified data and formulas.",
      steps: ["Choose one safe report or spreadsheet summary.", "Write short notes about what changed.", "Ask AI for an outline, variance questions, and review checklist.", "Check every number and source yourself.", "Use only the parts that help your final report."],
      success: ["Your report outline is clearer.", "You have better questions to investigate.", "The summary draft is easier to edit.", "No claim is used without checking the data."],
    },
    toolNeeds: {
      assistantLabel: "For the writing assistant, prepare",
      assistant: ["Report purpose", "Audience", "Safe notes about changes", "Verified numbers or placeholders", "Known assumptions", "Questions you already have"],
      systemLabel: "For the spreadsheet, prepare",
      system: ["Source tabs", "Metric definitions", "Date ranges", "Formulas to verify", "Known data quality issues"],
      weak: "Explain this spreadsheet.",
      better:
        "Help me turn these safe spreadsheet notes into a report outline and review checklist. Do not invent causes or conclusions. Mark anything I need to verify.\n\nReport purpose: [purpose]\nAudience: [audience]\nMetrics: [metrics]\nObserved changes: [changes]\nKnown assumptions: [assumptions]",
      leaveOut: ["Confidential financial data", "Customer-identifying data", "Employee data", "Unapproved source files", "Sensitive business plans"],
    },
    ownership: [
      ["Source checking", "AI can organize questions. You still own whether the source is correct."],
      ["Numbers", "AI can summarize notes. You still own every number in the report."],
      ["Assumptions", "AI can list possible assumptions. You still own which assumptions are valid."],
      ["Recommendation", "AI can draft language. You still own the final recommendation."],
      ["Final explanation", "AI can prepare a first draft. You still own what the report actually says."],
    ],
    prompts: [
      {
        title: "Spreadsheet notes to report outline",
        body: `Role/context:
I prepare reports and analysis using spreadsheets, source data, and manager requests.

Task:
Turn my safe spreadsheet notes into a report outline, variance questions, and review checklist.

Input:
Report purpose: [purpose]
Audience: [audience]
Metrics: [metrics]
Observed changes: [changes]
Known assumptions: [assumptions]
Questions I already have: [questions]

Constraints:
- Do not invent causes or conclusions.
- Separate confirmed facts from questions.
- Mark anything I need to verify.
- Do not use sensitive data.
- Do not make the final recommendation.

Output format:
Create sections for report outline, variance questions, possible checks, draft summary, and what I should verify.

Before you finish:
List every number, source, assumption, and conclusion I should check.`,
      },
      {
        title: "Formula explanation",
        body: `Role/context:
I work with spreadsheets and need to understand formula logic.

Task:
Explain this formula and suggest what I should test.

Input:
Formula: [formula]
What it should calculate: [purpose]
Sample safe values: [values]

Constraints:
- Explain in plain English.
- Do not assume the formula is correct.
- List possible failure cases.
- Do not use confidential data.

Output format:
Give me a plain-English explanation, possible issues, and tests to run.

Before you finish:
Tell me what I should verify in the spreadsheet.`,
      },
    ],
    days: ["Choose one safe report or spreadsheet summary.", "Run the report outline prompt.", "Check every number, source, and assumption.", "Use AI to draft a short summary from verified notes.", "Ask AI for questions to investigate, not conclusions.", "Compare the AI-assisted outline with your normal process.", "Decide whether to use this before recurring reports."],
    ifWorks: "Next, test variance explanation drafts and data cleanup checklists.",
    ifFails: "The likely issue is that the input was too broad. Give AI the report purpose, audience, metrics, and known changes.",
    managerNote:
      "I’m testing AI to structure report notes and create review questions. I’m not using it as the source of truth or for final recommendations.",
  },
];

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function paragraphs(items) {
  return items.map((item) => `<p>${esc(item)}</p>`).join("\n");
}

function list(items) {
  return `<ul>${items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`;
}

function table(headers, rows, className = "") {
  return `<div class="table-scroll ${className}" role="region" aria-label="Report table" tabindex="0">
              <table class="doc-table">
                <thead><tr>${headers.map((header) => `<th>${esc(header)}</th>`).join("")}</tr></thead>
                <tbody>
                  ${rows.map((row) => `<tr>${row.map((cell) => `<td>${esc(cell)}</td>`).join("")}</tr>`).join("\n")}
                </tbody>
              </table>
            </div>`;
}

function nav(prefix) {
  return `<header class="site-header">
      <nav class="nav-shell" aria-label="Primary navigation">
        <a class="brand" href="${prefix}index.html" aria-label="Your AI Work Plan home">
          <span class="brand-mark" aria-hidden="true"><span></span></span>
          <span>Your AI Work Plan</span>
        </a>
        <div class="nav-links">
          <a href="${prefix}what-you-get.html">What You Get</a>
          <a href="${prefix}samples.html">Sample Reports</a>
          <a href="${prefix}how-it-works.html">How It Works</a>
          <a href="${prefix}faq.html">FAQ</a>
          <a class="mobile-menu-cta" href="${prefix}index.html#pricing">Get my AI Work Plan — $9.99</a>
        </div>
        <div class="nav-actions">
          <a class="button button-small" href="${prefix}index.html#pricing">Get my AI Work Plan — $9.99</a>
        </div>
        <button class="mobile-toggle" type="button" aria-label="Open menu" aria-expanded="false">Menu</button>
      </nav>
    </header>`;
}

function renderReport(report, prefix) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${esc(report.metaTitle)}</title>
    <meta name="description" content="${esc(report.metaDescription)}" />
    <link rel="icon" href="${prefix}favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="${prefix}styles.css" />
  </head>
  <body>
    ${nav(prefix)}

    <main>
      <section class="page-hero sample-report-hero">
        <div class="container">
          <p class="eyebrow">Sample report</p>
          <h1>${esc(report.pageHeadline)}</h1>
          <p>${esc(report.intro)}</p>
          <p class="sample-note">This is a sample report for this role. Your actual AI Work Plan is built from your own interview, tasks, tools, examples, and risk points.</p>
          <p class="section-cta centered">
            <a class="button button-blue" href="${prefix}index.html#pricing">Get my AI Work Plan — $9.99</a>
          </p>
        </div>
      </section>

      <div class="doc-layout">
        <aside class="doc-nav" aria-label="Report contents">
          <span>Contents</span>
          <a class="active" href="#read-first"><span>I</span>Read first</a>
          <a href="#work-map"><span>II</span>Your work map</a>
          <a href="#ai-gap"><span>III</span>AI gap</a>
          <a href="#opportunity-map"><span>IV</span>Opportunity map</a>
          <a href="#not-hand-over"><span>V</span>What not to hand over</a>
          <a href="#first-test"><span>VI</span>Your first test</a>
          <a href="#tool-needs"><span>VII</span>Tool needs</a>
          <a href="#still-own"><span>VIII</span>What you still own</a>
          <a href="#prompts"><span>IX</span>Prompts and templates</a>
          <a href="#seven-day-plan"><span>X</span>7-day plan</a>
        </aside>

        <article class="doc-main report-document">
          <header class="doc-section report-title-block">
            <p class="section-label">Report title</p>
            <h2>YOUR AI WORK PLAN</h2>
            <p>Role: ${esc(report.role)}</p>
            <h3>Your best first AI test</h3>
            <p>${esc(report.openingRecommendation)}</p>
            <p>${esc(report.openingCopy)}</p>
          </header>

          <section class="doc-section" id="read-first">
            <p class="section-label">01 · READ THIS FIRST</p>
            <h2>${esc(report.readFirst.headline)}</h2>
            <div class="diagnosis-card">
              <p>${esc(report.readFirst.based)}</p>
              <h3>This is the right place to start because:</h3>
              ${list(report.readFirst.reasons)}
              <div class="diagnosis-grid">
                <div><span>Use AI for</span><p>${esc(report.readFirst.use)}</p></div>
                <div><span>Keep yourself</span><p>${esc(report.readFirst.keep)}</p></div>
                <div><span>This week, your goal is</span><p>${esc(report.readFirst.goal)}</p></div>
              </div>
            </div>
          </section>

          <section class="doc-section" id="work-map">
            <p class="section-label">02 · YOUR WORK MAP</p>
            <h2>${esc(report.workMap.headline)}</h2>
            ${paragraphs(report.workMap.paragraphs)}
            ${table(["Work loop", "What starts it", "Current friction", "AI fit", "Risk level"], report.workMap.rows)}
            <blockquote class="pull-quote">“${esc(report.workMap.quote)}”</blockquote>
          </section>

          <section class="doc-section" id="ai-gap">
            <p class="section-label">03 · WHERE THE AI GAP SHOWS UP</p>
            <h2>${esc(report.aiGap.headline)}</h2>
            <div class="status-card"><span>Your current position</span><strong>${esc(report.aiGap.position)}</strong></div>
            ${paragraphs(report.aiGap.paragraphs)}
          </section>

          <section class="doc-section" id="opportunity-map">
            <p class="section-label">04 · YOUR AI OPPORTUNITY MAP</p>
            <h2>Start with the useful work that is easy to review.</h2>
            ${table(["Use case", "Use AI to", "Best tool category", "Why it fits", "What to watch", "Start now or later"], report.opportunities, "wide-table")}
          </section>

          <section class="doc-section" id="not-hand-over">
            <p class="section-label">05 · WHAT NOT TO HAND OVER</p>
            <h2>Before using AI, keep these boundaries clear.</h2>
            <div class="boundary-grid">
              ${report.boundaries.map(([title, text, why]) => `<article class="boundary-card"><span>Boundary</span><h3>${esc(title)}</h3><p>${esc(text)}</p><p>Why it matters here: ${esc(why)}</p></article>`).join("\n")}
            </div>
          </section>

          <section class="doc-section" id="first-test">
            <p class="section-label">06 · YOUR FIRST TEST</p>
            <h2>${esc(report.firstTest.name)}</h2>
            <div class="diagnosis-card">
              <div class="diagnosis-grid compact">
                <div><span>The goal</span><p>${esc(report.firstTest.goal)}</p></div>
                <div><span>Tools</span><p>${esc(report.firstTest.tools)}</p></div>
              </div>
              <p>If your company already provides an approved AI tool, start there. If not, use only safe, non-sensitive examples until you know the policy.</p>
            </div>
            <h3>Steps</h3>
            <ol>${report.firstTest.steps.map((item) => `<li>${esc(item)}</li>`).join("")}</ol>
            <div class="artifact-grid">
              <div class="artifact-box"><span>Success looks like</span>${list(report.firstTest.success)}</div>
              <div class="artifact-box"><span>First-test rule</span><p>Keep the first test narrow, safe, and easy to review before using it on higher-risk work.</p></div>
            </div>
          </section>

          <section class="doc-section" id="tool-needs">
            <p class="section-label">07 · WHAT THE TOOL NEEDS FROM YOU</p>
            <h2>AI will only be useful here if you give it the right raw material.</h2>
            <div class="artifact-grid">
              <div class="artifact-box"><span>${esc(report.toolNeeds.assistantLabel)}</span>${list(report.toolNeeds.assistant)}</div>
              <div class="artifact-box"><span>${esc(report.toolNeeds.systemLabel)}</span>${list(report.toolNeeds.system)}</div>
            </div>
            <div class="artifact-grid">
              <div class="artifact-box"><span>Weak input</span><p>“${esc(report.toolNeeds.weak)}”</p></div>
              <div class="artifact-box"><span>Better input</span><p>${esc(report.toolNeeds.better).replaceAll("\n", "<br />")}</p></div>
            </div>
            <h3>Leave out</h3>
            ${list(report.toolNeeds.leaveOut)}
          </section>

          <section class="doc-section" id="still-own">
            <p class="section-label">08 · WHAT YOU STILL OWN</p>
            <h2>The goal is not to hand your work to AI.</h2>
            <p>The goal is to stop doing the parts AI can prepare for you.</p>
            <div class="ownership-grid">
              ${report.ownership.map(([title, text]) => `<article class="ownership-card"><span>Responsibility</span><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join("\n")}
            </div>
          </section>

          <section class="doc-section" id="prompts">
            <p class="section-label">09 · YOUR PROMPTS AND TEMPLATES</p>
            <h2>Copy the prompt that matches the task you are starting with.</h2>
            <p>Replace anything in square brackets before you send.</p>
            ${report.prompts.map((prompt, index) => `<article class="prompt-card"><h3>Prompt ${index + 1} — ${esc(prompt.title)}</h3><div class="prompt-box">${esc(prompt.body)}</div></article>`).join("\n")}
          </section>

          <section class="doc-section" id="seven-day-plan">
            <p class="section-label">10 · YOUR 7-DAY PLAN</p>
            <h2>Use one safe workflow for one week.</h2>
            <div class="day-plan">
              ${report.days.map((day, index) => `<div><span>Day ${index + 1}</span><p>${esc(day)}</p></div>`).join("\n")}
            </div>
            <div class="artifact-grid">
              <div class="artifact-box"><span>If it works</span><p>${esc(report.ifWorks)}</p></div>
              <div class="artifact-box"><span>If it does not work</span><p>${esc(report.ifFails)}</p></div>
            </div>
            <div class="diagnosis-card manager-note"><span>Optional manager-safe explanation</span><p>“${esc(report.managerNote)}”</p></div>
            <p class="section-cta"><a class="button button-blue" href="${prefix}index.html#pricing">Get my AI Work Plan — $9.99</a></p>
          </section>
        </article>
      </div>
    </main>

    <div class="sticky-report-cta">
      <p>Want one for your work?<span>$9.99 — a few minutes — report link sent by email</span></p>
      <a class="button button-blue" href="${prefix}index.html#pricing">Get my AI Work Plan — $9.99</a>
    </div>

    <script src="${prefix}script.js"></script>
  </body>
</html>`;
}

await Promise.all(reports.map(async (report) => {
  const dir = new URL(`../samples/${report.slug}/`, import.meta.url);
  await mkdir(dir, { recursive: true });
  await writeFile(new URL("index.html", dir), renderReport(report, "../../"));

  for (const legacyFile of report.legacyFiles || []) {
    await writeFile(new URL(`../samples/${legacyFile}`, import.meta.url), renderReport(report, "../"));
  }
}));

console.log(`Generated ${reports.length} sample reports.`);
