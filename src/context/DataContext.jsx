import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { DEFAULT_DATA } from "../data/initialData";

const STORAGE_KEY = "portfolio_data";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_DATA;
    } catch {
      return DEFAULT_DATA;
    }
  });

  // Persist to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // storage full — ignore
    }
  }, [data]);

  // ── ME helpers ────────────────────────────────────────────────────────────
  const updateMe = useCallback((updates) => {
    setData((prev) => ({ ...prev, me: { ...prev.me, ...updates } }));
  }, []);

  // ── Publications helpers ──────────────────────────────────────────────────
  const addPub = useCallback((pub) => {
    const newPub = { ...pub, id: `pub-${Date.now()}` };
    setData((prev) => ({
      ...prev,
      publications: [...prev.publications, newPub],
    }));
  }, []);

  const updatePub = useCallback((id, updates) => {
    setData((prev) => ({
      ...prev,
      publications: prev.publications.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
    }));
  }, []);

  const deletePub = useCallback((id) => {
    setData((prev) => ({
      ...prev,
      publications: prev.publications.filter((p) => p.id !== id),
    }));
  }, []);

  const reorderPubs = useCallback((pubs) => {
    setData((prev) => ({ ...prev, publications: pubs }));
  }, []);

  // ── Blog post helpers ─────────────────────────────────────────────────────
  const addPost = useCallback((post) => {
    const newPost = { ...post, id: `post-${Date.now()}` };
    setData((prev) => ({
      ...prev,
      blogPosts: [newPost, ...prev.blogPosts],
    }));
  }, []);

  const updatePost = useCallback((id, updates) => {
    setData((prev) => ({
      ...prev,
      blogPosts: prev.blogPosts.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
    }));
  }, []);

  const deletePost = useCallback((id) => {
    setData((prev) => ({
      ...prev,
      blogPosts: prev.blogPosts.filter((p) => p.id !== id),
    }));
  }, []);

  // ── CV helpers ────────────────────────────────────────────────────────────
  const updateCV = useCallback((updates) => {
    setData((prev) => ({ ...prev, cv: { ...prev.cv, ...updates } }));
  }, []);

  const addCVItem = useCallback((section, item) => {
    setData((prev) => ({
      ...prev,
      cv: {
        ...prev.cv,
        [section]: [
          ...prev.cv[section],
          { ...item, id: `${section}-${Date.now()}` },
        ],
      },
    }));
  }, []);

  const updateCVItem = useCallback((section, id, updates) => {
    setData((prev) => ({
      ...prev,
      cv: {
        ...prev.cv,
        [section]: prev.cv[section].map((item) =>
          item.id === id ? { ...item, ...updates } : item
        ),
      },
    }));
  }, []);

  const deleteCVItem = useCallback((section, id) => {
    setData((prev) => ({
      ...prev,
      cv: {
        ...prev.cv,
        [section]: prev.cv[section].filter((item) => item.id !== id),
      },
    }));
  }, []);

  // ── Open Source helpers ───────────────────────────────────────────────────
  const addOpenSourceProject = useCallback((project) => {
    const newProject = { ...project, id: `os-${Date.now()}` };
    setData((prev) => ({
      ...prev,
      openSource: [...prev.openSource, newProject],
    }));
  }, []);

  const updateOpenSourceProject = useCallback((id, updates) => {
    setData((prev) => ({
      ...prev,
      openSource: prev.openSource.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
    }));
  }, []);

  const deleteOpenSourceProject = useCallback((id) => {
    setData((prev) => ({
      ...prev,
      openSource: prev.openSource.filter((p) => p.id !== id),
    }));
  }, []);

  const resetToDefaults = useCallback(() => {
    setData(DEFAULT_DATA);
  }, []);

  return (
    <DataContext.Provider
      value={{
        data,
        updateMe,
        addPub,
        updatePub,
        deletePub,
        reorderPubs,
        addPost,
        updatePost,
        deletePost,
        updateCV,
        addCVItem,
        updateCVItem,
        deleteCVItem,
        addOpenSourceProject,
        updateOpenSourceProject,
        deleteOpenSourceProject,
        resetToDefaults,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used inside <DataProvider>");
  return ctx;
}
