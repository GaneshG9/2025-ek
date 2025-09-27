'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Calculator, Zap, Sun, DollarSign, TrendingUp, Download } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SolarCalculator() {
  const router = useRouter();
  const [roofArea, setRoofArea] = useState('');
  const [monthlyBill, setMonthlyBill] = useState('');
  const [location, setLocation] = useState('');
  const [systemType, setSystemType] = useState('grid-tied');

  const [results, setResults] = useState({
    systemSize: 0,
    annualGeneration: 0,
    annualSavings: 0,
    paybackPeriod: 0,
    totalCost: 0,
    co2Savings: 0
  });

  const calculateSolar = () => {
    const area = parseFloat(roofArea);
    const bill = parseFloat(monthlyBill);
    
    if (!area || !bill) return;

    // Solar calculations (simplified)
    const systemSize = Math.min(area / 100, bill / 1000) * 10; // kW
    const annualGeneration = systemSize * 1200; // kWh per year (average for India)
    const annualSavings = annualGeneration * 6; // Rs 6 per kWh average
    const totalCost = systemSize * 60000; // Rs 60,000 per kW
    const paybackPeriod = totalCost / annualSavings;
    const co2Savings = annualGeneration * 0.7; // kg CO2 per kWh

    setResults({
      systemSize: parseFloat(systemSize.toFixed(2)),
      annualGeneration: parseFloat(annualGeneration.toFixed(0)),
      annualSavings: parseFloat(annualSavings.toFixed(0)),
      paybackPeriod: parseFloat(paybackPeriod.toFixed(1)),
      totalCost: parseFloat(totalCost.toFixed(0)),
      co2Savings: parseFloat(co2Savings.toFixed(0))
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          onClick={() => router.push('/admin')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
        
        <div className="flex-1">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Calculator className="h-8 w-8 text-orange-600" />
            Solar Calculator
          </h1>
          <p className="text-muted-foreground">Calculate solar system requirements and savings</p>
        </div>
      </div>

      <Tabs defaultValue="calculator" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calculator">Solar Calculator</TabsTrigger>
          <TabsTrigger value="proposals">Proposals</TabsTrigger>
          <TabsTrigger value="installations">Installations</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sun className="h-5 w-5 text-orange-600" />
                  Solar System Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="roofArea">Available Roof Area (sq ft)</Label>
                    <Input
                      id="roofArea"
                      placeholder="e.g., 1000"
                      value={roofArea}
                      onChange={(e) => setRoofArea(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="monthlyBill">Monthly Electricity Bill (₹)</Label>
                    <Input
                      id="monthlyBill"
                      placeholder="e.g., 8000"
                      value={monthlyBill}
                      onChange={(e) => setMonthlyBill(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Mumbai, Maharashtra"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="systemType">System Type</Label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={systemType}
                    onChange={(e) => setSystemType(e.target.value)}
                  >
                    <option value="grid-tied">Grid-Tied System</option>
                    <option value="off-grid">Off-Grid System</option>
                    <option value="hybrid">Hybrid System</option>
                  </select>
                </div>

                <Button 
                  onClick={calculateSolar} 
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  disabled={!roofArea || !monthlyBill}
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate Solar System
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-600" />
                  Calculation Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results.systemSize > 0 ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                        <p className="text-sm text-muted-foreground">System Size</p>
                        <p className="text-2xl font-bold text-orange-600">{results.systemSize} kW</p>
                      </div>
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-sm text-muted-foreground">Annual Generation</p>
                        <p className="text-2xl font-bold text-blue-600">{results.annualGeneration.toLocaleString()} kWh</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <p className="text-sm text-muted-foreground">Annual Savings</p>
                        <p className="text-2xl font-bold text-green-600">₹{results.annualSavings.toLocaleString()}</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <p className="text-sm text-muted-foreground">Payback Period</p>
                        <p className="text-2xl font-bold text-purple-600">{results.paybackPeriod} years</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <p className="text-sm text-muted-foreground">System Cost</p>
                        <p className="text-2xl font-bold text-red-600">₹{results.totalCost.toLocaleString()}</p>
                      </div>
                      <div className="text-center p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                        <p className="text-sm text-muted-foreground">CO₂ Savings/Year</p>
                        <p className="text-2xl font-bold text-teal-600">{results.co2Savings.toLocaleString()} kg</p>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button className="flex-1" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download Report
                      </Button>
                      <Button className="flex-1 bg-orange-600 hover:bg-orange-700">
                        Get Detailed Quote
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calculator className="h-12 w-12 mx-auto mb-4 text-orange-300" />
                    <p>Enter your details to calculate solar system requirements</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="proposals">
          <Card>
            <CardHeader>
              <CardTitle>Solar Proposals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <DollarSign className="h-12 w-12 mx-auto mb-4 text-green-600" />
                <h3 className="text-lg font-semibold mb-2">Manage Proposals</h3>
                <p className="text-muted-foreground mb-4">Track and manage solar installation proposals</p>
                <Button>View All Proposals</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="installations">
          <Card>
            <CardHeader>
              <CardTitle>Installation Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-lg font-semibold mb-2">Track Installations</h3>
                <p className="text-muted-foreground mb-4">Monitor ongoing solar installation projects</p>
                <Button>View Projects</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}