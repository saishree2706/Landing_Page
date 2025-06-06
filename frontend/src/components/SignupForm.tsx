import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface FormData {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    notifyOnLaunch: boolean;
}

interface SignupFormProps {
    onSubmitSuccess: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSubmitSuccess }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            notifyOnLaunch: true,
        },
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setError(null);
        console.log("Form data:", data);
        if (data.email) {
            // Assuming data.email contains the email ID
            const fetchUserByEmail = async () => {
                try {
                    const userResponse = await fetch(`http://localhost:5000/user/${encodeURIComponent(data.email)}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json", // <<< THIS IS CRUCIAL
                        },
                    });
                    const isUserFound = await userResponse.json();
                    console.log(isUserFound);
                    if (!isUserFound.success) {
                        try {
                            async function sendEmail() {
                                const response = await fetch("http://localhost:5000/send-email", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json", // <<< THIS IS CRUCIAL
                                    },
                                    body: JSON.stringify({
                                        from: "onboarding@resend.dev",
                                        to: data.email,
                                        subject: "Thank you for signing up!",
                                        html: `<strong>Hi ${data.name},</strong><br/>Thanks for signing up!`,
                                        userNameEntered: data.name,
                                    }),
                                });
                                if (!response.ok) {
                                    throw new Error("Network response was not ok");
                                }
                                const data1 = await response.json();
                                console.log(data1);
                                if (data1.success) {
                                    setSubmitSuccess(true);
                                } else {
                                    setError("Failed to submit form. Please try again.");
                                }
                            }
                            sendEmail();
                        } catch (err) {
                            setError("Failed to submit form. Please try again.");
                            console.error("Error submitting form:", err);
                        } finally {
                            setIsSubmitting(false);
                        }
                    }
                    else{
                        setError("User email already exists. Please try a different email.");
                        setIsSubmitting(false);
                    }
                    // console.log("User found:", user);
                    // Do something with user data (e.g., set it in state)
                } catch (error) {
                    console.log("Error fetching user:", error);
                }
            };
            fetchUserByEmail();
        }
    };

    if (submitSuccess) {
        return (
            <div className="text-center py-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                    <svg
                        className="w-8 h-8 text-green-600 dark:text-green-300\"
                        fill="none\"
                        stroke="currentColor\"
                        viewBox="0 0 24 24\"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2\"
                            d="M5 13l4 4L19 7"
                        ></path>
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Thank You!</h3>
                <p className="text-gray-600 dark:text-gray-300">We've received your information and sent you a confirmation email.</p>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
        >
            {error && <div className="p-3 text-sm text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/50 rounded-lg">{error}</div>}

            <div>
                <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                    Name *
                </label>
                <input
                    id="name"
                    type="text"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.name ? "border-red-500 dark:border-red-500" : "border-gray-300"}`}
                    placeholder="Your name"
                    {...register("name", { required: "Name is required" })}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>}
            </div>

            <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                    Email *
                </label>
                <input
                    id="email"
                    type="email"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.email ? "border-red-500 dark:border-red-500" : "border-gray-300"}`}
                    placeholder="you@example.com"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                        },
                    })}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>}
            </div>

            <div>
                <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                    Phone Number <span className="text-gray-500 dark:text-gray-400">(Optional)</span>
                </label>
                <input
                    id="phone"
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Your phone number"
                    {...register("phone")}
                />
            </div>

            <div>
                <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                    Address <span className="text-gray-500 dark:text-gray-400">(Optional)</span>
                </label>
                <textarea
                    id="address"
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Your address"
                    {...register("address")}
                ></textarea>
            </div>

            <div className="flex items-start">
                <div className="flex items-center h-5">
                    <input
                        id="notifyOnLaunch"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                        {...register("notifyOnLaunch")}
                    />
                </div>
                <div className="ml-3">
                    <label
                        htmlFor="notifyOnLaunch"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Notify me when the website launches
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">If unchecked, we'll just send a thank you email.</p>
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isSubmitting ? "Submitting..." : "Submit"}
            </button>
        </form>
    );
};

export default SignupForm;
