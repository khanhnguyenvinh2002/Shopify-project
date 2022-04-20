# Shopify challenge

This is the submission for Fall 2022 Shopify intern challenge.

For this submission, I chose this additional feature:

-   Ability to create “shipments” and assign inventory to the shipment, and adjust inventory appropriately

## Installation
Download the project from github and download nodejs and npm from https://nodejs.org
and cd into the folder

Install the packages with
``` bash
npm install
```
Start the project with
``` bash
node app.js
```
or install nodemon (the node monitoring app) with
``` bash
npm install -g nodemon
```
and start the project with
``` bash
nodemon
```

## Code walk through

MongoDB models: models folder
Backend APIS: routes folder
Views: views folder

## Instruction

Main interface of the application:

![image of main interface](https://user-images.githubusercontent.com/74166827/164124058-839ae9b4-f81b-4b2b-a91b-0edb5bef9551.png)

### Create new inventory:

Click on New Inventory above the first table.

Then, fill all the fields and click submit.

![image of create inventory](https://user-images.githubusercontent.com/74166827/164124845-1c22c1b2-4d09-4d5b-a242-80188e94754d.png)

### Edit existing inventory:

Click on edit button under the Actions column in the first table for the item you want to edit.

Then, edit the fields you want and click submit.

![image of edit inventory](https://user-images.githubusercontent.com/74166827/164124965-ab153ae9-d740-46d3-8e55-4cb49b41a3cc.png)

### Delete existing inventory:

Click on delete button under the Actions column in the first table for the item you want to delete.

Before delete, we have 2 inventories:
![image of before deleting inventory](https://user-images.githubusercontent.com/74166827/164125119-2159dca8-d353-463b-a727-57153f788a3f.png)

After delete item 2, we have 1 inventory:
![image of after deleting inventory](https://user-images.githubusercontent.com/74166827/164125138-9842f4ed-00ea-4b42-be15-66dcfb3636ff.png)

# Create new Shipment

Click on New Shipment above the second table.

Then, fill all the fields.

Then, choose number of items for each inventory you want for this shipment. Each shipment will have 4 statuses: confirmed, in progress, completed, cancelled.

![image of create inventory](https://user-images.githubusercontent.com/74166827/164125618-88341898-cc5e-458c-9348-ebb605b34f17.png)

### Edit existing shipment:

Click on edit button under the Actions column in the second table for the item you want to edit.

Then, edit the fields you want and click submit.

![image of edit shipment](https://user-images.githubusercontent.com/74166827/164125727-3062e96f-6a82-4697-b336-7457e473a9be.png)

### Delete existing shipment:

Click on delete button under the Actions column in the second table for the item you want to delete.

Before delete, we have 6 shipments:
![image of before deleting shipment](https://user-images.githubusercontent.com/74166827/164125906-57957cec-89b4-45da-833b-e1d2cfeacbab.png)

After delete last item, we have 5 shipments:
![image of after deleting shipment](https://user-images.githubusercontent.com/74166827/164125938-00a4e002-32c7-455d-bf61-951a79fe6b16.png)

## Future improvements:

- ExpressJS and NodeJS is a fast option to build an interface with API and deploying to the same place. 
- Currently, there are some limitations on how each shipment can manage the inventory. Future improvements might include adding back the inventories previously substracted for the shipments when the shipment is cancelled. When authorization is implemented, there can be restrictions on who can edit the shipment or who can create the inventories.