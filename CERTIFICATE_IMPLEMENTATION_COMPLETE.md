# Certificate Management - Implementation Complete ✅

## Overview
Sistema completo de gerenciamento de chứng nhận (certificados de qualidade) integrado entre Admin Dashboard e Trang chủ com dados dinâmicos.

## Arquivos Modificados

### 1. src/components/admin/CertificateModal.tsx
**Mudanças:**
- ✅ Adicionado campo `subtitle` (Thẻ phụ / Subtitle)
- ✅ Atualizado estado: `const [subtitle, setSubtitle] = useState("")`
- ✅ Atualizado useEffect para carregar subtitle
- ✅ Atualizado handleSubmit para incluir subtitle
- ✅ Form agora tem 5 campos:
  1. Tiêu đề chính (Title) - obrigatório
  2. Thẻ phụ / Subtitle - opcional
  3. Mô tả chi tiết (Description) - opcional
  4. Ảnh chứng nhận (Image) - upload com preview
  5. Thứ tự hiển thị (Sort Order) - número

### 2. src/lib/adminDbService.ts
**Mudanças:**
- ✅ Interface `Certificate` expandida com campos:
  - `title?: string` (para compatibilidade)
  - `subtitle: string | null`
- ✅ Função helper `revalidateHome()` adicionada
- ✅ Revalidate automático adicionado em:
  - `createCertificate()` - após criar
  - `updateCertificate()` - após atualizar
  - `deleteCertificate()` - após deletar

**Fluxo:**
1. Admin faz mudanças no certificado
2. CRUD function executa
3. Revalidate API é chamada automaticamente
4. Trang chủ (/) é revalidada
5. Usuários veem dados atualizados em tempo real

### 3. app/api/revalidate/route.ts
**Já existe e funciona:**
- Aceita POST requests
- Parâmetro: `{ paths: ['/'] }`
- Chama `revalidatePath()` para cada path
- Retorna `{ revalidated: true, paths, timestamp }`

### 4. src/components/home/QualityCertificates.tsx
**Transformação Completa:**
- ✅ Removido "use client" - Agora é Server Component
- ✅ Importado `getCertificates` de adminDbService
- ✅ Fetch de dados do banco de dados
- ✅ Lógica de fallback para certificados padrão
- ✅ Renderização dinâmica de certificados
- ✅ Suporte a imagens via `image_url`
- ✅ SEM `onError` em tags img (compatível com Server Component)

**Dados Padrão (Fallback):**
Se banco vazio, mostra 3 certificados padrão:
1. Vegan Certified - CHỨNG NHẬN THUẦN CHAY
2. CGMP-ASEAN - TIÊU CHUẨN SẢN XUẤT
3. SLS Free - KHÔNG CHẤT TẨY RỬA MẠNH

**Lógica:**
```typescript
const dbCertificates = await getCertificates();
const certificates = 
  dbCertificates?.length > 0 
    ? dbCertificates 
    : DEFAULT_CERTIFICATES;
```

## Fluxo Completo de Uso

### Admin Adding Certificate:
```
1. Admin → Dashboard → "Chứng nhận" tab
2. Click "Thêm" button
3. Modal abre
4. Preenche: Title, Subtitle, Description, Image, Sort Order
5. Click "Lưu"
6. CertificateManager.tsx → onSave() → createCertificate()
7. Dados salvos em Supabase
8. revalidateHome() chamada → /api/revalidate POST
9. Trang chủ revalidada
10. Usuários veem novo certificado
```

### Trang chủ Display:
```
1. Next.js carrega app/page.tsx
2. Chama <QualityCertificates /> (Server Component)
3. QualityCertificates chama getCertificates()
4. Se DB tem dados: mostra dados dinâmicos
5. Se DB vazio: mostra fallback 3 certificados padrão
6. Cards renderizadas com imagens, titles, subtitles, descriptions
```

## Database Schema (Supabase)

Tabela: `certificates`
```sql
id              UUID PRIMARY KEY
name            TEXT NOT NULL
subtitle        TEXT (NULL se não houver)
description     TEXT (NULL se não houver)
image_url       TEXT (NULL se não houver)
sort_order      INTEGER DEFAULT 0
created_at      TIMESTAMPTZ
updated_at      TIMESTAMPTZ
```

## Próximos Passos Recomendados

1. **Adicionar SQL Migration** (se ainda não existir `subtitle` na tabela):
```sql
ALTER TABLE public.certificates 
ADD COLUMN IF NOT EXISTS subtitle TEXT;
```

2. **Test Admin Flow:**
   - Ir para /admin → Chứng nhận
   - Adicionar novo certificado com subtitle e descrição
   - Verificar se aparece na Trang chủ
   - Editar certificado
   - Deletar certificado

3. **Verificar Revalidate:**
   - Adicionar log no console para confirmar revalidate chamado
   - Verificar em DevTools que dados estão atualizando

4. **Performance:**
   - getCertificates() agora é async - cache em ISR configurado
   - Revalidate path "/" dispara recriação da página
   - Fallback garante que site nunca fica vazio

## Notas Importantes

✅ **Server Component:** QualityCertificates agora é async - sem useState, useEffect, etc.
✅ **Sem onError:** Imagens renderizadas sem listener onError (compatível com Server Component)
✅ **Fallback Seguro:** Se DB falhar ou estiver vazio, mostra 3 certificados padrão
✅ **Revalidate Automático:** Após CRUD, homepage atualiza automaticamente
✅ **Backward Compatible:** Campo `name` mantido para compatibilidade
✅ **Subtitle Opcional:** Pode deixar vazio se não quiser subtitle

## Arquivos Checklist
- [x] src/components/admin/CertificateModal.tsx - Atualizado
- [x] src/lib/adminDbService.ts - Atualizado
- [x] src/components/home/QualityCertificates.tsx - Recriado
- [x] app/api/revalidate/route.ts - Verificado (já existe)
- [x] app/page.tsx - Sem mudanças necessárias
