import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  LayoutDashboard, 
  FileText, 
  Building, 
  BarChart3, 
  Settings, 
  Bell, 
  HelpCircle,
  Zap,
  TrendingUp,
  TrendingDown,
  Sun,
  Leaf,
  Calendar,
  MapPin,
  Download,
  Plus,
  Search,
  Filter,
  Home,
  Factory,
  Store,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  Eye,
  Upload,
  Brain
} from "lucide-react";
import { Charts } from "./Charts";
import { AdvancedAnalytics } from "./AdvancedAnalytics";
import { SmartEnergyManager } from "./SmartEnergyManager";
import { PDFImport } from "./PDFImport";

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

const sampleUnits: Unit[] = [
  {
    id: '1728412',
    name: 'Ravenna Beach Club - Atalaia',
    address: 'AV MARIO JORGE MENEZES VIEIRA, 342',
    type: 'commercial',
    status: 'active',
    consumption: 1767, // Consumo correto do PDF
    bill: 1583.85, // Valor com energia solar (1863.35 × 0.85)
    savings: 279.50, // Economia de 15% (1863.35 - 1583.85)
    dueDate: '2025-08-11'
  }
];

const sampleNotifications: Notification[] = [
  {
    id: '1',
    type: 'warning',
    title: 'Vencimento Próximo',
    message: 'Conta da unidade Atalaia vence em 3 dias',
    date: '2025-08-12'
  },
  {
    id: '2',
    type: 'success',
    title: 'Meta de Economia Atingida',
    message: 'Parabéns! Você economizou 18% este mês',
    date: '2025-08-10'
  },
  {
    id: '3',
    type: 'info',
    title: 'Nova Funcionalidade',
    message: 'Agora você pode comparar tarifas de diferentes distribuidoras',
    date: '2025-08-08'
  }
];

const monthlyPerformance = [
  { month: 'Jul', consumption: 1767, savings: 279.50, bill: 1583.85 }
];

interface MainSystemProps {
  formatCurrency: (value: number) => string;
  onViewBill?: () => void;
}

export function MainSystem({ formatCurrency, onViewBill }: MainSystemProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);

  const getUnitIcon = (type: Unit['type']) => {
    switch (type) {
      case 'residential': return <Home className="h-4 w-4" />;
      case 'commercial': return <Store className="h-4 w-4" />;
      case 'industrial': return <Factory className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: Unit['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200';
      case 'inactive': return 'bg-red-100 text-red-700 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'info': return <Bell className="h-4 w-4 text-blue-600" />;
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'import', label: 'Importar PDFs', icon: Upload },
    { id: 'bills', label: 'Contas', icon: FileText },
    { id: 'units', label: 'Unidades', icon: Building },
    { id: 'reports', label: 'Relatórios', icon: BarChart3 },
    { id: 'smart', label: 'IA & Automação', icon: Brain },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'settings', label: 'Configurações', icon: Settings },
    { id: 'support', label: 'Suporte', icon: HelpCircle }
  ];

  const totalConsumption = sampleUnits.reduce((sum, unit) => sum + unit.consumption, 0);
  const totalBill = sampleUnits.reduce((sum, unit) => sum + unit.bill, 0);
  const totalSavings = sampleUnits.reduce((sum, unit) => sum + unit.savings, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src="/probrasil-logo.png" 
                alt="PRÓBRASIL Energia" 
                className="h-12 w-auto"
              />
              <div className="text-sm text-muted-foreground">
                <div className="font-medium text-foreground flex items-center gap-2">
                  Sistema de Gestão Energética
                  <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                    <Leaf className="h-3 w-3 mr-1" />
                    Sustentável
                  </Badge>
                </div>
                <div>Energia Renovável Inteligente</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </Button>
              {onViewBill && (
                <Button variant="outline" size="sm" onClick={onViewBill}>
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Conta Individual
                </Button>
              )}
              <Avatar>
                <AvatarImage src="/api/placeholder/32/32" />
                <AvatarFallback>ÁO</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white/50 backdrop-blur-sm border-r min-h-screen">
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === item.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Unidade
                </Button>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total de Unidades</p>
                        <p className="text-2xl font-bold">1</p>
                      </div>
                      <Building className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Consumo Total</p>
                        <p className="text-2xl font-bold">{totalConsumption.toLocaleString()} kWh</p>
                      </div>
                      <Zap className="h-8 w-8 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Economia Total</p>
                        <p className="text-2xl font-bold text-green-600">{formatCurrency(totalSavings)}</p>
                      </div>
                      <TrendingDown className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Valor Total</p>
                        <p className="text-2xl font-bold">{formatCurrency(totalBill)}</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Chart */}
              <Charts formatCurrency={formatCurrency} />

              {/* Units Overview */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Unidades Consumidoras</CardTitle>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filtrar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {sampleUnits.map((unit) => (
                      <Card key={unit.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedUnit(unit)}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              {getUnitIcon(unit.type)}
                              <div>
                                <h3 className="font-semibold text-sm">{unit.name}</h3>
                                <p className="text-xs text-muted-foreground">{unit.id}</p>
                              </div>
                            </div>
                            <Badge variant="secondary" className={getStatusColor(unit.status)}>
                              {unit.status}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Consumo:</span>
                              <span className="font-medium">{unit.consumption} kWh</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Valor:</span>
                              <span className="font-medium">{formatCurrency(unit.bill)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Economia:</span>
                              <span className="font-medium text-green-600">{formatCurrency(unit.savings)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Vencimento:</span>
                              <span className="font-medium">{new Date(unit.dueDate).toLocaleDateString('pt-BR')}</span>
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t">
                            <Button size="sm" variant="outline" className="w-full">
                              <Eye className="h-3 w-3 mr-2" />
                              Ver Detalhes
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Notificações</h1>
                <Button variant="outline">
                  Marcar todas como lidas
                </Button>
              </div>

              <div className="space-y-4">
                {sampleNotifications.map((notification) => (
                  <Card key={notification.id} className="card-hover">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold">{notification.title}</h3>
                            <span className="text-xs text-muted-foreground">
                              {new Date(notification.date).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'units' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Gestão de Unidades</h1>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Unidade
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {sampleUnits.map((unit) => (
                  <Card key={unit.id} className="card-hover">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getUnitIcon(unit.type)}
                          <CardTitle className="text-lg">{unit.name}</CardTitle>
                        </div>
                        <Badge variant="secondary" className={getStatusColor(unit.status)}>
                          {unit.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                          <MapPin className="h-3 w-3" />
                          Endereço
                        </div>
                        <p className="text-sm font-medium">{unit.address}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Consumo Mensal</p>
                          <p className="font-semibold">{unit.consumption} kWh</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Economia</p>
                          <p className="font-semibold text-green-600">{formatCurrency(unit.savings)}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">Próximo Vencimento</p>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <p className="font-semibold">{new Date(unit.dueDate).toLocaleDateString('pt-BR')}</p>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-3 border-t">
                        <Button size="sm" variant="outline" className="flex-1">
                          Editar
                        </Button>
                        <Button size="sm" className="flex-1">
                          Ver Conta
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Relatórios Avançados</h1>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Exportar Relatório
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Anual</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-blue-600">156,207</p>
                          <p className="text-xs text-muted-foreground">kWh Consumidos</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-green-600">R$ 28,435</p>
                          <p className="text-xs text-muted-foreground">Economia Total</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-orange-600">18.2%</p>
                          <p className="text-xs text-muted-foreground">% Economia Média</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Impacto Ambiental</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Leaf className="h-8 w-8 text-green-600" />
                        <div>
                          <p className="font-semibold">CO² Evitado</p>
                          <p className="text-2xl font-bold text-green-600">12.3 toneladas</p>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Equivale ao plantio de <strong>156 árvores</strong> ou <strong>52,000 km</strong> não percorridos de carro.
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Charts formatCurrency={formatCurrency} />
              
              {/* Análises Avançadas */}
              <AdvancedAnalytics formatCurrency={formatCurrency} />
            </div>
          )}

          {activeTab === 'import' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Importação de Contas PDF</h1>
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Histórico de Importações
                </Button>
              </div>
              <PDFImport 
                formatCurrency={formatCurrency} 
                onImportSuccess={(data) => {
                  console.log('Dados importados:', data);
                  // Aqui você pode atualizar os dados do sistema
                }}
              />
            </div>
          )}

          {activeTab === 'bills' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Gestão de Contas</h1>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </div>

              {/* Filtros e Busca */}
              <Card>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input 
                        type="text" 
                        placeholder="Buscar por unidade..." 
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <select className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="all">Todos os Tipos</option>
                      <option value="residential">Residencial</option>
                      <option value="commercial">Comercial</option>
                      <option value="industrial">Industrial</option>
                    </select>
                    <select className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="all">Todos os Status</option>
                      <option value="active">Ativo</option>
                      <option value="pending">Pendente</option>
                      <option value="overdue">Vencido</option>
                    </select>
                    <select className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="current">Mês Atual</option>
                      <option value="last3">Últimos 3 Meses</option>
                      <option value="last6">Últimos 6 Meses</option>
                      <option value="year">Ano Atual</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              {/* Lista de Contas */}
              <Card>
                <CardHeader>
                  <CardTitle>Histórico de Contas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sampleUnits.map((unit) => {
                      const savings = unit.savings;
                      const savingsPercent = ((savings / (unit.bill + savings)) * 100).toFixed(1);
                      return (
                        <Card key={unit.id} className="cursor-pointer hover:shadow-md transition-all">
                          <CardContent className="p-4">
                            <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-center">
                              <div className="lg:col-span-2">
                                <div className="flex items-center gap-3">
                                  {getUnitIcon(unit.type)}
                                  <div>
                                    <h3 className="font-semibold">{unit.name}</h3>
                                    <p className="text-sm text-muted-foreground">{unit.id}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="text-center">
                                <p className="text-sm text-muted-foreground">Consumo</p>
                                <p className="font-semibold">{unit.consumption} kWh</p>
                              </div>
                              <div className="text-center">
                                <p className="text-sm text-muted-foreground">Valor</p>
                                <p className="font-semibold">{formatCurrency(unit.bill)}</p>
                              </div>
                              <div className="text-center">
                                <p className="text-sm text-muted-foreground">Economia</p>
                                <div className="space-y-1">
                                  <p className="font-semibold text-green-600">{formatCurrency(savings)}</p>
                                  <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                                    {savingsPercent}%
                                  </Badge>
                                </div>
                              </div>
                              <div className="text-center">
                                <p className="text-sm text-muted-foreground">Vencimento</p>
                                <p className="font-semibold">{new Date(unit.dueDate).toLocaleDateString('pt-BR')}</p>
                                <div className="flex gap-2 mt-2">
                                  <Button size="sm" variant="outline" onClick={onViewBill}>
                                    <Eye className="h-3 w-3 mr-1" />
                                    Ver
                                  </Button>
                                  <Button size="sm">
                                    <Download className="h-3 w-3 mr-1" />
                                    PDF
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Resumo Mensal */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Resumo do Mês</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Consumido:</span>
                        <span className="font-semibold">{totalConsumption.toLocaleString()} kWh</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total a Pagar:</span>
                        <span className="font-semibold">{formatCurrency(totalBill)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Economia Total:</span>
                        <span className="font-semibold text-green-600">{formatCurrency(totalSavings)}</span>
                      </div>
                      <div className="pt-2 border-t">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Sem Energia Solar:</span>
                          <span className="font-semibold">{formatCurrency(totalBill + totalSavings)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Próximos Vencimentos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {sampleUnits
                        .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                        .slice(0, 3)
                        .map((unit) => {
                          const daysUntilDue = Math.ceil((new Date(unit.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                          return (
                            <div key={unit.id} className="flex justify-between items-center text-sm">
                              <span className="text-muted-foreground">{unit.name.split(' - ')[1] || unit.name}:</span>
                              <div className="text-right">
                                <div className="font-semibold">{new Date(unit.dueDate).toLocaleDateString('pt-BR')}</div>
                                <div className={`text-xs ${
                                  daysUntilDue <= 3 ? 'text-red-600' : 
                                  daysUntilDue <= 7 ? 'text-yellow-600' : 'text-green-600'
                                }`}>
                                  {daysUntilDue} dias
                                </div>
                              </div>
                            </div>
                          );
                        })
                      }
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'smart' && (
            <div className="space-y-6">
              <SmartEnergyManager formatCurrency={formatCurrency} />
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Configurações</h1>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Backup Configurações
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Configurações da Conta */}
                <Card>
                  <CardHeader>
                    <CardTitle>Dados da Conta</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Nome da Empresa</label>
                      <input 
                        type="text" 
                        defaultValue="PRÓBRASIL Energia Renovável" 
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">CNPJ</label>
                      <input 
                        type="text" 
                        defaultValue="12.345.678/0001-90" 
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email de Contato</label>
                      <input 
                        type="email" 
                        defaultValue="contato@probrasil.com.br" 
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Notificações */}
                <Card>
                  <CardHeader>
                    <CardTitle>Notificações</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Avisos de Vencimento</h4>
                        <p className="text-sm text-muted-foreground">Receber emails antes do vencimento</p>
                      </div>
                      <input type="checkbox" defaultChecked className="h-4 w-4" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Relatórios Mensais</h4>
                        <p className="text-sm text-muted-foreground">Resumo mensal de economia</p>
                      </div>
                      <input type="checkbox" defaultChecked className="h-4 w-4" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Alertas de Consumo</h4>
                        <p className="text-sm text-muted-foreground">Avisos quando consumo superar média</p>
                      </div>
                      <input type="checkbox" className="h-4 w-4" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Antecedência do Aviso (dias)</label>
                      <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                        <option value="3">3 dias</option>
                        <option value="5" selected>5 dias</option>
                        <option value="7">7 dias</option>
                        <option value="10">10 dias</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>

                {/* Preferências do Sistema */}
                <Card>
                  <CardHeader>
                    <CardTitle>Preferências do Sistema</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Tema</label>
                      <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                        <option value="light" selected>Claro</option>
                        <option value="dark">Escuro</option>
                        <option value="auto">Automático</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Formato de Data</label>
                      <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                        <option value="dd/mm/yyyy" selected>DD/MM/AAAA</option>
                        <option value="mm/dd/yyyy">MM/DD/AAAA</option>
                        <option value="yyyy-mm-dd">AAAA-MM-DD</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Moeda</label>
                      <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                        <option value="brl" selected>Real Brasileiro (R$)</option>
                        <option value="usd">Dólar Americano ($)</option>
                        <option value="eur">Euro (€)</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>

                {/* Integração com Distribuidoras */}
                <Card>
                  <CardHeader>
                    <CardTitle>Integração com Distribuidoras</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <Zap className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium">ENERGISA Sergipe</h4>
                            <p className="text-sm text-muted-foreground">3 unidades conectadas</p>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-700">Conectado</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                            <Zap className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium">COELBA</h4>
                            <p className="text-sm text-muted-foreground">Não conectado</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">Conectar</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t">
                <Button variant="outline">Cancelar</Button>
                <Button>Salvar Configurações</Button>
              </div>
            </div>
          )}

          {activeTab === 'support' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Central de Suporte</h1>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Ticket
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Contatos Rápidos */}
                <Card>
                  <CardHeader>
                    <CardTitle>Contatos Rápidos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center space-y-3">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <Users className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="font-semibold">Suporte Técnico</h3>
                      <p className="text-sm text-muted-foreground">Segunda a Sexta, 8h às 18h</p>
                      <div className="space-y-2">
                        <Button className="w-full" size="sm">
                          (79) 3211-9900
                        </Button>
                        <Button variant="outline" className="w-full" size="sm">
                          suporte@probrasil.com.br
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* FAQ */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Perguntas Frequentes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Como visualizar o histórico de economia?</h4>
                        <p className="text-sm text-muted-foreground">Acesse o módulo 'Relatórios' no menu lateral e visualize gráficos detalhados da sua economia mensal e anual com energia solar.</p>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Como exportar as contas em PDF?</h4>
                        <p className="text-sm text-muted-foreground">No módulo 'Contas', clique no botão 'PDF' ao lado de cada conta ou use o botão 'Exportar' para baixar múltiplas contas.</p>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Como configurar alertas de vencimento?</h4>
                        <p className="text-sm text-muted-foreground">Vá em 'Configurações' → 'Notificações' e ative os avisos de vencimento, definindo quantos dias de antecedência deseja receber o alerta.</p>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Como adicionar uma nova unidade?</h4>
                        <p className="text-sm text-muted-foreground">No Dashboard ou módulo 'Unidades', clique em 'Nova Unidade' e preencha os dados da instalação e número da unidade consumidora.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Tickets Recentes */}
              <Card>
                <CardHeader>
                  <CardTitle>Tickets de Suporte</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold">#2023-08-001 - Dúvida sobre cálculo de economia</h4>
                          <p className="text-sm text-muted-foreground">Resolvido em 10/08/2025 às 14:30</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-700">Resolvido</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold">#2023-08-002 - Problema na integração ENERGISA</h4>
                          <p className="text-sm text-muted-foreground">Aberto em 12/08/2025 às 09:15</p>
                        </div>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-700">Em Andamento</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recursos Adicionais */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Documentação</h3>
                    <p className="text-sm text-muted-foreground mb-4">Guias completos de uso do sistema</p>
                    <Button variant="outline" size="sm">Acessar</Button>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Treinamentos</h3>
                    <p className="text-sm text-muted-foreground mb-4">Vídeos e webinars sobre o sistema</p>
                    <Button variant="outline" size="sm">Ver Vídeos</Button>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Bell className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Atualizações</h3>
                    <p className="text-sm text-muted-foreground mb-4">Novidades e melhorias do sistema</p>
                    <Button variant="outline" size="sm">Ver Novidades</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}