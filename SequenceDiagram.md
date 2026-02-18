```mermaid
sequenceDiagram
    actor Staff
    participant UI as Frontend
    participant OC as OrderController
    participant OS as OrderService
    participant IS as InventoryService
    participant OR as OrderRepository
    participant PR as ProductRepository
    participant DB as Database

    Staff ->> UI: Create Order
    UI ->> OC: submitOrder()
    OC ->> OS: createOrder()
    OS ->> IS: checkStock()
    IS ->> PR: getProductStock()
    PR ->> DB: fetch stock
    DB -->> PR: stock data
    PR -->> IS: stock available
    IS -->> OS: stock validated
    OS ->> OR: saveOrder()
    OR ->> DB: insert order
    DB -->> OR: success
    OS ->> IS: reduceStock()
    IS ->> PR: updateStock()
    PR ->> DB: update product
    DB -->> PR: success
    OC -->> UI: Order Created
