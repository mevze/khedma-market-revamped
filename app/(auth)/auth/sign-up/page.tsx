// // File: components/SignUpForm.jsx
// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/custom-input2";
// import { SignUpInput, signUpSchema } from "@/lib/auth/validators/signupSchema";
// import Link from "next/link";
// import { Separator } from "@/components/ui/separator";
// import { useState } from "react";
// import Callout from "@/components/ui/callout";
// import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
// import { SpinnerIcon } from "@/components/icons";

// export default function SignUpForm() {
//   const [isPending, setIsPending] = useState(false);
//   const [error, setError] = useState(null);

//   const form = useForm<SignUpInput>({
//     resolver: zodResolver(signUpSchema),
//   });

//   const onSubmit = async (values: SignUpInput) => {
//     setIsPending(true);
//     setError(null);
//     try {
//       const response = await fetch('/api/sign-up', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(values),
//       });
//       const result = await response.json();
//       if (!response.ok) {
//         throw new Error(result.error);
//       }
//       console.log('Sign-up successful', result);
//     } catch (error) {
//       setError(error);
//     } finally {
//       setIsPending(false);
//     }
//   };

//   return (
//     <div className="w-full space-y-4">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)}>
//           <fieldset className="w-full space-y-4" disabled={isPending}>
//             <div className="flex w-full flex-col space-y-3">
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email</FormLabel>
//                     <FormControl>
//                       <Input placeholder="email@example.com" {...field} />
//                     </FormControl>
//                     <FormDescription></FormDescription>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Password</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="••••••"
//                         className="font-sans"
//                         type="password"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormDescription></FormDescription>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="confirmPassword"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Confirm Password</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="••••••"
//                         className="font-sans"
//                         type="password"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormDescription></FormDescription>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//             {error && (
//               <Callout variant={"danger"}>
//                 <ExclamationTriangleIcon className="h-4 w-4" />
//                 <p>{error.message}</p>
//               </Callout>
//             )}
//             <Button type="submit" className="w-full">
//               {isPending ? (
//                 <div className="flex items-center gap-1">
//                   <SpinnerIcon className="h-5 w-5 animate-spin" />
//                   <span>Signing up...</span>
//                 </div>
//               ) : (
//                 "Sign up"
//               )}
//             </Button>
//           </fieldset>
//         </form>
//       </Form>
//       <div className="mt-4 flex w-full items-center justify-center">
//         <p className="text-sm">
//           Already have an account?{" "}
//           <Link href="/auth/sign-in" className="font-medium underline">
//             Sign in
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
