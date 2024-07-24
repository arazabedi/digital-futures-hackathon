"use client";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import * as z from "zod";
import Link from "next/link";

// Define your form schema using zod
const formSchema = z.object({
  username: z
    .string({
      required_error: "Username is required.",
    })
    .min(2, {
      message: "Username must be at least 6 characters.",
    }),

  email: z
    .string({
      required_error: "Email is required.",
    })
    .email({
      message: "Invalid email address.",
    }),

  firstName: z
    .string({
      required_error: "First name is required.",
    })
    .min(2, {
      message: "Name must be at least 2 characters.",
    }),

  middleName: z.string().optional(),

  lastName: z
    .string({
      required_error: "Last name is required.",
    })
    .min(2, {
      message: "Last name must be at least 2 characters.",
    }),

  password: z
    .string({
      required_error: "Password is required.",
    })
    .describe("Your secure password")
    .min(8, {
      message: "Password must be at least 8 characters.",
    }),

  acceptTerms: z
    .boolean()
    .describe("Accept terms and conditions.")
    .refine((value) => value, {
      message: "You must accept the terms and conditions.",
      path: ["acceptTerms"],
    }),
});

function Register() {
  const { handleRegister } = useAuth();

  return (
    <main className="flex flex-col items-center mt-12 m-auto w-96 align-middle gap-5 mb-8">
      <h1>Lighthouse</h1>
      <AutoForm
        // Do something with the data
        // Data is validated and coerced with zod automatically
        onSubmit={(data) => {
          const userData = {
            username: data.username,
            email: data.email,
            full_name: {
              first_name: data.firstName,
              middle_name: data.middleName,
              last_name: data.lastName,
            },
            password: data.password,
          };
          handleRegister(userData);
        }}
        // Pass the schema to the form
        formSchema={formSchema}
        // You can add additional config for each field
        // to customize the UI
        fieldConfig={{
          password: {
            // Use "inputProps" to pass props to the input component
            // You can use any props that the component accepts
            inputProps: {
              type: "password",
              placeholder: "••••••••",
            },
          },
          acceptTerms: {
            inputProps: {
              required: true,
            },
            // You can use JSX in the description
            description: (
              <>
                I agree to the{" "}
                <a
                  href="#"
                  className="text-primary underline"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Terms and conditions clicked.");
                  }}
                >
                  terms and conditions
                </a>
                .
              </>
            ),
          },
        }}
        // Optionally, define dependencies between fields
      >
        {/*
      Pass in a AutoFormSubmit or a button with type="submit".
      Alternatively, you can not pass a submit button
      to create auto-saving forms etc.
      */}
        <AutoFormSubmit className="w-[-webkit-fill-available]">
          Register
        </AutoFormSubmit>

        {/*
      All children passed to the form will be rendered below the form.
      */}
        <p className="text-gray-500 text-sm">
          By submitting this form, you agree to our{" "}
          <a href="#" className="text-primary underline">
            terms and conditions
          </a>
          .
        </p>
      </AutoForm>

      <Link
        className="light:text-gray-800 dark:text-gray-950 text-sm"
        href="/login"
      >
        Already have an account? Log in
      </Link>
    </main>
  );
}

export default Register;
