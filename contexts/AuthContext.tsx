'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    User as FirebaseUser,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { User } from '@/types';

interface AuthContextType {
    user: User | null;
    firebaseUser: FirebaseUser | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<void>;
    logout: () => Promise<void>;
    updateUserProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setFirebaseUser(firebaseUser);

            if (firebaseUser) {
                try {
                    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setUser({
                            id: firebaseUser.uid,
                            email: firebaseUser.email!,
                            name: userData.name || firebaseUser.displayName || '',
                            avatar: userData.avatar || firebaseUser.photoURL || undefined,
                            isAdmin: userData.isAdmin || false,
                            createdAt: userData.createdAt?.toDate() || new Date(),
                            updatedAt: userData.updatedAt?.toDate() || new Date(),
                        });
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            } else {
                setUser(null);
            }

            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const login = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    const register = async (email: string, password: string, name: string) => {
        const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);

        await updateProfile(firebaseUser, { displayName: name });

        const userData = {
            name,
            email,
            isAdmin: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await setDoc(doc(db, 'users', firebaseUser.uid), userData);
    };

    const logout = async () => {
        await signOut(auth);
    };

    const updateUserProfile = async (data: Partial<User>) => {
        if (!firebaseUser) return;

        const updatedData = {
            ...data,
            updatedAt: new Date(),
        };

        await setDoc(doc(db, 'users', firebaseUser.uid), updatedData, { merge: true });

        if (user) {
            setUser({ ...user, ...updatedData });
        }
    };

    const value = {
        user,
        firebaseUser,
        loading,
        login,
        register,
        logout,
        updateUserProfile,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}