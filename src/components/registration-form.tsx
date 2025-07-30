"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  CalendarIcon,
  User,
  Mail,
  Home,
  Building2,
  GraduationCap,
  CreditCard,
  Loader2,
} from "lucide-react";

import { registrationSchema, registrationStatus, paymentMethods } from "@/lib/schema";
import type { RegistrationSchema } from "@/lib/schema";
import { registerForConference } from "@/app/actions";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface RegistrationFormProps {
  onSuccess: () => void;
}

const PayPalIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-3 h-6 w-6">
        <path d="M10.4 3.9c-2.4 2.1-3.1 5.5-1.8 8.4 1.3 2.9 4.3 4.9 7.6 4.9 2.2 0 4.1-1.1 5.1-2.8a2 2 0 0 0-1.4-3.2H18c-1.3 0-2.3-1.1-2.1-2.4.2-1.1 1.1-2 2.2-2h1.4a2 2 0 0 0 1.9-2.5c-.2-1.1-.9-2-2-2.4-2.2-.8-4.7 0-6.7 1.7z"></path>
        <path d="M6.3 7.5c-2.5 2.3-3 6.1-1.3 9.1 1.7 3 5 5.1 8.5 5.1 2.2 0 4.2-1 5.2-2.7a2 2 0 0 0-1.4-3.2h-1.3c-1.3 0-2.4-1.1-2.2-2.4.2-1.2 1.2-2.1 2.4-2.1h1.4a2 2 0 0 0 1.9-2.5c-.2-1.1-1-2-2.1-2.4-2.1-.8-4.7 0-6.6 1.7z"></path>
    </svg>
);


export function RegistrationForm({ onSuccess }: RegistrationFormProps) {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<RegistrationSchema>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      streetAddress: "",
      email: "",
      affiliation: "",
      registrationDate: new Date(),
    },
  });

  const onSubmit = (values: RegistrationSchema) => {
    setError("");
    startTransition(() => {
      registerForConference(values).then((data) => {
        if (data?.error) {
          setError(data.error);
        }
        if (data?.success) {
          onSuccess();
        }
      });
    });
  };

  return (
    <Card className="w-full max-w-4xl animate-in fade-in-50 duration-500">
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl">Conference Registration</CardTitle>
        <CardDescription>Please fill out the form below to register for the conference.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="John" {...field} className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                     <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Doe" {...field} className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                   <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="john.doe@example.com" {...field} className="pl-10" />
                      </div>
                    </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="streetAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="123 Main St, Anytown, USA" {...field} className="pl-10" />
                      </div>
                    </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="affiliation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School or Company Affiliation</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="University of Example" {...field} className="pl-10" />
                      </div>
                    </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <div className="relative">
                          <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <SelectTrigger className="pl-10">
                            <SelectValue placeholder="Select your status" />
                          </SelectTrigger>
                        </div>
                      </FormControl>
                      <SelectContent>
                        {registrationStatus.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="registrationDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registration Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Payment Method</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      <FormItem>
                          <RadioGroupItem value="Credit/Debit Card" id="credit-card" className="peer sr-only" />
                        <Label
                          htmlFor="credit-card"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                        >
                          <CreditCard className="mb-3 h-6 w-6" />
                          Credit/Debit Card
                        </Label>
                      </FormItem>
                      <FormItem>
                          <RadioGroupItem value="PayPal" id="paypal" className="peer sr-only" />
                        <Label
                          htmlFor="paypal"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                        >
                          <PayPalIcon />
                          PayPal
                        </Label>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" size="lg" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Registration
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
