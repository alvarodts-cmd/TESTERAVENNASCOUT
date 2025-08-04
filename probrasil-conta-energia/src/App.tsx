import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Charts } from "@/components/Charts";
import { MainSystem } from "@/components/MainSystem";
import { 
  Download, 
  Zap, 
  Sun, 
  TrendingDown, 
  Calendar, 
  MapPin, 
  User, 
  Building,
  CreditCard,
  Phone,
  CheckCircle,
  Leaf,
  QrCode,
  Copy,
  Clock,
  ArrowLeft,
  LayoutDashboard
} from "lucide-react";

interface BillData {
  customer: string;
  distributor: string;
  month: string;
  unit: string;
  address: string;
  consumption: number;
  originalValue: number;
  rate: number;
  publicLighting: number;
  tariffFlag: number;
  discount: number;
  finalValue: number;
  savings: number;
  accumulatedSavings: number;
  creditsUsed: number;
  nextCycleBalance: number;
  paymentValue: number;
  bank: string;
  agency: string;
  account: string;
  pix: string;
  cpf: string;
  name: string;
}

const billData: BillData = {
  customer: "RAVENNA",
  distributor: "ENERGISA SERGIPE-DISTRIB.ENERGIA SA",
  month: "JULHO/2025",
  unit: "1728412",
  address: "AV MARIO JORGE MENEZES VIEIRA, 342 - TERRENO - ATALAIA ARACAJU",
  consumption: 1767,
  originalValue: 1658.89,
  rate: 0.93882,
  publicLighting: 204.45,
  tariffFlag: 0,
  discount: 15,
  finalValue: 1583.84,
  savings: 279.50,
  accumulatedSavings: 279.50,
  creditsUsed: 1767,
  nextCycleBalance: 367,
  paymentValue: 1583.84,
  bank: "ITAU",
  agency: "9690",
  account: "02813-0",
  pix: "79998727417",
  cpf: "091.662.534/62",
  name: "Álvaro Dantas Oliveira Filho"
};

export default function ContaEnergia() {
  const [currentView, setCurrentView] = React.useState<'system' | 'bill'>('system');
  
  const handleExportPDF = () => {
    if (confirm('Deseja exportar a conta de energia em PDF?')) {
      window.print();
    }
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(billData.pix);
    alert('Chave PIX copiada!');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (currentView === 'system') {
    return (
      <MainSystem 
        formatCurrency={formatCurrency} 
        onViewBill={() => setCurrentView('bill')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
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
                  Conta Digital - Visualização Individual
                  <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                    <Leaf className="h-3 w-3 mr-1" />
                    Sustentável
                  </Badge>
                </div>
                <div>Energia Renovável</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setCurrentView('system')}
                className="gap-2"
              >
                <LayoutDashboard size={16} />
                Sistema Completo
              </Button>
              <Button onClick={handleExportPDF} className="gap-2 no-print">
                <Download size={16} />
                Exportar PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl animate-slide-in">
        {/* Solar Savings Highlight */}
        <Card className="mb-8 border-primary/20 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent shadow-lg hover:shadow-xl transition-shadow duration-300 animate-pulse-glow">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary p-3">
                <Sun className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold text-primary">
                    Economia com Energia Solar
                  </h2>
                  <Badge className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Ativo
                  </Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 animate-bounce-in card-hover">
                    <div className="text-3xl font-bold text-primary">{billData.discount}%</div>
                    <div className="text-sm text-muted-foreground font-medium">Desconto Solar</div>
                  </div>
                  <div className="p-3 rounded-lg bg-green-50 border border-green-200 animate-bounce-in card-hover" style={{animationDelay: '0.1s'}}>
                    <div className="text-3xl font-bold text-green-600">{formatCurrency(billData.savings)}</div>
                    <div className="text-sm text-muted-foreground font-medium">Economia Mensal</div>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 animate-bounce-in card-hover" style={{animationDelay: '0.2s'}}>
                    <div className="text-3xl font-bold text-blue-600">{billData.creditsUsed}</div>
                    <div className="text-sm text-muted-foreground font-medium">kWh Utilizados</div>
                  </div>
                  <div className="p-3 rounded-lg bg-orange-50 border border-orange-200 animate-bounce-in card-hover" style={{animationDelay: '0.3s'}}>
                    <div className="text-3xl font-bold text-orange-600">{billData.nextCycleBalance}</div>
                    <div className="text-sm text-muted-foreground font-medium">kWh Saldo</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Charts Section */}
        <Charts formatCurrency={formatCurrency} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Customer Information */}
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Dados do Cliente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Consumidor</label>
                  <p className="font-medium">{billData.customer}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Unidade</label>
                  <p className="font-medium">{billData.unit}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  Endereço
                </label>
                <p className="font-medium">{billData.address}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <Building className="h-4 w-4" />
                    Distribuidora
                  </label>
                  <p className="font-medium text-sm">{billData.distributor}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Referência
                  </label>
                  <p className="font-medium">{billData.month}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bill Details */}
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Detalhes da Fatura
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Consumo Compensado</label>
                  <p className="font-bold text-lg">{billData.consumption.toLocaleString()} kWh</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Tarifa (R$/kWh)</label>
                  <p className="font-medium">R$ {billData.rate.toFixed(5)}</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Valor sem desconto</span>
                  <span>{formatCurrency(billData.originalValue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxa de iluminação pública</span>
                  <span>{formatCurrency(billData.publicLighting)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bandeira tarifária</span>
                  <span>{formatCurrency(billData.tariffFlag)}</span>
                </div>
                <div className="flex justify-between text-green-600 font-medium">
                  <span className="flex items-center gap-1">
                    <TrendingDown className="h-4 w-4" />
                    Desconto Solar ({billData.discount}%)
                  </span>
                  <span>-{formatCurrency(billData.savings)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-xl font-bold">
                  <span>Valor Final</span>
                  <span className="text-primary">{formatCurrency(billData.finalValue)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card className="lg:col-span-2 shadow-md hover:shadow-lg transition-shadow duration-300 card-hover">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Informações de Pagamento
                </div>
                <Badge className="bg-red-100 text-red-700 border-red-200">
                  <Clock className="h-3 w-3 mr-1" />
                  Vencimento: 15/08/2025
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Payment Amount */}
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <label className="text-sm font-medium text-muted-foreground">Valor a ser pago</label>
                    <p className="text-3xl font-bold text-primary">{formatCurrency(billData.paymentValue)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Banco</label>
                      <p className="font-medium">{billData.bank}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Agência</label>
                      <p className="font-medium">{billData.agency}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Conta</label>
                    <p className="font-medium">{billData.account}</p>
                  </div>
                </div>
                
                {/* PIX Information */}
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-1 mb-2">
                      <Phone className="h-4 w-4" />
                      PIX - Pagamento Instantâneo
                    </label>
                    <div className="flex items-center gap-2">
                      <p className="font-mono text-lg font-medium flex-1">{billData.pix}</p>
                      <Button size="sm" variant="outline" onClick={handleCopyPix} className="no-print">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">CPF</label>
                    <p className="font-mono font-medium">{billData.cpf}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Nome</label>
                    <p className="font-medium text-sm">{billData.name}</p>
                  </div>
                </div>
                
                {/* QR Code */}
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="p-4 bg-white rounded-lg border-2 border-gray-200 shadow-inner">
                    <div className="w-32 h-32 bg-gray-100 rounded flex items-center justify-center">
                      <QrCode className="h-20 w-20 text-gray-400" />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-muted-foreground">QR Code PIX</p>
                    <p className="text-xs text-muted-foreground">Escaneie para pagar</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Environmental Impact */}
        <Card className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-center gap-4 text-center">
              <Leaf className="h-8 w-8 text-green-600" />
              <div>
                <h3 className="font-bold text-lg text-green-700">Impacto Ambiental Positivo</h3>
                <p className="text-sm text-muted-foreground">
                  Neste mês você evitou a emissão de aproximadamente <strong>847 kg de CO²</strong> na atmosfera
                </p>
              </div>
              <Sun className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p className="font-medium">PRÓBRASIL Energia - Sua parceira em energia renovável</p>
          <p className="mt-1">Esta conta foi gerada digitalmente e não precisa ser impressa 🌱</p>
          <p className="mt-2 text-xs">Central de Atendimento: 0800-123-4567 | www.probrasil.com.br</p>
        </div>
      </main>
    </div>
  );
}