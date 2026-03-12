"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type UIStateContextType = {
    isSidebarOpen: boolean
    setIsSidebarOpen: (open: boolean) => void
    isDialogOpen: boolean
    setIsDialogOpen: (open: boolean) => void
    openDialogRequest: boolean
    setOpenDialogRequest: (open: boolean) => void
}

const UIStateContext = createContext<UIStateContextType | undefined>(undefined)

export function UIStateProvider({ children }: { children: ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [openDialogRequest, setOpenDialogRequest] = useState(false)

    return (
        <UIStateContext.Provider value={{ isSidebarOpen, setIsSidebarOpen, isDialogOpen, setIsDialogOpen, openDialogRequest, setOpenDialogRequest }}>
            {children}
        </UIStateContext.Provider>
    )
}

export function useUIState() {
    const context = useContext(UIStateContext)
    if (context === undefined) {
        throw new Error("useUIState must be used within a UIStateProvider")
    }
    return context
}
