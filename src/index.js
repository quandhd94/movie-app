import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot từ react-dom/client
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const container = document.getElementById("root"); // Tìm phần tử gốc (root)
const root = createRoot(container); // Tạo root bằng createRoot

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Nếu bạn muốn ứng dụng của mình hoạt động offline và tải nhanh hơn,
// hãy thay đổi unregister() thành register() dưới đây. Lưu ý điều này có một số hạn chế.
// Tìm hiểu thêm về service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
