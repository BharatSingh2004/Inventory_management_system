```mermaid
erDiagram
    USERS {
        int user_id PK
        string username
        string password
        string role
    }

    CATEGORIES {
        int category_id PK
        string category_name
    }

    SUPPLIERS {
        int supplier_id PK
        string supplier_name
        string contact_info
    }

    PRODUCTS {
        int product_id PK
        string name
        float price
        int stock_quantity
        string status
        int category_id FK
        int supplier_id FK
    }

    ORDERS {
        int order_id PK
        date order_date
        string status
        float total_amount
        int user_id FK
    }

    ORDER_ITEMS {
        int order_item_id PK
        int quantity
        float price
        int order_id FK
        int product_id FK
    }

    USERS ||--o{ ORDERS : places
    CATEGORIES ||--o{ PRODUCTS : contains
    SUPPLIERS ||--o{ PRODUCTS : supplies
    ORDERS ||--o{ ORDER_ITEMS : includes
    PRODUCTS ||--o{ ORDER_ITEMS : listed_in
