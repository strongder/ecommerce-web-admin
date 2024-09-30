import { iconsImgs } from "../utils/images";
import { personsImgs } from "../utils/images";
export const navigationLinks = [
  { id: 1, to: "/", title: "Home", image: iconsImgs.home },
  { id: 2, to: "/categories", title: "Category", image: iconsImgs.category },
  { id: 3, to: "/products", title: "Product", image: iconsImgs.product },
  { id: 4, to: "/orders", title: "Order", image: iconsImgs.order },
  { id: 5, to: "/accounts", title: "Account", image: iconsImgs.user },
  { id: 6, to: "/payments", title: "Payment", image: iconsImgs.wallet },
  { id: 8, to: "/reports", title: "Reports", image: iconsImgs.report },
  { id: 10, to: "/products", title: "Settings", image: iconsImgs.gears },
];

export const categories = [
  { id: 1, name: "Áo" },
  { id: 2, name: "Mũ" },
];

export const transactions = [
  {
    id: 11,
    name: "Sarah Parker",
    image: personsImgs.person_four,
    date: "23/12/04",
    amount: 22000,
  },
  {
    id: 12,
    name: "Krisitine Carter",
    image: personsImgs.person_three,
    date: "23/07/21",
    amount: 20000,
  },
  {
    id: 13,
    name: "Irene Doe",
    image: personsImgs.person_two,
    date: "23/08/25",
    amount: 30000,
  },
];

export const reportData = [
  {
    id: 14,
    month: "Jan",
    value1: 45,
    value2: null,
  },
  {
    id: 15,
    month: "Feb",
    value1: 45,
    value2: 60,
  },
  {
    id: 16,
    month: "Mar",
    value1: 45,
    value2: null,
  },
  {
    id: 17,
    month: "Apr",
    value1: 45,
    value2: null,
  },
  {
    id: 18,
    month: "May",
    value1: 45,
    value2: null,
  },
];

export const budget = [
  {
    id: 19,
    title: "Subscriptions",
    type: "Automated",
    amount: 22000,
  },
  {
    id: 20,
    title: "Loan Payment",
    type: "Automated",
    amount: 16000,
  },
  {
    id: 21,
    title: "Foodstuff",
    type: "Automated",
    amount: 20000,
  },
  {
    id: 22,
    title: "Subscriptions",
    type: null,
    amount: 10000,
  },
  {
    id: 23,
    title: "Subscriptions",
    type: null,
    amount: 40000,
  },
];

export const subscriptions = [
  {
    id: 24,
    title: "LinkedIn",
    due_date: "23/12/04",
    amount: 20000,
  },
  {
    id: 25,
    title: "Netflix",
    due_date: "23/12/10",
    amount: 5000,
  },
  {
    id: 26,
    title: "DSTV",
    due_date: "23/12/22",
    amount: 2000,
  },
];

export const savings = [
  {
    id: 27,
    image: personsImgs.person_one,
    saving_amount: 250000,
    title: "Pay kid bro’s fees",
    date_taken: "23/12/22",
    amount_left: 40000,
  },
];

export const productData = {
  code: 1000,
  message: "Create product success",
  result: {
    id: 3,
    name: "T-Shirt 02",
    stock: "250",
    rating: 0.0,
    imageUrls: [
      { imageUrl: "http://example.com/images/tshirt4.jpg" },
      { imageUrl: "http://example.com/images/tshirt6.jpg" },
    ],
    description: "A comfortable cotton T-shirt",
    price: 100000.0,
    varProducts: [
      { id: 5, attribute: { size: "M", color: "blue" }, stock: 100 },
      { id: 6, attribute: { size: "L", color: "blue" }, stock: 150 },
    ],
    createdAt: "2024-08-27T18:06:07.4142629",
    delete: false,
  },
};

export const accountData = [
  {
    id: 1,
    username: "admin",
    password: "$2a$10$.SOCH/UmXfOIsQ.P.XGyIOJElsTRB.eaz1AMe.i1Sp7Ov3n21MJ9S",
    avatar: null,
    fullName: null,
    email: "admin",
    phone: null,
    roles: [
      {
        name: "ADMIN",
      },
    ],
  },
  {
    id: 1,
    username: "admin",
    password: "$2a$10$.SOCH/UmXfOIsQ.P.XGyIOJElsTRB.eaz1AMe.i1Sp7Ov3n21MJ9S",
    avatar: null,
    fullName: null,
    email: "admin",
    phone: null,
    roles: [
      {
        name: "ADMIN",
      },
    ],
  },
  {
    id: 1,
    username: "admin",
    password: "$2a$10$.SOCH/UmXfOIsQ.P.XGyIOJElsTRB.eaz1AMe.i1Sp7Ov3n21MJ9S",
    avatar: null,
    fullName: null,
    email: "admin",
    phone: null,
    roles: [
      {
        name: "ADMIN",
      },
    ],
  },
  {
    id: 1,
    username: "admin",
    password: "$2a$10$.SOCH/UmXfOIsQ.P.XGyIOJElsTRB.eaz1AMe.i1Sp7Ov3n21MJ9S",
    avatar: null,
    fullName: null,
    email: "admin",
    phone: null,
    roles: [
      {
        name: "ADMIN",
      },
    ],
  },
  {
    id: 1,
    username: "admin",
    password: "$2a$10$.SOCH/UmXfOIsQ.P.XGyIOJElsTRB.eaz1AMe.i1Sp7Ov3n21MJ9S",
    avatar: null,
    fullName: null,
    email: "admin",
    phone: null,
    roles: [
      {
        name: "ADMIN",
      },
    ],
  },
  {
    id: 1,
    username: "admin",
    password: "$2a$10$.SOCH/UmXfOIsQ.P.XGyIOJElsTRB.eaz1AMe.i1Sp7Ov3n21MJ9S",
    avatar: null,
    fullName: null,
    email: "admin",
    phone: null,
    roles: [
      {
        name: "ADMIN",
      },
    ],
  },
  {
    id: 1,
    username: "admin",
    password: "$2a$10$.SOCH/UmXfOIsQ.P.XGyIOJElsTRB.eaz1AMe.i1Sp7Ov3n21MJ9S",
    avatar: null,
    fullName: null,
    email: "admin",
    phone: null,
    roles: [
      {
        name: "ADMIN",
      },
    ],
  },
];

export const orders = [
  {
    recipientName: "nguyen van a",
    phone: "01234567",
    paymentMethod: "VNPAY",
    status: "PENDING PAYMENT",
    total: 200040.0,
    createdAt: "2024-08-29T16:43:33.967125",
    address: {
      id: 1,
      city: "ha noi",
      district: "thanh tri",
      ward: "tan trieu",
      addressDetail: "44B, 83 tan trieu",
    },
    orderItems: [
      {
        id: 6,
        quantity: 2,
        price: 100000.0,
        name: "T-Shirt 02",
        image:
          "https://blog.totoday.vn/wp-content/uploads/2022/10/7-cach-phoi-do-voi-ao-thun-form-rong-nam-chat-phat-ngat-4.jpg",
        varProduct: {
          id: 3,
          attribute: {
            size: "M",
            color: "blue",
          },
          stock: 92,
        },
      },
      {
        id: 7,
        quantity: 2,
        price: 20.0,
        name: "T-Shirt 01",
        image:
          "https://blog.totoday.vn/wp-content/uploads/2022/10/7-cach-phoi-do-voi-ao-thun-form-rong-nam-chat-phat-ngat-4.jpg",
        varProduct: {
          id: 1,
          attribute: {
            size: "M",
            color: "blue",
          },
          stock: 96,
        },
      },
    ],
  },
];

export const payments = [
  {
    transactionId: "50679024",
    orderId: null,
    amount: 13000.0,
    paymentMethod: "VNPay",
    status: "pending",
    paymentTime: "2024-08-26T01:31:24.788089",
  },
  {
    transactionId: "38647699",
    orderId: 2,
    amount: 40.0,
    paymentMethod: "VNPAY",
    status: "PENDING",
    paymentTime: "2024-08-26T10:42:54.38398",
  },
  {
    transactionId: "02068379",
    orderId: 3,
    amount: 200000.0,
    paymentMethod: "VNPAY",
    status: "success",
    paymentTime: "2024-08-26T10:47:46.239562",
  },
  {
    transactionId: "88432414",
    orderId: 4,
    amount: 200000.0,
    paymentMethod: "VNPAY",
    status: "success",
    paymentTime: "2024-08-26T10:53:10.418115",
  },
];

export const shippingAddresses = [
  {
    id: 1,
    city: "ha noi",
    district: "thanh tri",
    ward: "tan trieu",
    addressDetail: "44B, 83 tan trieu",
  },
  {
    id: 2,
    city: "thanh hoa",
    district: "thanh tri",
    ward: "tan trieu",
    addressDetail: "44B, 83 tan trieu",
  },
  {
    id: 2,
    city: "thanh hoa",
    district: "thanh tri",
    ward: "tan trieu",
    addressDetail: "44B, 83 tan trieu",
  },
  {
    id: 2,
    city: "thanh hoa",
    district: "thanh tri",
    ward: "tan trieu",
    addressDetail: "44B, 83 tan trieu",
  },
  {
    id: 2,
    city: "thanh hoa",
    district: "thanh tri",
    ward: "tan trieu",
    addressDetail: "44B, 83 tan trieu",
  },
  {
    id: 1,
    city: "ha noi",
    district: "thanh tri",
    ward: "tan trieu",
    addressDetail: "44B, 83 tan trieu",
  },
  {
    id: 2,
    city: "thanh hoa",
    district: "thanh tri",
    ward: "tan trieu",
    addressDetail: "44B, 83 tan trieu",
  },
  {
    id: 3,
    city: "thanh hoa",
    district: "thanh tri",
    ward: "tan trieu",
    addressDetail: "44B, 83 tan trieu",
  },
  {
    id: 4,
    city: "thanh hoa",
    district: "thanh tri",
    ward: "tan trieu",
    addressDetail: "44B, 83 tan trieu",
  },
  {
    id: 5,
    city: "thanh hoa",
    district: "thanh tri",
    ward: "tan trieu",
    addressDetail: "44B, 83 tan trieu",
  },
];
