# trackr
> Trackr is designed to help users manage their finances with ease. This full-stack app allows users to sign up for an account to create, update, and delete their invoices and expenses, making it simple to keep track of their finances.

## Demo
[Live Demo](https://www.nc-trackr.xyz/)

<img src="trackr-screenshot.png" alt="" border="0">

## Built with
- Next.js
- MongoDB
- Clerk
- TailwindCSS

## Features
#### Home Page:
- Call to action buttons for signing up and logging into an account with email & password using Clerk Authentication
- View Demo button to allow users to test out the application as a demo user

#### Dashboard Page:
- Displays the total dollar amount of invoices and expenses
- Displays bar graph to visually represent the total amount for each month in a year view
- - Toggle theme between light and dark mode

#### Invoices Page:  
- Create, read, update, and delete invoices and expenses
- Receive form validations when trying to create/edit an invoice or expense
- Save invoices as drafts and mark pending invoices as paid
- Filter invoices by status (Draft, Pending, Paid)

#### Expenses Page:  
- Create, read, update, and delete expenses
- Receive form validations when trying to create/edit an expense
- Mark pending expenses as paid
- Filter expenses by status (Pending, Paid)

## Optimizations

## Lessons Learned
- how to use Clerk's Next.js SDK for authentication and user management

## Running this Project Locally
From the repo:
1. Clone this project locally
2. Open the project in your preferred code editor
3. Open your terminal and `cd` to the project directory
4. Create `.env` variables `NEXT_PUBLIC_API_TOKEN` and API tokens from Clerk for `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`
5. Run `npm install` to install all relevant dependencies
6. Run `npm run dev` to start a dev server and view the project in your browser

## Future Enhancements
- [ ] Store Receipts
  - Users can upload a copy of their receipts within each invoice/expense
- [ ] Email invoices
  - Sending an invoice will directly mail it to the client's inbox
- [ ] Search and Filters
  - Easily find and filter invoices/tasks based on keywords, or expense categories, streamlining the search process
