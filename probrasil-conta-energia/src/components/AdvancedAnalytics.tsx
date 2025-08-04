import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp,
  TrendingDown,
  Sun,
  Zap,
  Calendar,
  BarChart3,
  PieChart,
  LineChart,
  Download,
  Filter,
  Target,
  Leaf,
  DollarSign,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Building,
  Factory,
  Home
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
  Filler,
} from 'chart.js';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';

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

interface AdvancedAnalyticsProps {
  formatCurrency: (value: number) => string;
}

// Dados avançados para análises
const energyData = {
  yearly: {
    labels: ['2022', '2023', '2024', '2025'],
    consumption: [145000, 152000, 138000, 156207],
    savings: [0, 18450, 23500, 28435],
    co2Avoided: [0, 7.8, 9.9, 12.3] // toneladas
  },
  quarterly: {
    labels: ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025'],
    consumption: [38500, 42100, 39200, 36400],
    costs: [31200, 34650, 32100, 28900],
    efficiency: [85, 88, 92, 94] // porcentagem
  },
  hourly: {
    labels: Array.from({length: 24}, (_, i) => `${i}:00`),
    consumption: [12, 8, 6, 5, 6, 8, 15, 25, 35, 42, 45, 48, 52, 50, 48, 45, 42, 38, 35, 30, 25, 20, 18, 15],
    generation: [0, 0, 0, 0, 0, 5, 15, 35, 45, 55, 65, 70, 75, 70, 65, 55, 45, 25, 5, 0, 0, 0, 0, 0]
  },
  comparison: {
    labels: ['Residencial', 'Comercial', 'Industrial'],
    beforeSolar: [2200, 4500, 18500],
    afterSolar: [1800, 3600, 15200],
    units: [1, 1, 1]
  }
};

const performanceMetrics = [
  { label: 'Eficiência Energética', value: 92, target: 90, unit: '%', trend: 'up' },
  { label: 'Retorno Investimento', value: 18.5, target: 15, unit: '%', trend: 'up' },
  { label: 'Disponibilidade Sistema', value: 99.2, target: 98, unit: '%', trend: 'up' },
  { label: 'Redução CO²', value: 12.3, target: 10, unit: 't', trend: 'up' },
];

const benchmarkData = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
  myCompany: [15.2, 16.8, 18.1, 17.5, 19.2, 18.7, 17.3],
  industry: [12.1, 12.5, 13.2, 12.8, 13.5, 13.1, 12.9],
  competitors: [10.5, 11.2, 11.8, 11.1, 12.1, 11.7, 11.3]
};

export function AdvancedAnalytics({ formatCurrency }: AdvancedAnalyticsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedMetric, setSelectedMetric] = useState('consumption');

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 12,
            family: 'Inter, sans-serif'
          },
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
        grid: {
          color: 'rgba(0, 0, 0, 0.06)',
        },
        ticks: {
          font: {
            size: 11,
          },
          color: '#6b7280',
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
          color: '#6b7280',
        }
      }
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 6,
      },
      line: {
        borderWidth: 2.5,
        tension: 0.3,
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutCubic' as const
    }
  };

  // Gráfico de tendência anual
  const yearlyTrendData = {
    labels: energyData.yearly.labels,
    datasets: [
      {
        label: 'Consumo (MWh)',
        data: energyData.yearly.consumption.map(v => v / 1000),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        yAxisID: 'y',
      },
      {
        label: 'Economia (R$ mil)',
        data: energyData.yearly.savings.map(v => v / 1000),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        yAxisID: 'y1',
      },
    ],
  };

  // Gráfico de eficiência
  const efficiencyData = {
    labels: energyData.quarterly.labels,
    datasets: [
      {
        label: 'Eficiência (%)',
        data: energyData.quarterly.efficiency,
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1,
      },
    ],
  };

  // Gráfico horário (consumo vs geração)
  const hourlyData = {
    labels: energyData.hourly.labels,
    datasets: [
      {
        label: 'Consumo',
        data: energyData.hourly.consumption,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
      },
      {
        label: 'Geração Solar',
        data: energyData.hourly.generation,
        borderColor: 'rgb(255, 193, 7)',
        backgroundColor: 'rgba(255, 193, 7, 0.1)',
        fill: true,
      },
    ],
  };

  // Gráfico de comparação por tipo
  const comparisonData = {
    labels: energyData.comparison.labels,
    datasets: [
      {
        label: 'Antes da Energia Solar',
        data: energyData.comparison.beforeSolar,
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 1,
      },
      {
        label: 'Após Energia Solar',
        data: energyData.comparison.afterSolar,
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1,
      },
    ],
  };

  // Gráfico de benchmark
  const benchmarkChartData = {
    labels: benchmarkData.labels,
    datasets: [
      {
        label: 'PRÓBRASIL',
        data: benchmarkData.myCompany,
        borderColor: 'rgb(255, 193, 7)',
        backgroundColor: 'rgba(255, 193, 7, 0.1)',
        borderWidth: 3,
        fill: true,
      },
      {
        label: 'Média do Setor',
        data: benchmarkData.industry,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderDash: [5, 5],
        fill: false,
      },
      {
        label: 'Concorrentes',
        data: benchmarkData.competitors,
        borderColor: 'rgb(156, 163, 175)',
        backgroundColor: 'rgba(156, 163, 175, 0.1)',
        borderDash: [10, 5],
        fill: false,
      },
    ],
  };

  const getMetricIcon = (trend: string) => {
    return trend === 'up' ? 
      <ArrowUpRight className="h-4 w-4 text-green-600" /> : 
      <ArrowDownRight className="h-4 w-4 text-red-600" />;
  };

  const getUnitIcon = (type: string) => {
    switch (type) {
      case 'Residencial': return <Home className="h-5 w-5 text-blue-600" />;
      case 'Comercial': return <Building className="h-5 w-5 text-green-600" />;
      case 'Industrial': return <Factory className="h-5 w-5 text-orange-600" />;
      default: return <Zap className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Análises Avançadas</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Métricas de Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics.map((metric, index) => {
          const isAboveTarget = metric.value >= metric.target;
          return (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">{metric.label}</span>
                  {getMetricIcon(metric.trend)}
                </div>
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">{metric.value}</span>
                    <span className="text-sm text-muted-foreground">{metric.unit}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Meta: {metric.target}{metric.unit}</span>
                    <Badge 
                      variant="secondary" 
                      className={isAboveTarget ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}
                    >
                      {isAboveTarget ? 'Atingida' : 'Em progresso'}
                    </Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        isAboveTarget ? 'bg-green-600' : 'bg-yellow-600'
                      }`}
                      style={{width: `${Math.min((metric.value / metric.target) * 100, 100)}%`}}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Gráficos Principais */}
      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Tendências</TabsTrigger>
          <TabsTrigger value="efficiency">Eficiência</TabsTrigger>
          <TabsTrigger value="patterns">Padrões</TabsTrigger>
          <TabsTrigger value="benchmark">Benchmark</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Tendência Anual - Consumo vs Economia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Line data={yearlyTrendData} options={{
                  ...chartOptions,
                  scales: {
                    ...chartOptions.scales,
                    y1: {
                      type: 'linear' as const,
                      display: true,
                      position: 'right' as const,
                      grid: {
                        drawOnChartArea: false,
                      },
                      ticks: {
                        color: '#6b7280',
                      }
                    }
                  }
                }} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">156.2 MWh</div>
                  <div className="text-sm text-muted-foreground">Consumo 2025</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">R$ 28.4k</div>
                  <div className="text-sm text-muted-foreground">Economia 2025</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">+54%</div>
                  <div className="text-sm text-muted-foreground">Crescimento Economia</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="efficiency" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-600" />
                  Eficiência Trimestral
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Bar data={efficiencyData} options={chartOptions} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  Comparação por Tipo de Unidade
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Bar data={comparisonData} options={chartOptions} />
                </div>
                <div className="space-y-3 mt-4">
                  {energyData.comparison.labels.map((label, index) => {
                    const before = energyData.comparison.beforeSolar[index];
                    const after = energyData.comparison.afterSolar[index];
                    const savings = before - after;
                    const savingsPercent = ((savings / before) * 100).toFixed(1);
                    
                    return (
                      <div key={label} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          {getUnitIcon(label)}
                          <div>
                            <div className="font-medium">{label}</div>
                            <div className="text-sm text-muted-foreground">
                              Economia: {formatCurrency(savings * 12)}/ano
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-700">
                          -{savingsPercent}%
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-600" />
                Padrão de Consumo vs Geração Solar (24h)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Line data={hourlyData} options={chartOptions} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-lg font-bold text-orange-600">6:00-10:00</div>
                  <div className="text-xs text-muted-foreground">Pico Matinal</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="text-lg font-bold text-yellow-600">10:00-16:00</div>
                  <div className="text-xs text-muted-foreground">Máx. Geração</div>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-lg font-bold text-red-600">18:00-22:00</div>
                  <div className="text-xs text-muted-foreground">Pico Noturno</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">85%</div>
                  <div className="text-xs text-muted-foreground">Autoconsumo</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benchmark" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                Benchmark - Economia de Energia (%)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Line data={benchmarkChartData} options={chartOptions} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <Card className="border-yellow-200 bg-yellow-50">
                  <CardContent className="p-4 text-center">
                    <div className="text-lg font-bold text-yellow-600">17.3%</div>
                    <div className="text-sm text-muted-foreground">PRÓBRASIL</div>
                    <Badge className="mt-2 bg-yellow-100 text-yellow-700">#1 Posição</Badge>
                  </CardContent>
                </Card>
                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="p-4 text-center">
                    <div className="text-lg font-bold text-blue-600">12.9%</div>
                    <div className="text-sm text-muted-foreground">Média do Setor</div>
                    <Badge variant="secondary" className="mt-2">+34% acima</Badge>
                  </CardContent>
                </Card>
                <Card className="border-gray-200 bg-gray-50">
                  <CardContent className="p-4 text-center">
                    <div className="text-lg font-bold text-gray-600">11.3%</div>
                    <div className="text-sm text-muted-foreground">Concorrentes</div>
                    <Badge variant="secondary" className="mt-2">+53% acima</Badge>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Insights e Recomendações */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-600" />
              Impacto Ambiental
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">12.3t</div>
                <div className="text-sm text-muted-foreground">CO² Evitado</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">156</div>
                <div className="text-sm text-muted-foreground">Árvores Equivalentes</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Meta Anual: 15t CO²</span>
                <span className="font-medium">82% atingido</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{width: '82%'}}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              Recomendações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="font-medium text-yellow-800">Otimização de Horários</div>
              <div className="text-sm text-yellow-700">
                Considere deslocar 20% do consumo noturno para o período das 10h-16h
              </div>
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="font-medium text-green-800">Expansão Sistema</div>
              <div className="text-sm text-green-700">
                Unidade industrial tem potencial para +15% economia com expansão
              </div>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="font-medium text-blue-800">Benchmarking</div>
              <div className="text-sm text-blue-700">
                Performance superior à média do setor em 34%
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}