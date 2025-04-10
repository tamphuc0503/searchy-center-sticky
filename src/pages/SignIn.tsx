
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { Separator } from '@/components/ui/separator';
import { Mail, KeyRound, FileWarning } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
});

type FormValues = z.infer<typeof formSchema>;

const SignIn = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      // Here you would add actual authentication logic
      console.log('Sign in with:', values);
      
      // Simulate successful login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success!",
        description: "You have been signed in.",
      });
      
      navigate('/portal');
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    }
  };

  const handleGoogleSignIn = () => {
    // Logic for Google sign in
    console.log('Sign in with Google');
    toast({
      title: "Google Sign-in",
      description: "Redirecting to Google authentication...",
    });
  };

  const handleSSOSignIn = () => {
    // Logic for SSO sign in
    console.log('Sign in with SSO');
    toast({
      title: "SSO Sign-in",
      description: "Redirecting to SSO authentication...",
    });
  };

  return (
    <div className="min-h-screen pt-24 px-6 bg-slate-50">
      <Header />
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm border">
        <div className="space-y-2 text-center mb-8">
          <div className="flex items-center justify-center mb-2">
            <FileWarning className="w-8 h-8 text-primary mr-2" />
            <h1 className="text-3xl font-bold">Sign In</h1>
          </div>
          <p className="text-muted-foreground">Enter your credentials to sign in to your account</p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full mt-6">
              Sign In
            </Button>
          </form>
        </Form>
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-2 text-sm text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        
        <div className="flex flex-col space-y-4 mb-6">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={handleGoogleSignIn}
          >
            <Mail className="mr-2 h-4 w-4" />
            Sign in with Google
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={handleSSOSignIn}
          >
            <KeyRound className="mr-2 h-4 w-4" />
            Sign in with SSO
          </Button>
        </div>
        
        <div className="mt-6 text-center text-sm">
          <p className="text-muted-foreground">
            Don't have an account? {" "}
            <Link to="/sign-up" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
