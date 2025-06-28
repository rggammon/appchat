import { useMsal } from "@azure/msal-react";
import { useAppDispatch } from "../store/useAppDispatch";
import { addCustomScopeError, addError } from "../store/authSlice";

export function useIdentity() {
  const dispatch = useAppDispatch();
  const { instance, accounts } = useMsal();
  const user = accounts[0];

  const acquireToken = async (scopes: string[], isCustomScopes: boolean) => {
    try {
      const res = await instance.acquireTokenSilent({ account: user, scopes });
      return res;
    } catch (err: any) {
      // Some errors require user interaction eg:
      //
      //    err.errorCode === "invalid_grant" ||
      //    err.errorCode === "interaction_required" ||
      //    err.errorCode === "consent_required"
      //
      // ... but fall back to popup auth for any issue

      // Show overlay and provide retry handler
      dispatch(
        (isCustomScopes ? addCustomScopeError : addError)(
          err.errorMessage || "Error acquiring token"
        )
      );

      // Bail out of rendering, when auth errors are cleared we will re-render.
      throw err;
    }
  };

  return { acquireToken, user };
}
