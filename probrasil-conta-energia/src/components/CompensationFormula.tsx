import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator,
  Settings,
  Percent,
  DollarSign,
  TrendingDown,
  Check
} from "lucide-react";

interface CompensationFormula {
  id: string;
  name: string;
  description: string;
  type: 'percentage' | 'fixed' | 'tiered';
  value: number;
  minValue?: number;
  maxValue?: number;
  isActive: boolean;
}

const compensationFormulas: CompensationFormula[] = [
  {
    id: 'standard_15',
    name: 'Padrão 15%',
    description: 'Desconto fixo de 15% sobre o valor total da conta sem energia solar',
    type: 'percentage',
    value: 15,
    isActive: true
  },
  {
    id: 'progressive_10_20',
    name: 'Progressivo 10-20%',
    description: 'Desconto progressivo: 10% até 1000 kWh, 15% até 2000 kWh, 20% acima',
    type: 'tiered',
    value: 15,
    minValue: 10,
    maxValue: 20,
    isActive: false
  },
  {
    id: 'fixed_250',
    name: 'Valor Fixo R$ 250',
    description: 'Desconto fixo de R$ 250,00 independente do consumo',
    type: 'fixed',
    value: 250,
    isActive: false
  },
  {
    id: 'premium_20',
    name: 'Premium 20%',
    description: 'Desconto de 20% para clientes premium (consumo > 1500 kWh)',
    type: 'percentage',
    value: 20,
    minValue: 1500,
    isActive: false
  },
  {
    id: 'custom',
    name: 'Personalizado',
    description: 'Configure um desconto personalizado para este cliente',
    type: 'percentage',
    value: 0,
    isActive: false
  }
];

interface CompensationFormulaProps {
  onFormulaChange?: (formula: CompensationFormula) => void;
  currentConsumption?: number;
  currentBill?: number;
}

export function CompensationFormula({ 
  onFormulaChange, 
  currentConsumption = 1767, 
  currentBill = 1863.35 
}: CompensationFormulaProps) {
  const [formulas, setFormulas] = useState(compensationFormulas);
  const [customValue, setCustomValue] = useState(15);

  const getFormulaIcon = (type: string) => {
    switch (type) {
      case 'percentage': return <Percent className="h-4 w-4" />;
      case 'fixed': return <DollarSign className="h-4 w-4" />;
      case 'tiered': return <TrendingDown className="h-4 w-4" />;
      default: return <Calculator className="h-4 w-4" />;
    }
  };

  const getFormulaColor = (type: string) => {
    switch (type) {
      case 'percentage': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'fixed': return 'bg-green-100 text-green-700 border-green-200';
      case 'tiered': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const calculateDiscount = (formula: CompensationFormula, consumption: number, billValue: number) => {
    switch (formula.type) {
      case 'percentage':
        if (formula.minValue && consumption < formula.minValue) return 0;
        return billValue * (formula.value / 100);
      
      case 'fixed':
        return formula.value;
      
      case 'tiered':
        if (consumption <= 1000) return billValue * (formula.minValue! / 100);
        if (consumption <= 2000) return billValue * (formula.value / 100);
        return billValue * (formula.maxValue! / 100);
      
      default:
        return 0;
    }
  };

  const handleFormulaSelect = (selectedFormula: CompensationFormula) => {
    const updatedFormulas = formulas.map(formula => ({
      ...formula,
      isActive: formula.id === selectedFormula.id
    }));
    
    setFormulas(updatedFormulas);
    onFormulaChange?.(selectedFormula);
  };

  const handleCustomValueChange = (value: number) => {
    setCustomValue(value);
    const customFormula = {
      ...formulas.find(f => f.id === 'custom')!,
      value
    };
    
    const updatedFormulas = formulas.map(formula => 
      formula.id === 'custom' 
        ? { ...formula, value, isActive: true }
        : { ...formula, isActive: false }
    );
    
    setFormulas(updatedFormulas);
    onFormulaChange?.(customFormula);
  };

  const activeFormula = formulas.find(f => f.isActive)!;
  const currentDiscount = calculateDiscount(activeFormula, currentConsumption, currentBill);
  const finalValue = currentBill - currentDiscount;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Fórmula de Compensação
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Simulação Atual */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Simulação Atual
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">R$ {currentBill.toFixed(2)}</div>
              <div className="text-muted-foreground">Valor Original</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-red-600">-R$ {currentDiscount.toFixed(2)}</div>
              <div className="text-muted-foreground">Desconto</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">R$ {finalValue.toFixed(2)}</div>
              <div className="text-muted-foreground">Valor Final</div>
            </div>
          </div>
        </div>

        {/* Lista de Fórmulas */}
        <div className="space-y-3">
          <h4 className="font-semibold">Selecionar Fórmula:</h4>
          {formulas.map((formula) => (
            <Card 
              key={formula.id} 
              className={`cursor-pointer transition-all hover:shadow-md border-2 ${
                formula.isActive ? 'border-primary bg-primary/5' : 'border-transparent'
              }`}
              onClick={() => handleFormulaSelect(formula)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getFormulaIcon(formula.type)}
                      <h5 className="font-semibold">{formula.name}</h5>
                      {formula.isActive && <Check className="h-4 w-4 text-green-600" />}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {formula.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className={getFormulaColor(formula.type)}>
                        {formula.type === 'percentage' ? `${formula.value}%` : 
                         formula.type === 'fixed' ? `R$ ${formula.value}` : 
                         `${formula.minValue}%-${formula.maxValue}%`}
                      </Badge>
                      {formula.id !== 'custom' && (
                        <span className="text-sm text-muted-foreground">
                          Desconto: R$ {calculateDiscount(formula, currentConsumption, currentBill).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Configuração Personalizada */}
        {formulas.find(f => f.id === 'custom')?.isActive && (
          <div className="p-4 border rounded-lg bg-gray-50">
            <h5 className="font-semibold mb-3">Configuração Personalizada:</h5>
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium">Percentual de Desconto:</label>
              <input
                type="number"
                min="0"
                max="50"
                step="0.1"
                value={customValue}
                onChange={(e) => handleCustomValueChange(Number(e.target.value))}
                className="w-20 px-2 py-1 border rounded text-center"
              />
              <span className="text-sm">%</span>
              <span className="text-sm text-muted-foreground">
                = R$ {calculateDiscount({ ...activeFormula, value: customValue }, currentConsumption, currentBill).toFixed(2)}
              </span>
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-4 border-t">
          <Button className="flex-1">
            Aplicar Fórmula
          </Button>
          <Button variant="outline">
            Salvar como Padrão
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}