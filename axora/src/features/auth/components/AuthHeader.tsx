interface Props {
    mode: "signin" | "signup";
}

export function AuthHeader({ mode }: Props) {
    const isSignIn = mode === "signin";

    return (
        <div className="text-center space-y-1">
            <h2 className="text-3xl font-bold text-gray-900">
                {isSignIn ? "Welcome Back" : "Create an Account"}
            </h2>
            <p className="text-gray-600">
                {isSignIn
                    ? "Sign in to continue to your workspace"
                    : "Create a new workspace account"}
            </p>
        </div>
    );
}
