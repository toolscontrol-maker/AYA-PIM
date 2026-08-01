import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

interface UIState {
  // Command palette
  commandPaletteOpen: boolean
  openCommandPalette: () => void
  closeCommandPalette: () => void

  // New Product Modal
  newProductModalOpen: boolean
  openNewProductModal: () => void
  closeNewProductModal: () => void

  // Sidebar
  sidebarCollapsed: boolean
  toggleSidebar: () => void

  // Active module
  activeModule: string
  setActiveModule: (module: string) => void

  // Selected products (for bulk operations)
  selectedProductIds: Set<string>
  selectProduct: (id: string) => void
  deselectProduct: (id: string) => void
  toggleProductSelection: (id: string) => void
  selectAllProducts: (ids: string[]) => void
  clearSelection: () => void

  // Undo/redo history
  history: Array<{ action: string; data: unknown; timestamp: number }>
  historyIndex: number
  pushHistory: (action: string, data: unknown) => void
  undo: () => void
  redo: () => void

  // Notifications
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id'>) => void
  removeNotification: (id: string) => void

  // Sync status
  syncStatus: 'synced' | 'syncing' | 'error' | 'offline'
  setSyncStatus: (status: UIState['syncStatus']) => void

  // Search
  globalSearchQuery: string
  setGlobalSearchQuery: (query: string) => void
}

interface Notification {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  title: string
  message?: string
  duration?: number
}

export const useUIStore = create<UIState>()(
  subscribeWithSelector((set, get) => ({
    // Command palette
    commandPaletteOpen: false,
    openCommandPalette: () => set({ commandPaletteOpen: true }),
    closeCommandPalette: () => set({ commandPaletteOpen: false }),

    // New Product Modal
    newProductModalOpen: false,
    openNewProductModal: () => set({ newProductModalOpen: true }),
    closeNewProductModal: () => set({ newProductModalOpen: false }),

    // Sidebar
    sidebarCollapsed: false,
    toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),

    // Active module
    activeModule: 'pim',
    setActiveModule: (module) => set({ activeModule: module }),

    // Product selection
    selectedProductIds: new Set(),
    selectProduct: (id) =>
      set((s) => ({ selectedProductIds: new Set([...s.selectedProductIds, id]) })),
    deselectProduct: (id) =>
      set((s) => {
        const next = new Set(s.selectedProductIds)
        next.delete(id)
        return { selectedProductIds: next }
      }),
    toggleProductSelection: (id) =>
      set((s) => {
        const next = new Set(s.selectedProductIds)
        if (next.has(id)) {
          next.delete(id)
        } else {
          next.add(id)
        }
        return { selectedProductIds: next }
      }),
    selectAllProducts: (ids) => set({ selectedProductIds: new Set(ids) }),
    clearSelection: () => set({ selectedProductIds: new Set() }),

    // History / undo-redo
    history: [],
    historyIndex: -1,
    pushHistory: (action, data) =>
      set((s) => {
        const truncated = s.history.slice(0, s.historyIndex + 1)
        const next = [...truncated, { action, data, timestamp: Date.now() }]
        return { history: next, historyIndex: next.length - 1 }
      }),
    undo: () => {
      const { historyIndex } = get()
      if (historyIndex > 0) set({ historyIndex: historyIndex - 1 })
    },
    redo: () => {
      const { history, historyIndex } = get()
      if (historyIndex < history.length - 1) set({ historyIndex: historyIndex + 1 })
    },

    // Notifications
    notifications: [],
    addNotification: (notification) =>
      set((s) => ({
        notifications: [
          ...s.notifications,
          { ...notification, id: Math.random().toString(36).slice(2) },
        ],
      })),
    removeNotification: (id) =>
      set((s) => ({
        notifications: s.notifications.filter((n) => n.id !== id),
      })),

    // Sync
    syncStatus: 'synced',
    setSyncStatus: (status) => set({ syncStatus: status }),

    // Search
    globalSearchQuery: '',
    setGlobalSearchQuery: (query) => set({ globalSearchQuery: query }),
  })),
)
