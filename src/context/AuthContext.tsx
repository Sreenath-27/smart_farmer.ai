import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, AuthMode } from "../types";

export interface RegisteredAccount {
  phoneOrEmail: string;
  passwordHash: string;
  userProfile: UserProfile;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  isLocating: boolean;
  locationError: string | null;
  loginAsGuest: () => void;
  loginWithGoogle: (customDetails?: { name?: string; city?: string; email?: string; avatarUrl?: string }) => void;
  loginWithFacebook: (customDetails?: { name?: string; city?: string; email?: string; avatarUrl?: string }) => void;
  loginWithGithub: (customDetails?: { name?: string; city?: string; email?: string; avatarUrl?: string }) => void;
  loginWithPhonePassword: (credentials: { phoneOrEmail: string; password: string }) => { success: boolean; message: string };
  registerUser: (details: {
    name: string;
    phoneOrEmail: string;
    password: string;
    village: string;
    districtState: string;
    farmSizeAcres: number;
    primaryCrops?: string[];
  }) => { success: boolean; message: string };
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  requestExactLocation: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_GUEST: UserProfile = {
  id: "usr-guest-101",
  name: "Guest Farmer",
  authMode: "guest",
  village: "Ananthapur",
  districtState: "Andhra Pradesh",
  farmSizeAcres: 2.5,
  preferredLanguage: "en",
  primaryCrops: ["Tomato", "Chilli", "Paddy Rice"],
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
};

const INITIAL_DEMO_ACCOUNTS: RegisteredAccount[] = [
  {
    phoneOrEmail: "9876543210",
    passwordHash: "farmer123",
    userProfile: {
      id: "usr-ph-98765",
      name: "Registered Farmer",
      authMode: "phone",
      emailOrPhone: "9876543210",
      village: "Ananthapur",
      districtState: "Andhra Pradesh",
      farmSizeAcres: 3.5,
      preferredLanguage: "en",
      primaryCrops: ["Chilli", "Tomato", "Paddy Rice"],
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    },
  },
  {
    phoneOrEmail: "9988776655",
    passwordHash: "farmer123",
    userProfile: {
      id: "usr-ph-99887",
      name: "Crop Farmer",
      authMode: "phone",
      emailOrPhone: "9988776655",
      village: "Guntur",
      districtState: "Andhra Pradesh",
      farmSizeAcres: 5.0,
      preferredLanguage: "te",
      primaryCrops: ["Cotton", "Chilli"],
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    },
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem("smartfarmer_user_profile") || localStorage.getItem("agriguard_user_profile");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Error loading user profile", e);
    }
    return DEFAULT_GUEST;
  });

  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem("smartfarmer_user_profile", JSON.stringify(user));
    } else {
      localStorage.removeItem("smartfarmer_user_profile");
    }
  }, [user]);

  const requestExactLocation = async () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Fetch reverse geocoded city name from our server
          const res = await fetch(`/api/reverse-geocode?lat=${latitude}&lon=${longitude}`);
          if (res.ok) {
            const data = await res.json();
            const exactCity = data.city || data.formattedLocation || "GPS Exact Location";
            const exactState = data.districtState || "Local Region";

            if (user) {
              setUser({
                ...user,
                lat: latitude,
                lon: longitude,
                village: exactCity,
                districtState: exactState,
                exactLocationName: data.formattedLocation || `${exactCity}, ${exactState}`,
                locationPermissionGranted: true,
              });
            }
          } else {
            // Fallback coordinate name
            if (user) {
              setUser({
                ...user,
                lat: latitude,
                lon: longitude,
                village: `GPS Location (${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°)`,
                exactLocationName: `Coordinates (${latitude.toFixed(3)}°, ${longitude.toFixed(3)}°)`,
                locationPermissionGranted: true,
              });
            }
          }
        } catch (err) {
          console.error("Reverse geocode failed", err);
          if (user) {
            setUser({
              ...user,
              lat: latitude,
              lon: longitude,
              locationPermissionGranted: true,
            });
          }
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        console.warn("User denied geolocation permission:", error);
        setIsLocating(false);
        setLocationError(error.message || "Location permission was denied by user.");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const loginAsGuest = () => {
    setUser({
      ...DEFAULT_GUEST,
      id: `usr-guest-${Date.now().toString().slice(-4)}`,
      authMode: "guest",
      name: "Guest Farmer",
    });
  };

  const loginWithGoogle = async (customDetails?: { name?: string; city?: string; email?: string; avatarUrl?: string }) => {
    const defaultName = customDetails?.name || "Google Farmer";
    const defaultCity = customDetails?.city || "Hyderabad";
    const defaultEmail = customDetails?.email || "farmer.google@gmail.com";

    try {
      const response = await fetch("/api/auth/google/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: defaultName,
          city: defaultCity,
          email: defaultEmail,
          avatarUrl: customDetails?.avatarUrl,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.user) {
          setUser(data.user);
          return;
        }
      }
    } catch (err) {
      console.warn("Backend Google auth API call failed, using client fallback", err);
    }

    // Fallback if server endpoint unreachable
    setUser({
      id: `usr-google-${Date.now().toString().slice(-4)}`,
      name: defaultName,
      authMode: "google",
      emailOrPhone: defaultEmail,
      village: defaultCity,
      districtState: "Telangana",
      farmSizeAcres: 3.5,
      preferredLanguage: "en",
      primaryCrops: ["Paddy Rice", "Cotton", "Chilli"],
      avatarUrl: customDetails?.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    });
  };

  // State for registered user accounts stored in localStorage
  const [accounts, setAccounts] = useState<RegisteredAccount[]>(() => {
    try {
      const saved = localStorage.getItem("smartfarmer_registered_accounts");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Error loading accounts", e);
    }
    return INITIAL_DEMO_ACCOUNTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem("smartfarmer_registered_accounts", JSON.stringify(accounts));
    } catch (e) {
      console.error("Failed to save accounts to localStorage", e);
    }
  }, [accounts]);

  const loginWithPhonePassword = ({ phoneOrEmail, password }: { phoneOrEmail: string; password: string }) => {
    const cleanIdentifier = phoneOrEmail.trim().toLowerCase();
    const account = accounts.find(
      (acc) => acc.phoneOrEmail.trim().toLowerCase() === cleanIdentifier
    );

    if (!account) {
      return {
        success: false,
        message: `Account with Mobile Number / Email '${phoneOrEmail}' not found. Please click 'Register New Farmer' tab to create an account.`,
      };
    }

    if (account.passwordHash !== password) {
      return {
        success: false,
        message: "Incorrect password entered. Please double check your password and try again.",
      };
    }

    setUser(account.userProfile);
    return {
      success: true,
      message: `Welcome back, ${account.userProfile.name}! Real-time login successful.`,
    };
  };

  const registerUser = ({
    name,
    phoneOrEmail,
    password,
    village,
    districtState,
    farmSizeAcres,
    primaryCrops,
  }: {
    name: string;
    phoneOrEmail: string;
    password: string;
    village: string;
    districtState: string;
    farmSizeAcres: number;
    primaryCrops?: string[];
  }) => {
    const cleanIdentifier = phoneOrEmail.trim().toLowerCase();

    // Check if account already exists
    const existing = accounts.find(
      (acc) => acc.phoneOrEmail.trim().toLowerCase() === cleanIdentifier
    );

    if (existing) {
      return {
        success: false,
        message: `An account with Mobile Number / Email '${phoneOrEmail}' already exists. Please use Login or register with a different number.`,
      };
    }

    const newProfile: UserProfile = {
      id: `usr-ph-${Date.now().toString().slice(-6)}`,
      name: name.trim(),
      authMode: "phone",
      emailOrPhone: phoneOrEmail.trim(),
      village: village.trim() || "Ananthapur",
      districtState: districtState.trim() || "Andhra Pradesh",
      farmSizeAcres: Number(farmSizeAcres) || 2.5,
      preferredLanguage: "en",
      primaryCrops: primaryCrops || ["Tomato", "Chilli", "Paddy Rice"],
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    };

    const newAccount: RegisteredAccount = {
      phoneOrEmail: phoneOrEmail.trim(),
      passwordHash: password,
      userProfile: newProfile,
    };

    setAccounts((prev) => [...prev, newAccount]);
    setUser(newProfile);

    // Call server to persist profile if available
    try {
      fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAccount),
      }).catch((e) => console.warn("API register fallback", e));
    } catch (e) {
      // Ignore network errors
    }

    return {
      success: true,
      message: `Account registered successfully! Welcome to SmartFarmer.AI, ${name}.`,
    };
  };

  const loginWithFacebook = (customDetails?: { name?: string; city?: string; email?: string; avatarUrl?: string }) => {
    const defaultName = customDetails?.name || "Facebook Farmer";
    const defaultCity = customDetails?.city || "Tenali";

    setUser({
      id: `usr-fb-${Date.now().toString().slice(-4)}`,
      name: defaultName,
      authMode: "facebook",
      emailOrPhone: customDetails?.email || "+91 98480 99887",
      village: defaultCity,
      districtState: "Andhra Pradesh",
      farmSizeAcres: 2.0,
      preferredLanguage: "te",
      primaryCrops: ["Tomato", "Brinjal", "Okra"],
      avatarUrl: customDetails?.avatarUrl || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    });
  };

  const loginWithGithub = (customDetails?: { name?: string; city?: string; email?: string; avatarUrl?: string }) => {
    const defaultName = customDetails?.name || "GitHub Farmer";
    const defaultCity = customDetails?.city || "Hyderabad";

    setUser({
      id: `usr-gh-${Date.now().toString().slice(-4)}`,
      name: defaultName,
      authMode: "github",
      emailOrPhone: customDetails?.email || "sreenath.dev@github.com",
      village: defaultCity,
      districtState: "Telangana",
      farmSizeAcres: 4.0,
      preferredLanguage: "en",
      primaryCrops: ["Chilli", "Tomato", "Cotton"],
      avatarUrl: customDetails?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = async (partial: Partial<UserProfile>) => {
    if (user) {
      const updatedUser = { ...user, ...partial };
      setUser(updatedUser);
      try {
        localStorage.setItem("smartfarmer_user_profile", JSON.stringify(updatedUser));
        await fetch("/api/auth/profile/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUser),
        });
      } catch (err) {
        console.warn("Saved profile locally, API sync failed", err);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLocating,
        locationError,
        loginAsGuest,
        loginWithGoogle,
        loginWithFacebook,
        loginWithGithub,
        loginWithPhonePassword,
        registerUser,
        logout,
        updateProfile,
        requestExactLocation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

