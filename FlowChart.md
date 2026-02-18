```mermaid
flowchart LR
    Admin((Admin))
    Staff((Staff))

    Admin --> UC1[Manage Products]
    Admin --> UC2[Manage Categories]
    Admin --> UC3[Manage Suppliers]
    Admin --> UC4[View Inventory Reports]
    Admin --> UC5[View Low Stock Alerts]

    Staff --> UC6[Create Customer Order]
    Staff --> UC7[Create Purchase Order]
    Staff --> UC8[Update Stock]
    Staff --> UC9[Update Order Status]
    Staff --> UC10[View Orders]
