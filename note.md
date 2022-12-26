# requestAnimationFrame(): 
luôn đảm bảo sẽ chạy đoạn code animation của chúng ta ngay trước những lần trình duyệt tiến hành repaint trang web, theo đúng tần số quét của thiết bị. Điều này vừa giúp animation của chúng ta mượt nhất có thể, lại không chạy dư thừa hơn tần số quét của thiết bị.
*) requestAnimationFrame() không tự lặp lại. Để animation của bạn tiếp tục chạy đến khi hoàn tất, bạn phải tiếp tục gọi lại requestAnimationFrame() bên trong callback.

 $(document).on("click", ".delete-btn", function (e) {
        id = $(this).data("id")
        DeletePet(id);

        render(petList);
    })

# Quy trình thêm phần tử vào mảng:
1. Kiểm tra mảng có thể thêm được phần tử nữa không? Nếu không, thoát hàm
2. Kiểm tra giá trị pos hợp lệ không. Ở đây nếu không hợp lệ mình cho về chỉ số đầu/cuối.
3. Thực hiện dịch chuyển mảng(phần phía sau nơi chèn + vị trí chèn)
4. Chèn vào vị trí cần chèn
5. Tăng số lượng phần tử

# Quy trình xóa phần tử trong mảng:
1. Kiểm tra có thể xóa hay không? Nếu không => thoát hàm
2. Kiểm tra giá trị pos hợp lệ không. Ở đây nếu không hợp lệ mình cho về chỉ số đầu/cuối.
3. Dịch chuyển mảng lùi 1 chỉ số – phần phía sau nơi xóa
4. Giảm số lượng phần tử