# Warkop Cashier System

This is a cashier website for warkop built using Next JS, Tailwind CSS, and Prisma ORM. This website helps cashiers to monitor inventory, carry out transactions, monitor transaction history, view cashier profiles, and make changes to cashier profiles.

### Overview

#### Login Page
This is the login page of our cashier system

![login](/public/readme-src/login.png)

#### Register Page
Here, users can create their own account by providing

![register](/public/readme-src/register.png)

#### Dashboard Page
The dashboard displays all transactions made by a user

![dashboard](/public/readme-src/dashboard.png)

#### Storage Page
This page allows users to view and manage products in storage. Users have options to add new product or edit.

![storage](/public/readme-src/storage.png)

#### Transaction Page
Users can make transaction from this page. They need to select a product and the quantities then click on "ADD NEW ITEM" button. The product will be displayed beside the "ADD ITEM" section. The total price will be displayed at the right bottom of page.
After confirmation of the "Items",  click on "CONFIRM PAYMENT" button and it will redirect you to payment pop up confirmation

![transaction](/public/readme-src/transaction.png)
![transaction-confirmation](/public/readme-src/transaction-confirmation.png)

#### Payment Modal
This modal shows payment information such as 'Total Amount' from Transaction Page and 'Cash' amount from customer that inputed by users manually, it has button to add 'Cash' amount to make users easier to input.

![payment](/public/readme-src/payment.png)
![paymet-success](/public/readme-src/payment-success.png)

#### Invoice Report
After  making payment, an invoice will be generated showing details of transaction such as warkop information, invoice number, users in charge, the items and amount of each items, total amount, cash received, and change to customer (if any).

![invoice](/public/readme-src/invoice.png)

#### Transactions History Page
This page shows  history of all transactions made by a specific user

![history](/public/readme-src/transactions-history.png)

<!-- #### Setting Page
blablabla

![setting](/public/img/avatar.png)
 -->

### How to Start

1. Clone this repository using git clone
```
git clone https://github.com/ramadiaz/warkop-cashier-system
```
2. Install required depedencies
```
npm install
```
3. Setup your environment variable in root of this project

```
npm install dotenv --save
```
4. Run this project
```
npm run dev
```


### Project Structure

```
📦src
 ┣ 📂app
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┗ 📂[...nextauth]
 ┃ ┃ ┃ ┃ ┗ 📜route.js
 ┃ ┃ ┣ 📂register
 ┃ ┃ ┃ ┗ 📜route.js
 ┃ ┃ ┗ 📂v1
 ┃ ┃ ┃ ┣ 📂deleteMenu
 ┃ ┃ ┃ ┃ ┗ 📜route.js
 ┃ ┃ ┃ ┣ 📂getInvoice
 ┃ ┃ ┃ ┃ ┗ 📂[id]
 ┃ ┃ ┃ ┃ ┃ ┗ 📜route.js
 ┃ ┃ ┃ ┣ 📂getLastInvoice
 ┃ ┃ ┃ ┃ ┗ 📜route.js
 ┃ ┃ ┃ ┣ 📂getMenu
 ┃ ┃ ┃ ┃ ┗ 📜route.js
 ┃ ┃ ┃ ┣ 📂getTransactions
 ┃ ┃ ┃ ┃ ┗ 📜route.js
 ┃ ┃ ┃ ┣ 📂getTransactionsMenu
 ┃ ┃ ┃ ┃ ┗ 📜route.js
 ┃ ┃ ┃ ┣ 📂getUserInfo
 ┃ ┃ ┃ ┃ ┗ 📂[email]
 ┃ ┃ ┃ ┃ ┃ ┗ 📜route.js
 ┃ ┃ ┃ ┣ 📂pushMenu
 ┃ ┃ ┃ ┃ ┗ 📜route.js
 ┃ ┃ ┃ ┗ 📂pushTransaction
 ┃ ┃ ┃ ┃ ┗ 📜route.js
 ┃ ┣ 📂invoice
 ┃ ┃ ┗ 📂[id]
 ┃ ┃ ┃ ┗ 📜page.jsx
 ┃ ┣ 📂libs
 ┃ ┃ ┗ 📜prisma.js
 ┃ ┣ 📂login
 ┃ ┃ ┗ 📜page.jsx
 ┃ ┣ 📂logout
 ┃ ┃ ┗ 📜page.jsx
 ┃ ┣ 📂register
 ┃ ┃ ┗ 📜page.jsx
 ┃ ┣ 📂serverPage
 ┃ ┃ ┗ 📜page.jsx
 ┃ ┣ 📂settings
 ┃ ┃ ┗ 📜page.jsx
 ┃ ┣ 📂storage
 ┃ ┃ ┗ 📜page.jsx
 ┃ ┣ 📂test
 ┃ ┃ ┗ 📜page.jsx
 ┃ ┣ 📂transaction
 ┃ ┃ ┗ 📜page.jsx
 ┃ ┣ 📂transactions-history
 ┃ ┃ ┗ 📜page.jsx
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜globals.css
 ┃ ┣ 📜layout.jsx
 ┃ ┣ 📜loading.jsx
 ┃ ┗ 📜page.jsx
 ┣ 📂components
 ┃ ┣ 📂GeneratePDF
 ┃ ┃ ┗ 📜index.jsx
 ┃ ┣ 📂Profile
 ┃ ┃ ┗ 📜index.jsx
 ┃ ┗ 📂Utilities
 ┃ ┃ ┣ 📂ButtonHomepage
 ┃ ┃ ┃ ┗ 📜index.jsx
 ┃ ┃ ┣ 📂ButtonSpinner
 ┃ ┃ ┃ ┗ 📜index.jsx
 ┃ ┃ ┣ 📂DisplayCard
 ┃ ┃ ┃ ┗ 📜page.jsx
 ┃ ┃ ┣ 📂Header
 ┃ ┃ ┃ ┗ 📜index.jsx
 ┃ ┃ ┣ 📂Navbar
 ┃ ┃ ┃ ┗ 📜index.jsx
 ┃ ┃ ┗ 📂SmallLoading
 ┃ ┃ ┃ ┗ 📜index.jsx
 ┗ 📜middleware.js
 ```




