import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Sun
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
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Historical data for charts - Ravenna Beach Club
// Baseado apenas no mês atual - primeira conta com desconto
const monthlyData = {
  labels: ['Jul'],
  consumption: [1767], // Consumo correto do PDF
  savings: [279.50], // Economia correta: (1767 × 0,938820 + 204,45) × 0,15
  beforeSolar: [1863.35], // Valor sem energia solar
  afterSolar: [1583.85] // Valor com energia solar (15% desconto)
};

interface ChartsProps {
  formatCurrency: (value: number) => string;
}

export function Charts({ formatCurrency }: ChartsProps) {
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
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1f2937',
        bodyColor: '#1f2937',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        cornerRadius: 8,
        titleFont: {
          size: 13,
          weight: 'bold' as const
        },
        bodyFont: {
          size: 12
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.06)',
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 11,
            family: 'Inter, sans-serif'
          },
          color: '#6b7280',
          padding: 8
        },
        border: {
          display: false
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
            family: 'Inter, sans-serif'
          },
          color: '#6b7280',
          padding: 8
        },
        border: {
          display: false
        }
      }
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 6,
        backgroundColor: '#fff',
        borderWidth: 2,
      },
      line: {
        borderWidth: 2.5,
      },
      bar: {
        borderRadius: 4,
        borderSkipped: false,
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutCubic' as const
    }
  };

  const consumptionChartData = {
    labels: monthlyData.labels,
    datasets: [
      {
        label: 'Consumo (kWh)',
        data: monthlyData.consumption,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const savingsChartData = {
    labels: monthlyData.labels,
    datasets: [
      {
        label: 'Economia (R$)',
        data: monthlyData.savings,
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1,
      },
    ],
  };

  const comparisonChartData = {
    labels: monthlyData.labels,
    datasets: [
      {
        label: 'Antes da Energia Solar (R$)',
        data: monthlyData.beforeSolar,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.3,
      },
      {
        label: 'Após Energia Solar (R$)',
        data: monthlyData.afterSolar,
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.3,
      },
    ],
  };

  return (
    <Card className="mb-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Análise de Consumo e Economia
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="consumption" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="consumption" className="text-xs sm:text-sm">Consumo Mensal</TabsTrigger>
            <TabsTrigger value="savings" className="text-xs sm:text-sm">Economia</TabsTrigger>
            <TabsTrigger value="comparison" className="text-xs sm:text-sm">Comparação</TabsTrigger>
          </TabsList>
          
          <TabsContent value="consumption">
            <div className="chart-container">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                Histórico de Consumo Mensal
              </h3>
              <div className="h-64">
                <Line data={consumptionChartData} options={chartOptions} />
              </div>
              <p className="text-sm text-muted-foreground mt-3 text-center">
                Consumo do mês atual: <strong>1.767 kWh</strong>
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="savings">
            <div className="chart-container">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-green-600" />
                Economia Mensal com Energia Solar
              </h3>
              <div className="h-64">
                <Bar data={savingsChartData} options={chartOptions} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-center">
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-lg font-bold text-green-600">R$ 280</div>
                  <div className="text-xs text-muted-foreground">Economia do Mês</div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-lg font-bold text-blue-600">R$ 280</div>
                  <div className="text-xs text-muted-foreground">Economia Mensal</div>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="text-lg font-bold text-orange-600">15.0%</div>
                  <div className="text-xs text-muted-foreground">% Média de Economia</div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="comparison">
            <div className="chart-container">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Sun className="h-4 w-4 text-yellow-500" />
                Antes vs Depois da Energia Solar
              </h3>
              <div className="h-64">
                <Line data={comparisonChartData} options={chartOptions} />
              </div>
              <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-yellow-50 rounded-lg border border-green-200">
                <p className="text-sm text-center font-medium">
                  🌱 Com a energia solar, o Ravenna Beach Club economiza <strong>R$ 279,50</strong> este mês
                  (<strong>15% de desconto</strong> sobre R$ 1.863,35)!
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}