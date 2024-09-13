# FSJ Challenge 1: E-commerce Store

## Project Overview

This project is part of the FSJ01 challenge where the objective is to build an e-commerce store using Next.js and fetch data from the Next e-commerce store API. The store displays a list of products, their details, allows navigation between pages, and handles features like pagination and product detail viewing. The solution is documented using JSDoc.

## Project Setup

To set up the project locally, follow these steps:

### Prerequisites
#### Ensure you have the following installed:

Node.js (v14 or higher)
npm (v6 or higher)
Git

### Steps:

1.  Clone the repository:
[https://github.com/OfentseXI/OFEDIA525_JSE2401_GROUPA_Ofentse-Diale_FSJ01.git]

2. Install the required dependencies:
npm install

3. Run the development server:
npm run dev

4. Open the given server link to view live application

## Technologies Used

Next.js - Framework used for building React applications with server-side rendering and static site generation.

Tailwind CSS - Utility-first CSS framework for styling.

JSDoc - For documenting the code.

Next e-commerce store API - Source of product data.

## Key Features

Product Listing: Displays a paginated list of products fetched from the API.

Product Details: Clicking on a product navigates to a detailed page showing product-specific information like title, description, rating, and more.

Loading & Error Handling: Displays appropriate loading animations and error messages when the data is being fetched or fails to load.

Responsive Design: The application is designed to be mobile-friendly with responsive styling using Tailwind CSS.

## API Endpoints

The project interacts with the following Next e-commerce store API endpoints:

Product List: https://next-commerce-api.vercel.app/products
Fetches a list of available products.

Product Details: https://next-commerce-api.vercel.app/products/{id}
Fetches detailed information about a specific product based on its id.

## How to Use

The application offers several features for browsing products, viewing product details, and navigating between pages. Follow the steps below to explore the features and interact with the application:

1. Home Page (Product Listing)
When you first load the application, you'll land on the home page, where a list of products is fetched from the API. Here's what you can do:

Pagination:

The product listing page is paginated, meaning it only displays a limited number of products per page (e.g., 10 per page).
Use the Next and Previous buttons to navigate through the different pages of products.
Product Cards:

Each product is displayed in a card format with a thumbnail image, title, price, category, and stock status.
If a product is in stock, you'll see a green "In Stock" badge. Otherwise, a red "Out of Stock" badge is displayed.
Clicking on a Product:

To view more details about a product, click on its title, image or view details. This will take you to the Product Details page.

2. Product Details Page
After clicking on a product, you'll be redirected to its Product Details page, where you can view more detailed information:

Image Gallery:

If the product has multiple images, you can scroll through them using the left and right arrows beside the product image.
Thumbnails of all available images are displayed below the main image. Clicking on any thumbnail will change the displayed image.

Product Information:

You'll see the product's title, price, description, and category.
A rating of the product is shown in the form of stars, along with the stock information.

Tags:

If the product has associated tags, they will be displayed below the product information. Tags can help you identify the type or category of the product.

Customer Reviews:

If the product has customer reviews, they will be listed in this section. Each review contains the reviewer's name, the date, the comment, and a star rating.
You can toggle between showing and hiding the reviews by clicking the Show Reviews/Hide Reviews button.

Back to Products:

To return to the main product listing, click the Back to Products link at the bottom of the product details page. This will bring you back to the home page, where you can continue browsing through other products.

3. Error Handling & Loading States

Loading State:

While the products are being fetched from the API, a loading spinner is displayed. This helps inform the user that the data is being loaded.

Error Handling:

If there is an error in fetching the product details or listing (e.g., network issues, invalid product ID), an error message will be displayed, or the user will be redirected to a 404 Not Found page.

4. Responsive Design

The app is fully responsive and adjusts gracefully across different screen sizes:

On smaller devices like mobile phones, the product grid stacks vertically, and buttons become easier to interact with.
The images and product information are resized appropriately to ensure a seamless user experience.

5. Navigation

The application uses Next.js's routing system, so you can use the browser’s back and forward buttons to navigate between pages.
All links and buttons provide smooth transitions, making it easy to explore the product catalog and view individual product details.