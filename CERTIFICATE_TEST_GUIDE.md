# 🧪 CERTIFICATE MANAGEMENT - TEST GUIDE

## Pre-requisitos
- [ ] Supabase configurado
- [ ] Migration SQL executada: `MIGRATION_ADD_SUBTITLE_TO_CERTIFICATES.sql`
- [ ] Projeto compilando sem erros

## ✅ TESTE 1: Adicionar Novo Certificado via Admin

### Steps:
1. Navegue até: `http://localhost:3000/admin`
2. Clique na aba **"Chứng nhận"**
3. Clique no botão **"Thêm"** (verde)
4. Modal abre com form
5. Preencha os campos:
   - **Tiêu đề chính:** "Test Certified"
   - **Thẻ phụ:** "CHỨNG NHẬN KIỂM THỬ"
   - **Mô tả chi tiết:** "Este é um certificado de teste para validar a implementação."
   - **Ảnh:** Upload qualquer imagem (ou deixe em branco)
   - **Thứ tự hiển thị:** 10

6. Clique **"Lưu"**
7. Aguarde mensagem: "Thêm chứng nhận thành công!"

### ✅ Esperado:
- [x] Modal fecha
- [x] Nova certif aparece na lista
- [x] Toast notification aparece

---

## ✅ TESTE 2: Verificar Certificado na Trang chủ

### Steps:
1. Navegue até: `http://localhost:3000/` (Trang chủ)
2. Scroll até seção **"Chứng nhận chất lượng quốc tế"**
3. Procure pelo certificado "Test Certified"

### ✅ Esperado:
- [x] Certificado aparece na grid (3 colunas)
- [x] Mostra: Title, Subtitle, Description
- [x] Imagem carrega (ou ícone padrão)
- [x] Aparecem também 3 certificados padrão originais

---

## ✅ TESTE 3: Editar Certificado via Admin

### Steps:
1. Volta para `/admin` → aba "Chứng nhận"
2. Encontre o certificado "Test Certified"
3. Clique botão **"Sửa"** (lápis)
4. Modal abre com dados preenchidos
5. Mude: **Thẻ phụ** para "UPDATED SUBTITLE"
6. Clique **"Lưu"**
7. Aguarde: "Cập nhật chứng nhận thành công!"

### ✅ Esperado:
- [x] Modal fecha
- [x] Lista atualiza (mostra "UPDATED SUBTITLE")
- [x] Toast notification aparece

---

## ✅ TESTE 4: Verificar Atualização na Trang chủ

### Steps:
1. Navegue até: `http://localhost:3000/` (Trang chủ)
2. Scroll até seção de certificados
3. Procure "Test Certified"
4. Verifique se subtitle mudou para "UPDATED SUBTITLE"

### ✅ Esperado:
- [x] Dados atualizam sem refresh (revalidate funcionando)
- [x] Novo subtitle aparece
- [x] Outros certificados não são afetados

---

## ✅ TESTE 5: Deletar Certificado via Admin

### Steps:
1. Volta para `/admin` → aba "Chứng nhận"
2. Encontre "Test Certified"
3. Clique botão **"Xóa"** (lixeira)
4. Popup de confirmação aparece
5. Clique **"OK"** para confirmar
6. Aguarde: "Xóa thành công!"

### ✅ Esperado:
- [x] Certificado desaparece da lista
- [x] Toast notification aparece
- [x] Contagem total diminui em 1

---

## ✅ TESTE 6: Verificar Deleção na Trang chủ

### Steps:
1. Navegue até: `http://localhost:3000/` (Trang chủ)
2. Scroll até seção de certificados
3. Procure "Test Certified"

### ✅ Esperado:
- [x] Certificado desaparece
- [x] Apenas 3 certificados padrão aparecem (se nenhum outro foi criado)
- [x] Revalidate funcionou

---

## ✅ TESTE 7: Fallback para Certificados Padrão

### Steps:
1. (SOMENTE SE TIVER ACESSO A SUPABASE)
2. Supabase → SQL Editor
3. Execute: `DELETE FROM public.certificates;`
4. Navegue até: `http://localhost:3000/` (Trang chủ)
5. Scroll até seção de certificados

### ✅ Esperado:
- [x] 3 certificados padrão aparecem:
  1. Vegan Certified
  2. CGMP-ASEAN
  3. SLS Free
- [x] Cada um tem seu subtitle e descrição
- [x] Ícones aparecem (não branco em branco)

---

## ✅ TESTE 8: Revalidate Automático

### Steps:
1. Admin adiciona novo certificado
2. **NÃO REFRESHE** a Trang chủ
3. Aguarde ~5 segundos
4. Novo certificado deve aparecer automaticamente

### ✅ Esperado:
- [x] Sem necessidade de refresh manual
- [x] Dados aparecem automaticamente
- [x] Revalidate funcionou

---

## 🐛 Troubleshooting

### Problema: Certificado não aparece na Trang chủ
**Solução:**
- [ ] Verifique se migration SQL foi executada
- [ ] Check se campo `subtitle` existe em `certificates` table
- [ ] Verifique console para erros: `getCertificates()` error

### Problema: Imagem não carrega
**Solução:**
- [ ] Verifique se upload foi bem-sucedido
- [ ] Cheque URL da imagem em Supabase Storage
- [ ] Verifique permissões do bucket `orya-assets`

### Problema: Revalidate não funciona
**Solução:**
- [ ] Verifique se `/api/revalidate` route existe
- [ ] Check console para erros de fetch
- [ ] Verifique se paths estão corretos: `['/']`

### Problema: Modal não abre
**Solução:**
- [ ] Check console para erros JavaScript
- [ ] Verifique se CertificateModal.tsx compila sem erros
- [ ] Restart dev server: `npm run dev`

---

## 📊 Checklist de Teste Completo

- [ ] TESTE 1: Adicionar certificado ✅
- [ ] TESTE 2: Ver na Trang chủ ✅
- [ ] TESTE 3: Editar certificado ✅
- [ ] TESTE 4: Atualização revalidada ✅
- [ ] TESTE 5: Deletar certificado ✅
- [ ] TESTE 6: Deleção revalidada ✅
- [ ] TESTE 7: Fallback funciona ✅
- [ ] TESTE 8: Revalidate automático ✅

**Status:** ✅ READY FOR TESTING
