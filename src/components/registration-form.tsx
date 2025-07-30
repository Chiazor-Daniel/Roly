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
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className="mb-3 h-6 w-6"
  >
    <path
      fill="#003087"
      d="M8.32 7.373c.455-1.728 2.034-2.88 3.84-2.88 2.24 0 3.398 1.43 3.086 3.562-.255 1.728-1.254 2.65-2.65 2.65h-1.57c-.77 0-1.254.346-1.42 1.055l-.427 1.764c-.06.25-.09.346-.226.346h-1.3c-.15 0-.255-.092-.227-.346.06-.312.68-4.18 1.05-5.84zm6.653 2.564c.227-1.218-.455-1.92-.94-2.3-.57-.43-1.22-.652-2.06-.652-1.023 0-1.7.4-2.15 1.15-.31.54-.45 1.27-.28 2.09.135.65.65 1.24 1.5 1.24h.54c1.16 0 1.9-.57 2.1-1.84.05-.33.1-.65.2-1.02z"
    />
    <path
      fill="#009cde"
      d="M8.093 14.155c-.195-.81-.03-1.27.68-1.27h2.24c.71 0 1.125.375 1.254.99l.484 2.218c.08.312.08.437.284.437h1.08c.22 0 .31-.125.25-.438-.21-1.054-1.12-4.812-1.12-4.812-.22-1.023-.97-1.672-2.03-1.672-1.4 0-2.33.812-2.71 2.39-.51 2.126-.06 4.095.91 5.08.78.78 1.845 1.155 2.94 1.155 1.875 0 3.19-.94 3.6-2.97.08-.436.12-.655.34-.655h.87c.25 0 .345.125.28.517-.375 2.625-2.22 4.312-4.99 4.312-2.995 0-4.815-1.845-5.3-5.22h.02z"
    />
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
                        <Input placeholder="Chiamaka" {...field} className="pl-10" />
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
                        <Input placeholder="Okafor" {...field} className="pl-10" />
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
                        <Input placeholder="chiamaka.okafor@example.com" {...field} className="pl-10" />
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
                        <Input placeholder="123 Adetokunbo Ademola Crescent, Wuse II, Abuja" {...field} className="pl-10" />
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
                        <Input placeholder="University of Lagos" {...field} className="pl-10" />
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
