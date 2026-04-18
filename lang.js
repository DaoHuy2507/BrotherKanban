/**
 * BrotherKanban Language System (i18n)
 * "You know who ELSE has 2 languages? MY MOM!" — Muscle Man
 * Maintained by Skips (He's seen this language problem before)
 */

const TRANSLATIONS = {
  vi: {
    /* ===== COMMON – SIDEBAR ===== */
    'site-tagline'      : 'Quản Lý Công Việc',
    'btn-new-task'      : 'Thêm Task Mới',
    'nav-dashboard'     : 'Tổng Quan',
    'nav-myboard'       : 'Bảng Của Tôi',
    'nav-team'          : 'Đội Ngũ',
    'nav-analytics'     : 'Thống Kê',
    'nav-settings'      : 'Cài Đặt',
    'nav-help'          : 'Trợ Giúp',
    'nav-logout'        : 'Đăng Xuất',

    /* ===== COMMON – TOPBAR ===== */
    'search-placeholder': 'Tìm kiếm...',
    'topnav-tasks'      : 'Nhiệm Vụ',
    'topnav-sprint'     : 'Sprint',
    'topnav-reports'    : 'Báo Cáo',

    /* ===== MY BOARD ===== */
    'board-badge'       : 'BẢN ĐỒ NHIỆM VỤ',
    'board-title'       : 'Bảng Của Tôi',
    'board-subtitle'    : '"Bắt đầu thôi Mordecai!" — Rigby, chưa bao giờ làm gì',
    'col-todo'          : 'CẦN LÀM',
    'col-doing'         : 'ĐANG LÀM',
    'col-done'          : 'HOÀN THÀNH',
    'col-todo-sub'      : '"Chắc làm sau..."',
    'col-doing-sub'     : '"Đang cố gắng đây!"',
    'col-done-sub'      : '"YYYEAHHH!!! 🎉"',
    'btn-add-task'      : '+ Thêm Nhiệm Vụ',
    'modal-title'       : '📋 LỆNH TRIỆU TẬP',
    'modal-name-label'  : 'Tên Nhiệm Vụ',
    'modal-name-ph'     : 'VD: Dọn Công Viên...',
    'modal-desc-label'  : 'Mô Tả',
    'modal-priority-label': 'Độ Ưu Tiên',
    'modal-status-label': 'Trạng Thái',
    'priority-high'     : '🔴 Benson Mức Đỏ (Cao)',
    'priority-mid'      : '🟡 Cũng Phải Làm (Trung Bình)',
    'priority-low'      : '⚪ Khi Nào Rảnh (Thấp)',
    'status-todo'       : 'Cần Làm',
    'status-doing'      : 'Đang Làm',
    'status-done'       : 'Hoàn Thành',
    'modal-cancel'      : 'HỦY BỎ',
    'modal-submit'      : 'TRIỂN KHAI 🚀',

    /* ===== TEAM ===== */
    'team-badge'        : 'NHÂN VIÊN CÔNG VIÊN',
    'team-title'        : 'Đội Ngũ',
    'team-subtitle'     : '"Những thiên tài đứng sau mỗi task hoàn thành (hoặc không). Và Muscle Man." — Benson, hằng ngày',
    'team-recruit'      : '+ Tuyển Thành Viên',
    'btn-smart-assign'  : 'Phân Công Thông Minh',

    /* ===== SETTINGS ===== */
    'settings-badge'    : 'BẢNG ĐIỀU KHIỂN',
    'settings-title'    : 'Cài Đặt',
    'settings-subtitle' : '"Skips nói cài đặt đúng sẽ tiết kiệm 3000 năm." — Benson, gật đầu',

    /* ===== SPRINT ===== */
    'sprint-badge'      : 'CHẠY NƯỚC RÚT™',
    'sprint-title'      : 'Sprint',
    'sprint-subtitle'   : '"Benson đặt deadline theo sprint. Chúng tôi bỏ chạy theo nghĩa đen." — Mordecai',
    'sprint-create-btn' : 'Tạo Sprint Mới',

    /* ===== REPORTS ===== */
    'report-badge'      : 'POPS BÁO CÁO',
    'report-title'      : 'Báo Cáo',
    'report-subtitle'   : '"Jolly good show! Và đây là số liệu chính xác của mọi thứ." — Pops',
    'report-copy-btn'   : '📋 COPY BÁO CÁO',
    'report-sprint-done': 'Sprint Xong',

    /* ===== HELP ===== */
    'help-badge'        : 'SKIPS GIẢI THÍCH',
    'help-title'        : 'Trợ Giúp',
    'help-subtitle'     : '"Mày hỏi tao giải thích. Được rồi, lần này thôi." — Skips',
    'stat-total'        : 'Tổng Thành Viên',
    'stat-active'       : 'Đang Online',
    'stat-week-tasks'   : 'Task Tuần Này',
    'stat-excuses'      : 'Lý Do Được Tạo Ra',
    'label-tasks-done'  : 'Task Xong',
    'label-in-progress' : 'Đang Làm',
    'label-vibe'        : 'Chỉ Số Vibe',
    'label-online'      : '● Online',
    'label-angry'       : '● ĐANG TỨC',
    'label-immortal'    : '● Bất Tử',
    'label-flexing'     : '● Đang Flex',
    'label-jolly'       : '● Vui Vẻ',

    /* ===== ANALYTICS ===== */
    'anal-badge'        : 'BÁO CÁO CÔNG VIÊN',
    'anal-title'        : 'Thống Kê',
    'anal-subtitle'     : 'Số liệu không biết nói dối. Chỉ Rigby mới nói dối thôi. 📊',
    'anal-period'       : 'Kỳ Báo Cáo',
    'anal-this-week'    : 'Tuần Này 🗓️',
    'anal-view-report'  : 'Xem Báo Cáo Đầy Đủ',
    'kpi-total-label'   : 'Tổng Task',
    'kpi-done-label'    : 'Hoàn Thành ✅',
    'kpi-doing-label'   : 'Đang Làm ⚡',
    'kpi-overdue-label' : 'Quá Hạn ⏰',
    'kpi-rate-label'    : 'Tỷ Lệ Xong',
    'kpi-balance-label' : 'Cân Bằng Nhóm ⚖️',
    'kpi-done'          : 'Đã Hoàn Thành',
    'kpi-inprogress'    : 'Đang Làm',
    'kpi-rate'          : 'Tỉ Lệ Hoàn Thành',
    'kpi-overdue'       : 'Trễ Hạn 😱',
    'kpi-done-note'     : '↑ +6 từ tuần trước',
    'kpi-doing-note'    : '⚡ Rigby đang "làm"',
    'kpi-rate-note'     : '↑ Skips ra tay rồi',
    'kpi-overdue-note'  : 'Benson đang theo dõi!',
    'chart-priority'    : 'Phân Bổ Độ Ưu Tiên 🎯',
    'chart-priority-sub': '"Hệ thống phân loại được Benson phê duyệt"',
    'chart-team'        : 'Hiệu Suất Đội Nhóm 🏆',
    'chart-team-sub'    : '"Ai hoàn thành nhiều nhất? (Spoiler: Skips)"',
    'chart-weekly'      : 'Hoạt Động Theo Tuần 📅',
    'chart-weekly-sub'  : '"Thứ Hai = Hứng Khởi. Thứ Bảy = YYYEAHHH!"',
    'chart-insight'     : '💡 Insight: Thứ 7 năng suất nhất vì Benson ra ngoài. 😂',
    'priority-high-label': '🔴 Cao – Benson Mức Đỏ',
    'priority-mid-label': '🟡 Trung Bình – Cũng Phải Làm',
    'priority-low-label': '⚪ Thấp – Khi Nào Rảnh',

    /* ===== CARD LABELS (my_board) ===== */
    'card-progress'      : 'Tiến độ',
    'card-move-doing'    : '→ Đang Làm',
    'card-move-done'     : '→ Xong Rồi',
    'priority-high-short': 'Cao',
    'priority-med-short' : 'Trung Bình',
    'priority-low-short' : 'Thấp',

    /* ===== TEAM CARD LABELS ===== */
    'team-efficiency'    : 'Hiệu Suất',
    'team-workload'      : 'Tải Việc',
    'team-reliability'   : 'Tin Cậy',
    'team-speed'         : 'Tốc Độ',
    'team-detail-btn'    : 'Chi Tiết',
    'team-assign-btn'    : 'Giao Task',
    'team-overload'      : 'QUÁ TẢI',
    'stat-done'          : 'Task Hoàn Thành',
    'stat-doing'         : 'Task Đang Làm',
    'stat-balance'       : 'Cân Bằng Nhóm',

    /* ===== SETTINGS ===== */
    'set-badge'         : 'BẢNG ĐIỀU KHIỂN',
    'set-title'         : 'Cài Đặt',
    'set-subtitle'      : 'Đừng chạm vào cài đặt của Benson. Thật ra cứ chạm thoải mái đi. 🔧',
    'set-profile-title' : 'Hồ Sơ Nhân Viên',
    'set-profile-tag'   : 'THẺ ID',
    'set-name-label'    : 'Tên Hiển Thị',
    'set-uid-label'     : 'Mã Nhân Viên / Username',
    'set-email-label'   : 'Tần Số Radio (Email)',
    'set-notif-title'   : 'Hệ Thống Cảnh Báo',
    'set-notif-tag'     : 'TIẾNG LA HÉT CỦA BENSON',
    'set-notif-1'       : 'Cảnh Báo Deadline 🚨',
    'set-notif-1-sub'   : 'Nhắc khi task sắp quá hạn. Benson sẽ nhắc thay nếu bạn tắt cái này.',
    'set-notif-2'       : 'Cảnh Báo Giao Task 📋',
    'set-notif-2-sub'   : 'Thông báo khi Benson ném task vào mặt bạn lúc 7 giờ sáng.',
    'set-notif-3'       : 'Đùa Cười Của Muscle Man 😂',
    'set-notif-3-sub'   : '"Bạn biết ai KHÁC nhận thông báo không? MẸ TÔI!" (Khuyến cáo tắt)',
    'set-notif-4'       : 'Câu Nói Khôn Của Skips 🧠',
    'set-notif-4-sub'   : 'Nhận quote triết học mỗi sáng. "Tao đã thấy cái này rồi..." v.v.',
    'set-appear-title'  : 'Giao Diện Công Viên',
    'set-darkmode'      : 'Chế Độ Tối 🌙',
    'set-darkmode-sub'  : 'Chế độ ban đêm. Rigby thích vì hắn làm việc lúc 3 giờ sáng.',
    'set-lang-label'    : 'Ngôn Ngữ / Language 🌐',
    'set-lang-opt-vi'   : '🇻🇳 Tiếng Việt (Phiên Bản Công Viên)',
    'set-lang-opt-en'   : '🇺🇸 English (Ngôn Ngữ Chính Thức)',
    'set-lang-opt-mo'   : '🐦 Tiếng Mordecai (Beta)',
    'set-danger-title'  : 'VÙNG NGUY HIỂM ☠️',
    'set-danger-tag'    : 'BENSON CẤM CHẠM',
    'set-danger-note'   : '"Nếu bạn chạm vào đây, Benson SẼ sa thải bạn. Không đùa đâu. Dù nó chỉ là website."',
    'set-btn-clear'     : '🗑️ Xóa Toàn Bộ Task',
    'set-btn-delete'    : '💀 Xóa Tài Khoản',
    'set-btn-burn'      : '🔥 Đốt Hết Đi',
    'set-save'          : 'LƯU THAY ĐỔI 💾',
    'set-saved'         : '✓ ĐÃ LƯU! YYYEAHHH!',

    /* ===== LOGIN ===== */
    'login-label-id'    : 'Mã Nhân Viên / Tên Đăng Nhập',
    'login-label-pass'  : 'Mã Bảo Mật',
    'login-btn'         : 'ĐĂNG NHẬP',
    'login-forgot'      : 'Quên Mã Bảo Mật?',
    'login-register'    : 'Đăng Ký Tài Khoản Mới',

    /* ===== REGISTER ===== */
    'reg-label-name'    : 'Họ và Tên',
    'reg-label-user'    : 'Tên Đăng Nhập',
    'reg-label-email'   : 'Tần Số Radio (Email)',
    'reg-label-pass'    : 'Thông Tin Bảo Mật',
    'reg-btn'           : 'NỘP ĐƠN ỨNG TUYỂN',
    'reg-login-link'    : 'Đã có tài khoản? Đăng nhập ngay',

    /* ===== FORGOT PASSWORD ===== */
    'forgot-label-user' : 'TÊN ĐĂNG NHẬP',
    'forgot-label-method': 'PHƯƠNG THỨC KHÔI PHỤC',
    'forgot-method-email': 'EMAIL',
    'forgot-method-sms' : 'SMS / ĐIỆN THOẠI',
    'forgot-btn'        : 'GỬI YÊU CẦU',
    'forgot-back'       : 'QUAY LẠI CỬA VÀO',

    /* ===== BOARD FILTER & CARD BUTTONS ===== */
    'board-filter-all'  : 'Tất Cả Độ Ưu Tiên',
    'board-filter-high' : '🔴 Cao',
    'board-filter-mid'  : '🟡 Trung Bình',
    'board-filter-low'  : '⚪ Thấp',
    'card-btn-doing'    : '→ Đang Làm',
    'card-btn-done'     : '→ Xong Rồi',

    /* ===== TASK CARDS ===== */
    'card1-title'       : 'Dọn sạch đài phun nước',
    'card1-desc'        : 'Benson nói nó kinh lắm rồi. Fix trước khi hắn đỏ mặt lên!',
    'card2-title'       : 'Ngăn Muscle Man khoe mẹ',
    'card2-desc'        : 'Nhiệm vụ bất khả thi nhưng mọi thế hệ đều phải thử.',
    'card3-title'       : 'Ngủ thêm 5 phút nữa',
    'card3-desc'        : 'Kỹ năng cốt lõi. Mordecai & Rigby đã master từ năm 14 tuổi.',
    'card4-title'       : 'Chạy nước rút timeline',
    'card4-desc'        : 'OOOOHH! Benson sắp nổ tung. Deadline là chiều nay friendo!',
    'card5-title'       : 'Mua đồ ăn cho cả crew',
    'card5-desc'        : 'The Ultimeatum Run™. Đừng quên khăn giấy Rigby đang đói!',
    'card6-title'       : 'Cứu thế giới khỏi bóng tối',
    'card6-desc'        : 'Skips đã xử lý rồi. Như mọi khi. Không ai biết ông làm thế nào.',
    'card7-title'       : 'Cắt cỏ toàn bộ khuôn viên',
    'card7-desc'        : 'Xong rồi! Mordecai làm thiệt đó. Benson gật đầu một lần duy nhất trong đời.',

    /* ===== LOGIN EXTRAS (hài hước VI - đúng chính tả) ===== */
    'login-stamp'       : 'KHẨN CẤP!',
    'login-form-no'     : 'Tờ Khai Nhân Viên Số #2024-LOGIN',
    'login-h1'         : 'NHÂN VIÊN <span class="bg-tertiary px-2">ĐIỀN GIỜ</span> VÀO CA',
    'login-dept'        : '(VĂN PHÒNG CÔNG VIÊN THÀNH PHỐ - NƠI BENSON LÀM "SẾP")',
    'login-shift-label' : 'TRẠNG THÁI CA TRỰC',
    'login-shift-val'   : 'ĐANG HOẠT ĐỘNG',
    'login-section-head': 'XÁC NHẬN DANH TÍNH & QUYỀN HẠN TRƯỚC',
    'login-warning'     : 'CẢNH BÁO: Đi muộn sẽ bị phạt cắt cỏ bổ sung. Bác Pops sẽ nhìn bằng mắt buồn mãi mãi.',

    /* ===== REGISTER EXTRAS ===== */
    'reg-stamp'         : 'TUYỂN DỤNG!',
    'reg-form-no'       : 'Mẫu Ứng Tuyển Nhân Viên #2024-S',
    'reg-h1'           : 'NHÂN VIÊN <span class="bg-tertiary px-2">MỚI NỘP HỒ SƠ</span>',
    'reg-subtitle'      : '(HỒ SƠ THAM GIA CHÍNH THỨC)',
    'reg-status-label'  : 'TRẠNG THÁI',
    'reg-status-val'    : 'ĐANG TUYỂN',
    'reg-section1'      : 'Danh Tính Ứng Viên',
    'reg-fullname'      : 'Họ và Tên',
    'reg-username'      : 'Tên Đăng Nhập',
    'reg-email'         : 'Tần Số Liên Lạc (Email)',
    'reg-section2'      : 'Mật Khẩu Bảo Mật',
    'reg-section3'      : 'Lời Thề Nhân Viên',
    'reg-pledge'        : 'Tôi xin thề sẽ giữ gìn công viên sạch đẹp, quản lý kanban nghiêm túc, và tuyệt đối không để quỷ ngoài hành tinh phá hủy quầy snack của bác Pops. Tôi hiểu rằng lười biếng sẽ dẫn đến hình phạt dọn đài phun nước vào thứ Hai sáng sớm.',

    /* ===== DASHBOARD ===== */
    'dash-status'       : 'TRẠNG THÁI: LƯỜI BIẾNG ĐÃ BỊ TÓM',
    'dash-greeting'     : 'Yo Boss! 👋',
    'dash-desc'         : 'Công viên không tự quản lý được đâu. Đây là những thứ đang lộn xộn hôm nay.',
    /* Vibe states */
    'vibe-overdue'      : '"Benson Sắp Nổ!" 🔴',
    'vibe-overdue-sub'  : ' task quá hạn. Bonsai Benson đang đỏ mặt!',
    'vibe-great'        : '"Maximum Effort!" 💪',
    'vibe-great-sub'    : '% xong rồi! YYYEAHHH!',
    'vibe-lazy'         : '"Làm Sau Cũng Được..." 😴',
    'vibe-lazy-sub'     : 'Rigby đang ảnh hưởng cả đội. Lo mà làm đi!',
    'vibe-empty'        : '"Trống Như Não Rigby" 🌐',
    'vibe-empty-sub'    : 'Chưa có task nào. Benson đang nghi ngờ.',
    'vibe-ok'           : '"Đang Trong Tầm Kiểm Soát" ✅',
    'vibe-ok-sub'       : ' task đang chạy, ',
    'vibe-ok-sub2'      : ' đang chờ.',
    /* Focus section */
    'focus-empty-title' : 'Không Có Task Nào Cần Làm!',
    'focus-empty-sub'   : 'Skips nói: Hôm nay mày xong hết rồi. Tốt lắm.',
    'focus-due-overdue' : '⚠️ Quá hạn!',
    'focus-due-prefix'  : 'Hạn: ',
    'focus-see-board'   : '→ Xem trong Board',
    'focus-unassigned'  : 'Chưa giao',
    'focus-priority-high'  : '🔴 Khẩn',
    'focus-priority-mid'   : '🟡 Bình Thường',
    'focus-priority-low'   : '⚪ Từ Từ',
    /* Log section */
    'log-empty'         : 'Chưa có hoạt động nào. Cả team đang ngủ trưa.',
    /* Sprint section */
    'sprint-empty'      : 'Chưa có Sprint nào.',
    'sprint-create'     : 'Tạo ngay →',
    'sprint-done-badge' : '✅ Xong',
    'sprint-days-left'  : 'Còn ',
    'sprint-days-unit'  : 'ngày',
    'sprint-no-goal'    : 'Không có mục tiêu. Giống Rigby.',
    'sprint-detail'     : 'Chi tiết →',
    /* Search */
    'search-title'      : '🔍 Tìm Kiếm Nhanh',
    'search-no-result'  : 'Không tìm thấy gì. Rigby đã ẩn nó rồi.',
    'search-result-task': 'Task',
    'search-result-member': 'Thành Viên',
    'search-result-log' : 'Nhật Ký',
    'search-hotkey-tip' : 'Nhấn / để tìm kiếm nhanh',

    /* ===== REGISTER STICKY NOTES ===== */
    'reg-sticky-pops'   : 'Pops: "Xuất sắc! Thật là xuất sắc lắm!"',
    'reg-sticky-mm'     : 'BẠN BIẾT AI KHÁC CŨNG THÍCH ĐIỀN FORM KHÔNG?',
    'reg-sticky-skips'  : 'ĐƯỢC XÁC NHẬN BỞI SKIPS (ÔNG ẤY ĐÃ THẤY CÁI NÀY RỒI)',
    'reg-footer'        : 'Tài sản của BrotherKanban Zine & Media Group © 1989-2024',

    /* ===== FORGOT PASSWORD EXTRAS ===== */
    'forgot-stamp'      : 'KHẨN CẤP!',
    'forgot-form-no'    : 'Biên Bản Sự Cố Số #8008',
    'forgot-h1'         : 'LẠC MẤT <span class="bg-tertiary px-2">NÃO RỒI?</span>',
    'forgot-subtitle'   : '(HAY CHỈ LÀ MỘT MẶT KHẨU THÔI?)',
    'forgot-case-label' : 'TRẠNG THÁI VỤ VIỆC',
    'forgot-case-val'   : 'NGHIÊM TRỌNG',
    'forgot-section-head': 'BIÊN BẢN SỰ CỐ NHÂN VIÊN',
    'forgot-sticky-benson': 'Benson: "Mày mà để mất code thêm một lần nữa, NGHỈ VIỆC ĐI!"',
    'forgot-sticky-skips': 'ĐỪNG ĂN KẸO DÁN. SKIPS NÓI RỒI ĐÓ.',
    'forgot-badge'      : 'NHÂN VIÊN THÁNG NÀY (KHÔNG PHẢI BẠN)',
    'forgot-footnote'   : 'Lưu ý: Nếu vẫn vào không được, hỏi Skips. Ông ấy đã thấy cái này rồi. Có thể vậy.',

    /* ===== GOOGLE OAUTH ===== */
    'btn-google-login'  : 'Đăng Nhập Với Google',
    'btn-google-register': 'Đăng Ký Với Google',
    'or-divider'        : 'Hoặc',

    /* ===== DASHBOARD ===== */
    'dash-focus-title'  : '⎡ Hôm Nay Cần Làm',
    'dash-activity-title': 'Nhật Ký Hoạt Động',
    'dash-view-logs'    : 'XEM TẤT CẢ NHẬT KÝ',
    'dash-project-title': 'Dự Án Đang Hoạt Động',
    'dash-see-boards'   : 'XEM TẤT CẢ BẢNG',
    'dash-vibe'         : '"Maximum Effort" 💪',

    /* ===== ANALYTICS – DYNAMIC ===== */
    'anal-eff-done'       : 'xong',
    'anal-eff-total'      : 'task',
    'anal-eff-load'       : 'Tải',
    'anal-eff-trust'      : 'Tin cậy',
    'anal-mvp-score'      : 'Hiệu suất',
    'anal-mvp-done'       : 'task hoàn thành',
    'anal-wl-tooltip-eff' : 'Hiệu suất',
    'anal-wl-tooltip-trust': 'Tin cậy',
    'anal-wl-tooltip-speed': 'Tốc độ',
    'anal-insight-balance-ok-title'  : 'Tải Việc Cân Bằng Tốt!',
    'anal-insight-balance-ok-text'   : '% cân bằng. Benson hiếm khi hài lòng, nhưng lần này có vẻ ổn.',
    'anal-insight-balance-warn-title': 'Tải Việc Hơi Lệch',
    'anal-insight-balance-warn-text' : '% cân bằng. Còn khá ổn nhưng có thể phân phối lại task để tối ưu hơn.',
    'anal-insight-balance-bad-title' : 'Mất Cân Bằng Nghiêm Trọng!',
    'anal-insight-balance-bad-text'  : '% cân bằng. Dùng "Phân Công Thông Minh" trong tab Đội Ngũ để cân bằng lại.',
    'anal-insight-bottleneck-title'  : 'Bottleneck Phát Hiện!',
    'anal-insight-bottleneck-text'   : 'đang vượt quá giới hạn tải. Điều này làm giảm chất lượng và có thể gây trễ hạn.',
    'anal-insight-underuse-title'    : 'Nhân Lực Chưa Được Sử Dụng',
    'anal-insight-underuse-text'     : 'còn nhiều capacity trống. Hãy giao thêm task để tăng hiệu quả tổng thể.',
    'anal-insight-gap-title'         : 'Khoảng Cách Hiệu Suất Lớn',
    'anal-insight-highrate-title'    : 'Tỷ Lệ Task Ưu Tiên Cao',
    'anal-insight-highrate-good'     : 'Benson tạm thời hài lòng.',
    'anal-insight-highrate-bad'      : 'Còn nhiều task khẩn chưa xử lý! Benson đang theo dõi.',
    'anal-insight-assign-title'      : 'Tối Ưu Phân Công',
    'anal-insight-assign-text'       : 'task chưa được giao. Vào tab Đội Ngũ → "Phân Công Thông Minh" để AI đề xuất.',
    'anal-priority-high'             : '🔴 Cao',
    'anal-priority-mid'              : '🟡 Trung Bình',
    'anal-priority-low'              : '⚪ Thấp',
    'anal-status-done'               : '✅ Hoàn Thành',
    'anal-status-doing'              : '⚡ Đang Làm',
    'anal-status-todo'               : '📋 Cần Làm',
    'anal-status-overdue'            : '⏰ Quá Hạn',
    'anal-days'                      : ['T2','T3','T4','T5','T6','T7','CN'],
    'anal-tooltip-created'           : 'Tạo',
    'anal-tooltip-done'              : 'Xong',
    'anal-today'                     : 'Hôm nay',

    /* ===== SPRINT – DYNAMIC ===== */
    'sp-empty-title'     : 'Chưa có Sprint nào!',
    'sp-empty-desc'      : 'Mordecai: "Ờ thì... chưa cần gấp đâu mà." — Rigby: "Đúng đấy!"',
    'sp-empty-hint'      : 'Ấn "Tạo Sprint Mới" để bắt đầu.',
    'sp-badge-done'      : '✅ Hoàn Thành',
    'sp-badge-active'    : '⚡ Đang Chạy',
    'sp-badge-past'      : '💀 Đã Kết Thúc',
    'sp-badge-upcoming'  : '🔜 Sắp Tới',
    'sp-no-tasks'        : 'Chưa có task nào trong sprint này.',
    'sp-days-left'       : 'Còn ',
    'sp-days-unit'       : ' ngày',
    'sp-tasks-done'      : 'task hoàn thành',
    'sp-delete-btn'      : '🗑️ Xóa Sprint',
    'sp-no-tasks-modal'  : 'Không có task nào để thêm. Hãy tạo task trước!',
    'sp-alert-name'      : 'Benson: ĐẶT TÊN SPRINT ĐI! Tao không chạy sprint vô danh!',
    'sp-alert-date'      : 'Điền ngày bắt đầu và kết thúc đi bạn ơi!',
    'sp-confirm-delete'  : 'Xóa sprint này?',
    'sp-priority-high'   : 'cao',
    'sp-priority-mid'    : 'trung bình',
    'sp-priority-low'    : 'thấp',

    /* ===== REPORTS – DYNAMIC ===== */
    'rp-mvp-none'        : 'Chưa ai làm gì 😅',
    'rp-mvp-done'        : 'task xong',
    'rp-log-empty'       : 'Chưa có hoạt động nào.',
    'rp-task-none'       : 'Không có task nào.',
    'rp-status-todo'     : '📋 Cần Làm',
    'rp-status-doing'    : '⚡ Đang Làm',
    'rp-status-done'     : '✅ Xong',
    'rp-copy-success'    : '✓ ĐÃ COPY! YYYEAHHH!',
    'rp-copy-btn-label'  : '📋 COPY BÁO CÁO',
    'rp-copy-fail'       : 'Copy thất bại. Benson đang khóc.',
    'rp-report-header'   : '📊 BÁO CÁO BROTHERKANBAN',
    'rp-copy-overview'   : '📌 TỔNG QUAN',
    'rp-copy-total'      : '• Tổng task',
    'rp-copy-done'       : '• Hoàn thành',
    'rp-copy-doing'      : '• Đang làm',
    'rp-copy-overdue'    : '• Quá hạn',
    'rp-copy-tasklist'   : '📋 DANH SÁCH TASK',
    'rp-copy-mvp'        : '🏆 MVP',
    'rp-copy-unknown'    : 'Chưa xác định',
  },

  en: {
    /* ===== COMMON – SIDEBAR ===== */
    'site-tagline'      : 'Kanban Admin',
    'btn-new-task'      : 'New Task',
    'nav-dashboard'     : 'Dashboard',
    'nav-myboard'       : 'My Board',
    'nav-team'          : 'Team',
    'nav-analytics'     : 'Analytics',
    'nav-settings'      : 'Settings',
    'nav-help'          : 'Help',
    'nav-logout'        : 'Logout',

    /* ===== COMMON – TOPBAR ===== */
    'search-placeholder': 'Search vibes...',
    'topnav-tasks'      : 'Tasks',
    'topnav-sprint'     : 'Sprint',
    'topnav-reports'    : 'Reports',

    /* ===== MY BOARD ===== */
    'board-badge'       : 'MISSION CONTROL',
    'board-title'       : 'My Board',
    'board-subtitle'    : '"Get to it, Mordecai!" — Rigby, who never does anything',
    'col-todo'          : 'TO DO',
    'col-doing'         : 'IN PROGRESS',
    'col-done'          : 'DONE',
    'col-todo-sub'      : '"Maybe later..."',
    'col-doing-sub'     : '"On it right now!"',
    'col-done-sub'      : '"YYYEAHHH!!! 🎉"',
    'btn-add-task'      : '+ Add Mission',
    'modal-title'       : '📋 MISSION BRIEF',
    'modal-name-label'  : 'Mission Name',
    'modal-name-ph'     : 'e.g. Mow the Lawn...',
    'modal-desc-label'  : 'Description',
    'modal-priority-label': 'Priority Level',
    'modal-status-label': 'Status',
    'priority-high'     : '🔴 Benson Red Alert (High)',
    'priority-mid'      : '🟡 Gets Done Eventually (Mid)',
    'priority-low'      : '⚪ Whenever I Feel Like It (Low)',
    'status-todo'       : 'To Do',
    'status-doing'      : 'In Progress',
    'status-done'       : 'Done',
    'modal-cancel'      : 'CANCEL',
    'modal-submit'      : 'DEPLOY 🚀',

    /* ===== TEAM ===== */
    'team-badge'        : 'PARK EMPLOYEES',
    'team-title'        : 'The Crew',
    'team-subtitle'     : '"Every genius behind each completed task (or not). And Muscle Man." — Benson, daily',
    'team-recruit'      : '+ Recruit Member',
    'btn-smart-assign'  : 'Smart Assignment',

    /* ===== SETTINGS ===== */
    'settings-badge'    : 'CONTROL PANEL',
    'settings-title'    : 'Settings',
    'settings-subtitle' : '"Skips says proper settings save 3000 years." — Benson, nodding',

    /* ===== SPRINT ===== */
    'sprint-badge'      : 'SPRINT RUNNING™',
    'sprint-title'      : 'Sprint',
    'sprint-subtitle'   : '"Benson sets deadlines by sprint. We run. Literally." — Mordecai',
    'sprint-create-btn' : 'Create New Sprint',

    /* ===== REPORTS ===== */
    'report-badge'      : 'POPS REPORTS',
    'report-title'      : 'Reports',
    'report-subtitle'   : '"Jolly good show! And here are the accurate numbers of everything." — Pops',
    'report-copy-btn'   : '📋 COPY REPORT',
    'report-sprint-done': 'Sprints Done',

    /* ===== HELP ===== */
    'help-badge'        : 'SKIPS EXPLAINS',
    'help-title'        : 'Help',
    'help-subtitle'     : '"You asked, I explain. Fine, just this once." — Skips',
    'stat-total'        : 'Total Members',
    'stat-active'       : 'Active Now',
    'stat-week-tasks'   : 'Tasks This Week',
    'stat-excuses'      : 'Excuses Generated',
    'label-tasks-done'  : 'Tasks Done',
    'label-in-progress' : 'In Progress',
    'label-vibe'        : 'Vibe Score',
    'label-online'      : '● Online',
    'label-angry'       : '● ANGRY',
    'label-immortal'    : '● Immortal',
    'label-flexing'     : '● Flexing',
    'label-jolly'       : '● Jolly',

    /* ===== ANALYTICS ===== */
    'anal-badge'        : 'PARK INTEL REPORT',
    'anal-title'        : 'Analytics',
    'anal-subtitle'     : "Numbers don't lie. Only Rigby lies. 📊",
    'anal-period'       : 'Report Period',
    'anal-this-week'    : 'This Week 🗓️',
    'anal-view-report'  : 'View Full Report',
    'kpi-total-label'   : 'Total Tasks',
    'kpi-done-label'    : 'Completed ✅',
    'kpi-doing-label'   : 'In Progress ⚡',
    'kpi-overdue-label' : 'Overdue ⏰',
    'kpi-rate-label'    : 'Completion Rate',
    'kpi-balance-label' : 'Team Balance ⚖️',
    'kpi-done'          : 'Tasks Done',
    'kpi-inprogress'    : 'In Progress',
    'kpi-rate'          : 'Completion Rate',
    'kpi-overdue'       : 'Overdue 😱',
    'kpi-done-note'     : '↑ +6 from last week',
    'kpi-doing-note'    : '⚡ Rigby is "working"',
    'kpi-rate-note'     : '↑ Skips helped obv',
    'kpi-overdue-note'  : 'Benson is watching!',
    'chart-priority'    : 'Priority Distribution 🎯',
    'chart-priority-sub': '"Benson-approved priority classification system"',
    'chart-team'        : 'Team Performance 🏆',
    'chart-team-sub'    : '"Who completed the most tasks? (Spoiler: Skips)"',
    'chart-weekly'      : 'Weekly Task Activity 📅',
    'chart-weekly-sub'  : '"Monday = Motivated. Saturday = YYYEAHHH!"',
    'chart-insight'     : '💡 Insight: Saturday most productive because Benson went out. 😂',
    'priority-high-label': '🔴 High — Benson Red Alert',
    'priority-mid-label' : '🟡 Medium — Still Gotta Do It',
    'priority-low-label' : '⚪ Low — Someday Maybe',

    /* ===== CARD LABELS (my_board) ===== */
    'card-progress'      : 'Progress',
    'card-move-doing'    : '→ In Progress',
    'card-move-done'     : '→ Done!',
    'priority-high-short': 'High',
    'priority-med-short' : 'Medium',
    'priority-low-short' : 'Low',

    /* ===== TEAM CARD LABELS ===== */
    'team-efficiency'    : 'Efficiency',
    'team-workload'      : 'Workload',
    'team-reliability'   : 'Reliability',
    'team-speed'         : 'Speed',
    'team-detail-btn'    : 'Details',
    'team-assign-btn'    : 'Assign Task',
    'team-overload'      : 'OVERLOADED',
    'stat-done'          : 'Tasks Done',
    'stat-doing'         : 'In Progress',
    'stat-balance'       : 'Team Balance',

    /* ===== SETTINGS ===== */
    'set-badge'         : 'PARK CONTROL PANEL',
    'set-title'         : 'Settings',
    'set-subtitle'      : "Don't touch Benson's settings. Actually go ahead. 🔧",
    'set-profile-title' : 'Employee Profile',
    'set-profile-tag'   : 'ID CARD',
    'set-name-label'    : 'Display Name',
    'set-uid-label'     : 'Park ID / Username',
    'set-email-label'   : 'Radio Frequency (Email)',
    'set-notif-title'   : 'Alert System',
    'set-notif-tag'     : "BENSON'S YELLS",
    'set-notif-1'       : 'Deadline Warnings 🚨',
    'set-notif-1-sub'   : "Reminds you when a task is almost due. Benson will remind you if you turn this off.",
    'set-notif-2'       : 'Task Assignment Alerts 📋',
    'set-notif-2-sub'   : 'Notified when Benson throws tasks at your face at 7AM.',
    'set-notif-3'       : "Muscle Man's Jokes 😂",
    'set-notif-3-sub'   : '"You know who ELSE gets notifications? MY MOM!" (We recommend turning this off.)',
    'set-notif-4'       : "Skips' Wisdom Quotes 🧠",
    'set-notif-4-sub'   : 'Receive philosophical quotes every morning. "I\'ve seen this before..." etc.',
    'set-appear-title'  : 'Park Aesthetics',
    'set-darkmode'      : 'Dark Mode 🌙',
    'set-darkmode-sub'  : 'Night mode. Rigby loves this because he works at 3AM.',
    'set-lang-label'    : 'Language 🌐',
    'set-lang-opt-vi'   : '🇻🇳 Tiếng Việt (Park Edition)',
    'set-lang-opt-en'   : '🇺🇸 English (Official Park Language)',
    'set-lang-opt-mo'   : '🐦 Mordecai-speak (Beta)',
    'set-danger-title'  : 'DANGER ZONE ☠️',
    'set-danger-tag'    : 'BENSON FORBIDDEN',
    'set-danger-note'   : '"If you touch this, Benson WILL fire you. Not joking. Even though it\'s just a website."',
    'set-btn-clear'     : '🗑️ Clear All Tasks',
    'set-btn-delete'    : '💀 Delete Account',
    'set-btn-burn'      : '🔥 Burn It All Down',
    'set-save'          : 'SAVE CHANGES 💾',
    'set-saved'         : '✓ SAVED! YYYEAHHH!',

    /* ===== LOGIN ===== */
    'login-label-id'    : 'Employee ID / Username',
    'login-label-pass'  : 'Security Code',
    'login-btn'         : 'PUNCH IN',
    'login-forgot'      : 'Forgot Security Code?',
    'login-register'    : 'Request New Badge (Register)',

    /* ===== REGISTER ===== */
    'reg-label-name'    : 'Full Name',
    'reg-label-user'    : 'Username',
    'reg-label-email'   : 'Radio Frequency (Email)',
    'reg-label-pass'    : 'Security Credentials',
    'reg-btn'           : 'SUBMIT APPLICATION',
    'reg-login-link'    : 'Already an employee? Login here',

    /* ===== FORGOT PASSWORD ===== */
    'forgot-label-user' : 'EMPLOYEE USERNAME',
    'forgot-label-method': 'RECOVERY METHOD',
    'forgot-method-email': 'EMAIL',
    'forgot-method-sms' : 'SMS / PHONE',
    'forgot-btn'        : 'PUNCH THE CLOCK',
    'forgot-back'       : 'RETURN TO PARK ENTRANCE',

    /* ===== BOARD FILTER & CARD BUTTONS ===== */
    'board-filter-all'  : 'All Priority',
    'board-filter-high' : '🔴 High',
    'board-filter-mid'  : '🟡 Medium',
    'board-filter-low'  : '⚪ Low',
    'card-btn-doing'    : '→ In Progress',
    'card-btn-done'     : '→ Mark Done',

    /* ===== TASK CARDS ===== */
    'card1-title'       : 'Clean the Fountain',
    'card1-desc'        : "Benson says it's disgusting. Fix it before he turns red!",
    'card2-title'       : 'Stop Muscle Man Bragging',
    'card2-desc'        : 'Impossible mission but every generation must attempt it.',
    'card3-title'       : 'Sleep 5 More Minutes',
    'card3-desc'        : 'Core skill. Mordecai & Rigby mastered this at age 14.',
    'card4-title'       : 'Sprint to Deadline',
    'card4-desc'        : 'OOOOHH! Benson about to explode. Deadline is TODAY friendo!',
    'card5-title'       : 'Food Run for the Crew',
    'card5-desc'        : "The Ultimeatum Run™. Don't forget napkins, Rigby is hungry!",
    'card6-title'       : 'Save the World from Darkness',
    'card6-desc'        : 'Skips handled it. As always. Nobody knows how he does it.',
    'card7-title'       : 'Mow the Entire Lawn',
    'card7-desc'        : 'Done! Mordecai actually did it. Benson nodded once.',

    /* ===== LOGIN EXTRAS ===== */
    'login-stamp'       : 'Priority!',
    'login-form-no'     : 'Park Service Form #2024-LOGIN',
    'login-h1'         : 'EMPLOYEE <span class="bg-tertiary px-2">PUNCH-IN</span> FORM',
    'login-dept'        : '(MUNICIPAL REC & PARKS DEPT.)',
    'login-shift-label' : 'SHIFT STATUS',
    'login-shift-val'   : 'ACTIVE',
    'login-section-head': 'IDENTIFICATION & ACCESS',
    'login-warning'     : 'WARNING: Late clock-ins will be penalized by additional lawn-mowing duties. See Pops for details.',

    /* ===== REGISTER EXTRAS ===== */
    'reg-stamp'         : 'Join Today!',
    'reg-form-no'       : 'Park Service Form #2024-S',
    'reg-h1'           : 'NEW RANGER <span class="bg-tertiary px-2">APPLICATION</span>',
    'reg-subtitle'      : '(OFFICIAL EMPLOYMENT DOCUMENTATION)',
    'reg-status-label'  : 'STATUS',
    'reg-status-val'    : 'HIRING',
    'reg-section1'      : 'Candidate Identity',
    'reg-fullname'      : 'Full Name',
    'reg-username'      : 'Username',
    'reg-email'         : 'Radio Frequency (Email)',
    'reg-section2'      : 'Security Credentials',
    'reg-section3'      : 'Ranger Pledge',
    'reg-pledge'        : 'I hereby swear to keep the park clean, manage my kanban boards with honor, and never let the intergalactic monsters destroy the snack bar. I acknowledge that slacking off will result in immediate "cleaning the fountain" duty.',

    /* ===== DASHBOARD ===== */
    'dash-status'       : 'STATUS: SLACKING PREVENTED',
    'dash-greeting'     : 'Sup, Boss? 👋',
    'dash-desc'         : "The park isn't going to manage itself. Here's what's looking messy today.",
    /* Vibe states */
    'vibe-overdue'      : '"Benson Is About To EXPLODE!" 🔴',
    'vibe-overdue-sub'  : ' tasks overdue. RUN.',
    'vibe-great'        : '"Maximum Effort!" 💪',
    'vibe-great-sub'    : '% done! YYYEAHHH!',
    'vibe-lazy'         : '"Eh, Do It Later..." 😴',
    'vibe-lazy-sub'     : "Rigby's influence is spreading. Get moving!",
    'vibe-empty'        : '"As Empty as Rigby\'s Brain" 🌐',
    'vibe-empty-sub'    : "No tasks yet. Benson is suspicious.",
    'vibe-ok'           : '"Under Control" ✅',
    'vibe-ok-sub'       : ' tasks running, ',
    'vibe-ok-sub2'      : ' waiting.',
    /* Focus section */
    'focus-empty-title' : 'Nothing On The To-Do List!',
    'focus-empty-sub'   : "Skips says: You're all done today. Not bad.",
    'focus-due-overdue' : '⚠️ Overdue!',
    'focus-due-prefix'  : 'Due: ',
    'focus-see-board'   : '→ View in Board',
    'focus-unassigned'  : 'Unassigned',
    'focus-priority-high'  : '🔴 Urgent',
    'focus-priority-mid'   : '🟡 Normal',
    'focus-priority-low'   : '⚪ Chill',
    /* Log section */
    'log-empty'         : "No activity yet. The whole team is napping.",
    /* Sprint section */
    'sprint-empty'      : 'No Sprints yet.',
    'sprint-create'     : 'Create one →',
    'sprint-done-badge' : '✅ Done',
    'sprint-days-left'  : '',
    'sprint-days-unit'  : 'd left',
    'sprint-no-goal'    : 'No goal set. Classic Rigby.',
    'sprint-detail'     : 'Details →',
    /* Search */
    'search-title'      : '🔍 Quick Search',
    'search-no-result'  : "Nothing found. Rigby probably hid it.",
    'search-result-task': 'Task',
    'search-result-member': 'Member',
    'search-result-log' : 'Log',
    'search-hotkey-tip' : 'Press / to quick search',

    /* ===== REGISTER STICKY NOTES ===== */
    'reg-sticky-pops'   : 'Pops: "Good show! Jolly good show indeed!"',
    'reg-sticky-mm'     : 'YOU KNOW WHO ELSE LIKES FILLING OUT FORMS?',
    'reg-sticky-skips'  : "CERTIFIED BY SKIPS (HE'S SEEN THIS BEFORE)",
    'reg-footer'        : 'Property of BrotherKanban Industrial Zine & Media Group © 1989-2024',

    /* ===== FORGOT PASSWORD EXTRAS ===== */
    'forgot-stamp'      : 'URGENT!',
    'forgot-form-no'    : 'Park Service Form #8008',
    'forgot-h1'         : 'LOST YOUR <span class="bg-tertiary px-2">BRAIN?</span>',
    'forgot-subtitle'   : '(OR JUST A SECURITY CODE?)',
    'forgot-case-label' : 'CASE STATUS',
    'forgot-case-val'   : 'CRITICAL',
    'forgot-section-head': 'EMPLOYEE INCIDENT REPORT',
    'forgot-sticky-benson': 'Benson: "If you lose this code one more time, YOU\'RE FIRED!"',
    'forgot-sticky-skips': 'DO NOT EAT THE GLUE. SKIPS SAID SO.',
    'forgot-badge'      : 'EMPLOYEE OF THE MONTH (NOT YOU)',
    'forgot-footnote'   : 'Note: If you still can\'t get in, ask Skips. He\'s seen this before. Probably.',

    /* ===== GOOGLE OAUTH ===== */
    'btn-google-login'  : 'Sign In With Google',
    'btn-google-register': 'Sign Up With Google',
    'or-divider'        : 'Or',

    /* ===== DASHBOARD ===== */
    'dash-focus-title'  : '⎡ Today\'s Focus',
    'dash-task1-title'  : 'Clean the Fountain',
    'dash-task1-desc'   : 'Benson says it\'s gross. Fix it before he turns red.',
    'dash-task2-title'  : 'The Ultimeatum Run™',
    'dash-task2-desc'   : 'Pick up lunch for the whole crew. Don\'t forget the napkins!',
    'dash-activity-title': 'Activity Log',
    'dash-log1'         : '"You know who else finished their tasks?"',
    'dash-log2'         : 'Updated the "Spirit Exorcism" board.',
    'dash-view-logs'    : 'VIEW ALL LOGS',
    'dash-project-title': 'Active Curations',
    'dash-see-boards'   : 'SEE ALL BOARDS',
    'dash-proj1-title'  : 'The Coffee Shop',
    'dash-proj1-desc'   : 'Rebuilding the local haunt after that monster attack.',
    'dash-proj1-deadline': '2 Days Left',
    'dash-proj2-title'  : 'Space Dumpster',
    'dash-proj2-desc'   : "Don't ask where it came from, just help us sort it.",
    'dash-proj2-status' : 'Completed',
    'dash-vibe'         : '"Maximum Effort"',

    /* ===== ANALYTICS – DYNAMIC ===== */
    'anal-eff-done'       : 'done',
    'anal-eff-total'      : 'tasks',
    'anal-eff-load'       : 'Load',
    'anal-eff-trust'      : 'Reliability',
    'anal-mvp-score'      : 'Efficiency',
    'anal-mvp-done'       : 'tasks done',
    'anal-wl-tooltip-eff' : 'Efficiency',
    'anal-wl-tooltip-trust': 'Reliability',
    'anal-wl-tooltip-speed': 'Speed',
    'anal-insight-balance-ok-title'  : 'Workload Well Balanced!',
    'anal-insight-balance-ok-text'   : '% balance. Benson is rarely satisfied, but this looks fine.',
    'anal-insight-balance-warn-title': 'Workload Slightly Skewed',
    'anal-insight-balance-warn-text' : '% balance. Still okay, but redistributing tasks could help.',
    'anal-insight-balance-bad-title' : 'Seriously Unbalanced!',
    'anal-insight-balance-bad-text'  : '% balance. Use "Smart Assign" in the Team tab to rebalance.',
    'anal-insight-bottleneck-title'  : 'Bottleneck Detected!',
    'anal-insight-bottleneck-text'   : 'is overloaded. This hurts quality and may cause delays.',
    'anal-insight-underuse-title'    : 'Underutilized Team Members',
    'anal-insight-underuse-text'     : 'has lots of free capacity. Assign more tasks to boost efficiency.',
    'anal-insight-gap-title'         : 'Large Efficiency Gap',
    'anal-insight-highrate-title'    : 'High-Priority Task Rate',
    'anal-insight-highrate-good'     : 'Benson is temporarily satisfied.',
    'anal-insight-highrate-bad'      : 'Many urgent tasks are still unhandled! Benson is watching.',
    'anal-insight-assign-title'      : 'Assignment Optimization',
    'anal-insight-assign-text'       : 'tasks unassigned. Go to Team → "Smart Assign" for AI suggestions.',
    'anal-priority-high'             : '🔴 High',
    'anal-priority-mid'              : '🟡 Medium',
    'anal-priority-low'              : '⚪ Low',
    'anal-status-done'               : '✅ Done',
    'anal-status-doing'              : '⚡ In Progress',
    'anal-status-todo'               : '📋 To Do',
    'anal-status-overdue'            : '⏰ Overdue',
    'anal-days'                      : ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    'anal-tooltip-created'           : 'Created',
    'anal-tooltip-done'              : 'Done',
    'anal-today'                     : 'Today',

    /* ===== SPRINT – DYNAMIC ===== */
    'sp-empty-title'     : 'No Sprints Yet!',
    'sp-empty-desc'      : 'Mordecai: "Eh... no rush." — Rigby: "Exactly!"',
    'sp-empty-hint'      : 'Hit "Create New Sprint" to get started.',
    'sp-badge-done'      : '✅ Completed',
    'sp-badge-active'    : '⚡ Running',
    'sp-badge-past'      : '💀 Ended',
    'sp-badge-upcoming'  : '🔜 Upcoming',
    'sp-no-tasks'        : 'No tasks in this sprint yet.',
    'sp-days-left'       : '',
    'sp-days-unit'       : 'd left',
    'sp-tasks-done'      : 'tasks done',
    'sp-delete-btn'      : '🗑️ Delete Sprint',
    'sp-no-tasks-modal'  : 'No tasks available. Create tasks first!',
    'sp-alert-name'      : 'Benson: NAME THE SPRINT! I do not run anonymous sprints!',
    'sp-alert-date'      : 'Please fill in start and end dates!',
    'sp-confirm-delete'  : 'Delete this sprint?',
    'sp-priority-high'   : 'high',
    'sp-priority-mid'    : 'medium',
    'sp-priority-low'    : 'low',

    /* ===== REPORTS – DYNAMIC ===== */
    'rp-mvp-none'        : 'Nobody has done anything yet 😅',
    'rp-mvp-done'        : 'tasks done',
    'rp-log-empty'       : 'No activity yet.',
    'rp-task-none'       : 'No tasks found.',
    'rp-status-todo'     : '📋 To Do',
    'rp-status-doing'    : '⚡ In Progress',
    'rp-status-done'     : '✅ Done',
    'rp-copy-success'    : '✓ COPIED! YYYEAHHH!',
    'rp-copy-btn-label'  : '📋 COPY REPORT',
    'rp-copy-fail'       : 'Copy failed. Benson is crying.',
    'rp-report-header'   : '📊 BROTHERKANBAN REPORT',
    'rp-copy-overview'   : '📌 OVERVIEW',
    'rp-copy-total'      : '• Total tasks',
    'rp-copy-done'       : '• Completed',
    'rp-copy-doing'      : '• In progress',
    'rp-copy-overdue'    : '• Overdue',
    'rp-copy-tasklist'   : '📋 TASK LIST',
    'rp-copy-mvp'        : '🏆 MVP',
    'rp-copy-unknown'    : 'Unknown',
  }
};

/**
 * Apply a language to the entire page
 * @param {string} lang - 'vi' or 'en'
 */
function applyLanguage(lang) {
  if (!TRANSLATIONS[lang]) return;
  document.documentElement.lang = lang;
  localStorage.setItem('bk-lang', lang);

  // Text content
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (TRANSLATIONS[lang][key] !== undefined) {
      el.textContent = TRANSLATIONS[lang][key];
    }
  });

  // HTML content (for elements with HTML tags inside)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (TRANSLATIONS[lang][key] !== undefined) {
      el.innerHTML = TRANSLATIONS[lang][key];
    }
  });

  // Placeholder attributes
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (TRANSLATIONS[lang][key] !== undefined) {
      el.placeholder = TRANSLATIONS[lang][key];
    }
  });

  // Update lang toggle button label
  const langBtn = document.getElementById('lang-toggle-btn');
  if (langBtn) {
    langBtn.textContent = lang === 'vi' ? '🇺🇸 EN' : '🇻🇳 VI';
    langBtn.title = lang === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt';
  }

  // Re-render all dynamic JS content after lang change
  const rerenderHooks = [
    'renderDashboard',
    '__boardRerenderOnLang',
    '__teamRerenderOnLang',
    '__analyticsRerenderOnLang',
    '__sprintRerenderOnLang',
    '__reportRerenderOnLang',
  ];
  rerenderHooks.forEach(name => {
    if (typeof window[name] === 'function') {
      setTimeout(window[name], 0);
    }
  });
}

/**
 * Toggle between vi ↔ en and persist choice
 */
function toggleLanguage() {
  const current = localStorage.getItem('bk-lang') || 'vi';
  applyLanguage(current === 'vi' ? 'en' : 'vi');
}

/**
 * Auto-apply saved language on every page load
 * Default: Vietnamese (because we are in THE PARK, bro)
 */
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('bk-lang') || 'vi';
  applyLanguage(saved);
});

/* ============================================================
 * THEME PERSISTENCE — Dark / Light Mode
 * Chạy ngay (synchronous IIFE) để tránh "flash of light mode"
 * khi chuyển trang. Mọi trang load lang.js đều được hưởng.
 * ============================================================ */
(function applyThemeImmediately() {
  const saved = localStorage.getItem('bk-theme');
  if (saved === 'dark') {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  }
})();

/**
 * Toggle Dark ↔ Light và lưu lại localStorage
 * Dùng chung cho mọi trang — gọi onclick="toggleTheme()"
 */
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.classList.contains('dark');
  if (isDark) {
    html.classList.remove('dark');
    html.classList.add('light');
    localStorage.setItem('bk-theme', 'light');
  } else {
    html.classList.add('dark');
    html.classList.remove('light');
    localStorage.setItem('bk-theme', 'dark');
  }
}
