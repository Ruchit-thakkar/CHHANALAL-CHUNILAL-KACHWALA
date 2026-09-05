# Walkthrough: Online Inquiry & Admin Dashboard System (MongoDB)

Added an end-to-end **Online Inquiry Management and CRM Admin Dashboard** to the Chhanalal Chunilal Kachwala (CCK) Next.js platform.

---

## What Was Added

### 1. Database & Models (MongoDB + Mongoose)
- [lib/mongodb.ts](file:///c:/Users/RUCHIT/OneDrive/Desktop/projects/Chhanalal%20Chunilal%20Kachwala/lib/mongodb.ts): Global singleton cached Mongoose connection suitable for Next.js development and production.
- [lib/models/Inquiry.ts](file:///c:/Users/RUCHIT/OneDrive/Desktop/projects/Chhanalal%20Chunilal%20Kachwala/lib/models/Inquiry.ts): Inquiry Schema with:
  - Unique readable sequential IDs (`CCK-0001`, `CCK-0002`...)
  - `name`, `phone`, `service`, `projectDetails`, `preferredContact` ("Phone Call" | "WhatsApp")
  - `status`: enum (`not_contacted`, `contacted`, `follow_up`, `completed`, `cancelled`) with default `not_contacted`
  - `adminNotes`: private internal notes
  - `contactedAt`, `createdAt`, `updatedAt` timestamps

### 2. Secure Server-Side Authentication
- [.env.local](file:///c:/Users/RUCHIT/OneDrive/Desktop/projects/Chhanalal%20Chunilal%20Kachwala/.env.local):
  - `ADMIN_ID=cck`
  - `ADMIN_PASSWORD=cck123`
  - `ADMIN_SESSION_SECRET`
  - `MONGODB_URI`
- [lib/auth.ts](file:///c:/Users/RUCHIT/OneDrive/Desktop/projects/Chhanalal%20Chunilal%20Kachwala/lib/auth.ts):
  - HMAC-SHA256 session token generation and verification.
  - Stored in secure `httpOnly` cookie (`cck_admin_session`, `SameSite=lax`, 7-day expiration).
  - Server-side route handler and page verification preventing unauthorized access.

### 3. Backend API Route Handlers
- [app/api/inquiries/route.ts](file:///c:/Users/RUCHIT/OneDrive/Desktop/projects/Chhanalal%20Chunilal%20Kachwala/app/api/inquiries/route.ts):
  - `POST` (Public): Validates client inputs, saves inquiry to MongoDB, returns generated ID.
  - `GET` (Admin only): Search by name/phone/ID, status filter, sorting, and pagination.
- [app/api/inquiries/[id]/route.ts](file:///c:/Users/RUCHIT/OneDrive/Desktop/projects/Chhanalal%20Chunilal%20Kachwala/app/api/inquiries/%5Bid%5D/route.ts):
  - `GET`, `PATCH` (status changer, sets `contactedAt` automatically, saves private notes), `DELETE`.
- [app/api/admin/login/route.ts](file:///c:/Users/RUCHIT/OneDrive/Desktop/projects/Chhanalal%20Chunilal%20Kachwala/app/api/admin/login/route.ts): Authenticates credentials and sets HTTP-only cookie.
- [app/api/admin/logout/route.ts](file:///c:/Users/RUCHIT/OneDrive/Desktop/projects/Chhanalal%20Chunilal%20Kachwala/app/api/admin/logout/route.ts): Clears session cookie.
- [app/api/admin/stats/route.ts](file:///c:/Users/RUCHIT/OneDrive/Desktop/projects/Chhanalal%20Chunilal%20Kachwala/app/api/admin/stats/route.ts): Real-time MongoDB counts for Total, Not Contacted, Contacted, Follow Up, Completed, Cancelled.

### 4. Public Website Updates
- [components/Navbar.tsx](file:///c:/Users/RUCHIT/OneDrive/Desktop/projects/Chhanalal%20Chunilal%20Kachwala/components/Navbar.tsx):
  - Navigation item updated from "Contact" to **"Let's Talk"**, smoothly scrolling to `#contact`.
- [components/Contact.tsx](file:///c:/Users/RUCHIT/OneDrive/Desktop/projects/Chhanalal%20Chunilal%20Kachwala/components/Contact.tsx):
  - Prominent headings: **Online Inquiry** / **Tell Us About Your Project**.
  - Supporting text: *"Have a glass, aluminium or mirror project in mind? Tell us what you need and our team will get in touch with you."*
  - Form Fields: Full Name, Phone Number, Service Required (dropdown), Project Details (textarea), Preferred Contact Method (Phone Call / WhatsApp).
  - Client-side validation, direct API submission to MongoDB.
  - Confirmation alert: *"Thank you for contacting Chhanalal Chunilal Kachwala. We've received your project details and will get in touch with you soon."*
  - Form auto-clears on success.
- [components/Footer.tsx](file:///c:/Users/RUCHIT/OneDrive/Desktop/projects/Chhanalal%20Chunilal%20Kachwala/components/Footer.tsx):
  - Added subtle **Admin Login** link in the bottom row pointing to `/admin`.

### 5. Admin Dashboard CRM
- [app/admin/page.tsx](file:///c:/Users/RUCHIT/OneDrive/Desktop/projects/Chhanalal%20Chunilal%20Kachwala/app/admin/page.tsx):
  - Dedicated login screen with CCK editorial aesthetic.
- [app/admin/dashboard/layout.tsx](file:///c:/Users/RUCHIT/OneDrive/Desktop/projects/Chhanalal%20Chunilal%20Kachwala/app/admin/dashboard/layout.tsx):
  - Protected layout with server-side authentication redirect.
- [components/admin/AdminSidebar.tsx](file:///c:/Users/RUCHIT/OneDrive/Desktop/projects/Chhanalal%20Chunilal%20Kachwala/components/admin/AdminSidebar.tsx):
  - Studio brand heading, Dashboard, Online Inquiries with **live uncontacted badge count**, and secure logout.
- [app/admin/dashboard/page.tsx](file:///c:/Users/RUCHIT/OneDrive/Desktop/projects/Chhanalal%20Chunilal%20Kachwala/app/admin/dashboard/page.tsx):
  - 5 live KPI metric cards (Total, Not Contacted, Contacted, Follow Up, Completed).
  - Recent Inquiries table sorted newest first with direct inspection.
- [app/admin/dashboard/inquiries/page.tsx](file:///c:/Users/RUCHIT/OneDrive/Desktop/projects/Chhanalal%20Chunilal%20Kachwala/app/admin/dashboard/inquiries/page.tsx):
  - Live search by Name, Phone, or Inquiry ID.
  - Status filters (All, Not Contacted, Contacted, Follow Up, Completed, Cancelled).
  - Sort by newest or oldest.
- [components/admin/InquiryDetailModal.tsx](file:///c:/Users/RUCHIT/OneDrive/Desktop/projects/Chhanalal%20Chunilal%20Kachwala/components/admin/InquiryDetailModal.tsx):
  - Full inquiry inspector side drawer.
  - Direct 1-tap **Call** (`tel:`), **WhatsApp**, and **Copy Number** buttons.
  - Interactive status changer (automatically records `contactedAt` upon marking Contacted).
  - Private **Admin Notes** textarea persisted in MongoDB (never exposed to customers).

---

## Verification Results

### Build Compilation
```bash
npm run build
```
- **Result**: `Exit code 0`
- **TypeScript**: 0 errors
- **Routes Generated**:
  - `○ /` (Public landing page)
  - `○ /admin` (Admin login)
  - `ƒ /admin/dashboard` (Protected dashboard)
  - `ƒ /admin/dashboard/inquiries` (Protected CRM)
  - `ƒ /api/admin/login`
  - `ƒ /api/admin/logout`
  - `ƒ /api/admin/stats`
  - `ƒ /api/admin/check`
  - `ƒ /api/inquiries`
  - `ƒ /api/inquiries/[id]`
