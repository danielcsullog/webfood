# webFood

Full stack Food ordering app for customers and restaurants.

Deployed on Heroku: webfood-fullstack-client.herokuapp.com

- What is working:
  - Sign up & log in
  - Requests:
    - New Restaurant creation with a request for admin
    - Delete restaurant
    - Request status shown with colored line and text (admin can change it: viewed, in_progress, accepted, refused)
    - Timestamp on requests (creation, completion) 
    - Sender of the request (name)
  - Restaurants:
    - Every user can create a new restaurant with personalised info -> if admin approves the request -> new Restaurant created
    - Restaurant owner can delete a created restaurant
    - Restaurant owner can add, edit meals of the restaurant
    - Restaurant owner can see & modify the Restaurant's orders
    - Every Restaurant which is accepted by Admin shows up in "Restaurants" menu for every user
    - User can search restaurants
    - Restaurant price category calculated by the meals average price, nobody can change it
    - Users only can see the restaurant's info which is approved by Admin
    - Users can see the restaurants offers in categories (tabs)
  - Meals:
    - Every meal has it's own restaurant
    - User can search meals in offers
    - Meal's info can be edited after creation by restaurant owner
  - Addresses:
    - Every user can add new delivery address
    - Every user can update & delete their addresses
    - Every address has it's own user, only the owner can see & modify them
  - Cart:
    - Every user can add meals to their cart with amount selector
    - Cart can contain meals from only one Restaurant, popup appears when user try mixing restaurants
    - Cart button has a badge which shows the current amount of items in it
    - There is a button in cart which navigates back to the restaurant where the meals come from
    - User can clear the cart with one button
    - User can modify the amount of meals in cart
    - User can remove items from cart
    - Cart calculates the price of every meal based on price per item and amount
    - Cart calculates the total price of meals
    - User can choose an already added delivery address in cart for the order
    - User can add notes to the order in cart before sending
    - Cart is cleared after the order is sent
  - Orders:
    - Only the order's user and the restaurant owner can see the order
    - When order is sent, it appears in the "Orders" menu & in the restaurant's orders menu in the restaurant owner's account
    - Not completed orders are green, completed are black
    - Icon shows the current status of order (new, in progress, done)
    - Only the restaurant owner can change the status of the order
    - Every order has a timestamp
    - In restaurant orders menu there is a colored bar and text which shows the current status of the order
    
To try it there is the admin login info:
- username: admin
- password: admin
