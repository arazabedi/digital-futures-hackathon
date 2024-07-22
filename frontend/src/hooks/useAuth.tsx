"use client";
import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { login, logout, register } from "@/services/authService";
import { registrationDetails } from "@/types/types";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/app/loading";

interface User {
  id: string;
  username: string;
  full_name: { first_name: string; middle_name: string; last_name: string };
  email: string;
  accessToken: string;
}

interface AuthContextType {
  user: User | null;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleRegister: (userData: registrationDetails) => Promise<void>;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    console.log("AuthProvider mounted");
    const token = Cookies.get("accessToken");
    if (token) {
      console.log("Token found:", token);
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-token`, {
          headers: {
            "x-access-token": token,
          },
        })
        .then((response) => {
          console.log("Token verified, user data:", response.data);
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Token verification failed:", error);
          Cookies.remove("accessToken");
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      console.log("No token found");
      setLoading(false);
    }
  }, []);

  const handleRegister = async (userData: registrationDetails) => {
    toast({
      title: "Hello",
      description: "Friday, February 10, 2023 at 5:57 PM",
    });
    try {
      const response = await register(userData);
      const status = response.status;
      const toastTitle =
        status === 201
          ? "Registered " + userData.username + " successfully"
          : "Registration unsuccessful";
      toast({
        title: toastTitle,
      });
      router.push("/login");
      return response;
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        variant: "destructive",
        title: "Registration unsuccessful",
      });
    }
  };

  const handleLogin = async (username: string, password: string) => {
    try {
      const loggedInUser = await login(username, password);
      setUser(loggedInUser);
      console.log("User logged in:", loggedInUser);
      toast({
        title: "Welcome, " + username + "!",
      });
      router.push("/catalog");
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Login unsuccessful",
      });
    }
  };

  const handleLogout = async () => {
    const accessToken = Cookies.get("accessToken");
    try {
      if (accessToken) {
        // await logout(accessToken);
        Cookies.remove("accessToken");
      }
      setUser(null);
      console.log("User logged out");
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        variant: "destructive",
        title: "Couldn't sign out",
      });
    }
  };

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <AuthContext.Provider
      value={{ user, handleRegister, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
