import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Upload,
  FileText,
  CheckCircle,
  AlertTriangle,
  X,
  Eye,
  Download,
  Calendar,
  Zap,
  TrendingUp,
  Flag,
  DollarSign
} from "lucide-react";

interface PDFImportProps {
  onImportSuccess: (data: any) => void;
  formatCurrency: (value: number) => string;
}

interface TariffBand {
  name: string;
  color: string;
  cost: number;
  description: string;
}

const tariffBands: TariffBand[] = [
  {
    name: 'Verde',
    color: 'green',
    cost: 0,
    description: 'Sem custo adicional na conta de luz'
  },
  {
    name: 'Amarela',
    color: 'yellow',
    cost: 1.885,
    description: 'Acréscimo de R$ 1,885 por cada 100 kWh consumidos'
  },
  {
    name: 'Vermelha - Patamar 1',
    color: 'red',
    cost: 4.463,
    description: 'Acréscimo de R$ 4,463 por cada 100 kWh consumidos'
  },
  {
    name: 'Vermelha - Patamar 2',
    color: 'red',
    cost: 7.877,
    description: 'Acréscimo de R$ 7,877 por cada 100 kWh consumidos'
  }
];

export function PDFImport({ onImportSuccess, formatCurrency }: PDFImportProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [importedData, setImportedData] = useState<any>(null);
  const [selectedBand, setSelectedBand] = useState<TariffBand>(tariffBands[0]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dados extraídos do PDF da Ravenna Beach Club - Cálculo correto
  const ravennaData = {
    cliente: 'Ravenna Beach Club',
    unidade: '1728412',
    endereco: 'AV MARIO JORGE MENEZES VIEIRA, 342 - ATALAIA',
    cidade: 'ARACAJU/SE',
    periodo: '23/06/2025 a 24/07/2025',
    vencimento: '11/08/2025',
    consumo: 1767, // kWh correto do PDF
    valorPago: 1583.85, // Com energia solar (15% desconto)
    valorSemSolar: 1863.35, // Cálculo: (1767 × 0,938820) + 204,45
    economia: 279.50, // 15% de economia (1863.35 - 1583.85)
    percentualEconomia: 15,
    valorKwh: 0.938820, // Valor unitário do kWh da conta
    taxaIluminacao: 204.45, // Taxa de iluminação pública
    composicao: {
      distribuicao: 63.34,
      energia: 82.95,
      transmissao: 10.89,
      encargos: 23.43,
      impostos: 409.27
    },
    injecaoEnergia: {
      gdi: 213.95,
      gdii: 1240.13
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = async (files: File[]) => {
    const pdfFiles = files.filter(file => file.type === 'application/pdf');
    
    if (pdfFiles.length === 0) {
      setImportStatus('error');
      return;
    }

    setIsProcessing(true);
    
    // Simular processamento do PDF (em produção seria uma chamada real para API de OCR)
    setTimeout(() => {
      setImportedData(ravennaData);
      setImportStatus('success');
      setIsProcessing(false);
      onImportSuccess(ravennaData);
    }, 2000);
  };

  const calculateBandCost = (consumption: number, band: TariffBand) => {
    return (consumption / 100) * band.cost;
  };

  const getBandColor = (color: string) => {
    switch (color) {
      case 'green': return 'bg-green-100 text-green-800 border-green-200';
      case 'yellow': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'red': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getBandIcon = (color: string) => {
    switch (color) {
      case 'green': return '🟢';
      case 'yellow': return '🟡';
      case 'red': return '🔴';
      default: return '⚪';
    }
  };

  return (
    <div className="space-y-6">
      {/* Área de Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Importar Contas de Energia (PDF)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging
                ? 'border-primary bg-primary/10'
                : importStatus === 'success'
                ? 'border-green-500 bg-green-50'
                : importStatus === 'error'
                ? 'border-red-500 bg-red-50'
                : 'border-muted-foreground/25 hover:border-primary'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {isProcessing ? (
              <div className="space-y-3">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
                <p className="text-lg font-medium">Processando PDF...</p>
                <p className="text-sm text-muted-foreground">Extraindo dados da conta de energia</p>
              </div>
            ) : importStatus === 'success' ? (
              <div className="space-y-3">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />
                <p className="text-lg font-medium text-green-800">PDF importado com sucesso!</p>
                <p className="text-sm text-muted-foreground">
                  Dados de {importedData?.cliente} carregados
                </p>
              </div>
            ) : importStatus === 'error' ? (
              <div className="space-y-3">
                <AlertTriangle className="h-12 w-12 text-red-600 mx-auto" />
                <p className="text-lg font-medium text-red-800">Erro ao processar PDF</p>
                <p className="text-sm text-muted-foreground">
                  Certifique-se de que é um PDF válido de conta de energia
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto" />
                <p className="text-lg font-medium">
                  Arraste e solte PDFs aqui ou clique para selecionar
                </p>
                <p className="text-sm text-muted-foreground">
                  Suporte para contas ENERGISA, COELBA e outras distribuidoras
                </p>
              </div>
            )}
            
            {!isProcessing && (
              <div className="mt-4">
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="mx-auto"
                >
                  Selecionar Arquivos
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  multiple
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </div>
            )}
          </div>

          {importStatus === 'success' && (
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Ver Dados Extraídos
              </Button>
              <Button 
                size="sm" 
                onClick={() => {
                  setImportStatus('idle');
                  setImportedData(null);
                }}
              >
                <Upload className="h-4 w-4 mr-2" />
                Importar Novos PDFs
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dados Importados */}
      {importedData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Dados da Conta Importada
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Informações do Cliente</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cliente:</span>
                      <span className="font-medium">{importedData.cliente}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Unidade:</span>
                      <span className="font-medium">{importedData.unidade}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Endereço:</span>
                      <span className="font-medium text-right">{importedData.endereco}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Período:</span>
                      <span className="font-medium">{importedData.periodo}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Consumo e Valores</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Consumo:</span>
                      <span className="font-medium">{importedData.consumo} kWh</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Valor pago:</span>
                      <span className="font-medium">{formatCurrency(importedData.valorPago)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sem energia solar:</span>
                      <span className="font-medium">{formatCurrency(importedData.valorSemSolar)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Economia:</span>
                      <span className="font-medium text-green-600">
                        {formatCurrency(importedData.economia)} ({importedData.percentualEconomia}%)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Composição da Conta</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Distribuição:</span>
                      <span className="font-medium">{formatCurrency(importedData.composicao.distribuicao)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Energia:</span>
                      <span className="font-medium">{formatCurrency(importedData.composicao.energia)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Transmissão:</span>
                      <span className="font-medium">{formatCurrency(importedData.composicao.transmissao)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Encargos:</span>
                      <span className="font-medium">{formatCurrency(importedData.composicao.encargos)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Impostos:</span>
                      <span className="font-medium">{formatCurrency(importedData.composicao.impostos)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Injeção de Energia</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">GDI:</span>
                      <span className="font-medium text-green-600">-{formatCurrency(importedData.injecaoEnergia.gdi)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">GDII:</span>
                      <span className="font-medium text-green-600">-{formatCurrency(importedData.injecaoEnergia.gdii)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Simulador de Bandeiras Tarifárias */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flag className="h-5 w-5" />
            Simulador de Bandeiras Tarifárias
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-4">
                Simule o impacto das bandeiras tarifárias no sua conta de energia.
                {importedData && ` Baseado no consumo de ${importedData.consumo} kWh.`}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {tariffBands.map((band, index) => {
                const consumption = importedData?.consumo || 1767;
                const bandCost = calculateBandCost(consumption, band);
                const totalWithBand = (importedData?.valorPago || 1583.85) + bandCost;
                
                return (
                  <Card 
                    key={index} 
                    className={`cursor-pointer transition-all hover:shadow-md border-2 ${
                      selectedBand.name === band.name ? 'border-primary' : 'border-transparent'
                    }`}
                    onClick={() => setSelectedBand(band)}
                  >
                    <CardContent className="p-4">
                      <div className="text-center space-y-3">
                        <div className="text-2xl">{getBandIcon(band.color)}</div>
                        <div>
                          <h3 className="font-semibold">{band.name}</h3>
                          <Badge 
                            variant="secondary" 
                            className={getBandColor(band.color)}
                          >
                            {band.cost === 0 ? 'Gratuita' : `+R$ ${band.cost.toFixed(3)}/100kWh`}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <div className="text-lg font-bold text-primary">
                            {bandCost === 0 ? 'R$ 0,00' : `+${formatCurrency(bandCost)}`}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Total: {formatCurrency(totalWithBand)}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Alert>
              <Flag className="h-4 w-4" />
              <AlertDescription>
                <strong>Bandeira {selectedBand.name}:</strong> {selectedBand.description}
                {importedData && selectedBand.cost > 0 && (
                  <span className="block mt-2">
                    Para o consumo de {importedData.consumo} kWh: <strong>+{formatCurrency(calculateBandCost(importedData.consumo, selectedBand))}</strong>
                  </span>
                )}
              </AlertDescription>
            </Alert>

            {importedData && (
              <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Comparativo de Custos por Bandeira
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {tariffBands.map((band, index) => {
                    const bandCost = calculateBandCost(importedData.consumo, band);
                    const totalWithBand = importedData.valorPago + bandCost;
                    const difference = bandCost;
                    
                    return (
                      <div key={index} className="flex justify-between items-center">
                        <span className="flex items-center gap-2">
                          <span>{getBandIcon(band.color)}</span>
                          <span>{band.name}:</span>
                        </span>
                        <div className="text-right">
                          <div className="font-medium">{formatCurrency(totalWithBand)}</div>
                          {difference > 0 && (
                            <div className="text-xs text-red-600">+{formatCurrency(difference)}</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}