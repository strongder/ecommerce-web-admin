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
  total: 125000000, // Tổng doanh thu

  // Doanh thu theo thời gian (theo tháng trong năm 2023)
  revenueByTime: [
    { _id: "Jan", total: 10000000 },
    { _id: "Feb", total: 12000000 },
    { _id: "Mar", total: 15000000 },
    { _id: "Apr", total: 8000000 },
    { _id: "May", total: 14000000 },
    { _id: "Jun", total: 11000000 },
    { _id: "Jul", total: 13000000 },
    { _id: "Aug", total: 12500000 },
    { _id: "Sep", total: 13500000 },
    { _id: "Oct", total: 14500000 },
    { _id: "Nov", total: 15500000 },
    { _id: "Dec", total: 16000000 },
  ],

  // Doanh thu theo danh mục sản phẩm
  revenueByCategory: [
    { _id: "Electronics", total: 40000000 },
    { _id: "Fashion", total: 35000000 },
    { _id: "Home & Kitchen", total: 25000000 },
    { _id: "Beauty & Health", total: 15000000 },
    { _id: "Sports", total: 10000000 },
  ],

  // Doanh thu theo phương thức thanh toán
  revenueByPaymentMethod: [
    { _id: "Credit Card", total: 50000000 },
    { _id: "Bank Transfer", total: 30000000 },
    { _id: "Cash on Delivery", total: 20000000 },
    { _id: "E-Wallet", total: 25000000 },
  ],
};
