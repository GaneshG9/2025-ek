'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/auth-context';


const registrationSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: 'Please enter a valid phone number.' }),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

const otpSchema = z.object({
  otp: z.string().length(6, { message: 'OTP must be 6 digits.' }),
});

type OtpFormData = z.infer<typeof otpSchema>;

export function RegistrationDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [step, setStep] = useState<'register' | 'verify'>('register');
  const [userData, setUserData] = useState<RegistrationFormData | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  const { login } = useAuth();

  const registrationForm = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { firstName: '', lastName: '', email: '', phone: '' },
  });

  const otpForm = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
  });

  const { isSubmitting: isRegistering } = registrationForm.formState;
  const { isSubmitting: isVerifying } = otpForm.formState;

  async function onRegistrationSubmit(values: RegistrationFormData) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Registration data:', values);
    setUserData(values);

    toast({
      title: 'OTP Sent',
      description: 'An OTP has been sent to your email and phone.',
    });
    setStep('verify');
  }

  async function onOtpSubmit(values: OtpFormData) {
    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('OTP:', values.otp);

    if (values.otp === '123456' && userData) { // Mock OTP
      login(userData);
      toast({
        title: 'Registration Successful!',
        description: 'Welcome! You are now being redirected to your profile.',
      });
      onOpenChange(false);
      router.push('/profile');
    } else {
      toast({
        title: 'Invalid OTP',
        description: 'The OTP you entered is incorrect. Please try again.',
        variant: 'destructive',
      });
      otpForm.setError('otp', { message: 'Invalid OTP' });
    }
  }

  const handleDialogClose = (isOpen: boolean) => {
    if (!isOpen) {
        registrationForm.reset();
        otpForm.reset();
        setStep('register');
    }
    onOpenChange(isOpen);
  };


  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent>
        {step === 'register' && (
          <>
            <DialogHeader>
              <DialogTitle>Create an Account</DialogTitle>
              <DialogDescription>
                Join Ekavarta to save properties and manage your preferences.
              </DialogDescription>
            </DialogHeader>
            <Form {...registrationForm}>
              <form onSubmit={registrationForm.handleSubmit(onRegistrationSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                    control={registrationForm.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                            <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={registrationForm.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                <FormField
                  control={registrationForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john.doe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registrationForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+91 12345 67890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit" disabled={isRegistering}>
                    {isRegistering ? <Spinner className="mr-2 h-4 w-4" /> : null}
                    Register
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </>
        )}
        {step === 'verify' && (
          <>
            <DialogHeader>
              <DialogTitle>Verify Your Account</DialogTitle>
              <DialogDescription>
                Enter the 6-digit OTP sent to your email and phone. For this demo, the OTP is 123456.
              </DialogDescription>
            </DialogHeader>
            <Form {...otpForm}>
              <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-4">
                <FormField
                  control={otpForm.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>OTP</FormLabel>
                      <FormControl>
                        <Input placeholder="123456" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter className="justify-between">
                  <Button variant="ghost" onClick={() => setStep('register')}>Back</Button>
                  <Button type="submit" disabled={isVerifying}>
                    {isVerifying ? <Spinner className="mr-2 h-4 w-4" /> : null}
                    Verify
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
