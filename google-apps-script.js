/**
 * GOOGLE APPS SCRIPT - Web App để nhận đơn hàng từ Next.js
 *
 * HƯỚNG DẪN TRIỂN KHAI:
 * ─────────────────────────────────────────────────────────
 * 1. Mở Google Sheet của bạn
 * 2. Vào menu: Extensions (Tiện ích mở rộng) → Apps Script
 * 3. Xóa code mặc định và dán toàn bộ code dưới đây vào
 * 4. Nhấn Save (Ctrl+S)
 * 5. Nhấn "Deploy" → "New deployment"
 * 6. Chọn Type: "Web app"
 * 7. Điền mô tả (ví dụ: "Order receiver v1")
 * 8. Execute as: "Me (your email)"
 * 9. Who has access: "Anyone" (BẮT BUỘC để Next.js gọi được)
 * 10. Nhấn "Deploy"
 * 11. Copy đường link dạng:
 *     https://script.google.com/macros/s/AKfycb.../exec
 *     → Paste vào file .env.local của Next.js:
 *       NEXT_PUBLIC_GAS_URL=https://script.google.com/macros/s/.../exec
 *
 * LƯU Ý: Mỗi lần sửa code Apps Script, bạn PHẢI tạo "New deployment"
 * mới (không phải "Manage deployments") thì thay đổi mới có hiệu lực.
 * ─────────────────────────────────────────────────────────
 */

// Tên sheet trong Google Spreadsheet (mặc định là "Sheet1")
var SHEET_NAME = "Đơn hàng";

/**
 * Xử lý request GET (dùng để test xem Web App đã hoạt động chưa)
 */
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ result: "success", message: "Google Apps Script is running!" })
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Xử lý request POST từ Next.js
 * Nhận dữ liệu JSON và ghi vào Google Sheet
 */
function doPost(e) {
  try {
    // Parse JSON data từ request body
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);

    // Lấy Google Spreadsheet hiện tại
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Lấy sheet theo tên, nếu chưa có thì tạo mới
    var sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      // Tạo tiêu đề cột nếu sheet mới
      sheet.appendRow([
        "STT",
        "Thời gian",
        "Họ tên",
        "Số điện thoại",
        "Địa chỉ",
        "Ghi chú",
        "Chi tiết giỏ hàng",
        "Tổng tiền"
      ]);
    }

    // Kiểm tra xem đã có header chưa (nếu sheet rỗng thì thêm header)
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "STT",
        "Thời gian",
        "Họ tên",
        "Số điện thoại",
        "Địa chỉ",
        "Ghi chú",
        "Chi tiết giỏ hàng",
        "Tổng tiền"
      ]);
    }

    // Tính STT (số thứ tự) = tổng số hàng hiện tại (trừ header)
    var lastRow = sheet.getLastRow();
    var stt = lastRow; // Hàng 1 là header, hàng 2 trở đi là đơn hàng

    // Định dạng thời gian theo múi giờ Việt Nam (UTC+7)
    var now = new Date();
    var vnTime = new Date(now.getTime() + (7 * 60 * 60 * 1000));
    var timeStr = Utilities.formatDate(
      vnTime,
      "UTC",
      "dd/MM/yyyy HH:mm:ss"
    );

    // Định dạng chi tiết giỏ hàng thành chuỗi text
    var cartItems = data.cartItems || [];
    var cartDetails = cartItems
      .map(function(item) {
        return item.name + " x" + item.quantity + " = " + formatCurrency(item.price * item.quantity);
      })
      .join("\n");

    // Thêm hàng mới vào sheet
    sheet.appendRow([
      stt,                                    // STT
      timeStr,                                // Thời gian
      data.fullName || "",                    // Họ tên
      data.phone || "",                       // Số điện thoại
      data.address || "",                     // Địa chỉ
      data.note || "",                        // Ghi chú
      cartDetails,                            // Chi tiết giỏ hàng
      data.totalAmount || 0                   // Tổng tiền
    ]);

    // Trả về phản hồi thành công
    return ContentService.createTextOutput(
      JSON.stringify({
        result: "success",
        message: "Đơn hàng đã được lưu thành công!",
        orderId: stt
      })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Trả về phản hồi lỗi
    return ContentService.createTextOutput(
      JSON.stringify({
        result: "error",
        message: error.toString()
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Hàm định dạng tiền tệ Việt Nam
 * @param {number} amount - Số tiền
 * @returns {string} - Chuỗi đã định dạng (VD: "150.000 đ")
 */
function formatCurrency(amount) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
}