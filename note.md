# requestAnimationFrame(): 
luôn đảm bảo sẽ chạy đoạn code animation của chúng ta ngay trước những lần trình duyệt tiến hành repaint trang web, theo đúng tần số quét của thiết bị. Điều này vừa giúp animation của chúng ta mượt nhất có thể, lại không chạy dư thừa hơn tần số quét của thiết bị.
*) requestAnimationFrame() không tự lặp lại. Để animation của bạn tiếp tục chạy đến khi hoàn tất, bạn phải tiếp tục gọi lại requestAnimationFrame() bên trong callback.

 $(document).on("click", ".delete-btn", function (e) {
        id = $(this).data("id")
        DeletePet(id);

        render(petList);
    })