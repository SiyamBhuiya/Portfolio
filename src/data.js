export const SITE = {
  name: 'Siyam',
  email: 'hello@yourdomain.com', // replace with your real email
  role: 'Freelance n8n automation developer',
  location: 'Dhaka',
  cv: 'Siyam-CV.pdf', // put the file in /public with this exact name
  github: 'https://github.com/SiyamBhuiya',
}

export const tools = ["WhatsApp", "Notion", "Google Sheets", "Airtable", "Shopify", "HubSpot", "Odoo", "respond.io", "Monday.com", "Frame.io", "Outseta", "Circle.so", "Make", "OpenAI and other AI APIs"]

// Each project can list workflows. For a workflow with id "x", add the files
//   src/assets/shots/x.png   (n8n or Make screenshot, optional)
//   src/workflows/x.json     (cleaned export, optional)
// tool: 'n8n' (default) or 'Make'
export const projects = [
  {
    "slug": "meeting-scheduling",
    "title": "Meeting scheduling for 800 clients",
    "summary": "Clients pick a meeting time in WhatsApp and the calendar books itself.",
    "problem": "Arranging meetings with roughly 800 clients means a lot of back and forth. The goal was to take that off the team and keep one reliable record of every meeting.",
    "built": [
      "A monthly run that finds clients without a meeting and gives each one a unique slot from Google Calendar.",
      "WhatsApp proposals sent through Wassenger in batches of 10, with each send marked as sent or failed in Notion.",
      "A reply handler that reads what the client meant, checks the calendar and books the meeting, or asks for another time.",
      "An owner-instructed flow: the owner names a client and constraints, and the system finds the first free slot and proposes it.",
      "A Q&A flow that answers plain-language questions about clients and upcoming meetings from the Notion records."
    ],
    "hard": [
      "Wassenger rate limits, handled with batches and a wait between them.",
      "Checking for calendar conflicts before auto-booking, and logging conflicts for a manual follow-up."
    ],
    "stack": [
      "n8n",
      "Wassenger",
      "Google Calendar",
      "Notion",
      "OpenAI"
    ],
    "flow": [
      "Monthly schedule",
      "WhatsApp proposal",
      "AI reads reply",
      "Calendar booking",
      "Notion update"
    ],
    "workflows": [
      {
        "id": "yearly-proposal",
        "name": "Yearly meeting proposal scheduler",
        "note": "Finds clients without a meeting and offers each one a unique slot over WhatsApp.",
        "tool": "n8n"
      },
      {
        "id": "meeting-reply-handler",
        "name": "Meeting reply handler",
        "note": "Reads a client reply, works out the intent and books or reschedules.",
        "tool": "n8n"
      },
      {
        "id": "manual-scheduler",
        "name": "Owner-instructed booking",
        "note": "The owner names a client and constraints, and the flow proposes the first free slot.",
        "tool": "n8n"
      },
      {
        "id": "summary-qa",
        "name": "Meeting Q&A",
        "note": "Answers plain-language questions about clients and meetings from Notion.",
        "tool": "n8n"
      }
    ]
  },
  {
    "slug": "whatsapp-invoice-reader",
    "title": "WhatsApp invoice reader",
    "summary": "Clients send an invoice in a chat and the data lands in Notion.",
    "problem": "Clients already talk to the business on WhatsApp, so documents and requests arrive there. They needed to be read, sorted and acted on without retyping.",
    "built": [
      "A webhook that receives WhatsApp messages from Wassenger and checks the sender number.",
      "Attachments: waits for the media, downloads it, reads images with GPT-4o and extracts text from PDFs, logs the result to a Notion client database and confirms by WhatsApp.",
      "Text messages: a GPT-4o classifier decides whether it is a meeting reply, a summary question, an email to send or a task for the secretary.",
      "Email requests: generates the content, then sends it or saves a Gmail draft, with alerts if sending fails.",
      "A retry loop for media that is not ready yet, with a timeout message to the sender."
    ],
    "hard": [
      "Wassenger API details: device IDs, string casting and template payload structure.",
      "Notion node output shape, which flattens fields and changes between n8n versions.",
      "Gmail and Notion nodes overwrite the incoming data, so later nodes reference the upstream node they need by name."
    ],
    "stack": [
      "n8n",
      "Wassenger",
      "GPT-4o",
      "Notion",
      "Gmail"
    ],
    "flow": [
      "WhatsApp message",
      "Phone check",
      "Read or classify",
      "Notion, email or task"
    ],
    "workflows": [
      {
        "id": "whatsapp-ocr",
        "name": "WhatsApp media reader and message router",
        "note": "Reads attachments, classifies text messages and hands them to the right flow.",
        "tool": "n8n"
      }
    ]
  },
  {
    "slug": "telegram-invoicing",
    "title": "Telegram AI agent for invoicing",
    "summary": "Ask a bot about clients and payments in Telegram, while a schedule checks payments and prepares invoices.",
    "problem": "Client and payment data lived in Google Sheets. Updating it, checking payments and producing invoice PDFs meant repeating the same steps by hand.",
    "built": [
      "A Telegram bot with an AI agent (Claude) that can read and update the clients and checking sheets.",
      "A scheduled run that reads the clients, loops through them and checks payments through the Plaid API.",
      "Logic that either marks the client as paid and sends a completion email, or flags the case for manual review.",
      "Invoice PDFs: copies a Google Docs template, fills it in, converts it to PDF, renames it and saves a Gmail draft."
    ],
    "hard": [],
    "stack": [
      "n8n",
      "Telegram",
      "Claude",
      "Google Sheets",
      "Plaid",
      "Google Drive",
      "Gmail"
    ],
    "flow": [
      "Schedule",
      "Read clients",
      "Check payment",
      "Paid or review",
      "Invoice PDF"
    ],
    "workflows": [
      {
        "id": "telegram-invoicing",
        "name": "Telegram agent and invoicing run",
        "note": "Two flows on one canvas: the chat agent, and the scheduled payment check and invoicing.",
        "tool": "n8n"
      }
    ]
  },
  {
    "slug": "real-estate-email",
    "title": "Real estate email triage",
    "summary": "Every incoming email is labelled by who sent it and gets a drafted reply.",
    "problem": "A real estate inbox mixes buyers, sellers, renters and other agents, and each needs a different reply.",
    "built": [
      "A Gmail trigger with a filter that skips no-reply senders.",
      "An AI step that sorts each email into buyer, seller, rental, agent or other.",
      "A Gmail label for each category.",
      "The full thread is read and an AI step writes a reply, saved as a Gmail draft for a person to review.",
      "Emails marked other are labelled and marked as read without a draft."
    ],
    "hard": [],
    "stack": [
      "n8n",
      "Gmail",
      "OpenAI"
    ],
    "flow": [
      "New email",
      "AI classifies",
      "Label",
      "Draft reply"
    ],
    "workflows": [
      {
        "id": "real-estate-email",
        "name": "Real estate email automation",
        "note": "Classifies, labels and drafts replies for every new email.",
        "tool": "n8n"
      }
    ]
  },
  {
    "slug": "shopify-chargeback-clickup",
    "title": "Shopify chargebacks to ClickUp",
    "summary": "A new chargeback becomes a ClickUp task, and repeat alerts update the existing one.",
    "problem": "Chargebacks need to be tracked until they are resolved, and a second alert for the same order should not create a duplicate task.",
    "built": [
      "A custom webhook that starts the scenario instantly.",
      "The order is fetched from Shopify.",
      "Existing ClickUp tasks are listed and aggregated so the scenario can see if the order is already tracked.",
      "A router either updates the existing task or creates a new one named after the order and the customer."
    ],
    "hard": [],
    "stack": [
      "Make",
      "Shopify",
      "ClickUp"
    ],
    "flow": [
      "Webhook",
      "Get Shopify order",
      "Find existing task",
      "Update or create"
    ],
    "workflows": [
      {
        "id": "shopify-chargeback",
        "name": "Shopify chargeback to ClickUp",
        "note": "Instant scenario that creates or updates the chargeback task.",
        "tool": "Make"
      }
    ]
  },
  {
    "slug": "shopify-bookkeeping",
    "title": "Daily bookkeeping for a Shopify store",
    "summary": "A scheduled run writes yesterday's ad spend, orders, chargebacks and refunds into a monthly Google Sheet.",
    "problem": "Daily numbers came from three places: Google Ads, Shopify and the chargeback records. Putting them in one sheet by hand every day does not scale.",
    "built": [
      "A daily run that works out yesterday in New York time.",
      "Google Ads cost for the day is pulled and totalled.",
      "Shopify is queried through the GraphQL Admin API, with a second request for chargebacks and refunds.",
      "Code steps calculate the fees and the profit formulas.",
      "A row is added to the sheet for the month, then updated with the profit formulas. A run takes about 7 seconds."
    ],
    "hard": [],
    "stack": [
      "Make",
      "Shopify",
      "Google Ads",
      "Google Sheets"
    ],
    "flow": [
      "Daily schedule",
      "Google Ads spend",
      "Shopify orders",
      "Chargebacks and refunds",
      "Monthly sheet"
    ],
    "workflows": [
      {
        "id": "shopify-bookkeeping",
        "name": "Shopify bookkeeping scenario",
        "note": "Daily scenario that fills the monthly bookkeeping sheet.",
        "tool": "Make"
      }
    ]
  },
  {
    "slug": "fb-lead-airtable",
    "title": "Facebook leads to Airtable and WhatsApp",
    "summary": "A new lead from a Facebook form is saved, the owner is told, and the lead gets a WhatsApp message.",
    "problem": "Leads from Facebook Lead Ads need to reach the sales side straight away, in a tidy format.",
    "built": [
      "A Facebook Lead Ads trigger starts the flow.",
      "A code step tidies the fields: name, email, phone number with a country prefix, Instagram handle and lead ID.",
      "An Airtable record is created for the lead.",
      "The owner is notified on WhatsApp, and the lead gets a WhatsApp message through a self-hosted sender."
    ],
    "hard": [],
    "stack": [
      "n8n",
      "Facebook Lead Ads",
      "Airtable",
      "WhatsApp"
    ],
    "flow": [
      "Facebook lead",
      "Clean fields",
      "Airtable record",
      "WhatsApp"
    ],
    "workflows": [
      {
        "id": "fb-lead-airtable",
        "name": "Facebook lead to Airtable",
        "note": "Saves each new lead and sends the WhatsApp messages.",
        "tool": "n8n"
      }
    ]
  },
  {
    "slug": "pharmacy-product-search",
    "title": "Pharmacy product search chatbot",
    "summary": "A customer describes symptoms and the bot finds matching products.",
    "problem": "A pharmacy in Zambia wanted customers to find products on WhatsApp. Exact-name search only works if you already know what to ask for.",
    "built": [
      "A WhatsApp chatbot connected to the pharmacy's Odoo product database.",
      "An upgrade from exact-name search to symptom-based semantic search with GPT-4.1-mini.",
      "An AI agent that calls a tag-based product search sub-workflow.",
      "A product tagging guide so non-technical staff can keep the catalogue searchable."
    ],
    "hard": [
      "Passing structured fields correctly between the parent workflow and sub-workflows.",
      "Recommendations got more accurate once Odoo tag IDs were resolved to names before the AI ranked results."
    ],
    "stack": [
      "n8n",
      "WhatsApp",
      "Odoo",
      "GPT-4.1-mini"
    ],
    "flow": [
      "Customer describes symptoms",
      "AI agent",
      "Tag search in Odoo",
      "Ranked products"
    ],
    "workflows": []
  },
  {
    "slug": "shopify-airtable-sync",
    "title": "Shopify to Airtable customer sync",
    "summary": "A large customer list kept in step between a store and a database.",
    "problem": "A retail client needed Shopify customers mirrored in Airtable. The first approach failed on pagination, rate limits and execution time limits.",
    "built": [
      "A sync reworked to use three API calls per customer.",
      "Error handling on each node so one bad record does not stop the run."
    ],
    "hard": [
      "Pagination failures, Shopify rate limiting and n8n Cloud execution time limits."
    ],
    "stack": [
      "n8n",
      "Shopify",
      "Airtable"
    ],
    "flow": [
      "Shopify customers",
      "Paginate",
      "Sync to Airtable"
    ],
    "workflows": []
  },
  {
    "slug": "hubspot-contact-export",
    "title": "HubSpot contact export",
    "summary": "40,000 contacts moved into Google Sheets without hitting quotas.",
    "problem": "Exporting a 40,000-contact HubSpot list to Google Sheets ran into pagination problems and Google API quota limits.",
    "built": [
      "Paginated reads from HubSpot.",
      "Batched HTTP Request writes to the Sheets API instead of the native node writing row by row."
    ],
    "hard": [
      "Quota exhaustion from row-by-row calls, solved by batching."
    ],
    "stack": [
      "n8n",
      "HubSpot",
      "Google Sheets"
    ],
    "flow": [
      "HubSpot contacts",
      "Paginate",
      "Batch write",
      "Google Sheets"
    ],
    "workflows": []
  },
  {
    "slug": "membership-tier-sync",
    "title": "Membership tier sync",
    "summary": "Members get the right community access when their plan changes.",
    "problem": "Billing in Outseta and community access in Circle.so need to agree. A tier change in one has to show up in the other.",
    "built": [
      "A workflow that fetches Circle access groups dynamically instead of hard-coding them.",
      "Member tags as the source of truth for which groups a member belongs to.",
      "Gmail notifications whenever a member's tier changes."
    ],
    "hard": [],
    "stack": [
      "n8n",
      "Outseta",
      "Circle.so",
      "Gmail"
    ],
    "flow": [
      "Outseta tier change",
      "Fetch Circle groups",
      "Sync membership",
      "Email notice"
    ],
    "workflows": []
  }
]
