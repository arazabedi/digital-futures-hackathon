"use client";

import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import * as z from "zod";
import { useAuth } from "@/hooks/useAuth";

// Define your form schema using zod
const formSchema = z.object({
  username: z
    .string({
      required_error: "Username is required.",
    })
    // You can use zod's built-in validation as normal
    .min(2, {
      message: "Username must be at least 2 characters.",
    }),

  password: z
    .string({
      required_error: "Password is required.",
    })
    // Use the "describe" method to set the label
    // If no label is set, the field name will be used
    // and un-camel-cased
    .describe("Your secure password"),
  acceptTerms: z
    .boolean()
    .describe("Accept terms and conditions.")
    .refine((value) => value, {
      message: "You must accept the terms and conditions.",
      path: ["acceptTerms"],
    }),
});

const Login = () => {
  const { handleLogin } = useAuth();

  return (
    <main className="flex flex-col items-center justify-center mt-36 m-auto w-[450px] align-middle gap-5 p-5">
      <h1>Lighthouse</h1>
      <AutoForm
        onSubmit={(data) => {
          handleLogin(data.username, data.password);
        }}
        className=""
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
      >
        <AutoFormSubmit className="w-[-webkit-fill-available]">
          Log in
        </AutoFormSubmit>

        {/*
      All children passed to the form will be rendered below the form.
      */}
        <p className="text-gray-500 text-sm">
          By submitting this form, you agree to our{" "}
          <a href="/termsandconditions" className="text-primary underline">
            terms and conditions
          </a>
          .
        </p>
      </AutoForm>
      <p className="text-gray-800 text-sm">
        <a href="/register">Sign up</a>
      </p>
    </main>
  );
};

export default Login;
