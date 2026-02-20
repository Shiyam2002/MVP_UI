interface Props {
    mode: "signin" | "signup";
    onToggle: () => void;
}

export function AuthToggle({ mode, onToggle }: Props) {
    const isSignIn = mode === "signin";

    return (
        <p className="text-center text-sm text-gray-600">
            {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
                onClick={onToggle}
                className="font-medium text-gray-900 hover:underline"
            >
                {isSignIn ? "Sign up" : "Sign in"}
            </button>
        </p>
    );
}
