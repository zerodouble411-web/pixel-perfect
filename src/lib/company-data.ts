export type SolutionTier = "Starter" | "Business" | "Enterprise";

export type Solution = {
  slug: string;
  name: string;
  tier: SolutionTier;
  category: string;
  summary: string;
  features: string[];
};

export const company = {
  name: "Pandatechs",
  tagline: "Software systems for Kenyan businesses — from a first website to full financial platforms.",
  website: "pandatechs.co.ke",
  phone: "0111679286",
  location: "Nairobi, Kenya",
  shellCode: `<?php

namespace Pandatechs\\Engineering;

// From your first website to your next enterprise platform.
$systems = ['Websites', 'POS', 'Schools', 'Hospitals', 'Finance'];

foreach ($systems as $system) {
    Platform::build($system)
        ->integrate(['M-Pesa', 'Bank APIs', 'Currency APIs'])
        ->engineer('Laravel', 'Node.js', 'Python')
        ->deliver();
}`,
  ceo: {
    name: "Laban Panda Khisa",
    role: "Founder & CEO, Backend Software Engineer",
    bio: "Laban leads engineering at Pandatechs, building payment infrastructure, M-Pesa and bank integrations, queue systems and Laravel APIs that run in production.",
  },
};

export const solutionTiers: SolutionTier[] = ["Starter", "Business", "Enterprise"];

export const solutions: Solution[] = [
  { slug: "starter-website", name: "Starter Website", tier: "Starter", category: "Websites", summary: "A fast, mobile-ready website for small businesses and personal brands.", features: ["Up to 5 pages", "Contact form & WhatsApp button", "Domain & hosting setup", "Basic SEO"] },
  { slug: "business-website", name: "Business Website + CMS", tier: "Starter", category: "Websites", summary: "A company website you can update yourself, with blog and service pages.", features: ["Content management", "Blog & news", "Google Analytics", "Email setup"] },
  { slug: "ecommerce", name: "E-commerce Store", tier: "Business", category: "Commerce", summary: "Online shop with M-Pesa checkout, stock and order management.", features: ["M-Pesa STK push", "Product & stock management", "Order tracking", "Delivery zones"] },
  { slug: "pos", name: "POS System", tier: "Business", category: "Retail", summary: "Point of sale for shops, supermarkets and restaurants, online or offline.", features: ["Sales & receipts", "Inventory & suppliers", "M-Pesa & card payments", "Multi-branch reports"] },
  { slug: "school-management", name: "School Management System", tier: "Business", category: "Education", summary: "Admissions, fees, exams and parent communication in one system.", features: ["Student records", "Fee billing via M-Pesa", "Exams & report cards", "SMS to parents"] },
  { slug: "hospital-management", name: "Hospital Management System", tier: "Enterprise", category: "Healthcare", summary: "Patient flow from reception to pharmacy and billing for clinics and hospitals.", features: ["Patient registration & records", "Lab, pharmacy & wards", "Billing & insurance claims", "Appointments"] },
  { slug: "hr-payroll", name: "HR & Payroll", tier: "Business", category: "Operations", summary: "Staff records, leave and payroll with statutory deductions.", features: ["PAYE, NSSF, SHIF", "Payslips", "Leave management", "Bank payment files"] },
  { slug: "sacco-microfinance", name: "SACCO & Microfinance System", tier: "Enterprise", category: "Finance", summary: "Members, savings, loans and repayments with M-Pesa and bank integration.", features: ["Member accounts", "Loan origination & schedules", "M-Pesa & bank reconciliation", "Regulatory reports"] },
  { slug: "financial-platform", name: "Financial & Payments Platform", tier: "Enterprise", category: "Finance", summary: "Wallets, payment gateways, bank APIs and currency conversion at scale.", features: ["Wallets & ledgers", "Bank & M-Pesa APIs", "Currency converter APIs", "Redis queues & audit trails"] },
];
