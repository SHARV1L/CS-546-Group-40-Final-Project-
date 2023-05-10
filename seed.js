import {booking} from './config/mongoCollections.js';
import { property } from './config/mongoCollections.js';
import { ObjectId } from 'mongodb';
import { closeConnection } from './config/mongoConnection.js';

const seedBookings =[
    {
     userId:new ObjectId("644e976a0a60e9505cddcf00"),
     property_id:new ObjectId("6454b270f1baf13e668068ae"),
     checkInDate:new Date(),
     checkOutDate:new Date(),
     totalPrice:600
    },
     {
     userId:new ObjectId("644e976a0a60e9505cddcf00"),
     property_id:new ObjectId("6454b270f1baf13e668068ae"),
     checkInDate:new Date("10/12/2023"),
     checkOutDate:new Date("12/12/2023"),
     totalPrice:700
    },
     {
     userId:new ObjectId("644e976a0a60e9505cddcf00"),
     property_id:new ObjectId("6454b270f1baf13e668068ae"),
     checkInDate:new Date("4/6/2023"),
     checkOutDate:new Date("7/6/2023"),
     totalPrice:500
    },
    {
      userId: new ObjectId("645d7e8c819b2a7c58d68eb9"),
      property_id: new ObjectId("6457ef43a5b23a7d8e63b5a7"),
      checkInDate: new Date("2023-07-01"),
      checkOutDate: new Date("2023-07-05"),
      totalPrice: 1200
  },
  {
      userId: new ObjectId("645d7e8c819b2a7c58d68eb9"),
      property_id: new ObjectId("6457ef43a5b23a7d8e63b5a7"),
      checkInDate: new Date("2023-08-10"),
      checkOutDate: new Date("2023-08-12"),
      totalPrice: 600
  },
  {
      userId: new ObjectId("645d7e8c819b2a7c58d68eb9"),
      property_id: new ObjectId("6457ef43a5b23a7d8e63b5a7"),
      checkInDate: new Date("2023-06-05"),
      checkOutDate: new Date("2023-06-10"),
      totalPrice: 900
  },
  {
      userId: new ObjectId("645d7e8c819b2a7c58d68eb9"),
      property_id: new ObjectId("645f2a5ef20a7b748e5f0a91"),
      checkInDate: new Date("2023-09-20"),
      checkOutDate: new Date("2023-09-22"),
      totalPrice: 500
  },
  {
      userId: new ObjectId("645d7e8c819b2a7c58d68eb9"),
      property_id: new ObjectId("645f2a5ef20a7b748e5f0a91"),
      checkInDate: new Date("2023-11-01"),
      checkOutDate: new Date("2023-11-05"),
      totalPrice: 800
  },
  {
      userId: new ObjectId("644e976a0a60e9505cddcf00"),
      property_id: new ObjectId("6454b270f1baf13e668068ae"),
      checkInDate: new Date("2023-06-15"),
      checkOutDate: new Date("2023-06-20"),
      totalPrice: 400
  },
  {
      userId: new ObjectId("644e976a0a60e9505cddcf00"),
      property_id: new ObjectId("6454b270f1baf13e668068ae"),
      checkInDate: new Date("2023-08-01"),
      checkOutDate: new Date("2023-08-10"),
      totalPrice: 800
  },
  {
      userId: new ObjectId("644e976a0a60e9505cddcf00"),
      property_id: new ObjectId("6454b270f1baf13e668068ae"),
      checkInDate: new Date("2023-09-01"),
      checkOutDate: new Date("2023-09-04"),
      totalPrice: 300
  },
  {
      userId: new ObjectId("644e976a0a60e9505cddcf00"),
      property_id: new ObjectId("6454b270f1baf13e668068af"),
      checkInDate: new Date("2023-07-10"),
      checkOutDate: new Date("2023-07-15"),
      totalPrice: 600
  },
  {
      userId: new ObjectId("644e976a0a60e9505cddcf01"),
      property_id: new ObjectId("6454b270f1baf13e668068b0"),
      checkInDate: new Date("2023-11-01"),
      checkOutDate: new Date("2023-11-05"),
      totalPrice: 200
  },
  {
      userId: new ObjectId("64556acf6d9a87cb3f50af67"),
      property_id: new ObjectId("6454b270f1baf13e668068ae"),
      checkInDate: new Date(),
      checkOutDate: new Date(),
      totalPrice: 800
  },
  {
      userId: new ObjectId("64556acf6d9a87cb3f50af67"),
      property_id: new ObjectId("6454b270f1baf13e668068ae"),
      checkInDate: new Date("2023-08-15"),
      checkOutDate: new Date("2023-08-20"),
      totalPrice: 600
  },
  {
      userId: new ObjectId("64556acf6d9a87cb3f50af67"),
      property_id: new ObjectId("6454b270f1baf13e668068ae"),
      checkInDate: new Date("2023-11-01"),
      checkOutDate: new Date("2023-11-05"),
      totalPrice: 400
  },
  {
      userId: new ObjectId("64556acf6d9a87cb3f50af67"),
      property_id: new ObjectId("6454b270f1baf13e668068ae"),
      checkInDate: new Date("2024-01-02"),
      checkOutDate: new Date("2024-01-08"),
      totalPrice: 900
  },
  {
      userId: new ObjectId("64556acf6d9a87cb3f50af67"),
      property_id: new ObjectId("6454b270f1baf13e668068ae"),
      checkInDate: new Date("2024-05-20"),
      checkOutDate: new Date("2024-05-22"),
      totalPrice: 300
  },
  {
      userId: new ObjectId("644e976a0a60e9505cddcf00"),
      property_id: new ObjectId("6454b270f1baf13e668068ae"),
      checkInDate: new Date("2023-06-15T00:00:00.000Z"),
      checkOutDate: new Date("2023-06-20T00:00:00.000Z"),
      totalPrice: 750
  },
  {
      userId: new ObjectId("644e976a0a60e9505cddcf00"),
      property_id: new ObjectId("64556acf6d9a87cb3f50af68"),
      checkInDate: new Date("2023-07-01T00:00:00.000Z"),
      checkOutDate: new Date("2023-07-05T00:00:00.000Z"),
      totalPrice: 480
  },
  {
      userId: new ObjectId("644e976a0a60e9505cddcf00"),
      property_id: new ObjectId("64556acf6d9a87cb3f50af69"),
      checkInDate: new Date("2023-09-01T00:00:00.000Z"),
      checkOutDate: new Date("2023-09-07T00:00:00.000Z"),
      totalPrice: 860
  },
  {
      userId: new ObjectId("644e976a0a60e9505cddcf00"),
      property_id: new ObjectId("6456c8cda102e49a7a48b44d"),
      checkInDate: new Date("2023-08-15T00:00:00.000Z"),
      checkOutDate: new Date("2023-08-20T00:00:00.000Z"),
      totalPrice: 1200
  },
  {
      userId: new ObjectId("644e976a0a60e9505cddcf00"),
      property_id: new ObjectId("6456c8cda102e49a7a48b44d"),
      checkInDate: new Date("2023-10-10T00:00:00.000Z"),
      checkOutDate: new Date("2023-10-15T00:00:00.000Z"),
      totalPrice: 1250
  }
]

const seedProperties =[
    {
    userId: new ObjectId("644e976a0a60e9505cddcf00"),
    propertyName:"YEBE LUX",
    description:"The whole group will be comfortable in this spacious and unique space.<br /><br /><b>Guest access</b><br />you can enjoy the living room, dining room, kitchen and the backyard. The home has two entrances",
    numberOfRooms:"4",
    numberofBathrooms:"3",
    amenities:["AC","Wifi","Garden","Night Cab","TV"],
    address:"Canarsie,Brooklyn,NY",
    latitude:"40.640402656712844",
    longitude:"-73.88853475272201",
    pricePerNight:30,
    availability:["2023-05-09","2023-05-10","2023-05-08"],
    reviews:[],
    images:"https://a0.muscache.com/pictures/30b294c9-0b0c-440f-b621-c52f772a264a.jpg",
  },
  {
    userId: new ObjectId("644e976a0a60e9505cddcf00"),
    propertyName:"THE DIORE",
    description:"The whole group will be comfortable in this spacious and unique space.<br /><br /><b>Guest access</b><br />you can enjoy the living room, dining room, kitchen and the backyard. The home has two entrances",
    numberOfRooms:"4",
    numberofBathrooms:"3",
    amenities:["AC","Wifi","Garden","Night Cab","TV"],
    address:"Canarsie,Brooklyn,NY",
    latitude:"40.640402656712552",
    longitude:"-73.88853475272204",
    pricePerNight:50,
    availability:[],
    images:"https://a0.muscache.com/pictures/30b294c9-0b0c-440f-b621-c52f772a264a.jpg",
    reviews:[{rating:4, feedback:"Good Property", guestId:new ObjectId('64556acf6d9a87cb3f50af67')}]
  },
  {
    userId: new ObjectId("64571dfb5f958e1d8fa1bc2f"),
    propertyName: "Luxury Villa",
    description: "Experience a luxurious stay at our beautiful villa, surrounded by nature and breathtaking views.",
    numberOfRooms: "5",
    numberofBathrooms: "5",
    amenities: ["Pool", "Jacuzzi", "Gym", "Sauna", "Barbecue"],
    address: "Malibu, California, USA",
    latitude: "34.03903548795293",
    longitude: "-118.7325001579384",
    pricePerNight: 500,
    availability: ["2023-06-01", "2023-06-02", "2023-06-03"],
    reviews: [{ rating: 5, feedback: "Amazing property and location.", guestId: new ObjectId('64556acf6d9a87cb3f50af67') }],
    images: "https://img-de.gtsstatic.net/reno/imagereader.aspx?idlisting=527-l-538-17_22328210&imageurl=https%3A%2F%2Fmmsmedia.vht.com%2FMedia%2FPhotography%2FDEGI%2F1631538%2F2c521408-cc63-4c07-8a9f-a7aad1b9f792.jpg%3Fdate%3D2023-03-31&option=n&w=480&fallbackimageurl=https%3A%2F%2Fstatic-ind-elliman-production.gtsstatic.net%2Fresources%2Fsiteresources%2Fcommonresources%2Fimages%2Fnophoto%2Fde_website_holder_400x300.jpg"
},
{
    userId: new ObjectId("64571dfb5f958e1d8fa1bc2f"),
    propertyName: "Penthouse Suite",
    description: "Stay in our luxurious penthouse suite and enjoy stunning views of the city skyline.",
    numberOfRooms: "3",
    numberofBathrooms: "3",
    amenities: ["Gym", "Pool", "Spa", "Bar"],
    address: "New York City, New York, USA",
    latitude: "40.71272892649265",
    longitude: "-74.00601584571725",
    pricePerNight: 800,
    availability: ["2023-05-20", "2023-05-21", "2023-05-22"],
    reviews: [{ rating: 4, feedback: "Great property, but a bit expensive.", guestId: new ObjectId('64556acf6d9a87cb3f50af67') }],
    images: "https://img-de.gtsstatic.net/reno/imagereader.aspx?idlisting=527-l-551-17_22321751&imageurl=https%3A%2F%2Fmmsmedia.vht.com%2FMedia%2FPhotography%2FDEGI%2F1630166%2Ffe90597b-ff8a-4160-a8f4-41dbc53e4b36.jpg%3Fdate%3D2023-05-08&option=n&w=480&fallbackimageurl=https%3A%2F%2Fstatic-ind-elliman-production.gtsstatic.net%2Fresources%2Fsiteresources%2Fcommonresources%2Fimages%2Fnophoto%2Fde_website_holder_400x300.jpg"
},
{
    userId: new ObjectId("64571dfb5f958e1d8fa1bc2f"),
    propertyName: "Beach House",
    description: "Escape to our cozy beach house and relax to the sound of the waves.",
    numberOfRooms: "2",
    numberofBathrooms: "1",
    amenities: ["Beach Access", "Outdoor Shower", "Fire Pit"],
    address: "Kailua, Hawaii, USA",
    latitude: "21.40134785121615",
    longitude: "-157.74431717803268",
    pricePerNight: 300,
    availability: ["2023-07-01", "2023-07-02", "2023-07-03"],
    reviews: [{ rating: 5, feedback: "Perfect getaway spot!", guestId: new ObjectId('64556acf6d9a87cb3f50af67') }],
    images: "https://img-de.gtsstatic.net/reno/imagereader.aspx?idlisting=527-l-552-17_22418845&imageurl=https%3A%2F%2Fmmsmedia.vht.com%2FMedia%2FPhotography%2FDEGI%2F1641707%2F8ce72069-1d88-48eb-bd19-4ce02b87cbe3.jpg%3Fdate%3D2023-05-02&option=n&w=480&fallbackimageurl=https%3A%2F%2Fstatic-ind-elliman-production.gtsstatic.net%2Fresources%2Fsiteresources%2Fcommonresources%2Fimages%2Fnophoto%2Fde_website_holder_400x300.jpg"
},
{
    userId: new ObjectId("646e1af20a60e9505cddcf00"),
    propertyName: "Cozy Cottage in the Woods",
    description: "Escape to the peace and tranquility of the forest in our cozy cottage. Perfect for couples or solo travelers, our rustic retreat offers a comfortable and private space to relax and unwind.",
    numberOfRooms: "1",
    numberofBathrooms: "1",
    amenities: ["Wood Stove", "Kitchenette", "Outdoor Fire Pit", "Hiking Trails"],
    address: "123 Forest Road, Anytown USA",
    latitude: "37.123456",
    longitude: "-122.123456",
    pricePerNight: 75,
    availability: ["2023-06-01", "2023-06-02", "2023-06-03"],
    reviews: [],
    images: "https://img-de.gtsstatic.net/reno/imagereader.aspx?idlisting=527-l-552-17_22418845&imageurl=https%3A%2F%2Fmmsmedia.vht.com%2FMedia%2FPhotography%2FDEGI%2F1641707%2F8ce72069-1d88-48eb-bd19-4ce02b87cbe3.jpg%3Fdate%3D2023-05-02&option=n&w=480&fallbackimageurl=https%3A%2F%2Fstatic-ind-elliman-production.gtsstatic.net%2Fresources%2Fsiteresources%2Fcommonresources%2Fimages%2Fnophoto%2Fde_website_holder_400x300.jpg",
},
{
    userId: new ObjectId("646e1af20a60e9505cddcf00"),
    propertyName: "Seaside Retreat",
    description: "Wake up to the sound of the waves and enjoy your morning coffee on the deck with a stunning ocean view. Our seaside retreat is the perfect getaway for beach lovers.",
    numberOfRooms: "2",
    numberofBathrooms: "2",
    amenities: ["Beachfront", "Hot Tub", "BBQ Grill", "Washer/Dryer"],
    address: "456 Ocean Avenue, Anytown USA",
    latitude: "36.123456",
    longitude: "-121.123456",
    pricePerNight: 150,
    availability: [],
    reviews: [{ rating: 5, feedback: "Absolutely amazing", guestId: new ObjectId('646e1af20a60e9505cddcf01') }],
    images: "https://img-de.gtsstatic.net/reno/imagereader.aspx?idlisting=527-l-704-17_22298160&imageurl=https%3A%2F%2Fmmsmedia.vht.com%2FMedia%2FPhotography%2FDEGI%2F1627227%2F84b20758-b43d-4442-a5b3-91db7516dad7.jpg%3Fdate%3D2023-05-08&option=n&w=480&fallbackimageurl=https%3A%2F%2Fstatic-ind-elliman-production.gtsstatic.net%2Fresources%2Fsiteresources%2Fcommonresources%2Fimages%2Fnophoto%2Fde_website_holder_400x300.jpg",
},
{
    userId: new ObjectId("646e1af20a60e9505cddcf00"),
    propertyName: "Luxury City Apartment",
    description: "Experience the best of city living in our luxurious apartment. With stunning views, modern amenities, and a prime location, this is the perfect choice for business travelers or tourists.",
    numberOfRooms: "3",
    numberofBathrooms: "2",
    amenities: ["City View", "Gym", "Swimming Pool", "Concierge"],
    address: "789 Main Street, Anytown USA",
    latitude: "38.123456",
    longitude: "-123.123456",
    pricePerNight: 250,
    availability: ["2023-06-15", "2023-06-16", "2023-06-17"],
    reviews: [],
    images: "https://img-de.gtsstatic.net/reno/imagereader.aspx?idlisting=527-l-555-17_22348613&imageurl=https%3A%2F%2Fmmsmedia.vht.com%2FMedia%2FPhotography%2FDEGI%2F1632923%2F06b000ed-4a3a-4604-9589-43e1bc7624a3.jpg%3Fdate%3D2023-04-19&option=n&w=480&fallbackimageurl=https%3A%2F%2Fstatic-ind-elliman-production.gtsstatic.net%2Fresources%2Fsiteresources%2Fcommonresources%2Fimages%2Fnophoto%2Fde_website_holder_400x300.jpg",
},
{
    userId: new ObjectId("646e1af20a60e9505cddcf00"),
    propertyName: "Rustic Cabin in the Mountains",
    description: "Get away from it all in our cozy cabin in the mountains. With a wood-burning stove, a hot tub, and stunning views, this is the perfect place to unwind and recharge.",
    numberOfRooms: "2",
    numberofBathrooms: "1",
    amenities: ["Mountain View", "Hot Tub", "Wood Stove", "Hiking Trails"],
    address: "101 Mountain Road, Anytown USA",
    latitude: "39.123456",
    longitude: "-120.123456",
    pricePerNight: 100,
    availability: ["2023-07-12", "2023-02-11", "2023-08-22"],
    reviews: [],
    images: "https://img-de.gtsstatic.net/reno/imagereader.aspx?idlisting=527-l-551-01_2138129&imageurl=https%3A%2F%2Fmmsmedia.vht.com%2FMedia%2FPhotography%2FDEGI%2F676594%2F82117ac2-26e2-4db7-a0dc-bf6f4c045426.jpg%3Fdate%3D2023-04-14&option=n&w=480&fallbackimageurl=https%3A%2F%2Fstatic-ind-elliman-production.gtsstatic.net%2Fresources%2Fsiteresources%2Fcommonresources%2Fimages%2Fnophoto%2Fde_website_holder_400x300.jpg",
},
{
    userId: new ObjectId("644e976a0a60e9505cddcf00"),
    propertyName: "Gotham Penthouse",
    description: "Luxurious penthouse in the heart of Gotham City with stunning views of the skyline.<br /><br /><b>Guest access</b><br />Full access to the apartment including the rooftop terrace.",
    numberOfRooms: "3",
    numberofBathrooms: "2",
    amenities: ["AC", "Wifi", "Gym", "Pool", "Concierge"],
    address: "123 Gotham Ave, Gotham City",
    latitude: "40.7128",
    longitude: "-74.0060",
    pricePerNight: 250,
    availability: ["2023-05-20", "2023-05-21", "2023-05-22", "2023-05-23", "2023-05-24"],
    reviews: [],
    images: "https://img-de.gtsstatic.net/reno/imagereader.aspx?idlisting=527-l-551-17_22335859&imageurl=https%3A%2F%2Fmmsmedia.vht.com%2FMedia%2FPhotography%2FDEGI%2F1631457%2F65dae10d-b80c-4f65-8bb2-20746dbce61e.jpg%3Fdate%3D2023-03-28&option=n&w=480&fallbackimageurl=https%3A%2F%2Fstatic-ind-elliman-production.gtsstatic.net%2Fresources%2Fsiteresources%2Fcommonresources%2Fimages%2Fnophoto%2Fde_website_holder_400x300.jpg"
},
{
    userId: new ObjectId("644e976a0a60e9505cddcf00"),
    propertyName: "Beach House Paradise",
    description: "A beautiful beach house located on a private beach, perfect for a relaxing getaway.<br /><br /><b>Guest access</b><br />Full access to the beach house and private beach.",
    numberOfRooms: "4",
    numberofBathrooms: "3",
    amenities: ["AC", "Wifi", "Private Beach", "BBQ", "Fire Pit"],
    address: "123 Beach House Rd, Paradise",
    latitude: "26.7153",
    longitude: "-80.0534",
    pricePerNight: 400,
    availability: ["2023-06-01", "2023-06-02", "2023-06-03", "2023-06-04", "2023-06-05"],
    reviews: [],
    images: "https://img-de.gtsstatic.net/reno/imagereader.aspx?idlisting=527-l-552-17_21756085&imageurl=https%3A%2F%2Fmmsmedia.vht.com%2FMedia%2FPhotography%2FDEGI%2F1409038%2F3c4d9b2c-4df0-459d-8a35-68ab566dd25d.jpg%3Fdate%3D2023-04-02&option=n&w=480&fallbackimageurl=https%3A%2F%2Fstatic-ind-elliman-production.gtsstatic.net%2Fresources%2Fsiteresources%2Fcommonresources%2Fimages%2Fnophoto%2Fde_website_holder_400x300.jpg"
},
{
    userId: new ObjectId("644e976a0a60e9505cddcf00"),
    propertyName: "Mountain View Cabin",
    description: "Cozy cabin located in the mountains with breathtaking views of the surrounding nature.<br /><br /><b>Guest access</b><br />Full access to the cabin and surrounding property.",
    numberOfRooms: "2",
    numberofBathrooms: "1",
    amenities: ["AC", "Wifi", "Fireplace", "Hiking Trails", "Outdoor Seating"],
    address: "123 Mountain View Rd, Mountaintop",
    latitude: "37.7749",
    longitude: "-122.4194",
    pricePerNight: 150,
    availability: ["2023-06-15", "2023-06-16", "2023-06-17", "2023-06-18", "2023-06-19"],
    reviews: [],
    images: "https://img-de.gtsstatic.net/reno/imagereader.aspx?idlisting=527-l-551-17_21915219&imageurl=https%3A%2F%2Fmmsmedia.vht.com%2FMedia%2FPhotography%2FDEGI%2F1567366%2Feb12c481-f50a-4b30-b64c-0d7aceaddbbe.jpg%3Fdate%3D2023-04-23&option=n&w=480&fallbackimageurl=https%3A%2F%2Fstatic-ind-elliman-production.gtsstatic.net%2Fresources%2Fsiteresources%2Fcommonresources%2Fimages%2Fnophoto%2Fde_website_holder_400x300.jpg"
},
{
    userId: new ObjectId("6458cf8f0c4e0b1d25b789c4"),
    propertyName: "Sunny Apartment in the City Center",
    description: "Bright and cozy apartment located in the heart of the city. Perfect for couples or solo travelers. Close to public transportation, restaurants and shops.",
    numberOfRooms: "1",
    numberofBathrooms: "1",
    amenities: ["Wifi", "Air conditioning", "Heating", "Kitchen"],
    address: "123 Main Street, Anytown, USA",
    latitude: "39.12345",
    longitude: "-76.54321",
    pricePerNight: 80,
    availability: ["2023-05-15", "2023-05-16", "2023-05-17"],
    reviews: [{ rating: 5, feedback: "Great location and value for money.", guestId: new ObjectId('645f738d9f8a1d60ecbf537b') }],
    images: "https://img-de.gtsstatic.net/reno/imagereader.aspx?idlisting=527-l-551-17_21872081&imageurl=https%3A%2F%2Fmmsmedia.vht.com%2FMedia%2FPhotography%2FDEGI%2F1559545%2F793982a2-8a3c-4dba-bb2d-6fa1f09ebeb3.jpg%3Fdate%3D2023-03-16&option=n&w=480&fallbackimageurl=https%3A%2F%2Fstatic-ind-elliman-production.gtsstatic.net%2Fresources%2Fsiteresources%2Fcommonresources%2Fimages%2Fnophoto%2Fde_website_holder_400x300.jpg"
},
{
    userId: new ObjectId("6458cf8f0c4e0b1d25b789c4"),
    propertyName: "Luxury Penthouse with Ocean Views",
    description: "Stunning penthouse with panoramic ocean views. Featuring a private rooftop terrace, jacuzzi, and high-end amenities throughout. Perfect for a romantic getaway or special occasion.",
    numberOfRooms: "3",
    numberofBathrooms: "3",
    amenities: ["Wifi", "Air conditioning", "Heating", "Kitchen", "Hot tub", "Pool"],
    address: "456 Ocean Drive, Beachtown, USA",
    latitude: "38.98765",
    longitude: "-75.43210",
    pricePerNight: 500,
    availability: ["2023-06-01", "2023-06-02", "2023-06-03"],
    reviews: [{ rating: 5, feedback: "Absolutely amazing property. Would definitely stay again.", guestId: new ObjectId('645f738d9f8a1d60ecbf537b') }],
    images: "https://img-de.gtsstatic.net/reno/imagereader.aspx?idlisting=527-l-551-17_22324937&imageurl=https%3A%2F%2Fmmsmedia.vht.com%2FMedia%2FPhotography%2FDEGI%2F1630206%2F96a79e05-984a-459d-a2aa-5fd08ca7427a.jpg%3Fdate%3D2023-05-09&option=n&w=480&fallbackimageurl=https%3A%2F%2Fstatic-ind-elliman-production.gtsstatic.net%2Fresources%2Fsiteresources%2Fcommonresources%2Fimages%2Fnophoto%2Fde_website_holder_400x300.jpg"
},
{
    userId: new ObjectId("6460aa217f42913a12c56eac"),
    propertyName: "Cozy Cabin in the Woods",
    description: "Escape the hustle and bustle of the city and relax in this charming cabin surrounded by nature. Perfect for a weekend getaway or family vacation.",
    numberOfRooms: "2",
    numberofBathrooms: "1",
    amenities: ["Wifi", "Heating", "Kitchen", "Fireplace"],
    address: "789 Forest Road, Woodland, USA",
    latitude: "37.65432",
    longitude: "-74.32109",
    pricePerNight: 120,
    availability: ["2023-05-20", "2023-05-21", "2023-05-22"],
    reviews: [],
    images: "https://img-de.gtsstatic.net/reno/imagereader.aspx?idlisting=527-l-803-17_21812529&imageurl=https%3A%2F%2Fmmsmedia.vht.com%2FMedia%2FPhotography%2FDEGI%2F1511817%2F4baa6fdd-58ac-4bc7-93e6-4dae76aeaaa7.jpg%3Fdate%3D2023-05-08&option=n&w=480&fallbackimageurl=https%3A%2F%2Fstatic-ind-elliman-production.gtsstatic.net%2Fresources%2Fsiteresources%2Fcommonresources%2Fimages%2Fnophoto%2Fde_website_holder_400x300.jpg"
},
{
    userId: new ObjectId("64579e0a678940f44d7c9c3a"),
    propertyName: "Luxury Apartment in Downtown LA",
    description: "Experience luxury living in the heart of Los Angeles in this spacious and stylishly furnished apartment. Enjoy stunning views of the city and access to top-notch amenities.",
    numberOfRooms: "2",
    numberofBathrooms: "2",
    amenities: ["Pool", "Gym", "Concierge", "High-speed internet", "Parking"],
    address: "Downtown Los Angeles, CA",
    latitude: "34.0464",
    longitude: "-118.2486",
    pricePerNight: 200,
    availability: ["2023-05-12", "2023-05-13", "2023-05-14"],
    reviews: [{ rating: 5, feedback: "Absolutely stunning apartment with breathtaking views!", guestId: new ObjectId('6457a1e055733731870a9036') }],
    images: "https://img-de.gtsstatic.net/reno/imagereader.aspx?idlisting=527-l-803-17_21409038&imageurl=https%3A%2F%2Fwww.compass.com%2Fm%2Fp-ohp_7%2Cop_156%2F0%2F42b078d9-7342-44f6-9f5f-f4bb19defcbc%2Forigin.jpg%3Fdate%3D2023-05-09&option=n&w=480&fallbackimageurl=https%3A%2F%2Fstatic-ind-elliman-production.gtsstatic.net%2Fresources%2Fsiteresources%2Fcommonresources%2Fimages%2Fnophoto%2Fde_website_holder_400x300.jpg"
},
{
    userId: new ObjectId("64579e0a678940f44d7c9c3a"),
    propertyName: "Cozy Cottage in the Woods",
    description: "Escape to the tranquility of nature in this charming cottage nestled in the woods. Perfect for a romantic getaway or a quiet retreat from the hustle and bustle of the city.",
    numberOfRooms: "1",
    numberofBathrooms: "1",
    amenities: ["Fireplace", "Jacuzzi", "Hiking trails", "Outdoor seating"],
    address: "Big Sur, CA",
    latitude: "36.2704",
    longitude: "-121.8048",
    pricePerNight: 150,
    availability: ["2023-05-17", "2023-05-18", "2023-05-19"],
    reviews: [{ rating: 4, feedback: "Beautiful and serene location, but the cottage could use some updates.", guestId: new ObjectId('6457a42a9dfbf439b6e32db2') }],
    images: "https://img-de.gtsstatic.net/reno/imagereader.aspx?idlisting=527-l-551-17_22112777&imageurl=https%3A%2F%2Fmmsmedia.vht.com%2FMedia%2FPhotography%2FDEGI%2F1588475%2F8dbb04bb-db84-4a2c-a374-63ddcb016659.jpg%3Fdate%3D2023-04-17&option=n&w=480&fallbackimageurl=https%3A%2F%2Fstatic-ind-elliman-production.gtsstatic.net%2Fresources%2Fsiteresources%2Fcommonresources%2Fimages%2Fnophoto%2Fde_website_holder_400x300.jpg"
},
{
    userId: new ObjectId("644e976a0a60e9505cddcf00"),
    propertyName: "Sunny Beach House",
    description: "Beautiful and spacious house just steps away from the beach. Enjoy your vacation in style with our amenities.",
    numberOfRooms: "3",
    numberOfBathrooms: "2",
    amenities: ["AC", "Wifi", "Beach Access", "BBQ Grill", "Parking"],
    address: "Miami Beach, FL",
    latitude: "25.802223",
    longitude: "-80.135277",
    pricePerNight: 150,
    availability: ["2023-05-20", "2023-05-21", "2023-05-22"],
    reviews: [{ rating: 5, feedback: "Amazing property with great location!", guestId: new ObjectId('64556acf6d9a87cb3f50af67') }],
    images: "https://img-de.gtsstatic.net/reno/imagereader.aspx?idlisting=527-l-551-17_22336800&imageurl=https%3A%2F%2Fmmsmedia.vht.com%2FMedia%2FPhotography%2FDEGI%2F1631508%2F28b639df-dbd7-4614-b03e-103515041cd2.jpg%3Fdate%3D2023-03-09&option=n&w=480&fallbackimageurl=https%3A%2F%2Fstatic-ind-elliman-production.gtsstatic.net%2Fresources%2Fsiteresources%2Fcommonresources%2Fimages%2Fnophoto%2Fde_website_holder_400x300.jpg"
},
{
    userId: new ObjectId("644e976a0a60e9505cddcf00"),
    propertyName: "Mountain Cabin",
    description: "Cozy cabin in the woods with amazing mountain views. Perfect for a peaceful getaway.",
    numberOfRooms: "2",
    numberOfBathrooms: "1",
    amenities: ["Fireplace", "Hiking Trails", "BBQ Grill", "Parking"],
    address: "Asheville, NC",
    latitude: "35.60095",
    longitude: "-82.554016",
    pricePerNight: 100,
    availability: ["2023-06-01", "2023-06-02", "2023-06-03"],
    reviews: [{ rating: 4, feedback: "Great cabin with beautiful views.", guestId: new ObjectId('64556acf6d9a87cb3f50af67') }],
    images: "https://img-de.gtsstatic.net/reno/imagereader.aspx?idlisting=527-l-704-17_22284999&imageurl=https%3A%2F%2Fmmsmedia.vht.com%2FMedia%2FPhotography%2FDEGI%2F1625536%2Ffbd9cea4-f893-44af-a719-3c967bb5d898.jpg%3Fdate%3D2023-04-13&option=n&w=480&fallbackimageurl=https%3A%2F%2Fstatic-ind-elliman-production.gtsstatic.net%2Fresources%2Fsiteresources%2Fcommonresources%2Fimages%2Fnophoto%2Fde_website_holder_400x300.jpg"
},
{
    userId: new ObjectId("644e976a0a60e9505cddcf00"),
    propertyName: "Luxury Penthouse",
    description: "Experience luxury living at its finest in this stunning penthouse with breathtaking city views.",
    numberOfRooms: "4",
    numberOfBathrooms: "3",
    amenities: ["AC", "Wifi", "Swimming Pool", "Gym", "Parking"],
    address: "New York, NY",
    latitude: "40.712776",
    longitude: "-74.005974",
    pricePerNight: 500,
    availability: ["2023-07-01", "2023-07-02", "2023-07-03"],
    reviews: [{ rating: 5, feedback: "Incredible penthouse with amazing views!", guestId: new ObjectId('64556acf6d9a87cb3f50af67') }],
    images: "https://img-de.gtsstatic.net/reno/imagereader.aspx?idlisting=527-l-549-17_22348387&imageurl=https%3A%2F%2Fmmsmedia.vht.com%2FMedia%2FPhotography%2FDEGI%2F1632885%2F1bf737eb-6c7b-4813-96e5-0b1ffb5deb34.jpg%3Fdate%3D2023-03-18&option=n&w=480&fallbackimageurl=https%3A%2F%2Fstatic-ind-elliman-production.gtsstatic.net%2Fresources%2Fsiteresources%2Fcommonresources%2Fimages%2Fnophoto%2Fde_website_holder_400x300.jpg"
},
{
    userId: new ObjectId("64675df60f84c19d7f69711e"),
    propertyName: "Ocean View Luxury Condo",
    description: "Enjoy breathtaking views of the ocean in this luxurious condo. Fully furnished with modern amenities, including a gym and pool. Walking distance to the beach and local attractions.",
    numberOfRooms: "2",
    numberofBathrooms: "2",
    amenities: ["AC", "Wifi", "Gym", "Pool", "Balcony"],
    address: "123 Main Street, Miami, FL",
    latitude: "25.782294058134092",
    longitude: "-80.13268231575372",
    pricePerNight: 200,
    availability: ["2023-05-15", "2023-05-16", "2023-05-17"],
    reviews: [{ rating: 5, feedback: "Amazing views and amenities", guestId: new ObjectId('6478e4f26f45baa91f2d45e8') }, { rating: 4, feedback: "Great stay overall", guestId: new ObjectId('649f21b429458957faa3a3c1') }],
    images: "https://img-de.gtsstatic.net/reno/imagereader.aspx?idlisting=527-l-551-17_22046675&imageurl=https%3A%2F%2Fmmsmedia.vht.com%2FMedia%2FPhotography%2FDEGI%2F1581449%2Fff36a6c0-b633-468a-87b1-053bbd10d320.jpg%3Fdate%3D2023-03-29&option=n&w=480&fallbackimageurl=https%3A%2F%2Fstatic-ind-elliman-production.gtsstatic.net%2Fresources%2Fsiteresources%2Fcommonresources%2Fimages%2Fnophoto%2Fde_website_holder_400x300.jpg"
},
{
    userId: new ObjectId("64675df60f84c19d7f69711e"),
    propertyName: "Charming Country Cottage",
    description: "Escape to the countryside in this charming cottage. Surrounded by beautiful gardens and a peaceful pond. Fully equipped kitchen and cozy living spaces. Perfect for a relaxing retreat.",
    numberOfRooms: "3",
    numberofBathrooms: "2",
    amenities: ["Fireplace", "Wifi", "Garden", "Pond", "BBQ Grill"],
    address: "456 Oak Street, Sonoma, CA",
    latitude: "38.32632056830572",
    longitude: "-122.66471904556763",
    pricePerNight: 150,
    availability: ["2023-05-12", "2023-05-13", "2023-05-14"],
    reviews: [{ rating: 5, feedback: "Beautiful and peaceful setting", guestId: new ObjectId('64b031bfcc17a38ec68a26c7') }, { rating: 4, feedback: "Cozy and comfortable", guestId: new ObjectId('64c3b38b20d140c198fb24c9') }],
    images: "https://img-de.gtsstatic.net/reno/imagereader.aspx?idlisting=527-l-551-17_22258967&imageurl=https%3A%2F%2Fmmsmedia.vht.com%2FMedia%2FPhotography%2FDEGI%2F1624691%2F9617b5f1-c73f-4e4e-8fd9-4de36c16f46f.jpg%3Fdate%3D2023-05-08&option=n&w=480&fallbackimageurl=https%3A%2F%2Fstatic-ind-elliman-production.gtsstatic.net%2Fresources%2Fsiteresources%2Fcommonresources%2Fimages%2Fnophoto%2Fde_website_holder_400x300.jpg"
}
]

const seedDB = async() => {
   let bookingCollection = await booking();
   let propertyCollection = await property();
   await bookingCollection.deleteMany({});
   await bookingCollection.insertMany(seedBookings);
   await propertyCollection.deleteMany({});
   await propertyCollection.insertMany(seedProperties);
}

seedDB().then(()=>{
console.log("inside seed done");
closeConnection();
})