const data = [
  {
    id: 1,
    brand: `BMW`,
    model: `5 series`,
    minPrice: 75000,
    images: [
      `./img/car-bmw.jpg`,
      `./img/car-bmw-2.jpg`,
      `./img/car-bmw-3.jpg`
    ],
    mileage: {
      month: 4000,
      halfYear: 25000,
      year: 60000
    },
    characteristics: {
      type: `sedan`,
      engine: `diesel`,
      power: 250
    },
    class: `economy`
  },
  {
    id: 2,
    brand: `Lada`,
    model: `X`,
    minPrice: 10000,
    images: [
      `./img/car-bmw.jpg`
    ],
    mileage: {
      month: 4000,
      halfYear: 25000,
      year: 60000
    },
    characteristics: {
      type: `estate`,
      engine: `gas`,
      power: 160
    },
    class: `economy`
  },
  {
    id: 3,
    brand: `Nissan`,
    model: `X`,
    minPrice: 96000,
    images: [
      `./img/car-prius.jpeg`
    ],
    mileage: {
      month: 7000,
      halfYear: 12000,
      year: 68000
    },
    characteristics: {
      type: `suv`,
      engine: `diesel`,
      power: 120
    },
    class: `economy`
  },
  {
    id: 4,
    brand: `Audi`,
    model: `A5`,
    minPrice: 480980,
    images: [
      `./img/car-audi.jpg`,
      `./img/car-audi-2.jpg`,
      `./img/car-audi-3.jpg`,
      `./img/car-audi-4.jpg`
    ],
    mileage: {
      month: 900,
      halfYear: 256000,
      year: 600860
    },
    characteristics: {
      engine: `electric`,
      power: 300
    },
    class: `comfort`
  },
  {
    id: 5,
    brand: `KIA`,
    model: `Rio`,
    minPrice: 50000,
    images: [
      `./img/car-prius-2.jpg`
    ],
    mileage: {
      month: 3208,
      halfYear: 21000,
      year: 50000
    },
    characteristics: {
      type: `coupe`,
      engine: `gas`,
      power: 230
    },
    class: `business`
  },
  {
    id: 6,
    brand: `Toyota`,
    model: `Corolla`,
    minPrice: 90000,
    images: [
      `./img/car-prius.jpeg`
    ],
    mileage: {
      month: 4000,
      halfYear: 10000,
      year: 25000
    },
    characteristics: {
      type: `cabriolet`,
      engine: `gas`,
      power: 120
    },
    class: `luxe`
  }
];

window.data = data;
