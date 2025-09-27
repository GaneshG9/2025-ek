'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Terminal, 
  Download, 
  Copy, 
  CheckCircle, 
  AlertCircle, 
  Code, 
  FileText,
  Rocket,
  Settings,
  Cloud,
  Shield
} from 'lucide-react';
import { DeploymentService, DeploymentPlatform } from '@/lib/deployment-service';
import { toast } from '@/hooks/use-toast';

interface AutoSetupProps {
  selectedPlatform: string;
  config: {
    subdomain: string;
    domain?: string;
    environmentVariables: Record<string, string>;
  };
}

export function AutomatedSetup({ selectedPlatform, config }: AutoSetupProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  
  const platform = DeploymentService.getPlatform(selectedPlatform);
  
  if (!platform) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Platform configuration not found. Please select a valid hosting platform.
        </AlertDescription>
      </Alert>
    );
  }

  const deploymentConfig = {
    platform: selectedPlatform,
    subdomain: config.subdomain,
    domain: config.domain,
    environmentVariables: config.environmentVariables,
    buildSettings: {
      command: platform.buildCommand,
      outputDir: platform.outputDir,
      nodeVersion: '18'
    }
  };

  const configFiles = DeploymentService.generateConfigFiles(deploymentConfig);
  const deploymentScript = DeploymentService.generateDeploymentScript(deploymentConfig);
  const setupSteps = DeploymentService.getSetupInstructions(selectedPlatform);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: `${filename} downloaded successfully`,
    });
  };

  const markStepComplete = (stepIndex: number) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Settings className="h-5 w-5 text-blue-600" />
            Automated Setup for {platform.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Follow these steps to deploy your website automatically
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          {completedSteps.length}/{setupSteps.length + 2} Complete
        </Badge>
      </div>

      <Tabs defaultValue="steps" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="steps">📋 Steps</TabsTrigger>
          <TabsTrigger value="config">⚙️ Config Files</TabsTrigger>
          <TabsTrigger value="script">🚀 Deploy Script</TabsTrigger>
          <TabsTrigger value="verify">✅ Verify</TabsTrigger>
        </TabsList>

        <TabsContent value="steps">
          <Card>
            <CardHeader>
              <CardTitle>Setup Instructions</CardTitle>
              <CardDescription>
                Follow these steps in order to set up your {platform.name} deployment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {setupSteps.map((step, index) => (
                <div 
                  key={index}
                  className={`flex items-start gap-3 p-4 border rounded-lg transition-all ${
                    completedSteps.includes(index)
                      ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'
                      : currentStep === index
                      ? 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800'
                      : 'bg-gray-50 dark:bg-gray-900'
                  }`}
                >
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                    completedSteps.includes(index)
                      ? 'bg-green-600 text-white'
                      : currentStep === index
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-400 text-white'
                  }`}>
                    {completedSteps.includes(index) ? '✓' : index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{step}</p>
                    {step.includes('npm i -g') && (
                      <div className="mt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(step.match(/npm i -g [^\s]+/)?.[0] || '', 'Install command')}
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Copy Command
                        </Button>
                      </div>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => markStepComplete(index)}
                    disabled={completedSteps.includes(index)}
                  >
                    {completedSteps.includes(index) ? 'Complete' : 'Mark Done'}
                  </Button>
                </div>
              ))}
              
              {/* Additional Steps */}
              <div className={`flex items-start gap-3 p-4 border rounded-lg ${
                completedSteps.includes(setupSteps.length)
                  ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'
                  : 'bg-gray-50 dark:bg-gray-900'
              }`}>
                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                  completedSteps.includes(setupSteps.length)
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-400 text-white'
                }`}>
                  {completedSteps.includes(setupSteps.length) ? '✓' : setupSteps.length + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium">Download and add configuration files</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Add the generated config files to your project
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => markStepComplete(setupSteps.length)}
                >
                  Mark Done
                </Button>
              </div>

              <div className={`flex items-start gap-3 p-4 border rounded-lg ${
                completedSteps.includes(setupSteps.length + 1)
                  ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'
                  : 'bg-gray-50 dark:bg-gray-900'
              }`}>
                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                  completedSteps.includes(setupSteps.length + 1)
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-400 text-white'
                }`}>
                  {completedSteps.includes(setupSteps.length + 1) ? '✓' : setupSteps.length + 2}
                </div>
                <div className="flex-1">
                  <p className="font-medium">Run deployment script</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Execute the generated deployment script
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => markStepComplete(setupSteps.length + 1)}
                >
                  Mark Done
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="config">
          <div className="space-y-4">
            {Object.entries(configFiles).map(([filename, content]) => (
              <Card key={filename}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    {filename}
                  </CardTitle>
                  <CardDescription>
                    Configuration file for {platform.name} deployment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto max-h-64">
                      <code>{content}</code>
                    </pre>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(content, filename)}
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => downloadFile(content, filename)}
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="script">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-4 w-4" />
                Deployment Script
              </CardTitle>
              <CardDescription>
                Automated deployment script for {platform.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <Rocket className="h-4 w-4" />
                  <AlertDescription>
                    This script will automatically build and deploy your website to {platform.name}.
                    Make sure you have completed all previous steps before running it.
                  </AlertDescription>
                </Alert>
                
                <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto max-h-80">
                  <code>{deploymentScript}</code>
                </pre>
                
                <div className="flex gap-2">
                  <Button
                    onClick={() => copyToClipboard(deploymentScript, 'Deployment script')}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Script
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => downloadFile(deploymentScript, 'deploy.sh')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Script
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verify">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Deployment Verification
              </CardTitle>
              <CardDescription>
                Verify your deployment is working correctly
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium">Checklist</h4>
                  {[
                    'Website loads correctly',
                    'SSL certificate is active',
                    'All pages are accessible',
                    'Forms work properly',
                    'Images load correctly',
                    'Search functionality works',
                    'Admin panel is accessible'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">Expected URL</h4>
                  <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                      Your Website URL:
                    </p>
                    <code className="text-sm">
                      https://{config.domain || `${config.subdomain}.${
                        selectedPlatform === 'vercel' ? 'vercel.app' :
                        selectedPlatform === 'netlify' ? 'netlify.app' :
                        selectedPlatform === 'github-pages' ? 'github.io' : 'example.com'
                      }`}
                    </code>
                  </div>
                  
                  <div className="space-y-2">
                    <h5 className="font-medium">Platform Features:</h5>
                    <div className="grid grid-cols-1 gap-1">
                      {platform.features.slice(0, 4).map((feature, index) => (
                        <div key={index} className="flex items-center gap-1 text-sm text-green-600">
                          <CheckCircle className="h-3 w-3" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}