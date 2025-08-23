# 🛒 Shiroe E-commerce

An e-commerce web application built with **Next.js**, **TailwindCSS**, **Shadcn/UI**, and **Stripe** for seamless online shopping and checkout experiences.

---

## 🚀 Tech Stack

- [Next.js](https://nextjs.org/) – React framework for SSR & API routes  
- [TailwindCSS](https://tailwindcss.com/) – Utility-first CSS styling  
- [Shadcn/UI](https://ui.shadcn.com/) – Accessible, customizable UI components  
- [Stripe](https://stripe.com/) – Secure payment gateway  

---

## 📦 Features

- Product catalog with dynamic pages  
- Shopping cart management  
- Stripe Checkout integration  
- Responsive design with TailwindCSS  
- Reusable components powered by Shadcn/UI  

---

## ⚙️ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/BrianShiroe/shiroe-ecommerce.git
cd shiroe-ecommerce
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables
Create a .env.local file in the root directory and add your Stripe keys:
```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_BASE_URL=your_website_url or just http://localhost:3000
```

### 4. Run the Development Server
```bashF
npm run dev
# or
yarn dev
```

### 🏗️ Build for Production
```bash
npm run build
npm start
```