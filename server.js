import { WebSocketServer } from "ws";

const server = new WebSocketServer({ port: 5000 });

const vehicle = {
  car_title: "Used 2023 Kia Rio",
  vin: "WBS4Y9C54JAC87727",
  stock_number: "647940",
  image_url: "https://shorturl.at/qrGN7",
  price: "$23,235",
  details: {
    features: {
      body_type: "Hatchback",
      mileage: "47193",
      exterior_color: "Deep Blue Pearl",
      interior_color: "Charcoal",
      transmission: "Automatic or manual",
      fuel_type: "Petrol or petrol hybrid"
    },
    cta: {
      button_title: "SEE THIS CAR IN PERSON",
      form_type: "AppointmentForm",
      form: {
        first_name: "ketevan",
        last_name: null,
        email: null,
        phone_number: null,
        date: null,
        time: null
      }
    },
    vdp: "https://www.kia.com/us/en/rio"
  }
}

const mock_response = {
  initiator: "BOT",
  message: {
    text: "Here’s the option matching your request. If you're interested in more information, click “Explore More”.",
    quick_replies: null,
    cta: null,
    carousel: [],
    images: null
  },
  timestamp: 1594819650
}

server.on("connection", socket => {
  console.log("connected")
  socket.on("message", data => {
    const msg = JSON.parse(data)
    console.log("message received:", msg)
    const type = msg.payload

    setTimeout(() => {
      let response = JSON.parse(JSON.stringify(mock_response))
      if (type === 'card') {
        response.message.carousel.push(vehicle)
      } else if (type === 'carousel') {
        response.message.carousel.push(vehicle)
        response.message.carousel.push(vehicle)
        response.message.carousel.push(vehicle)
        response.message.carousel.push(vehicle)
      } else {
        response.message.carousel = null
        response.message.text = 'I\'m not an AI model, so I don\'t understand what you send 🙂'
      }

      socket.send(JSON.stringify(response));
      console.log("message sent:", response)
    }, 2000)
  })
});
