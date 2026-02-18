#. Order Management System

## 1. Overview

The Inventory & Order Management System is a web application that helps businesses manage products, suppliers, inventory and orders in one place. It is built to make sure that the stock levels are accurate orders are processed correctly and the data is consistent.

## 2. Problem Statement

Many small and medium businesses still use methods or unconnected systems to manage their inventory and orders. This can cause problems like stock discrepancies delayed order fulfillment and poor visibility into inventory levels.

## 3. Proposed Solution

This project is a system that lets administrators and staff manage inventory and orders in real time. It has a backend that enforces the rules for updating stock managing orders and dealing with suppliers.

## 4. Project Scope

The system has the following modules:

- User Management, which includes Admin and Staff roles

- Managing products and categories

- Managing suppliers

- Managing inventory stock

- Managing orders, including customer and purchase orders

- Reporting on inventory and sending low stock alerts

## 5. User Roles

### Admin

- Can manage products, categories and suppliers

- Can see inventory reports

- Can view stock alerts

- Is in charge of system data

### Staff

- Can create and process customer orders

- Can create purchase orders for suppliers

- Can update inventory stock

- Can track and update the status of orders

## 6. Order Lifecycle

Orders go through a set lifecycle to keep things

CREATED → CONFIRMED → SHIPPED → DELIVERED → CANCELLED

## 7. Key Features

- Tracks inventory in time

- Updates stock automatically when orders are created

- Sends alerts when stock is low

- Controls access based on user roles

- Keeps different parts of the system separate using layered architecture

## 8. Backend Design Focus

The backend is built using software engineering practices:

- Uses Object-Oriented Programming principles like abstraction and encapsulation

- Follows an architecture with Controller, Service and Repository layers

- Applies design patterns like Repository and Strategy where needed

- Manages transactions to keep data consistent

## 9. Non-Functional Requirements

- Can scale up to handle products and orders

- Keeps data accurate and consistent

- Has secure authentication and authorization

- Has a codebase that is easy to maintain and extend

## 10. Technology Stack

- Backend: Java Spring Boot or Node.js, with Express

- Database: MySQL or PostgreSQL

- Frontend: React

- Authentication: Uses JWT-based authentication
