# 🛠️ Guia de Desenvolvimento - PRÓBRASIL

## 📋 Estrutura de Desenvolvimento

### Arquitetura do Sistema

```
probrasil-conta-energia/
├── src/
│   ├── components/
│   │   ├── ui/                    # Componentes base ShadCN
│   │   ├── Charts.tsx             # Gráficos básicos (4 tipos)
│   │   ├── AdvancedAnalytics.tsx  # Análises avançadas (5 tipos)
│   │   ├── SmartEnergyManager.tsx # IA & Automação
│   │   └── MainSystem.tsx         # Sistema principal com 8 módulos
│   ├── hooks/
│   │   └── use-mobile.ts          # Hook para detecção mobile
│   ├── lib/
│   │   └── utils.ts               # Utilitários (clsx, twMerge)
│   ├── backend/
│   │   └── api.ts                 # Simulação de API
│   └── index.css                  # Estilos globais + animações
├── public/
│   └── probrasil-logo.png         # Logo oficial
└── dist/                          # Build de produção
```

## 🔧 Configuração de Desenvolvimento

### Environment Setup

```bash
# Node.js 20+ e Bun
curl -fsSL https://bun.sh/install | bash

# Clone e setup
git clone <repo>
cd probrasil-conta-energia
bun install
```

### Variáveis de Ambiente

```env
# .env.local (opcional)
VITE_API_URL=http://localhost:3000
VITE_ENERGISA_API_KEY=your_api_key
VITE_WEATHER_API_KEY=your_weather_key
```

## 📊 Sistema de Componentes

### 1. Componente Principal (App.tsx)

```typescript
// Estado de navegação entre vistas
const [currentView, setCurrentView] = useState<'system' | 'bill'>('system');

// Função de formatação de moeda
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};
```

### 2. Sistema Principal (MainSystem.tsx)

**8 Módulos Implementados:**
- `dashboard` - KPIs e visão geral
- `bills` - Gestão completa de contas
- `units` - Administração de unidades
- `reports` - Relatórios e gráficos básicos
- `smart` - IA & Automação
- `notifications` - Sistema de alertas
- `settings` - Configurações do sistema
- `support` - Central de suporte

### 3. Gráficos (Charts.tsx)

**4 Visualizações com Chart.js:**
```typescript
// Configuração padrão dos gráficos
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 1000, easing: 'easeInOutCubic' },
  plugins: {
    tooltip: { backgroundColor: 'rgba(255, 255, 255, 0.95)' }
  }
};
```

**Tipos implementados:**
- Line Chart: Consumo mensal
- Bar Chart: Economia mensal
- Line Dual: Comparação antes/depois
- Doughnut: Distribuição de custos

### 4. Análises Avançadas (AdvancedAnalytics.tsx)

**5 Análises Especializadas:**
- Tendência anual (multi-eixo)
- Eficiência trimestral
- Padrões horários 24h
- Comparação por tipo de unidade
- Benchmark de mercado

### 5. IA & Automação (SmartEnergyManager.tsx)

**Funcionalidades IA:**
- Previsões meteorológicas 7 dias
- 4 regras de automação inteligente
- Monitoramento de 5 dispositivos
- Sistema de alertas contextuais

## 🎨 Design System

### Cores e Variáveis CSS

```css
:root {
  --probrasil-yellow: #FFD700;
  --probrasil-blue: #2C3E50;
  --green-economy: #22C55E;
  --red-consumption: #EF4444;
}
```

### Animações Customizadas

```css
@keyframes slide-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 5px rgba(255, 215, 0, 0.5); }
  50% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.8); }
}
```

### Responsividade

```typescript
// Breakpoints Tailwind
const breakpoints = {
  sm: '640px',   // Mobile
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px'   // Large desktop
};
```

## 📊 Estrutura de Dados

### Interfaces TypeScript

```typescript
interface Unit {
  id: string;
  name: string;
  address: string;
  type: 'residential' | 'commercial' | 'industrial';
  status: 'active' | 'inactive' | 'pending';
  consumption: number;
  bill: number;
  savings: number;
  dueDate: string;
}

interface Notification {
  id: string;
  type: 'warning' | 'info' | 'success';
  title: string;
  message: string;
  date: string;
}
```

### Dados de Exemplo

```typescript
const sampleUnits: Unit[] = [
  {
    id: '1728412',
    name: 'Residência - Atalaia',
    type: 'residential',
    consumption: 1767,
    bill: 1583.84,
    savings: 279.50
  }
  // ... mais unidades
];
```

## 🔄 Fluxo de Navegação

### Estado de Navegação

```typescript
// MainSystem.tsx
const [activeTab, setActiveTab] = useState('dashboard');

// App.tsx  
const [currentView, setCurrentView] = useState<'system' | 'bill'>('system');
```

### Navegação entre Módulos

```typescript
const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'bills', label: 'Contas', icon: FileText },
  // ... outros itens
];
```

## 📈 Sistema de Gráficos

### Configuração Chart.js

```typescript
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);
```

### Dados dos Gráficos

```typescript
const monthlyData = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
  consumption: [1850, 1920, 1780, 1650, 1720, 1800, 1767],
  savings: [185, 240, 220, 195, 210, 275, 280]
};
```

## 🚀 Build e Deploy

### Scripts de Build

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "type-check": "tsc --noEmit"
  }
}
```

### Otimizações de Performance

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['chart.js', 'react-chartjs-2']
        }
      }
    }
  }
});
```

## 🧪 Testes e Qualidade

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true
  }
}
```

### ESLint Rules

```javascript
export default [
  {
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-unused-vars': 'error'
    }
  }
];
```

## 🔐 Segurança

### Variáveis Sensíveis

```typescript
// Nunca commitar chaves de API
const API_KEY = import.meta.env.VITE_API_KEY;

// Sanitização de dados
const sanitizeInput = (input: string) => {
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};
```

## 📱 Responsividade

### Grid System

```typescript
// Layouts responsivos
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Cards KPI */}
</div>

// Gráficos adaptativos
<div className="h-64 lg:h-80">
  <Line data={chartData} options={responsiveOptions} />
</div>
```

## 🎯 Performance

### Lazy Loading

```typescript
// Componentes sob demanda
const AdvancedAnalytics = lazy(() => import('./AdvancedAnalytics'));
const SmartEnergyManager = lazy(() => import('./SmartEnergyManager'));
```

### Memoização

```typescript
// Dados computados pesados
const totalMetrics = useMemo(() => ({
  consumption: units.reduce((sum, unit) => sum + unit.consumption, 0),
  savings: units.reduce((sum, unit) => sum + unit.savings, 0)
}), [units]);
```

## 🔧 Debugging

### Console Helpers

```typescript
// Debug mode
if (import.meta.env.DEV) {
  console.log('Chart data:', chartData);
  console.log('Active tab:', activeTab);
}
```

### Error Boundaries

```typescript
// Tratamento de erros
const ErrorBoundary: React.FC = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  
  if (hasError) {
    return <div>Algo deu errado. Recarregue a página.</div>;
  }
  
  return children;
};
```

## 📦 Dependências Principais

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "chart.js": "^4.5.0",
    "react-chartjs-2": "^5.3.0",
    "lucide-react": "^0.536.0",
    "date-fns": "^4.1.0"
  },
  "devDependencies": {
    "typescript": "^5.8.3",
    "vite": "^6.3.5",
    "@types/react": "^19.0.4"
  }
}
```

## 🚀 Próximos Passos

### Melhorias Técnicas
- [ ] Implementar React Query para cache
- [ ] Adicionar testes unitários (Vitest)
- [ ] Configurar Storybook para componentes
- [ ] Implementar PWA (Service Workers)

### Funcionalidades
- [ ] API real com backend
- [ ] Sistema de autenticação
- [ ] Notificações push
- [ ] Exports avançados (Excel, CSV)

---

**Happy Coding! 🚀**