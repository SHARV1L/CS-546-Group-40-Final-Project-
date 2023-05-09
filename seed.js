import { booking } from './config/mongoCollections.js';
import { property } from './config/mongoCollections.js';
import { ObjectId } from 'mongodb';
import { closeConnection } from './config/mongoConnection.js';

const seedBookings = [
  {
    userId: new ObjectId("644e976a0a60e9505cddcf00"),
    property_id: new ObjectId("6454b270f1baf13e668068ae"),
    checkInDate: new Date(),
    checkOutDate: new Date(),
    totalPrice: 600
  },
  {
    userId: new ObjectId("644e976a0a60e9505cddcf00"),
    property_id: new ObjectId("6454b270f1baf13e668068ae"),
    checkInDate: new Date("10/12/2023"),
    checkOutDate: new Date("12/12/2023"),
    totalPrice: 700
  },
  {
    userId: new ObjectId("644e976a0a60e9505cddcf00"),
    property_id: new ObjectId("6454b270f1baf13e668068ae"),
    checkInDate: new Date("4/6/2023"),
    checkOutDate: new Date("7/6/2023"),
    totalPrice: 500
  },
]

const seedProperties = [
  {
    userId: new ObjectId("644e976a0a60e9505cddcf00"),
    propertyName: "YEBE LUX",
    description: "The whole group will be comfortable in this spacious and unique space.<br /><br /><b>Guest access</b><br />you can enjoy the living room, dining room, kitchen and the backyard. The home has two entrances",
    numberOfRooms: "4",
    numberofBathrooms: "3",
    amenities: ["AC", "Wifi", "Garden", "Night Cab", "TV"],
    address: "Canarsie,Brooklyn,NY",
    latitude: "40.640402656712844",
    longitude: "-73.88853475272201",
    pricePerNight: 30,
    availability: ["2023-05-09", "2023-05-10", "2023-05-08"],
    reviews: [],
    images: "https://a0.muscache.com/pictures/30b294c9-0b0c-440f-b621-c52f772a264a.jpg",
  },
  {
    userId: new ObjectId("644e976a0a60e9505cddcf00"),
    propertyName: "THE DIORE",
    description: "The whole group will be comfortable in this spacious and unique space.<br /><br /><b>Guest access</b><br />you can enjoy the living room, dining room, kitchen and the backyard. The home has two entrances",
    numberOfRooms: "4",
    numberofBathrooms: "3",
    amenities: ["AC", "Wifi", "Garden", "Night Cab", "TV"],
    address: "Canarsie,Brooklyn,NY",
    latitude: "40.640402656712552",
    longitude: "-73.88853475272204",
    pricePerNight: 50,
    availability: [],
    images: "https://a0.muscache.com/pictures/30b294c9-0b0c-440f-b621-c52f772a264a.jpg",
    reviews: [{ rating: 4, feedback: "Good Property", guestId: new ObjectId('64556acf6d9a87cb3f50af67') }]
  }
]

const seedDB = async () => {
  let bookingCollection = await booking();
  let propertyCollection = await property();
  await bookingCollection.deleteMany({});
  await bookingCollection.insertMany(seedBookings);
  await propertyCollection.deleteMany({});
  await propertyCollection.insertMany(seedProperties);
}

seedDB().then(() => {
  console.log("inside seed done");
  closeConnection();
})