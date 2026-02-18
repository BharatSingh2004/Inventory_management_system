```mermaid
classDiagram
    class User {
        <<abstract>>
        -userId
        -username
        -password
        -role
        +login()
        +logout()
    }

    class Admin {
        +manageProducts()
        +viewReports()
    }

    class Staff {
        +createOrder()
        +updateStock()
    }

    class Product {
        -productId
        -name
        -price
        -stockQuantity
        -status
        +increaseStock()
        +decreaseStock()
    }

    class Category {
        -categoryId
        -categoryName
    }

    class Supplier {
        -supplierId
        -supplierName
        -contactInfo
    }

    class Order {
        -orderId
        -orderDate
        -status
        -totalAmount
        +createOrder()
        +updateStatus()
    }

    class OrderItem {
        -orderItemId
        -quantity
        -price
    }

    User <|-- Admin
    User <|-- Staff
    Category "1" --> "many" Product
    Supplier "1" --> "many" Product
    Order "1" --> "many" OrderItem
    Product "1" --> "many" OrderItem
    User "1" --> "many" Order
