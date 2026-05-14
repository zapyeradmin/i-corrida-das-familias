## Objetivo

Aplicar a nova identidade de cores em todo o site, substituindo o azul antigo (blue-600, #2563EB, #1E40AF, etc.) pela paleta oficial roxo + laranja, garantindo contraste correto em cada tipo de fundo.

## O que já foi feito

- Tokens semânticos no `src/styles/theme.css` (--brand-primary/secondary/dark/light, --bg-1/2/3, --title-1/2/3, --text-1/2/3).
- Classes Tailwind: `bg-brand-*`, `bg-surface-{1,2,3}`.
- Fundo da página inicial e gradiente da seção de inscrição.
- Memória do projeto atualizada.

## O que falta (esta etapa)

Substituir o azul hardcoded nos componentes restantes para que toda a UI siga a nova paleta.

### 1. Seções públicas (landing)
- `Navbar.tsx` + `NavbarUpdates.tsx` — fundo, links, hover, menu mobile usam tons de azul.
- `Hero.tsx` (componente legado) — gradientes/azuis remanescentes.
- `ui/hero.tsx` — botão CTA atualmente cyan→blue; trocar para `brand-primary`→`brand-secondary` e ajustar destaques.
- `About.tsx`, `KitsAtletas.tsx`, `Timeline.tsx`, `CourseMap.tsx`, `Sponsors.tsx`, `FAQ.tsx`, `Footer.tsx` — alternar fundos entre Background 1/2/3 conforme padrão visual e aplicar título/texto correspondente.
- `RegistrationForm.tsx` — usar fundo 3 (roxo) com texto branco e título laranja.

### 2. Áreas autenticadas
- `Dashboard.tsx`, `AthleteDashboard.tsx`, dashboard cards (`DashboardHeader`, `DashboardStats`, `EventInfoCard`, `RegistrationInfoCard`, `AthleteInfoCard`) — substituir azuis por brand-primary/dark.
- `Auth.tsx`, `AthleteLogin.tsx`, `PixPayment.tsx`, `CardPayment.tsx`, `NotFound.tsx` — mesmo tratamento.
- `PrivateRoute.tsx` / `AthletePrivateRoute.tsx` — spinners e estados de loading.

### 3. Componentes UI compartilhados
- `ui/button.tsx` — variant `homeButton` hoje é gradient blue; trocar para gradient brand-primary→brand-secondary.
- `ui/accordion.tsx` — destaques azuis → brand-primary.

### 4. Estilos globais
- `styles/components.css` — revisar `.gradient-text`, `.cta-button`, `.feature-card`, `.timeline-item`, `.header-scrolled` (ainda referenciam #3B82F6, #2563EB, etc.) e converter para a nova paleta.

## Padrão de aplicação por seção

```text
Background 1 (#e3e3e4)  →  Título #830bc2  / Texto #480c70
Background 2 (#ff5300)  →  Título #480c70  / Texto #ffffff
Background 3 (#431181)  →  Título #ff5300  / Texto #ffffff
```

Será usado via classes utilitárias já criadas (`bg-surface-1/2/3`) + `text-[hsl(var(--title-X))]` / `text-[hsl(var(--text-X))]`. Onde fizer sentido, alternar seções para criar ritmo visual (ex.: About em bg-1, Kits em bg-3, Timeline em bg-1, Course em bg-2, Sponsors em bg-1, FAQ em bg-3).

## Fora de escopo

- Mudanças funcionais (lógica, formulários, rotas).
- Reescrita de layout/animações dos componentes.
- Logo da navbar continua branco/fixo conforme regra existente.

## Validação

Após as alterações, abrir o preview e percorrer landing → login → dashboard verificando que nenhum azul antigo aparece e que o contraste texto/fundo está legível em todas as seções.
