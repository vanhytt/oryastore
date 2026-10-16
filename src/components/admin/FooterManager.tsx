'use client';
import { useState, useEffect } from 'react';
import { useRef } from 'react';
import { Loader2, Plus, Save, Trash2, Upload, X } from 'lucide-react';
import { uploadImage } from '@/src/lib/adminApi';
import {
  DEFAULT_FOOTER,
  isRecord,
  normalizeFooterData,
  type FooterData,
} from '@/src/lib/footerSettings';

const LOGO_IMAGE_TYPES = ['image/png', 'image/svg+xml', 'image/webp', 'image/jpeg'];
const MAX_LOGO_SIZE = 5 * 1024 * 1024;

export default function FooterManager() {
  const [data, setData] = useState<FooterData>(DEFAULT_FOOTER);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [logoUploadError, setLogoUploadError] = useState('');
  const logoInputRef = useRef<HTMLInputElement>(null);

  async function handleLogoUpload(file: File) {
    if (!LOGO_IMAGE_TYPES.includes(file.type)) {
      setLogoUploadError('Vui lòng chọn ảnh PNG, SVG, WebP hoặc JPG.');
      return;
    }
    if (file.size > MAX_LOGO_SIZE) {
      setLogoUploadError('Ảnh logo phải có dung lượng không quá 5MB.');
      return;
    }

    setLogoUploadError('');
    setUploadingLogo(true);
    try {
      const url = await uploadImage(file);
      setData((current) => ({
        ...current,
        brand: { ...current.brand, logo_url: url },
      }));
    } catch (error) {
      setLogoUploadError(error instanceof Error ? error.message : 'Không thể tải ảnh logo lên.');
    } finally {
      setUploadingLogo(false);
    }
  }

  async function loadFooterData() {
    try {
      const res = await fetch('/api/admin/settings');
      if (!res.ok) throw new Error(`Không thể tải cài đặt chân trang (${res.status})`);

      const settings: unknown = await res.json();
      if (!Array.isArray(settings)) throw new Error('Dữ liệu cài đặt chân trang không hợp lệ');

      const footerSetting = settings.find((setting) => isRecord(setting) && setting.key === 'footer_settings');
      if (isRecord(footerSetting)) {
        const savedValue = footerSetting.value === '' || footerSetting.value == null
          ? footerSetting.data
          : footerSetting.value;
        const parsedValue = typeof savedValue === 'string' ? JSON.parse(savedValue) : savedValue;
        return normalizeFooterData(parsedValue);
      }
      return DEFAULT_FOOTER;
    } catch (err) {
      console.error('Error loading footer data:', err);
      return DEFAULT_FOOTER;
    }
  }

  useEffect(() => {
    let isMounted = true;
    void loadFooterData().then((footerData) => {
      if (isMounted) {
        setData(footerData);
        setLoading(false);
      }
    });

    return () => { isMounted = false; };
  }, []);

  async function saveFooterData() {
    setSaving(true); setMessage('');
    try {
      const res = await fetch('/api/admin/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key: 'footer_settings', value: JSON.stringify(data), data }) });
      const result = await res.json();
      if (!res.ok || result.error) { setMessage('❌ Lỗi: ' + (result.error || 'Không rõ')); }
      else if (result.success || result.data) {
        setMessage('✅ Lưu thành công!');
        try { await fetch('/api/revalidate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ paths: ['/'] }) }); } catch (e) { console.warn('Revalidation warning:', e); }
        setTimeout(() => setMessage(''), 3000);
      } else { setMessage('❌ Không nhận được phản hồi'); }
    } catch (err) { setMessage('❌ Lỗi: ' + (err instanceof Error ? err.message : String(err))); console.error(err); }
    finally { setSaving(false); }
  }

  const updateProduct = (idx: number, field: 'name'|'link', val: string) => setData(p => ({...p, products: p.products.map((pr,i) => i===idx ? {...pr,[field]:val} : pr)}));
  const addProduct = () => setData(p => ({...p, products: [...p.products, {name:'',link:'#'}]}));
  const removeProduct = (idx: number) => setData(p => ({...p, products: p.products.filter((_,i) => i!==idx)}));
  const updateInfoLink = (idx: number, field: 'name'|'link', val: string) => setData(p => ({...p, info_links: p.info_links.map((l,i) => i===idx ? {...l,[field]:val} : l)}));
  const addInfoLink = () => setData(p => ({...p, info_links: [...p.info_links, {name:'',link:'#'}]}));
  const removeInfoLink = (idx: number) => setData(p => ({...p, info_links: p.info_links.filter((_,i) => i!==idx)}));
  const updatePolicyLink = (idx: number, field: 'name'|'link'|'content', val: string) => setData(p => ({...p, policy_links: p.policy_links.map((l,i) => i===idx ? {...l,[field]:val} : l)}));
  const addPolicyLink = () => setData(p => ({...p, policy_links: [...p.policy_links, {name:'',link:'',content:''}]}));
  const removePolicyLink = (idx: number) => setData(p => ({...p, policy_links: p.policy_links.filter((_,i) => i!==idx)}));

  if (loading) return <div className="p-8 text-center">Đang tải...</div>;

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-green-700 mb-2">⚙️ Cài đặt Chân trang</h1>
      <p className="text-gray-600 mb-6">Quản lý 4 cột footer như orya.vn</p>
      {message && <div className={`mb-6 p-4 rounded-lg ${message.includes('✅')?'bg-green-100 text-green-800':'bg-red-100 text-red-800'}`}>{message}</div>}

        {/* COL 1: BRAND + SOCIAL */}
        <div className="border-l-4 border-green-500 pl-4"><h2 className="text-lg font-bold text-green-700 mb-2">🎯 Thương Hiệu</h2>
          <label className="text-xs font-semibold">Logo</label>
          <div className="mb-2 space-y-2">
            <input
              ref={logoInputRef}
              type="file"
              accept={LOGO_IMAGE_TYPES.join(',')}
              disabled={uploadingLogo}
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void handleLogoUpload(file);
                event.currentTarget.value = '';
              }}
              className="hidden"
            />
            {data.brand.logo_url ? (
              <div className="overflow-hidden rounded border border-gray-300">
                <div className="grid min-h-24 grid-cols-2">
                  <div className="flex items-center justify-center bg-gray-900 p-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={data.brand.logo_url} alt="Xem trước logo trên nền tối" className="max-h-16 max-w-full object-contain" />
                  </div>
                  <div className="flex items-center justify-center bg-white p-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={data.brand.logo_url} alt="Xem trước logo trên nền sáng" className="max-h-16 max-w-full object-contain" />
                  </div>
                </div>
                <div className="flex gap-2 border-t bg-gray-50 p-2">
                  <button
                    type="button"
                    onClick={() => logoInputRef.current?.click()}
                    disabled={uploadingLogo}
                    className="inline-flex items-center gap-1 rounded bg-green-600 px-2 py-1 text-xs font-semibold text-white hover:bg-green-700 disabled:cursor-wait disabled:opacity-60"
                  >
                    {uploadingLogo ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                    {uploadingLogo ? 'Đang tải...' : 'Thay ảnh'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLogoUploadError('');
                      setData((current) => ({
                        ...current,
                        brand: { ...current.brand, logo_url: '' },
                      }));
                    }}
                    disabled={uploadingLogo}
                    className="inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-1 text-xs text-gray-700 hover:bg-gray-100 disabled:opacity-60"
                  >
                    <X size={14} /> Xóa
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => logoInputRef.current?.click()}
                disabled={uploadingLogo}
                className="flex w-full items-center justify-center gap-2 rounded border-2 border-dashed border-gray-300 bg-gray-50 px-3 py-4 text-sm font-semibold text-gray-700 hover:border-green-500 hover:bg-green-50 disabled:cursor-wait"
              >
                {uploadingLogo ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                {uploadingLogo ? 'Đang tải...' : 'Tải ảnh Logo'}
              </button>
            )}
            <p className="text-[11px] text-gray-500">PNG, SVG, WebP hoặc JPG, tối đa 5MB.</p>
            {logoUploadError && <p role="alert" className="text-xs text-red-600">{logoUploadError}</p>}
            <label htmlFor="footer-logo-url" className="block text-xs font-medium text-gray-600">Hoặc nhập URL ảnh</label>
            <input
              id="footer-logo-url"
              type="url"
              value={data.brand.logo_url || ''}
              onChange={(event) => setData((current) => ({
                ...current,
                brand: { ...current.brand, logo_url: event.target.value },
              }))}
              className="mb-2 w-full rounded border px-2 py-1 text-xs"
              placeholder="https://..."
            />
          </div>
          <label className="text-xs font-semibold">Mô Tả</label>
          <textarea value={data?.brand?.description || ''} onChange={e => setData(p => ({...p, brand: {...p.brand, description: e.target.value}}))} className="w-full px-2 py-1 text-xs border rounded mb-2" rows={2} />
          <label className="text-xs font-semibold">CGMP</label>
          <textarea value={data?.brand?.cgmp_text || ''} onChange={e => setData(p => ({...p, brand: {...p.brand, cgmp_text: e.target.value}}))} className="w-full px-2 py-1 text-xs border rounded mb-2" rows={2} />
          <div className="pt-2 border-t"><h3 className="text-xs font-bold mb-1">📱 Social</h3>
            <input type="url" value={data?.social?.facebook || ''} onChange={e => setData(p => ({...p, social: {...p.social, facebook: e.target.value}}))} className="w-full px-2 py-1 text-xs border rounded mb-1" placeholder="Facebook" />
            <input type="url" value={data?.social?.shopee || ''} onChange={e => setData(p => ({...p, social: {...p.social, shopee: e.target.value}}))} className="w-full px-2 py-1 text-xs border rounded mb-1" placeholder="Shopee" />
            <input type="url" value={data?.social?.tiktok || ''} onChange={e => setData(p => ({...p, social: {...p.social, tiktok: e.target.value}}))} className="w-full px-2 py-1 text-xs border rounded" placeholder="TikTok" />
          </div>
        </div>

        {/* COL 2: PRODUCTS */}
        <div className="border-l-4 border-green-500 pl-4"><h2 className="text-lg font-bold text-green-700 mb-2">🛍️ Sản Phẩm</h2>
          <div className="space-y-1 max-h-72 overflow-y-auto pr-2">
            {data.products.map((p, i) => (
              <div key={i} className="p-1 bg-gray-50 rounded"><input type="text" value={p.name} onChange={e => updateProduct(i,'name',e.target.value)} className="w-full px-1 py-0.5 text-xs border rounded mb-0.5" placeholder="Tên" />
                <div className="flex gap-0.5"><input type="text" value={p.link} onChange={e => updateProduct(i,'link',e.target.value)} className="flex-1 px-1 py-0.5 text-xs border rounded" placeholder="Link" />
                  <button onClick={() => removeProduct(i)} className="px-1 py-0.5 bg-red-500 text-white rounded text-xs"><Trash2 size={10} /></button></div>
              </div>
            ))}
          </div>
          <button onClick={addProduct} className="w-full mt-1 px-2 py-1 bg-green-500 text-white rounded text-xs font-semibold flex items-center justify-center gap-1"><Plus size={12} /> Thêm</button>
        </div>

        {/* COL 3: INFO + POLICIES */}
        <div className="lg:col-span-2 border-l-4 border-green-500 pl-4"><div className="grid grid-cols-2 gap-2">
          {/* Info */}
          <div><h2 className="text-lg font-bold text-green-700 mb-2">ℹ️ Thông Tin</h2>
            <div className="space-y-1 max-h-72 overflow-y-auto pr-2">
              {data.info_links.map((l, i) => (
                <div key={i} className="p-1 bg-gray-50 rounded"><input type="text" value={l.name} onChange={e => updateInfoLink(i,'name',e.target.value)} className="w-full px-1 py-0.5 text-xs border rounded mb-0.5" placeholder="Tiêu đề" />
                  <div className="flex gap-0.5"><input type="text" value={l.link} onChange={e => updateInfoLink(i,'link',e.target.value)} className="flex-1 px-1 py-0.5 text-xs border rounded" placeholder="Link" />
                    <button onClick={() => removeInfoLink(i)} className="px-1 py-0.5 bg-red-500 text-white rounded text-xs"><Trash2 size={10} /></button></div>
                </div>
              ))}
            </div>
            <button onClick={addInfoLink} className="w-full mt-1 px-2 py-1 bg-green-500 text-white rounded text-xs font-semibold flex items-center justify-center gap-1"><Plus size={12} /> Thêm</button>
          </div>
          {/* Policies */}
          <div><h2 className="text-lg font-bold text-green-700 mb-2">📋 Chính Sách</h2>
            <p className="mb-2 text-xs text-gray-500">Nội dung mẫu cần được rà soát trước khi công bố.</p>
            <div className="space-y-1 max-h-72 overflow-y-auto pr-2">
              {data.policy_links.map((l, i) => (
                <div key={i} className="space-y-1 rounded bg-gray-50 p-2">
                  <input
                    type="text"
                    value={l.name}
                    onChange={e => updatePolicyLink(i,'name',e.target.value)}
                    className="w-full rounded border px-2 py-1 text-xs"
                    placeholder="Tên chính sách"
                    aria-label={`Tên chính sách ${i + 1}`}
                  />
                  <div className="flex gap-1">
                    <input
                      type="text"
                      value={l.link}
                      onChange={e => updatePolicyLink(i,'link',e.target.value)}
                      className="min-w-0 flex-1 rounded border px-2 py-1 text-xs"
                      placeholder="Slug hoặc ID"
                      aria-label={`Đường dẫn chính sách ${i + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removePolicyLink(i)}
                      className="rounded bg-red-500 px-2 py-1 text-xs text-white"
                      aria-label={`Xóa ${l.name || `chính sách ${i + 1}`}`}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                  <textarea
                    value={l.content}
                    onChange={e => updatePolicyLink(i,'content',e.target.value)}
                    className="w-full rounded border px-2 py-1 text-xs"
                    placeholder="Nội dung chi tiết chính sách"
                    aria-label={`Nội dung chính sách ${i + 1}`}
                    rows={5}
                  />
                </div>
              ))}
            </div>
            <button onClick={addPolicyLink} className="w-full mt-1 px-2 py-1 bg-green-500 text-white rounded text-xs font-semibold flex items-center justify-center gap-1"><Plus size={12} /> Thêm</button>
          </div>
        </div></div>

        {/* COL 4: CONTACT + FOOTER BOTTOM */}
        <div className="border-l-4 border-green-500 pl-4"><h2 className="text-lg font-bold text-green-700 mb-2">📞 Liên Hệ</h2>
          <label className="text-xs font-semibold">Địa Chỉ</label>
          <textarea value={data?.contact?.address || ''} onChange={e => setData(p => ({...p, contact: {...p.contact, address: e.target.value}}))} className="w-full px-2 py-1 text-xs border rounded mb-2" rows={2} />
          <label className="text-xs font-semibold">Hotline</label>
          <input type="tel" value={data?.contact?.hotline || ''} onChange={e => setData(p => ({...p, contact: {...p.contact, hotline: e.target.value}}))} className="w-full px-2 py-1 text-xs border rounded mb-2" />
          <label className="text-xs font-semibold">Email</label>
          <input type="email" value={data?.contact?.email || ''} onChange={e => setData(p => ({...p, contact: {...p.contact, email: e.target.value}}))} className="w-full px-2 py-1 text-xs border rounded mb-2" />
          <div className="pt-2 border-t"><h3 className="text-sm font-bold text-green-700 mb-1">📄 Chân Trang</h3>
            <label className="text-xs font-semibold">Copyright</label>
            <input type="text" value={data?.footer_bottom?.copyright || ''} onChange={e => setData(p => ({...p, footer_bottom: {...p.footer_bottom, copyright: e.target.value}}))} className="w-full px-2 py-1 text-xs border rounded mb-2" />
            <label className="text-xs font-semibold">Disclaimer</label>
            <textarea value={data?.footer_bottom?.disclaimer || ''} onChange={e => setData(p => ({...p, footer_bottom: {...p.footer_bottom, disclaimer: e.target.value}}))} className="w-full px-2 py-1 text-xs border rounded" rows={2} />
          </div>
        </div>

      {/* Save Button */}
      <div className="flex justify-end gap-3 mt-6">
        <button onClick={saveFooterData} disabled={saving} className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 flex items-center gap-2 font-semibold">
          <Save size={18} /> {saving ? 'Đang lưu...' : '💾 Lưu Thay Đổi'}
        </button>
      </div>
    </div>
  );
}
