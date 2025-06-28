import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { useIdentity } from "./useIdentity";
import { useApiConfig } from "../context/ApiConfigContext";

// Simple in-memory cache for recipes by id
const recipeCache: Record<string, any> = {};

export function useRecipe(recipeId: string) {
  const { acquireToken } = useIdentity();
  const { apiScope } = useApiConfig();
  const [description, setDescription] = useState<{ name: string }>({
    name: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchRecipe() {
      setLoading(true);
      setError(null);
      // Check cache first
      if (recipeCache[recipeId]) {
        setDescription(recipeCache[recipeId]);
        setLoading(false);
        return;
      }
      try {
        const tokenResult = await acquireToken([apiScope], true);
        const res = await axios.get(
          `https://vibetatoapim.azure-api.net/v1/recipes/${recipeId}`,
          {
            headers: { Authorization: `Bearer ${tokenResult.accessToken}` },
          }
        );
        if (!cancelled) {
          recipeCache[recipeId] =
            res.data.description || "No description available.";
          setDescription(recipeCache[recipeId]);
          setLoading(false);
        }
      } catch (e: any) {
        if (!cancelled) {
          setError(e.message || "Failed to fetch recipe");
          setLoading(false);
        }
      }
    }
    fetchRecipe();
    return () => {
      cancelled = true;
    };
  }, [recipeId, apiScope, acquireToken]);

  return { description, loading, error };
}
