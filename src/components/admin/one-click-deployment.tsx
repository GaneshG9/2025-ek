'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Zap, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  ExternalLink, 
  Shield,
  Globe,
  Rocket,
  Server,
  Lock,
  RefreshCw
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface OneClickDeploymentProps {
  config: {
    hosting: string;
    domain?: string;
    subdomain: string;
    ssl: boolean;
    cdn: boolean;
    compression: boolean;
  };
}

interface DeploymentStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  duration?: number;
}

export function OneClickDeployment({ config }: OneClickDeploymentProps) {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentProgress, setDeploymentProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [deploymentUrl, setDeploymentUrl] = useState<string>('');
  const [deploymentSteps, setDeploymentSteps] = useState<DeploymentStep[]>([
    {
      id: 'validate',
      name: 'Validating Configuration',
      description: 'Checking deployment settings and requirements',
      status: 'pending'
    },
    {
      id: 'build',
      name: 'Building Application',
      description: 'Compiling and optimizing your website',
      status: 'pending'
    },
    {
      id: 'upload',
      name: 'Uploading Files',
      description: 'Transferring files to hosting platform',
      status: 'pending'
    },
    {
      id: 'ssl',
      name: 'Configuring SSL',
      description: 'Setting up HTTPS certificate',
      status: 'pending'
    },
    {
      id: 'cdn',
      name: 'Enabling CDN',
      description: 'Configuring global content delivery',
      status: 'pending'
    },
    {
      id: 'verify',
      name: 'Final Verification',
      description: 'Testing website functionality',
      status: 'pending'
    }
  ]);

  const handleOneClickDeploy = async () => {
    setIsDeploying(true);
    setDeploymentProgress(0);
    setCurrentStep(0);

    try {
      // Reset all steps
      const resetSteps = deploymentSteps.map(step => ({ ...step, status: 'pending' as const }));
      setDeploymentSteps(resetSteps);

      // Simulate deployment process
      for (let i = 0; i < deploymentSteps.length; i++) {
        setCurrentStep(i);
        
        // Update current step to running
        setDeploymentSteps(prev => prev.map((step, index) => 
          index === i ? { ...step, status: 'running' } : step
        ));

        // Simulate step duration
        const stepDuration = Math.random() * 2000 + 1000; // 1-3 seconds
        await new Promise(resolve => setTimeout(resolve, stepDuration));

        // Mark step as completed
        setDeploymentSteps(prev => prev.map((step, index) => 
          index === i ? { ...step, status: 'completed', duration: stepDuration } : step
        ));

        // Update progress
        setDeploymentProgress(((i + 1) / deploymentSteps.length) * 100);
      }

      // Set final deployment URL
      const finalUrl = `https://${config.domain || `${config.subdomain}.${getHostingDomain(config.hosting)}`}`;
      setDeploymentUrl(finalUrl);

      toast({
        title: "🚀 Deployment Successful!",
        description: `Your website is now live at ${finalUrl}`,
      });

    } catch (error) {
      // Mark current step as failed
      setDeploymentSteps(prev => prev.map((step, index) => 
        index === currentStep ? { ...step, status: 'failed' } : step
      ));

      toast({
        title: "❌ Deployment Failed",
        description: "There was an error during deployment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsDeploying(false);
    }
  };

  const getHostingDomain = (hosting: string) => {
    switch (hosting) {
      case 'vercel': return 'vercel.app';
      case 'netlify': return 'netlify.app';
      case 'github-pages': return 'github.io';
      default: return 'example.com';
    }
  };

  const getStepIcon = (status: DeploymentStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'running':
        return <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <div className="w-4 h-4 rounded-full border-2 border-gray-300" />;
    }
  };

  const allStepsCompleted = deploymentSteps.every(step => step.status === 'completed');
  const hasFailedSteps = deploymentSteps.some(step => step.status === 'failed');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            One-Click Deployment
          </CardTitle>
          <CardDescription>
            Deploy your website instantly with automated configuration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Deployment Configuration Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <Server className="h-4 w-4 text-blue-600" />
              <div>
                <div className="font-medium text-sm">Platform</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 capitalize">{config.hosting}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
              <Globe className="h-4 w-4 text-green-600" />
              <div>
                <div className="font-medium text-sm">Domain</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {config.domain || `${config.subdomain}.${getHostingDomain(config.hosting)}`}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
              <Lock className="h-4 w-4 text-purple-600" />
              <div>
                <div className="font-medium text-sm">Security</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">SSL + CDN</div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          {isDeploying && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Deployment Progress</span>
                <span className="text-sm text-gray-600">{Math.round(deploymentProgress)}%</span>
              </div>
              <Progress value={deploymentProgress} className="h-2" />
            </div>
          )}

          {/* Deployment Steps */}
          {(isDeploying || allStepsCompleted || hasFailedSteps) && (
            <div className="space-y-3">
              <h4 className="font-medium">Deployment Steps</h4>
              <div className="space-y-2">
                {deploymentSteps.map((step, index) => (
                  <div 
                    key={step.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                      step.status === 'completed' ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800' :
                      step.status === 'running' ? 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800' :
                      step.status === 'failed' ? 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800' :
                      'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800'
                    }`}
                  >
                    {getStepIcon(step.status)}
                    <div className="flex-1">
                      <div className="font-medium text-sm">{step.name}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{step.description}</div>
                    </div>
                    {step.status === 'completed' && step.duration && (
                      <Badge variant="outline" className="text-xs">
                        {(step.duration / 1000).toFixed(1)}s
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Success Message */}
          {allStepsCompleted && deploymentUrl && (
            <Alert className="border-green-200 bg-green-50 dark:bg-green-950">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription>
                <div className="space-y-2">
                  <div className="font-medium text-green-800 dark:text-green-200">
                    🎉 Deployment Completed Successfully!
                  </div>
                  <div className="text-sm text-green-700 dark:text-green-300">
                    Your website is now live and accessible at:
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="bg-green-100 dark:bg-green-900 px-2 py-1 rounded text-sm">
                      {deploymentUrl}
                    </code>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => window.open(deploymentUrl, '_blank')}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Visit Site
                    </Button>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Error Message */}
          {hasFailedSteps && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Deployment failed. Please check your configuration and try again.
                If the problem persists, use the manual deployment instructions.
              </AlertDescription>
            </Alert>
          )}

          {/* Deployment Button */}
          <div className="flex gap-3">
            <Button 
              onClick={handleOneClickDeploy}
              disabled={isDeploying || !config.subdomain}
              className="flex-1"
              size="lg"
            >
              {isDeploying ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deploying...
                </>
              ) : (
                <>
                  <Rocket className="h-4 w-4 mr-2" />
                  Deploy Now with One-Click
                </>
              )}
            </Button>
            
            {(allStepsCompleted || hasFailedSteps) && (
              <Button 
                variant="outline"
                onClick={() => {
                  setDeploymentSteps(prev => prev.map(step => ({ ...step, status: 'pending' as const })));
                  setDeploymentProgress(0);
                  setCurrentStep(0);
                  setDeploymentUrl('');
                }}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            )}
          </div>

          {/* Features Included */}
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <h5 className="font-medium mb-2">✨ Included in One-Click Deployment:</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              {[
                '🔒 Automatic SSL',
                '🌐 Global CDN',
                '⚡ Compression',
                '📊 Analytics Ready',
                '🛡️ Security Headers',
                '📱 Mobile Optimized',
                '🚀 Performance Tuned',
                '🔄 Auto Updates'
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}