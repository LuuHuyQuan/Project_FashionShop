import React, { useState } from 'react';
import { Settings, Store, Bell, Shield, Palette, Globe, Save, Check, Mail, Phone, MapPin, CreditCard, Truck, RefreshCcw, Eye, EyeOff } from 'lucide-react';

type SettingTab = 'store' | 'notifications' | 'security' | 'appearance' | 'payments' | 'shipping';

const tabs: { key: SettingTab; label: string; icon: React.ElementType }[] = [
  { key: 'store', label: 'Cửa hàng', icon: Store },
  { key: 'notifications', label: 'Thông báo', icon: Bell },
  { key: 'security', label: 'Bảo mật', icon: Shield },
  { key: 'appearance', label: 'Giao diện', icon: Palette },
  { key: 'payments', label: 'Thanh toán', icon: CreditCard },
  { key: 'shipping', label: 'Vận chuyển', icon: Truck },
];

const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingTab>('store');
  const [saved, setSaved] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [storeName, setStoreName] = useState('FashionStore Vietnam');
  const [storeEmail, setStoreEmail] = useState('contact@fashionstore.vn');
  const [storePhone, setStorePhone] = useState('1800 1234');
  const [storeAddress, setStoreAddress] = useState('123 Lê Lợi, Q.1, TP. Hồ Chí Minh');
  const [storeDesc, setStoreDesc] = useState('Thương hiệu thời trang hàng đầu Việt Nam.');
  const [currency, setCurrency] = useState('VND');
  const [language, setLanguage] = useState('vi');

  const [notifNewOrder, setNotifNewOrder] = useState(true);
  const [notifLowStock, setNotifLowStock] = useState(true);
  const [notifNewUser, setNotifNewUser] = useState(false);
  const [notifReview, setNotifReview] = useState(true);
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifSMS, setNotifSMS] = useState(false);

  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [twoFactor, setTwoFactor] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('60');

  const [accentColor, setAccentColor] = useState('#667eea');
  const [darkMode, setDarkMode] = useState(false);
  const [compactMode, setCompactMode] = useState(false);

  const [enableCOD, setEnableCOD] = useState(true);
  const [enableVNPay, setEnableVNPay] = useState(true);
  const [enableMoMo, setEnableMoMo] = useState(true);
  const [enableBank, setEnableBank] = useState(true);

  const [freeShipThreshold, setFreeShipThreshold] = useState('500000');
  const [defaultShipFee, setDefaultShipFee] = useState('30000');
  const [enableExpressShip, setEnableExpressShip] = useState(true);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const inputClass = 'w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50 border border-slate-200 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-violet-400 focus:bg-white transition-all';
  const labelClass = 'block text-sm font-medium text-slate-600 mb-2';

  const Toggle: React.FC<{ value: boolean; onChange: (v: boolean) => void }> = ({ value, onChange }) => (
    <button type="button" onClick={() => onChange(!value)}
      className="relative w-11 h-6 rounded-full transition-all duration-300 flex-shrink-0"
      style={{ background: value ? 'linear-gradient(135deg, #667eea, #764ba2)' : '#e2e8f0' }}>
      <span className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300"
        style={{ transform: value ? 'translateX(20px)' : 'translateX(0)' }} />
    </button>
  );

  const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden" style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
      <div className="px-5 py-4 border-b border-slate-100"><h3 className="font-semibold text-slate-800 text-sm">{title}</h3></div>
      <div className="p-5 space-y-4">{children}</div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Cài đặt hệ thống</h1>
          <p className="text-slate-500 text-sm mt-1">Quản lý cấu hình cửa hàng và hệ thống</p>
        </div>
        <button onClick={handleSave} id="btn-save-settings"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ background: saved ? 'linear-gradient(135deg, #43e97b, #38f9d7)' : 'linear-gradient(135deg, #667eea, #764ba2)' }}>
          {saved ? <><Check size={16} /> Đã lưu</> : <><Save size={16} /> Lưu thay đổi</>}
        </button>
      </div>

      <div className="flex gap-6">
        <div className="w-52 flex-shrink-0 bg-white rounded-2xl border border-slate-100 p-2 h-fit" style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mb-0.5 text-left"
                style={isActive ? { background: '#ede9fe', color: '#7c3aed', border: '1px solid #ddd6fe' } : { color: '#64748b', border: '1px solid transparent' }}>
                <tab.icon size={16} />{tab.label}
              </button>
            );
          })}
        </div>

        <div className="flex-1 space-y-4">
          {activeTab === 'store' && (
            <>
              <Section title="Thông tin cửa hàng">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Tên cửa hàng</label>
                    <input id="store-name" type="text" value={storeName} onChange={(e) => setStoreName(e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}><Mail size={13} className="inline mr-1" />Email</label>
                    <input type="email" value={storeEmail} onChange={(e) => setStoreEmail(e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}><Phone size={13} className="inline mr-1" />Hotline</label>
                    <input type="text" value={storePhone} onChange={(e) => setStorePhone(e.target.value)} className={inputClass} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}><MapPin size={13} className="inline mr-1" />Địa chỉ</label>
                    <input type="text" value={storeAddress} onChange={(e) => setStoreAddress(e.target.value)} className={inputClass} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Mô tả cửa hàng</label>
                    <textarea value={storeDesc} onChange={(e) => setStoreDesc(e.target.value)} rows={3} className={inputClass + ' resize-none'} />
                  </div>
                </div>
              </Section>
              <Section title="Khu vực & Ngôn ngữ">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}><Globe size={13} className="inline mr-1" />Ngôn ngữ</label>
                    <select value={language} onChange={(e) => setLanguage(e.target.value)} className={inputClass + ' appearance-none'}>
                      <option value="vi">Tiếng Việt</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Tiền tệ</label>
                    <select value={currency} onChange={(e) => setCurrency(e.target.value)} className={inputClass + ' appearance-none'}>
                      <option value="VND">VND (₫)</option>
                      <option value="USD">USD ($)</option>
                    </select>
                  </div>
                </div>
              </Section>
            </>
          )}

          {activeTab === 'notifications' && (
            <>
              <Section title="Sự kiện thông báo">
                {[
                  { label: 'Đơn hàng mới', value: notifNewOrder, onChange: setNotifNewOrder },
                  { label: 'Cảnh báo hàng sắp hết', value: notifLowStock, onChange: setNotifLowStock },
                  { label: 'Người dùng mới đăng ký', value: notifNewUser, onChange: setNotifNewUser },
                  { label: 'Đánh giá mới', value: notifReview, onChange: setNotifReview },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-1">
                    <p className="text-sm text-slate-700">{item.label}</p>
                    <Toggle value={item.value} onChange={item.onChange} />
                  </div>
                ))}
              </Section>
              <Section title="Kênh thông báo">
                <div className="flex items-center justify-between py-1">
                  <div>
                    <p className="text-sm text-slate-700">Thông báo qua Email</p>
                    <p className="text-xs text-slate-400 mt-0.5">Gửi email tới admin@fashionstore.vn</p>
                  </div>
                  <Toggle value={notifEmail} onChange={setNotifEmail} />
                </div>
                <div className="flex items-center justify-between py-1">
                  <div>
                    <p className="text-sm text-slate-700">Thông báo qua SMS</p>
                    <p className="text-xs text-slate-400 mt-0.5">Gửi SMS tới số điện thoại đăng ký</p>
                  </div>
                  <Toggle value={notifSMS} onChange={setNotifSMS} />
                </div>
              </Section>
            </>
          )}

          {activeTab === 'security' && (
            <>
              <Section title="Đổi mật khẩu">
                <div>
                  <label className={labelClass}>Mật khẩu hiện tại</label>
                  <div className="relative">
                    <input type={showPassword ? 'text' : 'password'} value={currentPass} onChange={(e) => setCurrentPass(e.target.value)} placeholder="Nhập mật khẩu hiện tại..." className={inputClass + ' pr-10'} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Mật khẩu mới</label>
                  <input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} placeholder="Tối thiểu 8 ký tự..." className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Xác nhận mật khẩu mới</label>
                  <input type="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} placeholder="Nhập lại mật khẩu mới..." className={inputClass} />
                </div>
                <button className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>
                  Cập nhật mật khẩu
                </button>
              </Section>
              <Section title="Xác thực & Phiên đăng nhập">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-700">Xác thực 2 bước (2FA)</p>
                    <p className="text-xs text-slate-400 mt-0.5">Tăng cường bảo mật tài khoản</p>
                  </div>
                  <Toggle value={twoFactor} onChange={setTwoFactor} />
                </div>
                <div>
                  <label className={labelClass}>Thời gian tự đăng xuất (phút)</label>
                  <select value={sessionTimeout} onChange={(e) => setSessionTimeout(e.target.value)} className={inputClass + ' appearance-none'}>
                    {['15', '30', '60', '120', '480'].map((v) => <option key={v} value={v}>{v} phút</option>)}
                  </select>
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 border border-red-200 hover:bg-red-50 transition-all">
                  <RefreshCcw size={14} /> Đăng xuất tất cả thiết bị
                </button>
              </Section>
            </>
          )}

          {activeTab === 'appearance' && (
            <>
              <Section title="Chủ đề & Màu sắc">
                <div>
                  <label className={labelClass}>Màu chủ đạo (Accent)</label>
                  <div className="flex gap-3 mt-1">
                    {['#667eea', '#f093fb', '#4facfe', '#43e97b', '#fa709a', '#ffc107'].map((color) => (
                      <button key={color} type="button" onClick={() => setAccentColor(color)} className="w-9 h-9 rounded-xl transition-all"
                        style={{ background: color, border: accentColor === color ? '3px solid #1e293b' : '2px solid #e2e8f0', transform: accentColor === color ? 'scale(1.2)' : 'scale(1)' }} />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-700">Chế độ tối (Dark Mode)</p>
                    <p className="text-xs text-slate-400 mt-0.5">Giao diện tối cho admin panel</p>
                  </div>
                  <Toggle value={darkMode} onChange={setDarkMode} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-700">Chế độ thu gọn (Compact)</p>
                    <p className="text-xs text-slate-400 mt-0.5">Hiển thị nhiều thông tin hơn</p>
                  </div>
                  <Toggle value={compactMode} onChange={setCompactMode} />
                </div>
              </Section>
              <Section title="Xem trước">
                <div className="rounded-xl border border-slate-200 p-4 bg-slate-50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: accentColor + '22' }}>
                      <Settings size={16} style={{ color: accentColor }} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">Xem trước màu chủ đạo</p>
                      <p className="text-xs text-slate-400">Màu sẽ áp dụng cho toàn bộ admin panel</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 rounded-lg text-white text-sm font-semibold" style={{ background: accentColor }}>Button mẫu</button>
                </div>
              </Section>
            </>
          )}

          {activeTab === 'payments' && (
            <Section title="Phương thức thanh toán">
              {[
                { label: 'COD (Thanh toán khi nhận hàng)', desc: 'Khách trả tiền mặt khi nhận hàng', value: enableCOD, onChange: setEnableCOD },
                { label: 'VNPay', desc: 'Thanh toán qua cổng VNPay', value: enableVNPay, onChange: setEnableVNPay },
                { label: 'MoMo', desc: 'Thanh toán qua ví MoMo', value: enableMoMo, onChange: setEnableMoMo },
                { label: 'Chuyển khoản ngân hàng', desc: 'Chuyển khoản qua tài khoản ngân hàng', value: enableBank, onChange: setEnableBank },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0">
                  <div>
                    <p className="text-sm text-slate-700 font-medium">{item.label}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                  </div>
                  <Toggle value={item.value} onChange={item.onChange} />
                </div>
              ))}
            </Section>
          )}

          {activeTab === 'shipping' && (
            <>
              <Section title="Cấu hình vận chuyển">
                <div>
                  <label className={labelClass}>Ngưỡng miễn phí vận chuyển (đ)</label>
                  <input type="number" value={freeShipThreshold} onChange={(e) => setFreeShipThreshold(e.target.value)} min={0} className={inputClass} />
                  <p className="text-xs text-slate-400 mt-1">Đơn hàng trên {Number(freeShipThreshold).toLocaleString('vi-VN')}đ sẽ được miễn phí ship</p>
                </div>
                <div>
                  <label className={labelClass}>Phí vận chuyển mặc định (đ)</label>
                  <input type="number" value={defaultShipFee} onChange={(e) => setDefaultShipFee(e.target.value)} min={0} className={inputClass} />
                </div>
                <div className="flex items-center justify-between py-1">
                  <div>
                    <p className="text-sm text-slate-700">Giao hàng nhanh (Express)</p>
                    <p className="text-xs text-slate-400 mt-0.5">Giao trong 2-4 giờ (phụ phí thêm)</p>
                  </div>
                  <Toggle value={enableExpressShip} onChange={setEnableExpressShip} />
                </div>
              </Section>
              <Section title="Đối tác vận chuyển">
                {['GHN (Giao Hàng Nhanh)', 'GHTK (Giao Hàng Tiết Kiệm)', 'Viettel Post', 'Vietnam Post'].map((partner, i) => (
                  <div key={partner} className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold text-white"
                        style={{ background: ['linear-gradient(135deg,#667eea,#764ba2)', 'linear-gradient(135deg,#f093fb,#f5576c)', 'linear-gradient(135deg,#4facfe,#00f2fe)', 'linear-gradient(135deg,#43e97b,#38f9d7)'][i] }}>
                        {partner.charAt(0)}
                      </div>
                      <span className="text-sm text-slate-700">{partner}</span>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: '#dcfce7', color: '#16a34a' }}>Đã kết nối</span>
                  </div>
                ))}
              </Section>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
