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
      d="M20.344 6.075c-.32-1.022-.994-1.83-2.02-2.39-1.127-.61-2.45-.845-3.83-.69-1.28.14-2.46.66-3.48 1.48-.95.76-1.7 1.76-2.2 2.91-.03.1-.05.2-.07.3l-2.34 10.03c-.12.48-.3 1.13-.58 1.29-.28.16-.7.05-1.13-.24-.37-.24-.65-.56-.84-.93-.19-.37-.29-.78-.3-1.22l.86-3.69h2.37c.45 0 .82-.37.82-.82l-1.18-5.1c-.06-.26-.27-.47-.53-.47h-2.1c-.22 0-.42.15-.48.36L5.3 11.23c-.02.1-.04.2-.05.3-.28 1.15.02 2.34.82 3.29.8.95 1.94 1.52 3.2 1.69 1.4.18 2.8-.02 4.05-.62 1.1-.5 2.02-1.34 2.65-2.4.63-1.05 1-2.26.97-3.52-.04-1.43-.53-2.73-1.38-3.79-.19-.24-.4-.46-.62-.67-.22-.21-.45-.42-.7-.6-.05-.04-.1-.08-.14-.13-.52-.5-1.1-1.03-1.74-1.28-.64-.25-1.32-.2-1.95.08-1.03.45-1.85 1.25-2.37 2.26-.1.2-.22.4-.32.6L8.8 13.9c-.02.1-.03.2-.05.3-.1.44-.15.9-.15 1.35 0 .45.05.9.15 1.35l.43 1.84c.14.6.43 1.12.86 1.5.43.38.98.58 1.57.58h.5c1.32 0 2.5-.68 3.2-1.8.35-.55.6-1.18.73-1.85l.74-3.17c.02-.1.05-.2.08-.3.2-.82.63-1.57 1.26-2.18.63-.62 1.4-1.08 2.27-1.32.87-.24 1.77-.24 2.63.03.85.27 1.6.82 2.15 1.55.55.73.88 1.63.92 2.58.04.95-.18 1.88-.66 2.68l-.02.02z"
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
