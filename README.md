## Bills management page

### Screenshots

<img width="1440" alt="BillsManagement" src="https://user-images.githubusercontent.com/4697967/153757228-bc071bd3-ecb2-431f-8451-519127ff3cb8.png">



<img width="1440" alt="Screenshot 2022-02-13 at 14 12 37" src="https://user-images.githubusercontent.com/4697967/153757236-fa8eaa31-36a6-4a15-9f12-a4f2eaf4bc34.png">


### Get Started
1. Fork or clone this repo (a simple [`create-react-app`](https://github.com/facebook/create-react-app) extended with [`json-server`](https://github.com/typicode/json-server) and some specific goodies)
1. Install dependencies via `yarn` (or `npm`)
1. Run `yarn start` to start the dev server
1. Run `yarn api` in a different terminal to start the json-api server

### The Functionality
1. Create a Tabs component that allows multiple pages to be switched between.
1. One tab should show a list of bills. These can be found at http://localhost:3002/bills/. Bills have a flag `isBill` set to `true`.
1. Another tab should show a list of transactions which are potential bills. These can also be found at http://localhost:3000/bills/. Potential bills have a flag `isBill` set to `false`.
1. Under each bill row for both lists, should be a hidden list of transactions for that bill. This should show when the bill row is clicked.
1. Under the name of each bill should show a count of the transactions for it
1. Add an action to the bills tab for each bill called "remove bill" which updates the relevant bill's `isBill` flag to `false`. You can use a `PATCH` request to `http://localhost:3000/bills/:id` using the id of the bill to update the bill resource.
1. Add an action to the potential bills tab for each potential bill called "Add as bill" which updates the relevant bill's `isBill` flag to `true`.
1. After each action, the lists should reflect the changes.

