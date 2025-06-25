import { useEffect, useState } from "react";
import axios from "axios";
import { useIdentity } from "./useIdentity";

export function useUserPhoto() {
  const [userPhoto, setUserPhoto] = useState<string | undefined>(undefined);
  const { acquireToken } = useIdentity();

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await acquireToken(["User.Read"]);
        const accessToken = response.accessToken;
        const graphResponse = await axios.get(
          "https://graph.microsoft.com/v1.0/me/photo/$value",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
            responseType: "blob",
          }
        );
        if (graphResponse.status === 200 && graphResponse.data) {
          const blob = graphResponse.data;
          const reader = new FileReader();
          reader.onloadend = () => {
            setUserPhoto(reader.result as string);
          };
          reader.readAsDataURL(blob);
        }
      } catch (e) {
        // Ignore if no photo or not allowed
      }
    };
    fetchPhoto();
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { userPhoto };
}
