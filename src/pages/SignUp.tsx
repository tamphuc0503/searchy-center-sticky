
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Header from '@/components/Header';
import CompanyLogos from '@/components/CompanyLogos';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  termsAccepted: z.boolean().refine(value => value === true, {
    message: "You must accept the Terms & Conditions and Privacy Policy",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const SignUp = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      termsAccepted: false,
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      // Here you would add actual sign up logic
      console.log('Sign up with:', values);
      
      // Simulate successful registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Account created!",
        description: "Your account has been successfully created.",
      });
      
      navigate('/sign-in');
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "There was a problem creating your account.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen pt-24 px-6 bg-slate-50">
      <Header />
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm border">
        <div className="space-y-2 text-center mb-8">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-muted-foreground">30 days full access. No credit card required. No commitment to purchase.</p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
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
              name="termsAccepted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I have read and agree to the{" "}
                      <Link to="/terms" className="text-primary hover:underline">
                        Terms & Conditions
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full mt-6">
              Sign Up
            </Button>
            
            <FormDescription className="text-center mt-4 text-sm text-amber-600 font-medium">
              Your trial ends in 30 days and will not convert to a paid subscription unless you subscribe.
            </FormDescription>
          </form>
        </Form>
        
        <div className="mt-6 text-center text-sm">
          <p className="text-muted-foreground">
            Already have an account? {" "}
            <Link to="/sign-in" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      
      <CompanyLogos />
    </div>
  );
};

export default SignUp;
