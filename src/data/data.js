import { iconsImgs } from "./images";
import { personsImgs } from "./images";
export const navigationLinks = [
  { id: 1, to: "/", title: "Home", image: iconsImgs.home },
  { id: 2, to: "/categories", title: "Category", image: iconsImgs.category },
  { id: 3, to: "/products", title: "Product", image: iconsImgs.product },
  { id: 4, to: "/orders", title: "Order", image: iconsImgs.order },
  { id: 5, to: "/accounts", title: "Account", image: iconsImgs.user },
  { id: 6, to: "/payments", title: "Payment", image: iconsImgs.wallet },
  { id: 8, to: "/statistics", title: "Statistic", image: iconsImgs.report },
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
// src/data/mockData.js

// src/data/mockData.js
export const mockOrderData = {
  totalOrders: 100, // Tổng số đơn hàng
  successfulOrders: 80, // Số lượng đơn hàng thành công
  canceledOrders: 20, // Số lượng đơn hàng bị hủy
};
export const mockRevenueData = {
  total: 10000000, // Tổng doanh thu
  revenueByTime: [
      { _id: '2023-01-01', total: 1000000 },
      { _id: '2023-01-02', total: 1200000 },
      { _id: '2023-01-03', total: 800000 },
      { _id: '2023-01-04', total: 1500000 },
      { _id: '2023-01-05', total: 900000 },
  ],
  revenueByCategory: [
      { _id: 'Danh mục A', total: 4000000 },
      { _id: 'Danh mục B', total: 3000000 },
      { _id: 'Danh mục C', total: 2000000 },
      { _id: 'Danh mục D', total: 1000000 },
  ],
  revenueByPaymentMethod: [
      { _id: 'Thẻ tín dụng', total: 5000000 },
      { _id: 'Ví điện tử', total: 3000000 },
      { _id: 'Tiền mặt', total: 2000000 },
  ],
};
