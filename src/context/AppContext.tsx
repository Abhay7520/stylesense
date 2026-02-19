import React, { createContext, useContext, useReducer, useEffect, useState, type ReactNode } from 'react'
import { supabase } from '../integrations/supabase/client'
import { Session } from '@supabase/supabase-js'

interface SavedOutfit {
    id: string
    name: string
    image: string
    price: string
}

interface ActivityItem {
    id: string
    text: string
    icon: string
    time: string
}

export interface AppState {
    user: { name: string; styleScore: number; email?: string; profileImage?: string; id?: string }
    stats: { outfitsTried: number; imagesUploaded: number; savedLooks: number }
    preferences: { gender: string; occasion: string; colorPreference: string; budgetRange: string } | null
    recentActivity: ActivityItem[]
    savedOutfits: SavedOutfit[]
    session: Session | null
}

type Action =
    | { type: 'SAVE_PREFERENCE'; payload: AppState['preferences'] }
    | { type: 'ADD_ACTIVITY'; payload: { text: string; icon: string } }
    | { type: 'INCREMENT_STAT'; payload: { key: keyof AppState['stats']; amount?: number } }
    | { type: 'TOGGLE_SAVED_OUTFIT'; payload: SavedOutfit }
    | { type: 'LOAD_STATE'; payload: Partial<AppState> }
    | { type: 'UPDATE_USER'; payload: Partial<AppState['user']> }
    | { type: 'SET_SESSION'; payload: Session | null }
    | { type: 'RESET_STATE' }

const defaultState: AppState = {
    user: { name: 'Guest', styleScore: 0, email: '', profileImage: '' },
    stats: { outfitsTried: 0, imagesUploaded: 0, savedLooks: 0 },
    preferences: null,
    recentActivity: [],
    savedOutfits: [],
    session: null,
}

function formatTime() {
    return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

function reducer(state: AppState, action: Action): AppState {
    switch (action.type) {
        case 'LOAD_STATE':
            return { ...state, ...action.payload }
        case 'RESET_STATE':
            return defaultState
        case 'SET_SESSION':
            return { ...state, session: action.payload }
        case 'UPDATE_USER':
            return { ...state, user: { ...state.user, ...action.payload } }
        case 'SAVE_PREFERENCE':
            return { ...state, preferences: action.payload }
        case 'ADD_ACTIVITY': {
            const newItem: ActivityItem = {
                id: Date.now().toString(),
                text: action.payload.text,
                icon: action.payload.icon,
                time: formatTime(),
            }
            return { ...state, recentActivity: [newItem, ...state.recentActivity].slice(0, 10) }
        }
        case 'INCREMENT_STAT': {
            const amount = action.payload.amount ?? 1
            return {
                ...state,
                stats: { ...state.stats, [action.payload.key]: state.stats[action.payload.key] + amount }
            }
        }
        case 'TOGGLE_SAVED_OUTFIT': {
            const exists = state.savedOutfits.find(o => o.id === action.payload.id)
            const savedOutfits = exists
                ? state.savedOutfits.filter(o => o.id !== action.payload.id)
                : [...state.savedOutfits, action.payload]
            return {
                ...state,
                savedOutfits,
                stats: { ...state.stats, savedLooks: savedOutfits.length }
            }
        }
        default:
            return state
    }
}

interface AppContextValue {
    state: AppState
    savePreference: (prefs: AppState['preferences']) => void
    addActivity: (text: string, icon: string) => void
    incrementStat: (key: keyof AppState['stats'], amount?: number) => void
    toggleSavedOutfit: (outfit: SavedOutfit) => void
    isOutfitSaved: (id: string) => boolean
    updateUser: (user: Partial<AppState['user']>) => void
    signOut: () => Promise<void>
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, defaultState)
    const [initialized, setInitialized] = useState(false)

    // Initial Session Check & Subscription
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            console.log('AppContext: Initial session check', session)
            dispatch({ type: 'SET_SESSION', payload: session })
            if (session) loadProfile(session.user.id)
            setInitialized(true)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            console.log('AppContext: Auth state changed', _event, session)
            dispatch({ type: 'SET_SESSION', payload: session })
            if (session) {
                loadProfile(session.user.id)
            } else {
                dispatch({ type: 'RESET_STATE' })
            }
        })

        return () => subscription.unsubscribe()
    }, [])

    const loadProfile = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single()

            if (data) {
                dispatch({
                    type: 'LOAD_STATE',
                    payload: {
                        user: {
                            name: data.full_name || 'Stylista',
                            email: data.email || '',
                            profileImage: data.avatar_url || '',
                            styleScore: 72, // Calculate or store this too
                            id: userId
                        },
                        preferences: data.preferences as any,
                        stats: (data.stats as any) || defaultState.stats,
                        recentActivity: (data.recent_activity as any) || [],
                        savedOutfits: (data.saved_outfits as any) || []
                    }
                })
            }
        } catch (error) {
            console.error('Error loading profile:', error)
        }
    }

    // Persist State to Supabase (Debounced)
    useEffect(() => {
        if (!state.session?.user?.id) return

        const timer = setTimeout(async () => {
            // Only save if session is active
            if (!state.session) return

            const updates = {
                id: state.session.user.id,
                updated_at: new Date().toISOString(),
                preferences: state.preferences,
                stats: state.stats,
                recent_activity: state.recentActivity,
                saved_outfits: state.savedOutfits,
                // optionally sync name/avatar if changed
            }

            const { error } = await supabase.from('profiles').upsert(updates)
            if (error) console.error('Error saving state:', error)
        }, 2000)

        return () => clearTimeout(timer)
    }, [state.preferences, state.stats, state.recentActivity, state.savedOutfits, state.session])

    const value: AppContextValue = {
        state,
        savePreference: (prefs) => dispatch({ type: 'SAVE_PREFERENCE', payload: prefs }),
        addActivity: (text, icon) => dispatch({ type: 'ADD_ACTIVITY', payload: { text, icon } }),
        incrementStat: (key, amount) => dispatch({ type: 'INCREMENT_STAT', payload: { key, amount } }),
        toggleSavedOutfit: (outfit) => dispatch({ type: 'TOGGLE_SAVED_OUTFIT', payload: outfit }),
        isOutfitSaved: (id) => state.savedOutfits.some(o => o.id === id),
        updateUser: (user) => dispatch({ type: 'UPDATE_USER', payload: user }),
        signOut: async () => {
            await supabase.auth.signOut()
            dispatch({ type: 'RESET_STATE' })
        }
    }

    if (!initialized) return null // or a loading spinner

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
    const ctx = useContext(AppContext)
    if (!ctx) throw new Error('useApp must be used within AppProvider')
    return ctx
}
