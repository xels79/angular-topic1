import ITour from "src/app/models/ITour";

export type OrderType = ITour & {userId?: number};

export type OrderPropType = keyof OrderType;

export const ORDERMOCKS: OrderType[] = [
  {
      "id": "1",
      "name": "Mexico",
      "description": "From the south to the center of the country",
      "tourOperator": "LocalAdventures",
      "price": "€2,192",
      "img": "ocean.jpg",
      "type": "multi",
      userId:1
  },
  {
      "id": "1-1",
      "name": "Italia, Ocean Cruise",
      "description": "Discover Pearls of France & Italy",
      "tourOperator": "Emerald Waterways",
      "price": "€3,579",
      "img": "pic1.jpg",
      "type": "multi",
      "date": "2022-10-22"
  },
  {
      "id": "2",
      "name": "Pharaohs Nile Cruise Adventure",
      "description": "Start and end in Cairo! With the In-depth Cultural tour Pharaohs Nile Cruise Adventure - 5 Star, you have a 8 days tour package taking you through Cairo, Egypt and 8 other destinations in Egypt. Pharaohs Nile Cruise Adventure - 5 Star includes accommodation in a hotel as well as an expert guide, meals, transport and more.",
      "tourOperator": "LocalAdventures",
      "price": "€1,100",
      "img": "pic2.jpg",
      "date": "2022-10-22"
  },
  {
      "id": "2-4",
      "name": "Philippines One Life Adventures - 10 Days",
      "description": "Fantastic tour with a variety of activities and enough chill time. Excellent tour.",
      "tourOperator": "Emerald Waterways",
      "price": "€825",
      "img": "pic3.jpg"
  },
  {
      "id": "3",
      "name": "Kilimanjaro climbing machame route 7 days",
      "description": "Start in Machame Camp and end in Mweka Gate! With the Hiking & Trekking tour Kilimanjaro climbing machame route 7 days, you have a 7 days tour package taking you through Machame Camp, Tanzania and 5 other destinations in Tanzania. Kilimanjaro climbing machame route 7 days includes accommodation, an expert guide, meals, transport and more.",
      "tourOperator": "Bali Bucket List Tours",
      "price": "€761",
      "img": "pic4.jpg",
      "type": "multi",
      userId:1
  },
  {
      "id": "4",
      "name": "3 Day Southwest USA National Parks Tour from Las Vegas",
      "description": "Las Vegas, Zion National Park, Bryce Canyon National Park, Antelope Canyon",
      "tourOperator": "BH Lanka Tours",
      "price": "€1200",
      "img": "pic5.jpg"
  },
  {
      "id": "5",
      "name": "Bali Bucket List Original 10 Day Tour",
      "description": "Canggu, Ubud, Gili Islands, Nusa Lembongan, Nusa Penida, Seminyak",
      "tourOperator": "LocalAdventures",
      "price": "€950",
      "img": "pic6.jpg"
  },
  {
      "id": "6",
      "name": "National Parks Tour 3 Days Small Group Tour from Las Vegas",
      "description": "Las Vegas, Zion National Park, Bryce Canyon National Park, Antelope Canyon",
      "tourOperator": "Emerald Waterways",
      "price": "€1200",
      "img": "pic7.jpg",
      "type": "single"
  },
  {
      "id": "7",
      "name": "Grand Tour Of Sri Lanka",
      "description": "Negombo, Anuradhapura, Dambulla, Sigiriya, Polonnaruwa, Mahiyanganaya, Kandy",
      "tourOperator": "LocalAdventures",
      "price": "€680",
      "img": "pic8.jpg"
  },
  {
      "id": "8",
      "name": "Southern Treasures - 8 Days",
      "description": "Cusco, Sacred Valley, Ollantaytambo, Aguas Calientes, Machu Picchu, Pisac, Puno",
      "tourOperator": "Emerald Waterways",
      "price": "€1,279",
      "img": "pic9.jpg"
  },
  {
      "id": "9",
      "name": "Japan One Life Adventures - 10 Days",
      "description": "Tokyo, Hakone, Takayama, Kyoto, Osaka",
      "tourOperator": "LocalAdventures",
      "price": "€1,192",
      "img": "pic1.jpg"
  },
  {
      "id": "10",
      "name": "Mexico",
      "description": "From the south to the center of the country",
      "tourOperator": "LocalAdventures",
      "price": "€2,192",
      "img": "ocean.jpg"
  },
  {
      "id": "11",
      "name": "Italia, Ocean Cruise",
      "description": "Discover Pearls of France & Italy",
      "tourOperator": "Emerald Waterways",
      "price": "€3,579",
      "img": "pic1.jpg",
      "type": "single"
  },
  {
      "id": "12",
      "name": "Pharaohs Nile Cruise Adventure",
      "description": "Start and end in Cairo! With the In-depth Cultural tour Pharaohs Nile Cruise Adventure - 5 Star, you have a 8 days tour package taking you through Cairo, Egypt and 8 other destinations in Egypt. Pharaohs Nile Cruise Adventure - 5 Star includes accommodation in a hotel as well as an expert guide, meals, transport and more.",
      "tourOperator": "LocalAdventures",
      "price": "€1,100",
      "img": "pic2.jpg"
  },
  {
      "id": "13",
      "name": "Philippines One Life Adventures - 10 Days",
      "description": "Fantastic tour with a variety of activities and enough chill time. Excellent tour.",
      "tourOperator": "Emerald Waterways",
      "price": "€825",
      "img": "pic3.jpg"
  },
  {
      "id": "14",
      "name": "Kilimanjaro climbing machame route 7 days",
      "description": "Start in Machame Camp and end in Mweka Gate! With the Hiking & Trekking tour Kilimanjaro climbing machame route 7 days, you have a 7 days tour package taking you through Machame Camp, Tanzania and 5 other destinations in Tanzania. Kilimanjaro climbing machame route 7 days includes accommodation, an expert guide, meals, transport and more.",
      "tourOperator": "Bali Bucket List Tours",
      "price": "€761",
      "img": "pic4.jpg"
  },
  {
      "id": "15",
      "name": "3 Day Southwest USA National Parks Tour from Las Vegas",
      "description": "Las Vegas, Zion National Park, Bryce Canyon National Park, Antelope Canyon",
      "tourOperator": "BH Lanka Tours",
      "price": "€1200",
      "img": "pic5.jpg"
  },
  {
      "id": "16",
      "name": "Bali Bucket List Original 10 Day Tour",
      "description": "Canggu, Ubud, Gili Islands, Nusa Lembongan, Nusa Penida, Seminyak",
      "tourOperator": "LocalAdventures",
      "price": "€950",
      "img": "pic6.jpg"
  },
  {
      "id": "17",
      "name": "National Parks Tour 3 Days Small Group Tour from Las Vegas",
      "description": "Las Vegas, Zion National Park, Bryce Canyon National Park, Antelope Canyon",
      "tourOperator": "Emerald Waterways",
      "price": "€1200",
      "img": "pic7.jpg"
  },
  {
      "id": "18",
      "name": "Grand Tour Of Sri Lanka",
      "description": "Negombo, Anuradhapura, Dambulla, Sigiriya, Polonnaruwa, Mahiyanganaya, Kandy",
      "tourOperator": "LocalAdventures",
      "price": "€680",
      "img": "pic8.jpg"
  },
  {
      "id": "19",
      "name": "Southern Treasures - 8 Days",
      "description": "Cusco, Sacred Valley, Ollantaytambo, Aguas Calientes, Machu Picchu, Pisac, Puno",
      "tourOperator": "Emerald Waterways",
      "price": "€1,279",
      "img": "pic9.jpg"
  },
  {
      "id": "20",
      "name": "Japan One Life Adventures - 10 Days",
      "description": "Tokyo, Hakone, Takayama, Kyoto, Osaka",
      "tourOperator": "LocalAdventures",
      "price": "€1,192",
      "img": "pic1.jpg"
  },
  {
      "id": "21",
      "name": "Mexico",
      "description": "From the south to the center of the country",
      "tourOperator": "LocalAdventures",
      "price": "€2,192",
      "img": "ocean.jpg"
  },
  {
      "id": "22",
      "name": "Italia, Ocean Cruise",
      "description": "Discover Pearls of France & Italy",
      "tourOperator": "Emerald Waterways",
      "price": "€3,579",
      "img": "pic1.jpg"
  },
  {
      "id": "23",
      "name": "Pharaohs Nile Cruise Adventure",
      "description": "Start and end in Cairo! With the In-depth Cultural tour Pharaohs Nile Cruise Adventure - 5 Star, you have a 8 days tour package taking you through Cairo, Egypt and 8 other destinations in Egypt. Pharaohs Nile Cruise Adventure - 5 Star includes accommodation in a hotel as well as an expert guide, meals, transport and more.",
      "tourOperator": "LocalAdventures",
      "price": "€1,100",
      "img": "pic2.jpg"
  },
  {
      "id": "24",
      "name": "Philippines One Life Adventures - 10 Days",
      "description": "Fantastic tour with a variety of activities and enough chill time. Excellent tour.",
      "tourOperator": "Emerald Waterways",
      "price": "€825",
      "img": "pic3.jpg"
  },
  {
      "id": "25",
      "name": "Kilimanjaro climbing machame route 7 days",
      "description": "Start in Machame Camp and end in Mweka Gate! With the Hiking & Trekking tour Kilimanjaro climbing machame route 7 days, you have a 7 days tour package taking you through Machame Camp, Tanzania and 5 other destinations in Tanzania. Kilimanjaro climbing machame route 7 days includes accommodation, an expert guide, meals, transport and more.",
      "tourOperator": "Bali Bucket List Tours",
      "price": "€761",
      "img": "pic4.jpg"
  },
  {
      "id": "26",
      "name": "3 Day Southwest USA National Parks Tour from Las Vegas",
      "description": "Las Vegas, Zion National Park, Bryce Canyon National Park, Antelope Canyon",
      "tourOperator": "BH Lanka Tours",
      "price": "€1200",
      "img": "pic5.jpg"
  },
  {
      "id": "27",
      "name": "Bali Bucket List Original 10 Day Tour",
      "description": "Canggu, Ubud, Gili Islands, Nusa Lembongan, Nusa Penida, Seminyak",
      "tourOperator": "LocalAdventures",
      "price": "€950",
      "img": "pic6.jpg"
  },
  {
      "id": "28",
      "name": "National Parks Tour 3 Days Small Group Tour from Las Vegas",
      "description": "Las Vegas, Zion National Park, Bryce Canyon National Park, Antelope Canyon",
      "tourOperator": "Emerald Waterways",
      "price": "€1200",
      "img": "pic7.jpg"
  },
  {
      "id": "29",
      "name": "Grand Tour Of Sri Lanka",
      "description": "Negombo, Anuradhapura, Dambulla, Sigiriya, Polonnaruwa, Mahiyanganaya, Kandy",
      "tourOperator": "LocalAdventures",
      "price": "€680",
      "img": "pic8.jpg"
  },
  {
      "id": "30",
      "name": "Southern Treasures - 8 Days",
      "description": "Cusco, Sacred Valley, Ollantaytambo, Aguas Calientes, Machu Picchu, Pisac, Puno",
      "tourOperator": "Emerald Waterways",
      "price": "€1,279",
      "img": "pic9.jpg"
  },
  {
      "id": "31",
      "name": "Japan One Life Adventures - 10 Days",
      "description": "Tokyo, Hakone, Takayama, Kyoto, Osaka",
      "tourOperator": "LocalAdventures",
      "price": "€1,192",
      "img": "pic1.jpg"
  },
  {
      "createdAt": "2022-11-09T06:25:38.670Z",
      "name": "Mexico",
      "avatar": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/859.jpg",
      "id": "32",
      "firstName": "sdf",
      "lastName": "sdf",
      "cardNumber": "",
      "birthDate": "2022-11-21T21:00:00.000Z",
      "age": 34,
      "citizenship": "sis",
      "description": "From the south to the center of the country",
      "tourOperator": "LocalAdventures",
      "price": "€2,192",
      "img": "ocean.jpg",
      "type": "multi"
  },
  {
      "createdAt": "2022-11-11T03:07:21.306Z",
      "name": "Mexico",
      "avatar": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/735.jpg",
      "id": "33",
      "firstName": "ewfwf",
      "lastName": "dswfrwef",
      "cardNumber": "",
      "birthDate": null,
      "age": null,
      "citizenship": null,
      "description": "From the south to the center of the country",
      "tourOperator": "LocalAdventures",
      "price": "€2,192",
      "img": "ocean.jpg",
      "type": "multi"
  },
  {
      "createdAt": "2022-11-11T15:30:46.910Z",
      "name": "Mexico",
      "avatar": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/162.jpg",
      "id": "34",
      "firstName": "ewfwf",
      "lastName": "dswfrwef",
      "cardNumber": "",
      "birthDate": null,
      "age": null,
      "citizenship": null,
      "description": "From the south to the center of the country",
      "tourOperator": "LocalAdventures",
      "price": "€2,192",
      "img": "ocean.jpg",
      "type": "multi"
  }
];
