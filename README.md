# Bài thực hành 02 - Lập trình Web

## So sánh cách làm giao diện: DOM thuần vs React

1. **DOM Thuần (Phần A - Imperative):**
   - Phải ra lệnh trực tiếp từng bước (tìm thẻ, tạo phần tử `createElement`, thay đổi `textContent`, `appendChild`).
   - Cập nhật giao diện khó khăn và dễ lỗi khi dữ liệu thay đổi (ví dụ: khi thêm sách mới hoặc đổi trạng thái yêu thích, phải gọi lại hàm render và xóa HTML cũ).
   - Event Delegation phải xử lý thủ công, tốn nhiều code kiểm tra `e.target`.

2. **React (Phần B - Declarative & State Driven):**
   - Không can thiệp trực tiếp vào DOM. Khai báo giao diện dựa trên State (`useState`).
   - Việc đồng bộ UI và dữ liệu tự động diễn ra: Khi `favorites` hoặc `filterGenre` thay đổi, React tự động Re-render đúng phần cần thiết.
   - Component giúp tái sử dụng mã (ví dụ: `BookCard`), việc truyền dữ liệu qua `props` giúp mã minh bạch, cấu trúc rõ ràng và dễ bảo trì hơn so với các module JS nối nhau bằng logic DOM.
