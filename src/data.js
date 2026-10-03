export const SITE = {
  name: 'Siyam',
  email: 'hello@yourdomain.com', // replace with your real email
  role: 'Freelance n8n automation developer',
  location: 'Dhaka',
}

export const tools = ['WhatsApp', 'Notion', 'Google Sheets', 'Airtable', 'Shopify', 'HubSpot', 'Odoo', 'respond.io', 'Monday.com', 'Frame.io', 'Outseta', 'Circle.so', 'OpenAI and other AI APIs']

export const projects = [
  {
    slug: 'meeting-scheduling',
    title: 'Meeting scheduling for 800 clients',
    summary: 'Clients pick a meeting time in WhatsApp and the calendar books itself.',
    problem: 'Arranging meetings with roughly 800 clients means a lot of back and forth. The goal was to take that off the team and keep one reliable record of every meeting.',
    built: [
      'WhatsApp template messages that offer clients a choice of time slots.',
      'AI that reads each client reply and works out which slot they chose.',
      'Automatic booking of confirmed slots in Google Calendar.',
      'Notion as the single source of truth for every meeting.',
      'A summary workflow that answers plain-language questions about upcoming meetings.',
    ],
    hard: ['Sending email from n8n through a private SMTP mail server alongside the WhatsApp flow.'],
    stack: ['n8n', 'Wassenger', 'Google Calendar', 'Notion', 'AI'],
    flow: ['WhatsApp offer', 'AI reads reply', 'Calendar booking', 'Notion update'],
  },
  {
    slug: 'whatsapp-invoice-reader',
    title: 'WhatsApp invoice reader',
    summary: 'Clients send an invoice in a chat and the data lands in Notion.',
    problem: 'Clients already talk to the business on WhatsApp, so documents and requests arrive there. They needed to be read, sorted and acted on without retyping.',
    built: [
      'An attachment handler that extracts structured data from invoices and PDFs and logs it in Notion.',
      'A GPT-4o intent classifier, replacing regex rules, that sends follow-up messages to email or to a secretary task.',
      'A phone-number check that routes each message to the right sub-workflow.',
    ],
    hard: [
      'Wassenger API details: device IDs, string casting and template payload structure.',
      'Notion node output shape, which flattens fields and changes between n8n versions.',
      'Gmail and Notion nodes overwrite the incoming data, so every later node references the upstream node it needs by name.',
    ],
    stack: ['n8n', 'Wassenger', 'GPT-4o', 'Notion', 'Gmail'],
    flow: ['WhatsApp message', 'Phone check', 'Extract or classify', 'Notion or email'],
  },
  {
    slug: 'pharmacy-product-search',
    title: 'Pharmacy product search chatbot',
    summary: 'A customer describes symptoms and the bot finds matching products.',
    problem: 'A pharmacy in Zambia wanted customers to find products on WhatsApp. Exact-name search only works if you already know what to ask for.',
    built: [
      'A WhatsApp chatbot connected to the pharmacy\'s Odoo product database.',
      'An upgrade from exact-name search to symptom-based semantic search with GPT-4.1-mini.',
      'An AI agent that calls a tag-based product search sub-workflow.',
      'A product tagging guide so non-technical staff can keep the catalogue searchable.',
    ],
    hard: [
      'Passing structured fields correctly between the parent workflow and sub-workflows.',
      'Recommendations got more accurate once Odoo tag IDs were resolved to names before the AI ranked results.',
    ],
    stack: ['n8n', 'WhatsApp', 'Odoo', 'GPT-4.1-mini'],
    flow: ['Customer describes symptoms', 'AI agent', 'Tag search in Odoo', 'Ranked products'],
  },
  {
    slug: 'shopify-airtable-sync',
    title: 'Shopify to Airtable customer sync',
    summary: 'A large customer list kept in step between a store and a database.',
    problem: 'A retail client needed Shopify customers mirrored in Airtable. The first approach failed on pagination, rate limits and execution time limits.',
    built: [
      'A sync reworked to use three API calls per customer.',
      'Error handling on each node so one bad record does not stop the run.',
    ],
    hard: ['Pagination failures, Shopify rate limiting and n8n Cloud execution time limits.'],
    stack: ['n8n', 'Shopify', 'Airtable'],
    flow: ['Shopify customers', 'Paginate', 'Sync to Airtable'],
  },
  {
    slug: 'hubspot-contact-export',
    title: 'HubSpot contact export',
    summary: '40,000 contacts moved into Google Sheets without hitting quotas.',
    problem: 'Exporting a 40,000-contact HubSpot list to Google Sheets ran into pagination problems and Google API quota limits.',
    built: [
      'Paginated reads from HubSpot.',
      'Batched HTTP Request writes to the Sheets API instead of the native node writing row by row.',
    ],
    hard: ['Quota exhaustion from row-by-row calls, solved by batching.'],
    stack: ['n8n', 'HubSpot', 'Google Sheets'],
    flow: ['HubSpot contacts', 'Paginate', 'Batch write', 'Google Sheets'],
  },
  {
    slug: 'membership-tier-sync',
    title: 'Membership tier sync',
    summary: 'Members get the right community access when their plan changes.',
    problem: 'Billing in Outseta and community access in Circle.so need to agree. A tier change in one has to show up in the other.',
    built: [
      'A workflow that fetches Circle access groups dynamically instead of hard-coding them.',
      'Member tags as the source of truth for which groups a member belongs to.',
      'Gmail notifications whenever a member\'s tier changes.',
    ],
    hard: [],
    stack: ['n8n', 'Outseta', 'Circle.so', 'Gmail'],
    flow: ['Outseta tier change', 'Fetch Circle groups', 'Sync membership', 'Email notice'],
  },
]
