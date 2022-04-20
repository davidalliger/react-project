# ScareBnB
[ScareBnB](https://scarebnb-react-app.herokuapp.com) is an AirBnB clone specifically designed for spooky spirits in search of the perfect haunted houses for their next ghostly getaways. Users can list and browse creepy accomodations, make reservations, and leave reviews for the places they've visited.

The app was created using a React frontend with Redux state managment, an Express backend, and a PostgreSQL database. Currently, ScareBnB has three full-CRUD features, as well as a search functionality, but I would like to work on additional features like user profiles and direct messaging in the future. I would also like to utilize S3 for uploading and storing images.

## Implementation

One aspect of this project I'm proud of is how I gave users a way to check availability for a particular listing and set of dates. When viewing a listing, a user can enter a start date and end date for their trip, and click a button to check availiability. This will cause the checkAvailability function to be excuted, sending a fetch request to a special route handler on the backend.

![availability-1](https://user-images.githubusercontent.com/88861592/164079203-e67a5dd7-2aef-4b27-8036-6d569db40ef0.PNG)

This route handler grabs the listing id from the parameters and the dates from the query string, then queries the database to check for any conflicting reservations at that listing that would overlap with the requested dates. If there are any conflicting reservations, it returns false. Otherwise, it returns true.

![availability-2](https://user-images.githubusercontent.com/88861592/164079733-1a5b6cda-15bc-48f5-a981-cdf9e00b4bb7.PNG)

## Technologies
This app utilizes the following technologies:
- PostgreSQL
- Sequelize
- Express
- React
- Redux

## Screenshots

### Splash Page

When first visiting the app, users are greeted by a splash page that displays a call to action and a spooky image from Peter H at Pixabay. The splash page also has a profile button in the navigation bar, which opens a menu with options for signing up or logging in if one already has an account. About links can be found in the footer; one leads to this github repository and one leads to my LinkedIn page.

![screenshots-1](https://user-images.githubusercontent.com/88861592/164080495-786299e7-2dfe-4aee-86ed-9372f07b6b84.PNG)

### Search Haunts Page

A user can click a button in the navigation bar to access the search haunts page, where they can browse through available haunted houses and filter by location and name.

![screenshots-2](https://user-images.githubusercontent.com/88861592/164081034-de0a1828-9822-4bff-9266-ce374b1ff79b.PNG)

### Haunt Detail

When a user selects a haunted house from the search haunts page, they will be brought to that haunted house's detail page. Here, they can enter dates for their trip, check availability, book a trip, read a brief description and reviews, and add a review if they've previously stayed at the location.

![screenshots-3](https://user-images.githubusercontent.com/88861592/164082014-fdbb0dd8-bae8-48ef-8c5d-c188be657efc.PNG)

![screenshots-4](https://user-images.githubusercontent.com/88861592/164082074-a35f532a-de88-4651-9bac-1a73e23fe686.PNG)

### Spookings

A registered and logged-in user can view their past and future trips.

![screenshots-5](https://user-images.githubusercontent.com/88861592/164082436-137e8afd-ec52-4ca8-b6bb-0a0a19cfbe80.PNG)

## Features

### Authentication
- A user can sign up for an account
- A registered user can log in
- A registered and logged-in user can log out

### Haunts
- A registered and logged-in user can create a haunt.
- A user can view haunts.
- A registered and logged-in user can edit his or her haunt.
- A registered and logged-in user can delete his or her haunt.

### Spookings
- A registered and logged-in user can create a spooking.
- A registered and logged-in user can view their past and future spookings.
- A registered and logged-in user can cancel a future spooking.

### Reviews
- A registered and logged-in user can add a review to a haunt they've previously visited.
- A user can read reviews.
- A registered and logged-in user can edit a review they've written.
- A registered and logged-in user can delete a review they've written.

### Search
- Search by location
- Search by name

## Possible Future Features

### Profiles
- Create a profile
- View other users' profiles
- Update a profile
- Delete a profile

### Direct Messaging
- Send a message
- Read messages
- Edit a message
- Delete a message
