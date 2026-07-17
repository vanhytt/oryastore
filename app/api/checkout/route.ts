import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
}

function normalizePrivateKey(privateKey?: string) {
  if (!privateKey) return "";
  return privateKey.replace(/\\n/g, "\n");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const customer = body?.customer ?? {};
    const items = Array.isArray(body?.items) ? body.items : [];
    const paymentMethod = body?.paymentMethod || "COD";
    const total = Number(body?.total || 0);

    if (!customer?.name || !customer?.phone || !customer?.address) {
      return NextResponse.json(
        { error: "Thiếu thông tin người nhận hoặc địa chỉ giao hàng" },
        { status: 400 }
      );
    }

    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = normalizePrivateKey(process.env.GOOGLE_PRIVATE_KEY);
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (!serviceAccountEmail || !privateKey || !sheetId) {
      return NextResponse.json(
        {
          error:
            "Chưa cấu hình Google Sheets credentials. Vui lòng thêm GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY và GOOGLE_SHEET_ID vào .env.local",
        },
        { status: 500 }
      );
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: serviceAccountEmail,
        private_key: privateKey,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient as any });

    const orderId = `ORYA-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    const orderedAt = new Date().toLocaleString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
    });

    const productDetails = items
      .map((item: any) => {
        const qty = Number(item?.quantity || 0);
        const unitPrice = Number(item?.priceValue || 0);
        return `${item?.name || "Sản phẩm"} x${qty} (${formatCurrency(unitPrice)})`;
      })
      .join(" | ");

    const row = [
      orderId,
      customer.name,
      customer.phone,
      customer.address,
      customer.note || "",
      paymentMethod,
      productDetails,
      formatCurrency(total),
      orderedAt,
    ];

    const headerRange = "A1:I1";
    const headerResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: headerRange,
    });

    const headerValues = headerResponse.data.values?.[0] ?? [];
    if (headerValues.length === 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: sheetId,
        range: headerRange,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [[
            "Mã đơn hàng",
            "Họ và tên người nhận",
            "Số điện thoại",
            "Địa chỉ giao hàng",
            "Ghi chú đơn hàng",
            "Phương thức thanh toán",
            "Chi tiết sản phẩm mua",
            "Tổng tiền đơn hàng",
            "Thời gian đặt hàng",
          ]],
        },
      });
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "A:I",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [row],
      },
    });

    return NextResponse.json({ success: true, orderId });
  } catch (error) {
    console.error("Checkout Google Sheets error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Không thể ghi dữ liệu đơn hàng vào Google Sheets",
      },
      { status: 500 }
    );
  }
}
