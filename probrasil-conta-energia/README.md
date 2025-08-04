# 🌟 PRÓBRASIL - Sistema de Gestão de Contas de Energia

> Sistema completo de gestão energética com IA para empresas que utilizam energia solar renovável

## 📋 Sobre o Projeto

Sistema empresarial abrangente que evoluiu de uma conta de energia individual para uma plataforma completa de gestão energética. Combina análises avançadas, automação inteligente e gestão de múltiplas unidades consumidoras.

### 🎯 Principais Funcionalidades

- **Dashboard Empresarial** com KPIs em tempo real
- **Gestão de Múltiplas Unidades** (Residencial, Comercial, Industrial)
- **Análises Avançadas** com gráficos interativos
- **IA & Automação** para otimização energética
- **Sistema de Notificações** inteligente
- **Central de Suporte** completa
- **Configurações Avançadas** personalizáveis

## 🚀 Tecnologias

### Core
- **React 19** - Framework principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Bun** - Package manager

### UI/UX
- **Tailwind CSS V4** - Framework de estilização
- **ShadCN UI** - Componentes base
- **Lucide React** - Ícones SVG
- **Animações CSS** customizadas

### Gráficos
- **Chart.js 4.5.0** - Biblioteca principal
- **react-chartjs-2 5.3.0** - Wrapper React
- **7 tipos de visualizações** diferentes

## 🔧 Configuração do Ambiente

### Pré-requisitos
- Node.js 20+
- Bun (package manager)

### Instalação

```bash
# Clonar o repositório
git clone <repository-url>
cd probrasil-conta-energia

# Instalar dependências
bun install

# Executar em desenvolvimento
bun run dev

# Build para produção
bun run build

# Preview da build
bun run preview
```

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── ui/                 # Componentes ShadCN
│   ├── Charts.tsx          # Gráficos básicos
│   ├── AdvancedAnalytics.tsx # Análises avançadas
│   ├── SmartEnergyManager.tsx # IA & Automação
│   └── MainSystem.tsx      # Sistema principal
├── hooks/                  # React hooks customizados
├── lib/                   # Utilitários
└── index.css             # Estilos globais
```

## 🎨 Design System

### Cores Principais
- **Amarelo PRÓBRASIL**: `#FFD700` (energia renovável)
- **Azul Escuro**: `#2C3E50` (tipografia)
- **Verde Economia**: `#22C55E` (indicadores positivos)
- **Vermelho Consumo**: `#EF4444` (indicadores de alerta)

### Componentes
- **8 módulos principais** de navegação
- **Responsividade completa** (mobile-first)
- **Animações suaves** e transições
- **Sistema de temas** (claro/escuro)

## 📊 Módulos do Sistema

### 1. Dashboard
- KPIs consolidados
- Visão geral das unidades
- Gráficos de performance

### 2. Gestão de Contas
- Filtros avançados
- Exportação PDF
- Histórico completo
- Metas de economia

### 3. Unidades Consumidoras
- 3 tipos: Residencial, Comercial, Industrial
- Status dinâmico
- Métricas individuais

### 4. Relatórios
- 4 tipos de gráficos básicos
- Performance anual
- Impacto ambiental

### 5. Análises Avançadas
- Tendências anuais
- Benchmark de mercado
- Padrões de consumo 24h
- Recomendações automáticas

### 6. IA & Automação
- 4 regras de automação
- Previsões meteorológicas
- Monitoramento de dispositivos
- Alertas inteligentes

### 7. Notificações
- Sistema de alertas
- Histórico completo
- Configurações personalizáveis

### 8. Suporte
- FAQ completo
- Sistema de tickets
- Contatos diretos
- Recursos educacionais

## 📈 Dados e Métricas

### Unidades Exemplo
- **Residência Atalaia**: 1.767 kWh, economia R$ 279,50
- **Escritório Centro**: 2.340 kWh, economia R$ 387,22
- **Galpão Industrial**: 8.950 kWh, economia R$ 1.456,80

### Totais Consolidados
- **13.057 kWh** consumo total
- **R$ 2.123,52** economia total (15%)
- **12.3 toneladas** CO² evitado

## 🔄 Navegação

### Dual View System
- **Vista Sistema**: Dashboard empresarial completo
- **Vista Conta Individual**: Conta detalhada original
- **Navegação bidirecional** entre vistas
- **Estado compartilhado** entre componentes

## 🚀 Performance

### Build Otimizado
- **Bundle**: 519KB (comprimido: 158KB)
- **CSS**: 106KB (comprimido: 16KB)
- **Code splitting** automático
- **Tree shaking** habilitado

### Otimizações
- **Lazy loading** de componentes
- **Animações GPU-accelerated**
- **Debounced interactions**
- **Responsive images**

## 📱 Responsividade

- **Mobile-first design**
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Grid adaptativo** para todos os componentes
- **Gráficos responsivos** com Chart.js

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
bun run dev          # Servidor de desenvolvimento
bun run build        # Build para produção
bun run preview      # Preview da build
bun run lint         # Executar ESLint
bun run type-check   # Verificar tipos TypeScript
```

## 📋 Funcionalidades Avançadas

### Sistema de IA
- **Previsões de consumo** baseadas em histórico
- **Otimização automática** de cargas
- **Alertas inteligentes** contextuais
- **Recomendações personalizadas**

### Automações
- **Desligamento inteligente** de standby
- **Climatização adaptativa**
- **Gestão de baterias**
- **Horários otimizados** de uso

### Integrações
- **ENERGISA Sergipe** (conectado)
- **Dados meteorológicos**
- **Sistema de tickets**
- **Exportação PDF**

## 🛡️ Qualidade e Testes

### Padrões
- **TypeScript strict mode**
- **ESLint configurado**
- **Prettier formatting**
- **Conventional commits**

### Acessibilidade
- **WCAG 2.1 AA** compliance
- **Navegação por teclado**
- **Screen reader** support
- **Alto contraste** disponível

## 📚 Documentação

- **[FUNCIONALIDADES.md](./FUNCIONALIDADES.md)** - Documentação completa de funcionalidades
- **Componentes documentados** com JSDoc
- **Exemplos de uso** em cada módulo
- **Guia de estilo** integrado

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é propriedade da **PRÓBRASIL Energia Renovável**.

---

**Desenvolvido com ❤️ para PRÓBRASIL**  
*Sistema de Gestão Energética Inteligente*