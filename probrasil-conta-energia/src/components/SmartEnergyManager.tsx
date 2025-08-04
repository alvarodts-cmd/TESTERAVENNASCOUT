import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain,
  Zap,
  Sun,
  Cloud,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings,
  Battery,
  Wifi,
  Shield,
  Target,
  Calendar,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Activity,
  Thermometer,
  Wind,
  Eye,
  BarChart3
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface SmartEnergyManagerProps {
  formatCurrency: (value: number) => string;
}

// Dados de previsão e otimização
const forecastData = {
  labels: ['Hoje', 'Amanhã', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  consumption: [1780, 1850, 1920, 1650, 1720, 1800, 1600],
  generation: [1920, 2100, 2250, 1800, 1950, 2080, 1750],
  weather: ['☀️', '⛅', '☀️', '🌧️', '⛅', '☀️', '☀️'],
  savings: [285, 310, 340, 195, 275, 320, 230]
};

const automationRules = [
  {
    id: 1,
    name: 'Otimização Automática de Cargas',
    description: 'Move cargas não essenciais para horários de maior geração solar',
    status: 'active',
    savings: 'R$ 85/mês',
    efficiency: 92,
    lastTriggered: '2025-08-12 14:30'
  },
  {
    id: 2,
    name: 'Desligamento Inteligente',
    description: 'Desliga equipamentos standby durante picos de tarifa',
    status: 'active',
    savings: 'R$ 45/mês',
    efficiency: 87,
    lastTriggered: '2025-08-12 18:00'
  },
  {
    id: 3,
    name: 'Climatização Adaptativa',
    description: 'Ajusta temperatura baseado na geração solar e demanda',
    status: 'inactive',
    savings: 'R$ 120/mês',
    efficiency: 0,
    lastTriggered: 'Nunca'
  },
  {
    id: 4,
    name: 'Backup de Bateria',
    description: 'Gerencia carga/descarga do sistema de baterias',
    status: 'pending',
    savings: 'R$ 65/mês',
    efficiency: 0,
    lastTriggered: 'Aguardando instalação'
  }
];

const deviceData = [
  {
    name: 'Ar Condicionado',
    consumption: 3200,
    status: 'online',
    efficiency: 88,
    lastUpdate: '2 min atrás',
    temperature: 24
  },
  {
    name: 'Iluminação LED',
    consumption: 450,
    status: 'online',
    efficiency: 95,
    lastUpdate: '1 min atrás',
    brightness: 75
  },
  {
    name: 'Computadores',
    consumption: 1200,
    status: 'online',
    efficiency: 82,
    lastUpdate: '30 seg atrás',
    load: 65
  },
  {
    name: 'Geladeiras',
    consumption: 800,
    status: 'online',
    efficiency: 90,
    lastUpdate: '5 min atrás',
    temperature: 4
  },
  {
    name: 'Sistema Solar',
    consumption: -2100,
    status: 'online',
    efficiency: 96,
    lastUpdate: 'Tempo real',
    generation: 2100
  }
];

const alertsData = [
  {
    id: 1,
    type: 'warning',
    title: 'Consumo Acima da Média',
    message: 'Ar condicionado consumindo 15% acima do normal',
    timestamp: '2025-08-12 15:45',
    action: 'Verificar configurações'
  },
  {
    id: 2,
    type: 'info',
    title: 'Otimização Sugerida',
    message: 'Mover lavagem de roupas para 13h-15h (pico solar)',
    timestamp: '2025-08-12 14:20',
    action: 'Aplicar sugestão'
  },
  {
    id: 3,
    type: 'success',
    title: 'Meta Atingida',
    message: 'Eficiência energética atingiu 92% hoje',
    timestamp: '2025-08-12 13:10',
    action: 'Ver detalhes'
  }
];

export function SmartEnergyManager({ formatCurrency }: SmartEnergyManagerProps) {
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: { size: 12 },
          padding: 20,
          usePointStyle: true,
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1f2937',
        bodyColor: '#1f2937',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        cornerRadius: 8,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0, 0, 0, 0.06)' },
        ticks: { font: { size: 11 }, color: '#6b7280' }
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 11 }, color: '#6b7280' }
      }
    },
    animation: { duration: 1000, easing: 'easeInOutCubic' as const }
  };

  const forecastChartData = {
    labels: forecastData.labels,
    datasets: [
      {
        label: 'Previsão Consumo (kWh)',
        data: forecastData.consumption,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.3,
      },
      {
        label: 'Previsão Geração (kWh)',
        data: forecastData.generation,
        borderColor: 'rgb(255, 193, 7)',
        backgroundColor: 'rgba(255, 193, 7, 0.1)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const deviceConsumptionData = {
    labels: deviceData.filter(d => d.consumption > 0).map(d => d.name),
    datasets: [
      {
        data: deviceData.filter(d => d.consumption > 0).map(d => d.consumption),
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#8B5CF6',
          '#EF4444'
        ],
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'inactive': return <Pause className="h-4 w-4 text-gray-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      default: return <AlertTriangle className="h-4 w-4 text-red-600" />;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'success': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'info': return <Brain className="h-5 w-5 text-blue-600" />;
      default: return <Activity className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          Gestão Inteligente de Energia
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Configurar IA
          </Button>
          <Button size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Monitoramento
          </Button>
        </div>
      </div>

      {/* Status Geral do Sistema */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status do Sistema</p>
                <p className="text-lg font-bold text-green-600">Otimizado</p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Eficiência Atual</p>
                <p className="text-lg font-bold text-blue-600">92%</p>
              </div>
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Target className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Economia IA</p>
                <p className="text-lg font-bold text-green-600">R$ 185/mês</p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingDown className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Dispositivos Online</p>
                <p className="text-lg font-bold text-blue-600">{deviceData.filter(d => d.status === 'online').length}/5</p>
              </div>
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Wifi className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="forecast" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="forecast">Previsões</TabsTrigger>
          <TabsTrigger value="automation">Automações</TabsTrigger>
          <TabsTrigger value="devices">Dispositivos</TabsTrigger>
          <TabsTrigger value="alerts">Alertas IA</TabsTrigger>
        </TabsList>

        <TabsContent value="forecast" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Previsão 7 Dias
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Line data={forecastChartData} options={chartOptions} />
                </div>
                <div className="mt-4 space-y-2">
                  {forecastData.labels.slice(0, 3).map((day, index) => (
                    <div key={day} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{forecastData.weather[index]}</span>
                        <div>
                          <div className="font-medium">{day}</div>
                          <div className="text-sm text-muted-foreground">
                            {forecastData.generation[index]} kWh geração
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-600">
                          {formatCurrency(forecastData.savings[index])}
                        </div>
                        <div className="text-xs text-muted-foreground">economia</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sun className="h-5 w-5 text-yellow-600" />
                  Condições Climáticas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <Thermometer className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <div className="text-lg font-bold">28°C</div>
                    <div className="text-sm text-muted-foreground">Temperatura</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Cloud className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-lg font-bold">15%</div>
                    <div className="text-sm text-muted-foreground">Nuvens</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Wind className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-lg font-bold">12 km/h</div>
                    <div className="text-sm text-muted-foreground">Vento</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <Sun className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                    <div className="text-lg font-bold">8.5h</div>
                    <div className="text-sm text-muted-foreground">Sol Estimado</div>
                  </div>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="font-medium text-green-800 mb-1">Condições Ótimas</div>
                  <div className="text-sm text-green-700">
                    Condições ideais para geração solar entre 10h-16h. 
                    Sugerido programar cargas não essenciais neste período.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                Regras de Automação Inteligente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {automationRules.map((rule) => (
                  <Card key={rule.id} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {getStatusIcon(rule.status)}
                            <h3 className="font-semibold">{rule.name}</h3>
                            <Badge 
                              variant="secondary" 
                              className={rule.status === 'active' ? 'bg-green-100 text-green-700' : 
                                       rule.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                                       'bg-gray-100 text-gray-700'}
                            >
                              {rule.status === 'active' ? 'Ativo' : 
                               rule.status === 'pending' ? 'Pendente' : 'Inativo'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{rule.description}</p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Economia:</span>
                              <span className="ml-2 font-medium text-green-600">{rule.savings}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Eficiência:</span>
                              <span className="ml-2 font-medium">{rule.efficiency}%</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Último trigger:</span>
                              <span className="ml-2 font-medium">{rule.lastTriggered}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button size="sm" variant="outline">
                            <Settings className="h-3 w-3 mr-1" />
                            Config
                          </Button>
                          <Button 
                            size="sm" 
                            variant={rule.status === 'active' ? 'destructive' : 'default'}
                          >
                            {rule.status === 'active' ? (
                              <>
                                <Pause className="h-3 w-3 mr-1" />
                                Pausar
                              </>
                            ) : (
                              <>
                                <Play className="h-3 w-3 mr-1" />
                                Ativar
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-green-600" />
                  Dispositivos Monitorados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {deviceData.map((device, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-muted/30"
                      onClick={() => setSelectedDevice(device)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          device.status === 'online' ? 'bg-green-500' : 'bg-red-500'
                        }`} />
                        <div>
                          <div className="font-medium">{device.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {device.consumption > 0 ? `${device.consumption}W` : `Gerando ${Math.abs(device.consumption)}W`}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{device.efficiency}%</div>
                        <div className="text-xs text-muted-foreground">{device.lastUpdate}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  Distribuição de Consumo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Doughnut 
                    data={deviceConsumptionData} 
                    options={{
                      ...chartOptions,
                      cutout: '60%',
                      plugins: {
                        ...chartOptions.plugins,
                        legend: {
                          position: 'bottom' as const,
                          labels: {
                            font: { size: 10 },
                            padding: 15,
                            usePointStyle: true,
                          }
                        }
                      }
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {selectedDevice && (
            <Card>
              <CardHeader>
                <CardTitle>Detalhes: {selectedDevice.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">
                      {selectedDevice.consumption > 0 ? `${selectedDevice.consumption}W` : `${Math.abs(selectedDevice.consumption)}W`}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {selectedDevice.consumption > 0 ? 'Consumo' : 'Geração'}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">{selectedDevice.efficiency}%</div>
                    <div className="text-sm text-muted-foreground">Eficiência</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-lg font-bold text-yellow-600">
                      {selectedDevice.temperature || selectedDevice.brightness || selectedDevice.load || selectedDevice.generation || 'N/A'}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {selectedDevice.temperature ? '°C' : 
                       selectedDevice.brightness ? '% Brilho' :
                       selectedDevice.load ? '% Carga' :
                       selectedDevice.generation ? 'W Gerado' : 'Parâmetro'}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">{selectedDevice.status}</div>
                    <div className="text-sm text-muted-foreground">Status</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-600" />
                Alertas e Sugestões da IA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertsData.map((alert) => (
                  <Card key={alert.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        {getAlertIcon(alert.type)}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{alert.title}</h3>
                            <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{alert.message}</p>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              {alert.action}
                            </Button>
                            <Button size="sm" variant="ghost">
                              Ignorar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}